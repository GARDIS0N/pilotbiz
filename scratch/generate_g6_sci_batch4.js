/**
 * Grade 6 Science and Technology - Batch 4 Generator
 * Covers Units 7 & 8:
 * - Unit 7: Energy: Light and Sound (strand-g6-sci-matter-energy)
 * - Unit 8: Electricity and Simple Circuits (strand-g6-sci-matter-energy)
 * Missions: Orders 55, 56, 57, 58 (world-science-lab)
 * Questions: 48 (24 per unit)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Science and Technology Batch 4 (Units 7 & 8) ---');

// 1. Sub-strands for Units 7 & 8
const newSubStrands = [
  {
    id: "substrand-g6-sci-u7",
    strandId: "strand-g6-sci-matter-energy",
    name: "Energy: Light and Sound",
    description: "Investigate how light travels in straight lines, reflects off mirrors, refracts through media, and forms rainbows, alongside sound production through vibrations, transmission through media, pitch, volume, echoes, and noise pollution control.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Demonstrate reflection and refraction of light and explain rainbow formation through dispersion",
      "Classify materials as transparent, translucent, or opaque and explain shadow formation",
      "Describe how sound is produced by vibrations and travels through solids, liquids, and gases",
      "Explain the phenomenon of echoes and recommend hearing safety measures against noise pollution"
    ]
  },
  {
    id: "substrand-g6-sci-u8",
    strandId: "strand-g6-sci-matter-energy",
    name: "Electricity and Simple Electrical Circuits",
    description: "Explore sources of electricity in Kenya, construct simple circuits, differentiate conductors and insulators, compare series and parallel connections, and practice electrical safety.",
    grade: "G6",
    learningAreaId: "la-science-g6",
    competencies: [
      "Identify common sources of electric energy in Kenya (solar, geothermal, hydro, wind, dry cells)",
      "Assemble and test simple complete circuits using cells, wires, switches, and bulbs",
      "Classify materials into electrical conductors and insulators",
      "Compare bulb brightness and circuit behavior in series versus parallel arrangements",
      "Observe safety precautions when handling electrical appliances to prevent shock and fire"
    ]
  }
];

// 2. Lessons for Units 7 & 8
const newLessons = [
  // Unit 7: Light & Sound
  {
    id: "lesson-g6-sci-u7-l1",
    subStrandId: "substrand-g6-sci-u7",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Light: Rectilinear Propagation, Reflection & Refraction",
    summary: "Explore how light travels in straight lines, forms shadows, reflects off shiny surfaces, refracts through water, and disperses into the rainbow colours.",
    content: "Light is a form of energy that enables us to see. Luminous objects (the Sun, stars, fire, electric bulbs) produce their own light, while non-luminous objects (the Moon, tables, books) only reflect light into our eyes. Light travels in straight lines (rectilinear propagation). When an opaque object blocks light, a shadow is formed behind it. Materials are categorized by how they transmit light: transparent (all light passes through, e.g. clean window glass), translucent (some light passes through, scattering it, e.g. frosted glass, tracing paper), and opaque (no light passes through, e.g. wood, stone). When light bounces off a smooth surface like a plane mirror, it undergoes reflection, where the angle of incidence equals the angle of reflection. When light travels from one transparent medium to another of different optical density (e.g., from air into water), it changes speed and bends—a phenomenon called refraction. A triangular glass prism or raindrops refract and disperse white sunlight into the seven spectrum colours of the rainbow: Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV).",
    keyConcepts: ["Rectilinear Propagation", "Transparent, Translucent & Opaque", "Shadows", "Reflection", "Refraction", "Rainbow Spectrum (ROYGBIV)"],
    kenyanContext: "Over the Great Rift Valley near Lake Nakuru or above Thomson Falls in Nyahururu, afternoon sun rays hitting fine water spray create vibrant natural rainbows through light refraction and dispersion.",
    didYouKnow: "Light travels at an incredible speed of about 300,000 kilometres per second—it can circle the entire Earth seven and a half times in just one second!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u7-l2",
    subStrandId: "substrand-g6-sci-u7",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Sound: Production, Transmission, Pitch & Echoes",
    summary: "Discover how vibrations create sound, how sound travels through solids, liquids, and gases, and explore echoes and hearing protection.",
    content: "Sound is a form of energy produced by vibrating objects (such as guitar strings, vocal cords in the throat, or beating drums). Sound travels outward as longitudinal waves through a material medium: solids, liquids, or gases. Sound cannot travel through a vacuum because there are no particles to vibrate. Sound travels fastest in solids (where particles are tightly packed), slower in liquids, and slowest in gases (air). Pitch refers to how high or low a sound is (determined by frequency of vibration; tight, thin, short strings produce high pitch). Loudness/volume refers to how strong or soft a sound is (determined by the amplitude or energy of the vibration). An echo is a reflected sound heard when sound waves bounce off a hard, large barrier such as a cliff, cave wall, or tall building. Echoes are utilized by bats for navigation (echolocation) and by ships to measure sea depth (sonar). Excessive, loud, or unwanted sound is noise pollution, which can cause permanent eardrum damage.",
    keyConcepts: ["Vibrations", "Medium of Transmission (Solids, Liquids, Gases)", "Vacuum (No Sound)", "Pitch vs Loudness", "Echoes", "Noise Pollution"],
    kenyanContext: "Traditional Kenyan musical instruments, such as the nyatiti of the Luo, the wandindi of the Kikuyu, and the isukuti drum of the Luhya, produce rich music by vibrating strings and animal-skin membranes.",
    didYouKnow: "Bats are virtually blind in the dark but navigate through pitch-black caves at high speed by emitting ultrasonic clicks and listening to the echoes bouncing off walls and insects!",
    estimatedMinutes: 20
  },

  // Unit 8: Electricity & Circuits
  {
    id: "lesson-g6-sci-u8-l1",
    subStrandId: "substrand-g6-sci-u8",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Sources of Electricity, Circuit Components & Conductors",
    summary: "Understand sources of electric power across Kenya and construct simple closed circuits with conductors, insulators, switches, and bulbs.",
    content: "Electricity is a versatile form of energy that powers homes, schools, and industries. Kenya is a global leader in green energy, generating electricity from geothermal steam in Olkaria (Naivasha), hydroelectric stations along the Tana River (Seven Forks Scheme like Masinga and Kiambere dams), wind turbines at Lake Turkana Wind Power project in Marsabit, and solar panels in schools and homes. In the laboratory, portable electricity is supplied by dry cells (batteries). A complete simple electric circuit consists of a power source (dry cell), conducting connecting wires (copper), a load (electric bulb or motor), and a switch to turn current on and off. When the switch is closed, there is an unbroken pathway allowing electric current to flow (closed circuit). If the wire is broken or switch is open, current stops (open circuit). Materials that allow electric current to pass through them easily are conductors (metals like copper, aluminium, iron, brass, and graphite in pencils). Materials that resist and block electric current are insulators (rubber, plastic, dry wood, glass, ceramics).",
    keyConcepts: ["Kenyan Renewable Energy Sources", "Dry Cell", "Simple Circuit", "Closed vs Open Circuit", "Conductors", "Insulators"],
    kenyanContext: "Kenya generates over 85% of its national electrical grid power from clean renewable sources, notably geothermal energy from the Rift Valley at Olkaria and hydro from the Tana River.",
    didYouKnow: "Copper is the most popular metal for electrical wiring worldwide because it is an excellent conductor, highly ductile, and resistant to corrosion!",
    estimatedMinutes: 20
  },
  {
    id: "lesson-g6-sci-u8-l2",
    subStrandId: "substrand-g6-sci-u8",
    learningAreaId: "la-science-g6",
    grade: "G6",
    title: "Series & Parallel Circuits and Electrical Safety",
    summary: "Compare series and parallel circuit configurations and master crucial safety precautions against electric shock, short circuits, and lightning.",
    content: "When connecting multiple bulbs or components in a circuit, two primary configurations are used: series and parallel. In a series circuit, components are connected end-to-end in a single loop. Current has only one path to flow. If one bulb blows or is disconnected, the circuit breaks and all bulbs go off. Adding more bulbs in series increases resistance and makes all bulbs dimmer. In a parallel circuit, components are connected along separate parallel branches. Current splits and flows through multiple pathways. If one bulb blows or is switched off, the other bulbs remain brightly lit because their individual pathways remain unbroken. Household wiring is always connected in parallel so each appliance operates independently at full voltage. Electricity is extremely useful but dangerous if mishandled. Safety rules: never touch electrical switches or sockets with wet hands (water conducts electricity), avoid overloading power strips, never touch fallen power lines, replace frayed or bare wires immediately, use a fuse or circuit breaker to prevent fire from overcurrent, and install lightning arresters on tall buildings during thunderstorms.",
    keyConcepts: ["Series Circuits", "Parallel Circuits", "Independent Operation", "Electrical Hazards", "Fuses & Circuit Breakers", "Lightning Safety"],
    kenyanContext: "Rural electrification programmes across Kenyan counties install residual-current circuit breakers in newly connected homes and schools to protect families from dangerous electric shocks.",
    didYouKnow: "A single bolt of lightning contains up to one billion volts of electricity and can heat the surrounding air to 30,000 degrees Celsius—five times hotter than the surface of the Sun!",
    estimatedMinutes: 20
  }
];

// 3. Missions for Units 7 & 8
const newMissions = [
  // Unit 7 Missions
  {
    id: "mission-g6-sci-u7-m1",
    title: "Optics Odyssey: Light, Mirrors & Rainbows",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 55,
    orderIndex: 55,
    description: "Team up with Optical Physicist Dr. Njeri to test shadow lengths, mirror reflection angles, water refraction, and prism dispersion into rainbow spectra.",
    objectives: [
      "Demonstrate straight-line propagation of light and shadow creation",
      "Differentiate transparent, translucent, and opaque media",
      "Explain reflection, refraction, and rainbow dispersion (ROYGBIV)"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Master of Optics",
    badge: "Master of Optics",
    questionIds: [
      "q-g6-sci-u7-001", "q-g6-sci-u7-002", "q-g6-sci-u7-003", "q-g6-sci-u7-004",
      "q-g6-sci-u7-005", "q-g6-sci-u7-006", "q-g6-sci-u7-007", "q-g6-sci-u7-008",
      "q-g6-sci-u7-009", "q-g6-sci-u7-010", "q-g6-sci-u7-011", "q-g6-sci-u7-012"
    ]
  },
  {
    id: "mission-g6-sci-u7-m2",
    title: "Sonic Explorers: Vibrations, Pitch & Echoes",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 56,
    orderIndex: 56,
    description: "Explore acoustics with Sound Engineer Kiprop using tuning forks, traditional string instruments, echo canyons, and sound-level meters.",
    objectives: [
      "Prove that sound is caused by physical vibrations and requires a medium",
      "Differentiate pitch from loudness and compare speeds in solids, liquids, and gases",
      "Describe how echoes form and implement safety guidelines against noise pollution"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Acoustic Ace",
    badge: "Acoustic Ace",
    questionIds: [
      "q-g6-sci-u7-013", "q-g6-sci-u7-014", "q-g6-sci-u7-015", "q-g6-sci-u7-016",
      "q-g6-sci-u7-017", "q-g6-sci-u7-018", "q-g6-sci-u7-019", "q-g6-sci-u7-020",
      "q-g6-sci-u7-021", "q-g6-sci-u7-022", "q-g6-sci-u7-023", "q-g6-sci-u7-024"
    ]
  },

  // Unit 8 Missions
  {
    id: "mission-g6-sci-u8-m1",
    title: "Current Creators: Circuits and Conductors",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 57,
    orderIndex: 57,
    description: "Enter the electrical workbench to connect dry cells, copper leads, switches, and test various everyday materials for electrical conductivity.",
    objectives: [
      "Identify renewable and portable electrical energy sources in Kenya",
      "Assemble and troubleshoot complete, open, and closed simple circuits",
      "Test and classify materials into electrical conductors and insulators"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Circuit Builder",
    badge: "Circuit Builder",
    questionIds: [
      "q-g6-sci-u8-001", "q-g6-sci-u8-002", "q-g6-sci-u8-003", "q-g6-sci-u8-004",
      "q-g6-sci-u8-005", "q-g6-sci-u8-006", "q-g6-sci-u8-007", "q-g6-sci-u8-008",
      "q-g6-sci-u8-009", "q-g6-sci-u8-010", "q-g6-sci-u8-011", "q-g6-sci-u8-012"
    ]
  },
  {
    id: "mission-g6-sci-u8-m2",
    title: "Power Patrol: Series, Parallel & Electrical Safety",
    worldId: "world-science-lab",
    learningAreaId: "la-science-g6",
    order: 58,
    orderIndex: 58,
    description: "Design multi-bulb series and parallel circuits with Master Electrician Mwangi, and enforce life-saving electrical safety protocols.",
    objectives: [
      "Compare bulb brightness and failure behavior in series and parallel circuits",
      "Explain why domestic home lighting is wired in parallel",
      "Follow essential safety rules regarding water, overloaded sockets, fuses, and lightning"
    ],
    xpReward: 100,
    rewardXp: 100,
    coinReward: 50,
    badgeReward: "Electrical Guardian",
    badge: "Electrical Guardian",
    questionIds: [
      "q-g6-sci-u8-013", "q-g6-sci-u8-014", "q-g6-sci-u8-015", "q-g6-sci-u8-016",
      "q-g6-sci-u8-017", "q-g6-sci-u8-018", "q-g6-sci-u8-019", "q-g6-sci-u8-020",
      "q-g6-sci-u8-021", "q-g6-sci-u8-022", "q-g6-sci-u8-023", "q-g6-sci-u8-024"
    ]
  }
];

// 4. Questions for Units 7 & 8
const newQuestions = [
  // --- UNIT 7: LIGHT AND SOUND (Questions 1 to 24) ---
  // Lesson 1: Light (001 - 012)
  {
    id: "q-g6-sci-u7-001",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following objects is a luminous source of light?",
    options: [
      "The Sun",
      "The Moon",
      "A classroom mirror",
      "A shiny silver coin"
    ],
    correctAnswer: "The Sun",
    explanation: "The Sun is a luminous body because it produces and emits its own light, unlike the Moon, mirrors, and coins which only reflect light from other sources.",
    socraticHint: "Which of these celestial bodies creates its own light from internal nuclear reactions?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-002",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When Grade 6 pupils align three cardboard cards with pinholes in a straight line, they can see a candle flame through them. What fundamental property of light does this demonstrate?",
    options: [
      "Light travels in straight lines (rectilinear propagation)",
      "Light can bend easily around sharp corners",
      "Light travels faster in solids than in air",
      "Light is made up of solid vibrating particles"
    ],
    correctAnswer: "Light travels in straight lines (rectilinear propagation)",
    explanation: "The pinhole cardboard experiment proves that light rays travel strictly in straight lines; moving any card out of alignment blocks the candle from view.",
    socraticHint: "What happens when you displace one card: does light bend around it or get blocked?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-003",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How is a dark shadow formed behind a standing tree on a sunny afternoon in Garissa?",
    options: [
      "The opaque tree trunk blocks light rays traveling in straight lines",
      "The tree absorbs all cold air from the ground",
      "Light rays reflect off the soil directly into the leaves",
      "The leaves produce dark gas that settles on the ground"
    ],
    correctAnswer: "The opaque tree trunk blocks light rays traveling in straight lines",
    explanation: "Because light travels in straight lines and cannot pass through an opaque object, a dark shadow area forms on the opposite side where light is blocked.",
    socraticHint: "What happens to straight-line rays of sunlight when an opaque obstacle stands in their way?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-004",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following materials is classified as translucent?",
    options: [
      "Frosted bathroom window glass or oiled paper",
      "Clear clean window glass pane",
      "A thick wooden school door",
      "A solid iron metal ruler"
    ],
    correctAnswer: "Frosted bathroom window glass or oiled paper",
    explanation: "Translucent materials allow only some light to pass through while scattering the rays, preventing clear images from being seen through them.",
    socraticHint: "Which material lets some light through for privacy without showing sharp details?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-005",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What optical law describes the reflection of light from a flat plane mirror?",
    options: [
      "The angle of incidence is always equal to the angle of reflection",
      "The angle of reflection is always double the angle of incidence",
      "Light always reflects at a 90-degree right angle regardless of incoming angle",
      "Reflected light rays always travel in reverse curves"
    ],
    correctAnswer: "The angle of incidence is always equal to the angle of reflection",
    explanation: "The law of reflection states that the angle of incidence (incoming angle relative to the normal) equals the angle of reflection (outgoing angle).",
    socraticHint: "If light hits a mirror at 30 degrees to the normal line, at what angle does it bounce off?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-006",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When a straight pencil is placed into a clear glass beaker filled with water, it appears bent or broken at the water surface. What causes this illusion?",
    options: [
      "Refraction (the bending of light as it slows down passing from air into water)",
      "Reflection of the pencil off the glass walls",
      "The water chemically dissolves the wooden pencil instantly",
      "Dispersion of white light into heat waves"
    ],
    correctAnswer: "Refraction (the bending of light as it slows down passing from air into water)",
    explanation: "Refraction occurs when light changes speed at the boundary of two media with different optical densities, causing rays to bend and making the submerged pencil look offset.",
    socraticHint: "What term describes the bending of light when it passes obliquely between two different transparent materials?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-007",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why does a clear swimming pool or river bed in Sagana appear shallower than its actual real depth when viewed from above?",
    options: [
      "Light rays coming from the bottom bend away from the normal as they exit the water into air",
      "Water pressure pushes the bottom of the river upwards",
      "Clean water blocks 90% of light rays from escaping",
      "The observer's eyes magnify the water molecules"
    ],
    correctAnswer: "Light rays coming from the bottom bend away from the normal as they exit the water into air",
    explanation: "Due to refraction, light rays emerging from the water into air bend away from the normal, creating a virtual image of the bottom that appears raised (apparent depth).",
    socraticHint: "Remember that light bending at the water-air interface creates an elevated virtual image.",
    points: 10,
    difficulty: "HARD",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-008",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What optical device splits white sunlight into a continuous spectrum of seven distinct colours?",
    options: [
      "A triangular glass prism",
      "A flat plane mirror",
      "A magnifying glass",
      "A frosted plastic sheet"
    ],
    correctAnswer: "A triangular glass prism",
    explanation: "A triangular glass prism refracts different wavelengths of white light by different amounts, dispersing white light into its constituent spectrum.",
    socraticHint: "Which triangular transparent glass piece refracts and splits white light?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-009",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following correctly lists the seven spectrum colours of a rainbow in order from top to bottom?",
    options: [
      "Red, Orange, Yellow, Green, Blue, Indigo, Violet",
      "Violet, Blue, Green, Red, Yellow, Orange, Indigo",
      "Green, Yellow, Red, Blue, Violet, Orange, Indigo",
      "Red, Blue, Yellow, Orange, Green, Violet, Indigo"
    ],
    correctAnswer: "Red, Orange, Yellow, Green, Blue, Indigo, Violet",
    explanation: "The mnemonic ROYGBIV represents the primary rainbow spectrum: Red, Orange, Yellow, Green, Blue, Indigo, and Violet.",
    socraticHint: "Recall the famous acronym ROYGBIV.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-010",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which colour of white light is refracted (bent) the LEAST when passing through a triangular glass prism or a raindrop?",
    options: [
      "Red",
      "Violet",
      "Blue",
      "Green"
    ],
    correctAnswer: "Red",
    explanation: "Red light has the longest wavelength in the visible spectrum and travels fastest through glass, so it is refracted (bent) the least.",
    socraticHint: "Which colour appears on the outer top curve of the rainbow because it bends the least?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-011",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Under what weather conditions can learners in Kericho observe a natural rainbow in the sky?",
    options: [
      "When the sun is shining behind them while rain is falling ahead of them",
      "During a completely overcast midnight thunderstorm",
      "At midday when the sun is directly overhead with zero clouds",
      "During a thick, dry sandstorm with no moisture in the air"
    ],
    correctAnswer: "When the sun is shining behind them while rain is falling ahead of them",
    explanation: "A rainbow requires bright sunlight behind the observer striking airborne raindrops in front of the observer, which act as millions of tiny prisms.",
    socraticHint: "Where must the sun and the falling rain be relative to the observer?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-012",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which optical instrument uses two plane mirrors positioned at 45-degree angles to let a person look over high walls or around obstacles?",
    options: [
      "Periscope",
      "Microscope",
      "Telescope",
      "Stethoscope"
    ],
    correctAnswer: "Periscope",
    explanation: "A periscope consists of a tube containing two parallel mirrors tilted at 45 degrees, reflecting light twice so an observer can see over obstacles or from a submarine.",
    socraticHint: "What mirror-based device allows people inside submarines to see above water?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Sound (013 - 024)
  {
    id: "q-g6-sci-u7-013",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How is sound produced when an isukuti drum is struck during a cultural festival in Kakamega?",
    options: [
      "The animal skin membrane vibrates back and forth, setting adjacent air molecules in motion",
      "The drum creates electricity that flashes into our ears",
      "The wooden drum shell turns into gas instantly",
      "Sound particles shoot out like tiny invisible stones"
    ],
    correctAnswer: "The animal skin membrane vibrates back and forth, setting adjacent air molecules in motion",
    explanation: "All sound originates from mechanical vibrations; striking the drumhead causes it to vibrate rapidly, pushing and pulling air molecules into sound waves.",
    socraticHint: "What rapid back-and-forth movement produces sound when a drum or guitar string is hit?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-014",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In which of the following states of matter does sound travel at the HIGHEST speed, and why?",
    options: [
      "Solids (like an iron railway track), because particles are packed closest together",
      "Gases (like air), because particles move around freely",
      "Liquids (like ocean water), because water is slippery",
      "A complete vacuum, because there is no friction"
    ],
    correctAnswer: "Solids (like an iron railway track), because particles are packed closest together",
    explanation: "Sound travels fastest in solids (around 5000 m/s in steel vs 340 m/s in air) because tightly bound particles transmit mechanical vibrations much more rapidly.",
    socraticHint: "In which medium are molecules packed most tightly together to pass vibrations quickly?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-015",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When an electric bell rings inside a sealed glass jar and all the air is sucked out using a vacuum pump, the bell hammer is seen hitting the gong but NO sound is heard. What does this experiment prove?",
    options: [
      "Sound cannot travel through a vacuum because it requires a material medium to vibrate",
      "Sound travels faster in a vacuum than the human ear can detect",
      "Removing air stops the electric battery from supplying power",
      "The glass jar absorbs all sound energy and turns it into light"
    ],
    correctAnswer: "Sound cannot travel through a vacuum because it requires a material medium to vibrate",
    explanation: "Sound is a mechanical wave requiring a physical medium (particles) to propagate; without particles in a vacuum, sound cannot travel.",
    socraticHint: "Can sound waves move through space if there are no air, liquid, or solid particles to bump into each other?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-016",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What characteristic of sound refers to whether a musical note sounds 'high' like a whistle or 'low' like a bull's roar?",
    options: [
      "Pitch",
      "Loudness",
      "Echo",
      "Quality"
    ],
    correctAnswer: "Pitch",
    explanation: "Pitch is the perception of the frequency of sound vibrations: high frequency vibrations produce a high pitch, and low frequency produces a low pitch.",
    socraticHint: "What term describes the highness or lowness of a musical sound?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-017",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How can a musician playing a traditional wandindi or guitar raise the pitch of a vibrating string?",
    options: [
      "Tightening the string or making the vibrating portion shorter",
      "Loosening the string and making it longer",
      "Using a thicker and heavier string",
      "Plucking the string very gently"
    ],
    correctAnswer: "Tightening the string or making the vibrating portion shorter",
    explanation: "Increasing tension (tightening) or shortening the length of a string makes it vibrate faster (higher frequency), raising its pitch.",
    socraticHint: "What happens to the pitch of a string when you turn the tuning peg to make it tighter?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-018",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What factor determines the loudness or volume of a sound?",
    options: [
      "The amplitude or energy of the vibration",
      "The length of the musical instrument alone",
      "The colour of the vibrating drum surface",
      "The speed of light in the surrounding room"
    ],
    correctAnswer: "The amplitude or energy of the vibration",
    explanation: "Loudness depends on the amplitude of vibration; hitting a drum with more force produces larger vibrations (greater amplitude), creating louder sound.",
    socraticHint: "What happens when you hit a drum harder with more energy?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-019",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "When a hiker shouts loudly facing the cliffs of Hell's Gate Gorge in Naivasha, they hear their own voice repeated shortly afterwards. What is this phenomenon called?",
    options: [
      "Echo (reflection of sound waves)",
      "Refraction of sound in air",
      "Dispersion of acoustic vibrations",
      "Absorption of noise energy"
    ],
    correctAnswer: "Echo (reflection of sound waves)",
    explanation: "An echo is a sound heard again after its sound waves reflect off a distant, hard surface such as a rock cliff or building wall.",
    socraticHint: "What is the repetition of sound caused by reflection off a hard obstacle called?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-020",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following materials is most effective at absorbing sound to prevent annoying echoes inside a school auditorium in Nairobi?",
    options: [
      "Soft curtains, acoustic foam panels, and thick carpets",
      "Smooth polished marble tiles and glass mirrors",
      "Hard corrugated iron sheets and concrete walls",
      "Solid stainless steel plates"
    ],
    correctAnswer: "Soft curtains, acoustic foam panels, and thick carpets",
    explanation: "Porous and soft materials (curtains, foam, carpets) absorb sound wave energy rather than reflecting it, reducing reverberation and echoes.",
    socraticHint: "Do soft spongy materials absorb sound or reflect it back?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-021",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "How do bats and marine dolphins use sound reflection to catch prey in dark or murky water?",
    options: [
      "By emitting high-frequency sounds and detecting returning echoes (echolocation)",
      "By smelling sound waves traveling through air",
      "By turning sound waves into visible laser beams",
      "By absorbing sound to make themselves completely silent"
    ],
    correctAnswer: "By emitting high-frequency sounds and detecting returning echoes (echolocation)",
    explanation: "Echolocation is the biological sonar system where animals emit ultrasound clicks and interpret returning reflected echoes to pinpoint prey and obstacles.",
    socraticHint: "What biological technique uses high-pitched echo reflections for navigation?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-022",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What health risk is caused by prolonged exposure to loud noise pollution from disco speakers or heavy construction machinery?",
    options: [
      "Permanent hearing impairment and tinnitus (ringing in the ears)",
      "Instant loss of eyesight and night blindness",
      "Softening of arm and leg bones",
      "Sudden onset of Goitre in the neck"
    ],
    correctAnswer: "Permanent hearing impairment and tinnitus (ringing in the ears)",
    explanation: "Excessive sound volume destroys delicate hair cells in the cochlea of the inner ear, leading to irreversible noise-induced hearing loss.",
    socraticHint: "Which vital sensory organ is damaged by extremely loud sounds?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-023",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What safety equipment should a factory worker at a stone-crushing plant in Athi River wear to protect their hearing?",
    options: [
      "Industrial ear muffs or ear plugs",
      "Dark sunglasses",
      "Rubber gumboots",
      "Leather hand gloves"
    ],
    correctAnswer: "Industrial ear muffs or ear plugs",
    explanation: "Ear muffs and ear plugs attenuate loud noise levels, reducing acoustic pressure entering the ear canal and protecting the eardrums.",
    socraticHint: "Which protective gear is worn specifically over or inside the ears?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u7-024",
    subStrandId: "substrand-g6-sci-u7",
    lessonId: "lesson-g6-sci-u7-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is a flash of lightning seen several seconds before the rumble of thunder is heard during a storm in Eldoret?",
    options: [
      "Light travels vastly faster (300,000,000 m/s) than sound in air (340 m/s)",
      "Thunder is produced five minutes after the lightning strike begins",
      "Human eyes react much faster than human ears",
      "Sound waves get trapped in clouds before reaching the ground"
    ],
    correctAnswer: "Light travels vastly faster (300,000,000 m/s) than sound in air (340 m/s)",
    explanation: "Light and thunder occur simultaneously, but light reaches our eyes almost instantaneously, whereas sound takes roughly 3 seconds to travel each single kilometre.",
    socraticHint: "Compare the enormous speed of light to the much slower speed of sound in air.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // --- UNIT 8: ELECTRICITY & CIRCUITS (Questions 25 to 48) ---
  // Lesson 1: Sources, Circuits & Conductors (001 - 012)
  {
    id: "q-g6-sci-u8-001",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following is a major clean, renewable source of electricity generated from underground steam at Olkaria in Kenya?",
    options: [
      "Geothermal energy",
      "Nuclear energy",
      "Coal energy",
      "Diesel generator"
    ],
    correctAnswer: "Geothermal energy",
    explanation: "Geothermal energy utilizes naturally heated volcanic underground steam to spin electricity-generating turbines, notably at Olkaria in Naivasha.",
    socraticHint: "What thermal energy from deep inside the earth powers power stations in Naivasha?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-002",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "At Masinga Dam along the Tana River, electricity is produced by water turning large turbines. What type of electricity generation is this?",
    options: [
      "Hydroelectric power",
      "Solar power",
      "Wind power",
      "Geothermal power"
    ],
    correctAnswer: "Hydroelectric power",
    explanation: "Hydroelectric power (hydro) converts the gravitational potential and kinetic energy of flowing river water through dam turbines into electrical energy.",
    socraticHint: "Which energy form uses the power of flowing water (hydro) to generate electricity?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-003",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following correctly describes what a simple dry cell (torch battery) does?",
    options: [
      "It converts stored chemical energy into electrical energy",
      "It creates energy out of nothing",
      "It stores water to spin mini waterwheels",
      "It absorbs sunlight in the dark to make electricity"
    ],
    correctAnswer: "It converts stored chemical energy into electrical energy",
    explanation: "A dry cell produces electric current through internal chemical reactions between electrolyte paste and zinc/carbon electrodes.",
    socraticHint: "What kind of energy is stored in the chemicals inside a flashlight battery?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-004",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What are the four essential components needed to assemble a functional simple electric circuit?",
    options: [
      "Power source (cell), conducting wires, a load (bulb), and a switch",
      "A magnet, a beaker of water, salt, and string",
      "A solar panel, a mirror, a lens, and paper",
      "Two bulbs, a wooden stick, and plastic rope"
    ],
    correctAnswer: "Power source (cell), conducting wires, a load (bulb), and a switch",
    explanation: "A functional circuit needs an electromotive source (cell), conductors (wires), a consumer of energy (bulb), and a control device (switch).",
    socraticHint: "What provides power, carries the current, uses the power, and turns it on/off?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-005",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens in a simple circuit when the switch is in the OPEN position?",
    options: [
      "The circuit is broken and electric current cannot flow, so the bulb remains off",
      "The bulb shines twice as brightly",
      "Electricity flows backwards into the dry cell",
      "The connecting wires immediately melt"
    ],
    correctAnswer: "The circuit is broken and electric current cannot flow, so the bulb remains off",
    explanation: "An open switch creates a physical gap in the circuit, interrupting the flow of charge so that the circuit is incomplete (open).",
    socraticHint: "Think of an open bridge: can traffic cross over a broken gap?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-006",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following materials is an electrical conductor that will allow a circuit bulb to light up?",
    options: [
      "An iron nail or copper wire",
      "A dry wooden stick",
      "A plastic ruler",
      "A rubber eraser"
    ],
    correctAnswer: "An iron nail or copper wire",
    explanation: "Metals like iron and copper contain delocalized free electrons that readily drift when a voltage is applied, allowing current to flow.",
    socraticHint: "Which of these materials is metallic and conducts electric current easily?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-007",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why are electrical cables used in Kenyan homes coated with an outer layer of plastic or rubber?",
    options: [
      "Plastic is an insulator that prevents electric shocks and short circuits",
      "Plastic makes the electric current flow much faster",
      "Plastic absorbs cold air to keep wires cool",
      "Plastic adds extra voltage to the electricity"
    ],
    correctAnswer: "Plastic is an insulator that prevents electric shocks and short circuits",
    explanation: "Plastic and rubber are non-conductors (insulators) that trap the current safely inside copper wires, protecting people from electric shock.",
    socraticHint: "Why must conductive metal wires be safely insulated before you touch them?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-008",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which non-metal material found inside everyday HB writing pencils can conduct electricity?",
    options: [
      "Graphite (pencil lead)",
      "Clay powder",
      "Wax crayon",
      "Chalk"
    ],
    correctAnswer: "Graphite (pencil lead)",
    explanation: "Graphite is a crystalline form of carbon with free delocalized electrons between its planar layers, making it a rare non-metal conductor of electricity.",
    socraticHint: "What dark material in pencil cores conducts electricity despite not being a metal?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-009",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What part of an incandescent torch bulb produces light by becoming white-hot when current passes through it?",
    options: [
      "The tungsten filament",
      "The glass envelope",
      "The metal screw thread",
      "The insulating plastic ring"
    ],
    correctAnswer: "The tungsten filament",
    explanation: "The filament is a fine coil made of tungsten with high electrical resistance and melting point; current heats it to incandescence, producing light.",
    socraticHint: "What thin curly wire glows brightly inside a lightbulb?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-010",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why does a bulb NOT light up if you connect it with two dry cells facing positive terminal (+) to positive terminal (+)?",
    options: [
      "The cells push electric current in opposite opposing directions, cancelling out the voltage",
      "The cells explode immediately into flames",
      "The connecting wires turn into insulators",
      "The bulb filament freezes"
    ],
    correctAnswer: "The cells push electric current in opposite opposing directions, cancelling out the voltage",
    explanation: "Dry cells must be connected in series with opposite polarities aligned (+ to -); connecting like terminals (+ to +) creates opposing electromotive forces that cancel each other.",
    socraticHint: "How must battery terminals be aligned (+ to -) for voltage to add together?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-011",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the following lists contains ONLY electrical insulators?",
    options: [
      "Rubber, dry wood, glass, and plastic",
      "Copper, aluminium, water, and steel",
      "Gold, silver, brass, and iron",
      "Graphite, brass, bronze, and copper"
    ],
    correctAnswer: "Rubber, dry wood, glass, and plastic",
    explanation: "Rubber, dry timber, glass, and plastics all possess very high resistance and lack free mobile charges, acting as insulators.",
    socraticHint: "Select the group where none of the items conduct electric current.",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-012",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l1",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What device is used to measure electrical current flowing in a circuit?",
    options: [
      "Ammeter",
      "Voltmeter",
      "Thermometer",
      "Barometer"
    ],
    correctAnswer: "Ammeter",
    explanation: "An ammeter measures electric current in amperes (A) and is connected in series within a circuit.",
    socraticHint: "What electrical instrument measures current in amperes?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },

  // Lesson 2: Series, Parallel & Safety (013 - 024)
  {
    id: "q-g6-sci-u8-013",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In a series circuit with two light bulbs, what happens to the second bulb if the first bulb blows out (its filament breaks)?",
    options: [
      "The second bulb immediately goes out because the entire single circuit loop is broken",
      "The second bulb shines twice as brightly as before",
      "The second bulb flickers green and red",
      "The second bulb continues glowing with no effect at all"
    ],
    correctAnswer: "The second bulb immediately goes out because the entire single circuit loop is broken",
    explanation: "In a series circuit, there is only one pathway for current; a broken filament anywhere in the line breaks the entire circuit, stopping all current flow.",
    socraticHint: "If there is only one path for current and that path is cut, what happens to the remaining bulbs?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-014",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What happens to the brightness of light bulbs as more identical bulbs are added one after another in a SERIES circuit powered by a single dry cell?",
    options: [
      "Each bulb becomes dimmer because total circuit resistance increases and voltage is shared",
      "Each bulb shines much brighter than before",
      "The brightness remains completely unchanged",
      "The bulbs start blinking rapidly"
    ],
    correctAnswer: "Each bulb becomes dimmer because total circuit resistance increases and voltage is shared",
    explanation: "In series, total electrical resistance increases with each additional bulb, reducing the total current and dividing the battery voltage, so all bulbs glow dimmer.",
    socraticHint: "What happens when multiple bulbs must share the same voltage in a single line?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-015",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why are electrical lights and socket outlets in houses in Kenya wired in PARALLEL rather than in series?",
    options: [
      "Each appliance receives full voltage and can be turned on or off independently without affecting others",
      "Parallel wiring uses cheaper, paper-thin plastic threads instead of copper",
      "Parallel circuits eliminate the need for an electricity supply source",
      "Parallel wiring produces direct current instead of alternating current"
    ],
    correctAnswer: "Each appliance receives full voltage and can be turned on or off independently without affecting others",
    explanation: "Parallel connection provides every branch with the full mains voltage (240V in Kenya) and ensures turning off one lamp does not cut power to others.",
    socraticHint: "If a light bulb in the kitchen burns out, would you want the refrigerator and living room lights to switch off too?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-016",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "In a parallel circuit with three bulbs, what happens if one bulb is unscrewed?",
    options: [
      "The other two bulbs remain lit at normal brightness",
      "All three bulbs immediately turn off",
      "The dry cell explodes",
      "The remaining bulbs become half as bright"
    ],
    correctAnswer: "The other two bulbs remain lit at normal brightness",
    explanation: "In parallel, each bulb operates in its own separate branch circuit; unscrewing one bulb only opens that branch, leaving other branches complete and functioning.",
    socraticHint: "Do parallel branches rely on each other or do they have independent paths to the battery?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-017",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why is touching electrical light switches or sockets with wet hands extremely dangerous?",
    options: [
      "Water containing dissolved salts is a good conductor of electricity, drastically increasing the risk of electric shock",
      "Water causes the copper wires inside the wall to freeze and break",
      "Water turns 240V electricity into high-frequency radio signals",
      "Water makes the switch permanently stuck in the on position"
    ],
    correctAnswer: "Water containing dissolved salts is a good conductor of electricity, drastically increasing the risk of electric shock",
    explanation: "Impure water lowers skin electrical resistance and conducts current directly into the human body, potentially causing fatal electric shocks.",
    socraticHint: "How does wet skin compare to dry skin in its ability to conduct electric current?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-018",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What is an electrical fuse, and what is its main safety purpose in a circuit?",
    options: [
      "A safety device containing a thin wire that melts and breaks the circuit if current exceeds a safe level",
      "A special switch that doubles the amount of electricity flowing into a room",
      "A metal rod that cools down the television during hot weather",
      "An extra battery that stores surplus electrical power"
    ],
    correctAnswer: "A safety device containing a thin wire that melts and breaks the circuit if current exceeds a safe level",
    explanation: "A fuse contains a low-melting-point wire designed to melt ('blow') when excessive current flows, breaking the circuit and preventing fires or appliance damage.",
    socraticHint: "What happens to the thin wire in a fuse when too much current produces dangerous heat?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-019",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why should you never plug multiple high-power electrical appliances (iron box, heater, kettle) into a single socket adapter?",
    options: [
      "It overloads the circuit, causing wires to overheat and potentially start an electrical fire",
      "It reverses the flow of electric current back to Kenya Power dams",
      "It makes all appliances run twice as fast",
      "It causes the appliances to freeze into ice"
    ],
    correctAnswer: "It overloads the circuit, causing wires to overheat and potentially start an electrical fire",
    explanation: "Drawing excessive current through a single wall outlet creates heavy resistive heating in wiring, which can melt insulation and cause house fires.",
    socraticHint: "What happens when excessive current is drawn through one small wall adapter?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-020",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What protective device installed on rooftops of tall buildings in Nairobi safely channels lightning strikes into the earth?",
    options: [
      "Lightning arrester (copper rod connected to an earth plate)",
      "Solar water heater",
      "Television satellite dish",
      "Glass mirror reflector"
    ],
    correctAnswer: "Lightning arrester (copper rod connected to an earth plate)",
    explanation: "A lightning arrester (conductor) is a pointed copper rod fixed on the highest point of a building, offering a path of least resistance to ground huge electrical charges safely into the earth.",
    socraticHint: "What pointed metal rod directs lightning safely into the ground to protect buildings?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-021",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What should you do immediately if you discover a downed, broken high-voltage electrical cable lying across a road after a storm?",
    options: [
      "Keep a safe distance of at least 10 metres, warn others away, and call Kenya Power emergency hotline immediately",
      "Pick up the wire with bare hands to move it off the road",
      "Test if the wire is live by touching it with a wet branch",
      "Pour buckets of water over it to extinguish sparks"
    ],
    correctAnswer: "Keep a safe distance of at least 10 metres, warn others away, and call Kenya Power emergency hotline immediately",
    explanation: "Fallen power lines carry lethal voltages that can conduct through ground moisture; keeping a large distance and notifying authorities prevents fatal electrocutions.",
    socraticHint: "What is the safest emergency procedure when seeing live high-voltage power lines on the ground?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-022",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Which of the three pins on a standard Kenyan electrical plug connects to the earth safety wire?",
    options: [
      "The top, longer and thicker pin (Earth pin)",
      "The bottom-left pin (Neutral pin)",
      "The bottom-right pin (Live pin)",
      "The plastic fuse cover"
    ],
    correctAnswer: "The top, longer and thicker pin (Earth pin)",
    explanation: "The top central pin on a BS 1363 standard plug is the Earth pin, designed to open safety shutters in the socket and ground fault currents.",
    socraticHint: "Which pin on a 3-pin plug is the longest and sits at the top?",
    points: 10,
    difficulty: "MEDIUM",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-023",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "Why should you never shelter under a solitary tall tree in an open field during a violent thunderstorm in Kisii?",
    options: [
      "Tall, isolated trees are prime targets for lightning strikes because they provide the shortest path to the ground",
      "The tree will absorb all oxygen from the air",
      "Raindrops from trees carry poison",
      "The wind will turn the tree into an electrical magnet"
    ],
    correctAnswer: "Tall, isolated trees are prime targets for lightning strikes because they provide the shortest path to the ground",
    explanation: "Lightning seeks the path of least electrical resistance to ground, striking the highest objects in an open area; standing underneath risks direct or side-flash electrocution.",
    socraticHint: "Why does lightning strike the highest point in an open area?",
    points: 10,
    difficulty: "EASY",
    type: "MULTIPLE_CHOICE",
    sourceType: "KICD_ALIGNED",
    contentStatus: "REVIEW"
  },
  {
    id: "q-g6-sci-u8-024",
    subStrandId: "substrand-g6-sci-u8",
    lessonId: "lesson-g6-sci-u8-l2",
    learningAreaId: "la-science-g6",
    grade: "G6",
    text: "What first-aid action should you take if you find a person in contact with an active electric shock from a live wire?",
    options: [
      "Switch off the main power supply first or push the victim away using a dry non-conductive wooden stick",
      "Grab the victim's bare hands immediately with your wet hands",
      "Pour a bucket of cold water over the victim",
      "Blow a loud whistle directly into the victim's ears"
    ],
    correctAnswer: "Switch off the main power supply first or push the victim away using a dry non-conductive wooden stick",
    explanation: "Touching a shocked victim while they are in contact with live current will electrocute the rescuer; isolating the power or using a dry insulator like wood breaks the circuit safely.",
    socraticHint: "How do you separate someone from a live wire without conducting electricity into your own body?",
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

console.log('Batch 4 of Grade 6 Science and Technology successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
