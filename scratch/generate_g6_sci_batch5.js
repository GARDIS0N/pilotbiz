/**
 * Grade 6 Science and Technology - Batch 5 Generator (Finale: Units 9 & 10)
 * Covers:
 * - Unit 9: Digital Technology: Spreadsheets, Coding Concepts & Cyber Safety (strand-g6-sci-tech)
 * - Unit 10: Force, Friction and Simple Machines (strand-g6-sci-tech)
 * Missions: Orders 59, 60, 61, 62 (world-science-lab)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Science and Technology Batch 5 (Units 9 & 10) ---');

// 1. Sub-strands for Units 9 & 10
const newSubStrands = [
  {
    id: "substrand-g6-sci-u9",
    strandId: "strand-g6-sci-tech",
    name: "Digital Technology: Spreadsheets, Coding & Cyber Safety",
    description: "Learn to organize and analyze data using spreadsheet software (cells, rows, formulas, charts), develop computational thinking through block-based coding algorithms, and observe cyber safety and digital ethics.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Navigate spreadsheet interfaces, input numeric data, and perform basic formula calculations (=SUM, =AVERAGE)",
      "Create and interpret bar charts and column charts representing real-world datasets",
      "Formulate step-by-step algorithms and identify sequencing, loops, and debugging in coding",
      "Demonstrate cyber hygiene: protecting personal privacy, creating strong passwords, and preventing cyberbullying"
    ]
  },
  {
    id: "substrand-g6-sci-u10",
    strandId: "strand-g6-sci-tech",
    name: "Force, Friction and Simple Machines",
    description: "Investigate gravitational, magnetic, and frictional forces, explore methods to increase or reduce friction, and examine simple machines (levers, inclined planes, pulleys, wheel and axle) that reduce human effort.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Describe effects of forces and distinguish between gravitational, magnetic, and frictional forces",
      "Explain advantages and disadvantages of friction in everyday life and describe lubrication and ball bearings",
      "Classify simple machines into levers (1st, 2nd, 3rd class), inclined planes, pulleys, and wheel and axle",
      "Explain how simple machines multiply force to make agricultural and domestic work easier"
    ]
  }
];

// 2. Lessons for Units 9 & 10
const newLessons = [
  // Unit 9: Digital Technology
  {
    id: "lesson-g6-sci-u9-l1",
    subStrandId: "substrand-g6-sci-u9",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Spreadsheets & Visual Data Management",
    summary: "Discover spreadsheet workbooks, understand grid cells and cell references, execute formula calculations, and generate visual charts.",
    content: "A spreadsheet is an electronic application designed to record, calculate, and organize numerical data in a grid of rows and columns. Vertical groups of cells are columns (identified by letters: A, B, C...) and horizontal groups of cells are rows (identified by numbers: 1, 2, 3...). The intersection of a row and a column is called a cell, identified by its unique cell address or reference (such as B4 for column B, row 4). In spreadsheet software (like Microsoft Excel, Google Sheets, or LibreOffice Calc), all mathematical formulas must begin with an equals sign (=). For example, '=SUM(C2:C10)' calculates the total sum of numbers in that range, while '=AVERAGE(D2:D20)' computes their arithmetic mean. Spreadsheets also enable users to turn raw tables into visual column graphs, bar charts, and pie charts, making patterns and trends easy to interpret.",
    keyConcepts: ["Spreadsheet Grid", "Rows & Columns", "Cell Address", "Formulas (=SUM, =AVERAGE)", "Bar & Pie Charts"],
    kenyanContext: "Agricultural cooperatives in Nyeri use digital spreadsheets to record daily milk yields from local dairy farmers and automatically calculate bi-weekly payments.",
    didYouKnow: "The very first electronic spreadsheet program was called VisiCalc, released in 1979—it revolutionized business accounting across the world!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u9-l2",
    subStrandId: "substrand-g6-sci-u9",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Coding Concepts, Algorithms & Cyber Safety",
    summary: "Master computational thinking with algorithms, loops, and debugging, while practicing responsible digital citizenship and cyber security.",
    content: "An algorithm is a precise, unambiguous sequence of step-by-step instructions designed to solve a problem or accomplish a task. In computer programming, algorithms are translated into code using visual block-based languages (such as Scratch) or text languages. Key coding constructs include: sequencing (executing commands in strict top-to-bottom order), selection (making decisions using 'if-then' conditions), loops or repetition (repeating instructions multiple times without rewriting them), and debugging (finding and fixing errors in code). Alongside coding, digital citizens must practice cyber safety: keeping personal data (full name, phone number, physical address, school) strictly confidential, creating strong passwords combining letters, numbers, and symbols, never opening suspicious email attachments or phishing links, treating others with kindness online, and promptly reporting cyberbullying or predatory behaviour to trusted adults or teachers.",
    keyConcepts: ["Algorithm", "Sequencing & Selection", "Loops / Iteration", "Debugging", "Strong Passwords", "Cyber Safety & Anti-Bullying"],
    kenyanContext: "Under the Kenyan Digital Literacy Programme (DLP), learners in primary schools use educational tablets to write Scratch games that illustrate traffic safety rules on Kenyan highways.",
    didYouKnow: "The world's very first computer programmer was a woman named Ada Lovelace, who wrote the first algorithm for an early mechanical computer in 1843!",
    estimatedMinutes: 20
  },

  // Unit 10: Force and Simple Machines
  {
    id: "lesson-g6-sci-u10-l1",
    subStrandId: "substrand-g6-sci-u10",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Force, Gravity & Friction in Action",
    summary: "Examine forces that push and pull, understand gravity and friction, and discover how friction is managed in vehicles and machines.",
    content: "A force is a push or pull exerted on an object. Forces can change an object's speed, direction of motion, or shape. Major forces include: gravitational force (the downward pull exerted by the Earth toward its center), magnetic force (attraction or repulsion between magnets and magnetic metals), and friction. Friction is a contact force that opposes motion between two surfaces touching each other. Friction has many vital advantages: it enables people to walk without slipping, allows vehicle brake pads to stop tyres, enables writing with a chalk or pencil on paper, and holds nails firmly inside wooden furniture. However, friction also has disadvantages: it causes wearing out of shoe soles and vehicle tyres, generates unwanted heat in moving machinery, and wastes mechanical energy. We reduce unwanted friction by using lubricants (grease, engine oil), installing ball bearings between spinning axles, using rollers, or streamlining vehicles (shaping them smoothly to cut through air). We increase useful friction by designing treads on boots and car tyres or sprinkling sand on slippery muddy roads.",
    keyConcepts: ["Force (Push & Pull)", "Gravity", "Frictional Force", "Advantages & Disadvantages of Friction", "Lubrication & Ball Bearings", "Streamlining"],
    kenyanContext: "During the rainy season in Murang'a, tea transport trucks sprinkle coarse murram and sand on steep red-clay muddy roads to increase tire friction and prevent sliding.",
    didYouKnow: "Without friction, you could never walk! Your feet would slip infinitely backwards like walking on frictionless ice!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u10-l2",
    subStrandId: "substrand-g6-sci-u10",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Simple Machines: Levers, Inclined Planes & Pulleys",
    summary: "Explore how levers, ramps, pulleys, and wheel and axle systems multiply applied force to make heavy physical tasks effortless.",
    content: "A simple machine is a mechanical device that makes work easier by changing the magnitude or direction of an applied force. The force applied is called the Effort (E), the resistance to be overcome is the Load (L), and the pivot point is the Fulcrum (F). Levers are rigid bars pivoted at a fulcrum, categorized into three classes based on the relative position of L, F, and E: First-Class Levers have the Fulcrum in the middle between Load and Effort (crowbar, scissors, seesaw, pliers); Second-Class Levers have the Load in the middle between Fulcrum and Effort (wheelbarrow, nutcracker, bottle opener); Third-Class Levers have the Effort in the middle between Fulcrum and Load (fishing rod, tweezers, broom, spade). An Inclined Plane is a sloping surface used to raise heavy loads to a higher level with less effort (loading ramps, staircases, winding roads climbing the Rift Valley escarpment). A Pulley is a grooved wheel supporting a rope; a single fixed pulley changes the direction of force, while movable pulley systems reduce the effort needed to lift heavy water buckets from deep wells. A Wheel and Axle consists of a large wheel turning a smaller axle (car steering wheel, screwdriver, water well windlass).",
    keyConcepts: ["Simple Machine (Load, Effort, Fulcrum)", "First-Class Lever (F in middle)", "Second-Class Lever (L in middle)", "Third-Class Lever (E in middle)", "Inclined Plane (Ramp)", "Pulleys & Wheel and Axle"],
    kenyanContext: "Construction workers at a building site in Nakuru use wheelbarrows (second-class levers), inclined wooden ramps to push concrete, and pulley hoists to lift stone blocks to upper floors.",
    didYouKnow: "The ancient Greek scientist Archimedes famously said: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world!'",
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 9 & 10
const newMissions = [
  // Unit 9 Missions
  {
    id: "mission-g6-sci-u9-m1",
    title: "Data Navigators: Spreadsheets and Charts",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 59,
    orderIndex: 59,
    description: "Collaborate with ICT Specialist Achieng to build digital spreadsheets, insert arithmetic formulas, and plot vibrant visual bar charts.",
    objectives: [
      "Navigate spreadsheet cell addresses, rows, and columns",
      "Write spreadsheet formulas for summation and averages (=SUM, =AVERAGE)",
      "Transform numerical datasets into clear visual charts"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Data Specialist",
    badge: "Data Specialist",
    questionIds: [
      "q-g6-sci-u9-001", "q-g6-sci-u9-002", "q-g6-sci-u9-003", "q-g6-sci-u9-004",
      "q-g6-sci-u9-005", "q-g6-sci-u9-006", "q-g6-sci-u9-007", "q-g6-sci-u9-008",
      "q-g6-sci-u9-009", "q-g6-sci-u9-010", "q-g6-sci-u9-011", "q-g6-sci-u9-012"
    ]
  },
  {
    id: "mission-g6-sci-u9-m2",
    title: "Code Masters: Algorithms, Loops & Cyber Shield",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 60,
    orderIndex: 60,
    description: "Step into the software lab to engineer Scratch algorithms, debug faulty loops, and fortify cyber defense against online scammers and cyberbullies.",
    objectives: [
      "Construct precise step-by-step algorithms and identify loops",
      "Debug syntax and logical errors in visual code sequences",
      "Demonstrate cyber safety, password hygiene, and online privacy"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Cyber Knight",
    badge: "Cyber Knight",
    questionIds: [
      "q-g6-sci-u9-013", "q-g6-sci-u9-014", "q-g6-sci-u9-015", "q-g6-sci-u9-016",
      "q-g6-sci-u9-017", "q-g6-sci-u9-018", "q-g6-sci-u9-019", "q-g6-sci-u9-020",
      "q-g6-sci-u9-021", "q-g6-sci-u9-022", "q-g6-sci-u9-023", "q-g6-sci-u9-024"
    ]
  },

  // Unit 10 Missions
  {
    id: "mission-g6-sci-u10-m1",
    title: "Force Pioneers: Gravity, Friction & Motion",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 61,
    orderIndex: 61,
    description: "Join Mechanical Engineer Kipchumba on the test track to measure gravitational pull, analyze brake friction, and test oil lubricants.",
    objectives: [
      "Identify effects of forces on motion, speed, and shape",
      "Distinguish between gravitational, magnetic, and frictional forces",
      "Explain practical ways to increase useful friction and reduce harmful friction"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Force Master",
    badge: "Force Master",
    questionIds: [
      "q-g6-sci-u10-001", "q-g6-sci-u10-002", "q-g6-sci-u10-003", "q-g6-sci-u10-004",
      "q-g6-sci-u10-005", "q-g6-sci-u10-006", "q-g6-sci-u10-007", "q-g6-sci-u10-008",
      "q-g6-sci-u10-009", "q-g6-sci-u10-010", "q-g6-sci-u10-011", "q-g6-sci-u10-012"
    ]
  },
  {
    id: "mission-g6-sci-u10-m2",
    title: "Mechanical Marvels: Levers, Planes & Pulleys",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 62,
    orderIndex: 62,
    description: "Operate levers, inclined plane ramps, and multi-wheel pulleys to lift massive stone blocks with minimal human muscle force.",
    objectives: [
      "Identify the Fulcrum, Load, and Effort in levers of 1st, 2nd, and 3rd classes",
      "Demonstrate how inclined planes make lifting heavy weights easier",
      "Explain the mechanical advantages of pulleys and wheel-and-axle systems"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Master of Machines",
    badge: "Master of Machines",
    questionIds: [
      "q-g6-sci-u10-013", "q-g6-sci-u10-014", "q-g6-sci-u10-015", "q-g6-sci-u10-016",
      "q-g6-sci-u10-017", "q-g6-sci-u10-018", "q-g6-sci-u10-019", "q-g6-sci-u10-020",
      "q-g6-sci-u10-021", "q-g6-sci-u10-022", "q-g6-sci-u10-023", "q-g6-sci-u10-024"
    ]
  }
];

// 4. Questions for Units 9 & 10
const newQuestions = [
  // --- UNIT 9: DIGITAL TECHNOLOGY & SPREADSHEETS (Questions 1 to 24) ---
  // Lesson 1: Spreadsheets (001 - 012)
  {
    id: "q-g6-sci-u9-001",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is an electronic spreadsheet primarily used for in modern computers?",
    options: [
      "Organizing, calculating, and analyzing numerical data in rows and columns",
      "Editing recorded video movies and adding sound effects",
      "Scanning the computer for physical dust particles",
      "Playing 3D car racing games without an internet connection"
    ],
    correctAnswer: "Organizing, calculating, and analyzing numerical data in rows and columns",
    explanation: "A spreadsheet is specialized software designed for data entry, arithmetic calculations, statistical analysis, and chart generation in a tabular grid.",
    socraticHint: "What computer program organizes numbers in tables and does math calculations automatically?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-002",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In a spreadsheet worksheet, how are vertical columns and horizontal rows identified?",
    options: [
      "Columns are identified by letters (A, B, C...) and rows by numbers (1, 2, 3...)",
      "Columns are identified by numbers (1, 2, 3...) and rows by letters (A, B, C...)",
      "Both columns and rows are identified only by punctuation marks",
      "Both columns and rows are identified by colour codes alone"
    ],
    correctAnswer: "Columns are identified by letters (A, B, C...) and rows by numbers (1, 2, 3...)",
    explanation: "Standard spreadsheets identify vertical columns by alphabetical letters and horizontal rows by numerical digits.",
    socraticHint: "Look at the top headings (letters) versus the left side headings (numbers).",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-003",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the correct cell address for the cell located at the intersection of column D and row 5?",
    options: [
      "D5",
      "5D",
      "D-5",
      "Cell 5"
    ],
    correctAnswer: "D5",
    explanation: "A cell address is named by writing the column letter first, followed immediately by the row number: D5.",
    socraticHint: "Remember the convention: column letter first, then row number.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-004",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which character must always be typed FIRST when entering a formula or function into a spreadsheet cell?",
    options: [
      "Equals sign (=)",
      "Plus sign (+)",
      "Hash sign (#)",
      "Exclamation mark (!)"
    ],
    correctAnswer: "Equals sign (=)",
    explanation: "In all major spreadsheet programs, typing '=' tells the software to treat the following input as a mathematical formula rather than plain text.",
    socraticHint: "What mathematical symbol instructs the spreadsheet that a calculation is starting?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-005",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which spreadsheet formula correctly adds up the numerical values contained in cells from B2 to B10?",
    options: [
      "=SUM(B2:B10)",
      "=ADD(B2:B10)",
      "=TOTAL(B2..B10)",
      "=PLUS(B2, B10)"
    ],
    correctAnswer: "=SUM(B2:B10)",
    explanation: "The '=SUM' function followed by a cell range in parentheses (B2:B10) calculates the total sum of all values in that range.",
    socraticHint: "What standard function name means 'summation' in spreadsheets?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-006",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A teacher in Nakuru wants to find the mean mark scored by pupils in a science test recorded in cells C1 to C30. Which formula should she use?",
    options: [
      "=AVERAGE(C1:C30)",
      "=MEAN(C1:C30)",
      "=MEDIAN_TOTAL(C1:C30)",
      "=SUM(C1:C30)/ALL"
    ],
    correctAnswer: "=AVERAGE(C1:C30)",
    explanation: "The '=AVERAGE' function automatically calculates the arithmetic mean of the specified range of cells.",
    socraticHint: "Which built-in function computes the average of a range of numbers?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-007",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which type of chart is best suited for comparing the maize harvest quantities harvested by 5 different farmers in Bungoma?",
    options: [
      "Bar or Column chart",
      "Pie chart showing percentage of one single item",
      "Scatter plot of sound waves",
      "Stock market radar chart"
    ],
    correctAnswer: "Bar or Column chart",
    explanation: "Bar and column charts use rectangular bars of varying heights to provide clear, visual comparisons across discrete categories or farmers.",
    socraticHint: "Which visual chart displays vertical or horizontal bars to compare amounts across different people?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-008",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What does a pie chart in a spreadsheet best represent?",
    options: [
      "The proportional percentage that each part contributes to a whole (100%)",
      "The changes in temperature measured every minute for 24 hours",
      "The alphabetical sorting of names in a class register",
      "The spelling mistakes made in an essay document"
    ],
    correctAnswer: "The proportional percentage that each part contributes to a whole (100%)",
    explanation: "A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions of a single whole dataset.",
    socraticHint: "Think of slices of a circular pie or chapati representing portions of a total whole.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-009",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "If cell A1 contains the number 25 and cell B1 contains the number 5, what result will be displayed in cell C1 with the formula '=A1/B1'?",
    options: [
      "5",
      "125",
      "30",
      "20"
    ],
    correctAnswer: "5",
    explanation: "The forward slash (/) is the division operator in computer spreadsheets; 25 divided by 5 equals 5.",
    socraticHint: "What arithmetic operation does the slash '/' symbol perform?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-010",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which mathematical symbol represents multiplication in a spreadsheet formula?",
    options: [
      "Asterisk (*)",
      "Letter x",
      "Ampersand (&)",
      "Circumflex (^)"
    ],
    correctAnswer: "Asterisk (*)",
    explanation: "In computer programming and spreadsheets, the asterisk (*) is used as the standard multiplication symbol.",
    socraticHint: "What star-like keyboard symbol is used to multiply numbers in computers?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-011",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens when you change a number inside cell B2 that is referenced by a formula '=B2*10' in cell C2?",
    options: [
      "The spreadsheet automatically recalculates and updates the answer in cell C2 immediately",
      "The formula in C2 is deleted permanently",
      "The computer screen turns off",
      "Cell C2 stays stuck on the old number forever until you re-type the formula"
    ],
    correctAnswer: "The spreadsheet automatically recalculates and updates the answer in cell C2 immediately",
    explanation: "Spreadsheets feature automatic dynamic recalculation; changing any input cell automatically updates all dependent formula cells.",
    socraticHint: "Do spreadsheets update answers automatically when underlying values change?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-012",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the collection of multiple spreadsheet worksheets saved together inside a single file called?",
    options: [
      "Workbook",
      "Database folder",
      "Document page",
      "Presentation slide"
    ],
    correctAnswer: "Workbook",
    explanation: "A spreadsheet file is called a workbook, and it can contain multiple individual worksheets (tabs).",
    socraticHint: "Think of an accounting 'book' containing multiple sheet pages.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Coding & Cyber Safety (013 - 024)
  {
    id: "q-g6-sci-u9-013",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is an algorithm in computing and problem-solving?",
    options: [
      "A precise step-by-step set of instructions to solve a problem or complete a task",
      "A physical cable used to plug a computer into a power socket",
      "A virus that damages computer files",
      "A digital picture saved on the internet"
    ],
    correctAnswer: "A precise step-by-step set of instructions to solve a problem or complete a task",
    explanation: "An algorithm is an unambiguous, ordered sequence of operations designed to accomplish a specific goal, much like a detailed cooking recipe.",
    socraticHint: "Think of a step-by-step recipe that must be followed in order to bake bread.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-014",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is correct sequencing essential when writing a computer program or algorithm?",
    options: [
      "Computers execute instructions strictly in the order they are given; wrong order causes errors or unexpected results",
      "Computers automatically reorder instructions from hardest to easiest",
      "Computers can only understand code if written from right to left",
      "Sequencing has no effect on how code runs"
    ],
    correctAnswer: "Computers execute instructions strictly in the order they are given; wrong order causes errors or unexpected results",
    explanation: "Computers follow commands sequentially; putting steps out of order (such as putting on shoes before socks) leads to incorrect operation.",
    socraticHint: "What happens if you tell a robot to cross the road before looking both ways?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-015",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What coding structure is used when you want a computer sprite to repeat an action 10 times without copying and pasting the code 10 times?",
    options: [
      "A loop (repetition / iteration block)",
      "A variable storage box",
      "An algorithm terminator",
      "A screen brightness slider"
    ],
    correctAnswer: "A loop (repetition / iteration block)",
    explanation: "A loop (such as 'repeat 10' or 'forever') allows a program to execute a block of instructions multiple times efficiently.",
    socraticHint: "What programming block repeats a set of commands over and over?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-016",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the process of finding and fixing errors (bugs) in a computer program called?",
    options: [
      "Debugging",
      "Encoding",
      "Formatting",
      "Compiling"
    ],
    correctAnswer: "Debugging",
    explanation: "Debugging is the systematic process of detecting, analyzing, and removing mistakes or 'bugs' in computer software.",
    socraticHint: "What term describes removing 'bugs' from computer code?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-017",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In visual block-based programming like Scratch, what are the graphical characters that move, speak, and interact on the stage called?",
    options: [
      "Sprites",
      "Pixels",
      "Keyboards",
      "Folders"
    ],
    correctAnswer: "Sprites",
    explanation: "In Scratch, objects or characters on the stage that can be programmed with code blocks are called sprites (such as the default Scratch Cat).",
    socraticHint: "What are the programmable animated characters in Scratch called?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-018",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following creates the STRONGEST and most secure password for a student's online learning portal?",
    options: [
      "A combination of at least 8 to 12 characters including uppercase letters, lowercase letters, numbers, and symbols (e.g. K!p-842#Sci)",
      "The student's first name spelled backwards (e.g. inamA)",
      "Simple sequential numbers like 12345678",
      "The word 'password'"
    ],
    correctAnswer: "A combination of at least 8 to 12 characters including uppercase letters, lowercase letters, numbers, and symbols (e.g. K!p-842#Sci)",
    explanation: "Strong passwords use a mix of character types and sufficient length to make automated cracking or guessing virtually impossible.",
    socraticHint: "Which password contains a diverse mix of uppercase, lowercase, numbers, and special symbols?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-019",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following personal information items should NEVER be shared publicly with strangers on internet social media or online gaming platforms?",
    options: [
      "Full home address, phone number, school name, and passwords",
      "Your favorite science topic in school",
      "Your favorite colour",
      "A picture of an indigenous tree you drew in class"
    ],
    correctAnswer: "Full home address, phone number, school name, and passwords",
    explanation: "Personally Identifiable Information (PII) like home address, phone number, school location, and passwords must remain confidential to protect against identity theft and predatory dangers.",
    socraticHint: "Which details could allow a stranger to physically locate or impersonate you?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-020",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is cyberbullying?",
    options: [
      "Using digital devices, messaging, or social media to harass, threaten, tease, or humiliate someone",
      "Playing educational video games with classmates",
      "Creating animations in Scratch with background music",
      "Typing too fast on a computer keyboard"
    ],
    correctAnswer: "Using digital devices, messaging, or social media to harass, threaten, tease, or humiliate someone",
    explanation: "Cyberbullying is repeated, intentional harmful behaviour delivered through electronic devices and online platforms.",
    socraticHint: "What word refers to bullying that takes place across internet-connected devices?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-021",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What should a Grade 6 pupil do immediately if they receive threatening or inappropriate messages from an unknown person online?",
    options: [
      "Do not reply, take a screenshot as evidence, and immediately report it to a parent or teacher",
      "Send rude insults back to the stranger",
      "Share home address to invite the stranger over to talk",
      "Keep it a secret and delete all school accounts"
    ],
    correctAnswer: "Do not reply, take a screenshot as evidence, and immediately report it to a parent or teacher",
    explanation: "Refusing to engage, capturing proof, and notifying trusted adults is the safest and recommended protocol for handling online threats.",
    socraticHint: "Who should you immediately inform when experiencing suspicious or harmful online behaviour?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-022",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is phishing in cyber security?",
    options: [
      "A deceptive attempt by scammers to trick you into revealing sensitive information like passwords through fake links or emails",
      "Catching fish using a digital rod connected to a computer",
      "Cleaning internet cables of physical dust",
      "Upgrading the graphics card in a gaming console"
    ],
    correctAnswer: "A deceptive attempt by scammers to trick you into revealing sensitive information like passwords through fake links or emails",
    explanation: "Phishing is social engineering where cybercriminals masquerade as trustworthy entities to steal credentials, banking details, or sensitive data.",
    socraticHint: "What scam attempts to 'fish' for your private passwords using fraudulent messages?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-023",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why should you never click on pop-up messages claiming 'You have won 1,000,000 shillings! Click here now!'?",
    options: [
      "They are malicious scams designed to download malware or steal your personal information",
      "The money is delivered in real life within 5 seconds",
      "They cause the computer keyboard to type in reverse",
      "They automatically delete your math homework"
    ],
    correctAnswer: "They are malicious scams designed to download malware or steal your personal information",
    explanation: "Clickbait fake prizes are common lures used by cybercriminals to install viruses, ransomware, or harvest private data.",
    socraticHint: "Are unbelievable online prize announcements genuine rewards or cyber traps?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u9-024",
    subStrandId: "substrand-g6-sci-u9",
    lessonId: "lesson-g6-sci-u9-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is digital etiquette (netiquette)?",
    options: [
      "Practicing respectful, polite, and responsible communication when using the internet and digital devices",
      "Wearing formal shoes while typing on a tablet",
      "Only using computers inside air-conditioned rooms",
      "Deleting other people's files when they leave the computer room"
    ],
    correctAnswer: "Practicing respectful, polite, and responsible communication when using the internet and digital devices",
    explanation: "Netiquette refers to the standards of polite, ethical, and considerate behaviour expected from internet users.",
    socraticHint: "What term combines 'net' and 'etiquette' for polite online communication?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // --- UNIT 10: FORCE AND SIMPLE MACHINES (Questions 25 to 48) ---
  // Lesson 1: Force and Friction (001 - 012)
  {
    id: "q-g6-sci-u10-001",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the scientific definition of a force in science?",
    options: [
      "A push or a pull acting upon an object",
      "The amount of matter contained in an object",
      "The rate of breathing per minute",
      "The temperature of boiling water"
    ],
    correctAnswer: "A push or a pull acting upon an object",
    explanation: "In physics, a force is defined simply as an interaction that can change the motion or shape of an object—a push or a pull.",
    socraticHint: "What two physical actions describe pushing or pulling an object?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-002",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When a ripe mango detaches from a branch in an orchard in Embu, it falls downwards to the ground. Which force pulls it down?",
    options: [
      "Gravitational force (gravity)",
      "Magnetic force",
      "Frictional force",
      "Electrostatic force"
    ],
    correctAnswer: "Gravitational force (gravity)",
    explanation: "Gravity is the attractive force exerted by Earth that pulls all objects toward its center.",
    socraticHint: "Which natural force pulls all unsupported masses downwards toward the Earth?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-003",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is friction?",
    options: [
      "A contact force that opposes motion between two surfaces in contact",
      "A force that pulls metal pins towards a magnet",
      "A force that pushes boats to float on water",
      "A force that speeds up objects in space infinitely"
    ],
    correctAnswer: "A contact force that opposes motion between two surfaces in contact",
    explanation: "Frictional force arises between touching surfaces and always acts in the opposite direction to the relative motion.",
    socraticHint: "What force resists the sliding of one surface over another?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-004",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is a major ADVANTAGE of friction in daily life?",
    options: [
      "It allows our shoes to grip the ground so we can walk without slipping",
      "It wears down the soles of school shoes over time",
      "It produces unwanted heat inside car engines",
      "It makes heavy wooden boxes harder to slide across floors"
    ],
    correctAnswer: "It allows our shoes to grip the ground so we can walk without slipping",
    explanation: "Friction between footwear and ground provides the traction necessary for walking, running, and stopping without sliding.",
    socraticHint: "What prevents you from slipping and falling every time you step on the floor?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-005",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is a DISADVANTAGE of friction?",
    options: [
      "It causes wear and tear of machine parts and vehicle tyres",
      "It allows vehicle brakes to bring a car to a stop",
      "It enables chalk to leave marks on the blackboard",
      "It holds screws and nails securely inside wooden walls"
    ],
    correctAnswer: "It causes wear and tear of machine parts and vehicle tyres",
    explanation: "Friction gradually erodes material surfaces, leading to mechanical wear, loss of tyre treads, and wasted heat energy.",
    socraticHint: "What harmful effect gradually destroys shoe soles and bicycle tyres?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-006",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does a bicycle mechanic in Kisumu reduce unwanted friction between the gears and chain of a bicycle?",
    options: [
      "Applying lubricating oil or grease",
      "Sprinkling coarse sand and stones on the chain",
      "Washing the chain with salty ocean water",
      "Rubbing the chain with dry sandpaper"
    ],
    correctAnswer: "Applying lubricating oil or grease",
    explanation: "Lubricants form a smooth liquid film between moving metal surfaces, preventing direct contact of rough surface microscopic irregularities.",
    socraticHint: "What smooth, slippery substance is applied to moving metal parts to make them glide easily?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-007",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What mechanical components consisting of smooth steel balls rolling inside a ring are used to reduce friction in wheel axles?",
    options: [
      "Ball bearings",
      "Brake pads",
      "Rubber tyres",
      "Spokes"
    ],
    correctAnswer: "Ball bearings",
    explanation: "Ball bearings replace sliding friction with much lower rolling friction, enabling wheels to spin freely with minimal energy loss.",
    socraticHint: "What rolling steel balls reduce friction inside wheel hubs and roller skates?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-008",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why are high-speed aircraft and fast matatus designed with sleek, curved, streamlined shapes?",
    options: [
      "To reduce air resistance (fluid friction / aerodynamic drag) as they travel forward",
      "To make the vehicle heavier so it grips the road more tightly",
      "To prevent sunlight from reflecting off the paint",
      "To allow the vehicle to carry more luggage on top"
    ],
    correctAnswer: "To reduce air resistance (fluid friction / aerodynamic drag) as they travel forward",
    explanation: "Streamlining shapes objects so that air flows smoothly around them without turbulence, significantly cutting down air friction (drag).",
    socraticHint: "How does a teardrop or bullet shape help an object move through air or water with less resistance?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-009",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why do vehicle tyres and sports boots have deep treads and grooves cut into the rubber?",
    options: [
      "To increase friction and prevent slipping on wet or loose surfaces",
      "To make the shoes look colorful in the dark",
      "To decrease the weight of the tyre",
      "To make tyres completely silent on roads"
    ],
    correctAnswer: "To increase friction and prevent slipping on wet or loose surfaces",
    explanation: "Treads channel water away and create high traction, deliberately increasing grip (friction) to prevent skidding.",
    socraticHint: "Why do car tyres need deep grooves on slippery tarmac during rainy days?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-010",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens when you rub your two dry hands together vigorously on a chilly morning in Limuru?",
    options: [
      "Friction between your palms generates heat energy, warming your hands",
      "Your hands produce ice crystals through freezing",
      "Gravity pulls your hands to the floor",
      "A magnetic field pushes your palms apart"
    ],
    correctAnswer: "Friction between your palms generates heat energy, warming your hands",
    explanation: "Mechanical kinetic energy is converted into thermal heat energy due to friction between the rubbing surfaces of your palms.",
    socraticHint: "What form of energy is produced when you rub two surfaces rapidly together?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-011",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which instrument is used in the science laboratory to measure the magnitude of a force in Newtons?",
    options: [
      "Spring balance (dynamometer)",
      "Beam balance",
      "Clinical thermometer",
      "Measuring cylinder"
    ],
    correctAnswer: "Spring balance (dynamometer)",
    explanation: "A spring balance measures force by calibrating the extension of an internal coiled spring, reading values directly in Newtons (N).",
    socraticHint: "Which tool uses a stretching spring to measure pull force in Newtons?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-012",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the standard International System (SI) unit used for measuring force?",
    options: [
      "Newton (N)",
      "Kilogram (kg)",
      "Metre (m)",
      "Litre (L)"
    ],
    correctAnswer: "Newton (N)",
    explanation: "The SI unit of force is the Newton (symbol N), named in honour of Sir Isaac Newton.",
    socraticHint: "What scientific unit of force is named after the scientist who formulated the laws of gravity?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Simple Machines (013 - 024)
  {
    id: "q-g6-sci-u10-013",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What are the three main parts or points found in any lever?",
    options: [
      "Fulcrum (pivot), Load, and Effort",
      "North pole, South pole, and magnetic axis",
      "Filament, glass bulb, and terminal",
      "Solid, liquid, and gas"
    ],
    correctAnswer: "Fulcrum (pivot), Load, and Effort",
    explanation: "Every lever operates around three key reference points: the Fulcrum (turning pivot), the Load (weight/resistance overcome), and the Effort (applied force).",
    socraticHint: "Name the pivot point, the weight to be moved, and the muscle force you apply.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-014",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is an example of a FIRST-CLASS lever, where the Fulcrum is located between the Load and the Effort?",
    options: [
      "A crowbar opening a heavy wooden crate or a pair of scissors",
      "A builder's wheelbarrow carrying sand",
      "A pair of sugar tongs picking up ice",
      "A fishing rod held with two hands"
    ],
    correctAnswer: "A crowbar opening a heavy wooden crate or a pair of scissors",
    explanation: "In first-class levers (crowbar, scissors, seesaw), the Fulcrum lies in the middle between the Effort and the Load.",
    socraticHint: "Which tool pivots in the middle with the load on one end and your hands on the other?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-015",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "A wheelbarrow carries a heavy load of building stones in the middle, pivots on the front wheel, and is lifted by handles at the rear. What class of lever is it?",
    options: [
      "Second-class lever",
      "First-class lever",
      "Third-class lever",
      "Fourth-class lever"
    ],
    correctAnswer: "Second-class lever",
    explanation: "In a second-class lever, the Load is positioned in the middle between the Fulcrum (wheel axle) and the Effort (hands lifting the handles).",
    socraticHint: "Remember: when the LOAD is in the middle (between pivot wheel and lifting hands), it is class 2.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-016",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In a THIRD-CLASS lever (such as a fishing rod or coal tongs), which component is located in the middle?",
    options: [
      "Effort (between Fulcrum and Load)",
      "Load (between Fulcrum and Effort)",
      "Fulcrum (between Load and Effort)",
      "The battery power supply"
    ],
    correctAnswer: "Effort (between Fulcrum and Load)",
    explanation: "In third-class levers, the Effort is applied in the middle between the Fulcrum and the Load (FLE mnemonic: 1st=Fulcrum, 2nd=Load, 3rd=Effort in the middle).",
    socraticHint: "Use the classic mnemonic FLE: 1=F in middle, 2=L in middle, 3=E in middle.",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-017",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What type of simple machine is a long sloping wooden plank used to roll heavy oil drums onto a lorry bed?",
    options: [
      "An inclined plane (ramp)",
      "A first-class lever",
      "A fixed pulley",
      "A wheel and axle"
    ],
    correctAnswer: "An inclined plane (ramp)",
    explanation: "An inclined plane is a flat supporting surface tilted at an angle, reducing the effort needed to raise a heavy load over a vertical distance.",
    socraticHint: "What do we call a flat sloping ramp that makes lifting heavy drums onto trucks easier?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-018",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why are roads climbing steep mountains (such as the road ascending the Great Rift Valley escarpment) designed to wind gently back and forth instead of going straight up?",
    options: [
      "The winding road acts as an inclined plane, increasing distance to reduce the effort required by vehicle engines",
      "Winding roads allow cars to move faster than straight roads",
      "To prevent cars from falling off the Earth due to gravity",
      "Because roads cannot be built in straight lines in Africa"
    ],
    correctAnswer: "The winding road acts as an inclined plane, increasing distance to reduce the effort required by vehicle engines",
    explanation: "A winding switchback road lengthens the path, which decreases the slope (angle of inclination), so engines need far less force (effort) to climb the elevation.",
    socraticHint: "How does a longer, gentler slope make climbing easier than a steep vertical wall?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-019",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is a screw in mechanical physics?",
    options: [
      "An inclined plane wrapped spirally around a central cylinder",
      "A first-class lever with a curved handle",
      "A magnetic nail that attracts wood",
      "A single movable pulley made of steel"
    ],
    correctAnswer: "An inclined plane wrapped spirally around a central cylinder",
    explanation: "A screw's spiral thread is simply an inclined plane wrapped around a central core, translating rotational force into linear motion.",
    socraticHint: "Imagine wrapping a triangular ramp around a pencil: what spiral tool does it form?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-020",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is the primary advantage of using a SINGLE FIXED PULLEY to draw water from a deep borehole in Kitui?",
    options: [
      "It changes the direction of the applied force, allowing the person to pull downward with the help of body weight",
      "It cuts the actual weight of the water bucket in half",
      "It purifies the borehole water automatically",
      "It turns water into ice while lifting"
    ],
    correctAnswer: "It changes the direction of the applied force, allowing the person to pull downward with the help of body weight",
    explanation: "A single fixed pulley does not multiply force (mechanical advantage = 1), but it changes the direction of pull so you can pull downwards rather than hauling upwards.",
    socraticHint: "Is it easier to pull downwards using your own body weight or to heave straight upwards?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-021",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following devices operates on the principle of the WHEEL AND AXLE?",
    options: [
      "A car steering wheel or a door knob",
      "A flat wooden ramp",
      "A carpenter's claw hammer pulling a nail",
      "A pair of paper-cutting scissors"
    ],
    correctAnswer: "A car steering wheel or a door knob",
    explanation: "A wheel and axle consists of a larger wheel connected to a smaller central axle; turning the outer rim exerts a multiplied torque on the axle.",
    socraticHint: "Which tool has a large outer round wheel that turns a narrow central rod or spindle?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-022",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is a screwdriver with a wide thick handle easier to turn into tight timber than one with a razor-thin handle?",
    options: [
      "The larger radius of the handle acts as a larger wheel in a wheel-and-axle system, multiplying torque",
      "The thicker handle is made of magnetic steel",
      "The thick handle heats up the screw to melt the timber",
      "The thinner handle has too much gravitational attraction"
    ],
    correctAnswer: "The larger radius of the handle acts as a larger wheel in a wheel-and-axle system, multiplying torque",
    explanation: "In a wheel and axle, mechanical advantage equals the ratio of wheel radius to axle radius; a wider handle provides greater leverage to turn the screw.",
    socraticHint: "How does a wider turning circle increase turning force (torque) on the central shaft?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-023",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which simple machine consists of two inclined planes placed back-to-back, used to split logs or cut vegetables?",
    options: [
      "A wedge (e.g. axe blade, knife edge)",
      "A single fixed pulley",
      "A first-class see-saw",
      "A bicycle pedal"
    ],
    correctAnswer: "A wedge (e.g. axe blade, knife edge)",
    explanation: "A wedge consists of two back-to-back inclined planes ending in a sharp edge, converting a forward striking force into lateral splitting forces.",
    socraticHint: "What triangular tool splits firewood by driving two sloping sides into the wood?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u10-024",
    subStrandId: "substrand-g6-sci-u10",
    lessonId: "lesson-g6-sci-u10-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How does maintaining simple machines by cleaning off mud, storing under cover, and oiling moving joints benefit a Kenyan smallholder farmer?",
    options: [
      "It prevents rust, reduces wear and friction, and extends the working lifespan of the tools",
      "It turns old iron hoes into pure gold over time",
      "It allows tools to harvest crops automatically with no human operator",
      "It increases the physical weight of the tools tenfold"
    ],
    correctAnswer: "It prevents rust, reduces wear and friction, and extends the working lifespan of the tools",
    explanation: "Proper maintenance eliminates corrosion, minimizes friction, keeps cutting edges sharp, and ensures tools operate safely and efficiently for years.",
    socraticHint: "What are the practical benefits of keeping farm tools clean, sharp, and well-oiled?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  }
];

// 5. Insert into db
// Add subStrands
for (const ss of newSubStrands) {
  if (!db.subStrands.some(s => s.id === ss.id)) {
    db.subStrands.push(ss);
    console.log(`Added subStrand ${ss.id}`);
  }
}

// Add lessons
for (const les of newLessons) {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
}

// Add missions
for (const mis of newMissions) {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
}

// Add questions
for (const q of newQuestions) {
  if (!db.questions.some(item => item.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
}

// Write back to database
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('Batch 5 of Grade 6 Science and Technology successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
