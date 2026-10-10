import {
  getOnboardingState,
  saveOnboardingState,
  setOnboardingStep,
  setOnboardingGrade,
  setOnboardingGoal,
  recordPlacementResult,
  recordFirstLessonCompletion,
  markOnboardingCompleted,
  isReturningUser,
  resetOnboarding,
  mergeGuestProgressIntoProfile,
  getPersistedUserProfile,
  savePersistedUserProfile,
  clearPersistedUserProfile
} from '../src/services/onboardingStorage.js';
import { User, StudentProfile } from '../src/types/cbe.js';

// Mock localStorage in Node environment if not present
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    length: 0
  } as any;
}

function runTests() {
  console.log('===========================================================');
  console.log('🧪 RUNNING ONBOARDING STORAGE TEST SUITE');
  console.log('===========================================================');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, message: string) {
    total++;
    if (!condition) {
      console.error(`  ❌ [FAIL] ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
    passed++;
    console.log(`  ✓ ${message}`);
  }

  // 1. Fresh state
  resetOnboarding();
  const fresh = getOnboardingState();
  assert(fresh.step === 'WELCOME', 'Fresh state starts at WELCOME step');
  assert(fresh.hasCompletedOnboarding === false, 'Fresh state hasCompletedOnboarding is false');
  assert(!isReturningUser(), 'Fresh visitor is not flagged as returning user');

  // 2. Set grade
  setOnboardingGrade('grade-3');
  const afterGrade = getOnboardingState();
  assert(afterGrade.gradeId === 'grade-3', 'Grade updated to grade-3');
  assert(afterGrade.guestProgress.gradeId === 'grade-3', 'Guest progress gradeId updated to grade-3');

  // 3. Set goal
  setOnboardingGoal(15);
  const afterGoal = getOnboardingState();
  assert(afterGoal.dailyGoalMinutes === 15, 'Goal updated to 15 minutes');
  assert(afterGoal.guestProgress.dailyGoalMinutes === 15, 'Guest progress goal updated to 15 minutes');

  // 4. Set step to PLACEMENT
  setOnboardingStep('PLACEMENT');
  const afterStep = getOnboardingState();
  assert(afterStep.step === 'PLACEMENT', 'Step persisted as PLACEMENT');

  // 5. Record placement score
  recordPlacementResult(4);
  const afterPlacement = getOnboardingState();
  assert(afterPlacement.guestProgress.placementScore === 4, 'Placement score recorded as 4');
  assert(afterPlacement.guestProgress.placementCompleted === true, 'Placement marked completed');

  // 6. Record first lesson completion
  recordFirstLessonCompletion('quest-math-g3-mango-stand', 30, 15);
  const afterLesson = getOnboardingState();
  assert(afterLesson.step === 'SIGNUP', 'Step automatically transitions to SIGNUP after lesson');
  assert(afterLesson.guestProgress.xp === 30, 'Guest XP accumulated (30 XP)');
  assert(afterLesson.guestProgress.coins === 25, 'Guest Coins accumulated (10 initial + 15 = 25)');
  assert(
    afterLesson.guestProgress.completedMissionIds.includes('quest-math-g3-mango-stand'),
    'Completed quest ID stored in guest progress'
  );

  // 7. Midway quit & resumption test
  // Re-reading state without modification reproduces a page reload
  const resumed = getOnboardingState();
  assert(resumed.step === 'SIGNUP', 'Midway resumption restores exact step (SIGNUP)');
  assert(resumed.gradeId === 'grade-3', 'Midway resumption retains selected grade (grade-3)');
  assert(resumed.dailyGoalMinutes === 15, 'Midway resumption retains selected goal (15 min)');
  assert(resumed.guestProgress.xp === 30, 'Midway resumption retains earned lesson XP (30)');

  // 8. Merging guest progress into newly created student profile
  const baseStudent: StudentProfile = {
    id: 'student-new-001',
    userId: 'user-new-001',
    fullName: 'Zawadi Wanjiku',
    gradeId: 'grade-3',
    schoolName: 'Maji Mazuri Academy',
    county: 'Nyeri',
    avatar: 'zebra',
    level: 1,
    xp: 0,
    coins: 0,
    hearts: 5,
    maxHearts: 5,
    streakDays: 1,
    lastActiveDate: '2026-10-10',
    streakFrozen: false,
    unlockedWorldIds: ['world-math-kingdom'],
    completedMissionIds: [],
    badges: [],
    equippedTitle: 'Savanna Explorer'
  };

  const merged = mergeGuestProgressIntoProfile(baseStudent);
  assert(merged.xp === 30, 'Merged student profile received guest XP (30)');
  assert(merged.coins === 25, 'Merged student profile received guest Coins (25)');
  assert(
    merged.completedMissionIds.includes('quest-math-g3-mango-stand'),
    'Merged student profile received completed quest from guest progress'
  );
  assert(merged.gradeId === 'grade-3', 'Merged student profile retained grade-3');

  // 9. Returning user check after completion
  assert(isReturningUser() === true, 'User is now recognized as returning user');
  const completedState = getOnboardingState();
  assert(completedState.hasCompletedOnboarding === true, 'Onboarding state hasCompletedOnboarding is true');
  assert(completedState.step === 'COMPLETED', 'Step is marked COMPLETED');

  // 10. User profile persistence test
  const testUser: User = {
    id: 'user-persist-01',
    name: 'Zawadi Wanjiku',
    email: 'parent@wanjiku.ke',
    role: 'STUDENT',
    avatar: 'zebra',
    createdAt: '2026-10-10T12:00:00Z'
  };
  savePersistedUserProfile(testUser, merged);
  const retrieved = getPersistedUserProfile();
  assert(retrieved.user?.id === 'user-persist-01', 'Persisted user ID correctly retrieved');
  assert(retrieved.studentProfile?.fullName === 'Zawadi Wanjiku', 'Persisted student name correctly retrieved');
  assert(retrieved.studentProfile?.xp === 30, 'Persisted student XP correctly retrieved');
  clearPersistedUserProfile();
  const cleared = getPersistedUserProfile();
  assert(cleared.user === null && cleared.studentProfile === null, 'Persisted user profile correctly cleared');

  // 11. Reset test
  resetOnboarding();
  assert(!isReturningUser(), 'Reset properly clears onboarding returning flag');

  console.log('===========================================================');
  console.log(`SUMMARY: ${passed} / ${total} onboarding storage tests passed.`);
  console.log('✅ ALL ONBOARDING STORAGE TESTS PASSED WITH 100% SUCCESS!');
  console.log('===========================================================');
}

runTests();
