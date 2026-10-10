/**
 * Content Integrity Audit and Validation Script for Jifuno
 * 
 * Verifies all questions in data/cbe_database.json against strict database constraints:
 * 1. Non-empty prompt
 * 2. MULTIPLE_CHOICE: >= 2 options and correctOptionId matches an option
 * 3. MATCHING: >= 2 matching pairs with valid left/right text
 * 4. TRUE_FALSE: valid boolean answer
 * 5. FILL_BLANK: >= 1 acceptable answer
 * 
 * Automatically repairs legacy matching questions stored as option strings ("A -> B").
 * Exits with non-zero exit code if any unresolved failures exist, blocking CI/deploy.
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

export function runQuestionAudit(autoFix = true): { total: number; fixed: number; failed: AuditIssue[] } {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Database file not found at ${DB_PATH}`);
  }

  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];

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

  // 2. Strict audit phase
  const failures: AuditIssue[] = [];

  for (const q of questions) {
    const error = validateQuestion(q);
    if (error) {
      failures.push({
        id: q.id,
        type: q.type,
        prompt: q.prompt ? q.prompt.slice(0, 40) : '<empty>',
        error
      });
    }
  }

  return {
    total: questions.length,
    fixed: fixedCount,
    failed: failures
  };
}

// CLI Execution
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('audit_and_validate_questions')) {
  console.log('===========================================================');
  console.log('🛡️ JIFUNO CONTENT INTEGRITY & SCHEMA AUDIT');
  console.log('===========================================================');

  try {
    const result = runQuestionAudit(true);

    console.log(`Audited ${result.total} questions from database.`);
    if (result.fixed > 0) {
      console.log(`✓ Automatically repaired ${result.fixed} questions.`);
    }

    if (result.failed.length > 0) {
      console.error(`\n❌ [DEPLOY BLOCKED] Found ${result.failed.length} invalid questions:`);
      result.failed.forEach(f => {
        console.error(`  - [${f.id}] (${f.type}): ${f.error} | Prompt: "${f.prompt}..."`);
      });
      console.error('\nPlease fix the above questions before deploying.');
      process.exit(1);
    } else {
      console.log(`\n✅ ALL ${result.total} QUESTIONS PASSED CONTENT INTEGRITY AUDIT!`);
      console.log('===========================================================');
      process.exit(0);
    }
  } catch (err: any) {
    console.error('Fatal error during content audit:', err.message || err);
    process.exit(1);
  }
}
