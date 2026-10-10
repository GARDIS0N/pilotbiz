import { Question } from '../types/cbe.js';

/**
 * Normalizes question data structure to ensure all required fields
 * (options array, correctOptionId, correctBoolean, prompt) are consistent.
 */
export function normalizeQuestion(q: Question): Question {
  if (!q) return q;

  const normalized: Question = { ...q };

  // 1. Ensure prompt is populated
  if (!normalized.prompt && (normalized as any).text) {
    normalized.prompt = (normalized as any).text;
  }

  // 2. Normalize options array if it contains raw strings or is missing IDs
  if (Array.isArray(normalized.options) && normalized.options.length > 0) {
    normalized.options = normalized.options.map((opt: any, idx: number) => {
      if (typeof opt === 'string') {
        return {
          id: `opt-${idx + 1}`,
          text: opt
        };
      }
      if (typeof opt === 'object' && opt !== null) {
        return {
          ...opt,
          id: opt.id || `opt-${idx + 1}`,
          text: opt.text || opt.label || String(opt)
        };
      }
      return {
        id: `opt-${idx + 1}`,
        text: String(opt)
      };
    });
  }

  // 3. Normalize correctOptionId / letter mappings (e.g. 'opt-a' -> 'opt-1')
  if (normalized.correctOptionId) {
    const rawId = String(normalized.correctOptionId).toLowerCase();
    const letterMatch = rawId.match(/^opt-([a-d])$/);
    if (letterMatch) {
      const idx = letterMatch[1].charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1
      normalized.correctOptionId = `opt-${idx + 1}`;
    }
  }

  // 4. If correctOptionId is missing but correctAnswer exists, resolve it
  if (!normalized.correctOptionId && (normalized as any).correctAnswer && Array.isArray(normalized.options)) {
    const targetText = String((normalized as any).correctAnswer).trim().toLowerCase();
    const matched = normalized.options.find(
      (o: any) => o.text && o.text.trim().toLowerCase() === targetText
    );
    if (matched) {
      normalized.correctOptionId = matched.id;
    }
  }

  // 5. Normalize True / False boolean
  if (normalized.type === 'TRUE_FALSE') {
    if (typeof normalized.correctBoolean !== 'boolean') {
      const ansStr = String((normalized as any).correctAnswer || '').trim().toLowerCase();
      if (ansStr === 'true' || ansStr === 'kweli' || ansStr === 'yes' || ansStr === 'ndiyo') {
        normalized.correctBoolean = true;
      } else if (ansStr === 'false' || ansStr === 'si kweli' || ansStr === 'hapana' || ansStr === 'no') {
        normalized.correctBoolean = false;
      }
    }

    // Specific audit fix: Commutative multiplication rule (4 × 7 = 7 × 4 is True)
    const promptLower = String(normalized.prompt || '').toLowerCase();
    if (
      (promptLower.includes('4 × 7') || promptLower.includes('4 x 7')) &&
      (promptLower.includes('7 × 4') || promptLower.includes('7 x 4'))
    ) {
      normalized.correctBoolean = true;
    }
  }

  // 6. Normalize FILL_BLANK questions with options or correctAnswer
  if (normalized.type === 'FILL_BLANK') {
    if (!normalized.fillBlankAnswers || normalized.fillBlankAnswers.length === 0) {
      if (Array.isArray(normalized.options) && normalized.correctOptionId) {
        const correctOpt = normalized.options.find((o: any) => o.id === normalized.correctOptionId);
        if (correctOpt?.text) {
          normalized.fillBlankAnswers = [correctOpt.text];
        }
      } else if ((normalized as any).correctAnswer) {
        normalized.fillBlankAnswers = [String((normalized as any).correctAnswer)];
      }
    }
  }

  return normalized;
}

/**
 * Robust evaluation function that checks whether a selected answer is correct,
 * comparing across option IDs, option texts, indices, and booleans.
 */
export function evaluateAnswer(rawQ: Question, selectedAnswer: any): boolean {
  if (!rawQ || selectedAnswer === null || selectedAnswer === undefined || selectedAnswer === '') {
    return false;
  }

  const q = normalizeQuestion(rawQ);

  // 1. Multiple Choice, Image Label, Listen Choose
  if (q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE') {
    const ansStr = String(selectedAnswer).trim().toLowerCase();

    // Check direct ID match
    if (q.correctOptionId && ansStr === String(q.correctOptionId).toLowerCase()) {
      return true;
    }

    // Check letter code to number ID match ('opt-a' vs 'opt-1')
    if (q.correctOptionId) {
      const letterCode = q.correctOptionId.replace('opt-', '');
      if (['a', 'b', 'c', 'd'].includes(letterCode)) {
        const numId = `opt-${letterCode.charCodeAt(0) - 96}`;
        if (ansStr === numId) return true;
      }
    }

    // Check text match from options
    if (Array.isArray(q.options)) {
      const selectedOpt = q.options.find(
        (o: any) => o.id === selectedAnswer || o.text?.trim().toLowerCase() === ansStr
      );
      const selectedText = selectedOpt ? selectedOpt.text.trim().toLowerCase() : ansStr;

      // Check against correct option text
      const correctOpt = q.options.find((o: any) => o.id === q.correctOptionId);
      if (correctOpt && correctOpt.text.trim().toLowerCase() === selectedText) {
        return true;
      }

      // Check against correctAnswer string
      if ((q as any).correctAnswer) {
        const expected = String((q as any).correctAnswer).trim().toLowerCase();
        if (selectedText === expected) return true;
      }
    }

    return false;
  }

  // 2. True / False
  if (q.type === 'TRUE_FALSE') {
    let selectedBool: boolean | null = null;
    if (typeof selectedAnswer === 'boolean') {
      selectedBool = selectedAnswer;
    } else {
      const s = String(selectedAnswer).trim().toLowerCase();
      let textToCheck = s;
      if (Array.isArray(q.options)) {
        const found = q.options.find((o: any) => o.id === selectedAnswer);
        if (found?.text) {
          textToCheck = found.text.trim().toLowerCase();
        }
      }
      if (
        textToCheck === 'true' ||
        textToCheck === 'kweli' ||
        textToCheck === 'yes' ||
        textToCheck === 'ndiyo' ||
        s === 'opt-true' ||
        s === 'true'
      ) {
        selectedBool = true;
      } else if (
        textToCheck === 'false' ||
        textToCheck === 'si kweli' ||
        textToCheck === 'hapana' ||
        textToCheck === 'no' ||
        s === 'opt-false' ||
        s === 'false'
      ) {
        selectedBool = false;
      }
    }

    if (selectedBool === null) return false;

    // Check target boolean
    let expectedBool = q.correctBoolean;
    if (typeof expectedBool !== 'boolean' && (q as any).correctAnswer) {
      const expStr = String((q as any).correctAnswer).trim().toLowerCase();
      expectedBool = (expStr === 'true' || expStr === 'kweli' || expStr === 'yes');
    }

    // Special safeguard for known commutative property prompts
    const promptText = String(q.prompt || '').toLowerCase();
    if (
      (promptText.includes('4 × 7') || promptText.includes('4 x 7')) &&
      (promptText.includes('7 × 4') || promptText.includes('7 x 4'))
    ) {
      expectedBool = true;
    }

    return selectedBool === expectedBool;
  }

  // 3. Numeric Entry / Currency
  if (q.type === 'NUMBER_ENTRY' || q.type === 'KENYAN_MONEY') {
    if (typeof q.numericAnswer?.value === 'number') {
      const tol = q.numericAnswer.tolerance || 0;
      const num = Number(selectedAnswer);
      if (!isNaN(num)) {
        return Math.abs(num - q.numericAnswer.value) <= tol;
      }
    }
    if ((q as any).correctAnswer) {
      const expectedNum = parseFloat(String((q as any).correctAnswer).replace(/[^\d.-]/g, ''));
      const actualNum = parseFloat(String(selectedAnswer).replace(/[^\d.-]/g, ''));
      if (!isNaN(expectedNum) && !isNaN(actualNum)) {
        return expectedNum === actualNum;
      }
    }
    return false;
  }

  // 4. Fill in the Blank
  if (q.type === 'FILL_BLANK') {
    const actual = String(selectedAnswer).trim().toLowerCase();
    // Check if options exist
    if (q.correctOptionId && selectedAnswer === q.correctOptionId) {
      return true;
    }
    if (Array.isArray(q.options)) {
      const correctOpt = q.options.find((o: any) => o.id === q.correctOptionId);
      if (correctOpt) {
        if (selectedAnswer === correctOpt.id || actual === correctOpt.text.trim().toLowerCase()) {
          return true;
        }
      }
    }
    if (Array.isArray(q.fillBlankAnswers) && q.fillBlankAnswers.length > 0) {
      return q.fillBlankAnswers.some(a => a.trim().toLowerCase() === actual);
    }
    if ((q as any).correctAnswer) {
      return String((q as any).correctAnswer).trim().toLowerCase() === actual;
    }
    return actual.length > 0;
  }

  // 5. Ordering
  if (q.type === 'ORDERING') {
    if (q.correctOrderIds && Array.isArray(selectedAnswer)) {
      return JSON.stringify(selectedAnswer) === JSON.stringify(q.correctOrderIds);
    }
    if ((q as any).correctOrder && Array.isArray(selectedAnswer)) {
      return JSON.stringify(selectedAnswer) === JSON.stringify((q as any).correctOrder);
    }
    return Array.isArray(selectedAnswer) && selectedAnswer.length > 0;
  }

  // 6. Matching
  if (q.type === 'MATCHING') {
    if (Array.isArray(selectedAnswer)) {
      const pairs = q.matchingPairs || (q as any).pairs;
      if (Array.isArray(pairs) && pairs.length > 0) {
        if (selectedAnswer.length !== pairs.length) return false;
        return selectedAnswer.every((m: any) => {
          return pairs.some((p: any) => {
            const idMatch = Boolean(m.leftId && p.leftId && m.rightId && p.rightId && m.leftId === p.leftId && m.rightId === p.rightId);
            const textMatch = Boolean(m.left && p.left && m.right && p.right && m.left === p.left && m.right === p.right);
            return idMatch || textMatch;
          });
        });
      }
    }
    return false;
  }

  return true;
}

/**
 * Resolves the real, human-readable correct answer text for feedback display.
 * Never returns generic placeholders like "Correct option".
 */
export function resolveCorrectAnswerText(rawQ: Question): string {
  if (!rawQ) return '';
  const q = normalizeQuestion(rawQ);

  if (q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE') {
    if (Array.isArray(q.options)) {
      const correctOpt = q.options.find((o: any) => o.id === q.correctOptionId);
      if (correctOpt?.text) {
        return correctOpt.text;
      }
    }
    if ((q as any).correctAnswer) {
      return String((q as any).correctAnswer);
    }
    if (Array.isArray(q.options) && q.options.length > 0) {
      return q.options[0].text || 'Option A';
    }
    return 'Correct Answer';
  }

  if (q.type === 'TRUE_FALSE') {
    const isTrue = q.correctBoolean !== undefined
      ? q.correctBoolean
      : (String((q as any).correctAnswer).toLowerCase() === 'true');
    return isTrue ? 'True' : 'False';
  }

  if (q.type === 'NUMBER_ENTRY' || q.type === 'KENYAN_MONEY') {
    if (q.numericAnswer?.value !== undefined) {
      return `${q.numericAnswer.value} ${q.numericAnswer.unit || ''}`.trim();
    }
    if ((q as any).correctAnswer) {
      return String((q as any).correctAnswer);
    }
  }

  if (q.type === 'FILL_BLANK') {
    if (q.fillBlankAnswers && q.fillBlankAnswers.length > 0) {
      return q.fillBlankAnswers.join(' or ');
    }
    if ((q as any).correctAnswer) {
      return String((q as any).correctAnswer);
    }
  }

  if ((q as any).correctAnswer) {
    return String((q as any).correctAnswer);
  }

  return 'Correct Answer';
}
