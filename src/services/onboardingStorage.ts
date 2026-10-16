/**
 * Jifuno Duolingo-Model Onboarding Storage Service
 * Manages guest state, persistent step resumption, offline caching,
 * and seamless anonymous-to-account progress merging.
 */

import { User, StudentProfile } from '../types/cbe.js';
import { OnboardingStepId } from '../config/onboardingConfig.js';

export type OnboardingStep =
  | 'WELCOME'
  | 'GRADE'
  | 'INTERESTS'
  | 'LEVEL_CHECK'
  | 'FIRST_LESSON'
  | 'DAILY_GOAL'
  | 'SAVE_PROGRESS'
  | 'PARENT_STEP'
  | 'HOME'
  | 'COMPLETED'
  | 'GOAL'
  | 'PLACEMENT'
  | 'SIGNUP';

export interface AnonymousStudentProgress {
  gradeId: string;
  selectedInterests: string[];
  dailyGoalMinutes: number;
  xp: number;
  coins: number;
  hearts: number;
  streakDays: number;
  completedMissionIds: string[];
  placementScore?: number;
  placementCompleted?: boolean;
  firstLessonCompleted?: boolean;
  parentPhone?: string;
  parentPin?: string;
  learnerName?: string;
  religiousStream?: 'CRE' | 'IRE' | 'HRE';
}

export interface OnboardingState {
  step: OnboardingStep;
  gradeId: string;
  selectedInterests: string[];
  dailyGoalMinutes: number;
  religiousStream?: 'CRE' | 'IRE' | 'HRE';
  guestProgress: AnonymousStudentProgress;
  hasCompletedOnboarding: boolean;
  anonymousUserId: string;
  startedAt: string;
  lastUpdated: string;
}

const STORAGE_KEY = 'jifuno_onboarding_state';
const COMPLETED_FLAG_KEY = 'jifuno_onboarding_completed';

export const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  step: 'WELCOME',
  gradeId: 'grade-4',
  selectedInterests: ['math', 'science'],
  dailyGoalMinutes: 10,
  religiousStream: 'CRE',
  guestProgress: {
    gradeId: 'grade-4',
    selectedInterests: ['math', 'science'],
    dailyGoalMinutes: 10,
    xp: 0,
    coins: 10,
    hearts: 5,
    streakDays: 0,
    completedMissionIds: [],
    placementScore: 0,
    placementCompleted: false,
    firstLessonCompleted: false,
    religiousStream: 'CRE'
  },
  hasCompletedOnboarding: false,
  anonymousUserId: `guest-${Date.now()}`,
  startedAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString()
};

/**
 * Normalizes legacy step keys to current step IDs.
 */
function normalizeStep(rawStep?: string): OnboardingStep {
  if (!rawStep) return 'WELCOME';
  if (rawStep === 'GOAL') return 'DAILY_GOAL';
  if (rawStep === 'PLACEMENT') return 'LEVEL_CHECK';
  if (rawStep === 'SIGNUP') return 'SAVE_PROGRESS';
  return rawStep as OnboardingStep;
}

/**
 * Retrieves the current persisted onboarding state.
 * Returns default initial state if no state is saved.
 */
export function getOnboardingState(): OnboardingState {
  try {
    const completedFlag = localStorage.getItem(COMPLETED_FLAG_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OnboardingState>;
      const step = normalizeStep(parsed.step);

      return {
        ...DEFAULT_ONBOARDING_STATE,
        ...parsed,
        step,
        selectedInterests: parsed.selectedInterests || parsed.guestProgress?.selectedInterests || DEFAULT_ONBOARDING_STATE.selectedInterests,
        hasCompletedOnboarding: completedFlag === 'true' || Boolean(parsed.hasCompletedOnboarding),
        guestProgress: {
          ...DEFAULT_ONBOARDING_STATE.guestProgress,
          ...(parsed.guestProgress || {}),
          selectedInterests: parsed.guestProgress?.selectedInterests || parsed.selectedInterests || DEFAULT_ONBOARDING_STATE.guestProgress.selectedInterests
        }
      };
    }

    if (completedFlag === 'true') {
      return {
        ...DEFAULT_ONBOARDING_STATE,
        step: 'COMPLETED',
        hasCompletedOnboarding: true
      };
    }
  } catch (err) {
    console.warn('[OnboardingStorage] Error reading state:', err);
  }

  return { ...DEFAULT_ONBOARDING_STATE };
}

/**
 * Persists partial updates to the onboarding state.
 */
export function saveOnboardingState(updates: Partial<OnboardingState>): OnboardingState {
  try {
    const current = getOnboardingState();
    const next: OnboardingState = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
      selectedInterests: updates.selectedInterests || updates.guestProgress?.selectedInterests || current.selectedInterests,
      guestProgress: {
        ...current.guestProgress,
        ...(updates.guestProgress || {}),
        gradeId: updates.gradeId || updates.guestProgress?.gradeId || current.guestProgress.gradeId,
        selectedInterests: updates.selectedInterests || updates.guestProgress?.selectedInterests || current.guestProgress.selectedInterests,
        dailyGoalMinutes: updates.dailyGoalMinutes || updates.guestProgress?.dailyGoalMinutes || current.guestProgress.dailyGoalMinutes
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    if (next.hasCompletedOnboarding || next.step === 'COMPLETED') {
      localStorage.setItem(COMPLETED_FLAG_KEY, 'true');
    }

    return next;
  } catch (err) {
    console.warn('[OnboardingStorage] Error saving state:', err);
    return { ...DEFAULT_ONBOARDING_STATE, ...updates };
  }
}

/**
 * Advances or sets the current onboarding step.
 */
export function setOnboardingStep(step: OnboardingStepId | OnboardingStep): OnboardingState {
  return saveOnboardingState({ step: normalizeStep(step) });
}

/**
 * Sets the selected grade and syncs to guest progress.
 */
export function setOnboardingGrade(gradeId: string): OnboardingState {
  const current = getOnboardingState();
  return saveOnboardingState({
    gradeId,
    guestProgress: {
      ...current.guestProgress,
      gradeId
    }
  });
}

/**
 * Sets selected interests / subjects.
 */
export function setOnboardingInterests(selectedInterests: string[]): OnboardingState {
  const current = getOnboardingState();
  return saveOnboardingState({
    selectedInterests,
    guestProgress: {
      ...current.guestProgress,
      selectedInterests
    }
  });
}

/**
 * Sets the daily learning goal in minutes.
 */
export function setOnboardingGoal(minutes: number): OnboardingState {
  const current = getOnboardingState();
  try {
    localStorage.setItem('jifuno_daily_goal_minutes', String(minutes));
  } catch (_) {}

  return saveOnboardingState({
    dailyGoalMinutes: minutes,
    guestProgress: {
      ...current.guestProgress,
      dailyGoalMinutes: minutes
    }
  });
}

/**
 * Sets the chosen Religious Education stream (CRE, IRE, or HRE).
 */
export function setOnboardingReligiousStream(stream: 'CRE' | 'IRE' | 'HRE'): OnboardingState {
  const current = getOnboardingState();
  return saveOnboardingState({
    religiousStream: stream,
    guestProgress: {
      ...current.guestProgress,
      religiousStream: stream
    }
  });
}

/**
 * Records placement quiz results.
 */
export function recordPlacementResult(score: number): OnboardingState {
  const current = getOnboardingState();
  return saveOnboardingState({
    guestProgress: {
      ...current.guestProgress,
      placementScore: score,
      placementCompleted: true
    }
  });
}

/**
 * Records completion of the first real lesson (XP, Coins, streak, and Mission ID).
 */
export function recordFirstLessonCompletion(
  missionId: string,
  earnedXp: number = 25,
  earnedCoins: number = 10
): OnboardingState {
  const current = getOnboardingState();
  const currentCompleted = current.guestProgress.completedMissionIds || [];
  const updatedMissions = currentCompleted.includes(missionId)
    ? currentCompleted
    : [...currentCompleted, missionId];

  return saveOnboardingState({
    guestProgress: {
      ...current.guestProgress,
      xp: (current.guestProgress.xp || 0) + earnedXp,
      coins: (current.guestProgress.coins || 0) + earnedCoins,
      streakDays: Math.max(1, current.guestProgress.streakDays || 1),
      completedMissionIds: updatedMissions,
      firstLessonCompleted: true
    }
  });
}

/**
 * Stores parent phone and 4-digit PIN for guardian handoff.
 */
export function setParentContactInfo(
  parentPhone: string,
  parentPin: string,
  learnerName?: string
): OnboardingState {
  const current = getOnboardingState();
  return saveOnboardingState({
    guestProgress: {
      ...current.guestProgress,
      parentPhone,
      parentPin,
      learnerName: learnerName || current.guestProgress.learnerName
    }
  });
}

/**
 * Marks onboarding as completely finished.
 */
export function markOnboardingCompleted(): void {
  try {
    localStorage.setItem(COMPLETED_FLAG_KEY, 'true');
    saveOnboardingState({
      step: 'COMPLETED',
      hasCompletedOnboarding: true
    });
  } catch (err) {
    console.warn('[OnboardingStorage] Error marking completed:', err);
  }
}

/**
 * Checks whether the user is a returning user who should bypass onboarding.
 */
export function isReturningUser(): boolean {
  try {
    if (localStorage.getItem(COMPLETED_FLAG_KEY) === 'true') {
      return true;
    }
    const state = getOnboardingState();
    return Boolean(state.hasCompletedOnboarding || state.step === 'COMPLETED');
  } catch {
    return false;
  }
}

/**
 * Resets onboarding state (useful for testing or switching profiles).
 */
export function resetOnboarding(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(COMPLETED_FLAG_KEY);
  } catch (_) {}
}

/**
 * Merges anonymous guest progress (earned XP, coins, streak, completed quest IDs)
 * into a registered StudentProfile.
 */
export function mergeGuestProgressIntoProfile(student: StudentProfile): StudentProfile {
  const state = getOnboardingState();
  const guest = state.guestProgress;

  const mergedMissions = Array.from(
    new Set([...(student.completedMissionIds || []), ...(guest.completedMissionIds || [])])
  );

  const mergedStudent: StudentProfile = {
    ...student,
    gradeId: guest.gradeId || student.gradeId,
    xp: (student.xp || 0) + (guest.xp || 0),
    coins: (student.coins || 0) + (guest.coins || 0),
    streakDays: Math.max(student.streakDays || 0, guest.streakDays || (guest.firstLessonCompleted ? 1 : 0)),
    completedMissionIds: mergedMissions,
    hearts: Math.min(5, guest.hearts ?? student.hearts ?? 5),
    religiousStream: guest.religiousStream || state.religiousStream || student.religiousStream || 'CRE'
  };

  // Mark onboarding complete so returning visits bypass the onboarding flow
  markOnboardingCompleted();

  return mergedStudent;
}

const USER_STORAGE_KEY = 'jifuno_current_user';
const PROFILE_STORAGE_KEY = 'jifuno_current_student';

/**
 * Retrieves the currently persisted user and student profile from localStorage.
 */
export function getPersistedUserProfile(): { user: User | null; studentProfile: StudentProfile | null } {
  try {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY);
    const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const user = rawUser ? (JSON.parse(rawUser) as User) : null;
    const studentProfile = rawProfile ? (JSON.parse(rawProfile) as StudentProfile) : null;
    return { user, studentProfile };
  } catch (err) {
    console.warn('[OnboardingStorage] Error retrieving persisted profile:', err);
    return { user: null, studentProfile: null };
  }
}

/**
 * Saves active user and student profile to localStorage for instant reload restoration.
 */
export function savePersistedUserProfile(user: User, studentProfile?: StudentProfile | null): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    if (studentProfile) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(studentProfile));
    } else {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('[OnboardingStorage] Error saving persisted profile:', err);
  }
}

/**
 * Clears persisted user and student profile from localStorage upon logout or reset.
 */
export function clearPersistedUserProfile(): void {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (_) {}
}
