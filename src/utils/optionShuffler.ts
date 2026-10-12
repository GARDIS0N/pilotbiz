import { Option, Question, MatchingPair } from '../types/cbe.js';

/**
 * Generates a 32-bit hash from a string seed.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Seeded pseudo-random number generator (Mulberry32).
 * Produces deterministic pseudo-random floats in [0, 1) for a given numeric seed.
 */
function createSeededPRNG(seedNumber: number) {
  let s = seedNumber >>> 0;
  return function next(): number {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Checks if option text indicates "All of the above" or "None of the above" or similar positional options.
 */
export function hasPositionalOptions(options: Option[]): boolean {
  if (!Array.isArray(options) || options.length === 0) return false;

  const positionalPatterns = [
    /all of the above/i,
    /all of these/i,
    /all the above/i,
    /none of the above/i,
    /none of these/i,
    /both\s+[a-d]\s+and\s+[a-d]/i,
    /zote\s+hapo\s+juu/i,
    /zote\s+sahihi/i,
    /hakuna\s+hata\s+moja/i,
    /hakuna\s+jibu/i
  ];

  return options.some(opt => {
    const text = String(opt.text || '').trim();
    return positionalPatterns.some(pattern => pattern.test(text));
  });
}

/**
 * Attempts to parse an option string into a numeric value.
 * Handles pure numbers ("20"), currencies ("KES 20", "20 Shillings"), percentages ("20%"),
 * and simple fractions ("1/2", "3/4").
 */
function parseNumericValue(text: string): number | null {
  const clean = String(text || '').trim().toLowerCase();
  
  // Fractions: "1/2", "3/4"
  const fractionMatch = clean.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const den = parseFloat(fractionMatch[2]);
    if (den !== 0) return num / den;
  }

  // Remove currency, units, percentage symbols: "KES 20", "20%", "20 kg", "20 cm"
  const stripped = clean
    .replace(/^kes\s*/, '')
    .replace(/^ksh\s*/, '')
    .replace(/\s*shillings?$/, '')
    .replace(/%$/, '')
    .replace(/\s*(cm|m|km|kg|g|litres?|l)$/, '')
    .trim();

  // If after stripping it's a valid number
  if (/^-?\d+(\.\d+)?$/.test(stripped)) {
    const val = parseFloat(stripped);
    return isNaN(val) ? null : val;
  }

  return null;
}

/**
 * Checks if options represent an ordered sequence of numbers (e.g. smallest to largest).
 */
export function isOrderedNumberChoices(options: Option[]): boolean {
  if (!Array.isArray(options) || options.length < 2) return false;

  const numbers: number[] = [];
  for (const opt of options) {
    const val = parseNumericValue(opt.text);
    if (val === null) return false;
    numbers.push(val);
  }

  // Check if strictly ascending
  let isAscending = true;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      isAscending = false;
      break;
    }
  }

  return isAscending;
}

/**
 * Seeded shuffle for multiple choice options.
 * 
 * Rules:
 * 1. Seed = attemptId + '_' + questionId (or any consistent seed string).
 * 2. Never shuffle True/False questions (keep True first).
 * 3. Never shuffle options with "All of the above" / "None of the above".
 * 4. Never shuffle ordered number choices (smallest to largest).
 * 5. Returns a deterministically shuffled array of options.
 */
export function shouldShuffleOptions(
  questionType: string | undefined,
  options: Option[]
): boolean {
  if (questionType === 'TRUE_FALSE') return false;
  if (!Array.isArray(options) || options.length <= 1) return false;
  if (hasPositionalOptions(options)) return false;
  if (isOrderedNumberChoices(options)) return false;
  return true;
}

export function getShuffledOptions(
  options: Option[],
  seed: string,
  question?: Partial<Question>
): Option[] {
  if (!Array.isArray(options) || options.length <= 1) {
    return options ? [...options] : [];
  }

  // Check exclusion rules (True/False, All/None of above, ordered numbers)
  if (!shouldShuffleOptions(question?.type, options)) {
    return [...options];
  }

  // Clone options array so we do not mutate the input
  const shuffled = [...options];
  const seedNum = hashString(seed || 'jifuno_default_seed');
  const prng = createSeededPRNG(seedNum);

  // Fisher-Yates shuffle with seeded PRNG
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

/**
 * Shuffles the right-side elements of matching pairs for render time,
 * while keeping the left-side elements in their original curriculum order.
 * This guarantees the learner cannot solve matching questions by aligning row 1 to row 1.
 */
export function getShuffledMatchingRightPairs(
  pairs: MatchingPair[],
  seed: string
): MatchingPair[] {
  if (!Array.isArray(pairs) || pairs.length <= 1) {
    return pairs ? [...pairs] : [];
  }

  const rightItems = pairs.map(p => ({
    rightId: p.rightId,
    rightText: p.rightText
  }));

  const seedNum = hashString(seed ? `${seed}_match_right` : 'jifuno_matching_seed');
  const prng = createSeededPRNG(seedNum);

  // Fisher-Yates shuffle on rightItems
  for (let i = rightItems.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const temp = rightItems[i];
    rightItems[i] = rightItems[j];
    rightItems[j] = temp;
  }

  // Re-assemble into matching pair objects preserving left text
  return pairs.map((p, idx) => ({
    ...p,
    rightId: rightItems[idx].rightId,
    rightText: rightItems[idx].rightText
  }));
}
