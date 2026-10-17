/**
 * Jifuno Content Quality Validator & Checklist
 * Enforces strict pedagogical and technical standards for CBC curriculum questions.
 * Rejects malformed, duplicate, or biased questions before publishing.
 */

import {
  VersionedQuestionItem,
  ContentValidationError,
  ContentValidationResult
} from '../types/contentVersion.js';

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validateQuestionQuality(
  question: VersionedQuestionItem,
  index = 0,
  seenIds: Set<string> = new Set(),
  seenPrompts: Set<string> = new Set()
): ContentValidationError[] {
  const errors: ContentValidationError[] = [];

  // 1. ID Validation
  if (!question.id || typeof question.id !== 'string' || !question.id.trim()) {
    errors.push({
      questionId: question.id,
      index,
      field: 'id',
      message: 'Question id is required and cannot be empty.',
      severity: 'ERROR'
    });
  } else if (seenIds.has(question.id.trim())) {
    errors.push({
      questionId: question.id,
      index,
      field: 'id',
      message: `Duplicate question id "${question.id}" detected in batch.`,
      severity: 'ERROR'
    });
  } else {
    seenIds.add(question.id.trim());
  }

  // 2. Prompt Validation
  const promptEn = typeof question.prompt === 'string'
    ? question.prompt
    : question.prompt?.en || '';

  if (!promptEn || promptEn.trim().length < 5) {
    errors.push({
      questionId: question.id,
      index,
      field: 'prompt',
      message: 'Question prompt must be at least 5 characters long.',
      severity: 'ERROR'
    });
  } else if (promptEn.length > 400) {
    errors.push({
      questionId: question.id,
      index,
      field: 'prompt',
      message: 'Question prompt exceeds maximum child-friendly length of 400 characters.',
      severity: 'ERROR'
    });
  } else if (/undefined|\[object\s+Object\]/i.test(promptEn)) {
    errors.push({
      questionId: question.id,
      index,
      field: 'prompt',
      message: 'Prompt contains broken interpolated text ("undefined" or "[object Object]").',
      severity: 'ERROR'
    });
  } else {
    // Duplicate Prompt Detection
    const normPrompt = normalizeText(promptEn);
    const scopeKey = `${question.gradeId || 'global'}:${question.subjectId || 'global'}:${normPrompt}`;
    if (seenPrompts.has(scopeKey)) {
      errors.push({
        questionId: question.id,
        index,
        field: 'prompt',
        message: `Duplicate question prompt detected: "${promptEn.slice(0, 40)}..."`,
        severity: 'ERROR'
      });
    } else {
      seenPrompts.add(scopeKey);
    }
  }

  // 3. Curriculum Hierarchy Validation
  if (!question.gradeId) {
    errors.push({
      questionId: question.id,
      index,
      field: 'gradeId',
      message: 'Grade ID (e.g. grade-3, grade-4) is required.',
      severity: 'ERROR'
    });
  }

  // 4. Type & Answer Key Verification
  const validTypes = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'MATCHING', 'FILL_BLANK', 'SCENARIO'];
  if (!validTypes.includes(question.type)) {
    errors.push({
      questionId: question.id,
      index,
      field: 'type',
      message: `Invalid question type "${question.type}". Must be one of: ${validTypes.join(', ')}`,
      severity: 'ERROR'
    });
  }

  if (question.type === 'MULTIPLE_CHOICE' || question.type === 'SCENARIO') {
    const opts = question.options || [];
    if (!Array.isArray(opts) || opts.length < 2) {
      errors.push({
        questionId: question.id,
        index,
        field: 'options',
        message: 'Multiple choice questions require at least 2 options.',
        severity: 'ERROR'
      });
    } else if (opts.length > 5) {
      errors.push({
        questionId: question.id,
        index,
        field: 'options',
        message: 'Multiple choice questions cannot exceed 5 options for CBC learners.',
        severity: 'ERROR'
      });
    } else {
      // Check distinct option labels
      const optionTexts = new Set<string>();
      let hasDuplicates = false;
      opts.forEach(opt => {
        const text = typeof opt.text === 'string' ? opt.text : opt.text?.en || '';
        const norm = text.trim().toLowerCase();
        if (norm && optionTexts.has(norm)) {
          hasDuplicates = true;
        }
        optionTexts.add(norm);
      });

      if (hasDuplicates) {
        errors.push({
          questionId: question.id,
          index,
          field: 'options',
          message: 'Question options must be distinct; duplicate choice labels found.',
          severity: 'ERROR'
        });
      }

      // Check correctOptionId
      if (!question.correctOptionId) {
        errors.push({
          questionId: question.id,
          index,
          field: 'correctOptionId',
          message: 'Multiple choice questions require a correctOptionId.',
          severity: 'ERROR'
        });
      } else {
        const matched = opts.some(o => o.id === question.correctOptionId);
        if (!matched) {
          errors.push({
            questionId: question.id,
            index,
            field: 'correctOptionId',
            message: `correctOptionId "${question.correctOptionId}" does not match any choice option ID.`,
            severity: 'ERROR'
          });
        }
      }
    }
  } else if (question.type === 'TRUE_FALSE') {
    if (typeof question.correctBoolean !== 'boolean') {
      errors.push({
        questionId: question.id,
        index,
        field: 'correctBoolean',
        message: 'TRUE_FALSE questions must define boolean correctBoolean (true or false).',
        severity: 'ERROR'
      });
    }
  } else if (question.type === 'MATCHING') {
    const pairs = question.matchingPairs || [];
    if (!Array.isArray(pairs) || pairs.length < 2) {
      errors.push({
        questionId: question.id,
        index,
        field: 'matchingPairs',
        message: 'MATCHING questions require at least 2 distinct pairs.',
        severity: 'ERROR'
      });
    }
  }

  // 5. Pedagogical Quality: Explanation & Socratic Hint
  const expEn = typeof question.explanation === 'string'
    ? question.explanation
    : question.explanation?.en || '';

  if (!expEn || expEn.trim().length < 5) {
    errors.push({
      questionId: question.id,
      index,
      field: 'explanation',
      message: 'Pedagogical explanation is required for learning reinforcement.',
      severity: 'WARNING'
    });
  }

  return errors;
}

export function validateBulkContent(
  questions: VersionedQuestionItem[],
  existingQuestions: VersionedQuestionItem[] = []
): ContentValidationResult {
  const seenIds = new Set<string>(existingQuestions.map(q => q.id));
  const seenPrompts = new Set<string>();

  existingQuestions.forEach(q => {
    const promptEn = typeof q.prompt === 'string' ? q.prompt : q.prompt?.en || '';
    if (promptEn) {
      const scopeKey = `${q.gradeId || 'global'}:${q.subjectId || 'global'}:${normalizeText(promptEn)}`;
      seenPrompts.add(scopeKey);
    }
  });

  const allErrors: ContentValidationError[] = [];
  let validCount = 0;
  let invalidCount = 0;
  let duplicateCount = 0;
  let positionACount = 0;
  let totalMcq = 0;

  questions.forEach((q, idx) => {
    const qErrors = validateQuestionQuality(q, idx, seenIds, seenPrompts);
    const hasFatal = qErrors.some(e => e.severity === 'ERROR');

    if (qErrors.some(e => e.message.toLowerCase().includes('duplicate'))) {
      duplicateCount++;
    }

    if (hasFatal) {
      invalidCount++;
    } else {
      validCount++;
    }

    if (q.type === 'MULTIPLE_CHOICE' && q.options && q.options.length > 0 && q.correctOptionId) {
      totalMcq++;
      if (q.options[0].id === q.correctOptionId) {
        positionACount++;
      }
    }

    allErrors.push(...qErrors);
  });

  const positionADistributionPct = totalMcq > 0
    ? Math.round((positionACount / totalMcq) * 1000) / 10
    : 0;

  // Warning if position A exceeds 40%
  if (positionADistributionPct > 40 && totalMcq >= 10) {
    allErrors.push({
      index: -1,
      field: 'distribution',
      message: `Positional bias detected: ${positionADistributionPct}% of questions have correct answer in Position A (target <= 35%).`,
      severity: 'WARNING'
    });
  }

  const warningCount = allErrors.filter(e => e.severity === 'WARNING').length;

  return {
    isValid: invalidCount === 0,
    totalQuestions: questions.length,
    validCount,
    invalidCount,
    warningCount,
    errors: allErrors,
    duplicateCount,
    positionADistributionPct
  };
}
