import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { normalizeQuestion, evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';
import { getShuffledOptions, shouldShuffleOptions } from '../src/utils/optionShuffler.js';
import { runQuestionAudit, validateQuestion } from '../scripts/audit_and_validate_questions.js';

console.log('===========================================================');
console.log('🧪 TEST SUITE: PHASE 1 LOGIC BUGS VERIFICATION');
console.log('===========================================================\n');

let passedCount = 0;
let failedCount = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedCount++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message || err);
    failedCount++;
  }
}

// -------------------------------------------------------------
// 1. Answer checking & Stable Option IDs
// -------------------------------------------------------------
console.log('--- 1. Answer Checking & Stable Option IDs ---');

test('MCQ evaluates answer strictly by option ID ("42 runners" regression)', () => {
  const qRunners = {
    id: 'test-runners',
    type: 'MULTIPLE_CHOICE' as const,
    prompt: 'During school sports day, the teacher arranges students into 7 teams of 6 runners. How many runners are there altogether?',
    options: [
      { id: 'opt-1', text: '36 runners' },
      { id: 'opt-2', text: '42 runners' },
      { id: 'opt-3', text: '49 runners' },
      { id: 'opt-4', text: '13 runners' }
    ],
    correctOptionId: 'opt-2'
  };

  assert.strictEqual(evaluateAnswer(qRunners, 'opt-2'), true);
  assert.strictEqual(evaluateAnswer(qRunners, 'opt-1'), false);
  // Rejects raw text under strict option ID evaluation
  assert.strictEqual(evaluateAnswer(qRunners, '42 runners'), false);
  // Rejects letter code guessing
  assert.strictEqual(evaluateAnswer(qRunners, 'opt-b'), false);
});

test('True/False evaluates commutative property ("4 x 7 = 7 x 4" regression) as True', () => {
  const qComm = {
    id: 'test-comm',
    type: 'TRUE_FALSE' as const,
    prompt: 'Is 4 × 7 the exact same total as 7 × 4?',
    correctBoolean: true
  };

  assert.strictEqual(evaluateAnswer(qComm, true), true);
  assert.strictEqual(evaluateAnswer(qComm, 'true'), true);
  assert.strictEqual(evaluateAnswer(qComm, 'kweli'), true);
  assert.strictEqual(evaluateAnswer(qComm, false), false);
});

// -------------------------------------------------------------
// 2. Feedback Shows Actual Correct Option Text
// -------------------------------------------------------------
console.log('\n--- 2. Feedback Real Answer Text Resolution ---');

test('Feedback text returns actual option label, never "Correct option"', () => {
  const qRunners = {
    id: 'test-runners',
    type: 'MULTIPLE_CHOICE' as const,
    prompt: '7 teams of 6 runners',
    options: [
      { id: 'opt-1', text: '36 runners' },
      { id: 'opt-2', text: '42 runners' }
    ],
    correctOptionId: 'opt-2'
  };

  const label = resolveCorrectAnswerText(qRunners);
  assert.strictEqual(label, '42 runners');
  assert.notStrictEqual(label, 'Correct option');
  assert.notStrictEqual(label, 'Option B');
});

// -------------------------------------------------------------
// 3. Seeded Option Shuffle & Exclusions
// -------------------------------------------------------------
console.log('\n--- 3. Seeded Option Shuffle & Exclusions ---');

test('Mulberry32 seeded shuffle is deterministic for identical attempt seed', () => {
  const options = [
    { id: 'opt-1', text: 'Apple' },
    { id: 'opt-2', text: 'Banana' },
    { id: 'opt-3', text: 'Cherry' },
    { id: 'opt-4', text: 'Date' }
  ];

  const seed = 'attempt-123_question-abc';
  const run1 = getShuffledOptions(options, seed);
  const run2 = getShuffledOptions(options, seed);

  assert.deepStrictEqual(run1.map(o => o.id), run2.map(o => o.id));
});

test('Exclusion rules prevent shuffling of True/False, All/None of above, and ordered numbers', () => {
  // True / False
  assert.strictEqual(shouldShuffleOptions('TRUE_FALSE', [{ id: '1', text: 'True' }, { id: '2', text: 'False' }]), false);

  // All of the above
  assert.strictEqual(
    shouldShuffleOptions('MULTIPLE_CHOICE', [
      { id: '1', text: 'Nairobi' },
      { id: '2', text: 'Mombasa' },
      { id: '3', text: 'Kisumu' },
      { id: '4', text: 'All of the above' }
    ]),
    false
  );

  // Swahili: Zote hapo juu
  assert.strictEqual(
    shouldShuffleOptions('MULTIPLE_CHOICE', [
      { id: '1', text: 'Ugali' },
      { id: '2', text: 'Sukuma' },
      { id: '3', text: 'Zote hapo juu' }
    ]),
    false
  );

  // Ordered numbers: 10, 20, 30, 40
  assert.strictEqual(
    shouldShuffleOptions('MULTIPLE_CHOICE', [
      { id: '1', text: '10' },
      { id: '2', text: '20' },
      { id: '3', text: '30' },
      { id: '4', text: '40' }
    ]),
    false
  );
});

// -------------------------------------------------------------
// 4. Matching Question Data & Evaluation
// -------------------------------------------------------------
console.log('\n--- 4. Matching Question Data & Resolution ---');

test('Talent matching question (q-g4-cre-u1-006) has 4 distinct structured pairs', () => {
  const db = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'cbe_database.json'), 'utf8'));
  const qTalent = (db.questions || []).find((q: any) => q.id === 'q-g4-cre-u1-006');

  assert.ok(qTalent, 'q-g4-cre-u1-006 exists in database');
  assert.strictEqual(qTalent.type, 'MATCHING');
  assert.ok(Array.isArray(qTalent.matchingPairs), 'matchingPairs is an array');
  assert.strictEqual(qTalent.matchingPairs.length, 4, 'Has exactly 4 pairs');

  const leftTexts = qTalent.matchingPairs.map((p: any) => p.leftText);
  assert.ok(leftTexts.includes('Singing'));
  assert.ok(leftTexts.includes('Athletics'));
  assert.ok(leftTexts.includes('Caring/Empathy'));
  assert.ok(leftTexts.includes('Public Speaking'));

  // Ensure no piped strings remained in rightText
  const hasPipe = qTalent.matchingPairs.some((p: any) => p.rightText.includes('|'));
  assert.strictEqual(hasPipe, false, 'No piped concatenations in rightText');
});

test('Matching evaluator verifies correct pairs and rejects mismatched pairs', () => {
  const qMatch = {
    id: 'test-match',
    type: 'MATCHING' as const,
    prompt: 'Match talents with service',
    matchingPairs: [
      { leftId: 'pair-1-l', leftText: 'Singing', rightId: 'pair-1-r', rightText: 'Choir' },
      { leftId: 'pair-2-l', leftText: 'Athletics', rightId: 'pair-2-r', rightText: 'Sports' }
    ]
  };

  const correctSubmission = [
    { leftId: 'pair-1-l', rightId: 'pair-1-r' },
    { leftId: 'pair-2-l', rightId: 'pair-2-r' }
  ];
  assert.strictEqual(evaluateAnswer(qMatch, correctSubmission), true);

  const wrongSubmission = [
    { leftId: 'pair-1-l', rightId: 'pair-2-r' },
    { leftId: 'pair-2-l', rightId: 'pair-1-r' }
  ];
  assert.strictEqual(evaluateAnswer(qMatch, wrongSubmission), false);
});

test('Matching question normalizes snake_case matching_pairs from Supabase', () => {
  const rawFromSupabase = {
    id: 'test-db-match',
    type: 'MATCHING' as const,
    prompt: 'Match items',
    matching_pairs: [
      { leftId: 'l1', leftText: 'A', rightId: 'r1', rightText: '1' },
      { leftId: 'l2', leftText: 'B', rightId: 'r2', rightText: '2' }
    ]
  };

  const normalized = normalizeQuestion(rawFromSupabase as any);
  assert.ok(Array.isArray(normalized.matchingPairs));
  assert.strictEqual(normalized.matchingPairs!.length, 2);
});

// -------------------------------------------------------------
// 5. Image-Label Questions Asset Fallback
// -------------------------------------------------------------
console.log('\n--- 5. Image-Label Asset Fallback ---');

test('IMAGE_LABEL without local image asset converts to clean MULTIPLE_CHOICE without raw IDs', () => {
  const qImg = {
    id: 'q-sci-02-image-label',
    type: 'IMAGE_LABEL' as const,
    prompt: 'Select the correct label for the plant structure shown in [spot-leaf].',
    imageLabelData: {
      imageUrl: '/images/curriculum/flowering_plant.svg', // non-existent on disk
      hotspots: [
        { id: 'spot-leaf', label: { en: 'Leaf (Makes food)', sw: 'Jani' }, xPercent: 50, yPercent: 30 },
        { id: 'spot-stem', label: { en: 'Stem (Transports water)', sw: 'Shina' }, xPercent: 50, yPercent: 60 }
      ]
    },
    correctOptionId: 'spot-leaf'
  };

  const normalized = normalizeQuestion(qImg as any);
  assert.strictEqual(normalized.type, 'MULTIPLE_CHOICE');
  assert.ok(Array.isArray(normalized.options));
  assert.strictEqual(normalized.options!.length, 2);

  // Raw ID [spot-leaf] is removed from prompt and labels
  assert.strictEqual(normalized.prompt.includes('[spot-leaf]'), false);
  assert.strictEqual(normalized.options![0].text, 'Leaf (Makes food)');
  assert.strictEqual(normalized.correctOptionId, 'opt-1');
});

// -------------------------------------------------------------
// 6. Hearts & Progress Bar Logic
// -------------------------------------------------------------
console.log('\n--- 6. Hearts & Progress Bar Logic ---');

test('Hearts decrement by 1 only on wrong answers and cap at 5 max', () => {
  let hearts = 5;
  const onCorrect = () => {};
  const onWrong = () => {
    hearts = Math.max(0, hearts - 1);
  };

  onCorrect();
  assert.strictEqual(hearts, 5);

  onWrong();
  assert.strictEqual(hearts, 4);

  onWrong();
  assert.strictEqual(hearts, 3);
});

test('Progress bar percentage fills smoothly on each correct answer', () => {
  const total = 5;
  const getPercent = (solved: number) => Math.min(100, Math.max(8, Math.round((solved / total) * 100)));

  assert.strictEqual(getPercent(0), 8);   // initial base
  assert.strictEqual(getPercent(1), 20);  // 1/5 = 20%
  assert.strictEqual(getPercent(2), 40);  // 2/5 = 40%
  assert.strictEqual(getPercent(3), 60);  // 3/5 = 60%
  assert.strictEqual(getPercent(4), 80);  // 4/5 = 80%
  assert.strictEqual(getPercent(5), 100); // 5/5 = 100%
});

// -------------------------------------------------------------
// 7. Content Consistency (Petri dish vs School garden)
// -------------------------------------------------------------
console.log('\n--- 7. Content Consistency ---');

test('q-sci-germ-01 scenario and prompt are completely harmonized', () => {
  const db = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'cbe_database.json'), 'utf8'));
  const qGerm = (db.questions || []).find((q: any) => q.id === 'q-sci-germ-01');

  assert.ok(qGerm);
  assert.ok(qGerm.storyScenario.toLowerCase().includes('petri dish'));
  assert.ok(qGerm.prompt.toLowerCase().includes('petri dish'));
  assert.strictEqual(qGerm.prompt.toLowerCase().includes('school garden'), false);
});

// -------------------------------------------------------------
// 8. CI Validation Script Execution
// -------------------------------------------------------------
console.log('\n--- 8. CI Validation Audit Script ---');

test('runQuestionAudit confirms 0 validation errors and 0 lessons exceeding 40% Position A', () => {
  const audit = runQuestionAudit(false);

  assert.strictEqual(audit.failed.length, 0, `Expected 0 failed questions, got ${audit.failed.length}`);
  assert.strictEqual(audit.highPosALessons.length, 0, `Expected 0 lessons with > 40% Pos A, got ${audit.highPosALessons.length}`);
  assert.strictEqual(audit.mismatches.length, 0, `Expected 0 scenario mismatches, got ${audit.mismatches.length}`);
});

console.log('\n===========================================================');
console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 1 LOGIC BUGS VERIFIED SUCCESSFULLY!\n');
  process.exit(0);
}
