/**
 * Jifuno Offline Caching & Progress Synchronization Service
 * Ensures seamless learning continuity across intermittent connectivity (e.g. Kenyan rural 2G/3G).
 * Caches curriculum lessons locally and automatically syncs pending quiz attempts upon reconnection.
 */

import { Question, Lesson } from '../types/cbe.js';
import { errorTracker } from '../utils/errorTracking.js';

export interface QueuedAttempt {
  id: string;
  learnerId: string;
  questionId: string;
  isCorrect: boolean;
  timeMs: number;
  timestamp: string;
}

export interface QueuedReport {
  id: string;
  questionId: string;
  learnerId: string;
  note: string;
  timestamp: string;
}

export interface CachedLessonData {
  lesson: Lesson;
  questions: Question[];
  cachedAt: string;
}

const ATTEMPTS_QUEUE_KEY = 'jifuno_offline_attempts_queue';
const REPORTS_QUEUE_KEY = 'jifuno_offline_reports_queue';
const CACHED_LESSONS_PREFIX = 'jifuno_lesson_cache_';

class OfflineSyncService {
  private onlineStatus: boolean = typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
  private syncListeners: ((isOnline: boolean) => void)[] = [];
  private isSyncing = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.onlineStatus = true;
        this.notifyListeners(true);
        this.syncPendingData();
      });

      window.addEventListener('offline', () => {
        this.onlineStatus = false;
        this.notifyListeners(false);
      });
    }
  }

  public isOnline(): boolean {
    return this.onlineStatus;
  }

  public onStatusChange(callback: (isOnline: boolean) => void): () => void {
    this.syncListeners.push(callback);
    return () => {
      this.syncListeners = this.syncListeners.filter(l => l !== callback);
    };
  }

  private notifyListeners(isOnline: boolean) {
    for (const listener of this.syncListeners) {
      try {
        listener(isOnline);
      } catch (err) {
        console.warn('[OfflineSync] Listener notification error:', err);
      }
    }
  }

  // --- 1. Lesson & Question Offline Caching ---

  public cacheLesson(lessonId: string, data: { lesson: Lesson; questions: Question[] }): void {
    try {
      const cachePayload: CachedLessonData = {
        lesson: data.lesson,
        questions: data.questions,
        cachedAt: new Date().toISOString()
      };
      localStorage.setItem(`${CACHED_LESSONS_PREFIX}${lessonId}`, JSON.stringify(cachePayload));
    } catch (err) {
      console.warn('[OfflineSync] Failed to cache lesson:', err);
    }
  }

  public getCachedLesson(lessonId: string): CachedLessonData | null {
    try {
      const raw = localStorage.getItem(`${CACHED_LESSONS_PREFIX}${lessonId}`);
      if (!raw) return null;
      return JSON.parse(raw) as CachedLessonData;
    } catch {
      return null;
    }
  }

  // --- 2. Offline Attempt Queueing ---

  public queueAttempt(attempt: Omit<QueuedAttempt, 'id' | 'timestamp'>): void {
    try {
      const queued: QueuedAttempt[] = this.getQueuedAttempts();
      const newEntry: QueuedAttempt = {
        ...attempt,
        id: `offline-att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString()
      };
      queued.push(newEntry);
      localStorage.setItem(ATTEMPTS_QUEUE_KEY, JSON.stringify(queued));
      errorTracker.addBreadcrumb({
        category: 'offline',
        message: `Queued attempt for question ${attempt.questionId}`
      });
    } catch (err) {
      console.warn('[OfflineSync] Error queueing attempt:', err);
    }
  }

  public getQueuedAttempts(): QueuedAttempt[] {
    try {
      const raw = localStorage.getItem(ATTEMPTS_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // --- 3. Offline Problem Report Queueing ---

  public queueReport(report: Omit<QueuedReport, 'id' | 'timestamp'>): void {
    try {
      const queued: QueuedReport[] = this.getQueuedReports();
      const newEntry: QueuedReport = {
        ...report,
        id: `offline-rep-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      queued.push(newEntry);
      localStorage.setItem(REPORTS_QUEUE_KEY, JSON.stringify(queued));
    } catch (err) {
      console.warn('[OfflineSync] Error queueing report:', err);
    }
  }

  public getQueuedReports(): QueuedReport[] {
    try {
      const raw = localStorage.getItem(REPORTS_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // --- 4. Synchronize Pending Offline Data with Server ---

  public async syncPendingData(): Promise<{ syncedAttempts: number; syncedReports: number }> {
    if (this.isSyncing || !this.isOnline()) {
      return { syncedAttempts: 0, syncedReports: 0 };
    }

    this.isSyncing = true;
    let syncedAttempts = 0;
    let syncedReports = 0;

    try {
      // 1. Sync Pending Attempts
      const attempts = this.getQueuedAttempts();
      if (attempts.length > 0) {
        for (const att of attempts) {
          try {
            const res = await fetch('/api/attempts/log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                learnerId: att.learnerId,
                questionId: att.questionId,
                isCorrect: att.isCorrect,
                timeMs: att.timeMs
              })
            });
            if (res.ok) syncedAttempts++;
          } catch {
            break; // Stop and retry later if network still spotty
          }
        }

        // Keep un-synced items
        const remainingAttempts = attempts.slice(syncedAttempts);
        localStorage.setItem(ATTEMPTS_QUEUE_KEY, JSON.stringify(remainingAttempts));
      }

      // 2. Sync Pending Problem Reports
      const reports = this.getQueuedReports();
      if (reports.length > 0) {
        for (const rep of reports) {
          try {
            const res = await fetch('/api/reports', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                questionId: rep.questionId,
                learnerId: rep.learnerId,
                note: rep.note
              })
            });
            if (res.ok) syncedReports++;
          } catch {
            break;
          }
        }

        const remainingReports = reports.slice(syncedReports);
        localStorage.setItem(REPORTS_QUEUE_KEY, JSON.stringify(remainingReports));
      }

      if (syncedAttempts > 0 || syncedReports > 0) {
        console.log(`[OfflineSync] Synced ${syncedAttempts} attempts and ${syncedReports} reports to server.`);
      }
    } catch (err) {
      console.warn('[OfflineSync] Sync cycle notice:', err);
    } finally {
      this.isSyncing = false;
    }

    return { syncedAttempts, syncedReports };
  }
}

export const offlineSyncService = new OfflineSyncService();
