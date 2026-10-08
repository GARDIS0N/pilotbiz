// Kenyan CBE Gamified Learning Platform - Core Domain Models & Types

export type UserRole = 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN';

export type QuestionType = 
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'MATCHING'
  | 'ORDERING'
  | 'FILL_BLANK'
  | 'SCENARIO';

export type DifficultyLevel = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'ADVANCED' | 'MASTERY';

export type ContentStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  // Specific role links
  studentProfileId?: string;
  parentProfileId?: string;
  teacherProfileId?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  gradeId: string; // e.g., 'grade-4'
  schoolName: string;
  county: string; // Kenyan County e.g. 'Nairobi', 'Nakuru', 'Machakos', 'Kisumu'
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  lastActiveDate: string;
  streakFrozen: boolean;
  unlockedWorldIds: string[];
  completedMissionIds: string[];
  badges: string[];
  equippedTitle: string;
  parentUserId?: string;
  classId?: string;
}

export interface ParentProfile {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  childrenStudentIds: string[];
}

export interface TeacherProfile {
  id: string;
  userId: string;
  fullName: string;
  schoolName: string;
  county: string;
  tscNumber?: string; // Teachers Service Commission (Kenya)
  classIds: string[];
}

export interface SchoolClass {
  id: string;
  name: string; // e.g., "Grade 4 Simba"
  gradeId: string;
  teacherId: string;
  code: string; // join code
  studentIds: string[];
  assignedMissionIds: string[];
  createdAt: string;
}

// -------------------------------------------------------------
// Curriculum Hierarchy (Kenyan Competency-Based Education)
// Grade -> Learning Area -> Strand -> Sub-Strand -> Learning Outcome -> Lesson
// -------------------------------------------------------------

export interface Grade {
  id: string;
  code: string; // 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'JSS1'
  name: string; // 'Grade 1', 'Grade 4', etc.
  levelGroup: 'LOWER_PRIMARY' | 'UPPER_PRIMARY' | 'JUNIOR_SECONDARY';
  description: string;
}

export interface LearningArea {
  id: string;
  gradeId: string;
  name: string; // 'Mathematics', 'English Language', 'Kiswahili', 'Science and Technology', 'Agriculture & Nutrition'
  swahiliName: string; // 'Hisabati', 'Lugha ya Kiingereza', 'Kiswahili Sanifu', 'Sayansi na Teknolojia'
  icon: string;
  color: string;
  description: string;
  strandsCount: number;
}

export interface Strand {
  id: string;
  learningAreaId: string;
  code: string;
  title: string;
  swahiliTitle?: string;
  description: string;
  icon: string;
}

export interface SubStrand {
  id: string;
  strandId: string;
  learningAreaId: string;
  title: string;
  description: string;
  cbeCompetency: string; // Core competency targeted e.g., "Critical thinking and problem solving, Financial literacy"
  estimatedMinutes: number;
}

export interface LearningOutcome {
  id: string;
  subStrandId: string;
  outcomeText: string; // "By the end of the sub-strand, the learner should be able to..."
  cbeValues: string[]; // e.g., ["Integrity", "Love", "Respect", "Unity"]
}

export interface Lesson {
  id: string;
  subStrandId: string;
  title: string;
  conceptIntro: string; // Engaging story/explanation in Kenyan context
  kenyanContextNote: string; // e.g. "Using Kenyan shillings, chapatis, or farm seedlings"
  visualPrompt?: string;
  keyVocabulary: { term: string; meaning: string; swahiliTerm?: string }[];
  didYouKnowKenyanFact?: string;
  activitiesCount: number;
}

// -------------------------------------------------------------
// Game World & Missions
// -------------------------------------------------------------

export interface GameWorld {
  id: string;
  title: string;
  swahiliTitle: string;
  theme: string; // 'savanna' | 'farm' | 'city' | 'lab' | 'mountain'
  icon: string;
  description: string;
  requiredLevel: number;
  bannerGradient: string;
  learningAreaIds: string[];
  totalMissions: number;
}

export interface Mission {
  id: string;
  worldId: string;
  subStrandId: string;
  lessonId: string;
  order: number;
  title: string;
  swahiliTitle?: string;
  storyContext: string; // e.g. "Help Amina calculate change at the Nakuru open market"
  characterName: string; // "Amina", "Juma", "Wanjiku", "Mwangi", "Mwalimu"
  characterAvatar: string;
  difficulty: DifficultyLevel;
  xpReward: number;
  coinReward: number;
  questionIds: string[];
  badgeUnlockId?: string;
  isBossChallenge?: boolean;
}

// -------------------------------------------------------------
// Question Engine Models
// -------------------------------------------------------------

export interface QuestionOption {
  id: string;
  text: string;
  explanation?: string;
  mediaUrl?: string;
}

export interface QuestionMatchingPair {
  leftId: string;
  leftText: string;
  rightId: string;
  rightText: string;
}

export interface Question {
  id: string;
  subStrandId: string;
  type: QuestionType;
  prompt: string;
  storyScenario?: string;
  difficulty: DifficultyLevel;
  options?: QuestionOption[];
  correctOptionId?: string; // For MCQ
  correctBoolean?: boolean; // For TRUE_FALSE
  matchingPairs?: QuestionMatchingPair[]; // For MATCHING
  correctOrderIds?: string[]; // For ORDERING
  fillBlankAnswers?: string[]; // For FILL_BLANK acceptable answers
  blankTemplate?: string; // "Amina had [BLANK] shillings left after buying bread."
  explanation: string;
  socraticHint: string; // Hint that guides reasoning without spoiling the answer
  kenyanCulturalContext: string;
  sourceType: 'CURRICULUM_ALIGNED' | 'AI_PRACTICE' | 'OFFICIAL_CBE_REF';
  contentStatus: ContentStatus;
  reviewedBy?: string;
}

// -------------------------------------------------------------
// Progression, Session & Analytics
// -------------------------------------------------------------

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: any;
  isCorrect: boolean;
  timeSpentSeconds: number;
  usedHint: boolean;
}

export interface LearningSessionResult {
  sessionId: string;
  missionId: string;
  studentId: string;
  scorePercentage: number;
  totalQuestions: number;
  correctAnswersCount: number;
  xpEarned: number;
  coinsEarned: number;
  heartsRemaining: number;
  streakMaintained: boolean;
  unlockedAchievements: Achievement[];
  leveledUp: boolean;
  newLevel?: number;
  completedAt: string;
}

export interface StrandMastery {
  strandId: string;
  strandTitle: string;
  learningAreaName: string;
  masteryPercentage: number; // 0 - 100
  totalAttempts: number;
  correctAttempts: number;
  status: 'NEEDS_PRACTICE' | 'DEVELOPING' | 'PROFICIENT' | 'EXCEEDING';
  lastPracticedDate: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  category: 'MASTERY' | 'STREAK' | 'EXPLORATION' | 'SPEED';
}

export interface StudentProgress {
  studentId: string;
  completedMissionIds: string[];
  missionStars: Record<string, number>; // missionId -> 1 to 3 stars
  masteries: Record<string, StrandMastery>;
  achievements: string[]; // achievementIds
  weeklyStudyMinutes: number;
  totalQuestionsAnswered: number;
  accuracyRate: number;
  lastUpdated: string;
}

export interface LearningAnalyticsEvent {
  id: string;
  studentId: string;
  eventType: 
    | 'lesson_started'
    | 'lesson_completed'
    | 'question_answered'
    | 'mission_completed'
    | 'achievement_unlocked'
    | 'streak_updated'
    | 'hint_requested';
  metadata: Record<string, any>;
  timestamp: string;
}

export interface SocraticTutorMessage {
  id: string;
  sender: 'STUDENT' | 'TUTOR';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  contextTopic?: string;
}
