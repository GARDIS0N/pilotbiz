// Grade 4 (Upper Primary) Curriculum Design & Seed Data
// Includes existing canonical IDs for backward-compatibility with Amina Kiprono demo account.

import { CurriculumGrade, CurriculumSubject } from '../types.js';

export const grade4Subjects: CurriculumSubject[] = [
  // 1. Mathematics (incorporates existing canonical IDs)
  {
    id: 'la-math-g4',
    gradeId: 'grade-4',
    code: 'MATH-G4',
    title: { en: 'Mathematics', sw: 'Hisabati' },
    description: {
      en: 'Numbers, fractions, measurement, Kenyan currency, and spatial geometry.',
      sw: 'Nambari, sehemu, vipimo, fedha za Kenya, na jiometria.'
    },
    icon: 'Calculator',
    color: '#10b981',
    bannerGradient: 'from-emerald-600 to-teal-800',
    order: 1,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-math-numbers',
        subjectId: 'la-math-g4',
        code: 'MATH-G4-NUM',
        title: { en: 'Numbers and Operations', sw: 'Nambari na Matendo Yake' },
        description: {
          en: 'Whole numbers, multiplication arrays, and division problems.',
          sw: 'Nambari kamili, mifumo ya kuzidisha, na matatizo ya kugawanya.'
        },
        icon: 'Hash',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-multiplication',
            strandId: 'strand-math-numbers',
            code: 'MATH-G4-NUM-01',
            title: { en: 'Multiplication as Repeated Addition', sw: 'Kuzidisha Kama Kujumlisha Kwenye Makundi' },
            description: {
              en: 'Master multiplication facts 1 through 10 using Kenyan shamba arrays.',
              sw: 'Kufahamu kuzidisha kuanzia 1 hadi 10 kwa kutumia mimea shambani.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy'],
            cbeValues: ['Responsibility', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'mission-01-seedlings',
                subStrandId: 'substrand-multiplication',
                order: 1,
                title: { en: 'Help Amina Plant Seedlings', sw: 'Kupanda Miche na Amina' },
                storyContext: {
                  en: 'Calculate row counts and multiplication arrays for sukuma wiki and cabbage seedling beds in Nakuru.',
                  sw: 'Piga hesabu ya mistari ya miche ya sukuma wiki na kabichi kwenye shamba la Nakuru.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                badgeUnlockId: 'badge-seedling-starter',
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-mult-01',
                    subStrandId: 'substrand-multiplication',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Amina plants 5 rows of sukuma wiki seedlings. Each row has 4 seedlings. How many seedlings did she plant in total?',
                      sw: 'Amina anapanda mistari 5 ya miche ya sukuma wiki. Kila mstari una miche 4. Je, alipanda jumla ya miche mingapi?'
                    },
                    storyScenario: {
                      en: 'Amina wants to know the total count of seedlings before recording it in her CBC agriculture project diary.',
                      sw: 'Amina anataka kujua jumla ya miche kabla ya kurekodi katika daftari lake la kilimo la CBC.'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-NUM',
                    options: [
                      { id: 'opt-1', text: { en: '16 seedlings', sw: 'Miche 16' } },
                      { id: 'opt-2', text: { en: '20 seedlings', sw: 'Miche 20' } },
                      { id: 'opt-3', text: { en: '24 seedlings', sw: 'Miche 24' } },
                      { id: 'opt-4', text: { en: '9 seedlings', sw: 'Miche 9' } }
                    ],
                    correctOptionId: 'opt-2',
                    explanation: {
                      en: '5 rows with 4 seedlings in each row means 5 groups of 4. We calculate: 5 × 4 = 20 seedlings!',
                      sw: 'Mistari 5 yenye miche 4 kila moja ni makundi 5 ya 4. Tunapiga hesabu: 5 × 4 = miche 20!'
                    },
                    socraticHint: {
                      en: 'Skip count by 4 five times: 4, 8, 12, 16, 20. What is 5 × 4?',
                      sw: 'Hesabu kwa kuruka 4 mara tano: 4, 8, 12, 16, 20. 5 × 4 ni ngapi?'
                    },
                    kenyanCulturalContext: 'Sukuma wiki is widely planted in school garden beds across Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-mult-02',
                    subStrandId: 'substrand-multiplication',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'Farmer Kiprono packs 6 bags of potatoes in Eldoret. Each bag weighs 8 kilograms. Enter the total weight in kilograms.',
                      sw: 'Mkulima Kiprono anapakia magunia 6 ya viazi huko Eldoret. Kila gunia lina kilo 8. Andika jumla ya uzito wa kilo.'
                    },
                    storyScenario: {
                      en: 'Farmer Kiprono is preparing to take his harvest to the local market cooperative.',
                      sw: 'Mkulima Kiprono anajiandaa kupeleka mavuno yake kwenye chama cha ushirika.'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-NUM',
                    numericAnswer: { value: 48, unit: 'kg' },
                    explanation: {
                      en: '6 bags multiplied by 8 kg each equals 6 × 8 = 48 kg.',
                      sw: 'Magunia 6 yakizidishwa na kilo 8 kila moja ni 6 × 8 = kilo 48.'
                    },
                    socraticHint: {
                      en: 'Think of 6 × 8. (Hint: 6 × 4 = 24, so double 24).',
                      sw: 'Fikiria 6 × 8. (Kidokezo: 6 × 4 = 24, kisha zidisha 24 mara mbili).'
                    },
                    kenyanCulturalContext: 'Eldoret in Uasin Gishu County is one of Kenya’s major agricultural breadbaskets.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-mult-tf-01',
                    subStrandId: 'substrand-multiplication',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: 7 × 3 is equal to 3 + 3 + 3 + 3 + 3 + 3 + 3 (three added 7 times).',
                      sw: 'Kweli au Si Kweli: 7 × 3 ni sawa na 3 + 3 + 3 + 3 + 3 + 3 + 3 (tatu ikijumlishwa mara 7).'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-NUM',
                    correctBoolean: true,
                    explanation: {
                      en: 'Multiplication is repeated addition. 7 × 3 means 7 groups of 3, which equals 21.',
                      sw: 'Kuzidisha ni kujumlisha mara kwa mara. 7 × 3 inamaanisha makundi 7 ya 3, ambayo ni 21.'
                    },
                    socraticHint: {
                      en: 'Count the number of 3s in the addition. Are there seven groups?',
                      sw: 'Hesabu idadi ya 3 zilizojumlishwa. Je, kuna makundi saba?'
                    },
                    kenyanCulturalContext: 'Repeated addition is foundational to mental math in CBC.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'mission-02-chapati',
                subStrandId: 'substrand-multiplication',
                order: 2,
                title: { en: 'The Great Chapati Feast', sw: 'Karamu ya Chapati' },
                storyContext: {
                  en: 'Help Mama Amina slice and share hot chapatis equally using unit fractions 1/2, 1/4, and 3/4.',
                  sw: 'Msaidie Mama Amina kukata na kugawana chapati za moto kwa usawa kwa kutumia sehemu 1/2, 1/4 na 3/4.'
                },
                characterName: 'Mama Amina',
                characterAvatar: 'owl',
                difficulty: 2,
                estimatedMinutes: 12,
                xpReward: 50,
                coinReward: 25,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Unity', 'Love'],
                prerequisiteQuestIds: ['mission-01-seedlings'],
                badgeUnlockId: 'badge-fraction-feaster',
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-frac-01',
                    subStrandId: 'substrand-multiplication',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Mama Amina cuts 1 chapati into 4 equal pieces. Amina eats 1 piece. What fraction of the chapati did Amina eat?',
                      sw: 'Mama Amina anakata chapati 1 katika vipande 4 sawa. Amina anakula kipande 1. Je, Amina alikula sehemu gani ya chapati?'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-FRAC',
                    options: [
                      { id: 'opt-1', text: { en: '1/2', sw: '1/2' } },
                      { id: 'opt-2', text: { en: '1/4', sw: '1/4' } },
                      { id: 'opt-3', text: { en: '3/4', sw: '3/4' } },
                      { id: 'opt-4', text: { en: '4/1', sw: '4/1' } }
                    ],
                    correctOptionId: 'opt-2',
                    explanation: {
                      en: 'One piece out of 4 equal parts is represented as the unit fraction 1/4 (one quarter).',
                      sw: 'Kipande kimoja kati ya vipande 4 vilivyo sawa kinaandikwa kama sehemu ya 1/4 (robo moja).'
                    },
                    socraticHint: {
                      en: 'The top number (numerator) is 1 piece eaten. The bottom number (denominator) is the total 4 parts.',
                      sw: 'Nambari ya juu ni kipande 1 kilicholiwa. Nambari ya chini ni jumla ya vipande 4.'
                    },
                    kenyanCulturalContext: 'Sharing food equally with family and neighbours reflects African communal values.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-frac-02',
                    subStrandId: 'substrand-multiplication',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'If Baraka had KES 200 and spent KES 85 on tomatoes, how many shillings does he have left?',
                      sw: 'Ikiwa Baraka alikuwa na KES 200 akatumia KES 85 kununua nyanya, ana salio la shilingi ngapi?'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G4-MONEY',
                    numericAnswer: { value: 115, unit: 'KES' },
                    explanation: {
                      en: 'KES 200 - KES 85 = KES 115 remaining.',
                      sw: 'KES 200 - KES 85 = KES 115 iliyobaki.'
                    },
                    socraticHint: {
                      en: 'Subtract 85 from 200. (200 - 80 = 120, then subtract 5).',
                      sw: 'Toa 85 kutoka 200. (200 - 80 = 120, kisha toa 5).'
                    },
                    kenyanCulturalContext: 'Calculating change at open markets builds real-life financial capability.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-g4-math-market-money',
                subStrandId: 'substrand-multiplication',
                order: 3,
                title: { en: 'Baraka at Kongowea Market', sw: 'Baraka katika Soko la Kongowea' },
                storyContext: {
                  en: 'Join Baraka at Mombasa’s bustling Kongowea Market to calculate prices, tap Kenyan coins and notes, and give exact change.',
                  sw: 'Ungana na Baraka kwenye Soko la Kongowea mjini Mombasa kupiga hesabu ya bei, kubonyeza sarafu na noti za Kenya, na kutoa chenji sahihi.'
                },
                characterName: 'Baraka',
                characterAvatar: 'eagle',
                difficulty: 2,
                estimatedMinutes: 15,
                xpReward: 60,
                coinReward: 30,
                cbeCompetencies: ['Critical thinking and problem solving', 'Financial literacy', 'Citizenship'],
                cbeValues: ['Integrity', 'Responsibility'],
                prerequisiteQuestIds: ['mission-02-chapati'],
                badgeUnlockId: 'badge-market-master',
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-kongowea-01',
                    subStrandId: 'substrand-multiplication',
                    type: 'KENYAN_MONEY',
                    prompt: {
                      en: 'Baraka buys fresh mangoes at Kongowea Market for KES 45. Tap the coins and notes to make an exact payment of KES 45.',
                      sw: 'Baraka ananunua maembe matamu katika Soko la Kongowea kwa KES 45. Bonyeza sarafu na noti kulipa KES 45 kamili.'
                    },
                    storyScenario: {
                      en: 'The vendor packs 3 ripe apple mangoes from Kilifi. The total bill is 45 Kenyan Shillings.',
                      sw: 'Mchuuzi anafunga maembe matatu ya Kilifi. Jumla ya gharama ni Shilingi 45 za Kenya.'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G4-MONEY',
                    numericAnswer: { value: 45, unit: 'KES' },
                    explanation: {
                      en: 'Two KES 20 coins and one KES 5 coin make exactly KES 45 (20 + 20 + 5 = 45).',
                      sw: 'Sarafu mbili za KES 20 na moja ya KES 5 zinatengeneza KES 45 kamili (20 + 20 + 5 = 45).'
                    },
                    socraticHint: {
                      en: 'Try combining KES 20 coins with a KES 5 coin.',
                      sw: 'Jaribu kuchanganya sarafu za KES 20 na sarafu ya KES 5.'
                    },
                    kenyanCulturalContext: 'Kenyan coins come in 1, 5, 10, and 20 shilling denominations.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kongowea-02',
                    subStrandId: 'substrand-multiplication',
                    type: 'KENYAN_MONEY',
                    prompt: {
                      en: 'Mama Baraka buys 2 packets of unga for KES 140. Tap the notes and coins to pay KES 140.',
                      sw: 'Mama Baraka ananunua pakiti 2 za unga kwa KES 140. Bonyeza noti na sarafu kulipa KES 140 kamili.'
                    },
                    storyScenario: {
                      en: 'Each packet of maize meal costs KES 70, so 2 packets cost KES 140.',
                      sw: 'Kila pakiti ya unga wa mahindi ni KES 70, kwa hivyo pakiti 2 ni KES 140.'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G4-MONEY',
                    numericAnswer: { value: 140, unit: 'KES' },
                    explanation: {
                      en: 'One KES 100 note and two KES 20 coins make KES 140 (100 + 20 + 20 = 140).',
                      sw: 'Noti moja ya KES 100 na sarafu mbili za KES 20 zinaleta KES 140 (100 + 20 + 20 = 140).'
                    },
                    socraticHint: {
                      en: 'Start with a KES 100 note, then add KES 40 using KES 20 coins.',
                      sw: 'Anza na noti ya KES 100, kisha ongeza KES 40 kwa kutumia sarafu za KES 20.'
                    },
                    kenyanCulturalContext: 'The purple KES 100 note features agriculture and grain silos.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kongowea-03',
                    subStrandId: 'substrand-multiplication',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: In Kenya, one KES 50 note has the exact same value as five KES 10 coins.',
                      sw: 'Kweli au Si Kweli: Nchini Kenya, noti moja ya KES 50 ina thamani sawa kabisa na sarafu tano za KES 10.'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-MONEY',
                    options: [
                      { id: 'opt-tf-1', text: { en: 'True (Kweli)', sw: 'Kweli' } },
                      { id: 'opt-tf-2', text: { en: 'False (Si Kweli)', sw: 'Si Kweli' } }
                    ],
                    correctBoolean: true,
                    correctOptionId: 'opt-tf-1',
                    explanation: {
                      en: '5 × 10 = 50, so five 10-shilling coins equal one 50-shilling note.',
                      sw: '5 × 10 = 50, kwa hivyo sarafu tano za shilingi 10 ni sawa na noti moja ya shilingi 50.'
                    },
                    socraticHint: {
                      en: 'Multiply 5 by 10 to check if it equals 50.',
                      sw: 'Zidisha 5 kwa 10 uone kama inaleta 50.'
                    },
                    kenyanCulturalContext: 'Coins and banknotes in Kenya represent equivalent legal tender values.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kongowea-04',
                    subStrandId: 'substrand-multiplication',
                    type: 'NUMBER_ENTRY',
                    prompt: {
                      en: 'Baraka hands the fruit vendor a KES 100 note for oranges costing KES 65. How many shillings change should he receive?',
                      sw: 'Baraka anampa muuza matunda noti ya KES 100 kwa machungwa ya KES 65. Anapaswa kurudishiwa chenji ya shilingi ngapi?'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G4-MONEY',
                    numericAnswer: { value: 35, unit: 'KES' },
                    explanation: {
                      en: 'KES 100 - KES 65 = KES 35 change.',
                      sw: 'KES 100 - KES 65 = KES 35 chenji.'
                    },
                    socraticHint: {
                      en: 'Subtract 65 from 100: (100 - 60 = 40, then 40 - 5 = 35).',
                      sw: 'Toa 65 kutoka 100: (100 - 60 = 40, kisha 40 - 5 = 35).'
                    },
                    kenyanCulturalContext: 'Accurate mental subtraction prevents children and families from being shortchanged.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kongowea-05',
                    subStrandId: 'substrand-multiplication',
                    type: 'LISTEN_CHOOSE',
                    prompt: {
                      en: 'Listen carefully to the Kongowea trader and choose what item and price she is announcing.',
                      sw: 'Sikiliza kwa makini mfanyabiashara wa Kongowea na uchague bidhaa na bei anayotangaza.'
                    },
                    difficulty: 2,
                    strandTag: 'MATH-G4-MONEY',
                    audioSpeechPrompt: {
                      textToSpeak: 'Karibu Kongowea! Fungo moja la ndizi ni shilingi thelathini.',
                      language: 'sw-KE'
                    },
                    options: [
                      { id: 'opt-lc-1', text: { en: 'Bunch of bananas for KES 30', sw: 'Fungo la ndizi kwa KES 30' } },
                      { id: 'opt-lc-2', text: { en: 'Bunch of carrots for KES 50', sw: 'Fungo la karoti kwa KES 50' } },
                      { id: 'opt-lc-3', text: { en: 'Three pineapples for KES 100', sw: 'Mananasi matatu kwa KES 100' } }
                    ],
                    correctOptionId: 'opt-lc-1',
                    explanation: {
                      en: 'The trader said: "Fungo moja la ndizi ni shilingi thelathini" (A bunch of bananas is 30 shillings).',
                      sw: 'Mchuuzi alisema fungo la ndizi ni shilingi 30.'
                    },
                    socraticHint: {
                      en: 'Listen for the words "ndizi" (bananas) and "thelathini" (thirty).',
                      sw: 'Sikiliza neno "ndizi" na "thelathini" (30).'
                    },
                    kenyanCulturalContext: 'Oral trade calls (vilio vya sokoni) are characteristic of open-air Kenyan markets.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kongowea-06',
                    subStrandId: 'substrand-multiplication',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which CBC core value does Baraka demonstrate when he returns an extra KES 20 note given to him by mistake?',
                      sw: 'Je, Baraka anaonyesha thamani gani ya kitaifa ya CBC anaporudisha noti ya KES 20 aliyopewa kimakosa?'
                    },
                    difficulty: 1,
                    strandTag: 'MATH-G4-VALUES',
                    options: [
                      { id: 'opt-val-1', text: { en: 'Integrity (Uadilifu)', sw: 'Uadilifu' } },
                      { id: 'opt-val-2', text: { en: 'Selfishness (Ubinafsi)', sw: 'Ubinafsi' } },
                      { id: 'opt-val-3', text: { en: 'Pride (Kiburi)', sw: 'Kiburi' } }
                    ],
                    correctOptionId: 'opt-val-1',
                    explanation: {
                      en: 'Returning money that is not yours demonstrates Integrity (Uadilifu), one of Kenya CBC\'s 8 core values.',
                      sw: 'Kurudisha pesa zisizo zako kunaonyesha Uadilifu, moja ya maadili 8 makuu ya CBC.'
                    },
                    socraticHint: {
                      en: 'Being honest and truthful is called Integrity.',
                      sw: 'Kuwa mkweli na mwaminifu kunaitwa Uadilifu.'
                    },
                    kenyanCulturalContext: 'CBC emphasizes ethical citizenship and moral integrity in everyday commerce.',
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

  // 2. English (Upper Primary)
  {
    id: 'la-eng-g4',
    gradeId: 'grade-4',
    code: 'ENG-G4',
    title: { en: 'English Language', sw: 'Lugha ya Kiingereza' },
    description: {
      en: 'Listening, speaking, reading comprehension, grammar concord, and creative writing.',
      sw: 'Kusikiliza, kuzungumza, ufahamu wa kusoma, sarufi, na uandishi wa ubunifu.'
    },
    icon: 'BookOpen',
    color: '#8b5cf6',
    bannerGradient: 'from-violet-600 to-indigo-800',
    order: 2,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-eng-listening-reading',
        subjectId: 'la-eng-g4',
        code: 'ENG-G4-STR-01',
        title: { en: 'Listening, Speaking & Reading', sw: 'Kusikiliza, Kuzungumza na Kusoma' },
        description: {
          en: 'Pronunciation, oral narratives, and comprehension of grade-level passages.',
          sw: 'Matamshi, hadithi fupi za simulizi, na ufahamu wa vifungu vya kusoma.'
        },
        icon: 'Headphones',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-eng-oral-stories',
            strandId: 'strand-eng-listening-reading',
            code: 'ENG-G4-SUB-01',
            title: { en: 'Oral Literature & Narratives', sw: 'Hadithi za Simulizi' },
            description: {
              en: 'Identify characters, settings, and moral lessons from traditional Kenyan folk tales.',
              sw: 'Kutambua wahusika, mandhari, na mafunzo katika ngano za kienyeji.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration', 'Creativity and imagination'],
            cbeValues: ['Respect', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-eng-g4-hare-hyena',
                subStrandId: 'substrand-eng-oral-stories',
                order: 1,
                title: { en: 'The Clever Hare and Hyena', sw: 'Sungura Mjanja na Fisi' },
                storyContext: {
                  en: 'Read the traditional fable about Hare outsmarting the greedy Hyena near Mount Longonot.',
                  sw: 'Soma ngano ya jadi kuhusu Sungura aliyemshinda Fisi mlafi karibu na Mlima Longonot.'
                },
                characterName: 'Sungura',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Integrity'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-eng-01-comprehension',
                    subStrandId: 'substrand-eng-oral-stories',
                    type: 'READING_COMPREHENSION',
                    prompt: {
                      en: 'Based on the passage, why did Hare refuse to share his honey with Hyena?',
                      sw: 'Kulingana na kifungu, kwa nini Sungura alikataa kumpa Fisi asali yake?'
                    },
                    readingPassage: {
                      en: 'Once upon a time in the Great Rift Valley, Sungura the hare found a pot of sweet wild honey. Greedy Hyena saw him and demanded all of it without doing any work. Sungura told him that those who do not plant will not harvest.',
                      sw: 'Hapo zamani za kale katika Bonde la Ufa, Sungura alipata chungu cha asali tamu ya mwituni. Fisi mlafi alimuona na kudai yote bila kufanya kazi yoyote. Sungura alimwambia kuwa asiyefanya kazi halagi.'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G4-READING',
                    options: [
                      { id: 'opt-1', text: { en: 'Hyena was greedy and did not work', sw: 'Fisi alikuwa mlafi na hakufanya kazi' } },
                      { id: 'opt-2', text: { en: 'The honey had turned sour', sw: 'Asali ilikuwa imeharibika' } },
                      { id: 'opt-3', text: { en: 'Hare lost the pot in the river', sw: 'Sungura alipoteza chungu mtoni' } },
                      { id: 'opt-4', text: { en: 'Hyena was already asleep', sw: 'Fisi alikuwa tayari amelala' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Hare taught Hyena that everyone must work responsibly for what they eat.',
                      sw: 'Sungura alimfunza Fisi kwamba kila mtu lazima awajibike na kufanya kazi.'
                    },
                    socraticHint: {
                      en: 'Look at what Hare told Hyena about planting and harvesting.',
                      sw: 'Tazama kile Sungura alimwambia Fisi kuhusu kufanya kazi kabla ya kula.'
                    },
                    kenyanCulturalContext: 'Fables are widely used in Kenyan primary schools to teach moral integrity.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-eng-02-listening',
                    subStrandId: 'substrand-eng-oral-stories',
                    type: 'LISTEN_CHOOSE',
                    prompt: {
                      en: 'Listen to the audio sentence and choose the word you heard.',
                      sw: 'Sikiliza sentensi na uchague neno ulilosikia.'
                    },
                    audioSpeechPrompt: {
                      textToSpeak: 'The children planted acacia trees near the school playground.',
                      language: 'en-KE'
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G4-LISTENING',
                    options: [
                      { id: 'opt-1', text: { en: 'acacia', sw: 'acacia' } },
                      { id: 'opt-2', text: { en: 'cabbage', sw: 'cabbage' } },
                      { id: 'opt-3', text: { en: 'banana', sw: 'banana' } },
                      { id: 'opt-4', text: { en: 'coconut', sw: 'coconut' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The spoken sentence mentioned "acacia trees", a native Kenyan tree.',
                      sw: 'Sentensi iliyotamkwa ilitaja "acacia trees", mti wa asili wa Kenya.'
                    },
                    socraticHint: {
                      en: 'Tap the audio button again to listen to the tree name carefully.',
                      sw: 'Bonyeza kitufe cha sauti tena kusikiliza jina la mti kwa makini.'
                    },
                    kenyanCulturalContext: 'Acacia trees dot the Kenyan savanna landscape.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-eng-g4-sentence-build',
                subStrandId: 'substrand-eng-oral-stories',
                order: 2,
                title: { en: 'Building Kenyan Sentences', sw: 'Kujenga Sentensi' },
                storyContext: {
                  en: 'Arrange the word tiles into a grammatically correct sentence about community clean-up.',
                  sw: 'Panga vigae vya maneno kuunda sentensi sahihi kuhusu usafi wa mtaa.'
                },
                characterName: 'Wanjiku',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Responsibility', 'Unity'],
                prerequisiteQuestIds: ['quest-eng-g4-hare-hyena'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-eng-03-word-build',
                    subStrandId: 'substrand-eng-oral-stories',
                    type: 'WORD_BUILDER',
                    prompt: {
                      en: 'Arrange the scrambled word tiles in order to form a correct sentence.',
                      sw: 'Panga vigae kuunda sentensi sahihi ya Kiingereza.'
                    },
                    wordBuilderTokens: {
                      correctSentence: 'We clean our classroom every morning',
                      scrambledTokens: ['morning', 'clean', 'our', 'We', 'classroom', 'every']
                    },
                    difficulty: 1,
                    strandTag: 'ENG-G4-GRAMMAR',
                    explanation: {
                      en: 'The subject "We" begins the sentence, followed by the action verb "clean", object "our classroom", and time adverb "every morning".',
                      sw: 'Sentensi inaanza na mtenda "We", ikifuatiwa na kitendo "clean", kisha "our classroom", na wakati "every morning".'
                    },
                    socraticHint: {
                      en: 'Start with the capitalized pronoun "We". What action do we do?',
                      sw: 'Anza na kiwakilishi chenye herufi kubwa "We". Ni kitendo gani kinafuata?'
                    },
                    kenyanCulturalContext: 'Daily classroom cleaning duties (rotas) build personal responsibility in Kenyan schools.',
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

  // 3. Kiswahili (Upper Primary)
  {
    id: 'la-kisw-g4',
    gradeId: 'grade-4',
    code: 'KISW-G4',
    title: { en: 'Kiswahili', sw: 'Kiswahili Sanifu' },
    description: {
      en: 'Kusikiliza na kuzungumza, kusoma, sarufi ya ngeli, na kuandika insha.',
      sw: 'Kusikiliza na kuzungumza, kusoma, sarufi ya ngeli, na kuandika insha.'
    },
    icon: 'Feather',
    color: '#f59e0b',
    bannerGradient: 'from-amber-600 to-orange-800',
    order: 3,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-kisw-sarufi',
        subjectId: 'la-kisw-g4',
        code: 'KISW-G4-SARUFI',
        title: { en: 'Sarufi na Ngeli za Nomino', sw: 'Sarufi na Ngeli za Nomino' },
        description: {
          en: 'Noun classes (Ngeli ya A-WA, KI-VI), subject-verb agreement, and vocabulary.',
          sw: 'Ngeli ya A-WA na KI-VI, upatanisho wa kisarufi, na msamiati wa nyumbani.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-kisw-ngeli-a-wa',
            strandId: 'strand-kisw-sarufi',
            code: 'KISW-G4-NGELI-01',
            title: { en: 'Ngeli ya A-WA (Viumbe Hai)', sw: 'Ngeli ya A-WA (Viumbe Hai)' },
            description: {
              en: 'Kutambua nomino katika ngeli ya A-WA na kutumia upatanisho sahihi wa kisarufi.',
              sw: 'Kutambua nomino katika ngeli ya A-WA na kutumia upatanisho sahihi wa kisarufi.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Communication and collaboration', 'Citizenship'],
            cbeValues: ['Respect', 'Unity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-kisw-g4-ngeli-safari',
                subStrandId: 'substrand-kisw-ngeli-a-wa',
                order: 1,
                title: { en: 'Safari ya Ngeli za Kiswahili', sw: 'Safari ya Ngeli za Kiswahili' },
                storyContext: {
                  en: 'Msaidie Juma kupanga majina ya wanyama na watu katika ngeli ya A-WA kule Mombasa.',
                  sw: 'Msaidie Juma kupanga majina ya wanyama na watu katika ngeli ya A-WA kule Mombasa.'
                },
                characterName: 'Juma',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Communication and collaboration'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-kisw-01-ngeli',
                    subStrandId: 'substrand-kisw-ngeli-a-wa',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Chagua sentensi iliyo sahihi kisarufi katika ngeli ya A-WA:',
                      sw: 'Chagua sentensi iliyo sahihi kisarufi katika ngeli ya A-WA:'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G4-SARUFI',
                    options: [
                      { id: 'opt-1', text: { en: 'Mwanafunzi anasoma kitabu vizuri.', sw: 'Mwanafunzi anasoma kitabu vizuri.' } },
                      { id: 'opt-2', text: { en: 'Mwanafunzi kinasoma kitabu vizuri.', sw: 'Mwanafunzi kinasoma kitabu vizuri.' } },
                      { id: 'opt-3', text: { en: 'Mwanafunzi linasoma kitabu vizuri.', sw: 'Mwanafunzi linasoma kitabu vizuri.' } },
                      { id: 'opt-4', text: { en: 'Mwanafunzi inasoma kitabu vizuri.', sw: 'Mwanafunzi inasoma kitabu vizuri.' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Katika ngeli ya A-WA umoja, kiambishi awali cha upatanisho ni "a-" (Mwanafunzi anasoma).',
                      sw: 'Katika ngeli ya A-WA umoja, kiambishi awali cha upatanisho ni "a-" (Mwanafunzi anasoma).'
                    },
                    socraticHint: {
                      en: 'Mwanafunzi ni kiumbe hai (ngeli ya A-WA umoja). Kiambishi cha kitendo ni kipi?',
                      sw: 'Mwanafunzi ni kiumbe hai (ngeli ya A-WA umoja). Kiambishi cha kitendo ni kipi?'
                    },
                    kenyanCulturalContext: 'Kiswahili is the national and official language of Kenya, celebrating East African cultural heritage.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-kisw-02-matching',
                    subStrandId: 'substrand-kisw-ngeli-a-wa',
                    type: 'MATCHING',
                    prompt: {
                      en: 'Oanisha neno la umoja na wingi wake sahihi:',
                      sw: 'Oanisha neno la umoja na wingi wake sahihi:'
                    },
                    difficulty: 1,
                    strandTag: 'KISW-G4-SARUFI',
                    matchingPairs: [
                      { leftId: 'l1', leftText: { en: 'Mtoto (Child)', sw: 'Mtoto' }, rightId: 'r1', rightText: { en: 'Watoto (Children)', sw: 'Watoto' } },
                      { leftId: 'l2', leftText: { en: 'Mwalimu (Teacher)', sw: 'Mwalimu' }, rightId: 'r2', rightText: { en: 'Walimu (Teachers)', sw: 'Walimu' } },
                      { leftId: 'l3', leftText: { en: 'Kipepeo (Butterfly)', sw: 'Kipepeo' }, rightId: 'r3', rightText: { en: 'Vipepeo (Butterflies)', sw: 'Vipepeo' } }
                    ],
                    explanation: {
                      en: 'Mtoto -> Watoto, Mwalimu -> Walimu (A-WA), Kipepeo -> Vipepeo (KI-VI viumbe hai).',
                      sw: 'Mtoto huwa Watoto, Mwalimu huwa Walimu, na Kipepeo huwa Vipepeo.'
                    },
                    socraticHint: {
                      en: 'Kumbuka kuwa ngeli ya A-WA hubadilika kutoka M- hadi WA- katika wingi.',
                      sw: 'Kumbuka kuwa ngeli ya A-WA hubadilika kutoka M- hadi WA- katika wingi.'
                    },
                    kenyanCulturalContext: 'Misingi ya sarufi husaidia wanafunzi kuwasiliana kwa ufasaha.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-kisw-g4-methali',
                subStrandId: 'substrand-kisw-ngeli-a-wa',
                order: 2,
                title: { en: 'Methali za Kiswahili', sw: 'Methali za Busara za Kiswahili' },
                storyContext: {
                  en: 'Jifunze methali za hekima za Kiafrika zinazofundisha ushirikiano na bidii.',
                  sw: 'Jifunze methali za hekima za Kiafrika zinazofundisha ushirikiano na bidii.'
                },
                characterName: 'Bi Rehema',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship', 'Critical thinking and problem solving'],
                cbeValues: ['Unity', 'Responsibility'],
                prerequisiteQuestIds: ['quest-kisw-g4-ngeli-safari'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-kisw-03-methali',
                    subStrandId: 'substrand-kisw-ngeli-a-wa',
                    type: 'FILL_BLANK',
                    prompt: {
                      en: 'Kamilisha methali hii ya hekima: "Umoja ni nguvu, utengano ni ______."',
                      sw: 'Kamilisha methali hii ya hekima: "Umoja ni nguvu, utengano ni ______."'
                    },
                    blankTemplate: {
                      en: 'Umoja ni nguvu, utengano ni [BLANK].',
                      sw: 'Umoja ni nguvu, utengano ni [BLANK].'
                    },
                    fillBlankAnswers: ['udhaifu', 'Udhaifu'],
                    difficulty: 1,
                    strandTag: 'KISW-G4-METHALI',
                    explanation: {
                      en: 'Methali inasema: "Umoja ni nguvu, utengano ni udhaifu." Inafundisha kwamba tukishirikiana tunakuwa imara.',
                      sw: 'Methali inasema: "Umoja ni nguvu, utengano ni udhaifu." Inafundisha kwamba tukishirikiana tunakuwa imara.'
                    },
                    socraticHint: {
                      en: 'Kinyume cha "nguvu" ni nini?',
                      sw: 'Kinyume cha "nguvu" ni nini?'
                    },
                    kenyanCulturalContext: 'Kenya’s national motto "Harambee" mirrors this proverb of pulling together in unity.',
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

  // 4. Science and Technology (Upper Primary)
  {
    id: 'la-sci-g4',
    gradeId: 'grade-4',
    code: 'SCI-G4',
    title: { en: 'Science and Technology', sw: 'Sayansi na Teknolojia' },
    description: {
      en: 'Living things, plant parts, water cycle, simple machines, and foundational digital literacy.',
      sw: 'Viumbe hai, sehemu za mmea, mzunguko wa maji, mashine rahisi, na stadi za kidijitali.'
    },
    icon: 'Microscope',
    color: '#0ea5e9',
    bannerGradient: 'from-sky-600 to-cyan-800',
    order: 4,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-sci-living-things',
        subjectId: 'la-sci-g4',
        code: 'SCI-G4-STR-01',
        title: { en: 'Living Things and Plants', sw: 'Viumbe Hai na Mimea' },
        description: {
          en: 'External parts of plants, functions of roots, stems, leaves, and seed germination.',
          sw: 'Sehemu za nje za mmea, kazi ya mizizi, shina, majani, na kuota kwa mbegu.'
        },
        icon: 'Sprout',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-sci-plant-parts',
            strandId: 'strand-sci-living-things',
            code: 'SCI-G4-SUB-01',
            title: { en: 'Parts of a Flowering Plant', sw: 'Sehemu za Mmea Unaotoa Maua' },
            description: {
              en: 'Identify tap roots vs fibrous roots and observe transpiration in green leaves.',
              sw: 'Kutambua mizizi mikuu na mizizi ya nyuzi pamoja na majani.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Learning to learn'],
            cbeValues: ['Responsibility', 'Love'],
            estimatedMinutes: 25,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-sci-g4-plant-detective',
                subStrandId: 'substrand-sci-plant-parts',
                order: 1,
                title: { en: 'The Plant Detective in Naivasha', sw: 'Mpelelezi wa Mimea Naivasha' },
                storyContext: {
                  en: 'Join Brian as he examines bean and maize plants near Lake Naivasha to identify plant structures.',
                  sw: 'Ungana na Brian anapochunguza mimea ya maharage na mahindi karibu na Ziwa Naivasha.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 12,
                xpReward: 45,
                coinReward: 20,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-sci-01-plant-parts',
                    subStrandId: 'substrand-sci-plant-parts',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which part of the plant absorbs water and mineral salts from the soil?',
                      sw: 'Ni sehemu gani ya mmea inayofyonza maji na chumvi za madini kutoka ardhini?'
                    },
                    difficulty: 1,
                    strandTag: 'SCI-G4-PLANTS',
                    options: [
                      { id: 'opt-1', text: { en: 'Leaves (Majani)', sw: 'Majani' } },
                      { id: 'opt-2', text: { en: 'Flowers (Maua)', sw: 'Maua' } },
                      { id: 'opt-3', text: { en: 'Roots (Mizizi)', sw: 'Mizizi' } },
                      { id: 'opt-4', text: { en: 'Stem (Shina)', sw: 'Shina' } }
                    ],
                    correctOptionId: 'opt-3',
                    explanation: {
                      en: 'Roots anchor the plant into the soil and absorb water and dissolved nutrients for growth.',
                      sw: 'Mizizi hushikilia mmea ardhini na kufyonza maji na virutubisho kwa ajili ya ukuaji.'
                    },
                    socraticHint: {
                      en: 'Think about which part of the plant is underground in the soil.',
                      sw: 'Fikiria ni sehemu gani ya mmea inayokaa chini ya ardhi.'
                    },
                    kenyanCulturalContext: 'Healthy soil management in rural Kenya is crucial for food security.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-sci-02-image-label',
                    subStrandId: 'substrand-sci-plant-parts',
                    type: 'IMAGE_LABEL',
                    prompt: {
                      en: 'Select the correct label for the plant structure shown in the garden diagram.',
                      sw: 'Chagua kibandiko sahihi cha muundo wa mmea ulioonyeshwa.'
                    },
                    imageLabelData: {
                      imageUrl: '/images/curriculum/flowering_plant.svg',
                      hotspots: [
                        { id: 'spot-leaf', label: { en: 'Leaf (Makes food)', sw: 'Jani (Hutengeneza chakula)' }, xPercent: 50, yPercent: 30 },
                        { id: 'spot-stem', label: { en: 'Stem (Transports water)', sw: 'Shina (Husafirisha maji)' }, xPercent: 50, yPercent: 60 }
                      ]
                    },
                    difficulty: 1,
                    strandTag: 'SCI-G4-PLANTS',
                    explanation: {
                      en: 'Leaves contain chlorophyll to make food via photosynthesis, while stems support the plant.',
                      sw: 'Majani hutengeneza chakula kupitia usanisinuru na shina hushikilia mmea wima.'
                    },
                    socraticHint: {
                      en: 'Which green part absorbs sunlight to make food for the plant?',
                      sw: 'Ni sehemu gani ya kijani inayofyonza mwanga wa jua kutengeneza chakula?'
                    },
                    kenyanCulturalContext: 'Students learn through practical outdoor observation in their school compounds.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-sci-g4-matter',
                subStrandId: 'substrand-sci-plant-parts',
                order: 2,
                title: { en: 'States of Matter & Clean Water', sw: 'Hali za Maada na Maji Safi' },
                storyContext: {
                  en: 'Explore solids, liquids, and gases, and how boiling makes water safe to drink in Machakos.',
                  sw: 'Gundua yabisi, kimiminika na gesi, na jinsi ya kuchemsha maji ili yawe salama Machakos.'
                },
                characterName: 'Mutua',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-sci-g4-plant-detective'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-sci-03-water-states',
                    subStrandId: 'substrand-sci-plant-parts',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Boiling drinking water kills harmful disease-causing germs.',
                      sw: 'Kweli au Si Kweli: Kuchemsha maji ya kunywa huua vijidudu vinavyosababisha magonjwa.'
                    },
                    difficulty: 1,
                    strandTag: 'SCI-G4-MATTER',
                    correctBoolean: true,
                    explanation: {
                      en: 'Boiling water vigorously kills harmful bacteria and parasites, making it safe for drinking.',
                      sw: 'Kuchemsha maji huua vijidudu na bakteria hatari, na kuyafanya salama kwa matumizi.'
                    },
                    socraticHint: {
                      en: 'Why do healthcare workers and teachers encourage families to boil drinking water?',
                      sw: 'Kwa nini maafisa wa afya wanashauri watu kuchemsha maji kabla ya kunywa?'
                    },
                    kenyanCulturalContext: 'Public health hygiene is an essential practical life skill across Kenyan communities.',
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

  // 5. Social Studies (Upper Primary)
  {
    id: 'la-soc-g4',
    gradeId: 'grade-4',
    code: 'SOC-G4',
    title: { en: 'Social Studies', sw: 'Masomo ya Kijamii' },
    description: {
      en: 'Our county, Kenyan physical features, climate, culture, heroes, and responsible citizenship.',
      sw: 'Kaunti yetu, mandhari ya kijiografia ya Kenya, hali ya hewa, utamaduni na uraia mwema.'
    },
    icon: 'Compass',
    color: '#ec4899',
    bannerGradient: 'from-pink-600 to-rose-800',
    order: 5,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-soc-our-county',
        subjectId: 'la-soc-g4',
        code: 'SOC-G4-STR-01',
        title: { en: 'Our County and Environment', sw: 'Kaunti Yetu na Mazingira' },
        description: {
          en: 'Cardinal points of a compass, neighbouring counties, and physical landmarks.',
          sw: 'Pande nne za dira, kaunti jirani, na alama maarufu za ardhi.'
        },
        icon: 'MapPin',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-soc-compass',
            strandId: 'strand-soc-our-county',
            code: 'SOC-G4-SUB-01',
            title: { en: 'The Four Cardinal Points', sw: 'Pande Nne Kuu za Dira' },
            description: {
              en: 'Use North, South, East, and West to locate places in Kenya.',
              sw: 'Kutumia Kaskazini, Kusini, Mashariki na Magharibi kuonyesha maeneo.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship', 'Critical thinking and problem solving'],
            cbeValues: ['Patriotism', 'Unity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-soc-g4-compass-explorer',
                subStrandId: 'substrand-soc-compass',
                order: 1,
                title: { en: 'Navigating Kenya with a Compass', sw: 'Kutembea Kenya kwa Dira' },
                storyContext: {
                  en: 'Help Zawadi use the sun and a compass to find direction from Mount Kenya to Mombasa.',
                  sw: 'Msaidie Zawadi kutumia jua na dira kutambua uelekeo kuanzia Mlima Kenya hadi Mombasa.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Patriotism'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-soc-01-compass',
                    subStrandId: 'substrand-soc-compass',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'In Kenya, which cardinal direction does the sun rise from every morning?',
                      sw: 'Hapa Kenya, jua huchomoza kutoka upande gani wa dira kila asubuhi?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G4-PHYSICAL',
                    options: [
                      { id: 'opt-1', text: { en: 'East (Mashariki)', sw: 'Mashariki' } },
                      { id: 'opt-2', text: { en: 'West (Magharibi)', sw: 'Magharibi' } },
                      { id: 'opt-3', text: { en: 'North (Kaskazini)', sw: 'Kaskazini' } },
                      { id: 'opt-4', text: { en: 'South (Kusini)', sw: 'Kusini' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'The sun rises in the East (Mashariki) and sets in the West (Magharibi).',
                      sw: 'Jua huchomoza upande wa Mashariki na kutua upande wa Magharibi.'
                    },
                    socraticHint: {
                      en: 'Think about where the Indian Ocean is located relative to central Kenya.',
                      sw: 'Fikiria kuhusu jinsi asubuhi inavyoanza kuelekea upande wa bahari.'
                    },
                    kenyanCulturalContext: 'Understanding natural navigation connects children to their geography and climate.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-soc-02-kenya-map',
                    subStrandId: 'substrand-soc-compass',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What is the highest mountain peak located in Kenya?',
                      sw: 'Ni mlima gani mrefu zaidi unaopatikana ndani ya nchi ya Kenya?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G4-PHYSICAL',
                    options: [
                      { id: 'opt-1', text: { en: 'Mount Kenya (Kirinyaga)', sw: 'Mlima Kenya (Kirinyaga)' } },
                      { id: 'opt-2', text: { en: 'Mount Elgon', sw: 'Mlima Elgon' } },
                      { id: 'opt-3', text: { en: 'Mount Longonot', sw: 'Mlima Longonot' } },
                      { id: 'opt-4', text: { en: 'Menengai Crater', sw: 'Kreta ya Menengai' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Mount Kenya (Kirinyaga) is the highest mountain in Kenya at 5,199 metres.',
                      sw: 'Mlima Kenya ndio mrefu zaidi nchini Kenya wenye kimo cha mita 5,199.'
                    },
                    socraticHint: {
                      en: 'It is the mountain after which our beloved nation Kenya is named.',
                      sw: 'Ndio mlima ambao taifa letu la Kenya lilipewa jina lake.'
                    },
                    kenyanCulturalContext: 'Mount Kenya is an iconic national monument and water catchment tower.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-soc-g4-heroes',
                subStrandId: 'substrand-soc-compass',
                order: 2,
                title: { en: 'Kenyan National Heroes & Values', sw: 'Mashujaa wa Taifa na Maadili' },
                storyContext: {
                  en: 'Learn about Wangari Maathai and how caring for trees made Kenya and the world better.',
                  sw: 'Jifunze kumhusu Profesa Wangari Maathai na jinsi alivyopanda miti kulinda Kenya.'
                },
                characterName: 'Mwalimu',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Patriotism', 'Responsibility'],
                prerequisiteQuestIds: ['quest-soc-g4-compass-explorer'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-soc-03-wangari',
                    subStrandId: 'substrand-soc-compass',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Professor Wangari Maathai won the Nobel Peace Prize for her work in doing what?',
                      sw: 'Profesa Wangari Maathai alishinda Tuzo ya Amani ya Nobel kwa kazi gani?'
                    },
                    difficulty: 1,
                    strandTag: 'SOC-G4-CITIZENSHIP',
                    options: [
                      { id: 'opt-1', text: { en: 'Planting trees and environmental conservation', sw: 'Kupanda miti na kutunza mazingira' } },
                      { id: 'opt-2', text: { en: 'Building superhighways', sw: 'Kujenga barabara kuu' } },
                      { id: 'opt-3', text: { en: 'Fishing in Lake Victoria', sw: 'Kuvua samaki Ziwa Victoria' } },
                      { id: 'opt-4', text: { en: 'Playing football', sw: 'Kucheza mpira wa miguu' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Wangari Maathai founded the Green Belt Movement and planted millions of trees across Kenya.',
                      sw: 'Wangari Maathai alianzisha vuguvugu la Green Belt Movement na kupanda mamilioni ya miti nchini Kenya.'
                    },
                    socraticHint: {
                      en: 'Think about Karura Forest in Nairobi that was saved by environmentalists.',
                      sw: 'Fikiria msitu wa Karura jijini Nairobi uliookolewa na wapenda mazingira.'
                    },
                    kenyanCulturalContext: 'Wangari Maathai is honored as one of Kenya’s greatest national heroines on Mashujaa Day.',
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

  // 6. Agriculture and Nutrition (Upper Primary)
  {
    id: 'la-agri-g4',
    gradeId: 'grade-4',
    code: 'AGRI-G4',
    title: { en: 'Agriculture and Nutrition', sw: 'Kilimo na Lishe' },
    description: {
      en: 'Soil conservation, crop establishment, kitchen gardening, and balanced nutrition.',
      sw: 'Kuhifadhi udongo, upandaji wa mazao, bustani ya jikoni, na lishe bora.'
    },
    icon: 'Sprout',
    color: '#84cc16',
    bannerGradient: 'from-lime-600 to-green-800',
    order: 6,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-agri-kitchen-garden',
        subjectId: 'la-agri-g4',
        code: 'AGRI-G4-STR-01',
        title: { en: 'Kitchen Gardening & Crops', sw: 'Bustani ya Jikoni na Mazao' },
        description: {
          en: 'Container gardening, sack gardens, and watering crops using drip methods.',
          sw: 'Upandaji kwenye magunia na vyombo pamoja na umwagiliaji wa matone.'
        },
        icon: 'Package',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-agri-sack-gardens',
            strandId: 'strand-agri-kitchen-garden',
            code: 'AGRI-G4-SUB-01',
            title: { en: 'Sack and Container Gardening', sw: 'Bustani ya Gunia na Vyombo' },
            description: {
              en: 'Prepare organic compost soil and plant spinach or indigenous greens in sacks.',
              sw: 'Kuandaa mboji na kupanda mchicha au managu katika gunia.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Critical thinking and problem solving', 'Self-efficacy'],
            cbeValues: ['Responsibility', 'Integrity'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-agri-g4-sack-garden',
                subStrandId: 'substrand-agri-sack-gardens',
                order: 1,
                title: { en: 'Building a Micro Sack Garden', sw: 'Kutengeneza Bustani Ndogo ya Gunia' },
                storyContext: {
                  en: 'Follow Akinyi as she creates a vertical sack garden for fresh managu outside her home.',
                  sw: 'Fuata hatua za Akinyi anapotengeneza bustani ya gunia ya managu nyumbani kwao.'
                },
                characterName: 'Akinyi',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Self-efficacy', 'Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-agri-01-sequencing',
                    subStrandId: 'substrand-agri-sack-gardens',
                    type: 'ORDERING',
                    prompt: {
                      en: 'Put these steps for planting vegetable seedlings into the correct order:',
                      sw: 'Panga hatua hizi za kupanda miche ya mboga kwa mfuatano sahihi:'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G4-CROPS',
                    correctOrderIds: ['step-1', 'step-2', 'step-3'],
                    options: [
                      { id: 'step-1', text: { en: '1. Prepare moist rich soil with compost manure', sw: '1. Andaa udongo wenye rutuba na samadi' } },
                      { id: 'step-2', text: { en: '2. Dig small holes and plant seedlings gently', sw: '2. Chimba mashimo madogo na kupanda miche kwa uangalifu' } },
                      { id: 'step-3', text: { en: '3. Water the seedlings gently in the evening', sw: '3. Mwagilia miche maji nyakati za jioni' } }
                    ],
                    explanation: {
                      en: 'First prepare good soil, then plant seedlings carefully, and finally water them gently.',
                      sw: 'Kwanza andaa udongo, kisha panda miche, na mwisho mwagilia maji jioni.'
                    },
                    socraticHint: {
                      en: 'Can you plant before preparing the soil? What must come first?',
                      sw: 'Je, unaweza kupanda kabla ya kuandaa udongo? Ni nini kinatangulia?'
                    },
                    kenyanCulturalContext: 'Kitchen sack gardens provide fresh vegetables even in dense urban and arid settings in Kenya.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-agri-02-nutrition',
                    subStrandId: 'substrand-agri-sack-gardens',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Which of the following indigenous Kenyan vegetables is rich in iron and vitamins?',
                      sw: 'Ni mboga gani ya kienyeji ya Kenya yenye madini ya chuma na vitamini nyingi?'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G4-NUTRITION',
                    options: [
                      { id: 'opt-1', text: { en: 'Managu (African Nightshade)', sw: 'Managu' } },
                      { id: 'opt-2', text: { en: 'White refined sugar', sw: 'Sukari nyeupe' } },
                      { id: 'opt-3', text: { en: 'Sweets (Pipi)', sw: 'Pipi' } },
                      { id: 'opt-4', text: { en: 'Carbonated soda', sw: 'Soda' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Managu, terere, and kunde are highly nutritious indigenous dark green vegetables.',
                      sw: 'Managu, terere na kunde ni mboga za asili zenye virutubisho tele mwilini.'
                    },
                    socraticHint: {
                      en: 'Look for the traditional dark green leafy vegetable.',
                      sw: 'Tazama mboga ya majani ya kienyeji ya kijani kibichi.'
                    },
                    kenyanCulturalContext: 'Indigenous vegetables are celebrated in Kenyan CBC for promoting nutritional well-being.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-agri-g4-water-care',
                subStrandId: 'substrand-agri-sack-gardens',
                order: 2,
                title: { en: 'Saving Water with Drip Irrigation', sw: 'Kutunza Maji kwa Umwagiliaji wa Matone' },
                storyContext: {
                  en: 'Learn how perforated plastic bottles can slowly water tomato plants drop by drop.',
                  sw: 'Jifunze jinsi ya kutumia chupa za plastiki kumwagilia nyanya tone kwa tone.'
                },
                characterName: 'Kipchoge',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Critical thinking and problem solving'],
                cbeValues: ['Responsibility'],
                prerequisiteQuestIds: ['quest-agri-g4-sack-garden'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-agri-03-drip',
                    subStrandId: 'substrand-agri-sack-gardens',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Drip irrigation saves water by directing drops straight to the roots.',
                      sw: 'Kweli au Si Kweli: Umwagiliaji wa matone huokoa maji kwa kupeleka matone moja kwa moja kwenye mizizi.'
                    },
                    difficulty: 1,
                    strandTag: 'AGRI-G4-WATER',
                    correctBoolean: true,
                    explanation: {
                      en: 'Drip irrigation avoids evaporation and water waste by delivering water directly to roots.',
                      sw: 'Umwagiliaji wa matone huzuia upotevu wa maji kwa kuyafikisha moja kwa moja kwenye mizizi.'
                    },
                    socraticHint: {
                      en: 'Does delivering water right at the root use more or less water than spraying into the air?',
                      sw: 'Je, kupeleka maji moja kwa moja kwenye shina hutumia maji kidogo au mengi?'
                    },
                    kenyanCulturalContext: 'Water conservation technologies help Kenyan farmers thrive through dry seasons.',
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

  // 7. Religious Education (CRE / IRE / HRE)
  {
    id: 'la-re-g4',
    gradeId: 'grade-4',
    code: 'RE-G4',
    title: { en: 'Religious Education (CRE / IRE)', sw: 'Elimu ya Dini (CRE / IRE)' },
    description: {
      en: 'Moral values, integrity, sharing, respect for parents, and living peacefully with neighbors.',
      sw: 'Maadili mema, uadilifu, kusaidiana, heshima kwa wazazi, na kuishi kwa amani na majirani.'
    },
    icon: 'Heart',
    color: '#3b82f6',
    bannerGradient: 'from-blue-600 to-indigo-800',
    order: 7,
    religiousEducationStream: 'CRE',
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-re-values-community',
        subjectId: 'la-re-g4',
        code: 'RE-G4-STR-01',
        title: { en: 'Values in the Family and Community', sw: 'Maadili Katika Familia na Jamii' },
        description: {
          en: 'Honesty, sharing with those in need, obedience, and truthfulness in daily life.',
          sw: 'Ukweli, kusaidia wahitaji, utiifu, na uaminifu katika maisha ya kila siku.'
        },
        icon: 'Users',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-re-honesty-love',
            strandId: 'strand-re-values-community',
            code: 'RE-G4-SUB-01',
            title: { en: 'Honesty and Helping Neighbors', sw: 'Uaminifu na Kusaidia Majirani' },
            description: {
              en: 'Understand how returning lost items and telling the truth builds community trust.',
              sw: 'Kufahamu jinsi kusema ukweli na kurejesha mali iliyopotea hujenga amani.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship', 'Self-efficacy'],
            cbeValues: ['Integrity', 'Love', 'Peace'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-re-g4-good-neighbor',
                subStrandId: 'substrand-re-honesty-love',
                order: 1,
                title: { en: 'The Honest Shepherd Boy', sw: 'Mvulana Mchunga Mwaminifu' },
                storyContext: {
                  en: 'Amina and Baraka discuss the importance of keeping promises and respecting elders.',
                  sw: 'Amina na Baraka wanajadili umuhimu wa kutimiza ahadi na kuheshimu wazee.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Integrity', 'Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-re-01-integrity',
                    subStrandId: 'substrand-re-honesty-love',
                    type: 'SCENARIO',
                    prompt: {
                      en: 'You find a 100-shilling note dropped near the school flagpole. What is the right thing to do?',
                      sw: 'Umepata noti ya shilingi 100 imeanguka karibu na mlingoti wa bendera shuleni. Ni jambo gani sahihi la kufanya?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G4-VALUES',
                    options: [
                      { id: 'opt-1', text: { en: 'Take it to the teacher on duty so the owner can be found', sw: 'Ipeleke kwa mwalimu wa zamu ili mwenyewe atafutwe' } },
                      { id: 'opt-2', text: { en: 'Keep it quietly in your pocket and buy sweets', sw: 'Iweke mfukoni kimya kimya ununue pipi' } },
                      { id: 'opt-3', text: { en: 'Throw it away', sw: 'Itupe mbali' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Honesty and integrity mean doing what is right even when nobody is watching.',
                      sw: 'Uadilifu unamaanisha kufanya jambo sahihi hata wakati hakuna anayekuona.'
                    },
                    socraticHint: {
                      en: 'How would you feel if you dropped your money and someone returned it to you?',
                      sw: 'Ungejisikiaje iwapo ungepoteza pesa zako kisha mtu akakurudishia?'
                    },
                    kenyanCulturalContext: 'CBC places heavy emphasis on national values and ethical character formation.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-re-02-helping',
                    subStrandId: 'substrand-re-honesty-love',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Helping an elderly neighbor carry a heavy grocery bag is an example of community love.',
                      sw: 'Kweli au Si Kweli: Kumsaidia mzee jirani kubeba mzigo mzito ni mfano wa upendo katika jamii.'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G4-VALUES',
                    correctBoolean: true,
                    explanation: {
                      en: 'Showing kindness and respect to elders strengthens love and unity in the village.',
                      sw: 'Kuonyesha heshima na upendo kwa wazee huimarisha umoja katika jamii.'
                    },
                    socraticHint: {
                      en: 'Does helping someone in need show love and respect?',
                      sw: 'Je, kumsaidia mtu aliye na shida kunaonyesha upendo na heshima?'
                    },
                    kenyanCulturalContext: 'Intergenerational respect is a hallmark of Kenyan cultural heritage.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-re-g4-peace',
                subStrandId: 'substrand-re-honesty-love',
                order: 2,
                title: { en: 'Living in Peace and Harmony', sw: 'Kuishi kwa Amani na Maelewano' },
                storyContext: {
                  en: 'Understanding how saying sorry and forgiving others resolves classroom disagreements.',
                  sw: 'Kufahamu jinsi kuomba msamaha na kusamehe kunavyotatua mizozo darasani.'
                },
                characterName: 'Mwalimu Ochieng',
                characterAvatar: 'owl',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Peace', 'Love'],
                prerequisiteQuestIds: ['quest-re-g4-good-neighbor'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-re-03-peace',
                    subStrandId: 'substrand-re-honesty-love',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'If you accidentally step on your classmate’s foot during playtime, what should you do?',
                      sw: 'Iwapo utamkanyaga mwenzako kwa bahati mbaya mchezoni, unapaswa kufanya nini?'
                    },
                    difficulty: 1,
                    strandTag: 'RE-G4-VALUES',
                    options: [
                      { id: 'opt-1', text: { en: 'Apologize sincerely by saying "Pole sana, it was an accident"', sw: 'Omba msamaha kwa kusema "Pole sana, ilikuwa bahati mbaya"' } },
                      { id: 'opt-2', text: { en: 'Laugh loudly and run away', sw: 'Cheka kwa nguvu na kukimbia' } },
                      { id: 'opt-3', text: { en: 'Blame someone else', sw: 'Mlaumu mtu mwingine' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Saying "Pole" (sorry) promotes peace and heals friendships immediately.',
                      sw: 'Kusema "Pole" huleta amani na kulinda urafiki.'
                    },
                    socraticHint: {
                      en: 'What word restores peace when an accident happens?',
                      sw: 'Ni neno gani huleta amani ajali inapotokea?'
                    },
                    kenyanCulturalContext: 'The polite Kenyan expression "Pole" is foundational to community peace.',
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

  // 8. Creative Arts (Upper Primary: Art & Craft, Music, Physical Education)
  {
    id: 'la-ca-g4',
    gradeId: 'grade-4',
    code: 'CA-G4',
    title: { en: 'Creative Arts', sw: 'Sanaa za Ubunifu' },
    description: {
      en: 'Drawing, indigenous weaving, rhythm, traditional musical instruments, and physical wellness.',
      sw: 'Kuchora, ususi wa asili, mahadhi, ala za muziki za kienyeji, na michezo.'
    },
    icon: 'Palette',
    color: '#a855f7',
    bannerGradient: 'from-purple-600 to-fuchsia-800',
    order: 8,
    prerequisiteIds: [],
    sourceStatus: 'OFFICIAL_KICD',
    strands: [
      {
        id: 'strand-ca-music-art',
        subjectId: 'la-ca-g4',
        code: 'CA-G4-STR-01',
        title: { en: 'Visual Arts and Kenyan Music', sw: 'Sanaa za Maono na Muziki wa Kenya' },
        description: {
          en: 'Primary and secondary colors, rhythmic claps, and indigenous Kenyan drums and flutes.',
          sw: 'Rangi za msingi, kupiga makofi kwa mahadhi, na ngoma za kiasili.'
        },
        icon: 'Music',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'OFFICIAL_KICD',
        subStrands: [
          {
            id: 'substrand-ca-colors-instruments',
            strandId: 'strand-ca-music-art',
            code: 'CA-G4-SUB-01',
            title: { en: 'Color Mixing & Traditional Instruments', sw: 'Mchanganyiko wa Rangi na Ala za Asili' },
            description: {
              en: 'Mix primary colors (red, blue, yellow) and recognize traditional drums (Isukuti, Nyatiti).',
              sw: 'Kuchanganya rangi za msingi na kutambua ngoma za asili kama Isukuti na Nyatiti.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Creativity and imagination', 'Citizenship'],
            cbeValues: ['Unity', 'Love'],
            estimatedMinutes: 20,
            sourceStatus: 'OFFICIAL_KICD',
            quests: [
              {
                id: 'quest-ca-g4-drums-colors',
                subStrandId: 'substrand-ca-colors-instruments',
                order: 1,
                title: { en: 'Rhythms of the Kenyan Drum', sw: 'Mahadhi ya Ngoma za Kenya' },
                storyContext: {
                  en: 'Brian learns to beat the Isukuti drum and mixes red and yellow to paint a savanna sunset.',
                  sw: 'Brian anajifunza kupiga ngoma ya Isukuti na kuchanganya rangi nyekundu na manjano.'
                },
                characterName: 'Brian',
                characterAvatar: 'lion',
                difficulty: 1,
                estimatedMinutes: 10,
                xpReward: 40,
                coinReward: 20,
                cbeCompetencies: ['Creativity and imagination'],
                cbeValues: ['Unity'],
                prerequisiteQuestIds: [],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-ca-01-color-mixing',
                    subStrandId: 'substrand-ca-colors-instruments',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'What secondary color do you get when you mix Red paint and Yellow paint together?',
                      sw: 'Unapata rangi gani ya pili unapochanganya rangi Nyekundu na Manjano pamoja?'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G4-ART',
                    options: [
                      { id: 'opt-1', text: { en: 'Orange (Rangi ya machungwa)', sw: 'Rangi ya machungwa' } },
                      { id: 'opt-2', text: { en: 'Green (Kijani)', sw: 'Kijani' } },
                      { id: 'opt-3', text: { en: 'Purple (Zambarau)', sw: 'Zambarau' } },
                      { id: 'opt-4', text: { en: 'Black (Nyeusi)', sw: 'Nyeusi' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Mixing equal parts of Red and Yellow produces the secondary color Orange.',
                      sw: 'Kuchanganya Nyekundu na Manjano hutokeza rangi ya Machungwa.'
                    },
                    socraticHint: {
                      en: 'Think of the warm glow of an evening sunset in the Masai Mara.',
                      sw: 'Fikiria rangi ya jua linapotua jioni mbugani.'
                    },
                    kenyanCulturalContext: 'Color mixing inspires creative expression in traditional beadwork and pottery.',
                    sourceStatus: 'OFFICIAL_KICD'
                  },
                  {
                    id: 'q-ca-02-instruments',
                    subStrandId: 'substrand-ca-colors-instruments',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'The famous "Isukuti" is an energetic traditional drum originated from which Kenyan community?',
                      sw: 'Ngoma maarufu ya kiasili ya "Isukuti" yenye miondoko ya kasi inatoka katika jamii gani ya Kenya?'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G4-MUSIC',
                    options: [
                      { id: 'opt-1', text: { en: 'Luhya community of Western Kenya', sw: 'Jamii ya Waluhya ya Magharibi mwa Kenya' } },
                      { id: 'opt-2', text: { en: 'Maasai community', sw: 'Jamii ya Wamaasai' } },
                      { id: 'opt-3', text: { en: 'Swahili coastal community', sw: 'Jamii ya Waswahili pwani' } },
                      { id: 'opt-4', text: { en: 'Turkana community', sw: 'Jamii ya Waturkana' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Isukuti is a traditional UNESCO-inscribed celebratory drum dance of the Luhya people of Kakamega.',
                      sw: 'Isukuti ni ngoma ya asili ya sherehe ya jamii ya Waluhya wa Kakamega inayotambuliwa na UNESCO.'
                    },
                    socraticHint: {
                      en: 'This drum is famous for lively bull-fighting and sports celebrations in Kakamega.',
                      sw: 'Ngoma hii hupigwa sana Kakamega kwenye mashindano ya fahali na michezo.'
                    },
                    kenyanCulturalContext: 'Traditional music strengthens pride in Kenyan indigenous heritage.',
                    sourceStatus: 'OFFICIAL_KICD'
                  }
                ]
              },
              {
                id: 'quest-ca-g4-movement',
                subStrandId: 'substrand-ca-colors-instruments',
                order: 2,
                title: { en: 'Physical Games & Body Balance', sw: 'Michezo ya Viungo na Usawa' },
                storyContext: {
                  en: 'Practise stretching, balance, and cooperative relay games on the school field.',
                  sw: 'Fanya mazoezi ya kunyoosha viungo, usawa na michezo ya mbio za kupokezana vijiti.'
                },
                characterName: 'Amina',
                characterAvatar: 'cheetah',
                difficulty: 1,
                estimatedMinutes: 8,
                xpReward: 35,
                coinReward: 15,
                cbeCompetencies: ['Self-efficacy', 'Communication and collaboration'],
                cbeValues: ['Unity'],
                prerequisiteQuestIds: ['quest-ca-g4-drums-colors'],
                sourceStatus: 'OFFICIAL_KICD',
                questions: [
                  {
                    id: 'q-ca-03-wellness',
                    subStrandId: 'substrand-ca-colors-instruments',
                    type: 'TRUE_FALSE',
                    prompt: {
                      en: 'True or False: Warming up your muscles before running helps prevent sports injuries.',
                      sw: 'Kweli au Si Kweli: Kupasha misuli moto kabla ya kukimbia husaidia kuzuia majeraha.'
                    },
                    difficulty: 1,
                    strandTag: 'CA-G4-PHE',
                    correctBoolean: true,
                    explanation: {
                      en: 'Gentle warm-ups increase blood flow and prepare joints and muscles for safe physical activity.',
                      sw: 'Kupasha misuli moto huongeza mzunguko wa damu na kuzuia majeraha mwilini.'
                    },
                    socraticHint: {
                      en: 'Why do Kenyan athletes like Kipchoge do warm-up jogs before running?',
                      sw: 'Kwa nini wanariadha mashuhuri hufanya mazoezi ya awali kabla ya mbio kuu?'
                    },
                    kenyanCulturalContext: 'Kenya’s global athletic renown inspires healthy physical exercise in CBC.',
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

  // 9. Indigenous Language (Upper Primary - Optional placeholder with strict TODO tag)
  {
    id: 'la-indig-g4',
    gradeId: 'grade-4',
    code: 'INDIG-G4',
    title: { en: 'Indigenous Language (Optional)', sw: 'Lugha ya Asili (Hiari)' },
    description: {
      en: 'Mother tongue oral stories, cultural proverbs, and traditional vocabulary.',
      sw: 'Hadithi za lugha ya mama, methali za kiasili, na msamiati wa kitamaduni.'
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
        id: 'strand-indig-g4-placeholder',
        subjectId: 'la-indig-g4',
        code: 'INDIG-G4-STR-01',
        title: { en: 'Indigenous Cultural Stories (Preview)', sw: 'Hadithi za Kiasili (Onyesho la Awali)' },
        description: {
          en: 'Cultural oral literature preserved through community elders.',
          sw: 'Fasihi simulizi ya jamii inayohifadhiwa na wazee wa mtaa.'
        },
        icon: 'Bookmark',
        order: 1,
        prerequisiteIds: [],
        sourceStatus: 'TODO: verify with KICD design',
        subStrands: [
          {
            id: 'substrand-indig-g4-placeholder',
            strandId: 'strand-indig-g4-placeholder',
            code: 'INDIG-G4-SUB-01',
            title: { en: 'Community Fables and Songs', sw: 'Ngano na Nyimbo za Jamii' },
            description: {
              en: 'Optional language exploration respecting individual county heritage.',
              sw: 'Mafunzo ya hiari kulingana na mila za kaunti mbalimbali.'
            },
            order: 1,
            prerequisiteIds: [],
            cbeCompetencies: ['Citizenship'],
            cbeValues: ['Respect', 'Unity'],
            estimatedMinutes: 15,
            sourceStatus: 'TODO: verify with KICD design',
            quests: [
              {
                id: 'quest-indig-g4-preview',
                subStrandId: 'substrand-indig-g4-placeholder',
                order: 1,
                title: { en: 'Cultural Heritage Greetings', sw: 'Salamu za Utamaduni' },
                storyContext: {
                  en: 'Explore how different Kenyan communities greet elders with respect.',
                  sw: 'Tazama jinsi jamii mbalimbali za Kenya zinavyowasalimu wazee kwa heshima.'
                },
                characterName: 'Zawadi',
                characterAvatar: 'elephant',
                difficulty: 1,
                estimatedMinutes: 6,
                xpReward: 25,
                coinReward: 10,
                cbeCompetencies: ['Citizenship'],
                cbeValues: ['Respect'],
                prerequisiteQuestIds: [],
                sourceStatus: 'TODO: verify with KICD design',
                questions: [
                  {
                    id: 'q-indig-01-greeting',
                    subStrandId: 'substrand-indig-g4-placeholder',
                    type: 'MULTIPLE_CHOICE',
                    prompt: {
                      en: 'Respectful greetings to elders in all Kenyan cultures show which foundational value?',
                      sw: 'Kusalimu wazee kwa heshima katika tamaduni zote za Kenya kunaonyesha thamani gani ya msingi?'
                    },
                    difficulty: 1,
                    strandTag: 'INDIG-G4-CULTURE',
                    options: [
                      { id: 'opt-1', text: { en: 'Respect and humility (Heshima na unyenyekevu)', sw: 'Heshima na unyenyekevu' } },
                      { id: 'opt-2', text: { en: 'Boasting and pride (Kujigamba)', sw: 'Kujigamba' } },
                      { id: 'opt-3', text: { en: 'Anger (Hasira)', sw: 'Hasira' } }
                    ],
                    correctOptionId: 'opt-1',
                    explanation: {
                      en: 'Respect for parents and community elders is common to all 40+ ethnic traditions in Kenya.',
                      sw: 'Heshima kwa wazazi na wazee wa jamii ni nguzo kuu katika tamaduni zote nchini Kenya.'
                    },
                    socraticHint: {
                      en: 'Why do children say "Shikamoo" or bow slightly when greeting grandmothers?',
                      sw: 'Kwa nini watoto husalimu nyanya na babu kwa unyenyekevu?'
                    },
                    kenyanCulturalContext: 'Content is marked for further validation against approved KICD indigenous language designs.',
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

export const grade4Curriculum: CurriculumGrade = {
  id: 'grade-4',
  code: 'G4',
  name: { en: 'Grade 4', sw: 'Gredi ya 4' },
  band: 'UPPER_PRIMARY',
  description: {
    en: 'Upper Primary foundation covering Mathematics, Science, Languages, Social Studies, Agriculture, and Creative Arts.',
    sw: 'Gredi ya 4 ya shule ya msingi: Hisabati, Sayansi, Lugha, Jamii, Kilimo, na Sanaa za Ubunifu.'
  },
  order: 2,
  subjects: grade4Subjects
};
