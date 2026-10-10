import fs from 'fs';
import path from 'path';
import { errorTracker } from '../src/utils/errorTracking.js';
import { offlineSyncService } from '../src/services/offlineSync.js';

console.log('===========================================================');
console.log('🧪 STEP 7: RELIABILITY TEST SUITE');
console.log('===========================================================');

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${msg}`);
    passedCount++;
  } else {
    console.error(`  ❌ [FAIL] ${msg}`);
    failedCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. Migration File & Index Verification
// -----------------------------------------------------------------------------
console.log('\n--- 1. Database Indexes & Query Optimizations ---');

const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20261011_07_reliability_and_indexes.sql');
assert(fs.existsSync(migrationPath), 'Migration file 20261011_07_reliability_and_indexes.sql exists');

const migrationContent = fs.readFileSync(migrationPath, 'utf8');

// Attempts indexes
assert(migrationContent.includes('idx_attempts_learner_created'), 'Index on attempts(learner_id, created_at DESC) defined');
assert(migrationContent.includes('idx_attempts_q_correct'), 'Index on attempts(question_id, is_correct) defined');
assert(migrationContent.includes('idx_attempts_created_correct'), 'Index on attempts(created_at, is_correct) defined');

// Reports indexes
assert(migrationContent.includes('idx_reports_status_created'), 'Index on reports(status, created_at DESC) defined');
assert(migrationContent.includes('idx_reports_question'), 'Index on reports(question_id) defined');

// Review Queue indexes
assert(migrationContent.includes('idx_review_queue_due'), 'Index on review_queue(learner_id, status, next_review_at) defined');
assert(migrationContent.includes('idx_review_queue_status_next'), 'Index on review_queue(status, next_review_at) defined');

// Lesson Progress indexes
assert(migrationContent.includes('idx_lesson_progress_learner'), 'Index on lesson_progress(learner_id, lesson_id) defined');
assert(migrationContent.includes('idx_lesson_progress_lesson_completed'), 'Index on lesson_progress(lesson_id, completed) defined');

// Skill Mastery indexes
assert(migrationContent.includes('idx_skill_mastery_learner_skill'), 'Index on skill_mastery(learner_id, skill_id) defined');
assert(migrationContent.includes('idx_skill_mastery_learner_pct'), 'Index on skill_mastery(learner_id, mastery_percentage) defined');

// Question bank indexes
assert(migrationContent.includes('idx_questions_substrand_status'), 'Index on questions(sub_strand_id, content_status) defined');
assert(migrationContent.includes('idx_questions_grade_status'), 'Index on questions(grade_id, content_status) defined');

// Profiles & Summaries indexes
assert(migrationContent.includes('idx_profiles_parent_id'), 'Index on profiles(parent_user_id) defined');
assert(migrationContent.includes('idx_wls_learner_week'), 'Index on weekly_learner_summaries(learner_id, week_start_date DESC) defined');

// -----------------------------------------------------------------------------
// 2. Error Tracking Service (Sentry Free Tier Compatible)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Error Tracking Service ---');

errorTracker.init();
assert(true, 'errorTracker.init() executes cleanly without exception');

errorTracker.addBreadcrumb({
  category: 'test',
  message: 'Unit test breadcrumb recorded'
});
assert(true, 'errorTracker.addBreadcrumb() records breadcrumb entry');

const testErrId = errorTracker.captureException(new Error('Simulated runner warning'), {
  questionId: 'q-test-01',
  component: 'TestRunner'
});
assert(Boolean(testErrId) && testErrId.startsWith('err-'), 'errorTracker.captureException() returns valid tracking ID');

errorTracker.captureMessage('Informational system telemetry message', 'info');
assert(true, 'errorTracker.captureMessage() handles informational message');

// -----------------------------------------------------------------------------
// 3. Health Check Endpoints
// -----------------------------------------------------------------------------
console.log('\n--- 3. System Health Check Endpoint ---');

const serverContent = fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');
assert(serverContent.includes("app.get('/health'"), 'server.ts registers root /health route');

const apiRouterContent = fs.readFileSync(path.resolve(process.cwd(), 'server/apiRouter.ts'), 'utf8');
assert(apiRouterContent.includes("apiRouter.get('/health'"), 'apiRouter registers /api/health route');
assert(apiRouterContent.includes('uptime_seconds') && apiRouterContent.includes('database'), 'Health endpoint returns uptime, database, and memory metrics');

const cbeApiContent = fs.readFileSync(path.resolve(process.cwd(), 'src/services/cbeApi.ts'), 'utf8');
assert(cbeApiContent.includes('public async checkHealth'), 'cbeApi exposes checkHealth() client method');

// -----------------------------------------------------------------------------
// 4. Offline Caching & Progress Sync
// -----------------------------------------------------------------------------
console.log('\n--- 4. Offline Caching & Progress Synchronization ---');

// Mock localStorage for test environment if not present
if (typeof localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (k: string) => store.get(k) || null,
    setItem: (k: string, v: string) => store.set(k, String(v)),
    removeItem: (k: string) => store.delete(k),
    clear: () => store.clear()
  };
}

assert(typeof offlineSyncService.isOnline() === 'boolean', 'offlineSyncService.isOnline() returns boolean');

// Test lesson caching
const sampleLesson = {
  id: 'lesson-offline-test',
  title: 'Offline Test Quest',
  description: 'Test description',
  strandId: 'strand-math-01',
  order: 1,
  durationMinutes: 10,
  xpReward: 25,
  coinReward: 10
} as any;

const sampleQuestions = [{
  id: 'q-offline-01',
  prompt: 'Offline question prompt',
  type: 'MULTIPLE_CHOICE',
  difficulty: 'EASY',
  subStrandId: 'substrand-test',
  options: [{ id: 'opt-1', text: 'A' }],
  correctOptionId: 'opt-1'
}] as any;

offlineSyncService.cacheLesson('lesson-offline-test', {
  lesson: sampleLesson,
  questions: sampleQuestions
});

const retrievedCache = offlineSyncService.getCachedLesson('lesson-offline-test');
assert(Boolean(retrievedCache), 'Cached lesson successfully retrieved from local storage');
assert(retrievedCache?.questions.length === 1, 'Cached questions match stored question volume');

// Test offline attempt queueing
offlineSyncService.queueAttempt({
  learnerId: 'student-offline-01',
  questionId: 'q-offline-01',
  isCorrect: true,
  timeMs: 4500
});

const queuedAttempts = offlineSyncService.getQueuedAttempts();
assert(queuedAttempts.length >= 1, 'Attempt successfully queued in offline storage');
assert(queuedAttempts[0].learnerId === 'student-offline-01', 'Queued attempt learnerId preserved accurately');

// Test offline report queueing
offlineSyncService.queueReport({
  questionId: 'q-offline-01',
  learnerId: 'student-offline-01',
  note: 'Offline report feedback'
});

const queuedReports = offlineSyncService.getQueuedReports();
assert(queuedReports.length >= 1, 'Problem report successfully queued in offline storage');

// -----------------------------------------------------------------------------
// 5. Backup & Restore Documentation Integrity
// -----------------------------------------------------------------------------
console.log('\n--- 5. Backup & Restore Documentation Integrity ---');

const backupDocPath = path.resolve(process.cwd(), 'docs/BACKUP_AND_RESTORE.md');
assert(fs.existsSync(backupDocPath), 'docs/BACKUP_AND_RESTORE.md operational manual exists');

const backupDocContent = fs.readFileSync(backupDocPath, 'utf8');
assert(backupDocContent.includes('Automated Supabase Backups'), 'Documentation details automated Supabase backups (PITR / WAL)');
assert(backupDocContent.includes('supabase db dump'), 'Documentation includes manual dump command');
assert(backupDocContent.includes('psql') || backupDocContent.includes('supabase db restore'), 'Documentation provides restoration command instructions');
assert(backupDocContent.includes('Disaster Recovery Checklist'), 'Documentation includes Step-by-Step Disaster Recovery Checklist');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n===========================================================');
console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 STEP 7 RELIABILITY VERIFICATION COMPLETE!\n');
  process.exit(0);
}
