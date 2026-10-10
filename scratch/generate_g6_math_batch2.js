import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Mathematics Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u3',
    strandId: 'strand-g6-math-numbers',
    learningAreaId: 'la-math-g6',
    title: 'Divisibility Tests, Prime Factorisation, Squares & Square Roots',
    description: 'Applying divisibility tests for 2, 3, 4, 5, 6, 8, 9, 10, and 11; expressing composite numbers as products of prime factors using index notation; solving real-life GCD and LCM word problems; calculating squares of whole numbers up to 100; and determining square roots of perfect squares up to 10,000 using prime factorisation.',
    cbeCompetency: 'Number theory application, factorisation fluency, algebraic thinking, and systematic problem solving',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g6-math-u4',
    strandId: 'strand-g6-math-numbers',
    learningAreaId: 'la-math-g6',
    title: 'Fractions, Decimals, Percentages & Rate of Change',
    description: 'Performing multi-step operations on proper, improper, and mixed fractions; evaluating reciprocals in division; converting between fractions, terminating/recurring decimals, and percentages; and calculating percentage increase and percentage decrease in real-world Kenyan commercial scenarios.',
    cbeCompetency: 'Proportional reasoning, quantitative estimation, computational accuracy, and commercial arithmetic fluency',
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
    id: 'lesson-g6-math-u3-l1',
    subStrandId: 'substrand-g6-math-u3',
    title: 'Divisibility Tests, Prime Factorisation & GCD/LCM Applications',
    content: 'Divisibility rules allow rapid factorisation without performing full long division:\n\n1. Essential Divisibility Tests:\n- Divisible by 2: Last digit is even (0, 2, 4, 6, 8).\n- Divisible by 3: Sum of all digits is a multiple of 3.\n- Divisible by 4: Last two digits form a number divisible by 4 (or both are 00).\n- Divisible by 5: Last digit is 0 or 5.\n- Divisible by 6: Number is divisible by BOTH 2 and 3.\n- Divisible by 8: Last three digits form a number divisible by 8.\n- Divisible by 9: Sum of all digits is a multiple of 9.\n- Divisible by 10: Last digit is 0.\n- Divisible by 11: The difference between the sum of digits in odd positions and even positions is 0 or a multiple of 11.\n\n2. Prime Factorisation and Index Notation:\n- Expressing a number as a product of prime numbers: e.g. 360 = 2 x 2 x 2 x 3 x 3 x 5 = 2^3 x 3^2 x 5.\n\n3. GCD and LCM in Kenyan Community Life:\n- Greatest Common Divisor (GCD): The largest factor shared by two or more numbers (used when cutting ribbons, timber, or pipes into equal maximum lengths without waste).\n- Least Common Multiple (LCM): The smallest common multiple (used to determine when two flashing beacon lights or scheduled public buses depart simultaneously).',
    didYouKnow: 'The divisibility test for 11 works for any size number! For example, in 719,829: (7+9+2) - (1+8+9) = 18 - 18 = 0, so 719,829 is exactly divisible by 11 (65,439 x 11)!',
    kenyanContext: 'A cooperative irrigation project in Ahero, Kisumu has three water pumps that turn on every 12, 18, and 24 minutes. The community engineer used LCM to calculate that all three pumps start together every 72 minutes (LCM = 72).',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u3-l2',
    subStrandId: 'substrand-g6-math-u3',
    title: 'Squares of Numbers & Square Roots by Prime Factorisation',
    content: '1. Squares of Whole Numbers:\n- The square of a number is the product obtained when the number is multiplied by itself: n^2 = n x n.\n- Examples: 12^2 = 144, 25^2 = 625, 40^2 = 1,600, 75^2 = 5,625.\n- Geometric meaning: The area of a square whose side length is n units is n^2 square units.\n\n2. Square Roots of Perfect Squares:\n- The square root of a number is a value that, when multiplied by itself, gives the original number: sqrt(A) = s, where s^2 = A.\n- Finding Square Roots by Prime Factorisation:\n  * Step 1: Write down the prime factorisation of the number.\n  * Step 2: Group identical prime factors into pairs of two.\n  * Step 3: Pick one factor from each pair and multiply them together.\n- Example: Find sqrt(1,296):\n  * 1,296 = 2 x 2 x 2 x 2 x 3 x 3 x 3 x 3 = (2 x 2) x (2 x 2) x (3 x 3) x (3 x 3).\n  * Take one from each pair: 2 x 2 x 3 x 3 = 36.\n  * Therefore, sqrt(1,296) = 36.\n- Example: Find sqrt(7,056):\n  * 7,056 = 2^4 x 3^2 x 7^2 = (2^2) x 3 x 7 = 4 x 3 x 7 = 84.',
    didYouKnow: 'A number whose last digit is 2, 3, 7, or 8 can NEVER be a perfect square! Perfect squares can only end in 0, 1, 4, 5, 6, or 9.',
    kenyanContext: 'Farmer Wekesa in Bungoma has a square plot of maize measuring 5,625 square metres. By finding sqrt(5,625) = 75 metres, he knew each side was 75 m, allowing him to buy exactly 300 metres of fencing wire (4 x 75 m).',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u4-l1',
    subStrandId: 'substrand-g6-math-u4',
    title: 'Operations on Mixed Numbers & Reciprocals',
    content: '1. Addition and Subtraction of Mixed Numbers:\n- Convert to improper fractions or add/subtract whole numbers and fractional parts separately using the LCM of denominators.\n- Example: 3 1/4 + 2 2/3 = (3 + 2) + (3/12 + 8/12) = 5 11/12.\n- Example: 5 1/6 - 2 3/4 = (31/6 - 11/4) = (62/12 - 33/12) = 29/12 = 2 5/12.\n\n2. Multiplication of Fractions:\n- Convert mixed numbers to improper fractions, cross-cancel common factors, and multiply numerators together and denominators together.\n- Example: 2 1/2 x 1 3/5 = 5/2 x 8/5 = (5 x 8) / (2 x 5) = 40 / 10 = 4.\n\n3. Division and Reciprocals:\n- The reciprocal of a fraction a/b is b/a (the inverted fraction such that a/b x b/a = 1).\n- To divide by a fraction, multiply by its reciprocal (Keep, Change, Flip).\n- Example: 3 1/3 / 5/6 = 10/3 x 6/5 = (10 x 6) / (3 x 5) = 60 / 15 = 4.',
    didYouKnow: 'Zero (0) is the only number that has no reciprocal, because dividing 1 by 0 is undefined in mathematics!',
    kenyanContext: 'A tailoring shop in Nakuru has a roll of 37 1/2 metres of kitenge fabric. Each school uniform dress requires 2 1/2 metres. The tailor divided 37 1/2 / 2 1/2 = 75/2 x 2/5 = 15 complete dresses.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u4-l2',
    subStrandId: 'substrand-g6-math-u4',
    title: 'Decimals, Recurring Decimals, Percentages & Rate of Change',
    content: '1. Converting Fractions to Decimals and Percentages:\n- Terminating decimals terminate cleanly (e.g. 3/8 = 0.375 = 37.5%).\n- Recurring decimals have repeating patterns indicated by dots or bars (e.g. 1/3 = 0.333... = 0.3-dot, 2/11 = 0.1818... = 0.18-bar).\n\n2. Percentage Conversions:\n- Percentage means "out of 100".\n- To convert a fraction or decimal to percentage, multiply by 100% (e.g. 0.65 x 100% = 65%).\n- To convert a percentage to fraction/decimal, divide by 100 (e.g. 45% = 45/100 = 9/20 = 0.45).\n\n3. Percentage Increase and Decrease:\n- Percentage Increase = (Increase / Original Value) x 100%.\n- Percentage Decrease = (Decrease / Original Value) x 100%.\n- Example: A bag of fertilizer increased from KES 2,400 to KES 3,000. Increase = KES 600. Percentage Increase = (600 / 2,400) x 100% = 1/4 x 100% = 25%.\n- Example: A phone price decreased from KES 15,000 to KES 12,000 during a market sale. Decrease = KES 3,000. Percentage Decrease = (3,000 / 15,000) x 100% = 20%.',
    didYouKnow: 'The percent symbol "%" evolved over hundreds of years from the Italian abbreviation "p 100" (per cento) written in shorthand manuscripts!',
    kenyanContext: 'At the Nairobi Coffee Exchange, the price of grade AA coffee rose from KES 400 per kg to KES 480 per kg, representing a 20% price increase [(80/400) x 100% = 20%], bringing great joy to smallholder farmers.',
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

// 3. Batch 2 Missions (4 missions: orders 65 to 68 in world-math-kingdom)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u3-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u3',
    lessonId: 'lesson-g6-math-u3-l1',
    title: 'Divisibility Detective & Prime Factorisation Quest',
    description: 'Test divisibility for numbers 2 to 11, factorise composite numbers into prime indices, and solve real-world GCD and LCM puzzles!',
    order: 65,
    orderIndex: 65,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-divisibility-detective',
    badge: { name: 'Divisibility Detective', icon: 'search' },
    questionIds: [
      'q-g6-math-u3-001', 'q-g6-math-u3-002', 'q-g6-math-u3-003', 'q-g6-math-u3-004',
      'q-g6-math-u3-005', 'q-g6-math-u3-006', 'q-g6-math-u3-007', 'q-g6-math-u3-008',
      'q-g6-math-u3-009', 'q-g6-math-u3-010', 'q-g6-math-u3-011', 'q-g6-math-u3-012'
    ]
  },
  {
    id: 'mission-g6-math-u3-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u3',
    lessonId: 'lesson-g6-math-u3-l2',
    title: 'Square & Square Root Explorer Quest',
    description: 'Calculate squares of two-digit integers, extract square roots of large perfect squares up to 10,000, and solve area dimensions!',
    order: 66,
    orderIndex: 66,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-square-root-explorer',
    badge: { name: 'Square Root Grandmaster', icon: 'check-circle' },
    questionIds: [
      'q-g6-math-u3-013', 'q-g6-math-u3-014', 'q-g6-math-u3-015', 'q-g6-math-u3-016',
      'q-g6-math-u3-017', 'q-g6-math-u3-018', 'q-g6-math-u3-019', 'q-g6-math-u3-020',
      'q-g6-math-u3-021', 'q-g6-math-u3-022', 'q-g6-math-u3-023', 'q-g6-math-u3-024'
    ]
  },
  {
    id: 'mission-g6-math-u4-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u4',
    lessonId: 'lesson-g6-math-u4-l1',
    title: 'Fraction Master & Reciprocal Navigator Quest',
    description: 'Add, subtract, multiply, and divide mixed numbers, apply reciprocals in division, and solve complex multi-step fraction word problems!',
    order: 67,
    orderIndex: 67,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-fraction-master',
    badge: { name: 'Fraction Master', icon: 'pie-chart' },
    questionIds: [
      'q-g6-math-u4-001', 'q-g6-math-u4-002', 'q-g6-math-u4-003', 'q-g6-math-u4-004',
      'q-g6-math-u4-005', 'q-g6-math-u4-006', 'q-g6-math-u4-007', 'q-g6-math-u4-008',
      'q-g6-math-u4-009', 'q-g6-math-u4-010', 'q-g6-math-u4-011', 'q-g6-math-u4-012'
    ]
  },
  {
    id: 'mission-g6-math-u4-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u4',
    lessonId: 'lesson-g6-math-u4-l2',
    title: 'Decimal & Percentage Dynamo Quest',
    description: 'Interconvert decimals and percentages, identify recurring patterns, and calculate commercial percentage increase and decrease!',
    order: 68,
    orderIndex: 68,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-percentage-dynamo',
    badge: { name: 'Percentage Dynamo', icon: 'percent' },
    questionIds: [
      'q-g6-math-u4-013', 'q-g6-math-u4-014', 'q-g6-math-u4-015', 'q-g6-math-u4-016',
      'q-g6-math-u4-017', 'q-g6-math-u4-018', 'q-g6-math-u4-019', 'q-g6-math-u4-020',
      'q-g6-math-u4-021', 'q-g6-math-u4-022', 'q-g6-math-u4-023', 'q-g6-math-u4-024'
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
  // --- Unit 3: Mission 1 (q-g6-math-u3-001 to 012) ---
  {
    id: 'q-g6-math-u3-001',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following numbers is divisible by both 3 and 4?',
    text: 'Which of the following numbers is divisible by both 3 and 4?',
    options: [
      '7,524',
      '7,514',
      '7,526',
      '7,534'
    ],
    correctAnswer: '7,524',
    explanation: 'For 7,524: sum of digits = 7+5+2+4 = 18 (divisible by 3). Last two digits are 24 (24 / 4 = 6, divisible by 4). Therefore, 7,524 is divisible by both 3 and 4 (and by 12).',
    socraticHint: 'Check which number has a digit sum divisible by 3 AND its last two digits divisible by 4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-002',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What digit must be placed in the box of the number 48,[]72 so that the number is divisible by 9?',
    text: 'What digit must be placed in the box of the number 48,[]72 so that the number is divisible by 9?',
    options: [
      '6',
      '7',
      '5',
      '8'
    ],
    correctAnswer: '6',
    explanation: 'Sum of known digits = 4 + 8 + 7 + 2 = 21. The next multiple of 9 after 21 is 27. Therefore, the missing digit is 27 - 21 = 6.',
    socraticHint: 'A number is divisible by 9 if the sum of all its digits is a multiple of 9. What number added to 21 makes a multiple of 9?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-003',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following numbers is divisible by 11?',
    text: 'Which of the following numbers is divisible by 11?',
    options: [
      '82,918',
      '82,915',
      '82,928',
      '82,908'
    ],
    correctAnswer: '82,918',
    explanation: 'For 82,918: odd place digits (from right): 8 + 9 + 8 = 25. Even place digits: 1 + 2 = 3. Difference = 25 - 3 = 22. Since 22 is a multiple of 11 (2 x 11), 82,918 is divisible by 11.',
    socraticHint: 'Calculate the difference between the sum of digits in odd places and even places: does it equal 0, 11, or 22?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-004',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Express 720 as a product of its prime factors in index notation.',
    text: 'Express 720 as a product of its prime factors in index notation.',
    options: [
      '2^4 x 3^2 x 5',
      '2^3 x 3^3 x 5',
      '2^4 x 3 x 5^2',
      '2^5 x 3 x 5'
    ],
    correctAnswer: '2^4 x 3^2 x 5',
    explanation: '720 / 2 = 360; 360 / 2 = 180; 180 / 2 = 90; 90 / 2 = 45; 45 / 3 = 15; 15 / 3 = 5; 5 / 5 = 1. Prime factors: 2 x 2 x 2 x 2 x 3 x 3 x 5 = 2^4 x 3^2 x 5.',
    socraticHint: 'Count how many 2s, 3s, and 5s multiply together to make 720.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-005',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Find the Greatest Common Divisor (GCD) of 48, 72, and 120.',
    text: 'Find the Greatest Common Divisor (GCD) of 48, 72, and 120.',
    options: [
      '24',
      '12',
      '36',
      '48'
    ],
    correctAnswer: '24',
    explanation: 'Prime factorisations: 48 = 2^4 x 3; 72 = 2^3 x 3^2; 120 = 2^3 x 3 x 5. Common prime factors: 2^3 x 3 = 8 x 3 = 24.',
    socraticHint: 'Find the lowest power of the common prime factors (2^3 and 3^1).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-006',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Find the Least Common Multiple (LCM) of 15, 20, and 30.',
    text: 'Find the Least Common Multiple (LCM) of 15, 20, and 30.',
    options: [
      '60',
      '120',
      '30',
      '90'
    ],
    correctAnswer: '60',
    explanation: '15 = 3 x 5; 20 = 2^2 x 5; 30 = 2 x 3 x 5. LCM takes highest powers: 2^2 x 3 x 5 = 4 x 3 x 5 = 60.',
    socraticHint: 'What is the smallest number that 15, 20, and 30 all divide into without a remainder?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-007',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three timber planks of lengths 84 cm, 126 cm, and 168 cm are to be cut into equal shorter pieces without any wood left over. What is the greatest possible length of each piece?',
    text: 'Three timber planks of lengths 84 cm, 126 cm, and 168 cm are to be cut into equal shorter pieces without any wood left over. What is the greatest possible length of each piece?',
    options: [
      '42 cm',
      '21 cm',
      '14 cm',
      '84 cm'
    ],
    correctAnswer: '42 cm',
    explanation: 'We need the GCD of 84, 126, and 168: 84 = 2^2 x 3 x 7; 126 = 2 x 3^2 x 7; 168 = 2^3 x 3 x 7. GCD = 2 x 3 x 7 = 42 cm.',
    socraticHint: 'Cutting into equal maximum lengths without remainder requires finding the Greatest Common Divisor (GCD).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-008',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two public service buses leave a Nairobi terminus at 6:00 a.m. Bus A departs every 25 minutes and Bus B departs every 40 minutes. At what time will both buses leave the terminus together again?',
    text: 'Two public service buses leave a Nairobi terminus at 6:00 a.m. Bus A departs every 25 minutes and Bus B departs every 40 minutes. At what time will both buses leave the terminus together again?',
    options: [
      '9:20 a.m.',
      '8:40 a.m.',
      '10:00 a.m.',
      '7:40 a.m.'
    ],
    correctAnswer: '9:20 a.m.',
    explanation: 'LCM of 25 and 40: 25 = 5^2; 40 = 2^3 x 5. LCM = 2^3 x 5^2 = 8 x 25 = 200 minutes. 200 minutes = 3 hours and 20 minutes. 6:00 a.m. + 3 hrs 20 min = 9:20 a.m.',
    socraticHint: 'Find the LCM of 25 and 40 (200 minutes), convert it to hours and minutes, and add to 6:00 a.m.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-009',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following numbers is divisible by 6?',
    text: 'Which of the following numbers is divisible by 6?',
    options: [
      '54,822',
      '54,821',
      '54,824',
      '54,820'
    ],
    correctAnswer: '54,822',
    explanation: 'A number is divisible by 6 if it is even and its digit sum is a multiple of 3. 54,822 ends in 2 (even). Digit sum = 5+4+8+2+2 = 21 (multiple of 3). Therefore, 54,822 is divisible by 6.',
    socraticHint: 'Check which number is both even AND has a digit sum divisible by 3.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-010',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The product of two numbers is 1,200. If their GCD is 10, what is their LCM?',
    text: 'The product of two numbers is 1,200. If their GCD is 10, what is their LCM?',
    options: [
      '120',
      '12',
      '1,200',
      '60'
    ],
    correctAnswer: '120',
    explanation: 'Formula: Product of two numbers = GCD x LCM. Therefore, LCM = Product / GCD = 1,200 / 10 = 120.',
    socraticHint: 'Use the rule: Number 1 x Number 2 = GCD x LCM.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-011',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which test determines if a number is divisible by 8?',
    text: 'Which test determines if a number is divisible by 8?',
    options: [
      'The number formed by its last three digits is divisible by 8 (or ends in 000)',
      'The sum of its digits is divisible by 8',
      'Its last two digits are divisible by 8',
      'Its last digit is an 8'
    ],
    correctAnswer: 'The number formed by its last three digits is divisible by 8 (or ends in 000)',
    explanation: 'Since 1,000 is divisible by 8 (1,000 / 8 = 125), any whole number is divisible by 8 if and only if its last three digits form a multiple of 8.',
    socraticHint: 'Look at the last three digits of the number: do they form a multiple of 8?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-012',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the smallest number of sweets that can be shared equally among 6, 8, or 9 children without any sweets left over?',
    text: 'What is the smallest number of sweets that can be shared equally among 6, 8, or 9 children without any sweets left over?',
    options: [
      '72 sweets',
      '48 sweets',
      '36 sweets',
      '144 sweets'
    ],
    correctAnswer: '72 sweets',
    explanation: 'We need the LCM of 6, 8, and 9: 6 = 2 x 3; 8 = 2^3; 9 = 3^2. LCM = 2^3 x 3^2 = 8 x 9 = 72 sweets.',
    socraticHint: 'Find the Least Common Multiple (LCM) of 6, 8, and 9.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },

  // --- Unit 3: Mission 2 (q-g6-math-u3-013 to 024) ---
  {
    id: 'q-g6-math-u3-013',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Calculate the square of 28 (28^2).',
    text: 'Calculate the square of 28 (28^2).',
    options: [
      '784',
      '724',
      '684',
      '884'
    ],
    correctAnswer: '784',
    explanation: '28^2 = 28 x 28 = 784.',
    socraticHint: 'Multiply 28 by 28: 28 x 20 = 560, 28 x 8 = 224. Add them together.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-014',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the square root of 1,764?',
    text: 'What is the square root of 1,764?',
    options: [
      '42',
      '44',
      '38',
      '46'
    ],
    correctAnswer: '42',
    explanation: 'Prime factorisation of 1,764: 1,764 = 2^2 x 3^2 x 7^2. Taking one factor from each pair: 2 x 3 x 7 = 42. Check: 42 x 42 = 1,764.',
    socraticHint: 'Factorise 1,764 into primes: (2 x 2) x (3 x 3) x (7 x 7). Pick one from each pair and multiply.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-015',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A square playground has an area of 3,136 square metres. What is the length of one side of the playground?',
    text: 'A square playground has an area of 3,136 square metres. What is the length of one side of the playground?',
    options: [
      '56 m',
      '54 m',
      '64 m',
      '58 m'
    ],
    correctAnswer: '56 m',
    explanation: 'Side length = sqrt(Area) = sqrt(3,136). Prime factors of 3,136 = 2^6 x 7^2. Taking square root: 2^3 x 7 = 8 x 7 = 56 metres.',
    socraticHint: 'Find the square root of 3,136 to get the side length of the square.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-016',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the square of 65?',
    text: 'What is the square of 65?',
    options: [
      '4,225',
      '4,125',
      '4,325',
      '3,625'
    ],
    correctAnswer: '4,225',
    explanation: '65 x 65 = 4,225. (Shortcut for numbers ending in 5: 6 x (6+1) = 42, followed by 25 = 4,225).',
    socraticHint: 'Multiply 65 by 65.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-017',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Find the square root of 5,184 using prime factorisation.',
    text: 'Find the square root of 5,184 using prime factorisation.',
    options: [
      '72',
      '68',
      '74',
      '78'
    ],
    correctAnswer: '72',
    explanation: '5,184 = 2^6 x 3^4. Taking square root: 2^(6/2) x 3^(4/2) = 2^3 x 3^2 = 8 x 9 = 72.',
    socraticHint: 'Halve the powers in 2^6 x 3^4: 2^3 x 3^2 = 8 x 9 = ?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-018',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: sqrt(225) + sqrt(400) - sqrt(169).',
    text: 'Evaluate: sqrt(225) + sqrt(400) - sqrt(169).',
    options: [
      '22',
      '24',
      '18',
      '28'
    ],
    correctAnswer: '22',
    explanation: 'sqrt(225) = 15; sqrt(400) = 20; sqrt(169) = 13. Total = 15 + 20 - 13 = 35 - 13 = 22.',
    socraticHint: 'Evaluate each square root: sqrt(225) is 15, sqrt(400) is 20, and sqrt(169) is 13.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-019',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the square root of 9,801?',
    text: 'What is the square root of 9,801?',
    options: [
      '99',
      '91',
      '89',
      '97'
    ],
    correctAnswer: '99',
    explanation: '9,801 = 3^4 x 11^2. Taking square root: 3^2 x 11 = 9 x 11 = 99. Check: 99 x 99 = 9,801.',
    socraticHint: 'Notice that 100^2 is 10,000. Which number just below 100 has a square ending in 1?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-020',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A square flower bed has a perimeter of 144 metres. What is the area of the flower bed?',
    text: 'A square flower bed has a perimeter of 144 metres. What is the area of the flower bed?',
    options: [
      '1,296 m^2',
      '1,196 m^2',
      '1,440 m^2',
      '576 m^2'
    ],
    correctAnswer: '1,296 m^2',
    explanation: 'Side length = Perimeter / 4 = 144 / 4 = 36 metres. Area = side^2 = 36 x 36 = 1,296 square metres.',
    socraticHint: 'First divide perimeter by 4 to get side length (36 m), then square 36.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-021',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the smallest whole number by which 180 must be multiplied so that the product becomes a perfect square?',
    text: 'What is the smallest whole number by which 180 must be multiplied so that the product becomes a perfect square?',
    options: [
      '5',
      '2',
      '3',
      '10'
    ],
    correctAnswer: '5',
    explanation: 'Prime factorisation of 180 = 2^2 x 3^2 x 5. The factor 5 is unpaired. To make all exponents even, we must multiply by 5. (180 x 5 = 900 = 30^2).',
    socraticHint: 'Write 180 in prime factors: 2^2 x 3^2 x 5. Which prime factor has an odd power and needs a partner?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-022',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following numbers CANNOT be a perfect square?',
    text: 'Which of the following numbers CANNOT be a perfect square?',
    options: [
      '2,357',
      '2,304',
      '2,601',
      '2,500'
    ],
    correctAnswer: '2,357',
    explanation: 'The last digit of any perfect square can only be 0, 1, 4, 5, 6, or 9. No perfect square can ever end in 2, 3, 7, or 8. Therefore, 2,357 cannot be a perfect square.',
    socraticHint: 'Look at the last digit: can a square number end with 7?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-023',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: sqrt(64 x 81).',
    text: 'Evaluate: sqrt(64 x 81).',
    options: [
      '72',
      '64',
      '81',
      '144'
    ],
    correctAnswer: '72',
    explanation: 'Property of square roots: sqrt(a x b) = sqrt(a) x sqrt(b). sqrt(64) = 8, sqrt(81) = 9. 8 x 9 = 72.',
    socraticHint: 'Find sqrt(64) and sqrt(81) separately, then multiply them.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },
  {
    id: 'q-g6-math-u3-024',
    subStrandId: 'substrand-g6-math-u3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The area of a square shamba is 7,225 m^2. How much fencing wire is needed to fence the shamba with 3 strands of wire?',
    text: 'The area of a square shamba is 7,225 m^2. How much fencing wire is needed to fence the shamba with 3 strands of wire?',
    options: [
      '1,020 m',
      '340 m',
      '680 m',
      '850 m'
    ],
    correctAnswer: '1,020 m',
    explanation: 'Side length = sqrt(7,225) = 85 m. Perimeter of 1 strand = 4 x 85 = 340 m. For 3 strands of wire: 3 x 340 = 1,020 metres.',
    socraticHint: 'Find the side length by taking sqrt(7,225) = 85 m. Perimeter = 4 x 85 = 340 m. Multiply by 3 for 3 strands.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U3'
  },

  // --- Unit 4: Mission 1 (q-g6-math-u4-001 to 012) ---
  {
    id: 'q-g6-math-u4-001',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 4 2/3 + 3 3/4. Express the answer in simplest mixed number form.',
    text: 'Evaluate: 4 2/3 + 3 3/4. Express the answer in simplest mixed number form.',
    options: [
      '8 5/12',
      '7 5/12',
      '8 1/12',
      '7 11/12'
    ],
    correctAnswer: '8 5/12',
    explanation: '4 2/3 + 3 3/4 = (4 + 3) + (8/12 + 9/12) = 7 + 17/12 = 7 + 1 5/12 = 8 5/12.',
    socraticHint: 'Find the common denominator of 3 and 4 (which is 12) and add whole numbers and fractions.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-002',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 6 1/5 - 2 3/4.',
    text: 'Evaluate: 6 1/5 - 2 3/4.',
    options: [
      '3 9/20',
      '4 9/20',
      '3 11/20',
      '4 1/20'
    ],
    correctAnswer: '3 9/20',
    explanation: 'Convert to improper fractions: 31/5 - 11/4 = (124 - 55) / 20 = 69 / 20 = 3 9/20.',
    socraticHint: 'Express as improper fractions with common denominator 20: 124/20 - 55/20.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-003',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the reciprocal of 3 4/7?',
    text: 'What is the reciprocal of 3 4/7?',
    options: [
      '7/25',
      '25/7',
      '7/12',
      '3 7/4'
    ],
    correctAnswer: '7/25',
    explanation: 'Convert 3 4/7 to an improper fraction: (3 x 7 + 4) / 7 = 25/7. The reciprocal of 25/7 is 7/25.',
    socraticHint: 'First convert 3 4/7 to an improper fraction, then invert the numerator and denominator.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-004',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Multiply: 2 1/7 x 1 2/5.',
    text: 'Multiply: 2 1/7 x 1 2/5.',
    options: [
      '3',
      '2 2/35',
      '3 1/5',
      '2 3/7'
    ],
    correctAnswer: '3',
    explanation: '2 1/7 = 15/7; 1 2/5 = 7/5. Multiply: (15/7) x (7/5) = (15 x 7) / (7 x 5). Cancel 7 and 15/5 = 3.',
    socraticHint: 'Convert both to improper fractions: 15/7 x 7/5. Notice that 7 cancels out.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-005',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Divide: 5 1/4 / 1 1/2.',
    text: 'Divide: 5 1/4 / 1 1/2.',
    options: [
      '3 1/2',
      '3 1/4',
      '7 7/8',
      '4 1/2'
    ],
    correctAnswer: '3 1/2',
    explanation: '5 1/4 = 21/4; 1 1/2 = 3/2. Reciprocal of 3/2 is 2/3. (21/4) x (2/3) = (21 x 2) / (4 x 3) = 42 / 12 = 7/2 = 3 1/2.',
    socraticHint: '21/4 divided by 3/2 becomes 21/4 multiplied by 2/3.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-006',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A chef used 3/8 of a bag of rice on Friday and 1/3 of the remainder on Saturday. What fraction of the original bag of rice remained for Sunday?',
    text: 'A chef used 3/8 of a bag of rice on Friday and 1/3 of the remainder on Saturday. What fraction of the original bag of rice remained for Sunday?',
    options: [
      '5/12',
      '5/24',
      '7/24',
      '1/2'
    ],
    correctAnswer: '5/12',
    explanation: 'Used Friday: 3/8. Remainder after Friday = 1 - 3/8 = 5/8. Used Saturday = 1/3 of 5/8 = 5/24. Remaining for Sunday = 5/8 - 5/24 = (15 - 5) / 24 = 10/24 = 5/12.',
    socraticHint: 'After using 3/8, 5/8 remains. If 1/3 of the remainder is used, then 2/3 of 5/8 remains.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-007',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: (2 1/2 + 1 1/3) / (3/4 of 1 1/3).',
    text: 'Evaluate: (2 1/2 + 1 1/3) / (3/4 of 1 1/3).',
    options: [
      '3 5/6',
      '2 5/6',
      '4 1/6',
      '3 1/3'
    ],
    correctAnswer: '3 5/6',
    explanation: 'Numerator: 2 1/2 + 1 1/3 = 5/2 + 4/3 = (15 + 8) / 6 = 23/6. Denominator: 3/4 of 1 1/3 = 3/4 x 4/3 = 1. Division: (23/6) / 1 = 23/6 = 3 5/6.',
    socraticHint: 'Notice that the denominator is 3/4 x 4/3 = 1! What is 2 1/2 + 1 1/3 divided by 1?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-008',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A dairy farmer produced 48 litres of milk. He poured the milk into bottles each holding 3/4 of a litre. How many bottles were filled completely?',
    text: 'A dairy farmer produced 48 litres of milk. He poured the milk into bottles each holding 3/4 of a litre. How many bottles were filled completely?',
    options: [
      '64 bottles',
      '36 bottles',
      '72 bottles',
      '56 bottles'
    ],
    correctAnswer: '64 bottles',
    explanation: 'Number of bottles = 48 / (3/4) = 48 x 4/3 = 16 x 4 = 64 bottles.',
    socraticHint: 'Divide 48 by 3/4: multiply 48 by the reciprocal 4/3.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-009',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 3/5 x 15/18 / 1/2.',
    text: 'Evaluate: 3/5 x 15/18 / 1/2.',
    options: [
      '1',
      '1/2',
      '2',
      '1/4'
    ],
    correctAnswer: '1',
    explanation: '3/5 x 15/18 = (3 x 15) / (5 x 18) = 45 / 90 = 1/2. Then: (1/2) / (1/2) = 1.',
    socraticHint: 'First multiply 3/5 x 15/18 to get 1/2, then divide 1/2 by 1/2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-010',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kipchoge ran 3 1/2 km in the morning and 4 3/5 km in the evening. How many kilometres did he run in total that day?',
    text: 'Kipchoge ran 3 1/2 km in the morning and 4 3/5 km in the evening. How many kilometres did he run in total that day?',
    options: [
      '8 1/10 km',
      '7 4/7 km',
      '7 1/10 km',
      '8 3/10 km'
    ],
    correctAnswer: '8 1/10 km',
    explanation: '3 1/2 + 4 3/5 = (3 + 4) + (5/10 + 6/10) = 7 + 11/10 = 7 + 1 1/10 = 8 1/10 km.',
    socraticHint: 'Add whole numbers (3+4=7) and fractions (5/10 + 6/10 = 11/10 = 1 1/10).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-011',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What fraction must be added to 5/12 to get 7/8?',
    text: 'What fraction must be added to 5/12 to get 7/8?',
    options: [
      '11/24',
      '1/12',
      '5/24',
      '13/24'
    ],
    correctAnswer: '11/24',
    explanation: '7/8 - 5/12 = (21/24 - 10/24) = 11/24.',
    socraticHint: 'Subtract 5/12 from 7/8 using the common denominator 24.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-012',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A tank is 5/6 full of water. If 120 litres of water are drawn out, the tank becomes 1/2 full. What is the full capacity of the tank?',
    text: 'A tank is 5/6 full of water. If 120 litres of water are drawn out, the tank becomes 1/2 full. What is the full capacity of the tank?',
    options: [
      '360 litres',
      '240 litres',
      '480 litres',
      '300 litres'
    ],
    correctAnswer: '360 litres',
    explanation: 'Fraction drawn out = 5/6 - 1/2 = 5/6 - 3/6 = 2/6 = 1/3 of the tank. If 1/3 of capacity = 120 litres, then Full Capacity = 120 x 3 = 360 litres.',
    socraticHint: 'What fraction represents 5/6 - 1/2? That fraction equals 120 litres.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },

  // --- Unit 4: Mission 2 (q-g6-math-u4-013 to 024) ---
  {
    id: 'q-g6-math-u4-013',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Express 7/8 as a decimal.',
    text: 'Express 7/8 as a decimal.',
    options: [
      '0.875',
      '0.78',
      '0.825',
      '0.85'
    ],
    correctAnswer: '0.875',
    explanation: '7 / 8: 7.000 / 8 = 0.875.',
    socraticHint: 'Divide 7 by 8 using long division: 7.0 / 8 = 0.8 with remainder 6; 60 / 8 = 7 with remainder 4; 40 / 8 = 5.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-014',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Convert the recurring decimal 0.333... into its simplest fractional form.',
    text: 'Convert the recurring decimal 0.333... into its simplest fractional form.',
    options: [
      '1/3',
      '3/10',
      '33/100',
      '1/9'
    ],
    correctAnswer: '1/3',
    explanation: 'Let x = 0.333... Then 10x = 3.333... Subtracting: 9x = 3, so x = 3/9 = 1/3.',
    socraticHint: 'Which fraction equals 1 divided by 3?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-015',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Convert 17/20 into a percentage.',
    text: 'Convert 17/20 into a percentage.',
    options: [
      '85%',
      '80%',
      '75%',
      '90%'
    ],
    correctAnswer: '85%',
    explanation: '17/20 x 100% = 17 x 5% = 85%.',
    socraticHint: 'Multiply 17/20 by 100%. 100 divided by 20 is 5.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-016',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Convert 64% into a fraction in its lowest terms.',
    text: 'Convert 64% into a fraction in its lowest terms.',
    options: [
      '16/25',
      '32/50',
      '8/12',
      '14/25'
    ],
    correctAnswer: '16/25',
    explanation: '64% = 64/100. Divide both numerator and denominator by 4: (64/4) / (100/4) = 16/25.',
    socraticHint: 'Divide 64 and 100 by their highest common factor, 4.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-017',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The population of a school increased from 400 pupils to 460 pupils. What was the percentage increase?',
    text: 'The population of a school increased from 400 pupils to 460 pupils. What was the percentage increase?',
    options: [
      '15%',
      '60%',
      '12%',
      '18%'
    ],
    correctAnswer: '15%',
    explanation: 'Increase = 460 - 400 = 60. Percentage increase = (Increase / Original) x 100% = (60 / 400) x 100% = 60 / 4 = 15%.',
    socraticHint: 'Divide the increase (60) by the original value (400) and multiply by 100%.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-018',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A supermarket reduced the price of a cooking oil container from KES 800 to KES 680 during a promotion. What was the percentage decrease?',
    text: 'A supermarket reduced the price of a cooking oil container from KES 800 to KES 680 during a promotion. What was the percentage decrease?',
    options: [
      '15%',
      '12%',
      '20%',
      '120%'
    ],
    correctAnswer: '15%',
    explanation: 'Decrease = 800 - 680 = KES 120. Percentage decrease = (Decrease / Original) x 100% = (120 / 800) x 100% = 120 / 8 = 15%.',
    socraticHint: 'Find the price drop (KES 120), divide by the original price (KES 800), and multiply by 100%.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-019',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 0.45 x 0.08.',
    text: 'Evaluate: 0.45 x 0.08.',
    options: [
      '0.036',
      '0.36',
      '0.0036',
      '0.360'
    ],
    correctAnswer: '0.036',
    explanation: '45 x 8 = 360. Total decimal places = 2 + 2 = 4 decimal places. 360 with 4 decimal places = 0.0360 = 0.036.',
    socraticHint: 'Multiply 45 by 8 (360), then move the decimal point 4 places to the left.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-020',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Divide: 14.4 / 0.12.',
    text: 'Divide: 14.4 / 0.12.',
    options: [
      '120',
      '12',
      '1.2',
      '1200'
    ],
    correctAnswer: '120',
    explanation: 'Multiply numerator and denominator by 100 to make the divisor an integer: (14.4 x 100) / (0.12 x 100) = 1,440 / 12 = 120.',
    socraticHint: 'Eliminate decimals in the denominator: 1,440 divided by 12.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-021',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a Grade 6 KPSEA trial assessment of 50 questions, Amani answered 42 questions correctly. What was her score as a percentage?',
    text: 'In a Grade 6 KPSEA trial assessment of 50 questions, Amani answered 42 questions correctly. What was her score as a percentage?',
    options: [
      '84%',
      '82%',
      '80%',
      '86%'
    ],
    correctAnswer: '84%',
    explanation: 'Score = (42 / 50) x 100% = 42 x 2 = 84%.',
    socraticHint: 'Multiply 42/50 by 100%: 100 / 50 = 2, so calculate 42 x 2.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-022',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An electronics shop offers a 12% discount on a television set marked at KES 25,000. How much does a customer pay after the discount?',
    text: 'An electronics shop offers a 12% discount on a television set marked at KES 25,000. How much does a customer pay after the discount?',
    options: [
      'KES 22,000',
      'KES 21,500',
      'KES 23,000',
      'KES 3,000'
    ],
    correctAnswer: 'KES 22,000',
    explanation: 'Discount = 12% of 25,000 = (12 / 100) x 25,000 = 12 x 250 = KES 3,000. Price paid = 25,000 - 3,000 = KES 22,000.',
    socraticHint: 'Calculate 12% of 25,000 (KES 3,000), then subtract that discount from 25,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-023',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is 35% of 2 hours, expressed in minutes?',
    text: 'What is 35% of 2 hours, expressed in minutes?',
    options: [
      '42 minutes',
      '35 minutes',
      '40 minutes',
      '70 minutes'
    ],
    correctAnswer: '42 minutes',
    explanation: '2 hours = 120 minutes. 35% of 120 = (35 / 100) x 120 = (7 / 20) x 120 = 7 x 6 = 42 minutes.',
    socraticHint: 'First convert 2 hours into minutes (120 minutes), then calculate 35/100 of 120.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  },
  {
    id: 'q-g6-math-u4-024',
    subStrandId: 'substrand-g6-math-u4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The salary of a clerk was increased by 10% to KES 22,000. What was his original salary before the increase?',
    text: 'The salary of a clerk was increased by 10% to KES 22,000. What was his original salary before the increase?',
    options: [
      'KES 20,000',
      'KES 19,800',
      'KES 20,200',
      'KES 24,200'
    ],
    correctAnswer: 'KES 20,000',
    explanation: 'New salary = 100% + 10% = 110% of original. 110% = 22,000. Original salary (100%) = (22,000 / 110) x 100 = 200 x 100 = KES 20,000.',
    socraticHint: 'If the new salary represents 110% of the original salary, what was 100%?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U4'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(que => que.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write back to database file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 2 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
