/**
 * Jifuno Learning Engine: Mastery, Spaced Repetition & Recommendation
 * 
 * Implements:
 * 1. recommendNextLesson: Based on Grade, CBC curriculum order, and completed lessons
 * 2. Spaced Repetition (+1, +3, +7 days interval calculation)
 * 3. Skill & Strand Mastery calculations
 */

import {
  getCurriculumGrade,
  CurriculumGrade,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest
} from '../data/curriculum/index.js';

export interface RecommendedLessonResult {
  questId: string;
  questTitle: { en: string; sw?: string };
  subjectId: string;
  subjectTitle: { en: string; sw: string };
  strandId: string;
  strandTitle: { en: string; sw?: string };
  subStrandId: string;
  reason: 'NEXT_IN_CURRICULUM_ORDER' | 'FIRST_IN_GRADE' | 'MASTERY_REINFORCEMENT';
  characterName: string;
  characterAvatar: string;
  xpReward: number;
  coinReward: number;
}

export interface ReviewQueueItem {
  id?: string;
  learner_id: string;
  question_id: string;
  interval_days: number;
  next_review_at: string;
  times_reviewed: number;
  consecutive_correct: number;
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED';
}

/**
 * Recommends the next lesson for a learner based on:
 * 1. Grade (Grade 3, 4, 5, or 6)
 * 2. Authentic CBC curriculum sequence order (Strand -> SubStrand -> Quests)
 * 3. Completed lessons history
 */
export function recommendNextLesson(params: {
  gradeId?: string;
  completedLessonIds?: string[];
  preferredSubjectId?: string;
}): RecommendedLessonResult {
  const gradeKey = params.gradeId || 'grade-4';
  const grade = getCurriculumGrade(gradeKey) || getCurriculumGrade('grade-4')!;
  const completed = new Set(params.completedLessonIds || []);

  const subjects = grade.subjects || [];

  // If a preferred subject is specified, inspect that subject first
  let orderedSubjects = [...subjects];
  if (params.preferredSubjectId) {
    const preferred = subjects.find(s => s.id === params.preferredSubjectId);
    if (preferred) {
      orderedSubjects = [preferred, ...subjects.filter(s => s.id !== params.preferredSubjectId)];
    }
  }

  // Iterate in strict CBC curriculum sequence
  for (const subject of orderedSubjects) {
    for (const strand of subject.strands || []) {
      for (const subStrand of strand.subStrands || []) {
        for (const quest of subStrand.quests || []) {
          if (!completed.has(quest.id)) {
            return {
              questId: quest.id,
              questTitle: quest.title,
              subjectId: subject.id,
              subjectTitle: subject.title,
              strandId: strand.id,
              strandTitle: strand.title,
              subStrandId: subStrand.id,
              reason: 'NEXT_IN_CURRICULUM_ORDER',
              characterName: quest.characterName || 'Rafiki',
              characterAvatar: quest.characterAvatar || 'owl',
              xpReward: quest.xpReward || 25,
              coinReward: quest.coinReward || 10
            };
          }
        }
      }
    }
  }

  // If all completed, return first quest of first subject for review
  const firstSubj = subjects[0];
  const firstQuest = firstSubj?.strands[0]?.subStrands[0]?.quests[0];

  return {
    questId: firstQuest?.id || 'quest-g4-math-place-value',
    questTitle: firstQuest?.title || { en: 'Place Value Safari', sw: 'Thamani ya Nafasi' },
    subjectId: firstSubj?.id || 'g4-math',
    subjectTitle: firstSubj?.title || { en: 'Mathematics', sw: 'Hisabati' },
    strandId: firstSubj?.strands[0]?.id || 'strand-numbers',
    strandTitle: firstSubj?.strands[0]?.title || { en: 'Numbers & Operations' },
    subStrandId: firstSubj?.strands[0]?.subStrands[0]?.id || 'substrand-whole-numbers',
    reason: completed.size > 0 ? 'MASTERY_REINFORCEMENT' : 'FIRST_IN_GRADE',
    characterName: firstQuest?.characterName || 'Amina',
    characterAvatar: firstQuest?.characterAvatar || 'cheetah',
    xpReward: firstQuest?.xpReward || 25,
    coinReward: firstQuest?.coinReward || 10
  };
}

/**
 * Calculates the next spaced repetition interval for wrong answers.
 * Progression: 1 day -> 3 days -> 7 days -> Completed.
 * If answer is incorrect, interval resets to 1 day.
 */
export function calculateNextReviewInterval(currentInterval: number, isCorrect: boolean): {
  intervalDays: number;
  status: 'PENDING' | 'COMPLETED';
  nextReviewAt: string;
} {
  const now = new Date();

  if (!isCorrect) {
    const nextDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    return {
      intervalDays: 1,
      status: 'PENDING',
      nextReviewAt: nextDate.toISOString()
    };
  }

  let nextInterval = 3;
  let status: 'PENDING' | 'COMPLETED' = 'PENDING';

  if (currentInterval === 1) {
    nextInterval = 3;
  } else if (currentInterval === 3) {
    nextInterval = 7;
  } else {
    nextInterval = 7;
    status = 'COMPLETED';
  }

  const daysToAdd = status === 'COMPLETED' ? 30 : nextInterval;
  const nextDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return {
    intervalDays: nextInterval,
    status,
    nextReviewAt: nextDate.toISOString()
  };
}

/**
 * Filters review items that are currently due for review
 */
export function getDueReviewItems<T extends { next_review_at: string; status?: string }>(
  items: T[],
  referenceTime = new Date()
): T[] {
  const refMs = referenceTime.getTime();
  return items.filter(item => {
    if (item.status && item.status !== 'PENDING') return false;
    const dueMs = new Date(item.next_review_at).getTime();
    return dueMs <= refMs;
  });
}
