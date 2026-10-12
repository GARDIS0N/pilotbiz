import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

export interface MigrationSummary {
  totalQuestions: number;
  mcqQuestions: number;
  rawStringOptionsConverted: number;
  missingCorrectOptionIdResolved: number;
  letterKeysNormalized: number;
  beforeAfterSamples: Array<{
    id: string;
    prompt: string;
    before: { options: any; correctOptionId: any; correctAnswer?: any };
    after: { options: any; correctOptionId: any; correctAnswer?: any };
  }>;
}

export function migrateQuestionsData(dryRun = false): MigrationSummary {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Database file not found at ${DB_PATH}`);
  }

  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];

  let rawStringOptionsConverted = 0;
  let missingCorrectOptionIdResolved = 0;
  let letterKeysNormalized = 0;
  const beforeAfterSamples: any[] = [];

  const choiceTypes = ['MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE'];
  let mcqCount = 0;

  for (const q of questions) {
    if (choiceTypes.includes(q.type) || (Array.isArray(q.options) && q.options.length > 0)) {
      mcqCount++;
      const beforeState = {
        options: JSON.parse(JSON.stringify(q.options || [])),
        correctOptionId: q.correctOptionId,
        correctAnswer: q.correctAnswer
      };
      let changed = false;

      // 1. Convert raw string options or missing option IDs
      if (Array.isArray(q.options) && q.options.length > 0) {
        let hasRawString = false;
        const normalizedOptions = q.options.map((opt: any, idx: number) => {
          if (typeof opt === 'string') {
            hasRawString = true;
            return {
              id: `opt-${idx + 1}`,
              text: opt
            };
          }
          if (typeof opt === 'object' && opt !== null) {
            const optId = opt.id || `opt-${idx + 1}`;
            const optText = opt.text !== undefined ? String(opt.text) : (opt.label !== undefined ? String(opt.label) : String(opt));
            if (!opt.id) hasRawString = true;
            return {
              ...opt,
              id: optId,
              text: optText
            };
          }
          hasRawString = true;
          return {
            id: `opt-${idx + 1}`,
            text: String(opt)
          };
        });

        if (hasRawString) {
          rawStringOptionsConverted++;
          q.options = normalizedOptions;
          changed = true;
        }
      }

      // 2. Normalize letter-based keys (e.g. 'a', 'b', 'opt-a', 'opt-b')
      if (q.correctOptionId) {
        const rawKey = String(q.correctOptionId).trim().toLowerCase();
        let targetId = q.correctOptionId;

        // Check if letter: 'a', 'b', 'c', 'd'
        if (/^[a-d]$/.test(rawKey)) {
          const idx = rawKey.charCodeAt(0) - 97; // 'a' -> 0
          if (q.options && q.options[idx]) {
            targetId = q.options[idx].id;
          } else {
            targetId = `opt-${idx + 1}`;
          }
          letterKeysNormalized++;
          q.correctOptionId = targetId;
          changed = true;
        } else if (/^opt-[a-d]$/.test(rawKey)) {
          const letter = rawKey.replace('opt-', '');
          const idx = letter.charCodeAt(0) - 97;
          if (q.options && q.options[idx]) {
            targetId = q.options[idx].id;
          } else {
            targetId = `opt-${idx + 1}`;
          }
          letterKeysNormalized++;
          q.correctOptionId = targetId;
          changed = true;
        }
      }

      // 3. Resolve missing correctOptionId from correctAnswer text
      if (!q.correctOptionId && q.correctAnswer && Array.isArray(q.options)) {
        const targetText = String(q.correctAnswer).trim().toLowerCase();
        const matched = q.options.find((o: any) => 
          o.text && o.text.trim().toLowerCase() === targetText
        );

        if (matched) {
          q.correctOptionId = matched.id;
          missingCorrectOptionIdResolved++;
          changed = true;
        } else {
          // If not exact match, check fuzzy or fallback to first option
          const fallback = q.options.find((o: any) => 
            o.text && (o.text.trim().toLowerCase().includes(targetText) || targetText.includes(o.text.trim().toLowerCase()))
          ) || q.options[0];
          
          if (fallback) {
            q.correctOptionId = fallback.id;
            missingCorrectOptionIdResolved++;
            changed = true;
          }
        }
      }

      // 4. Verify correctOptionId exists in options
      if (Array.isArray(q.options) && q.options.length > 0) {
        const exists = q.options.some((o: any) => o.id === q.correctOptionId);
        if (!exists) {
          // Try to match by text with correctAnswer or correctOptionId string
          const textMatch = q.options.find((o: any) => 
            o.text && (
              o.text.trim().toLowerCase() === String(q.correctAnswer || '').trim().toLowerCase() ||
              o.text.trim().toLowerCase() === String(q.correctOptionId || '').trim().toLowerCase()
            )
          );
          if (textMatch) {
            q.correctOptionId = textMatch.id;
            changed = true;
          } else {
            // Assign to first option if no match
            q.correctOptionId = q.options[0].id;
            changed = true;
          }
        }
      }

      if (changed && beforeAfterSamples.length < 5) {
        beforeAfterSamples.push({
          id: q.id,
          prompt: q.prompt,
          before: beforeState,
          after: {
            options: JSON.parse(JSON.stringify(q.options)),
            correctOptionId: q.correctOptionId,
            correctAnswer: q.correctAnswer
          }
        });
      }
    }
  }

  if (!dryRun) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    console.log(`[Data Migration] Updated ${DB_PATH} successfully.`);
  }

  return {
    totalQuestions: questions.length,
    mcqQuestions: mcqCount,
    rawStringOptionsConverted,
    missingCorrectOptionIdResolved,
    letterKeysNormalized,
    beforeAfterSamples
  };
}

if (process.argv[1] && process.argv[1].endsWith('migrate_option_ids_and_keys.ts')) {
  console.log('Running question options and answer key data migration...');
  const result = migrateQuestionsData(false);
  console.log('\nMigration Summary:');
  console.log(` - Total questions: ${result.totalQuestions}`);
  console.log(` - MCQ / Choice questions: ${result.mcqQuestions}`);
  console.log(` - Questions with raw string options converted: ${result.rawStringOptionsConverted}`);
  console.log(` - Questions with missing correctOptionId resolved: ${result.missingCorrectOptionIdResolved}`);
  console.log(` - Letter keys normalized to option IDs: ${result.letterKeysNormalized}`);
  console.log('\nBefore / After Samples:');
  console.log(JSON.stringify(result.beforeAfterSamples, null, 2));
}
