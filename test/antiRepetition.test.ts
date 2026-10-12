import {
  calculateSimilarity,
  isDuplicateAdvice,
  deduplicateOrTransformReply,
  extractSubstantivePoints,
  TopicCooldownManager,
} from '../server/antiRepetition.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('Testing Anti-Repetition Engine...');

// Test 1: Similarity Calculation
const text1 = 'You should commit to the 5-minute start and eliminate distractions from your workspace.';
const text2 = 'Commit to the 5-minute start and eliminate all distractions in your workspace.';
const text3 = 'The weather in Nairobi is 24 degrees and partly cloudy.';

const simHigh = calculateSimilarity(text1, text2);
const simLow = calculateSimilarity(text1, text3);

console.log(`Similarity high: ${simHigh.toFixed(2)}, Similarity low: ${simLow.toFixed(2)}`);
assert(simHigh > 0.70, `Expected similarity > 0.70 for near duplicates, got ${simHigh}`);
assert(simLow < 0.20, `Expected similarity < 0.20 for distinct topics, got ${simLow}`);

// Test 2: isDuplicateAdvice
const history = [
  'Focus on your single P1 priority for 25 minutes.',
  'Commit to working for only 5 minutes to beat procrastination.',
];

const candidateDuplicate = 'To beat procrastination, commit to working for only 5 minutes right now.';
const candidateFresh = 'Let us draft the project proposal for NestList and test the API integration.';

const dupResult = isDuplicateAdvice(candidateDuplicate, history);
const freshResult = isDuplicateAdvice(candidateFresh, history);

assert(dupResult.isDuplicate === true, 'Expected duplicate to be detected');
assert(freshResult.isDuplicate === false, 'Expected fresh message not to be detected as duplicate');

// Test 3: deduplicateOrTransformReply
const testReply = 'Good morning, boss. Commit to working for only 5 minutes to beat procrastination.';
const transformed = deduplicateOrTransformReply(testReply, history, 'boss', true);

assert(transformed.isDuplicate === true, 'Expected isDuplicate to be true for transformed reply');
assert(!transformed.reply.includes('Good morning'), 'Expected greeting to be stripped');
console.log('Transformed response:', transformed.reply);

// Test 4: extractSubstantivePoints
const sampleModelReply = `Good morning, boss. It is 08:30.
🎯 ONE MAIN THING: Complete the database migration.
Eliminate all low-value distractions and turn off social media notifications for the next 2 hours.
What is your immediate 5-minute first step?`;

const points = extractSubstantivePoints(sampleModelReply);
assert(points.length > 0, 'Expected substantive points to be extracted');
assert(!points[0].includes('Good morning'), 'Expected greetings to be excluded from points');
console.log('Extracted points:', points);

// Test 5: TopicCooldownManager
TopicCooldownManager.resetCooldown('test_topic');
assert(TopicCooldownManager.canTrigger('test_topic', 4) === true, 'Expected fresh topic to trigger');

TopicCooldownManager.recordTrigger('test_topic');
assert(TopicCooldownManager.canTrigger('test_topic', 4) === false, 'Expected topic on cooldown not to trigger');
const remainingMin = TopicCooldownManager.getRemainingCooldownMinutes('test_topic', 4);
assert(remainingMin > 230, `Expected ~240 minutes remaining, got ${remainingMin}`);

TopicCooldownManager.resetCooldown('test_topic');
assert(TopicCooldownManager.canTrigger('test_topic', 4) === true, 'Expected reset topic to trigger');

console.log('✓ All Anti-Repetition Engine tests PASSED successfully!');
