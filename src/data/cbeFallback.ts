import {
  User,
  StudentProfile,
  Grade,
  LearningArea,
  Strand,
  SubStrand,
  Lesson,
  GameWorld,
  Mission,
  Question,
  Achievement,
  StrandMastery
} from '../types/cbe.js';

export const fallbackUser: User = {
  id: 'user-student-amina',
  name: 'Amina Kiprono',
  email: 'amina@jifuno.ke',
  role: 'STUDENT',
  avatar: 'cheetah',
  createdAt: '2026-09-01T08:00:00Z',
  studentProfileId: 'student-amina-01'
};

export const fallbackStudent: StudentProfile = {
  id: 'student-amina-01',
  userId: 'user-student-amina',
  fullName: 'Amina Kiprono',
  gradeId: 'grade-4',
  schoolName: 'Simba Primary Academy',
  county: 'Nakuru',
  avatar: 'cheetah',
  level: 3,
  xp: 420,
  coins: 185,
  hearts: 5,
  maxHearts: 5,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakFrozen: false,
  unlockedWorldIds: ['world-math-kingdom', 'world-science-lab', 'world-word-quest'],
  completedMissionIds: ['mission-01-seedlings'],
  badges: ['badge-seedling-starter'],
  equippedTitle: 'Savanna Explorer',
  parentUserId: 'user-parent-mama',
  classId: 'class-g4-simba'
};

export const fallbackGrades: Grade[] = [
  { id: 'grade-3', code: 'G3', name: 'Grade 3', levelGroup: 'LOWER_PRIMARY', description: 'Foundational literacy, numeracy and environmental awareness.' },
  { id: 'grade-4', code: 'G4', name: 'Grade 4', levelGroup: 'UPPER_PRIMARY', description: 'Upper primary transition focusing on core CBE competencies and practical inquiry.' },
  { id: 'grade-5', code: 'G5', name: 'Grade 5', levelGroup: 'UPPER_PRIMARY', description: 'Intermediate problem-solving, science, technology, agriculture, and languages.' },
  { id: 'grade-6', code: 'G6', name: 'Grade 6', levelGroup: 'UPPER_PRIMARY', description: 'Preparation for Junior School assessment with advanced competency mastery.' }
];

export const fallbackWorlds: GameWorld[] = [
  {
    id: 'world-math-kingdom',
    title: 'Math Kingdom',
    swahiliTitle: 'Ufalme wa Hisabati',
    theme: 'castle',
    icon: '🏰',
    description: 'Solve multiplication, fractions, and currency challenges across the Kenyan countryside.',
    requiredLevel: 1,
    bannerGradient: 'from-emerald-600 to-teal-800',
    learningAreaIds: ['la-math-g4'],
    totalMissions: 4
  },
  {
    id: 'world-science-lab',
    title: 'Science Safari',
    swahiliTitle: 'Safari ya Sayansi',
    theme: 'savanna',
    icon: '🔬',
    description: 'Explore seed germination, living things, and indigenous flora in the Great Rift Valley.',
    requiredLevel: 2,
    bannerGradient: 'from-sky-600 to-cyan-800',
    learningAreaIds: ['la-sci-g4'],
    totalMissions: 3
  },
  {
    id: 'world-word-quest',
    title: 'Lugha & Language Oasis',
    swahiliTitle: 'Chemchemi ya Lugha',
    theme: 'forest',
    icon: '📚',
    description: 'Master Kiswahili ngeli, grammar concord, English proverbs, and oral narratives.',
    requiredLevel: 3,
    bannerGradient: 'from-amber-600 to-orange-800',
    learningAreaIds: ['la-kisw-g4', 'la-eng-g4'],
    totalMissions: 3
  },
  {
    id: 'world-shamba-clash',
    title: 'Shamba Champions',
    swahiliTitle: 'Mabingwa wa Shamba',
    theme: 'farm',
    icon: '🌱',
    description: 'Practice agricultural soil preparation, drip irrigation, and harvest budgets.',
    requiredLevel: 4,
    bannerGradient: 'from-lime-600 to-green-800',
    learningAreaIds: ['la-math-g4'],
    totalMissions: 2
  }
];

export const fallbackMissions: Mission[] = [
  {
    id: 'mission-01-seedlings',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-multiplication',
    lessonId: 'lesson-mult-planting',
    order: 1,
    title: 'Help Amina Plant Seedlings',
    swahiliTitle: 'Kupanda Miche na Amina',
    storyContext: 'Calculate row counts and multiplication arrays for sukuma wiki and cabbage seedling beds in Nakuru.',
    characterName: 'Amina',
    characterAvatar: 'cheetah',
    difficulty: 'BEGINNER',
    xpReward: 45,
    coinReward: 20,
    questionIds: ['q-mult-01', 'q-mult-02', 'q-mult-tf-01']
  },
  {
    id: 'mission-02-chapati',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-fractions',
    lessonId: 'lesson-frac-chapati',
    order: 2,
    title: 'The Great Chapati Feast',
    swahiliTitle: 'Karamu ya Chapati',
    storyContext: 'Help Mama Amina slice and share hot chapatis equally using unit fractions 1/2, 1/4, and 3/4.',
    characterName: 'Mama Amina',
    characterAvatar: 'owl',
    difficulty: 'EASY',
    xpReward: 50,
    coinReward: 25,
    questionIds: ['q-mult-01', 'q-mult-02']
  },
  {
    id: 'mission-03-market',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-currency',
    lessonId: 'lesson-curr-market',
    order: 3,
    title: 'Baraka at Kongowea Market',
    swahiliTitle: 'Baraka Sokoni Kongowea',
    storyContext: 'Budget, spend Kenyan shillings (KES), and calculate correct change when buying fresh fruits.',
    characterName: 'Baraka',
    characterAvatar: 'lion',
    difficulty: 'EASY',
    xpReward: 60,
    coinReward: 30,
    questionIds: ['q-kongowea-01', 'q-mult-01', 'q-mult-tf-01']
  }
];

export const fallbackLearningAreas: LearningArea[] = [
  {
    id: 'la-math-g4',
    gradeId: 'grade-4',
    name: 'Mathematics',
    swahiliName: 'Hisabati',
    icon: '🔢',
    color: '#10b981',
    description: 'Numbers, fractions, measurement, money, and geometry.',
    strandsCount: 3
  },
  {
    id: 'la-sci-g4',
    gradeId: 'grade-4',
    name: 'Science and Technology',
    swahiliName: 'Sayansi na Teknolojia',
    icon: '🔬',
    color: '#0ea5e9',
    description: 'Living things, plants, environment, digital literacy.',
    strandsCount: 2
  },
  {
    id: 'la-kisw-g4',
    gradeId: 'grade-4',
    name: 'Kiswahili',
    swahiliName: 'Kiswahili',
    icon: '🇰🇪',
    color: '#f59e0b',
    description: 'Sarufi, ngeli za nomino, msamiati, na kusikiliza.',
    strandsCount: 2
  },
  {
    id: 'la-eng-g4',
    gradeId: 'grade-4',
    name: 'English Language',
    swahiliName: 'Kiingereza',
    icon: '📖',
    color: '#8b5cf6',
    description: 'Reading comprehension, grammar, vocabulary, writing.',
    strandsCount: 2
  }
];

export const fallbackStrands: Strand[] = [
  {
    id: 'strand-math-numbers',
    learningAreaId: 'la-math-g4',
    code: 'MATH-G4-NUM',
    title: 'Numbers and Operations',
    swahiliTitle: 'Nambari na Matendo Yake',
    description: 'Whole numbers, place value, multiplication, and division.',
    icon: '🔢'
  },
  {
    id: 'strand-math-fractions',
    learningAreaId: 'la-math-g4',
    code: 'MATH-G4-FRAC',
    title: 'Fractions and Decimals',
    swahiliTitle: 'Sehemu na Desimali',
    description: 'Part-whole relationships, equivalent fractions, and practical sharing.',
    icon: '🥧'
  },
  {
    id: 'strand-math-money',
    learningAreaId: 'la-math-g4',
    code: 'MATH-G4-MONEY',
    title: 'Measurement and Kenyan Currency',
    swahiliTitle: 'Vipimo na Fedha za Kenya',
    description: 'Kenyan shillings, budgeting, giving change, and open market trade.',
    icon: '🪙'
  }
];

export const fallbackSubStrands: SubStrand[] = [
  {
    id: 'substrand-multiplication',
    strandId: 'strand-math-numbers',
    learningAreaId: 'la-math-g4',
    title: 'Multiplication as Repeated Addition',
    description: 'Master multiplication facts 1 through 10 using Kenyan shamba arrays.',
    cbeCompetency: 'Critical thinking and problem solving, Financial literacy',
    estimatedMinutes: 40
  },
  {
    id: 'substrand-fractions',
    strandId: 'strand-math-fractions',
    learningAreaId: 'la-math-g4',
    title: 'Unit and Proper Fractions',
    description: 'Identify halves, thirds, and quarters in food sharing.',
    cbeCompetency: 'Critical thinking, Collaboration and sharing values',
    estimatedMinutes: 35
  },
  {
    id: 'substrand-currency',
    strandId: 'strand-math-money',
    learningAreaId: 'la-math-g4',
    title: 'Kenyan Currency (Shillings & Cents)',
    description: 'Recognize KES notes and coins and calculate shopping change.',
    cbeCompetency: 'Financial literacy, Citizenship',
    estimatedMinutes: 45
  }
];

export const fallbackLessons: Lesson[] = [
  {
    id: 'lesson-mult-planting',
    subStrandId: 'substrand-multiplication',
    title: 'Planting Rows in Nakuru',
    conceptIntro: 'Multiplication is a fast way of adding the same number multiple times. If Amina has 5 rows of sukuma wiki seedlings, and each row has 4 seedlings, we write: 5 × 4 = 20 seedlings.',
    kenyanContextNote: 'Smallholder kitchen gardens help families grow nutritious food affordably.',
    keyVocabulary: [
      { term: 'Factor', meaning: 'The numbers you multiply together', swahiliTerm: 'Kizidishi' },
      { term: 'Product', meaning: 'The answer to a multiplication problem', swahiliTerm: 'Zao' }
    ],
    didYouKnowKenyanFact: 'Nakuru County is famous for crater farms and fresh vegetable agriculture!',
    activitiesCount: 4
  }
];

export const fallbackQuestions: Question[] = [
  {
    id: 'q-mult-01',
    subStrandId: 'substrand-multiplication',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Amina plants 5 rows of sukuma wiki seedlings. Each row has 4 seedlings. How many seedlings did she plant in total?',
    storyScenario: 'Amina wants to know the total count of seedlings before recording it in her CBC agriculture project diary.',
    difficulty: 'BEGINNER',
    options: [
      { id: 'opt-1', text: '16 seedlings' },
      { id: 'opt-2', text: '20 seedlings' },
      { id: 'opt-3', text: '24 seedlings' },
      { id: 'opt-4', text: '9 seedlings' }
    ],
    correctOptionId: 'opt-2',
    explanation: '5 rows with 4 seedlings in each row means 5 groups of 4. We calculate: 5 × 4 = 20 seedlings!',
    socraticHint: 'Think of 5 groups with 4 items each. What do you get if you skip count by 4 five times? (4, 8, 12, 16...)',
    kenyanCulturalContext: 'Sukuma wiki is widely planted in school garden beds across Kenya.',
    sourceType: 'CURRICULUM_ALIGNED',
    contentStatus: 'PUBLISHED'
  },
  {
    id: 'q-mult-02',
    subStrandId: 'substrand-multiplication',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A farmer in Eldoret packs 6 bags of potatoes. Each bag weighs 8 kilograms. What is the total weight of the potato bags?',
    storyScenario: 'Farmer Kiprono is preparing to take his harvest to the local market cooperative.',
    difficulty: 'EASY',
    options: [
      { id: 'opt-1', text: '42 kg' },
      { id: 'opt-2', text: '48 kg' },
      { id: 'opt-3', text: '54 kg' },
      { id: 'opt-4', text: '14 kg' }
    ],
    correctOptionId: 'opt-2',
    explanation: '6 bags multiplied by 8 kg each equals 6 × 8 = 48 kg.',
    socraticHint: 'What is 6 multiplied by 8? You can also think of 6 × 4 = 24, and then double 24!',
    kenyanCulturalContext: 'Eldoret in Uasin Gishu County is one of Kenya’s major agricultural breadbaskets.',
    sourceType: 'CURRICULUM_ALIGNED',
    contentStatus: 'PUBLISHED'
  },
  {
    id: 'q-mult-tf-01',
    subStrandId: 'substrand-multiplication',
    type: 'TRUE_FALSE',
    prompt: 'True or False: 7 × 3 is equal to 3 + 3 + 3 + 3 + 3 + 3 + 3 (three added 7 times).',
    storyScenario: 'Checking multiplication rules with Rafiki.',
    difficulty: 'BEGINNER',
    correctBoolean: true,
    explanation: 'Multiplication is repeated addition. 7 × 3 means 7 groups of 3, which is 21.',
    socraticHint: 'Count how many 3s are added together. Are there seven of them?',
    kenyanCulturalContext: 'Repeated addition is the foundation of mental math.',
    sourceType: 'CURRICULUM_ALIGNED',
    contentStatus: 'PUBLISHED'
  },
  {
    id: 'q-kongowea-01',
    subStrandId: 'substrand-currency',
    type: 'KENYAN_MONEY',
    prompt: 'Baraka buys fresh mangoes at Kongowea Market for KES 45. Tap the coins and notes to make an exact payment of KES 45.',
    storyScenario: 'The vendor packs 3 ripe apple mangoes from Kilifi. The total bill is 45 Kenyan Shillings.',
    difficulty: 'EASY',
    numericAnswer: { value: 45, unit: 'KES' },
    explanation: 'Two KES 20 coins and one KES 5 coin make exactly KES 45 (20 + 20 + 5 = 45).',
    socraticHint: 'Try combining KES 20 coins with a KES 5 coin.',
    kenyanCulturalContext: 'Kenyan coins come in 1, 5, 10, and 20 shilling denominations.',
    sourceType: 'CURRICULUM_ALIGNED',
    contentStatus: 'PUBLISHED'
  }
];

export const fallbackAchievements: Achievement[] = [
  {
    id: 'badge-seedling-starter',
    code: 'SEEDLING_STARTER',
    title: 'Green Thumb Sower',
    description: 'Completed your first agricultural multiplication mission with Amina!',
    icon: '🌱',
    xpReward: 30,
    coinReward: 15,
    category: 'MASTERY'
  },
  {
    id: 'badge-fraction-feaster',
    code: 'FRACTION_FEASTER',
    title: 'Chapati Master',
    description: 'Shared chapatis equally and mastered Grade 4 unit fractions!',
    icon: '🥞',
    xpReward: 40,
    coinReward: 20,
    category: 'MASTERY'
  },
  {
    id: 'badge-streak-3',
    code: 'STREAK_3',
    title: 'Moto wa Maarifa (3 Days)',
    description: 'Maintained a 3-day daily learning streak!',
    icon: '🔥',
    xpReward: 50,
    coinReward: 25,
    category: 'STREAK'
  }
];

export const fallbackMasteries: StrandMastery[] = [
  {
    strandId: 'strand-math-numbers',
    strandTitle: 'Numbers & Operations',
    learningAreaName: 'Mathematics',
    masteryPercentage: 85,
    totalAttempts: 12,
    correctAttempts: 11,
    status: 'EXCEEDING',
    lastPracticedDate: new Date().toISOString().split('T')[0]
  },
  {
    strandId: 'strand-math-fractions',
    strandTitle: 'Fractions & Decimals',
    learningAreaName: 'Mathematics',
    masteryPercentage: 70,
    totalAttempts: 8,
    correctAttempts: 6,
    status: 'PROFICIENT',
    lastPracticedDate: new Date().toISOString().split('T')[0]
  },
  {
    strandId: 'strand-math-money',
    strandTitle: 'Kenyan Currency & Trade',
    learningAreaName: 'Mathematics',
    masteryPercentage: 60,
    totalAttempts: 5,
    correctAttempts: 3,
    status: 'DEVELOPING',
    lastPracticedDate: new Date().toISOString().split('T')[0]
  }
];
