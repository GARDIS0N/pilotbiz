import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

function inspectAll() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const questions: any[] = db.questions || [];

  for (const type of ['TRUE_FALSE', 'MATCHING', 'ORDERING', 'FILL_BLANK']) {
    const list = questions.filter(q => q.type === type);
    console.log(`\n=== TYPE: ${type} (Total: ${list.length}) ===`);
    if (list.length > 0) {
      const q = list[0];
      console.log('Sample question keys:', Object.keys(q));
      console.log('Sample data:', {
        id: q.id,
        prompt: q.prompt?.slice(0, 50),
        options: q.options?.slice(0, 2),
        matchingPairs: q.matchingPairs?.slice(0, 2),
        correctBoolean: q.correctBoolean,
        correctAnswer: q.correctAnswer,
        correctOrderIds: q.correctOrderIds,
        fillBlankAnswers: q.fillBlankAnswers
      });
    }
  }
}

inspectAll();
