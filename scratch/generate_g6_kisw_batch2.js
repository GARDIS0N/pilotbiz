import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Kiswahili Lugha Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-kisw-u3',
    strandId: 'strand-g6-kisw-kusikiliza',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Lishe Bora, Afya ya Jamii & Ngeli za Nomino (I-I, U-U, KU na PA-MU-KU)',
    description: 'Kusikiliza maelekezo ya wataalamu wa afya kuhusu mlo kamili wa kienyeji (managu, sukumawiki, ugali wa mtama), chanjo na kinga maradhi; msamiati wa afya na matibabu; na kutawala upatanisho wa ngeli za I-I, U-U, KU na ngeli za mahali (PA-MU-KU).',
    cbeCompetency: 'Uelewa wa mazungumzo ya afya na lishe, msamiati wa udaktari wa kimsingi, na umilisi wa ngeli za mahali na vitenzi-jina',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g6-kisw-u4',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Utalii wa Ndani, Wanyamapori & Nyakati na Hali (LI, NA, TA, ME)',
    description: 'Kusoma makala ya kitalii katika Hifadhi za Wanyamapori za Maasai Mara, Amboseli na Tsavo; msamiati wa utalii na wanyamapori; na kutawala nyakati kuu za kisarufi (Uliopita "LI", Uliopo "NA", Ujao "TA") na Hali Timilifu ("ME") pamoja na ukanushaji wake.',
    cbeCompetency: 'Msamiati wa kitalii, uzalendo wa maliasili, na matumizi fasaha ya viambishi vya nyakati na hali timilifu',
    estimatedMinutes: 30,
    order: 4
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 2 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-kisw-u3-l1',
    subStrandId: 'substrand-g6-kisw-u3',
    title: 'Mlo Kamili, Lishe Bora na Kinga Maradhi ya Jamii',
    content: 'Lishe bora na mtindo bora wa maisha ndio msingi imara wa afya ya jamii yoyote.\n\n1. Mlo Kamili na Vyakula vya Asili:\n- Mlo kamili una makundi makuu matatu ya vyakula:\n  * Vyakula vya kutia nguvu mwilini (Wanga): ugali wa mahindi, mtama, ulezi, viazi vikuu, magimbi.\n  * Vyakula vya kujenga mwili (Protini): maharagwe, dengu, kunde, samaki wa Ziwa Victoria, nyama, maziwa.\n  * Vyakula vya kulinda mwili dhidi ya magonjwa (Vitamini na Madini): mboga za kiasili (managu, mchicha, terere, mrenda, sujaa) na matunda mbalimbali.\n\n2. Msamiati wa Afya na Kinga Maradhi:\n- Zahanati (Dispensary): Kituo kidogo cha matibabu ya dharura kijijini.\n- Chanjo (Vaccine): Dawa inayokinga mwili dhidi ya maradhi hatari kama vile polio, dondakoo na surua.\n- Utapiamlo (Malnutrition): Ugonjwa unaotokana na upungufu au ukosefu wa virutubisho muhimu mwilini.\n- Kingamwili (Immunity): Uwezo wa kiasili wa mwili kupambana na viini vya maradhi.\n\n3. Nahau na Methali za Afya:\n- "Kupata nafuu": Kuanza kupona baada ya kuugua.\n- "Kinga ni bora kuliko tiba": Ni heri kuzuia maradhi kwa usafi na chanjo kuliko kutibu ugonjwa ukishatokea.\n- "Afya ni taji iliyo kichwani mwa mwenye afya": Thamani ya afya hutambuliwa zaidi mtu akiugua.',
    didYouKnow: 'Mboga za kiasili kama managu na terere zina kiwango cha juu sana cha madini ya chuma na vitamini A kuliko mboga nyingi za kigeni!',
    kenyanContext: 'Katika Kaunti ya Vihiga, akina mama wameunda bustani za jikoni za mboga za kiasili ili kuwapa watoto wa shule mlo kamili wenye virutubisho tele.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u3-l2',
    subStrandId: 'substrand-g6-kisw-u3',
    title: 'Ngeli za Nomino: I-I, U-U, KU na Mahali (PA-MU-KU)',
    content: 'Upatanisho wa ngeli zisizohesabika, vitenzi-jina na ngeli za mahali.\n\n1. Ngeli ya I-I:\n- Hujumuisha nomino za vitu visivyohesabika au hali ambazo hazina umoja wala wingi, na huchukua kiambishi "i-".\n- Mifano:\n  * Sukari hii imeyeyuka chai ikiwa moto.\n  * Chumvi imemwagika sakafuni.\n  * Chai nzuri imenukia kote.\n  * Hali ya hewa imetulia leo.\n\n2. Ngeli ya U-U:\n- Hujumuisha nomino za sifa au dhahania zinazoanza na u- ambazo hazina wingi na huchukua kiambishi "u-".\n- Mifano:\n  * Upendo wake unagusa mioyo ya wengi.\n  * Ukarimu wake umewashangaza majirani.\n  * Uzuri huu unapendeza machoni.\n  * Uvivu umezorotesha masomo yake.\n\n3. Ngeli ya KU (Kitenzi-Jina):\n- Hujumuisha vitenzi vilivyogeuzwa kuwa majina kwa kutangulizwa kiambishi "ku-".\n- Upatanisho wake huchukua "ku-".\n- Mifano:\n  * Kusoma kwake kunamwezesha kufaulu vizuri.\n  * Kucheza huku kutakuchosha sana.\n  * Kulala kwingi huleta umaskini.\n\n4. Ngeli za Mahali (PA-MU-KU):\n- PA-PA: Mahali pa karibu panapobainika wazi (Kiambishi "pa-").\n  * Mfano: Hapa mahali pazuri panapendeza kukaa.\n- MU-MU: Mahali pa ndani au shimoni (Kiambishi "mu-").\n  * Mfano: Humu darasani muna hewa safi.\n- KU-KU: Mahali pa mbali au kusikobainika maalum (Kiambishi "ku-").\n  * Mfano: Kule mlimani kuna ukungu mwingi.',
    didYouKnow: 'Katika lugha ya Kiswahili, ngeli ya KU inaweza kutumika kama kitenzi-jina ("Kusoma kwake") au kama ngeli ya mahali pa mbali ("Kule kuna hewa safi")!',
    kenyanContext: 'Katika Zahanati ya Kapsabet, muuguzi aliwaelekeza wagonjwa: "Hapa zahanatini pana dawa za kutosha za chanjo," akizingatia upatanisho wa ngeli ya PA-PA.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u4-l1',
    subStrandId: 'substrand-g6-kisw-u4',
    title: 'Utalii wa Ndani, Maliasili na Hifadhi za Wanyamapori',
    content: 'Utalii wa ndani hukuza uzalendo, kukuza uchumi na kuleta mshikamano wa kitaifa.\n\n1. Maajabu ya Maliasili ya Kenya:\n- Kenya imejaliwa mbuga na hifadhi za kipekee: Hifadhi ya Maasai Mara (uhamaji wa nyumbu), Amboseli (makundi ya tembo chini ya Mlima Kilimanjaro), Tsavo (ardhi nyekundu na tembo wakubwa), na Ziwa Nakuru (ndege heroe au flamingo).\n- Wanyama Wakubwa Watano (Big Five): Simba, Ndovu (Tembo), Kifaru, Chui na Nyati.\n\n2. Msamiati wa Kitalii:\n- Mtalii (Tourist): Mtu anayesafiri kutembelea vivutio kwa ajili ya starehe au masomo.\n- Jangili (Poacher): Mtu anayeua wanyamapori kinyume cha sheria kwa sababu ya pembe au ngozi zao.\n- Hifadhi ya wanyama (Game Reserve / Sanctuary): Eneo lililotengwa kisheria kulinda wanyamapori na mimea ya asili.\n- Malazi (Accommodation): Mahali pa kulala na kupumzika kama vile hoteli za kitalii (lodges).\n- Mwongoza watalii (Tour Guide): Mtaalamu anayeelekeza na kuwafahamisha watalii kuhusu vivutio.\n\n3. Methali za Safari na Ukarimu:\n- "Kutembea kwingi ni kuona mengi": Kusafiri huongeza hekima na ufahamu wa mambo mapya.\n- "Mgeni njoo, mwenyeji apone": Wageni huleta baraka na manufaa ya kibiashara kwa wenyeji.\n- "Mwenda tezi na omo marejeo ni ngamani": Mtu asafiriye kokote mwishowe hurudi nyumbani.',
    didYouKnow: 'Uhamaji wa maelfu ya nyumbu (Wildebeest Migration) kutoka Serengeti kuingia Maasai Mara kila mwaka hutambuliwa kimataifa kama mojawapo ya maajabu saba ya asili ya dunia!',
    kenyanContext: 'Wanafunzi wa Shule ya Msingi ya Webuye walifanya ziara ya masomo katika Hifadhi ya Maasai Mara na kujionea chui akiwa juu ya mti wa mshita akilinda mawindo yake.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u4-l2',
    subStrandId: 'substrand-g6-kisw-u4',
    title: 'Nyakati na Hali: Wakati Uliopita (LI), Uliopo (NA), Ujao (TA) na Timilifu (ME)',
    content: 'Upatanisho wa viambishi vya nyakati na hali katika tungo sanifu.\n\n1. Wakati Uliopita (Kiambishi "LI"):\n- Huonyesha tendo lililokwishatendeka zamani.\n- Mfano: Watalii walitembelea Ngome ya Yesu jana.\n- Ukanushaji: Kiambishi "KU" hutumika.\n  * Mfano: Watalii hawakutembelea Ngome ya Yesu jana.\n\n2. Wakati Uliopo (Kiambishi "NA"):\n- Huonyesha tendo linalotendeka sasa hivi wakati wa kuzungumza.\n- Mfano: Mwongoza watalii anafafanua historia ya Mombasa.\n- Ukanushaji: Kiambishi cha wakati huondolewa na kitenzi cha asili ya Kibantu huishia na herufi "i".\n  * Mfano: Mwongoza watalii hafafanui historia ya Mombasa.\n\n3. Wakati Ujao (Kiambishi "TA"):\n- Huonyesha tendo litakalotendeka baadaye au kesho.\n- Mfano: Tutasafiri kwa treni ya SGR kuelekea Voi.\n- Ukanushaji: Kiambishi "TA" hubakia.\n  * Mfano: Hatutasafiri kwa treni ya SGR kuelekea Voi.\n\n4. Hali Timilifu (Kiambishi "ME"):\n- Huonyesha tendo ambalo limemalizika lakini matokeo yake yanaendelea kuonekana au kudumu.\n- Mfano: Basi la watalii limewasili hotelini.\n- Ukanushaji: Kiambishi "ME" hubadilika na kuwa "JA".\n  * Mfano: Basi la watalii halijawasili hotelini.\n  * Mifano mingine: Amekula -> Hajala; Wamelala -> Hawajalala.',
    didYouKnow: 'Hali timilifu ya "ME" inapokanushwa haichukui "haku-" wala "ha-", bali daima hubadilika na kuwa "JA" (k.m. Amemaliza -> Hajamaliza)!',
    kenyanContext: 'Mkuu wa KWS katika lango la Hifadhi ya Tsavo alisema: "Magari yote ya kitalii yameingia hifadhini salama," akitumia hali timilifu ya ME.',
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

// 3. Batch 2 Missions (Orders 146 to 149)
const missionsToAdd = [
  {
    id: 'mission-g6-kisw-u3-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 146: Lishe ya Mababu – Afya na Msamiati wa Zahanati',
    description: 'Chambua msamiati wa afya, vyakula vya kiasili vya Kenya, chanjo, na methali za kinga maradhi.',
    order: 146,
    orderIndex: 146,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-afya',
    badge: 'badge-g6-kisw-afya',
    lessonId: 'lesson-g6-kisw-u3-l1',
    questionIds: [
      'q-g6-kisw-u3-001', 'q-g6-kisw-u3-002', 'q-g6-kisw-u3-003', 'q-g6-kisw-u3-004',
      'q-g6-kisw-u3-005', 'q-g6-kisw-u3-006', 'q-g6-kisw-u3-007', 'q-g6-kisw-u3-008',
      'q-g6-kisw-u3-009', 'q-g6-kisw-u3-010', 'q-g6-kisw-u3-011', 'q-g6-kisw-u3-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u3-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 147: Ngeli za Pekee – I-I, U-U, KU na Mahali PA-MU-KU',
    description: 'Bobea katika upatanisho wa nomino dhahania (I-I, U-U), vitenzi-jina (KU), na ngeli tatu za mahali (PA, MU, KU).',
    order: 147,
    orderIndex: 147,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-ngeli-mahali',
    badge: 'badge-g6-kisw-ngeli-mahali',
    lessonId: 'lesson-g6-kisw-u3-l2',
    questionIds: [
      'q-g6-kisw-u3-013', 'q-g6-kisw-u3-014', 'q-g6-kisw-u3-015', 'q-g6-kisw-u3-016',
      'q-g6-kisw-u3-017', 'q-g6-kisw-u3-018', 'q-g6-kisw-u3-019', 'q-g6-kisw-u3-020',
      'q-g6-kisw-u3-021', 'q-g6-kisw-u3-022', 'q-g6-kisw-u3-023', 'q-g6-kisw-u3-024'
    ]
  },
  {
    id: 'mission-g6-kisw-u4-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 148: Safari za Maasai Mara – Utalii na Maliasili',
    description: 'Tambua vivutio vya utalii wa ndani, wanyama watano wakubwa, na methali za safari na ukarimu.',
    order: 148,
    orderIndex: 148,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-utalii',
    badge: 'badge-g6-kisw-utalii',
    lessonId: 'lesson-g6-kisw-u4-l1',
    questionIds: [
      'q-g6-kisw-u4-001', 'q-g6-kisw-u4-002', 'q-g6-kisw-u4-003', 'q-g6-kisw-u4-004',
      'q-g6-kisw-u4-005', 'q-g6-kisw-u4-006', 'q-g6-kisw-u4-007', 'q-g6-kisw-u4-008',
      'q-g6-kisw-u4-009', 'q-g6-kisw-u4-010', 'q-g6-kisw-u4-011', 'q-g6-kisw-u4-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u4-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 149: Dira ya Wakati – Nyakati za LI, NA, TA na Hali Timilifu ME',
    description: 'Bobea katika uainishaji na ukanushaji wa wakati uliopita (LI), uliopo (NA), ujao (TA), na hali timilifu (ME).',
    order: 149,
    orderIndex: 149,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-nyakati',
    badge: 'badge-g6-kisw-nyakati',
    lessonId: 'lesson-g6-kisw-u4-l2',
    questionIds: [
      'q-g6-kisw-u4-013', 'q-g6-kisw-u4-014', 'q-g6-kisw-u4-015', 'q-g6-kisw-u4-016',
      'q-g6-kisw-u4-017', 'q-g6-kisw-u4-018', 'q-g6-kisw-u4-019', 'q-g6-kisw-u4-020',
      'q-g6-kisw-u4-021', 'q-g6-kisw-u4-022', 'q-g6-kisw-u4-023', 'q-g6-kisw-u4-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Questions for Units 3 & 4 (48 questions: 24 for Unit 3, 24 for Unit 4)
const questionsToAdd = [
  // ==========================================
  // Unit 3 Lesson 1: Lishe Bora & Afya ya Jamii (q-g6-kisw-u3-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u3-001',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Kituo kidogo cha afya cha ngazi ya kijiji ambacho hutoa huduma za kwanza na chanjo kwa wananchi huitwaje?',
    options: [
      'Zahanati',
      'Uwanja wa ndege',
      'Mahakama',
      'Soko kuu'
    ],
    correctAnswer: 'Zahanati',
    explanation: 'Zahanati (dispensary) ni kituo cha kimsingi cha afya katika ngazi ya kijiji kinachotoa huduma za kwanza, matibabu mepesi na chanjo.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni jina lipi la kituo cha matibabu ya dharura na chanjo kijijini?'
  },
  {
    id: 'q-g6-kisw-u3-002',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Ni ipi kati ya mboga hizi za asili za Kenya inayojulikana kwa kuwa na kiwango kikubwa cha madini ya chuma na virutubisho?',
    options: [
      'Managu',
      'Mihogo mikavu',
      'Mahindi ya kuchoma',
      'Ugali wa ngano'
    ],
    correctAnswer: 'Managu',
    explanation: 'Managu (African nightshade) ni mboga ya asili yenye wingi wa madini ya chuma, kalsiamu na vitamini mwilini.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mboga gani ya kiasili inayopendwa sana Kenya yenye majani meusi kidogo yenye rutuba?'
  },
  {
    id: 'q-g6-kisw-u3-003',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Kamilisha methali ya afya: "Kinga ni bora kuliko __________."',
    options: [
      'tiba',
      'ugonjwa',
      'chakula',
      'usingizi'
    ],
    correctAnswer: 'tiba',
    explanation: '"Kinga ni bora kuliko tiba" inafundisha umuhimu wa kuzuia maradhi kwa usafi na chanjo badala ya kungoja kuugua ndipo utafute matibabu.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, ni heri kuzuia ugonjwa usitokee au kuanza kumeza dawa ukiwa tayari umeshaambukizwa?'
  },
  {
    id: 'q-g6-kisw-u3-004',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Dawa inayopewa watoto wadogo ili kuwakinga dhidi ya magonjwa hatari kama vile polio na surua inaitwaje?',
    options: [
      'Chanjo',
      'Poda',
      'Manukato',
      'Gundi'
    ],
    correctAnswer: 'Chanjo',
    explanation: 'Chanjo (vaccine) huchochea mfumo wa kingamwili kuzuia maambukizi ya virusi na bakteria hatari.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Madaktari wanapowadunga watoto sindano au kuwapa matone ya dawa ya polio, wanatoa huduma gani?'
  },
  {
    id: 'q-g6-kisw-u3-005',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Nahau "kupata nafuu" ina maana gani mgonjwa anapokuwa hospitalini?',
    options: [
      'Kuanza kupona na kujisikia vizuri baada ya kuugua',
      'Kununua bidhaa kwa bei ya chini sokoni',
      'Kulala usingizi wa mang\'amung\'amu',
      'Kutoroka wodini bila ruhusa ya daktari'
    ],
    correctAnswer: 'Kuanza kupona na kujisikia vizuri baada ya kuugua',
    explanation: 'Mgonjwa "akipata nafuu" inamaanisha afya yake inazidi kuimarika na ugonjwa unapungua makali.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Daktari anaposema: "Mgonjwa amepata nafuu," anamaanisha nini kuhusu hali yake ya kiafya?'
  },
  {
    id: 'q-g6-kisw-u3-006',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Ni ugonjwa upi unaosababishwa na ukosefu wa virutubisho vya kutosha na mlo kamili katika mwili wa mtoto?',
    options: [
      'Utapiamlo',
      'Mafua ya msimu',
      'Kuumwa na kichwa kwa dharura',
      'Kuvunjika mfupa mguuni'
    ],
    correctAnswer: 'Utapiamlo',
    explanation: 'Utapiamlo (malnutrition) hutokea wakati mwili unakosa virutubisho vya kutosha (kama vile kwashakoo na marasmasi).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno linalomaanisha upungufu wa lishe bora mwilini ni lipi?'
  },
  {
    id: 'q-g6-kisw-u3-007',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Chagua kundi la vyakula vyenye protini nyingi inayosaidia kujenga mwili na kutengeneza seli mpya:',
    options: [
      'Maharagwe, samaki, mayai na maziwa',
      'Sukari, peremende na soda',
      'Mihogo, magimbi na viazi vikuu pekee',
      'Maji, barafu na chumvi'
    ],
    correctAnswer: 'Maharagwe, samaki, mayai na maziwa',
    explanation: 'Protini hupatikana kwa wingi katika mikunde (maharagwe, kunde, dengu) na mazao ya wanyama (samaki, mayai, maziwa).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni vyakula vipi vya mifugo na jamii ya mikunde vinavyojenga misuli na tishu za mwili?'
  },
  {
    id: 'q-g6-kisw-u3-008',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Mtu anayeugua na kulazwa hospitalini huitwaje katika lugha fasaha ya Kiswahili?',
    options: [
      'Mwele',
      'Mtembezi',
      'Jangili',
      'Mhasibu'
    ],
    correctAnswer: 'Mwele',
    explanation: '"Mwele" (au mwele/mweleka) ni neno sanifu la Kiswahili lenye maana ya mgonjwa mahututi au anayeugua.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi sanifu lenye maana ya mtu anayeugua maradhi?'
  },
  {
    id: 'q-g6-kisw-u3-009',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Ni hatua ipi iliyo muhimu zaidi ya usafi kabla ya kuandaa au kula chakula ili kuzuia magonjwa ya kuhara kama kipindupindu?',
    options: [
      'Kunawa mikono kwa maji safi yanayotiririka na sabuni',
      'Kupulizia mikono marashi ya kunukia',
      'Kufuta mikono kwenye nguo za shule',
      'Kula chakula haraka kabla hakijapoa'
    ],
    correctAnswer: 'Kunawa mikono kwa maji safi yanayotiririka na sabuni',
    explanation: 'Kunawa mikono kwa maji tiririka na sabuni huua vijidudu vinavyosababisha kipindupindu na magonjwa ya matumbo.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni tabia gani ya afya inayotumia maji tiririka na sabuni kutoa vijidudu mikononi?'
  },
  {
    id: 'q-g6-kisw-u3-010',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Soma kifungu: "Daktari alisisitiza kuwa unywaji wa maji safi yaliyochemshwa au yaliyotiwa dawa ya kuua viini huzuia maambukizi ya homa ya matumbo." Neno lipi ni kisawe cha "viini" katika muktadha huu?',
    options: [
      'Bakteria na virusi vya maradhi',
      'Mbegu za mimea shambani',
      'Mchanga uliopo chini ya kisima',
      'Chembe za sukari na chumvi'
    ],
    correctAnswer: 'Bakteria na virusi vya maradhi',
    explanation: 'Katika somo la afya na matibabu, "viini" inamaanisha vijidudu vidogo mno vinavyosababisha maradhi (germs, bacteria, viruses).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Madaktari wanaposema "viini vya maradhi", wanarejelea viumbe gani vinavyosababisha magonjwa?'
  },
  {
    id: 'q-g6-kisw-u3-011',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Ni nahau ipi kati ya hizi inayomaanisha "kufariki dunia au kupoteza uhai"?',
    options: [
      'Kukata roho',
      'Kukata kauli',
      'Kukata tamaa',
      'Kukata shauri'
    ],
    correctAnswer: 'Kukata roho',
    explanation: '"Kukata roho" ni nahau yenye maana ya kuaga dunia au kufariki.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni nahau ipi inayotumia neno "roho" kumaanisha uhai unapofikia kikomo?'
  },
  {
    id: 'q-g6-kisw-u3-012',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l1',
    text: 'Ujumbe: "Mtoto alipatiwa maziwa ya mama kwa miezi sita ya kwanza bila kupewa chakula kingine chochote." Hali hii inaitwaje kitaalamu katika Kiswahili sanifu?',
    options: [
      'Unyonyeshaji wa kipekee',
      'Ulishaji wa mseto',
      'Uzuiaji wa njaa ya dharura',
      'Upishi wa kienyeji'
    ],
    correctAnswer: 'Unyonyeshaji wa kipekee',
    explanation: '"Unyonyeshaji wa kipekee" (exclusive breastfeeding) ni kumpa mtoto maziwa ya mama pekee kwa miezi sita ya mwanzo bila chakula kingine wala maji.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi la Kiswahili linalotafsiri neno la Kiingereza "exclusive breastfeeding"?'
  },

  // ==========================================
  // Unit 3 Lesson 2: Ngeli za I-I, U-U, KU na PA-MU-KU (q-g6-kisw-u3-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u3-013',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Nomino "chumvi" na "sukari" zimo katika ngeli gani katika Kiswahili sanifu?',
    options: [
      'I-I',
      'A-WA',
      'LI-YA',
      'KI-VI'
    ],
    correctAnswer: 'I-I',
    explanation: 'Nomino za vitu visivyohesabika kama vile chumvi, sukari, chai, na hali ya hewa huingia katika ngeli ya I-I (Chumvi imemwagika).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Sukari na chumvi hazina umoja wala wingi, na huchukua kiambishi "i-": "Sukari imeyeyuka". Hiyo ni ngeli gani?'
  },
  {
    id: 'q-g6-kisw-u3-014',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Kamilisha sentensi ifuatayo kwa usahihi: "Upendo wa mama __________ furaha tele moyoni."',
    options: [
      'unaleta',
      'inaleta',
      'zinaleta',
      'kinaleta'
    ],
    correctAnswer: 'unaleta',
    explanation: 'Nomino "upendo" imo katika ngeli ya U-U (dhahania). Upatanisho wake huchukua kiambishi "u-": "Upendo unaleta."',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: '"Upendo" ni nomino ya sifa katika ngeli ya U-U. Ni kiambishi gani kinachotakiwa kwenye kitenzi?'
  },
  {
    id: 'q-g6-kisw-u3-015',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Katika sentensi: "Kusoma kwake kunapendeza sana," neno "kusoma" linaingia katika ngeli gani?',
    options: [
      'KU (Kitenzi-Jina)',
      'A-WA',
      'KI-VI',
      'U-I'
    ],
    correctAnswer: 'KU (Kitenzi-Jina)',
    explanation: 'Vitenzi vilivyogeuzwa kuwa majina kwa kuanza na "ku-" (kama kusoma, kucheza, kulala) huingia katika ngeli ya KU (kitenzi-jina).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kitenzi kilichofanywa kuwa nomino kinachoanza na "ku-" huingia katika ngeli gani?'
  },
  {
    id: 'q-g6-kisw-u3-016',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Ni kiambishi kipi cha ngeli ya mahali kinachotumika kuonyesha mahali maalum pa karibu panapodhihirika wazi?',
    options: [
      'PA (k.m. Hapa panapendeza)',
      'MU (k.m. Humu muna giza)',
      'KU (k.m. Kule kuna mbali)',
      'KI (k.m. Kiti kimevunjika)'
    ],
    correctAnswer: 'PA (k.m. Hapa panapendeza)',
    explanation: 'Ngeli ya PA-PA huonyesha mahali maalum pa karibu panapobainika wazi (mahali pabainifu).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ukionyesha mahali hapa karibu kabisa unapotazama, unatumia neno gani: hapa, humu au kule?'
  },
  {
    id: 'q-g6-kisw-u3-017',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Chagua sentensi inayoonyesha upatanisho sahihi wa ngeli ya MU-MU (mahali pa ndani):',
    options: [
      'Humu chumbani muna hewa safi na baridi.',
      'Humu chumbani pana hewa safi na baridi.',
      'Humu chumbani kuna hewa safi na baridi.',
      'Humu chumbani zina hewa safi na baridi.'
    ],
    correctAnswer: 'Humu chumbani muna hewa safi na baridi.',
    explanation: 'Ngeli ya MU-MU hurejelea mahali pa ndani (kama chumbani au shimoni), kwa hivyo upatanisho unachukua "muna": "Humu chumbani muna hewa safi."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika ngeli ya MU-MU, kiambishi cha upatanisho ni "mu-" katika maneno yote.'
  },
  {
    id: 'q-g6-kisw-u3-018',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Ni jozi ipi ya nomino ambapo maneno yote mawili yamo katika ngeli ya U-U (dhahania)?',
    options: [
      'Ukarimu na uvivu',
      'Mti na mkate',
      'Kitabu na kiti',
      'Chai na sukari'
    ],
    correctAnswer: 'Ukarimu na uvivu',
    explanation: '"Ukarimu" na "uvivu" ni majina ya tabia au hali dhahania yanayoanza na u-, hayana wingi na huchukua upatanisho wa ngeli ya U-U.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta nomino za sifa au tabia zinazoanza na herufi "u-" ambazo haziwezi kuhesabika kwa wingi.'
  },
  {
    id: 'q-g6-kisw-u3-019',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Kamilisha sentensi kwa kiwakilishi kionyeshi sahihi cha mbali katika ngeli ya KU-KU (mahali kusikobainika): "__________ mlimani kuna ukungu mzito."',
    options: [
      'Kule',
      'Humu',
      'Hapa',
      'Yale'
    ],
    correctAnswer: 'Kule',
    explanation: 'Katika ngeli ya KU-KU ya mahali pa mbali au kusikobainika, kionyeshi cha mbali ni "kule": "Kule mlimani kuna ukungu mzito."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kionyeshi kipi cha mahali pa mbali kinachoanza na "ku-"?'
  },
  {
    id: 'q-g6-kisw-u3-020',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Sentensi ipi inayotumia nomino ya ngeli ya I-I kwa usahihi?',
    options: [
      'Chai hii imetiwa tangawizi na maziwa.',
      'Chai huu umetiwa tangawizi na maziwa.',
      'Chai hili limetiwa tangawizi na maziwa.',
      'Chai hiki kimetiwa tangawizi na maziwa.'
    ],
    correctAnswer: 'Chai hii imetiwa tangawizi na maziwa.',
    explanation: 'Nomino "chai" imo katika ngeli ya I-I, ikichukua kionyeshi "hii" na kiambishi "i-": "Chai hii imetiwa."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kiambishi cha upatanisho cha ngeli ya I-I ni kipi kwenye maneno "hii" na "imetiwa"?'
  },
  {
    id: 'q-g6-kisw-u3-021',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Tathmini sentensi: "Kuimba kule kuliwafurahisha wageni wote." Kifungu "kuimba kule" kinatekeleza dhima gani ya kisarufi?',
    options: [
      'Kitenzi-jina kinachofanya kazi kama kiima cha sentensi katika ngeli ya KU',
      'Kielezi cha mahali pa ndani katika ngeli ya MU',
      'Kivumishi cha idadi katika ngeli ya A-WA',
      'Nomino ya wingi katika ngeli ya LI-YA'
    ],
    correctAnswer: 'Kitenzi-jina kinachofanya kazi kama kiima cha sentensi katika ngeli ya KU',
    explanation: '"Kuimba" ni kitenzi-jina (infinitive/gerund) kilicho katika ngeli ya KU na kinatumika hapa kama kiima (subject) kinachotawala kitenzi "kuliwafurahisha".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni aina gani ya neno inayotokana na kitenzi na kufanya kazi kama nomino/kiima?'
  },
  {
    id: 'q-g6-kisw-u3-022',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Bainisha sentensi yenye upatanisho usio sahihi wa ngeli za mahali:',
    options: [
      'Humu shimoni pana nyoka mwenye sumu.',
      'Humu shimoni muna nyoka mwenye sumu.',
      'Hapa uwanjani pana wachezaji wengi.',
      'Kule shambani kuna mazao mengi.'
    ],
    correctAnswer: 'Humu shimoni pana nyoka mwenye sumu.',
    explanation: 'Sentensi hii inachanganya ngeli ya ndani (Humu) na upatanisho wa karibu/pabainifu (pana). Usahihi ni: "Humu shimoni muna..." au "Hapa shimoni pana...".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Angalia kama kiashiria "Humu" kinapatana na kitenzi "pana". Je, "mu-" na "pa-" vinapaswa kuchanganywa?'
  },
  {
    id: 'q-g6-kisw-u3-023',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Kwa nini nomino "uzuri" na "ukweli" hazina maumbo ya wingi katika ngeli ya U-U?',
    options: [
      'Kwa sababu ni nomino za dhahania (hali/dhana zisizoshikika wala kuhesabika)',
      'Kwa sababu zilikopwa kutoka lugha za kigeni',
      'Kwa sababu zinarejelea viumbehai wadogo mno',
      'Kwa sababu herufi zake haziruhusu kuongeza kiambishi kingine'
    ],
    correctAnswer: 'Kwa sababu ni nomino za dhahania (hali/dhana zisizoshikika wala kuhesabika)',
    explanation: 'Nomino dhahania (abstract nouns) huwakilisha fikra, sifa, hisia au hali ambazo haziwezi kushikika mkononi wala kuhesabika, hivyo hazina wingi.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, sifa kama vile uzuri au ukweli zinaweza kushikika mkononi au kuhesabika moja, mbili, tatu?'
  },
  {
    id: 'q-g6-kisw-u3-024',
    subStrandId: 'substrand-g6-kisw-u3',
    lessonId: 'lesson-g6-kisw-u3-l2',
    text: 'Unganisha sentensi hizi mbili kuwa moja ukitumia kitenzi-jina katika ngeli ya KU:\n"Watoto walifanya mazoezi asubuhi. Jambo hilo liliwapa afya njema."',
    options: [
      'Kufanya mazoezi asubuhi kuliwapa watoto afya njema.',
      'Watoto walifanya mazoezi na hapa pana afya njema.',
      'Mazoezi yalifanywa kwa sababu ya afya ya watoto.',
      'Ufanyaji wa mazoezi yote yaliwapa watoto afya njema.'
    ],
    correctAnswer: 'Kufanya mazoezi asubuhi kuliwapa watoto afya njema.',
    explanation: 'Kitenzi "walifanya" kimegeuzwa kuwa kitenzi-jina "kufanya mazoezi" katika ngeli ya KU, kikiwa kiima kinachotawala "kuliwapa".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Geuza kitendo "kufanya mazoezi" kuwa mwanzo (kiima) wa sentensi mpya.'
  },

  // ==========================================
  // Unit 4 Lesson 1: Utalii wa Ndani & Maliasili (q-g6-kisw-u4-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u4-001',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Mtu anayeua wanyamapori kinyume cha sheria kwa ajili ya biashara haramu ya pembe na ngozi huitwaje?',
    options: [
      'Jangili',
      'Mlinzi',
      'Mtalii',
      'Mwelekezi'
    ],
    correctAnswer: 'Jangili',
    explanation: '"Jangili" (poacher) ni mtu anayewinda na kuua wanyamapori kisiri na bila kibali cha kisheria.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi la Kiswahili lenye maana ya mwindaji haramu wa wanyamapori?'
  },
  {
    id: 'q-g6-kisw-u4-002',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Ni hifadhi ipi nchini Kenya inayojulikana duniani kote kwa uhamaji mkubwa wa maelfu ya nyumbu kila mwaka?',
    options: [
      'Hifadhi ya Maasai Mara',
      'Hifadhi ya Mlima Longonot',
      'Msitu wa Arabuko Sokoke',
      'Hifadhi ya Kisiwa cha Rusinga'
    ],
    correctAnswer: 'Hifadhi ya Maasai Mara',
    explanation: 'Hifadhi ya Maasai Mara hushuhudia uhamaji mkubwa wa nyumbu (Wildebeest Migration) kutoka Serengeti, mojawapo ya maajabu ya dunia.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mbuga gani maarufu ya Narok inayopakana na Serengeti ambako nyumbu huvuka mto Mara?'
  },
  {
    id: 'q-g6-kisw-u4-003',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Kamilisha methali inayohusu safari: "Kutembea kwingi ni __________."',
    options: [
      'kuona mengi',
      'kuchoka sana',
      'kupoteza njia',
      'kutumia pesa'
    ],
    correctAnswer: 'kuona mengi',
    explanation: '"Kutembea kwingi ni kuona mengi" inafundisha kuwa kusafiri humfungua mtu macho na kumpa maarifa na hekima tele.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu anaposafiri sehemu nyingi mbalimbali, nini kinachompata kimaarifa?'
  },
  {
    id: 'q-g6-kisw-u4-004',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Ni wanyama wepi wanaounda orodha ya "Wanyamapori Watano Wakubwa" (Big Five) nchini Kenya?',
    options: [
      'Simba, Tembo (Ndovu), Kifaru, Chui na Nyati',
      'Twiga, Swala, Pundamilia, Sungura na Fisi',
      'Mamba, Kiboko, Mbuni, Tumbili na Kima',
      'Paa, Panya, Bundi, Mwewe na Kanga'
    ],
    correctAnswer: 'Simba, Tembo (Ndovu), Kifaru, Chui na Nyati',
    explanation: 'Wanyama watano wakubwa wa kitalii ni Simba, Ndovu (Tembo), Kifaru, Chui na Nyati.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Orodha ya Big Five inajumuisha simba, tembo, chui, nyati na mnyama gani mwingine mwenye pembe puani?'
  },
  {
    id: 'q-g6-kisw-u4-005',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Utalii wa ndani una faida gani kubwa zaidi kwa wananchi wa Kenya?',
    options: [
      'Unawafanya wananchi wazielewe na kuzithamini maliasili za taifa lao na kukuza uchumi',
      'Unawafanya wanyamapori wawe wanyama wa kufugwa nyumbani',
      'Unawazuia watalii wa ng\'ambo wasije nchini',
      'Unapunguza idadi ya ndege na wanyama mbugani'
    ],
    correctAnswer: 'Unawafanya wananchi wazielewe na kuzithamini maliasili za taifa lao na kukuza uchumi',
    explanation: 'Utalii wa ndani hujenga uzalendo, huelemisha wananchi kuhusu utajiri wa nchi yao, na husaidia kukuza biashara na ajira nchini.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, wakenya wanapotembelea mbuga zao za wanyama, hilo huongeza uzalendo na elimu au hulete madhara?'
  },
  {
    id: 'q-g6-kisw-u4-006',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Kivutio maarufu cha kihistoria kilichopo kisiwani Mombasa kilichojengwa na Wareno mnamo karne ya kumi na sita kinaitwaje?',
    options: [
      'Ngome ya Yesu (Fort Jesus)',
      'Mnara wa KICC',
      'Gedi Ruins pekee',
      'Hekalu la Bomas of Kenya'
    ],
    correctAnswer: 'Ngome ya Yesu (Fort Jesus)',
    explanation: 'Ngome ya Yesu (Fort Jesus) kule Mombasa ilijengwa na Wareno (1593–1596) na ni kivutio kikubwa cha kihistoria kilichotambuliwa na UNESCO.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni boma gani maarufu la kale la mawe mjini Mombasa lililojengwa na Wareno kulinda bandari?'
  },
  {
    id: 'q-g6-kisw-u4-007',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Methali: "Mgeni njoo, mwenyeji apone." Inasisitiza nini kuhusu sekta ya utalii nchini?',
    options: [
      'Wageni wanaotembelea nchi huleta fedha za kigeni na kukuza mapato ya wenyeji',
      'Mwenyeji huwa mgonjwa hadi mgeni atakapofika',
      'Mgeni lazima awape wenyeji dawa zote anazosafiri nazo',
      'Mwenyeji hapaswi kumpikia mgeni chakula chochote'
    ],
    correctAnswer: 'Wageni wanaotembelea nchi huleta fedha za kigeni na kukuza mapato ya wenyeji',
    explanation: 'Methali hii inaonyesha kuwa ugeni na utalii huleta fursa za kiuchumi, biashara na ustawi kwa jamii inayowapokea.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Watalii wanapofika kwenye jamii yetu, wao hununua vitu na kuacha faida gani za kiuchumi?'
  },
  {
    id: 'q-g6-kisw-u4-008',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Mtaalamu anayewaongoza watalii mbugani na kuwafahamisha majina ya ndege na wanyama huitwaje?',
    options: [
      'Mwongoza watalii',
      'Mwindaji haramu',
      'Mkurugenzi wa benki',
      'Dereva wa teksi tu'
    ],
    correctAnswer: 'Mwongoza watalii',
    explanation: '"Mwongoza watalii" (tour guide) ni mtaalamu aliyefunzwa maelezo ya mazingira, wanyama na historia ya maeneo ya kitalii.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mtu gani anayewapa wageni maelekezo na taarifa za vivutio wanapotembelea mbugani?'
  },
  {
    id: 'q-g6-kisw-u4-009',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Ni hatua ipi inayochukuliwa na Shirika la Huduma ya Wanyamapori la Kenya (KWS) kukomesha ujangili mbugani?',
    options: [
      'Kutumia ndege zisizo na rubani na walinzi wenye silaha kushika doria mbugani',
      'Kuuza wanyamapori wote kwa nchi za ng\'ambo',
      'Kukata miti yote ili kuona majangili kwa urahisi',
      'Kuruhusu wananchi kuwinda wanyama wakati wa usiku'
    ],
    correctAnswer: 'Kutumia ndege zisizo na rubani na walinzi wenye silaha kushika doria mbugani',
    explanation: 'KWS hutumia teknolojia ya kisasa kama vile ndege zisizo na rubani (drones), ufuatiliaji wa satelaiti na askari doria wenye silaha kulinda wanyama.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni njia gani ya kisasa na ya kiusalama inayotumiwa na maafisa wa KWS kulinda mbuga zetu?'
  },
  {
    id: 'q-g6-kisw-u4-010',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Soma maelezo haya: "Hifadhi hii iko chini ya Mlima Kilimanjaro na inasifika kwa kuwa na makundi makubwa ya ndovu na ardhi ya kinamasi." Hifadhi hii ni ipi?',
    options: [
      'Hifadhi ya Amboseli',
      'Hifadhi ya Ziwa Bogoria',
      'Mbuga ya Meru',
      'Hifadhi ya Sibiloi'
    ],
    correctAnswer: 'Hifadhi ya Amboseli',
    explanation: 'Hifadhi ya Kitaifa ya Amboseli katika Kaunti ya Kajiado inajulikana kwa makundi ya tembo na mandhari maridadi ya Mlima Kilimanjaro.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni hifadhi ipi ya wanyama iliyo katika Kaunti ya Kajiado inayopakana na Mlima Kilimanjaro?'
  },
  {
    id: 'q-g6-kisw-u4-011',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Neno lipi la Kiswahili lenye maana ya "mahali pa kulala na kupumzika wageni wanaposafiri kitalii"?',
    options: [
      'Malazi',
      'Mashapo',
      'Mawaidha',
      'Madhabahu'
    ],
    correctAnswer: 'Malazi',
    explanation: '"Malazi" ni mahali pa kulala na kupumzika (accommodation) kama vile vyumba vya hoteli au nyumba za kulala wageni.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno hili linatokana na kitenzi "lala". Ni neno gani?'
  },
  {
    id: 'q-g6-kisw-u4-012',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l1',
    text: 'Methali: "Mwenda tezi na omo marejeo ni ngamani." Inatoa funzo gani kwa wasafiri na watalii?',
    options: [
      'Mtu asafiriye mbali kiasi gani hatimaye atarejea nyumbani kwao',
      'Wasafiri wote wanapaswa kusafiri kwa jahazi na mashua pekee',
      'Mtu anayesafiri hawezi kurudi kamwe kijijini',
      'Bahari ni mahali pa hatari kwa wasafiri wote'
    ],
    correctAnswer: 'Mtu asafiriye mbali kiasi gani hatimaye atarejea nyumbani kwao',
    explanation: 'Methali hii inatufunza kwamba popote mwanadamu atakapozunguka na kusafiri ulimwenguni, mwisho wa safari ni kurejea asili yake (nyumbani).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika sehemu za merikebu, ngamani ni katikati ambapo maji hutulia. Hii inafananishwa na kurudi wapi?'
  },

  // ==========================================
  // Unit 4 Lesson 2: Nyakati za LI, NA, TA na Hali Timilifu ME (q-g6-kisw-u4-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u4-013',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Ni kiambishi kipi cha wakati kinachoonyesha kuwa tendo lilifanyika zamani (wakati uliopita)?',
    options: [
      '-LI-',
      '-NA-',
      '-TA-',
      '-ME-'
    ],
    correctAnswer: '-LI-',
    explanation: 'Kiambishi cha wakati uliopita ni "-li-" (k.m. Walisafiri, alitembelea).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika sentensi: "Mwanafunzi alisoma kitabu jana," ni herufi gani zinazoonyesha wakati uliopita?'
  },
  {
    id: 'q-g6-kisw-u4-014',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Kanusha sentensi ifuatayo ya wakati uliopita: "Wageni walifika jana jioni."',
    options: [
      'Wageni hawakufika jana jioni.',
      'Wageni hawajafika jana jioni.',
      'Wageni hawafiki jana jioni.',
      'Wageni hawatofika jana jioni.'
    ],
    correctAnswer: 'Wageni hawakufika jana jioni.',
    explanation: 'Wakati uliopita (LI) unakanushwa kwa kiambishi "KU" baada ya kiambishi cha ukanusho: "walifika" -> "hawakufika".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kiambishi cha ukanusho wa wakati uliopita baada ya "ha-" ni "ku-". Sentensi itakuwaje?'
  },
  {
    id: 'q-g6-kisw-u4-015',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Sentensi ipi iliyo katika wakati ujao (kiambishi -TA-)?',
    options: [
      'Tutasafiri kwa treni ya SGR kuelekea Mombasa.',
      'Tunasafiri kwa treni ya SGR sasa hivi.',
      'Tulisafiri kwa treni ya SGR wiki iliyopita.',
      'Tumefika Mombasa salama jioni hii.'
    ],
    correctAnswer: 'Tutasafiri kwa treni ya SGR kuelekea Mombasa.',
    explanation: 'Wakati ujao huwakilishwa na kiambishi "-ta-": "Tutasafiri."',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta kitenzi chenye kiambishi "-ta-" kinachoonyesha tendo litakalofanyika baadaye.'
  },
  {
    id: 'q-g6-kisw-u4-016',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Katika sentensi: "Ndege ya watalii imetua uwanjani," kitenzi "imetua" kiko katika hali gani?',
    options: [
      'Hali Timilifu (ME)',
      'Wakati Uliopita (LI)',
      'Wakati Ujao (TA)',
      'Hali ya Mazoea (HU)'
    ],
    correctAnswer: 'Hali Timilifu (ME)',
    explanation: 'Kiambishi "-me-" huonyesha hali timilifu (perfect aspect), yaani tendo limekamilika na athari yake ipo sasa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama kiambishi "-me-" katika "imetua". Hicho ni kiambishi cha hali gani?'
  },
  {
    id: 'q-g6-kisw-u4-017',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Hali timilifu "ME" inapokanushwa hubadilika kuwa kiambishi gani?',
    options: [
      '-JA- (k.m. Amekula -> Hajala)',
      '-KU- (k.m. Amekula -> Hakula)',
      '-TA- (k.m. Amekula -> Hatakula)',
      '-SI- (k.m. Amekula -> Asile)'
    ],
    correctAnswer: '-JA- (k.m. Amekula -> Hajala)',
    explanation: 'Hali timilifu (ME) inakanushwa kwa kiambishi "JA" (Amesoma -> Hajasoma; Wamefika -> Hawajafika).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno "Amemaliza" likikanushwa huwa "Ha...maliza"? Herufi zipi zinazoingia hapo?'
  },
  {
    id: 'q-g6-kisw-u4-018',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Kanusha sentensi hii ya wakati uliopo: "Mwanafunzi anasoma kitabu cha Kiswahili sasa."',
    options: [
      'Mwanafunzi hasomi kitabu cha Kiswahili sasa.',
      'Mwanafunzi hakusoma kitabu cha Kiswahili sasa.',
      'Mwanafunzi hatasoma kitabu cha Kiswahili sasa.',
      'Mwanafunzi hajasoma kitabu cha Kiswahili sasa.'
    ],
    correctAnswer: 'Mwanafunzi hasomi kitabu cha Kiswahili sasa.',
    explanation: 'Wakati uliopo unakanushwa kwa kuondoa kiambishi "na-" na kubadilisha herufi ya mwisho ya kitenzi cha Kibantu kuwa "i": "anasoma" -> "hasomi".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika kukanusha wakati uliopo, "anasoma" hubadilika na kuishia na herufi "i": "ha...".'
  },
  {
    id: 'q-g6-kisw-u4-019',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Kanusha sentensi ya hali timilifu: "Walinzi wa KWS wamewakamata majangili wote."',
    options: [
      'Walinzi wa KWS hawajawakamata majangili wote.',
      'Walinzi wa KWS hawakuwakamata majangili wote.',
      'Walinzi wa KWS hawawakamati majangili wote.',
      'Walinzi wa KWS hawatawakamata majangili wote.'
    ],
    correctAnswer: 'Walinzi wa KWS hawajawakamata majangili wote.',
    explanation: '"Wamewakamata" (hali timilifu ME) inapokanushwa inakuwa "hawajawakamata" (kiambishi JA).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Badilisha kiambishi cha hali timilifu "me-" kiwe "ja-" na ongeza kikanushi "ha-".'
  },
  {
    id: 'q-g6-kisw-u4-020',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Badilisha sentensi ifuatayo kutoka wakati uliopo hadi wakati ujao:\n"Simba mkali anawinda swala mbugani."',
    options: [
      'Simba mkali atawinda swala mbugani.',
      'Simba mkali aliwinda swala mbugani.',
      'Simba mkali amewinda swala mbugani.',
      'Simba mkali huwinda swala mbugani.'
    ],
    correctAnswer: 'Simba mkali atawinda swala mbugani.',
    explanation: 'Ili kubadilisha kutoka wakati uliopo (-na-) hadi wakati ujao, kiambishi hubadilishwa kuwa "-ta-": "atawinda".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Badilisha kiambishi "-na-" kiwe kiambishi cha wakati ujao "-ta-".'
  },
  {
    id: 'q-g6-kisw-u4-021',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Ni sentensi ipi kati ya hizi iliyokanushwa VIBAYA?',
    options: [
      'Watalii wamelala hotelini -> Watalii hawakulala hotelini.',
      'Watalii wamelala hotelini -> Watalii hawajalala hotelini.',
      'Watalii wanalala hotelini -> Watalii hawalali hotelini.',
      'Watalii watalala hotelini -> Watalii hawatalala hotelini.'
    ],
    correctAnswer: 'Watalii wamelala hotelini -> Watalii hawakulala hotelini.',
    explanation: '"Wamelala" iko katika hali timilifu (ME) na ukanusho wake sahihi ni "hawajalala" (JA), sio "hawakulala" ambayo ni ukanusho wa wakati uliopita (walilala).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kumbuka kuwa hali timilifu ME inakanushwa kwa JA, siyo KU!'
  },
  {
    id: 'q-g6-kisw-u4-022',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Tenga viambishi vya kitenzi: "Alitupikia"\nNi mgawanyiko upi ulio sahihi?',
    options: [
      'A- (nafsi) + -li- (wakati uliopita) + -tu- (yambwa/kitendwa) + -piki- (mzizi) + -a (kiishio)',
      'Ali- (kitenzi) + tu- (wakati) + pikia (jina)',
      'A- (ngeli) + lジェ (wakati) + tupikia (nomino)',
      'Ali- + tupi- + kia'
    ],
    correctAnswer: 'A- (nafsi) + -li- (wakati uliopita) + -tu- (yambwa/kitendwa) + -piki- (mzizi) + -a (kiishio)',
    explanation: 'Uchanganuzi sahihi wa viambishi: A- (kiambishi cha nafsi), -li- (kiambishi cha wakati uliopita), -tu- (kiambishi cha mtendwa/yambwa sisi), -piki- (mzizi wa mnyambuliko), -a (kiishio).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Changanua: Ni kipi kiambishi cha nafsi, kipi cha wakati uliopita, kipi cha yambwa, na kipi ni mzizi?'
  },
  {
    id: 'q-g6-kisw-u4-023',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Kitenzi "kusahau" (ambacho asili yake si ya Kibantu) kinapokanushwa katika wakati uliopo huwa vipi?',
    options: [
      'Hasahau (hakibadiliki kuwa "hasahai")',
      'Hasahai',
      'Hakusahau',
      'Hajasahau'
    ],
    correctAnswer: 'Hasahau (hakibadiliki kuwa "hasahai")',
    explanation: 'Vitenzi visivyo vya asili ya Kibantu (kama vile sahau, samehe, tubu, jibu) haviishi na "i" wakati wa kukanusha katika wakati uliopo: "hasahau", "hasamehe", "hajibu".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, vitenzi vya asili ya kigeni kama "sahau" au "samehe" vinabadilisha herufi ya mwisho kuwa "i" vinapokanushwa?'
  },
  {
    id: 'q-g6-kisw-u4-024',
    subStrandId: 'substrand-g6-kisw-u4',
    lessonId: 'lesson-g6-kisw-u4-l2',
    text: 'Soma sentensi hii: "Juma anapenda utalii lakini kaka yake hapendi safari." Sentensi hii inaonyesha uhusiano gani wa nyakati na ukanushaji?',
    options: [
      'Sentensi changamano yenye kitenzi kiyakinifu na kikanushi vyote katika wakati uliopo',
      'Kitenzi cha kwanza kiko wakati ujao na cha pili kiko wakati uliopita',
      'Sentensi nzima iko katika hali timilifu ya ME',
      'Kitenzi cha pili kiko katika hali ya masharti'
    ],
    correctAnswer: 'Sentensi changamano yenye kitenzi kiyakinifu na kikanushi vyote katika wakati uliopo',
    explanation: '"Anapenda" ni kitenzi kiyakinishi cha wakati uliopo na "hapendi" ni kikanushi chake cha wakati uliopo, vikiunganishwa na kiunganishi "lakini".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama "anapenda" (kuyakinisha) na "hapendi" (kukanusha) - vyote viko katika wakati gani?'
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
console.log('Batch 2 of Grade 6 Kiswahili Lugha successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
