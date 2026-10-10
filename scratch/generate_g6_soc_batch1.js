/**
 * Grade 6 Social Studies - Batch 1 Generator
 * Setup: Learning Area (la-social-g6), 4 Strands, world-kenya-explorer registration
 * Content: Units 1 & 2
 * - Unit 1: Physical Environment, Map Reading & Position of Eastern Africa
 * - Unit 2: Physical Features, Relief & Drainage Systems of Eastern Africa
 * Missions: Orders 41, 42, 43, 44 (world-kenya-explorer)
 * Questions: 48 (24 per unit: q-g6-soc-u1-001 to q-g6-soc-u2-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Social Studies Batch 1 (Setup + Units 1 & 2) ---');

// 1. Setup Learning Area: la-social-g6
const laSocialG6 = {
  id: 'la-social-g6',
  gradeId: 'grade-6',
  name: 'Social Studies',
  swahiliName: 'Masomo ya Jamii',
  icon: 'compass',
  color: '#EC4899',
  description: 'Eastern Africa physical geography, historical migrations and communities, regional economic integration (EAC), mining, agriculture, governance, and civic rights.',
  strandsCount: 4
};

if (!db.learningAreas.some(la => la.id === laSocialG6.id)) {
  db.learningAreas.push(laSocialG6);
  console.log('Added learning area la-social-g6');
}

// Ensure world-kenya-explorer includes la-social-g6
const explorerWorld = db.gameWorlds.find(w => w.id === 'world-kenya-explorer');
if (explorerWorld && !explorerWorld.learningAreaIds.includes('la-social-g6')) {
  explorerWorld.learningAreaIds.push('la-social-g6');
  console.log('Added la-social-g6 to world-kenya-explorer');
}

// 2. Setup 4 Strands
const socialStrands = [
  {
    id: 'strand-g6-soc-environment',
    learningAreaId: 'la-social-g6',
    code: 'SOC-G6-STR-01',
    title: 'Natural and Built Environments of Eastern Africa',
    name: 'Natural and Built Environments of Eastern Africa',
    swahiliTitle: 'Mazingira Asilia na Yaliyojengwa ya Afrika Mashariki',
    description: 'Map reading skills, position and size of Eastern African countries, major physical features, drainage systems, climatic regions, and environmental conservation.',
    icon: 'compass',
    grade: 'G6'
  },
  {
    id: 'strand-g6-soc-people-culture',
    learningAreaId: 'la-social-g6',
    code: 'SOC-G6-STR-02',
    title: 'People, Population and Cultural Heritage',
    name: 'People, Population and Cultural Heritage',
    swahiliTitle: 'Watu, Idadi ya Watu na Urithi wa Kitamaduni',
    description: 'Language groups of Eastern Africa, historical migration routes, population distribution and factors, age sets, clans, and preservation of cultural heritage.',
    icon: 'users',
    grade: 'G6'
  },
  {
    id: 'strand-g6-soc-resources',
    learningAreaId: 'la-social-g6',
    code: 'SOC-G6-STR-03',
    title: 'Resources and Economic Activities in Eastern Africa',
    name: 'Resources and Economic Activities in Eastern Africa',
    swahiliTitle: 'Rasilimali na Shughuli za Kiuchumi za Afrika Mashariki',
    description: 'Cash crop farming, livestock production, mining, forestry, wildlife and tourism, fisheries, transport, communication, and regional trade (EAC).',
    icon: 'briefcase',
    grade: 'G6'
  },
  {
    id: 'strand-g6-soc-citizenship',
    learningAreaId: 'la-social-g6',
    code: 'SOC-G6-STR-04',
    title: 'Governance, Citizenship and Regional Cooperation',
    name: 'Governance, Citizenship and Regional Cooperation',
    swahiliTitle: 'Uongozi, Uraia na Ushirikiano wa Kikanda',
    description: 'Traditional leaders, colonial resistance, the struggle for independence, Kenyan constitutional democracy, electoral processes, and East African Community organs.',
    icon: 'scale',
    grade: 'G6'
  }
];

socialStrands.forEach(s => {
  if (!db.strands.some(existing => existing.id === s.id)) {
    db.strands.push(s);
    console.log('Added strand:', s.id);
  }
});

// 3. Units 1 & 2 (subStrands)
const units = [
  {
    id: 'substrand-g6-soc-u1',
    strandId: 'strand-g6-soc-environment',
    learningAreaId: 'la-social-g6',
    title: 'Physical Environment, Map Reading & Position of Eastern Africa',
    name: 'Physical Environment, Map Reading & Position of Eastern Africa',
    description: 'Locating Eastern Africa on the world map using latitudes and longitudes, identifying member countries (Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, Ethiopia, Somalia, Djibouti, Eritrea, Sudan), calculating distances using linear scale, and interpreting topographical symbols.',
    cbeCompetency: 'Cartographic interpretation, spatial coordinate calculation, regional geographic literacy, and map orientation',
    estimatedMinutes: 30,
    order: 1,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-soc-u2',
    strandId: 'strand-g6-soc-environment',
    learningAreaId: 'la-social-g6',
    title: 'Physical Features, Relief & Drainage Systems of Eastern Africa',
    name: 'Physical Features, Relief & Drainage Systems of Eastern Africa',
    description: 'Examining the Great Rift Valley, fold and block mountains, volcanic features (Mt. Kilimanjaro, Mt. Kenya, Ruwenzori), major lakes (Victoria, Tanganyika, Turkana, Naivasha), river basins (Nile, Tana, Athi-Galana, Pangani), and their socio-economic benefits.',
    cbeCompetency: 'Geomorphological analysis, drainage basin mapping, understanding human-environment interactions, and water resource valuation',
    estimatedMinutes: 30,
    order: 2,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 4. Lessons for Units 1 & 2
const lessons = [
  // Unit 1
  {
    id: 'lesson-g6-soc-u1-l1',
    subStrandId: 'substrand-g6-soc-u1',
    title: 'Position, Shape, Size & Countries of Eastern Africa',
    content: 'Eastern Africa is a diverse geographic region situated on the eastern part of the African continent.\n\n1. Latitudinal and Longitudinal Extent:\n- Latitudes: Lies roughly between 23°N (northern Sudan) and 12°S (southern Tanzania).\n- The Equator (0° latitude) passes directly through Kenya, Uganda, and Somalia.\n- Longitudes: Lies between 22°E and 51°E (Ras Hafun in Somalia is the easternmost point of mainland Africa).\n\n2. Countries of Eastern Africa and Their Capitals:\n- Kenya (Nairobi), Uganda (Kampala), Tanzania (Dodoma), Rwanda (Kigali), Burundi (Gitega)\n- South Sudan (Juba), Sudan (Khartoum), Ethiopia (Addis Ababa), Somalia (Mogadishu)\n- Djibouti (Djibouti City), Eritrea (Asmara).\n\n3. Regional Water Boundaries:\n- To the East: The Indian Ocean.\n- To the Northeast: The Red Sea.\n\n4. Landlocked vs Coastal Countries:\n- Coastal: Kenya, Tanzania, Somalia, Djibouti, Eritrea, Sudan.\n- Landlocked (no coastline): Uganda, Rwanda, Burundi, South Sudan, Ethiopia.\n- Landlocked nations rely on maritime transit ports like Mombasa (Kenya) and Dar es Salaam (Tanzania).',
    didYouKnow: 'Ethiopia is the most populous landlocked country in the world, with over 120 million people, and relies heavily on the port of Djibouti for overseas trade!',
    kenyanContext: 'Kenya serves as the vital maritime gateway for landlocked neighbors Uganda, Rwanda, and South Sudan via the Northern Transport Corridor starting at the Port of Mombasa.',
    order: 1,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u1-l2',
    subStrandId: 'substrand-g6-soc-u1',
    title: 'Map Reading: Scale, Bearings & Conventional Symbols',
    content: 'Cartography allows geographers to accurately represent landscapes on paper.\n\n1. Types of Map Scales:\n- Linear Scale: A divided line showing corresponding ground distances (e.g. 0 to 5 km).\n- Representative Fraction (RF) or Ratio Scale: Expressed as a fraction or ratio, e.g. 1:50,000 (1 cm on the map represents 50,000 cm = 500 m on the ground).\n- Statement Scale: Expressed in words, e.g. "One centimetre represents one kilometre".\n\n2. Measuring Distance on Maps:\n- Straight distance: Measured using a ruler or straight edge of paper.\n- Curved routes (roads, rivers): Measured using a piece of thread or straight edge technique along curved segments, then matched to the linear scale.\n\n3. Direction and Bearings:\n- 16-point compass: North (0°/360°), East (90°), South (180°), West (270°), North East (45°), etc.\n- True bearing is always measured clockwise from North using a 360° protractor.\n\n4. Conventional Symbols and Marginal Information:\n- Title: Names the area shown.\n- Frame: Borders the map.\n- Key/Legend: Explains colors and symbols (e.g. blue for water bodies, green for forests, brown contours for elevation).\n- North Arrow: Establishes orientation.',
    didYouKnow: 'Contour lines are brown lines on topographical maps joining places of equal elevation above sea level. When contours are close together, the slope is steep; when far apart, the land is gentle!',
    kenyanContext: 'Survey of Kenya topographic maps (1:50,000 scale) are used by road engineers, national park wardens, and agricultural planners across all 47 counties.',
    order: 2,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },

  // Unit 2
  {
    id: 'lesson-g6-soc-u2-l1',
    subStrandId: 'substrand-g6-soc-u2',
    title: 'The Great Rift Valley & Major Mountains of Eastern Africa',
    content: 'Eastern Africa possesses dramatic relief shaped by tectonic faulting, volcanic activity, and folding.\n\n1. The Great Rift Valley:\n- Formed by tensional forces pulling tectonic plates apart, followed by normal faulting and sinking of the central block (graben).\n- Western Branch: Runs through Uganda, Rwanda, Burundi, DR Congo, and Tanzania; contains deep fault lakes like Lake Tanganyika, Lake Kivu, and Lake Albert.\n- Eastern Branch (Gregory Rift): Runs from Ethiopia through Kenya (Turkana, Baringo, Nakuru, Naivasha) to Tanzania (Manyara, Natron).\n- Escarpments: Steep cliff-like edges of the Rift Valley (e.g. Mau Escarpment, Aberdare/Nyandarua Escarpment, Elgeyo Escarpment).\n\n2. Mountains and Their Formation:\n- Volcanic Mountains: Formed when molten magma erupts through the crust and solidifies. Examples: Mount Kilimanjaro (highest peak in Africa, 5,895 m, Tanzania), Mount Kenya (5,199 m, Kenya), Mount Elgon (extinct volcano on Kenya-Uganda border), Mount Meru.\n- Block / Fault (Horst) Mountains: Formed when land between parallel fault lines is pushed upward by compressional or tensional forces. Example: Ruwenzori Mountains ("Mountains of the Moon", on Uganda-DR Congo border; non-volcanic, snow-capped), Usambara and Pare mountains in Tanzania.\n- Fold Mountains: Rare in Eastern Africa, but small folds exist in sediment basins.\n\n3. Importance of Mountains:\n- Catchment water towers (source of rivers like Tana, Athi, Nile).\n- Fertile volcanic soils supporting coffee, tea, and pyrethrum.\n- Tourism and mountain climbing (foreign exchange earnings).\n- Relief rainfall on windward slopes.',
    didYouKnow: 'Mount Ruwenzori on the Uganda border is a block mountain (horst) and NOT volcanic, yet its highest peak Margherita (5,109 m) is permanently glaciated despite being right near the Equator!',
    kenyanContext: 'Mount Kenya is revered as Kirinyaga by the Agikuyu, Ol Donyo Keri by the Maasai, and serves as the principal water tower providing water to the Seven Forks hydroelectric dams along the Tana River.',
    order: 3,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u2-l2',
    subStrandId: 'substrand-g6-soc-u2',
    title: 'Drainage Systems: Rivers, Lakes & Oceans of Eastern Africa',
    content: 'Eastern Africa has an extraordinary network of freshwater and rift lakes, perennial rivers, and coastal waters.\n\n1. Major Lakes of Eastern Africa:\n- Lake Victoria (Nam Lolwe / Nnalubaale): Largest lake in Africa, shared by Kenya (6%), Uganda (45%), and Tanzania (49%). Formed by downwarping (crustal sagging). Major freshwater fishery.\n- Lake Tanganyika: Longest and second deepest freshwater lake in the world (over 1,470 m deep), formed by faulting in the Western Rift.\n- Lake Turkana (Jade Sea): Largest desert lake in the world, alkaline Rift Valley lake fed by the Omo River.\n- Soda/Alkaline Lakes: Magadi, Nakuru, Bogoria, Elementaita, Natron; famous for flamingo feeding grounds and trona (soda ash) extraction.\n\n2. Major Rivers and Drainage Basins:\n- River Nile (White Nile): Longest river in the world, originating from Lake Victoria, flowing north through Uganda, South Sudan, Sudan, and Egypt into the Mediterranean Sea.\n- River Tana: Longest river in Kenya (over 1,000 km), originating in Mount Kenya and Aberdares, flowing into the Indian Ocean; supports Seven Forks dams and Bura/Hola irrigation schemes.\n- River Athi-Galana-Sabaki: Flows from Ngong Hills into the Indian Ocean north of Malindi.\n- River Omo: Originates in Ethiopian highlands, drains into Lake Turkana (an inland drainage basin with no outlet).\n- River Rufiji & Pangani: Major perennial rivers in Tanzania draining into the Indian Ocean.\n\n3. Socio-Economic Importance of Drainage:\n- Fresh water for domestic and industrial use.\n- Hydroelectric power (HEP) generation (e.g. Masinga, Kiambere on Tana River; Owen Falls / Nalubaale Dam on River Nile in Uganda).\n- Irrigation schemes supporting food security.\n- Inland water transport (ferries on Lake Victoria linking Kisumu, Mwanza, and Entebbe).',
    didYouKnow: 'Lake Victoria is a downwarping lake, meaning it is relatively shallow (maximum depth only about 84 meters), whereas Lake Tanganyika in the Western Rift reaches a staggering depth of 1,470 meters!',
    kenyanContext: 'The Port of Kisumu on Lake Victoria enables cargo vessels and passenger ferries to transport Kenyan tea, petroleum, and farm produce directly to Uganda and Tanzania without road border delays.',
    order: 4,
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

// 5. Missions 41 to 44 (world-kenya-explorer)
const missions = [
  {
    id: 'mission-g6-soc-u1-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 41: Coordinates of the Horn – Eastern African Map Expedition',
    description: 'Master the latitudes, longitudes, boundaries, capitals, and landlocked nations across Eastern Africa.',
    order: 41,
    orderIndex: 41,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-cartographer',
    badge: 'badge-g6-soc-cartographer',
    lessonId: 'lesson-g6-soc-u1-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u1-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u1-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 42: Scale & Contours – Master Navigator Challenge',
    description: 'Calculate real-world ground distances, calculate bearings, and decode topographical symbols like a seasoned surveyor.',
    order: 42,
    orderIndex: 42,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-navigator',
    badge: 'badge-g6-soc-navigator',
    lessonId: 'lesson-g6-soc-u1-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u1-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u2-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 43: Great Rift & Mountain Giants – Relief Explorer',
    description: 'Trace the Eastern and Western Rift Valleys, volcanic summits, and horst peaks from Kilimanjaro to Ruwenzori.',
    order: 43,
    orderIndex: 43,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-rift-explorer',
    badge: 'badge-g6-soc-rift-explorer',
    lessonId: 'lesson-g6-soc-u2-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u2-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u2-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 44: Waters of the Nile & Great Lakes – Drainage Voyager',
    description: 'Navigate the massive waters of Lake Victoria, Tanganyika, the Nile River basin, and Kenyan hydroelectric cascades.',
    order: 44,
    orderIndex: 44,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-drainage-voyager',
    badge: 'badge-g6-soc-drainage-voyager',
    lessonId: 'lesson-g6-soc-u2-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u2-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  }
];

missions.forEach(m => {
  if (!db.missions.some(existing => existing.id === m.id)) {
    db.missions.push(m);
    console.log('Added mission:', m.id);
  }
});

// 6. Questions: 48 Questions
const questions = [
  // Mission 41 (Unit 1 Lesson 1: q-g6-soc-u1-001 to 012)
  {
    id: 'q-g6-soc-u1-001',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which major line of latitude passes directly through Kenya, Uganda, and Somalia in Eastern Africa?',
    options: [
      'The Equator (0°)',
      'The Tropic of Capricorn (23.5°S)',
      'The Tropic of Cancer (23.5°N)',
      'The Prime Meridian (0°)'
    ],
    correctAnswer: 'The Equator (0°)',
    explanation: 'The Equator (latitude 0°) divides the earth into the northern and southern hemispheres and cuts right across Kenya, Uganda, and Somalia.',
    socraticHint: 'Which central line of latitude divides the northern and southern hemispheres and cuts across central Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-002',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which of the following countries in Eastern Africa is completely landlocked (has no direct coastline to an ocean or sea)?',
    options: [
      'Uganda',
      'Kenya',
      'Tanzania',
      'Somalia'
    ],
    correctAnswer: 'Uganda',
    explanation: 'Uganda is entirely surrounded by land and must access overseas maritime shipping through ports in Kenya (Mombasa) or Tanzania (Dar es Salaam).',
    socraticHint: 'Which country borders Kenya on the west and relies on Mombasa port because it lacks an ocean coastline?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-003',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'What is the capital city of Ethiopia?',
    options: [
      'Addis Ababa',
      'Asmara',
      'Khartoum',
      'Djibouti City'
    ],
    correctAnswer: 'Addis Ababa',
    explanation: 'Addis Ababa is the capital city of Ethiopia and also serves as the headquarters of the African Union (AU).',
    socraticHint: 'Which historic city in the Ethiopian highlands hosts the African Union headquarters?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-004',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which body of water forms the eastern international boundary of Kenya, Tanzania, and Somalia?',
    options: [
      'The Indian Ocean',
      'The Atlantic Ocean',
      'The Mediterranean Sea',
      'The Red Sea'
    ],
    correctAnswer: 'The Indian Ocean',
    explanation: 'The Indian Ocean borders Eastern Africa to the east, providing crucial sea trade routes connecting Africa with Asia, Europe, and the Americas.',
    socraticHint: 'Which major warm ocean washes the sandy beaches of Mombasa, Lamu, and Zanzibar?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-005',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which country in the Horn of Africa has the longest coastline in mainland Africa?',
    options: [
      'Somalia',
      'Kenya',
      'Eritrea',
      'Sudan'
    ],
    correctAnswer: 'Somalia',
    explanation: 'Somalia has an extensive coastline stretching over 3,000 kilometres along the Gulf of Aden and the Indian Ocean.',
    socraticHint: 'Which Horn of Africa nation curves around the easternmost point of Africa with thousands of kilometers of coastline?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-006',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which of the following pairs contains ONLY landlocked Eastern African nations?',
    options: [
      'Rwanda and South Sudan',
      'Kenya and Tanzania',
      'Eritrea and Djibouti',
      'Somalia and Sudan'
    ],
    correctAnswer: 'Rwanda and South Sudan',
    explanation: 'Both Rwanda and South Sudan have no ocean coastline and are bordered entirely by other countries.',
    socraticHint: 'Which pair consists of nations that have no direct access to the sea or ocean?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-007',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'What is the capital city of South Sudan, the newest nation in Eastern Africa?',
    options: [
      'Juba',
      'Khartoum',
      'Kigali',
      'Gitega'
    ],
    correctAnswer: 'Juba',
    explanation: 'Juba is the capital and largest city of South Sudan, situated along the White Nile River.',
    socraticHint: 'Which city located on the White Nile became the capital of South Sudan after its independence in 2011?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-008',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which body of water borders Sudan, Eritrea, and Djibouti to the northeast?',
    options: [
      'The Red Sea',
      'The Mediterranean Sea',
      'Lake Victoria',
      'The Persian Gulf'
    ],
    correctAnswer: 'The Red Sea',
    explanation: 'The Red Sea lies to the northeast of Sudan, Eritrea, and Djibouti, connecting to the Mediterranean via the Suez Canal.',
    socraticHint: 'Which narrow sea separates northeastern Africa from the Arabian Peninsula?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-009',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which point in Somalia marks the easternmost tip of mainland Africa?',
    options: [
      'Ras Hafun',
      'Cape Verde',
      'Cape of Good Hope',
      'Ras ben Sakka'
    ],
    correctAnswer: 'Ras Hafun',
    explanation: 'Ras Hafun in Somalia (around longitude 51°E) is recognized by geographers as the most easterly point on mainland Africa.',
    socraticHint: 'What is the geographic name of the headland on the Somali coast that juts out farthest to the east?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-010',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Why is the Port of Mombasa critical to the economic well-being of landlocked Uganda and Rwanda?',
    options: [
      'It provides the primary sea transit gateway for imports and exports through the Northern Corridor',
      'It is the only port in the world that processes coffee beans',
      'Uganda and Rwanda own the territorial waters of Mombasa',
      'All goods entering Mombasa are donated free of charge'
    ],
    correctAnswer: 'It provides the primary sea transit gateway for imports and exports through the Northern Corridor',
    explanation: 'Because Uganda and Rwanda lack coastlines, the port of Mombasa handles their heavy machinery, fuel imports, and agricultural exports via rail and highway.',
    socraticHint: 'How do landlocked nations transport heavy fuel, vehicles, and bulky container goods arriving across the ocean?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-011',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'What is the constitutional capital of Tanzania where the parliament sits?',
    options: [
      'Dodoma',
      'Dar es Salaam',
      'Arusha',
      'Mwanza'
    ],
    correctAnswer: 'Dodoma',
    explanation: 'Dodoma is the official designated capital city of Tanzania, while Dar es Salaam remains the largest commercial port city.',
    socraticHint: 'Which central city was officially designated as the political capital of Tanzania?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-012',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l1',
    text: 'Which tiny nation situated on the Bab-el-Mandeb strait serves as the primary sea transit port for Ethiopia?',
    options: [
      'Djibouti',
      'Eritrea',
      'Burundi',
      'Rwanda'
    ],
    correctAnswer: 'Djibouti',
    explanation: 'Djibouti is strategically located at the entrance to the Red Sea, and its modern container ports handle over 90% of landlocked Ethiopia’s foreign trade.',
    socraticHint: 'Which small nation at the mouth of the Red Sea shares its name with its capital city and handles Ethiopian cargo?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 42 (Unit 1 Lesson 2: q-g6-soc-u1-013 to 024)
  {
    id: 'q-g6-soc-u1-013',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'If a map scale is given as 1:50,000, what actual ground distance does 2 centimetres on the map represent?',
    options: [
      '1 kilometre',
      '5 kilometres',
      '50 metres',
      '100 kilometres'
    ],
    correctAnswer: '1 kilometre',
    explanation: 'At 1:50,000, 1 cm represents 50,000 cm = 500 m. Therefore, 2 cm represents 2 × 500 m = 1,000 m = 1 km.',
    socraticHint: 'If 1 cm represents 50,000 cm (which is 500 metres), how many metres do 2 cm represent?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-014',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'Which marginal feature on a map provides an explanation for all colors, signs, and symbols used by the cartographer?',
    options: [
      'Key or Legend',
      'Title',
      'Frame',
      'Compass rose'
    ],
    correctAnswer: 'Key or Legend',
    explanation: 'The key (or legend) unlocks the map by defining what every line, color, symbol, and abbreviation stands for.',
    socraticHint: 'Which box on a map explains what blue lines, green patches, and little church symbols mean?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-015',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'What do closely packed contour lines indicate on a topographical map?',
    options: [
      'A steep slope or cliff',
      'A gentle valley or flat plain',
      'A wide swamp',
      'A sandy coastal beach'
    ],
    correctAnswer: 'A steep slope or cliff',
    explanation: 'Contour lines join points of equal elevation. When they are tightly packed together, elevation changes rapidly over a short horizontal distance, indicating a steep slope.',
    socraticHint: 'If elevation rises very rapidly in a short distance, will the height lines be crowded close together or spaced far apart?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-016',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'Which practical tool is most accurate for measuring the distance of a winding, curved river on a map before placing it on the linear scale?',
    options: [
      'A piece of damp thread or edge of straight paper along segments',
      'A rigid steel ruler bent forcefully',
      'A magnetic compass',
      'A circular protractor'
    ],
    correctAnswer: 'A piece of damp thread or edge of straight paper along segments',
    explanation: 'A piece of thread can follow the twists and bends of a meandering river or road precisely, and then be stretched straight against the map’s linear scale.',
    socraticHint: 'Which flexible material can easily bend along curvy river meanders without breaking?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-017',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'What is the compass bearing of South-East (SE) measured clockwise from True North (0°)?',
    options: [
      '135°',
      '45°',
      '90°',
      '225°'
    ],
    correctAnswer: '135°',
    explanation: 'North is 0°, East is 90°, and South is 180°. South-East is halfway between East and South: 90° + 45° = 135°.',
    socraticHint: 'East is 90 degrees and South is 180 degrees. What angle lies exactly midway between 90 and 180?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-018',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'How is a scale written as "1 cm represents 2 km" converted into a Representative Fraction (RF)?',
    options: [
      '1:200,000',
      '1:2,000',
      '1:20,000',
      '1:200'
    ],
    correctAnswer: '1:200,000',
    explanation: '1 km = 100,000 cm. Therefore, 2 km = 200,000 cm. Written as a ratio or fraction, it is 1:200,000.',
    socraticHint: 'How many centimetres are in one kilometre (100,000 cm)? So how many centimetres are in two kilometres?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-019',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'On a standard survey map, which conventional color is universally used to depict water bodies like oceans, lakes, and permanent rivers?',
    options: [
      'Blue',
      'Green',
      'Brown',
      'Black'
    ],
    correctAnswer: 'Blue',
    explanation: 'Cartographers use blue for all hydrological features including oceans, lakes, reservoirs, swamps, and rivers.',
    socraticHint: 'What color is universally associated with water and aquatic features on maps?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-020',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'What does a small circle with a dot in the centre and the abbreviation "Trig. Stn." represent on a topographical map?',
    options: [
      'A trigonometrical station marking a precise surveyed elevation',
      'A traffic roundabout with police check',
      'A traditional cattle dip',
      'A borehole for drinking water'
    ],
    correctAnswer: 'A trigonometrical station marking a precise surveyed elevation',
    explanation: 'Trigonometrical stations (Trig stations) are permanent surveyed survey marks used by surveyors to measure precise elevations and coordinates across the country.',
    socraticHint: 'What surveyed landmark marked with a triangle or circle shows an accurately measured geodetic height point?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-021',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'Which 16-point compass direction lies directly opposite to North-North-West (NNW)?',
    options: [
      'South-South-East (SSE)',
      'South-South-West (SSW)',
      'North-North-East (NNE)',
      'East-South-East (ESE)'
    ],
    correctAnswer: 'South-South-East (SSE)',
    explanation: 'Every compass point has an exact opposite 180° away: the opposite of North is South, and the opposite of West is East; hence opposite of NNW is SSE.',
    socraticHint: 'Invert every component: North becomes South, North becomes South, and West becomes East.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-022',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'What does a brown contour line that forms concentric circles with increasing height numbers towards the centre represent?',
    options: [
      'A hill or mountain peak',
      'A sunken depression or crater',
      'A dry river bed',
      'A coastal lagoon'
    ],
    correctAnswer: 'A hill or mountain peak',
    explanation: 'When closed concentric contours increase in height toward the centre, they depict land rising to a hill crest or mountain summit.',
    socraticHint: 'If the elevation numbers get higher and higher as you move inward toward the center, is the land rising up or dipping down?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-023',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'Which element of a map ensures that the reader understands which area and subject matter is being represented?',
    options: [
      'The Title',
      'The North Arrow',
      'The Publisher mark',
      'The Latitude grid'
    ],
    correctAnswer: 'The Title',
    explanation: 'The title clearly states what the map represents (e.g. "Physical Features of Eastern Africa" or "Road Map of Nakuru County").',
    socraticHint: 'What heading at the top of a document or map informs you of its identity and topic?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u1-024',
    subStrandId: 'substrand-g6-soc-u1',
    lessonId: 'lesson-g6-soc-u1-l2',
    text: 'If a school is due West of a church, what is the compass direction of the church from the school?',
    options: [
      'East',
      'West',
      'North',
      'South'
    ],
    correctAnswer: 'East',
    explanation: 'Directions are reciprocal opposites: if the school is West of the church, then standing at the school and looking at the church requires facing East.',
    socraticHint: 'If point A is to your left (West), in which direction are you looking from point A back to your starting point?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 43 (Unit 2 Lesson 1: q-g6-soc-u2-001 to 012)
  {
    id: 'q-g6-soc-u2-001',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'What geological process formed the Great Rift Valley in Eastern Africa?',
    options: [
      'Faulting caused by tensional forces pulling the earth’s crust apart',
      'Wind erosion blowing away soft sandy soils over millions of years',
      'Deposition of sediment by river floods',
      'Glacier ice carving deep U-shaped valleys'
    ],
    correctAnswer: 'Faulting caused by tensional forces pulling the earth’s crust apart',
    explanation: 'Tensional forces in the earth’s crust caused parallel normal faults, and the central block slipped downwards (forming a graben or rift valley).',
    socraticHint: 'Which tectonic process involves underground forces pulling rocks apart until fractures and sinking blocks occur?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-002',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Which is the highest mountain peak in Africa, standing at 5,895 metres in northern Tanzania?',
    options: [
      'Mount Kilimanjaro (Kibo peak)',
      'Mount Kenya (Batian peak)',
      'Mount Ruwenzori (Margherita peak)',
      'Mount Elgon (Wagagai peak)'
    ],
    correctAnswer: 'Mount Kilimanjaro (Kibo peak)',
    explanation: 'Mount Kilimanjaro is a volcanic mountain in Tanzania and the highest free-standing mountain in the world at 5,895 metres.',
    socraticHint: 'Which famous snow-capped volcanic mountain in Tanzania is the highest peak on the entire African continent?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-003',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'How are block (horst) mountains such as the Ruwenzori Mountains formed differently from volcanic mountains like Mount Kenya?',
    options: [
      'Block mountains were uplifted between fault lines by tectonic forces, rather than formed by lava eruptions',
      'Block mountains were formed by ocean coral reefs',
      'Block mountains were created by meteor impacts',
      'Block mountains consist only of hardened river mud'
    ],
    correctAnswer: 'Block mountains were uplifted between fault lines by tectonic forces, rather than formed by lava eruptions',
    explanation: 'Horst (block) mountains like the Ruwenzori and Usambara are fault-formed blocks of older crust pushed upward between parallel faults, with no volcanic lava origins.',
    socraticHint: 'What happens when tectonic faulting uplifts a central block of the earth’s crust while surrounding blocks sink?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-004',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Which steep, wall-like cliff forms the dramatic boundary edge of the Rift Valley in Kenya?',
    options: [
      'Escarpment (e.g. Mau or Elgeyo Escarpment)',
      'Delta',
      'Sand spit',
      'Coral atoll'
    ],
    correctAnswer: 'Escarpment (e.g. Mau or Elgeyo Escarpment)',
    explanation: 'An escarpment is a steep slope or long cliff resulting from faulting along the edge of the Rift Valley, such as the Mau, Nyandarua, and Elgeyo escarpments.',
    socraticHint: 'What geographical term describes the dramatic steep cliff or drop-off along the rim of the Rift Valley?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-005',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'On which international boundary is the extinct volcanic mountain Mount Elgon located?',
    options: [
      'Kenya - Uganda border',
      'Kenya - Tanzania border',
      'Uganda - DR Congo border',
      'Ethiopia - Kenya border'
    ],
    correctAnswer: 'Kenya - Uganda border',
    explanation: 'Mount Elgon straddles the border between western Kenya (Bungoma/Trans-Nzoia) and eastern Uganda.',
    socraticHint: 'Which mountain famous for Kitum Cave elephants lies on the border between Kenya and Uganda?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-006',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Why do the windward slopes of Mount Kenya and Mount Kilimanjaro receive abundant rainfall compared to their leeward slopes?',
    options: [
      'Moist trade winds are forced to rise, cool, condense, and drop relief (orographic) rainfall on the windward side',
      'The sun only shines on the leeward side',
      'Clouds are terrified of mountains and turn around',
      'Forests on the windward side pump underground water into the clouds'
    ],
    correctAnswer: 'Moist trade winds are forced to rise, cool, condense, and drop relief (orographic) rainfall on the windward side',
    explanation: 'As moist air hits a high mountain ridge, it is forced upward, cools at higher altitudes, condenses into clouds, and releases orographic (relief) rain on the windward slope.',
    socraticHint: 'What happens to moist air when a tall mountain forces it to rise into colder upper altitudes?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-007',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Which mountain range on the Uganda-DR Congo border is poetically referred to as the "Mountains of the Moon"?',
    options: [
      'Ruwenzori Mountains',
      'Aberdare Ranges',
      'Usambara Mountains',
      'Chyulu Hills'
    ],
    correctAnswer: 'Ruwenzori Mountains',
    explanation: 'The Ruwenzori Mountains were named the "Mountains of the Moon" by early geographers due to their mist-shrouded, snow-capped glaciated peaks near the Equator.',
    socraticHint: 'Which block mountain range on the western edge of Uganda carries the historic nickname "Mountains of the Moon"?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-008',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'What major economic benefit do volcanic highlands in Kenya (such as Kisii, Kericho, and Kiambu) provide to local communities?',
    options: [
      'Fertile volcanic soils ideal for intensive tea, coffee, and food crop cultivation',
      'Large commercial deposits of crude petroleum oil',
      'Access to deep sea fishing harbours',
      'Flat desert plains suitable for camel caravans'
    ],
    correctAnswer: 'Fertile volcanic soils ideal for intensive tea, coffee, and food crop cultivation',
    explanation: 'Weathered volcanic ash and basalt rocks produce rich, deep volcanic soils that retain moisture and support high agricultural yields of tea, coffee, and maize.',
    socraticHint: 'What kind of nutrient-rich soil is created when volcanic lava and ash break down over centuries?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-009',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Which active volcanic mountain in northern Tanzania is world-famous for erupting unique, low-temperature natrocarbonatite black lava?',
    options: [
      'Oldoinyo Lengai ("Mountain of God")',
      'Mount Longonot',
      'Mount Meru',
      'Mount Suswa'
    ],
    correctAnswer: 'Oldoinyo Lengai ("Mountain of God")',
    explanation: 'Oldoinyo Lengai in northern Tanzania is the only active volcano on earth that erupts natrocarbonatite lava, rich in sodium carbonate.',
    socraticHint: 'What is the Maasai name meaning "Mountain of God" for the active volcano near Lake Natron?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-010',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Why are mountains in Eastern Africa described as crucial "water towers"?',
    options: [
      'Their high altitude forest catchments trap mist and rain, feeding perennial river systems that sustain populations downstream',
      'They have large concrete water tanks constructed by county governments on their summits',
      'They pump sea water into inland towns through underground pipes',
      'Rain only falls on mountain summits and nowhere else in Africa'
    ],
    correctAnswer: 'Their high altitude forest catchments trap mist and rain, feeding perennial river systems that sustain populations downstream',
    explanation: 'Montane forests intercept rainfall, store water in sponges of moss and soil, and gradually release it into streams that form major rivers.',
    socraticHint: 'How do mountain forests capture cloud mist and release it continuously to supply rivers like the Tana and Nile?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-011',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'Which of the following is a young volcanic crater mountain with a scenic caldera located in the Rift Valley near Naivasha?',
    options: [
      'Mount Longonot',
      'Mount Ruwenzori',
      'Mount Marsabit',
      'Mount Moroto'
    ],
    correctAnswer: 'Mount Longonot',
    explanation: 'Mount Longonot is a stratovolcano located southeast of Lake Naivasha, with a large forested caldera crater at its peak.',
    socraticHint: 'Which prominent volcanic cone with a huge circular crater rises prominently beside the highway near Naivasha?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-012',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l1',
    text: 'What major challenge is faced by people living along the steep escarpments of the Rift Valley (such as Elgeyo Marakwet and West Pokot) during heavy rainy seasons?',
    options: [
      'Destructive landslides and mudslides caused by soil saturation and deforestation',
      'Severe droughts and lack of drinking water',
      'Tsunami ocean waves hitting homes',
      'Ice blizzards freezing farm crops'
    ],
    correctAnswer: 'Destructive landslides and mudslides caused by soil saturation and deforestation',
    explanation: 'Steep slopes combined with cleared vegetation and intense downpours frequently trigger dangerous landslides and mudslides in escarpment communities.',
    socraticHint: 'What happens to steep hillside soil when heavy downpours soak deforested mountain slopes?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 44 (Unit 2 Lesson 2: q-g6-soc-u2-013 to 024)
  {
    id: 'q-g6-soc-u2-013',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'How was Lake Victoria, the largest lake in Africa, formed geographically?',
    options: [
      'Downwarping (crustal depression and sagging of the earth’s crust between rift branches)',
      'A deep volcanic crater explosion',
      'Faulting forming a narrow, deep trench',
      'Erosion caused by coastal ocean tides'
    ],
    correctAnswer: 'Downwarping (crustal depression and sagging of the earth’s crust between rift branches)',
    explanation: 'Lake Victoria was formed by broad crustal sagging (downwarping) of the central plateau between the Eastern and Western Rift Valleys.',
    socraticHint: 'Which geological formation process involves a broad downward sagging or warping of the crust to form a wide shallow basin?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-014',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which is the longest river in Kenya, spanning over 1,000 kilometres from Mount Kenya and the Aberdares to the Indian Ocean?',
    options: [
      'River Tana',
      'River Athi-Galana',
      'River Mara',
      'River Nzoia'
    ],
    correctAnswer: 'River Tana',
    explanation: 'River Tana is Kenya’s longest river, originating in the central highlands and providing water for the Seven Forks HEP dams and coastal deltas.',
    socraticHint: 'Which river generates most of Kenya’s hydroelectric power along the Seven Forks dams cascade?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-015',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which is the deepest lake in Africa and the second deepest in the world, reaching depths of over 1,470 metres?',
    options: [
      'Lake Tanganyika',
      'Lake Victoria',
      'Lake Turkana',
      'Lake Naivasha'
    ],
    correctAnswer: 'Lake Tanganyika',
    explanation: 'Lake Tanganyika is a deep fault lake in the Western Rift Valley, reaching a maximum depth of 1,470 metres.',
    socraticHint: 'Which elongated Rift Valley lake shared by Tanzania, DR Congo, Burundi, and Zambia is famous for its extreme depth?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-016',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which river flows out of Lake Victoria at Jinja in Uganda to begin the journey of the White Nile?',
    options: [
      'Victoria Nile',
      'River Congo',
      'River Zambezi',
      'River Niger'
    ],
    correctAnswer: 'Victoria Nile',
    explanation: 'The Victoria Nile exits Lake Victoria at Jinja, flowing northward through Lake Kyoga and Lake Albert on its way to South Sudan and Sudan.',
    socraticHint: 'What is the name given to the section of the Nile that exits Lake Victoria at Jinja?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-017',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which mineral is commercially extracted from the alkaline waters of Lake Magadi in Kenya?',
    options: [
      'Soda ash (trona)',
      'Gold ore',
      'Copper ingots',
      'Crude oil'
    ],
    correctAnswer: 'Soda ash (trona)',
    explanation: 'Lake Magadi in the southern Kenyan Rift Valley contains vast deposits of trona (natural sodium carbonate), mined for soda ash used in glass manufacture.',
    socraticHint: 'What sodium carbonate mineral is processed at Magadi for glass manufacturing and export?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-018',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Why does Lake Turkana have no outlet to the ocean, making it an inland drainage basin?',
    options: [
      'It occupies a low desert basin surrounded by higher relief where evaporation balances river inflow from the Omo River',
      'A huge dam was built blocking all rivers from leaving the lake',
      'Water drains completely into underground caves to the Atlantic',
      'Its water is frozen solid under the sand'
    ],
    correctAnswer: 'It occupies a low desert basin surrounded by higher relief where evaporation balances river inflow from the Omo River',
    explanation: 'Lake Turkana is an endorheic (closed) lake where intense tropical desert evaporation removes water at the same rate the Omo River supplies it.',
    socraticHint: 'What happens when a lake sits in a hot desert depression with no river exiting it, where water only leaves by evaporation?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-019',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which freshwater lake in the Kenyan Rift Valley is world-famous for supporting intensive commercial flower farming (horticulture) around its shores?',
    options: [
      'Lake Naivasha',
      'Lake Bogoria',
      'Lake Nakuru',
      'Lake Magadi'
    ],
    correctAnswer: 'Lake Naivasha',
    explanation: 'Lake Naivasha is a freshwater lake whose water supplies green houses producing roses and cut flowers exported to Europe.',
    socraticHint: 'Which freshwater lake near Longonot is surrounded by large greenhouses exporting fresh roses to European auctions?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-020',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'What is the name of the hydroelectric dam complex along River Tana that provides substantial electricity to Kenya’s national grid?',
    options: [
      'The Seven Forks Scheme (Masinga, Kamburu, Gitaru, Kindaruma, Kiambere)',
      'Owen Falls Dam',
      'Aswan High Dam',
      'Kariba Dam'
    ],
    correctAnswer: 'The Seven Forks Scheme (Masinga, Kamburu, Gitaru, Kindaruma, Kiambere)',
    explanation: 'The Seven Forks cascade dams on the upper Tana River harness water flow through turbines to produce major hydroelectric power for Kenya.',
    socraticHint: 'Which series of dams along the Tana River includes Masinga and Kiambere power stations?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-021',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which river flows from the Ethiopian highlands and provides over 90% of all water entering Lake Turkana?',
    options: [
      'River Omo',
      'River Turkwel',
      'River Kerio',
      'River Suam'
    ],
    correctAnswer: 'River Omo',
    explanation: 'River Omo originates in the rainy Ethiopian highlands and flows southward to sustain Lake Turkana.',
    socraticHint: 'Which major river flowing into northern Kenya from Ethiopia supplies almost all of Lake Turkana’s freshwater inflow?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-022',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which fish species is the most valuable commercial catch in Lake Victoria, exported worldwide as frozen fillets?',
    options: [
      'Nile Perch (Mbuta)',
      'Mudfish (Kamongo)',
      'Lungfish',
      'Electric eel'
    ],
    correctAnswer: 'Nile Perch (Mbuta)',
    explanation: 'Nile Perch (Lates niloticus), locally known as Mbuta, is a large predatory fish harvested for filleting factories in Kisumu, Homa Bay, and Mwanza.',
    socraticHint: 'Which large fish species introduced into Lake Victoria is processed in industrial fish factories for European export?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-023',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'What ecological challenge threatens the water quality, navigation, and fishing in Lake Victoria?',
    options: [
      'Proliferation of invasive water hyacinth weed and agricultural chemical pollution',
      'Water freezing into ice during winter',
      'Sharks entering through ocean rivers',
      'Complete lack of sunlight beneath the Equator'
    ],
    correctAnswer: 'Proliferation of invasive water hyacinth weed and agricultural chemical pollution',
    explanation: 'The aggressive spread of water hyacinth mats clogs fishing ports and boat routes, while fertilizer runoff causes eutrophication.',
    socraticHint: 'Which fast-growing green floating weed with purple flowers chokes fishing bays and boat harbors in Lake Victoria?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u2-024',
    subStrandId: 'substrand-g6-soc-u2',
    lessonId: 'lesson-g6-soc-u2-l2',
    text: 'Which famous wildlife migration crosses the Mara River between Serengeti in Tanzania and Maasai Mara in Kenya annually?',
    options: [
      'The Great Wildebeest Migration',
      'The Penguin colony march',
      'The Polar bear migration',
      'The Kangaroo crossing'
    ],
    correctAnswer: 'The Great Wildebeest Migration',
    explanation: 'Over 1.5 million wildebeest, accompanied by zebras and gazelles, brave crocodile-infested waters of the Mara River in search of fresh grazing.',
    socraticHint: 'Which world-renowned annual wildlife spectacle sees millions of gnus (wildebeest) cross the Mara River?',
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

console.log(`Added ${questions.length} questions for Units 1 & 2.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 1 to cbe_database.json!');
