import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 English Language Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-eng-u5',
    strandId: 'strand-g6-eng-grammar',
    learningAreaId: 'la-english-g6',
    title: 'Financial Literacy, Trade, Mobile Money & Advanced Conjunctions',
    description: 'Developing financial vocabulary (budgeting, mobile money, investment, savings); practicing polite business negotiation and commercial etiquette; and mastering complex conjunctions of concession, contrast, reason, and condition (although, despite, in spite of, whereas, provided that).',
    cbeCompetency: 'Financial literacy, consumer discernment, commercial negotiation, and complex syntactic subordination',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g6-eng-u6',
    strandId: 'strand-g6-eng-listening',
    learningAreaId: 'la-english-g6',
    title: 'Transport, Road Safety, Highway Code & Prepositions of Movement',
    description: 'Engaging in structured debates on transport infrastructure (SGR vs road haulage); reading and applying the Highway Code and road safety rules; mastering prepositions of movement, place, and direction (through, across, along, into); and using travel phrasal verbs.',
    cbeCompetency: 'Civic safety consciousness, persuasive oral argumentation, spatial prepositional fluency, and travel register mastery',
    estimatedMinutes: 30,
    order: 6
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 3 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-eng-u5-l1',
    subStrandId: 'substrand-g6-eng-u5',
    title: 'Enterprise, Mobile Money (M-Pesa) & Business Dialogues',
    content: 'Commerce and enterprise drive community development and economic self-reliance.\n\n1. Essential Financial Concepts:\n- Budget: A structured plan balancing expected income against planned expenditure.\n- Entrepreneur: An innovator who creates a business venture and manages commercial risks.\n- Investment: Allocating resources into assets with the expectation of generating future returns.\n- Receipts & Invoices: Written documentation verifying payment and safeguarding consumer rights.\n\n2. Mobile Money Security:\n- Always double-check recipient names on verification prompts before typing your secret PIN.\n- Beware of fraudulent messages claiming false M-Pesa reversals.\n\n3. Financial Idioms:\n- "To cost an arm and a leg": To be excessively expensive.\n- "To save for a rainy day": To put money aside for unforeseen emergencies.\n- "To make ends meet": To earn just enough money to cover essential living costs.\n\n4. Polite Commercial Negotiations:\n- Courteous bargaining: "Could you kindly consider a slight discount on this item?"',
    didYouKnow: 'Kenya\'s M-Pesa, launched in 2007, was the world\'s first mobile-phone-based money transfer service and is now studied globally as a benchmark of financial inclusion!',
    kenyanContext: 'Youth entrepreneurs in Eldoret run cooperative poultry ventures, keeping digital sales ledgers on smartphones and making wholesale grain purchases via mobile wallets.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u5-l2',
    subStrandId: 'substrand-g6-eng-u5',
    title: 'Complex Conjunctions (Although, Despite, In Spite Of, Whereas) & Commercial Registers',
    content: 'Subordinating conjunctions connect clauses and express nuanced logical relationships.\n\n1. Conjunctions of Concession:\n- "Although / Even though": Followed by a complete clause (subject + verb).\n  * Example: "Although the road was muddy, the delivery truck reached the market on time."\n- "Despite / In spite of": Followed by a noun phrase or gerund (-ing verb), NOT a subject-verb clause!\n  * Note: "Despite" never takes "of" (despite the rain, NOT despite of the rain).\n  * Note: "In spite" must take "of" (in spite of the rain).\n  * Example: "In spite of working long hours, the trader maintained high spirits."\n\n2. Conjunctions of Contrast:\n- "Whereas / While": Compares two contrasting realities.\n  * Example: "Mobile money transfers occur instantly, whereas bank cheques take days."\n\n3. Conjunctions of Condition & Purpose:\n- "Provided that / As long as": On condition that.\n- "So that / In order that": States purpose.',
    didYouKnow: 'Using "Although" and "But" together in the same sentence (e.g., "Although it rained, but we went") is a grammatical double conjunction error!',
    kenyanContext: 'Tea marketing reports in Mombasa use complex conjunctions: "Although international prices fluctuated, smallholder farmers earned record bonuses due to currency gains."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u6-l1',
    subStrandId: 'substrand-g6-eng-u6',
    title: 'Highway Code, SGR Travel & Road Safety Debates',
    content: 'Road and railway transport are lifelines of national integration that demand strict safety compliance.\n\n1. Highway Code & Road Safety:\n- Kerb Drill: Look right, look left, look right again before crossing any street.\n- Zebra Crossings: Marked pedestrian crossings where motorists are required to yield to walkers.\n- Safety Belts & Helmets: Legally mandatory restraints in vehicles and on motorcycles (bodabodas).\n- Pedestrian walkways and footbridges: Must be used to avoid crossing busy expressways on foot.\n\n2. The Standard Gauge Railway (SGR):\n- Modern high-capacity transport connecting Mombasa, Nairobi, and Naivasha.\n- Environmental benefits: Removes thousands of heavy cargo trucks from roads, reducing carbon emissions, highway wear, and collision risks.\n\n3. Road Signs Classification:\n- Regulatory signs (Circular): Mandatory orders (Red border = prohibition; Blue = compulsory).\n- Warning signs (Triangular, apex up): Alert drivers to hazards (bumps, pedestrian crossings).\n- Information signs (Rectangular): Direct drivers to hospitals, parking, and towns.',
    didYouKnow: 'The Highway Code was first published in Britain in 1931, but Kenya\'s National Transport and Safety Authority (NTSA) modernised our local code to protect school children across all 47 counties!',
    kenyanContext: 'Pupils at roadside schools along the busy Northern Corridor expressway actively serve as Junior Traffic Wardens, guiding fellow learners safely across marked zebra crossings.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u6-l2',
    subStrandId: 'substrand-g6-eng-u6',
    title: 'Prepositions of Movement, Place & Phrasal Verbs of Travel',
    content: '1. Prepositions of Movement and Direction:\n- "Through": Movement within a three-dimensional enclosed space (through the tunnel, through the forest).\n- "Across": Movement from one side of a surface to the opposite side (across the footbridge, across the road).\n- "Along": Movement following the linear direction of a boundary or road (along the highway).\n- "Into": Movement from outside to inside an enclosed space (stepped into the vehicle).\n\n2. Prepositions with Vehicles:\n- "On": Public transit where you can walk down an aisle (on the train, on the bus, on the plane, on the ferry).\n- "In": Private vehicles where you sit inside directly (in the car, in the taxi, in the ambulance).\n\n3. Phrasal Verbs of Travel:\n- "Set off / Set out": To begin a journey.\n- "Break down": For a vehicle/engine to malfunction and stop.\n- "Pull over": To steer a vehicle to the roadside and stop.\n- "Drop off": To leave passengers or goods at their destination.',
    didYouKnow: 'English uses "on" for buses and trains because historically passengers boarded large open stagecoaches and ship decks where you stepped "on board"!',
    kenyanContext: 'Travel announcements at the SGR Syokimau station demonstrate prepositional precision: "Passengers traveling to Mombasa, please proceed through the security gates and board the train on platform one."',
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

// 3. Batch 3 Missions (4 missions: orders 130 to 133 in world-word-quest)
const missionsToAdd = [
  {
    id: 'mission-g6-eng-u5-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u5',
    lessonId: 'lesson-g6-eng-u5-l1',
    title: 'Marketplace Entrepreneur & M-Pesa Quest',
    description: 'Master budgeting terms, safe mobile money transactions, polite bargaining dialogues, financial idioms (cost an arm and a leg), and trade registers!',
    order: 130,
    orderIndex: 130,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-young-entrepreneur',
    badge: { name: 'Young Entrepreneur', icon: 'trending-up' },
    questionIds: [
      'q-g6-eng-u5-001', 'q-g6-eng-u5-002', 'q-g6-eng-u5-003', 'q-g6-eng-u5-004',
      'q-g6-eng-u5-005', 'q-g6-eng-u5-006', 'q-g6-eng-u5-007', 'q-g6-eng-u5-008',
      'q-g6-eng-u5-009', 'q-g6-eng-u5-010', 'q-g6-eng-u5-011', 'q-g6-eng-u5-012'
    ]
  },
  {
    id: 'mission-g6-eng-u5-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u5',
    lessonId: 'lesson-g6-eng-u5-l2',
    title: 'Conjunction Connoisseur & Trade Quest',
    description: 'Master subordinating conjunctions of concession (although, despite, in spite of), contrast (whereas), condition (provided that), and eliminate redundancies!',
    order: 131,
    orderIndex: 131,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-conjunction-connoisseur',
    badge: { name: 'Conjunction Connoisseur', icon: 'git-merge' },
    questionIds: [
      'q-g6-eng-u5-013', 'q-g6-eng-u5-014', 'q-g6-eng-u5-015', 'q-g6-eng-u5-016',
      'q-g6-eng-u5-017', 'q-g6-eng-u5-018', 'q-g6-eng-u5-019', 'q-g6-eng-u5-020',
      'q-g6-eng-u5-021', 'q-g6-eng-u5-022', 'q-g6-eng-u5-023', 'q-g6-eng-u5-024'
    ]
  },
  {
    id: 'mission-g6-eng-u6-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u6',
    lessonId: 'lesson-g6-eng-u6-l1',
    title: 'Road Safety Warden & Highway Navigator Quest',
    description: 'Apply the Highway Code, decode regulatory and warning road signs, master zebra crossings and seatbelt laws, and analyze SGR transport benefits!',
    order: 132,
    orderIndex: 132,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-safety-warden',
    badge: { name: 'Safety Warden', icon: 'shield' },
    questionIds: [
      'q-g6-eng-u6-001', 'q-g6-eng-u6-002', 'q-g6-eng-u6-003', 'q-g6-eng-u6-004',
      'q-g6-eng-u6-005', 'q-g6-eng-u6-006', 'q-g6-eng-u6-007', 'q-g6-eng-u6-008',
      'q-g6-eng-u6-009', 'q-g6-eng-u6-010', 'q-g6-eng-u6-011', 'q-g6-eng-u6-012'
    ]
  },
  {
    id: 'mission-g6-eng-u6-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u6',
    lessonId: 'lesson-g6-eng-u6-l2',
    title: 'Preposition Pathfinder & Travel Master Quest',
    description: 'Use prepositions of movement (through, across, along, into) and vehicle rules (on the train vs in the car), and master travel phrasal verbs (pull over, break down)!',
    order: 133,
    orderIndex: 133,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-preposition-pathfinder',
    badge: { name: 'Preposition Pathfinder', icon: 'navigation' },
    questionIds: [
      'q-g6-eng-u6-013', 'q-g6-eng-u6-014', 'q-g6-eng-u6-015', 'q-g6-eng-u6-016',
      'q-g6-eng-u6-017', 'q-g6-eng-u6-018', 'q-g6-eng-u6-019', 'q-g6-eng-u6-020',
      'q-g6-eng-u6-021', 'q-g6-eng-u6-022', 'q-g6-eng-u6-023', 'q-g6-eng-u6-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 3 Questions (48 questions: 24 for Unit 5, 24 for Unit 6)
const questionsToAdd = [
  // --- Unit 5: Mission 1 (q-g6-eng-u5-001 to 012) ---
  {
    id: 'q-g6-eng-u5-001',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the precise financial definition of a \'budget\'?',
    text: 'What is the precise financial definition of a \'budget\'?',
    options: [
      'A written financial plan estimating future income and expenses over a set period',
      'A loan borrowed from a bank',
      'A list of unpaid debts',
      'The total amount of money in a cash register'
    ],
    correctAnswer: 'A written financial plan estimating future income and expenses over a set period',
    explanation: 'A budget is an itemized estimate of income and expenditures designed to manage funds responsibly over a specific timeframe.',
    socraticHint: 'A budget balances projected earnings against planned expenditures.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-002',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An individual who identifies a business opportunity, takes financial risks, and starts an enterprise is called an:',
    text: 'An individual who identifies a business opportunity, takes financial risks, and starts an enterprise is called an:',
    options: [
      'Entrepreneur',
      'Employee',
      'Auditor',
      'Apprentice'
    ],
    correctAnswer: 'Entrepreneur',
    explanation: 'An entrepreneur is a person who sets up a business venture, taking on financial and operational risks in the hope of generating profit.',
    socraticHint: 'What is the term for an innovative business creator and self-starter?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-003',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When sending money via M-Pesa or a mobile wallet, what vital safety step should a user take before pressing \'Send\'?',
    text: 'When sending money via M-Pesa or a mobile wallet, what vital safety step should a user take before pressing \'Send\'?',
    options: [
      'Verify the recipient\'s registered full name and phone number on the confirmation screen',
      'Press send as fast as possible without looking',
      'Share their secret PIN aloud with strangers',
      'Turn off their phone immediately'
    ],
    correctAnswer: 'Verify the recipient\'s registered full name and phone number on the confirmation screen',
    explanation: 'Checking the confirmation screen ensures that money is sent to the correct intended recipient and prevents erroneous financial transfers.',
    socraticHint: 'How do you ensure funds reach the intended person rather than an incorrect phone number?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-004',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does \'interest\' mean when saving money in a SACCO or commercial bank?',
    text: 'What does \'interest\' mean when saving money in a SACCO or commercial bank?',
    options: [
      'Additional money earned by the depositor on the savings over time',
      'A fine charged for opening an account',
      'Money stolen by fraudsters',
      'A tax paid on market stalls'
    ],
    correctAnswer: 'Additional money earned by the depositor on the savings over time',
    explanation: 'Interest is the monetary return paid by a financial institution to depositors for keeping their funds in savings accounts.',
    socraticHint: 'Banks pay savers a reward percentage on the money they deposit.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-005',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following phrases is the most polite and courteous way to negotiate a price at Gikomba Market?',
    text: 'Which of the following phrases is the most polite and courteous way to negotiate a price at Gikomba Market?',
    options: [
      '\"Could you please give me a small discount on this basket?\"',
      '\"This price is ridiculous, lower it now!\"',
      '\"Give it to me for free!\"',
      '\"You are cheating me!\"'
    ],
    correctAnswer: '\"Could you please give me a small discount on this basket?\"',
    explanation: 'Polite commercial bargaining employs respectful conditional phrasing such as \"Could you please...\" to establish goodwill.',
    socraticHint: 'Polite bargaining uses respectful requests like \'Could you please...\' rather than harsh demands.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-006',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Why is it essential for a customer to request and keep an official receipt after purchasing goods?',
    text: 'Why is it essential for a customer to request and keep an official receipt after purchasing goods?',
    options: [
      'It serves as written legal proof of payment and allows returns or warranty claims',
      'It is used to wrap food',
      'It automatically enters you into a lottery',
      'It reduces the price of the items'
    ],
    correctAnswer: 'It serves as written legal proof of payment and allows returns or warranty claims',
    explanation: 'A receipt provides tangible proof of purchase, protecting consumer rights if goods need to be refunded, replaced, or audited.',
    socraticHint: 'A receipt is an official paper or digital record confirming a financial transaction.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-007',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If a brand new laptop \'costs an arm and a leg\', what does this idiom mean?',
    text: 'If a brand new laptop \'costs an arm and a leg\', what does this idiom mean?',
    options: [
      'It is extremely expensive',
      'It is very cheap',
      'It requires physical surgery',
      'It is broken and useless'
    ],
    correctAnswer: 'It is extremely expensive',
    explanation: 'The idiom \'to cost an arm and a leg\' means to be very costly or sold at an exceptionally high price.',
    socraticHint: 'This popular idiom describes something sold at an exorbitant or very high price.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-008',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does the common financial expression \'saving for a rainy day\' mean?',
    text: 'What does the common financial expression \'saving for a rainy day\' mean?',
    options: [
      'Setting aside money for unexpected future emergencies',
      'Buying umbrellas and gumboots',
      'Spending all your earnings when it rains',
      'Lending money to strangers'
    ],
    correctAnswer: 'Setting aside money for unexpected future emergencies',
    explanation: '\'Saving for a rainy day\' means putting aside emergency reserves to provide financial security during unforeseen hardships.',
    socraticHint: 'Rain represents unforeseen hardships or difficult times in the future.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-009',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Buying improved dairy cows or high-yield fruit seedlings with the expectation of earning future profit is an example of:',
    text: 'Buying improved dairy cows or high-yield fruit seedlings with the expectation of earning future profit is an example of:',
    options: [
      'An investment',
      'A donation',
      'An expense',
      'A lottery'
    ],
    correctAnswer: 'An investment',
    explanation: 'An investment is the commitment of funds or capital into productive assets with the objective of generating future returns or income.',
    socraticHint: 'Putting resources into assets that generate future returns and growth is called an investment.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-010',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Wangari is known for her frugal spending habits; she avoids wasting money on unnecessary luxuries.\" What is a synonym for \'frugal\'?',
    text: '\"Wangari is known for her frugal spending habits; she avoids wasting money on unnecessary luxuries.\" What is a synonym for \'frugal\'?',
    options: [
      'Economical / Thrifty',
      'Wasteful',
      'Greedy',
      'Careless'
    ],
    correctAnswer: 'Economical / Thrifty',
    explanation: '\'Frugal\' means careful, prudent, and economical regarding the use of money and resources.',
    socraticHint: 'A frugal person spends money prudently and carefully without waste.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-011',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A person who owes money to others is in debt. What is the antonym of \'debt\' when someone has accumulated surplus funds?',
    text: 'A person who owes money to others is in debt. What is the antonym of \'debt\' when someone has accumulated surplus funds?',
    options: [
      'Credit / Surplus',
      'Liability',
      'Deficit',
      'Loan'
    ],
    correctAnswer: 'Credit / Surplus',
    explanation: 'Debt represents money borrowed and owed (a negative balance); its opposite is credit or surplus funds.',
    socraticHint: 'If debt is money owed, the opposite is positive funds or credit balance.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-012',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate phrasal verb: \"The shopkeeper took a small loan to stock shelves and managed to ________ the entire amount in six months.\"',
    text: 'Complete the sentence with the appropriate phrasal verb: \"The shopkeeper took a small loan to stock shelves and managed to ________ the entire amount in six months.\"',
    options: [
      'pay back',
      'pay in',
      'pay for',
      'pay with'
    ],
    correctAnswer: 'pay back',
    explanation: '\'Pay back\' means to return borrowed money or repay a debt to a creditor.',
    socraticHint: 'Which phrasal verb means to return borrowed money to a lender?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },

  // --- Unit 5: Mission 2 (q-g6-eng-u5-013 to 024) ---
  {
    id: 'q-g6-eng-u5-013',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate conjunction of concession: \"________ the initial cost of solar panels was high, the school saved millions of shillings on electricity over five years.\"',
    text: 'Complete the sentence with the appropriate conjunction of concession: \"________ the initial cost of solar panels was high, the school saved millions of shillings on electricity over five years.\"',
    options: [
      'Although',
      'Because',
      'Since',
      'Therefore'
    ],
    correctAnswer: 'Although',
    explanation: '\'Although\' introduces a subordinate concessive clause expressing a fact that makes the main clause surprising.',
    socraticHint: 'Which subordinating conjunction introduces a contrasting concession or unexpected outcome?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-014',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following sentences using \'despite\' or \'in spite of\' is grammatically CORRECT?',
    text: 'Which of the following sentences using \'despite\' or \'in spite of\' is grammatically CORRECT?',
    options: [
      '\"Despite the heavy rain, the market traders opened their stalls early.\"',
      '\"Despite of the heavy rain, the market traders opened their stalls early.\"',
      '\"In spite the heavy rain, the market traders opened their stalls early.\"',
      '\"Despite it rained heavily, the market traders opened their stalls early.\"'
    ],
    correctAnswer: '\"Despite the heavy rain, the market traders opened their stalls early.\"',
    explanation: '\'Despite\' is a preposition followed directly by a noun phrase without \'of\'. In contrast, \'in spite\' must always be followed by \'of\'.',
    socraticHint: 'Remember: \'despite\' is NEVER followed by \'of\', while \'in spite\' MUST be followed by \'of\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-015',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the conjunction of contrast: \"M-Pesa transactions are processed instantly, ________ traditional paper cheques often take several days to clear.\"',
    text: 'Complete the sentence with the conjunction of contrast: \"M-Pesa transactions are processed instantly, ________ traditional paper cheques often take several days to clear.\"',
    options: [
      'whereas',
      'because',
      'so',
      'unless'
    ],
    correctAnswer: 'whereas',
    explanation: '\'Whereas\' contrasts two facts or situations, emphasizing their opposing qualities.',
    socraticHint: 'Which conjunction highlights a direct contrast between two distinct facts?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-016',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence correctly uses and punctuates the transitional adverb \'however\'?',
    text: 'Which sentence correctly uses and punctuates the transitional adverb \'however\'?',
    options: [
      '\"The cooperative had little capital; however, it managed to purchase a modern milk cooler.\"',
      '\"Although the cooperative had little capital, however it managed to purchase a milk cooler.\"',
      '\"The cooperative had little capital although, it managed to purchase a milk cooler.\"',
      '\"However the cooperative had little capital, it purchased a milk cooler.\"'
    ],
    correctAnswer: '\"The cooperative had little capital; however, it managed to purchase a modern milk cooler.\"',
    explanation: '\'However\' used as a conjunctive adverb connecting two independent clauses is preceded by a semicolon and followed by a comma.',
    socraticHint: 'Never use \'although\' and \'however\' in the same clause together!',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-017',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"In spite of ________ injured, the artisan finished crafting the wooden table on time.\"',
    text: 'Complete the sentence: \"In spite of ________ injured, the artisan finished crafting the wooden table on time.\"',
    options: [
      'being',
      'was',
      'been',
      'having to'
    ],
    correctAnswer: 'being',
    explanation: '\'In spite of\' is a prepositional phrase and must be followed by a noun phrase or gerund (\'being\').',
    socraticHint: '\'In spite of\' is a prepositional phrase and must be followed by a gerund (-ing form).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-018',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence expressing purpose: \"Farmer Mutua installed drip pipes ________ his crops would receive water without waste.\"',
    text: 'Complete the sentence expressing purpose: \"Farmer Mutua installed drip pipes ________ his crops would receive water without waste.\"',
    options: [
      'so that',
      'although',
      'despite',
      'whereas'
    ],
    correctAnswer: 'so that',
    explanation: '\'So that\' is a subordinating conjunction of purpose, showing why an action was performed.',
    socraticHint: 'Which conjunction introduces the intended purpose or objective of an action?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-019',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence denoting reason: \"________ vegetables were in high demand at the market, the greengrocers sold out all their stock by noon.\"',
    text: 'Complete the sentence denoting reason: \"________ vegetables were in high demand at the market, the greengrocers sold out all their stock by noon.\"',
    options: [
      'Since',
      'Although',
      'Whereas',
      'Despite'
    ],
    correctAnswer: 'Since',
    explanation: '\'Since\' here operates as a conjunction of reason (synonymous with \'because\' or \'as\').',
    socraticHint: 'Which conjunction introduces the underlying cause or reason for selling out?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-020',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence using correlative conjunctions: \"The new digital kiosk ________ saved time for the villagers, ________ created employment for two youths.\"',
    text: 'Complete the sentence using correlative conjunctions: \"The new digital kiosk ________ saved time for the villagers, ________ created employment for two youths.\"',
    options: [
      'not only, but also',
      'neither, or',
      'either, and',
      'both, but'
    ],
    correctAnswer: 'not only, but also',
    explanation: '\'Not only ... but also\' joins two parallel predicate phrases to highlight multiple advantages.',
    socraticHint: 'Which pair of correlative conjunctions emphasizes two complementary positive benefits?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-021',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence denoting conditional requirement: \"The bank will approve the youth enterprise loan ________ the applicants submit a viable business plan.\"',
    text: 'Complete the sentence denoting conditional requirement: \"The bank will approve the youth enterprise loan ________ the applicants submit a viable business plan.\"',
    options: [
      'provided that',
      'although',
      'whereas',
      'despite'
    ],
    correctAnswer: 'provided that',
    explanation: '\'Provided that\' means \'on the condition that\' or \'only if\'.',
    socraticHint: 'Which conjunction means \'on the condition that\'?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-022',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following sentences contains a grammatical error of REDUNDANT CONJUNCTIONS?',
    text: 'Which of the following sentences contains a grammatical error of REDUNDANT CONJUNCTIONS?',
    options: [
      '\"Although Kamau worked hard, but he did not make a profit.\"',
      '\"Although Kamau worked hard, he did not make a profit.\"',
      '\"Kamau worked hard, but he did not make a profit.\"',
      '\"In spite of working hard, Kamau did not make a profit.\"'
    ],
    correctAnswer: '\"Although Kamau worked hard, but he did not make a profit.\"',
    explanation: 'Using \'although\' (subordinating) and \'but\' (coordinating) together creates a double-conjunction error. Only one conjunction is required.',
    socraticHint: 'Using \'although\' and \'but\' together in the same sentence is a double conjunction error.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-023',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Buying goods in large bulk quantities directly from factories at lower prices is known as:',
    text: 'Buying goods in large bulk quantities directly from factories at lower prices is known as:',
    options: [
      'Wholesale',
      'Retail',
      'Barter',
      'Auction'
    ],
    correctAnswer: 'Wholesale',
    explanation: '\'Wholesale\' refers to the sale of goods in large quantities at lower unit prices, typically for resale by retailers.',
    socraticHint: 'Bulk purchasing for resale to shopkeepers is wholesale, while selling in small units to consumers is retail.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },
  {
    id: 'q-g6-eng-u5-024',
    subStrandId: 'substrand-g6-eng-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence using \'despite the fact that\' is punctuated correctly?',
    text: 'Which sentence using \'despite the fact that\' is punctuated correctly?',
    options: [
      '\"Despite the fact that the road was muddy, the delivery truck reached the market.\"',
      '\"Despite the fact that, the road was muddy the delivery truck reached the market.\"',
      '\"Despite the fact that the road was muddy the delivery truck reached, the market.\"',
      '\"Despite the fact, that the road was muddy, the delivery truck reached the market.\"'
    ],
    correctAnswer: '\"Despite the fact that the road was muddy, the delivery truck reached the market.\"',
    explanation: 'A comma correctly separates the dependent introductory clause from the main independent clause.',
    socraticHint: 'When the complex introductory clause finishes, place a comma before the main clause.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U5'
  },

  // --- Unit 6: Mission 1 (q-g6-eng-u6-001 to 012) ---
  {
    id: 'q-g6-eng-u6-001',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What must pedestrians do before stepping onto a designated zebra crossing on a Kenyan road?',
    text: 'What must pedestrians do before stepping onto a designated zebra crossing on a Kenyan road?',
    options: [
      'Stop, look right, look left, look right again, and ensure approaching vehicles have halted',
      'Run across blindly with eyes closed',
      'Walk while staring at a mobile phone screen',
      'Wave a flag and run without looking'
    ],
    correctAnswer: 'Stop, look right, look left, look right again, and ensure approaching vehicles have halted',
    explanation: 'The standard Kerb Drill requires pedestrians to stop, look right, look left, look right again, and verify that vehicles have stopped before crossing.',
    socraticHint: 'Recall the classic Kerb Drill: Look right, look left, look right again.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-002',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a school debate on \'Rail Transport vs Road Haulage\', what is a major environmental advantage of the Standard Gauge Railway (SGR)?',
    text: 'In a school debate on \'Rail Transport vs Road Haulage\', what is a major environmental advantage of the Standard Gauge Railway (SGR)?',
    options: [
      'A single freight train carries cargo equivalent to dozens of trucks, drastically cutting carbon emissions and road wear',
      'Trains produce more smoke than trucks',
      'Trains use petrol from small jerrycans',
      'Trains only operate at night'
    ],
    correctAnswer: 'A single freight train carries cargo equivalent to dozens of trucks, drastically cutting carbon emissions and road wear',
    explanation: 'Rail freight has far higher fuel efficiency per ton-kilometer, drastically lowering carbon emissions and highway congestion compared to road trucks.',
    socraticHint: 'Moving heavy cargo on electric/diesel trains is far more fuel-efficient per ton than hundreds of individual trucks.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-003',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the precise definition of a \'pedestrian\' in road transport?',
    text: 'What is the precise definition of a \'pedestrian\' in road transport?',
    options: [
      'A person walking along a road or pavement rather than traveling in a vehicle',
      'A driver of a long-distance bus',
      'A traffic police officer on a motorcycle',
      'A pilot flying a plane'
    ],
    correctAnswer: 'A person walking along a road or pavement rather than traveling in a vehicle',
    explanation: 'A pedestrian is any road user traveling on foot along footpaths, pavements, or pedestrian crossings.',
    socraticHint: 'The Latin root \'ped-\' means foot (one who travels on foot).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-004',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In Kenya\'s traffic signage system, what does a red triangular sign with its apex pointing upwards signify?',
    text: 'In Kenya\'s traffic signage system, what does a red triangular sign with its apex pointing upwards signify?',
    options: [
      'A hazard warning (caution ahead)',
      'A mandatory command to turn',
      'A tourist attraction',
      'A parking bay'
    ],
    correctAnswer: 'A hazard warning (caution ahead)',
    explanation: 'Equilateral triangular signs pointing upwards are hazard warning signs that alert road users to impending road conditions.',
    socraticHint: 'Triangular road signs warn road users of hazards such as bumps, sharp bends, or pedestrian crossings.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-005',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Why are all passengers in private cars and public matatus legally mandated to wear seatbelts?',
    text: 'Why are all passengers in private cars and public matatus legally mandated to wear seatbelts?',
    options: [
      'Seatbelts restrain passengers during sudden deceleration, significantly reducing severe injuries',
      'They keep passengers warm',
      'They make the vehicle travel faster',
      'They play radio music'
    ],
    correctAnswer: 'Seatbelts restrain passengers during sudden deceleration, significantly reducing severe injuries',
    explanation: 'Seatbelts restrain occupants during sudden braking or collisions, preventing ejections and impact against the vehicle interior.',
    socraticHint: 'Seatbelts are life-saving safety restraints designed to prevent impact during sudden stops or collisions.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-006',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The point where two or more roads meet or intersect is called a:',
    text: 'The point where two or more roads meet or intersect is called a:',
    options: [
      'Junction',
      'Flyover',
      'Pavement',
      'Causeway'
    ],
    correctAnswer: 'Junction',
    explanation: 'A junction is a place where two or more roads or railway tracks meet or cross.',
    socraticHint: 'What do we call an intersection where multiple roads connect?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-007',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the official operational role of a public bus or matatu conductor?',
    text: 'What is the official operational role of a public bus or matatu conductor?',
    options: [
      'To issue travel tickets, collect fares, and assist passengers boarding and alighting',
      'To overhaul the engine while driving',
      'To direct highway air traffic',
      'To design railway bridges'
    ],
    correctAnswer: 'To issue travel tickets, collect fares, and assist passengers boarding and alighting',
    explanation: 'A conductor is responsible for passenger welfare, ticket validation, fare collection, and safe embarking and disembarking.',
    socraticHint: 'Conductors manage customer service, tickets, and passenger assistance on public transit.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-008',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Why must bodaboda (motorcycle) riders and their passengers always wear safety helmets?',
    text: 'Why must bodaboda (motorcycle) riders and their passengers always wear safety helmets?',
    options: [
      'To protect the skull and brain from traumatic injury in the event of an accident',
      'To block the sound of the engine',
      'To keep their hair tidy',
      'To look stylish on the road'
    ],
    correctAnswer: 'To protect the skull and brain from traumatic injury in the event of an accident',
    explanation: 'Helmets absorb kinetic shock and cushion the head, drastically reducing fatal head trauma during traffic accidents.',
    socraticHint: 'Helmets provide vital cranial protection against impacts.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-009',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Traffic reports on Nairobi\'s Uhuru Highway often mention \'traffic congestion\'. What does this mean?',
    text: 'Traffic reports on Nairobi\'s Uhuru Highway often mention \'traffic congestion\'. What does this mean?',
    options: [
      'Heavy crowding of vehicles causing severe delays and gridlock',
      'Empty roads with zero vehicles',
      'Roads under night lighting',
      'A celebration of vintage cars'
    ],
    correctAnswer: 'Heavy crowding of vehicles causing severe delays and gridlock',
    explanation: 'Traffic congestion is a condition characterized by slower speeds, longer trip times, and increased vehicular queueing.',
    socraticHint: 'Congestion refers to overcrowded traffic conditions where vehicles move very slowly.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-010',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"The traffic officer reprimanded the driver for reckless overtaking on a blind corner.\" What is the antonym of \'reckless\'?',
    text: '\"The traffic officer reprimanded the driver for reckless overtaking on a blind corner.\" What is the antonym of \'reckless\'?',
    options: [
      'Cautious / Careful',
      'Rash',
      'Dangerous',
      'Fast'
    ],
    correctAnswer: 'Cautious / Careful',
    explanation: '\'Reckless\' means acting without thought or care for the consequences; the direct antonym is cautious, prudent, or careful.',
    socraticHint: '\'Reckless\' means heedless of danger or careless. What is the opposite?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-011',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'At a road roundabout in Kenya (where driving is on the left side of the road), traffic entering the roundabout must give way to traffic:',
    text: 'At a road roundabout in Kenya (where driving is on the left side of the road), traffic entering the roundabout must give way to traffic:',
    options: [
      'Coming from the right',
      'Coming from the left',
      'Behind them',
      'Flashing their headlights'
    ],
    correctAnswer: 'Coming from the right',
    explanation: 'In left-hand traffic jurisdictions like Kenya, motorists entering a roundabout must yield right of way to vehicles approaching from their right.',
    socraticHint: 'In Kenyan traffic rules, vehicles entering a roundabout give priority to vehicles approaching from the right.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-012',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate phrasal verb: \"Hearing the siren of the approaching ambulance, the motorist quickly ________ to the side of the road.\"',
    text: 'Complete the sentence with the appropriate phrasal verb: \"Hearing the siren of the approaching ambulance, the motorist quickly ________ to the side of the road.\"',
    options: [
      'pulled over',
      'pulled through',
      'pulled out',
      'pulled down'
    ],
    correctAnswer: 'pulled over',
    explanation: '\'Pull over\' means to move a vehicle to the side of the road and come to a complete stop.',
    socraticHint: 'Which phrasal verb means to steer a vehicle to the side of the road and stop?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },

  // --- Unit 6: Mission 2 (q-g6-eng-u6-013 to 024) ---
  {
    id: 'q-g6-eng-u6-013',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate preposition of movement: \"The Madaraka Express train sped ________ the Ngong Hills tunnel.\"',
    text: 'Complete the sentence with the appropriate preposition of movement: \"The Madaraka Express train sped ________ the Ngong Hills tunnel.\"',
    options: [
      'through',
      'across',
      'into',
      'over'
    ],
    correctAnswer: 'through',
    explanation: '\'Through\' denotes movement from one end to another inside an enclosed three-dimensional passage or tunnel.',
    socraticHint: 'Which preposition describes movement inside a three-dimensional enclosed space or tunnel from one end to the other?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-014',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"The children walked carefully ________ the pedestrian footbridge over the highway.\"',
    text: 'Complete the sentence: \"The children walked carefully ________ the pedestrian footbridge over the highway.\"',
    options: [
      'across',
      'through',
      'along',
      'into'
    ],
    correctAnswer: 'across',
    explanation: '\'Across\' describes movement from one side of a surface, bridge, or expanse to the opposite side.',
    socraticHint: 'Which preposition describes moving from one side of a bridge or road to the other?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-015',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Solar street lights have been installed ________ the entire stretch of the expressway.\"',
    text: 'Complete the sentence: \"Solar street lights have been installed ________ the entire stretch of the expressway.\"',
    options: [
      'along',
      'across',
      'through',
      'onto'
    ],
    correctAnswer: 'along',
    explanation: '\'Along\' indicates placement or movement following the linear line or border of something long, like a road.',
    socraticHint: 'Which preposition means following the linear direction or edge of a road?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-016',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In standard English grammar, which preposition is used when boarding and traveling on public buses, passenger trains, and planes?',
    text: 'In standard English grammar, which preposition is used when boarding and traveling on public buses, passenger trains, and planes?',
    options: [
      'On the bus',
      'In the bus',
      'At the bus',
      'To the bus'
    ],
    correctAnswer: 'On the bus',
    explanation: 'We travel \'on\' large public conveyances where passengers stand or walk down an aisle (on the bus, on the train, on the plane).',
    socraticHint: 'We get \'on\' public transportation where passengers can walk down an aisle (on the train, on the bus, on the plane).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-017',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate preposition: \"The tourist climbed ________ the private safari jeep and buckled her seatbelt.\"',
    text: 'Complete the sentence with the appropriate preposition: \"The tourist climbed ________ the private safari jeep and buckled her seatbelt.\"',
    options: [
      'into',
      'onto',
      'through',
      'across'
    ],
    correctAnswer: 'into',
    explanation: 'We step \'into\' enclosed private vehicles (cars, jeeps, cabs, vans) where you enter and sit down immediately.',
    socraticHint: 'We get \'into\' small enclosed private vehicles like cars, taxis, and jeeps.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-018',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"The commuter train arrived ________ Syokimau station precisely at 0815 h.\"',
    text: 'Complete the sentence: \"The commuter train arrived ________ Syokimau station precisely at 0815 h.\"',
    options: [
      'at',
      'to',
      'in',
      'towards'
    ],
    correctAnswer: 'at',
    explanation: 'We arrive \'at\' specific buildings, stations, or pinpointed destinations (\'arrived at Syokimau station\').',
    socraticHint: '\'Arrive at\' is used for specific buildings, stations, or designated stops.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-019',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate phrasal verb: \"Our journey was delayed because the lorry\'s engine ________ on the steep incline.\"',
    text: 'Complete the sentence with the appropriate phrasal verb: \"Our journey was delayed because the lorry\'s engine ________ on the steep incline.\"',
    options: [
      'broke down',
      'broke up',
      'broke out',
      'broke through'
    ],
    correctAnswer: 'broke down',
    explanation: '\'Broke down\' means a mechanical machine or vehicle ceased to function.',
    socraticHint: 'Which phrasal verb means for a mechanical vehicle or engine to stop functioning?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-020',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"The school bus driver stopped to ________ the pupils near their homes.\"',
    text: 'Complete the sentence: \"The school bus driver stopped to ________ the pupils near their homes.\"',
    options: [
      'drop off',
      'drop by',
      'drop in',
      'drop out'
    ],
    correctAnswer: 'drop off',
    explanation: '\'Drop off\' means to deliver or allow passengers to disembark at their designated stops.',
    socraticHint: 'Which phrasal verb means to deliver or let passengers alight at their destination?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-021',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"The reckless driver was fined by traffic police for ________ in a school zone.\"',
    text: 'Complete the sentence: \"The reckless driver was fined by traffic police for ________ in a school zone.\"',
    options: [
      'speeding',
      'speeding up',
      'speeded on',
      'speed down'
    ],
    correctAnswer: 'speeding',
    explanation: '\'Speeding\' is the gerund noun denoting the illegal act of driving faster than the legal speed limit.',
    socraticHint: 'Driving beyond the legal velocity limit is known as speeding.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-022',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence denoting a time deadline: \"Passengers must check in at the airport terminal ________ 0600 h to clear security.\"',
    text: 'Complete the sentence denoting a time deadline: \"Passengers must check in at the airport terminal ________ 0600 h to clear security.\"',
    options: [
      'by',
      'until',
      'for',
      'since'
    ],
    correctAnswer: 'by',
    explanation: '\'By\' indicates a time limit or deadline meaning not later than the specified time.',
    socraticHint: '\'By\' means not later than a specified deadline or time.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-023',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence distinguishing between two specific destinations: \"The Madaraka Express operates daily scheduled trips ________ Nairobi and Mombasa.\"',
    text: 'Complete the sentence distinguishing between two specific destinations: \"The Madaraka Express operates daily scheduled trips ________ Nairobi and Mombasa.\"',
    options: [
      'between',
      'among',
      'amidst',
      'within'
    ],
    correctAnswer: 'between',
    explanation: '\'Between\' is used when connecting two clearly identified points or entities (Nairobi and Mombasa).',
    socraticHint: 'Use \'between\' when referring to two distinct, named locations.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
  },
  {
    id: 'q-g6-eng-u6-024',
    subStrandId: 'substrand-g6-eng-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence with an introductory directional prepositional phrase is punctuated correctly?',
    text: 'Which sentence with an introductory directional prepositional phrase is punctuated correctly?',
    options: [
      '\"Across the expansive Tsavo plains, herds of elephants migrated toward the river.\"',
      '\"Across the expansive Tsavo plains herds of elephants, migrated toward the river.\"',
      '\"Across, the expansive Tsavo plains herds of elephants migrated toward the river.\"',
      '\"Across the expansive Tsavo plains; herds of elephants migrated toward the river.\"'
    ],
    correctAnswer: '\"Across the expansive Tsavo plains, herds of elephants migrated toward the river.\"',
    explanation: 'A comma is placed after an introductory prepositional phrase of location before the main subject and verb.',
    socraticHint: 'An introductory prepositional phrase of location is separated from the main clause by a comma.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U6'
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
console.log('Batch 3 of Grade 6 English Language successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
