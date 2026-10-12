import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

function isExcludedFromOptionRotation(q: any): boolean {
  if (q.type === 'TRUE_FALSE') return true;
  if (!Array.isArray(q.options) || q.options.length <= 1) return true;
  const texts = q.options.map((o: any) => String(o.text || '').toLowerCase());
  for (const t of texts) {
    if (
      t.includes('all of the above') ||
      t.includes('none of the above') ||
      t.includes('zote hapo juu') ||
      t.includes('hakuna hata moja') ||
      t.includes('both a and b') ||
      t.includes('neither a nor b')
    ) {
      return true;
    }
  }

  // Check if ordered numbers
  const nums = texts.map((t: string) => {
    const m = t.match(/^-?\d+(\.\d+)?$/);
    return m ? parseFloat(m[0]) : null;
  });
  if (nums.every((n: number | null) => n !== null)) {
    let sorted = true;
    for (let i = 1; i < nums.length; i++) {
      if ((nums[i] as number) <= (nums[i - 1] as number)) {
        sorted = false;
        break;
      }
    }
    if (sorted) return true;
  }
  return false;
}

export function migratePhase1LogicBugs() {
  console.log('===========================================================');
  console.log('🔧 EXECUTING PHASE 1 LOGIC BUGS MIGRATION');
  console.log('===========================================================\n');

  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];
  const missions: any[] = db.missions || [];

  // -------------------------------------------------------------
  // 1. Fix the 32 piped matching questions (e.g. q-g4-cre-u1-006)
  // -------------------------------------------------------------
  let fixedMatchCount = 0;
  for (const q of questions) {
    if (q.type === 'MATCHING') {
      const hasPipedRight = q.matchingPairs && q.matchingPairs.some((p: any) => p.rightText && p.rightText.includes('|'));
      if (hasPipedRight) {
        const correctOpt = (q.options || []).find((o: any) => o.id === q.correctOptionId) || q.options?.[0];
        const sourceText = q.correctAnswer || (correctOpt ? correctOpt.text : '');
        const segments = sourceText.split('|').map((s: string) => s.trim()).filter(Boolean);
        const parsedPairs: any[] = [];

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          const colonIdx = seg.indexOf(':');
          if (colonIdx > 0) {
            const left = seg.slice(0, colonIdx).trim();
            const right = seg.slice(colonIdx + 1).trim();
            if (left && right) {
              parsedPairs.push({
                leftId: `pair-${i + 1}-l`,
                leftText: left,
                rightId: `pair-${i + 1}-r`,
                rightText: right
              });
            }
          }
        }

        if (parsedPairs.length >= 2) {
          q.matchingPairs = parsedPairs;
          fixedMatchCount++;
        }
      }
    }
  }
  console.log(`✓ Repaired ${fixedMatchCount} piped matching questions with structured individual pairs.`);

  // -------------------------------------------------------------
  // 2. Fix q-sci-germ-01 scenario vs prompt consistency
  // -------------------------------------------------------------
  const qGerm = questions.find((q: any) => q.id === 'q-sci-germ-01');
  if (qGerm) {
    qGerm.prompt = 'Which of the following conditions is NOT essential for a bean seed to germinate in the petri dishes?';
    console.log('✓ Harmonized q-sci-germ-01 scenario and prompt (petri dish inquiry context).');
  }

  // -------------------------------------------------------------
  // 3. Balance static option positions across all lessons (< 40% Position A)
  // -------------------------------------------------------------
  const qById = new Map<string, any>(questions.map(q => [q.id, q]));
  const lessonMap = new Map<string, string[]>();

  for (const m of missions) {
    if (m.questionIds) {
      for (const qId of m.questionIds) {
        if (!lessonMap.has(m.id)) lessonMap.set(m.id, []);
        lessonMap.get(m.id)!.push(qId);
      }
    }
  }

  for (const q of questions) {
    if (q.lessonId) {
      if (!lessonMap.has(q.lessonId)) lessonMap.set(q.lessonId, []);
      if (!lessonMap.get(q.lessonId)!.includes(q.id)) {
        lessonMap.get(q.lessonId)!.push(q.id);
      }
    }
  }

  const assigned = new Set<string>();
  let balancedQuestionCount = 0;

  for (const [lId, qIds] of lessonMap.entries()) {
    const choiceQs = qIds
      .map(id => qById.get(id))
      .filter(q => q && ['MULTIPLE_CHOICE', 'SCENARIO'].includes(q.type) && !isExcludedFromOptionRotation(q));

    choiceQs.forEach((q, idx) => {
      if (!assigned.has(q.id)) {
        assigned.add(q.id);
        const targetPos = (idx + 1) % q.options.length; // distribute across positions 1, 2, 3, 0
        const curPos = q.options.findIndex((o: any) => o.id === q.correctOptionId);
        if (curPos !== -1 && curPos !== targetPos) {
          const diff = (curPos - targetPos + q.options.length) % q.options.length;
          q.options = [...q.options.slice(diff), ...q.options.slice(0, diff)];
          balancedQuestionCount++;
        }
      }
    });
  }

  // Second pass: Strictly guarantee <= 40% Position A in every single lesson
  for (const [lId, qIds] of lessonMap.entries()) {
    const choiceQs = qIds
      .map(id => qById.get(id))
      .filter(q => q && ['MULTIPLE_CHOICE', 'SCENARIO'].includes(q.type) && !isExcludedFromOptionRotation(q));

    if (choiceQs.length >= 3) {
      let posAQuestions = choiceQs.filter(q => q.options && q.options.length > 0 && q.options[0].id === q.correctOptionId);
      while (posAQuestions.length / choiceQs.length > 0.40) {
        const qToShift = posAQuestions.pop();
        if (!qToShift) break;
        // Shift options by 1
        qToShift.options = [...qToShift.options.slice(1), qToShift.options[0]];
        balancedQuestionCount++;
      }
    }
  }

  // Balance any remaining choice questions not bound to a tracked lesson
  let remIdx = 0;
  for (const q of questions) {
    if (['MULTIPLE_CHOICE', 'SCENARIO'].includes(q.type) && !isExcludedFromOptionRotation(q) && !assigned.has(q.id)) {
      const targetPos = (remIdx + 1) % q.options.length;
      remIdx++;
      const curPos = q.options.findIndex((o: any) => o.id === q.correctOptionId);
      if (curPos !== -1 && curPos !== targetPos) {
        const diff = (curPos - targetPos + q.options.length) % q.options.length;
        q.options = [...q.options.slice(diff), ...q.options.slice(0, diff)];
        balancedQuestionCount++;
      }
    }
  }
  console.log(`✓ Balanced option positions across ${balancedQuestionCount} choice questions.`);

  // -------------------------------------------------------------
  // 4. Save updated database
  // -------------------------------------------------------------
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`✓ Saved updated database to ${DB_PATH}.`);
  console.log('===========================================================\n');
}

migratePhase1LogicBugs();
