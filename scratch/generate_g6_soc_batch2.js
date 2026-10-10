/**
 * Grade 6 Social Studies - Batch 2 Generator
 * Content: Units 3 & 4
 * - Unit 3: Weather Elements, Climatic Regions & Climate Change
 * - Unit 4: Vegetation Zones, Forest Conservation & Wildlife Habitats
 * Missions: Orders 45, 46, 47, 48 (world-kenya-explorer)
 * Questions: 48 (24 per unit: q-g6-soc-u3-001 to q-g6-soc-u4-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Social Studies Batch 2 (Units 3 & 4) ---');

// 1. Units 3 & 4 (subStrands)
const units = [
  {
    id: 'substrand-g6-soc-u3',
    strandId: 'strand-g6-soc-environment',
    learningAreaId: 'la-social-g6',
    title: 'Weather Elements, Climatic Regions & Climate Change in Eastern Africa',
    name: 'Weather Elements, Climatic Regions & Climate Change in Eastern Africa',
    description: 'Investigating factors influencing climate in Eastern Africa (altitude, latitude, distance from sea, prevailing winds, ocean currents, relief); mapping major climatic regions (modified equatorial, tropical continental, semi-desert, desert, montane); analyzing climate change impacts (droughts, erratic rains, floods); and community climate mitigation strategies.',
    cbeCompetency: 'Climatological reasoning, weather observation, environmental sustainability, and climate change adaptation',
    estimatedMinutes: 30,
    order: 3,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-soc-u4',
    strandId: 'strand-g6-soc-environment',
    learningAreaId: 'la-social-g6',
    title: 'Vegetation Zones, Forest Conservation & Wildlife Habitats',
    name: 'Vegetation Zones, Forest Conservation & Wildlife Habitats',
    description: 'Examining natural vegetation zones across Eastern Africa (tropical rainforests, savannah grasslands and woodlands, semi-desert scrub, montane forests, mangrove coastal swamps); exploring adaptations of plants to arid environments; identifying causes and impacts of deforestation; and evaluating government and community conservation measures.',
    cbeCompetency: 'Biogeographical inquiry, ecological appreciation, habitat conservation stewardship, and environmental protection',
    estimatedMinutes: 30,
    order: 4,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 3 & 4
const lessons = [
  // Unit 3
  {
    id: 'lesson-g6-soc-u3-l1',
    subStrandId: 'substrand-g6-soc-u3',
    title: 'Climatic Regions & Factors Influencing Climate in Eastern Africa',
    content: 'Climate is the average atmospheric condition of an area recorded over a long period (usually 30–35 years).\n\n1. Factors Influencing Climate in Eastern Africa:\n- Altitude: Height above sea level. Higher areas are cooler (temperatures drop by approximately 0.6°C for every 100 metres ascended). Example: Nairobi (1,795 m) is much cooler than Mombasa (sea level).\n- Relief / Topography: Mountain barriers force moist winds upwards, causing relief (orographic) rain on the windward side and a dry rain shadow on the leeward side.\n- Distance from the Sea (Continentality): Coastal areas experience cooling sea breezes and higher humidity compared to continental inland areas.\n- Prevailing Winds: Northeast and Southeast Trade Winds bring moisture from the Indian Ocean.\n- Latitude: Areas near the Equator receive direct overhead solar insolation throughout the year.\n\n2. Major Climatic Regions:\n- Modified Equatorial Climate: Found around Lake Victoria basin and the coastal strip. Characterized by high temperatures and high convectional rainfall distributed throughout the year.\n- Tropical Continental Climate: Found across wide savannah plains in central Tanzania and western Kenya. Distinct alternating wet and dry seasons.\n- Semi-Desert and Desert Climate: Found in northern Kenya (Turkana, Marsabit, Mandera), Somalia, and northern Sudan. High temperatures (often exceeding 35°C), very low rainfall (below 250 mm annually), and cloudless skies.\n- Montane (Alpine) Climate: Found in high mountain peaks (Mt. Kenya, Mt. Kilimanjaro, Ruwenzori). Cool to freezing temperatures, frequent mist, and frost/snow.',
    didYouKnow: 'Despite lying right on the Equator, the peak of Mount Kenya features permanent snow and ice glaciers because its altitude of 5,199 metres makes the air freezing cold!',
    kenyanContext: 'Nairobi enjoys a pleasant temperate highland climate with warm days and cool evenings, earned by its elevation of 1,795 metres, earning it the historic nickname "The Green City in the Sun".',
    order: 5,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u3-l2',
    subStrandId: 'substrand-g6-soc-u3',
    title: 'Climate Change Impacts, Global Warming & Community Adaptation',
    content: 'Human activities have led to rising greenhouse gas emissions, altering rainfall patterns and global temperatures.\n\n1. Evidence of Climate Change in Eastern Africa:\n- Erratic and unpredictable rainy seasons delaying planting.\n- Prolonged severe droughts drying up pastures and livestock boreholes in arid and semi-arid lands (ASALs).\n- Intense flash floods and rising water levels in Rift Valley lakes (e.g. Lake Baringo and Lake Nakuru submerging hotels and schools).\n- Rapid melting and retreat of glaciers on Mount Kenya and Mount Kilimanjaro.\n\n2. Negative Impacts on Society:\n- Food insecurity and crop failures leading to high food prices.\n- Pastoralist livestock losses causing resource conflicts over dwindling pasture and water.\n- Destruction of infrastructure (bridges and roads washed away by El Niño floods).\n- Spread of vector-borne diseases (malaria expanding to highland zones).\n\n3. Community Mitigation and Adaptation Strategies:\n- Afforestation (planting trees on bare land) and Reforestation (replanting harvested forests).\n- Adoption of drought-tolerant early-maturing crops (sorghum, millet, cassava, pigeon peas).\n- Water harvesting from rooftops, water pans, and earth dams during rainy seasons.\n- Using clean renewable energy: solar cookers, biogas, geothermal energy, and wind turbines (Lake Turkana Wind Power).',
    didYouKnow: 'Lake Turkana Wind Power project in Marsabit County is Africa’s largest wind farm, generating 310 megawatts of clean, zero-emission green electricity for Kenya’s national grid!',
    kenyanContext: 'Kenyan smallholder farmers in Makueni and Kitui use sand dams and drought-resistant green grams (ndengu) to adapt to changing rainfall patterns and build resilient local livelihoods.',
    order: 6,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },

  // Unit 4
  {
    id: 'lesson-g6-soc-u4-l1',
    subStrandId: 'substrand-g6-soc-u4',
    title: 'Major Natural Vegetation Zones of Eastern Africa',
    content: 'Vegetation refers to the total plant cover growing naturally in an area without direct human cultivation.\n\n1. Major Vegetation Types:\n- Tropical Rainforests (Equatorial Forests):\n  * Found in high rainfall zones: Kakamega Forest in Kenya, Mabira Forest in Uganda, and highland slopes of Tanzania.\n  * Multi-layered canopy: tall emergent trees (up to 45 m), continuous middle canopy, and climbing lianas.\n  * Broad leaves, evergreen foliage (trees do not shed leaves all at once), buttress roots to support tall trunks.\n- Savannah Grasslands and Woodlands:\n  * Covers the largest surface area of Eastern Africa (Maasai Mara, Serengeti, Tsavo).\n  * Mixture of tall perennial grasses (elephant grass, red oat grass) and scattered drought-resistant deciduous trees (acacia, baobab).\n  * Trees shed leaves during dry seasons to conserve moisture; grass dries to brown and regenerates quickly with rain.\n- Semi-Desert and Desert Scrub:\n  * Found in northern Kenya, Somalia, and Sudan.\n  * Thorny shrubs, acacia bushes, cacti, and succulents.\n  * Adaptations: deep taproots to seek underground water, tiny or waxy leaves to reduce transpiration, fleshy stems storing water.\n- Mangrove Forests:\n  * Found along the shallow saltwater coastal creeks and intertidal zones of Kenya (Lamu, Gazi, Mombasa) and Tanzania.\n  * Possess specialized stilt roots and breathing roots (pneumatophores) that emerge above saltwater mud.',
    didYouKnow: 'Kakamega Forest in Western Kenya is the only surviving easternmost remnant of the prehistoric Guineo-Congolian equatorial rainforest that once stretched right across the waist of Africa!',
    kenyanContext: 'Kenya’s vast savannah grasslands in Amboseli and Maasai Mara support the greatest concentration of free-roaming herbivorous wildlife (elephants, zebras, giraffes) and apex predators in the world.',
    order: 7,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u4-l2',
    subStrandId: 'substrand-g6-soc-u4',
    title: 'Forest Conservation, Deforestation & Wildlife Protection',
    content: 'Forests are vital natural assets that stabilize the environment, prevent erosion, and sustain biological diversity.\n\n1. Causes of Deforestation:\n- Expanding agricultural land clearing forests for crop farming.\n- Illegal logging for valuable timber (hardwoods like mahogany, camphor, cedar).\n- Charcoal burning and excessive firewood collection for domestic energy.\n- Human settlement encroachment into protected reserves.\n\n2. Consequences of Forest Destruction:\n- Loss of biodiversity and extinction of rare wildlife species.\n- Accelerated soil erosion, siltation of river dams, and flash flooding.\n- Drying up of perennial springs and depletion of national water towers.\n- Contribution to global warming through loss of carbon sinks.\n\n3. Conservation and Protection Measures:\n- Gazetting national forests as protected reserves under the Kenya Forest Service (KFS) and Kenya Wildlife Service (KWS).\n- Promoting agroforestry (growing compatible trees on farms alongside crops).\n- Enforcing laws against illegal logging and charcoal burning.\n- National tree planting drives (e.g. Kenya’s Presidential directive to plant 15 billion trees by 2032).\n- Establishing Community Forest Associations (CFAs) to involve local communities in sustainable forest management.',
    didYouKnow: 'Professor Wangari Maathai won the Nobel Peace Prize in 2004 for her courageous work with the Green Belt Movement, mobilizing Kenyan rural women to plant over 50 million trees to protect the environment!',
    kenyanContext: 'The fenced perimeter around the Aberdare and Mount Kenya forests protects both the natural water catchment and prevents human-wildlife conflict with farming communities living near park borders.',
    order: 8,
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

// 3. Missions 45 to 48 (world-kenya-explorer)
const missions = [
  {
    id: 'mission-g6-soc-u3-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 45: Climate Detectives – Zones & Factors of Eastern Africa',
    description: 'Investigate how altitude, lake basins, and ocean winds shape equatorial, savannah, and desert microclimates.',
    order: 45,
    orderIndex: 45,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-meteorologist',
    badge: 'badge-g6-soc-meteorologist',
    lessonId: 'lesson-g6-soc-u3-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u3-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u3-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 46: Climate Action Heroes – Mitigation & Resilience',
    description: 'Tackle the realities of global warming, flash floods, pastoral drought resilience, and green renewable energy.',
    order: 46,
    orderIndex: 46,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-climate-champion',
    badge: 'badge-g6-soc-climate-champion',
    lessonId: 'lesson-g6-soc-u3-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u3-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u4-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 47: Canopy to Coast – Vegetation Biomes of Eastern Africa',
    description: 'Explore the layers of Kakamega rainforest, the open acacia savannahs, arid desert scrub, and Lamu mangroves.',
    order: 47,
    orderIndex: 47,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-botanist',
    badge: 'badge-g6-soc-botanist',
    lessonId: 'lesson-g6-soc-u4-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u4-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u4-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 48: Forest Guardians – Water Towers & Habitat Protectors',
    description: 'Champion the legacy of Wangari Maathai, agroforestry on Kenyan farms, and community forest associations.',
    order: 48,
    orderIndex: 48,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-forest-guardian',
    badge: 'badge-g6-soc-forest-guardian',
    lessonId: 'lesson-g6-soc-u4-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u4-${String(i + 13).padStart(3, '0')}`),
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
  // Mission 45 (Unit 3 Lesson 1: q-g6-soc-u3-001 to 012)
  {
    id: 'q-g6-soc-u3-001',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Why is Nairobi significantly cooler than Mombasa, even though both towns are located near the Equator?',
    options: [
      'Nairobi is situated at a higher altitude (elevation) above sea level',
      'Nairobi receives no sunlight during the year',
      'Mombasa is closer to the South Pole',
      'Nairobi has more concrete buildings than Mombasa'
    ],
    correctAnswer: 'Nairobi is situated at a higher altitude (elevation) above sea level',
    explanation: 'Temperature decreases with increasing altitude (approx 0.6°C per 100 m). Nairobi sits at ~1,795 m elevation, while Mombasa is at sea level.',
    socraticHint: 'How does height above sea level (altitude) influence air temperature?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-002',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'What type of rainfall is received when warm moist air from Lake Victoria rises, condenses in the afternoon, and produces heavy thunderstorms?',
    options: [
      'Convectional rainfall',
      'Relief (orographic) rainfall',
      'Frontal (cyclonic) rainfall',
      'Snow precipitation'
    ],
    correctAnswer: 'Convectional rainfall',
    explanation: 'Intense heating of lake waters causes evaporation; rising warm moist air currents (convection) cool and trigger afternoon convectional rain and thunder.',
    socraticHint: 'Which type of rainfall is formed by rising warm air currents heated by intense afternoon sunshine over lake basins?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-003',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Which climatic zone in Eastern Africa covers the vast northern parts of Kenya (Turkana, Marsabit) and central Somalia?',
    options: [
      'Semi-desert and desert climate',
      'Modified equatorial climate',
      'Mediterranean climate',
      'Temperate continental climate'
    ],
    correctAnswer: 'Semi-desert and desert climate',
    explanation: 'Northern Kenya and Somalia experience high daytime temperatures (above 35°C), cloudless skies, and very low, erratic rainfall under 250 mm.',
    socraticHint: 'Which dry climatic zone receives less than 250 mm of rainfall per year with scorching daytime sunshine?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-004',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'What is the term for the dry, sheltered side of a mountain that receives little or no rainfall because moisture was dropped on the other side?',
    options: [
      'Rain shadow (leeward side)',
      'Windward slope',
      'Valley floor',
      'Continental crest'
    ],
    correctAnswer: 'Rain shadow (leeward side)',
    explanation: 'As descending air warms on the leeward slope, its capacity to hold water increases without condensing, creating a dry rain-shadow zone.',
    socraticHint: 'What do geographers call the dry leeward side of a mountain that sits in the "shadow" of rain clouds?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-005',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Which prevailing seasonal winds blow across the Indian Ocean bringing moisture and rainfall to the East African coast between May and August?',
    options: [
      'Southeast Monsoon Winds',
      'Northeast Monsoon Winds',
      'Harmattan Winds',
      'Polar Easterlies'
    ],
    correctAnswer: 'Southeast Monsoon Winds',
    explanation: 'The Southeast Monsoon winds blow from the cool Indian Ocean towards mainland East Africa during the southern winter, bringing substantial rains.',
    socraticHint: 'Which moisture-laden winds blowing from the southeast bring the long rains to the Kenyan coast?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-006',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'What climate instrument is used at school weather stations to measure atmospheric pressure in millibars (mb)?',
    options: [
      'Barometer',
      'Anemometer',
      'Hygrometer',
      'Rain gauge'
    ],
    correctAnswer: 'Barometer',
    explanation: 'A barometer measures atmospheric pressure, which helps forecasters predict changing weather patterns.',
    socraticHint: 'Which instrument with a dial or mercury column measures the weight and pressure of the air?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-007',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Which weather instrument is placed inside a Stevenson Screen to protect it from direct sunlight and wind while measuring humidity?',
    options: [
      'Hygrometer (wet-and-dry bulb thermometer)',
      'Wind vane',
      'Six’s maximum and minimum thermometer and hygrometer',
      'Campbell-Stokes sunshine recorder'
    ],
    correctAnswer: 'Six’s maximum and minimum thermometer and hygrometer',
    explanation: 'A Stevenson Screen houses sensitive thermometers (maximum, minimum, wet and dry bulbs) shielded from direct radiation but well-ventilated through louvered slats.',
    socraticHint: 'Which white louvered wooden box houses thermometers at standard eye level?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-008',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Why is the Stevenson Screen painted white?',
    options: [
      'To reflect incoming solar radiation so temperatures measured inside represent true shade temperature',
      'To look attractive in the school garden',
      'Because white paint is the cheapest paint available',
      'To prevent birds from nesting inside'
    ],
    correctAnswer: 'To reflect incoming solar radiation so temperatures measured inside represent true shade temperature',
    explanation: 'White reflects sunlight, preventing the box itself from heating up and skewing the temperature readings.',
    socraticHint: 'Does white paint absorb sunlight heat or reflect it away?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-009',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Which climatic region covers the largest land surface of central and southern Tanzania and the plateau of Kenya?',
    options: [
      'Tropical savannah (continental) climate',
      'Equatorial rainforest climate',
      'Desert climate',
      'Alpine tundra climate'
    ],
    correctAnswer: 'Tropical savannah (continental) climate',
    explanation: 'Tropical savannah climate covers extensive plains, characterized by distinct wet and dry seasons and temperatures between 20°C and 28°C.',
    socraticHint: 'Which widespread climatic zone features alternating wet seasons and dry savannah grasslands?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-010',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'What causes the daily local phenomenon known as a "sea breeze" along the Kenyan coastline in the afternoon?',
    options: [
      'Land heats up faster than the ocean, warm air rises over land, drawing in cooler air from the sea',
      'The ocean water evaporates completely into clouds',
      'Ocean waves push air toward the beach with high speed',
      'The moon pulls wind toward coastal hotels'
    ],
    correctAnswer: 'Land heats up faster than the ocean, warm air rises over land, drawing in cooler air from the sea',
    explanation: 'Due to differences in specific heat capacity, coastal land warms faster during the day, creating low pressure that draws in cool air from the sea.',
    socraticHint: 'During the day, which gets hot faster: dry coastal land or deep ocean water?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-011',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'What term describes lines drawn on a weather map connecting places that experience the same amount of atmospheric pressure?',
    options: [
      'Isobars',
      'Isohyets',
      'Isotherms',
      'Contours'
    ],
    correctAnswer: 'Isobars',
    explanation: 'Isobars are lines connecting points of equal atmospheric pressure (from Greek baros = weight/pressure).',
    socraticHint: 'Isohyets connect points of equal rainfall; what lines connect points of equal barometric pressure?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-012',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l1',
    text: 'Which town in Kenya experiences very high annual rainfall exceeding 1,800 mm due to its location on the windward slopes of the central highlands?',
    options: [
      'Meru / Kericho',
      'Garissa',
      'Lodwar',
      'Wajir'
    ],
    correctAnswer: 'Meru / Kericho',
    explanation: 'Kericho and Meru receive very high orographic and convectional rainfall, making them world-famous for premium tea plantations.',
    socraticHint: 'Which highland town known for lush green tea estates receives very high rainfall throughout the year?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 46 (Unit 3 Lesson 2: q-g6-soc-u3-013 to 024)
  {
    id: 'q-g6-soc-u3-013',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What is the main driver of modern global climate change and rising temperatures worldwide?',
    options: [
      'Excessive emissions of greenhouse gases (like carbon dioxide and methane) from burning fossil fuels and deforestation',
      'The earth moving physically closer to the sun',
      'Volcanoes erupting continuously every day in every country',
      'Salt levels in oceans decreasing'
    ],
    correctAnswer: 'Excessive emissions of greenhouse gases (like carbon dioxide and methane) from burning fossil fuels and deforestation',
    explanation: 'Human industrial emissions and destruction of forests trap infrared radiation within the atmosphere, driving global warming.',
    socraticHint: 'What heat-trapping gases are released when oil, coal, and forests are burned?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-014',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What direct observable evidence of climate change has been recorded on the peaks of Mount Kenya over the past 50 years?',
    options: [
      'Severe melting and retreat of ancient ice glaciers',
      'Glaciers growing double in size and spreading to foothills',
      'The mountain sinking 1,000 metres into the earth',
      'Lava erupting from Batian peak'
    ],
    correctAnswer: 'Severe melting and retreat of ancient ice glaciers',
    explanation: 'Scientific monitoring shows the Lewis and Tyndall glaciers on Mount Kenya have shrunk by over 80% due to warming equatorial temperatures.',
    socraticHint: 'What happens to ice glaciers on high mountains when average air temperatures steadily rise?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-015',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'Which sustainable agricultural practice helps Kenyan farmers adapt to erratic rainfall in semi-arid counties like Machakos and Makueni?',
    options: [
      'Planting drought-tolerant early-maturing crops like sorghum, millet, and green grams (ndengu)',
      'Clearing all trees to let wind blow unobstructed',
      'Planting only water-thirsty crops that require daily flooding',
      'Waiting for government food aid without planting any crops'
    ],
    correctAnswer: 'Planting drought-tolerant early-maturing crops like sorghum, millet, and green grams (ndengu)',
    explanation: 'Indigenous grains like sorghum and millet require little rainfall to mature and withstand dry spells far better than hybrid maize.',
    socraticHint: 'Which traditional drought-hardy grains produce yields even when rainfall seasons are short and unreliable?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-016',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What major clean renewable energy source does Kenya tap abundantly at Olkaria in Naivasha from underground volcanic steam?',
    options: [
      'Geothermal energy',
      'Coal combustion',
      'Nuclear fission',
      'Diesel generators'
    ],
    correctAnswer: 'Geothermal energy',
    explanation: 'Olkaria Geothermal Power Station harnesses high-pressure underground volcanic steam to drive turbines, supplying over 40% of Kenya’s electricity with zero carbon emissions.',
    socraticHint: 'What green energy uses underground volcanic heat and steam to turn power turbines?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-017',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What is the term for a low barrier built across a seasonal dry sand river bed in eastern Kenya to trap clean drinking water beneath the sand?',
    options: [
      'Sand dam',
      'Concrete canal',
      'Borehole pump',
      'Drip irrigation nozzle'
    ],
    correctAnswer: 'Sand dam',
    explanation: 'Sand dams built across seasonal dry riverbeds trap coarse sand and water behind reinforced concrete walls, providing clean water shielded from evaporation.',
    socraticHint: 'What innovative masonry wall traps water under river sand, keeping it protected from sun evaporation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-018',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'Which negative social consequence frequently occurs in pastoralist regions of northern Kenya during extreme droughts caused by climate change?',
    options: [
      'Resource-based conflicts over dwindling water points and pasture between communities',
      'Rapid building of universities',
      'Decrease in milk prices due to overproduction',
      'Freezing of mountain rivers'
    ],
    correctAnswer: 'Resource-based conflicts over dwindling water points and pasture between communities',
    explanation: 'Scarcity of grazing grass and water boreholes can fuel tensions and cattle rustling among pastoralist groups competing for survival resources.',
    socraticHint: 'What happens when scarce pasture and dried-up boreholes force competing herders into the same grazing territory?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-019',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'How does planting trees (afforestation) directly help combat global climate change?',
    options: [
      'Trees absorb carbon dioxide from the atmosphere during photosynthesis and store it as wood biomass',
      'Trees create shade so the ground does not touch the sun',
      'Trees suck heat out of the soil through their roots',
      'Trees stop earthquakes from shaking the atmosphere'
    ],
    correctAnswer: 'Trees absorb carbon dioxide from the atmosphere during photosynthesis and store it as wood biomass',
    explanation: 'Trees act as vital "carbon sinks" by absorbing greenhouse gases (CO2) from the air and releasing life-giving oxygen.',
    socraticHint: 'Which greenhouse gas do green tree leaves take in from the air during photosynthesis?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-020',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What unusual hydrological phenomenon has affected Kenyan Rift Valley lakes like Baringo, Nakuru, and Naivasha in recent years?',
    options: [
      'Unprecedented rising water levels that flooded surrounding settlements, schools, and health facilities',
      'The lakes completely turning into dry salt desert plains',
      'Water in all lakes turning into boiling lava',
      'All fish walking out onto the land'
    ],
    correctAnswer: 'Unprecedented rising water levels that flooded surrounding settlements, schools, and health facilities',
    explanation: 'Increased regional rainfall, soil siltation from catchment deforestation, and tectonic plate activity have caused unprecedented rise in lake levels.',
    socraticHint: 'Did lake waters flood shoreline schools and lodges or dry up into sand dunes?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-021',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'Which renewable technology converts bright tropical sunlight directly into electricity without producing any smoke or carbon emissions?',
    options: [
      'Solar photovoltaic panels',
      'Diesel generator',
      'Charcoal jiko',
      'Kerosene lantern'
    ],
    correctAnswer: 'Solar photovoltaic panels',
    explanation: 'Solar panels capture energy from sunlight and convert it cleanly into electrical current for homes, schools, and hospitals.',
    socraticHint: 'Which rooftop panels capture the power of the sun to generate clean electricity?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-022',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'What is the term for harvesting and storing rainwater from roof gutters into plastic or masonry tanks for domestic use during dry seasons?',
    options: [
      'Rainwater harvesting',
      'Cloud seeding',
      'Underground mining',
      'River diversion'
    ],
    correctAnswer: 'Rainwater harvesting',
    explanation: 'Rainwater harvesting collects clean runoff from rooftops during rains, conserving municipal water and ensuring household water security.',
    socraticHint: 'What do we call collecting rainwater from the roof into household storage tanks?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-023',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'Why are coastal mangrove forests referred to as "blue carbon" ecosystems in climate discussions?',
    options: [
      'They store up to five times more carbon per hectare in their muddy roots and soils than terrestrial rainforests',
      'Their leaves are dyed bright blue by seawater',
      'They produce blue smoke when dry',
      'They are made of plastic recycled from the ocean'
    ],
    correctAnswer: 'They store up to five times more carbon per hectare in their muddy roots and soils than terrestrial rainforests',
    explanation: 'Mangrove sediment is oxygen-poor, preventing fallen organic matter from decomposing, thus trapping carbon for centuries.',
    socraticHint: 'Why are coastal salt-tolerant wetlands so effective at locking away trapped organic carbon in muddy soils?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u3-024',
    subStrandId: 'substrand-g6-soc-u3',
    lessonId: 'lesson-g6-soc-u3-l2',
    text: 'How can primary school pupils directly participate in Kenya’s climate action initiatives?',
    options: [
      'Planting and caring for indigenous trees at school and establishing environmental clubs',
      'Leaving water taps running all night',
      'Burning plastic bottles and dry waste behind classrooms',
      'Cutting down shade trees in the playground'
    ],
    correctAnswer: 'Planting and caring for indigenous trees at school and establishing environmental clubs',
    explanation: 'School tree nurseries, 4K Clubs, and environmental clubs empower learners to protect local nature and promote climate consciousness.',
    socraticHint: 'What positive conservation activity can learners do in school gardens to green their environment?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 47 (Unit 4 Lesson 1: q-g6-soc-u4-001 to 012)
  {
    id: 'q-g6-soc-u4-001',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Which is the only surviving tropical rainforest in Kenya, renowned for its tall timber trees, dense canopy, and unique primate species?',
    options: [
      'Kakamega Forest',
      'Arabuko Sokoke Forest',
      'Karura Forest',
      'Boni Forest'
    ],
    correctAnswer: 'Kakamega Forest',
    explanation: 'Kakamega Forest is Kenya’s only tropical rainforest, home to flying squirrels, De Brazza’s monkeys, and extraordinary bird biodiversity.',
    socraticHint: 'Which lush forest in Western Kenya is famous as the country’s only true equatorial rainforest?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-002',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'What major adaptation allows baobab and acacia trees to survive long dry seasons in the savannah grasslands?',
    options: [
      'Acacias have small waxy leaves and sharp thorns, while baobabs store thousands of litres of water in their thick spongy trunks',
      'They produce broad flat leaves that catch falling snow',
      'They grow underwater roots into the ocean',
      'They migrate to riverbanks every winter'
    ],
    correctAnswer: 'Acacias have small waxy leaves and sharp thorns, while baobabs store thousands of litres of water in their thick spongy trunks',
    explanation: 'Small leaves reduce water loss through transpiration, while the swollen succulent trunk of the baobab serves as a natural water reservoir.',
    socraticHint: 'How does the giant swollen trunk of a baobab tree help it endure prolonged dry periods?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-003',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Which vegetation zone is characterized by stilt roots and pneumatophores (breathing roots) growing in salty coastal mudflats and tidal creeks?',
    options: [
      'Mangrove forests',
      'Alpine heath and moorland',
      'Savannah grassland',
      'Bamboo thickets'
    ],
    correctAnswer: 'Mangrove forests',
    explanation: 'Mangroves thrive in saline intertidal waters; their exposed aerial breathing roots take in oxygen directly from the air during low tides.',
    socraticHint: 'What marine tree species grows in salty coastal bays like Lamu and Mombasa with tangled stilt roots?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-004',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Why do trees in the tropical rainforest have broad leaves and buttress roots?',
    options: [
      'Broad leaves maximize photosynthesis in cloudy areas, and buttress roots provide mechanical support for tall trees in shallow topsoil',
      'To prevent birds from sitting on branches',
      'Because the soil contains too much salt',
      'To allow wind to knock them over easily'
    ],
    correctAnswer: 'Broad leaves maximize photosynthesis in cloudy areas, and buttress roots provide mechanical support for tall trees in shallow topsoil',
    explanation: 'Buttress roots form large wooden flanges that anchor massive 40-metre tall emergent trees firmly in moist tropical forest soil.',
    socraticHint: 'Why do giant 45-metre tall rainforest trees need wide wall-like roots flaring out at their base?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-005',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'What vegetation zone is found at high mountain altitudes (between 3,000 and 4,000 metres) on Mount Kenya and Mount Kilimanjaro below the snow line?',
    options: [
      'Heath and moorland with giant groundsels (senecio) and giant lobelias',
      'Tropical coconut palms',
      'Extensive sugarcane plantations',
      'Mangrove swamps'
    ],
    correctAnswer: 'Heath and moorland with giant groundsels (senecio) and giant lobelias',
    explanation: 'Alpine moorland features unique afro-alpine vegetation like giant lobelias, giant groundsels, tussock grasses, and heather adapted to freezing night temperatures.',
    socraticHint: 'Which high altitude zone on Mt. Kenya features giant lobelias and groundsels surviving frosty mountain nights?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-006',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Why are savannah grasslands the natural home for large herbivore herds like wildebeests, zebras, and gazelles?',
    options: [
      'Abundant nutritious grasses (such as red oat grass) provide continuous grazing across wide open plains',
      'Trees are too dense for any animal to walk',
      'Snow protects them from predators',
      'There is no drinking water so predators cannot survive'
    ],
    correctAnswer: 'Abundant nutritious grasses (such as red oat grass) provide continuous grazing across wide open plains',
    explanation: 'Savannah plains offer vast fields of digestible forage and open visibility that allows grazers to detect approaching predators.',
    socraticHint: 'What dietary resource covers thousands of square kilometers in Maasai Mara to feed grazing herds?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-007',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'What adaptation enables desert plants like cacti and succulents in northern Kenya to survive years with little rain?',
    options: [
      'Fleshy stems and leaves that store water, and leaves reduced to sharp spines to minimize transpiration',
      'Large thin leaves that maximize water loss',
      'Growing tall soft trunks that absorb ocean fog',
      'Producing sweet fruit that attracts elephants'
    ],
    correctAnswer: 'Fleshy stems and leaves that store water, and leaves reduced to sharp spines to minimize transpiration',
    explanation: 'Succulents hold water in fleshy tissues, while spines reduce surface area exposed to heat and protect stored moisture from thirsty animals.',
    socraticHint: 'Why do desert plants turn their leaves into sharp spines instead of wide leafy surfaces?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-008',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Which indigenous coastal forest in Kilifi County is internationally protected as a biodiversity hotspot for rare birds (Sokoke scops owl) and golden-rumped elephant shrews?',
    options: [
      'Arabuko Sokoke Forest',
      'Kakamega Forest',
      'Mount Elgon Forest',
      'Marsabit Forest'
    ],
    correctAnswer: 'Arabuko Sokoke Forest',
    explanation: 'Arabuko Sokoke Forest is the largest remaining coastal dry forest in Eastern Africa, sheltering several globally endangered endemic species.',
    socraticHint: 'Which historic indigenous coastal forest near Malindi is famous for the tiny Sokoke scops owl?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-009',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'What term describes trees that shed their leaves during the dry season to prevent moisture loss through evaporation?',
    options: [
      'Deciduous trees',
      'Evergreen trees',
      'Coniferous trees',
      'Marine algae'
    ],
    correctAnswer: 'Deciduous trees',
    explanation: 'Deciduous trees (such as many acacias and baobabs) drop their leaves annually during dry periods to conserve vital water.',
    socraticHint: 'What botanical term refers to trees that shed their foliage during dry seasons?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-010',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Which dense bamboo vegetation belt is found on Mount Kenya and the Aberdare Ranges between 2,400 and 3,000 metres altitude?',
    options: [
      'Bamboo forest zone',
      'Mangrove creek',
      'Thorny scrubland',
      'Grass savannah'
    ],
    correctAnswer: 'Bamboo forest zone',
    explanation: 'The alpine bamboo zone forms an impenetrable thicket of high-altitude bamboo canes (Oldeania alpina) on wet mountain slopes.',
    socraticHint: 'Which tall hollow woody grass forms a distinct green ring on the wet slopes of the Aberdares?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-011',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'Why do mangrove poles (boriti) make highly valued building materials in coastal architecture (such as Lamu and Mombasa)?',
    options: [
      'They are naturally resistant to rot, termites, and salt-water damage',
      'They are soft like sponge and bend easily',
      'They are painted gold by nature',
      'They float in the air when dried'
    ],
    correctAnswer: 'They are naturally resistant to rot, termites, and salt-water damage',
    explanation: 'Mangrove timber is rich in tannins, making it dense, heavy, and extremely resistant to fungal decay, insects, and marine borers.',
    socraticHint: 'Why have coastal Swahili builders used mangrove "boriti" poles for ceiling beams for hundreds of years?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-012',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l1',
    text: 'What is the primary factor determining the distribution of different natural vegetation zones across Eastern Africa?',
    options: [
      'Rainfall and temperature variations influenced by altitude and latitude',
      'The number of domestic livestock present in the market',
      'The construction of tarmac highways',
      'The color of the soil'
    ],
    correctAnswer: 'Rainfall and temperature variations influenced by altitude and latitude',
    explanation: 'Water availability (rainfall) and temperature are the master environmental determinants governing which plants can survive in any region.',
    socraticHint: 'Which two fundamental climatic elements decide whether a landscape becomes a dense forest or a dry desert?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 48 (Unit 4 Lesson 2: q-g6-soc-u4-013 to 024)
  {
    id: 'q-g6-soc-u4-013',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What was the pioneering environmental organization founded by Nobel Laureate Professor Wangari Maathai in 1977?',
    options: [
      'The Green Belt Movement',
      'The Red Cross Society',
      'The African Wildlife Foundation',
      'The Boy Scouts Movement'
    ],
    correctAnswer: 'The Green Belt Movement',
    explanation: 'The Green Belt Movement mobilized grassroots rural women to plant millions of trees, defend public forests, and promote democratic rights.',
    socraticHint: 'Which famous Kenyan tree-planting movement was led by Wangari Maathai?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-014',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What is the primary government agency responsible for conserving, protecting, and managing public forests in Kenya?',
    options: [
      'Kenya Forest Service (KFS)',
      'Kenya National Highways Authority (KeNHA)',
      'Kenya Ports Authority (KPA)',
      'Kenya Revenue Authority (KRA)'
    ],
    correctAnswer: 'Kenya Forest Service (KFS)',
    explanation: 'Kenya Forest Service (KFS) manages state forests, enforces conservation laws, licenses sustainable forestry, and combats illegal logging.',
    socraticHint: 'Which statutory body with forest rangers protects national forests and tree reserves across Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-015',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What is agroforestry, and why is it promoted among Kenyan smallholder farmers?',
    options: [
      'The intentional practice of growing compatible trees alongside crops and livestock on the same piece of land',
      'Clearing all trees to spray chemical herbicides',
      'Planting trees only inside houses',
      'Selling forest land to commercial property developers'
    ],
    correctAnswer: 'The intentional practice of growing compatible trees alongside crops and livestock on the same piece of land',
    explanation: 'Agroforestry provides firewood, fruit, and nitrogen fixation for soils, while reducing pressure on natural indigenous forests.',
    socraticHint: 'What system combines agriculture (crops/livestock) with forestry (trees) on farms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-016',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What major ecological danger occurs when the Mau Forest Complex (Kenya’s largest water tower) is degraded and cleared?',
    options: [
      'Perennial rivers (like Mara, Sondu Miriu, and Ewaso Ngiro) dry up, leading to water crises and loss of downstream hydropower',
      'The ocean moves into the Rift Valley',
      'Lake Victoria turns completely into sand',
      'Snow begins falling in Mombasa'
    ],
    correctAnswer: 'Perennial rivers (like Mara, Sondu Miriu, and Ewaso Ngiro) dry up, leading to water crises and loss of downstream hydropower',
    explanation: 'Mau Forest feeds 12 major rivers; without its canopy sponge, rivers suffer erratic floods during storms and dry up into dust during dry seasons.',
    socraticHint: 'How does clearing the Mau Forest impact the rivers that supply water to Lake Victoria, Mara, and major HEP dams?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-017',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'Which community-based organization established under the Forest Conservation and Management Act allows local neighbors to participate in protecting forests?',
    options: [
      'Community Forest Associations (CFAs)',
      'County Transport Saccos',
      'Chamber of Commerce',
      'Boda Boda Riders Association'
    ],
    correctAnswer: 'Community Forest Associations (CFAs)',
    explanation: 'CFAs empower forest-adjacent communities to co-manage forests sustainably with KFS, enjoying beekeeping and ecotourism benefits.',
    socraticHint: 'What are the registered community associations called that partner with KFS to protect nearby forests?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-018',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What is the national target set by the Kenyan government for national tree cover to reverse environmental degradation by 2032?',
    options: [
      'Increasing tree cover to 30% by planting 15 billion trees',
      'Cutting tree cover down to 2%',
      'Covering 100% of all roads with wooden planks',
      'Exporting all timber to foreign countries'
    ],
    correctAnswer: 'Increasing tree cover to 30% by planting 15 billion trees',
    explanation: 'The Kenyan government has set a bold target of planting 15 billion trees by 2032 to raise national tree cover from ~12% to over 30%.',
    socraticHint: 'What percentage tree cover is Kenya striving to achieve by planting 15 billion trees by 2032?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-019',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'Which human activity has caused the greatest destruction of indigenous trees like cedar and camphor in the central highlands?',
    options: [
      'Illegal timber logging and commercial charcoal burning',
      'Children collecting fallen dry twigs for cooking',
      'Photographers taking wildlife pictures',
      'Tourists walking along forest trails'
    ],
    correctAnswer: 'Illegal timber logging and commercial charcoal burning',
    explanation: 'High commercial demand for hardwood construction timber and charcoal drives destructive logging inside protected catchment zones.',
    socraticHint: 'What illegal commercial trade cuts down mature indigenous trees for furniture timber and fuel?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-020',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What is the purpose of constructing solar-powered electric fences around national parks and major forest reserves (such as the Aberdare Conservation Fence)?',
    options: [
      'To prevent human-wildlife conflict and stop illegal loggers and poachers from entering',
      'To generate electricity for nearby shopping malls',
      'To trap wildlife inside for foreign meat markets',
      'To keep rain from falling outside the park'
    ],
    correctAnswer: 'To prevent human-wildlife conflict and stop illegal loggers and poachers from entering',
    explanation: 'Electric perimeter fences keep elephants from raiding adjacent farm crops while protecting endangered forest animals from illegal poachers.',
    socraticHint: 'Why did conservationists build a 400-km fence around the Aberdare forest to separate wildlife from farming communities?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-021',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'Which alternative energy technology reduces the need for rural families to cut trees for firewood and charcoal?',
    options: [
      'Biogas digesters and energy-saving cookstoves (jiko koa)',
      'Open wood campfires with four logs',
      'Gasoline generators run inside kitchens',
      'Burning coal bricks imported from abroad'
    ],
    correctAnswer: 'Biogas digesters and energy-saving cookstoves (jiko koa)',
    explanation: 'Biogas converts animal manure into clean burning methane gas, and insulated jikos use up to 50% less charcoal or wood.',
    socraticHint: 'Which domestic technology uses cattle manure to generate clean kitchen cooking gas?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-022',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'Why are indigenous tree species (such as Croton megalocarpus, Meru Oak, and Prunus africana) preferred for restoring water towers over exotic blue gum (Eucalyptus)?',
    options: [
      'Indigenous trees conserve underground water, whereas eucalyptus trees consume immense quantities of groundwater and dry up springs',
      'Indigenous trees grow completely without sunlight',
      'Eucalyptus trees only live for two weeks',
      'Indigenous trees produce plastic fruit'
    ],
    correctAnswer: 'Indigenous trees conserve underground water, whereas eucalyptus trees consume immense quantities of groundwater and dry up springs',
    explanation: 'Eucalyptus is notorious for its rapid transpiration and deep roots that deplete riparian water tables, making it banned near riverbanks.',
    socraticHint: 'Why is it forbidden to plant fast-growing eucalyptus (blue gum) trees right next to riverbeds and freshwater springs?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-023',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What valuable role do urban forests like Karura Forest in Nairobi play for city residents and the environment?',
    options: [
      'Purifying urban air, sequestering carbon, providing green recreation, and cooling city temperatures',
      'Serving as garbage dumps for municipal waste',
      'Providing land for private real estate and commercial skyscrapers',
      'Allowing free hunting of wild game'
    ],
    correctAnswer: 'Purifying urban air, sequestering carbon, providing green recreation, and cooling city temperatures',
    explanation: 'Karura Forest acts as the "green lungs" of Nairobi, absorbing urban emissions and providing walking trails and environmental education.',
    socraticHint: 'Why is a protected forest inside a crowded capital city described as the "green lungs" of the city?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u4-024',
    subStrandId: 'substrand-g6-soc-u4',
    lessonId: 'lesson-g6-soc-u4-l2',
    text: 'What is the penalty under Kenyan environmental law for setting deliberate fires or encroaching on gazetted national forest reserves?',
    options: [
      'Heavy monetary fines and long prison sentences enforced by environmental courts',
      'A reward of free timber from KFS',
      'An invitation to join the county assembly',
      'A free vacation to Mombasa'
    ],
    correctAnswer: 'Heavy monetary fines and long prison sentences enforced by environmental courts',
    explanation: 'The Forest Conservation and Management Act imposes severe penalties including fines exceeding KES 100,000 and jail terms for damaging forest reserves.',
    socraticHint: 'Does the law reward illegal forest burners or punish them with strict criminal fines and imprisonment?',
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

console.log(`Added ${questions.length} questions for Units 3 & 4.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 2 to cbe_database.json!');
