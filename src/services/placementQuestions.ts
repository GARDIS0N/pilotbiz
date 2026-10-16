/**
 * Quick Placement / Level Check Questions Service
 * Sourced directly from official KICD CBC curriculum data.
 * Curates 3-5 high-confidence foundational diagnostic questions
 * tailored to the child's chosen grade and top interest subject.
 */

import { Question } from '../types/cbe.js';
import { ALL_CURRICULUM_GRADES, normalizeContentQuestion, hasUsableAnswerKey } from '../data/curriculum/index.js';

function matchesInterest(subjectId: string, subjectTitle: string, interestId?: string): boolean {
  if (!interestId) return true;
  const sId = subjectId.toLowerCase();
  const sTitle = subjectTitle.toLowerCase();
  const key = interestId.toLowerCase();

  if (key === 'math') {
    return sId.includes('math') || sTitle.includes('math') || sTitle.includes('hisabati');
  }
  if (key === 'english') {
    return sId.includes('eng') || sTitle.includes('english') || sTitle.includes('kiingereza');
  }
  if (key === 'kiswahili') {
    return sId.includes('kisw') || sTitle.includes('kiswahili');
  }
  if (key === 'science') {
    return sId.includes('sci') || sId.includes('env') || sTitle.includes('science') || sTitle.includes('sayansi') || sTitle.includes('mazingira');
  }
  if (key === 'social') {
    return sId.includes('soc') || sId.includes('agri') || sTitle.includes('social') || sTitle.includes('jamii') || sTitle.includes('kilimo');
  }

  return sId.includes(key) || sTitle.includes(key);
}

export function getPlacementQuestionsForGrade(gradeId: string, primaryInterestId?: string): Question[] {
  const grade = ALL_CURRICULUM_GRADES.find(g => g.id === gradeId) || ALL_CURRICULUM_GRADES[1];
  const primaryCandidates: Question[] = [];
  const secondaryCandidates: Question[] = [];

  grade.subjects.forEach(subject => {
    const isPreferredSubject = matchesInterest(subject.id, subject.title?.en || '', primaryInterestId);

    subject.strands.forEach(strand => {
      strand.subStrands.forEach(subStrand => {
        subStrand.quests.forEach(quest => {
          quest.questions.forEach(rawQ => {
            const q = normalizeContentQuestion(rawQ, subStrand.id);
            if ((q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') && hasUsableAnswerKey(q)) {
              if (isPreferredSubject) {
                primaryCandidates.push(q);
              } else {
                secondaryCandidates.push(q);
              }
            }
          });
        });
      });
    });
  });

  // Sort candidates to prioritize beginner/easy questions for instant confidence
  const sortConfidence = (a: Question, b: Question) => {
    const diffRank = { BEGINNER: 0, EASY: 1, MEDIUM: 2, ADVANCED: 3, MASTERY: 4 };
    return (diffRank[a.difficulty] ?? 2) - (diffRank[b.difficulty] ?? 2);
  };

  primaryCandidates.sort(sortConfidence);
  secondaryCandidates.sort(sortConfidence);

  // Pick up to 4 questions from the child's top interest, padding with secondary if needed
  const selected: Question[] = [];
  for (const q of primaryCandidates) {
    if (selected.length >= 4) break;
    selected.push(q);
  }

  if (selected.length < 3) {
    for (const q of secondaryCandidates) {
      if (selected.length >= 4) break;
      selected.push(q);
    }
  }

  // Guaranteed fallback question if curriculum dataset had sparse questions for a new grade
  if (selected.length === 0) {
    selected.push({
      id: `placement-quick-${gradeId}-1`,
      subStrandId: 'placement-sub',
      type: 'MULTIPLE_CHOICE',
      prompt: 'Rafiki says: Which Kenyan animal runs the fastest?',
      swahiliPrompt: 'Rafiki anauliza: Ni mnyama yupi wa Kenya anayekimbia kwa kasi zaidi?',
      difficulty: 'BEGINNER',
      options: [
        { id: 'opt-cheetah', text: 'Cheetah (Duma)' },
        { id: 'opt-tortoise', text: 'Tortoise (Kobe)' },
        { id: 'opt-elephant', text: 'Elephant (Tembo)' }
      ],
      correctOptionId: 'opt-cheetah',
      explanation: 'Cheetahs can run up to 120 km/h in the Kenyan savanna!',
      swahiliExplanation: 'Duma anaweza kukimbia hadi kilomita 120 kwa saa katika mbuga za Kenya!',
      socraticHint: 'Think about the spotted cat known for high-speed chasing.',
      kenyanCulturalContext: 'Cheetahs are famous residents of the Maasai Mara.',
      sourceType: 'CURRICULUM_ALIGNED'
    });
  }

  return selected.slice(0, 4);
}
