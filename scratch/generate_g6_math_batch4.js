import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Mathematics Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-math-u7',
    strandId: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    title: 'Volume, Capacity, Mass & Density Conversions',
    description: 'Calculating volume of cubes, cuboids, cylinders (V = pi r^2 h) and prisms; interconverting metric units of volume and capacity (1 L = 1,000 cm^3, 1 m^3 = 1,000 L); converting mass units (tonnes, kg, g); and solving practical packaging and haulage problems.',
    cbeCompetency: 'Three-dimensional spatial visualization, fluid metric conversion, commercial mass estimation, and haulage logistics planning',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g6-math-u8',
    strandId: 'strand-g6-math-measurement',
    learningAreaId: 'la-math-g6',
    title: 'Time, 24-Hour Clock, Speed, Distance & Travel Graphs',
    description: 'Reading and converting between 12-hour and 24-hour clock systems; calculating journey durations across midnight and interpreting bus and train timetables; calculating speed, distance, and time (S = D/T); converting between km/h and m/s; and interpreting travel graphs.',
    cbeCompetency: 'Temporal literacy, timetable navigation, kinematics problem solving, rate interpretation, and graphical data analysis',
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
    id: 'lesson-g6-math-u7-l1',
    subStrandId: 'substrand-g6-math-u7',
    title: 'Volume of Cubes, Cuboids & Cylinders (V = pi r^2 h)',
    content: 'Volume is the amount of three-dimensional space enclosed inside a solid figure, measured in cubic units (cm^3, m^3).\n\n1. Volume of a Cube:\n- Formula: Volume = s^3 = s x s x s, where s is side length.\n\n2. Volume of a Cuboid:\n- Formula: Volume = length x width x height (V = l x w x h) = Base Area x height.\n\n3. Volume of a Cylinder:\n- A cylinder has a circular base of area pi x r^2.\n- Formula: Volume = pi x r^2 x h.\n- Important: If diameter d is provided, always find radius r = d / 2 before squaring!\n\n4. Scaling Properties:\n- If every linear dimension of a 3D solid is doubled (multiplied by 2), the volume increases by 2^3 = 8 times!',
    didYouKnow: 'A cylindrical water tank with radius 70 cm and height 100 cm holds over 1.5 million cubic centimetres (1,540,000 cm^3) of water!',
    kenyanContext: 'Contractors building water storage tanks in Kitui calculate volume using V = pi r^2 h to ensure community reservoirs hold sufficient rainwater during dry seasons.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u7-l2',
    subStrandId: 'substrand-g6-math-u7',
    title: 'Capacity, Mass & Metric Conversions (Litres, cm^3, m^3, Tonnes & kg)',
    content: 'Capacity measures the volume of liquid a container holds, while mass measures the quantity of matter in an object.\n\n1. Key Volume and Capacity Conversions:\n- 1 Litre (L) = 1,000 cubic centimetres (cm^3).\n- 1 cubic metre (m^3) = 1,000 Litres (L) = 1,000,000 cm^3.\n- 1 millilitre (mL) = 1 cm^3.\n\n2. Mass Conversions and Concepts:\n- 1 tonne = 1,000 kilograms (kg).\n- 1 kilogram (kg) = 1,000 grams (g).\n- Density of water: 1 Litre of pure water has a mass of exactly 1 kilogram!\n- Gross Mass = Net Mass + Tare Mass (mass of empty container).',
    didYouKnow: 'One cubic metre of water (1 m^3) is exactly 1,000 litres and weighs exactly 1 metric tonne (1,000 kg)!',
    kenyanContext: 'At the National Cereals and Produce Board (NCPB) depot in Eldoret, lorries carrying maize are weighed on a weighbridge in tonnes and offloaded into standard 50 kg sacks (1 tonne = 20 sacks).',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u8-l1',
    subStrandId: 'substrand-g6-math-u8',
    title: '12-Hour vs 24-Hour Clock & SGR/Bus Timetables',
    content: 'Time can be represented using 12-hour clock (with a.m. and p.m.) or the international 24-hour clock (four digits without a.m./p.m.).\n\n1. Conversion Rules:\n- Midnight = 0000 h (or 2400 h); Noon = 1200 h.\n- For a.m. times (from 1:00 a.m. to 11:59 a.m.): Add a leading zero if needed, e.g. 0415 h.\n- For p.m. times (from 1:00 p.m. to 11:59 p.m.): Add 12 hours to the hour number, e.g. 8:45 p.m. = 2045 h.\n\n2. Journey Durations & Timetables:\n- Durations within same day: Arrival Time - Departure Time.\n- Crossing Midnight: Duration = (2400 h - Departure Time) + Arrival Time next morning.\n\n3. Decimal Time:\n- To convert minutes to decimal hours, divide minutes by 60: 36 min = 36/60 = 0.6 hours.',
    didYouKnow: 'Airlines and Kenya Railways (Madaraka Express) exclusively use the 24-hour clock to completely eliminate any confusion between morning and evening departures!',
    kenyanContext: 'The Madaraka Express passenger train departs Nairobi Terminus at 0800 h and arrives at Mombasa Terminus at 1418 h, taking exactly 6 hours and 18 minutes to complete the 472 km journey.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-math-u8-l2',
    subStrandId: 'substrand-g6-math-u8',
    title: 'Speed, Distance, Time (S = D/T) & Travel Graphs',
    content: 'Speed is the rate at which an object covers distance.\n\n1. Core Formulae:\n- Speed = Distance / Time (S = D / T).\n- Distance = Speed x Time (D = S x T).\n- Time = Distance / Speed (T = D / S).\n\n2. Unit Conversions:\n- From km/h to m/s: Multiply by 5/18 (or multiply by 1,000 and divide by 3,600).\n- From m/s to km/h: Multiply by 18/5.\n- Example: 72 km/h = 72 x (5/18) = 20 m/s.\n\n3. Travel Graphs (Distance-Time Graphs):\n- Vertical axis: Distance from starting point.\n- Horizontal axis: Time taken.\n- Gradient (steepness) represents speed: steeper line = faster speed.\n- Horizontal flat line segment = stationary (object is stopped / resting).',
    didYouKnow: 'Kenyan world record sprinter Ferdinand Omanyala clocks 10 m/s in the 100m sprint, which is equivalent to 36 km/h on a highway!',
    kenyanContext: 'Long-distance buses travelling between Nairobi and Kisumu (360 km) operate at regulated maximum speeds of 80 km/h, taking 4.5 hours of actual driving time.',
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

// 3. Batch 4 Missions (4 missions: orders 73 to 76 in world-math-kingdom)
const missionsToAdd = [
  {
    id: 'mission-g6-math-u7-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u7',
    lessonId: 'lesson-g6-math-u7-l1',
    title: 'Water Tank Volume Engineer Quest',
    description: 'Calculate volumes of cubes, cuboidal storage silos, and cylindrical rainwater tanks using V = pi r^2 h, and solve block packing puzzles!',
    order: 73,
    orderIndex: 73,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-volume-engineer',
    badge: { name: 'Volume Engineer', icon: 'box' },
    questionIds: [
      'q-g6-math-u7-001', 'q-g6-math-u7-002', 'q-g6-math-u7-003', 'q-g6-math-u7-004',
      'q-g6-math-u7-005', 'q-g6-math-u7-006', 'q-g6-math-u7-007', 'q-g6-math-u7-008',
      'q-g6-math-u7-009', 'q-g6-math-u7-010', 'q-g6-math-u7-011', 'q-g6-math-u7-012'
    ]
  },
  {
    id: 'mission-g6-math-u7-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u7',
    lessonId: 'lesson-g6-math-u7-l2',
    title: 'Dairy & Grain Haulage Metric Quest',
    description: 'Convert between litres, cm^3, and m^3, calculate metric tonnes and sack loads, find tare and net masses, and solve tank drainage!',
    order: 74,
    orderIndex: 74,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-metric-navigator',
    badge: { name: 'Metric Navigator', icon: 'truck' },
    questionIds: [
      'q-g6-math-u7-013', 'q-g6-math-u7-014', 'q-g6-math-u7-015', 'q-g6-math-u7-016',
      'q-g6-math-u7-017', 'q-g6-math-u7-018', 'q-g6-math-u7-019', 'q-g6-math-u7-020',
      'q-g6-math-u7-021', 'q-g6-math-u7-022', 'q-g6-math-u7-023', 'q-g6-math-u7-024'
    ]
  },
  {
    id: 'mission-g6-math-u8-m1',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u8',
    lessonId: 'lesson-g6-math-u8-l1',
    title: 'Madaraka Express Timetable Navigator',
    description: 'Master 12-hour and 24-hour clock conversions, calculate overnight bus trip durations, convert decimal hours, and read train schedules!',
    order: 75,
    orderIndex: 75,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-timetable-navigator',
    badge: { name: 'Timetable Navigator', icon: 'clock' },
    questionIds: [
      'q-g6-math-u8-001', 'q-g6-math-u8-002', 'q-g6-math-u8-003', 'q-g6-math-u8-004',
      'q-g6-math-u8-005', 'q-g6-math-u8-006', 'q-g6-math-u8-007', 'q-g6-math-u8-008',
      'q-g6-math-u8-009', 'q-g6-math-u8-010', 'q-g6-math-u8-011', 'q-g6-math-u8-012'
    ]
  },
  {
    id: 'mission-g6-math-u8-m2',
    worldId: 'world-math-kingdom',
    subStrandId: 'substrand-g6-math-u8',
    lessonId: 'lesson-g6-math-u8-l2',
    title: 'Safari Highway Speed & Distance Quest',
    description: 'Calculate average speed, distance, and travel times, convert between km/h and m/s, analyse travel graphs, and solve meeting vehicle problems!',
    order: 76,
    orderIndex: 76,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-g6-velocity-virtuoso',
    badge: { name: 'Velocity Virtuoso', icon: 'zap' },
    questionIds: [
      'q-g6-math-u8-013', 'q-g6-math-u8-014', 'q-g6-math-u8-015', 'q-g6-math-u8-016',
      'q-g6-math-u8-017', 'q-g6-math-u8-018', 'q-g6-math-u8-019', 'q-g6-math-u8-020',
      'q-g6-math-u8-021', 'q-g6-math-u8-022', 'q-g6-math-u8-023', 'q-g6-math-u8-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  if (!db.missions.some(mis => mis.id === m.id)) {
    db.missions.push(m);
    console.log(`Added mission ${m.id}`);
  }
});

// 4. Batch 4 Questions (48 questions: 24 for Unit 7, 24 for Unit 8)
const questionsToAdd = [
  // --- Unit 7: Mission 1 (q-g6-math-u7-001 to 012) ---
  {
    id: 'q-g6-math-u7-001',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cubic water storage tank in Kitui has edge length 1.2 metres. What is its volume in cubic metres?',
    text: 'A cubic water storage tank in Kitui has edge length 1.2 metres. What is its volume in cubic metres?',
    options: [
      '1.728 m³',
      '1.44 m³',
      '3.6 m³',
      '2.4 m³'
    ],
    correctAnswer: '1.728 m³',
    explanation: 'Volume of a cube = s³ = 1.2 x 1.2 x 1.2 = 1.728 m³.',
    socraticHint: 'Volume of a cube with side s is s x s x s = s³. What is 1.2 cubed?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-002',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A grain storage box in Nakuru measures 80 cm long, 50 cm wide, and 40 cm high. What is its volume in cm³?',
    text: 'A grain storage box in Nakuru measures 80 cm long, 50 cm wide, and 40 cm high. What is its volume in cm³?',
    options: [
      '160,000 cm³',
      '16,000 cm³',
      '170 cm³',
      '4,000 cm³'
    ],
    correctAnswer: '160,000 cm³',
    explanation: 'Volume of a cuboid = length x width x height = 80 x 50 x 40 = 160,000 cm³.',
    socraticHint: 'Multiply length by width by height: 80 x 50 x 40.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-003',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cylindrical water tank has radius 70 cm and height 100 cm. Using pi = 22/7, what is its volume in cm³?',
    text: 'A cylindrical water tank has radius 70 cm and height 100 cm. Using pi = 22/7, what is its volume in cm³?',
    options: [
      '1,540,000 cm³',
      '154,000 cm³',
      '44,000 cm³',
      '308,000 cm³'
    ],
    correctAnswer: '1,540,000 cm³',
    explanation: 'Volume of cylinder = pi x r² x h = (22/7) x 70 x 70 x 100 = 22 x 10 x 70 x 100 = 1,540,000 cm³.',
    socraticHint: 'First calculate the base area pi x r², then multiply by height h.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-004',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular pit has a base area of 3 m² and a total volume of 9.6 m³. What is its depth?',
    text: 'A rectangular pit has a base area of 3 m² and a total volume of 9.6 m³. What is its depth?',
    options: [
      '3.2 m',
      '2.8 m',
      '32 m',
      '1.6 m'
    ],
    correctAnswer: '3.2 m',
    explanation: 'Volume = Base Area x depth => depth = Volume / Base Area = 9.6 / 3 = 3.2 m.',
    socraticHint: 'Volume equals base area times depth (V = A x h). Divide volume by base area.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-005',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A carton contains 48 identical soap bars. If each soap bar has a volume of 150 cm³, what is the total volume of soap in the carton?',
    text: 'A carton contains 48 identical soap bars. If each soap bar has a volume of 150 cm³, what is the total volume of soap in the carton?',
    options: [
      '7,200 cm³',
      '72,000 cm³',
      '3,600 cm³',
      '1,920 cm³'
    ],
    correctAnswer: '7,200 cm³',
    explanation: 'Total volume = 48 x 150 cm³ = 7,200 cm³.',
    socraticHint: 'Multiply the number of bars by the volume of a single bar: 48 x 150.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-006',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cylindrical storage drum in Mombasa has a diameter of 140 cm and a height of 150 cm. Using pi = 22/7, what is its volume?',
    text: 'A cylindrical storage drum in Mombasa has a diameter of 140 cm and a height of 150 cm. Using pi = 22/7, what is its volume?',
    options: [
      '2,310,000 cm³',
      '9,240,000 cm³',
      '462,000 cm³',
      '1,540,000 cm³'
    ],
    correctAnswer: '2,310,000 cm³',
    explanation: 'Radius r = 140 / 2 = 70 cm. Volume = pi x r² x h = (22/7) x 70 x 70 x 150 = 15,400 x 150 = 2,310,000 cm³.',
    socraticHint: 'Don\'t forget to halve the diameter to get the radius (r = 70 cm) before using pi r² h!',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-007',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many small cubic blocks of edge 5 cm can fit completely into a rectangular box measuring 30 cm by 20 cm by 15 cm?',
    text: 'How many small cubic blocks of edge 5 cm can fit completely into a rectangular box measuring 30 cm by 20 cm by 15 cm?',
    options: [
      '72 blocks',
      '60 blocks',
      '120 blocks',
      '36 blocks'
    ],
    correctAnswer: '72 blocks',
    explanation: 'Along length: 30 / 5 = 6 blocks. Along width: 20 / 5 = 4 blocks. Along height: 15 / 5 = 3 blocks. Total blocks = 6 x 4 x 3 = 72 blocks.',
    socraticHint: 'How many 5 cm cubes fit along the length, width, and height?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-008',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A concrete culvert has an outer radius of 50 cm and an inner radius of 40 cm. Using pi = 3.14, what is the cross-sectional ring area of the concrete?',
    text: 'A concrete culvert has an outer radius of 50 cm and an inner radius of 40 cm. Using pi = 3.14, what is the cross-sectional ring area of the concrete?',
    options: [
      '2,826 cm²',
      '5,652 cm²',
      '1,413 cm²',
      '900 cm²'
    ],
    correctAnswer: '2,826 cm²',
    explanation: 'Area = pi x (R² - r²) = 3.14 x (50² - 40²) = 3.14 x (2,500 - 1,600) = 3.14 x 900 = 2,826 cm².',
    socraticHint: 'Find R² - r² = 50² - 40² = 2500 - 1600 = 900, then multiply by 3.14.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-009',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cubic water reservoir holds 64 m³ of water when full. What is the length of one side of the reservoir?',
    text: 'A cubic water reservoir holds 64 m³ of water when full. What is the length of one side of the reservoir?',
    options: [
      '4 m',
      '8 m',
      '16 m',
      '2 m'
    ],
    correctAnswer: '4 m',
    explanation: 'For a cube, Volume = s³ => s = cube root of 64 = 4 m (since 4 x 4 x 4 = 64).',
    socraticHint: 'What number multiplied by itself three times (s x s x s) equals 64?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-010',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'If each side of a solid wooden cube is doubled from 3 cm to 6 cm, by what factor does its volume increase?',
    text: 'If each side of a solid wooden cube is doubled from 3 cm to 6 cm, by what factor does its volume increase?',
    options: [
      'It increases by 8 times',
      'It increases by 2 times',
      'It increases by 4 times',
      'It increases by 6 times'
    ],
    correctAnswer: 'It increases by 8 times',
    explanation: 'Initial volume = 3³ = 27 cm³. New volume = 6³ = 216 cm³. 216 / 27 = 8 times. Scaling factor in 3D volume is 2³ = 8.',
    socraticHint: 'Since volume involves length cubed (2³), doubling each dimension multiplies volume by what?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-011',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cattle feed trough has a uniform triangular cross-section of base 60 cm and height 40 cm, and a length of 150 cm. What is its volume?',
    text: 'A cattle feed trough has a uniform triangular cross-section of base 60 cm and height 40 cm, and a length of 150 cm. What is its volume?',
    options: [
      '180,000 cm³',
      '360,000 cm³',
      '90,000 cm³',
      '18,000 cm³'
    ],
    correctAnswer: '180,000 cm³',
    explanation: 'Cross-sectional area = 1/2 x base x height = 1/2 x 60 x 40 = 1,200 cm². Volume = Area x length = 1,200 x 150 = 180,000 cm³.',
    socraticHint: 'Volume of a prism = cross-sectional area times length. Calculate 1/2 x 60 x 40 x 150.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-012',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular tank measuring 2 m long and 1.5 m wide contains 4.5 m³ of water. What is the depth of the water in the tank?',
    text: 'A rectangular tank measuring 2 m long and 1.5 m wide contains 4.5 m³ of water. What is the depth of the water in the tank?',
    options: [
      '1.5 m',
      '1.2 m',
      '2.0 m',
      '3.0 m'
    ],
    correctAnswer: '1.5 m',
    explanation: 'Base area = 2 x 1.5 = 3 m². Depth = Volume / Base Area = 4.5 / 3 = 1.5 m.',
    socraticHint: 'Divide total volume (4.5 m³) by the base area (2 x 1.5 m²).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },

  // --- Unit 7: Mission 2 (q-g6-math-u7-013 to 024) ---
  {
    id: 'q-g6-math-u7-013',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many litres of fresh milk are contained in 5,000 cm³? (1 L = 1,000 cm³)',
    text: 'How many litres of fresh milk are contained in 5,000 cm³? (1 L = 1,000 cm³)',
    options: [
      '5 litres',
      '50 litres',
      '0.5 litres',
      '500 litres'
    ],
    correctAnswer: '5 litres',
    explanation: 'Since 1 litre = 1,000 cm³, Litres = 5,000 / 1,000 = 5 litres.',
    socraticHint: 'Remember that 1 litre = 1,000 cm³. Divide 5,000 by 1,000.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-014',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A community water reservoir in Machakos has a volume of 8.5 m³. How many litres of water does it hold when completely full? (1 m³ = 1,000 L)',
    text: 'A community water reservoir in Machakos has a volume of 8.5 m³. How many litres of water does it hold when completely full? (1 m³ = 1,000 L)',
    options: [
      '8,500 litres',
      '850 litres',
      '85,000 litres',
      '8.5 litres'
    ],
    correctAnswer: '8,500 litres',
    explanation: 'Since 1 m³ = 1,000 litres, Capacity = 8.5 x 1,000 = 8,500 litres.',
    socraticHint: 'One cubic metre (1 m³) contains 1,000 litres. Multiply 8.5 by 1,000.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-015',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cylindrical water tank has radius 70 cm and height 200 cm. Using pi = 22/7, what is its capacity in litres?',
    text: 'A cylindrical water tank has radius 70 cm and height 200 cm. Using pi = 22/7, what is its capacity in litres?',
    options: [
      '3,080 litres',
      '308 litres',
      '30,800 litres',
      '1,540 litres'
    ],
    correctAnswer: '3,080 litres',
    explanation: 'Volume = pi x r² x h = (22/7) x 70 x 70 x 200 = 3,080,000 cm³. Capacity in litres = 3,080,000 / 1,000 = 3,080 litres.',
    socraticHint: 'Find the volume in cm³ first, then divide by 1,000 to convert to litres.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-016',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A lorry delivered 4.75 tonnes of maize to the NCPB depot in Eldoret. How many kilograms is this? (1 tonne = 1,000 kg)',
    text: 'A lorry delivered 4.75 tonnes of maize to the NCPB depot in Eldoret. How many kilograms is this? (1 tonne = 1,000 kg)',
    options: [
      '4,750 kg',
      '475 kg',
      '47,500 kg',
      '4.75 kg'
    ],
    correctAnswer: '4,750 kg',
    explanation: 'Since 1 tonne = 1,000 kg, Mass = 4.75 x 1,000 = 4,750 kg.',
    socraticHint: 'How many kilograms make 1 tonne? Multiply 4.75 by 1,000.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-017',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cooperative in Bungoma harvests 14 tonnes of sugarcane. If packaged into 50 kg sacks, how many sacks will be packed?',
    text: 'A cooperative in Bungoma harvests 14 tonnes of sugarcane. If packaged into 50 kg sacks, how many sacks will be packed?',
    options: [
      '280 sacks',
      '140 sacks',
      '560 sacks',
      '700 sacks'
    ],
    correctAnswer: '280 sacks',
    explanation: '14 tonnes = 14 x 1,000 = 14,000 kg. Number of sacks = 14,000 / 50 = 280 sacks.',
    socraticHint: 'Convert 14 tonnes to kilograms (14 x 1,000), then divide by 50 kg per sack.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-018',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A packet of Kericho tea leaves weighs 250 grams. How many kilograms do 12 such packets weigh in total?',
    text: 'A packet of Kericho tea leaves weighs 250 grams. How many kilograms do 12 such packets weigh in total?',
    options: [
      '3 kg',
      '30 kg',
      '0.3 kg',
      '2.5 kg'
    ],
    correctAnswer: '3 kg',
    explanation: 'Total grams = 12 x 250 g = 3,000 g. Total kg = 3,000 / 1,000 = 3 kg.',
    socraticHint: 'Find the total grams (12 x 250 = 3,000 g) and divide by 1,000.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-019',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A 200-litre drum of cooking oil is repacked into 500-millilitre bottles. How many bottles will be filled? (1 L = 1,000 mL)',
    text: 'A 200-litre drum of cooking oil is repacked into 500-millilitre bottles. How many bottles will be filled? (1 L = 1,000 mL)',
    options: [
      '400 bottles',
      '200 bottles',
      '100 bottles',
      '800 bottles'
    ],
    correctAnswer: '400 bottles',
    explanation: '200 litres = 200 x 1,000 = 200,000 mL. Number of bottles = 200,000 / 500 = 400 bottles.',
    socraticHint: 'How many 500 mL bottles fit into 1 litre? (There are 2 per litre). What is 200 x 2?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-020',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A rectangular household tank measuring 1 m by 0.8 m by 0.5 m is full of fresh water. What is the mass of the water in kilograms? (1 L water = 1 kg)',
    text: 'A rectangular household tank measuring 1 m by 0.8 m by 0.5 m is full of fresh water. What is the mass of the water in kilograms? (1 L water = 1 kg)',
    options: [
      '400 kg',
      '40 kg',
      '4,000 kg',
      '800 kg'
    ],
    correctAnswer: '400 kg',
    explanation: 'Volume = 1 x 0.8 x 0.5 = 0.4 m³. In litres: 0.4 x 1,000 = 400 litres. Since 1 litre of fresh water has a mass of 1 kg, Mass = 400 kg.',
    socraticHint: 'Calculate the volume in m³, convert to litres (1 m³ = 1,000 L), and remember that 1 L of fresh water weighs 1 kg.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-021',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A sack of rice has a gross mass of 50.8 kg. If the empty gunny bag (tare mass) weighs 800 grams (0.8 kg), what is the net mass of the rice?',
    text: 'A sack of rice has a gross mass of 50.8 kg. If the empty gunny bag (tare mass) weighs 800 grams (0.8 kg), what is the net mass of the rice?',
    options: [
      '50 kg',
      '50.0 kg',
      '51.6 kg',
      '42.8 kg'
    ],
    correctAnswer: '50 kg',
    explanation: 'Net mass = Gross mass - Tare mass = 50.8 kg - 0.8 kg = 50 kg.',
    socraticHint: 'Gross mass = Net mass + Tare mass. Subtract 0.8 kg from 50.8 kg.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-022',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A pickup truck in Nyeri is loaded with 15 crates of cabbages weighing 24 kg each and 20 sacks of potatoes weighing 50 kg each. What is the total mass of the load in tonnes?',
    text: 'A pickup truck in Nyeri is loaded with 15 crates of cabbages weighing 24 kg each and 20 sacks of potatoes weighing 50 kg each. What is the total mass of the load in tonnes?',
    options: [
      '1.36 tonnes',
      '13.6 tonnes',
      '1.16 tonnes',
      '1.8 tonnes'
    ],
    correctAnswer: '1.36 tonnes',
    explanation: 'Cabbages = 15 x 24 = 360 kg. Potatoes = 20 x 50 = 1,000 kg. Total kg = 360 + 1,000 = 1,360 kg. In tonnes: 1,360 / 1,000 = 1.36 tonnes.',
    socraticHint: 'Find the total weight in kg (360 + 1000 = 1,360 kg) and divide by 1,000.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-023',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A 5,000-litre school tank loses water at a rate of 12.5 litres per minute through an open tap. How many hours and minutes will it take to drain completely?',
    text: 'A 5,000-litre school tank loses water at a rate of 12.5 litres per minute through an open tap. How many hours and minutes will it take to drain completely?',
    options: [
      '6 hours 40 minutes',
      '6 hours 20 minutes',
      '4 hours',
      '8 hours'
    ],
    correctAnswer: '6 hours 40 minutes',
    explanation: 'Total minutes = 5,000 / 12.5 = 400 minutes. 400 / 60 = 6 hours with a remainder of 40 minutes (6 hours 40 minutes).',
    socraticHint: 'First divide 5,000 by 12.5 to find total minutes, then divide by 60 to convert to hours and minutes.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },
  {
    id: 'q-g6-math-u7-024',
    subStrandId: 'substrand-g6-math-u7',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Chemutai mixes 2.45 litres of clean water with 750 mL of concentrated fruit juice. What is the total volume of juice mixture in litres?',
    text: 'Chemutai mixes 2.45 litres of clean water with 750 mL of concentrated fruit juice. What is the total volume of juice mixture in litres?',
    options: [
      '3.2 litres',
      '3.25 litres',
      '9.95 litres',
      '3.15 litres'
    ],
    correctAnswer: '3.2 litres',
    explanation: '750 mL = 750 / 1,000 = 0.75 litres. Total volume = 2.45 + 0.75 = 3.2 litres.',
    socraticHint: 'Convert 750 mL to litres by dividing by 1,000 (0.75 L), then add to 2.45 L.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U7'
  },

  // --- Unit 8: Mission 1 (q-g6-math-u8-001 to 012) ---
  {
    id: 'q-g6-math-u8-001',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is 8:45 p.m. written in the 24-hour clock system?',
    text: 'What is 8:45 p.m. written in the 24-hour clock system?',
    options: [
      '2045 h',
      '0845 h',
      '1845 h',
      '2145 h'
    ],
    correctAnswer: '2045 h',
    explanation: 'For p.m. times in the 24-hour clock, add 12 hours: 8:45 + 12:00 = 2045 h.',
    socraticHint: 'For p.m. times in the 24-hour clock, add 12 hours to the hour value: 8 + 12 = 20.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-002',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An express bus from Kisumu arrives in Nairobi at 0415 h. What time is this in the 12-hour clock system?',
    text: 'An express bus from Kisumu arrives in Nairobi at 0415 h. What time is this in the 12-hour clock system?',
    options: [
      '4:15 a.m.',
      '4:15 p.m.',
      '2:15 p.m.',
      '16:15 a.m.'
    ],
    correctAnswer: '4:15 a.m.',
    explanation: 'Times with hours less than 12 in the 24-hour clock represent morning hours (a.m.): 0415 h = 4:15 a.m.',
    socraticHint: 'Hours between 0000 h and 1159 h represent morning (a.m.) times.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-003',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is midnight (12:00 midnight) represented as in the 24-hour clock?',
    text: 'What is midnight (12:00 midnight) represented as in the 24-hour clock?',
    options: [
      '0000 h (or 2400 h)',
      '1200 h',
      '0100 h',
      '1200 p.m.'
    ],
    correctAnswer: '0000 h (or 2400 h)',
    explanation: 'In the 24-hour clock system, midnight is written as 0000 h at the start of the day or 2400 h at the end of the day.',
    socraticHint: 'The 24-hour day begins at zero hours and zero minutes.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-004',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'The Madaraka Express passenger train departs Nairobi Terminus at 0800 h and arrives at Mombasa Terminus at 1418 h. What was the journey duration?',
    text: 'The Madaraka Express passenger train departs Nairobi Terminus at 0800 h and arrives at Mombasa Terminus at 1418 h. What was the journey duration?',
    options: [
      '6 hours 18 minutes',
      '6 hours 42 minutes',
      '5 hours 18 minutes',
      '7 hours 18 minutes'
    ],
    correctAnswer: '6 hours 18 minutes',
    explanation: 'Duration = Arrival time - Departure time = 1418 h - 0800 h = 6 hours 18 minutes.',
    socraticHint: 'Subtract the departure time (0800) from the arrival time (1418).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-005',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An overnight bus departed Busia at 2130 h and reached Nairobi at 0545 h the following morning. How long did the trip take?',
    text: 'An overnight bus departed Busia at 2130 h and reached Nairobi at 0545 h the following morning. How long did the trip take?',
    options: [
      '8 hours 15 minutes',
      '7 hours 45 minutes',
      '8 hours 45 minutes',
      '9 hours 15 minutes'
    ],
    correctAnswer: '8 hours 15 minutes',
    explanation: 'Time before midnight: 2400 h - 2130 h = 2 hours 30 minutes. Time after midnight: 5 hours 45 minutes. Total duration = 2 h 30 min + 5 h 45 min = 7 h 75 min = 8 hours 15 minutes.',
    socraticHint: 'How much time is between 2130 h and midnight (2400 h)? Add that to the 5 h 45 min after midnight.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-006',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An end-of-term mathematics exam started at 10:45 a.m. and lasted for 2 hours and 35 minutes. At what time did the exam end in 12-hour format?',
    text: 'An end-of-term mathematics exam started at 10:45 a.m. and lasted for 2 hours and 35 minutes. At what time did the exam end in 12-hour format?',
    options: [
      '1:20 p.m.',
      '1:15 p.m.',
      '12:20 p.m.',
      '2:20 p.m.'
    ],
    correctAnswer: '1:20 p.m.',
    explanation: '10:45 + 2 hours = 12:45 p.m. Adding 35 minutes: 12:45 + 15 min = 1:00 p.m., plus remaining 20 min = 1:20 p.m.',
    socraticHint: 'Add 2 hours to 10:45 to get 12:45. Then add 35 minutes (note that 60 minutes make an hour).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-007',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A commuter train timetable shows that the train departs Ngong station at 0735 h and arrives at Syokimau station at 0815 h. How many minutes does the trip take?',
    text: 'A commuter train timetable shows that the train departs Ngong station at 0735 h and arrives at Syokimau station at 0815 h. How many minutes does the trip take?',
    options: [
      '40 minutes',
      '25 minutes',
      '65 minutes',
      '50 minutes'
    ],
    correctAnswer: '40 minutes',
    explanation: 'From 0735 h to 0800 h is 25 minutes. From 0800 h to 0815 h is 15 minutes. Total = 25 + 15 = 40 minutes.',
    socraticHint: 'How many minutes from 0735 h to 0800 h? Add that to the 15 minutes after 0800 h.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-008',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How is 3 hours and 36 minutes expressed as decimal hours?',
    text: 'How is 3 hours and 36 minutes expressed as decimal hours?',
    options: [
      '3.6 hours',
      '3.36 hours',
      '3.66 hours',
      '3.5 hours'
    ],
    correctAnswer: '3.6 hours',
    explanation: '36 minutes in hours = 36 / 60 = 6 / 10 = 0.6 hours. Therefore, 3 hours 36 minutes = 3.6 hours.',
    socraticHint: 'Divide 36 minutes by 60 to convert the minutes into a decimal fraction of an hour.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-009',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A scheduled flight from Nairobi to Entebbe takes 1.75 hours. How long is this in hours and minutes?',
    text: 'A scheduled flight from Nairobi to Entebbe takes 1.75 hours. How long is this in hours and minutes?',
    options: [
      '1 hour 45 minutes',
      '1 hour 75 minutes',
      '1 hour 35 minutes',
      '2 hours 15 minutes'
    ],
    correctAnswer: '1 hour 45 minutes',
    explanation: '0.75 hours = 0.75 x 60 minutes = 45 minutes. So 1.75 hours = 1 hour 45 minutes.',
    socraticHint: 'What is 0.75 (or three-quarters) of 60 minutes?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-010',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A plane landed at JKIA Nairobi at 1720 h after a flight lasting 3 hours and 45 minutes. At what time had the plane departed?',
    text: 'A plane landed at JKIA Nairobi at 1720 h after a flight lasting 3 hours and 45 minutes. At what time had the plane departed?',
    options: [
      '1335 h',
      '1405 h',
      '1345 h',
      '1235 h'
    ],
    correctAnswer: '1335 h',
    explanation: 'Departure = 17 h 20 min - 3 h 45 min. Borrowing 1 hour (60 min): 16 h 80 min - 3 h 45 min = 13 h 35 min = 1335 h.',
    socraticHint: 'Borrow 1 hour (60 minutes) from 17 hours to make 16 h 80 min, then subtract 3 h 45 min.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-011',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An athlete completed an 800-metre race in 108 seconds. What is this time in minutes and seconds?',
    text: 'An athlete completed an 800-metre race in 108 seconds. What is this time in minutes and seconds?',
    options: [
      '1 minute 48 seconds',
      '1 minute 8 seconds',
      '2 minutes 8 seconds',
      '1 minute 38 seconds'
    ],
    correctAnswer: '1 minute 48 seconds',
    explanation: '108 seconds = 60 seconds + 48 seconds = 1 minute 48 seconds.',
    socraticHint: 'How many 60s fit into 108? What is the remainder?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-012',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A bus arrived at a stage at 11:28 a.m. and departed at 12:05 p.m. For how many minutes did the bus stop at the stage?',
    text: 'A bus arrived at a stage at 11:28 a.m. and departed at 12:05 p.m. For how many minutes did the bus stop at the stage?',
    options: [
      '37 minutes',
      '47 minutes',
      '27 minutes',
      '33 minutes'
    ],
    correctAnswer: '37 minutes',
    explanation: 'From 11:28 a.m. to 12:00 noon is 32 minutes. From 12:00 noon to 12:05 p.m. is 5 minutes. Total = 32 + 5 = 37 minutes.',
    socraticHint: 'How many minutes until 12:00? Then add the 5 minutes past 12:00.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },

  // --- Unit 8: Mission 2 (q-g6-math-u8-013 to 024) ---
  {
    id: 'q-g6-math-u8-013',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A matatu travels from Nakuru to Naivasha, a distance of 70 km, in 1 hour. What is its average speed in km/h?',
    text: 'A matatu travels from Nakuru to Naivasha, a distance of 70 km, in 1 hour. What is its average speed in km/h?',
    options: [
      '70 km/h',
      '60 km/h',
      '80 km/h',
      '140 km/h'
    ],
    correctAnswer: '70 km/h',
    explanation: 'Speed = Distance / Time = 70 km / 1 h = 70 km/h.',
    socraticHint: 'Speed is distance divided by time (S = D / T).',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-014',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A delivery truck travels at an average speed of 65 km/h for 4 hours from Nairobi to Nanyuki. What distance did it cover?',
    text: 'A delivery truck travels at an average speed of 65 km/h for 4 hours from Nairobi to Nanyuki. What distance did it cover?',
    options: [
      '260 km',
      '240 km',
      '280 km',
      '130 km'
    ],
    correctAnswer: '260 km',
    explanation: 'Distance = Speed x Time = 65 km/h x 4 h = 260 km.',
    socraticHint: 'Multiply speed by time: 65 x 4.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-015',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A motorist covers a distance of 360 km from Nairobi to Kisumu at an average speed of 80 km/h. How many hours did the journey take?',
    text: 'A motorist covers a distance of 360 km from Nairobi to Kisumu at an average speed of 80 km/h. How many hours did the journey take?',
    options: [
      '4.5 hours',
      '4 hours',
      '5 hours',
      '3.5 hours'
    ],
    correctAnswer: '4.5 hours',
    explanation: 'Time = Distance / Speed = 360 / 80 = 4.5 hours (4 hours 30 minutes).',
    socraticHint: 'Divide distance by speed: 360 divided by 80.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-016',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is a vehicle speed of 72 km/h expressed in metres per second (m/s)?',
    text: 'What is a vehicle speed of 72 km/h expressed in metres per second (m/s)?',
    options: [
      '20 m/s',
      '25 m/s',
      '15 m/s',
      '18 m/s'
    ],
    correctAnswer: '20 m/s',
    explanation: 'To convert km/h to m/s: 72 x (5/18) = 4 x 5 = 20 m/s.',
    socraticHint: 'To convert km/h to m/s, multiply by 5/18 (or multiply by 1,000 and divide by 3,600).',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-017',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'An elite Kenyan marathon runner trains at a speed of 5 m/s. What is this speed in kilometres per hour (km/h)?',
    text: 'An elite Kenyan marathon runner trains at a speed of 5 m/s. What is this speed in kilometres per hour (km/h)?',
    options: [
      '18 km/h',
      '20 km/h',
      '15 km/h',
      '25 km/h'
    ],
    correctAnswer: '18 km/h',
    explanation: 'To convert m/s to km/h: 5 x (18/5) = 18 km/h.',
    socraticHint: 'To convert m/s to km/h, multiply by 18/5.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-018',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A motorist covers 90 km in 1 hour and 15 minutes. What is the average speed in km/h?',
    text: 'A motorist covers 90 km in 1 hour and 15 minutes. What is the average speed in km/h?',
    options: [
      '72 km/h',
      '60 km/h',
      '75 km/h',
      '80 km/h'
    ],
    correctAnswer: '72 km/h',
    explanation: '1 hour 15 minutes = 1.25 hours = 5/4 hours. Speed = Distance / Time = 90 / 1.25 = 90 x (4/5) = 18 x 4 = 72 km/h.',
    socraticHint: '15 minutes is 1/4 or 0.25 hours, so the time is 1.25 hours. What is 90 divided by 1.25?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-019',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'On a travel distance-time graph, what does a flat, horizontal line segment represent?',
    text: 'On a travel distance-time graph, what does a flat, horizontal line segment represent?',
    options: [
      'The vehicle is stationary (resting/stopped)',
      'The vehicle is moving at maximum speed',
      'The vehicle is reversing',
      'The vehicle is accelerating'
    ],
    correctAnswer: 'The vehicle is stationary (resting/stopped)',
    explanation: 'A horizontal line indicates that time is passing while the distance from the start remains unchanged, meaning the vehicle is stationary.',
    socraticHint: 'When time keeps increasing but the distance covered stays constant, is the vehicle moving or stopped?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-020',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A car travels 120 km in 2 hours, stops for a 30-minute lunch break, and then travels another 80 km in 1 hour 30 minutes. What is the average speed for the ENTIRE journey including the stop?',
    text: 'A car travels 120 km in 2 hours, stops for a 30-minute lunch break, and then travels another 80 km in 1 hour 30 minutes. What is the average speed for the ENTIRE journey including the stop?',
    options: [
      '50 km/h',
      '57.1 km/h',
      '60 km/h',
      '45 km/h'
    ],
    correctAnswer: '50 km/h',
    explanation: 'Total distance = 120 + 80 = 200 km. Total time = 2 h + 0.5 h + 1.5 h = 4 hours. Average speed = Total Distance / Total Time = 200 / 4 = 50 km/h.',
    socraticHint: 'Average speed for a whole journey = Total Distance covered / Total Time taken (including stops).',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-021',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Two buses leave Nairobi and Mombasa (distance 480 km) at the same time heading towards each other. Each travels at 60 km/h. After how many hours will they meet?',
    text: 'Two buses leave Nairobi and Mombasa (distance 480 km) at the same time heading towards each other. Each travels at 60 km/h. After how many hours will they meet?',
    options: [
      '4 hours',
      '3 hours',
      '5 hours',
      '4.8 hours'
    ],
    correctAnswer: '4 hours',
    explanation: 'Combined approach speed = 60 + 60 = 120 km/h. Time to meet = Total distance / Combined speed = 480 / 120 = 4 hours.',
    socraticHint: 'When moving towards each other, their speeds add up: together they cover 60 + 60 = 120 km every hour.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-022',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'On a distance-time travel graph, Line A has a steeper slope than Line B. What does this indicate about Line A?',
    text: 'On a distance-time travel graph, Line A has a steeper slope than Line B. What does this indicate about Line A?',
    options: [
      'Line A represents a higher speed than Line B',
      'Line A represents a slower speed than Line B',
      'Line A covers less distance',
      'Line A took more time'
    ],
    correctAnswer: 'Line A represents a higher speed than Line B',
    explanation: 'The slope (gradient) of a distance-time graph represents speed (change in distance over change in time). A steeper slope means a higher speed.',
    socraticHint: 'The gradient (slope) of a distance-time graph represents speed. A steeper slope means greater change in distance over time.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-023',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Ferdinand Omanyala sprints at a steady speed of 10 m/s for 9.8 seconds. What distance does he cover?',
    text: 'Ferdinand Omanyala sprints at a steady speed of 10 m/s for 9.8 seconds. What distance does he cover?',
    options: [
      '98 metres',
      '980 metres',
      '9.8 metres',
      '100 metres'
    ],
    correctAnswer: '98 metres',
    explanation: 'Distance = Speed x Time = 10 m/s x 9.8 s = 98 metres.',
    socraticHint: 'Distance = Speed x Time: multiply 10 m/s by 9.8 s.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
  },
  {
    id: 'q-g6-math-u8-024',
    subStrandId: 'substrand-g6-math-u8',
    type: 'MULTIPLE_CHOICE',
    prompt: 'A cyclist rides a distance of 18 km in 45 minutes. What is the cyclist\'s average speed in km/h?',
    text: 'A cyclist rides a distance of 18 km in 45 minutes. What is the cyclist\'s average speed in km/h?',
    options: [
      '24 km/h',
      '18 km/h',
      '20 km/h',
      '36 km/h'
    ],
    correctAnswer: '24 km/h',
    explanation: '45 minutes = 45 / 60 = 0.75 hours = 3/4 hours. Speed = Distance / Time = 18 / (3/4) = 18 x (4/3) = 6 x 4 = 24 km/h.',
    socraticHint: '45 minutes is 3/4 of an hour. Divide 18 by 3/4.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G6-MATH-U8'
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
console.log('Batch 4 successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
