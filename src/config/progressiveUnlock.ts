/**
 * Jifuno Progressive Feature Disclosure Configuration
 * 
 * To prevent overwhelming young learners (ages 8-12) on Day 1,
 * secondary features like Dukani (Shop), Practice Hub, and Leaderboards
 * are locked on Day 1 and gradually revealed as the child progresses.
 */

import { StudentProfile } from '../types/cbe.js';

export type AppFeature = 'LEARN' | 'ME' | 'PRACTICE' | 'SHOP' | 'LEADERBOARD' | 'FRIENDS';

export interface FeatureUnlockRule {
  feature: AppFeature;
  minimumDaysActive: number;
  minimumCompletedMissions: number;
  minimumXp: number;
  titleEn: string;
  titleSw: string;
  lockedMessageEn: string;
  lockedMessageSw: string;
}

export const FEATURE_UNLOCK_RULES: Record<AppFeature, FeatureUnlockRule> = {
  LEARN: {
    feature: 'LEARN',
    minimumDaysActive: 0,
    minimumCompletedMissions: 0,
    minimumXp: 0,
    titleEn: 'Learning Path',
    titleSw: 'Njia ya Masomo',
    lockedMessageEn: 'Available now',
    lockedMessageSw: 'Inapatikana sasa'
  },
  ME: {
    feature: 'ME',
    minimumDaysActive: 0,
    minimumCompletedMissions: 0,
    minimumXp: 0,
    titleEn: 'My Profile',
    titleSw: 'Wasifu Wangu',
    lockedMessageEn: 'Available now',
    lockedMessageSw: 'Inapatikana sasa'
  },
  PRACTICE: {
    feature: 'PRACTICE',
    minimumDaysActive: 2, // Available on Day 2+ or after 2 quests
    minimumCompletedMissions: 2,
    minimumXp: 50,
    titleEn: 'Practice Hub',
    titleSw: 'Kituo cha Mazoezi',
    lockedMessageEn: 'Complete 2 quests to unlock the Practice Hub!',
    lockedMessageSw: 'Kamilisha masomo 2 ili kufungua Mazoezi!'
  },
  SHOP: {
    feature: 'SHOP',
    minimumDaysActive: 2, // Available on Day 2+ or after 3 quests
    minimumCompletedMissions: 3,
    minimumXp: 75,
    titleEn: 'Dukani Shop',
    titleSw: 'Dukani',
    lockedMessageEn: 'Complete 3 quests to unlock Dukani!',
    lockedMessageSw: 'Kamilisha masomo 3 ili kufungua Dukani!'
  },
  LEADERBOARD: {
    feature: 'LEADERBOARD',
    minimumDaysActive: 3,
    minimumCompletedMissions: 5,
    minimumXp: 150,
    titleEn: 'Simba Leaderboard',
    titleSw: 'Bodi ya Viongozi',
    lockedMessageEn: 'Unlocks on Day 3 or after 5 completed quests!',
    lockedMessageSw: 'Hufunguka Siku ya 3 au baada ya masomo 5!'
  },
  FRIENDS: {
    feature: 'FRIENDS',
    minimumDaysActive: 4,
    minimumCompletedMissions: 7,
    minimumXp: 200,
    titleEn: 'Study Buddies',
    titleSw: 'Marafiki wa Masomo',
    lockedMessageEn: 'Unlocks once you have completed 7 quests!',
    lockedMessageSw: 'Hufunguka baada ya kukamilisha masomo 7!'
  }
};

/**
 * Calculates days since first active / account creation date.
 */
export function getDaysSinceStart(student?: Partial<StudentProfile>): number {
  if (!student) return 0;
  if (student.streakDays && student.streakDays > 1) {
    return student.streakDays;
  }
  return 1; // Default to Day 1
}

/**
 * Determines if a given feature is currently unlocked for the student.
 */
export function isFeatureUnlocked(feature: AppFeature, student?: Partial<StudentProfile>): boolean {
  if (!student) return feature === 'LEARN' || feature === 'ME';

  const rule = FEATURE_UNLOCK_RULES[feature];
  if (!rule) return true;

  // Day 0 core features
  if (rule.minimumDaysActive === 0 && rule.minimumCompletedMissions === 0) {
    return true;
  }

  const completedCount = student.completedMissionIds?.length || 0;
  const currentXp = student.xp || 0;
  const daysActive = getDaysSinceStart(student);

  // Fast-track milestone unlock: child has completed required missions & earned XP
  if (completedCount >= rule.minimumCompletedMissions && currentXp >= rule.minimumXp) {
    return true;
  }

  // Day-based unlock: active for at least minimumDaysActive AND completed at least 1 mission
  if (daysActive >= rule.minimumDaysActive && completedCount >= 1) {
    return true;
  }

  return false;
}

/**
 * Returns user-facing lock explanation.
 */
export function getFeatureLockReason(feature: AppFeature, language: 'en' | 'sw' = 'en'): string {
  const rule = FEATURE_UNLOCK_RULES[feature];
  if (!rule) return '';
  return language === 'sw' ? rule.lockedMessageSw : rule.lockedMessageEn;
}
