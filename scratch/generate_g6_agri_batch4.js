/**
 * Grade 6 Agriculture & Nutrition - Batch 4 Generator
 * Covers Units 7 & 8:
 * - Unit 7: Animal Parasites & Health Management (strand-g6-agri-animal-production)
 * - Unit 8: Meal Planning & Food Budgeting in the Kenyan Home (strand-g6-agri-nutrition-hygiene)
 * Missions: Orders 53, 54, 55, 56 (world-green-farm)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Agriculture & Nutrition Batch 4 (Units 7 & 8) ---');

// 1. Sub-strands for Units 7 & 8
const newSubStrands = [
  {
    id: 'substrand-g6-agri-u7',
    strandId: 'strand-g6-agri-animal-production',
    name: 'Animal Parasites & Livestock Health Management',
    description: 'Identify external parasites (ticks, fleas, lice, mites) and internal parasites (roundworms, tapeworms, liver flukes, coccidia), their effects on livestock, and implement routine control and deworming measures.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Distinguish between external parasites (ectoparasites) and internal parasites (endoparasites) in livestock',
      'Describe symptoms, damage, and disease transmission caused by common animal parasites',
      'Execute preventive control measures including dusting, dipping, pasture management, and routine deworming'
    ]
  },
  {
    id: 'substrand-g6-agri-u8',
    strandId: 'strand-g6-agri-nutrition-hygiene',
    name: 'Meal Planning & Household Food Budgeting',
    description: 'Plan well-balanced daily meals catering to various family members using the three core food groups, and apply practical food budgeting skills to shop economically and minimize food waste.',
    grade: 'G6',
    learningAreaId: 'la-agri-g6',
    competencies: [
      'Plan balanced meals combining energy-giving, bodybuilding, and protective foods for different family age groups',
      'Create realistic weekly household food budgets based on seasonal availability and market price comparison',
      'Demonstrate smart shopping practices and post-market storage to eliminate household food waste'
    ]
  }
];

// 2. Lessons for Units 7 & 8
const newLessons = [
  // Unit 7 Lessons
  {
    id: 'lesson-g6-agri-u7-l1',
    subStrandId: 'substrand-g6-agri-u7',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'External Parasites: Ticks, Fleas, Lice and Mites',
    summary: 'Identify common ectoparasites infesting cattle, goats, chickens, and rabbits, and learn chemical and non-chemical control methods.',
    content: 'External parasites (ectoparasites) live on the skin, feathers, or hair of livestock, feeding on blood, lymph, or skin flakes. Major ectoparasites in Kenya include: Ticks (eight-legged arachnids that suck blood and transmit deadly diseases like East Coast Fever, Anaplasmosis, and Redwater), Fleas (jumping wingless insects that cause severe itching and anemia in poultry and dogs), Lice (flattened insects infesting cattle and chickens, causing constant irritation, feather loss, and reduced egg yield), and Mites (microscopic parasites causing scabby skin conditions known as mange in goats and ear canker in rabbits, as well as scaly leg in poultry). Ectoparasites cause blood loss, skin lesions that invite secondary infections, weight loss, and reduced milk/egg yields. Control measures include: hand-picking on small herds, plunge dipping in community cattle dips, spraying with approved acaricides, dusting poultry nests with insecticidal powder, and maintaining clean, well-lit livestock sheds.',
    keyConcepts: ['Ectoparasites', 'Ticks & Tick-borne Diseases (ECF)', 'Fleas & Lice', 'Mites & Mange', 'Plunge Dips & Acaricide Spraying'],
    kenyanContext: 'In livestock grazing areas like Kajiado and Narok, pastoralist communities bring their cattle to communal plunge dips weekly to control blue ticks and prevent deadly East Coast Fever.',
    didYouKnow: 'A single engorged female tick can suck up to 2 millilitres of blood and lay over 10,000 eggs before dying!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u7-l2',
    subStrandId: 'substrand-g6-agri-u7',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Internal Parasites: Roundworms, Tapeworms & Deworming',
    summary: 'Explore endoparasites that inhabit the digestive, respiratory, and liver tissues of domestic animals, and master strategic deworming and sanitation.',
    content: 'Internal parasites (endoparasites) live inside the bodies of host animals, absorbing digested nutrients, damaging organs, and draining vitality. Common endoparasites include: Roundworms (nematodes like Ascaris in pigs and Haemonchus contortus in sheep/goats that suck blood and block intestines), Tapeworms (segmented flatworms with suckers and hooks that absorb food through their body walls in cattle and sheep), Liver flukes (leaf-shaped flatworms inhabiting bile ducts of cattle and sheep in swampy areas, transmitted via water snails), and Coccidia (protozoans causing bloody diarrhoea in chicks and calves). Animals infested with internal parasites exhibit rough staring coats, potbellies, persistent diarrhoea, anaemia, coughing, and stunted growth. Control requires: strategic deworming with veterinary anthelmintics (oral drenches), rotational grazing to break worm egg life cycles, avoiding grazing animals in waterlogged swamps with liver fluke snails, and keeping feeding troughs elevated away from manure.',
    keyConcepts: ['Endoparasites', 'Roundworms & Hookworms', 'Tapeworms & Intermediate Hosts', 'Liver Flukes & Freshwater Snails', 'Deworming (Drenching)', 'Rotational Grazing'],
    kenyanContext: 'Sheep farmers in Nyandarua and Meru deworm their sheep at the beginning and end of rainy seasons to prevent heavy roundworm infestations that cause bottle jaw and death.',
    didYouKnow: 'Some tapeworms living inside the digestive tract of cattle can grow up to 10 metres long!',
    estimatedMinutes: 20
  },

  // Unit 8 Lessons
  {
    id: 'lesson-g6-agri-u8-l1',
    subStrandId: 'substrand-g6-agri-u8',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Planning Balanced Family Meals Across Life Stages',
    summary: 'Master the art of combining energy, bodybuilding, and protective foods into appetizing, balanced meals tailored for toddlers, teens, and adults.',
    content: 'A balanced diet provides all essential nutrients in the correct proportions required by the body for energy, growth, cell repair, and disease protection. Foods are classified into three core functional groups: 1. Energy-giving foods (carbohydrates and fats like ugali, cassava, sweet potatoes, rice, cooking oil), 2. Bodybuilding foods (proteins like beans, omena, eggs, milk, beef, peas), and 3. Protective foods (vitamins and minerals like managu, terere, oranges, ripe bananas, pawpaws, tomatoes, carrots) along with clean water and roughage. When planning family meals, nutritional requirements vary by age and activity: Growing children and adolescents require extra protein and calcium for rapid bone and muscle development; Hard-working manual farm labourers need larger portions of energy foods; Expectant and nursing mothers need extra iron, calcium, and protein; and the elderly need light, easily digestible, nutrient-dense meals low in excess salt and fats.',
    keyConcepts: ['The Three Food Groups (Energy, Bodybuilding, Protective)', 'Age-specific Dietary Needs', 'Nutritional Diversity', 'Hydration and Dietary Fibre'],
    kenyanContext: 'A traditional Kenyan meal of hot brown ugali (sorghum-millet-maize flour), stewed omena with tomatoes, and sautéed terere represents an exceptional, budget-friendly, well-balanced meal.',
    didYouKnow: 'Brown ugali made from whole grain millet and sorghum contains five times more minerals and dietary fibre than refined white sifted maize flour!',
    estimatedMinutes: 20
  },
  {
    id: 'lesson-g6-agri-u8-l2',
    subStrandId: 'substrand-g6-agri-u8',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    title: 'Smart Household Food Budgeting & Market Economics',
    summary: 'Learn practical food budgeting strategies: seasonal purchasing, price comparison, bulk buying, and minimizing food waste in the home.',
    content: 'Food budgeting is the process of planning how much money a household allocates to food purchases over a given period, ensuring maximum nutrition without overspending. Key principles of smart food budgeting include: 1. Making a detailed shopping list based on a planned weekly menu before heading to the market, 2. Buying fresh foods in season (when abundant, fresh, and cheap, e.g. buying mangoes in December/January and maize immediately after harvest), 3. Comparing unit prices between open-air wholesale markets (e.g. Marikiti / Wakulima) and local kiosks, 4. Buying non-perishable staples (maize, dry beans, rice, cooking oil) in bulk to secure lower wholesale prices, and 5. Minimizing kitchen food waste by properly storing perishables, cooking appropriate portions, and repurposing leftovers into wholesome dishes like fried githeri. Smart budgeting allows Kenyan families to eat nutritious, varied meals while saving money.',
    keyConcepts: ['Household Food Budget', 'Shopping Lists', 'In-season Purchasing', 'Bulk Wholesale vs Retail Buying', 'Eliminating Food Waste'],
    kenyanContext: 'Smart shoppers at Wakulima Market in Nairobi and Kongowea Market in Mombasa buy sacks of potatoes and dry beans directly from truck wholesalers at half the price charged in suburban kiosks.',
    didYouKnow: 'Globally, almost one-third of all food produced for human consumption is lost or wasted—budgeting and proper storage can save a family thousands of shillings every month!',
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 7 & 8
const newMissions = [
  // Unit 7 Missions
  {
    id: 'mission-g6-agri-u7-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Ectoparasite Eliminators: Ticks, Fleas & Mites',
    description: 'Join Livestock Officer Morintat at the community cattle dip to inspect tick infestation zones, calibrate acaricide plunge dips, and dust poultry coops.',
    objectives: [
      'Identify external livestock parasites (ticks, lice, fleas, mites)',
      'Explain the transmission and symptoms of tick-borne diseases like East Coast Fever',
      'Demonstrate safe application of plunge dips, sprays, and dusting powders'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Parasite Hunter',
    badge: 'Parasite Hunter',
    questionIds: [
      'q-g6-agri-u7-001', 'q-g6-agri-u7-002', 'q-g6-agri-u7-003', 'q-g6-agri-u7-004',
      'q-g6-agri-u7-005', 'q-g6-agri-u7-006', 'q-g6-agri-u7-007', 'q-g6-agri-u7-008',
      'q-g6-agri-u7-009', 'q-g6-agri-u7-010', 'q-g6-agri-u7-011', 'q-g6-agri-u7-012'
    ]
  },
  {
    id: 'mission-g6-agri-u7-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Endoparasite Experts: Worms & Deworming',
    description: 'Diagnose roundworm and liver fluke symptoms with Veterinary Assistant Muthoni and execute strategic drenching and rotational grazing schedules.',
    objectives: [
      'Identify symptoms of internal worm infestations (bottle jaw, anaemia, potbelly)',
      'Explain the life cycles and intermediate hosts of tapeworms and liver flukes',
      'Administer veterinary deworming drenches and implement pasture rotation'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Herd Health Specialist',
    badge: 'Herd Health Specialist',
    questionIds: [
      'q-g6-agri-u7-013', 'q-g6-agri-u7-014', 'q-g6-agri-u7-015', 'q-g6-agri-u7-016',
      'q-g6-agri-u7-017', 'q-g6-agri-u7-018', 'q-g6-agri-u7-019', 'q-g6-agri-u7-020',
      'q-g6-agri-u7-021', 'q-g6-agri-u7-022', 'q-g6-agri-u7-023', 'q-g6-agri-u7-024'
    ]
  },

  // Unit 8 Missions
  {
    id: 'mission-g6-agri-u8-m1',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Nutritional Architects: Balanced Family Meal Planning',
    description: 'Collaborate with Nutritionist Njambi to formulate nutrient-balanced breakfast, lunch, and dinner menus tailored to growing children, teens, and elders.',
    objectives: [
      'Categorize local Kenyan foods into the 3 functional food groups',
      'Design balanced daily meal plans tailored to distinct family life stages',
      'Incorporate traditional nutrient-dense staples like brown ugali, omena, and indigenous greens'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Master of Nutrition',
    badge: 'Master of Nutrition',
    questionIds: [
      'q-g6-agri-u8-001', 'q-g6-agri-u8-002', 'q-g6-agri-u8-003', 'q-g6-agri-u8-004',
      'q-g6-agri-u8-005', 'q-g6-agri-u8-006', 'q-g6-agri-u8-007', 'q-g6-agri-u8-008',
      'q-g6-agri-u8-009', 'q-g6-agri-u8-010', 'q-g6-agri-u8-011', 'q-g6-agri-u8-012'
    ]
  },
  {
    id: 'mission-g6-agri-u8-m2',
    worldId: 'world-green-farm',
    learningAreaId: 'la-agri-g6',
    title: 'Budget Savvy Shoppers: Market Economics & Waste Prevention',
    description: 'Navigate open-air wholesale markets with Mama Mboga to draft seasonal shopping lists, compare bulk prices, and preserve kitchen ingredients.',
    objectives: [
      'Draft a prioritized household weekly food shopping budget',
      'Leverage seasonal price fluctuations and bulk buying of dry staples to save money',
      'Implement practical food preservation and portion control to eliminate household food waste'
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: 'Smart Shopper',
    badge: 'Smart Shopper',
    questionIds: [
      'q-g6-agri-u8-013', 'q-g6-agri-u8-014', 'q-g6-agri-u8-015', 'q-g6-agri-u8-016',
      'q-g6-agri-u8-017', 'q-g6-agri-u8-018', 'q-g6-agri-u8-019', 'q-g6-agri-u8-020',
      'q-g6-agri-u8-021', 'q-g6-agri-u8-022', 'q-g6-agri-u8-023', 'q-g6-agri-u8-024'
    ]
  }
];

// 4. Questions for Units 7 & 8
const newQuestions = [
  // --- UNIT 7: ANIMAL PARASITES & HEALTH MANAGEMENT (Questions 1 to 24) ---
  // Lesson 1: External Parasites (001 - 012)
  {
    id: 'q-g6-agri-u7-001',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is an external parasite (ectoparasite) in livestock production?',
    options: [
      'A parasite that lives on the outer surface (skin, hair, feathers) of a host animal, feeding on blood, lymph, or skin',
      'A parasite that lives exclusively inside the animal\'s stomach or intestines',
      'An animal that eats grass alongside cows in the pasture',
      'A virus that lives inside plant leaves'
    ],
    correctAnswer: 'A parasite that lives on the outer surface (skin, hair, feathers) of a host animal, feeding on blood, lymph, or skin',
    explanation: 'Ectoparasites inhabit the exterior body surface of host animals, attaching to skin, ears, or feathers to feed on body fluids.',
    socraticHint: 'Recall that "ecto" means outside: where on an animal do ticks, lice, and fleas attach?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-002',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following lists contains ONLY external parasites (ectoparasites) of livestock?',
    options: [
      'Ticks, fleas, lice, and mites',
      'Roundworms, tapeworms, liver flukes, and hookworms',
      'Earthworms, caterpillars, bees, and butterflies',
      'Locusts, crickets, termites, and snails'
    ],
    correctAnswer: 'Ticks, fleas, lice, and mites',
    explanation: 'Ticks, fleas, lice, and mites are all blood-sucking or skin-burrowing external parasites that live on the outer surface of livestock.',
    socraticHint: 'Select the group containing only skin-crawling pests found on the outside of animal coats.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-003',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why are ticks considered the most economically destructive external parasites of cattle in Kenya?',
    options: [
      'They transmit fatal protozoan diseases like East Coast Fever (ECF), Anaplasmosis, and Redwater, alongside causing severe anemia',
      'They eat through cattle horns and make hooves fall off',
      'They cause cattle to produce sour milk inside the udder',
      'They bite farm workers and turn them into cows'
    ],
    correctAnswer: 'They transmit fatal protozoan diseases like East Coast Fever (ECF), Anaplasmosis, and Redwater, alongside causing severe anemia',
    explanation: 'Ticks act as vectors for lethal tick-borne diseases—most notably East Coast Fever (Theileriosis)—which cause devastating cattle fatalities in Kenya.',
    socraticHint: 'What deadly protozoan livestock diseases do ticks transmit through their saliva when biting cattle?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-004',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which specific tick species transmits the deadly East Coast Fever (Theileria parva) to cattle in Kenya?',
    options: [
      'Brown ear tick (Rhipicephalus appendiculatus)',
      'Blue tick (Boophilus decoloratus)',
      'Bont tick (Amblyomma variegatum)',
      'Dog tick (Rhipicephalus sanguineus)'
    ],
    correctAnswer: 'Brown ear tick (Rhipicephalus appendiculatus)',
    explanation: 'The brown ear tick attaches inside and around the ears and tail base of cattle, transmitting Theileria parva, the pathogen of East Coast Fever.',
    socraticHint: 'Which tick species clusters inside and around the ears of cows and transmits East Coast Fever?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-005',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a plunge dip in livestock tick control?',
    options: [
      'A deep concrete trench filled with water and chemical acaricide through which cattle are made to swim to completely immerse their bodies',
      'A deep well where cows drink cold water',
      'A pit where dead cows are buried',
      'A mud pool where cows cool themselves in hot weather'
    ],
    correctAnswer: 'A deep concrete trench filled with water and chemical acaricide through which cattle are made to swim to completely immerse their bodies',
    explanation: 'A plunge dip ensures total body immersion in an acaricide wash, killing all attached ticks across the animal\'s skin, ears, and underbelly.',
    socraticHint: 'What deep concrete bath do cattle jump into and swim through to kill ticks on community farms?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-006',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What chemical substance is diluted in water and used to kill ticks, fleas, and mites on livestock?',
    options: [
      'Acaricide',
      'Herbicide',
      'Fungicide',
      'Fertilizer'
    ],
    correctAnswer: 'Acaricide',
    explanation: 'Acaricides (or tickicides) are specific pesticides formulated to kill ticks and mites on domestic animals.',
    socraticHint: 'What specific chemical name refers to pesticides that kill ticks and mites?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-007',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What symptom is typically caused by severe lice (chawa) infestation in laying poultry?',
    options: [
      'Constant scratching, restlessness, loss of feathers, anaemia, and a sharp drop in egg production',
      'Immediate growth of thick goat horns on the head',
      'Laying square blue eggs',
      'Chicks turning into adult turkeys overnight'
    ],
    correctAnswer: 'Constant scratching, restlessness, loss of feathers, anaemia, and a sharp drop in egg production',
    explanation: 'Lice bite the skin and feed on feather shafts, causing intense irritation, sleeplessness, stress, blood loss, and plummeted egg yields.',
    socraticHint: 'How does severe itching and feather-pecking affect a hen\'s comfort and egg laying?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-008',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What skin condition in rabbits and goats is caused by burrowing parasitic mites (utitiri)?',
    options: [
      'Mange (causing intense itching, loss of hair/fur, and thick crusty skin scabs)',
      'Rickets',
      'Kwashiorkor',
      'Mastitis'
    ],
    correctAnswer: 'Mange (causing intense itching, loss of hair/fur, and thick crusty skin scabs)',
    explanation: 'Mange mites burrow beneath the skin epidermis, producing severe dermatitis, hair loss, and scaly, crusty lesions.',
    socraticHint: 'What scabby, crusty skin condition caused by burrowing mites makes animals scratch constantly?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-009',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which non-chemical tick control practice is suitable for a smallholder farmer who owns only one or two dairy cows in Kericho?',
    options: [
      'Hand-picking ticks daily and dropping them into a tin of kerosene or burning them',
      'Throwing the cow into a muddy swamp',
      'Building a huge multi-million shilling commercial plunge dip for one cow',
      'Cutting off the cow\'s ears'
    ],
    correctAnswer: 'Hand-picking ticks daily and dropping them into a tin of kerosene or burning them',
    explanation: 'For 1–2 zero-grazed cattle, daily manual hand-picking from tick attachment sites (ears, tail-switch, udder) is practical and zero-cost.',
    socraticHint: 'What manual method can a farmer with just one zero-grazed cow use every morning to remove ticks?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-010',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What natural dust bath can be provided in an outdoor poultry run to help chickens control lice and mites naturally?',
    options: [
      'A dry shallow pit filled with dry fine sand, wood ash, and sulfur powder',
      'A basin of cold muddy water',
      'A pile of wet fresh cow dung',
      'A heap of broken bottle glass'
    ],
    correctAnswer: 'A dry shallow pit filled with dry fine sand, wood ash, and sulfur powder',
    explanation: 'Chickens instinctively take dust baths; fine ash and sand coat parasite bodies, blocking their spiracles (breathing pores) and suffocating them.',
    socraticHint: 'What dry powdery mixture of ash and sand do chickens fluff through their feathers to smother lice?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-011',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is "hand spraying" using a knapsack sprayer in livestock parasite control?',
    options: [
      'Spraying diluted acaricide wash onto cattle using a knapsack sprayer, taking special care to spray inside ears, under the tail, and between the legs',
      'Spraying clean water on the roof of the barn',
      'Spraying cows with chemical weedkillers',
      'Spraying paint on the cow to mark ownership'
    ],
    correctAnswer: 'Spraying diluted acaricide wash onto cattle using a knapsack sprayer, taking special care to spray inside ears, under the tail, and between the legs',
    explanation: 'Knapsack spraying is effective for small herds when cattle dips are distant; thorough application to hidden predilection sites ensures high kill rates.',
    socraticHint: 'How does a farmer with a backpack knapsack sprayer apply tick medicine to a zero-grazed dairy cow?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-012',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should acaricide chemicals used in cattle dips be alternated periodically (e.g. changing between organophosphates and synthetic pyrethroids)?',
    options: [
      'To prevent ticks from developing genetic chemical resistance to a single acaricide type over time',
      'Because acaricides turn into pure water after two months',
      'To make cattle change their coat colour',
      'Because dips only work on sunny days'
    ],
    correctAnswer: 'To prevent ticks from developing genetic chemical resistance to a single acaricide type over time',
    explanation: 'Repeated continuous use of one acaricide selects for resistant ticks; rotating chemical classes prevents the development of resistant tick populations.',
    socraticHint: 'What happens if you use the exact same tick chemical year after year without change?',
    points: 10,
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Internal Parasites & Deworming (013 - 024)
  {
    id: 'q-g6-agri-u7-013',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are internal parasites (endoparasites) of livestock?',
    options: [
      'Parasites that live inside the organs and tissues of the host animal (such as the gut, lungs, liver, or blood)',
      'Parasites that crawl only on the hair and horns of the animal',
      'Predatory birds that hunt baby chicks in the yard',
      'Weeds that grow outside the cattle pen'
    ],
    correctAnswer: 'Parasites that live inside the organs and tissues of the host animal (such as the gut, lungs, liver, or blood)',
    explanation: 'Endoparasites live within the internal organs of their host, absorbing digested food, sucking blood, and disrupting vital organ function.',
    socraticHint: 'Recall that "endo" means inside: where inside an animal\'s body do roundworms and tapeworms live?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-014',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following is a common symptom of a severe internal worm infestation in sheep and calves?',
    options: [
      'Swelling under the jaw ("bottle jaw"), rough staring coat, potbelly, and persistent watery diarrhoea',
      'Excessive fatness and rapid weight gain',
      'Horns falling off within one hour',
      'Developing blue feathers on the tail'
    ],
    correctAnswer: 'Swelling under the jaw ("bottle jaw"), rough staring coat, potbelly, and persistent watery diarrhoea',
    explanation: 'Internal blood-sucking worms cause hypoproteinemia (fluid accumulation under the jaw called "bottle jaw"), along with unthriftiness, wasting, and diarrhea.',
    socraticHint: 'What watery swelling under the lower jaw (bottle jaw) and unthrifty coat signify heavy worm burdens in sheep?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-015',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What type of internal parasite is Haemonchus contortus (the barber\'s pole worm), which causes severe anaemia and death in sheep and goats?',
    options: [
      'A blood-sucking stomach roundworm (nematode)',
      'A segmented flat tapeworm',
      'An external tick',
      'A flying insect'
    ],
    correctAnswer: 'A blood-sucking stomach roundworm (nematode)',
    explanation: 'Haemonchus contortus resides in the abomasum (stomach) of sheep and goats, voraciously sucking blood and causing fatal anaemia if not dewormed.',
    socraticHint: 'What cylindrical, thread-like stomach worm feeds heavily on sheep blood?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-016',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does a grazing cow or goat become infected with roundworm larvae in a pasture in Nyandarua?',
    options: [
      'By ingesting microscopic worm larvae attached to morning dew droplets on grass blades',
      'By breathing air blown from mountain peaks',
      'By looking at another sick cow from across the fence',
      'By drinking warm boiled milk'
    ],
    correctAnswer: 'By ingesting microscopic worm larvae attached to morning dew droplets on grass blades',
    explanation: 'Worm eggs hatch in fecal pats, and infective L3 larvae crawl up dew-covered grass stems, where grazing animals swallow them with forage.',
    socraticHint: 'How do microscopic worm larvae get from manure onto wet morning grass blades where cows eat them?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-017',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which internal flatworm possesses segmented body ribbons and attaches to the animal\'s intestinal wall using suckers and hooks?',
    options: [
      'Tapeworm (Cestode)',
      'Roundworm',
      'Acaricide',
      'Earthworm'
    ],
    correctAnswer: 'Tapeworm (Cestode)',
    explanation: 'Tapeworms have a scolex (head) with hooks/suckers that anchor to the intestinal wall, followed by long chains of flat proglottid segments that absorb food.',
    socraticHint: 'Which flat ribbon-like worm sheds small white rice-grain segments in animal dung?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-018',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which internal organ do adult liver flukes (Fasciola hepatica / gigantica) attack and destroy inside sheep and cattle?',
    options: [
      'The liver and bile ducts',
      'The heart valves',
      'The outer brain tissue',
      'The toenails and hooves'
    ],
    correctAnswer: 'The liver and bile ducts',
    explanation: 'Liver flukes migrate through liver tissue and settle in bile ducts, causing liver damage, fibrosis, poor bile flow, and chronic wasting.',
    socraticHint: 'Which vital internal organ produces bile and is targeted by the parasite named "liver fluke"?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-019',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What intermediate host is required for the liver fluke to complete its lifecycle in swampy Kenyan pastures?',
    options: [
      'Freshwater mud snail (Lymnaea snail)',
      'Honeybee',
      'Grasshopper',
      'Housefly'
    ],
    correctAnswer: 'Freshwater mud snail (Lymnaea snail)',
    explanation: 'Liver fluke miracidia must infect freshwater mud snails (Lymnaea) to multiply into cercariae larvae before encysting on marsh grass.',
    socraticHint: 'What slimy freshwater mud mollusc acts as the intermediate home for young liver fluke larvae?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-020',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can a livestock farmer prevent cattle and sheep from catching liver flukes?',
    options: [
      'Fencing off waterlogged marshes and swamps or providing piped borehole water in clean troughs',
      'Feeding cattle dry sand instead of grass',
      'Pouring kerosene into the cattle feed',
      'Spraying cows with mosquito repellent'
    ],
    correctAnswer: 'Fencing off waterlogged marshes and swamps or providing piped borehole water in clean troughs',
    explanation: 'Keeping livestock away from swampy snail habitats breaks the fluke lifecycle by preventing animals from grazing fluke-infested marsh vegetation.',
    socraticHint: 'Why should livestock be kept away from poorly drained, swampy pastures where water snails breed?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-021',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is drenching in livestock healthcare?',
    options: [
      'Administering liquid deworming medicine orally down an animal\'s throat using a drenching gun',
      'Pouring buckets of cold water over a sleeping animal',
      'Dipping the animal\'s hooves in paint',
      'Injecting medicine into the animal\'s eyes'
    ],
    correctAnswer: 'Administering liquid deworming medicine orally down an animal\'s throat using a drenching gun',
    explanation: 'Drenching uses a specialized nozzle gun to deliver exact liquid anthelmintic doses past the tongue into the animal\'s digestive tract.',
    socraticHint: 'What instrument is used to give liquid deworming medicine through the mouth into a sheep\'s stomach?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-022',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does rotational grazing (paddock grazing) help control internal worms in cattle herds?',
    options: [
      'Moving animals to a new paddock allows resting paddocks to dry under the sun, killing hatched worm larvae before animals return',
      'It makes cattle run faster so worms fall out of their mouths',
      'It turns grass into deworming medicine automatically',
      'It stops cows from drinking water'
    ],
    correctAnswer: 'Moving animals to a new paddock allows resting paddocks to dry under the sun, killing hatched worm larvae before animals return',
    explanation: 'Leaving pasture paddocks empty for 4–6 weeks exposes worm larvae to sunlight and desiccation, breaking their lifecycle before reintroduction.',
    socraticHint: 'What happens to worm larvae on pasture if cattle are kept away and the grass bakes under the hot sun for a month?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-023',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why should cattle and pig meat always be inspected by government public health officers at licensed abattoirs before being sold to butcheries?',
    options: [
      'To detect and condemn carcasses infected with tapeworm cysts ("measly meat") that can infect humans with adult tapeworms',
      'To weigh the meat and collect import tax for foreign countries',
      'To make sure the meat is painted red',
      'To tenderize the meat by hitting it with stamps'
    ],
    correctAnswer: 'To detect and condemn carcasses infected with tapeworm cysts ("measly meat") that can infect humans with adult tapeworms',
    explanation: 'Eating undercooked meat containing tapeworm cysts (Cysticercus bovis/cellulosae) transmits tapeworms to humans; meat inspection protects public health.',
    socraticHint: 'What dangerous human parasite develops if someone eats uninspected "measly meat" containing cyst nodules?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u7-024',
    subStrandId: 'substrand-g6-agri-u7',
    lessonId: 'lesson-g6-agri-u7-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'When is the most critical time of year for a farmer to deworm sheep and cattle in Kenya?',
    options: [
      'At the onset and at the end of the rainy seasons when pasture moisture promotes massive worm egg hatching',
      'Only on Christmas Day and New Year\'s Day',
      'During extreme severe droughts when all grass is dead',
      'Once every ten years'
    ],
    correctAnswer: 'At the onset and at the end of the rainy seasons when pasture moisture promotes massive worm egg hatching',
    explanation: 'Rainy seasons create ideal warm, humid microclimates for worm eggs to hatch; deworming before and after peak rains prevents massive worm burdens.',
    socraticHint: 'Does pasture moisture during the rainy season increase or decrease the hatching of worm eggs?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // --- UNIT 8: MEAL PLANNING & HOUSEHOLD FOOD BUDGETING (Questions 25 to 48) ---
  // Lesson 1: Balanced Family Meals (001 - 012)
  {
    id: 'q-g6-agri-u8-001',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a balanced diet in human nutrition?',
    options: [
      'A diet that contains all essential nutrients (carbohydrates, proteins, fats, vitamins, minerals, water, and fibre) in correct proportions',
      'A diet composed exclusively of roasted meat and sweet soda every day',
      'Eating equal weights of salt and white sugar at every meal',
      'Eating only once a week to save food'
    ],
    correctAnswer: 'A diet that contains all essential nutrients (carbohydrates, proteins, fats, vitamins, minerals, water, and fibre) in correct proportions',
    explanation: 'A balanced diet supplies adequate calories, macronutrients, and micronutrients necessary for physiological health, growth, and immune defense.',
    socraticHint: 'What diet provides all the body\'s required nutrients in the right amounts and proportions?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-002',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What are the three main functional food groups classified in primary school nutrition?',
    options: [
      'Energy-giving foods, Bodybuilding foods, and Protective foods',
      'Breakfast foods, Lunch foods, and Midnight snacks',
      'Sweet foods, Salty foods, and Sour foods',
      'Boiled foods, Fried foods, and Burned foods'
    ],
    correctAnswer: 'Energy-giving foods, Bodybuilding foods, and Protective foods',
    explanation: 'Foods are functionally grouped into: 1. Energy-giving (carbohydrates/fats), 2. Bodybuilding (proteins), and 3. Protective (vitamins/minerals).',
    socraticHint: 'Recall the three functional nutritional roles: fuel for work, building muscle/tissue, and protecting from diseases.',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-003',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following Kenyan staple foods belongs to the ENERGY-GIVING food group?',
    options: [
      'Ugali, boiled cassava, sweet potatoes, and chapati',
      'Boiled cow milk and roasted omena',
      'Fresh kales (sukuma wiki) and ripe oranges',
      'Raw eggs and beef liver'
    ],
    correctAnswer: 'Ugali, boiled cassava, sweet potatoes, and chapati',
    explanation: 'Ugali, cassava, sweet potatoes, and chapati are carbohydrate-rich staples that break down into glucose to fuel cellular metabolic energy.',
    socraticHint: 'Which foods provide heavy carbohydrates to fuel muscles for daily physical work?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-004',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which group of foods supplies BODYBUILDING proteins for growth and repair in a Kenyan household?',
    options: [
      'Beans, green grams (ndengu), omena, eggs, and milk',
      'White sugar, tea leaves, and mandazi',
      'Ripe mangoes, passion fruit, and watermelon',
      'Crisp potato chips and soda'
    ],
    correctAnswer: 'Beans, green grams (ndengu), omena, eggs, and milk',
    explanation: 'Legumes (beans, ndengu) and animal products (omena, eggs, milk) are rich in complete and complementary amino acids necessary for muscle building.',
    socraticHint: 'Which protein-rich pulses, small fish, eggs, and dairy products build new muscles and repair body tissues?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-005',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following foods functions primarily as a PROTECTIVE food by supplying essential vitamins and minerals?',
    options: [
      'Spinach, managu, carrots, and ripe pawpaw',
      'Pure cane sugar syrup',
      'Dry maize grains and cassava flour',
      'Vegetable cooking fat'
    ],
    correctAnswer: 'Spinach, managu, carrots, and ripe pawpaw',
    explanation: 'Green vegetables and colourful fruits supply vitamins (A, C, K) and essential minerals that boost immune antibodies and protect against infections.',
    socraticHint: 'Which fruits and leafy greens protect our bodies from infections and nutritional diseases?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-006',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why do active, rapidly growing Grade 6 adolescents require larger amounts of protein and calcium in their daily meals?',
    options: [
      'To support the rapid adolescent growth spurt in bones, teeth, blood volume, and muscle mass',
      'To make them sleep for 20 hours a day',
      'To prevent their hair from growing',
      'To make their voices high-pitched'
    ],
    correctAnswer: 'To support the rapid adolescent growth spurt in bones, teeth, blood volume, and muscle mass',
    explanation: 'Adolescence is a phase of rapid skeletal and muscular development; calcium strengthens expanding bone matrices, and proteins build new tissues.',
    socraticHint: 'What nutrients do growing boys and girls need to build strong bones, teeth, and muscles during growth spurts?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-007',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'A manual agricultural labourer in Kericho spends 8 hours tilling land with a heavy hoe. Which food group should be increased in his meal?',
    options: [
      'Energy-giving foods (carbohydrates) like brown ugali or sweet potatoes to replace burned calories',
      'Zero foods; hard workers should not eat at all',
      'Only water and table salt',
      'Only ripe tomatoes'
    ],
    correctAnswer: 'Energy-giving foods (carbohydrates) like brown ugali or sweet potatoes to replace burned calories',
    explanation: 'Strenuous manual work expends thousands of kilocalories; generous portions of complex carbohydrates replenish glycogen reserves and fuel labour.',
    socraticHint: 'What food group replenishes the massive energy spent during strenuous physical farm work?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-008',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why do elderly grandparents require meals that are soft, easily digestible, and low in saturated fats and excess table salt?',
    options: [
      'Aging slows digestion, chewing capacity may be reduced by missing teeth, and excess salt/fat elevates blood pressure and heart strain',
      'Elderly people cannot absorb any vitamins',
      'Elderly bodies turn salt into pure gold',
      'Grandparents do not require food'
    ],
    correctAnswer: 'Aging slows digestion, chewing capacity may be reduced by missing teeth, and excess salt/fat elevates blood pressure and heart strain',
    explanation: 'Reduced dental function, slower gastrointestinal motility, and cardiovascular vulnerability necessitate tender, nutrient-dense, low-sodium meals for elders.',
    socraticHint: 'Why should food for grandparents be tender, easy to chew, and low in high blood pressure-causing salt?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-009',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which traditional Kenyan meal represents a COMPLETE, perfectly balanced dish combining all three food groups in one pot?',
    options: [
      'Githeri (maize for energy, beans for protein) stewed with sukuma wiki or spinach and carrots for protective vitamins',
      'A bowl of plain white sugar dissolved in hot water',
      'Dry roasted cassava with no stew',
      'Plain boiled rice with no sauce or vegetables'
    ],
    correctAnswer: 'Githeri (maize for energy, beans for protein) stewed with sukuma wiki or spinach and carrots for protective vitamins',
    explanation: 'Githeri stewed with vegetables combines cereal carbohydrates, legume proteins, and vegetable vitamins/minerals into a harmonious balanced meal.',
    socraticHint: 'How does traditional githeri cooked with maize, beans, kales, and carrots fulfill all three food groups?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-010',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is whole-grain brown ugali (made from whole maize, sorghum, and millet flour) healthier than sifted white maize meal?',
    options: [
      'It retains the nutritious germ and bran layer, providing abundant dietary fibre, B-vitamins, and minerals that prevent constipation and diabetes',
      'It turns into sweet chocolate when cooked',
      'It cooks in only 5 seconds',
      'It contains zero carbohydrates'
    ],
    correctAnswer: 'It retains the nutritious germ and bran layer, providing abundant dietary fibre, B-vitamins, and minerals that prevent constipation and diabetes',
    explanation: 'Refined white flour strips the nutrient-dense germ and fibrous bran; whole-grain brown flour preserves dietary fibre, B-vitamins, and iron.',
    socraticHint: 'What protective fibre and bran layer is preserved in whole-grain brown flour but stripped away in sifted white flour?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-011',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What vital non-nutrient component of food adds bulk to stool, prevents constipation, and maintains healthy gut function?',
    options: [
      'Dietary fibre (roughage)',
      'Refined white sugar',
      'Cooking grease',
      'Table salt'
    ],
    correctAnswer: 'Dietary fibre (roughage)',
    explanation: 'Dietary fibre (indigestible plant cellulose) provides fecal bulk, stimulates peristaltic bowel movement, and prevents constipation.',
    socraticHint: 'What fibrous plant roughage found in vegetables and whole grains prevents constipation?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-012',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l1',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How much safe, clean drinking water should an active Grade 6 learner consume daily under tropical Kenyan weather?',
    options: [
      'About 6 to 8 glasses (1.5 to 2 litres) throughout the day',
      'One small teaspoon per week',
      '50 litres every hour',
      'Zero; learners should drink only fizzy sodas'
    ],
    correctAnswer: 'About 6 to 8 glasses (1.5 to 2 litres) throughout the day',
    explanation: 'Consuming 1.5–2 litres of clean water maintains cellular hydration, aids renal waste filtration, regulates temperature, and replaces sweat loss.',
    socraticHint: 'What is the standard recommended daily intake of clean drinking water for a growing child?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },

  // Lesson 2: Food Budgeting & Market Economics (013 - 024)
  {
    id: 'q-g6-agri-u8-013',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What is a household food budget?',
    options: [
      'A planned financial estimate of money set aside to purchase necessary and nutritious food for the family over a specific period',
      'A bank loan used to buy foreign luxury cars',
      'A receipt showing how much electricity was burned in the kitchen',
      'A recipe book that teaches how to bake cakes'
    ],
    correctAnswer: 'A planned financial estimate of money set aside to purchase necessary and nutritious food for the family over a specific period',
    explanation: 'A food budget guides household spending, balancing family nutritional requirements with available financial income to avoid debt and shortages.',
    socraticHint: 'What financial spending plan outlines how household income is allocated for buying food?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-014',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is creating a written shopping list based on a planned weekly menu essential before going to the market in Kisumu?',
    options: [
      'It prevents impulse buying of unnecessary items, ensures all required meal ingredients are bought, and keeps spending within budget',
      'It makes market traders give you all food for free',
      'It allows you to sell food to other shoppers',
      'It keeps the shopping basket from getting too heavy'
    ],
    correctAnswer: 'It prevents impulse buying of unnecessary items, ensures all required meal ingredients are bought, and keeps spending within budget',
    explanation: 'A written list guides disciplined purchasing, preventing wasteful impulse buys and ensuring key nutritional ingredients are not forgotten.',
    socraticHint: 'How does writing down a shopping list prevent you from spending money on junk food you did not plan for?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-015',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What does "buying food in season" mean, and why is it an important food budgeting strategy in Kenya?',
    options: [
      'Buying fruits and vegetables when they are locally being harvested in abundance, meaning they are freshest, highest in nutrients, and cheapest in price',
      'Buying canned foods imported from Europe during the winter',
      'Purchasing food only during election seasons',
      'Buying food that is two years expired'
    ],
    correctAnswer: 'Buying fruits and vegetables when they are locally being harvested in abundance, meaning they are freshest, highest in nutrients, and cheapest in price',
    explanation: 'High market supply during harvest drives prices down while produce quality is peak; out-of-season items are scarce, transported far, and costly.',
    socraticHint: 'Why are mangoes and avocados so cheap and delicious when every farm tree is harvesting fruit?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-016',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How does purchasing non-perishable food staples (like a 50 kg bag of dry maize or a 25 kg sack of rice) in bulk save family money?',
    options: [
      'Wholesale bulk prices are significantly cheaper per kilogram than buying tiny daily quantities (kadogo economy) from retail kiosks',
      'Bulk grains multiply in weight inside the pantry automatically',
      'Bulk buying eliminates the need for cooking gas',
      'Wholesalers give free cattle with every bag of rice'
    ],
    correctAnswer: 'Wholesale bulk prices are significantly cheaper per kilogram than buying tiny daily quantities (kadogo economy) from retail kiosks',
    explanation: 'Buying small daily portions carries heavy retail packaging and kiosk markups; bulk wholesale purchases significantly reduce cost-per-kilogram.',
    socraticHint: 'Is buying 1 kilogram of maize every day from a kiosk more expensive or cheaper than buying a whole 50 kg sack at wholesale?',
    points: 10,
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-017',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Which of the following foods is PERISHABLE and must be bought in small, frequently consumed quantities unless refrigerated?',
    options: [
      'Fresh raw cow milk and ripe tomatoes',
      'Dry yellow maize grains',
      'Polished white rice grains',
      'Dry split peas and dry kidney beans'
    ],
    correctAnswer: 'Fresh raw cow milk and ripe tomatoes',
    explanation: 'Fresh milk and ripe tomatoes have high moisture and spoil rapidly at room temperature within 24–48 hours, unlike dry grains and pulses.',
    socraticHint: 'Which foods spoil and rot within days if not kept in a refrigerator or cooked immediately?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-018',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What smart practice should a shopper at Kongowea Market in Mombasa use when buying fresh produce?',
    options: [
      'Survey several different stalls to compare prices and produce freshness before deciding where to buy',
      'Buy immediately from the very first seller at the gate without checking other stalls',
      'Close your eyes and point at random rotten vegetables',
      'Pay double the requested price to show off wealth'
    ],
    correctAnswer: 'Survey several different stalls to compare prices and produce freshness before deciding where to buy',
    explanation: 'Walking around and comparing prices and produce quality gives the buyer bargaining leverage and secures the freshest items at fair prices.',
    socraticHint: 'Why is it wise to check multiple vendor stalls to see who has the freshest produce at the best price?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-019',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can a family repurpose leftover boiled ugali from dinner into a delicious breakfast the following morning?',
    options: [
      'Cut into slices and pan-fry with a little oil or toast and serve hot with tea (ugali choma / ugali kaanga)',
      'Throw it into the outdoor pit latrine immediately',
      'Bury it under the bedroom floor',
      'Soak it in cold soapy dishwater'
    ],
    correctAnswer: 'Cut into slices and pan-fry with a little oil or toast and serve hot with tea (ugali choma / ugali kaanga)',
    explanation: 'Pan-frying leftover ugali slices (ugali kaanga) creates a delicious, crispy breakfast carb that eliminates food waste and saves money.',
    socraticHint: 'How do Kenyan families enjoy leftover dinner ugali the next morning with breakfast tea?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-020',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is planning portion sizes accurately before cooking an effective way to control family food expenditure?',
    options: [
      'It prevents cooking excessive food that ends up spoiling and being thrown away, saving money on groceries',
      'It forces everyone to stay hungry',
      'It makes pots wear out faster',
      'It stops food from smelling delicious'
    ],
    correctAnswer: 'It prevents cooking excessive food that ends up spoiling and being thrown away, saving money on groceries',
    explanation: 'Cooking accurate portions matching household appetites prevents excess leftovers that spoil, directly cutting down wasted grocery expenditure.',
    socraticHint: 'What happens to grocery money when too much food is cooked and thrown into the garbage bin every night?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-021',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What should a consumer check on the packaging of processed foods (like cooking flour, milk, or yoghurt) before purchasing in a supermarket in Eldoret?',
    options: [
      'The expiry date / "best before" date and the KEBS quality standardization mark',
      'The colour of the supermarket cashier\'s uniform',
      'Whether the carton can be used as a football',
      'How loud the barcode scanner beeps'
    ],
    correctAnswer: 'The expiry date / "best before" date and the KEBS quality standardization mark',
    explanation: 'Checking expiration dates guarantees food freshness and safety, while the KEBS certification mark confirms compliance with national health standards.',
    socraticHint: 'What date stamped on a milk packet tells you whether the product is fresh and safe to drink?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-022',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'How can a family living in a town reduce their grocery budget by 30% without sacrificing nutrition?',
    options: [
      'By cultivating their own leafy greens and herbs in home container gardens (sack and tyre gardens)',
      'By skipping lunch and dinner every day',
      'By eating only dry white bread and water',
      'By buying spoiled rotten vegetables from garbage piles'
    ],
    correctAnswer: 'By cultivating their own leafy greens and herbs in home container gardens (sack and tyre gardens)',
    explanation: 'Home vegetable production in containers provides zero-cost daily greens, directly slashing daily food expenses while ensuring pesticide-free nutrition.',
    socraticHint: 'How does harvesting your own kales from backyard tyre gardens save money on daily grocery shopping?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-023',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'Why is buying local indigenous vegetables (like managu and kunde) from open-air markets more economical than buying exotic canned vegetables in supermarkets?',
    options: [
      'Indigenous greens are grown locally with low transport costs and no expensive industrial tin packaging or preservatives',
      'Supermarket cans contain gold jewelry inside',
      'Indigenous vegetables can only be bought using foreign dollars',
      'Canned vegetables never contain any water'
    ],
    correctAnswer: 'Indigenous greens are grown locally with low transport costs and no expensive industrial tin packaging or preservatives',
    explanation: 'Locally grown greens avoid long-distance transport tariffs, import duties, and canning overheads, offering superior fresh nutrition at a fraction of the cost.',
    socraticHint: 'Why is fresh local spinach from a neighbourhood mama mboga cheaper than tinned vegetables shipped from abroad?',
    points: 10,
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW'
  },
  {
    id: 'q-g6-agri-u8-024',
    subStrandId: 'substrand-g6-agri-u8',
    lessonId: 'lesson-g6-agri-u8-l2',
    learningAreaId: 'la-agri-g6',
    grade: 'G6',
    text: 'What should a household do with inevitable organic kitchen waste (vegetable peelings, eggshells, fruit rinds) instead of throwing them in the trash pit?',
    options: [
      'Turn them into organic compost or feed suitable vegetable trimmings to domestic rabbits and chickens',
      'Burn them with plastic waste in front of the house',
      'Throw them into public street drainage channels',
      'Bury them under the concrete house floor'
    ],
    correctAnswer: 'Turn them into organic compost or feed suitable vegetable trimmings to domestic rabbits and chickens',
    explanation: 'Composting kitchen scraps recycles organic nutrients into fertile garden soil, and feeding scraps to poultry or rabbits converts waste into protein.',
    socraticHint: 'How can vegetable peelings and scraps be turned into garden compost or animal feed rather than trash?',
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

console.log('Batch 4 of Grade 6 Agriculture & Nutrition successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
