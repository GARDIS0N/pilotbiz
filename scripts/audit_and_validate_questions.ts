/**
 * Content Integrity Audit and Validation Script for Jifuno
 * 
 * Run in CI on every deploy (and pre-build).
 * Fails (exit code 1) when:
 * 1. Options or matching pairs are empty.
 * 2. A match question has fewer than 2 pairs.
 * 3. The answer key is not an option ID.
 * 4. The correct answer sits in position A in more than 40% of a lesson's questions.
 * 5. The question type cannot be rendered.
 * 6. The scenario and question text mismatch or contradict (listed for review).
 */

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');

import { validateQuestion, repairMatchingQuestion } from '../src/utils/questionValidator.js';

export interface AuditIssue {
  id: string;
  type: string;
  prompt: string;
  error: string;
}

export { validateQuestion, repairMatchingQuestion };

export function runQuestionAudit(autoFix = true): {
  total: number;
  fixed: number;
  failed: AuditIssue[];
  mismatches: { id: string; scenario: string; prompt: string; note: string }[];
  highPosALessons: { lessonId: string; totalChoice: number; posACount: number; percentage: string }[];
  distribution: {
    totalChoice: number;
    posCounts: Record<number, number>;
    unmapped: number;
  };
} {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Database file not found at ${DB_PATH}`);
  }

  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];
  const missions: any[] = db.missions || [];

  let fixedCount = 0;

  // 1. Repair phase
  if (autoFix) {
    for (const q of questions) {
      if (repairMatchingQuestion(q)) {
        fixedCount++;
      }
    }

    if (fixedCount > 0) {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
      console.log(`[Content Integrity] Auto-repaired ${fixedCount} matching questions with structured pairs.`);
    }
  }

  // 2. Strict audit phase for every question
  const failures: AuditIssue[] = [];

  const BANNED_SW_TRANSLATION_REGEX = /\((Unyevu|Hewa safi|Joto la wastani|Simba|Pundamilia|Chui|Mamba|Ngamia|Jaribu Tena|Ndiyo \/ Kweli|Kidokezo)\)/i;

  for (const q of questions) {
    const error = validateQuestion(q);
    if (error) {
      failures.push({
        id: q.id,
        type: q.type,
        prompt: q.prompt ? q.prompt.slice(0, 50) : '<empty>',
        error
      });
    }

    // Phase 2: Check for forbidden translation suffixes in non-Kiswahili questions
    const isKisw = Boolean(
      (q.subStrandId && q.subStrandId.includes('kisw')) ||
      (q.id && (q.id.includes('-kisw-') || q.id.startsWith('q-kisw-'))) ||
      (q.learningAreaId && q.learningAreaId.toLowerCase().includes('kisw'))
    );

    if (!isKisw) {
      const checkTextForSuffix = (text: string | undefined, field: string) => {
        if (!text) return;
        if (BANNED_SW_TRANSLATION_REGEX.test(text)) {
          failures.push({
            id: q.id,
            type: q.type,
            prompt: text.slice(0, 50),
            error: `Contains forbidden translation suffix in ${field}: "${text}"`
          });
        }
      };

      checkTextForSuffix(q.prompt, 'prompt');
      (q.options || []).forEach((opt: any) => checkTextForSuffix(opt.text, `options[${opt.id}]`));
      (q.matchingPairs || []).forEach((mp: any) => {
        checkTextForSuffix(mp.leftText, 'matchingPair.leftText');
        checkTextForSuffix(mp.rightText, 'matchingPair.rightText');
      });
    }
  }

  // 3. Check for Scenario and Question Mismatch
  const mismatches: { id: string; scenario: string; prompt: string; note: string }[] = [];
  for (const q of questions) {
    if (q.storyScenario && q.prompt) {
      const scenarioLower = q.storyScenario.toLowerCase();
      const promptLower = q.prompt.toLowerCase();

      // Check for specific known contradictory settings (e.g. petri dish in lab vs outdoor school garden)
      if (
        (scenarioLower.includes('petri dish') && promptLower.includes('school garden')) ||
        (scenarioLower.includes('laboratory') && promptLower.includes('on the farm')) ||
        (scenarioLower.includes('athletics') && promptLower.includes('swimming pool'))
      ) {
        mismatches.push({
          id: q.id,
          scenario: q.storyScenario,
          prompt: q.prompt,
          note: 'Scenario and prompt describe contradicting settings/experiments'
        });
      }
    }
  }

  // 4. Check Position A Distribution per Lesson / Mission (Fail if > 40% in lessons with >= 3 choice questions)
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

  const highPosALessons: { lessonId: string; totalChoice: number; posACount: number; percentage: string }[] = [];

  for (const [lId, qIds] of lessonMap.entries()) {
    const choiceQs = qIds
      .map(id => qById.get(id))
      .filter(q => q && ['MULTIPLE_CHOICE', 'SCENARIO'].includes(q.type));

    if (choiceQs.length >= 3) {
      let posACount = 0;
      for (const q of choiceQs) {
        if (Array.isArray(q.options) && q.options.length > 0 && q.options[0].id === q.correctOptionId) {
          posACount++;
        }
      }
      const ratio = posACount / choiceQs.length;
      if (ratio > 0.40) {
        highPosALessons.push({
          lessonId: lId,
          totalChoice: choiceQs.length,
          posACount,
          percentage: `${(ratio * 100).toFixed(1)}%`
        });
      }
    }
  }

  // 5. Overall Choice Questions Position Distribution
  const choiceQuestions = questions.filter((q: any) =>
    ['MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE'].includes(q.type)
  );
  const posCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let unmappedPos = 0;

  for (const q of choiceQuestions) {
    if (Array.isArray(q.options) && q.correctOptionId) {
      const idx = q.options.findIndex((o: any) => o.id === q.correctOptionId);
      if (idx >= 0 && idx <= 3) {
        posCounts[idx]++;
      } else {
        unmappedPos++;
      }
    }
  }

  return {
    total: questions.length,
    fixed: fixedCount,
    failed: failures,
    mismatches,
    highPosALessons,
    distribution: {
      totalChoice: choiceQuestions.length,
      posCounts,
      unmapped: unmappedPos
    }
  };
}

// CLI Execution
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('audit_and_validate_questions')) {
  console.log('===========================================================');
  console.log('🛡️ JIFUNO CONTENT INTEGRITY & SCHEMA AUDIT (CI VALIDATION)');
  console.log('===========================================================');

  try {
    const result = runQuestionAudit(true);

    console.log(`Audited ${result.total} questions from database.`);
    if (result.fixed > 0) {
      console.log(`✓ Automatically repaired ${result.fixed} questions.`);
    }

    // Report Position Distribution across all choice questions
    const dist = result.distribution;
    console.log('\n--- 📊 Stored Correct Answer Position Distribution ---');
    console.log(`Total Choice Questions: ${dist.totalChoice}`);
    const letters = ['A (Index 0)', 'B (Index 1)', 'C (Index 2)', 'D (Index 3)'];
    letters.forEach((label, idx) => {
      const count = dist.posCounts[idx] || 0;
      const pct = ((count / dist.totalChoice) * 100).toFixed(2);
      console.log(`  Position ${label}: ${count.toString().padStart(5)} (${pct}%)`);
    });
    if (dist.unmapped > 0) {
      console.log(`  Position Other/Unmapped: ${dist.unmapped} (${((dist.unmapped / dist.totalChoice) * 100).toFixed(2)}%)`);
    }

    // Report Scenario Mismatches
    if (result.mismatches.length > 0) {
      console.warn(`\n⚠️ Found ${result.mismatches.length} scenario/question mismatches:`);
      result.mismatches.forEach(m => {
        console.warn(`  - [${m.id}] Scenario: "${m.scenario}" vs Prompt: "${m.prompt}" (${m.note})`);
      });
    }

    // Report High Position A Lessons
    if (result.highPosALessons.length > 0) {
      console.error(`\n❌ [FAIL] Found ${result.highPosALessons.length} lessons where Position A exceeds 40%:`);
      result.highPosALessons.slice(0, 10).forEach(l => {
        console.error(`  - Lesson "${l.lessonId}": ${l.posACount}/${l.totalChoice} in Position A (${l.percentage})`);
      });
      process.exit(1);
    }

    if (result.failed.length > 0) {
      console.error(`\n❌ [DEPLOY BLOCKED] Found ${result.failed.length} invalid questions:`);
      result.failed.forEach(f => {
        console.error(`  - [${f.id}] (${f.type}): ${f.error} | Prompt: "${f.prompt}..."`);
      });
      console.error('\nPlease fix the above questions before deploying.');
      process.exit(1);
    } else {
      console.log(`\n✅ ALL ${result.total} QUESTIONS & LESSONS PASSED CONTENT INTEGRITY AUDIT!`);
      console.log('===========================================================');
      process.exit(0);
    }
  } catch (err: any) {
    console.error('Fatal error during content audit:', err.message || err);
    process.exit(1);
  }
}
