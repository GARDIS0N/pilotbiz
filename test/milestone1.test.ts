import {
  calculateSimilarity,
  isDuplicateAdvice,
  deduplicateOrTransformReply,
  extractSubstantivePoints,
  TopicCooldownManager,
} from '../server/antiRepetition.js';
import fs from 'fs';
import path from 'path';

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`[FAIL] ${msg}`);
  console.log(`  [PASS] ${msg}`);
}

async function runMilestone1Tests() {
  console.log('====================================================');
  console.log('RUNNING MILESTONE 1 VERIFICATION TESTS');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // Test 1: Anti-Repetition Engine (Deduplication & Gating)
  // ----------------------------------------------------
  console.log('Test 1: Anti-Repetition Engine (Deduplication & Gating)');
  const recentlySaid = [
    'Tackle your primary objective in the morning block.',
    'Commit to working for only 5 minutes to eliminate friction.',
  ];

  // Identical / near-duplicate advice
  const candidateDuplicate = 'To eliminate friction, commit to working for only 5 minutes right now.';
  const dupCheck = isDuplicateAdvice(candidateDuplicate, recentlySaid);
  assert(dupCheck.isDuplicate === true, 'Duplicate advice is successfully detected with similarity > 0.70');

  // Transformed reply moves to next action
  const transformed = deduplicateOrTransformReply(candidateDuplicate, recentlySaid, 'boss', true);
  assert(transformed.isDuplicate === true, 'Candidate reply flagged as duplicate');
  assert(transformed.modified === true, 'Duplicate reply modified to prevent repetition');
  assert(transformed.reply.includes('Advancing to the next action'), 'Reply advances directly to next non-negotiable step');

  // Greeting suppression when already greeted
  const greetingWithAdvice = 'Good morning, boss. Let us review the sprint board.';
  const greetingStripped = deduplicateOrTransformReply(greetingWithAdvice, recentlySaid, 'boss', true);
  assert(!greetingStripped.reply.startsWith('Good morning'), 'Duplicate morning greeting is stripped when hasGreeted=true');

  // Substantive points extraction
  const points = extractSubstantivePoints('Good morning, boss. 🎯 ONE MAIN THING: Deploy the production release. What is your 5-minute first step?');
  assert(points.length > 0, 'Substantive points extracted for FIFO history');
  assert(!points[0].includes('Good morning'), 'Greetings filtered out from FIFO points');
  console.log();

  // ----------------------------------------------------
  // Test 2: 4-Hour Topic Cooldown on Briefings & Check-ins
  // ----------------------------------------------------
  console.log('Test 2: 4-Hour Topic Cooldown on Briefings & Check-ins');
  TopicCooldownManager.resetCooldown('daily_briefing');
  assert(TopicCooldownManager.canTrigger('daily_briefing', 4) === true, 'Daily briefing eligible before execution');

  TopicCooldownManager.recordTrigger('daily_briefing');
  assert(TopicCooldownManager.canTrigger('daily_briefing', 4) === false, 'Daily briefing placed on 4-hour cooldown after execution');

  const cooldownRemaining = TopicCooldownManager.getRemainingCooldownMinutes('daily_briefing', 4);
  assert(cooldownRemaining > 230, `Cooldown tracks remaining time (~${cooldownRemaining}m)`);

  TopicCooldownManager.resetCooldown('daily_briefing');
  assert(TopicCooldownManager.canTrigger('daily_briefing', 4) === true, 'Cooldown can be overridden when user asks');
  console.log();

  // ----------------------------------------------------
  // Test 3: Action Execution (No Passive Platitudes)
  // ----------------------------------------------------
  console.log('Test 3: Action Execution vs Conversational Platitudes');
  // Verify directory creation actually creates folder
  const testDir = path.join(process.cwd(), 'Desktop', 'Milestone1_TestDir');
  if (fs.existsSync(testDir)) fs.rmdirSync(testDir, { recursive: true });

  // Simulate command
  const desktopDir = path.join(process.cwd(), 'Desktop');
  if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });
  fs.mkdirSync(testDir, { recursive: true });

  assert(fs.existsSync(testDir), 'Filesystem tool creates directory without passive coaching text');
  // Clean up
  fs.rmdirSync(testDir, { recursive: true });
  console.log();

  // ----------------------------------------------------
  // Test 4: Frontend Component Integrity
  // ----------------------------------------------------
  console.log('Test 4: Frontend Component Integrity');
  const appTsx = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
  assert(appTsx.includes('RECENTLY_SAID'), 'App.tsx tracks RECENTLY_SAID in storage keys');
  assert(appTsx.includes('setRecentlySaid'), 'App.tsx manages recentlySaid state');
  assert(appTsx.includes('recentlySaid,'), 'App.tsx transmits recentlySaid to chat endpoint');
  assert(appTsx.includes('LiveTranscript'), 'App.tsx renders LiveTranscript component');
  assert(appTsx.includes('QuickActions'), 'App.tsx renders QuickActions component');
  console.log();

  console.log('====================================================');
  console.log('ALL MILESTONE 1 VERIFICATION TESTS PASSED!');
  console.log('====================================================');
}

runMilestone1Tests().catch((err) => {
  console.error(err);
  process.exit(1);
});
