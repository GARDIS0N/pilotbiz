/**
 * Shared Question Validation & Integrity Engine
 * 
 * Used across frontend session runners, audit scripts, and Edge Functions.
 * Enforces strict content integrity constraints per question type:
 * 1. Non-empty prompt
 * 2. MULTIPLE_CHOICE / IMAGE_LABEL / LISTEN_CHOOSE: >= 2 options and correctOptionId matches an option
 * 3. MATCHING: >= 2 matching pairs with non-empty left and right text
 * 4. TRUE_FALSE: valid boolean answer
 * 5. FILL_BLANK: >= 1 acceptable answer or options
 */

import { Question } from '../types/cbe.js';

export function validateQuestion(q: any): string | null {
  if (!q) return 'Question object is null or undefined';
  if (!q.id) return 'Missing question id';
  if (!q.prompt || typeof q.prompt !== 'string' || !q.prompt.trim()) {
    return 'Empty prompt';
  }

  const validTypes = [
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'MATCHING',
    'ORDERING',
    'FILL_BLANK',
    'IMAGE_LABEL',
    'LISTEN_CHOOSE',
    'SCENARIO',
    'NUMBER_ENTRY',
    'READING_COMPREHENSION',
    'WORD_BUILDER',
    'KENYAN_MONEY'
  ];

  if (!validTypes.includes(q.type)) {
    return `Invalid question type: "${q.type}"`;
  }

  // 1. Multiple Choice / Scenario / Image Label / Listen Choose
  if (['MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE'].includes(q.type)) {
    if (!Array.isArray(q.options) || q.options.length < 2) {
      return `${q.type} must have >= 2 options (found ${q.options ? q.options.length : 0})`;
    }

    // Every option must be an object with non-empty id and text
    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];
      if (!opt || typeof opt !== 'object' || !opt.id || typeof opt.id !== 'string' || !opt.id.trim()) {
        return `Option ${i + 1} is missing a valid id`;
      }
      if (opt.text === undefined || opt.text === null || String(opt.text).trim() === '') {
        return `Option ${opt.id} has empty text`;
      }
    }

    // correctOptionId must exist and strictly match an option id
    if (!q.correctOptionId || typeof q.correctOptionId !== 'string' || !q.correctOptionId.trim()) {
      return 'Missing correctOptionId';
    }

    const hasMatch = q.options.some((opt: any) => opt.id === q.correctOptionId);
    if (!hasMatch) {
      return `Answer key "${q.correctOptionId}" does not match any option id in [${q.options.map((o: any) => o.id).join(', ')}]`;
    }
  }

  // 2. Matching Questions
  if (q.type === 'MATCHING') {
    if (!Array.isArray(q.matchingPairs) || q.matchingPairs.length < 2) {
      return `MATCHING question must have >= 2 matchingPairs (found ${q.matchingPairs ? q.matchingPairs.length : 0})`;
    }

    for (let i = 0; i < q.matchingPairs.length; i++) {
      const pair = q.matchingPairs[i];
      const left = (pair.leftText ?? pair.left ?? pair.question ?? '').toString().trim();
      const right = (pair.rightText ?? pair.right ?? pair.answer ?? '').toString().trim();

      if (!left) {
        return `Matching pair ${i + 1} has empty leftText`;
      }
      if (!right) {
        return `Matching pair ${i + 1} has empty rightText`;
      }
    }
  }

  // 3. True / False
  if (q.type === 'TRUE_FALSE') {
    const isBool = typeof q.correctBoolean === 'boolean';
    const isAnsBool =
      typeof q.correctAnswer === 'boolean' ||
      ['true', 'false', 'kweli', 'si kweli', 'yes', 'no', 'ndiyo', 'hapana'].includes(String(q.correctAnswer).toLowerCase());
    if (!isBool && !isAnsBool) {
      return 'TRUE_FALSE missing valid boolean answer';
    }
  }

  // 4. Fill in Blank
  if (q.type === 'FILL_BLANK') {
    const hasArray = Array.isArray(q.fillBlankAnswers) && q.fillBlankAnswers.length > 0;
    const hasAns = Boolean(q.correctAnswer && String(q.correctAnswer).trim());
    const hasOpt = Array.isArray(q.options) && q.options.length > 0;
    if (!hasArray && !hasAns && !hasOpt) {
      return 'FILL_BLANK has no acceptable answer or options';
    }
  }

  return null;
}

export function repairMatchingQuestion(q: any): boolean {
  if (q.type !== 'MATCHING') return false;

  // 1. If matchingPairs exists, normalize property names (left/right or question/answer -> leftText/rightText)
  if (Array.isArray(q.matchingPairs) && q.matchingPairs.length >= 2) {
    let modified = false;
    const normalizedPairs = q.matchingPairs.map((pair: any, idx: number) => {
      const leftText = (pair.leftText ?? pair.left ?? pair.question ?? '').toString().trim();
      const rightText = (pair.rightText ?? pair.right ?? pair.answer ?? '').toString().trim();
      const leftId = pair.leftId || `pair-${idx + 1}-l`;
      const rightId = pair.rightId || `pair-${idx + 1}-r`;

      if (pair.leftText !== leftText || pair.rightText !== rightText || !pair.leftId || !pair.rightId) {
        modified = true;
      }

      return {
        leftId,
        leftText,
        rightId,
        rightText
      };
    });

    if (modified) {
      q.matchingPairs = normalizedPairs;
      return true;
    }
    return false;
  }

  // 2. Check if options contain pair strings ("A -> B" or "A : B" or "A - B")
  if (Array.isArray(q.options) && q.options.length >= 2) {
    const pairs: { leftId: string; leftText: string; rightId: string; rightText: string }[] = [];

    for (let idx = 0; idx < q.options.length; idx++) {
      const opt = q.options[idx];
      let text = typeof opt === 'string' ? opt : opt.text || '';
      // Strip leading bullets / numbering if present (e.g. "1. ", "- ", "• ")
      text = text.replace(/^[-*•\d+.)\s]+/, '').trim();

      const delimiter = text.includes('->') ? '->'
        : text.includes('=>') ? '=>'
        : text.includes('—') ? '—'
        : text.includes('–') ? '–'
        : text.includes(':') ? ':'
        : text.includes(' - ') ? ' - '
        : null;

      if (!delimiter) return false;

      const parts = text.split(delimiter);
      const left = parts[0]?.trim();
      const right = parts.slice(1).join(delimiter)?.trim();

      if (!left || !right) return false;

      pairs.push({
        leftId: `pair-${idx + 1}-l`,
        leftText: left,
        rightId: `pair-${idx + 1}-r`,
        rightText: right
      });
    }

    q.matchingPairs = pairs;
    return true;
  }

  return false;
}
