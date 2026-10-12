import fs from 'fs';
import path from 'path';

interface Option {
  id: string;
  text: string;
}

interface MatchingPair {
  leftId: string;
  leftText: string;
  rightId: string;
  rightText: string;
}

interface Question {
  id: string;
  subStrandId?: string;
  learningAreaId?: string;
  type: string;
  prompt: string;
  storyScenario?: string;
  difficulty: string;
  options?: Option[];
  correctOptionId?: string;
  explanation?: string;
  socraticHint?: string;
  matchingPairs?: MatchingPair[];
  orderedItems?: any[];
  [key: string]: any;
}

const DB_PATH = path.resolve('data/cbe_database.json');
const MIGRATION_PATH = path.resolve('supabase/migrations/20261011_10_language_cleanup.sql');
const COMBINED_MIGRATION_PATH = path.resolve('supabase/migrations/combined_all_migrations.sql');

function isKiswahiliQuestion(q: Question): boolean {
  return Boolean(
    (q.subStrandId && q.subStrandId.includes('kisw')) ||
    (q.id && (q.id.includes('-kisw-') || q.id.startsWith('q-kisw-'))) ||
    (q.learningAreaId && q.learningAreaId.toLowerCase().includes('kisw'))
  );
}

// Translations / bilingual suffixes to strip from non-Kiswahili lesson content
const SW_TRANSLATION_PARENS = [
  // Science germination & nature
  /\s*\(Joto la wastani\)/gi,
  /\s*\(Unyevu\)/gi,
  /\s*\(Hewa safi\)/gi,
  /\s*\(young root\)/gi,
  /\s*\(young shoot\)/gi,
  /\s*\(root\)/gi,
  /\s*\(shoot\)/gi,
  /\s*\(Testa\)/gi,
  // Wildlife
  /\s*\(Simba\)/gi,
  /\s*\(Pundamilia\)/gi,
  /\s*\(Chui\)/gi,
  /\s*\(Mamba\)/gi,
  /\s*\(Ngamia\)/gi,
  /\s*\(Kuku\)/gi,
  /\s*\(Dagaa\)/gi,
  // Culture & Crafts & Agriculture
  /\s*\(fundi wa mbao\)/gi,
  /\s*\(nyungu\)/gi,
  /\s*\(pot\/nyungu\)/gi,
  /\s*\(lungo\)/gi,
  /\s*\(bwana mifugo\)/gi,
  /\s*\(choffa\/ikumbi\)/gi,
  /\s*\(chombo cha nafaka\s*\/\s*ikumbi\)/gi,
  /\s*\(nyungu\s*\/\s*chombo cha udongo\)/gi,
  /\s*\(ugali choma\s*\/\s*ugali kaanga\)/gi,
  /\s*\(ugali kaanga\)/gi,
  /\s*\(Majimbo\)/gi,
  // Generic test/hint remnants
  /\s*\(Jaribu Tena\)/gi,
  /\s*\(Ndiyo\s*\/\s*Kweli\)/gi,
  /\s*Kidokezo\s*\(Hint\)/gi,
  /\s*\(Hint\)/gi
];

function cleanText(text: string | undefined): string | undefined {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text;

  // Specific phrases
  cleaned = cleaned.replace(/Chickens\s*\(kuku\)/gi, 'Chickens');
  cleaned = cleaned.replace(/clay hen\s*\(kuku\)/gi, 'clay hen');
  cleaned = cleaned.replace(/traditional cooking pots\s*\(nyungu\)/gi, 'traditional cooking pots');
  cleaned = cleaned.replace(/called a ______\s*\(pot\/nyungu\)/gi, 'called a ______');
  cleaned = cleaned.replace(/raised wooden granaries\s*\(choffa\/ikumbi\)/gi, 'raised wooden granaries');
  cleaned = cleaned.replace(/traditional earthen clay pots\s*\(nyungu\s*\/\s*chombo cha udongo\)/gi, 'traditional earthen clay pots');
  cleaned = cleaned.replace(/regional federalism\s*\(Majimbo\)/gi, 'regional federalism');
  cleaned = cleaned.replace(/\s*\("Asante kwa chakula"\)/gi, '');
  cleaned = cleaned.replace(/\"How Great Thou Art\"\s*\(Bwana U Sehemu Yangu\s*\/\s*Ewe Bwana Mungu\)/gi, '"How Great Thou Art"');

  for (const regex of SW_TRANSLATION_PARENS) {
    cleaned = cleaned.replace(regex, '');
  }

  // Normalize duplicate spaces and trim
  return cleaned.replace(/\s\s+/g, ' ').trim();
}

export function runMigration() {
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const questions: Question[] = dbData.questions;

  const changes: { qId: string; field: string; before: string; after: string }[] = [];

  questions.forEach(q => {
    if (isKiswahiliQuestion(q)) {
      // Kiswahili subject remains 100% Kiswahili
      return;
    }

    // Clean prompt
    const newPrompt = cleanText(q.prompt);
    if (newPrompt && newPrompt !== q.prompt) {
      changes.push({ qId: q.id, field: 'prompt', before: q.prompt, after: newPrompt });
      q.prompt = newPrompt;
    }

    // Clean storyScenario
    if (q.storyScenario) {
      const newStory = cleanText(q.storyScenario);
      if (newStory && newStory !== q.storyScenario) {
        changes.push({ qId: q.id, field: 'storyScenario', before: q.storyScenario, after: newStory });
        q.storyScenario = newStory;
      }
    }

    // Clean explanation
    if (q.explanation) {
      const newExpl = cleanText(q.explanation);
      if (newExpl && newExpl !== q.explanation) {
        changes.push({ qId: q.id, field: 'explanation', before: q.explanation, after: newExpl });
        q.explanation = newExpl;
      }
    }

    // Clean socraticHint
    if (q.socraticHint) {
      const newHint = cleanText(q.socraticHint);
      if (newHint && newHint !== q.socraticHint) {
        changes.push({ qId: q.id, field: 'socraticHint', before: q.socraticHint, after: newHint });
        q.socraticHint = newHint;
      }
    }

    // Clean options
    if (q.options && Array.isArray(q.options)) {
      q.options.forEach(opt => {
        const newText = cleanText(opt.text);
        if (newText && newText !== opt.text) {
          changes.push({ qId: q.id, field: `option.${opt.id}`, before: opt.text, after: newText });
          opt.text = newText;
        }
      });
    }

    // Clean matchingPairs
    if (q.matchingPairs && Array.isArray(q.matchingPairs)) {
      q.matchingPairs.forEach((mp, idx) => {
        const newLeft = cleanText(mp.leftText);
        const newRight = cleanText(mp.rightText);
        if (newLeft && newLeft !== mp.leftText) {
          changes.push({ qId: q.id, field: `matchingPair[${idx}].leftText`, before: mp.leftText, after: newLeft });
          mp.leftText = newLeft;
        }
        if (newRight && newRight !== mp.rightText) {
          changes.push({ qId: q.id, field: `matchingPair[${idx}].rightText`, before: mp.rightText, after: newRight });
          mp.rightText = newRight;
        }
      });
    }

    // Special fix for q-g5-ca-u8-022 where colon split separated INEOS 1:59
    if (q.id === 'q-g5-ca-u8-022' && q.matchingPairs) {
      const kipchogePair = q.matchingPairs.find(p => p.leftText.includes('Eliud Kipchoge'));
      if (kipchogePair) {
        kipchogePair.leftText = 'Eliud Kipchoge';
        kipchogePair.rightText = 'First human to run a marathon in under two hours (INEOS 1:59)';
      }
    }

    // Clean ordered items if present
    if (q.orderedItems && Array.isArray(q.orderedItems)) {
      q.orderedItems.forEach((it, idx) => {
        if (it.text) {
          const newText = cleanText(it.text);
          if (newText && newText !== it.text) {
            changes.push({ qId: q.id, field: `orderedItems[${idx}].text`, before: it.text, after: newText });
            it.text = newText;
          }
        }
      });
    }
  });

  console.log(`Phase 2 Language Cleanup Migration: ${changes.length} fields modified across ${new Set(changes.map(c => c.qId)).size} questions.`);

  // Write updated DB
  fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf8');
  console.log(`Updated ${DB_PATH}`);

  // Generate SQL migration
  const sqlStatements: string[] = [
    `-- ==============================================================================`,
    `-- Migration 20261011_10_language_cleanup.sql`,
    `-- Phase 2: Strip Translation Suffixes & Language Segregation`,
    `-- Non-Kiswahili subjects: Pure English content (strip Swahili translation suffixes).`,
    `-- Kiswahili subject: Pure Kiswahili content.`,
    `-- ==============================================================================`,
    ``
  ];

  const affectedQuestionIds = Array.from(new Set(changes.map(c => c.qId)));
  affectedQuestionIds.forEach(id => {
    const q = questions.find(x => x.id === id);
    if (!q) return;

    const optJson = q.options ? `'${JSON.stringify(q.options).replace(/'/g, "''")}'::jsonb` : 'options';
    const pairsJson = q.matchingPairs ? `'${JSON.stringify(q.matchingPairs).replace(/'/g, "''")}'::jsonb` : 'matching_pairs';
    const promptEscaped = q.prompt.replace(/'/g, "''");
    const explanationEscaped = (q.explanation || '').replace(/'/g, "''");

    sqlStatements.push(`UPDATE public.cbe_questions`);
    sqlStatements.push(`SET prompt = '${promptEscaped}',`);
    sqlStatements.push(`    explanation = '${explanationEscaped}',`);
    sqlStatements.push(`    options = ${optJson},`);
    sqlStatements.push(`    matching_pairs = ${pairsJson}`);
    sqlStatements.push(`WHERE id = '${id}';`);
    sqlStatements.push(``);
  });

  fs.writeFileSync(MIGRATION_PATH, sqlStatements.join('\n'), 'utf8');
  console.log(`Generated migration: ${MIGRATION_PATH}`);

  // Regenerate combined migrations
  const migrationFiles = [
    '20261011_01_questions_schema_and_constraints.sql',
    '20261011_02_attempts_and_reports.sql',
    '20261011_03_learning_engine.sql',
    '20261011_04_privacy_and_roles_rls.sql',
    '20261011_05_admin_views_and_analytics.sql',
    '20261011_06_scheduled_jobs.sql',
    '20261011_07_reliability_and_indexes.sql',
    '20261011_08_stable_option_ids_and_keys.sql',
    '20261011_09_matching_pairs_and_content_integrity.sql',
    '20261011_10_language_cleanup.sql'
  ];

  let combinedContent = `-- JIFUNO COMPREHENSIVE SUPABASE MIGRATION BUNDLE\n-- Auto-generated with Phase 1 and Phase 2 integrity updates\n\n`;
  for (const f of migrationFiles) {
    const fPath = path.resolve('supabase/migrations', f);
    if (fs.existsSync(fPath)) {
      combinedContent += `\n-- >>> START: ${f} <<<\n`;
      combinedContent += fs.readFileSync(fPath, 'utf8');
      combinedContent += `\n-- >>> END: ${f} <<<\n`;
    }
  }

  fs.writeFileSync(COMBINED_MIGRATION_PATH, combinedContent, 'utf8');
  console.log(`Regenerated ${COMBINED_MIGRATION_PATH}`);

  return changes;
}

if (process.argv[1]?.endsWith('migrate_phase2_language_cleanup.ts')) {
  runMigration();
}
