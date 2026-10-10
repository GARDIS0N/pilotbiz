// Grade 3 (Lower Primary) Curriculum Design & Seed Data
// Aligned to Kenya CBC Lower Primary structure.

import { CurriculumGrade, CurriculumSubject } from '../types.js';
import { grade3NumbersStrand } from './grade3MathLessons.js';

export const grade3Subjects: CurriculumSubject[] = [
  // 1. Mathematical Activities
  {
    id: 'math-act-g3',
    gradeId: 'grade-3',
    code: 'MATH-ACT-G3',
    title: { en: 'Mathematical Activities', sw: 'Shughuli za Hisabati' },
    description: {
      en: 'Addition, subtraction, simple multiplication, shopping with Kenyan coins, and 2D shapes.',
      sw: 'Kujumlisha, kutoa, kuzidisha kwa urahisi, ununuzi kwa sarafu za Kenya, na maumbo.'
    },
    icon: 'Calculator',
    color: '#10b981',
    bannerGradient: 'from-emerald-600 to-teal-800',
    order: 1,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      grade3NumbersStrand,
      {
        id: 'strand-math-g3-geometry',
        subjectId: 'math-act-g3',
        code: 'MATH-G3-STR-02',
        title: { en: 'Geometry & 2D Shapes', sw: 'Jiometri na Maumbo ya 2D' },
        description: {
          en: 'Identifying triangles, rectangles, and circles in everyday Kenyan surroundings.',
          sw: 'Kutambua pembetatu, mstatili na duara katika mazingira ya Kenya.'
        },
        icon: 'Shapes',
        order: 2,
        prerequisiteIds: ['strand-math-g3-numbers'],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-math-g3-market-math',
            strandId: 'strand-math-g3-geometry',
            code: 'MATH-G3-SUB-02',
            title: { en: 'Shapes in the Classroom & Village', sw: 'Maumbo Darasani na Kijijini' },
            description: {
              en: 'Find triangles, rectangles, and circles on the blackboard and football pitch.',
              sw: 'Tafuta pembetatu, mstatili na duara kwenye ubao wa darasa na uwanja wa mpira.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving'],
            cbeValues: ['Responsibility'],
            estimatedMinutes: 10,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-math-g3-mango-stand',
                subStrandId: 'substrand-math-g3-market-math',
                order: 1,
                title: { en: 'Zawadi’s Sweet Mango Stand', sw: 'Kibanda cha Maembe cha Zawadi' },
                storyContext: {
                  en: 'Help Zawadi count ripe mangoes collected from the shamba in Machakos.',
                  sw: 'Msaidie Zawadi kuhesabu maembe yaliyoiva kutoka shambani Machakos.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-math-01',
                    subStrandId: 'substrand-math-g3-market-math',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Zawadi has 24 sweet mangoes in one basket and 15 mangoes in another. How many mangoes does she have altogether?',
                      sw: 'Zawadi ana maembe 24 kwenye kikapu kimoja na maembe 15 kwenye kikapu kingine. Je, ana jumla ya maembe mangapi?'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G3-NUM',
                    options: [
                      { id: 'opt-1', text: { en: '39 mangoes', sw: 'Maembe 39' } },
                      { id: 'opt-2', text: { en: '35 mangoes', sw: 'Maembe 35' } },
                      { id: 'opt-3', text: { en: '41 mangoes', sw: 'Maembe 41' } },
                      { id: 'opt-4', text: { en: '29 mangoes', sw: 'Maembe 29' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: '24 + 15 = (20 + 10) + (4 + 5) = 30 + 9 = 39 mangoes.',
                      sw: '24 + 15 = 39 maembe kwa jumla.'
                    },
                    socraticHint: {
                      en: 'Add the tens (20 + 10 = 30), then add the ones (4 + 5 = 9).',
                      sw: 'Jumlisha makumi kwanza (20 + 10 = 30), kisha mamoja (4 + 5 = 9).'
                    },
                    kenyanCulturalContext: 'Mangoes from Machakos and Makueni are prized across Kenyan markets.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-math-02',
                    subStrandId: 'substrand-math-g3-market-math',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'A pencil costs KES 20. An eraser costs KES 15. Enter the total cost in shillings.',
                      sw: 'Penseli inagharimu KES 20. Kifutio kinagharimu KES 15. Andika jumla ya gharama kwa shilingi.'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G3-MONEY',
                    numericAnswer: { value: 35, unit: 'KES' },
                    explanation: {
                      en: 'KES 20 + KES 15 = KES 35.',
                      sw: 'KES 20 + KES 15 = KES 35.'
                    },
                    socraticHint: {
                      en: 'What is 20 plus 15?',
                      sw: '20 ukijumlisha 15 ni ngapi?'
                    },
                    kenyanCulturalContext: 'Budgeting for stationery promotes early financial literacy.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-math-g3-shapes',
                subStrandId: 'substrand-math-g3-market-math',
                order: 2,
                title: { en: 'Spotting Shapes in our Classroom', sw: 'Kutambua Maumbo Darasani' },
                storyContext: {
                  en: 'Find triangles, rectangles, and circles on the blackboard and football pitch.',
                  sw: 'Tafuta pembetatu, mstatili na duara kwenye ubao wa darasa na uwanja wa mpira.'
                },
                characterName: 'Baraka',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-math-g3-mango-stand'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-math-03',
                    subStrandId: 'substrand-math-g3-market-math',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: A triangle has exactly 3 straight sides and 3 corners.',
                      sw: 'Kweli au Si Kweli: Pembetatu ina pande 3 zilizonyooka na pembe 3.'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G3-GEOM',
                    correctBoolean: true,
                    explanation: {
                      en: 'A triangle is a 3-sided 2D shape ("pembe tatu" means three corners).',
                      sw: 'Pembetatu ni umbo lenye pande 3 na pembe 3 zilizonyooka.'
                    },
                    socraticHint: {
                      en: 'Think of the word "tri" or "pembetatu". How many sides does it have?',
                      sw: 'Neno "pembe-tatu" linamaanisha nini? Ina pande ngapi?'
                    },
                    kenyanCulturalContext: 'Roof trusses on traditional and modern houses show practical triangle geometry.',
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

  // 2. English Language Activities
  {
    id: 'eng-act-g3',
    gradeId: 'grade-3',
    code: 'ENG-ACT-G3',
    title: { en: 'English Language Activities', sw: 'Shughuli za Kiingereza' },
    description: {
      en: 'Phonics, vocabulary, story listening, sight words, and simple sentence formation.',
      sw: 'Foniki, msamiati, kusikiliza hadithi, na uandishi wa sentensi rahisi.'
    },
    icon: 'BookOpen',
    color: '#8b5cf6',
    bannerGradient: 'from-violet-600 to-indigo-800',
    order: 2,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-eng-g3-phonics',
        subjectId: 'eng-act-g3',
        code: 'ENG-G3-STR-01',
        title: { en: 'Reading & Sight Words', sw: 'Kusoma na Maneno ya Msingi' },
        description: {
          en: 'Read high-frequency words and answer who, what, and where questions.',
          sw: 'Kusoma maneno ya kawaida na kujibu maswali ya hadithi.'
        },
        icon: 'Eye',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-eng-g3-stories',
            strandId: 'strand-eng-g3-phonics',
            code: 'ENG-G3-SUB-01',
            title: { en: 'Animals of the Savanna', sw: 'Wanyama wa Mbugani' },
            description: {
              en: 'Read about giraffes, elephants, and zebras in Nairobi National Park.',
              sw: 'Kusoma kuhusu twiga, ndovu na pundamilia katika mbuga ya wanyama.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration'],
            cbeValues: ['Love', 'Respect'],
            estimatedMinutes: 15,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-eng-g3-giraffe',
                subStrandId: 'substrand-eng-g3-stories',
                order: 1,
                title: { en: 'Twiga the Tall Giraffe', sw: 'Twiga Mwenye Shingo Ndefu' },
                storyContext: {
                  en: 'Read a short story about Twiga the giraffe reaching tender leaves on tall trees.',
                  sw: 'Soma hadithi fupi kuhusu Twiga anayefikia majani mabichi kwenye miti mirefu.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Love'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-eng-01',
                    subStrandId: 'substrand-eng-g3-stories',
                    type: 'READING_COMPREHENSION',
                    prompt: {
                      en: 'According to the story, why can Twiga reach the top leaves of acacia trees?',
                      sw: 'Kulingana na hadithi, kwa nini Twiga anaweza kufikia majani ya juu ya mti?'
                    },
                    readingPassage: {
                      en: 'Twiga is a gentle giraffe living in Kenya. She has a very long neck and long legs. Every morning, Twiga eats green leaves from the highest branches where smaller animals cannot reach.',
                      sw: 'Twiga ni mnyama mpole anayeishi Kenya. Ana shingo ndefu sana na miguu mirefu. Kila asubuhi, Twiga hula majani mabichi kwenye matawi ya juu kabisa ambapo wanyama wadogo hawawezi kufikia.'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G3-READING',
                    options: [
                      { id: 'opt-1', text: { en: 'Because she has a very long neck', sw: 'Kwa sababu ana shingo ndefu sana' } },
                      { id: 'opt-2', text: { en: 'Because she can fly like an eagle', sw: 'Kwa sababu anaweza kuruka kama tai' } },
                      { id: 'opt-3', text: { en: 'Because she climbs the tree', sw: 'Kwa sababu anapanda mti' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The passage explicitly says Twiga has a very long neck to reach high branches.',
                      sw: 'Kifungu kinaeleza wazi kuwa Twiga ana shingo ndefu inayomsaidia kufikia matawi ya juu.'
                    },
                    socraticHint: {
                      en: 'What special body part does a giraffe have?',
                      sw: 'Twiga ana sehemu gani maalum mwilini mwake?'
                    },
                    kenyanCulturalContext: 'Kenya is home to endangered Rothschild and reticulated giraffes.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-eng-02',
                    subStrandId: 'substrand-eng-g3-stories',
                    type: 'LISTEN_CHOOSE',
                    prompt: {
                      en: 'Listen to the spoken animal name and choose the correct option:',
                      sw: 'Sikiliza jina la mnyama linalotamkwa kisha uchague jibu sahihi:'
                    },
                    audioSpeechPrompt: {
                      textToSpeak: 'Elephant',
                      language: 'en-KE'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G3-LISTENING',
                    options: [
                      { id: 'opt-1', text: { en: 'Elephant', sw: 'Elephant' } },
                      { id: 'opt-2', text: { en: 'Leopard', sw: 'Leopard' } },
                      { id: 'opt-3', text: { en: 'Buffalo', sw: 'Buffalo' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The audio clearly pronounced "Elephant".',
                      sw: 'Sauti ilitamka neno "Elephant".'
                    },
                    socraticHint: {
                      en: 'Listen again to the starting "El..." sound.',
                      sw: 'Sikiliza tena sauti ya kuanzia ya "El...".'
                    },
                    kenyanCulturalContext: 'Listening skills support bilingual fluency in Lower Primary.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-eng-g3-sentence',
                subStrandId: 'substrand-eng-g3-stories',
                order: 2,
                title: { en: 'Building Fun Sentences', sw: 'Kujenga Sentensi Rahisi' },
                storyContext: {
                  en: 'Arrange words into a correct sentence about going to school.',
                  sw: 'Panga maneno kuunda sentensi sahihi kuhusu kwenda shuleni.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-eng-g3-giraffe'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-eng-03',
                    subStrandId: 'substrand-eng-g3-stories',
                    type: 'WORD_BUILDER',
                    prompt: {
                      en: 'Arrange the tiles to build a complete sentence:',
                      sw: 'Panga vigae kuunda sentensi kamili:'
                    },
                    wordBuilderTokens: {
                      correctSentence: 'I love reading books',
                      scrambledTokens: ['books', 'love', 'I', 'reading']
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G3-GRAMMAR',
                    explanation: {
                      en: '"I love reading books" starts with pronoun "I" and expresses a complete thought.',
                      sw: '"I love reading books" huanza na "I" na huunda sentensi sahihi.'
                    },
                    socraticHint: {
                      en: 'Start with the capitalized word "I".',
                      sw: 'Anza na neno lenye herufi kubwa "I".'
                    },
                    kenyanCulturalContext: 'Early reading habits lay the foundation for lifelong CBC competency.',
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

  // 3. Kiswahili Language Activities
  {
    id: 'kisw-act-g3',
    gradeId: 'grade-3',
    code: 'KISW-ACT-G3',
    title: { en: 'Kiswahili Language Activities', sw: 'Shughuli za Kiswahili' },
    description: {
      en: 'Kusikiliza, kutamka sauti za herufi, kusoma maneno, na salamu za heshima.',
      sw: 'Kusikiliza, kutamka sauti za herufi, kusoma maneno, na salamu za heshima.'
    },
    icon: 'Feather',
    color: '#f59e0b',
    bannerGradient: 'from-amber-600 to-orange-800',
    order: 3,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-kisw-g3-sauti',
        subjectId: 'kisw-act-g3',
        code: 'KISW-G3-STR-01',
        title: { en: 'Sauti za Herufi na Kusoma', sw: 'Sauti za Herufi na Kusoma' },
        description: {
          en: 'Silabi, kusoma maneno, na salamu za asubuhi, mchana na jioni.',
          sw: 'Silabi, kusoma maneno, na salamu za asubuhi, mchana na jioni.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-kisw-g3-salamu',
            strandId: 'strand-kisw-g3-sauti',
            code: 'KISW-G3-SUB-01',
            title: { en: 'Salamu na Heshima Nyumbani', sw: 'Salamu na Heshima Nyumbani' },
            description: {
              en: 'Kutambua na kutumia salamu za heshima kama "Shikamoo" na "Marahaba".',
              sw: 'Kutambua na kutumia salamu za heshima kama "Shikamoo" na "Marahaba".'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration', 'Citizenship'],
            cbeValues: ['Respect', 'Love'],
            estimatedMinutes: 15,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-kisw-g3-salamu-njiani',
                subStrandId: 'substrand-kisw-g3-salamu',
                order: 1,
                title: { en: 'Salamu Njiani', sw: 'Salamu Njiani Kuelekea Shuleni' },
                storyContext: {
                  en: 'Amina anamsalimu bibi yake asubuhi anapoelekea shuleni.',
                  sw: 'Amina anamsalimu bibi yake asubuhi anapoelekea shuleni.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-kisw-01',
                    subStrandId: 'substrand-kisw-g3-salamu',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Mtoto anapomwamkia mtu mzima au bibi yake "Shikamoo", mtu mzima hujibu nini?',
                      sw: 'Mtoto anapomwamkia mtu mzima au bibi yake "Shikamoo", mtu mzima hujibu nini?'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G3-SALAMU',
                    options: [
                      { id: 'opt-1', text: { en: 'Marahaba', sw: 'Marahaba' } },
                      { id: 'opt-2', text: { en: 'Nzuri', sw: 'Nzuri' } },
                      { id: 'opt-3', text: { en: 'Asante', sw: 'Asante' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Jawabu sahihi la salamu ya heshima ya "Shikamoo" ni "Marahaba".',
                      sw: 'Jawabu sahihi la salamu ya heshima ya "Shikamoo" ni "Marahaba".'
                    },
                    socraticHint: {
                      en: 'Kumbuka neno ambalo wazee hutumia kuonyesha kibali na heshima.',
                      sw: 'Kumbuka neno ambalo wazee hutumia kuonyesha kibali na heshima.'
                    },
                    kenyanCulturalContext: 'Heshima kwa wazee ni utamaduni mtukufu wa Kiafrika nchini Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-kisw-02',
                    subStrandId: 'substrand-kisw-g3-salamu',
                    type: 'MATCHING',
                    prompt: {
                      en: 'Oanisha salamu na wakati wake sahihi wa siku:',
                      sw: 'Oanisha salamu na wakati wake sahihi wa siku:'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G3-SALAMU',
                    matchingPairs: [
                      { leftId: 'l1', leftText: { en: 'Habari za asubuhi?', sw: 'Habari za asubuhi?' }, rightId: 'r1', rightText: { en: 'Jua linapochomoza', sw: 'Wakati wa kupambazuka' } },
                      { leftId: 'l2', leftText: { en: 'Habari za jioni?', sw: 'Habari za jioni?' }, rightId: 'r2', rightText: { en: 'Jua linapotua', sw: 'Wakati wa machweo' } }
                    ],
                    explanation: {
                      en: 'Asubuhi ni mwanzo wa siku, na jioni ni wakati jua linapotua.',
                      sw: 'Asubuhi ni mwanzo wa siku na jioni ni mwisho wa siku.'
                    },
                    socraticHint: {
                      en: 'Asubuhi inahusiana na jua kuchomoza au kutua?',
                      sw: 'Asubuhi inahusiana na jua kuchomoza au kutua?'
                    },
                    kenyanCulturalContext: 'Kusalimiana huleta upendo na usalama mtaani.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-kisw-g3-maneno',
                subStrandId: 'substrand-kisw-g3-salamu',
                order: 2,
                title: { en: 'Kusoma Maneno ya Nyumbani', sw: 'Kusoma Maneno ya Nyumbani' },
                storyContext: {
                  en: 'Soma majina ya vyombo na vitu vinavyopatikana nyumbani.',
                  sw: 'Soma majina ya vyombo na vitu vinavyopatikana nyumbani.'
                },
                characterName: 'Juma',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-kisw-g3-salamu-njiani'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-kisw-03',
                    subStrandId: 'substrand-kisw-g3-salamu',
                    type: 'FILL_BLANK',
                    prompt: {
                      en: 'Jaza pengo: "Mama anapika chakula jikoni kwa kutumia ______ (sufuria/kalamu)."',
                      sw: 'Jaza pengo: "Mama anapika chakula jikoni kwa kutumia ______ (sufuria/kalamu)."'
                    },
                    blankTemplate: {
                      en: 'Mama anapika chakula jikoni kwa kutumia [BLANK].',
                      sw: 'Mama anapika chakula jikoni kwa kutumia [BLANK].'
                    },
                    fillBlankAnswers: ['sufuria', 'Sufuria'],
                    difficulty: 1,
                    strandTag: 'KISW-G3-MSAMIATI',
                    explanation: {
                      en: 'Chombo cha kupikia chakula ni sufuria, si kalamu.',
                      sw: 'Chombo cha kupikia chakula ni sufuria.'
                    },
                    socraticHint: {
                      en: 'Je, chakula hupikwa kwa kalamu au kwa chombo cha jikoni?',
                      sw: 'Je, chakula hupikwa kwa kalamu au kwa chombo cha jikoni?'
                    },
                    kenyanCulturalContext: 'Msamiati wa nyumbani hupanua uwezo wa mtoto wa kuwasiliana.',
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

  // 4. Environmental Activities
  {
    id: 'env-act-g3',
    gradeId: 'grade-3',
    code: 'ENV-ACT-G3',
    title: { en: 'Environmental Activities', sw: 'Shughuli za Mazingira' },
    description: {
      en: 'Weather, caring for our school compound, safe clean water, and domestic animals.',
      sw: 'Hali ya anga, usafi wa mazingira ya shule, maji safi na salama, na wanyama wa nyumbani.'
    },
    icon: 'Sun',
    color: '#0ea5e9',
    bannerGradient: 'from-sky-600 to-cyan-800',
    order: 4,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-env-g3-weather',
        subjectId: 'env-act-g3',
        code: 'ENV-G3-STR-01',
        title: { en: 'Weather & Clean Environment', sw: 'Hali ya Anga na Mazingira Safi' },
        description: {
          en: 'Sunny, rainy, windy, and cloudy weather and proper waste disposal.',
          sw: 'Hali ya jua, mvua, upepo na mawingu, pamoja na utupaji taka sahihi.'
        },
        icon: 'CloudRain',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-env-g3-clean-school',
            strandId: 'strand-env-g3-weather',
            code: 'ENV-G3-SUB-01',
            title: { en: 'Keeping Our School Clean', sw: 'Kuweka Shule Yetu Safi' },
            description: {
              en: 'Sort litter into waste bins and keep drains clear to prevent mosquito breeding.',
              sw: 'Kupanga taka kwenye mapipa na kusafisha mifereji kuzuia mbu.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship', 'Self-efficacy'],
            cbeValues: ['Responsibility', 'Respect'],
            estimatedMinutes: 15,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-env-g3-bin-patrol',
                subStrandId: 'substrand-env-g3-clean-school',
                order: 1,
                title: { en: 'School Clean-up Heroes', sw: 'Mashujaa wa Usafi Shuleni' },
                storyContext: {
                  en: 'Join Amina and Baraka on Friday afternoon compound clean-up.',
                  sw: 'Ungana na Amina na Baraka kwenye usafi wa mazingira Ijumaa jioni.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-env-01',
                    subStrandId: 'substrand-env-g3-clean-school',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Where should you throw sweet wrappers and fruit peels after break time?',
                      sw: 'Unapaswa kutupa maganda ya matunda na karatasi za peremende wapi baada ya mapumziko?'
                    },
                    difficulty: 1,
                    strandTag: 'ENV-G3-WASTE',
                    options: [
                      { id: 'opt-1', text: { en: 'Inside the school dustbin / compost pit', sw: 'Ndani ya pipa la taka au shimo la mboji' } },
                      { id: 'opt-2', text: { en: 'On the classroom floor', sw: 'Chini sakafuni darasani' } },
                      { id: 'opt-3', text: { en: 'In the playground grass', sw: 'Kwenye nyasi uwanjani' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Putting litter in dustbins keeps the compound neat and prevents illnesses.',
                      sw: 'Kutupa taka kwenye mapipa huweka shule safi na kuzuia magonjwa.'
                    },
                    socraticHint: {
                      en: 'Which place is designed specifically for collecting trash?',
                      sw: 'Ni sehemu gani iliyotengwa maalum kwa ajili ya kukusanya taka?'
                    },
                    kenyanCulturalContext: 'Responsible waste disposal is taught from Grade 1 across Kenyan schools.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-env-02',
                    subStrandId: 'substrand-env-g3-clean-school',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Stagnant dirty water in open cans can breed mosquitoes that cause malaria.',
                      sw: 'Kweli au Si Kweli: Maji yaliyosimama kwenye mikebe ya wazi yanaweza kuzalisha mbu wanaosababisha malaria.'
                    },
                    difficulty: 1,
                    strandTag: 'ENV-G3-HEALTH',
                    correctBoolean: true,
                    explanation: {
                      en: 'Mosquitoes lay eggs in stagnant water. Emptying open containers prevents malaria.',
                      sw: 'Mbu hutaga mayai kwenye maji yaliyotuama. Kumwaga maji hayo huzuia malaria.'
                    },
                    socraticHint: {
                      en: 'Do mosquitoes like flying over dry ground or laying eggs in still water puddles?',
                      sw: 'Je, mbu hutaga mayai ardhini pakavu au kwenye madimbwi ya maji?'
                    },
                    kenyanCulturalContext: 'Malaria prevention through environmental hygiene is a life-saving CBC competency.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-env-g3-weather-chart',
                subStrandId: 'substrand-env-g3-clean-school',
                order: 2,
                title: { en: 'Reading the Weather Symbols', sw: 'Kusoma Alama za Hali ya Anga' },
                storyContext: {
                  en: 'Look at the sky in Nakuru and record if today is sunny, rainy, or windy.',
                  sw: 'Tazama anga la Nakuru na urekodi iwapo leo kuna jua, mvua au upepo.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-env-g3-bin-patrol'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-env-03',
                    subStrandId: 'substrand-env-g3-clean-school',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What should you wear when it is very cold and rainy in the morning?',
                      sw: 'Unapaswa kuvaa nini wakati kukiwa na baridi kali na mvua asubuhi?'
                    },
                    difficulty: 1,
                    strandTag: 'ENV-G3-WEATHER',
                    options: [
                      { id: 'opt-1', text: { en: 'A warm sweater or raincoat', sw: 'Sweta nzito au koti la mvua' } },
                      { id: 'opt-2', text: { en: 'Swimming costume', sw: 'Nguo ya kuogelea' } },
                      { id: 'opt-3', text: { en: 'Just a light vest', sw: 'Fulana nyepesi pekee' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Warm clothes and raincoats protect you from cold and flu during wet weather.',
                      sw: 'Mavazi mazito hukulinda kutokana na baridi na homa wakati wa mvua.'
                    },
                    socraticHint: {
                      en: 'What keeps you warm when it rains?',
                      sw: 'Ni kitu gani kinakupa joto mvua inaponyesha?'
                    },
                    kenyanCulturalContext: 'Kenyan highlands experience chilly rainy mornings in June and July.',
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

  // 5. Religious Education (CRE / IRE / HRE)
  {
    id: 're-g3',
    gradeId: 'grade-3',
    code: 'RE-G3',
    title: { en: 'Religious Education (CRE / IRE)', sw: 'Elimu ya Dini (CRE / IRE)' },
    description: {
      en: 'Creation, gratitude, obedience to parents, sharing, and living in peace.',
      sw: 'Uumbaji, shukrani, kuwatii wazazi, kusaidiana na kuishi kwa amani.'
    },
    icon: 'Heart',
    color: '#3b82f6',
    bannerGradient: 'from-blue-600 to-indigo-800',
    order: 5,
    religiousEducationStream: 'CRE',
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-re-g3-sharing',
        subjectId: 're-g3',
        code: 'RE-G3-STR-01',
        title: { en: 'Kindness, Sharing and Family', sw: 'Wema, Kusaidiana na Familia' },
        description: {
          en: 'Love for family members and sharing toys, food, and books cheerfully.',
          sw: 'Upendo katika familia na kugawana vinyago, chakula na vitabu kwa furaha.'
        },
        icon: 'Users',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-re-g3-kindness',
            strandId: 'strand-re-g3-sharing',
            code: 'RE-G3-SUB-01',
            title: { en: 'Acts of Kindness at Home', sw: 'Matendo ya Wema Nyumbani' },
            description: {
              en: 'Demonstrate kindness by helping younger siblings and thanking caregivers.',
              sw: 'Kuonyesha wema kwa kusaidia wadogo na kuwashukuru wazazi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Love', 'Respect', 'Peace'],
            estimatedMinutes: 15,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-re-g3-sharing-bread',
                subStrandId: 'substrand-re-g3-kindness',
                order: 1,
                title: { en: 'Sharing with Little Sister', sw: 'Kugawana na Mdogo Wangu' },
                storyContext: {
                  en: 'Amina shares her ripe banana with her younger brother after school.',
                  sw: 'Amina anamgawia kaka yake mdogo ndizi iliyoiva baada ya shule.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Love', 'Peace'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-re-01',
                    subStrandId: 'substrand-re-g3-kindness',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'When someone shares something with you, what magic word should you always say?',
                      sw: 'Mtu anapokupa kitu au kukusaidia, unapaswa kusema neno gani la heshima?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G3-VALUES',
                    options: [
                      { id: 'opt-1', text: { en: '"Thank you" / "Asante"', sw: '"Asante sana"' } },
                      { id: 'opt-2', text: { en: '"Give me more!"', sw: '"Niongezee zaidi!"' } },
                      { id: 'opt-3', text: { en: 'Nothing', sw: 'Kukaa kimya' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Saying "Asante" (Thank you) shows gratitude and warm appreciation.',
                      sw: 'Kusema "Asante" kunaonyesha shukrani na heshima.'
                    },
                    socraticHint: {
                      en: 'What word shows you are grateful for kindness?',
                      sw: 'Ni neno gani linaonyesha shukrani kwa wema uliofanyiwa?'
                    },
                    kenyanCulturalContext: 'Gratitude strengthens bonds in families across Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-re-02',
                    subStrandId: 'substrand-re-g3-kindness',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Sharing our toys and books brings joy and builds strong friendships.',
                      sw: 'Kweli au Si Kweli: Kugawana vinyago na vitabu huleta furaha na kujenga urafiki imara.'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G3-VALUES',
                    correctBoolean: true,
                    explanation: {
                      en: 'Generosity and sharing build peace and happiness among children.',
                      sw: 'Ukarimu na kugawana huleta amani na furaha miongoni mwa watoto.'
                    },
                    socraticHint: {
                      en: 'Do you feel happy when friends play together and share toys?',
                      sw: 'Je, unahisi furaha mnapocheza pamoja na marafiki kwa kushirikiana?'
                    },
                    kenyanCulturalContext: 'Values of solidarity and generosity form the ethical heart of CBC.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-re-g3-respect',
                subStrandId: 'substrand-re-g3-kindness',
                order: 2,
                title: { en: 'Respecting Parents and Teachers', sw: 'Kuheshimu Wazazi na Walimu' },
                storyContext: {
                  en: 'Understanding how obedience and listening attentively make family life peaceful.',
                  sw: 'Kufahamu jinsi utiifu na kusikiliza kwa makini huleta utulivu nyumbani.'
                },
                characterName: 'Mwalimu',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: ['quest-re-g3-sharing-bread'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-re-03',
                    subStrandId: 'substrand-re-g3-kindness',
                    type: 'SCENARIO',
                    prompt: {
                      en: 'When your parent asks you to help put your shoes away, what is the best response?',
                      sw: 'Mzazi anapokuomba upange viatu vyako vizuri, ni jambo gani bora la kufanya?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G3-VALUES',
                    options: [
                      { id: 'opt-1', text: { en: 'Do it promptly and cheerfully', sw: 'Kufanya haraka kwa furaha' } },
                      { id: 'opt-2', text: { en: 'Complain loudly and ignore them', sw: 'Kupiga kelele na kukataa' } },
                      { id: 'opt-3', text: { en: 'Hide under the bed', sw: 'Kujificha chini ya kitanda' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Helping at home cheerfully demonstrates obedience and love for parents.',
                      sw: 'Kusaidia nyumbani kwa furaha kunaonyesha utiifu na upendo kwa wazazi.'
                    },
                    socraticHint: {
                      en: 'How do good sons and daughters respond when asked to help?',
                      sw: 'Watoto wema huitikiaje wanapoombwa msaada na wazazi?'
                    },
                    kenyanCulturalContext: 'Obedience and filial respect are cherished virtues across Kenyan cultures.',
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

  // 6. Creative Activities (Art & Craft, Music, PHE)
  {
    id: 'creative-act-g3',
    gradeId: 'grade-3',
    code: 'CREATIVE-ACT-G3',
    title: { en: 'Creative Activities', sw: 'Shughuli za Ubunifu' },
    description: {
      en: 'Drawing lines and shapes, clay modelling, singing folk songs, and joyful movement games.',
      sw: 'Kuchora mistari na maumbo, kufinyanga udongo, nyimbo za kiasili, na michezo.'
    },
    icon: 'Palette',
    color: '#a855f7',
    bannerGradient: 'from-purple-600 to-fuchsia-800',
    order: 6,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-ca-g3-play',
        subjectId: 'creative-act-g3',
        code: 'CA-G3-STR-01',
        title: { en: 'Art, Music & Movement Play', sw: 'Sanaa, Muziki na Michezo' },
        description: {
          en: 'Pattern printing with leaves, clapping rhythms, and tag running games.',
          sw: 'Kupiga chapa kwa majani, kupiga makofi kwa mdundo, na michezo ya kukimbizana.'
        },
        icon: 'Music',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-ca-g3-patterns',
            strandId: 'strand-ca-g3-play',
            code: 'CA-G3-SUB-01',
            title: { en: 'Leaf Printing & Clapping Beats', sw: 'Chapa za Majani na Midundo' },
            description: {
              en: 'Create leaf stamp patterns with poster paint and clap along to steady beats.',
              sw: 'Kutengeneza mifumo ya chapa za majani na kupiga makofi kwa mahadhi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Creativity and imagination'],
            cbeValues: ['Unity', 'Love'],
            estimatedMinutes: 15,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-ca-g3-leaf-art',
                subStrandId: 'substrand-ca-g3-patterns',
                order: 1,
                title: { en: 'Making Nature Patterns', sw: 'Kutengeneza Mifumo ya Asili' },
                storyContext: {
                  en: 'Dip fallen mango leaves in washable green and yellow paint to stamp border designs.',
                  sw: 'Chovya majani ya maembe kwenye rangi kisha piga chapa maridadi.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Love'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-ca-01',
                    subStrandId: 'substrand-ca-g3-patterns',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What natural material from the garden can we use as a stamp for printing patterns?',
                      sw: 'Ni kitu gani cha asili kutoka bustanini tunachoweza kutumia kama chapa ya kuchora?'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G3-ART',
                    options: [
                      { id: 'opt-1', text: { en: 'Fallen tree leaves with raised veins', sw: 'Majani yaliyoanguka yenye mishipa' } },
                      { id: 'opt-2', text: { en: 'A glass bottle', sw: 'Chupa ya kioo' } },
                      { id: 'opt-3', text: { en: 'A metal nail', sw: 'Msumari' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Fallen leaves have textured veins that print beautiful repeating patterns on paper.',
                      sw: 'Majani yana mistari mizuri inayotoa chapa maridadi kwenye karatasi.'
                    },
                    socraticHint: {
                      en: 'Which soft, flat garden item creates leaf shapes when dipped in paint?',
                      sw: 'Ni kitu gani chembamba cha asili kinachochovya rangi bila madhara?'
                    },
                    kenyanCulturalContext: 'Eco-friendly art using locally available natural materials is central to CBC.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g3-ca-02',
                    subStrandId: 'substrand-ca-g3-patterns',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Clapping in time with a song helps us feel the musical rhythm.',
                      sw: 'Kweli au Si Kweli: Kupiga makofi kwa kufuata wimbo husaidia kuhisi mdundo wa muziki.'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G3-MUSIC',
                    correctBoolean: true,
                    explanation: {
                      en: 'Clapping hands keeps a steady beat and develops musical timing.',
                      sw: 'Kupiga makofi huweka mdundo thabiti na kukuza hisia za kimuziki.'
                    },
                    socraticHint: {
                      en: 'Does your body want to clap or dance when hearing a fun song?',
                      sw: 'Je, mwili wako hupenda kupiga makofi unaposikia wimbo mzuri?'
                    },
                    kenyanCulturalContext: 'Call-and-response singing and clapping is a joyful hallmark of Kenyan childhood.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-ca-g3-hops',
                subStrandId: 'substrand-ca-g3-patterns',
                order: 2,
                title: { en: 'Bouncing and Skipping Games', sw: 'Michezo ya Kuruka na Kukimbia' },
                storyContext: {
                  en: 'Play traditional Kenyan skipping rope and hopscotch games on the school court.',
                  sw: 'Cheza mchezo wa kamba na kuruka viunzi uwanjani shuleni.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Self-efficacy'],
                cbeValues: ['Unity'],
                prerequisiteQuestIds: ['quest-ca-g3-leaf-art'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g3-ca-03',
                    subStrandId: 'substrand-ca-g3-patterns',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Drinking clean water after running and skipping helps your body rehydrate.',
                      sw: 'Kweli au Si Kweli: Kunywa maji safi baada ya kukimbia na kuruka husaidia kurudisha maji mwilini.'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G3-PHE',
                    correctBoolean: true,
                    explanation: {
                      en: 'Water restores fluids lost through sweat during energetic play.',
                      sw: 'Maji hurudisha unyevu mwilini unaopotea kupitia jasho wakati wa mchezo.'
                    },
                    socraticHint: {
                      en: 'Why do you feel thirsty after playing tag in the sun?',
                      sw: 'Kwa nini unahisi kiu baada ya kucheza juani?'
                    },
                    kenyanCulturalContext: 'Hydration and active play keep Kenyan children strong and focused.',
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

  // 7. Indigenous Language Activities (Optional placeholder)
  {
    id: 'indig-act-g3',
    gradeId: 'grade-3',
    code: 'INDIG-ACT-G3',
    title: { en: 'Indigenous Language Activities (Optional)', sw: 'Shughuli za Lugha ya Asili (Hiari)' },
    description: {
      en: 'Mother tongue listening, naming farm animals, and local lullabies.',
      sw: 'Kusikiliza lugha ya kienyeji, kutaja wanyama wa nyumbani, na nyimbo za kubembeleza.'
    },
    icon: 'MessageSquare',
    color: '#06b6d4',
    bannerGradient: 'from-cyan-600 to-teal-800',
    order: 7,
    isOptional: true,
    prerequisiteIds: [],
    sourceStatus: 'TODO: verify with KICD design',
    strands: [
      {
        id: 'strand-indig-g3-placeholder',
        subjectId: 'indig-act-g3',
        code: 'INDIG-G3-STR-01',
        title: { en: 'Cultural Heritage Sounds (Preview)', sw: 'Sauti za Kiasili (Onyesho la Awali)' },
        description: {
          en: 'Appreciation of indigenous mother tongues and traditional wisdom.',
          sw: 'Kuthamini lugha za kienyeji na hekima za wazee wa kale.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'TODO: verify with KICD design',
        subStrands: [
          {
            id: 'substrand-indig-g3-placeholder',
            strandId: 'strand-indig-g3-placeholder',
            code: 'INDIG-G3-SUB-01',
            title: { en: 'Home Animal Names', sw: 'Majina ya Wanyama Nyumbani' },
            description: {
              en: 'Compare domestic animal names across Kenyan linguistic families.',
              sw: 'Kulinganisha majina ya wanyama katika lugha za asili.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Respect'],
            estimatedMinutes: 12,
            sourceStatus: 'TODO: verify with KICD design',
            quests: [
              {
                id: 'quest-indig-g3-preview',
                subStrandId: 'substrand-indig-g3-placeholder',
                order: 1,
                title: { en: 'Words for Our Farm Friends', sw: 'Majina ya Rafiki zetu Shambani' },
                storyContext: {
                  en: 'Discover how goats, cows, and chickens are called in different Kenyan counties.',
                  sw: 'Gundua jinsi ng’ombe, mbuzi na kuku wanavyoitwa katika kaunti mbalimbali.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 20,
                coinReward: 10,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'TODO: verify with KICD design',
                questions: [
                  {
                    id: 'q-g3-indig-01',
                    subStrandId: 'substrand-indig-g3-placeholder',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Learning to respect all mother tongues in Kenya helps our country stay united and strong. True or False?',
                      sw: 'Kujifunza kuheshimu lugha zote za asili nchini Kenya husaidia nchi yetu kuwa na umoja. Kweli au Si Kweli?'
                    },
                    difficulty: 1,
                    strandTag: 'INDIG-G3-CULTURE',
                    options: [
                      { id: 'opt-1', text: { en: 'True, unity in diversity makes Kenya strong', sw: 'Kweli, umoja katika utofauti huimarisha Kenya' } },
                      { id: 'opt-2', text: { en: 'False', sw: 'Si kweli' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Celebrating our cultural diversity while uniting as one nation is Kenya’s pride.',
                      sw: 'Kusherehekea utofauti wetu wa kitamaduni huku tukiwa taifa moja ndiyo fahari ya Kenya.'
                    },
                    socraticHint: {
                      en: 'Does respecting our neighbours make Kenya more peaceful?',
                      sw: 'Je, kuwaheshimu majirani huleta amani nchini?'
                    },
                    kenyanCulturalContext: 'Content flagged as placeholder pending specific KICD design syllabus release.',
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

export const grade3Curriculum: CurriculumGrade = {
  id: 'grade-3',
  code: 'G3',
  name: { en: 'Grade 3', sw: 'Gredi ya 3' },
  band: 'LOWER_PRIMARY',
  description: {
    en: 'Lower Primary foundational activities: Mathematics, English, Kiswahili, Environmental, Religious, and Creative Activities.',
    sw: 'Shughuli za msingi za Gredi ya 3: Hisabati, Kiingereza, Kiswahili, Mazingira, Dini, na Sanaa za Ubunifu.'
  },
  order: 1,
  subjects: grade3Subjects
};
