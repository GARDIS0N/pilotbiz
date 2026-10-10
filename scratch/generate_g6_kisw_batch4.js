import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Kiswahili Lugha Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-kisw-u7',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Kilimo Biashara, Ufugaji Bora & Vitate, Vitateka, Visawe na Vinyume',
    description: 'Kujifunza msamiati wa kilimo biashara (ukulima wa parachichi za Hass, majani chai, umwagiliaji, kilimo cha mseto, ufugaji wa ng\'ombe wa maziwa); na kubobea katika upambanuzi wa vitate (maneno yenye matamshi yanayotatanisha), vitateka/vitatanishi, visawe (maneno yenye maana sawa), na vinyume vya maneno.',
    cbeCompetency: 'Ufahamu wa kilimo biashara na uzalishaji, na umilisi wa kiisimu wa vitate, visawe na vinyume',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g6-kisw-u8',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Utawala Bora, Haki za Watoto & Kauli Halisi na Kauli Taarifa',
    description: 'Kujifunza misingi ya ugatuzi, uongozi na uadilifu (Sura ya Sita ya Katiba), na haki za kimsingi za mtoto (Kifungu cha 53 cha Katiba ya Kenya 2010); na kutawala ubadilishaji wa sentensi kutoka Kauli Halisi (Direct Speech) hadi Kauli Taarifa (Indirect Speech) na kubadilisha viwakilishi vya nafsi na vielezi vya wakati na mahali.',
    cbeCompetency: 'Ufahamu wa katiba na uraia mwema, na umilisi wa kubadilisha kauli halisi kuwa kauli taarifa',
    estimatedMinutes: 30,
    order: 8
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 4 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-kisw-u7-l1',
    subStrandId: 'substrand-g6-kisw-u7',
    title: 'Kilimo Biashara, Ufugaji Bora na Ukulima wa Kisasa',
    content: 'Kilimo ni uti wa mgongo wa uchumi wa Kenya, kikitoa ajira na riziki kwa mamilioni ya wananchi.\n\n1. Kilimo Biashara (Agribusiness) nchini Kenya:\n- Mazao makuu ya biashara: Majani chai (Kericho na Nandi), kahawa (Nyeri na Kiambu), maua (Naivasha), na parachichi za kijani za Hass (Murang\'a, Meru na Kisii).\n- Ufugaji Bora wa Kisasa: Ufugaji wa ng\'ombe wa maziwa (mifugo ya kisasa kama vile ng\'ombe aina ya Friesian na Ayrshire), kuku wa mayai na nyama, pamoja na ufugaji wa nyuki (apiculture) katika mizinga ya kisasa kule Kitui na Baringo.\n\n2. Msamiati na Zana za Kilimo:\n- Mbolea mboji (Compost): Mbolea asilia inayotengenezwa kwa kuozesha majani na mabaki ya wanyama.\n- Umwagiliaji wa matone (Drip irrigation): Mbinu ya kuokoa maji inayomwagilia moja kwa moja kwenye shina la mmea.\n- Zana za shamba: Jembe (la kulimia na kupalilia), panga (ya kufyeka), kifyekeo (slasher), reki (ya kukusanyia majani), mtalimbo (wa kuchimbia mashimo ya miti).\n- Palizi (Weeding): Kung\'oa magugu yanayonyang\'anya mimea virutubisho na maji.\n\n3. Methali za Kilimo na Kazi:\n- "Mkulima ni mmoja, walaji ni wengi": Wakulima wanastahili kuthaminiwa sana na kuungwa mkono kwa kulisha taifa zima.\n- "Mvumilivu hula mbivu": Uvumilivu wa mkulima huzaa matunda matamu wakati wa mavuno.\n- "Mchovya asali hachovi mara moja": Jambo lenye faida huvutia kurudiwa tena na tena.',
    didYouKnow: 'Parachichi za Hass kutoka Kenya husafirishwa kwa ndege na meli zilizowekwa vifaa vya baridi hadi bara Ulaya na China zikiwa zimekomaa na zenye ubora wa kimataifa!',
    kenyanContext: 'Katika Kaunti ya Murang\'a, vikundi vya vijana wakulima huosha, kupima na kufungasha parachichi za Hass katika maboksi maalum ya kuuzwa ng\'ambo.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u7-l2',
    subStrandId: 'substrand-g6-kisw-u7',
    title: 'Vitate, Vitateka, Visawe na Vinyume vya Maneno',
    content: 'Uelewa sahihi wa maneno hutuwezesha kutumia lugha ya Kiswahili kwa ufasaha bila utata.\n\n1. Vitate (Minimal Pairs):\n- Maneno yenye maumbo au matamshi yanayokaribiana sana lakini maana zake ni tofauti kabisa:\n  * pata (pata kitu) vs bata (ndege wa majini).\n  * kaza (fanya kitu kishikane imara) vs kasa (mnyama afananaye na kobe wa baharini).\n  * shuka (teremka chini / kitambaa cha kitandani) vs suka (suka nywele / tikisa chombo).\n  * baba (mzazi wa kiume) vs papa (samaki mkubwa mwenye meno makali baharini).\n  * vua (vua nguo / vua samaki kwa ndoana) vs bua (shina gumu la mmea wa mahindi au mtama).\n  * tano (idadi 5) vs dano (tone la maji).\n\n2. Visawe (Synonyms):\n- Maneno yenye maana sawa au inayokaribiana:\n  * Rafiki = sahiba, mwenzi, mwandani, aushi.\n  * Barabara = njia, rasta, baraste.\n  * Giza = kiza, weusi.\n  * Nyumba = maskani, makazi, dharuba.\n\n3. Vinyume vya Vitenzi na Majina (Antonyms):\n- Panda (panda mti) -> Ng\'oa; Panda (panda basi) -> Shuka.\n- Anika (nguo juani) -> Anua (toa nguo juani kabla mvua haijanyesha).\n- Funga (mlango) -> Fungua.\n- Zaa -> Tasa (asiyezaa).\n- Mchapakazi / Hodari -> Mvivu / Mzembe.',
    didYouKnow: 'Vitate vingi katika Kiswahili husababishwa na tofauti ndogo ya kiisimu kati ya herufi za sauti ghuna (voiced kama "b", "d", "g") na sauti sighuna (voiceless kama "p", "t", "k")!',
    kenyanContext: 'Katika Shindano la Tahajia la Kitaifa (National Spelling Bee) jijini Nakuru, wanafunzi walisifiwa kwa kutofautisha maana ya vitate "kaza" na "kasa" kwa ufasaha.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u8-l1',
    subStrandId: 'substrand-g6-kisw-u8',
    title: 'Ugatuzi, Sura ya Sita na Haki za Watoto katika Katiba ya Kenya 2010',
    content: 'Katiba ya Kenya 2010 ndiyo sheria kuu ya nchi inayolinda haki na kuweka misingi ya utawala bora.\n\n1. Ugatuzi na Utawala Bora:\n- Mfumo wa ugatuzi uligawa utawala katika Serikali ya Kitaifa na Serikali 47 za Kaunti ili kupeleka huduma na maendeleo mashinani.\n- Sura ya Sita (Uongozi na Maadili): Inatamka kuwa uongozi wa umma ni dhamana ya heshima inayohitaji uadilifu, uwazi, uwajibikaji na kutojilimbikizia mali kwa njia za ufisadi.\n- Ushiriki wa Umma (Public Participation): Wananchi wanayo haki ya kidemokrasia kutoa maoni yao katika mabaraza kabla ya sheria au miradi kutekelezwa.\n\n2. Kifungu cha 53: Haki za Mtoto:\n- Kila mtoto ana haki ya kuwa na jina na utaifa kuanzia anapozaliwa.\n- Kila mtoto ana haki ya kupata elimu ya msingi ya bure na ya lazima.\n- Kila mtoto ana haki ya kupata lishe bora, makazi salama na huduma za matibabu.\n- Kila mtoto ana haki ya kulindwa dhidi ya unyanyasaji, mila potovu zenye madhara, na ajira ya watoto.\n- Maslahi bora ya mtoto ni jambo la kwanza linalozingatiwa katika sheria zote.\n\n3. Vyeo vya Kiuongozi:\n- Gavana: Mkuu wa Serikali ya Kaunti.\n- Seneta: Mwakilishi wa maslahi ya kaunti katika Bunge la Seneti.\n- Mbunge: Mwakilishi wa eneo bunge katika Bunge la Kitaifa.\n- Mwakilishi wa Wadi (MCA): Mjumbe wa Bunge la Kaunti.',
    didYouKnow: 'Kifungu cha 53 cha Katiba ya Kenya 2010 kinatamka rasmi kuwa maslahi bora ya mtoto ndiyo jambo la kipaumbele cha kwanza katika kila jambo linalomhusu mtoto!',
    kenyanContext: 'Wanafunzi wa Shule ya Msingi ya Kibera huendesha mabaraza ya shule (school baraza) wakiwachagua viongozi wao kwa kura ya siri na uhuru kamili.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u8-l2',
    subStrandId: 'substrand-g6-kisw-u8',
    title: 'Kauli Halisi na Kauli Taarifa: Mabadiliko ya Viambishi na Vielezi',
    content: 'Mbinu za kuwasilisha maneno ya wazungumzaji kwa ufasaha katika tungo na insha za KPSEA.\n\n1. Kauli Halisi (Direct Speech):\n- Maneno halisi yaliyotamkwa na msemaji yanapowekwa wazi bila kubadilishwa.\n- Kanuni za uakifishaji: Maneno hunukuliwa ndani ya alama za mtajo / nukuu ("..."), herufi ya kwanza ndani ya alama hizo huwa kubwa, na koma hutenga maneno na kauli ya mtajo.\n- Mfano: Gavana alisema, "Wananchi wote wana haki ya kupata maji safi."\n\n2. Kauli Taarifa (Reported / Indirect Speech):\n- Kutoa taarifa ya yale yaliyosemwa bila kutumia maneno halisi ya msemaji.\n- Kanuni: Alama za mtajo huondolewa; kiunganishi "kuwa" au "kwamba" hutumika.\n- Mfano: Gavana alisema kwamba wananchi wote walikuwa na haki ya kupata maji safi.\n\n3. Mabadiliko Muhimu ya Nafsi, Wakati na Vielezi:\n- Nafsi ya kwanza (Mimi -> Yeye; Sisi -> Wao):\n  * Halisi: "Nitasoma kitabu," alisema Juma.\n  * Taarifa: Juma alisema kuwa angesoma kitabu.\n- Vielezi vya Wakati na Mahali:\n  * Leo -> siku hiyo.\n  * Jana -> siku iliyotangulia / siku ya awali.\n  * Kesho -> siku iliyofuata / kesho yake.\n  * Sasa -> wakati huo.\n  * Hapa -> pale / hapo.\n  * Huku -> kule.',
    didYouKnow: 'Kwenye kumbukumbu rasmi za Hansard za Bunge la Kenya, mijadala na hotuba zote za wawakilishi wa wananchi hunakiliwa katika kauli taarifa!',
    kenyanContext: 'Katika taarifa ya habari ya KBC, mtangazaji alisoma: "Waziri wa Elimu alitangaza kwamba mitihani ya KPSEA ingeanza rasmi siku iliyofuata."',
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

// 3. Batch 4 Missions (Orders 154 to 157)
const missionsToAdd = [
  {
    id: 'mission-g6-kisw-u7-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 154: Mashamba ya Murang\'a – Kilimo Biashara na Mazao',
    description: 'Tambua zana za kilimo, parachichi za Hass, umwagiliaji wa matone, na methali za ukulima.',
    order: 154,
    orderIndex: 154,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-kilimo',
    badge: 'badge-g6-kisw-kilimo',
    lessonId: 'lesson-g6-kisw-u7-l1',
    questionIds: [
      'q-g6-kisw-u7-001', 'q-g6-kisw-u7-002', 'q-g6-kisw-u7-003', 'q-g6-kisw-u7-004',
      'q-g6-kisw-u7-005', 'q-g6-kisw-u7-006', 'q-g6-kisw-u7-007', 'q-g6-kisw-u7-008',
      'q-g6-kisw-u7-009', 'q-g6-kisw-u7-010', 'q-g6-kisw-u7-011', 'q-g6-kisw-u7-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u7-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 155: Saikolojia ya Maneno – Vitate, Visawe na Vinyume',
    description: 'Bobea katika utofautishaji wa vitate (pata/bata, kaza/kasa), visawe vya maneno, na vinyume vya vitenzi.',
    order: 155,
    orderIndex: 155,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-vitate-visawe',
    badge: 'badge-g6-kisw-vitate-visawe',
    lessonId: 'lesson-g6-kisw-u7-l2',
    questionIds: [
      'q-g6-kisw-u7-013', 'q-g6-kisw-u7-014', 'q-g6-kisw-u7-015', 'q-g6-kisw-u7-016',
      'q-g6-kisw-u7-017', 'q-g6-kisw-u7-018', 'q-g6-kisw-u7-019', 'q-g6-kisw-u7-020',
      'q-g6-kisw-u7-021', 'q-g6-kisw-u7-022', 'q-g6-kisw-u7-023', 'q-g6-kisw-u7-024'
    ]
  },
  {
    id: 'mission-g6-kisw-u8-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 156: Ukumbi wa Katiba – Ugatuzi na Haki za Mtoto',
    description: 'Chambua haki za mtoto chini ya Kifungu cha 53, ugatuzi wa kaunti 47, na viongozi wa utawala bora.',
    order: 156,
    orderIndex: 156,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-katiba',
    badge: 'badge-g6-kisw-katiba',
    lessonId: 'lesson-g6-kisw-u8-l1',
    questionIds: [
      'q-g6-kisw-u8-001', 'q-g6-kisw-u8-002', 'q-g6-kisw-u8-003', 'q-g6-kisw-u8-004',
      'q-g6-kisw-u8-005', 'q-g6-kisw-u8-006', 'q-g6-kisw-u8-007', 'q-g6-kisw-u8-008',
      'q-g6-kisw-u8-009', 'q-g6-kisw-u8-010', 'q-g6-kisw-u8-011', 'q-g6-kisw-u8-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u8-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 157: Ripoti ya Hansard – Kauli Halisi na Kauli Taarifa',
    description: 'Bobea katika ubadilishaji wa kauli halisi kuwa kauli taarifa, mabadiliko ya nafsi, wakati na vielezi.',
    order: 157,
    orderIndex: 157,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-kauli-taarifa',
    badge: 'badge-g6-kisw-kauli-taarifa',
    lessonId: 'lesson-g6-kisw-u8-l2',
    questionIds: [
      'q-g6-kisw-u8-013', 'q-g6-kisw-u8-014', 'q-g6-kisw-u8-015', 'q-g6-kisw-u8-016',
      'q-g6-kisw-u8-017', 'q-g6-kisw-u8-018', 'q-g6-kisw-u8-019', 'q-g6-kisw-u8-020',
      'q-g6-kisw-u8-021', 'q-g6-kisw-u8-022', 'q-g6-kisw-u8-023', 'q-g6-kisw-u8-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Questions for Units 7 & 8 (48 questions: 24 for Unit 7, 24 for Unit 8)
const questionsToAdd = [
  // ==========================================
  // Unit 7 Lesson 1: Kilimo Biashara & Ufugaji (q-g6-kisw-u7-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u7-001',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Zao lipi la matunda ya biashara linalolimwa kwa wingi katika kaunti za Murang\'a na Meru ambalo husafirishwa kwenda nchi za ng\'ambo?',
    options: [
      'Parachichi za aina ya Hass',
      'Miwa ya kienyeji tu',
      'Ndizi mbichi za kupika',
      'Mihogo mikavu'
    ],
    correctAnswer: 'Parachichi za aina ya Hass',
    explanation: 'Parachichi za Hass (Hass avocados) ni zao kubwa sana la mauzo ya nje ya nchi nchini Kenya linalozalishwa na wakulima wengi wa Murang\'a, Meru na Kisii.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni tunda gani la kijani lenye mafuta asilia lenye zao maarufu la aina ya Hass?'
  },
  {
    id: 'q-g6-kisw-u7-002',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Kitendo cha kung\'oa au kuondoa magugu shambani ili mimea ipate hewa, jua na rutuba huitwaje?',
    options: [
      'Palizi',
      'Mavuno',
      'Upandaji',
      'Upukuchaji'
    ],
    correctAnswer: 'Palizi',
    explanation: '"Palizi" (weeding) ni kazi ya kuondoa magugu yanayoshindania maji na virutubisho na mimea iliyopandwa shambani.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mkulima anapotumia jembe kung\'oa magugu shamba lisafike, anafanya kazi ya nini?'
  },
  {
    id: 'q-g6-kisw-u7-003',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Mbolea ya asili inayotengenezwa kwa kuozesha majani na kinyesi cha mifugo inaitwaje?',
    options: [
      'Mbolea mboji',
      'Mbolea ya kemikali',
      'Mchanga wa ujenzi',
      'Chokaa ya rangi'
    ],
    correctAnswer: 'Mbolea mboji',
    explanation: 'Mbolea mboji (compost manure) hutengenezwa kwa kuozesha masalia ya mimea, majani makavu na samadi shambani.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mbolea inayotokana na majani na masalia ya vyakula yaliyooza ardhini inaitwa mbolea gani?'
  },
  {
    id: 'q-g6-kisw-u7-004',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Kamilisha methali inayohusu uvumilivu na matunda ya kazi: "Mvumilivu hula __________."',
    options: [
      'mbivu',
      'mbichi',
      'ugali',
      'nyama'
    ],
    correctAnswer: 'mbivu',
    explanation: '"Mvumilivu hula mbivu" hufundisha kwamba mtu mwenye subira hungojea matunda yakomae vizuri ndipo ayafurahie.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kati ya matunda mbichi na mbivu, mtu mvumilivu anayesubiri hadi yaiwe atakula yapi?'
  },
  {
    id: 'q-g6-kisw-u7-005',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Mbinu ya kisasa ya umwagiliaji inayomwaga maji kidogokidogo moja kwa moja kwenye mizizi ya mmea na kuokoa maji inaitwaje?',
    options: [
      'Umwagiliaji wa matone',
      'Mafuriko ya mfereji',
      'Mvua ya chupa',
      'Umwagiliaji wa ghafla'
    ],
    correctAnswer: 'Umwagiliaji wa matone',
    explanation: 'Umwagiliaji wa matone (drip irrigation) hupitisha maji kupitia mifereji maalum yenye matundu madogo yanayotiririsha matone kwenye mizizi.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mfumo upi wa umwagiliaji unaotiririsha matone ya maji moja kwa moja kwenye shina?'
  },
  {
    id: 'q-g6-kisw-u7-006',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Zana ya kilimo yenye makali ya kukatia miti midogo na kufyeka magugu inaitwaje?',
    options: [
      'Panga (au Kifyekeo)',
      'Reki',
      'Mtalimbo pekee',
      'Kikombe cha bati'
    ],
    correctAnswer: 'Panga (au Kifyekeo)',
    explanation: 'Panga au kifyekeo hutumika kufyeka nyasi ndefu na magugu kandokando ya shamba.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Zana yenye bapa ndefu ya chuma inayotumiwa kufyeka majani inaitwaje?'
  },
  {
    id: 'q-g6-kisw-u7-007',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Ufugaji wa nyuki kwenye mizinga maalum kwa ajili ya kuzalisha asali safi na nta huitwaje kitaalamu?',
    options: [
      'Ufugaji nyuki (Apikacha)',
      'Uvuvi wa ziwani',
      'Ufugaji kuku',
      'Ukulima wa mboga'
    ],
    correctAnswer: 'Ufugaji nyuki (Apikacha)',
    explanation: 'Ufugaji wa nyuki (apiculture) ni shughuli ya kibiashara ya kutunza nyuki kwenye mizinga ili kupata asali na nta ya kuuza.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wakulima wa Kitui wanapoweka mizinga ya miti kutega nyuki, wanafanya shughuli gani?'
  },
  {
    id: 'q-g6-kisw-u7-008',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Methali: "Mkulima ni mmoja, walaji ni wengi." Inafundisha nini kuhusu heshima ya kilimo?',
    options: [
      'Mkulima anatakiwa kuheshimiwa na kuungwa mkono kwa sababu chakula anachozalisha kinalisha jamii nzima',
      'Watu wote wanapaswa kula chakula bila kulipa',
      'Mkulima hapaswi kula chakula anacholima',
      'Shamba moja linapaswa kulimwa na mtu mmoja pekee'
    ],
    correctAnswer: 'Mkulima anatakiwa kuheshimiwa na kuungwa mkono kwa sababu chakula anachozalisha kinalisha jamii nzima',
    explanation: 'Methali hii inasisitiza kuwa mkulima ndiye tegemeo la jamii na kazi yake ni ya heshima kubwa kwa ustawi wa taifa.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kwa nini kazi ya mkulima ni ya heshima kubwa katika uchumi wa kila siku?'
  },
  {
    id: 'q-g6-kisw-u7-009',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Ni aina ipi ya ng\'ombe wa kisasa wa maziwa wanaofugwa na wakulima wa Kenya inayotoa kiasi kikubwa zaidi cha maziwa kwa siku?',
    options: [
      'Friesian',
      'Zebu wa kiasili pekee',
      'Ngamia wa jangwani',
      'Mbuzi wa mlimani'
    ],
    correctAnswer: 'Friesian',
    explanation: 'Ng\'ombe aina ya Friesian (mwenye madoa meusi na meupe) huzalisha kiasi kikubwa sana cha maziwa kwa siku akitunzwa vizuri.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni aina gani ya ng\'ombe wa Ulaya mwenye rangi nyeusi na nyeupe maarufu kwa kutoa maziwa mengi?'
  },
  {
    id: 'q-g6-kisw-u7-010',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Soma maelezo haya: "Wakulima wa Kaunti ya Kisii hupanda mahindi, maharagwe na migomba kwenye shamba moja ili kuzuia mmomonyoko na kuongeza rutuba." Mfumo huu wa kilimo huitwaje?',
    options: [
      'Kilimo cha mseto',
      'Ukataji miti kiholela',
      'Kilimo cha zao moja tu',
      'Ufugaji wa kuhamahama'
    ],
    correctAnswer: 'Kilimo cha mseto',
    explanation: 'Kilimo cha mseto (intercropping/mixed cropping) ni upandaji wa mazao ya aina tofauti katika shamba moja kwa wakati mmoja ili kurutubisha udongo na kuongeza mazao.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Upandaji wa mazao zaidi ya moja kwenye shamba moja unaitwa kilimo cha m...?'
  },
  {
    id: 'q-g6-kisw-u7-011',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Zana ya chuma ndefu na nzito inayotumiwa na wakulima kutoboa mashimo ya nguzo au mashimo ya kupandia miti mikubwa inaitwaje?',
    options: [
      'Mtalimbo',
      'Kikereketwa',
      'Ufagio wa chelewa',
      'Kisu cha jikoni'
    ],
    correctAnswer: 'Mtalimbo',
    explanation: '"Mtalimbo" (crowbar) ni nondo au mti mzito wa chuma wenye ncha kali unaotumika kuchimbia ardhi ngumu au mawe.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni chombo kipi kirefu kizito cha chuma chenye ncha bapa kinachotumiwa kuchimba ardhi yenye mawe?'
  },
  {
    id: 'q-g6-kisw-u7-012',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l1',
    text: 'Katika kilimo cha chai nchini Kenya, majani ya chai yanayovunwa yanapaswa kuwa ya namna gani ili kutoa chai ya daraja la juu?',
    options: [
      'Majani mawili machanga na chipukizi (jicho/kikonyo kimoja)',
      'Matawi makavu yaliyoanguka chini',
      'Mizizi ya mti wa chai iliyochimbwa',
      'Majani yaliyooza kwa mvua'
    ],
    correctAnswer: 'Majani mawili machanga na chipukizi (jicho/kikonyo kimoja)',
    explanation: 'Viwanda vya KTDA vinasisitiza uvunaji wa "majani mawili na chipukizi" (two leaves and a bud) ili kutengeneza chai safi ya kiwango cha kimataifa.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kaulimbiu ipi maarufu ya wachuma chai kuhusu idadi ya majani machanga ya juu?'
  },

  // ==========================================
  // Unit 7 Lesson 2: Vitate, Visawe na Vinyume (q-g6-kisw-u7-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u7-013',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Ni maneno yapi yanayounda mfano wa "vitate" (maneno yenye matamshi yanayokaribiana lakini maana tofauti)?',
    options: [
      'Pata na bata',
      'Pata na pata',
      'Nyumba na maskani',
      'Mrefu na mfupi'
    ],
    correctAnswer: 'Pata na bata',
    explanation: '"Pata" na "bata" hutofautiana kwa herufi za mwanzo tu (p vs b) zenye sauti zinazokaribiana lakini maana zake ni tofauti kabisa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni jozi ipi yenye maneno yanayotamkwa kwa ukaribu sana lakini moja linamaanisha ndege na lingine kitendo?'
  },
  {
    id: 'q-g6-kisw-u7-014',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Kisawe cha neno "rafiki" katika Kiswahili sanifu ni nini?',
    options: [
      'Sahiba',
      'Adui',
      'Mtesi',
      'Mpinzani'
    ],
    correctAnswer: 'Sahiba',
    explanation: '"Sahiba", "mwenzi", na "mwandani" ni visawe vya neno "rafiki".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi linalomaanisha mtu unayependana naye na kushirikiana naye kama rafiki?'
  },
  {
    id: 'q-g6-kisw-u7-015',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Kinyume cha kitenzi "anika" (nguo juani) ni nini?',
    options: [
      'Anua',
      'Fua',
      'Loweka',
      'Piga pasi'
    ],
    correctAnswer: 'Anua',
    explanation: '"Anika" ni kuweka nguo juani ili zikauke; kinyume chake ni "anua", yaani kutoa nguo juani baada ya kukauka.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mvua ikianza kunyesha, unakimbia kamba ya nguo kufanya nini kwa nguo zilizokuwa zimeanikwa?'
  },
  {
    id: 'q-g6-kisw-u7-016',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Neno "shuka" (kuteremka chini) lina kitate kipi chenye maana ya kupanga nywele kwa mikono?',
    options: [
      'Suka',
      'Kuka',
      'Chuka',
      'Tuka'
    ],
    correctAnswer: 'Suka',
    explanation: '"Shuka" (kuteremka) na "suka" (kusuka nywele) ni vitate vinavyotofautiana kwa herufi "sh" na "s".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi linalotamkwa karibu na "shuka" lakini linamaanisha kusuka nywele kichwani?'
  },
  {
    id: 'q-g6-kisw-u7-017',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Ni neno lipi lenye maana sawa (kisawe) na neno "barabara" (njia kubwa ya magari)?',
    options: [
      'Njia (au Baraste)',
      'Barafu',
      'Daraja',
      'Mtaro'
    ],
    correctAnswer: 'Njia (au Baraste)',
    explanation: '"Njia", "baraste", na "rasta" ni visawe vya neno barabara katika Kiswahili.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi la kawaida la Kiswahili linalomaanisha mahali watu na magari wanapopita?'
  },
  {
    id: 'q-g6-kisw-u7-018',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Tofautisha maana ya vitate hivi: "kaza" na "kasa":',
    options: [
      '"Kaza" ni kufanya kitu kishikane kwa nguvu, ilhali "kasa" ni mnyama anayeishi baharini afananaye na kobe',
      '"Kasa" ni zana ya shamba na "kaza" ni ndege wa angani',
      'Maneno yote mawili yanamaanisha samaki wa ziwani',
      '"Kaza" ni chakula na "kasa" ni nguo'
    ],
    correctAnswer: '"Kaza" ni kufanya kitu kishikane kwa nguvu, ilhali "kasa" ni mnyama anayeishi baharini afananaye na kobe',
    explanation: '"Kaza" (kitenzi: kaza kamba/skrubu) na "kasa" (nomino: mnyama kobe wa majini/baharini).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Unapofunga mshipi kwa nguvu unasema "kaza". "Kasa" naye ni kiumbe gani wa majini?'
  },
  {
    id: 'q-g6-kisw-u7-019',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Kinyume cha nomino "mchapakazi" au "hodari" ni nini?',
    options: [
      'Mvivu (au Mzembe)',
      'Mwepesi',
      'Shujaa',
      'Mkarimu'
    ],
    correctAnswer: 'Mvivu (au Mzembe)',
    explanation: 'Mtu anayefanya kazi kwa bidii (mchapakazi) kinyume chake ni yule anayechukia kazi (mvivu au mzembe).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtu asiyetaka kufanya kazi na kupenda kulala mchana kutwa anaitwaje?'
  },
  {
    id: 'q-g6-kisw-u7-020',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Katika sentensi: "Mvuvi alitupa nyavu ili kuvua samaki," neno "vua" lina kitate kipi chenye maana ya shina la mahindi?',
    options: [
      'Bua',
      'Pua',
      'Zua',
      'Kua'
    ],
    correctAnswer: 'Bua',
    explanation: '"Vua" na "bua" ni vitate. "Bua" ni shina kavu au mbichi la mmea wa nafaka kama vile mahindi au mtama.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Shina la mahindi linalotafunwa kwa utamu linaitwa nini? (lina herufi "b").'
  },
  {
    id: 'q-g6-kisw-u7-021',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Ni sentensi ipi inayotumia vitate "baba" na "papa" kwa usahihi wa muktadha?',
    options: [
      'Baba yangu alinunua kitoweo cha samaki papa sokoni.',
      'Papa yangu alinipeleka shuleni asubuhi.',
      'Samaki baba aliogelea baharini kwa kasi.',
      'Baba na papa wote ni wazazi wangu wa kiume.'
    ],
    correctAnswer: 'Baba yangu alinunua kitoweo cha samaki papa sokoni.',
    explanation: '"Baba" ni mzazi wa kiume na "papa" ni samaki mkubwa wa baharini. Sentensi inatumia maneno yote mawili kwa usahihi.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama neno "baba" (mzazi) na "papa" (samaki wa baharini).'
  },
  {
    id: 'q-g6-kisw-u7-022',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Mwanamke au mnyama wa kike asiyezaa kabisa huitwaje katika lugha fasaha ya Kiswahili?',
    options: [
      'Tasa',
      'Mwari',
      'Kifungua mimba',
      'Kipenzi'
    ],
    correctAnswer: 'Tasa',
    explanation: '"Tasa" ni kinyume cha mzaaji, kumaanisha kiumbe wa kike asiye na uwezo wa kuzaa watoto.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi sanifu lenye maana ya kutokuwa na uwezo wa kushika mimba au kuzaa?'
  },
  {
    id: 'q-g6-kisw-u7-023',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Tambua neno ambalo SI kisawe cha maneno mengine katika orodha hii:\n"maskani", "makazi", "dharuba", "makaazi"',
    options: [
      'dharuba',
      'maskani',
      'makazi',
      'makaazi'
    ],
    correctAnswer: 'dharuba',
    explanation: '"Maskani", "makazi" na "makaazi" yanamaanisha nyumba au mahali pa kuishi, ilhali "dharuba" inamaanisha dhoruba kali au msukosuko.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi katika orodha hiyo ambalo halimaanishi mahali pa kuishi (nyumba)?'
  },
  {
    id: 'q-g6-kisw-u7-024',
    subStrandId: 'substrand-g6-kisw-u7',
    lessonId: 'lesson-g6-kisw-u7-l2',
    text: 'Kitenzi "panda" kina maana mbili tofauti (tata): (1) kupanda mbegu shambani na (2) kupanda ngazi au gari. Vinyume vyake sahihi kwa mtiririko huo ni vipi?',
    options: [
      'Ng\'oa na Shuka',
      'Shuka na Shuka',
      'Palilia na Endesha',
      'Vuna na Simama'
    ],
    correctAnswer: 'Ng\'oa na Shuka',
    explanation: 'Kinyume cha kupanda mmea shambani ni "ng\'oa", na kinyume cha kupanda gari au ngazi ni "shuka".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ukipanda mti kinyume chake ni nini, na ukipanda basi kinyume chake ni kipi?'
  },

  // ==========================================
  // Unit 8 Lesson 1: Utawala Bora & Haki za Watoto (q-g6-kisw-u8-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u8-001',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Chini ya Kifungu cha 53 cha Katiba ya Kenya 2010, ni ipi haki ya kimsingi ya kila mtoto wa Kenya?',
    options: [
      'Haki ya kupata elimu ya msingi ya bure na ya lazima',
      'Haki ya kuendesha magari ya biashara akiwa na umri wa miaka tisa',
      'Haki ya kufanya kazi ngumu usiku kucha viwandani',
      'Haki ya kutolala usingizi kabisa'
    ],
    correctAnswer: 'Haki ya kupata elimu ya msingi ya bure na ya lazima',
    explanation: 'Kifungu cha 53(1)(b) cha Katiba ya Kenya 2010 kinamhakikishia kila mtoto haki ya kupata elimu ya msingi ya bure na ya lazima.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni haki ipi inayomhakikishia kila mtoto kwenda shule ya msingi bila kufukuzwa kwa karo?'
  },
  {
    id: 'q-g6-kisw-u8-002',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Sura ya Sita ya Katiba ya Kenya 2010 inashughulikia jambo gani kuu miongoni mwa viongozi wa umma?',
    options: [
      'Uongozi na Maadili (Uadilifu)',
      'Sheria za kucheza mpira wa miguu',
      'Ukataji miti ya mbao',
      'Ujenzi wa madaraja ya reli pekee'
    ],
    correctAnswer: 'Uongozi na Maadili (Uadilifu)',
    explanation: 'Sura ya Sita ya Katiba inaitwa "Leadership and Integrity" (Uongozi na Maadili) na inasisitiza uaminifu na uwajibikaji wa viongozi.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Sura ya Sita inasifika sana nchini Kenya kwa kusisitiza nidhamu na nini miongoni mwa viongozi?'
  },
  {
    id: 'q-g6-kisw-u8-003',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Mkuu wa serikali ya kaunti aliyechaguliwa na wananchi anaitwaje?',
    options: [
      'Gavana',
      'Chifu tu',
      'Hakimu wa mahakama',
      'Mwalimu mkuu'
    ],
    correctAnswer: 'Gavana',
    explanation: 'Gavana (Governor) ndiye kiongozi mkuu wa serikali ya kaunti aliyechaguliwa kidemokrasia na wananchi wa kaunti husika.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kiongozi anayeongoza serikali ya kaunti anaitwaje?'
  },
  {
    id: 'q-g6-kisw-u8-004',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Hati rasmi ya kisheria anayopewa mtoto mchanga baada ya kuzaliwa inayothibitisha jina lake, wazazi na utaifa wake inaitwaje?',
    options: [
      'Cheti cha kuzaliwa',
      'Kadi ya benki',
      'Leseni ya gari',
      'Risiti ya duka'
    ],
    correctAnswer: 'Cheti cha kuzaliwa',
    explanation: 'Cheti cha kuzaliwa (birth certificate) ndiyo hati ya kwanza ya kisheria inayothibitisha utambulisho na haki ya jina na utaifa wa mtoto.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mtoto anapozaliwa hospitalini au kijijini anasajiliwa na kupewa cheti gani cha utambulisho?'
  },
  {
    id: 'q-g6-kisw-u8-005',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Ugatuzi una maana gani katika uongozi wa Kenya chini ya Katiba ya mwaka 2010?',
    options: [
      'Kugawa mamlaka na rasilimali za taifa kutoka serikali kuu hadi serikali 47 za kaunti',
      'Kufuta kabisa sheria zote za nchi',
      'Kufunga ofisi zote za serikali kijijini',
      'Kumpa kiongozi mmoja mamlaka ya kuamua kila kitu bila kufuata sheria'
    ],
    correctAnswer: 'Kugawa mamlaka na rasilimali za taifa kutoka serikali kuu hadi serikali 47 za kaunti',
    explanation: 'Ugatuzi (devolution) hupeleka maamuzi, rasilimali na fedha za maendeleo karibu na wananchi katika kaunti 47.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Serikali kuu inaposambaza fedha na maamuzi kwenye serikali za kaunti, mfumo huo unaitwaje?'
  },
  {
    id: 'q-g6-kisw-u8-006',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Kifungu cha 53(2) kinasema kuwa katika kila jambo linalomhusu mtoto, ni kitu gani kinachopaswa kupewa kipaumbele cha juu zaidi?',
    options: [
      'Maslahi bora ya mtoto',
      'Faida za kibiashara za matajiri',
      'Matakwa ya watu wazima pekee',
      'Idadi ya magari ya shule'
    ],
    correctAnswer: 'Maslahi bora ya mtoto',
    explanation: 'Kifungu cha 53(2) kinatamka kwamba maslahi bora ya mtoto (the best interests of the child) ndiyo jambo kuu katika uamuzi wowote.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika maamuzi ya shule au mahakama, usalama na mustakabali wa nani unaotakiwa kuwekwa kwanza?'
  },
  {
    id: 'q-g6-kisw-u8-007',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Haki ya kidemokrasia ya wananchi kutoa maoni yao katika mikutano kabla ya mipango au sheria za serikali kutekelezwa inaitwaje?',
    options: [
      'Ushiriki wa umma',
      'Uasi wa kijamii',
      'Mgomo wa siri',
      'Uamuzi wa kibinafsi'
    ],
    correctAnswer: 'Ushiriki wa umma',
    explanation: 'Ushiriki wa umma (public participation) ni msingi mkuu wa Katiba ya Kenya unaowapa wananchi sauti katika usimamizi wa rasilimali zao.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Watu wanapokusanyika kwenye baraza kutoa maoni kuhusu bajeti ya kaunti, wanatekeleza nini?'
  },
  {
    id: 'q-g6-kisw-u8-008',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Kiongozi anayewakilisha wadi katika Bunge la Kaunti (County Assembly) anaitwaje?',
    options: [
      'Mwakilishi wa Wadi (MCA)',
      'Gavana',
      'Hakimu mkuu',
      'Spika wa Bunge la Kitaifa'
    ],
    correctAnswer: 'Mwakilishi wa Wadi (MCA)',
    explanation: 'Mwakilishi wa Wadi (Member of County Assembly - MCA) hutunga sheria na kuwakilisha wadi yake katika Bunge la Kaunti.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kifupisho cha Kiingereza "MCA" kinasimamia nani katika Kiswahili sanifu?'
  },
  {
    id: 'q-g6-kisw-u8-009',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Ni kitendo kipi kinachochukuliwa kama ukiukaji mkubwa wa haki za watoto kulingana na sheria za Kenya?',
    options: [
      'Kumlazimisha mtoto wa miaka kumi kufanya kazi nzito machimboni badala ya kwenda shule',
      'Kumpa mtoto lishe bora na matunda shuleni',
      'Kumpatia mtoto chanjo ya kuzuia magonjwa zahanatini',
      'Kumfundisha mtoto nidhamu na adabu njema nyumbani'
    ],
    correctAnswer: 'Kumlazimisha mtoto wa miaka kumi kufanya kazi nzito machimboni badala ya kwenda shule',
    explanation: 'Ajira ya watoto (child labour) na kuwanyima watoto haki ya elimu ni uvunjaji wa wazi wa Kifungu cha 53 cha Katiba na Sheria ya Watoto.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kati ya vitendo hivyo, kipi kinachomdhuru mtoto na kumnyima elimu ya msingi?'
  },
  {
    id: 'q-g6-kisw-u8-010',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Kiongozi mwenye uadilifu anayeheshimu Sura ya Sita ya Katiba huonyesha tabia ipi anaposimamia fedha za umma?',
    options: [
      'Uwazi na uwajibikaji kamili bila ubadhirifu wala upendeleo',
      'Kuficha taarifa za matumizi ya fedha kwa wananchi',
      'Kugawia jamaa zake kandarasi za serikali kisiri',
      'Kukataa kujibu maswali katika bunge la kaunti'
    ],
    correctAnswer: 'Uwazi na uwajibikaji kamili bila ubadhirifu wala upendeleo',
    explanation: 'Sura ya Sita inasisitiza kwamba kiongozi anapaswa kuwa muwazi, mwenye nidhamu ya kifedha, na asiyeegemea upendeleo (nepotism).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni sifa gani njema inayohakikisha kiongozi anatumia fedha za walipakodi kwa uaminifu?'
  },
  {
    id: 'q-g6-kisw-u8-011',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Baraza la shule (school baraza) ambalo wanafunzi hukutana na kueleza changamoto zao kwa walimu linakuza maadili gani ya kikatiba?',
    options: [
      'Demokrasia, uhuru wa kujieleza na uongozi shirikishi',
      'Ukaidi dhidi ya kanuni za shule',
      'Kutofanya mitihani ya darasani',
      'Kupoteza muda wa masomo'
    ],
    correctAnswer: 'Demokrasia, uhuru wa kujieleza na uongozi shirikishi',
    explanation: 'Mabaraza ya shule huwajengea watoto stadi za uongozi bora, utatuzi wa migogoro kwa amani na uhuru wa kikatiba wa kutoa maoni.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wanafunzi wanapopewa fursa ya kutoa maoni yao kwa heshima wanajifunza maadili gani?'
  },
  {
    id: 'q-g6-kisw-u8-012',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l1',
    text: 'Tawi la serikali lenye wajibu wa kutafsiri katiba, kusikiliza kesi na kutoa haki bila ubaguzi nchini Kenya linaitwaje?',
    options: [
      'Mahakama (Idara ya Mahakama)',
      'Bunge la Kitaifa pekee',
      'Baraza la Mawaziri',
      'Tume ya Polisi'
    ],
    correctAnswer: 'Mahakama (Idara ya Mahakama)',
    explanation: 'Mahakama (Judiciary) ndilo tawi huru la serikali linalotafsiri sheria na kutoa haki kwa wananchi wote kulingana na Katiba.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni chombo kipi kinachoongozwa na Jaji Mkuu kinachotoa hukumu na haki nchini?'
  },

  // ==========================================
  // Unit 8 Lesson 2: Kauli Halisi na Kauli Taarifa (q-g6-kisw-u8-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u8-013',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Sentensi ipi inayoonyesha uakifishaji sahihi wa Kauli Halisi (Direct Speech)?',
    options: [
      'Mwalimu alisema, "Kila mwanafunzi asome kwa makini."',
      'Mwalimu alisema "Kila mwanafunzi asome kwa makini".',
      'Mwalimu alisema, "kila mwanafunzi asome kwa makini".',
      'Mwalimu alisema kwamba kila mwanafunzi asome kwa makini.'
    ],
    correctAnswer: 'Mwalimu alisema, "Kila mwanafunzi asome kwa makini."',
    explanation: 'Katika kauli halisi, kuna koma kabla ya mtajo, herufi ya kwanza ndani ya alama za mtajo ni kubwa, na alama ya kitone (kikomo) huwekwa ndani ya alama za mtajo.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama herufi kubwa mwanzoni mwa nukuu na kitone kilipo ndani ya alama za mtajo.'
  },
  {
    id: 'q-g6-kisw-u8-014',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Badilisha sentensi hii kuwa Kauli Taarifa: Juma alisema, "Ninasoma kitabu."',
    options: [
      'Juma alisema kwamba alisoma kitabu.',
      'Juma alisema kwamba ninasoma kitabu.',
      'Juma alisema "kwamba anasoma kitabu."',
      'Juma alisema kuwa nitasoma kitabu.'
    ],
    correctAnswer: 'Juma alisema kwamba alisoma kitabu.',
    explanation: 'Nafsi ya kwanza "ninasoma" hubadilika kuwa nafsi ya tatu na wakati uliopita unaotumika kutoa taarifa: "Juma alisema kwamba alisoma kitabu."',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Nafsi ya "mimi" hubadilika na kuwa "yeye" wakati mwingine anaporipoti maneno hayo.'
  },
  {
    id: 'q-g6-kisw-u8-015',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Kielezi cha wakati "leo" kinapobadilishwa kuwa Kauli Taarifa huwa neno gani?',
    options: [
      'Siku hiyo',
      'Kesho yake',
      'Siku iliyotangulia',
      'Jana yake'
    ],
    correctAnswer: 'Siku hiyo',
    explanation: 'Katika kauli taarifa, "leo" hubadilika kuwa "siku hiyo".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ukiripoti maneno yaliyosemwa "leo" siku kadhaa baadaye, unasema "siku..." gani?'
  },
  {
    id: 'q-g6-kisw-u8-016',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Kielezi cha mahali "hapa" hubadilika kuwa neno gani katika Kauli Taarifa?',
    options: [
      'Pale (au Hapo)',
      'Huku',
      'Sasa',
      'Kesho'
    ],
    correctAnswer: 'Pale (au Hapo)',
    explanation: '"Hapa" hubadilika kuwa "pale" au "hapo" katika kauli taarifa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Unaporipoti kuhusu mahali ambapo mtu alisimama akisema "hapa", unatumia neno gani?'
  },
  {
    id: 'q-g6-kisw-u8-017',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Geuza sentensi hii kuwa Kauli Taarifa: Amina alisema, "Tutasafiri kesho."',
    options: [
      'Amina alisema kwamba wangesafiri siku iliyofuata.',
      'Amina alisema kwamba tutasafiri kesho.',
      'Amina alisema kuwa watasafiri kesho.',
      'Amina alisema kwamba walisafiri jana.'
    ],
    correctAnswer: 'Amina alisema kwamba wangesafiri siku iliyofuata.',
    explanation: '"Sisi" (tutasafiri) inakuwa "wao" (wangesafiri), na "kesho" inabadilika kuwa "siku iliyofuata".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Angalia mabadiliko ya nafsi (tutasafiri -> wangesafiri) na kielezi cha wakati (kesho -> siku iliyofuata).'
  },
  {
    id: 'q-g6-kisw-u8-018',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Kielezi cha wakati "jana" kinapobadilishwa kuwa Kauli Taarifa huwa neno gani?',
    options: [
      'Siku iliyotangulia (au Siku ya awali)',
      'Siku iliyofuata',
      'Siku hiyo',
      'Kesho kutwa'
    ],
    correctAnswer: 'Siku iliyotangulia (au Siku ya awali)',
    explanation: '"Jana" inabadilika kuwa "siku iliyotangulia" au "siku ya awali" katika kauli taarifa.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Siku iliyokuwa kabla ya leo inaitwaje katika ripoti rasmi: siku iliyo...?'
  },
  {
    id: 'q-g6-kisw-u8-019',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Geuza amri ifuatayo kuwa Kauli Taarifa: Chifu aliwaamuru wanakijiji, "Pandeni miti kwenye kingo za mito!"',
    options: [
      'Chifu aliwaamuru wanakijiji wapande miti kwenye kingo za mito.',
      'Chifu aliwaamuru wanakijiji kwamba pandeni miti kwenye kingo za mito.',
      'Chifu alisema "pandeni miti kwenye kingo za mito."',
      'Chifu aliwauliza wanakijiji kama walipanda miti.'
    ],
    correctAnswer: 'Chifu aliwaamuru wanakijiji wapande miti kwenye kingo za mito.',
    explanation: 'Katika kutoa taarifa ya amri, kitenzi huchukua kauli ya kuagiza/kusihi ("wapande miti") bila alama za mtajo.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Amri ya moja kwa moja ya "pandeni" inaripotiwa vipi kwa kundi la watu: "wa... miti"?'
  },
  {
    id: 'q-g6-kisw-u8-020',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Sentensi: Otieno aliniambia kwamba angenisaidia kazi yangu siku iliyofuata.\nIkiandikwa katika Kauli Halisi itakuwaje?',
    options: [
      'Otieno aliniambia, "Nitakusaidia kazi yako kesho."',
      'Otieno aliniambia, "Nimekusaidia kazi yako leo."',
      'Otieno aliniambia, "Nilikusaidia kazi yako jana."',
      'Otieno aliniambia "nisaidie kazi yangu kesho."'
    ],
    correctAnswer: 'Otieno aliniambia, "Nitakusaidia kazi yako kesho."',
    explanation: '"Angenisaidia" inarudi kuwa "Nitakusaidia" (nafsi ya kwanza), "kazi yangu" inakuwa "kazi yako", na "siku iliyofuata" inarejea kuwa "kesho".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Rejesha maneno halisi aliyoyasema Otieno moja kwa moja: "Nita... kesho."'
  },
  {
    id: 'q-g6-kisw-u8-021',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Swali la moja kwa moja: "Je, mtihani umeanza?" likibadilishwa kuwa Kauli Taarifa hutumia neno gani kuunganisha?',
    options: [
      'Kama / Iwapo (k.m. Alitaka kujua kama mtihani ulikuwa umeanza)',
      'Kwamba lazima',
      'Alama ya kuuliza tu',
      'Bila kiunganishi chochote'
    ],
    correctAnswer: 'Kama / Iwapo (k.m. Alitaka kujua kama mtihani ulikuwa umeanza)',
    explanation: 'Maswali ya "Ndiyo/La" katika kauli taarifa huunganishwa kwa maneno "kama" au "iwapo" na alama ya kiulizio huondolewa.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Maswali yanayouliza "je..." huripotiwa kwa kutumia neno "kama" au "iwapo".'
  },
  {
    id: 'q-g6-kisw-u8-022',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Kwa nini alama ya kuuliza (?) HUONDOLEWA katika Kauli Taarifa?',
    options: [
      'Kwa sababu sentensi ya kauli taarifa ni taarifa ya maelezo na si swali la moja kwa moja tena',
      'Kwa sababu mwandishi amesahau kuiweka',
      'Kwa sababu Kiswahili hakiruhusu alama ya kuuliza katika sentensi yoyote',
      'Kwa sababu alama ya kuuliza hutumiwa mwanzoni mwa sentensi pekee'
    ],
    correctAnswer: 'Kwa sababu sentensi ya kauli taarifa ni taarifa ya maelezo na si swali la moja kwa moja tena',
    explanation: 'Kauli taarifa inatoa ripoti au simulizi ya yaliyosemwa (taarifa), kwa hivyo ina muundo wa sentensi ya kutoa habari inayoishia na kitone.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, sentensi inayoripoti kuwa "Aliuliza kama..." inahitaji alama ya kuuliza mwishoni?'
  },
  {
    id: 'q-g6-kisw-u8-023',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Badilisha kuwa Kauli Taarifa: Gavana alisema, "Nitakutana na wawakilishi wa wadi hapa leo mchana."',
    options: [
      'Gavana alisema kwamba angekutana na wawakilishi wa wadi pale siku hiyo mchana.',
      'Gavana alisema kwamba nitakutana na wawakilishi wa wadi hapa leo mchana.',
      'Gavana alisema kuwa angekutana na wawakilishi wa wadi hapa leo mchana.',
      'Gavana alisema kwamba alikutana na wawakilishi wa wadi kule jana mchana.'
    ],
    correctAnswer: 'Gavana alisema kwamba angekutana na wawakilishi wa wadi pale siku hiyo mchana.',
    explanation: 'Mabadiliko yote matatu yametekelezwa kwa ukamilifu: nitakutana -> angekutana, hapa -> pale, leo -> siku hiyo.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kagua mabadiliko matatu: wakati wa kitenzi (angekutana), mahali (pale), na wakati (siku hiyo).'
  },
  {
    id: 'q-g6-kisw-u8-024',
    subStrandId: 'substrand-g6-kisw-u8',
    lessonId: 'lesson-g6-kisw-u8-l2',
    text: 'Tambua sentensi iliyobadilishwa kimakosa kutoka Kauli Halisi kwenda Kauli Taarifa:',
    options: [
      'Halisi: "Ninawapenda," alisema mama. -> Taarifa: Mama alisema kwamba ninawapenda.',
      'Halisi: "Ninawapenda," alisema mama. -> Taarifa: Mama alisema kwamba aliwapenda.',
      'Halisi: "Kesho nitaondoka," alisema Juma. -> Taarifa: Juma alisema kuwa angeondoka siku iliyofuata.',
      'Halisi: "Tulia!" aliamuru mwalimu. -> Taarifa: Mwalimu aliamuru atulie.'
    ],
    correctAnswer: 'Halisi: "Ninawapenda," alisema mama. -> Taarifa: Mama alisema kwamba ninawapenda.',
    explanation: 'Sentensi ya kwanza imeshindwa kubadilisha nafsi ya kwanza ("ninawapenda") kuwa nafsi ya tatu ("aliwapenda"), hivyo ni kosa kubwa la kisarufi.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama sentensi ya kwanza: Je, inaleta maana kusema "Mama alisema kwamba ninawapenda" badala ya "aliwapenda"?'
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
console.log('Batch 4 of Grade 6 Kiswahili Lugha successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
