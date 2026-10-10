import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 English Language Batch 1 (Units 1 & 2) ---');

// 1. Register Learning Area la-english-g6
const learningArea = {
  id: 'la-english-g6',
  gradeId: 'grade-6',
  name: 'English Language',
  swahiliName: 'Lugha ya Kiingereza',
  icon: 'feather',
  color: '#8B5CF6',
  description: 'Upper primary English capstone: advanced reading comprehension, oral fluency and debates, language structures, creative composition writing, and KPSEA readiness.',
  strandsCount: 4
};

if (!db.learningAreas.some(la => la.id === learningArea.id)) {
  db.learningAreas.push(learningArea);
  console.log(`Added learningArea ${learningArea.id}`);
}

// 2. Add la-english-g6 to world-word-quest learningAreaIds
const world = db.gameWorlds.find(w => w.id === 'world-word-quest');
if (world && !world.learningAreaIds.includes('la-english-g6')) {
  world.learningAreaIds.push('la-english-g6');
  console.log('Added la-english-g6 to world-word-quest');
}

// 3. Register Strands for Grade 6 English
const strandsToAdd = [
  {
    id: 'strand-g6-eng-listening',
    learningAreaId: 'la-english-g6',
    code: 'ENG-G6-STR-01',
    title: 'Listening and Speaking',
    swahiliTitle: 'Kusikiliza na Kuzungumza',
    description: 'Oral fluency, debate presentation, polite discourse, digital etiquette, stress and intonation, and public speaking in Kenyan contexts.',
    icon: 'volume-2'
  },
  {
    id: 'strand-g6-eng-reading',
    learningAreaId: 'la-english-g6',
    code: 'ENG-G6-STR-02',
    title: 'Reading and Comprehension',
    swahiliTitle: 'Kusoma na Ufahamu',
    description: 'Intensive and extensive reading, inferential comprehension, context clue vocabulary, literary appreciation, and KPSEA passage analysis.',
    icon: 'book-open'
  },
  {
    id: 'strand-g6-eng-grammar',
    learningAreaId: 'la-english-g6',
    code: 'ENG-G6-STR-03',
    title: 'Language Structures and Functions',
    swahiliTitle: 'Muundo wa Lugha na Sarufi',
    description: 'Present perfect continuous, conditional clauses (Type 1 & 2), active/passive voice, direct/reported speech, prepositions, and adverbs.',
    icon: 'puzzle'
  },
  {
    id: 'strand-g6-eng-writing',
    learningAreaId: 'la-english-g6',
    code: 'ENG-G6-STR-04',
    title: 'Writing and Composition',
    swahiliTitle: 'Kuandika na Utunzi',
    description: 'Expository and narrative compositions, formal letters, procedural notices, diary entries, and KPSEA composition structuring.',
    icon: 'edit-3'
  }
];

strandsToAdd.forEach(strand => {
  if (!db.strands.some(s => s.id === strand.id)) {
    db.strands.push(strand);
    console.log(`Added strand ${strand.id}`);
  }
});

// 4. Batch 1 Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-eng-u1',
    strandId: 'strand-g6-eng-grammar',
    learningAreaId: 'la-english-g6',
    title: 'Digital Learning, Cyber Ethics & Language Structures',
    description: 'Using appropriate vocabulary on digital technology and Internet safety; mastering the Present Perfect Continuous tense (have/has been + verb-ing); identifying polite phone/online etiquette; and analyzing cyber safety scenarios in Kenyan schools.',
    cbeCompetency: 'Digital literacy, communicative competence, ethical critical thinking, and linguistic accuracy in modern communication',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g6-eng-u2',
    strandId: 'strand-g6-eng-reading',
    learningAreaId: 'la-english-g6',
    title: 'Environmental Conservation, Tree Growing & Conditional Sentences',
    description: 'Reading and comprehending persuasive texts on environmental protection, Mau Forest conservation, and Wangari Maathai\'s legacy; forming Conditional Sentences Type 1 (probable condition) and Type 2 (hypothetical condition); expanding ecological vocabulary; and mastering word formation with prefixes and suffixes.',
    cbeCompetency: 'Environmental stewardship, analytical reading, inferential comprehension, and mastery of hypothetical sentence structures',
    estimatedMinutes: 30,
    order: 2
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 5. Batch 1 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-eng-u1-l1',
    subStrandId: 'substrand-g6-eng-u1',
    title: 'Digital Etiquette, Online Safety and Cyber Literacy',
    content: 'Living in a digital world requires responsible communication and safety habits.\n\n1. Netiquette (Internet Etiquette):\n- Use polite and respectful language in emails, text messages, and school digital forums.\n- Write concise, clear subject lines (e.g., "Homework Submission - Grade 6 Math (Amina Chebet)").\n- Avoid typing in ALL CAPITAL LETTERS, as this resembles shouting or hostility.\n- Always seek permission before sharing photographs or private information of peers.\n\n2. Cyber Safety Rules:\n- Keep passwords secret, strong, and unique (combining letters, numbers, and symbols).\n- Never disclose your full home address, parents\' mobile money PIN, or family details to unverified websites.\n- If you encounter cyberbullying or suspicious messages, inform a trusted adult immediately.\n\n3. Digital Registers:\n- Download vs Upload: Downloading brings files from the internet to your device; uploading sends files from your device to the internet.\n- Plagiarism: Copying someone else\'s writing from the internet without attributing the author is intellectual dishonesty.',
    didYouKnow: 'The word "Netiquette" is a blend of "Network" and "Etiquette", first coined in 1983 to guide polite communication on early computer bulletin boards!',
    kenyanContext: 'In Kenyan schools using educational tablets under the Digital Literacy Programme (DLP), learners practice digital citizenship by logging off public accounts and citing online research sources.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u1-l2',
    subStrandId: 'substrand-g6-eng-u1',
    title: 'The Present Perfect Continuous Tense & Digital Registers',
    content: '1. Formation of the Present Perfect Continuous Tense:\n- Formula: Subject + has/have + been + verb-ing.\n- Singular subjects (he, she, it, Amina): has been + verb-ing (e.g., "Wekesa has been coding since morning").\n- Plural subjects & I/you (we, they, the learners): have been + verb-ing (e.g., "The pupils have been writing digital stories").\n\n2. Usage:\n- Used for actions that started in the past and are STILL continuing right now into the present.\n\n3. "Since" vs "For":\n- "Since" is used with a specific starting point in time: since 8:00 a.m., since Monday, since 2023.\n- "For" is used with a duration or period of time: for two hours, for three days, for six months.\n\n4. Negative and Interrogative Forms:\n- Negative: Subject + has/have + not + been + verb-ing ("We have not been browsing social media").\n- Interrogative: Has/Have + subject + been + verb-ing? ("How long have you been learning animation?").',
    didYouKnow: 'Using the Present Perfect Continuous highlights the ongoing effort and duration of an activity rather than just its completion!',
    kenyanContext: 'Young innovators in Nairobi\'s tech incubators often say: "We have been developing this agricultural mobile app for eight months to help dairy farmers track milk yields."',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u2-l1',
    subStrandId: 'substrand-g6-eng-u2',
    title: 'Reading Comprehension: Guardians of the Green Canopy',
    content: 'Comprehension passage: Guardians of the Green Canopy\n\n"The Mau Forest Complex is Kenya\'s largest indigenous montane forest and vital water tower. Flowing from its high ridges, rivers such as the Mara, Ewaso Ng\'iro, and Sondu Miriu sustain wildlife in the Maasai Mara, irrigate agricultural plantations in the Rift Valley, and replenish Lake Victoria.\n\nIn 1977, Nobel Peace Prize laureate Professor Wangari Maathai founded the Green Belt Movement. Recognizing that deforestation causes severe soil erosion and dries up natural springs, she mobilized rural women across Kenya to establish tree nurseries. Over 50 million indigenous trees were planted under her leadership.\n\nToday, Kenyan youth continue this noble legacy by participating in National Tree Growing Days. By planting bamboo along degraded riverbanks and growing indigenous trees like cedar and acacia, communities restore degraded watersheds and build climate resilience for future generations."',
    didYouKnow: 'Professor Wangari Maathai became the first African woman to win the Nobel Peace Prize in 2004 for her contribution to sustainable development, democracy, and peace!',
    kenyanContext: 'Communities living near the Aberdares and Mount Kenya participate in the "adopt-a-forest" initiative, planting thousands of indigenous saplings to restore degraded water catchment areas.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u2-l2',
    subStrandId: 'substrand-g6-eng-u2',
    title: 'Conditional Sentences (Type 1 & Type 2) and Word Formation',
    content: '1. Conditional Sentences Type 1 (Real / Probable Condition):\n- Used for real possibilities in the present or future.\n- Structure: If + Simple Present, will + base verb.\n- Example: "If it rains this afternoon, we will plant fifty avocado seedlings."\n- Note: "Unless" means "if not" (e.g., "Unless we protect our water towers, we will suffer droughts").\n\n2. Conditional Sentences Type 2 (Hypothetical / Unreal Condition):\n- Used for imaginary, unreal, or hypothetical situations in the present or future.\n- Structure: If + Simple Past, would + base verb.\n- Note: In formal grammar, "were" is used for all subjects in the if-clause (e.g., "If I were the Minister for Forestry, I would ban single-use plastics").\n- Meaning: It expresses situations contrary to current reality.\n\n3. Word Formation (Prefixes and Suffixes):\n- Prefix "re-" (meaning again): forest -> reforestation; claim -> reclaim; cycle -> recycle.\n- Prefix "eco-" (relating to the environment): eco-friendly, ecosystem, ecotourism.\n- Suffix "-ation" (forming nouns from verbs): conserve -> conservation; deforest -> deforestation.\n- Suffix "-able" (meaning capable of): sustain -> sustainable; renew -> renewable.',
    didYouKnow: 'In Type 2 conditionals, using "If I were you..." is one of the most polite and persuasive ways to offer advice in English!',
    kenyanContext: 'Environmental clubs in Kenyan primary schools debate climate policy using conditionals: "If every county government established a tree nursery, Kenya would easily exceed its 30% forest cover target."',
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

// 6. Batch 1 Missions (4 missions: orders 122 to 125 in world-word-quest)
const missionsToAdd = [
  {
    id: 'mission-g6-eng-u1-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u1',
    lessonId: 'lesson-g6-eng-u1-l1',
    title: 'Cyber Cadet & Digital Navigator Quest',
    description: 'Master polite netiquette and email subject lines, identify cyberbullying safeguards, create strong passwords, and practice ethical online research!',
    order: 122,
    orderIndex: 122,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-digital-navigator',
    badge: { name: 'Digital Navigator', icon: 'shield' },
    questionIds: [
      'q-g6-eng-u1-001', 'q-g6-eng-u1-002', 'q-g6-eng-u1-003', 'q-g6-eng-u1-004',
      'q-g6-eng-u1-005', 'q-g6-eng-u1-006', 'q-g6-eng-u1-007', 'q-g6-eng-u1-008',
      'q-g6-eng-u1-009', 'q-g6-eng-u1-010', 'q-g6-eng-u1-011', 'q-g6-eng-u1-012'
    ]
  },
  {
    id: 'mission-g6-eng-u1-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u1',
    lessonId: 'lesson-g6-eng-u1-l2',
    title: 'Tense Master & Digital Communicator Quest',
    description: 'Conjugate the present perfect continuous tense, choose between since and for, form negative and interrogative structures, and master digital registers!',
    order: 123,
    orderIndex: 123,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-tense-master',
    badge: { name: 'Tense Master', icon: 'zap' },
    questionIds: [
      'q-g6-eng-u1-013', 'q-g6-eng-u1-014', 'q-g6-eng-u1-015', 'q-g6-eng-u1-016',
      'q-g6-eng-u1-017', 'q-g6-eng-u1-018', 'q-g6-eng-u1-019', 'q-g6-eng-u1-020',
      'q-g6-eng-u1-021', 'q-g6-eng-u1-022', 'q-g6-eng-u1-023', 'q-g6-eng-u1-024'
    ]
  },
  {
    id: 'mission-g6-eng-u2-m1',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u2',
    lessonId: 'lesson-g6-eng-u2-l1',
    title: 'Green Canopy Reading Detective Quest',
    description: 'Analyze the Mau Forest and Wangari Maathai passage, infer author perspective, identify synonyms and antonyms, and evaluate facts versus opinions!',
    order: 124,
    orderIndex: 124,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-eco-reader',
    badge: { name: 'Eco-Reader', icon: 'book-open' },
    questionIds: [
      'q-g6-eng-u2-001', 'q-g6-eng-u2-002', 'q-g6-eng-u2-003', 'q-g6-eng-u2-004',
      'q-g6-eng-u2-005', 'q-g6-eng-u2-006', 'q-g6-eng-u2-007', 'q-g6-eng-u2-008',
      'q-g6-eng-u2-009', 'q-g6-eng-u2-010', 'q-g6-eng-u2-011', 'q-g6-eng-u2-012'
    ]
  },
  {
    id: 'mission-g6-eng-u2-m2',
    worldId: 'world-word-quest',
    subStrandId: 'substrand-g6-eng-u2',
    lessonId: 'lesson-g6-eng-u2-l2',
    title: 'Conditional Clauses & Eco-Word Master Quest',
    description: 'Form Type 1 and Type 2 conditional sentences, rewrite clauses with unless, decode prefixes (re-, eco-) and suffixes (-ation, -able), and punctuate clauses!',
    order: 125,
    orderIndex: 125,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-conditionals-master',
    badge: { name: 'Conditionals Master', icon: 'git-branch' },
    questionIds: [
      'q-g6-eng-u2-013', 'q-g6-eng-u2-014', 'q-g6-eng-u2-015', 'q-g6-eng-u2-016',
      'q-g6-eng-u2-017', 'q-g6-eng-u2-018', 'q-g6-eng-u2-019', 'q-g6-eng-u2-020',
      'q-g6-eng-u2-021', 'q-g6-eng-u2-022', 'q-g6-eng-u2-023', 'q-g6-eng-u2-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 7. Batch 1 Questions (48 questions: 24 for Unit 1, 24 for Unit 2)
const questionsToAdd = [
  // --- Unit 1: Mission 1 (q-g6-eng-u1-001 to 012) ---
  {
    id: 'q-g6-eng-u1-001',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When sending an email to a teacher regarding a missed homework assignment, which of the following is the most appropriate subject line?',
    text: 'When sending an email to a teacher regarding a missed homework assignment, which of the following is the most appropriate subject line?',
    options: [
      'Homework Submission - Grade 6 Math (Amina Chebet)',
      'Urgent open this now!',
      'Hey teacher',
      'Assignment'
    ],
    correctAnswer: 'Homework Submission - Grade 6 Math (Amina Chebet)',
    explanation: 'A professional and clear subject line clearly states the exact content of the email and the sender\'s identity.',
    socraticHint: 'A clear, professional subject line includes the specific topic and the sender\'s identity.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-002',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What should a learner do if an unfamiliar online website prompts them to enter their home address and their parents\' mobile money PIN?',
    text: 'What should a learner do if an unfamiliar online website prompts them to enter their home address and their parents\' mobile money PIN?',
    options: [
      'Refuse to share the details and report immediately to a parent or teacher',
      'Type the details quickly to unlock the website',
      'Share a friend\'s details instead',
      'Guess a random number'
    ],
    correctAnswer: 'Refuse to share the details and report immediately to a parent or teacher',
    explanation: 'Private personal details and financial PINs must never be entered into unknown or untrusted websites to protect against cyber theft and fraud.',
    socraticHint: 'Personal data and security PINs must never be disclosed to unverified online sources.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-003',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does the term \'cyberbullying\' mean in digital communication?',
    text: 'What does the term \'cyberbullying\' mean in digital communication?',
    options: [
      'Using digital devices to intentionally harass, demean, or intimidate someone',
      'Repairing faulty computer hardware',
      'Playing educational online video games',
      'Backing up files to cloud storage'
    ],
    correctAnswer: 'Using digital devices to intentionally harass, demean, or intimidate someone',
    explanation: 'Cyberbullying is the repeated, deliberate use of digital technology, messaging, or social media to harm, harass, or demean others.',
    socraticHint: 'Look at the parts of the word: \'cyber\' (digital/internet) and \'bullying\' (harming or intimidating others).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-004',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a formal telephone conversation, which of the following is the most polite opening statement?',
    text: 'In a formal telephone conversation, which of the following is the most polite opening statement?',
    options: [
      '\"Good morning, this is Brian Mwangi speaking. May I speak with Mrs. Odhiambo, please?\"',
      '\"Who is this and why are you calling me?\"',
      '\"Hello, talk to me now!\"',
      '\"Yes, what do you want?\"'
    ],
    correctAnswer: '\"Good morning, this is Brian Mwangi speaking. May I speak with Mrs. Odhiambo, please?\"',
    explanation: 'Polite telephone etiquette includes a greeting, self-identification, and a courteous request using polite modals like \"may\".',
    socraticHint: 'A polite telephone opening includes a courteous greeting, self-identification, and a respectful request.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-005',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When using information from the internet for a school research project, copying another author\'s exact words without acknowledging the source is called:',
    text: 'When using information from the internet for a school research project, copying another author\'s exact words without acknowledging the source is called:',
    options: [
      'Plagiarism',
      'Proofreading',
      'Paraphrasing',
      'Publishing'
    ],
    correctAnswer: 'Plagiarism',
    explanation: 'Plagiarism is presenting someone else\'s work, ideas, or words as your own without proper credit or citation.',
    socraticHint: 'What is the term for taking credit for another person\'s creative or written work without attribution?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-006',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following represents the strongest and safest password for securing an online student account?',
    text: 'Which of the following represents the strongest and safest password for securing an online student account?',
    options: [
      'K@pso1t#2026!',
      '12345678',
      'amina2026',
      'password'
    ],
    correctAnswer: 'K@pso1t#2026!',
    explanation: 'A strong password contains a mixture of uppercase and lowercase letters, numbers, and symbols, and cannot be easily guessed.',
    socraticHint: 'A strong password combines uppercase letters, lowercase letters, numbers, and special symbols, and avoids obvious words.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-007',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When a student sends their completed composition from a tablet to the school digital portal, what action are they performing?',
    text: 'When a student sends their completed composition from a tablet to the school digital portal, what action are they performing?',
    options: [
      'Uploading the file',
      'Downloading the file',
      'Deleting the file',
      'Formatting the drive'
    ],
    correctAnswer: 'Uploading the file',
    explanation: 'Uploading means transferring data or files from a local device to a remote server or internet portal.',
    socraticHint: 'Sending data from your local device UP to an online server is called what?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-008',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In online messages and chat groups, writing entire sentences in CAPITAL LETTERS is considered impolite because it:',
    text: 'In online messages and chat groups, writing entire sentences in CAPITAL LETTERS is considered impolite because it:',
    options: [
      'Gives the impression of shouting or anger',
      'Uses up too much battery power',
      'Deletes the message history',
      'Slows down the internet connection'
    ],
    correctAnswer: 'Gives the impression of shouting or anger',
    explanation: 'In internet netiquette, typing all in capital letters is widely interpreted as shouting, aggressive, or rude.',
    socraticHint: 'How is ALL CAPS perceived in text communication?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-009',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Google, Bing, and DuckDuckGo are examples of:',
    text: 'Google, Bing, and DuckDuckGo are examples of:',
    options: [
      'Search engines',
      'Antivirus programs',
      'Social media accounts',
      'Operating systems'
    ],
    correctAnswer: 'Search engines',
    explanation: 'Search engines are online programs that search documents and websites for specified keywords and return a list of relevant results.',
    socraticHint: 'What type of software tool helps users search for and retrieve information on the World Wide Web?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-010',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If an alarming headline on social media claims that all schools are closed tomorrow without an official statement from the Ministry of Education, what is the best course of action?',
    text: 'If an alarming headline on social media claims that all schools are closed tomorrow without an official statement from the Ministry of Education, what is the best course of action?',
    options: [
      'Verify the claim against credible official government sources before sharing',
      'Share it immediately in every family WhatsApp group',
      'Panic and delete your account',
      'Forward it to 10 friends'
    ],
    correctAnswer: 'Verify the claim against credible official government sources before sharing',
    explanation: 'Media literacy requires verifying sensational or unexpected claims using authenticated, official news channels before spreading misinformation.',
    socraticHint: 'Critical media consumers always check information against official, verified sources before believing or reposting it.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-011',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A classmate took a funny photo of Kamau stumbling during physical education. What should she do before posting it online?',
    text: 'A classmate took a funny photo of Kamau stumbling during physical education. What should she do before posting it online?',
    options: [
      'Seek Kamau\'s explicit permission before sharing any personal photo',
      'Post it immediately to gain many likes',
      'Tag everyone in school without asking',
      'Send it secretly to group chats'
    ],
    correctAnswer: 'Seek Kamau\'s explicit permission before sharing any personal photo',
    explanation: 'Digital ethics requires obtaining informed consent before taking or publishing photographs of other individuals.',
    socraticHint: 'Respecting the privacy and dignity of peers requires asking for consent before publishing their images.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-012',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Please remember to ________ your tablet before going to bed so that the battery is full tomorrow.\"',
    text: 'Complete the sentence: \"Please remember to ________ your tablet before going to bed so that the battery is full tomorrow.\"',
    options: [
      'plug in',
      'plug off',
      'turn out',
      'switch into'
    ],
    correctAnswer: 'plug in',
    explanation: 'The phrasal verb \'plug in\' means to connect an electrical appliance or charger to an electric socket.',
    socraticHint: 'Which phrasal verb means to connect an electrical device to a power socket?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },

  // --- Unit 1: Mission 2 (q-g6-eng-u1-013 to 024) ---
  {
    id: 'q-g6-eng-u1-013',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The Present Perfect Continuous tense is formed using which grammatical structure?',
    text: 'The Present Perfect Continuous tense is formed using which grammatical structure?',
    options: [
      'has/have + been + verb-ing',
      'was/were + verb-ing',
      'will + have + verb-ed',
      'has/have + past participle'
    ],
    correctAnswer: 'has/have + been + verb-ing',
    explanation: 'The present perfect continuous formula is: subject + has/have + been + present participle (verb-ing).',
    socraticHint: 'Think of an ongoing action starting in the past: \'She has been coding for two hours\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-014',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Wekesa ________ on his digital science project since morning.\"',
    text: 'Complete the sentence: \"Wekesa ________ on his digital science project since morning.\"',
    options: [
      'has been working',
      'have been working',
      'is been working',
      'was been working'
    ],
    correctAnswer: 'has been working',
    explanation: 'With a singular third-person subject (\'Wekesa\'), we use \'has been\' followed by the -ing form of the verb: \'has been working\'.',
    socraticHint: 'Wekesa is a singular third-person subject (he). Do we use \'has\' or \'have\'?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-015',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"The Grade 6 pupils ________ digital stories in the computer laboratory for an hour.\"',
    text: 'Complete the sentence: \"The Grade 6 pupils ________ digital stories in the computer laboratory for an hour.\"',
    options: [
      'have been writing',
      'has been writing',
      'has been written',
      'have being writing'
    ],
    correctAnswer: 'have been writing',
    explanation: 'Plural subject (\'The Grade 6 pupils\') takes \'have been writing\'.',
    socraticHint: '\'The pupils\' is plural (they), so use \'have been + verb-ing\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-016',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Our school has been using solar-powered tablets ________ 2023.\"',
    text: 'Complete the sentence: \"Our school has been using solar-powered tablets ________ 2023.\"',
    options: [
      'since',
      'for',
      'from',
      'during'
    ],
    correctAnswer: 'since',
    explanation: '\'Since\' marks a specific starting point in time (2023), whereas \'for\' refers to a duration of time.',
    socraticHint: 'Use \'since\' with a specific point in time (such as a year or date), and \'for\' with a duration of time.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-017',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Amina has been practicing her touch-typing skills ________ three weeks.\"',
    text: 'Complete the sentence: \"Amina has been practicing her touch-typing skills ________ three weeks.\"',
    options: [
      'for',
      'since',
      'until',
      'by'
    ],
    correctAnswer: 'for',
    explanation: '\'Three weeks\' is a span or duration of time, so the correct preposition is \'for\'.',
    socraticHint: '\'Three weeks\' is a duration or length of time. Which preposition denotes duration?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-018',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"We ________ the internet today because the router is being repaired.\"',
    text: 'Complete the sentence: \"We ________ the internet today because the router is being repaired.\"',
    options: [
      'have not been using',
      'has not been using',
      'are not been using',
      'have not being used'
    ],
    correctAnswer: 'have not been using',
    explanation: 'Negative present perfect continuous for plural subject \'We\' is \'have not been using\'.',
    socraticHint: 'Negative form for plural subject \'We\' is \'have not been + verb-ing\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-019',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following is the correct interrogative sentence in the present perfect continuous tense?',
    text: 'Which of the following is the correct interrogative sentence in the present perfect continuous tense?',
    options: [
      '\"How long have you been learning computer programming?\"',
      '\"How long has you been learning computer programming?\"',
      '\"How long you have been learning computer programming?\"',
      '\"How long have you being learn computer programming?\"'
    ],
    correctAnswer: '\"How long have you been learning computer programming?\"',
    explanation: 'In questions with \'you\', the auxiliary \'have\' comes before the subject, followed by \'been + verb-ing\'.',
    socraticHint: 'In questions with \'you\', the auxiliary \'have\' comes before the subject: \'have you been learning\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-020',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence indicates that an action started in the past and is STILL continuing into the present?',
    text: 'Which sentence indicates that an action started in the past and is STILL continuing into the present?',
    options: [
      '\"They have been designing a mobile app for two months.\"',
      '\"They are designing a mobile app right now.\"',
      '\"They designed a mobile app last month.\"',
      '\"They will design a mobile app next term.\"'
    ],
    correctAnswer: '\"They have been designing a mobile app for two months.\"',
    explanation: 'The present perfect continuous (\'have been designing\') explicitly links a past beginning with current continuation.',
    socraticHint: 'Which sentence combines past duration (\'for two months\') with ongoing continuation?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-021',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The teacher organized a \'virtual tour\' of Fort Jesus in Mombasa. What does \'virtual\' mean in this context?',
    text: 'The teacher organized a \'virtual tour\' of Fort Jesus in Mombasa. What does \'virtual\' mean in this context?',
    options: [
      'Conducted online via digital simulation rather than physical travel',
      'Old and historical',
      'Free of charge',
      'Boring and unimportant'
    ],
    correctAnswer: 'Conducted online via digital simulation rather than physical travel',
    explanation: '\'Virtual\' in computing refers to an experience created by digital technology that simulates being physically present.',
    socraticHint: '\'Virtual\' describes an experience generated by computers or the internet rather than physical reality.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-022',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"Always remember to ________ of your account when you finish using a public cyber café computer.\"',
    text: 'Complete the sentence: \"Always remember to ________ of your account when you finish using a public cyber café computer.\"',
    options: [
      'log out',
      'log on',
      'log into',
      'log with'
    ],
    correctAnswer: 'log out',
    explanation: '\'Log out\' (or log off) means to end your session and sign out of an account to prevent unauthorized access.',
    socraticHint: 'Which phrasal verb means to safely exit or disconnect from a computer account?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-023',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following digital terms is spelled CORRECTLY?',
    text: 'Which of the following digital terms is spelled CORRECTLY?',
    options: [
      'Cybercrime',
      'Cybarcrime',
      'Cybercreme',
      'Cibercream'
    ],
    correctAnswer: 'Cybercrime',
    explanation: 'The correct English spelling is \'Cybercrime\', formed from the prefix \'cyber-\' and \'crime\'.',
    socraticHint: 'Look for the standard spelling of \'cyber\' followed by \'crime\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },
  {
    id: 'q-g6-eng-u1-024',
    subStrandId: 'substrand-g6-eng-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which sentence is punctuated correctly according to English grammar rules?',
    text: 'Which sentence is punctuated correctly according to English grammar rules?',
    options: [
      '\"Amina edited her video presentation, but she forgot to save the changes.\"',
      '\"Amina edited her video presentation but, she forgot to save the changes.\"',
      '\"Amina edited her video presentation; but she forgot to save the changes.\"',
      '\"Amina edited her video presentation but she forgot, to save the changes.\"'
    ],
    correctAnswer: '\"Amina edited her video presentation, but she forgot to save the changes.\"',
    explanation: 'A comma is placed before the coordinating conjunction (\'but\') when joining two complete independent clauses.',
    socraticHint: 'When connecting two independent clauses with the coordinating conjunction \'but\', place the comma immediately before \'but\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U1'
  },

  // --- Unit 2: Mission 1 (q-g6-eng-u2-001 to 012) ---
  {
    id: 'q-g6-eng-u2-001',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Professor Wangari Maathai founded the Green Belt Movement in 1977. She mobilized rural women to plant over 50 million trees across Kenya to prevent soil erosion, restore water catchment areas, and empower local communities.\" According to the passage, why did Wangari Maathai encourage rural women to plant trees?',
    text: '\"Professor Wangari Maathai founded the Green Belt Movement in 1977. She mobilized rural women to plant over 50 million trees across Kenya to prevent soil erosion, restore water catchment areas, and empower local communities.\" According to the passage, why did Wangari Maathai encourage rural women to plant trees?',
    options: [
      'To combat soil erosion, protect water catchments, and empower communities',
      'To produce commercial timber for export',
      'To clear land for building skyscrapers',
      'To replace all food crops with bamboo'
    ],
    correctAnswer: 'To combat soil erosion, protect water catchments, and empower communities',
    explanation: 'The passage directly states that tree planting was mobilized to prevent soil erosion, restore water catchments, and empower local communities.',
    socraticHint: 'Scan the passage directly for the explicit reasons: soil erosion, water catchment areas, community empowerment.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-002',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'From the passage about Wangari Maathai, what can a reader infer about her character?',
    text: 'From the passage about Wangari Maathai, what can a reader infer about her character?',
    options: [
      'A visionary leader dedicated to environmental conservation and social justice',
      'An advocate for industrial timber logging',
      'Uninterested in the challenges facing rural communities',
      'A city developer building highways'
    ],
    correctAnswer: 'A visionary leader dedicated to environmental conservation and social justice',
    explanation: 'Her tireless mobilization of 50 million trees and empowerment of rural women reflects visionary environmental and civic leadership.',
    socraticHint: 'What does her mobilization of rural women to plant 50 million trees reveal about her character and values?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-003',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the precise meaning of the ecological term \'deforestation\'?',
    text: 'What is the precise meaning of the ecological term \'deforestation\'?',
    options: [
      'The large-scale clearance or cutting down of forests without replanting',
      'The careful planting of indigenous trees',
      'The creation of national parks',
      'The scientific study of leaves'
    ],
    correctAnswer: 'The large-scale clearance or cutting down of forests without replanting',
    explanation: 'Deforestation is the permanent removal or clearing of standing trees and forests from land without adequate replanting.',
    socraticHint: 'The prefix \'de-\' indicates removal or reversal. What is the removal of forests called?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-004',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Mau Forest is home to numerous indigenous tree species such as cedar and olive.\" Which word is a synonym for \'indigenous\'?',
    text: '\"Mau Forest is home to numerous indigenous tree species such as cedar and olive.\" Which word is a synonym for \'indigenous\'?',
    options: [
      'Native',
      'Foreign',
      'Exotic',
      'Artificial'
    ],
    correctAnswer: 'Native',
    explanation: '\'Indigenous\' means originating or occurring naturally in a particular region; \'native\' is its closest synonym.',
    socraticHint: 'Indigenous trees are naturally originating and native to a particular geographic region.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-005',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"Tree planting transforms arid landscapes into fertile agricultural zones.\" What is the antonym (opposite) of \'arid\'?',
    text: '\"Tree planting transforms arid landscapes into fertile agricultural zones.\" What is the antonym (opposite) of \'arid\'?',
    options: [
      'Fertile / Wet',
      'Dry',
      'Parched',
      'Dusty'
    ],
    correctAnswer: 'Fertile / Wet',
    explanation: '\'Arid\' means severely dry, barren, and lacking rainfall. The opposite is fertile, moist, or wet.',
    socraticHint: '\'Arid\' means extremely dry and barren. What is the opposite of dry?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-006',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: '\"The Mau Forest Complex is Kenya\'s largest water tower. Rivers originating from Mau feed lakes Victoria, Nakuru, and Natron. Destroying this forest threatens millions of livelihoods.\" Which title best captures the main idea of this excerpt?',
    text: '\"The Mau Forest Complex is Kenya\'s largest water tower. Rivers originating from Mau feed lakes Victoria, Nakuru, and Natron. Destroying this forest threatens millions of livelihoods.\" Which title best captures the main idea of this excerpt?',
    options: [
      'The Vital Role of Mau Forest as Kenya\'s Water Tower',
      'Tourism on Lake Victoria',
      'Timber Harvesting Techniques',
      'How to Fish in Lake Nakuru'
    ],
    correctAnswer: 'The Vital Role of Mau Forest as Kenya\'s Water Tower',
    explanation: 'The excerpt focuses entirely on how Mau Forest provides river water to major lakes and underpins national livelihoods as a primary water tower.',
    socraticHint: 'What is the central focus of the entire excerpt: water supply, rivers, and the crucial significance of Mau Forest?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-007',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'According to environmental science, what is the direct beneficial effect of planting trees along steep riverbanks?',
    text: 'According to environmental science, what is the direct beneficial effect of planting trees along steep riverbanks?',
    options: [
      'Tree roots bind the soil and prevent riverbank erosion',
      'River waters dry up immediately',
      'Soil washes away faster',
      'Fish populations disappear'
    ],
    correctAnswer: 'Tree roots bind the soil and prevent riverbank erosion',
    explanation: 'Tree root networks anchor and bind soil particles together, preventing rain and currents from washing topsoil into rivers.',
    socraticHint: 'How do extensive root networks interact with soil on steep slopes?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-008',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does the scientific term \'biodiversity\' mean?',
    text: 'What does the scientific term \'biodiversity\' mean?',
    options: [
      'The variety of plant and animal life in a particular habitat',
      'A single crop planted on a large plantation',
      'The chemical composition of soil',
      'The amount of rainfall in a year'
    ],
    correctAnswer: 'The variety of plant and animal life in a particular habitat',
    explanation: 'Biodiversity refers to the biological variety and variability of living species within a defined ecosystem or geographical region.',
    socraticHint: '\'Bio\' means life, and \'diversity\' means variety. Put them together!',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-009',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In the sentence, \"The trees stood like brave soldiers guarding the riverbank,\" which figure of speech is used?',
    text: 'In the sentence, \"The trees stood like brave soldiers guarding the riverbank,\" which figure of speech is used?',
    options: [
      'Simile',
      'Metaphor',
      'Personification',
      'Hyperbole'
    ],
    correctAnswer: 'Simile',
    explanation: 'A simile directly compares two different things using the words \'like\' or \'as\' (\"stood like brave soldiers\").',
    socraticHint: 'Which figure of speech uses the words \'like\' or \'as\' to compare two different things?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-010',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following statements is an objective, verifiable FACT rather than an opinion?',
    text: 'Which of the following statements is an objective, verifiable FACT rather than an opinion?',
    options: [
      'Kenya has a national tree cover target of at least 10%',
      'Forest walks are the most enjoyable hobby in the world',
      'Indigenous trees look prettier than eucalyptus trees',
      'Camping in the forest is always scary'
    ],
    correctAnswer: 'Kenya has a national tree cover target of at least 10%',
    explanation: 'Kenya\'s constitutional and environmental target of 10% forest cover is a verifiable factual statistic, whereas the others are personal judgments or emotions.',
    socraticHint: 'A fact can be proven with official data and measurable targets, whereas an opinion reflects personal feelings.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-011',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following is an example of renewable clean energy that helps protect forests from charcoal burning?',
    text: 'Which of the following is an example of renewable clean energy that helps protect forests from charcoal burning?',
    options: [
      'Solar energy',
      'Charcoal',
      'Firewood',
      'Coal'
    ],
    correctAnswer: 'Solar energy',
    explanation: 'Solar power harnesses sunlight, a clean and inexhaustible renewable resource that reduces demand for cutting trees for fuel.',
    socraticHint: 'Which energy source is naturally replenished by sunlight and does not deplete tree cover?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-012',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence with the appropriate transitional word of contrast: \"Deforestation leads to desertification; ________, active reforestation restores degraded ecosystems.\"',
    text: 'Complete the sentence with the appropriate transitional word of contrast: \"Deforestation leads to desertification; ________, active reforestation restores degraded ecosystems.\"',
    options: [
      'however',
      'furthermore',
      'consequently',
      'similarly'
    ],
    correctAnswer: 'however',
    explanation: '\'However\' signals a contrast between the negative impact of deforestation and the positive restoration brought by reforestation.',
    socraticHint: 'Which transitional word introduces a contrasting outcome to \'deforestation\'?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },

  // --- Unit 2: Mission 2 (q-g6-eng-u2-013 to 024) ---
  {
    id: 'q-g6-eng-u2-013',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the correct grammatical structure of a Type 1 conditional sentence (probable future condition)?',
    text: 'What is the correct grammatical structure of a Type 1 conditional sentence (probable future condition)?',
    options: [
      'If + present simple, will + base verb',
      'If + past simple, would + base verb',
      'If + past perfect, would have + past participle',
      'If + will, present simple'
    ],
    correctAnswer: 'If + present simple, will + base verb',
    explanation: 'First conditionals use the simple present in the if-clause and the future simple (\'will + base verb\') in the main clause.',
    socraticHint: 'Type 1 conditionals talk about real, possible future events: \'If it rains, we will plant seedlings\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-014',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"If we ________ more trees this rainy season, our environment ________ greener.\"',
    text: 'Complete the sentence: \"If we ________ more trees this rainy season, our environment ________ greener.\"',
    options: [
      'plant, will become',
      'planted, would become',
      'will plant, becomes',
      'had planted, would have become'
    ],
    correctAnswer: 'plant, will become',
    explanation: 'Type 1 conditional: \'plant\' (simple present) in the conditional clause and \'will become\' in the main result clause.',
    socraticHint: 'In the \'if\' clause use simple present (\'plant\'), and in the main clause use \'will + verb\' (\'will become\').',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-015',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"If farmers ________ cover crops, topsoil will be washed away by heavy rains.\"',
    text: 'Complete the sentence: \"If farmers ________ cover crops, topsoil will be washed away by heavy rains.\"',
    options: [
      'do not use',
      'did not use',
      'will not use',
      'had not used'
    ],
    correctAnswer: 'do not use',
    explanation: 'The plural subject \'farmers\' takes the negative present simple \'do not use\' in the if-clause of a Type 1 conditional.',
    socraticHint: 'Simple present negative for plural subject \'farmers\' is \'do not + verb\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-016',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: '\'Unless\' means \'if not\'. Which sentence correctly rewrites: \"If we do not protect our water towers, we will suffer severe droughts\"?',
    text: '\'Unless\' means \'if not\'. Which sentence correctly rewrites: \"If we do not protect our water towers, we will suffer severe droughts\"?',
    options: [
      '\"Unless we protect our water towers, we will suffer severe droughts.\"',
      '\"Unless we do not protect our water towers, we will suffer droughts.\"',
      '\"Unless we protect our water towers, we will not suffer droughts.\"',
      '\"If we protect our water towers, unless we suffer droughts.\"'
    ],
    correctAnswer: '\"Unless we protect our water towers, we will suffer severe droughts.\"',
    explanation: '\'Unless\' replaces \'if not\'. Therefore, \'If we do not protect\' becomes \'Unless we protect\', leaving the main clause intact.',
    socraticHint: '\'Unless\' already contains the negative meaning (\'if we do not\'). Do not use a double negative!',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-017',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the grammatical formula for a Type 2 conditional sentence (hypothetical/unreal condition in the present)?',
    text: 'What is the grammatical formula for a Type 2 conditional sentence (hypothetical/unreal condition in the present)?',
    options: [
      'If + past simple, would + base verb',
      'If + present simple, will + base verb',
      'If + past perfect, would + verb',
      'If + would, past simple'
    ],
    correctAnswer: 'If + past simple, would + base verb',
    explanation: 'Type 2 conditional uses the simple past in the if-clause and \'would + base verb\' in the main clause to express hypothetical situations.',
    socraticHint: 'Type 2 conditionals talk about imaginary or hypothetical situations: \'If I had wings, I would fly\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-018',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Complete the sentence: \"If I ________ the Minister for Environment, I ________ illegal logging throughout the country.\"',
    text: 'Complete the sentence: \"If I ________ the Minister for Environment, I ________ illegal logging throughout the country.\"',
    options: [
      'were, would ban',
      'am, will ban',
      'was, ban',
      'had been, will ban'
    ],
    correctAnswer: 'were, would ban',
    explanation: 'In formal hypothetical Type 2 conditionals, the subjunctive \'were\' is standard with \'I\', followed by \'would + base verb\' (\'would ban\').',
    socraticHint: 'In hypothetical conditions, the formal subjunctive form \'were\' is used with \'would + base verb\'.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-019',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does the sentence \"If we lived near the Kakamega Rainforest, we would observe colobus monkeys every morning\" imply in reality?',
    text: 'What does the sentence \"If we lived near the Kakamega Rainforest, we would observe colobus monkeys every morning\" imply in reality?',
    options: [
      'We do not live near Kakamega Rainforest, so we do not observe the monkeys',
      'We currently live in Kakamega Rainforest',
      'We will move to Kakamega Rainforest tomorrow',
      'We used to live in Kakamega Rainforest'
    ],
    correctAnswer: 'We do not live near Kakamega Rainforest, so we do not observe the monkeys',
    explanation: 'Type 2 conditionals express hypothetical situations contrary to present facts: the speakers do not live near the forest.',
    socraticHint: 'Type 2 conditionals express imaginary situations that are contrary to present facts.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-020',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What does the prefix \'re-\' mean in environmental terms such as \'reforestation\', \'recycle\', and \'reclaim\'?',
    text: 'What does the prefix \'re-\' mean in environmental terms such as \'reforestation\', \'recycle\', and \'reclaim\'?',
    options: [
      'Again or back',
      'Before',
      'Below',
      'Against'
    ],
    correctAnswer: 'Again or back',
    explanation: 'The Latin prefix \'re-\' signifies repetition or restoration: to plant trees again (reforest), or to use materials again (recycle).',
    socraticHint: 'Think about \'re-plant\' or \'re-build\': to do the action again.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-021',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Adding the suffix \'-ation\' to the root verb \'conserve\' forms which noun?',
    text: 'Adding the suffix \'-ation\' to the root verb \'conserve\' forms which noun?',
    options: [
      'Conservation',
      'Conservating',
      'Conservable',
      'Conservely'
    ],
    correctAnswer: 'Conservation',
    explanation: 'The suffix \'-ation\' transforms the verb \'conserve\' into the abstract noun \'conservation\'.',
    socraticHint: 'Drop the \'e\' from \'conserve\' and add \'-ation\' to form the noun.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-022',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which adjective meaning \'capable of being maintained over time without depleting natural resources\' is formed from the verb \'sustain\'?',
    text: 'Which adjective meaning \'capable of being maintained over time without depleting natural resources\' is formed from the verb \'sustain\'?',
    options: [
      'Sustainable',
      'Sustainous',
      'Sustainful',
      'Sustainic'
    ],
    correctAnswer: 'Sustainable',
    explanation: 'The suffix \'-able\' (capable of) attached to \'sustain\' creates the adjective \'sustainable\'.',
    socraticHint: 'Add the suffix \'-able\' (capable of being) to \'sustain\'.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-023',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The prefix \'eco-\' in words like \'ecosystem\' and \'ecotourism\' relates to:',
    text: 'The prefix \'eco-\' in words like \'ecosystem\' and \'ecotourism\' relates to:',
    options: [
      'Environment and nature',
      'Economy and trade',
      'Electricity',
      'Economics only'
    ],
    correctAnswer: 'Environment and nature',
    explanation: 'The prefix \'eco-\' is derived from Greek \'oikos\' (household/environment) and denotes ecological and environmental relationships.',
    socraticHint: '\'Eco-\' comes from the Greek \'oikos\' (household/habitat) and refers to ecology and the environment.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  },
  {
    id: 'q-g6-eng-u2-024',
    subStrandId: 'substrand-g6-eng-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which conditional sentence is punctuated correctly according to English grammar rules?',
    text: 'Which conditional sentence is punctuated correctly according to English grammar rules?',
    options: [
      '\"If we conserve our forests, future generations will enjoy clean water.\"',
      '\"If we conserve our forests future generations will enjoy, clean water.\"',
      '\"If we conserve our forests; future generations will enjoy clean water.\"',
      '\"If, we conserve our forests future generations will enjoy clean water.\"'
    ],
    correctAnswer: '\"If we conserve our forests, future generations will enjoy clean water.\"',
    explanation: 'When a conditional dependent clause begins the sentence, it must be followed by a comma before the independent main clause.',
    socraticHint: 'Place a comma immediately after the dependent introductory \'if\' clause.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-ENG-U2'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(que => que.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// 8. Write back to database file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 1 of Grade 6 English Language successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
