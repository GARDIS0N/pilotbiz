import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 Kiswahili Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-kisw-u5',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Usalama Barabarani na Vivumishi Visivyobadilika',
    description: 'Kusoma kuhusu kanuni za usalama barabarani na alama za trafiki nchini Kenya; kutambua msamiati wa usafiri (kivukio cha watembea kwa miguu, taa za trafiki, matatu, feri, gari-moshi); kubainisha vivumishi vya sifa (-zuri, -baya, -refu) na vivumishi visivyobadilika (safi, bora, ghali, tele, duni, kamili) katika sentensi fasaha.',
    cbeCompetency: 'Ufahamu wa stadi za usalama barabarani, utambuzi na matumizi sahihi ya vivumishi visivyobadilika na vya sifa, na utungaji wa sentensi kamilifu',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g5-kisw-u6',
    strandId: 'strand-g5-kisw-kusoma',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Wanyamapori Wetu, Misitu na Ngeli ya U-YA / U-ZI',
    description: 'Kusoma taarifa kuhusu urithi wa wanyamapori wa Kenya (simba, ndovu, kifaru, chui, twiga), makinda yao, na huduma ya KWS; kuelewa umuhimu wa mbuga za kitaifa (Maasai Mara, Amboseli, Tsavo); kubainisha nomino za ngeli ya U-YA na U-ZI (ukuta/kuta, ufa/nyufa, wimbo/nyimbo, ua/maua) na upatanisho wake wa kisarufi.',
    cbeCompetency: 'Uzalendo na uthamini wa mazingira ya wanyamapori, ufahamu wa kina wa ngeli za U-YA na U-ZI, na ufasaha wa kusoma hadithi na makala',
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
    id: 'lesson-g5-kisw-u5-l1',
    subStrandId: 'substrand-g5-kisw-u5',
    title: 'Kanuni za Usalama Barabarani na Alama za Trafiki',
    content: 'Usalama barabarani humlinda mtembea kwa miguu, abiria, na dereva dhidi ya majeraha na ajali hatari. Wanafunzi wa Kenya wanapaswa kuelewa na kutii sheria za trafiki:\n\n1. Alama Muhimu za Barabarani:\n- Kivukio cha Pundamilia (Zebra Crossing): Mistari myeupe na myeusi iliyopakwa barabarani ambapo magari yanapaswa kusimama ili kuruhusu watembea kwa miguu kuvuka kwa usalama.\n- Taa za Trafiki (Mwangaza wa Trafiki):\n  * Taa Nyekundu: Simama mara moja!\n  * Taa ya Manjano / Kahawia: Jiandae kusimama au kuanza safari.\n  * Taa ya Kijani: Ruhusa kuendelea na safari.\n- King\'ora na Magari ya Dharura: Gari la wagonjwa (Ambulensi) au gari la zima moto linapopiga king\'ora, magari mengine yanapaswa kupisha njia mara moja.\n\n2. Maadili na Kanuni za Usalama:\n- Angalia kulia, kisha kushoto, kisha kulia tena kabla ya kuvuka barabara.\n- Usicheze mpira wala kukimbia kando ya barabara yenye magari mengi.\n- Funga mkanda wa usalama unapopanda gari au matatu.\n- Vaa kofia ngumu ya chuma (helmet) unaposafiri kwa pikipiki (boda-boda) au baiskeli.',
    didYouKnow: 'Kivukio cha watembea kwa miguu kilipewa jina la "pundamilia" kwa sababu mistari yake myeupe na myeusi inafanana kabisa na milia ya mnyama pundamilia anayepatikana katika mbuga za Kenya!',
    kenyanContext: 'Katika jiji la Nairobi, Mombasa na Kisumu, polisi wa trafiki na walinzi wa watoto huwasaidia wanafunzi wa shule za msingi kuvuka barabara kuu asubuhi wakati magari yanapokuwa mengi.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u5-l2',
    subStrandId: 'substrand-g5-kisw-u5',
    title: 'Vivumishi Visivyobadilika na Vivumishi vya Sifa',
    content: 'Vivumishi ni maneno yanayotoa maelezo zaidi kuhusu nomino. Katika Kiswahili kuna makundi mawili makuu ya vivumishi vya sifa:\n\n1. Vivumishi Vinavyobadilika (Vivumishi Asilia vya Kibantu):\n- Huchukua viambishi vya ngeli kulingana na nomino inayovumishwa.\n- Shina: -zuri, -baya, -refu, -fupi, -kubwa, -dogo, -tamu, -kali.\n- Mfano: Mtu mzuri / Watu wazuri; Mti mrefu / Miti mirefu; Nyumba ndogo / Nyumba ndogo.\n\n2. Vivumishi Visivyobadilika (Vivumishi vya Asili ya Kigeni/Kiarabu):\n- Havibadiliki kamwe; vinabaki na umbo lile lile katika umoja, wingi, na ngeli zote bila kuongezwa viambishi vya upatanisho!\n- Mifano ya Vivumishi Visivyobadilika:\n  * Safi: "Maji safi / Mavazi safi / Chumba safi"\n  * Bora: "Chakula bora / Shule bora / Wanafunzi bora"\n  * Ghali: "Gari ghali / Nguo ghali / Simu ghali"\n  * Tele: "Mavuno tele / Watu tele / Maji tele"\n  * Duni: "Vifaa duni / Nyumba duni"\n  * Rahisi: "Mtihani rahisi / Kazi rahisi"\n  * Kamili: "Mlo kamili / Saa kamili"\n  * Hodari: "Mwanariadha hodari / Wanafunzi hodari"',
    didYouKnow: 'Vivumishi visivyobadilika kama vile "bora", "safi", na "ghali" ni rahisi sana kutumia kwa sababu haubadilishi hata herufi moja iwe unazungumzia ngeli ya A-WA, KI-VI au I-ZI!',
    kenyanContext: 'Mchuuzi wa soko la Kongowea mjini Mombasa husema: "Nauza maembe bora na parachichi safi kwa bei nafuu sana!"',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u6-l1',
    subStrandId: 'substrand-g5-kisw-u6',
    title: 'Wanyamapori Wetu, Makinda yao na Uhifadhi wa Mbuga',
    content: 'Kenya imebarikiwa kuwa na utajiri mkubwa wa wanyamapori na hifadhi za kitaifa zinazovutia watalii kutoka pembe zote za dunia:\n\n1. Majina ya Wanyama na Makinda Yao (Watoto Wao):\n- Ndovu (Tembo) -> Kinda lake huitwa Ndama wa Tembo.\n- Simba -> Mtoto wake huitwa Shibli.\n- Farasi -> Mtoto wake huitwa Mwanafarasi.\n- Mbwa -> Mtoto wake huitwa Kidue au Mbwa mdogo.\n- Kuku -> Mtoto wake huitwa Vifaranga.\n- Bata -> Kinda la bata.\n\n2. Wanyama Wakubwa Watano (The Big Five) wa Kenya:\n- Simba (Mfalme wa nyika), Ndovu (Mnyama mkubwa zaidi nchi kavu), Kifaru (Mwenye pembe ya thamani), Chui (Mwindaji stadi wa usiku mwenye madoadoa), na Nyati (Mkali na mwenye nguvu).\n\n3. Hifadhi za Wanyamapori na Utalii:\n- Mbuga ya Kitaifa ya Maasai Mara (inayosifika kwa uhamiaji mkubwa wa nyumbu).\n- Mbuga ya Amboseli (chini ya mlima Kilimanjaro yenye makundi makubwa ya ndovu).\n- Shirika la Huduma ya Wanyamapori Kenya (KWS) huwalinda wanyama dhidi ya wawindaji haramu (majangili).',
    didYouKnow: 'Mtoto wa simba anaitwa "Shibli" kwa Kiswahili Sanifu, neno lenye asili ya kipekee inayoonyesha uzuri na haiba ya watoto wa wanyama wa porini!',
    kenyanContext: 'Katika hifadhi ya kitaifa ya Nairobi iliyo karibu na jiji, wanafunzi wa shule mbalimbali hutembelea kuona vifaru na twiga wakitembea kwa amani chini ya ulinzi mkali wa walinzi wa KWS.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u6-l2',
    subStrandId: 'substrand-g5-kisw-u6',
    title: 'Ngeli ya U-YA na U-ZI: Upatanisho wa Kisarufi',
    content: 'Katika sarufi ya Kiswahili, ngeli za nomino zinazoanza na herufi "U-" au "W-" zina mgawanyiko wa kipekee kulingana na muundo wao wa wingi:\n\n1. Ngeli ya U - YA:\n- Inajumuisha nomino zinazoanza na "U-" katika umoja na kugeuka kuwa "MA-" katika wingi.\n- Umoja: Ua (ua la maua) -> Wingi: Maua\n- Umoja: Ugonjwa -> Wingi: Magonjwa\n- Umoja: Umbo -> Wingi: Maumbo\n- Umoja: Upendo, Ukarimu (nomino za dhahania)\n- Viambishi vya Upatanisho: Umoja "U-" ("Ua zuri limechanua" / "Ua lile linapendeza"), Wingi "YA-" ("Maua mazuri yamechanua").\n\n2. Ngeli ya U - ZI (au U - N):\n- Inajumuisha nomino zinazoanza na "U-" au "W-" katika umoja na kupata viambishi vya "Ny-", "Mb-", au kupoteza "u-" katika wingi.\n- Ukuta (Umoja) -> Kuta (Wingi)\n- Ufa (Umoja) -> Nyufa (Wingi)\n- Ufunguo (Umoja) -> Funguo (Wingi)\n- Wimbo (Umoja) -> Nyimbo (Wingi)\n- Ulimi (Umoja) -> Ndimi (Wingi)\n- Viambishi vya Upatanisho: Umoja "U-" ("Ukuta mrefu umebomoka"), Wingi "ZI-" ("Kuta ndefu zimebomoka").',
    didYouKnow: 'Neno "Wimbo" liko katika ngeli ya U-ZI kwa sababu asili yake ni "U-imbo", na wingi wake ni "Nyimbo" unaochukua kiambishi cha "ZI-" ("Nyimbo hizi zinapendeza")!',
    kenyanContext: 'Wanafunzi wa Gredi ya 5 walipoimba nyimbo za kitamaduni za kizalendo, mwalimu alisema: "Wimbo huu uliimbwa kwa sauti nyororo, na nyimbo zote zilivutia wageni."',
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

// 3. Batch 3 Missions (4 missions: orders 110 to 113)
const missionsToAdd = [
  {
    id: 'mission-g5-kisw-u5-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u5',
    lessonId: 'lesson-g5-kisw-u5-l1',
    title: 'Walinzi wa Usalama Barabarani na Sheria za Trafiki',
    description: 'Tambua alama za barabarani, zingatia taa za trafiki na vivukio vya pundamilia, na dhibitisha usalama wa jamii kote Kenya!',
    order: 110,
    orderIndex: 110,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-usalama-barabarani',
    badge: { name: 'Shujaa wa Usalama Barabarani', icon: 'shield' },
    questionIds: [
      'q-g5-kisw-u5-001', 'q-g5-kisw-u5-002', 'q-g5-kisw-u5-003', 'q-g5-kisw-u5-004',
      'q-g5-kisw-u5-005', 'q-g5-kisw-u5-006', 'q-g5-kisw-u5-007', 'q-g5-kisw-u5-008',
      'q-g5-kisw-u5-009', 'q-g5-kisw-u5-010', 'q-g5-kisw-u5-011', 'q-g5-kisw-u5-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u5-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u5',
    lessonId: 'lesson-g5-kisw-u5-l2',
    title: 'Umahiri wa Vivumishi Visivyobadilika na vya Sifa',
    description: 'Chambua vivumishi visivyobadilika (safi, bora, ghali, tele) na vivumishi asilia vya sifa, na unda sentensi sanifu!',
    order: 111,
    orderIndex: 111,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-vivumishi-bingwa',
    badge: { name: 'Bingwa wa Vivumishi', icon: 'star' },
    questionIds: [
      'q-g5-kisw-u5-013', 'q-g5-kisw-u5-014', 'q-g5-kisw-u5-015', 'q-g5-kisw-u5-016',
      'q-g5-kisw-u5-017', 'q-g5-kisw-u5-018', 'q-g5-kisw-u5-019', 'q-g5-kisw-u5-020',
      'q-g5-kisw-u5-021', 'q-g5-kisw-u5-022', 'q-g5-kisw-u5-023', 'q-g5-kisw-u5-024'
    ]
  },
  {
    id: 'mission-g5-kisw-u6-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u6',
    lessonId: 'lesson-g5-kisw-u6-l1',
    title: 'Safari ya Hifadhi za Wanyamapori na Makinda Yao',
    description: 'Tambua wanyama wakubwa watano, jifunze majina sahihi ya watoto wa wanyama (shibli, ndama), na thamini kazi ya KWS!',
    order: 112,
    orderIndex: 112,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-wanyamapori-mlinzi',
    badge: { name: 'Mlinzi wa Wanyamapori', icon: 'compass' },
    questionIds: [
      'q-g5-kisw-u6-001', 'q-g5-kisw-u6-002', 'q-g5-kisw-u6-003', 'q-g5-kisw-u6-004',
      'q-g5-kisw-u6-005', 'q-g5-kisw-u6-006', 'q-g5-kisw-u6-007', 'q-g5-kisw-u6-008',
      'q-g5-kisw-u6-009', 'q-g5-kisw-u6-010', 'q-g5-kisw-u6-011', 'q-g5-kisw-u6-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u6-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u6',
    lessonId: 'lesson-g5-kisw-u6-l2',
    title: 'Ustadi wa Ngeli ya U-YA na U-ZI katika Sarufi',
    description: 'Pambanua nomino za ukuta/kuta, wimbo/nyimbo, ua/maua, na dhibiti upatanisho wa kisarufi katika sentensi!',
    order: 113,
    orderIndex: 113,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ngeli-u-ya-zi',
    badge: { name: 'Mtaalamu wa Ngeli za U', icon: 'music' },
    questionIds: [
      'q-g5-kisw-u6-013', 'q-g5-kisw-u6-014', 'q-g5-kisw-u6-015', 'q-g5-kisw-u6-016',
      'q-g5-kisw-u6-017', 'q-g5-kisw-u6-018', 'q-g5-kisw-u6-019', 'q-g5-kisw-u6-020',
      'q-g5-kisw-u6-021', 'q-g5-kisw-u6-022', 'q-g5-kisw-u6-023', 'q-g5-kisw-u6-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 3 Questions (48 questions: 24 for Unit 5, 24 for Unit 6)
const questionsToAdd = [
  // --- Unit 5: Mission 1 (q-g5-kisw-u5-001 to 012) ---
  {
    id: 'q-g5-kisw-u5-001',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sehemu maalum ya barabara yenye mistari myeupe na myeusi ambapo watembea kwa miguu wanaruhusiwa kuvuka huitwaje kwa Kiswahili?',
    text: 'Sehemu maalum ya barabara yenye mistari myeupe na myeusi ambapo watembea kwa miguu wanaruhusiwa kuvuka huitwaje kwa Kiswahili?',
    options: [
      'Kivukio cha pundamilia (zebra crossing)',
      'Mtaro wa maji machafu',
      'Daraja la reli',
      'Mzunguko wa barabara'
    ],
    correctAnswer: 'Kivukio cha pundamilia (zebra crossing)',
    explanation: 'Kivukio cha pundamilia kimetengenezwa kwa mistari myeupe na myeusi ili madereva wapunguze mwendo na kusimama kuwaruhusu watu kuvuka.',
    socraticHint: 'Kivukio hiki kimepewa jina la mnyama mwenye milia myeupe na myeusi.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-002',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wakati taa za trafiki zinapowaka RANGI NYEKUNDU, dereva anapaswa kufanya nini mara moja?',
    text: 'Wakati taa za trafiki zinapowaka RANGI NYEKUNDU, dereva anapaswa kufanya nini mara moja?',
    options: [
      'Kusimamisha gari kabisa',
      'Kuongeza kasi ya gari kupita haraka',
      'Kupiga honi kwa sauti kubwa',
      'Kugeuza gari kurudi nyuma'
    ],
    correctAnswer: 'Kusimamisha gari kabisa',
    explanation: 'Rangi nyekundu katika taa za trafiki ina maana ya kusimama mara moja ili kuruhusu magari au watembea kwa miguu wengine kupita.',
    socraticHint: 'Taa nyekundu ni alama ya hatari au amri ya kusimama mara moja.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-003',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kanuni ipi sahihi ya kiusalama ambayo mtoto anapaswa kufuata kabla ya kuvuka barabara isiyo na taa za trafiki?',
    text: 'Ni kanuni ipi sahihi ya kiusalama ambayo mtoto anapaswa kufuata kabla ya kuvuka barabara isiyo na taa za trafiki?',
    options: [
      'Kusimama, kuangalia kulia, kuangalia kushoto, kuangalia kulia tena, na kuvuka iwapo hakuna gari linalokuja kwa kasi',
      'Kufunga macho na kukimbia kwa kasi kuvuka barabara',
      'Kuvuka huku akitazama video kwenye kishikwambi au simu',
      'Kusubiri hadi mvua inyeshe ndipo avuke'
    ],
    correctAnswer: 'Kusimama, kuangalia kulia, kuangalia kushoto, kuangalia kulia tena, na kuvuka iwapo hakuna gari linalokuja kwa kasi',
    explanation: 'Kanuni ya usalama barabarani inasisitiza: simama, tazama pande zote mbili kwa uangalifu, na usitembee wala kukimbia ovyo.',
    socraticHint: 'Ni mlolongo gani wa kuangalia pande zote kwa macho kabla ya kuingia barabarani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-004',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chombo cha usafiri wa majini kinachobeba watu na magari kuvuka mkondo wa bahari kule Likoni, Mombasa huitwaje?',
    text: 'Chombo cha usafiri wa majini kinachobeba watu na magari kuvuka mkondo wa bahari kule Likoni, Mombasa huitwaje?',
    options: [
      'Feri',
      'Mashua ndogo',
      'Gari-moshi',
      'Matatu'
    ],
    correctAnswer: 'Feri',
    explanation: 'Feri ni chombo kikubwa cha majini kinachotumika kusafirisha abiria na magari kuvuka njia fupi za bahari au maziwa kama kule Likoni.',
    socraticHint: 'Chombo maarufu cha majini kinachovusha maelfu ya watu kila siku kati ya kisiwa cha Mombasa na Likoni.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-005',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini abiria anayepanda pikipiki (boda-boda) analazimishwa kisheria kuvaa kofia ngumu ya usalama (helmet)?',
    text: 'Kwanini abiria anayepanda pikipiki (boda-boda) analazimishwa kisheria kuvaa kofia ngumu ya usalama (helmet)?',
    options: [
      'Kumlinda kichwa chake dhidi ya majeraha mabaya au kifo iwapo ajali itatokea',
      'Kuzuia upepo usichafue nywele zake',
      'Ili aweze kuonekana mzuri kwa watu wanaotazama',
      'Kufanya safari iwe ya kasi zaidi'
    ],
    correctAnswer: 'Kumlinda kichwa chake dhidi ya majeraha mabaya au kifo iwapo ajali itatokea',
    explanation: 'Kofia ngumu (helmet) inalinda fuvu la kichwa na ubongo dhidi ya migongano mikali na mikwaruzo hatari barabarani.',
    socraticHint: 'Kofia ngumu inalinda kiungo kipi muhimu zaidi cha mwili kisiumie ardhini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-006',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Gari la wagonjwa (Ambulensi) au gari la zima moto linapopiga king\'ora chenye mlio mkali barabarani, madereva wengine wanapaswa kufanya nini?',
    text: 'Gari la wagonjwa (Ambulensi) au gari la zima moto linapopiga king\'ora chenye mlio mkali barabarani, madereva wengine wanapaswa kufanya nini?',
    options: [
      'Kusimama kando na kupisha njia mara moja ili gari la dharura liokoe maisha',
      'Kushindana nalo mbio ili wasipitwe',
      'Kuziba njia kwa makusudi',
      'Kupiga honi zao kwa hasira'
    ],
    correctAnswer: 'Kusimama kando na kupisha njia mara moja ili gari la dharura liokoe maisha',
    explanation: 'Magari ya dharura yana kipaumbele cha kisheria kwa sababu yanawahi kuokoa maisha ya wagonjwa au kuzima moto.',
    socraticHint: 'King\'ora ni ishara ya dharura ya kuokoa maisha, kwa hivyo madereva wengine lazima wafanye nini?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-007',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni tabia gani hatari sana ambayo abiria hawapaswi kamwe kuifanya wanaposafiri ndani ya matatu au basi?',
    text: 'Ni tabia gani hatari sana ambayo abiria hawapaswi kamwe kuifanya wanaposafiri ndani ya matatu au basi?',
    options: [
      'Kutoa kichwa au mkono nje ya dirisha wakati gari linakwenda kwa kasi',
      'Kufunga mkanda wa usalama vizuri',
      'Kuketi kwa utulivu kwenye kiti chake',
      'Kusalimu abiria wenzake kwa heshima'
    ],
    correctAnswer: 'Kutoa kichwa au mkono nje ya dirisha wakati gari linakwenda kwa kasi',
    explanation: 'Kutoa kichwa au mikono dirishani kunaweza kusababisha mtu kugongwa na gari lingine au nguzo za barabarani na kupata majeraha mabaya.',
    socraticHint: 'Ni tendo gani linaloweka viungo vya mwili kwenye hatari ya kugongwa na vitu vilivyo nje ya gari?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-008',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifaa cha usalama kilichopo kwenye viti vya magari kinachofungwa kifuani na kiunoni kuzuia abiria asirushe mbele gari linapofunga breki huitwaje?',
    text: 'Kifaa cha usalama kilichopo kwenye viti vya magari kinachofungwa kifuani na kiunoni kuzuia abiria asirushe mbele gari linapofunga breki huitwaje?',
    options: [
      'Mkanda wa usalama (seat belt)',
      'Kamba ya viatu',
      'Mshipi wa suruali',
      'Kishikio cha mlango'
    ],
    correctAnswer: 'Mkanda wa usalama (seat belt)',
    explanation: 'Mkanda wa usalama humzuia abiria asitupwe mbele au kugonga kioo cha gari dereva anaposimama ghafla.',
    socraticHint: 'Kifaa hiki kinaitwa mkanda maalum unaofungwa kwenye kiti kwa ajili ya usalama.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-009',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Treni ya kisasa ya mwendo wa kasi inayounganisha miji ya Mombasa, Nairobi na Naivasha nchini Kenya huitwaje kwa Kiswahili?',
    text: 'Treni ya kisasa ya mwendo wa kasi inayounganisha miji ya Mombasa, Nairobi na Naivasha nchini Kenya huitwaje kwa Kiswahili?',
    options: [
      'Gari-moshi la SGR (Madaraka Express)',
      'Matatu ya mtaani',
      'Tuk-tuk',
      'Boti ya kasikazi'
    ],
    correctAnswer: 'Gari-moshi la SGR (Madaraka Express)',
    explanation: 'Madaraka Express (SGR) ni reli ya kisasa ya standard gauge inayotoa usafiri salama na wa haraka wa gari-moshi kati ya miji mikuu ya Kenya.',
    socraticHint: 'Usafiri wa reli ya kisasa ya abiria nchini Kenya unaofanya safari kati ya Mombasa na Nairobi.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-010',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini watoto wanashauriwa kutovaa nguo nyeusi tititi wanapotembea barabarani wakati wa usiku au giza?',
    text: 'Kwanini watoto wanashauriwa kutovaa nguo nyeusi tititi wanapotembea barabarani wakati wa usiku au giza?',
    options: [
      'Kwa sababu madereva hawawezi kuwaona kwa urahisi gizani, hivyo wanapaswa kuvaa nguo zenye rangi angavu au zinazong\'aa',
      'Kwa sababu nguo nyeusi zinaleta joto jingi sana usiku',
      'Ili kuzuia mvua isiwanyeshee',
      'Ili wasikamatwe na polisi'
    ],
    correctAnswer: 'Kwa sababu madereva hawawezi kuwaona kwa urahisi gizani, hivyo wanapaswa kuvaa nguo zenye rangi angavu au zinazong\'aa',
    explanation: 'Rangi nyeusi humeza mwanga gizani na kumfanya mtu asionekane na madereva; nguo angavu (zenye reflecta) huonekana kwa mbali na kuokoa maisha.',
    socraticHint: 'Gizani, rangi gani inayoonekana kwa urahisi mbele ya taa za magari: nyeusi au angavu?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-011',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Alama ya barabarani yenye umbo la pembetatu yenye picha ya watoto wawili wanaoshikana mikono inaonyesha nini kwa madereva?',
    text: 'Alama ya barabarani yenye umbo la pembetatu yenye picha ya watoto wawili wanaoshikana mikono inaonyesha nini kwa madereva?',
    options: [
      'Tahadhari: Kuna shule au watoto wanaovuka karibu, hivyo punguza mwendo!',
      'Uwanja wa kucheza mpira wa miguu upo hapa barabarani',
      'Ruhusa kwa madereva kuongeza kasi ya magari',
      'Mahali pa kuegesha matatu pekee'
    ],
    correctAnswer: 'Tahadhari: Kuna shule au watoto wanaovuka karibu, hivyo punguza mwendo!',
    explanation: 'Alama hii ya tahadhari inamwagiza dereva kupunguza mwendo mara moja kwa sababu watoto wa shule wanaweza kuvuka wakati wowote.',
    socraticHint: 'Picha ya watoto wenye mikoba ya vitabu huashiria kuwepo kwa shule karibu.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-012',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili inayosisitiza kuwa makini na kutokimbilia mambo barabarani: "Haraka haraka haina ________."',
    text: 'Kamilisha methali ya Kiswahili inayosisitiza kuwa makini na kutokimbilia mambo barabarani: "Haraka haraka haina ________."',
    options: [
      'baraka',
      'faida',
      'adabu',
      'nguvu'
    ],
    correctAnswer: 'baraka',
    explanation: 'Methali "Haraka haraka haina baraka" inafundisha kwamba kufanya mambo bila umakini au kwa papara huleta makosa, hasara, na ajali.',
    socraticHint: 'Methali hii inalinganisha maneno mawili yenye mizani sawa: haraka na ...?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },

  // --- Unit 5: Mission 2 (q-g5-kisw-u5-013 to 024) ---
  {
    id: 'q-g5-kisw-u5-013',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni neno lipi kati ya yafuatayo ambalo ni KIVUMISHI KISICHOBADILIKA katika lugha ya Kiswahili?',
    text: 'Ni neno lipi kati ya yafuatayo ambalo ni KIVUMISHI KISICHOBADILIKA katika lugha ya Kiswahili?',
    options: [
      'Bora',
      'Mzuri',
      'Mrefu',
      'Mkubwa'
    ],
    correctAnswer: 'Bora',
    explanation: '"Bora" ni kivumishi kisichobadilika; hakichukui viambishi vyovyote vya ngeli (mfano: mtu bora, shule bora, vifaa bora). Maneno mengine huchukua viambishi.',
    socraticHint: 'Ni neno lipi linalobaki bila kubadilika hata likitumika na mtu, mti, au nyumba?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-014',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua sentensi inayoonyesha matumizi SAHIHI ya kivumishi kisichobadilika "ghali":',
    text: 'Chagua sentensi inayoonyesha matumizi SAHIHI ya kivumishi kisichobadilika "ghali":',
    options: [
      'Magari yale ni ghali sana kuliko pikipiki.',
      'Magari yale ni maghali sana kuliko pikipiki.',
      'Magari yale ni vighali sana kuliko pikipiki.',
      'Magari yale ni yaghali sana kuliko pikipiki.'
    ],
    correctAnswer: 'Magari yale ni ghali sana kuliko pikipiki.',
    explanation: 'Kivumishi "ghali" hakibadiliki na hakipokei viambishi kama "ma-" au "vi-". Kinabaki "ghali" katika ngeli zote.',
    socraticHint: 'Kivumishi kisichobadilika hakiruhusu kuongezwa kiambishi chochote mbele yake.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-015',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi lipi la maneno ambapo maneno YOTE ni vivumishi visivyobadilika?',
    text: 'Ni kundi lipi la maneno ambapo maneno YOTE ni vivumishi visivyobadilika?',
    options: [
      'Safi, bora, tele, ghali, duni',
      'Zuri, baya, fupi, nene, refu',
      'Kubwa, dogo, tamu, kali, tupu',
      'Zima, gumu, jepesi, bichi, bivu'
    ],
    correctAnswer: 'Safi, bora, tele, ghali, duni',
    explanation: 'Vivumishi hivi vyote (safi, bora, tele, ghali, duni) vimetokana na lugha ya kigeni (hasa Kiarabu) na havibadiliki kulingana na ngeli za nomino.',
    socraticHint: 'Tafuta kundi la maneno ambayo hayachukui viambishi kama m-, wa-, ki-, au vi-.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-016',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi kwa kivumishi sahihi cha shina "-zuri" katika ngeli ya KI-VI wingi: "Vyombo _______ vilioshwa na kuwekwa kabatini."',
    text: 'Kamilisha sentensi kwa kivumishi sahihi cha shina "-zuri" katika ngeli ya KI-VI wingi: "Vyombo _______ vilioshwa na kuwekwa kabatini."',
    options: [
      'vizuri',
      'kizuri',
      'wazuri',
      'mazuri'
    ],
    correctAnswer: 'vizuri',
    explanation: 'Shina la kivumishi "-zuri" huchukua kiambishi cha upatanisho "vi-" katika ngeli ya KI-VI wingi na kuwa "vizuri" (vyombo vizuri).',
    socraticHint: 'Katika ngeli ya KI-VI wingi, kivumishi cha sifa huanza na kiambishi "vi-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-017',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sentensi ifuatayo inatumia neno "safi": "Amina ana moyo safi na huvaa mavazi safi." Neno "safi" limetumika kama nini?',
    text: 'Sentensi ifuatayo inatumia neno "safi": "Amina ana moyo safi na huvaa mavazi safi." Neno "safi" limetumika kama nini?',
    options: [
      'Kivumishi kisichobadilika kinachoelezea sifa ya moyo na mavazi',
      'Kitenzi cha tendo',
      'Kiwakilishi cha nafsi',
      'Kihisishi cha mshangao'
    ],
    correctAnswer: 'Kivumishi kisichobadilika kinachoelezea sifa ya moyo na mavazi',
    explanation: '"Safi" inaeleza hali na sifa ya moyo na mavazi bila kubadilika umbo lake katika umoja wala wingi.',
    socraticHint: 'Neno "safi" linaeleza sifa ya nomino "moyo" na "mavazi". Kwa hivyo ni aina gani ya neno?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-018',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kivumishi cha sifa chenye shina "-kali" kinapovumisha nomino "Mbwa" katika ngeli ya A-WA umoja kinakuwa neno gani?',
    text: 'Kivumishi cha sifa chenye shina "-kali" kinapovumisha nomino "Mbwa" katika ngeli ya A-WA umoja kinakuwa neno gani?',
    options: [
      'mkali',
      'kikali',
      'likali',
      'zikali'
    ],
    correctAnswer: 'mkali',
    explanation: 'Wanyama wote hufuata ngeli ya A-WA, na katika umoja kivumishi huchukua kiambishi "m-" na kuwa "mkali" (mbwa mkali, simba mkali).',
    socraticHint: 'Viumbe hai katika umoja huchukua kiambishi cha kivumishi "m-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-019',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi iliyo na matumizi sahihi ya kivumishi kisichobadilika "kamili"?',
    text: 'Ni sentensi ipi iliyo na matumizi sahihi ya kivumishi kisichobadilika "kamili"?',
    options: [
      'Wanafunzi walikula mlo kamili wenye virutubisho vyote.',
      'Wanafunzi walikula mlo mkamili wenye virutubisho vyote.',
      'Wanafunzi walikula mlo kikamili wenye virutubisho vyote.',
      'Wanafunzi walikula milo mikamili yenye virutubisho vyote.'
    ],
    correctAnswer: 'Wanafunzi walikula mlo kamili wenye virutubisho vyote.',
    explanation: '"Kamili" ni kivumishi kisichobadilika kinachobaki vilevile bila viambishi vyovyote mbele yake.',
    socraticHint: 'Neno "kamili" haliruhusu viambishi kama "m-" au "mi-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-020',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kivumishi cha sifa chenye shina "-tamu" kinapovumisha nomino "Machungwa" katika wingi wa ngeli ya LI-YA kinakuwa neno gani?',
    text: 'Kivumishi cha sifa chenye shina "-tamu" kinapovumisha nomino "Machungwa" katika wingi wa ngeli ya LI-YA kinakuwa neno gani?',
    options: [
      'matamu',
      'vitamu',
      'mitamu',
      'watamu'
    ],
    correctAnswer: 'matamu',
    explanation: 'Katika wingi wa ngeli ya LI-YA, kivumishi huchukua kiambishi cha "ma-" kulingana na nomino: "machungwa matamu".',
    socraticHint: 'Tazama kiambishi cha nomino "ma-chungwa": kivumishi kinapaswa kuanza na nini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-021',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Neno "tele" linapovumisha nomino "maji" katika sentensi: "Baada ya mvua kubwa, kisima kilikuwa na maji tele", lina maana gani?',
    text: 'Neno "tele" linapovumisha nomino "maji" katika sentensi: "Baada ya mvua kubwa, kisima kilikuwa na maji tele", lina maana gani?',
    options: [
      'Maji mengi sana yasiyo na uhaba',
      'Maji machache yaliyokauka',
      'Maji yenye joto kali',
      'Maji ya chumvi ya baharini'
    ],
    correctAnswer: 'Maji mengi sana yasiyo na uhaba',
    explanation: 'Kivumishi kisichobadilika "tele" kinamaanisha wingi mkubwa au kufurika kwa kitu (mfano: mavuno tele = mengi sana).',
    socraticHint: 'Neno "tele" linamaanisha wingi mwingi au uchache?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-022',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kivumishi kisichobadilika "duni" kinapotumiwa kuelezea hali ya kitu, kinamaanisha nini?',
    text: 'Kivumishi kisichobadilika "duni" kinapotumiwa kuelezea hali ya kitu, kinamaanisha nini?',
    options: [
      'Kitu chenye kiwango cha chini kisicho na thamani kubwa au duni kimaisha',
      'Kitu kizuri na cha bei ya juu sana',
      'Kitu kipya kabisa kutoka kiwandani',
      'Kitu kikubwa chenye nguvu za ajabu'
    ],
    correctAnswer: 'Kitu chenye kiwango cha chini kisicho na thamani kubwa au duni kimaisha',
    explanation: '"Duni" inamaanisha hali ya chini, upungufu wa ubora, au hali ya udhaifu.',
    socraticHint: 'Neno "duni" linaonyesha kiwango cha chini au duni cha ubora.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-023',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Bainisha sentensi ambayo ina kivumishi cha sifa kinachobadilika PAMOJA NA kivumishi kisichobadilika:',
    text: 'Bainisha sentensi ambayo ina kivumishi cha sifa kinachobadilika PAMOJA NA kivumishi kisichobadilika:',
    options: [
      'Mvulana mrefu alinunua shati bora dukani.',
      'Mvulana alikimbia kwa kasi sana.',
      'Shati jeupe lilioshwa vizuri.',
      'Chakula kiliwekwa mezani haraka.'
    ],
    correctAnswer: 'Mvulana mrefu alinunua shati bora dukani.',
    explanation: 'Katika sentensi hii, "mrefu" ni kivumishi cha sifa kinachobadilika (kutoka -refu), na "bora" ni kivumishi kisichobadilika.',
    socraticHint: 'Tafuta sentensi yenye "mrefu" (kinachobadilika) na "bora" (kisichobadilika).',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },
  {
    id: 'q-g5-kisw-u5-024',
    subStrandId: 'substrand-g5-kisw-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa upatanisho sahihi wa kisarufi: "Madaktari _______ walitoa matibabu _______ kwa wagonjwa wote."',
    text: 'Kamilisha sentensi ifuatayo kwa upatanisho sahihi wa kisarufi: "Madaktari _______ walitoa matibabu _______ kwa wagonjwa wote."',
    options: [
      'hodari, bora',
      'wahodari, mabora',
      'mahodari, maboreshwa',
      'vihodari, vibora'
    ],
    correctAnswer: 'hodari, bora',
    explanation: 'Vivumishi "hodari" na "bora" vyote ni vivumishi visivyobadilika, kwa hivyo havitachukua viambishi mbele yao hata vikitumika na nomino za wingi.',
    socraticHint: 'Vivumishi "hodari" na "bora" havibadiliki kamwe katika wingi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U5'
  },

  // --- Unit 6: Mission 1 (q-g5-kisw-u6-001 to 012) ---
  {
    id: 'q-g5-kisw-u6-001',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtoto au kinda la simba huitwaje kwa neno sanifu la Kiswahili?',
    text: 'Mtoto au kinda la simba huitwaje kwa neno sanifu la Kiswahili?',
    options: [
      'Shibli',
      'Ndama',
      'Kifaranga',
      'Kimatu'
    ],
    correctAnswer: 'Shibli',
    explanation: 'Katika Kiswahili Sanifu, mtoto wa simba anaitwa "shibli".',
    socraticHint: 'Neno hili zuri la mtoto wa mfalme wa nyika (simba) linaanza na herufi "Shi-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-002',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinda la tembo (ndovu) au ng\'ombe huitwaje kwa Kiswahili?',
    text: 'Kinda la tembo (ndovu) au ng\'ombe huitwaje kwa Kiswahili?',
    options: [
      'Ndama',
      'Shibli',
      'Kinegwe',
      'Kinda'
    ],
    correctAnswer: 'Ndama',
    explanation: 'Mtoto wa tembo (ndovu) au ng\'ombe anaitwa "ndama".',
    socraticHint: 'Mtoto wa ng\'ombe anayenyonya maziwa anaitwa nani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-003',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni mnyama yupi wa porini nchini Kenya ambaye ana shingo ndefu sana inayomwezesha kula majani ya juu ya miti ya miiba (acacia)?',
    text: 'Ni mnyama yupi wa porini nchini Kenya ambaye ana shingo ndefu sana inayomwezesha kula majani ya juu ya miti ya miiba (acacia)?',
    options: [
      'Twiga',
      'Kiboko',
      'Pundamilia',
      'Swala'
    ],
    correctAnswer: 'Twiga',
    explanation: 'Twiga ndiye mnyama mrefu zaidi duniani, na shingo yake ndefu humsaidia kufikia matawi ya juu ya miti.',
    socraticHint: 'Mnyama huyu mrefu mwenye madoadoa ndiye alama ya taifa katika baadhi ya mashirika ya Kenya.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-004',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Shirika la serikali ya Kenya lenye wajibu wa kulinda wanyamapori na misitu dhidi ya majangili na uharibifu huitwaje kwa kifupi?',
    text: 'Shirika la serikali ya Kenya lenye wajibu wa kulinda wanyamapori na misitu dhidi ya majangili na uharibifu huitwaje kwa kifupi?',
    options: [
      'KWS (Shirika la Huduma ya Wanyamapori Kenya)',
      'KNEC',
      'KPA',
      'KRA'
    ],
    correctAnswer: 'KWS (Shirika la Huduma ya Wanyamapori Kenya)',
    explanation: 'KWS (Kenya Wildlife Service) ndilo shirika la kiserikali linalosimamia na kulinda wanyamapori na mbuga zote za kitaifa.',
    socraticHint: 'Kifupi cha Kenya Wildlife Service ni kipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-005',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tukio kubwa la kiasili ambapo mamilioni ya nyumbu na pundamilia huvuka Mto Mara kutoka Serengeti kuelekea Maasai Mara huitwaje?',
    text: 'Tukio kubwa la kiasili ambapo mamilioni ya nyumbu na pundamilia huvuka Mto Mara kutoka Serengeti kuelekea Maasai Mara huitwaje?',
    options: [
      'Uhamiaji Mkuu wa Wanyamapori (Great Migration)',
      'Mashindano ya riadha ya wanyama',
      'Mkutano mkuu wa KWS',
      'Ukame wa jangwani'
    ],
    correctAnswer: 'Uhamiaji Mkuu wa Wanyamapori (Great Migration)',
    explanation: 'Uhamiaji mkubwa wa nyumbu ni moja ya maajabu saba ya asili ya dunia yanayovutia watalii wengi nchini Kenya kila mwaka kati ya Julai na Oktoba.',
    socraticHint: 'Kuhama kwa makundi makubwa ya nyumbu kutoka nchi moja kwenda nyingine kutafuta malisho huitwaje?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-006',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtu anayeingia mbugani kinyume cha sheria kuua wanyamapori ili kung\'oa pembe za ndovu au vifaru anaitwaje kwa Kiswahili?',
    text: 'Mtu anayeingia mbugani kinyume cha sheria kuua wanyamapori ili kung\'oa pembe za ndovu au vifaru anaitwaje kwa Kiswahili?',
    options: [
      'Jangili (mwindaji haramu)',
      'Mtalii',
      'Mhifadhi mazingira',
      'Mlinzi wa mbuga'
    ],
    correctAnswer: 'Jangili (mwindaji haramu)',
    explanation: 'Jangili ni mhalifu anayeua wanyamapori kwa siri kwa tamaa ya biashara haramu ya pembe na ngozi.',
    socraticHint: 'Mwindaji haramu wa wanyama wa mbugani anaitwa jina gani la Kiswahili?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-007',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mnyama mkubwa wa majini anayependa kushinda ndani ya mito na maziwa wakati wa mchana na kutoka kula nyasi usiku huitwaje?',
    text: 'Mnyama mkubwa wa majini anayependa kushinda ndani ya mito na maziwa wakati wa mchana na kutoka kula nyasi usiku huitwaje?',
    options: [
      'Kiboko',
      'Kobe',
      'Chui',
      'Ngiri'
    ],
    correctAnswer: 'Kiboko',
    explanation: 'Kiboko hupatikana katika Maziwa ya Naivasha, Victoria na mito mikubwa nchini Kenya; hupumzika majini ili kulinda ngozi yake dhidi ya jua kali.',
    socraticHint: 'Mnyama mkubwa mzito mwenye meno makubwa anayeishi majini mchana.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-008',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni faida gani kubwa ya kiuchumi ambayo nchi ya Kenya huipata kutokana na uhifadhi bora wa wanyamapori na mbuga za kitaifa?',
    text: 'Ni faida gani kubwa ya kiuchumi ambayo nchi ya Kenya huipata kutokana na uhifadhi bora wa wanyamapori na mbuga za kitaifa?',
    options: [
      'Kupata fedha za kigeni kupitia utalii, nafasi za kazi za kuongoza watalii na hoteli, na kulinda bioanuwai',
      'Kupunguza ardhi ya kujenga viwanda vya plastiki',
      'Kuhakikisha kila mwananchi anapewa nyama ya simba bure',
      'Kuzuia ndege za kigeni zisitue nchini'
    ],
    correctAnswer: 'Kupata fedha za kigeni kupitia utalii, nafasi za kazi za kuongoza watalii na hoteli, na kulinda bioanuwai',
    explanation: 'Sekta ya utalii ni nguzo kuu ya uchumi wa Kenya, ikileta mamilioni ya fedha za kigeni na maelfu ya ajira kwa wananchi.',
    socraticHint: 'Utalii wa wanyamapori unailetea nchi mapato gani muhimu ya fedha na ajira?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-009',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mnyama anayekimbia kwa kasi zaidi duniani (hadi kilomita 100 kwa saa) anayepatikana katika mbuga za Kenya huitwaje?',
    text: 'Mnyama anayekimbia kwa kasi zaidi duniani (hadi kilomita 100 kwa saa) anayepatikana katika mbuga za Kenya huitwaje?',
    options: [
      'Duma (Cheetah)',
      'Kifaru',
      'Tembo',
      'Sungura'
    ],
    correctAnswer: 'Duma (Cheetah)',
    explanation: 'Duma ana mwili mwembamba na miguu yenye nguvu inayomfanya awe kiumbe anayekimbia kwa kasi kubwa zaidi ardhini.',
    socraticHint: 'Mnyama wa familia ya paka mwenye madoa meusi na mistari ya machozi usoni anayekimbia kwa kasi ya ajabu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-010',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini jamii zinazoishi kando ya mbuga za wanyama zinahimizwa kujenga ua wa uzio wa umeme au kutumia mizinga ya nyuki?',
    text: 'Kwanini jamii zinazoishi kando ya mbuga za wanyama zinahimizwa kujenga ua wa uzio wa umeme au kutumia mizinga ya nyuki?',
    options: [
      'Kuzuia migogoro kati ya binadamu na wanyamapori kwa kuzuia ndovu wasiharibu mazao ya wakulima',
      'Kufanya wanyama wote washikwe na baridi kali',
      'Kuhakikisha watalii hawawezi kupiga picha wanyama hao',
      'Kufanya nyuki waumize watoto wa shule'
    ],
    correctAnswer: 'Kuzuia migogoro kati ya binadamu na wanyamapori kwa kuzuia ndovu wasiharibu mazao ya wakulima',
    explanation: 'Ndovu huogopa nyuki na uzio salama wa umeme, mbinu inayozuia wanyama kuvamia mashamba bila kuwadhuru kifo.',
    socraticHint: 'Uzio unasaidia vipi kulinda mashamba ya wakulima dhidi ya ndovu bila kuua wanyama?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-011',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinda la kuku au ndege wengine anapototolewa kutoka kwenye yai huitwaje?',
    text: 'Kinda la kuku au ndege wengine anapototolewa kutoka kwenye yai huitwaje?',
    options: [
      'Kifaranga',
      'Shibli',
      'Ndama',
      'Mbuzi mdogo'
    ],
    correctAnswer: 'Kifaranga',
    explanation: 'Kifaranga ni jina la mtoto wa kuku, ndege au bata anayetoka kwenye yai lililoanguliwa.',
    socraticHint: 'Neno linalotaja mtoto wa kuku anayelia "kwi-kwi-kwi".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-012',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali hii ya Kiswahili: "Mtu hakimbii mvua akaingia katika ________."',
    text: 'Kamilisha methali hii ya Kiswahili: "Mtu hakimbii mvua akaingia katika ________."',
    options: [
      'mto (au maji)',
      'nyumba',
      'gari',
      'shamba'
    ],
    correctAnswer: 'mto (au maji)',
    explanation: 'Methali inafundisha kuwa mtu hapaswi kukimbia shida ndogo kisha akaingia katika hatari kubwa zaidi inayoweza kumuangamiza.',
    socraticHint: 'Huwezi kukimbia manyunyu ya mvua kisha ukaruka ndani ya mkondo wa maji.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },

  // --- Unit 6: Mission 2 (q-g5-kisw-u6-013 to 024) ---
  {
    id: 'q-g5-kisw-u6-013',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Ua" (ua lenye petali linalonukia vizuri) lina wingi upi katika ngeli ya U-YA?',
    text: 'Nomino "Ua" (ua lenye petali linalonukia vizuri) lina wingi upi katika ngeli ya U-YA?',
    options: [
      'Maua',
      'Nyua',
      'Maua ya ua',
      'Viua'
    ],
    correctAnswer: 'Maua',
    explanation: 'Katika ngeli ya U-YA, nomino "ua" huchukua kiambishi cha wingi "MA-" na kuwa "maua". Sentensi: "Ua zuri limechanua / Maua mazuri yamechanua."',
    socraticHint: 'Ua moja likiwa mengi bustanini tunasema nini: nyua au maua?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-014',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni upatanisho upi SAHIHI wa kisarufi kwa nomino "Maua" katika wingi wa ngeli ya U-YA?',
    text: 'Ni upatanisho upi SAHIHI wa kisarufi kwa nomino "Maua" katika wingi wa ngeli ya U-YA?',
    options: [
      'Maua haya yamechanua vizuri sana bustanini.',
      'Maua hizi zimechanua vizuri sana bustanini.',
      'Maua hii imechanua vizuri sana bustanini.',
      'Maua hawa wamechanua vizuri sana bustanini.'
    ],
    correctAnswer: 'Maua haya yamechanua vizuri sana bustanini.',
    explanation: 'Katika wingi wa ngeli ya U-YA, nomino "maua" huchukua kionyeshi "haya" na kiambishi cha kitenzi "ya-" ("yamechanua").',
    socraticHint: 'Katika ngeli ya U-YA wingi, viambishi vya upatanisho vinaanza na sauti ya "Y-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-015',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Ukuta" inapobadilishwa kuwa katika wingi katika ngeli ya U-ZI inakuwa neno gani?',
    text: 'Nomino "Ukuta" inapobadilishwa kuwa katika wingi katika ngeli ya U-ZI inakuwa neno gani?',
    options: [
      'Kuta',
      'Maukuta',
      'Vikuta',
      'Nyukuta'
    ],
    correctAnswer: 'Kuta',
    explanation: 'Katika ngeli ya U-ZI, nomino "ukuta" hupoteza kiambishi "u-" katika wingi na kubaki "kuta" (mfano: ukuta mmoja / kuta nne).',
    socraticHint: 'Ondoa herufi ya kwanza "U-" kwenye neno "Ukuta" ili kupata wingi wake.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-016',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua wingi sahihi wa sentensi hii ya ngeli ya U-ZI: "Ukuta mrefu umebomoka kwa upepo mkali."',
    text: 'Chagua wingi sahihi wa sentensi hii ya ngeli ya U-ZI: "Ukuta mrefu umebomoka kwa upepo mkali."',
    options: [
      'Kuta ndefu zimebomoka kwa upepo mkali.',
      'Kuta mirefu imebomoka kwa upepo mkali.',
      'Maukuta marefu yamebomoka kwa upepo mkali.',
      'Kuta zirefu zimebomoka kwa upepo mkali.'
    ],
    correctAnswer: 'Kuta ndefu zimebomoka kwa upepo mkali.',
    explanation: 'Katika wingi wa ngeli ya U-ZI: "Ukuta" hubadilika kuwa "Kuta", kivumishi "-refu" kinakuwa "ndefu", na kitenzi huchukua "zi-" ("zimebomoka").',
    socraticHint: 'Nomino ni "kuta", kivumishi ni "ndefu", na kitenzi ni "zimebomoka".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-017',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Wimbo" (inayotokana na U-imbo) ina wingi upi sahihi katika ngeli ya U-ZI?',
    text: 'Nomino "Wimbo" (inayotokana na U-imbo) ina wingi upi sahihi katika ngeli ya U-ZI?',
    options: [
      'Nyimbo',
      'Mawimbo',
      'Miwimbo',
      'Viwimbo'
    ],
    correctAnswer: 'Nyimbo',
    explanation: 'Umoja ni "Wimbo" na wingi wake ni "Nyimbo" (mfano: wimbo mtamu / nyimbo tamu).',
    socraticHint: 'Tunapoimba wimbo mmoja ni wimbo, tukiimba nyingi tunaziita nini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-018',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Ufa" (mpasuko kwenye ukuta au sakafu) ina wingi upi sahihi katika ngeli ya U-ZI?',
    text: 'Nomino "Ufa" (mpasuko kwenye ukuta au sakafu) ina wingi upi sahihi katika ngeli ya U-ZI?',
    options: [
      'Nyufa',
      'Maufa',
      'Vifa',
      'Miufa'
    ],
    correctAnswer: 'Nyufa',
    explanation: 'Nomino "ufa" hubadilika na kuchukua "ny-" katika wingi na kuwa "nyufa". Methali: "Usipoziba ufa utajenga ukuta."',
    socraticHint: 'Kumbuka methali ya ufa: "Usipoziba ufa..." Wingi wa ufa ni nyufa.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-019',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili: "Usipoziba _______ utajenga ukuta."',
    text: 'Kamilisha methali ya Kiswahili: "Usipoziba _______ utajenga ukuta."',
    options: [
      'ufa',
      'mlango',
      'dirisha',
      'shimo'
    ],
    correctAnswer: 'ufa',
    explanation: 'Methali hii inafundisha umuhimu wa kurekebisha kosa dogo au changamoto mapema kabla haijawa kubwa na kuleta hasara kubwa.',
    socraticHint: 'Mpasuko mdogo ukutani unaopaswa kuzibwa mapema unaitwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-020',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni upatanisho upi sahihi wa kitenzi kwa nomino "nyimbo" katika sentensi: "Nyimbo zote za kizalendo _______ na wanafunzi"?',
    text: 'Ni upatanisho upi sahihi wa kitenzi kwa nomino "nyimbo" katika sentensi: "Nyimbo zote za kizalendo _______ na wanafunzi"?',
    options: [
      'ziliimbwa',
      'yaliimbwa',
      'waliimbwa',
      'iliimbwa'
    ],
    correctAnswer: 'ziliimbwa',
    explanation: 'Katika wingi wa ngeli ya U-ZI, kiambishi cha upatanisho cha kitenzi ni "zi-": "Nyimbo zote za kizalendo ziliimbwa na wanafunzi."',
    socraticHint: 'Katika ngeli ya U-ZI wingi, kiambishi cha kitenzi ni zi-, ya-, au wa-?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-021',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Ulimi" inapobadilika kuingia katika wingi wa ngeli ya U-ZI inakuwa neno gani?',
    text: 'Nomino "Ulimi" inapobadilika kuingia katika wingi wa ngeli ya U-ZI inakuwa neno gani?',
    options: [
      'Ndimi',
      'Maulimi',
      'Vilimi',
      'Milimi'
    ],
    correctAnswer: 'Ndimi',
    explanation: 'Katika Kiswahili Sanifu, umoja ni "ulimi" na wingi wake ni "ndimi" (herufi "l" hubadilika kuwa "d" mbele ya pua "n-").',
    socraticHint: 'Wingi wa neno "ulimi" huanza na "Ndi-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-022',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua kionyeshi cha karibu cha wingi kinacholingana na nomino ya ngeli ya U-YA: "Magonjwa _______ yamezuiwa kwa usafi wa mazingira."',
    text: 'Chagua kionyeshi cha karibu cha wingi kinacholingana na nomino ya ngeli ya U-YA: "Magonjwa _______ yamezuiwa kwa usafi wa mazingira."',
    options: [
      'haya',
      'hizi',
      'hii',
      'hawa'
    ],
    correctAnswer: 'haya',
    explanation: 'Nomino "magonjwa" ni wingi wa "ugonjwa" katika ngeli ya U-YA, na huchukua kionyeshi cha "haya".',
    socraticHint: 'Kiashiria cha karibu cha maneno yanayoanza na "ma-" ni "haya".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-023',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi gani la nomino ambapo maneno YOTE hufuata mfumo wa ngeli ya U-ZI?',
    text: 'Ni kundi gani la nomino ambapo maneno YOTE hufuata mfumo wa ngeli ya U-ZI?',
    options: [
      'Ukuta (kuta), ufunguo (funguo), wembe (nyembe), ufa (nyufa)',
      'Ua (maua), ugonjwa (magonjwa), umbo (maumbo)',
      'Mti (miti), mkate (mikate), mto (mito)',
      'Kiti (viti), kitabu (vitabu), kikombe (vikombe)'
    ],
    correctAnswer: 'Ukuta (kuta), ufunguo (funguo), wembe (nyembe), ufa (nyufa)',
    explanation: 'Nomino hizi zote zina umoja unaoanza na "u-" au "w-" na wingi unaopata upatanisho wa "ZI-" (kuta hizi, funguo hizi, nyembe hizi, nyufa hizi).',
    socraticHint: 'Tafuta nomino ambazo wingi wake unachukua kionyeshi "hizi" au "zile".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
  },
  {
    id: 'q-g5-kisw-u6-024',
    subStrandId: 'substrand-g5-kisw-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tofauti kuu kati ya ngeli ya U-YA na ngeli ya U-ZI katika umbo la wingi ni ipi?',
    text: 'Tofauti kuu kati ya ngeli ya U-YA na ngeli ya U-ZI katika umbo la wingi ni ipi?',
    options: [
      'Ngeli ya U-YA huchukua kiambishi cha upatanisho "YA-" katika wingi (kama maua haya), wakati ngeli ya U-ZI huchukua "ZI-" katika wingi (kama kuta hizi)',
      'Ngeli ya U-YA inatumiwa kwa watu pekee na U-ZI kwa wanyama pekee',
      'Ngeli ya U-YA haina umbo la wingi kabisa',
      'Ngeli ya U-ZI hubadilika kuwa ngeli ya KI-VI katika wingi'
    ],
    correctAnswer: 'Ngeli ya U-YA huchukua kiambishi cha upatanisho "YA-" katika wingi (kama maua haya), wakati ngeli ya U-ZI huchukua "ZI-" katika wingi (kama kuta hizi)',
    explanation: 'Ngeli ya U-YA inageuka kuwa MA- (upatanisho YA-: maua yamechanua), wakati ngeli ya U-ZI inachukua upatanisho wa ZI- (kuta zimejengwa).',
    socraticHint: 'Angalia viambishi vya wingi vya vitenzi: "ya-" kwa U-YA na "zi-" kwa U-ZI.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U6'
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
console.log('Batch 3 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
