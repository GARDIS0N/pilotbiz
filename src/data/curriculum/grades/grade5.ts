// Grade 5 (Upper Primary) Curriculum Design & Seed Data
// Aligned to Kenya CBC Upper Primary Grade 5 structure.

import { CurriculumGrade, CurriculumSubject } from '../types.js';

export const grade5Subjects: CurriculumSubject[] = [
  // 1. Mathematics
  {
    id: 'la-math-g5',
    gradeId: 'grade-5',
    code: 'MATH-G5',
    title: { en: 'Mathematics', sw: 'Hisabati' },
    description: {
      en: 'Factors, multiples, decimals, percentages, perimeter, area, and financial budgeting.',
      sw: 'Vigawe, vigaio, desimali, asilimia, mzingo, eneo, na bajeti ya fedha.'
    },
    icon: 'Calculator',
    color: '#10b981',
    bannerGradient: 'from-emerald-600 to-teal-800',
    order: 1,
    prerequisiteIds: ['la-math-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-math-g5-num',
        subjectId: 'la-math-g5',
        code: 'MATH-G5-STR-01',
        title: { en: 'Factors and Multiples', sw: 'Vigawe na Vigaio' },
        description: {
          en: 'Greatest Common Divisor (GCD) and Least Common Multiple (LCM) in practical sharing.',
          sw: 'Kigawe Kikubwa cha Shirika (KKS) na Kigaio Kidogo cha Shirika (KDS).'
        },
        icon: 'Hash',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-math-g5-lcm',
            strandId: 'strand-math-g5-num',
            code: 'MATH-G5-SUB-01',
            title: { en: 'Finding the LCM', sw: 'Kutafuta Kigaio Kidogo cha Shirika' },
            description: {
              en: 'Determine common multiples of numbers 2, 3, 4, 6 and solve timing problems.',
              sw: 'Kutambua vigaio vya kawaida vya nambari na kutatua changamoto za wakati.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving'],
            cbeValues: ['Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-math-g5-matatu-timing',
                subStrandId: 'substrand-math-g5-lcm',
                order: 1,
                title: { en: 'The Matatu Departure Schedule', sw: 'Ratiba ya Magari ya Matatu' },
                storyContext: {
                  en: 'Brian helps the bus station supervisor calculate when two matatus to Nakuru and Kisumu will leave together.',
                  sw: 'Brian anamsaidia msimamizi wa kituo cha matatu kujua wakati matatu mbili zitaondoka pamoja.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 2,
                estimatedMinutes: 12,
                xpReward: 50,
                coinReward: 25,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-math-01',
                    subStrandId: 'substrand-math-g5-lcm',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'Matatu A departs every 4 minutes. Matatu B departs every 6 minutes. What is the Least Common Multiple (LCM) in minutes when both depart together?',
                      sw: 'Matatu A huondoka kila baada ya dakika 4. Matatu B huondoka kila baada ya dakika 6. Je, ni Kigaio gani Kidogo cha Shirika (LCM) cha dakika ambapo zitaondoka pamoja?'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G5-NUM',
                    numericAnswer: { value: 12, unit: 'minutes' },
                    explanation: {
                      en: 'Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The smallest shared multiple is 12 minutes.',
                      sw: 'Vigaio vya 4: 4, 8, 12... Vigaio vya 6: 6, 12... Nambari ndogo inayojirudia kwa zote mbili ni 12.'
                    },
                    socraticHint: {
                      en: 'List the multiples of 4 and 6. Which number appears first in both lists?',
                      sw: 'Orodhesha vigaio vya 4 na 6. Ni nambari gani inatokea ya kwanza katika orodha zote mbili?'
                    },
                    kenyanCulturalContext: 'Matatu transit hubs across Kenyan towns require precise scheduling.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-math-02',
                    subStrandId: 'substrand-math-g5-lcm',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Farmer Kiprono sold 10 bags of maize for KES 2,500 each. What was his total sales revenue?',
                      sw: 'Mkulima Kiprono aliuza magunia 10 ya mahindi kwa KES 2,500 kila moja. Je, alipata jumla ya mapato gani?'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G5-MONEY',
                    options: [
                      { id: 'opt-1', text: { en: 'KES 25,000', sw: 'KES 25,000' } },
                      { id: 'opt-2', text: { en: 'KES 2,500', sw: 'KES 2,500' } },
                      { id: 'opt-3', text: { en: 'KES 250,000', sw: 'KES 250,000' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: '10 bags × KES 2,500 = KES 25,000.',
                      sw: 'Magunia 10 × KES 2,500 = KES 25,000.'
                    },
                    socraticHint: {
                      en: 'When multiplying by 10, shift the digits one place to the left and add a zero.',
                      sw: 'Unapozidisha kwa 10, ongeza sifuri moja mwishoni mwa nambari.'
                    },
                    kenyanCulturalContext: 'Maize sales at agricultural cooperatives build rural family livelihood.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-math-g5-perimeter',
                subStrandId: 'substrand-math-g5-lcm',
                order: 2,
                title: { en: 'Fencing the School Garden', sw: 'Kuzungusha Uzio Bustanini' },
                storyContext: {
                  en: 'Calculate the perimeter of a rectangular garden measuring 20 metres long by 10 metres wide.',
                  sw: 'Piga hesabu ya mzingo wa bustani ya mstatili yenye urefu wa mita 20 na upana wa mita 10.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-math-g5-matatu-timing'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-math-03',
                    subStrandId: 'substrand-math-g5-lcm',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'A rectangular garden is 20m long and 10m wide. What is its perimeter in metres?',
                      sw: 'Bustani ya mstatili ina urefu wa mita 20 na upana wa mita 10. Mzingo wake ni mita ngapi?'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G5-MEASURE',
                    numericAnswer: { value: 60, unit: 'metres' },
                    explanation: {
                      en: 'Perimeter = 2 × (Length + Width) = 2 × (20 + 10) = 2 × 30 = 60 metres.',
                      sw: 'Mzingo = 2 × (Urefu + Upana) = 2 × (20 + 10) = mita 60.'
                    },
                    socraticHint: {
                      en: 'Add all four sides: 20 + 10 + 20 + 10.',
                      sw: 'Jumlisha pande zote nne: 20 + 10 + 20 + 10.'
                    },
                    kenyanCulturalContext: 'Measuring perimeters protects crop nurseries from stray livestock.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 2. English (Grade 5)
  {
    id: 'la-eng-g5',
    gradeId: 'grade-5',
    code: 'ENG-G5',
    title: { en: 'English', sw: 'Kiingereza' },
    description: {
      en: 'Direct & indirect speech, prefixes, narrative essays, and debates.',
      sw: 'Kauli halisi na taarifa, viambishi awali, insha za masimulizi na mijadala.'
    },
    icon: 'BookOpen',
    color: '#8b5cf6',
    bannerGradient: 'from-violet-600 to-indigo-800',
    order: 2,
    prerequisiteIds: ['la-eng-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-eng-g5-grammar',
        subjectId: 'la-eng-g5',
        code: 'ENG-G5-STR-01',
        title: { en: 'Grammar and Expression', sw: 'Sarufi na Kujieleza' },
        description: {
          en: 'Adjectives of comparison, adverbs of manner, and debating etiquette.',
          sw: 'Vivumishi vya kulinganisha na mbinu za mdahalo.'
        },
        icon: 'FileText',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-eng-g5-debate',
            strandId: 'strand-eng-g5-grammar',
            code: 'ENG-G5-SUB-01',
            title: { en: 'Classroom Debate & Arguments', sw: 'Mdahalo wa Darasani na Hoja' },
            description: {
              en: 'Express supported opinions politely on environmental conservation.',
              sw: 'Kutoa maoni kwa staha kuhusu utunzaji wa mazingira.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration', 'Critical thinking and problem solving'],
            cbeValues: ['Respect', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-eng-g5-debate-trees',
                subStrandId: 'substrand-eng-g5-debate',
                order: 1,
                title: { en: 'The Great School Debate', sw: 'Mdahalo Mkuu wa Shule' },
                storyContext: {
                  en: 'Amina presents her speech arguing why school tree nurseries protect our water catchment areas.',
                  sw: 'Amina anatoa hotuba yake akitetea kwa nini kitalu cha miti kinalinda vyanzo vya maji.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-eng-01',
                    subStrandId: 'substrand-eng-g5-debate',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which comparative adjective correctly completes the sentence: "Mount Kenya is ______ than Mount Longonot"?',
                      sw: 'Ni kivumishi gani cha kulinganisha kinachokamilisha sentensi: "Mount Kenya is ______ than Mount Longonot"?'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G5-GRAMMAR',
                    options: [
                      { id: 'opt-1', text: { en: 'higher', sw: 'higher' } },
                      { id: 'opt-2', text: { en: 'highest', sw: 'highest' } },
                      { id: 'opt-3', text: { en: 'more high', sw: 'more high' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'When comparing two landmarks, we use the comparative degree with "-er" (higher).',
                      sw: 'Tunapolinganisha vitu viwili, tunatumia "-er" (higher).'
                    },
                    socraticHint: {
                      en: 'Are we comparing two mountains, or all mountains in the world?',
                      sw: 'Je, tunalinganisha milima miwili au milima yote duniani?'
                    },
                    kenyanCulturalContext: 'Comparative geographical inquiry enriches CBC English lessons.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-eng-02',
                    subStrandId: 'substrand-eng-g5-debate',
                    type: 'WORD_BUILDER',
                    prompt: {
                      en: 'Arrange the scrambled words to form an assertive debate argument:',
                      sw: 'Panga maneno kuunda hoja ya mdahalo:'
                    },
                    wordBuilderTokens: {
                      correctSentence: 'Trees provide shade and clean air',
                      scrambledTokens: ['clean', 'provide', 'shade', 'Trees', 'air', 'and']
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G5-SPEECH',
                    explanation: {
                      en: '"Trees provide shade and clean air" follows Subject + Verb + Compound Object structure.',
                      sw: '"Trees provide shade and clean air" inafuata muundo sahihi wa sarufi ya Kiingereza.'
                    },
                    socraticHint: {
                      en: 'Start with the noun "Trees". What do they provide?',
                      sw: 'Anza na jina "Trees". Miti hutoa nini?'
                    },
                    kenyanCulturalContext: 'Debating builds confidence and leadership skills in primary schools.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-eng-g5-idioms',
                subStrandId: 'substrand-eng-g5-debate',
                order: 2,
                title: { en: 'Colourful English Proverbs & Idioms', sw: 'Methali na Nahau za Kiingereza' },
                storyContext: {
                  en: 'Discover how common proverbs such as "A stitch in time saves nine" help us solve problems early.',
                  sw: 'Gundua jinsi methali za Kiingereza zinavyotufunza kutatua shida mapema.'
                },
                characterName: 'Mwalimu',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-eng-g5-debate-trees'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-eng-03',
                    subStrandId: 'substrand-eng-g5-debate',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What does the proverb "Actions speak louder than words" mean?',
                      sw: 'Methali "Actions speak louder than words" inamaanisha nini?'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G5-VOCAB',
                    options: [
                      { id: 'opt-1', text: { en: 'What you do is more important than what you only say', sw: 'Vitendo vyako ni muhimu zaidi kuliko maneno matupu' } },
                      { id: 'opt-2', text: { en: 'You must shout loudly when speaking', sw: 'Lazima upige kelele unapoongea' } },
                      { id: 'opt-3', text: { en: 'Never speak to anyone', sw: 'Usiongee na mtu yeyote' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'People judge your character by your actual deeds and behaviour rather than promises.',
                      sw: 'Watu hupima tabia yako kwa matendo yako halisi badala ya ahadi tupu.'
                    },
                    socraticHint: {
                      en: 'Does promising to clean the classroom help, or does picking up the broom help?',
                      sw: 'Je, kutoa ahadi kunasaidia au kufanya kazi yenyewe ndiko kunakosaidia?'
                    },
                    kenyanCulturalContext: 'Character and deed consistency is foundational to CBC civic ethics.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 3. Kiswahili (Grade 5)
  {
    id: 'la-kisw-g5',
    gradeId: 'grade-5',
    code: 'KISW-G5',
    title: { en: 'Kiswahili', sw: 'Kiswahili' },
    description: {
      en: 'Ngeli za LI-YA na YA-YA, vitenzi, vinyume, na uandishi wa insha za maelezo.',
      sw: 'Ngeli za LI-YA na YA-YA, vitenzi, vinyume, na uandishi wa insha za maelezo.'
    },
    icon: 'Feather',
    color: '#f59e0b',
    bannerGradient: 'from-amber-600 to-orange-800',
    order: 3,
    prerequisiteIds: ['la-kisw-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-kisw-g5-ngeli-liya',
        subjectId: 'la-kisw-g5',
        code: 'KISW-G5-STR-01',
        title: { en: 'Ngeli ya LI-YA na Sarufi', sw: 'Ngeli ya LI-YA na Sarufi' },
        description: {
          en: 'Upatanisho wa kisarufi katika ngeli ya LI-YA (embe/maembe, jani/majani).',
          sw: 'Upatanisho wa kisarufi katika ngeli ya LI-YA (embe/maembe, jani/majani).'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-kisw-g5-upatanisho',
            strandId: 'strand-kisw-g5-ngeli-liya',
            code: 'KISW-G5-SUB-01',
            title: { en: 'Upatanisho wa Ngeli ya LI-YA', sw: 'Upatanisho wa Ngeli ya LI-YA' },
            description: {
              en: 'Kutunga sentensi sahihi kwa kutumia nomino za ngeli ya LI-YA.',
              sw: 'Kutunga sentensi sahihi kwa kutumia nomino za ngeli ya LI-YA.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration'],
            cbeValues: ['Respect'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-kisw-g5-shamba-liya',
                subStrandId: 'substrand-kisw-g5-upatanisho',
                order: 1,
                title: { en: 'Maembe na Machungwa Shambani', sw: 'Maembe na Machungwa Shambani' },
                storyContext: {
                  en: 'Msaidie Wanjiku kuandika orodha ya matunda na mazao katika ngeli ya LI-YA.',
                  sw: 'Msaidie Wanjiku kuandika orodha ya matunda na mazao katika ngeli ya LI-YA.'
                },
                characterName: 'Wanjiku',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-kisw-01',
                    subStrandId: 'substrand-kisw-g5-upatanisho',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Chagua sentensi iliyo sahihi katika ngeli ya LI-YA umoja:',
                      sw: 'Chagua sentensi iliyo sahihi katika ngeli ya LI-YA umoja:'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G5-NGELI',
                    options: [
                      { id: 'opt-1', text: { en: 'Embe tamu limeanguka chini.', sw: 'Embe tamu limeanguka chini.' } },
                      { id: 'opt-2', text: { en: 'Embe tamu kimeanguka chini.', sw: 'Embe tamu kimeanguka chini.' } },
                      { id: 'opt-3', text: { en: 'Embe tamu imeanguka chini.', sw: 'Embe tamu imeanguka chini.' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Nomino "Embe" iko katika ngeli ya LI-YA umoja, hivyo kiambishi cha kitendo ni "li-" (limeanguka).',
                      sw: 'Nomino "Embe" huchukua kiambishi "li-" katika ngeli ya LI-YA umoja.'
                    },
                    socraticHint: {
                      en: 'Je, wingi wa embe ni maembe? Katika umoja kiambishi ni kipi?',
                      sw: 'Je, wingi wa embe ni maembe? Katika umoja kiambishi ni kipi?'
                    },
                    kenyanCulturalContext: 'Ngeli za Kiswahili ndio nguzo kuu ya sarufi sanifu nchini Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-kisw-02',
                    subStrandId: 'substrand-kisw-g5-upatanisho',
                    type: 'MATCHING',
                    prompt: {
                      en: 'Oanisha neno la umoja na wingi wake katika ngeli ya LI-YA:',
                      sw: 'Oanisha neno la umoja na wingi wake katika ngeli ya LI-YA:'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G5-NGELI',
                    matchingPairs: [
                      { leftId: 'l1', leftText: { en: 'Jicho (Eye)', sw: 'Jicho' }, rightId: 'r1', rightText: { en: 'Macho (Eyes)', sw: 'Macho' } },
                      { leftId: 'l2', leftText: { en: 'Jani (Leaf)', sw: 'Jani' }, rightId: 'r2', rightText: { en: 'Majani (Leaves)', sw: 'Majani' } },
                      { leftId: 'l3', leftText: { en: 'Daraja (Bridge)', sw: 'Daraja' }, rightId: 'r3', rightText: { en: 'Madaraja (Bridges)', sw: 'Madaraja' } }
                    ],
                    explanation: {
                      en: 'Jicho -> Macho, Jani -> Majani, Daraja -> Madaraja.',
                      sw: 'Jicho huwa Macho, Jani huwa Majani, na Daraja huwa Madaraja.'
                    },
                    socraticHint: {
                      en: 'Angalia jinsi maneno yanavyopokea kiambishi "Ma-" katika wingi.',
                      sw: 'Angalia jinsi maneno yanavyopokea kiambishi "Ma-" katika wingi.'
                    },
                    kenyanCulturalContext: 'Kujifunza umoja na wingi huimarisha uandishi wa insha.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-kisw-g5-insha',
                subStrandId: 'substrand-kisw-g5-upatanisho',
                order: 2,
                title: { en: 'Uandishi wa Insha ya Wasifu', sw: 'Uandishi wa Insha ya Wasifu' },
                storyContext: {
                  en: 'Jifunze mpangilio wa aya na anwani katika insha ya kumhusu mtu unayemstahi.',
                  sw: 'Jifunze mpangilio wa aya na anwani katika insha ya kumhusu mtu unayemstahi.'
                },
                characterName: 'Mwalimu Ochieng',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: ['quest-kisw-g5-shamba-liya'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-kisw-03',
                    subStrandId: 'substrand-kisw-g5-upatanisho',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'Kweli au Si Kweli: Kila aya mpya katika insha inapaswa kuwa na wazo kuu moja lililofafanuliwa vizuri.',
                      sw: 'Kweli au Si Kweli: Kila aya mpya katika insha inapaswa kuwa na wazo kuu moja lililofafanuliwa vizuri.'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G5-INSHA',
                    correctBoolean: true,
                    explanation: {
                      en: 'Aya nzuri huwasilisha wazo kuu moja lenye maelezo ya kina ili insha isomeke kwa mtiririko mzuri.',
                      sw: 'Aya nzuri hubeba wazo kuu moja lenye mtiririko mwafaka wa mawazo.'
                    },
                    socraticHint: {
                      en: 'Je, kuchanganya mawazo yote kwenye aya moja husaidia msomaji kuelewa?',
                      sw: 'Je, kuchanganya mawazo yote kwenye aya moja husaidia msomaji kuelewa?'
                    },
                    kenyanCulturalContext: 'Uandishi wa insha hukuza ubunifu na mawasiliano thabiti.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 4. Science and Technology (Grade 5)
  {
    id: 'la-sci-g5',
    gradeId: 'grade-5',
    code: 'SCI-G5',
    title: { en: 'Science and Technology', sw: 'Sayansi na Teknolojia' },
    description: {
      en: 'Human breathing system, invertebrates, conductors of heat/electricity, and digital coding concepts.',
      sw: 'Mfumo wa upumuaji wa binadamu, wanyama wasio na uti wa mgongo, na upitishaji joto.'
    },
    icon: 'Microscope',
    color: '#0ea5e9',
    bannerGradient: 'from-sky-600 to-cyan-800',
    order: 4,
    prerequisiteIds: ['la-sci-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-sci-g5-human-body',
        subjectId: 'la-sci-g5',
        code: 'SCI-G5-STR-01',
        title: { en: 'Human Body Systems', sw: 'Mifumo ya Mwili wa Binadamu' },
        description: {
          en: 'Parts of the respiratory system (nose, trachea, lungs, diaphragm).',
          sw: 'Sehemu za mfumo wa upumuaji (pua, koo, mapafu, kiwambo).'
        },
        icon: 'Activity',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-sci-g5-breathing',
            strandId: 'strand-sci-g5-human-body',
            code: 'SCI-G5-SUB-01',
            title: { en: 'The Respiratory System', sw: 'Mfumo wa Upumuaji' },
            description: {
              en: 'Identify the path of inhaled air and understand healthy lung habits.',
              sw: 'Kufuatilia mkondo wa hewa safi na kutunza mapafu yenye afya.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving'],
            cbeValues: ['Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-sci-g5-lungs',
                subStrandId: 'substrand-sci-g5-breathing',
                order: 1,
                title: { en: 'How Our Lungs Work', sw: 'Jinsi Mapafu Yanavyofanya Kazi' },
                storyContext: {
                  en: 'Join Brian in the science lab as he builds a model lung using a plastic bottle and two balloons.',
                  sw: 'Ungana na Brian maabarani anapotengeneza kielelezo cha pafu kwa kutumia chupa na puto.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-sci-01',
                    subStrandId: 'substrand-sci-g5-breathing',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What tiny hairs inside the human nose filter dust and germs from inhaled air?',
                      sw: 'Ni vinyweleo gani vilivyo ndani ya pua vinavyochuja vumbi na vijidudu kutoka hewani?'
                    },
                    difficulty: 1,
                    strandTag: 'SCI-G5-BODY',
                    options: [
                      { id: 'opt-1', text: { en: 'Cilia (Nasal hairs)', sw: 'Vinyweleo vya pua' } },
                      { id: 'opt-2', text: { en: 'Tongue taste buds', sw: 'Ncha za ulimi' } },
                      { id: 'opt-3', text: { en: 'Eyelashes', sw: 'Kope' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Nasal hairs (cilia) and mucus trap incoming dust particles before air reaches the lungs.',
                      sw: 'Vinyweleo na ute wa pua huzuia vumbi kuingia kwenye mapafu.'
                    },
                    socraticHint: {
                      en: 'Why is it healthier to breathe through your nose rather than your mouth?',
                      sw: 'Kwa nini kupumulia pua ni bora kuliko kupumulia mdomo?'
                    },
                    kenyanCulturalContext: 'Clean air awareness helps combat respiratory illnesses in urban and rural environments.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-sci-02',
                    subStrandId: 'substrand-sci-g5-breathing',
                    type: 'IMAGE_LABEL',
                    prompt: {
                      en: 'Label the windpipe (trachea) on the respiratory diagram:',
                      sw: 'Weka alama kwenye koo la hewa (trachea) kwenye mchoro:'
                    },
                    imageLabelData: {
                      imageUrl: '/images/curriculum/respiratory_system.svg',
                      hotspots: [
                        { id: 'spot-trachea', label: { en: 'Trachea (Windpipe)', sw: 'Koo la hewa' }, xPercent: 50, yPercent: 35 },
                        { id: 'spot-lungs', label: { en: 'Lungs (Mapafu)', sw: 'Mapafu' }, xPercent: 50, yPercent: 65 }
                      ]
                    },
                    difficulty: 2,
                    strandTag: 'SCI-G5-BODY',
                    explanation: {
                      en: 'The trachea is the main tube leading air from the larynx down to both bronchi.',
                      sw: 'Trachea ni mrija mkuu unaopitisha hewa kutoka kooni hadi kwenye mapafu.'
                    },
                    socraticHint: {
                      en: 'Which tube connects your throat to your chest cavity?',
                      sw: 'Ni mrija gani unaounganisha koo na kifua?'
                    },
                    kenyanCulturalContext: 'Practical diagram exploration prepares learners for Junior School science inquiry.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-sci-g5-heat',
                subStrandId: 'substrand-sci-g5-breathing',
                order: 2,
                title: { en: 'Conductors and Insulators of Heat', sw: 'Wapitishaji wa Joto na Vikwamisho' },
                storyContext: {
                  en: 'Find out why Kenyan cooking pots (sufuria) have wooden or plastic handles.',
                  sw: 'Gundua kwa nini sufuria za kupikia huwa na vishikio vya mbao au plastiki.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-sci-g5-lungs'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-sci-03',
                    subStrandId: 'substrand-sci-g5-breathing',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which of the following materials is a good conductor of heat?',
                      sw: 'Ni kitu gani kati ya hivi kinachopitisha joto kwa haraka?'
                    },
                    difficulty: 1,
                    strandTag: 'SCI-G5-ENERGY',
                    options: [
                      { id: 'opt-1', text: { en: 'Aluminium metal (Sufuria metal)', sw: 'Metali ya alumini' } },
                      { id: 'opt-2', text: { en: 'Dry wood (Mbao kavu)', sw: 'Mbao kavu' } },
                      { id: 'opt-3', text: { en: 'Plastic spoon (Kijiko cha plastiki)', sw: 'Kijiko cha plastiki' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Metals like aluminium and copper conduct heat quickly, making them ideal for cooking.',
                      sw: 'Metali kama alumini hupitisha joto haraka sana, hivyo hutumika kutengeneza sufuria.'
                    },
                    socraticHint: {
                      en: 'Which part of the cooking pot gets hot fastest when placed on fire?',
                      sw: 'Ni sehemu gani ya sufuria inayopata moto haraka jikoni?'
                    },
                    kenyanCulturalContext: 'Kitchen science connects classroom physics directly to daily domestic tasks.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 5. Social Studies (Grade 5)
  {
    id: 'la-soc-g5',
    gradeId: 'grade-5',
    code: 'SOC-G5',
    title: { en: 'Social Studies', sw: 'Masomo ya Kijamii' },
    description: {
      en: 'Physical environments of Kenya, climatic regions, vegetation zones, and population distribution.',
      sw: 'Mazingira ya Kenya, kanda za hali ya hewa, misitu, na mgawanyo wa watu.'
    },
    icon: 'Compass',
    color: '#ec4899',
    bannerGradient: 'from-pink-600 to-rose-800',
    order: 5,
    prerequisiteIds: ['la-soc-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-soc-g5-climate',
        subjectId: 'la-soc-g5',
        code: 'SOC-G5-STR-01',
        title: { en: 'Climate Regions of Kenya', sw: 'Kanda za Hali ya Hewa Nchini Kenya' },
        description: {
          en: 'Tropical, modified tropical, arid, and semi-arid zones in Kenya.',
          sw: 'Kanda za joto, pwani, milimani na maeneo ya nusu-jangwa.'
        },
        icon: 'CloudSun',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-soc-g5-vegetation',
            strandId: 'strand-soc-g5-climate',
            code: 'SOC-G5-SUB-01',
            title: { en: 'Vegetation and Forests of Kenya', sw: 'Mimea na Misitu ya Kenya' },
            description: {
              en: 'Understand Mau Forest, Kakamega Rainforest, and Aberdare conservation.',
              sw: 'Kufahamu Msitu wa Mau, Kakamega na Aberdare na umuhimu wa kuhifadhi vyanzo vya maji.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Patriotism', 'Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-soc-g5-forests',
                subStrandId: 'substrand-soc-g5-vegetation',
                order: 1,
                title: { en: 'Guardians of the Mau Water Tower', sw: 'Walinzi wa Msitu wa Mau' },
                storyContext: {
                  en: 'Zawadi discovers how indigenous trees in Mau Forest catch rainfall that feeds rivers across 12 counties.',
                  sw: 'Zawadi anagundua jinsi miti ya msitu wa Mau inavyolisha mito katika kaunti 12.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Patriotism', 'Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-soc-01',
                    subStrandId: 'substrand-soc-g5-vegetation',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which forest is famous for being Kenya’s only remaining tropical equatorial rainforest?',
                      sw: 'Ni msitu gani maarufu nchini Kenya kama msitu pekee wa mvua wa kitropiki uliosalia?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G5-GEOG',
                    options: [
                      { id: 'opt-1', text: { en: 'Kakamega Forest', sw: 'Msitu wa Kakamega' } },
                      { id: 'opt-2', text: { en: 'Arabuko Sokoke', sw: 'Arabuko Sokoke' } },
                      { id: 'opt-3', text: { en: 'Marsabit Forest', sw: 'Msitu wa Marsabit' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Kakamega Rainforest is Kenya’s unique remnant of the ancient Guineo-Congolian equatorial rainforest.',
                      sw: 'Msitu wa Kakamega ndio msitu pekee wa mvua wa kitropiki nchini Kenya wenye viumbe wa kipekee.'
                    },
                    socraticHint: {
                      en: 'Think of the lush green forest in Western Kenya known for colobus monkeys and butterflies.',
                      sw: 'Fikiria msitu wa kijani kibichi Magharibi mwa Kenya wenye vipepeo na nyani.'
                    },
                    kenyanCulturalContext: 'Kakamega Forest is a globally significant biodiversity hotspot in Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-soc-02',
                    subStrandId: 'substrand-soc-g5-vegetation',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Cutting down trees on mountain hills causes severe soil erosion and river drying.',
                      sw: 'Kweli au Si Kweli: Kukata miti kwenye vilima husababisha mmomonyoko wa udongo na mito kukauka.'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G5-ENV',
                    correctBoolean: true,
                    explanation: {
                      en: 'Tree roots hold soil firmly and sponge rainwater to keep rivers flowing all year round.',
                      sw: 'Mizizi ya miti hushikilia udongo na kuhifadhi maji ya mvua ili mito isikauke.'
                    },
                    socraticHint: {
                      en: 'What protects bare soil from being washed away during heavy flash floods?',
                      sw: 'Ni kitu gani kinacholinda udongo usizoswe na mafuriko ya mvua?'
                    },
                    kenyanCulturalContext: 'Afforestation campaigns are high national priorities across Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-soc-g5-lakes',
                subStrandId: 'substrand-soc-g5-vegetation',
                order: 2,
                title: { en: 'Lakes of the Great Rift Valley', sw: 'Maziwa ya Bonde la Ufa' },
                storyContext: {
                  en: 'Learn about Lake Nakuru (flamingos), Lake Bogoria (geysers), and Lake Naivasha (freshwater).',
                  sw: 'Jifunze kuhusu Ziwa Nakuru, Ziwa Bogoria na Ziwa Naivasha katika Bonde la Ufa.'
                },
                characterName: 'Baraka',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Patriotism'],
                prerequisiteQuestIds: ['quest-soc-g5-forests'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-soc-03',
                    subStrandId: 'substrand-soc-g5-vegetation',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which Great Rift Valley lake is famous for hot springs and steam geysers?',
                      sw: 'Ni ziwa gani katika Bonde la Ufa linalojulikana kwa chemchemi za maji ya moto na mivuke?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G5-GEOG',
                    options: [
                      { id: 'opt-1', text: { en: 'Lake Bogoria in Baringo County', sw: 'Ziwa Bogoria kaunti ya Baringo' } },
                      { id: 'opt-2', text: { en: 'Lake Victoria', sw: 'Ziwa Victoria' } },
                      { id: 'opt-3', text: { en: 'Lake Turkana', sw: 'Ziwa Turkana' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Lake Bogoria is famous for spectacular hot geysers and mineral springs in Baringo County.',
                      sw: 'Ziwa Bogoria linasifika kwa chemchemi za maji moto na mivuke ya jotoardhi.'
                    },
                    socraticHint: {
                      en: 'Where can visitors boil an egg naturally in hot bubbling mineral water?',
                      sw: 'Wageni huchemsha mayai kwenye maji gani ya moto ya asili?'
                    },
                    kenyanCulturalContext: 'The Great Rift Valley lakes are world heritage tourist and ecological treasures.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 6. Agriculture and Nutrition (Grade 5)
  {
    id: 'la-agri-g5',
    gradeId: 'grade-5',
    code: 'AGRI-G5',
    title: { en: 'Agriculture and Nutrition', sw: 'Kilimo na Lishe' },
    description: {
      en: 'Soil recovery, agroforestry, poultry keeping (kuku wa kienyeji), and food preservation.',
      sw: 'Kuhifadhi udongo, upandaji miti ya matunda, ufugaji wa kuku, na kukausha vyakula.'
    },
    icon: 'Sprout',
    color: '#84cc16',
    bannerGradient: 'from-lime-600 to-green-800',
    order: 6,
    prerequisiteIds: ['la-agri-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-agri-g5-poultry',
        subjectId: 'la-agri-g5',
        code: 'AGRI-G5-STR-01',
        title: { en: 'Small Domestic Livestock & Poultry', sw: 'Wanyama Wadogo wa Kufugwa na Kuku' },
        description: {
          en: 'Housing, feeding, and disease prevention in indigenous chicken rearing.',
          sw: 'Kujenga vibanda, kulisha, na kuzuia magonjwa ya kuku wa kienyeji.'
        },
        icon: 'Feather',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-agri-g5-chicken',
            strandId: 'strand-agri-g5-poultry',
            code: 'AGRI-G5-SUB-01',
            title: { en: 'Rearing Indigenous Chickens', sw: 'Ufugaji wa Kuku wa Kienyeji' },
            description: {
              en: 'Design clean ventilated chicken coops and mix balanced grain feed.',
              sw: 'Kutengeneza banda safi lenye hewa na kuandaa chakula cha kuku.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Self-efficacy', 'Financial literacy'],
            cbeValues: ['Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-agri-g5-chicken-coop',
                subStrandId: 'substrand-agri-g5-chicken',
                order: 1,
                title: { en: 'Mama Amina’s Poultry Project', sw: 'Mradi wa Kuku wa Mama Amina' },
                storyContext: {
                  en: 'Help Amina clean the chicken coop perches and collect fresh eggs safely in Nakuru.',
                  sw: 'Msaidie Amina kusafisha banda la kuku na kukusanya mayai mapya Nakuru.'
                },
                characterName: 'Mama Amina',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Self-efficacy'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-agri-01',
                    subStrandId: 'substrand-agri-g5-chicken',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Why must a poultry coop have good ventilation and raised perches?',
                      sw: 'Kwa nini banda la kuku lazima liwe na mzunguko mzuri wa hewa na nguzo za kutulia?'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G5-POULTRY',
                    options: [
                      { id: 'opt-1', text: { en: 'To keep the coop dry and free of respiratory diseases', sw: 'Kuweka banda likiwa kavu na kuzuia magonjwa ya mafua ya kuku' } },
                      { id: 'opt-2', text: { en: 'To let wild hawks fly inside', sw: 'Ili vipanga waingie ndani' } },
                      { id: 'opt-3', text: { en: 'To make the chickens colder', sw: 'Kuwafanya kuku wapate baridi' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Good airflow prevents ammonia gas buildup and dampness, keeping chickens healthy.',
                      sw: 'Hewa safi huzuia unyevu na gesi mbaya na kulinda afya ya kuku.'
                    },
                    socraticHint: {
                      en: 'Do chickens stay healthier in a dry, breezy coop or a damp, smelly cage?',
                      sw: 'Je, kuku huwa na afya kwenye banda lenye hewa au lenye uvundo?'
                    },
                    kenyanCulturalContext: 'Indigenous chicken rearing (kuku wa kienyeji) is a vital source of income in Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-agri-02',
                    subStrandId: 'substrand-agri-g5-chicken',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Traditional sun-drying preserves sweet potato and cassava chips for future dry seasons.',
                      sw: 'Kweli au Si Kweli: Kuanika vyakula juani huhifadhi viazi na mhogo kwa ajili ya msimu wa ukame.'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G5-PRESERVATION',
                    correctBoolean: true,
                    explanation: {
                      en: 'Sun-drying removes moisture so bacteria and moulds cannot spoil stored staple crops.',
                      sw: 'Kuanika juani huondoa unyevu na kuzuia ukungu kuharibu chakula kilichohifadhiwa.'
                    },
                    socraticHint: {
                      en: 'Why do families dry maize and cassava slices on clean mats in the sun?',
                      sw: 'Kwa nini watu huanika mahindi na vipande vya mhogo juani?'
                    },
                    kenyanCulturalContext: 'Traditional food processing prevents post-harvest food loss in Kenyan rural homes.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-agri-g5-agroforest',
                subStrandId: 'substrand-agri-g5-chicken',
                order: 2,
                title: { en: 'Fruit Trees in Agroforestry', sw: 'Miti ya Matunda Shambani' },
                storyContext: {
                  en: 'Planting avocado and passion fruit trees along boundary hedges to enrich family income.',
                  sw: 'Kupanda parachichi na matunda ya pasheni kwenye kingo za shamba kuongeza mapato.'
                },
                characterName: 'Akinyi',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Financial literacy'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-agri-g5-chicken-coop'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-agri-03',
                    subStrandId: 'substrand-agri-g5-chicken',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which popular Kenyan fruit tree provides healthy fats and is exported widely as "Hass"?',
                      sw: 'Ni mti gani wa matunda wa Kenya unaotoa mafuta yenye afya na kuuzwa sana ng’ambo kama "Hass"?'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G5-CROPS',
                    options: [
                      { id: 'opt-1', text: { en: 'Avocado (Parachichi)', sw: 'Mparachichi' } },
                      { id: 'opt-2', text: { en: 'Baobab (Mbuyu)', sw: 'Mbuyu' } },
                      { id: 'opt-3', text: { en: 'Cactus (Miba)', sw: 'Mchongoma' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Hass avocado is a major cash crop grown across Murang’a, Kisii, and Eldoret.',
                      sw: 'Parachichi aina ya Hass ni tunda maarufu linalolimwa sana kibiashara nchini Kenya.'
                    },
                    socraticHint: {
                      en: 'Think of the pear-shaped green fruit often eaten with githeri or rice.',
                      sw: 'Fikiria tunda la kijani lenye kirutubisho cha mafuta linaloliwa na githeri.'
                    },
                    kenyanCulturalContext: 'Avocado farming empowers smallholders across agricultural counties.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 7. Religious Education (Grade 5)
  {
    id: 'la-re-g5',
    gradeId: 'grade-5',
    code: 'RE-G5',
    title: { en: 'Religious Education (CRE / IRE)', sw: 'Elimu ya Dini (CRE / IRE)' },
    description: {
      en: 'Moral courage, defending justice, stewardship of the earth, and interfaith harmony.',
      sw: 'Ujasiri wa kimaadili, kutetea haki, utunzaji wa viumbe, na maelewano ya kidini.'
    },
    icon: 'Heart',
    color: '#3b82f6',
    bannerGradient: 'from-blue-600 to-indigo-800',
    order: 7,
    religiousEducationStream: 'CRE',
    prerequisiteIds: ['la-re-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-re-g5-justice',
        subjectId: 'la-re-g5',
        code: 'RE-G5-STR-01',
        title: { en: 'Justice, Integrity and Fair Play', sw: 'Haki, Uadilifu na Usawa' },
        description: {
          en: 'Standing up against bullying, refusing bribery, and respecting human dignity.',
          sw: 'Kupinga uonevu, kukataa rushwa, na kuheshimu utu wa kila binadamu.'
        },
        icon: 'Shield',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-re-g5-integrity',
            strandId: 'strand-re-g5-justice',
            code: 'RE-G5-SUB-01',
            title: { en: 'Standing Up for Fairness in School', sw: 'Kutetea Usawa Shuleni' },
            description: {
              en: 'Practise resolving conflicts fairly without favoritism or cheating.',
              sw: 'Kutatua migogoro kwa haki bila upendeleo au udanganyifu.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Integrity', 'Social justice', 'Peace'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-re-g5-fair-referee',
                subStrandId: 'substrand-re-g5-integrity',
                order: 1,
                title: { en: 'The Fair Football Match', sw: 'Mchezo wa Mpira wa Haki' },
                storyContext: {
                  en: 'Baraka is chosen as game referee and must make honest calls even when his closest friend commits a foul.',
                  sw: 'Baraka anachaguliwa kuwa mwamuzi na anapaswa kutoa maamuzi ya haki hata rafiki yake akifanya kosa.'
                },
                characterName: 'Baraka',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Integrity', 'Social justice'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-re-01',
                    subStrandId: 'substrand-re-g5-integrity',
                    type: 'SCENARIO',
                    prompt: {
                      en: 'During a class election, someone offers you a pencil to vote for them instead of the best leader. What should you do?',
                      sw: 'Wakati wa uchaguzi wa kiranja darasani, mtu anakupa penseli ili umchague yeye badala ya kiongozi bora. Unapaswa kufanya nini?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G5-JUSTICE',
                    options: [
                      { id: 'opt-1', text: { en: 'Politely refuse the bribe and vote honestly for the most responsible leader', sw: 'Kataa hongo hiyo kwa heshima na umpigie kura kiongozi mwaminifu' } },
                      { id: 'opt-2', text: { en: 'Take the pencil and vote as they ordered', sw: 'Chukua penseli na kumpigia kura' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Integrity and social justice require making decisions free from corruption or bribery.',
                      sw: 'Uadilifu unahitaji kuchagua viongozi kwa haki bila kushawishiwa na rushwa.'
                    },
                    socraticHint: {
                      en: 'What kind of society do we build when leaders are chosen because of bribes?',
                      sw: 'Tunajenga jamii ya aina gani iwapo viongozi watachaguliwa kwa hongo?'
                    },
                    kenyanCulturalContext: 'Anti-corruption and integrity values are core cross-cutting themes in Kenyan CBE.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-re-02',
                    subStrandId: 'substrand-re-g5-integrity',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Treating people of different faiths and backgrounds with kindness is a shared teaching of both Christian and Islamic traditions.',
                      sw: 'Kweli au Si Kweli: Kuwatendea watu wa dini mbalimbali wema ni fundisho la pamoja katika Ukristo na Uislamu.'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G5-PEACE',
                    correctBoolean: true,
                    explanation: {
                      en: 'All major religious traditions teach neighborly love, peace, and mutual respect.',
                      sw: 'Dini zote kuu hufundisha upendo kwa jirani, amani na kuheshimiana.'
                    },
                    socraticHint: {
                      en: 'Do both CRE and IRE teach peace among all Kenyan citizens?',
                      sw: 'Je, mafundisho ya dini zote yanahimiza amani miongoni mwa Wakenya wote?'
                    },
                    kenyanCulturalContext: 'Interfaith tolerance is an essential pillar of national cohesion in Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-re-g5-stewards',
                subStrandId: 'substrand-re-g5-integrity',
                order: 2,
                title: { en: 'Stewards of God’s Creation', sw: 'Wawakilishi wa Utunzaji wa Uumbaji' },
                storyContext: {
                  en: 'Understanding our shared sacred responsibility to protect rivers, animals, and soil from pollution.',
                  sw: 'Kufahamu wajibu mtukufu wa kulinda mito, wanyama na ardhi dhidi ya uchafuzi.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-re-g5-fair-referee'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-re-03',
                    subStrandId: 'substrand-re-g5-integrity',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Caring for the environment by planting trees shows our responsibility as:',
                      sw: 'Kutunza mazingira kwa kupanda miti kunaonyesha wajibu wetu kama:'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G5-VALUES',
                    options: [
                      { id: 'opt-1', text: { en: 'Faithful stewards of creation', sw: 'Walinzi waaminifu wa uumbaji' } },
                      { id: 'opt-2', text: { en: 'Destructive exploiters', sw: 'Waharibifu wa mazingira' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Human beings have a moral duty to conserve nature for present and future generations.',
                      sw: 'Binadamu wana wajibu wa kimaadili wa kulinda uumbaji kwa vizazi vya sasa na vya baadaye.'
                    },
                    socraticHint: {
                      en: 'Are we called to protect or destroy nature?',
                      sw: 'Je, tumeagizwa kulinda au kuharibu mazingira?'
                    },
                    kenyanCulturalContext: 'Environmental ethics are woven seamlessly into CBC religious education.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 8. Creative Arts (Grade 5)
  {
    id: 'la-ca-g5',
    gradeId: 'grade-5',
    code: 'CA-G5',
    title: { en: 'Creative Arts', sw: 'Sanaa za Ubunifu' },
    description: {
      en: 'Kenyan beadwork, tie-and-dye fabric, folk songs (sol-fa notation), and gymnastics.',
      sw: 'Ushanga wa asili, rangi ya vitambaa (tie-and-dye), nyimbo za kienyeji, na sarakasi za viungo.'
    },
    icon: 'Palette',
    color: '#a855f7',
    bannerGradient: 'from-purple-600 to-fuchsia-800',
    order: 8,
    prerequisiteIds: ['la-ca-g4'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-ca-g5-craft',
        subjectId: 'la-ca-g5',
        code: 'CA-G5-STR-01',
        title: { en: 'Indigenous Crafts and Music', sw: 'Kazi za Mikono na Muziki wa Asili' },
        description: {
          en: 'Maasai and Samburu bead patterns, vocal pitch, and rhythm patterns.',
          sw: 'Ushanga wa Kimasai na Kisamburu, sauti za solfa na midundo.'
        },
        icon: 'Music',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-ca-g5-beadwork',
            strandId: 'strand-ca-g5-craft',
            code: 'CA-G5-SUB-01',
            title: { en: 'Beadwork & Sol-fa Singing', sw: 'Ushanga na Kuimba kwa Solfa' },
            description: {
              en: 'String geometric bead bracelets and sing major scale notes (doh, re, mi, fah, soh).',
              sw: 'Kusuka ushanga wa kijiometri na kuimba ngazi ya sauti ya solfa.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Creativity and imagination', 'Citizenship'],
            cbeValues: ['Unity', 'Love'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-ca-g5-beads',
                subStrandId: 'substrand-ca-g5-beadwork',
                order: 1,
                title: { en: 'Weaving a Kenyan Shanga Bracelet', sw: 'Kusuka Bangili ya Ushanga' },
                storyContext: {
                  en: 'Amina creates a colorful bead bracelet using the black, red, green, and white of the Kenyan flag.',
                  sw: 'Amina anatengeneza bangili ya ushanga kwa rangi za bendera ya Kenya.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Patriotism'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-ca-01',
                    subStrandId: 'substrand-ca-g5-beadwork',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'In the national flag of Kenya, what does the green colour symbolize?',
                      sw: 'Katika bendera ya taifa ya Kenya, rangi ya kijani inaashiria nini?'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G5-ART',
                    options: [
                      { id: 'opt-1', text: { en: 'The natural land and agriculture', sw: 'Ardhi yenye rutuba na kilimo' } },
                      { id: 'opt-2', text: { en: 'Peace and honesty', sw: 'Amani na uaminifu' } },
                      { id: 'opt-3', text: { en: 'The people of Kenya', sw: 'Watu wa Kenya' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Green represents the land, vegetation, and natural wealth of Kenya.',
                      sw: 'Rangi ya kijani inawakilisha ardhi, mimea na utajiri wa asili wa Kenya.'
                    },
                    socraticHint: {
                      en: 'Think of fertile farms and forests across the country.',
                      sw: 'Fikiria mashamba yenye rutuba na misitu nchini.'
                    },
                    kenyanCulturalContext: 'Kenyan beadwork and national symbols instill patriotic pride.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g5-ca-02',
                    subStrandId: 'substrand-ca-g5-beadwork',
                    type: 'ORDERING',
                    prompt: {
                      en: 'Arrange the first 5 notes of the musical scale in order from low to high:',
                      sw: 'Panga sauti 5 za kwanza za solfa kuanzia ya chini hadi ya juu:'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G5-MUSIC',
                    correctOrderIds: ['n-doh', 'n-re', 'n-mi', 'n-fah', 'n-soh'],
                    options: [
                      { id: 'n-doh', text: { en: 'doh', sw: 'doh' } },
                      { id: 'n-re', text: { en: 're', sw: 're' } },
                      { id: 'n-mi', text: { en: 'mi', sw: 'mi' } },
                      { id: 'n-fah', text: { en: 'fah', sw: 'fah' } },
                      { id: 'n-soh', text: { en: 'soh', sw: 'soh' } }
                    ],
                    explanation: {
                      en: 'The standard sol-fa ladder rises: doh, re, mi, fah, soh, lah, ti, doh.',
                      sw: 'Ngazi ya sauti ya solfa hupanda: doh, re, mi, fah, soh, lah, ti, doh.'
                    },
                    socraticHint: {
                      en: 'Remember the song: "Doh, a deer, a female deer..."',
                      sw: 'Kumbuka wimbo wa ngazi ya sauti ya muziki.'
                    },
                    kenyanCulturalContext: 'Vocal pitch training is practiced in school music festival choirs.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-ca-g5-gym',
                subStrandId: 'substrand-ca-g5-beadwork',
                order: 2,
                title: { en: 'Gymnastic Balance and Rolls', sw: 'Sarakasi za Usawa na Kujiviringisha' },
                storyContext: {
                  en: 'Practise safe forward rolls on gymnasium mats under teacher supervision.',
                  sw: 'Fanya mazoezi ya kujiviringisha mbele kwa usalama kwenye godoro chini ya mwalimu.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Self-efficacy'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-ca-g5-beads'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g5-ca-03',
                    subStrandId: 'substrand-ca-g5-beadwork',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Tucking your chin to your chest during a forward roll protects your neck.',
                      sw: 'Kweli au Si Kweli: Kukunja kidevu kuelekea kifuani unapoanza kujiviringisha hulinda shingo yako.'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G5-PHE',
                    correctBoolean: true,
                    explanation: {
                      en: 'Tucking your chin ensures you roll smoothly along your upper back without neck strain.',
                      sw: 'Kukunja kidevu kifuani hulinda shingo na kukusaidia kujiviringisha kwa usalama.'
                    },
                    socraticHint: {
                      en: 'Should your head land flat on the ground, or should your back roll smoothly?',
                      sw: 'Je, kichwa kinatakiwa kugonga ardhi au mgongo ujiviringishe taratibu?'
                    },
                    kenyanCulturalContext: 'Safety and discipline are primary competencies in physical education.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 9. Indigenous Language (Grade 5 - Optional placeholder)
  {
    id: 'la-indig-g5',
    gradeId: 'grade-5',
    code: 'INDIG-G5',
    title: { en: 'Indigenous Language (Optional)', sw: 'Lugha ya Asili (Hiari)' },
    description: {
      en: 'Proverbs, riddles, and cultural oral poetry from Kenyan counties.',
      sw: 'Methali, vitendawili na mashairi ya kiasili ya jamii za Kenya.'
    },
    icon: 'MessageSquare',
    color: '#06b6d4',
    bannerGradient: 'from-cyan-600 to-teal-800',
    order: 9,
    isOptional: true,
    prerequisiteIds: [],
    sourceStatus: 'TODO: verify with KICD design',
    strands: [
      {
        id: 'strand-indig-g5-placeholder',
        subjectId: 'la-indig-g5',
        code: 'INDIG-G5-STR-01',
        title: { en: 'Traditional Riddles and Wisdom (Preview)', sw: 'Vitendawili na Hekima za Jadi (Onyesho la Awali)' },
        description: {
          en: 'Solving community riddles (vitendawili) that develop critical thinking.',
          sw: 'Kutega na kutegua vitendawili vya kijamii vinavyoamsha akili.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'TODO: verify with KICD design',
        subStrands: [
          {
            id: 'substrand-indig-g5-placeholder',
            strandId: 'strand-indig-g5-placeholder',
            code: 'INDIG-G5-SUB-01',
            title: { en: 'Riddle Solving Sessions', sw: 'Kutegua Vitendawili vya Jadi' },
            description: {
              en: 'Traditional call-and-answer riddle games with family elders.',
              sw: 'Michezo ya kitamaduni ya vitendawili na wazee jioni.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Citizenship'],
            cbeValues: ['Respect'],
            estimatedMinutes: 15,
            sourceStatus: 'TODO: verify with KICD design',
            quests: [
              {
                id: 'quest-indig-g5-preview',
                subStrandId: 'substrand-indig-g5-placeholder',
                order: 1,
                title: { en: 'The Evening Fireplace Riddles', sw: 'Vitendawili vya Moto wa Jioni' },
                storyContext: {
                  en: 'Brian and Zawadi listen to grandfather’s riddles about nature and animals.',
                  sw: 'Brian na Zawadi wanasikiliza vitendawili vya babu kuhusu mazingira.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'TODO: verify with KICD design',
                questions: [
                  {
                    id: 'q-g5-indig-01',
                    subStrandId: 'substrand-indig-g5-placeholder',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Kitendawili: "Nyumba yangu haina mlango." (Jibu lake ni nini?)',
                      sw: 'Kitendawili: "Nyumba yangu haina mlango." (Jibu lake ni nini?)'
                    },
                    difficulty: 1,
                    strandTag: 'INDIG-G5-RIDDLE',
                    options: [
                      { id: 'opt-1', text: { en: 'Yai (An egg)', sw: 'Yai' } },
                      { id: 'opt-2', text: { en: 'Gari (A car)', sw: 'Gari' } },
                      { id: 'opt-3', text: { en: 'Kitabu (A book)', sw: 'Kitabu' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Yai lina umbo la duaradufu lililofungwa pande zote bila mlango wowote.',
                      sw: 'Yai ni mfano wa nyumba iliyofungwa kabisa bila mlango.'
                    },
                    socraticHint: {
                      en: 'Kiumbe kipi kinachokua ndani ya ganda jeupe lililofungwa kabisa?',
                      sw: 'Ni kitu gani kinachototolewa kikiwa kimefungwa pande zote?'
                    },
                    kenyanCulturalContext: 'Vitendawili sharpen mental wit across African fireside oral traditions.',
                    sourceStatus: 'TODO: verify with KICD design'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const grade5Curriculum: CurriculumGrade = {
  id: 'grade-5',
  code: 'G5',
  name: { en: 'Grade 5', sw: 'Gredi ya 5' },
  band: 'UPPER_PRIMARY',
  description: {
    en: 'Upper Primary intermediate mastery: Mathematics, English, Kiswahili, Science, Social Studies, Agriculture, and Creative Arts.',
    sw: 'Gredi ya 5 ya shule ya msingi: Hisabati, Kiingereza, Kiswahili, Sayansi, Masomo ya Jamii, Kilimo na Sanaa za Ubunifu.'
  },
  order: 3,
  subjects: grade5Subjects
};
