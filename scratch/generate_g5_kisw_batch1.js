import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Registering Grade 5 Kiswahili and Generating Batch 1 (Units 1 & 2) ---');

// 1. Register la-kiswahili-g5 if not already registered
if (!db.learningAreas.some(la => la.id === 'la-kiswahili-g5')) {
  db.learningAreas.push({
    id: 'la-kiswahili-g5',
    gradeId: 'grade-5',
    name: 'Kiswahili',
    swahiliName: 'Kiswahili Sanifu',
    icon: 'book-open',
    color: '#F59E0B',
    description: 'Kusikiliza na kuzungumza, kusoma kwa ufahamu, uandishi wa insha, sarufi ya ngeli, na matumizi fasaha ya Kiswahili.',
    strandsCount: 4
  });
  console.log('Added la-kiswahili-g5 to learningAreas');
}

// 2. Register Grade 5 Kiswahili Strands
const strandsToAdd = [
  {
    id: 'strand-g5-kisw-kusikiliza',
    learningAreaId: 'la-kiswahili-g5',
    code: 'KISW-G5-STR-01',
    title: 'Kusikiliza na Kuzungumza',
    swahiliTitle: 'Kusikiliza na Kuzungumza',
    description: 'Adabu za maamkizi, mazungumzo ya heshima kulingana na umri na muktadha, na usikilizaji makini wa hadithi na maelekezo.',
    icon: 'volume-2'
  },
  {
    id: 'strand-g5-kisw-kusoma',
    learningAreaId: 'la-kiswahili-g5',
    code: 'KISW-G5-STR-02',
    title: 'Kusoma na Kuelewa',
    swahiliTitle: 'Kusoma na Ufahamu',
    description: 'Kusoma makala, hadithi zenye mafunzo, ushairi wa watoto, vitendawili, na methali kwa ufasaha na utambuzi wa kina.',
    icon: 'book-open'
  },
  {
    id: 'strand-g5-kisw-kuandika',
    learningAreaId: 'la-kiswahili-g5',
    code: 'KISW-G5-STR-03',
    title: 'Kuandika',
    swahiliTitle: 'Kuandika',
    description: 'Mwandiko nadhifu wa mtiririko, uakifishaji sahihi, insha za maelezo, na muundo wa barua ya kirafiki.',
    icon: 'edit-3'
  },
  {
    id: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    code: 'KISW-G5-STR-04',
    title: 'Sarufi na Matumizi ya Lugha',
    swahiliTitle: 'Sarufi',
    description: 'Ngeli za nomino (U-I, YA-YA, I-ZI, U-YA), nyakati na hali, vivumishi, kauli za vitenzi, na vinyume vya maneno.',
    icon: 'bookmark'
  }
];

strandsToAdd.forEach(s => {
  if (!db.strands.some(st => st.id === s.id)) {
    db.strands.push(s);
    console.log(`Added strand ${s.id}`);
  }
});

// 3. Register la-kiswahili-g5 in world-word-quest
const worldWord = db.gameWorlds.find(w => w.id === 'world-word-quest');
if (worldWord) {
  if (!worldWord.learningAreaIds.includes('la-kiswahili-g5')) {
    worldWord.learningAreaIds.push('la-kiswahili-g5');
    console.log('Added la-kiswahili-g5 to world-word-quest.learningAreaIds');
  }
}

// 4. Batch 1 Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-kisw-u1',
    strandId: 'strand-g5-kisw-kusikiliza',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Maamkizi, Adabu za Kijamii na Ngeli ya U-I',
    description: 'Kutambua maamkizi mbalimbali kulingana na wakati na umri (Sabalkheri, Masalkheri, Chei chei, Shikamoo); kuonyesha adabu za heshima mezani na hadharani; kuelewa ngeli ya U-I, nomino zake (mti/miti, mkate/mikate), na upatanisho sahihi wa kisarufi.',
    cbeCompetency: 'Ustadi wa mawasiliano ya heshima, utambuzi wa upatanisho wa kisarufi katika ngeli ya U-I, na uthamini wa mshikamano wa jamii',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g5-kisw-u2',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Lishe Bora, Usafi wa Mazingira na Ngeli ya YA-YA / Vihusishi',
    description: 'Kusoma na kuelewa umuhimu wa lishe bora na usafi wa mazingira; kutambua msamiati wa vyakula na afya; kubainisha nomino za ngeli ya YA-YA (maji, maziwa, mafuta, marashi) na matumizi ya vihusishi vya mahali na nafasi (ndani ya, nje ya, kando ya, juu ya).',
    cbeCompetency: 'Ufahamu wa stadi za afya na lishe, utumizi sahihi wa ngeli ya YA-YA na vihusishi katika sentensi, na uwajibikaji wa mazingira',
    estimatedMinutes: 30,
    order: 2
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 5. Batch 1 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-kisw-u1-l1',
    subStrandId: 'substrand-g5-kisw-u1',
    title: 'Maamkizi ya Heshima na Adabu za Mazungumzo',
    content: 'Maamkizi ni kiungo muhimu cha kuanzisha mawasiliano, kuonyesha heshima, na kudumisha amani katika jamii ya Wakenya. Katika Kiswahili Sanifu, kuna maamkizi kulingana na wakati wa siku na hadhi au umri wa mtu:\n\n1. Maamkizi ya Wakati:\n- Asubuhi: Mtu mmoja anaposalimu "Sabalkheri", jibu lake ni "Sabalkheri" au "Aheri".\n- Jioni: Mtu anaposalimu "Masalkheri", jibu lake ni "Masalkheri" au "Aheri".\n\n2. Maamkizi ya Heshima kwa Wazee:\n- Mtoto akimsalimu mtu mzima husema "Shikamoo" (ikimaanisha nashika miguu yako kwa heshima). Mtu mzima hujibu "Marahaba" (ikimaanisha nimefurahia heshima yako).\n\n3. Maamkizi ya Watoto Wachanga:\n- Mtoto mdogo anaposalimiwa na mkubwa huambiwa "Chei chei" naye hujibu "Chei".\n\n4. Adabu za Mazungumzo:\n- Kutumia maneno ya heshima kama vile "Tafadhali", "Samahani", "Nisaidie", "Nashukuru", na "Asante".\n- Kutosikiliza au kuingilia mazungumzo ya wengine bila ruhusa, na kutopaza sauti kwa hasira.',
    didYouKnow: 'Neno "Shikamoo" lina asili ya kale ya heshima ya "Nashika miguu yako", inayoonyesha utii na staha kuu kwa wazazi na wazee wa jamii!',
    kenyanContext: 'Katika kaunti ya Mombasa na Lamu, wanafunzi huanza asubuhi kwa kuwasalimu walimu na majirani zao kwa sauti ya staha na heshima kubwa, wakizingatia adabu njema.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u1-l2',
    subStrandId: 'substrand-g5-kisw-u1',
    title: 'Ngeli ya U-I na Upatanisho wa Kisarufi',
    content: 'Ngeli ya U-I inajumuisha nomino nyingi za miti, mimea, sehemu za mwili, na vitu visivyo na uhai ambazo huanza na herufi "M-" au "Mw-" katika umoja, na hubadilika kuanza na "Mi-" katika wingi.\n\n1. Mifano ya Nomino za Ngeli ya U-I:\n- Umoja: Mti -> Wingi: Miti\n- Umoja: Mkate -> Wingi: Mikate\n- Umoja: Mguu -> Wingi: Miguu\n- Umoja: Mto -> Wingi: Mito\n- Umoja: Mwiba -> Wingi: Miiba\n- Umoja: Mwaka -> Wingi: Miaka\n\n2. Viambishi vya Upatanisho wa Kisarufi:\n- Katika umoja, kiambishi cha kitenzi ni "U-". Mfano: "Mti ule umeanguka." "Mkate mtamu uliwa."\n- Katika wingi, kiambishi cha kitenzi ni "I-". Mfano: "Miti ile imeanguka." "Mikate mitamu iliwa."\n\n3. Vivumishi katika Ngeli ya U-I:\n- Vivumishi vya sifa huchukua kiambishi "M-" katika umoja na "Mi-" katika wingi. Mfano: "Mti mrefu / Miti mirefu", "Mkate mdogo / Mikate midogo".',
    didYouKnow: 'Mti mkubwa kama Mbuyu (Baobab) nchini Kenya huwekwa katika ngeli ya U-I (Mbuyu / Mibuyu), ikifuata kanuni ya umoja U- na wingi I-!',
    kenyanContext: 'Wanafunzi wa Gredi ya 5 katika shule ya msingi ya Kilimani walipanda miti ya mivinje kando ya uwanja: "Mti mmoja ulipandwa na Juma, na miti yote ilistawi vyema."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u2-l1',
    subStrandId: 'substrand-g5-kisw-u2',
    title: 'Msamiati wa Lishe Bora na Usafi wa Mazingira',
    content: 'Afya njema hutegemea kula mlo kamili wenye uwiano mzuri na kuishi katika mazingira safi yasiyo na uchafu:\n\n1. Makundi ya Vyakula vya Lishe Bora:\n- Vyakula vya Kutia Nguvu: Wanga kama vile ugali, viazi, wali, mhogo, na chapati.\n- Vyakula vya Kujenga Mwili: Protini kama vile maharagwe, njegere, mayai, maziwa, na samaki.\n- Vyakula vya Kulinda Mwili dhidi ya Magonjwa: Vitamini na madini yanayopatikana katika mboga (sukuma wiki, mchicha, terere) na matunda (maembe, ndizi, parachichi).\n\n2. Usafi wa Mazingira na Kinga ya Magonjwa:\n- Kuzoa taka na kuziweka kwenye pipa lililofunikwa ili kuzuia nzi na panya.\n- Kufyeka nyasi ndefu na kufukia madimbwi ya maji ili mbu wasizaliane na kusababisha malaria.\n- Kunawa mikono kwa maji safi tiririka na sabuni kabla ya kula na baada ya kutoka chooni ili kujikinga na kipindupindu na homa ya matumbo.',
    didYouKnow: 'Kula mboga za kienyeji za Kenya kama vile managu, terere, na kunde humpatia mtoto chuma kingi kinachoboresha damu na kumbukumbu ya masomo!',
    kenyanContext: 'Katika kijiji cha Ahero huko Kisumu, wanafunzi wa Gredi ya 5 walishirikiana na maafisa wa afya ya jamii kusafisha mitaro ya maji ili kuzuia mbu na kugawa mbegu za mboga shuleni.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u2-l2',
    subStrandId: 'substrand-g5-kisw-u2',
    title: 'Ngeli ya YA-YA na Matumizi ya Vihusishi',
    content: 'Ngeli ya YA-YA (au MA-MA ya vitu visivyohesabika) inajumuisha nomino za vinywaji, majimaji, na hisia au dhana zisizoweza kuhesabiwa moja kwa moja:\n\n1. Mifano ya Nomino za Ngeli ya YA-YA:\n- Maji, maziwa, mafuta, marashi, mazingira, maumivu, mate, machozi, matumaini.\n- Nomino hizi hazina umbo la umoja na wingi; zina maumbo ya wingi pekee (MA-) na huchukua kiambishi cha upatanisho "YA-" wakati wote.\n- Mfano wa sentensi: "Maji safi yamechemshwa vizuri." "Maziwa freshi yanamiminika kwenye gilasi."\n\n2. Vihusishi vya Mahali na Nafasi:\n- Vihusishi ni maneno yanayoonyesha uhusiano wa mahali, nafasi, au wakati kati ya nomino na vitu vingine katika sentensi.\n- Ndani ya: "Maji yapo ndani ya mtungi."\n- Juu ya: "Sahani ya matunda imewekwa juu ya meza."\n- Kando ya: "Miti ya matunda imepandwa kando ya mto."\n- Nje ya: "Mapipa ya taka yamewekwa nje ya lango la shule."\n- Chini ya: "Watoto waliketi chini ya kivuli cha mpera."',
    didYouKnow: 'Katika Kiswahili, huwezi kusema "maji moja" au "maji mawili"; badala yake unatumia vyombo kama "gilasi ya maji" au "ndoo ya maji"!',
    kenyanContext: 'Mama Wanjiku wa Nyeri huchemsha maziwa ya ng\'ombe asubuhi: "Maziwa haya yamechemshwa vizuri na kuwekwa juu ya meza kabla ya watoto kwenda shule."',
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

// 6. Batch 1 Missions (4 missions: orders 102 to 105)
const missionsToAdd = [
  {
    id: 'mission-g5-kisw-u1-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u1',
    lessonId: 'lesson-g5-kisw-u1-l1',
    title: 'Uwanja wa Maamkizi na Adabu za Mazungumzo',
    description: 'Bobea katika maamkizi ya heshima kulingana na wakati na hadhi ya watu, na dhihirisha lugha ya staha katika jamii!',
    order: 102,
    orderIndex: 102,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-maamkizi-bingwa',
    badge: { name: 'Bingwa wa Maamkizi', icon: 'smile' },
    questionIds: [
      'q-g5-kisw-u1-001', 'q-g5-kisw-u1-002', 'q-g5-kisw-u1-003', 'q-g5-kisw-u1-004',
      'q-g5-kisw-u1-005', 'q-g5-kisw-u1-006', 'q-g5-kisw-u1-007', 'q-g5-kisw-u1-008',
      'q-g5-kisw-u1-009', 'q-g5-kisw-u1-010', 'q-g5-kisw-u1-011', 'q-g5-kisw-u1-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u1-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u1',
    lessonId: 'lesson-g5-kisw-u1-l2',
    title: 'Msako wa Ngeli ya U-I na Upatanisho wa Kisarufi',
    description: 'Chambua nomino za miti na vitu, tambua upatanisho wa umoja (U-) na wingi (I-), na jenga sentensi fasaha za Kiswahili!',
    order: 103,
    orderIndex: 103,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ngeli-u-i',
    badge: { name: 'Mtaalamu wa Ngeli ya U-I', icon: 'tree' },
    questionIds: [
      'q-g5-kisw-u1-013', 'q-g5-kisw-u1-014', 'q-g5-kisw-u1-015', 'q-g5-kisw-u1-016',
      'q-g5-kisw-u1-017', 'q-g5-kisw-u1-018', 'q-g5-kisw-u1-019', 'q-g5-kisw-u1-020',
      'q-g5-kisw-u1-021', 'q-g5-kisw-u1-022', 'q-g5-kisw-u1-023', 'q-g5-kisw-u1-024'
    ]
  },
  {
    id: 'mission-g5-kisw-u2-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u2',
    lessonId: 'lesson-g5-kisw-u2-l1',
    title: 'Mabingwa wa Lishe Bora na Mazingira Safi',
    description: 'Tambua makundi matatu ya mlo kamili, tekeleza kanuni za usafi wa kibinafsi na mazingira, na jikinge na magonjwa!',
    order: 104,
    orderIndex: 104,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-lishe-bora',
    badge: { name: 'Mlinzi wa Afya Bora', icon: 'heart' },
    questionIds: [
      'q-g5-kisw-u2-001', 'q-g5-kisw-u2-002', 'q-g5-kisw-u2-003', 'q-g5-kisw-u2-004',
      'q-g5-kisw-u2-005', 'q-g5-kisw-u2-006', 'q-g5-kisw-u2-007', 'q-g5-kisw-u2-008',
      'q-g5-kisw-u2-009', 'q-g5-kisw-u2-010', 'q-g5-kisw-u2-011', 'q-g5-kisw-u2-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u2-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u2',
    lessonId: 'lesson-g5-kisw-u2-l2',
    title: 'Umahiri wa Ngeli ya YA-YA na Vihusishi vya Mahali',
    description: 'Tumia nomino za majimaji katika ngeli ya YA-YA, na pangilia vihusishi vya mahali kwa ustadi na umakinifu!',
    order: 105,
    orderIndex: 105,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ngeli-ya-ya',
    badge: { name: 'Bingwa wa Ngeli ya YA-YA', icon: 'droplet' },
    questionIds: [
      'q-g5-kisw-u2-013', 'q-g5-kisw-u2-014', 'q-g5-kisw-u2-015', 'q-g5-kisw-u2-016',
      'q-g5-kisw-u2-017', 'q-g5-kisw-u2-018', 'q-g5-kisw-u2-019', 'q-g5-kisw-u2-020',
      'q-g5-kisw-u2-021', 'q-g5-kisw-u2-022', 'q-g5-kisw-u2-023', 'q-g5-kisw-u2-024'
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
if (worldWord) {
  worldWord.totalMissions = Math.max(worldWord.totalMissions, 121);
}

// 7. Questions (48 questions: 24 for Unit 1, 24 for Unit 2)
const questionsToAdd = [
  // --- Unit 1: Mission 1 (q-g5-kisw-u1-001 to 012) ---
  {
    id: 'q-g5-kisw-u1-001',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mwanafunzi anapomwamkua mwalimu wake asubuhi, "Sabalkheri", jibu sahihi la mwalimu ni lipi?',
    text: 'Mwanafunzi anapomwamkua mwalimu wake asubuhi, "Sabalkheri", jibu sahihi la mwalimu ni lipi?',
    options: [
      'Sabalkheri (au Aheri)',
      'Masalkheri',
      'Marahaba',
      'Chei chei'
    ],
    correctAnswer: 'Sabalkheri (au Aheri)',
    explanation: 'Maamkizi ya asubuhi "Sabalkheri" hujibiwa kwa "Sabalkheri" au "Aheri", ikimaanisha asubuhi njema na salama.',
    socraticHint: 'Je, salamu inayotolewa asubuhi inapaswa kujibiwa kwa salamu hiyo hiyo au salamu ya jioni?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-002',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kulingana na mila za heshima katika jamii za Kenya, mtoto mdogo anapomsalimu mzee au mtu mzima kwa kusema "Shikamoo", mtu mzima hujibu nini?',
    text: 'Kulingana na mila za heshima katika jamii za Kenya, mtoto mdogo anapomsalimu mzee au mtu mzima kwa kusema "Shikamoo", mtu mzima hujibu nini?',
    options: [
      'Marahaba',
      'Sabalkheri',
      'Asante sana',
      'U hali gani'
    ],
    correctAnswer: 'Marahaba',
    explanation: '"Shikamoo" ni maamkizi ya heshima kutoka kwa mdogo kwenda kwa mkubwa, na jibu lake sahihi na la kipekee ni "Marahaba".',
    socraticHint: 'Ni neno lipi la kipekee la Kiswahili linalotumiwa na watu wazima kuitikia salamu ya Shikamoo?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-003',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mama anapomwamkua mwanawe mdogo mchanga asubuhi kwa neno "Chei chei", mtoto yule anafunzwa kuitikia vipi?',
    text: 'Mama anapomwamkua mwanawe mdogo mchanga asubuhi kwa neno "Chei chei", mtoto yule anafunzwa kuitikia vipi?',
    options: [
      'Chei',
      'Marahaba',
      'Masalkheri',
      'Shikamoo'
    ],
    correctAnswer: 'Chei',
    explanation: 'Maamkizi maalum ya watoto wachanga wanaoanza kujifunza kuongea ni "Chei chei", na mtoto huitikia "Chei".',
    socraticHint: 'Salamu ya mtoto mchanga inayorudiwa kama wimbo mdogo huitikiwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-004',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Jioni inapoingia wakati wa machweo, watu wawili wanaokutana wanapaswa kutumia maamkizi gani sahihi?',
    text: 'Jioni inapoingia wakati wa machweo, watu wawili wanaokutana wanapaswa kutumia maamkizi gani sahihi?',
    options: [
      'Masalkheri',
      'Sabalkheri',
      'Umeamkaje',
      'Lala salama'
    ],
    correctAnswer: 'Masalkheri',
    explanation: '"Masalkheri" ni maamkizi ya nyakati za jioni (kuanzia alasiri hadi usiku), nayo huitikiwa kwa "Masalkheri" au "Aheri".',
    socraticHint: 'Ni salamu gani ya Kiswahili inayoanza na "Masa-" inayotumiwa jioni?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-005',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni tabia gani inayoonyesha adabu njema ya mazungumzo mwanafunzi anapokuwa kwenye meza ya chakula au mkutano wa familia?',
    text: 'Ni tabia gani inayoonyesha adabu njema ya mazungumzo mwanafunzi anapokuwa kwenye meza ya chakula au mkutano wa familia?',
    options: [
      'Kusikiliza wengine kwa makini na kutoingilia maongezi kabla ya msemaji kumaliza',
      'Kuzungumza kwa sauti kubwa ukiwa na chakula mdomoni',
      'Kutumia simu ya mkononi na kucheka wakati wazazi wanazungumza',
      'Kukimbia kutoka mezani bila kuomba ruhusa ya wazazi'
    ],
    correctAnswer: 'Kusikiliza wengine kwa makini na kutoingilia maongezi kabla ya msemaji kumaliza',
    explanation: 'Adabu njema inamtaka mtu kumsikiliza msemaji kwa staha bila kukatiza maneno, kutozungumza chakula kikiwa mdomoni, na kuheshimu wakubwa.',
    socraticHint: 'Ni matendo gani yanayoonyesha staha na heshima kubwa kwa wazungumzaji wengine?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-006',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamau alipita mbele ya mwalimu wake aliyekuwa akizungumza na mzazi. Neno gani la adabu alilopaswa kutumia kuomba njia?',
    text: 'Kamau alipita mbele ya mwalimu wake aliyekuwa akizungumza na mzazi. Neno gani la adabu alilopaswa kutumia kuomba njia?',
    options: [
      '"Samahani, naomba kupita mwalimu"',
      '"Nipisheni mara moja ninawahi"',
      '"Mimi napita hapa ondokeni"',
      '"Kwanini mmesimama hapa njiani"'
    ],
    correctAnswer: '"Samahani, naomba kupita mwalimu"',
    explanation: 'Neno "Samahani" huonyesha heshima na unyenyekevu unapoingilia njia au unapotaka kupita mbele ya watu wazima.',
    socraticHint: 'Ni neno lipi la adabu linalotumiwa kuomba msamaha au kuomba njia kwa staha?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-007',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtu anapokufanyia wema au kukupa zawadi shuleni, neno lipi la Kiswahili linadhihirisha shukrani ya kweli?',
    text: 'Mtu anapokufanyia wema au kukupa zawadi shuleni, neno lipi la Kiswahili linadhihirisha shukrani ya kweli?',
    options: [
      '"Asante sana" au "Nashukuru"',
      '"Kwaheri ya kuonana"',
      '"Haina haja"',
      '"Pole sana"'
    ],
    correctAnswer: '"Asante sana" au "Nashukuru"',
    explanation: '"Asante" na "Nashukuru" ni maneno ya adabu yanayotumiwa kutambua na kuthamini wema au msaada uliopewa na mtu mwingine.',
    socraticHint: 'Ni neno lipi tunalotamka kueleza furaha na shukrani kwa mtu aliyetusaidia?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-008',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Amina alitaka kuazima rula kutoka kwa mwenzake darasani. Ni ombi gani linalozingatia kanuni bora za mawasiliano ya heshima?',
    text: 'Amina alitaka kuazima rula kutoka kwa mwenzake darasani. Ni ombi gani linalozingatia kanuni bora za mawasiliano ya heshima?',
    options: [
      '"Tafadhali niazime rula yako nitumie kwa dakika chache kisha nikurudishie."',
      '"Nipe hiyo rula yako haraka nina kazi!"',
      '"Weka rula hapa mezani kwangu sasa hivi."',
      '"Ukikataa kunipa rula nitakuchongea kwa kiranja."'
    ],
    correctAnswer: '"Tafadhali niazime rula yako nitumie kwa dakika chache kisha nikurudishie."',
    explanation: 'Matumizi ya neno "Tafadhali", sauti ya upole, na ahadi ya kurudisha kifaa hicho yanaonyesha ukomavu na adabu ya mwanafunzi mwema.',
    socraticHint: 'Mawasiliano ya heshima hutumia maneno ya upole kama "tafadhali" badala ya amri au vitisho.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-009',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mtu anapopatwa na msiba, ajali, au maumivu mwilini, ni kauli gani ya Kiswahili inayoonyesha huruma na faraja?',
    text: 'Mtu anapopatwa na msiba, ajali, au maumivu mwilini, ni kauli gani ya Kiswahili inayoonyesha huruma na faraja?',
    options: [
      '"Pole sana"',
      '"Hongera sana"',
      '"Karibu ndani"',
      '"Alamsiki"'
    ],
    correctAnswer: '"Pole sana"',
    explanation: 'Kauli ya "Pole" hutolewa kumfariji na kumpa moyo mtu aliyepatwa na shida, msiba, maumivu, au changamoto yoyote maishani.',
    socraticHint: 'Ni neno gani fupi linalotumiwa kueleza hisia za huruma na kumpa mtu faraja?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-010',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Watu wawili wanapoagana usiku kabla ya kwenda kulala, maamkizi gani ya kidesturi yanayotumiwa kutakiana usiku mwema?',
    text: 'Watu wawili wanapoagana usiku kabla ya kwenda kulala, maamkizi gani ya kidesturi yanayotumiwa kutakiana usiku mwema?',
    options: [
      '"Alamsiki" (hujibiwa kwa "Binuru")',
      '"Sabalkheri" (hujibiwa kwa "Aheri")',
      '"Shikamoo" (hujibiwa kwa "Marahaba")',
      '"Chei chei" (hujibiwa kwa "Chei")'
    ],
    correctAnswer: '"Alamsiki" (hujibiwa kwa "Binuru")',
    explanation: '"Alamsiki" ni salamu ya kuagana usiku (ikimaanisha uwe na usiku mwema na salama), na jibu lake sahihi ni "Binuru" (ikimaanisha uwe wenye nuru na amani).',
    socraticHint: 'Ni neno lipi la kipekee la kuagana usiku linalojibiwa kwa "Binuru"?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-011',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mgeni anapogonga hodi langoni mwa nyumba, mwenye nyumba anapaswa kumkaribisha kwa kusema nini?',
    text: 'Mgeni anapogonga hodi langoni mwa nyumba, mwenye nyumba anapaswa kumkaribisha kwa kusema nini?',
    options: [
      '"Karibu ndani"',
      '"Kwaheri ya kuonana"',
      '"Nenda zako"',
      '"Subiri hapo nje hadi kesho"'
    ],
    correctAnswer: '"Karibu ndani"',
    explanation: 'Utamaduni wa ukarimu wa Kiafrika na lugha ya Kiswahili unamtaka mwenyeji kumkaribisha mgeni anayegonga hodi kwa bashasha akisema "Karibu ndani".',
    socraticHint: 'Mtu anaposema "Hodi", jibu la kawaida la kumruhusu kuingia ni lipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-012',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini ni muhimu kwa watoto wa Kenya kujifunza na kutumia maamkizi na lugha ya heshima kila siku?',
    text: 'Kwanini ni muhimu kwa watoto wa Kenya kujifunza na kutumia maamkizi na lugha ya heshima kila siku?',
    options: [
      'Inajenga mahusiano mema, nidhamu ya kijamii, na mshikamano wa amani kati ya vizazi',
      'Ili kuwasaidia watoto kuwaamuru na kuwatisha wenzao shuleni',
      'Inawafanya watoto wapate zawadi za pesa kila asubuhi bila kufanya kazi',
      'Ili kuonyesha kuwa watoto wanajua maneno magumu kuliko watu wazima'
    ],
    correctAnswer: 'Inajenga mahusiano mema, nidhamu ya kijamii, na mshikamano wa amani kati ya vizazi',
    explanation: 'Lugha ya heshima huimarisha maadili ya CBC, hupunguza migogoro, na huunganisha jamii katika upendo na staha.',
    socraticHint: 'Lugha ya adabu na maamkizi huchangia vipi kujenga amani na maelewano katika taifa letu?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },

  // --- Unit 1: Mission 2 (q-g5-kisw-u1-013 to 024) ---
  {
    id: 'q-g5-kisw-u1-013',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino "Mkate" na wingi wake "Mikate" huwekwa katika ngeli gani ya Kiswahili?',
    text: 'Nomino "Mkate" na wingi wake "Mikate" huwekwa katika ngeli gani ya Kiswahili?',
    options: [
      'Ngeli ya U - I',
      'Ngeli ya A - WA',
      'Ngeli ya KI - VI',
      'Ngeli ya LI - YA'
    ],
    correctAnswer: 'Ngeli ya U - I',
    explanation: 'Nomino za vitu visivyo na uhai zinazoanza na "M-" katika umoja na "Mi-" katika wingi (kama mkate/mikate, mti/miti) huingia katika ngeli ya U-I.',
    socraticHint: 'Angalia viambishi vya upatanisho: Mkate u-liokwa vizuri, Mikate i-liokwa vizuri. Hii ni ngeli gani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-014',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua wingi sahihi wa sentensi hii ya ngeli ya U-I: "Mti mrefu umeanguka kando ya barabara."',
    text: 'Chagua wingi sahihi wa sentensi hii ya ngeli ya U-I: "Mti mrefu umeanguka kando ya barabara."',
    options: [
      'Miti mirefu imeanguka kando ya barabara.',
      'Miti refu yameanguka kando ya barabara.',
      'Miti mirefu wameanguka kando ya barabara.',
      'Miti mrefu zimeanguka kando ya barabara.'
    ],
    correctAnswer: 'Miti mirefu imeanguka kando ya barabara.',
    explanation: 'Katika ngeli ya U-I, umoja "Mti mrefu umeanguka" hubadilika kuwa "Miti mirefu imeanguka" katika wingi, kwa kuwa kiambishi cha upatanisho cha wingi ni I-.',
    socraticHint: 'Katika ngeli ya U-I, kiambishi cha kitenzi katika wingi ni I- (imeanguka).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-015',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha ngeli ya U-I: "Mguu wake ____liovunjika umepona sasa."',
    text: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha ngeli ya U-I: "Mguu wake ____liovunjika umepona sasa."',
    options: [
      'u-',
      'i-',
      'ki-',
      'li-'
    ],
    correctAnswer: 'u-',
    explanation: 'Nomino "mguu" iko katika umoja wa ngeli ya U-I, hivyo huchukua kiambishi cha upatanisho "u-": "Mguu wake uliovunjika umepona sasa."',
    socraticHint: 'Katika umoja wa ngeli ya U-I, kiambishi cha kitenzi ni U au I?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-016',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi gani la nomino ambazo ZOTE zimo katika ngeli ya U-I?',
    text: 'Ni kundi gani la nomino ambazo ZOTE zimo katika ngeli ya U-I?',
    options: [
      'Mto, mwiba, mlima, mpira, mchezo',
      'Mtoto, mwalimu, daktari, seremala, askari',
      'Kiti, kitabu, kikapu, kioo, kidonda',
      'Jicho, jino, gari, ua, jiwe'
    ],
    correctAnswer: 'Mto, mwiba, mlima, mpira, mchezo',
    explanation: 'Nomino hizi zote ni za vitu visivyo na uhai (mto/mito, mwiba/miiba, mlima/milima, mpira/mipira, mchezo/michezo) na hufuata ngeli ya U-I.',
    socraticHint: 'Tafuta kundi la maneno yanayoanza na M- katika umoja na Mi- katika wingi yasiyo viumbe hai.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-017',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua upatanisho sahihi wa kivumishi cha sifa katika sentensi: "Mto Tana ni mto _______ sana nchini Kenya."',
    text: 'Chagua upatanisho sahihi wa kivumishi cha sifa katika sentensi: "Mto Tana ni mto _______ sana nchini Kenya."',
    options: [
      'mpana',
      'pana',
      'vipana',
      'mipana'
    ],
    correctAnswer: 'mpana',
    explanation: 'Katika umoja wa ngeli ya U-I, kivumishi cha shina "-pana" huchukua kiambishi "m-" na kuwa "mpana" kulingana na nomino "mto".',
    socraticHint: 'Kivumishi cha sifa katika umoja wa ngeli ya U-I huanza na kiambishi gani kinacholingana na "mto"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-018',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi iliyoandikwa kwa upatanisho SAHIHI wa kisarufi katika ngeli ya U-I wingi?',
    text: 'Ni sentensi ipi iliyoandikwa kwa upatanisho SAHIHI wa kisarufi katika ngeli ya U-I wingi?',
    options: [
      'Mito yote mikubwa imefurika maji baada ya mvua kunyesha.',
      'Mito yote mikubwa wamefurika maji baada ya mvua kunyesha.',
      'Mito zote mikubwa zimefurika maji baada ya mvua kunyesha.',
      'Mito yote makubwa yamefurika maji baada ya mvua kunyesha.'
    ],
    correctAnswer: 'Mito yote mikubwa imefurika maji baada ya mvua kunyesha.',
    explanation: 'Katika wingi wa ngeli ya U-I: "Mito" huchukua kirejeshi "yote", kivumishi "mikubwa", na kiambishi cha kitenzi "i-" ("imefurika").',
    socraticHint: 'Nomino "mito" inalingana na kiambishi cha kitenzi kipi: i-, wa-, zi-, au ya-?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-019',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Umoja wa nomino "Mionzi" (kama vile mionzi ya jua) ni upi katika ngeli ya U-I?',
    text: 'Umoja wa nomino "Mionzi" (kama vile mionzi ya jua) ni upi katika ngeli ya U-I?',
    options: [
      'Mwonzi',
      'Uonzi',
      'Kionzi',
      'Lionzi'
    ],
    correctAnswer: 'Mwonzi',
    explanation: 'Nomino "mwonzi" huchukua "mw-" mbele ya vokali "o" katika umoja, na katika wingi inakuwa "mionzi".',
    socraticHint: 'Wakati neno linapoanza na vokali "o", herufi "m-" katika umoja hubadilika kuwa "mw-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-020',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tofauti kubwa ya kisarufi kati ya nomino "Mwalimu" na "Mti" ni ipi, ingawa zote huanza na "M-" katika umoja?',
    text: 'Tofauti kubwa ya kisarufi kati ya nomino "Mwalimu" na "Mti" ni ipi, ingawa zote huanza na "M-" katika umoja?',
    options: [
      '"Mwalimu" ni kiumbe hai na huingia ngeli ya A-WA, lakini "Mti" hauna uhai na huingia ngeli ya U-I.',
      '"Mwalimu" huingia ngeli ya KI-VI lakini "Mti" huingia ngeli ya LI-YA.',
      'Zote mbili zinaingia ngeli ya U-I bila tofauti yoyote.',
      '"Mwalimu" haina umbo la wingi lakini "Mti" una umbo la wingi.'
    ],
    correctAnswer: '"Mwalimu" ni kiumbe hai na huingia ngeli ya A-WA, lakini "Mti" hauna uhai na huingia ngeli ya U-I.',
    explanation: 'Viumbe hai vyote (watu na wanyama) huingia ngeli ya A-WA (Mwalimu anafundisha / Walimu wanafundisha), wakati vitu visivyo na uhai huingia ngeli ya U-I (Mti umeanguka / Miti imeanguka).',
    socraticHint: 'Je, mwalimu ni mtu mwenye uhai au kitu kisicho na uhai?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-021',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kiashiria kipi sahihi cha mbali kinacholingana na nomino "mshipi" katika umoja wa ngeli ya U-I?',
    text: 'Ni kiashiria kipi sahihi cha mbali kinacholingana na nomino "mshipi" katika umoja wa ngeli ya U-I?',
    options: [
      'ule',
      'yule',
      'kile',
      'lile'
    ],
    correctAnswer: 'ule',
    explanation: 'Katika ngeli ya U-I umoja, kiashiria cha karibu ni "huu", cha wastani ni "huo", na cha mbali ni "ule" (mfano: "Mshipi ule umekatika").',
    socraticHint: 'Katika ngeli ya U-I, kitu kikiwa mbali tunasema mti ule au mti yule?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-022',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi hii kwa kiashiria sahihi cha karibu katika wingi: "Miiba _____ iliyonidunga mguuni ilikuwa mikali sana."',
    text: 'Kamilisha sentensi hii kwa kiashiria sahihi cha karibu katika wingi: "Miiba _____ iliyonidunga mguuni ilikuwa mikali sana."',
    options: [
      'hii',
      'hawa',
      'hivi',
      'haya'
    ],
    correctAnswer: 'hii',
    explanation: 'Kiashiria cha karibu cha wingi katika ngeli ya U-I ni "hii" (mfano: "Miiba hii, miti hii, mikate hii").',
    socraticHint: 'Ni kionyeshi kipi cha karibu kinacholingana na kiambishi cha "miiba": hii au hivi?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-023',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "umechanika" kimetumika katika sentensi ifuatayo: "Msikiti/Msuli wa baba umechanika." Ni sehemu gani ya neno inayoonyesha upatanisho wa ngeli ya U-I?',
    text: 'Kitenzi "umechanika" kimetumika katika sentensi ifuatayo: "Msikiti/Msuli wa baba umechanika." Ni sehemu gani ya neno inayoonyesha upatanisho wa ngeli ya U-I?',
    options: [
      'Kiambishi awali "u-" mwanzoni mwa kitenzi',
      'Mzizi "-chan-" katikati ya kitenzi',
      'Kiambishi tamati "-ka" mwishoni mwa kitenzi',
      'Kiambishi cha wakati "-me-" pekee'
    ],
    correctAnswer: 'Kiambishi awali "u-" mwanzoni mwa kitenzi',
    explanation: 'Kiambishi "u-" mwanzoni mwa kitenzi "u-me-chanika" ndicho kiambishi ngeli cha nafsi ya tatu umoja kwa nomino za ngeli ya U-I.',
    socraticHint: 'Tazama herufi ya kwanza kabisa ya kitenzi "umechanika". Ni herufi gani?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },
  {
    id: 'q-g5-kisw-u1-024',
    subStrandId: 'substrand-g5-kisw-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua sentensi ambayo imeakifishwa na kupangwa kwa ufasaha mkubwa wa lugha ya Kiswahili:',
    text: 'Chagua sentensi ambayo imeakifishwa na kupangwa kwa ufasaha mkubwa wa lugha ya Kiswahili:',
    options: [
      'Mchezo ule wa soka ulisisimua sana, na mashabiki wote walifurahi.',
      'Michezo ule wa soka zilisimua sana na mashabiki wote walifurahi',
      'Mchezo ile ya soka walisisimua sana, na mashabiki yote walifurahi.',
      'Mchezo ule ya soka ilisisimua sana na mashabiki walifurahi'
    ],
    correctAnswer: 'Mchezo ule wa soka ulisisimua sana, na mashabiki wote walifurahi.',
    explanation: '"Mchezo ule" na "ulisisimua" vinafuata upatanisho sahihi wa umoja wa ngeli ya U-I, pamoja na uakifishaji mzuri wa koma na nukta.',
    socraticHint: 'Tafuta sentensi yenye upatanisho sahihi wa "mchezo ule ... ulisisimua" na alama sahihi za uakifishaji.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U1'
  },

  // --- Unit 2: Mission 1 (q-g5-kisw-u2-001 to 012) ---
  {
    id: 'q-g5-kisw-u2-001',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kulingana na masomo ya lishe bora, mlo kamili unapaswa kuwa na makundi yapi makuu matatu ya vyakula?',
    text: 'Kulingana na masomo ya lishe bora, mlo kamili unapaswa kuwa na makundi yapi makuu matatu ya vyakula?',
    options: [
      'Vyakula vya kutia nguvu (wanga), vyakula vya kujenga mwili (protini), na vyakula vya kulinda mwili (vitamini)',
      'Vyakula vya sukari nyingi, mafuta mengi, na vinywaji vyenye gesi',
      'Vyakula vya nyama pekee, mkate mweupe, na soda za baridi',
      'Vyakula vya kukaangwa kwa mafuta mengi kila mlo'
    ],
    correctAnswer: 'Vyakula vya kutia nguvu (wanga), vyakula vya kujenga mwili (protini), na vyakula vya kulinda mwili (vitamini)',
    explanation: 'Mlo kamili unajumuisha wanga kwa ajili ya nguvu, protini kwa ajili ya ukuaji wa seli, na mboga na matunda (vitamini na madini) kwa ajili ya kinga dhidi ya maradhi.',
    socraticHint: 'Mlo wenye afya huleta nguvu, hujenga mwili, na hulinda mwili dhidi ya magonjwa.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-002',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi lipi la vyakula vinavyopatikana kwa urahisi nchini Kenya ambavyo hufanya kazi ya KUJENGA MWILI (protini)?',
    text: 'Ni kundi lipi la vyakula vinavyopatikana kwa urahisi nchini Kenya ambavyo hufanya kazi ya KUJENGA MWILI (protini)?',
    options: [
      'Maharagwe, maziwa, mayai, samaki, na njegere',
      'Ugali, wali, viazi vitamu, na mhogo',
      'Sukuma wiki, mchicha, maembe, na machungwa',
      'Pipi, keki, soda, na biskuti za sukari'
    ],
    correctAnswer: 'Maharagwe, maziwa, mayai, samaki, na njegere',
    explanation: 'Protini hupatikana katika mimea kama maharagwe na jamii ya mikunde, na wanyama kama mayai, maziwa, na samaki.',
    socraticHint: 'Tafuta vyakula vyenye protini vinavyosaidia misuli na seli za mwili kukua.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-003',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mboga za kienyeji kama vile managu, kunde, terere, na mitoo hufanya kazi gani muhimu mwilini?',
    text: 'Mboga za kienyeji kama vile managu, kunde, terere, na mitoo hufanya kazi gani muhimu mwilini?',
    options: [
      'Kulinda mwili dhidi ya magonjwa na kuupatia madini ya chuma na vitamini',
      'Kufanya mtu anenepe sana bila kufanya mazoezi',
      'Kupandisha sukari mwilini na kuleta uchovu',
      'Kuharibu mfumo wa kusaga chakula tumboni'
    ],
    correctAnswer: 'Kulinda mwili dhidi ya magonjwa na kuupatia madini ya chuma na vitamini',
    explanation: 'Mboga za kienyeji zina utajiri mkubwa wa vitamini A na C pamoja na madini ya chuma, ambayo huimarisha kinga ya mwili na damu.',
    socraticHint: 'Mboga za majani ya kijani kibichi huwekwa katika kundi la vyakula vya kulinda mwili (kinga).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-004',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni hatua ipi ya usafi wa kibinafsi inayozuia viini vya kipindupindu na homa ya matumbo kuingia mwilini?',
    text: 'Ni hatua ipi ya usafi wa kibinafsi inayozuia viini vya kipindupindu na homa ya matumbo kuingia mwilini?',
    options: [
      'Kunawa mikono kwa maji safi tiririka na sabuni kabla ya kushika chakula na baada ya kutoka chooni',
      'Kupulizia mikono marashi yenye harufu nzuri bila maji',
      'Kupangusa mikono kwenye nguo au sare ya shule kabla ya kula',
      'Kula chakula haraka haraka bila kuosha vyombo'
    ],
    correctAnswer: 'Kunawa mikono kwa maji safi tiririka na sabuni kabla ya kushika chakula na baada ya kutoka chooni',
    explanation: 'Kunawa mikono kwa maji tiririka na sabuni huondoa vijidudu vya magonjwa na bakteria hatari wanaosababisha maradhi ya tumbo.',
    socraticHint: 'Ni matumizi gani ya vitu viwili vya msingi (maji tiririka na sabuni) yanayoondoa viini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-005',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini ni muhimu kufyeka nyasi ndefu na kufukia madimbwi ya maji yaliyotuama karibu na makazi ya watu?',
    text: 'Kwanini ni muhimu kufyeka nyasi ndefu na kufukia madimbwi ya maji yaliyotuama karibu na makazi ya watu?',
    options: [
      'Kuzuia mbu wasipate mahali pa kutaga mayai na kueneza ugonjwa wa malaria',
      'Ili kuzuia watoto wasicheze mpira uwanjani',
      'Ili kuifanya ardhi iwe na joto kali sana wakati wa mchana',
      'Kufanya nyumba iwe na giza na upepo mdogo'
    ],
    correctAnswer: 'Kuzuia mbu wasipate mahali pa kutaga mayai na kueneza ugonjwa wa malaria',
    explanation: 'Mbu huzaliana kwenye madimbwi ya maji yaliyotuama na kujificha kwenye vichaka au nyasi ndefu; kuondoa mazingira haya hukinga jamii dhidi ya malaria.',
    socraticHint: 'Wadudu gani wanaotaga mayai kwenye maji yaliyosimama na kueneza homa ya malaria?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-006',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni njia gani salama ya kuhifadhi maji ya kunywa nyumbani ili kuzuia maambukizi ya maradhi ya maji?',
    text: 'Ni njia gani salama ya kuhifadhi maji ya kunywa nyumbani ili kuzuia maambukizi ya maradhi ya maji?',
    options: [
      'Kuyachemsha, kuyachuja, na kuyaweka kwenye chombo safi kilichofunikwa vizuri',
      'Kuyamwaga kwenye ndoo wazi kando ya choo',
      'Kutumia mikono michafu kuchota maji kwenye mtungi bila upawa',
      'Kunywa maji ya mifereji moja kwa moja bila kuyatibu'
    ],
    correctAnswer: 'Kuyachemsha, kuyachuja, na kuyaweka kwenye chombo safi kilichofunikwa vizuri',
    explanation: 'Kuchesha maji huua viini vyote vya maradhi, na kuyafunika huzuia vumbi, nzi, na uchafu mwingine kuingia ndani.',
    socraticHint: 'Kuchesha maji na kuyafunika kwenye mtungi safi huhakikisha usalama wa afya ya familia.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-007',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali hii ya Kiswahili inayosisitiza umuhimu wa usafi na afya: "Kinga ni bora kuliko ________."',
    text: 'Kamilisha methali hii ya Kiswahili inayosisitiza umuhimu wa usafi na afya: "Kinga ni bora kuliko ________."',
    options: [
      'tiba',
      'ugonjwa',
      'dawa',
      'chakula'
    ],
    correctAnswer: 'tiba',
    explanation: 'Methali "Kinga ni bora kuliko tiba" inafundisha kwamba kujikinga na maradhi mapema kwa usafi na lishe bora ni rahisi na nafuu kuliko kuugua na kutafuta matibabu.',
    socraticHint: 'Ni bora kuzuia ugonjwa kabla haujaingia kuliko kutafuta matibabu au...?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-008',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni aina gani ya uchafuzi wa mazingira unaotokea wakati mifuko ya plastiki na chupa zinapotupwa ovyo ardhini?',
    text: 'Ni aina gani ya uchafuzi wa mazingira unaotokea wakati mifuko ya plastiki na chupa zinapotupwa ovyo ardhini?',
    options: [
      'Uchafuzi wa ardhi na mchanga usioozeka kwa urahisi',
      'Uchafuzi wa anga na hewa safi ya oksijeni',
      'Uchafuzi wa kelele unaoumiza masikio',
      'Uzalishaji wa mbolea ya asili shambani'
    ],
    correctAnswer: 'Uchafuzi wa ardhi na mchanga usioozeka kwa urahisi',
    explanation: 'Plastiki haiozi ardhini, huziba mizizi ya mimea, huua mifugo wanaokula mifuko hiyo, na kuziba mifereji ya maji machafu.',
    socraticHint: 'Plastiki iliyotupwa ardhini huchafua udongo kwa sababu haiozi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-009',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini watoto wanashauriwa kunywa maji safi ya kutosha kila siku, badala ya vinywaji vyenye sukari nyingi?',
    text: 'Kwanini watoto wanashauriwa kunywa maji safi ya kutosha kila siku, badala ya vinywaji vyenye sukari nyingi?',
    options: [
      'Maji husaidia mfumo wa usagaji chakula, husafisha mafigo, na kuburudisha mwili bila kuharibu meno',
      'Maji huleta ugonjwa wa kisukari na kunenepa kupita kiasi',
      'Maji hayana faida yoyote mwilini lakini ni ya bei rahisi',
      'Maji huzuia watoto wasiweze kukimbia uwanjani'
    ],
    correctAnswer: 'Maji husaidia mfumo wa usagaji chakula, husafisha mafigo, na kuburudisha mwili bila kuharibu meno',
    explanation: 'Maji safi ni muhimu kwa mifumo yote ya mwili: kusafisha taka kwenye mafigo, kupunguza joto la mwili, na kuwezesha usagaji chakula vizuri.',
    socraticHint: 'Maji safi husaidia usagaji wa chakula na kuondoa taka mwilini.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-010',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wanafunzi wa Gredi ya 5 walifanya kampeni ya usafi wa soko la mtaani mwao. Ni faida gani ya kijamii iliyopatikana kutokana na ushirikiano huu?',
    text: 'Wanafunzi wa Gredi ya 5 walifanya kampeni ya usafi wa soko la mtaani mwao. Ni faida gani ya kijamii iliyopatikana kutokana na ushirikiano huu?',
    options: [
      'Kupunguza magonjwa ya milipuko, kuboresha sura ya soko, na kuimarisha uwajibikaji wa kijamii',
      'Kuwazuia wafanyabiashara wasiuze bidhaa zao sokoni',
      'Kupoteza muda wa masomo bila mafanikio yoyote ya kiafya',
      'Kuhakikisha kila mwanafunzi anapewa samaki bure'
    ],
    correctAnswer: 'Kupunguza magonjwa ya milipuko, kuboresha sura ya soko, na kuimarisha uwajibikaji wa kijamii',
    explanation: 'Shughuli za jamii za usafi huimarisha uzalendo, afya ya umma, na kuwafunza watoto uwajibikaji na uongozi bora.',
    socraticHint: 'Usafi wa soko huboresha vipi afya ya jamii nzima na kuzuia magonjwa?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-011',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni chakula kipi kati ya vifuatavyo ambacho ni chanzo kizuri cha nishati na nguvu (wanga) kinacholimwa na wakulima wengi wa Kenya?',
    text: 'Ni chakula kipi kati ya vifuatavyo ambacho ni chanzo kizuri cha nishati na nguvu (wanga) kinacholimwa na wakulima wengi wa Kenya?',
    options: [
      'Ugali wa mahindi au mtama',
      'Maziwa ya ngamia',
      'Nyama ya ng’ombe',
      'Maji ya chumvi'
    ],
    correctAnswer: 'Ugali wa mahindi au mtama',
    explanation: 'Mahindi na mtama ni nafaka zenye wanga unaoupa mwili nguvu ya kufanya kazi, kucheza, na kusoma shuleni.',
    socraticHint: 'Chakula kikuu cha kitamaduni cha Wakenya kinachotokana na unga wa mahindi ni kipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-012',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kukata kucha fupi za mikono na miguu kila wiki husaidia kwa njia gani katika afya ya mtoto?',
    text: 'Kukata kucha fupi za mikono na miguu kila wiki husaidia kwa njia gani katika afya ya mtoto?',
    options: [
      'Huzuia viini, uchafu, na mayai ya minyoo kujificha chini ya kucha na kuingia mdomoni unapokula',
      'Hufanya vidole visiweze kuandika vizuri kwa kalamu',
      'Huzuia kucha zisiweze kuwa na rangi nyeupe',
      'Hufanya mikono iwe mizito na kuuma'
    ],
    correctAnswer: 'Huzuia viini, uchafu, na mayai ya minyoo kujificha chini ya kucha na kuingia mdomoni unapokula',
    explanation: 'Kucha ndefu hukusanya matope na uchafu unaobeba viini vya magonjwa na mayai ya minyoo, ambayo huambukiza tumbo mtu anapokula.',
    socraticHint: 'Kucha fupi huzuia vipi uchafu na minyoo kuingia tumboni?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },

  // --- Unit 2: Mission 2 (q-g5-kisw-u2-013 to 024) ---
  {
    id: 'q-g5-kisw-u2-013',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino kama vile "Maji", "Maziwa", na "Mafuta" huwekwa katika ngeli gani ya Kiswahili?',
    text: 'Nomino kama vile "Maji", "Maziwa", na "Mafuta" huwekwa katika ngeli gani ya Kiswahili?',
    options: [
      'Ngeli ya YA - YA',
      'Ngeli ya KI - VI',
      'Ngeli ya U - I',
      'Ngeli ya A - WA'
    ],
    correctAnswer: 'Ngeli ya YA - YA',
    explanation: 'Nomino za vitu vya majimaji visivyohesabika (maji, maziwa, mafuta, marashi) zimo katika ngeli ya YA-YA (au MA-MA ya wingi), na huchukua kiambishi cha upatanisho "YA-".',
    socraticHint: 'Tazama kiambishi cha upatanisho: Maji ya-namwagika, Maziwa ya-mechemka. Hii ni ngeli gani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-014',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua upatanisho SAHIHI wa kisarufi kwa nomino "Maziwa" katika sentensi ifuatayo:',
    text: 'Chagua upatanisho SAHIHI wa kisarufi kwa nomino "Maziwa" katika sentensi ifuatayo:',
    options: [
      'Maziwa freshi yamemwagika sakafuni.',
      'Maziwa freshi limemwagika sakafuni.',
      'Maziwa freshi zimemwagika sakafuni.',
      'Maziwa freshi imemwagika sakafuni.'
    ],
    correctAnswer: 'Maziwa freshi yamemwagika sakafuni.',
    explanation: 'Katika ngeli ya YA-YA, kiambishi sahihi cha kitenzi ni "ya-", hivyo inakuwa: "Maziwa freshi yamemwagika sakafuni."',
    socraticHint: 'Kiambishi cha ngeli ya YA-YA kwa kitenzi ni ya-, li-, au zi-?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-015',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni neno lipi kati ya yafuatayo ambalo ni KIHUSISHI kinachoonyesha mahali kitu kilipo?',
    text: 'Ni neno lipi kati ya yafuatayo ambalo ni KIHUSISHI kinachoonyesha mahali kitu kilipo?',
    options: [
      'Ndani ya',
      'Haraka',
      'Nadhifu',
      'Lakini'
    ],
    correctAnswer: 'Ndani ya',
    explanation: '"Ndani ya" ni kihusishi cha mahali kinachoonyesha mahali kitu kilipo ndani ya nafasi au chombo (kama vile "ndani ya mtungi").',
    socraticHint: 'Ni maneno gani yanayoeleza nafasi au mahali: "ndani ya", "kando ya", "juu ya"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-016',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa kihusishi sahihi: "Mama aliweka sufuria ya uji wa mtama _______ meza ya chakula."',
    text: 'Kamilisha sentensi ifuatayo kwa kihusishi sahihi: "Mama aliweka sufuria ya uji wa mtama _______ meza ya chakula."',
    options: [
      'juu ya',
      'mbali na',
      'bila ya',
      'kwa sababu ya'
    ],
    correctAnswer: 'juu ya',
    explanation: 'Sufuria huwekwa "juu ya" meza ya chakula ili ipate kutumikiwa vizuri.',
    socraticHint: 'Kitu kinapowekwa kwenye usawa wa juu wa meza, tunatumia kihusishi kipi cha nafasi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-017',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi gani la nomino ambazo ZOTE zimo katika ngeli ya YA-YA?',
    text: 'Ni kundi gani la nomino ambazo ZOTE zimo katika ngeli ya YA-YA?',
    options: [
      'Maji, marashi, maziwa, mate, mafuta',
      'Mto, mkate, mguu, mchezo, mwiba',
      'Kiti, kitabu, chandalua, chakula, choo',
      'Kalamu, nguo, simu, sahani, meza'
    ],
    correctAnswer: 'Maji, marashi, maziwa, mate, mafuta',
    explanation: 'Nomino hizi zote ni za vinywaji na majimaji yanayochukua kiambishi cha upatanisho "YA-" pekee na hayana umoja.',
    socraticHint: 'Tafuta maneno yote yanayotaja vitu vya majimaji visivyohesabika kwa nambari moja moja.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-018',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua kionyeshi (kiashiria) cha karibu kinacholingana na nomino ya ngeli ya YA-YA: "Mafuta _______ ya kupikia yana harufu nzuri."',
    text: 'Chagua kionyeshi (kiashiria) cha karibu kinacholingana na nomino ya ngeli ya YA-YA: "Mafuta _______ ya kupikia yana harufu nzuri."',
    options: [
      'haya',
      'hawa',
      'hii',
      'hiki'
    ],
    correctAnswer: 'haya',
    explanation: 'Kiashiria cha karibu cha ngeli ya YA-YA ni "haya" (mfano: maji haya, mafuta haya, maziwa haya).',
    socraticHint: 'Kionyeshi cha karibu katika ngeli ya YA-YA huanza na "ha-" na kumalizika na "-ya".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-019',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kihusishi "kando ya" kinatumiwa kueleza nini katika sentensi: "Wanafunzi walipanda maua kando ya barabara ya shule"?',
    text: 'Kihusishi "kando ya" kinatumiwa kueleza nini katika sentensi: "Wanafunzi walipanda maua kando ya barabara ya shule"?',
    options: [
      'Mahali palipo pembeni au ukingoni mwa kitu',
      'Kitu kilicho katikati kabisa ya njia',
      'Kitu kilicho juu mbinguni',
      'Sababu ya kitendo kufanyika'
    ],
    correctAnswer: 'Mahali palipo pembeni au ukingoni mwa kitu',
    explanation: '"Kando ya" huonyesha eneo la pembeni, ukingoni, au pembezoni mwa njia, mto, au jengo.',
    socraticHint: 'Neno "kando" linamaanisha nini: pembeni au katikati?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-020',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi kati ya zifuatazo iliyo na matumizi SAHIHI ya ngeli ya YA-YA na kirejeshi "yote"?',
    text: 'Ni sentensi ipi kati ya zifuatazo iliyo na matumizi SAHIHI ya ngeli ya YA-YA na kirejeshi "yote"?',
    options: [
      'Maji yote safi ya chemchemi yametunzwa vyema na wanakijiji.',
      'Maji zote safi ya chemchemi zimetunzwa vyema na wanakijiji.',
      'Maji wote safi ya chemchemi wametunzwa vyema na wanakijiji.',
      'Maji yote safi la chemchemi limetunzwa vyema na wanakijiji.'
    ],
    correctAnswer: 'Maji yote safi ya chemchemi yametunzwa vyema na wanakijiji.',
    explanation: 'Katika ngeli ya YA-YA, nomino "maji" huchukua "yote", "ya chemchemi", na "yametunzwa" kufuata upatanisho thabiti wa kisarufi.',
    socraticHint: 'Katika ngeli ya YA-YA, viambishi vyote vya upatanisho huchukua sauti ya Y-: yote, ya, yametunzwa.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-021',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi: "Mtoto alipojikwaa mguu, machozi mengi _______mtiririka mashavuni."',
    text: 'Kamilisha sentensi: "Mtoto alipojikwaa mguu, machozi mengi _______mtiririka mashavuni."',
    options: [
      'yali-',
      'wali-',
      'zili-',
      'kili-'
    ],
    correctAnswer: 'yali-',
    explanation: 'Nomino "machozi" ipo katika ngeli ya YA-YA na huchukua kiambishi ngeli cha "ya-": "yali-mtiririka".',
    socraticHint: 'Nomino "machozi" huchukua kiambishi kipi cha ngeli ya YA-YA katika wakati uliopita?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-022',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kipi kinyume cha kihusishi "ndani ya" katika matumizi ya kueleza mahali?',
    text: 'Ni kipi kinyume cha kihusishi "ndani ya" katika matumizi ya kueleza mahali?',
    options: [
      'Nje ya',
      'Juu ya',
      'Mbele ya',
      'Kando ya'
    ],
    correctAnswer: 'Nje ya',
    explanation: 'Kinyume cha "ndani ya" ni "nje ya" (mfano: ndani ya chumba / nje ya chumba).',
    socraticHint: 'Ikiwa kitu hakipo ndani, kipo wapi kwa kinyume chake?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-023',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua kiashiria cha mbali kinachofaa kwa ngeli ya YA-YA katika sentensi: "Mazingira _______ ya mlima Kenya yanapendeza sana."',
    text: 'Chagua kiashiria cha mbali kinachofaa kwa ngeli ya YA-YA katika sentensi: "Mazingira _______ ya mlima Kenya yanapendeza sana."',
    options: [
      'yale',
      'wale',
      'zile',
      'vile'
    ],
    correctAnswer: 'yale',
    explanation: 'Katika ngeli ya YA-YA, kiashiria cha mbali ni "yale" (mfano: mazingira yale, maji yale, maziwa yale).',
    socraticHint: 'Kiashiria cha mbali cha ngeli ya YA-YA ni kipi: yale, wale, au zile?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
  },
  {
    id: 'q-g5-kisw-u2-024',
    subStrandId: 'substrand-g5-kisw-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Bainisha sentensi yenye kihusishi kinachoonyesha umbali katika sentensi zifuatazo:',
    text: 'Bainisha sentensi yenye kihusishi kinachoonyesha umbali katika sentensi zifuatazo:',
    options: [
      'Kituo cha afya kipo mbali na mto wenye madimbwi.',
      'Maji yapo ndani ya gudulia safi la udongo.',
      'Sahani ya mboga ipo juu ya meza.',
      'Watoto wanaketi chini ya kivuli cha mti.'
    ],
    correctAnswer: 'Kituo cha afya kipo mbali na mto wenye madimbwi.',
    explanation: '"Mbali na" ni kihusishi kinachoonyesha umbali au upana wa nafasi kati ya vitu viwili.',
    socraticHint: 'Tafuta sentensi inayoeleza umbali kwa kutumia maneno "mbali na".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U2'
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
console.log('Batch 1 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
