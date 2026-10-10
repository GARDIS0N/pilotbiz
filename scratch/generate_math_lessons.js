import fs from 'fs';

const json = JSON.parse(fs.readFileSync('src/data/curriculum/content/grade3_math_numbers.json', 'utf8'));

const avatars = ['lion', 'cheetah', 'elephant', 'zebra', 'giraffe', 'lion', 'cheetah', 'elephant'];
const characters = ['Baraka', 'Auma', 'Mwangi', 'Wanjiku', 'Zawadi', 'Otieno', 'Moraa', 'Juma'];

const subStrandDefs = [
  {
    id: 'substrand-math-g3-add',
    strandId: 'strand-math-g3-numbers',
    code: 'MATH-G3-SUB-01',
    title: { en: 'Addition within 1,000', sw: 'Kujumlisha hadi 1,000' },
    description: { en: 'Adding 3-digit numbers with and without regrouping in Kenyan contexts.', sw: 'Kujumlisha nambari za tarakimu 3 bila na kwa kubadili.' },
    order: 1,
    lessonIndices: [0, 1]
  },
  {
    id: 'substrand-math-g3-sub',
    strandId: 'strand-math-g3-numbers',
    code: 'MATH-G3-SUB-02',
    title: { en: 'Subtraction within 1,000', sw: 'Kutoa hadi 1,000' },
    description: { en: 'Subtracting 3-digit numbers with place value decomposition and regrouping.', sw: 'Kutoa nambari zenye tarakimu 3 kwa kubadili thamani ya nafasi.' },
    order: 2,
    lessonIndices: [2, 3]
  },
  {
    id: 'substrand-math-g3-mult',
    strandId: 'strand-math-g3-numbers',
    code: 'MATH-G3-SUB-03',
    title: { en: 'Simple Multiplication', sw: 'Kuzidisha Rahisi' },
    description: { en: 'Repeated addition of equal groups and multiplication tables 2, 3, 4, 5, 10.', sw: 'Kujumlisha makundi sawa na jedwali za kuzidisha 2, 3, 4, 5, na 10.' },
    order: 3,
    lessonIndices: [4, 5]
  },
  {
    id: 'substrand-math-g3-money',
    strandId: 'strand-math-g3-numbers',
    code: 'MATH-G3-SUB-04',
    title: { en: 'Kenyan Money & Shopping', sw: 'Pesa za Kenya na Ununuzi' },
    description: { en: 'Coins and banknotes up to Ksh 1,000, calculating shopping totals and giving change.', sw: 'Sarafu na noti hadi Sh 1,000, kukokotoa jumla ya manunuzi na chenji.' },
    order: 4,
    lessonIndices: [6, 7]
  }
];

function mapQuestion(q, subStrandId) {
  let type = 'MULTIPLE_CHOICE';
  let options = undefined;
  let correctOptionId = undefined;
  let correctBoolean = undefined;
  let numericAnswer = undefined;
  let fillBlankAnswers = undefined;
  let matchingPairs = undefined;
  let correctOrderIds = undefined;
  let audioSpeechPrompt = undefined;

  switch (q.type) {
    case 'multiple_choice':
      type = 'MULTIPLE_CHOICE';
      correctOptionId = q.answer;
      options = q.options?.map(opt => ({
        id: opt.id,
        text: opt.text,
        explanation: opt.why_wrong || { en: 'Correct answer!', sw: 'Jibu sahihi!' }
      }));
      break;

    case 'true_false':
      type = 'TRUE_FALSE';
      correctBoolean = q.answer === true;
      break;

    case 'number_input':
      type = 'NUMBER_ENTRY';
      numericAnswer = { value: Number(q.answer), unit: '' };
      break;

    case 'fill_blank':
      type = 'FILL_BLANK';
      fillBlankAnswers = q.accepted || [String(q.answer)];
      break;

    case 'match_pairs':
      type = 'MATCHING';
      matchingPairs = q.pairs.map((p, idx) => ({
        leftId: 'p' + idx,
        leftText: p.left,
        rightId: 'p' + idx,
        rightText: p.right
      }));
      break;

    case 'order_steps':
      type = 'ORDERING';
      correctOrderIds = q.answer;
      options = q.items.map(it => ({
        id: it.id,
        text: it.text
      }));
      break;

    case 'listen_pick':
      type = 'LISTEN_CHOOSE';
      correctOptionId = q.answer;
      audioSpeechPrompt = { textToSpeak: q.audio_text, language: 'en-KE' };
      options = q.options?.map(opt => ({
        id: opt.id,
        text: opt.text,
        explanation: opt.why_wrong || { en: 'Correct!', sw: 'Sahihi!' }
      }));
      break;

    case 'money_make':
      type = 'KENYAN_MONEY';
      numericAnswer = { value: q.target_ksh, unit: 'KES' };
      break;
  }

  return {
    id: q.id,
    subStrandId: subStrandId,
    type: type,
    prompt: q.prompt,
    difficulty: q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 2 : 3,
    strandTag: 'MATH-G3-NUM',
    options,
    correctOptionId,
    correctBoolean,
    numericAnswer,
    fillBlankAnswers,
    matchingPairs,
    correctOrderIds,
    audioSpeechPrompt,
    explanation: q.explanation,
    socraticHint: q.hint,
    kenyanCulturalContext: 'Authentic Kenyan CBC Grade 3 Activity',
    sourceStatus: 'OFFICIAL_KICD'
  };
}

const subStrands = subStrandDefs.map(ssd => {
  const quests = ssd.lessonIndices.map((lIdx, qIdx) => {
    const lesson = json.lessons[lIdx];
    const prevQuestId = lIdx === 0 ? [] : [json.lessons[lIdx - 1].id];
    return {
      id: lesson.id,
      subStrandId: ssd.id,
      order: qIdx + 1,
      title: lesson.title,
      storyContext: {
        en: lesson.learning_outcome.en + ' Guided by ' + characters[lIdx] + '.',
        sw: lesson.learning_outcome.sw + ' Ukiongozwa na ' + characters[lIdx] + '.'
      },
      characterName: characters[lIdx],
      characterAvatar: avatars[lIdx],
      difficulty: lIdx % 2 === 0 ? 1 : 2,
      estimatedMinutes: lesson.minutes || 6,
      xpReward: 35,
      coinReward: 15,
      cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy'],
      cbeValues: ['Responsibility', 'Integrity'],
      prerequisiteQuestIds: prevQuestId,
      teachCards: lesson.teach_cards?.map(tc => ({
        heading: tc.heading,
        body: tc.body,
        workedExample: tc.worked_example,
        imagePrompt: tc.image_prompt
      })) || [],
      questions: lesson.questions.map(q => mapQuestion(q, ssd.id)),
      sourceStatus: 'OFFICIAL_KICD'
    };
  });

  return {
    id: ssd.id,
    strandId: ssd.strandId,
    code: ssd.code,
    title: ssd.title,
    description: ssd.description,
    order: ssd.order,
    prerequisiteIds: ssd.order === 1 ? [] : [subStrandDefs[ssd.order - 2].id],
    cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy', 'Learning to learn'],
    cbeValues: ['Responsibility', 'Integrity', 'Unity'],
    estimatedMinutes: 25,
    quests: quests,
    sourceStatus: 'OFFICIAL_KICD'
  };
});

// Boss quest for Strand Test
const bossQuestions = json.strand_test.questions.map(q => mapQuestion(q, 'substrand-math-g3-mastery'));
const bossSubStrand = {
  id: 'substrand-math-g3-mastery',
  strandId: 'strand-math-g3-numbers',
  code: 'MATH-G3-SUB-05',
  title: { en: 'Numbers Mastery & Strand Test', sw: 'Mtihani wa Umilisi wa Nambari' },
  description: { en: 'Grand 15-question mixed assessment across addition, subtraction, multiplication, and money.', sw: 'Tathmini kuu ya maswali 15 ya mchanganyiko wa kujumlisha, kutoa, kuzidisha, na pesa.' },
  order: 5,
  prerequisiteIds: ['substrand-math-g3-money'],
  cbeCompetencies: ['Critical thinking and problem solving', 'Self-efficacy'],
  cbeValues: ['Integrity', 'Responsibility'],
  estimatedMinutes: 20,
  quests: [
    {
      id: 'g3-math-num-test',
      subStrandId: 'substrand-math-g3-mastery',
      order: 1,
      title: { en: 'Numbers Strand Grand Challenge', sw: 'Changamoto Kuu ya Nambari' },
      storyContext: {
        en: 'Test all your math skills with Rafiki to earn the Gold Numbers Badge!',
        sw: 'Jaribu stadi zako zote za hisabati na Rafiki upate Nishani ya Dhahabu ya Nambari!'
      },
      characterName: 'Rafiki',
      characterAvatar: 'lion',
      difficulty: 3,
      estimatedMinutes: 15,
      xpReward: 100,
      coinReward: 50,
      cbeCompetencies: ['Critical thinking and problem solving', 'Self-efficacy'],
      cbeValues: ['Integrity', 'Responsibility'],
      prerequisiteQuestIds: ['g3-math-num-08'],
      badgeUnlockId: 'badge-g3-math-mastery',
      isBossChallenge: true,
      teachCards: [],
      questions: bossQuestions,
      sourceStatus: 'OFFICIAL_KICD'
    }
  ],
  sourceStatus: 'OFFICIAL_KICD'
};

subStrands.push(bossSubStrand);

const headerStr = '// Grade 3 Mathematical Activities - Numbers Strand (KICD CBC Aligned)\n' +
  '// Generated from verified curriculum content data layer.\n' +
  "import { CurriculumSubStrand, CurriculumStrand } from '../types.js';\n\n" +
  'export const grade3NumbersSubStrands: CurriculumSubStrand[] = ' +
  JSON.stringify(subStrands, null, 2) + ';\n\n' +
  'export const grade3NumbersStrand: CurriculumStrand = {\n' +
  "  id: 'strand-math-g3-numbers',\n" +
  "  subjectId: 'math-act-g3',\n" +
  "  code: 'MATH-G3-STR-01',\n" +
  "  title: { en: 'Numbers within 1,000 & Kenyan Money', sw: 'Nambari hadi 1,000 na Pesa za Kenya' },\n" +
  '  description: {\n' +
  "    en: 'Addition, subtraction, multiplication, and currency with 8 CBC lessons and strand mastery.',\n" +
  "    sw: 'Kujumlisha, kutoa, kuzidisha na sarafu kupitia masomo 8 ya CBC na mtihani wa umilisi.'\n" +
  '  },\n' +
  "  icon: 'Hash',\n" +
  '  order: 1,\n' +
  '  prerequisiteIds: [],\n' +
  "  sourceStatus: 'OFFICIAL_KICD',\n" +
  '  subStrands: grade3NumbersSubStrands\n' +
  '};\n';

fs.writeFileSync('src/data/curriculum/grades/grade3MathLessons.ts', headerStr, 'utf8');
console.log('SUCCESS! Generated src/data/curriculum/grades/grade3MathLessons.ts with', subStrands.length, 'substrands.');
