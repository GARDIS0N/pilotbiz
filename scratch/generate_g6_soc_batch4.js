/**
 * Grade 6 Social Studies - Batch 4 Generator
 * Content: Units 7 & 8
 * - Unit 7: Agriculture, Cash Crops, Dairy Farming & Pastoralism in Eastern Africa
 * - Unit 8: Mining, Forestry, Fisheries, Transport & EAC Regional Trade
 * Missions: Orders 53, 54, 55, 56 (world-kenya-explorer)
 * Questions: 48 (24 per unit: q-g6-soc-u7-001 to q-g6-soc-u8-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Social Studies Batch 4 (Units 7 & 8) ---');

// 1. Units 7 & 8 (subStrands)
const units = [
  {
    id: 'substrand-g6-soc-u7',
    strandId: 'strand-g6-soc-resources',
    learningAreaId: 'la-social-g6',
    title: 'Agriculture, Cash Crops, Dairy Farming & Pastoralism in Eastern Africa',
    name: 'Agriculture, Cash Crops, Dairy Farming & Pastoralism in Eastern Africa',
    description: 'Investigating major cash crops (tea, coffee, sugarcane, pyrethrum, cloves in Zanzibar, cut flowers in Naivasha); exploring livestock systems (commercial dairy farming, beef ranching, nomadic pastoralism); analyzing modern agricultural challenges (climate variability, pests, market fluctuations); and evaluating government interventions.',
    cbeCompetency: 'Agronomic economic reasoning, resource valuation, food security analysis, and agricultural enterprise appreciation',
    estimatedMinutes: 30,
    order: 7,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-soc-u8',
    strandId: 'strand-g6-soc-resources',
    learningAreaId: 'la-social-g6',
    title: 'Mining, Forestry, Fisheries, Transport & EAC Regional Trade',
    name: 'Mining, Forestry, Fisheries, Transport & EAC Regional Trade',
    description: 'Examining key mineral resources (soda ash at Magadi, limestone at Bamburi/Athi River, titanium at Kwale, fluorspar in Kerio Valley, gold in western Kenya/Tanzania); forestry and timber; marine and inland fisheries (Lake Victoria, Indian Ocean); transport networks (SGR, ports of Mombasa and Lamu, northern corridor); and regional trade cooperation under the East African Community (EAC).',
    cbeCompetency: 'Industrial resource appraisal, logistical infrastructure literacy, trade policy understanding, and regional economic integration',
    estimatedMinutes: 30,
    order: 8,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 7 & 8
const lessons = [
  // Unit 7
  {
    id: 'lesson-g6-soc-u7-l1',
    subStrandId: 'substrand-g6-soc-u7',
    title: 'Major Cash Crops of Eastern Africa: Production & Processing',
    content: 'Agriculture is the backbone of Eastern African economies, providing employment, food security, and foreign exchange earnings.\n\n1. Major Cash Crops:\n- Tea:\n  * Grown in high rainfall (1,200–2,000 mm), cool highlands with acidic volcanic soils.\n  * Leading areas: Kericho, Nandi, Bomet, Kisii, Kiambu, Murang’a, Nyeri, Meru.\n  * Kenya is the leading global exporter of black CTC tea.\n  * Smallholders organized under the Kenya Tea Development Agency (KTDA).\n- Coffee:\n  * Arabica coffee thrives in cool highlands (Kiambu, Nyeri, Kirinyaga, Kisii, Mt. Elgon, slopes of Mt. Kilimanjaro in Tanzania, Bugisu in Uganda).\n  * Robusta coffee grown in warmer, lower elevations (around Lake Victoria in Uganda).\n  * Hand-picked ripe red cherries processed by wet pulping in farmer cooperatives.\n- Sugarcane:\n  * Grown in warm, humid lowlands with heavy rainfall and flat land for machinery.\n  * Areas: Mumias, Chemelil, Muhoroni, Sony Sugar in Awendo, Kilombero in Tanzania, Kakira in Uganda.\n  * Crushed in sugar mills to produce granulated table sugar and molasses.\n- Cloves:\n  * A world-famous spice tree crop grown on the islands of Zanzibar and Pemba in Tanzania.\n  * Unopened flower buds are picked by hand and sun-dried for export.\n- Cut Flowers (Floriculture):\n  * Grown in computerized greenhouses around Lake Naivasha, Thika, and Eldoret.\n  * Fresh roses and carnations air-freighted daily from JKIA to European auction markets in the Netherlands.\n\n2. Contribution of Cash Crops:\n- Foreign exchange earnings strengthening national currencies.\n- Income for millions of rural smallholder farming families.\n- Raw materials for agro-processing factories.\n- Infrastructure development (feeder roads, rural electrification).',
    didYouKnow: 'Kenya is the largest exporter of black tea in the entire world, and the Port of Mombasa hosts the largest automated weekly tea auction on earth!',
    kenyanContext: 'Smallholder tea farmers belonging to KTDA factories receive monthly payments for green leaf deliveries and a substantial annual bonus payout that drives local rural development.',
    order: 13,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u7-l2',
    subStrandId: 'substrand-g6-soc-u7',
    title: 'Livestock Systems: Dairy Farming, Beef Ranching & Pastoralism',
    content: 'Livestock rearing is practiced across diverse ecological zones of Eastern Africa, from high-rainfall highlands to arid plains.\n\n1. Commercial Dairy Farming:\n- Concentrated in cool, fertile highlands (Nyandarua, Kiambu, Nandi, Uasin Gishu, Meru, Arusha).\n- High-yielding exotic dairy breeds: Friesian (Holstein), Ayrshire, Guernsey, Jersey, and improved crossbreeds.\n- Intensive management systems: Zero-grazing (stall feeding with chopped Napier grass and silage) and open paddock rotational grazing.\n- Milk collected by farmer cooperative societies and processed into pasteurized milk, yoghurt, cheese, and butter (e.g. New KCC, Brookside).\n\n2. Beef Ranching:\n- Large-scale commercial cattle rearing on extensive savannah grasslands.\n- Areas: Machakos, Laikipia, Kajiado, Nakuru, Taita Taveta, and parts of central Tanzania.\n- Breeds: Boran, Sahiwal, Zebu, and crosses like Charolais and Hereford.\n- Animals fattened and slaughtered at modern abattoirs like the Kenya Meat Commission (KMC) in Athi River.\n\n3. Nomadic Pastoralism:\n- Practiced in Arid and Semi-Arid Lands (ASALs) by communities like Maasai, Samburu, Turkana, Borana, Somali, and Karamojong.\n- Livestock: Zebu cattle, fat-tailed sheep, East African goats, and camels (dromedaries).\n- Characterized by seasonal migration (transhumance) in search of water points and green pasture.\n- Challenges: Prolonged droughts caused by climate change, cattle diseases (East Coast Fever, rinderpest, anthrax), livestock rustling, and limited access to veterinary care and formal markets.',
    didYouKnow: 'The Boran cattle breed was developed in northern Kenya and southern Ethiopia; it has exceptional natural immunity to ticks and can walk long distances without water in scorching heat!',
    kenyanContext: 'In Kenya’s ASAL counties, camels are increasingly prized because they can produce nutritious milk during severe dry seasons when cattle stop lactating entirely.',
    order: 14,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },

  // Unit 8
  {
    id: 'lesson-g6-soc-u8-l1',
    subStrandId: 'substrand-g6-soc-u8',
    title: 'Mining, Forestry & Marine and Inland Fisheries in Eastern Africa',
    content: 'Eastern Africa possesses diverse natural resource endowments that power industries and create jobs.\n\n1. Major Minerals and Mining Centers:\n- Soda Ash (Trona): Extracted from Lake Magadi in Kenya; used in glass manufacturing, detergents, and water softening; major export through Mombasa.\n- Limestone (Calcite): Quarried at Bamburi (Mombasa), Athi River (Machakos), and Hima (Uganda); essential raw material for manufacturing Portland cement for construction.\n- Titanium (Rutile, Ilmenite, Zircon): Heavy mineral sands mined at Kwale in coastal Kenya; used in aerospace paints and electronics.\n- Fluorspar: Mined in Kerio Valley (Elgeyo Marakwet); used as a flux in steel smelting and chemical industries.\n- Gold: Mined in western Kenya (Kakamega, Migori) and major commercial deposits in the Lake Victoria goldfields in northern Tanzania (Geita, Mwanza).\n- Gemstones: Tsavorite green garnet and rubies mined in Taita Taveta County.\n\n2. Forestry and Timber Resources:\n- Indigenous forests (hardwoods: mahogany, cedar, camphor, mvule) and softwood plantation forests (pine, cypress, eucalyptus).\n- Major timber mills in Webuye, Eldoret, Molo, and Sao Hill in southern Tanzania.\n- Used for furniture, construction timber, utility transmission poles, and paper.\n\n3. Fisheries:\n- Inland Freshwater Fisheries: Lake Victoria (over 80% of Kenya’s catch: Nile perch, tilapia, omena/dagaa), Lake Turkana, Lake Naivasha, Lake Baringo, and aquaculture fish ponds.\n- Marine (Ocean) Fisheries: Coast of Kenya and Tanzania (Indian Ocean). Harvesting tuna, kingfish, prawns, lobsters, red snapper, and crabs.\n- Challenges: Overfishing using illegal small-mesh nets, water hyacinth weed, post-harvest spoilage due to lack of cold storage facilities, and foreign trawlers in Exclusive Economic Zones (EEZ).',
    didYouKnow: 'Tanzania is the only place on earth where the rare, sparkling deep-blue gemstone Tanzanite is naturally found, mined exclusively in the Mererani hills near Mount Kilimanjaro!',
    kenyanContext: 'At Bamburi in Mombasa, the old exhausted limestone quarry was brilliantly rehabilitated by Dr. René Haller into Haller Park, a world-famous lush ecological sanctuary home to giant Aldabra tortoises and hippos.',
    order: 15,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u8-l2',
    subStrandId: 'substrand-g6-soc-u8',
    title: 'Transport Systems, Communication & EAC Regional Integration',
    content: 'Trade and industrial progress depend on efficient transport networks and regional economic partnerships.\n\n1. Transport Networks in Eastern Africa:\n- Railway Transport: Modern Standard Gauge Railway (SGR) connecting Mombasa to Nairobi and Suswa, carrying millions of passengers and freight containers; meter-gauge lines connecting to Uganda.\n- Road Transport: The Northern Corridor highway running from Mombasa through Nairobi, Eldoret, and Malaba to Uganda, Rwanda, and DR Congo.\n- Sea Ports: Port of Mombasa (Kilindini Harbour) and modern deep-water Port of Lamu (part of LAPSSET project); Port of Dar es Salaam in Tanzania.\n- Air Transport: Major international hubs at Jomo Kenyatta International Airport (JKIA) in Nairobi, Entebbe in Uganda, Bole in Addis Ababa, and Julius Nyerere in Dar es Salaam.\n- Inland Water Transport: Ferries on Lake Victoria linking Kisumu, Port Bell (Kampala), and Mwanza.\n- Pipelines: Kenya Pipeline transporting refined petroleum from Mombasa to Nairobi, Nakuru, Eldoret, and Kisumu.\n\n2. The East African Community (EAC):\n- Regional intergovernmental organization currently comprising 8 partner states: Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, Democratic Republic of the Congo (DRC), and Somalia.\n- Headquarters: Arusha, Tanzania.\n- Four Pillars of Integration:\n  1. Customs Union (zero internal tariffs on goods manufactured within EAC).\n  2. Common Market (free movement of goods, persons, labor, services, and capital).\n  3. Monetary Union (working towards a single common East African currency).\n  4. Political Federation (ultimate goal of a united East African state).\n\n3. Benefits of EAC Regional Trade:\n- Expanded market of over 300 million consumers for Kenyan manufactured goods.\n- Free movement of skilled professionals (teachers, doctors, engineers) across borders.\n- Joint infrastructure projects (One-Stop Border Posts like Namanga, Busia, and Malaba eliminating customs delays).',
    didYouKnow: 'With the admission of the Democratic Republic of the Congo (DRC) and Somalia, the East African Community now stretches all the way from the Atlantic Ocean basin to the Indian Ocean!',
    kenyanContext: 'The One-Stop Border Post (OSBP) at Busia and Namanga allows immigration and customs officers from Kenya and Uganda to sit under one roof, cutting truck border crossing times from 3 days to under 2 hours.',
    order: 16,
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

// 3. Missions 53 to 56 (world-kenya-explorer)
const missions = [
  {
    id: 'mission-g6-soc-u7-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 53: Harvest of the Highlands – Cash Crop Champions',
    description: 'Explore green tea estates in Kericho, Arabica coffee in Nyeri, Naivasha roses, and Zanzibar cloves.',
    order: 53,
    orderIndex: 53,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-agri-champion',
    badge: 'badge-g6-soc-agri-champion',
    lessonId: 'lesson-g6-soc-u7-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u7-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u7-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 54: Herds of the Savanna – Dairy & Livestock Masters',
    description: 'Master high-yielding dairy zero-grazing, Boran beef ranching, and pastoral camel resilience in ASALs.',
    order: 54,
    orderIndex: 54,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-livestock-master',
    badge: 'badge-g6-soc-livestock-master',
    lessonId: 'lesson-g6-soc-u7-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u7-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u8-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 55: Wealth of the Earth – Mines, Timber & Deep Seas',
    description: 'Track Magadi soda ash, Kwale titanium, Lake Victoria tilapia, and coastal deep-sea fisheries.',
    order: 55,
    orderIndex: 55,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-resource-magnate',
    badge: 'badge-g6-soc-resource-magnate',
    lessonId: 'lesson-g6-soc-u8-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u8-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u8-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 56: SGR Express & EAC Horizons – Regional Trade Architects',
    description: 'Ride the Standard Gauge Railway, navigate the Northern Corridor, and build the 8-nation East African Community.',
    order: 56,
    orderIndex: 56,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-trade-architect',
    badge: 'badge-g6-soc-trade-architect',
    lessonId: 'lesson-g6-soc-u8-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u8-${String(i + 13).padStart(3, '0')}`),
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
  // Mission 53 (Unit 7 Lesson 1: q-g6-soc-u7-001 to 012)
  {
    id: 'q-g6-soc-u7-001',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Which country in Eastern Africa is the world’s leading exporter of black CTC tea?',
    options: [
      'Kenya',
      'Uganda',
      'Tanzania',
      'Rwanda'
    ],
    correctAnswer: 'Kenya',
    explanation: 'Kenya produces premium black cut-tear-curl (CTC) tea and is the world’s number one exporter, earning vital foreign exchange.',
    socraticHint: 'Which East African nation is world famous for lush green tea hills in Kericho and Nandi?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-002',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'What optimal environmental conditions are required for the commercial cultivation of Arabica coffee in Eastern Africa?',
    options: [
      'Cool temperatures, well-drained acidic volcanic soils, and reliable rainfall (1,000–1,500 mm) at high altitudes',
      'Hot desert sands with zero rainfall',
      'Salty waterlogged ocean marshes',
      'Constant freezing snow and blizzards'
    ],
    correctAnswer: 'Cool temperatures, well-drained acidic volcanic soils, and reliable rainfall (1,000–1,500 mm) at high altitudes',
    explanation: 'Highland volcanic soils and cool montane climates (1,400–2,000 m) provide the slow bean maturation needed for rich Arabica aroma.',
    socraticHint: 'Why does Arabica coffee thrive in the highlands of Kiambu, Nyeri, and Mount Elgon instead of coastal lowlands?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-003',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Which spice tree crop is historically grown on the islands of Zanzibar and Pemba in Tanzania, earning Zanzibar the nickname "The Spice Island"?',
    options: [
      'Cloves',
      'Pyrethrum',
      'Tea',
      'Sisal'
    ],
    correctAnswer: 'Cloves',
    explanation: 'Zanzibar and Pemba are world-renowned for clove production; dried aromatic flower buds are exported for spices and essential oils.',
    socraticHint: 'Which aromatic tree spice picked as unopened dried buds made Zanzibar famous worldwide?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-004',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Which body of water is surrounded by major greenhouse flower farms exporting fresh roses and carnations to Europe?',
    options: [
      'Lake Naivasha',
      'Lake Bogoria',
      'Lake Magadi',
      'Lake Turkana'
    ],
    correctAnswer: 'Lake Naivasha',
    explanation: 'Lake Naivasha provides fresh irrigation water and favorable highland sunshine for Kenya’s multi-million dollar floriculture export industry.',
    socraticHint: 'Which freshwater Rift Valley lake is the epicenter of Kenya’s fresh rose greenhouse farms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-005',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'What is the primary commercial use of pyrethrum flowers grown in high altitude areas like Nyandarua and Nakuru?',
    options: [
      'Extracting natural organic pyrethrin used in environmentally safe insecticides',
      'Making white paint for buildings',
      'Producing cooking oil',
      'Feeding dairy cows'
    ],
    correctAnswer: 'Extracting natural organic pyrethrin used in environmentally safe insecticides',
    explanation: 'Pyrethrum daisy flowers contain pyrethrins, natural active compounds that knock down insects without toxic chemical residues.',
    socraticHint: 'What organic insecticide chemical is extracted from white pyrethrum daisies?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-006',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Which organization manages processing factories, extension services, and marketing for over 600,000 smallholder tea farmers in Kenya?',
    options: [
      'Kenya Tea Development Agency (KTDA)',
      'Kenya Meat Commission (KMC)',
      'Kenya Wildlife Service (KWS)',
      'Kenya Airways (KQ)'
    ],
    correctAnswer: 'Kenya Tea Development Agency (KTDA)',
    explanation: 'KTDA operates over 70 tea factories owned by smallholder farmers, managing collection, processing, and global tea auction sales.',
    socraticHint: 'Which agency manages smallholder farmer tea factories and pays the annual tea bonus in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-007',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'In which lowland river basin and plains is large-scale sugarcane grown commercially in western Kenya?',
    options: [
      'The Nyando, Nzoia, and Yala river basins (Muhoroni, Chemelil, Mumias, Awendo)',
      'The Chalbi desert in Marsabit',
      'The top of Mount Kenya peak',
      'The sandy beaches of Diani'
    ],
    correctAnswer: 'The Nyando, Nzoia, and Yala river basins (Muhoroni, Chemelil, Mumias, Awendo)',
    explanation: 'Flat fertile lowlands, warm temperatures, and high rainfall around western river basins support extensive sugarcane plantations.',
    socraticHint: 'Which western Kenyan river valleys are home to major sugar belt milling companies like Chemelil and Sony Sugar?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-008',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'What major challenge has historically affected coffee farmers in Kenya, leading some to uproot coffee bushes?',
    options: [
      'Fluctuating global market prices, delayed payments by cooperatives, and coffee berry disease (CBD)',
      'Snow storms freezing all coffee trees',
      'People stopping drinking coffee worldwide',
      'Coffee beans spontaneously combusting'
    ],
    correctAnswer: 'Fluctuating global market prices, delayed payments by cooperatives, and coffee berry disease (CBD)',
    explanation: 'Price volatility on international commodities markets combined with cooperative mismanagement and fungal diseases poses hurdles for growers.',
    socraticHint: 'What economic and fungal pests have discouraged coffee farmers in cooperative societies?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-009',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'How does Kenya transport freshly harvested cut flowers to auction markets in the Netherlands and United Kingdom within 24 hours?',
    options: [
      'Direct cargo flights (air freight) departing daily from Jomo Kenyatta International Airport (JKIA)',
      'Slow cargo ships sailing around South Africa',
      'Bicycle couriers riding across the Sahara Desert',
      'Sending flowers through international post parcel'
    ],
    correctAnswer: 'Direct cargo flights (air freight) departing daily from Jomo Kenyatta International Airport (JKIA)',
    explanation: 'Because fresh cut flowers are highly perishable, temperature-controlled air cargo planes fly them directly to European flower auctions overnight.',
    socraticHint: 'Which fast transport method ensures delicate roses reach European buyers while still fresh and blooming?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-010',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Which crop produces strong fibrous leaves processed into sisal twine, ropes, and sacks, grown on large coastal and semi-arid estates (Voi, Kilifi, Mogotio)?',
    options: [
      'Sisal',
      'Tea',
      'Coffee',
      'Wheat'
    ],
    correctAnswer: 'Sisal',
    explanation: 'Sisal is a drought-hardy succulent whose tough leaves are decorticated to yield strong natural fiber used for ropes, mats, and sacking.',
    socraticHint: 'Which spiky drought-resistant plant is grown in Voi and Kilifi for making ropes and bags?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-011',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'Where is the vast majority of Kenya’s commercial wheat grown on large mechanized farms?',
    options: [
      'Narok, Uasin Gishu, Nakuru, and Timau (Meru)',
      'Mombasa and Lamu coastal sands',
      'Turkana and Mandera drylands',
      'Kakamega tropical rainforest'
    ],
    correctAnswer: 'Narok, Uasin Gishu, Nakuru, and Timau (Meru)',
    explanation: 'Cool temperate plateaus and fertile soils in Narok, Uasin Gishu, and Nakuru allow mechanized combine harvesters to cultivate wheat.',
    socraticHint: 'Which highland grain bowl counties in the Rift Valley produce wheat for baking flour?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-012',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l1',
    text: 'What major economic role do agricultural cooperative societies play for smallholder farmers in Kenya?',
    options: [
      'Bulk purchasing of farm inputs (fertilizers, seeds), providing affordable credit, and pooling produce for collective bargaining',
      'Forcing farmers to sell land to foreign companies',
      'Prohibiting children from attending school',
      'Confiscating farm produce without payment'
    ],
    correctAnswer: 'Bulk purchasing of farm inputs (fertilizers, seeds), providing affordable credit, and pooling produce for collective bargaining',
    explanation: 'Cooperatives give smallholder farmers collective power to buy inputs affordably, access credit, and negotiate higher prices for their crops.',
    socraticHint: 'How does pooling together into cooperative societies help small farmers get better prices for their harvest?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 54 (Unit 7 Lesson 2: q-g6-soc-u7-013 to 024)
  {
    id: 'q-g6-soc-u7-013',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Which exotic dairy cattle breed originated in the Netherlands and is recognized as the highest volume milk producer in Kenyan dairy farming?',
    options: [
      'Friesian (Holstein)',
      'Boran',
      'Zebu',
      'Galla'
    ],
    correctAnswer: 'Friesian (Holstein)',
    explanation: 'Friesian cows have distinctive black-and-white coats and produce the largest volume of milk per lactation among all dairy breeds.',
    socraticHint: 'Which black-and-white spotted European cow produces the highest volume of milk per day on dairy farms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-014',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What is "zero-grazing", and why is it increasingly practiced in densely populated highland counties like Kiambu and Kisii?',
    options: [
      'Keeping dairy cattle in stalls and bringing chopped fodder (Napier grass, silage) and water directly to them because land sizes are small',
      'Allowing cattle to roam freely without any human care',
      'Feeding cattle only dry sand and stones',
      'Keeping zero cattle on the farm'
    ],
    correctAnswer: 'Keeping dairy cattle in stalls and bringing chopped fodder (Napier grass, silage) and water directly to them because land sizes are small',
    explanation: 'Zero-grazing maximizes milk production on tiny land plots by confining cows, minimizing energy waste, and collecting valuable manure.',
    socraticHint: 'What dairy system keeps cows in shaded sheds and brings all chopped feed directly to them?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-015',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Which indigenous African beef cattle breed, developed in northern Kenya and Ethiopia, is celebrated for its natural tick resistance and tolerance to heat?',
    options: [
      'Boran',
      'Ayrshire',
      'Jersey',
      'Guernsey'
    ],
    correctAnswer: 'Boran',
    explanation: 'The Boran is a hardy humped zebu breed that thrives in dry savanna ranches, efficiently turning coarse grass into high-quality beef.',
    socraticHint: 'Which hardy, humped beef breed originating from northern Kenya is famous on beef ranches across Eastern Africa?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-016',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Why do pastoralist communities practice nomadic transhumance (seasonal migration with herds) in northern and eastern Kenya?',
    options: [
      'To track rainfall patterns and reach seasonal pasture and permanent boreholes in dry periods',
      'Because they enjoy walking without purpose',
      'To escape from school teachers',
      'To go shopping in city malls'
    ],
    correctAnswer: 'To track rainfall patterns and reach seasonal pasture and permanent boreholes in dry periods',
    explanation: 'In arid environments where rain is sporadic, moving herds to areas where showers recently fell prevents pasture overgrazing and saves animal lives.',
    socraticHint: 'Why must pastoralist herders move across vast landscapes when dry seasons deplete local grass and water wells?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-017',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What major advantage does keeping camels (dromedaries) have over cattle in arid counties like Wajir, Mandera, and Marsabit?',
    options: [
      'Camels can survive without water for weeks, feed on thorny desert shrubs, and continue producing milk during severe droughts',
      'Camels can fly across mountains',
      'Camels sleep in family bedrooms',
      'Camels lay eggs every morning'
    ],
    correctAnswer: 'Camels can survive without water for weeks, feed on thorny desert shrubs, and continue producing milk during severe droughts',
    explanation: 'Camels are physiologically adapted to extreme aridity and maintain consistent milk yields when cattle and sheep succumb to drought.',
    socraticHint: 'Why is the camel called the "ship of the desert" and capable of giving rich milk even during prolonged dry spells?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-018',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What government parastatal in Kenya is responsible for slaughtering, processing, and purchasing beef cattle from livestock farmers at modern facilities in Athi River?',
    options: [
      'Kenya Meat Commission (KMC)',
      'New Kenya Cooperative Creameries (New KCC)',
      'Kenya Ports Authority (KPA)',
      'Kenya Pipeline Company'
    ],
    correctAnswer: 'Kenya Meat Commission (KMC)',
    explanation: 'Kenya Meat Commission (KMC) procures livestock directly from ranchers and pastoralists, providing an assured market for beef.',
    socraticHint: 'Which state agency with a large meat-processing plant at Athi River buys and processes beef cattle?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-019',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Which dairy cattle breed produces milk with the highest butterfat (cream) content, recognizable by its light brown fawn coat and gentle temperament?',
    options: [
      'Jersey',
      'Friesian',
      'Sahiwal',
      'Zebu'
    ],
    correctAnswer: 'Jersey',
    explanation: 'Jersey cows produce milk rich in butterfat (often over 5%), making it ideal for making butter, cream, and rich cheeses.',
    socraticHint: 'Which small fawn-colored dairy cow is prized for milk with the highest yellow cream and butterfat content?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-019',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Which parasitic tick-borne disease causes high fever, swollen lymph nodes, and heavy cattle mortality in Eastern Africa if animals are not dipped or sprayed?',
    options: [
      'East Coast Fever (ECF)',
      'Foot and Mouth Disease',
      'Anthrax',
      'Bird Flu'
    ],
    correctAnswer: 'East Coast Fever (ECF)',
    explanation: 'East Coast Fever is transmitted by brown ear ticks and kills unprotected cattle; regular acaricide dipping or spraying is vital for control.',
    socraticHint: 'Which deadly tick-borne cattle fever is controlled by dipping livestock in chemical acaricides?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-020',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What modern program introduced by the Kenyan government helps pastoralists withstand severe drought losses by providing cash payouts when pasture conditions deteriorate?',
    options: [
      'Kenya Livestock Insurance Program (KLIP)',
      'Free bicycle program',
      'Hotel voucher scheme',
      'National lottery ticket program'
    ],
    correctAnswer: 'Kenya Livestock Insurance Program (KLIP)',
    explanation: 'KLIP uses satellite sensors to measure pasture vegetation index; when drought turns pastures brown, indexed payouts are sent directly to pastoralist phones via mobile money.',
    socraticHint: 'Which satellite-based livestock insurance program pays pastoralists before their animals starve in droughts?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-021',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What is silage, and how does it benefit highland dairy farmers in Kenya?',
    options: [
      'Fermented green forage (such as chopped maize or sorghum) stored in anaerobic pits or tubes to provide nutritious feed during dry seasons',
      'Dry sand fed to cattle to build muscle',
      'Plastic granules added to cow milk',
      'Rotten wood used for cattle bedding'
    ],
    correctAnswer: 'Fermented green forage (such as chopped maize or sorghum) stored in anaerobic pits or tubes to provide nutritious feed during dry seasons',
    explanation: 'Making silage preserves nutritious wet season forage through lactic fermentation, ensuring cows maintain high milk yields during dry months.',
    socraticHint: 'What preserved fermented green fodder stored airtight in pits allows dairy cows to eat green feed during dry months?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-022',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'Which dual-purpose goat breed, indigenous to northern Kenya and Somalia, is renowned for high milk production and white coat?',
    options: [
      'Galla goat (Boran goat)',
      'Saanen goat',
      'Toggenburg goat',
      'Alpine goat'
    ],
    correctAnswer: 'Galla goat (Boran goat)',
    explanation: 'The Galla goat is an indigenous East African white goat that produces substantial milk, grows rapidly for meat, and survives drought.',
    socraticHint: 'Which hardy indigenous white goat breed from northern Kenya is famous for both good milk and meat?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-023',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'What danger threatens natural grasslands when too many domestic animals graze the same pasture continuously without rest?',
    options: [
      'Overgrazing, leading to bare soil, desertification, and severe soil erosion',
      'Grass growing too tall and covering trees',
      'Underground volcanic eruptions',
      'Rivers turning into salt water'
    ],
    correctAnswer: 'Overgrazing, leading to bare soil, desertification, and severe soil erosion',
    explanation: 'Overgrazing strips vegetation roots, exposing loose topsoil to wind and water erosion and turning fertile savannah into barren badlands.',
    socraticHint: 'What happens to pasture land when excessive livestock eat grass down to the roots and trample topsoil?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u7-024',
    subStrandId: 'substrand-g6-soc-u7',
    lessonId: 'lesson-g6-soc-u7-l2',
    text: 'How can peace and development committees help resolve cattle rustling conflicts in pastoralist border counties?',
    options: [
      'Promoting cross-community dialogues, inter-community sporting events, joint grazing agreements, and alternative education for youth',
      'Encouraging youth to acquire more illegal firearms',
      'Closing down all livestock markets permanently',
      'Banning peaceful discussions between elders'
    ],
    correctAnswer: 'Promoting cross-community dialogues, inter-community sporting events, joint grazing agreements, and alternative education for youth',
    explanation: 'Inter-ethnic peace dialogues, schooling, and regulated water-sharing pacts eliminate the cycle of retaliatory raids and foster mutual security.',
    socraticHint: 'How do inter-community peace dialogues, sports, and schools help end cycles of cattle rustling?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 55 (Unit 8 Lesson 1: q-g6-soc-u8-001 to 012)
  {
    id: 'q-g6-soc-u8-001',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which mineral is extracted from the trona deposits of Lake Magadi in southern Kenya and exported for manufacturing glass and detergents?',
    options: [
      'Soda ash',
      'Coal',
      'Iron ore',
      'Bauxite'
    ],
    correctAnswer: 'Soda ash',
    explanation: 'Trona in Lake Magadi is dredged and calcined into soda ash (pure sodium carbonate), a major chemical export of Kenya.',
    socraticHint: 'What commercial mineral extracted at Lake Magadi is used to make glass bottles and soap detergents?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-002',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which heavy mineral sands mined in Kwale County along the Kenyan coast yield valuable titanium minerals for aerospace and paint industries?',
    options: [
      'Rutile, ilmenite, and zircon',
      'Gold and silver',
      'Diamond and emerald',
      'Uranium and radium'
    ],
    correctAnswer: 'Rutile, ilmenite, and zircon',
    explanation: 'Kwale mineral sands contain titanium ores (rutile and ilmenite) and zircon, which are processed and exported from Likoni.',
    socraticHint: 'What titanium ores and zircon minerals are extracted by Base Titanium in Kwale County?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-003',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'What essential building material is manufactured from limestone quarried at Bamburi in Mombasa and Athi River in Machakos?',
    options: [
      'Portland cement',
      'Glass bottles',
      'Plastic pipes',
      'Aluminium sheets'
    ],
    correctAnswer: 'Portland cement',
    explanation: 'Limestone (calcium carbonate) is baked with clay and gypsum in giant industrial kilns to produce construction cement.',
    socraticHint: 'What grey powder used with sand and ballast to build concrete structures is made from quarried limestone?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-004',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which mineral was commercially mined in the Kerio Valley of Elgeyo Marakwet County for use in steel smelting and chemical fluxes?',
    options: [
      'Fluorspar',
      'Coal',
      'Tin',
      'Platinum'
    ],
    correctAnswer: 'Fluorspar',
    explanation: 'Fluorspar (calcium fluoride) from Kimwarer in Kerio Valley was processed for export to international steelmakers before operations paused.',
    socraticHint: 'Which mineral mined at Kimwarer in Kerio Valley is used as a flux in steel making?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-005',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which freshwater lake accounts for over 80% of Kenya’s total annual inland fish harvest?',
    options: [
      'Lake Victoria',
      'Lake Naivasha',
      'Lake Baringo',
      'Lake Turkana'
    ],
    correctAnswer: 'Lake Victoria',
    explanation: 'Lake Victoria produces hundreds of thousands of tons of fish, primarily Nile perch, Nile tilapia, and omena (silver cyprinid).',
    socraticHint: 'Which giant East African lake supplies most of Kenya’s freshwater fish to markets like Kisumu and Gikomba?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-006',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'What tiny silver freshwater fish caught at night in Lake Victoria using kerosene pressure lamps is dried in the sun for food and animal feeds?',
    options: [
      'Omena (Dagaa)',
      'Tilapia (Ngege)',
      'Nile Perch (Mbuta)',
      'Catfish (Mumi)'
    ],
    correctAnswer: 'Omena (Dagaa)',
    explanation: 'Omena (Rastrineobola argentea) are attracted by night lanterns, netted, and dried on beach mats, providing cheap protein and calcium.',
    socraticHint: 'Which small silver sardine-like fish dried in the sun is called omena in Kenya and dagaa in Tanzania?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-007',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'What environmental danger is caused by open-cast mining quarries if they are abandoned without backfilling and tree planting?',
    options: [
      'Dangerous deep water-filled pits that breed disease-carrying mosquitoes, cause drownings, and accelerate land degradation',
      'The land turning into gold coins',
      'The area becoming a ski resort',
      'Immediate construction of free schools'
    ],
    correctAnswer: 'Dangerous deep water-filled pits that breed disease-carrying mosquitoes, cause drownings, and accelerate land degradation',
    explanation: 'Unrehabilitated quarries create physical hazards for children and animals, trigger erosion, and leave barren moonscapes.',
    socraticHint: 'Why is it dangerous when mining companies leave deep uncovered pits in the ground after extracting stone or sand?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-008',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which famous wildlife and ecological park in Mombasa was created by rehabilitating an abandoned limestone quarry using casuarina trees and millipedes?',
    options: [
      'Haller Park (Bamburi Nature Trail)',
      'Uhuru Gardens',
      'Nairobi Arboretum',
      'Mamba Village'
    ],
    correctAnswer: 'Haller Park (Bamburi Nature Trail)',
    explanation: 'Dr. René Haller transformed barren limestone pits into Haller Park, an inspiring global model of industrial environmental restoration.',
    socraticHint: 'What famous Mombasa nature park was created out of an old cement limestone quarry?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-009',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'What is fish farming in artificially constructed ponds or modern cage culture systems called?',
    options: [
      'Aquaculture',
      'Apiculture',
      'Sericulture',
      'Viticulture'
    ],
    correctAnswer: 'Aquaculture',
    explanation: 'Aquaculture is the controlled breeding and harvesting of aquatic animals (fish, prawns) in ponds, tanks, or floating lake cages.',
    socraticHint: 'What is the scientific term for rearing fish in managed ponds and cages?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-010',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which marine fish species harvested in Kenya’s Indian Ocean waters is highly prized globally for luxury dining and canned export?',
    options: [
      'Yellowfin Tuna',
      'Freshwater catfish',
      'Tilapia',
      'Mudfish'
    ],
    correctAnswer: 'Yellowfin Tuna',
    explanation: 'Tuna migrates through the deep offshore waters of Kenya’s Exclusive Economic Zone (EEZ) and is a valuable target for marine fisheries.',
    socraticHint: 'Which large deep-sea ocean predator is caught offshore and canned worldwide as tuna?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-011',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'What is the negative consequence of using illegal fine-mesh fishing nets (mosquito nets) in Lake Victoria?',
    options: [
      'They catch and kill immature juvenile fingerlings, preventing fish populations from breeding and leading to fishery collapse',
      'They make fish grow twice as large',
      'They turn lake water into fresh drinking juice',
      'They make boats sail faster'
    ],
    correctAnswer: 'They catch and kill immature juvenile fingerlings, preventing fish populations from breeding and leading to fishery collapse',
    explanation: 'Undersized nets indiscriminately sweep baby fish from breeding bays, depleting future fish stocks across the lake.',
    socraticHint: 'Why is it illegal to fish with fine-mesh nets that catch tiny baby fish before they can reproduce?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-012',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l1',
    text: 'Which precious green gemstone is mined in the hills of Taita Taveta County near Tsavo National Park in Kenya?',
    options: [
      'Tsavorite garnet',
      'Emerald',
      'Blue sapphire',
      'Diamond'
    ],
    correctAnswer: 'Tsavorite garnet',
    explanation: 'Tsavorite is a rare, vibrant green grossular garnet named after Tsavo National Park, where it was discovered in the 1960s.',
    socraticHint: 'Which famous green gemstone mined in Taita Taveta was named after Tsavo National Park?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 56 (Unit 8 Lesson 2: q-g6-soc-u8-013 to 024)
  {
    id: 'q-g6-soc-u8-013',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What is the full meaning of the abbreviation SGR in Kenya’s modern transport infrastructure?',
    options: [
      'Standard Gauge Railway',
      'Special Government Road',
      'Subsea Gas Reservoir',
      'Solar Grid Regulator'
    ],
    correctAnswer: 'Standard Gauge Railway',
    explanation: 'The Standard Gauge Railway (with track width of 1,435 mm) connects Mombasa to Nairobi and Suswa, providing faster, heavier cargo and passenger transit.',
    socraticHint: 'What do the letters SGR stand for in Kenya’s high-speed passenger and freight rail network?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-014',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'Where are the administrative headquarters of the East African Community (EAC) situated?',
    options: [
      'Arusha, Tanzania',
      'Nairobi, Kenya',
      'Kampala, Uganda',
      'Kigali, Rwanda'
    ],
    correctAnswer: 'Arusha, Tanzania',
    explanation: 'The EAC Secretariat, East African Legislative Assembly (EALA), and East African Court of Justice are located in Arusha.',
    socraticHint: 'In which northern Tanzanian town near Mt. Meru is the headquarters of the East African Community located?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-015',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'How many partner states currently make up the expanded East African Community (EAC) as of 2024?',
    options: [
      '8 Partner States (Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC, Somalia)',
      '3 Partner States only (Kenya, Uganda, Tanzania)',
      '50 African States',
      '1 State only'
    ],
    correctAnswer: '8 Partner States (Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC, Somalia)',
    explanation: 'With the addition of the Democratic Republic of the Congo (2022) and Somalia (2024), the EAC comprises 8 partner countries.',
    socraticHint: 'How many member nations currently make up the expanded East African Community?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-016',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What major economic benefit does Kenya gain from the EAC Common Market protocol?',
    options: [
      'Access to an integrated market of over 300 million consumers for Kenyan manufactured goods, agricultural produce, and services',
      'Higher import taxes placed on Kenyan products by neighbors',
      'Closing down of all border crossing posts',
      'Mandatory free donation of all Kenyan tea to foreign countries'
    ],
    correctAnswer: 'Access to an integrated market of over 300 million consumers for Kenyan manufactured goods, agricultural produce, and services',
    explanation: 'The Common Market guarantees free movement of goods, labor, services, and capital, allowing Kenyan businesses to export tariff-free across the region.',
    socraticHint: 'How does trading across 8 East African countries create a huge customer base for Kenyan factories and farmers?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-017',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What is a "One-Stop Border Post" (OSBP), such as those established at Busia, Malaba, and Namanga?',
    options: [
      'A joint border facility where customs and immigration officials from both neighboring countries work side by side to clear passengers and cargo once',
      'A checkpoint that arrests every traveler who attempts to cross the border',
      'A border post where travelers must stop for seven days',
      'A market selling only one type of vegetable'
    ],
    correctAnswer: 'A joint border facility where customs and immigration officials from both neighboring countries work side by side to clear passengers and cargo once',
    explanation: 'OSBPs eliminate double clearance, reducing transit truck clearance times from days to a few hours and boosting regional cross-border commerce.',
    socraticHint: 'Why is it called "One-Stop" when border officials from both nations check passports and cargo in the same building?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-018',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'Which major port project in northern coastal Kenya is designed to open an economic transport corridor linking Kenya to South Sudan and Ethiopia (LAPSSET)?',
    options: [
      'Port of Lamu',
      'Port of Kisumu',
      'Port of Shimoni',
      'Port of Malindi'
    ],
    correctAnswer: 'Port of Lamu',
    explanation: 'Lamu Port is part of the Lamu Port-South Sudan-Ethiopia Transport (LAPSSET) Corridor, building deep-sea berths for massive container ships.',
    socraticHint: 'Which historic northern coastal archipelago is the site of Kenya’s second commercial deep-sea port under LAPSSET?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-019',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'How does pipeline transport (such as the Kenya Pipeline Company system from Mombasa to Kisumu) protect the road network?',
    options: [
      'It removes thousands of heavy fuel tanker trucks from tarmac highways, reducing road accidents, traffic congestion, and road wear',
      'It turns crude oil into drinking water',
      'It stops all cars from driving on highways',
      'It causes fuel to evaporate into clouds'
    ],
    correctAnswer: 'It removes thousands of heavy fuel tanker trucks from tarmac highways, reducing road accidents, traffic congestion, and road wear',
    explanation: 'Pumping petroleum through underground pipes safely moves millions of liters daily without wearing out highways or causing fatal road collisions.',
    socraticHint: 'What happens to highway safety and road surfaces when heavy fuel tankers are replaced by underground pipelines?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-020',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What is the legislative organ of the East African Community where elected members from all partner states debate regional laws?',
    options: [
      'East African Legislative Assembly (EALA)',
      'Kenya National Assembly',
      'United Nations General Assembly',
      'African Union Commission'
    ],
    correctAnswer: 'East African Legislative Assembly (EALA)',
    explanation: 'EALA is the regional parliament of the EAC, meeting in Arusha and rotating across capitals to pass community laws and oversight budgets.',
    socraticHint: 'Which regional legislative body with members from all 8 EAC states is abbreviated as EALA?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-021',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'Which judicial organ of the East African Community resolves legal disputes concerning the interpretation and application of the EAC Treaty?',
    options: [
      'East African Court of Justice (EACJ)',
      'Supreme Court of Kenya',
      'International Criminal Court (ICC)',
      'High Court of Uganda'
    ],
    correctAnswer: 'East African Court of Justice (EACJ)',
    explanation: 'The EACJ sits in Arusha, ensuring that partner states, citizens, and businesses adhere to the rule of law under the EAC Treaty.',
    socraticHint: 'Which regional court based in Arusha settles disputes under the East African Community treaty?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-022',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What major communication innovation revolutionized commerce, banking, and trade across Kenya and Eastern Africa?',
    options: [
      'Mobile money transfer services (e.g. M-Pesa)',
      'Pigeon post messengers',
      'Handwritten letters sent by steamship',
      'Smoke signals across hills'
    ],
    correctAnswer: 'Mobile money transfer services (e.g. M-Pesa)',
    explanation: 'Pioneered in Kenya, mobile money allows instant payments, cross-border remittances, merchant billing, and micro-loans over basic cellphones.',
    socraticHint: 'Which famous Kenyan mobile money innovation allows instant financial transfers via cellular phones?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-023',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'What is the ultimate future pillar and political goal of the East African Community integration process?',
    options: [
      'Political Federation (forming a single federal East African sovereign state)',
      'Dissolving all schools and hospitals',
      'Splitting every country into small islands',
      'Adopting a foreign European king'
    ],
    correctAnswer: 'Political Federation (forming a single federal East African sovereign state)',
    explanation: 'The fourth and final stage of EAC integration is a Political Federation with a common foreign policy, defense, and federal presidency.',
    socraticHint: 'What is the ultimate political goal of the EAC: a united Political Federation of East African states?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u8-024',
    subStrandId: 'substrand-g6-soc-u8',
    lessonId: 'lesson-g6-soc-u8-l2',
    text: 'Why is internet and submarine optic fiber connectivity (such as TEAMS, SEACOM, and EASSy cables landing in Mombasa) vital for modern Eastern Africa?',
    options: [
      'It powers digital learning, e-commerce, banking transactions, government digital services (e-Citizen), and global communication',
      'It heats up ocean water to create summer waves',
      'It captures wild fish in underwater nets',
      'It prevents rainfall along the coastline'
    ],
    correctAnswer: 'It powers digital learning, e-commerce, banking transactions, government digital services (e-Citizen), and global communication',
    explanation: 'High-speed undersea fiber links connect Eastern Africa to the global web, enabling fintech, remote work, digital education, and modern services.',
    socraticHint: 'Why are undersea fiber-optic internet cables landing at Mombasa so critical for digital learning and e-Citizen services?',
    difficulty: 'EASY',
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

console.log(`Added ${questions.length} questions for Units 7 & 8.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 4 to cbe_database.json!');
