/**
 * Grade 6 Agriculture & Nutrition - Batch 2 Generator
 * Covers Units 3 & 4:
 * - Unit 3: Propagation and Planting of Crops: Creepers & Climbing Crops (strand-g6-agri-crop-production)
 * - Unit 4: Indigenous Kenyan Vegetables: Establishment & Value Addition (strand-g6-agri-crop-production)
 * Missions: Orders 45, 46, 47, 48 (world-green-farm)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Agriculture & Nutrition Batch 2 (Units 3 & 4) ---');

// 1. Sub-strands for Units 3 & 4
const newSubStrands = [
  {
    id: 'substrand-g6-agri-u3',
    strandId: 'strand-g6-agri-crop-production',
    name: 'Propagation & Management of Creepers and Climbing Crops',
    description: 'Explore the propagation, planting, staking, trellising, training, and pruning of climbing and creeping crops such as passion fruit, pumpkins, gourds, climbing beans, and watermelons.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Identify common climbing and creeping crops grown in Kenya and their economic importance',
      'Propagate and plant creeping and climbing crops using certified seeds and stem cuttings',
      'Construct sturdy support structures (trellises, stakes, wire pergolas) and perform routine pruning and training'
    ]
  },
  {
    id: 'substrand-g6-agri-u4',
    strandId: 'strand-g6-agri-crop-production',
    name: 'Indigenous African Leafy Vegetables & Organic Crop Protection',
    description: 'Establish and manage traditional Kenyan leafy vegetables (Managu, Terere, Kunde, Saga, Mitoo), nursery management, transplanting, and eco-friendly biological pest management using neem, wood ash, and companion planting.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Identify popular indigenous leafy vegetables and their nutritional and medicinal values',
      'Prepare fine nursery seedbeds, manage seedlings, and carry out timely hardening-off and transplanting',
      'Formulate organic botanical pesticide extracts (neem, tithonia, chili) and apply companion planting to deter common insect pests'
    ]
  }
];

// 2. Lessons for Units 3 & 4
const newLessons = [
  // Unit 3 Lessons
  {
    id: 'lesson-g6-agri-u3-l1',
    subStrandId: 'substrand-g6-agri-u3',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Creepers & Climbing Crops: Identification and Propagation',
    summary: 'Discover passion fruits, pumpkins, climbing beans, bottle gourds, and watermelons, and learn how to propagate them using seeds and cuttings.',
    content: 'Climbing and creeping crops have weak, non-woody, or flexible stems that cannot stand upright on their own. Creepers spread horizontally across the soil surface (e.g. pumpkins, watermelons, sweet potatoes), while climbers use specialized modified structures such as tendrils, twining stems, or adventitious aerial roots to ascend vertical supports (e.g. passion fruit, climbing French beans, bottle gourds, yams). These crops are highly valuable in Kenya, offering vital vitamins, dietary fibre, and income. Propagation is predominantly done by true seeds (for pumpkins, watermelons, and beans) or through a combination of seeds, stem cuttings, and grafting (for passion fruits onto disease-resistant yellow passion rootstocks). Soil must be well-drained, deeply tilled, and enriched with well-decomposed farmyard manure or compost.',
    keyConcepts: ['Creepers vs Climbers', 'Tendrils and Twining Stems', 'Passion Fruit, Pumpkins & Climbing Beans', 'Seed Propagation & Grafting', 'Manuring'],
    kenyanContext: 'In Uasin Gishu and Trans-Nzoia counties, purple passion fruit is a lucrative cash crop for smallholders, while pumpkin farming thrives across Meru and Nyeri for both fruit and tender leaves.',
    didYouKnow: 'A single pumpkin vine can produce up to 100 metres of sprawling stems and yield over 150 kilograms of edible pumpkins in a single season!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u3-l2',
    subStrandId: 'substrand-g6-agri-u3',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Training, Staking, Trellising and Pruning of Climbing Crops',
    summary: 'Master techniques of supporting weak vines using wooden stakes, wire trellises, and pergolas, and prune lateral shoots for higher yields and disease control.',
    content: 'Because climbers have weak stems, providing physical support is critical to keep foliage and developing fruits off the damp ground. Staking involves fixing sturdy wooden poles (1.5 to 2 metres tall) beside individual plants (common for climbing beans and tomatoes). Trellising involves erecting posts connected by galvanized wires or sisal twines, creating a vertical or overhead T-trellis framework (ideal for passion fruit orchards). Training gently guides emerging tendrils and vines along the support wires using loose soft twine ties. Pruning involves cutting away old, dead, diseased, or overcrowded lateral branches and suckers. Supporting and pruning climber crops delivers massive agronomic advantages: it improves sun exposure and air circulation, prevents ground soil-borne fungal diseases, makes weeding and harvesting effortless, and produces clean, unblemished fruits.',
    keyConcepts: ['Staking vs Trellising', 'T-trellis Framework', 'Training Vines', 'Sanitary & Lateral Pruning', 'Disease Reduction & Aeration'],
    kenyanContext: 'Passion fruit farmers in Eldoret erect sturdy treated cedar posts connected with 14-gauge high-tensile wire, training vines into a neat curtain canopy that maximizes fruit production.',
    didYouKnow: 'Elevating passion fruit vines on trellises reduces fungal brown spot disease infections by over 80% compared to letting vines trail across damp soil!',
    estimatedMinutes: 20
  },

  // Unit 4 Lessons
  {
    id: 'lesson-g6-agri-u4-l1',
    subStrandId: 'substrand-g6-agri-u4',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Indigenous African Leafy Vegetables: Diversity and Value',
    summary: 'Explore traditional Kenyan greens—Managu, Terere, Kunde, Saga, and Mitoo—and discover their extraordinary resilience and nutritional wealth.',
    content: 'Indigenous African Leafy Vegetables (ALVs) are traditional greens that have been cultivated or harvested in Kenya for generations. Prominent species include: Managu / Osuga (African nightshade - rich in iron and calcium), Terere / Dodo (Amaranth - rich in proteins, Vitamin A, and Vitamin C), Kunde (Cowpea leaves - high in iron and protein), Saga / Chinsaga (Spider plant - rich in beta-carotene and anti-inflammatory compounds), and Mitoo / Mihoo (Slenderleaf/Crotalaria - rich in iron with a distinct aromatic flavour). Unlike many exotic cabbages, indigenous vegetables are well adapted to local climate stresses, tolerate moderate drought, resist indigenous pests, mature rapidly (within 3 to 6 weeks), and offer continuous pickings throughout the season. They are superfoods that combat micronutrient malnutrition and stunting.',
    keyConcepts: ['African Leafy Vegetables (ALVs)', 'Managu (African Nightshade)', 'Terere (Amaranth)', 'Kunde (Cowpea Leaves)', 'Saga (Spider Plant)', 'Nutritional Value'],
    kenyanContext: 'In Western and Nyanza markets, such as Kibuye in Kisumu and Luanda in Vihiga, sacks of fresh managu, kunde, and mitoo arrive daily, generating steady income for women farmers.',
    didYouKnow: 'A single 100-gram serving of cooked Terere (amaranth leaves) provides more than 100% of a Grade 6 learner\'s daily requirement of Vitamin A!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u4-l2',
    subStrandId: 'substrand-g6-agri-u4',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Nursery Care, Transplanting and Natural Pest Defense',
    summary: 'Learn fine seedbed preparation for tiny ALV seeds, transplanting techniques, and chemical-free pest control using neem, wood ash, and marigold companion plants.',
    content: 'Because seeds of indigenous vegetables (like managu and terere) are extremely tiny, they must be established in a fine, well-pulverized nursery bed. Seeds are mixed with dry sand or fine wood ash to ensure even spacing along shallow drill furrows (15 cm apart), covered with a thin soil layer, mulched, and watered with a fine-rose watering can. After 3 to 4 weeks, seedlings are hardened off by reducing shade and water, then transplanted late in the afternoon into moist, manured field beds. For pest management, eco-friendly organic methods are preferred over toxic synthetic chemicals: aqueous neem leaf/seed extracts and tithonia teas deter aphids and caterpillars; dry wood ash sprinkled around stems deters cutworms and slugs; and planting pungent Mexican marigolds (Tagetes minuta) between vegetable rows repels whiteflies and root-knot nematodes.',
    keyConcepts: ['Fine Nursery Bed', 'Seed Sand Mixing', 'Hardening Off', 'Late Afternoon Transplanting', 'Botanical Extracts (Neem & Tithonia)', 'Companion Planting (Marigold)'],
    kenyanContext: 'Organic farmers at Kangemi and Wangige markets spray fresh neem and chili extracts on their managu and terere, commanding premium prices from health-conscious urban shoppers.',
    didYouKnow: 'Mexican marigold roots secrete a natural chemical compound called alpha-terthienyl that suppresses destructive soil nematodes for up to three years!',
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 3 & 4
const newMissions = [
  // Unit 3 Missions
  {
    id: 'mission-g6-agri-u3-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Vine Voyagers: Creepers and Climbing Crops',
    description: 'Join Horticulturist Wafula on the fruit farm to classify climbing tendrils, propagate passion fruit rootstocks, and direct pumpkin vines across fertile beds.',
    order: 45,
    orderIndex: 45,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Vine Specialist',
    badge: 'Vine Specialist',
    questionIds: [
      'q-g6-agri-u3-001', 'q-g6-agri-u3-002', 'q-g6-agri-u3-003', 'q-g6-agri-u3-004',
      'q-g6-agri-u3-005', 'q-g6-agri-u3-006', 'q-g6-agri-u3-007', 'q-g6-agri-u3-008',
      'q-g6-agri-u3-009', 'q-g6-agri-u3-010', 'q-g6-agri-u3-011', 'q-g6-agri-u3-012'
    ]
  },
  {
    id: 'mission-g6-agri-u3-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Trellis Tacticians: Staking and Training Systems',
    description: 'Erect high-tensile wire trellises, stake climbing French beans, train delicate tendrils, and prune lateral suckers to supercharge fruit yields.',
    order: 46,
    orderIndex: 46,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Master of Trellises',
    badge: 'Master of Trellises',
    questionIds: [
      'q-g6-agri-u3-013', 'q-g6-agri-u3-014', 'q-g6-agri-u3-015', 'q-g6-agri-u3-016',
      'q-g6-agri-u3-017', 'q-g6-agri-u3-018', 'q-g6-agri-u3-019', 'q-g6-agri-u3-020',
      'q-g6-agri-u3-021', 'q-g6-agri-u3-022', 'q-g6-agri-u3-023', 'q-g6-agri-u3-024'
    ]
  },

  // Unit 4 Missions
  {
    id: 'mission-g6-agri-u4-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Indigenous Greens Guardians: Traditional Vegetables',
    description: 'Venture into the traditional kitchen garden with Mama Akinyi to cultivate nutrient-rich Managu, Terere, Kunde, and Saga.',
    order: 47,
    orderIndex: 47,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Indigenous Greens Master',
    badge: 'Indigenous Greens Master',
    questionIds: [
      'q-g6-agri-u4-001', 'q-g6-agri-u4-002', 'q-g6-agri-u4-003', 'q-g6-agri-u4-004',
      'q-g6-agri-u4-005', 'q-g6-agri-u4-006', 'q-g6-agri-u4-007', 'q-g6-agri-u4-008',
      'q-g6-agri-u4-009', 'q-g6-agri-u4-010', 'q-g6-agri-u4-011', 'q-g6-agri-u4-012'
    ]
  },
  {
    id: 'mission-g6-agri-u4-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Organic Protectors: Nursery Care and Natural Pest Defense',
    description: 'Nurture tiny vegetable seeds in precision nurseries, harden off seedlings, and brew potent botanical neem and ash solutions to halt insect pests.',
    order: 48,
    orderIndex: 48,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Organic Defender',
    badge: 'Organic Defender',
    questionIds: [
      'q-g6-agri-u4-013', 'q-g6-agri-u4-014', 'q-g6-agri-u4-015', 'q-g6-agri-u4-016',
      'q-g6-agri-u4-017', 'q-g6-agri-u4-018', 'q-g6-agri-u4-019', 'q-g6-agri-u4-020',
      'q-g6-agri-u4-021', 'q-g6-agri-u4-022', 'q-g6-agri-u4-023', 'q-g6-agri-u4-024'
    ]
  }
];

// 4. Questions for Units 3 & 4
const newQuestions = [
  // --- UNIT 3: CREEPERS & CLIMBING CROPS (Questions 1 to 24) ---
  // Lesson 1: Identification & Propagation (001 - 012)
  {
    id: 'q-g6-agri-u3-001',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the main physical characteristic shared by all climbing and creeping crops?',
    options: [
      'They have weak, flexible stems that cannot support themselves upright without spreading or climbing',
      'They have thick woody trunks like eucalyptus trees',
      'They grow exclusively under water in swamps',
      'They produce thorny needles instead of green leaves'
    ],
    correctAnswer: 'They have weak, flexible stems that cannot support themselves upright without spreading or climbing',
    explanation: 'Climbers and creepers possess non-woody, flexible, elongated stems that either trail horizontally along the ground (creepers) or twine vertically around supports (climbers).',
    socraticHint: 'Think about whether pumpkin or passion fruit stems can stand upright on their own like a maize stalk.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-002',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does a climbing crop differ biologically from a creeping crop?',
    options: [
      'Climbers possess specialized structures like tendrils or twining stems to ascend upwards, whereas creepers spread horizontally along the ground',
      'Climbers have no leaves while creepers produce flowers only',
      'Creepers live for 100 years while climbers die after 3 days',
      'Climbers only grow in desert sand'
    ],
    correctAnswer: 'Climbers possess specialized structures like tendrils or twining stems to ascend upwards, whereas creepers spread horizontally along the ground',
    explanation: 'Climbers (e.g. passion fruit, climbing beans) climb up vertical structures using tendrils or twining stems, whereas creepers (e.g. pumpkins, watermelons) sprawl across the ground.',
    socraticHint: 'Which one climbs vertically onto fences and trees, and which one creeps along the ground?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-003',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following crops is classified as a CLIMBING crop widely cultivated in Kenya?',
    options: [
      'Passion fruit',
      'Cassava',
      'Sorghum',
      'Carrot'
    ],
    correctAnswer: 'Passion fruit',
    explanation: 'Passion fruit (Passiflora edulis) is a vigorous woody climber that produces coiled tendrils to climb trellises and fences.',
    socraticHint: 'Which juicy fruit vine produces tendrils that wrap tightly around wire trellises?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-004',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following crops is a classic example of a CREEPING crop grown across Kenya?',
    options: [
      'Pumpkin or watermelon',
      'Finger millet',
      'Sunflower',
      'Coffee bush'
    ],
    correctAnswer: 'Pumpkin or watermelon',
    explanation: 'Pumpkins and watermelons trail across the ground surface, producing wide leafy canopies and heavy fruits that rest safely on the soil.',
    socraticHint: 'Which heavy, round gourd crop spreads long leafy vines across the shamba floor?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-005',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What specialized thread-like modified organ do passion fruit and pumpkin plants use to grasp and wrap around support wires?',
    options: [
      'Tendril',
      'Taproot',
      'Thorn',
      'Stomata'
    ],
    correctAnswer: 'Tendril',
    explanation: 'A tendril is a slender, coiled, thread-like modified stem or leaf that responds to touch (thigmotropism) by coiling tightly around supports.',
    socraticHint: 'What curly spring-like shoot coils around sticks and wires to hold a vine up?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-006',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How are pumpkins and watermelons primarily propagated by Kenyan farmers?',
    options: [
      'By planting dried mature certified seeds directly into well-manured planting pits',
      'By root division using bare root hairs',
      'By tissue culture in sterile space stations',
      'By planting leaf blades upside down'
    ],
    correctAnswer: 'By planting dried mature certified seeds directly into well-manured planting pits',
    explanation: 'Pumpkins and watermelons are established directly from seeds planted in moist, manure-enriched mounds or pits.',
    socraticHint: 'What part of a ripe pumpkin or watermelon do you save, dry, and plant in the soil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-007',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why do commercial passion fruit farmers in Eldoret graft purple passion fruit scions onto yellow passion fruit rootstocks?',
    options: [
      'Yellow passion rootstock is naturally resistant to destructive soil-borne Fusarium wilt disease and nematodes',
      'Yellow passion rootstock makes fruits taste like mangoes',
      'Grafting prevents the vine from growing leaves',
      'Grafted passion fruits do not require any water or sunlight'
    ],
    correctAnswer: 'Yellow passion rootstock is naturally resistant to destructive soil-borne Fusarium wilt disease and nematodes',
    explanation: 'Purple passion produces sweeter, more marketable fruit but is vulnerable to Fusarium wilt; grafting it onto hardy yellow passion rootstocks protects the plant from soil pathogens.',
    socraticHint: 'What deadly soil fungal disease does the sturdy yellow passion rootstock protect against?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-008',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is it important to plant climbing and creeping crops in well-drained, deeply tilled soil enriched with organic manure?',
    options: [
      'They have extensive root systems and heavy fruit loads that demand abundant nutrients and cannot tolerate waterlogged roots',
      'Waterlogged soil makes fruits grow inside the earth',
      'Organic manure prevents rainfall from touching the leaves',
      'Tilled soil stops weeds from ever growing for 10 years'
    ],
    correctAnswer: 'They have extensive root systems and heavy fruit loads that demand abundant nutrients and cannot tolerate waterlogged roots',
    explanation: 'Crops like pumpkins and passion fruit feed heavily to produce bulky fruit and foliage; poor drainage causes root rot (collar rot).',
    socraticHint: 'What happens to large fruit vines if their roots are drowned in stagnant, poorly drained water?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-009',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional creeping crop produces hard woody shells that Kenyans have used for centuries to make calabashes, milk gourds, and musical instruments?',
    options: [
      'Bottle gourd (chale / kituu)',
      'Sweet potato',
      'Cowpea',
      'Garden pea'
    ],
    correctAnswer: 'Bottle gourd (chale / kituu)',
    explanation: 'Bottle gourds (Lagenaria siceraria) dry into durable, hollow, woody shells traditionally used as water containers, milk calabashes (sotet in Kalenjin), and rattles.',
    socraticHint: 'Which hollow dried gourd is traditionally used across Kenyan communities to store sour milk (mursik)?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-010',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does planting pumpkins as an intercrop between maize rows protect the farm environment?',
    options: [
      'Their broad leaves form a living mulch that smothers weeds, reduces soil evaporation, and prevents erosion',
      'They absorb excess air so maize does not blow away',
      'They produce electricity that repels wild animals',
      'They turn maize stalks into sweet fruit'
    ],
    correctAnswer: 'Their broad leaves form a living mulch that smothers weeds, reduces soil evaporation, and prevents erosion',
    explanation: 'Sprawling pumpkin foliage creates dense groundcover that cushions rain impact, cools the soil, suppresses weeds, and acts as living mulch between maize rows.',
    socraticHint: 'How do wide pumpkin leaves crawling on the ground benefit the soil under tall maize plants?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-011',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What edible parts does a pumpkin crop provide to a Kenyan family?',
    options: [
      'Both the mature fruit flesh, the nutritious seeds, and the tender green leaves (seveve / kahurura)',
      'Only the underground roots; leaves and fruit are poisonous',
      'Only the woody stem bark',
      'Only the dried flower petals'
    ],
    correctAnswer: 'Both the mature fruit flesh, the nutritious seeds, and the tender green leaves (seveve / kahurura)',
    explanation: 'Pumpkins are multi-purpose crops: the fruit is cooked or mashed with mukimo, the roasted seeds are protein-rich snacks, and tender leaves are delicious greens.',
    socraticHint: 'Can you eat pumpkin fruit, roast its seeds, and also cook its tender leaves as vegetables?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-012',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What spacing should be provided between pumpkin planting basins to give the sprawling vines adequate room to spread?',
    options: [
      'Wide spacing of 2 to 3 metres between planting pits',
      'Narrow spacing of 5 centimetres apart',
      'No spacing; all seeds dumped in one small cup',
      '10 metres between every single leaf'
    ],
    correctAnswer: 'Wide spacing of 2 to 3 metres between planting pits',
    explanation: 'Because pumpkin vines spread aggressively over several metres in all directions, wide spacing (2–3 m) prevents severe overcrowding and competition.',
    socraticHint: 'Do sprawling pumpkin vines need lots of room or very tight spacing to spread their long stems?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Staking, Trellising & Pruning (013 - 024)
  {
    id: 'q-g6-agri-u3-013',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is staking in the management of climbing crops?',
    options: [
      'Driving a sturdy vertical wooden pole or bamboo stick into the soil beside a plant to provide upright support',
      'Digging up the plant roots and hanging them in a tree',
      'Tying a stone to the crop to hold it flat on the ground',
      'Painting the plant stems with white gloss paint'
    ],
    correctAnswer: 'Driving a sturdy vertical wooden pole or bamboo stick into the soil beside a plant to provide upright support',
    explanation: 'Staking provides an upright wooden or bamboo stick beside each climbing plant (like climbing beans or tomatoes) so vines can climb off the ground.',
    socraticHint: 'What vertical wooden post is driven into the soil next to each plant to support it?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-014',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a trellis structure in commercial passion fruit farming?',
    options: [
      'A system of sturdy upright wooden posts connected by horizontal high-tensile wires to support spreading vines',
      'A deep trench filled with burning firewood',
      'A high glass wall that prevents all air from entering the orchard',
      'A roof made of iron sheets that blocks all sunlight'
    ],
    correctAnswer: 'A system of sturdy upright wooden posts connected by horizontal high-tensile wires to support spreading vines',
    explanation: 'A trellis consists of durable treated posts supporting horizontal galvanized wires (usually at 2 metres height) along which passion fruit vines are trained.',
    socraticHint: 'What structure uses posts and stretched horizontal wires to support fruit vines?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-015',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is training of climbing crops?',
    options: [
      'Gently guiding, tying, and directing young climbing vines along support stakes or trellis wires',
      'Teaching farm animals to jump over the crops',
      'Spraying crops with chemical growth boosters every hour',
      'Cutting off the main taproot of the vine'
    ],
    correctAnswer: 'Gently guiding, tying, and directing young climbing vines along support stakes or trellis wires',
    explanation: 'Training is the agronomic practice of guiding flexible shoots toward and along supporting wires using loose ties until tendrils grip securely.',
    socraticHint: 'How do farmers guide young growing shoots to follow trellis wires rather than tangling on the ground?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-016',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should ties used to secure climbing vines to trellis wires be tied LOOSELY with soft sisal twine rather than tight wire?',
    options: [
      'Tight wire will cut into growing stems, restricting sap flow and damaging vascular tissue',
      'Loose twine makes the plant grow faster than the speed of light',
      'Tight wire attracts lightning directly to the fruits',
      'Loose twine keeps birds from landing on the farm'
    ],
    correctAnswer: 'Tight wire will cut into growing stems, restricting sap flow and damaging vascular tissue',
    explanation: 'As vines expand in thickness, tight wire ties girdle the stem, choking phloem and xylem vessels; soft, loose ties allow stem thickening without injury.',
    socraticHint: 'What happens to a stem as it grows thicker if it is tied tightly with thin metal wire?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-017',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following is a major agronomic ADVANTAGE of trellising passion fruit vines rather than letting them sprawl on the ground?',
    options: [
      'It improves airflow, maximizes sunlight, prevents soil-borne fungal rots, and keeps fruits clean and easy to harvest',
      'It stops the vine from ever needing water or fertilizer',
      'It makes fruits turn into gold coins',
      'It eliminates the need for weeding the field'
    ],
    correctAnswer: 'It improves airflow, maximizes sunlight, prevents soil-borne fungal rots, and keeps fruits clean and easy to harvest',
    explanation: 'Elevating vines on trellises ensures rapid drying after rain, limits contact with damp fungal spores, maximizes leaf photosynthesis, and eases management.',
    socraticHint: 'What happens to fruit cleanliness, air circulation, and fungal rot when vines are lifted off damp ground?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-018',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is pruning in the management of climbing fruit crops?',
    options: [
      'The selective removal of unwanted, dead, diseased, overgrown, or non-productive plant parts',
      'Adding chemical fertilizer to the irrigation tank',
      'Spraying water on flower blossoms during hot afternoons',
      'Digging a deep trench around the tree trunk'
    ],
    correctAnswer: 'The selective removal of unwanted, dead, diseased, overgrown, or non-productive plant parts',
    explanation: 'Pruning selectively trims lateral suckers, dead vines, and diseased shoots to direct plant energy into flowering, fruit sizing, and structural health.',
    socraticHint: 'What agricultural practice cuts away old, diseased, or overcrowded branches?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-019',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which cutting tool should a farmer use to make clean, sharp pruning cuts on passion fruit vines without bruising the bark?',
    options: [
      'Pruning shears (secateurs)',
      'A blunt rusty jembe',
      'A carpenter\'s claw hammer',
      'A heavy building sledgehammer'
    ],
    correctAnswer: 'Pruning shears (secateurs)',
    explanation: 'Secateurs make smooth, clean bypass cuts that heal quickly without ragged tears, minimizing wound infection by fungal pathogens.',
    socraticHint: 'Which handheld spring-loaded cutting shears are designed specifically for pruning branches cleanly?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-020',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why must pruning secateurs be sterilized with surgical spirit or diluted bleach between pruning different passion fruit vines?',
    options: [
      'To prevent the transmission of viral and fungal diseases (like passion fruit woodiness virus) from infected plants to healthy plants',
      'To make the metal shears shine like mirrors in the sun',
      'To cool down the blades so they do not catch fire',
      'To make the shears lighter in weight'
    ],
    correctAnswer: 'To prevent the transmission of viral and fungal diseases (like passion fruit woodiness virus) from infected plants to healthy plants',
    explanation: 'Plant sap carries viral and fungal pathogens; sterilizing cutting tools prevents cross-contamination between plants across the orchard.',
    socraticHint: 'How do dirty pruning blades spread contagious plant viruses from sick vines to healthy ones?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-021',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What should be done with pruned diseased branches collected from a passion fruit orchard?',
    options: [
      'They should be gathered and burned or deeply buried outside the orchard to destroy disease spores',
      'Left piled up under the healthiest vines as mulch',
      'Thrown into the community drinking water well',
      'Sold to neighbors as certified planting cuttings'
    ],
    correctAnswer: 'They should be gathered and burned or deeply buried outside the orchard to destroy disease spores',
    explanation: 'Diseased plant material must be removed and safely destroyed (sanitary phytosanitation) to prevent airborne fungal spores from reinfecting crops.',
    socraticHint: 'Should diseased plant clippings be left on the farm to spread infections or removed and safely destroyed?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-022',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a "T-trellis" overhead structure commonly constructed by fruit growers in Kenya?',
    options: [
      'A wooden post with a horizontal crossarm at the top resembling the letter T, supporting two or three parallel wires',
      'A triangle made of three large truck tires stacked together',
      'A teepee tent made of banana leaves',
      'A tunnel dug beneath the garden path'
    ],
    correctAnswer: 'A wooden post with a horizontal crossarm at the top resembling the letter T, supporting two or three parallel wires',
    explanation: 'A T-trellis features a horizontal crosspiece atop each post, allowing multiple parallel wires to carry a broad canopy of productive hanging vines.',
    socraticHint: 'Picture a post shaped like the capital letter "T" holding wires on each end of the crossbar.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-023',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should climbing French beans grown for export in Kirinyaga be supported on bamboo stakes rather than left on the ground?',
    options: [
      'To keep bean pods straight, clean, unblemished, and free from soil splash rot to meet high market quality standards',
      'To make the beans turn into sweet passion fruits',
      'To double the speed of daylight hours',
      'To keep bean leaves from absorbing moisture'
    ],
    correctAnswer: 'To keep bean pods straight, clean, unblemished, and free from soil splash rot to meet high market quality standards',
    explanation: 'Staked climbing beans yield straight, immaculate green pods without soil blemishes or fungal lesions, fetching top market prices.',
    socraticHint: 'Why do premium export vegetable buyers reject beans that have touched muddy soil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u3-024',
    subStrandId: 'substrand-g6-agri-u3',
    lessonId: 'lesson-g6-agri-u3-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does regular pruning of older, unproductive passion fruit vines stimulate new fruit production?',
    options: [
      'Passion fruit flowers and fruits develop on fresh new shoot growth; pruning triggers vigorous new productive flushes',
      'Pruning turns the vine into a giant cabbage',
      'Pruning causes the roots to stop absorbing water',
      'Pruning attracts swarms of locusts that pollinate the flowers'
    ],
    correctAnswer: 'Passion fruit flowers and fruits develop on fresh new shoot growth; pruning triggers vigorous new productive flushes',
    explanation: 'Passion flowers only appear on current-season young shoots; cutting back exhausted wood stimulates dormant buds to shoot productive new fruiting laterals.',
    socraticHint: 'Do passion fruits grow on old woody dead stems or on fresh young green shoots?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // --- UNIT 4: INDIGENOUS KENYAN VEGETABLES & ORGANIC PROTECTION (Questions 25 to 48) ---
  // Lesson 1: Indigenous African Leafy Vegetables (001 - 012)
  {
    id: 'q-g6-agri-u4-001',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are Indigenous African Leafy Vegetables (ALVs)?',
    options: [
      'Traditional green vegetables that have grown and been consumed in Africa for generations and are well adapted to local climates',
      'Artificial plastic plants imported for home decoration',
      'Genetically modified wheat varieties developed in laboratory test tubes',
      'Vegetables that can only grow inside deep underground gold mines'
    ],
    correctAnswer: 'Traditional green vegetables that have grown and been consumed in Africa for generations and are well adapted to local climates',
    explanation: 'ALVs are native or long-naturalized leafy species that have evolved with local ecologies, exhibiting exceptional climate resilience and high nutritive value.',
    socraticHint: 'Think about traditional Kenyan greens like managu, terere, and kunde passed down across generations.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-002',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which popular Kenyan traditional vegetable is known botanically as Solanum nigrum / scabrum and referred to as "Osuga" in Dholuo and "Managu" in Gikuyu?',
    options: [
      'African nightshade (Managu / Osuga)',
      'Spinach',
      'French beans',
      'Head cabbage'
    ],
    correctAnswer: 'African nightshade (Managu / Osuga)',
    explanation: 'African nightshade (Solanum scabrum/nigrum) is known locally as Managu (Kikuyu), Osuga (Luo), Namasaka (Luhya), and Kisuja (Kisii).',
    socraticHint: 'Which indigenous vegetable with slightly bitter, delicious leaves is called Osuga in Nyanza and Managu in Central Kenya?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-003',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the local Kenyan name for the nutrient-dense Amaranth vegetable (Amaranthus hybridus), known as "Dodo" in Western Kenya?',
    options: [
      'Terere (Amaranth)',
      'Sukuma wiki',
      'Dhania (coriander)',
      'Hoho (capsicum)'
    ],
    correctAnswer: 'Terere (Amaranth)',
    explanation: 'Amaranth is known as Terere in Central/Eastern Kenya and Dodo in Western Kenya; it is exceptionally rich in proteins, iron, calcium, and vitamins.',
    socraticHint: 'What fast-growing traditional green vegetable with soft leaves and red or green tassels is called Terere?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-004',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which dual-purpose crop provides both nutritious tender green leaves for relish and protein-rich dry grain pulses in Kenyan drylands?',
    options: [
      'Cowpea (Kunde / Bo / Likubi)',
      'Cassava',
      'Sugarcane',
      'Pineapple'
    ],
    correctAnswer: 'Cowpea (Kunde / Bo / Likubi)',
    explanation: 'Cowpeas (Vigna unguiculata) produce tender green leaves harvested as "kunde" while the maturing pods yield protein-dense grain beans.',
    socraticHint: 'Which legume produces leaves called "Kunde" and pods containing spotted bean seeds?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-005',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional vegetable is known as Spider plant (Cleome gynandra), renowned for its aromatic flavour and high medicinal beta-carotene content?',
    options: [
      'Saga / Chinsaga / Dek',
      'Kales (sukuma wiki)',
      'Carrot',
      'Onion'
    ],
    correctAnswer: 'Saga / Chinsaga / Dek',
    explanation: 'Spider plant is known as Saga (Kikuyu), Chinsaga (Kisii), Dek (Luo), and Tsisaka (Luhya); it is packed with antioxidants, iron, and calcium.',
    socraticHint: 'Which indigenous vegetable with five leaflets per leaf is called Saga in Central, Chinsaga in Kisii, and Dek in Luo?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-006',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are indigenous leafy vegetables superior to exotic cabbages in terms of nutritional health?',
    options: [
      'They contain significantly higher concentrations of iron, calcium, Vitamin A, Vitamin C, and dietary fibre',
      'They contain pure sugar that dissolves in the mouth',
      'They contain zero vitamins or minerals',
      'They have no nutritional value but look colorful'
    ],
    correctAnswer: 'They contain significantly higher concentrations of iron, calcium, Vitamin A, Vitamin C, and dietary fibre',
    explanation: 'Scientific analysis confirms that traditional greens contain several times more iron, calcium, and vitamins than exotic head cabbage, preventing anemia and rickets.',
    socraticHint: 'How do traditional dark greens like managu and terere compare to pale head cabbage in vitamins and iron?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-007',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How quickly can a farmer harvest the first crop of Terere (amaranth) after planting seeds in a moist shamba?',
    options: [
      'Within 3 to 4 weeks',
      'After 2 to 3 years',
      'After 15 years',
      'Within 24 hours'
    ],
    correctAnswer: 'Within 3 to 4 weeks',
    explanation: 'Amaranth is one of the fastest-growing vegetables on Earth, yielding tender, edible leaves ready for harvest within just 21 to 28 days.',
    socraticHint: 'Does amaranth mature in a few short weeks or several long years?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-008',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which harvesting method allows continuous, weekly pickings of indigenous vegetables like managu and kunde over several months?',
    options: [
      'Ratooning and selective picking of tender side shoots and leaves (plucking)',
      'Uprooting the entire plant by the roots during the very first week',
      'Burning the vegetable bed with kerosene',
      'Cutting off the main taproot below the ground'
    ],
    correctAnswer: 'Ratooning and selective picking of tender side shoots and leaves (plucking)',
    explanation: 'Plucking the top tender leaves and side shoots encourages lateral branching, allowing weekly harvests throughout the growing season without killing the plant.',
    socraticHint: 'How do Kenyan mothers harvest managu so that the plant produces fresh new leaves next week?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-009',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What traditional vegetable known as Slenderleaf (Crotalaria brevidens / ochroleuca) is known as "Mitoo" in Western Kenya and prized for its unique bitter-aromatic flavour?',
    options: [
      'Mitoo / Mihoo',
      'Sukuma wiki',
      'Tomato',
      'Sweet pepper'
    ],
    correctAnswer: 'Mitoo / Mihoo',
    explanation: 'Slenderleaf (Crotalaria) is known as Mitoo (Luo) and Mihoo (Luhya); it has trifoliate slender leaves that are often blended with managu or sour milk.',
    socraticHint: 'Which slender-leafed indigenous green is called Mitoo around Lake Victoria?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-010',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are indigenous leafy vegetables particularly valuable for climate change adaptation in Kenyan agriculture?',
    options: [
      'They have high heat tolerance, recover rapidly after short rains, and survive on poorer soils with minimal synthetic inputs',
      'They turn atmospheric smog into fresh river water',
      'They prevent earthquakes from occurring on the farm',
      'They do not require any soil or sunlight to grow'
    ],
    correctAnswer: 'They have high heat tolerance, recover rapidly after short rains, and survive on poorer soils with minimal synthetic inputs',
    explanation: 'Evolution in African tropical conditions makes ALVs naturally tolerant to high temperatures, erratic rainfall, and low-fertility soils.',
    socraticHint: 'Why do local native greens survive tough African drought spells better than fragile imported vegetables?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-011',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional practice preserves surplus harvest of Kunde and Cowpea leaves for consumption during the dry season in Machakos?',
    options: [
      'Blanching in boiling water followed by solar sun-drying and storing in airtight clay pots',
      'Burying raw wet leaves in muddy soil',
      'Soaking leaves in kerosene',
      'Throwing surplus leaves into compost pits immediately'
    ],
    correctAnswer: 'Blanching in boiling water followed by solar sun-drying and storing in airtight clay pots',
    explanation: 'Blanching and sun-drying (traditional vegetable drying) preserves cowpea leaves for months, ensuring green relish during dry seasons.',
    socraticHint: 'How did our grandmothers preserve surplus cowpea leaves using boiling water and sunshine?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-012',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does selling fresh indigenous vegetables at local markets empower rural women in Kenya?',
    options: [
      'It provides steady, rapid cash income to pay school fees, buy household necessities, and improve family livelihoods',
      'It forces women to leave their farms forever',
      'It replaces Kenyan currency with cowrie shells',
      'It stops all trade in other food crops'
    ],
    correctAnswer: 'It provides steady, rapid cash income to pay school fees, buy household necessities, and improve family livelihoods',
    explanation: 'Because ALVs mature in weeks and produce continuous harvests, women farmers earn regular weekly household income from market sales.',
    socraticHint: 'How does earning cash weekly from vegetable sales help mothers support their families and pay school fees?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Nursery Care & Organic Pest Control (013 - 024)
  {
    id: 'q-g6-agri-u4-013',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why must indigenous vegetable seeds like managu and terere be established in a nursery bed before transplanting?',
    options: [
      'The seeds are tiny with minimal food reserves and need a finely prepared seedbed, gentle watering, and protection to germinate successfully',
      'The seeds will only grow if placed inside a refrigerator',
      'Direct planting makes the seeds turn into maize plants',
      'Nursery beds double the weight of vegetable seeds'
    ],
    correctAnswer: 'The seeds are tiny with minimal food reserves and need a finely prepared seedbed, gentle watering, and protection to germinate successfully',
    explanation: 'Tiny seeds lack the energy to push through rough, cloddy soil; establishing them in fine nursery tilth ensures high germination and vigorous seedling development.',
    socraticHint: 'Can tiny seeds with tiny energy reserves push through rough, cloddy farm soil if planted directly?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-014',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why do farmers mix tiny amaranth or managu seeds with dry fine sand or wood ash before sowing them in the nursery bed?',
    options: [
      'To ensure even distribution and prevent overcrowding of tiny seeds along the nursery drill furrows',
      'To turn the seeds into different colours',
      'To make the seeds heavy enough to sink 1 metre deep',
      'To prevent the seeds from ever germinating'
    ],
    correctAnswer: 'To ensure even distribution and prevent overcrowding of tiny seeds along the nursery drill furrows',
    explanation: 'Mixing tiny seeds with sand or ash acts as a carrier volume, allowing the farmer to scatter seeds thinly and evenly, avoiding dense clumps of tangled seedlings.',
    socraticHint: 'How does mixing tiny seeds with dry sand help you sow them thinly rather than dumping hundreds in one spot?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-015',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What watering tool should be used when watering delicate seeds in an indigenous vegetable nursery bed?',
    options: [
      'A watering can fitted with a fine-rose perforated nozzle',
      'A powerful high-pressure fire pump',
      'Throwing a 20-litre bucket of water directly onto the soil',
      'Flooding the bed with deep ocean water'
    ],
    correctAnswer: 'A watering can fitted with a fine-rose perforated nozzle',
    explanation: 'A fine-rose sprinkler breaks the water stream into gentle droplets, preventing water droplets from unearthing tiny seeds or eroding nursery furrows.',
    socraticHint: 'Which nozzle breaks water into gentle raindrop showers so tiny seeds are not washed away?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-016',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is "hardening-off" in nursery seedling management?',
    options: [
      'Gradually reducing watering and removing nursery shade 1 to 2 weeks before transplanting to prepare seedlings for harsh field conditions',
      'Hitting the seedlings with a heavy wooden club to test their strength',
      'Freezing the seedlings in ice blocks overnight',
      'Baking the seedlings in a hot clay oven'
    ],
    correctAnswer: 'Gradually reducing watering and removing nursery shade 1 to 2 weeks before transplanting to prepare seedlings for harsh field conditions',
    explanation: 'Hardening off toughens seedling tissues, thickens waxy leaf cuticles, and strengthens root systems so they do not suffer transplanting shock in the field.',
    socraticHint: 'How do you prepare tender seedlings for full sun and wind before moving them out of the nursery?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-017',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should vegetable seedlings always be transplanted late in the afternoon or on a cloudy day?',
    options: [
      'To minimize water loss through transpiration and avoid scorching midday heat, helping seedlings recover overnight',
      'Because birds are asleep and cannot eat the plants',
      'Because the soil turns into fertilizer only at sunset',
      'Because school rules forbid planting in the morning'
    ],
    correctAnswer: 'To minimize water loss through transpiration and avoid scorching midday heat, helping seedlings recover overnight',
    explanation: 'Late afternoon transplanting allows seedlings to settle in cool night temperatures, take up water, and anchor roots before facing scorching sun.',
    socraticHint: 'Is it gentler for newly transplanted seedlings to rest during a cool night or under scorching midday sun?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-018',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What natural botanical pesticide can be prepared from the leaves and seeds of the Neem tree (Azadirachta indica) in Kenya?',
    options: [
      'Neem extract spray (active ingredient azadirachtin), which repels and disrupts feeding of caterpillars and aphids',
      'Pure synthetic diesel fuel',
      'Bleach powder solution',
      'Sulfuric battery acid'
    ],
    correctAnswer: 'Neem extract spray (active ingredient azadirachtin), which repels and disrupts feeding of caterpillars and aphids',
    explanation: 'Neem contains azadirachtin, a natural compound that repels pests, inhibits feeding, and disrupts insect reproduction without harming beneficial bees.',
    socraticHint: 'What bitter medicinal coastal tree is famous for producing powerful organic insect repellent sprays?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-019',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does sprinkling dry wood ash around the base of young vegetable seedlings protect them from pests?',
    options: [
      'It creates an abrasive, alkaline barrier that irritates soft-bodied cutworms and slugs while adding potassium nutrients to soil',
      'It sets the soil on fire to burn the insects',
      'It creates poison gas that suffocates birds',
      'It freezes the roots into solid ice'
    ],
    correctAnswer: 'It creates an abrasive, alkaline barrier that irritates soft-bodied cutworms and slugs while adding potassium nutrients to soil',
    explanation: 'Wood ash is caustic and desiccating to soft-bodied nocturnal pests like cutworms and slugs, preventing them from severing seedling stems.',
    socraticHint: 'What happens to soft slimy slugs or cutworms when they try to crawl over dry powdery alkaline wood ash?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-020',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is companion planting in organic vegetable farming?',
    options: [
      'Growing two or more beneficial plant species together so one repels pests or enhances growth for the other',
      'Planting crops only when accompanied by your best friend',
      'Planting two identical seeds in the exact same hole',
      'Playing loud pop music to plants while they grow'
    ],
    correctAnswer: 'Growing two or more beneficial plant species together so one repels pests or enhances growth for the other',
    explanation: 'Companion planting exploits natural plant synergies—such as aromatic plants repelling insect pests or legumes feeding adjacent crops.',
    socraticHint: 'How can planting two different plants side-by-side help protect each other from insect pests naturally?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-021',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which strong-smelling flower is commonly planted as a companion plant alongside vegetables in Kenya to repel aphids and suppress root nematodes?',
    options: [
      'Mexican marigold (Tagetes minuta)',
      'Rose flower',
      'Water lily',
      'Jacaranda blossom'
    ],
    correctAnswer: 'Mexican marigold (Tagetes minuta)',
    explanation: 'Mexican marigold emits pungent scent compounds that confuse insect pests, while its roots produce nematicidal exudates that kill root-knot nematodes.',
    socraticHint: 'Which pungent yellow-and-orange flower repels insect pests and kills soil nematodes?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-022',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does boiling crushed hot red peppers (chili) and garlic in water create a natural organic pest deterrent?',
    options: [
      'The strong capsaicin and sulfur odors act as contact repellents and stomach irritants for destructive leaf-eating insects',
      'It sweetens the leaves so caterpillars fall asleep',
      'It permanently freezes the vegetable garden',
      'It turns green leaves into red peppers'
    ],
    correctAnswer: 'The strong capsaicin and sulfur odors act as contact repellents and stomach irritants for destructive leaf-eating insects',
    explanation: 'Hot chili peppers contain capsaicin and garlic contains allicin; both compounds irritate insect senses and drive them away without chemical residue.',
    socraticHint: 'How do spicy hot chili and pungent garlic repel insects when sprayed onto vegetable leaves?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-023',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is organic pest management safer for Kenyan farming families and school children than synthetic chemical pesticides?',
    options: [
      'It avoids toxic chemical poison residues on fresh vegetables, prevents water pollution, and protects pollinating honeybees',
      'It makes vegetables grow without needing any water',
      'It is guaranteed to kill all human bacteria instantly',
      'It turns vegetables into pure medicine that replaces all doctor visits'
    ],
    correctAnswer: 'It avoids toxic chemical poison residues on fresh vegetables, prevents water pollution, and protects pollinating honeybees',
    explanation: 'Natural pest controls are non-toxic, leave zero hazardous chemical residues on food, preserve soil biodiversity, and do not poison farm children or bees.',
    socraticHint: 'Why is it healthier to eat vegetables sprayed with neem and chili rather than dangerous synthetic chemical poisons?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u4-024',
    subStrandId: 'substrand-g6-agri-u4',
    lessonId: 'lesson-g6-agri-u4-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What simple physical practice can a Grade 6 learner use during morning garden inspection to eliminate visible caterpillars without any sprays?',
    options: [
      'Hand-picking caterpillars and dropping them into a tin of soapy water',
      'Throwing stones at the vegetable leaves',
      'Burning the entire plant with a lighter',
      'Pouring kerosene on the leaves'
    ],
    correctAnswer: 'Hand-picking caterpillars and dropping them into a tin of soapy water',
    explanation: 'Hand-picking is the simplest, most direct mechanical pest control for small garden plots, eliminating pests immediately without costs or chemicals.',
    socraticHint: 'What direct physical method safely removes large caterpillars found eating your kales in the morning?',
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

console.log('Batch 2 of Grade 6 Agriculture & Nutrition successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
