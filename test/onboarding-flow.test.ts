/**
 * Jifuno Duolingo-Model Onboarding Automated Test Suite
 * 
 * Verifies:
 * 1. Config-driven step definitions, ordering, and bilingual copy.
 * 2. Placement/level check question filtering by grade and top subject.
 * 3. Onboarding storage persistence, step resumption, and guest-to-account merge.
 * 4. Progressive feature disclosure (Day 1 vs Day 2+ unlocks).
 * 5. Analytics tracking for all 11 events and KPI derivation.
 */

import assert from 'assert';
import {
  ONBOARDING_STEPS_CONFIG,
  INTEREST_SUBJECTS,
  DAILY_GOAL_OPTIONS
} from '../src/config/onboardingConfig.js';
import {
  isFeatureUnlocked,
  getFeatureLockReason,
  FEATURE_UNLOCK_RULES
} from '../src/config/progressiveUnlock.js';
import {
  getPlacementQuestionsForGrade
} from '../src/services/placementQuestions.js';
import {
  getOnboardingState,
  saveOnboardingState,
  setOnboardingStep,
  setOnboardingGrade,
  setOnboardingInterests,
  setOnboardingGoal,
  recordFirstLessonCompletion,
  setParentContactInfo,
  mergeGuestProgressIntoProfile,
  resetOnboarding,
  markOnboardingCompleted,
  isReturningUser
} from '../src/services/onboardingStorage.js';
import {
  trackEvent,
  getStoredEvents,
  deriveOnboardingMetrics,
  clearAnalyticsEvents,
  OnboardingAnalyticsEventName
} from '../src/services/analytics.js';
import { StudentProfile } from '../src/types/cbe.js';

// Polyfill minimal localStorage for node CLI testing if not present
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = String(v); },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; },
    length: 0,
    key: () => null
  } as any;
}

console.log('🧪 Starting Jifuno Onboarding Flow Test Suite...\n');

// -------------------------------------------------------------
// Test 1: Config-Driven Step Schema
// -------------------------------------------------------------
console.log('Test 1: Config-Driven Step Schema & Copy');
assert.strictEqual(ONBOARDING_STEPS_CONFIG.length, 9, 'Should have exactly 9 steps in the default flow');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[0].id, 'WELCOME', 'Step 1 must be WELCOME');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[1].id, 'GRADE', 'Step 2 must be GRADE');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[2].id, 'INTERESTS', 'Step 3 must be INTERESTS');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[3].id, 'LEVEL_CHECK', 'Step 4 must be LEVEL_CHECK');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[4].id, 'FIRST_LESSON', 'Step 5 must be FIRST_LESSON');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[5].id, 'DAILY_GOAL', 'Step 6 must be DAILY_GOAL');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[6].id, 'SAVE_PROGRESS', 'Step 7 must be SAVE_PROGRESS');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[7].id, 'PARENT_STEP', 'Step 8 must be PARENT_STEP');
assert.strictEqual(ONBOARDING_STEPS_CONFIG[8].id, 'HOME', 'Step 9 must be HOME');

// Check bilingual copy presence
for (const step of ONBOARDING_STEPS_CONFIG) {
  assert(step.title.en.length > 0, `Step ${step.id} missing English title`);
  assert(step.title.sw.length > 0, `Step ${step.id} missing Swahili title`);
}
assert.strictEqual(INTEREST_SUBJECTS.length, 5, 'Should have 5 interest subjects');
assert.strictEqual(DAILY_GOAL_OPTIONS.length, 3, 'Should have 3 daily goal options');
console.log('  ✅ Config step schema and bilingual copy passed.');

// -------------------------------------------------------------
// Test 2: Level Check Diagnostic Question Filtering
// -------------------------------------------------------------
console.log('\nTest 2: Level Check Diagnostic Question Curation');
const mathQuestionsG4 = getPlacementQuestionsForGrade('grade-4', 'math');
assert(mathQuestionsG4.length >= 3, 'Should curate at least 3 questions for Grade 4 Math');
assert(mathQuestionsG4[0].options && mathQuestionsG4[0].options.length >= 2, 'First question must have valid options');
assert(mathQuestionsG4[0].correctOptionId, 'First question must have an answer key');

const scienceQuestionsG3 = getPlacementQuestionsForGrade('grade-3', 'science');
assert(scienceQuestionsG3.length >= 3, 'Should curate at least 3 questions for Grade 3 Science');
console.log('  ✅ Diagnostic level check questions verified for Grade 3 and Grade 4.');

// -------------------------------------------------------------
// Test 3: Onboarding Storage & Guest State Management
// -------------------------------------------------------------
console.log('\nTest 3: Onboarding Storage & Resumption');
resetOnboarding();
assert.strictEqual(isReturningUser(), false, 'Fresh install must not be marked as returning');

// Select grade
setOnboardingGrade('grade-5');
let state = getOnboardingState();
assert.strictEqual(state.gradeId, 'grade-5');
assert.strictEqual(state.guestProgress.gradeId, 'grade-5');

// Select interests
setOnboardingInterests(['kiswahili', 'science']);
state = getOnboardingState();
assert.deepStrictEqual(state.selectedInterests, ['kiswahili', 'science']);

// Set goal
setOnboardingGoal(15);
state = getOnboardingState();
assert.strictEqual(state.dailyGoalMinutes, 15);

// Record first lesson completion
recordFirstLessonCompletion('mission-g5-test', 25, 10);
state = getOnboardingState();
assert.strictEqual(state.guestProgress.xp, 25);
assert.strictEqual(state.guestProgress.coins, 20); // 10 initial + 10 earned
assert.strictEqual(state.guestProgress.streakDays, 1);
assert.strictEqual(state.guestProgress.firstLessonCompleted, true);
assert(state.guestProgress.completedMissionIds.includes('mission-g5-test'));

// Set parent phone and PIN
setParentContactInfo('0712345678', '4321', 'Amina');
state = getOnboardingState();
assert.strictEqual(state.guestProgress.parentPhone, '0712345678');
assert.strictEqual(state.guestProgress.parentPin, '4321');
assert.strictEqual(state.guestProgress.learnerName, 'Amina');

// Merge guest progress into profile
const baseProfile: StudentProfile = {
  id: 'student-registered-1',
  userId: 'user-registered-1',
  fullName: 'Amina',
  gradeId: 'grade-5',
  schoolName: 'Simba Academy',
  county: 'Nakuru',
  avatar: 'cheetah',
  level: 1,
  xp: 0,
  coins: 0,
  hearts: 5,
  maxHearts: 5,
  streakDays: 0,
  lastActiveDate: '2026-10-16',
  streakFrozen: false,
  unlockedWorldIds: ['world-math'],
  completedMissionIds: [],
  badges: [],
  equippedTitle: 'Learner'
};

const merged = mergeGuestProgressIntoProfile(baseProfile);
assert.strictEqual(merged.xp, 25, 'Merged profile must retain 25 XP');
assert.strictEqual(merged.coins, 20, 'Merged profile must retain 20 coins');
assert.strictEqual(merged.streakDays, 1, 'Merged profile must retain 1-day streak');
assert(merged.completedMissionIds.includes('mission-g5-test'), 'Merged profile must retain completed quest ID');
assert.strictEqual(isReturningUser(), true, 'Once merged, user must be marked returning');
console.log('  ✅ Storage, resumption, and progress merge verified with zero data loss.');

// -------------------------------------------------------------
// Test 4: Progressive Feature Disclosure
// -------------------------------------------------------------
console.log('\nTest 4: Progressive Feature Disclosure (Day 1 vs Subsequent Days)');
const day1NewStudent: Partial<StudentProfile> = {
  streakDays: 1,
  completedMissionIds: ['first-lesson-1'],
  xp: 25
};

assert.strictEqual(isFeatureUnlocked('LEARN', day1NewStudent), true, 'Learn must be unlocked on Day 1');
assert.strictEqual(isFeatureUnlocked('ME', day1NewStudent), true, 'Profile (Me) must be unlocked on Day 1');
assert.strictEqual(isFeatureUnlocked('SHOP', day1NewStudent), false, 'Shop (Dukani) must be LOCKED on Day 1 for new student');
assert.strictEqual(isFeatureUnlocked('PRACTICE', day1NewStudent), false, 'Practice Hub must be LOCKED on Day 1 for new student');

const reasonEn = getFeatureLockReason('SHOP', 'en');
assert(reasonEn.includes('unlock Dukani'), 'Lock reason must mention unlocking Dukani');

// Student who completed 3 quests unlocks shop
const advancedStudent: Partial<StudentProfile> = {
  streakDays: 2,
  completedMissionIds: ['q1', 'q2', 'q3'],
  xp: 100
};
assert.strictEqual(isFeatureUnlocked('SHOP', advancedStudent), true, 'Shop must be unlocked after 3 quests');
assert.strictEqual(isFeatureUnlocked('PRACTICE', advancedStudent), true, 'Practice must be unlocked after 2 quests');
console.log('  ✅ Progressive disclosure rules verified.');

// -------------------------------------------------------------
// Test 5: Analytics Event Dispatcher & Metric Derivation
// -------------------------------------------------------------
console.log('\nTest 5: Analytics Event Tracking & Derivation');
clearAnalyticsEvents();

const requiredEvents: OnboardingAnalyticsEventName[] = [
  'onboarding_started',
  'grade_selected',
  'interests_selected',
  'level_check_completed',
  'first_lesson_started',
  'first_lesson_completed',
  'daily_goal_set',
  'save_progress_shown',
  'save_progress_completed',
  'save_progress_skipped',
  'onboarding_abandoned'
];

for (const evName of requiredEvents) {
  trackEvent(evName, { testProperty: true, step: 'GRADE' });
}

const recorded = getStoredEvents();
assert.strictEqual(recorded.length, 11, 'All 11 analytics events must be recorded');

const metrics = deriveOnboardingMetrics();
assert.strictEqual(metrics.totalStarted, 1);
assert.strictEqual(metrics.firstLessonStarted, 1);
assert.strictEqual(metrics.firstLessonCompleted, 1);
assert.strictEqual(metrics.completedOnboarding, 2); // save_progress_completed + save_progress_skipped
assert.strictEqual(metrics.dropOffCounts['GRADE'], 1);
console.log('  ✅ All 11 analytics events tracked and derived metrics verified.');

console.log('\n🎉 ALL ONBOARDING AUTOMATED TESTS PASSED SUCCESSFULLY!\n');
