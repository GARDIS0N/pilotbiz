/**
 * Grade 6 Creative Arts & Sports - Batch 1 Generator
 * Setup: Learning Area (la-creative-g6), 3 Strands, world-creative-studio registration
 * Content: Units 1 & 2 (Art and Craft)
 * - Unit 1: Drawing, Perspective, Proportion, Cross-Hatching & Still Life
 * - Unit 2: Painting, Colour Theory, Monoprinting & Graphic Design
 * Missions: Orders 39, 40, 41, 42 (world-creative-studio)
 * Questions: 48 (24 per unit: q-g6-ca-u1-001 to q-g6-ca-u2-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Creative Arts & Sports Batch 1 (Setup + Units 1 & 2) ---');

// 1. Setup Learning Area: la-creative-g6
const laCreativeG6 = {
  id: 'la-creative-g6',
  gradeId: 'grade-6',
  name: 'Creative Arts and Sports',
  swahiliName: 'Sanaa za Ubunifu na Michezo',
  icon: 'palette',
  color: '#A855F7',
  description: 'Visual arts, indigenous crafts, traditional Kenyan and Eastern African music, folk dance choreography, track and field athletics, ball games, gymnastics, and sports health.',
  strandsCount: 3
};

if (!db.learningAreas.some(la => la.id === laCreativeG6.id)) {
  db.learningAreas.push(laCreativeG6);
  console.log('Added learning area la-creative-g6');
}

// Ensure world-creative-studio includes la-creative-g6
const studioWorld = db.gameWorlds.find(w => w.id === 'world-creative-studio');
if (studioWorld && !studioWorld.learningAreaIds.includes('la-creative-g6')) {
  studioWorld.learningAreaIds.push('la-creative-g6');
  console.log('Added la-creative-g6 to world-creative-studio');
}

// 2. Setup 3 Strands
const caStrands = [
  {
    id: 'strand-g6-ca-art',
    learningAreaId: 'la-creative-g6',
    code: 'CA-G6-STR-01',
    title: 'Art and Craft',
    name: 'Art and Craft',
    swahiliTitle: 'Sanaa na Ufundi',
    description: 'Advanced drawing, two-point perspective, tonal modeling, painting, colour schemes, printmaking, clay ceramics, sculpture, puppetry, and indigenous African crafts.',
    icon: 'palette',
    grade: 'G6'
  },
  {
    id: 'strand-g6-ca-music',
    learningAreaId: 'la-creative-g6',
    code: 'CA-G6-STR-02',
    title: 'Music and Performing Arts',
    name: 'Music and Performing Arts',
    swahiliTitle: 'Muziki na Sanaa za Maonyesho',
    description: 'Staff notation, sol-fa pitching, compound time signatures, classification of traditional Eastern African musical instruments, folk songs, dance choreography, and stage etiquette.',
    icon: 'music',
    grade: 'G6'
  },
  {
    id: 'strand-g6-ca-sports',
    learningAreaId: 'la-creative-g6',
    code: 'CA-G6-STR-03',
    title: 'Physical Education and Sports',
    name: 'Physical Education and Sports',
    swahiliTitle: 'Elimu ya Kimwili na Michezo',
    description: 'Track athletics (sprint mechanics, relay exchanges, middle distance pacing), field events (long jump, shot put), team ball games (football, netball, volleyball), gymnastics, water safety, and sports injury prevention.',
    icon: 'activity',
    grade: 'G6'
  }
];

caStrands.forEach(s => {
  if (!db.strands.some(existing => existing.id === s.id)) {
    db.strands.push(s);
    console.log('Added strand:', s.id);
  }
});

// 3. Units 1 & 2 (subStrands)
const units = [
  {
    id: 'substrand-g6-ca-u1',
    strandId: 'strand-g6-ca-art',
    learningAreaId: 'la-creative-g6',
    title: 'Drawing, Linear Perspective, Proportion & Cross-Hatching',
    name: 'Drawing, Linear Perspective, Proportion & Cross-Hatching',
    description: 'Exploring two-point linear perspective (horizon line, vanishing points); applying tonal shading techniques (cross-hatching, stippling, smudging); observing natural proportion; and composing balanced still-life drawings of organic and geometric objects.',
    cbeCompetency: 'Visual spatial acuity, observational drawing precision, geometric proportion discernment, and artistic craftsmanship',
    estimatedMinutes: 30,
    order: 1,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ca-u2',
    strandId: 'strand-g6-ca-art',
    learningAreaId: 'la-creative-g6',
    title: 'Painting, Colour Harmony, Monoprinting & Graphic Design',
    name: 'Painting, Colour Harmony, Monoprinting & Graphic Design',
    description: 'Exploring colour wheels (primary, secondary, tertiary); applying complementary and analogous colour schemes; creating tints and shades; executing monoprinting and stencil relief prints; and designing informative public awareness posters using creative lettering.',
    cbeCompetency: 'Colour harmony mastery, graphic design communication, printmaking innovation, and visual aesthetics',
    estimatedMinutes: 30,
    order: 2,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 4. Lessons for Units 1 & 2
const lessons = [
  // Unit 1
  {
    id: 'lesson-g6-ca-u1-l1',
    subStrandId: 'substrand-g6-ca-u1',
    title: 'Two-Point Perspective & Vanishing Points in Drawing',
    content: 'Perspective is an artistic technique used to create the illusion of three-dimensional depth and volume on a flat, two-dimensional drawing surface.\n\n1. Key Elements of Linear Perspective:\n- Horizon Line (Eye Level): An imaginary horizontal line across the picture plane representing the viewer’s eye level. Objects above the horizon line are seen from below (worm’s eye view); objects below are seen from above (bird’s eye view).\n- Vanishing Point (VP): The point on the horizon line where parallel receding lines appear to meet and converge in the distance.\n- Receding (Orthogonal) Lines: Diagonal guidelines leading from the object towards the vanishing points.\n\n2. One-Point vs Two-Point Perspective:\n- One-Point Perspective: Features a single vanishing point; used when viewing the front flat face of a cube or road leading straight ahead.\n- Two-Point Perspective: Features two distinct vanishing points on the horizon line (VP1 on the far left, VP2 on the far right); used when viewing an object from an angle or corner.\n- Constructing a Box in Two-Point Perspective:\n  1. Draw a clear horizontal horizon line across the paper.\n  2. Mark VP1 on the left edge and VP2 on the right edge.\n  3. Draw the vertical front corner edge of the object between the two vanishing points.\n  4. Connect the top and bottom of the vertical line to both VP1 and VP2 using light guidelines.\n  5. Draw vertical lines for the left and right sides, and connect their tops to the opposite vanishing points to form the roof.',
    didYouKnow: 'Renaissance artists like Leonardo da Vinci and Filippo Brunelleschi revolutionized art in the 15th century by discovering mathematical laws of linear perspective, transforming flat paintings into lifelike 3D windows!',
    kenyanContext: 'Kenyan street landscape painters in Nairobi use two-point perspective to capture the dramatic angular facades of skyscrapers along Kenyatta Avenue and bustling corner storefronts in Eastleigh.',
    order: 1,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u1-l2',
    subStrandId: 'substrand-g6-ca-u1',
    title: 'Tonal Value, Shading Techniques & Still Life Composition',
    content: 'Tone refers to the degree of lightness or darkness of a surface, created by how light strikes three-dimensional forms.\n\n1. Shading and Tonal Modeling Techniques:\n- Hatching: Closely spaced parallel lines; closer lines create darker tones.\n- Cross-Hatching: Two or more intersecting sets of parallel lines creating rich, dense shadow gradations and texture.\n- Stippling (Pointillism): Using patterns of small dots; densely clustered dots produce deep shadows, while scattered dots depict highlights.\n- Smudging (Blending): Using a tortillon, blending stump, or tissue to rub pencil graphite smoothly across the paper.\n\n2. Light and Shadow Zones on Curved Forms:\n- Highlight: The brightest spot where direct light hits the object directly.\n- Mid-Tone (Half-Tone): The true local tone of the surface receiving indirect light.\n- Core Shadow: The darkest area on the object where light cannot reach.\n- Reflected Light: Subtle light bouncing off the table or ground back onto the shadow side.\n- Cast Shadow: The dark silhouette projected by the object onto the table surface opposite the light source.\n\n3. Principles of Still Life Composition:\n- Focal Point: A dominant primary object that immediately captures the viewer’s eye.\n- Balance: Harmonious arrangement (symmetrical or asymmetrical) so the drawing does not feel visually heavy on one side.\n- Overlapping: Placing objects slightly in front of one another to establish depth and spatial relationship.\n- Proportion: Accurate relative size relationship between adjacent objects (e.g. a tea cup must not be larger than the teapot next to it).',
    didYouKnow: 'Leonardo da Vinci called the subtle, smokeless blending of tones without harsh outlines "Sfumato", which gives the Mona Lisa her mysterious soft expression!',
    kenyanContext: 'Kenyan art students draw indigenous still life compositions featuring everyday cultural items: a woven kiondo basket, a clay water pot, and yellow mangoes arranged on a traditional mkeka mat.',
    order: 2,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },

  // Unit 2
  {
    id: 'lesson-g6-ca-u2-l1',
    subStrandId: 'substrand-g6-ca-u2',
    title: 'Colour Theory, Colour Wheels & Harmonic Schemes',
    content: 'Colour is one of the most powerful elements of art, produced when light striking an object is reflected back to the eye.\n\n1. The 12-Part Colour Wheel:\n- Primary Colours: Cannot be created by mixing other pigments (Red, Yellow, Blue).\n- Secondary Colours: Created by mixing two primary colours in equal parts:\n  * Red + Yellow = Orange\n  * Yellow + Blue = Green\n  * Blue + Red = Violet / Purple\n- Tertiary (Intermediate) Colours: Created by mixing a primary with an adjacent secondary colour:\n  * Red-Orange, Yellow-Orange, Yellow-Green, Blue-Green, Blue-Violet, Red-Violet.\n\n2. Tints, Shades, and Tones:\n- Tint: A colour mixed with White to lighten it (e.g. Red + White = Pink).\n- Shade: A colour mixed with Black to darken it (e.g. Red + Black = Maroon).\n- Tone: A colour mixed with Grey (or its complement) to reduce its intensity.\n\n3. Colour Schemes (Colour Harmonies):\n- Monochromatic Scheme: Using variations of a single colour with its tints and shades (e.g. navy blue, royal blue, sky blue).\n- Analogous Scheme: Using three or four colours that sit side-by-side on the colour wheel (e.g. yellow, yellow-green, and green), creating a calm, natural harmony.\n- Complementary Scheme: Using colours that sit directly opposite each other on the colour wheel (e.g. Red and Green, Blue and Orange, Yellow and Purple). Placed next to each other, they create vivid contrast and vibrance.\n- Warm vs Cool Colours: Warm colours (reds, oranges, yellows) evoke heat, energy, and advance forward; cool colours (blues, greens, purples) evoke calmness, water, and recede into the background.',
    didYouKnow: 'Complementary colours create the highest visual contrast possible; that is why life jackets and emergency rescue boats use bright orange to stand out instantly against deep blue ocean water!',
    kenyanContext: 'Traditional Maasai beadwork masterfully pairs complementary colours—vibrant fire red against lush savannah green, and solar yellow against sky blue—to produce dazzling geometric ornaments.',
    order: 3,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u2-l2',
    subStrandId: 'substrand-g6-ca-u2',
    title: 'Printmaking Techniques & Graphic Poster Design',
    content: 'Printmaking is the process of transferring an image or design from a matrix (block or plate) onto paper or fabric, allowing multiples to be produced.\n\n1. Relief Printmaking Techniques:\n- Block Printing: Carving away non-printing areas from a soft woodblock, linoleum, or firm potato/yam; the raised surface receives ink and is stamped onto paper.\n- Stencil Printing: Cutting out a shape or lettering from thick oiled card or plastic sheet; ink or paint is dabbed through the open cut-out areas using a sponge or stiff stencil brush.\n- Monoprinting: Applying paint or printer’s ink directly onto a smooth, non-porous glass or plastic plate, creating a design by painting or scratching with a stylus, then pressing paper onto the wet surface to produce a single unique impression.\n\n2. Graphic Design: Poster Creation for Public Communication:\n- A poster is a visual graphic combining bold imagery and text to communicate an urgent public message (e.g. environmental protection, tree planting, anti-bullying, water conservation).\n- Principles of Effective Poster Design:\n  * Simplicity: Deliver one clear, powerful idea without visual clutter.\n  * Bold Typography: Large, legible lettering (Sans-Serif or bold block letters) easily read from across the room.\n  * High Contrast: Dark letters on light backgrounds or bright letters on dark backgrounds.\n  * Call to Action: A concise, memorable slogan (e.g. "Plant a Tree, Save Kenya!").\n  * Eye-Catching Illustration: A central symbolic image reinforcing the message.',
    didYouKnow: 'Unlike other printmaking methods that produce hundreds of identical copies, a monoprint produces only ONE single unique impression because the ink on the plate is transferred almost entirely during the first press!',
    kenyanContext: 'Kenyan public health campaigns and environmental groups use graphic posters placed at chief’s barazas, schools, and health centers to educate communities on handwashing and malaria prevention.',
    order: 4,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  }
];

lessons.forEach(l => {
  if (!db.lessons.some(existing => existing.id === l.id)) {
    db.lessons.push(l);
    console.log('Added lesson:', l.id);
  }
});

// 5. Missions 39 to 42 (world-creative-studio)
const missions = [
  {
    id: 'mission-g6-ca-u1-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 39: Two-Point Illusion – Vanishing Point Architects',
    description: 'Master the horizon line, vanishing points, and construct lifelike 3D structures on paper.',
    order: 39,
    orderIndex: 39,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-perspective-master',
    badge: 'badge-g6-ca-perspective-master',
    lessonId: 'lesson-g6-ca-u1-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u1-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u1-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 40: Shades & Shadows – Master Tonal Draughtsman',
    description: 'Master cross-hatching, stippling dots, core shadows, and compose a balanced still-life artwork.',
    order: 40,
    orderIndex: 40,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-tonal-artist',
    badge: 'badge-g6-ca-tonal-artist',
    lessonId: 'lesson-g6-ca-u1-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u1-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u2-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 41: Color Alchemist – Wheels, Schemes & Harmonies',
    description: 'Mix primary, secondary, and tertiary hues; compose complementary contrasts and soothing monochromatic tints.',
    order: 41,
    orderIndex: 41,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-color-alchemist',
    badge: 'badge-g6-ca-color-alchemist',
    lessonId: 'lesson-g6-ca-u2-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u2-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u2-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 42: Press & Poster – Printmaking & Graphic Messaging',
    description: 'Create expressive monoprints, cut stencils, and design bold advocacy posters with impactful lettering.',
    order: 42,
    orderIndex: 42,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-graphic-designer',
    badge: 'badge-g6-ca-graphic-designer',
    lessonId: 'lesson-g6-ca-u2-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u2-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  }
];

missions.forEach(m => {
  if (!db.missions.some(existing => existing.id === m.id)) {
    db.missions.push(m);
    console.log('Added mission:', m.id);
  }
});

// 6. Questions: 48 Questions
const questions = [
  // Mission 39 (Unit 1 Lesson 1: q-g6-ca-u1-001 to 012)
  {
    id: 'q-g6-ca-u1-001',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What is the purpose of linear perspective in drawing and painting?',
    options: [
      'To create the realistic illusion of three-dimensional depth and distance on a flat 2D surface',
      'To make drawings completely invisible',
      'To erase all pencil lines automatically',
      'To make paper turn into cardboard'
    ],
    correctAnswer: 'To create the realistic illusion of three-dimensional depth and distance on a flat 2D surface',
    explanation: 'Linear perspective uses geometric guidelines and vanishing points to simulate real-world optical depth on flat surfaces.',
    socraticHint: 'How does an artist make a flat sheet of paper look like a deep 3D landscape with receding roads and buildings?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-002',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What is the "horizon line" in perspective drawing?',
    options: [
      'The imaginary horizontal line representing the viewer’s eye level',
      'A vertical line marking the edge of the drawing board',
      'A zigzag line representing lightning',
      'The diagonal border of the picture frame'
    ],
    correctAnswer: 'The imaginary horizontal line representing the viewer’s eye level',
    explanation: 'The horizon line always corresponds exactly to the viewer’s eye level, establishing the vantage point for all perspective construction.',
    socraticHint: 'Which horizontal guideline represents the exact height of the artist’s eyes when viewing a scene?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-003',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'In two-point perspective, how many vanishing points are placed on the horizon line?',
    options: [
      'Two vanishing points (one on the far left and one on the far right)',
      'One vanishing point in the exact center',
      'Four vanishing points in each corner',
      'Zero vanishing points'
    ],
    correctAnswer: 'Two vanishing points (one on the far left and one on the far right)',
    explanation: 'Two-point perspective uses two separate vanishing points to show an object or building viewed from an angle or corner.',
    socraticHint: 'How many vanishing points give "two-point perspective" its name?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-004',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What happens to the appearance of identical telephone poles or trees as they recede into the distance along a road in perspective?',
    options: [
      'They appear progressively smaller and closer together as they approach the vanishing point',
      'They grow taller and wider as they move further away',
      'They remain identical in size and spacing on paper',
      'They turn into floating clouds'
    ],
    correctAnswer: 'They appear progressively smaller and closer together as they approach the vanishing point',
    explanation: 'Due to perspective diminution, distant objects appear smaller in height and the visual intervals between them compress.',
    socraticHint: 'Do distant objects look smaller and closer together, or bigger and farther apart to your eyes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-005',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What angle of view is represented when an object is drawn completely below the horizon line?',
    options: [
      'Bird’s eye view (viewed looking down from above)',
      'Worm’s eye view (viewed looking up from the ground)',
      'Microscopic cross-section view',
      'Underwater view'
    ],
    correctAnswer: 'Bird’s eye view (viewed looking down from above)',
    explanation: 'When objects sit below the viewer’s eye level (horizon line), the viewer looks down onto their top surfaces (bird’s eye view).',
    socraticHint: 'If an object is below your eye level, are you looking down onto its top or looking up under it?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-006',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What angle of view is represented when an object is drawn completely above the horizon line?',
    options: [
      'Worm’s eye view (viewed looking up from below)',
      'Bird’s eye view (looking down)',
      'Aerial satellite view',
      'Plan view from a ceiling'
    ],
    correctAnswer: 'Worm’s eye view (viewed looking up from below)',
    explanation: 'When objects rise above the horizon line, the viewer looks up at their undersides, creating a dramatic worm’s eye perspective.',
    socraticHint: 'If a tall building towers high above your eye level, are you looking up at it like a worm on the ground?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-007',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What are orthogonal (receding) lines in perspective drawing?',
    options: [
      'Diagonal construction lines that lead from the corners of an object towards the vanishing points',
      'Wavy lines used to represent ocean waves',
      'Horizontal lines marking the edge of a table',
      'Circular lines drawn around tree trunks'
    ],
    correctAnswer: 'Diagonal construction lines that lead from the corners of an object towards the vanishing points',
    explanation: 'Orthogonals are the perspective guidelines connecting object corners to the vanishing points, establishing receding edges.',
    socraticHint: 'Which construction lines connect the corners of a box to the vanishing points on the horizon?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-008',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'When drawing a house in two-point perspective, what line is drawn first facing the artist?',
    options: [
      'The vertical front corner edge of the building',
      'The chimney smoke',
      'The door knob',
      'The glass window panes'
    ],
    correctAnswer: 'The vertical front corner edge of the building',
    explanation: 'In two-point perspective, the artist begins with the nearest vertical corner edge, from which walls recede to the two vanishing points.',
    socraticHint: 'When looking at a building from its corner, which nearest edge do you draw first between the two vanishing points?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-009',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'Why do railroad tracks appear to meet at a single point on the horizon even though the steel rails are strictly parallel in reality?',
    options: [
      'Optical perspective makes parallel lines appear to converge at the vanishing point on the horizon',
      'The rails actually bend and cross over each other',
      'The train pushes the rails together as it drives',
      'The tracks end at a sharp triangular point'
    ],
    correctAnswer: 'Optical perspective makes parallel lines appear to converge at the vanishing point on the horizon',
    explanation: 'Human eyes perceive parallel lines receding into distance as converging toward a single vanishing point at infinity.',
    socraticHint: 'Does the illusion of distance make parallel lines seem to meet together at a vanishing point?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-010',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What tool should an artist use to keep orthogonal perspective guidelines crisp and straight when plotting buildings?',
    options: [
      'A straight ruler and a light pencil (2H or HB)',
      'A blunt marker pen drawn freehand',
      'A paintbrush with thick wet paint',
      'A piece of charcoal'
    ],
    correctAnswer: 'A straight ruler and a light pencil (2H or HB)',
    explanation: 'A straight ruler ensures precise angles to the vanishing points, and light pencil marks allow easy erasing of guidelines once finished.',
    socraticHint: 'Which measuring tool helps you draw precise straight perspective lines to the vanishing points?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-011',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'In two-point perspective, what happens to all vertical lines of a building (such as corner walls, door frames, and window sides)?',
    options: [
      'They remain strictly vertical (perpendicular to the horizon line)',
      'They slant diagonally toward the vanishing point',
      'They curve into semi-circles',
      'They turn horizontally upside down'
    ],
    correctAnswer: 'They remain strictly vertical (perpendicular to the horizon line)',
    explanation: 'In two-point perspective, only horizontal edges recede to vanishing points; all vertical heights remain true vertical lines at 90° to the horizon.',
    socraticHint: 'Do the upright corner edges of a building stay strictly vertical or do they lean sideways?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-012',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l1',
    text: 'What common error occurs if an artist places the two vanishing points too close together in the center of the paper in two-point perspective?',
    options: [
      'The object appears unnaturally distorted and squashed like looking through a distorted fish-eye lens',
      'The drawing disappears into the paper',
      'The colors of the pencil change to red',
      'The paper tears in half'
    ],
    correctAnswer: 'The object appears unnaturally distorted and squashed like looking through a distorted fish-eye lens',
    explanation: 'Placing vanishing points too close produces severe, unnatural angles; vanishing points should be placed far apart, often beyond the paper edges.',
    socraticHint: 'Why should vanishing points be placed far apart on the horizon line rather than cramped together?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 40 (Unit 1 Lesson 2: q-g6-ca-u1-013 to 024)
  {
    id: 'q-g6-ca-u1-013',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What shading technique uses two or more crossing sets of parallel lines to create tonal depth and shadow gradation?',
    options: [
      'Cross-hatching',
      'Single line drawing',
      'Tracing',
      'Stenciling'
    ],
    correctAnswer: 'Cross-hatching',
    explanation: 'Cross-hatching overlays sets of parallel lines at angles; the denser the grid of intersecting lines, the darker the shadow tone.',
    socraticHint: 'What do we call shading where parallel lines cross over each other at an angle like a mesh?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-014',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What shading technique builds up tones and textures entirely using patterns of tiny dots?',
    options: [
      'Stippling (Pointillism)',
      'Cross-hatching',
      'Smudging',
      'Carving'
    ],
    correctAnswer: 'Stippling (Pointillism)',
    explanation: 'Stippling uses dots of ink or pencil; densely spaced dots create dark tones, while scattered dots represent light areas.',
    socraticHint: 'Which technique uses clusters of tiny pencil or ink dots to build up shadows and forms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-015',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is the "highlight" on a sphere or fruit in a drawing?',
    options: [
      'The brightest spot where direct light from the light source strikes the surface directly',
      'The darkest shadow underneath the fruit',
      'The pencil outline around the edge',
      'The shadow cast on the wall'
    ],
    correctAnswer: 'The brightest spot where direct light from the light source strikes the surface directly',
    explanation: 'The highlight reflects the direct light source and is often left as pure white paper without any shading.',
    socraticHint: 'What do we call the brightest glowing spot where direct light hits an object first?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-016',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is a "cast shadow" in a still life drawing?',
    options: [
      'The dark shadow projected by an object onto the tabletop or ground because it blocks light',
      'The shadow inside the artist’s eye',
      'The color of the light bulb',
      'The bright highlight on the fruit'
    ],
    correctAnswer: 'The dark shadow projected by an object onto the tabletop or ground because it blocks light',
    explanation: 'A cast shadow falls onto an adjacent surface when an opaque object blocks light from passing through.',
    socraticHint: 'What dark silhouette shadow is cast onto the table surface opposite the light source?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-017',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is "reflected light" on the shadowed side of a round object?',
    options: [
      'Light that bounces off the surrounding table or ground back into the shadow area of the object',
      'Direct sunlight from a window',
      'A beam of laser light',
      'The color of the artist’s pencil'
    ],
    correctAnswer: 'Light that bounces off the surrounding table or ground back into the shadow area of the object',
    explanation: 'Reflected light bounces off nearby surfaces into the shadow zone, preventing the edge from being pitch black and enhancing roundness.',
    socraticHint: 'What subtle light bounces off a white tabletop back onto the shadow underside of a fruit?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-018',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What principle of art describes placing objects so that one partially blocks or covers another to create depth in a still life composition?',
    options: [
      'Overlapping',
      'Symmetry',
      'Framing',
      'Distortion'
    ],
    correctAnswer: 'Overlapping',
    explanation: 'Overlapping establishes clear spatial depth: the object that covers another is instantly perceived as being in front.',
    socraticHint: 'What technique places one fruit slightly in front of another so it partially covers it?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-019',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'Which pencil grade has softer graphite that produces dark, rich tones and shadows suitable for shading still life compositions?',
    options: [
      '4B or 6B pencil',
      '4H or 6H pencil',
      'HB pencil',
      'F pencil'
    ],
    correctAnswer: '4B or 6B pencil',
    explanation: 'B grade pencils (Black/soft) contain more graphite and less clay, laying down soft, deep black shadows effortlessly.',
    socraticHint: 'Do "H" (hard) pencils or "B" (soft/black) pencils make darker and softer shading marks?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-020',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is a "tortillon" (or blending stump) used for in drawing?',
    options: [
      'A tightly rolled paper tool used to smudge and smoothly blend pencil graphite tones',
      'A sharp knife used to cut paper',
      'A brush used to apply liquid glue',
      'A compass used to draw circles'
    ],
    correctAnswer: 'A tightly rolled paper tool used to smudge and smoothly blend pencil graphite tones',
    explanation: 'A tortillon is made of rolled paper and allows artists to blend pencil tones smoothly without using oily fingers that stain paper.',
    socraticHint: 'Which rolled paper pencil-like tool is used to blend and smooth graphite shading on paper?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-021',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is "proportion" in drawing a still life group composed of a clay water jug and a cup?',
    options: [
      'The correct size and scale relationship between the jug and the cup so neither looks unnaturally big or small',
      'The brand name of the pencil used',
      'The price of the paper',
      'The speed at which the artist draws'
    ],
    correctAnswer: 'The correct size and scale relationship between the jug and the cup so neither looks unnaturally big or small',
    explanation: 'Proportion concerns the relative dimensions of parts to the whole and to neighboring objects in the composition.',
    socraticHint: 'What principle ensures that a teacup is drawn in natural size relative to a large teapot?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-022',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is the "focal point" in an artistic still life composition?',
    options: [
      'The primary area of interest or dominant subject that first attracts the viewer’s attention',
      'The smallest pencil dot in the background',
      'The signature of the artist at the bottom',
      'The table leg under the cloth'
    ],
    correctAnswer: 'The primary area of interest or dominant subject that first attracts the viewer’s attention',
    explanation: 'The focal point is the center of visual interest created through contrast, size, or placement to command attention.',
    socraticHint: 'What do we call the main center of interest in an artwork that your eye notices first?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-023',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'How should an artist follow the contour curves of a rounded ceramic pot when applying shading lines?',
    options: [
      'Curve the cross-hatching lines along the rounded 3D surface (cross-contour lines) to enhance its cylindrical volume',
      'Draw straight flat horizontal lines only',
      'Color outside the lines randomly',
      'Cover the entire drawing with black shoe polish'
    ],
    correctAnswer: 'Curve the cross-hatching lines along the rounded 3D surface (cross-contour lines) to enhance its cylindrical volume',
    explanation: 'Cross-contour lines curve around the form like latitude lines on a globe, reinforcing the 3D volume of rounded objects.',
    socraticHint: 'Should shading lines curve along the surface of a round pot or stay flat and straight?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u1-024',
    subStrandId: 'substrand-g6-ca-u1',
    lessonId: 'lesson-g6-ca-u1-l2',
    text: 'What is a "viewfinder" in art, and how does it help a learner setting up a still life drawing?',
    options: [
      'A rectangular cardboard window frame used to isolate and compose the best arrangement of objects before sketching',
      'A pair of reading spectacles',
      'A telescope for looking at stars',
      'A digital calculator'
    ],
    correctAnswer: 'A rectangular cardboard window frame used to isolate and compose the best arrangement of objects before sketching',
    explanation: 'A cardboard viewfinder frames the scene, helping the artist decide what to include, crop, and where to position the focal point.',
    socraticHint: 'How does looking through a small cardboard rectangular frame help you choose the best view to draw?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 41 (Unit 2 Lesson 1: q-g6-ca-u2-001 to 012)
  {
    id: 'q-g6-ca-u2-001',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What are the three primary colours that cannot be created by mixing other pigments together?',
    options: [
      'Red, Yellow, and Blue',
      'Orange, Green, and Purple',
      'Black, White, and Grey',
      'Brown, Pink, and Gold'
    ],
    correctAnswer: 'Red, Yellow, and Blue',
    explanation: 'Red, Yellow, and Blue are the foundational primary pigment colours from which all other secondary and tertiary colours are mixed.',
    socraticHint: 'Which three pure pigment colours are mixed together to make all other colours?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-002',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What secondary colour is created by mixing equal amounts of Yellow and Blue paint?',
    options: [
      'Green',
      'Orange',
      'Purple',
      'Brown'
    ],
    correctAnswer: 'Green',
    explanation: 'Yellow mixed with Blue produces the secondary colour Green.',
    socraticHint: 'What fresh leafy colour do you get when you mix yellow sunshine with blue sky paint?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-003',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What are complementary colours on the colour wheel?',
    options: [
      'Colours that sit directly opposite each other on the colour wheel (e.g. Red and Green, Blue and Orange)',
      'Colours that sit next to each other in a line',
      'Colours that are all mixed with black paint',
      'Colours that make drawings invisible'
    ],
    correctAnswer: 'Colours that sit directly opposite each other on the colour wheel (e.g. Red and Green, Blue and Orange)',
    explanation: 'Complementary colours sit opposite each other; when placed side-by-side, they create the greatest visual contrast and vibrancy.',
    socraticHint: 'What do we call pairs of colours that sit opposite each other across the colour wheel?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-004',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is a "tint" of a colour in painting?',
    options: [
      'A colour that has been lightened by adding White paint',
      'A colour that has been darkened by adding Black paint',
      'A colour mixed with sand',
      'A colour mixed with kerosene'
    ],
    correctAnswer: 'A colour that has been lightened by adding White paint',
    explanation: 'Adding white to any pure hue produces a lighter value called a tint (e.g. Red + White = Pink).',
    socraticHint: 'What do you get when you mix white paint into a color to make it lighter?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-005',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is a "shade" of a colour in painting?',
    options: [
      'A colour that has been darkened by adding Black paint',
      'A colour mixed with water',
      'A colour lightened with white',
      'A clear transparent varnish'
    ],
    correctAnswer: 'A colour that has been darkened by adding Black paint',
    explanation: 'Adding black to any pure colour creates a darker value called a shade (e.g. Blue + Black = Navy Blue).',
    socraticHint: 'What do you get when you mix black paint into a color to make it darker?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-006',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is an "analogous" colour scheme in art?',
    options: [
      'Using three or four colours that sit side-by-side next to each other on the colour wheel (e.g. Yellow, Yellow-Green, Green)',
      'Using completely opposite colors',
      'Using only black and white',
      'Mixing every paint color into brown mud'
    ],
    correctAnswer: 'Using three or four colours that sit side-by-side next to each other on the colour wheel (e.g. Yellow, Yellow-Green, Green)',
    explanation: 'Analogous colours share a common hue and sit adjacent on the wheel, creating a soothing, harmonious visual effect.',
    socraticHint: 'What scheme uses neighbor colors sitting side-by-side on the color wheel?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-007',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'Which group contains ONLY warm colours that evoke sunlight, fire, and warmth in an artwork?',
    options: [
      'Red, Orange, and Yellow',
      'Blue, Green, and Violet',
      'Black, White, and Grey',
      'Navy, Silver, and Teal'
    ],
    correctAnswer: 'Red, Orange, and Yellow',
    explanation: 'Warm colours (red, orange, yellow) stimulate energy, appear to advance forward in a painting, and evoke heat.',
    socraticHint: 'Which colors remind you of the sun, fire flames, and hot tea?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-008',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is a "tertiary" (intermediate) colour, and how is it named?',
    options: [
      'A colour created by mixing a primary with an adjacent secondary colour, named with the primary colour first (e.g. Blue-Green, Red-Orange)',
      'A colour mixed with sand and salt',
      'A colour found only in outer space',
      'A colour that cannot be seen by the human eye'
    ],
    correctAnswer: 'A colour created by mixing a primary with an adjacent secondary colour, named with the primary colour first (e.g. Blue-Green, Red-Orange)',
    explanation: 'Tertiary colours lie between primaries and secondaries on the 12-part wheel, and convention lists the primary component first.',
    socraticHint: 'How do you name an intermediate color made by mixing a primary (like blue) with a secondary (like green)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-009',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is a "monochromatic" colour scheme in painting?',
    options: [
      'Using only one single hue combined with its various tints, shades, and tones',
      'Using every colour in the rainbow simultaneously',
      'Using only metallic gold paint',
      'Painting with clear tap water'
    ],
    correctAnswer: 'Using only one single hue combined with its various tints, shades, and tones',
    explanation: 'Mono means one, chroma means colour; monochromatic art explores the full tonal range of a single chosen colour.',
    socraticHint: 'What does "mono" (meaning one) tell you about a monochromatic painting?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-010',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What happens when two complementary colours (such as Red and Green) are mixed together in equal proportions on a palette?',
    options: [
      'They neutralize each other, producing a dull neutral grey or brownish earthy tone',
      'They turn into pure bright neon yellow',
      'They catch fire and spark',
      'They turn into transparent water'
    ],
    correctAnswer: 'They neutralize each other, producing a dull neutral grey or brownish earthy tone',
    explanation: 'Because complementary pairs contain all three primary colours combined, mixing them cancels out intensity, creating neutral chromatic browns and greys.',
    socraticHint: 'When opposite colors on the wheel cancel each other out in a paint cup, what earthy neutral tone do they create?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-011',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What visual effect occurs when cool colours like deep blues and blue-greens are used in the background of a landscape painting?',
    options: [
      'They appear to recede (step back) into the distance, enhancing the feeling of atmospheric perspective',
      'They jump aggressively forward right into the viewer’s face',
      'They make the paper look hot',
      'They make trees look like stone statues'
    ],
    correctAnswer: 'They appear to recede (step back) into the distance, enhancing the feeling of atmospheric perspective',
    explanation: 'Cool colors recede visually, creating the atmospheric illusion of distant mountain ranges and deep horizons.',
    socraticHint: 'Do cool blue mountain tones seem to step back into the far distance or jump forward?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-012',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l1',
    text: 'What is the complementary color pair for Yellow on the standard color wheel?',
    options: [
      'Purple (Violet)',
      'Orange',
      'Green',
      'Red'
    ],
    correctAnswer: 'Purple (Violet)',
    explanation: 'Purple is directly opposite Yellow on the color wheel, forming its complementary partner.',
    socraticHint: 'Which royal secondary colour made of red and blue sits directly across from yellow on the colour wheel?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 42 (Unit 2 Lesson 2: q-g6-ca-u2-013 to 024)
  {
    id: 'q-g6-ca-u2-013',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is unique about a "monoprint" compared to other printmaking techniques?',
    options: [
      'It produces only a single unique impression because most of the pigment transfers from the plate in the first press',
      'It can print 10,000 identical copies',
      'It uses no paint or ink at all',
      'It can only be printed on glass'
    ],
    correctAnswer: 'It produces only a single unique impression because most of the pigment transfers from the plate in the first press',
    explanation: 'Mono means one; a monoprint is a painterly print where the matrix cannot produce identical duplicates.',
    socraticHint: 'What does the prefix "mono" in monoprint tell you about how many copies it produces?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-014',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'How is a stencil relief print created in art class?',
    options: [
      'Cutting out shapes from an oiled card or plastic sheet and dabbing ink through the cut-out openings onto paper or fabric',
      'Drawing on glass with a diamond cutter',
      'Pouring hot wax on the floor',
      'Folding paper into origami birds'
    ],
    correctAnswer: 'Cutting out shapes from an oiled card or plastic sheet and dabbing ink through the cut-out openings onto paper or fabric',
    explanation: 'A stencil acts as a mask; ink or paint is applied through the cut-out apertures using a sponge or stiff brush.',
    socraticHint: 'How do you print repeated letters and patterns using cut-out holes in a cardboard sheet?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-015',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is the roller tool called that printmakers use to spread a thin, even layer of ink over a printing plate?',
    options: [
      'Brayer',
      'Paint scraper',
      'Rolling pin',
      'Easel'
    ],
    correctAnswer: 'Brayer',
    explanation: 'A brayer is a small hand-roller used to roll out and apply printmaking ink smoothly across a block or glass plate.',
    socraticHint: 'What is the special art name of the rubber hand-roller used to roll out printing ink?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-016',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is the primary visual purpose of a public awareness poster designed by a student?',
    options: [
      'To communicate an urgent, important message clearly and persuasively using bold images and concise text',
      'To test how much small text can fit onto a page',
      'To hide the topic from the public',
      'To sell expensive imported sports cars'
    ],
    correctAnswer: 'To communicate an urgent, important message clearly and persuasively using bold images and concise text',
    explanation: 'Posters are visual communication tools designed to catch attention quickly and convey civic, environmental, or health messages.',
    socraticHint: 'What makes a public awareness poster effective when seen by passersby from a distance?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-017',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'Why should lettering on a school campaign poster (e.g. "Save Water, Conserve Life") be bold, clean, and well-spaced?',
    options: [
      'So that the slogan can be easily read and understood from a distance by people walking past',
      'To make letters look like secret code',
      'Because paint dries faster when letters are big',
      'So that letters take up all the white space'
    ],
    correctAnswer: 'So that the slogan can be easily read and understood from a distance by people walking past',
    explanation: 'Poster typography must prioritize legibility and clarity; people often view posters while walking past from several meters away.',
    socraticHint: 'Why must words on a poster be bold and neat instead of tiny cursive handwriting?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-018',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is a "call to action" in graphic poster design?',
    options: [
      'A clear, compelling instruction telling the viewer what positive action to take (e.g. "Wash Your Hands with Soap!")',
      'A phone number to call the school principal',
      'A list of the artist’s favorite hobbies',
      'A greeting saying good morning'
    ],
    correctAnswer: 'A clear, compelling instruction telling the viewer what positive action to take (e.g. "Wash Your Hands with Soap!")',
    explanation: 'A call to action motivates the viewer to adopt a specific behavior, such as planting trees, recycling, or showing kindness.',
    socraticHint: 'What phrase on a poster urges the viewer to take action, like "Plant a Tree Today"?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-019',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'In block printing, which parts of the potato or soft linoleum block will print ink onto the paper?',
    options: [
      'The raised, uncut surface areas that receive ink',
      'The hollow cut-away areas',
      'Only the back of the block',
      'None of the block'
    ],
    correctAnswer: 'The raised, uncut surface areas that receive ink',
    explanation: 'In relief printing, the raised surfaces hold the ink and transfer the image, while carved-away recesses remain blank.',
    socraticHint: 'Does the ink touch the raised uncut surface of a stamp or the deep carved-out grooves?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-020',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'Why must words and letters be carved in reverse (mirror image) onto a relief printing block?',
    options: [
      'Because pressing the block flips the image horizontally onto the paper, making reversed carving print forward correctly',
      'To test the artist’s spelling skills',
      'Because printing ink only works backwards',
      'To keep the words confidential until dry'
    ],
    correctAnswer: 'Because pressing the block flips the image horizontally onto the paper, making reversed carving print forward correctly',
    explanation: 'Stamping an inked block produces a mirror reversal; carving letters backwards ensures they read forward on the final print.',
    socraticHint: 'When you stamp a stamp onto paper, does the print appear reversed or forward compared to the stamp face?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-021',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What simple natural materials can Kenyan primary school pupils use as printing blocks for creating repetitive fabric patterns?',
    options: [
      'Sweet potatoes, cassava, halved lemons, okra pods, and carved corks',
      'Metal coins and plastic bottles',
      'Glass bottles and broken plates',
      'Cigarette butts and plastic bags'
    ],
    correctAnswer: 'Sweet potatoes, cassava, halved lemons, okra pods, and carved corks',
    explanation: 'Organic tubers and vegetables like okra and potatoes are affordable, safe, and easily carved to create striking geometric fabric prints.',
    socraticHint: 'Which common kitchen vegetables can be cut and stamped in ink to create flower and geometric prints?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-022',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is "contrast" in poster design, and how is it achieved between text and background?',
    options: [
      'A striking difference between elements, such as using dark bold letters on a clean light background so words stand out immediately',
      'Making letters the exact same color as the background',
      'Blurring all the words so they cannot be read',
      'Painting the entire poster black'
    ],
    correctAnswer: 'A striking difference between elements, such as using dark bold letters on a clean light background so words stand out immediately',
    explanation: 'High tonal and color contrast separates text from backgrounds, ensuring instant readability and visual punch.',
    socraticHint: 'Why do dark letters on a bright white or yellow background stand out so clearly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-023',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'What is a "subtractive" monoprinting method?',
    options: [
      'Covering a smooth plate completely with ink, and then scratching or wiping away areas of ink with a rag or stick to reveal white highlights before pressing',
      'Subtracting numbers during a math lesson',
      'Throwing paint at a wall',
      'Tearing paper into tiny pieces'
    ],
    correctAnswer: 'Covering a smooth plate completely with ink, and then scratching or wiping away areas of ink with a rag or stick to reveal white highlights before pressing',
    explanation: 'The subtractive (dark-field) method wipes away ink from a solid dark plate to create light tones, producing dramatic chiaroscuro prints.',
    socraticHint: 'What do we call the monoprint method where you roll black ink all over a plate and wipe away the light parts?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u2-024',
    subStrandId: 'substrand-g6-ca-u2',
    lessonId: 'lesson-g6-ca-u2-l2',
    text: 'Why is it important to wash printing tools (brayers, glass plates, stencil sponges) with clean soapy water immediately after printmaking class?',
    options: [
      'To prevent ink and acrylic paint from drying and permanently hardening on the rollers and tools, preserving them for future use',
      'To make tools smell like lavender',
      'Because paint is radioactive',
      'To turn the water into drinking water'
    ],
    correctAnswer: 'To prevent ink and acrylic paint from drying and permanently hardening on the rollers and tools, preserving them for future use',
    explanation: 'Dried acrylics and inks ruin the smooth rubber surface of brayers and clog stencil pores; prompt cleaning ensures tools last for years.',
    socraticHint: 'What happens to rubber rollers and sponges if acrylic paint is allowed to dry rock-hard on them?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  }
];

questions.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
  }
});

console.log(`Added ${questions.length} questions for Units 1 & 2.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 1 to cbe_database.json!');
