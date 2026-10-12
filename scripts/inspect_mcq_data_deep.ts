import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

function inspect() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const questions: any[] = db.questions || [];

  const textOnlyQuestions: any[] = [];
  const invalidKeyQuestions: any[] = [];
  const duplicateOptionIds: any[] = [];
  const missingOptionIds: any[] = [];

  for (const q of questions) {
    if (['MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE'].includes(q.type)) {
      const options = q.options || [];

      // Check option IDs
      const ids = new Set<string>();
      let hasMissingOptId = false;
      for (const opt of options) {
        if (!opt || typeof opt !== 'object' || !opt.id) {
          hasMissingOptId = true;
        } else {
          if (ids.has(opt.id)) {
            duplicateOptionIds.push({ qId: q.id, optId: opt.id });
          }
          ids.add(opt.id);
        }
      }
      if (hasMissingOptId) missingOptionIds.push(q.id);

      // Check key
      if (!q.correctOptionId && q.correctAnswer) {
        textOnlyQuestions.push({
          id: q.id,
          prompt: q.prompt?.slice(0, 50),
          correctAnswer: q.correctAnswer,
          options: options.map((o: any) => o?.text || o)
        });
      } else if (q.correctOptionId) {
        const matchesOption = options.some((o: any) => o?.id === q.correctOptionId);
        if (!matchesOption) {
          invalidKeyQuestions.push({
            id: q.id,
            correctOptionId: q.correctOptionId,
            options: options.map((o: any) => o?.id)
          });
        }
      }
    }
  }

  console.log(`Text-only correctAnswer questions: ${textOnlyQuestions.length}`);
  console.log(`Questions with correctOptionId not matching any option.id: ${invalidKeyQuestions.length}`);
  console.log(`Questions with missing option IDs: ${missingOptionIds.length}`);
  console.log(`Questions with duplicate option IDs: ${duplicateOptionIds.length}`);

  if (textOnlyQuestions.length > 0) {
    console.log('\nSample text-only questions (first 3):', JSON.stringify(textOnlyQuestions.slice(0, 3), null, 2));
  }
  if (invalidKeyQuestions.length > 0) {
    console.log('\nSample invalid key questions (first 3):', JSON.stringify(invalidKeyQuestions.slice(0, 3), null, 2));
  }
}

inspect();
