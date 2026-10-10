import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 Science and Technology Batch 1 (Units 1 & 2) ---');

// 1. Setup Learning Area: la-science-g6
const laSciG6 = {
  id: 'la-science-g6',
  gradeId: 'grade-6',
  name: 'Science & Technology',
  swahiliName: 'Sayansi na Teknolojia',
  icon: 'flask',
  color: '#06B6D4',
  description: 'In-depth scientific inquiry into classification of animals, plant reproduction, human circulatory and excretory systems, deficiency diseases, matter and energy, electrical circuits, spreadsheets, coding concepts, and simple machines.',
  strandsCount: 4
};

if (!db.learningAreas.some(la => la.id === laSciG6.id)) {
  db.learningAreas.push(laSciG6);
  console.log('Added learning area la-science-g6');
}

// Add to world-science-lab gameWorld learningAreaIds
const sciLab = db.gameWorlds.find(w => w.id === 'world-science-lab');
if (sciLab && !sciLab.learningAreaIds.includes('la-science-g6')) {
  sciLab.learningAreaIds.push('la-science-g6');
  console.log('Added la-science-g6 to world-science-lab');
}

// 2. Setup 4 Strands for Grade 6 Science
const strandsToAdd = [
  {
    id: 'strand-g6-sci-living',
    learningAreaId: 'la-science-g6',
    code: 'SCI-G6-STR-01',
    title: 'Living Things and Environment',
    swahiliTitle: 'Viumbehai na Mazingira',
    description: 'Classification of vertebrates and invertebrates, plant reproductive systems, pollination adaptations, seed dispersal, and ecosystem interdependence.',
    icon: 'feather'
  },
  {
    id: 'strand-g6-sci-human-body',
    learningAreaId: 'la-science-g6',
    code: 'SCI-G6-STR-02',
    title: 'Human Body and Health',
    swahiliTitle: 'Mwili wa Binadamu na Afya',
    description: 'The human circulatory and excretory systems, nutritional deficiency diseases, immunization, and community disease prevention.',
    icon: 'activity'
  },
  {
    id: 'strand-g6-sci-matter-energy',
    learningAreaId: 'la-science-g6',
    code: 'SCI-G6-STR-03',
    title: 'Matter and Energy',
    swahiliTitle: 'Mada na Nishati',
    description: 'Physical changes of state in matter, light propagation, reflection, refraction, sound transmission, and simple electrical circuits.',
    icon: 'zap'
  },
  {
    id: 'strand-g6-sci-tech',
    learningAreaId: 'la-science-g6',
    code: 'SCI-G6-STR-04',
    title: 'Digital Technology and Mechanics',
    swahiliTitle: 'Teknolojia ya Kidijitali na Mitambo',
    description: 'Spreadsheet software, block-based coding, cyber safety, force interactions, and simple machines (levers, pulleys, inclined planes, friction).',
    icon: 'cpu'
  }
];

strandsToAdd.forEach(str => {
  if (!db.strands.some(s => s.id === str.id)) {
    db.strands.push(str);
    console.log(`Added strand ${str.id}`);
  }
});

// 3. Sub-strands for Units 1 & 2
const subStrandsToAdd = [
  {
    id: 'substrand-g6-sci-u1',
    strandId: 'strand-g6-sci-living',
    learningAreaId: 'la-science-g6',
    title: 'Classification of Living Things: Vertebrates and Invertebrates',
    description: 'Observing, classifying, and comparing animals based on the presence of a vertebral column; examining the characteristics of the 5 vertebrate classes (mammals, birds, reptiles, amphibians, fish); exploring major invertebrate groups (insects, arachnids, crustaceans, molluscs, worms); and understanding ecological roles in Kenyan habitats.',
    cbeCompetency: 'Biological classification skills, scientific dichotomous discernment, comparative anatomy observation, and environmental conservation awareness',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g6-sci-u2',
    strandId: 'strand-g6-sci-living',
    learningAreaId: 'la-science-g6',
    title: 'Reproduction in Plants: Flower Anatomy, Pollination & Seed Dispersal',
    description: 'Investigating the anatomy and physiology of a complete flower (sepals, petals, stamen, pistil/carpel); comparing self-pollination with cross-pollination and insect vs wind adaptations; tracing fertilization and zygote formation; and analyzing agents and adaptive features of fruit and seed dispersal in Kenyan flora.',
    cbeCompetency: 'Botanical anatomical investigation, pollination mechanics analysis, and seed dispersal adaptation evaluation',
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

// 4. Lessons for Units 1 & 2
const lessonsToAdd = [
  {
    id: 'lesson-g6-sci-u1-l1',
    subStrandId: 'substrand-g6-sci-u1',
    title: 'Vertebrates: Characteristics of the Five Animal Classes',
    content: 'Animals exhibit tremendous biodiversity and are classified by skeletal structure and biological traits.\n\n1. Major Division: Vertebrates vs Invertebrates:\n- Vertebrates possess an internal backbone (vertebral column / spinal cord).\n- Invertebrates lack an internal vertebral column.\n\n2. The Five Vertebrate Classes:\n- Mammals:\n  * Warm-blooded (endothermic); body covered with hair or fur.\n  * Possess mammary glands to suckle young; give birth to live young (viviparous).\n  * Breathe using lungs. Examples: African elephant, lion, bat, dolphin.\n- Birds:\n  * Warm-blooded; covered with feathers; possess toothless beaks and scaly legs.\n  * Lay hard-shelled eggs; possess hollow light bones for flight.\n  * Breathe using lungs. Examples: Ostrich (Maasai Mara), crowned crane, weaver bird.\n- Reptiles:\n  * Cold-blooded (ectothermic); dry skin covered in waterproof scales or scutes.\n  * Lay soft leathery-shelled eggs on dry land; breathe using lungs.\n  * Examples: Nile crocodile (Galana River), chameleon, puff adder, leopard tortoise.\n- Amphibians:\n  * Cold-blooded; smooth moist scaleless skin permeable to water and gases.\n  * Young (tadpoles) breathe with gills in water; adults breathe with lungs and skin on land.\n  * Lay soft jelly-like eggs in water. Examples: African common toad, reed frog.\n- Fish:\n  * Cold-blooded; streamlined body covered in wet slimy scales.\n  * Possess fins for propulsion and steering; breathe dissolved oxygen using gills.\n  * Lay eggs in water. Examples: Tilapia (Ngege) in Lake Victoria, Nile perch, catfish.',
    didYouKnow: 'Bats are the only mammals capable of sustained powered flight, and whales and dolphins are warm-blooded mammals that breathe air through lungs despite living entirely in water!',
    kenyanContext: 'At Lake Nakuru National Park, visitors observe thousands of bird species, terrestrial mammals like rhinos, and amphibians flourishing around freshwater feeder streams.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-sci-u1-l2',
    subStrandId: 'substrand-g6-sci-u1',
    title: 'Invertebrates: Insects, Arachnids, Crustaceans, Molluscs & Worms',
    content: 'Over 95% of all animal species on Earth are invertebrates, possessing diverse protective structures.\n\n1. Major Invertebrate Phyla & Classes:\n- Insects (Hexapods):\n  * Body divided into 3 distinct sections: head, thorax, and abdomen.\n  * Possess 3 pairs of jointed walking legs (6 legs total) attached to the thorax.\n  * Have 1 pair of feelers (antennae) and compound eyes; breathe through spiracles and trachea.\n  * Most adults possess 1 or 2 pairs of wings. Examples: Honeybee (nyuki), army ant, grasshopper, termite.\n- Arachnids:\n  * Body divided into 2 sections: cephalothorax (fused head & chest) and abdomen.\n  * Possess 4 pairs of walking legs (8 legs total); lack antennae and wings.\n  * Examples: Baboon spider, scorpion, tick (kupe), mite.\n- Crustaceans:\n  * Possess a hard calcified exoskeleton (carapace); mostly aquatic.\n  * Possess 2 pairs of antennae and 5 or more pairs of jointed walking/swimming appendages.\n  * Examples: Freshwater river crabs, prawns, marine lobsters in Mombasa.\n- Molluscs:\n  * Soft unsegmented bodies, often protected by a hard calcium carbonate shell; move using a muscular foot.\n  * Examples: Giant African land snail, slug, freshwater mussel, octopus.\n- Worms:\n  * Elongated, soft, bilateral cylindrical or flattened bodies without jointed limbs.\n  * Earthworms are vital decomposers aerating and enriching Kenyan farm soils.',
    didYouKnow: 'Insects alone make up more than 80% of all animal species on Earth, and their pollination services sustain nearly all terrestrial plant life!',
    kenyanContext: 'Beekeepers in Kitui, Baringo, and Makueni use modern top-bar hives to raise honeybee colonies, which pollinate horticultural crops while generating organic honey.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-sci-u2-l1',
    subStrandId: 'substrand-g6-sci-u2',
    title: 'Anatomy of a Flower, Pollination & Fertilization',
    content: 'Flowers are the specialized reproductive structures of angiosperms (flowering plants).\n\n1. Parts of a Complete Flower:\n- Calyx (Sepals): Outermost green leaf-like structures that enclose and protect the flower bud.\n- Corolla (Petals): Brightly colored, scented structures designed to attract pollinators; often possess nectaries at the base.\n- Stamen (Male Reproductive Organ / Androecium):\n  * Anther: Lobed sac that produces and releases pollen grains containing male gametes (sperm).\n  * Filament: Slender stalk holding the anther in an optimal position for pollen transfer.\n- Pistil / Carpel (Female Reproductive Organ / Gynoecium):\n  * Stigma: Sticky top surface designed to receive and trap pollen grains.\n  * Style: Slender neck down which the pollen tube germinates and grows.\n  * Ovary: Swollen basal chamber enclosing one or more ovules (female gametes/egg cells).\n\n2. Pollination:\n- The transfer of pollen grains from the anther to the stigma.\n- Self-pollination: Transfer within the same flower or between flowers on the same plant.\n- Cross-pollination: Transfer from the anther of one plant to the stigma of another plant of the same species.\n- Insect vs Wind Pollination:\n  * Insect-pollinated (e.g., bean, hibiscus): Large bright petals, sweet scent, nectar, sticky heavy pollen, enclosed stigma.\n  * Wind-pollinated (e.g., maize, grass): Small dull green petals, no scent or nectar, long feathery exposed stigmas, abundant light powdery pollen.\n\n3. Fertilization:\n- The fusion of the male nucleus (from the pollen tube) with the female egg nucleus inside the ovule.\n- After fertilization, the ovule matures into a seed, while the ovary develops into a fruit.',
    didYouKnow: 'Every kernel of maize on a cob developed from an individual ovule fertilized by a single pollen grain landing on its own silk strand (style)!',
    kenyanContext: 'Trans-Nzoia maize farmers rely on wind pollination during the tasseling stage, where gentle breezes distribute pollen across hundreds of acres of cereal crops.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-sci-u2-l2',
    subStrandId: 'substrand-g6-sci-u2',
    title: 'Fruit and Seed Dispersal: Agents and Evolutionary Adaptations',
    content: 'Seed dispersal is the scattering of seeds away from the parent plant to avoid overcrowding and ensure survival.\n\n1. Why Seed Dispersal is Vital:\n- Prevents overcrowding and competition for sunlight, soil minerals, and water around the parent plant.\n- Enables plant species to colonize new geographical habitats.\n\n2. Agents and Adaptations of Dispersal:\n- Wind Dispersal (Upepo):\n  * Seeds are very light and small, possessing aerodynamic structures:\n  * Parachute hairs (pappus): Dandelion, sow thistle, milkweed.\n  * Wings (winged seeds): Jacaranda, mahogany, nandi flame.\n- Animal Dispersal (Wanyama):\n  * Succulent edible fruits: Sweet, juicy, brightly colored pericarps eaten by birds, primates, or humans; seeds pass undamaged through the digestive tract (e.g., guava, wild figs, tomatoes, passion fruit).\n  * Hooked or sticky fruits/seeds: Cling to animal fur, feathers, or human clothes with stiff spines or hooks (e.g., black jack / Bidens pilosa, devil\'s thorn).\n- Water Dispersal (Maji):\n  * Buoyant, water-resistant, air-filled fibrous husks:\n  * Coconut palm fruits float across coastal currents; water lily seeds float in freshwater streams.\n- Explosive Mechanism / Self-Dispersal (Mlipuko):\n  * Pods dry unevenly under hot sun, building mechanical tension until the pericarp violently splits along sutures, hurling seeds meters away (e.g., beans, peas, castor oil, croton).',
    didYouKnow: 'A coconut fruit can float in seawater for up to 100 days across thousands of kilometres of ocean and still germinate successfully when washed ashore on a sandy beach!',
    kenyanContext: 'In Kenyan semi-arid rangelands, goats and antelopes feed on acacia pods, scarifying the tough seed coat in their digestive tract, which allows seeds to sprout rapidly once deposited in manure.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(les => {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
});

// 5. Missions for Units 1 & 2 (Orders 43 to 46)
const missionsToAdd = [
  {
    id: 'mission-g6-sci-u1-m1',
    worldId: 'world-science-lab',
    title: 'Mission 43: Backbones & Beaks – Vertebrate Exploration',
    description: 'Explore the characteristics of mammals, birds, reptiles, amphibians, and fish across Kenyan ecosystems.',
    order: 43,
    orderIndex: 43,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-sci-vertebrates',
    badge: 'badge-g6-sci-vertebrates',
    lessonId: 'lesson-g6-sci-u1-l1',
    questionIds: [
      'q-g6-sci-u1-001', 'q-g6-sci-u1-002', 'q-g6-sci-u1-003', 'q-g6-sci-u1-004',
      'q-g6-sci-u1-005', 'q-g6-sci-u1-006', 'q-g6-sci-u1-007', 'q-g6-sci-u1-008',
      'q-g6-sci-u1-009', 'q-g6-sci-u1-010', 'q-g6-sci-u1-011', 'q-g6-sci-u1-012'
    ]
  },
  {
    id: 'mission-g6-sci-u1-m2',
    worldId: 'world-science-lab',
    title: 'Mission 44: Exoskeletons & Antennae – Invertebrate Taxonomy',
    description: 'Classify insects, arachnids, crustaceans, molluscs, and worms through comparative anatomy and dichotomous observation.',
    order: 44,
    orderIndex: 44,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-sci-invertebrates',
    badge: 'badge-g6-sci-invertebrates',
    lessonId: 'lesson-g6-sci-u1-l2',
    questionIds: [
      'q-g6-sci-u1-013', 'q-g6-sci-u1-014', 'q-g6-sci-u1-015', 'q-g6-sci-u1-016',
      'q-g6-sci-u1-017', 'q-g6-sci-u1-018', 'q-g6-sci-u1-019', 'q-g6-sci-u1-020',
      'q-g6-sci-u1-021', 'q-g6-sci-u1-022', 'q-g6-sci-u1-023', 'q-g6-sci-u1-024'
    ]
  },
  {
    id: 'mission-g6-sci-u2-m1',
    worldId: 'world-science-lab',
    title: 'Mission 45: Floral Architecture – Pollination & Fertilization',
    description: 'Explore flower anatomy, compare insect vs wind pollination adaptations, and trace fertilization in Kenyan crops.',
    order: 45,
    orderIndex: 45,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-sci-flower-pollination',
    badge: 'badge-g6-sci-flower-pollination',
    lessonId: 'lesson-g6-sci-u2-l1',
    questionIds: [
      'q-g6-sci-u2-001', 'q-g6-sci-u2-002', 'q-g6-sci-u2-003', 'q-g6-sci-u2-004',
      'q-g6-sci-u2-005', 'q-g6-sci-u2-006', 'q-g6-sci-u2-007', 'q-g6-sci-u2-008',
      'q-g6-sci-u2-009', 'q-g6-sci-u2-010', 'q-g6-sci-u2-011', 'q-g6-sci-u2-012'
    ]
  },
  {
    id: 'mission-g6-sci-u2-m2',
    worldId: 'world-science-lab',
    title: 'Mission 46: Flight of the Seed – Dispersal Mechanics',
    description: 'Analyze seed dispersal mechanisms: wind wings, animal hooks, buoyant water floats, and explosive pods.',
    order: 46,
    orderIndex: 46,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-sci-seed-dispersal',
    badge: 'badge-g6-sci-seed-dispersal',
    lessonId: 'lesson-g6-sci-u2-l2',
    questionIds: [
      'q-g6-sci-u2-013', 'q-g6-sci-u2-014', 'q-g6-sci-u2-015', 'q-g6-sci-u2-016',
      'q-g6-sci-u2-017', 'q-g6-sci-u2-018', 'q-g6-sci-u2-019', 'q-g6-sci-u2-020',
      'q-g6-sci-u2-021', 'q-g6-sci-u2-022', 'q-g6-sci-u2-023', 'q-g6-sci-u2-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 6. Questions for Units 1 & 2 (48 questions: 24 for Unit 1, 24 for Unit 2)
const questionsToAdd = [
  // ==========================================
  // Unit 1 Lesson 1: Vertebrates (q-g6-sci-u1-001 to 012)
  // ==========================================
  {
    id: 'q-g6-sci-u1-001',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'What is the primary defining anatomical feature that separates all vertebrates from invertebrates?',
    options: [
      'Presence of an internal backbone (vertebral column)',
      'Ability to fly in the air',
      'Presence of an external shell',
      'Living exclusively in water'
    ],
    correctAnswer: 'Presence of an internal backbone (vertebral column)',
    explanation: 'Vertebrates are distinguished by having an internal vertebral column (backbone) that encloses and protects the spinal cord.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which internal skeletal structure runs along the back of all vertebrates?'
  },
  {
    id: 'q-g6-sci-u1-002',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Which class of vertebrates gives birth to live young and suckles them with milk from mammary glands?',
    options: [
      'Mammals',
      'Reptiles',
      'Amphibians',
      'Birds'
    ],
    correctAnswer: 'Mammals',
    explanation: 'Mammals are endothermic vertebrates characterized by fur or hair and the possession of mammary glands that produce milk for nourishing young.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which class includes humans, lions, elephants, and cows?'
  },
  {
    id: 'q-g6-sci-u1-003',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Which pair of vertebrate classes consists strictly of warm-blooded (endothermic) animals that maintain a constant body temperature?',
    options: [
      'Mammals and Birds',
      'Reptiles and Amphibians',
      'Fish and Reptiles',
      'Amphibians and Fish'
    ],
    correctAnswer: 'Mammals and Birds',
    explanation: 'Only mammals and birds are warm-blooded (endothermic); they generate metabolic heat to maintain a constant internal body temperature regardless of ambient conditions.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which two classes maintain a warm, steady internal body temperature even on a freezing morning?'
  },
  {
    id: 'q-g6-sci-u1-004',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'How do adult frogs and toads primarily exchange respiratory gases when submerged in moist soil or damp environments?',
    options: [
      'Through their moist, thin, permeable skin',
      'Using internal gills like fish',
      'Using an external blowhole',
      'Through feathers on their legs'
    ],
    correctAnswer: 'Through their moist, thin, permeable skin',
    explanation: 'Adult amphibians breathe through lungs on land, but can also absorb oxygen directly through their thin, moist, highly vascularized skin (cutaneous respiration).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Why must a frog\'s skin always remain wet and moist to survive?'
  },
  {
    id: 'q-g6-sci-u1-005',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'A wildlife ranger in Tsavo observes an animal with dry scaly skin that lays soft leathery eggs in warm sand. To which vertebrate class does it belong?',
    options: [
      'Reptiles',
      'Amphibians',
      'Mammals',
      'Birds'
    ],
    correctAnswer: 'Reptiles',
    explanation: 'Reptiles possess dry, waterproof scaly skin and lay leathery, amniotic eggs on dry land (e.g., tortoises, crocodiles, snakes).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which class of cold-blooded vertebrates has dry scaly skin and lays leathery eggs?'
  },
  {
    id: 'q-g6-sci-u1-006',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Which adaptive feature allows tilapia and Nile perch to extract dissolved oxygen directly from water?',
    options: [
      'Filamentous gills covered by an operculum',
      'A muscular diaphragm',
      'Spiracles on their abdomen',
      'Air sacs located in their hollow bones'
    ],
    correctAnswer: 'Filamentous gills covered by an operculum',
    explanation: 'Fish breathe by passing water over richly vascularized gill filaments, where dissolved oxygen diffuses into blood and carbon dioxide diffuses out.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What respiratory organ do fish use instead of lungs?'
  },
  {
    id: 'q-g6-sci-u1-007',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Why are bats classified as mammals rather than birds, even though they possess wings and fly?',
    options: [
      'They have hair, give birth to live young, and suckle them with milk',
      'They lay hard-shelled eggs in high trees',
      'They have beaks without teeth',
      'They are cold-blooded creatures'
    ],
    correctAnswer: 'They have hair, give birth to live young, and suckle them with milk',
    explanation: 'Bats are mammals because they have fur/hair, possess mammary glands, give birth to live offspring, and maintain warm body temperature, despite possessing modified wing membranes.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Do bats lay eggs and have feathers, or do they give birth and suckle their young?'
  },
  {
    id: 'q-g6-sci-u1-008',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'What major difference exists between the eggs of birds and the eggs of amphibians?',
    options: [
      'Bird eggs have hard waterproof calcium shells, whereas amphibian eggs are soft, jelly-like, and laid in water',
      'Amphibian eggs have thick shells to survive desert heat',
      'Bird eggs are always laid under water',
      'There is no difference; both are covered in feathers'
    ],
    correctAnswer: 'Bird eggs have hard waterproof calcium shells, whereas amphibian eggs are soft, jelly-like, and laid in water',
    explanation: 'Birds produce hard calcium-carbonate shelled eggs laid in terrestrial nests. Amphibian eggs lack shells, consist of soft jelly capsules, and desiccate quickly if not in water.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What prevents a bird\'s egg from drying out on land compared to frog spawn in a pond?'
  },
  {
    id: 'q-g6-sci-u1-009',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Which of the following organisms is an ectothermic (cold-blooded) vertebrate that undergoes complete metamorphosis with an aquatic larval stage?',
    options: [
      'African bullfrog (Amphibian)',
      'Nile crocodile (Reptile)',
      'Flamingo (Bird)',
      'Vervet monkey (Mammal)'
    ],
    correctAnswer: 'African bullfrog (Amphibian)',
    explanation: 'Amphibians like the bullfrog are ectothermic vertebrates whose life cycle includes an aquatic swimming tadpole stage (with gills and tail) that metamorphoses into a four-legged lung-breathing adult.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which vertebrate starts life as a swimming tadpole with gills before growing four legs?'
  },
  {
    id: 'q-g6-sci-u1-010',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Which adaptation specifically enables birds like the African fish eagle to fly efficiently with minimal energy expenditure?',
    options: [
      'Pneumatized (hollow, air-filled) bones and aerodynamic feathers',
      'Heavy solid bones to resist wind resistance',
      'A dense coat of waterproof fur',
      'Breathing exclusively through skin pores'
    ],
    correctAnswer: 'Pneumatized (hollow, air-filled) bones and aerodynamic feathers',
    explanation: 'Avian flight adaptations include hollow pneumatized bones that reduce body mass, powerful pectoral muscles attached to a keeled sternum, and lightweight contour feathers.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How does a bird\'s skeletal structure make its body extremely lightweight for flight?'
  },
  {
    id: 'q-g6-sci-u1-011',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'A marine biologist off Watamu reef captures a whale shark. Even though it is huge and bears live young in water, it is classified as a fish because:',
    options: [
      'It breathes via gills, has fins, and possesses a cartilaginous skeleton without mammary glands',
      'It possesses feathers on its fins',
      'It breathes atmospheric air using lungs like a mammal',
      'It has dry scaly skin and lays eggs on sandy beaches'
    ],
    correctAnswer: 'It breathes via gills, has fins, and possesses a cartilaginous skeleton without mammary glands',
    explanation: 'Sharks are cartilaginous fish (Chondrichthyes) that breathe through gills and lack hair or mammary glands, separating them from marine mammals like whales and dolphins.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does a shark breathe with lungs or gills? Does it suckle its young with milk?'
  },
  {
    id: 'q-g6-sci-u1-012',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l1',
    text: 'Classify the five Kenyan vertebrates correctly by their protective outer body covering:\n(1) Leopard, (2) Ostrich, (3) Cobra, (4) Tree frog, (5) Tilapia',
    options: [
      '(1) Fur, (2) Feathers, (3) Dry scales, (4) Moist skin, (5) Slimy scales',
      '(1) Feathers, (2) Fur, (3) Moist skin, (4) Scales, (5) Shell',
      '(1) Moist skin, (2) Scales, (3) Fur, (4) Feathers, (5) Carapace',
      '(1) Scales, (2) Feathers, (3) Fur, (4) Moist skin, (5) Fur'
    ],
    correctAnswer: '(1) Fur, (2) Feathers, (3) Dry scales, (4) Moist skin, (5) Slimy scales',
    explanation: 'Mammals have fur (leopard), birds have feathers (ostrich), reptiles have dry scales (cobra), amphibians have moist bare skin (tree frog), and fish have slimy scales (tilapia).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Match each vertebrate class with its specific body covering: mammal -> fur, bird -> feathers, reptile -> scales...'
  },

  // ==========================================
  // Unit 1 Lesson 2: Invertebrates (q-g6-sci-u1-013 to 024)
  // ==========================================
  {
    id: 'q-g6-sci-u1-013',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'How many body segments and how many walking legs does an adult insect (such as a grasshopper or honeybee) have?',
    options: [
      '3 body segments and 6 walking legs',
      '2 body segments and 8 walking legs',
      '1 body segment and 10 walking legs',
      '4 body segments and 12 walking legs'
    ],
    correctAnswer: '3 body segments and 6 walking legs',
    explanation: 'Insects have bodies divided into three segments: head, thorax, and abdomen, with 3 pairs of jointed walking legs (6 legs total) attached to the thorax.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Count the legs on an ant or bee: How many pairs of legs do insects possess?'
  },
  {
    id: 'q-g6-sci-u1-014',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Which group of invertebrates includes spiders, scorpions, and ticks, characterized by having 8 walking legs and no antennae?',
    options: [
      'Arachnids',
      'Insects',
      'Molluscs',
      'Crustaceans'
    ],
    correctAnswer: 'Arachnids',
    explanation: 'Arachnids have two body parts (cephalothorax and abdomen), 4 pairs of legs (8 legs), no antennae, and no wings.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How many legs does a spider have? What is the scientific name for the spider and scorpion group?'
  },
  {
    id: 'q-g6-sci-u1-015',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'To which invertebrate group do crabs, prawns, and lobsters belong, characterized by a hard calcified carapace and 2 pairs of antennae?',
    options: [
      'Crustaceans',
      'Insects',
      'Annelid worms',
      'Arachnids'
    ],
    correctAnswer: 'Crustaceans',
    explanation: 'Crustaceans are predominantly aquatic arthropods possessing a hard, chitinous and calcified exoskeleton, 2 pairs of antennae, and branched appendages.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What class of marine and freshwater arthropods includes crabs and prawns?'
  },
  {
    id: 'q-g6-sci-u1-016',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Which soft-bodied invertebrate is commonly found in gardens, moves with a muscular foot, and carries a protective spiral shell on its back?',
    options: [
      'Snail (Mollusc)',
      'Centipede (Myriapod)',
      'Earthworm (Annelid)',
      'Tick (Arachnid)'
    ],
    correctAnswer: 'Snail (Mollusc)',
    explanation: 'The garden snail is a gastropod mollusc with a soft unsegmented body, a muscular creeping foot, and a calcareous coiled protective shell.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which slow garden creature retreats into its hard shell when touched?'
  },
  {
    id: 'q-g6-sci-u1-017',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'How do earthworms benefit agricultural soil in Kenyan farming communities like Meru and Kisii?',
    options: [
      'They burrow tunnels that aerate the soil and their castings enrich soil fertility',
      'They eat and destroy the root tubers of growing crops',
      'They produce chemical poisons that kill all earth microorganisms',
      'They compact the soil to make it as hard as rock'
    ],
    correctAnswer: 'They burrow tunnels that aerate the soil and their castings enrich soil fertility',
    explanation: 'Earthworms are decomposers; as they burrow, they aerate the soil, improve water infiltration, and digest organic matter, releasing nutrient-rich worm castings.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How does an earthworm\'s burrowing and feeding help crop roots get air and organic nutrients?'
  },
  {
    id: 'q-g6-sci-u1-018',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Through which anatomical structures do insects breathe atmospheric air?',
    options: [
      'Spiracles and tracheal tubes',
      'Lungs and nose',
      'Gills covered by an operculum',
      'Mouth and stomach'
    ],
    correctAnswer: 'Spiracles and tracheal tubes',
    explanation: 'Insects breathe through tiny lateral openings along their thorax and abdomen called spiracles, which lead into a branching network of tracheal tubes.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What are the tiny breathing pores along the sides of an insect\'s body called?'
  },
  {
    id: 'q-g6-sci-u1-019',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'A student observes a small creature with 2 main body segments, 8 walking legs, no wings, and no antennae. How should this organism be classified?',
    options: [
      'Arachnid',
      'Insect',
      'Crustacean',
      'Mollusc'
    ],
    correctAnswer: 'Arachnid',
    explanation: 'Having 2 body parts (cephalothorax and abdomen), 8 legs, and no antennae is the diagnostic combination of arachnids (e.g., spider, scorpion).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which class of arthropods has 8 legs and lacks antennae?'
  },
  {
    id: 'q-g6-sci-u1-020',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Which of the following invertebrates is a dangerous parasite that transmits East Coast Fever in Kenyan livestock?',
    options: [
      'Tick (Arachnid)',
      'Honeybee (Insect)',
      'Earthworm (Annelid)',
      'Crab (Crustacean)'
    ],
    correctAnswer: 'Tick (Arachnid)',
    explanation: 'Ticks are parasitic arachnids that suck blood from cattle and transmit protozoan pathogens causing East Coast Fever (Theileriosis).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which blood-sucking livestock pest is removed when cattle are plunged into a cattle dip?'
  },
  {
    id: 'q-g6-sci-u1-021',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'What is the key difference in leg count between insects, arachnids, and decapod crustaceans (like crabs)?',
    options: [
      'Insects have 6 legs, arachnids have 8 legs, and crabs have 10 legs',
      'Insects have 8 legs, arachnids have 6 legs, and crabs have 4 legs',
      'Insects have 4 legs, arachnids have 8 legs, and crabs have 12 legs',
      'All three groups have exactly the same number of legs'
    ],
    correctAnswer: 'Insects have 6 legs, arachnids have 8 legs, and crabs have 10 legs',
    explanation: 'Insects (hexapods) have 3 pairs (6 legs); arachnids have 4 pairs (8 legs); decapod crustaceans (like crabs and prawns) have 5 pairs (10 legs).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Count by pairs: 3 pairs (insects), 4 pairs (arachnids), 5 pairs (crabs).'
  },
  {
    id: 'q-g6-sci-u1-022',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Why do arthropods (insects, crabs, spiders) periodically undergo moulting (ecdysis) during their growth stages?',
    options: [
      'Their rigid chitinous exoskeleton cannot expand, so they must shed it to grow larger',
      'They shed skin solely to change color for camouflage',
      'To lay eggs on the discarded shell',
      'Because they want to transform into vertebrates'
    ],
    correctAnswer: 'Their rigid chitinous exoskeleton cannot expand, so they must shed it to grow larger',
    explanation: 'The exoskeleton is a rigid external casing that does not grow. In order to increase in size, arthropods must periodically moult (shed the old exoskeleton) and expand while the new cuticle is soft.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Can a hard, rigid external suit of armour stretch as an animal grows inside it?'
  },
  {
    id: 'q-g6-sci-u1-023',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Which group of organisms consists entirely of invertebrates belonging to the phylum Mollusca?',
    options: [
      'Snail, slug, octopus, squid',
      'Honeybee, termite, mosquito, butterfly',
      'Spider, scorpion, tick, mite',
      'Earthworm, roundworm, tapeworm, leech'
    ],
    correctAnswer: 'Snail, slug, octopus, squid',
    explanation: 'Snails, slugs, octopuses, and squids are all molluscs, characterized by unsegmented soft bodies, often with a shell or internal vestige, and a mantle cavity.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which list contains only soft-bodied creatures with a mantle, muscular foot, or tentacles?'
  },
  {
    id: 'q-g6-sci-u1-024',
    subStrandId: 'substrand-g6-sci-u1',
    lessonId: 'lesson-g6-sci-u1-l2',
    text: 'Use the simple dichotomous key below to identify the animal described:\n1a. Has backbone ................. Go to 2\n1b. Has no backbone ............. Go to 3\n3a. Has jointed legs ............ Go to 4\n3b. Has no jointed legs ......... Earthworm\n4a. Has 6 legs .................. Animal X\n4b. Has 8 legs .................. Spider\nWhat is Animal X?',
    options: [
      'Honeybee (Insect)',
      'Millipede',
      'Nile tilapia',
      'Crab'
    ],
    correctAnswer: 'Honeybee (Insect)',
    explanation: 'Following the key: 1b (no backbone) -> 3a (jointed legs) -> 4a (has 6 legs) points definitively to an insect such as the honeybee.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Follow the steps in the key: No backbone -> Jointed legs -> 6 legs. Which organism has 6 legs?'
  },

  // ==========================================
  // Unit 2 Lesson 1: Flower Anatomy & Pollination (q-g6-sci-u2-001 to 012)
  // ==========================================
  {
    id: 'q-g6-sci-u2-001',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What are the green, leaf-like outer structures of a flower that enclose and protect the delicate petals in the bud stage?',
    options: [
      'Sepals (Calyx)',
      'Petals (Corolla)',
      'Filaments',
      'Styles'
    ],
    correctAnswer: 'Sepals (Calyx)',
    explanation: 'Sepals are the outermost green floral parts forming the calyx, which protect the reproductive organs and petals while the flower is still an unopened bud.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What green structures cover a rose bud before it opens?'
  },
  {
    id: 'q-g6-sci-u2-002',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'Which part of the male stamen produces and releases pollen grains?',
    options: [
      'Anther',
      'Stigma',
      'Ovary',
      'Sepal'
    ],
    correctAnswer: 'Anther',
    explanation: 'The anther is the pollen-bearing sac at the tip of the stamen where male microspores (pollen grains) are produced and matured.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which part of the stamen sits atop the filament and holds yellow powdery pollen?'
  },
  {
    id: 'q-g6-sci-u2-003',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What is the sticky surface at the top of the female pistil that catches and traps pollen grains during pollination?',
    options: [
      'Stigma',
      'Anther',
      'Filament',
      'Petal'
    ],
    correctAnswer: 'Stigma',
    explanation: 'The stigma is the receptive surface of the pistil (carpel), typically sticky or feathery, specialized for capturing pollen grains.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which sticky female flower part receives pollen during pollination?'
  },
  {
    id: 'q-g6-sci-u2-004',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What biological process takes place when pollen grains are transferred from the anther to the stigma of a flower?',
    options: [
      'Pollination',
      'Photosynthesis',
      'Transpiration',
      'Respiration'
    ],
    correctAnswer: 'Pollination',
    explanation: 'Pollination is the mechanical transfer of pollen grains from the male anther to the receptive female stigma.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What is the transfer of pollen from anther to stigma called?'
  },
  {
    id: 'q-g6-sci-u2-005',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'Which set of characteristics is typical of wind-pollinated flowers, such as maize and savannah grasses?',
    options: [
      'Dull greenish petals, no scent or nectar, long feathery stigmas, light powdery pollen',
      'Bright red petals, sweet nectar, strong scent, heavy sticky pollen',
      'Large scented petals opening only at night with lots of honey',
      'Bright yellow petals with large sticky thorns'
    ],
    correctAnswer: 'Dull greenish petals, no scent or nectar, long feathery stigmas, light powdery pollen',
    explanation: 'Wind-pollinated flowers do not need to attract animals; they produce copious lightweight pollen and exposed feathery stigmas to catch airborne grains.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Do maize tassels and grasses need bright petals and sweet nectar if the wind carries their pollen?'
  },
  {
    id: 'q-g6-sci-u2-006',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What is the primary difference between self-pollination and cross-pollination?',
    options: [
      'Self-pollination occurs within the same flower/plant, while cross-pollination transfers pollen between different plants of the same species',
      'Self-pollination requires animals, while cross-pollination requires water only',
      'Self-pollination occurs only in conifers, while cross-pollination occurs only in algae',
      'There is no difference; both produce identical clones'
    ],
    correctAnswer: 'Self-pollination occurs within the same flower/plant, while cross-pollination transfers pollen between different plants of the same species',
    explanation: 'Self-pollination transfers pollen to a stigma of the same flower or plant. Cross-pollination transfers pollen between genetically distinct individuals of the same species, enhancing genetic diversity.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does "cross" pollination involve crossing over to a different plant of the same kind?'
  },
  {
    id: 'q-g6-sci-u2-007',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What happens immediately after a compatible pollen grain lands on a receptive stigma of a flower?',
    options: [
      'A pollen tube germinates and grows down through the style into the ovary',
      'The flower immediately drops all of its roots',
      'The petals turn into green leaves instantly',
      'The stigma explodes into small seeds'
    ],
    correctAnswer: 'A pollen tube germinates and grows down through the style into the ovary',
    explanation: 'Upon landing, the pollen grain absorbs moisture and germinates a pollen tube that grows down through the style to deliver the male gametes to the ovules inside the ovary.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How does the male genetic material travel from the sticky stigma down into the ovary?'
  },
  {
    id: 'q-g6-sci-u2-008',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'Following successful fertilization in a flowering plant, what do the ovary and the ovules develop into?',
    options: [
      'The ovary becomes the fruit, and the ovules become the seeds',
      'The ovary becomes the stem, and the ovules become the leaves',
      'The ovary becomes the petals, and the ovules become sepals',
      'The ovary becomes roots, and the ovules become flowers'
    ],
    correctAnswer: 'The ovary becomes the fruit, and the ovules become the seeds',
    explanation: 'After fertilization, the ovary wall ripens and swells into the fruit (pericarp), while the fertilized ovules develop into seeds containing the embryo.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'In a ripe avocado or mango, which part was the ovary and which part was the ovule?'
  },
  {
    id: 'q-g6-sci-u2-009',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'Which floral adaptation directly encourages nocturnal animal pollinators, such as bats and moths, to visit certain night-blooming plants in Kenya?',
    options: [
      'Pale white petals that reflect moonlight and strong nocturnal fragrance',
      'Bright red petals that blend into the darkness',
      'Feathery green stigmas that close at sunset',
      'Small odorless petals that produce no nectar'
    ],
    correctAnswer: 'Pale white petals that reflect moonlight and strong nocturnal fragrance',
    explanation: 'Flowers pollinated by nocturnal moths and bats are typically white or pale to stand out in the dark and emit strong sweet perfumes at night to guide pollinators by scent.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What color is most visible under moonlight, and how can night pollinators find flowers in the dark?'
  },
  {
    id: 'q-g6-sci-u2-010',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'What are the two components of the female pistil (carpel) that a pollen tube must penetrate before reaching the ovule?',
    options: [
      'Stigma and Style',
      'Anther and Filament',
      'Sepal and Receptacle',
      'Petal and Calyx'
    ],
    correctAnswer: 'Stigma and Style',
    explanation: 'The pollen tube germinates on the stigma and burrows downwards through the tissue of the style to enter the ovary chamber where ovules reside.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'The tube starts at the top of the pistil and travels through its neck. Name those two parts.'
  },
  {
    id: 'q-g6-sci-u2-011',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'A farmer in Makueni notices that bean yields increase significantly when European honeybee (Apis mellifera) hives are placed next to the crop field. Why does this happen?',
    options: [
      'Honeybees transfer pollen efficiently from flower to flower, increasing fertilization rates',
      'Honeybees scare away birds and insects by buzzing',
      'Honeybees spray honey directly onto the bean roots',
      'Honeybees provide shade that cools the bean flowers'
    ],
    correctAnswer: 'Honeybees transfer pollen efficiently from flower to flower, increasing fertilization rates',
    explanation: 'Honeybees are highly active insect pollinators; their foraging transfers pollen between blooms, substantially boosting fertilization and pod set.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What vital service do bees provide to flowers as they forage for nectar?'
  },
  {
    id: 'q-g6-sci-u2-012',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l1',
    text: 'Examine the floral formula: Flower X has long versatile anthers hanging loosely on slender filaments outside the petals, and large feathery stigmas. What is Flower X\'s mode of pollination?',
    options: [
      'Wind pollination (Anemophily)',
      'Insect pollination (Entomophily)',
      'Water pollination (Hydrophily)',
      'Bat pollination (Chiropterophily)'
    ],
    correctAnswer: 'Wind pollination (Anemophily)',
    explanation: 'Hanging versatile anthers and feathery exposed stigmas are classic adaptations for wind pollination, allowing gentle breezes to shake pollen free and feathery nets to catch floating grains.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Why would anthers hang outside the flower and stigmas look like feathers if not to catch wind?'
  },

  // ==========================================
  // Unit 2 Lesson 2: Fruit & Seed Dispersal (q-g6-sci-u2-013 to 024)
  // ==========================================
  {
    id: 'q-g6-sci-u2-013',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'What is the main biological advantage of fruit and seed dispersal for flowering plants?',
    options: [
      'It prevents overcrowding and reduces competition for light, water, and soil minerals',
      'It ensures all seeds fall directly under the parent tree trunk',
      'It stops seeds from ever germinating',
      'It kills all competing insects in the soil'
    ],
    correctAnswer: 'It prevents overcrowding and reduces competition for light, water, and soil minerals',
    explanation: 'Dispersal scatters offspring away from parent plants, reducing intraspecific competition for vital resources like water, light, and nutrients.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What happens to young seedlings if hundreds of them sprout directly beneath a parent tree?'
  },
  {
    id: 'q-g6-sci-u2-014',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Black jack (Bidens pilosa) seeds stick tenaciously to animal fur and socks. What is their primary agent of dispersal?',
    options: [
      'Animals and humans',
      'Wind currents',
      'Water waves',
      'Explosive splitting'
    ],
    correctAnswer: 'Animals and humans',
    explanation: 'Black jack seeds possess sharp barbed hooks (awns) designed specifically to latch onto animal fur and human clothing, carrying them far away.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How does black jack travel when its barbed seeds latch onto your socks or a dog\'s fur?'
  },
  {
    id: 'q-g6-sci-u2-015',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Which adaptive feature enables coconut fruits to be dispersed across coastal waters and ocean currents?',
    options: [
      'A fibrous, buoyant, water-resistant husk that traps air',
      'Tiny parachute hairs that catch breeze',
      'Sharp hooks that cling to fish fins',
      'Exploding loudly when submerged in water'
    ],
    correctAnswer: 'A fibrous, buoyant, water-resistant husk that traps air',
    explanation: 'Coconuts possess a thick, fibrous, waterproof mesocarp that contains trapped air pockets, allowing the fruit to float high in seawater for months.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Why can a coconut float on ocean water without sinking or rotting?'
  },
  {
    id: 'q-g6-sci-u2-016',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Bean pods and pea pods split suddenly when dry, flinging seeds away from the plant. What dispersal mechanism is this?',
    options: [
      'Explosive mechanism (Self-dispersal)',
      'Water dispersal',
      'Animal internal dispersal',
      'Wind parachute dispersal'
    ],
    correctAnswer: 'Explosive mechanism (Self-dispersal)',
    explanation: 'In explosive dispersal, drying bean or pea carpels contract unevenly until mechanical tension suddenly causes the pod to twist and burst, hurling seeds.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'When dry bean pods burst open in hot sunshine, what mechanism is that called?'
  },
  {
    id: 'q-g6-sci-u2-017',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Which adaptation is characteristic of wind-dispersed seeds such as dandelion, sonchus, and cotton?',
    options: [
      'Silky tufts of hairs (parachutes) that increase air resistance',
      'Sweet edible succulent flesh',
      'Heavy calcium shells that sink in mud',
      'Sharp hooked barbs that stick to fur'
    ],
    correctAnswer: 'Silky tufts of hairs (parachutes) that increase air resistance',
    explanation: 'Seeds dispersed by wind often possess fine, silky parachute hairs (pappus) or papery wings that reduce falling speed and allow air currents to carry them far.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What structure acts like a parachute to keep dandelion seeds floating in the breeze?'
  },
  {
    id: 'q-g6-sci-u2-018',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'A vervet monkey in the Aberdares eats ripe wild figs and drops seeds in its feces kilometres away. What dispersal mechanism is this?',
    options: [
      'Animal internal dispersal (Endozoochory)',
      'Animal external clinging (Epizoochory)',
      'Self-explosive dispersal',
      'Wind floating dispersal'
    ],
    correctAnswer: 'Animal internal dispersal (Endozoochory)',
    explanation: 'Animals consume sweet fleshy fruits; the hard indigestible seeds pass intact through the alimentary tract and are deposited far away in nutrient-rich dung.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'When an animal eats sweet fruit and passes the seeds unharmed in droppings, how were they dispersed?'
  },
  {
    id: 'q-g6-sci-u2-019',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Jacaranda and Nandi flame trees produce seeds with thin papery wing-like extensions. How are these seeds dispersed?',
    options: [
      'By wind currents',
      'By water waves',
      'By burrowing earthworms',
      'By clinging to cow hooves'
    ],
    correctAnswer: 'By wind currents',
    explanation: 'Winged seeds spin and glide like helicopters in wind currents, drifting considerable distances away from the canopy of the parent tree.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What natural agent catches flat, papery winged seeds as they fall from high branches?'
  },
  {
    id: 'q-g6-sci-u2-020',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Which of the following plants uses explosive mechanism to disperse its seeds?',
    options: [
      'Castor oil plant',
      'Guava',
      'Coconut',
      'Dandelion'
    ],
    correctAnswer: 'Castor oil plant',
    explanation: 'Castor oil (mbono) capsules dry out under the sun until the three-lobed fruit explosively bursts, popping seeds out forcefully.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which plant produces spiky capsules that pop open explosively when dry?'
  },
  {
    id: 'q-g6-sci-u2-021',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Why do seeds dispersed by animals internally (like guava, tomato, and passion fruit) have tough, impermeable seed coats?',
    options: [
      'To prevent digestive stomach acids and enzymes from destroying the plant embryo',
      'To make them float easily in air currents',
      'To allow them to explode inside the animal\'s stomach',
      'To prevent the seed from ever absorbing water'
    ],
    correctAnswer: 'To prevent digestive stomach acids and enzymes from destroying the plant embryo',
    explanation: 'Tough testas (seed coats) resist mechanical chewing and gastric acid digestion, allowing the viable embryo to pass unharmed into the soil.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How does a seed survive the harsh acidic digestive juices of an animal\'s gut?'
  },
  {
    id: 'q-g6-sci-u2-022',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'A student collected 4 different seeds around a school shamba in Kitale:\nSeed 1: Has hooks\nSeed 2: Has parachute hairs\nSeed 3: Sits inside a pod that twisted open\nSeed 4: Has a fibrous air-filled husk\nIdentify the agents of dispersal in order (1, 2, 3, 4):',
    options: [
      'Animal, Wind, Explosive mechanism, Water',
      'Wind, Water, Animal, Explosive mechanism',
      'Water, Animal, Wind, Animal',
      'Explosive mechanism, Wind, Water, Animal'
    ],
    correctAnswer: 'Animal, Wind, Explosive mechanism, Water',
    explanation: 'Hooks = Animal; Parachute hairs = Wind; Twisted open pod = Explosive mechanism; Fibrous air-filled husk = Water.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Match each feature: hooks -> animals; parachute -> wind; twisted pod -> explosive; fibrous husk -> water.'
  },
  {
    id: 'q-g6-sci-u2-023',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'What term describes the process where digestive acids weaken a tough seed coat, stimulating rapid germination after deposition in manure?',
    options: [
      'Scarification',
      'Fertilization',
      'Pollination',
      'Transpiration'
    ],
    correctAnswer: 'Scarification',
    explanation: 'Scarification involves breaking, scratching, or softening the hard seed coat (often via passage through an animal\'s gut) to allow water and air to penetrate for germination.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What botanical term refers to softening or scratching a hard seed coat to trigger germination?'
  },
  {
    id: 'q-g6-sci-u2-024',
    subStrandId: 'substrand-g6-sci-u2',
    lessonId: 'lesson-g6-sci-u2-l2',
    text: 'Which observation conclusively proves that a plant fruit is dispersed by water rather than wind?',
    options: [
      'The fruit has a waterproof waxy epicarp and an air-filled spongy mesocarp that floats on ponds and rivers',
      'The fruit is brightly colored and sweet-tasting',
      'The fruit has feather-like tufts that drift upwards in rising warm air',
      'The fruit splits open with a loud popping sound'
    ],
    correctAnswer: 'The fruit has a waterproof waxy epicarp and an air-filled spongy mesocarp that floats on ponds and rivers',
    explanation: 'Water-dispersed fruits require buoyancy (spongy, air-filled tissues) and water impermeability to float down waterways without becoming waterlogged or rotting.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What two physical traits are essential for floating on water without rotting or sinking?'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write updated db to file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 1 of Grade 6 Science and Technology successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
