import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Kiswahili Lugha Batch 1 (Units 1 & 2) ---');

// 1. Setup Learning Area: la-kiswahili-g6
const laKiswG6 = {
  id: 'la-kiswahili-g6',
  gradeId: 'grade-6',
  name: 'Kiswahili',
  swahiliName: 'Kiswahili Sanifu',
  icon: 'book-open',
  color: '#F59E0B',
  description: 'Kusikiliza na kuzungumza kwa ufasaha, kusoma kwa ufahamu, uchambuzi wa fasihi simulizi, sarufi ya ngeli zote, mnyambuliko wa vitenzi, na uandishi bora wa insha za KPSEA.',
  strandsCount: 4
};

if (!db.learningAreas.some(la => la.id === laKiswG6.id)) {
  db.learningAreas.push(laKiswG6);
  console.log('Added learning area la-kiswahili-g6');
}

// Add to world-word-quest gameWorld learningAreaIds
const wordQuest = db.gameWorlds.find(w => w.id === 'world-word-quest');
if (wordQuest && !wordQuest.learningAreaIds.includes('la-kiswahili-g6')) {
  wordQuest.learningAreaIds.push('la-kiswahili-g6');
  console.log('Added la-kiswahili-g6 to world-word-quest');
}

// 2. Setup 4 Strands for Grade 6 Kiswahili
const strandsToAdd = [
  {
    id: 'strand-g6-kisw-kusikiliza',
    learningAreaId: 'la-kiswahili-g6',
    code: 'KISW-G6-STR-01',
    title: 'Kusikiliza na Kuzungumza',
    swahiliTitle: 'Kusikiliza na Kuzungumza',
    description: 'Ufasaha wa maamkizi, adabu za mazungumzo katika jamii, midahalo rasmi, usikilizaji makini wa taarifa na mawaidha, na utamkaji sahihi wa sauti tatanishi.',
    icon: 'volume-2'
  },
  {
    id: 'strand-g6-kisw-kusoma',
    learningAreaId: 'la-kiswahili-g6',
    code: 'KISW-G6-STR-02',
    title: 'Kusoma na Ufahamu',
    swahiliTitle: 'Kusoma na Ufahamu',
    description: 'Kusoma kwa kina na mapana, ufahamu wa makala ya masuala ibuka (sayansi, mazingira, afya), msamiati katika muktadha, na uchambuzi wa mashairi na hadithi za KPSEA.',
    icon: 'book-open'
  },
  {
    id: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    code: 'KISW-G6-STR-03',
    title: 'Sarufi na Matumizi ya Lugha',
    swahiliTitle: 'Sarufi na Muundo wa Lugha',
    description: 'Ngeli zote za nomino na upatanisho wa kisarufi, nyakati na hali, mnyambuliko wa vitenzi, vishazi na sentensi, kauli halisi na kauli taarifa, vitate na vinyume.',
    icon: 'puzzle'
  },
  {
    id: 'strand-g6-kisw-kuandika',
    learningAreaId: 'la-kiswahili-g6',
    code: 'KISW-G6-STR-04',
    title: 'Kuandika na Utunzi wa Insha',
    swahiliTitle: 'Kuandika na Utunzi',
    description: 'Uandishi wa insha za masimulizi za KPSEA, insha za maelezo, barua rasmi na za kirafiki, hotuba, kumbukumbu za mikutano, na uakifishaji sahihi.',
    icon: 'edit-3'
  }
];

strandsToAdd.forEach(str => {
  if (!db.strands.some(s => s.id === str.id)) {
    db.strands.push(str);
    console.log(`Added strand ${str.id}`);
  }
});

// 3. Sub-strands for Units 1 & 2
const subStrandsToAdd = [
  {
    id: 'substrand-g6-kisw-u1',
    strandId: 'strand-g6-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Usalama Mtandaoni, Mawasiliano ya Kidijitali & Ngeli za A-WA, KI-VI na LI-YA',
    description: 'Kujenga msamiati wa teknohama na usalama mtandaoni (tovuti, nywila, mtandao, barua pepe); stadi za majadiliano na ushauri kuhusu matumizi salama ya vifaa vya kidijitali; na upatanisho sahihi wa kisarufi katika ngeli za A-WA, KI-VI na LI-YA.',
    cbeCompetency: 'Ujuzi wa kidijitali, maadili ya mtandao, na umilisi wa upatanisho wa kisarufi katika ngeli za msingi',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g6-kisw-u2',
    strandId: 'strand-g6-kisw-kusoma',
    learningAreaId: 'la-kiswahili-g6',
    title: 'Uhifadhi wa Mazingira, Misitu ya Mau & Ngeli za U-I, U-YA, YA-YA na I-ZI',
    description: 'Kusoma makala kuhusu uhifadhi wa vyanzo vya maji (Mnara wa Mau, Mlima Kenya), kupanda miti na kuzuia mmomonyoko wa udongo; msamiati wa ikolojia na mazingira; na kutawala upatanisho wa ngeli za U-I, U-YA, YA-YA na I-ZI.',
    cbeCompetency: 'Ufahamu wa makala ya ikolojia, uzalendo wa kimazingira, na umilisi wa ngeli za mimea, viowevu na nomino za I-ZI',
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

// 4. Lessons for Units 1 & 2
const lessonsToAdd = [
  {
    id: 'lesson-g6-kisw-u1-l1',
    subStrandId: 'substrand-g6-kisw-u1',
    title: 'Teknohama, Usalama Mtandaoni na Mawasiliano ya Kidijitali',
    content: 'Mawasiliano ya kisasa yanategemea mifumo ya kielektroniki na mtandao mpana wa kompyuta.\n\n1. Msamiati wa TEKNOHAMA (Teknolojia ya Habari na Mawasiliano):\n- Tovuti (Website): Mahali pa kielektroniki kwenye mtandao panapohifadhi kurasa za habari.\n- Nywila (Password): Neno au msimbo wa siri unaomlinda mtumiaji dhidi ya wezi wa mtandaoni.\n- Mtandao (Internet / Network): Mfumo wa kidijitali unaounganisha vifaa vya kielektroniki ulimwenguni.\n- Barua pepe (Email): Barua inayotumwa na kupokelewa kupitia njia ya tarakilishi au simu.\n- Tarakilishi (Computer), Kipanya (Mouse), Kiwambo (Screen), Kibodi (Keyboard).\n\n2. Kanuni Muhimu za Usalama Mtandaoni:\n- Usitoe taarifa zako binafsi (jina la ukoo, nambari ya simu, mahali unapoishi, shule yako) kwa wageni mtandaoni.\n- Tumia nywila thabiti yenye mchanganyiko wa herufi kubwa, ndogo, nambari na alama maalum.\n- Usibofye viungo visivyojulikana vinavyoahidi pesa, simu au zawadi za bure.\n- Mjulishe mzazi au mwalimu mara moja iwapo utapokea jumbe za vitisho au za kukuudhi (unyanyasaji mtandaoni).\n\n3. Nahau na Misemo ya Mawasiliano:\n- "Kupiga darubini": Kuchunguza jambo kwa makini sana.\n- "Kuweka siri": Kutomfichulia mtu yeyote jambo la faragha.\n- "Kupiga unyende": Kutoa sauti ya kilio au tahadhari.',
    didYouKnow: 'Neno "TEKNOHAMA" ni ufupisho rasmi wa maneno ya Kiswahili: TEKNOlojia ya HAbari na MAwasiliano!',
    kenyanContext: 'Wanafunzi wa Shule ya Msingi ya Kilimani jijini Nairobi hutumia tableti za kidijitali kujisomea vitabu vya mtandaoni huku wakizingatia usalama wa nywila zao.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u1-l2',
    subStrandId: 'substrand-g6-kisw-u1',
    title: 'Ngeli za Nomino: A-WA, KI-VI na LI-YA',
    content: 'Ngeli za nomino ni makundi ya majina kulingana na viambishi vya upatanisho wa kisarufi katika sentensi.\n\n1. Ngeli ya A-WA:\n- Hujumuisha viumbe wote wenye uhai (binadamu, wanyama, ndege, samaki na wadudu).\n- Umoja: huchukua kiambishi nafsi "a-" (au "yu-"); Wingi: huchukua kiambishi "wa-".\n- Mifano:\n  * Mwalimu anafundisha vizuri -> Walimu wanafundisha vizuri.\n  * Simba mkali ameguruma -> Simba wakali wameguruma.\n  * Kipepeo mzuri anaruka -> Vipepeo wazuri wanaruka (Kumbuka: ingawa kipepeo anaanza na ki-, ana uhai hivyo yumo katika A-WA!).\n  * Kinyonga anabadilika rangi -> Vinyonga wanabadilika rangi.\n\n2. Ngeli ya KI-VI:\n- Hujumuisha vitu visivyo na uhai vinavyoanza na ki- au ch- katika umoja na vi- au vy- katika wingi.\n- Umoja: kiambishi "ki-" / "ch-"; Wingi: "vi-" / "vy-".\n- Mifano:\n  * Kitabu kizuri kimesomwa -> Vitabu vizuri vimesomwa.\n  * Choo kimesafishwa vyema -> Vyoo vimesafishwa vyema.\n  * Kisima kirefu kimechimbwa -> Visima virefu vimechimbwa.\n\n3. Ngeli ya LI-YA:\n- Hujumuisha majina yanayoanza na ji-/j- au yasiyo na kiambishi katika umoja na kuanza na ma- katika wingi.\n- Umoja: kiambishi "li-"; Wingi: kiambishi "ya-".\n- Mifano:\n  * Jani lililoanguka linakauka -> Majani yaliyoanguka yanakauka.\n  * Embe tamu limeiva -> Maembe matamu yameiva.\n  * Jino hili linauma sana -> Meno haya yanauma sana.\n  * Daraja imara limejengwa -> Madaraja imara yamejengwa.',
    didYouKnow: 'Viumbehai wote kama "kifaru", "kiroboto", na "chura" huwekwa katika ngeli ya A-WA na si KI-VI, kwa sababu wana sifa ya uhai!',
    kenyanContext: 'Katika Hifadhi ya Kitaifa ya Ziwa Nakuru, walinzi wa KWS husema: "Kifaru huyu amelindwa vyema dhidi ya majangili," wakitumia upatanisho wa ngeli ya A-WA.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u2-l1',
    subStrandId: 'substrand-g6-kisw-u2',
    title: 'Makala ya Mazingira, Misitu ya Asili na Uhifadhi wa Ikolojia',
    content: 'Mazingira ni jumla ya mambo yote yanayomzunguka kiumbehai ikiwemo ardhi, hewa, mimea na vyanzo vya maji.\n\n1. Umuhimu wa Minara ya Maji Nchini Kenya:\n- Misitu ya asili kama Msitu wa Mau, Mlima Kenya na Aberdare ni "minara ya maji" (water towers) inayolisha mito mikuu kama Mara, Tana, na Nzoia.\n- Miti ya kiasili huvuta mvua, hutunza unyevunyevu ardhini, na kuzuia mmomonyoko wa udongo milimani.\n\n2. Msamiati wa Ikolojia na Mazingira:\n- Mnara wa maji: Msitu mkubwa ulio mlimani unaokusanya mvua na kuanzisha vijito na mito mingi.\n- Mmomonyoko wa udongo: Hali ya tabaka la juu la udongo wenye rutuba kubebwa na maji ya mafuriko au upepo mkali.\n- Upandaji miti (upandaji upya): Kuotesha miche ya miti katika maeneo yaliyokatwa miti au yaliyo wazi.\n- Taka zinazooza: Takataka za kiasili (maganda ya ndizi, mabaki ya chakula) zinazoweza kutengeneza mbolea.\n- Taka zisizooza: Takataka kama chupa za plastiki na mifuko ya nailoni zinazochafua ardhi kwa mamia ya miaka.\n\n3. Methali na Hekima za Kimazingira:\n- "Mti mkuu ukigwa, wana wa ndege huyumba": Tegemeo kuu linapotoweka, wanyonge hutaabika.\n- "Asiyefunzwa na mamaye hufunzwa na ulimwengu": Asiyesikia ushauri mapema ataadhibiwa na matokeo magumu maishani.\n- "Kinga ni bora kuliko tiba": Kuzuia uharibifu wa mazingira ni rahisi kuliko kurejesha misitu iliyoteketea.',
    didYouKnow: 'Profesa Wangari Maathai kutoka Kenya alikuwa Mwafrika wa kwanza kushinda Tuzo ya Amani ya Nobel mnamo mwaka wa 2004 kutokana na juhudi zake za kupanda mamilioni ya miti kupitia vuguvugu la Green Belt Movement!',
    kenyanContext: 'Wanafunzi wa kaunti za Nyeri na Kericho huunda vilabu vya 4-K na mazingira shuleni wakipanda mianzi kandokando ya mito ili kuzuia mmomonyoko wa kingo za mito.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-kisw-u2-l2',
    subStrandId: 'substrand-g6-kisw-u2',
    title: 'Ngeli za Nomino: U-I, U-YA, YA-YA na I-ZI',
    content: 'Kuendeleza uchambuzi wa ngeli za nomino kwa majina ya mimea, viowevu, na vifaa mbalimbali vya kila siku.\n\n1. Ngeli ya U-I:\n- Hujumuisha mimea, miti, na sehemu za mwili zinazoanza na m- au mw- katika umoja na mi- katika wingi.\n- Umoja: kiambishi "u-"; Wingi: kiambishi "i-".\n- Mifano:\n  * Mti mrefu umeanguka -> Miti mirefu imeanguka.\n  * Mto ule unafurika -> Mito ile inafurika.\n  * Mkate mtamu umeliwa -> Mikate mitamu imeliwa.\n  * Mwiba mkali umechoma -> Miiba mikali imechoma.\n\n2. Ngeli ya U-YA:\n- Hujumuisha majina machache yanayoanza na u- au w- katika umoja na ma- katika wingi.\n- Umoja: kiambishi "u-"; Wingi: kiambishi "ya-".\n- Mifano:\n  * Ua zuri limechanua bustanini -> Maua mazuri yamechanua bustanini.\n  * Ugonjwa mbaya umetibiwa hospitalini -> Magonjwa mabaya yametibiwa hospitalini.\n\n3. Ngeli ya YA-YA:\n- Hujumuisha nomino za viowevu (majimaji) na mambo yasiyohesabika ambayo huanza na ma- na hayana umoja.\n- Upatanisho: kiambishi "ya-".\n- Mifano:\n  * Maji safi yamemwagika sakafuni.\n  * Maziwa ya ng\'ombe yamechemka jikoni.\n  * Mafuta ya taa yamepanda bei.\n  * Mate yamemkauka mdomoni.\n\n4. Ngeli ya I-ZI:\n- Hujumuisha majina ya vitu visivyo na uhai ambayo hayabadiliki muundo kati ya umoja na wingi.\n- Umoja: kiambishi "i-"; Wingi: kiambishi "zi-".\n- Mifano:\n  * Nyumba hii imejengwa vizuri -> Nyumba hizi zimejengwa vizuri.\n  * Kalamu yangu imepotea -> Kalamu zangu zimepotea.\n  * Nguo safi imeanikwa juani -> Nguo safi zimeanikwa juani.\n  * Sahani nzuri ipo kabatini -> Sahani nzuri zipo kabatini.',
    didYouKnow: 'Nomino kama "maji", "maziwa", "marashi", na "mafuta" hazina umoja kamwe; huchukua upatanisho wa ngeli ya YA-YA wakati wote!',
    kenyanContext: 'Idara ya Maji ya Kaunti ya Kisumu hutoa taarifa: "Maji safi yatasambazwa katika mabomba ya kila mtaa kuanzia alfajiri," ikizingatia upatanisho wa ngeli ya YA-YA.',
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

// 5. Missions for Units 1 & 2 (Orders 142 to 145)
const missionsToAdd = [
  {
    id: 'mission-g6-kisw-u1-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 142: Walinzi wa Kidijitali – Usalama Mtandaoni',
    description: 'Tambua msamiati wa teknohama, nywila salama, na maadili ya mawasiliano ya kidijitali nchini Kenya.',
    order: 142,
    orderIndex: 142,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-teknohama',
    badge: 'badge-g6-kisw-teknohama',
    lessonId: 'lesson-g6-kisw-u1-l1',
    questionIds: [
      'q-g6-kisw-u1-001', 'q-g6-kisw-u1-002', 'q-g6-kisw-u1-003', 'q-g6-kisw-u1-004',
      'q-g6-kisw-u1-005', 'q-g6-kisw-u1-006', 'q-g6-kisw-u1-007', 'q-g6-kisw-u1-008',
      'q-g6-kisw-u1-009', 'q-g6-kisw-u1-010', 'q-g6-kisw-u1-011', 'q-g6-kisw-u1-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u1-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 143: Upatanisho wa Kisarufi – Ngeli za A-WA, KI-VI na LI-YA',
    description: 'Bobea katika upatanisho sahihi wa kisarufi na uambishaji wa ngeli za A-WA, KI-VI na LI-YA katika sentensi za umoja na wingi.',
    order: 143,
    orderIndex: 143,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-ngeli-aw-kv-ly',
    badge: 'badge-g6-kisw-ngeli-aw-kv-ly',
    lessonId: 'lesson-g6-kisw-u1-l2',
    questionIds: [
      'q-g6-kisw-u1-013', 'q-g6-kisw-u1-014', 'q-g6-kisw-u1-015', 'q-g6-kisw-u1-016',
      'q-g6-kisw-u1-017', 'q-g6-kisw-u1-018', 'q-g6-kisw-u1-019', 'q-g6-kisw-u1-020',
      'q-g6-kisw-u1-021', 'q-g6-kisw-u1-022', 'q-g6-kisw-u1-023', 'q-g6-kisw-u1-024'
    ]
  },
  {
    id: 'mission-g6-kisw-u2-m1',
    worldId: 'world-word-quest',
    title: 'Misheni 144: Walinzi wa Msitu wa Mau – Ikolojia na Ufahamu',
    description: 'Soma makala kuhusu uhifadhi wa vyanzo vya maji vya Mau, msamiati wa ikolojia, na hekima ya methali za kimazingira.',
    order: 144,
    orderIndex: 144,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-mazingira',
    badge: 'badge-g6-kisw-mazingira',
    lessonId: 'lesson-g6-kisw-u2-l1',
    questionIds: [
      'q-g6-kisw-u2-001', 'q-g6-kisw-u2-002', 'q-g6-kisw-u2-003', 'q-g6-kisw-u2-004',
      'q-g6-kisw-u2-005', 'q-g6-kisw-u2-006', 'q-g6-kisw-u2-007', 'q-g6-kisw-u2-008',
      'q-g6-kisw-u2-009', 'q-g6-kisw-u2-010', 'q-g6-kisw-u2-011', 'q-g6-kisw-u2-012'
    ]
  },
  {
    id: 'mission-g6-kisw-u2-m2',
    worldId: 'world-word-quest',
    title: 'Misheni 145: Mitiririko ya Sarufi – Ngeli za U-I, U-YA, YA-YA na I-ZI',
    description: 'Bobea katika upatanisho sahihi wa kisarufi kwa nomino za miti, viowevu, na vifaa katika umoja na wingi.',
    order: 145,
    orderIndex: 145,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-kisw-ngeli-ui-izi',
    badge: 'badge-g6-kisw-ngeli-ui-izi',
    lessonId: 'lesson-g6-kisw-u2-l2',
    questionIds: [
      'q-g6-kisw-u2-013', 'q-g6-kisw-u2-014', 'q-g6-kisw-u2-015', 'q-g6-kisw-u2-016',
      'q-g6-kisw-u2-017', 'q-g6-kisw-u2-018', 'q-g6-kisw-u2-019', 'q-g6-kisw-u2-020',
      'q-g6-kisw-u2-021', 'q-g6-kisw-u2-022', 'q-g6-kisw-u2-023', 'q-g6-kisw-u2-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 6. Questions for Units 1 & 2 (48 questions: 24 for Unit 1, 24 for Unit 2)
const questionsToAdd = [
  // ==========================================
  // Unit 1 Lesson 1: Teknohama & Usalama Mtandaoni (q-g6-kisw-u1-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u1-001',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Ni neno lipi la Kiswahili lenye maana ya nambari au herufi za siri unazotumia kufungua akaunti ya kielektroniki mtandaoni?',
    options: [
      'Nywila',
      'Barua pepe',
      'Kipanya',
      'Tovuti'
    ],
    correctAnswer: 'Nywila',
    explanation: '"Nywila" ni neno la Kiswahili sanifu lenye maana ya msimbo au nambari ya siri (password) inayolinda akaunti dhidi ya wavamizi.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi linalotafsiri neno la Kiingereza "password" katika Kiswahili sanifu?'
  },
  {
    id: 'q-g6-kisw-u1-002',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Kifupisho "TEKNOHAMA" kinasimamia nini katika Kiswahili sanifu?',
    options: [
      'Teknolojia ya Habari na Mawasiliano',
      'Teknolojia ya Hali ya Mazingira',
      'Mbinu za Kielektroniki za Hospitali za Nchi',
      'Ufundi wa Mitambo ya Kisasa ya Shambani'
    ],
    correctAnswer: 'Teknolojia ya Habari na Mawasiliano',
    explanation: 'TEKNOHAMA ni ufupisho unaoundwa na silabi za maneno: TEKNOlojia ya HAbari na MAwasiliano (ICT).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Chunguza silabi za neno: TEKNO... HA... MA... zinatoka kwenye maneno yapi?'
  },
  {
    id: 'q-g6-kisw-u1-003',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Ni hatua ipi iliyo salama zaidi kwa mwanafunzi anapotumia mtandao kwenye tarakilishi ya shule?',
    options: [
      'Kutoshiriki nywila wala taarifa binafsi na wageni mtandaoni',
      'Kumpa kila mwanafunzi nywila yake ili wamsaidie kuandika',
      'Kutuma picha za nyumbani kwa mtu yeyote anayeomba mtandaoni',
      'Kubofya viungo vyote vinavyosema kuna pesa za bure'
    ],
    correctAnswer: 'Kutoshiriki nywila wala taarifa binafsi na wageni mtandaoni',
    explanation: 'Usalama mtandaoni unasisitiza kulinda nywila na kutoeneza anwani, nambari za simu au siri za kibinafsi kwa wageni.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, ni tabia gani inayomlinda mwanafunzi asidanganywe au kuvamiwa na wezi wa mtandaoni?'
  },
  {
    id: 'q-g6-kisw-u1-004',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Sehemu ya tarakilishi inayomwezesha mtumiaji kuelekeza mshale na kubofya faili kwenye kiwambo huitwa:',
    options: [
      'Kipanya (au Kielekezi)',
      'Kichapishi',
      'Kibodi pekee',
      'Mwangwi'
    ],
    correctAnswer: 'Kipanya (au Kielekezi)',
    explanation: 'Kifaa cha kushika mkononi kinachoelekeza na kubofya amri kwenye kiwambo cha kompyuta huitwa "kipanya" (computer mouse).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kifaa kipi cha tarakilishi kilichopewa jina la mnyama mdogo kwa sababu ya umbo na mkia wake?'
  },
  {
    id: 'q-g6-kisw-u1-005',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Mwanafunzi anapopokea ujumbe wa vitisho au wa kumtusi kwenye mtandao (unyanyasaji mtandaoni), anapaswa kufanya nini mara moja?',
    options: [
      'Kumjulisha mwalimu, mzazi au mlezi wake mara moja',
      'Kutukana na kujibu kwa maneno makali zaidi',
      'Kuficha ujumbe huo na kulia chumbani peke yake',
      'Kuwapa rafiki zake simu ili wamtukane mtumaji'
    ],
    correctAnswer: 'Kumjulisha mwalimu, mzazi au mlezi wake mara moja',
    explanation: 'Unyanyasaji mtandaoni (cyberbullying) unapaswa kuripotiwa mara moja kwa watu wazima wanaomjali mtoto ili hatua stahiki zichukuliwe.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni nani anayestahili kutoa msaada na ulinzi mtoto anaponyanyaswa kielektroniki?'
  },
  {
    id: 'q-g6-kisw-u1-006',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Neno "tovuti" lina maana gani katika ulimwengu wa mawasiliano ya kielektroniki?',
    options: [
      'Mahali pa kielektroniki kwenye mtandao penye mkusanyiko wa kurasa za habari',
      'Wavu unaotumiwa na wavuvi kuvua samaki ziwani',
      'Kitambaa kinachotumiwa kufuta vumbi kwenye kiwambo',
      'Kamba inayounganisha stima kwenye tarakilishi'
    ],
    correctAnswer: 'Mahali pa kielektroniki kwenye mtandao penye mkusanyiko wa kurasa za habari',
    explanation: '"Tovuti" ni tafsiri fasaha ya neno la Kiingereza "website", yaani mkusanyiko wa kurasa za habari za kidijitali mtandaoni.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Fikiria neno la Kiingereza "website" - linamaanisha nini katika Kiswahili?'
  },
  {
    id: 'q-g6-kisw-u1-007',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Ni nahau ipi kati ya hizi yenye maana ya "kuchunguza jambo kwa makini na udadisi mkubwa"?',
    options: [
      'Kupiga darubini',
      'Kupiga unyende',
      'Kupiga mbizi',
      'Kupiga hema'
    ],
    correctAnswer: 'Kupiga darubini',
    explanation: 'Nahau "kupiga darubini" inamaanisha kuchunguza jambo au hali fulani kwa uangalifu na makini sana.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni chombo kipi cha macho kinachotumiwa kuona mambo ya mbali kwa ukaribu na uwazi?'
  },
  {
    id: 'q-g6-kisw-u1-008',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Tunga sentensi sahihi ukitumia msamiati wa kielektroniki unaoonyesha kutuma ujumbe kupitia mtandao:',
    options: [
      'Mwalimu alituma ratiba ya masomo kupitia barua pepe.',
      'Mwalimu alituma ratiba ya masomo kupitia kigae cha ukutani.',
      'Mwalimu alikimbia mbio kupeleka barua pepe chini ya mti.',
      'Barua pepe ilianguka shimoni wakati mvua iliponyesha.'
    ],
    correctAnswer: 'Mwalimu alituma ratiba ya masomo kupitia barua pepe.',
    explanation: '"Barua pepe" (email) hutumwa kielektroniki kupitia mtandao wa tarakilishi au simu za kisasa.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni sentensi ipi inayotumia msamiati "barua pepe" katika maana yake halisi ya kidijitali?'
  },
  {
    id: 'q-g6-kisw-u1-009',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Ni ipi kati ya hizi iliyo nywila thabiti na salama zaidi dhidi ya wezi wa mtandaoni?',
    options: [
      'K!p4ny@2026#KenyA',
      '123456',
      'jinalangu',
      'shule'
    ],
    correctAnswer: 'K!p4ny@2026#KenyA',
    explanation: 'Nywila thabiti inapaswa kuwa na mchanganyiko wa herufi kubwa, herufi ndogo, tarakimu (nambari), na alama maalum kama alama za hisi au reli.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni chaguo lipi lenye mchanganyiko changamano wa herufi, nambari na alama maalum?'
  },
  {
    id: 'q-g6-kisw-u1-010',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Neno lipi la Kiswahili linawakilisha kitendo cha "kupakua" (download) mafaili au vitabu kutoka kwenye mtandao?',
    options: [
      'Kupakua',
      'Kupakia',
      'Kuvinjari',
      'Kupepesa'
    ],
    correctAnswer: 'Kupakua',
    explanation: '"Kupakua" (download) ni kutoa faili au programu kutoka kwenye mtandao na kuihifadhi kwenye kifaa chako, ilhali "kupakia" (upload) ni kuweka faili mtandaoni.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni kitendo gani cha kutoa kitu kwenye mtandao na kukiweka ndani ya kompyuta yako?'
  },
  {
    id: 'q-g6-kisw-u1-011',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Soma maelezo haya: "Amani alipokea ujumbe mfupi akidaiwa kushinda shilingi nusu milioni lakini akatakiwa kutuma ada ya shilingi elfu moja kwanza." Hali hii inaitwaje katika uhalifu wa kidijitali?',
    options: [
      'Ulaghai wa mtandaoni (wizi wa kimtandao)',
      'Huduma rasmi ya kibenki',
      'Msaada wa hisani kutoka serikalini',
      'Utafiti wa elimu ya kidijitali'
    ],
    correctAnswer: 'Ulaghai wa mtandaoni (wizi wa kimtandao)',
    explanation: 'Huu ni mfano halisi wa ulaghai na ulaghai wa mtandaoni (online scam/phishing), ambapo walaghai huahidi utajiri wa uongo ili wakuibie pesa zako.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Watu wanapotoa ahadi hewa za pesa ili wakuchukue fedha zako kwa njia ya simu, wanatenda uhalifu gani?'
  },
  {
    id: 'q-g6-kisw-u1-012',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l1',
    text: 'Kisawe cha neno "tarakilishi" katika Kiswahili sanifu ni nini?',
    options: [
      'Kompyuta',
      'Runinga',
      'Redio',
      'Kinasa sauti'
    ],
    correctAnswer: 'Kompyuta',
    explanation: '"Tarakilishi" na "kompyuta" ni maneno visawe yanayomaanisha mtambo wa kielektroniki unaochakata data na kufanya mahesabu.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni neno lipi la mkopo kutoka Kiingereza ambalo lina maana sawa na "tarakilishi"?'
  },

  // ==========================================
  // Unit 1 Lesson 2: Ngeli za Nomino A-WA, KI-VI na LI-YA (q-g6-kisw-u1-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u1-013',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Nomino "mwanafunzi" na "simba" zimo katika ngeli gani ya Kiswahili?',
    options: [
      'A-WA',
      'KI-VI',
      'LI-YA',
      'I-ZI'
    ],
    correctAnswer: 'A-WA',
    explanation: 'Viumbe wote wenye uhai (binadamu na wanyama) huingia katika ngeli ya A-WA kwa sababu ya upatanisho wa kisarufi (a- / wa-).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mwanafunzi na simba ni viumbehai. Wanachukua kiambishi gani cha upatanisho: a- au ki-?'
  },
  {
    id: 'q-g6-kisw-u1-014',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Andika sentensi ifuatayo katika wingi: "Kitabu kizuri kimesomwa na mtoto."',
    options: [
      'Vitabu vizuri vimesomwa na watoto.',
      'Vitabu nzuri zimesomwa na watoto.',
      'Kitabu kizuri kimesomwa na watoto.',
      'Mavitabu mazuri yamesomwa na watoto.'
    ],
    correctAnswer: 'Vitabu vizuri vimesomwa na watoto.',
    explanation: 'Katika ngeli ya KI-VI, "kitabu kizuri kimesomwa" hubadilika kuwa "vitabu vizuri vimesomwa", na mtoto (A-WA) huwa watoto.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ngeli ya KI-VI katika wingi huchukua viambishi vi- au vy-.'
  },
  {
    id: 'q-g6-kisw-u1-015',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Ni sentensi ipi inayoonyesha upatanisho sahihi wa kisarufi katika ngeli ya LI-YA?',
    options: [
      'Jani lililoanguka linakauka.',
      'Jani lililoanguka yanakauka.',
      'Jani kilianguka kinakauka.',
      'Jani zimeanguka zinakauka.'
    ],
    correctAnswer: 'Jani lililoanguka linakauka.',
    explanation: 'Nomino "jani" imo katika ngeli ya LI-YA (umoja). Hivyo, huchukua kiambishi cha upatanisho "li-": "Jani lililoanguka linakauka."',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Nomino za ngeli ya LI-YA katika umoja huchukua kiambishi gani cha kiima na kivumishi?'
  },
  {
    id: 'q-g6-kisw-u1-016',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Nomino "kipepeo" na "kifaru" zinaingia katika ngeli gani, na kwa nini?',
    options: [
      'A-WA, kwa sababu ni viumbe wenye uhai',
      'KI-VI, kwa sababu zinaanza na herufi "ki-"',
      'LI-YA, kwa sababu zinaishi mwituni',
      'I-ZI, kwa sababu hazina wingi'
    ],
    correctAnswer: 'A-WA, kwa sababu ni viumbe wenye uhai',
    explanation: 'Katika sarufi ya Kiswahili, viumbe wote wenye uhai (hata kama majina yao yanaanza na ki-, kama vile kipepeo, kifaru, kinyonga) hupatanishwa katika ngeli ya A-WA.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, kipepeo na kifaru ni vitu visivyo na uhai au ni wanyama/wadudu wenye uhai?'
  },
  {
    id: 'q-g6-kisw-u1-017',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Kamilisha sentensi ifuatayo kwa usahihi: "Meno ya mtoto __________ vizuri sana."',
    options: [
      'yameng\'aa',
      'limeng\'aa',
      'zimeng\'aa',
      'kimeng\'aa'
    ],
    correctAnswer: 'yameng\'aa',
    explanation: '"Meno" ni wingi wa "jino", ambayo imo katika ngeli ya LI-YA. Katika wingi, ngeli ya LI-YA huchukua kiambishi "ya-": "Meno yameng\'aa."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: '"Meno" ni wingi wa "jino" katika ngeli ya LI-YA. Ni kiambishi gani cha wingi kinachotakiwa?'
  },
  {
    id: 'q-g6-kisw-u1-018',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Sentensi ipi iliyoandikwa katika ngeli ya KI-VI kwa usahihi wa umoja na wingi?',
    options: [
      'Choo hiki kimesafishwa -> Vyoo hivi vimesafishwa',
      'Choo hii imesafishwa -> Vyoo hizi zimesafishwa',
      'Choo lile limesafishwa -> Vyoo yale yamesafishwa',
      'Choo yule amesafishwa -> Vyoo wale wamesafishwa'
    ],
    correctAnswer: 'Choo hiki kimesafishwa -> Vyoo hivi vimesafishwa',
    explanation: '"Choo" na "vyoo" huchukua viambishi vya ngeli ya KI-VI: ch-/vy- na ki-/vi- ("Choo hiki kimesafishwa -> Vyoo hivi vimesafishwa").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama viashiria "hiki" na "hivi" katika upatanisho wa ngeli ya KI-VI.'
  },
  {
    id: 'q-g6-kisw-u1-019',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Chagua kiwakilishi kionyeshi sahihi cha mbali katika ngeli ya LI-YA (wingi): "Madaraja __________ yalijengwa na serikali."',
    options: [
      'yale',
      'hayo',
      'zile',
      'wale'
    ],
    correctAnswer: 'yale',
    explanation: 'Katika ngeli ya LI-YA wingi (ma-), kionyeshi cha mbali ni "yale" ("Madaraja yale").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kionyeshi cha mbali kwa nomino zinazochukua "ya-" (kama madaraja) ni kipi?'
  },
  {
    id: 'q-g6-kisw-u1-020',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Tambua sentensi yenye kosa la upatanisho wa kisarufi:',
    options: [
      'Vipepeo hivi vinaruka angani kwa kasi.',
      'Wanafunzi hawa wanasoma kwa bidii shuleni.',
      'Kitabu hiki kimesomwa na mwalimu.',
      'Embe hili limeiva vizuri mtini.'
    ],
    correctAnswer: 'Vipepeo hivi vinaruka angani kwa kasi.',
    explanation: '"Vipepeo" ni viumbehai katika ngeli ya A-WA. Pasiwe na "hivi" wala "vinaruka", bali: "Vipepeo hawa wanaruka angani."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kumbuka kuwa kipepeo ana uhai na yumo katika ngeli ya A-WA. Je, anastahili kuchukua "hivi" na "vinaruka"?'
  },
  {
    id: 'q-g6-kisw-u1-021',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Sentensi: "Jicho la mtoto linaona vizuri" ikibadilishwa kuwa wingi itakuwaje?',
    options: [
      'Macho ya watoto yanaona vizuri.',
      'Majicho ya watoto yanaona vizuri.',
      'Macho za watoto zinaona vizuri.',
      'Majicho ya watoto wanaona vizuri.'
    ],
    correctAnswer: 'Macho ya watoto yanaona vizuri.',
    explanation: '"Jicho" (LI-YA umoja) huwa "macho" (LI-YA wingi), na huchukua kiambishi "ya-": "Macho ya watoto yanaona vizuri."',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wingi wa nomino "jicho" ni upi, na unachukua kiambishi kipi cha uhusiano?'
  },
  {
    id: 'q-g6-kisw-u1-022',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Ni kundi lipi la nomino ambapo maneno yote yamo katika ngeli ya LI-YA pekee?',
    options: [
      'Gari, embe, tunda, jani',
      'Mti, mto, mkate, mguu',
      'Kitabu, kiti, kijiko, kikombe',
      'Mtu, ng\'ombe, mbuzi, kuku'
    ],
    correctAnswer: 'Gari, embe, tunda, jani',
    explanation: 'Nomino "gari" (magari), "embe" (maembe), "tunda" (matunda), na "jani" (majani) zote ni za ngeli ya LI-YA.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tafuta kundi la nomino ambazo katika wingi huanza na kiambishi "ma-".'
  },
  {
    id: 'q-g6-kisw-u1-023',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Sentensi: "Kiziwi yule anasikia sauti za ndege." Kwa nini nomino "kiziwi" inachukua viambishi "yule" na "ana-" badala ya "kile" na "kina-"?',
    options: [
      'Kwa sababu kiziwi ni binadamu mwenye uhai katika ngeli ya A-WA',
      'Kwa sababu sentensi iko katika wakati uliopita',
      'Kwa sababu neno hilo lina herufi sita',
      'Kwa sababu kiziwi hawezi kusikia sauti'
    ],
    correctAnswer: 'Kwa sababu kiziwi ni binadamu mwenye uhai katika ngeli ya A-WA',
    explanation: 'Binadamu wote (kama kiziwi, kipofu, kilema) huchukua upatanisho wa ngeli ya A-WA kwa sababu ya hadhi yao ya kuwa viumbehai.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, kiziwi ni mtu (kiumbehai) au ni kifaa kisicho na uhai?'
  },
  {
    id: 'q-g6-kisw-u1-024',
    subStrandId: 'substrand-g6-kisw-u1',
    lessonId: 'lesson-g6-kisw-u1-l2',
    text: 'Tathmini sentensi hii: "Jitu lile lilibomoa kuta za boma letu." Nomino "jitu" inaingia katika ngeli gani katika muktadha huu wa ukubwa wa jina?',
    options: [
      'LI-YA',
      'A-WA',
      'KI-VI',
      'U-I'
    ],
    correctAnswer: 'LI-YA',
    explanation: 'Majina ya ukubwa yanayoanza na "ji-" au "j-" (kama jitu, jizi, jumba) huchukua upatanisho wa kisarufi wa ngeli ya LI-YA ("Jitu lile lilibomoa... -> Majitu yale yalibomoa...").',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Angalia viambishi "lile" na "lilibomoa". Viambishi hivyo ni vya ngeli gani?'
  },

  // ==========================================
  // Unit 2 Lesson 1: Makala ya Mazingira na Misitu (q-g6-kisw-u2-001 to 012)
  // ==========================================
  {
    id: 'q-g6-kisw-u2-001',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Ni msitu upi wa asili nchini Kenya unaofahamika kama "mnara mkuu wa maji" unaolisha mito mingi ya Bonde la Ufa na Ziwa Victoria?',
    options: [
      'Msitu wa Mau',
      'Msitu wa Karura',
      'Msitu wa Arabuko Sokoke',
      'Msitu wa Kakamega pekee'
    ],
    correctAnswer: 'Msitu wa Mau',
    explanation: 'Msitu wa Mau ndio mnara mkubwa zaidi wa maji nchini Kenya unaolisha mito mikuu zaidi ya kumi na miwili, ikiwemo Mto Mara na Ewaso Ng\'iro.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni msitu upi mkubwa zaidi wa asili nchini Kenya unaojulikana kama mnara wa maji?'
  },
  {
    id: 'q-g6-kisw-u2-002',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Neno "mmomonyoko wa udongo" lina maana gani katika utunzaji wa mazingira?',
    options: [
      'Kupeperushwa au kusombwa kwa tabaka la juu la udongo na upepo au maji',
      'Kuongeza mbolea ya kiasili kwenye shamba',
      'Kupanda mbegu za mahindi ardhini',
      'Kuchimba kisima kirefu cha maji'
    ],
    correctAnswer: 'Kupeperushwa au kusombwa kwa tabaka la juu la udongo na upepo au maji',
    explanation: 'Mmomonyoko wa udongo (soil erosion) hutokea wakati maji ya mvua au upepo mkali unapobeba udongo wenye rutuba kutoka shambani.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Maji ya mafuriko au dhoruba ya upepo inapobeba udongo wenye rutuba, hali hiyo inaitwaje?'
  },
  {
    id: 'q-g6-kisw-u2-003',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Mwanaharakati mashuhuri wa Kenya aliyeshinda Tuzo ya Amani ya Nobel mnamo 2004 kwa kupigania utunzaji wa mazingira ni nani?',
    options: [
      'Profesa Wangari Maathai',
      'Mekatilili wa Menza',
      'Grace Ogot',
      'Margaret Kenyatta'
    ],
    correctAnswer: 'Profesa Wangari Maathai',
    explanation: 'Profesa Wangari Maathai alianzisha vuguvugu la Green Belt Movement na akawa mwanamke wa kwanza Mwafrika kutunukiwa Tuzo ya Amani ya Nobel.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni mama gani shupavu wa Kenya anayeheshimiwa duniani kwa kulinda msitu wa Karura na Uhuru Park?'
  },
  {
    id: 'q-g6-kisw-u2-004',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Ni ipi kati ya hizi iliyo taka inayoweza kuoza na kugeuzwa kuwa mbolea ya kiasili (taka inayooza)?',
    options: [
      'Maganda ya ndizi na mabaki ya mboga',
      'Chupa za plastiki zilizovunjika',
      'Mifuko ya nailoni',
      'Vipande vya mabati kuukuu'
    ],
    correctAnswer: 'Maganda ya ndizi na mabaki ya mboga',
    explanation: 'Maganda ya matunda na mabaki ya mimea huoza haraka ardhini na kuwa mbolea mboji ya kiasili (biodegradable waste).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni vitu vipi vinavyotokana na mimea ambavyo vikioza ardhini huongeza rutuba?'
  },
  {
    id: 'q-g6-kisw-u2-005',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Kamilisha methali ifuatayo inayohusiana na mazingira na uongozi: "Mti mkuu ukigwa, __________."',
    options: [
      'wana wa ndege huyumba',
      'ndege wote hufurahi',
      'matawi hukauka mara moja',
      'miti mingine huanguka pia'
    ],
    correctAnswer: 'wana wa ndege huyumba',
    explanation: 'Methali hii hufundisha kuwa nguzo kuu au kiongozi mkubwa anapoondoka, wale waliokuwa wakimtegemea hukosa usalama na kutaabika.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mti mkubwa unapodondoka ardhini, nini kinachowapata vifaranga vya ndege waliokuwa na viota juu yake?'
  },
  {
    id: 'q-g6-kisw-u2-006',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Ni mbinu gani bora ya kilimo inayosaidia kuzuia mmomonyoko wa udongo katika mashamba yenye miinuko na miteremko?',
    options: [
      'Ujenzi wa matuta na kuta za mawe kandokando ya mteremko',
      'Kukata miti yote ili jua lichome udongo',
      'Kuchoma nyasi na magugu yote kabla ya mvua',
      'Kulima kutoka juu kuelekea chini moja kwa moja'
    ],
    correctAnswer: 'Ujenzi wa matuta na kuta za mawe kandokando ya mteremko',
    explanation: 'Ujenzi wa matuta (terraces/contour farming) na upandaji wa nyasi za kuzuia mmomonyoko hupunguza kasi ya maji ya mvua kwenye miteremko.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni muundo upi wa kuzuia mteremko unaopunguza kasi ya maji ya mvua yanayotiririka mlimani?'
  },
  {
    id: 'q-g6-kisw-u2-007',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Kwa nini plastiki inachukuliwa kuwa adui mkubwa wa mazingira yetu?',
    options: [
      'Kwa sababu haiozi kirahisi na huziba mifereji pamoja na kudhuru mifugo',
      'Kwa sababu ina uzito mkubwa kuliko mawe',
      'Kwa sababu inavuta wanyama wakali kuja kijijini',
      'Kwa sababu inatengenezwa kwa maji safi'
    ],
    correctAnswer: 'Kwa sababu haiozi kirahisi na huziba mifereji pamoja na kudhuru mifugo',
    explanation: 'Plastiki hudumu ardhini kwa mamia ya miaka bila kuoza, huzuia maji kupenya udongoni, huziba mitaro, na ikiwa mifugo wataila huugua au kufa.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, mifuko na chupa za plastiki zinaoza ardhini kama majani, au zinakaa miaka mingi bila kuharibika?'
  },
  {
    id: 'q-g6-kisw-u2-008',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Katika makala ya ufahamu, neno "ikolojia" lina maana gani?',
    options: [
      'Elimu ya uhusiano uliopo kati ya viumbehai na mazingira yao',
      'Ufundi wa kutengeneza vifaa vya kielektroniki',
      'Sheria za kuongoza magari barabarani',
      'Uchumi wa biashara za masoko'
    ],
    correctAnswer: 'Elimu ya uhusiano uliopo kati ya viumbehai na mazingira yao',
    explanation: 'Ikolojia (ecology) ni tawi la sayansi linalochunguza namna viumbehai (mimea, wanyama, binadamu) wanavyotegemeana wao kwa wao na mazingira yao.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni somo gani linaloelezea uhusiano na utegemeano wa viumbehai ndani ya mazingira?'
  },
  {
    id: 'q-g6-kisw-u2-009',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Soma kifungu kifuatacho:\n"Wanakijiji wa Chepalungu walishirikiana kupanda miche elfu hamsini ya miti ya asili kando ya mto. Miaka mitano baadaye, vijito vilivyokuwa vimekauka vilianza kububujika maji baridi tena."\nKifungu hiki kinathibitisha funzo gani kuu?',
    options: [
      'Uhifadhi wa misitu hurejesha vyanzo vya maji na uhai wa mazingira',
      'Miti hukausha mito na vijito shambani',
      'Wanakijiji walipoteza muda wao bila faida',
      'Maji ya mito hayana umuhimu kwa jamii'
    ],
    correctAnswer: 'Uhifadhi wa misitu hurejesha vyanzo vya maji na uhai wa mazingira',
    explanation: 'Kifungu kinaonyesha wazi kwamba upandaji wa miti ya kiasili huokoa na kufufua vyanzo vya maji vilivyokuwa hatarini kutoweka.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni matokeo gani chanya yaliyotokea baada ya wanakijiji kupanda miche ya miti ya kiasili?'
  },
  {
    id: 'q-g6-kisw-u2-010',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Ni neno lipi kati ya haya lenye maana ya "kukausha ardhi kabisa kwa kukosa mvua kwa kipindi kirefu"?',
    options: [
      'Ukame',
      'Mafuriko',
      'Gharika',
      'Kimbunga'
    ],
    correctAnswer: 'Ukame',
    explanation: '"Ukame" ni hali ya upungufu mkubwa wa mvua kwa muda mrefu inayosababisha kukauka kwa vyanzo vya maji na kukauka kwa mimea.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Mvua inapokosa kunyesha kwa muda mrefu sana ardhi hupatwa na maafa gani?'
  },
  {
    id: 'q-g6-kisw-u2-011',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Tofauti kuu kati ya "takataka za kiasili" na "takataka za viwandani" ni ipi?',
    options: [
      'Takataka za kiasili huoza na kugeuka udongo ilhali za viwandani kama chupa na plastiki hudumu bila kuoza',
      'Takataka za viwandani zinaweza kuliwa na mifugo bila madhara yoyote',
      'Takataka za kiasili zinatengenezwa katika viwanda vya ng\'ambo pekee',
      'Hakuna tofauti yoyote kati ya aina hizi mbili za taka'
    ],
    correctAnswer: 'Takataka za kiasili huoza na kugeuka udongo ilhali za viwandani kama chupa na plastiki hudumu bila kuoza',
    explanation: 'Takataka za kiasili (biodegradable) huoza kiasili kwa msaada wa vijidudu ardhini, wakati plastiki na vyuma hudumu mamia ya miaka.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Je, maganda ya mahindi na chupa za plastiki zikizikwa ardhini, kipi kitakachooza haraka?'
  },
  {
    id: 'q-g6-kisw-u2-012',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l1',
    text: 'Methali: "Ukiona vyaelea, vimeundwa." Inatufunza nini kuhusiana na uzuri wa mazingira na misitu tunayoiona leo?',
    options: [
      'Mazingira mazuri na misitu mikubwa yalitunzwa kwa bidii na juhudi za makusudi',
      'Mazingira yanajitegemea bila kuhitaji usaidizi wa mwanadamu',
      'Meli na mashua ndizo zinazotengenezwa na binadamu pekee',
      'Kila kitu kizuri hutokea chenyewe bila kufanyiwa kazi yoyote'
    ],
    correctAnswer: 'Mazingira mazuri na misitu mikubwa yalitunzwa kwa bidii na juhudi za makusudi',
    explanation: 'Methali hii inatukumbusha kuwa maendeleo na uzuri wowote tunaouona unahitaji kazi ngumu, nidhamu na utunzaji makini.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kila jambo lenye mafanikio au urembo lilitokana na kazi gani nyuma ya pazia?'
  },

  // ==========================================
  // Unit 2 Lesson 2: Ngeli za Nomino U-I, U-YA, YA-YA na I-ZI (q-g6-kisw-u2-013 to 024)
  // ==========================================
  {
    id: 'q-g6-kisw-u2-013',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Nomino "mti" na "mto" zimo katika ngeli gani katika Kiswahili sanifu?',
    options: [
      'U-I',
      'A-WA',
      'KI-VI',
      'YA-YA'
    ],
    correctAnswer: 'U-I',
    explanation: 'Nomino za mimea na miti zinazoanza na m- katika umoja na mi- katika wingi huingia katika ngeli ya U-I (Mti umeanguka -> Miti imeanguka).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Sentensi inasema: "Mti umeanguka -> Miti imeanguka". Viambishi hivyo ni vya ngeli gani?'
  },
  {
    id: 'q-g6-kisw-u2-014',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Nomino kama "maji", "maziwa", na "mafuta" huingia katika ngeli gani?',
    options: [
      'YA-YA',
      'LI-YA',
      'U-I',
      'I-ZI'
    ],
    correctAnswer: 'YA-YA',
    explanation: 'Nomino za viowevu na vitu visivyohesabika vinavyoanza na ma- na visivyo na umoja huingia katika ngeli ya YA-YA (Maji yamechemka).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Viowevu hivi havina umoja. Huchukua kiambishi gani: ya- pekee?'
  },
  {
    id: 'q-g6-kisw-u2-015',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Andika sentensi hii katika wingi: "Nyumba hii imejengwa vizuri."',
    options: [
      'Nyumba hizi zimejengwa vizuri.',
      'Manyumba haya yamejengwa vizuri.',
      'Vinyumba hivi vimejengwa vizuri.',
      'Nyumba haya yamejengwa vizuri.'
    ],
    correctAnswer: 'Nyumba hizi zimejengwa vizuri.',
    explanation: 'Nomino "nyumba" imo katika ngeli ya I-ZI. Muundo wa nomino haubadiliki, lakini viambishi vya upatanisho hubadilika kutoka i- hadi zi- ("Nyumba hizi zimejengwa").',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika ngeli ya I-ZI, kiashiria hubadilika kutoka "hii" hadi kipi katika wingi?'
  },
  {
    id: 'q-g6-kisw-u2-016',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Ni sentensi ipi iliyo sahihi ya ngeli ya U-YA katika umoja na wingi?',
    options: [
      'Ua zuri limechanua -> Maua mazuri yamechanua',
      'Ua nzuri imechanua -> Maua mazuri zimechanua',
      'Ua kile kimechanua -> Maua vile vimechanua',
      'Ua huu umechanua -> Maua hii imechanua'
    ],
    correctAnswer: 'Ua zuri limechanua -> Maua mazuri yamechanua',
    explanation: 'Nomino "ua" (flower) huingia katika ngeli ya U-YA (umoja: li-/zuri, wingi: ya-/mazuri): "Ua zuri limechanua -> Maua mazuri yamechanua."',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Tazama nomino "ua" linavyobadilika kuwa "maua" na kuchukua "yamechanua".'
  },
  {
    id: 'q-g6-kisw-u2-017',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha ngeli ya U-I: "Miti mirefu __________ wakati wa dhoruba kali."',
    options: [
      'imeanguka',
      'zimeanguka',
      'yameanguka',
      'vimeanguka'
    ],
    correctAnswer: 'imeanguka',
    explanation: 'Katika ngeli ya U-I wingi (miti), kiambishi cha upatanisho wa kitenzi ni "i-": "Miti mirefu imeanguka."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Wingi wa "Mti umeanguka" katika ngeli ya U-I ni "Miti ..."? Ni kiambishi gani kinachotumika?'
  },
  {
    id: 'q-g6-kisw-u2-018',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Chagua sentensi yenye upatanisho sahihi wa ngeli ya YA-YA:',
    options: [
      'Maziwa freshi yamemwagika mezani.',
      'Maziwa freshi limemwagika mezani.',
      'Maziwa freshi zimemwagika mezani.',
      'Maziwa freshi kimemwagika mezani.'
    ],
    correctAnswer: 'Maziwa freshi yamemwagika mezani.',
    explanation: 'Nomino ya kiowevu "maziwa" imo katika ngeli ya YA-YA na lazima ichukue kiambishi "ya-": "Maziwa yamemwagika."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Katika ngeli ya YA-YA, nomino za majimaji huchukua kiambishi gani mwanzoni mwa kitenzi?'
  },
  {
    id: 'q-g6-kisw-u2-019',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Andika sentensi hii katika umoja: "Kalamu nzuri zimenunuliwa na mwalimu."',
    options: [
      'Kalamu nzuri imenunuliwa na mwalimu.',
      'Kikalamu kizuri kimenunuliwa na mwalimu.',
      'Kalamu nzuri zimenunuliwa na mwalimu.',
      'Kalamu hili limenunuliwa na mwalimu.'
    ],
    correctAnswer: 'Kalamu nzuri imenunuliwa na mwalimu.',
    explanation: 'Katika ngeli ya I-ZI, umoja wa "kalamu ... zimenunuliwa" ni "kalamu ... imenunuliwa".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Kiambishi cha umoja katika ngeli ya I-ZI hubadilika kutoka "zi-" kuwa kipi?'
  },
  {
    id: 'q-g6-kisw-u2-020',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Ni jozi ipi ya nomino ambapo maneno yote mawili yamo katika ngeli ya I-ZI?',
    options: [
      'Nguo na sahani',
      'Mti na ua',
      'Maji na maziwa',
      'Mtoto na kuku'
    ],
    correctAnswer: 'Nguo na sahani',
    explanation: '"Nguo" (nguo hii / nguo hizi) na "sahani" (sahani hii / sahani hizi) zote zimo katika ngeli ya I-ZI.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ni vitu vipi viwili visivyo na uhai ambavyo maumbo yake hayabadiliki katika umoja na wingi?'
  },
  {
    id: 'q-g6-kisw-u2-021',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Bainisha kosa la kisarufi katika sentensi hii: "Mito ile mirefu zinamwagika kwenye Bahari Hindi."',
    options: [
      'Kitenzi kinapaswa kuwa "inamwagika" badala ya "zinamwagika"',
      'Kivumishi "mirefu" kiko katika ngeli ya A-WA',
      'Neno "Bahari" lilipaswa kuwa wingi',
      'Hakuna kosa lolote katika sentensi hiyo'
    ],
    correctAnswer: 'Kitenzi kinapaswa kuwa "inamwagika" badala ya "zinamwagika"',
    explanation: 'Nomino "mito" imo katika ngeli ya U-I wingi, kwa hivyo kiambishi cha upatanisho ni "i-": "Mito inamwagika", na si "zinamwagika".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: '"Mito" ni ngeli ya U-I wingi. Inapaswa kuchukua kiambishi "i-" au "zi-"?'
  },
  {
    id: 'q-g6-kisw-u2-022',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Nomino "ugonjwa" inapoingia katika wingi huwa "magonjwa". Ngeli yake ni ipi?',
    options: [
      'U-YA',
      'U-I',
      'YA-YA',
      'U-ZI'
    ],
    correctAnswer: 'U-YA',
    explanation: 'Nomino zinazoanza na u- katika umoja na ma- katika wingi (ugonjwa/magonjwa, ua/maua) huingia katika ngeli ya U-YA.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Umoja unaanza na u- na wingi unaanza na ma- (ya-). Ngeli hii inaitwaje?'
  },
  {
    id: 'q-g6-kisw-u2-023',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Tunga sentensi sahihi ukitumia nomino "marashi" katika ngeli ya YA-YA:',
    options: [
      'Marashi mazuri haya yananukia vizuri sana.',
      'Marashi mzuri huu unanukia vizuri sana.',
      'Marashi nzuri hizi zinanukia vizuri sana.',
      'Marashi kizuri hiki kinanukia vizuri sana.'
    ],
    correctAnswer: 'Marashi mazuri haya yananukia vizuri sana.',
    explanation: '"Marashi" ni kiowevu kisichohesabika katika ngeli ya YA-YA, kwa hivyo huchukua: "Marashi mazuri haya yananukia vizuri."',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Marashi ni kioevu kisichohesabika. Tumia upatanisho wa viambishi vya "ya-".'
  },
  {
    id: 'q-g6-kisw-u2-024',
    subStrandId: 'substrand-g6-kisw-u2',
    lessonId: 'lesson-g6-kisw-u2-l2',
    text: 'Nomino "mkate" na "mikate" inaingia katika ngeli ya U-I. Chagua sentensi inayoonyesha upatanisho kamili na sanifu wa ngeli hii:',
    options: [
      'Mkate mtamu uliopikwa umeliwa wote.',
      'Mkate mtamu uliopikwa imeliwa yote.',
      'Mkate mtamu lililopikwa limeliwa lote.',
      'Mkate mtamu zilizopikwa zimeliwa zote.'
    ],
    correctAnswer: 'Mkate mtamu uliopikwa umeliwa wote.',
    explanation: 'Katika ngeli ya U-I umoja, kiambishi cha upatanisho ni "u-" (kivumishi cha sifa m-, kirejeshi uliopikwa, kitenzi umeliwa, kivumishi wote).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Angalia upatanisho wa umoja katika ngeli ya U-I: "Mkate mtamu uliopikwa umeliwa wote."'
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
console.log('Batch 1 of Grade 6 Kiswahili Lugha successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
