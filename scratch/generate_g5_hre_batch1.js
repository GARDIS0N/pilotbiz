import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 HRE Batch 1 (Setup + Units 1 & 2) ---');

// 1. Register Learning Area la-hre-g5
const hreLearningArea = {
  id: 'la-hre-g5',
  gradeId: 'grade-5',
  name: 'Hindu Religious Education',
  swahiliName: 'Elimu ya Dini ya Kihindu',
  icon: 'sparkles',
  color: '#F59E0B',
  description: 'Exploring divine manifestations of Paramatma and the Avatars, Vedic scriptures and sacred mantras, moral virtues (Sadachar, Ahimsa, Sewa), the five sacred duties (Pancha Mahayajna), and joyful celebrations of Hindu festivals in Kenya.',
  strandsCount: 4
};

const laIdx = db.learningAreas.findIndex(l => l.id === hreLearningArea.id);
if (laIdx >= 0) db.learningAreas[laIdx] = hreLearningArea;
else db.learningAreas.push(hreLearningArea);

// Add la-hre-g5 to world-faith-values.learningAreaIds if not present
const w = db.gameWorlds.find(x => x.id === 'world-faith-values');
if (w && !w.learningAreaIds.includes('la-hre-g5')) {
  w.learningAreaIds.push('la-hre-g5');
  console.log('Added la-hre-g5 to world-faith-values.learningAreaIds');
}

// 2. Register 4 Strands for la-hre-g5
const strandsToAdd = [
  {
    id: 'strand-g5-hre-paramatma',
    learningAreaId: 'la-hre-g5',
    code: 'HRE-G5-STR-01',
    title: 'Paramatma, Divine Manifestations & Cosmic Order',
    swahiliTitle: 'Paramatma, Miungu na Utaratibu wa Ulimwengu',
    description: 'Divine attributes of Paramatma (Sarvavyapi, Sarvashaktiman, Sarvajna), cosmic balance (Rta), and the protective Dashavatara incarnations of Lord Vishnu.',
    icon: 'sparkles'
  },
  {
    id: 'strand-g5-hre-scriptures',
    learningAreaId: 'la-hre-g5',
    code: 'HRE-G5-STR-02',
    title: 'Sacred Scriptures, Mantras and Prayers',
    swahiliTitle: 'Maandiko Matakatifu, Mantra na Sala',
    description: 'The four Vedas, Upanishads, sacred epics (Ramayana & Mahabharata), and sacred chants including Gayatri Mantra and Shanti Mantra.',
    icon: 'book-open'
  },
  {
    id: 'strand-g5-hre-virtues',
    learningAreaId: 'la-hre-g5',
    code: 'HRE-G5-STR-03',
    title: 'Sadachar (Virtues), Pancha Mahayajna and Family Devotion',
    swahiliTitle: 'Maadili (Sadachar), Wajibu wa Kila Siku na Heshima ya Familia',
    description: 'Core moral virtues (Satya, Ahimsa, Asteya, Brahmacharya, Aparigraha), the five daily duties (Pancha Mahayajna), filial piety, and community Sewa.',
    icon: 'heart'
  },
  {
    id: 'strand-g5-hre-festivals',
    learningAreaId: 'la-hre-g5',
    code: 'HRE-G5-STR-04',
    title: 'Sacred Festivals and Kenyan Community Harmony',
    swahiliTitle: 'Sherehe Takatifu na Umoja wa Jamii nchini Kenya',
    description: 'Joyful celebrations of Navratri, Janmashtami, Maha Shivratri, Guru Purnima, and Hindu charitable contributions to education, health, and national unity in Kenya.',
    icon: 'sun'
  }
];

strandsToAdd.forEach(s => {
  const idx = db.strands.findIndex(item => item.id === s.id);
  if (idx >= 0) db.strands[idx] = s;
  else db.strands.push(s);
});

// 3. Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-hre-u1',
    strandId: 'strand-g5-hre-paramatma',
    learningAreaId: 'la-hre-g5',
    title: 'Attributes of Paramatma and the Cosmic Order (Rta)',
    description: 'Exploring the infinite nature of Paramatma: Sarvavyapi (Omnipresent - existing everywhere and within every soul as Atman), Sarvashaktiman (Omnipotent - all-powerful creator and sustainer), and Sarvajna (Omniscient - all-knowing); the concept of Rta (the cosmic order, balance, and natural harmony governing nature and moral life); seeing divinity in nature and treating all living beings with reverence.',
    cbeCompetency: 'Spiritual awareness, ecological consciousness, moral reflection, and respect for cosmic harmony',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g5-hre-u2',
    strandId: 'strand-g5-hre-paramatma',
    learningAreaId: 'la-hre-g5',
    title: 'Avatars of Preservation: Early Incarnations of Lord Vishnu',
    description: 'Investigating the purpose of divine descent (Avatar): upholding Dharma (righteousness) and protecting the virtuous when cosmic order is threatened (Bhagavad Gita 4:7-8); exploring early manifestations of Lord Vishnu from the Dashavatara: Matsya (the Fish Avatar rescuing King Manu and sacred herbs), Kurma (the Tortoise Avatar supporting Mount Mandara during cosmic ocean churning), Varaha (the Boar Avatar rescuing Mother Earth / Bhumi Devi), and Narasimha (the half-lion, half-human Avatar protecting child devotee Prahlada).',
    cbeCompetency: 'Spiritual literacy, moral courage, resilience against intimidation, and reverence for divine protection',
    estimatedMinutes: 30,
    order: 2
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 4. Lessons (Units 1 & 2: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-hre-u1-l1',
    subStrandId: 'substrand-g5-hre-u1',
    title: 'Divine Attributes of Paramatma: Sarvavyapi, Sarvashaktiman, and Sarvajna',
    content: 'In Hindu philosophy, Paramatma is the Supreme Divine Reality, eternal, formless, and boundless, yet manifesting in various sacred forms to guide humanity. Grade 5 learners explore three primary divine attributes of Paramatma: 1) Sarvavyapi (Omnipresent): Paramatma exists everywhere in the universe—in every tree, river, mountain, star, and within every living being as the inner soul (Atman). Just as sugar dissolves invisibly into water yet makes every drop sweet, Paramatma’s presence permeates all existence; 2) Sarvashaktiman (Omnipotent): possessing infinite power, Paramatma brings forth the cosmic creation, sustains life through the sun and rain, and maintains cosmic harmony; 3) Sarvajna (Omniscient): Paramatma knows all thoughts, spoken words, and silent intentions of every heart across past, present, and future. Understanding these attributes helps children realize that God is never distant; divine consciousness is within us and around us at every moment, inspiring honest and compassionate conduct.',
    didYouKnow: 'The ancient Upanishads teach "Vasudhaiva Kutumbakam" (The entire world is one single family), because the same divine spark (Atman) dwells within every creature!',
    kenyanContext: 'At the SSDN Temple in Parklands, Nairobi, learners observe morning prayers where children are taught that the same divine spark resides within every Kenyan citizen, fostering mutual love and equality across ethnic communities.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u1-l2',
    subStrandId: 'substrand-g5-hre-u1',
    title: 'Rta: The Cosmic Order and Ecological Balance in Nature',
    content: 'The ancient Vedas describe Rta as the eternal cosmic order and rhythm that governs the entire physical and moral universe. Rta is seen in the flawless precision of natural laws: the regular cycle of day and night, the seasonal cycles of long rains and dry periods in Kenya, the flow of rivers to the ocean, the sprouting of seeds into fruitful plants, and the movement of planetary bodies. In human life, living in alignment with Rta means practicing Dharma—truthfulness, fairness, respect for ecological balance, and self-restraint. When humans pollute water sources, cut down forests recklessly, or act with cruelty, they disrupt the balance of Rta, resulting in environmental degradation and social discord. Preserving Rta inspires learners to protect Kenya\'s natural resources: planting trees in schools, conserving water, avoiding plastic waste, and showing kindness to animals.',
    didYouKnow: 'In the Rigveda, Varuna is revered as the divine guardian of Rta, watching over the cosmic balance and ensuring rivers flow smoothly to the ocean without overflowing!',
    kenyanContext: 'Hindu youth groups in Nakuru organize conservation cleanups around Lake Nakuru National Park to protect the lakeshore habitat of flamingos and rhinos, demonstrating reverence for Rta and environmental harmony.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u2-l1',
    subStrandId: 'substrand-g5-hre-u2',
    title: 'Matsya and Kurma Avatars: Rescuing the Seeds of Life and Cosmic Balance',
    content: 'The Sanskrit word "Avatar" literally means "descent"—the divine descending into the world to restore balance, protect the virtuous, and overcome chaos. In the Bhagavad Gita (4:7-8), Lord Krishna declares: "Whenever there is a decline in righteousness (Dharma) and a rise in unrighteousness, I manifest Myself." The first incarnation of Lord Vishnu is Matsya (the Fish Avatar), who appeared to King Manu as a tiny minnow seeking protection. King Manu placed it in a bowl, then a pond, then a river, and finally the ocean as it grew miraculously. Matsya warned Manu of an impending cosmic flood (Pralaya), instructing him to build a massive vessel containing the seven sages (Saptarishi), the sacred seeds of all botanical plants, and pairs of all living animals, tying the vessel safely to Matsya\'s horn. The second incarnation is Kurma (the Tortoise Avatar), who assumed the form of an immense cosmic tortoise at the bottom of the milk ocean (Kshira Sagara) to serve as a steady foundation for Mount Mandara during the churning (Samudra Manthan) to extract the nectar of immortality (Amrita) and cosmic treasures.',
    didYouKnow: 'The story of King Manu and the great flood in the Matsya Purana shares striking similarities with the flood narratives found in other ancient world traditions, showing universal themes of preservation!',
    kenyanContext: 'Marine conservation students in Mombasa relate the protective role of the Matsya Avatar to protecting endangered sea turtles and marine coral reefs in the Watamu Marine National Park.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u2-l2',
    subStrandId: 'substrand-g5-hre-u2',
    title: 'Varaha and Narasimha Avatars: Elevating Mother Earth and Protecting Prahlada',
    content: 'The third incarnation of Lord Vishnu is Varaha (the Boar Avatar). When the demon Hiranyaksha dragged Mother Earth (Bhumi Devi) into the murky depths of the cosmic waters, Lord Vishnu assumed the form of a mighty boar, dove into the abyss, vanquished the demon, and gently lifted the Earth upon his tusks back to her rightful radiant orbit. The fourth incarnation is Narasimha (half-lion, half-human). The demonic king Hiranyakashipu demanded that everyone worship him as God, but his young son Prahlada remained completely devoted to Lord Vishnu. Hiranyakashipu tried repeatedly to kill Prahlada—by throwing him off cliffs, casting him among venomous serpents, poisoning his food, and placing him in fire with his aunt Holika—yet Prahlada\'s faith kept him unhurt. When Hiranyakashipu struck a palace pillar demanding to know if God was inside it, Lord Vishnu burst forth as Narasimha, defeating the tyrant at twilight and blessing young Prahlada for his unwavering devotion (Bhakti).',
    didYouKnow: 'The festive bonfire of Holika Dahan on the eve of Holi celebrates how young Prahlada emerged unharmed from the roaring fire while the demoness Holika was consumed by the flames!',
    kenyanContext: 'Grade 5 learners in Kisumu discuss how Prahlada\'s courage shows that young people should stand up for moral principles and truth even when facing intimidation or peer pressure at school.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 5. Missions (Units 1 & 2: 4 Missions, orders 89–92)
const missionsToAdd = [
  {
    id: 'mission-g5-hre-u1-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u1',
    lessonId: 'lesson-g5-hre-u1-l1',
    title: 'Paramatma Attributes and Divine Presence Quest',
    description: 'Explore the boundless nature of Paramatma through the sacred attributes of Sarvavyapi, Sarvashaktiman, and Sarvajna, recognizing the divine spark within all beings!',
    order: 89,
    orderIndex: 89,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-divine-presence',
    badge: {
      name: 'Divine Presence',
      icon: 'sparkles'
    },
    questionIds: [
      'q-g5-hre-u1-001',
      'q-g5-hre-u1-002',
      'q-g5-hre-u1-003',
      'q-g5-hre-u1-004',
      'q-g5-hre-u1-005',
      'q-g5-hre-u1-006',
      'q-g5-hre-u1-007',
      'q-g5-hre-u1-008',
      'q-g5-hre-u1-009',
      'q-g5-hre-u1-010',
      'q-g5-hre-u1-011',
      'q-g5-hre-u1-012'
    ]
  },
  {
    id: 'mission-g5-hre-u1-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u1',
    lessonId: 'lesson-g5-hre-u1-l2',
    title: 'Rta Cosmic Balance and Nature Harmony Quest',
    description: 'Discover the Vedic principle of Rta (cosmic order), understand how natural cycles reflect divine balance, and become an active custodian of Kenya’s environment!',
    order: 90,
    orderIndex: 90,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-cosmic-rta',
    badge: {
      name: 'Guardian of Rta',
      icon: 'sun'
    },
    questionIds: [
      'q-g5-hre-u1-013',
      'q-g5-hre-u1-014',
      'q-g5-hre-u1-015',
      'q-g5-hre-u1-016',
      'q-g5-hre-u1-017',
      'q-g5-hre-u1-018',
      'q-g5-hre-u1-019',
      'q-g5-hre-u1-020',
      'q-g5-hre-u1-021',
      'q-g5-hre-u1-022',
      'q-g5-hre-u1-023',
      'q-g5-hre-u1-024'
    ]
  },
  {
    id: 'mission-g5-hre-u2-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u2',
    lessonId: 'lesson-g5-hre-u2-l1',
    title: 'Matsya and Kurma Cosmic Saviors Quest',
    description: 'Witness the divine descent of Matsya the Fish Avatar rescuing the seeds of life, and Kurma the Tortoise supporting Mount Mandara during the cosmic churning!',
    order: 91,
    orderIndex: 91,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-cosmic-saviors',
    badge: {
      name: 'Cosmic Savior',
      icon: 'shield'
    },
    questionIds: [
      'q-g5-hre-u2-001',
      'q-g5-hre-u2-002',
      'q-g5-hre-u2-003',
      'q-g5-hre-u2-004',
      'q-g5-hre-u2-005',
      'q-g5-hre-u2-006',
      'q-g5-hre-u2-007',
      'q-g5-hre-u2-008',
      'q-g5-hre-u2-009',
      'q-g5-hre-u2-010',
      'q-g5-hre-u2-011',
      'q-g5-hre-u2-012'
    ]
  },
  {
    id: 'mission-g5-hre-u2-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u2',
    lessonId: 'lesson-g5-hre-u2-l2',
    title: 'Varaha and Narasimha Devotion Trial',
    description: 'Learn how Varaha the Boar Avatar lifted Mother Earth from cosmic waters, and stand alongside young Prahlada whose fearless faith summoned Narasimha!',
    order: 92,
    orderIndex: 92,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-devotion-shield',
    badge: {
      name: 'Steadfast Bhakti',
      icon: 'heart'
    },
    questionIds: [
      'q-g5-hre-u2-013',
      'q-g5-hre-u2-014',
      'q-g5-hre-u2-015',
      'q-g5-hre-u2-016',
      'q-g5-hre-u2-017',
      'q-g5-hre-u2-018',
      'q-g5-hre-u2-019',
      'q-g5-hre-u2-020',
      'q-g5-hre-u2-021',
      'q-g5-hre-u2-022',
      'q-g5-hre-u2-023',
      'q-g5-hre-u2-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 6. Questions (Units 1 & 2: 48 Questions total)
const questionsToAdd = [
  // --- Unit 1 Lesson 1: Paramatma Attributes and Divine Presence Quest (q-g5-hre-u1-001 to 012) ---
  {
    id: 'q-g5-hre-u1-001',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What does the attribute "Sarvavyapi" mean regarding the Supreme Divine (Paramatma)?',
    text: 'What does the attribute "Sarvavyapi" mean regarding the Supreme Divine (Paramatma)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Omnipresent—existing everywhere in the universe and in every living creature',
      'Able to speak only one language',
      'Existing only inside temple sanctums during festivals',
      'Living only on high mountain peaks away from humans'
    ],
    correctAnswer: 'Omnipresent—existing everywhere in the universe and in every living creature',
    explanation: '"Sarvavyapi" combines "Sarva" (all) and "Vyapi" (permeating/pervading), expressing that Paramatma is omnipresent, dwelling in all creation and within every soul as Atman.',
    socraticHint: 'Which English word starting with "omni-" means present in all places at all times?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-002',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What does the divine attribute "Sarvashaktiman" signify in Hindu philosophy?',
    text: 'What does the divine attribute "Sarvashaktiman" signify in Hindu philosophy?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Omnipotent—possessing all power and the ultimate source of all cosmic energy',
      'Possessing strength only equal to five elephants',
      'Needing physical weapons to create the world',
      'Relying on humans to provide strength'
    ],
    correctAnswer: 'Omnipotent—possessing all power and the ultimate source of all cosmic energy',
    explanation: '"Sarvashaktiman" means all-powerful (omnipotent). Paramatma possesses boundless spiritual, cosmic, and creative power that sustains all planetary systems.',
    socraticHint: 'What term means having infinite, unlimited power over all of creation?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-003',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What is the meaning of the attribute "Sarvajna" when describing Paramatma?',
    text: 'What is the meaning of the attribute "Sarvajna" when describing Paramatma?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Omniscient—all-knowing, aware of all actions, thoughts, and intentions across time',
      'Knowing only what is written in printed books',
      'Knowing only events that happened in ancient times',
      'Unable to understand the silent thoughts of humans'
    ],
    correctAnswer: 'Omniscient—all-knowing, aware of all actions, thoughts, and intentions across time',
    explanation: '"Sarvajna" means all-knowing (omniscient), understanding the innermost thoughts, motivations, and deeds of all creatures in past, present, and future.',
    socraticHint: 'Which word describing God refers to complete, infinite knowledge of everything?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-004',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What term refers to the eternal individual soul residing within each living being that is a spark of Paramatma?',
    text: 'What term refers to the eternal individual soul residing within each living being that is a spark of Paramatma?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Atman',
      'Sharira',
      'Maya',
      'Prakriti'
    ],
    correctAnswer: 'Atman',
    explanation: 'The Atman is the immortal, divine soul present within all living beings, reflecting the omnipresent light of Paramatma.',
    socraticHint: 'Which Sanskrit word refers to the immortal spiritual soul within every person and animal?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-005',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What classic analogy in the Upanishads illustrates how Paramatma is invisible yet present everywhere in the universe?',
    text: 'What classic analogy in the Upanishads illustrates how Paramatma is invisible yet present everywhere in the universe?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Salt dissolved in water, which cannot be seen with the eye yet makes every drop taste salty',
      'A stone sinking to the bottom of a river',
      'A bird flying out of a metal cage',
      'A piece of wood burning into smoke'
    ],
    correctAnswer: 'Salt dissolved in water, which cannot be seen with the eye yet makes every drop taste salty',
    explanation: 'In the Chandogya Upanishad, the sage Uddalaka asks his son Svetaketu to dissolve salt in water: though invisible, salt pervades every drop, just as Paramatma pervades creation.',
    socraticHint: 'Think of salt or sugar stirred into a glass of water—can you see it, or do you taste its presence everywhere?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-006',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What profound Sanskrit phrase from the Maha Upanishad teaches that the entire world is one interconnected family?',
    text: 'What profound Sanskrit phrase from the Maha Upanishad teaches that the entire world is one interconnected family?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Vasudhaiva Kutumbakam" (The world is one family)',
      '"Satyameva Jayate" (Truth alone triumphs)',
      '"Ahimsa Paramo Dharmah" (Non-violence is the supreme virtue)',
      '"Matru Devo Bhava" (Revere your mother as divine)'
    ],
    correctAnswer: '"Vasudhaiva Kutumbakam" (The world is one family)',
    explanation: '"Vasudhaiva Kutumbakam" means "the entire Earth is a single family," reminding us that because all beings share the same divine essence, we should love all people equally.',
    socraticHint: 'Which universal phrase translates to "The whole Earth is indeed one family"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-007',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'How does understanding that Paramatma is Sarvajna (all-knowing) influence a pupil\'s moral choices when they are alone?',
    text: 'How does understanding that Paramatma is Sarvajna (all-knowing) influence a pupil\'s moral choices when they are alone?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The pupil acts honestly and kindly even when no teacher or parent is watching, knowing God is aware of every thought and deed',
      'The pupil only behaves well when an adult is holding a reward',
      'The pupil believes that secret actions have no consequences',
      'The pupil speaks lies whenever they are outside the classroom'
    ],
    correctAnswer: 'The pupil acts honestly and kindly even when no teacher or parent is watching, knowing God is aware of every thought and deed',
    explanation: 'Recognizing that Paramatma knows our innermost thoughts inspires genuine integrity (Satya) and moral discipline, eliminating deceit whether observed or unobserved.',
    socraticHint: 'How does knowing that God sees all private thoughts and actions encourage personal honesty?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-008',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What form of greeting do Hindus practice by joining both palms together in front of the chest, acknowledging the divine spark (Atman) in the other person?',
    text: 'What form of greeting do Hindus practice by joining both palms together in front of the chest, acknowledging the divine spark (Atman) in the other person?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Namaste (or Namaskar)',
      'Pradakshina',
      'Aarti',
      'Havan'
    ],
    correctAnswer: 'Namaste (or Namaskar)',
    explanation: '"Namaste" literally means "I bow to the divine presence within you," expressing profound humility, equality, and reverence for the sacred soul in every human being.',
    socraticHint: 'Which customary greeting involves placing both hands together near the heart and bowing slightly?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-009',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'How does believing that Paramatma is Sarvavyapi (present everywhere) encourage environmental respect among pupils?',
    text: 'How does believing that Paramatma is Sarvavyapi (present everywhere) encourage environmental respect among pupils?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It teaches that trees, rivers, and animals share divine life and must not be polluted, deforested, or harmed recklessly',
      'It suggests that people should avoid walking on grass altogether',
      'It means nature does not need to be cared for by humans',
      'It encourages building concrete walls around all green spaces'
    ],
    correctAnswer: 'It teaches that trees, rivers, and animals share divine life and must not be polluted, deforested, or harmed recklessly',
    explanation: 'Because divine consciousness pervades all nature, Hindu tradition reveres rivers (as sacred mothers), trees, and wildlife, instilling deep conservation ethics.',
    socraticHint: 'If God resides within all living nature, how should we treat forests, rivers, and animals?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-010',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'In Nairobi, how do Grade 5 learners at SSDN Temple and local schools put the teaching of "Vasudhaiva Kutumbakam" into practice?',
    text: 'In Nairobi, how do Grade 5 learners at SSDN Temple and local schools put the teaching of "Vasudhaiva Kutumbakam" into practice?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By showing respect, sharing learning materials, and welcoming classmates of all ethnic and religious communities as brothers and sisters',
      'By only associating with students from their own neighborhood',
      'By refusing to participate in national holiday events',
      'By competing selfishly for school prizes'
    ],
    correctAnswer: 'By showing respect, sharing learning materials, and welcoming classmates of all ethnic and religious communities as brothers and sisters',
    explanation: 'Treating the world as one family means embracing all fellow Kenyan citizens with kindness, overcoming tribal or religious prejudices, and building national solidarity.',
    socraticHint: 'How does viewing all Kenyans as family members promote harmony and friendship in school?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-011',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What is the relationship between Paramatma (Supreme Soul) and Jivatma (individual embodied soul)?',
    text: 'What is the relationship between Paramatma (Supreme Soul) and Jivatma (individual embodied soul)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Paramatma is the infinite cosmic ocean of consciousness, while the Jivatma is like an individual drop of water originating from that same ocean',
      'They are hostile enemies constantly at war',
      'Paramatma was created by human thoughts while Jivatma is made of rock',
      'There is no connection between them whatsoever'
    ],
    correctAnswer: 'Paramatma is the infinite cosmic ocean of consciousness, while the Jivatma is like an individual drop of water originating from that same ocean',
    explanation: 'The individual soul (Jivatma) shares the same divine essence with the Supreme Soul (Paramatma), just as a drop of sea spray has the same nature as the boundless ocean.',
    socraticHint: 'Think of an individual water droplet and the vast ocean from which it comes.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-012',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'Why is practicing prayer and silent meditation (Dhyana) beneficial for a Grade 5 pupil\'s mental well-being in Kenya?',
    text: 'Why is practicing prayer and silent meditation (Dhyana) beneficial for a Grade 5 pupil\'s mental well-being in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It calms turbulent thoughts, connects the mind with inner peace, improves concentration for studies, and reduces anxiety',
      'It makes the pupil fall asleep during examinations',
      'It replaces the need to do physical exercise and sports',
      'It guarantees that one will never experience rainy weather'
    ],
    correctAnswer: 'It calms turbulent thoughts, connects the mind with inner peace, improves concentration for studies, and reduces anxiety',
    explanation: 'Meditation (Dhyana) still the mind, centers the awareness on the divine presence within, enhances academic focus, and nurtures emotional resilience.',
    socraticHint: 'How does taking quiet time to calm the breath and mind improve focus and reduce stress for pupils?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },

  // --- Unit 1 Lesson 2: Rta Cosmic Balance and Nature Harmony Quest (q-g5-hre-u1-013 to 024) ---
  {
    id: 'q-g5-hre-u1-013',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What ancient Vedic concept represents the cosmic order, truth, and natural harmony governing the entire universe?',
    text: 'What ancient Vedic concept represents the cosmic order, truth, and natural harmony governing the entire universe?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Rta',
      'Maya',
      'Kama',
      'Moha'
    ],
    correctAnswer: 'Rta',
    explanation: 'Rta is the foundational Vedic concept of the universal cosmic rhythm and moral order that regulates nature, celestial bodies, and ethical conduct.',
    socraticHint: 'Which short three-letter Vedic term signifies the eternal cosmic harmony and natural balance?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-014',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'Which divine deity in the Rigveda is especially revered as the guardian and protector of Rta (Cosmic Order)?',
    text: 'Which divine deity in the Rigveda is especially revered as the guardian and protector of Rta (Cosmic Order)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Varuna',
      'Indra',
      'Agni',
      'Vayu'
    ],
    correctAnswer: 'Varuna',
    explanation: 'In the Rigveda, Lord Varuna is known as Rtasya Gopa (the guardian of Rta), overseeing the moral and physical laws that keep the universe in equilibrium.',
    socraticHint: 'Which deity is described as Rtasya Gopa—the keeper of cosmic order and ocean depths?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-015',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'Which of the following is an example of Rta manifesting in the physical natural world around us?',
    text: 'Which of the following is an example of Rta manifesting in the physical natural world around us?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The predictable rhythm of day and night, the cycling of rainy and dry seasons, and rivers flowing to the ocean',
      'Traffic jams during rush hour in Nairobi',
      'A broken bicycle wheel left by the roadside',
      'An unexpected loud sound from a television'
    ],
    correctAnswer: 'The predictable rhythm of day and night, the cycling of rainy and dry seasons, and rivers flowing to the ocean',
    explanation: 'Rta is evident in the ordered, dependable cycles of the natural cosmos: sunrise, moon phases, rain patterns, plant growth, and planetary orbits.',
    socraticHint: 'Look for recurring, dependable natural phenomena like day and night or weather seasons.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-016',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'How does the cosmic concept of Rta connect to the moral virtue of Dharma in human life?',
    text: 'How does the cosmic concept of Rta connect to the moral virtue of Dharma in human life?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Dharma is the practice of living in personal harmony with Rta through truthfulness, justice, duty, and kindness',
      'Dharma means breaking natural laws whenever convenient',
      'Rta applies only to animals while Dharma applies only to stones',
      'There is no connection between cosmic order and human moral conduct'
    ],
    correctAnswer: 'Dharma is the practice of living in personal harmony with Rta through truthfulness, justice, duty, and kindness',
    explanation: 'While Rta is cosmic order in nature, Dharma is the human expression of that order—living ethically, doing one\'s duty, and preserving social and ecological harmony.',
    socraticHint: 'How does practicing righteousness (Dharma) bring our personal actions into alignment with natural cosmic order (Rta)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-017',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What happens to the natural environment when human beings disrupt Rta through reckless exploitation and pollution?',
    text: 'What happens to the natural environment when human beings disrupt Rta through reckless exploitation and pollution?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ecological imbalance results, leading to severe droughts, water scarcity, loss of wildlife, and climate disasters',
      'Nature automatically becomes twice as productive',
      'Rainfall increases and cleans the rivers without effort',
      'Wild animals relocate peacefully to cities'
    ],
    correctAnswer: 'Ecological imbalance results, leading to severe droughts, water scarcity, loss of wildlife, and climate disasters',
    explanation: 'Disrupting Rta (natural balance) causes ecological degradation—deforestation, erratic climate patterns, poisoned water sources, and suffering for all living species.',
    socraticHint: 'What environmental crises occur when humans cut forests recklessly and pollute fresh water?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-018',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'How can Kenyan pupils help preserve Rta (natural harmony) within their school compound?',
    text: 'How can Kenyan pupils help preserve Rta (natural harmony) within their school compound?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By planting indigenous trees, harvesting rainwater, managing waste, and caring for school gardens',
      'By throwing plastic wrappers under classroom desks',
      'By wasting tap water while washing their hands',
      'By uprooting flowering shrubs in the courtyard'
    ],
    correctAnswer: 'By planting indigenous trees, harvesting rainwater, managing waste, and caring for school gardens',
    explanation: 'Active ecological stewardship—tree planting, waste reduction, water conservation—restores and protects the natural harmony of Rta right at school.',
    socraticHint: 'Which positive ecological activities support clean soil, healthy trees, and conserved water in school?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-019',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'Why are major rivers like the Ganga in India and rivers in Kenya revered as sacred mothers in spiritual traditions?',
    text: 'Why are major rivers like the Ganga in India and rivers in Kenya revered as sacred mothers in spiritual traditions?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because water sustains all life, irrigates crops, quenches thirst, and purifies, acting as a nurturing mother to all living beings',
      'Because rivers are made of pure silver',
      'Because rivers flow only backwards up mountains',
      'Because fish are not allowed to swim in rivers'
    ],
    correctAnswer: 'Because water sustains all life, irrigates crops, quenches thirst, and purifies, acting as a nurturing mother to all living beings',
    explanation: 'Rivers provide life-giving water for farming, drinking, and purification, embodying maternal sustenance and deserving the highest care and protection from pollution.',
    socraticHint: 'How do rivers nurture and sustain all crops, animals, and human communities just like a mother?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-020',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'In Nakuru, how does the Hindu youth community\'s lake cleanup project protect wildlife in alignment with Rta?',
    text: 'In Nakuru, how does the Hindu youth community\'s lake cleanup project protect wildlife in alignment with Rta?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By clearing dangerous plastic and waste from the lakeshore, preserving clean habitats for flamingos and endangered animals',
      'By catching flamingos to keep as domestic pets',
      'By pouring soap into the lake to wash the water',
      'By restricting wild animals from drinking lake water'
    ],
    correctAnswer: 'By clearing dangerous plastic and waste from the lakeshore, preserving clean habitats for flamingos and endangered animals',
    explanation: 'Removing non-biodegradable plastics from the ecosystem protects birds and marine life from choking and toxicity, upholding the sacred balance of Rta.',
    socraticHint: 'How does removing plastic waste from lake shores keep bird and animal habitats clean and safe?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-021',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What principle of living in harmony with Rta encourages simplicity and prevents greed from destroying nature?',
    text: 'What principle of living in harmony with Rta encourages simplicity and prevents greed from destroying nature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Aparigraha (Non-possessiveness / contentment with taking only what is needed)',
      'Lobha (Intense greed)',
      'Matsarya (Jealousy)',
      'Ahankara (Egotism)'
    ],
    correctAnswer: 'Aparigraha (Non-possessiveness / contentment with taking only what is needed)',
    explanation: 'Aparigraha teaches taking only what is necessary for sustainable life without hoarding or overconsumption, preserving natural resources for future generations.',
    socraticHint: 'Which virtue involves non-greed, simplicity, and not hoarding excess material possessions?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-022',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What Vedic prayer expresses a universal plea for peace and balance across all realms of creation—sky, earth, waters, plants, and trees?',
    text: 'What Vedic prayer expresses a universal plea for peace and balance across all realms of creation—sky, earth, waters, plants, and trees?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Shanti Mantra ("Om Dyauh Shantir Antariksham Shantih...")',
      'The Hanuman Chalisa',
      'The Bhagavad Gita battle cry',
      'The Aarti Kunj Bihari'
    ],
    correctAnswer: 'The Shanti Mantra ("Om Dyauh Shantir Antariksham Shantih...")',
    explanation: 'The peace prayer (Shanti Mantra) from the Yajurveda prays for peace across all elements: peace in the heavens, peace in the atmosphere, peace on earth, and peace in waters and vegetation.',
    socraticHint: 'Which sacred chant repeats the word "Shanti" (peace) for the sky, waters, trees, and all cosmos?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-023',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'How does seasonal farming in Kenya reflect the cosmic rhythms of Rta?',
    text: 'How does seasonal farming in Kenya reflect the cosmic rhythms of Rta?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Farmers prepare land before long rains, sow seeds at rain onset, weed during growth, and harvest at maturity, cooperating with nature’s cycles',
      'Farmers harvest crops during heavy hail storms without planting',
      'Farmers expect maize to ripen overnight without water or sun',
      'Farming completely ignores sunlight and seasons'
    ],
    correctAnswer: 'Farmers prepare land before long rains, sow seeds at rain onset, weed during growth, and harvest at maturity, cooperating with nature’s cycles',
    explanation: 'Agriculture is a direct human partnership with Rta: following the natural calendar of rainfall, sunshine, and soil fertility to produce food for the community.',
    socraticHint: 'How does agricultural success depend on following nature\'s seasonal calendar of rains and sunshine?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },
  {
    id: 'q-g5-hre-u1-024',
    subStrandId: 'substrand-g5-hre-u1',
    prompt: 'What ultimate ethical lesson does a Grade 5 learner internalize from the Vedic teaching of Rta?',
    text: 'What ultimate ethical lesson does a Grade 5 learner internalize from the Vedic teaching of Rta?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Human beings are not masters who can exploit nature carelessly, but responsible caretakers whose moral and ecological choices must maintain universal balance',
      'Only adults need to obey the laws of nature',
      'Material wealth is more important than keeping rivers clean',
      'Actions done in nature have no spiritual impact on human character'
    ],
    correctAnswer: 'Human beings are not masters who can exploit nature carelessly, but responsible caretakers whose moral and ecological choices must maintain universal balance',
    explanation: 'Understanding Rta instills humility, accountability, and environmental ethics, teaching that moral righteousness and ecological care are inseparable spiritual duties.',
    socraticHint: 'Are humans destructive rulers of the earth or respectful custodians charged with maintaining harmony?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U1'
  },

  // --- Unit 2 Lesson 1: Matsya and Kurma Cosmic Saviors Quest (q-g5-hre-u2-001 to 012) ---
  {
    id: 'q-g5-hre-u2-001',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What does the Sanskrit term "Avatar" literally mean in Hindu tradition?',
    text: 'What does the Sanskrit term "Avatar" literally mean in Hindu tradition?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Descent"—the divine descending into the worldly realm to restore righteousness (Dharma)',
      'A warrior who wins a physical wrestling championship',
      'A golden throne placed inside a palace',
      'An ancient magical weapon made of iron'
    ],
    correctAnswer: '"Descent"—the divine descending into the worldly realm to restore righteousness (Dharma)',
    explanation: 'Avatar comes from "Ava" (down) and "Tri" (to cross/pass), meaning the descent of God into physical manifestation to protect Dharma and rescue the world from darkness.',
    socraticHint: 'Which word meaning "descent" describes the divine taking form on Earth to uphold righteousness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-002',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What is the sacred purpose of an Avatar as stated by Lord Krishna in the Bhagavad Gita (4:7-8)?',
    text: 'What is the sacred purpose of an Avatar as stated by Lord Krishna in the Bhagavad Gita (4:7-8)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To protect the virtuous, destroy wickedness, and re-establish Dharma whenever righteousness declines',
      'To acquire vast palaces and golden jewelry for Himself',
      'To force all humans to stop engaging in daily work',
      'To change the geography of continents at will'
    ],
    correctAnswer: 'To protect the virtuous, destroy wickedness, and re-establish Dharma whenever righteousness declines',
    explanation: 'Lord Krishna declares: "Paritranaya sadhunam vinashaya cha dushkritam, dharma-samsthapanarthaya sambhavami yuge yuge" (To protect the good, eliminate evil, and establish Dharma, I appear age after age).',
    socraticHint: 'What threefold purpose does the Bhagavad Gita give: protecting the good, defeating evil, and establishing righteousness?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-003',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'Who was the first Avatar in the classic Dashavatara (ten primary incarnations) of Lord Vishnu?',
    text: 'Who was the first Avatar in the classic Dashavatara (ten primary incarnations) of Lord Vishnu?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Matsya (The Fish Avatar)',
      'Kurma (The Tortoise Avatar)',
      'Varaha (The Boar Avatar)',
      'Narasimha (The Half-Lion Avatar)'
    ],
    correctAnswer: 'Matsya (The Fish Avatar)',
    explanation: 'Matsya, the Fish Avatar, is the first divine incarnation of Lord Vishnu in the Dashavatara sequence, appearing during the great cosmic deluge.',
    socraticHint: 'Which aquatic incarnation appeared as a small fish to King Manu?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-004',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'To which righteous king did Matsya the Fish Avatar appear while he was offering morning water oblations in the river?',
    text: 'To which righteous king did Matsya the Fish Avatar appear while he was offering morning water oblations in the river?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'King Manu (Satyavrata)',
      'King Dasharatha',
      'King Janaka',
      'King Harishchandra'
    ],
    correctAnswer: 'King Manu (Satyavrata)',
    explanation: 'King Manu (Satyavrata) was performing morning water prayers when the tiny fish leaped into his cupped hands asking for refuge from larger predatory fish.',
    socraticHint: 'Which ancient king and progenitor of humanity was saved along with the sages in the great flood?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-005',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What did Matsya instruct King Manu to collect and place on the large boat before the great deluge arrived?',
    text: 'What did Matsya instruct King Manu to collect and place on the large boat before the great deluge arrived?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The seven holy sages (Saptarishi), medicinal seeds of all plants, and pairs of all living creatures',
      'Only gold, silver, and precious gemstones from royal vaults',
      'Heavy weapons and iron chariots for war',
      'Only royal courtiers and palace servants'
    ],
    correctAnswer: 'The seven holy sages (Saptarishi), medicinal seeds of all plants, and pairs of all living creatures',
    explanation: 'Matsya commanded Manu to gather the Saptarishi (custodians of Vedic wisdom), seeds of all vegetation, and living creatures to repopulate and regenerate the earth after the flood.',
    socraticHint: 'What three essentials were preserved: sacred sages of wisdom, plant seeds, and pairs of animal species?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-006',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'How did Matsya guide the vessel safely through the turbulent waters of the cosmic flood?',
    text: 'How did Matsya guide the vessel safely through the turbulent waters of the cosmic flood?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'King Manu tied the vessel to the massive horn atop Matsya\'s head using the divine serpent Vasuki as a rope',
      'Matsya blew gentle winds that pushed the boat forward without ropes',
      'The boat had a modern steam engine that navigated the waves',
      'The vessel flew through the clouds above the water'
    ],
    correctAnswer: 'King Manu tied the vessel to the massive horn atop Matsya\'s head using the divine serpent Vasuki as a rope',
    explanation: 'Lord Matsya grew to a gigantic size with a prominent golden horn; Manu hitched the vessel to this horn using Vasuki, safely navigating through the storm.',
    socraticHint: 'What horn on the giant fish was the boat securely tied to during the flood?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-007',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What form did Lord Vishnu assume in His second incarnation as Kurma Avatar?',
    text: 'What form did Lord Vishnu assume in His second incarnation as Kurma Avatar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A gigantic cosmic Tortoise',
      'A mighty winged Eagle (Garuda)',
      'A majestic white Elephant',
      'A roaring desert Lion'
    ],
    correctAnswer: 'A gigantic cosmic Tortoise',
    explanation: 'Kurma Avatar is the Tortoise incarnation of Lord Vishnu who supported Mount Mandara on His sturdy carapace during the churning of the cosmic ocean.',
    socraticHint: 'Which shelled reptile that lives on land and in water represents Kurma Avatar?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-008',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'Why did the Devas (celestials) and Asuras (demons) churn the cosmic Ocean of Milk (Samudra Manthan)?',
    text: 'Why did the Devas (celestials) and Asuras (demons) churn the cosmic Ocean of Milk (Samudra Manthan)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To obtain Amrita (the nectar of immortality) and restore cosmic balance and lost spiritual treasures',
      'To catch rare deep-sea fish for a grand banquet',
      'To empty all the water out of the ocean permanently',
      'To create large waves for sailing boats'
    ],
    correctAnswer: 'To obtain Amrita (the nectar of immortality) and restore cosmic balance and lost spiritual treasures',
    explanation: 'The churning was undertaken to recover Amrita (the divine nectar conferring immortality and vitality) and divine treasures lost during a period of cosmic weakness.',
    socraticHint: 'What divine nectar of immortality (Amrita) were both groups seeking from the ocean?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-009',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What vital problem occurred during the churning of the ocean that required the intervention of Kurma Avatar?',
    text: 'What vital problem occurred during the churning of the ocean that required the intervention of Kurma Avatar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mount Mandara began sinking into the soft bed of the ocean because it lacked a solid foundation',
      'The ocean water froze completely into solid ice',
      'The rope broke into tiny pieces and dissolved',
      'The sun refused to shine over the ocean'
    ],
    correctAnswer: 'Mount Mandara began sinking into the soft bed of the ocean because it lacked a solid foundation',
    explanation: 'As churning began, the heavy mountain sank into the oceanic floor. Lord Vishnu took the form of Kurma, positioning His broad shell beneath the mountain to bear its immense weight.',
    socraticHint: 'Why did Mount Mandara begin sinking to the sea floor before Kurma provided a firm base?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-010',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What lethal poison emerged first during the churning of the ocean, and which deity compassionately drank it to save creation?',
    text: 'What lethal poison emerged first during the churning of the ocean, and which deity compassionately drank it to save creation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Halahala poison, which Lord Shiva drank and held in His throat, turning it blue (Neelakantha)',
      'Kalakuta poison, which was poured onto the earth',
      'A toxic cloud blown away by Lord Vayu',
      'Boiling oil thrown into a volcano by Lord Agni'
    ],
    correctAnswer: 'Halahala poison, which Lord Shiva drank and held in His throat, turning it blue (Neelakantha)',
    explanation: 'The deadly poison Halahala threatened all life; out of boundless compassion, Lord Shiva drank it, holding it safely in His throat which turned blue, earning Him the title Neelakantha.',
    socraticHint: 'Which compassionate deity drank the Halahala poison, earning the name Neelakantha (the Blue-Throated One)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-011',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'How does the collaboration between Devas and Asuras during the churning of the ocean teach teamwork to Kenyan school pupils?',
    text: 'How does the collaboration between Devas and Asuras during the churning of the ocean teach teamwork to Kenyan school pupils?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It illustrates that achieving grand common goals requires cooperation, patience, and setting aside personal rivalries for the collective good',
      'It proves that people who disagree should never speak to each other',
      'It shows that only one person should do all the work in a group project',
      'It suggests that disagreements should always be settled with physical fights'
    ],
    correctAnswer: 'It illustrates that achieving grand common goals requires cooperation, patience, and setting aside personal rivalries for the collective good',
    explanation: 'Despite their sharp differences, both groups cooperated to churn the ocean for the greater good, illustrating how Kenyan pupils must collaborate constructively in class and community projects.',
    socraticHint: 'How does working together with diverse people help achieve great community results that no one can accomplish alone?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-012',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'In coastal Kenya (Mombasa and Watamu), how does the Matsya narrative inspire children to protect endangered marine biodiversity?',
    text: 'In coastal Kenya (Mombasa and Watamu), how does the Matsya narrative inspire children to protect endangered marine biodiversity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It reinforces that marine life and oceans are sacred gifts requiring human protection against destructive overfishing and plastic pollution',
      'It suggests that all fish should be kept in home aquariums',
      'It implies that only large whales matter in the ocean ecosystem',
      'It encourages pouring chemical fertilizers into coral reefs'
    ],
    correctAnswer: 'It reinforces that marine life and oceans are sacred gifts requiring human protection against destructive overfishing and plastic pollution',
    explanation: 'The Matsya Avatar begins with the message that even the tiniest aquatic minnow deserves compassion and sanctuary, inspiring pupils to protect marine life in Kenyan waters.',
    socraticHint: 'How does God taking the form of a fish inspire us to value and protect sea creatures and ocean waters?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },

  // --- Unit 2 Lesson 2: Varaha and Narasimha Devotion Trial (q-g5-hre-u2-013 to 024) ---
  {
    id: 'q-g5-hre-u2-013',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What form did Lord Vishnu assume in His third incarnation as Varaha Avatar?',
    text: 'What form did Lord Vishnu assume in His third incarnation as Varaha Avatar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A mighty Boar',
      'A winged Falcon',
      'A horned Bull (Nandi)',
      'A gentle Deer'
    ],
    correctAnswer: 'A mighty Boar',
    explanation: 'Varaha Avatar is the Boar incarnation of Lord Vishnu, who plunged into the cosmic ocean to rescue Mother Earth (Bhumi Devi).',
    socraticHint: 'Which strong animal with powerful tusks represents the third incarnation of Lord Vishnu?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-014',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'Which demon had dragged Mother Earth (Bhumi Devi) into the murky depths of the cosmic waters, prompting the Varaha incarnation?',
    text: 'Which demon had dragged Mother Earth (Bhumi Devi) into the murky depths of the cosmic waters, prompting the Varaha incarnation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Hiranyaksha',
      'Ravana',
      'Kumbhakarna',
      'Mahishasura'
    ],
    correctAnswer: 'Hiranyaksha',
    explanation: 'Hiranyaksha was the tyrant demon who submerged Mother Earth into the primeval cosmic abyss; he was vanquished by Lord Varaha.',
    socraticHint: 'Which demon was the elder brother of Hiranyakashipu who attacked Mother Earth?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-015',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'How did Lord Varaha rescue Mother Earth (Bhumi Devi) from the bottom of the cosmic ocean?',
    text: 'How did Lord Varaha rescue Mother Earth (Bhumi Devi) from the bottom of the cosmic ocean?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He defeated Hiranyaksha and gently carried the Earth safely aloft upon His powerful tusks back into the light',
      'He pulled the Earth up with a long golden chain',
      'He blew the Earth into the sky using a hurricane wind',
      'He asked the demons to carry the Earth up in a basket'
    ],
    correctAnswer: 'He defeated Hiranyaksha and gently carried the Earth safely aloft upon His powerful tusks back into the light',
    explanation: 'Lord Varaha dove into the cosmic waters, defeated Hiranyaksha, and lifted Mother Earth tenderly upon His tusks, restoring her to her stable orbit.',
    socraticHint: 'Upon which part of His head did Varaha tenderly support Mother Earth as He rose from the depths?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-016',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What form was taken by Lord Vishnu in His fourth incarnation as Narasimha Avatar?',
    text: 'What form was taken by Lord Vishnu in His fourth incarnation as Narasimha Avatar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Half-man and half-lion (Nara = human, Simha = lion)',
      'Half-man and half-horse (Hayagriva)',
      'Half-elephant and half-tiger',
      'A golden Eagle'
    ],
    correctAnswer: 'Half-man and half-lion (Nara = human, Simha = lion)',
    explanation: '"Nara" means human and "Simha" means lion; Narasimha appeared with the torso and limbs of a man and the head, mane, and claws of a lion.',
    socraticHint: 'Which compound Sanskrit name translates directly to "man-lion"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-017',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'Who was the devout young boy who refused to worship his demonic father Hiranyakashipu and remained steadfast in his devotion to Lord Vishnu?',
    text: 'Who was the devout young boy who refused to worship his demonic father Hiranyakashipu and remained steadfast in his devotion to Lord Vishnu?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prahlada',
      'Dhruva',
      'Nachiketa',
      'Arjuna'
    ],
    correctAnswer: 'Prahlada',
    explanation: 'Prahlada was the noble child whose pure, unshakeable devotion (Bhakti) to Lord Vishnu could not be extinguished by threats, torture, or peer pressure.',
    socraticHint: 'Which young devotee remained devoted to Lord Vishnu despite all his father\'s cruel punishments?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-018',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What special boons had Hiranyakashipu obtained from Lord Brahma that made him believe he was completely invincible?',
    text: 'What special boons had Hiranyakashipu obtained from Lord Brahma that made him believe he was completely invincible?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He could not be killed by human or beast, inside or outside, by day or night, on ground or in sky, nor by any weapon',
      'He could turn anyone into stone by looking at them',
      'He could become invisible whenever he touched water',
      'He possessed an army of ten million immortal giants'
    ],
    correctAnswer: 'He could not be killed by human or beast, inside or outside, by day or night, on ground or in sky, nor by any weapon',
    explanation: 'Hiranyakashipu sought immunity: neither man nor animal could slay him, neither indoors nor outdoors, neither during the day nor at night, on land or in air, with weapon or bare hands.',
    socraticHint: 'Consider all the detailed conditions of his boon regarding time of day, location, and type of being.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-019',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'How did Lord Narasimha vanquish Hiranyakashipu while honoring every condition of Brahma’s boon?',
    text: 'How did Lord Narasimha vanquish Hiranyakashipu while honoring every condition of Brahma’s boon?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'As neither man nor beast (half-lion), at twilight (neither day nor night), on the palace threshold (neither inside nor outside), upon His lap (neither ground nor sky), using claws (no weapon)',
      'By throwing a mountain at him in the middle of the desert at noon',
      'By challenging him to a swimming race in the ocean at sunrise',
      'By locking him inside a dark cave for one thousand years'
    ],
    correctAnswer: 'As neither man nor beast (half-lion), at twilight (neither day nor night), on the palace threshold (neither inside nor outside), upon His lap (neither ground nor sky), using claws (no weapon)',
    explanation: 'Lord Narasimha fulfilled the boon with divine genius: He was half-man half-lion, appeared at dusk, placed the demon on His lap on the threshold, and used lion claws.',
    socraticHint: 'Look at how each condition (threshold, twilight, lap, claws, half-lion form) perfectly respected the boon.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-020',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What did Hiranyakashipu ask young Prahlada immediately before Lord Narasimha emerged from the pillar?',
    text: 'What did Hiranyakashipu ask young Prahlada immediately before Lord Narasimha emerged from the pillar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He asked if his God was present inside the palace pillar and struck it with his mace',
      'He asked Prahlada to give him all his school books',
      'He asked Prahlada to build a new palace out of marble',
      'He asked if Prahlada wanted to go on a hunting trip'
    ],
    correctAnswer: 'He asked if his God was present inside the palace pillar and struck it with his mace',
    explanation: 'Hiranyakashipu mocked Prahlada: "If your God is everywhere, is He inside this stone pillar?" Prahlada answered yes, and upon striking it, Narasimha burst forth.',
    socraticHint: 'Which palace structure did the king point to and strike when mocking God\'s omnipresence?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-021',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What happened to the demoness Holika when she entered a roaring fire with young Prahlada sitting on her lap?',
    text: 'What happened to the demoness Holika when she entered a roaring fire with young Prahlada sitting on her lap?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Her protective fireproof shawl blew off her and covered Prahlada, burning her to ashes while Prahlada emerged unhurt',
      'Both of them walked out holding hands peacefully',
      'The fire instantly turned into cold ice water',
      'They both flew into the sky on a cloud of smoke'
    ],
    correctAnswer: 'Her protective fireproof shawl blew off her and covered Prahlada, burning her to ashes while Prahlada emerged unhurt',
    explanation: 'Holika possessed a fireproof shawl, but because her intention was malicious and Prahlada’s heart was pure, the shawl covered Prahlada while she was consumed by the fire.',
    socraticHint: 'How did divine protection shield pure Prahlada while his evil aunt was destroyed by the flames?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-022',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'Who was the only person capable of calming the fierce, awe-inspiring anger of Lord Narasimha after Hiranyakashipu was vanquished?',
    text: 'Who was the only person capable of calming the fierce, awe-inspiring anger of Lord Narasimha after Hiranyakashipu was vanquished?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Young Prahlada, who approached Him with fearless, pure devotion and bowed at His feet',
      'The royal palace guards wielding spears',
      'The sage Narada playing his veena from afar',
      'A powerful army of kings from neighboring realms'
    ],
    correctAnswer: 'Young Prahlada, who approached Him with fearless, pure devotion and bowed at His feet',
    explanation: 'When even the celestials were terrified of Narasimha\'s blazing form, child Prahlada walked up with pure love and devotion; Narasimha tenderly placed His hand on Prahlada\'s head.',
    socraticHint: 'Which innocent child devotee was able to calm the fierce deity with sincere love?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-023',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'What moral virtue does young Prahlada embody for Kenyan primary pupils facing negative peer pressure or bullying?',
    text: 'What moral virtue does young Prahlada embody for Kenyan primary pupils facing negative peer pressure or bullying?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Moral courage, steadfast adherence to truth, and fearless faith in doing what is right despite intimidation',
      'Conforming quietly to whatever bullies demand to avoid trouble',
      'Using deceit and trickery to gain popularity at school',
      'Running away from all difficult responsibilities'
    ],
    correctAnswer: 'Moral courage, steadfast adherence to truth, and fearless faith in doing what is right despite intimidation',
    explanation: 'Prahlada proves that even a young child can possess extraordinary moral courage, standing firm on righteousness and faith even when faced with overwhelming threats.',
    socraticHint: 'How does Prahlada model courage in standing up for truth against bullying and fear?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  },
  {
    id: 'q-g5-hre-u2-024',
    subStrandId: 'substrand-g5-hre-u2',
    prompt: 'How does the narrative of Varaha lifting Mother Earth connect to Kenya’s national tree growing and soil conservation initiatives?',
    text: 'How does the narrative of Varaha lifting Mother Earth connect to Kenya’s national tree growing and soil conservation initiatives?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It highlights that Mother Earth (Bhumi Devi) must be protected, cherished, and preserved from degradation through responsible conservation, tree planting, and soil protection',
      'It suggests that humans should dig up all soil to find ancient gold',
      'It proves that soil erosion is a positive natural process',
      'It implies that only farmers are responsible for environmental protection'
    ],
    correctAnswer: 'It highlights that Mother Earth (Bhumi Devi) must be protected, cherished, and preserved from degradation through responsible conservation, tree planting, and soil protection',
    explanation: 'Just as Lord Varaha rescued the Earth from being submerged, every Kenyan citizen is called to uplift and protect our soil, forests, and land from ecological ruin.',
    socraticHint: 'How does the sacred duty of lifting and protecting Mother Earth inspire us to protect fertile soil and plant trees in Kenya?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U2'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 1 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
