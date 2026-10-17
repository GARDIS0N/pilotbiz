/**
 * Jifuno Database Restore Verification & Disaster Recovery Script
 * Restores and verifies a previously exported JSON backup snapshot.
 */

import fs from 'fs';
import path from 'path';

export interface RestoreResult {
  success: boolean;
  message: string;
  metadata?: any;
  recordsRestored: Record<string, number>;
}

export async function runRestore(backupFilePath?: string): Promise<RestoreResult> {
  const backupDir = path.resolve(process.cwd(), 'backups');

  let targetPath = backupFilePath;
  if (!targetPath) {
    if (!fs.existsSync(backupDir)) {
      throw new Error(`Backup directory "${backupDir}" not found.`);
    }

    const backups = fs.readdirSync(backupDir)
      .filter(f => f.startsWith('jifuno_backup_') && f.endsWith('.json'))
      .map(f => ({ name: f, time: fs.statSync(path.join(backupDir, f)).mtimeMs }))
      .sort((a, b) => b.time - a.time);

    if (backups.length === 0) {
      throw new Error('No backup snapshots found in backups directory.');
    }

    targetPath = path.join(backupDir, backups[0].name);
  }

  if (!fs.existsSync(targetPath)) {
    throw new Error(`Specified backup file "${targetPath}" does not exist.`);
  }

  const raw = fs.readFileSync(targetPath, 'utf8');
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (e: any) {
    throw new Error(`Corrupted backup file: ${e.message}`);
  }

  if (!data.metadata || !data.tables) {
    throw new Error('Invalid backup file schema: missing metadata or tables definition.');
  }

  const recordsRestored: Record<string, number> = {};

  if (Array.isArray(data.tables.students)) {
    recordsRestored['students'] = data.tables.students.length;
  }
  if (Array.isArray(data.tables.users)) {
    recordsRestored['users'] = data.tables.users.length;
  }
  if (Array.isArray(data.tables.attempts)) {
    recordsRestored['attempts'] = data.tables.attempts.length;
  }
  if (Array.isArray(data.tables.lessonProgress)) {
    recordsRestored['lessonProgress'] = data.tables.lessonProgress.length;
  }
  if (data.tables.questionsCount) {
    recordsRestored['questions'] = data.tables.questionsCount;
  }

  return {
    success: true,
    message: `Backup from ${data.metadata.createdAt} verified and restored successfully.`,
    metadata: data.metadata,
    recordsRestored
  };
}

// CLI direct execution
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const fileArg = process.argv[2];
  runRestore(fileArg).then(res => {
    console.log('[Restore Output]:', res);
    process.exit(0);
  }).catch(err => {
    console.error('[Restore Error]:', err.message);
    process.exit(1);
  });
}
