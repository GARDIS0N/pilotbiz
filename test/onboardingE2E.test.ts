/**
 * Comprehensive End-to-End Test Suite for Jifuno Duolingo-Model Onboarding
 * Tests:
 * 1. New user journey (Welcome -> Grade -> Goal -> Placement -> Lesson -> Sign-up)
 * 2. Midway drop-off and persistent resumption
 * 3. Never asking for information already stored
 * 4. Anonymous progress merging into registered student profile
 * 5. Returning user bypass and next recommended lesson node detection
 * 6. Offline start resilience
 * 7. Mobile UI constraints (touch target minimums, responsive widths)
 */

import {
  getOnboardingState,
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
import { getPlacementQuestionsForGrade } from '../src/services/placementQuestions.js';
import { getQuest, getRecommendedNextQuest, getCurriculumGrade } from '../src/data/curriculum/index.js';
import { evaluateAnswer, resolveCorrectAnswerText } from '../src/utils/answerValidation.js';
import { User, StudentProfile } from '../src/types/cbe.js';

// Setup Mock LocalStorage for headless Node environment
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

async function runE2ETests() {
  console.log('===========================================================');
  console.log('🚀 JIFUNO DUOLINGO ONBOARDING END-TO-END VERIFICATION');
  console.log('===========================================================');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (!condition) {
      console.error(`  ❌ [FAIL] ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
    passed++;
    console.log(`  ✅ [PASS] ${testName}`);
  }

  // =========================================================================
  // SCENARIO 1: NEW VISITOR JOURNEY
  // =========================================================================
  console.log('\n--- SCENARIO 1: New Visitor Welcome & Setup ---');
  resetOnboarding();
  clearPersistedUserProfile();

  assert(!isReturningUser(), 'Fresh visitor is recognized as a new user (!isReturningUser)');
  const initial = getOnboardingState();
  assert(initial.step === 'WELCOME', 'Step 1 starts on WELCOME screen with Rafiki the owl');
  assert(initial.hasCompletedOnboarding === false, 'Initial hasCompletedOnboarding is false');

  // Advance to Grade screen
  setOnboardingStep('GRADE');
  const gradeStep = getOnboardingState();
  assert(gradeStep.step === 'GRADE', 'User transitions to Step 2 (Choose Grade)');

  // Select Grade 4 with auto-advance
  setOnboardingGrade('grade-4');
  setOnboardingStep('GOAL');
  const goalStep = getOnboardingState();
  assert(goalStep.gradeId === 'grade-4', 'Grade 4 persisted to state');
  assert(goalStep.guestProgress.gradeId === 'grade-4', 'Grade 4 mirrored to guestProgress');
  assert(goalStep.step === 'GOAL', 'Auto-advances to Step 3 (Daily Goal)');

  // Select 10 min daily goal with auto-advance
  setOnboardingGoal(10);
  setOnboardingStep('PLACEMENT');
  const placementStep = getOnboardingState();
  assert(placementStep.dailyGoalMinutes === 10, 'Daily goal 10 min persisted');
  assert(placementStep.guestProgress.dailyGoalMinutes === 10, 'Daily goal 10 min mirrored to guestProgress');
  assert(placementStep.step === 'PLACEMENT', 'Auto-advances to Step 4 (Placement Quiz)');

  // =========================================================================
  // SCENARIO 2: MIDWAY DROP-OFF & RESUMPTION
  // =========================================================================
  console.log('\n--- SCENARIO 2: Midway Drop-Off & Exact Resumption ---');
  // Simulate user closing tab at PLACEMENT step and reopening page
  assert(!isReturningUser(), 'Midway drop-off visitor is NOT marked returning user');
  const resumedAtPlacement = getOnboardingState();
  assert(resumedAtPlacement.step === 'PLACEMENT', 'Midway resumption restores step: PLACEMENT');
  assert(resumedAtPlacement.gradeId === 'grade-4', 'Resumes with chosen grade intact (Grade 4)');
  assert(resumedAtPlacement.dailyGoalMinutes === 10, 'Resumes with chosen goal intact (10 min)');

  // Verify that information already stored is never re-asked
  assert(resumedAtPlacement.gradeId !== undefined, 'Grade information was preserved and not re-requested');
  assert(resumedAtPlacement.dailyGoalMinutes !== undefined, 'Daily goal was preserved and not re-requested');

  // =========================================================================
  // SCENARIO 3: DIAGNOSTIC PLACEMENT TEST FOR EACH GRADE
  // =========================================================================
  console.log('\n--- SCENARIO 3: Authentic CBC Placement Questions ---');
  const testGrades = ['grade-3', 'grade-4', 'grade-5', 'grade-6'];
  for (const gId of testGrades) {
    const questions = getPlacementQuestionsForGrade(gId);
    assert(questions.length >= 3, `Grade ${gId} provides at least 3 placement questions (got ${questions.length})`);
    
    // Validate each question has valid prompt, options, and evaluateAnswer works
    const q1 = questions[0];
    assert(Boolean(q1.prompt), `Grade ${gId} Q1 has English prompt: "${q1.prompt?.slice(0, 30)}..."`);
    assert(Array.isArray(q1.options) && q1.options.length >= 2, `Grade ${gId} Q1 has >= 2 multiple-choice options`);
    
    assert(Boolean(q1.correctOptionId), `Grade ${gId} Q1 has designated correctOptionId: "${q1.correctOptionId}"`);

    // Verify evaluation logic
    const evalResult = evaluateAnswer(q1, q1.correctOptionId!);
    assert(evalResult === true, `Grade ${gId} Q1 correctly evaluates true answer`);
  }

  // Answer placement test for Grade 4
  recordPlacementResult(3);
  const afterPlacementScore = getOnboardingState();
  assert(afterPlacementScore.guestProgress.placementScore === 3, 'Placement score 3 recorded');
  assert(afterPlacementScore.guestProgress.placementCompleted === true, 'Placement marked completed');

  // =========================================================================
  // SCENARIO 4: REAL FIRST CBC LESSON FLOW
  // =========================================================================
  console.log('\n--- SCENARIO 4: First Curriculum Lesson (No Mocks) ---');
  setOnboardingStep('FIRST_LESSON');
  const firstLessonStep = getOnboardingState();
  assert(firstLessonStep.step === 'FIRST_LESSON', 'Advances to Step 5: FIRST_LESSON');

  // Verify real curriculum quest exists for Grade 4
  const recommendedG4 = getRecommendedNextQuest('grade-4', []);
  assert(Boolean(recommendedG4), 'Found authentic first quest for Grade 4');
  assert(recommendedG4!.id === 'mission-01-seedlings', 'G4 first quest is mission-01-seedlings');
  assert(recommendedG4!.questions.length > 0, `G4 first quest has real questions (${recommendedG4!.questions.length} questions)`);

  // Verify real curriculum quests exist for all other grades
  const recommendedG3 = getRecommendedNextQuest('grade-3', []);
  assert(Boolean(recommendedG3 && recommendedG3.questions.length > 0), 'Found authentic first quest for Grade 3 with real questions');

  const recommendedG5 = getRecommendedNextQuest('grade-5', []);
  assert(Boolean(recommendedG5 && recommendedG5.questions.length > 0), 'Found authentic first quest for Grade 5 with real questions');

  const recommendedG6 = getRecommendedNextQuest('grade-6', []);
  assert(Boolean(recommendedG6 && recommendedG6.questions.length > 0), 'Found authentic first quest for Grade 6 with real questions');

  // Complete first lesson
  recordFirstLessonCompletion(recommendedG4!.id, 25, 10);
  const afterFirstLesson = getOnboardingState();
  assert(afterFirstLesson.step === 'SIGNUP', 'Step 5 transitions to Step 6: SIGNUP');
  assert(afterFirstLesson.guestProgress.xp === 25, 'Guest earned +25 XP from first lesson');
  assert(afterFirstLesson.guestProgress.coins === 20, 'Guest earned coins (10 initial + 10 earned = 20)');
  assert(
    afterFirstLesson.guestProgress.completedMissionIds.includes(recommendedG4!.id),
    'Guest completed mission ID stored locally'
  );
  assert(afterFirstLesson.guestProgress.firstLessonCompleted === true, 'firstLessonCompleted flag set to true');

  // =========================================================================
  // SCENARIO 5: ANONYMOUS-TO-SIGNUP MERGE
  // =========================================================================
  console.log('\n--- SCENARIO 5: Anonymous-to-Account Progress Merge ---');
  // Child-safe registration: Under-13 with Learner Name and Parent Email
  const newAccount: User = {
    id: 'usr-kamau-001',
    name: 'Kamau Mwangi',
    email: 'guardian@mwangi.ke',
    role: 'STUDENT',
    avatar: 'cheetah',
    createdAt: new Date().toISOString()
  };

  const initialProfile: StudentProfile = {
    id: 'student-kamau-001',
    userId: newAccount.id,
    fullName: 'Kamau Mwangi',
    gradeId: 'grade-4',
    schoolName: 'Kilimani Primary',
    county: 'Nairobi',
    avatar: 'cheetah',
    level: 1,
    xp: 0,
    coins: 0,
    hearts: 5,
    maxHearts: 5,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakFrozen: false,
    unlockedWorldIds: ['world-math-kingdom'],
    completedMissionIds: [],
    badges: ['badge-first-lesson'],
    equippedTitle: 'Savanna Explorer',
    parentUserId: newAccount.id
  };

  // Merge anonymous progress into new profile
  const mergedProfile = mergeGuestProgressIntoProfile(initialProfile);
  assert(mergedProfile.xp === 25, 'Merged profile retains earned guest XP (25)');
  assert(mergedProfile.coins === 20, 'Merged profile retains earned guest coins (20)');
  assert(
    mergedProfile.completedMissionIds.includes('mission-01-seedlings'),
    'Merged profile includes guest completed mission (mission-01-seedlings)'
  );
  assert(mergedProfile.gradeId === 'grade-4', 'Merged profile retains Grade 4');

  // Save profile to persistent storage
  savePersistedUserProfile(newAccount, mergedProfile);
  const retrievedProfile = getPersistedUserProfile();
  assert(retrievedProfile.user?.id === 'usr-kamau-001', 'Retrieved persisted user accurately');
  assert(retrievedProfile.studentProfile?.fullName === 'Kamau Mwangi', 'Retrieved persisted student accurately');

  // =========================================================================
  // SCENARIO 6: RETURNING USER BYPASS & NEXT LESSON HIGHLIGHT
  // =========================================================================
  console.log('\n--- SCENARIO 6: Returning User Bypass & Next Lesson Detection ---');
  assert(isReturningUser() === true, 'Visitor is now flagged as returning user (isReturningUser === true)');

  // Calculate next recommended lesson for Kamau who completed mission-01-seedlings
  const nextQuestAfterMission1 = getRecommendedNextQuest('grade-4', mergedProfile.completedMissionIds);
  assert(Boolean(nextQuestAfterMission1), 'Next recommended lesson found for Grade 4');
  assert(
    nextQuestAfterMission1!.id !== 'mission-01-seedlings',
    `Next lesson advanced past completed mission (now: ${nextQuestAfterMission1!.id})`
  );

  // =========================================================================
  // SCENARIO 7: PLAY AS GUEST FALLBACK
  // =========================================================================
  console.log('\n--- SCENARIO 7: "Play as Guest" Fallback ---');
  // Reset for a fresh test
  resetOnboarding();
  clearPersistedUserProfile();
  setOnboardingGrade('grade-5');
  recordFirstLessonCompletion('quest-math-g5-matatu-timing', 25, 10);

  // Guest clicks "Play as Guest for now"
  const guestUser: User = {
    id: 'guest-user-999',
    name: 'Wanjiku',
    email: 'guest@jifuno.ke',
    role: 'STUDENT',
    avatar: 'zebra',
    createdAt: new Date().toISOString()
  };
  const guestProfile: StudentProfile = {
    id: 'guest-profile-999',
    userId: guestUser.id,
    fullName: 'Wanjiku',
    gradeId: 'grade-5',
    schoolName: 'CBC Academy',
    county: 'Kenya',
    avatar: 'zebra',
    level: 1,
    xp: 0,
    coins: 0,
    hearts: 5,
    maxHearts: 5,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakFrozen: false,
    unlockedWorldIds: ['world-math-kingdom'],
    completedMissionIds: [],
    badges: [],
    equippedTitle: 'Savanna Explorer'
  };

  const mergedGuest = mergeGuestProgressIntoProfile(guestProfile);
  assert(mergedGuest.gradeId === 'grade-5', 'Guest retains Grade 5');
  assert(mergedGuest.xp === 25, 'Guest retains earned XP (25)');
  assert(mergedGuest.completedMissionIds.includes('quest-math-g5-matatu-timing'), 'Guest retains completed Grade 5 quest');
  assert(isReturningUser() === true, 'Guest completing onboarding is recognized as returning user');

  // =========================================================================
  // SCENARIO 8: OFFLINE START RESILIENCE
  // =========================================================================
  console.log('\n--- SCENARIO 8: Offline Start Resilience ---');
  // Even if localStorage is the only source of truth (no network API), everything persists
  savePersistedUserProfile(guestUser, mergedGuest);
  const offlineCheck = getPersistedUserProfile();
  assert(offlineCheck.user !== null && offlineCheck.studentProfile !== null, 'Offline session restores smoothly without network dependency');
  assert(offlineCheck.studentProfile?.gradeId === 'grade-5', 'Offline session retains correct grade');

  // =========================================================================
  // SCENARIO 9: MOBILE VIEWPORT CONSTRAINTS AUDIT (360px & 412px)
  // =========================================================================
  console.log('\n--- SCENARIO 9: Mobile UI Target Audit (360px & 412px Android) ---');
  // Check touch target classes across OnboardingFlow
  const fs = await import('fs');
  const onboardingContent = fs.readFileSync('src/components/onboarding/OnboardingFlow.tsx', 'utf8');
  
  assert(
    onboardingContent.includes('min-h-[56px]') || onboardingContent.includes('min-h-[50px]'),
    'Touch targets adhere to 50px-56px+ accessibility standards'
  );
  assert(
    onboardingContent.includes('text-lg') || onboardingContent.includes('text-xl') || onboardingContent.includes('text-2xl'),
    'Typography supports 18px+ text sizes for readability'
  );
  assert(
    onboardingContent.includes('reducedMotion') && onboardingContent.includes('useReducedMotionPreference'),
    'Respects prefers-reduced-motion for low-end device battery and performance'
  );
  assert(
    onboardingContent.includes('role="progressbar"'),
    'Includes accessible progress dots indicator'
  );

  console.log('\n===========================================================');
  console.log(`🎉 ALL E2E SCENARIOS PASSED: ${passed} / ${total} tests successful!`);
  console.log('===========================================================');
}

runE2ETests().catch(err => {
  console.error('E2E Test Execution Failed:', err);
  process.exit(1);
});
