/**
 * Grade 6 Social Studies - Batch 3 Generator
 * Content: Units 5 & 6
 * - Unit 5: People, Language Groups & Historical Migrations in Eastern Africa
 * - Unit 6: Cultural Heritage, Age Sets, Clan Systems & Indigenous Ceremonies
 * Missions: Orders 49, 50, 51, 52 (world-kenya-explorer)
 * Questions: 48 (24 per unit: q-g6-soc-u5-001 to q-g6-soc-u6-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Social Studies Batch 3 (Units 5 & 6) ---');

// 1. Units 5 & 6 (subStrands)
const units = [
  {
    id: 'substrand-g6-soc-u5',
    strandId: 'strand-g6-soc-people-culture',
    learningAreaId: 'la-social-g6',
    title: 'Language Groups, Historical Migrations & Population in Eastern Africa',
    name: 'Language Groups, Historical Migrations & Population in Eastern Africa',
    description: 'Tracing historical origins, routes, and reasons for migration of major language groups (Bantu from Congo basin, Nilotes from Bahr-el-Ghazal, Cushites from Horn of Africa, Semites from Arabian peninsula); examining interaction and assimilation; analyzing factors influencing population distribution and high/low density zones across Eastern Africa.',
    cbeCompetency: 'Historical empathy, demographical inquiry, spatial population analysis, and appreciation of ethnic interdependence',
    estimatedMinutes: 30,
    order: 5,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-soc-u6',
    strandId: 'strand-g6-soc-people-culture',
    learningAreaId: 'la-social-g6',
    title: 'Cultural Heritage, Social Systems, Age Sets & Indigenous Ceremonies',
    name: 'Cultural Heritage, Social Systems, Age Sets & Indigenous Ceremonies',
    description: 'Exploring traditional African social structures (extended family, clans, age groups, councils of elders like Njuri Ncheke, Kiama, and Orkoiyot); examining indigenous education and apprenticeship; appreciating cultural artefacts, music, and ceremonies (rites of passage, harvest thanksgiving); and promoting modern cultural preservation.',
    cbeCompetency: 'Cultural literacy, social cohesion stewardship, historical heritage valuation, and intergenerational respect',
    estimatedMinutes: 30,
    order: 6,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 5 & 6
const lessons = [
  // Unit 5
  {
    id: 'lesson-g6-soc-u5-l1',
    subStrandId: 'substrand-g6-soc-u5',
    title: 'Major Language Groups & Migration Routes into Eastern Africa',
    content: 'Eastern Africa is an extraordinary cultural mosaic shaped by centuries of historical population movements.\n\n1. The Four Major Language Groups:\n- The Bantu:\n  * Largest language group in Eastern Africa.\n  * Point of origin: Congo Basin / Cameroon-Nigeria borderlands.\n  * Main divisions: Western Bantu (Abagusii, Abaluhya, Abasuba, Baganda, Banyankole) entering through Uganda; Eastern Bantu (Agikuyu, Ameru, Aembu, Akamba, Mijikenda, Pokomo, Chagga, Sukuma) moving through Taita Hills and Mount Kenya.\n  * Primary economic activity: Sedentary crop farming, iron-smelting, and pottery.\n- The Nilotes:\n  * Second largest group; originated in the Bahr-el-Ghazal region of South Sudan.\n  * Divided into three groups:\n    1. River-Lake Nilotes: Luo (Kenya and Uganda), Acholi, Dinka, Nuer.\n    2. Plains Nilotes: Maasai, Samburu, Turkana, Iteso, Karamojong.\n    3. Highland Nilotes: Kalenjin sub-tribes (Kipsigis, Nandi, Tugen, Marakwet, Pokot, Sabaot).\n  * Primary economic activity: Pastoralism, fishing, and mixed farming.\n- The Cushites:\n  * Originated from the Horn of Africa (Ethiopian highlands and Somalia).\n  * Divided into Eastern Cushites (Oromo, Borana, Somali, Rendille, Gabbra) and Southern Cushites (Dahalo in Kenya, Iraqw in Tanzania).\n  * Primary economic activity: Pastoralism with camels, cattle, and goats in arid lands.\n- The Semites:\n  * Originated in southwestern Asia / Arabian Peninsula and intermarried with local populations.\n  * Examples: Amhara and Tigray in Ethiopia, Nubians in Sudan, Arabs along the Swahili coast.\n\n2. Reasons for Historical Migration:\n- Search for fertile arable farming land.\n- Search for fresh pasture and permanent water for livestock.\n- Population pressure and overcrowding in ancestral homelands.\n- Internal clan rivalries, warfare, and disease outbreaks (famine/epidemics).\n- Spirit of adventure.\n\n3. Effects of Historical Interactions:\n- Intermarriage between different linguistic communities.\n- Trade between farmers (grains, pots) and pastoralists (milk, hides, livestock).\n- Borrowing of cultural practices (e.g. Bantu adopted circumcision and age-sets from Southern Cushites and Nilotes).\n- Emergence of the Swahili language and culture along the coast through Bantu and Arab contact.',
    didYouKnow: 'The Swahili language (Kiswahili) developed along the East African coast as a Bantu language with rich vocabulary borrowed from Arabic, Persian, Portuguese, and English through trade!',
    kenyanContext: 'At traditional barter markets like Karatina in Nyeri and Kibuye in Kisumu, agricultural communities historically exchanged maize, yams, and pottery for pastoralist ghee, hides, and livestock.',
    order: 9,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u5-l2',
    subStrandId: 'substrand-g6-soc-u5',
    title: 'Population Distribution, Density & Urbanization in Eastern Africa',
    content: 'Population distribution refers to how people are spread across a geographic area, while population density measures the number of persons per square kilometre.\n\n1. High Population Density Areas in Eastern Africa:\n- The Lake Victoria Basin (Kisumu, Kakamega, Kampala, Mwanza): Rich alluvial soils, high rainfall, reliable fishing, and intense agriculture.\n- The Central and Western Highlands (Kiambu, Nyeri, Kisii, slopes of Mt. Meru and Mt. Kilimanjaro): Deep volcanic soils, cool temperate climate, lucrative tea and coffee farming.\n- Coastal Urban Centers (Mombasa, Dar es Salaam): Ports, commerce, tourism, and manufacturing industries.\n- Capital Cities (Nairobi, Kampala, Addis Ababa, Kigali): Administrative headquarters, universities, and commercial financial hubs.\n\n2. Low Population Density Areas:\n- Arid and Semi-Arid Lands (ASALs) of northern Kenya (Turkana, Marsabit, Wajir, Mandera), southern Somalia, and eastern Ethiopia.\n- Reasons: Extreme high temperatures, very low unreliable rainfall (under 250 mm), poor sandy soils, and scarce surface water.\n- Tsetse fly-infested miombo woodlands of central Tanzania.\n\n3. Factors Influencing Population Distribution:\n- Physical Factors: Climate (rainfall/temperature), soil fertility, availability of water, relief/topography, disease vectors (mosquitoes, tsetse flies).\n- Human and Economic Factors: Transport infrastructure (railways, highways), industrial jobs, urban amenities, historical trade routes, peace and political security.\n\n4. Rural-to-Urban Migration:\n- Movement of people (especially youth) from villages to major cities seeking employment, higher education, and modern services.\n- Challenges in cities: Traffic congestion, growth of informal settlements (slums), unemployment, and pressure on water and sanitation.',
    didYouKnow: 'Kisii County in western Kenya has one of the highest rural population densities in all of Africa, with over 900 people per square kilometre cultivating every fertile hillside!',
    kenyanContext: 'The standard gauge railway (SGR) connecting Mombasa to Nairobi and Naivasha has transformed inland transit, creating bustling economic growth nodes around inland container depots.',
    order: 10,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },

  // Unit 6
  {
    id: 'lesson-g6-soc-u6-l1',
    subStrandId: 'substrand-g6-soc-u6',
    title: 'Traditional Social Systems: Clans, Age Sets & Councils of Elders',
    content: 'Traditional African societies possessed sophisticated governance systems that maintained order, mediated disputes, and transmitted ethical values.\n\n1. Family and Clan Systems:\n- The Extended Family: Basic social unit comprising parents, children, grandparents, uncles, aunts, and cousins.\n- The Clan: A larger group of related families tracing descent from a common ancestor (patrilineal or matrilineal).\n- Functions of the Clan: Land ownership and allocation, mutual defense, regulating marriages (preventing incest), and communal labor (harambee).\n\n2. Age-Groups and Age-Sets:\n- Age-group: Cohort of young people initiated or circumcised together during the same initiation season.\n- Age-set: A permanent social grouping formed by several successive age-groups that move together through life stages (youth, warriors/morans, junior elders, senior elders).\n- Roles of Age-Sets:\n  * Warriors (e.g. Maasai Morans): Defending community territory, protecting livestock, and community scouting.\n  * Junior Elders: Settling local domestic disputes, maintaining peace, and organizing family rites.\n  * Senior Elders: Supreme judicial courts making community policy, advising on peace and war, and leading prayers.\n\n3. Traditional Councils of Elders in Kenya:\n- Njuri Ncheke of the Ameru: Renowned council of elders with judicial authority to resolve land disputes, preserve shrines, and promote community cohesion.\n- Kiama of the Agikuyu: Council of respected elders administering customary justice under sacred mugumo (fig) trees.\n- Orkoiyot of the Nandi: Spiritual and military supreme leader consulted for prophetic guidance.\n- Ruoth and Piny Owacho of the Luo: Council of clan leaders ensuring justice and social peace.',
    didYouKnow: 'The Njuri Ncheke council of the Ameru has its sacred supreme court shrine at Nchiru in Meru County, where dispute resolutions are so respected they are recognized in modern Kenyan mediation law!',
    kenyanContext: 'Traditional alternative dispute resolution (ADR) led by clan elders is formally encouraged by Article 159 of the Constitution of Kenya to resolve civil and community land disputes peacefully.',
    order: 11,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u6-l2',
    subStrandId: 'substrand-g6-soc-u6',
    title: 'Cultural Artefacts, Indigenous Ceremonies & National Heritage',
    content: 'Cultural heritage encompasses the traditions, artefacts, languages, and artistic expressions passed down through generations.\n\n1. Indigenous Education and Apprenticeship:\n- In traditional societies, education was lifelong, informal, and practical.\n- Taught through oral literature (stories, proverbs, riddles, songs, legends) around evening fires.\n- Skills passed by observation and hands-on apprenticeship: boys learned iron smelting, hunting, herding, and building from fathers; girls learned pottery, basketry, cooking, farming, and childcare from mothers.\n- Core values instilled: respect for elders, honesty, bravery, generosity, and hard work.\n\n2. Cultural Artefacts of Eastern Africa:\n- Tools and weapons: Iron spears (ngere), shields (ndome), bows and arrows, blacksmith anvils, digging hoes.\n- Domestic items: Gourds (calabashes), wooden stools, grain storage granaries, grinding stones, clay cooking pots.\n- Musical instruments: Nyatiti lyre (Luo), Kayamba shaker (Mijikenda), Isukuti drum (Luhya), wandindi fiddle (Agikuyu).\n- Regalia and ornaments: Beadwork necklaces (Maasai and Samburu), colobus monkey skin cloaks, elder flywhisks (rungu and chondo).\n\n3. Indigenous Ceremonies and Festivals:\n- Rites of Passage: Birth and naming, initiation into adulthood, marriage celebrations, and funeral rituals.\n- Harvest Festivals: Offering thanksgiving to God (Ngai, Enkai, Nyasaye, Asis) for abundant grain and livestock.\n- Rainmaking ceremonies led by spiritual leaders during prolonged dry seasons.\n\n4. Preserving Cultural Heritage in Modern Kenya:\n- Establishing national museums, cultural centers (Bomas of Kenya), and archive libraries.\n- Annual Kenya National Music and Drama Festivals in schools celebrating diverse ethnic folklore.\n- Preserving UNESCO World Heritage Sites (e.g. Fort Jesus, Lamu Old Town, Sacred Mijikenda Kaya Forests).',
    didYouKnow: 'The Sacred Mijikenda Kaya Forests in coastal Kenya are fortified hilltop forest clearings where coastal ancestors lived and worshipped, recognized by UNESCO as World Cultural Heritage Sites!',
    kenyanContext: 'At Bomas of Kenya in Nairobi, visitors can tour authentic traditional homestead models from all 44 Kenyan ethnic communities and watch live cultural acrobatic dances.',
    order: 12,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  }
];

lessons.forEach(l => {
  if (!db.lessons.some(existing => existing.id === l.id)) {
    db.lessons.push(l);
    console.log('Added lesson:', l.id);
  }
});

// 3. Missions 49 to 52 (world-kenya-explorer)
const missions = [
  {
    id: 'mission-g6-soc-u5-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 49: Migration Pathways – Language Groups of Eastern Africa',
    description: 'Trace the epic historical journeys of Bantu, Nilotes, Cushites, and Semites into Eastern Africa.',
    order: 49,
    orderIndex: 49,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-historian',
    badge: 'badge-g6-soc-historian',
    lessonId: 'lesson-g6-soc-u5-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u5-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u5-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 50: People & Plains – Demographics & Urban Centers',
    description: 'Map high density fertile highlands, bustling urban corridors, and pastoral ASAL landscapes.',
    order: 50,
    orderIndex: 50,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-demographer',
    badge: 'badge-g6-soc-demographer',
    lessonId: 'lesson-g6-soc-u5-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u5-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u6-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 51: Council of Elders – Traditional African Governance',
    description: 'Discover the wisdom of the Njuri Ncheke, Kiama, Orkoiyot, and the bravery of Maasai Morans.',
    order: 51,
    orderIndex: 51,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-elder-wisdom',
    badge: 'badge-g6-soc-elder-wisdom',
    lessonId: 'lesson-g6-soc-u6-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u6-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u6-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 52: Sacred Kayas & Lyres – Living Cultural Heritage',
    description: 'Celebrate indigenous oral education, Mijikenda sacred Kayas, Nyatiti lyres, and Kenyan cultural unity.',
    order: 52,
    orderIndex: 52,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-heritage-champion',
    badge: 'badge-g6-soc-heritage-champion',
    lessonId: 'lesson-g6-soc-u6-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u6-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  }
];

missions.forEach(m => {
  if (!db.missions.some(existing => existing.id === m.id)) {
    db.missions.push(m);
    console.log('Added mission:', m.id);
  }
});

// 4. Questions: 48 Questions
const questions = [
  // Mission 49 (Unit 5 Lesson 1: q-g6-soc-u5-001 to 012)
  {
    id: 'q-g6-soc-u5-001',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'What was the cradle land (point of origin) of the Bantu-speaking people before their migration into Eastern Africa?',
    options: [
      'The Congo Basin and Cameroon-Nigeria borderlands',
      'The Bahr-el-Ghazal region in South Sudan',
      'The Horn of Africa in Somalia',
      'The Arabian Peninsula'
    ],
    correctAnswer: 'The Congo Basin and Cameroon-Nigeria borderlands',
    explanation: 'Linguistic and archaeological evidence confirms the ancestral homeland of all Bantu languages was the forest margins between Cameroon and the Congo Basin.',
    socraticHint: 'Which central/west African forested region near the Congo Basin and Cameroon was the origin of the Bantu?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-002',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'From which historical region in South Sudan did the Nilotic language group migrate into Eastern Africa?',
    options: [
      'Bahr-el-Ghazal',
      'Congo Basin',
      'Ras Hafun',
      'Mount Kilimanjaro'
    ],
    correctAnswer: 'Bahr-el-Ghazal',
    explanation: 'The Nilotes trace their ancestral homeland to the Bahr-el-Ghazal floodplains along the Nile tributaries in South Sudan.',
    socraticHint: 'Which riverine region in South Sudan was the dispersal cradle of the River-Lake, Plains, and Highland Nilotes?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-003',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which of the following communities in Kenya belongs to the Highland Nilotes?',
    options: [
      'Kalenjin (Kipsigis, Nandi, Tugen, Marakwet, Pokot)',
      'Luo',
      'Maasai',
      'Turkana'
    ],
    correctAnswer: 'Kalenjin (Kipsigis, Nandi, Tugen, Marakwet, Pokot)',
    explanation: 'The Kalenjin communities settled in the high Rift Valley escarpments and Mau highlands, forming the Highland Nilotic group.',
    socraticHint: 'Which community living in the highlands of western Rift Valley includes the Nandi and Kipsigis?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-004',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which major language group in Eastern Africa includes the Somali, Borana, Oromo, Rendille, and Gabbra communities?',
    options: [
      'The Cushites',
      'The Bantu',
      'The Nilotes',
      'The Semites'
    ],
    correctAnswer: 'The Cushites',
    explanation: 'The Cushites originated in the Horn of Africa and are adapted to pastoralism in the arid and semi-arid lands of northern and eastern Kenya.',
    socraticHint: 'Which language group originated in the Horn of Africa and specializes in camel and livestock pastoralism?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-005',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'What was the primary push factor that drove ancient communities to migrate from their ancestral homelands into Eastern Africa?',
    options: [
      'Severe droughts, famine, population pressure, and clan conflicts',
      'Searching for high-speed train tickets',
      'Desire to build tall glass skyscrapers',
      'Searching for internet networks'
    ],
    correctAnswer: 'Severe droughts, famine, population pressure, and clan conflicts',
    explanation: 'Scarcity of farming land, animal pasture, natural disasters, epidemics, and internal family disagreements pushed groups to seek new territory.',
    socraticHint: 'What natural and social hardships forced ancient farming and herding families to move away from home?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-006',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which group of Eastern Bantu settled at Shungwaya before migrating along the coast and highlands of Kenya?',
    options: [
      'Mijikenda, Pokomo, and Taita',
      'Abagusii and Kuria',
      'Turkana and Karamojong',
      'Rendille and Gabbra'
    ],
    correctAnswer: 'Mijikenda, Pokomo, and Taita',
    explanation: 'Oral traditions trace the coastal Eastern Bantu (the nine Mijikenda groups and Pokomo) through Shungwaya before dispersing along the Kenyan coast.',
    socraticHint: 'Which coastal Bantu group consists of nine closely related sub-tribes who settled along the coastal ridge from Shungwaya?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-007',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'What major economic innovation did the Bantu introduce across Eastern Africa that revolutionized agriculture and toolmaking?',
    options: [
      'Iron smelting and iron tool technology (hoes, machetes, axes, spears)',
      'Steam locomotives and railway engines',
      'Plastic moulding and computer chips',
      'Nuclear reactors'
    ],
    correctAnswer: 'Iron smelting and iron tool technology (hoes, machetes, axes, spears)',
    explanation: 'Bantu iron technology enabled clearing of dense forests and more efficient farming, spurring dramatic population growth.',
    socraticHint: 'Which metal-working skill allowed early farmers to forge strong hoes and axes to clear thick bushland?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-008',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which cultural practice was adopted by many Bantu communities through historical interaction with Cushitic and Nilotic neighbors?',
    options: [
      'Age-set organization and circumcision rites of passage',
      'Growing rice in flooded paddies',
      'Writing books in Latin script',
      'Building wooden dhows for deep sea fishing'
    ],
    correctAnswer: 'Age-set organization and circumcision rites of passage',
    explanation: 'Historical assimilation and contact led central and highland Bantu groups to adopt age-sets, circumcision, and military organization from Cushites and Nilotes.',
    socraticHint: 'Which social system of organizing youth and elders did highland Bantu adopt from their interaction with pastoralists?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-009',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which language group includes the Amhara and Tigray in Ethiopia, who trace linguistic ties to the Arabian Peninsula across the Red Sea?',
    options: [
      'The Semites',
      'The Bantu',
      'The Nilotes',
      'The Khoisan'
    ],
    correctAnswer: 'The Semites',
    explanation: 'Semitic languages in Eastern Africa (such as Amharic, Tigrinya, and Arabic) originated from historical contacts between the Horn of Africa and southwest Asia.',
    socraticHint: 'What linguistic family connects Amharic in Ethiopia with Arabic and Hebrew across the Red Sea?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-010',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'What was the primary traditional economic livelihood of the River-Lake Nilotes (the Luo) upon settling around Lake Victoria?',
    options: [
      'Fishing in the lake, mixed farming (sorghum, millet), and cattle keeping',
      'Camel breeding in desert oases',
      'Deep sea whale hunting',
      'Commercial coffee plantation ownership'
    ],
    correctAnswer: 'Fishing in the lake, mixed farming (sorghum, millet), and cattle keeping',
    explanation: 'Settling along the shores of Lake Victoria (Nam Lolwe), the Luo developed advanced freshwater fishing alongside livestock herding and grain farming.',
    socraticHint: 'Which three economic activities did the Luo practice along the fertile shores of Lake Victoria?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-011',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'How did historical trade between different language groups in pre-colonial Kenya foster mutual peaceful coexistence?',
    options: [
      'Pastoralists and farmers held regular barter markets to exchange surplus goods (grains for milk and hides), forming inter-ethnic alliances',
      'They built high stone walls to never look at each other',
      'They only met during wars',
      'Trade was prohibited by community laws'
    ],
    correctAnswer: 'Pastoralists and farmers held regular barter markets to exchange surplus goods (grains for milk and hides), forming inter-ethnic alliances',
    explanation: 'Complementary economic needs encouraged mutual barter trade; farmers needed animals and hides, while pastoralists needed grain and pottery.',
    socraticHint: 'How did farmers needing milk and herders needing grains create friendly inter-community trading bonds?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-012',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l1',
    text: 'Which community in Kenya represents the Southern Cushitic language branch, with ancient roots in the coastal and lower Tana region?',
    options: [
      'Dahalo',
      'Kikuyu',
      'Maasai',
      'Luo'
    ],
    correctAnswer: 'Dahalo',
    explanation: 'The Dahalo are a small Southern Cushitic-speaking hunter-gatherer group living near the mouth of the Tana River in coastal Kenya.',
    socraticHint: 'Which small indigenous community living near the Tana delta is Kenya’s only surviving Southern Cushitic speaker?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 50 (Unit 5 Lesson 2: q-g6-soc-u5-013 to 024)
  {
    id: 'q-g6-soc-u5-013',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'What is the formula used by demographers to calculate the population density of a county or nation?',
    options: [
      'Total population divided by total surface land area in square kilometres',
      'Total population multiplied by total land area',
      'Number of hospitals divided by number of schools',
      'Total number of births minus total deaths'
    ],
    correctAnswer: 'Total population divided by total surface land area in square kilometres',
    explanation: 'Population Density = Total Population ÷ Total Area (km²). It measures how crowded an area is.',
    socraticHint: 'If you want to find people per square kilometre, do you divide total people by total area?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-014',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Which county in Kenya has one of the highest rural population densities, with intensive terraced smallholder farming on nearly all hillsides?',
    options: [
      'Kisii County',
      'Turkana County',
      'Marsabit County',
      'Garissa County'
    ],
    correctAnswer: 'Kisii County',
    explanation: 'Kisii County has a very high rural density (exceeding 900 people/km²) due to fertile volcanic soils and reliable double-rainfall seasons.',
    socraticHint: 'Which fertile western highland county known for soapstone carving has very high farming population density?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-015',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Why do counties in northern Kenya (such as Marsabit, Turkana, and Wajir) have very low population density?',
    options: [
      'Arid climate, erratic rainfall under 250 mm, poor sandy soils, and scarce drinking water',
      'The government prohibited people from living there',
      'The region is completely submerged in water',
      'Wild polar bears occupy the territory'
    ],
    correctAnswer: 'Arid climate, erratic rainfall under 250 mm, poor sandy soils, and scarce drinking water',
    explanation: 'Extreme dryness and limited pasture require pastoralists to spread out across vast landscapes, resulting in densities below 15 people/km².',
    socraticHint: 'What harsh environmental conditions make northern drylands sparsely populated?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-016',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'What major pull factor attracts thousands of young people from rural villages to migrate to Nairobi and Mombasa each year?',
    options: [
      'Employment opportunities, modern infrastructure, higher education institutions, and commerce',
      'Cheaper firewood in city streets',
      'Larger parcels of agricultural land in downtown avenues',
      'Complete absence of taxes'
    ],
    correctAnswer: 'Employment opportunities, modern infrastructure, higher education institutions, and commerce',
    explanation: 'Major cities offer commercial jobs, manufacturing, universities, and specialized medical facilities that pull rural migrants.',
    socraticHint: 'What economic opportunities and career aspirations draw people to live in large cities?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-017',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'What severe urban challenge is caused by rapid unplanned rural-to-urban migration in cities like Nairobi and Kampala?',
    options: [
      'Proliferation of informal settlements (slums), traffic congestion, and strain on water and sewer systems',
      'Excess agricultural farmland inside city centres',
      'Cities running out of mobile phones',
      'Temperatures dropping to freezing snow levels'
    ],
    correctAnswer: 'Proliferation of informal settlements (slums), traffic congestion, and strain on water and sewer systems',
    explanation: 'When urban migration outpaces housing construction, basic amenities like water, sanitation, and health facilities become overwhelmed.',
    socraticHint: 'What happens to city housing and clean water supplies when millions move in faster than infrastructure can be built?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-018',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Which historical disease vector in the central woodlands of Tanzania caused large areas to remain sparsely populated by humans and cattle?',
    options: [
      'Tsetse flies transmitting sleeping sickness (trypanosomiasis)',
      'Locusts eating trees',
      'Armyworms eating grass',
      'Termites eating houses'
    ],
    correctAnswer: 'Tsetse flies transmitting sleeping sickness (trypanosomiasis)',
    explanation: 'Tsetse fly-infested miombo woodlands deterred both human settlement and cattle herding across central Tanzania.',
    socraticHint: 'Which biting fly transmits trypanosomiasis (sleeping sickness) in cattle and humans?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-019',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'How has devolution under Kenya’s 2010 Constitution helped reduce rural-urban migration pressure on Nairobi?',
    options: [
      'County governments now build hospitals, roads, markets, and vocational colleges in all 47 county headquarters',
      'County governments built physical border gates stopping travel between counties',
      'Nairobi banned people from other counties',
      'County governments closed all rural schools'
    ],
    correctAnswer: 'County governments now build hospitals, roads, markets, and vocational colleges in all 47 county headquarters',
    explanation: 'Decentralized funding has created commercial and administrative growth poles in county capitals like Lodwar, Garissa, Kitale, and Nyeri.',
    socraticHint: 'How does bringing government services, hospitals, and budgets to county capitals create local jobs?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-020',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Which Eastern African country has the highest overall national population density, with over 500 people per square kilometre across its fertile hills?',
    options: [
      'Rwanda',
      'Sudan',
      'Somalia',
      'Tanzania'
    ],
    correctAnswer: 'Rwanda',
    explanation: 'Rwanda ("the Land of a Thousand Hills") is the most densely populated country in continental Africa, with intense terraced farming.',
    socraticHint: 'Which small highland East African nation known as the "Land of a Thousand Hills" is the most densely populated in Africa?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-021',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'What is a national population census, and how often is it conducted in Kenya by the Kenya National Bureau of Statistics (KNBS)?',
    options: [
      'An official count and demographic survey of all people living in the country, conducted every 10 years',
      'A count of all cars on highways, conducted every week',
      'An election of members of parliament, conducted every year',
      'A count of livestock at abattoirs, conducted monthly'
    ],
    correctAnswer: 'An official count and demographic survey of all people living in the country, conducted every 10 years',
    explanation: 'A national census counts all residents every 10 years (e.g. 1999, 2009, 2019) to provide accurate data for resource allocation and planning.',
    socraticHint: 'How often does Kenya conduct the comprehensive national door-to-door population census (every decade)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-022',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Why is accurate population census data crucial for the national and county governments of Kenya?',
    options: [
      'It guides equitable budget allocation for schools, healthcare clinics, clean water projects, and road networks',
      'To decide which citizens should be deported',
      'To force everyone to wear the same uniform',
      'To increase prices of groceries arbitrarily'
    ],
    correctAnswer: 'It guides equitable budget allocation for schools, healthcare clinics, clean water projects, and road networks',
    explanation: 'Governments need accurate numbers on age, gender, and regional distribution to build sufficient schools, recruit teachers, and distribute medical supplies.',
    socraticHint: 'Why must government planners know the exact number of school-age children living in each sub-county?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-023',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'What demographic characteristic describes the population structure of Eastern Africa today?',
    options: [
      'A youthful population with over 60% of people below the age of 25 years',
      'An elderly population where most citizens are over 80 years old',
      'A population consisting entirely of foreign tourists',
      'A declining population with zero children being born'
    ],
    correctAnswer: 'A youthful population with over 60% of people below the age of 25 years',
    explanation: 'High birth rates have created a broad-based population pyramid where young people make up the vast majority of the population.',
    socraticHint: 'Do children and youth make up the largest proportion of Kenya’s population or are most citizens senior retirees?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u5-024',
    subStrandId: 'substrand-g6-soc-u5',
    lessonId: 'lesson-g6-soc-u5-l2',
    text: 'Which transport corridor in Kenya has historically formed a continuous high-density population belt from the coast to the western border?',
    options: [
      'The Northern Transport Corridor linking Mombasa, Nairobi, Nakuru, Eldoret, Kisumu, and Malaba',
      'The desert road between Lodwar and Lokichogio',
      'The ocean sea lane between Lamu and Mogadishu',
      'The pipeline route between Marsabit and Moyale'
    ],
    correctAnswer: 'The Northern Transport Corridor linking Mombasa, Nairobi, Nakuru, Eldoret, Kisumu, and Malaba',
    explanation: 'The historical railway and highway corridor opened agricultural highlands to markets, concentrating towns and settlements along its spine.',
    socraticHint: 'Which historic transport spine running from Mombasa through Nairobi to the Uganda border anchors Kenya’s largest towns?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 51 (Unit 6 Lesson 1: q-g6-soc-u6-001 to 012)
  {
    id: 'q-g6-soc-u6-001',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What was the primary function of a traditional Council of Elders in indigenous African communities?',
    options: [
      'Arbitrating disputes, dispensing customary justice, maintaining social peace, and offering prayers for the community',
      'Collecting income taxes on behalf of foreign kings',
      'Building stone skyscrapers for commercial rent',
      'Playing musical instruments in private houses only'
    ],
    correctAnswer: 'Arbitrating disputes, dispensing customary justice, maintaining social peace, and offering prayers for the community',
    explanation: 'Respected elders served as lawmakers, judges, spiritual intercessors, and guardians of moral harmony in traditional society.',
    socraticHint: 'What leadership and judicial roles did village elders play when land disagreements or cattle disputes arose?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-002',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What is the name of the prestigious traditional Supreme Council of Elders of the Ameru community in Kenya?',
    options: [
      'Njuri Ncheke',
      'Kiama kia Ma',
      'Orkoiyot',
      'Ruoth'
    ],
    correctAnswer: 'Njuri Ncheke',
    explanation: 'The Njuri Ncheke is the apex council of elders of the Ameru people, renowned for customary law and community leadership.',
    socraticHint: 'Which revered Meru council of elders meets at the sacred shrine of Nchiru?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-003',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'In pastoralist communities like the Maasai and Samburu, what was the primary responsibility of the young initiated warrior age-set (Morans)?',
    options: [
      'Defending the community, scouting for green grazing pastures, and guarding cattle herds',
      'Farming rice in irrigation schemes',
      'Cooking meals for village babies',
      'Staying indoors throughout the year'
    ],
    correctAnswer: 'Defending the community, scouting for green grazing pastures, and guarding cattle herds',
    explanation: 'Morans were the standing defense force, trained in weaponry and wilderness survival to protect livestock and defend territory.',
    socraticHint: 'What vital military and protection duties did young Maasai warriors (morans) carry out for their community?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-004',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What is an "age-set" in traditional African social organization?',
    options: [
      'A permanent social group of peers initiated together who progress through life stages (youth, warriors, elders) together',
      'A list of birthdays kept in a library',
      'A group of people who own the same color of car',
      'People born in different centuries who never meet'
    ],
    correctAnswer: 'A permanent social group of peers initiated together who progress through life stages (youth, warriors, elders) together',
    explanation: 'An age-set bonded peers for life; they shared mutual loyalty, entered adulthood together, and graduated to elder status collectively.',
    socraticHint: 'What social brotherhood bonded initiated peers together through life from young warriors to wise elders?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-005',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What was the traditional title of the supreme spiritual and prophetic leader among the Nandi community?',
    options: [
      'Orkoiyot',
      'Ruoth',
      'Nabongo',
      'Mukama'
    ],
    correctAnswer: 'Orkoiyot',
    explanation: 'The Orkoiyot (such as Koitalel arap Samoei) was the revered spiritual diviner, prophet, and supreme advisor of the Nandi.',
    socraticHint: 'What title was held by the spiritual diviner and anti-colonial leader Koitalel arap Samoei?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-006',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'Under which sacred tree did elders in central Kenya traditionally assemble to conduct judicial hearings and offer communal sacrifices?',
    options: [
      'The Mugumo tree (strangler fig)',
      'The Eucalyptus tree',
      'The Pine tree',
      'The Jacaranda tree'
    ],
    correctAnswer: 'The Mugumo tree (strangler fig)',
    explanation: 'The Mugumo tree was venerated as a sacred cathedral of nature where elders communed with God (Ngai) and administered justice.',
    socraticHint: 'Which giant indigenous wild fig tree was held sacred for worship and council meetings in central Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-007',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What was the role of the Nabongo among the Wanga kingdom of the Luhya community in western Kenya?',
    options: [
      'He was a hereditary king (monarch) who ruled over the kingdom with royal advisers and clan chiefs',
      'He was a commercial boat ferryman on Lake Naivasha',
      'He was a foreign trader selling beads',
      'He was an apprentice blacksmith'
    ],
    correctAnswer: 'He was a hereditary king (monarch) who ruled over the kingdom with royal advisers and clan chiefs',
    explanation: 'The Wanga kingdom (centered at Mumias) was unique in pre-colonial Kenya for having a centralized monarch called the Nabongo (e.g. Nabongo Mumia).',
    socraticHint: 'Which royal title belonged to the hereditary king of the Wanga kingdom in western Kenya?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-008',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'How does modern Kenyan law support the traditional role of clan councils of elders under Article 159 of the Constitution?',
    options: [
      'It formally recognizes Alternative Dispute Resolution (ADR) and traditional mediation for resolving family and community civil disputes',
      'It replaces the Supreme Court with village elders',
      'It bans elders from ever speaking in public',
      'It requires elders to join the armed forces'
    ],
    correctAnswer: 'It formally recognizes Alternative Dispute Resolution (ADR) and traditional mediation for resolving family and community civil disputes',
    explanation: 'Article 159(2)(c) encourages courts to promote alternative dispute resolution, including traditional dispute resolution mechanisms consistent with human rights.',
    socraticHint: 'Does the Constitution encourage traditional mediation and dispute resolution out of court to reduce litigation delays?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-009',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What was the social importance of the clan in traditional African land ownership?',
    options: [
      'Land was held communally by the clan as a sacred ancestral trust and allocated to individual families according to need',
      'Land was sold on internet real estate websites',
      'Only foreign traders were allowed to own land',
      'Land was owned exclusively by young children'
    ],
    correctAnswer: 'Land was held communally by the clan as a sacred ancestral trust and allocated to individual families according to need',
    explanation: 'Clan land was communal property belonging to the past ancestors, living members, and future unborn generations.',
    socraticHint: 'Did the clan hold land communally for the welfare of all member families, or was it sold to individual speculators?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-010',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What traditional principle guided community mutual assistance (such as building a neighbor’s house, weeding farms together, or raising hospital funds) in Kenya?',
    options: [
      'Harambee (pulling together / collective solidarity)',
      'Individual isolation',
      'Commercial banking loans',
      'Foreign aid dependency'
    ],
    correctAnswer: 'Harambee (pulling together / collective solidarity)',
    explanation: 'Harambee reflects the deep African ethic of collective responsibility, where communal effort overcomes individual hardship.',
    socraticHint: 'What famous Kenyan motto meaning "let us pull together" originated from traditional communal working parties?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-011',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'What was the traditional role of maternal uncles and aunts in the extended family system?',
    options: [
      'Providing ethical counsel, mentoring youth during initiation, and participating in marriage negotiations',
      'Charging rent for living in the village',
      'Reporting village secrets to neighboring enemies',
      'Serving as foreign ambassadors'
    ],
    correctAnswer: 'Providing ethical counsel, mentoring youth during initiation, and participating in marriage negotiations',
    explanation: 'Uncles and aunts acted as secondary parents, instilling wisdom, counseling nieces and nephews, and strengthening clan ties.',
    socraticHint: 'How did maternal relatives and extended family share in raising and counseling children into adulthood?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-012',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l1',
    text: 'Which traditional leader among the Giriama community of the Kenyan coast led a heroic armed resistance against British colonial rule in 1913?',
    options: [
      'Mekatilili wa Menza',
      'Koitalel arap Samoei',
      'Waiyaki wa Hinga',
      'Mumia wa Nabongo'
    ],
    correctAnswer: 'Mekatilili wa Menza',
    explanation: 'Mekatilili wa Menza was an inspiring Giriama matriarch and elder who administered traditional oaths to resist British forced labor and colonial taxation.',
    socraticHint: 'Which brave Giriama woman elder led the anti-colonial resistance at the coast using traditional kinyenze oaths?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 52 (Unit 6 Lesson 2: q-g6-soc-u6-013 to 024)
  {
    id: 'q-g6-soc-u6-013',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'How was traditional African education primarily delivered to children in pre-colonial communities?',
    options: [
      'Informally through storytelling, proverbs, riddles, songs, observation, and hands-on apprenticeship',
      'In brick classrooms with written exams on paper',
      'Through computerized video streaming lessons',
      'By foreign university professors'
    ],
    correctAnswer: 'Informally through storytelling, proverbs, riddles, songs, observation, and hands-on apprenticeship',
    explanation: 'Indigenous education was integrated into everyday life; children listened to elders’ folktales and learned skills by actively helping adults.',
    socraticHint: 'How did children learn values and trade skills before schools and printed books existed in Africa?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-014',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Which traditional stringed musical instrument is an eight-stringed lyre played by the Luo community during cultural celebrations and praise poetry?',
    options: [
      'Nyatiti',
      'Kayamba',
      'Isukuti',
      'Coro'
    ],
    correctAnswer: 'Nyatiti',
    explanation: 'The Nyatiti is a traditional 8-stringed bowl lyre plucked with both hands while the player taps a rhythm ring on their ankle.',
    socraticHint: 'Which iconic 8-stringed bowl lyre is played by Luo musicians with an ankle rattle ring?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-015',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'What are the Sacred Mijikenda Kaya Forests in coastal Kenya internationally recognized for by UNESCO?',
    options: [
      'As fortified ancestral forest villages of cultural and spiritual reverence recognized as World Heritage Sites',
      'As commercial timber logging plantations',
      'As commercial theme amusement parks',
      'As deep sea oil drilling terminals'
    ],
    correctAnswer: 'As fortified ancestral forest villages of cultural and spiritual reverence recognized as World Heritage Sites',
    explanation: 'The 11 separate Kaya forest sites contain sacred ancestral burial grounds, shrines, and Council meeting clearings protected by Mijikenda elders.',
    socraticHint: 'Why are the sacred hilltop Kaya forest clearings of the Mijikenda protected as UNESCO World Heritage sites?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-016',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Which cultural centre in Nairobi was founded by the government to preserve and showcase authentic traditional homesteads and dances of all Kenyan communities?',
    options: [
      'Bomas of Kenya',
      'Nairobi Safari Club',
      'Jomo Kenyatta International Airport',
      'Uhuru Park Pavilion'
    ],
    correctAnswer: 'Bomas of Kenya',
    explanation: 'Bomas of Kenya features replica homesteads (bomas) displaying the distinct architectural styles and daily life of Kenya’s diverse communities.',
    socraticHint: 'Which cultural village in Lang’ata features traditional mud-and-thatch homesteads from all over Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-017',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Which traditional percussion drum set is famously played by the Isukha and Idakho sub-tribes of the Luhya community during bullfighting contests and weddings?',
    options: [
      'Isukuti drums',
      'Kayamba',
      'Wandindi',
      'Marimba'
    ],
    correctAnswer: 'Isukuti drums',
    explanation: 'The Isukuti dance is performed with three fast-paced drums (mutambu, sukuti, and tsitsingiri) and is inscribed on UNESCO’s Intangible Cultural Heritage list.',
    socraticHint: 'Which famous fast-rhythm drum dance from Kakamega is recognized on the UNESCO Intangible Cultural Heritage list?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-018',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'What do the intricate beadwork colors worn by Maasai and Samburu women signify culturally?',
    options: [
      'Specific cultural symbols: red for bravery and blood, white for peace and milk, blue for sky and energy, green for fertile land',
      'Random factory leftovers',
      'The price of beads in the local market',
      'Which football team they support'
    ],
    correctAnswer: 'Specific cultural symbols: red for bravery and blood, white for peace and milk, blue for sky and energy, green for fertile land',
    explanation: 'Maasai beadwork is a visual language; each color carries precise spiritual, environmental, and social meanings.',
    socraticHint: 'What symbolic meanings do red (bravery/blood), white (peace/milk), and green (vegetation) carry in Maasai jewelry?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-019',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Why were traditional proverbs (methali) and riddles (vitendawili) used extensively by African elders when teaching young children?',
    options: [
      'To sharpen intellect, test memory, and teach moral wisdom in engaging, memorable ways',
      'To confuse children and make them cry',
      'Because elders did not know how to speak in normal words',
      'To keep foreigners from learning local recipes'
    ],
    correctAnswer: 'To sharpen intellect, test memory, and teach moral wisdom in engaging, memorable ways',
    explanation: 'Proverbs wrapped moral principles and critical reasoning into concise, poetic sayings that children remembered throughout adulthood.',
    socraticHint: 'How do riddles and proverbs train a child’s critical thinking and teach moral virtues?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-020',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Which historical coastal monument in Mombasa, built by the Portuguese in 1593, is preserved as a UNESCO World Heritage museum site in Kenya?',
    options: [
      'Fort Jesus',
      'Gedi Ruins',
      'Vasco da Gama Pillar',
      'Shimoni Slave Caves'
    ],
    correctAnswer: 'Fort Jesus',
    explanation: 'Fort Jesus was built by the Portuguese to guard Mombasa harbor and now serves as one of Kenya’s foremost historical museums.',
    socraticHint: 'Which coral-stone fortress built by the Portuguese in Mombasa in the 16th century is a World Heritage museum?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-021',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'What major value did traditional African ceremonies (such as harvest thanksgiving and naming rites) foster among community members?',
    options: [
      'Communal unity, mutual gratitude, spiritual reverence, and social solidarity',
      'Greed and hoarding of food supplies secretly',
      'Individual selfishness and contempt for neighbors',
      'Hatred for people of other age-sets'
    ],
    correctAnswer: 'Communal unity, mutual gratitude, spiritual reverence, and social solidarity',
    explanation: 'Shared celebrations brought clans together to feast, dance, renew family bonds, and offer collective thanksgiving for life.',
    socraticHint: 'How did community celebrations and collective feasts bring people together in joy and mutual support?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-022',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'Which traditional basketry artefact woven from sisal fiber is famously associated with the Akamba and Agikuyu communities and carried with a forehead strap?',
    options: [
      'Kiondo',
      'Mkeka',
      'Calabash',
      'Winnowing tray (Ungo)'
    ],
    correctAnswer: 'Kiondo',
    explanation: 'The Kiondo is a handwoven indigenous handbag made of sisal string, famous worldwide for its durability, patterns, and craftsmanship.',
    socraticHint: 'What is the indigenous name of the durable handwoven sisal handbag popular in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-023',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'How can primary school learners actively help safeguard Kenya’s diverse cultural heritage today?',
    options: [
      'Participating in school music and drama festivals, learning indigenous mother tongues, and respecting traditions of other communities',
      'Discarding all African songs and only watching foreign television',
      'Refusing to speak to grandparents',
      'Destroying traditional musical instruments'
    ],
    correctAnswer: 'Participating in school music and drama festivals, learning indigenous mother tongues, and respecting traditions of other communities',
    explanation: 'Cultural appreciation begins with learning oral traditions from elders, performing authentic folk arts, and fostering inter-ethnic respect.',
    socraticHint: 'How does celebrating traditional songs, dances, and languages in school festivals help preserve our heritage?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u6-024',
    subStrandId: 'substrand-g6-soc-u6',
    lessonId: 'lesson-g6-soc-u6-l2',
    text: 'What is the historic Old Town of Lamu recognized for as a UNESCO World Heritage Site in coastal Kenya?',
    options: [
      'The oldest continuously inhabited Swahili settlement in East Africa, built of coral stone and mangrove timber with carved wooden doors',
      'The largest automobile assembly plant in Africa',
      'A space rocket launch center',
      'The largest gold refinery in the Indian Ocean'
    ],
    correctAnswer: 'The oldest continuously inhabited Swahili settlement in East Africa, built of coral stone and mangrove timber with carved wooden doors',
    explanation: 'Lamu Old Town has retained its traditional Swahili urban architecture, narrow winding streets, donkey transport, and intricate carved doors for over 700 years.',
    socraticHint: 'Why is the historic island town of Lamu celebrated worldwide as an enduring cradle of Swahili architecture and culture?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  }
];

questions.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
  }
});

console.log(`Added ${questions.length} questions for Units 5 & 6.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 3 to cbe_database.json!');
