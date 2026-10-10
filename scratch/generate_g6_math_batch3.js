import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Mathematics Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u5',
    strandId: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    title: 'Length, Perimeter, Parts of Circles & Circumference',
    description: 'Measuring lengths, finding perimeters of regular and composite rectilinear shapes, identifying parts of a circle (radius, diameter, circumference, chord, arc, sector, semicircle, quadrant), and calculating circumference using pi = 22/7 and pi = 3.14.',
    cbeCompetency: 'Spatial measurement, geometric reasoning, practical circular estimation, and problem solving in agricultural and architectural layouts',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g6-math-u6',
    strandId: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    title: 'Area of Plane Figures (Triangles, Parallelograms, Trapezia & Circles)',
    description: 'Calculating areas of triangles (A = 1/2 b h), parallelograms (A = b h), trapezia (A = 1/2 (a + b) h), and circles (A = pi r^2), along with composite land plots and shaded regions.',
    cbeCompetency: 'Area calculation, spatial computation, land parcel valuation, and architectural tiling estimation',
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
    id: 'lesson-g6-math-u5-l1',
    subStrandId: 'substrand-g6-math-u5',
    title: 'Perimeter of Composite Rectilinear Figures and Practical Fencing',
    content: 'Perimeter is the total distance around the outer boundary of a closed plane figure.\n\n1. Rectilinear & Composite Figures:\n- In composite shapes formed by perpendicular cuts (such as L-shapes or stepped figures), horizontal segments add up to the total outer horizontal width, and vertical segments add up to the total outer vertical height.\n- Perimeter of an L-shape bounded by overall length L and width W is simply 2 x (L + W).\n\n2. Real-World Kenyan Fencing Applications:\n- Total wire required for multiple strands: Total Wire = Perimeter x Number of Strands.\n- Perimeter with Gates: Deduct the width of the entrance gate from the total boundary: Wire = Perimeter - Gate Width.\n- Post Spacing: For closed boundaries, Number of Posts = Perimeter / Distance Between Posts.',
    didYouKnow: 'If you walk around an L-shaped compound with outer bounding dimensions 24 m by 18 m, the distance you walk is exactly the same as walking around a full 24 m by 18 m rectangle: 2 x (24 + 18) = 84 metres!',
    kenyanContext: 'Farmer Kiprono in Uasin Gishu fenced his 150 m by 90 m maize shamba with 4 strands of high-tensile wire. By calculating the 480 m perimeter first, he bought exactly 1,920 metres of wire, preventing project delays.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u5-l2',
    subStrandId: 'substrand-g6-math-u5',
    title: 'Circle Anatomy and Circumference Calculations (C = pi d = 2 pi r)',
    content: 'A circle is a round plane figure whose boundary consists of points equidistant from a fixed centre point.\n\n1. Circle Anatomy:\n- Radius (r): Distance from centre to any point on the boundary.\n- Diameter (d): Longest straight chord connecting two points on the boundary through the centre; d = 2r.\n- Circumference (C): Total perimeter or outer boundary length of the circle.\n- Chord: Any straight line connecting two points on the boundary.\n- Arc: A curved segment of the circumference.\n\n2. Circumference Formulae:\n- Using diameter: C = pi x d\n- Using radius: C = 2 x pi x r\n- Approximations for pi: pi = 22/7 (ideal when d or r is a multiple of 7) and pi = 3.14.\n\n3. Semicircles and Quadrants:\n- Perimeter of closed Semicircle = (1/2 x pi x d) + d\n- Perimeter of closed Quadrant = (1/4 x 2 x pi x r) + 2r = (1/2 x pi x r) + 2r.',
    didYouKnow: 'The mathematical ratio pi (circumference / diameter) was known by ancient builders, but Kenyan engineers use pi = 22/7 daily when laying water transmission pipelines and designing road roundabouts!',
    kenyanContext: 'A donkey cart in Machakos has wheels with diameter 56 cm. Using C = (22/7) x 56 = 176 cm, the driver knows each rotation moves the cart forward by 1.76 metres.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u6-l1',
    subStrandId: 'substrand-g6-math-u6',
    title: 'Area of Triangles, Parallelograms, and Trapezia',
    content: 'Area is the size of a surface or region enclosed within a boundary, measured in square units (cm^2, m^2, hectares).\n\n1. Area of a Triangle:\n- Formula: Area = 1/2 x base x perpendicular height (A = 1/2 b h).\n- The height must always be perpendicular (at 90 degrees) to the chosen base.\n\n2. Area of a Parallelogram:\n- A parallelogram can be partitioned and rearranged into a rectangle.\n- Formula: Area = base x perpendicular height (A = b h).\n\n3. Area of a Trapezium:\n- A trapezium has two parallel sides, a and b, separated by perpendicular height h.\n- Formula: Area = 1/2 x (a + b) x h (average of parallel sides multiplied by height).\n\n4. Hectares Conversion:\n- 1 Hectare (ha) = 10,000 square metres (100 m x 100 m).',
    didYouKnow: 'A trapezium formula simply averages the lengths of the two parallel sides: if a trapezoidal plot has sides 28 m and 42 m, its average width is (28 + 42) / 2 = 35 m!',
    kenyanContext: 'A tea cooperative in Kericho divided a large parcel into trapezoidal seedling terraces. An agronomist calculated the area of a terrace with parallel sides 28 m and 42 m and height 15 m as 525 square metres.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u6-l2',
    subStrandId: 'substrand-g6-math-u6',
    title: 'Area of Circles and Composite/Shaded Regions (A = pi r^2)',
    content: '1. Area of a Circle:\n- Formula: Area = pi x r^2 = pi x r x r.\n- Note: If diameter d is given, first calculate radius r = d / 2 before squaring!\n\n2. Fractions of Circles:\n- Area of Semicircle = 1/2 x pi x r^2\n- Area of Quadrant = 1/4 x pi x r^2\n- Area of Sector with angle theta = (theta / 360) x pi x r^2\n\n3. Circular Rings (Washers / Circular Paths):\n- Outer circle of radius R and inner circle of radius r:\n- Area of Ring = pi x R^2 - pi x r^2 = pi x (R^2 - r^2)\n\n4. Composite and Shaded Regions:\n- Shaded region = Total enclosing area - Unshaded cutout area.\n- Example: A square plate of side 14 cm with an inscribed circle of diameter 14 cm has shaded corner area: 14^2 - ((22/7) x 7^2) = 196 - 154 = 42 cm^2.',
    didYouKnow: 'If you double the radius of a circular pivot irrigation system, the area of irrigated crops does NOT just double - it quadruples (increases by 4 times) because area is proportional to r^2!',
    kenyanContext: 'Center-pivot irrigation systems along the Tana River spray circular arcs of crops. Farmers calculate exact seed and water requirements using the circular area formula A = pi x r^2.',
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

// 3. Batch 3 Missions (4 missions: orders 69 to 72 in world-math-kingdom)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u5-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u5',
    lessonId: 'lesson-g6-math-u5-l1',
    title: 'Perimeter & Border Patrol Quest',
    description: 'Calculate perimeters of regular, stepped, and composite shapes, solve barbed-wire fencing puzzles, and determine post counts!',
    order: 69,
    orderIndex: 69,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-border-patrol',
    badge: { name: 'Fencing Foreman', icon: 'shield' },
    questionIds: [
      'q-g6-math-u5-001', 'q-g6-math-u5-002', 'q-g6-math-u5-003', 'q-g6-math-u5-004',
      'q-g6-math-u5-005', 'q-g6-math-u5-006', 'q-g6-math-u5-007', 'q-g6-math-u5-008',
      'q-g6-math-u5-009', 'q-g6-math-u5-010', 'q-g6-math-u5-011', 'q-g6-math-u5-012'
    ]
  },
  {
    id: 'mission-g6-math-u5-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u5',
    lessonId: 'lesson-g6-math-u5-l2',
    title: 'The Great Wheel & Circumference Quest',
    description: 'Master circle parts, calculate circumferences with pi = 22/7 and 3.14, find semicircular perimeters, and solve cart wheel rotations!',
    order: 70,
    orderIndex: 70,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-circumference-master',
    badge: { name: 'Circle Master', icon: 'compass' },
    questionIds: [
      'q-g6-math-u5-013', 'q-g6-math-u5-014', 'q-g6-math-u5-015', 'q-g6-math-u5-016',
      'q-g6-math-u5-017', 'q-g6-math-u5-018', 'q-g6-math-u5-019', 'q-g6-math-u5-020',
      'q-g6-math-u5-021', 'q-g6-math-u5-022', 'q-g6-math-u5-023', 'q-g6-math-u5-024'
    ]
  },
  {
    id: 'mission-g6-math-u6-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u6',
    lessonId: 'lesson-g6-math-u6-l1',
    title: 'Farm Plot Area Surveyor Quest',
    description: 'Survey land areas of triangles, parallelograms, and trapezia, convert to hectares, and calculate turfing and landscaping costs!',
    order: 71,
    orderIndex: 71,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-plot-surveyor',
    badge: { name: 'Plot Surveyor', icon: 'map' },
    questionIds: [
      'q-g6-math-u6-001', 'q-g6-math-u6-002', 'q-g6-math-u6-003', 'q-g6-math-u6-004',
      'q-g6-math-u6-005', 'q-g6-math-u6-006', 'q-g6-math-u6-007', 'q-g6-math-u6-008',
      'q-g6-math-u6-009', 'q-g6-math-u6-010', 'q-g6-math-u6-011', 'q-g6-math-u6-012'
    ]
  },
  {
    id: 'mission-g6-math-u6-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u6',
    lessonId: 'lesson-g6-math-u6-l2',
    title: 'Circular Irrigation & Shaded Zone Quest',
    description: 'Compute circle areas with pi = 22/7 and 3.14, solve circular rings, find unshaded remainders, and calculate veranda tiling budgets!',
    order: 72,
    orderIndex: 72,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-area-architect',
    badge: { name: 'Area Architect', icon: 'layers' },
    questionIds: [
      'q-g6-math-u6-013', 'q-g6-math-u6-014', 'q-g6-math-u6-015', 'q-g6-math-u6-016',
      'q-g6-math-u6-017', 'q-g6-math-u6-018', 'q-g6-math-u6-019', 'q-g6-math-u6-020',
      'q-g6-math-u6-021', 'q-g6-math-u6-022', 'q-g6-math-u6-023', 'q-g6-math-u6-024'
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
  // --- Unit 5: Mission 1 (q-g6-math-u5-001 to 012) ---
  {
    id: 'q-g6-math-u5-001',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An L-shaped compound in Ruiru has outer bounding dimensions of 24 metres by 18 metres. What is its total perimeter?',
    text: 'An L-shaped compound in Ruiru has outer bounding dimensions of 24 metres by 18 metres. What is its total perimeter?',
    options: [
      '84 m',
      '72 m',
      '42 m',
      '432 m'
    ],
    correctAnswer: '84 m',
    explanation: 'In an L-shape with perpendicular cuts, the sum of the horizontal steps equals the overall length (24 m), and the sum of the vertical steps equals the overall width (18 m). Therefore, Perimeter = 2 x (24 + 18) = 2 x 42 = 84 m.',
    socraticHint: 'Think about the missing horizontal and vertical segments. Do they add up to the overall outer length and width?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-002',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Farmer Kiprono in Eldoret has a rectangular shamba measuring 150 m long and 90 m wide. He fences it with 4 strands of barbed wire. What is the total length of wire required?',
    text: 'Farmer Kiprono in Eldoret has a rectangular shamba measuring 150 m long and 90 m wide. He fences it with 4 strands of barbed wire. What is the total length of wire required?',
    options: [
      '1,920 m',
      '480 m',
      '960 m',
      '13,500 m'
    ],
    correctAnswer: '1,920 m',
    explanation: 'Perimeter of one round = 2 x (150 + 90) = 2 x 240 = 480 m. For 4 strands of wire: Total wire = 480 x 4 = 1,920 m.',
    socraticHint: 'What is the distance around the shamba for one single complete lap? What do you multiply by for 4 laps?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-003',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A school courtyard in Machakos has a perimeter of 360 metres. What is this perimeter expressed in centimetres?',
    text: 'A school courtyard in Machakos has a perimeter of 360 metres. What is this perimeter expressed in centimetres?',
    options: [
      '36,000 cm',
      '3,600 cm',
      '360,000 cm',
      '360 cm'
    ],
    correctAnswer: '36,000 cm',
    explanation: 'Since 1 metre = 100 centimetres, Perimeter = 360 x 100 = 36,000 cm.',
    socraticHint: 'How many centimetres make up 1 metre?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-004',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An equilateral triangular flowerbed at Nyayo Gardens has a perimeter of 48.6 metres. What is the length of each side?',
    text: 'An equilateral triangular flowerbed at Nyayo Gardens has a perimeter of 48.6 metres. What is the length of each side?',
    options: [
      '16.2 m',
      '24.3 m',
      '14.2 m',
      '18.6 m'
    ],
    correctAnswer: '16.2 m',
    explanation: 'An equilateral triangle has 3 sides of equal length. Side length = 48.6 / 3 = 16.2 m.',
    socraticHint: 'An equilateral triangle has three sides of identical length. How do you divide the total perimeter among them?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-005',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A decorative stone path tile in Kisumu is shaped as a regular hexagon with each side measuring 35 cm. What is its perimeter?',
    text: 'A decorative stone path tile in Kisumu is shaped as a regular hexagon with each side measuring 35 cm. What is its perimeter?',
    options: [
      '210 cm',
      '175 cm',
      '140 cm',
      '280 cm'
    ],
    correctAnswer: '210 cm',
    explanation: 'A regular hexagon has 6 equal sides. Perimeter = 6 x 35 cm = 210 cm.',
    socraticHint: 'How many equal sides does a regular hexagon have?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-006',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A square nursery bed in Kericho measures 20 m on each side. Fencing posts are fixed at intervals of 2 m along its perimeter. How many posts are needed in total?',
    text: 'A square nursery bed in Kericho measures 20 m on each side. Fencing posts are fixed at intervals of 2 m along its perimeter. How many posts are needed in total?',
    options: [
      '40 posts',
      '41 posts',
      '36 posts',
      '20 posts'
    ],
    correctAnswer: '40 posts',
    explanation: 'Perimeter of the square = 4 x 20 m = 80 m. In a closed loop, the number of posts equals the number of intervals: 80 / 2 = 40 posts.',
    socraticHint: 'In a closed loop, how does the number of intervals relate to the number of posts?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-007',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular compound in Kitale measures 65 m by 40 m. A 5-metre entrance gate is left unfenced. What length of fencing wire is required for one round?',
    text: 'A rectangular compound in Kitale measures 65 m by 40 m. A 5-metre entrance gate is left unfenced. What length of fencing wire is required for one round?',
    options: [
      '205 m',
      '210 m',
      '105 m',
      '215 m'
    ],
    correctAnswer: '205 m',
    explanation: 'Total perimeter = 2 x (65 + 40) = 2 x 105 = 210 m. Deducting the 5 m gate: Wire needed = 210 - 5 = 205 m.',
    socraticHint: 'Find the total perimeter around the entire rectangle, then what must you subtract for the open gate?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-008',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A four-sided poultry run has sides measuring 18 m, 14.5 m, 22.5 m, and side x. If the total perimeter is 70 m, what is the length of side x?',
    text: 'A four-sided poultry run has sides measuring 18 m, 14.5 m, 22.5 m, and side x. If the total perimeter is 70 m, what is the length of side x?',
    options: [
      '15 m',
      '16.5 m',
      '14 m',
      '25 m'
    ],
    correctAnswer: '15 m',
    explanation: 'Sum of known sides = 18 + 14.5 + 22.5 = 55 m. Unknown side x = 70 - 55 = 15 m.',
    socraticHint: 'Add up the lengths of the three known sides, then subtract that sum from the total perimeter.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-009',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular hall floor measuring 30 m by 20 m has a small corner room of 6 m by 4 m removed. What is the new perimeter of the hall?',
    text: 'A rectangular hall floor measuring 30 m by 20 m has a small corner room of 6 m by 4 m removed. What is the new perimeter of the hall?',
    options: [
      '100 m',
      '90 m',
      '120 m',
      '80 m'
    ],
    correctAnswer: '100 m',
    explanation: 'When a corner rectangle is cut out, the two new inner boundary edges have lengths 6 m and 4 m, which exactly replace the 6 m and 4 m lost from the outer boundary. The perimeter remains unchanged: 2 x (30 + 20) = 100 m.',
    socraticHint: 'When a corner rectangle is cut out, do the two new inner edges equal the two outer edges that were removed?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-010',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A farmer in Nyeri fences a square coffee nursery of side 45 m with 3 rounds of wire. If wire costs KES 25 per metre, how much money does she spend on wire?',
    text: 'A farmer in Nyeri fences a square coffee nursery of side 45 m with 3 rounds of wire. If wire costs KES 25 per metre, how much money does she spend on wire?',
    options: [
      'KES 13,500',
      'KES 4,500',
      'KES 11,250',
      'KES 27,000'
    ],
    correctAnswer: 'KES 13,500',
    explanation: 'Perimeter of one round = 4 x 45 m = 180 m. Total wire for 3 rounds = 180 x 3 = 540 m. Total cost = 540 x 25 = KES 13,500.',
    socraticHint: 'First calculate the perimeter of one round, multiply by 3 rounds, and finally multiply by the cost per metre.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-011',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A square field has side 28 m. A rectangular field has length 36 m and width 20 m. Which field has the greater perimeter, and by how much?',
    text: 'A square field has side 28 m. A rectangular field has length 36 m and width 20 m. Which field has the greater perimeter, and by how much?',
    options: [
      'Both have the same perimeter (112 m)',
      'The square is larger by 8 m',
      'The rectangle is larger by 8 m',
      'The square is larger by 16 m'
    ],
    correctAnswer: 'Both have the same perimeter (112 m)',
    explanation: 'Square perimeter = 4 x 28 m = 112 m. Rectangular perimeter = 2 x (36 + 20) = 2 x 56 = 112 m. Both perimeters are equal to 112 m.',
    socraticHint: 'Calculate the perimeter of the square and the perimeter of the rectangle separately, then compare their values.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-012',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Wanjiku walks around a rectangular park measuring 85 m by 65 m. If each of her strides is 0.75 m long, how many strides does she take to complete one round?',
    text: 'Wanjiku walks around a rectangular park measuring 85 m by 65 m. If each of her strides is 0.75 m long, how many strides does she take to complete one round?',
    options: [
      '400 paces',
      '300 paces',
      '225 paces',
      '450 paces'
    ],
    correctAnswer: '400 paces',
    explanation: 'Perimeter of park = 2 x (85 + 65) = 2 x 150 = 300 m. Number of strides = 300 / 0.75 = 300 / (3/4) = 300 x (4/3) = 400 paces.',
    socraticHint: 'What is the total distance around the park in metres? How many 0.75-metre steps fit into that distance?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },

  // --- Unit 5: Mission 2 (q-g6-math-u5-013 to 024) ---
  {
    id: 'q-g6-math-u5-013',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a circle, what is the term for a straight line drawn from the centre point to any point on its circumference?',
    text: 'In a circle, what is the term for a straight line drawn from the centre point to any point on its circumference?',
    options: [
      'Radius',
      'Diameter',
      'Chord',
      'Arc'
    ],
    correctAnswer: 'Radius',
    explanation: 'The radius is the straight line distance from the centre of a circle to any point on its circumference.',
    socraticHint: 'What is half of the diameter, running from the center point to the circumference?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-014',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the longest straight chord that can be drawn inside a circle?',
    text: 'What is the longest straight chord that can be drawn inside a circle?',
    options: [
      'Diameter',
      'Radius',
      'Tangent',
      'Sector'
    ],
    correctAnswer: 'Diameter',
    explanation: 'A chord joins any two points on a circle. The longest chord passes directly through the centre and is called the diameter.',
    socraticHint: 'Which straight line segment connects two points on the circle and passes directly through the centre?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-015',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular water tank in Garissa has a diameter of 14 metres. Using pi = 22/7, what is its circumference?',
    text: 'A circular water tank in Garissa has a diameter of 14 metres. Using pi = 22/7, what is its circumference?',
    options: [
      '44 m',
      '88 m',
      '154 m',
      '22 m'
    ],
    correctAnswer: '44 m',
    explanation: 'Circumference = pi x d = (22/7) x 14 = 22 x 2 = 44 m.',
    socraticHint: 'Which formula relates circumference directly to diameter: C = pi x d or C = pi x r^2?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-016',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular roundabout in Mombasa has a radius of 21 metres. Using pi = 22/7, what is its circumference?',
    text: 'A circular roundabout in Mombasa has a radius of 21 metres. Using pi = 22/7, what is its circumference?',
    options: [
      '132 m',
      '66 m',
      '264 m',
      '1,386 m'
    ],
    correctAnswer: '132 m',
    explanation: 'Circumference = 2 x pi x r = 2 x (22/7) x 21 = 2 x 22 x 3 = 132 m.',
    socraticHint: 'Remember that diameter is twice the radius. If radius is 21 m, what is the diameter?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-017',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A bicycle wheel has a diameter of 70 cm. Using pi = 3.14, what distance does the bicycle travel in one complete revolution?',
    text: 'A bicycle wheel has a diameter of 70 cm. Using pi = 3.14, what distance does the bicycle travel in one complete revolution?',
    options: [
      '219.8 cm',
      '220 cm',
      '109.9 cm',
      '439.6 cm'
    ],
    correctAnswer: '219.8 cm',
    explanation: 'Distance in one revolution = Circumference = pi x d = 3.14 x 70 cm = 219.8 cm.',
    socraticHint: 'One revolution of a wheel covers a distance equal to its circumference: C = pi x d.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-018',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular athletics track has a circumference of 176 metres. Using pi = 22/7, what is the radius of the track?',
    text: 'A circular athletics track has a circumference of 176 metres. Using pi = 22/7, what is the radius of the track?',
    options: [
      '28 m',
      '56 m',
      '14 m',
      '22 m'
    ],
    correctAnswer: '28 m',
    explanation: 'Circumference = 2 x pi x r = (44/7) x r = 176. Therefore, r = 176 x (7/44) = 4 x 7 = 28 m.',
    socraticHint: 'Divide the circumference by pi to find the diameter first, then divide by 2 to find the radius.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-019',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A semicircular flower garden has a diameter of 28 metres. Using pi = 22/7, what is the total perimeter of the garden including its straight diameter edge?',
    text: 'A semicircular flower garden has a diameter of 28 metres. Using pi = 22/7, what is the total perimeter of the garden including its straight diameter edge?',
    options: [
      '72 m',
      '44 m',
      '58 m',
      '88 m'
    ],
    correctAnswer: '72 m',
    explanation: 'Curved arc = 1/2 x pi x d = 1/2 x (22/7) x 28 = 44 m. Total perimeter = curved arc + diameter = 44 + 28 = 72 m.',
    socraticHint: 'A closed semicircle consists of the curved arc PLUS the straight diameter baseline. Did you add both?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-020',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A decorative floor tile is shaped as a quadrant (one-quarter of a circle) with a radius of 14 cm. Using pi = 22/7, what is the perimeter of the tile?',
    text: 'A decorative floor tile is shaped as a quadrant (one-quarter of a circle) with a radius of 14 cm. Using pi = 22/7, what is the perimeter of the tile?',
    options: [
      '50 cm',
      '22 cm',
      '36 cm',
      '44 cm'
    ],
    correctAnswer: '50 cm',
    explanation: 'Curved arc = 1/4 x (2 x pi x r) = 1/4 x (2 x (22/7) x 14) = 1/4 x 88 = 22 cm. Straight edges = 2 x radius = 2 x 14 = 28 cm. Total perimeter = 22 + 28 = 50 cm.',
    socraticHint: 'Remember that the perimeter of a quadrant has one curved arc and TWO straight radii.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-021',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A donkey cart wheel in Machakos has a diameter of 56 cm. Using pi = 22/7, how many complete revolutions will it make to travel a distance of 352 metres?',
    text: 'A donkey cart wheel in Machakos has a diameter of 56 cm. Using pi = 22/7, how many complete revolutions will it make to travel a distance of 352 metres?',
    options: [
      '200 revolutions',
      '100 revolutions',
      '400 revolutions',
      '50 revolutions'
    ],
    correctAnswer: '200 revolutions',
    explanation: 'Circumference = pi x d = (22/7) x 56 cm = 176 cm = 1.76 m. Number of revolutions = Total distance / Circumference = 352 m / 1.76 m = 200 revolutions.',
    socraticHint: 'Convert the total distance from metres to centimetres (or circumference to metres), then divide by the wheel\'s circumference.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-022',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two concentric circular running tracks have diameters of 70 m and 84 m respectively. Using pi = 22/7, how much longer is the outer track than the inner track?',
    text: 'Two concentric circular running tracks have diameters of 70 m and 84 m respectively. Using pi = 22/7, how much longer is the outer track than the inner track?',
    options: [
      '44 m',
      '14 m',
      '88 m',
      '22 m'
    ],
    correctAnswer: '44 m',
    explanation: 'Difference in circumference = pi x (d2 - d1) = (22/7) x (84 - 70) = (22/7) x 14 = 44 m.',
    socraticHint: 'Notice that difference in circumference = pi x (d2 - d1). What is 22/7 x 14?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-023',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An arc subtends an angle of 90 degrees at the centre of a circle of radius 35 cm. Using pi = 22/7, what is the length of this arc?',
    text: 'An arc subtends an angle of 90 degrees at the centre of a circle of radius 35 cm. Using pi = 22/7, what is the length of this arc?',
    options: [
      '55 cm',
      '110 cm',
      '27.5 cm',
      '70 cm'
    ],
    correctAnswer: '55 cm',
    explanation: 'Arc length = (90/360) x (2 x pi x r) = (1/4) x 2 x (22/7) x 35 = (1/4) x 220 = 55 cm.',
    socraticHint: 'An angle of 90 degrees is what fraction of a full 360-degree circle?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },
  {
    id: 'q-g6-math-u5-024',
    subStrandId: 'substrand-g6-math-u5',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A piece of wire 88 cm long is bent into the shape of a circle. Using pi = 22/7, what is the diameter of the circle formed?',
    text: 'A piece of wire 88 cm long is bent into the shape of a circle. Using pi = 22/7, what is the diameter of the circle formed?',
    options: [
      '28 cm',
      '14 cm',
      '44 cm',
      '56 cm'
    ],
    correctAnswer: '28 cm',
    explanation: 'The length of the wire is the circumference: C = pi x d = 88 cm. Therefore, d = 88 / (22/7) = 88 x (7/22) = 4 x 7 = 28 cm.',
    socraticHint: 'The length of the wire is the circumference of the circle. What is 88 divided by 22/7?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U5'
  },

  // --- Unit 6: Mission 1 (q-g6-math-u6-001 to 012) ---
  {
    id: 'q-g6-math-u6-001',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A triangular plot of land in Meru has a base of 24 m and a perpendicular height of 16 m. What is its area?',
    text: 'A triangular plot of land in Meru has a base of 24 m and a perpendicular height of 16 m. What is its area?',
    options: [
      '192 m²',
      '384 m²',
      '96 m²',
      '40 m²'
    ],
    correctAnswer: '192 m²',
    explanation: 'Area of triangle = 1/2 x base x height = 1/2 x 24 x 16 = 12 x 16 = 192 m².',
    socraticHint: 'Recall the formula for area of a triangle: A = 1/2 x base x height.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-002',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A tea nursery plot in Kericho is shaped as a parallelogram with a base of 35 m and a perpendicular height of 18 m. What is its area?',
    text: 'A tea nursery plot in Kericho is shaped as a parallelogram with a base of 35 m and a perpendicular height of 18 m. What is its area?',
    options: [
      '630 m²',
      '315 m²',
      '106 m²',
      '1,260 m²'
    ],
    correctAnswer: '630 m²',
    explanation: 'Area of parallelogram = base x height = 35 x 18 = 630 m².',
    socraticHint: 'For a parallelogram, is the area formula A = b x h or 1/2 x b x h?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-003',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A farm terrace in Naivasha is shaped as a trapezium with parallel sides of 28 m and 42 m, and a perpendicular height of 15 m. What is its area?',
    text: 'A farm terrace in Naivasha is shaped as a trapezium with parallel sides of 28 m and 42 m, and a perpendicular height of 15 m. What is its area?',
    options: [
      '525 m²',
      '1,050 m²',
      '450 m²',
      '350 m²'
    ],
    correctAnswer: '525 m²',
    explanation: 'Area of trapezium = 1/2 x (a + b) x h = 1/2 x (28 + 42) x 15 = 1/2 x 70 x 15 = 35 x 15 = 525 m².',
    socraticHint: 'Add the two parallel sides first, divide by 2 to get the average width, then multiply by the height.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-004',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A triangular road sign along Thika Road has an area of 54 m² and a base of 12 m. What is its perpendicular height?',
    text: 'A triangular road sign along Thika Road has an area of 54 m² and a base of 12 m. What is its perpendicular height?',
    options: [
      '9 m',
      '4.5 m',
      '18 m',
      '6 m'
    ],
    correctAnswer: '9 m',
    explanation: 'Area = 1/2 x b x h => 54 = 1/2 x 12 x h => 54 = 6h => h = 54 / 6 = 9 m.',
    socraticHint: 'Multiply the area by 2 and then divide by the base.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-005',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A barn gable wall consists of a rectangular lower section measuring 12 m wide by 8 m high, topped by a triangular roof section with base 12 m and height 5 m. What is the total area of the wall?',
    text: 'A barn gable wall consists of a rectangular lower section measuring 12 m wide by 8 m high, topped by a triangular roof section with base 12 m and height 5 m. What is the total area of the wall?',
    options: [
      '126 m²',
      '156 m²',
      '96 m²',
      '116 m²'
    ],
    correctAnswer: '126 m²',
    explanation: 'Rectangular area = 12 x 8 = 96 m². Triangular area = 1/2 x 12 x 5 = 30 m². Total area = 96 + 30 = 126 m².',
    socraticHint: 'Calculate the area of the rectangle and the triangular top separately, then add them.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-006',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A decorative paved courtyard in Malindi is shaped like a rhombus with diagonals measuring 16 m and 12 m. What is its area?',
    text: 'A decorative paved courtyard in Malindi is shaped like a rhombus with diagonals measuring 16 m and 12 m. What is its area?',
    options: [
      '96 m²',
      '192 m²',
      '48 m²',
      '56 m²'
    ],
    correctAnswer: '96 m²',
    explanation: 'Area of a rhombus = 1/2 x d1 x d2 = 1/2 x 16 x 12 = 8 x 12 = 96 m².',
    socraticHint: 'The area of a rhombus can be found using the formula A = 1/2 x d1 x d2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-007',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A parallelogram has an area of 756 cm² and a perpendicular height of 28 cm. What is the length of its base?',
    text: 'A parallelogram has an area of 756 cm² and a perpendicular height of 28 cm. What is the length of its base?',
    options: [
      '27 cm',
      '26 cm',
      '54 cm',
      '13.5 cm'
    ],
    correctAnswer: '27 cm',
    explanation: 'Area = base x height => base = Area / height = 756 / 28 = 27 cm.',
    socraticHint: 'Since Area = base x height, how do you isolate the base?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-008',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A flowerbed in Kakamega is shaped like a trapezium with parallel sides of 14 m and 20 m and a perpendicular height of 8 m. What is the area of the flowerbed?',
    text: 'A flowerbed in Kakamega is shaped like a trapezium with parallel sides of 14 m and 20 m and a perpendicular height of 8 m. What is the area of the flowerbed?',
    options: [
      '136 m²',
      '272 m²',
      '120 m²',
      '144 m²'
    ],
    correctAnswer: '136 m²',
    explanation: 'Area = 1/2 x (a + b) x h = 1/2 x (14 + 20) x 8 = 1/2 x 34 x 8 = 17 x 8 = 136 m².',
    socraticHint: 'What is the average of 14 and 20? Multiply that average by 8.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-009',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular coffee estate in Murang\'a is 500 m long and 400 m wide. What is its area in hectares?',
    text: 'A rectangular coffee estate in Murang\'a is 500 m long and 400 m wide. What is its area in hectares?',
    options: [
      '20 hectares',
      '2 hectares',
      '200 hectares',
      '0.2 hectares'
    ],
    correctAnswer: '20 hectares',
    explanation: 'Area in square metres = 500 x 400 = 200,000 m². Since 1 hectare = 10,000 m², Area in hectares = 200,000 / 10,000 = 20 hectares.',
    socraticHint: 'How many square metres are in 1 hectare? (Remember: 1 ha = 10,000 m²).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-010',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A landscaper turfs a triangular lawn of base 30 m and height 22 m with sod grass at KES 150 per m². What is the total cost of turfing?',
    text: 'A landscaper turfs a triangular lawn of base 30 m and height 22 m with sod grass at KES 150 per m². What is the total cost of turfing?',
    options: [
      'KES 49,500',
      'KES 99,000',
      'KES 33,000',
      'KES 45,000'
    ],
    correctAnswer: 'KES 49,500',
    explanation: 'Area of lawn = 1/2 x 30 x 22 = 15 x 22 = 330 m². Total cost = 330 x 150 = KES 49,500.',
    socraticHint: 'First calculate the lawn\'s area in m², then multiply by the cost per square metre.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-011',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Shape X is a rectangle measuring 15 m by 12 m. Shape Y is a parallelogram with base 18 m and perpendicular height 10 m. Which shape has the larger area?',
    text: 'Shape X is a rectangle measuring 15 m by 12 m. Shape Y is a parallelogram with base 18 m and perpendicular height 10 m. Which shape has the larger area?',
    options: [
      'Both shapes have the same area (180 m²)',
      'Shape X is larger by 10 m²',
      'Shape Y is larger by 10 m²',
      'Shape X is larger by 20 m²'
    ],
    correctAnswer: 'Both shapes have the same area (180 m²)',
    explanation: 'Area of Shape X = 15 x 12 = 180 m². Area of Shape Y = 18 x 10 = 180 m². Both shapes have identical areas of 180 m².',
    socraticHint: 'Compute 15 x 12 and 18 x 10 and compare the two answers.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-012',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A trapezium has an area of 180 cm² and parallel sides of length 16 cm and 20 cm. What is its perpendicular height?',
    text: 'A trapezium has an area of 180 cm² and parallel sides of length 16 cm and 20 cm. What is its perpendicular height?',
    options: [
      '10 cm',
      '5 cm',
      '20 cm',
      '12 cm'
    ],
    correctAnswer: '10 cm',
    explanation: 'Area = 1/2 x (a + b) x h => 180 = 1/2 x (16 + 20) x h => 180 = 1/2 x 36 x h => 180 = 18h => h = 180 / 18 = 10 cm.',
    socraticHint: 'Sum the parallel sides and divide by 2 to find 18. What times 18 gives 180?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },

  // --- Unit 6: Mission 2 (q-g6-math-u6-013 to 024) ---
  {
    id: 'q-g6-math-u6-013',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular fish pond in Kisumu has a radius of 7 metres. Using pi = 22/7, what is its surface area?',
    text: 'A circular fish pond in Kisumu has a radius of 7 metres. Using pi = 22/7, what is its surface area?',
    options: [
      '154 m²',
      '44 m²',
      '308 m²',
      '49 m²'
    ],
    correctAnswer: '154 m²',
    explanation: 'Area of circle = pi x r² = (22/7) x 7 x 7 = 22 x 7 = 154 m².',
    socraticHint: 'Use the circle area formula A = pi x r x r. What is (22/7) x 7²?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-014',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular borehole cover has a diameter of 28 cm. Using pi = 22/7, what is its area?',
    text: 'A circular borehole cover has a diameter of 28 cm. Using pi = 22/7, what is its area?',
    options: [
      '616 cm²',
      '2,464 cm²',
      '88 cm²',
      '308 cm²'
    ],
    correctAnswer: '616 cm²',
    explanation: 'Radius r = diameter / 2 = 28 / 2 = 14 cm. Area = pi x r² = (22/7) x 14 x 14 = 22 x 2 x 14 = 616 cm².',
    socraticHint: 'Always convert the diameter to radius first before squaring!',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-015',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A semicircular stage at a cultural centre in Bomet has a diameter of 14 metres. Using pi = 22/7, what is the floor area of the stage?',
    text: 'A semicircular stage at a cultural centre in Bomet has a diameter of 14 metres. Using pi = 22/7, what is the floor area of the stage?',
    options: [
      '77 m²',
      '154 m²',
      '44 m²',
      '38.5 m²'
    ],
    correctAnswer: '77 m²',
    explanation: 'Radius r = 14 / 2 = 7 m. Area of full circle = (22/7) x 7 x 7 = 154 m². Area of semicircle = 154 / 2 = 77 m².',
    socraticHint: 'A semicircle is half of a full circle. Calculate the full circle area and divide by 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-016',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A quadrant corner garden has a radius of 21 m. Using pi = 22/7, what is its area?',
    text: 'A quadrant corner garden has a radius of 21 m. Using pi = 22/7, what is its area?',
    options: [
      '346.5 m²',
      '693 m²',
      '1,386 m²',
      '173.25 m²'
    ],
    correctAnswer: '346.5 m²',
    explanation: 'Full circle area = (22/7) x 21 x 21 = 22 x 3 x 21 = 1,386 m². Area of quadrant = 1,386 / 4 = 346.5 m².',
    socraticHint: 'A quadrant is one quarter (1/4) of a circle. Divide the full circle area by 4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-017',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular running track surrounds a central grassy circle. The outer radius is 14 m and the inner radius is 7 m. Using pi = 22/7, what is the area of the track path alone?',
    text: 'A circular running track surrounds a central grassy circle. The outer radius is 14 m and the inner radius is 7 m. Using pi = 22/7, what is the area of the track path alone?',
    options: [
      '462 m²',
      '154 m²',
      '616 m²',
      '308 m²'
    ],
    correctAnswer: '462 m²',
    explanation: 'Outer circle area = (22/7) x 14 x 14 = 616 m². Inner circle area = (22/7) x 7 x 7 = 154 m². Track area = 616 - 154 = 462 m².',
    socraticHint: 'Subtract the area of the smaller inner circle from the area of the larger outer circle.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-018',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A square metal plate of side 14 cm has a circular hole of diameter 14 cm cut out from its centre. Using pi = 22/7, what is the area of the remaining metal?',
    text: 'A square metal plate of side 14 cm has a circular hole of diameter 14 cm cut out from its centre. Using pi = 22/7, what is the area of the remaining metal?',
    options: [
      '42 cm²',
      '56 cm²',
      '154 cm²',
      '28 cm²'
    ],
    correctAnswer: '42 cm²',
    explanation: 'Area of square plate = 14 x 14 = 196 cm². Radius of circle = 14 / 2 = 7 cm. Area of circular hole = (22/7) x 7 x 7 = 154 cm². Remaining area = 196 - 154 = 42 cm².',
    socraticHint: 'Find the total area of the square, then subtract the area of the circular cutout.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-019',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The floor area of a traditional circular hut (manyatta) is 616 m². Using pi = 22/7, what is the radius of the floor?',
    text: 'The floor area of a traditional circular hut (manyatta) is 616 m². Using pi = 22/7, what is the radius of the floor?',
    options: [
      '14 m',
      '28 m',
      '7 m',
      '21 m'
    ],
    correctAnswer: '14 m',
    explanation: 'Area = pi x r² => (22/7) x r² = 616 => r² = 616 x (7/22) = 28 x 7 = 196 => r = sqrt(196) = 14 m.',
    socraticHint: 'First isolate r² by multiplying 616 by 7/22, then take the square root.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-020',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A school playground is shaped like a rectangle of 20 m by 14 m with semicircles attached at the two shorter ends (each of diameter 14 m). Using pi = 22/7, what is the total area of the playground?',
    text: 'A school playground is shaped like a rectangle of 20 m by 14 m with semicircles attached at the two shorter ends (each of diameter 14 m). Using pi = 22/7, what is the total area of the playground?',
    options: [
      '434 m²',
      '280 m²',
      '588 m²',
      '357 m²'
    ],
    correctAnswer: '434 m²',
    explanation: 'Area of rectangle = 20 x 14 = 280 m². The two semicircles of diameter 14 m combine to form one full circle of radius 7 m. Area of circle = (22/7) x 7 x 7 = 154 m². Total area = 280 + 154 = 434 m².',
    socraticHint: 'Combine the two semicircles into one complete circle, then add its area to the rectangle.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-021',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If the radius of a circular center-pivot irrigation arm is doubled from 10 m to 20 m, by what factor does the watered crop area increase?',
    text: 'If the radius of a circular center-pivot irrigation arm is doubled from 10 m to 20 m, by what factor does the watered crop area increase?',
    options: [
      '4 times',
      '2 times',
      '8 times',
      '16 times'
    ],
    correctAnswer: '4 times',
    explanation: 'Initial area A1 = pi x 10² = 100 pi. New area A2 = pi x 20² = 400 pi. Ratio = 400 pi / 100 pi = 4 times. Since area depends on r², doubling the radius multiplies the area by 2² = 4.',
    socraticHint: 'Since area depends on r², what happens when you square 2 x r (2²)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-022',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A sprinkler rotates through a quarter circle (90 degrees) spraying water over a radius of 10 m. Using pi = 3.14, what is the area watered by the sprinkler?',
    text: 'A sprinkler rotates through a quarter circle (90 degrees) spraying water over a radius of 10 m. Using pi = 3.14, what is the area watered by the sprinkler?',
    options: [
      '78.5 m²',
      '314 m²',
      '157 m²',
      '39.25 m²'
    ],
    correctAnswer: '78.5 m²',
    explanation: 'Area watered = 1/4 x pi x r² = 1/4 x 3.14 x 10² = 1/4 x 314 = 78.5 m².',
    socraticHint: 'Calculate the area of a full circle with radius 10 m (3.14 x 100), then take one-fourth of it.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-023',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular park has a radius of 28 m. Using pi = 22/7, what is the gross total area of the park before any pathways are deducted?',
    text: 'A circular park has a radius of 28 m. Using pi = 22/7, what is the gross total area of the park before any pathways are deducted?',
    options: [
      '2,464 m²',
      '1,232 m²',
      '616 m²',
      '4,928 m²'
    ],
    correctAnswer: '2,464 m²',
    explanation: 'Area = pi x r² = (22/7) x 28 x 28 = 22 x 4 x 28 = 88 x 28 = 2,464 m².',
    socraticHint: 'What is pi x r² for radius r = 28 m using pi = 22/7?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
  },
  {
    id: 'q-g6-math-u6-024',
    subStrandId: 'substrand-g6-math-u6',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A circular veranda in Karen, Nairobi has a diameter of 7 metres. Using pi = 22/7, what is the total cost of tiling the veranda at KES 800 per square metre?',
    text: 'A circular veranda in Karen, Nairobi has a diameter of 7 metres. Using pi = 22/7, what is the total cost of tiling the veranda at KES 800 per square metre?',
    options: [
      'KES 30,800',
      'KES 61,600',
      'KES 15,400',
      'KES 38,500'
    ],
    correctAnswer: 'KES 30,800',
    explanation: 'Radius r = 7 / 2 = 3.5 m. Area = (22/7) x 3.5 x 3.5 = (22/7) x (7/2) x (7/2) = 77 / 2 = 38.5 m². Total cost = 38.5 x 800 = KES 30,800.',
    socraticHint: 'Radius is half of 7 m, which is 3.5 m. Calculate (22/7) x 3.5 x 3.5, then multiply by KES 800.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U6'
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
console.log('Batch 3 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
