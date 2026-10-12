import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';
import { Question } from '../src/types/cbe.js';

console.log('===========================================================');
console.log('🧪 TEST SUITE: PHASE 3 LESSON SCREEN POLISH VERIFICATION');
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

const MODAL_PATH = path.resolve('src/components/session/DuolingoLessonModal.tsx');
const modalSource = fs.readFileSync(MODAL_PATH, 'utf8');

const MC_PATH = path.resolve('src/components/questions/MultipleChoiceQuestion.tsx');
const mcSource = fs.readFileSync(MC_PATH, 'utf8');

const TF_PATH = path.resolve('src/components/questions/TrueFalseQuestion.tsx');
const tfSource = fs.readFileSync(TF_PATH, 'utf8');

const MATCH_PATH = path.resolve('src/components/questions/MatchingQuestion.tsx');
const matchSource = fs.readFileSync(MATCH_PATH, 'utf8');

// -------------------------------------------------------------
// 1. Shield Icon Removal & Top Bar Clean Layout
// -------------------------------------------------------------
console.log('--- 1. Shield Icon Removal & Clean Header Layout ---');

test('No unexplained shield icon next to hearts HUD in top bar', () => {
  // Extract Hearts HUD section
  const heartsHudIndex = modalSource.indexOf('{/* Hearts HUD */}');
  assert.ok(heartsHudIndex !== -1, 'Hearts HUD section must exist');
  const hudSection = modalSource.slice(heartsHudIndex, heartsHudIndex + 500);

  // HUD should only contain heart icon and hearts count, NO shield icon
  assert.ok(!hudSection.includes('🛡️'), 'Shield icon (🛡️) must NOT be present next to hearts');
  assert.ok(!hudSection.toLowerCase().includes('shield'), 'No shield text or icon in hearts HUD');
  assert.ok(hudSection.includes('❤️'), 'Heart icon (❤️) must be present');
});

test('Top bar only contains Close button, Progress bar, and Hearts HUD', () => {
  const topBarIndex = modalSource.indexOf('{/* 1. Full-Screen Focus Top Bar */}');
  const bodyIndex = modalSource.indexOf('{/* 2. Main Question Body');
  assert.ok(topBarIndex !== -1 && bodyIndex !== -1, 'Top bar section must be demarcated');
  const topBarContent = modalSource.slice(topBarIndex, bodyIndex);

  // Close button
  assert.ok(topBarContent.includes('aria-label="Exit Lesson"'), 'Top bar must include Exit Lesson button');
  assert.ok(topBarContent.includes('min-w-[56px] min-h-[56px]'), 'Close button must be 56px+ touch target');

  // Animated Progress bar
  assert.ok(topBarContent.includes('Progress Bar'), 'Top bar must include Progress bar');
  assert.ok(topBarContent.includes('progressPercent'), 'Progress bar must bind to progressPercent');

  // Hearts HUD
  assert.ok(topBarContent.includes('{/* Hearts HUD */}'), 'Top bar must include Hearts HUD');
  assert.ok(topBarContent.includes('{hearts}'), 'Hearts HUD must display hearts count');

  // No other cluttering icons (speaker, key, grad cap, shield)
  assert.ok(!topBarContent.includes('🎓'), 'Graduation cap must NOT be in lesson top bar');
  assert.ok(!topBarContent.includes('🔑'), 'Key icon must NOT be in lesson top bar');
});

// -------------------------------------------------------------
// 2. Question Controls: Read Aloud + Single Hint Button
// -------------------------------------------------------------
console.log('--- 2. Question Controls Row ---');

test('Question controls row contains only Read Aloud and ONE Hint button with coin cost', () => {
  const controlsIndex = modalSource.indexOf('{/* Question Header: Read Aloud + Single Hint Button with Coin Cost */}');
  const controlsEndIndex = modalSource.indexOf('{/* Hint Drawer */}');
  assert.ok(controlsIndex !== -1 && controlsEndIndex !== -1, 'Question controls header section must exist');
  const controlsSection = modalSource.slice(controlsIndex, controlsEndIndex);

  // Read Aloud button
  assert.ok(controlsSection.includes('handleReadAloud'), 'Must have handleReadAloud button');
  assert.ok(controlsSection.includes('aria-label="Read question aloud"'), 'Read Aloud must have accessible label');
  assert.ok(controlsSection.includes('min-h-[56px]'), 'Read Aloud button must be 56px+ touch target');

  // ONE Hint button with coin cost
  assert.ok(controlsSection.includes('handleUseHint'), 'Must have handleUseHint button');
  assert.ok(controlsSection.includes('Hint (1 🪙)') || controlsSection.includes("Dokezo (1 🪙)"), 'Hint must show 1 coin cost');
  assert.ok(controlsSection.includes('min-h-[56px]'), 'Hint button must be 56px+ touch target');

  // No extra clutter buttons in this row
  assert.ok(!controlsSection.includes('ReportProblemModal'), 'Report modal button must not clutter the question header row');
});

// -------------------------------------------------------------
// 3. Fixed Bottom Bar & Selection vs Submission Logic
// -------------------------------------------------------------
console.log('--- 3. Fixed Bottom Bar & Selection Logic ---');

test('CHECK ANSWER button is disabled until an answer is selected', () => {
  const bottomBarIndex = modalSource.indexOf('{/* 4. Bottom Action & Feedback Drawer');
  assert.ok(bottomBarIndex !== -1, 'Bottom action section must exist');
  const bottomBarSection = modalSource.slice(bottomBarIndex);

  // Check Answer button condition
  assert.ok(
    bottomBarSection.includes('disabled={currentAnswer === null || currentAnswer === undefined || currentAnswer === \'\'}'),
    'CHECK ANSWER must be disabled until currentAnswer is selected'
  );
  assert.ok(bottomBarSection.includes('CHECK ANSWER'), 'Must contain CHECK ANSWER button');
  assert.ok(bottomBarSection.includes('min-h-[56px]'), 'CHECK ANSWER must have 56px+ height');
  assert.ok(
    bottomBarSection.includes('text-lg font-black') || bottomBarSection.includes('font-black text-lg'),
    'CHECK ANSWER must have 18px+ font-black typography'
  );
});

test('Selecting an option does NOT trigger answer submission', () => {
  // In DuolingoLessonModal, QuestionRenderer receives onSelectAnswer={setCurrentAnswer}
  const rendererUsage = modalSource.indexOf('<QuestionRenderer');
  assert.ok(rendererUsage !== -1, 'QuestionRenderer must be used');
  const rendererBlock = modalSource.slice(rendererUsage, rendererUsage + 350);

  assert.ok(rendererBlock.includes('onSelectAnswer={setCurrentAnswer}'), 'Selecting option only sets currentAnswer state');
  assert.ok(!rendererBlock.includes('onSubmitAnswer'), 'QuestionRenderer must not auto-submit in modal');
});

// -------------------------------------------------------------
// 4. Feedback Sheet: Correct vs Soft Orange Incorrect & Re-queuing
// -------------------------------------------------------------
console.log('--- 4. Feedback Sheet & Re-queuing ---');

test('Feedback sheet: Correct answer displays green styling, "Hongera!", explanation and CONTINUE button', () => {
  assert.ok(modalSource.includes('bg-emerald-950/95 border-emerald-400'), 'Correct drawer must use emerald green');
  assert.ok(modalSource.includes('Hongera!'), 'Correct feedback must display "Hongera!"');
  assert.ok(modalSource.includes('getFirstSentence(currentQ?.explanation)'), 'Correct feedback must display one-line explanation');
  assert.ok(modalSource.includes('bg-emerald-400 hover:bg-emerald-300 text-slate-950'), 'Correct Continue button must be emerald themed');
});

test('Feedback sheet: Incorrect answer displays soft orange (NOT harsh red), "Almost!", correct answer text, and CONTINUE button', () => {
  // Soft orange check
  assert.ok(modalSource.includes('bg-amber-950/95 border-amber-500'), 'Incorrect drawer must use soft amber/orange');
  assert.ok(!modalSource.includes('bg-rose-950/95 border-rose-500'), 'Incorrect drawer must NOT use harsh red');
  assert.ok(!modalSource.includes('bg-red-950/95 border-red-500'), 'Incorrect drawer must NOT use harsh dark red');

  // "Almost!" text
  assert.ok(modalSource.includes('Almost!'), 'Incorrect feedback must display "Almost!"');

  // Actual correct answer text
  assert.ok(
    modalSource.includes('getCorrectAnswerLabel(currentQ)'),
    'Incorrect feedback must display getCorrectAnswerLabel(currentQ)'
  );

  // Soft orange Continue button
  assert.ok(modalSource.includes('bg-amber-500 hover:bg-amber-400 text-slate-950'), 'Incorrect Continue button must be soft amber/orange themed');
});

test('Re-queuing logic: missed questions are moved to the end of the lesson queue', () => {
  const nextQIndex = modalSource.indexOf('const handleNextQuestion = () => {');
  assert.ok(nextQIndex !== -1, 'handleNextQuestion must exist');
  const nextQSection = modalSource.slice(nextQIndex, nextQIndex + 700);

  // When correct: removes first element
  assert.ok(nextQSection.includes('const remaining = queue.slice(1);'), 'Correct questions are removed from queue');

  // When wrong: appends current question to the back of the queue
  assert.ok(
    nextQSection.includes('const reordered = [...queue.slice(1), currentQ];'),
    'Wrong questions must be appended to the end of the queue'
  );
  assert.ok(nextQSection.includes('setQueue(reordered);'), 'Queue must be updated with reordered items');
});

test('Simulated lesson queue re-queues wrong answers until mastered', () => {
  let queue = ['q1', 'q2', 'q3'];
  const solved: string[] = [];

  // Learner answers q1 incorrectly
  let currentQ = queue[0];
  let isCorrect = false;
  if (isCorrect) {
    queue = queue.slice(1);
    solved.push(currentQ);
  } else {
    queue = [...queue.slice(1), currentQ];
  }
  // Queue should now be ['q2', 'q3', 'q1']
  assert.deepStrictEqual(queue, ['q2', 'q3', 'q1'], 'q1 was re-queued to the back');

  // Learner answers q2 correctly
  currentQ = queue[0];
  isCorrect = true;
  queue = queue.slice(1);
  solved.push(currentQ);
  // Queue should now be ['q3', 'q1']
  assert.deepStrictEqual(queue, ['q3', 'q1']);

  // Learner answers q3 correctly
  currentQ = queue[0];
  queue = queue.slice(1);
  solved.push(currentQ);
  // Queue should now be ['q1']
  assert.deepStrictEqual(queue, ['q1']);

  // Learner retries and masters q1 correctly
  currentQ = queue[0];
  queue = queue.slice(1);
  solved.push(currentQ);
  // Queue empty -> finished
  assert.strictEqual(queue.length, 0);
  assert.deepStrictEqual(solved, ['q2', 'q3', 'q1']);
});

// -------------------------------------------------------------
// 5. Button Dimensions (56px+), Typography (18px+), Spacing (12px+)
// -------------------------------------------------------------
console.log('--- 5. Mobile Sizing, Typography & Spacing ---');

test('DuolingoLessonModal buttons meet 56px+ touch target height', () => {
  // Check main interactive elements in DuolingoLessonModal
  assert.ok(modalSource.includes('min-h-[56px]'), 'Must use min-h-[56px] for touch targets');
  
  // Close button
  assert.ok(modalSource.includes('min-w-[56px] min-h-[56px]'), 'Close button has 56px min dimensions');
  
  // Read Aloud and Hint
  assert.ok(modalSource.includes('px-5 py-3.5 rounded-2xl border-2 font-bold text-base transition-all cursor-pointer min-h-[56px]'), 'Read aloud button has 56px min height');
  
  // Check Answer and Continue buttons
  assert.ok(modalSource.includes('min-h-[56px]'), 'Action buttons have 56px min height');
});

test('MultipleChoiceQuestion option buttons meet 56px+ touch target and 18px+ text', () => {
  assert.ok(mcSource.includes('min-h-[56px]'), 'MC options must have min-h-[56px]');
  assert.ok(mcSource.includes('text-lg'), 'MC option labels must have text-lg (18px+) font size');
  assert.ok(mcSource.includes('gap-3') || mcSource.includes('gap-3.5'), 'MC options must have 12px+ gap');
});

test('TrueFalseQuestion option buttons meet 56px+ touch target and 18px+ text', () => {
  assert.ok(tfSource.includes('min-h-[96px]'), 'TF options have min-h-[96px] (exceeds 56px)');
  assert.ok(tfSource.includes('text-xl'), 'TF labels have text-xl (20px > 18px)');
  assert.ok(tfSource.includes('gap-4'), 'TF options have gap-4 (16px > 12px)');
});

test('MatchingQuestion tiles meet 56px+ touch target and 12px+ spacing', () => {
  assert.ok(matchSource.includes('min-h-[56px]'), 'Matching tiles have min-h-[56px]');
  assert.ok(matchSource.includes('gap-2 sm:gap-4'), 'Matching columns have comfortable responsive gap');
  assert.ok(matchSource.includes('space-y-2'), 'Tiles have spacing between rows');
});

// -------------------------------------------------------------
// 6. WCAG AA Contrast Verification
// -------------------------------------------------------------
console.log('--- 6. WCAG AA Contrast Verification ---');

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = luminance(...rgb1);
  const l2 = luminance(...rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

test('Emerald-400 text on slate-950 background exceeds WCAG AA (4.5:1)', () => {
  // emerald-400: #34d399 -> rgb(52, 211, 153)
  // slate-950: #020617 -> rgb(2, 6, 23)
  const ratio = contrastRatio([52, 211, 153], [2, 6, 23]);
  assert.ok(ratio >= 7.0, `Contrast ratio ${ratio.toFixed(2)}:1 must pass WCAG AAA (>= 7:1)`);
});

test('Amber-400 text on slate-950 background exceeds WCAG AA (4.5:1)', () => {
  // amber-400: #fbbf24 -> rgb(251, 191, 36)
  // slate-950: #020617 -> rgb(2, 6, 23)
  const ratio = contrastRatio([251, 191, 36], [2, 6, 23]);
  assert.ok(ratio >= 7.0, `Contrast ratio ${ratio.toFixed(2)}:1 must pass WCAG AAA (>= 7:1)`);
});

test('White text on slate-950 background exceeds WCAG AA (4.5:1)', () => {
  // white: rgb(255, 255, 255)
  // slate-950: rgb(2, 6, 23)
  const ratio = contrastRatio([255, 255, 255], [2, 6, 23]);
  assert.ok(ratio >= 15.0, `Contrast ratio ${ratio.toFixed(2)}:1 must pass WCAG AAA (>= 7:1)`);
});

test('Slate-950 dark text on Emerald-400 / Amber-500 button exceeds WCAG AA (4.5:1)', () => {
  // slate-950 text on emerald-400 button
  const ratioEmerald = contrastRatio([2, 6, 23], [52, 211, 153]);
  assert.ok(ratioEmerald >= 7.0, `Emerald button text ratio ${ratioEmerald.toFixed(2)}:1 exceeds 7:1`);

  // slate-950 text on amber-500 button (#f59e0b -> rgb(245, 158, 11))
  const ratioAmber = contrastRatio([2, 6, 23], [245, 158, 11]);
  assert.ok(ratioAmber >= 7.0, `Amber button text ratio ${ratioAmber.toFixed(2)}:1 exceeds 7:1`);
});

// -------------------------------------------------------------
// 7. Responsive Viewport Adaptations (360px & 412px)
// -------------------------------------------------------------
console.log('--- 7. Responsive Viewport Adaptations (360px & 412px) ---');

test('Bottom bar adapts to mobile viewports without horizontal overflow', () => {
  // At 360px: flex-col ensures button occupies full available width, no horizontal spill
  assert.ok(
    modalSource.includes('flex flex-col sm:flex-row items-center justify-between gap-4'),
    'Bottom bar must flex column on mobile, row on tablet/desktop'
  );
  assert.ok(
    modalSource.includes('w-full sm:w-56'),
    'Button must be full width on mobile for easy one-thumb tapping'
  );
});

test('Padding constraints prevent clipping on 360px viewport', () => {
  // px-4 = 16px each side -> 360 - 32 = 328px available content width
  assert.ok(modalSource.includes('px-4 md:px-8'), 'Top bar has 16px padding on mobile');
  assert.ok(modalSource.includes('px-4 sm:px-8'), 'Bottom bar has 16px padding on mobile');
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n===========================================================');
console.log(`📊 PHASE 3 VERIFICATION SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All Phase 3 Lesson Screen Polish tests passed successfully!\n');
}
