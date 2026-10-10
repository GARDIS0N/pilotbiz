import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Kiswahili Lugha Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-kisw-u5',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Elimu ya Kifedha, Biashara, M-Pesa & Hali za Masharti (KI, NGE, NGALI)',
    description: 'Kujenga msamiati wa kibiashara, benki na huduma za pesa kwa njia ya simu (M-Pesa, akiba, bajeti, hisa); mazungumzo ya ununuzi na upatano wa bei sokoni; na kutawala hali za masharti ya uwezekano (KI na NGE) na masharti yasiyowezekana tena (NGALI) pamoja na ukanushaji wake.',
    cbeCompetency: 'Ufahamu wa shughuli za kiuchumi, nidhamu ya kifedha, na umilisi wa miundo ya masharti katika sentensi changamano',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g6-kisw-u6',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Usalama Barabarani, Usafiri wa SGR & Mnyambuliko wa Vitenzi',
    description: 'Kujifunza sheria za usalama barabarani (ishara za trafiki, kivukio cha watembea kwa miguu, mikanda ya usalama) na usafiri wa kisasa wa reli ya SGR (Madaraka Express); na kutawala kauli za mnyambuliko wa vitenzi (Kutenda, Kutendwa, Kutendea, Kutendesha, Kutendana, Kutendeka).',
    cbeCompetency: 'Ufahamu wa usalama wa usafiri, uzingatiaji wa sheria za trafiki, na umilisi wa mnyambuliko na kauli za vitenzi',
    estimatedMinutes: 30,
    order: 6
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 3 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-kisw-u5-l1',
    subStrandId: 'substrand-g6-kisw-u5',
    title: 'Ujasiriamali, Biashara ya Masoko na Pesa za Simu (M-Pesa)',
    content: 'Elimu ya kifedha na biashara huwezesha raia kukuza uchumi na kuboresha viwango vya maisha.\n\n1. Msamiati wa Kifedha na Biashara:\n- Bajeti (Budget): Mpango madhubuti wa kukadiria mapato na matumizi kwa kipindi maalum.\n- Akiba (Savings): Sehemu ya fedha inayowekwa kando kwa ajili ya mahitaji ya baadaye au dharura.\n- Ujasiriamali (Entrepreneurship): Ubunifu wa kuanzisha mradi au biashara ya kibiashara kwa kujituma.\n- Faida (Profit): Pesa ya ziada inayopatikana baada ya kutoa gharama zote za biashara.\n- Hasara (Loss): Hali ya kupoteza fedha wakati gharama zinapozidi mapato.\n- Risiti (Receipt) na Ankara (Invoice): Hati rasmi zinazothibitisha malipo na kumlinda mnunuzi.\n\n2. Usalama wa Pesa kwa Njia ya Simu (M-Pesa):\n- Usishiriki kamwe nambari yako ya siri (PIN) ya M-Pesa na mtu yeyote, hata wanaodai kuwa wafanyakazi wa kampuni ya mawasiliano.\n- Hakikisha unasoma jina kamili la mpokeaji kwenye skrini kabla ya kubofya kutuma pesa.\n- Kuwa mwangalifu na ujumbe wa udanganyifu unaodai kuwa umetumiwa pesa kimakosa na kutaka uzirudishe.\n\n3. Nahau za Kifedha na Masoko:\n- "Kupiga bei": Kujadiliana na kukubaliana kuhusu bei ya bidhaa sokoni.\n- "Kuvunja benki": Kutumia pesa zote zilizowekwa kama akiba.\n- "Kujikaza kisabuni": Kuvumilia magumu kwa matumaini ya kupata mafanikio.',
    didYouKnow: 'Kenya ndiyo nchi ya kwanza kabisa duniani kuanzisha na kutumia teknolojia ya kutuma pesa kupitia simu ya rununu (M-Pesa) mnamo mwaka wa 2007!',
    kenyanContext: 'Wafanyabiashara katika Soko Kuu la Kongowea mjini Mombasa hupokea malipo ya ununuzi wa maembe na samaki kupitia simu bila kuhitaji kubeba pesa taslimu mfukoni.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u5-l2',
    subStrandId: 'substrand-g6-kisw-u5',
    title: 'Hali za Masharti: KI, NGE na NGALI na Ukanushaji Wake',
    content: 'Sentensi za masharti huwa na vishazi viwili ambapo kishazi cha pili hufanyika tu ikiwa sharti lililopo katika kishazi cha kwanza litatimizwa.\n\n1. Sharti la "KI" (Sharti la Uwezekano):\n- Huonyesha tendo ambalo lina uwezekano kamili wa kutendeka.\n- Mfano: Mkulima akipanda kwa wakati, atavuna mazao tele.\n- Ukanushaji: Hutumia kiambishi "SIPO".\n  * Mfano: Mkulima asipopanda kwa wakati, hatavuna mazao tele.\n\n2. Sharti la "NGE" (Sharti Linalowezekana lakini Linalositasita Wakati Uliopo):\n- Huonyesha sharti la wakati uliopo ambalo lingali na nafasi ndogo ya kutimia.\n- Mfano: Ungelisoma kwa bidii, ungefaulu mtihani wako vizuri.\n- Ukanushaji: Hutumia kiambishi "SINGE".\n  * Mfano: Usingelisoma kwa bidii, usingefaulu mtihani wako vizuri.\n\n3. Sharti la "NGALI" (Sharti Lililopitwa na Wakati / Lisilowezekana Tena):\n- Huonyesha tendo la wakati uliopita ambalo halikutendeka na haliwezi tena kutimia kwa sababu fursa ilishapita.\n- Mfano: Angalifungua duka mapema, angalipata wateja wengi asubuhi.\n- Ukanushaji: Hutumia kiambishi "SINGALI".\n  * Mfano: Asingalifungua duka mapema, asingalipata wateja wengi asubuhi.\n\n4. Kanuni Kuu ya Uoanishaji wa Masharti:\n- NGE huandamana na NGE daima (Ukinunua ungepata ni KOSA! Usahihi: Ungenunua ungepata).\n- NGALI huandamana na NGALI daima (Angalikuja tungaliona).',
    didYouKnow: 'Huwezi kuchanganya kamwe viambishi vya masharti tofauti katika sentensi moja! Mfano: "Ukisoma ungalifaulu" ni kosa la kisarufi!',
    kenyanContext: 'Mwenyekiti wa chama cha ushirika cha chai huko Kericho alisema: "Wakulima wangaliwekeza mapema, wangalipata bonasi kubwa zaidi mwaka huu."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u6-l1',
    subStrandId: 'substrand-g6-kisw-u6',
    title: 'Usalama Barabarani, Sheria za Trafiki na Usafiri wa SGR',
    content: 'Usalama barabarani ni jukumu la kila mtumiaji wa barabara ili kulinda maisha na kuzuia ajali.\n\n1. Sheria Muhimu za Usalama Barabarani:\n- Kivukio cha pundamilia (Zebra crossing): Eneo lenye mistari myeupe na myeusi barabarani ambapo watembea kwa miguu hupewa kipaumbele cha kuvuka.\n- Taa za ishara za trafiki:\n  * Taa Nyekundu: Simama mara moja.\n  * Taa ya Manjano / Kahawia: Jitayarishe kusimama au kuondoka.\n  * Taa ya Kijani: Ruhusa ya kuendelea mbele kwa usalama.\n- Mkanda wa usalama (Seatbelt): Huzuia abiria asitupwe mbele gari linaposimama ghafla au kugongana.\n- Kofia ngumu (Helmet): Hukinga kichwa cha mpanda pikipiki (bodaboda).\n\n2. Usafiri wa Kisasa wa Reli ya SGR (Madaraka Express):\n- Treni ya kisasa inayounganisha Mombasa na miji mingine kama Nairobi na Naivasha.\n- Usafiri wa treni ni wa haraka, nafuu, wenye starehe na hupunguza msongamano wa magari na ajali kwenye barabara kuu.\n\n3. Watu Wanaoongoza Vyombo vya Usafiri:\n- Dereva (Driver): Huendesha gari, basi au lori.\n- Nahodha (Captain): Huongoza meli au merikebu baharini.\n- Rubani (Pilot): Hupeperusha ndege angani.\n- Mhandisi wa treni: Huendesha treni ya reli.',
    didYouKnow: 'Daraja maalum za wavukao kwa miguu (footbridges) kando ya barabara kuu kama Thika Road hujengwa ili kuzuia watoto na watu wazima wasigongwe na magari yanayotembea kwa kasi!',
    kenyanContext: 'Kwenye Kituo Kikuu cha Reli ya SGR cha Syokimau jijini Nairobi, abiria hupimwa mizigo yao kwa mitambo ya kielektroniki kabla ya kupanda treni ya Madaraka Express.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u6-l2',
    subStrandId: 'substrand-g6-kisw-u6',
    title: 'Mnyambuliko wa Vitenzi: Kauli za Kutenda, Kutendwa, Kutendea, Kutendesha na Kutendana',
    content: 'Mnyambuliko wa vitenzi ni mchakato wa kuongeza viambishi tamati kwenye mzizi wa kitenzi ili kuunda kauli zenye maana mpya.\n\n1. Kauli ya Kutenda (Mzizi wa Kiasili):\n- Mfano: lima, soma, andika, pika, cheza, funga.\n\n2. Kauli ya Kutendwa (Passive - kitendo kinapokelewa):\n- Huongezwa kiambishi -w- au -ew- / -iw-.\n- Mfano: limwa, somwa, andikwa, pikwa, chezwa, fungwa.\n\n3. Kauli ya Kutendea (Applicative - kutenda kwa ajili ya mtu au kwa kifaa):\n- Huongezwa kiambishi -e- au -i-.\n- Mfano: limia, somea, andikia, pikia, chezea, fungia.\n- Sentensi: Amani alimwandikia rafiki yake barua nzuri.\n\n4. Kauli ya Kutendesha (Causative - kusababisha mwingine afanye kitendo):\n- Huongezwa viambishi kama vile -sh-, -z-, -esh-, -ish-.\n- Mfano: limisha, somesha, andikisha, pikisha.\n- Mifano ya kipekee: kula -> lisha; lala -> laza; ogopa -> ogofya; ona -> onyesha.\n\n5. Kauli ya Kutendana (Reciprocal - kutendeana wao kwa wao):\n- Huongezwa kiambishi -an-.\n- Mfano: saidiana, pendana, pigana, heshimiana, fahamiana.\n\n6. Kauli ya Kutendeka (Stative - uwezekano wa tendo kutendeka):\n- Huongezwa kiambishi -ek- au -ik-.\n- Mfano: vunjika, haribika, fanyika, someka.',
    didYouKnow: 'Kitenzi "kula" kinaponyambuliwa katika kauli ya kutendesha huwa "lisha", na kitenzi "kufa" huwa "fisha"!',
    kenyanContext: 'Katika shule nyingi za Kenya, wanafunzi hufundishwa: "Wanafunzi watiifu husaidiana masomoni badala ya kubaguana," ikionyesha kauli ya kutendana.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(les => {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
});

// 3. Batch 3 Missions (Orders 150 to 153)
const missionsToAdd = [
  {
    id: 'mission-g6-kisw-u5-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 150: Soko la Kongowea – Biashara na Pesa za Simu',
    description: 'Tambua msamiati wa benki, ujasiriamali, risiti, M-Pesa, na nahau za kupatana bei sokoni.',
    order: 150,
    orderIndex: 150,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-fedha',
    badge: 'badge-g6-kisw-fedha',
    lessonId: 'lesson-g6-kisw-u5-l1',
    questionIds: [
      'q-g6-kisw-u5-001', 'q-g6-kisw-u5-002', 'q-g6-kisw-u5-003', 'q-g6-kisw-u5-004',
      'q-g6-kisw-u5-005', 'q-g6-kisw-u5-006', 'q-g6-kisw-u5-007', 'q-g6-kisw-u5-008',
      'q-g6-kisw-u5-009', 'q-g6-kisw-u5-010', 'q-g6-kisw-u5-011', 'q-g6-kisw-u5-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u5-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 151: Milango ya Masharti – KI, NGE na NGALI',
    description: 'Bobea katika miundo na ukanushaji wa masharti ya uwezekano (KI/SIPO), NGE/SINGE, na NGALI/SINGALI.',
    order: 151,
    orderIndex: 151,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-masharti',
    badge: 'badge-g6-kisw-masharti',
    lessonId: 'lesson-g6-kisw-u5-l2',
    questionIds: [
      'q-g6-kisw-u5-013', 'q-g6-kisw-u5-014', 'q-g6-kisw-u5-015', 'q-g6-kisw-u5-016',
      'q-g6-kisw-u5-017', 'q-g6-kisw-u5-018', 'q-g6-kisw-u5-019', 'q-g6-kisw-u5-020',
      'q-g6-kisw-u5-021', 'q-g6-kisw-u5-022', 'q-g6-kisw-u5-023', 'q-g6-kisw-u5-024'
    ]
  },
  {
    id: 'mission-g6-kisw-u6-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 152: Mwendo wa Madaraka – Usalama Barabarani na SGR',
    description: 'Tambua sheria za trafiki, kivukio cha pundamilia, usafiri wa reli ya SGR, na msamiati wa waongozaji vyombo.',
    order: 152,
    orderIndex: 152,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-usalama-barabara',
    badge: 'badge-g6-kisw-usalama-barabara',
    lessonId: 'lesson-g6-kisw-u6-l1',
    questionIds: [
      'q-g6-kisw-u6-001', 'q-g6-kisw-u6-002', 'q-g6-kisw-u6-003', 'q-g6-kisw-u6-004',
      'q-g6-kisw-u6-005', 'q-g6-kisw-u6-006', 'q-g6-kisw-u6-007', 'q-g6-kisw-u6-008',
      'q-g6-kisw-u6-009', 'q-g6-kisw-u6-010', 'q-g6-kisw-u6-011', 'q-g6-kisw-u6-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u6-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 153: Kauli za Vitendo – Mnyambuliko wa Vitenzi',
    description: 'Bobea katika mnyambuliko wa kauli za vitenzi: kutenda, kutendwa, kutendea, kutendesha, kutendana, na kutendeka.',
    order: 153,
    orderIndex: 153,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-mnyambuliko',
    badge: 'badge-g6-kisw-mnyambuliko',
    lessonId: 'lesson-g6-kisw-u6-l2',
    questionIds: [
      'q-g6-kisw-u6-013', 'q-g6-kisw-u6-014', 'q-g6-kisw-u6-015', 'q-g6-kisw-u6-016',
      'q-g6-kisw-u6-017', 'q-g6-kisw-u6-018', 'q-g6-kisw-u6-019', 'q-g6-kisw-u6-020',
      'q-g6-kisw-u6-021', 'q-g6-kisw-u6-022', 'q-g6-kisw-u6-023', 'q-g6-kisw-u6-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Questions for Units 5 & 6 (48 questions: 24 for Unit 5, 24 for Unit 6)
const questionsToAdd = [
  // ==========================================
  // Unit 5 Lesson 1: Elimu ya Kifedha & M-Pesa (q-g6-kisw-u5-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u5-001',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Mpango uliopangwa kwa makini wa kukadiria mapato na matumizi ya fedha kwa kipindi maalum huitwaje?',
    options: [
      'Bajeti',
      'Ankara tu',
      'Mkataba',
      'Risiti'
    ],
    correctAnswer: 'Bajeti',
    explanation: '"Bajeti" (budget) ni makadirio ya mapato yanayotarajiwa dhidi ya matumizi yaliyopangwa ili kuepuka madeni na matumizi mabaya ya fedha.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno gani lenye maana ya mpango wa mapato na matumizi ya fedha?'
  },
  {
    id: 'q-g6-kisw-u5-002',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Hati rasmi anayopewa mnunuzi dukani inayothibitisha kuwa amelipa na kupokea bidhaa inaitwaje?',
    options: [
      'Risiti',
      'Barua pepe',
      'Tiketi ya basi',
      'Cheti cha kuzaliwa'
    ],
    correctAnswer: 'Risiti',
    explanation: 'Risiti (receipt) ni stakabadhi rasmi inayotolewa na muuzaji kumthibitishia mnunuzi kuwa amefanya malipo kamili ya bidhaa au huduma.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Unaponunua kitabu au unga dukani, unapewa karatasi gani kuthibitisha umelipa?'
  },
  {
    id: 'q-g6-kisw-u5-003',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Mtu anapoweka sehemu ya fedha anazopata kando kwa ajili ya mahitaji ya baadaye au dharura anafanya nini?',
    options: [
      'Kuweka akiba',
      'Kupata hasara',
      'Kufuja mali',
      'Kupiga bei'
    ],
    correctAnswer: 'Kuweka akiba',
    explanation: 'Kuweka akiba (saving) ni tabia ya kutenga sehemu ya kipato kwa matumizi ya baadaye badala ya kutumia pesa yote mara moja.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni tendo gani la kuweka pesa kando benki au kwenye kibubu kwa matumizi ya kesho?'
  },
  {
    id: 'q-g6-kisw-u5-004',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Ni hatua ipi iliyo salama zaidi wakati wa kutuma fedha kupitia huduma ya simu kama M-Pesa?',
    options: [
      'Kuhakikisha unasoma na kuthibitisha jina kamili la mpokeaji kabla ya kuweka nambari ya siri',
      'Kumwambia kila mtu aliyepo dukani nambari yako ya siri kwa sauti',
      'Kutuma pesa mara moja bila kuangalia nambari ya simu',
      'Kutuma pesa kwa nambari yoyote inayotuma ujumbe wa bahati nasibu'
    ],
    correctAnswer: 'Kuhakikisha unasoma na kuthibitisha jina kamili la mpokeaji kabla ya kuweka nambari ya siri',
    explanation: 'Kuthibitisha jina la mpokeaji kwenye skrini ya simu kabla ya kuweka PIN huzuia kutuma fedha kwa nambari isiyo sahihi.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Simu inapoleta ujumbe unaoonyesha jina la mpokeaji, unafaa kufanya nini kabla ya kuweka PIN?'
  },
  {
    id: 'q-g6-kisw-u5-005',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Nahau "kupiga bei" ina maana gani kati ya mnunuzi na muuzaji sokoni?',
    options: [
      'Kujadiliana na kupatana kuhusu kiasi cha fedha cha kulipia bidhaa',
      'Kugonganisha bei ukutani ili ipungue',
      'Kukataa kabisa kununua bidhaa yoyote',
      'Kumpiga muuzaji makofi kwa sababu ya bei ya juu'
    ],
    correctAnswer: 'Kujadiliana na kupatana kuhusu kiasi cha fedha cha kulipia bidhaa',
    explanation: '"Kupiga bei" (bargaining/negotiating) ni mazungumzo ya kirafiki ya kibiashara ambapo mnunuzi anaomba punguzo la bei na muuzaji anafikiria kiwango stahiki.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mnunuzi na muuzaji wanapozungumza ili kurekebisha bei ifae pande zote mbili, wanafanya nini?'
  },
  {
    id: 'q-g6-kisw-u5-006',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Mfanyabiashara anapouza bidhaa zake kwa bei ya juu kuliko gharama alizotumia kununulia, anapata nini?',
    options: [
      'Faida',
      'Hasara',
      'Deni',
      'Faini'
    ],
    correctAnswer: 'Faida',
    explanation: 'Faida (profit) ni kiasi cha fedha kinachobaki baada ya kutoa gharama zote za ununuzi na uzalishaji.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tofauti chanya kati ya bei ya kuuzia na bei ya ununuzi inaitwaje katika biashara?'
  },
  {
    id: 'q-g6-kisw-u5-007',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Neno "ujasiriamali" linamaanisha nini katika jamii ya kisasa?',
    options: [
      'Ubunifu na ujasiri wa kuanzisha mradi au biashara ya kuzalisha kipato',
      'Uwezo wa kupigana vita bila kuogopa',
      'Kuazima fedha nyingi benki bila nia ya kuzilipa',
      'Kufanya kazi serikalini hadi kustaafu'
    ],
    correctAnswer: 'Ubunifu na ujasiri wa kuanzisha mradi au biashara ya kuzalisha kipato',
    explanation: 'Ujasiriamali (entrepreneurship) ni sifa ya kuanzisha, kubuni, na kuendesha biashara mpya kwa kujituma na kukabili changamoto za kibiashara.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu anapobuni mradi mpya wa kibiashara na kuusimamia kizalendo anaitwa nani?'
  },
  {
    id: 'q-g6-kisw-u5-008',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Methali: "Akiba haiozi." Inatoa funzo gani kwa watoto wa shule?',
    options: [
      'Fedha au rasilimali zilizowekwa kando zitasaidia sana wakati wa shida za baadaye',
      'Chakula kilichowekwa kabatini hakina haja ya kupashwa moto',
      'Huna haja ya kutumia fedha yoyote hata ukiwa na njaa',
      'Ni heri kumaliza fedha zote leo kuliko kuziweka'
    ],
    correctAnswer: 'Fedha au rasilimali zilizowekwa kando zitasaidia sana wakati wa shida za baadaye',
    explanation: '"Akiba haiozi" inafundisha kuwa chochote unachoweka kando kwa nidhamu kitabaki na thamani yake na kukuokoa katika dharura.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Akiba inakuokoaje wakati dharura au shida ya ghafla inapotokea?'
  },
  {
    id: 'q-g6-kisw-u5-009',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Mtu anapopokea ujumbe kwenye simu akidai: "Tafadhali nirudishie pesa nilizotuma kwako kimakosa," jambo sahihi la kufanya kabla ya kuchukua hatua yoyote ni lipi?',
    options: [
      'Kukagua salio lake rasmi la M-Pesa na kuthibitisha na mtoa huduma kama kweli kuna pesa zilizopokelewa',
      'Kutuma pesa zake zote haraka kwa nambari hiyo bila kuangalia',
      'Kuzima simu na kuitupa kwenye maji',
      'Kumtusi mtu aliyetuma ujumbe huo'
    ],
    correctAnswer: 'Kukagua salio lake rasmi la M-Pesa na kuthibitisha na mtoa huduma kama kweli kuna pesa zilizopokelewa',
    explanation: 'Matapeli wengi hutuma jumbe bandia za uongo wakidai wametuma pesa kimakosa. Ni lazima ukague salio lako rasmi la M-Pesa kwanza.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kabla ya kuamini ujumbe wa mtu, je, unafaa kukagua salio lako la kweli la akaunti?'
  },
  {
    id: 'q-g6-kisw-u5-010',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Tofauti kati ya "risiti" na "ankara" katika shughuli za kibiashara ni ipi?',
    options: [
      'Ankara huonyesha orodha ya bidhaa na madai ya malipo kabla ya kulipa, ilhali risiti hutolewa baada ya malipo kufanyika',
      'Ankara hutolewa hospitalini pekee na risiti hutolewa sokoni',
      'Hakuna tofauti yoyote; maneno yote mawili yanamaanisha cheti cha shule',
      'Risiti hutolewa na benki kuu pekee'
    ],
    correctAnswer: 'Ankara huonyesha orodha ya bidhaa na madai ya malipo kabla ya kulipa, ilhali risiti hutolewa baada ya malipo kufanyika',
    explanation: 'Ankara (invoice) ni hati ya madai ya malipo inayotolewa kabla ya kulipa, wakati risiti (receipt) ni uthibitisho wa malipo yaliyokwishafanyika.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kati ya invoice (ankara) na receipt (risiti), kipi kinachotolewa kabla ya kulipwa na kipi baada ya kulipwa?'
  },
  {
    id: 'q-g6-kisw-u5-011',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Ni nahau ipi kati ya hizi yenye maana ya "kutumia fedha ovyoovyo bila mpango wala hadhari"?',
    options: [
      'Kufuja mali',
      'Kuweka hazina',
      'Kushika tamaa',
      'Kupiga mbizi'
    ],
    correctAnswer: 'Kufuja mali',
    explanation: '"Kufuja mali" inamaanisha kutumia fedha na rasilimali kwa ubadhirifu na uharibifu bila faida yoyote.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni nahau ipi inayomaanisha ubadhirifu wa kuharibu na kutapanya mali?'
  },
  {
    id: 'q-g6-kisw-u5-012',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l1',
    text: 'Katika uchumi wa Kenya, chama cha wananchi kinachowasaidia kuweka akiba na kukopana fedha kwa riba nafuu huitwaje?',
    options: [
      'Chama cha Ushirika (Sacco)',
      'Shirika la Mazingira',
      'Mahakama ya Rufaa',
      'Klabu ya Michezo ya Shule'
    ],
    correctAnswer: 'Chama cha Ushirika (Sacco)',
    explanation: 'Chama cha Ushirika wa Akiba na Mikopo (Savings and Credit Cooperative Society - SACCO) huwezesha wanachama kuweka akiba na kupata mikopo yenye masharti nafuu.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wafanyabiashara na wakulima wa Kenya hujiunga na vyama vipi vya ushirika wa kifedha (SACCO)?'
  },

  // ==========================================
  // Unit 5 Lesson 2: Hali za Masharti (q-g6-kisw-u5-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u5-013',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Kiambishi cha sharti la uwezekano katika sentensi: "Mvua ikinyesha, tutapanda mbegu" ni kipi?',
    options: [
      '-KI-',
      '-NGE-',
      '-NGALI-',
      '-LI-'
    ],
    correctAnswer: '-KI-',
    explanation: 'Kiambishi "-ki-" hutumika kuonyesha sharti la uwezekano (ikinyesha, akija, ukisoma).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama neno "ikinyesha" - ni herufi zipi zinazoonyesha "ikiwa itanyesha"?'
  },
  {
    id: 'q-g6-kisw-u5-014',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Sharti la "KI" linapokanushwa hubadilika na kuchukua kiambishi gani?',
    options: [
      '-SIPO- (k.m. Ukisoma -> Usiposoma)',
      '-SINGE- (k.m. Ukisoma -> Usingesoma)',
      '-KU- (k.m. Ukisoma -> Hukusoma)',
      '-JA- (k.m. Ukisoma -> Hajasoma)'
    ],
    correctAnswer: '-SIPO- (k.m. Ukisoma -> Usiposoma)',
    explanation: 'Sharti la "KI" hukanushwa kwa kiambishi "SIPO" (Ukija -> Usipokuja; Akifanya -> Asipofanya).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno "Akija" likikanushwa kama sharti huwa "A...kuja"? Ni kiambishi gani cha kukanusha?'
  },
  {
    id: 'q-g6-kisw-u5-015',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Ni sentensi ipi inayoonyesha sharti la NGE lililotumiwa kwa usahihi katika vishazi vyote viwili?',
    options: [
      'Angelisoma kwa bidii, angefaulu mtihani wake.',
      'Akisoma kwa bidii, angefaulu mtihani wake.',
      'Angalisoma kwa bidii, angefaulu mtihani wake.',
      'Angesoma kwa bidii, atafaulu mtihani wake.'
    ],
    correctAnswer: 'Angelisoma kwa bidii, angefaulu mtihani wake.',
    explanation: 'Kanuni ya uoanishaji wa masharti inataka NGE ioanishwe na NGE katika vishazi vyote viwili: "Angelisoma..., angefaulu...".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Sharti la NGE lazima liambatane na kiambishi gani katika kishazi cha pili?'
  },
  {
    id: 'q-g6-kisw-u5-016',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Sharti la "NGALI" huonyesha nini katika sentensi?',
    options: [
      'Sharti la wakati uliopita ambalo halikutimizwa na nafasi yake imeshapita kabisa',
      'Sharti linalotimizwa mara kwa mara kila asubuhi',
      'Amri ya moja kwa moja ya kumfokea mtu',
      'Sharti litakalotimizwa miaka mia moja ijayo'
    ],
    correctAnswer: 'Sharti la wakati uliopita ambalo halikutimizwa na nafasi yake imeshapita kabisa',
    explanation: 'Sharti la NGALI (k.m. Angalifanya bidii, angalipata) huonyesha tendo lililopita ambalo haliwezi tena kubadilishwa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, tendo la sharti la NGALI bado linaweza kutimizwa sasa, au nafasi yake ya wakati uliopita ilishatoweka?'
  },
  {
    id: 'q-g6-kisw-u5-017',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Kanusha sentensi ifuatayo ya sharti la KI: "Mwanafunzi akifanya mazoezi ya kutosha, atashinda mbio."',
    options: [
      'Mwanafunzi asipofanya mazoezi ya kutosha, hatashinda mbio.',
      'Mwanafunzi hakufanya mazoezi ya kutosha, hakushinda mbio.',
      'Mwanafunzi asinge fanya mazoezi ya kutosha, asingeshinda mbio.',
      'Mwanafunzi hajafanya mazoezi ya kutosha, hajashinda mbio.'
    ],
    correctAnswer: 'Mwanafunzi asipofanya mazoezi ya kutosha, hatashinda mbio.',
    explanation: 'Ukanusho wa "akifanya" ni "asipofanya" (-sipo-), na "atashinda" unakuwa "hatashinda".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kumbuka kuwa kiambishi cha kukanusha sharti la "-ki-" ni "-sipo-".'
  },
  {
    id: 'q-g6-kisw-u5-018',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Sharti la "NGE" linapokanushwa huchukua kiambishi gani?',
    options: [
      '-SINGE- (k.m. Ungesoma -> Usingesoma)',
      '-SIPO- (k.m. Ungesoma -> Usiposoma)',
      '-SINGALI- (k.m. Ungesoma -> Usingalisoma)',
      '-HAKU- (k.m. Ungesoma -> Hukusoma)'
    ],
    correctAnswer: '-SINGE- (k.m. Ungesoma -> Usingesoma)',
    explanation: 'Sharti la NGE hukanushwa kwa kiambishi "SINGE": "Angesoma" -> "Asingesoma".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama neno "nge" - likitiwa kiambishi kikanushi cha ndani "si", linakuwa nini?'
  },
  {
    id: 'q-g6-kisw-u5-019',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Kamilisha sentensi kwa kiambishi sahihi cha sharti la NGALI: "Mkulima __________ mapema, angalipata soko nzuri."',
    options: [
      'angalivuna',
      'angevuna',
      'akivuna',
      'alipovuna'
    ],
    correctAnswer: 'angalivuna',
    explanation: 'Kishazi kikuu kikiwa na "angalipata" (NGALI), kishazi tegemezi lazima kichukue "angalivuna" (NGALI).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kishazi cha pili kina "angalipata". Kishazi cha kwanza kinapaswa kuoanishwa na kiambishi kipi?'
  },
  {
    id: 'q-g6-kisw-u5-020',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Kanusha sentensi ya sharti la NGALI: "Tungalionana naye, tungalimweleza ukweli."',
    options: [
      'Tusingalionana naye, tusingalimweleza ukweli.',
      'Hatukuonana naye, hatukumweleza ukweli.',
      'Tusingeonana naye, tusingemweleza ukweli.',
      'Tusipoonana naye, hatutamweleza ukweli.'
    ],
    correctAnswer: 'Tusingalionana naye, tusingalimweleza ukweli.',
    explanation: 'Sharti la NGALI hukanushwa kwa kiambishi "SINGALI": "Tungalionana" -> "Tusingalionana".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Sharti la NGALI likikanushwa huingiza kiambishi "si-" mbele ya "ngali".'
  },
  {
    id: 'q-g6-kisw-u5-021',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Bainisha kosa la kisarufi katika sentensi hii: "Mvua ikinyesha kwa wingi, wakulima wangalifurahi sana."',
    options: [
      'Sharti la KI limechanganywa kimakosa na sharti la NGALI',
      'Neno "mvua" limo katika ngeli isiyo sahihi',
      'Kivumishi "kwa wingi" kimeandikwa vibaya',
      'Hakuna kosa lolote katika sentensi hiyo'
    ],
    correctAnswer: 'Sharti la KI limechanganywa kimakosa na sharti la NGALI',
    explanation: 'Hili ni kosa la kutoanisha masharti: sharti la uwezekano (KI) haliwezi kuunganishwa na NGALI. Ilipaswa kuwa: "Mvua ikinyesha..., wakulima watafurahi..." au "Mvua ingalinyesha..., wangalifurahi...".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, inakubalika kuchanganya kiambishi "iki-" na "wangali-" katika sentensi moja?'
  },
  {
    id: 'q-g6-kisw-u5-022',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Tofauti ya kimaana kati ya sentensi (a) na (b) ni ipi?\n(a) "Ukinipigia simu, nitakujibu."\n(b) "Ungalinipigia simu, ningalikujibu."',
    options: [
      'Sentensi (a) inaonyesha tendo linalowezekana wakati ujao, ilhali (b) inaonyesha tendo lililopita ambalo halikufanyika',
      'Sentensi zote mbili zina maana sawa kabisa bila tofauti yoyote',
      'Sentensi (a) iko wakati uliopita na (b) iko wakati ujao',
      'Sentensi (b) ni amri na (a) ni ombi'
    ],
    correctAnswer: 'Sentensi (a) inaonyesha tendo linalowezekana wakati ujao, ilhali (b) inaonyesha tendo lililopita ambalo halikufanyika',
    explanation: 'Sharti la KI (a) ni sharti la uwezekano wa baadaye; sharti la NGALI (b) ni sharti la zamani lililopitwa na wakati (hukunipigia na sasa haiwezekani tena).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, sentensi ya (b) inamaanisha simu ilipigwa zamani au hakupiga na fursa ilishapita?'
  },
  {
    id: 'q-g6-kisw-u5-023',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Badilisha sentensi ifuatayo kutoka sharti la KI hadi sharti la NGE:\n"Ukifungua akaunti ya benki, utapata mikopo nafuu."',
    options: [
      'Ungefungua akaunti ya benki, ungepata mikopo nafuu.',
      'Ungalifungua akaunti ya benki, ungalipata mikopo nafuu.',
      'Usipofungua akaunti ya benki, hutapata mikopo nafuu.',
      'Ulifungua akaunti ya benki, ulipata mikopo nafuu.'
    ],
    correctAnswer: 'Ungefungua akaunti ya benki, ungepata mikopo nafuu.',
    explanation: 'Ili kuhamia sharti la NGE, viambishi vya vishazi vyote viwili hubadilika kuwa "-nge-": "Ungefungua..., ungepata...".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Badilisha "uki-" na "uta-" zote zikawa na kiambishi "-nge-".'
  },
  {
    id: 'q-g6-kisw-u5-024',
    subStrandId: 'substrand-g6-kisw-u5',
    lessonId: 'lesson-g6-kisw-u5-l2',
    text: 'Sentensi: "Asingalichelewa stesheni ya treni, asingalipoteza safari yake." Inathibitisha uhalisia upi uliotokea?',
    options: [
      'Alichelewa stesheni ya treni na akapoteza safari yake kweli',
      'Hakuchelewa stesheni ya treni na alisafiri salama',
      'Treni ilichelewa kumngojea afike',
      'Alikataa kusafiri kwa sababu hakutaka'
    ],
    correctAnswer: 'Alichelewa stesheni ya treni na akapoteza safari yake kweli',
    explanation: 'Ukanusho wa sharti la NGALI (Asingalichelewa..., asingalipoteza...) unathibitisha kinyume cha kauli, yaani mtu huyo alichelewa na kwa hakika alipoteza safari yake.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu akisema "Laiti nisingalichelewa nisingalikosa", je, ukweli ni kwamba alichelewa na akakosa?'
  },

  // ==========================================
  // Unit 6 Lesson 1: Usalama Barabarani & SGR (q-g6-kisw-u6-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u6-001',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Sehemu ya barabara iliyochorwa mistari myeupe na myeusi inayowapa watembea kwa miguu haki ya kuvuka salama huitwaje?',
    options: [
      'Kivukio cha pundamilia',
      'Mzunguko wa barabara',
      'Mtaro wa maji machafu',
      'Daraja la reli'
    ],
    correctAnswer: 'Kivukio cha pundamilia',
    explanation: 'Kivukio cha pundamilia (zebra crossing) hufananishwa na milia ya pundamilia na ni eneo maalum la watembea kwa miguu kuvuka barabara.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kivukio kipi kilichopewa jina la mnyama mwenye milia myeupe na myeusi?'
  },
  {
    id: 'q-g6-kisw-u6-002',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Taa nyekundu ya ishara ya trafiki inapowaka barabarani, inatoa agizo gani kwa madereva na waendesha pikipiki?',
    options: [
      'Simama mara moja',
      'Endesha gari kwa kasi zaidi',
      'Piga honi kwa nguvu',
      'Geuka urudi nyuma'
    ],
    correctAnswer: 'Simama mara moja',
    explanation: 'Katika sheria za trafiki ulimwenguni kote, taa nyekundu inamaanisha kusimama kabisa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Rangi nyekundu kwenye taa za kuongoza magari inamaanisha nini?'
  },
  {
    id: 'q-g6-kisw-u6-003',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Kifaa anachopaswa kufunga abiria akiwa ndani ya gari ili kumkinga asitupwe mbele wakati wa ajali kinaitwaje?',
    options: [
      'Mkanda wa usalama',
      'Kamba ya viatu',
      'Mshipi wa suruali',
      'Kitanzi cha dharura'
    ],
    correctAnswer: 'Mkanda wa usalama',
    explanation: 'Mkanda wa usalama (seatbelt) hulinda abiria na dereva dhidi ya kuumia au kurushwa mbele gari linapopata mshtuko au ajali.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mkanda gani uliopo kwenye viti vya magari unaofungwa kifuani kwa usalama?'
  },
  {
    id: 'q-g6-kisw-u6-004',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Mtu anayeongoza na kupeperusha ndege angani huitwaje katika Kiswahili sanifu?',
    options: [
      'Rubani',
      'Nahodha',
      'Dereva',
      'Mhandisi wa meli'
    ],
    correctAnswer: 'Rubani',
    explanation: '"Rubani" (pilot) ni mtaalamu anayeongoza ndege angani, ilhali "nahodha" huongoza meli.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mwendeshaji wa eropleni au ndege ya angani anaitwaje?'
  },
  {
    id: 'q-g6-kisw-u6-005',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Taa ya trafiki ya rangi ya kijani inapowaka, inamaanisha nini kwa watumiaji wa barabara?',
    options: [
      'Ruhusa ya kuendelea mbele kwa usalama',
      'Simama gari mara moja',
      'Kuzima injini ya gari',
      'Kupunguza hewa kwenye matairi'
    ],
    correctAnswer: 'Ruhusa ya kuendelea mbele kwa usalama',
    explanation: 'Taa ya kijani huashiria kuwa njia iko wazi na inaruhusu vyombo vya moto kuendelea mbele.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Taa ya kijani inamaanisha "nenda" au "simama"?'
  },
  {
    id: 'q-g6-kisw-u6-006',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Kofia ngumu (helmet) huvaliwa na waendesha pikipiki na baiskeli kwa dhumuni gani kuu?',
    options: [
      'Kukinga kichwa kisipate majeraha mabaya ya fuvu mtu anapoanguka',
      'Kuzuia upepo usivuruge nywele tu',
      'Kufanya mpanda pikipiki aonekane mtanashati',
      'Kuficha sura yake asijulikane na marafiki zake'
    ],
    correctAnswer: 'Kukinga kichwa kisipate majeraha mabaya ya fuvu mtu anapoanguka',
    explanation: 'Kofia ngumu (helmet) hupunguza kwa kiasi kikubwa majeraha ya ubongo na fuvu wakati wa ajali za pikipiki na baiskeli.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kichwa ni sehemu nyeti sana ya mwili. Kofia ngumu inalinda nini ajali inapotokea?'
  },
  {
    id: 'q-g6-kisw-u6-007',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Ni faida ipi kubwa ya reli ya kisasa ya SGR (Madaraka Express) kwa uchumi na usalama wa taifa la Kenya?',
    options: [
      'Inasafirisha abiria na mizigo mikubwa kwa haraka na usalama na kupunguza msongamano barabarani',
      'Inasafiri angani kama ndege za abiria',
      'Inaondoa haja ya wananchi kutembea kwa miguu kijijini',
      'Inasafirisha magari ya kibinafsi bila nauli yoyote'
    ],
    correctAnswer: 'Inasafirisha abiria na mizigo mikubwa kwa haraka na usalama na kupunguza msongamano barabarani',
    explanation: 'SGR husafirisha maelfu ya abiria na tani nyingi za mizigo kwa uhakika na haraka, na kuondoa malori mengi barabarani na hivyo kupunguza ajali.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Treni ya SGR inapobeba tani nyingi za mizigo kutoka bandari ya Mombasa, inasaidiaje barabara zetu?'
  },
  {
    id: 'q-g6-kisw-u6-008',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Methali: "Harakaharaka haina baraka." Inawapa madereva onyo gani barabarani?',
    options: [
      'Kuendesha magari kwa kasi ya kupita kiasi huleta maafa na ajali mbaya',
      'Kila gari linapaswa kusimama barabarani bila kuondoka',
      'Magari yanayokwenda polepole hayafiki mwisho wa safari',
      'Barabara kuu hazifai kuwa na magari yanayotembea'
    ],
    correctAnswer: 'Kuendesha magari kwa kasi ya kupita kiasi huleta maafa na ajali mbaya',
    explanation: 'Methali hii inawaasa madereva kutokimbiza magari kwa fujo kwa sababu mwendo wa kasi usio na udhibiti ndicho chanzo kikuu cha ajali nchini.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kukimbiza gari kwa pupa na kasi kunasababisha nini barabarani?'
  },
  {
    id: 'q-g6-kisw-u6-009',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Mtu anayeongoza chombo cha majini kama vile meli au feri huitwaje katika lugha sanifu?',
    options: [
      'Nahodha',
      'Rubani',
      'Utingo',
      'Mzegazega'
    ],
    correctAnswer: 'Nahodha',
    explanation: '"Nahodha" (captain) ni mtaalamu anayeongoza vyombo vya majini (meli, mashua, ngalawa, majahazi).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi la Kiswahili lenye maana ya kiongozi mkuu wa meli baharini?'
  },
  {
    id: 'q-g6-kisw-u6-010',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Wanafunzi wanapotaka kuvuka barabara kuu yenye shughuli nyingi ambapo hakuna taa za trafiki wala askari, wanapaswa kufuata kanuni ipi?',
    options: [
      'Kutazama kulia, kisha kushoto, kisha kulia tena, na kuvuka tu wakati barabara inapokuwa haina gari linalokaribia',
      'Kufumba macho na kukimbia mbio kuvuka upande wa pili',
      'Kuwapungia madereva mikono huku wakitembea katikati ya barabara',
      'Kuvuka nyuma ya lori kubwa linalorudi nyuma'
    ],
    correctAnswer: 'Kutazama kulia, kisha kushoto, kisha kulia tena, na kuvuka tu wakati barabara inapokuwa haina gari linalokaribia',
    explanation: 'Hii ndiyo kanuni kuu ya usalama ya mtembea kwa miguu (Kulia, Kushoto, Kulia tena) kabla ya kuvuka barabara kwa utulivu bila kukimbia.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, unatazama pande zipi kabla ya kuvuka barabara kwa usalama?'
  },
  {
    id: 'q-g6-kisw-u6-011',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Msaidizi wa dereva katika basi au matatu anayesaidia kutoza nauli na kuongoza abiria huitwa "utingo". Kisawe chake kingine ni kipi?',
    options: [
      'Taniboi',
      'Mwelekezi wa meli',
      'Kondakta pekee bila jingine',
      'Dereva msaidizi'
    ],
    correctAnswer: 'Taniboi',
    explanation: '"Taniboi" na "utingo" ni maneno visawe yanayomaanisha msaidizi wa dereva wa gari la abiria au mizigo.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi linalotokana na neno la Kiingereza "turnboy" linalotumiwa kama kisawe cha utingo?'
  },
  {
    id: 'q-g6-kisw-u6-012',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l1',
    text: 'Reli ya SGR ilipojengwa kupitia Hifadhi ya Kitaifa ya Tsavo, wahandisi walijumuisha madaraja marefu na njia za chini ya ardhi kwa ajili gani?',
    options: [
      'Kuwezesha wanyamapori kama tembo na twiga kupita kwa uhuru na kuzuia wasigongwe na treni',
      'Kupunguza gharama ya chuma na mawe ya ujenzi',
      'Ili kuzuia mvua isinyeshe juu ya reli',
      'Ili watalii waweze kuruka kutoka kwenye treni'
    ],
    correctAnswer: 'Kuwezesha wanyamapori kama tembo na twiga kupita kwa uhuru na kuzuia wasigongwe na treni',
    explanation: 'Ujenzi huo wa kimazingira ulizingatia shoroba za wanyamapori (wildlife corridors) ili kulinda maisha ya wanyama wa Tsavo wasipate ajali.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kwa nini madaraja marefu yalijengwa Tsavo ambapo makundi ya ndovu na wanyama wengine huhama?'
  },

  // ==========================================
  // Unit 6 Lesson 2: Mnyambuliko wa Vitenzi (q-g6-kisw-u6-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u6-013',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "lima" kinaponyambuliwa katika kauli ya kutendwa huwa kipi?',
    options: [
      'Limwa',
      'Limia',
      'Limisha',
      'Limana'
    ],
    correctAnswer: 'Limwa',
    explanation: 'Katika kauli ya kutendwa (passive), kiambishi "-w-" huongezwa kwenye mzizi: "lima" -> "limwa".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Shamba lilipofanyiwa kazi ya kulima, shamba lili... nini? Ongeza herufi "-w-".'
  },
  {
    id: 'q-g6-kisw-u6-014',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "pika" kikiwa katika kauli ya kutendea (kufanya kwa ajili ya mtu) huwa kipi?',
    options: [
      'Pikia',
      'Pikwa',
      'Pikisha',
      'Pikana'
    ],
    correctAnswer: 'Pikia',
    explanation: 'Katika kauli ya kutendea (applicative), kiambishi "-i-" huongezwa: "pika" -> "pikia" (k.m. Mama alimpikia mtoto chakula).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mama anapomfanyia mtoto wake kazi ya kumpikia, kitenzi ni kipi?'
  },
  {
    id: 'q-g6-kisw-u6-015',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Wanafunzi wawili wanaposaidiana wao kwa wao masomoni, kitenzi "saidia" kiko katika kauli gani?',
    options: [
      'Kutendana',
      'Kutendwa',
      'Kutendesha',
      'Kutendeka'
    ],
    correctAnswer: 'Kutendana',
    explanation: 'Kauli ya kutendana (reciprocal) huonyesha watu wakitendeana kitendo wao kwa wao, ikichukua kiambishi "-an-": "saidiana".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kitendo kinapofanywa kwa ushirikiano wa kutendeana wao kwa wao kinaitwa kauli ya ku...?'
  },
  {
    id: 'q-g6-kisw-u6-016',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "soma" katika kauli ya kutendesha (kumfanya mwingine asome) ni kipi?',
    options: [
      'Somesha (au Somiza)',
      'Somwa',
      'Somea',
      'Somana'
    ],
    correctAnswer: 'Somesha (au Somiza)',
    explanation: 'Kauli ya kutendesha (causative) huonyesha kusababisha kitendo kifanyike, ikichukua "-sh-": "soma" -> "somesha".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mwalimu anapowafanya wanafunzi wasome anawa... nini?'
  },
  {
    id: 'q-g6-kisw-u6-017',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi cha pekee "kula" kinaponyambuliwa katika kauli ya kutendesha huwa kipi?',
    options: [
      'Lisha',
      'Kulisha pekee',
      'Kuliwa',
      'Kulia'
    ],
    correctAnswer: 'Lisha',
    explanation: 'Kitenzi "la" (kula) katika kauli ya kutendesha (kumpa mtu chakale ale) huwa "lisha".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mama anapompa mtoto mchanga chakula mdomoni anasemekana kum... nini?'
  },
  {
    id: 'q-g6-kisw-u6-018',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Katika sentensi: "Mlango ulifungika bila mtu kugusa," kitenzi "fungika" kiko katika kauli gani ya mnyambuliko?',
    options: [
      'Kauli ya Kutendeka',
      'Kauli ya Kutenda',
      'Kauli ya Kutendwa',
      'Kauli ya Kutendesha'
    ],
    correctAnswer: 'Kauli ya Kutendeka',
    explanation: 'Kauli ya kutendeka (stative) huonyesha kitendo kilichotendeka au kuwezekana bila kutaja mtendaji, ikichukua "-ik-" au "-ek-": "fungika".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mlango unapojifunga wenyewe bila mtendaji kutajwa, hiyo ni kauli ya ku...?'
  },
  {
    id: 'q-g6-kisw-u6-019',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "andika" katika kauli ya kutendwa huwa kipi?',
    options: [
      'Andikwa',
      'Andikia',
      'Andikisha',
      'Andikana'
    ],
    correctAnswer: 'Andikwa',
    explanation: 'Katika kauli ya kutendwa, "andika" huongezewa kiambishi "-w-": "andikwa" (k.m. Barua imeandikwa).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Barua inapopokea kitendo cha kuandikwa, tunasema barua ime... nini?'
  },
  {
    id: 'q-g6-kisw-u6-020',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "lala" kinapobadilika kuwa kauli ya kutendesha (kumsababisha mtoto alale) huwa kipi?',
    options: [
      'Laza',
      'Lalisha',
      'Laliwa',
      'Lalia'
    ],
    correctAnswer: 'Laza',
    explanation: 'Kitenzi "lala" kina mnyambuliko wa kipekee katika kauli ya kutendesha na huwa "laza" (k.m. Muuguzi alimlaza mgonjwa kitandani).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Daktari anapomweka mgonjwa kitandani alale, anasemekana kum... nini?'
  },
  {
    id: 'q-g6-kisw-u6-021',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Tambua kauli za vitenzi katika sentensi hii:\n"Mwalimu alimwandikia mwanafunzi barua na akamsomeza kwa sauti."',
    options: [
      'Kutendea (alimwandikia) na Kutendesha (akamsomeza)',
      'Kutendwa (alimwandikia) na Kutendana (akamsomeza)',
      'Kutenda (alimwandikia) na Kutendeka (akamsomeza)',
      'Kutendana (alimwandikia) na Kutendwa (akamsomeza)'
    ],
    correctAnswer: 'Kutendea (alimwandikia) na Kutendesha (akamsomeza)',
    explanation: '"Alimwandikia" ina kiambishi "-i-" (kutendea mtu mwingine), na "akamsomeza" ina kiambishi "-z-" (kutendesha / kumfanya asome).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Changanua: "andikia" (kumfanyia mtu) ni kauli gani, na "someza" (kumfanya asome) ni kauli gani?'
  },
  {
    id: 'q-g6-kisw-u6-022',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "ona" kinaponyambuliwa katika kauli ya kutendesha huwa kipi?',
    options: [
      'Onyesha (au Onesha)',
      'Onwa',
      'Onea',
      'Onana'
    ],
    correctAnswer: 'Onyesha (au Onesha)',
    explanation: 'Kitenzi "ona" katika kauli ya kutendesha (kumfanya mtu aone) hubadilika na kuwa "onyesha" au "onesha".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Unapomfanya mtu aone kitu kilichofichika, unam... nini?'
  },
  {
    id: 'q-g6-kisw-u6-023',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Kitenzi "ogopa" kinaponyambuliwa katika kauli ya kutendesha huwa neno gani?',
    options: [
      'Ogofya',
      'Ogopwa',
      'Ogopea',
      'Ogopana'
    ],
    correctAnswer: 'Ogofya',
    explanation: 'Kitenzi "ogopa" kina mnyambuliko wa kipekee wa kihistoria ambapo herufi "-p-" hubadilika kuwa "-fy-": "ogofya" (kumtia mtu hofu).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kumfanya mtu aogope au kumtisha kunaitwa kum... nini? (ina herufi "-fy-").'
  },
  {
    id: 'q-g6-kisw-u6-024',
    subStrandId: 'substrand-g6-kisw-u6',
    lessonId: 'lesson-g6-kisw-u6-l2',
    text: 'Chagua sentensi inayoonyesha kauli ya kutendeka kwa usahihi wa kisarufi:',
    options: [
      'Kazi hii ngumu inafanyika kwa wepesi leo.',
      'Kazi hii ngumu inafanyana kwa wepesi leo.',
      'Kazi hii ngumu inafanyisha kwa wepesi leo.',
      'Kazi hii ngumu inafanyia kwa wepesi leo.'
    ],
    correctAnswer: 'Kazi hii ngumu inafanyika kwa wepesi leo.',
    explanation: '"Inafanyika" (kutendeka) huonyesha kuwa kazi inawezekana kufanywa bila kuhitaji kutaja jina la mtendaji.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta kitenzi chenye kiambishi "-ik-" kinachoonyesha hali ya kutendeka kwa urahisi.'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write updated db to file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 3 of Grade 6 Kiswahili Lugha successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
