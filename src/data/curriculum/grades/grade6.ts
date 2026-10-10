// Grade 6 (Upper Primary) Curriculum Design & Seed Data
// Prepares learners for KPSEA (Kenya Primary School Education Assessment) and Junior Secondary transition.

import { CurriculumGrade, CurriculumSubject } from '../types.js';

export const grade6Subjects: CurriculumSubject[] = [
  // 1. Mathematics
  {
    id: 'la-math-g6',
    gradeId: 'grade-6',
    code: 'MATH-G6',
    title: { en: 'Mathematics', sw: 'Hisabati' },
    description: {
      en: 'Ratios, proportions, percentages, speed and distance, algebra, volume, and data handling.',
      sw: 'Uwiano, asilimia, mwendo na umbali, aljebra, ujazo, na takwimu.'
    },
    icon: 'Calculator',
    color: '#10b981',
    bannerGradient: 'from-emerald-600 to-teal-800',
    order: 1,
    prerequisiteIds: ['la-math-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-math-g6-ratio',
        subjectId: 'la-math-g6',
        code: 'MATH-G6-STR-01',
        title: { en: 'Ratios and Percentages', sw: 'Uwiano na Asilimia' },
        description: {
          en: 'Compare quantities using ratios (e.g. 2:3) and solve profit/loss percentages.',
          sw: 'Kulinganisha viwango kwa uwiano na asilimia ya faida na hasara.'
        },
        icon: 'Percent',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-math-g6-commercial',
            strandId: 'strand-math-g6-ratio',
            code: 'MATH-G6-SUB-01',
            title: { en: 'Commercial Arithmetic & Profit', sw: 'Hesabu za Kibiashara na Faida' },
            description: {
              en: 'Calculate percentage profit and loss on market produce sales.',
              sw: 'Kupiga hesabu ya asilimia ya faida na hasara katika biashara ya soko.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy'],
            cbeValues: ['Integrity', 'Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-math-g6-profit-calc',
                subStrandId: 'substrand-math-g6-commercial',
                order: 1,
                title: { en: 'Amina’s Market Profit Margin', sw: 'Faida ya Biashara ya Amina' },
                storyContext: {
                  en: 'Amina bought a basket of avocados for KES 400 and sold all of them for KES 500 at Nakuru market.',
                  sw: 'Amina alinunua kikapu cha maparachichi kwa KES 400 akauza yote kwa KES 500 sokoni Nakuru.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 3,
                estimatedMinutes: 12,
                xpReward: 55,
                coinReward: 30,
                cbeCompetencies: ['Financial literacy', 'Critical thinking and problem solving'],
                cbeValues: ['Integrity'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-math-01',
                    subStrandId: 'substrand-math-g6-commercial',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'Buying price is KES 400. Selling price is KES 500. Enter the cash profit in Kenyan shillings (KES).',
                      sw: 'Bei ya kununua ni KES 400. Bei ya kuuza ni KES 500. Andika faida kwa shilingi za Kenya (KES).'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G6-MONEY',
                    numericAnswer: { value: 100, unit: 'KES' },
                    explanation: {
                      en: 'Profit = Selling Price - Buying Price = KES 500 - KES 400 = KES 100.',
                      sw: 'Faida = Bei ya Kuuza - Bei ya Kununua = KES 500 - KES 400 = KES 100.'
                    },
                    socraticHint: {
                      en: 'Subtract the buying cost (400) from the money received (500).',
                      sw: 'Toa gharama ya kununua (400) kutoka kwa mapato ya mauzo (500).'
                    },
                    kenyanCulturalContext: 'Basic business arithmetic prepares Grade 6 learners for economic self-reliance.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-math-02',
                    subStrandId: 'substrand-math-g6-commercial',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What is the percentage profit if the profit is KES 100 on a buying price of KES 400?',
                      sw: 'Je, ni asilimia ngapi ya faida ikiwa faida ni KES 100 kwa gharama ya kununua ya KES 400?'
                    },
                    difficulty: 3,
                    strandTag: 'MATH-G6-PERCENT',
                    options: [
                      { id: 'opt-1', text: { en: '25%', sw: '25%' } },
                      { id: 'opt-2', text: { en: '20%', sw: '20%' } },
                      { id: 'opt-3', text: { en: '50%', sw: '50%' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: '(100 / 400) × 100% = 1/4 × 100% = 25% profit.',
                      sw: '(100 / 400) × 100% = robo ya 100% = 25% ya faida.'
                    },
                    socraticHint: {
                      en: 'Divide 100 by 400. That is 1/4. What is 1/4 as a percentage?',
                      sw: 'Gawa 100 kwa 400. Hiyo ni robo (1/4). Robo kama asilimia ni ngapi?'
                    },
                    kenyanCulturalContext: 'Commercial arithmetic is a cornerstone of the Grade 6 CBC syllabus.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-math-g6-speed',
                subStrandId: 'substrand-math-g6-commercial',
                order: 2,
                title: { en: 'The Madaraka Express Train Speed', sw: 'Kasi ya Treni ya Madaraka Express' },
                storyContext: {
                  en: 'Calculate the speed of the SGR train traveling 480 kilometres from Nairobi to Mombasa in 4 hours.',
                  sw: 'Piga hesabu ya kasi ya treni ya SGR inayotembea kilomita 480 kutoka Nairobi hadi Mombasa kwa saa 4.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 3,
                estimatedMinutes: 10,
                xpReward: 50,
                coinReward: 25,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-math-g6-profit-calc'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-math-03',
                    subStrandId: 'substrand-math-g6-commercial',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'Distance is 480 km. Time taken is 4 hours. Enter the average speed in km/h.',
                      sw: 'Umbali ni km 480. Muda uliotumika ni saa 4. Andika wastani wa kasi kwa km/h.'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G6-SPEED',
                    numericAnswer: { value: 120, unit: 'km/h' },
                    explanation: {
                      en: 'Speed = Distance / Time = 480 km / 4 hours = 120 km/h.',
                      sw: 'Kasi = Umbali / Muda = km 480 / saa 4 = 120 km/h.'
                    },
                    socraticHint: {
                      en: 'Divide 480 by 4.',
                      sw: 'Gawa 480 kwa 4.'
                    },
                    kenyanCulturalContext: 'The Standard Gauge Railway (SGR) connects Nairobi and Mombasa as a modern transport artery.',
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

  // 2. English (Grade 6)
  {
    id: 'la-eng-g6',
    gradeId: 'grade-6',
    code: 'ENG-G6',
    title: { en: 'English', sw: 'Kiingereza' },
    description: {
      en: 'Active & passive voice, conditional clauses, formal letter writing, and summary comprehension.',
      sw: 'Kauli tenda na tendwa, sentensi za masharti, uandishi wa barua rasmi, na ufupisho.'
    },
    icon: 'BookOpen',
    color: '#8b5cf6',
    bannerGradient: 'from-violet-600 to-indigo-800',
    order: 2,
    prerequisiteIds: ['la-eng-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-eng-g6-formal',
        subjectId: 'la-eng-g6',
        code: 'ENG-G6-STR-01',
        title: { en: 'Formal Writing & Communication', sw: 'Uandishi Rasmi na Mawasiliano' },
        description: {
          en: 'Formal letters to school heads, invitation cards, and passive voice constructions.',
          sw: 'Barua rasmi kwa mkuu wa shule, kadi za mwaliko, na kauli tendwa.'
        },
        icon: 'Mail',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-eng-g6-letters',
            strandId: 'strand-eng-g6-formal',
            code: 'ENG-G6-SUB-01',
            title: { en: 'Formal Letters & Requests', sw: 'Barua Rasmi za Maombi' },
            description: {
              en: 'Write polite formal letters with two addresses, date, reference line, and formal sign-off.',
              sw: 'Kuandika barua rasmi yenye anwani mbili, tarehe, mada na hitimisho mwafaka.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration'],
            cbeValues: ['Respect', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-eng-g6-letter-head',
                subStrandId: 'substrand-eng-g6-letters',
                order: 1,
                title: { en: 'Requesting a Library Visit', sw: 'Kuomba Idhini ya Ziara ya Maktaba' },
                storyContext: {
                  en: 'Help Brian write a formal letter requesting permission to visit the Kenya National Library in Nakuru.',
                  sw: 'Msaidie Brian kuandika barua rasmi ya kuomba kutembelea Maktaba ya Kitaifa ya Nakuru.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
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
                    id: 'q-g6-eng-01',
                    subStrandId: 'substrand-eng-g6-letters',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which formal sign-off should be used when addressing a formal letter to "Dear Sir/Madam"?',
                      sw: 'Ni hitimisho gani rasmi linalotakiwa kutumika unapomwandikia barua "Dear Sir/Madam"?'
                    },
                    difficulty: 2,
                    strandTag: 'ENG-G6-WRITING',
                    options: [
                      { id: 'opt-1', text: { en: 'Yours faithfully,', sw: 'Yours faithfully,' } },
                      { id: 'opt-2', text: { en: 'Love from,', sw: 'Love from,' } },
                      { id: 'opt-3', text: { en: 'Cheers,', sw: 'Cheers,' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'When the recipient’s name is not known (Dear Sir/Madam), conclude with "Yours faithfully,".',
                      sw: 'Unapoanza na "Dear Sir/Madam", hitimisho sahihi la kisheria ni "Yours faithfully,".'
                    },
                    socraticHint: {
                      en: 'Is this an informal note to a best friend or an official business letter?',
                      sw: 'Je, hii ni barua ya kirafiki au ni barua rasmi ya kiofisi?'
                    },
                    kenyanCulturalContext: 'Formal letter correspondence is an essential professional capability taught in Grade 6.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-eng-02',
                    subStrandId: 'substrand-eng-g6-letters',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Convert to passive voice: "The headteacher awarded the diligent students."',
                      sw: 'Geuza iwe kauli tendwa: "The headteacher awarded the diligent students."'
                    },
                    difficulty: 2,
                    strandTag: 'ENG-G6-GRAMMAR',
                    options: [
                      { id: 'opt-1', text: { en: 'The diligent students were awarded by the headteacher.', sw: 'The diligent students were awarded by the headteacher.' } },
                      { id: 'opt-2', text: { en: 'The headteacher was awarded.', sw: 'The headteacher was awarded.' } },
                      { id: 'opt-3', text: { en: 'The diligent students awards.', sw: 'The diligent students awards.' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'In passive voice, the object "The diligent students" becomes the subject, with past auxiliary "were awarded".',
                      sw: 'Katika kauli tendwa, kitu "The diligent students" huja mwanzo kikifuatiwa na "were awarded".'
                    },
                    socraticHint: {
                      en: 'Who received the award? Put the students at the start of the sentence.',
                      sw: 'Nani aliyetunukiwa zawadi? Waweke wanafunzi mwanzo wa sentensi.'
                    },
                    kenyanCulturalContext: 'Grammar concord mastery directly aids KPSEA assessment preparation.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-eng-g6-comprehension',
                subStrandId: 'substrand-eng-g6-letters',
                order: 2,
                title: { en: 'Critical Reading on Renewable Energy', sw: 'Kusoma kwa Makini: Nishati Mbadala' },
                storyContext: {
                  en: 'Read about geothermal energy generation at Olkaria in Naivasha.',
                  sw: 'Soma kuhusu uzalishaji wa nishati ya mvuke wa jotoardhi kule Olkaria Naivasha.'
                },
                characterName: 'Mwalimu',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-eng-g6-letter-head'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-eng-03',
                    subStrandId: 'substrand-eng-g6-letters',
                    type: 'READING_COMPREHENSION',
                    prompt: {
                      en: 'Why is geothermal power produced at Olkaria called clean green energy?',
                      sw: 'Kwa nini umeme wa jotoardhi wa Olkaria unaitwa nishati safi?'
                    },
                    readingPassage: {
                      en: 'At Olkaria in Naivasha, deep volcanic steam turns giant turbines to generate electricity for millions of Kenyan homes. Unlike burning coal or oil, geothermal energy produces virtually no smoke or greenhouse gases.',
                      sw: 'Kule Olkaria Naivasha, mvuke wa jotoardhi huzungusha mashine kubwa kuzalisha umeme kwa mamilioni ya Wakenya. Tofauti na kuchoma makaa au mafuta, nishati ya jotoardhi haitoi moshi wala kuchafua mazingira.'
                    },
                    difficulty: 2,
                    strandTag: 'ENG-G6-READING',
                    options: [
                      { id: 'opt-1', text: { en: 'It produces electricity using natural underground steam without harmful smoke', sw: 'Hutumia mvuke wa asili bila kutoa moshi unaochafua hewa' } },
                      { id: 'opt-2', text: { en: 'It burns petrol in huge generators', sw: 'Huchoma petroli' } },
                      { id: 'opt-3', text: { en: 'It only works during thunderstorms', sw: 'Hufanya kazi wakati wa radi tu' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Geothermal harnesses natural underground steam without fossil fuel emissions.',
                      sw: 'Jotoardhi hutumia mvuke wa asili bila kutoa hewa chafu inayoharibu mazingira.'
                    },
                    socraticHint: {
                      en: 'Read the sentence contrasting geothermal with burning coal or oil.',
                      sw: 'Soma sentensi inayolinganisha mvuke na kuchoma makaa au mafuta.'
                    },
                    kenyanCulturalContext: 'Kenya is a global leader in geothermal and green renewable energy.',
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

  // 3. Kiswahili (Grade 6)
  {
    id: 'la-kisw-g6',
    gradeId: 'grade-6',
    code: 'KISW-G6',
    title: { en: 'Kiswahili', sw: 'Kiswahili' },
    description: {
      en: 'Uakifishaji, ngeli za U-YA na I-ZI, mashairi ya kimapokeo (vina na mizani), na hotuba.',
      sw: 'Uakifishaji, ngeli za U-YA na I-ZI, mashairi ya kimapokeo (vina na mizani), na hotuba.'
    },
    icon: 'Feather',
    color: '#f59e0b',
    bannerGradient: 'from-amber-600 to-orange-800',
    order: 3,
    prerequisiteIds: ['la-kisw-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-kisw-g6-shairi',
        subjectId: 'la-kisw-g6',
        code: 'KISW-G6-STR-01',
        title: { en: 'Ushairi na Lugha ya Kimapokeo', sw: 'Ushairi na Lugha ya Kimapokeo' },
        description: {
          en: 'Mizani, vina vya kati na vya mwisho, beti, na kibwagizo cha shairi.',
          sw: 'Mizani, vina vya kati na vya mwisho, beti, na kibwagizo cha shairi.'
        },
        icon: 'Music',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-kisw-g6-vina-mizani',
            strandId: 'strand-kisw-g6-shairi',
            code: 'KISW-G6-SUB-01',
            title: { en: 'Misingi ya Ushairi wa Kiswahili', sw: 'Misingi ya Ushairi wa Kiswahili' },
            description: {
              en: 'Kutambua vina, kuhesabu mizani ya mshororo, na kufafanua ujumbe wa shairi.',
              sw: 'Kutambua vina, kuhesabu mizani ya mshororo, na kufafanua ujumbe wa shairi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Creativity and imagination', 'Citizenship'],
            cbeValues: ['Patriotism', 'Unity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-kisw-g6-shairi-kenya',
                subStrandId: 'substrand-kisw-g6-vina-mizani',
                order: 1,
                title: { en: 'Shairi la Uzalendo wa Taifa', sw: 'Shairi la Uzalendo wa Taifa' },
                storyContext: {
                  en: 'Soma na ughani shairi lenye beti nne linalosifu amani na umoja wa Wakenya.',
                  sw: 'Soma na ughani shairi lenye beti nne linalosifu amani na umoja wa Wakenya.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Patriotism'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-kisw-01',
                    subStrandId: 'substrand-kisw-g6-vina-mizani',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Mstari mmoja katika ubeti wa shairi la Kiswahili huitwaje kitaalamu?',
                      sw: 'Mstari mmoja katika ubeti wa shairi la Kiswahili huitwaje kitaalamu?'
                    },
                    difficulty: 2,
                    strandTag: 'KISW-G6-USHAIRI',
                    options: [
                      { id: 'opt-1', text: { en: 'Mshororo', sw: 'Mshororo' } },
                      { id: 'opt-2', text: { en: 'Kina', sw: 'Kina' } },
                      { id: 'opt-3', text: { en: 'Mzani', sw: 'Mzani' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Mstari mmoja wa shairi huitwa mshororo; mstari unaorudiwa mwishoni mwa kila ubeti huitwa kibwagizo.',
                      sw: 'Mstari mmoja wa shairi unaitwa mshororo.'
                    },
                    socraticHint: {
                      en: 'Kumbuka istilahi za ushairi: Ubeti una mistari kadhaa inayoitwa...',
                      sw: 'Kumbuka istilahi za ushairi: Mstari katika shairi unaitwa nini?'
                    },
                    kenyanCulturalContext: 'Ushairi wa Kiswahili una historia ndefu na tajiri katika ukanda wa Afrika Mashariki.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-kisw-02',
                    subStrandId: 'substrand-kisw-g6-vina-mizani',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'Kweli au Si Kweli: Vina ni silabi zinazolingana zinazopatikana katikati au mwishoni mwa mishororo.',
                      sw: 'Kweli au Si Kweli: Vina ni silabi zinazolingana zinazopatikana katikati au mwishoni mwa mishororo.'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G6-USHAIRI',
                    correctBoolean: true,
                    explanation: {
                      en: 'Vina vya kati na vina vya mwisho huleta upatanisho wa sauti katika ushairi wa kimapokeo.',
                      sw: 'Vina huleta upatanisho wa sauti (rhythm & rhyme) katika shairi.'
                    },
                    socraticHint: {
                      en: 'Je, vina vinahusika na sauti zinazolingana za mwisho wa mshororo?',
                      sw: 'Je, vina vinahusika na sauti zinazolingana za mwisho wa mshororo?'
                    },
                    kenyanCulturalContext: 'Ughani wa mashairi hufundishwa kwa furaha kwenye tamasha za muziki na drama.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-kisw-g6-methali-ngumu',
                subStrandId: 'substrand-kisw-g6-vina-mizani',
                order: 2,
                title: { en: 'Methali za Kina za Kiswahili', sw: 'Methali za Kina za Kiswahili' },
                storyContext: {
                  en: 'Chambua maana ya ndani ya methali zinazofunza subira na uvumilivu maishani.',
                  sw: 'Chambua maana ya ndani ya methali zinazofunza subira na uvumilivu maishani.'
                },
                characterName: 'Mwalimu Ochieng',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-kisw-g6-shairi-kenya'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-kisw-03',
                    subStrandId: 'substrand-kisw-g6-vina-mizani',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Kamilisha methali hii: "Subira yavuta ______."',
                      sw: 'Kamilisha methali hii: "Subira yavuta ______."'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G6-METHALI',
                    options: [
                      { id: 'opt-1', text: { en: 'heri', sw: 'heri' } },
                      { id: 'opt-2', text: { en: 'shida', sw: 'shida' } },
                      { id: 'opt-3', text: { en: 'hasara', sw: 'hasara' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Methali "Subira yavuta heri" inafundisha kuwa mwenye subira hupata mafanikio mema.',
                      sw: 'Mwenye uvumilivu na subira hupata heri na matokeo mazuri.'
                    },
                    socraticHint: {
                      en: 'Mtu anayevumilia kwa hekima hupata matokeo gani mazuri?',
                      sw: 'Mtu anayevumilia kwa hekima hupata matokeo gani mazuri?'
                    },
                    kenyanCulturalContext: 'Methali za Kiswahili hufundisha busara ya kimaisha kwa wanafunzi wa darasa la sita.',
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

  // 4. Science and Technology (Grade 6)
  {
    id: 'la-sci-g6',
    gradeId: 'grade-6',
    code: 'SCI-G6',
    title: { en: 'Science and Technology', sw: 'Sayansi na Teknolojia' },
    description: {
      en: 'Circulatory system, reflection and refraction of light, simple machines (levers/pulleys), and digital problem solving.',
      sw: 'Mfumo wa mzunguko wa damu, mwanga na tafakuri, mashine rahisi, na sayansi ya kidijitali.'
    },
    icon: 'Microscope',
    color: '#0ea5e9',
    bannerGradient: 'from-sky-600 to-cyan-800',
    order: 4,
    prerequisiteIds: ['la-sci-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-sci-g6-circulatory',
        subjectId: 'la-sci-g6',
        code: 'SCI-G6-STR-01',
        title: { en: 'Circulatory System and Heart', sw: 'Mfumo wa Mzunguko wa Damu na Moyo' },
        description: {
          en: 'Parts of the heart (atria, ventricles), blood vessels (arteries, veins, capillaries), and blood components.',
          sw: 'Vyumba vya moyo, mishipa ya damu (ateri, vena), na chembechembe za damu.'
        },
        icon: 'Activity',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-sci-g6-blood-flow',
            strandId: 'strand-sci-g6-circulatory',
            code: 'SCI-G6-SUB-01',
            title: { en: 'The Human Heart & Vessels', sw: 'Moyo wa Binadamu na Mishipa' },
            description: {
              en: 'Understand how the heart pumps oxygenated blood and prevents backward flow using valves.',
              sw: 'Kufahamu jinsi moyo unavyosukuma damu na kuzuia damu kurudi nyuma kwa vali.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Digital literacy'],
            cbeValues: ['Responsibility'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-sci-g6-heart-pump',
                subStrandId: 'substrand-sci-g6-blood-flow',
                order: 1,
                title: { en: 'The Human Heart: The Living Pump', sw: 'Moyo: Mashine Inayodunda' },
                storyContext: {
                  en: 'Brian investigates how pulse rate increases after exercise and examines the four chambers of the heart.',
                  sw: 'Brian anachunguza jinsi mapigo ya moyo yanavyoongezeka baada ya kukimbia na kuchunguza vyumba vinne vya moyo.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 50,
                coinReward: 25,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-sci-01',
                    subStrandId: 'substrand-sci-g6-blood-flow',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which blood vessels carry oxygenated blood under high pressure away from the heart to body organs?',
                      sw: 'Ni mishipa gani ya damu inayobeba damu safi yenye oksijeni chini ya msukumo mkubwa kutoka moyoni kuelekea mwilini?'
                    },
                    difficulty: 2,
                    strandTag: 'SCI-G6-CIRCULATORY',
                    options: [
                      { id: 'opt-1', text: { en: 'Arteries (Mishipa ya Ateri)', sw: 'Mishipa ya Ateri' } },
                      { id: 'opt-2', text: { en: 'Veins (Mishipa ya Vena)', sw: 'Mishipa ya Vena' } },
                      { id: 'opt-3', text: { en: 'Trachea', sw: 'Koo la hewa' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Arteries have thick muscular elastic walls to carry high-pressure oxygenated blood away from the heart (except the pulmonary artery).',
                      sw: 'Ateri zina kuta nene zenye misuli imara zinazobeba damu kutoka moyoni kwa msukumo mkubwa.'
                    },
                    socraticHint: {
                      en: 'Think of "A" for Arteries = "Away from the heart".',
                      sw: 'Kumbuka: Ateri husafirisha damu "kuondoka" moyoni.'
                    },
                    kenyanCulturalContext: 'Cardiovascular health and aerobic sports are actively promoted in CBC Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-sci-02',
                    subStrandId: 'substrand-sci-g6-blood-flow',
                    type: 'IMAGE_LABEL',
                    prompt: {
                      en: 'Locate and label the left ventricle (pumping chamber to the body) on the heart diagram:',
                      sw: 'Taja chumba cha kushoto cha chini (ventrikali ya kushoto) kwenye mchoro wa moyo:'
                    },
                    imageLabelData: {
                      imageUrl: '/images/curriculum/human_heart.svg',
                      hotspots: [
                        { id: 'spot-l-ventricle', label: { en: 'Left Ventricle (Pumps to aorta)', sw: 'Ventrikali ya kushoto' }, xPercent: 60, yPercent: 70 },
                        { id: 'spot-r-atrium', label: { en: 'Right Atrium (Receives deoxygenated blood)', sw: 'Atria ya kulia' }, xPercent: 30, yPercent: 35 }
                      ]
                    },
                    difficulty: 2,
                    strandTag: 'SCI-G6-CIRCULATORY',
                    explanation: {
                      en: 'The left ventricle has the thickest muscular wall because it must pump blood through the aorta to the entire body.',
                      sw: 'Ventrikali ya kushoto ina kuta nene zaidi kwa sababu inasukuma damu mwilini kote kupitia aota.'
                    },
                    socraticHint: {
                      en: 'Which lower chamber pumps blood to the aorta for the whole body?',
                      sw: 'Ni chumba gani cha chini chenye misuli mikubwa kinachosukuma damu mwilini?'
                    },
                    kenyanCulturalContext: 'Anatomy diagrams prepare Grade 6 students for Junior Secondary integrated science.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-sci-g6-levers',
                subStrandId: 'substrand-sci-g6-blood-flow',
                order: 2,
                title: { en: 'Simple Machines: Levers and Wheelbarrows', sw: 'Mashine Rahisi: Wenzo na Toroli' },
                storyContext: {
                  en: 'Discover how wheelbarrows, crowbars, and bottle openers make heavy work easier.',
                  sw: 'Gundua jinsi toroli na wenzo zinavyorahisisha kazi nzito ya ujenzi.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-sci-g6-heart-pump'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-sci-03',
                    subStrandId: 'substrand-sci-g6-blood-flow',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'In a wheelbarrow, where is the load placed relative to the fulcrum (wheel) and the effort (handles)?',
                      sw: 'Katika toroli, mzigo huwekwa wapi kulingana na egemeo (gurudumu) na jitihada (vishikio)?'
                    },
                    difficulty: 2,
                    strandTag: 'SCI-G6-MACHINES',
                    options: [
                      { id: 'opt-1', text: { en: 'The load is in the middle between the wheel and the handles', sw: 'Mzigo uko katikati ya gurudumu na vishikio' } },
                      { id: 'opt-2', text: { en: 'The wheel is in the middle', sw: 'Gurudumu liko katikati' } },
                      { id: 'opt-3', text: { en: 'The handles are in the middle', sw: 'Vishikio viko katikati' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'A wheelbarrow is a second-class lever: the Load is in the middle between the Fulcrum (wheel) and the Effort (handles).',
                      sw: 'Toroli ni wenzo wa daraja la pili ambapo mzigo uko katikati ya egemeo na jitihada.'
                    },
                    socraticHint: {
                      en: 'Where do you shovel the sand or stones when using a wheelbarrow?',
                      sw: 'Wewe huweka mchanga au mawe wapi unapotumia toroli?'
                    },
                    kenyanCulturalContext: 'Wheelbarrows are widely used in farming, construction, and jua kali enterprises in Kenya.',
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

  // 5. Social Studies (Grade 6)
  {
    id: 'la-soc-g6',
    gradeId: 'grade-6',
    code: 'SOC-G6',
    title: { en: 'Social Studies', sw: 'Masomo ya Kijamii' },
    description: {
      en: 'Eastern Africa geography, regional trade (EAC), mining, transport systems, and democratic governance.',
      sw: 'Jiografia ya Afrika Mashariki, biashara ya kikanda (EAC), madini na utawala wa kidemokrasia.'
    },
    icon: 'Compass',
    color: '#ec4899',
    bannerGradient: 'from-pink-600 to-rose-800',
    order: 5,
    prerequisiteIds: ['la-soc-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-soc-g6-eac',
        subjectId: 'la-soc-g6',
        code: 'SOC-G6-STR-01',
        title: { en: 'Eastern Africa & EAC Community', sw: 'Afrika Mashariki na Jumuiya ya EAC' },
        description: {
          en: 'Member countries of the East African Community, cross-border trade, and peaceful integration.',
          sw: 'Nchi wanachama wa Jumuiya ya Afrika Mashariki na biashara ya mipakani.'
        },
        icon: 'Globe',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-soc-g6-trade',
            strandId: 'strand-soc-g6-eac',
            code: 'SOC-G6-SUB-01',
            title: { en: 'Regional Trade and Cooperation', sw: 'Biashara ya Kikanda na Ushirikiano' },
            description: {
              en: 'Understand imports and exports through the ports of Mombasa and Lamu.',
              sw: 'Kufahamu uagizaji na uuzaji wa bidhaa kupitia bandari za Mombasa na Lamu.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship', 'Critical thinking and problem solving'],
            cbeValues: ['Unity', 'Peace', 'Patriotism'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-soc-g6-mombasa-port',
                subStrandId: 'substrand-soc-g6-trade',
                order: 1,
                title: { en: 'The Gateway Port of Mombasa', sw: 'Bandari ya Mombasa: Lango la Afrika' },
                storyContext: {
                  en: 'Discover how cargo ships unload goods at Kilindini Harbour destined for Uganda, Rwanda, and South Sudan.',
                  sw: 'Gundua jinsi meli za mizigo zinavyoshusha bidhaa Kilindini kuelekea Uganda, Rwanda na Sudan Kusini.'
                },
                characterName: 'Juma',
                characterAvatar: 'elephant',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Unity', 'Patriotism'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-soc-01',
                    subStrandId: 'substrand-soc-g6-trade',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which deep natural harbour in Mombasa serves as the primary gateway for regional maritime trade?',
                      sw: 'Ni bandari gani ya asili ya maji marefu huko Mombasa inayotumika kama lango kuu la biashara ya baharini?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G6-TRADE',
                    options: [
                      { id: 'opt-1', text: { en: 'Kilindini Harbour', sw: 'Bandari ya Kilindini' } },
                      { id: 'opt-2', text: { en: 'Old Port', sw: 'Bandari ya Kale' } },
                      { id: 'opt-3', text: { en: 'Kisumu Port', sw: 'Bandari ya Kisumu' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Kilindini Harbour in Mombasa is East Africa’s largest and busiest commercial seaport.',
                      sw: 'Bandari ya Kilindini mjini Mombasa ndiyo bandari kuu na kubwa zaidi ya kibiashara Afrika Mashariki.'
                    },
                    socraticHint: {
                      en: 'What is the world-famous deep water harbour in Mombasa called?',
                      sw: 'Ni bandari gani ya maji marefu maarufu mjini Mombasa?'
                    },
                    kenyanCulturalContext: 'Mombasa port links Kenya to landlocked East African neighbours.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-soc-02',
                    subStrandId: 'substrand-soc-g6-trade',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: The East African Community (EAC) promotes free movement of goods, people, and services among member states.',
                      sw: 'Kweli au Si Kweli: Jumuiya ya Afrika Mashariki (EAC) inahimiza usafirishaji huru wa bidhaa, watu na huduma.'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G6-EAC',
                    correctBoolean: true,
                    explanation: {
                      en: 'The EAC Common Market protocol fosters economic integration, peace, and cross-border trade.',
                      sw: 'Mkataba wa soko la pamoja la EAC unahimiza ushirikiano wa kiuchumi na maendeleo.'
                    },
                    socraticHint: {
                      en: 'Does regional integration make trade easier between Kenya, Uganda, and Tanzania?',
                      sw: 'Je, ushirikiano wa kikanda unarahisisha biashara kati ya nchi wanachama?'
                    },
                    kenyanCulturalContext: 'Pan-African citizenship is an explicit competency outcome of CBC Social Studies.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-soc-g6-democracy',
                subStrandId: 'substrand-soc-g6-trade',
                order: 2,
                title: { en: 'The Constitution and Rule of Law', sw: 'Katiba na Utawala wa Sheria' },
                storyContext: {
                  en: 'Learn how Kenya’s 2010 Constitution guarantees fundamental human rights and children’s protection.',
                  sw: 'Jifunze jinsi Katiba ya Kenya ya 2010 inavyolinda haki za watoto na utawala wa sheria.'
                },
                characterName: 'Mwalimu',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Social justice', 'Integrity'],
                prerequisiteQuestIds: ['quest-soc-g6-mombasa-port'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-soc-03',
                    subStrandId: 'substrand-soc-g6-trade',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Under Article 53 of the Constitution of Kenya, every child has the right to free and compulsory:',
                      sw: 'Chini ya Kifungu cha 53 cha Katiba ya Kenya, kila mtoto ana haki ya kupata elimu ya msingi ambayo ni ya bure na ya:'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G6-RIGHTS',
                    options: [
                      { id: 'opt-1', text: { en: 'Basic education', sw: 'Elimu ya msingi ya lazima' } },
                      { id: 'opt-2', text: { en: 'Driving lessons', sw: 'Mafunzo ya udereva' } },
                      { id: 'opt-3', text: { en: 'Business loans', sw: 'Mikopo ya biashara' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The Kenyan Constitution guarantees every child free and compulsory basic education.',
                      sw: 'Katiba ya Kenya inathibitisha kuwa kila mtoto ana haki ya elimu ya msingi ya bure na ya lazima.'
                    },
                    socraticHint: {
                      en: 'What vital educational right does every Kenyan child enjoy by law?',
                      sw: 'Ni haki gani ya kimsingi ya kimasomo anayostahili kila mtoto nchini Kenya?'
                    },
                    kenyanCulturalContext: 'Constitutional literacy fosters responsible active citizenship.',
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

  // 6. Agriculture and Nutrition (Grade 6)
  {
    id: 'la-agri-g6',
    gradeId: 'grade-6',
    code: 'AGRI-G6',
    title: { en: 'Agriculture and Nutrition', sw: 'Kilimo na Lishe' },
    description: {
      en: 'Value addition, honey harvesting (beekeeping), post-harvest storage, and community meal planning.',
      sw: 'Kuongeza thamani ya mazao, ufugaji wa nyuki, ghala za kisasa za mazao, na lishe ya jamii.'
    },
    icon: 'Sprout',
    color: '#84cc16',
    bannerGradient: 'from-lime-600 to-green-800',
    order: 6,
    prerequisiteIds: ['la-agri-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-agri-g6-value-add',
        subjectId: 'la-agri-g6',
        code: 'AGRI-G6-STR-01',
        title: { en: 'Value Addition and Modern Storage', sw: 'Kuongeza Thamani na Uhifadhi wa Kisasa' },
        description: {
          en: 'Processing milk into fermented mala/yoghurt and making mango crisps or jam.',
          sw: 'Kusindika maziwa kuwa maziwa lala na kutengeneza jemu ya maembe.'
        },
        icon: 'Package',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-agri-g6-processing',
            strandId: 'strand-agri-g6-value-add',
            code: 'AGRI-G6-SUB-01',
            title: { en: 'Processing Farm Produce at Home', sw: 'Kusindika Mazao ya Shamba Nyumbani' },
            description: {
              en: 'Learn sanitary bottling, pasteurization, and packaging that increases farm gate profit.',
              sw: 'Usafi katika kusindika na kufungasha mazao ili kupata faida kubwa zaidi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Self-efficacy', 'Financial literacy'],
            cbeValues: ['Responsibility', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-agri-g6-jam-making',
                subStrandId: 'substrand-agri-g6-processing',
                order: 1,
                title: { en: 'Turning Fresh Mangoes into Jam', sw: 'Kutengeneza Jemu ya Maembe' },
                storyContext: {
                  en: 'Amina and Mama Amina cook surplus ripe mangoes with lemon juice and sugar to sell preserved jam bottles.',
                  sw: 'Amina na mama yake wanapika maembe ya ziada kutengeneza jemu safi ya kuuza.'
                },
                characterName: 'Mama Amina',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Financial literacy'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-agri-01',
                    subStrandId: 'substrand-agri-g6-processing',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What is the main financial benefit of "value addition" for agricultural produce in Kenya?',
                      sw: 'Ni faida gani kuu ya kifedha ya "kuongeza thamani" ya mazao ya kilimo nchini Kenya?'
                    },
                    difficulty: 2,
                    strandTag: 'AGRI-G6-VALUE',
                    options: [
                      { id: 'opt-1', text: { en: 'Processed products fetch a much higher price and last longer without rotting', sw: 'Bidhaa zilizosindikwa huuzwa kwa bei ya juu zaidi na haziozi haraka' } },
                      { id: 'opt-2', text: { en: 'It makes the food spoil immediately', sw: 'Hufanya chakula kioze mara moja' } },
                      { id: 'opt-3', text: { en: 'It requires no effort', sw: 'Haitaji kazi yoyote' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Value addition turns perishable crops into durable products like jam or cheese, fetching higher income.',
                      sw: 'Kuongeza thamani huzuia uharibifu wa mazao na kumpatia mkulima faida ya juu kibiashara.'
                    },
                    socraticHint: {
                      en: 'Does a bottle of mango jam sell for more than raw ripe mangoes during harvest season glut?',
                      sw: 'Je, chupa ya jemu huuzwa kwa bei kubwa kuliko maembe mabichi wakati wa msimu wa mavuno mengi?'
                    },
                    kenyanCulturalContext: 'CBE agriculture inspires practical agro-processing skills from primary school.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-agri-02',
                    subStrandId: 'substrand-agri-g6-processing',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Hermetic storage bags (like PICS bags) protect stored maize grains from weevils without chemical insecticides.',
                      sw: 'Kweli au Si Kweli: Magunia ya kisasa ya kuzuia hewa (PICS) hulinda nafaka za mahindi dhidi ya wadudu bila dawa za sumu.'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G6-STORAGE',
                    correctBoolean: true,
                    explanation: {
                      en: 'Hermetic bags deprive weevils and insects of oxygen, preserving harvest grains naturally.',
                      sw: 'Magunia haya yanayozuia hewa huua wadudu bila kutumia kemikali zenye sumu.'
                    },
                    socraticHint: {
                      en: 'Can pests survive in a sealed bag where all oxygen is blocked out?',
                      sw: 'Je, wadudu wanaweza kuishi ndani ya gunia lililofungwa vizuri bila hewa ya oksijeni?'
                    },
                    kenyanCulturalContext: 'Safe grain storage protects food reserves across Kenyan agricultural households.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-agri-g6-beekeeping',
                subStrandId: 'substrand-agri-g6-processing',
                order: 2,
                title: { en: 'Modern Beekeeping (Apiculture)', sw: 'Ufugaji wa Kisasa wa Nyuki' },
                storyContext: {
                  en: 'Learn how Kenya Top Bar Hives (KTBH) allow farmers in Kitui to harvest pure honey without harming the bees.',
                  sw: 'Jifunze jinsi mizinga ya kisasa ya KTBH inavyowezesha mavuno ya asali safi Kitui.'
                },
                characterName: 'Mutua',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Self-efficacy', 'Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-agri-g6-jam-making'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-agri-03',
                    subStrandId: 'substrand-agri-g6-processing',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Why is modern Kenya Top Bar Hive (KTBH) beekeeping better than traditional burning methods?',
                      sw: 'Kwa nini ufugaji wa mizinga ya kisasa (KTBH) ni bora kuliko kuchoma mizinga ya kale kwa moto?'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G6-BEE',
                    options: [
                      { id: 'opt-1', text: { en: 'It keeps the bee colony alive and yields clean, high-grade honey', sw: 'Hulinda kundi la nyuki na hutoa asali safi yenye ubora wa juu' } },
                      { id: 'opt-2', text: { en: 'It kills all the trees in the forest', sw: 'Huchoma misitu' } },
                      { id: 'opt-3', text: { en: 'It produces no honey', sw: 'Haitoi asali' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Top bar hives allow honey combs to be harvested selectively while preserving the queen and worker bees.',
                      sw: 'Mizinga ya kisasa inaruhusu kuvuna sega la asali bila kuua nyuki wala malkia wao.'
                    },
                    socraticHint: {
                      en: 'Does conserving the bees allow you to harvest honey again in the next season?',
                      sw: 'Je, kuwalinda nyuki kunakuwezesha kuvuna asali tena msimu unaofuata?'
                    },
                    kenyanCulturalContext: 'Kitui, Baringo, and West Pokot are renowned for premium organic acacia honey.',
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

  // 7. Religious Education (Grade 6)
  {
    id: 'la-re-g6',
    gradeId: 'grade-6',
    code: 'RE-G6',
    title: { en: 'Religious Education (CRE / IRE)', sw: 'Elimu ya Dini (CRE / IRE)' },
    description: {
      en: 'Servant leadership, self-control, standing for truth, ethical use of technology, and civic accountability.',
      sw: 'Uongozi wa kiutumishi, kiasi, kusimamia ukweli, maadili ya teknolojia, na uwajibikaji.'
    },
    icon: 'Heart',
    color: '#3b82f6',
    bannerGradient: 'from-blue-600 to-indigo-800',
    order: 7,
    religiousEducationStream: 'CRE',
    prerequisiteIds: ['la-re-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-re-g6-leadership',
        subjectId: 'la-re-g6',
        code: 'RE-G6-STR-01',
        title: { en: 'Servant Leadership and Moral Character', sw: 'Uongozi wa Kiutumishi na Tabia Njema' },
        description: {
          en: 'Leading through service, ethical digital responsibility, and resisting peer pressure.',
          sw: 'Kuongoza kwa kutumikia wengine, maadili ya mitandao, na kuepuka shinikizo rika.'
        },
        icon: 'UserCheck',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-re-g6-service',
            strandId: 'strand-re-g6-leadership',
            code: 'RE-G6-SUB-01',
            title: { en: 'Leading by Serving Others', sw: 'Kuongoza kwa Kuwatumikia Wengine' },
            description: {
              en: 'Understand how true leaders serve their classmates with humility and fairness.',
              sw: 'Kufahamu kuwa viongozi wa kweli huwatumikia wenzao kwa unyenyekevu na haki.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship', 'Self-efficacy'],
            cbeValues: ['Integrity', 'Love', 'Respect'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-re-g6-servant-leader',
                subStrandId: 'substrand-re-g6-service',
                order: 1,
                title: { en: 'The Humble Head Prefect', sw: 'Kiranja Mnyenyekevu' },
                storyContext: {
                  en: 'Amina is elected head girl and chooses to help carry water and sweep with her classmates.',
                  sw: 'Amina anachaguliwa kuwa kiranja mkuu na anachagua kufagia na kubeba maji pamoja na wenzake.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Integrity', 'Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-re-01',
                    subStrandId: 'substrand-re-g6-service',
                    type: 'SCENARIO',
                    prompt: {
                      en: 'According to both Christian and Islamic teachings, how should a true leader treat people under their authority?',
                      sw: 'Kulingana na mafundisho ya dini, kiongozi wa kweli anapaswa kuwatendeaje watu walio chini ya mamlaka yake?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G6-LEADERSHIP',
                    options: [
                      { id: 'opt-1', text: { en: 'With humility, fairness, and genuine service to all', sw: 'Kwa unyenyekevu, haki na kuwatumikia kwa moyo' } },
                      { id: 'opt-2', text: { en: 'By shouting orders and punishing people harshly', sw: 'Kwa ukali na amri za vitisho' } },
                      { id: 'opt-3', text: { en: 'By taking the best food and refusing to help', sw: 'Kujilimbikizia mali na kukataa kusaidia' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Servant leadership emphasizes that the greatest leader is the one who serves others most humbly.',
                      sw: 'Uongozi wa kiutumishi unafundisha kwamba kiongozi bora ni yule anayewatumikia wenzake kwa unyenyekevu.'
                    },
                    socraticHint: {
                      en: 'Did historical moral leaders serve their people or oppress them?',
                      sw: 'Je, viongozi wakuu wa kidini walihudumia watu wao au waliwakandamiza?'
                    },
                    kenyanCulturalContext: 'Servant leadership is a foundational pillar of ethical citizenship in Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-re-02',
                    subStrandId: 'substrand-re-g6-service',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Using the internet to spread false rumours or cyberbully classmates violates moral integrity.',
                      sw: 'Kweli au Si Kweli: Kutumia mitandao kueneza uvumi au kuwakashifu wengine ni kinyume na maadili mema.'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G6-ETHICS',
                    correctBoolean: true,
                    explanation: {
                      en: 'Digital ethics require using mobile technology and social platforms truthfully and respectfully.',
                      sw: 'Maadili ya kidijitali yanahitaji kutumia simu na mitandao kwa ukweli, heshima na amani.'
                    },
                    socraticHint: {
                      en: 'Does online unkindness hurt real people?',
                      sw: 'Je, maneno mabaya mtandaoni yanaumiza hisia za wenzetu?'
                    },
                    kenyanCulturalContext: 'Cyber hygiene and digital citizenship are explicitly prioritized in upper primary.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-re-g6-forgiveness',
                subStrandId: 'substrand-re-g6-service',
                order: 2,
                title: { en: 'Reconciliation and Healing Communities', sw: 'Upatanisho na Kuponya Jamii' },
                storyContext: {
                  en: 'Understanding the power of truth and reconciliation in healing national and family wounds.',
                  sw: 'Kufahamu nguvu ya ukweli na upatanisho katika kuleta amani ya kitaifa.'
                },
                characterName: 'Mwalimu Ochieng',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Peace', 'Unity'],
                prerequisiteQuestIds: ['quest-re-g6-servant-leader'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-re-03',
                    subStrandId: 'substrand-re-g6-service',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'When communities have disagreements over pasture or borders, what is the most peaceful solution?',
                      sw: 'Jamii zinapokuwa na mzozo kuhusu malisho au mipaka, suluhisho la amani zaidi ni lipi?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G6-PEACE',
                    options: [
                      { id: 'opt-1', text: { en: 'Elders dialogue, truth-telling, and peaceful negotiation', sw: 'Mazungumzo ya wazee, ukweli na amani' } },
                      { id: 'opt-2', text: { en: 'Fighting and cattle rustling', sw: 'Kupigana na wizi wa mifugo' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Dialogue, mutual respect, and legal channels build lasting peace in Kenya.',
                      sw: 'Mazungumzo ya heshima na kufuata sheria huleta amani ya kudumu nchini Kenya.'
                    },
                    socraticHint: {
                      en: 'Does violence solve disagreements or create endless cycles of pain?',
                      sw: 'Je, vurugu hutatua mizozo au huongeza maumivu?'
                    },
                    kenyanCulturalContext: 'Peace building and communal coexistence are national values under Chapter 10 of Kenya’s Constitution.',
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

  // 8. Creative Arts (Grade 6)
  {
    id: 'la-ca-g6',
    gradeId: 'grade-6',
    code: 'CA-G6',
    title: { en: 'Creative Arts', sw: 'Sanaa za Ubunifu' },
    description: {
      en: 'Sculpture & papier-mâché, 2-part musical singing, traditional folk dance, and track and field athletics.',
      sw: 'Uchongaji, uimbaji wa sauti mbili, ngoma za asili za Kenya, na riadha uwanjani.'
    },
    icon: 'Palette',
    color: '#a855f7',
    bannerGradient: 'from-purple-600 to-fuchsia-800',
    order: 8,
    prerequisiteIds: ['la-ca-g5'],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-ca-g6-performance',
        subjectId: 'la-ca-g6',
        code: 'CA-G6-STR-01',
        title: { en: 'Kenyan Folk Dance and Athletics', sw: 'Ngoma za Asili za Kenya na Riadha' },
        description: {
          en: 'Dance formations, traditional costumes/body adornment, and sprint baton exchanges.',
          sw: 'Mifumo ya ngoma za asili, mavazi ya kienyeji, na mbio za kupokezana vijiti.'
        },
        icon: 'Trophy',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-ca-g6-dance-relay',
            strandId: 'strand-ca-g6-performance',
            code: 'CA-G6-SUB-01',
            title: { en: 'Folk Dance & 4x100m Baton Exchange', sw: 'Ngoma za Asili na Mbio za Vijiti' },
            description: {
              en: 'Perform traditional dance steps with authentic props and execute smooth visual/non-visual baton passes.',
              sw: 'Kucheza ngoma za asili kwa vifaa maalum na kukabidhi vijiti vya mbio kwa ustadi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Creativity and imagination', 'Self-efficacy', 'Communication and collaboration'],
            cbeValues: ['Unity', 'Patriotism'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-ca-g6-baton-relay',
                subStrandId: 'substrand-ca-g6-dance-relay',
                order: 1,
                title: { en: 'The 4x100m Relay Handover', sw: 'Kukabidhi Kijiti cha Mbio za 4x100m' },
                storyContext: {
                  en: 'Brian practices the non-visual blind baton exchange inside the 20-metre handover zone with his school team.',
                  sw: 'Brian anafanya mazoezi ya kukabidhi kijiti bila kutazama nyuma kwenye eneo maalum la mita 20.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 2,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Self-efficacy', 'Communication and collaboration'],
                cbeValues: ['Unity'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-ca-01',
                    subStrandId: 'substrand-ca-g6-dance-relay',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'In a 4x100 metres sprint relay, where must the baton exchange take place?',
                      sw: 'Katika mbio za kupokezana vijiti za mita 4x100, kijiti lazima kipokezwe wapi?'
                    },
                    difficulty: 2,
                    strandTag: 'CA-G6-ATHLETICS',
                    options: [
                      { id: 'opt-1', text: { en: 'Inside the marked 20-metre changeover box', sw: 'Ndani ya eneo maalum lililowekwa alama la mita 20' } },
                      { id: 'opt-2', text: { en: 'Anywhere on the grass outside the track', sw: 'Popote kwenye nyasi' } },
                      { id: 'opt-3', text: { en: 'At the starting line only', sw: 'Kwenye mstari wa kuanzia pekee' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Rules require the baton to be passed strictly within the 20-metre takeover zone.',
                      sw: 'Sheria za riadha zinahitaji kijiti kibadilishwe madhubuti ndani ya eneo la mita 20.'
                    },
                    socraticHint: {
                      en: 'What happens to a relay team if they pass the baton after the changeover line?',
                      sw: 'Nini kinatokea iwapo timu itapokezana kijiti nje ya eneo lililowekwa alama?'
                    },
                    kenyanCulturalContext: 'Kenya’s world-class track tradition inspires technical excellence in physical education.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-g6-ca-02',
                    subStrandId: 'substrand-ca-g6-dance-relay',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which traditional East African 8-stringed plucked lyre is famous in the folk music of Western Kenya?',
                      sw: 'Ni ala gani ya kiasili ya nyuzi 8 ya kupiga kwa vidole maarufu katika muziki wa Magharibi mwa Kenya?'
                    },
                    difficulty: 2,
                    strandTag: 'CA-G6-MUSIC',
                    options: [
                      { id: 'opt-1', text: { en: 'Nyatiti (Luo lyre)', sw: 'Nyatiti' } },
                      { id: 'opt-2', text: { en: 'Electric keyboard', sw: 'Kinanda cha umeme' } },
                      { id: 'opt-3', text: { en: 'Saxophone', sw: 'Saxofoni' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The Nyatiti is a traditional 8-stringed bowl lyre of the Luo community, famous for rich cultural melodies.',
                      sw: 'Nyatiti ni ala ya asili ya nyuzi 8 ya jamii ya Wajaluo inayopendwa sana kwa midundo ya kitamaduni.'
                    },
                    socraticHint: {
                      en: 'Think of the traditional stringed instrument played while resting on the floor with leg ankle bells (gara).',
                      sw: 'Fikiria ala ya asili ya nyuzi inayopigwa huku mpigaji akiwa amefunga njuga miguuni.'
                    },
                    kenyanCulturalContext: 'Preserving indigenous instruments like the Nyatiti and Adeudeu is central to CBC Creative Arts.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-ca-g6-papermache',
                subStrandId: 'substrand-ca-g6-dance-relay',
                order: 2,
                title: { en: 'Papier-Mâché Animal Masks', sw: 'Vinyago vya Karatasi (Papier-Mâché)' },
                storyContext: {
                  en: 'Create a cheetah or lion performance mask using recycled newspaper strips and flour paste.',
                  sw: 'Tengeneza kinyago cha duma au simba kwa kutumia magazeti ya zamani na gundi ya unga.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-ca-g6-baton-relay'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-g6-ca-03',
                    subStrandId: 'substrand-ca-g6-dance-relay',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Using waste newspaper strips to make art objects is a form of environmental recycling.',
                      sw: 'Kweli au Si Kweli: Kutumia magazeti ya zamani kutengeneza vinyago ni njia mojawapo ya kurejeleza taka.'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G6-ART',
                    correctBoolean: true,
                    explanation: {
                      en: 'Papier-mâché recycles discarded paper into durable, beautiful 3D sculptures and masks.',
                      sw: 'Kutumia karatasi za zamani hupunguza taka na kugeuza vitu vilivyotupwa kuwa sanaa nzuri.'
                    },
                    socraticHint: {
                      en: 'Does reusing old paper save trees and reduce litter?',
                      sw: 'Je, kutumia karatasi za zamani huokoa miti na kupunguza taka mazingirani?'
                    },
                    kenyanCulturalContext: 'Sustainable upcycling is an exemplary CBC green competency.',
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

  // 9. Indigenous Language (Grade 6 - Optional placeholder)
  {
    id: 'la-indig-g6',
    gradeId: 'grade-6',
    code: 'INDIG-G6',
    title: { en: 'Indigenous Language (Optional)', sw: 'Lugha ya Asili (Hiari)' },
    description: {
      en: 'Folk narratives, traditional customary wisdom, and indigenous leadership vocabulary.',
      sw: 'Fasihi simulizi ya jamii, hekima za kimila, na msamiati wa uongozi wa asili.'
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
        id: 'strand-indig-g6-placeholder',
        subjectId: 'la-indig-g6',
        code: 'INDIG-G6-STR-01',
        title: { en: 'Indigenous Oral Literature (Preview)', sw: 'Fasihi Simulizi ya Kiasili (Onyesho la Awali)' },
        description: {
          en: 'Analysis of community proverbs and historical leadership legends.',
          sw: 'Uchambuzi wa methali za jamii na visa vya mashujaa wa kale.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'TODO: verify with KICD design',
        subStrands: [
          {
            id: 'substrand-indig-g6-placeholder',
            strandId: 'strand-indig-g6-placeholder',
            code: 'INDIG-G6-SUB-01',
            title: { en: 'Customary Legends and Tales', sw: 'Visa vya Mashujaa wa Asili' },
            description: {
              en: 'Explore local historical leaders like Koitalel Arap Samoei, Mekatilili wa Menza, and Luanda Magere.',
              sw: 'Kujifunza kuhusu mashujaa wa jadi kama Koitalel, Mekatilili na Luanda Magere.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Patriotism', 'Respect'],
            estimatedMinutes: 15,
            sourceStatus: 'TODO: verify with KICD design',
            quests: [
              {
                id: 'quest-indig-g6-preview',
                subStrandId: 'substrand-indig-g6-placeholder',
                order: 1,
                title: { en: 'Legends of Courage & Heritage', sw: 'Mashujaa wa Ushujaa na Urithi' },
                storyContext: {
                  en: 'Discover how Mekatilili wa Menza led the Giriama resistance to protect her people’s land and freedom.',
                  sw: 'Gundua jinsi Mekatilili wa Menza alivyowaongoza Wagiriama kulinda ardhi na uhuru wao.'
                },
                characterName: 'Mekatilili',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 8,
                xpReward: 30,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Patriotism'],
                prerequisiteQuestIds: [],
                sourceStatus: 'TODO: verify with KICD design',
                questions: [
                  {
                    id: 'q-g6-indig-01',
                    subStrandId: 'substrand-indig-g6-placeholder',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Mekatilili wa Menza was an iconic heroine who championed freedom for which coastal community of Kenya?',
                      sw: 'Mekatilili wa Menza alikuwa shujaa wa kihistoria aliyepigania uhuru wa jamii gani ya pwani ya Kenya?'
                    },
                    difficulty: 1,
                    strandTag: 'INDIG-G6-LEGENDS',
                    options: [
                      { id: 'opt-1', text: { en: 'Giriama (Mijikenda) community', sw: 'Jamii ya Wagiriama (Wamijikenda)' } },
                      { id: 'opt-2', text: { en: 'Somali community', sw: 'Jamii ya Wasomali' } },
                      { id: 'opt-3', text: { en: 'Teso community', sw: 'Jamii ya Wateso' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Mekatilili wa Menza was a brave Mijikenda woman leader who galvanized the Giriama people against colonial oppression.',
                      sw: 'Mekatilili wa Menza alikuwa kiongozi shupavu wa Wamijikenda aliyewaongoza Wagiriama kutetea uhuru wao.'
                    },
                    socraticHint: {
                      en: 'She rallied her people in Kilifi County along the Kenyan coast.',
                      sw: 'Aliongoza mapambano ya kihistoria katika kaunti ya Kilifi pwani ya Kenya.'
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

export const grade6Curriculum: CurriculumGrade = {
  id: 'grade-6',
  code: 'G6',
  name: { en: 'Grade 6', sw: 'Gredi ya 6' },
  band: 'UPPER_PRIMARY',
  description: {
    en: 'Upper Primary transition & KPSEA preparation: Mathematics, English, Kiswahili, Science, Social Studies, Agriculture, and Creative Arts.',
    sw: 'Gredi ya 6 kuelekea tathmini ya KPSEA: Hisabati, Kiingereza, Kiswahili, Sayansi, Masomo ya Jamii, Kilimo na Sanaa za Ubunifu.'
  },
  order: 4,
  subjects: grade6Subjects
};
