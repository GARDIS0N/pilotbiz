import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Kiswahili Lugha Batch 5 (Units 9 & 10 - Capstone Finale) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-kisw-u9',
    strandId: 'strand-g6-kisw-kusikiliza',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Michezo, Talanta za Kitaifa, Ushujaa & Vielezi na Vihusishi',
    description: 'Kusifu mashujaa wa riadha wa Kenya (Eliud Kipchoge, Faith Kipyegon), mashindano ya Safari Rally na michezo ya shule; lugha ya matangazo ya michezo na misemo ya michezo; na kutawala vielezi vya namna, mahali, wakati, idadi/kiasi pamoja na vihusishi.',
    cbeCompetency: 'Uthamini wa talanta na ushujaa wa kitaifa, ufasaha wa utangazaji michezo, na umilisi wa vielezi na vihusishi',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g6-kisw-u10',
    strandId: 'strand-g6-kisw-kuandika',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Fasihi Simulizi, Ushairi & Utunzi wa Insha za KPSEA',
    description: 'Kujifunza tanzu za fasihi simulizi (hadithi za wanyama, soga, methali, vitendawili, ushairi wa watoto); tamathali za usemi (tashbihi, sitiari, tashhisi, tanakali za sauti); na mbinu za kiufundi za uandishi wa insha za KPSEA (mwanzo unaovutia, mtiririko wa aya, kuonyesha badala ya kueleza, na uhariri).',
    cbeCompetency: 'Uchambuzi wa fasihi simulizi na ushairi, utumiaji wa tamathali za usemi, na umilisi wa kiwango cha juu wa insha za KPSEA',
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
    id: 'lesson-g6-kisw-u9-l1',
    subStrandId: 'substrand-g6-kisw-u9',
    title: 'Ushujaa wa Riadha, Matangazo ya Michezo na Maadili ya Mchezo',
    content: 'Kenya ni ngome kuu duniani inayotambuliwa kwa vipaji na ushujaa katika michezo mbalimbali.\n\n1. Mashujaa wa Riadha na Michezo nchini Kenya:\n- Eliud Kipchoge: Mwanariadha wa kwanza ulimwenguni kukimbia marathoni chini ya saa mbili (saa 1, dakika 59 na sekunde 40) chini ya kaulimbiu "Hakuna mwanadamu mwenye mipaka" (No Human Is Limited).\n- Faith Kipyegon: Bingwa mara tatu wa michezo ya Olimpiki na mvunja rekodi za dunia katika mbio za mita 1500 na 5000.\n- Iten na Eldoret: Miji ya Bonde la Ufa inayofahamika kama "Kitovu cha Mabingwa" kwa sababu ya kimo chake cha juu kinachofaa mafunzo ya mbio.\n- Michezo mingine: Raga (timu ya Shujaa), mpira wa wavu wa wanawake (Malkia Strikers), na mbio za magari za WRC Safari Rally kule Naivasha.\n\n2. Maadili na Nidhamu ya Michezo (Sportsmanship):\n- Uchezaji wa haki (Fair play): Kucheza kulingana na sheria bila udanganyifu au matumizi ya dawa za kulevya za kusisimua misuli (doping).\n- Unyenyekevu na uungwana: Kuwapongeza wapinzani wanaposhinda na kuwa mnyenyekevu wakati wa ushindi.\n- Ushirikiano na mshikamano wa timu.\n\n3. Nahau na Msamiati wa Michezo:\n- "Kupokeza kijiti": Kukabidhi majukumu au uongozi kwa mtu mwingine.\n- "Kuvunja rekodi": Kufikia kiwango cha juu cha mafanikio ambacho hakijawahi kufikiwa awali.\n- "Kukata utepe": Kumaliza mbio wa kwanza na kutangazwa mshindi.',
    didYouKnow: 'Eliud Kipchoge aliandika historia ya dunia mjini Vienna mnamo mwaka wa 2019 alipothibitisha kwa vitendo kuwa hakuna mwanadamu mwenye mipaka katika uwezo wa mwili na akili!',
    kenyanContext: 'Katika Uwanja wa Kasarani jijini Nairobi wakati wa mashindano ya Kip Keino Classic, mashabiki huimba nyimbo za kizalendo wanariadha wa Kenya wanapokimbia kwa kishindo.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u9-l2',
    subStrandId: 'substrand-g6-kisw-u9',
    title: 'Vielezi: Namna, Mahali, Wakati, Idadi na Vihusishi',
    content: 'Kielezi ni neno linalofafanua au kutoa taarifa zaidi kuhusu kitenzi, kivumishi au kielezi kingine.\n\n1. Aina Kuu za Vielezi:\n- Vielezi vya Namna (Hueleza jinsi tendo linavyofanyika):\n  * Mfano: haraka, polepole, vizuri, kiume, kishujaa, ovyoovyo.\n  * Sentensi: Mwanariadha alikimbia kwa kasi kuelekea utepe wa ushindi.\n- Vielezi vya Mahali (Hueleza mahali tendo lilipotendeka):\n  * Mfano: uwanjani, mlimani, nyumbani, pembeni, nje, mbali.\n  * Sentensi: Mashabiki walikusanyika uwanjani asubuhi.\n- Vielezi vya Wakati (Hueleza wakati tendo lilipotendeka):\n  * Mfano: alfajiri, jana, jioni, mapema, kesho, sasa.\n  * Sentensi: Mazoezi yalianza alfajiri jogoo akiwika.\n- Vielezi vya Idadi au Kiasi (Hueleza mara ngapi au kiasi cha tendo):\n  * Mfano: mara mbili, sana, kidogo, mara kwa mara, mara chache.\n  * Sentensi: Kipyegon hufanya mazoezi mara mbili kwa siku.\n\n2. Vihusishi (Prepositions):\n- Maneno yanayoonyesha uhusiano uliopo kati ya nomino au kiwakilishi na maneno mengine:\n  * kando ya, juu ya, chini ya, mbele ya, nyuma ya, ndani ya, mithili ya, badala ya.\n  * Sentensi: Kombe liliwekwa juu ya meza mbele ya watazamaji.',
    didYouKnow: 'Nomino yoyote inapopachikwa kiambishi "-ni" mwishoni (k.m. shule -> shuleni, uwanja -> uwanjani, chumba -> chumbani) hugeuka na kufanya kazi kama kielezi cha mahali!',
    kenyanContext: 'Watangazaji wa redio ya KBC Idhaa ya Taifa hutumia vielezi vya namna: "Mshambuliaji alipiga mpira kwa ustadi na kwa nguvu kuelekea langoni!"',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u10-l1',
    subStrandId: 'substrand-g6-kisw-u10',
    title: 'Fasihi Simulizi, Ushairi wa Kiswahili na Tamathali za Usemi',
    content: 'Fasihi simulizi na ushairi ni chemchemi ya hekima, maadili na utamaduni wa jamii zetu za Kiafrika.\n\n1. Tanzu za Fasihi Simulizi:\n- Ngano na Hadithi: Simulizi za kale zikiwemo ngano za wanyama (mtu na wanyama au sungura mjanja) zinazofunza wema, bidii na unyenyekevu.\n- Methali: Kauli fupi za mafumbo zenye hekima nzito (k.m. "Umoja ni nguvu, utengano ni udhaifu").\n- Vitendawili: Mafumbo mafupi ya kutega na kutegua yanayochangamsha ubongo na kupima umakini.\n\n2. Muundo wa Ushairi wa Kiswahili:\n- Ubeti (Stanza): Kifungu cha mistari kadhaa kinachounda sehemu ya shairi.\n- Mshororo (Verse line): Mstari mmoja ndani ya ubeti wa shairi.\n- Vina: Silabi zenye sauti zinazolingana katikati (vina vya kati) na mwishoni (vina vya utosini).\n- Mizani: Idadi ya silabi zinazopatikana katika kila mshororo.\n\n3. Tamathali za Usemi (Figures of Speech):\n- Tashbihi: Ulinganisho unaotumia maneno ya kulinganisha kama "kama", "mithili ya", "sawa na" (k.m. Shujaa alisimama imara mithili ya Mlima Kenya).\n- Sitiari: Ulinganisho wa moja kwa moja bila kutumia maneno ya kulinganisha (k.m. Baba ni nguzo ya nyumba yetu).\n- Tashhisi: Kukipa kitu kisicho na uhai sifa za binadamu (k.m. Upepo ulinong\'ona na miti ilipiga makofi).\n- Tanakali za Sauti: Kuiga sauti halisi ya kitu (k.m. Maji yalimwagika chururu; Alianguka pu!).',
    didYouKnow: 'Hapo kale, fasihi simulizi ilifundishwa usiku kandokando ya moto wa mafiga (hearth tradition) ambapo wazee waliwaelimisha watoto kupitia ngano kabla ya kulala!',
    kenyanContext: 'Wakati wa Tamasha za Kitaifa za Muziki za Shule za Kenya, wanafunzi huimba na kughani mashairi yenye mahadhi ya kitamaduni wakisindikizwa na ngoma na kayamba.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u10-l2',
    subStrandId: 'substrand-g6-kisw-u10',
    title: 'Utunzi wa Insha za KPSEA: Muundo, Mandhari, Aya na Uhariri',
    content: 'Insha ya KPSEA hupima uwezo wa mtahiniwa wa kubuni masimulizi yenye mtiririko mzuri, msamiati mteule, na sarufi kamilifu.\n\n1. Hatua Nne za Muundo wa Insha (Story Arc):\n- Mwanzo wenye Mvuto (Hook): Anza kwa picha halisi ya hisia, sauti au mandhari badala ya mwanzo uliopitwa na wakati kama "Ilikuwa siku ya Jumamosi asubuhi...".\n- Mwili wenye Mtiririko (Aya baada ya Aya): Jenga matukio yanayofuatana kwa mantiki, ukitambulisha changamoto au mgogoro (conflict).\n- Kilele cha Msisimko (Climax): Sehemu ya hatari kuu, mshangao mkubwa au uamuzi mgumu unaoshikilia hamu ya msomaji.\n- Mwisho / Hitimisho: Utatuzi wa changamoto na funzo zuri la kimaadili.\n\n2. Mbinu ya "Onyesha, Usieleze" (Show, Don\'t Tell):\n- Kueleza (Kawaida): "Mzee Juma alikasirika sana alipoona shamba limeharibika."\n- Kuonyesha (Bora zaidi): "Macho ya Mzee Juma yalibubujika machozi ya uchungu, huku akiuma meno na mikono yake ikitetemeka kwa hasira alipotazama mazao yaliyosombwa na mafuriko."\n\n3. Uakifishaji na Kanuni za Uhariri:\n- Tumia alama za mtajo ("...") unapoweka maneno ya wahusika (mazungumzo/dayalojia).\n- Hakikisha kila aya ina wazo moja kuu lililokuzwa vyema.\n- Kagua upatanisho wa ngeli, spelling (tahajia) na hakikisha hakuna lugha ya mitaani (sheng).',
    didYouKnow: 'Wasahihishaji wa KPSEA huthamini insha zenye sauti ya kipekee ya mwandishi na maelezo ya picha za hisia badala ya kukariri insha zilizotungwa na watu wengine!',
    kenyanContext: 'Insha zinazopata alama za juu zaidi Kenya husimulia matukio halisi ya kijamii, kama vile kuokoa watoto katika mafuriko ya Tana River au kupata tuzo ya mazingira shuleni.',
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

// 3. Batch 5 Missions (Orders 158 to 161)
const missionsToAdd = [
  {
    id: 'mission-g6-kisw-u9-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 158: Uwanja wa Kasarani – Michezo na Mashujaa wa Taifa',
    description: 'Chambua mashujaa wa riadha wa Kenya, kaulimbiu za ushindi, uchezaji wa haki, na nahau za michezo.',
    order: 158,
    orderIndex: 158,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-michezo',
    badge: 'badge-g6-kisw-michezo',
    lessonId: 'lesson-g6-kisw-u9-l1',
    questionIds: [
      'q-g6-kisw-u9-001', 'q-g6-kisw-u9-002', 'q-g6-kisw-u9-003', 'q-g6-kisw-u9-004',
      'q-g6-kisw-u9-005', 'q-g6-kisw-u9-006', 'q-g6-kisw-u9-007', 'q-g6-kisw-u9-008',
      'q-g6-kisw-u9-009', 'q-g6-kisw-u9-010', 'q-g6-kisw-u9-011', 'q-g6-kisw-u9-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u9-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 159: Dira ya Matendo – Vielezi na Vihusishi',
    description: 'Bobea katika uainishaji wa vielezi vya namna, mahali, wakati, idadi/kiasi na matumizi ya vihusishi.',
    order: 159,
    orderIndex: 159,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-vielezi',
    badge: 'badge-g6-kisw-vielezi',
    lessonId: 'lesson-g6-kisw-u9-l2',
    questionIds: [
      'q-g6-kisw-u9-013', 'q-g6-kisw-u9-014', 'q-g6-kisw-u9-015', 'q-g6-kisw-u9-016',
      'q-g6-kisw-u9-017', 'q-g6-kisw-u9-018', 'q-g6-kisw-u9-019', 'q-g6-kisw-u9-020',
      'q-g6-kisw-u9-021', 'q-g6-kisw-u9-022', 'q-g6-kisw-u9-023', 'q-g6-kisw-u9-024'
    ]
  },
  {
    id: 'mission-g6-kisw-u10-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 160: Moto wa Mafiga – Fasihi Simulizi na Ushairi',
    description: 'Chambua tanzu za fasihi simulizi, ngano za sungura, vitendawili, beti za mashairi, na tamathali za usemi.',
    order: 160,
    orderIndex: 160,
    xpReward: 135,
    rewardXp: 135,
    coinReward: 45,
    badgeReward: 'badge-g6-kisw-fasihi',
    badge: 'badge-g6-kisw-fasihi',
    lessonId: 'lesson-g6-kisw-u10-l1',
    questionIds: [
      'q-g6-kisw-u10-001', 'q-g6-kisw-u10-002', 'q-g6-kisw-u10-003', 'q-g6-kisw-u10-004',
      'q-g6-kisw-u10-005', 'q-g6-kisw-u10-006', 'q-g6-kisw-u10-007', 'q-g6-kisw-u10-008',
      'q-g6-kisw-u10-009', 'q-g6-kisw-u10-010', 'q-g6-kisw-u10-011', 'q-g6-kisw-u10-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u10-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 161: Mwandishi Bingwa – Insha za KPSEA na Uhariri',
    description: 'Kilele cha utunzi wa insha za KPSEA: mianzo yenye mvuto, mbinu ya kuonyesha hisia, aya zenye mtiririko na uhariri sanifu.',
    order: 161,
    orderIndex: 161,
    xpReward: 150,
    rewardXp: 150,
    coinReward: 50,
    badgeReward: 'badge-g6-kisw-bingwa-wa-insha',
    badge: 'badge-g6-kisw-bingwa-wa-insha',
    lessonId: 'lesson-g6-kisw-u10-l2',
    questionIds: [
      'q-g6-kisw-u10-013', 'q-g6-kisw-u10-014', 'q-g6-kisw-u10-015', 'q-g6-kisw-u10-016',
      'q-g6-kisw-u10-017', 'q-g6-kisw-u10-018', 'q-g6-kisw-u10-019', 'q-g6-kisw-u10-020',
      'q-g6-kisw-u10-021', 'q-g6-kisw-u10-022', 'q-g6-kisw-u10-023', 'q-g6-kisw-u10-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Questions for Units 9 & 10 (48 questions: 24 for Unit 9, 24 for Unit 10)
const questionsToAdd = [
  // ==========================================
  // Unit 9 Lesson 1: Ushujaa wa Riadha & Michezo (q-g6-kisw-u9-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u9-001',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Ni kaulimbiu gani ya kutia moyo iliyotumiwa na shujaa wa marathoni Eliud Kipchoge alipokimbia chini ya saa mbili jijini Vienna?',
    options: [
      '"Hakuna mwanadamu mwenye mipaka"',
      '"Shinda kwa hila yoyote"',
      '"Kimbia hadi uzimie"',
      '"Fedha kwanza michezo baadaye"'
    ],
    correctAnswer: '"Hakuna mwanadamu mwenye mipaka"',
    explanation: 'Eliud Kipchoge alivunja rekodi ya marathoni chini ya saa mbili akiongozwa na falsafa ya: "Hakuna mwanadamu mwenye mipaka" (No Human Is Limited).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kauli ipi ya Kiswahili inayotafsiri maneno maarufu ya Kipchoge ya "No Human Is Limited"?'
  },
  {
    id: 'q-g6-kisw-u9-002',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Mji upi katika Kaunti ya Elgeyo Marakwet unaofahamika ulimwenguni kama "Kitovu cha Mabingwa" (Home of Champions) kwa wakimbiaji?',
    options: [
      'Iten',
      'Malindi',
      'Lodwar',
      'Garissa'
    ],
    correctAnswer: 'Iten',
    explanation: 'Iten ni mji uliopo kwenye miinuko ya Bonde la Ufa ambao huvutia wanariadha kutoka kote duniani kufanya mazoezi ya riadha.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mji wa Iten unajulikana kama nini katika riadha za Kenya?'
  },
  {
    id: 'q-g6-kisw-u9-003',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Nahau "kupokeza kijiti" ina maana gani mwanasiasa mkongwe au kiongozi mstaafu anapomwachia kijana nafasi ya uongozi?',
    options: [
      'Kukabidhi majukumu na wajibu wa uongozi kwa mtu mwingine',
      'Kurusha kipande cha mti mtoni',
      'Kukataa kufanya kazi na wenzake',
      'Kukimbia mbio za mita mia nne'
    ],
    correctAnswer: 'Kukabidhi majukumu na wajibu wa uongozi kwa mtu mwingine',
    explanation: 'Kama vile wakimbiaji wa mbio za vijiti (relay) wanavyopeana kijiti, "kupokeza kijiti" kimaana ya nahau ni kukabidhi wajibu au urithi kwa mrithi.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wakimbiaji wanapopeana kijiti katika mbio za relay, maana ya kijamii ya tendo hilo ni nini?'
  },
  {
    id: 'q-g6-kisw-u9-004',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Mwanariadha anapofika wa kwanza kwenye mstari wa mwisho na kuvuka akiwa kidedea, anasemekana kufanya nini?',
    options: [
      'Kukata utepe',
      'Kukata tamaa',
      'Kukata roho',
      'Kukata tiketi'
    ],
    correctAnswer: 'Kukata utepe',
    explanation: '"Kukata utepe" ni nahau na tendo halisi la mwanariadha wa kwanza kuvunja au kugusa utepe uliowekwa kwenye mstari wa kumalizia mbio.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Utepe uliotandazwa kwenye mstari wa kumalizia mbio unaguswa na mshindi wa kwanza akifanya tendo gani?'
  },
  {
    id: 'q-g6-kisw-u9-005',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Ni shujaa yupi wa kike wa Kenya ambaye ameweka rekodi za dunia na kushinda medali za dhahabu za Olimpiki mara tatu katika mbio za mita 1500?',
    options: [
      'Faith Kipyegon',
      'Tegla Loroupe pekee',
      'Catherine Ndereba',
      'Mary Keitany'
    ],
    correctAnswer: 'Faith Kipyegon',
    explanation: 'Faith Kipyegon ni mmoja wa wanariadha wakubwa zaidi wa kike katika historia ya dunia akiwa bingwa wa Olimpiki mara tatu na mvunja rekodi za dunia.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mkimbiaji yupi maarufu wa kike wa Kenya aliyeshinda medali za dhahabu Rio 2016, Tokyo 2020 na Paris 2024?'
  },
  {
    id: 'q-g6-kisw-u9-006',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Maadili ya "uchezaji wa haki" (fair play) katika michezo yanamtaka mchezaji kufanya nini?',
    options: [
      'Kucheza kwa kufuata sheria za mchezo na kuheshimu wapinzani na waamuzi bila kutumia dawa haramu',
      'Kuvunja sheria za refarii ikiwa hakuna mtu anayemwangalia',
      'Kutukana wachezaji wa timu pinzani ili wawachwe nyuma',
      'Kukataa kumpongeza mpinzani aliyeshinda kwa haki'
    ],
    correctAnswer: 'Kucheza kwa kufuata sheria za mchezo na kuheshimu wapinzani na waamuzi bila kutumia dawa haramu',
    explanation: 'Uchezaji wa haki (fair play) unajumuisha uadilifu, kufuata sheria, kukataa dawa zilizopigwa marufuku (doping), na heshima kwa wote.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mchezaji mwenye nidhamu na mzalendo hucheza kwa mtindo gani uwanjani?'
  },
  {
    id: 'q-g6-kisw-u9-007',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Katika matangazo ya mpira wa miguu kwenye redio, mtangazaji anaposema: "Kombora lililopigwa na nahodha limegonga mwamba wa juu wa goli," anatumia lugha ya aina gani?',
    options: [
      'Lugha ya taswira na hisia yenye mvuto wa matangazo ya michezo',
      'Lugha ya kisheria ya mahakamani',
      'Lugha ya daktari hospitalini',
      'Lugha ya wauzaji sokoni'
    ],
    correctAnswer: 'Lugha ya taswira na hisia yenye mvuto wa matangazo ya michezo',
    explanation: 'Watangazaji wa michezo hutumia maneno yenye msisimko na picha za hisia ("kombora", "mwamba") ili kumpa msikilizaji picha kamili ya mechi.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, sentensi hiyo inafanana na ripoti ya daktari au msisimko wa mtangazaji wa mechi uwanjani?'
  },
  {
    id: 'q-g6-kisw-u9-008',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Timu ya taifa ya raga ya wachezaji saba (Rugby Sevens) ya Kenya inafahamika kwa jina gani la kizalendo?',
    options: [
      'Shujaa',
      'Harambee Stars',
      'Malkia Strikers',
      'Simba wa Tsavo'
    ],
    correctAnswer: 'Shujaa',
    explanation: 'Timu ya wanaume ya raga ya wachezaji saba ya Kenya inajulikana kote duniani kwa jina la kizalendo la "Shujaa".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni jina lipi la Kiswahili lenye maana ya shujaa au jasiri linalopewa timu yetu ya raga?'
  },
  {
    id: 'q-g6-kisw-u9-009',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Matumizi ya dawa za kusisimua misuli na nguvu bandia (doping) katika riadha yanakemewa vikali kwa sababu gani kuu?',
    options: [
      'Ni udanganyifu unaoharibu afya ya mwanariadha na kuchafua heshima na sifa ya taifa',
      'Kwa sababu dawa hizo zina bei nafuu sana sokoni',
      'Kwa sababu zinafanya wanariadha wachelewe kuanza mbio',
      'Kwa sababu watazamaji hawawezi kuona medali vizuri'
    ],
    correctAnswer: 'Ni udanganyifu unaoharibu afya ya mwanariadha na kuchafua heshima na sifa ya taifa',
    explanation: 'Dawa za kusisimua misuli zinakiuka maadili ya michezo, zinaharibu afya ya moyo na figo ya mwanariadha, na hupelekea kupokonywa medali na aibu ya taifa.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kwa nini mashirika ya michezo kama ADAK na WADA yanakataza kabisa utumiaji wa dawa za kulevya za michezo?'
  },
  {
    id: 'q-g6-kisw-u9-010',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Kwenye mbio za masafa marefu, mwanariadha anayepewa kazi maalum ya kuongoza mbio kwa mwendo wa kasi uliopangwa ili kuwasaidia wenzake kuvunja rekodi huitwaje?',
    options: [
      'Mwongozaji kasi (Pacemaker / Kiongoza mwendo)',
      'Mlinzi wa uwanja',
      'Mwamuzi wa mstari',
      'Daktari wa timu'
    ],
    correctAnswer: 'Mwongozaji kasi (Pacemaker / Kiongoza mwendo)',
    explanation: 'Mwongozaji kasi (pacemaker au "sungura") hukimbia mbele kwa kasi maalum hadi nusu ya mbio kabla ya kuwapisha wakimbiaji wakuu washambulie rekodi.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mwanariadha anayekimbia mbele ili kuweka mwendo mzuri wa muda anaitwa nani kwa Kiingereza na Kiswahili?'
  },
  {
    id: 'q-g6-kisw-u9-011',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Soma maelezo haya: "Ushindi wa kweli haupimwi tu kwa medali za dhahabu mwanariadha anazotundikwa shingoni, bali kwa uadilifu, bidii ya kila siku na namna anavyowalea vijana wengine kufuata nyayo zake." Maelezo haya yanasisitiza sifa gani ya kishujaa?',
    options: [
      'Uzalendo, uadilifu na uongozi bora wa kimichezo',
      'Ubinafsi na kujipendekeza kwa matajiri',
      'Kudharau wachezaji wengine wasio na medali',
      'Kujitenga na jamii baada ya kupata fedha'
    ],
    correctAnswer: 'Uzalendo, uadilifu na uongozi bora wa kimichezo',
    explanation: 'Shujaa wa kweli ni yule anayewatumikia wengine, kukuza vipaji vipya na kulinda heshima ya taifa lake kwa unyenyekevu.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, mwanariadha anayewalea wengine na kuheshimu sheria anaonyesha uongozi wa aina gani?'
  },
  {
    id: 'q-g6-kisw-u9-012',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l1',
    text: 'Ni nahau ipi kati ya hizi yenye maana ya "kushinda mashindano au kufanikiwa kwa kishindo kikubwa"?',
    options: [
      'Kupiga chenga',
      'Kukata utepe',
      'Kula mwande',
      'Kupiga mwereka'
    ],
    correctAnswer: 'Kukata utepe',
    explanation: '"Kukata utepe" ina maana ya kuibuka kidedea na kuwa mshindi wa kwanza.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni nahau gani inayotokana na kitendo cha mshindi wa mbio kukata utepe wa mwisho?'
  },

  // ==========================================
  // Unit 9 Lesson 2: Vielezi na Vihusishi (q-g6-kisw-u9-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u9-013',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Katika sentensi: "Eliud Kipchoge alikimbia kwa kasi sana," maneno "kwa kasi" ni aina gani ya kielezi?',
    options: [
      'Kielezi cha namna',
      'Kielezi cha mahali',
      'Kielezi cha wakati',
      'Kielezi cha idadi'
    ],
    correctAnswer: 'Kielezi cha namna',
    explanation: '"Kwa kasi" hufafanua JINSI tendo la kukimbia lilivyofanyika, kwa hivyo ni kielezi cha namna.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, maneno "kwa kasi" yanaeleza jinsi alivyokimbia (namna) au mahali alipokimbia?'
  },
  {
    id: 'q-g6-kisw-u9-014',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Tambua kielezi cha wakati katika sentensi hii: "Mbio za kitaifa zitaanza alfajiri kabla jua halijachomoza."',
    options: [
      'alfajiri',
      'mbio',
      'jua',
      'kitaifa'
    ],
    correctAnswer: 'alfajiri',
    explanation: '"Alfajiri" linaeleza WAKATI tendo la kuanza mbio litakapofanyika.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi katika sentensi hiyo linalojibu swali: "Mbio zitaanza lini?"'
  },
  {
    id: 'q-g6-kisw-u9-015',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Katika sentensi: "Wachezaji wote walielekea uwanjani," neno "uwanjani" linafanya kazi gani ya kisarufi?',
    options: [
      'Kielezi cha mahali',
      'Kivumishi cha sifa',
      'Nomino ya A-WA',
      'Kiwakilishi cha nafsi'
    ],
    correctAnswer: 'Kielezi cha mahali',
    explanation: 'Neno "uwanjani" linaeleza MAHALI wachezaji walipoelekea, kwa hivyo ni kielezi cha mahali.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Nomino "uwanja" ikiongezwa "-ni" inajibu swali: "Walienda wapi?" Hiyo ni aina gani ya kielezi?'
  },
  {
    id: 'q-g6-kisw-u9-016',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Ni neno lipi kati ya haya lililo "kihusishi" (preposition) katika Kiswahili sanifu?',
    options: [
      'kando ya',
      'kimbia',
      'mrefu',
      'sisi'
    ],
    correctAnswer: 'kando ya',
    explanation: '"Kando ya" ni kihusishi kinachoonyesha uhusiano wa nafasi au mahali kati ya vitu viwili.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kifungu kipi kinachoonyesha mahali kitu kilipo kulinganishwa na kingine (kama "beside" kwa Kiingereza)?'
  },
  {
    id: 'q-g6-kisw-u9-017',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Katika sentensi: "Mwalimu alirudia maelekezo yale mara tatu," maneno "mara tatu" ni kielezi gani?',
    options: [
      'Kielezi cha idadi (au kiasi)',
      'Kielezi cha namna',
      'Kielezi cha mahali',
      'Kielezi cha kulinganisha'
    ],
    correctAnswer: 'Kielezi cha idadi (au kiasi)',
    explanation: '"Mara tatu" linaeleza idadi au mara ngapi tendo la kurudia lilifanyika, kwa hivyo ni kielezi cha idadi.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kielezi kinachojibu swali: "Mara ngapi?" kinaitwa kielezi cha nini?'
  },
  {
    id: 'q-g6-kisw-u9-018',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Sentensi ipi inayotumia kielezi cha namna kinachotokana na nomino kwa kiambishi "ki-"?',
    options: [
      'Askari walipambana kishujaa dhidi ya wavamizi.',
      'Askari walikimbia uwanjani asubuhi.',
      'Askari walikuwa watano tu kambini.',
      'Askari walilala usingizi mnono.'
    ],
    correctAnswer: 'Askari walipambana kishujaa dhidi ya wavamizi.',
    explanation: '"Kishujaa" ni kielezi cha namna kilichoundwa kutoka kwa nomino "shujaa" kwa kuongeza kiambishi "ki-".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta neno linaloanza na "ki-" linaloeleza namna askari walivyopigana kama mashujaa.'
  },
  {
    id: 'q-g6-kisw-u9-019',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Kamilisha sentensi ifuatayo kwa kihusishi sahihi: "Gari la wagonjwa liliegeshwa __________ lango kuu la zahanati."',
    options: [
      'mbele ya',
      'kwani',
      'lakini',
      'ingawa'
    ],
    correctAnswer: 'mbele ya',
    explanation: '"Mbele ya" ni kihusishi cha mahali kinachoonyesha mkao wa gari kuhusiana na lango.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi linaloonyesha mahali pa mkao: mbele ya, juu ya, chini ya?'
  },
  {
    id: 'q-g6-kisw-u9-020',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Ni sentensi ipi iliyo na vielezi viwili tofauti: kielezi cha wakati na kielezi cha namna?',
    options: [
      'Wanariadha walikimbia kwa kasi alfajiri.',
      'Wanariadha walikimbia uwanjani Kasarani.',
      'Wanariadha walikuwa wengi sana uwanjani.',
      'Wanariadha walisimama kando ya barabara.'
    ],
    correctAnswer: 'Wanariadha walikimbia kwa kasi alfajiri.',
    explanation: '"Kwa kasi" ni kielezi cha namna (jinsi walivyokimbia), na "alfajiri" ni kielezi cha wakati (lini walikimbia).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta sentensi yenye neno la wakati (alfajiri) na neno la namna (kwa kasi).'
  },
  {
    id: 'q-g6-kisw-u9-021',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Katika sentensi: "Mwanafunzi alisoma kwa makini mithili ya msomi hodari," neno "mithili ya" linatekeleza dhima gani?',
    options: [
      'Kihusishi kinachoonyesha ulinganisho (tashbihi)',
      'Kiunganishi cha sababu pekee',
      'Kivumishi cha ngeli ya LI-YA',
      'Kitenzi kikuu cha sentensi'
    ],
    correctAnswer: 'Kihusishi kinachoonyesha ulinganisho (tashbihi)',
    explanation: '"Mithili ya" ni kihusishi chenye maana ya "kama" au "sawa na", kikionyesha ulinganisho.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno "mithili ya" linamaanisha nini kulinganisha vitu viwili?'
  },
  {
    id: 'q-g6-kisw-u9-022',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Tathmini sentensi hii: "Alitembea polepole mno kiasi cha kuchelewa." Neno "mno" linafanya kazi gani?',
    options: [
      'Kielezi cha kiasi kinachofafanua kielezi kingine cha namna (polepole)',
      'Kivumishi cha sifa kinachofafanua kitenzi',
      'Nomino ya ngeli ya U-U',
      'Kihusishi cha mahali pa ndani'
    ],
    correctAnswer: 'Kielezi cha kiasi kinachofafanua kielezi kingine cha namna (polepole)',
    explanation: '"Mno" ni kielezi cha kiasi/kiwango (degree) kinachofafanua kielezi kingine cha namna "polepole" kuonyesha kiwango kilichozidi cha utaratibu.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno "mno" linaeleza kiwango cha polepole. Je, kielezi kinaweza kurekebisha kielezi kingine?'
  },
  {
    id: 'q-g6-kisw-u9-023',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Ni sentensi ipi inayoonyesha matumizi sahihi ya kihusishi "kwa ajili ya"?',
    options: [
      'Wanariadha walifanya mazoezi magumu kwa ajili ya mashindano ya kitaifa.',
      'Mti ulianguka kwa ajili ya uwanjani juu.',
      'Kitabu kiliwekwa kwa ajili ya mezani asubuhi.',
      'Alikimbia kwa ajili ya haraka mno.'
    ],
    correctAnswer: 'Wanariadha walifanya mazoezi magumu kwa ajili ya mashindano ya kitaifa.',
    explanation: '"Kwa ajili ya" hutumika kuonyesha sababu, nia, au mlengwa wa tendo fulani.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta sentensi ambapo "kwa ajili ya" inatumiwa kumaanisha "kwa sababu ya" au "kwa makusudio ya".'
  },
  {
    id: 'q-g6-kisw-u9-024',
    subStrandId: 'substrand-g6-kisw-u9',
    lessonId: 'lesson-g6-kisw-u9-l2',
    text: 'Bainisha kategoria za kisarufi za maneno yaliyopigiwa mistari:\n"Basi liliondoka [mapema] kuelekea [Mombasa] [kwa mwendo wa kasi]."',
    options: [
      'Kielezi cha wakati (mapema), Kielezi cha mahali (Mombasa), Kielezi cha namna (kwa mwendo wa kasi)',
      'Kivumishi, Nomino, Kitenzi',
      'Kihusishi, Kielezi cha idadi, Kiwakilishi',
      'Vielezi vya mahali pekee vyote vitatu'
    ],
    correctAnswer: 'Kielezi cha wakati (mapema), Kielezi cha mahali (Mombasa), Kielezi cha namna (kwa mwendo wa kasi)',
    explanation: '"Mapema" huonyesha wakati, "Mombasa" mahali lilipoelekea, na "kwa mwendo wa kasi" huonyesha namna lilivyotembea.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Changanua kila kielezi: kipi kinaonyesha lini, kipi kinaonyesha wapi, na kipi kinaonyesha jinsi gani?'
  },

  // ==========================================
  // Unit 10 Lesson 1: Fasihi Simulizi & Ushairi (q-g6-kisw-u10-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u10-001',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Mstari mmoja wa maneno katika ubeti wa shairi la Kiswahili huitwaje?',
    options: [
      'Mshororo',
      'Kituo',
      'Kipande',
      'Kina'
    ],
    correctAnswer: 'Mshororo',
    explanation: 'Mstari mmoja ndani ya ubeti wa shairi huitwa "mshororo" (line of verse).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mstari mmoja wa shairi unaitwaje katika istilahi za ushairi?'
  },
  {
    id: 'q-g6-kisw-u10-002',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Tegua kitendawili kifuatacho: "Kuku wangu ametagia miibani."',
    options: [
      'Nanasi',
      'Embe',
      'Ndizi',
      'Chungwa'
    ],
    correctAnswer: 'Nanasi',
    explanation: 'Nanasi hukua katikati ya majani yenye miba mikali na umbo lake hufananishwa na yai la kuku aliyetagia miibani.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni tunda gani tamu lenye ganda gumu lenye macho na majani yenye miiba?'
  },
  {
    id: 'q-g6-kisw-u10-003',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Ni tamathali ipi ya usemi inayotumika katika sentensi: "Mwanariadha alikimbia kwa kasi mithili ya duma"?',
    options: [
      'Tashbihi',
      'Sitiari',
      'Tashhisi',
      'Tanakali ya sauti'
    ],
    correctAnswer: 'Tashbihi',
    explanation: 'Tashbihi (simile) hulinganisha vitu viwili kwa kutumia maneno ya kulinganisha kama vile "mithili ya", "kama", au "sawa na".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ulinganisho unaotumia neno "mithili ya" au "kama" unaitwaje?'
  },
  {
    id: 'q-g6-kisw-u10-004',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Katika ngano za kiasili za wanyama za Kiafrika, ni mnyama yupi anayefahamika kwa kutumia akili na ujanja kuwashinda wanyama wakubwa kama simba na fisi?',
    options: [
      'Sungura',
      'Tembo',
      'Twiga',
      'Kifaru'
    ],
    correctAnswer: 'Sungura',
    explanation: 'Sungura ndiye mhusika mkuu wa ujanja (trickster character) katika ngano nyingi za Kiswahili na jamii za Afrika Mashariki.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mnyama yupi mdogo mjanja katika hadithi za Kiswahili anayewashinda wanyama wakubwa?'
  },
  {
    id: 'q-g6-kisw-u10-005',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Sentensi: "Mama yangu ni ngome ya maisha yangu." Inatumia tamathali gani ya usemi ambapo kitu kimoja kinaitwa kingine moja kwa moja?',
    options: [
      'Sitiari',
      'Tashbihi',
      'Tanakali ya sauti',
      'Ritifaa'
    ],
    correctAnswer: 'Sitiari',
    explanation: 'Sitiari (metaphor) ni ulinganisho wa moja kwa moja ambapo kiumbe au kitu kinapewa hadhi ya kitu kingine bila kutumia "kama" au "mithili ya".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mama hakulinganishwa kwa neno "kama", bali ameitwa moja kwa moja kuwa ngome. Hiyo ni tamathali gani?'
  },
  {
    id: 'q-g6-kisw-u10-006',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Sentensi ipi inayotumia "tashhisi" (kukipa kitu kisicho na uhai sifa za kibinadamu)?',
    options: [
      'Mwezi ulitabasamu na mawingu yalinong\'ona angani.',
      'Mwezi uling\'aa sana angani usiku.',
      'Mwezi ulikuwa mweupe kama theluji.',
      'Mwezi uliinuka saa moja jioni.'
    ],
    correctAnswer: 'Mwezi ulitabasamu na mawingu yalinong\'ona angani.',
    explanation: 'Kutabasamu na kunong\'ona ni vitendo vya binadamu ambavyo vimepewa mwezi na mawingu, hivyo ni mfano kamili wa tashhisi (personification).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, mwezi na mawingu yanaweza kutabasamu na kunong\'ona kama mwanadamu?'
  },
  {
    id: 'q-g6-kisw-u10-007',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Kamilisha sentensi ifuatayo kwa tanakali sahihi ya sauti: "Mtoto aliteleza kwenye matope na kuanguka chini __________."',
    options: [
      'pu!',
      'chururu!',
      'kacha!',
      'tifu!'
    ],
    correctAnswer: 'pu!',
    explanation: '"Pu!" ni tanakali ya sauti inayoiga mlio wa mtu au kitu kizito kinapoanguka chini ghafla.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu anapoanguka ghafla chini, ni sauti gani ya tanakali inayosikika: pu, chururu au kacha?'
  },
  {
    id: 'q-g6-kisw-u10-008',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Silabi zinazolingana sauti katikati au mwishoni mwa mishororo katika ubeti wa shairi huitwaje?',
    options: [
      'Vina',
      'Mizani',
      'Taharuki',
      'Kipande'
    ],
    correctAnswer: 'Vina',
    explanation: '"Vina" (rhyme) ni urari na mlingano wa silabi za sauti katikati na mwishoni mwa mistari ya mashairi ya kimapokeo.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Urari wa sauti zinazofanana mwishoni mwa mistari ya shairi unaitwaje?'
  },
  {
    id: 'q-g6-kisw-u10-009',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Tegua kitendawili kifuatacho: "Nyumba yangu haina mlango."',
    options: [
      'Yai',
      'Kiatu',
      'Chupa',
      'Kikombe'
    ],
    correctAnswer: 'Yai',
    explanation: 'Yai ni mfano wa nyumba iliyofungika pande zote bila dirisha wala mlango hadi kifaranga kitoe ganda.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kitu kipi chenye umbo kama ganda ambamo kifaranga hukua bila kuwa na mlango?'
  },
  {
    id: 'q-g6-kisw-u10-010',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Hesabu mizani katika mshororo huu wa shairi:\n"U-mo-ja-ni-ngu-vu-ye-tu, u-teng-an-o-ni-u-dha-i-fu"\nJe, mshororo huu una jumla ya mizani mingapi?',
    options: [
      'Mizani kumi na sita (16)',
      'Mizani minane (8)',
      'Mizani kumi na miwili (12)',
      'Mizani ishirini (20)'
    ],
    correctAnswer: 'Mizani kumi na sita (16)',
    explanation: 'Kipande cha kwanza (U-mo-ja-ni-ngu-vu-ye-tu) kina silabi 8, na cha pili (u-teng-an-o-ni-u-dha-i-fu) kina silabi 8, hivyo jumla ni mizani 16.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Hesabu silabi za kila neno: 8 katika kipande cha kwanza + 8 katika kipande cha pili = ?'
  },
  {
    id: 'q-g6-kisw-u10-011',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Shairi lenye mishororo minne katika kila ubeti linaitwaje katika istilahi za ushairi wa Kiswahili?',
    options: [
      'Tarbia',
      'Tathlitha (yenye mishororo mitatu)',
      'Takhmisa (yenye mishororo mitano)',
      'Utenzi'
    ],
    correctAnswer: 'Tarbia',
    explanation: 'Shairi lenye mishororo minne katika kila ubeti huitwa "tarbia" (quattrain).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Neno linalotokana na namba "nne" katika ushairi (tarbia) linahusu mishororo mingapi?'
  },
  {
    id: 'q-g6-kisw-u10-012',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l1',
    text: 'Kwa nini ngano za fasihi simulizi za Kiafrika mara nyingi huisha kwa kutoa mafunzo na maonyo kwa wasikilizaji?',
    options: [
      'Ili kuwakuza watoto kimaadili, kuelewa matokeo ya tabia mbaya na kujenga jamii yenye nidhamu',
      'Ili kuwalazimisha watoto walale mara moja',
      'Kwa sababu watambaji hadithi walikosa maneno ya kuendeleza kisa',
      'Ili kuonyesha kuwa wanyama wana nguvu kuliko watu'
    ],
    correctAnswer: 'Ili kuwakuza watoto kimaadili, kuelewa matokeo ya tabia mbaya na kujenga jamii yenye nidhamu',
    explanation: 'Fasihi simulizi ina dhima kuu ya kuelimisha, kuonya, kuelekeza na kupitisha maadili na nidhamu njema ya jamii.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Dhima kuu ya kifalsafa na kimaadili ya ngano katika jamii ya jadi ilikuwa nini?'
  },

  // ==========================================
  // Unit 10 Lesson 2: Utunzi wa Insha za KPSEA (q-g6-kisw-u10-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u10-013',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Sehemu ya juu zaidi yenye msisimko mkuu, hofu au mgogoro mkali katika insha ya masimulizi inaitwaje?',
    options: [
      'Kilele cha insha (Climax)',
      'Kianzio / Utangulizi',
      'Hitimisho',
      'Mkataba'
    ],
    correctAnswer: 'Kilele cha insha (Climax)',
    explanation: 'Kilele (climax) ndiyo sehemu ya hadithi yenye mvutano na msisimko wa juu zaidi kabla ya kuelekea kwenye utatuzi wa visa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kama vile kilele cha mlima kilivyo sehemu ya juu zaidi, kilele cha hadithi ni sehemu ya namna gani?'
  },
  {
    id: 'q-g6-kisw-u10-014',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Ni kianzio kipi cha insha kilicho bora na chenye mvuto wa hali ya juu kwa mtahiniwa wa KPSEA?',
    options: [
      'Ngurumo kali ya radi ilitikisa madirisha ya darasa letu, huku giza nene likitanda ghafla angani.',
      'Siku moja asubuhi niliamka nikanywa chai nikaenda shule.',
      'Hii ni insha inayohusu siku ambayo sitaisahau kamwe maishani mwangu.',
      'Jina langu ni Juma na ninaandika kuhusu safari yangu ya jana.'
    ],
    correctAnswer: 'Ngurumo kali ya radi ilitikisa madirisha ya darasa letu, huku giza nene likitanda ghafla angani.',
    explanation: 'Kianzio chenye mvuto humuingiza msomaji moja kwa moja kwenye mandhari yenye sauti, hisia na msisimko badala ya sentensi za mazoea zilizochakaa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kati ya mianzo hiyo, ni upi unaomvutia msomaji mara moja kwa picha halisi na msisimko?'
  },
  {
    id: 'q-g6-kisw-u10-015',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Mbinu ya utunzi wa insha inayojulikana kama "Onyesha, Usieleze" inamaanisha nini?',
    options: [
      'Kueleza matendo, hisia na picha halisi za wahusika badala ya kutoa kauli fupi kavu',
      'Kuchora picha za penseli kwenye karatasi ya mtihani badala ya kuandika maneno',
      'Kuwaonyesha wanafunzi wenzako karatasi yako wakati wa mtihani',
      'Kuacha nafasi tupu kati ya kila sentensi'
    ],
    correctAnswer: 'Kueleza matendo, hisia na picha halisi za wahusika badala ya kutoa kauli fupi kavu',
    explanation: '"Onyesha, usieleze" humsaidia msomaji ashuhudie matukio na hisia za wahusika kupitia maelezo ya picha za mwili na mandhari.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Badala ya kusema tu "Alifurahi", mwandishi hodari anaeleza jinsi meno yake yalivyong\'aa kwa tabasamu.'
  },
  {
    id: 'q-g6-kisw-u10-016',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Sentensi ipi inayoonyesha mbinu ya "Onyesha, Usieleze" ili kudhihirisha woga mkubwa wa mhusika?',
    options: [
      'Magoti yake yaligongana kwa mtetemeko huku kijasho chembamba kikimtiririka usoni na pumzi zikimbana kooni.',
      'Alikuwa na woga mwingi sana moyoni mwake.',
      'Aliogopa kwa sababu kulikuwa na giza.',
      'Hali ya woga ilionekana kwake wakati huo.'
    ],
    correctAnswer: 'Magoti yake yaligongana kwa mtetemeko huku kijasho chembamba kikimtiririka usoni na pumzi zikimbana kooni.',
    explanation: 'Sentensi hii inamfanya msomaji aone ishara halisi za kimwili za woga (kutetemeka magoti, kijasho chembamba, kubanwa na pumzi).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta sentensi inayoeleza ishara halisi za mwili za mtu anayeogopa.'
  },
  {
    id: 'q-g6-kisw-u10-017',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Ni alama ipi ya uakifishaji inayopaswa kutumika mwishoni mwa sentensi inayoonyesha hisia kali za mshangao au tahadhari?',
    options: [
      'Alama ya hisi / mshangao (!)',
      'Alama ya kuuliza (?)',
      'Kitone (.)',
      'Nuktamkato (;)'
    ],
    correctAnswer: 'Alama ya hisi / mshangao (!)',
    explanation: 'Alama ya hisi au mshangao (!) huwekwa mwishoni mwa neno au sentensi inayoonyesha mshangao mkubwa, hofu, amri au tahadhari.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu anapopiga kelele: "Heri nusu shari kuliko shari kamili!" anatumia alama gani mwishoni?'
  },
  {
    id: 'q-g6-kisw-u10-018',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Sentensi ipi inayoonyesha uakifishaji sahihi wa maneno ya mazungumzo (dayalojia) ndani ya insha?',
    options: [
      '"Simameni mara moja, mto unafurika!" alipiga kelele mzee Kiptoo.',
      '"Simameni mara moja, mto unafurika! Alipiga kelele mzee Kiptoo."',
      'Simameni mara moja, mto unafurika! "alipiga kelele mzee Kiptoo"',
      '"Simameni mara moja, mto unafurika"! Alipiga kelele mzee Kiptoo.'
    ],
    correctAnswer: '"Simameni mara moja, mto unafurika!" alipiga kelele mzee Kiptoo.',
    explanation: 'Alama ya hisi inakaa ndani ya alama za mtajo, na kitenzi cha kutaja "alipiga" huanza kwa herufi ndogo kwa sababu kinaendeleza sentensi hiyo.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Hakikisha alama ya hisi imo ndani ya alama za mtajo na kitenzi cha kusema hakianzi kwa herufi kubwa isivyo lazima.'
  },
  {
    id: 'q-g6-kisw-u10-019',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Kila aya ndani ya insha inapaswa kuwa na nini ili kuhakikisha mtiririko mzuri wa mawazo?',
    options: [
      'Wazo moja kuu lililofafanuliwa na kuendelezwa kwa mifano na matukio yanayohusiana',
      'Orodha ya majina ya wanafunzi wote darasani',
      'Methali zisizopungua tano katika kila mstari',
      'Mchanganyiko wa lugha ya Kiswahili na Kiingereza'
    ],
    correctAnswer: 'Wazo moja kuu lililofafanuliwa na kuendelezwa kwa mifano na matukio yanayohusiana',
    explanation: 'Aya nzuri hujengwa juu ya wazo kuu moja (topic sentence) ambalo hufafanuliwa na sentensi saidizi bila kurukaruka mawazo.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika uandishi bora wa aya, je, kila aya inatakiwa kuwa na wazo moja maalum au kuchanganya mada nyingi?'
  },
  {
    id: 'q-g6-kisw-u10-020',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Ni kosa lipi la mara kwa mara linalowapunguzia watahiniwa alama katika insha za masimulizi za KPSEA?',
    options: [
      'Kubadilisha nyakati ghafla bila sababu (kuhama kutoka wakati uliopita kwenda wakati uliopo)',
      'Kutumia hati nadhifu na safi inayosomeka vizuri',
      'Kuweka aya kwa kuanzia ndani kidogo (indentation)',
      'Kutumia msamiati mteule na uakifishaji sahihi'
    ],
    correctAnswer: 'Kubadilisha nyakati ghafla bila sababu (kuhama kutoka wakati uliopita kwenda wakati uliopo)',
    explanation: 'Mruko wa nyakati usio na mpangilio (tense shift error) hudhoofisha mtiririko wa hadithi na kupunguza alama za sarufi.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Hadithi inayosimuliwa katika wakati uliopita inapochanganywa ghafla na wakati uliopo, hilo ni kosa la nini?'
  },
  {
    id: 'q-g6-kisw-u10-021',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Hitimisho lipi kati ya haya lililo bora zaidi kwa insha ya KPSEA inayofundisha funzo la uaminifu?',
    options: [
      'Mwangaza wa jua ulipokuwa ukitua magharibi, nilitafakari na kugundua kuwa ukweli humweka mtu huru daima. Siku hiyo ilinifunza kuwa uaminifu ndiyo nguzo thabiti ya urafiki wa kudumu.',
      'Kisha nikazinduka usingizini nikagundua yote yalikuwa ndoto tu na mama alikuwa akinipikia uji.',
      'Na huo ndio ulikuwa mwisho wa insha yangu, kama uliipenda tafadhali nipe alama arobaini.',
      'Ghafla ndege ilitua ikatuchukua sote tukaenda Marekani tukaishi vizuri milele.'
    ],
    correctAnswer: 'Mwangaza wa jua ulipokuwa ukitua magharibi, nilitafakari na kugundua kuwa ukweli humweka mtu huru daima. Siku hiyo ilinifunza kuwa uaminifu ndiyo nguzo thabiti ya urafiki wa kudumu.',
    explanation: 'Hitimisho bora huacha funzo zito la kimaadili na kutoa tathmini ya mhusika, badala ya hitimisho za kimazoea kama "ilikuwa ndoto tu" ambazo hupunguza alama.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wasahihishaji hawapendi hitimisho za "ilikuwa ndoto tu". Ni chaguo lipi lenye funzo la hekima na tafakari?'
  },
  {
    id: 'q-g6-kisw-u10-022',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Soma sentensi hii kutoka kwenye rasimu ya insha: "Wale watoto [ambao kwamba walikuwa] wamepotea walipatikana." Ni urekebishaji upi wa kiufundi unaofaa kufanywa?',
    options: [
      'Kuondoa neno "kwamba" kwa sababu kutumia "ambao" na "kwamba" pamoja ni ubadhirifu wa maneno (tautology)',
      'Kubadilisha neno "watoto" liwe "mavitoto"',
      'Kuandika "ambao kwamba" mara mbili zaidi',
      'Kuondoa neno "walipatikana"'
    ],
    correctAnswer: 'Kuondoa neno "kwamba" kwa sababu kutumia "ambao" na "kwamba" pamoja ni ubadhirifu wa maneno (tautology)',
    explanation: 'Kishazi rejeshi hakiruhusu kuchanganya "ambao" na "kwamba" pamoja ("Wale watoto waliopotea..." au "Wale watoto ambao walipotea...").',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, inaleta maana ya kisarufi kuweka "ambao kwamba" pamoja katika kishazi kimoja?'
  },
  {
    id: 'q-g6-kisw-u10-023',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Wakati wa hatua ya "Uhariri wa Mwisho" (Proofreading) kabla ya kukabidhi insha kwa msimamizi, mwanafunzi anapaswa kufanya nini?',
    options: [
      'Kusoma insha nzima kwa utulivu ili kusahihisha makosa madogo ya tahajia, viambishi vya ngeli vilivyosahaulika, na alama za uakifishaji',
      'Kufuta nusu ya insha na kuanza kuandika hadithi mpya kabisa',
      'Kufuta alama zote za mtajo ili asifanye makosa ya koma',
      'Kupaka karatasi rangi ya manjano ili ivutie macho'
    ],
    correctAnswer: 'Kusoma insha nzima kwa utulivu ili kusahihisha makosa madogo ya tahajia, viambishi vya ngeli vilivyosahaulika, na alama za uakifishaji',
    explanation: 'Uhariri wa makini huhakikisha makosa ya kuteleza kwa kalamu (slips of the pen), upatanisho wa ngeli, na vitone vinarekebishwa bila woga.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika dakika tano za mwisho za mtihani, mwanafunzi mwangalifu hukagua nini kwenye insha yake?'
  },
  {
    id: 'q-g6-kisw-u10-024',
    subStrandId: 'substrand-g6-kisw-u10',
    lessonId: 'lesson-g6-kisw-u10-l2',
    text: 'Mbinu gani ya kimuundo inayomsaidia mwandishi wa insha kuepuka sentensi zinazoanza kwa namna moja inayochosha (kama vile: "Kisha... Kisha... Kisha...")?',
    options: [
      'Kutumia mianzo mbalimbali ya sentensi kama vile vishazi vielezi, vihisishi, au vishazi rejeshi',
      'Kutoweka sentensi yoyote yenye maneno zaidi ya matatu',
      'Kutumia maneno ya lugha ya sheng katikati ya kila sentensi',
      'Kuepuka kuandika aya kabisa'
    ],
    correctAnswer: 'Kutumia mianzo mbalimbali ya sentensi kama vile vishazi vielezi, vihisishi, au vishazi rejeshi',
    explanation: 'Utunzi wenye ustadi wa juu hutumia mseto wa mianzo mbalimbali ya sentensi ili kuleta mvuto na mdundo wa kupendeza katika usomaji.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ili sentensi zisionekane za kuchosha na zinazofanana, mwandishi bingwa hubadilikaje mianzo ya sentensi zake?'
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
console.log('Batch 5 (Capstone Finale) of Grade 6 Kiswahili Lugha successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
