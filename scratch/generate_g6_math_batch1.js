import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Registering Grade 6 Mathematics & Generating Batch 1 (Units 1 & 2) ---');

// 1. Register la-math-g6 in db.learningAreas
if (!db.learningAreas.some(la => la.id === 'la-math-g6')) {
  db.learningAreas.push({
    id: 'la-math-g6',
    gradeId: 'grade-6',
    name: 'Mathematics',
    swahiliName: 'Hisabati',
    icon: 'calculator',
    color: '#10B981',
    description: 'Upper Primary capstone: Large numbers, BODMAS, square roots, ratio & percentages, circle geometry, volume & speed, consumer arithmetic, and algebraic thinking for KPSEA excellence.',
    strandsCount: 4
  });
  console.log('Added la-math-g6 to learningAreas');
}

// 2. Register Grade 6 Mathematics Strands
const strandsToAdd = [
  {
    id: 'strand-g6-math-numbers',
    learningAreaId: 'la-math-g6',
    code: 'MATH-G6-STR-01',
    title: 'Numbers, Operations, and Number Theory',
    swahiliTitle: 'Nambari na Uendeshaji',
    description: 'Numbers up to 1,000,000, multi-digit operations, BODMAS order of operations, divisibility rules, prime factorisation, squares & square roots, and fractions, decimals & percentages.',
    icon: 'hash'
  },
  {
    id: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    code: 'MATH-G6-STR-02',
    title: 'Measurement, Travel and Financial Literacy',
    swahiliTitle: 'Vipimo, Mwendo na Fedha',
    description: 'Perimeter and circumference of circles, composite areas, volume and capacity conversions, speed and travel timetables, and consumer arithmetic with bills and simple interest.',
    icon: 'compass'
  },
  {
    id: 'strand-g6-math-geometry',
    learningAreaId: 'la-math-g6',
    code: 'MATH-G6-STR-03',
    title: 'Geometry, Coordinates and Solid Figures',
    swahiliTitle: 'Jiometri na Maumbo',
    description: 'Angle properties of parallel lines and transversals, interior angles of polygons, 3D polyhedron nets, and Cartesian coordinates in the first quadrant.',
    icon: 'box'
  },
  {
    id: 'strand-g6-math-data',
    learningAreaId: 'la-math-g6',
    code: 'MATH-G6-STR-04',
    title: 'Data Handling, Probability and Algebraic Thinking',
    swahiliTitle: 'Takwimu, Uwezekano na Aljebra',
    description: 'Data representation with pie charts and line graphs, measures of central tendency (mean, median, mode), simple chance, and forming and solving linear algebraic equations.',
    icon: 'bar-chart-2'
  }
];

strandsToAdd.forEach(s => {
  if (!db.strands.some(st => st.id === s.id)) {
    db.strands.push(s);
    console.log(`Added strand ${s.id}`);
  }
});

// 3. Register la-math-g6 in world-math-kingdom
const mathWorld = db.gameWorlds.find(w => w.id === 'world-math-kingdom');
if (mathWorld) {
  if (!mathWorld.learningAreaIds.includes('la-math-g6')) {
    mathWorld.learningAreaIds.push('la-math-g6');
    console.log('Added la-math-g6 to world-math-kingdom.learningAreaIds');
  }
  mathWorld.totalMissions = Math.max(mathWorld.totalMissions, 109);
}

// 4. Batch 1 Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u1',
    strandId: 'strand-g6-math-numbers',
    learningAreaId: 'la-math-g6',
    title: 'Whole Numbers up to 1,000,000, Rounding & Roman Numerals',
    description: 'Mastering place value and total value of digits in numbers up to 1,000,000; reading and writing numerals in words and symbols; rounding off to the nearest 100, 1,000, 10,000, and 100,000; and reading, converting, and calculating using Roman numerals up to M (1,000).',
    cbeCompetency: 'Numerical literacy, logical reasoning, estimation skills, and historical numeral systems understanding',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g6-math-u2',
    strandId: 'strand-g6-math-numbers',
    learningAreaId: 'la-math-g6',
    title: 'Multi-digit Operations & Order of Operations (BODMAS)',
    description: 'Adding and subtracting multi-digit numbers up to 1,000,000 in real-life census and agricultural contexts; multiplying 4-digit numbers by 2-digit and 3-digit multipliers; dividing up to 6-digit dividends by 2-digit divisors; and applying the BODMAS order of operations to solve multi-step numerical expressions.',
    cbeCompetency: 'Computational fluency, problem solving, algorithmic thinking, and precision in multi-step arithmetic',
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
    id: 'lesson-g6-math-u1-l1',
    subStrandId: 'substrand-g6-math-u1',
    title: 'Place Value, Total Value & Writing Numbers up to 1,000,000',
    content: 'In Grade 6, learners advance to seven-digit numbers up to 1,000,000 (one million). A seven-digit number has place value columns: Millions (M), Hundred Thousands (HT), Ten Thousands (TT), Thousands (Th), Hundreds (H), Tens (T), and Ones (O).\n\n1. Place Value vs. Total Value:\n- Place value is the position of a digit in a number (e.g. Hundred Thousands).\n- Total value is the value of the digit multiplied by its place value.\n- Example: In 748,529, the digit 7 is in the Hundred Thousands place, and its total value is 700,000. The digit 4 is in the Ten Thousands place (total value 40,000), 8 is in Thousands (8,000), 5 is in Hundreds (500), 2 is in Tens (20), and 9 is in Ones (9).\n\n2. Writing Large Numbers in Words:\n- Group the digits into periods separated by commas: Millions, Thousands, and Units.\n- Example: 685,214 is read and written as "Six hundred eighty-five thousand, two hundred fourteen."\n- 1,000,000 is written as "One million."\n\n3. Kenyan Census Application:\n- Kenya National Bureau of Statistics (KNBS) census data records county populations in large whole numbers (e.g. Kiambu County population exceeding 2,417,000). Reading and comparing these numbers allows accurate national resource allocation.',
    didYouKnow: 'One million is a 1 followed by 6 zeros: 1,000,000. If you counted from 1 to 1,000,000 non-stop at one number per second, it would take you over 11 and a half days!',
    kenyanContext: 'During the national coffee census in Nyeri and Murang\'a counties, smallholder cooperatives delivered 845,620 kilograms of coffee berries, requiring learners to calculate digit total values for accurate harvest accounting.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u1-l2',
    subStrandId: 'substrand-g6-math-u1',
    title: 'Rounding Off Large Numbers & Roman Numerals up to M (1,000)',
    content: 'Rounding off allows sensible estimation in commerce and planning, while Roman numerals appear in book chapters, clocks, monarch titles, and monuments.\n\n1. Rounding Off Rules:\n- Identify the rounding place digit.\n- Look at the digit immediately to its right:\n  * If 0, 1, 2, 3, 4: round down (leave the rounding digit unchanged, turn all subsequent digits to 0).\n  * If 5, 6, 7, 8, 9: round up (add 1 to the rounding digit, turn all subsequent digits to 0).\n- Example: Round 674,832 to the nearest ten thousand: The digit in ten thousands is 7. The digit to its right is 4 (< 5), so it rounds to 670,000. To the nearest hundred thousand: 7 >= 5, so it rounds to 700,000.\n\n2. Roman Numerals up to M (1,000):\n- Basic symbols: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1,000.\n- Subtractive principle: A smaller symbol placed before a larger one subtracts (IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).\n- Additive principle: Symbols placed after larger ones add (VI = 6, LX = 60, CX = 110, DC = 600, MC = 1,100).\n- Example: 458 in Roman numerals: 400 (CD) + 50 (L) + 8 (VIII) = CDLVIII.\n- Example: 944: 900 (CM) + 40 (XL) + 4 (IV) = CMXLIV.',
    didYouKnow: 'Roman numerals have no symbol for zero (0)! The Romans used words like "nulla" (none), but did not treat zero as a placeholder number.',
    kenyanContext: 'At Nairobi City Hall and the Supreme Court of Kenya, historical foundation stones and clock towers are inscribed with Roman numerals like MCMXXII (1922) and MMXXIV (2024).',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u2-l1',
    subStrandId: 'substrand-g6-math-u2',
    title: 'Multi-digit Addition, Subtraction, Multiplication & Division',
    content: 'Grade 6 arithmetic requires high precision when managing large values in agriculture, government budgets, and business logistics.\n\n1. Column Addition and Subtraction:\n- Align digits strictly by place value columns from right to left (Ones, Tens, Hundreds, Thousands...).\n- Regroup (carry over or borrow) accurately.\n- Check subtraction using addition: Difference + Subtrahend = Minuend.\n\n2. Long Multiplication (3-Digit Multipliers):\n- Multiply by ones, then tens (remembering placeholder 0), then hundreds (remembering two placeholder 0s), and sum the partial products.\n- Example: 2,435 x 124 = (2,435 x 4) + (2,435 x 20) + (2,435 x 100) = 9,740 + 48,700 + 243,500 = 301,940.\n\n3. Long Division by 2-Digit Divisors:\n- Follow the DMSB cycle: Divide, Multiply, Subtract, Bring down.\n- Example: 45,696 / 36 = 1,269 with remainder 0.\n- Verify: (Divisor x Quotient) + Remainder = Dividend.',
    didYouKnow: 'The standard algorithm for long multiplication was developed in medieval Arabic and Indian mathematics and brought to Europe by Fibonacci in his 1202 book Liber Abaci!',
    kenyanContext: 'The Kenya Tea Development Agency (KTDA) processed 148,500 kg of green leaf tea across 12 collection centres in Kericho, requiring Grade 6 learners to divide equally to determine average deliveries per centre.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u2-l2',
    subStrandId: 'substrand-g6-math-u2',
    title: 'Order of Operations & The BODMAS Rule',
    content: 'When an arithmetic expression contains multiple operations, a universal order must be followed to avoid ambiguity.\n\n1. The BODMAS Acronym:\n- B: Brackets first () [] {}\n- O: Of (multiplication indicated by the word "of", e.g. 1/2 of 80) or Order (powers/roots)\n- D: Division\n- M: Multiplication (Division and Multiplication have equal priority from left to right)\n- A: Addition\n- S: Subtraction (Addition and Subtraction have equal priority from left to right)\n\n2. Step-by-Step Worked Example:\n- Evaluate: 24 + (18 - 6) / 3 x 5\n- Step 1 (Brackets): (18 - 6) = 12. Expression becomes: 24 + 12 / 3 x 5\n- Step 2 (Division): 12 / 3 = 4. Expression becomes: 24 + 4 x 5\n- Step 3 (Multiplication): 4 x 5 = 20. Expression becomes: 24 + 20\n- Step 4 (Addition): 24 + 20 = 44.\n\n3. Common Pitfalls:\n- Working strictly from left to right without respecting precedence (e.g. calculating 10 + 2 x 5 as 12 x 5 = 60 instead of the correct 10 + 10 = 20) is the most frequent error.',
    didYouKnow: 'In the USA and Canada, the same convention is called PEMDAS (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction), but the mathematical outcome is strictly identical!',
    kenyanContext: 'An agrovet shop in Eldoret calculated an invoice: 5 bags of fertilizer at KES 2,500 each minus a 10% discount plus KES 400 transport: [5 x 2,500 - (10/100 of 12,500)] + 400 = 11,250 + 400 = KES 11,650.',
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

// 6. Batch 1 Missions (4 missions: orders 61 to 64 in world-math-kingdom)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u1-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u1',
    lessonId: 'lesson-g6-math-u1-l1',
    title: 'Millionaire Place Value & Number Sense Quest',
    description: 'Master digit positions, determine total values up to 1,000,000, and write multi-digit numbers in words for Kenyan national census accounting!',
    order: 61,
    orderIndex: 61,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-place-value-master',
    badge: { name: 'Millionaire Place Value Master', icon: 'hash' },
    questionIds: [
      'q-g6-math-u1-001', 'q-g6-math-u1-002', 'q-g6-math-u1-003', 'q-g6-math-u1-004',
      'q-g6-math-u1-005', 'q-g6-math-u1-006', 'q-g6-math-u1-007', 'q-g6-math-u1-008',
      'q-g6-math-u1-009', 'q-g6-math-u1-010', 'q-g6-math-u1-011', 'q-g6-math-u1-012'
    ]
  },
  {
    id: 'mission-g6-math-u1-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u1',
    lessonId: 'lesson-g6-math-u1-l2',
    title: 'Rounding Ranger & Roman Centurion Quest',
    description: 'Round off numbers to the nearest thousands and millions, and decode ancient Roman numerals up to M (1,000) with precision!',
    order: 62,
    orderIndex: 62,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-roman-numeral-ace',
    badge: { name: 'Roman Centurion Ace', icon: 'shield' },
    questionIds: [
      'q-g6-math-u1-013', 'q-g6-math-u1-014', 'q-g6-math-u1-015', 'q-g6-math-u1-016',
      'q-g6-math-u1-017', 'q-g6-math-u1-018', 'q-g6-math-u1-019', 'q-g6-math-u1-020',
      'q-g6-math-u1-021', 'q-g6-math-u1-022', 'q-g6-math-u1-023', 'q-g6-math-u1-024'
    ]
  },
  {
    id: 'mission-g6-math-u2-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u2',
    lessonId: 'lesson-g6-math-u2-l1',
    title: 'Multi-digit Arithmetic & Long Division Safari',
    description: 'Execute multi-digit addition, subtraction, long multiplication with 3-digit multipliers, and long division with 2-digit divisors!',
    order: 63,
    orderIndex: 63,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-arithmetic-dynamo',
    badge: { name: 'Arithmetic Dynamo', icon: 'calculator' },
    questionIds: [
      'q-g6-math-u2-001', 'q-g6-math-u2-002', 'q-g6-math-u2-003', 'q-g6-math-u2-004',
      'q-g6-math-u2-005', 'q-g6-math-u2-006', 'q-g6-math-u2-007', 'q-g6-math-u2-008',
      'q-g6-math-u2-009', 'q-g6-math-u2-010', 'q-g6-math-u2-011', 'q-g6-math-u2-012'
    ]
  },
  {
    id: 'mission-g6-math-u2-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u2',
    lessonId: 'lesson-g6-math-u2-l2',
    title: 'Order of Operations & BODMAS Champion Quest',
    description: 'Conquer complex multi-step numerical expressions, resolve brackets, evaluate "of", and apply BODMAS rules flawlessly!',
    order: 64,
    orderIndex: 64,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-bodmas-champion',
    badge: { name: 'BODMAS Grandmaster', icon: 'award' },
    questionIds: [
      'q-g6-math-u2-013', 'q-g6-math-u2-014', 'q-g6-math-u2-015', 'q-g6-math-u2-016',
      'q-g6-math-u2-017', 'q-g6-math-u2-018', 'q-g6-math-u2-019', 'q-g6-math-u2-020',
      'q-g6-math-u2-021', 'q-g6-math-u2-022', 'q-g6-math-u2-023', 'q-g6-math-u2-024'
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
  // --- Unit 1: Mission 1 (q-g6-math-u1-001 to 012) ---
  {
    id: 'q-g6-math-u1-001',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the place value of digit 7 in the numeral 748,529?',
    text: 'What is the place value of digit 7 in the numeral 748,529?',
    options: [
      'Hundred Thousands',
      'Ten Thousands',
      'Millions',
      'Thousands'
    ],
    correctAnswer: 'Hundred Thousands',
    explanation: 'In 748,529, counting from the right: 9 is Ones, 2 is Tens, 5 is Hundreds, 8 is Thousands, 4 is Ten Thousands, and 7 is Hundred Thousands.',
    socraticHint: 'Which position is the 6th digit from the right in a six-digit whole number?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-002',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the total value of digit 6 in the numeral 864,125?',
    text: 'What is the total value of digit 6 in the numeral 864,125?',
    options: [
      '60,000',
      '6,000',
      '600,000',
      '600'
    ],
    correctAnswer: '60,000',
    explanation: 'Digit 6 is in the Ten Thousands place. Its total value is 6 x 10,000 = 60,000.',
    socraticHint: 'Multiply the digit by its place value position: what is 6 x 10,000?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-003',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A Kenyan county registered 605,042 voters. How is this number written in words?',
    text: 'A Kenyan county registered 605,042 voters. How is this number written in words?',
    options: [
      'Six hundred five thousand, forty-two',
      'Six hundred fifty thousand, forty-two',
      'Six million five thousand, forty-two',
      'Sixty-five thousand, forty-two'
    ],
    correctAnswer: 'Six hundred five thousand, forty-two',
    explanation: 'The thousands group has 605 (six hundred five thousand) and the units group has 042 (forty-two), giving "Six hundred five thousand, forty-two".',
    socraticHint: 'Read the three digits in the thousands period (605) followed by the units period (042).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-004',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Write the number "Nine hundred seventy thousand, eight hundred fifteen" in symbols.',
    text: 'Write the number "Nine hundred seventy thousand, eight hundred fifteen" in symbols.',
    options: [
      '970,815',
      '907,815',
      '970,850',
      '9,700,815'
    ],
    correctAnswer: '970,815',
    explanation: 'Nine hundred seventy thousand is 970,000. Eight hundred fifteen is 815. Combining both gives 970,815.',
    socraticHint: 'What numeral represents nine hundred seventy in the thousands period?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-005',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the place value of digit 1 in the number 1,000,000?',
    text: 'What is the place value of digit 1 in the number 1,000,000?',
    options: [
      'Millions',
      'Hundred Thousands',
      'Ten Millions',
      'Thousands'
    ],
    correctAnswer: 'Millions',
    explanation: 'In 1,000,000, the digit 1 occupies the 7th place value position from the right, which is the Millions column.',
    socraticHint: 'What is the name of the place value for the seventh digit from the right?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-006',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In the number 538,247, what is the difference between the total value of digit 5 and the total value of digit 8?',
    text: 'In the number 538,247, what is the difference between the total value of digit 5 and the total value of digit 8?',
    options: [
      '492,000',
      '420,000',
      '508,000',
      '498,000'
    ],
    correctAnswer: '492,000',
    explanation: 'Total value of 5 is 500,000 (Hundred Thousands). Total value of 8 is 8,000 (Thousands). Difference: 500,000 - 8,000 = 492,000.',
    socraticHint: 'Subtract 8,000 from 500,000: what is 500,000 - 8,000?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-007',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Arrange the following numbers in descending order (largest to smallest): 485,210; 458,920; 485,900; 458,290.',
    text: 'Arrange the following numbers in descending order (largest to smallest): 485,210; 458,920; 485,900; 458,290.',
    options: [
      '485,900; 485,210; 458,920; 458,290',
      '485,210; 485,900; 458,920; 458,290',
      '458,290; 458,920; 485,210; 485,900',
      '485,900; 458,920; 485,210; 458,290'
    ],
    correctAnswer: '485,900; 485,210; 458,920; 458,290',
    explanation: 'Comparing thousands periods: 485 > 458. Between 485,900 and 485,210: 900 > 210. Between 458,920 and 458,290: 920 > 290. Descending order is 485,900; 485,210; 458,920; 458,290.',
    socraticHint: 'Which number has the largest hundreds digit among those with 485 thousands?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-008',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the sum of the total values of the digits in the odd positions (counting from right: 1st, 3rd, 5th) in the numeral 638,425?',
    text: 'What is the sum of the total values of the digits in the odd positions (counting from right: 1st, 3rd, 5th) in the numeral 638,425?',
    options: [
      '30,405',
      '38,425',
      '30,425',
      '608,405'
    ],
    correctAnswer: '30,405',
    explanation: 'From right to left: 1st digit is 5 (total value 5), 3rd digit is 4 (total value 400), 5th digit is 3 (total value 30,000). Sum = 30,000 + 400 + 5 = 30,405.',
    socraticHint: 'Identify the 1st digit (ones), 3rd digit (hundreds), and 5th digit (ten thousands) and add their values.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-009',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A tea factory produced 999,999 kg of processed tea. If they produce 1 more kilogram, what will be the total weight?',
    text: 'A tea factory produced 999,999 kg of processed tea. If they produce 1 more kilogram, what will be the total weight?',
    options: [
      '1,000,000 kg (One million kg)',
      '10,000,000 kg',
      '999,990 kg',
      '1,000,001 kg'
    ],
    correctAnswer: '1,000,000 kg (One million kg)',
    explanation: '999,999 + 1 = 1,000,000 (one million). It is the smallest seven-digit whole number.',
    socraticHint: 'What number immediately follows 999,999 when counting by ones?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-010',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the expanded form of 704,068?',
    text: 'What is the expanded form of 704,068?',
    options: [
      '700,000 + 4,000 + 60 + 8',
      '700,000 + 40,000 + 60 + 8',
      '70,000 + 4,000 + 600 + 8',
      '700,000 + 400 + 60 + 8'
    ],
    correctAnswer: '700,000 + 4,000 + 60 + 8',
    explanation: 'In 704,068: 7 is Hundred Thousands (700,000), 0 is Ten Thousands (0), 4 is Thousands (4,000), 0 is Hundreds (0), 6 is Tens (60), and 8 is Ones (8). Expanded: 700,000 + 4,000 + 60 + 8.',
    socraticHint: 'Check the total value of each non-zero digit in its exact place.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-011',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Form the smallest six-digit whole number using all the digits 5, 0, 8, 2, 7, 1 without repeating any digit.',
    text: 'Form the smallest six-digit whole number using all the digits 5, 0, 8, 2, 7, 1 without repeating any digit.',
    options: [
      '102,578',
      '012,578',
      '120,578',
      '102,758'
    ],
    correctAnswer: '102,578',
    explanation: 'A six-digit number cannot begin with 0. The smallest non-zero digit is 1. Next place 0, followed by the remaining digits in ascending order: 2, 5, 7, 8. The smallest number is 102,578.',
    socraticHint: 'Since 0 cannot be the first digit of a 6-digit number, which smallest digit must come first, followed immediately by 0?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-012',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many thousands are there in 450,000?',
    text: 'How many thousands are there in 450,000?',
    options: [
      '450',
      '45',
      '4,500',
      '450,000'
    ],
    correctAnswer: '450',
    explanation: 'To find how many thousands are in 450,000, divide by 1,000: 450,000 / 1,000 = 450.',
    socraticHint: 'Divide 450,000 by 1,000: remove three zeros.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },

  // --- Unit 1: Mission 2 (q-g6-math-u1-013 to 024) ---
  {
    id: 'q-g6-math-u1-013',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Round off 486,725 to the nearest thousand.',
    text: 'Round off 486,725 to the nearest thousand.',
    options: [
      '487,000',
      '486,000',
      '490,000',
      '486,700'
    ],
    correctAnswer: '487,000',
    explanation: 'The digit in thousands place is 6. The digit to its right is 7. Since 7 >= 5, we round up by adding 1 to 6 (becoming 7) and replacing the remaining digits with zeros: 487,000.',
    socraticHint: 'Look at the hundreds digit (7): is it 5 or greater?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-014',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Round off 742,890 to the nearest ten thousand.',
    text: 'Round off 742,890 to the nearest ten thousand.',
    options: [
      '740,000',
      '750,000',
      '700,000',
      '743,000'
    ],
    correctAnswer: '740,000',
    explanation: 'The digit in ten thousands place is 4. The digit to its right is 2. Since 2 < 5, we round down: 4 remains unchanged, and digits to the right become zeros: 740,000.',
    socraticHint: 'Look at the digit in the thousands place (2): is it less than 5?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-015',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Round off 854,912 to the nearest hundred thousand.',
    text: 'Round off 854,912 to the nearest hundred thousand.',
    options: [
      '900,000',
      '800,000',
      '850,000',
      '1,000,000'
    ],
    correctAnswer: '900,000',
    explanation: 'The digit in hundred thousands place is 8. The digit to its right is 5. Since 5 >= 5, round up: 8 becomes 9, followed by five zeros: 900,000.',
    socraticHint: 'The ten thousands digit is 5. Does 5 cause the hundred thousands digit to round up or down?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-016',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What Hindu-Arabic number is represented by the Roman numeral DCLXXIV?',
    text: 'What Hindu-Arabic number is represented by the Roman numeral DCLXXIV?',
    options: [
      '674',
      '574',
      '724',
      '664'
    ],
    correctAnswer: '674',
    explanation: 'D = 500, C = 100, L = 50, X = 10, X = 10, IV = 4. Total: 500 + 100 + 50 + 10 + 10 + 4 = 674.',
    socraticHint: 'Break it into parts: DC (600) + LXX (70) + IV (4).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-017',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Write 946 in Roman numerals.',
    text: 'Write 946 in Roman numerals.',
    options: [
      'CMXLVI',
      'DCCCCXLVI',
      'MCXLVI',
      'CMXLIV'
    ],
    correctAnswer: 'CMXLVI',
    explanation: '900 = CM (1,000 - 100), 40 = XL (50 - 10), 6 = VI (5 + 1). Combining gives CMXLVI.',
    socraticHint: '900 is represented as 100 subtracted from 1,000 (CM), and 40 is 10 subtracted from 50 (XL).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-018',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What Roman numeral represents the number 1,000?',
    text: 'What Roman numeral represents the number 1,000?',
    options: [
      'M',
      'D',
      'C',
      'L'
    ],
    correctAnswer: 'M',
    explanation: 'The Roman numeral for 1,000 is M (from the Latin word "mille", meaning thousand).',
    socraticHint: 'Which letter stands for thousand in the metric system (like millimetre) and Roman numerals?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-019',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate the Roman numeral expression: CDL + CCL. Express the result in Roman numerals.',
    text: 'Evaluate the Roman numeral expression: CDL + CCL. Express the result in Roman numerals.',
    options: [
      'DCC',
      'DC',
      'DCCC',
      'CDLCCL'
    ],
    correctAnswer: 'DCC',
    explanation: 'CDL = 450. CCL = 250. 450 + 250 = 700. 700 in Roman numerals is DCC (500 + 100 + 100).',
    socraticHint: 'Convert CDL (450) and CCL (250) to numbers, add them, then convert 700 back to Roman numerals.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-020',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A historical monument in Mombasa bears the inscription MDCCCLXXXVIII. What year does this represent?',
    text: 'A historical monument in Mombasa bears the inscription MDCCCLXXXVIII. What year does this represent?',
    options: [
      '1888',
      '1788',
      '1988',
      '1878'
    ],
    correctAnswer: '1888',
    explanation: 'M = 1,000; DCCC = 800; LXXX = 80; VIII = 8. Total = 1,000 + 800 + 80 + 8 = 1888.',
    socraticHint: 'Add M (1,000) + DCCC (800) + LXXX (80) + VIII (8).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-021',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The population of an urban ward was 89,504. When rounded to the nearest thousand, what is the estimated population?',
    text: 'The population of an urban ward was 89,504. When rounded to the nearest thousand, what is the estimated population?',
    options: [
      '90,000',
      '89,000',
      '89,500',
      '100,000'
    ],
    correctAnswer: '90,000',
    explanation: 'The thousands digit is 9. The hundreds digit is 5. Since 5 >= 5, round up: 89 thousands + 1 thousand = 90 thousands (90,000).',
    socraticHint: 'Adding 1 thousand to 89 thousands gives how many thousands?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-022',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following Roman numerals is INVALID according to standard Roman numeral rules?',
    text: 'Which of the following Roman numerals is INVALID according to standard Roman numeral rules?',
    options: [
      'VX',
      'IV',
      'IX',
      'XL'
    ],
    correctAnswer: 'VX',
    explanation: 'In Roman numeral subtraction, V (5), L (50), and D (500) are never subtracted or placed before a larger numeral. Only I, X, and C can be used as subtractive prefixes. VX is invalid (5 is simply V).',
    socraticHint: 'Which symbol representing 5 cannot be placed before a larger numeral to subtract?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-023',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the value of CMXCIX in Hindu-Arabic numerals?',
    text: 'What is the value of CMXCIX in Hindu-Arabic numerals?',
    options: [
      '999',
      '1,099',
      '899',
      '919'
    ],
    correctAnswer: '999',
    explanation: 'CM = 900 (1,000 - 100), XC = 90 (100 - 10), IX = 9 (10 - 1). 900 + 90 + 9 = 999.',
    socraticHint: 'Combine 900 (CM), 90 (XC), and 9 (IX).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },
  {
    id: 'q-g6-math-u1-024',
    subStrandId: 'substrand-g6-math-u1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'During an election, candidate A got 348,675 votes and candidate B got 348,215 votes. When rounded to the nearest thousand, what are their respective rounded votes?',
    text: 'During an election, candidate A got 348,675 votes and candidate B got 348,215 votes. When rounded to the nearest thousand, what are their respective rounded votes?',
    options: [
      'Candidate A: 349,000; Candidate B: 348,000',
      'Candidate A: 348,000; Candidate B: 348,000',
      'Candidate A: 350,000; Candidate B: 350,000',
      'Candidate A: 349,000; Candidate B: 349,000'
    ],
    correctAnswer: 'Candidate A: 349,000; Candidate B: 348,000',
    explanation: 'For Candidate A (348,675): hundreds digit is 6 (>= 5), so rounds up to 349,000. For Candidate B (348,215): hundreds digit is 2 (< 5), so rounds down to 348,000.',
    socraticHint: 'Candidate A has hundreds digit 6 (rounds up), Candidate B has hundreds digit 2 (rounds down).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U1'
  },

  // --- Unit 2: Mission 1 (q-g6-math-u2-001 to 012) ---
  {
    id: 'q-g6-math-u2-001',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Find the sum: 485,736 + 276,485.',
    text: 'Find the sum: 485,736 + 276,485.',
    options: [
      '762,221',
      '761,221',
      '752,221',
      '762,121'
    ],
    correctAnswer: '762,221',
    explanation: '485,736 + 276,485: 6+5=11 (1, carry 1); 1+3+8=12 (2, carry 1); 1+7+4=12 (2, carry 1); 1+5+6=12 (2, carry 1); 1+8+7=16 (6, carry 1); 1+4+2=7. Total = 762,221.',
    socraticHint: 'Add column by column starting from the ones place, carrying over when a sum reaches 10 or more.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-002',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Subtract: 800,000 - 347,625.',
    text: 'Subtract: 800,000 - 347,625.',
    options: [
      '452,375',
      '453,375',
      '552,375',
      '462,375'
    ],
    correctAnswer: '452,375',
    explanation: 'Regrouping across zeros: 800,000 - 347,625 = 452,375. Check: 452,375 + 347,625 = 800,000.',
    socraticHint: 'Regroup 1 from 800,000 so the top number becomes 799,990 + 10.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-003',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A national school feeding program distributed 1,245 bags of maize to 36 sub-counties. If each bag contained 90 kg, what was the total weight of maize distributed?',
    text: 'A national school feeding program distributed 1,245 bags of maize to 36 sub-counties. If each bag contained 90 kg, what was the total weight of maize distributed?',
    options: [
      '112,050 kg',
      '111,050 kg',
      '124,500 kg',
      '112,500 kg'
    ],
    correctAnswer: '112,050 kg',
    explanation: 'Multiply total bags by mass per bag: 1,245 x 90 kg = 112,050 kg.',
    socraticHint: 'Multiply 1,245 by 9, then append a zero at the end.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-004',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Multiply: 3,428 x 245.',
    text: 'Multiply: 3,428 x 245.',
    options: [
      '839,860',
      '838,860',
      '829,860',
      '849,860'
    ],
    correctAnswer: '839,860',
    explanation: '3,428 x 5 = 17,140; 3,428 x 40 = 137,120; 3,428 x 200 = 685,600. Sum = 17,140 + 137,120 + 685,600 = 839,860.',
    socraticHint: 'Calculate the three partial products: 3,428 x 5, 3,428 x 40, and 3,428 x 200, then add them.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-005',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Divide: 78,540 / 35.',
    text: 'Divide: 78,540 / 35.',
    options: [
      '2,244',
      '2,240',
      '2,144',
      '2,344'
    ],
    correctAnswer: '2,244',
    explanation: '78 / 35 = 2 rem 8; 85 / 35 = 2 rem 15; 154 / 35 = 4 rem 14; 140 / 35 = 4 rem 0. Quotient = 2,244.',
    socraticHint: '35 goes into 78 twice (70), leaving 8. Bring down 5: 35 goes into 85 twice (70), leaving 15.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-006',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cooperative dairy processed 156,240 litres of milk. The milk was packed into crates of 24 packets each, with each packet containing 1 litre. How many crates were packed?',
    text: 'A cooperative dairy processed 156,240 litres of milk. The milk was packed into crates of 24 packets each, with each packet containing 1 litre. How many crates were packed?',
    options: [
      '6,510 crates',
      '6,500 crates',
      '6,410 crates',
      '7,510 crates'
    ],
    correctAnswer: '6,510 crates',
    explanation: 'Total crates = 156,240 / 24: 156 / 24 = 6 rem 12; 122 / 24 = 5 rem 2; 24 / 24 = 1; 0 / 24 = 0. Quotient = 6,510 crates.',
    socraticHint: 'Divide 156,240 by 24 using long division.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-007',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a division problem, the divisor is 48, the quotient is 325, and the remainder is 17. What is the dividend?',
    text: 'In a division problem, the divisor is 48, the quotient is 325, and the remainder is 17. What is the dividend?',
    options: [
      '15,617',
      '15,600',
      '15,583',
      '15,634'
    ],
    correctAnswer: '15,617',
    explanation: 'Dividend = (Divisor x Quotient) + Remainder = (48 x 325) + 17 = 15,600 + 17 = 15,617.',
    socraticHint: 'Remember the division relationship: Dividend = (Divisor x Quotient) + Remainder.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-008',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three counties received tree seedlings from the Ministry of Forestry: County X got 345,600; County Y got 289,750; and County Z got 198,420. What was the total number of seedlings received?',
    text: 'Three counties received tree seedlings from the Ministry of Forestry: County X got 345,600; County Y got 289,750; and County Z got 198,420. What was the total number of seedlings received?',
    options: [
      '833,770 seedlings',
      '834,770 seedlings',
      '823,770 seedlings',
      '843,770 seedlings'
    ],
    correctAnswer: '833,770 seedlings',
    explanation: '345,600 + 289,750 + 198,420: 345,600 + 289,750 = 635,350; 635,350 + 198,420 = 833,770 seedlings.',
    socraticHint: 'Add the three six-digit numbers by aligning them in column format.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-009',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What must be added to 678,450 to make 1,000,000?',
    text: 'What must be added to 678,450 to make 1,000,000?',
    options: [
      '321,550',
      '322,550',
      '421,550',
      '311,550'
    ],
    correctAnswer: '321,550',
    explanation: '1,000,000 - 678,450 = 321,550.',
    socraticHint: 'Subtract 678,450 from 1,000,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-010',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A bookstore ordered 450 cartons of exercise books. Each carton contained 144 books. How many exercise books were ordered in total?',
    text: 'A bookstore ordered 450 cartons of exercise books. Each carton contained 144 books. How many exercise books were ordered in total?',
    options: [
      '64,800 books',
      '64,400 books',
      '65,800 books',
      '54,800 books'
    ],
    correctAnswer: '64,800 books',
    explanation: '450 x 144: 45 x 144 = 6,480; multiplying by 10 gives 64,800 books.',
    socraticHint: 'Multiply 144 by 45, then add a zero.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-011',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Divide 98,304 by 64.',
    text: 'Divide 98,304 by 64.',
    options: [
      '1,536',
      '1,526',
      '1,436',
      '1,636'
    ],
    correctAnswer: '1,536',
    explanation: '98 / 64 = 1 rem 34; 343 / 64 = 5 (320) rem 23; 230 / 64 = 3 (192) rem 38; 384 / 64 = 6 (384) rem 0. Quotient = 1,536.',
    socraticHint: '64 into 98 is 1. Remainder is 34. Bring down 3: 64 into 343 is 5 (320). Continue the steps.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-012',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The total revenue from selling 250 identical laptop computers to a secondary school was KES 7,875,000. What was the cost of each laptop?',
    text: 'The total revenue from selling 250 identical laptop computers to a secondary school was KES 7,875,000. What was the cost of each laptop?',
    options: [
      'KES 31,500',
      'KES 31,000',
      'KES 32,500',
      'KES 30,500'
    ],
    correctAnswer: 'KES 31,500',
    explanation: '7,875,000 / 250: Cancel one zero = 787,500 / 25 = 31,500. Each laptop cost KES 31,500.',
    socraticHint: 'Divide 7,875,000 by 250 (or 787,500 by 25).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },

  // --- Unit 2: Mission 2 (q-g6-math-u2-013 to 024) ---
  {
    id: 'q-g6-math-u2-013',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'According to the BODMAS rule, which operation must be executed FIRST in the expression: 18 + 6 x (14 - 9) / 3?',
    text: 'According to the BODMAS rule, which operation must be executed FIRST in the expression: 18 + 6 x (14 - 9) / 3?',
    options: [
      'The subtraction inside the Brackets: (14 - 9)',
      'The addition: 18 + 6',
      'The division: / 3',
      'The multiplication: 6 x 14'
    ],
    correctAnswer: 'The subtraction inside the Brackets: (14 - 9)',
    explanation: 'B in BODMAS stands for Brackets. Operations inside brackets must always be evaluated first before any other operation.',
    socraticHint: 'Which letter comes first in the BODMAS acronym?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-014',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 36 + 24 / 6 - 2 x 3.',
    text: 'Evaluate: 36 + 24 / 6 - 2 x 3.',
    options: [
      '34',
      '24',
      '4',
      '18'
    ],
    correctAnswer: '34',
    explanation: 'By BODMAS: Division first: 24 / 6 = 4. Multiplication: 2 x 3 = 6. Expression becomes: 36 + 4 - 6 = 40 - 6 = 34.',
    socraticHint: 'Perform division (24/6) and multiplication (2x3) before adding and subtracting.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-015',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 48 - (15 + 9) / 4 + 7.',
    text: 'Evaluate: 48 - (15 + 9) / 4 + 7.',
    options: [
      '49',
      '13',
      '43',
      '55'
    ],
    correctAnswer: '49',
    explanation: 'Brackets first: 15 + 9 = 24. Division: 24 / 4 = 6. Expression: 48 - 6 + 7 = 42 + 7 = 49.',
    socraticHint: 'First solve (15 + 9), then divide the result by 4, then evaluate 48 - 6 + 7 from left to right.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-016',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 50 + 2/5 of 100 - 15 x 2.',
    text: 'Evaluate: 50 + 2/5 of 100 - 15 x 2.',
    options: [
      '60',
      '50',
      '70',
      '40'
    ],
    correctAnswer: '60',
    explanation: 'Evaluate "Of": 2/5 of 100 = (2 x 100) / 5 = 40. Multiplication: 15 x 2 = 30. Expression: 50 + 40 - 30 = 90 - 30 = 60.',
    socraticHint: 'Calculate "2/5 of 100" first, then "15 x 2", then complete addition and subtraction.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-017',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 120 / (4 + 2 x 4) + 15.',
    text: 'Evaluate: 120 / (4 + 2 x 4) + 15.',
    options: [
      '25',
      '15',
      '35',
      '20'
    ],
    correctAnswer: '25',
    explanation: 'Inside the bracket: multiplication first, 2 x 4 = 8; then addition, 4 + 8 = 12. Bracket = 12. Then division: 120 / 12 = 10. Finally addition: 10 + 15 = 25.',
    socraticHint: 'Inside the bracket (4 + 2 x 4), do multiplication first (2 x 4 = 8), then add 4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-018',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which pair of brackets placed in the expression 8 + 12 / 4 - 2 makes the value equal to 3?',
    text: 'Which pair of brackets placed in the expression 8 + 12 / 4 - 2 makes the value equal to 3?',
    options: [
      '(8 + 12) / (4 - 2)',
      '(8 + 12) / 4 - 2',
      '8 + (12 / 4) - 2',
      '8 + 12 / (4 - 2)'
    ],
    correctAnswer: '(8 + 12) / 4 - 2',
    explanation: 'Testing (8 + 12) / 4 - 2: (8 + 12) = 20; 20 / 4 = 5; 5 - 2 = 3. This matches 3!',
    socraticHint: 'Test each bracket option: (8 + 12) = 20; 20 / 4 = 5; 5 - 2 = ?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-019',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 75 - 3 x 4 + 18 / 2.',
    text: 'Evaluate: 75 - 3 x 4 + 18 / 2.',
    options: [
      '72',
      '153',
      '60',
      '81'
    ],
    correctAnswer: '72',
    explanation: 'Multiplication: 3 x 4 = 12. Division: 18 / 2 = 9. Expression: 75 - 12 + 9 = 63 + 9 = 72.',
    socraticHint: 'Calculate 3 x 4 = 12 and 18 / 2 = 9 first, then evaluate 75 - 12 + 9.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-020',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 1/4 of (32 + 16) - 15 / 5.',
    text: 'Evaluate: 1/4 of (32 + 16) - 15 / 5.',
    options: [
      '9',
      '12',
      '7',
      '15'
    ],
    correctAnswer: '9',
    explanation: 'Brackets first: 32 + 16 = 48. "Of": 1/4 of 48 = 12. Division: 15 / 5 = 3. Subtraction: 12 - 3 = 9.',
    socraticHint: 'First solve the bracket (32 + 16 = 48), then find 1/4 of 48, then subtract 15/5.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-021',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A farmer had 240 cows. He sold 1/3 of the cows and then bought 45 more cows. How many cows does he have now?',
    text: 'A farmer had 240 cows. He sold 1/3 of the cows and then bought 45 more cows. How many cows does he have now?',
    options: [
      '205 cows',
      '125 cows',
      '160 cows',
      '215 cows'
    ],
    correctAnswer: '205 cows',
    explanation: 'Cows sold = 1/3 of 240 = 80. Remaining cows = 240 - 80 = 160. Bought 45 more: 160 + 45 = 205 cows. (Expression: 240 - (1/3 of 240) + 45 = 205).',
    socraticHint: 'Find 1/3 of 240 (80), subtract it from 240, then add 45.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-022',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 100 - [40 + 5 x (6 - 2)].',
    text: 'Evaluate: 100 - [40 + 5 x (6 - 2)].',
    options: [
      '40',
      '60',
      '20',
      '80'
    ],
    correctAnswer: '40',
    explanation: 'Innermost bracket: 6 - 2 = 4. Multiplication: 5 x 4 = 20. Outer bracket: 40 + 20 = 60. Final subtraction: 100 - 60 = 40.',
    socraticHint: 'Solve from the innermost brackets outward: (6 - 2 = 4), then 5 x 4 = 20, then 40 + 20 = 60.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-023',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Evaluate: 64 / 8 x 2 + 10 - 4.',
    text: 'Evaluate: 64 / 8 x 2 + 10 - 4.',
    options: [
      '22',
      '10',
      '18',
      '14'
    ],
    correctAnswer: '22',
    explanation: 'Division and multiplication from left to right: 64 / 8 = 8; 8 x 2 = 16. Addition and subtraction from left to right: 16 + 10 = 26; 26 - 4 = 22.',
    socraticHint: 'Work from left to right for equal priority operations: 64 / 8 = 8, then 8 x 2 = 16.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
  },
  {
    id: 'q-g6-math-u2-024',
    subStrandId: 'substrand-g6-math-u2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A trader bought 12 bags of potatoes at KES 2,500 each and 8 bags of onions at KES 1,800 each. He paid with KES 50,000. How much change did he receive? Expression: 50,000 - (12 x 2,500 + 8 x 1,800).',
    text: 'A trader bought 12 bags of potatoes at KES 2,500 each and 8 bags of onions at KES 1,800 each. He paid with KES 50,000. How much change did he receive? Expression: 50,000 - (12 x 2,500 + 8 x 1,800).',
    options: [
      'KES 5,600',
      'KES 4,600',
      'KES 6,600',
      'KES 44,400'
    ],
    correctAnswer: 'KES 5,600',
    explanation: 'Potatoes cost: 12 x 2,500 = 30,000. Onions cost: 8 x 1,800 = 14,400. Total spent: 30,000 + 14,400 = 44,400. Change: 50,000 - 44,400 = KES 5,600.',
    socraticHint: 'Calculate the total cost of potatoes and onions inside the brackets first, then subtract from 50,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U2'
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
console.log('Batch 1 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
