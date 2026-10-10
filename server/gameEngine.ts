import { cbeDb } from './cbeDb.js';
import {
  Question,
  LearningSessionResult,
  Achievement,
  DifficultyLevel,
  StudentProfile
} from '../src/types/cbe.js';
import { evaluateAnswer } from '../src/utils/answerValidation.js';

export interface SubmittedAnswer {
  questionId: string;
  selectedAnswer: any;
  timeSpentSeconds: number;
  usedHint: boolean;
}

export interface SessionSubmissionPayload {
  studentId: string;
  missionId: string;
  answers: SubmittedAnswer[];
  heartsRemaining?: number;
}

export function calculateLevelFromXp(xp: number): number {
  if (xp < 150) return 1;
  if (xp < 350) return 2;
  if (xp < 650) return 3;
  if (xp < 1050) return 4;
  if (xp < 1600) return 5;
  if (xp < 2300) return 6;
  if (xp < 3200) return 7;
  if (xp < 4300) return 8;
  if (xp < 5600) return 9;
  return 10;
}

export function getTitleForLevel(level: number): string {
  switch (level) {
    case 1: return 'Safari Scout';
    case 2: return 'Savanna Explorer';
    case 3: return 'Mara Pathfinder';
    case 4: return 'Rift Valley Scholar';
    case 5: return 'Kilimanjaro Trailblazer';
    case 6: return 'Simba Champion';
    case 7: return 'Taifa Master';
    case 8: return 'CBE Innovator';
    case 9: return 'Distinguished Scholar';
    default: return 'Grand CBE Legend';
  }
}

export class GameEngine {
  public evaluateQuestionAnswer(q: Question, answer: any): boolean {
    return evaluateAnswer(q, answer);
  }

  public processSessionSubmission(payload: SessionSubmissionPayload): {
    result: LearningSessionResult;
    student: StudentProfile;
    questionReviews: {
      questionId: string;
      isCorrect: boolean;
      userAnswer: any;
      explanation: string;
      socraticHint: string;
    }[];
  } {
    const { studentId, missionId, answers } = payload;
    const mission = cbeDb.getMissionById(missionId);
    if (!mission) {
      throw new Error(`Mission not found: ${missionId}`);
    }

    const student = cbeDb.getStudentProfile(studentId);
    if (!student) {
      throw new Error(`Student not found: ${studentId}`);
    }

    const missionQuestions = cbeDb.getQuestionsForMission(missionId);
    const questionMap = new Map<string, Question>(missionQuestions.map(q => [q.id, q]));

    let correctCount = 0;
    const questionReviews: {
      questionId: string;
      isCorrect: boolean;
      userAnswer: any;
      explanation: string;
      socraticHint: string;
    }[] = [];

    // Server-side grading of each answer
    for (const subAnswer of answers) {
      const q = questionMap.get(subAnswer.questionId);
      if (!q) continue;

      const isCorrect = this.evaluateQuestionAnswer(q, subAnswer.selectedAnswer);
      if (isCorrect) {
        correctCount += 1;
      }

      questionReviews.push({
        questionId: q.id,
        isCorrect,
        userAnswer: subAnswer.selectedAnswer,
        explanation: q.explanation,
        socraticHint: q.socraticHint
      });

      // Update strand mastery
      const subStrand = cbeDb.getSubStrands().find(ss => ss.id === q.subStrandId);
      const strand = subStrand ? cbeDb.getStrands().find(st => st.id === subStrand.strandId) : undefined;
      const learningArea = strand ? cbeDb.getLearningAreas().find(la => la.id === strand.learningAreaId) : undefined;

      cbeDb.updateStrandMastery(
        student.id,
        strand?.id || 'general-strand',
        isCorrect,
        strand?.title || 'General Strand',
        learningArea?.name || 'General'
      );
    }

    const totalQuestions = missionQuestions.length || answers.length || 1;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const isPassing = scorePercentage >= 60;

    // Secure calculation of rewards
    let calculatedXp = 0;
    let calculatedCoins = 0;

    if (isPassing) {
      // Base reward from mission
      calculatedXp += mission.xpReward;
      calculatedCoins += mission.coinReward;

      // Bonus for high score
      if (scorePercentage === 100) {
        calculatedXp += 25; // Perfect accuracy bonus
        calculatedCoins += 15;
      } else if (scorePercentage >= 80) {
        calculatedXp += 15;
        calculatedCoins += 10;
      }
    } else {
      // Participation effort XP even when repeating
      calculatedXp = Math.max(10, Math.round(mission.xpReward * 0.3));
      calculatedCoins = 5;
    }

    // Stars rating
    let stars = 0;
    if (scorePercentage >= 90) stars = 3;
    else if (scorePercentage >= 75) stars = 2;
    else if (scorePercentage >= 60) stars = 1;

    // Streak calculation
    const today = new Date().toISOString().split('T')[0];
    let streakMaintained = true;
    if (student.lastActiveDate !== today) {
      const lastActive = new Date(student.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        student.streakDays += 1;
      } else if (diffDays > 1) {
        if (student.streakFrozen) {
          student.streakFrozen = false; // Used freeze
        } else {
          student.streakDays = 1;
        }
      }
      student.lastActiveDate = today;
    }

    // Synchronize hearts if provided in payload (decrease only on wrong answers)
    if (payload.heartsRemaining !== undefined) {
      student.hearts = Math.max(0, Math.min(student.maxHearts, payload.heartsRemaining));
    }

    // Apply XP and Coins
    const oldLevel = student.level;
    student.xp += calculatedXp;
    student.coins += calculatedCoins;
    student.level = calculateLevelFromXp(student.xp);
    student.equippedTitle = getTitleForLevel(student.level);
    const leveledUp = student.level > oldLevel;

    // Record transactions
    cbeDb.recordXpTransaction(student.id, calculatedXp, `Completed mission: ${mission.title} (${scorePercentage}%)`);
    cbeDb.recordCoinTransaction(student.id, calculatedCoins, `Earned in mission: ${mission.title}`);

    // Update mission completion
    if (isPassing && !student.completedMissionIds.includes(mission.id)) {
      student.completedMissionIds.push(mission.id);
    }

    // Unlock subsequent worlds based on level
    const allWorlds = cbeDb.getGameWorlds();
    for (const w of allWorlds) {
      if (student.level >= w.requiredLevel && !student.unlockedWorldIds.includes(w.id)) {
        student.unlockedWorldIds.push(w.id);
      }
    }

    // Check Achievements
    const unlockedAchievements: Achievement[] = [];
    if (mission.badgeUnlockId && !student.badges.includes(mission.badgeUnlockId)) {
      student.badges.push(mission.badgeUnlockId);
      const ach = cbeDb.getAchievementById(mission.badgeUnlockId);
      if (ach) unlockedAchievements.push(ach);
    }

    // 7 day streak achievement
    if (student.streakDays >= 7 && !student.badges.includes('badge-seven-day-streak')) {
      student.badges.push('badge-seven-day-streak');
      const streakAch = cbeDb.getAchievementById('badge-seven-day-streak');
      if (streakAch) unlockedAchievements.push(streakAch);
    }

    // Save updated student in DB
    cbeDb.updateStudent(student.id, student);

    const sessionResult: LearningSessionResult = {
      sessionId: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      missionId: mission.id,
      studentId: student.id,
      scorePercentage,
      totalQuestions,
      correctAnswersCount: correctCount,
      xpEarned: calculatedXp,
      coinsEarned: calculatedCoins,
      heartsRemaining: student.hearts,
      streakMaintained,
      unlockedAchievements,
      leveledUp,
      newLevel: student.level,
      completedAt: new Date().toISOString()
    };

    cbeDb.recordSessionResult(sessionResult);

    // Telemetry log
    cbeDb.logAnalytics({
      id: `evt-${Date.now()}`,
      studentId: student.id,
      eventType: 'mission_completed',
      metadata: {
        missionId: mission.id,
        scorePercentage,
        xpEarned: calculatedXp,
        coinsEarned: calculatedCoins,
        stars
      },
      timestamp: new Date().toISOString()
    });

    return {
      result: sessionResult,
      student,
      questionReviews
    };
  }
}

export const gameEngine = new GameEngine();
