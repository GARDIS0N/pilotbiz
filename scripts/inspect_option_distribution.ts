import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

function inspect() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];

  console.log(`Total questions in database: ${questions.length}`);

  const typeCounts: Record<string, number> = {};
  for (const q of questions) {
    typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
  }
  console.log('Question types breakdown:', typeCounts);

  const mcqQuestions = questions.filter(q => 
    q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE' || q.type === 'SCENARIO'
  );

  console.log(`\nTotal MCQ / choice-based questions: ${mcqQuestions.length}`);

  let missingCorrectOptionId = 0;
  let hasCorrectAnswerTextOnly = 0;
  let correctOptionIdFormat: Record<string, number> = {};
  let positionCounts: Record<string, number> = {
    'Position 0 (Option A)': 0,
    'Position 1 (Option B)': 0,
    'Position 2 (Option C)': 0,
    'Position 3 (Option D)': 0,
    'Other/Unmatched': 0
  };

  let sampleIssues: any[] = [];

  for (const q of mcqQuestions) {
    const options = q.options || [];
    const correctId = q.correctOptionId || q.correct_option_id;
    const correctAnswer = q.correctAnswer;

    if (!correctId && correctAnswer) {
      hasCorrectAnswerTextOnly++;
    } else if (!correctId) {
      missingCorrectOptionId++;
    }

    if (correctId) {
      let format = 'other';
      if (/^opt-\d+$/.test(correctId)) format = 'opt-number (e.g. opt-1)';
      else if (/^[a-d]$/i.test(correctId)) format = 'single-letter (e.g. a, b)';
      else if (/^opt-[a-d]$/i.test(correctId)) format = 'opt-letter (e.g. opt-a)';
      else if (/^\d+$/.test(correctId)) format = 'numeric-index (e.g. 0, 1)';
      else format = `custom (${correctId})`;

      correctOptionIdFormat[format] = (correctOptionIdFormat[format] || 0) + 1;
    }

    // Determine position in options array
    let posIndex = -1;
    if (Array.isArray(options)) {
      posIndex = options.findIndex((opt: any) => {
        if (typeof opt === 'string') return opt === correctId || opt === correctAnswer;
        if (opt && typeof opt === 'object') {
          return opt.id === correctId || 
                 (correctAnswer && opt.text === correctAnswer) ||
                 (correctId && (opt.id === `opt-${correctId}` || opt.id?.toLowerCase() === String(correctId).toLowerCase()));
        }
        return false;
      });
    }

    if (posIndex === 0) positionCounts['Position 0 (Option A)']++;
    else if (posIndex === 1) positionCounts['Position 1 (Option B)']++;
    else if (posIndex === 2) positionCounts['Position 2 (Option C)']++;
    else if (posIndex === 3) positionCounts['Position 3 (Option D)']++;
    else {
      positionCounts['Other/Unmatched']++;
      if (sampleIssues.length < 5) {
        sampleIssues.push({
          id: q.id,
          type: q.type,
          prompt: q.prompt?.slice(0, 50),
          correctOptionId: q.correctOptionId,
          correctAnswer: q.correctAnswer,
          options: options?.map((o: any) => typeof o === 'object' ? { id: o.id, text: o.text } : o)
        });
      }
    }
  }

  console.log('\nKey Formats for correctOptionId:');
  console.log(correctOptionIdFormat);
  console.log({ missingCorrectOptionId, hasCorrectAnswerTextOnly });

  console.log('\nOriginal Correct Answer Position Distribution across all MCQs:');
  for (const [pos, count] of Object.entries(positionCounts)) {
    const pct = ((count / mcqQuestions.length) * 100).toFixed(2);
    console.log(`  ${pos}: ${count} (${pct}%)`);
  }

  if (sampleIssues.length > 0) {
    console.log('\nSample Unmatched Questions:', JSON.stringify(sampleIssues, null, 2));
  }

  // Also check True/False questions
  const tfQuestions = questions.filter(q => q.type === 'TRUE_FALSE');
  console.log(`\nTotal True/False questions: ${tfQuestions.length}`);
  let tfTrueCount = 0;
  let tfFalseCount = 0;
  let tfMissing = 0;
  for (const q of tfQuestions) {
    if (q.correctBoolean === true || q.correct_boolean === true || String(q.correctAnswer).toLowerCase() === 'true') tfTrueCount++;
    else if (q.correctBoolean === false || q.correct_boolean === false || String(q.correctAnswer).toLowerCase() === 'false') tfFalseCount++;
    else tfMissing++;
  }
  console.log(`  True: ${tfTrueCount}, False: ${tfFalseCount}, Missing: ${tfMissing}`);

  // Also check Matching questions
  const matchQuestions = questions.filter(q => q.type === 'MATCHING');
  console.log(`\nTotal Matching questions: ${matchQuestions.length}`);
}

inspect();
