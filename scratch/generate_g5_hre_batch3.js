import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 HRE Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-hre-u5',
    strandId: 'strand-g5-hre-scriptures',
    learningAreaId: 'la-hre-g5',
    title: 'The Sacred Scriptures: The Four Vedas and Philosophical Wisdom of the Upanishads',
    description: 'Exploring the eternal scriptural foundation of Sanatana Dharma: The classification of scriptures into Shruti (revealed divine wisdom heard by ancient Rishis) and Smriti (remembered traditions and epics); the Four Vedas: Rigveda (hymns of praise to cosmic forces and creation), Samaveda (sacred melodies and musical chants), Yajurveda (rituals, prayers, and prose mantras), and Atharvaveda (practical sciences, medicine/Ayurveda, and everyday living); and the profound philosophical insights of the Upanishads (dialogues exploring Brahman the Ultimate Reality, Atman the individual soul, and their oneness).',
    cbeCompetency: 'Textual literacy, philosophical inquiry, spiritual reflection, and respect for ancient literary heritage',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g5-hre-u6',
    strandId: 'strand-g5-hre-scriptures',
    learningAreaId: 'la-hre-g5',
    title: 'Sacred Mantras: Divine Vibrations of Aum, Gayatri, and Shanti Mantras',
    description: 'Investigating the spiritual science of sacred sound (Nada Brahma): The cosmic primordial sound "Aum" (Om) representing creation, preservation, and transformation across three states of consciousness (waking, dreaming, deep sleep); the universally revered Gayatri Mantra from the Rigveda (3:62:10) invoking Savitur (the divine sun) to illuminate human intellect with wisdom; the Shanti Mantras invoking universal peace for the heavens, earth, waters, and vegetation; and the practical benefits of daily mantra chanting for focus and calm.',
    cbeCompetency: 'Mental mindfulness, auditory concentration, reverence for sacred languages, and peaceful meditation',
    estimatedMinutes: 30,
    order: 6
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 3 Lessons (Units 5 & 6: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-hre-u5-l1',
    subStrandId: 'substrand-g5-hre-u5',
    title: 'The Four Vedas: Sacred Hymns, Chants, and Cosmic Knowledge',
    content: 'The word "Veda" originates from the Sanskrit root "Vid", which means "knowledge" or "wisdom". The Vedas are classified as Shruti ("that which was heard"), revealed directly by the Divine to ancient enlightened sages (Rishis) in deep meditation. There are Four primary Vedas: 1) The Rigveda: the oldest literary work of humankind, containing 1,028 hymns (Suktas) organized into ten mandalas, praising the divine presence in nature, cosmic creation, and truth; 2) The Samaveda: the Veda of sacred melodies (Saman), turning Vedic verses into musical chants that form the foundation of Indian classical music; 3) The Yajurveda: contains prose mantras and prayers used by priests during sacred ceremonies (Yajnas) and community offerings; 4) The Atharvaveda: contains everyday prayers, ethical guidance, scientific knowledge, and the foundations of Ayurveda (holistic natural medicine and healing herbs). For millennia, the Vedas were preserved with astonishing acoustic accuracy through rigorous oral chanting systems without changing a single syllable.',
    didYouKnow: 'The oral tradition of Vedic chanting was declared a Masterpiece of the Oral and Intangible Heritage of Humanity by UNESCO in 2003!',
    kenyanContext: 'At the Arya Samaj Primary School in Nairobi, pupils start their morning assembly reciting Vedic prayers that celebrate universal wisdom, truthfulness, and knowledge for all mankind.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u5-l2',
    subStrandId: 'substrand-g5-hre-u5',
    title: 'The Upanishads: Dialogue, Seeking Truth, and Inner Divinity',
    content: 'The Upanishads form the concluding philosophical portion of the Vedas, often referred to as Vedanta ("the culmination of the Vedas"). The Sanskrit word "Upanishad" means "sitting down near"—picturing eager disciples sitting near a wise teacher (Guru) to receive intimate spiritual wisdom. Unlike ritual texts, the Upanishads explore profound existential questions: "Who am I? Where does the universe come from? What is the supreme truth?" The Upanishads reveal two foundational concepts: Brahman (the infinite, formless Supreme Reality underlying the entire cosmos) and Atman (the divine soul within each living being). Famous Upanishadic dialogues include young Nachiketa questioning Yama (the lord of death) in the Katha Upanishad about the immortality of the soul, and Sage Uddalaka teaching his son Svetaketu in the Chandogya Upanishad the famous truth: "Tat Tvam Asi" ("You are That"—meaning your inner soul is divine). The Upanishads inspire children to be sincere seekers of knowledge, to question respectfully, and to see divinity in everyone.',
    didYouKnow: 'India\'s national motto "Satyameva Jayate" (Truth alone triumphs) is taken directly from the Mundaka Upanishad (3.1.6)!',
    kenyanContext: 'In Kenya, student philosophy and debate clubs in secondary and primary schools draw inspiration from the Upanishadic method of respectful questioning between teachers and students to uncover truth.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u6-l1',
    subStrandId: 'substrand-g5-hre-u6',
    title: 'The Sacred Primordial Sound Aum (Om) and the Gayatri Mantra',
    content: 'In Hindu thought, sound (Nada) is the first manifestation of creation. The sacred syllable "Aum" (Om) is the primordial sound (Pranava) representing the Supreme Reality. Aum is composed of three sounds: "A" representing the waking state of consciousness (Jagrat) and divine creation; "U" representing the dreaming state (Swapna) and divine preservation; and "M" representing the deep dreamless sleep state (Sushupti) and divine transformation. The silent pause that follows represents Turiya—pure transcendent spiritual consciousness. Alongside Om, the most revered prayer in the Vedas is the Gayatri Mantra from the Rigveda (3:62:10): "Om Bhur Bhuvas Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat." In English, this means: "We meditate upon the glorious radiance of the divine Sun of truth (Savitur); may that Divine Light illuminate and inspire our intellect with noble thoughts." Chanting the Gayatri Mantra daily enhances memory, calms restlessness, and purifies thinking.',
    didYouKnow: 'Chanting "Aum" produces gentle physical vibrations measured scientifically at approximately 432 Hz, which synchronizes brainwaves and induces deep cardiovascular relaxation!',
    kenyanContext: 'During morning physical education and wellness sessions in Kisumu, learners practice rhythmic "Om" chanting and deep breathing (Pranayama) to center their minds before classes.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u6-l2',
    subStrandId: 'substrand-g5-hre-u6',
    title: 'Shanti Mantras: Chanting for Universal Peace and Inner Calm',
    content: 'Hindu prayers invariably conclude with the word "Shanti" (Peace) chanted three times: "Om Shantih, Shantih, Shantih." Chanting it three times represents peace across three dimensions: 1) Adhidevika (peace from natural forces and cosmic disruptions); 2) Adhibhautika (peace with fellow human beings, creatures, and social surroundings); and 3) Adhyatmika (peace within one\'s own body, mind, and spirit). The most renowned Shanti Mantra from the Yajurveda is the universal peace prayer: "Om Dyauh Shantir Antariksham Shantih, Prithivi Shantir Apah Shantir Oshadhayah Shantih, Vanaspatayah Shantir Vishvedevah Shantir Brahma Shantih..." In this prayer, the chanter asks for peace in the heavens, peace in the atmosphere, peace on earth, peace in all water bodies, peace in medicinal herbs, and peace in trees and forests. Chanting this prayer instills an environmental and global mindset: we cannot experience personal peace if our forests are cut down, our rivers are polluted, or our fellow citizens are in conflict.',
    didYouKnow: 'The three chants of "Shantih" acknowledge that human beings need peace from internal mental agitation, from social relationships, and from external natural forces!',
    kenyanContext: 'At interfaith prayer gatherings in Nairobi and Mombasa on national holidays like Madaraka Day, Hindu leaders recite the universal Shanti Mantra, praying for peace, rain, and prosperity across Kenya\'s 47 counties.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 3 Missions (Units 5 & 6: 4 Missions, orders 97–100)
const missionsToAdd = [
  {
    id: 'mission-g5-hre-u5-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u5',
    lessonId: 'lesson-g5-hre-u5-l1',
    title: 'Vedic Wisdom and Cosmic Hymns Quest',
    description: 'Explore the eternal wisdom of the Four Vedas—Rigveda, Samaveda, Yajurveda, and Atharvaveda—and understand how ancient oral chanting preserved sacred knowledge!',
    order: 97,
    orderIndex: 97,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-vedic-scholar',
    badge: {
      name: 'Vedic Scholar',
      icon: 'book-open'
    },
    questionIds: [
      'q-g5-hre-u5-001',
      'q-g5-hre-u5-002',
      'q-g5-hre-u5-003',
      'q-g5-hre-u5-004',
      'q-g5-hre-u5-005',
      'q-g5-hre-u5-006',
      'q-g5-hre-u5-007',
      'q-g5-hre-u5-008',
      'q-g5-hre-u5-009',
      'q-g5-hre-u5-010',
      'q-g5-hre-u5-011',
      'q-g5-hre-u5-012'
    ]
  },
  {
    id: 'mission-g5-hre-u5-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u5',
    lessonId: 'lesson-g5-hre-u5-l2',
    title: 'Upanishadic Seekers of Truth Quest',
    description: 'Sit beside ancient sages in the Upanishads, explore the profound dialogue between Nachiketa and Yama, and discover the divine Atman within your own heart!',
    order: 98,
    orderIndex: 98,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-upanishad-seeker',
    badge: {
      name: 'Truth Seeker',
      icon: 'sparkles'
    },
    questionIds: [
      'q-g5-hre-u5-013',
      'q-g5-hre-u5-014',
      'q-g5-hre-u5-015',
      'q-g5-hre-u5-016',
      'q-g5-hre-u5-017',
      'q-g5-hre-u5-018',
      'q-g5-hre-u5-019',
      'q-g5-hre-u5-020',
      'q-g5-hre-u5-021',
      'q-g5-hre-u5-022',
      'q-g5-hre-u5-023',
      'q-g5-hre-u5-024'
    ]
  },
  {
    id: 'mission-g5-hre-u6-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u6',
    lessonId: 'lesson-g5-hre-u6-l1',
    title: 'Aum Vibration and Gayatri Radiance Quest',
    description: 'Master the cosmic resonance of Aum across the three states of consciousness, and chant the Gayatri Mantra to illuminate your intellect with clarity and wisdom!',
    order: 99,
    orderIndex: 99,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-gayatri-light',
    badge: {
      name: 'Gayatri Radiance',
      icon: 'sun'
    },
    questionIds: [
      'q-g5-hre-u6-001',
      'q-g5-hre-u6-002',
      'q-g5-hre-u6-003',
      'q-g5-hre-u6-004',
      'q-g5-hre-u6-005',
      'q-g5-hre-u6-006',
      'q-g5-hre-u6-007',
      'q-g5-hre-u6-008',
      'q-g5-hre-u6-009',
      'q-g5-hre-u6-010',
      'q-g5-hre-u6-011',
      'q-g5-hre-u6-012'
    ]
  },
  {
    id: 'mission-g5-hre-u6-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u6',
    lessonId: 'lesson-g5-hre-u6-l2',
    title: 'Chants of Universal Peace (Shanti) Trial',
    description: 'Chant for peace across the three realms of existence, send vibrations of harmony to rivers and forests, and cultivate deep inner serenity for school and life!',
    order: 100,
    orderIndex: 100,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-shanti-peace',
    badge: {
      name: 'Peace Chanter',
      icon: 'heart'
    },
    questionIds: [
      'q-g5-hre-u6-013',
      'q-g5-hre-u6-014',
      'q-g5-hre-u6-015',
      'q-g5-hre-u6-016',
      'q-g5-hre-u6-017',
      'q-g5-hre-u6-018',
      'q-g5-hre-u6-019',
      'q-g5-hre-u6-020',
      'q-g5-hre-u6-021',
      'q-g5-hre-u6-022',
      'q-g5-hre-u6-023',
      'q-g5-hre-u6-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 3 Questions (Units 5 & 6: 48 Questions total)
const questionsToAdd = [
  // --- Unit 5 Lesson 1: Vedic Wisdom and Cosmic Hymns Quest (q-g5-hre-u5-001 to 012) ---
  {
    id: 'q-g5-hre-u5-001',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What does the Sanskrit word "Veda" literally mean?',
    text: 'What does the Sanskrit word "Veda" literally mean?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Knowledge or Wisdom (derived from the root "Vid")',
      'A collection of physical stones',
      'A royal palace decree',
      'A military war strategy'
    ],
    correctAnswer: 'Knowledge or Wisdom (derived from the root "Vid")',
    explanation: 'The word "Veda" comes from the root "Vid" (to know), meaning sacred, eternal knowledge and spiritual wisdom.',
    socraticHint: 'Which word describing the highest intellectual and spiritual understanding translates to "knowledge"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-002',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What are the names of the Four primary Vedas in Hindu scripture?',
    text: 'What are the names of the Four primary Vedas in Hindu scripture?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Rigveda, Samaveda, Yajurveda, and Atharvaveda',
      'Ramayana, Mahabharata, Bhagavad Gita, and Puranas',
      'Brahma, Vishnu, Shiva, and Ganesha',
      'Satya, Treta, Dvapara, and Kali'
    ],
    correctAnswer: 'Rigveda, Samaveda, Yajurveda, and Atharvaveda',
    explanation: 'The four fundamental Vedas are the Rigveda (hymns), Samaveda (melodies), Yajurveda (rituals/mantras), and Atharvaveda (everyday sciences and health).',
    socraticHint: 'Which group contains the four foundational texts: Rig, Sama, Yajur, and Atharva?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-003',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Which of the Four Vedas is the oldest and composed of 1,028 sacred hymns (Suktas)?',
    text: 'Which of the Four Vedas is the oldest and composed of 1,028 sacred hymns (Suktas)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Rigveda',
      'The Samaveda',
      'The Yajurveda',
      'The Atharvaveda'
    ],
    correctAnswer: 'The Rigveda',
    explanation: 'The Rigveda is the most ancient text of the Indo-European language family, organized into 10 mandalas and containing 1,028 poetic hymns praising cosmic creation.',
    socraticHint: 'Which is the very first and most ancient of all the four Vedas?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-004',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Which Veda is dedicated to sacred musical melodies and chants that established the foundation of Indian classical music?',
    text: 'Which Veda is dedicated to sacred musical melodies and chants that established the foundation of Indian classical music?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Samaveda',
      'The Rigveda',
      'The Yajurveda',
      'The Atharvaveda'
    ],
    correctAnswer: 'The Samaveda',
    explanation: 'The Samaveda ("Saman" meaning melody) sets Vedic verses to musical scales and rhythm, providing the roots of Indian classical melodic tradition (Ragas).',
    socraticHint: 'Which Veda takes its name from "Saman" (melody or chant)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-005',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What is the primary focus of the Yajurveda in Hindu tradition?',
    text: 'What is the primary focus of the Yajurveda in Hindu tradition?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prose mantras, prayers, and procedures utilized during sacred offerings and ceremonies (Yajnas)',
      'Narratives of naval battles and ocean exploration',
      'Astronomical maps of distant galaxies',
      'Laws regarding international shipping routes'
    ],
    correctAnswer: 'Prose mantras, prayers, and procedures utilized during sacred offerings and ceremonies (Yajnas)',
    explanation: 'The Yajurveda ("Yajus" meaning sacrificial prayer) provides instructions and mantras recited by priests during sacred havan and community Yajna rituals.',
    socraticHint: 'Which Veda provides the liturgical prayers and chants for Yajna (fire ceremonies)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-006',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Which Veda contains practical knowledge on health, herbal medicine, societal ethics, and gave rise to the healing science of Ayurveda?',
    text: 'Which Veda contains practical knowledge on health, herbal medicine, societal ethics, and gave rise to the healing science of Ayurveda?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Atharvaveda',
      'The Rigveda',
      'The Samaveda',
      'The Yajurveda'
    ],
    correctAnswer: 'The Atharvaveda',
    explanation: 'The Atharvaveda deals with practical life: herbal remedies, preventive health, home harmony, and peaceful social living, giving birth to Ayurveda.',
    socraticHint: 'Which fourth Veda contains prayers for curing illnesses and herbal remedies?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-007',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Why are the Vedas classified as "Shruti" rather than "Smriti"?',
    text: 'Why are the Vedas classified as "Shruti" rather than "Smriti"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because they are believed to be divinely revealed cosmic truths "heard" by ancient Rishis in deep meditation, not composed by human minds',
      'Because they were written by ancient kings on copper plates',
      'Because they must only be read in whispers',
      'Because they are stories passed down from memory'
    ],
    correctAnswer: 'Because they are believed to be divinely revealed cosmic truths "heard" by ancient Rishis in deep meditation, not composed by human minds',
    explanation: '"Shruti" means "that which is heard"—eternal divine wisdom perceived directly by enlightened Rishis, distinct from Smriti ("remembered" human texts like epics).',
    socraticHint: 'What does "Shruti" mean in terms of divine revelation heard directly from cosmic consciousness?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-008',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'How were the Vedas preserved word-for-word across thousands of years before the invention of printing presses?',
    text: 'How were the Vedas preserved word-for-word across thousands of years before the invention of printing presses?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Through a rigorous oral memorization tradition using complex mathematical chanting patterns (such as Pada, Krama, and Ghana pathas)',
      'By carving them onto giant granite cliffs across the world',
      'By translating them into ancient Greek and Latin',
      'By keeping secret paper copies in deep caves'
    ],
    correctAnswer: 'Through a rigorous oral memorization tradition using complex mathematical chanting patterns (such as Pada, Krama, and Ghana pathas)',
    explanation: 'Ancient Gurus developed phonetic error-checking recitation methods (Ghana patha) where syllables were chanted forwards and backwards, ensuring flawless preservation.',
    socraticHint: 'What oral recitation and memorization system preserved every syllable through chanting?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-009',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What famous verse from the Rigveda (1:164:46) proclaims that ultimate Truth is One, though called by many names by different sages?',
    text: 'What famous verse from the Rigveda (1:164:46) proclaims that ultimate Truth is One, though called by many names by different sages?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Ekam Sat Vipra Bahudha Vadanti" (Truth is One; the wise describe It in diverse ways)',
      '"Satyameva Jayate Nanritam" (Truth alone triumphs)',
      '"Ahimsa Paramo Dharmah" (Non-violence is the supreme law)',
      '"Dharmo Rakshati Rakshitah" (Dharma protects those who protect it)'
    ],
    correctAnswer: '"Ekam Sat Vipra Bahudha Vadanti" (Truth is One; the wise describe It in diverse ways)',
    explanation: '"Ekam Sat Vipra Bahudha Vadanti" establishes the foundation of Hindu pluralism and tolerance: one ultimate reality is understood and worshipped through diverse paths.',
    socraticHint: 'Which verse states that Truth (Sat) is One (Ekam) while sages speak of It variously (Bahudha)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-010',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'How does the Rigvedic teaching "Ekam Sat Vipra Bahudha Vadanti" support national unity and interfaith harmony in Kenya?',
    text: 'How does the Rigvedic teaching "Ekam Sat Vipra Bahudha Vadanti" support national unity and interfaith harmony in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It encourages mutual respect between people of different religious faiths, recognizing that diverse traditions seek the same ultimate truth and peace',
      'It requires that everyone must change their religion every year',
      'It suggests that people should only live in single-faith neighborhoods',
      'It teaches that religious diversity is dangerous and should be eliminated'
    ],
    correctAnswer: 'It encourages mutual respect between people of different religious faiths, recognizing that diverse traditions seek the same ultimate truth and peace',
    explanation: 'This Vedic wisdom promotes deep interfaith respect: acknowledging that diverse religious paths worship the same one God, fostering peaceful coexistence across Kenyan communities.',
    socraticHint: 'How does seeing that all faiths seek the one God promote tolerance and unity in Kenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-011',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What recognition did UNESCO award to the traditional oral chanting of the Vedas in 2003?',
    text: 'What recognition did UNESCO award to the traditional oral chanting of the Vedas in 2003?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A Masterpiece of the Oral and Intangible Heritage of Humanity',
      'An ancient archaeological museum artifact',
      'A regional folk song of North India',
      'A standard academic university textbook'
    ],
    correctAnswer: 'A Masterpiece of the Oral and Intangible Heritage of Humanity',
    explanation: 'UNESCO recognized the oral transmission of the Vedas as a Masterpiece of Oral and Intangible Heritage of Humanity in recognition of its timeless linguistic and cultural value.',
    socraticHint: 'Which world heritage honor recognizes masterpieces of oral and intangible human culture?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-012',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What value does a Grade 5 pupil learn from the dedication of the ancient Rishis who preserved the Vedas without altering a word?',
    text: 'What value does a Grade 5 pupil learn from the dedication of the ancient Rishis who preserved the Vedas without altering a word?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The value of intellectual discipline, perseverance, accuracy in learning, and respect for cultural knowledge heritage',
      'That learning can only be done without books or pencils',
      'That modern science is unnecessary if one memorizes ancient poems',
      'That students should avoid questioning what they study'
    ],
    correctAnswer: 'The value of intellectual discipline, perseverance, accuracy in learning, and respect for cultural knowledge heritage',
    explanation: 'The Vedic transmission models supreme mental discipline, memory training, and dedication to preserving truth and wisdom for the benefit of all future generations.',
    socraticHint: 'How does the preservation of the Vedas inspire students to be disciplined, accurate, and dedicated in their studies?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },

  // --- Unit 5 Lesson 2: Upanishadic Seekers of Truth Quest (q-g5-hre-u5-013 to 024) ---
  {
    id: 'q-g5-hre-u5-013',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What does the word "Upanishad" literally mean in Sanskrit?',
    text: 'What does the word "Upanishad" literally mean in Sanskrit?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Sitting down near" (a spiritual teacher to receive higher wisdom)',
      'Standing up to make a royal speech',
      'Singing loudly around a fire',
      'Walking away from school'
    ],
    correctAnswer: '"Sitting down near" (a spiritual teacher to receive higher wisdom)',
    explanation: '"Upa" (near), "Ni" (down), and "Shad" (sit) means sitting devotedly at the feet of an enlightened Guru to absorb spiritual philosophy and discover truth.',
    socraticHint: 'Which phrase describes a student sitting near a wise teacher to receive sacred guidance?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-014',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Why are the Upanishads commonly referred to as "Vedanta"?',
    text: 'Why are the Upanishads commonly referred to as "Vedanta"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because they form the concluding portion and philosophical pinnacle of the Vedas (Veda-Anta = End of the Vedas)',
      'Because they reject the Vedas completely',
      'Because they were written by foreign scholars',
      'Because they are only studied in evening classes'
    ],
    correctAnswer: 'Because they form the concluding portion and philosophical pinnacle of the Vedas (Veda-Anta = End of the Vedas)',
    explanation: '"Anta" means end or culmination. Vedanta refers to both the physical placement at the conclusion of Vedic texts and the highest goal of Vedic philosophy.',
    socraticHint: 'What does "Anta" mean at the end of the word Vedanta?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-015',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'In the Upanishads, what is the term for the ultimate, infinite, all-pervading Supreme Reality?',
    text: 'In the Upanishads, what is the term for the ultimate, infinite, all-pervading Supreme Reality?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Brahman',
      'Brahmin',
      'Brahma',
      'Brahmana'
    ],
    correctAnswer: 'Brahman',
    explanation: 'Brahman is the genderless, boundless, infinite consciousness and ground of all existence in Upanishadic philosophy (not to be confused with Brahma the creator or Brahmin the priest).',
    socraticHint: 'Which term refers to the infinite, formless Supreme Consciousness of the cosmos?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-016',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What famous Mahavakya (great declaration) from the Chandogya Upanishad means "You are That" (identifying the soul with the Divine)?',
    text: 'What famous Mahavakya (great declaration) from the Chandogya Upanishad means "You are That" (identifying the soul with the Divine)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Tat Tvam Asi"',
      '"Aham Brahmasmi"',
      '"Prajnanam Brahma"',
      '"Ayam Atma Brahma"'
    ],
    correctAnswer: '"Tat Tvam Asi"',
    explanation: '"Tat Tvam Asi" (That Thou Art / You are That) was taught by Sage Uddalaka to his son Svetaketu, declaring that the core of your inner self (Atman) is identical to Brahman.',
    socraticHint: 'Which three Sanskrit words translate into English as "You are That"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-017',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Who was the brave young boy in the Katha Upanishad who questioned Yama (the lord of death) about what happens to the soul after physical death?',
    text: 'Who was the brave young boy in the Katha Upanishad who questioned Yama (the lord of death) about what happens to the soul after physical death?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Nachiketa',
      'Svetaketu',
      'Satyakama',
      'Aruni'
    ],
    correctAnswer: 'Nachiketa',
    explanation: 'Nachiketa was the courageous youth who waited three days at the gates of Yama and chose as his third boon the secret of what happens to the human soul beyond death.',
    socraticHint: 'Which fearless young boy chose the knowledge of the eternal soul over worldly wealth and long life from Yama?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-018',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What worldly temptations did Yama offer Nachiketa to test if he would give up his quest for spiritual truth?',
    text: 'What worldly temptations did Yama offer Nachiketa to test if he would give up his quest for spiritual truth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Immense wealth, kingdoms, golden chariots, heavenly dancers, and a lifespan of hundreds of years',
      'A basket of mangoes and sweets',
      'A set of iron arrows and a bow',
      'Permission to skip school examinations'
    ],
    correctAnswer: 'Immense wealth, kingdoms, golden chariots, heavenly dancers, and a lifespan of hundreds of years',
    explanation: 'Yama tested Nachiketa with all worldly delights; Nachiketa wisely refused them all, stating that worldly pleasures wear out the senses and end in mortality, while truth is eternal.',
    socraticHint: 'Did Yama offer temporary worldly wealth, kingdoms, and long physical life to test Nachiketa\'s resolve?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-019',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'In the Katha Upanishad, what fundamental distinction does Yama teach between "Shreyas" and "Preyas"?',
    text: 'In the Katha Upanishad, what fundamental distinction does Yama teach between "Shreyas" and "Preyas"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Shreyas is the path of the good and righteous that leads to spiritual freedom; Preyas is the path of the merely pleasant that offers temporary physical gratification',
      'Shreyas is waking up early while Preyas is sleeping late',
      'Shreyas means physical strength while Preyas means speed in running',
      'There is no difference between the two paths'
    ],
    correctAnswer: 'Shreyas is the path of the good and righteous that leads to spiritual freedom; Preyas is the path of the merely pleasant that offers temporary physical gratification',
    explanation: 'Yama explains that every person faces two choices: Shreyas (what is truly good and elevating) versus Preyas (what feels pleasant and appealing in the short term). The wise choose Shreyas.',
    socraticHint: 'Which path represents what is morally good and righteous versus what is merely momentarily pleasurable?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-020',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'From which Upanishad is the famous motto "Satyameva Jayate" (Truth alone triumphs) taken?',
    text: 'From which Upanishad is the famous motto "Satyameva Jayate" (Truth alone triumphs) taken?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Mundaka Upanishad (3.1.6)',
      'The Katha Upanishad',
      'The Kena Upanishad',
      'The Isha Upanishad'
    ],
    correctAnswer: 'The Mundaka Upanishad (3.1.6)',
    explanation: 'The immortal statement "Satyameva Jayate Nanritam" (Truth alone triumphs, not falsehood) comes from the Mundaka Upanishad, celebrating the ultimate power of honesty.',
    socraticHint: 'Which Upanishad begins with "Mundaka" and contains the words "Satyameva Jayate"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-021',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'Who was Satyakama Jabala in the Chandogya Upanishad, and what virtue earned him acceptance as a disciple of Sage Gautama?',
    text: 'Who was Satyakama Jabala in the Chandogya Upanishad, and what virtue earned him acceptance as a disciple of Sage Gautama?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He was a humble boy who spoke the absolute, unadorned truth about his humble maternal lineage, proving true spiritual nobility through honesty',
      'He brought a chest of gold coins to the Guru',
      'He won an archery tournament',
      'He was the son of a wealthy king'
    ],
    correctAnswer: 'He was a humble boy who spoke the absolute, unadorned truth about his humble maternal lineage, proving true spiritual nobility through honesty',
    explanation: 'Satyakama truthfully stated that his mother did not know his lineage. Sage Gautama accepted him immediately, saying: "None but a true seeker of God would speak such unvarnished truth."',
    socraticHint: 'Which boy won the Guru\'s respect by telling the honest truth about his humble background?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-022',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What famous opening verse from the Isha Upanishad declares that everything in this universe is enveloped by God?',
    text: 'What famous opening verse from the Isha Upanishad declares that everything in this universe is enveloped by God?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Ishavasyam Idam Sarvam" (All this is pervaded by the Divine; enjoy by detachment and do not covet others\' wealth)',
      '"Om Sahana Vavatu"',
      '"Asato Ma Sadgamaya"',
      '"Sarve Bhavantu Sukhinah"'
    ],
    correctAnswer: '"Ishavasyam Idam Sarvam" (All this is pervaded by the Divine; enjoy by detachment and do not covet others\' wealth)',
    explanation: 'Isha Upanishad verse 1 begins: "Ishavasyam idam sarvam yat kincha jagatyam jagat..." teaching that God envelops everything, urging contentment and non-greed.',
    socraticHint: 'Which famous verse begins with the words "Ishavasyam Idam Sarvam"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-023',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'What famous prayer for liberation and enlightenment is found in the Brihadaranyaka Upanishad (1.3.28)?',
    text: 'What famous prayer for liberation and enlightenment is found in the Brihadaranyaka Upanishad (1.3.28)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Asato Ma Sadgamaya, Tamaso Ma Jyotirgamaya, Mrityor Ma Amritam Gamaya" (Lead me from untruth to truth, from darkness to light, from death to immortality)',
      '"Hare Rama Hare Krishna"',
      '"Om Namah Shivaya"',
      '"Om Gam Ganapataye Namah"'
    ],
    correctAnswer: '"Asato Ma Sadgamaya, Tamaso Ma Jyotirgamaya, Mrityor Ma Amritam Gamaya" (Lead me from untruth to truth, from darkness to light, from death to immortality)',
    explanation: 'This universal Pavamana prayer asks the Divine to lead human consciousness from illusion/untruth to truth, from darkness of ignorance to light of wisdom, and to immortality.',
    socraticHint: 'Which prayer begins with "Asato Ma Sadgamaya" (Lead me from the unreal to the real)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },
  {
    id: 'q-g5-hre-u5-024',
    subStrandId: 'substrand-g5-hre-u5',
    prompt: 'How does the Upanishadic concept of Atman (divine inner soul) help eradicate tribalism and discrimination in Kenya?',
    text: 'How does the Upanishadic concept of Atman (divine inner soul) help eradicate tribalism and discrimination in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It teaches that external physical differences, ethnic origins, and social status are mere outer garments; the same divine soul (Atman) unites all human beings in equal dignity',
      'It encourages citizens to identify only with members of their own tribe',
      'It suggests that people of different backgrounds should never work together',
      'It implies that some souls are born superior to other souls'
    ],
    correctAnswer: 'It teaches that external physical differences, ethnic origins, and social status are mere outer garments; the same divine soul (Atman) unites all human beings in equal dignity',
    explanation: 'The Upanishads emphasize that the divine spark is identical in all hearts; seeing the Atman in all people destroys bigotry, tribalism, and prejudice, inspiring universal brotherhood.',
    socraticHint: 'How does realizing that the same divine soul lives inside every Kenyan overcome tribal prejudice?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U5'
  },

  // --- Unit 6 Lesson 1: Aum Vibration and Gayatri Radiance Quest (q-g5-hre-u6-001 to 012) ---
  {
    id: 'q-g5-hre-u6-001',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What is the sacred primordial cosmic syllable known as the "Pranava" in Hindu scripture?',
    text: 'What is the sacred primordial cosmic syllable known as the "Pranava" in Hindu scripture?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Aum (Om)',
      'Hrim',
      'Klim',
      'Shrim'
    ],
    correctAnswer: 'Aum (Om)',
    explanation: 'Aum (Om) is known as the Pranava—the primordial root sound and vibration from which the entire cosmic creation originates.',
    socraticHint: 'Which universal sacred sound begins and ends nearly all Hindu Vedic prayers?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-002',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What three constituent vocal sounds comprise the sacred syllable "Aum"?',
    text: 'What three constituent vocal sounds comprise the sacred syllable "Aum"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"A", "U", and "M"',
      '"K", "A", and "L"',
      '"S", "A", and "T"',
      '"R", "A", and "M"'
    ],
    correctAnswer: '"A", "U", and "M"',
    explanation: 'Aum is phonetically composed of three distinct vocal sounds: "A" (from the throat), "U" (rolling over the tongue), and "M" (lips closed), encompassing the entire vocal spectrum.',
    socraticHint: 'Look at the three letters in the phonetic spelling: A - U - M.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-003',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'In the Mandukya Upanishad, what three states of human consciousness do the sounds "A", "U", and "M" represent?',
    text: 'In the Mandukya Upanishad, what three states of human consciousness do the sounds "A", "U", and "M" represent?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"A" = Waking state (Jagrat), "U" = Dreaming state (Swapna), and "M" = Deep dreamless sleep (Sushupti)',
      '"A" = Running, "U" = Sitting, and "M" = Lying down',
      '"A" = Morning, "U" = Afternoon, and "M" = Midnight',
      '"A" = Childhood, "U" = Youth, and "M" = Old age'
    ],
    correctAnswer: '"A" = Waking state (Jagrat), "U" = Dreaming state (Swapna), and "M" = Deep dreamless sleep (Sushupti)',
    explanation: 'The Mandukya Upanishad maps the sounds to human awareness: "A" is waking, "U" is dreaming, "M" is deep sleep, and the silence after is Turiya (pure transcendent awareness).',
    socraticHint: 'Which three states of consciousness correspond to waking, dreaming, and deep sleep?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-004',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'From which Veda does the universally renowned Gayatri Mantra originate?',
    text: 'From which Veda does the universally renowned Gayatri Mantra originate?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Rigveda (Mandala 3, Hymn 62, Verse 10)',
      'The Samaveda',
      'The Atharvaveda',
      'The Yajurveda'
    ],
    correctAnswer: 'The Rigveda (Mandala 3, Hymn 62, Verse 10)',
    explanation: 'The Gayatri Mantra is found in the Rigveda (3.62.10), revealed through the enlightenment of Sage Vishvamitra.',
    socraticHint: 'Which oldest Veda houses the Gayatri Mantra revealed to Sage Vishvamitra?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-005',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'To which divine manifestation of the Sun (the solar deity representing spiritual illumination) is the Gayatri Mantra addressed?',
    text: 'To which divine manifestation of the Sun (the solar deity representing spiritual illumination) is the Gayatri Mantra addressed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Savitur (the divine vivifier and illuminating Sun of truth)',
      'Varuna',
      'Indra',
      'Chandra'
    ],
    correctAnswer: 'Savitur (the divine vivifier and illuminating Sun of truth)',
    explanation: 'The mantra addresses Savitur (hence also called the Savitri Mantra), the divine spiritual sun that disperses darkness and awakens the inner intellect.',
    socraticHint: 'Which solar deity named in "Tat Savitur Varenyam" represents divine light?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-006',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What is the core meaning of the prayer in the phrase "Dhiyo Yo Nah Prachodayat" at the conclusion of the Gayatri Mantra?',
    text: 'What is the core meaning of the prayer in the phrase "Dhiyo Yo Nah Prachodayat" at the conclusion of the Gayatri Mantra?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"May the Divine illuminate and inspire our intellect with wisdom and righteous thoughts"',
      '"May the Divine grant us heaps of gold and silver coins"',
      '"May our enemies be driven away from our lands"',
      '"May the rain fall only during the night"'
    ],
    correctAnswer: '"May the Divine illuminate and inspire our intellect with wisdom and righteous thoughts"',
    explanation: '"Dhiyo" means intellect/understanding, and "Prachodayat" means awaken or illuminate. The chanter asks that our collective intellect be guided toward truth and noble actions.',
    socraticHint: 'What faculty of the mind—the intellect and wisdom—is being asked to be illuminated?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-007',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'Notice that the Gayatri Mantra prays "Dhiyo Yo NAH Prachodayat" (inspire OUR intellect). What does using the plural "our" teach children?',
    text: 'Notice that the Gayatri Mantra prays "Dhiyo Yo NAH Prachodayat" (inspire OUR intellect). What does using the plural "our" teach children?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is an unselfish, universal prayer for the enlightenment and wisdom of all humanity, not just for oneself alone',
      'It means you can only pray in a group of ten people',
      'It means animals do not need wisdom',
      'It is a prayer meant only for a single family'
    ],
    correctAnswer: 'It is an unselfish, universal prayer for the enlightenment and wisdom of all humanity, not just for oneself alone',
    explanation: 'The use of "Nah" (our) highlights the universal spirit of Hinduism: praying for the collective illumination, moral upliftment, and wisdom of the entire community.',
    socraticHint: 'Why is praying for "our" intellect instead of "my" intellect a selfless act of universal prayer?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-008',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What physical and mental benefits do Kenyan primary pupils gain from chanting the Gayatri Mantra before beginning morning studies?',
    text: 'What physical and mental benefits do Kenyan primary pupils gain from chanting the Gayatri Mantra before beginning morning studies?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Enhanced concentration, improved memory retention, reduced anxiety, and mental clarity for academic learning',
      'Instant ability to pass tests without studying',
      'Exemption from doing homework',
      'Physical growth of several centimeters in height'
    ],
    correctAnswer: 'Enhanced concentration, improved memory retention, reduced anxiety, and mental clarity for academic learning',
    explanation: 'Rhythmic chanting stabilizes breathing, activates the parasympathetic nervous system, improves auditory attention, and focuses the mind for academic success.',
    socraticHint: 'How does calming the breath and focusing on sacred sound improve focus and learning capacity?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-009',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'At what times of the day (known as Sandhya) is the chanting of the Gayatri Mantra traditionally performed?',
    text: 'At what times of the day (known as Sandhya) is the chanting of the Gayatri Mantra traditionally performed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'At dawn (sunrise), midday (noon), and dusk (sunset)',
      'Only at midnight during full moon',
      'Only during heavy rainfall storms',
      'Once a year on New Year\'s Day'
    ],
    correctAnswer: 'At dawn (sunrise), midday (noon), and dusk (sunset)',
    explanation: 'The three junctures of the day (Trisandhya)—dawn, midday, and twilight—are considered naturally peaceful times for spiritual attunement and Gayatri meditation.',
    socraticHint: 'Which three natural transition times—dawn, noon, and dusk—are ideal for Sandhya prayer?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-010',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What sacred string ceremony initiates a Hindu youth into the formal study of scriptures and the Gayatri Mantra?',
    text: 'What sacred string ceremony initiates a Hindu youth into the formal study of scriptures and the Gayatri Mantra?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Upanayana (or Yajnopavita / Janeu ceremony)',
      'Namakarana',
      'Vivaha',
      'Antyeshti'
    ],
    correctAnswer: 'Upanayana (or Yajnopavita / Janeu ceremony)',
    explanation: 'Upanayana is the sacred initiation into student life where the youth is invested with the sacred thread (Yajnopavita) and taught the Gayatri Mantra by the Guru.',
    socraticHint: 'Which Samskara ceremony marks the beginning of formal spiritual education with the sacred thread?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-011',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What does the Vyahriti portion ("Om Bhur Bhuvas Svah") of the Gayatri Mantra represent?',
    text: 'What does the Vyahriti portion ("Om Bhur Bhuvas Svah") of the Gayatri Mantra represent?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The three cosmic planes of existence: the physical earth (Bhur), the atmosphere/subtle realm (Bhuvas), and the celestial heavens (Svah)',
      'Three different rivers in Northern India',
      'Three ancient musical instruments',
      'Three seasons of the year'
    ],
    correctAnswer: 'The three cosmic planes of existence: the physical earth (Bhur), the atmosphere/subtle realm (Bhuvas), and the celestial heavens (Svah)',
    explanation: 'The Mahavyahritis acknowledge God\'s presence across all three realms: Bhur (earthly realm), Bhuvas (intermediate atmospheric realm), and Svah (heavenly realm).',
    socraticHint: 'What three cosmic levels of Earth, Atmosphere, and Heaven are represented by Bhur, Bhuvas, and Svah?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-012',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'Why should a pupil sit in an upright, relaxed posture with a straight spine while chanting mantras?',
    text: 'Why should a pupil sit in an upright, relaxed posture with a straight spine while chanting mantras?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It allows smooth, deep diaphragmatic breathing, promotes alert mental focus, and prevents sleepiness during meditation',
      'It is a mandatory physical penalty for arriving late',
      'It makes the chanter taller than their classmates',
      'It prevents the voice from being heard by others'
    ],
    correctAnswer: 'It allows smooth, deep diaphragmatic breathing, promotes alert mental focus, and prevents sleepiness during meditation',
    explanation: 'An erect spine aligns the respiratory system, enables unrestricted airflow and vocal vibration, and maintains an alert, peaceful mind free of drowsiness.',
    socraticHint: 'How does sitting with a straight back help you breathe easily and stay mentally alert during prayer?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },

  // --- Unit 6 Lesson 2: Chants of Universal Peace (Shanti) Trial (q-g5-hre-u6-013 to 024) ---
  {
    id: 'q-g5-hre-u6-013',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'Why is the word "Shanti" (Peace) chanted three times at the conclusion of Hindu prayers and mantras?',
    text: 'Why is the word "Shanti" (Peace) chanted three times at the conclusion of Hindu prayers and mantras?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To pray for peace across three dimensions: peace from natural forces (Adhidevika), peace with fellow living beings (Adhibhautika), and inner peace within oneself (Adhyatmika)',
      'Because the number three is an unlucky number in mathematics',
      'To ensure that people in three different cities can hear the voice',
      'Because one chant is too quiet'
    ],
    correctAnswer: 'To pray for peace across three dimensions: peace from natural forces (Adhidevika), peace with fellow living beings (Adhibhautika), and inner peace within oneself (Adhyatmika)',
    explanation: 'The threefold Shanti addresses the three sources of human suffering: natural disasters/cosmic forces, social conflicts/surroundings, and personal mental/physical ailments.',
    socraticHint: 'Which three realms of suffering are covered: natural forces, other living beings, and internal self?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-014',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What does "Adhyatmika Shanti" specifically refer to?',
    text: 'What does "Adhyatmika Shanti" specifically refer to?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Peace within one\'s own body, mind, and spirit—free from mental agitation, greed, anger, and illness',
      'Peace with wild animals in national parks',
      'Peace between foreign trading nations',
      'Peace during volcanic eruptions'
    ],
    correctAnswer: 'Peace within one\'s own body, mind, and spirit—free from mental agitation, greed, anger, and illness',
    explanation: 'Adhyatmika refers to the internal personal realm: emotional calm, freedom from mental distress, mental equilibrium, and bodily health.',
    socraticHint: 'Which realm of peace deals with your own inner thoughts, emotions, and physical well-being?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-015',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What is "Adhibhautika Shanti"?',
    text: 'What is "Adhibhautika Shanti"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Peace in relationship with fellow human beings, neighbors, classmates, and all living creatures in society',
      'Peace in the planetary orbit of Jupiter',
      'Peace from earthquakes and lightning strikes',
      'Peace when sleeping without dreams'
    ],
    correctAnswer: 'Peace in relationship with fellow human beings, neighbors, classmates, and all living creatures in society',
    explanation: 'Adhibhautika refers to the social and physical environment: harmony with neighbors, family members, animals, and avoidance of strife with others.',
    socraticHint: 'Which realm of peace relates to living harmoniously with people and animals in your daily environment?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-016',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What is "Adhidevika Shanti"?',
    text: 'What is "Adhidevika Shanti"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Peace from cosmic disturbances and natural calamities such as floods, severe droughts, earthquakes, and lightning',
      'Peace when eating dinner at home',
      'Peace when solving mathematics homework',
      'Peace during a school football match'
    ],
    correctAnswer: 'Peace from cosmic disturbances and natural calamities such as floods, severe droughts, earthquakes, and lightning',
    explanation: 'Adhidevika refers to forces beyond human control: cosmic forces, weather extremes, natural disasters, and ecological disruptions.',
    socraticHint: 'Which realm of peace prays for protection against natural disasters like droughts and floods?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-017',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'In the universal Shanti Mantra from the Yajurveda, what natural elements are specifically prayed for to abide in peace?',
    text: 'In the universal Shanti Mantra from the Yajurveda, what natural elements are specifically prayed for to abide in peace?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The sky/heavens (Dyauh), the atmosphere (Antariksham), the earth (Prithivi), waters (Apah), medicinal herbs (Oshadhayah), and trees/vegetation (Vanaspatayah)',
      'Only gold mines, diamond mines, and royal treasuries',
      'Motor vehicles, paved highways, and airplanes',
      'Concrete buildings, sports stadiums, and shopping malls'
    ],
    correctAnswer: 'The sky/heavens (Dyauh), the atmosphere (Antariksham), the earth (Prithivi), waters (Apah), medicinal herbs (Oshadhayah), and trees/vegetation (Vanaspatayah)',
    explanation: 'The Vedic peace chant is profoundly ecological: it prays for peace and harmony in the sky, atmosphere, earth, waters, medicinal plants, and forests.',
    socraticHint: 'Look for the natural elements of sky, atmosphere, earth, waters, herbs, and trees.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-018',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What famous Sanskrit prayer begins with "Sarve Bhavantu Sukhinah" and asks for happiness for all creation?',
    text: 'What famous Sanskrit prayer begins with "Sarve Bhavantu Sukhinah" and asks for happiness for all creation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"May all beings be happy, may all be free from illness, may all see what is auspicious, and may no one suffer sorrow"',
      '"May our team win all sports matches in the county"',
      '"May rain fall only on our own farm and not on others"',
      '"May we become wealthier than all our neighbors"'
    ],
    correctAnswer: '"May all beings be happy, may all be free from illness, may all see what is auspicious, and may no one suffer sorrow"',
    explanation: '"Sarve bhavantu sukhinah, sarve santu niramayah..." is a universal prayer encompassing all living creatures across the world, wishing universal wellness, health, and joy.',
    socraticHint: 'Which prayer translates as "May all be happy, may all be free from disease, may all perceive good"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-019',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What does the prayer "Om Sahana Vavatu" recited between teacher and student in the Taittiriya Upanishad ask for?',
    text: 'What does the prayer "Om Sahana Vavatu" recited between teacher and student in the Taittiriya Upanishad ask for?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mutual protection, shared nourishment in knowledge, energetic cooperation in study, brilliant intellect, and absence of animosity between teacher and learner',
      'That the teacher should never give tests or grades',
      'That students should leave school at midday',
      'That only the student speaks and the teacher remains silent'
    ],
    correctAnswer: 'Mutual protection, shared nourishment in knowledge, energetic cooperation in study, brilliant intellect, and absence of animosity between teacher and learner',
    explanation: '"Sahana vavatu, sahanau bhunaktu..." asks that teacher and pupil study together with vigor, that their learning be radiant (tejasvi), and that they never harbor ill-will (ma vidvishavahai).',
    socraticHint: 'How does this prayer establish mutual respect, cooperation, and positive energy between teachers and learners?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-020',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'How does reciting "Om Sahana Vavatu" before a lesson foster a safe, positive classroom environment in Kenyan primary schools?',
    text: 'How does reciting "Om Sahana Vavatu" before a lesson foster a safe, positive classroom environment in Kenyan primary schools?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It creates an atmosphere of mutual trust, shared commitment to excellence, respect between pupils and teachers, and freedom from hostility',
      'It excuses pupils from completing arithmetic exercises',
      'It allows students to shout during lessons',
      'It prevents teachers from correcting student mistakes'
    ],
    correctAnswer: 'It creates an atmosphere of mutual trust, shared commitment to excellence, respect between pupils and teachers, and freedom from hostility',
    explanation: 'The prayer unites teachers and students in a shared sacred quest for knowledge, establishing mutual affection, safety, and enthusiastic learning in school.',
    socraticHint: 'How does committing to learn together without hostility build trust and respect in the classroom?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-021',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'Why does Hindu prayer teach that human beings cannot enjoy true personal peace while the surrounding environment is polluted or destroyed?',
    text: 'Why does Hindu prayer teach that human beings cannot enjoy true personal peace while the surrounding environment is polluted or destroyed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because all creation is deeply interconnected; when waters are polluted, forests burned, and wildlife harmed, human health, climate stability, and peace suffer directly',
      'Because nature has no connection to human life',
      'Because humans can easily survive without fresh air or water',
      'Because trees complain loudly when they are cut down'
    ],
    correctAnswer: 'Because all creation is deeply interconnected; when waters are polluted, forests burned, and wildlife harmed, human health, climate stability, and peace suffer directly',
    explanation: 'The Shanti Mantra recognizes cosmic interdependence: when the environment is degraded, ecological imbalance inevitably spills over into human diseases, droughts, and conflicts.',
    socraticHint: 'How does environmental degradation directly destroy human health, agriculture, and social peace?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-022',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'In national interfaith forums in Nairobi, why is the Shanti Mantra appreciated by Kenyan religious leaders of all backgrounds?',
    text: 'In national interfaith forums in Nairobi, why is the Shanti Mantra appreciated by Kenyan religious leaders of all backgrounds?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because its universal message of peace for all nations, peoples, waters, and nature transcends sectarian divisions and promotes national cohesion and stewardship',
      'Because it is chanted only in complete darkness',
      'Because it demands that all citizens adopt one political party',
      'Because it takes only two seconds to recite'
    ],
    correctAnswer: 'Because its universal message of peace for all nations, peoples, waters, and nature transcends sectarian divisions and promotes national cohesion and stewardship',
    explanation: 'The universal peace prayer appeals to all people of conscience because it prays unconditionally for the welfare of the Earth, climate, vegetation, and all humanity without bias.',
    socraticHint: 'How does praying for peace for the entire planet and all human beings inspire leaders of every faith?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-023',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'What should be the inner mental attitude of a Grade 5 pupil while saying "Shantih, Shantih, Shantih"?',
    text: 'What should be the inner mental attitude of a Grade 5 pupil while saying "Shantih, Shantih, Shantih"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Feeling sincere compassion, releasing anger and grudges, wishing genuine well-being to all classmates, and cultivating calm inner serenity',
      'Planning how to tease another student after assembly',
      'Thinking about how fast to run to the school canteen',
      'Feeling angry about a test question'
    ],
    correctAnswer: 'Feeling sincere compassion, releasing anger and grudges, wishing genuine well-being to all classmates, and cultivating calm inner serenity',
    explanation: 'A prayer for peace must be felt within the heart: releasing resentment, forgiving others, and letting genuine goodwill radiate toward all living beings.',
    socraticHint: 'What heart-centered feelings of forgiveness and compassion should accompany words of peace?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  },
  {
    id: 'q-g5-hre-u6-024',
    subStrandId: 'substrand-g5-hre-u6',
    prompt: 'How does daily recitation of universal prayers shape a pupil into a patriotic and peaceful Kenyan citizen?',
    text: 'How does daily recitation of universal prayers shape a pupil into a patriotic and peaceful Kenyan citizen?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It nurtures an unselfish conscience, instills active respect for all communities and nature, and inspires dedicated service to national peace and development',
      'It isolates the learner from modern civic responsibilities',
      'It discourages pupils from making friends outside their own clan',
      'It teaches that only one group in Kenya deserves prosperity'
    ],
    correctAnswer: 'It nurtures an unselfish conscience, instills active respect for all communities and nature, and inspires dedicated service to national peace and development',
    explanation: 'Universal prayers mold children who reject selfishness and bigotry, inspiring them to be peacemakers, ecological stewards, and devoted contributors to a united Kenya.',
    socraticHint: 'How do universal prayers of peace and wisdom build open-minded, compassionate Kenyan citizens?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U6'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 3 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
