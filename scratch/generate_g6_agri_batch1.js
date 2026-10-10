/**
 * Grade 6 Agriculture & Nutrition - Batch 1 Generator
 * Setup: Learning Area (la-agri-g6), Strands (4), world-green-farm registration
 * Content: Units 1 & 2:
 * - Unit 1: Soil Conservation: Strip Cropping, Grass Strips & Trash Lines
 * - Unit 2: Water Harvesting: Surface Runoff, Mulching & Retention Ditches
 * Missions: Orders 41, 42, 43, 44 (world-green-farm)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Agriculture & Nutrition Batch 1 (Setup + Units 1 & 2) ---');

// 1. Setup Learning Area: la-agri-g6
const laAgriG6 = {
  id: 'la-agri-g6',
  gradeId: 'grade-6',
  name: 'Agriculture & Nutrition',
  swahiliName: 'Kilimo na Lishe Bora',
  icon: 'sprout',
  color: '#059669',
  description: 'Soil and water conservation, propagation of climbing crops, indigenous Kenyan vegetables, container gardening, small domestic animals, parasites control, balanced family meal planning and traditional food preparation.',
  strandsCount: 4
};

if (!db.learningAreas.some(la => la.id === laAgriG6.id)) {
  db.learningAreas.push(laAgriG6);
  console.log('Added learning area la-agri-g6');
}

// Ensure world-green-farm contains la-agri-g6
const farmWorld = db.gameWorlds.find(w => w.id === 'world-green-farm');
if (farmWorld && !farmWorld.learningAreaIds.includes('la-agri-g6')) {
  farmWorld.learningAreaIds.push('la-agri-g6');
  console.log('Added la-agri-g6 to world-green-farm');
}

// 2. Setup 4 Strands
const agriStrands = [
  {
    id: 'strand-g6-agri-conservation',
    learningAreaId: 'la-agri-g6',
    name: 'Conservation of Agricultural Resources',
    description: 'Soil erosion control, vegetative barrier establishment, surface runoff harvesting, mulching, and sustainable moisture retention.',
    grade: 'G6'
  },
  {
    id: 'strand-g6-agri-crop-production',
    learningAreaId: 'la-agri-g6',
    name: 'Crop Production and Organic Practices',
    description: 'Propagation and management of climbing crops, indigenous African leafy vegetables, organic nursery care, and multi-storey container gardening.',
    grade: 'G6'
  },
  {
    id: 'strand-g6-agri-animal-production',
    learningAreaId: 'la-agri-g6',
    name: 'Animal Production and Health Management',
    description: 'Rearing small domestic animals (poultry, rabbits, guinea pigs), housing, organic feeds, and external and internal parasite management.',
    grade: 'G6'
  },
  {
    id: 'strand-g6-agri-nutrition-hygiene',
    learningAreaId: 'la-agri-g6',
    name: 'Human Nutrition, Food Safety and Culinary Practices',
    description: 'Family meal planning, seasonal food budgeting, traditional Kenyan food preparation, kitchen hygiene, and table etiquette.',
    grade: 'G6'
  }
];

for (const st of agriStrands) {
  if (!db.strands.some(s => s.id === st.id)) {
    db.strands.push(st);
    console.log(`Added strand ${st.id}`);
  }
}

// 3. Sub-strands for Units 1 & 2
const newSubStrands = [
  {
    id: 'substrand-g6-agri-u1',
    strandId: 'strand-g6-agri-conservation',
    name: 'Soil Conservation: Strip Cropping, Grass Strips & Trash Lines',
    description: 'Master advanced physical and biological soil conservation techniques including strip cropping, vegetative grass barriers (Napier, vetiver), trash lines, and stone bunds on sloping Kenyan farms.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Explain the principles of strip cropping in conserving topsoil',
      'Establish vegetative grass strips and trash lines along contours on sloping land',
      'Evaluate the effectiveness of biological barriers against soil erosion'
    ]
  },
  {
    id: 'substrand-g6-agri-u2',
    strandId: 'strand-g6-agri-conservation',
    name: 'Water Harvesting & Soil Moisture Conservation',
    description: 'Design and utilize surface runoff harvesting techniques such as retention ditches, earth basins, roof catchment, organic mulching, and sunken beds.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Construct retention ditches and shallow earth basins to trap surface runoff',
      'Apply organic mulching materials to reduce soil moisture evaporation and weed growth',
      'Demonstrate water-saving agricultural practices in arid and semi-arid regions'
    ]
  }
];

// 4. Lessons for Units 1 & 2
const newLessons = [
  // Unit 1 Lessons
  {
    id: 'lesson-g6-agri-u1-l1',
    subStrandId: 'substrand-g6-agri-u1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Biological Soil Conservation: Strip Cropping and Trash Lines',
    summary: 'Discover how strip cropping alternating dense and row crops, alongside organic trash lines along contours, shields delicate fertile topsoil from water and wind erosion.',
    content: 'Topsoil is the most fertile layer of the soil profile, containing essential plant nutrients and humus. When heavy rains fall on sloping ground, sheet and rill erosion carry this fertile layer away into rivers. Strip cropping is a biological conservation method where strips of erosion-permitting row crops (such as maize or cassava) are alternated along the contours with strips of erosion-resisting dense cover crops (such as sweet potatoes, beans, or desmodium). The dense cover crops reduce the velocity of surface runoff, trap dislodged soil particles, and promote water infiltration. Trash lines are another effective biological method where crop residues (maize stalks, dry sorghum leaves, weeds) are heaped along contour lines across the slope. These organic barriers slow down runoff, trap sediment, and decompose over time into rich organic matter.',
    keyConcepts: ['Topsoil Protection', 'Strip Cropping', 'Erosion-resisting vs Erosion-permitting Crops', 'Trash Lines', 'Contour Alignment'],
    kenyanContext: 'Smallholder farmers in the steep hills of Vihiga and Murang\'a lay maize stalk trash lines along contours immediately after harvest to conserve topsoil ahead of the short rains.',
    didYouKnow: 'It takes nature between 100 to 500 years to form just one single centimetre of fertile agricultural topsoil!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u1-l2',
    subStrandId: 'substrand-g6-agri-u1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Grass Strips and Stone Lines on Sloping Farms',
    summary: 'Explore how permanent vegetative grass strips of Napier or Vetiver, combined with stone lines, halt runoff on hillside farms.',
    content: 'On sloping agricultural land, permanent vegetative grass strips planted along contour lines provide long-lasting erosion control. Dense perennial grasses such as Napier grass, Vetiver grass, and Guatemala grass have extensive, deep fibrous root systems that anchor soil firmly in place. Their thick above-ground stems act as live filter sieves, slowing rushing runoff water and allowing trapped silt to accumulate, naturally forming fertile bench terraces over several seasons. In rocky, semi-arid regions where stones are abundant, stone lines (stone bunds) are constructed by arranging loose rocks along contour lines across farmland. Stone lines slow down flash flood runoff, allow silt to settle behind them, and create moist, nutrient-rich planting zones.',
    keyConcepts: ['Grass Strips (Napier & Vetiver)', 'Fibrous Root Anchoring', 'Natural Terrace Formation', 'Stone Lines', 'Contour Layout'],
    kenyanContext: 'In the semi-arid hills of Machakos and Kitui, stone lines laid along contours have transformed dry rocky slopes into productive terraces that retain both topsoil and seasonal runoff.',
    didYouKnow: 'Vetiver grass roots can grow down to 3 metres deep into the soil within just one year, forming an underground vegetative wall that stops landslides!',
    estimatedMinutes: 20
  },

  // Unit 2 Lessons
  {
    id: 'lesson-g6-agri-u2-l1',
    subStrandId: 'substrand-g6-agri-u2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Water Harvesting: Surface Runoff and Retention Ditches',
    summary: 'Learn how to capture and channel precious rainwater and roadside runoff into retention ditches and farm ponds for crop production.',
    content: 'Rainwater harvesting is the collection and concentration of runoff water for productive agricultural use. During intense rainstorms, excess water flows across road tracks, footpaths, and bare fields as surface runoff. Farmers can dig retention ditches (infiltration trenches) along the contour below roads or hillside tracks to divert and trap this runoff. The trapped water slowly seeps down into the subsoil, raising the local groundwater table and providing sustained moisture for tree crops and bananas planted along the ditch embankments. Other surface runoff structures include shallow circular earth basins (negarims) dug around individual fruit trees and water pans excavated at the lowest point of the farm to collect excess runoff for dry-season bucket irrigation.',
    keyConcepts: ['Surface Runoff Capture', 'Retention Ditches (Trenches)', 'Water Seepage & Infiltration', 'Earth Basins (Negarims)', 'Farm Water Pans'],
    kenyanContext: 'Along roadsides in Makueni County, farmers construct roadside diversion channels directing road runoff into retention ditches planted with drought-hardy Hass avocado and mango trees.',
    didYouKnow: 'Capturing just 30% of annual roadside runoff in dryland Kenya is enough to support bumper harvests of maize, sorghum, and fruit trees without relying on river irrigation!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u2-l2',
    subStrandId: 'substrand-g6-agri-u2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Soil Moisture Conservation: Mulching & Sunken Beds',
    summary: 'Master moisture conservation techniques: organic mulching to block evaporation, shade nets, and sunken planting beds.',
    content: 'Retaining harvested moisture in the soil is just as vital as capturing it. Mulching is the practice of covering the bare soil surface around growing crops with a layer of dry organic materials such as dry grass, maize stover, dry banana leaves, or wood shavings. Mulch provides multiple benefits: it blocks direct solar radiation, drastically cutting down soil moisture evaporation; it cushions falling raindrops, preventing soil compaction and capping; it smothers weeds by depriving them of sunlight; and it slowly decays into humus. In arid and semi-arid lands (ASALs), farmers construct sunken beds—planting beds excavated 15 to 30 cm below ground level. Sunken beds collect and hold runoff water, shield young seedlings from drying winds, and keep the root zone cool and hydrated.',
    keyConcepts: ['Organic Mulching', 'Evaporation Reduction', 'Soil Temperature Regulation', 'Weed Suppression', 'Sunken Beds for Drylands'],
    kenyanContext: 'Coffee farmers in Kiambu and Nyeri spread dry grass mulch under their coffee bushes, while vegetable growers in Turkana utilize sunken beds to grow nutritious spinach with minimal water.',
    didYouKnow: 'Mulching can reduce water loss from bare farm soil by up to 70%, allowing crops to survive two to three weeks of sudden mid-season dry spells!',
    estimatedMinutes: 20
  }
];

// 5. Missions for Units 1 & 2
const newMissions = [
  // Unit 1 Missions
  {
    id: 'mission-g6-agri-u1-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Strip Cropping & Trash Line Trail',
    description: 'Join Agronomist Mutua on the hillside terraces to alternate maize with sweet potato strips and lay contour trash lines to protect fertile topsoil.',
    order: 41,
    orderIndex: 41,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Soil Conservator',
    badge: 'Soil Conservator',
    questionIds: [
      'q-g6-agri-u1-001', 'q-g6-agri-u1-002', 'q-g6-agri-u1-003', 'q-g6-agri-u1-004',
      'q-g6-agri-u1-005', 'q-g6-agri-u1-006', 'q-g6-agri-u1-007', 'q-g6-agri-u1-008',
      'q-g6-agri-u1-009', 'q-g6-agri-u1-010', 'q-g6-agri-u1-011', 'q-g6-agri-u1-012'
    ]
  },
  {
    id: 'mission-g6-agri-u1-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Living Walls: Grass Strips & Stone Bunds',
    description: 'Establish permanent Napier and Vetiver vegetative barriers and construct contour stone bunds to transform steep slopes into lush terraces.',
    order: 42,
    orderIndex: 42,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Terrace Architect',
    badge: 'Terrace Architect',
    questionIds: [
      'q-g6-agri-u1-013', 'q-g6-agri-u1-014', 'q-g6-agri-u1-015', 'q-g6-agri-u1-016',
      'q-g6-agri-u1-017', 'q-g6-agri-u1-018', 'q-g6-agri-u1-019', 'q-g6-agri-u1-020',
      'q-g6-agri-u1-021', 'q-g6-agri-u1-022', 'q-g6-agri-u1-023', 'q-g6-agri-u1-024'
    ]
  },

  // Unit 2 Missions
  {
    id: 'mission-g6-agri-u2-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Runoff Harvesters: Ditches and Earth Basins',
    description: 'Capture roadside stormwater with Farm Officer Kemboi by constructing contour retention trenches and circular earth basins around fruit trees.',
    order: 43,
    orderIndex: 43,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Water Harvester',
    badge: 'Water Harvester',
    questionIds: [
      'q-g6-agri-u2-001', 'q-g6-agri-u2-002', 'q-g6-agri-u2-003', 'q-g6-agri-u2-004',
      'q-g6-agri-u2-005', 'q-g6-agri-u2-006', 'q-g6-agri-u2-007', 'q-g6-agri-u2-008',
      'q-g6-agri-u2-009', 'q-g6-agri-u2-010', 'q-g6-agri-u2-011', 'q-g6-agri-u2-012'
    ]
  },
  {
    id: 'mission-g6-agri-u2-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Moisture Masters: Mulching & Sunken Beds',
    description: 'Lock in soil moisture against harsh tropical heat using dry organic mulch blankets and sunken planting beds tailored for drylands.',
    order: 44,
    orderIndex: 44,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Moisture Guardian',
    badge: 'Moisture Guardian',
    questionIds: [
      'q-g6-agri-u2-013', 'q-g6-agri-u2-014', 'q-g6-agri-u2-015', 'q-g6-agri-u2-016',
      'q-g6-agri-u2-017', 'q-g6-agri-u2-018', 'q-g6-agri-u2-019', 'q-g6-agri-u2-020',
      'q-g6-agri-u2-021', 'q-g6-agri-u2-022', 'q-g6-agri-u2-023', 'q-g6-agri-u2-024'
    ]
  }
];

// 6. Questions for Units 1 & 2
const newQuestions = [
  // --- UNIT 1: SOIL CONSERVATION (Questions 1 to 24) ---
  // Lesson 1: Strip Cropping & Trash Lines (001 - 012)
  {
    id: 'q-g6-agri-u1-001',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is strip cropping in agricultural soil conservation?',
    options: [
      'Alternating strips of erosion-permitting row crops with erosion-resisting dense cover crops along contours',
      'Cutting down all trees and crops in straight lines across the farm',
      'Planting only one single crop over the entire farm year after year',
      'Digging deep holes across the farm and filling them with concrete'
    ],
    correctAnswer: 'Alternating strips of erosion-permitting row crops with erosion-resisting dense cover crops along contours',
    explanation: 'Strip cropping alternates strips of wide-spaced row crops (like maize) with dense protective cover crops (like beans or sweet potatoes) along contours to check surface runoff.',
    socraticHint: 'Think about alternating wide-spaced crops that leave soil bare with dense leafy crops that cover the soil.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-002',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following is an example of an erosion-RESISTING cover crop used in strip cropping in Kenya?',
    options: [
      'Sweet potatoes or desmodium',
      'Maize with wide row spacing',
      'Cassava with bare weeding lines',
      'Cotton with exposed soil beds'
    ],
    correctAnswer: 'Sweet potatoes or desmodium',
    explanation: 'Sweet potatoes, desmodium, and beans have creeping, leafy vines that form a dense canopy over the ground, shielding topsoil from raindrops and slowing surface runoff.',
    socraticHint: 'Which crop produces dense ground foliage that blankets the soil completely?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-003',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is maize classified as an erosion-PERMITTING crop on sloping land?',
    options: [
      'It is planted in wide rows, leaving large areas of bare soil exposed to rain impact and runoff',
      'Its roots dissolve soil into muddy water',
      'It attracts heavy rainfall that causes flooding',
      'Its tall stalks prevent wind from blowing across the field'
    ],
    correctAnswer: 'It is planted in wide rows, leaving large areas of bare soil exposed to rain impact and runoff',
    explanation: 'Maize grows erect with wide inter-row spaces (typically 75 cm apart); before the canopy closes, the exposed inter-row soil is easily eroded by rain and runoff.',
    socraticHint: 'Look at the wide bare spaces left between maize plants when they are planted in rows.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-004',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How do trash lines conserve soil on sloping shambas in Kenya?',
    options: [
      'Crop residues arranged along contours slow down surface runoff and trap carried soil particles',
      'They reflect sunlight into the clouds to stop rainstorms',
      'They poison soil pests so earthworms can dig deeper',
      'They turn runoff water into solid ice'
    ],
    correctAnswer: 'Crop residues arranged along contours slow down surface runoff and trap carried soil particles',
    explanation: 'Piling crop residues (like maize stover and dry weeds) in contour rows acts as porous barriers that reduce runoff velocity and filter out dislodged soil sediment.',
    socraticHint: 'What happens to fast runoff when it encounters a long row of dry maize stalks laid across the slope?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-005',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which direction should trash lines and crop strips be laid across a sloping farm for maximum erosion control?',
    options: [
      'Along contour lines (across the slope at equal elevation)',
      'Directly up and down the steepest slope direction',
      'Diagonally along the path of vehicle tires',
      'In random circular rings without any measurement'
    ],
    correctAnswer: 'Along contour lines (across the slope at equal elevation)',
    explanation: 'Laying barriers strictly along contour lines (perpendicular to slope direction) ensures runoff water meets the barrier directly, reducing its downhill speed.',
    socraticHint: 'Should conservation barriers run across the path of flowing water or along with it?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-006',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What additional benefit do decomposing trash lines provide to the farm soil after several seasons?',
    options: [
      'They decompose into rich humus, improving soil fertility and water-holding capacity',
      'They turn the soil into pure sand',
      'They stop all weed seeds from ever growing again permanently',
      'They increase the acidity of the soil to toxic levels'
    ],
    correctAnswer: 'They decompose into rich humus, improving soil fertility and water-holding capacity',
    explanation: 'As maize stalks and plant residue rot, soil micro-organisms convert them into humus, enriching the soil with organic matter and improving structure.',
    socraticHint: 'What happens to dry plant matter when it rots in the soil over time?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-007',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following materials is most suitable for constructing effective trash lines on a harvested shamba in Bungoma?',
    options: [
      'Dry maize stalks, sorghum stover, bean threshed pods, and pulled weeds',
      'Broken glass bottles and plastic shopping bags',
      'Heavy scrap metal sheets and motor vehicle tires',
      'Synthetic nylon ropes and iron fencing posts'
    ],
    correctAnswer: 'Dry maize stalks, sorghum stover, bean threshed pods, and pulled weeds',
    explanation: 'Trash lines utilize biodegradable crop residues readily available after harvest, providing natural, non-polluting erosion barriers.',
    socraticHint: 'Choose the natural biodegradable agricultural crop residues left on the farm after harvest.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-008',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should trash lines NOT be made from crop residue infested with fungal smuts or bacterial wilt diseases?',
    options: [
      'The fungal spores or bacteria will survive and spread infections to the next crop season',
      'Diseased stalks are too light and blow away immediately',
      'Diseased stalks attract excessive rainfall',
      'Termites refuse to eat diseased crop stalks'
    ],
    correctAnswer: 'The fungal spores or bacteria will survive and spread infections to the next crop season',
    explanation: 'Using diseased residues spreads pathogens across the farm; infected crop remains should be safely composted at high temperatures or burned outside crop fields.',
    socraticHint: 'What happens to crop disease pathogens if their infected hosts are spread across farm fields?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-009',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which tool does a farmer in Murang\'a use to measure and establish accurate contour lines on a sloping farm before planting strips?',
    options: [
      'An A-frame level or line level',
      'A wooden hoe (jembe)',
      'A pangas or machete',
      'A wheelbarrow'
    ],
    correctAnswer: 'An A-frame level or line level',
    explanation: 'An A-frame fitted with a plumb bob or spirit level is an inexpensive, accurate tool used by farmers to mark points of equal elevation (contour lines).',
    socraticHint: 'Which simple triangular wooden tool with a suspended weight is calibrated to find level contour lines?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-010',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does strip cropping improve water infiltration into the soil?',
    options: [
      'Dense cover crops slow down surface runoff, giving water more time to soak deep into the soil',
      'Dense crops pump water out of the clouds into the soil',
      'Cover crops heat up the soil so water turns to liquid faster',
      'Cover crops create vacuum holes that suck rainwater underground'
    ],
    correctAnswer: 'Dense cover crops slow down surface runoff, giving water more time to soak deep into the soil',
    explanation: 'By reducing runoff speed and breaking raindrop impact, cover strips increase infiltration opportunity time, boosting subsoil water storage.',
    socraticHint: 'When rushing water is slowed down, does more or less water sink into the soil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-011',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'In an agro-ecological farming system, what role does a leguminous cover crop (like mucuna or desmodium) play in strip cropping?',
    options: [
      'It controls erosion while fixing atmospheric nitrogen into the soil to nourish adjacent cereal strips',
      'It extracts all minerals from the soil to kill surrounding weeds',
      'It prevents birds from flying over the farm',
      'It eliminates the need for any sunlight on the farm'
    ],
    correctAnswer: 'It controls erosion while fixing atmospheric nitrogen into the soil to nourish adjacent cereal strips',
    explanation: 'Legumes form symbiotic root nodules with Rhizobium bacteria that fix atmospheric nitrogen, enhancing soil fertility while protecting against erosion.',
    socraticHint: 'What special nutrient do leguminous root nodules add naturally to agricultural soil?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-012',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What happens to fertile agricultural topsoil if no soil conservation measures are implemented on a steep hillside farm during the long rains?',
    options: [
      'Topsoil is washed away by sheet and rill erosion, leaving bare unproductive subsoil',
      'The topsoil grows deeper and more fertile automatically',
      'The slope flattens out into a level plain naturally',
      'The soil becomes rich in nitrogen without fertilizer'
    ],
    correctAnswer: 'Topsoil is washed away by sheet and rill erosion, leaving bare unproductive subsoil',
    explanation: 'Without conservation barriers, energetic rainwater carries away humus and nutrient-rich topsoil, causing severe land degradation and crop failure.',
    socraticHint: 'What destructive process strips away loose fertile soil during torrential hillside downpours?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Grass Strips & Stone Bunds (013 - 024)
  {
    id: 'q-g6-agri-u1-013',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a grass strip in soil and water conservation?',
    options: [
      'A permanent strip of dense perennial grass planted along a contour line on sloping land',
      'A patch of lawn grass planted around the farmer\'s bedroom window',
      'A plastic carpet laid down between rows of cabbages',
      'A narrow ditch dug to drain all water away from the farm'
    ],
    correctAnswer: 'A permanent strip of dense perennial grass planted along a contour line on sloping land',
    explanation: 'Grass strips are vegetative filter barriers of perennial grasses left or planted along contour lines across slopes to trap silt and impede runoff.',
    socraticHint: 'What permanent living green barrier is planted along a contour line across a hillside field?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-014',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which two grasses are most commonly planted as vegetative soil conservation strips on Kenyan farms?',
    options: [
      'Napier grass and Vetiver grass',
      'Maize grass and wheat grass',
      'Bamboo grass and sisal fibers',
      'Seaweed and water hyacinth'
    ],
    correctAnswer: 'Napier grass and Vetiver grass',
    explanation: 'Napier grass and Vetiver grass are widely used in Kenya because of their dense clumps, deep fibrous root networks, and resilience.',
    socraticHint: 'Which tall fodder grass and deep-rooted miracle grass are popular for soil conservation in Kenya?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-015',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does planting Napier grass strips along contours provide double benefits to a dairy farmer in Nyeri?',
    options: [
      'It controls soil erosion while providing nutritious green fodder for zero-grazed dairy cows',
      'It repels all insects and cooks milk automatically',
      'It eliminates the need for watering cattle',
      'It turns cattle dung into stone building blocks'
    ],
    correctAnswer: 'It controls soil erosion while providing nutritious green fodder for zero-grazed dairy cows',
    explanation: 'Napier grass strips protect soil from runoff and can be regularly cut to feed zero-grazed cattle, delivering both soil conservation and livestock feed.',
    socraticHint: 'What valuable animal feed do Napier grass leaves provide to dairy cows?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-016',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is Vetiver grass particularly famous globally as an effective biological soil anchor?',
    options: [
      'It has massive, dense, fibrous roots that grow up to 3 metres deep into the soil within one year',
      'Its leaves are covered in sticky glue that catches birds',
      'It does not require any soil to grow',
      'It produces toxic fruit that keeps humans away'
    ],
    correctAnswer: 'It has massive, dense, fibrous roots that grow up to 3 metres deep into the soil within one year',
    explanation: 'Vetiver grass has an extraordinarily deep, binding spongy root system that locks subsoil together, acting like underground bio-mesh against erosion and slips.',
    socraticHint: 'Think about how deep and massive the underground root system of Vetiver grass grows.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-017',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How do grass strips naturally create bench terraces over several years of cultivation?',
    options: [
      'Soil washed downhill is trapped behind the grass strip, gradually leveling the land between strips',
      'The grass shoots push the mountain backwards mechanically',
      'Earthworms build concrete walls underneath the grass',
      'Rainfall dissolves the upper part of the hill completely'
    ],
    correctAnswer: 'Soil washed downhill is trapped behind the grass strip, gradually leveling the land between strips',
    explanation: 'As runoff deposits dislodged soil particles behind the dense vegetative grass barrier each season, soil builds up on the upper side, naturally forming a stepped terrace.',
    socraticHint: 'What happens over many seasons when soil washing down the slope gets continuously trapped behind a thick grass wall?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-018',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are stone lines (stone bunds) in soil conservation?',
    options: [
      'Lines of loose rocks and stones arranged along contour lines across sloping farmland',
      'High stone walls built to surround the school playground',
      'Crushed stone powder mixed into cooking flour',
      'Underground tunnels lined with stone bricks'
    ],
    correctAnswer: 'Lines of loose rocks and stones arranged along contour lines across sloping farmland',
    explanation: 'Stone lines are semi-permeable physical barriers constructed by aligning stones along contours to slow runoff and retain silt in rocky, semi-arid landscapes.',
    socraticHint: 'What conservation barrier is made by arranging loose field stones along contours?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-019',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'In which ecological regions of Kenya are stone lines most practical and widely adopted?',
    options: [
      'Semi-arid, stony landscapes like Machakos, Kitui, and Baringo',
      'Deep swampy wetlands around Lake Victoria',
      'Dense equatorial rainforests of Kakamega',
      'Sandy coastal beaches of Diani and Malindi'
    ],
    correctAnswer: 'Semi-arid, stony landscapes like Machakos, Kitui, and Baringo',
    explanation: 'In dry, rocky areas where stones are abundant on fields and vegetative materials are scarce, stone bunds are the most cost-effective and durable conservation method.',
    socraticHint: 'Which parts of Kenya have abundant stones on dry sloping shambas?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-020',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are stone lines described as "semi-permeable" conservation barriers?',
    options: [
      'They slow down runoff and allow water to filter through slowly while filtering out solid soil sediments',
      'They block all water completely like a solid glass window',
      'They dissolve completely in water after two minutes',
      'They absorb water and turn it into steam'
    ],
    correctAnswer: 'They slow down runoff and allow water to filter through slowly while filtering out solid soil sediments',
    explanation: 'The small spaces between packed stones allow excess water to trickle through slowly without building up destructive hydraulic pressure, while trapping rich silt.',
    socraticHint: 'Can water seep between loose stones while trapped mud stays behind?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-021',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What maintenance should a farmer carry out on grass strips during the dry season?',
    options: [
      'Protect them from uncontrolled livestock grazing and cut mature grass to promote fresh tillering',
      'Uproot all the grass and burn it',
      'Spray heavy weedkillers to kill the grass',
      'Pave over the grass strips with concrete cement'
    ],
    correctAnswer: 'Protect them from uncontrolled livestock grazing and cut mature grass to promote fresh tillering',
    explanation: 'Preventing overgrazing ensures the vegetative filter remains intact, and cutting back old stalks stimulates new tillering and denser clumping.',
    socraticHint: 'How do you prevent free-roaming cattle from destroying protective grass strips on the farm?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-022',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'When building stone lines, where should the largest stones be placed in the bund?',
    options: [
      'At the base and downstream side of the line for stability, with smaller stones on the upstream side',
      'Balanced precariously on the very top of small pebbles',
      'Suspended in mid-air using ropes',
      'Buried 10 metres deep where no water can reach them'
    ],
    correctAnswer: 'At the base and downstream side of the line for stability, with smaller stones on the upstream side',
    explanation: 'Large foundation stones at the base and downstream side anchor the structure against runoff pressure, while smaller stones on the upper side filter out fine sediments.',
    socraticHint: 'Where do heavy foundation stones belong in any stable stone structure?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-023',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which practice combines both biological and physical methods to maximize contour barrier strength?',
    options: [
      'Planting Vetiver or Napier grass immediately behind contour stone lines or soil bunds',
      'Burning grass strips with kerosene every month',
      'Digging up stone lines and throwing rocks into rivers',
      'Covering living grass strips with heavy corrugated iron sheets'
    ],
    correctAnswer: 'Planting Vetiver or Napier grass immediately behind contour stone lines or soil bunds',
    explanation: 'Reinforcing stone bunds or earthen ridges with perennial grasses creates a composite biological-physical barrier with superior durability and filtration efficiency.',
    socraticHint: 'How can living grass and sturdy stone lines work together along the same contour line?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u1-024',
    subStrandId: 'substrand-g6-agri-u1',
    lessonId: 'lesson-g6-agri-u1-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does soil conservation contribute directly to national food security in Kenya?',
    options: [
      'By preserving nutrient-rich topsoil and soil moisture needed for healthy, high crop yields season after season',
      'By turning all farmland into commercial shopping malls',
      'By allowing river silt to flood coastal towns',
      'By replacing farm crops with imported plastic food'
    ],
    correctAnswer: 'By preserving nutrient-rich topsoil and soil moisture needed for healthy, high crop yields season after season',
    explanation: 'Fertile topsoil and stored moisture are the foundations of crop productivity; preventing soil loss maintains high crop yields and prevents famine.',
    socraticHint: 'Why is healthy fertile soil necessary for farmers to harvest enough food to feed our families?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // --- UNIT 2: WATER HARVESTING & MOISTURE RETENTION (Questions 25 to 48) ---
  // Lesson 1: Runoff Harvesting & Retention Ditches (001 - 012)
  {
    id: 'q-g6-agri-u2-001',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is surface runoff in agriculture?',
    options: [
      'Water from rain or irrigation that flows over the ground surface when the soil cannot absorb it fast enough',
      'Water that evaporates invisibly into clouds',
      'Water pumped from deep underground boreholes',
      'Water contained inside ripe watermelon fruits'
    ],
    correctAnswer: 'Water from rain or irrigation that flows over the ground surface when the soil cannot absorb it fast enough',
    explanation: 'Surface runoff occurs when precipitation rate exceeds soil infiltration capacity, causing unabsorbed water to flow overland across land surfaces.',
    socraticHint: 'What do we call rainwater that fails to soak into the soil and rushes over the ground surface?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-002',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a retention ditch (infiltration trench) designed to do on a farm?',
    options: [
      'Trap and hold flowing surface runoff so it can slowly infiltrate into the subsoil',
      'Speed up flood water so it washes crops into the valley faster',
      'Drain all moisture out of the farm into the sea',
      'Store harvested maize bags in water'
    ],
    correctAnswer: 'Trap and hold flowing surface runoff so it can slowly infiltrate into the subsoil',
    explanation: 'Retention ditches are trenches dug on contours to capture overland runoff, holding the water until it percolates into root-zone subsoil reserves.',
    socraticHint: 'What does the word "retention" mean: does it hold water or let it escape?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-003',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which high-value fruit crops in Kenya perform exceptionally well when planted along the embankments of retention ditches?',
    options: [
      'Bananas, mangoes, and avocado trees',
      'Wheat and barley',
      'Irish potatoes planted underwater',
      'Pyrethrum flowers in waterlogged mud'
    ],
    correctAnswer: 'Bananas, mangoes, and avocado trees',
    explanation: 'Bananas, mangoes, and avocados have deep, extensive root systems that thrive on the sub-surface moisture bank created by retention ditches.',
    socraticHint: 'Which water-loving fruit crop with large leaves is traditionally planted in moist retention trenches in Kenya?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-004',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are circular or semi-circular earth basins (negarims) used for in arid farming?',
    options: [
      'Concentrating surface runoff from a micro-catchment area directly to the root zone of a single fruit tree',
      'Making swimming pools for baby goats',
      'Storing dry firewood in the rain',
      'Baking traditional pottery pots in the sun'
    ],
    correctAnswer: 'Concentrating surface runoff from a micro-catchment area directly to the root zone of a single fruit tree',
    explanation: 'Semi-circular bunds or negarims act as micro-catchments that gather runoff from a small surrounding area and funnel it to a tree seedling planted at the lowest point.',
    socraticHint: 'How does a curved earth bund help direct scattered raindrops toward one central tree seedling?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-005',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How do farmers in Makueni County safely divert stormwater from roadside drains into their shambas?',
    options: [
      'By constructing gentle diversion channels (mitered drains) that guide road runoff into farm retention basins',
      'By building high concrete walls to block road traffic',
      'By digging holes in the middle of tarmac highways',
      'By pumping petrol onto the road to make water flow backwards'
    ],
    correctAnswer: 'By constructing gentle diversion channels (mitered drains) that guide road runoff into farm retention basins',
    explanation: 'Mitred drains (cut-off drains) lead storm runoff safely at gentle non-erosive gradients from roadside ditches into on-farm retention trenches.',
    socraticHint: 'What gentle channel connects a roadside drainage ditch to an on-farm retention pond or trench?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-006',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a farm water pan (pond)?',
    options: [
      'A shallow excavated reservoir that collects and stores surface runoff for supplementary irrigation and livestock watering',
      'A small frying pan used to cook eggs in the field',
      'A container filled with salt to melt hail stones',
      'An underground septic tank for kitchen waste'
    ],
    correctAnswer: 'A shallow excavated reservoir that collects and stores surface runoff for supplementary irrigation and livestock watering',
    explanation: 'A farm water pan is an open earthen excavation designed to capture surface runoff, storing thousands of litres of water for dry-season farming.',
    socraticHint: 'What excavated earthen pond stores thousands of litres of harvested farm runoff?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-007',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should a silt trap (sediment basin) be installed at the inlet of a farm water pan?',
    options: [
      'To settle out sand and mud before clean water enters the main pan, preventing the pan from silting up rapidly',
      'To breed mosquitoes that pollinate crops',
      'To catch fish swimming from the road',
      'To add salt to the irrigation water'
    ],
    correctAnswer: 'To settle out sand and mud before clean water enters the main pan, preventing the pan from silting up rapidly',
    explanation: 'A silt trap allows heavy suspended sand and soil to settle before runoff enters the pan, drastically extending the reservoir\'s working life.',
    socraticHint: 'What happens to a pond over time if runoff brings tons of mud directly into it without filtering?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-008',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What material can be used to line farm water pans to prevent water loss through deep soil seepage in porous sandy soils?',
    options: [
      'Heavy-gauge UV-treated dam liners (plastic geomembrane) or puddled clay',
      'Dry newspaper sheets',
      'Woven mosquito nets',
      'Crushed dry maize cobs'
    ],
    correctAnswer: 'Heavy-gauge UV-treated dam liners (plastic geomembrane) or puddled clay',
    explanation: 'In porous sandy soil, water readily drains away underground; impermeable dam liners or compacted clay seal the bottom to prevent seepage loss.',
    socraticHint: 'What waterproof sheet or thick clay lining stops water from soaking straight down into sandy soil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-009',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why must every farm water retention ditch and pan have a stabilized spillway (outlet)?',
    options: [
      'To allow excess storm floodwaters to discharge safely without bursting the embankments',
      'To allow cattle to drink while running at high speeds',
      'To let sunlight into the bottom of the trench',
      'To catch wild ducks during rainy seasons'
    ],
    correctAnswer: 'To allow excess storm floodwaters to discharge safely without bursting the embankments',
    explanation: 'A spillway provides an emergency overflow exit at a safe non-erosive level, preventing catastrophic dam failure during extreme deluges.',
    socraticHint: 'What happens if a full pond has no outlet during an intense downpour?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-010',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which roof catchment components collect rainwater from school classroom roofs into storage tanks in Kitui?',
    options: [
      'Roof gutters, downpipes, and first-flush diverters',
      'Solar panels and television antennas',
      'Chimneys and ventilation pipes',
      'Window burglar bars and metal padlocks'
    ],
    correctAnswer: 'Roof gutters, downpipes, and first-flush diverters',
    explanation: 'Rain gutters channel roof runoff into downpipes, while a first-flush diverter discharges initial dirty roof washings before filling clean storage tanks.',
    socraticHint: 'What metal or PVC troughs run along the edge of roofs to catch falling rainwater?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-011',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is a first-flush diverter an essential component of a domestic and school rainwater harvesting system?',
    options: [
      'It discards the first dirty runoff carrying roof bird droppings and dust before collecting clean water',
      'It adds chlorine tablets automatically into the gutters',
      'It cools the rainwater down to freezing temperatures',
      'It diverts water directly into the teacher\'s office'
    ],
    correctAnswer: 'It discards the first dirty runoff carrying roof bird droppings and dust before collecting clean water',
    explanation: 'The first millimeters of rain wash dust, bird droppings, and debris off roofs; diverting this initial volume keeps tank water clean and safe.',
    socraticHint: 'Why should the very first runoff carrying dust and bird droppings not enter your clean water storage tank?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-012',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does capturing surface runoff benefit the wider community living downstream in a catchment area?',
    options: [
      'It reduces flash floods, prevents gully formation, and replenishes underground water tables',
      'It drains all river beds dry permanently',
      'It makes the ocean disappear',
      'It prevents clouds from forming over neighboring towns'
    ],
    correctAnswer: 'It reduces flash floods, prevents gully formation, and replenishes underground water tables',
    explanation: 'Upstream water retention attenuates destructive peak flood waves, stops downstream gully erosion, and recharges regional aquifers.',
    socraticHint: 'What happens to destructive flash floods when rainfall is retained upstream on thousands of small farms?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Mulching & Sunken Beds (013 - 024)
  {
    id: 'q-g6-agri-u2-013',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is mulching in crop production?',
    options: [
      'Covering the soil surface around growing plants with organic or synthetic protective materials',
      'Digging up crop roots and hanging them in the sun',
      'Spraying crops with petrol to kill caterpillars',
      'Flooding the farm with ocean saltwater every evening'
    ],
    correctAnswer: 'Covering the soil surface around growing plants with organic or synthetic protective materials',
    explanation: 'Mulching is the agronomic practice of applying a protective cover layer over soil around crop plants to conserve moisture and suppress weeds.',
    socraticHint: 'What practice spreads dry grass or leaves over the ground around growing crops?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-014',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following is the primary mechanism by which mulching conserves soil moisture on hot sunny days?',
    options: [
      'It shields the soil surface from direct sunlight, drastically reducing moisture loss through evaporation',
      'It creates artificial rain underneath the mulch blanket',
      'It freezes the soil so water cannot move',
      'It turns soil moisture into solid carbon crystals'
    ],
    correctAnswer: 'It shields the soil surface from direct sunlight, drastically reducing moisture loss through evaporation',
    explanation: 'By shading bare soil from solar radiation and lowering ground temperature, mulch significantly suppresses evaporation of soil water into the air.',
    socraticHint: 'What happens to water evaporation when the hot sun is blocked from baking the soil surface?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-015',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which organic material readily available on smallholder Kenyan farms makes excellent mulch for tomato and kales gardens?',
    options: [
      'Dry grass cuttings, chopped maize stalks, and dry banana leaves',
      'Fresh plastic wrappers and nylon sacks',
      'Wet coal ashes mixed with motor oil',
      'Crushed glass bottles and tin cans'
    ],
    correctAnswer: 'Dry grass cuttings, chopped maize stalks, and dry banana leaves',
    explanation: 'Dry organic plant biomass (grass, maize stover, banana leaves) is free, biodegradable, non-toxic, and enriches soil with humus as it breaks down.',
    socraticHint: 'Select the clean, dry, biodegradable farm plant materials that rot into fertilizer.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-016',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does mulching help suppress weed growth in a vegetable garden?',
    options: [
      'It blocks sunlight from reaching weed seeds and young weed sprouts, preventing photosynthesis',
      'It poisons the soil with chemical weedkillers',
      'It burns the weeds with intense heat',
      'It pulls weed roots out of the ground mechanically'
    ],
    correctAnswer: 'It blocks sunlight from reaching weed seeds and young weed sprouts, preventing photosynthesis',
    explanation: 'Weed seeds require light to germinate and photosynthesize; a thick layer of mulch (5–10 cm) excludes light, smothering emerging weeds.',
    socraticHint: 'Can weed seedlings grow and make food if they are completely deprived of sunlight?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-017',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should mulch NOT be placed in direct, suffocating contact with the tender stems of young seedlings?',
    options: [
      'Direct contact can trap excess moisture and create fungal collar rot or harbour cutworms against the stem',
      'The stem will turn into pure iron',
      'The mulch will suck all chlorophyll out of the leaves',
      'The plant will instantly stop absorbing carbon dioxide'
    ],
    correctAnswer: 'Direct contact can trap excess moisture and create fungal collar rot or harbour cutworms against the stem',
    explanation: 'Leaving a 2–3 cm gap around the stem prevents dampness from rotting the collar region and discourages stem-chewing pests like cutworms.',
    socraticHint: 'Why should you leave a small breathing gap around seedling stems when applying moist mulch?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-018',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a sunken bed in vegetable gardening, and why is it used in dry areas like Garissa and Turkana?',
    options: [
      'A planting bed dug 15 to 30 cm BELOW the general ground surface to trap water and protect crops from hot winds',
      'A bed built on wooden stilts two metres above the roof',
      'A bed dug underwater at the bottom of Lake Turkana',
      'A hole filled with boiling water to cook spinach'
    ],
    correctAnswer: 'A planting bed dug 15 to 30 cm BELOW the general ground surface to trap water and protect crops from hot winds',
    explanation: 'Sunken beds are excavated below surface grade in arid lands to catch and retain irrigation/rainwater and shield plants from drying desert winds.',
    socraticHint: 'Unlike raised beds in wet areas, why are beds dug BELOW ground level in hot dry areas?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-019',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does the design of a sunken bed reduce water consumption compared to a conventional flat bed?',
    options: [
      'Irrigation water is contained within the earthen walls without escaping, seeping directly into the root zone',
      'Sunken beds create new water molecules from thin air',
      'Plants in sunken beds never require water',
      'Sunken beds make crops grow backwards'
    ],
    correctAnswer: 'Irrigation water is contained within the earthen walls without escaping, seeping directly into the root zone',
    explanation: 'The lower walls contain applied water directly around the plant roots, preventing runoff and maximizing every drop of water.',
    socraticHint: 'Can water spill over and escape when applied inside an enclosed sunken trench?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-020',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does mulching protect soil structure from the damaging impact of heavy raindrops during sudden tropical downpours?',
    options: [
      'It acts as a shock-absorbing cushion, dissipating kinetic energy and preventing splash erosion and surface crusting',
      'It catches raindrops and turns them into solid stones',
      'It bounces raindrops back into the sky before they touch the ground',
      'It dissolves all soil particles into gaseous nitrogen'
    ],
    correctAnswer: 'It acts as a shock-absorbing cushion, dissipating kinetic energy and preventing splash erosion and surface crusting',
    explanation: 'Mulch cushions the direct impact of high-energy falling raindrops, preventing the breaking of soil aggregates and the formation of a hard, impenetrable surface crust.',
    socraticHint: 'Think of mulch as a soft protective mattress that softens the blow of heavy falling raindrops.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-021',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should dry grass with mature seed heads NOT be used as mulch in a vegetable garden?',
    options: [
      'The mature grass seeds will germinate into thousands of aggressive weeds in the garden beds',
      'Dry seeds attract dangerous lions to the farm',
      'Seeds cause the soil to freeze at night',
      'Seeds suck all water out of vegetable leaves'
    ],
    correctAnswer: 'The mature grass seeds will germinate into thousands of aggressive weeds in the garden beds',
    explanation: 'Using grass cut after seeding introduces massive weed seed banks into the garden, defeating one of the main purposes of mulching.',
    socraticHint: 'What happens when seeds on dry grass fall onto moist garden soil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-022',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What simple, low-cost micro-irrigation method can be combined with mulching to water seedlings using recycled plastic bottles?',
    options: [
      'Bottle drip irrigation (inverted perforated bottles buried near plant roots)',
      'High-pressure fire hose blasting',
      'Flooding the shamba with river mud',
      'Throwing sealed bottles at tree branches'
    ],
    correctAnswer: 'Bottle drip irrigation (inverted perforated bottles buried near plant roots)',
    explanation: 'Inverted plastic bottles with tiny pinholes near the cap deliver slow, steady moisture directly to root zones under the mulch with minimal evaporation.',
    socraticHint: 'What innovative drip method uses discarded 1-litre drinking water bottles?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-023',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does shading using light netting or palm fronds help young seedlings during dry spells?',
    options: [
      'It reduces excessive transpiration and prevents solar scorching while roots establish',
      'It turns daytime into nighttime so plants can sleep',
      'It increases wind speed to dry out plants faster',
      'It stops plants from absorbing carbon dioxide'
    ],
    correctAnswer: 'It reduces excessive transpiration and prevents solar scorching while roots establish',
    explanation: 'Temporary shade lowers leaf temperatures and reduces transpirational demand, giving tender seedling root systems time to expand into moist subsoil.',
    socraticHint: 'How does gentle shade protect delicate baby seedlings from the scorching midday sun?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u2-024',
    subStrandId: 'substrand-g6-agri-u2',
    lessonId: 'lesson-g6-agri-u2-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'A school agricultural club in Wajir combines sunken beds, organic mulching, and bottle drip irrigation. What is the overall impact of this combination?',
    options: [
      'High vegetable productivity achieved with up to 80% reduction in water usage under harsh arid conditions',
      'Complete drying out and destruction of all vegetable crops',
      'Soil turns into solid salt rocks within one week',
      'Crops turn into wild forest weeds'
    ],
    correctAnswer: 'High vegetable productivity achieved with up to 80% reduction in water usage under harsh arid conditions',
    explanation: 'Combining water capture (sunken beds), moisture retention (mulching), and precision application (drip) produces resilient climate-smart harvests in arid lands.',
    socraticHint: 'What happens when water harvesting, mulching, and drip irrigation are combined together?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  }
];

// 7. Insert into db
// Add subStrands
for (const ss of newSubStrands) {
  if (!db.subStrands.some(s => s.id === ss.id)) {
    db.subStrands.push(ss);
    console.log(`Added subStrand ${ss.id}`);
  }
}

// Add lessons
for (const les of newLessons) {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
}

// Add missions
for (const mis of newMissions) {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
}

// Add questions
for (const q of newQuestions) {
  if (!db.questions.some(item => item.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
}

// Write back to database
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('Batch 1 of Grade 6 Agriculture & Nutrition successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
