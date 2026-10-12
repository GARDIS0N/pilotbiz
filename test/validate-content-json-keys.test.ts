import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeContentQuestion, hasUsableAnswerKey } from '../src/data/curriculum/contentAdapter.js';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'data', 'curriculum', 'content');

console.log('===========================================================');
console.log('🧪 CBC CURRICULUM CONTENT JSON KEY & ARITHMETIC VALIDATOR');
console.log('===========================================================\n');

if (!fs.existsSync(contentDir)) {
  console.error(`❌ Content directory not found: ${contentDir}`);
  process.exit(1);
}

const jsonFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
console.log(`Discovered ${jsonFiles.length} content file(s) in src/data/curriculum/content:`, jsonFiles);

let totalQuestions = 0;
let passedQuestions = 0;
let arithmeticChecked = 0;
const failures: { file: string; id: string; type: string; prompt: string; reason: string }[] = [];

/**
 * Extracts and strictly evaluates simple arithmetic statements from a prompt.
 * Returns { expectedBool, expression } or null if no simple arithmetic statement is found.
 */
function evaluateArithmeticPrompt(promptText: string): { expectedBool: boolean; expression: string } | null {
  const clean = promptText.replace(/True or False:\s*/i, '').replace(/Kweli au Si Kweli:\s*/i, '').trim();

  // Pattern 1: Multi-term repeated addition equals multiplication: "2 + 2 + 2 + 2 gives the same total as 4 × 2"
  const repeatedAddMatch = clean.match(/^(\d+(?:\s*\+\s*\d+)+)\s*(?:gives the same total as|is equal to|=|equals)\s*(\d+)\s*[×*x]\s*(\d+)/i);
  if (repeatedAddMatch) {
    const sumTerms = repeatedAddMatch[1].split('+').map(t => parseInt(t.trim(), 10));
    const sum = sumTerms.reduce((acc, v) => acc + v, 0);
    const multA = parseInt(repeatedAddMatch[2], 10);
    const multB = parseInt(repeatedAddMatch[3], 10);
    const prod = multA * multB;
    return {
      expectedBool: sum === prod,
      expression: `${repeatedAddMatch[1]} (${sum}) vs ${multA} × ${multB} (${prod})`
    };
  }

  // Pattern 2: Binary operations: "400 + 350 = 750", "5 × 4 is equal to 20", "876 - 342 = 534"
  const binMatch = clean.match(/(\d+)\s*([+\-×*x\/÷])\s*(\d+)\s*(?:=|is equal to|equals)\s*(\d+)/i);
  if (binMatch) {
    const a = parseInt(binMatch[1], 10);
    const op = binMatch[2];
    const b = parseInt(binMatch[3], 10);
    const target = parseInt(binMatch[4], 10);

    let calculated = 0;
    if (op === '+') calculated = a + b;
    else if (op === '-') calculated = a - b;
    else if (op === '×' || op === '*' || op === 'x') calculated = a * b;
    else if (op === '/' || op === '÷') calculated = Math.floor(a / b);

    return {
      expectedBool: calculated === target,
      expression: `${a} ${op} ${b} = ${target} (calculated: ${calculated})`
    };
  }

  return null;
}

for (const file of jsonFiles) {
  const filePath = path.join(contentDir, file);
  const rawContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Extract all questions across schema varieties
  const rawQuestions: any[] = [];
  if (Array.isArray(rawContent.lessons)) {
    for (const lesson of rawContent.lessons) {
      if (Array.isArray(lesson.questions)) {
        rawQuestions.push(...lesson.questions);
      }
    }
  }
  if (rawContent.strand_test && Array.isArray(rawContent.strand_test.questions)) {
    rawQuestions.push(...rawContent.strand_test.questions);
  }
  if (Array.isArray(rawContent.questions)) {
    rawQuestions.push(...rawContent.questions);
  }

  console.log(`\nValidating ${file} (${rawQuestions.length} questions)...`);

  for (const rawQ of rawQuestions) {
    totalQuestions++;
    const qId = rawQ.id || 'unidentified-id';
    const rawType = rawQ.type || 'untyped';
    const promptDisplay = typeof rawQ.prompt === 'object' ? (rawQ.prompt?.en || rawQ.prompt?.sw || '') : String(rawQ.prompt || rawQ.text || '');

    // 1. Adapter normalization
    let q;
    try {
      q = normalizeContentQuestion(rawQ);
    } catch (err: any) {
      failures.push({
        file,
        id: qId,
        type: rawType,
        prompt: promptDisplay,
        reason: `normalizeContentQuestion threw error: ${err?.message}`
      });
      continue;
    }

    // 2. Strict usable answer key check
    if (!hasUsableAnswerKey(q)) {
      failures.push({
        file,
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        reason: `hasUsableAnswerKey returned false (missing, empty, or unresolvable answer key)`
      });
      continue;
    }

    // 3. Resolve correct answer label
    const label = resolveCorrectAnswerText(q);
    if (!label || label.trim().length === 0) {
      failures.push({
        file,
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        reason: `resolveCorrectAnswerText returned empty string`
      });
      continue;
    }

    // 4. Grading evaluation verification
    if (q.type === 'TRUE_FALSE') {
      const isCorrectExpected = evaluateAnswer(q, q.correctBoolean);
      const isOppositeWrong = evaluateAnswer(q, !q.correctBoolean);
      if (!isCorrectExpected) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned false for actual correctBoolean (${q.correctBoolean})`
        });
        continue;
      }
      if (isOppositeWrong) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned true for incorrect boolean (${!q.correctBoolean})`
        });
        continue;
      }

      // 5. Sanity-check arithmetic in True/False items
      const arith = evaluateArithmeticPrompt(q.prompt);
      if (arith) {
        arithmeticChecked++;
        if (arith.expectedBool !== q.correctBoolean) {
          failures.push({
            file,
            id: q.id,
            type: q.type,
            prompt: q.prompt,
            reason: `Arithmetic mismatch: ${arith.expression}. Claimed answer key: ${q.correctBoolean}, Math truth: ${arith.expectedBool}`
          });
          continue;
        }
      }
    } else if (q.type === 'MULTIPLE_CHOICE' || q.type === 'LISTEN_CHOOSE') {
      const evalCorrect = evaluateAnswer(q, q.correctOptionId);
      const evalWrong = evaluateAnswer(q, 'definitely-non-existent-opt-xyz');
      if (!evalCorrect) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned false for correctOptionId: "${q.correctOptionId}"`
        });
        continue;
      }
      if (evalWrong) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned true for fake option id`
        });
        continue;
      }
    } else if (q.type === 'NUMBER_ENTRY' || q.type === 'KENYAN_MONEY') {
      if (!q.numericAnswer) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `Missing numericAnswer for numeric question`
        });
        continue;
      }
      const evalCorrect = evaluateAnswer(q, q.numericAnswer.value);
      const evalWrong = evaluateAnswer(q, q.numericAnswer.value + 98765);
      if (!evalCorrect) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned false for numericAnswer.value: ${q.numericAnswer.value}`
        });
        continue;
      }
      if (evalWrong) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned true for wrong number`
        });
        continue;
      }
    } else if (q.type === 'FILL_BLANK') {
      if (!q.fillBlankAnswers || q.fillBlankAnswers.length === 0) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `Missing fillBlankAnswers for fill_blank question`
        });
        continue;
      }
      const evalCorrect = evaluateAnswer(q, q.fillBlankAnswers[0]);
      if (!evalCorrect) {
        failures.push({
          file,
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          reason: `evaluateAnswer returned false for valid accepted fillBlank answer: "${q.fillBlankAnswers[0]}"`
        });
        continue;
      }
    }

    passedQuestions++;
  }
}

console.log('\n===========================================================');
console.log('📊 CONTENT JSON VALIDATION SUMMARY');
console.log('===========================================================');
console.log(`Total questions audited:    ${totalQuestions}`);
console.log(`Passed strict validation:   ${passedQuestions}`);
console.log(`Arithmetic checks verified: ${arithmeticChecked}`);
console.log(`Failures detected:          ${failures.length}`);

if (failures.length > 0) {
  console.error('\n❌ VALIDATION FAILED! The following content questions have invalid or missing keys:\n');
  failures.forEach((f, idx) => {
    console.error(`[${idx + 1}] File: ${f.file} | ID: ${f.id} | Type: ${f.type}`);
    console.error(`    Prompt: "${f.prompt}"`);
    console.error(`    Failure Reason: ${f.reason}\n`);
  });
  process.exit(1);
} else {
  console.log('\n✅ ALL CONTENT JSON QUESTIONS HAVE VALID, AUDITED ANSWER KEYS!\n');
}
