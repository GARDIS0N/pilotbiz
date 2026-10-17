/**
 * Jifuno Versioned CBC Content Schema
 * Defines structured, version-controlled curriculum content models.
 */

import { ExtendedQuestionType, LocalizedText, SourcingStatus } from '../data/curriculum/types.js';

export const CURRENT_CONTENT_SCHEMA_VERSION = '1.2.0';
export const CURRENT_CBC_CURRICULUM_CYCLE = 'CBC-KICD-2024';

export interface LocalizedOptionalText {
  en: string;
  sw?: string;
}

export interface VersionedLessonMetadata {
  lessonId: string;
  gradeId: 'grade-3' | 'grade-4' | 'grade-5' | 'grade-6' | string;
  subjectId: string;
  strandId: string;
  strandTitle: LocalizedText | string;
  subStrandId: string;
  subStrandTitle: LocalizedText | string;
  learningOutcomeId?: string;
  learningOutcomeStatement?: string;
  order: number;
}

export interface VersionedQuestionItem {
  id: string;
  gradeId: string;
  subjectId: string;
  strandId: string;
  subStrandId: string;
  learningOutcomeId?: string;
  type: ExtendedQuestionType | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'MATCHING' | 'FILL_BLANK' | 'SCENARIO';
  difficulty: 1 | 2 | 3 | 'BEGINNER' | 'EASY' | 'MEDIUM' | 'ADVANCED' | 'MASTERY';
  prompt: string | LocalizedOptionalText;
  promptSw?: string;
  storyScenario?: string | LocalizedOptionalText;
  options?: { id: string; text: string | LocalizedOptionalText }[];
  correctOptionId?: string;
  correctBoolean?: boolean;
  matchingPairs?: { leftId: string; leftText: string; rightId: string; rightText: string }[];
  explanation: string | LocalizedOptionalText;
  explanationSw?: string;
  socraticHint: string | LocalizedOptionalText;
  kenyanCulturalContext?: string;
  sourceStatus?: SourcingStatus | string;
  version?: string;
  updatedAt?: string;
}

export interface VersionedContentPackage {
  schemaVersion: string; // e.g. "1.2.0"
  curriculumCycle: string; // e.g. "CBC-KICD-2024"
  packageId: string;
  name: string;
  description?: string;
  gradeId: string;
  subjectId: string;
  author?: string;
  createdAt: string;
  questions: VersionedQuestionItem[];
}

export interface ContentValidationError {
  questionId?: string;
  index: number;
  field: string;
  message: string;
  severity: 'ERROR' | 'WARNING';
}

export interface QualityChecklistResult {
  questionId: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ContentValidationResult {
  isValid: boolean;
  totalQuestions: number;
  validCount: number;
  invalidCount: number;
  warningCount: number;
  errors: ContentValidationError[];
  duplicateCount: number;
  positionADistributionPct?: number;
}
