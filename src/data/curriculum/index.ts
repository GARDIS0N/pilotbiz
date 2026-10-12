// Kenyan CBC Curriculum Master Registry & Query Engine
// Single source of truth for all grades, subjects, strands, quests, and questions.

import {
  CurriculumGrade,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest,
  CurriculumQuestion,
  ReligiousEducationStream
} from './types.js';
import { grade3Curriculum } from './grades/grade3.js';
import { grade4Curriculum } from './grades/grade4.js';
import { grade5Curriculum } from './grades/grade5.js';
import { grade6Curriculum } from './grades/grade6.js';
import { validateCurriculum, ValidationReport } from './validator.js';
import {
  getComprehensiveGrade,
  getAllComprehensiveGrades,
  getComprehensiveSubject,
  getComprehensiveStrand,
  getComprehensiveSubStrand,
  getComprehensiveQuest,
  getAllComprehensiveQuests
} from './comprehensiveCurriculum.js';

export * from './types.js';
export * from './validator.js';
export * from './comprehensiveCurriculum.js';
export * from './contentAdapter.js';

export const ALL_CURRICULUM_GRADES: CurriculumGrade[] = [
  grade3Curriculum,
  grade4Curriculum,
  grade5Curriculum,
  grade6Curriculum
];

// In-memory indexed maps for O(1) query lookups
const gradesMap = new Map<string, CurriculumGrade>();
const subjectsMap = new Map<string, CurriculumSubject>();
const strandsMap = new Map<string, CurriculumStrand>();
const subStrandsMap = new Map<string, CurriculumSubStrand>();
const questsMap = new Map<string, CurriculumQuest>();
const questionsMap = new Map<string, CurriculumQuestion>();

// Build the index
ALL_CURRICULUM_GRADES.forEach(grade => {
  gradesMap.set(grade.id, grade);
  grade.subjects.forEach(subject => {
    subjectsMap.set(subject.id, subject);
    subject.strands.forEach(strand => {
      strandsMap.set(strand.id, strand);
      strand.subStrands.forEach(subStrand => {
        subStrandsMap.set(subStrand.id, subStrand);
        subStrand.quests.forEach(quest => {
          questsMap.set(quest.id, quest);
          quest.questions.forEach(question => {
            questionsMap.set(question.id, question);
          });
        });
      });
    });
  });
});

// Run validation once to guarantee schema consistency at startup
let cachedValidationReport: ValidationReport | null = null;

export function getCurriculumValidationReport(): ValidationReport {
  if (!cachedValidationReport) {
    cachedValidationReport = validateCurriculum(ALL_CURRICULUM_GRADES);
  }
  return cachedValidationReport;
}

// --- Query Functions ---

export function getAllGrades(): CurriculumGrade[] {
  return getAllComprehensiveGrades();
}

export function getGrade(gradeId: string): CurriculumGrade | undefined {
  const comp = getComprehensiveGrade(gradeId);
  if (comp) return comp;
  const normalized = gradeId.replace('_', '-');
  const withHyphen = normalized.includes('grade-') ? normalized : normalized.replace('grade', 'grade-');
  return gradesMap.get(gradeId) || gradesMap.get(normalized) || gradesMap.get(withHyphen) || gradesMap.get('grade-4') || ALL_CURRICULUM_GRADES[1];
}

export const getCurriculumGrade = getGrade;

export function getSubjectsForGrade(
  gradeId: string,
  options?: {
    religiousStream?: ReligiousEducationStream;
    includeOptional?: boolean;
  }
): CurriculumSubject[] {
  const grade = getGrade(gradeId);
  if (!grade) return [];

  return grade.subjects.filter(subj => {
    // Check optional filter
    if (subj.isOptional && !options?.includeOptional) {
      return false;
    }
    // Check religious stream filter if specified
    if (subj.religiousEducationStream && options?.religiousStream) {
      return subj.religiousEducationStream === options.religiousStream;
    }
    return true;
  });
}

export function getSubject(subjectId: string): CurriculumSubject | undefined {
  return getComprehensiveSubject(subjectId) || subjectsMap.get(subjectId);
}

export function getStrandsForSubject(subjectId: string): CurriculumStrand[] {
  const subj = getSubject(subjectId);
  return subj ? subj.strands : [];
}

export function getStrand(strandId: string): CurriculumStrand | undefined {
  return getComprehensiveStrand(strandId) || strandsMap.get(strandId);
}

export function getSubStrandsForStrand(strandId: string): CurriculumSubStrand[] {
  const strand = getStrand(strandId);
  return strand ? strand.subStrands : [];
}

export function getSubStrand(subStrandId: string): CurriculumSubStrand | undefined {
  return getComprehensiveSubStrand(subStrandId) || subStrandsMap.get(subStrandId);
}

export function getQuestsForSubStrand(subStrandId: string): CurriculumQuest[] {
  const ss = getSubStrand(subStrandId);
  return ss ? ss.quests : [];
}

export function getQuest(questId: string): CurriculumQuest | undefined {
  const fromMap = questsMap.get(questId);
  if (fromMap && fromMap.questions && fromMap.questions.length > 0) {
    return fromMap;
  }
  return getComprehensiveQuest(questId) || fromMap;
}

export const getCurriculumQuest = getQuest;

export function getAllQuests(): CurriculumQuest[] {
  return getAllComprehensiveQuests();
}

export function getQuestion(questionId: string): CurriculumQuestion | undefined {
  return questionsMap.get(questionId);
}

// Cross-subject topic search
export function searchCurriculum(
  query: string,
  gradeId?: string
): {
  subject: CurriculumSubject;
  strand: CurriculumStrand;
  subStrand: CurriculumSubStrand;
  quest: CurriculumQuest;
  matchedText: string;
}[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: {
    subject: CurriculumSubject;
    strand: CurriculumStrand;
    subStrand: CurriculumSubStrand;
    quest: CurriculumQuest;
    matchedText: string;
  }[] = [];

  const gradesToSearch = gradeId ? [getGrade(gradeId)].filter(Boolean) as CurriculumGrade[] : getAllGrades();

  gradesToSearch.forEach(grade => {
    grade.subjects.forEach(subject => {
      subject.strands.forEach(strand => {
        strand.subStrands.forEach(subStrand => {
          subStrand.quests.forEach(quest => {
            const matchesTitle = (quest.title?.en && quest.title.en.toLowerCase().includes(q)) || (quest.title?.sw && quest.title.sw.toLowerCase().includes(q));
            const matchesStory = (quest.storyContext?.en && quest.storyContext.en.toLowerCase().includes(q)) || (quest.storyContext?.sw && quest.storyContext.sw.toLowerCase().includes(q));
            const matchesSubStrand = (subStrand.title?.en && subStrand.title.en.toLowerCase().includes(q)) || (subStrand.title?.sw && subStrand.title.sw.toLowerCase().includes(q));
            const matchesSubject = (subject.title?.en && subject.title.en.toLowerCase().includes(q)) || (subject.title?.sw && subject.title.sw.toLowerCase().includes(q));

            if (matchesTitle || matchesStory || matchesSubStrand || matchesSubject) {
              results.push({
                subject,
                strand,
                subStrand,
                quest,
                matchedText: matchesTitle ? quest.title.en : matchesSubStrand ? subStrand.title.en : subject.title.en
              });
            }
          });
        });
      });
    });
  });

  return results;
}

export const searchCurriculumTopics = searchCurriculum;

// Spaced repetition & Adaptive: recommend next quest
export function getRecommendedNextQuest(
  gradeId: string,
  completedQuestIds: string[],
  weakStrandIds: string[] = []
): CurriculumQuest {
  const subjects = getSubjectsForGrade(gradeId);

  // 1. If user has weak strands, find first uncompleted quest in weak strand
  for (const strandId of weakStrandIds) {
    const strand = strandsMap.get(strandId);
    if (strand) {
      for (const ss of strand.subStrands) {
        for (const q of ss.quests) {
          if (!completedQuestIds.includes(q.id)) {
            const enriched = questsMap.get(q.id);
            if (enriched && enriched.questions && enriched.questions.length > 0) {
              return enriched;
            }
            return q;
          }
        }
      }
    }
  }

  // 2. Otherwise find the first uncompleted quest in the grade
  // Check ALL_CURRICULUM_GRADES first to prefer quests with rich question banks
  const seedGrade = ALL_CURRICULUM_GRADES.find(g => g.id === gradeId);
  if (seedGrade) {
    for (const subject of seedGrade.subjects) {
      for (const strand of subject.strands) {
        for (const ss of strand.subStrands) {
          for (const q of ss.quests) {
            if (!completedQuestIds.includes(q.id) && q.questions && q.questions.length > 0) {
              return q;
            }
          }
        }
      }
    }
  }

  for (const subject of subjects) {
    for (const strand of subject.strands) {
      for (const ss of strand.subStrands) {
        for (const q of ss.quests) {
          if (!completedQuestIds.includes(q.id)) {
            const enriched = questsMap.get(q.id);
            return enriched || q;
          }
        }
      }
    }
  }

  // 3. Fallback to canonical mission
  return questsMap.get('mission-01-seedlings') || Array.from(questsMap.values())[0];
}

export function getRecommendedNextQuestDetails(
  gradeId: string,
  completedQuestIds: string[],
  weakStrandIds: string[] = []
): { quest: CurriculumQuest; subject: CurriculumSubject; strand: CurriculumStrand; subStrand: CurriculumSubStrand } | null {
  const quest = getRecommendedNextQuest(gradeId, completedQuestIds, weakStrandIds);
  if (!quest) return null;
  const grade = getCurriculumGrade(gradeId);
  if (grade) {
    for (const subj of grade.subjects) {
      for (const st of subj.strands) {
        for (const ss of st.subStrands) {
          if (ss.quests.some(q => q.id === quest.id)) {
            return { quest, subject: subj, strand: st, subStrand: ss };
          }
        }
      }
    }
  }
  return null;
}

// Rotating daily challenge quest drawn across subjects
export function getDailyChallengeQuest(gradeId: string, dateString?: string): CurriculumQuest {
  const subjects = getSubjectsForGrade(gradeId);
  const allQuestsInGrade: CurriculumQuest[] = [];

  subjects.forEach(s => {
    s.strands.forEach(st => {
      st.subStrands.forEach(ss => {
        allQuestsInGrade.push(...ss.quests);
      });
    });
  });

  if (allQuestsInGrade.length === 0) {
    return Array.from(questsMap.values())[0];
  }

  // Hash the date to pick a deterministic quest for the day
  const d = dateString || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    hash = (hash << 5) - hash + d.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % allQuestsInGrade.length;
  return allQuestsInGrade[index];
}
