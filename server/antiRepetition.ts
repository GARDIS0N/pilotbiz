import fs from 'fs';
import path from 'path';

// Common stop-words for semantic similarity comparison
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
  'in', 'on', 'at', 'to', 'for', 'with', 'about', 'by', 'of', 'from', 'it', 'its',
  'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'my',
  'your', 'his', 'her', 'our', 'their', 'what', 'which', 'who', 'when', 'where',
  'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can',
  'will', 'just', 'should', 'now', 'there', 'here',
]);

/**
 * Normalizes text for comparison by lowercasing, stripping special characters,
 * and normalizing whitespace.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts meaningful tokens from text, omitting stop words and single-character tokens.
 */
export function getTokens(text: string): Set<string> {
  const normalized = normalizeText(text);
  const words = normalized.split(' ').filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  return new Set(words);
}

/**
 * Extracts word bi-grams from text to capture phrasing and clause structures.
 */
export function getBigrams(text: string): Set<string> {
  const normalized = normalizeText(text);
  const words = normalized.split(' ').filter((w) => w.length > 1);
  const bigrams = new Set<string>();
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.add(`${words[i]}_${words[i + 1]}`);
  }
  return bigrams;
}

/**
 * Computes Jaccard Similarity between two sets.
 */
function jaccardSimilarity<T>(setA: Set<T>, setB: Set<T>): number {
  if (setA.size === 0 && setB.size === 0) return 0;
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersectionCount = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersectionCount++;
    }
  }

  const unionCount = setA.size + setB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

/**
 * Calculates a combined similarity metric between two text snippets (0.0 to 1.0)
 * considering both token overlap and bi-gram phrasing overlap.
 */
export function calculateSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  const normA = normalizeText(textA);
  const normB = normalizeText(textB);

  if (normA === normB) return 1.0;
  if (normA.includes(normB) && normB.length > 30) return 0.95;
  if (normB.includes(normA) && normA.length > 30) return 0.95;

  const tokensA = getTokens(textA);
  const tokensB = getTokens(textB);
  const wordSim = jaccardSimilarity(tokensA, tokensB);

  const bigramsA = getBigrams(textA);
  const bigramsB = getBigrams(textB);
  const bigramSim = jaccardSimilarity(bigramsA, bigramsB);

  // Return the maximum of word-set similarity and phrase bi-gram similarity
  return Math.max(wordSim, bigramSim);
}

/**
 * Checks whether candidate text is semantically duplicate with any item in recentlySaid.
 * Returns duplicate status, peak similarity, and the matching item if any.
 */
export function isDuplicateAdvice(
  candidateText: string,
  recentlySaidList: string[],
  threshold = 0.70
): { isDuplicate: boolean; similarity: number; matchedItem?: string } {
  if (!candidateText || !Array.isArray(recentlySaidList) || recentlySaidList.length === 0) {
    return { isDuplicate: false, similarity: 0 };
  }

  let peakSim = 0;
  let matchedItem: string | undefined;

  for (const prev of recentlySaidList) {
    if (!prev) continue;
    const sim = calculateSimilarity(candidateText, prev);
    if (sim > peakSim) {
      peakSim = sim;
      matchedItem = prev;
    }
    if (sim >= threshold) {
      return { isDuplicate: true, similarity: sim, matchedItem: prev };
    }
  }

  return { isDuplicate: peakSim >= threshold, similarity: peakSim, matchedItem };
}

/**
 * Extracts 1-3 core substantive advice sentences or action points from a message,
 * filtering out standard greetings, pleasantries, or one-word confirmations.
 */
export function extractSubstantivePoints(text: string): string[] {
  if (!text) return [];

  // Remove markdown headers, bold, links, code blocks
  const clean = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*|__|\*|_/g, '')
    .replace(/#+\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/⚠️|🎯|⚡|📋|🔴|🟡|⚪|💡|🚫|🔥|📊/g, '');

  const sentences = clean
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => {
      if (s.length < 20 || s.length > 250) return false;
      const lower = s.toLowerCase();
      // Filter out trivial greetings and generic transitional questions
      if (lower.startsWith('good morning') || lower.startsWith('good afternoon') || lower.startsWith('good evening')) return false;
      if (lower.startsWith('hello') || lower.startsWith('hi') || lower.startsWith('hey')) return false;
      if (lower.includes('how can i help') || lower.includes('ready to execute') || lower.includes('let me know')) return false;
      return true;
    });

  return sentences.slice(0, 3);
}

/**
 * Deduplicates or transforms a candidate assistant reply against recently said points.
 * If the reply contains repeated advice (>70% similarity), rewrites or trims the repeated portion.
 */
export function deduplicateOrTransformReply(
  replyText: string,
  recentlySaidList: string[],
  addressAs = 'boss',
  hasGreeted = false
): { reply: string; isDuplicate: boolean; modified: boolean } {
  if (!replyText) return { reply: replyText, isDuplicate: false, modified: false };

  let currentReply = replyText;
  let modified = false;

  // 1. Remove duplicate time-of-day greeting if session already greeted
  if (hasGreeted) {
    const greetingRegex = /^(?:good morning|good afternoon|good evening|hello|hey there)[^.!?\n]*[.!?\n]\s*/i;
    if (greetingRegex.test(currentReply)) {
      currentReply = currentReply.replace(greetingRegex, '').trim();
      modified = true;
    }
  }

  // 2. Check full reply similarity against recentlySaid
  const dupCheck = isDuplicateAdvice(currentReply, recentlySaidList, 0.70);
  if (dupCheck.isDuplicate) {
    // Generate fresh progressive next-action response
    const transformed = `Advancing to the next action, ${addressAs}: We have already covered that milestone. Let's move directly to your immediate priority. What is your single next non-negotiable step?`;
    return {
      reply: transformed,
      isDuplicate: true,
      modified: true,
    };
  }

  // 3. Sentence-level deduplication: check if any major advice paragraph is an exact repeat
  const paragraphs = currentReply.split('\n\n');
  const filteredParagraphs: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    // Check if this specific paragraph duplicates recently said points
    const paraCheck = isDuplicateAdvice(trimmed, recentlySaidList, 0.75);
    if (paraCheck.isDuplicate && trimmed.length > 40) {
      modified = true;
      continue; // Skip the redundant advice paragraph
    }
    filteredParagraphs.push(para);
  }

  if (modified && filteredParagraphs.length > 0) {
    currentReply = filteredParagraphs.join('\n\n').trim();
  } else if (modified && filteredParagraphs.length === 0) {
    currentReply = `Understood, ${addressAs}. What is the next immediate task to move forward?`;
  }

  return {
    reply: currentReply,
    isDuplicate: false,
    modified,
  };
}

// -------------------------------------------------------------
// Topic Cooldown Manager (Persistent 4-hour Cooldown on Check-ins)
// -------------------------------------------------------------
const COOLDOWN_FILE = path.join(process.cwd(), 'data', 'topic_cooldowns.json');

interface CooldownData {
  [topic: string]: {
    lastTriggered: string; // ISO string
    count: number;
  };
}

export class TopicCooldownManager {
  private static loadData(): CooldownData {
    try {
      if (fs.existsSync(COOLDOWN_FILE)) {
        return JSON.parse(fs.readFileSync(COOLDOWN_FILE, 'utf8'));
      }
    } catch (_) {}
    return {};
  }

  private static saveData(data: CooldownData): void {
    try {
      const dataDir = path.dirname(COOLDOWN_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(COOLDOWN_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save topic cooldowns:', err);
    }
  }

  /**
   * Checks whether a topic can be triggered based on cooldown window.
   * Default cooldown: 4 hours (240 minutes).
   */
  public static canTrigger(topic: string, cooldownHours = 4): boolean {
    const data = this.loadData();
    const entry = data[topic];
    if (!entry || !entry.lastTriggered) return true;

    const lastTime = new Date(entry.lastTriggered).getTime();
    const elapsedMs = Date.now() - lastTime;
    const cooldownMs = cooldownHours * 60 * 60 * 1000;

    return elapsedMs >= cooldownMs;
  }

  /**
   * Records a topic execution timestamp.
   */
  public static recordTrigger(topic: string): void {
    const data = this.loadData();
    const prevCount = data[topic]?.count || 0;
    data[topic] = {
      lastTriggered: new Date().toISOString(),
      count: prevCount + 1,
    };
    this.saveData(data);
  }

  /**
   * Returns remaining cooldown in minutes, or 0 if cooldown expired.
   */
  public static getRemainingCooldownMinutes(topic: string, cooldownHours = 4): number {
    const data = this.loadData();
    const entry = data[topic];
    if (!entry || !entry.lastTriggered) return 0;

    const lastTime = new Date(entry.lastTriggered).getTime();
    const elapsedMs = Date.now() - lastTime;
    const cooldownMs = cooldownHours * 60 * 60 * 1000;
    const remainingMs = cooldownMs - elapsedMs;

    return remainingMs > 0 ? Math.ceil(remainingMs / (60 * 1000)) : 0;
  }

  /**
   * Clears cooldown for a topic (used when user explicitly requests repetition).
   */
  public static resetCooldown(topic: string): void {
    const data = this.loadData();
    delete data[topic];
    this.saveData(data);
  }
}
