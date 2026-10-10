import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Mathematics Batch 6 (Units 11 & 12 - Capstone Finale) ---');

// 1. Batch 6 Sub-strands (Units 11 & 12)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u11',
    strandId: 'strand-g6-math-geometry',
    learningAreaId: 'la-math-g6',
    title: '3D Solids, Polyhedra Nets & Cartesian Coordinates',
    description: 'Analyzing faces, edges, and vertices of polyhedra using Euler\'s formula (F + V - E = 2); identifying and drawing nets of prisms, pyramids, and cylinders; plotting and reading coordinates in the first quadrant of the Cartesian plane; and calculating geometric distance and area on grids.',
    cbeCompetency: 'Spatial visualization, geometric abstraction, coordinate fluency, and mathematical modeling',
    estimatedMinutes: 30,
    order: 11
  },
  {
    id: 'substrand-g6-math-u12',
    strandId: 'strand-g6-math-data',
    learningAreaId: 'la-math-g6',
    title: 'Data Handling, Probability & Linear Algebraic Equations',
    description: 'Collecting and presenting data via tables, bar graphs, and pie charts; computing measures of central tendency (mean, median, mode) and range; determining experimental and theoretical probability; and forming and solving linear algebraic equations (ax + b = c).',
    cbeCompetency: 'Statistical reasoning, data interpretation, probability assessment, algebraic formulation, and KPSEA capstone problem solving',
    estimatedMinutes: 30,
    order: 12
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 6 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-math-u11-l1',
    subStrandId: 'substrand-g6-math-u11',
    title: 'Properties of 3D Solids & Polyhedra Nets (Euler\'s Formula F + V - E = 2)',
    content: 'Three-dimensional solids occupy space and have faces, vertices, and edges.\n\n1. Key Solid Polyhedra:\n- Cuboid: 6 rectangular faces, 8 vertices, 12 edges.\n- Cube: 6 square faces, 8 vertices, 12 edges.\n- Triangular Prism: 5 faces (2 triangular ends + 3 rectangles), 6 vertices, 9 edges.\n- Square-based Pyramid: 5 faces (1 square + 4 triangles), 5 vertices, 8 edges.\n- Tetrahedron: 4 triangular faces, 4 vertices, 6 edges.\n\n2. Euler\'s Formula for Polyhedra:\n- For any convex polyhedron: Faces + Vertices - Edges = 2 (F + V - E = 2).\n\n3. Nets of Solids:\n- A net is a 2D flat shape that can be folded along its edges to form a 3D solid.\n- A cube has 11 distinct valid nets (all with 6 squares).\n- Cylinder net: 2 circular bases and 1 unrolled rectangle of length equal to 2 pi r.\n- Total Surface Area (TSA) is the sum of the areas of all faces forming the net.',
    didYouKnow: 'Euler\'s formula (F + V - E = 2) was discovered by Swiss mathematician Leonhard Euler in 1758 and holds true for EVERY convex 3D polyhedron without exception!',
    kenyanContext: 'Kenyan packaging designers in Industrial Area, Nairobi use CAD nets of cardboard boxes and cartons to maximize packing efficiency and minimize paperboard waste.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u11-l2',
    subStrandId: 'substrand-g6-math-u11',
    title: 'Cartesian Coordinates in the First Quadrant and Geometric Transformations',
    content: 'The Cartesian plane is a two-dimensional grid system formed by two perpendicular number lines: the horizontal x-axis and vertical y-axis.\n\n1. Coordinate Pairs (x, y):\n- The origin is O(0, 0).\n- The first number (x-coordinate) represents horizontal distance from the y-axis.\n- The second number (y-coordinate) represents vertical distance from the x-axis.\n\n2. Grid Geometry:\n- Distance between points on the same horizontal line: x2 - x1.\n- Distance between points on the same vertical line: y2 - y1.\n- Perimeter and area of rectilinear figures plotted on a grid are computed from these lengths.\n\n3. Basic Transformations:\n- Translation: Moving a point horizontally by a units and vertically by b units: (x + a, y + b).\n- Reflection: Flipping a point across a mirror line such as y = k or x = k.',
    didYouKnow: 'The Cartesian coordinate system was named after René Descartes, who realized he could describe the exact position of a fly crawling on his ceiling by measuring its distance from two adjacent walls!',
    kenyanContext: 'Cartographers at Survey of Kenya in Ruaraka, Nairobi map land title deed boundaries using grid coordinates, ensuring exact parcel ownership boundaries.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u12-l1',
    subStrandId: 'substrand-g6-math-u12',
    title: 'Data Representation (Tables, Bar Graphs, Pie Charts) & Central Tendency',
    content: 'Data handling involves collecting, organizing, analyzing, and interpreting numerical information.\n\n1. Measures of Central Tendency:\n- Mean: Arithmetic average = Sum of all values / Total number of values.\n- Median: Middle value when data is arranged in ascending order. (If even number of values, average the two middle values).\n- Mode: The value that occurs most frequently in a data set.\n- Range: Difference between the largest and smallest values: Highest - Lowest.\n\n2. Pie Charts:\n- A circular statistical graphic where sectors represent proportions of a whole.\n- Sector Angle = (Category Value / Total Value) x 360 degrees.\n- Category Value = (Sector Angle / 360 degrees) x Total Value.',
    didYouKnow: 'The Kenya National Bureau of Statistics (KNBS) collects census data across all 47 counties and uses mean, median, and pie charts to allocate development funds effectively!',
    kenyanContext: 'A dairy farmer cooperative in Nyandarua recorded daily milk collection figures across 7 collection centers to determine the modal and mean milk production per farmer.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u12-l2',
    subStrandId: 'substrand-g6-math-u12',
    title: 'Experimental Probability & Linear Algebraic Equations (ax + b = c)',
    content: '1. Probability:\n- Probability measures the likelihood of an event occurring: P(Event) = Number of favorable outcomes / Total possible outcomes.\n- The probability of any event is always between 0 (impossible event) and 1 (certain event): 0 <= P <= 1.\n- Probability of an event NOT happening = 1 - P(Event).\n\n2. Linear Algebraic Equations:\n- An algebraic equation contains numbers, variables (unknown letters), and an equals sign (=).\n- Balancing rule: Whatever operation is performed on one side of the equation MUST be performed on the other side.\n- One-step equation: x + 17 = 42 => x = 42 - 17 = 25.\n- Two-step equation: 3x + 8 = 29 => 3x = 21 => x = 7.\n- Word problems: Translate real-life scenarios into equations and solve systematically.',
    didYouKnow: 'Meteorologists at the Kenya Meteorological Department in Dagoretti calculate rainfall probability percentages every day using statistical models to warn farmers of impending rains or dry spells!',
    kenyanContext: 'A shopkeeper in Kisumu uses linear equations like 3b + 25 = 145 to audit inventory prices when invoices list mixed bundles of exercise books and pens.',
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

// 3. Batch 6 Missions (4 missions: orders 81 to 84 in world-math-kingdom - Upper Primary Capstone Complete!)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u11-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u11',
    lessonId: 'lesson-g6-math-u11-l1',
    title: 'Polyhedron & Nets Architect Quest',
    description: 'Analyze faces, vertices, and edges using Euler\'s formula (F + V - E = 2), verify nets of 3D polyhedra, and calculate surface areas!',
    order: 81,
    orderIndex: 81,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-polyhedron-architect',
    badge: { name: 'Polyhedron Architect', icon: 'box' },
    questionIds: [
      'q-g6-math-u11-001', 'q-g6-math-u11-002', 'q-g6-math-u11-003', 'q-g6-math-u11-004',
      'q-g6-math-u11-005', 'q-g6-math-u11-006', 'q-g6-math-u11-007', 'q-g6-math-u11-008',
      'q-g6-math-u11-009', 'q-g6-math-u11-010', 'q-g6-math-u11-011', 'q-g6-math-u11-012'
    ]
  },
  {
    id: 'mission-g6-math-u11-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u11',
    lessonId: 'lesson-g6-math-u11-l2',
    title: 'First-Quadrant Grid Navigator Quest',
    description: 'Plot (x, y) coordinates, compute grid distances and shape areas, identify missing vertices, and execute point translations and reflections!',
    order: 82,
    orderIndex: 82,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-grid-navigator',
    badge: { name: 'Grid Navigator', icon: 'crosshair' },
    questionIds: [
      'q-g6-math-u11-013', 'q-g6-math-u11-014', 'q-g6-math-u11-015', 'q-g6-math-u11-016',
      'q-g6-math-u11-017', 'q-g6-math-u11-018', 'q-g6-math-u11-019', 'q-g6-math-u11-020',
      'q-g6-math-u11-021', 'q-g6-math-u11-022', 'q-g6-math-u11-023', 'q-g6-math-u11-024'
    ]
  },
  {
    id: 'mission-g6-math-u12-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u12',
    lessonId: 'lesson-g6-math-u12-l1',
    title: 'Census & Statistics Grandmaster Quest',
    description: 'Calculate mean, median, mode, and range of Kenyan datasets, read frequency and tally tables, and convert pie chart sector angles!',
    order: 83,
    orderIndex: 83,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-data-grandmaster',
    badge: { name: 'Data Grandmaster', icon: 'bar-chart' },
    questionIds: [
      'q-g6-math-u12-001', 'q-g6-math-u12-002', 'q-g6-math-u12-003', 'q-g6-math-u12-004',
      'q-g6-math-u12-005', 'q-g6-math-u12-006', 'q-g6-math-u12-007', 'q-g6-math-u12-008',
      'q-g6-math-u12-009', 'q-g6-math-u12-010', 'q-g6-math-u12-011', 'q-g6-math-u12-012'
    ]
  },
  {
    id: 'mission-g6-math-u12-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u12',
    lessonId: 'lesson-g6-math-u12-l2',
    title: 'Algebraic Equation & Chance Wizard Quest',
    description: 'Evaluate theoretical probabilities, solve one-step and two-step linear equations (ax + b = c), and master the KPSEA Math finale!',
    order: 84,
    orderIndex: 84,
    xpReward: 120,
    rewardXp: 120,
    coinReward: 30,
    requiredLevel: 1,
    badgeReward: 'badge-g6-algebra-wizard',
    badge: { name: 'KPSEA Math Grandmaster', icon: 'award' },
    questionIds: [
      'q-g6-math-u12-013', 'q-g6-math-u12-014', 'q-g6-math-u12-015', 'q-g6-math-u12-016',
      'q-g6-math-u12-017', 'q-g6-math-u12-018', 'q-g6-math-u12-019', 'q-g6-math-u12-020',
      'q-g6-math-u12-021', 'q-g6-math-u12-022', 'q-g6-math-u12-023', 'q-g6-math-u12-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 6 Questions (48 questions: 24 for Unit 11, 24 for Unit 12)
const questionsToAdd = [
  // --- Unit 11: Mission 1 (q-g6-math-u11-001 to 012) ---
  {
    id: 'q-g6-math-u11-001',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many faces (F), vertices (V), and edges (E) does a rectangular cuboid have?',
    text: 'How many faces (F), vertices (V), and edges (E) does a rectangular cuboid have?',
    options: [
      '6 faces, 8 vertices, 12 edges',
      '6 faces, 12 vertices, 8 edges',
      '8 faces, 6 vertices, 12 edges',
      '4 faces, 6 vertices, 8 edges'
    ],
    correctAnswer: '6 faces, 8 vertices, 12 edges',
    explanation: 'A cuboid has 6 flat rectangular faces, 8 corner vertices, and 12 straight edges.',
    socraticHint: 'Count the flat rectangular sides (faces), the sharp corners (vertices), and the straight boundary lines (edges).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-002',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A triangular prism has 5 faces and 6 vertices. Using Euler\'s formula F + V - E = 2, how many edges does it have?',
    text: 'A triangular prism has 5 faces and 6 vertices. Using Euler\'s formula F + V - E = 2, how many edges does it have?',
    options: [
      '9 edges',
      '8 edges',
      '10 edges',
      '12 edges'
    ],
    correctAnswer: '9 edges',
    explanation: 'Euler\'s formula: F + V - E = 2 => 5 + 6 - E = 2 => 11 - E = 2 => E = 11 - 2 = 9 edges.',
    socraticHint: 'Substitute F = 5 and V = 6 into F + V - E = 2: 11 - E = 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-003',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many faces, edges, and vertices does a square-based pyramid have?',
    text: 'How many faces, edges, and vertices does a square-based pyramid have?',
    options: [
      '5 faces, 8 edges, 5 vertices',
      '4 faces, 6 edges, 4 vertices',
      '6 faces, 8 edges, 6 vertices',
      '5 faces, 6 edges, 5 vertices'
    ],
    correctAnswer: '5 faces, 8 edges, 5 vertices',
    explanation: 'A square-based pyramid has 1 square base + 4 triangular sides = 5 faces, 8 edges (4 base edges + 4 sloped edges), and 5 vertices (4 base corners + 1 top apex).',
    socraticHint: 'Think of the Great Pyramids: 1 flat square bottom and 4 triangular sloping sides meeting at the top.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-004',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A valid net of a closed cube consists of how many congruent square faces?',
    text: 'A valid net of a closed cube consists of how many congruent square faces?',
    options: [
      '6 squares',
      '4 squares',
      '5 squares',
      '8 squares'
    ],
    correctAnswer: '6 squares',
    explanation: 'A closed cube has exactly 6 equal square faces, so its net must have 6 squares arranged to fold into a cube without overlaps.',
    socraticHint: 'How many flat faces does a standard closed six-sided die have?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-005',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'When a hollow open-ended cylindrical metal pipe is cut along its length and unrolled flat, what geometric shape is formed?',
    text: 'When a hollow open-ended cylindrical metal pipe is cut along its length and unrolled flat, what geometric shape is formed?',
    options: [
      'A rectangle',
      'A circle',
      'A triangle',
      'A trapezium'
    ],
    correctAnswer: 'A rectangle',
    explanation: 'The curved surface of a cylinder unrolls into a rectangle whose length equals the circular circumference (2 pi r) and width equals the height of the cylinder.',
    socraticHint: 'Imagine peeling off the paper label from a cylindrical tin of Blue Band margarine and flattening it.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-006',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The flat net of a closed triangular prism is made up of which combination of faces?',
    text: 'The flat net of a closed triangular prism is made up of which combination of faces?',
    options: [
      '2 triangles and 3 rectangles',
      '3 triangles and 2 rectangles',
      '4 triangles',
      '2 triangles and 4 rectangles'
    ],
    correctAnswer: '2 triangles and 3 rectangles',
    explanation: 'A triangular prism has two identical triangular end bases and three rectangular side faces connecting them: 2 triangles and 3 rectangles.',
    socraticHint: 'A triangular prism has two identical triangular ends connected by three rectangular side faces.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-007',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A regular tetrahedron is a triangular-based pyramid whose faces are all equilateral triangles. How many faces does it have?',
    text: 'A regular tetrahedron is a triangular-based pyramid whose faces are all equilateral triangles. How many faces does it have?',
    options: [
      '4 faces',
      '3 faces',
      '5 faces',
      '6 faces'
    ],
    correctAnswer: '4 faces',
    explanation: 'A tetrahedron has 4 faces (all equilateral triangles), 4 vertices, and 6 edges.',
    socraticHint: 'The prefix \'tetra-\' means four in Greek (e.g., 4 triangular faces).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-008',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The net of a complete closed cone consists of which two geometric figures?',
    text: 'The net of a complete closed cone consists of which two geometric figures?',
    options: [
      'A sector of a circle and a circular base',
      'A triangle and a circle',
      'Two circles and a rectangle',
      'A semicircle and a square'
    ],
    correctAnswer: 'A sector of a circle and a circular base',
    explanation: 'The curved sloped surface of a cone unrolls into a sector of a circle, while the flat bottom is a circle.',
    socraticHint: 'Think of an ice cream cone unrolled flat: it forms a fan-like sector of a circle, with a circular lid at the base.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-009',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A mineral crystal polyhedron has 12 vertices and 30 edges. Using Euler\'s formula F + V - E = 2, how many faces does it have?',
    text: 'A mineral crystal polyhedron has 12 vertices and 30 edges. Using Euler\'s formula F + V - E = 2, how many faces does it have?',
    options: [
      '20 faces',
      '18 faces',
      '22 faces',
      '16 faces'
    ],
    correctAnswer: '20 faces',
    explanation: 'Euler\'s formula: F + V - E = 2 => F + 12 - 30 = 2 => F - 18 = 2 => F = 2 + 18 = 20 faces (an icosahedron).',
    socraticHint: 'Use F = 2 + E - V. What is 2 + 30 - 12?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-010',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Why does a flat pattern of 5 connected squares in a single straight row NOT form a closed cube when folded?',
    text: 'Why does a flat pattern of 5 connected squares in a single straight row NOT form a closed cube when folded?',
    options: [
      'It has a strip of 5 consecutive squares, causing two faces to overlap when folded',
      'A cube has only 5 faces',
      'Squares cannot fold at 90°',
      'The net must have 8 faces'
    ],
    correctAnswer: 'It has a strip of 5 consecutive squares, causing two faces to overlap when folded',
    explanation: 'A cube can have at most 4 connected squares in a straight row. A row of 5 squares causes the 1st and 5th squares to overlap onto the same face, leaving one side open.',
    socraticHint: 'A cube can only have at most 4 connected squares in a straight row to fold into 4 walls without overlapping.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-011',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cube\'s net is drawn on cardboard. If each square face has an edge length of 8 cm, what is the total surface area of the cube?',
    text: 'A cube\'s net is drawn on cardboard. If each square face has an edge length of 8 cm, what is the total surface area of the cube?',
    options: [
      '384 cm²',
      '192 cm²',
      '512 cm²',
      '256 cm²'
    ],
    correctAnswer: '384 cm²',
    explanation: 'Area of 1 face = 8 x 8 = 64 cm². Total surface area of 6 faces = 6 x 64 = 384 cm².',
    socraticHint: 'Find the area of one square face (8 x 8 = 64) and multiply by all 6 faces.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-012',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A closed cylindrical tin has radius 7 cm and height 10 cm. Using pi = 22/7, what is its total surface area?',
    text: 'A closed cylindrical tin has radius 7 cm and height 10 cm. Using pi = 22/7, what is its total surface area?',
    options: [
      '748 cm²',
      '440 cm²',
      '308 cm²',
      '1,540 cm²'
    ],
    correctAnswer: '748 cm²',
    explanation: 'Curved surface area = 2 x pi x r x h = 2 x (22/7) x 7 x 10 = 440 cm². Area of 2 circular bases = 2 x (pi x r²) = 2 x ((22/7) x 7 x 7) = 308 cm². Total surface area = 440 + 308 = 748 cm².',
    socraticHint: 'Add the curved surface area (2 pi r h) to the two circular bases (2 pi r²).',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },

  // --- Unit 11: Mission 2 (q-g6-math-u11-013 to 024) ---
  {
    id: 'q-g6-math-u11-013',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What are the coordinates of the origin (the point where the horizontal x-axis and vertical y-axis meet) in the Cartesian plane?',
    text: 'What are the coordinates of the origin (the point where the horizontal x-axis and vertical y-axis meet) in the Cartesian plane?',
    options: [
      '(0, 0)',
      '(1, 1)',
      '(0, 1)',
      '(1, 0)'
    ],
    correctAnswer: '(0, 0)',
    explanation: 'The origin is the reference intersection point of the coordinate axes, designated as (0, 0).',
    socraticHint: 'The starting intersection where both horizontal and vertical values are zero.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-014',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In the ordered pair (4, 7), which coordinate represents the horizontal distance from the y-axis along the x-axis?',
    text: 'In the ordered pair (4, 7), which coordinate represents the horizontal distance from the y-axis along the x-axis?',
    options: [
      '4',
      '7',
      '11',
      '28'
    ],
    correctAnswer: '4',
    explanation: 'In (x, y), the first coordinate is the x-coordinate (4), representing horizontal displacement.',
    socraticHint: 'Coordinates are always written in alphabetical order: (x, y). The first number is x.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-015',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A point P is located 5 units to the right of the origin along the horizontal axis and 3 units upwards along the vertical axis. What are the coordinates of P?',
    text: 'A point P is located 5 units to the right of the origin along the horizontal axis and 3 units upwards along the vertical axis. What are the coordinates of P?',
    options: [
      '(5, 3)',
      '(3, 5)',
      '(5, 0)',
      '(0, 3)'
    ],
    correctAnswer: '(5, 3)',
    explanation: 'Horizontal movement along x is 5, vertical movement along y is 3, yielding (5, 3).',
    socraticHint: 'Write the horizontal movement first, then the vertical movement: (x, y).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-016',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the distance between point A(2, 6) and point B(9, 6) on a Cartesian grid?',
    text: 'What is the distance between point A(2, 6) and point B(9, 6) on a Cartesian grid?',
    options: [
      '7 units',
      '6 units',
      '11 units',
      '5 units'
    ],
    correctAnswer: '7 units',
    explanation: 'Both points lie on the horizontal line y = 6. Distance = 9 - 2 = 7 units.',
    socraticHint: 'Since both points have the same y-coordinate (6), subtract the smaller x-coordinate from the larger: 9 - 2.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-017',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the distance between point C(4, 1) and point D(4, 9) on a Cartesian grid?',
    text: 'What is the distance between point C(4, 1) and point D(4, 9) on a Cartesian grid?',
    options: [
      '8 units',
      '4 units',
      '10 units',
      '5 units'
    ],
    correctAnswer: '8 units',
    explanation: 'Both points lie on the vertical line x = 4. Distance = 9 - 1 = 8 units.',
    socraticHint: 'Since both points have the same x-coordinate (4), subtract the y-coordinates: 9 - 1.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-018',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangle has vertices at (1, 1), (7, 1), (7, 5), and (1, 5). What is its perimeter?',
    text: 'A rectangle has vertices at (1, 1), (7, 1), (7, 5), and (1, 5). What is its perimeter?',
    options: [
      '20 units',
      '24 units',
      '10 units',
      '12 units'
    ],
    correctAnswer: '20 units',
    explanation: 'Length = 7 - 1 = 6 units. Width = 5 - 1 = 4 units. Perimeter = 2 x (6 + 4) = 2 x 10 = 20 units.',
    socraticHint: 'Find the length (7 - 1 = 6) and the width (5 - 1 = 4), then calculate 2 x (length + width).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-019',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the area of the rectangle with vertices (1, 1), (7, 1), (7, 5), and (1, 5)?',
    text: 'What is the area of the rectangle with vertices (1, 1), (7, 1), (7, 5), and (1, 5)?',
    options: [
      '24 square units',
      '20 square units',
      '35 square units',
      '12 square units'
    ],
    correctAnswer: '24 square units',
    explanation: 'Length = 6 units, Width = 4 units. Area = Length x Width = 6 x 4 = 24 square units.',
    socraticHint: 'Multiply the length by the width: 6 x 4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-020',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A right-angled triangle has vertices at (2, 2), (8, 2), and (2, 7). What is its area?',
    text: 'A right-angled triangle has vertices at (2, 2), (8, 2), and (2, 7). What is its area?',
    options: [
      '15 square units',
      '30 square units',
      '11 square units',
      '18 square units'
    ],
    correctAnswer: '15 square units',
    explanation: 'Base = 8 - 2 = 6 units. Height = 7 - 2 = 5 units. Area = 1/2 x base x height = 1/2 x 6 x 5 = 15 square units.',
    socraticHint: 'The horizontal base is 8 - 2 = 6, and the vertical height is 7 - 2 = 5. Use A = 1/2 b h.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-021',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three vertices of a rectangle are A(3, 2), B(9, 2), and C(9, 6). What are the coordinates of the fourth vertex D?',
    text: 'Three vertices of a rectangle are A(3, 2), B(9, 2), and C(9, 6). What are the coordinates of the fourth vertex D?',
    options: [
      '(3, 6)',
      '(6, 3)',
      '(3, 2)',
      '(6, 9)'
    ],
    correctAnswer: '(3, 6)',
    explanation: 'Vertex D must align vertically with A (x = 3) and horizontally with C (y = 6), giving D(3, 6).',
    socraticHint: 'In a rectangle, opposite vertical sides share the same horizontal coordinate (x = 3) and opposite horizontal sides share the same vertical coordinate (y = 6).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-022',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Point P(2, 4) is translated 3 units to the right and 2 units upwards. What are its new coordinates?',
    text: 'Point P(2, 4) is translated 3 units to the right and 2 units upwards. What are its new coordinates?',
    options: [
      '(5, 6)',
      '(6, 5)',
      '(5, 2)',
      '(2, 7)'
    ],
    correctAnswer: '(5, 6)',
    explanation: 'New x = 2 + 3 = 5. New y = 4 + 2 = 6. Translated point = (5, 6).',
    socraticHint: 'Add 3 to the x-coordinate and add 2 to the y-coordinate.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-023',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Point M(4, 5) is reflected in the horizontal line y = 3. What are the coordinates of the reflected image M\'?',
    text: 'Point M(4, 5) is reflected in the horizontal line y = 3. What are the coordinates of the reflected image M\'?',
    options: [
      '(4, 1)',
      '(4, 2)',
      '(2, 5)',
      '(4, -1)'
    ],
    correctAnswer: '(4, 1)',
    explanation: 'Point M is 2 units above y = 3 (5 - 3 = 2). Its reflected image is 2 units below y = 3 (3 - 2 = 1). The x-coordinate remains 4, yielding (4, 1).',
    socraticHint: 'Point M is 2 units above the line y = 3. The reflected image must be 2 units directly below the line y = 3.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },
  {
    id: 'q-g6-math-u11-024',
    subStrandId: 'substrand-g6-math-u11',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What are the coordinates of the midpoint between point J(2, 5) and point K(8, 5)?',
    text: 'What are the coordinates of the midpoint between point J(2, 5) and point K(8, 5)?',
    options: [
      '(5, 5)',
      '(6, 5)',
      '(10, 5)',
      '(5, 10)'
    ],
    correctAnswer: '(5, 5)',
    explanation: 'Midpoint x = (2 + 8) / 2 = 10 / 2 = 5. Midpoint y = 5. Midpoint coordinates = (5, 5).',
    socraticHint: 'Find the average of the x-coordinates: (2 + 8) / 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U11'
  },

  // --- Unit 12: Mission 1 (q-g6-math-u12-001 to 012) ---
  {
    id: 'q-g6-math-u12-001',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Five Grade 6 pupils scored 72, 85, 68, 90, and 75 in a mathematics assessment test. What was their mean score?',
    text: 'Five Grade 6 pupils scored 72, 85, 68, 90, and 75 in a mathematics assessment test. What was their mean score?',
    options: [
      '78',
      '80',
      '75',
      '76'
    ],
    correctAnswer: '78',
    explanation: 'Sum of scores = 72 + 85 + 68 + 90 + 75 = 390. Mean = 390 / 5 = 78.',
    socraticHint: 'Add all five scores together and divide by 5.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-002',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the median of the following set of daily egg counts from a poultry farm: 14, 22, 18, 25, 12, 19, 16?',
    text: 'What is the median of the following set of daily egg counts from a poultry farm: 14, 22, 18, 25, 12, 19, 16?',
    options: [
      '18',
      '19',
      '16',
      '22'
    ],
    correctAnswer: '18',
    explanation: 'Arranged in ascending order: 12, 14, 16, 18, 19, 22, 25. The middle value (4th of 7 items) is 18.',
    socraticHint: 'First arrange the 7 numbers in ascending order from smallest to largest, then pick the middle number.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-003',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the median of this data set: 8, 12, 15, 19, 23, 27?',
    text: 'What is the median of this data set: 8, 12, 15, 19, 23, 27?',
    options: [
      '17',
      '16',
      '18',
      '15'
    ],
    correctAnswer: '17',
    explanation: 'There are 6 items (even number). The two middle values are 15 and 19. Median = (15 + 19) / 2 = 34 / 2 = 17.',
    socraticHint: 'When there is an even number of values, add the two middle numbers (15 and 19) and divide by 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-004',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A shoe store in Eldoret recorded shoe sizes sold in one afternoon: 38, 40, 39, 41, 40, 42, 40, 39. What is the modal shoe size?',
    text: 'A shoe store in Eldoret recorded shoe sizes sold in one afternoon: 38, 40, 39, 41, 40, 42, 40, 39. What is the modal shoe size?',
    options: [
      '40',
      '39',
      '41',
      '38'
    ],
    correctAnswer: '40',
    explanation: 'The number 40 occurs 3 times, which is more frequent than any other shoe size. Mode = 40.',
    socraticHint: 'The mode is the value that appears most frequently in the data.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-005',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The daily maximum temperatures recorded in Lodwar over one week were: 34°C, 38°C, 36°C, 41°C, 35°C, 39°C, 37°C. What is the range of the temperatures?',
    text: 'The daily maximum temperatures recorded in Lodwar over one week were: 34°C, 38°C, 36°C, 41°C, 35°C, 39°C, 37°C. What is the range of the temperatures?',
    options: [
      '7°C',
      '8°C',
      '6°C',
      '37°C'
    ],
    correctAnswer: '7°C',
    explanation: 'Range = Highest value - Lowest value = 41°C - 34°C = 7°C.',
    socraticHint: 'Range is the difference between the highest value (41) and the lowest value (34).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-006',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The mean of four numbers 15, 22, 18, and x is 20. What is the value of x?',
    text: 'The mean of four numbers 15, 22, 18, and x is 20. What is the value of x?',
    options: [
      '25',
      '23',
      '20',
      '27'
    ],
    correctAnswer: '25',
    explanation: 'Sum of the four numbers = 4 x 20 = 80. Sum of three known numbers = 15 + 22 + 18 = 55. x = 80 - 55 = 25.',
    socraticHint: 'The four numbers must add up to 4 x 20 = 80. Subtract the sum of the three known numbers from 80.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-007',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a primary school of 720 pupils, 180 participate in athletics. What angle represents athletics on a circular pie chart?',
    text: 'In a primary school of 720 pupils, 180 participate in athletics. What angle represents athletics on a circular pie chart?',
    options: [
      '90°',
      '45°',
      '120°',
      '60°'
    ],
    correctAnswer: '90°',
    explanation: 'Sector angle = (180 / 720) x 360° = (1 / 4) x 360° = 90°.',
    socraticHint: 'Find what fraction 180 is out of 720, then multiply by 360°.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-008',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'On a pie chart displaying agricultural land use, tea farming is represented by a sector of 144 degrees. If the total farm size is 50 hectares, how many hectares are under tea?',
    text: 'On a pie chart displaying agricultural land use, tea farming is represented by a sector of 144 degrees. If the total farm size is 50 hectares, how many hectares are under tea?',
    options: [
      '20 hectares',
      '25 hectares',
      '15 hectares',
      '14.4 hectares'
    ],
    correctAnswer: '20 hectares',
    explanation: 'Hectares under tea = (144 / 360) x 50 = (2 / 5) x 50 = 20 hectares.',
    socraticHint: 'Divide 144° by 360° (which simplifies to 2/5), then multiply by 50.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-009',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A frequency table shows football goals scored: 0 goals (2 matches), 1 goal (4 matches), 2 goals (3 matches), 3 goals (1 match). What is the total number of goals scored across all matches?',
    text: 'A frequency table shows football goals scored: 0 goals (2 matches), 1 goal (4 matches), 2 goals (3 matches), 3 goals (1 match). What is the total number of goals scored across all matches?',
    options: [
      '13 goals',
      '10 goals',
      '6 goals',
      '12 goals'
    ],
    correctAnswer: '13 goals',
    explanation: 'Total goals = (0 x 2) + (1 x 4) + (2 x 3) + (3 x 1) = 0 + 4 + 6 + 3 = 13 goals.',
    socraticHint: 'Multiply each goal number by its frequency and add the products: (0 x 2) + (1 x 4) + (2 x 3) + (3 x 1).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-010',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Using the football data from question 9 (13 total goals across 10 matches), what was the mean number of goals scored per match?',
    text: 'Using the football data from question 9 (13 total goals across 10 matches), what was the mean number of goals scored per match?',
    options: [
      '1.3 goals',
      '1.5 goals',
      '1.0 goals',
      '1.8 goals'
    ],
    correctAnswer: '1.3 goals',
    explanation: 'Total matches = 2 + 4 + 3 + 1 = 10 matches. Mean goals per match = 13 / 10 = 1.3 goals.',
    socraticHint: 'Divide the total goals (13) by the total number of matches (10).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-011',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'In a statistical tally chart, four vertical tally marks crossed by a fifth diagonal stroke represent what count?',
    text: 'In a statistical tally chart, four vertical tally marks crossed by a fifth diagonal stroke represent what count?',
    options: [
      '5',
      '4',
      '6',
      '10'
    ],
    correctAnswer: '5',
    explanation: 'In tallying, a bundle consists of four vertical strokes crossed by one diagonal stroke to represent 5.',
    socraticHint: 'In standard tallying, a diagonal slash across four bars completes a bundle of 5.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-012',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A bar graph records rainfall in Kitale: February had 60 mm, while April had 180 mm. By how many millimetres did rainfall increase between February and April?',
    text: 'A bar graph records rainfall in Kitale: February had 60 mm, while April had 180 mm. By how many millimetres did rainfall increase between February and April?',
    options: [
      '120 mm',
      '70 mm',
      '140 mm',
      '110 mm'
    ],
    correctAnswer: '120 mm',
    explanation: 'Rainfall increase = April (180 mm) - February (60 mm) = 120 mm.',
    socraticHint: 'Subtract the February rainfall (60 mm) from the April rainfall (180 mm).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },

  // --- Unit 12: Mission 2 (q-g6-math-u12-013 to 024) ---
  {
    id: 'q-g6-math-u12-013',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the theoretical probability of tossing a fair coin and obtaining a \'Head\'?',
    text: 'What is the theoretical probability of tossing a fair coin and obtaining a \'Head\'?',
    options: [
      '1/2',
      '1/4',
      '1',
      '0'
    ],
    correctAnswer: '1/2',
    explanation: 'There is 1 favorable outcome (Head) out of 2 possible equally likely outcomes (Head, Tail). Probability = 1/2.',
    socraticHint: 'There is 1 favorable outcome (Heads) out of 2 possible outcomes (Heads or Tails).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-014',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A standard six-sided die has faces numbered 1 to 6. What is the probability of rolling an even number (2, 4, or 6)?',
    text: 'A standard six-sided die has faces numbered 1 to 6. What is the probability of rolling an even number (2, 4, or 6)?',
    options: [
      '1/2',
      '1/3',
      '1/6',
      '2/3'
    ],
    correctAnswer: '1/2',
    explanation: 'There are 3 even numbers (2, 4, 6) out of 6 possible faces. Probability = 3 / 6 = 1/2.',
    socraticHint: 'Three out of the six faces are even numbers: 3/6 simplifies to what?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-015',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A bag contains 4 red beads, 5 green beads, and 6 yellow beads. If one bead is picked at random without looking, what is the probability that it is green?',
    text: 'A bag contains 4 red beads, 5 green beads, and 6 yellow beads. If one bead is picked at random without looking, what is the probability that it is green?',
    options: [
      '1/3',
      '1/5',
      '5/11',
      '2/3'
    ],
    correctAnswer: '1/3',
    explanation: 'Total beads = 4 + 5 + 6 = 15 beads. Probability of picking green = 5 / 15 = 1/3.',
    socraticHint: 'Find the total number of beads (4 + 5 + 6 = 15), then divide the number of green beads by 15.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-016',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is the probability of an impossible event that cannot occur under any circumstances?',
    text: 'What is the probability of an impossible event that cannot occur under any circumstances?',
    options: [
      '0',
      '1',
      '1/2',
      '-1'
    ],
    correctAnswer: '0',
    explanation: 'An impossible event has a probability of 0, while an event that is absolutely certain has a probability of 1.',
    socraticHint: 'A certain event has probability 1, while an event that cannot happen has probability zero.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-017',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Solve for y in the linear equation: y + 17 = 42.',
    text: 'Solve for y in the linear equation: y + 17 = 42.',
    options: [
      '25',
      '59',
      '24',
      '35'
    ],
    correctAnswer: '25',
    explanation: 'Subtract 17 from both sides: y = 42 - 17 = 25.',
    socraticHint: 'Subtract 17 from both sides of the equation: 42 - 17.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-018',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Solve for x in the equation: 3x + 8 = 29.',
    text: 'Solve for x in the equation: 3x + 8 = 29.',
    options: [
      '7',
      '6',
      '8',
      '9'
    ],
    correctAnswer: '7',
    explanation: '3x + 8 = 29 => 3x = 29 - 8 => 3x = 21 => x = 21 / 3 = 7.',
    socraticHint: 'First subtract 8 from 29 to get 3x = 21, then divide by 3.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-019',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Solve for m in the equation: (m / 4) - 3 = 5.',
    text: 'Solve for m in the equation: (m / 4) - 3 = 5.',
    options: [
      '32',
      '28',
      '8',
      '16'
    ],
    correctAnswer: '32',
    explanation: '(m / 4) - 3 = 5 => m / 4 = 5 + 3 => m / 4 = 8 => m = 8 x 4 = 32.',
    socraticHint: 'First add 3 to both sides to get m / 4 = 8, then multiply by 4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-020',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Juma had k shillings. His father gave him KES 150, and he now has KES 400. Which algebraic equation correctly represents this statement?',
    text: 'Juma had k shillings. His father gave him KES 150, and he now has KES 400. Which algebraic equation correctly represents this statement?',
    options: [
      'k + 150 = 400',
      'k - 150 = 400',
      '150k = 400',
      'k / 150 = 400'
    ],
    correctAnswer: 'k + 150 = 400',
    explanation: 'Adding 150 to Juma\'s initial money k results in a total of 400: k + 150 = 400 (so k = 250).',
    socraticHint: 'Adding 150 to Juma\'s original money k gives a total of 400.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-021',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Three identical exercise books and a pen costing KES 25 cost a total of KES 145. What is the cost of one exercise book?',
    text: 'Three identical exercise books and a pen costing KES 25 cost a total of KES 145. What is the cost of one exercise book?',
    options: [
      'KES 40',
      'KES 45',
      'KES 35',
      'KES 50'
    ],
    correctAnswer: 'KES 40',
    explanation: 'Equation: 3b + 25 = 145 => 3b = 145 - 25 = 120 => b = 120 / 3 = KES 40 per book.',
    socraticHint: 'Subtract the pen\'s price (25) from the total (145) to get 120, then divide by 3 books.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-022',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Simplify the algebraic expression: 4a + 7b + 2a - 3b.',
    text: 'Simplify the algebraic expression: 4a + 7b + 2a - 3b.',
    options: [
      '6a + 4b',
      '6a + 10b',
      '2a + 4b',
      '10ab'
    ],
    correctAnswer: '6a + 4b',
    explanation: 'Collecting like terms: (4a + 2a) + (7b - 3b) = 6a + 4b.',
    socraticHint: 'Group like terms together: (4a + 2a) and (7b - 3b).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-023',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangle has length (2x + 3) cm and width (x + 1) cm. What is the simplified algebraic expression for its perimeter?',
    text: 'A rectangle has length (2x + 3) cm and width (x + 1) cm. What is the simplified algebraic expression for its perimeter?',
    options: [
      '6x + 8 cm',
      '3x + 4 cm',
      '6x + 4 cm',
      '4x + 6 cm'
    ],
    correctAnswer: '6x + 8 cm',
    explanation: 'Perimeter = 2 x [length + width] = 2 x [(2x + 3) + (x + 1)] = 2 x (3x + 4) = 6x + 8 cm.',
    socraticHint: 'Add length and width (2x + 3 + x + 1 = 3x + 4), then multiply the entire sum by 2.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
  },
  {
    id: 'q-g6-math-u12-024',
    subStrandId: 'substrand-g6-math-u12',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The probability that it will rain in Nairobi tomorrow is 3/10. What is the probability that it will NOT rain tomorrow?',
    text: 'The probability that it will rain in Nairobi tomorrow is 3/10. What is the probability that it will NOT rain tomorrow?',
    options: [
      '7/10',
      '3/10',
      '1/10',
      '10/7'
    ],
    correctAnswer: '7/10',
    explanation: 'P(Not rain) = 1 - P(Rain) = 1 - (3/10) = 7/10.',
    socraticHint: 'The probability of an event NOT happening is 1 - P(event). Subtract 3/10 from 1.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U12'
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
console.log('Batch 6 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
