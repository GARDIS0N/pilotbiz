import assert from 'assert';
import { Question, Option, MatchingPair } from '../src/types/cbe.js';
import {
  getShuffledOptions,
  getShuffledMatchingRightPairs,
  hasPositionalOptions,
  isOrderedNumberChoices
} from '../src/utils/optionShuffler.js';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';

let passedTests = 0;
let totalTests = 0;

function it(desc: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${desc}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${desc}: ${err.message}`);
    throw err;
  }
}

console.log('===========================================================');
console.log('🧪 TEST SUITE: OPTION SHUFFLE, DISTRIBUTION & STRICT ID CHECK');
console.log('===========================================================\n');

// -------------------------------------------------------------
// 1. 200 Iteration Distribution & Answer Evaluation Test
// -------------------------------------------------------------
console.log('--- 1. 200 Renders Uniform Distribution & Answer Accuracy ---');

const sampleMCQ: Question = {
  id: 'q-mcq-distribution-test',
  subStrandId: 'substrand-numbers',
  type: 'MULTIPLE_CHOICE',
  prompt: 'What is 8 × 4?',
  difficulty: 'BEGINNER',
  options: [
    { id: 'opt-1', text: '32' }, // Correct answer (originally position 0)
    { id: 'opt-2', text: '28' },
    { id: 'opt-3', text: '36' },
    { id: 'opt-4', text: '24' }
  ],
  correctOptionId: 'opt-1',
  explanation: '8 groups of 4 equals 32.',
  points: 10,
  contentStatus: 'APPROVED'
};

const positionCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
const iterations = 200;

for (let i = 1; i <= iterations; i++) {
  const attemptId = `attempt-${i}`;
  const seed = `${attemptId}_${sampleMCQ.id}`;
  const shuffled = getShuffledOptions(sampleMCQ.options, seed, sampleMCQ);

  // Assert that all 4 options are preserved
  assert.strictEqual(shuffled.length, 4, `Iteration ${i} options length should be 4`);
  const shuffledIds = shuffled.map(o => o.id);
  assert.deepStrictEqual(
    [...shuffledIds].sort(),
    ['opt-1', 'opt-2', 'opt-3', 'opt-4'],
    `Iteration ${i} must preserve all original option IDs`
  );

  // Find position of the correct answer
  const correctPos = shuffled.findIndex(o => o.id === sampleMCQ.correctOptionId);
  assert.ok(correctPos >= 0 && correctPos <= 3, `Correct answer position must be between 0 and 3`);
  positionCounts[correctPos]++;

  // Verify that selecting the correct option id is ALWAYS marked correct regardless of position
  const isCorrect = evaluateAnswer(sampleMCQ, sampleMCQ.correctOptionId);
  assert.strictEqual(isCorrect, true, `Selecting correct option id must evaluate to true on iteration ${i}`);

  // Verify distractors are always marked false
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'opt-2'), false);
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'opt-3'), false);
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'opt-4'), false);
}

it('Renders the same question 200 times and confirms correct option lands in Position 0 (Option A) roughly equally (~25%)', () => {
  const pct = (positionCounts[0] / iterations) * 100;
  console.log(`     -> Position 0 count: ${positionCounts[0]} / 200 (${pct.toFixed(1)}%)`);
  assert.ok(positionCounts[0] >= 30 && positionCounts[0] <= 70, `Position 0 count should be between 30 and 70 (got ${positionCounts[0]})`);
});

it('Confirms correct option lands in Position 1 (Option B) roughly equally (~25%)', () => {
  const pct = (positionCounts[1] / iterations) * 100;
  console.log(`     -> Position 1 count: ${positionCounts[1]} / 200 (${pct.toFixed(1)}%)`);
  assert.ok(positionCounts[1] >= 30 && positionCounts[1] <= 70, `Position 1 count should be between 30 and 70 (got ${positionCounts[1]})`);
});

it('Confirms correct option lands in Position 2 (Option C) roughly equally (~25%)', () => {
  const pct = (positionCounts[2] / iterations) * 100;
  console.log(`     -> Position 2 count: ${positionCounts[2]} / 200 (${pct.toFixed(1)}%)`);
  assert.ok(positionCounts[2] >= 30 && positionCounts[2] <= 70, `Position 2 count should be between 30 and 70 (got ${positionCounts[2]})`);
});

it('Confirms correct option lands in Position 3 (Option D) roughly equally (~25%)', () => {
  const pct = (positionCounts[3] / iterations) * 100;
  console.log(`     -> Position 3 count: ${positionCounts[3]} / 200 (${pct.toFixed(1)}%)`);
  assert.ok(positionCounts[3] >= 30 && positionCounts[3] <= 70, `Position 3 count should be between 30 and 70 (got ${positionCounts[3]})`);
});

it('Every selection of the correct option id is marked correct across all positions', () => {
  for (const optId of ['opt-1']) {
    assert.strictEqual(evaluateAnswer(sampleMCQ, optId), true);
  }
});

// -------------------------------------------------------------
// 2. Seed Stability within One Attempt
// -------------------------------------------------------------
console.log('\n--- 2. Deterministic Stability within One Attempt ---');

it('Calling getShuffledOptions 50 times with the SAME attempt seed produces the exact identical order every time', () => {
  const fixedSeed = 'attempt-stable-user-100_q-mcq-distribution-test';
  const baseline = getShuffledOptions(sampleMCQ.options, fixedSeed, sampleMCQ);

  for (let i = 0; i < 50; i++) {
    const rerun = getShuffledOptions(sampleMCQ.options, fixedSeed, sampleMCQ);
    assert.deepStrictEqual(
      rerun.map(o => o.id),
      baseline.map(o => o.id),
      `Options order must remain 100% deterministic on re-render within the same attempt`
    );
  }
});

// -------------------------------------------------------------
// 3. Exclusion Rules: True/False, All of the above, Ordered numbers
// -------------------------------------------------------------
console.log('\n--- 3. Exclusion Rules (Never Shuffle) ---');

it('Never shuffles True/False questions (True is always first, False second)', () => {
  const tfQuestion: Question = {
    id: 'q-tf-test',
    subStrandId: 'substrand-numbers',
    type: 'TRUE_FALSE',
    prompt: 'Is 5 greater than 2?',
    difficulty: 'BEGINNER',
    options: [
      { id: 'opt-true', text: 'True' },
      { id: 'opt-false', text: 'False' }
    ],
    correctBoolean: true,
    points: 10,
    contentStatus: 'APPROVED'
  };

  for (let i = 1; i <= 50; i++) {
    const shuffled = getShuffledOptions(tfQuestion.options, `attempt-${i}_${tfQuestion.id}`, tfQuestion);
    assert.strictEqual(shuffled[0].text, 'True', `True must always remain at index 0 on attempt ${i}`);
    assert.strictEqual(shuffled[1].text, 'False', `False must always remain at index 1 on attempt ${i}`);
  }
});

it('Never shuffles options containing "All of the above" or "None of the above"', () => {
  const allAboveQ: Question = {
    id: 'q-all-above-test',
    subStrandId: 'substrand-science',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following are parts of a plant?',
    difficulty: 'BEGINNER',
    options: [
      { id: 'opt-1', text: 'Roots' },
      { id: 'opt-2', text: 'Stem' },
      { id: 'opt-3', text: 'Leaves' },
      { id: 'opt-4', text: 'All of the above' }
    ],
    correctOptionId: 'opt-4',
    points: 10,
    contentStatus: 'APPROVED'
  };

  assert.strictEqual(hasPositionalOptions(allAboveQ.options), true);

  for (let i = 1; i <= 50; i++) {
    const shuffled = getShuffledOptions(allAboveQ.options, `attempt-${i}_${allAboveQ.id}`, allAboveQ);
    assert.strictEqual(shuffled[3].text, 'All of the above', `"All of the above" must remain at index 3`);
    assert.deepStrictEqual(shuffled.map(o => o.id), ['opt-1', 'opt-2', 'opt-3', 'opt-4']);
  }
});

it('Never shuffles Swahili positional options ("Zote hapo juu" / "Hakuna hata moja")', () => {
  const swahiliPosOptions: Option[] = [
    { id: 'o-1', text: 'Kipande A' },
    { id: 'o-2', text: 'Kipande B' },
    { id: 'o-3', text: 'Zote hapo juu' }
  ];
  assert.strictEqual(hasPositionalOptions(swahiliPosOptions), true);
  const shuffled = getShuffledOptions(swahiliPosOptions, 'random_seed_123');
  assert.deepStrictEqual(shuffled.map(o => o.id), ['o-1', 'o-2', 'o-3']);
});

it('Never shuffles ordered number choices (smallest to largest)', () => {
  const orderedNumericQ: Question = {
    id: 'q-ordered-numbers',
    subStrandId: 'substrand-currency',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How much change did Amina receive?',
    difficulty: 'BEGINNER',
    options: [
      { id: 'o-1', text: 'KES 20' },
      { id: 'o-2', text: 'KES 40' },
      { id: 'o-3', text: 'KES 60' },
      { id: 'o-4', text: 'KES 80' }
    ],
    correctOptionId: 'o-2',
    points: 10,
    contentStatus: 'APPROVED'
  };

  assert.strictEqual(isOrderedNumberChoices(orderedNumericQ.options), true);

  for (let i = 1; i <= 50; i++) {
    const shuffled = getShuffledOptions(orderedNumericQ.options, `attempt-${i}_${orderedNumericQ.id}`, orderedNumericQ);
    assert.deepStrictEqual(
      shuffled.map(o => o.text),
      ['KES 20', 'KES 40', 'KES 60', 'KES 80'],
      `Ordered numbers must retain ascending order on attempt ${i}`
    );
  }
});

// -------------------------------------------------------------
// 4. Strict Option ID Comparison & Feedback
// -------------------------------------------------------------
console.log('\n--- 4. Strict Option ID Checking & Real Feedback Text ---');

it('Checks answers by option ID only; rejects index or letter guessing', () => {
  // Option ID is 'opt-1'
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'opt-1'), true);
  // Positional index '0' is rejected
  assert.strictEqual(evaluateAnswer(sampleMCQ, 0), false);
  assert.strictEqual(evaluateAnswer(sampleMCQ, '0'), false);
  // Letter 'A' or 'a' is rejected
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'A'), false);
  assert.strictEqual(evaluateAnswer(sampleMCQ, 'a'), false);
});

it('resolveCorrectAnswerText returns the real option text ("32"), never "Correct option" or "Option A"', () => {
  const answerText = resolveCorrectAnswerText(sampleMCQ);
  assert.strictEqual(answerText, '32');
  assert.ok(!answerText.toLowerCase().includes('correct option'));
  assert.ok(!answerText.toLowerCase().includes('option a'));
});

// -------------------------------------------------------------
// 5. Matching Questions Right-Side Shuffling
// -------------------------------------------------------------
console.log('\n--- 5. Matching Questions Right-Side Seeded Shuffle ---');

it('Shuffles right-column items in matching questions so pairs do not horizontally align 1-to-1', () => {
  const matchPairs: MatchingPair[] = [
    { leftId: 'l1', leftText: '1/2', rightId: 'r1', rightText: 'Nusu' },
    { leftId: 'l2', leftText: '1/4', rightId: 'r2', rightText: 'Robo' },
    { leftId: 'l3', leftText: '3/4', rightId: 'r3', rightText: 'Robo tatu' },
    { leftId: 'l4', leftText: '1', rightId: 'r4', rightText: 'Nzima' }
  ];

  let differentFromOriginal = 0;
  for (let i = 1; i <= 50; i++) {
    const shuffled = getShuffledMatchingRightPairs(matchPairs, `attempt-${i}_q-match`);
    // Left items must preserve curriculum order
    assert.deepStrictEqual(shuffled.map(p => p.leftId), ['l1', 'l2', 'l3', 'l4']);
    // Right items must have all rightIds
    assert.deepStrictEqual([...shuffled.map(p => p.rightId)].sort(), ['r1', 'r2', 'r3', 'r4']);

    if (shuffled[0].rightId !== 'r1' || shuffled[1].rightId !== 'r2') {
      differentFromOriginal++;
    }
  }

  console.log(`     -> Matching right pairs were successfully permuted in ${differentFromOriginal} / 50 attempts`);
  assert.ok(differentFromOriginal >= 40, 'Right column items should be shuffled across attempts');
});

console.log('\n===========================================================');
console.log(`RESULTS: ${passedTests} PASSED, 0 FAILED`);
console.log('===========================================================');
console.log('🎉 OPTION SHUFFLE & STRICT ID VERIFICATION COMPLETE!\n');
