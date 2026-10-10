/**
 * Grade 6 Creative Arts & Sports - Batch 2 Generator
 * Content: Units 3 & 4 (Art and Craft)
 * - Unit 3: Clay Modeling, Ceramics, Firing & 3D Sculpture
 * - Unit 4: Indigenous Crafts, Weaving, Beadwork & Puppetry
 * Missions: Orders 43, 44, 45, 46 (world-creative-studio)
 * Questions: 48 (24 per unit: q-g6-ca-u3-001 to q-g6-ca-u4-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Creative Arts & Sports Batch 2 (Units 3 & 4) ---');

// 1. Units 3 & 4 (subStrands)
const units = [
  {
    id: 'substrand-g6-ca-u3',
    strandId: 'strand-g6-ca-art',
    learningAreaId: 'la-creative-g6',
    title: 'Clay Modeling, Pinch/Coil/Slab Ceramics, Firing & Sculpture',
    name: 'Clay Modeling, Pinch/Coil/Slab Ceramics, Firing & Sculpture',
    description: 'Preparing natural clay (wedging, kneading); constructing functional pots using pinch, coil, and slab methods; joining leather-hard pieces using slip and scoring; surface decoration (incising, burnishing, stamping); open-pit and kiln firing; and carving three-dimensional sculptural forms in soapstone or wood.',
    cbeCompetency: 'Ceramic sculpting skill, three-dimensional tactile expression, traditional craftsmanship, and material transformation',
    estimatedMinutes: 30,
    order: 3,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ca-u4',
    strandId: 'strand-g6-ca-art',
    learningAreaId: 'la-creative-g6',
    title: 'Indigenous African Crafts: Weaving, Leatherwork, Beadwork & Puppetry',
    name: 'Indigenous African Crafts: Weaving, Leatherwork, Beadwork & Puppetry',
    description: 'Exploring indigenous Kenyan crafting traditions: processing sisal and banana fibers for woven artifacts (kiondo, mats); designing traditional beadwork ornaments with cultural color symbolism; simple leather craft (cutting, punching, lacing); and constructing glove and rod puppets from recycled papier-mâché for dramatic storytelling.',
    cbeCompetency: 'Indigenous cultural craft preservation, upcycling innovation, tactile manipulation, and theatrical visual storytelling',
    estimatedMinutes: 30,
    order: 4,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 3 & 4
const lessons = [
  // Unit 3
  {
    id: 'lesson-g6-ca-u3-l1',
    subStrandId: 'substrand-g6-ca-u3',
    title: 'Clay Preparation, Pinch, Coil & Slab Construction',
    content: 'Clay is a natural malleable earth material formed by the weathering of feldspathic rocks over thousands of years.\n\n1. Preparing Natural Clay for Work:\n- Collecting clay from riverbanks or anthills and removing stones, roots, and debris.\n- Wedging and Kneading: Pushing, folding, and slamming clay repeatedly to eliminate trapped air pockets. Trapped air causes pottery to explode violently during firing!\n- Plasticity: The quality of moist clay that allows it to be bent and shaped without cracking.\n\n2. Primary Hand-Building Techniques:\n- Pinch Method: Starting with a smooth ball of clay, pressing the thumb into the center, and rhythmically pinching the walls between thumb and fingers to create a hollow bowl or cup of uniform thickness.\n- Coil Method: Rolling clay into long, even "snakes" or coils on a flat table. Coils are spiraled upward layer upon layer to build tall rounded pots or vases. Smoothing the seams inside and outside binds the coils together.\n- Slab Method: Rolling clay flat into uniform sheets (slabs) using a wooden rolling pin with guide sticks. Slabs are allowed to stiffen to "leather-hard" stage and joined to make square boxes, tiles, or geometric containers.\n\n3. Joining Clay: Scoring and Slip:\n- Score: Scratching crisscross marks onto the two edges to be joined.\n- Slip: A creamy liquid mixture of clay and water acting as ceramic glue.\n- Pressing firmly and smoothing the seam ensures pieces fuse permanently during drying and firing.\n\n4. Surface Decoration Techniques:\n- Incising: Carving line patterns into leather-hard clay using a pointed stick.\n- Stamping: Pressing textured objects (shells, braided rope, bottle tops) into soft clay.\n- Burnishing: Rubbing the leather-hard pot with a smooth river pebble to create a glossy, waterproof sheen before firing.',
    didYouKnow: 'If an air bubble remains trapped inside wet clay, the moisture inside expands into high-pressure steam when fired in a kiln, causing the entire pot to shatter with explosive force!',
    kenyanContext: 'Kenyan women potters among the Luo (Karachuonyo) and Abaluhya (Ilesi in Kakamega) have used coil hand-building for generations to produce large earthenware cooking pots (agulu) and water jars.',
    order: 5,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u3-l2',
    subStrandId: 'substrand-g6-ca-u3',
    title: 'Drying, Pit Firing & Carving 3D Sculptures',
    content: 'Transforming fragile unfired clay into durable earthenware ceramic requires careful drying and heat treatment.\n\n1. Stages of Clay Drying:\n- Plastic (Wet): Soft and moldable.\n- Leather-Hard: Partially dried, firm like cheese; ideal stage for carving, incising, attaching handles, and burnishing.\n- Bone-Dry (Greenware): Completely air-dried at room temperature; brittle and pale; ready for the fire.\n- Firing must never be rushed! Pots must dry slowly in the shade; direct midday sun causes uneven shrinking and cracking.\n\n2. Traditional Open-Pit Firing vs Kiln Firing:\n- Open-Pit Firing: A traditional indigenous method where dry pots are stacked over firewood in a shallow pit, covered with dry grass, cow dung cakes, and maize stalks, and burned for several hours at around 600°C–800°C.\n- Kiln Firing: Firing pots inside an insulated brick furnace (kiln) at controlled temperatures above 900°C, permanently transforming clay minerals into rock-hard ceramic.\n\n3. Subtractive Sculpture: Soapstone Carving in Kisii:\n- Sculpture in the round: Three-dimensional artwork that can be viewed from all sides.\n- Subtractive Method: Starting with a solid block and carving away excess material using chisels, files, and sandpaper.\n- Kisii Soapstone (Steatite): Mined at Tabaka in Kisii County; a naturally soft metamorphic rock easily carved into wildlife animals, human figures, bowls, and decorative sculptures before being polished and dyed.',
    didYouKnow: 'Tabaka in Kisii County is the only place in Eastern Africa with massive commercial deposits of soft volcanic steatite (soapstone), supporting thousands of artisan sculptors whose handicrafts are exported worldwide!',
    kenyanContext: 'Artisans in Tabaka, Kisii carve soapstone into iconic Kenyan animals (lions, elephants, rhinos) and traditional chess sets, using wet sandpaper and coconut oil to achieve a lustrous, glassy finish.',
    order: 6,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },

  // Unit 4
  {
    id: 'lesson-g6-ca-u4-l1',
    subStrandId: 'substrand-g6-ca-u4',
    title: 'Indigenous Kenyan Crafts: Weaving, Leatherwork & Beadwork',
    content: 'Kenya boasts an extraordinary living heritage of indigenous functional crafts passed through generations.\n\n1. Fiber Weaving (Basketry & Mats):\n- Raw Materials: Sisal fibers (extracted from agave sisalana leaves), banana pseudo-stem fibers, dried palm fronds (makuti), and reed grasses.\n- The Kiondo: A world-famous traditional woven basket made by Agikuyu and Akamba women. Sisal twine is spun on the thigh, dyed with natural boiled bark dyes, and twined in tight spiraling stitches with leather straps.\n- Mkeka: A traditional flat floor mat woven from dried dyed doum palm leaves (miyaa) along the Swahili coast.\n\n2. Traditional Beadwork Craft:\n- Practiced with unmatched artistry by Maasai, Samburu, Turkana, and Pokot women.\n- Beads strung onto strong nylon or sinew threads, woven into collar necklaces, headdresses (nkopit), earrings, and wristbands.\n- Geometric patterns and symbolic colors:\n  * Red: Bravery, strength, and livestock vitality.\n  * White: Purity, peace, and health.\n  * Blue: The vast sky and divine rainfall.\n  * Green: Lush pasture and nourishing vegetation.\n  * Black: The African people and collective resilience.\n\n3. Leather Craft (Functional Leather Goods):\n- Processing animal hides and skins through scraping, vegetable tanning with tree barks (wattle tree), softening, and oiling.\n- Tools used: Sharp craft knife, leather punch (for making neat eyelet holes), awl (for piercing), and leather laces.\n- Crafting coin purses, school book covers, waist belts, sandals, and scabbards.',
    didYouKnow: 'The authentic Kenyan Kiondo basket has become so internationally admired for its durability and eco-friendly design that international fashion houses in Paris and Tokyo sell it as luxury eco-fashion!',
    kenyanContext: 'Women’s craft cooperatives in Machakos, Kitui, and Kajiado earn independent household income by selling handcrafted kiondos and beaded jewelry to tourists and international fair-trade markets.',
    order: 7,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u4-l2',
    subStrandId: 'substrand-g6-ca-u4',
    title: 'Puppetry: Construction, Animation & Storytelling Theatre',
    content: 'Puppetry is an ancient theatrical art where inanimate figures are brought to life by human puppeteers to entertain, educate, and dramatize social stories.\n\n1. Types of Puppets:\n- Glove (Hand) Puppets: Puppet head and cloth body that fits directly over the puppeteer’s hand like a mitten. The index finger controls the head, while the thumb and middle finger animate the two hands.\n- Rod Puppets: Puppets manipulated from below using stiff wooden or metal control rods attached to the head and hands.\n- Shadow Puppets: Flat silhouette cut-outs held between a light source and a translucent white cloth screen.\n- Marionettes (String Puppets): Suspended figures operated from above using strings attached to a wooden cross control.\n\n2. Making a Papier-Mâché Glove Puppet Head:\n- Papier-mâché is a crafting material made of paper pieces or pulp bound together with glue or flour paste.\n- Step 1: Mold a core head shape from crushed newspaper or clay mounted on an empty toilet paper cardboard roll (neck tube).\n- Step 2: Tear old newspapers into small strips (never cut with scissors; torn edges blend smoothly).\n- Step 3: Dip strips into flour paste or wood glue and apply 4–5 overlapping layers over the head mold.\n- Step 4: Allow to dry completely until rock-hard, then paint facial features (eyes, nose, mouth) using bright acrylic colors.\n- Step 5: Add hair using sisal fiber or yarn, and sew a cloth glove gown attached firmly to the neck tube.\n\n3. Educational Puppetry for Community Awareness:\n- Puppets provide a safe, non-threatening medium to address sensitive topics: anti-bullying, water sanitation, road safety, and environmental hygiene in schools.',
    didYouKnow: 'In puppetry, puppeteers practice "ventriloquism" and vocal characterization, changing their voices to give distinct comedic or wise personalities to different puppet characters!',
    kenyanContext: 'Kenyan community education groups (such as Kikozi and street puppeteers) perform humorous puppet dramas at marketplace barazas and schools to teach children hygiene and disease prevention.',
    order: 8,
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

// 3. Missions 43 to 46 (world-creative-studio)
const missions = [
  {
    id: 'mission-g6-ca-u3-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 43: Earth & Hand – Ceramic Master Potters',
    description: 'Master clay wedging, pinch bowls, coiled water jars, slab boxes, and scor-and-slip joinery.',
    order: 43,
    orderIndex: 43,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-potter',
    badge: 'badge-g6-ca-potter',
    lessonId: 'lesson-g6-ca-u3-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u3-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u3-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 44: Fire & Stone – Kilns, Pits & Soapstone Sculptors',
    description: 'Master slow shaded drying, open-pit firings, and carve three-dimensional Kisii soapstone animals.',
    order: 44,
    orderIndex: 44,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-sculptor',
    badge: 'badge-g6-ca-sculptor',
    lessonId: 'lesson-g6-ca-u3-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u3-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u4-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 45: Twine, Beads & Hide – Indigenous Kenyan Artisans',
    description: 'Twine sisal kiondos, weave Maasai beadwork collars, and craft functional leather goods.',
    order: 45,
    orderIndex: 45,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-craft-master',
    badge: 'badge-g6-ca-craft-master',
    lessonId: 'lesson-g6-ca-u4-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u4-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u4-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 46: Voices of the Stage – Puppeteers & Storytellers',
    description: 'Mold papier-mâché puppet heads, attach glove costumes, and animate educational puppet theater.',
    order: 46,
    orderIndex: 46,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-puppeteer',
    badge: 'badge-g6-ca-puppeteer',
    lessonId: 'lesson-g6-ca-u4-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u4-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  }
];

missions.forEach(m => {
  if (!db.missions.some(existing => existing.id === m.id)) {
    db.missions.push(m);
    console.log('Added mission:', m.id);
  }
});

// 4. Questions: 48 Questions
const questions = [
  // Mission 43 (Unit 3 Lesson 1: q-g6-ca-u3-001 to 012)
  {
    id: 'q-g6-ca-u3-001',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'Why must natural clay be thoroughly wedged and kneaded before hand-building ceramic pots?',
    options: [
      'To expel trapped air pockets which would expand and shatter the pot violently during firing',
      'To change the natural color of clay into purple',
      'To turn the clay into plastic',
      'To make the clay freeze into ice'
    ],
    correctAnswer: 'To expel trapped air pockets which would expand and shatter the pot violently during firing',
    explanation: 'Wedging removes trapped air bubbles and distributes moisture evenly, preventing catastrophic cracking and explosions inside the kiln.',
    socraticHint: 'What happens to trapped air pockets in moist clay when heated to high temperatures in a fire?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-002',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'How is a pot built using the traditional "pinch" method in pottery?',
    options: [
      'By pressing the thumb into the center of a clay ball and pinching walls outward between fingers and thumb',
      'By slicing clay into thin noodles with a knife',
      'By melting clay in boiling water',
      'By pouring liquid clay into a wooden mould'
    ],
    correctAnswer: 'By pressing the thumb into the center of a clay ball and pinching walls outward between fingers and thumb',
    explanation: 'Pinch pottery begins with a solid sphere; pressing the thumb in and rotating while pinching creates a hollow vessel of even wall thickness.',
    socraticHint: 'How do you shape a ball of clay using your thumb in the center and fingers on the outside?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-003',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What is the "coil" method of building large earthenware water and cooking pots?',
    options: [
      'Rolling clay into long, rope-like coils and layering them in rings or spirals to build tall walls',
      'Smashing clay with a heavy hammer',
      'Blowing air through a hollow reed into clay',
      'Cutting geometric tiles with a razor blade'
    ],
    correctAnswer: 'Rolling clay into long, rope-like coils and layering them in rings or spirals to build tall walls',
    explanation: 'Coil building rolls clay into ropes that are spiraled upward; smoothing seams fuses the coils into strong rounded pot bodies.',
    socraticHint: 'Which pottery method stacks rolled rope-like clay "snakes" on top of each other?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-004',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What two steps are essential when joining two separate pieces of clay (such as attaching a handle to a mug)?',
    options: [
      'Scoring (scratching crosshatch marks on edges) and applying slip (liquid clay glue)',
      'Applying clear plastic tape and staples',
      'Washing both pieces with cold milk',
      'Drying both pieces in the sun before joining'
    ],
    correctAnswer: 'Scoring (scratching crosshatch marks on edges) and applying slip (liquid clay glue)',
    explanation: 'Scoring roughens the contact surfaces and slip acts as ceramic cement, welding the clay molecules permanently together.',
    socraticHint: 'What do potters call scratching lines on clay surfaces and applying creamy clay slip as glue?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-005',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What is "slip" in pottery and ceramics?',
    options: [
      'A smooth, creamy mixture of clay and water used as ceramic glue and for surface decoration',
      'A slippery floor in the art room',
      'A commercial chemical paint thinner',
      'A plastic glaze powder'
    ],
    correctAnswer: 'A smooth, creamy mixture of clay and water used as ceramic glue and for surface decoration',
    explanation: 'Slip is clay suspended in water with the consistency of thick cream, essential for joining leather-hard components.',
    socraticHint: 'What creamy mixture of wet clay and water is used like glue to bond clay pieces?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-006',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What stage of clay drying is described as "leather-hard"?',
    options: [
      'Clay that has partially dried and stiffened like firm cheese, ideal for carving, attaching handles, and incising',
      'Clay that has been baked in a fire for 24 hours',
      'Clay that is so wet it runs through your fingers like soup',
      'Clay that has turned into real animal leather'
    ],
    correctAnswer: 'Clay that has partially dried and stiffened like firm cheese, ideal for carving, attaching handles, and incising',
    explanation: 'At the leather-hard stage, clay holds its shape firmly without slumping, making it perfect for trimming and incising decorative patterns.',
    socraticHint: 'What stage of clay is firm enough to hold its shape like hard cheese but still moist enough to carve easily?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-007',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What is the "burnishing" technique used by traditional Kenyan potters on leather-hard clay pots before firing?',
    options: [
      'Rubbing the leather-hard clay surface with a smooth river pebble to compress clay particles and create a glossy, waterproof sheen',
      'Painting the pot with engine oil',
      'Soaking the pot in cold milk',
      'Covering the pot with sand'
    ],
    correctAnswer: 'Rubbing the leather-hard clay surface with a smooth river pebble to compress clay particles and create a glossy, waterproof sheen',
    explanation: 'Burnishing aligns tiny clay platelets flat against the surface, producing a polished, shiny surface that makes the earthenware pot less porous.',
    socraticHint: 'How does rubbing a leather-hard pot with a smooth river pebble give it a polished, shiny surface?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-008',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What tool is used in slab pottery to roll out flat sheets of clay of uniform, even thickness?',
    options: [
      'A wooden rolling pin rolled over two wooden guide sticks of equal height',
      'A heavy metal crowbar',
      'A lawn mower roller',
      'A sharp pair of scissors'
    ],
    correctAnswer: 'A wooden rolling pin rolled over two wooden guide sticks of equal height',
    explanation: 'Guide sticks placed on either side ensure the rolling pin flattens the slab to an identical thickness throughout, preventing weak spots.',
    socraticHint: 'Which wooden baker’s tool rolled over guide sticks flattens clay slabs evenly?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-009',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What is "incising" in pottery decoration?',
    options: [
      'Engraving or carving decorative linear patterns into leather-hard clay using a pointed wooden stylus or needle tool',
      'Throwing clay against a wall',
      'Dyeing clay with food coloring',
      'Melting clay with a magnifying glass'
    ],
    correctAnswer: 'Engraving or carving decorative linear patterns into leather-hard clay using a pointed wooden stylus or needle tool',
    explanation: 'Incising cuts grooves into the surface, creating geometric lines and traditional decorative motifs before the pot is fired.',
    socraticHint: 'What decorative technique carves lines into the surface of firm leather-hard clay?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-010',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'Why must newly molded clay pots be dried slowly in the shade rather than under scorching direct sunshine?',
    options: [
      'Direct sun causes the outer surface to dry and shrink much faster than the inside, leading to severe cracking and warping',
      'Because clay will melt in the sun like butter',
      'Because birds will eat the clay',
      'To prevent the clay from turning into gold'
    ],
    correctAnswer: 'Direct sun causes the outer surface to dry and shrink much faster than the inside, leading to severe cracking and warping',
    explanation: 'Uneven drying stresses clay; slow shaded drying allows water to evaporate uniformly throughout the vessel wall.',
    socraticHint: 'What happens to moist clay walls if the outside dries quickly in the sun while the inside is still wet?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-011',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'What property of clay describes its ability to be bent, molded, and stretched into shapes without breaking or crumbling?',
    options: [
      'Plasticity',
      'Brittleness',
      'Porosity',
      'Transparency'
    ],
    correctAnswer: 'Plasticity',
    explanation: 'Plasticity is the essential working characteristic of clay, allowing it to hold form when wet and respond to the potter’s touch.',
    socraticHint: 'What do we call the moldable, workable quality of wet clay?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-012',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l1',
    text: 'How do potters check if greenware (unfired pottery) is completely bone-dry and safe to place into the kiln or open-pit fire?',
    options: [
      'It feels warm to the touch (coolness indicates moisture), appears pale chalky in color, and makes a dry ringing sound when gently tapped',
      'It sticks to fingers like glue',
      'It bends easily like rubber',
      'It weighs three times more than when wet'
    ],
    correctAnswer: 'It feels warm to the touch (coolness indicates moisture), appears pale chalky in color, and makes a dry ringing sound when gently tapped',
    explanation: 'Moist clay feels cold against the cheek due to ongoing evaporation; bone-dry greenware feels room-temperature warm and looks pale.',
    socraticHint: 'Does completely dry clay feel cool and damp against your skin, or room-temperature warm and chalky?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 44 (Unit 3 Lesson 2: q-g6-ca-u3-013 to 024)
  {
    id: 'q-g6-ca-u3-013',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What happens to clay during firing that permanently transforms it from soft earth into hard, water-resistant ceramic pottery?',
    options: [
      'High temperatures (above 600°C) burn away chemical water and fuse silica particles into a permanent, hard ceramic matrix that can never dissolve in water again',
      'The clay freezes into solid ice',
      'The clay turns into rubber',
      'The clay dissolves into ash'
    ],
    correctAnswer: 'High temperatures (above 600°C) burn away chemical water and fuse silica particles into a permanent, hard ceramic matrix that can never dissolve in water again',
    explanation: 'Heat triggers a permanent chemical and mineral transformation (sintering), turning clay minerals into hard, irreversible ceramic stone.',
    socraticHint: 'Why can a fired ceramic pot never dissolve back into mud even when soaked in water for years?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-014',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What fuel materials are traditionally used by indigenous African potters during open-pit firing of earthenware pots?',
    options: [
      'Dry firewood, dry grass, cow dung cakes, and maize stalks',
      'Kerosene and gasoline',
      'Plastic bags and car tires',
      'Charcoal briquettes inside an electric oven'
    ],
    correctAnswer: 'Dry firewood, dry grass, cow dung cakes, and maize stalks',
    explanation: 'Dry biomass fuels burn steadily, gradually raising pit temperatures to 700°C–800°C to fire earthenware without thermal shock.',
    socraticHint: 'Which natural dry farm materials (wood, grass, cow dung) are stacked around pots in an open bonfire pit?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-015',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What mineral is mined at Tabaka in Kisii County that is celebrated worldwide for being carved into smooth artistic sculptures?',
    options: [
      'Soapstone (Steatite)',
      'Granite',
      'Marble',
      'Diamond'
    ],
    correctAnswer: 'Soapstone (Steatite)',
    explanation: 'Kisii soapstone is a talc-rich metamorphic rock (steatite), naturally soft and soapy to the touch, making it ideal for hand-carving.',
    socraticHint: 'What soft, soapy-textured stone mined at Tabaka is famous for handicraft animal carvings?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-016',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'Why is sculpture carving called a "subtractive" art method?',
    options: [
      'Because the artist begins with a solid block and subtracts (removes) material by cutting, chipping, and filing away excess stone or wood',
      'Because the sculpture gets smaller and smaller until it disappears',
      'Because it costs less money than painting',
      'Because the artist adds pieces of clay together'
    ],
    correctAnswer: 'Because the artist begins with a solid block and subtracts (removes) material by cutting, chipping, and filing away excess stone or wood',
    explanation: 'Subtractive sculpture carves away material from an initial block to reveal the form inside, unlike additive modeling which builds up volume.',
    socraticHint: 'In wood or stone carving, do you add material on or subtract (carve away) material from a solid block?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-017',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What is a "sculpture in the round"?',
    options: [
      'A fully three-dimensional, free-standing sculpture that can be viewed and appreciated from all sides and angles (360 degrees)',
      'A circular picture drawn on paper',
      'A round coin stamped by a machine',
      'A sculpture that rolls across the floor'
    ],
    correctAnswer: 'A fully three-dimensional, free-standing sculpture that can be viewed and appreciated from all sides and angles (360 degrees)',
    explanation: 'A sculpture in the round is fully three-dimensional; viewers can walk around it to admire the front, sides, and back.',
    socraticHint: 'What do we call a 3D statue that you can walk around and view from every angle?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-018',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'How do Kisii soapstone carvers achieve a smooth, glossy finish on their animal sculptures after carving?',
    options: [
      'Sanding the carved stone in water with fine waterproof sandpaper, followed by polishing with wax or mineral oil',
      'Painting the stone with tar',
      'Baking the stone inside a bread oven',
      'Scraping the stone with rough gravel'
    ],
    correctAnswer: 'Sanding the carved stone in water with fine waterproof sandpaper, followed by polishing with wax or mineral oil',
    explanation: 'Wet sanding with water removes all tool chisel marks; buffing with wax produces a silky smooth, glassy surface luster.',
    socraticHint: 'How does wet sanding with fine sandpaper and buffing with polish create a silky glossy surface on soapstone?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-019',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What safety precaution should a learner always observe when carving soapstone or wood in art class?',
    options: [
      'Always carve and push the blade away from the body and hands, and wear a dust mask to avoid inhaling fine stone dust',
      'Pull the sharp chisel directly toward your fingers',
      'Blow stone dust into classmates’ eyes',
      'Run with open carving knives'
    ],
    correctAnswer: 'Always carve and push the blade away from the body and hands, and wear a dust mask to avoid inhaling fine stone dust',
    explanation: 'Cutting away from the body prevents severe accidental cuts, and dust masks protect delicate lung airways from talc inhalation.',
    socraticHint: 'In which direction should you always push a sharp blade when carving, and how do you protect your lungs from fine dust?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-020',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What is a "relief sculpture", and how does it differ from a free-standing sculpture in the round?',
    options: [
      'A relief sculpture projects three-dimensionally from a flat background panel and is viewed only from the front',
      'A relief sculpture hangs upside down from trees',
      'A relief sculpture is made of melted plastic',
      'A relief sculpture can only be seen in the dark'
    ],
    correctAnswer: 'A relief sculpture projects three-dimensionally from a flat background panel and is viewed only from the front',
    explanation: 'In relief sculpture (like carvings on a wooden door or coin face), figures stand out from a solid flat background rather than free-standing.',
    socraticHint: 'What kind of sculpture is carved into a flat wall or wooden door so that figures emerge from a flat background?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-021',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'Why is greenware (bone-dry pottery) extremely fragile before it has undergone bisque firing?',
    options: [
      'The clay particles are only held together by dried surface tension without fused mineral bonds; even a small knock will break it into pieces',
      'It has already melted into glass',
      'It is made of sugar',
      'It is as strong as iron steel'
    ],
    correctAnswer: 'The clay particles are only held together by dried surface tension without fused mineral bonds; even a small knock will break it into pieces',
    explanation: 'Greenware has dried water, but until high firing temperatures chemically sinter the clay, it remains delicate and brittle.',
    socraticHint: 'Why must you handle completely dried greenware pottery with great gentleness before it goes into the fire?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-022',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What is the special furnace built of refractory firebricks used for firing ceramics at controlled high temperatures called?',
    options: [
      'Kiln',
      'Bakehouse',
      'Incinerator',
      'Boiler'
    ],
    correctAnswer: 'Kiln',
    explanation: 'A kiln is a specialized high-temperature oven capable of reaching 900°C–1,300°C for firing clay ceramics and glazes.',
    socraticHint: 'What is the name of the special brick oven used by potters to bake pottery at extreme temperatures?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-023',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'What happens if fired pottery is cooled too rapidly by splashing cold water on it while it is still red-hot from the kiln?',
    options: [
      'Thermal shock causes the pottery to crack and shatter immediately into fragments',
      'The pot turns into solid diamond',
      'The pot grows larger in size',
      'The pot bounces like a rubber ball'
    ],
    correctAnswer: 'Thermal shock causes the pottery to crack and shatter immediately into fragments',
    explanation: 'Sudden temperature contraction (thermal shock) cracks ceramics; pots must cool gradually inside the ashes or closed kiln.',
    socraticHint: 'What happens when boiling hot ceramic is suddenly shocked with freezing cold water?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u3-024',
    subStrandId: 'substrand-g6-ca-u3',
    lessonId: 'lesson-g6-ca-u3-l2',
    text: 'How can primary school pupils create expressive three-dimensional additive sculptures without expensive materials in school?',
    options: [
      'Modeling with locally prepared clay, papier-mâché pulp, or constructing with recycled scrap wire and cardboard',
      'Buying imported marble blocks from Europe',
      'Using computer-controlled 3D laser printers only',
      'Waiting until high school before touching art materials'
    ],
    correctAnswer: 'Modeling with locally prepared clay, papier-mâché pulp, or constructing with recycled scrap wire and cardboard',
    explanation: 'Resourceful artists use readily available local clay, paper pulp, wire, and carton boxes to sculpt expressive 3D forms.',
    socraticHint: 'How can you sculpt beautiful 3D animals and models using recycled cardboard, paper pulp, and local clay?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 45 (Unit 4 Lesson 1: q-g6-ca-u4-001 to 012)
  {
    id: 'q-g6-ca-u4-001',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What natural plant fiber is traditionally extracted from agave leaves and spun into strong twine to weave the Kenyan Kiondo basket?',
    options: [
      'Sisal fiber',
      'Cotton lint',
      'Wool fleece',
      'Silk thread'
    ],
    correctAnswer: 'Sisal fiber',
    explanation: 'Sisal leaves are decorticated to yield tough, durable natural fibers that are twisted into twine and dyed to weave kiondo baskets.',
    socraticHint: 'Which spiky succulent plant produces strong pale fibers used for weaving kiondo baskets and ropes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-002',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'In traditional Maasai and Samburu beadwork, what cultural meaning does the color RED symbolize?',
    options: [
      'Bravery, strength, and livestock blood/vitality',
      'Cowards who run away from danger',
      'Cold ocean water and ice',
      'Dry desert sand'
    ],
    correctAnswer: 'Bravery, strength, and livestock blood/vitality',
    explanation: 'Red is sacred in Maasai culture, representing the bravery of warriors, life-giving blood, and cultural strength.',
    socraticHint: 'What warrior virtue and vital life element is represented by red beads in Maasai jewelry?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-003',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What cultural meaning does the color WHITE symbolize in traditional Kenyan beadwork ornaments?',
    options: [
      'Purity, peace, and nourishing cow’s milk',
      'Anger and war',
      'Dark stormy night clouds',
      'Rotten firewood'
    ],
    correctAnswer: 'Purity, peace, and nourishing cow’s milk',
    explanation: 'White represents milk (the primary sustaining food of cattle pastoralists) and spiritual purity and communal peace.',
    socraticHint: 'Why do pastoralist beadworkers associate white beads with milk, health, and peace?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-004',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What traditional flat floor mat is handwoven from dried palm fronds (miyaa) along the Kenyan coast for sitting, praying, and sleeping?',
    options: [
      'Mkeka',
      'Kiondo',
      'Kikoi',
      'Kanga'
    ],
    correctAnswer: 'Mkeka',
    explanation: 'A Mkeka is a traditional woven palm-leaf mat, renowned for its colorful geometric dyed strips and coastal cultural use.',
    socraticHint: 'What is the Swahili name for the flat woven palm-leaf floor mat used in coastal homes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-005',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'Which hand tool is used in leather craft to punch neat circular holes along the edges of leather strips for lacing?',
    options: [
      'Leather revolving punch (hole puncher)',
      'Carpenter’s claw hammer',
      'Paint roller',
      'Soldering iron'
    ],
    correctAnswer: 'Leather revolving punch (hole puncher)',
    explanation: 'A revolving leather punch has multiple circular punch tubes to pierce clean eyelets through thick leather without tearing.',
    socraticHint: 'Which rotating tool with circular cutting tubes punches clean eyelets in leather belts?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-006',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What traditional tanning method was used by African communities to soften and preserve raw cattle and goat hides into durable leather?',
    options: [
      'Vegetable tanning using tannins boiled from indigenous tree barks (like wattle tree or mangrove bark) and rubbing with animal fat',
      'Dipping hides in battery acid',
      'Painting hides with household detergent',
      'Boiling hides in kerosene'
    ],
    correctAnswer: 'Vegetable tanning using tannins boiled from indigenous tree barks (like wattle tree or mangrove bark) and rubbing with animal fat',
    explanation: 'Vegetable tannins bind collagen proteins in animal skins, preventing bacterial decay and producing soft, flexible leather.',
    socraticHint: 'What natural chemical extracted from tree bark (like wattle) is used to tan raw animal skins into leather?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-007',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What is the "awl" used for when hand-stitching or lacing thick leather sandals and scabbards?',
    options: [
      'A pointed steel tool used to pierce holes in tough leather so a needle or lacing thong can pass through easily',
      'A brush used to polish shoes',
      'A ruler used to measure leather',
      'A pair of scissors used to trim paper'
    ],
    correctAnswer: 'A pointed steel tool used to pierce holes in tough leather so a needle or lacing thong can pass through easily',
    explanation: 'An awl pierces thick, stubborn leather ahead of needles, preventing bent needles and ensuring neat, even stitches.',
    socraticHint: 'What sharp pointed piercing spike makes needle holes through tough shoe leather?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-008',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'Which traditional circular beadwork ornament is worn proudly around the neck by Samburu and Maasai women as a mark of beauty and marital status?',
    options: [
      'Beaded disc collar necklace (Enkarewa)',
      'Baseball cap',
      'Plastic wristwatch',
      'Gold necktie'
    ],
    correctAnswer: 'Beaded disc collar necklace (Enkarewa)',
    explanation: 'The Enkarewa is a broad, flat circular beaded wedding collar with cascading bead pendants, symbolizing dignity and marriage.',
    socraticHint: 'What iconic wide flat circular beaded collar necklace is worn by Maasai women?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-009',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'How are natural plant dyes obtained by Kenyan kiondo weavers to dye sisal fibers into vibrant earthy colors?',
    options: [
      'Boiling sisal twine in water mixed with crushed tree barks, roots, onion skins, soot, and wild berries',
      'Spraying sisal with chemical car paint',
      'Leaving sisal under a blue neon light bulb',
      'Washing sisal with bleach'
    ],
    correctAnswer: 'Boiling sisal twine in water mixed with crushed tree barks, roots, onion skins, soot, and wild berries',
    explanation: 'Traditional weavers boil natural bark, roots, and minerals with fixatives (wood ash or salt) to produce non-toxic earthy dyes.',
    socraticHint: 'How do village weavers extract yellow, brown, and black dyes from wild roots, barks, and soot?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-010',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What valuable economic benefit does indigenous craftwork (kiondo weaving, beadwork, leather craft) provide to Kenyan rural women cooperatives?',
    options: [
      'Financial independence, household income, foreign currency earnings from tourism, and preservation of indigenous cultural knowledge',
      'Free air tickets to Europe every week',
      'Exemption from ever cooking at home',
      'A lifetime supply of imported plastic shoes'
    ],
    correctAnswer: 'Financial independence, household income, foreign currency earnings from tourism, and preservation of indigenous cultural knowledge',
    explanation: 'Artisan craft cooperatives empower rural women economically, funding children’s education while keeping indigenous skills alive.',
    socraticHint: 'How does selling handcrafted kiondos and beadwork to tourists empower rural mothers financially?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-011',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'Which traditional material was originally used to string beads and stitch leather before commercial nylon threads were introduced to Kenya?',
    options: [
      'Dried animal sinew (tendons) rolled into strong threads',
      'Strands of copper electric wire',
      'Thin strips of paper',
      'Strands of human hair'
    ],
    correctAnswer: 'Dried animal sinew (tendons) rolled into strong threads',
    explanation: 'Animal sinew (from cow or goat back muscles) is incredibly strong, flexible, and naturally resistant to snapping when dried and rolled.',
    socraticHint: 'Which strong animal tissue from tendons was traditionally dried and rolled into tough thread?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-012',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l1',
    text: 'What eco-friendly material is woven into durable open-weave shopping bags and grain sacks across agricultural counties?',
    options: [
      'Jute and sisal twine',
      'Single-use thin plastic polythene',
      'Lead sheets',
      'Glass fibers'
    ],
    correctAnswer: 'Jute and sisal twine',
    explanation: 'Natural biodegradable plant fibers like sisal and jute offer strong, reusable alternatives to banned single-use plastic carrier bags.',
    socraticHint: 'Which biodegradable plant fiber bags replaced banned single-use plastic polythene bags in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 46 (Unit 4 Lesson 2: q-g6-ca-u4-013 to 024)
  {
    id: 'q-g6-ca-u4-013',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What is a "glove puppet" (hand puppet) in theatrical performance?',
    options: [
      'A puppet worn over the puppeteer’s hand like a glove, where the index finger operates the head and the thumb and other fingers operate the arms',
      'A puppet operated by strings hanging from the ceiling',
      'A robot powered by batteries',
      'A giant statue carved of stone'
    ],
    correctAnswer: 'A puppet worn over the puppeteer’s hand like a glove, where the index finger operates the head and the thumb and other fingers operate the arms',
    explanation: 'Glove puppets fit directly onto the hand, allowing expressive head nods, waving arms, and animated movements from behind a puppet booth.',
    socraticHint: 'How does a puppeteer use their fingers inside a cloth glove puppet to move its head and arms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-014',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What is "papier-mâché", and how is it used to make lightweight, durable puppet heads in school art projects?',
    options: [
      'A crafting medium made of torn newspaper strips or paper pulp bound together with flour paste or glue that hardens when dry',
      'A French dish made of fried paper',
      'A type of wet cement poured into roads',
      'A chemical foam sprayed from fire extinguishers'
    ],
    correctAnswer: 'A crafting medium made of torn newspaper strips or paper pulp bound together with flour paste or glue that hardens when dry',
    explanation: 'Papier-mâché (French for "chewed paper") layers torn paper and paste over a mold; when dry, it forms a rigid, feather-light hollow shell.',
    socraticHint: 'What craft material uses strips of old newspaper soaked in glue or flour paste that dries rock hard?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-015',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'Why should paper strips for papier-mâché be torn by hand rather than cut with scissors?',
    options: [
      'Torn feathered edges blend and flatten seamlessly together without leaving sharp ridge lines on the puppet’s face',
      'Because scissors are not allowed in art class',
      'Because torn paper dries in two seconds',
      'Because cutting paper makes the glue dissolve'
    ],
    correctAnswer: 'Torn feathered edges blend and flatten seamlessly together without leaving sharp ridge lines on the puppet’s face',
    explanation: 'Torn edges have exposed fibers that overlap smoothly, creating a seamless, organic surface for the puppet’s facial sculpture.',
    socraticHint: 'Do soft torn paper edges blend together more smoothly on a curved face than sharp cut scissors lines?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-016',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What is a "rod puppet"?',
    options: [
      'A puppet whose head and limbs are manipulated from below the stage using stiff wooden, wire, or plastic control rods',
      'A puppet made entirely of fishing hooks',
      'A puppet that cannot move at all',
      'A puppet that floats on water'
    ],
    correctAnswer: 'A puppet whose head and limbs are manipulated from below the stage using stiff wooden, wire, or plastic control rods',
    explanation: 'Rod puppets are operated by rods attached to the hands and central body, allowing graceful, wide-ranging theatrical movements.',
    socraticHint: 'Which type of puppet is controlled from underneath using thin wooden or metal rods attached to its hands?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-017',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What component of a glove puppet allows the puppeteer’s index finger to comfortably insert into and turn the puppet’s head?',
    options: [
      'A sturdy hollow cardboard tube (neck tube) glued inside the papier-mâché head',
      'A solid lump of concrete',
      'A sharp steel nail',
      'A balloon filled with water'
    ],
    correctAnswer: 'A sturdy hollow cardboard tube (neck tube) glued inside the papier-mâché head',
    explanation: 'A toilet paper cardboard roll or rolled card tube creates a secure finger socket inside the head for precise movement control.',
    socraticHint: 'What hollow cylinder fitted inside the puppet head allows the puppeteer’s finger to steer the head?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-018',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'Why are puppets powerful educational communication tools in Kenyan primary schools and public health campaigns?',
    options: [
      'They entertain audiences while addressing sensitive community topics (hygiene, safety, bullying) in a disarming, engaging, and memorable way',
      'Because real human actors are not allowed to speak in public',
      'Because puppets can fly across the room',
      'Because puppets cost one million shillings each'
    ],
    correctAnswer: 'They entertain audiences while addressing sensitive community topics (hygiene, safety, bullying) in a disarming, engaging, and memorable way',
    explanation: 'Puppets capture imagination; children and communities relate freely to animated puppet characters, absorbing civic lessons without defensiveness.',
    socraticHint: 'Why do children and communities listen so attentively when a colorful puppet delivers lessons about hygiene and anti-bullying?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-019',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What simple household recipe can learners make to create non-toxic, inexpensive adhesive paste for papier-mâché modeling?',
    options: [
      'Wheat flour or cassava starch mixed with water and gently cooked into a smooth paste with a pinch of salt',
      'Melted plastic bottles mixed with kerosene',
      'Crushed glass mixed with battery acid',
      'Sand mixed with cooking oil'
    ],
    correctAnswer: 'Wheat flour or cassava starch mixed with water and gently cooked into a smooth paste with a pinch of salt',
    explanation: 'Cooked starch paste (made from wheat flour or cassava flour) is a completely non-toxic, cost-free, and strong traditional papier-mâché glue.',
    socraticHint: 'How can you cook kitchen wheat flour or cassava starch with water to make safe craft glue?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-020',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What is a "shadow puppet", and how is it operated during a theatrical performance?',
    options: [
      'A flat cut-out figure held on rods between a light source and a translucent white cloth screen to project animated shadows to the audience',
      'A puppet performed in pitch black darkness with zero light',
      'A live shadow cast by a tree on the grass',
      'A painting hung on a brick wall'
    ],
    correctAnswer: 'A flat cut-out figure held on rods between a light source and a translucent white cloth screen to project animated shadows to the audience',
    explanation: 'Shadow puppetry creates captivating silhouettes against an illuminated screen, using jointed card or leather figures moved with rods.',
    socraticHint: 'What kind of puppet uses flat cut-outs pressed behind a backlit white cloth screen to create moving shadows?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-021',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What theatrical skill should a student puppeteer practice to make their puppet character feel truly alive during a dialogue?',
    options: [
      'Moving the puppet’s mouth and body in sync with speaking, making it react to what other characters say, and maintaining consistent voice characterization',
      'Keeping the puppet completely motionless like a dead log',
      'Looking directly into the audience instead of at the puppet',
      'Dropping the puppet onto the floor'
    ],
    correctAnswer: 'Moving the puppet’s mouth and body in sync with speaking, making it react to what other characters say, and maintaining consistent voice characterization',
    explanation: 'Lifelike puppetry requires active listening; puppets must nod, gesture, and look at whoever is speaking to create theatrical illusion.',
    socraticHint: 'How does syncing body gestures and head nods with speech bring a puppet character to life on stage?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-022',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What recycled material can pupils use to craft hair, beards, and expressive eyebrows on a papier-mâché puppet head?',
    options: [
      'Unraveled sisal fibers, wool yarn, dry maize silk, and cloth scraps',
      'Sharp metal wires and nails',
      'Broken glass shards',
      'Wet mud that dries and crumbles'
    ],
    correctAnswer: 'Unraveled sisal fibers, wool yarn, dry maize silk, and cloth scraps',
    explanation: 'Maize silk, combed sisal fibers, and colorful wool yarn make natural, expressive hair textures when glued onto dried puppet heads.',
    socraticHint: 'Which common farm and craft fibers (like maize silk, sisal, or knitting wool) make great puppet hair?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-023',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'What is a puppet stage screen (or booth), and what is its purpose during a school puppet show?',
    options: [
      'A draped screen or wooden booth that conceals the puppeteers from view so the audience only sees the animated puppets performing',
      'A wall that blocks all sound from reaching the audience',
      'A cage to lock up bad actors',
      'A screen used for showing movies'
    ],
    correctAnswer: 'A draped screen or wooden booth that conceals the puppeteers from view so the audience only sees the animated puppets performing',
    explanation: 'The puppet booth hides the human operators, focusing full visual immersion and suspension of disbelief onto the puppets.',
    socraticHint: 'Why does a draped fabric screen hide the puppeteers standing below the puppet stage?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u4-024',
    subStrandId: 'substrand-g6-ca-u4',
    lessonId: 'lesson-g6-ca-u4-l2',
    text: 'How does creating and performing a puppet show develop teamwork and collaborative skills among Grade 6 learners?',
    options: [
      'Pupils work together as scriptwriters, puppet sculptors, costume designers, voice actors, and stage directors to present a unified drama',
      'Only one student does all the work while others sleep',
      'Students argue over who has the loudest voice',
      'It stops learners from talking to each other'
    ],
    correctAnswer: 'Pupils work together as scriptwriters, puppet sculptors, costume designers, voice actors, and stage directors to present a unified drama',
    explanation: 'Puppetry integrates diverse artistic and communication roles, fostering cooperative problem solving, active listening, and creative teamwork.',
    socraticHint: 'How does dividing roles—making puppets, writing the script, acting, and directing—teach learners cooperative teamwork?',
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

console.log(`Added ${questions.length} questions for Units 3 & 4.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 2 to cbe_database.json!');
