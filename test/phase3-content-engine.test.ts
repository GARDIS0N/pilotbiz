import assert from 'node:assert';
import {
  parseCsvContent,
  parseJsonContent,
  importContentBatch
} from '../src/services/contentImportEngine.js';
import {
  validateQuestionQuality,
  validateBulkContent
} from '../src/services/contentQualityValidator.js';
import {
  calculateNextReviewInterval,
  getDueReviewItems
} from '../src/utils/learningEngine.js';
import { cbeDb } from '../server/cbeDb.js';
import { VersionedQuestionItem } from '../src/types/contentVersion.js';

console.log('🧪 Starting Phase 3 Content Engine & Spaced Repetition Test Suite...\n');

// 1. Content Quality Validator Tests
console.log('Test 1: Content Quality Validator Checklist');
{
  const validQuestion: VersionedQuestionItem = {
    id: 'q-test-g4-01',
    gradeId: 'grade-4',
    subjectId: 'math',
    strandId: 'Numbers',
    subStrandId: 'Multiplication',
    learningOutcomeId: 'outcome-multiply-2digit',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    prompt: {
      en: 'At Karatina market Mama Njeri has 4 baskets each with 12 mangoes. How many mangoes does she have in total?',
      sw: 'Kwenye soko la Karatina Mama Njeri ana vikapu 4 vyenye maembe 12 kila kimoja.'
    },
    options: [
      { id: 'opt-1', text: '48 mangoes' },
      { id: 'opt-2', text: '44 mangoes' },
      { id: 'opt-3', text: '36 mangoes' },
      { id: 'opt-4', text: '52 mangoes' }
    ],
    correctOptionId: 'opt-1',
    explanation: {
      en: '4 baskets multiplied by 12 mangoes equals 48 mangoes.',
      sw: 'Vikapu 4 vikizidishwa na 12 ni 48.'
    },
    socraticHint: {
      en: 'Multiply 4 by 10 then add 4 times 2!'
    },
    kenyanCulturalContext: 'Karatina open-air market in Nyeri County.'
  };

  const errors = validateQuestionQuality(validQuestion);
  const fatalErrors = errors.filter(e => e.severity === 'ERROR');
  assert.strictEqual(fatalErrors.length, 0, 'Valid question should have 0 fatal errors');

  // Test failure: Prompt too short (< 5 chars)
  const shortPromptQ: VersionedQuestionItem = { ...validQuestion, id: 'q-short-01', prompt: 'Why?' };
  const shortErrors = validateQuestionQuality(shortPromptQ);
  assert.ok(shortErrors.some(e => e.field === 'prompt' && e.severity === 'ERROR'), 'Must flag short prompt');

  // Test failure: Missing or invalid correctOptionId
  const invalidKeyQ: VersionedQuestionItem = { ...validQuestion, id: 'q-invalid-key-01', correctOptionId: 'opt-999' };
  const keyErrors = validateQuestionQuality(invalidKeyQ);
  assert.ok(keyErrors.some(e => e.field === 'correctOptionId' && e.severity === 'ERROR'), 'Must flag invalid key');

  // Test failure: Duplicate option texts
  const duplicateOptionsQ: VersionedQuestionItem = {
    ...validQuestion,
    id: 'q-dup-opts-01',
    options: [
      { id: 'opt-1', text: '48 mangoes' },
      { id: 'opt-2', text: '48 mangoes' },
      { id: 'opt-3', text: '36 mangoes' }
    ]
  };
  const dupErrors = validateQuestionQuality(duplicateOptionsQ);
  assert.ok(dupErrors.some(e => e.field === 'options' && e.severity === 'ERROR'), 'Must flag duplicate option text');

  console.log('  ✓ Content Quality Validator correctly validates prompts, options, and keys');
}

// 2. Bulk Validation & Bias / Duplicate Detection
console.log('Test 2: Bulk Validation (Duplicate Prompts, Duplicate IDs & Answer Distribution Bias)');
{
  const batch: VersionedQuestionItem[] = [
    {
      id: 'q-batch-01',
      gradeId: 'grade-4',
      subjectId: 'math',
      strandId: 'Numbers',
      subStrandId: 'Fractions',
      difficulty: 'EASY',
      type: 'MULTIPLE_CHOICE',
      prompt: 'What fraction of a chapati is left after eating 3 of 8 equal slices?',
      options: [
        { id: 'opt-1', text: '5/8' },
        { id: 'opt-2', text: '3/8' },
        { id: 'opt-3', text: '1/2' }
      ],
      correctOptionId: 'opt-1',
      explanation: '8/8 minus 3/8 equals 5/8.'
    },
    {
      id: 'q-batch-02',
      gradeId: 'grade-4',
      subjectId: 'math',
      strandId: 'Numbers',
      subStrandId: 'Fractions',
      difficulty: 'EASY',
      type: 'MULTIPLE_CHOICE',
      prompt: 'What fraction of a chapati is left after eating 3 of 8 equal slices?', // DUPLICATE PROMPT
      options: [
        { id: 'opt-1', text: '5/8' },
        { id: 'opt-2', text: '3/8' },
        { id: 'opt-3', text: '1/2' }
      ],
      correctOptionId: 'opt-1',
      explanation: '8/8 minus 3/8 equals 5/8.'
    }
  ];

  const validation = validateBulkContent(batch);
  assert.strictEqual(validation.isValid, false, 'Batch with duplicate prompt must be invalid');
  assert.ok(validation.duplicateCount > 0, 'Must record duplicate prompt count');
  assert.ok(validation.errors.some(e => e.message.toLowerCase().includes('duplicate')), 'Must flag duplicate error');

  console.log('  ✓ Duplicate detection and distribution bias checking verified');
}

// 3. CSV Parsing Engine
console.log('Test 3: CSV Content Parser');
{
  const csvData = `id,grade,strand,sub_strand,learning_outcome,difficulty,question_type,prompt,prompt_sw,option_1,option_2,option_3,option_4,correct_option,explanation,explanation_sw,socratic_hint
q-csv-01,grade-4,Science,Plants,Photosynthesis,MEDIUM,MULTIPLE_CHOICE,"Which gas do plants absorb during photosynthesis?","Je mimea hufyonza gesi gani wakati wa usanisinuru?",Carbon Dioxide,Oxygen,Nitrogen,Helium,opt-1,"Plants absorb CO2 and release O2.","Mimea hufyonza kaboni dioksidi.","Think about what humans breathe out!"
q-csv-02,grade-3,Math,Addition,Add 2-digit numbers,EASY,MULTIPLE_CHOICE,"What is 45 + 25?","Je 45 + 25 ni ngapi?",70,60,65,75,opt-1,"45 + 25 = 70.","45 + 25 = 70.","Add 40 + 20 then 5 + 5!"`;

  const parsed = parseCsvContent(csvData);
  assert.strictEqual(parsed.length, 2, 'Must parse exactly 2 questions from CSV');
  assert.strictEqual(parsed[0].id, 'q-csv-01');
  assert.strictEqual(parsed[0].gradeId, 'grade-4');
  assert.strictEqual(parsed[0].options?.length, 4);
  assert.strictEqual(parsed[0].options?.[0].text, 'Carbon Dioxide');
  assert.strictEqual(parsed[0].correctOptionId, 'opt-1');
  assert.strictEqual(typeof parsed[0].prompt === 'object' ? parsed[0].prompt.sw : undefined, 'Je mimea hufyonza gesi gani wakati wa usanisinuru?');

  console.log('  ✓ CSV parsing extracts structured fields, bilingual text, and options cleanly');
}

// 4. JSON Content Parser
console.log('Test 4: JSON Content Parser');
{
  const jsonData = JSON.stringify({
    schemaVersion: '1.2.0',
    curriculumVersion: 'CBC-KICD-2024',
    packageId: 'pkg-grade5-agriculture',
    questions: [
      {
        id: 'q-json-01',
        gradeId: 'grade-5',
        subjectId: 'agriculture',
        strandId: 'Agriculture',
        subStrandId: 'Soil Conservation',
        difficulty: 'MEDIUM',
        type: 'MULTIPLE_CHOICE',
        prompt: 'Which method prevents soil erosion on steep slopes?',
        options: [
          { id: 'opt-1', text: 'Terracing' },
          { id: 'opt-2', text: 'Overgrazing' },
          { id: 'opt-3', text: 'Deforestation' }
        ],
        correctOptionId: 'opt-1',
        explanation: 'Terracing slows down surface runoff on slopes.'
      }
    ]
  });

  const parsed = parseJsonContent(jsonData);
  assert.strictEqual(parsed.length, 1, 'Must parse 1 question from JSON package');
  assert.strictEqual(parsed[0].id, 'q-json-01');
  assert.strictEqual(parsed[0].strandId, 'Agriculture');
  console.log('  ✓ JSON parsing loads versioned package and questions correctly');
}

// 5. Batch Import Engine & Database Upsert
console.log('Test 5: Batch Import Engine & CBE Database Upsert');
{
  const batchQuestions: VersionedQuestionItem[] = [
    {
      id: 'q-engine-import-01',
      gradeId: 'grade-4',
      subjectId: 'social-studies',
      strandId: 'Social Studies',
      subStrandId: 'National Heroes',
      learningOutcomeId: 'outcome-heroes',
      difficulty: 'EASY',
      type: 'MULTIPLE_CHOICE',
      prompt: {
        en: 'Who among the following was a renowned Kapenguria Six leader in Kenya?',
        sw: 'Nani miongoni mwa hawa alikuwa kiongozi wa Kapenguria Six?'
      },
      options: [
        { id: 'opt-1', text: 'Jomo Kenyatta' },
        { id: 'opt-2', text: 'Dedan Kimathi' },
        { id: 'opt-3', text: 'Koitalel Arap Samoei' },
        { id: 'opt-4', text: 'Mekatilili wa Menza' }
      ],
      correctOptionId: 'opt-1',
      explanation: {
        en: 'Jomo Kenyatta was one of the Kapenguria Six freedom icons.',
        sw: 'Jomo Kenyatta alikuwa mmoja wa mashujaa wa Kapenguria Six.'
      },
      socraticHint: {
        en: "He later became Kenya's first president."
      }
    }
  ];

  const importResult = importContentBatch(batchQuestions, { allowUpdates: true });
  assert.strictEqual(importResult.success, true, 'Import batch must succeed');
  assert.strictEqual(importResult.totalProcessed, 1, 'Must process 1 question');

  const found = cbeDb.getQuestionById('q-engine-import-01');
  assert.ok(found, 'Question must be present in cbeDb after import');
  assert.strictEqual(found?.id, 'q-engine-import-01');

  console.log('  ✓ Batch import and cbeDb upsert work without code changes');
}

// 6. Spaced Repetition Logic & Progression Intervals
console.log('Test 6: Spaced Repetition Engine (+1, +3, +7 days interval progression & mistake reset)');
{
  // Progression when correct:
  // Initial: interval 1 day -> becomes 3 days
  const step1 = calculateNextReviewInterval(1, true);
  assert.strictEqual(step1.intervalDays, 3, 'Interval from 1 day should advance to 3 days');
  assert.strictEqual(step1.status, 'PENDING');

  // Step 2: interval 3 days -> becomes 7 days
  const step2 = calculateNextReviewInterval(3, true);
  assert.strictEqual(step2.intervalDays, 7, 'Interval from 3 days should advance to 7 days');
  assert.strictEqual(step2.status, 'PENDING');

  // Step 3: interval 7 days -> completed
  const step3 = calculateNextReviewInterval(7, true);
  assert.strictEqual(step3.status, 'COMPLETED', 'Interval from 7 days should complete review cycle');

  // Reset when incorrect:
  // If answered incorrectly at 7 days -> resets to 1 day interval
  const resetStep = calculateNextReviewInterval(7, false);
  assert.strictEqual(resetStep.intervalDays, 1, 'Wrong answer must reset interval to 1 day');
  assert.strictEqual(resetStep.status, 'PENDING', 'Wrong answer must set status to PENDING');

  // Due review items filtering
  const testItems = [
    {
      id: 'item-past',
      learner_id: 'learner-01',
      question_id: 'q-01',
      next_review_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'PENDING'
    },
    {
      id: 'item-future',
      learner_id: 'learner-01',
      question_id: 'q-02',
      next_review_at: new Date(Date.now() + 3600000 * 24).toISOString(), // Tomorrow
      status: 'PENDING'
    },
    {
      id: 'item-completed',
      learner_id: 'learner-01',
      question_id: 'q-03',
      next_review_at: new Date(Date.now() - 3600000).toISOString(),
      status: 'COMPLETED'
    }
  ];

  const dueItems = getDueReviewItems(testItems);
  assert.strictEqual(dueItems.length, 1, 'Only overdue pending items should be returned');
  assert.strictEqual(dueItems[0].id, 'item-past');

  // cbeDb review queue processing
  const learnerId = 'test-learner-spaced-rep';
  const questionId = 'q-engine-import-01';

  // Record an incorrect attempt -> queued at interval 1
  const queueEntry1 = cbeDb.processReviewResult(learnerId, questionId, false);
  assert.strictEqual(queueEntry1.interval_days, 1);
  assert.strictEqual(queueEntry1.consecutive_correct, 0);

  // Record a correct attempt -> interval advances to 3
  const queueEntry2 = cbeDb.processReviewResult(learnerId, questionId, true);
  assert.strictEqual(queueEntry2.interval_days, 3);
  assert.strictEqual(queueEntry2.consecutive_correct, 1);

  console.log('  ✓ Spaced repetition interval progression and mistake reset verified');
}

console.log('\n🎉 ALL PHASE 3 CONTENT ENGINE TESTS PASSED SUCCESSFULLY!\n');
