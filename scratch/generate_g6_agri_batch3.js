/**
 * Grade 6 Agriculture & Nutrition - Batch 3 Generator
 * Covers Units 5 & 6:
 * - Unit 5: Kitchen and Container Gardening Innovations (strand-g6-agri-crop-production)
 * - Unit 6: Domestic Animals: Small Stock & Poultry Management (strand-g6-agri-animal-production)
 * Missions: Orders 49, 50, 51, 52 (world-green-farm)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Agriculture & Nutrition Batch 3 (Units 5 & 6) ---');

// 1. Sub-strands for Units 5 & 6
const newSubStrands = [
  {
    id: 'substrand-g6-agri-u5',
    strandId: 'strand-g6-agri-crop-production',
    name: 'Innovative Kitchen and Container Gardening',
    description: 'Design and manage space-saving container gardens including multi-storey sack gardens, stacked tyre towers, vertical wall pockets, growing media preparation, and bottle drip irrigation.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Construct multi-storey sack gardens, tyre towers, and vertical pocket gardens using repurposed materials',
      'Formulate porous, nutrient-rich growing media combining topsoil, compost, and coarse gravel drainage cores',
      'Manage container crops with water-efficient bottle drip irrigation and organic liquid feeding'
    ]
  },
  {
    id: 'substrand-g6-agri-u6',
    strandId: 'strand-g6-agri-animal-production',
    name: 'Small Stock & Domestic Poultry Management',
    description: 'Care for domestic poultry (indigenous chickens, ducks, turkeys) and small mammals (rabbits, guinea pigs), focusing on hygienic housing, balanced feeding, brooding, and routine health maintenance.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Describe housing requirements for poultry and construct hygienic elevated rabbit hutches',
      'Formulate balanced feeding rations for chickens and rabbits avoiding dangerous moldy or wet forage',
      'Implement biosecurity and predator protection to maintain healthy small stock flocks'
    ]
  }
];

// 2. Lessons for Units 5 & 6
const newLessons = [
  // Unit 5 Lessons
  {
    id: 'lesson-g6-agri-u5-l1',
    subStrandId: 'substrand-g6-agri-u5',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Innovative Container Gardens: Sacks, Tyres & Vertical Pockets',
    summary: 'Discover how urban and rural Kenyan households maximize small spaces using multi-storey sack gardens, recycled tyre towers, and vertical hanging pocket gardens.',
    content: 'Container gardening is the practice of growing plants in non-ground containers or micro-structures rather than directly in open fields. It enables families with limited land or poor soils (such as urban backyards, paved school compounds, or rental plots in Nairobi, Mombasa, and Kisumu) to produce fresh vegetables. Key innovative designs include: Multi-storey sack gardens (tall gunny or polythene sacks filled with fertile soil, perforated with side holes to grow 50 to 100 kales or spinach plants vertically), Recycled car tyre gardens (tyres stacked in pyramids or laid horizontally, providing durable, heat-retaining containers), and Vertical wall pocket gardens (repurposed canvas shoes, plastic bottles, or PVC gutters hung against walls and fences). These innovations recycle waste materials, save water, and guarantee constant household vegetable supply.',
    keyConcepts: ['Container Gardening', 'Multi-storey Sack Gardens', 'Recycled Tyre Towers', 'Vertical Wall Pockets', 'Space Optimization', 'Urban Agriculture'],
    kenyanContext: 'In urban informal settlements like Kibera and Mathare in Nairobi, community youth groups harvest thousands of bundles of fresh sukuma wiki and spinach weekly from vertical sack gardens.',
    didYouKnow: 'A single multi-storey sack garden taking up only one square metre of ground space can grow up to 100 healthy vegetable plants!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u5-l2',
    subStrandId: 'substrand-g6-agri-u5',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Growing Media Preparation and Micro-Irrigation',
    summary: 'Master the preparation of well-aerated potting soil mixes, establish central gravel drainage cores, and apply precision bottle drip watering.',
    content: 'Plants grown in containers cannot send roots into deep subsoil; therefore, the potting medium must be exceptionally fertile, light, and well-draining. The ideal container growing mixture consists of 2 parts fertile topsoil, 1 part well-decomposed manure or compost, and 1 part coarse sand or rice husks (2:1:1 ratio). To ensure uniform water infiltration throughout a multi-storey sack, a vertical central column of stones or gravel is built inside the sack using a hollow tin cylinder (without top or bottom) as a guide during filling. Water poured into the top of the gravel core trickles down easily and disperses moisture sideways to roots at all levels. Micro-irrigation using inverted perforated 1-litre plastic bottles buried near plant roots provides continuous, slow water delivery directly where needed, cutting evaporation losses to near zero.',
    keyConcepts: ['Potting Soil Media (2:1:1)', 'Central Gravel Drainage Core', 'Aeration and Porosity', 'Bottle Drip Irrigation', 'Liquid Organic Fertilizer (Tithonia Tea)'],
    kenyanContext: 'School agriculture clubs in Machakos brew liquid tithonia and comfrey tea in buckets and feed it to their sack gardens every two weeks, producing deep-green, chemical-free spinach.',
    didYouKnow: 'Adding coarse charcoal dust or rice husks to container soil prevents the soil from compacting into hard bricks, keeping root hairs supplied with oxygen!',
    estimatedMinutes: 20
  },

  // Unit 6 Lessons
  {
    id: 'lesson-g6-agri-u6-l1',
    subStrandId: 'substrand-g6-agri-u6',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Poultry Management: Housing, Feeding & Brooding',
    summary: 'Learn the essentials of rearing indigenous (Kienyeji) chickens, ducks, and turkeys: predator-proof coops, balanced feeds, and chick brooding.',
    content: 'Poultry farming involves the rearing of domesticated birds for meat, eggs, and feathers. In Kenya, indigenous (Kienyeji) chickens and improved KALRO breeds are widely kept because they are hardy, scavenge well, and fetch premium market prices. Proper housing requires a well-ventilated, dry coop with raised perches for roosting, laying nests lined with clean dry straw, and wire mesh to exclude predators (mongooses, hawks, rats, and snakes). Poultry need clean water at all times and a balanced diet: energy from maize germ or sorghum, protein from omena (fish meal), crushed soya beans, or sunflower cake, minerals from crushed oyster shells (for strong eggshells), and fresh green greens. When raising baby chicks, a warm, draught-free brooder with a heat source (charcoal stove / jiko under a metal hover or infrared bulb) is maintained for the first 3 to 4 weeks to prevent hypothermia.',
    keyConcepts: ['Indigenous Kienyeji Chickens', 'Ventilated Poultry Housing', 'Roosting Perches & Laying Nests', 'Balanced Poultry Rations', 'Chick Brooding & Temperature Management'],
    kenyanContext: 'Farmers across Kakamega and Machakos rear KALRO-improved Kienyeji chickens that lay up to 220 eggs annually while maintaining the rich taste of traditional village chicken.',
    didYouKnow: 'Chickens lack teeth; they swallow small pebbles and grit that stay in their muscular gizzard to grind tough whole grains into digestible paste!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u6-l2',
    subStrandId: 'substrand-g6-agri-u6',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Rearing Rabbits and Guinea Pigs: Hutches and Nutrition',
    summary: 'Discover the art of cuniculture (rabbit farming): constructing elevated wire-mesh hutches, feeding wilted greens and dry hay, and preventing deadly digestive bloat.',
    content: 'Rabbits and small herbivores (guinea pigs) are ideal small domestic animals for Kenyan smallholders: they require very little space, reproduce rapidly, consume garden weeds and vegetable trimmings, and produce lean, highly nutritious white meat. A standard rabbit hutch must be elevated at least 1 metre off the ground on smooth posts fitted with rat guards. The floor should be made of welded wire mesh (or narrow wooden slats with 1 cm gaps) so urine and fecal pellets drop through freely, keeping the hutch dry and sanitary. Breeding does require a dark, warm kindling nest box lined with straw. Rabbits are monogastric herbivores with large caecums. Their diet must consist of clean dry hay, wilted greens (sweet potato vines, desmodium, black jack), commercial pellets, and fresh water. Crucially, fresh green forage must be wilted in the shade for several hours before feeding to evaporate excess surface water and prevent fatal stomach bloat (tympany).',
    keyConcepts: ['Cuniculture (Rabbit Farming)', 'Elevated Hutches with Wire Floor', 'Kindling Nest Box', 'Wilting Green Forage', 'Bloat (Tympany) Prevention'],
    kenyanContext: 'Youth entrepreneurs in Thika and Nakuru rear California White and New Zealand White rabbits, supplying rabbit meat to local butcheries and harvesting rich rabbit urine fertilizer.',
    didYouKnow: 'Rabbit manure and rabbit urine are among the richest organic fertilizers known in agriculture—containing four times more nitrogen than cow dung!',
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 5 & 6
const newMissions = [
  // Unit 5 Missions
  {
    id: 'mission-g6-agri-u5-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Vertical Gardeners: Sacks, Tyres & Wall Pockets',
    description: 'Work with Urban Agronomist Chepngetich to transform discarded gunny sacks, tyres, and plastic bottles into lush multi-storey vegetable towers.',
    objectives: [
      'Assemble multi-storey sack gardens with central gravel infiltration columns',
      'Construct sturdy stacked tyre gardens and hanging wall pocket planters',
      'Optimize vegetable plant spacing to maximize vertical yield'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Container Pioneer',
    badge: 'Container Pioneer',
    questionIds: [
      'q-g6-agri-u5-001', 'q-g6-agri-u5-002', 'q-g6-agri-u5-003', 'q-g6-agri-u5-004',
      'q-g6-agri-u5-005', 'q-g6-agri-u5-006', 'q-g6-agri-u5-007', 'q-g6-agri-u5-008',
      'q-g6-agri-u5-009', 'q-g6-agri-u5-010', 'q-g6-agri-u5-011', 'q-g6-agri-u5-012'
    ]
  },
  {
    id: 'mission-g6-agri-u5-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Urban Agronomists: Media Prep & Micro-Irrigation',
    description: 'Formulate light, well-draining 2:1:1 potting soils, install bottle drip emitters, and nourish container vegetables with organic liquid teas.',
    objectives: [
      'Mix topsoil, compost, and sand in optimal 2:1:1 proportions for container aeration',
      'Install recycled plastic bottle drip irrigation systems',
      'Apply liquid organic fertilizers (tithonia and manure tea) to sustain crop growth'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Micro-Farm Master',
    badge: 'Micro-Farm Master',
    questionIds: [
      'q-g6-agri-u5-013', 'q-g6-agri-u5-014', 'q-g6-agri-u5-015', 'q-g6-agri-u5-016',
      'q-g6-agri-u5-017', 'q-g6-agri-u5-018', 'q-g6-agri-u5-019', 'q-g6-agri-u5-020',
      'q-g6-agri-u5-021', 'q-g6-agri-u5-022', 'q-g6-agri-u5-023', 'q-g6-agri-u5-024'
    ]
  },

  // Unit 6 Missions
  {
    id: 'mission-g6-agri-u6-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Poultry Protectors: Housing, Feeding & Brooding',
    description: 'Step into the poultry yard with Farmer Omondi to design predator-safe chicken coops, formulate protein-packed feeds, and regulate brooder warmth.',
    objectives: [
      'Identify essential components of hygienic poultry coops (perches, laying boxes, mesh)',
      'Formulate balanced poultry diets using local ingredients like omena and maize germ',
      'Manage chick brooder temperatures during the critical first month of life'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Poultry Prodigy',
    badge: 'Poultry Prodigy',
    questionIds: [
      'q-g6-agri-u6-001', 'q-g6-agri-u6-002', 'q-g6-agri-u6-003', 'q-g6-agri-u6-004',
      'q-g6-agri-u6-005', 'q-g6-agri-u6-006', 'q-g6-agri-u6-007', 'q-g6-agri-u6-008',
      'q-g6-agri-u6-009', 'q-g6-agri-u6-010', 'q-g6-agri-u6-011', 'q-g6-agri-u6-012'
    ]
  },
  {
    id: 'mission-g6-agri-u6-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Cuniculture Champions: Rabbit & Small Stock Care',
    description: 'Construct elevated, well-ventilated rabbit hutches, provide kindling nest boxes, wilt fresh forage, and prevent dangerous stomach bloat.',
    objectives: [
      'Construct elevated rabbit hutches with self-cleaning wire mesh floors and rat guards',
      'Wilt fresh green forage to safeguard rabbits against fatal tympany (bloat)',
      'Maintain kindling boxes and practice strict hutch hygiene'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Rabbit Master',
    badge: 'Rabbit Master',
    questionIds: [
      'q-g6-agri-u6-013', 'q-g6-agri-u6-014', 'q-g6-agri-u6-015', 'q-g6-agri-u6-016',
      'q-g6-agri-u6-017', 'q-g6-agri-u6-018', 'q-g6-agri-u6-019', 'q-g6-agri-u6-020',
      'q-g6-agri-u6-021', 'q-g6-agri-u6-022', 'q-g6-agri-u6-023', 'q-g6-agri-u6-024'
    ]
  }
];

// 4. Questions for Units 5 & 6
const newQuestions = [
  // --- UNIT 5: KITCHEN & CONTAINER GARDENING INNOVATIONS (Questions 1 to 24) ---
  // Lesson 1: Sacks, Tyres & Vertical Pockets (001 - 012)
  {
    id: 'q-g6-agri-u5-001',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the primary advantage of innovative container gardening for families living in urban areas of Nairobi or Mombasa?',
    options: [
      'It allows growing fresh nutritious vegetables in limited spaces such as verandas, balconies, and paved courtyards without farm land',
      'It produces vegetables that do not require any water or sunlight',
      'It turns vegetable leaves into solid gold',
      'It eliminates the need for planting seeds'
    ],
    correctAnswer: 'It allows growing fresh nutritious vegetables in limited spaces such as verandas, balconies, and paved courtyards without farm land',
    explanation: 'Container gardens optimize small spaces, enabling landless urban households to harvest fresh vegetables directly from balconies, walls, and backyards.',
    socraticHint: 'How can a family living in a town without a rural shamba grow their own vegetables?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-002',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a multi-storey sack garden?',
    options: [
      'A tall upright gunny or polythene sack filled with rich soil mixture, with staggered holes cut into its sides to grow vegetables vertically',
      'A sack filled with cement used to build stone walls',
      'A sack of dry maize stored on a wooden shelf',
      'A sleeping bag used when camping in national parks'
    ],
    correctAnswer: 'A tall upright gunny or polythene sack filled with rich soil mixture, with staggered holes cut into its sides to grow vegetables vertically',
    explanation: 'A multi-storey sack garden utilizes vertical space: plants grow both on top and through side holes cut around the sack, multiplying yield per square metre.',
    socraticHint: 'What garden is made from a standing bag with small holes cut around the sides for kales and spinach?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-003',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How should the side holes in a multi-storey sack garden be arranged when planting seedlings?',
    options: [
      'In a staggered (zigzag) pattern spaced about 15 to 20 cm apart to give each plant adequate room and light',
      'Cut in one single straight line from top to bottom',
      'Arranged only at the very bottom touching the ground',
      'Torn open completely so all soil spills onto the floor'
    ],
    correctAnswer: 'In a staggered (zigzag) pattern spaced about 15 to 20 cm apart to give each plant adequate room and light',
    explanation: 'Staggering the holes in a zigzag pattern ensures that growing plants do not shade each other and have ample root room inside the sack.',
    socraticHint: 'Why should planting holes on a sack be alternating and zigzagged rather than directly above each other?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-004',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which vegetables are best suited for planting in the SIDE holes of a multi-storey sack garden?',
    options: [
      'Leafy greens like sukuma wiki, spinach, and managu',
      'Deep-rooted tall crops like sugarcane and eucalyptus',
      'Heavy sprawling vines like pumpkins and watermelons',
      'Mature banana trees'
    ],
    correctAnswer: 'Leafy greens like sukuma wiki, spinach, and managu',
    explanation: 'Shallow to medium-rooted compact leafy vegetables thrive in the side pockets, producing clean foliage that hangs outward toward the sun.',
    socraticHint: 'Which common leafy vegetables are compact enough to poke out of small side holes?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-005',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which crop can be planted on the OPEN TOP of a multi-storey sack garden where soil is deepest?',
    options: [
      'Root crops like carrots or onions, or bush tomatoes',
      'Tall maize stalks reaching 4 metres high',
      'Timber cypress seedlings',
      'Wild cactus trees'
    ],
    correctAnswer: 'Root crops like carrots or onions, or bush tomatoes',
    explanation: 'The top surface provides the deepest, uninterrupted vertical soil column, ideal for tap-rooted carrots, bulb onions, or a bushy tomato plant.',
    socraticHint: 'What crop needs deep downward root space on the top surface of the sack?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-006',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can old discarded car tyres be repurposed into productive container gardens in a school compound in Nakuru?',
    options: [
      'Stacked on top of each other in tiers, filled with fertile compost soil, and planted with herbs and kales',
      'Burned in a large bonfire to make smoke',
      'Thrown into nearby rivers to block running water',
      'Buried whole without any soil or seeds'
    ],
    correctAnswer: 'Stacked on top of each other in tiers, filled with fertile compost soil, and planted with herbs and kales',
    explanation: 'Tyres stacked in pyramids or placed individually create sturdy, weather-resistant, zero-cost planters that retain moisture and heat.',
    socraticHint: 'How can used car tyres be stacked and filled with soil to grow food instead of polluting the environment?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-007',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What simple modification should be made to used tyres before using them as vegetable containers to increase the planting surface area?',
    options: [
      'Cutting off the upper inner rim (bead) with a sharp knife to widen the top soil opening',
      'Puncturing thousands of tiny holes in the rubber tread',
      'Painting the tyre in toxic lead paint',
      'Melting the tyre into liquid oil'
    ],
    correctAnswer: 'Cutting off the upper inner rim (bead) with a sharp knife to widen the top soil opening',
    explanation: 'Trimming away the top inward-curving rim opens up a wider planting surface, allowing more light and soil room for growing vegetables.',
    socraticHint: 'How do you open up the top opening of a tyre so that more soil and plants can fit inside?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-008',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a vertical wall pocket garden?',
    options: [
      'Pouches made of canvas, old fabric shoe-organizers, or cut plastic containers fastened to walls or fences to grow herbs and vegetables',
      'A hole dug into an interior bedroom wall for sleeping',
      'A coat pocket filled with dry coins',
      'A large bank safe built into a stone wall'
    ],
    correctAnswer: 'Pouches made of canvas, old fabric shoe-organizers, or cut plastic containers fastened to walls or fences to grow herbs and vegetables',
    explanation: 'Vertical pocket gardens hang modular soil pouches against sunny building walls, fences, or iron sheet gates to maximize vertical living space.',
    socraticHint: 'What garden hangs modular fabric pouches or cut bottles along vertical walls or wooden fences?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-009',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can halved 5-litre plastic cooking oil bottles and PVC gutters be utilized for container farming?',
    options: [
      'Perforated at the bottom for drainage, filled with potting soil, and hung on sunny fences to grow strawberries, mint, and dhania',
      'Used to store toxic kerosene near the kitchen fire',
      'Thrown into burning plastic pits',
      'Crushed flat and used as shoes'
    ],
    correctAnswer: 'Perforated at the bottom for drainage, filled with potting soil, and hung on sunny fences to grow strawberries, mint, and dhania',
    explanation: 'Repurposing discarded plastic containers and gutters into hanging troughs cleans up plastic litter while creating productive micro-gardens.',
    socraticHint: 'How can discarded plastic cooking oil bottles be turned into mini planters for coriander and mint?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-010',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why MUST every container used for growing plants (tins, buckets, tyres, bottles) have small drainage holes pierced at the bottom?',
    options: [
      'To allow excess water to escape and prevent waterlogging that suffocates plant roots causing root rot',
      'To let soil earthworms escape out of the container',
      'To allow sunlight to shine through the bottom of the container',
      'To make the container lighter in weight'
    ],
    correctAnswer: 'To allow excess water to escape and prevent waterlogging that suffocates plant roots causing root rot',
    explanation: 'Without drainage holes, trapped stagnant water displaces soil air, depriving root cells of oxygen and causing fatal fungal root rot.',
    socraticHint: 'What happens to roots if excess water has no exit holes and pools inside the container bottom?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-011',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are container vegetables generally easier to protect from soil-borne pests and contaminated flood runoff than open field crops?',
    options: [
      'Containers are elevated off the ground, isolate clean potting soil, and can be placed in secure sunny verandas away from roaming chickens',
      'Containers produce a force field that repels all insects',
      'Pests refuse to look at man-made plastic containers',
      'Container vegetables grow in complete darkness'
    ],
    correctAnswer: 'Containers are elevated off the ground, isolate clean potting soil, and can be placed in secure sunny verandas away from roaming chickens',
    explanation: 'Elevation and self-contained clean soil protect plants from contaminated street runoff, burrowing soil pests, and scavenging domestic animals.',
    socraticHint: 'Is an elevated sack garden on a clean veranda easier to protect from wandering chickens and muddy floods than crops on the ground?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-012',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does container gardening contribute to environmental sanitation in Kenyan urban residential areas?',
    options: [
      'By repurposing discarded plastic containers, gunny bags, and scrap tyres that would otherwise litter streets and clog drainage channels',
      'By turning all plastic waste into clean drinking water',
      'By making urban dust completely disappear',
      'By replacing tarmac roads with sand dunes'
    ],
    correctAnswer: 'By repurposing discarded plastic containers, gunny bags, and scrap tyres that would otherwise litter streets and clog drainage channels',
    explanation: 'Reusing tyres, plastic jugs, and sacks removes non-biodegradable waste from urban drainage systems, transforming trash into food-producing assets.',
    socraticHint: 'How does reusing discarded plastic jugs and old tyres clean up residential neighborhoods?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Growing Media & Micro-Irrigation (013 - 024)
  {
    id: 'q-g6-agri-u5-013',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the recommended ratio for preparing a high-quality potting medium for container vegetables?',
    options: [
      '2 parts fertile topsoil : 1 part well-decomposed manure or compost : 1 part coarse sand or rice husks (2:1:1)',
      '10 parts pure cement : 1 part river water : 0 parts soil',
      '4 parts motor oil : 1 part fine dust : 1 part salt',
      '1 part pure clay : 0 parts organic matter'
    ],
    correctAnswer: '2 parts fertile topsoil : 1 part well-decomposed manure or compost : 1 part coarse sand or rice husks (2:1:1)',
    explanation: 'The classic 2:1:1 mix provides balanced minerals (topsoil), rich slow-release nutrients and water retention (compost), and pore aeration (sand/husks).',
    socraticHint: 'Remember the balanced 2:1:1 ratio: topsoil, compost, and coarse sand.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-014',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should pure heavy clay soil NEVER be used alone inside a container garden?',
    options: [
      'It compacts into a rock-hard dense block when dry and becomes sticky and waterlogged when wet, suffocating plant roots',
      'It dissolves the container plastic immediately',
      'It attracts toxic gases from the atmosphere',
      'It makes vegetables taste like salt'
    ],
    correctAnswer: 'It compacts into a rock-hard dense block when dry and becomes sticky and waterlogged when wet, suffocating plant roots',
    explanation: 'Heavy clay lacks macropores; inside containers, it hardens into an impenetrable mass when dry and excludes oxygen when wet.',
    socraticHint: 'What happens to heavy sticky clay inside a bucket when it dries out under the sun?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-015',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the purpose of constructing a vertical central column of small stones or gravel in the middle of a multi-storey sack garden?',
    options: [
      'To allow irrigation water poured in the top to filter down easily and spread evenly to all lower side pockets',
      'To make the sack heavy so wind cannot blow it away',
      'To store precious jewelry safely inside the farm',
      'To attract earthworms from the sky'
    ],
    correctAnswer: 'To allow irrigation water poured in the top to filter down easily and spread evenly to all lower side pockets',
    explanation: 'A central gravel core creates a high-permeability vertical conduit that ensures water poured into the center trickles down and saturates all levels evenly.',
    socraticHint: 'How does a center core of porous gravel help water reach plants at the bottom of a tall sack?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-016',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What tool can be used to hold stones in place in the center while pouring soil around the edges when assembling a sack garden?',
    options: [
      'An open metal tin or cylindrical container with both top and bottom cut out',
      'A wooden hammer',
      'A flat piece of paper',
      'A broken bicycle chain'
    ],
    correctAnswer: 'An open metal tin or cylindrical container with both top and bottom cut out',
    explanation: 'An open-ended tin acts as a circular sleeve: gravel is placed inside it and soil around it; lifting the tin as layers rise leaves a neat gravel core.',
    socraticHint: 'What cylindrical open-ended tin can you pull upward layer by layer to form a neat gravel core?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-017',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does bottle drip irrigation work in a tyre or sack garden?',
    options: [
      'A plastic bottle with tiny pinholes pierced near the cap is inverted and buried neck-down in the soil, slowly delivering water directly to roots',
      'Bottles of water are placed in the freezer and thrown at plants',
      'Bottles are burned to produce warm steam',
      'Bottles are filled with sand and hung from tree branches'
    ],
    correctAnswer: 'A plastic bottle with tiny pinholes pierced near the cap is inverted and buried neck-down in the soil, slowly delivering water directly to roots',
    explanation: 'Burying an inverted perforated bottle provides slow, continuous sub-surface drip irrigation directly into the root zone with zero surface evaporation.',
    socraticHint: 'How can a plastic bottle inverted upside-down in the soil deliver slow, steady drops of water to plant roots?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-018',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What liquid organic fertilizer can be prepared by soaking fresh Mexican sunflower (Tithonia diversifolia) leaves in a bucket of water for two weeks?',
    options: [
      'Tithonia liquid tea, an organic fertilizer exceptionally rich in nitrogen and potassium',
      'Chemical kerosene fuel',
      'Synthetic weedkiller acid',
      'Bleaching detergent'
    ],
    correctAnswer: 'Tithonia liquid tea, an organic fertilizer exceptionally rich in nitrogen and potassium',
    explanation: 'Tithonia leaves are biomass accumulators of nitrogen and potassium; fermenting them in water produces a potent, free organic foliar fertilizer.',
    socraticHint: 'What nutrient-rich green plant tea is made by soaking tithonia leaves in water for two weeks?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-019',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why must fermented manure tea or tithonia tea be diluted with clean water (e.g. 1 part tea to 2 parts water) before applying to container crops?',
    options: [
      'Concentrated tea is too strong and can scorch or burn delicate plant roots and foliage',
      'Undiluted tea turns leaves into solid wood',
      'Diluting makes the fertilizer evaporate into steam',
      'Diluting freezes the liquid instantly'
    ],
    correctAnswer: 'Concentrated tea is too strong and can scorch or burn delicate plant roots and foliage',
    explanation: 'High salt and ammonia concentrations in undiluted fermented teas can cause osmotic root burn; diluting to the colour of weak black tea ensures safe feeding.',
    socraticHint: 'Why is it important to dilute strong concentrated organic fertilizer tea with water before feeding plants?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-020',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What happens to nutrients in container soil after several months of intensive harvesting of kales and spinach?',
    options: [
      'Nutrients become depleted through plant uptake and watering leaching, requiring regular replenishment with compost or liquid organic feed',
      'The soil becomes richer in diamonds',
      'The container turns into a giant pumpkin',
      'Soil nutrients multiply infinitely forever without stopping'
    ],
    correctAnswer: 'Nutrients become depleted through plant uptake and watering leaching, requiring regular replenishment with compost or liquid organic feed',
    explanation: 'Because soil volume is confined, heavy harvesting and regular watering leach out soluble nutrients, demanding periodic top-dressing with compost or manure tea.',
    socraticHint: 'What happens to nutrients in a small pot of soil after plants have absorbed food for several months?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-021',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can recycled kitchen greywater (wash water from washing vegetables or dishes) be safely used on container gardens?',
    options: [
      'Using mild, soapy water that is allowed to settle, and applying it to the soil base rather than splashing directly on edible leafy leaves',
      'Using water containing concentrated bleach and harsh toilet cleaners',
      'Boiling the vegetables in boiling soapy water on the plant',
      'Spraying oily dish foam directly onto open tomato blossoms'
    ],
    correctAnswer: 'Using mild, soapy water that is allowed to settle, and applying it to the soil base rather than splashing directly on edible leafy leaves',
    explanation: 'Vegetable rinsing water and mild soapy dishwater are safe when poured into soil around the roots, avoiding caustic chemicals or splashing onto edible leaves.',
    socraticHint: 'How can clean vegetable-washing water from the kitchen be recycled to water soil around container plants?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-022',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is adding biochar (crushed charcoal dust) to container growing media highly recommended by organic agronomists?',
    options: [
      'Biochar is porous, housing beneficial microbes, retaining soil moisture, and preventing nutrient leaching',
      'Biochar burns the soil to keep it warm at night',
      'Biochar turns green vegetables black in colour',
      'Biochar melts into liquid oil that feeds caterpillars'
    ],
    correctAnswer: 'Biochar is porous, housing beneficial microbes, retaining soil moisture, and preventing nutrient leaching',
    explanation: 'Biochar provides massive microscopic surface area that locks in nutrients and moisture while providing habitat for beneficial soil micro-organisms.',
    socraticHint: 'What microscopic benefit does porous charcoal dust provide to soil moisture and beneficial microbes?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-023',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the best time of day to water container vegetable gardens in hot tropical Kenyan towns?',
    options: [
      'Early in the morning or late in the afternoon when evaporation rates are lowest',
      'At 1:00 PM under the scorching midday sun',
      'Only during heavy midnight thunderstorms',
      'Once a month at noon'
    ],
    correctAnswer: 'Early in the morning or late in the afternoon when evaporation rates are lowest',
    explanation: 'Watering in the cool morning or late afternoon ensures maximum water soaks down to roots rather than evaporating quickly in the midday heat.',
    socraticHint: 'When is it coolest during the day so that applied water does not evaporate into the air right away?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u5-024',
    subStrandId: 'substrand-g6-agri-u5',
    lessonId: 'lesson-g6-agri-u5-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'A Grade 6 agriculture club in Kisumu notices water pooling on top of their tyre garden without soaking in. What is the cause and how can they fix it?',
    options: [
      'The soil has compacted due to heavy clay; they should aerate with a hand fork and incorporate compost and coarse sand',
      'The plants have stopped drinking water; they should cut down all crops',
      'The tyres are too round; they should make them square',
      'They should pour boiling oil on the tyres'
    ],
    correctAnswer: 'The soil has compacted due to heavy clay; they should aerate with a hand fork and incorporate compost and coarse sand',
    explanation: 'Water pooling indicates poor permeability and soil compaction; gently loosening the soil and adding organic matter and coarse sand restores drainage.',
    socraticHint: 'What causes water to pool on the soil surface, and how does adding organic compost and sand improve drainage?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // --- UNIT 6: SMALL STOCK & POULTRY MANAGEMENT (Questions 25 to 48) ---
  // Lesson 1: Poultry Management (001 - 012)
  {
    id: 'q-g6-agri-u6-001',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are the main products obtained from rearing domestic poultry in Kenya?',
    options: [
      'Eggs, meat (chicken/duck/turkey), feathers, and rich poultry manure',
      'Cow milk and beef steaks',
      'Wool and sheepskin coats',
      'Honey and beeswax'
    ],
    correctAnswer: 'Eggs, meat (chicken/duck/turkey), feathers, and rich poultry manure',
    explanation: 'Domestic poultry are reared primarily for meat and eggs, alongside valuable by-products like feathers and high-nitrogen organic manure.',
    socraticHint: 'What food products do chickens and ducks provide for breakfast and dinner?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-002',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which poultry rearing system allows birds to roam freely around the homestead during the day scavenging for food and roosting in simple shelters at night?',
    options: [
      'Free-range (extensive) system',
      'Battery cage system',
      'Deep litter indoor intensive system',
      'Fold unit system'
    ],
    correctAnswer: 'Free-range (extensive) system',
    explanation: 'The free-range system allows birds to forage freely for insects, seeds, and greens during daytime, returning to a coop at night.',
    socraticHint: 'What system describes traditional village Kienyeji chickens roaming freely across the compound?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-003',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should poultry houses have well-ventilated windows fitted with wire mesh?',
    options: [
      'To provide fresh airflow and remove toxic ammonia fumes while keeping out predators like hawks, mongooses, and snakes',
      'To let wild foxes and stray dogs enter freely at night',
      'To keep the house completely cold and frozen',
      'To allow chickens to fly away into the forest'
    ],
    correctAnswer: 'To provide fresh airflow and remove toxic ammonia fumes while keeping out predators like hawks, mongooses, and snakes',
    explanation: 'Good airflow prevents dangerous buildup of ammonia and respiratory diseases, while sturdy mesh prevents predatory attacks.',
    socraticHint: 'Why do chicken coops need fresh air circulation while keeping wire mesh to stop rats, snakes, and hawks?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-004',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are roosting perches inside a chicken coop, and why are they important?',
    options: [
      'Horizontal wooden poles fixed above the ground where chickens naturally perch to sleep at night off the damp floor',
      'Metal cages where hens are locked during daytime',
      'Deep holes where eggs are buried',
      'Water troughs for duck swimming'
    ],
    correctAnswer: 'Horizontal wooden poles fixed above the ground where chickens naturally perch to sleep at night off the damp floor',
    explanation: 'Chickens have an instinct to roost off the ground; perches keep them warm, dry, and away from floor manure and crawling parasites.',
    socraticHint: 'Where do chickens instinctively like to sleep at night rather than lying in dirty floor manure?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-005',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are nesting boxes in a poultry coop placed in a semi-dark, quiet corner and lined with clean dry wood shavings or straw?',
    options: [
      'To provide a comfortable, private, and clean environment for hens to lay eggs without egg-eating or breakage',
      'To make hens lay golden eggs',
      'To keep roosters from crowing in the morning',
      'To hatch baby goats'
    ],
    correctAnswer: 'To provide a comfortable, private, and clean environment for hens to lay eggs without egg-eating or breakage',
    explanation: 'Hens seek secluded, dimly lit spots to lay; quiet nests cushioned with dry litter protect eggs from cracking and discourage egg cannibalism.',
    socraticHint: 'Why do laying hens prefer private, dimly lit, straw-lined nesting boxes for laying eggs?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-006',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which commercial or farm-mixed feed is given specifically to young baby chicks from day-old up to 8 weeks of age?',
    options: [
      'Chick mash (high in proteins, vitamins, and minerals for rapid growth)',
      'Layers mash with high limestone grit',
      'Dry whole maize cobs without processing',
      'Pure sawdust mixed with water'
    ],
    correctAnswer: 'Chick mash (high in proteins, vitamins, and minerals for rapid growth)',
    explanation: 'Chick mash contains around 20–22% crude protein, vitamins, and essential minerals tailored for early chick tissue building and immunity.',
    socraticHint: 'What finely ground, protein-rich feed is fed to baby chicks during their first weeks of life?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-007',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why do laying hens require adequate calcium (such as crushed oyster shells / limestone grit) in their daily diet?',
    options: [
      'To build strong, hard eggshells and prevent soft-shelled eggs or bone weakness',
      'To make egg yolks turn bright blue',
      'To make feathers fall off completely',
      'To prevent hens from laying eggs'
    ],
    correctAnswer: 'To build strong, hard eggshells and prevent soft-shelled eggs or bone weakness',
    explanation: 'Eggshells consist almost entirely of calcium carbonate; hens lacking dietary calcium lay soft-shelled eggs and suffer brittle bones.',
    socraticHint: 'What mineral makes eggshells hard and prevents brittle, soft eggs?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-008',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a brooder in poultry farming?',
    options: [
      'A warm, draft-free, hygienic enclosure provided with an artificial heat source where day-old chicks are reared until they grow feathers',
      'A cage where sick birds are permanently locked away',
      'A large outdoor swimming pool for geese',
      'An underground pit where eggs are boiled'
    ],
    correctAnswer: 'A warm, draft-free, hygienic enclosure provided with an artificial heat source where day-old chicks are reared until they grow feathers',
    explanation: 'Chicks cannot regulate their body temperature for the first 3–4 weeks; a brooder provides supplemental heat to prevent chilling and mortality.',
    socraticHint: 'What warm enclosure protects day-old chicks from cold drafts during their first weeks of life?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-009',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can a poultry keeper tell that the temperature inside a chick brooder is TOO COLD?',
    options: [
      'Chicks huddle tightly together under the heat source, chirping loudly and distressfully',
      'Chicks are evenly spread throughout the brooder feeding and sleeping peacefully',
      'Chicks pant with open beaks and crowd against the outer walls far away from the heat',
      'Chicks fly up into the trees'
    ],
    correctAnswer: 'Chicks huddle tightly together under the heat source, chirping loudly and distressfully',
    explanation: 'Huddling directly under the heater in a dense cluster with loud chirping indicates chicks are cold and shivering, seeking body heat.',
    socraticHint: 'What do shivering baby chicks do when they are freezing and desperately trying to stay warm?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-010',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What indicates that the temperature inside a chick brooder is OPTIMAL (just right)?',
    options: [
      'Chicks are evenly distributed across the brooder floor, actively eating, drinking, and resting comfortably',
      'All chicks are clustered in one tight corner trampling each other',
      'All chicks are huddled directly touching the hot charcoal stove',
      'All chicks are standing on one leg with eyes closed'
    ],
    correctAnswer: 'Chicks are evenly distributed across the brooder floor, actively eating, drinking, and resting comfortably',
    explanation: 'When temperature is comfortable, chicks disperse uniformly across the floor, active, feeding, and content without crowding or panting.',
    socraticHint: 'Are comfortable chicks evenly spread out across the brooder or crowded in panic?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-011',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which fatal viral disease causes respiratory distress, twisted necks, greenish diarrhoea, and high mortality in unvaccinated chickens in Kenya?',
    options: [
      'Newcastle disease (Kideri / Amakebe)',
      'Malaria',
      'Kwashiorkor',
      'Tuberculosis of the foot'
    ],
    correctAnswer: 'Newcastle disease (Kideri / Amakebe)',
    explanation: 'Newcastle disease is a devastating, highly contagious avian virus; routine vaccination (eye drop or drinking water vaccine) is essential to prevent flock wipeouts.',
    socraticHint: 'Which common viral killer of village chickens is known as Kideri in Swahili?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-012',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should poultry drinking drinkers be cleaned and refilled with fresh, clean water every single morning?',
    options: [
      'Stale, dirty water contaminated with droppings breeds deadly bacteria and coccidiosis parasites',
      'Chickens refuse to drink water unless it has red food colour',
      'Clean water turns chickens into ducks',
      'Dirty water makes eggshells transparent'
    ],
    correctAnswer: 'Stale, dirty water contaminated with droppings breeds deadly bacteria and coccidiosis parasites',
    explanation: 'Contaminated water is the fastest vector for Salmonella, E. coli, and coccidia parasites; daily scrubbing and fresh water maintain flock health.',
    socraticHint: 'What disease-causing germs multiply quickly in water contaminated with chicken manure droppings?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Rabbit & Small Stock Management (013 - 024)
  {
    id: 'q-g6-agri-u6-013',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is cuniculture?',
    options: [
      'The agricultural practice of breeding and raising domestic rabbits',
      'The cultivation of mushrooms in dark caves',
      'The rearing of fish in freshwater ponds',
      'The keeping of honeybees in modern beehives'
    ],
    correctAnswer: 'The agricultural practice of breeding and raising domestic rabbits',
    explanation: 'Cuniculture is the scientific term for the breeding, rearing, and management of domestic rabbits for meat, fur, or breeding stock.',
    socraticHint: 'What branch of animal farming deals specifically with domestic rabbits?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-014',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should rabbit hutches be elevated at least 1 metre off the ground on wooden or metal posts?',
    options: [
      'To protect rabbits from ground predators (dogs, rats, safari ants), dampness, and cold ground air',
      'To allow rabbits to look over high fences',
      'To make rabbits grow feathers for flying',
      'To catch more direct sunlight in their eyes'
    ],
    correctAnswer: 'To protect rabbits from ground predators (dogs, rats, safari ants), dampness, and cold ground air',
    explanation: 'Elevation keeps rabbits safe from stray dogs, mongooses, and attacking safari ants, while ensuring good ventilation and drainage.',
    socraticHint: 'Why is it dangerous to keep fragile domestic rabbits directly on the ground level where dogs and safari ants can reach them?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-015',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What type of flooring is best for a hygienic rabbit hutch?',
    options: [
      'Welded wire mesh (or narrow smooth wooden slats with 1 cm gaps) that allows urine and fecal droppings to fall through freely',
      'Solid flat mud floor that traps all urine and manure inside',
      'Smooth sheet glass that stays cold and slippery',
      'Loose soil where rabbits can dig tunnels and escape'
    ],
    correctAnswer: 'Welded wire mesh (or narrow smooth wooden slats with 1 cm gaps) that allows urine and fecal droppings to fall through freely',
    explanation: 'A self-cleaning slatted or wire floor lets droppings drop into collection trays beneath, keeping rabbits clean, dry, and free from foot infections.',
    socraticHint: 'How does a wire mesh floor let droppings fall through to keep rabbits clean and dry?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-016',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What metal barrier should be installed around the support posts of a rabbit hutch to stop climbing rats and predators?',
    options: [
      'Rat guards (inverted metal cones or collar baffles)',
      'Copper electric wire',
      'Barb wire wrapped in cow dung',
      'Rubber car tires'
    ],
    correctAnswer: 'Rat guards (inverted metal cones or collar baffles)',
    explanation: 'Rat guards (flared metal baffles fixed on posts) physically block climbing rodents, rats, and snakes from reaching hutch platforms.',
    socraticHint: 'What circular metal cone collar fixed on hutch posts stops rats from climbing up?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-017',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a kindling nest box in rabbit housing?',
    options: [
      'A dark, warm wooden box lined with dry grass or straw placed inside a doe\'s hutch where she can give birth and nurse her kits safely',
      'A box where rabbit meat is packed for the supermarket',
      'A box used to carry adult rabbits to the vet',
      'A feeding trough for rabbit pellets'
    ],
    correctAnswer: 'A dark, warm wooden box lined with dry grass or straw placed inside a doe\'s hutch where she can give birth and nurse her kits safely',
    explanation: 'Does instinctively seek a secluded, warm nest (kindling box) to pluck fur, give birth, and nurture hairless, blind newborn kits.',
    socraticHint: 'What cozy box does a mother rabbit (doe) use to give birth to her newborn kits?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-018',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why must freshly harvested green grass and vegetable leaves be WILTED in the shade for several hours before being fed to rabbits?',
    options: [
      'Feeding wet, fresh succulent greens causes severe digestive fermentation and fatal stomach bloat (tympany)',
      'Fresh greens are too heavy for rabbits to carry in their paws',
      'Sunlight makes fresh greens turn into poison',
      'Wilting greens turns them into dry timber'
    ],
    correctAnswer: 'Feeding wet, fresh succulent greens causes severe digestive fermentation and fatal stomach bloat (tympany)',
    explanation: 'Wet, dew-covered green forage rapidly ferments in the rabbit\'s cecum, producing excessive gas (tympany/bloat) that can kill rabbits within hours.',
    socraticHint: 'Why should green weeds and grass be left to wilt and lose wet moisture before giving them to rabbits?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-019',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following greens readily available in Kenya is safe and nutritious for rabbits when wilted properly?',
    options: [
      'Sweet potato vines, desmodium, black jack (Bidens pilosa), and sow thistle',
      'Toxic tomato leaves and raw potato peels',
      'Rotten moldy cabbage leaves from the market floor',
      'Dry tea leaves mixed with soap'
    ],
    correctAnswer: 'Sweet potato vines, desmodium, black jack (Bidens pilosa), and sow thistle',
    explanation: 'Sweet potato vines, desmodium, and black jack are nutritious forages, whereas solanaceous plants (tomato/potato leaves) contain toxic glycoalkaloids.',
    socraticHint: 'Select safe garden greens like sweet potato vines and black jack over toxic potato and tomato foliage.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-020',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is dry clean grass hay (such as Rhodes grass hay) an essential daily component of a rabbit\'s diet?',
    options: [
      'It provides crude fibre required for healthy gut digestion and helps wear down continuously growing incisor teeth',
      'It contains pure sugar for quick energy',
      'It prevents rabbits from ever needing drinking water',
      'It changes the fur colour of the rabbit'
    ],
    correctAnswer: 'It provides crude fibre required for healthy gut digestion and helps wear down continuously growing incisor teeth',
    explanation: 'Rabbits need long coarse fibre for gut motility and to grind down their open-rooted incisors, which grow continuously throughout life.',
    socraticHint: 'What helps rabbit digestion move properly and grinds down their continuously growing front teeth?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-021',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the correct, gentle way to lift and handle a live rabbit to avoid injury to both the rabbit and the handler?',
    options: [
      'Grasp the loose skin over the scruff of the neck with one hand while firmly supporting the rabbit\'s hindquarters with the other hand',
      'Lift the rabbit high by its long ears alone',
      'Hold the rabbit upside down by its back legs',
      'Pull the rabbit by its short fluffy tail'
    ],
    correctAnswer: 'Grasp the loose skin over the scruff of the neck with one hand while firmly supporting the rabbit\'s hindquarters with the other hand',
    explanation: 'Lifting by ears causes severe pain and cartilage damage; the correct method supports the rump while gripping the loose scruff of the neck.',
    socraticHint: 'Should you ever pick up a rabbit by its ears, or must you support its hindquarters and scruff?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-022',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What common parasitic skin disease causes crusty scabs, intense itching, and loss of fur inside the ears of rabbits?',
    options: [
      'Ear mange (ear canker / ear mites)',
      'Rickets',
      'Anaemia',
      'Foot rot'
    ],
    correctAnswer: 'Ear mange (ear canker / ear mites)',
    explanation: 'Ear mange is caused by Psoroptes cuniculi mites infesting the ear canal, causing brown crusty scabs, head shaking, and severe distress.',
    socraticHint: 'What parasitic mite causes thick crusty scabs inside a rabbit\'s ears?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-023',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can a smallholder farmer in Kiambu collect and utilize rabbit urine from elevated hutches?',
    options: [
      'By installing slanted plastic gutters under the wire floor leading to a collection container, using the urine as rich organic foliar fertilizer and bio-pesticide',
      'By dumping it onto roads to wash away cars',
      'By mixing it with cow milk to sell at markets',
      'By boiling it to make cooking oil'
    ],
    correctAnswer: 'By installing slanted plastic gutters under the wire floor leading to a collection container, using the urine as rich organic foliar fertilizer and bio-pesticide',
    explanation: 'Slanted plastic troughs catch falling urine; fermented diluted rabbit urine is a prized foliar spray packed with nitrogen and natural insect-repelling properties.',
    socraticHint: 'How can collecting rabbit urine in gutters beneath hutches provide a potent natural liquid fertilizer for vegetables?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u6-024',
    subStrandId: 'substrand-g6-agri-u6',
    lessonId: 'lesson-g6-agri-u6-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are rabbits and guinea pigs particularly suitable livestock enterprises for young learners and women in Kenya?',
    options: [
      'They require minimal initial capital, need little physical space, eat garden weeds and kitchen scraps, and have a short breeding gestation period of only 30 days',
      'They require 100 acres of pasture to survive',
      'They produce 50 litres of milk per day like cows',
      'They can be trained to guard homes like security dogs'
    ],
    correctAnswer: 'They require minimal initial capital, need little physical space, eat garden weeds and kitchen scraps, and have a short breeding gestation period of only 30 days',
    explanation: 'Low startup costs, small footprint, free forage, and rapid 30-day gestation make rabbit farming an accessible, highly profitable enterprise for youth.',
    socraticHint: 'Why is rabbit farming easy to start with little money and small backyard space compared to keeping cows?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  }
];

// 5. Insert into db
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

console.log('Batch 3 of Grade 6 Agriculture & Nutrition successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
