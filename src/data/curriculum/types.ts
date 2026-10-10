// Kenyan CBC Curriculum Data Layer - Unified Typed Contracts

export type CBCGradeBand = 'LOWER_PRIMARY' | 'UPPER_PRIMARY' | 'JUNIOR_SECONDARY';

export type CBCRubricLevel = 'BEGINNING' | 'DEVELOPING' | 'PROFICIENT' | 'EXCEEDING';

export type SourcingStatus = 'OFFICIAL_KICD' | 'TODO: verify with KICD design';

export type ReligiousEducationStream = 'CRE' | 'IRE' | 'HRE';

export type CBCCompetency =
  | 'Communication and collaboration'
  | 'Critical thinking and problem solving'
  | 'Creativity and imagination'
  | 'Citizenship'
  | 'Digital literacy'
  | 'Learning to learn'
  | 'Self-efficacy'
  | 'Financial literacy';

export type CBCValue =
  | 'Love'
  | 'Responsibility'
  | 'Respect'
  | 'Unity'
  | 'Peace'
  | 'Patriotism'
  | 'Integrity'
  | 'Social justice';

export type ExtendedQuestionType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'MATCHING'
  | 'ORDERING'
  | 'FILL_BLANK'
  | 'SCENARIO'
  | 'NUMBER_ENTRY'
  | 'IMAGE_LABEL'
  | 'LISTEN_CHOOSE'
  | 'READING_COMPREHENSION'
  | 'WORD_BUILDER'
  | 'KENYAN_MONEY';

export interface LocalizedText {
  en: string;
  sw: string;
}

export interface CurriculumNodeMetadata {
  id: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  order: number;
  prerequisiteIds: string[];
  sourceStatus: SourcingStatus;
}

export interface CurriculumQuestionOption {
  id: string;
  text: LocalizedText | string;
  explanation?: LocalizedText | string;
  mediaUrl?: string;
}

export interface CurriculumMatchingPair {
  leftId: string;
  leftText: LocalizedText | string;
  rightId: string;
  rightText: LocalizedText | string;
}

export interface CurriculumImageHotspot {
  id: string;
  label: LocalizedText | string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
}

export interface CurriculumQuestion {
  id: string;
  subStrandId: string;
  type: ExtendedQuestionType;
  prompt: LocalizedText;
  storyScenario?: LocalizedText;
  difficulty: 1 | 2 | 3;
  strandTag: string;
  options?: CurriculumQuestionOption[];
  correctOptionId?: string; // For MCQ
  correctBoolean?: boolean; // For TRUE_FALSE
  matchingPairs?: CurriculumMatchingPair[]; // For MATCHING
  correctOrderIds?: string[]; // For ORDERING
  fillBlankAnswers?: string[]; // For FILL_BLANK acceptable answers
  blankTemplate?: LocalizedText; // Template with [BLANK]
  numericAnswer?: {
    value: number;
    tolerance?: number;
    unit?: string; // e.g. "KES", "kg", "cm", "litres"
  };
  imageLabelData?: {
    imageUrl: string;
    hotspots: CurriculumImageHotspot[];
  };
  audioSpeechPrompt?: {
    textToSpeak: string;
    language: 'en-KE' | 'sw-KE' | 'en' | 'sw';
  };
  readingPassage?: LocalizedText;
  wordBuilderTokens?: {
    correctSentence: string;
    scrambledTokens: string[];
  };
  explanation: LocalizedText;
  socraticHint: LocalizedText;
  kenyanCulturalContext: string;
  sourceStatus: SourcingStatus;
}

export interface CurriculumTeachCard {
  heading: LocalizedText;
  body: LocalizedText;
  workedExample: LocalizedText;
  imagePrompt: string;
}

export interface CurriculumQuest {
  id: string;
  subStrandId: string;
  order: number;
  title: LocalizedText;
  storyContext: LocalizedText;
  characterName: string;
  characterAvatar: string;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  xpReward: number;
  coinReward: number;
  cbeCompetencies: CBCCompetency[];
  cbeValues: CBCValue[];
  prerequisiteQuestIds: string[];
  teachCards?: CurriculumTeachCard[];
  questions: CurriculumQuestion[];
  badgeUnlockId?: string;
  isBossChallenge?: boolean;
  sourceStatus: SourcingStatus;
}

export interface CurriculumSubStrand {
  id: string;
  strandId: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  order: number;
  prerequisiteIds: string[];
  cbeCompetencies: CBCCompetency[];
  cbeValues: CBCValue[];
  estimatedMinutes: number;
  quests: CurriculumQuest[];
  sourceStatus: SourcingStatus;
}

export interface CurriculumStrand {
  id: string;
  subjectId: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  order: number;
  prerequisiteIds: string[];
  subStrands: CurriculumSubStrand[];
  sourceStatus: SourcingStatus;
}

export interface CurriculumSubject {
  id: string;
  gradeId: string;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  bannerGradient: string;
  order: number;
  isOptional?: boolean;
  religiousEducationStream?: ReligiousEducationStream;
  prerequisiteIds: string[];
  strands: CurriculumStrand[];
  sourceStatus: SourcingStatus;
}

export interface CurriculumGrade {
  id: string;
  code: string;
  name: LocalizedText;
  band: CBCGradeBand;
  description: LocalizedText;
  order: number;
  subjects: CurriculumSubject[];
}
