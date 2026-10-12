import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { classifyUserIntent } from '../server/intentRouter.js';
import {
  processLocalButlerDirective,
  getMemoriesData,
  saveMemoriesData,
  getGoalsData,
  saveGoalsData,
  getCommitmentsData,
  saveCommitmentsData,
  getSomedayLaterData,
  saveSomedayLaterData,
  getScheduleData,
  saveScheduleData,
  getAccountabilityData,
  saveAccountabilityData,
  calculateProductivityScore,
  buildSystemInstruction,
} from '../server.js';
import {
  buildManagerPersonaInstruction,
  getPersonaData,
} from '../server/personaManager.js';

console.log('====================================================');
console.log('🧪 MILESTONE 4: PERSISTENT MEMORY & DATA LAYER TEST');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err?.message || err}`);
  }
}

// Backup & restore existing data to guarantee zero side-effects
const DATA_DIR = path.join(process.cwd(), 'data');
const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');
const GOALS_FILE = path.join(DATA_DIR, 'goals.json');
const COMMITMENTS_FILE = path.join(DATA_DIR, 'commitments.json');
const SOMEDAY_FILE = path.join(DATA_DIR, 'someday_later.json');
const SCHEDULE_FILE = path.join(DATA_DIR, 'schedule.json');
const ACCOUNTABILITY_FILE = path.join(DATA_DIR, 'accountability.json');

const originalMemories = fs.existsSync(MEMORIES_FILE) ? fs.readFileSync(MEMORIES_FILE, 'utf8') : null;
const originalGoals = fs.existsSync(GOALS_FILE) ? fs.readFileSync(GOALS_FILE, 'utf8') : null;
const originalCommitments = fs.existsSync(COMMITMENTS_FILE) ? fs.readFileSync(COMMITMENTS_FILE, 'utf8') : null;
const originalSomeday = fs.existsSync(SOMEDAY_FILE) ? fs.readFileSync(SOMEDAY_FILE, 'utf8') : null;
const originalSchedule = fs.existsSync(SCHEDULE_FILE) ? fs.readFileSync(SCHEDULE_FILE, 'utf8') : null;
const originalAccountability = fs.existsSync(ACCOUNTABILITY_FILE) ? fs.readFileSync(ACCOUNTABILITY_FILE, 'utf8') : null;

try {
  // -------------------------------------------------------------
  // Group 1: UI Code Audit (Zero Hardcoded Personal Data)
  // -------------------------------------------------------------
  console.log('--- Group 1: UI Code Audit (Zero Hardcoded Data) ---');

  runTest('1.1 UI Audit: src/App.tsx does not contain hardcoded personal tasks, shifts, or projects', () => {
    const appContent = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
    assert(!appContent.includes('hardcodedTask'), 'App.tsx contains hardcoded tasks');
    assert(!appContent.includes('work shift'), 'App.tsx contains hardcoded work shifts');
    // Ensure schedule and tasks load dynamically from state/props
    assert(appContent.includes('scheduleItems') || appContent.includes('schedule'), 'App.tsx should bind schedule state');
  });

  runTest('1.2 UI Audit: src/components/TodayCard.tsx uses dynamic schedule/task props only', () => {
    const cardContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'TodayCard.tsx'), 'utf8');
    assert(!cardContent.includes('9:00 AM - Shift'), 'TodayCard contains hardcoded shift');
    assert(cardContent.includes('schedule') || cardContent.includes('items'), 'TodayCard should consume dynamic items');
  });

  runTest('1.3 UI Audit: src/components/TasksPanel.tsx does not contain hardcoded task lists', () => {
    const panelContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'TasksPanel.tsx'), 'utf8');
    assert(!panelContent.includes('NestList Onboarding'), 'TasksPanel contains hardcoded personal onboarding data');
    assert(!panelContent.includes('Study Biology Chapter 4'), 'TasksPanel contains hardcoded study task');
  });

  runTest('1.4 UI Audit: src/components/ScheduleDrawer.tsx contains no hardcoded calendar entries', () => {
    const drawerContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'ScheduleDrawer.tsx'), 'utf8');
    assert(!drawerContent.includes('Shift: Hospital'), 'ScheduleDrawer contains hardcoded shift');
    assert(drawerContent.includes('items') || drawerContent.includes('schedule'), 'ScheduleDrawer should render dynamic items');
  });

  runTest('1.5 UI Audit: src/components/ProjectsDrawer.tsx uses dynamic projects prop and neutral placeholder', () => {
    const projContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'ProjectsDrawer.tsx'), 'utf8');
    // Check that static placeholder was cleansed
    assert(!projContent.includes('e.g. NestList, JARVIS Core'), 'ProjectsDrawer still has personal hardcoded placeholder');
    assert(projContent.includes('projects') && projContent.includes('map('), 'ProjectsDrawer should iterate dynamic projects');
  });

  runTest('1.6 UI Audit: src/components/FocusSessionHUD.tsx contains no hardcoded personal tasks', () => {
    const hudContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'FocusSessionHUD.tsx'), 'utf8');
    assert(!hudContent.includes('Review MCAT Physics'), 'FocusSessionHUD contains hardcoded task');
  });

  // -------------------------------------------------------------
  // Group 2: Natural Language Memory Intent Classification
  // -------------------------------------------------------------
  console.log('\n--- Group 2: Natural Language Memory Intent Classification ---');

  runTest('2.1 Intent: "remember this: [fact]" classified as ACTION_MEMORY / remember', () => {
    const intent = classifyUserIntent('remember this: I prefer morning deep work blocks');
    assert.strictEqual(intent.category, 'ACTION_MEMORY');
    assert.strictEqual(intent.subType, 'remember');
    assert.strictEqual(intent.args?.content, 'I prefer morning deep work blocks');
  });

  runTest('2.2 Intent: "remember that [fact]" classified as ACTION_MEMORY / remember', () => {
    const intent = classifyUserIntent('remember that my target launch date is November 1st');
    assert.strictEqual(intent.category, 'ACTION_MEMORY');
    assert.strictEqual(intent.subType, 'remember');
    assert.strictEqual(intent.args?.content, 'my target launch date is November 1st');
  });

  runTest('2.3 Intent: "what do you remember about me?" classified as ACTION_MEMORY / list', () => {
    const intent1 = classifyUserIntent('what do you remember about me?');
    assert.strictEqual(intent1.category, 'ACTION_MEMORY');
    assert.strictEqual(intent1.subType, 'list');

    const intent2 = classifyUserIntent('/memory');
    assert.strictEqual(intent2.category, 'ACTION_MEMORY');
    assert.strictEqual(intent2.subType, 'list');

    const intent3 = classifyUserIntent('my memories');
    assert.strictEqual(intent3.category, 'ACTION_MEMORY');
    assert.strictEqual(intent3.subType, 'list');
  });

  runTest('2.4 Intent: "forget [query]" classified as ACTION_MEMORY / forget', () => {
    const intent1 = classifyUserIntent('forget my old gym routine');
    assert.strictEqual(intent1.category, 'ACTION_MEMORY');
    assert.strictEqual(intent1.subType, 'forget');
    assert.strictEqual(intent1.args?.query, 'my old gym routine');

    const intent2 = classifyUserIntent('delete memory morning coffee preference');
    assert.strictEqual(intent2.category, 'ACTION_MEMORY');
    assert.strictEqual(intent2.subType, 'forget');
    assert.strictEqual(intent2.args?.query, 'morning coffee preference');
  });

  runTest('2.5 Intent: "clear memories" classified as ACTION_MEMORY / wipe', () => {
    const intent1 = classifyUserIntent('clear memories');
    assert.strictEqual(intent1.category, 'ACTION_MEMORY');
    assert.strictEqual(intent1.subType, 'wipe');

    const intent2 = classifyUserIntent('wipe memories');
    assert.strictEqual(intent2.category, 'ACTION_MEMORY');
    assert.strictEqual(intent2.subType, 'wipe');
  });

  // -------------------------------------------------------------
  // Group 3: Memory Storage, Retrieval & Pruning Execution Loop
  // -------------------------------------------------------------
  console.log('\n--- Group 3: Memory Execution Loop & Source Attribution ---');

  // Start with clean memory store for predictable test
  saveMemoriesData({ memories: [] });

  runTest('3.1 NL "remember this:" stores to persistent storage with source attribution', () => {
    const directive = processLocalButlerDirective('remember this: I code best between 8am and 11am', 'boss');
    assert(directive.reply.includes('[Personal Memory] Stored'), 'Reply missing [Personal Memory] tag');
    assert(directive.reply.includes('I code best between 8am and 11am'), 'Reply does not mention content');

    // Verify written to disk
    const onDisk = getMemoriesData();
    assert.strictEqual(onDisk.memories.length, 1);
    assert.strictEqual(onDisk.memories[0].content, 'I code best between 8am and 11am');
    assert.strictEqual(onDisk.memories[0].source, 'USER_EXPLICIT');
  });

  runTest('3.2 NL "remember that" appends second memory item', () => {
    processLocalButlerDirective('remember that I do not drink coffee after 2pm', 'boss');
    const onDisk = getMemoriesData();
    assert.strictEqual(onDisk.memories.length, 2);
    assert(onDisk.memories.some((m: any) => m.content.includes('do not drink coffee after 2pm')));
  });

  runTest('3.3 NL "what do you remember about me?" retrieves all stored memories with tags', () => {
    const directive = processLocalButlerDirective('what do you remember about me?', 'boss');
    assert(directive.reply.includes('[Personal Memory] LONG-TERM PROFILE TELEMETRY'), 'Reply missing memory banner');
    assert(directive.reply.includes('I code best between 8am and 11am'), 'Missing first memory');
    assert(directive.reply.includes('I do not drink coffee after 2pm'), 'Missing second memory');
    assert(directive.attributions?.some((a: any) => a.type === 'PERSONAL_MEMORY'), 'Missing PERSONAL_MEMORY attribution');
  });

  runTest('3.4 NL "forget [fact]" prunes matching memory from disk', () => {
    const directive = processLocalButlerDirective('forget coffee', 'boss');
    assert(directive.reply.includes('[Personal Memory] Pruned'), 'Reply should confirm memory pruned');

    const onDisk = getMemoriesData();
    assert.strictEqual(onDisk.memories.length, 1);
    assert(!onDisk.memories.some((m: any) => m.content.includes('coffee')), 'Coffee memory was not pruned');
  });

  runTest('3.5 NL "clear memories" triggers 5-Tier Permission Protocol CONFIRM tier', () => {
    const directive = processLocalButlerDirective('clear memories', 'boss');
    assert(directive.reply.includes('CONFIRMATION REQUIRED'), 'Reply should require confirmation');
    assert(directive.reply.includes('CONFIRM'), 'Reply should specify CONFIRM tier');
    assert(directive.pendingConfirmation, 'Pending confirmation object must be returned');
    assert.strictEqual(directive.pendingConfirmation.permission, 'CONFIRM');
    assert(
      directive.pendingConfirmation.actionType === 'WIPE_MEMORIES' ||
      directive.pendingConfirmation.actionType === 'CLEAR_MEMORIES'
    );

    // Verify disk has NOT been wiped yet before authorization
    const onDisk = getMemoriesData();
    assert.strictEqual(onDisk.memories.length, 1, 'Memories must not be wiped without confirmation');
  });

  // -------------------------------------------------------------
  // Group 4: Dynamic Storage Subsystems (Goals, Schedule, Commitments, Someday)
  // -------------------------------------------------------------
  console.log('\n--- Group 4: Dynamic Storage Subsystems ---');

  runTest('4.1 Goals subsystem persists, reads, and updates dynamic goals', () => {
    const testGoals = {
      items: [
        {
          id: 'goal-test-1',
          title: 'Launch SaaS MVP',
          whyItMatters: 'Financial independence',
          targetDate: '2026-12-31',
          progress: 35,
          status: 'Active',
          milestones: ['Design wireframes', 'Build backend', 'Deploy to prod'],
          dailyAction: 'Commit code daily',
        },
      ],
    };
    saveGoalsData(testGoals);
    const loaded = getGoalsData();
    assert.strictEqual(loaded.items.length, 1);
    assert.strictEqual(loaded.items[0].title, 'Launch SaaS MVP');
    assert.strictEqual(loaded.items[0].progress, 35);
  });

  runTest('4.2 Commitments subsystem persists and tracks status', () => {
    const testCommitments = {
      items: [
        { id: 'comm-1', commitment: 'No social media before 12pm', status: 'active', createdAt: new Date().toISOString() },
      ],
    };
    saveCommitmentsData(testCommitments);
    const loaded = getCommitmentsData();
    assert.strictEqual(loaded.items.length, 1);
    assert.strictEqual(loaded.items[0].commitment, 'No social media before 12pm');
  });

  runTest('4.3 Someday / Later backlog persists ideas without hardcoded items', () => {
    const testSomeday = { items: ['Learn Rust', 'Write a technical blog post'] };
    saveSomedayLaterData(testSomeday);
    const loaded = getSomedayLaterData();
    assert.strictEqual(loaded.items.length, 2);
    assert(loaded.items.includes('Learn Rust'));
  });

  runTest('4.4 Schedule and Accountability telemetry calculate real dynamic productivity score', () => {
    const testSched = {
      items: [
        { id: 'sch-1', title: 'Deep Work Block', date: 'today', completed: true, slipCount: 0 },
        { id: 'sch-2', title: 'Code Review', date: 'today', completed: false, slipCount: 0 },
      ],
    };
    saveScheduleData(testSched);

    const testAcc = {
      streak: 5,
      lastStreakDate: new Date().toISOString().split('T')[0],
      lastBriefedDate: new Date().toISOString().split('T')[0],
      checkIns: { morning: '08:30', midday: '13:00', evening: '20:00' },
      weeklyStats: { completed: 10, total: 12, rate: 83 },
      history: [],
    };
    saveAccountabilityData(testAcc);

    const scoreResult = calculateProductivityScore();
    assert(typeof scoreResult.score === 'number');
    assert(scoreResult.score >= 0 && scoreResult.score <= 100);
    assert(scoreResult.breakdown.goalProgress, 'Missing goalProgress in breakdown');
    assert(scoreResult.breakdown.consistencyStreak, 'Missing consistencyStreak in breakdown');
  });

  // -------------------------------------------------------------
  // Group 5: Privacy & Factual Integrity Rules
  // -------------------------------------------------------------
  console.log('\n--- Group 5: Privacy & Factual Integrity Rules ---');

  runTest('5.1 buildSystemInstruction enforces Factual Integrity (Never invent personal details)', () => {
    const prompt = buildSystemInstruction('boss', [], '');
    assert(prompt.includes('CRITICAL PRIVACY & FACTUAL INTEGRITY RULE:'), 'Missing privacy rule header');
    assert(prompt.includes('Never invent or assume personal details about me'), 'Missing anti-hallucination mandate');
    assert(prompt.includes('state clearly that you do not have that stored or ask for clarification'), 'Missing unknown state mandate');
  });

  runTest('5.2 buildManagerPersonaInstruction enforces Factual Integrity and injects memories', () => {
    const managerPrompt = buildManagerPersonaInstruction('boss', [], '', [], {}, undefined, [
      { category: 'habit', content: 'Prefers morning deep work' },
    ]);
    assert(managerPrompt.includes('CRITICAL PRIVACY & FACTUAL INTEGRITY RULE:'), 'Manager prompt missing privacy rule');
    assert(managerPrompt.includes('Never invent or assume personal details about me'), 'Manager prompt missing mandate');
    assert(managerPrompt.includes('[HABIT] Prefers morning deep work'), 'Manager prompt did not inject personal memory');
  });

  runTest('5.3 System instruction reflects dynamic memory bank contents', () => {
    // Current memory bank has 1 item from test 3.4
    const prompt = buildSystemInstruction('boss', [], '');
    assert(prompt.includes('I code best between 8am and 11am'), 'System instruction did not dynamically inject stored memory');
  });

  runTest('5.4 Empty memory handling states clearly unknown rather than hallucinating', () => {
    saveMemoriesData({ memories: [] });
    const emptyDirective = processLocalButlerDirective('what do you remember about me?', 'boss');
    assert(emptyDirective.reply.includes('I do not have any personal memories stored for you yet'), 'Empty reply should honestly acknowledge no memories stored');
  });

} finally {
  // Restore all original files
  if (originalMemories !== null) fs.writeFileSync(MEMORIES_FILE, originalMemories, 'utf8');
  if (originalGoals !== null) fs.writeFileSync(GOALS_FILE, originalGoals, 'utf8');
  if (originalCommitments !== null) fs.writeFileSync(COMMITMENTS_FILE, originalCommitments, 'utf8');
  if (originalSomeday !== null) fs.writeFileSync(SOMEDAY_FILE, originalSomeday, 'utf8');
  if (originalSchedule !== null) fs.writeFileSync(SCHEDULE_FILE, originalSchedule, 'utf8');
  if (originalAccountability !== null) fs.writeFileSync(ACCOUNTABILITY_FILE, originalAccountability, 'utf8');
  console.log('\n🧹 Restored original test data files.');
}

console.log('\n====================================================');
console.log(`📊 MILESTONE 4 RESULTS: ${passedTests}/${totalTests} Tests Passed`);
console.log('====================================================');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('🎉 ALL MILESTONE 4 TESTS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
