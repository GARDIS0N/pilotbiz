import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 English Language Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-eng-u7',
    strandId: 'strand-g6-eng-writing',
    learningAreaId: 'la-english-g6',
    title: 'Agriculture, Agro-Processing, Horticultural Exports & Active/Passive Voice',
    description: 'Exploring modern agricultural enterprise (Hass avocado exports, Kericho tea processing, drip irrigation, value addition); writing procedural manuals and agribusiness logs; mastering structural transformations between Active and Passive Voice across various tenses; and applying agent phrases appropriately.',
    cbeCompetency: 'Agribusiness technical vocabulary, procedural sequence writing, and active-to-passive voice grammatical transformations',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g6-eng-u8',
    strandId: 'strand-g6-eng-grammar',
    learningAreaId: 'la-english-g6',
    title: 'Governance, Child Rights (Kenyan Constitution 2010) & Reported Speech',
    description: 'Understanding democratic governance, devolution, Chapter Six integrity, and children\'s rights under Article 53 of the Constitution of Kenya 2010; mastering quotation mark punctuation in direct speech; and executing accurate transformations into indirect (reported) speech with grammatical backshifting and pronoun adjustments.',
    cbeCompetency: 'Civic literacy, child advocacy communication, direct quotation mechanics, and reported speech syntactic mastery',
    estimatedMinutes: 30,
    order: 8
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 4 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-eng-u7-l1',
    subStrandId: 'substrand-g6-eng-u7',
    title: 'Kenyan Agro-Processing, Horticultural Exports & Procedural Writing',
    content: 'Agriculture is the backbone of Kenya\'s economy, sustaining millions of livelihoods.\n\n1. Essential Agribusiness & Processing Vocabulary:\n- Agro-processing: Transforming raw farm produce into packaged, refined, or shelf-stable commercial goods (e.g., drying mangoes in Kitui, pasteurizing dairy milk in Nyandarua).\n- Horticulture: The science and enterprise of cultivating fruits, vegetables, flowers, and ornamental plants.\n- Value addition: Enhancing the economic value of raw agricultural goods before export (e.g., grading, vacuum packing, roasting macadamia nuts).\n- Perishable: Goods subject to rapid decay unless preserved through cold chain logistics.\n\n2. Features of Procedural Texts:\n- Purpose: Explains systematically how to perform a task, cultivate a crop, or manufacture a product.\n- Structure: Goal/Title -> Requirements/Materials -> Chronological Step-by-Step Instructions.\n- Language: Imperative action verbs ("Pluck", "Aerate", "Sterilize"), exact measurements, and sequential connectors ("First", "Next", "Subsequently", "Eventually").\n\n3. Agribusiness Phrasal Verbs:\n- "Weed out": Remove substandard or undesirable elements.\n- "Scale up": Expand operational capacity or production.\n- "Branch out": Diversify into new agricultural ventures.',
    didYouKnow: 'Kenya is the largest exporter of black tea in the world and ranks among Africa\'s top exporters of fresh avocados and cut flowers!',
    kenyanContext: 'Farmer cooperatives in Murang\'a harvest Hass avocados, wash them in ozone-treated water, and package them into barcoded cartons for direct shipment to European supermarkets.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u7-l2',
    subStrandId: 'substrand-g6-eng-u7',
    title: 'Active and Passive Voice Transformation Across Tenses',
    content: 'Voice indicates whether the grammatical subject of a sentence performs or receives the action.\n\n1. Active Voice:\n- The subject performs the action.\n- Pattern: Subject (Doer) + Verb + Object (Receiver).\n- Example: "The farmers harvest ripe Hass avocados."\n\n2. Passive Voice:\n- The receiver of the action becomes the subject.\n- Pattern: Object + Auxiliary (appropriate form of "to be") + Past Participle (V3) + [by + Agent].\n- Example: "Ripe Hass avocados are harvested by the farmers."\n\n3. Tense Conversions:\n- Present Simple: "plucks" -> "is/are plucked"\n  * Active: "Tea pickers pluck two leaves and a bud."\n  * Passive: "Two leaves and a bud are plucked by tea pickers."\n- Present Continuous: "is/are planting" -> "is/are being planted"\n  * Active: "The agronomist is planting grafted seedlings."\n  * Passive: "Grafted seedlings are being planted by the agronomist."\n- Past Simple: "inspected" -> "was/were inspected"\n  * Active: "KEPHIS officials inspected the export container."\n  * Passive: "The export container was inspected by KEPHIS officials."\n- Present Perfect: "has/have harvested" -> "has/have been harvested"\n  * Active: "The cooperative has processed five tonnes of tea."\n  * Passive: "Five tonnes of tea have been processed by the cooperative."\n- Future Simple: "will irrigate" -> "will be irrigated"\n  * Active: "Solar pumps will irrigate the tomato fields."\n  * Passive: "The tomato fields will be irrigated by solar pumps."\n\n4. Agent Omission:\n- The agent ("by someone") is omitted when the doer is obvious, unknown, or unimportant.\n- Example: "The farm tools were stored in the shed overnight."',
    didYouKnow: 'In scientific research and factory procedural documentation, the passive voice is frequently preferred because the focus is strictly on the objective process rather than the individual performing it!',
    kenyanContext: 'KTDA quality control manuals state: "The green leaf is weighed and withered before it is macerated in the processing machines."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u8-l1',
    subStrandId: 'substrand-g6-eng-u8',
    title: 'Devolution, Child Rights in the Constitution of Kenya 2010 & Civic Debate',
    content: 'The Constitution of Kenya 2010 is the supreme law of the land, upholding justice, equality, and human dignity.\n\n1. Key Constitutional & Governance Concepts:\n- Devolution: Decentralization of sovereign powers and national revenue to 47 County Governments to bring services closer to grassroots citizens.\n- Chapter Six (Leadership and Integrity): Establishes stringent ethical guidelines requiring public officers to demonstrate honesty, selfless service, and financial accountability.\n- Civic Duty: The responsibility of citizens to obey laws, protect public property, participate in governance, and defend democratic freedoms.\n\n2. Article 53 – The Rights of the Child:\n- Right to a name and nationality from birth.\n- Right to free and compulsory basic education.\n- Right to basic nutrition, shelter, and medical healthcare.\n- Right to protection from abuse, neglect, harmful traditional practices, and exploitative child labour.\n- The best interests of the child are of paramount importance in every matter concerning the child.\n\n3. Formal Debate Registers:\n- Courteous address: "Mr. Speaker, Sir", "Honourable members of the assembly", "Esteemed delegates".\n- Articulating rebuttal: "While I acknowledge the points raised by the opposing side, evidence demonstrates that..."',
    didYouKnow: 'Article 53 of Kenya\'s 2010 Constitution specifically states that a child\'s best interests are of paramount importance in every matter concerning the child!',
    kenyanContext: 'Pupils at Olympic Primary in Kibera stage mock parliamentary debates where student leaders debate policies on school environmental stewardship and child protection.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u8-l2',
    subStrandId: 'substrand-g6-eng-u8',
    title: 'Direct Speech Punctuation & Indirect (Reported) Speech Transformation',
    content: 'Direct speech quotes exact spoken words, while reported speech conveys the meaning without verbatim repetition.\n\n1. Direct Speech Punctuation:\n- Enclose exact spoken words within quotation marks ("...").\n- Capitalize the initial word inside quotation marks.\n- Place commas, full stops, or question marks inside the closing quotation mark.\n- Example: The senator declared, "Every child deserves quality schooling."\n\n2. Reported Speech (Indirect Speech):\n- Remove quotation marks and introduce statements with "that" (optional in informal speech).\n- Backshift tenses when the reporting verb is in past tense ("said", "stated", "explained"):\n  * Present Simple -> Past Simple: "I respect the law" -> He said that he respected the law.\n  * Present Continuous -> Past Continuous: "We are debating the bill" -> They said they were debating the bill.\n  * Present Perfect -> Past Perfect: "The council has voted" -> She said the council had voted.\n  * Past Simple -> Past Perfect: "The committee visited the ward" -> He said that the committee had visited the ward.\n  * Modals: will -> would, can -> could, may -> might, must -> had to.\n\n3. Shifts in Pronouns, Time & Place Adverbs:\n- "today" -> "that day"\n- "tomorrow" -> "the next day / the following day"\n- "yesterday" -> "the previous day / the day before"\n- "now" -> "then"\n- "here" -> "there"\n- "this / these" -> "that / those"\n\n4. Reporting Commands and Requests:\n- Use "to + infinitive":\n- Direct: "Protect public resources," urged the chief.\n- Reported: The chief urged the citizens to protect public resources.',
    didYouKnow: 'If a direct statement conveys a universal scientific truth (e.g., "The sun rises in the east"), the verb tense remains in present simple even in reported speech!',
    kenyanContext: 'Official parliamentary Hansard reporters record speeches by changing: "I will table the Child Protection Bill tomorrow," into: "The Cabinet Secretary stated that she would table the Child Protection Bill the following day."',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(les => {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
});

// 3. Batch 4 Missions (4 missions: Orders 134 to 137)
const missionsToAdd = [
  {
    id: 'mission-g6-eng-u7-m1',
    worldId: 'world-word-quest',
    title: 'Mission 134: Harvest to Export – Agricultural Writing',
    description: 'Master agricultural vocabulary, procedural sequence transitions, and agro-processing logs from Kenyan tea estates to avocado orchards.',
    order: 134,
    orderIndex: 134,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-agritech',
    badge: 'badge-g6-eng-agritech',
    lessonId: 'lesson-g6-eng-u7-l1',
    questionIds: [
      'q-g6-eng-u7-001', 'q-g6-eng-u7-002', 'q-g6-eng-u7-003', 'q-g6-eng-u7-004',
      'q-g6-eng-u7-005', 'q-g6-eng-u7-006', 'q-g6-eng-u7-007', 'q-g6-eng-u7-008',
      'q-g6-eng-u7-009', 'q-g6-eng-u7-010', 'q-g6-eng-u7-011', 'q-g6-eng-u7-012'
    ]
  },
  {
    id: 'mission-g6-eng-u7-m2',
    worldId: 'world-word-quest',
    title: 'Mission 135: The Voice of the Fields – Active & Passive Voice',
    description: 'Convert sentences accurately between active and passive voice across present, past, and future tenses in agricultural reports.',
    order: 135,
    orderIndex: 135,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-passive-voice',
    badge: 'badge-g6-eng-passive-voice',
    lessonId: 'lesson-g6-eng-u7-l2',
    questionIds: [
      'q-g6-eng-u7-013', 'q-g6-eng-u7-014', 'q-g6-eng-u7-015', 'q-g6-eng-u7-016',
      'q-g6-eng-u7-017', 'q-g6-eng-u7-018', 'q-g6-eng-u7-019', 'q-g6-eng-u7-020',
      'q-g6-eng-u7-021', 'q-g6-eng-u7-022', 'q-g6-eng-u7-023', 'q-g6-eng-u7-024'
    ]
  },
  {
    id: 'mission-g6-eng-u8-m1',
    worldId: 'world-word-quest',
    title: 'Mission 136: The Constitutional Assembly – Child Rights & Civic Words',
    description: 'Explore constitutional terms, children\'s rights under Article 53, and parliamentary debate conventions in Kenyan governance.',
    order: 136,
    orderIndex: 136,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-constitution',
    badge: 'badge-g6-eng-constitution',
    lessonId: 'lesson-g6-eng-u8-l1',
    questionIds: [
      'q-g6-eng-u8-001', 'q-g6-eng-u8-002', 'q-g6-eng-u8-003', 'q-g6-eng-u8-004',
      'q-g6-eng-u8-005', 'q-g6-eng-u8-006', 'q-g6-eng-u8-007', 'q-g6-eng-u8-008',
      'q-g6-eng-u8-009', 'q-g6-eng-u8-010', 'q-g6-eng-u8-011', 'q-g6-eng-u8-012'
    ]
  },
  {
    id: 'mission-g6-eng-u8-m2',
    worldId: 'world-word-quest',
    title: 'Mission 137: The Parliamentary Hansard – Direct to Reported Speech',
    description: 'Transform direct quotations into reported speech accurately with proper backshifting of tenses and pronoun shifts.',
    order: 137,
    orderIndex: 137,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-reported-speech',
    badge: 'badge-g6-eng-reported-speech',
    lessonId: 'lesson-g6-eng-u8-l2',
    questionIds: [
      'q-g6-eng-u8-013', 'q-g6-eng-u8-014', 'q-g6-eng-u8-015', 'q-g6-eng-u8-016',
      'q-g6-eng-u8-017', 'q-g6-eng-u8-018', 'q-g6-eng-u8-019', 'q-g6-eng-u8-020',
      'q-g6-eng-u8-021', 'q-g6-eng-u8-022', 'q-g6-eng-u8-023', 'q-g6-eng-u8-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Batch 4 Questions (48 questions: 24 for Unit 7, 24 for Unit 8)
const questionsToAdd = [
  // ==========================================
  // Unit 7 Lesson 1: Agribusiness & Procedural Texts (q-g6-eng-u7-001 to 012)
  // ==========================================
  {
    id: 'q-g6-eng-u7-001',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'What is the term for the process of transforming raw agricultural crops into higher-value products, such as drying mangoes or processing macadamia nuts?',
    options: [
      'Agro-processing',
      'Deforestation',
      'Soil erosion',
      'Monoculture'
    ],
    correctAnswer: 'Agro-processing',
    explanation: 'Agro-processing refers to industrial or artisanal activities that convert raw agricultural materials into value-added, packaged, or preserved consumer goods.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which compound word combines agriculture with manufacturing or transforming raw materials?'
  },
  {
    id: 'q-g6-eng-u7-002',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Which category of crops includes flowers, fruits, and vegetables grown commercially for export in places like Naivasha and Murang\'a?',
    options: [
      'Horticulture',
      'Silviculture',
      'Aquaculture',
      'Apiculture'
    ],
    correctAnswer: 'Horticulture',
    explanation: 'Horticulture is the branch of plant agriculture dealing with garden crops, predominantly fruits, vegetables, and ornamental cut flowers.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What term describes commercial cultivation of fresh vegetables, fruits, and floriculture?'
  },
  {
    id: 'q-g6-eng-u7-003',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Read the procedural step: "__________ harvest the tea leaves at dawn, transfer them to the weighing shed." Which sequential word best opens the sentence?',
    options: [
      'First',
      'Never',
      'Although',
      'Otherwise'
    ],
    correctAnswer: 'First',
    explanation: 'In procedural writing, chronological sequence words like "First", "Initially", or "To begin with" introduce the primary step in an instructional sequence.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which word signals the initial step in a chronological procedure?'
  },
  {
    id: 'q-g6-eng-u7-004',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'What does the word "perishable" mean when describing horticultural produce such as fresh strawberries and ripe avocados?',
    options: [
      'Likely to decay quickly if not refrigerated',
      'Extremely durable and lasting for years without care',
      'Completely immune to pest attacks',
      'Grown exclusively without any water'
    ],
    correctAnswer: 'Likely to decay quickly if not refrigerated',
    explanation: 'Perishable goods spoil, deteriorate, or rot rapidly without proper storage, refrigeration, or rapid transit.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'If something perishes, does it last indefinitely or spoil quickly?'
  },
  {
    id: 'q-g6-eng-u7-005',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Which sentence correctly uses an imperative verb suitable for a procedural farming manual?',
    options: [
      'Prune the dead branches before applying organic fertilizer.',
      'You could perhaps consider maybe looking at the branches.',
      'Farmers were pruning their branches yesterday afternoon.',
      'The pruning of branches is somewhat interesting to watch.'
    ],
    correctAnswer: 'Prune the dead branches before applying organic fertilizer.',
    explanation: 'Procedural instructions require direct imperative command verbs ("Prune", "Water", "Harvest") to give clear, authoritative steps.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which option starts directly with a clear action command verb telling the user what to do?'
  },
  {
    id: 'q-g6-eng-u7-006',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'In the sentence: "The cooperative decided to scale up its processing capacity to handle twenty tonnes of tea daily," what does the phrasal verb "scale up" mean?',
    options: [
      'Expand and increase production size',
      'Shut down operations permanently',
      'Weigh produce on a bathroom scale',
      'Climb over the perimeter fence'
    ],
    correctAnswer: 'Expand and increase production size',
    explanation: 'To "scale up" means to enlarge, expand, or increase the volume, rate, or scope of an operation or enterprise.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Think of going higher up a scale in business volume.'
  },
  {
    id: 'q-g6-eng-u7-007',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Which sequence of transition words logically connects the steps of planting avocado seedlings?\n"______, dig a hole. ______, mix compost with soil. ______, water the seedling thoroughly."',
    options: [
      'First; Next; Finally',
      'Finally; Secondly; Initially',
      'However; Therefore; Although',
      'Unless; Because; Since'
    ],
    correctAnswer: 'First; Next; Finally',
    explanation: 'Chronological progression follows the clear order of beginning ("First"), continuation ("Next"), and conclusion ("Finally").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which trio shows an orderly beginning, middle, and ending transition?'
  },
  {
    id: 'q-g6-eng-u7-008',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'What is the primary function of "value addition" in Kenya\'s agricultural export trade?',
    options: [
      'Processing raw produce into finished products to command higher market prices',
      'Adding harmful artificial dyes to deceive international buyers',
      'Exporting unprocessed soil along with harvested root tubers',
      'Delaying harvests until all crops are overripe'
    ],
    correctAnswer: 'Processing raw produce into finished products to command higher market prices',
    explanation: 'Value addition transforms raw commodities into refined, branded, or ready-to-use goods (like packaged macadamia nuts or branded tea bags), creating higher profit margins.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Why would packaging or refining raw mangoes into dried slices increase their market worth?'
  },
  {
    id: 'q-g6-eng-u7-009',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Identify the sentence where the phrasal verb "weed out" is used correctly in an agricultural and quality inspection context:',
    options: [
      'Quality inspectors weed out bruised avocados before boxing the export batch.',
      'The agronomist decided to weed out water on the dry seedlings.',
      'Tea tasters weed out cups of tea by drinking them all happily.',
      'The tractor was used to weed out the driver to work faster.'
    ],
    correctAnswer: 'Quality inspectors weed out bruised avocados before boxing the export batch.',
    explanation: '"Weed out" means to eliminate, discard, or remove substandard, defective, or unwanted items from a group.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Just as a farmer removes invasive weeds from crops, what does an inspector remove from a harvest?'
  },
  {
    id: 'q-g6-eng-u7-010',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Which section of a formal procedural report outlines the exact tools, equipment, and agricultural inputs required prior to carrying out a task?',
    options: [
      'Requirements or Materials',
      'Conclusion and Dedication',
      'Historical Background',
      'Table of Fables'
    ],
    correctAnswer: 'Requirements or Materials',
    explanation: 'A procedural text must feature a "Materials", "Equipment", or "Requirements" list specifying everything necessary before the step-by-step instructions begin.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Where in a manual or recipe do you check what supplies you need before starting?'
  },
  {
    id: 'q-g6-eng-u7-011',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Read the excerpt: "To maintain quality, the tea plucked by workers must consist strictly of two tender leaves and a bud." Which word in the excerpt is a synonym for "picked" or "harvested"?',
    options: [
      'Plucked',
      'Strictly',
      'Maintain',
      'Tender'
    ],
    correctAnswer: 'Plucked',
    explanation: '"Plucked" means pulled or picked off quickly with the fingers, specifically used for harvesting delicate tea leaves.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which verb indicates the physical harvesting of the top tea leaves by hand?'
  },
  {
    id: 'q-g6-eng-u7-012',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l1',
    text: 'Which sentence best demonstrates precise, formal agribusiness writing suitable for an export documentation log?',
    options: [
      'The consignment of Grade-A Hass avocados was inspected and certified in accordance with phytosanitary regulations.',
      'We got some nice fruits and shoved them inside cardboard boxes for foreign folks.',
      'Those avocados are super tasty and hopefully the plane takes them far away soon.',
      'A bunch of guys collected green stuff from the trees and dumped it near the airport.'
    ],
    correctAnswer: 'The consignment of Grade-A Hass avocados was inspected and certified in accordance with phytosanitary regulations.',
    explanation: 'Formal agribusiness reporting uses professional terminology ("consignment", "certified", "phytosanitary regulations") with objective, passive or impersonal phrasing.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which option uses official export terminology and respectful formal register?'
  },

  // ==========================================
  // Unit 7 Lesson 2: Active and Passive Voice (q-g6-eng-u7-013 to 024)
  // ==========================================
  {
    id: 'q-g6-eng-u7-013',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'What is the passive form of the present simple sentence: "The farmers pick fresh tea leaves every morning"?',
    options: [
      'Fresh tea leaves are picked by the farmers every morning.',
      'Fresh tea leaves were picked by the farmers every morning.',
      'Fresh tea leaves are being picked by the farmers every morning.',
      'Fresh tea leaves have been picked by the farmers every morning.'
    ],
    correctAnswer: 'Fresh tea leaves are picked by the farmers every morning.',
    explanation: 'In the present simple, passive voice uses "am/is/are + past participle (V3)". "Fresh tea leaves" is plural, so "are picked" is correct.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What form of "to be" in the present tense pairs with plural "leaves", followed by the past participle of "pick"?'
  },
  {
    id: 'q-g6-eng-u7-014',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Which sentence is written in the active voice?',
    options: [
      'The agronomist tested the soil fertility in the greenhouse.',
      'The soil fertility was tested by the agronomist in the greenhouse.',
      'Ripe avocados are packed into cartons by the cooperative.',
      'The irrigation pipes were installed by the technicians.'
    ],
    correctAnswer: 'The agronomist tested the soil fertility in the greenhouse.',
    explanation: 'In the active voice, the subject ("The agronomist") performs the action ("tested") on the direct object ("the soil fertility").',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'In which sentence is the subject at the beginning directly carrying out the action rather than receiving it?'
  },
  {
    id: 'q-g6-eng-u7-015',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Complete the passive sentence with the correct past simple verb: "The solar water pump __________ by the village elders last month."',
    options: [
      'was commissioned',
      'is commissioned',
      'commissioned',
      'will be commissioned'
    ],
    correctAnswer: 'was commissioned',
    explanation: 'For a singular subject ("pump") in the past simple ("last month"), the passive structure requires "was + past participle (commissioned)".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'The event happened "last month" and the subject is singular. Which auxiliary verb is needed?'
  },
  {
    id: 'q-g6-eng-u7-016',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Change into passive voice: "Mumbi watered the French beans."',
    options: [
      'The French beans were watered by Mumbi.',
      'The French beans are watered by Mumbi.',
      'The French beans had watered Mumbi.',
      'The French beans was watered by Mumbi.'
    ],
    correctAnswer: 'The French beans were watered by Mumbi.',
    explanation: '"French beans" is plural and the active sentence is in past simple ("watered"). The passive requires "were watered by Mumbi".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Is "French beans" singular or plural? What is the past form of "to be" for plural nouns?'
  },
  {
    id: 'q-g6-eng-u7-017',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Convert into passive voice: "The workers are grading the avocados right now."',
    options: [
      'The avocados are being graded by the workers right now.',
      'The avocados were graded by the workers right now.',
      'The avocados have been graded by the workers right now.',
      'The avocados are grading the workers right now.'
    ],
    correctAnswer: 'The avocados are being graded by the workers right now.',
    explanation: 'Present continuous active ("are grading") transforms into present continuous passive: "am/is/are + being + past participle (graded)".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How do we indicate an ongoing continuous action in the passive voice? (Hint: look for "being").'
  },
  {
    id: 'q-g6-eng-u7-018',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Convert into active voice: "The export certificates were signed by the KEPHIS inspector."',
    options: [
      'The KEPHIS inspector signed the export certificates.',
      'The KEPHIS inspector was signing the export certificates.',
      'The KEPHIS inspector has signed the export certificates.',
      'The export certificates signed the KEPHIS inspector.'
    ],
    correctAnswer: 'The KEPHIS inspector signed the export certificates.',
    explanation: 'The agent "by the KEPHIS inspector" becomes the active subject, and "were signed" (past simple passive) reverts to past simple active ("signed").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Who carried out the signing? Make that person the subject who performs the past simple action.'
  },
  {
    id: 'q-g6-eng-u7-019',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Change into passive voice: "The cooperative has paid all tea bonuses."',
    options: [
      'All tea bonuses have been paid by the cooperative.',
      'All tea bonuses were paid by the cooperative.',
      'All tea bonuses has been paid by the cooperative.',
      'All tea bonuses are being paid by the cooperative.'
    ],
    correctAnswer: 'All tea bonuses have been paid by the cooperative.',
    explanation: 'Present perfect active ("has paid") becomes present perfect passive ("has/have been paid"). Since "bonuses" is plural, "have been paid" is required.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'The active tense is present perfect ("has paid"). Which passive formula uses "have been + past participle"?'
  },
  {
    id: 'q-g6-eng-u7-020',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'What is the passive form of the future simple sentence: "Kenya will export organic honey to Europe next year"?',
    options: [
      'Organic honey will be exported to Europe by Kenya next year.',
      'Organic honey was exported to Europe by Kenya next year.',
      'Organic honey will being exported to Europe by Kenya next year.',
      'Organic honey has been exported to Europe by Kenya next year.'
    ],
    correctAnswer: 'Organic honey will be exported to Europe by Kenya next year.',
    explanation: 'Future simple active ("will export") transforms to "will be + past participle (exported)".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What follows modal "will" in the passive voice? (Hint: will + be + past participle).'
  },
  {
    id: 'q-g6-eng-u7-021',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'In which of the following situations is it best to omit the agent (the "by..." phrase) in a passive sentence?',
    options: [
      'When the doer of the action is unknown, obvious, or unimportant',
      'When the doer is the most celebrated person in the country',
      'Only when writing an informal personal letter to a friend',
      'Never, because omitting the agent is always grammatically illegal'
    ],
    correctAnswer: 'When the doer of the action is unknown, obvious, or unimportant',
    explanation: 'The agent is naturally omitted when it is obvious from context (e.g., "The wheat was harvested"), unknown (e.g., "The gate was left open"), or irrelevant.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'If everyone already knows who performed the action, or if the actor is unknown, is it necessary to state them?'
  },
  {
    id: 'q-g6-eng-u7-022',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Transform the sentence into the passive voice: "The agronomists were calibrating the drip irrigation system when rain fell."',
    options: [
      'The drip irrigation system was being calibrated by the agronomists when rain fell.',
      'The drip irrigation system had been calibrated by the agronomists when rain fell.',
      'The drip irrigation system is being calibrated by the agronomists when rain fell.',
      'The drip irrigation system was calibrated by the agronomists when rain fell.'
    ],
    correctAnswer: 'The drip irrigation system was being calibrated by the agronomists when rain fell.',
    explanation: 'Past continuous active ("were calibrating") converts to past continuous passive: "was/were being + past participle (calibrated)".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'The active tense is past continuous. Which passive option combines "was being" with the past participle?'
  },
  {
    id: 'q-g6-eng-u7-023',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Identify the sentence where the passive voice is constructed INCORRECTLY:',
    options: [
      'The macadamia nuts were being packaging into small sachets.',
      'The macadamia nuts were packaged into small sachets.',
      'The macadamia nuts have been packaged into small sachets.',
      'The macadamia nuts are packaged into small sachets daily.'
    ],
    correctAnswer: 'The macadamia nuts were being packaging into small sachets.',
    explanation: 'The passive voice always requires the past participle (V3) after "being", not the present participle (-ing). It should be "were being packaged", not "were being packaging".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What form of the main verb must always accompany auxiliary verbs in passive constructions? Can it end in -ing?'
  },
  {
    id: 'q-g6-eng-u7-024',
    subStrandId: 'substrand-g6-eng-u7',
    lessonId: 'lesson-g6-eng-u7-l2',
    text: 'Convert into active voice: "A new cold storage warehouse had been constructed by the county government before the harvest season began."',
    options: [
      'The county government had constructed a new cold storage warehouse before the harvest season began.',
      'The county government constructed a new cold storage warehouse before the harvest season began.',
      'The county government has constructed a new cold storage warehouse before the harvest season began.',
      'The county government was constructing a new cold storage warehouse before the harvest season began.'
    ],
    correctAnswer: 'The county government had constructed a new cold storage warehouse before the harvest season began.',
    explanation: 'Past perfect passive ("had been constructed") reverts to past perfect active ("had constructed") with "the county government" as the subject.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Maintain the exact past perfect tense: "had + past participle" with the agent acting as subject.'
  },

  // ==========================================
  // Unit 8 Lesson 1: Governance & Child Rights (q-g6-eng-u8-001 to 012)
  // ==========================================
  {
    id: 'q-g6-eng-u8-001',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Under Article 53 of the Constitution of Kenya 2010, which of the following is an explicit fundamental right of every child?',
    options: [
      'The right to free and compulsory basic education',
      'The right to drive a commercial vehicle at age ten',
      'The right to work overnight in commercial mines',
      'The right to pay income tax on school pocket money'
    ],
    correctAnswer: 'The right to free and compulsory basic education',
    explanation: 'Article 53(1)(b) of the Constitution of Kenya 2010 guarantees every Kenyan child the right to free and compulsory basic education.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which right guarantees that every boy and girl in Kenya can attend primary school without school fees?'
  },
  {
    id: 'q-g6-eng-u8-002',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'What does the term "devolution" mean in Kenya\'s system of governance established by the 2010 Constitution?',
    options: [
      'Decentralization of powers and resources to 47 County Governments',
      'Abolishing all local administrations and elections completely',
      'Transferring all public schools to private ownership',
      'Merging Kenya with neighbouring nations into one country'
    ],
    correctAnswer: 'Decentralization of powers and resources to 47 County Governments',
    explanation: 'Devolution distributes administrative authority and public revenue from the national government to 47 semi-autonomous county governments.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How are power and development resources shared between the national level and the 47 county levels?'
  },
  {
    id: 'q-g6-eng-u8-003',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Which chapter of the Constitution of Kenya 2010 sets out strict moral and ethical standards for leadership and integrity among public officers?',
    options: [
      'Chapter Six',
      'Chapter One',
      'Chapter Twenty',
      'Chapter Fifty'
    ],
    correctAnswer: 'Chapter Six',
    explanation: 'Chapter Six of the Constitution of Kenya 2010 is titled "Leadership and Integrity" and mandates honesty, transparency, and accountability.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which famous single-digit chapter is synonymous with ethical conduct and anti-corruption in Kenyan public service?'
  },
  {
    id: 'q-g6-eng-u8-004',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'In formal parliamentary and assembly debates, how does a speaker address the chairperson or presiding officer courteously?',
    options: [
      'Mr. Speaker, Sir / Madam Speaker',
      'Hey buddy over there',
      'Listen to me right now, friend',
      'Whichever person is sitting on that chair'
    ],
    correctAnswer: 'Mr. Speaker, Sir / Madam Speaker',
    explanation: 'Parliamentary decorum requires all remarks to be addressed through the presiding chair using the formal title "Mr. Speaker, Sir" or "Madam Speaker".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What formal title is used to address the presiding officer in Parliament or county assemblies?'
  },
  {
    id: 'q-g6-eng-u8-005',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'What does Article 53(2) of the Constitution specify regarding any legal, social, or administrative decision affecting a child?',
    options: [
      'A child\'s best interests are of paramount importance.',
      'A child must always agree with commercial corporations.',
      'Children should have no voice in judicial proceedings.',
      'The interests of adults always override the rights of a child.'
    ],
    correctAnswer: 'A child\'s best interests are of paramount importance.',
    explanation: 'Article 53(2) provides that "A child\'s best interests are of paramount importance in every matter concerning the child."',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What guiding principle ensures the child\'s safety, development, and well-being come first?'
  },
  {
    id: 'q-g6-eng-u8-006',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Which civic term describes the legal right of eligible adult citizens to participate in electing their leaders through secret ballot?',
    options: [
      'Franchise (or Suffrage)',
      'Subsidiarity',
      'Nepotism',
      'Sedentary'
    ],
    correctAnswer: 'Franchise (or Suffrage)',
    explanation: 'The franchise (or suffrage) is the constitutional right to vote in political elections.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which term beginning with "F" or "S" denotes the fundamental voting rights of citizens?'
  },
  {
    id: 'q-g6-eng-u8-007',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Read the debate statement: "While I respect my colleague\'s perspective, __________ that child healthcare clinics must be prioritized in this budget." Which formal debate transition fits best?',
    options: [
      'I strongly maintain',
      'I don\'t care at all',
      'let us fight with fists',
      'who cares anyway'
    ],
    correctAnswer: 'I strongly maintain',
    explanation: '"I strongly maintain" or "I firmly submit" is polite, assertive formal debate register expressing a conviction respectfully.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which phrase expresses a firm, polite, and persuasive position in a formal chamber?'
  },
  {
    id: 'q-g6-eng-u8-008',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'What does the term "accountability" mean when describing ethical governance in Kenya?',
    options: [
      'The obligation of leaders to explain and take responsibility for their actions and use of public funds',
      'The ability of officials to hide government expenditure from citizens',
      'Counting physical currency bills in private bank vaults',
      'Refusing to answer questions during parliamentary oversight committee hearings'
    ],
    correctAnswer: 'The obligation of leaders to explain and take responsibility for their actions and use of public funds',
    explanation: 'Accountability requires public servants to answer to citizens for stewardship of public office and taxpayers\' resources.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'When leaders are held accountable, what are they required to do regarding their decisions?'
  },
  {
    id: 'q-g6-eng-u8-009',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Which scenario represents a direct violation of children\'s constitutional rights as stipulated in Kenya\'s Children Act and Article 53?',
    options: [
      'Forcing an eleven-year-old child to work daily on a commercial quarry instead of attending school',
      'Providing balanced hot meals to pupils at lunch hour in a school canteen',
      'Issuing a birth certificate to a newborn infant at a district civil registry',
      'Vaccinating children against preventable childhood diseases at a public health clinic'
    ],
    correctAnswer: 'Forcing an eleven-year-old child to work daily on a commercial quarry instead of attending school',
    explanation: 'Subjecting a child to hazardous child labour that deprives them of education directly violates Article 53 and national child protection laws.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which option deprives a child of education and exposes them to physical economic exploitation?'
  },
  {
    id: 'q-g6-eng-u8-010',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'In civic discourse, what is the meaning of "public participation" as enshrined in Article 10 of the Constitution of Kenya?',
    options: [
      'Involving citizens actively in decision-making, policy formulation, and legislative scrutiny',
      'Mandating that all citizens attend political stadium rallies every weekend',
      'Permitting only government officials to discuss national budgets behind closed doors',
      'Distributing free radios to all households across every county'
    ],
    correctAnswer: 'Involving citizens actively in decision-making, policy formulation, and legislative scrutiny',
    explanation: 'Public participation is a national value and principle of governance ensuring citizens have meaningful input into government decisions and laws.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What role do citizens play when they participate in public county budget hearings?'
  },
  {
    id: 'q-g6-eng-u8-011',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'Which pair of words best represents the antonyms of "transparency" and "integrity" in governance?',
    options: [
      'Opacity and corruption',
      'Honesty and uprightness',
      'Fairness and truthfulness',
      'Clarity and morality'
    ],
    correctAnswer: 'Opacity and corruption',
    explanation: '"Opacity" (secrecy, obscurity) is the antonym of transparency, while "corruption" (dishonesty, abuse of office) is the antonym of integrity.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which choice contains words that mean secrecy and moral wrongdoing?'
  },
  {
    id: 'q-g6-eng-u8-012',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l1',
    text: 'In school governance, when student council leaders hold a "baraza", what democratic practice are they demonstrating?',
    options: [
      'Consultative community dialogue and open civic engagement',
      'Dictatorial rule without listening to pupils\' concerns',
      'Commercial auctioning of school books for personal profit',
      'Secret ballot boycotting without school administration awareness'
    ],
    correctAnswer: 'Consultative community dialogue and open civic engagement',
    explanation: 'A traditional and modern baraza is an open consultative forum where community or student members voice grievances, discuss issues, and seek collective solutions.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What is a baraza in Kenyan community traditions?'
  },

  // ==========================================
  // Unit 8 Lesson 2: Direct and Reported Speech (q-g6-eng-u8-013 to 024)
  // ==========================================
  {
    id: 'q-g6-eng-u8-013',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Which sentence demonstrates correct punctuation of direct speech?',
    options: [
      'The teacher said, "Every child has the right to learn."',
      'The teacher said "Every child has the right to learn".',
      'The teacher said, "Every child has the right to learn".',
      'The teacher said "every child has the right to learn."'
    ],
    correctAnswer: 'The teacher said, "Every child has the right to learn."',
    explanation: 'In direct speech, an introductory comma precedes the quote, the first word inside the quotation marks is capitalized, and the full stop is placed inside the closing quotation marks.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Look closely at the placement of the comma before the quote and where the full stop sits relative to the closing quotation marks.'
  },
  {
    id: 'q-g6-eng-u8-014',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Convert into reported speech: Mutua said, "I attend school regularly."',
    options: [
      'Mutua said that he attended school regularly.',
      'Mutua said that I attend school regularly.',
      'Mutua said that he will attend school regularly.',
      'Mutua said that he is attending school regularly.'
    ],
    correctAnswer: 'Mutua said that he attended school regularly.',
    explanation: 'In reported speech with past reporting verb "said", present simple ("attend") backshifts to past simple ("attended"), and first-person pronoun "I" shifts to "he".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Change pronoun "I" to "he" and backshift present "attend" to past tense.'
  },
  {
    id: 'q-g6-eng-u8-015',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'When transforming direct speech into reported speech, how does the modal auxiliary "will" change if the reporting verb is in the past?',
    options: [
      'would',
      'can',
      'shall',
      'must'
    ],
    correctAnswer: 'would',
    explanation: 'In reported speech following a past tense reporting verb, "will" shifts to its conditional/past equivalent "would".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What is the past equivalent of "will" in reported speech?'
  },
  {
    id: 'q-g6-eng-u8-016',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Convert into reported speech: "We are planting trees today," said the pupils.',
    options: [
      'The pupils said that they were planting trees that day.',
      'The pupils said that we are planting trees today.',
      'The pupils said that they are planting trees that day.',
      'The pupils said that they will plant trees today.'
    ],
    correctAnswer: 'The pupils said that they were planting trees that day.',
    explanation: 'Pronoun "We" becomes "they", present continuous "are planting" backshifts to past continuous "were planting", and time adverb "today" becomes "that day".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Look for three shifts: pronoun (we -> they), tense (are -> were), and time adverb (today -> that day).'
  },
  {
    id: 'q-g6-eng-u8-017',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Convert into reported speech: The magistrate stated, "The suspect has admitted the offence."',
    options: [
      'The magistrate stated that the suspect had admitted the offence.',
      'The magistrate stated that the suspect has admitted the offence.',
      'The magistrate stated that the suspect will admit the offence.',
      'The magistrate stated that the suspect is admitting the offence.'
    ],
    correctAnswer: 'The magistrate stated that the suspect had admitted the offence.',
    explanation: 'Present perfect ("has admitted") shifts to past perfect ("had admitted") in reported speech when the reporting verb is past ("stated").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What does present perfect ("has + past participle") backshift to in reported speech?'
  },
  {
    id: 'q-g6-eng-u8-018',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Change into reported speech: The Governor said, "I can construct ten new dispensaries this financial year."',
    options: [
      'The Governor said that he could construct ten new dispensaries that financial year.',
      'The Governor said that he can construct ten new dispensaries this financial year.',
      'The Governor said that I could construct ten new dispensaries that financial year.',
      'The Governor said that he will construct ten new dispensaries this financial year.'
    ],
    correctAnswer: 'The Governor said that he could construct ten new dispensaries that financial year.',
    explanation: '"can" shifts to "could", "this" shifts to "that", and "I" shifts to "he".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What does modal "can" change into, and how does the demonstrative "this" change?'
  },
  {
    id: 'q-g6-eng-u8-019',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'How should the command: "Respect public property!" be rendered into reported speech when spoken by the chief?',
    options: [
      'The chief instructed the citizens to respect public property.',
      'The chief said that citizens must respecting public property.',
      'The chief said to respect public property yesterday.',
      'The chief asked that do citizens respect public property?'
    ],
    correctAnswer: 'The chief instructed the citizens to respect public property.',
    explanation: 'Imperative commands and instructions transform into an infinitive phrase: "reporting verb + object + to + infinitive verb" ("instructed the citizens to respect").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How are direct commands converted using an infinitive ("to + verb")?'
  },
  {
    id: 'q-g6-eng-u8-020',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Convert into reported speech: Amani asked Wanjiku, "Where do you store the civic club files?"',
    options: [
      'Amani asked Wanjiku where she stored the civic club files.',
      'Amani asked Wanjiku where do you store the civic club files?',
      'Amani asked Wanjiku where did she stored the civic club files.',
      'Amani asked Wanjiku that where she stored the civic club files.'
    ],
    correctAnswer: 'Amani asked Wanjiku where she stored the civic club files.',
    explanation: 'In reported WH-questions, normal statement word order (subject + verb) is used without the question auxiliary "do/did", and no question mark is used. "do you store" becomes "she stored".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Remember that reported questions take statement word order (subject + past tense verb) and never end with a question mark.'
  },
  {
    id: 'q-g6-eng-u8-021',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Transform into reported speech: The senator announced, "I will present the Child Welfare Bill tomorrow."',
    options: [
      'The senator announced that she would present the Child Welfare Bill the following day.',
      'The senator announced that she will present the Child Welfare Bill tomorrow.',
      'The senator announced that I would present the Child Welfare Bill the following day.',
      'The senator announced that she would present the Child Welfare Bill yesterday.'
    ],
    correctAnswer: 'The senator announced that she would present the Child Welfare Bill the following day.',
    explanation: '"will" backshifts to "would", and the time adverb "tomorrow" shifts to "the following day" or "the next day".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What happens to "will" and "tomorrow" in reported speech?'
  },
  {
    id: 'q-g6-eng-u8-022',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Why does the verb tense NOT backshift in the sentence: The science teacher explained, "Water boils at 100 degrees Celsius"?\nReported: "The science teacher explained that water boils at 100 degrees Celsius."',
    options: [
      'Because the statement expresses a universal scientific fact or permanent truth',
      'Because the science teacher forgot to use the past tense',
      'Because scientific sentences are not subject to English grammar rules',
      'Because the reporting verb is placed at the beginning of the sentence'
    ],
    correctAnswer: 'Because the statement expresses a universal scientific fact or permanent truth',
    explanation: 'Universal scientific facts, geographical realities, and eternal truths retain their present tense in reported speech because they remain true at all times.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Is water boiling at 100 degrees Celsius something that only happened in the past, or an eternal scientific fact?'
  },
  {
    id: 'q-g6-eng-u8-023',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Convert into reported speech: Chebet asked, "Did the committee pass the school feeding budget?"',
    options: [
      'Chebet asked whether the committee had passed the school feeding budget.',
      'Chebet asked that if the committee passed the school feeding budget.',
      'Chebet asked whether did the committee pass the school feeding budget.',
      'Chebet asked whether the committee has passed the school feeding budget.'
    ],
    correctAnswer: 'Chebet asked whether the committee had passed the school feeding budget.',
    explanation: 'Yes/No direct questions in reported speech use "if" or "whether". Past simple ("Did... pass") backshifts to past perfect ("had passed") in statement order.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Yes/No questions introduce "if" or "whether", and past simple backshifts to past perfect.'
  },
  {
    id: 'q-g6-eng-u8-024',
    subStrandId: 'substrand-g6-eng-u8',
    lessonId: 'lesson-g6-eng-u8-l2',
    text: 'Which sentence correctly converts this direct speech into reported speech?\nDirect: The lawyer said, "I met the children\'s officer here yesterday."',
    options: [
      'The lawyer said that he had met the children\'s officer there the previous day.',
      'The lawyer said that he met the children\'s officer here yesterday.',
      'The lawyer said that I had met the children\'s officer there the previous day.',
      'The lawyer said that he has met the children\'s officer there that day.'
    ],
    correctAnswer: 'The lawyer said that he had met the children\'s officer there the previous day.',
    explanation: 'All four shifts must be executed accurately: "I" -> "he", past simple "met" -> past perfect "had met", place adverb "here" -> "there", and time adverb "yesterday" -> "the previous day".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Check all four shifts: pronoun (I -> he), tense (met -> had met), place (here -> there), and time (yesterday -> the previous day).'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write updated db to file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 4 of Grade 6 English Language successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
