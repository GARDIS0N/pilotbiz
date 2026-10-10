/**
 * Grade 6 Agriculture & Nutrition - Batch 5 Generator (Finale: Units 9 & 10)
 * Covers:
 * - Unit 9: Traditional Kenyan Cooking Methods & Indigenous Food Dishes (strand-g6-agri-nutrition-hygiene)
 * - Unit 10: Food Hygiene, Kitchen Safety & Table Etiquette (strand-g6-agri-nutrition-hygiene)
 * Missions: Orders 57, 58, 59, 60 (world-green-farm)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Agriculture & Nutrition Batch 5 (Units 9 & 10) ---');

// 1. Sub-strands for Units 9 & 10
const newSubStrands = [
  {
    id: 'substrand-g6-agri-u9',
    strandId: 'strand-g6-agri-nutrition-hygiene',
    name: 'Traditional Kenyan Cooking Methods & Indigenous Dishes',
    description: 'Master essential cooking methods (boiling, steaming, roasting, stewing, baking) and prepare iconic indigenous Kenyan dishes such as Githeri, Mukimo, Muthokoi, Matoke, Ugali, Omena, and fermented Uji.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Compare cooking techniques and their impact on nutrient retention, texture, and flavor',
      'Prepare traditional Kenyan heritage dishes using local culinary ingredients and hygienic practices',
      'Preserve and celebrate indigenous Kenyan culinary traditions and culture'
    ]
  },
  {
    id: 'substrand-g6-agri-u10',
    strandId: 'strand-g6-agri-nutrition-hygiene',
    name: 'Food Hygiene, Kitchen Safety & Table Etiquette',
    description: 'Practice high standards of kitchen sanitation, correct waste sorting and composting, accident prevention (burns, scalds, cuts), and respectful traditional and modern table manners.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Demonstrate proper dish washing (three-basin technique), surface sanitization, and organic kitchen waste disposal',
      'Apply kitchen safety rules to prevent cuts, burns, scalds, and kitchen fires',
      'Set an orderly dining table and practice courteous, respectful table manners and etiquette'
    ]
  }
];

// 2. Lessons for Units 9 & 10
const newLessons = [
  // Unit 9 Lessons
  {
    id: 'lesson-g6-agri-u9-l1',
    subStrandId: 'substrand-g6-agri-u9',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Culinary Methods: Boiling, Steaming, Roasting and Stewing',
    summary: 'Examine scientific cooking techniques, understand heat transfer in foods, and learn how steaming and gentle stewing conserve delicate water-soluble vitamins.',
    content: 'Cooking is the application of heat to food materials to make them palatable, digestible, safe from pathogens, and appealing. Primary cooking methods include: 1. Boiling (cooking food submerged in boiling liquid at 100°C, ideal for tough grains, maize, and beans, though prolonged boiling leaches water-soluble vitamins B and C into water), 2. Steaming (cooking food in the vapor arising from boiling water without direct contact with the liquid; the healthiest method because vitamins and minerals remain locked inside foods like vegetables and sweet potatoes), 3. Roasting (cooking food uncovered using dry radiant heat from glowing embers, coals, or an oven, such as roasting green maize, sweet potatoes, or goat meat / nyama choma), 4. Stewing (slow, gentle simmering in a small amount of liquid in a covered pot, preserving all dissolved nutrients in the rich gravy), and 5. Shallow frying (cooking in a small quantity of hot cooking oil in a pan). Choosing appropriate cooking methods preserves nutritional quality while eliminating harmful food-borne microbes.',
    keyConcepts: ['Boiling vs Steaming', 'Nutrient Leaching', 'Dry Heat Roasting (Nyama Choma)', 'Stewing and Simmering', 'Cooking Oil Temperature'],
    kenyanContext: 'Street-side vendors across Kenyan towns roast fresh green maize on wire mesh over glowing charcoal embers, rubbing the hot roasted cobs with lemon juice and chili salt.',
    didYouKnow: 'Steaming indigenous vegetables like managu retains over 85% of their delicate Vitamin C, whereas vigorous prolonged boiling in open pots can destroy more than half of it!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u9-l2',
    subStrandId: 'substrand-g6-agri-u9',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Traditional Kenyan Dishes: Heritage and Preparation',
    summary: 'Discover the culinary heritage and step-by-step recipes of classic Kenyan dishes: Mukimo, Muthokoi, Githeri, Matoke, Ugali, and Stewed Omena.',
    content: 'Kenya boasts a rich diversity of traditional culinary dishes rooted in local crops and culture. Key iconic dishes include: 1. Mukimo / Irio (a hearty mashed specialty from Central Kenya made by boiling maize, beans, potatoes, and tender pumpkin leaves or kahurura, then mashing them together into a smooth green paste), 2. Muthokoi (a traditional Kamba delicacy made from de-hulled dry maize kernels boiled with pigeon peas or cowpeas, traditionally prepared using wood ash to loosen the maize outer hull), 3. Matoke (steamed and stewed green cooking bananas cooked with onions, tomatoes, and meat or beans, celebrated in Kisii and Western Kenya), 4. Ugali (a stiff porridge made by vigorously stirring whole maize, millet, or cassava flour into boiling water until firm and fragrant), 5. Stewed Omena (sun-dried Lake Victoria silver cyprinid washed in warm water and gently simmered with onions, ripe tomatoes, and lemon to make a calcium-rich stew), and 6. Fermented Uji (millet-sorghum porridge naturally soured over 2 to 3 days to boost probiotic digestive benefits).',
    keyConcepts: ['Mukimo / Irio (Pumpkin Leaf Mash)', 'Muthokoi (Hulled Maize & Pulses)', 'Matoke (Stewed Green Bananas)', 'Brown Ugali', 'Stewed Omena', 'Fermented Probiotic Uji'],
    kenyanContext: 'At cultural celebrations and weddings across Kenya, a feast is never complete without steaming clay pots of mukimo, muthokoi, and tender stewed kienyeji chicken.',
    didYouKnow: 'Traditional wood ash solution used in preparing muthokoi softens tough maize hulls and adds valuable dietary calcium and potassium into the dish!',
    estimatedMinutes: 20
  },

  // Unit 10 Lessons
  {
    id: 'lesson-g6-agri-u10-l1',
    subStrandId: 'substrand-g6-agri-u10',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Kitchen Sanitation, Personal Hygiene & Waste Sorting',
    summary: 'Master the three-basin dishwashing method, personal food handler hygiene, sun-drying on outdoor dish racks, and composting kitchen scraps.',
    content: 'Kitchen sanitation prevents contamination of food by dangerous pathogens such as Salmonella and E. coli. Every food handler must observe strict personal hygiene: washing hands with soap and running water before handling food and after visiting the latrine, tying back long hair with a clean headscarf, keeping fingernails short and unpainted, and wearing a clean kitchen apron. The standard three-basin dishwashing method ensures complete sterilization of utensils: Basin 1 (washing in warm water with soap to remove grease and food particles), Basin 2 (rinsing in clean warm water), and Basin 3 (sanitizing in boiling water or clean water with a drop of disinfectant). Washed utensils must be air-dried on an elevated outdoor dish rack (chaga) exposed to sunlight, whose ultraviolet rays act as a natural sanitizer. Kitchen waste should be sorted into organic perishables (fruit rinds, vegetable peels for the compost pit or rabbit hutch) and non-biodegradable waste (plastics and glass for safe recycling).',
    keyConcepts: ['Personal Hygiene (Food Handlers)', 'Three-Basin Dishwashing Technique', 'Elevated Dish Rack (Chaga)', 'Sunlight UV Sanitization', 'Kitchen Waste Sorting & Composting'],
    kenyanContext: 'In rural Kenyan homesteads, elevated wooden dish racks (chaga) constructed from local bamboo or timber poles are a vital public health standard for drying plates under the African sun.',
    didYouKnow: 'Drying kitchen dishes with dirty, damp wiping cloths can transfer millions of bacteria back onto clean plates—air-drying on an outdoor rack in the sun is much more hygienic!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u10-l2',
    subStrandId: 'substrand-g6-agri-u10',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Kitchen Safety, First Aid & Courteous Table Manners',
    summary: 'Prevent kitchen cuts, burns, scalds, and fires, administer immediate first aid, and practice graceful traditional and modern table manners.',
    content: 'Kitchens contain hazards including sharp knives, open fires, hot liquids, and electrical appliances. Safety rules include: 1. Turn pan and pot handles inward away from the stove edge to prevent knocks that cause scalding, 2. Never pour water onto hot burning cooking oil (which causes explosive grease fireballs; instead, smother with a damp towel or pot lid), 3. Cut food on a stable cutting board curling fingers inward like a claw ("bear claw" grip), 4. Wipe up floor spills immediately to prevent slip-and-fall accidents. For minor heat burns or scalds, hold the burn immediately under cool running tap water for at least 10 to 15 minutes (never apply butter, raw eggs, or toothpaste). Table etiquette reflects courtesy and respect: wash hands cleanly before sitting, wait for everyone to be served or elders to bless the food, chew food quietly with a closed mouth, avoid talking with food in the mouth, ask politely for items to be passed ("please pass the salt"), and express gratitude to the cook after finishing the meal.',
    keyConcepts: ['Kitchen Hazard Prevention', 'Handling Cooking Oil Fires (Smothering)', 'Burn First Aid (Cool Running Water)', 'Bear Claw Knife Grip', 'Table Manners & Dining Etiquette'],
    kenyanContext: 'In traditional Kenyan dining, washing hands in a clean basin brought to the table before sharing ugali from a communal dish is an age-old tradition of hygiene and respect.',
    didYouKnow: 'Putting butter, flour, or toothpaste on a fresh burn traps heat inside the skin tissues, making the burn significantly worse—cool running water is the only medically approved first aid!',
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 9 & 10
const newMissions = [
  // Unit 9 Missions
  {
    id: 'mission-g6-agri-u9-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Culinary Chemistry: Traditional Cooking Techniques',
    description: 'Master boiling, steaming, roasting, and stewing with Chef Wanyonyi, measuring nutrient retention and perfecting flame temperatures.',
    objectives: [
      'Compare nutrient retention and flavor profiles in boiling, steaming, and roasting',
      'Explain why steaming preserves water-soluble vitamins better than open boiling',
      'Select ideal cooking methods for root tubers, green pulses, and indigenous vegetables'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Master Chef',
    badge: 'Master Chef',
    questionIds: [
      'q-g6-agri-u9-001', 'q-g6-agri-u9-002', 'q-g6-agri-u9-003', 'q-g6-agri-u9-004',
      'q-g6-agri-u9-005', 'q-g6-agri-u9-006', 'q-g6-agri-u9-007', 'q-g6-agri-u9-008',
      'q-g6-agri-u9-009', 'q-g6-agri-u9-010', 'q-g6-agri-u9-011', 'q-g6-agri-u9-012'
    ]
  },
  {
    id: 'mission-g6-agri-u9-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Heritage Feasts: Traditional Kenyan Dishes',
    description: 'Enter the heritage kitchen with Grandmother Nyokabi to prepare authentic Mukimo, Muthokoi, Matoke, brown Ugali, and stewed Omena.',
    objectives: [
      'Identify key ingredients and cooking steps for Mukimo, Muthokoi, and Matoke',
      'Prepare brown whole-grain Ugali and stewed omena rich in calcium and iron',
      'Explain the cultural, nutritional, and medicinal values of indigenous recipes'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Heritage Chef',
    badge: 'Heritage Chef',
    questionIds: [
      'q-g6-agri-u9-013', 'q-g6-agri-u9-014', 'q-g6-agri-u9-015', 'q-g6-agri-u9-016',
      'q-g6-agri-u9-017', 'q-g6-agri-u9-018', 'q-g6-agri-u9-019', 'q-g6-agri-u9-020',
      'q-g6-agri-u9-021', 'q-g6-agri-u9-022', 'q-g6-agri-u9-023', 'q-g6-agri-u9-024'
    ]
  },

  // Unit 10 Missions
  {
    id: 'mission-g6-agri-u10-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Kitchen Guardians: Hygiene, Sanitation & Waste',
    description: 'Enforce professional food handler standards with Health Officer Onyango: master three-basin dishwashing, elevated racks, and compost sorting.',
    objectives: [
      'Demonstrate proper hand washing and food handling hygiene protocols',
      'Execute the three-basin washing, rinsing, and sanitizing procedure',
      'Utilize elevated outdoor dish racks and sort kitchen waste into composting bins'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Kitchen Guardian',
    badge: 'Kitchen Guardian',
    questionIds: [
      'q-g6-agri-u10-001', 'q-g6-agri-u10-002', 'q-g6-agri-u10-003', 'q-g6-agri-u10-004',
      'q-g6-agri-u10-005', 'q-g6-agri-u10-006', 'q-g6-agri-u10-007', 'q-g6-agri-u10-008',
      'q-g6-agri-u10-009', 'q-g6-agri-u10-010', 'q-g6-agri-u10-011', 'q-g6-agri-u10-012'
    ]
  },
  {
    id: 'mission-g6-agri-u10-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Table Diplomats: Safety, First Aid & Table Etiquette',
    description: 'Master kitchen accident prevention, extinguish oil fires, administer burn first aid, and showcase courteous dining table etiquette.',
    objectives: [
      'Prevent kitchen accidents involving open flames, knife blades, and hot oils',
      'Perform correct first aid for minor thermal burns using cool running water',
      'Set an orderly dining table and practice polite traditional and modern table manners'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Etiquette Ambassador',
    badge: 'Etiquette Ambassador',
    questionIds: [
      'q-g6-agri-u10-013', 'q-g6-agri-u10-014', 'q-g6-agri-u10-015', 'q-g6-agri-u10-016',
      'q-g6-agri-u10-017', 'q-g6-agri-u10-018', 'q-g6-agri-u10-019', 'q-g6-agri-u10-020',
      'q-g6-agri-u10-021', 'q-g6-agri-u10-022', 'q-g6-agri-u10-023', 'q-g6-agri-u10-024'
    ]
  }
];

// 4. Questions for Units 9 & 10
const newQuestions = [
  // --- UNIT 9: TRADITIONAL COOKING METHODS & INDIGENOUS DISHES (Questions 1 to 24) ---
  // Lesson 1: Cooking Methods (001 - 012)
  {
    id: 'q-g6-agri-u9-001',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the primary scientific reason for cooking raw foods before eating?',
    options: [
      'Cooking kills harmful disease-causing micro-organisms, softens tough fibres, and improves digestion and flavor',
      'Cooking turns all food items into pure water',
      'Cooking increases the physical weight of food ten times',
      'Cooking is only done to change the colour of plates'
    ],
    correctAnswer: 'Cooking kills harmful disease-causing micro-organisms, softens tough fibres, and improves digestion and flavor',
    explanation: 'Heat destroys pathogenic bacteria and parasites, breaks down indigestible starches and tough collagen, and develops appetizing aroma and taste.',
    socraticHint: 'How does heating food make it safer, softer to chew, and easier for your stomach to digest?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-002',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is boiling as a method of cooking?',
    options: [
      'Cooking food completely submerged in a liquid (usually water) heated to its boiling point of 100 degrees Celsius',
      'Cooking food using dry smoke inside a mud hut',
      'Cooking food using cold ice blocks',
      'Exposing food to direct sunlight in an open field'
    ],
    correctAnswer: 'Cooking food completely submerged in a liquid (usually water) heated to its boiling point of 100 degrees Celsius',
    explanation: 'Boiling cooks food submerged in vigorously bubbling liquid at 100°C, suitable for softening hard foods like dry maize, beans, and potatoes.',
    socraticHint: 'What cooking method immerses food in water that is bubbling vigorously at 100°C?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-003',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why does boiling indigenous green vegetables (like spinach and terere) in large amounts of water and pouring away the green water result in nutritional loss?',
    options: [
      'Water-soluble vitamins (such as Vitamin C and B-complex vitamins) dissolve into the cooking water and are lost when water is discarded',
      'The green water contains toxic poisons that kill the vegetables',
      'Boiling turns vitamins into heavy iron stones',
      'The water steals all the carbohydrates from the food'
    ],
    correctAnswer: 'Water-soluble vitamins (such as Vitamin C and B-complex vitamins) dissolve into the cooking water and are lost when water is discarded',
    explanation: 'Vitamins C and B dissolve readily in boiling water; discarding vegetable broth throws away the extracted vitamins.',
    socraticHint: 'Which delicate vitamins dissolve into cooking water and get thrown down the drain with discarded pot liquid?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-004',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is steaming, and why is it considered the healthiest way to cook vegetables and sweet potatoes?',
    options: [
      'Food is cooked by hot steam rising from boiling water below without touching the liquid, preserving vitamins, texture, and natural flavor',
      'Food is buried deep under hot charcoal ash',
      'Food is soaked in cold river water overnight',
      'Food is fried in deep boiling animal fat'
    ],
    correctAnswer: 'Food is cooked by hot steam rising from boiling water below without touching the liquid, preserving vitamins, texture, and natural flavor',
    explanation: 'Because food rests above water on a perforated steamer rack, nutrients cannot leach away into liquid, keeping over 85% of vitamins intact.',
    socraticHint: 'How does cooking in hot rising vapor rather than submerged in water prevent vitamins from washing away?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-005',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What cooking method is used when fresh green maize is placed over glowing charcoal embers by roadside vendors in Kenya?',
    options: [
      'Roasting (dry radiant heat)',
      'Boiling in cold water',
      'Steaming in an airtight oven',
      'Deep fat frying in oil'
    ],
    correctAnswer: 'Roasting (dry radiant heat)',
    explanation: 'Roasting cooks food uncovered using direct, dry radiant thermal energy from glowing coals or an open heat source.',
    socraticHint: 'What dry heat method cooks sweet potatoes or maize directly over hot charcoal embers?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-006',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is stewing as a culinary technique?',
    options: [
      'Cooking food slowly and gently in a small amount of liquid in a covered saucepan over low heat for an extended time',
      'Blasting food with a high-temperature flame for 10 seconds',
      'Baking dough inside a clay brick oven',
      'Drying food in the sun for two weeks'
    ],
    correctAnswer: 'Cooking food slowly and gently in a small amount of liquid in a covered saucepan over low heat for an extended time',
    explanation: 'Stewing gently simmers meat and vegetables in their own juices and added broth, tenderizing tough fibers while preserving all nutrients in the gravy.',
    socraticHint: 'What gentle, covered cooking method slowly simmers meat and vegetables in a rich gravy sauce?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-007',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should cooking pots always be covered with a tight-fitting lid when boiling githeri or beans on a firewood jiko?',
    options: [
      'To trap steam and heat, which cooks food much faster while saving valuable firewood fuel',
      'To prevent the pot from turning into a frying pan',
      'To hide the food from visitors',
      'To make the pot heavier so it does not float'
    ],
    correctAnswer: 'To trap steam and heat, which cooks food much faster while saving valuable firewood fuel',
    explanation: 'A tight lid traps thermal energy and raises internal pressure slightly, reducing cooking time and saving up to 40% of charcoal or firewood.',
    socraticHint: 'How does covering a cooking pot with a lid trap heat and save household cooking fuel?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-008',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is shallow frying, and what is a common Kenyan breakfast snack prepared using this method?',
    options: [
      'Cooking food in a small amount of oil in a shallow pan, used to make chapatis and pancakes',
      'Boiling food in a 100-litre tank of water to make tea',
      'Roasting food on bare rocks in the desert',
      'Steaming green vegetables inside a banana leaf'
    ],
    correctAnswer: 'Cooking food in a small amount of oil in a shallow pan, used to make chapatis and pancakes',
    explanation: 'Shallow frying uses just enough oil to coat the pan surface (as in pan-frying chapati or eggs), unlike deep-frying which fully submerges items.',
    socraticHint: 'Which method uses just a thin coating of hot oil in a flat pan to cook golden brown chapatis?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-009',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is baking inside a traditional clay oven or modernized charcoal oven an effective dry heat cooking method?',
    options: [
      'Enclosed radiant heat circulates evenly around the food, cooking bread, cakes, and root tubers thoroughly with a golden crust',
      'It freezes the interior of the food while burning the outside',
      'It turns flour into cold ice cream',
      'It requires zero oxygen or heat to work'
    ],
    correctAnswer: 'Enclosed radiant heat circulates evenly around the food, cooking bread, cakes, and root tubers thoroughly with a golden crust',
    explanation: 'Baking surrounds food with uniform hot dry air in an insulated enclosure, caramelizing starches into an appealing crispy outer crust.',
    socraticHint: 'What enclosed dry-heat method bakes dough and bread loaves into golden-crusted foods?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-010',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should fresh green leafy vegetables never be overcooked until they turn dull brownish-yellow?',
    options: [
      'Excessive heat destroys vitamins, denatures beneficial enzymes, breaks down texture, and ruins fresh flavor and appetizing green colour',
      'Overcooking turns vegetables into poisonous metal alloys',
      'Overcooking makes vegetables explode inside the pot',
      'Overcooking turns vegetable leaves into living caterpillars'
    ],
    correctAnswer: 'Excessive heat destroys vitamins, denatures beneficial enzymes, breaks down texture, and ruins fresh flavor and appetizing green colour',
    explanation: 'Prolonged high cooking heat degrades chlorophyll and thermal-sensitive vitamins; cooking greens briefly (blanching/quick sautéing) preserves nutrients and crunch.',
    socraticHint: 'What happens to the bright green color, crisp texture, and vitamin content of greens when boiled for too long?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-011',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does cooking in traditional earthen clay pots (nyungu / chombo cha udongo) improve the flavor and quality of traditional stews?',
    options: [
      'Porous clay distributes heat slowly and evenly, preventing scorching and enhancing gentle simmering and moisture retention',
      'Clay adds chemical preservatives into the soup',
      'Clay dissolves completely into the food to thicken it',
      'Clay pots generate electrical currents that heat the food'
    ],
    correctAnswer: 'Porous clay distributes heat slowly and evenly, preventing scorching and enhancing gentle simmering and moisture retention',
    explanation: 'Natural clay has high thermal mass; it heats slowly, retains gentle heat without hot spots, and allows subtle aromatic evaporation that deepens stew flavor.',
    socraticHint: 'Why do grandmother\'s stews taste so rich and fragrant when simmered slowly in traditional earthenware pots?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-012',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What simple pre-cooking practice drastically reduces the boiling time of dry kidney beans and pigeon peas?',
    options: [
      'Soaking the dry beans in clean water overnight (for 8 to 12 hours) before cooking',
      'Freezing the dry beans in solid ice for a week',
      'Sprinkling dry beans with talcum powder',
      'Painting the beans with black ink'
    ],
    correctAnswer: 'Soaking the dry beans in clean water overnight (for 8 to 12 hours) before cooking',
    explanation: 'Soaking rehydrates starch and protein matrices, softens tough seed coats, leaches out gas-producing oligosaccharides, and cuts boiling time by half.',
    socraticHint: 'How does soaking hard dry beans in water overnight before boiling save hours of cooking firewood?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Traditional Kenyan Dishes (013 - 024)
  {
    id: 'q-g6-agri-u9-013',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are the core ingredients used to make the classic Central Kenya mashed dish Mukimo (also known as Irio)?',
    options: [
      'Maize, beans (or pigeon peas), potatoes, and mashed tender pumpkin leaves (kahurura / seveve)',
      'Wheat flour, baking powder, and white sugar',
      'Raw cassava roots and black pepper',
      'Rice, coconut milk, and pineapple chunks'
    ],
    correctAnswer: 'Maize, beans (or pigeon peas), potatoes, and mashed tender pumpkin leaves (kahurura / seveve)',
    explanation: 'Authentic Mukimo boils green maize, beans, and potatoes together, mashing them with blanched pumpkin leaves to create its signature nutritious green mash.',
    socraticHint: 'Which iconic mashed dish combines boiled maize, potatoes, beans, and green pumpkin leaves?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-014',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What unique preparation step defines Muthokoi, the traditional delicacy of the Kamba community?',
    options: [
      'Pounding dry maize in a wooden mortar to remove the tough outer pericarp (hull) before boiling with pigeon peas or beans',
      'Deep frying whole corn cobs in hot animal fat',
      'Fermenting milk in dried calabash gourds for one month',
      'Wrapping ripe bananas in wet banana fiber'
    ],
    correctAnswer: 'Pounding dry maize in a wooden mortar to remove the tough outer pericarp (hull) before boiling with pigeon peas or beans',
    explanation: 'Muthokoi consists of de-hulled maize kernels (pounded in a kithui/mortar to strip the fibrous coat), creating a soft, quick-cooking, easily digestible pulse stew.',
    socraticHint: 'What traditional pounding in a wooden mortar removes the tough outer skins of dry maize kernels to make Muthokoi?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-015',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional staple dish made from steamed and stewed green cooking bananas is celebrated across Kisii and Western Kenya?',
    options: [
      'Matoke (Ebitoke / Ndizi za kupika)',
      'Mandazi',
      'Pilau',
      'Chapati'
    ],
    correctAnswer: 'Matoke (Ebitoke / Ndizi za kupika)',
    explanation: 'Matoke is prepared by peeling green cooking bananas and simmering or steaming them with onions, tomatoes, and meat or beans into a tender, flavorful stew.',
    socraticHint: 'What dish is prepared by peeling and stewing green cooking bananas with onions and tomatoes?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-016',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How is traditional whole-grain Ugali properly prepared using a wooden cooking stick (mwiko)?',
    options: [
      'Gradually adding flour into vigorously boiling water while stirring and pressing against the pot sides until firm, fully cooked, and fragrant',
      'Dumping flour into cold water and leaving it on the table without stirring',
      'Baking dry flour inside an open metal tin over hot coals',
      'Mixing flour with cold milk and drinking it raw'
    ],
    correctAnswer: 'Gradually adding flour into vigorously boiling water while stirring and pressing against the pot sides until firm, fully cooked, and fragrant',
    explanation: 'Ugali preparation requires sprinkling flour into boiling water, vigorous stirring (kukoroga), and pressing (kusonga) to eliminate lumps until steam escapes and it firms up.',
    socraticHint: 'How does a cook use a wooden mwiko to stir and press flour into boiling water until it becomes a firm mound of ugali?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-017',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should sun-dried Omena (silver cyprinid from Lake Victoria) be washed in hot or warm water before frying or stewing?',
    options: [
      'To wash away sand, dust, and excess bitterness while softening the small fish',
      'To dissolve all fish bones completely into water',
      'To make the fish grow back to full life',
      'To turn the fish into white bread'
    ],
    correctAnswer: 'To wash away sand, dust, and excess bitterness while softening the small fish',
    explanation: 'Washing sun-dried omena in warm water cleans off lake shore sand and fine dust, reduces bitter oils, and softens the flesh before frying.',
    socraticHint: 'Why is it important to wash dried omena in warm water before cooking to remove sand and bitterness?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-018',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is Omena considered one of the richest, most affordable superfoods for school children across Kenya?',
    options: [
      'It is eaten whole (including bones, organs, and head), supplying massive quantities of bioavailable calcium, phosphorus, protein, and omega-3 fatty acids',
      'It contains pure refined sugar that gives immediate energy',
      'It has no calories so children stay thin',
      'It cures all bacterial infections within five minutes'
    ],
    correctAnswer: 'It is eaten whole (including bones, organs, and head), supplying massive quantities of bioavailable calcium, phosphorus, protein, and omega-3 fatty acids',
    explanation: 'Because whole tiny fish are eaten with their soft bones, omena provides extraordinary calcium for growing bones and teeth at low market cost.',
    socraticHint: 'Why does eating omena whole with its tiny soft bones provide such high amounts of bone-building calcium?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-019',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What health benefit does naturally fermented porridge (Uji ya kienyeji made from sorghum and millet) provide over unfermented porridge?',
    options: [
      'Natural fermentation breaks down phytic acid (increasing iron and zinc absorption) and introduces beneficial gut-friendly probiotic bacteria',
      'It contains alcohol that puts children to sleep',
      'It destroys all proteins so you do not have to digest them',
      'It turns the porridge into cooking oil'
    ],
    correctAnswer: 'Natural fermentation breaks down phytic acid (increasing iron and zinc absorption) and introduces beneficial gut-friendly probiotic bacteria',
    explanation: 'Lactic acid fermentation reduces phytates that bind minerals, unlocking bioavailable iron and zinc while enriching the gut with probiotic microflora.',
    socraticHint: 'What beneficial gut probiotics and mineral-unlocking effects occur when porridge flour is fermented for 2 days?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-020',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional Kalenjin milk drink is fermented in specially seasoned gourds coated on the inside with charcoal from the Senetwet tree?',
    options: [
      'Mursik',
      'Busaa',
      'Chang\'aa',
      'Tusker'
    ],
    correctAnswer: 'Mursik',
    explanation: 'Mursik is traditional fermented milk prepared in hollow calabash gourds (sotet) seasoned with aromatic charcoal embers of Senetwet (Cassia didymobotrya).',
    socraticHint: 'What famous traditional sour milk drink seasoned with special tree charcoal is prepared in Kalenjin gourds?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-021',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What role does the natural charcoal smoke and ash from the Senetwet tree play inside a Mursik gourd?',
    options: [
      'It sterilizes the gourd, inhibits bad putrefying bacteria, adds pleasant smoky aroma, and gives mursik its thick, rich texture',
      'It turns the milk into solid black rocks',
      'It poisons the milk so strangers cannot drink it',
      'It heats the milk to boiling point inside the gourd'
    ],
    correctAnswer: 'It sterilizes the gourd, inhibits bad putrefying bacteria, adds pleasant smoky aroma, and gives mursik its thick, rich texture',
    explanation: 'Wood charcoal contains natural antimicrobials that suppress spoilage microbes, promoting clean lactic fermentation with distinct smoky notes.',
    socraticHint: 'How does rubbing hot tree charcoal inside a milk gourd sterilize the container and add smoky flavor?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-022',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which coastal Kenyan dish is prepared by boiling rice in rich coconut milk (tui la nazi) with fragrant cardamom and cloves?',
    options: [
      'Wali wa nazi',
      'Mukimo',
      'Muthokoi',
      'Githeri'
    ],
    correctAnswer: 'Wali wa nazi',
    explanation: 'Wali wa nazi is an aromatic coastal Swahili rice dish cooked in freshly squeezed coconut milk with whole spices.',
    socraticHint: 'What Swahili name refers to fragrant white rice simmered in fresh coconut milk?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-023',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does blending slightly bitter traditional greens (like Managu or Mitoo) with cow milk or cream (maziwa lala) enhance the dish?',
    options: [
      'The fats and lactic acid in milk mellow the bitterness while boosting calcium and fat-soluble vitamin absorption',
      'Milk turns green leaves into yellow ugali',
      'Milk destroys all vitamins in the vegetables',
      'Milk turns the vegetables into solid cheese'
    ],
    correctAnswer: 'The fats and lactic acid in milk mellow the bitterness while boosting calcium and fat-soluble vitamin absorption',
    explanation: 'Milk fat buffers bitter alkaloid notes and facilitates the assimilation of beta-carotenes (Vitamin A) and fat-soluble micronutrients.',
    socraticHint: 'Why do cooks in Western Kenya simmer managu and mitoo in fresh cream or milk before serving?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u9-024',
    subStrandId: 'substrand-g6-agri-u9',
    lessonId: 'lesson-g6-agri-u9-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is passing down traditional indigenous recipes to Grade 6 learners important for cultural heritage and biodiversity conservation?',
    options: [
      'It keeps Kenyan cultural identities alive, preserves indigenous crop varieties from extinction, and promotes healthy living through diverse local diets',
      'It forces everyone to stop eating modern food completely',
      'It makes fast-food restaurants close down across the world',
      'It turns old recipes into gold medals'
    ],
    correctAnswer: 'It keeps Kenyan cultural identities alive, preserves indigenous crop varieties from extinction, and promotes healthy living through diverse local diets',
    explanation: 'Valuing traditional foodways encourages the continued farming of indigenous crops, safeguarding agricultural genetic biodiversity and cultural memory.',
    socraticHint: 'How does cooking traditional dishes preserve both cultural heritage and local seed biodiversity?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // --- UNIT 10: FOOD HYGIENE, KITCHEN SAFETY & TABLE ETIQUETTE (Questions 25 to 48) ---
  // Lesson 1: Kitchen Sanitation & Waste Disposal (001 - 012)
  {
    id: 'q-g6-agri-u10-001',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is food hygiene in domestic and school kitchens?',
    options: [
      'All conditions and measures necessary to ensure the safety and suitability of food at all stages from handling to eating',
      'Painting kitchen cupboards in bright colours',
      'Eating as fast as possible to avoid seeing germs',
      'Storing cooked food inside warm clothes'
    ],
    correctAnswer: 'All conditions and measures necessary to ensure the safety and suitability of food at all stages from handling to eating',
    explanation: 'Food hygiene encompasses all sanitary practices that prevent contamination, microbial proliferation, and food-borne illnesses.',
    socraticHint: 'What term describes all practices used to keep food clean, safe, and free from disease germs?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-002',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the correct sequence of the standard THREE-BASIN dishwashing method?',
    options: [
      'Basin 1: Wash in warm soapy water -> Basin 2: Rinse in clean warm water -> Basin 3: Sanitize in hot water / sanitizing solution',
      'Basin 1: Dry with cloth -> Basin 2: Apply dirt -> Basin 3: Rinse in muddy water',
      'Basin 1: Soak in oil -> Basin 2: Scrub with sand -> Basin 3: Leave on the floor',
      'Basin 1: Freeze -> Basin 2: Boil -> Basin 3: Paint with varnish'
    ],
    correctAnswer: 'Basin 1: Wash in warm soapy water -> Basin 2: Rinse in clean warm water -> Basin 3: Sanitize in hot water / sanitizing solution',
    explanation: 'The three-basin sink protocol washes away food grease (Basin 1), rinses off detergent foam (Basin 2), and thermal/chemically sanitizes plates (Basin 3).',
    socraticHint: 'Remember the 3 logical steps: Wash with soap, Rinse with clean water, Sanitize to kill germs.',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-003',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is air-drying washed plates on an elevated outdoor wooden dish rack (chaga) more hygienic than wiping them with a kitchen dish towel?',
    options: [
      'Kitchen cloths can harbor and transfer millions of bacteria between plates, while sunlight and fresh air naturally sanitize and dry plates cleanly',
      'Dish towels scratch plates and turn them into glass powder',
      'Sunlight makes plates turn into pure silver',
      'Outdoor dish racks make plates impossible for flies to see'
    ],
    correctAnswer: 'Kitchen cloths can harbor and transfer millions of bacteria between plates, while sunlight and fresh air naturally sanitize and dry plates cleanly',
    explanation: 'Damp dish cloths are prime breeding grounds for cross-contaminating bacteria; ultraviolet rays in tropical sunlight naturally sterilize air-drying crockery.',
    socraticHint: 'Why is drying in clean sun and air safer than rubbing every plate with a damp, dirty dish cloth?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-004',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What should a food handler in a school kitchen do before starting to prepare meals for learners?',
    options: [
      'Wash hands thoroughly with soap and clean running water, tie back hair, keep fingernails clean and short, and put on a clean apron',
      'Comb hair over the open soup pot',
      'Cough directly into the serving spoons to check temperature',
      'Touch farm manure without washing hands'
    ],
    correctAnswer: 'Wash hands thoroughly with soap and clean running water, tie back hair, keep fingernails clean and short, and put on a clean apron',
    explanation: 'Clean hands, covered hair, trimmed nails, and aprons prevent microbial, hair, and dirt contamination of food during preparation.',
    socraticHint: 'What hygienic personal steps must every cook take before touching food in the kitchen?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-005',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should cooked food NEVER be left uncovered on kitchen tables at room temperature for several hours?',
    options: [
      'Houseflies crawl on it transferring cholera and typhoid bacteria, and airborne microbes multiply rapidly in the warm temperature zone',
      'The food will evaporate into thin air within two hours',
      'Uncovered food turns into pure salt',
      'The plates will crack under atmospheric pressure'
    ],
    correctAnswer: 'Houseflies crawl on it transferring cholera and typhoid bacteria, and airborne microbes multiply rapidly in the warm temperature zone',
    explanation: 'Flies land on feces and transfer pathogenic germs to open food, and bacteria multiply exponentially between 20°C and 45°C.',
    socraticHint: 'What pests land on open food, and what happens to bacteria in warm uncovered stew?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-006',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How should perishable raw meat and fresh fish be stored in a home refrigerator to prevent cross-contamination?',
    options: [
      'Sealed in clean containers on the bottom shelf below ready-to-eat foods so raw juices cannot drip onto other foods',
      'Placed uncovered on the very top shelf directly over fresh fruit',
      'Wrapped in dirty newspaper on the open floor',
      'Left hanging outside near the window in the sun'
    ],
    correctAnswer: 'Sealed in clean containers on the bottom shelf below ready-to-eat foods so raw juices cannot drip onto other foods',
    explanation: 'Storing raw meats on the bottom shelf prevents blood and liquid drips containing Salmonella or Campylobacter from contaminating cooked food below.',
    socraticHint: 'Why should raw meats always be kept on the bottom shelf of a fridge rather than above cooked foods?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-007',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What should be done with biodegradable organic kitchen refuse (potato peels, banana rinds, onion skins, leftover vegetable leaves)?',
    options: [
      'Separated into a compost bin to decompose into rich organic fertilizer for the home vegetable garden',
      'Burned in an open fire to produce black toxic smoke',
      'Dumped into the village drinking water river',
      'Flushed down the indoor toilet to block the pipes'
    ],
    correctAnswer: 'Separated into a compost bin to decompose into rich organic fertilizer for the home vegetable garden',
    explanation: 'Composting vegetable trimmings recycles biomass into nutrient-rich compost, preventing smelly garbage piles and nourishing garden soils.',
    socraticHint: 'How does throwing vegetable peels into a compost pit turn kitchen waste into free garden manure?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-008',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should a kitchen trash bin always be fitted with a tight-fitting lid and emptied daily?',
    options: [
      'To prevent foul rotting odors, keep flies and cockroaches from breeding, and stop rats from scavenging',
      'To make the kitchen look like a hospital room',
      'To keep the trash bin from blowing away in gentle breeze',
      'To allow trash to turn into cooking gas overnight'
    ],
    correctAnswer: 'To prevent foul rotting odors, keep flies and cockroaches from breeding, and stop rats from scavenging',
    explanation: 'Covered bins prevent disease vectors (flies, rodents, roaches) from accessing waste and multiplying inside living areas.',
    socraticHint: 'What happens if a kitchen garbage bin is left open without a lid for three days?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-009',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is cross-contamination in food preparation?',
    options: [
      'The transfer of harmful bacteria or microbes from raw contaminated foods (or dirty surfaces) to ready-to-eat cooked foods',
      'Cooking two different vegetables in the same pot',
      'Eating food while wearing school uniform',
      'Drinking tea from a glass mug instead of a plastic cup'
    ],
    correctAnswer: 'The transfer of harmful bacteria or microbes from raw contaminated foods (or dirty surfaces) to ready-to-eat cooked foods',
    explanation: 'Cross-contamination occurs when bacteria from raw poultry or meat spread to salads, cutting boards, knives, or ready meals.',
    socraticHint: 'What happens if you use the exact same unwashed knife to chop raw chicken and then cut fresh bread?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-010',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can cutting boards and knives be sanitized in a school kitchen after cutting raw meat?',
    options: [
      'Scrubbing thoroughly with hot water and soap, followed by sanitizing with boiling water or diluted food-safe bleach solution',
      'Wiping with a dry finger and putting in the drawer',
      'Rinsing with cold tea',
      'Burying in the sand for 10 minutes'
    ],
    correctAnswer: 'Scrubbing thoroughly with hot water and soap, followed by sanitizing with boiling water or diluted food-safe bleach solution',
    explanation: 'Hot detergent water lifts meat fats, and sanitizing heat or food-safe disinfectant destroys remaining pathogenic microbes.',
    socraticHint: 'How do you completely remove grease and bacteria from a cutting board used for raw meat?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-011',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should cooked leftover food be reheated thoroughly until piping hot (steaming throughout) before serving?',
    options: [
      'Piping hot heat (above 75°C) kills bacteria that may have multiplied during room temperature storage',
      'Hot food turns back into raw ingredients',
      'To make the food change colour completely',
      'Because cold food has no carbohydrates'
    ],
    correctAnswer: 'Piping hot heat (above 75°C) kills bacteria that may have multiplied during room temperature storage',
    explanation: 'Thorough reheating above 75°C destroys vegetative bacteria that may have contaminated or grown in stored leftovers.',
    socraticHint: 'Why must leftover stews be brought to a rolling, steaming boil before eating the next day?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-012',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the role of sunlight ultraviolet (UV) radiation when drying washed utensils on a raised dish rack?',
    options: [
      'UV radiation acts as a natural germicide that kills bacteria and moulds on drying plates and spoons',
      'UV radiation paints plates with glossy enamel',
      'UV radiation turns metal spoons into plastic',
      'UV radiation increases the size of coffee cups'
    ],
    correctAnswer: 'UV radiation acts as a natural germicide that kills bacteria and moulds on drying plates and spoons',
    explanation: 'Solar UV radiation damages microbial DNA, acting as a natural, chemical-free disinfectant on outdoor drying racks.',
    socraticHint: 'What natural germ-killing power does African sunshine provide to plates drying on an outdoor rack?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Kitchen Safety & Table Etiquette (013 - 024)
  {
    id: 'q-g6-agri-u10-013',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should saucepan and frying pan handles always be turned INWARD toward the back or side of the stove when cooking?',
    options: [
      'To prevent people or children from accidentally bumping into handles and knocking hot pots over, causing severe scalds',
      'To make the stove look tidy for visitors',
      'To keep handles cold so they never get hot',
      'To stop the pot from boiling too quickly'
    ],
    correctAnswer: 'To prevent people or children from accidentally bumping into handles and knocking hot pots over, causing severe scalds',
    explanation: 'Outward-pointing handles are easily caught by passing hips or curious toddlers, leading to devastating scalding burns from boiling liquids.',
    socraticHint: 'What happens if a hot pan handle sticks outward into the walkway of a busy kitchen?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-014',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What dangerous mistake should NEVER be made when cooking oil catches fire in a frying pan?',
    options: [
      'NEVER pour water onto burning oil (water sinks and instantly vaporizes into an explosive flaming grease fireball)',
      'Never put a metal pot lid over the pan',
      'Never turn off the gas cylinder regulator',
      'Never sound the kitchen alarm'
    ],
    correctAnswer: 'NEVER pour water onto burning oil (water sinks and instantly vaporizes into an explosive flaming grease fireball)',
    explanation: 'Water sinks beneath hot oil and vaporizes instantaneously into steam, violently projecting aerosolized burning grease across the room.',
    socraticHint: 'What catastrophic explosion happens if you pour a cup of water into a pan of flaming cooking oil?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-015',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How should a cook safely extinguish a cooking oil pan fire in the kitchen?',
    options: [
      'Turn off the heat source immediately and slide a metal pot lid or damp cloth over the pan to smother the flames by cutting off oxygen',
      'Fan the flames vigorously with a cardboard box',
      'Throw dry flour into the burning oil',
      'Blow breath into the pan as hard as possible'
    ],
    correctAnswer: 'Turn off the heat source immediately and slide a metal pot lid or damp cloth over the pan to smother the flames by cutting off oxygen',
    explanation: 'Smothering with a lid or damp towel deprives the fire of oxygen, extinguishing it safely without spreading flaming oil.',
    socraticHint: 'How does sliding a metal lid over a flaming pan starve the fire of oxygen and put it out safely?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-016',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the "claw grip" (bear claw) technique used when cutting vegetables with a sharp kitchen knife?',
    options: [
      'Curling fingertips inward like a claw against the food, using the flat of the knife blade against knuckles to guide cuts safely away from fingertips',
      'Holding the vegetable with open, flat outstretched fingers',
      'Cutting toward your own chest with two hands',
      'Closing your eyes while chopping as fast as possible'
    ],
    correctAnswer: 'Curling fingertips inward like a claw against the food, using the flat of the knife blade against knuckles to guide cuts safely away from fingertips',
    explanation: 'Tucking fingertips inward protects nails and tips from the blade edge, allowing knuckles to guide the knife safely without accidental cuts.',
    socraticHint: 'Why do chefs curl their fingertips inward like a claw when holding vegetables on a chopping board?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-017',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the immediate, medically approved first aid action for a minor heat burn or scald in the kitchen?',
    options: [
      'Hold the burn under cool, clean running tap water for at least 10 to 15 minutes to cool the skin tissues',
      'Apply thick raw butter or margarine over the burn',
      'Smear raw chicken eggs or cooking flour onto the wound',
      'Rub salt and chili powder into the burned area'
    ],
    correctAnswer: 'Hold the burn under cool, clean running tap water for at least 10 to 15 minutes to cool the skin tissues',
    explanation: 'Cool running water dissipates retained heat from dermis layers, halts deeper tissue damage, and numbs nerve endings without risking infection.',
    socraticHint: 'What clear fluid from the tap should you run over a burn immediately for 15 minutes to cool the skin?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-018',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should home remedies like butter, cooking fat, or toothpaste NEVER be smeared onto a fresh burn?',
    options: [
      'They trap heat inside the deeper skin layers, worsen tissue destruction, and introduce bacteria that cause severe infections',
      'They make the burn smell too sweet',
      'They make skin turn completely transparent',
      'They cause bones to break immediately'
    ],
    correctAnswer: 'They trap heat inside the deeper skin layers, worsen tissue destruction, and introduce bacteria that cause severe infections',
    explanation: 'Oils and paste form an insulating seal that traps thermal energy in injured tissues, increasing burn depth and promoting microbial contamination.',
    socraticHint: 'Why does coating a burn with greasy butter or toothpaste trap heat inside the skin and cause infection?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-019',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should liquid spills (cooking oil, water, soup) on kitchen floors be wiped dry immediately?',
    options: [
      'To prevent dangerous slip-and-fall accidents that can cause fractures, head injuries, or collision with hot stoves',
      'To prevent the floor from melting into mud',
      'To stop kitchen tiles from changing colour',
      'Because water makes floor tiles grow taller'
    ],
    correctAnswer: 'To prevent dangerous slip-and-fall accidents that can cause fractures, head injuries, or collision with hot stoves',
    explanation: 'Slippery kitchen floors are a leading cause of domestic injuries; slipping while carrying hot pots or sharp utensils can be fatal.',
    socraticHint: 'What happens if someone carrying hot soup steps onto a puddle of cooking oil on the kitchen floor?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-020',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is the universally respected cultural and hygienic practice observed in Kenyan homes before sitting down to share a meal?',
    options: [
      'Washing hands cleanly with soap and water (often using a hand-washing basin and jug brought to each diner)',
      'Climbing onto the roof to shout your name',
      'Spraying perfume onto the cooked food',
      'Running around the dining table three times'
    ],
    correctAnswer: 'Washing hands cleanly with soap and water (often using a hand-washing basin and jug brought to each diner)',
    explanation: 'Hand washing before meals is both a vital hygienic barrier against pathogens and an essential cultural mark of hospitality and respect.',
    socraticHint: 'What do diners in Kenyan families always do with soap and water before sitting down to eat?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-021',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following demonstrates GOOD table manners during a family dinner?',
    options: [
      'Chewing food quietly with the mouth closed and asking politely for dishes to be passed ("Please pass the water")',
      'Talking loudly while chewing with your mouth wide open and spitting food crumbs',
      'Stretching across other people\'s plates to grab food with your bare hands',
      'Playing video games on a mobile phone with loud speaker volume at the table'
    ],
    correctAnswer: 'Chewing food quietly with the mouth closed and asking politely for dishes to be passed ("Please pass the water")',
    explanation: 'Chewing with a closed mouth, speaking courteously, and avoiding intrusive reaching demonstrate respect, cleanliness, and dining etiquette.',
    socraticHint: 'Select the respectful, pleasant behavior that shows good table manners at dinner.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-022',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should diners avoid talking while their mouth is full of food?',
    options: [
      'It prevents choking (food entering the trachea / airway) and prevents spraying unpleasant food particles across the table',
      'It makes food lose its taste immediately',
      'It stops the jaw bones from moving',
      'It causes teeth to turn yellow within seconds'
    ],
    correctAnswer: 'It prevents choking (food entering the trachea / airway) and prevents spraying unpleasant food particles across the table',
    explanation: 'Talking while chewing opens the epiglottis, creating a dangerous choking risk, while also spraying unhygienic masticated food fragments.',
    socraticHint: 'What dangerous respiratory emergency (choking) can happen when talking with a mouth full of food?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-023',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How should a courteous learner conclude their meal at the dining table?',
    options: [
      'Thank the person who prepared the meal ("Asante kwa chakula"), clear their plate, and wash their hands cleanly',
      'Belch loudly in someone\'s face and walk away leaving dirty plates on the chair',
      'Throw remaining food on the dining room floor',
      'Wipe greasy hands on the curtains'
    ],
    correctAnswer: 'Thank the person who prepared the meal ("Asante kwa chakula"), clear their plate, and wash their hands cleanly',
    explanation: 'Expressing sincere gratitude to the cook, assisting in clearing plates, and washing hands cleanly demonstrate mature, considerate citizenship.',
    socraticHint: 'How do polite children express appreciation to parents or cooks after finishing a meal?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u10-024',
    subStrandId: 'substrand-g6-agri-u10',
    lessonId: 'lesson-g6-agri-u10-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why does adhering to kitchen hygiene and table etiquette strengthen family harmony and health in Kenyan communities?',
    options: [
      'It prevents preventable food poisoning and kitchen accidents while nurturing mutual respect, gratitude, and dignity during shared family meals',
      'It makes food cook in 2 seconds without heat',
      'It turns kitchen plates into expensive china',
      'It makes family members never need to sleep'
    ],
    correctAnswer: 'It prevents preventable food poisoning and kitchen accidents while nurturing mutual respect, gratitude, and dignity during shared family meals',
    explanation: 'Sanitation protects family members from sickness, safe practices prevent trauma, and respectful table manners foster warmth and unity.',
    socraticHint: 'How do cleanliness, safety, and courtesy create a healthy, joyful, and united family dinner experience?',
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

console.log('Batch 5 of Grade 6 Agriculture & Nutrition successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
