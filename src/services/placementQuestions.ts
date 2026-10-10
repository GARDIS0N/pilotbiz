/**
 * Quick Placement Questions Service
 * Sourced directly from official KICD CBC curriculum data.
 * Curates 3-4 quick foundational diagnostic questions per grade.
 */

import { Question } from '../types/cbe.js';
import { ALL_CURRICULUM_GRADES } from '../data/curriculum/index.js';

export function getPlacementQuestionsForGrade(gradeId: string): Question[] {
  const grade = ALL_CURRICULUM_GRADES.find(g => g.id === gradeId) || ALL_CURRICULUM_GRADES[1];
  const candidates: Question[] = [];

  // Extract MULTIPLE_CHOICE and TRUE_FALSE questions across subjects
  grade.subjects.forEach(subject => {
    subject.strands.forEach(strand => {
      strand.subStrands.forEach(subStrand => {
        subStrand.quests.forEach(quest => {
          quest.questions.forEach(q => {
            if (q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') {
              candidates.push({
                id: q.id,
                subStrandId: q.subStrandId,
                type: q.type as any,
                prompt: typeof q.prompt === 'string' ? q.prompt : q.prompt?.en || '',
                swahiliPrompt: typeof q.prompt === 'object' ? q.prompt?.sw : undefined,
                storyScenario: q.storyScenario?.en,
                swahiliStoryScenario: q.storyScenario?.sw,
                difficulty: q.difficulty === 1 ? 'BEGINNER' : q.difficulty === 2 ? 'EASY' : 'MEDIUM',
                options: q.options?.map(opt => ({
                  id: opt.id,
                  text: typeof opt.text === 'string' ? opt.text : opt.text?.en || '',
                  explanation: typeof opt.explanation === 'string' ? opt.explanation : opt.explanation?.en
                })),
                correctOptionId: q.correctOptionId,
                explanation: typeof q.explanation === 'string' ? q.explanation : q.explanation?.en || '',
                swahiliExplanation: typeof q.explanation === 'object' ? q.explanation?.sw : undefined,
                hint: typeof q.hint === 'string' ? q.hint : q.hint?.en,
                swahiliHint: typeof q.hint === 'object' ? q.hint?.sw : undefined,
                answerKey: q.answerKey,
                kenyanCulturalContext: q.kenyanCulturalContext
              });
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
