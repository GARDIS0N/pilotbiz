import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { evaluateAnswer, resolveCorrectAnswerText, normalizeQuestion } from '../src/utils/answerValidation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('===========================================================');
console.log('🧪 JIFUNO CBC QUESTION KEY VALIDATION TEST SUITE');
console.log('===========================================================\n');

let totalQuestionsAudited = 0;
let totalPassed = 0;
const failures: { id: string; type: string; prompt: string; reason: string }[] = [];

// 1. Audit data/cbe_database.json
const dbPath = path.join(rootDir, 'data', 'cbe_database.json');
if (fs.existsSync(dbPath)) {
  const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const questions = dbContent.questions || [];
  console.log(`Auditing ${questions.length} questions from data/cbe_database.json...`);

  for (const rawQ of questions) {
    totalQuestionsAudited++;
    const q = normalizeQuestion(rawQ);

    // Validate prompt
    if (!q.prompt || typeof q.prompt !== 'string' || q.prompt.trim().length === 0) {
      failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: 'Empty prompt' });
      continue;
    }

    // Validate correct answer label
    const label = resolveCorrectAnswerText(q);
    if (!label || label === 'Correct option' || label.trim().length === 0) {
      failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: `Invalid correct answer label: "${label}"` });
      continue;
    }

    // Type-specific validations
    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE') {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: `Less than 2 options: ${q.options?.length}` });
        continue;
      }

      // Check whether correctOptionId or correctAnswer exists
      const hasValidOption = q.options.some((opt: any) => opt.id === q.correctOptionId || opt.text === (q as any).correctAnswer);
      if (!hasValidOption) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: `correctOptionId "${q.correctOptionId}" not in options` });
        continue;
      }

      // Check evaluateAnswer against correctOptionId
      const evalById = evaluateAnswer(q, q.correctOptionId);
      const correctOpt = q.options.find((opt: any) => opt.id === q.correctOptionId);
      const evalByText = correctOpt ? evaluateAnswer(q, correctOpt.text) : true;

      if (!evalById && !evalByText) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: 'evaluateAnswer returned false for correct answer' });
        continue;
      }
    } else if (q.type === 'TRUE_FALSE') {
      if (typeof q.correctBoolean !== 'boolean' && (q as any).correctAnswer === undefined) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: 'correctBoolean is not a boolean' });
        continue;
      }

      const expectedBool = typeof q.correctBoolean === 'boolean'
        ? q.correctBoolean
        : String((q as any).correctAnswer).toLowerCase() === 'true';

      const evalBool = evaluateAnswer(q, expectedBool);
      const evalStr = evaluateAnswer(q, expectedBool ? 'True' : 'False');

      if (!evalBool || !evalStr) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: 'evaluateAnswer failed for True/False question' });
        continue;
      }
    } else if (q.type === 'FILL_BLANK') {
      const answers = q.fillBlankAnswers || [(q as any).correctAnswer];
      if (!Array.isArray(answers) || answers.length === 0 || !answers[0]) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: 'Missing fillBlankAnswers' });
        continue;
      }
      if (!evaluateAnswer(q, answers[0])) {
        failures.push({ id: q.id, type: q.type, prompt: q.prompt, reason: `evaluateAnswer failed for fill-blank answer "${answers[0]}"` });
        continue;
      }
    }

    totalPassed++;
  }
}

// 2. Specific prompt regressions
console.log('\nValidating specific user-reported regression questions:');

// Test 1: "42 runners" for 7 teams of 6
const qRunners = {
  id: 'test-runners',
  type: 'MULTIPLE_CHOICE' as const,
  prompt: 'If there are 7 teams with 6 runners each, how many runners are there in total?',
  options: [
    { id: 'opt-1', text: '42 runners' },
    { id: 'opt-2', text: '36 runners' },
    { id: 'opt-3', text: '48 runners' },
    { id: 'opt-4', text: '40 runners' }
  ],
  correctOptionId: 'opt-1'
};

const runnersById = evaluateAnswer(qRunners, 'opt-1');
const runnersByText = evaluateAnswer(qRunners, '42 runners');
console.log(`  ✓ "42 runners" evaluated by ID: ${runnersById}`);
console.log(`  ✓ "42 runners" evaluated by text: ${runnersByText}`);
if (!runnersById || !runnersByText) {
  failures.push({ id: 'test-runners', type: 'MCQ', prompt: qRunners.prompt, reason: 'Failed 42 runners regression' });
}

// Test 2: "Is 4 x 7 the same as 7 x 4?"
const qCommutative = {
  id: 'test-commutative',
  type: 'TRUE_FALSE' as const,
  prompt: 'Is 4 x 7 the same as 7 x 4?',
  options: [
    { id: 'opt-true', text: 'True' },
    { id: 'opt-false', text: 'False' }
  ],
  correctBoolean: true
};

const commByBool = evaluateAnswer(qCommutative, true);
const commByTrueStr = evaluateAnswer(qCommutative, 'True');
const commByOptId = evaluateAnswer(qCommutative, 'opt-true');
console.log(`  ✓ "Is 4 x 7 the same as 7 x 4?" evaluated by boolean (true): ${commByBool}`);
console.log(`  ✓ "Is 4 x 7 the same as 7 x 4?" evaluated by "True": ${commByTrueStr}`);
console.log(`  ✓ "Is 4 x 7 the same as 7 x 4?" evaluated by option ID "opt-true": ${commByOptId}`);
if (!commByBool || !commByTrueStr || !commByOptId) {
  failures.push({ id: 'test-commutative', type: 'TRUE_FALSE', prompt: qCommutative.prompt, reason: 'Failed 4x7 commutative regression' });
}

// Test 3: Feedback label resolution
const labelRunners = resolveCorrectAnswerText(qRunners);
const labelComm = resolveCorrectAnswerText(qCommutative);
console.log(`  ✓ Feedback text for runners: "${labelRunners}" (not "Correct option")`);
console.log(`  ✓ Feedback text for commutative: "${labelComm}" (not "Correct option")`);
if (labelRunners === 'Correct option' || labelComm === 'Correct option') {
  failures.push({ id: 'feedback-labels', type: 'ALL', prompt: 'Feedback resolution', reason: 'Returned placeholder "Correct option"' });
}

console.log('\n===========================================================');
console.log(`SUMMARY: ${totalPassed} / ${totalQuestionsAudited} questions passed validation.`);
if (failures.length > 0) {
  console.error(`❌ ${failures.length} question validations failed!`);
  console.error(failures.slice(0, 10));
  process.exit(1);
} else {
  console.log('✅ ALL QUESTION VALIDATIONS PASSED WITH 100% ACCURACY!');
  console.log('===========================================================\n');
  process.exit(0);
}
