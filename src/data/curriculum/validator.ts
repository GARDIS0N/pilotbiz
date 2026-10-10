// Kenyan CBC Curriculum Schema Validator
// Fails build or test execution if any curriculum node is malformed or has broken links.

import {
  CurriculumGrade,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest,
  CurriculumQuestion
} from './types.js';

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    gradesCount: number;
    subjectsCount: number;
    strandsCount: number;
    subStrandsCount: number;
    questsCount: number;
    questionsCount: number;
    verifiedNodesCount: number;
    unverifiedTodoCount: number;
  };
}

export function validateCurriculum(grades: CurriculumGrade[]): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const allNodeIds = new Set<string>();
  const allPrerequisiteReferences: { sourceId: string; targetId: string }[] = [];

  let subjectsCount = 0;
  let strandsCount = 0;
  let subStrandsCount = 0;
  let questsCount = 0;
  let questionsCount = 0;
  let verifiedNodesCount = 0;
  let unverifiedTodoCount = 0;

  function recordNode(id: string, sourceStatus?: string, prerequisites?: string[]) {
    if (allNodeIds.has(id)) {
      errors.push(`Duplicate node ID detected: "${id}"`);
    } else {
      allNodeIds.add(id);
    }

    if (sourceStatus === 'OFFICIAL_KICD') {
      verifiedNodesCount++;
    } else if (sourceStatus === 'TODO: verify with KICD design') {
      unverifiedTodoCount++;
    }

    if (prerequisites && prerequisites.length > 0) {
      for (const prereq of prerequisites) {
        allPrerequisiteReferences.push({ sourceId: id, targetId: prereq });
      }
    }
  }

  function checkLocalized(path: string, obj: { en?: string; sw?: string } | undefined, fieldName: string) {
    if (!obj) {
      errors.push(`Missing localized field "${fieldName}" at ${path}`);
      return;
    }
    if (!obj.en || obj.en.trim().length === 0) {
      errors.push(`Missing English ("en") translation for "${fieldName}" at ${path}`);
    }
    if (!obj.sw || obj.sw.trim().length === 0) {
      errors.push(`Missing Kiswahili ("sw") translation for "${fieldName}" at ${path}`);
    }
  }

  function validateQuestion(q: CurriculumQuestion, questPath: string) {
    questionsCount++;
    const qPath = `${questPath} -> Question [${q.id}]`;
    recordNode(q.id, q.sourceStatus);

    checkLocalized(qPath, q.prompt, 'prompt');
    checkLocalized(qPath, q.explanation, 'explanation');
    checkLocalized(qPath, q.socraticHint, 'socraticHint');

    if (!q.strandTag) {
      errors.push(`Question [${q.id}] is missing required strandTag`);
    }

    switch (q.type) {
      case 'MULTIPLE_CHOICE': {
        if (!q.options || q.options.length < 2) {
          errors.push(`MCQ Question [${q.id}] must provide at least 2 options`);
        } else if (!q.correctOptionId) {
          errors.push(`MCQ Question [${q.id}] is missing correctOptionId`);
        } else if (!q.options.some(opt => opt.id === q.correctOptionId)) {
          errors.push(`MCQ Question [${q.id}] correctOptionId "${q.correctOptionId}" does not exist in options`);
        }
        break;
      }
      case 'TRUE_FALSE': {
        if (typeof q.correctBoolean !== 'boolean') {
          errors.push(`True/False Question [${q.id}] must specify correctBoolean (boolean)`);
        }
        break;
      }
      case 'MATCHING': {
        if (!q.matchingPairs || q.matchingPairs.length < 2) {
          errors.push(`Matching Question [${q.id}] requires at least 2 matching pairs`);
        }
        break;
      }
      case 'ORDERING': {
        if (!q.correctOrderIds || q.correctOrderIds.length < 2) {
          errors.push(`Ordering Question [${q.id}] requires correctOrderIds array`);
        }
        break;
      }
      case 'FILL_BLANK': {
        if (!q.fillBlankAnswers || q.fillBlankAnswers.length === 0) {
          errors.push(`Fill-in-blank Question [${q.id}] must have fillBlankAnswers`);
        }
        break;
      }
      case 'NUMBER_ENTRY': {
        if (!q.numericAnswer || typeof q.numericAnswer.value !== 'number') {
          errors.push(`Number Entry Question [${q.id}] must specify numericAnswer with a value`);
        }
        break;
      }
      case 'KENYAN_MONEY': {
        if (!q.numericAnswer || typeof q.numericAnswer.value !== 'number') {
          errors.push(`Kenyan Money Question [${q.id}] must specify numericAnswer with a value`);
        }
        break;
      }
      case 'IMAGE_LABEL': {
        if (!q.imageLabelData || !q.imageLabelData.hotspots || q.imageLabelData.hotspots.length === 0) {
          errors.push(`Image Label Question [${q.id}] must have imageLabelData hotspots`);
        }
        break;
      }
      case 'LISTEN_CHOOSE': {
        if (!q.audioSpeechPrompt || !q.audioSpeechPrompt.textToSpeak) {
          errors.push(`Listen & Choose Question [${q.id}] must have textToSpeak in audioSpeechPrompt`);
        }
        if (!q.options || q.options.length < 2) {
          errors.push(`Listen & Choose Question [${q.id}] requires at least 2 answer options`);
        }
        break;
      }
      case 'READING_COMPREHENSION': {
        if (!q.readingPassage) {
          errors.push(`Reading Comprehension Question [${q.id}] must have readingPassage`);
        }
        break;
      }
      case 'WORD_BUILDER': {
        if (!q.wordBuilderTokens || !q.wordBuilderTokens.correctSentence || !q.wordBuilderTokens.scrambledTokens) {
          errors.push(`Word Builder Question [${q.id}] must specify wordBuilderTokens with correctSentence and scrambledTokens`);
        }
        break;
      }
      case 'SCENARIO':
        break;
    }
  }

  function validateQuest(quest: CurriculumQuest, subStrandPath: string) {
    questsCount++;
    const questPath = `${subStrandPath} -> Quest [${quest.id}]`;
    recordNode(quest.id, quest.sourceStatus, quest.prerequisiteQuestIds);

    checkLocalized(questPath, quest.title, 'title');
    checkLocalized(questPath, quest.storyContext, 'storyContext');

    if (!quest.characterName) {
      warnings.push(`Quest [${quest.id}] missing characterName`);
    }

    if (!quest.cbeCompetencies || quest.cbeCompetencies.length === 0) {
      warnings.push(`Quest [${quest.id}] should specify at least one CBC Core Competency`);
    }

    if (!quest.cbeValues || quest.cbeValues.length === 0) {
      warnings.push(`Quest [${quest.id}] should specify at least one CBC Value`);
    }

    if (!quest.questions || quest.questions.length === 0) {
      errors.push(`Quest [${quest.id}] has no questions`);
    } else {
      quest.questions.forEach(q => validateQuestion(q, questPath));
    }
  }

  function validateSubStrand(subStrand: CurriculumSubStrand, strandPath: string) {
    subStrandsCount++;
    const subStrandPath = `${strandPath} -> SubStrand [${subStrand.id}]`;
    recordNode(subStrand.id, subStrand.sourceStatus, subStrand.prerequisiteIds);

    checkLocalized(subStrandPath, subStrand.title, 'title');
    checkLocalized(subStrandPath, subStrand.description, 'description');

    if (subStrand.quests.length === 0) {
      warnings.push(`SubStrand [${subStrand.id}] has 0 quests`);
    } else {
      subStrand.quests.forEach(quest => validateQuest(quest, subStrandPath));
    }
  }

  function validateStrand(strand: CurriculumStrand, subjectPath: string) {
    strandsCount++;
    const strandPath = `${subjectPath} -> Strand [${strand.id}]`;
    recordNode(strand.id, strand.sourceStatus, strand.prerequisiteIds);

    checkLocalized(strandPath, strand.title, 'title');
    checkLocalized(strandPath, strand.description, 'description');

    if (strand.subStrands.length === 0) {
      warnings.push(`Strand [${strand.id}] has 0 sub-strands`);
    } else {
      strand.subStrands.forEach(ss => validateSubStrand(ss, strandPath));
    }
  }

  function validateSubject(subj: CurriculumSubject, gradePath: string) {
    subjectsCount++;
    const subjectPath = `${gradePath} -> Subject [${subj.id}]`;
    recordNode(subj.id, subj.sourceStatus, subj.prerequisiteIds);

    checkLocalized(subjectPath, subj.title, 'title');
    checkLocalized(subjectPath, subj.description, 'description');

    if (subj.strands.length === 0) {
      warnings.push(`Subject [${subj.id}] has 0 strands defined`);
    } else {
      subj.strands.forEach(st => validateStrand(st, subjectPath));
    }
  }

  grades.forEach(grade => {
    const gradePath = `Grade [${grade.id}]`;
    recordNode(grade.id);
    checkLocalized(gradePath, grade.name, 'name');
    checkLocalized(gradePath, grade.description, 'description');

    grade.subjects.forEach(subj => validateSubject(subj, gradePath));
  });

  // Verify all prerequisite links
  for (const ref of allPrerequisiteReferences) {
    if (!allNodeIds.has(ref.targetId)) {
      errors.push(`Orphan prerequisite link: Node "${ref.sourceId}" references non-existent target "${ref.targetId}"`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      gradesCount: grades.length,
      subjectsCount,
      strandsCount,
      subStrandsCount,
      questsCount,
      questionsCount,
      verifiedNodesCount,
      unverifiedTodoCount
    }
  };
}
