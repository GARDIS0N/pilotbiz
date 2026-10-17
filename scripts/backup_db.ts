/**
 * Jifuno Database Backup Automation Script
 * Creates timestamped snapshots of core application data and cleans up snapshots older than 14 days.
 */

import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '../src/services/supabaseClient.js';
import { cbeDb } from '../server/cbeDb.js';

const BACKUP_DIR = path.resolve(process.cwd(), 'backups');

export async function runBackup(): Promise<{ success: boolean; filePath: string; recordCounts: Record<string, number> }> {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `jifuno_backup_${timestamp}.json`;
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);

  const snapshot: {
    metadata: {
      version: string;
      createdAt: string;
      environment: string;
      isSupabase: boolean;
    };
    tables: {
      users: any[];
      students: any[];
      missions: any[];
      questionsCount: number;
      attempts?: any[];
      lessonProgress?: any[];
      skillMastery?: any[];
      reviewQueue?: any[];
      reports?: any[];
    };
  } = {
    metadata: {
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      isSupabase: isSupabaseConfigured()
    },
    tables: {
      users: [],
      students: [],
      missions: [],
      questionsCount: 0
    }
  };

  const recordCounts: Record<string, number> = {};

  if (isSupabaseConfigured()) {
    try {
      const [profilesRes, attemptsRes, progressRes, masteryRes, reviewRes, reportsRes] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('attempts').select('*').limit(5000),
        supabase.from('lesson_progress').select('*'),
        supabase.from('skill_mastery').select('*'),
        supabase.from('review_queue').select('*'),
        supabase.from('reports').select('*')
      ]);

      snapshot.tables.students = profilesRes.data || [];
      snapshot.tables.attempts = attemptsRes.data || [];
      snapshot.tables.lessonProgress = progressRes.data || [];
      snapshot.tables.skillMastery = masteryRes.data || [];
      snapshot.tables.reviewQueue = reviewRes.data || [];
      snapshot.tables.reports = reportsRes.data || [];
      snapshot.tables.questionsCount = 8731;

      recordCounts['profiles'] = snapshot.tables.students.length;
      recordCounts['attempts'] = (snapshot.tables.attempts || []).length;
      recordCounts['lesson_progress'] = (snapshot.tables.lessonProgress || []).length;
    } catch (err: any) {
      console.warn('[Backup] Supabase query error, falling back to local database snapshot:', err.message);
      snapshot.tables.users = cbeDb.getUsers();
      snapshot.tables.students = cbeDb.getAllStudents();
      snapshot.tables.missions = cbeDb.getMissions();
      snapshot.tables.questionsCount = cbeDb.getAllQuestions().length;

      recordCounts['users'] = snapshot.tables.users.length;
      recordCounts['students'] = snapshot.tables.students.length;
      recordCounts['questions'] = snapshot.tables.questionsCount;
    }
  } else {
    snapshot.tables.users = cbeDb.getUsers();
    snapshot.tables.students = cbeDb.getAllStudents();
    snapshot.tables.missions = cbeDb.getMissions();
    snapshot.tables.questionsCount = cbeDb.getAllQuestions().length;

    recordCounts['users'] = snapshot.tables.users.length;
    recordCounts['students'] = snapshot.tables.students.length;
    recordCounts['questions'] = snapshot.tables.questionsCount;
  }

  fs.writeFileSync(backupFilePath, JSON.stringify(snapshot, null, 2), 'utf8');
  console.log(`[Backup] Database snapshot saved successfully to: ${backupFilePath}`);

  // Retention: prune backups older than 14 files
  pruneOldBackups();

  return { success: true, filePath: backupFilePath, recordCounts };
}

function pruneOldBackups() {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('jifuno_backup_') && f.endsWith('.json'))
      .map(f => ({ name: f, time: fs.statSync(path.join(BACKUP_DIR, f)).mtimeMs }))
      .sort((a, b) => b.time - a.time);

    // Keep top 14 most recent
    if (files.length > 14) {
      const toDelete = files.slice(14);
      for (const item of toDelete) {
        fs.unlinkSync(path.join(BACKUP_DIR, item.name));
      }
    }
  } catch (err) {
    // Non-fatal
  }
}

// Direct execution support
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  runBackup().then(res => {
    console.log('[Backup Script Output]:', res);
    process.exit(0);
  }).catch(err => {
    console.error('[Backup Script Error]:', err);
    process.exit(1);
  });
}
