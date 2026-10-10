import { getCurriculumGrade, getCurriculumQuest } from '../src/data/curriculum/index.js';

const g3 = getCurriculumGrade('grade-3');
console.log('Grade 3 Name:', g3?.name.en);
const math = g3?.subjects.find(s => s.id === 'math-act-g3');
console.log('Math Strands:', math?.strands.map(s => s.title.en));

const numStrand = math?.strands.find(s => s.id === 'strand-math-g3-numbers');
console.log('Numbers Sub-strands count:', numStrand?.subStrands.length);
numStrand?.subStrands.forEach(ss => {
  console.log('  * SubStrand:', ss.title.en, '(' + ss.quests.length + ' quests)');
  ss.quests.forEach(q => {
    console.log('     - Quest:', q.id, '|', q.title.en, '| Questions:', q.questions.length, '| TeachCards:', q.teachCards?.length || 0);
  });
});

const q1 = getCurriculumQuest('g3-math-num-01');
const q8 = getCurriculumQuest('g3-math-num-08');
const qTest = getCurriculumQuest('g3-math-num-test');

console.log('Lookup q1:', !!q1, q1?.title.en);
console.log('Lookup q8:', !!q8, q8?.title.en);
console.log('Lookup qTest:', !!qTest, qTest?.title.en);

if (q1 && q8 && qTest) {
  console.log('ALL CURRICULUM LOOKUPS VERIFIED 100% SUCCESS!');
} else {
  process.exit(1);
}
