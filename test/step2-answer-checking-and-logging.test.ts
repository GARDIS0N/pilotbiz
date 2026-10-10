import fs from 'fs';
import path from 'path';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';
import { Question } from '../src/types/cbe.js';

console.log('===========================================================');
console.log('🧪 STEP 2: ANSWER CHECKING & LOGGING TEST SUITE');
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

// 1. Shared Answer Validation Engine Tests
console.log('\n--- 1. Shared Answer Validation Engine ---');

const testMcq: Question = {
  id: 'test-mcq-1',
  subStrandId: 'sub-1',
  type: 'MULTIPLE_CHOICE',
  prompt: 'What is 5 + 7?',
  difficulty: 'EASY',
  options: [
    { id: 'opt-1', text: '10' },
    { id: 'opt-2', text: '12' },
    { id: 'opt-3', text: '15' }
  ],
  correctOptionId: 'opt-2',
  explanation: '5 + 7 = 12',
  socraticHint: 'Count up 7 from 5.',
  kenyanCulturalContext: 'Math in daily life.',
  sourceType: 'CURRICULUM_ALIGNED',
  contentStatus: 'APPROVED'
};

assert(evaluateAnswer(testMcq, 'opt-2') === true, 'MCQ evaluates correct option ID as true');
assert(evaluateAnswer(testMcq, 'opt-1') === false, 'MCQ evaluates wrong option ID as false');
assert(evaluateAnswer(testMcq, '12') === true, 'MCQ matches option text "12" as true');
assert(resolveCorrectAnswerText(testMcq) === '12', 'resolveCorrectAnswerText returns human label "12"');

const testTf: Question = {
  id: 'test-tf-1',
  subStrandId: 'sub-1',
  type: 'TRUE_FALSE',
  prompt: 'Is Mount Kenya the highest mountain in Kenya?',
  difficulty: 'EASY',
  correctBoolean: true,
  explanation: 'Mount Kenya is the highest mountain in Kenya at 5,199m.',
  socraticHint: 'Think about Kenyan geography.',
  kenyanCulturalContext: 'Kenyan landmarks.',
  sourceType: 'CURRICULUM_ALIGNED',
  contentStatus: 'APPROVED'
};

assert(evaluateAnswer(testTf, true) === true, 'TRUE_FALSE evaluates boolean true as true');
assert(evaluateAnswer(testTf, 'true') === true, 'TRUE_FALSE evaluates string "true" as true');
assert(evaluateAnswer(testTf, 'kweli') === true, 'TRUE_FALSE evaluates Swahili "kweli" as true');
assert(evaluateAnswer(testTf, false) === false, 'TRUE_FALSE rejects boolean false');

const testMatch: Question = {
  id: 'test-match-1',
  subStrandId: 'sub-1',
  type: 'MATCHING',
  prompt: 'Match animals to their homes',
  difficulty: 'MEDIUM',
  matchingPairs: [
    { leftId: 'l-1', leftText: 'Lion', rightId: 'r-1', rightText: 'Savanna den' },
    { leftId: 'l-2', leftText: 'Fish', rightId: 'r-2', rightText: 'River or lake' }
  ],
  explanation: 'Lions live in dens in savannas, fish in water.',
  socraticHint: 'Where does each animal sleep or swim?',
  kenyanCulturalContext: 'Kenyan wildlife.',
  sourceType: 'CURRICULUM_ALIGNED',
  contentStatus: 'APPROVED'
};

const correctPairs = [
  { leftId: 'l-1', rightId: 'r-1' },
  { leftId: 'l-2', rightId: 'r-2' }
];
const incorrectPairs = [
  { leftId: 'l-1', rightId: 'r-2' },
  { leftId: 'l-2', rightId: 'r-1' }
];

assert(evaluateAnswer(testMatch, correctPairs) === true, 'MATCHING evaluates matched pairs as true');
assert(evaluateAnswer(testMatch, incorrectPairs) === false, 'MATCHING rejects mismatched pairs');

// 2. Migration Schema Inspection
console.log('\n--- 2. Database Migration Schema Verification ---');
const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20261011_02_attempts_and_reports.sql');
assert(fs.existsSync(migrationPath), 'Migration 20261011_02_attempts_and_reports.sql exists');

const sql = fs.readFileSync(migrationPath, 'utf8');
assert(sql.includes('CREATE TABLE IF NOT EXISTS public.attempts'), 'Migration contains attempts table creation');
assert(sql.includes('learner_id TEXT NOT NULL'), 'Attempts table has learner_id');
assert(sql.includes('question_id TEXT NOT NULL'), 'Attempts table has question_id');
assert(sql.includes('is_correct BOOLEAN NOT NULL'), 'Attempts table has is_correct');
assert(sql.includes('time_ms INTEGER NOT NULL DEFAULT 0'), 'Attempts table has time_ms');
assert(sql.includes('idx_attempts_question_id'), 'Attempts table indexes question_id');
assert(sql.includes('idx_attempts_created_at'), 'Attempts table indexes created_at');

assert(sql.includes('CREATE TABLE IF NOT EXISTS public.reports'), 'Migration contains reports table creation');
assert(sql.includes('status IN (\'OPEN\', \'INVESTIGATING\', \'RESOLVED\', \'DISMISSED\')'), 'Reports table enforces valid status enum');
assert(sql.includes('idx_reports_question_id'), 'Reports table indexes question_id');

// 3. Supabase Edge Function Inspection
console.log('\n--- 3. Supabase Edge Function Verification ---');
const edgeFnPath = path.join(process.cwd(), 'supabase', 'functions', 'check-answer', 'index.ts');
assert(fs.existsSync(edgeFnPath), 'Edge function supabase/functions/check-answer/index.ts exists');

const edgeFnCode = fs.readFileSync(edgeFnPath, 'utf8');
assert(edgeFnCode.includes("from('attempts').insert"), 'Edge function logs to attempts table');
assert(edgeFnCode.includes('MULTIPLE_CHOICE'), 'Edge function handles MULTIPLE_CHOICE');
assert(edgeFnCode.includes('MATCHING'), 'Edge function handles MATCHING');

console.log('\n===========================================================');
console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL STEP 2 TESTS PASSED!\n');
  process.exit(0);
}
