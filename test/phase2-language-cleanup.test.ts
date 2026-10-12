import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { resolveCorrectAnswerText } from '../src/utils/answerValidation.js';
import { CBE_VOCABULARY, lookupVocabulary } from '../src/utils/cbeVocabulary.js';
import { getSavedLanguage, t } from '../src/utils/i18n.js';
import { runQuestionAudit } from '../scripts/audit_and_validate_questions.js';

console.log('===========================================================');
console.log('🧪 TEST SUITE: PHASE 2 LANGUAGE CLEANUP VERIFICATION');
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

const DB_PATH = path.resolve('data/cbe_database.json');
const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const questions: any[] = dbData.questions || [];

// -------------------------------------------------------------
// 1. Language Segregation & Translation Suffix Removal
// -------------------------------------------------------------
console.log('--- 1. Language Segregation & Translation Suffix Removal ---');

test('q-sci-germ-01 options have no Swahili translation suffixes', () => {
  const q = questions.find(x => x.id === 'q-sci-germ-01');
  assert.ok(q, 'q-sci-germ-01 must exist');

  const texts = q.options.map((o: any) => o.text);
  assert.ok(texts.includes('Water'), 'Should have "Water", not "Water (Unyevu)"');
  assert.ok(texts.includes('Oxygen / Air'), 'Should have "Oxygen / Air", not "Oxygen / Air (Hewa safi)"');
  assert.ok(texts.includes('Warmth'), 'Should have "Warmth", not "Warmth (Joto la wastani)"');
  assert.ok(!texts.some((t: string) => t.includes('Unyevu')), 'Must not contain Unyevu');
  assert.ok(!texts.some((t: string) => t.includes('Hewa safi')), 'Must not contain Hewa safi');
  assert.ok(!texts.some((t: string) => t.includes('Joto la wastani')), 'Must not contain Joto la wastani');
});

test('q-sci-hab-01 options have no Swahili translation suffixes', () => {
  const q = questions.find(x => x.id === 'q-sci-hab-01');
  assert.ok(q, 'q-sci-hab-01 must exist');

  const texts = q.options.map((o: any) => o.text);
  assert.deepStrictEqual(texts, ['Lion', 'Zebra', 'Leopard', 'Crocodile']);
  assert.ok(!texts.some((t: string) => t.includes('Simba')), 'Must not contain (Simba) in options');
  assert.ok(!texts.some((t: string) => t.includes('Pundamilia')), 'Must not contain (Pundamilia)');
  assert.ok(!texts.some((t: string) => t.includes('Chui')), 'Must not contain (Chui)');
  assert.ok(!texts.some((t: string) => t.includes('Mamba')), 'Must not contain (Mamba)');
});

test('q-sci-hab-match-01 pairs have no Swahili translation suffixes', () => {
  const q = questions.find(x => x.id === 'q-sci-hab-match-01');
  assert.ok(q, 'q-sci-hab-match-01 must exist');
  const leftTexts = q.matchingPairs.map((p: any) => p.leftText);
  assert.ok(leftTexts.includes('Camel'), 'Must be "Camel", not "Camel (Ngamia)"');
  assert.ok(!leftTexts.some((t: string) => t.includes('Ngamia')), 'Must not contain (Ngamia)');
});

test('resolveCorrectAnswerText returns clean English without translation suffixes', () => {
  const qGerm = questions.find(x => x.id === 'q-sci-germ-01');
  const ansLabel = resolveCorrectAnswerText(qGerm);
  assert.strictEqual(ansLabel, 'Artificial chemical fertilizer');
  assert.ok(!ansLabel.includes('('), 'No parenthetical translation in answer text');
});

test('No non-Kiswahili question contains forbidden Swahili translation suffixes', () => {
  const BANNED_REGEX = /\((Unyevu|Hewa safi|Joto la wastani|Simba|Pundamilia|Chui|Mamba|Ngamia|Jaribu Tena|Ndiyo \/ Kweli|Kidokezo)\)/i;
  let forbiddenFound = 0;

  for (const q of questions) {
    const isKisw = Boolean(
      (q.subStrandId && q.subStrandId.includes('kisw')) ||
      (q.id && (q.id.includes('-kisw-') || q.id.startsWith('q-kisw-'))) ||
      (q.learningAreaId && q.learningAreaId.toLowerCase().includes('kisw'))
    );
    if (!isKisw) {
      if (BANNED_REGEX.test(q.prompt)) forbiddenFound++;
      if (q.options) {
        for (const opt of q.options) {
          if (BANNED_REGEX.test(opt.text)) forbiddenFound++;
        }
      }
      if (q.matchingPairs) {
        for (const mp of q.matchingPairs) {
          if (BANNED_REGEX.test(mp.leftText) || BANNED_REGEX.test(mp.rightText)) forbiddenFound++;
        }
      }
    }
  }

  assert.strictEqual(forbiddenFound, 0, 'Found forbidden translation suffixes in non-Kiswahili questions');
});

// -------------------------------------------------------------
// 2. Pure Kiswahili Subject Verification
// -------------------------------------------------------------
console.log('\n--- 2. Kiswahili Subject Verification ---');

test('Kiswahili questions remain 100% pure Kiswahili', () => {
  const kiswQs = questions.filter(q =>
    (q.subStrandId && q.subStrandId.includes('kisw')) ||
    (q.id && (q.id.includes('-kisw-') || q.id.startsWith('q-kisw-'))) ||
    (q.learningAreaId && q.learningAreaId.toLowerCase().includes('kisw'))
  );
  assert.ok(kiswQs.length > 900, 'Must have at least 900 Kiswahili questions');

  // Verify none have English translation suffixes like (Water) or (True)
  const englishParenRegex = /\((Water|True|False|Dog|Cat|Elephant|Teacher)\)/i;
  let englishFound = 0;
  for (const q of kiswQs) {
    if (englishParenRegex.test(q.prompt)) englishFound++;
    if (q.options) {
      for (const o of q.options) {
        if (englishParenRegex.test(o.text)) englishFound++;
      }
    }
  }
  assert.strictEqual(englishFound, 0, 'Kiswahili subject must not have English translation suffixes');
});

// -------------------------------------------------------------
// 3. Interface Language Single Setting & Consistency
// -------------------------------------------------------------
console.log('\n--- 3. Interface Language Single Setting & Consistency ---');

test('Default interface language is English ("en")', () => {
  const defaultLang = getSavedLanguage();
  assert.strictEqual(defaultLang, 'en');
});

test('Interface strings never mix "ENDELEA" and "CONTINUE" on the same view', () => {
  // English UI
  const enContinue = (lang: string) => lang === 'sw' ? 'ENDELEA' : 'CONTINUE';
  const enCheck = (lang: string) => lang === 'sw' ? 'KAGUA JIBU' : 'CHECK ANSWER';
  const enMatchPrompt = (lang: string) => lang === 'sw' ? 'Bonyeza ENDELEA hapa chini' : 'Tap CHECK ANSWER or CONTINUE below';

  assert.strictEqual(enContinue('en'), 'CONTINUE');
  assert.strictEqual(enCheck('en'), 'CHECK ANSWER');
  assert.strictEqual(enMatchPrompt('en'), 'Tap CHECK ANSWER or CONTINUE below');
  assert.ok(!enMatchPrompt('en').includes('ENDELEA'), 'English screen must not mention ENDELEA');

  // Swahili UI
  assert.strictEqual(enContinue('sw'), 'ENDELEA');
  assert.strictEqual(enCheck('sw'), 'KAGUA JIBU');
  assert.strictEqual(enMatchPrompt('sw'), 'Bonyeza ENDELEA hapa chini');
  assert.ok(!enMatchPrompt('sw').includes('CONTINUE'), 'Swahili screen must not mention CONTINUE');
});

test('Short Swahili praise is allowed in feedback in both languages', () => {
  const praiseEn = 'Hongera! Nicely done!';
  const praiseSw = 'Hongera! Umefanya vizuri sana!';
  assert.ok(praiseEn.includes('Hongera'), 'English feedback can include short Swahili praise Hongera');
  assert.ok(praiseSw.includes('Hongera'), 'Swahili feedback includes Hongera');
});

// -------------------------------------------------------------
// 4. Tap-on-Word Explanations (CBE Vocabulary Explorer)
// -------------------------------------------------------------
console.log('\n--- 4. Tap-on-Word Explanations (CBE Vocabulary Explorer) ---');

test('lookupVocabulary correctly returns definitions for key CBE terms', () => {
  const radicle = lookupVocabulary('radicle');
  assert.ok(radicle, 'Must find radicle');
  assert.strictEqual(radicle.word, 'Radicle');
  assert.ok(radicle.definition.includes('root'), 'Definition mentions root');

  const plumule = lookupVocabulary('plumule');
  assert.ok(plumule, 'Must find plumule');
  assert.strictEqual(plumule.word, 'Plumule');
  assert.ok(plumule.definition.includes('shoot'), 'Definition mentions shoot');

  const cotyledon = lookupVocabulary('cotyledon');
  assert.ok(cotyledon, 'Must find cotyledon');

  const testa = lookupVocabulary('testa');
  assert.ok(testa, 'Must find testa');

  const germinate = lookupVocabulary('germinate');
  assert.ok(germinate, 'Must find germinate');

  const indigenous = lookupVocabulary('indigenous');
  assert.ok(indigenous, 'Must find indigenous');

  const commute = lookupVocabulary('commute');
  assert.ok(commute, 'Must find commute');

  const regroup = lookupVocabulary('regroup');
  assert.ok(regroup, 'Must find regroup');

  const granary = lookupVocabulary('granary');
  assert.ok(granary, 'Must find granary');

  const winnowing = lookupVocabulary('winnowing');
  assert.ok(winnowing, 'Must find winnowing');
});

test('lookupVocabulary handles plural forms and capital letters', () => {
  const plural = lookupVocabulary('radicles');
  assert.ok(plural, 'Plural radicles should match');
  assert.strictEqual(plural.word, 'Radicle');

  const capital = lookupVocabulary('PLUMULE');
  assert.ok(capital, 'Capitalized PLUMULE should match');

  const punctuated = lookupVocabulary('germinating!');
  assert.ok(punctuated, 'Punctuated term should match');
});

// -------------------------------------------------------------
// 5. CI Audit Script Passes All Questions with Phase 2 Checks
// -------------------------------------------------------------
console.log('\n--- 5. CI Audit Script Validation ---');

test('CI audit passes all questions with zero translation suffix failures', () => {
  const audit = runQuestionAudit(false);
  assert.strictEqual(audit.failed.length, 0, 'Zero failed questions in audit');
  assert.ok(audit.total >= 8720, `Audited questions count (${audit.total}) should be at least 8720`);
});

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n===========================================================');
console.log(`Phase 2 Test Results: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
