/**
 * Jifuno Analytics Service
 * 
 * Lightweight, offline-first instrumentation for the Duolingo-style onboarding flow.
 * Stores events in localStorage with offline tolerance, supporting derivation of:
 * - Time to first completed lesson
 * - Onboarding completion rate
 * - Drop-off per step
 * - Day-1 return
 */

export type OnboardingAnalyticsEventName =
  | 'onboarding_started'
  | 'grade_selected'
  | 'interests_selected'
  | 'level_check_completed'
  | 'first_lesson_started'
  | 'first_lesson_completed'
  | 'daily_goal_set'
  | 'save_progress_shown'
  | 'save_progress_completed'
  | 'save_progress_skipped'
  | 'onboarding_abandoned';

export interface AnalyticsEvent {
  event: OnboardingAnalyticsEventName;
  timestamp: string;
  epochMs: number;
  anonymousUserId?: string;
  properties?: Record<string, any>;
}

export interface FunnelMetrics {
  totalStarted: number;
  firstLessonStarted: number;
  firstLessonCompleted: number;
  completedOnboarding: number;
  completionRatePercent: number;
  timeToFirstLessonSeconds?: number;
  dropOffCounts: Record<string, number>;
}

const ANALYTICS_STORAGE_KEY = 'jifuno_analytics_events';
const MAX_STORED_EVENTS = 200;

function getAnonymousUserId(): string {
  try {
    const raw = localStorage.getItem('jifuno_onboarding_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.anonymousUserId) return parsed.anonymousUserId;
    }
  } catch (_) {}
  return 'anon-learner';
}

/**
 * Tracks an onboarding analytics event.
 */
export function trackEvent(
  event: OnboardingAnalyticsEventName,
  properties: Record<string, any> = {}
): AnalyticsEvent {
  const payload: AnalyticsEvent = {
    event,
    timestamp: new Date().toISOString(),
    epochMs: Date.now(),
    anonymousUserId: getAnonymousUserId(),
    properties
  };

  try {
    const existing = getStoredEvents();
    const updated = [...existing, payload].slice(-MAX_STORED_EVENTS);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));

    // Optional console log for development inspection
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics: ${event}]`, properties);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to save event to local storage:', err);
  }

  // Attempt non-blocking serverless sync if online (fire-and-forget)
  try {
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {});
    }
  } catch (_) {}

  return payload;
}

/**
 * Retrieves all stored analytics events from localStorage.
 */
export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (_) {}
  return [];
}

/**
 * Clears stored analytics events (useful for testing).
 */
export function clearAnalyticsEvents(): void {
  try {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY);
  } catch (_) {}
}

/**
 * Derives key onboarding KPIs from stored event telemetry.
 */
export function deriveOnboardingMetrics(): FunnelMetrics {
  const events = getStoredEvents();

  let startedAtMs: number | null = null;
  let firstLessonCompletedAtMs: number | null = null;
  let totalStarted = 0;
  let firstLessonStarted = 0;
  let firstLessonCompleted = 0;
  let completedOnboarding = 0;
  const dropOffCounts: Record<string, number> = {};

  for (const ev of events) {
    if (ev.event === 'onboarding_started') {
      totalStarted++;
      if (startedAtMs === null) startedAtMs = ev.epochMs;
    } else if (ev.event === 'first_lesson_started') {
      firstLessonStarted++;
    } else if (ev.event === 'first_lesson_completed') {
      firstLessonCompleted++;
      if (firstLessonCompletedAtMs === null) firstLessonCompletedAtMs = ev.epochMs;
    } else if (ev.event === 'save_progress_completed' || ev.event === 'save_progress_skipped') {
      completedOnboarding++;
    } else if (ev.event === 'onboarding_abandoned') {
      const stepName = ev.properties?.step || 'unknown';
      dropOffCounts[stepName] = (dropOffCounts[stepName] || 0) + 1;
    }
  }

  let timeToFirstLessonSeconds: number | undefined;
  if (startedAtMs && firstLessonCompletedAtMs && firstLessonCompletedAtMs >= startedAtMs) {
    timeToFirstLessonSeconds = Math.round((firstLessonCompletedAtMs - startedAtMs) / 1000);
  }

  const completionRatePercent = totalStarted > 0
    ? Math.round((completedOnboarding / totalStarted) * 100)
    : 0;

  return {
    totalStarted,
    firstLessonStarted,
    firstLessonCompleted,
    completedOnboarding,
    completionRatePercent,
    timeToFirstLessonSeconds,
    dropOffCounts
  };
}
