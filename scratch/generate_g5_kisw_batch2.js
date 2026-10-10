import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 Kiswahili Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-kisw-u3',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Shule Yetu, Masomo na Teknolojia ya Kidijitali (Ngeli ya I-ZI)',
    description: 'Kutambua msamiati wa vifaa vya kidijitali shuleni (tarakilishi, kishikwambi, mtandao, projekta); kuzingatia usalama na maadili mtandaoni; kubainisha nomino za ngeli ya I-ZI (kalamu/kalamu, simu/simu, nyumba/nyumba) na upatanisho wa kisarufi wa I- (umoja) na ZI- (wingi).',
    cbeCompetency: 'Ujuzi wa kidijitali na maadili mtandaoni, utambuzi wa upatanisho wa ngeli ya I-ZI, na mawasiliano fasaha ya shuleni',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g5-kisw-u4',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Kilimo cha Kisasa, Uhifadhi wa Udongo na Hali ya Mazoea (-hu-)',
    description: 'Kusoma kuhusu mbinu za kilimo bora nchini Kenya (umwagiliaji, samadi, upandaji miti ya matunda); kuelewa zana za kilimo; kubainisha matumizi ya hali ya mazoea kwa kiambishi "hu-" (mkulima hulima, mimea hustawi) na kuitumia katika sentensi zenye mtiririko sahihi.',
    cbeCompetency: 'Ufahamu wa kilimo endelevu na uhifadhi wa mazingira, ustadi wa sarufi ya hali ya mazoea (-hu-), na uandishi wa sentensi sahihi',
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
    id: 'lesson-g5-kisw-u3-l1',
    subStrandId: 'substrand-g5-kisw-u3',
    title: 'Msamiati wa Teknolojia ya Kidijitali Shuleni',
    content: 'Dunia ya leo inatumia vifaa vya kidijitali kurahisisha masomo, utafiti, na mawasiliano. Katika shule zetu za Kenya, wanafunzi wanajifunza msamiati maalum wa teknolojia:\n\n1. Vifaa vya Kidijitali Shuleni:\n- Tarakilishi (Kompyuta): Mtambo wa kielektroniki unaohifadhi na kuchakata data na taarifa.\n- Kishikwambi (Tableti): Tarakilishi ndogo ya kushikwa mkononi yenye skrini ya kugusa inayotumiwa na wanafunzi darasani.\n- Kipanya (Mawsi): Kifaa kinachoelekeza kielekezi kwenye kioo cha tarakilishi.\n- Kinanda / Kibodi: Kifaa cha kuchapia herufi na nambari kwenye tarakilishi.\n- Kichapishi (Printa): Mashine inayotoa maandishi au picha kutoka kwenye tarakilishi na kuyachapisha kwenye karatasi.\n- Projekta: Mtambo unaomulika picha na maandishi ukutani au kwenye skrini kubwa kwa ajili ya darasa zima kuona.\n- Mtandao (Intaneti): Mfumo wa mawasiliano ya kielektroniki unaounganisha tarakilishi kote ulimwenguni.\n\n2. Maadili na Usalama Mtandaoni:\n- Kutowapa watu wasiojulikana nenosiri (password) au taarifa za siri za familia.\n- Kutotazama picha au tovuti zisizo na maadili.\n- Kutumia muda maalum wa masomo bila kucheza michezo ya video kupita kiasi.',
    didYouKnow: 'Neno "Kishikwambi" linatokana na maneno mawili ya Kiswahili: "shika" na "kwapa/mkono", kumaanisha kifaa chenye kubebeka kwa urahisi mkononi au kwapani!',
    kenyanContext: 'Kupitia Mpango wa Kitaifa wa Vifaa vya Kidijitali (Kenya Digital Literacy Programme), shule nyingi za msingi kuanzia Turkana hadi Machakos zimepokea vishikwambi vinavyotumiwa kujifunza masomo mbalimbali.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u3-l2',
    subStrandId: 'substrand-g5-kisw-u3',
    title: 'Ngeli ya I-ZI na Upatanisho wa Kisarufi',
    content: 'Ngeli ya I-ZI inajumuisha nomino nyingi ambazo hazibadiliki umbo lake kati ya umoja na wingi (zina umbo moja kwa umoja na wingi), zikiwemo zana, nguo, vifaa vya nyumbani, na nomino nyingi za kigeni:\n\n1. Mifano ya Nomino za Ngeli ya I-ZI:\n- Kalamu (Umoja) -> Kalamu (Wingi)\n- Sahani (Umoja) -> Sahani (Wingi)\n- Nguo (Umoja) -> Nguo (Wingi)\n- Nyumba (Umoja) -> Nyumba (Wingi)\n- Simu (Umoja) -> Simu (Wingi)\n- Ndoo (Umoja) -> Ndoo (Wingi)\n- Tarakilishi (Umoja) -> Tarakilishi (Wingi)\n\n2. Viambishi vya Upatanisho wa Kisarufi:\n- Katika UMOJA, kiambishi cha upatanisho ni "I-": "Kalamu hii imeanguka." "Nyumba nzuri imejengwa."\n- Katika WINGI, kiambishi cha upatanisho ni "ZI-": "Kalamu hizi zimeanguka." "Nyumba nzuri zimejengwa."\n\n3. Vivumishi Viashiria vya Ngeli ya I-ZI:\n- Umoja (Karibu / Mbali): Hii / Ile (Mfano: Sahani hii / Sahani ile).\n- Wingi (Karibu / Mbali): Hizi / Zile (Mfano: Sahani hizi / Sahani zile).',
    didYouKnow: 'Ingawa maneno kama "Simu" na "Kalamu" yanafanana katika umoja na wingi, maneno yanayoandamana nayo (kama "hii/hizi" au "imeanguka/zimeanguka") ndiyo yanayobainisha iwapo ni kimoja au vingi!',
    kenyanContext: 'Mwalimu Mutua wa shule ya msingi ya Kangundo aliwaambia wanafunzi: "Kalamu hii ni ya mwanafunzi mmoja, lakini kalamu zote hizi zilizopo mezani ni za darasa zima."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u4-l1',
    subStrandId: 'substrand-g5-kisw-u4',
    title: 'Kilimo cha Kisasa, Zana na Uhifadhi wa Udongo',
    content: 'Kilimo ndio uti wa mgongo wa uchumi wa Kenya. Wakulima hutumia maarifa ya asili na teknolojia ya kisasa kuzalisha chakula tele na kuhifadhi rutuba ya ardhi:\n\n1. Zana Muhimu za Kilimo:\n- Jembe: Hutumika kulima na kutifua udongo tayari kwa upanzi.\n- Panga: Hutumika kukata matawi, kuvuna miwa, na kufyeka vichaka.\n- Reki: Hutumika kukusanya nyasi kavu, majani, na kulainisha udongo.\n- Uma wa Uma: Hutumika kugeuza samadi na udongo wenye mawe.\n- Kinyunyizio (Bomba la Kupulizia): Hutumika kunyunyizia dawa ya kuua wadudu au magugu.\n\n2. Mbinu za Kilimo cha Kisasa na Uhifadhi wa Ardhi:\n- Kilimo cha Matone (Drip Irrigation): Njia ya kuokoa maji kwa kuyatoneza moja kwa moja kwenye mizizi ya mimea.\n- Matumizi ya Samadi na Mboji: Kuboresha rutuba ya udongo bila kuharibu viumbe hai vya ardhini.\n- Kupanda Miti ya Matunda na Nyasi za Kuzuia Mmomonyoko (Vetiver grass) kwenye miteremko ili kuzuia maji ya mvua yasibomoe mchanga wenye rutuba.',
    didYouKnow: 'Mfumo wa unyunyiziaji maji kwa matone ulisaidia mashamba makubwa ya Naivasha kukuza nyanya na maua ya kusafirisha nchi za nje kwa kutumia kiwango kidogo sana cha maji!',
    kenyanContext: 'Katika kaunti ya Murang\'a na Makueni, vikundi vya wakulima vimejenga matuta na kupanda nyasi za kuzuia mmomonyoko wa udongo ili kuhifadhi mashamba yao ya miembe na maparachichi.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u4-l2',
    subStrandId: 'substrand-g5-kisw-u4',
    title: 'Hali ya Mazoea na Kiambishi "hu-"',
    content: 'Katika sarufi ya Kiswahili, Hali ya Mazoea hutumiwa kueleza matendo yanayofanyika mara kwa mara, tabia za kawaida, kanuni za asili, au desturi zinazodumu bila kufungwa na wakati maalum (uliopita, uliopo, au ujao):\n\n1. Kanuni ya Kiambishi "hu-":\n- Kiambishi "hu-" huwekwa mwanzoni mwa shina la kitenzi.\n- Katika hali ya mazoea, kiambishi nafsi au kiambishi ngeli hakitumiki; kitenzi huanza moja kwa moja na "hu-".\n- Mfano: Mkulima hulima (badala ya anashikilia wakati uliopo).\n- Wanafunzi husoma (inatokea mara kwa mara kama ada na desturi).\n\n2. Mifano ya Sentensi za Hali ya Mazoea:\n- "Jua huchomoza mashariki na kutua magharibi kila siku."\n- "Ng\'ombe hula nyasi na kutoa maziwa safi."\n- "Mvua za vuli hunyesha mwezi wa Oktoba nchini Kenya."\n- "Kuku hutaga mayai asubuhi."\n\n3. Ukanusho wa Hali ya Mazoea:\n- Hali ya mazoea hukanushwa kwa kutumia kikanushi cha wakati uliopo wa mazoea (ha-...-i au hawa-...-i).\n- Mfano: "Mwanafunzi mvivu hasomi kwa bidii." "Ng\'ombe hawali nyama."',
    didYouKnow: 'Hali ya mazoea haibadiliki hata kama mtu anayezungumziwa ni mmoja au wengi: unasema "Kamau huimba vizuri" na vilevile "Watoto huimba vizuri"!',
    kenyanContext: 'Wakulima wa chai huko Kericho na Nandi huamka alfajiri na mapema kwenda kuchuma majani mabichi ya chai kabla ya jua kali.',
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

// 3. Batch 2 Missions (4 missions: orders 106 to 109)
const missionsToAdd = [
  {
    id: 'mission-g5-kisw-u3-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u3',
    lessonId: 'lesson-g5-kisw-u3-l1',
    title: 'Mabingwa wa Teknolojia na Maadili Mtandaoni',
    description: 'Bobea katika msamiati wa vifaa vya kidijitali, tumia tarakilishi na vishikwambi kwa usalama, na dhihirisha maadili ya mawasiliano!',
    order: 106,
    orderIndex: 106,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-dijitali-shujaa',
    badge: { name: 'Shujaa wa Dijitali', icon: 'monitor' },
    questionIds: [
      'q-g5-kisw-u3-001', 'q-g5-kisw-u3-002', 'q-g5-kisw-u3-003', 'q-g5-kisw-u3-004',
      'q-g5-kisw-u3-005', 'q-g5-kisw-u3-006', 'q-g5-kisw-u3-007', 'q-g5-kisw-u3-008',
      'q-g5-kisw-u3-009', 'q-g5-kisw-u3-010', 'q-g5-kisw-u3-011', 'q-g5-kisw-u3-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u3-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u3',
    lessonId: 'lesson-g5-kisw-u3-l2',
    title: 'Umahiri wa Ngeli ya I-ZI na Upatanisho wa Vifaa',
    description: 'Tambua sifa za ngeli ya I-ZI, pambanua umoja (I-) na wingi (ZI-), na thibitisha usahihi wa sentensi za Kiswahili Sanifu!',
    order: 107,
    orderIndex: 107,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ngeli-i-zi',
    badge: { name: 'Mtaalamu wa Ngeli ya I-ZI', icon: 'check-circle' },
    questionIds: [
      'q-g5-kisw-u3-013', 'q-g5-kisw-u3-014', 'q-g5-kisw-u3-015', 'q-g5-kisw-u3-016',
      'q-g5-kisw-u3-017', 'q-g5-kisw-u3-018', 'q-g5-kisw-u3-019', 'q-g5-kisw-u3-020',
      'q-g5-kisw-u3-021', 'q-g5-kisw-u3-022', 'q-g5-kisw-u3-023', 'q-g5-kisw-u3-024'
    ]
  },
  {
    id: 'mission-g5-kisw-u4-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u4',
    lessonId: 'lesson-g5-kisw-u4-l1',
    title: 'Mashujaa wa Kilimo cha Kisasa na Uhifadhi wa Ardhi',
    description: 'Tambua zana sahihi za kilimo, eleza manufaa ya unyunyiziaji wa matone na samadi, na linda ardhi dhidi ya mmomonyoko!',
    order: 108,
    orderIndex: 108,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-kilimo-bora',
    badge: { name: 'Mkulima Stadi wa Kenya', icon: 'feather' },
    questionIds: [
      'q-g5-kisw-u4-001', 'q-g5-kisw-u4-002', 'q-g5-kisw-u4-003', 'q-g5-kisw-u4-004',
      'q-g5-kisw-u4-005', 'q-g5-kisw-u4-006', 'q-g5-kisw-u4-007', 'q-g5-kisw-u4-008',
      'q-g5-kisw-u4-009', 'q-g5-kisw-u4-010', 'q-g5-kisw-u4-011', 'q-g5-kisw-u4-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u4-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u4',
    lessonId: 'lesson-g5-kisw-u4-l2',
    title: 'Ustadi wa Hali ya Mazoea na Kiambishi "hu-"',
    description: 'Jifunze kueleza desturi na kanuni za maumbile ukitumia hali ya mazoea, na jenga sentensi sahihi zisizo na kasoro!',
    order: 109,
    orderIndex: 109,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hali-ya-mazoea',
    badge: { name: 'Bingwa wa Hali ya Mazoea', icon: 'clock' },
    questionIds: [
      'q-g5-kisw-u4-013', 'q-g5-kisw-u4-014', 'q-g5-kisw-u4-015', 'q-g5-kisw-u4-016',
      'q-g5-kisw-u4-017', 'q-g5-kisw-u4-018', 'q-g5-kisw-u4-019', 'q-g5-kisw-u4-020',
      'q-g5-kisw-u4-021', 'q-g5-kisw-u4-022', 'q-g5-kisw-u4-023', 'q-g5-kisw-u4-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 2 Questions (48 questions: 24 for Unit 3, 24 for Unit 4)
const questionsToAdd = [
  // --- Unit 3: Mission 1 (q-g5-kisw-u3-001 to 012) ---
  {
    id: 'q-g5-kisw-u3-001',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni neno lipi la Kiswahili linalotaja mashine au mtambo wa kielektroniki unaohifadhi na kuchakata taarifa (kompyuta)?',
    text: 'Ni neno lipi la Kiswahili linalotaja mashine au mtambo wa kielektroniki unaohifadhi na kuchakata taarifa (kompyuta)?',
    options: [
      'Tarakilishi',
      'Kipanya',
      'Kinanda',
      'Kichapishi'
    ],
    correctAnswer: 'Tarakilishi',
    explanation: '"Tarakilishi" ni neno sanifu la Kiswahili linalomaanisha kompyuta (chombo cha kielektroniki cha kuchakata na kuhifadhi data).',
    socraticHint: 'Ni neno lipi la Kiswahili lenye asili ya tarakimu linalotumiwa kumaanisha kompyuta?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-002',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wanafunzi wa shule za msingi za Kenya walipewa kompyuta ndogo za kushikwa mkononi zenye skrini ya kugusa (tablets). Kifaa hiki huitwaje kwa Kiswahili?',
    text: 'Wanafunzi wa shule za msingi za Kenya walipewa kompyuta ndogo za kushikwa mkononi zenye skrini ya kugusa (tablets). Kifaa hiki huitwaje kwa Kiswahili?',
    options: [
      'Kishikwambi',
      'Kipanya',
      'Projekta',
      'Redio'
    ],
    correctAnswer: 'Kishikwambi',
    explanation: '"Kishikwambi" ni neno sanifu linalotumika kutaja tableti (kifaa cha kidijitali kinachoshikika kwa urahisi mkononi au kwapani).',
    socraticHint: 'Fikiria kifaa kidogo cha kidijitali ambacho unaweza kukishika mikononi kwa urahisi darasani.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-003',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifaa kidogo cha mkononi kinachotumiwa kuelekeza kishale (kielekezi) kwenye kioo cha tarakilishi huitwaje?',
    text: 'Kifaa kidogo cha mkononi kinachotumiwa kuelekeza kishale (kielekezi) kwenye kioo cha tarakilishi huitwaje?',
    options: [
      'Kipanya (mausi)',
      'Kibodi',
      'Kipaza sauti',
      'Diski'
    ],
    correctAnswer: 'Kipanya (mausi)',
    explanation: 'Kifaa hicho huitwa "kipanya" kwa Kiswahili kwa sababu muundo wake unafanana na panya mdogo mwenye mkia (waya).',
    socraticHint: 'Kifaa hiki cha kuelekeza kwenye skrini kimepewa jina la mnyama mdogo.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-004',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifaa chenye vitufe vingi vyenye herufi, nambari, na alama kinachotumiwa kuchapa maandishi kwenye tarakilishi huitwaje?',
    text: 'Kifaa chenye vitufe vingi vyenye herufi, nambari, na alama kinachotumiwa kuchapa maandishi kwenye tarakilishi huitwaje?',
    options: [
      'Kinanda (au Kibodi)',
      'Kichapishi',
      'Skrini',
      'Spika'
    ],
    correctAnswer: 'Kinanda (au Kibodi)',
    explanation: '"Kinanda" (au kibodi) ndicho kifaa chenye vibonyezo vya kuandikia maneno na tarakimu kwenye kompyuta.',
    socraticHint: 'Kifaa hiki kinaitwa jina lilelile la chombo cha muziki chenye vitufe vinavyobonyezwa kwa vidole.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-005',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mwalimu anapotaka picha au video ionekane wazi na kwa ukubwa darasani mzima ukutani, mtambo gani wa kielektroniki hutumiwa?',
    text: 'Mwalimu anapotaka picha au video ionekane wazi na kwa ukubwa darasani mzima ukutani, mtambo gani wa kielektroniki hutumiwa?',
    options: [
      'Projekta (Mtambo wa Kumulika)',
      'Kipanya',
      'Kichapishi',
      'Mawimbi'
    ],
    correctAnswer: 'Projekta (Mtambo wa Kumulika)',
    explanation: 'Projekta hupokea mawimbi na taarifa za kompyuta na kuzimulika kwenye kuta au skrini kubwa ili watu wengi waweze kuona kwa pamoja.',
    socraticHint: 'Ni chombo gani kinachomulika mwanga na picha ukutani mbele ya darasa?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-006',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni tahadhari ipi muhimu ya kiusalama ambayo mwanafunzi anapaswa kuchukua anapotumia intaneti au vifaa vya kidijitali?',
    text: 'Ni tahadhari ipi muhimu ya kiusalama ambayo mwanafunzi anapaswa kuchukua anapotumia intaneti au vifaa vya kidijitali?',
    options: [
      'Kutotoa taarifa binafsi kama nenosiri, jina kamili, au anwani ya nyumbani kwa watu wasiofahamika mtandaoni',
      'Kutumia masaa kumi mfululizo akicheza michezo ya video bila kula',
      'Kukubali kukutana na wageni wanaomtumia ujumbe kwenye mitandao bila kuwaambia wazazi',
      'Kupakua mafaili yoyote bila idhini ya mwalimu au mzazi'
    ],
    correctAnswer: 'Kutotoa taarifa binafsi kama nenosiri, jina kamili, au anwani ya nyumbani kwa watu wasiofahamika mtandaoni',
    explanation: 'Usalama mtandaoni unamtaka mtoto kulinda taarifa zake za kibinafsi na nenosiri ili kuzuia ulaghai na madhara ya kidijitali.',
    socraticHint: 'Ni taarifa gani za siri ambazo hupaswi kamwe kuwapa watu usiowajua mtandaoni?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-007',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Neno "Kichapishi" hufanya kazi gani maalum katika mfumo wa vifaa vya kidijitali shuleni?',
    text: 'Neno "Kichapishi" hufanya kazi gani maalum katika mfumo wa vifaa vya kidijitali shuleni?',
    options: [
      'Kutoa nakala ya karatasi ya maandishi au picha kutoka kwenye tarakilishi',
      'Kupiga picha za video darasani',
      'Kutoa sauti kubwa ya muziki',
      'Kupasha joto chumba cha darasa'
    ],
    correctAnswer: 'Kutoa nakala ya karatasi ya maandishi au picha kutoka kwenye tarakilishi',
    explanation: 'Kichapishi (printa) huchapisha nyaraka za kielektroniki kwenye karatasi halisi kwa ajili ya usomaji na uhifadhi.',
    socraticHint: 'Kichapishi hufanya kazi gani inayohusisha karatasi na wino?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-008',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Neno "Barua pepe" (Barua-pepe au Barua ya kielektroniki) linamaanisha nini katika mawasiliano ya kisasa?',
    text: 'Neno "Barua pepe" (Barua-pepe au Barua ya kielektroniki) linamaanisha nini katika mawasiliano ya kisasa?',
    options: [
      'Ujumbe unaotumwa papo hapo kwa njia ya mtandao kutoka tarakilishi au simu moja hadi nyingine',
      'Barua iliyoandikwa kwa mkono na kusafirishwa kwa njiwa',
      'Barua iliyotiwa kwenye bahasha na kupelekwa posta kwa miguu',
      'Karatasi inayotupwa dirishani ili ipeperushwe na upepo'
    ],
    correctAnswer: 'Ujumbe unaotumwa papo hapo kwa njia ya mtandao kutoka tarakilishi au simu moja hadi nyingine',
    explanation: '"Barua pepe" (e-mail) ni ujumbe wa kidijitali unaosafirishwa haraka na kwa usalama kwa njia ya mtandao wa kielektroniki.',
    socraticHint: 'Neno "pepe" linaashiria wepesi na kasi ya ujumbe unaosafiri kwa njia ya mtandao.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-009',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni tabia gani inayodhihirisha maadili mema ya kidijitali (digital citizenship) mwanafunzi anapowasiliana na wenzake mtandaoni?',
    text: 'Ni tabia gani inayodhihirisha maadili mema ya kidijitali (digital citizenship) mwanafunzi anapowasiliana na wenzake mtandaoni?',
    options: [
      'Kutumia lugha ya heshima, kutotukana, na kutoeneza habari za uongo au uzushi',
      'Kutumia maneno ya dharau na kucheka waliofeli mitihani',
      'Kushiriki picha za aibu za wengine bila idhini yao',
      'Kuingilia akaunti za wenzake bila ruhusa yao'
    ],
    correctAnswer: 'Kutumia lugha ya heshima, kutotukana, na kutoeneza habari za uongo au uzushi',
    explanation: 'Maadili ya kidijitali yanajumuisha kusema ukweli, kuheshimu hisia za wengine, na kutojihusisha na unyanyasaji wa mtandaoni (cyberbullying).',
    socraticHint: 'Lugha ya adabu na ukweli mtandaoni huleta amani na heshima baina ya wanafunzi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-010',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Neno la Kiswahili "Nenosiri" (Password) lina umuhimu gani mkubwa katika kifaa chako cha kishikwambi au akaunti ya masomo?',
    text: 'Neno la Kiswahili "Nenosiri" (Password) lina umuhimu gani mkubwa katika kifaa chako cha kishikwambi au akaunti ya masomo?',
    options: [
      'Kufunga na kulinda taarifa zako ili mtu asiye na ruhusa asipate kuziona au kuziharibu',
      'Kufanya kishikwambi kiwe na rangi nyekundu',
      'Kuhakikisha kifaa hakipungukiwi na betri kamwe',
      'Kufuta kazi zote ulizofanya darasani'
    ],
    correctAnswer: 'Kufunga na kulinda taarifa zako ili mtu asiye na ruhusa asipate kuziona au kuziharibu',
    explanation: 'Nenosiri ni mchanganyiko wa siri wa herufi na nambari unaolinda usalama na faragha ya mtumiaji wa kifaa cha kidijitali.',
    socraticHint: 'Neno "nenosiri" lina maneno mawili: neno na siri. Siri hiyo inalinda nini?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-011',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sehemu gani ya tarakilishi inayomwezesha mtumiaji kuona maandishi, picha na video (monitor / screen)?',
    text: 'Ni sehemu gani ya tarakilishi inayomwezesha mtumiaji kuona maandishi, picha na video (monitor / screen)?',
    options: [
      'Kioo / Skrini',
      'Kipanya',
      'Kibodi',
      'Waya wa umeme'
    ],
    correctAnswer: 'Kioo / Skrini',
    explanation: 'Kioo au skrini ya tarakilishi huonyesha taarifa zote kwa macho ya mtumiaji.',
    socraticHint: 'Sehemu ya runinga au tarakilishi inayotazamwa kwa macho inaitwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-012',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini shule za Kenya zinawahimiza wanafunzi kujifunza kusoma na kuandika kwa kutumia teknolojia ya kidijitali?',
    text: 'Kwanini shule za Kenya zinawahimiza wanafunzi kujifunza kusoma na kuandika kwa kutumia teknolojia ya kidijitali?',
    options: [
      'Kuwaandaa kuwa na ujuzi wa karne ya 21, kufanya utafiti kwa urahisi, na kushindana kimataifa',
      'Ili wanafunzi wasiandike tena vitabuni kwa mikono yao kamwe',
      'Ili walimu wapumzike wasifundishe darasani',
      'Ili kuifanya shule iwe na kelele za michezo ya video'
    ],
    correctAnswer: 'Kuwaandaa kuwa na ujuzi wa karne ya 21, kufanya utafiti kwa urahisi, na kushindana kimataifa',
    explanation: 'Mfumo wa CBC unalenga kukuza umahiri wa kidijitali ili kila mwanafunzi awe na uwezo wa kutafiti maarifa mapya na kutatua changamoto za kijamii.',
    socraticHint: 'Ujuzi wa teknolojia unamsaidia vipi mwanafunzi kufaulu katika ulimwengu wa sasa na ujao?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },

  // --- Unit 3: Mission 2 (q-g5-kisw-u3-013 to 024) ---
  {
    id: 'q-g5-kisw-u3-013',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino kama vile "Kalamu", "Sahani", "Nyumba", na "Nguo" huingia katika ngeli gani ya Kiswahili?',
    text: 'Nomino kama vile "Kalamu", "Sahani", "Nyumba", na "Nguo" huingia katika ngeli gani ya Kiswahili?',
    options: [
      'Ngeli ya I - ZI',
      'Ngeli ya A - WA',
      'Ngeli ya U - I',
      'Ngeli ya KI - VI'
    ],
    correctAnswer: 'Ngeli ya I - ZI',
    explanation: 'Nomino za ngeli ya I-ZI zina umbo moja katika umoja na wingi (kalamu moja / kalamu kumi), na huchukua upatanisho wa "I-" umoja na "ZI-" wingi.',
    socraticHint: 'Nomino hizi hazibadiliki katika umoja na wingi. Zinafuata upatanisho wa: kalamu hii imeanguka / kalamu hizi zimeanguka.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-014',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua wingi sahihi wa sentensi ifuatayo ya ngeli ya I-ZI: "Simu mpya imenunuliwa na mzazi."',
    text: 'Chagua wingi sahihi wa sentensi ifuatayo ya ngeli ya I-ZI: "Simu mpya imenunuliwa na mzazi."',
    options: [
      'Simu mpya zimenunuliwa na mzazi.',
      'Masimu mapya yamenunuliwa na mzazi.',
      'Visimu vipya vimenunuliwa na mzazi.',
      'Simu mpya wamenunuliwa na mzazi.'
    ],
    correctAnswer: 'Simu mpya zimenunuliwa na mzazi.',
    explanation: 'Katika ngeli ya I-ZI, nomino "simu" haibadiliki umbo lake, lakini kiambishi cha upatanisho cha kitenzi hubadilika kutoka "i-" (imenunuliwa) hadi "zi-" (zimenunuliwa).',
    socraticHint: 'Katika ngeli ya I-ZI wingi, kitenzi huanza na "zi-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-015',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha ngeli ya I-ZI katika umoja: "Nyumba yetu ____mejengwa vizuri sana."',
    text: 'Kamilisha sentensi ifuatayo kwa kiambishi sahihi cha ngeli ya I-ZI katika umoja: "Nyumba yetu ____mejengwa vizuri sana."',
    options: [
      'i-',
      'zi-',
      'li-',
      'u-'
    ],
    correctAnswer: 'i-',
    explanation: 'Katika umoja wa ngeli ya I-ZI, kiambishi cha upatanisho cha kitenzi ni "i-": "Nyumba yetu imejengwa vizuri sana."',
    socraticHint: 'Nyumba moja: imejengwa au zimejengwa?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-016',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi gani la nomino ambalo maneno YOTE yamo katika ngeli ya I-ZI?',
    text: 'Ni kundi gani la nomino ambalo maneno YOTE yamo katika ngeli ya I-ZI?',
    options: [
      'Chaki, saa, kofia, ngoma, bendera',
      'Kiti, kitabu, chandarua, kikombe, kijiko',
      'Mti, mkate, mto, mguu, mpira',
      'Jicho, jino, duka, gari, taa'
    ],
    correctAnswer: 'Chaki, saa, kofia, ngoma, bendera',
    explanation: 'Nomino zote hizi hazibadiliki katika wingi (saa moja / saa tano, ngoma moja / ngoma mbili) na huchukua upatanisho wa I-ZI.',
    socraticHint: 'Tafuta nomino ambazo umbo lake la umoja linafanana kabisa na umbo lake la wingi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-017',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua kionyeshi cha karibu cha wingi kinacholingana na nomino ya ngeli ya I-ZI: "Nguo _______ zimefuliwa na kuanikwa."',
    text: 'Chagua kionyeshi cha karibu cha wingi kinacholingana na nomino ya ngeli ya I-ZI: "Nguo _______ zimefuliwa na kuanikwa."',
    options: [
      'hizi',
      'hii',
      'hivi',
      'haya'
    ],
    correctAnswer: 'hizi',
    explanation: 'Katika wingi wa ngeli ya I-ZI, kionyeshi cha karibu ni "hizi" (mfano: nguo hizi, kalamu hizi).',
    socraticHint: 'Kionyeshi cha wingi wa ngeli ya I-ZI huanza na "hi-" na kuishia na "-zi".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-018',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi iliyo na upatanisho SAHIHI wa kivumishi cha idadi katika ngeli ya I-ZI wingi?',
    text: 'Ni sentensi ipi iliyo na upatanisho SAHIHI wa kivumishi cha idadi katika ngeli ya I-ZI wingi?',
    options: [
      'Mwalimu alinunua kalamu nne kwa ajili ya darasa.',
      'Mwalimu alinunua kalamu vinne kwa ajili ya darasa.',
      'Mwalimu alinunua kalamu wanne kwa ajili ya darasa.',
      'Mwalimu alinunua kalamu manne kwa ajili ya darasa.'
    ],
    correctAnswer: 'Mwalimu alinunua kalamu nne kwa ajili ya darasa.',
    explanation: 'Kivumishi cha idadi cha shina "-ne" huchukua kiambishi "n-" katika ngeli ya I-ZI wingi na kuwa "nne" (kalamu nne, nyumba nne).',
    socraticHint: 'Katika ngeli ya I-ZI, nambari nne inabaki kuwa "nne".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-019',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua kionyeshi cha mbali katika umoja wa ngeli ya I-ZI: "Bendera _______ inayopepea kileleni mwa mlima ni ya Kenya."',
    text: 'Chagua kionyeshi cha mbali katika umoja wa ngeli ya I-ZI: "Bendera _______ inayopepea kileleni mwa mlima ni ya Kenya."',
    options: [
      'ile',
      'zile',
      'yule',
      'kile'
    ],
    correctAnswer: 'ile',
    explanation: 'Kionyeshi cha mbali katika umoja wa ngeli ya I-ZI ni "ile" (mfano: bendera ile, nyumba ile).',
    socraticHint: 'Kitu cha ngeli ya I-ZI kikiwa mbali katika umoja unasema: bendera ile au bendera kile?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-020',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Bainisha sentensi ambayo ina kasoro (kosa) ya upatanisho wa kisarufi katika ngeli ya I-ZI:',
    text: 'Bainisha sentensi ambayo ina kasoro (kosa) ya upatanisho wa kisarufi katika ngeli ya I-ZI:',
    options: [
      'Kofia hizi zangu imepotea jana jioni.',
      'Kofia hizi zangu zimepotea jana jioni.',
      'Kofia hii yangu imepotea jana jioni.',
      'Kofia zote nzuri zimehifadhiwa kabatini.'
    ],
    correctAnswer: 'Kofia hizi zangu imepotea jana jioni.',
    explanation: 'Sentensi "Kofia hizi zangu imepotea" ina kosa kwa sababu kionyeshi "hizi zangu" ni wingi lakini kitenzi "imepotea" kimetumia kiambishi cha umoja "i-" badala ya "zi-".',
    socraticHint: 'Tafuta sentensi inayochanganya viambishi vya wingi (hizi zangu) na kitenzi cha umoja (imepotea).',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-021',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kivumishi cha sifa "-refu" kinapopatanishwa na nomino "Kamba" katika umoja wa ngeli ya I-ZI, huwa neno gani?',
    text: 'Kivumishi cha sifa "-refu" kinapopatanishwa na nomino "Kamba" katika umoja wa ngeli ya I-ZI, huwa neno gani?',
    options: [
      'ndefu',
      'mrefu',
      'kirefu',
      'lirefu'
    ],
    correctAnswer: 'ndefu',
    explanation: 'Katika ngeli ya I-ZI, sauti ya herufi "r" mbele ya kiambishi cha pua "n-" hubadilika kuwa "d", hivyo "-refu" inakuwa "ndefu" (kamba ndefu, njia ndefu).',
    socraticHint: 'Katika Kiswahili, kamba inayozidi urefu inaitwa: kamba ndefu au kamba mrefu?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-022',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi: "Sahani _______ zilizovunjika zilitupwa nje kwenye pipa."',
    text: 'Kamilisha sentensi: "Sahani _______ zilizovunjika zilitupwa nje kwenye pipa."',
    options: [
      'zile',
      'lile',
      'yale',
      'wale'
    ],
    correctAnswer: 'zile',
    explanation: 'Kiashiria cha mbali cha wingi katika ngeli ya I-ZI ni "zile" (sahani zile zilizovunjika).',
    socraticHint: 'Tazama kiambishi cha kirejeshi "zilizovunjika": kionyeshi cha mbali lazima kiwe kipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-023',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni nini umoja wa sentensi hii ya ngeli ya I-ZI: "Ndoo kubwa zimejaa maji safi"?',
    text: 'Ni nini umoja wa sentensi hii ya ngeli ya I-ZI: "Ndoo kubwa zimejaa maji safi"?',
    options: [
      'Ndoo kubwa imejaa maji safi.',
      'Kindoo kikubwa kimejaa maji safi.',
      'Ndoo kubwa limejaa maji safi.',
      'Lundoo kubwa yamejaa maji safi.'
    ],
    correctAnswer: 'Ndoo kubwa imejaa maji safi.',
    explanation: 'Katika umoja wa ngeli ya I-ZI, neno "ndoo" na "kubwa" yanabaki vilevile, lakini kiambishi cha kitenzi kinakuwa "i-" ("imejaa").',
    socraticHint: 'Nomino na kivumishi havibadiliki umbo lake, ni kiambishi cha kitenzi tu kinachobadilika kutoka "zi-" kwenda "i-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },
  {
    id: 'q-g5-kisw-u3-024',
    subStrandId: 'substrand-g5-kisw-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nomino za vifaa vya kigeni kama vile "Kompyuta", "Redio", na "Televisheni" huainishwa katika ngeli gani?',
    text: 'Nomino za vifaa vya kigeni kama vile "Kompyuta", "Redio", na "Televisheni" huainishwa katika ngeli gani?',
    options: [
      'Ngeli ya I - ZI',
      'Ngeli ya U - I',
      'Ngeli ya YA - YA',
      'Ngeli ya KU'
    ],
    correctAnswer: 'Ngeli ya I - ZI',
    explanation: 'Nomino nyingi za kigeni zinazoingizwa katika lugha ya Kiswahili ambazo hazina viambishi awali vya ngeli nyingine hupokelewa katika ngeli ya I-ZI.',
    socraticHint: 'Je, kompyuta moja inasemekana "kompyuta hii" na nyingi "kompyuta hizi"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U3'
  },

  // --- Unit 4: Mission 1 (q-g5-kisw-u4-001 to 012) ---
  {
    id: 'q-g5-kisw-u4-001',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni zana ipi ya kilimo inayotumiwa kutifua ardhi, kuchimba mashimo ya upanzi, na kupalilia magugu shambani?',
    text: 'Ni zana ipi ya kilimo inayotumiwa kutifua ardhi, kuchimba mashimo ya upanzi, na kupalilia magugu shambani?',
    options: [
      'Jembe',
      'Reki',
      'Panga',
      'Kikapu'
    ],
    correctAnswer: 'Jembe',
    explanation: 'Jembe ndiyo zana kuu ya mkono inayotumiwa na mkulima kutifua udongo mgumu na kuchimba mashimo ya mbegu.',
    socraticHint: 'Ni chombo gani chenye ubao wa chuma na mpini wa mti kinachotumiwa kuchimbia udongo?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-002',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Zana ya kilimo yenye meno ya chuma inayotumiwa kukusanya majani makavu na kusawazisha udongo baada ya kulima huitwaje?',
    text: 'Zana ya kilimo yenye meno ya chuma inayotumiwa kukusanya majani makavu na kusawazisha udongo baada ya kulima huitwaje?',
    options: [
      'Reki',
      'Panga',
      'Shoka',
      'Kigorigori'
    ],
    correctAnswer: 'Reki',
    explanation: 'Reki (rake) hutumika kukusanya taka na majani shambani na kulainisha udongo kwa meno yake.',
    socraticHint: 'Ni zana gani yenye meno ya chuma inayofanana na chanuo kubwa?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-003',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mbinu ya kilimo cha kisasa ambapo maji hutolewa kupitia mipira midogo na kutonea kwenye mizizi ya mmea moja kwa moja huitwaje?',
    text: 'Mbinu ya kilimo cha kisasa ambapo maji hutolewa kupitia mipira midogo na kutonea kwenye mizizi ya mmea moja kwa moja huitwaje?',
    options: [
      'Kilimo cha unyunyiziaji wa matone (Drip irrigation)',
      'Kilimo cha kufurika maji',
      'Kilimo cha kubahatisha mvua',
      'Kilimo cha kuchoma misitu'
    ],
    correctAnswer: 'Kilimo cha unyunyiziaji wa matone (Drip irrigation)',
    explanation: 'Unyunyiziaji wa matone huokoa maji mengi kwa sababu maji yanafikishwa moja kwa moja kwenye mizizi bila kupotea hewani au kando ya mmea.',
    socraticHint: 'Njia hii inaitwa unyunyiziaji wa matone kwa sababu maji yanatoka tone kwa tone.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-004',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wakulima hupata faida gani kubwa wanapotumia mbolea ya samadi (kinyesi cha ng\'ombe na mbuzi) badala ya kemikali hatari?',
    text: 'Wakulima hupata faida gani kubwa wanapotumia mbolea ya samadi (kinyesi cha ng\'ombe na mbuzi) badala ya kemikali hatari?',
    options: [
      'Huboresha rutuba ya udongo kiasili, huongeza uwezo wa udongo kushika maji, na hailishi wadudu wazuri wa ardhini sumu',
      'Hukausha mimea mara moja na kufanya ardhi iwe na changarawe',
      'Hupunguza mazao ya shambani kwa kiwango kikubwa',
      'Hufanya udongo usiweze kumeza mbegu za mazao'
    ],
    correctAnswer: 'Huboresha rutuba ya udongo kiasili, huongeza uwezo wa udongo kushika maji, na hailishi wadudu wazuri wa ardhini sumu',
    explanation: 'Samadi ni mbolea ya asili (organic) inayorutubisha ardhi bila kuiharibu kemikali, na inasaidia udongo kubaki na unyevunyevu.',
    socraticHint: 'Mbolea ya asili ya mifugo hufanya udongo uwe na rutuba bora na salama kwa mazingira.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-005',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni njia ipi bora inayotumiwa na wakulima wa Kenya kuzuia mmomonyoko wa udongo kwenye mashamba yaliyo kwenye miteremko ya milima?',
    text: 'Ni njia ipi bora inayotumiwa na wakulima wa Kenya kuzuia mmomonyoko wa udongo kwenye mashamba yaliyo kwenye miteremko ya milima?',
    options: [
      'Kujenga matuta, kupanda nyasi za vetiver, na kupanda miti inayoshikilia udongo',
      'Kukata miti yote na kuchoma nyasi zote moto',
      'Kulima mlima kuelekea chini kutoka juu hadi bondeni',
      'Kuacha wanyama wengi wachunge kwenye mteremko hadi ardhi ibaki wazi'
    ],
    correctAnswer: 'Kujenga matuta, kupanda nyasi za vetiver, na kupanda miti inayoshikilia udongo',
    explanation: 'Mizizi ya miti na nyasi pamoja na matuta huzuia kasi ya maji ya mvua na kuzuia ardhi yenye rutuba isisombwe kuelekea bondeni.',
    socraticHint: 'Mizizi ya mimea na matuta huzuia maji ya mvua kubeba udongo.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-006',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifaa chenye tanki kinachobebwa mgongoni na pampu ya mkono kinachotumiwa kupulizia dawa shambani huitwaje kwa Kiswahili?',
    text: 'Kifaa chenye tanki kinachobebwa mgongoni na pampu ya mkono kinachotumiwa kupulizia dawa shambani huitwaje kwa Kiswahili?',
    options: [
      'Kinyunyizio / Bomba la kupulizia (knapsack sprayer)',
      'Kigorigori',
      'Koleo',
      'Msumeno'
    ],
    correctAnswer: 'Kinyunyizio / Bomba la kupulizia (knapsack sprayer)',
    explanation: 'Kinyunyizio hubeba maji ya dawa na kuyapuliza kwa mfumo wa ukungu mwepesi juu ya mimea kudhibiti wadudu au maradhi.',
    socraticHint: 'Chombo hiki kinatumiwa kunyunyizia maji ya dawa kwenye majani.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-007',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kufunika ardhi kwa nyasi kavu au majani karibu na mashina ya mimea ili kuzuia maji yasipotee kwa jua huitwaje?',
    text: 'Kufunika ardhi kwa nyasi kavu au majani karibu na mashina ya mimea ili kuzuia maji yasipotee kwa jua huitwaje?',
    options: [
      'Kutandaza majani / Tandazo (Mulching)',
      'Kupalilia magugu',
      'Kuvuna mazao',
      'Kupogoa matawi'
    ],
    correctAnswer: 'Kutandaza majani / Tandazo (Mulching)',
    explanation: 'Tandazo (mulch) huhifadhi unyevu ardhini, huzuia jua kukausha udongo, na huzuia magugu yasiote kwa kasi.',
    socraticHint: 'Kitendo hiki kinahusisha kutandaza majani makavu juu ya udongo.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-008',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini wakulima wanashauriwa kubadilisha aina ya mazao wanayopanda katika shamba moja kila msimu (Crop rotation)?',
    text: 'Kwanini wakulima wanashauriwa kubadilisha aina ya mazao wanayopanda katika shamba moja kila msimu (Crop rotation)?',
    options: [
      'Kuvunja mzunguko wa wadudu waharibifu na kurutubisha ardhi kwa madini tofauti',
      'Ili shamba liwe na rangi tofauti kila mwezi za kupendeza watalii',
      'Kuhakikisha shamba linapata maji ya mvua zaidi',
      'Ili kuzuia jua lisichomoze shambani'
    ],
    correctAnswer: 'Kuvunja mzunguko wa wadudu waharibifu na kurutubisha ardhi kwa madini tofauti',
    explanation: 'Mzunguko wa mazao huzuia wadudu na magonjwa yanayoshambulia zao moja yasijirudie, na mimea ya mikunde huongeza nitrojeni kwenye udongo.',
    socraticHint: 'Kubadilisha mazao huzuia wadudu wasizaliane mfululizo na huboresha madini ya ardhi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-009',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Zana ya kilimo inayotumiwa kukata nyasi ndefu, kufyeka kichaka, na kukata matawi madogo huitwaje?',
    text: 'Zana ya kilimo inayotumiwa kukata nyasi ndefu, kufyeka kichaka, na kukata matawi madogo huitwaje?',
    options: [
      'Panga',
      'Uma wa bustani',
      'Mwiko',
      'Sindano'
    ],
    correctAnswer: 'Panga',
    explanation: 'Panga ni kifaa chenye makali makali kinachotumiwa kufyeka majani na kukata matawi.',
    socraticHint: 'Chombo cha kukatia chenye makali marefu ya chuma kinachotumiwa kufyeka vichaka.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-010',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni zao gani la kibiashara nchini Kenya linalolimwa sana kwenye maeneo ya miinuko yenye baridi kama vile Kericho na Murang\'a?',
    text: 'Ni zao gani la kibiashara nchini Kenya linalolimwa sana kwenye maeneo ya miinuko yenye baridi kama vile Kericho na Murang\'a?',
    options: [
      'Chai',
      'Nazi',
      'Pamba',
      'Mkonge'
    ],
    correctAnswer: 'Chai',
    explanation: 'Chai hustawi kwenye ardhi yenye mwinuko na hali ya hewa ya baridi na mvua nyingi kama vile Kericho, Nandi, na Nyeri.',
    socraticHint: 'Kinywaji kikuu cha moto kinachotokana na majani mabichi ya kijani kinacholimwa Kericho ni kipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-011',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mkulima anapokusanya masalio ya jikoni, maganda ya matunda, na majani na kuyaweka kwenye shimo ili yaoze, anatengeneza mbolea gani?',
    text: 'Mkulima anapokusanya masalio ya jikoni, maganda ya matunda, na majani na kuyaweka kwenye shimo ili yaoze, anatengeneza mbolea gani?',
    options: [
      'Mbolea ya mboji (compost)',
      'Mbolea ya kemikali',
      'Mbolea ya chumvi',
      'Plastiki'
    ],
    correctAnswer: 'Mbolea ya mboji (compost)',
    explanation: 'Mboji (compost) ni mbolea ya asili inayotokana na kuoza kwa mimea, mabaki ya vyakula, na majani yaliyoozeshwa kwa uangalifu.',
    socraticHint: 'Mbolea inayotokana na mabaki ya mimea na vyakula vinavyooza kwenye shimo inaitwaje?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-012',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili inayowahimiza watu kufanya kazi ya ukulima kwa bidii: "Mcheza kwao hutuzwa, na asiyefanya kazi _______."',
    text: 'Kamilisha methali ya Kiswahili inayowahimiza watu kufanya kazi ya ukulima kwa bidii: "Mcheza kwao hutuzwa, na asiyefanya kazi _______."',
    options: [
      'hali (hapati chakula)',
      'hulala fofofo',
      'hupewa zawadi',
      'hucheka sana'
    ],
    correctAnswer: 'hali (hapati chakula)',
    explanation: 'Methali "Asiyefanya kazi, na asile" inafundisha kuwa bidii ya kazi ndiyo inayomwezesha binadamu kupata chakula na riziki.',
    socraticHint: 'Mtu asiyefanya kazi au asiyelima shambani hapati nafasi ya kufanya nini mezani?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },

  // --- Unit 4: Mission 2 (q-g5-kisw-u4-013 to 024) ---
  {
    id: 'q-g5-kisw-u4-013',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Katika sarufi ya Kiswahili, kiambishi kipi cha pekee kinachotumiwa kueleza HALI YA MAZOEA (kitendo kinachotendeka mara kwa mara au kawaida)?',
    text: 'Katika sarufi ya Kiswahili, kiambishi kipi cha pekee kinachotumiwa kueleza HALI YA MAZOEA (kitendo kinachotendeka mara kwa mara au kawaida)?',
    options: [
      'hu-',
      'me-',
      'li-',
      'ta-'
    ],
    correctAnswer: 'hu-',
    explanation: 'Kiambishi "hu-" huwekwa mwanzoni mwa kitenzi kuonyesha hali ya mazoea, tabia ya daima, au sheria ya asili (mfano: hulima, husoma, hula).',
    socraticHint: 'Tazama viambishi: mkulima hu-lima, jua hu-chomoza. Ni kiambishi gani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-014',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi kati ya zifuatazo iliyo katika HALI YA MAZOEA?',
    text: 'Ni sentensi ipi kati ya zifuatazo iliyo katika HALI YA MAZOEA?',
    options: [
      'Wanafunzi wenye bidii huamka mapema kusoma vitabu vyao.',
      'Wanafunzi wataamka kesho asubuhi kusoma vitabu vyao.',
      'Wanafunzi waliamka jana asubuhi kusoma vitabu vyao.',
      'Wanafunzi wanaamka sasa hivi kusoma vitabu vyao.'
    ],
    correctAnswer: 'Wanafunzi wenye bidii huamka mapema kusoma vitabu vyao.',
    explanation: 'Kitenzi "huamka" (hu-amka) kiko katika hali ya mazoea, kikionyesha tabia inayotendeka kila siku kama kawaida.',
    socraticHint: 'Tafuta kitenzi kinachoanza na kiambishi "hu-" kinachoeleza tabia ya kila siku.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-015',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Badilisha sentensi ifuatayo kutoka wakati uliopo na kuiweka katika hali ya mazoea: "Mvua inanyesha mwezi wa Aprili."',
    text: 'Badilisha sentensi ifuatayo kutoka wakati uliopo na kuiweka katika hali ya mazoea: "Mvua inanyesha mwezi wa Aprili."',
    options: [
      'Mvua hunyesha mwezi wa Aprili.',
      'Mvua ilinyesha mwezi wa Aprili.',
      'Mvua itanyesha mwezi wa Aprili.',
      'Mvua imekuwa ikinyesha mwezi wa Aprili.'
    ],
    correctAnswer: 'Mvua hunyesha mwezi wa Aprili.',
    explanation: 'Katika hali ya mazoea, kiambishi cha wakati na nafsi "ina-" kinaondolewa na nafasi yake inachukuliwa na "hu-": "Mvua hunyesha."',
    socraticHint: 'Badilisha "inanyesha" iwe na kiambishi cha desturi "hu-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-016',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tofauti kubwa ya kisarufi kati ya hali ya mazoea na nyakati nyingine (kama wakati uliopita au uliopo) ni ipi?',
    text: 'Tofauti kubwa ya kisarufi kati ya hali ya mazoea na nyakati nyingine (kama wakati uliopita au uliopo) ni ipi?',
    options: [
      'Hali ya mazoea haitumi viambishi awali vya ngeli au nafsi; kitenzi huanza moja kwa moja na "hu-" kwa majina yote',
      'Hali ya mazoea inatumiwa kwa vitu visivyo na uhai pekee',
      'Hali ya mazoea inabadilika kulingana na umoja na wingi wa nomino',
      'Hali ya mazoea haiwezi kutumika katika sentensi zenye vitenzi'
    ],
    correctAnswer: 'Hali ya mazoea haitumi viambishi awali vya ngeli au nafsi; kitenzi huanza moja kwa moja na "hu-" kwa majina yote',
    explanation: 'Katika hali ya mazoea, kiambishi "hu-" hakibadiliki bila kujali nafsi au ngeli: "Mimi hula, yeye hula, wao hula, ng\'ombe hula."',
    socraticHint: 'Je, kiambishi "hu-" kinabadilika unapozungumzia mtu mmoja au watu wengi?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-017',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi hii ya ukweli wa kimaumbile kwa kitenzi sahihi cha hali ya mazoea: "Ndege _______ angani kwa kutumia mabawa yao."',
    text: 'Kamilisha sentensi hii ya ukweli wa kimaumbile kwa kitenzi sahihi cha hali ya mazoea: "Ndege _______ angani kwa kutumia mabawa yao."',
    options: [
      'huruka',
      'waliruka',
      'wataruka',
      'wameruka'
    ],
    correctAnswer: 'huruka',
    explanation: 'Kuruka angani ni uwezo wa asili na tabia ya daima ya ndege, hivyo kitenzi sahihi ni "huruka" (hu-ruka).',
    socraticHint: 'Ndege wana desturi ya asili ya kuruka angani. Kitenzi cha mazoea ni kipi?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-018',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ukanusho wa sentensi ya hali ya mazoea "Mwanafunzi mtiifu husoma kwa bidii" ni upi?',
    text: 'Ukanusho wa sentensi ya hali ya mazoea "Mwanafunzi mtiifu husoma kwa bidii" ni upi?',
    options: [
      'Mwanafunzi mtiifu hasomi kwa bidii.',
      'Mwanafunzi mtiifu hakusoma kwa bidii.',
      'Mwanafunzi mtiifu hatasoma kwa bidii.',
      'Mwanafunzi mtiifu hajasoma kwa bidii.'
    ],
    correctAnswer: 'Mwanafunzi mtiifu hasomi kwa bidii.',
    explanation: 'Hali ya mazoea hukanushwa kwa kutumia muundo wa ukanusho wa wakati uliopo wa mazoea (ha-...-i): "husoma" -> "hasomi".',
    socraticHint: 'Kinyume au kukanusha "husoma" katika tabia ya kila siku ni "hasomi".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-019',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi gani kati ya vifuatavyo ambacho KIKO katika hali ya mazoea?',
    text: 'Kitenzi gani kati ya vifuatavyo ambacho KIKO katika hali ya mazoea?',
    options: [
      'Hulima',
      'Alilima',
      'Atalima',
      'Amelima'
    ],
    correctAnswer: 'Hulima',
    explanation: '"Hulima" ni kitenzi cha hali ya mazoea (hu + lima), kuonyesha tabia ya mkulima kulima mara kwa mara.',
    socraticHint: 'Tafuta kitenzi chenye kiambishi cha mazoea "hu-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-020',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Soma sentensi hii: "Babu hutuadhibia hadithi za kupendeza za wanyama jioni." Sentensi hii inaeleza nini?',
    text: 'Soma sentensi hii: "Babu hutuadhibia hadithi za kupendeza za wanyama jioni." Sentensi hii inaeleza nini?',
    options: [
      'Desturi au kawaida ya babu kusimulia hadithi kila jioni',
      'Tukio lililofanyika jana pekee na halitarudiwa tena',
      'Mpango utakaofanyika mwaka ujao tu',
      'Jambo ambalo halijawahi kutendeka kabisa'
    ],
    correctAnswer: 'Desturi au kawaida ya babu kusimulia hadithi kila jioni',
    explanation: 'Kitenzi chenye "hu-" kinamaanisha jambo hilo ni ada, tabia, au desturi inayotendeka mara kwa mara.',
    socraticHint: 'Neno linaloanza na "hu-" linadokeza jambo la kawaida linalofanyika mara kwa mara.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-021',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi: "Mimea ya shambani _______ mvua inaponyesha kwa wingi."',
    text: 'Kamilisha sentensi: "Mimea ya shambani _______ mvua inaponyesha kwa wingi."',
    options: [
      'hustawi',
      'yalistawi',
      'watastawi',
      'imestawi'
    ],
    correctAnswer: 'hustawi',
    explanation: '"Hustawi" (hu-stawi) inaonyesha matokeo ya kawaida ya kimaumbile: kila mara mvua inaponyesha, mimea hustawi.',
    socraticHint: 'Kitenzi cha hali ya kawaida ya kimaumbile huanza na kiambishi "hu-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-022',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi ifuatayo inayoeleza kanuni ya kisayansi kwa kutumia hali ya mazoea ya Kiswahili?',
    text: 'Ni sentensi ipi ifuatayo inayoeleza kanuni ya kisayansi kwa kutumia hali ya mazoea ya Kiswahili?',
    options: [
      'Maji huchemka yanapofikia nyuzi joto mia moja (100°C).',
      'Maji yalichemka jana asubuhi kwenye birika.',
      'Maji yatachemka iwapo utawasha moto baadaye.',
      'Maji yanachemka sasa hivi jikoni.'
    ],
    correctAnswer: 'Maji huchemka yanapofikia nyuzi joto mia moja (100°C).',
    explanation: 'Kanuni za sayansi na sheria za maumbile huelezwa kwa hali ya mazoea ("huchemka") kwa sababu ni kweli wakati wote.',
    socraticHint: 'Kanuni za asili zisizobadilika huelezwa kwa kitenzi chenye kiambishi "hu-".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-023',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chagua ukanusho sahihi wa sentensi: "Ng\'ombe hula nyasi shambani."',
    text: 'Chagua ukanusho sahihi wa sentensi: "Ng\'ombe hula nyasi shambani."',
    options: [
      'Ng\'ombe hawali nyasi shambani.',
      'Ng\'ombe hawakula nyasi shambani.',
      'Ng\'ombe hawatakula nyasi shambani.',
      'Ng\'ombe hawajala nyasi shambani.'
    ],
    correctAnswer: 'Ng\'ombe hawali nyasi shambani.',
    explanation: 'Katika wingi wa hali ya mazoea (ng\'ombe wa ngeli ya A-WA wingi), ukanusho unakuwa "hawali" (hawa + l + i).',
    socraticHint: 'Ukanusho wa desturi kwa kundi la wanyama (A-WA wingi) huanza na "hawa-" na kuishia na "-i".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
  },
  {
    id: 'q-g5-kisw-u4-024',
    subStrandId: 'substrand-g5-kisw-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kundi gani la vitenzi ambalo VYOTE viko katika hali ya mazoea?',
    text: 'Ni kundi gani la vitenzi ambalo VYOTE viko katika hali ya mazoea?',
    options: [
      'Hucheza, huimba, hupika, husoma, hulima',
      'Alicheza, aliimba, alipika, alisoma, alilima',
      'Atacheza, ataimba, atapika, atasoma, atalima',
      'Anacheza, anaimba, anapika, anasoma, analima'
    ],
    correctAnswer: 'Hucheza, huimba, hupika, husoma, hulima',
    explanation: 'Vitenzi vyote hivi vinaanza na kiambishi "hu-" kinachoashiria hali ya mazoea na desturi.',
    socraticHint: 'Tafuta kundi la vitenzi ambapo kila neno linaanza na herufi "hu-".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U4'
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
console.log('Batch 2 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
