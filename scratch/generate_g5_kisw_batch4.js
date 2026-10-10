import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 Kiswahili Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-kisw-u7',
    strandId: 'strand-g5-kisw-sarufi',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Sanaa za Kiasili, Utamaduni Wetu na Kauli za Vitenzi',
    description: 'Kuthamini utamaduni na sanaa za jamii za Kenya (vyungu, vikapu, mikuki, shanga, leso, kikoi); kutambua sherehe za kitamaduni na maonyesho ya Bomas of Kenya; kubainisha kauli za vitenzi: Kutenda, Kutendea (-ia/-ea), na Kutendewa (-iwa/-ewa) na kuzitumia katika sentensi zenye upatanisho sahihi.',
    cbeCompetency: 'Uzalendo na uthamini wa turathi za kitamaduni, ustadi wa kunyumbua vitenzi katika kauli za kutendea na kutendewa, na ufasaha wa mawasiliano',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g5-kisw-u8',
    strandId: 'strand-g5-kisw-kusoma',
    learningAreaId: 'la-kiswahili-g5',
    title: 'Ushairi, Fasihi Simulizi na Vinyume vya Maneno',
    description: 'Kusoma na kuelewa mashairi ya watoto (ubeti, mshororo, vina, mizani); kutegua vitendawili na kueleza maana ya methali za kimaadili; kubainisha vinyume vya nomino, vivumishi, na vitendo (inuka/keti, fungua/funga, mrefu/mfupi, rafiki/adui, cheka/lia) katika matini mbalimbali.',
    cbeCompetency: 'Ufahamu wa sanaa ya ushairi na fasihi simulizi, uchanganuzi wa lugha ya picha na methali, na umahiri wa vinyume vya maneno',
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
    id: 'lesson-g5-kisw-u7-l1',
    subStrandId: 'substrand-g5-kisw-u7',
    title: 'Sanaa za Kiasili na Mavazi ya Kitamaduni ya Kenya',
    content: 'Jamii mbalimbali za Kenya zina urithi tajiri wa sanaa za mikono, mavazi, na vyombo vya kitamaduni vinavyodumisha utambulisho wetu wa kitaifa:\n\n1. Vyombo na Vifaa vya Kiasili:\n- Kiondo (Kikapu cha ushanga): Kimefumwa kwa nyuzi za mkonge na kupambwa kwa rangi za kuvutia.\n- Chungu cha Udongo: Hutumika kupikia chakula kama kande au samaki na kuhifadhi maji baridi.\n- Shanga za Shingoni na Masikioni: Mapambo ya kitamaduni ya jamii za Wamaasai na Wasamburu.\n- Pembe ya Ng\'ombe au Ngozi ya Ngoma: Hutumika kuita watu kwenye mikutano ya kijiji au kucheza ngoma za asili.\n\n2. Mavazi ya Kiasili:\n- Kikoi: Nguo ya pamba yenye miraba na pindo za rangi inayovaliwa na wanaume na wanawake Pwani.\n- Kanga / Leso: Nguo nyepesi yenye maandishi ya methali au semi chini, inayovaliwa kwa heshima.\n- Shuka ya Kimasai: Nguo nzito yenye miraba nyekundu na buluu inayovaliwa na jamii za wafugaji.\n\n3. Umuhimu wa Utamaduni:\n- Utamaduni unajenga umoja, mshikamano, heshima, na kukuza utalii wa kitamaduni (kama kule Bomas of Kenya na Tamasha za Muziki za Shule).',
    didYouKnow: 'Kanga na leso za Kenya ni za kipekee duniani kwa sababu kila moja huchapishwa methali ya Kiswahili au ujumbe wa hekima chini yake!',
    kenyanContext: 'Katika kituo cha kitamaduni cha Bomas of Kenya jijini Nairobi, wanafunzi wa Gredi ya 5 hushuhudia nyumba za asili za jamii zote za Kenya zikionyesha umoja katika utofauti.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u7-l2',
    subStrandId: 'substrand-g5-kisw-u7',
    title: 'Kauli za Vitenzi: Kutenda, Kutendea na Kutendewa',
    content: 'Unyambuaji wa vitenzi ni mbinu ya kuongeza viambishi tamati kwenye mzizi wa kitenzi ili kuunda maana mpya:\n\n1. Kauli ya Kutenda (Hali ya Asili):\n- Mtendaji anafanya kitendo mwenyewe.\n- Mfano: Pika, soma, lima, andika, shona.\n- Sentensi: "Mama anapika chakula jikoni."\n\n2. Kauli ya Kutendea (Kufanya kitendo kwa ajili ya mtu au mahali):\n- Huongeza viambishi "-ia" au "-ea" kulingana na irabu za mzizi wa kitenzi.\n- Ikiwa mzizi una irabu a, i, u -> hutumia "-ia" (Pika -> Pikia, Lima -> Limia, Fagia -> Fagilia).\n- Ikiwa mzizi una irabu e, o -> hutumia "-ea" (Soma -> Somea, Shona -> Shonea, Ona -> Onea).\n- Sentensi: "Mama anampikia mgeni chakula kitamu." (anampikia kwa niaba yake au kwa heshima yake).\n\n3. Kauli ya Kutendewa (Kupokea kitendo kutoka kwa mtendaji mwingine):\n- Huongeza viambishi "-iwa" au "-ewa".\n- Irabu a, i, u -> "-iwa" (Pikiwa, Limiwa, Andikiwa).\n- Irabu e, o -> "-ewa" (Somewa, Shonewa, Onewa).\n- Sentensi: "Mgeni alipikiwa chakula kitamu na mama."',
    didYouKnow: 'Sheria ya irabu katika Kiswahili inasema: irabu "E" na "O" (irabu za wastani) huzaa "-ea" na "-ewa", wakati "A", "I", na "U" huzaa "-ia" na "-iwa"!',
    kenyanContext: 'Shuleni, Amina alimsaidia rafiki yake: "Amina alimsomea Juma hadithi ya sungura, naye Juma alifurahi kusomewa hadithi hiyo nzuri."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u8-l1',
    subStrandId: 'substrand-g5-kisw-u8',
    title: 'Ushairi wa Watoto, Vitendawili na Methali za Kimaadili',
    content: 'Fasihi simulizi na ushairi ni chemchemi ya hekima, maadili, na burudani ya lugha ya Kiswahili:\n\n1. Muundo wa Shairi la Kiswahili:\n- Ubeti: Kifungu cha mistari katika shairi (kama aya katika nathari).\n- Mshororo: Mstari mmoja wa shairi.\n- Vina: Silabi zinazofanana kimatamshi mwishoni mwa nusu mstari au mwishoni mwa mshororo.\n- Mizani: Idadi ya silabi katika kila mshororo wa shairi (kawaida mizani 16 katika ushairi wa jadi).\n\n2. Vitendawili na Majibu Yake (Sanaa ya Fumbo):\n- Mtegaji: "Kitendawili!" Wateguaji: "Tega!"\n- Mfano 1: "Kila niendapo ananifuata?" Jibu: "Kivuli."\n- Mfano 2: "Nyumba yangu haina mlango?" Jibu: "Yai."\n- Mfano 3: "Mama abeba mwanae mgongoni, mtoto abeba mama kichwani?" Jibu: "Kiatu na mguu."\n\n3. Methali za Kimaadili na Mafunzo Yake:\n- "Asiyesikia la mkuu huvunjika guu": Kutoheshimu mawaidha ya wazazi huleta majuto.\n- "Mtoto akililia wembe mpe": Huonya kwamba ukaidi wa kutaka kitu hatari humfunza mtu kwa njia ya maumivu.\n- "Umoja ni nguvu, utengano ni udhaifu": Mshikamano wa jamii ndio ulinzi wetu.',
    didYouKnow: 'Mashairi ya Kiswahili hutumia mtindo maalum wa kuimba au kughani unaoitwa "taratibu ya mtiririko", unaosaidia watoto kukariri kanuni za maadili kwa furaha!',
    kenyanContext: 'Kila mwaka katika Tamasha la Kitaifa la Muziki na Fasihi la Kenya (Kenya National Music Festival), wanafunzi hushindana kukariri mashairi ya kizalendo na kutega vitendawili jukwaani.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-kisw-u8-l2',
    subStrandId: 'substrand-g5-kisw-u8',
    title: 'Vinyume vya Maneno katika Sarufi ya Kiswahili',
    content: 'Kinyume ni neno lenye maana iliyo tofauti kabisa (kinyume) na neno jingine. Kujua vinyume huongeza msamiati na kuboresha uandishi wa insha:\n\n1. Vinyume vya Vitendo:\n- Inuka <-> Keti (au Lala)\n- Funga <-> Fungua\n- Panda (mti) <-> Shuka\n- Cheka <-> Lia\n- Ingia <-> Toka\n- Nunua <-> Uza\n- Nyamaza <-> Zungumza (au Paza sauti)\n- Anza <-> Maliza (au Hitimisha)\n\n2. Vinyume vya Vivumishi na Sifa:\n- Mrefu <-> Mfupi\n- Mzuri <-> Mbaya\n- Mwangaza / Nuru <-> Giza\n- Nadhifu (Safi) <-> Chafu\n- Baridi <-> Moto\n- Nene <-> Mbembamba\n- Ushujaa <-> Uoga\n\n3. Vinyume vya Nomino:\n- Rafiki <-> Adui\n- Mchana <-> Usiku\n- Amani <-> Vita\n- Faida <-> Hasara\n- Mwanga <-> Giza',
    didYouKnow: 'Katika Kiswahili, maneno mengi yanayoeleza kinyume cha kitendo huongezwa kiambishi "-ua" (kama Funga -> Fung-ua, Ficha -> Fich-ua, Ziba -> Zib-ua)!',
    kenyanContext: 'Wanafunzi wa Gredi ya 5 walipokuwa wakicheza mchezo wa lugha darasani, kiongozi alisema: "Ukisikia simama unaketi, ukisikia cheka unalia!" ili kujifunza vinyume kwa vitendo.',
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

// 3. Batch 4 Missions (4 missions: orders 114 to 117)
const missionsToAdd = [
  {
    id: 'mission-g5-kisw-u7-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u7',
    lessonId: 'lesson-g5-kisw-u7-l1',
    title: 'Mabingwa wa Utamaduni na Sanaa za Kiasili',
    description: 'Chunguza urithi wa vyungu, vikapu vya viondo, mavazi ya kikoi na shuka za Kimasai, na thamini utambulisho wa Wakenya!',
    order: 114,
    orderIndex: 114,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-sanaa-asili',
    badge: { name: 'Mhifadhi wa Utamaduni', icon: 'award' },
    questionIds: [
      'q-g5-kisw-u7-001', 'q-g5-kisw-u7-002', 'q-g5-kisw-u7-003', 'q-g5-kisw-u7-004',
      'q-g5-kisw-u7-005', 'q-g5-kisw-u7-006', 'q-g5-kisw-u7-007', 'q-g5-kisw-u7-008',
      'q-g5-kisw-u7-009', 'q-g5-kisw-u7-010', 'q-g5-kisw-u7-011', 'q-g5-kisw-u7-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u7-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u7',
    lessonId: 'lesson-g5-kisw-u7-l2',
    title: 'Ustadi wa Kauli za Vitenzi: Kutendea na Kutendewa',
    description: 'Nyumbua vitenzi kwa kanuni za irabu (-ia/-ea na -iwa/-ewa), tambua watendaji na watendewa, na jenga sentensi sanifu!',
    order: 115,
    orderIndex: 115,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-kauli-vitenzi',
    badge: { name: 'Bingwa wa Kauli za Vitenzi', icon: 'edit' },
    questionIds: [
      'q-g5-kisw-u7-013', 'q-g5-kisw-u7-014', 'q-g5-kisw-u7-015', 'q-g5-kisw-u7-016',
      'q-g5-kisw-u7-017', 'q-g5-kisw-u7-018', 'q-g5-kisw-u7-019', 'q-g5-kisw-u7-020',
      'q-g5-kisw-u7-021', 'q-g5-kisw-u7-022', 'q-g5-kisw-u7-023', 'q-g5-kisw-u7-024'
    ]
  },
  {
    id: 'mission-g5-kisw-u8-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u8',
    lessonId: 'lesson-g5-kisw-u8-l1',
    title: 'Washairi Chipukizi na Wategua Vitendawili',
    description: 'Chambua beti, mishororo, vina na mizani katika ushairi; tegua vitendawili vya hekima; na dhihirisha mafunzo ya methali!',
    order: 116,
    orderIndex: 116,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ushairi-fasihi',
    badge: { name: 'Mshairi Mkuu wa Watoto', icon: 'book' },
    questionIds: [
      'q-g5-kisw-u8-001', 'q-g5-kisw-u8-002', 'q-g5-kisw-u8-003', 'q-g5-kisw-u8-004',
      'q-g5-kisw-u8-005', 'q-g5-kisw-u8-006', 'q-g5-kisw-u8-007', 'q-g5-kisw-u8-008',
      'q-g5-kisw-u8-009', 'q-g5-kisw-u8-010', 'q-g5-kisw-u8-011', 'q-g5-kisw-u8-012'
    ]
  },
  {
    id: 'mission-g5-kisw-u8-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g5-kisw-u8',
    lessonId: 'lesson-g5-kisw-u8-l2',
    title: 'Ulimwengu wa Vinyume vya Maneno na Sarufi',
    description: 'Bainisha vinyume vya vitendo (inuka/keti, funga/fungua) na vinyume vya sifa na nomino ili kutajirisha msamiati wako!',
    order: 117,
    orderIndex: 117,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-vinyume-bingwa',
    badge: { name: 'Mtaalamu wa Vinyume', icon: 'zap' },
    questionIds: [
      'q-g5-kisw-u8-013', 'q-g5-kisw-u8-014', 'q-g5-kisw-u8-015', 'q-g5-kisw-u8-016',
      'q-g5-kisw-u8-017', 'q-g5-kisw-u8-018', 'q-g5-kisw-u8-019', 'q-g5-kisw-u8-020',
      'q-g5-kisw-u8-021', 'q-g5-kisw-u8-022', 'q-g5-kisw-u8-023', 'q-g5-kisw-u8-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 4 Questions (48 questions: 24 for Unit 7, 24 for Unit 8)
const questionsToAdd = [
  // --- Unit 7: Mission 1 (q-g5-kisw-u7-001 to 012) ---
  {
    id: 'q-g5-kisw-u7-001',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kikapu maarufu cha kitamaduni nchini Kenya kilichofumwa kwa nyuzi za mkonge na kupambwa kwa rangi nzuri huitwaje?',
    text: 'Kikapu maarufu cha kitamaduni nchini Kenya kilichofumwa kwa nyuzi za mkonge na kupambwa kwa rangi nzuri huitwaje?',
    options: [
      'Kiondo',
      'Chungu',
      'Mtungi',
      'Sufuria'
    ],
    correctAnswer: 'Kiondo',
    explanation: 'Kiondo ni kikapu cha kitamaduni kinachofumwa kwa mikono kwa kutumia nyuzi za mkonge na kamba za ngozi, kinachosifika kote duniani.',
    socraticHint: 'Kikapu hiki cha kienyeji cha kubeba bidhaa sokoni au zawadi kinaitwa nani?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-002',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chombo cha kiasili kilichotengenezwa kwa udongo wa mfinyanzi kinachotumiwa kupikia au kupoza maji ya kunywa huitwaje?',
    text: 'Chombo cha kiasili kilichotengenezwa kwa udongo wa mfinyanzi kinachotumiwa kupikia au kupoza maji ya kunywa huitwaje?',
    options: [
      'Chungu cha udongo (au Gudulia)',
      'Pakacha',
      'Kinu',
      'Kibaba'
    ],
    correctAnswer: 'Chungu cha udongo (au Gudulia)',
    explanation: 'Chungu na gudulia hutengenezwa kwa udongo wa mfinyanzi uliookwa motoni; hutoa maji baridi na chakula chenye ladha ya asili.',
    socraticHint: 'Chombo cha asili cha kupikia kilichofinyangwa kwa udongo.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-003',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Nguo nyepesi ya kitamaduni yenye rangi za kuvutia na methali ya Kiswahili iliyoandikwa chini yake huitwaje?',
    text: 'Nguo nyepesi ya kitamaduni yenye rangi za kuvutia na methali ya Kiswahili iliyoandikwa chini yake huitwaje?',
    options: [
      'Kanga (au Leso)',
      'Suti ya kizungu',
      'Koti la mvua',
      'Sweta ya sufu'
    ],
    correctAnswer: 'Kanga (au Leso)',
    explanation: 'Kanga na leso ni vazi la heshima na mawasiliano ya hisia na mafunzo katika utamaduni wa Waswahili na Wakenya kwa ujumla.',
    socraticHint: 'Vazi la kitamaduni linalovaliwa na wanawake lenye ujumbe wa maandishi ya methali chini.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-004',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kituo kikuu cha kitamaduni kilichopo mtaani Lang\'ata, Nairobi kinachoonyesha nyumba za kitamaduni na ngoma za jamii zote za Kenya huitwaje?',
    text: 'Kituo kikuu cha kitamaduni kilichopo mtaani Lang\'ata, Nairobi kinachoonyesha nyumba za kitamaduni na ngoma za jamii zote za Kenya huitwaje?',
    options: [
      'Bomas of Kenya',
      'Uwanja wa Nyayo',
      'Hifadhi ya Uhuru Park',
      'KICC'
    ],
    correctAnswer: 'Bomas of Kenya',
    explanation: 'Bomas of Kenya ilianzishwa ili kuhifadhi na kuonyesha tamaduni, makazi asilia, na sanaa za maonyesho za makabila yote ya Kenya.',
    socraticHint: 'Jina "Bomas" linatokana na neno "boma" kumaanisha kijiji au makazi ya kitamaduni.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-005',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chombo cha kiasili cha mti kilichochongwa chenye shimo katikati kinachotumiwa pamoja na mchi kutwanga nafaka kama mahindi huitwaje?',
    text: 'Chombo cha kiasili cha mti kilichochongwa chenye shimo katikati kinachotumiwa pamoja na mchi kutwanga nafaka kama mahindi huitwaje?',
    options: [
      'Kinu',
      'Sahani',
      'Kata',
      'Uteo'
    ],
    correctAnswer: 'Kinu',
    explanation: 'Kinu hutumika pamoja na mchi (mti mzito wa kutwangia) kuponda na kutwanga nafaka, mihogo, au viungo jikoni.',
    socraticHint: 'Chombo cha mti kinachotumiwa kutwanga kande au unga kwa mchi kinaitwaje?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-006',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chombo bapa kilichosukwa kwa mianzi au nyasi kinachotumiwa kupepeta na kupekecha nafaka ili kuondoa makapi huitwaje?',
    text: 'Chombo bapa kilichosukwa kwa mianzi au nyasi kinachotumiwa kupepeta na kupekecha nafaka ili kuondoa makapi huitwaje?',
    options: [
      'Uteo (au Ungo)',
      'Kinu',
      'Kikombe',
      'Mwiko'
    ],
    correctAnswer: 'Uteo (au Ungo)',
    explanation: 'Uteo au ungo hutumiwa na wazazi kupepeta mahindi, mtama, au mchele ili upepo upeperushe makapi na kuacha nafaka safi.',
    socraticHint: 'Chombo cha duara kinachotumiwa kupepeta nafaka juani kikitikiswa hewani.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-007',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Shuka nzito yenye miraba myekundu na ya buluu inayovaliwa na jamii ya Wamaasai na Wasamburu huitwaje?',
    text: 'Shuka nzito yenye miraba myekundu na ya buluu inayovaliwa na jamii ya Wamaasai na Wasamburu huitwaje?',
    options: [
      'Shuka ya Kimasai',
      'Kanzu nyeupe',
      'Suruali ya jinsi',
      'Sweta'
    ],
    correctAnswer: 'Shuka ya Kimasai',
    explanation: 'Shuka ya Kimasai ni vazi maarufu la utambulisho wa kitaifa linalovutia watalii wengi na huvaliwa kwa fahari na jamii za wafugaji.',
    socraticHint: 'Vazi la kitamaduni la rangi nyekundu linalovaliwa na mashujaa wa Kimasai (Moran).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-008',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kwanini ni muhimu kwa watoto wa Kenya kujivunia na kudumisha sanaa na vyombo vya kiasili vya nchi yetu?',
    text: 'Kwanini ni muhimu kwa watoto wa Kenya kujivunia na kudumisha sanaa na vyombo vya kiasili vya nchi yetu?',
    options: [
      'Huhifadhi hekima na utambulisho wa taifa, huleta mshikamano, na kuwapa mafundi riziki ya kiuchumi',
      'Ili kuwalazimisha watu wasitumie vifaa vya kisasa hata kidogo',
      'Ili kuwafanya wazazi wasinunue nguo madukani',
      'Ili watoto wasiende shuleni kusoma'
    ],
    correctAnswer: 'Huhifadhi hekima na utambulisho wa taifa, huleta mshikamano, na kuwapa mafundi riziki ya kiuchumi',
    explanation: 'Sanaa za asili ni sehemu ya utajiri wetu wa kihistoria; zinatutofautisha na mataifa mengine na kukuza ajira za ufundi.',
    socraticHint: 'Kuthamini asili yetu kunaimarisha vipi heshima na utambulisho wetu kama Wakenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-009',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifaa cha kienyeji cha kupimia nafaka sokoni au shambani chenye asili ya Pwani ya Kenya kiliitwaje?',
    text: 'Kifaa cha kienyeji cha kupimia nafaka sokoni au shambani chenye asili ya Pwani ya Kenya kiliitwaje?',
    options: [
      'Kibaba (au Pishi)',
      'Rula ya sentimita',
      'Mzani wa kielektroniki',
      'Kipimajoto'
    ],
    correctAnswer: 'Kibaba (au Pishi)',
    explanation: 'Kibaba na pishi yalikuwa vipimo vya kitamaduni vya kupimia nafaka kama mchele, mtama, au kunde kabla ya kuanzishwa kwa kilo.',
    socraticHint: 'Methali inasema: "Haba na haba hujaza..." Kibaba!',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-010',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili: "Haba na haba, hujaza ________."',
    text: 'Kamilisha methali ya Kiswahili: "Haba na haba, hujaza ________."',
    options: [
      'kibaba',
      'sufuria',
      'gunia',
      'kikapu'
    ],
    correctAnswer: 'kibaba',
    explanation: 'Methali hii inafundisha kuwa kidogo kidogo kinachokusanywa au kuhifadhiwa kwa uvumilivu hatimaye kitajaza chombo kikubwa na kuleta mafanikio makubwa.',
    socraticHint: 'Ni chombo gani cha kiasili cha kupimia kinachotajwa kwenye methali hii maarufu ya akiba?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-011',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Vyombo vya kupikia vya kiasili vilivyotengenezwa kwa nazi iliyokaushwa na kukatwa katikati (vibuyu vidogo vya kuchotea maji au uji) huitwaje?',
    text: 'Vyombo vya kupikia vya kiasili vilivyotengenezwa kwa nazi iliyokaushwa na kukatwa katikati (vibuyu vidogo vya kuchotea maji au uji) huitwaje?',
    options: [
      'Kata (au Kifuu cha nazi)',
      'Sufuria ya bati',
      'Kikombe cha plastiki',
      'Chupa ya glasi'
    ],
    correctAnswer: 'Kata (au Kifuu cha nazi)',
    explanation: 'Kifuu cha nazi na kata hutumika vijijini kama vyombo vya asili vya kunywea maji, uji, au maziwa ya mgando.',
    socraticHint: 'Gamba gumu la nazi lililokaushwa linatumiwa kama bakuli ya asili.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-012',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mapambo ya shanga yenye maumbo mbalimbali ya kuvutia yanayovaliwa shingoni na mikononi yanasifika sana katika jamii gani ya Kenya?',
    text: 'Mapambo ya shanga yenye maumbo mbalimbali ya kuvutia yanayovaliwa shingoni na mikononi yanasifika sana katika jamii gani ya Kenya?',
    options: [
      'Wamaasai na Wasamburu',
      'Wazungu pekee',
      'Mataifa ya mbali pekee',
      'Hakuna jamii nchini Kenya inayovaa shanga'
    ],
    correctAnswer: 'Wamaasai na Wasamburu',
    explanation: 'Ushanga ni sehemu kuu ya utamaduni, ndoa, na hadhi ya kijamii miongoni mwa wanawake wa kimaasai na kisamburu nchini Kenya.',
    socraticHint: 'Jamii za kaskazini na bonde la ufa za wafugaji zinazosifika kwa shanga zenye rangi za bendera ya Kenya.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },

  // --- Unit 7: Mission 2 (q-g5-kisw-u7-013 to 024) ---
  {
    id: 'q-g5-kisw-u7-013',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Pika" kinaponyumbuliwa katika KAULI YA KUTENDEA (kufanya kitendo kwa ajili ya mtu mwingine) kinakuwa neno gani?',
    text: 'Kitenzi "Pika" kinaponyumbuliwa katika KAULI YA KUTENDEA (kufanya kitendo kwa ajili ya mtu mwingine) kinakuwa neno gani?',
    options: [
      'Pikia',
      'Pikiwa',
      'Pikika',
      'Pikisha'
    ],
    correctAnswer: 'Pikia',
    explanation: 'Mzizi "pik-" una irabu "i", kwa hivyo huchukua kiambishi "-ia" katika kauli ya kutendea: "Mama anampikia mtoto uji."',
    socraticHint: 'Unapompikia mtu chakula, kitenzi kinamalizika na "-ia".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-014',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Soma" kinaponyumbuliwa katika KAULI YA KUTENDEA kinakuwa neno gani?',
    text: 'Kitenzi "Soma" kinaponyumbuliwa katika KAULI YA KUTENDEA kinakuwa neno gani?',
    options: [
      'Somea',
      'Somia',
      'Somewa',
      'Someshwa'
    ],
    correctAnswer: 'Somea',
    explanation: 'Mzizi "som-" una irabu ya wastani "o", kwa hivyo huchukua kiambishi "-ea" badala ya "-ia": "Mwalimu anawasomea wanafunzi hadithi."',
    socraticHint: 'Kwa sababu neno "soma" lina herufi "o", linafuata kanuni ya kuchukua "-ea".',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-015',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Andika" kinaponyumbuliwa katika KAULI YA KUTENDEWA (kupokea kitendo) kinakuwa neno gani?',
    text: 'Kitenzi "Andika" kinaponyumbuliwa katika KAULI YA KUTENDEWA (kupokea kitendo) kinakuwa neno gani?',
    options: [
      'Andikiwa',
      'Andikia',
      'Andikwa',
      'Andikana'
    ],
    correctAnswer: 'Andikiwa',
    explanation: 'Katika kauli ya kutendewa inayotokana na kutendea, mzizi "andik-" (irabu a/i) huchukua "-iwa": "Mwanafunzi aliandikiwa barua ya pongezi na mwalimu wake."',
    socraticHint: 'Mtu anapopokea barua kutoka kwa mwingine tunasema "ameandikiwa barua".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-016',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sentensi hii ipo katika kauli gani ya kitenzi: "Wagonjwa walitibiwa hospitalini na daktari mtaalamu"?',
    text: 'Sentensi hii ipo katika kauli gani ya kitenzi: "Wagonjwa walitibiwa hospitalini na daktari mtaalamu"?',
    options: [
      'Kauli ya Kutendewa',
      'Kauli ya Kutenda',
      'Kauli ya Kutendea',
      'Kauli ya Kutendana'
    ],
    correctAnswer: 'Kauli ya Kutendewa',
    explanation: 'Kitenzi "walitibiwa" kina kiambishi cha kutendewa "-wa", kikionyesha wagonjwa walipokea kitendo cha matibabu kutoka kwa daktari.',
    socraticHint: 'Wagonjwa ndio waliopokea kitendo cha kutibiwa. Hii ni kauli ya mtendwa au mtendewa.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-017',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Chora" kinaponyumbuliwa katika KAULI YA KUTENDEWA kinakuwa neno gani?',
    text: 'Kitenzi "Chora" kinaponyumbuliwa katika KAULI YA KUTENDEWA kinakuwa neno gani?',
    options: [
      'Chorewa',
      'Choria',
      'Chorwa',
      'Choriana'
    ],
    correctAnswer: 'Chorewa',
    explanation: 'Mzizi "chor-" una irabu "o", kwa hivyo katika kutendewa huchukua "-ewa" na kuwa "chorewa": "Mtoto alichorewa picha nzuri ya simba."',
    socraticHint: 'Irabu "o" inazaa "-ewa" katika kauli ya kutendewa.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-018',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi kati ya zifuatazo iliyo katika KAULI YA KUTENDEA?',
    text: 'Ni sentensi ipi kati ya zifuatazo iliyo katika KAULI YA KUTENDEA?',
    options: [
      'Kiprono alimlimia nyanya yake bustani ya mboga.',
      'Kiprono alilima bustani ya mboga.',
      'Bustani ya mboga ililimwa na Kiprono.',
      'Kiprono alilimana na rafiki yake.'
    ],
    correctAnswer: 'Kiprono alimlimia nyanya yake bustani ya mboga.',
    explanation: '"Alimlimia" kiko katika kauli ya kutendea (-ia), kikionyesha kitendo kilifanyika kwa ajili na manufaa ya nyanya.',
    socraticHint: 'Tafuta sentensi inayoonyesha kitendo kilifanywa kwa ajili ya mtu mwingine (alimlimia).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-019',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kanuni ya kuchagua kati ya kiambishi "-ia" na "-ea" katika kauli ya kutendea inategemea nini?',
    text: 'Kanuni ya kuchagua kati ya kiambishi "-ia" na "-ea" katika kauli ya kutendea inategemea nini?',
    options: [
      'Irabu zilizomo katika mzizi wa kitenzi (a, i, u huchukua -ia; e, o huchukua -ea)',
      'Idadi ya herufi za nomino inayofuata',
      'Ikiwa mtu anayezungumza ni mwanafunzi au mwalimu',
      'Rangi ya kalamu inayotumika kuandika'
    ],
    correctAnswer: 'Irabu zilizomo katika mzizi wa kitenzi (a, i, u huchukua -ia; e, o huchukua -ea)',
    explanation: 'Katika sarufi ya Kiswahili, upatanisho wa irabu (vowel harmony) unaeleza kuwa e na o huzaa -ea, na a, i, u huzaa -ia.',
    socraticHint: 'Sheria hii inategemea sauti za irabu zilizopo kwenye shina la neno.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-020',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Shona" kinaponyumbuliwa katika kauli ya KUTENDEA kinakuwa neno gani?',
    text: 'Kitenzi "Shona" kinaponyumbuliwa katika kauli ya KUTENDEA kinakuwa neno gani?',
    options: [
      'Shonea',
      'Shonia',
      'Shonewa',
      'Shonwa'
    ],
    correctAnswer: 'Shonea',
    explanation: 'Kwa sababu mzizi "shon-" una irabu "o", huchukua "-ea": "Fundi anawashonea watoto sare za shule."',
    socraticHint: 'Shona ina irabu "o", kwa hivyo inachukua -ea na kuwa shonea.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-021',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sentensi hii ifanyiwe mabadiliko ya kuingia katika kauli ya KUTENDEWA: "Fundi alitengeneza kiti." Sentensi sahihi ni ipi?',
    text: 'Sentensi hii ifanyiwe mabadiliko ya kuingia katika kauli ya KUTENDEWA: "Fundi alitengeneza kiti." Sentensi sahihi ni ipi?',
    options: [
      'Kiti kilitengenezwa na fundi.',
      'Fundi alikitengenezea kiti.',
      'Kiti kilitengeneza fundi.',
      'Fundi alitengenezewa kiti.'
    ],
    correctAnswer: 'Kiti kilitengenezwa na fundi.',
    explanation: 'Katika kauli ya kutendwa/kutendewa, kitu kilichopokea tendo (kiti) kinakuwa kiima cha sentensi: "Kiti kilitengenezwa na fundi."',
    socraticHint: 'Kiti ndicho kilichopokea tendo, kwa hivyo sentensi inaanza na "Kiti kili-..."',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-022',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kitenzi "Fagia" kinaponyumbuliwa katika kauli ya KUTENDEA kinakuwa neno gani?',
    text: 'Kitenzi "Fagia" kinaponyumbuliwa katika kauli ya KUTENDEA kinakuwa neno gani?',
    options: [
      'Fagilia',
      'Fagiea',
      'Fagiwa',
      'Fagiliana'
    ],
    correctAnswer: 'Fagilia',
    explanation: 'Kitenzi "fagia" huingiza konsonanti ya "l" na kiambishi "-ia" na kuwa "fagilia": "Amina alimfagilia mama chumba cha wageni."',
    socraticHint: 'Fagia inabadilika kuwa fagilia (kuweka herufi "l" katikati).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-023',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni sentensi ipi ifuatayo ambapo kitenzi kipo katika KAULI YA KUTENDA (hali yake ya asili bila kunyumbuliwa)?',
    text: 'Ni sentensi ipi ifuatayo ambapo kitenzi kipo katika KAULI YA KUTENDA (hali yake ya asili bila kunyumbuliwa)?',
    options: [
      'Mwanafunzi anasoma kitabu cha Kiswahili darasani.',
      'Mwanafunzi anasomewa kitabu cha Kiswahili na mwalimu.',
      'Mwanafunzi anamsomea rafiki yake kitabu cha Kiswahili.',
      'Kitabu kinasomwa na mwanafunzi.'
    ],
    correctAnswer: 'Mwanafunzi anasoma kitabu cha Kiswahili darasani.',
    explanation: '"Anasoma" ni kitenzi cha asili katika kauli ya kutenda mtendaji akifanya kazi yake mwenyewe.',
    socraticHint: 'Tafuta kitenzi cha kawaida: anasoma (bila -ea, -ewa, au -wa).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },
  {
    id: 'q-g5-kisw-u7-024',
    subStrandId: 'substrand-g5-kisw-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha sentensi ifuatayo kwa kauli sahihi ya kutendea: "Mwanariadha wa Kenya _______ nchi yake medali ya dhahabu."',
    text: 'Kamilisha sentensi ifuatayo kwa kauli sahihi ya kutendea: "Mwanariadha wa Kenya _______ nchi yake medali ya dhahabu."',
    options: [
      'aliiletea',
      'aliileteza',
      'aliiletewa',
      'aliiletesha'
    ],
    correctAnswer: 'aliiletea',
    explanation: 'Kitenzi "leta" kina irabu "e", hivyo katika kauli ya kutendea kinakuwa "letea" (aliiletea nchi yake = alifanya kitendo cha kuleta kwa faida ya nchi yake).',
    socraticHint: 'Leta inabadilika kuwa letea kwa sababu ya irabu "e".',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U7'
  },

  // --- Unit 8: Mission 1 (q-g5-kisw-u8-001 to 012) ---
  {
    id: 'q-g5-kisw-u8-001',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kifungu cha mistari katika shairi la Kiswahili (kinacholingana na aya katika insha) huitwaje?',
    text: 'Kifungu cha mistari katika shairi la Kiswahili (kinacholingana na aya katika insha) huitwaje?',
    options: [
      'Ubeti',
      'Mshororo',
      'Kina',
      'Mzani'
    ],
    correctAnswer: 'Ubeti',
    explanation: 'Ubeti ni kifungu cha mistari (mishororo) kinachounda sehemu moja ya shairi; shairi linaweza kuwa na beti kadhaa.',
    socraticHint: 'Aya ya shairi inaitwa ubeti.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-002',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mstari mmoja katika ubeti wa shairi la Kiswahili huitwaje kwa neno maalum la kitaalamu?',
    text: 'Mstari mmoja katika ubeti wa shairi la Kiswahili huitwaje kwa neno maalum la kitaalamu?',
    options: [
      'Mshororo',
      'Ubeti',
      'Kina',
      'Kituo'
    ],
    correctAnswer: 'Mshororo',
    explanation: 'Kila mstari mmoja unaoandikwa kwenye ubeti wa shairi unaitwa "mshororo" (wingi: mishororo).',
    socraticHint: 'Mstari mmoja wa shairi huitwa mshororo.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-003',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Silabi zinazofanana kimatamshi na herufi mwishoni mwa nusu mstari au mwishoni mwa mshororo katika shairi huitwaje?',
    text: 'Silabi zinazofanana kimatamshi na herufi mwishoni mwa nusu mstari au mwishoni mwa mshororo katika shairi huitwaje?',
    options: [
      'Vina (umoja: Kina)',
      'Mizani',
      'Mishororo',
      'Beti'
    ],
    correctAnswer: 'Vina (umoja: Kina)',
    explanation: 'Vina ni mapigo na sauti za silabi zinazolingana mwanzoni au mwishoni mwa mistari ya shairi ili kuleta mahadhi ya muziki.',
    socraticHint: 'Silabi zinazolingana kimatamshi mwishoni mwa mistari kama rhyming sounds.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-004',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Idadi ya silabi zinazotamkwa katika kila mshororo wa shairi la kimapokeo huitwaje?',
    text: 'Idadi ya silabi zinazotamkwa katika kila mshororo wa shairi la kimapokeo huitwaje?',
    options: [
      'Mizani',
      'Vina',
      'Beti',
      'Kituo'
    ],
    correctAnswer: 'Mizani',
    explanation: 'Mizani ni kipimo cha idadi ya silabi katika mshororo wa shairi (mfano: mishororo mingi ya taratibu huwa na mizani 16 au 8).',
    socraticHint: 'Kipimo cha idadi ya silabi katika mstari kinaitwa mizani.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-005',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tegua kitendawili hiki cha Kiswahili: "Kila niendapo ananifuata lakini siwezi kumshika?"',
    text: 'Tegua kitendawili hiki cha Kiswahili: "Kila niendapo ananifuata lakini siwezi kumshika?"',
    options: [
      'Kivuli changu',
      'Mguu wangu',
      'Gari moshi',
      'Mbwa wangu'
    ],
    correctAnswer: 'Kivuli changu',
    explanation: 'Kivuli hutembea na kufuata mtu kila aendapo juani au kwenye taa lakini hakiwezi kushikika mkononi.',
    socraticHint: 'Kitu hiki kiko chini ardhini kikiiga matendo yako yote mchana juani.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-006',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tegua kitendawili hiki maarufu: "Nyumba yangu haina mlango wala dirisha?"',
    text: 'Tegua kitendawili hiki maarufu: "Nyumba yangu haina mlango wala dirisha?"',
    options: [
      'Yai',
      'Banda la kuku',
      'Darasa',
      'Gari'
    ],
    correctAnswer: 'Yai',
    explanation: 'Yai la kuku au ndege limefungwa pande zote kwa gamba gumu lisilo na mlango hadi mtoto atakapoanguliwa.',
    socraticHint: 'Kitu cha mviringo chenye kifaranga ndani kisicho na tundu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-007',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Methali ya Kiswahili "Umoja ni nguvu, utengano ni ________" inafundisha nini?',
    text: 'Methali ya Kiswahili "Umoja ni nguvu, utengano ni ________" inafundisha nini?',
    options: [
      'udhaifu',
      'hasira',
      'amani',
      'ugonjwa'
    ],
    correctAnswer: 'udhaifu',
    explanation: 'Methali inafundisha kwamba watu wakishirikiana wanakuwa na nguvu na ushindi, lakini wakigawanyika wanakuwa dhaifu na kushindwa.',
    socraticHint: 'Kinyume cha nguvu kwenye methali hii ni udhaifu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-008',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tegua kitendawili: "Popoo mbili zavuka mto?"',
    text: 'Tegua kitendawili: "Popoo mbili zavuka mto?"',
    options: [
      'Macho',
      'Miguu miwili',
      'Masikio',
      'Mikono miwili'
    ],
    correctAnswer: 'Macho',
    explanation: 'Macho mawili yana uwezo wa kutazama na kuona ng\'ambo ya mto bila mwili kuvuka mto huo halisi.',
    socraticHint: 'Viungo viwili vya usoni vinavyoweza kutazama mbali mara moja.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-009',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mstari wa mwisho kabisa katika ubeti wa shairi unaorudiwarudiwa katika kila ubeti huitwaje?',
    text: 'Mstari wa mwisho kabisa katika ubeti wa shairi unaorudiwarudiwa katika kila ubeti huitwaje?',
    options: [
      'Kituo (au Mkarara / Kibwagizo)',
      'Mwanzo',
      'Kina cha ndani',
      'Kichwa cha shairi'
    ],
    correctAnswer: 'Kituo (au Mkarara / Kibwagizo)',
    explanation: 'Kituo au kibwagizo ni mstari wa mwisho wa ubeti unaorudiwa katika kila ubeti kusisitiza wazo kuu la shairi.',
    socraticHint: 'Mstari unaojirudia mwishoni mwa kila ubeti kama chorus.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-010',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Methali "Mvumilivu hula mbivu" inatoa funzo gani muhimu kwa wanafunzi wa shule?',
    text: 'Methali "Mvumilivu hula mbivu" inatoa funzo gani muhimu kwa wanafunzi wa shule?',
    options: [
      'Subira na bidii thabiti maishani huzaa matunda mazuri na mafanikio makubwa',
      'Mwanafunzi anapaswa kula matunda mabichi mara moja',
      'Hakuna haja ya kusubiri mambo yawe tayari',
      'Kula haraka humsaidia mtu kufaulu mitihani'
    ],
    correctAnswer: 'Subira na bidii thabiti maishani huzaa matunda mazuri na mafanikio makubwa',
    explanation: 'Mtu anayevumilia hadi matunda yaive ndiye anayefurahia utamu; subira katika masomo huleta matokeo mema.',
    socraticHint: 'Subira huvuta heri na huleta matokeo mema yenye baraka.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-011',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Tegua kitendawili: "Huku ng\'o na kule ng\'o?"',
    text: 'Tegua kitendawili: "Huku ng\'o na kule ng\'o?"',
    options: [
      'Giza totoro',
      'Jua kali',
      'Mto mkubwa',
      'Upepo'
    ],
    correctAnswer: 'Giza totoro',
    explanation: 'Giza totoro la usiku linapotanda, hakuna kitu kinachoonekana pande zote mbili (huku huoni na kule huoni).',
    socraticHint: 'Hali ya kutoweza kuona chochote kwa sababu ya ukosefu wa mwanga.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-012',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kamilisha methali ya Kiswahili: "Asiyesikia la mkuu huvunjika ________."',
    text: 'Kamilisha methali ya Kiswahili: "Asiyesikia la mkuu huvunjika ________."',
    options: [
      'guu (mguu)',
      'kono (mkono)',
      'kichwa',
      'kidole'
    ],
    correctAnswer: 'guu (mguu)',
    explanation: 'Methali hii inafundisha watoto kutii mawaidha ya watu wazima na walimu ili kuepuka majanga na maumivu maishani.',
    socraticHint: 'Neno la kale la Kiswahili linalomaanisha mguu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },

  // --- Unit 8: Mission 2 (q-g5-kisw-u8-013 to 024) ---
  {
    id: 'q-g5-kisw-u8-013',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni kipi kinyume sahihi cha kitenzi "Inuka"?',
    text: 'Ni kipi kinyume sahihi cha kitenzi "Inuka"?',
    options: [
      'Keti (au Lala)',
      'Simama',
      'Kimbia',
      'Tembea'
    ],
    correctAnswer: 'Keti (au Lala)',
    explanation: 'Kinyume cha kuinuka ni kuketi chini au kulala.',
    socraticHint: 'Mwalimu anaposema msiinuke, mnapaswa kufanya nini kwenye viti?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-014',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha kitendo "Funga" mlango ni kipi?',
    text: 'Kinyume cha kitendo "Funga" mlango ni kipi?',
    options: [
      'Fungua',
      'Fungisha',
      'Tengeneza',
      'Vunja'
    ],
    correctAnswer: 'Fungua',
    explanation: 'Kinyume cha kufunga mlango au kufuli ni kufungua.',
    socraticHint: 'Kitendo cha kufungua kinyume na kufunga.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-015',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha nomino "Rafiki" katika mahusiano ya kibinadamu ni kipi?',
    text: 'Kinyume cha nomino "Rafiki" katika mahusiano ya kibinadamu ni kipi?',
    options: [
      'Adui',
      'Jirani',
      'Ndugu',
      'Mwenzi'
    ],
    correctAnswer: 'Adui',
    explanation: 'Kinyume cha rafiki (mtu anayekupenda na kukutakia mema) ni adui (mtu anayekuchukia na kutaka kukudhuru).',
    socraticHint: 'Mtu anayekupiga vita kinyume cha yule anayekupenda.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-016',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ni jozi ipi ya maneno ambapo maneno hayo ni VINYUME sahihi?',
    text: 'Ni jozi ipi ya maneno ambapo maneno hayo ni VINYUME sahihi?',
    options: [
      'Nunua - Uza',
      'Kimbia - Endesha',
      'Lia - Huzunika',
      'Soma - Andika'
    ],
    correctAnswer: 'Nunua - Uza',
    explanation: '"Nunua" (kutoa pesa kupata bidhaa) ni kinyume kabisa cha "Uza" (kutoa bidhaa kupata pesa).',
    socraticHint: 'Mnunuzi sokoni anafanya kitendo kinyume cha muuzaji.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-017',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha neno "Mwangaza" (Nuru) ni kipi?',
    text: 'Kinyume cha neno "Mwangaza" (Nuru) ni kipi?',
    options: [
      'Giza',
      'Mwanga',
      'Jua',
      'Mwezi'
    ],
    correctAnswer: 'Giza',
    explanation: 'Kinyume cha nuru au mwangaza ni giza.',
    socraticHint: 'Wakati hakuna nuru wala mwangaza, kunakuwa na nini?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-018',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Sentensi: "Mlima Kenya ni mrefu sana lakini kilima hiki ni _______." Neno lipi linalokamilisha kinyume cha "mrefu"?',
    text: 'Sentensi: "Mlima Kenya ni mrefu sana lakini kilima hiki ni _______." Neno lipi linalokamilisha kinyume cha "mrefu"?',
    options: [
      'kifupi',
      'kidogo',
      'chembamba',
      'kizuri'
    ],
    correctAnswer: 'kifupi',
    explanation: 'Kinyume cha mrefu ni mfupi/kifupi kulingana na upatanisho wa ngeli ya KI-VI kwa neno "kilima".',
    socraticHint: 'Kinyume cha urefu ni ufupi.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-019',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha kitendo "Cheka" kwa furaha ni kipi?',
    text: 'Kinyume cha kitendo "Cheka" kwa furaha ni kipi?',
    options: [
      'Lia kwa huzuni',
      'Imba kwa sauti',
      'Tembea polepole',
      'Kula chakula'
    ],
    correctAnswer: 'Lia kwa huzuni',
    explanation: 'Kicheko huonyesha furaha, na kinyume chake ni kilio (kulia) kinachoonyesha huzuni au uchungu.',
    socraticHint: 'Mtu asipocheka kwa furaha analia kwa huzuni.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-020',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha nomino "Amani" nchini ni kipi?',
    text: 'Kinyume cha nomino "Amani" nchini ni kipi?',
    options: [
      'Vita (au Ghasia)',
      'Furaha',
      'Umoja',
      'Upendo'
    ],
    correctAnswer: 'Vita (au Ghasia)',
    explanation: 'Kinyume cha amani na utulivu ni vita, mifarakano, au ghasia.',
    socraticHint: 'Wakati hakuna amani nchini kunatokea mapigano au vita.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-021',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha kitendo "Panda mti" (kupanda mlimani au kupanda mti) unaposhuka chini ni kipi?',
    text: 'Kinyume cha kitendo "Panda mti" (kupanda mlimani au kupanda mti) unaposhuka chini ni kipi?',
    options: [
      'Shuka',
      'Kimbia',
      'Ruka',
      'Simama'
    ],
    correctAnswer: 'Shuka',
    explanation: 'Kupanda kuelekea juu kuna kinyume chake cha kuteremka au kushuka kuelekea chini.',
    socraticHint: 'Unapopanda ngazi kuelekea juu, kinyume chake unashuka chini.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-022',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kinyume cha neno "Nadhifu" (mtu aliye safi na mwenye mavazi yaliyonyooshwa vizuri) ni kipi?',
    text: 'Kinyume cha neno "Nadhifu" (mtu aliye safi na mwenye mavazi yaliyonyooshwa vizuri) ni kipi?',
    options: [
      'Chafu (au Mchafu)',
      'Mwerevu',
      'Mrefu',
      'Mpole'
    ],
    correctAnswer: 'Chafu (au Mchafu)',
    explanation: 'Nadhifu inamaanisha usafi na uzuri wa mavazi au mazingira, na kinyume chake ni uchafu.',
    socraticHint: 'Kinyume cha unadhifu na usafi ni uchafu.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-023',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Katika biashara, mfanyabiashara asipopata "Faida" kwenye mauzo yake anapata nini kwa kinyume chake?',
    text: 'Katika biashara, mfanyabiashara asipopata "Faida" kwenye mauzo yake anapata nini kwa kinyume chake?',
    options: [
      'Hasara',
      'Mali nyingi',
      'Utajiri',
      'Deni'
    ],
    correctAnswer: 'Hasara',
    explanation: 'Kinyume cha faida (kupata zaidi ya ulichowekeza) ni hasara (kupoteza fedha au mali).',
    socraticHint: 'Kupoteza pesa kwenye biashara kunaitwa kupata nini kinyume cha faida?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
  },
  {
    id: 'q-g5-kisw-u8-024',
    subStrandId: 'substrand-g5-kisw-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Bainisha sentensi ambamo maneno mawili yaliyopigiwa mstari ni VINYUME sahihi:',
    text: 'Bainisha sentensi ambamo maneno mawili yaliyopigiwa mstari ni VINYUME sahihi:',
    options: [
      'Mchana jua huangaza lakini usiku kiza hutanda.',
      'Mchana watu hufanya kazi na asubuhi wanakula.',
      'Shuleni watoto huandika na kusoma kwa pamoja.',
      'Gari lilitembea haraka na mbio sana.'
    ],
    correctAnswer: 'Mchana jua huangaza lakini usiku kiza hutanda.',
    explanation: 'Katika sentensi hii, "mchana" ni kinyume cha "usiku", na mwangaza/kiza ni maneno yanayotofautiana kimaana.',
    socraticHint: 'Tafuta maneno mawili ya nyakati zilizo kinyume: mchana na usiku.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-KISW-U8'
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
console.log('Batch 4 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
