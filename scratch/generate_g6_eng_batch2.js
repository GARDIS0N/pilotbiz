import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 English Language Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-eng-u3',
    strandId: 'strand-g6-eng-grammar',
    learningAreaId: 'la-english-g6',
    title: 'Health, Balanced Diet, Wellness & Modal Verbs of Obligation',
    description: 'Discussing balanced nutrition and traditional Kenyan indigenous foods; identifying causes and prevention of lifestyle and communicable diseases; mastering modal auxiliaries of obligation, advice, permission, and necessity (must, should, ought to, have to, need to); and exploring health idioms and vocabulary.',
    cbeCompetency: 'Health literacy, nutritional awareness, empathetic dialogue, and modal auxiliary grammatical fluency',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g6-eng-u4',
    strandId: 'strand-g6-eng-reading',
    learningAreaId: 'la-english-g6',
    title: 'Tourism, Wildlife Conservation, National Parks & Order of Adjectives',
    description: 'Reading descriptive travelogues and brochures exploring Kenya\'s iconic national parks (Amboseli, Tsavo, Maasai Mara, Lake Nakuru); understanding degrees of comparison (comparative and superlative); mastering the grammatical royal order of cumulative adjectives (Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose); and expanding wildlife and ecotourism vocabulary.',
    cbeCompetency: 'Ecotourism appreciation, descriptive reading comprehension, wildlife stewardship, and syntactical adjective mastery',
    estimatedMinutes: 30,
    order: 4
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 2 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-eng-u3-l1',
    subStrandId: 'substrand-g6-eng-u3',
    title: 'Health, Traditional Nutrition & Wellness Dialogues',
    content: 'Good health is a fundamental pillar of human well-being and active learning.\n\n1. Nutrition & Traditional Foods:\n- Balanced diet: Contains carbohydrates, proteins, healthy fats, vitamins, minerals, dietary fibre, and clean water in balanced proportions.\n- Traditional Kenyan vegetables (managu, terere, sagaa, kunde) are powerhouse sources of iron and essential vitamins.\n- Lifestyle vs Communicable Diseases: Communicable diseases (such as malaria, cholera, and flu) are caused by pathogens and can spread between individuals. Good sanitation and clean water prevent waterborne diseases.\n\n2. Health Idioms & Figures of Speech:\n- "As fit as a fiddle": In prime physical condition and excellent health.\n- "Under the weather": Feeling slightly unwell or indisposed.\n- "An apple a day keeps the doctor away": Eating nutritious food maintains vitality.\n\n3. Conversational Etiquette in Healthcare:\n- Use gentle, encouraging language when offering health advice: "You should rest...", "It would be wise to consult the doctor...".',
    didYouKnow: 'Traditional leafy greens like African nightshade (managu) contain over twice the iron content of ordinary cabbage, making them vital for boosting blood hemoglobin!',
    kenyanContext: 'Community health promoters visiting households in Bomet encourage families to cultivate kitchen gardens with indigenous vegetables to ensure food security and prevent nutritional deficiencies.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u3-l2',
    subStrandId: 'substrand-g6-eng-u3',
    title: 'Modal Auxiliaries (Must, Should, Ought to, Have to) & Health Registers',
    content: 'Modal auxiliary verbs express necessity, obligation, advice, permission, possibility, and ability.\n\n1. Obligation and Necessity:\n- "Must": Strong personal obligation, crucial necessity, or legal mandate (e.g., "Learners must wash their hands before meals").\n- "Have to": External obligation imposed by rules, laws, or circumstances (e.g., "We have to wear uniforms at school").\n- "Must not": Prohibition (strictly forbidden; e.g., "You must not share prescription medication").\n\n2. Advice and Moral Duty:\n- "Should": Friendly recommendation or constructive advice (e.g., "You should drink at least eight glasses of clean water daily").\n- "Ought to": Moral obligation or ethical duty (e.g., "We ought to support children living with disabilities").\n\n3. Permission and Possibility:\n- "May": Formal polite permission (e.g., "May I visit the clinic, teacher?").\n- "Might": Moderate or slight possibility (e.g., "It might rain this evening").\n- "Need not": Lack of obligation or necessity (e.g., "You need not boil this bottled water").\n\n4. Bare Infinitive Rule:\n- Modals (must, can, should, might) are followed directly by the base verb without "to" (except "ought to" and "have to").',
    didYouKnow: 'The phrase "have to" functions like a modal in meaning, but conjugates for tense (had to in past, will have to in future)!',
    kenyanContext: 'School health clubs in Nakuru use modal posters: "You MUST sanitize your hands before laboratory practicals" and "You SHOULD report water leaks to the school caretaker."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u4-l1',
    subStrandId: 'substrand-g6-eng-u4',
    title: 'Reading Travelogues: The Wonders of Kenya\'s Wild Landscapes',
    content: 'Travelogue excerpt: Wonders of the Great Rift Valley and Savanna\n\n"Rising majestically above the acacia-dotted plains of Amboseli, the snow-mantled peaks of Mount Kilimanjaro pierce the azure sky. On the emerald marshes below, multi-generational herds of African elephants bathe and graze peacefully. Further north across the Great Rift Valley, Lake Nakuru gleams like a pink jewel, adorned by millions of lesser flamingos feeding along its alkaline shores.\n\nTourism is one of Kenya\'s premier economic sectors. In the Maasai Mara National Reserve, the Great Migration presents the most dramatic wildlife spectacle on Earth as over one million wildebeests plunge across crocodile-filled rivers in search of fresh pasture.\n\nTo safeguard this heritage, local pastoralist communities partner with the Kenya Wildlife Service (KWS) in community conservancies. By creating wildlife migratory corridors and clamping down on illegal poaching, Kenyans ensure that our magnificent biodiversity continues to inspire the world for generations to come."',
    didYouKnow: 'The Maasai Mara Wildebeest Migration was officially declared one of the Seven Natural Wonders of Africa due to its sheer scale and ecological significance!',
    kenyanContext: 'Kenya Wildlife Service (KWS) rangers and local community scouts patrol the Lewa and Mara conservancies, utilizing solar-powered tracking collars to protect endangered black rhinos.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u4-l2',
    subStrandId: 'substrand-g6-eng-u4',
    title: 'Degrees of Comparison & The Royal Order of Adjectives',
    content: '1. Degrees of Comparison:\n- Positive: Base form (tall, bright, beautiful).\n- Comparative: Compares two items (-er or "more"): taller, brighter, more beautiful.\n- Superlative: Compares three or more items (-est or "most"): tallest, brightest, most beautiful.\n- Irregular forms: good -> better -> best; bad -> worse -> worst; far -> farther/further -> farthest.\n- Correlative: "as + adjective + as" expresses equality (e.g., "The lion is as fast as the zebra").\n\n2. The Royal Order of Cumulative Adjectives (OSASCOMP):\nWhen multiple adjectives describe a noun, they follow a standard natural order:\n1. Opinion (lovely, wonderful, ugly)\n2. Size (large, tiny, immense)\n3. Age (ancient, young, modern)\n4. Shape (round, square, oval)\n5. Colour (golden, brown, azure)\n6. Origin (Kenyan, African, Maasai)\n7. Material (wooden, beaded, leather)\n8. Purpose (travel, safari, running)\n- Example: "A magnificent (opinion) large (size) old (age) brown (colour) Kenyan (origin) leather (material) safari (purpose) bag."',
    didYouKnow: 'Native English speakers follow the Royal Order of Adjectives instinctively without memorizing it, but learners can remember the mnemonic OSASCOMP!',
    kenyanContext: 'Artisans at the Maasai Market in Nairobi describe their handicrafts using precise adjective order: "A beautiful (opinion) small (size) circular (shape) Maasai (origin) beaded (material) bracelet."',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  if (!db.lessons.some(les => les.id === l.id)) {
    db.lessons.push(l);
    console.log(`Added lesson ${l.id}`);
  }
});

// 3. Batch 2 Missions (4 missions: orders 126 to 129 in world-word-quest)
const missionsToAdd = [
  {
    id: 'mission-g6-eng-u3-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u3',
    lessonId: 'lesson-g6-eng-u3-l1',
    title: 'Community Health Champion Quest',
    description: 'Explore balanced diets and traditional Kenyan greens, decode health idioms (fit as a fiddle, under the weather), and practice empathetic wellness dialogue!',
    order: 126,
    orderIndex: 126,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-health-champion',
    badge: { name: 'Health Champion', icon: 'heart' },
    questionIds: [
      'q-g6-eng-u3-001', 'q-g6-eng-u3-002', 'q-g6-eng-u3-003', 'q-g6-eng-u3-004',
      'q-g6-eng-u3-005', 'q-g6-eng-u3-006', 'q-g6-eng-u3-007', 'q-g6-eng-u3-008',
      'q-g6-eng-u3-009', 'q-g6-eng-u3-010', 'q-g6-eng-u3-011', 'q-g6-eng-u3-012'
    ]
  },
  {
    id: 'mission-g6-eng-u3-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u3',
    lessonId: 'lesson-g6-eng-u3-l2',
    title: 'Modal Master & Wellness Navigator Quest',
    description: 'Master modal auxiliaries of obligation (must, have to), advice (should, ought to), permission (may), and deduction (must be) in health contexts!',
    order: 127,
    orderIndex: 127,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-modal-master',
    badge: { name: 'Modal Master', icon: 'shield' },
    questionIds: [
      'q-g6-eng-u3-013', 'q-g6-eng-u3-014', 'q-g6-eng-u3-015', 'q-g6-eng-u3-016',
      'q-g6-eng-u3-017', 'q-g6-eng-u3-018', 'q-g6-eng-u3-019', 'q-g6-eng-u3-020',
      'q-g6-eng-u3-021', 'q-g6-eng-u3-022', 'q-g6-eng-u3-023', 'q-g6-eng-u3-024'
    ]
  },
  {
    id: 'mission-g6-eng-u4-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u4',
    lessonId: 'lesson-g6-eng-u4-l1',
    title: 'Safari Travelogue Explorer Quest',
    description: 'Read descriptive passages on Amboseli, Lake Nakuru, and Maasai Mara, analyze conservation vocabulary, and decode ecotourism brochures!',
    order: 128,
    orderIndex: 128,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-safari-explorer',
    badge: { name: 'Safari Explorer', icon: 'compass' },
    questionIds: [
      'q-g6-eng-u4-001', 'q-g6-eng-u4-002', 'q-g6-eng-u4-003', 'q-g6-eng-u4-004',
      'q-g6-eng-u4-005', 'q-g6-eng-u4-006', 'q-g6-eng-u4-007', 'q-g6-eng-u4-008',
      'q-g6-eng-u4-009', 'q-g6-eng-u4-010', 'q-g6-eng-u4-011', 'q-g6-eng-u4-012'
    ]
  },
  {
    id: 'mission-g6-eng-u4-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u4',
    lessonId: 'lesson-g6-eng-u4-l2',
    title: 'Adjective Virtuoso & Heritage Quest',
    description: 'Form regular and irregular degrees of comparison, master the royal order of adjectives (OSASCOMP), and punctuate coordinate descriptions!',
    order: 129,
    orderIndex: 129,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-adjective-virtuoso',
    badge: { name: 'Adjective Virtuoso', icon: 'feather' },
    questionIds: [
      'q-g6-eng-u4-013', 'q-g6-eng-u4-014', 'q-g6-eng-u4-015', 'q-g6-eng-u4-016',
      'q-g6-eng-u4-017', 'q-g6-eng-u4-018', 'q-g6-eng-u4-019', 'q-g6-eng-u4-020',
      'q-g6-eng-u4-021', 'q-g6-eng-u4-022', 'q-g6-eng-u4-023', 'q-g6-eng-u4-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 2 Questions (48 questions: 24 for Unit 3, 24 for Unit 4)
const questionsToAdd = [
  // --- Unit 3: Mission 1 (q-g6-eng-u3-001 to 012) ---
  {
    id: 'q-g6-eng-u3-001',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A friend is feeling feverish and dizzy after sports practice. What is the most appropriate and empathetic advice to give?',
    text: 'A friend is feeling feverish and dizzy after sports practice. What is the most appropriate and empathetic advice to give?',
    options: [
      '\"You should visit the school nurse and take a rest in the shade.\"',
      '\"Just ignore it and run another lap.\"',
      '\"You must be pretending to avoid class.\"',
      '\"Go home alone right away.\"'
    ],
    correctAnswer: '\"You should visit the school nurse and take a rest in the shade.\"',
    explanation: 'Constructive health advice uses the modal \'should\' and offers empathetic, safe care and professional medical assistance.',
    socraticHint: 'Good advice combines empathy with practical safety and care.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-002',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Traditional Kenyan leafy vegetables such as managu, sagaa, and terere are especially rich in which essential nutrients?',
    text: 'Traditional Kenyan leafy vegetables such as managu, sagaa, and terere are especially rich in which essential nutrients?',
    options: [
      'Iron, vitamins, and minerals',
      'Pure sugar and fats',
      'Only carbohydrates',
      'Harmful toxins'
    ],
    correctAnswer: 'Iron, vitamins, and minerals',
    explanation: 'Indigenous dark leafy greens provide vital dietary minerals like iron and potassium, as well as essential vitamins A and C.',
    socraticHint: 'Dark leafy traditional vegetables are famous for providing dietary minerals like iron and vital vitamins.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-003',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the biological definition of a \'communicable disease\'?',
    text: 'What is the biological definition of a \'communicable disease\'?',
    options: [
      'An illness that can be transmitted from one person to another through pathogens',
      'An illness caused only by physical injury',
      'An allergic reaction to milk',
      'A dental cavity caused by sweets'
    ],
    correctAnswer: 'An illness that can be transmitted from one person to another through pathogens',
    explanation: 'A communicable disease is an infectious disease transmissible by direct contact with an infected individual or via airborne droplets, contaminated water, or vectors.',
    socraticHint: 'Look at the root \'communicate\' (to pass across or transfer).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-004',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If Uncle Kiprotich is described as being \'as fit as a fiddle\', what does this idiom mean?',
    text: 'If Uncle Kiprotich is described as being \'as fit as a fiddle\', what does this idiom mean?',
    options: [
      'He is in exceptionally good physical health',
      'He plays the violin skillfully',
      'He is sick in bed',
      'He needs medical attention'
    ],
    correctAnswer: 'He is in exceptionally good physical health',
    explanation: 'The idiom \'as fit as a fiddle\' means to be in extremely good health and excellent physical condition.',
    socraticHint: 'This classic idiom describes someone in peak physical health and fitness.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-005',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Faith missed class yesterday because she was feeling under the weather.\" What does the idiom \'under the weather\' mean?',
    text: '\"Faith missed class yesterday because she was feeling under the weather.\" What does the idiom \'under the weather\' mean?',
    options: [
      'Slightly unwell or indisposed',
      'Caught in heavy rain',
      'Enjoying sunny sunshine',
      'Swimming in cold water'
    ],
    correctAnswer: 'Slightly unwell or indisposed',
    explanation: 'To feel \'under the weather\' is an everyday idiomatic expression meaning feeling somewhat sick, tired, or indisposed.',
    socraticHint: 'This common idiom describes someone feeling slightly sick or tired.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-006',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the defining characteristic of a \'balanced diet\'?',
    text: 'What is the defining characteristic of a \'balanced diet\'?',
    options: [
      'It contains all the necessary food nutrients in the correct proportions',
      'It consists only of roasted meat',
      'It contains solely carbohydrates for quick energy',
      'It excludes all fresh fruits'
    ],
    correctAnswer: 'It contains all the necessary food nutrients in the correct proportions',
    explanation: 'A balanced diet supplies proteins, carbohydrates, fats, vitamins, minerals, water, and fibre in healthy proportions.',
    socraticHint: 'Balance means having the right amounts of carbohydrates, proteins, fats, vitamins, minerals, and water.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-007',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In Kenya, what is the most effective preventative measure against malaria infection?',
    text: 'In Kenya, what is the most effective preventative measure against malaria infection?',
    options: [
      'Sleeping under treated mosquito nets and draining stagnant water',
      'Drinking cold boiled water',
      'Avoiding physical exercise',
      'Washing hands before meals'
    ],
    correctAnswer: 'Sleeping under treated mosquito nets and draining stagnant water',
    explanation: 'Insecticide-treated mosquito nets prevent bites from nocturnal Anopheles mosquitoes, while clearing standing water eliminates breeding grounds.',
    socraticHint: 'Malaria is transmitted by female Anopheles mosquitoes. How do we prevent mosquito bites and breeding?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-008',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A medical volunteer in Wajir warns residents about \'dehydration\' during heatwaves. What is dehydration?',
    text: 'A medical volunteer in Wajir warns residents about \'dehydration\' during heatwaves. What is dehydration?',
    options: [
      'A dangerous loss of body water and fluids',
      'An excess of water in the body',
      'A skin rash from sunlight',
      'Inadequate intake of protein'
    ],
    correctAnswer: 'A dangerous loss of body water and fluids',
    explanation: 'Dehydration occurs when the body loses more fluids than are taken in, impairing normal biological functions.',
    socraticHint: '\'Hydro\' means water, and \'de-\' indicates removal or deficiency.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-009',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Improving public sanitation in urban estates prevents outbreaks of cholera.\" What is a synonym for \'sanitation\'?',
    text: '\"Improving public sanitation in urban estates prevents outbreaks of cholera.\" What is a synonym for \'sanitation\'?',
    options: [
      'Cleanliness and hygiene',
      'Construction',
      'Entertainment',
      'Medication'
    ],
    correctAnswer: 'Cleanliness and hygiene',
    explanation: '\'Sanitation\' refers to public health conditions related to clean drinking water, adequate sewage, and general cleanliness and hygiene.',
    socraticHint: 'Sanitation relates to clean water supplies, waste disposal, and hygienic living conditions.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-010',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Asthma is considered a chronic condition, whereas the common cold is usually acute and temporary.\" What is the antonym of \'chronic\' (long-lasting)?',
    text: '\"Asthma is considered a chronic condition, whereas the common cold is usually acute and temporary.\" What is the antonym of \'chronic\' (long-lasting)?',
    options: [
      'Acute / Short-lived',
      'Permanent',
      'Severe',
      'Painful'
    ],
    correctAnswer: 'Acute / Short-lived',
    explanation: '\'Chronic\' denotes long-persisting diseases; its medical opposite is \'acute\', denoting rapid onset and brief duration.',
    socraticHint: '\'Chronic\' describes conditions persisting over a long time. The opposite refers to brief, sharp episodes.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-011',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When managing dehydration caused by diarrhea, healthcare workers recommend ORS. What does the acronym ORS stand for?',
    text: 'When managing dehydration caused by diarrhea, healthcare workers recommend ORS. What does the acronym ORS stand for?',
    options: [
      'Oral Rehydration Salts',
      'Oxygen Restoration Solution',
      'Organic Relief Syrup',
      'Official Registered Serum'
    ],
    correctAnswer: 'Oral Rehydration Salts',
    explanation: 'ORS stands for Oral Rehydration Salts, a balanced mixture of glucose, salt, and clean water used to treat dehydration.',
    socraticHint: 'Taken by mouth (Oral) to restore fluids (Rehydration) using electrolytes (Salts).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-012',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate phrasal verb: \"It took Wambui nearly two weeks to ________ the severe bout of flu.\"',
    text: 'Complete the sentence with the appropriate phrasal verb: \"It took Wambui nearly two weeks to ________ the severe bout of flu.\"',
    options: [
      'get over',
      'get along',
      'get out',
      'get off'
    ],
    correctAnswer: 'get over',
    explanation: '\'Get over\' is the idiomatic phrasal verb meaning to recover from an illness, shock, or ailment.',
    socraticHint: 'Which phrasal verb means to recover from an illness or overcome a difficulty?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },

  // --- Unit 3: Mission 2 (q-g6-eng-u3-013 to 024) ---
  {
    id: 'q-g6-eng-u3-013',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which modal auxiliary verb expresses a strict, non-negotiable rule or imperative legal obligation?',
    text: 'Which modal auxiliary verb expresses a strict, non-negotiable rule or imperative legal obligation?',
    options: [
      'Must',
      'Might',
      'Could',
      'May'
    ],
    correctAnswer: 'Must',
    explanation: '\'Must\' denotes absolute necessity, mandatory requirements, and authoritative commands.',
    socraticHint: '\'Must\' denotes vital necessity, duty, or mandatory legal requirement.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-014',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the modal expressing helpful health advice: \"You look exhausted; you ________ take a warm bath and sleep early.\"',
    text: 'Complete the sentence with the modal expressing helpful health advice: \"You look exhausted; you ________ take a warm bath and sleep early.\"',
    options: [
      'should',
      'must',
      'cannot',
      'might not'
    ],
    correctAnswer: 'should',
    explanation: '\'Should\' is the standard modal for providing recommendations and well-meaning personal advice.',
    socraticHint: '\'Should\' is used to offer friendly, constructive advice and recommendations.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-015',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence denoting moral duty: \"Citizens ________ care for the elderly and vulnerable members of our community.\"',
    text: 'Complete the sentence denoting moral duty: \"Citizens ________ care for the elderly and vulnerable members of our community.\"',
    options: [
      'ought to',
      'ought',
      'must to',
      'should to'
    ],
    correctAnswer: 'ought to',
    explanation: '\'Ought to\' expresses moral duty and takes the full infinitive \'to care\'.',
    socraticHint: 'Notice the preposition \'to\' following the blank. Which modal pairs with \'to\' for moral obligation?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-016',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Because tomorrow is a national public holiday, we do not ________ wake up early for school.\"',
    text: 'Complete the sentence: \"Because tomorrow is a national public holiday, we do not ________ wake up early for school.\"',
    options: [
      'have to',
      'must',
      'ought',
      'should to'
    ],
    correctAnswer: 'have to',
    explanation: '\'Do not have to\' expresses lack of obligation or necessity in the present.',
    socraticHint: 'In negative sentences with \'do not\', which phrase indicates lack of necessity?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-017',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the hospital ward safety rule: \"Visitors ________ enter the intensive care unit without sterile masks.\"',
    text: 'Complete the hospital ward safety rule: \"Visitors ________ enter the intensive care unit without sterile masks.\"',
    options: [
      'must not',
      'should',
      'might not',
      'need not to'
    ],
    correctAnswer: 'must not',
    explanation: '\'Must not\' signals an absolute prohibition (not allowed under any circumstances).',
    socraticHint: '\'Must not\' expresses strong prohibition (something strictly forbidden).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-018',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a classroom setting, what is the most polite modal phrase to request permission to leave the room?',
    text: 'In a classroom setting, what is the most polite modal phrase to request permission to leave the room?',
    options: [
      '\"May I be excused, teacher?\"',
      '\"Must I go out, teacher?\"',
      '\"Ought I leave, teacher?\"',
      '\"Can to go, teacher?\"'
    ],
    correctAnswer: '\"May I be excused, teacher?\"',
    explanation: '\'May I...\' is the recognized courteous and formal modal structure for asking permission.',
    socraticHint: '\'May\' is the most formal and courteous modal verb for requesting permission.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-019',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence denoting past obligation: \"Yesterday, Omari twisted his ankle during the match, so he ________ visit the clinic.\"',
    text: 'Complete the sentence denoting past obligation: \"Yesterday, Omari twisted his ankle during the match, so he ________ visit the clinic.\"',
    options: [
      'had to',
      'must',
      'has to',
      'ought to'
    ],
    correctAnswer: 'had to',
    explanation: '\'Had to\' is the past tense form of \'must\' and \'have to\' used for past completed obligations.',
    socraticHint: 'Which form is the past tense of \'have to\' and \'must\'?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-020',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence expressing possibility: \"Dark clouds are gathering over the hills; it ________ rain during our evening walk.\"',
    text: 'Complete the sentence expressing possibility: \"Dark clouds are gathering over the hills; it ________ rain during our evening walk.\"',
    options: [
      'might',
      'must not',
      'ought',
      'have to'
    ],
    correctAnswer: 'might',
    explanation: '\'Might\' expresses a tentative or possible future event based on current observations.',
    socraticHint: 'Which modal indicates a realistic possibility or chance?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-021',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence expressing lack of necessity: \"The porridge already contains honey, so you ________ add any sugar.\"',
    text: 'Complete the sentence expressing lack of necessity: \"The porridge already contains honey, so you ________ add any sugar.\"',
    options: [
      'need not',
      'must not',
      'ought',
      'cannot to'
    ],
    correctAnswer: 'need not',
    explanation: '\'Need not\' means there is no requirement or necessity to do something.',
    socraticHint: '\'Need not\' indicates that something is unnecessary, though not strictly forbidden.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-022',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following sentences contains a GRAMMATICAL ERROR in the use of modal auxiliaries?',
    text: 'Which of the following sentences contains a GRAMMATICAL ERROR in the use of modal auxiliaries?',
    options: [
      '\"He must to visit the doctor immediately.\"',
      '\"He must visit the doctor immediately.\"',
      '\"He should visit the doctor immediately.\"',
      '\"He ought to visit the doctor immediately.\"'
    ],
    correctAnswer: '\"He must to visit the doctor immediately.\"',
    explanation: '\'Must\' is a pure modal auxiliary and must be followed by a bare infinitive without \'to\' (\'must visit\', not \'must to visit\').',
    socraticHint: 'Modal verbs like \'must\', \'can\', and \'should\' are followed directly by the bare infinitive without \'to\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-023',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the deduction sentence: \"Amina has been studying in the library for five straight hours; she ________ very tired.\"',
    text: 'Complete the deduction sentence: \"Amina has been studying in the library for five straight hours; she ________ very tired.\"',
    options: [
      'must be',
      'cannot be',
      'should to',
      'might not be'
    ],
    correctAnswer: 'must be',
    explanation: '\'Must be\' expresses a logical deduction of certainty based on strong evidence (five continuous hours of studying).',
    socraticHint: 'Which modal expresses logical deduction or certainty based on clear evidence?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },
  {
    id: 'q-g6-eng-u3-024',
    subStrandId: 'substrand-g6-eng-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which line of reported speech with a modal is punctuated correctly according to English rules?',
    text: 'Which line of reported speech with a modal is punctuated correctly according to English rules?',
    options: [
      '\"You must wash your hands before eating,\" the nurse reminded the pupils.',
      '\"You must wash your hands before eating\" the nurse reminded the pupils.',
      '\"You must wash your hands before eating,\", the nurse reminded the pupils.',
      '\"You must wash your hands before eating.\" the nurse reminded the pupils.'
    ],
    correctAnswer: '\"You must wash your hands before eating,\" the nurse reminded the pupils.',
    explanation: 'In direct speech preceding a reporting verb, the comma must be placed inside the quotation marks.',
    socraticHint: 'In direct speech followed by a speech tag, the comma is placed INSIDE the quotation marks.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U3'
  },

  // --- Unit 4: Mission 1 (q-g6-eng-u4-001 to 012) ---
  {
    id: 'q-g6-eng-u4-001',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Amboseli National Park lies against the majestic snow-capped silhouette of Mount Kilimanjaro. It is globally celebrated for its immense herds of free-ranging African elephants, wetlands fed by subterranean springs, and abundant birdlife.\" According to the passage, what natural backdrop frames Amboseli National Park?',
    text: '\"Amboseli National Park lies against the majestic snow-capped silhouette of Mount Kilimanjaro. It is globally celebrated for its immense herds of free-ranging African elephants, wetlands fed by subterranean springs, and abundant birdlife.\" According to the passage, what natural backdrop frames Amboseli National Park?',
    options: [
      'The snow-capped peak of Mount Kilimanjaro',
      'The sandy shores of the Indian Ocean',
      'The peaks of Mount Elgon',
      'The deep gorge of Hell\'s Gate'
    ],
    correctAnswer: 'The snow-capped peak of Mount Kilimanjaro',
    explanation: 'The excerpt explicitly mentions that Amboseli lies against the majestic snow-capped silhouette of Mount Kilimanjaro.',
    socraticHint: 'Look at the opening sentence of the excerpt: what majestic mountain stands against Amboseli?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-002',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Local Maasai pastoralists partner with Kenya Wildlife Service (KWS) rangers in community conservancies to create migratory corridors for elephants, proving that coexistence benefits both people and wildlife.\" What is the main message of this sentence?',
    text: '\"Local Maasai pastoralists partner with Kenya Wildlife Service (KWS) rangers in community conservancies to create migratory corridors for elephants, proving that coexistence benefits both people and wildlife.\" What is the main message of this sentence?',
    options: [
      'Community partnerships and wildlife corridors foster successful human-wildlife coexistence',
      'Pastoralists should never live near wildlife',
      'Elephants do not need open migratory corridors',
      'Fencing off animals completely is the only answer'
    ],
    correctAnswer: 'Community partnerships and wildlife corridors foster successful human-wildlife coexistence',
    explanation: 'The sentence highlights that cooperation between local communities and rangers enables humans and wildlife to coexist beneficially.',
    socraticHint: 'What does the partnership between rangers and community pastoralists demonstrate?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-003',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the precise meaning of \'ecotourism\' in the travel industry?',
    text: 'What is the precise meaning of \'ecotourism\' in the travel industry?',
    options: [
      'Responsible travel to natural areas that conserves the environment and improves the welfare of local people',
      'Cutting down forests to build holiday resorts',
      'Hunting endangered wild animals for sport',
      'Traveling only by supersonic airplanes'
    ],
    correctAnswer: 'Responsible travel to natural areas that conserves the environment and improves the welfare of local people',
    explanation: 'Ecotourism is sustainable, low-impact travel directed toward natural ecological environments to support conservation and local communities.',
    socraticHint: 'Combine \'eco\' (environment) and \'tourism\' (travel): low-impact, sustainable travel.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-004',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"The annual wildebeest migration across the Mara River is a spectacular natural event.\" What is the best synonym for \'spectacular\'?',
    text: '\"The annual wildebeest migration across the Mara River is a spectacular natural event.\" What is the best synonym for \'spectacular\'?',
    options: [
      'Breathtaking',
      'Dull',
      'Ordinary',
      'Tiny'
    ],
    correctAnswer: 'Breathtaking',
    explanation: '\'Spectacular\' means visually magnificent, stunning, or dramatic; \'breathtaking\' is its closest synonym.',
    socraticHint: 'Spectacular describes an awe-inspiring, visually striking sight.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-005',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"The black rhinoceros is a critically endangered species in East Africa.\" What is the antonym of \'endangered\'?',
    text: '\"The black rhinoceros is a critically endangered species in East Africa.\" What is the antonym of \'endangered\'?',
    options: [
      'Thriving / Abundant',
      'Extinct',
      'Rare',
      'Vulnerable'
    ],
    correctAnswer: 'Thriving / Abundant',
    explanation: '\'Endangered\' describes a population at severe risk of dying out; its antonym is flourishing, thriving, or abundant.',
    socraticHint: '\'Endangered\' means threatened with extinction. What is the opposite of being at risk of dying out?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-006',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The Kenya Wildlife Service (KWS) patrols national parks to combat \'poaching\'. What does \'poaching\' mean?',
    text: 'The Kenya Wildlife Service (KWS) patrols national parks to combat \'poaching\'. What does \'poaching\' mean?',
    options: [
      'The illegal hunting, capturing, or killing of wild animals',
      'Cooking eggs in boiling water',
      'Setting up tourist safari tents',
      'Taking wildlife photographs'
    ],
    correctAnswer: 'The illegal hunting, capturing, or killing of wild animals',
    explanation: 'Poaching is the unauthorized, illegal capture or killing of wild fauna, especially protected game species.',
    socraticHint: 'In wildlife conservation, poaching refers to unlawful, prohibited killing or trapping of wildlife.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-007',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kenya\'s marine national parks in Watamu and Kisite-Mpunguti are famous for protecting which wildlife habitat?',
    text: 'Kenya\'s marine national parks in Watamu and Kisite-Mpunguti are famous for protecting which wildlife habitat?',
    options: [
      'Coral reefs, sea turtles, and colorful marine fish',
      'Mountain gorillas and snow leopards',
      'Desert cacti and camels',
      'Arctic polar bears'
    ],
    correctAnswer: 'Coral reefs, sea turtles, and colorful marine fish',
    explanation: 'Marine parks protect coastal and aquatic biodiversity, including coral reef gardens, dolphins, sea turtles, and tropical fish.',
    socraticHint: 'Marine parks protect ocean environments, coral formations, and sea creatures.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-008',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In the descriptive sentence \"the golden, whispering savanna grasses,\" what sensory detail is evoked by the word \'whispering\'?',
    text: 'In the descriptive sentence \"the golden, whispering savanna grasses,\" what sensory detail is evoked by the word \'whispering\'?',
    options: [
      'Sound (auditory)',
      'Taste (gustatory)',
      'Smell (olfactory)',
      'Temperature'
    ],
    correctAnswer: 'Sound (auditory)',
    explanation: '\'Whispering\' personifies the gentle rustling sound made by dry savanna grass as the wind blows through it.',
    socraticHint: '\'Whispering\' describes the rustling sound of dry grass swaying in the wind.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-009',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is a \'wildlife conservancy\' in Kenya\'s conservation landscape?',
    text: 'What is a \'wildlife conservancy\' in Kenya\'s conservation landscape?',
    options: [
      'A designated land area managed by private landowners or local communities to protect wildlife habitats',
      'A busy downtown shopping mall',
      'A factory that processes plastic',
      'A closed animal cage in a laboratory'
    ],
    correctAnswer: 'A designated land area managed by private landowners or local communities to protect wildlife habitats',
    explanation: 'Conservancies are community or private lands designated for sustainable wildlife protection alongside managed livestock grazing.',
    socraticHint: 'Conservancies are community-managed open lands where wildlife and pastoral communities coexist.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-010',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A giraffe that feeds exclusively on acacia leaves and branches is classified as a:',
    text: 'A giraffe that feeds exclusively on acacia leaves and branches is classified as a:',
    options: [
      'Herbivore',
      'Carnivore',
      'Omnivore',
      'Parasite'
    ],
    correctAnswer: 'Herbivore',
    explanation: 'An animal that feeds entirely on plants, leaves, and vegetation is a herbivore.',
    socraticHint: 'Animals that feed solely on plants and vegetation are herbivores.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-011',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the primary communicative purpose of a travel brochure published by the Kenya Tourism Board?',
    text: 'What is the primary communicative purpose of a travel brochure published by the Kenya Tourism Board?',
    options: [
      'To inform travelers about attractions and persuade them to visit',
      'To test students on geography facts',
      'To complain about hotel prices',
      'To provide medical prescriptions'
    ],
    correctAnswer: 'To inform travelers about attractions and persuade them to visit',
    explanation: 'Travel brochures combine factual descriptions and persuasive imagery to attract visitors to tourist destinations.',
    socraticHint: 'Travel brochures are promotional materials designed to inform and attract tourists.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-012',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate phrasal verb: \"The tourist safari van ________ at dawn to catch the sunrise over the savanna.\"',
    text: 'Complete the sentence with the appropriate phrasal verb: \"The tourist safari van ________ at dawn to catch the sunrise over the savanna.\"',
    options: [
      'set off',
      'set down',
      'set up',
      'set in'
    ],
    correctAnswer: 'set off',
    explanation: '\'Set off\' (or set out) means to begin or embark upon a journey.',
    socraticHint: 'Which phrasal verb means to start a journey?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },

  // --- Unit 4: Mission 2 (q-g6-eng-u4-013 to 024) ---
  {
    id: 'q-g6-eng-u4-013',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the comparative sentence: \"Mount Kenya is high, but Mount Kilimanjaro is ________.\"',
    text: 'Complete the comparative sentence: \"Mount Kenya is high, but Mount Kilimanjaro is ________.\"',
    options: [
      'higher',
      'highest',
      'more high',
      'most high'
    ],
    correctAnswer: 'higher',
    explanation: 'When comparing two entities, the comparative degree of a single-syllable adjective is formed by adding -er: \'higher\'.',
    socraticHint: 'Comparing two entities requires the comparative degree (-er).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-014',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the superlative sentence: \"Lake Victoria is the ________ freshwater lake in Africa.\"',
    text: 'Complete the superlative sentence: \"Lake Victoria is the ________ freshwater lake in Africa.\"',
    options: [
      'largest',
      'larger',
      'most large',
      'more large'
    ],
    correctAnswer: 'largest',
    explanation: 'When identifying the top entity among all members of a group, the superlative degree (-est) is required: \'the largest\'.',
    socraticHint: 'When comparing three or more items or referring to the supreme one, use the superlative degree (-est).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-015',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the correct comparative form of the irregular adjective \'good\'?',
    text: 'What is the correct comparative form of the irregular adjective \'good\'?',
    options: [
      'Better',
      'Gooder',
      'More good',
      'Best'
    ],
    correctAnswer: 'Better',
    explanation: '\'Good\' changes irregularly across degrees: positive = good, comparative = better, superlative = best.',
    socraticHint: '\'Good\' changes irregularly: good, better, best.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-016',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the comparative sentence: \"The drought this year was ________ than last year\'s.\"',
    text: 'Complete the comparative sentence: \"The drought this year was ________ than last year\'s.\"',
    options: [
      'worse',
      'badder',
      'more bad',
      'worst'
    ],
    correctAnswer: 'worse',
    explanation: 'The irregular comparative form of \'bad\' is \'worse\'.',
    socraticHint: 'The comparative of \'bad\' when comparing two seasons is \'worse\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-017',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the superlative sentence: \"The wildebeest migration is one of the ________ wildlife spectacles on Earth.\"',
    text: 'Complete the superlative sentence: \"The wildebeest migration is one of the ________ wildlife spectacles on Earth.\"',
    options: [
      'most spectacular',
      'more spectacular',
      'spectacularist',
      'spectacularer'
    ],
    correctAnswer: 'most spectacular',
    explanation: 'Polysyllabic adjectives form the superlative by placing \'most\' before the adjective: \'most spectacular\'.',
    socraticHint: 'Adjectives of three or more syllables use \'more\' for comparative and \'most\' for superlative.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-018',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the standard natural royal order of cumulative adjectives in English (OSASCOMP)?',
    text: 'What is the standard natural royal order of cumulative adjectives in English (OSASCOMP)?',
    options: [
      'Opinion -> Size -> Age -> Shape -> Colour -> Origin -> Material -> Purpose',
      'Material -> Size -> Colour -> Opinion',
      'Origin -> Colour -> Shape -> Age',
      'Purpose -> Size -> Opinion -> Origin'
    ],
    correctAnswer: 'Opinion -> Size -> Age -> Shape -> Colour -> Origin -> Material -> Purpose',
    explanation: 'In English, cumulative adjectives follow the rule: Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose.',
    socraticHint: 'Remember OSASCOMP: Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-019',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which phrase arranges the adjectives in the correct standard grammatical order (Size, Colour, Material)?',
    text: 'Which phrase arranges the adjectives in the correct standard grammatical order (Size, Colour, Material)?',
    options: [
      'A large brown leather travel bag',
      'A brown large leather travel bag',
      'A leather large brown travel bag',
      'A travel leather brown large bag'
    ],
    correctAnswer: 'A large brown leather travel bag',
    explanation: 'Size (\'large\') precedes Colour (\'brown\'), which precedes Material (\'leather\').',
    socraticHint: 'Size (large) comes before Colour (brown), which comes before Material (leather).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-020',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence uses the correct royal adjective order (Opinion, Origin, Material)?',
    text: 'Which sentence uses the correct royal adjective order (Opinion, Origin, Material)?',
    options: [
      '\"We bought a beautiful Kenyan wood carving.\"',
      '\"We bought a Kenyan beautiful wood carving.\"',
      '\"We bought a wood beautiful Kenyan carving.\"',
      '\"We bought a Kenyan wood beautiful carving.\"'
    ],
    correctAnswer: '\"We bought a beautiful Kenyan wood carving.\"',
    explanation: 'Opinion (\'beautiful\') comes before Origin (\'Kenyan\'), which comes before Material (\'wood\').',
    socraticHint: 'Opinion (beautiful) always precedes Origin (Kenyan), followed by Material (wood).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-021',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which phrase correctly arranges the adjectives (Age, Origin, Style)?',
    text: 'Which phrase correctly arranges the adjectives (Age, Origin, Style)?',
    options: [
      'An ancient Maasai beaded necklace',
      'A Maasai ancient beaded necklace',
      'A beaded Maasai ancient necklace',
      'An ancient beaded Maasai necklace'
    ],
    correctAnswer: 'An ancient Maasai beaded necklace',
    explanation: 'Age (\'ancient\') precedes Origin (\'Maasai\'), which precedes Material/Attribute (\'beaded\').',
    socraticHint: 'Age (ancient) comes before Origin (Maasai), which comes before Material/Style (beaded).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-022',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the comparative sentence: \"Cheetahs run ________ than lions across open grassland.\"',
    text: 'Complete the comparative sentence: \"Cheetahs run ________ than lions across open grassland.\"',
    options: [
      'faster',
      'more fast',
      'fastest',
      'most fast'
    ],
    correctAnswer: 'faster',
    explanation: 'The comparative degree of the short adverb/adjective \'fast\' is \'faster\'.',
    socraticHint: 'Short single-syllable adjectives add -er: \'fast\' becomes \'faster\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-023',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence showing comparison of equality: \"A young zebra is not ________ strong as a mature stallion.\"',
    text: 'Complete the sentence showing comparison of equality: \"A young zebra is not ________ strong as a mature stallion.\"',
    options: [
      'as',
      'so much',
      'more',
      'like'
    ],
    correctAnswer: 'as',
    explanation: 'Equality of comparison is formed with \'as... as\': \'not as strong as\'.',
    socraticHint: 'The correlative construction showing equality of comparison is \'as + adjective + as\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  },
  {
    id: 'q-g6-eng-u4-024',
    subStrandId: 'substrand-g6-eng-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When two coordinate adjectives describe the same noun, a comma separates them. Which sentence is punctuated correctly?',
    text: 'When two coordinate adjectives describe the same noun, a comma separates them. Which sentence is punctuated correctly?',
    options: [
      '\"The tourists admired the vast, silent savanna.\"',
      '\"The tourists admired the vast silent, savanna.\"',
      '\"The tourists admired the, vast silent savanna.\"',
      '\"The tourists admired the vast; silent savanna.\"'
    ],
    correctAnswer: '\"The tourists admired the vast, silent savanna.\"',
    explanation: 'Coordinate adjectives of equal status (\'vast\' and \'silent\') modifying \'savanna\' are separated by a comma.',
    socraticHint: 'Coordinate adjectives describing the same noun take a separating comma between them.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U4'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(que => que.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// 5. Write back to database file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 2 of Grade 6 English Language successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
