import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Mathematics Batch 5 (Units 9 & 10) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u9',
    strandId: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    title: 'Financial Literacy, Bills, Profit & Loss, Simple Interest & Postal Rates',
    description: 'Preparing and auditing bills and invoices; calculating profit, loss, discount, percentage profit/loss; calculating simple interest (I = PRT/100), hire purchase terms, commission, and postal/parcel rates.',
    cbeCompetency: 'Financial literacy, consumer arithmetic, commercial budget calculation, and entrepreneurial problem solving',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g6-math-u10',
    strandId: 'strand-g6-math-geometry',
    learningAreaId: 'la-math-g6',
    title: 'Angles, Parallel Lines, Transversals & Polygons',
    description: 'Classifying complementary, supplementary, vertically opposite, alternate, corresponding, and co-interior angles formed by transversals on parallel lines; calculating interior and exterior angles of polygons (triangles up to decagons); and applying geometric theorems.',
    cbeCompetency: 'Geometric reasoning, deductive spatial logic, angle measurement fluency, and polygon structural analysis',
    estimatedMinutes: 30,
    order: 10
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 5 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-math-u9-l1',
    subStrandId: 'substrand-g6-math-u9',
    title: 'Commercial Arithmetic: Bills, Invoices, Profit & Loss Percentages',
    content: 'Consumer arithmetic deals with day-to-day business transactions, trading margins, and accounting calculations.\n\n1. Invoices & Bills:\n- Total Amount = Sum of (Quantity x Unit Price) for each item.\n- Change / Balance = Cash Tendered - Total Bill.\n\n2. Profit and Loss:\n- Profit = Selling Price (SP) - Buying Price (BP), when SP > BP.\n- Loss = Buying Price (BP) - Selling Price (SP), when BP > SP.\n- Percentage Profit = (Profit / BP) x 100%.\n- Percentage Loss = (Loss / BP) x 100%.\n\n3. Discount:\n- Discount = Marked Price (MP) - Cash Selling Price.\n- Percentage Discount = (Discount / MP) x 100%.',
    didYouKnow: 'Profit and loss percentages are ALWAYS calculated based on the original Buying Price (cost price), never on the selling price!',
    kenyanContext: 'At Baraka Agrovet in Nakuru, farmers purchase fertilizers, pesticides, and certified seeds using itemised receipts. Ensuring accurate balance and discount verification is an essential life skill.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u9-l2',
    subStrandId: 'substrand-g6-math-u9',
    title: 'Simple Interest (I = PRT/100), Discount & Postal Rates',
    content: '1. Simple Interest (I):\n- Principal (P): Money borrowed or invested.\n- Rate (R): Annual interest percentage rate per annum (p.a.).\n- Time (T): Duration in years (if in months, T = months / 12).\n- Formula: I = (P x R x T) / 100.\n- Total Amount (A) = Principal (P) + Interest (I).\n\n2. Postal & Courier Rates:\n- Progressive step tariff: Base charge for initial mass band + fixed step charge for each additional unit of mass or part thereof.\n\n3. Hire Purchase & Commission:\n- Hire Purchase Total = Cash Deposit + (Number of Months x Monthly Installment).\n- Carrying charge / Hire Purchase extra = Hire Purchase Total - Cash Price.\n- Commission = Commission Rate x Value of Goods Sold.',
    didYouKnow: 'Kenyan SACCOs (Savings and Credit Cooperative Organizations) empower millions of teachers and farmers by providing loans with fair simple interest rates!',
    kenyanContext: 'A farmer in Nyeri borrowed KES 50,000 from a local tea SACCO at 10% per annum simple interest for 2 years to purchase a chaff cutter, repaying a total of KES 60,000.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u10-l1',
    subStrandId: 'substrand-g6-math-u10',
    title: 'Angle Properties: Complementary, Supplementary, Vertically Opposite & Transversals',
    content: 'Angle relationships help determine unknown angles without measurement instruments.\n\n1. Fundamental Angle Relationships:\n- Complementary angles sum to 90 degrees.\n- Supplementary angles sum to 180 degrees (angles on a straight line).\n- Angles at a point sum to 360 degrees.\n- Vertically opposite angles formed by intersecting lines are equal.\n\n2. Parallel Lines & Transversals:\n- Alternate Interior Angles (Z-angles): equal (e.g. angle a = angle b).\n- Corresponding Angles (F-angles): equal in identical relative positions.\n- Co-interior Angles (C-angles): interior angles on the same side add up to 180 degrees.\n\n3. Triangle Theorems:\n- Interior angles sum to 180 degrees.\n- Exterior angle of a triangle equals the sum of the two opposite interior angles.',
    didYouKnow: 'Civil engineers designing railway tracks for the SGR use the transversal angle theorems to guarantee that parallel rails remain exactly equidistant along curves and junctions!',
    kenyanContext: 'Kenyan carpenters building timber roof trusses use alternate and corresponding angle rules to ensure rafters sit firmly and stably on wall plates.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u10-l2',
    subStrandId: 'substrand-g6-math-u10',
    title: 'Interior and Exterior Angles of Polygons (Triangles to Octagons)',
    content: 'A polygon is a closed two-dimensional plane figure made of straight line segments.\n\n1. Interior Angles of Polygons:\n- Sum of interior angles = (n - 2) x 180 degrees, where n is the number of sides.\n- Triangle (n = 3): (3 - 2) x 180 = 180 degrees.\n- Quadrilateral (n = 4): (4 - 2) x 180 = 360 degrees.\n- Pentagon (n = 5): (5 - 2) x 180 = 540 degrees.\n- Hexagon (n = 6): (6 - 2) x 180 = 720 degrees.\n- Octagon (n = 8): (8 - 2) x 180 = 1,080 degrees.\n\n2. Regular Polygons:\n- A regular polygon has all sides equal and all angles equal.\n- Each interior angle = [(n - 2) x 180] / n.\n- For a regular pentagon: 540 / 5 = 108 degrees.\n- For a regular hexagon: 720 / 6 = 120 degrees.\n- For a regular octagon: 1,080 / 8 = 135 degrees.\n\n3. Exterior Angles:\n- The sum of exterior angles of ANY convex polygon is ALWAYS 360 degrees!\n- Each exterior angle of a regular polygon = 360 / n.\n- Interior angle + Exterior angle = 180 degrees.',
    didYouKnow: 'The sum of the exterior angles of ANY convex polygon is ALWAYS 360 degrees, whether it has 3 sides, 8 sides, or 100 sides!',
    kenyanContext: 'Architects designing the hexagonal pavers commonly used in Nairobi pedestrian walkways take advantage of the 120-degree interior angles of regular hexagons to tile surfaces seamlessly without gaps.',
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

// 3. Batch 5 Missions (4 missions: orders 77 to 80 in world-math-kingdom)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u9-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u9',
    lessonId: 'lesson-g6-math-u9-l1',
    title: 'Agrovet Invoice & Commercial Auditor Quest',
    description: 'Audit shopping invoices, calculate cash balance, evaluate percentage profit and loss margins, and determine cash discount savings!',
    order: 77,
    orderIndex: 77,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-commercial-auditor',
    badge: { name: 'Commercial Auditor', icon: 'file-text' },
    questionIds: [
      'q-g6-math-u9-001', 'q-g6-math-u9-002', 'q-g6-math-u9-003', 'q-g6-math-u9-004',
      'q-g6-math-u9-005', 'q-g6-math-u9-006', 'q-g6-math-u9-007', 'q-g6-math-u9-008',
      'q-g6-math-u9-009', 'q-g6-math-u9-010', 'q-g6-math-u9-011', 'q-g6-math-u9-012'
    ]
  },
  {
    id: 'mission-g6-math-u9-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u9',
    lessonId: 'lesson-g6-math-u9-l2',
    title: 'SACCO Banker & Posta Kenya Quest',
    description: 'Compute simple interest and repayment totals, calculate parcel postage tariffs, evaluate agent commissions, and solve hire purchase terms!',
    order: 78,
    orderIndex: 78,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-sacco-banker',
    badge: { name: 'SACCO Banker', icon: 'dollar-sign' },
    questionIds: [
      'q-g6-math-u9-013', 'q-g6-math-u9-014', 'q-g6-math-u9-015', 'q-g6-math-u9-016',
      'q-g6-math-u9-017', 'q-g6-math-u9-018', 'q-g6-math-u9-019', 'q-g6-math-u9-020',
      'q-g6-math-u9-021', 'q-g6-math-u9-022', 'q-g6-math-u9-023', 'q-g6-math-u9-024'
    ]
  },
  {
    id: 'mission-g6-math-u10-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u10',
    lessonId: 'lesson-g6-math-u10-l1',
    title: 'Parallel Lines & Transversal Navigator Quest',
    description: 'Master complementary, supplementary, and vertically opposite angles, navigate alternate and corresponding lines, and solve triangle exterior angles!',
    order: 79,
    orderIndex: 79,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-transversal-navigator',
    badge: { name: 'Transversal Navigator', icon: 'compass' },
    questionIds: [
      'q-g6-math-u10-001', 'q-g6-math-u10-002', 'q-g6-math-u10-003', 'q-g6-math-u10-004',
      'q-g6-math-u10-005', 'q-g6-math-u10-006', 'q-g6-math-u10-007', 'q-g6-math-u10-008',
      'q-g6-math-u10-009', 'q-g6-math-u10-010', 'q-g6-math-u10-011', 'q-g6-math-u10-012'
    ]
  },
  {
    id: 'mission-g6-math-u10-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u10',
    lessonId: 'lesson-g6-math-u10-l2',
    title: 'Polygon Architect & Angle Master Quest',
    description: 'Calculate sum of interior angles using (n-2)x180, determine each interior and exterior angle of regular polygons, and solve missing polygon angles!',
    order: 80,
    orderIndex: 80,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-polygon-architect',
    badge: { name: 'Polygon Architect', icon: 'hexagon' },
    questionIds: [
      'q-g6-math-u10-013', 'q-g6-math-u10-014', 'q-g6-math-u10-015', 'q-g6-math-u10-016',
      'q-g6-math-u10-017', 'q-g6-math-u10-018', 'q-g6-math-u10-019', 'q-g6-math-u10-020',
      'q-g6-math-u10-021', 'q-g6-math-u10-022', 'q-g6-math-u10-023', 'q-g6-math-u10-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 5 Questions (48 questions: 24 for Unit 9, 24 for Unit 10)
const questionsToAdd = [
  // --- Unit 9: Mission 1 (q-g6-math-u9-001 to 012) ---
  {
    id: 'q-g6-math-u9-001',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'At Baraka Agrovet in Nakuru, a farmer buys 3 bags of fertilizer at KES 2,500 each, 2 bottles of pesticide at KES 850 each, and 5 packets of maize seeds at KES 420 each. What is the total bill?',
    text: 'At Baraka Agrovet in Nakuru, a farmer buys 3 bags of fertilizer at KES 2,500 each, 2 bottles of pesticide at KES 850 each, and 5 packets of maize seeds at KES 420 each. What is the total bill?',
    options: [
      'KES 11,300',
      'KES 10,800',
      'KES 12,300',
      'KES 9,600'
    ],
    correctAnswer: 'KES 11,300',
    explanation: 'Fertilizer = 3 x 2,500 = KES 7,500. Pesticide = 2 x 850 = KES 1,700. Seeds = 5 x 420 = KES 2,100. Total = 7,500 + 1,700 + 2,100 = KES 11,300.',
    socraticHint: 'Calculate the cost for each item group first, then sum them together.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-002',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wanjiru paid with two KES 1,000 notes for household groceries worth KES 1,640. How much change did she receive?',
    text: 'Wanjiru paid with two KES 1,000 notes for household groceries worth KES 1,640. How much change did she receive?',
    options: [
      'KES 360',
      'KES 460',
      'KES 340',
      'KES 260'
    ],
    correctAnswer: 'KES 360',
    explanation: 'Total cash tendered = 2 x 1,000 = KES 2,000. Change = 2,000 - 1,640 = KES 360.',
    socraticHint: 'Total cash tendered is 2 x 1,000 = 2,000. Subtract the bill total of 1,640.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-003',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A school canteen in Kisumu bought 24 crates of milk for KES 28,800. What was the purchase price per crate?',
    text: 'A school canteen in Kisumu bought 24 crates of milk for KES 28,800. What was the purchase price per crate?',
    options: [
      'KES 1,200',
      'KES 1,400',
      'KES 1,150',
      'KES 1,050'
    ],
    correctAnswer: 'KES 1,200',
    explanation: 'Unit price = Total cost / Number of crates = 28,800 / 24 = KES 1,200.',
    socraticHint: 'Divide the total invoice cost by the number of crates: 28,800 / 24.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-004',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An electronics trader in Luthuli Avenue, Nairobi bought a radio for KES 3,200 and later sold it for KES 4,100. How much profit did he make?',
    text: 'An electronics trader in Luthuli Avenue, Nairobi bought a radio for KES 3,200 and later sold it for KES 4,100. How much profit did he make?',
    options: [
      'KES 900',
      'KES 800',
      'KES 1,100',
      'KES 7,300'
    ],
    correctAnswer: 'KES 900',
    explanation: 'Profit = Selling Price - Buying Price = 4,100 - 3,200 = KES 900.',
    socraticHint: 'Profit = Selling Price - Buying Price. Subtract 3,200 from 4,100.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-005',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A fruit vendor bought a crate of mangoes for KES 1,200 and sold it for KES 1,500. What was her percentage profit?',
    text: 'A fruit vendor bought a crate of mangoes for KES 1,200 and sold it for KES 1,500. What was her percentage profit?',
    options: [
      '25%',
      '20%',
      '30%',
      '15%'
    ],
    correctAnswer: '25%',
    explanation: 'Profit = 1,500 - 1,200 = KES 300. Percentage profit = (Profit / Buying Price) x 100% = (300 / 1,200) x 100% = 25%.',
    socraticHint: 'Find the profit (300), divide by the original buying price (1,200), and multiply by 100%.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-006',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A dairy farmer bought a dairy cow for KES 45,000. Due to drought, he was forced to sell it for KES 38,500. What was his loss?',
    text: 'A dairy farmer bought a dairy cow for KES 45,000. Due to drought, he was forced to sell it for KES 38,500. What was his loss?',
    options: [
      'KES 6,500',
      'KES 7,500',
      'KES 5,500',
      'KES 6,000'
    ],
    correctAnswer: 'KES 6,500',
    explanation: 'Loss = Buying Price - Selling Price = 45,000 - 38,500 = KES 6,500.',
    socraticHint: 'Loss = Buying Price - Selling Price. Subtract 38,500 from 45,000.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-007',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A boutique owner bought a jacket for KES 2,500 and sold it at a clearance price of KES 2,000. What was the percentage loss?',
    text: 'A boutique owner bought a jacket for KES 2,500 and sold it at a clearance price of KES 2,000. What was the percentage loss?',
    options: [
      '20%',
      '25%',
      '15%',
      '10%'
    ],
    correctAnswer: '20%',
    explanation: 'Loss = 2,500 - 2,000 = KES 500. Percentage loss = (500 / 2,500) x 100% = 20%.',
    socraticHint: 'Percentage loss is (Loss / Cost Price) x 100%. What is (500 / 2,500) x 100%?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-008',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An artisan in Machakos makes wood carvings at a production cost of KES 800 each. To make a 30% profit, at what price should he sell each carving?',
    text: 'An artisan in Machakos makes wood carvings at a production cost of KES 800 each. To make a 30% profit, at what price should he sell each carving?',
    options: [
      'KES 1,040',
      'KES 1,120',
      'KES 1,000',
      'KES 960'
    ],
    correctAnswer: 'KES 1,040',
    explanation: 'Profit = 30% of 800 = (30/100) x 800 = KES 240. Selling price = 800 + 240 = KES 1,040.',
    socraticHint: 'Calculate 30% of 800 (240), then add it to the cost price.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-009',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A motorcycle dealer sold a safety helmet for KES 2,760, making a profit of 15%. What was the original cost price of the helmet?',
    text: 'A motorcycle dealer sold a safety helmet for KES 2,760, making a profit of 15%. What was the original cost price of the helmet?',
    options: [
      'KES 2,400',
      'KES 2,346',
      'KES 2,500',
      'KES 2,200'
    ],
    correctAnswer: 'KES 2,400',
    explanation: 'Selling price = 100% + 15% = 115% of cost price. Cost price = (2,760 / 115) x 100 = 24 x 100 = KES 2,400.',
    socraticHint: 'If the selling price is 115% of the cost price, divide 2,760 by 115 and multiply by 100.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-010',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A hardware store in Thika offers a 10% discount on marked prices for cash payments. How much will a customer pay for a wheelbarrow marked at KES 4,500?',
    text: 'A hardware store in Thika offers a 10% discount on marked prices for cash payments. How much will a customer pay for a wheelbarrow marked at KES 4,500?',
    options: [
      'KES 4,050',
      'KES 4,100',
      'KES 3,950',
      'KES 4,000'
    ],
    correctAnswer: 'KES 4,050',
    explanation: 'Discount = 10% of 4,500 = KES 450. Price paid = 4,500 - 450 = KES 4,050.',
    socraticHint: 'Calculate 10% of 4,500 and subtract it from the marked price.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-011',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A pair of school shoes was marked at KES 1,600 and sold on promotion for KES 1,280. What was the percentage discount?',
    text: 'A pair of school shoes was marked at KES 1,600 and sold on promotion for KES 1,280. What was the percentage discount?',
    options: [
      '20%',
      '25%',
      '15%',
      '32%'
    ],
    correctAnswer: '20%',
    explanation: 'Discount = 1,600 - 1,280 = KES 320. Percentage discount = (320 / 1,600) x 100% = 20%.',
    socraticHint: 'Divide the discount amount (320) by the marked price (1,600) and multiply by 100%.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-012',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Otieno bought 2 kg of sugar at KES 160 per kg, 3 loaves of bread at KES 65 each, and 4 packets of tea leaves. If the total bill was KES 795, how much did the 4 packets of tea leaves cost in total?',
    text: 'Otieno bought 2 kg of sugar at KES 160 per kg, 3 loaves of bread at KES 65 each, and 4 packets of tea leaves. If the total bill was KES 795, how much did the 4 packets of tea leaves cost in total?',
    options: [
      'KES 280',
      'KES 215',
      'KES 70',
      'KES 315'
    ],
    correctAnswer: 'KES 280',
    explanation: 'Sugar = 2 x 160 = KES 320. Bread = 3 x 65 = KES 195. Subtotal = 320 + 195 = KES 515. Tea leaves = 795 - 515 = KES 280.',
    socraticHint: 'Add the costs of the sugar and bread (515), then subtract from the total bill of 795.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },

  // --- Unit 9: Mission 2 (q-g6-math-u9-013 to 024) ---
  {
    id: 'q-g6-math-u9-013',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the standard formula used to calculate simple interest (I), where P is principal, R is annual rate percentage, and T is time in years?',
    text: 'What is the standard formula used to calculate simple interest (I), where P is principal, R is annual rate percentage, and T is time in years?',
    options: [
      'I = (P x R x T) / 100',
      'I = (P x R) / T',
      'I = P x R x T x 100',
      'I = P + R + T'
    ],
    correctAnswer: 'I = (P x R x T) / 100',
    explanation: 'Simple interest formula is I = (P x R x T) / 100, where P is the principal sum, R is the rate per annum, and T is time in years.',
    socraticHint: 'Interest is proportional to Principal, Rate, and Time, divided by 100 for the percentage rate.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-014',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Kipchoge deposits KES 20,000 in a SACCO paying simple interest at a rate of 8% per annum. How much interest will he earn in 3 years?',
    text: 'Kipchoge deposits KES 20,000 in a SACCO paying simple interest at a rate of 8% per annum. How much interest will he earn in 3 years?',
    options: [
      'KES 4,800',
      'KES 1,600',
      'KES 24,800',
      'KES 5,600'
    ],
    correctAnswer: 'KES 4,800',
    explanation: 'I = (P x R x T) / 100 = (20,000 x 8 x 3) / 100 = 200 x 24 = KES 4,800.',
    socraticHint: 'Use I = (P x R x T) / 100. What is (20,000 x 8 x 3) / 100?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-015',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Mrs. Mutua borrowed KES 50,000 from a women\'s cooperative bank at 10% per annum simple interest for 2 years. What was the total amount she repaid?',
    text: 'Mrs. Mutua borrowed KES 50,000 from a women\'s cooperative bank at 10% per annum simple interest for 2 years. What was the total amount she repaid?',
    options: [
      'KES 60,000',
      'KES 10,000',
      'KES 55,000',
      'KES 70,000'
    ],
    correctAnswer: 'KES 60,000',
    explanation: 'Interest = (50,000 x 10 x 2) / 100 = KES 10,000. Total amount repaid = Principal + Interest = 50,000 + 10,000 = KES 60,000.',
    socraticHint: 'Total Amount repaid = Principal borrowed + Interest earned. Add the interest to 50,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-016',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A farmer borrowed KES 12,000 at 6% per annum simple interest for 6 months. How much simple interest did he pay?',
    text: 'A farmer borrowed KES 12,000 at 6% per annum simple interest for 6 months. How much simple interest did he pay?',
    options: [
      'KES 360',
      'KES 720',
      'KES 180',
      'KES 4,320'
    ],
    correctAnswer: 'KES 360',
    explanation: 'Time in years = 6 / 12 = 0.5 years. Interest = (12,000 x 6 x 0.5) / 100 = 120 x 3 = KES 360.',
    socraticHint: '6 months is half a year (T = 0.5). Multiply 12,000 x 6 x 0.5 / 100.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-017',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In 2 years, a fixed deposit account earned KES 3,600 in simple interest at a rate of 6% per annum. What was the principal sum deposited?',
    text: 'In 2 years, a fixed deposit account earned KES 3,600 in simple interest at a rate of 6% per annum. What was the principal sum deposited?',
    options: [
      'KES 30,000',
      'KES 36,000',
      'KES 25,000',
      'KES 60,000'
    ],
    correctAnswer: 'KES 30,000',
    explanation: 'P = (I x 100) / (R x T) = (3,600 x 100) / (6 x 2) = 360,000 / 12 = KES 30,000.',
    socraticHint: 'Isolate Principal: P = (I x 100) / (R x T).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-018',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A trader invested KES 40,000 for 3 years and received KES 6,000 as simple interest. What was the annual interest rate?',
    text: 'A trader invested KES 40,000 for 3 years and received KES 6,000 as simple interest. What was the annual interest rate?',
    options: [
      '5%',
      '6%',
      '4.5%',
      '7.5%'
    ],
    correctAnswer: '5%',
    explanation: 'R = (I x 100) / (P x T) = (6,000 x 100) / (40,000 x 3) = 600,000 / 120,000 = 5%.',
    socraticHint: 'Use R = (I x 100) / (P x T).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-019',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many years will it take for KES 25,000 to earn KES 5,000 in simple interest at an annual rate of 5%?',
    text: 'How many years will it take for KES 25,000 to earn KES 5,000 in simple interest at an annual rate of 5%?',
    options: [
      '4 years',
      '5 years',
      '3 years',
      '2.5 years'
    ],
    correctAnswer: '4 years',
    explanation: 'T = (I x 100) / (P x R) = (5,000 x 100) / (25,000 x 5) = 500,000 / 125,000 = 4 years.',
    socraticHint: 'Divide (I x 100) by (P x R): 500,000 / 125,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-020',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Posta Kenya charges KES 50 for a letter up to 50 g, and KES 20 for each additional 50 g or part thereof. How much will it cost to send a letter weighing 120 g?',
    text: 'Posta Kenya charges KES 50 for a letter up to 50 g, and KES 20 for each additional 50 g or part thereof. How much will it cost to send a letter weighing 120 g?',
    options: [
      'KES 90',
      'KES 70',
      'KES 110',
      'KES 80'
    ],
    correctAnswer: 'KES 90',
    explanation: 'First 50 g = KES 50. Additional mass = 120 - 50 = 70 g. 70 g falls into two 50 g steps: 2 x 20 = KES 40. Total postage = 50 + 40 = KES 90.',
    socraticHint: 'The remaining 70 g counts as two additional 50 g steps (or part thereof). What is 50 + 20 + 20?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-021',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Posta Kenya charges KES 250 for a parcel up to 1 kg, and KES 80 for each additional kilogram or part thereof. How much does sending a 3.4 kg parcel cost?',
    text: 'Posta Kenya charges KES 250 for a parcel up to 1 kg, and KES 80 for each additional kilogram or part thereof. How much does sending a 3.4 kg parcel cost?',
    options: [
      'KES 490',
      'KES 410',
      'KES 520',
      'KES 450'
    ],
    correctAnswer: 'KES 490',
    explanation: 'First 1 kg = KES 250. Extra mass = 3.4 - 1 = 2.4 kg, which counts as 3 additional steps. Extra cost = 3 x 80 = KES 240. Total = 250 + 240 = KES 490.',
    socraticHint: '2.4 kg above the base 1 kg counts as 3 full or partial steps. Add 250 + 3 x 80.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-022',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An estate agent in Nairobi helped sell a plot of land for KES 800,000. If her agreed commission rate was 3%, how much commission did she earn?',
    text: 'An estate agent in Nairobi helped sell a plot of land for KES 800,000. If her agreed commission rate was 3%, how much commission did she earn?',
    options: [
      'KES 24,000',
      'KES 2,400',
      'KES 240,000',
      'KES 16,000'
    ],
    correctAnswer: 'KES 24,000',
    explanation: 'Commission = 3% of 800,000 = (3/100) x 800,000 = KES 24,000.',
    socraticHint: 'Multiply 800,000 by 3% (3/100).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-023',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A television set can be bought on hire purchase by paying a cash deposit of KES 5,000 followed by 8 monthly installments of KES 2,200 each. What is the total hire purchase price?',
    text: 'A television set can be bought on hire purchase by paying a cash deposit of KES 5,000 followed by 8 monthly installments of KES 2,200 each. What is the total hire purchase price?',
    options: [
      'KES 22,600',
      'KES 17,600',
      'KES 21,400',
      'KES 24,000'
    ],
    correctAnswer: 'KES 22,600',
    explanation: 'Installments = 8 x 2,200 = KES 17,600. Total hire purchase price = Deposit + Installments = 5,000 + 17,600 = KES 22,600.',
    socraticHint: 'Total Hire Purchase Price = Deposit + Total of all monthly installments.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },
  {
    id: 'q-g6-math-u9-024',
    subStrandId: 'substrand-g6-math-u9',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The cash price of a TV is KES 18,500, but its hire purchase price is KES 22,600. How much more money does a buyer pay by choosing hire purchase instead of cash?',
    text: 'The cash price of a TV is KES 18,500, but its hire purchase price is KES 22,600. How much more money does a buyer pay by choosing hire purchase instead of cash?',
    options: [
      'KES 4,100',
      'KES 3,500',
      'KES 4,600',
      'KES 5,100'
    ],
    correctAnswer: 'KES 4,100',
    explanation: 'Carrying charge / extra cost = Hire Purchase Price - Cash Price = 22,600 - 18,500 = KES 4,100.',
    socraticHint: 'Subtract the cash price from the total hire purchase price.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U9'
  },

  // --- Unit 10: Mission 1 (q-g6-math-u10-001 to 012) ---
  {
    id: 'q-g6-math-u10-001',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two angles are complementary if their sum is 90 degrees. If one angle measures 38 degrees, what is the measure of its complement?',
    text: 'Two angles are complementary if their sum is 90 degrees. If one angle measures 38 degrees, what is the measure of its complement?',
    options: [
      '52°',
      '142°',
      '42°',
      '62°'
    ],
    correctAnswer: '52°',
    explanation: 'Complementary angles sum to 90°. Complement = 90° - 38° = 52°.',
    socraticHint: 'Complementary angles add up to 90°. Subtract 38° from 90°.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-002',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two angles on a straight line are supplementary (sum = 180 degrees). If one angle is 115 degrees, what is the size of its supplement?',
    text: 'Two angles on a straight line are supplementary (sum = 180 degrees). If one angle is 115 degrees, what is the size of its supplement?',
    options: [
      '65°',
      '75°',
      '55°',
      '245°'
    ],
    correctAnswer: '65°',
    explanation: 'Supplementary angles sum to 180°. Supplement = 180° - 115° = 65°.',
    socraticHint: 'Angles on a straight line add up to 180°. Subtract 115° from 180°.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-003',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When two straight lines cross, vertically opposite angles are equal. If one angle formed is 74 degrees, what is the size of the vertically opposite angle?',
    text: 'When two straight lines cross, vertically opposite angles are equal. If one angle formed is 74 degrees, what is the size of the vertically opposite angle?',
    options: [
      '74°',
      '106°',
      '16°',
      '148°'
    ],
    correctAnswer: '74°',
    explanation: 'Vertically opposite angles are equal. Therefore, the opposite angle is also 74°.',
    socraticHint: 'Vertically opposite angles facing each other across an intersection are always equal.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-004',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three angles meet at a point: 120 degrees, 150 degrees, and angle x. What is the size of angle x?',
    text: 'Three angles meet at a point: 120 degrees, 150 degrees, and angle x. What is the size of angle x?',
    options: [
      '90°',
      '100°',
      '80°',
      '110°'
    ],
    correctAnswer: '90°',
    explanation: 'Angles meeting at a point add up to 360°. x = 360° - (120° + 150°) = 360° - 270° = 90°.',
    socraticHint: 'The sum of all angles around a point is 360°. Subtract (120 + 150) from 360°.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-005',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A transversal intersects two parallel lines. If alternate interior angle A is 58 degrees, what is the size of alternate interior angle B?',
    text: 'A transversal intersects two parallel lines. If alternate interior angle A is 58 degrees, what is the size of alternate interior angle B?',
    options: [
      '58°',
      '122°',
      '32°',
      '148°'
    ],
    correctAnswer: '58°',
    explanation: 'Alternate interior angles on parallel lines are equal. Therefore, angle B = 58°.',
    socraticHint: 'Alternate interior angles on opposite sides of the transversal between parallel lines are equal.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-006',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A transversal intersects two parallel lines. If a corresponding angle at the top intersection is 112 degrees, what is the measure of the matching corresponding angle at the bottom intersection?',
    text: 'A transversal intersects two parallel lines. If a corresponding angle at the top intersection is 112 degrees, what is the measure of the matching corresponding angle at the bottom intersection?',
    options: [
      '112°',
      '68°',
      '78°',
      '122°'
    ],
    correctAnswer: '112°',
    explanation: 'Corresponding angles in matching positions on parallel lines are equal. The angle is 112°.',
    socraticHint: 'Corresponding angles in matching positions along parallel lines are equal.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-007',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two co-interior angles lie on the same side of a transversal between two parallel lines. If one co-interior angle is 68 degrees, what is the other angle?',
    text: 'Two co-interior angles lie on the same side of a transversal between two parallel lines. If one co-interior angle is 68 degrees, what is the other angle?',
    options: [
      '112°',
      '68°',
      '122°',
      '22°'
    ],
    correctAnswer: '112°',
    explanation: 'Co-interior angles between parallel lines are supplementary (sum = 180°). Other angle = 180° - 68° = 112°.',
    socraticHint: 'Co-interior angles on the same side of the transversal add up to 180°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-008',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three adjacent angles on a straight line are 2x, 3x, and 40 degrees. What is the value of x?',
    text: 'Three adjacent angles on a straight line are 2x, 3x, and 40 degrees. What is the value of x?',
    options: [
      '28°',
      '20°',
      '35°',
      '25°'
    ],
    correctAnswer: '28°',
    explanation: 'Angles on a straight line add to 180°: 2x + 3x + 40° = 180° => 5x = 140° => x = 140 / 5 = 28°.',
    socraticHint: 'Sum of angles on a straight line is 180°. Set 5x + 40 = 180 and solve for x.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-009',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A ray bisects an angle of 76 degrees into two equal angles. What is the size of each resulting angle?',
    text: 'A ray bisects an angle of 76 degrees into two equal angles. What is the size of each resulting angle?',
    options: [
      '38°',
      '36°',
      '42°',
      '76°'
    ],
    correctAnswer: '38°',
    explanation: 'To bisect means to divide into two equal parts: 76° / 2 = 38°.',
    socraticHint: 'To bisect means to cut exactly in half. Divide 76° by 2.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-010',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In an isosceles triangle, the vertex angle measures 50 degrees. What is the measure of each of the two equal base angles?',
    text: 'In an isosceles triangle, the vertex angle measures 50 degrees. What is the measure of each of the two equal base angles?',
    options: [
      '65°',
      '50°',
      '75°',
      '60°'
    ],
    correctAnswer: '65°',
    explanation: 'Sum of angles in a triangle = 180°. Remaining sum for two equal base angles = 180° - 50° = 130°. Each base angle = 130° / 2 = 65°.',
    socraticHint: 'Angles in a triangle add to 180°. Subtract 50° and divide the remainder equally by 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-011',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a right-angled triangle, one acute angle measures 34 degrees. What is the measure of the other acute angle?',
    text: 'In a right-angled triangle, one acute angle measures 34 degrees. What is the measure of the other acute angle?',
    options: [
      '56°',
      '66°',
      '46°',
      '146°'
    ],
    correctAnswer: '56°',
    explanation: 'The two acute angles in a right-angled triangle sum to 90°: 90° - 34° = 56°.',
    socraticHint: 'In a right triangle, the two acute angles are complementary (add to 90°).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-012',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An exterior angle of a triangle is opposite two interior angles measuring 45 degrees and 65 degrees. What is the size of the exterior angle?',
    text: 'An exterior angle of a triangle is opposite two interior angles measuring 45 degrees and 65 degrees. What is the size of the exterior angle?',
    options: [
      '110°',
      '70°',
      '120°',
      '100°'
    ],
    correctAnswer: '110°',
    explanation: 'The exterior angle of a triangle equals the sum of the two opposite interior angles: 45° + 65° = 110°.',
    socraticHint: 'An exterior angle equals the sum of the two remote interior angles: 45° + 65°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },

  // --- Unit 10: Mission 2 (q-g6-math-u10-013 to 024) ---
  {
    id: 'q-g6-math-u10-013',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the sum of the interior angles of any convex four-sided polygon (quadrilateral)?',
    text: 'What is the sum of the interior angles of any convex four-sided polygon (quadrilateral)?',
    options: [
      '360°',
      '180°',
      '540°',
      '720°'
    ],
    correctAnswer: '360°',
    explanation: 'For any quadrilateral (n = 4), Sum of interior angles = (4 - 2) x 180° = 2 x 180° = 360°.',
    socraticHint: 'A quadrilateral can be split into 2 triangles. What is 2 x 180°?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-014',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the sum of the interior angles of a five-sided polygon (pentagon)?',
    text: 'What is the sum of the interior angles of a five-sided polygon (pentagon)?',
    options: [
      '540°',
      '360°',
      '720°',
      '900°'
    ],
    correctAnswer: '540°',
    explanation: 'Sum = (n - 2) x 180° = (5 - 2) x 180° = 3 x 180° = 540°.',
    socraticHint: 'Use the formula (n - 2) x 180° where n = 5.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-015',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the sum of the interior angles of a six-sided polygon (hexagon)?',
    text: 'What is the sum of the interior angles of a six-sided polygon (hexagon)?',
    options: [
      '720°',
      '540°',
      '1,080°',
      '360°'
    ],
    correctAnswer: '720°',
    explanation: 'Sum = (n - 2) x 180° = (6 - 2) x 180° = 4 x 180° = 720°.',
    socraticHint: 'For n = 6, (6 - 2) x 180° = 4 x 180°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-016',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a regular pentagon with 5 equal angles, what is the size of each interior angle?',
    text: 'In a regular pentagon with 5 equal angles, what is the size of each interior angle?',
    options: [
      '108°',
      '120°',
      '72°',
      '90°'
    ],
    correctAnswer: '108°',
    explanation: 'Total interior sum = 540°. Each interior angle = 540° / 5 = 108°.',
    socraticHint: 'Divide the total angle sum of 540° equally among the 5 angles.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-017',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the measure of each interior angle in a regular hexagon?',
    text: 'What is the measure of each interior angle in a regular hexagon?',
    options: [
      '120°',
      '108°',
      '135°',
      '60°'
    ],
    correctAnswer: '120°',
    explanation: 'Total interior sum = 720°. Each interior angle = 720° / 6 = 120°.',
    socraticHint: 'Divide 720° by 6.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-018',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the sum of the exterior angles of ANY convex polygon?',
    text: 'What is the sum of the exterior angles of ANY convex polygon?',
    options: [
      '360°',
      '180°',
      '540°',
      '720°'
    ],
    correctAnswer: '360°',
    explanation: 'The sum of the exterior angles of any convex polygon is always equal to 360 degrees (one full revolution).',
    socraticHint: 'A complete rotation around the perimeter of any polygon always equals 360°.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-019',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A regular octagon has 8 equal sides. What is the measure of each exterior angle?',
    text: 'A regular octagon has 8 equal sides. What is the measure of each exterior angle?',
    options: [
      '45°',
      '60°',
      '135°',
      '30°'
    ],
    correctAnswer: '45°',
    explanation: 'Each exterior angle = 360° / n = 360° / 8 = 45°.',
    socraticHint: 'Divide the total exterior angle sum (360°) by the number of sides (8).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-020',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the measure of each interior angle in a regular octagon?',
    text: 'What is the measure of each interior angle in a regular octagon?',
    options: [
      '135°',
      '120°',
      '140°',
      '45°'
    ],
    correctAnswer: '135°',
    explanation: 'Interior angle = 180° - exterior angle = 180° - 45° = 135°.',
    socraticHint: 'Interior and exterior angles at any vertex lie on a straight line: 180° - 45°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-021',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If each exterior angle of a regular polygon is 30 degrees, how many sides does the polygon have?',
    text: 'If each exterior angle of a regular polygon is 30 degrees, how many sides does the polygon have?',
    options: [
      '12 sides',
      '10 sides',
      '8 sides',
      '15 sides'
    ],
    correctAnswer: '12 sides',
    explanation: 'Number of sides n = 360° / 30° = 12 sides (a regular dodecagon).',
    socraticHint: 'Number of sides = 360° divided by each exterior angle.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-022',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three angles of a four-sided plot of land measure 85 degrees, 110 degrees, and 95 degrees. What is the size of the fourth angle?',
    text: 'Three angles of a four-sided plot of land measure 85 degrees, 110 degrees, and 95 degrees. What is the size of the fourth angle?',
    options: [
      '70°',
      '80°',
      '65°',
      '75°'
    ],
    correctAnswer: '70°',
    explanation: 'Sum of angles in a quadrilateral = 360°. Fourth angle = 360° - (85° + 110° + 95°) = 360° - 290° = 70°.',
    socraticHint: 'The 4 angles of a quadrilateral sum to 360°. Subtract the sum of the 3 known angles from 360°.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-023',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a parallelogram ABCD, angle A measures 65 degrees. What is the size of adjacent consecutive angle B?',
    text: 'In a parallelogram ABCD, angle A measures 65 degrees. What is the size of adjacent consecutive angle B?',
    options: [
      '115°',
      '65°',
      '125°',
      '25°'
    ],
    correctAnswer: '115°',
    explanation: 'Consecutive adjacent angles in a parallelogram are supplementary (co-interior): angle B = 180° - 65° = 115°.',
    socraticHint: 'Adjacent angles in a parallelogram add up to 180°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
  },
  {
    id: 'q-g6-math-u10-024',
    subStrandId: 'substrand-g6-math-u10',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Which of the following statements about the geometric diagonals of a rhombus is TRUE?',
    text: 'Which of the following statements about the geometric diagonals of a rhombus is TRUE?',
    options: [
      'Diagonals bisect each other at 90° (right angles)',
      'All four angles are right angles',
      'Diagonals are always equal in length',
      'Opposite sides are perpendicular'
    ],
    correctAnswer: 'Diagonals bisect each other at 90° (right angles)',
    explanation: 'A rhombus has all four sides equal and its diagonals intersect and bisect each other at right angles (perpendicular bisectors).',
    socraticHint: 'Think about the intersection of the diagonals in a rhombus: at what angle do they cross?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U10'
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
console.log('Batch 5 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
