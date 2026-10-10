/**
 * Grade 6 Science and Technology - Batch 3 Generator
 * Covers Units 5 & 6:
 * - Unit 5: Nutrition, Deficiency Diseases & Food Hygiene (strand-g6-sci-human-body)
 * - Unit 6: Matter: Properties, Changes of State & Separation (strand-g6-sci-matter-energy)
 * Missions: Orders 51, 52, 53, 54 (world-science-lab)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Science and Technology Batch 3 (Units 5 & 6) ---');

// 1. Sub-strands for Units 5 & 6
const newSubStrands = [
  {
    id: "substrand-g6-sci-u5",
    strandId: "strand-g6-sci-human-body",
    name: "Nutrition, Deficiency Diseases & Food Hygiene",
    description: "Investigate nutritional requirements, identify symptoms and prevention of nutritional deficiency diseases (Kwashiorkor, Marasmus, Rickets, Scurvy, Anaemia, Goitre), and practice food safety, hygiene, and preservation methods.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Identify common nutritional deficiency diseases, their causes, signs, and symptoms",
      "Recommend balanced dietary interventions using affordable Kenyan indigenous foods",
      "Demonstrate appropriate food handling, storage, and preservation methods to prevent food poisoning"
    ]
  },
  {
    id: "substrand-g6-sci-u6",
    strandId: "strand-g6-sci-matter-energy",
    name: "Matter: Properties, Changes of State & Mixtures",
    description: "Examine the three states of matter, physical changes of state driven by heat gain or heat loss (melting, freezing, evaporation, condensation, sublimation), and methods for separating various mixtures.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Classify substances as solids, liquids, or gases based on definite shape and volume",
      "Describe processes of change of state involving heat absorption or heat release",
      "Select and apply suitable separation techniques (filtration, decantation, evaporation, sieving, magnetic separation) to separate mixtures"
    ]
  }
];

// 2. Lessons for Units 5 & 6
const newLessons = [
  // Unit 5: Nutrition & Food Hygiene
  {
    id: "lesson-g6-sci-u5-l1",
    subStrandId: "substrand-g6-sci-u5",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Nutritional Deficiency Diseases and Dietary Solutions",
    summary: "Learn to recognize deficiency diseases like Kwashiorkor, Marasmus, Rickets, Scurvy, Anaemia, and Goitre, and discover nutrient-dense Kenyan foods that prevent them.",
    content: "A balanced diet provides carbohydrates, proteins, fats, vitamins, minerals, water, and dietary fibre in correct proportions. A lack of specific essential nutrients leads to nutritional deficiency diseases. Kwashiorkor results from severe protein deficiency, showing symptoms like swollen protruding belly (oedema), thin limbs, brown thinning hair, and skin sores. Marasmus is caused by total lack of sufficient energy foods (carbohydrates, fats, and proteins), leading to severe wasting, visible ribs, an 'old person's face', and constant hunger. Rickets is caused by lack of Vitamin D or calcium, resulting in weak bones and bowlegs. Scurvy results from Vitamin C deficiency, causing bleeding gums and slow-healing wounds. Anaemia results from lack of iron, causing pallor, dizziness, and fatigue. Goitre is caused by iodine deficiency, characterized by an enlarged thyroid gland in the neck.",
    keyConcepts: ["Kwashiorkor", "Marasmus", "Rickets", "Scurvy", "Anaemia", "Goitre", "Balanced Diet"],
    kenyanContext: "In Kenya, community nutrition programmes promote locally available foods: omena and eggs for proteins, sukuma wiki and terere for iron, citrus fruits (oranges and lemons) for Vitamin C, and iodized salt for iodine.",
    didYouKnow: "Omena (silver cyprinid from Lake Victoria) is packed with both complete proteins and bone-strengthening calcium because it is eaten whole, including the bones!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u5-l2",
    subStrandId: "substrand-g6-sci-u5",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Food Hygiene, Preservation and Safety",
    summary: "Explore scientific methods of preserving food and understand how proper hygiene halts micro-organisms and prevents food poisoning.",
    content: "Micro-organisms such as bacteria and fungi need moisture, warmth, and food to multiply and spoil food. Food preservation removes one or more conditions favourable for microbe growth to prolong shelf life. Common traditional and modern methods include: sun drying (removes moisture from maize, beans, cassava, and fish), smoking (drives out moisture and adds protective smoky compounds to meat and fish), salting (draws out water from fish and meat through osmosis), refrigeration and freezing (cold temperatures slow or stop microbial reproduction), boiling (kills existing bacteria in fresh milk), and canning/bottling (seals cooked food in airtight containers). Food poisoning results from consuming contaminated, spoiled, or toxin-containing food, presenting with vomiting, stomach cramps, and diarrhoea.",
    keyConcepts: ["Food Preservation", "Sun Drying", "Smoking", "Salting", "Refrigeration", "Boiling & Canning", "Food Poisoning"],
    kenyanContext: "Along Lake Turkana and Lake Victoria, fishmongers sun-dry and smoke tilapia and Nile perch on raised wire racks to preserve them for transport across the country.",
    didYouKnow: "Honey never spoils! Pure honey contains so little moisture and such high sugar concentration that bacteria and moulds cannot survive in it.",
    estimatedMinutes: 20
  },

  // Unit 6: Matter & Changes of State
  {
    id: "lesson-g6-sci-u6-l1",
    subStrandId: "substrand-g6-sci-u6",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "States of Matter & Changes of State",
    summary: "Understand the three states of matter and investigate changes of state driven by the gain or loss of heat energy.",
    content: "Matter is anything that has mass and occupies space. It exists primarily in three physical states: solids (definite shape and definite volume; tightly packed vibrating particles), liquids (definite volume but take the shape of the container; loosely arranged flowing particles), and gases (no definite shape or volume, expanding to fill any space; widely spaced rapidly moving particles). When matter gains heat, its particles gain kinetic energy: melting (solid turns to liquid), evaporation/boiling (liquid turns to gas), and sublimation (solid turns directly into gas without melting, e.g. naphthalene balls or iodine crystals). When matter loses heat: condensation (gas turns to liquid), freezing (liquid turns to solid), and deposition (gas turns directly into solid). Changes of state are reversible physical changes.",
    keyConcepts: ["Solids, Liquids, Gases", "Melting & Freezing", "Evaporation & Boiling", "Condensation", "Sublimation", "Heat Gain vs Heat Loss"],
    kenyanContext: "Mount Kenya's peaks, such as Batian and Nelion, showcase freezing and melting of glaciers, while morning mists condensing over tea plantations in Kericho demonstrate condensation in nature.",
    didYouKnow: "Water is the only natural substance on Earth that exists abundantly in all three states (solid ice, liquid water, and gaseous water vapour) at normal temperatures!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u6-l2",
    subStrandId: "substrand-g6-sci-u6",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Mixtures and Methods of Separation",
    summary: "Discover solutions, suspensions, and practical separation methods such as filtration, decantation, evaporation, sieving, and magnetic separation.",
    content: "A mixture consists of two or more substances physically combined without chemical bonding. When a solid dissolves completely in a liquid (like table salt in water), it forms a solution (solute + solvent). When insoluble particles float or stay suspended in liquid (like muddy water or flour in water), it forms a suspension. Mixtures can be separated using different physical properties: Sieving separates solid particles of different sizes using a mesh. Winnowing uses wind to blow away lighter chaff from heavier grain. Decantation gently pours off a clear top liquid after dense insoluble solids settle at the bottom. Filtration uses a porous medium (filter paper or clean cloth) to trap insoluble residues while letting the filtrate pass. Evaporation heats a solution to drive off the liquid solvent, leaving behind solid solute crystals. Magnetic separation uses a magnet to attract magnetic materials (like iron filings) from non-magnetic substances.",
    keyConcepts: ["Solution & Suspension", "Sieving & Winnowing", "Decantation", "Filtration (Residue & Filtrate)", "Evaporation", "Magnetic Separation"],
    kenyanContext: "At the salt pans in Gongoni near Malindi, seawater is trapped in shallow pans and allowed to evaporate under the blazing coastal sun, harvesting pure crystals of common salt.",
    didYouKnow: "Traditional water purification along River Tana uses sand filtration followed by boiling, effectively removing solid dirt residues and killing invisible germs!",
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 5 & 6
const newMissions = [
  // Unit 5 Missions
  {
    id: "mission-g6-sci-u5-m1",
    title: "Deficiency Detectives: Conquering Nutritional Diseases",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 51,
    orderIndex: 51,
    description: "Join Nutritionist Dr. Wairimu in a village health clinic to diagnose nutritional deficiencies and formulate healing balanced diets using Kenyan foods.",
    objectives: [
      "Distinguish between symptoms of Kwashiorkor and Marasmus",
      "Identify deficiency causes of Rickets, Scurvy, Anaemia, and Goitre",
      "Plan well-balanced meals rich in protective vitamins, minerals, and proteins"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Nutritional Guardian",
    badge: "Nutritional Guardian",
    questionIds: [
      "q-g6-sci-u5-001", "q-g6-sci-u5-002", "q-g6-sci-u5-003", "q-g6-sci-u5-004",
      "q-g6-sci-u5-005", "q-g6-sci-u5-006", "q-g6-sci-u5-007", "q-g6-sci-u5-008",
      "q-g6-sci-u5-009", "q-g6-sci-u5-010", "q-g6-sci-u5-011", "q-g6-sci-u5-012"
    ]
  },
  {
    id: "mission-g6-sci-u5-m2",
    title: "Kitchen Chemistry: Food Safety and Preservation",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 52,
    orderIndex: 52,
    description: "Work with Chef Otieno to test scientific food preservation methods and safeguard kitchen foods against spoilage and pathogenic toxins.",
    objectives: [
      "Explain how drying, salting, smoking, and cooling prevent microbial spoilage",
      "Identify causes and signs of food poisoning",
      "Demonstrate strict food handling and storage hygiene"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Food Safety Scout",
    badge: "Food Safety Scout",
    questionIds: [
      "q-g6-sci-u5-013", "q-g6-sci-u5-014", "q-g6-sci-u5-015", "q-g6-sci-u5-016",
      "q-g6-sci-u5-017", "q-g6-sci-u5-018", "q-g6-sci-u5-019", "q-g6-sci-u5-020",
      "q-g6-sci-u5-021", "q-g6-sci-u5-022", "q-g6-sci-u5-023", "q-g6-sci-u5-024"
    ]
  },

  // Unit 6 Missions
  {
    id: "mission-g6-sci-u6-m1",
    title: "State Shifters: Melting, Boiling & Condensation",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 53,
    orderIndex: 53,
    description: "Enter the physical science laboratory to explore how heating and cooling transform matter between solid, liquid, and gas phases.",
    objectives: [
      "Classify properties of solids, liquids, and gases",
      "Differentiate between phase changes that absorb heat versus release heat",
      "Identify examples of sublimation, evaporation, and condensation in daily life"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Master of Matter",
    badge: "Master of Matter",
    questionIds: [
      "q-g6-sci-u6-001", "q-g6-sci-u6-002", "q-g6-sci-u6-003", "q-g6-sci-u6-004",
      "q-g6-sci-u6-005", "q-g6-sci-u6-006", "q-g6-sci-u6-007", "q-g6-sci-u6-008",
      "q-g6-sci-u6-009", "q-g6-sci-u6-010", "q-g6-sci-u6-011", "q-g6-sci-u6-012"
    ]
  },
  {
    id: "mission-g6-sci-u6-m2",
    title: "Separation Specialists: Purifying Mixtures",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 54,
    orderIndex: 54,
    description: "Solve complex environmental purification challenges using sieving, filtration, evaporation, decantation, and magnetic separation.",
    objectives: [
      "Distinguish between solutions and suspensions",
      "Select optimal separation techniques based on particle size, solubility, and magnetic properties",
      "Apply separation principles to clean drinking water and commercial salt production"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Purification Chemist",
    badge: "Purification Chemist",
    questionIds: [
      "q-g6-sci-u6-013", "q-g6-sci-u6-014", "q-g6-sci-u6-015", "q-g6-sci-u6-016",
      "q-g6-sci-u6-017", "q-g6-sci-u6-018", "q-g6-sci-u6-019", "q-g6-sci-u6-020",
      "q-g6-sci-u6-021", "q-g6-sci-u6-022", "q-g6-sci-u6-023", "q-g6-sci-u6-024"
    ]
  }
];

// 4. Questions for Units 5 & 6
const newQuestions = [
  // --- UNIT 5: NUTRITION & FOOD HYGIENE (Questions 1 to 24) ---
  // Lesson 1: Deficiency Diseases (001 - 012)
  {
    id: "q-g6-sci-u5-001",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which nutrient deficiency specifically causes Kwashiorkor in growing children?",
    options: [
      "Lack of proteins in the diet",
      "Lack of carbohydrates and total calories",
      "Lack of Vitamin C",
      "Lack of iron in the blood"
    ],
    correctAnswer: "Lack of proteins in the diet",
    explanation: "Kwashiorkor is caused by a severe deficiency of proteins in the diet, even if the child receives carbohydrates.",
    socraticHint: "What bodybuilding nutrient builds muscle and cellular tissue in children?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-002",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A health worker in Kilifi notes a child with a swollen pot belly (oedema), thin arms, brownish brittle hair, and flaky skin sores. Which disease is this child most likely suffering from?",
    options: [
      "Kwashiorkor",
      "Marasmus",
      "Rickets",
      "Scurvy"
    ],
    correctAnswer: "Kwashiorkor",
    explanation: "A swollen protruding belly caused by fluid retention (oedema), sparse brownish hair, and skin lesions are hallmark signs of Kwashiorkor.",
    socraticHint: "Which disease features fluid retention (oedema) causing a swollen protruding abdomen?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-003",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does Marasmus differ clinically from Kwashiorkor?",
    options: [
      "Marasmus involves severe general starvation of all nutrients showing visible ribs and an old person's face without oedema",
      "Marasmus produces a swollen pot belly and fluid retention in feet",
      "Marasmus is caused strictly by a lack of Vitamin D from sunlight",
      "Marasmus causes bleeding gums and loose teeth"
    ],
    correctAnswer: "Marasmus involves severe general starvation of all nutrients showing visible ribs and an old person's face without oedema",
    explanation: "Marasmus is total starvation (lack of all food groups, especially energy foods and proteins), resulting in extreme wasting, visible ribs, an alert old-person face, and no swollen belly.",
    socraticHint: "Think about which condition is total emaciation with no swelling (no oedema).",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-004",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which deficiency disease results in weak, soft bones that bend under body weight, causing bowlegs or knock-knees in toddlers?",
    options: [
      "Rickets",
      "Kwashiorkor",
      "Goitre",
      "Anaemia"
    ],
    correctAnswer: "Rickets",
    explanation: "Rickets is caused by a lack of Vitamin D, calcium, or phosphorus, which prevents proper bone calcification, leading to soft, bowed leg bones.",
    socraticHint: "Which disease weakens leg bones because the body lacks Vitamin D or calcium?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-005",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How can mothers in Kenya naturally help their babies produce Vitamin D to prevent Rickets?",
    options: [
      "Exposing the baby to gentle early morning sunlight regularly",
      "Keeping the baby inside dark rooms with curtains closed all day",
      "Feeding the baby only pure maize flour porridge without milk",
      "Giving the baby sugary soda every afternoon"
    ],
    correctAnswer: "Exposing the baby to gentle early morning sunlight regularly",
    explanation: "Sunlight triggers the natural synthesis of Vitamin D in human skin, which is necessary for calcium absorption and strong bone formation.",
    socraticHint: "What free natural source of energy shines every morning to help skin synthesize Vitamin D?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-006",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which nutritional deficiency disease is caused by an insufficient intake of Vitamin C?",
    options: [
      "Scurvy",
      "Rickets",
      "Marasmus",
      "Goitre"
    ],
    correctAnswer: "Scurvy",
    explanation: "Scurvy is caused by Vitamin C (ascorbic acid) deficiency, resulting in bleeding spongy gums, loose teeth, and poor wound healing.",
    socraticHint: "Which disease affects sailors and people who lack fresh citrus fruits?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-007",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which local Kenyan fruits should a farmer in Machakos consume to cure and prevent Scurvy?",
    options: [
      "Oranges, lemons, guavas, and passion fruits",
      "Dry roasted maize and cassava flour",
      "Margarine and fried cooking oil",
      "Black tea and table sugar"
    ],
    correctAnswer: "Oranges, lemons, guavas, and passion fruits",
    explanation: "Citrus fruits (oranges, lemons) as well as guavas and passion fruits are packed with Vitamin C, which cures and prevents Scurvy.",
    socraticHint: "Which fresh, juicy fruits are famous for being rich in Vitamin C?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-008",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What mineral deficiency causes swelling of the thyroid gland in the front of the neck (Goitre)?",
    options: [
      "Iodine",
      "Calcium",
      "Iron",
      "Sodium"
    ],
    correctAnswer: "Iodine",
    explanation: "Goitre is the enlargement of the thyroid gland in the neck caused by a deficiency of the mineral iodine in the diet.",
    socraticHint: "Which trace mineral is commonly added to packaged table salt in Kenya to prevent neck swellings?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-009",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is salt sold in Kenya labelled with the words 'Iodized Salt'?",
    options: [
      "It contains added iodine to prevent Goitre and promote healthy brain development",
      "It contains added sugar to improve sweet taste in cooking",
      "It has been treated with bleach to make it pure white",
      "It prevents food from becoming spicy"
    ],
    correctAnswer: "It contains added iodine to prevent Goitre and promote healthy brain development",
    explanation: "The Kenyan government mandates the iodization of all commercial salt to ensure the population gets adequate daily iodine, preventing Goitre.",
    socraticHint: "What thyroid condition does added iodine protect families from?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-010",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following symptoms is directly linked to Anaemia caused by iron deficiency?",
    options: [
      "Pale tongue and inner eyelids, frequent dizziness, and persistent fatigue",
      "Swelling of the thyroid gland in the throat",
      "Weak and bowlegged walking posture",
      "Bleeding swollen gums and loosening of teeth"
    ],
    correctAnswer: "Pale tongue and inner eyelids, frequent dizziness, and persistent fatigue",
    explanation: "Lack of iron reduces haemoglobin, leading to poor oxygen transport, which makes the conjunctiva, gums, and tongue look pale, accompanied by tiredness and dizziness.",
    socraticHint: "What happens when body cells do not get enough oxygen from red blood cells?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-011",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A family in Kakamega wants to prevent protein deficiency in their children. Which affordable, locally available foods should they feed them regularly?",
    options: [
      "Beans, groundnuts, omena, eggs, and cow milk",
      "Boiled cassava, sweet potatoes, and black tea",
      "White bread, margarine, and soda",
      "Raw cabbage leaves and salt water"
    ],
    correctAnswer: "Beans, groundnuts, omena, eggs, and cow milk",
    explanation: "Beans, groundnuts, omena (fish), eggs, and milk are outstanding, protein-rich Kenyan staples that build body tissues and prevent Kwashiorkor.",
    socraticHint: "Identify legumes, small fish, eggs, and dairy that are packed with bodybuilding proteins.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-012",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following pairs correctly matches a deficiency disease with the missing nutrient responsible for it?",
    options: [
      "Scurvy – Vitamin C; Rickets – Vitamin D",
      "Kwashiorkor – Vitamin C; Scurvy – Protein",
      "Marasmus – Iodine; Goitre – Iron",
      "Anaemia – Calcium; Rickets – Iron"
    ],
    correctAnswer: "Scurvy – Vitamin C; Rickets – Vitamin D",
    explanation: "Scurvy is caused by Vitamin C deficiency, and Rickets is caused by Vitamin D (or calcium) deficiency.",
    socraticHint: "Match citrus vitamin with gums and sunshine vitamin with bones.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Food Hygiene and Preservation (013 - 024)
  {
    id: "q-g6-sci-u5-013",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why do bacteria and moulds fail to grow in thoroughly sun-dried grains like maize and sorghum?",
    options: [
      "Micro-organisms require moisture (water) to survive, grow, and reproduce",
      "Sunlight permanently electrifies the grains",
      "Dry grains become too cold for bacteria",
      "Microbes are scared away by the bright yellow colour of maize"
    ],
    correctAnswer: "Micro-organisms require moisture (water) to survive, grow, and reproduce",
    explanation: "Moisture is essential for microbial cellular life; removing water by sun-drying deprives bacteria and fungi of the moisture they need to multiply.",
    socraticHint: "What essential liquid do all living micro-organisms need to thrive?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-014",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does applying a heavy coating of table salt preserve fresh fish or meat?",
    options: [
      "Salt draws out moisture from bacterial cells through osmosis, dehydrating and killing them",
      "Salt adds oxygen that suffocates all bacteria",
      "Salt turns the meat into solid rock",
      "Salt converts the meat into pure alcohol"
    ],
    correctAnswer: "Salt draws out moisture from bacterial cells through osmosis, dehydrating and killing them",
    explanation: "High concentrations of salt create a hypertonic environment, drawing water out of bacterial and fungal cells through osmosis, which inhibits or kills them.",
    socraticHint: "What cellular process pulls water out of cells when surrounded by high salt concentrations?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-015",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following describes how smoking preserves fish around Lake Victoria?",
    options: [
      "Heat dries out moisture while chemicals in the smoke deposit protective anti-microbial coatings",
      "Smoke freezes the fish below 0 degrees Celsius",
      "Smoke dissolves all bones into calcium powder",
      "Smoke makes the fish invisible to airborne germs"
    ],
    correctAnswer: "Heat dries out moisture while chemicals in the smoke deposit protective anti-microbial coatings",
    explanation: "Smoking combines heat (which dries moisture) with compounds from burning wood that inhibit microbial growth on the meat surface.",
    socraticHint: "Consider the dual effects of warmth drying the meat and smoke chemicals coating it.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-016",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the primary scientific principle behind preserving fresh milk and vegetables in a refrigerator?",
    options: [
      "Low temperatures slow down or arrest the activity and reproduction of micro-organisms",
      "Cold air completely destroys and disintegrates all bacteria forever",
      "The refrigerator removes all oxygen from the interior compartment",
      "Cold air increases the moisture content to drown the germs"
    ],
    correctAnswer: "Low temperatures slow down or arrest the activity and reproduction of micro-organisms",
    explanation: "Refrigeration at 0–4°C drastically slows bacterial enzyme activity and reproduction, delaying spoilage without necessarily killing every bacterium.",
    socraticHint: "Do cold temperatures kill germs instantly or do they slow down their biological activity?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-017",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why should fresh cow's milk in Nyandarua be boiled before drinking?",
    options: [
      "Boiling kills disease-causing pathogenic bacteria like tuberculosis and brucellosis pathogens",
      "Boiling adds Vitamin C to the milk",
      "Boiling cools the milk down quickly",
      "Boiling turns liquid milk into solid cheese blocks"
    ],
    correctAnswer: "Boiling kills disease-causing pathogenic bacteria like tuberculosis and brucellosis pathogens",
    explanation: "High heat during boiling pasteurizes milk by destroying harmful pathogens such as Mycobacterium bovis and Brucella, making it safe for consumption.",
    socraticHint: "What happens to pathogenic bacteria when liquid is subjected to high heat?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-018",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is canning, and how does it keep food safe for years without spoiling?",
    options: [
      "Cooking food at high heat inside sterile airtight cans to kill microbes and seal out air and moisture",
      "Burying fresh food inside plastic bags under dry sand",
      "Soaking food in cold river water inside an open tin",
      "Leaving food in direct sunlight inside open wire cages"
    ],
    correctAnswer: "Cooking food at high heat inside sterile airtight cans to kill microbes and seal out air and moisture",
    explanation: "Canning sterilizes food with high heat and seals it in an airtight container, preventing entry of new microbes and oxygen.",
    socraticHint: "What keeps tinned beans or fish preserved safely on supermarket shelves?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-019",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What causes acute food poisoning after eating improperly stored leftover stew?",
    options: [
      "Toxins produced by multiplying bacteria like Salmonella and Staphylococcus",
      "Excessive amounts of Vitamin C in the stew",
      "The presence of clean boiled water in the sauce",
      "Drinking warm milk directly after the meal"
    ],
    correctAnswer: "Toxins produced by multiplying bacteria like Salmonella and Staphylococcus",
    explanation: "When perishable food sits in the warm danger zone, bacteria multiply rapidly and release toxic chemical by-products that irritate the gastrointestinal tract.",
    socraticHint: "What dangerous poisons do multiplying bacteria produce in warm leftover foods?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-020",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following are the most common symptoms of food poisoning?",
    options: [
      "Vomiting, abdominal stomach cramps, diarrhoea, and fever",
      "Enlarged neck gland and bowlegs",
      "Bleeding from gums and dry hair",
      "Difficulty hearing and pale fingernails"
    ],
    correctAnswer: "Vomiting, abdominal stomach cramps, diarrhoea, and fever",
    explanation: "The body attempts to quickly expel ingested microbial toxins, triggering nausea, vomiting, painful cramps, and watery diarrhoea.",
    socraticHint: "How does the digestive tract rapidly reject harmful contaminated food?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-021",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why should canned foods with bulging, swollen lids or deep dents never be purchased or eaten?",
    options: [
      "The swelling indicates dangerous gas produced by bacteria like Clostridium botulinum",
      "The manufacturer added extra fruit juice that expanded the can",
      "The food inside has converted into solid ice",
      "The can has absorbed too much iron from the store shelves"
    ],
    correctAnswer: "The swelling indicates dangerous gas produced by bacteria like Clostridium botulinum",
    explanation: "Bulging cans signify that anaerobic bacteria are growing inside and producing gas along with deadly toxins, such as botulinum toxin.",
    socraticHint: "What produces pressure inside a sealed can when anaerobic bacteria grow?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-022",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What immediate action should be taken for someone suffering from diarrhoea and vomiting due to mild food poisoning?",
    options: [
      "Giving Oral Rehydration Solution (ORS) or clean boiled water with pinch of salt and sugar to prevent dehydration",
      "Giving them large glasses of cow ghee and thick oily stew",
      "Restricting all fluids so the stomach dries out completely",
      "Giving them fizzy cold sodas with ice cubes"
    ],
    correctAnswer: "Giving Oral Rehydration Solution (ORS) or clean boiled water with pinch of salt and sugar to prevent dehydration",
    explanation: "Diarrhoea and vomiting cause rapid loss of water and vital electrolytes; giving ORS replenishes fluid balance and prevents life-threatening dehydration.",
    socraticHint: "What rehydration mixture restores lost water and salts during diarrhoea?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-023",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following food preparation practices prevents cross-contamination in a school kitchen in Nyeri?",
    options: [
      "Using separate cutting boards and knives for raw meat and ready-to-eat vegetables",
      "Washing raw chicken in the same bowl used for chopping salad tomatoes",
      "Leaving cooked rice uncovered on open kitchen tables overnight",
      "Handling cooked food immediately after cleaning farm manure without washing hands"
    ],
    correctAnswer: "Using separate cutting boards and knives for raw meat and ready-to-eat vegetables",
    explanation: "Raw meats harbour bacteria like Salmonella; using dedicated chopping boards keeps these microbes from contaminating vegetables that are eaten without cooking.",
    socraticHint: "How do you stop bacteria on raw meat from transferring onto fresh salad?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u5-024",
    subStrandId: "substrand-g6-sci-u5",
    lessonId: "lesson-g6-sci-u5-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which traditional grain storage structure in rural Kenya is raised on wooden stilts with rat-guards to keep grains dry and pest-free?",
    options: [
      "Granary (chombo cha nafaka / ikumbi)",
      "Underground pit filled with water",
      "Open clay cooking pot",
      "Cloth blanket placed under tree shade"
    ],
    correctAnswer: "Granary (chombo cha nafaka / ikumbi)",
    explanation: "Traditional granaries are elevated above the ground on pillars fitted with rat baffles to provide ventilation, prevent moisture ingress, and block rodents.",
    socraticHint: "What raised storage hut allows airflow and keeps rodents away from harvested grain?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // --- UNIT 6: MATTER & CHANGES OF STATE (Questions 25 to 48) ---
  // Lesson 1: States of Matter & Phase Changes (001 - 012)
  {
    id: "q-g6-sci-u6-001",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which state of matter has a definite volume and a definite shape?",
    options: [
      "Solid",
      "Liquid",
      "Gas",
      "Plasma"
    ],
    correctAnswer: "Solid",
    explanation: "Solids possess both a fixed volume and a definite shape because their particles are tightly packed in rigid, fixed positions.",
    socraticHint: "Think of a wooden block or a stone: does its shape or volume change when placed in a bowl?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-002",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which state of matter has a definite volume but takes the shape of the container it is poured into?",
    options: [
      "Liquid",
      "Solid",
      "Gas",
      "Vapour"
    ],
    correctAnswer: "Liquid",
    explanation: "Liquids have a fixed volume, but because their particles can slide past each other, they take the shape of whatever vessel holds them.",
    socraticHint: "Think of 500 millilitres of water poured from a jug into a flat tray.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-003",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following states of matter can be easily compressed into a smaller space?",
    options: [
      "Gas",
      "Solid",
      "Liquid",
      "Metal"
    ],
    correctAnswer: "Gas",
    explanation: "Gases have large empty spaces between their particles, allowing them to be pushed closer together (compressed) under pressure.",
    socraticHint: "Think of pumping air into a bicycle tyre or football: why can you push more air inside?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-004",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What physical process takes place when solid candle wax or ice turns into a liquid upon gaining heat?",
    options: [
      "Melting",
      "Freezing",
      "Condensation",
      "Sublimation"
    ],
    correctAnswer: "Melting",
    explanation: "Melting is the phase change from a solid to a liquid as the substance absorbs heat energy.",
    socraticHint: "What do we call the process when an ice cube warms up and turns to liquid water?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-005",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What process occurs when liquid water loses heat and turns into solid ice at 0 degrees Celsius?",
    options: [
      "Freezing (solidification)",
      "Evaporation",
      "Melting",
      "Condensation"
    ],
    correctAnswer: "Freezing (solidification)",
    explanation: "Freezing (or solidification) is the change of state from a liquid to a solid as heat energy is lost.",
    socraticHint: "What happens to liquid water placed in the freezer compartment overnight?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-006",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When wet school uniforms spread on a clothesline in Kitui dry under the sun, where does the water go, and by which process?",
    options: [
      "It turns into invisible water vapour in the air by evaporation",
      "It turns into solid ice by freezing",
      "It sinks into the wooden pegs by condensation",
      "It is destroyed and disappears from existence"
    ],
    correctAnswer: "It turns into invisible water vapour in the air by evaporation",
    explanation: "Evaporation occurs at the surface of a liquid at any temperature below its boiling point, transforming liquid water into water vapour.",
    socraticHint: "What process turns liquid water on wet clothes into atmospheric water vapour?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-007",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What causes droplets of water to form on the outside of a metal cup containing cold ice water on a warm humid afternoon in Mombasa?",
    options: [
      "Water vapour in the warm air cools down and condenses upon touching the cold surface",
      "The cold ice water leaks through microscopic holes in the metal cup",
      "The metal cup produces water from within its metal atoms",
      "Sweat from the person's hands gathers on the cup surface"
    ],
    correctAnswer: "Water vapour in the warm air cools down and condenses upon touching the cold surface",
    explanation: "When warm, moist air touches the cold exterior of the cup, heat is lost from the water vapour, causing it to condense into liquid water droplets.",
    socraticHint: "What phase change happens when gaseous water vapour loses heat against a chilled surface?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-008",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the special term for the process where a solid changes directly into a gas without passing through the liquid state?",
    options: [
      "Sublimation",
      "Evaporation",
      "Condensation",
      "Decantation"
    ],
    correctAnswer: "Sublimation",
    explanation: "Sublimation is the direct transition of a substance from the solid to the gas state without melting into a liquid first.",
    socraticHint: "What process describes mothballs (naphthalene) shrinking and vanishing into gas over time?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-009",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following common household substances undergoes sublimation, gradually shrinking away into scented vapour inside a clothes wardrobe?",
    options: [
      "Mothballs (naphthalene balls)",
      "Common kitchen table salt",
      "Cooking oil",
      "Iron nails"
    ],
    correctAnswer: "Mothballs (naphthalene balls)",
    explanation: "Naphthalene mothballs sublimate slowly at room temperature, turning directly from solid crystals into gas to repel insects.",
    socraticHint: "Which small white balls placed in wardrobes smell strongly and disappear without leaving a puddle?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-010",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following changes of state requires an input (gain) of heat energy?",
    options: [
      "Melting and Evaporation",
      "Freezing and Condensation",
      "Condensation and Deposition",
      "Freezing and Deposition"
    ],
    correctAnswer: "Melting and Evaporation",
    explanation: "Melting and evaporation both require heat absorption (gain) to overcome intermolecular bonds and increase particle motion.",
    socraticHint: "Which processes happen when you place a substance on a hot stove?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-011",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the standard boiling point of pure water at normal sea level atmospheric pressure?",
    options: [
      "100 degrees Celsius",
      "0 degrees Celsius",
      "50 degrees Celsius",
      "212 degrees Celsius"
    ],
    correctAnswer: "100 degrees Celsius",
    explanation: "Pure water boils at exactly 100°C at 1 atmosphere of pressure, transitioning rapidly from liquid to steam.",
    socraticHint: "What temperature on the Celsius scale marks the boiling point of pure water?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-012",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why are changes of state (like melting and freezing) classified as physical changes rather than chemical changes?",
    options: [
      "No new substance is formed and the process can be easily reversed by changing temperature",
      "A completely new chemical compound is produced with new chemical bonds",
      "Mass is permanently destroyed during the transition",
      "The substance changes into energy and can never turn back"
    ],
    correctAnswer: "No new substance is formed and the process can be easily reversed by changing temperature",
    explanation: "Physical changes alter only the state or appearance without modifying the fundamental chemical identity of the molecules; ice, water, and steam are all H2O.",
    socraticHint: "Is liquid water chemically different from solid ice or steam?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Mixtures and Methods of Separation (013 - 024)
  {
    id: "q-g6-sci-u6-013",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When sugar is stirred into a cup of warm water until it completely disappears, what is the sugar called, and what is the resulting liquid?",
    options: [
      "Sugar is the solute; the resulting mixture is a solution",
      "Sugar is the solvent; the resulting mixture is a suspension",
      "Sugar is the filtrate; the resulting mixture is a residue",
      "Sugar is the emulsion; the resulting mixture is an alloy"
    ],
    correctAnswer: "Sugar is the solute; the resulting mixture is a solution",
    explanation: "The substance that dissolves (sugar) is the solute, the liquid that dissolves it (water) is the solvent, and the uniform homogeneous mixture is a solution.",
    socraticHint: "What do we call the solid substance that dissolves in a liquid?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-014",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does a suspension (like chalk powder mixed in water) differ from a true solution (like salt in water)?",
    options: [
      "In a suspension, the solid particles do not dissolve and eventually settle down if left undisturbed",
      "A suspension is completely transparent and homogeneous",
      "A suspension cannot be separated by filtration",
      "A solution has large visible floating solid chunks"
    ],
    correctAnswer: "In a suspension, the solid particles do not dissolve and eventually settle down if left undisturbed",
    explanation: "In a suspension, insoluble solid particles remain dispersed temporarily and will settle to the bottom over time under gravity, unlike dissolved solutes in solutions.",
    socraticHint: "What happens to fine chalk dust or mud in water after standing still for 30 minutes?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-015",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which method is best suited for separating a mixture of dry maize grains and fine flour dust?",
    options: [
      "Sieving",
      "Evaporation",
      "Magnetic separation",
      "Distillation"
    ],
    correctAnswer: "Sieving",
    explanation: "Sieving separates solid particles of different sizes; the smaller flour particles pass through the mesh holes while the larger maize grains remain on top.",
    socraticHint: "Which kitchen tool has a mesh that allows fine powders through while catching big grains?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-016",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "During harvesting in Makueni, farmers toss threshed millet and sorghum into the breeze to blow away dry chaff. What is this separation technique called?",
    options: [
      "Winnowing",
      "Filtration",
      "Decantation",
      "Sublimation"
    ],
    correctAnswer: "Winnowing",
    explanation: "Winnowing utilizes wind or air currents to separate lighter chaff, husks, and dust from heavier edible grains.",
    socraticHint: "What traditional agricultural method uses the natural wind to blow away light husks?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-017",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "After muddy river water has settled in a bucket overnight and clear water rests on top, gently pouring off the clear liquid without disturbing the mud sediment is called:",
    options: [
      "Decantation",
      "Evaporation",
      "Winnowing",
      "Magnetism"
    ],
    correctAnswer: "Decantation",
    explanation: "Decantation is the careful pouring off of a clear supernatant liquid from settled sediment at the bottom of a container.",
    socraticHint: "What is the term for gently pouring off the top liquid layer without disturbing settled mud?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-018",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In a laboratory filtration experiment using a filter funnel and filter paper, what is the solid left behind on the paper and what is the clear liquid collected below?",
    options: [
      "Solid is the residue; liquid is the filtrate",
      "Solid is the filtrate; liquid is the residue",
      "Solid is the solute; liquid is the solvent",
      "Solid is the precipitate; liquid is the suspension"
    ],
    correctAnswer: "Solid is the residue; liquid is the filtrate",
    explanation: "During filtration, insoluble trapped solid on the filter paper is called the residue, while the clear passing liquid in the beaker is the filtrate.",
    socraticHint: "Remember: 'residue' resides (stays) behind on the paper, while 'filtrate' filters through.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-019",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How is common salt harvested from ocean seawater in the salt pans at Malindi and Gongoni along the Kenyan coast?",
    options: [
      "Trapping seawater in shallow pans where the sun evaporates the water, leaving solid salt crystals",
      "Passing seawater through magnetic filters that attract sodium",
      "Freezing the entire sea until blocks of ice are ground into powder",
      "Using sieves to catch individual dissolved salt particles"
    ],
    correctAnswer: "Trapping seawater in shallow pans where the sun evaporates the water, leaving solid salt crystals",
    explanation: "Solar evaporation drives off water molecules from brine pools under coastal sunshine, leaving crystallized sodium chloride salt behind.",
    socraticHint: "What natural drying process leaves solid salt behind when sea water dries up under the sun?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-020",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which method would you use to quickly separate small iron nails that accidentally fell into a basin of dry builders' sand?",
    options: [
      "Using a magnet (magnetic separation)",
      "Boiling the mixture in hot water",
      "Passing the sand through fine filter paper",
      "Blowing with a winnowing basket"
    ],
    correctAnswer: "Using a magnet (magnetic separation)",
    explanation: "Iron is a ferromagnetic material; a magnet attracts and picks up iron nails effortlessly while leaving non-magnetic sand behind.",
    socraticHint: "Which tool uses magnetic force to pull metal iron items out of non-metallic sand?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-021",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is filtration NOT able to separate common salt dissolved in water?",
    options: [
      "Dissolved salt particles are broken down to molecular size and pass straight through the filter pores with the water",
      "Salt dissolves the filter paper instantly",
      "Filter paper only catches liquids and lets solids stay behind",
      "Salt turns into gas when touched by filter paper"
    ],
    correctAnswer: "Dissolved salt particles are broken down to molecular size and pass straight through the filter pores with the water",
    explanation: "In a true solution, ions/molecules of solute are much smaller than the pores of filter paper and pass through unimpeded; evaporation is needed to separate them.",
    socraticHint: "Are dissolved salt ions larger or smaller than the microscopic holes in filter paper?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-022",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following mixtures can be separated by simple hand picking?",
    options: [
      "A mixture of dried red kidney beans and white maize grains",
      "Sugar dissolved in tea",
      "Salt mixed with fine sand",
      "Cooking oil mixed with kerosene"
    ],
    correctAnswer: "A mixture of dried red kidney beans and white maize grains",
    explanation: "Hand picking is practical when the components of a solid mixture are distinct in colour, size, and shape, and present in manageable quantities.",
    socraticHint: "Which mixture contains large, easily recognizable seeds of contrasting colours?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-023",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When cooking tea at home, a wire mesh tea strainer is used to hold back tea leaves while pouring tea into cups. Which separation technique does this everyday act illustrate?",
    options: [
      "Filtration",
      "Magnetic separation",
      "Sublimation",
      "Evaporation"
    ],
    correctAnswer: "Filtration",
    explanation: "A tea strainer acts as a filter; it retains the insoluble tea leaves (residue) while allowing the liquid tea (filtrate) to pass into the cup.",
    socraticHint: "What process uses a porous barrier or strainer to keep solids out of a liquid?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u6-024",
    subStrandId: "substrand-g6-sci-u6",
    lessonId: "lesson-g6-sci-u6-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A scout troop camping near Lake Baringo has muddy river water containing both heavy silt and dissolved microbes. Which sequence of steps will make the water clear and safe for drinking?",
    options: [
      "Allow to settle -> Decant/Filter through sand and cloth -> Boil vigorously",
      "Boil immediately -> Add mud -> Evaporate completely",
      "Pass through a magnet -> Shake vigorously -> Drink directly",
      "Sieve with large wire mesh -> Freeze into ice blocks -> Eat immediately"
    ],
    correctAnswer: "Allow to settle -> Decant/Filter through sand and cloth -> Boil vigorously",
    explanation: "Settling and decanting/filtration remove suspended physical dirt and silt, while boiling vigorously destroys biological pathogens and microbes, rendering it safe.",
    socraticHint: "Think about first removing visible suspended particles, then killing invisible germs with heat.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
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

console.log('Batch 3 of Grade 6 Science and Technology successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
