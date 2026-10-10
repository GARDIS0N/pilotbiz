/**
 * Grade 6 Science and Technology - Batch 2 Generator
 * Covers Units 3 & 4:
 * - Unit 3: The Human Circulatory System (Heart, Blood Vessels, Blood Components)
 * - Unit 4: The Human Excretory System (Kidneys & Urinary System, Skin, Lungs)
 * Missions: Orders 47, 48, 49, 50 (world-science-lab)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Science and Technology Batch 2 (Units 3 & 4) ---');

// 1. Sub-strands for Units 3 & 4
const newSubStrands = [
  {
    id: "substrand-g6-sci-u3",
    strandId: "strand-g6-sci-human-body",
    name: "The Human Circulatory System",
    description: "Explore the structure and functions of the heart, blood vessels (arteries, veins, capillaries), and components of blood (plasma, red blood cells, white blood cells, platelets) alongside heart health and exercise.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Identify parts of the human heart and their functions in pumping blood",
      "Differentiate between arteries, veins, and capillaries",
      "Describe the four main components of blood and their roles in the body",
      "Explain the impact of physical exercise and healthy nutrition on circulatory health"
    ]
  },
  {
    id: "substrand-g6-sci-u4",
    strandId: "strand-g6-sci-human-body",
    name: "The Human Excretory System",
    description: "Investigate excretion in humans focusing on the kidneys and urinary system, skin, and lungs as vital waste elimination organs.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Describe the structure and function of the human urinary system (kidneys, ureters, urinary bladder, urethra)",
      "Explain how the kidneys filter blood and remove metabolic waste in urine",
      "Identify the skin and lungs as excretory organs and describe their roles",
      "Practice good hygiene and hydration habits to maintain a healthy excretory system"
    ]
  }
];

// 2. Lessons for Units 3 & 4
const newLessons = [
  // Unit 3: Circulatory System
  {
    id: "lesson-g6-sci-u3-l1",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "The Human Heart: The Living Pump",
    summary: "Discover how the heart pumps oxygen-rich and oxygen-poor blood throughout the body through four muscular chambers and one-way valves.",
    content: "The human heart is a muscular organ about the size of a fist located slightly to the left in the chest cavity. It acts as a double pump, beating continuously without stopping. The heart has four chambers: the upper thin-walled chambers called right atrium and left atrium (atria receive blood), and the lower thick-walled pumping chambers called right ventricle and left ventricle (ventricles pump blood out). The right side receives deoxygenated blood from the body and pumps it to the lungs for oxygen, while the left side receives oxygenated blood from the lungs and pumps it to the rest of the body. Valves between chambers ensure blood flows in only one direction without backflow.",
    keyConcepts: ["Heart Chambers", "Atria and Ventricles", "Valves", "Oxygenated vs Deoxygenated Blood", "Pulse Rate"],
    kenyanContext: "In Iten, Elgeyo Marakwet County, world-class Kenyan long-distance runners train at high altitudes, developing strong, efficient hearts with low resting heart rates.",
    didYouKnow: "An average human heart beats around 70 to 80 times per minute, pumping approximately 5 litres of blood every single minute!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u3-l2",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Blood Vessels & Components of Blood",
    summary: "Examine arteries, veins, and capillaries, alongside red blood cells, white blood cells, platelets, and plasma.",
    content: "Blood travels through a closed network of tubes called blood vessels. Arteries carry blood away from the heart under high pressure; they have thick, muscular, elastic walls and carry oxygenated blood (except the pulmonary artery). Veins carry blood back to the heart under low pressure; they have thinner walls, wide lumens, and internal valves to prevent backflow. Capillaries are tiny, microscopic vessels with one-cell-thick walls where exchange of gases, nutrients, and waste takes place between blood and body cells. Blood itself consists of liquid plasma (carrying dissolved food, hormones, and waste), red blood cells (containing haemoglobin to transport oxygen), white blood cells (fighting disease and pathogens), and platelets (tiny cell fragments that clot blood at cuts).",
    keyConcepts: ["Arteries", "Veins", "Capillaries", "Red Blood Cells (Haemoglobin)", "White Blood Cells", "Platelets", "Plasma"],
    kenyanContext: "Doctors at Kenyatta National Hospital emphasize regular physical exercise, avoiding smoking, and eating green vegetables like sukuma wiki and terere to keep blood vessels flexible and healthy.",
    didYouKnow: "If you stretched all blood vessels in a single human body end-to-end, they would stretch over 100,000 kilometres—enough to circle the Earth more than twice!",
    estimatedMinutes: 20
  },

  // Unit 4: Excretory System
  {
    id: "lesson-g6-sci-u4-l1",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "The Kidneys and the Urinary System",
    summary: "Understand how the kidneys filter metabolic waste from the bloodstream to form urine, and trace the path through ureters, bladder, and urethra.",
    content: "Excretion is the removal of metabolic waste products produced by cellular activities in the body. The urinary system is the main excretory organ for liquid nitrogenous waste. It consists of two bean-shaped kidneys located in the lower back, two tubes called ureters, a muscular storage sac called the urinary bladder, and a passage called the urethra. The kidneys continuously filter blood via millions of microscopic nephrons, removing urea, excess mineral salts, and excess water while reabsorbing useful glucose and water. The resulting waste liquid, called urine, flows through the ureters into the urinary bladder, where it is stored temporarily before being passed out through the urethra during urination.",
    keyConcepts: ["Excretion", "Kidneys", "Ureters", "Urinary Bladder", "Urethra", "Urea Filtration", "Hydration"],
    kenyanContext: "In hot, arid and semi-arid regions such as Garissa and Turkana, community health officers encourage drinking plenty of safe boiled water to prevent kidney stone formation and dehydration.",
    didYouKnow: "Each day, the kidneys filter about 180 litres of blood, but only about 1.5 litres leaves the body as urine because 99% of filtered fluid is reabsorbed back into the bloodstream!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u4-l2",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Skin and Lungs: Elimination and Homeostasis",
    summary: "Explore how the skin eliminates sweat through sweat glands to regulate temperature and excrete salts, and how the lungs excrete carbon dioxide and water vapour.",
    content: "Besides the kidneys, the skin and lungs are critical excretory organs. The skin has sweat glands located in the dermis layer that extract water, mineral salts, and trace amounts of urea from surrounding blood capillaries. This mixture, known as sweat, travels through sweat ducts and exits through sweat pores onto the skin surface. As sweat evaporates, it cools the body and rids it of excess salts. The lungs excrete gaseous waste produced during cellular respiration: carbon dioxide and water vapour. Blood brings deoxygenated blood rich in carbon dioxide from body tissues to the alveoli in the lungs, where carbon dioxide diffuses into the air sacs and is exhaled into the atmosphere.",
    keyConcepts: ["Skin Excretion", "Sweat Glands & Pores", "Evaporative Cooling", "Lungs Excretion", "Carbon Dioxide", "Water Vapour"],
    kenyanContext: "During hot sunny afternoons along the Kenyan coast in Mombasa or Kilifi, heavy sweating helps cool the body through evaporation, while learners replenish fluids with fresh madafu (coconut water).",
    didYouKnow: "Every time you breathe out, you lose not only carbon dioxide but also about 400 millilitres of water vapour every single day!",
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 3 & 4
const newMissions = [
  // Unit 3 Missions
  {
    id: "mission-g6-sci-u3-m1",
    title: "Heartbeat Quest: The Engine of Life",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 47,
    orderIndex: 47,
    description: "Step inside the cardiac laboratory with Dr. Omondi to examine the chambers, valves, and pumping rhythm of the human heart.",
    objectives: [
      "Identify the 4 chambers of the human heart",
      "Trace the pathway of oxygenated and deoxygenated blood",
      "Explain the function of heart valves and pulse rate"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Pumping Pioneer",
    badge: "Pumping Pioneer",
    questionIds: [
      "q-g6-sci-u3-001", "q-g6-sci-u3-002", "q-g6-sci-u3-003", "q-g6-sci-u3-004",
      "q-g6-sci-u3-005", "q-g6-sci-u3-006", "q-g6-sci-u3-007", "q-g6-sci-u3-008",
      "q-g6-sci-u3-009", "q-g6-sci-u3-010", "q-g6-sci-u3-011", "q-g6-sci-u3-012"
    ]
  },
  {
    id: "mission-g6-sci-u3-m2",
    title: "The Vascular Voyage: Vessels and Blood Components",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 48,
    orderIndex: 48,
    description: "Travel through arteries, capillaries, and veins to discover how red cells, white cells, platelets, and plasma keep Kenyans active and healthy.",
    objectives: [
      "Compare structural features of arteries, veins, and capillaries",
      "Identify functions of red blood cells, white blood cells, platelets, and plasma",
      "Recommend healthy lifestyle choices that prevent circulatory diseases"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Circulation Specialist",
    badge: "Circulation Specialist",
    questionIds: [
      "q-g6-sci-u3-013", "q-g6-sci-u3-014", "q-g6-sci-u3-015", "q-g6-sci-u3-016",
      "q-g6-sci-u3-017", "q-g6-sci-u3-018", "q-g6-sci-u3-019", "q-g6-sci-u3-020",
      "q-g6-sci-u3-021", "q-g6-sci-u3-022", "q-g6-sci-u3-023", "q-g6-sci-u3-024"
    ]
  },

  // Unit 4 Missions
  {
    id: "mission-g6-sci-u4-m1",
    title: "Renal Rangers: The Kidney Filtration Mission",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 49,
    orderIndex: 49,
    description: "Join Nurse Chebet at the renal station to investigate how the kidneys, ureters, bladder, and urethra cleanse blood of urea and waste.",
    objectives: [
      "Name the organs making up the human urinary system",
      "Describe how kidneys filter urea, salts, and excess water into urine",
      "Recognize the critical role of hydration in maintaining kidney function"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Master of Filtration",
    badge: "Master of Filtration",
    questionIds: [
      "q-g6-sci-u4-001", "q-g6-sci-u4-002", "q-g6-sci-u4-003", "q-g6-sci-u4-004",
      "q-g6-sci-u4-005", "q-g6-sci-u4-006", "q-g6-sci-u4-007", "q-g6-sci-u4-008",
      "q-g6-sci-u4-009", "q-g6-sci-u4-010", "q-g6-sci-u4-011", "q-g6-sci-u4-012"
    ]
  },
  {
    id: "mission-g6-sci-u4-m2",
    title: "Dermal & Respiratory Cleansers: Skin and Lungs in Action",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 50,
    orderIndex: 50,
    description: "Investigate sweat glands in the skin and alveoli in the lungs to uncover how our bodies eliminate salts, heat, and gaseous waste.",
    objectives: [
      "Describe how the skin excretes sweat to remove salts and cool the body",
      "Explain the role of the lungs in expelling carbon dioxide and moisture",
      "Demonstrate personal hygiene practices that support healthy skin and respiratory function"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Excretory Champion",
    badge: "Excretory Champion",
    questionIds: [
      "q-g6-sci-u4-013", "q-g6-sci-u4-014", "q-g6-sci-u4-015", "q-g6-sci-u4-016",
      "q-g6-sci-u4-017", "q-g6-sci-u4-018", "q-g6-sci-u4-019", "q-g6-sci-u4-020",
      "q-g6-sci-u4-021", "q-g6-sci-u4-022", "q-g6-sci-u4-023", "q-g6-sci-u4-024"
    ]
  }
];

// 4. Questions for Units 3 & 4
const newQuestions = [
  // --- UNIT 3: CIRCULATORY SYSTEM (Questions 1 to 24) ---
  // Lesson 1: Heart (001 - 012)
  {
    id: "q-g6-sci-u3-001",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following best describes the main function of the human heart?",
    options: [
      "Pumping blood continuously to all parts of the body",
      "Producing red and white blood cells",
      "Filtering urea and mineral salts from blood",
      "Absorbing digested food from the small intestine"
    ],
    correctAnswer: "Pumping blood continuously to all parts of the body",
    explanation: "The heart is a muscular organ whose primary role is to pump blood continuously throughout the body, providing oxygen and nutrients to tissues.",
    socraticHint: "Think about what muscular organ acts as a double pump creating blood pressure.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-002",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How many chambers does the human heart have?",
    options: [
      "Four chambers (two atria and two ventricles)",
      "Two chambers (one atrium and one ventricle)",
      "Three chambers (two atria and one ventricle)",
      "Six chambers (three atria and three ventricles)"
    ],
    correctAnswer: "Four chambers (two atria and two ventricles)",
    explanation: "The human heart has four distinct chambers: the right and left atria (upper receiving chambers) and the right and left ventricles (lower pumping chambers).",
    socraticHint: "Count the two upper chambers and two lower chambers that make up the heart.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-003",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which chamber of the heart has the thickest and most muscular wall, and why?",
    options: [
      "The left ventricle, because it pumps blood under high pressure to the entire body",
      "The right ventricle, because it pumps blood only to the nearby lungs",
      "The right atrium, because it receives blood from all body veins",
      "The left atrium, because it stores blood coming directly from the lungs"
    ],
    correctAnswer: "The left ventricle, because it pumps blood under high pressure to the entire body",
    explanation: "The left ventricle must pump blood throughout the systemic circulation to the farthest parts of the body (head, arms, legs), requiring much thicker muscular walls.",
    socraticHint: "Consider which chamber has to generate enough force to push blood all the way from head to toe.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-004",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the crucial role of the valves found inside the human heart?",
    options: [
      "Preventing the backflow of blood, keeping it moving in one direction",
      "Filtering germs and bacteria from the bloodstream",
      "Increasing the oxygen content of deoxygenated blood",
      "Producing blood platelets for wound healing"
    ],
    correctAnswer: "Preventing the backflow of blood, keeping it moving in one direction",
    explanation: "Heart valves act as one-way gates that open to let blood pass forward and snap shut to prevent blood from flowing backwards.",
    socraticHint: "Think of a one-way flap valve on a bicycle pump or water pump.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-005",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which side of the human heart carries deoxygenated (oxygen-poor) blood?",
    options: [
      "The right side (right atrium and right ventricle)",
      "The left side (left atrium and left ventricle)",
      "Both upper atria only",
      "Both lower ventricles only"
    ],
    correctAnswer: "The right side (right atrium and right ventricle)",
    explanation: "The right side of the heart receives oxygen-depleted blood from body organs via the vena cava and sends it to the lungs for replenishment.",
    socraticHint: "Which side of the heart directs blood towards the pulmonary artery into the lungs?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-006",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Where does the right ventricle pump deoxygenated blood to?",
    options: [
      "To the lungs via the pulmonary artery",
      "To the brain via the carotid artery",
      "To the kidneys via the renal artery",
      "To the liver via the hepatic portal vein"
    ],
    correctAnswer: "To the lungs via the pulmonary artery",
    explanation: "The right ventricle pumps blood through the pulmonary artery to the lungs, where carbon dioxide is unloaded and fresh oxygen is absorbed.",
    socraticHint: "Where does deoxygenated blood need to go to pick up fresh oxygen?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-007",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "During a physical education lesson in Eldoret, Wanjiku counted her pulse rate before and after running. Why did her pulse rate increase after running?",
    options: [
      "Her muscles required more oxygen and energy, so her heart pumped faster",
      "Her body temperature dropped, requiring faster blood flow to stay warm",
      "Her lungs stopped breathing, forcing the heart to work alone",
      "Her blood vessels narrowed completely to stop blood circulation"
    ],
    correctAnswer: "Her muscles required more oxygen and energy, so her heart pumped faster",
    explanation: "During vigorous exercise, active muscle tissues consume more oxygen and glucose for cellular respiration, prompting the heart to beat faster to supply them.",
    socraticHint: "What do working muscle cells consume rapidly during strenuous exercise?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-008",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which blood vessel brings oxygen-rich blood from the lungs into the left atrium of the heart?",
    options: [
      "Pulmonary vein",
      "Aorta",
      "Vena cava",
      "Pulmonary artery"
    ],
    correctAnswer: "Pulmonary vein",
    explanation: "The pulmonary vein is unique because it is a vein that carries oxygenated blood from the lungs directly into the left atrium of the heart.",
    socraticHint: "Which vessel leads from the lungs (pulmonary) back towards the heart?",
    points: 10,
    difficulty: "HARD",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-009",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the wall of tissue that separates the left and right sides of the heart called?",
    options: [
      "Septum",
      "Pericardium",
      "Aorta",
      "Tendon"
    ],
    correctAnswer: "Septum",
    explanation: "The septum is the central muscular dividing wall that prevents oxygenated blood on the left side from mixing with deoxygenated blood on the right side.",
    socraticHint: "What is the anatomical divider that keeps clean and unoxygenated blood separate in the heart?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-010",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is the main artery that carries oxygen-rich blood out of the left ventricle to the rest of the body?",
    options: [
      "Aorta",
      "Pulmonary artery",
      "Vena cava",
      "Coronary vein"
    ],
    correctAnswer: "Aorta",
    explanation: "The aorta is the largest and main artery in the human body, leaving the left ventricle to supply oxygenated blood to all systemic organs.",
    socraticHint: "Name the largest artery in the human body that arches over the heart.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-011",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which instrument does a doctor at Machakos Level 5 Hospital use to listen to heartbeats and lung sounds?",
    options: [
      "Stethoscope",
      "Clinical thermometer",
      "Microscope",
      "Barometer"
    ],
    correctAnswer: "Stethoscope",
    explanation: "A stethoscope is an acoustic medical device used by healthcare professionals to listen to internal sounds, especially heartbeats and breathing.",
    socraticHint: "Which medical tool has earpieces and a chest piece to amplify heart sounds?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-012",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Where can a Grade 6 learner most easily feel their pulse on their body?",
    options: [
      "At the radial artery on the wrist and the carotid artery on the neck",
      "On the kneecap and elbow joint",
      "On the fingernails and toenails",
      "On the middle of the stomach"
    ],
    correctAnswer: "At the radial artery on the wrist and the carotid artery on the neck",
    explanation: "The pulse is easily detected where arteries run close to the surface over a bone, notably the radial artery at the base of the thumb on the wrist and the carotid artery on the side of the neck.",
    socraticHint: "Where do you gently press with two fingers on your wrist or neck to feel rhythmic heart pulses?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Blood Vessels and Blood Components (013 - 024)
  {
    id: "q-g6-sci-u3-013",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following correctly pairs a blood vessel type with its key structural characteristic?",
    options: [
      "Artery – thick muscular and elastic walls to withstand high blood pressure",
      "Vein – thickest walls without any internal valves",
      "Capillary – large wide lumen with thick fibrous exterior",
      "Artery – microscopic one-cell-thick walls for substance diffusion"
    ],
    correctAnswer: "Artery – thick muscular and elastic walls to withstand high blood pressure",
    explanation: "Arteries carry high-pressure blood pumped straight out of the ventricles, so they have thick, muscular, and elastic walls.",
    socraticHint: "Which vessels must withstand the powerful surge of blood pumped directly from the heart?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-014",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why do veins possess internal valves while normal arteries do not?",
    options: [
      "To prevent the backflow of slow-moving blood flowing under low pressure",
      "To speed up the blood so it moves faster than arterial blood",
      "To filter white blood cells out of circulation",
      "To absorb carbon dioxide directly from muscle tissues"
    ],
    correctAnswer: "To prevent the backflow of slow-moving blood flowing under low pressure",
    explanation: "Because blood in veins is under low pressure and often flows against gravity towards the heart, pocket valves ensure it flows in only one direction without backsliding.",
    socraticHint: "What stops blood in your leg veins from flowing downwards under the pull of gravity?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-015",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which type of blood vessel is microscopic and has walls that are only one cell thick to allow diffusion of nutrients and oxygen?",
    options: [
      "Capillaries",
      "Main arteries",
      "Large veins",
      "Vena cava"
    ],
    correctAnswer: "Capillaries",
    explanation: "Capillaries are the microscopic vessels connecting arterioles and venules; their one-cell-thick walls provide a short diffusion distance for gases and nutrients.",
    socraticHint: "Which vessels form fine webs inside body tissues where exchange takes place?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-016",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the primary function of red blood cells in the human body?",
    options: [
      "Transporting oxygen from the lungs to all body tissues using haemoglobin",
      "Engulfing disease-causing bacteria and viruses",
      "Clotting blood at wound openings to prevent bleeding",
      "Dissolving and carrying food nutrients in a yellowish liquid"
    ],
    correctAnswer: "Transporting oxygen from the lungs to all body tissues using haemoglobin",
    explanation: "Red blood cells contain haemoglobin, an iron-rich protein that binds to oxygen in the lungs and delivers it to body cells for cellular respiration.",
    socraticHint: "Which blood cells have an iron-containing red pigment that binds with oxygen?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-017",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which component of blood acts as the body's defense soldiers by defending against pathogens and infections?",
    options: [
      "White blood cells",
      "Red blood cells",
      "Blood platelets",
      "Plasma liquid"
    ],
    correctAnswer: "White blood cells",
    explanation: "White blood cells (leukocytes) protect the body against infectious diseases and foreign invaders by ingesting bacteria or producing antibodies.",
    socraticHint: "Which blood cells multiply when the body is fighting an infection?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-018",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When Juma accidentally cut his finger while peeling sugarcane, the bleeding stopped after a few minutes forming a dark scab. Which blood component caused this clotting?",
    options: [
      "Blood platelets",
      "Red blood cells",
      "Plasma proteins",
      "White blood cells"
    ],
    correctAnswer: "Blood platelets",
    explanation: "Platelets (thrombocytes) are cell fragments that stick together and form a mesh-like clot at damaged blood vessels, stopping blood loss.",
    socraticHint: "What cellular fragments trigger blood clotting and scab formation at a cut?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-019",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is blood plasma primarily composed of?",
    options: [
      "About 90% water containing dissolved nutrients, salts, hormones, and waste",
      "Solid packed protein fibres with no liquid content",
      "Pure mineral oil that lubricates blood vessel walls",
      "Pure haemoglobin crystals floating freely"
    ],
    correctAnswer: "About 90% water containing dissolved nutrients, salts, hormones, and waste",
    explanation: "Plasma is the pale yellowish liquid portion of blood; it is roughly 90% water and carries dissolved glucose, amino acids, carbon dioxide, urea, and hormones.",
    socraticHint: "Think about the straw-coloured liquid base of blood that dissolves and carries nutrients.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-020",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A learner in Kisumu feels dizzy, tired, and pale. A clinical test shows a deficiency of iron and low red blood cells. Which condition does this learner have?",
    options: [
      "Anaemia",
      "Hypertension",
      "Rickets",
      "Scurvy"
    ],
    correctAnswer: "Anaemia",
    explanation: "Anaemia is a condition characterized by a deficiency of red blood cells or haemoglobin, often caused by lack of dietary iron, leading to fatigue and pallor.",
    socraticHint: "Which blood deficiency condition causes paleness and low oxygen carriage due to lack of iron?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-021",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following local Kenyan foods is richest in iron and helps the body produce healthy red blood cells?",
    options: [
      "Dark green leafy vegetables like spinach, managu, and liver",
      "White bread, soda, and sweet biscuits",
      "Raw cassava, white rice, and maize starch",
      "Pineapple juice and sugar crystals"
    ],
    correctAnswer: "Dark green leafy vegetables like spinach, managu, and liver",
    explanation: "Dark green leafy vegetables (spinach, managu, terere, kunde) and liver are rich in iron, which is essential for synthesis of haemoglobin in red blood cells.",
    socraticHint: "Which traditional leafy greens and organ meats provide rich iron supplies?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-022",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is tobacco smoking particularly dangerous to the human circulatory system?",
    options: [
      "It damages blood vessel walls, increases plaque deposits, and raises heart attack risk",
      "It immediately destroys all red blood cells within seconds",
      "It makes blood completely freeze in the capillary beds",
      "It turns blood plasma into pure stomach acid"
    ],
    correctAnswer: "It damages blood vessel walls, increases plaque deposits, and raises heart attack risk",
    explanation: "Cigarette smoke contains nicotine and carbon monoxide, which damage vessel lining, cause narrowing of arteries (arteriosclerosis), and elevate blood pressure.",
    socraticHint: "Consider how harmful chemicals in smoke affect the elasticity of arterial walls and heart strain.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-023",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which blood vessel carries deoxygenated blood from the upper parts of the body (head and arms) into the right atrium?",
    options: [
      "Superior vena cava",
      "Inferior vena cava",
      "Pulmonary vein",
      "Renal artery"
    ],
    correctAnswer: "Superior vena cava",
    explanation: "The superior vena cava collects deoxygenated blood from the upper body (head, neck, and upper limbs) and empties it into the right atrium.",
    socraticHint: "Which major vein collects blood from the superior (upper) body region?",
    points: 10,
    difficulty: "HARD",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u3-024",
    subStrandId: "substrand-g6-sci-u3",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following habits best promotes long-term heart and circulatory health?",
    options: [
      "Engaging in regular aerobic physical exercise and eating a balanced low-fat diet",
      "Eating foods high in deep-fried animal fats every single day",
      "Avoiding all physical exercise to prevent the heart from beating fast",
      "Consuming large amounts of table salt and sugary soft drinks"
    ],
    correctAnswer: "Engaging in regular aerobic physical exercise and eating a balanced low-fat diet",
    explanation: "Regular exercise strengthens the heart muscle and keeps arteries clear, while a diet low in saturated fat and salt prevents arterial blockage and hypertension.",
    socraticHint: "Which healthy combination strengthens the heart muscle and keeps blood vessels flexible?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // --- UNIT 4: EXCRETORY SYSTEM (Questions 25 to 48) ---
  // Lesson 1: Kidneys and Urinary System (001 - 012)
  {
    id: "q-g6-sci-u4-001",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the scientific definition of excretion in living human beings?",
    options: [
      "The removal of harmful metabolic waste products produced by chemical reactions in body cells",
      "The expulsion of undigested food remains through the anus (egestion)",
      "The process of breaking down large food particles into soluble nutrients",
      "The uptake of oxygen from the atmosphere into the bloodstream"
    ],
    correctAnswer: "The removal of harmful metabolic waste products produced by chemical reactions in body cells",
    explanation: "Excretion is specifically the removal of metabolic wastes (such as urea, carbon dioxide, excess salts) resulting from chemical activities inside living cells.",
    socraticHint: "Recall that excretion deals with wastes produced inside cells by metabolism, unlike egestion of undigested food.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-002",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What shape do the human kidneys possess, and where are they located?",
    options: [
      "Bean-shaped, located on either side of the spine in the lower back region",
      "Triangle-shaped, located inside the skull behind the eyes",
      "Round balloon-shaped, located in the middle of the chest cavity",
      "Flat plate-shaped, located inside the pelvic hip joints"
    ],
    correctAnswer: "Bean-shaped, located on either side of the spine in the lower back region",
    explanation: "Human kidneys are two reddish-brown, bean-shaped organs positioned against the back abdominal wall on either side of the vertebral column.",
    socraticHint: "Think of the common Kenyan legume that looks just like a miniature kidney.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-003",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following lists the correct pathway of urine from formation to expulsion from the body?",
    options: [
      "Kidneys -> Ureters -> Urinary Bladder -> Urethra",
      "Kidneys -> Urethra -> Urinary Bladder -> Ureters",
      "Urinary Bladder -> Kidneys -> Ureters -> Urethra",
      "Ureters -> Kidneys -> Urethra -> Urinary Bladder"
    ],
    correctAnswer: "Kidneys -> Ureters -> Urinary Bladder -> Urethra",
    explanation: "Urine is formed in the kidneys, travels down two ureters, is collected in the urinary bladder, and is discharged through the urethra.",
    socraticHint: "Trace the flow: first the filtering organ, then the twin tubes, the storage sac, and finally the exit canal.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-004",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What are the two narrow muscular tubes that carry urine from the kidneys down to the urinary bladder called?",
    options: [
      "Ureters",
      "Urethra",
      "Bronchi",
      "Capillaries"
    ],
    correctAnswer: "Ureters",
    explanation: "The ureters are the two ducts through which urine passes from each kidney to the urinary bladder.",
    socraticHint: "Look at the spelling: which tube has two copies (one from each kidney)?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-005",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the primary function of the urinary bladder?",
    options: [
      "Temporarily storing urine until it is excreted during urination",
      "Filtering blood to remove nitrogenous urea crystals",
      "Producing bile to break down fats from lunch",
      "Absorbing water and nutrients into the bloodstream"
    ],
    correctAnswer: "Temporarily storing urine until it is excreted during urination",
    explanation: "The urinary bladder is an expandable muscular sac that holds urine until the person feels the urge to urinate.",
    socraticHint: "What happens to urine before you feel the need to visit the washroom?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-006",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which blood vessel brings unfiltered, waste-carrying blood from the aorta into each kidney?",
    options: [
      "Renal artery",
      "Renal vein",
      "Pulmonary vein",
      "Hepatic portal vein"
    ],
    correctAnswer: "Renal artery",
    explanation: "The renal artery branches from the aorta to deliver blood containing urea and metabolic wastes into the kidney for filtration.",
    socraticHint: "What word refers to 'kidney' (renal) and carries blood away from the heart into an organ?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-007",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which blood vessel carries cleaned and filtered blood from the kidneys back into the vena cava?",
    options: [
      "Renal vein",
      "Renal artery",
      "Pulmonary artery",
      "Aorta"
    ],
    correctAnswer: "Renal vein",
    explanation: "Once blood is filtered in the kidneys, the purified blood exits through the renal vein and joins the inferior vena cava.",
    socraticHint: "Which vessel carries blood away from the kidney back towards the heart?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-008",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What nitrogenous waste substance is formed in the liver from excess amino acids and excreted mainly by the kidneys?",
    options: [
      "Urea",
      "Carbon dioxide",
      "Glucose",
      "Haemoglobin"
    ],
    correctAnswer: "Urea",
    explanation: "Excess protein and amino acids are deaminated in the liver to form urea, a toxic waste that is filtered from blood by the kidneys.",
    socraticHint: "Which toxic chemical gives urine its name and is derived from broken down proteins?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-009",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens to the appearance and volume of urine when a person does not drink enough water on a hot day in Garissa?",
    options: [
      "Urine becomes concentrated, dark yellow in colour, and reduced in volume",
      "Urine becomes clear, colourless, and very large in volume",
      "Urine turns completely solid and blocks the ureter",
      "No urine is produced and blood stops circulating completely"
    ],
    correctAnswer: "Urine becomes concentrated, dark yellow in colour, and reduced in volume",
    explanation: "When dehydrated, the kidneys reabsorb almost all water back into the blood to conserve body hydration, producing concentrated, darker yellow urine in smaller amounts.",
    socraticHint: "How do your kidneys conserve water when you are thirsty on a hot afternoon?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-010",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is a dangerous practice that can cause damage or infection to the urinary system?",
    options: [
      "Holding in urine for excessively long periods and not drinking adequate clean water",
      "Drinking 6 to 8 glasses of clean boiled water every day",
      "Washing hands before and after visiting the latrine",
      "Eating fresh fruits and leafy vegetables daily"
    ],
    correctAnswer: "Holding in urine for excessively long periods and not drinking adequate clean water",
    explanation: "Holding urine too long stretches the bladder, encourages bacterial growth causing urinary tract infections (UTIs), and strains the kidneys.",
    socraticHint: "What happens when someone delays going to the toilet and neglects drinking water?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-011",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What medical treatment is used when a patient's kidneys fail completely and can no longer filter waste products from their blood?",
    options: [
      "Kidney dialysis (using an artificial kidney machine)",
      "Blood transfusion to replace all blood",
      "Taking painkiller tablets daily",
      "Drinking fizzy soda to wash out the stomach"
    ],
    correctAnswer: "Kidney dialysis (using an artificial kidney machine)",
    explanation: "Kidney dialysis uses an external machine with a semi-permeable membrane to filter toxins, excess salts, and fluid from a patient's blood when their kidneys fail.",
    socraticHint: "What machine-based hospital treatment performs the filtering work of failed kidneys?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-012",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What single habit is the most effective daily way to maintain healthy kidney function in school children?",
    options: [
      "Drinking plenty of safe, clean drinking water throughout the day",
      "Consuming large spoonfuls of raw table salt with meals",
      "Drinking energy drinks and heavy sugary tea",
      "Avoiding water during playtime to prevent sweating"
    ],
    correctAnswer: "Drinking plenty of safe, clean drinking water throughout the day",
    explanation: "Drinking adequate clean water allows the kidneys to dilute and easily flush out metabolic wastes and prevents the formation of painful kidney stones.",
    socraticHint: "What essential clear fluid helps the kidneys flush out waste easily?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Skin and Lungs (013 - 024)
  {
    id: "q-g6-sci-u4-013",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which structures in the skin are responsible for producing and secreting sweat?",
    options: [
      "Sweat glands",
      "Hair follicles",
      "Nerve endings",
      "Fat cells"
    ],
    correctAnswer: "Sweat glands",
    explanation: "Sweat glands are coiled tubular glands situated in the dermis layer of the skin that extract water and dissolved salts from blood to produce sweat.",
    socraticHint: "Which coiled glands beneath the skin produce moisture during hot weather?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-014",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What are the main excretory substances found in human sweat?",
    options: [
      "Water, mineral salts (sodium chloride), and traces of urea",
      "Pure glucose, blood platelets, and carbon dioxide",
      "Undigested starch and cooking fat",
      "Bile pigments and red blood cells"
    ],
    correctAnswer: "Water, mineral salts (sodium chloride), and traces of urea",
    explanation: "Sweat consists mainly of water (over 99%) along with dissolved mineral salts (mostly sodium chloride) and tiny traces of urea.",
    socraticHint: "Think about why sweat tastes salty and is mostly liquid water.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-015",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does sweating help to cool down the body on a scorching hot day at the coast in Mombasa?",
    options: [
      "As sweat evaporates from the skin surface, it absorbs latent heat from the body",
      "Sweat blocks sunlight from reaching the skin cells completely",
      "Cold water from the air condenses onto the skin to freeze it",
      "Sweat pumps cool air directly into the bloodstream"
    ],
    correctAnswer: "As sweat evaporates from the skin surface, it absorbs latent heat from the body",
    explanation: "Evaporative cooling occurs when liquid sweat turns into water vapour; the heat energy required for this phase change is drawn from the skin, lowering body temperature.",
    socraticHint: "What happens when liquid on your skin turns into vapour in a breeze?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-016",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Through which tiny openings on the skin surface does sweat pass out into the surrounding air?",
    options: [
      "Sweat pores",
      "Stomata",
      "Lenticels",
      "Alveoli"
    ],
    correctAnswer: "Sweat pores",
    explanation: "Sweat ducts travel from the dermis to the epidermal surface, opening up as tiny microscopic openings called sweat pores.",
    socraticHint: "What are the tiny holes on human skin called, in contrast to stomata on plant leaves?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-017",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which two main excretory waste products are expelled from the human body through the lungs?",
    options: [
      "Carbon dioxide and water vapour",
      "Urea and mineral salts",
      "Oxygen and nitrogen gas",
      "Liquid urine and sweat"
    ],
    correctAnswer: "Carbon dioxide and water vapour",
    explanation: "During exhalation, the lungs expel carbon dioxide produced by cellular respiration along with moisture (water vapour).",
    socraticHint: "What gas and what moisture mist do you breathe out onto a cold mirror?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-018",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In which microscopic air sacs inside the lungs does the exchange of gases take place between blood and air?",
    options: [
      "Alveoli",
      "Bronchi",
      "Trachea",
      "Diaphragm"
    ],
    correctAnswer: "Alveoli",
    explanation: "The alveoli are tiny balloon-like air sacs surrounded by dense capillary networks where oxygen diffuses into blood and carbon dioxide diffuses out to be exhaled.",
    socraticHint: "Name the tiny cluster of grape-like air sacs at the ends of bronchioles.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-019",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When Grade 6 pupils blow air through a drinking straw into clear limewater during a science experiment, the limewater turns milky white. What does this test prove?",
    options: [
      "Exhaled air contains carbon dioxide gas",
      "Exhaled air is completely made of pure oxygen",
      "Limewater turns white when touching water vapour alone",
      "Human breath contains dissolved sugar crystals"
    ],
    correctAnswer: "Exhaled air contains carbon dioxide gas",
    explanation: "Clear limewater (calcium hydroxide solution) reacts with carbon dioxide gas to form an insoluble white precipitate of calcium carbonate, turning the liquid milky.",
    socraticHint: "What specific gas reacts with clear limewater to make it cloudy or milky?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-020",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is taking a daily bath with clean water and soap important for skin health and excretion?",
    options: [
      "It washes away dried sweat, salt crystals, and dirt that can block sweat pores",
      "It dissolves all skin cells so new ones can grow immediately",
      "It stops the body from ever producing sweat again",
      "It turns the skin completely waterproof against any moisture"
    ],
    correctAnswer: "It washes away dried sweat, salt crystals, and dirt that can block sweat pores",
    explanation: "Bathing removes accumulated sebum, dried sweat salts, dead skin cells, and bacteria, preventing blocked pores, boils, rashes, and unpleasant body odour.",
    socraticHint: "What would happen to your sweat pores if accumulated sweat, oil, and dust were never washed off?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-021",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does inhaling smoke from poorly ventilated indoor firewood jikos or tobacco smoke damage the excretory role of the lungs?",
    options: [
      "It coats and damages the delicate alveoli, reducing gas exchange efficiency",
      "It turns the trachea into a solid bone structure",
      "It causes the lungs to pump blood backwards to the stomach",
      "It completely converts lung tissue into kidney nephrons"
    ],
    correctAnswer: "It coats and damages the delicate alveoli, reducing gas exchange efficiency",
    explanation: "Inhaling soot, particulate matter, and tobacco smoke coats and scars the alveolar membranes, impairing oxygen uptake and carbon dioxide elimination.",
    socraticHint: "Think of what soot and smoke do to delicate air sacs inside the respiratory system.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-022",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following organs is correctly matched with the excretory waste it eliminates from the human body?",
    options: [
      "Lungs – Carbon dioxide and water vapour",
      "Kidneys – Undigested roughage and cellulose",
      "Skin – Large amounts of pure bile pigments",
      "Heart – Urea and uric acid crystals"
    ],
    correctAnswer: "Lungs – Carbon dioxide and water vapour",
    explanation: "The lungs excrete carbon dioxide and water vapour. Kidneys excrete urine (urea, salts, water). Skin excretes sweat (water, salts, trace urea).",
    socraticHint: "Review which organ handles gaseous metabolic waste products.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-023",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens to the rate of breathing and carbon dioxide excretion when a learner plays football during games time in Nakuru?",
    options: [
      "Breathing rate increases to remove high amounts of carbon dioxide produced by muscle cells",
      "Breathing rate decreases because the body needs to store carbon dioxide",
      "Breathing stops temporarily until the game is finished",
      "The skin begins inhaling carbon dioxide to help the lungs"
    ],
    correctAnswer: "Breathing rate increases to remove high amounts of carbon dioxide produced by muscle cells",
    explanation: "During physical exertion, cells produce carbon dioxide rapidly via cellular respiration; the brain detects increased blood carbon dioxide and accelerates breathing to expel it.",
    socraticHint: "Why do we breathe much faster and deeper when running or playing sports?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u4-024",
    subStrandId: "substrand-g6-sci-u4",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following actions shows responsible personal care for both the skin and the respiratory system?",
    options: [
      "Wearing clean breathable cotton clothes, exercising in fresh clean air, and bathing regularly",
      "Applying thick industrial motor oil on skin and staying near burning plastic fumes",
      "Avoiding water completely to prevent sweating and holding breath for hours",
      "Covering all skin in airtight polythene bags during sports activities"
    ],
    correctAnswer: "Wearing clean breathable cotton clothes, exercising in fresh clean air, and bathing regularly",
    explanation: "Clean breathable clothing allows sweat evaporation, fresh clean air protects alveoli from toxic pollutants, and daily washing prevents skin infections.",
    socraticHint: "Choose the positive health combination that supports natural breathing and skin hygiene.",
    points: 10,
    difficulty: "EASY",
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

console.log('Batch 2 of Grade 6 Science and Technology successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
