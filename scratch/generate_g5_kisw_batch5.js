import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 Kiswahili Batch 5 (Units 9 & 10) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-kisw-u9',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Biashara, Akiba, Ujasiriamali na Hali ya Masharti ("ki-")',
    description: 'Kuelewa dhana za biashara, ununuzi, uuzaji, akiba ya kifedha (kibubu, benki, M-Pesa), na ujasiriamali nchini Kenya; kutambua msamiati wa kibiashara (faida, hasara, bei, risiti); kubainisha matumizi ya hali ya masharti kwa kiambishi "ki-" (ukisoma kwa bidii utafaulu; mvua ikinyesha tutalima) na ukanusho wake katika sentensi fasaha.',
    cbeCompetency: 'Stadi za kifedha na ujasiriamali, ufahamu wa kina wa hali ya masharti ("ki-"), na utatuzi wa matatizo ya kiuchumi',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g5-kisw-u10',
    strandId: 'strand-g5-kisw-kuandika',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Haki za Mtoto, Uongozi na Uandishi wa Barua ya Kirafiki',
    description: 'Kutambua haki za msingi za mtoto (elimu, afya, ulinzi dhidi ya dhuluma, kutobaguliwa) na wajibu wake kulingana na Sheria ya Watoto ya Kenya; kuelewa sifa za kiongozi mwadilifu; kutumia alama za uakifishaji (kikomo, koma, alama ya kuuliza, alama ya hisi); na kujifunza muundo kamili wa barua ya kirafiki (anwani, tarehe, maamkizi, mwili wa barua, na hitimisho).',
    cbeCompetency: 'Uelewa wa sheria na haki za watoto, uongozi na uraia mwema, ustadi wa uakifishaji, na uandishi bora wa barua ya kirafiki',
    estimatedMinutes: 30,
    order: 10
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 5 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-kisw-u9-l1',
    subStrandId: 'substrand-g5-kisw-u9',
    title: 'Biashara, Akiba na Ujasiriamali nchini Kenya',
    content: 'Biashara na ujasiriamali huwezesha wananchi kupata mahitaji ya kila siku na kujenga uchumi thabiti:\n\n1. Msamiati Muhimu wa Kibiashara:\n- Mnunuzi: Mtu anayetoa pesa ili kupata bidhaa au huduma.\n- Muuzaji / Mchuuzi: Mtu anayeuza bidhaa dukani au sokoni ili kupata mapato.\n- Faida: Pesa za ziada anazopata mfanyabiashara baada ya kutoa gharama ya kununulia bidhaa.\n- Hasara: Upotevu wa fedha pale bidhaa zinapouzwa chini ya bei ya gharama au kuharibika.\n- Risiti: Hati au karatasi ya uthibitisho inayotolewa baada ya kulipia bidhaa au huduma.\n- Akiba: Pesa zinazowekwa kando kwa matumizi ya baadaye au ya dharura.\n\n2. Njia za Kuweka Akiba nchini Kenya:\n- Kibubu: Chombo kidogo (cha mbao, bati, au udongo) cha kuhifadhia sarafu na noti nyumbani.\n- Akaunti ya Benki: Mahali salama pa kisheria pa kuhifadhi fedha za biashara na elimu.\n- Huduma za Kifedha kwa Simu (kama M-Pesa): Njia ya haraka ya kutuma na kupokea fedha kwa usalama bila kubeba noti nyingi mkononi.\n\n3. Ujasiriamali wa Wanafunzi:\n- Wanafunzi wanaweza kuanzisha miradi midogo kama vile kutengeneza kadi za sikukuu, kupanda mboga za bustani, au kufuga kuku wa mayai ili kujifunza stadi za maisha.',
    didYouKnow: 'Kenya inasifika duniani kote kwa kuwa nchi ya kwanza kubuni mfumo wa M-Pesa, unaowezesha mamilioni ya wananchi kutuma na kupokea fedha kupitia simu za mkononi kwa usalama!',
    kenyanContext: 'Katika soko kubwa la Gikomba jijini Nairobi na soko la Kongowea huko Mombasa, maelfu ya wafanyabiashara hutumia pochi za kidijitali za simu kuuza mboga, nafaka, na nguo kwa uwazi na usalama.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u9-l2',
    subStrandId: 'substrand-g5-kisw-u9',
    title: 'Hali ya Masharti ya Kiambishi "ki-"',
    content: 'Katika sarufi ya Kiswahili, kiambishi "ki-" kinapotumiwa katikati ya kitenzi (baada ya kiambishi nafsi/ngeli) huonyesha kwamba kitendo kimoja kitatokea iwapo tu kitendo kingine kimetendeka kwanza (sharti na tokeo):\n\n1. Muundo wa Sentensi ya Masharti ("ki-"):\n- Mzizi wa kitenzi huchukua: Kiambishi Nafsi + "ki-" + Mzizi wa Kitenzi.\n- Mfano: U- + -ki- + -soma -> "Ukisoma kwa bidii, utafaulu mtihani wako."\n- Mfano: Mvua i- + -ki- + -nyesha -> "Mvua ikinyesha, wakulima watapanda mbegu."\n- Mfano: Tu- + -ki- + -weka -> "Tukiweka akiba leo, tutanunua vitabu kesho."\n\n2. Maana ya Masharti:\n- Sentensi ina sehemu mbili: Sharti (sehemu yenye "ki-") na Tokeo (sehemu inayoeleza matokeo, mara nyingi katika wakati ujao "ta-").\n\n3. Ukanusho wa Hali ya Masharti ("ki-"):\n- Hali ya masharti "ki-" hukanushwa kwa kutumia kiambishi cha masharti hasi "-sipo-".\n- Mfano: "Ukisoma utafaulu" -> Ukanusho: "Usiposaidia au usiposoma, hutafulu."\n- Mfano: "Mvua ikinyesha tutalima" -> Ukanusho: "Mvua isiponyesha hatutalima."',
    didYouKnow: 'Kiambishi "-sipo-" kinachotumika kukanusha masharti kiliunganishwa na maneno mawili ya zamani yanayomaanisha "kutokuwa pale" au "isipotokea"!',
    kenyanContext: 'Mwalimu Otieno aliwakumbusha wanafunzi wa Gredi ya 5: "Mkishirikiana kwa upendo na kufanya kazi kwa bidii, shule yetu itakuwa kinara wa masomo katika kaunti nzima."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u10-l1',
    subStrandId: 'substrand-g5-kisw-u10',
    title: 'Haki za Msingi za Watoto na Uongozi Mwema',
    content: 'Kila mtoto nchini Kenya ana haki za kisheria zinazolindwa na Katiba ya Kenya na Sheria ya Watoto (Children\'s Act):\n\n1. Haki Kuu za Mtoto:\n- Haki ya Kuishi na Kupata Jina: Kila mtoto ana haki ya kupewa jina zuri na utaifa.\n- Haki ya Elimu Bora: Kila mtoto anapaswa kwenda shuleni na kupata vifaa vya masomo bila kubaguliwa.\n- Haki ya Afya na Lishe Bora: Kupata matibabu anapougua na mlo kamili unaojenga mwili.\n- Haki ya Ulinzi: Kulindwa dhidi ya ajira za watoto, unyanyasaji wa kimwili, dhuluma, na ndoa za mapema.\n- Haki ya Kucheza na Kupumzika: Kuwa na wakati wa michezo salama na kukuza vipaji.\n\n2. Wajibu wa Mtoto:\n- Kila haki huenda sambamba na wajibu. Watoto wana wajibu wa kuwaheshimu wazazi na walimu, kusaidia kazi ndogo za nyumbani, kusoma kwa bidii, na kutunza mazingira.\n\n3. Sifa za Kiongozi Bora na Mwadilifu:\n- Kiongozi wa wanafunzi (kiranja) anapaswa kuwa mwenye haki, mkweli, asiyeegemea upande wowote, mnyenyekevu, na kielelezo cha nidhamu ya hali ya juu.',
    didYouKnow: 'Siku ya Mtoto wa Afrika huadhimishwa tarehe 16 Juni kila mwaka kote barani Afrika ili kutetea haki, utu, na usalama wa watoto wote!',
    kenyanContext: 'Katika shule za Kenya, wanafunzi huchagua viranja wao kidemokrasia kupitia kura huru, wakijifunza misingi ya uongozi bora na uwajibikaji tangu wakiwa wadogo.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u10-l2',
    subStrandId: 'substrand-g5-kisw-u10',
    title: 'Alama za Uakifishaji na Muundo wa Barua ya Kirafiki',
    content: 'Uandishi bora unahitaji matumizi sahihi ya alama za uakifishaji na kufuata muundo rasmi wa mtungo:\n\n1. Alama za Uakifishaji Muhimu:\n- Kikomo / Nukta (.): Huwekwa mwishoni mwa sentensi inayoeleza kauli kamili.\n- Koma (,): Hutumika kutenganisha orodha ya vitu au kutoa pumziko fupi katika sentensi.\n- Alama ya Kuuliza (?): Huwekwa mwishoni mwa sentensi yenye swali.\n- Alama ya Hisi / Mshangao (!): Huonyesha hisia kali kama furaha, mshangao, hasira, au onyo.\n- Herufi Kubwa: Hutumika mwanzoni mwa sentensi na kwa majina maalum ya watu, miji, na miezi (Kamau, Nairobi, Jumatatu).\n\n2. Muundo wa Barua ya Kirafiki (Barua ya Kidugu):\n- Anwani ya Mwandishi: Huandikwa juu upande wa kulia (Sanduku la Posta, Mji).\n- Tarehe: Huandikwa chini ya anwani upande wa kulia (mfano: 10 Oktoba 2026).\n- Salamu / Maamkizi: Upande wa kushoto (mfano: "Kwa rafiki yangu mpendwa Amani,").\n- Utangulizi: Kumjulia hali mpokezi na kueleza sababu ya kuandika.\n- Mwili wa Barua: Aya moja au mbili zinazoeleza ujumbe mkuu kwa lugha ya heshima na uchangamfu.\n- Hitimisho: Maneno ya kuagana kwa upendo (mfano: "Wako akupendaye," au "Rafiki yako mwaminifu,").\n- Jina la Mwandishi: Jina la kwanza la mwandishi chini ya hitimisho.',
    didYouKnow: 'Katika barua ya kirafiki, unatumia anwani moja pekee (ya mwandishi), tofauti na barua rasmi ya kiofisi inayohitaji anwani mbili!',
    kenyanContext: 'Wanafunzi wa Gredi ya 5 huko Nakuru waliwaandikia barua za kirafiki wanafunzi wenzao wa Garissa wakieleza jinsi wanavyojifunza kilimo cha mboga shuleni mwao.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  if (!db.lessons.some(les => les.id === l.id)) {
    db.lessons.push(l);
    console.log(`Added lesson ${l.id}`);
  }
});

// 3. Batch 5 Missions (4 missions: orders 118 to 121)
const missionsToAdd = [
  {
    id: 'mission-g5-kisw-u9-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u9',
    lessonId: 'lesson-g5-kisw-u9-l1',
    title: 'Wajasiriamali Chipukizi na Akiba ya Kibubu',
    description: 'Chambua faida, hasara na risiti sokoni; fumbua siri ya akiba kwenye kibubu na M-Pesa; na jenga ujuzi wa kifedha!',
    order: 118,
    orderIndex: 118,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-akiba-mjasiriamali',
    badge: { name: 'Mjasiriamali Hodari', icon: 'dollar-sign' },
    questionIds: [
      'q-g5-kisw-u9-001', 'q-g5-kisw-u9-002', 'q-g5-kisw-u9-003', 'q-g5-kisw-u9-004',
      'q-g5-kisw-u9-005', 'q-g5-kisw-u9-006', 'q-g5-kisw-u9-007', 'q-g5-kisw-u9-008',
      'q-g5-kisw-u9-009', 'q-g5-kisw-u9-010', 'q-g5-kisw-u9-011', 'q-g5-kisw-u9-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u9-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u9',
    lessonId: 'lesson-g5-kisw-u9-l2',
    title: 'Mabingwa wa Hali ya Masharti ("ki-")',
    description: 'Bobea katika kanuni za masharti na tokeo, unganisha sentensi kwa kiambishi "ki-", na kanusha kwa usahihi ukitumia "-sipo-"!',
    order: 119,
    orderIndex: 119,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-masharti-bingwa',
    badge: { name: 'Bingwa wa Masharti', icon: 'check-square' },
    questionIds: [
      'q-g5-kisw-u9-013', 'q-g5-kisw-u9-014', 'q-g5-kisw-u9-015', 'q-g5-kisw-u9-016',
      'q-g5-kisw-u9-017', 'q-g5-kisw-u9-018', 'q-g5-kisw-u9-019', 'q-g5-kisw-u9-020',
      'q-g5-kisw-u9-021', 'q-g5-kisw-u9-022', 'q-g5-kisw-u9-023', 'q-g5-kisw-u9-024'
    ]
  },
  {
    id: 'mission-g5-kisw-u10-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u10',
    lessonId: 'lesson-g5-kisw-u10-l1',
    title: 'Watetezi wa Haki za Watoto na Uongozi Bora',
    description: 'Tetea haki za watoto chini ya Katiba ya Kenya, kamilisha wajibu wako shuleni na nyumbani, na dhihirisha uadilifu wa uongozi!',
    order: 120,
    orderIndex: 120,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-haki-watoto',
    badge: { name: 'Mtetezi wa Haki', icon: 'flag' },
    questionIds: [
      'q-g5-kisw-u10-001', 'q-g5-kisw-u10-002', 'q-g5-kisw-u10-003', 'q-g5-kisw-u10-004',
      'q-g5-kisw-u10-005', 'q-g5-kisw-u10-006', 'q-g5-kisw-u10-007', 'q-g5-kisw-u10-008',
      'q-g5-kisw-u10-009', 'q-g5-kisw-u10-010', 'q-g5-kisw-u10-011', 'q-g5-kisw-u10-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u10-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u10',
    lessonId: 'lesson-g5-kisw-u10-l2',
    title: 'Waandishi Mahiri wa Barua ya Kirafiki na Uakifishaji',
    description: 'Dhibiti uakifishaji sahihi (koma, kikomo, hisi), pangilia anwani na muundo wa barua ya kirafiki, na kamilisha safari ya Gredi ya 5!',
    order: 121,
    orderIndex: 121,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-barua-kirafiki',
    badge: { name: 'Bingwa wa Barua ya Kirafiki', icon: 'mail' },
    questionIds: [
      'q-g5-kisw-u10-013', 'q-g5-kisw-u10-014', 'q-g5-kisw-u10-015', 'q-g5-kisw-u10-016',
      'q-g5-kisw-u10-017', 'q-g5-kisw-u10-018', 'q-g5-kisw-u10-019', 'q-g5-kisw-u10-020',
      'q-g5-kisw-u10-021', 'q-g5-kisw-u10-022', 'q-g5-kisw-u10-023', 'q-g5-kisw-u10-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// Update world total missions
const worldWord = db.gameWorlds.find(w => w.id === 'world-word-quest');
if (worldWord) {
  worldWord.totalMissions = Math.max(worldWord.totalMissions, 121);
}

// 4. Batch 5 Questions (48 questions: 24 for Unit 9, 24 for Unit 10)
const questionsToAdd = [
  // --- Unit 9: Mission 1 (q-g5-kisw-u9-001 to 012) ---
  {
    id: 'q-g5-kisw-u9-001',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Karatasi au hati rasmi anayopewa mteja dukani au sokoni kuthibitisha kwamba amelipa fedha za bidhaa aliyonunua huitwaje?',
    text: 'Karatasi au hati rasmi anayopewa mteja dukani au sokoni kuthibitisha kwamba amelipa fedha za bidhaa aliyonunua huitwaje?',
    options: [
      'Risiti',
      'Barua pepe',
      'Cheti cha kuzaliwa',
      'Kipeperushi'
    ],
    correctAnswer: 'Risiti',
    explanation: 'Risiti ni hati ya kisheria inayothibitisha malipo na inamlinda mnunuzi iwapo atahitaji kurudisha bidhaa iliyoharibika.',
    socraticHint: 'Ushahidi wa maandishi unaopewa dukani baada ya kulipa pesa unaitwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-002',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Pesa za ziada anazopata mfanyabiashara baada ya kuuza bidhaa kwa bei ya juu kuliko gharama aliyotumia kuzinunua huitwaje?',
    text: 'Pesa za ziada anazopata mfanyabiashara baada ya kuuza bidhaa kwa bei ya juu kuliko gharama aliyotumia kuzinunua huitwaje?',
    options: [
      'Faida',
      'Hasara',
      'Deni',
      'Ushuru'
    ],
    correctAnswer: 'Faida',
    explanation: 'Faida ni mapato halisi ya ziada (bei ya mauzo ikiondolewa bei ya ununuzi na gharama za usafiri).',
    socraticHint: 'Mapato mazuri ya ziada yanayomfurahisha mfanyabiashara yanaitwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-003',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chombo kidogo kilichotengenezwa kwa udongo, mti au bati chenye tundu nyembamba kinachotumiwa na watoto kuhifadhia sarafu nyumbani huitwaje?',
    text: 'Chombo kidogo kilichotengenezwa kwa udongo, mti au bati chenye tundu nyembamba kinachotumiwa na watoto kuhifadhia sarafu nyumbani huitwaje?',
    options: [
      'Kibubu (au Sanduku la akiba)',
      'Pakacha',
      'Kapu',
      'Pochi ya ngozi'
    ],
    correctAnswer: 'Kibubu (au Sanduku la akiba)',
    explanation: 'Kibubu ni chombo cha kiasili chenye tundu ndogo cha kutumbukizia sarafu ili kuweka akiba ya fedha kidogo kidogo.',
    socraticHint: 'Chombo ambamo watoto hutumbukiza shilingi kumi au ishirini ili kujiwekea akiba.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-004',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Huduma ya kifedha kwa njia ya simu ya mkononi iliyoanzishwa nchini Kenya inayowezesha kutuma na kutoa pesa huitwaje?',
    text: 'Huduma ya kifedha kwa njia ya simu ya mkononi iliyoanzishwa nchini Kenya inayowezesha kutuma na kutoa pesa huitwaje?',
    options: [
      'M-Pesa (au Pesa ya Simu)',
      'Barua ya posta',
      'Tarakilishi',
      'Feri'
    ],
    correctAnswer: 'M-Pesa (au Pesa ya Simu)',
    explanation: 'M-Pesa ni ubunifu maarufu wa kiteknolojia wa Kenya unaowezesha uhamishaji wa fedha haraka na salama kupitia simu za mkononi.',
    socraticHint: 'Neno "M-Pesa" linachanganya "M" (mobile/simu) na neno la Kiswahili "Pesa".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-005',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni tabia ipi inayodhihirisha usimamizi mzuri wa fedha na bajeti binafsi kwa mtoto anayepewa pesa za matumizi?',
    text: 'Ni tabia ipi inayodhihirisha usimamizi mzuri wa fedha na bajeti binafsi kwa mtoto anayepewa pesa za matumizi?',
    options: [
      'Kutumia sehemu ya pesa kwa mahitaji muhimu ya shule na kuweka sehemu iliyobaki kwenye kibubu kama akiba',
      'Kutumia pesa zote mara moja kununua peremende na biskuti',
      'Kupoteza pesa kwa uzembe bila kujali',
      'Kuazima pesa nyingi kutoka kwa wenzake ili aonekane tajiri'
    ],
    correctAnswer: 'Kutumia sehemu ya pesa kwa mahitaji muhimu ya shule na kuweka sehemu iliyobaki kwenye kibubu kama akiba',
    explanation: 'Kuweka akiba na kutofanya matumizi ya anasa ni msingi mkuu wa nidhamu ya kifedha inayofunzwa katika mtaala wa CBC.',
    socraticHint: 'Kugawanya fedha kati ya mahitaji ya lazima na akiba ya baadaye ndio msingi wa hekima ya kifedha.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-006',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mfanyabiashara anapouza nyanya zake kwa bei ya chini kuliko pesa alizotumia kuzinunua au zikioza, anasemekana kupata nini?',
    text: 'Mfanyabiashara anapouza nyanya zake kwa bei ya chini kuliko pesa alizotumia kuzinunua au zikioza, anasemekana kupata nini?',
    options: [
      'Hasara',
      'Faida',
      'Mshahara',
      'Ushuru'
    ],
    correctAnswer: 'Hasara',
    explanation: 'Hasara hutokea pale biashara inapopoteza fedha badala ya kuongeza kipato.',
    socraticHint: 'Kinyume cha faida katika shughuli za kibiashara ni hasara.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-007',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini mtu anayetumia huduma za fedha za simu au kadi ya benki (ATM) anapaswa kulinda nambari yake ya siri (PIN)?',
    text: 'Kwanini mtu anayetumia huduma za fedha za simu au kadi ya benki (ATM) anapaswa kulinda nambari yake ya siri (PIN)?',
    options: [
      'Kuzuia wezi na walaghai wasiibe fedha zake kutoka kwenye akaunti',
      'Ili simu yake isipoteze mtandao',
      'Kuhakikisha kadi haipati joto',
      'Ili kuzuia betri isiishe'
    ],
    correctAnswer: 'Kuzuia wezi na walaghai wasiibe fedha zake kutoka kwenye akaunti',
    explanation: 'Nambari ya siri ya PIN inalinda usalama wa fedha; ikijulikana na wezi, wanaweza kuiba fedha zote kwenye akaunti mara moja.',
    socraticHint: 'Nambari ya siri ya PIN inalinda pesa zako dhidi ya nani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-008',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtu anayeanzisha biashara au mradi mpya wa kutoa huduma au bidhaa ili kutatua changamoto za jamii huitwaje?',
    text: 'Mtu anayeanzisha biashara au mradi mpya wa kutoa huduma au bidhaa ili kutatua changamoto za jamii huitwaje?',
    options: [
      'Mjasiriamali',
      'Mwajiriwa',
      'Mteja pekee',
      'Mlinzi'
    ],
    correctAnswer: 'Mjasiriamali',
    explanation: 'Mjasiriamali (entrepreneur) ni mtu mbunifu anayeanzisha biashara na kuchukua hatua za kibiashara ili kuunda faida na kutoa ajira.',
    socraticHint: 'Neno hili linatokana na "ujasiri" wa kuanzisha mradi mpya wa kibiashara.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-009',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kiasi cha pesa kinachotakiwa ili kununua bidhaa au huduma fulani huitwaje kwa Kiswahili?',
    text: 'Kiasi cha pesa kinachotakiwa ili kununua bidhaa au huduma fulani huitwaje kwa Kiswahili?',
    options: [
      'Bei (Thamani)',
      'Risiti',
      'Ruzuku',
      'Ushuru'
    ],
    correctAnswer: 'Bei (Thamani)',
    explanation: 'Bei ni thamani ya pesa iliyowekwa kwa ajili ya kuuza au kununua bidhaa au huduma dukani au sokoni.',
    socraticHint: 'Mnunuzi anapouliza "Hiki ni shilingi ngapi?", anataka kujua nini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-010',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wanafunzi wa Gredi ya 5 walipanda mboga za mchicha shuleni na kuziuzia wazazi siku ya wazi ya shule. Fedha walizopata zinaweza kuwasaidiaje?',
    text: 'Wanafunzi wa Gredi ya 5 walipanda mboga za mchicha shuleni na kuziuzia wazazi siku ya wazi ya shule. Fedha walizopata zinaweza kuwasaidiaje?',
    options: [
      'Kununulia vitabu vya ziada, mbegu mpya za bustani, na kusaidia wanafunzi wenye mahitaji maalum',
      'Kununua simu za gharama kubwa kwa kila mwanafunzi darasani',
      'Kugawa pesa hizo kwa watu wasiofanya kazi mtaani',
      'Kununua peremende nyingi ziharibu meno yao'
    ],
    correctAnswer: 'Kununulia vitabu vya ziada, mbegu mpya za bustani, na kusaidia wanafunzi wenye mahitaji maalum',
    explanation: 'Miradi ya ujasiriamali shuleni inalenga kuwajengea wanafunzi uwajibikaji, kusaidia jamii, na kuboresha rasilimali za shule.',
    socraticHint: 'Pesa za mradi wa shule zinapaswa kutumiwa kwa malengo gani ya kimaendeleo na kielimu?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-011',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili inayohimiza umuhimu wa kujiwekea akiba kabla ya shida: "Akiba haiozi, na fimbo ya mbali ________."',
    text: 'Kamilisha methali ya Kiswahili inayohimiza umuhimu wa kujiwekea akiba kabla ya shida: "Akiba haiozi, na fimbo ya mbali ________."',
    options: [
      'haiui nyoka',
      'huvunjika mara moja',
      'haipigwi mti',
      'haina faida'
    ],
    correctAnswer: 'haiui nyoka',
    explanation: 'Methali hii inafundisha kwamba akiba uliyonayo karibu ndiyo inayoweza kukusaidia wakati wa dharura, tofauti na msaada ulio mbali.',
    socraticHint: 'Methali inasema: "Fimbo ya mbali haiui..." kiumbe gani hatari?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-012',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Biashara ya kubadilishana bidhaa kwa bidhaa bila kutumia pesa za sarafu au noti (iliyotumika zamani kabla ya pesa) iliitwaje?',
    text: 'Biashara ya kubadilishana bidhaa kwa bidhaa bila kutumia pesa za sarafu au noti (iliyotumika zamani kabla ya pesa) iliitwaje?',
    options: [
      'Biashara ya kubadilishana bidhaa (Barter trade)',
      'Biashara ya M-Pesa',
      'Biashara ya hisa za benki',
      'Biashara ya mtandaoni'
    ],
    correctAnswer: 'Biashara ya kubadilishana bidhaa (Barter trade)',
    explanation: 'Kabla ya kuanzishwa kwa sarafu na noti, jamii zilibadilishana mahindi kwa mbuzi, au samaki kwa unga (barter trade).',
    socraticHint: 'Kubadilishana vitu moja kwa moja bila noti za pesa.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },

  // --- Unit 9: Mission 2 (q-g5-kisw-u9-013 to 024) ---
  {
    id: 'q-g5-kisw-u9-013',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kiambishi kipi cha kisarufi kinachotumiwa kuonyesha HALI YA MASHARTI katika sentensi kama vile: "Ukimsaidia mwenzako, naye atakusaidia"?',
    text: 'Ni kiambishi kipi cha kisarufi kinachotumiwa kuonyesha HALI YA MASHARTI katika sentensi kama vile: "Ukimsaidia mwenzako, naye atakusaidia"?',
    options: [
      '-ki-',
      '-li-',
      '-me-',
      '-ta-'
    ],
    correctAnswer: '-ki-',
    explanation: 'Kiambishi "-ki-" kinaonyesha sharti; yaani tendo la pili (kukusaidia) litategemea tendo la kwanza (kumsaidia) likifanyika.',
    socraticHint: 'Tazama kitenzi: U-ki-msaidia. Ni herufi gani za masharti?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-014',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha masharti: "Mvua i____nyesha kwa wingi, mavuno yatakuwa tele msimu huu."',
    text: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha masharti: "Mvua i____nyesha kwa wingi, mavuno yatakuwa tele msimu huu."',
    options: [
      '-ki-',
      '-na-',
      '-li-',
      '-nge-'
    ],
    correctAnswer: '-ki-',
    explanation: 'Kiambishi "-ki-" kinaweka sharti wazi kwamba mavuno mengi yatapatikana iwapo tu mvua itanyesha: "Ikinyesha."',
    socraticHint: 'Sharti la mvua kunyesha: i-ki-nyesha.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-015',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ukanusho sahihi wa sentensi ya masharti "Ukisoma kwa bidii utafaulu mtihani" ni upi?',
    text: 'Ukanusho sahihi wa sentensi ya masharti "Ukisoma kwa bidii utafaulu mtihani" ni upi?',
    options: [
      'Usiposaoma kwa bidii hutafaulu mtihani.',
      'Ukisoma kwa bidii hutafaulu mtihani.',
      'Hukusoma kwa bidii na hutafulu mtihani.',
      'Hutasoma kwa bidii na utafaulu mtihani.'
    ],
    correctAnswer: 'Usiposaoma kwa bidii hutafaulu mtihani.',
    explanation: 'Hali ya masharti "-ki-" hukanushwa kwa kutumia kiambishi cha masharti hasi "-sipo-": "Ukisoma" inakuwa "Usiposoma", na "utafaulu" inakuwa "hutafaulu". (Hapa imeandikwa Usiposaoma / Usiposoma).',
    socraticHint: 'Kiambishi cha kukanusha masharti ya "-ki-" ni "-sipo-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-016',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi kati ya zifuatazo inayoonyesha HALI YA MASHARTI ya kweli?',
    text: 'Ni sentensi ipi kati ya zifuatazo inayoonyesha HALI YA MASHARTI ya kweli?',
    options: [
      'Tukitunza mazingira yetu vema, tutaishi maisha yenye afya tele.',
      'Tulitunza mazingira yetu jana asubuhi.',
      'Tunatunza mazingira sasa hivi shuleni.',
      'Mazingira yetu ni safi sana.'
    ],
    correctAnswer: 'Tukitunza mazingira yetu vema, tutaishi maisha yenye afya tele.',
    explanation: '"Tukitunza" ina kiambishi "-ki-" cha masharti; maisha yenye afya yanategemea sharti la kutunza mazingira.',
    socraticHint: 'Tafuta kitenzi chenye kiambishi cha sharti "ki-": tukitunza.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-017',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Badilisha sentensi ifuatayo kuwa katika ukanusho wa masharti: "Wageni wakifika mapema, chakula kitakuwa tayari."',
    text: 'Badilisha sentensi ifuatayo kuwa katika ukanusho wa masharti: "Wageni wakifika mapema, chakula kitakuwa tayari."',
    options: [
      'Wageni wasipofika mapema, chakula hakitakuwa tayari.',
      'Wageni hawakufika mapema na chakula hakikuwa tayari.',
      'Wageni hawatofika mapema lakini chakula kipo.',
      'Wageni hawajafika mapema na chakula kimeiva.'
    ],
    correctAnswer: 'Wageni wasipofika mapema, chakula hakitakuwa tayari.',
    explanation: '"Wakifika" inakanushwa kwa "Wasipofika" (-sipo-), na "kitakuwa" inakanushwa kwa "hakitakuwa".',
    socraticHint: 'Badilisha "wakifika" iwe na kiambishi "-sipo-" (wasipofika).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-018',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "akiamka" kimetumika katika sentensi hii: "Juma akiamka mapema, hataachwa na basi la shule." Sehemu ya "-ki-" inafanya kazi gani?',
    text: 'Kitenzi "akiamka" kimetumika katika sentensi hii: "Juma akiamka mapema, hataachwa na basi la shule." Sehemu ya "-ki-" inafanya kazi gani?',
    options: [
      'Kuonyesha sharti linalotakiwa kutimia ili asipitwe na basi',
      'Kuonyesha kuwa Juma aliamka jana asubuhi',
      'Kuonyesha kuwa Juma bado amelala usingizi',
      'Kuonyesha umbo la nomino ya ngeli ya KI-VI'
    ],
    correctAnswer: 'Kuonyesha sharti linalotakiwa kutimia ili asipitwe na basi',
    explanation: 'Katika "a-ki-amka", "-ki-" ni kiambishi cha masharti kinachoweka sharti la kuwahi kuamka ili basi lisimwache.',
    socraticHint: 'Je, "-ki-" hapa inamaanisha sharti au wakati uliopita?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-019',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tofauti kati ya kiambishi "-ki-" katika kitenzi "akilima" na nomino "kitabu" ni ipi?',
    text: 'Tofauti kati ya kiambishi "-ki-" katika kitenzi "akilima" na nomino "kitabu" ni ipi?',
    options: [
      'Katika "akilima", "-ki-" ni kiambishi cha masharti, lakini katika "kitabu", "ki-" ni kiambishi awali cha ngeli ya KI-VI',
      'Vyote viwili vinaonyesha vitabu vya shule',
      'Katika "kitabu", "ki-" inamaanisha wakati uliopita',
      'Hakuna tofauti yoyote ya kisarufi kati ya maneno hayo mawili'
    ],
    correctAnswer: 'Katika "akilima", "-ki-" ni kiambishi cha masharti, lakini katika "kitabu", "ki-" ni kiambishi awali cha ngeli ya KI-VI',
    explanation: '"A-ki-lima" ni kitenzi chenye masharti, wakati "ki-tabu" ni nomino ya ngeli ya KI-VI inayoonyesha kifaa kimoja cha kusoma.',
    socraticHint: 'Je, kitabu ni nomino ya ngeli au ni kitendo cha masharti?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-020',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi: "U_______weka akiba kwenye kibubu leo, kesho utakuwa na pesa za kununua sare ya shule."',
    text: 'Kamilisha sentensi: "U_______weka akiba kwenye kibubu leo, kesho utakuwa na pesa za kununua sare ya shule."',
    options: [
      '-ki-',
      '-li-',
      '-ta-',
      '-na-'
    ],
    correctAnswer: '-ki-',
    explanation: 'Sharti la kuwa na pesa kesho ni kuweka akiba leo: "U-ki-weka akiba..."',
    socraticHint: 'Sharti la kuweka akiba: u-ki-weka.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-021',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi iliyo na ukanusho SAHIHI wa masharti kwa kutumia kiambishi "-sipo-"?',
    text: 'Ni sentensi ipi iliyo na ukanusho SAHIHI wa masharti kwa kutumia kiambishi "-sipo-"?',
    options: [
      'Usipofanya mazoezi ya mwili, hutaweza kuwa na afya dhabiti.',
      'Hukufanya mazoezi ya mwili hutaweza kuwa na afya.',
      'Usifanye mazoezi ya mwili na huna afya.',
      'Hautafanya mazoezi na huna afya dhabiti.'
    ],
    correctAnswer: 'Usipofanya mazoezi ya mwili, hutaweza kuwa na afya dhabiti.',
    explanation: '"Usipofanya" lina kiambishi cha masharti hasi "-sipo-", kikieleza kuwa kukosa kufanya mazoezi kutasababisha ukosefu wa afya dhabiti.',
    socraticHint: 'Tafuta kitenzi chenye kiambishi cha ukanusho wa masharti: u-sipo-fanya.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-022',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sentensi ya masharti: "Ukipanda mbegu bora, utavuna mazao mengi." Sharti katika sentensi hii ni lipi?',
    text: 'Sentensi ya masharti: "Ukipanda mbegu bora, utavuna mazao mengi." Sharti katika sentensi hii ni lipi?',
    options: [
      'Kupanda mbegu bora (Ukipanda mbegu bora)',
      'Kuvuna mazao mengi',
      'Msimu wa mavuno',
      'Shamba kuwa kubwa'
    ],
    correctAnswer: 'Kupanda mbegu bora (Ukipanda mbegu bora)',
    explanation: 'Sharti ni jambo linalotakiwa kufanyika kwanza (kupanda mbegu bora) ili tokeo (kuvuna mazao mengi) liweze kupatikana.',
    socraticHint: 'Ni tendo gani lazima lifanyike kwanza kabla ya mavuno kupatikana?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-023',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Badilisha sentensi ifuatayo kutoka hali ya mazoea na kuiweka katika hali ya masharti ("ki-"): "Mwanafunzi husikiliza walimu hupata maarifa."',
    text: 'Badilisha sentensi ifuatayo kutoka hali ya mazoea na kuiweka katika hali ya masharti ("ki-"): "Mwanafunzi husikiliza walimu hupata maarifa."',
    options: [
      'Mwanafunzi akisikiliza walimu, atapata maarifa mengi.',
      'Mwanafunzi alisikiliza walimu alipata maarifa mengi.',
      'Mwanafunzi anasikiliza walimu anapata maarifa mengi.',
      'Mwanafunzi atasikiliza walimu alipata maarifa mengi.'
    ],
    correctAnswer: 'Mwanafunzi akisikiliza walimu, atapata maarifa mengi.',
    explanation: 'Katika hali ya masharti, "husikiliza" inakuwa "akisikiliza" (a-ki-sikiliza) na tokeo linakuwa katika wakati ujao "atapata".',
    socraticHint: 'Weka kiambishi "-ki-" kwenye kitenzi cha kwanza: a-ki-sikiliza.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },
  {
    id: 'q-g5-kisw-u9-024',
    subStrandId: 'substrand-g5-kisw-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili yenye kiambishi cha masharti "-ki-": "Mchelea mwana kulia, yeye mwenyewe _______."',
    text: 'Kamilisha methali ya Kiswahili yenye kiambishi cha masharti "-ki-": "Mchelea mwana kulia, yeye mwenyewe _______."',
    options: [
      'hulia',
      'hucheka',
      'huimba',
      'hulala'
    ],
    correctAnswer: 'hulia',
    explanation: 'Methali inafundisha kwamba mzazi au mlezi anayeogopa kumrekebisha mtoto wake akiwa mdogo kwa nidhamu, atajuta na kulia mwenyewe mtoto huyo atakapoharibika baadaye.',
    socraticHint: 'Mlezi asiyerekebisha mtoto atakuja kulia kwa majuto baadaye.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U9'
  },

  // --- Unit 10: Mission 1 (q-g5-kisw-u10-001 to 012) ---
  {
    id: 'q-g5-kisw-u10-001',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sheria kuu ya Kenya inayotetea haki, maslahi, na ustawi wa watoto kisheria huitwaje?',
    text: 'Sheria kuu ya Kenya inayotetea haki, maslahi, na ustawi wa watoto kisheria huitwaje?',
    options: [
      'Sheria ya Watoto (The Children\'s Act)',
      'Sheria ya Trafiki',
      'Sheria ya Misitu',
      'Sheria ya Ushuru'
    ],
    correctAnswer: 'Sheria ya Watoto (The Children\'s Act)',
    explanation: 'Sheria ya Watoto ya Kenya (Children\'s Act) inahakikisha kila mtoto anapata ulinzi dhidi ya dhuluma, elimu ya bure, na huduma bora za afya.',
    socraticHint: 'Sheria maalum inayolinda watoto nchini Kenya.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-002',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni ipi kati ya zifuatazo ambayo ni HAKI YA MSINGI ya mtoto nchini Kenya?',
    text: 'Ni ipi kati ya zifuatazo ambayo ni HAKI YA MSINGI ya mtoto nchini Kenya?',
    options: [
      'Haki ya kupata elimu ya msingi, chakula chenye lishe, na matibabu hospitalini',
      'Haki ya kuendesha matatu barabarani akiwa na umri wa miaka kumi',
      'Haki ya kutolala usiku na kukataa kwenda shuleni',
      'Haki ya kuamuru wazazi wanunue vitu vya anasa'
    ],
    correctAnswer: 'Haki ya kupata elimu ya msingi, chakula chenye lishe, na matibabu hospitalini',
    explanation: 'Elimu, lishe, malazi, na afya ni haki za kimsingi zisizoweza kuondolewa kwa mtoto yeyote.',
    socraticHint: 'Haki za msingi zinajumuisha elimu, afya, chakula, na ulinzi.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-003',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kando ya kuwa na haki, mtoto ana wajibu pia. Ni upi kati ya yafuatayo ambao ni WAJIBU wa mtoto nyumbani na shuleni?',
    text: 'Kando ya kuwa na haki, mtoto ana wajibu pia. Ni upi kati ya yafuatayo ambao ni WAJIBU wa mtoto nyumbani na shuleni?',
    options: [
      'Kuwaheshimu wazazi na walimu, kusoma kwa bidii, na kusaidia kazi ndogondogo nyumbani',
      'Kudai pesa nyingi bila kufanya chochote',
      'Kupiga wenzake uwanjani wanapocheza mpira',
      'Kuharibu madawati na vitabu vya shule'
    ],
    correctAnswer: 'Kuwaheshimu wazazi na walimu, kusoma kwa bidii, na kusaidia kazi ndogondogo nyumbani',
    explanation: 'Haki zote huenda na wajibu; wajibu wa mtoto ni kuwa mtiifu, mwenye nidhamu, na kuheshimu wakubwa na jamii.',
    socraticHint: 'Wajibu unahusu majukumu mema anayopaswa kuyatekeleza mtoto kwa jamii yake.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-004',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitendo cha kumlazimisha mtoto mdogo kufanya kazi ngumu kama kubeba mawe machimboni au kuchunga ng\'ombe badala ya kwenda shule kinaitwaje?',
    text: 'Kitendo cha kumlazimisha mtoto mdogo kufanya kazi ngumu kama kubeba mawe machimboni au kuchunga ng\'ombe badala ya kwenda shule kinaitwaje?',
    options: [
      'Ajira ya watoto (Child labour) - ambayo ni kosa kisheria',
      'Kazi ya kawaida ya shule',
      'Mchezo wa jioni',
      'Uzalendo'
    ],
    correctAnswer: 'Ajira ya watoto (Child labour) - ambayo ni kosa kisheria',
    explanation: 'Ajira ya watoto inamnyima mtoto haki ya kusoma na inahatarisha afya yake, na ni uhalifu mkubwa kisheria nchini Kenya.',
    socraticHint: 'Kazi ngumu inayomzuia mtoto kwenda shule inaitwa ajira ya watoto.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-005',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sifa ipi kuu inayomfanya mwanafunzi awe KIONGOZI BORA (kiranja mkuu) shuleni?',
    text: 'Ni sifa ipi kuu inayomfanya mwanafunzi awe KIONGOZI BORA (kiranja mkuu) shuleni?',
    options: [
      'Kuwa mwadilifu, mkweli, msikivu, na kielelezo cha nidhamu kwa wanafunzi wote',
      'Kuwaamuru wenzake kwa jeuri na kuwapiga makofi',
      'Kupendelea marafiki zake na kuwapa chakula zaidi kuliko wengine',
      'Kutoroka darasani na kutotii maagizo ya walimu'
    ],
    correctAnswer: 'Kuwa mwadilifu, mkweli, msikivu, na kielelezo cha nidhamu kwa wanafunzi wote',
    explanation: 'Uongozi bora unajengwa juu ya uadilifu, unyenyekevu, haki bila upendeleo, na kusikiliza wengine kwa staha.',
    socraticHint: 'Kiongozi bora anaonyesha uadilifu, haki, na nidhamu ya hali ya juu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-006',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtoto anaposhuhudia mwenzake akidhulumiwa, akipigwa, au kunyimwa chakula na elimu, anapaswa kuchukua hatua gani sahihi?',
    text: 'Mtoto anaposhuhudia mwenzake akidhulumiwa, akipigwa, au kunyimwa chakula na elimu, anapaswa kuchukua hatua gani sahihi?',
    options: [
      'Kutoa taarifa mara moja kwa mwalimu, mzazi, au afisa wa watoto (au kupiga nambari ya simu 116 ya bure)',
      'Kucheka na kumzomea mtoto anayedhulumiwa',
      'Kukaa kimya na kuficha jambo hilo',
      'Kukimbia na kujificha bila kusema chochote'
    ],
    correctAnswer: 'Kutoa taarifa mara moja kwa mwalimu, mzazi, au afisa wa watoto (au kupiga nambari ya simu 116 ya bure)',
    explanation: 'Kutoa taarifa kuhusu dhuluma (Child Helpline 116) huokoa maisha ya mtoto na kuhakikisha sheria inachukua mkondo wake.',
    socraticHint: 'Kutoa ripoti mara moja kwa mtu mzima anayeaminika ndiyo hatua salama ya kumwokoa mtoto anayedhulumiwa.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-007',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Siku ya kimataifa inayoadhimishwa tarehe 16 Juni kila mwaka kote barani Afrika kutambua na kutetea haki za watoto inaitwaje?',
    text: 'Siku ya kimataifa inayoadhimishwa tarehe 16 Juni kila mwaka kote barani Afrika kutambua na kutetea haki za watoto inaitwaje?',
    options: [
      'Siku ya Mtoto wa Afrika (Day of the African Child)',
      'Siku ya Wafanyakazi',
      'Siku ya Mazingira Duniani',
      'Siku ya Mashujaa'
    ],
    correctAnswer: 'Siku ya Mtoto wa Afrika (Day of the African Child)',
    explanation: 'Siku ya Mtoto wa Afrika huadhimishwa tarehe 16 Juni kukumbuka watoto wa Soweto na kusisitiza haki za elimu na usalama kwa watoto wote wa Afrika.',
    socraticHint: 'Siku maalum ya maadhimisho ya watoto wote wa bara letu la Afrika.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-008',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini watoto wote wana haki ya kupata wakati salama wa kucheza na kukuza vipaji vyao?',
    text: 'Kwanini watoto wote wana haki ya kupata wakati salama wa kucheza na kukuza vipaji vyao?',
    options: [
      'Husaidia ukuaji wa mwili na akili, hupunguza msongo wa mawazo, na kukuza urafiki na ushirikiano',
      'Hufanya watoto washindwe kusoma vitabu vyao kabisa',
      'Ili wapate kuchafua sare zao kila wakati',
      'Kuzuia watoto wasilale usiku'
    ],
    correctAnswer: 'Husaidia ukuaji wa mwili na akili, hupunguza msongo wa mawazo, na kukuza urafiki na ushirikiano',
    explanation: 'Michezo ni sehemu muhimu ya ukuaji wa kimwili na kiakili wa mtoto na inajenga ustadi wa kushirikiana na wengine.',
    socraticHint: 'Michezo inasaidiaje mwili kuwa na afya na kukuza urafiki?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-009',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni aina gani ya ubaguzi inayokatazwa kabisa shuleni kulingana na Katiba ya Kenya?',
    text: 'Ni aina gani ya ubaguzi inayokatazwa kabisa shuleni kulingana na Katiba ya Kenya?',
    options: [
      'Kubagua mtoto kwa misingi ya kabila, dini, jinsia, rangi, au ulemavu wa mwili',
      'Kuwapongeza wanafunzi wanaofanya vizuri mtihani',
      'Kuwapa kazi za ziada wanafunzi wenye vipaji',
      'Kupanga wanafunzi kwenye mistari ya usafi'
    ],
    correctAnswer: 'Kubagua mtoto kwa misingi ya kabila, dini, jinsia, rangi, au ulemavu wa mwili',
    explanation: 'Katiba ya Kenya inakataza ubaguzi wa aina yoyote; watoto wote ni sawa na wana haki ya kupata fursa sawa za elimu na heshima.',
    socraticHint: 'Ubaguzi wowote unaojengwa juu ya asili, ulemavu, au dini unakatazwa kisheria.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-010',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kiongozi wa shule anapaswa kufanya nini anapoona wanafunzi wawili wanagombana au kupigana uwanjani?',
    text: 'Kiongozi wa shule anapaswa kufanya nini anapoona wanafunzi wawili wanagombana au kupigana uwanjani?',
    options: [
      'Kuwaamua kwa upole, kuzuia mapigano, kusikiliza pande zote mbili kwa haki, na kuwapeleka kwa mwalimu wa zamu',
      'Kuchochea mapigano hayo na kupiga makofi',
      'Kumpiga yule mwanafunzi asiyempenda',
      'Kukimbia na kuacha wapigane hadi wajeruhiwe'
    ],
    correctAnswer: 'Kuwaamua kwa upole, kuzuia mapigano, kusikiliza pande zote mbili kwa haki, na kuwapeleka kwa mwalimu wa zamu',
    explanation: 'Upatanishi wa amani na haki bila hasira ni jukumu la kiongozi mwadilifu wa wanafunzi.',
    socraticHint: 'Kiongozi bora huleta amani na upatanisho badala ya uchochezi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-011',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Haki ya mtoto kuwa na "utaifa" na "jina" inamaanisha nini kisheria?',
    text: 'Haki ya mtoto kuwa na "utaifa" na "jina" inamaanisha nini kisheria?',
    options: [
      'Kusajiliwa rasmi anapozaliwa, kupewa cheti cha kuzaliwa, na kutambuliwa kama raia kamili wa Kenya',
      'Kuruhusiwa kusafiri nchi za kigeni peke yake bila wazazi',
      'Kupewa gari na nyumba na serikali anapozaliwa',
      'Kubadilisha jina lake kila mwezi anapojisikia'
    ],
    correctAnswer: 'Kusajiliwa rasmi anapozaliwa, kupewa cheti cha kuzaliwa, na kutambuliwa kama raia kamili wa Kenya',
    explanation: 'Cheti cha kuzaliwa kinathibitisha utambulisho wa mtoto na uraia wake wa Kenya, na kumpa haki ya kupata huduma za kiserikali.',
    socraticHint: 'Cheti cha kuzaliwa kinathibitisha jina na uraia wa mtoto.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-012',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali hii ya Kiswahili inayohusu malezi na uongozi wa vijana: "Samaki mkunje angali ________."',
    text: 'Kamilisha methali ya Kiswahili inayohusu malezi na uongozi wa vijana: "Samaki mkunje angali ________."',
    options: [
      'mbichi',
      'mkavu',
      'mkubwa',
      'mzima'
    ],
    correctAnswer: 'mbichi',
    explanation: 'Methali hii inafundisha kuwa mtoto anapaswa kuelekezwa nidhamu, maadili, na adabu akiwa bado mdogo, maana akishakua itakuwa vigumu kumbadilisha.',
    socraticHint: 'Samaki akiwa mbichi anakunjika bila kuvunjika; akishakauka anavunjika.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },

  // --- Unit 10: Mission 2 (q-g5-kisw-u10-013 to 024) ---
  {
    id: 'q-g5-kisw-u10-013',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya uakifishaji inayowekwa mwishoni mwa sentensi kamili inayotoa taarifa ya kawaida huitwaje?',
    text: 'Alama ya uakifishaji inayowekwa mwishoni mwa sentensi kamili inayotoa taarifa ya kawaida huitwaje?',
    options: [
      'Kikomo (au Nukta) [.]',
      'Koma [,]',
      'Alama ya kuuliza [?]',
      'Alama ya hisi [!]'
    ],
    correctAnswer: 'Kikomo (au Nukta) [.]',
    explanation: 'Kikomo au nukta huwekwa mwishoni mwa sentensi kuonyesha kwamba wazo au kauli imekamilika.',
    socraticHint: 'Alama ya nukta inayofunga sentensi inaitwa kikomo.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-014',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya uakifishaji inayotumiwa kutenganisha orodha ya vitu au kutoa pumziko fupi katikati ya sentensi huitwaje?',
    text: 'Alama ya uakifishaji inayotumiwa kutenganisha orodha ya vitu au kutoa pumziko fupi katikati ya sentensi huitwaje?',
    options: [
      'Koma (au Mkato) [,]',
      'Kikomo [.]',
      'Alama ya mshangao [!]',
      'Mabano [()]'
    ],
    correctAnswer: 'Koma (au Mkato) [,]',
    explanation: 'Koma hutumika kutenganisha maneno katika orodha (mfano: Amina alinunua maembe, machungwa, ndizi, na parachichi).',
    socraticHint: 'Alama ya mkato inayotenganisha majina katika orodha.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-015',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya uakifishaji ipi inayopaswa kuwekwa mwishoni mwa sentensi: "Utafika shuleni saa ngapi asubuhi ya leo_______"?',
    text: 'Alama ya uakifishaji ipi inayopaswa kuwekwa mwishoni mwa sentensi: "Utafika shuleni saa ngapi asubuhi ya leo_______"?',
    options: [
      'Alama ya kuuliza (?)',
      'Kikomo (.)',
      'Koma (,)',
      'Alama ya hisi (!)'
    ],
    correctAnswer: 'Alama ya kuuliza (?)',
    explanation: 'Sentensi hii ni swali (inauliza saa ya kufika), hivyo lazima imalizike kwa alama ya kuuliza (?).',
    socraticHint: 'Sentensi inayouliza swali inamalizika na alama ya kuuliza.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-016',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya hisi au mshangao (!) inafaa kutumika katika sentensi ipi kati ya zifuatazo?',
    text: 'Alama ya hisi au mshangao (!) inafaa kutumika katika sentensi ipi kati ya zifuatazo?',
    options: [
      'Lo! Kumbe simba ameonekana karibu na kijiji chetu!',
      'Kamau anasoma kitabu cha Kiswahili darasani.',
      'Je, unajua jina la mwalimu mkuu?',
      'Mama alinunua mkate, sukari, na maziwa.'
    ],
    correctAnswer: 'Lo! Kumbe simba ameonekana karibu na kijiji chetu!',
    explanation: 'Neno "Lo!" linaonyesha hisia kali ya mshangao na hofu, hivyo huwekewa alama ya hisi (!).',
    socraticHint: 'Tafuta sentensi inayoonyesha mshangao mkubwa au tahadhari kali (Lo!).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-017',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Katika muundo wa BARUA YA KIRAFIKI, anwani ya mwandishi na tarehe huandikwa wapi kwenye karatasi?',
    text: 'Katika muundo wa BARUA YA KIRAFIKI, anwani ya mwandishi na tarehe huandikwa wapi kwenye karatasi?',
    options: [
      'Juu upande wa kulia wa karatasi',
      'Chini upande wa kushoto wa karatasi',
      'Katikati kabisa ya ukurasa',
      'Nyuma ya bahasha pekee'
    ],
    correctAnswer: 'Juu upande wa kulia wa karatasi',
    explanation: 'Katika barua ya kirafiki ya Kiswahili, anwani ya mwandishi huandikwa juu upande wa kulia, ikifuatiwa na tarehe chini yake.',
    socraticHint: 'Anwani ya barua ya kirafiki huwa juu upande wa mkono wako wa kuume (kulia).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-018',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni maamkizi / salamu gani inayofaa zaidi kutumika mwanzoni mwa BARUA YA KIRAFIKI kwa rafiki yako?',
    text: 'Ni maamkizi / salamu gani inayofaa zaidi kutumika mwanzoni mwa BARUA YA KIRAFIKI kwa rafiki yako?',
    options: [
      'Kwa rafiki yangu mpendwa Otieno,',
      'Kwa Mkurugenzi Mkuu wa Elimu,',
      'Mimi hapa ninaandika,',
      'Taarifa kwa Umma,'
    ],
    correctAnswer: 'Kwa rafiki yangu mpendwa Otieno,',
    explanation: 'Barua ya kirafiki hutumia maneno ya upendo na urafiki kama "Kwa rafiki yangu mpendwa...", tofauti na barua rasmi.',
    socraticHint: 'Salamu ya kirafiki huonyesha uchangamfu na upendo kwa rafiki yako.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-019',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni maneno gani ya heshima na mapenzi yanayofaa kutumika mwishoni (hitimisho) mwa BARUA YA KIRAFIKI kabla ya kuandika jina lako?',
    text: 'Ni maneno gani ya heshima na mapenzi yanayofaa kutumika mwishoni (hitimisho) mwa BARUA YA KIRAFIKI kabla ya kuandika jina lako?',
    options: [
      'Wako akupendaye, (au Rafiki yako mwaminifu,)',
      'Wako mtiifu katika utumishi,',
      'Mimi nimechoka kuandika,',
      'Hati hii imefungwa rasmi,'
    ],
    correctAnswer: 'Wako akupendaye, (au Rafiki yako mwaminifu,)',
    explanation: 'Hitimisho la barua ya kirafiki huonyesha ukaribu na heshima ya kirafiki: "Wako akupendaye" au "Rafiki yako mwaminifu".',
    socraticHint: 'Hitimisho la upendo kati ya marafiki au ndugu wa familia.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-020',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi iliyoandikwa kwa HERUFI KUBWA na uakifishaji SAHIHI kabisa?',
    text: 'Ni sentensi ipi iliyoandikwa kwa HERUFI KUBWA na uakifishaji SAHIHI kabisa?',
    options: [
      'Amina na Juma walisafiri hadi mji wa Mombasa siku ya Ijumaa.',
      'amina na juma walisafiri hadi mji wa mombasa siku ya ijumaa.',
      'Amina Na Juma Walisafiri Hadi Mji Wa Mombasa Siku Ya Ijumaa',
      'Amina na juma walisafiri hadi mji wa Mombasa siku ya ijumaa'
    ],
    correctAnswer: 'Amina na Juma walisafiri hadi mji wa Mombasa siku ya Ijumaa.',
    explanation: 'Herufi kubwa hutumika mwanzo wa sentensi (Amina), majina ya watu (Juma), miji (Mombasa), na siku za wiki (Ijumaa), pamoja na nukta mwishoni.',
    socraticHint: 'Tazama majina ya watu (Amina, Juma), jiji (Mombasa), siku (Ijumaa), na nukta mwishoni.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-021',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tofauti kuu kati ya muundo wa Barua ya Kirafiki na Barua Rasmi (ya kiofisi) ni ipi?',
    text: 'Tofauti kuu kati ya muundo wa Barua ya Kirafiki na Barua Rasmi (ya kiofisi) ni ipi?',
    options: [
      'Barua ya kirafiki ina anwani moja (ya mwandishi) na haina kichwa cha habari, wakati barua rasmi ina anwani mbili na kichwa cha habari',
      'Barua ya kirafiki huandikwa kwa lugha ya Kiingereza pekee',
      'Barua ya kirafiki haina tarehe wala jina la mwandishi',
      'Barua rasmi haihitaji sahihi ya mtu yeyote'
    ],
    correctAnswer: 'Barua ya kirafiki ina anwani moja (ya mwandishi) na haina kichwa cha habari, wakati barua rasmi ina anwani mbili na kichwa cha habari',
    explanation: 'Barua ya kirafiki ina anwani moja tu ya mwandishi juu kulia, na lugha yake ni ya urafiki bila kichwa cha habari (Rehema).',
    socraticHint: 'Je, barua ya kirafiki ina anwani ngapi ikilinganishwa na barua ya ofisini?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-022',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya nukuu / usemi ["" / \' \'] hutumiwa kufanya kazi gani katika maandishi ya Kiswahili?',
    text: 'Alama ya nukuu / usemi ["" / \' \'] hutumiwa kufanya kazi gani katika maandishi ya Kiswahili?',
    options: [
      'Kuonyesha maneno halisi yaliyotamkwa na msemaji bila kubadilishwa',
      'Kufunga sentensi badala ya nukta',
      'Kutenganisha nambari na tarakimu',
      'Kufuta maneno yasiyotakiwa'
    ],
    correctAnswer: 'Kuonyesha maneno halisi yaliyotamkwa na msemaji bila kubadilishwa',
    explanation: 'Alama za usemi (nukuu) hufunga maneno yaliyotamkwa moja kwa moja na mhusika katika simulizi au mazungumzo (direct speech).',
    socraticHint: 'Alama za kusema maneno halisi ya mtu kama: Mwalimu alisema, "Someni kwa bidii."',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-023',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mwanafunzi anapoandika tarehe katika barua ya kirafiki, ni muundo upi SAHIHI na sanifu wa Kiswahili?',
    text: 'Mwanafunzi anapoandika tarehe katika barua ya kirafiki, ni muundo upi SAHIHI na sanifu wa Kiswahili?',
    options: [
      '10 Oktoba 2026 (au 10/10/2026)',
      'Oktoba siku ya 10 mwaka ule',
      'Jana ya juzi ya mwaka huu',
      'Tarehe yoyote bila mwaka'
    ],
    correctAnswer: '10 Oktoba 2026 (au 10/10/2026)',
    explanation: 'Tarehe sahihi huonyesha siku, mwezi (kwa herufi au tarakimu), na mwaka kamili.',
    socraticHint: 'Tarehe kamili huandikwa kwa kuonyesha nambari ya siku, jina la mwezi, na mwaka.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  },
  {
    id: 'q-g5-kisw-u10-024',
    subStrandId: 'substrand-g5-kisw-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili inayohimiza umuhimu wa kuweka kumbukumbu kwa kuandika: "Maneno ya mdomo hupeperushwa na upepo, lakini yaliyoandikwa ________."',
    text: 'Kamilisha methali ya Kiswahili inayohimiza umuhimu wa kuweka kumbukumbu kwa kuandika: "Maneno ya mdomo hupeperushwa na upepo, lakini yaliyoandikwa ________."',
    options: [
      'hubakia milele (hudumu)',
      'hupotea mara moja',
      'hayana maana',
      'huoza haraka'
    ],
    correctAnswer: 'hubakia milele (hudumu)',
    explanation: 'Maandishi hudumu na kuwa ushahidi thabiti wa kihistoria na kielimu, tofauti na maneno yanayoweza kusahaulika au kubadilishwa.',
    socraticHint: 'Maandishi hayafutiki kirahisi; yanabaki na kudumu kwa vizazi vijavyo.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U10'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(que => que.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write back to database file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 5 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
