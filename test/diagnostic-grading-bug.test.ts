import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { getPlacementQuestionsForGrade } from '../src/services/placementQuestions.js';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';

console.log('===========================================================');
console.log('🧪 REPRODUCING DIAGNOSTIC CHECK GRADING BUG');
console.log('===========================================================');

// 1. Test getPlacementQuestionsForGrade('grade-3')
const g3Questions = getPlacementQuestionsForGrade('grade-3');
console.log(`Loaded ${g3Questions.length} placement questions for Grade 3.`);

const targetQ = g3Questions.find(q => q.id === 'g3-math-num-01-q03' || q.prompt.includes('400 + 350'));
assert(targetQ, 'Diagnostic questions must contain question "True or False: 400 + 350 = 750"');

console.log('Found question in placement questions:');
console.log('ID:', targetQ.id);
console.log('Prompt:', targetQ.prompt);
console.log('correctBoolean property:', targetQ.correctBoolean);
console.log('Type:', targetQ.type);

// 2. Test grading
const isTrueCorrect = evaluateAnswer(targetQ, 'True');
const isFalseCorrect = evaluateAnswer(targetQ, 'False');
const answerLabel = resolveCorrectAnswerText(targetQ);

console.log('\n--- Grading Results on Current Code ---');
console.log('Is "True" evaluated as correct?', isTrueCorrect);
console.log('Is "False" evaluated as correct?', isFalseCorrect);
console.log('Resolved correct answer label:', answerLabel);

// Assert correct behavior
assert.strictEqual(isTrueCorrect, true, 'User picking "True" MUST be evaluated as CORRECT');
assert.strictEqual(isFalseCorrect, false, 'User picking "False" MUST be evaluated as WRONG');
assert.strictEqual(answerLabel, 'True', 'Correct answer label MUST be "True"');

console.log('\n✅ REPRODUCTION TEST PASSED (Fix verified)!');
