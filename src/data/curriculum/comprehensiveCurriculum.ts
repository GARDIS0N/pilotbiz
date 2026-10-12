import {
  CurriculumGrade,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest
} from './types.js';
import { comprehensiveCurriculumData } from './comprehensiveCurriculumData.js';

const comprehensiveGrades = comprehensiveCurriculumData;

const comprehensiveGradesMap = new Map<string, CurriculumGrade>();
const comprehensiveSubjectsMap = new Map<string, CurriculumSubject>();
const comprehensiveStrandsMap = new Map<string, CurriculumStrand>();
const comprehensiveSubStrandsMap = new Map<string, CurriculumSubStrand>();
const comprehensiveQuestsMap = new Map<string, CurriculumQuest>();

comprehensiveGrades.forEach((g: any) => {
  comprehensiveGradesMap.set(g.id, g);
  comprehensiveGradesMap.set(g.id.replace('grade-', 'grade'), g);
  comprehensiveGradesMap.set(g.id.replace('grade-', 'g'), g);

  g.subjects.forEach((subject: any) => {
    comprehensiveSubjectsMap.set(subject.id, subject);
    subject.strands.forEach((strand: any) => {
      comprehensiveStrandsMap.set(strand.id, strand);
      strand.subStrands.forEach((subStrand: any) => {
        comprehensiveSubStrandsMap.set(subStrand.id, subStrand);
        subStrand.quests.forEach((quest: any) => {
          comprehensiveQuestsMap.set(quest.id, quest);
        });
      });
    });
  });
});

export function getComprehensiveGrade(gradeId: string): CurriculumGrade | undefined {
  const normalizedId = gradeId.includes('grade-') ? gradeId : `grade-${gradeId.replace('grade', '')}`;
  return comprehensiveGradesMap.get(normalizedId) || comprehensiveGradesMap.get(gradeId) || comprehensiveGrades[1];
}

export function getAllComprehensiveGrades(): CurriculumGrade[] {
  return comprehensiveGrades;
}

export function getComprehensiveSubject(subjectId: string): CurriculumSubject | undefined {
  return comprehensiveSubjectsMap.get(subjectId);
}

export function getComprehensiveStrand(strandId: string): CurriculumStrand | undefined {
  return comprehensiveStrandsMap.get(strandId);
}

export function getComprehensiveSubStrand(subStrandId: string): CurriculumSubStrand | undefined {
  return comprehensiveSubStrandsMap.get(subStrandId);
}

export function getComprehensiveQuest(questId: string): CurriculumQuest | undefined {
  return comprehensiveQuestsMap.get(questId);
}

export function getAllComprehensiveQuests(): CurriculumQuest[] {
  return Array.from(comprehensiveQuestsMap.values());
}
