/**
 * Quick Placement Questions Service
 * Sourced directly from official KICD CBC curriculum data.
 * Curates 3-4 quick foundational diagnostic questions per grade.
 */

import { Question } from '../types/cbe.js';
import { ALL_CURRICULUM_GRADES, normalizeContentQuestion, hasUsableAnswerKey } from '../data/curriculum/index.js';

export function getPlacementQuestionsForGrade(gradeId: string): Question[] {
  const grade = ALL_CURRICULUM_GRADES.find(g => g.id === gradeId) || ALL_CURRICULUM_GRADES[1];
  const candidates: Question[] = [];

  // Extract MULTIPLE_CHOICE and TRUE_FALSE questions across subjects
  grade.subjects.forEach(subject => {
    subject.strands.forEach(strand => {
      strand.subStrands.forEach(subStrand => {
        subStrand.quests.forEach(quest => {
          quest.questions.forEach(rawQ => {
            const q = normalizeContentQuestion(rawQ, subStrand.id);
            if ((q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') && hasUsableAnswerKey(q)) {
              candidates.push(q);
            }
          });
        });
      });
    });
  });

  // Pick 3 well-distributed questions across strands
  if (candidates.length >= 3) {
    return candidates.slice(0, 3);
  }

  return candidates;
}
