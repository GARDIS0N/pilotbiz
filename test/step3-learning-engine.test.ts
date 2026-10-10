import fs from 'fs';
import path from 'path';
import {
  recommendNextLesson,
  calculateNextReviewInterval,
  getDueReviewItems
} from '../src/utils/learningEngine.js';

console.log('===========================================================');
console.log('🧪 STEP 3: LEARNING ENGINE TEST SUITE');
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

// 1. Next Lesson Recommendation Engine
console.log('\n--- 1. Next Lesson Recommendation Tests ---');

const recNewLearner = recommendNextLesson({
  gradeId: 'grade-4',
  completedLessonIds: []
});
assert(Boolean(recNewLearner.questId), 'Recommends initial lesson for new learner in Grade 4');
assert(recNewLearner.subjectId.includes('math'), 'Initial recommended lesson is Mathematics (la-math-g4)');
assert(recNewLearner.reason === 'NEXT_IN_CURRICULUM_ORDER', 'Recommendation reason is NEXT_IN_CURRICULUM_ORDER');

// Now complete the first lesson
const recSecond = recommendNextLesson({
  gradeId: 'grade-4',
  completedLessonIds: [recNewLearner.questId]
});
assert(recSecond.questId !== recNewLearner.questId, 'Advances to a different next lesson after completing first');
assert(Boolean(recSecond.strandTitle), 'Provides strand title for the recommended lesson');

// Grade 3 check
const recG3 = recommendNextLesson({
  gradeId: 'grade-3',
  completedLessonIds: []
});
assert(Boolean(recG3.questId), 'Recommends valid lesson for Grade 3');

// 2. Spaced Repetition Review Queue Calculation (+1 -> +3 -> +7 days)
console.log('\n--- 2. Spaced Repetition Review Queue Intervals ---');

// A: Initial failure -> interval 1 day
const step0 = calculateNextReviewInterval(0, false);
assert(step0.intervalDays === 1, 'Wrong answer schedules review for 1 day interval');
assert(step0.status === 'PENDING', 'Status is PENDING after wrong answer');

// B: First review passed -> 1 day to 3 days
const step1 = calculateNextReviewInterval(1, true);
assert(step1.intervalDays === 3, 'First correct review pushes interval from 1 to 3 days');
assert(step1.status === 'PENDING', 'Status remains PENDING at 3 days');

// C: Second review passed -> 3 days to 7 days
const step2 = calculateNextReviewInterval(3, true);
assert(step2.intervalDays === 7, 'Second correct review pushes interval from 3 to 7 days');
assert(step2.status === 'PENDING', 'Status remains PENDING at 7 days');

// D: Third review passed -> completed!
const step3 = calculateNextReviewInterval(7, true);
assert(step3.status === 'COMPLETED', 'Third correct review completes the mastery cycle');

// E: Mistake during review -> resets back to 1 day
const resetStep = calculateNextReviewInterval(3, false);
assert(resetStep.intervalDays === 1, 'Mistake during review resets interval back to 1 day');
assert(resetStep.status === 'PENDING', 'Status stays PENDING on reset');

// 3. Due Items Filter Tests
console.log('\n--- 3. Due Review Items Filter ---');

const now = new Date();
const pastDate = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(); // 2 hours ago
const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(); // Tomorrow

const sampleQueue = [
  { id: '1', question_id: 'q-1', next_review_at: pastDate, status: 'PENDING' },
  { id: '2', question_id: 'q-2', next_review_at: futureDate, status: 'PENDING' },
  { id: '3', question_id: 'q-3', next_review_at: pastDate, status: 'COMPLETED' }
];

const due = getDueReviewItems(sampleQueue, now);
assert(due.length === 1, 'Filters exactly 1 due pending review item');
assert(due[0].id === '1', 'Due item matches past timestamp item');

// 4. Database Migration Schema Verification
console.log('\n--- 4. Migration 20261011_03_learning_engine.sql Verification ---');

const migPath = path.join(process.cwd(), 'supabase', 'migrations', '20261011_03_learning_engine.sql');
assert(fs.existsSync(migPath), 'Migration file exists');

const sql = fs.readFileSync(migPath, 'utf8');
assert(sql.includes('CREATE TABLE IF NOT EXISTS public.skill_mastery'), 'Contains skill_mastery table');
assert(sql.includes('mastery_percentage INTEGER'), 'skill_mastery has mastery_percentage');
assert(sql.includes('CREATE TABLE IF NOT EXISTS public.lesson_progress'), 'Contains lesson_progress table');
assert(sql.includes('score_percentage INTEGER'), 'lesson_progress has score_percentage');
assert(sql.includes('CREATE TABLE IF NOT EXISTS public.review_queue'), 'Contains review_queue table');
assert(sql.includes('interval_days INTEGER NOT NULL DEFAULT 1'), 'review_queue has interval_days');
assert(sql.includes('trg_attempt_review_queue'), 'Trigger trg_attempt_review_queue attaches to attempts');
assert(sql.includes('public.process_review_result'), 'Contains process_review_result spaced repetition function');
assert(sql.includes('public.recommend_next_lesson'), 'Contains recommend_next_lesson PostgreSQL function');

console.log('\n===========================================================');
console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL STEP 3 TESTS PASSED!\n');
  process.exit(0);
}
