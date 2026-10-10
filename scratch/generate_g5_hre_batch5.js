import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 HRE Batch 5 (Units 9 & 10) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-hre-u9',
    strandId: 'strand-g5-hre-virtues',
    learningAreaId: 'la-hre-g5',
    title: 'Family Devotion, Guru Vandana, and Sewa (Selfless Community Service)',
    description: 'Exploring family values, spiritual mentorship, and selfless community action: The sacred bond of family unity and reverence for parents and grandparents (Kula Dharma); Guru Vandana (expressing deep reverence to spiritual and academic mentors); the principle of Sewa (selfless service without expectation of reward / Nishkama Karma); various forms of Sewa: Tan (physical service), Man (mental/emotional comfort and prayer), and Dhan (charitable sharing of financial resources); and the inspiring history of Hindu community Sewa in Kenya (founding hospitals, schools, famine relief, eye clinics, and tree nurseries).',
    cbeCompetency: 'Filial piety, mentor appreciation, civic engagement, altruistic volunteerism, and social responsibility',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g5-hre-u10',
    strandId: 'strand-g5-hre-festivals',
    learningAreaId: 'la-hre-g5',
    title: 'Sacred Festivals, Cultural Heritage, and National Coexistence in Kenya',
    description: 'Celebrating major Hindu festivals and active participation in Kenyan nation-building: 1) Navratri (celebrating nine nights of divine feminine energy / Shakti, triumph of righteousness over Mahishasura, and joyful Garba/Dandiya folk dances); 2) Maha Shivratri (the night of Lord Shiva: meditation, fasting, self-discipline, and conquering negative impulses); 3) Guru Purnima (honoring Sage Vyasa and all educators who dispel ignorance); and 4) Peaceful coexistence, interfaith collaboration with Christian, Muslim, and indigenous Kenyan citizens, environmental stewardship, and anti-corruption integrity in nation-building.',
    cbeCompetency: 'Cultural appreciation, interfaith harmony, festival literacy, national patriotism, and civic integrity',
    estimatedMinutes: 30,
    order: 10
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 5 Lessons (Units 9 & 10: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-hre-u9-l1',
    subStrandId: 'substrand-g5-hre-u9',
    title: 'Family Devotion (Kula Dharma) and Guru Vandana (Reverence for Mentors)',
    content: 'In Hindu culture, the family is the first school of virtues (Samskaras), and the home is regarded as a sacred temple. Kula Dharma emphasizes unity, mutual respect, and selfless love among generations: children revere their parents, cherish their grandparents, and support their siblings. When young people touch the feet of elders (Charan Sparsh) and receive their blessings (Ashirwad), they practice humility and acknowledge the wisdom of those who came before them. Alongside family, Hindu tradition places supreme honor on the teacher through "Guru Vandana". The word "Guru" means "dispeller of darkness" ("Gu" = darkness of ignorance, "Ru" = light of knowledge). The famous prayer declares: "Gurur Brahma, Gurur Vishnur, Gurur Devo Maheshwarah; Gurur Sakshat Parabrahma, Tasmai Shri Gurave Namah" (The Guru represents the creative, sustaining, and transformative wisdom of the Divine). Respecting teachers in school means listening attentively, doing assignments diligently, speaking courteously, and expressing sincere gratitude for their guidance.',
    didYouKnow: 'The custom of Charan Sparsh (touching the feet of elders) is believed to connect the positive energy and blessings of the elder directly to the receptive learner!',
    kenyanContext: 'At SSDN Temple in Nairobi and Hindu Union in Mombasa, children observe Guru Vandana Day by presenting handmade greeting cards and fresh flowers to their school teachers, honoring their role in molding future Kenyan leaders.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u9-l2',
    subStrandId: 'substrand-g5-hre-u9',
    title: 'The Spirit of Sewa: Selfless Service and Philanthropy in Kenya',
    content: 'Sewa is selfless service performed with pure love without expecting any personal praise, financial reward, or prestige (Nishkama Karma). The Bhagavad Gita (2:47) teaches: "Karmanye vadhikaraste ma phaleshu kadachana" (Your right is to perform your duty, but never to the fruits of action). Sewa is practiced in three practical forms: 1) Tan ki Sewa: physical service using bodily strength, such as cleaning the school compound, clearing trash from roads, serving food in community kitchens, or planting trees; 2) Man ki Sewa: mental and emotional service through encouraging words, comforting lonely elders, praying for the sick, and sharing knowledge; 3) Dhan ki Sewa: charitable sharing of financial wealth and material resources to build schools, boreholes, hospitals, and disaster relief funds. In Kenya, the Hindu community has a proud centennial history of practicing Sewa: establishing charitable institutions such as the M.P. Shah Hospital, Guru Nanak Hospital, free eye cataract surgical camps, drilling clean water boreholes in arid counties, and sponsoring school bursaries for vulnerable children across all ethnic groups.',
    didYouKnow: 'Mahatma Gandhi said: "The best way to find yourself is to lose yourself in the service of others," summarizing the heart of Sewa!',
    kenyanContext: 'During prolonged droughts in Turkana and Marsabit, the Hindu Council of Kenya coordinates nationwide food relief convoys carrying maize flour, beans, and cooking oil to pastoral families, exemplifying Nishkama Sewa.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u10-l1',
    subStrandId: 'substrand-g5-hre-u10',
    title: 'Sacred Festivals of Renewal: Navratri, Maha Shivratri, and Guru Purnima',
    content: 'Hindu festivals are vibrant celebrations of spiritual renewal, moral victory, and community harmony: 1) Navratri ("Nine Nights"): dedicated to the divine feminine power (Shakti / Devi Durga). It celebrates the triumph of righteousness and courage over the demonic buffalo Mahishasura. Families gather in vibrant traditional dress to perform the graceful folk dances of Garba and Dandiya Raas, moving in concentric circles around a central lamp representing the divine spark at the center of the universe; 2) Maha Shivratri ("The Great Night of Shiva"): a sacred festival of deep meditation, fasting, and self-reflection. Devotees stay awake through the night offering Bilva leaves, milk, and water to the Shiva Lingam, chanting "Om Namah Shivaya" to quiet mental restlessness, overcome anger, and seek inner peace; 3) Guru Purnima: celebrated on the full moon of Ashadha, commemorating the birth of Sage Veda Vyasa who compiled the Vedas. On this day, learners honor their academic teachers and spiritual mentors with flowers, thanksgiving prayers, and pledges of academic dedication.',
    didYouKnow: 'During Navratri, the Garba dance circles revolve continuously in counter-clockwise motion, symbolizing the cyclical nature of time from birth to transformation around the unchanging Divine center!',
    kenyanContext: 'In Nairobi, Mombasa, Kisumu, and Nakuru, Navratri Garba nights bring together thousands of Kenyan youths and families in brightly colored outfits, welcoming visitors of all backgrounds to enjoy Indian vegetarian street food and music.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u10-l2',
    subStrandId: 'substrand-g5-hre-u10',
    title: 'Living in Harmony: Interfaith Cooperation and Kenyan Nation Building',
    content: 'Kenya is a vibrant multi-ethnic and multi-religious democracy where Christians, Muslims, Hindus, and traditional believers live as equal citizens under one national flag. Hindu teachings emphasize universal tolerance and mutual respect: "Vasudhaiva Kutumbakam" (the world is one family) and "Ekam Sat Vipra Bahudha Vadanti" (Truth is one, the wise express it in diverse ways). Hindu Kenyans contribute actively to nation-building through: 1) Interfaith dialogue: working harmoniously with Christian and Muslim leaders through the Inter-Religious Council of Kenya (IRCK) to resolve community disputes and preach peace; 2) Economic development: establishing ethical businesses, manufacturing industries, and trade that create jobs for thousands of Kenyans; 3) Environmental stewardship: participating enthusiastically in Kenya\'s national greening campaigns, planting trees, and cleaning rivers; 4) Anti-corruption integrity: living by the values of Satya (truth) and Asteya (non-stealing), rejecting bribery (Rashwah) and tribal nepotism. Grade 5 learners are called to be patriotic, ethical leaders who build a prosperous, peaceful, and united Kenya.',
    didYouKnow: 'The Hindu community was formally recognized as the 44th official tribe/community of Kenya by presidential proclamation in July 2017, acknowledging over a century of civic contribution to the nation!',
    kenyanContext: 'On national holidays like Jamhuri Day and Mashujaa Day, Hindu community leaders join government officials and leaders of all faiths at Nyayo National Stadium, standing together in patriotism and shared dedication to Kenya.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 5 Missions (Units 9 & 10: 4 Missions, orders 105–108)
const missionsToAdd = [
  {
    id: 'mission-g5-hre-u9-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u9',
    lessonId: 'lesson-g5-hre-u9-l1',
    title: 'Kula Dharma and Guru Vandana Quest',
    description: 'Honor family unity and seek elders\' blessings through Charan Sparsh, and pay heartfelt tribute to teachers who dispel ignorance through Guru Vandana!',
    order: 105,
    orderIndex: 105,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-kula-dharma',
    badge: {
      name: 'Pillar of Kula Dharma',
      icon: 'users'
    },
    questionIds: [
      'q-g5-hre-u9-001',
      'q-g5-hre-u9-002',
      'q-g5-hre-u9-003',
      'q-g5-hre-u9-004',
      'q-g5-hre-u9-005',
      'q-g5-hre-u9-006',
      'q-g5-hre-u9-007',
      'q-g5-hre-u9-008',
      'q-g5-hre-u9-009',
      'q-g5-hre-u9-010',
      'q-g5-hre-u9-011',
      'q-g5-hre-u9-012'
    ]
  },
  {
    id: 'mission-g5-hre-u9-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u9',
    lessonId: 'lesson-g5-hre-u9-l2',
    title: 'Champions of Kenyan Community Sewa Quest',
    description: 'Put selfless service into action through Tan, Man, and Dhan, and trace the inspiring humanitarian legacy of Hindu medical and relief Sewa across Kenya!',
    order: 106,
    orderIndex: 106,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-sewa-champion',
    badge: {
      name: 'Sewa Champion',
      icon: 'heart'
    },
    questionIds: [
      'q-g5-hre-u9-013',
      'q-g5-hre-u9-014',
      'q-g5-hre-u9-015',
      'q-g5-hre-u9-016',
      'q-g5-hre-u9-017',
      'q-g5-hre-u9-018',
      'q-g5-hre-u9-019',
      'q-g5-hre-u9-020',
      'q-g5-hre-u9-021',
      'q-g5-hre-u9-022',
      'q-g5-hre-u9-023',
      'q-g5-hre-u9-024'
    ]
  },
  {
    id: 'mission-g5-hre-u10-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u10',
    lessonId: 'lesson-g5-hre-u10-l1',
    title: 'Festivals of Divine Radiance Quest',
    description: 'Celebrate the nine vibrant nights of Navratri Garba, experience the silent meditative peace of Maha Shivratri, and honor mentors on Guru Purnima!',
    order: 107,
    orderIndex: 107,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-festival-radiance',
    badge: {
      name: 'Festival of Light',
      icon: 'sparkles'
    },
    questionIds: [
      'q-g5-hre-u10-001',
      'q-g5-hre-u10-002',
      'q-g5-hre-u10-003',
      'q-g5-hre-u10-004',
      'q-g5-hre-u10-005',
      'q-g5-hre-u10-006',
      'q-g5-hre-u10-007',
      'q-g5-hre-u10-008',
      'q-g5-hre-u10-009',
      'q-g5-hre-u10-010',
      'q-g5-hre-u10-011',
      'q-g5-hre-u10-012'
    ]
  },
  {
    id: 'mission-g5-hre-u10-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u10',
    lessonId: 'lesson-g5-hre-u10-l2',
    title: 'National Coexistence and Kenyan Harmony Quest',
    description: 'Stand as a patriotic ambassador of interfaith harmony, plant trees for Kenya’s future, defeat corruption with integrity, and build a unified nation!',
    order: 108,
    orderIndex: 108,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-kenya-patriot',
    badge: {
      name: 'Kenyan Coexistence Ambassador',
      icon: 'flag'
    },
    questionIds: [
      'q-g5-hre-u10-013',
      'q-g5-hre-u10-014',
      'q-g5-hre-u10-015',
      'q-g5-hre-u10-016',
      'q-g5-hre-u10-017',
      'q-g5-hre-u10-018',
      'q-g5-hre-u10-019',
      'q-g5-hre-u10-020',
      'q-g5-hre-u10-021',
      'q-g5-hre-u10-022',
      'q-g5-hre-u10-023',
      'q-g5-hre-u10-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 5 Questions (Units 9 & 10: 48 Questions total)
const questionsToAdd = [
  // --- Unit 9 Lesson 1: Kula Dharma and Guru Vandana Quest (q-g5-hre-u9-001 to 012) ---
  {
    id: 'q-g5-hre-u9-001',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What does the term "Kula Dharma" refer to in Hindu culture and social life?',
    text: 'What does the term "Kula Dharma" refer to in Hindu culture and social life?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The sacred moral duties, traditions, mutual respect, and family harmony governing a household',
      'A method of calculating market prices for groceries',
      'The rules for playing classical flute in a concert',
      'The laws of sailing ships across international oceans'
    ],
    correctAnswer: 'The sacred moral duties, traditions, mutual respect, and family harmony governing a household',
    explanation: '"Kula" means family/lineage, and "Dharma" means duty and righteousness. Kula Dharma teaches family solidarity, respect for elders, and nurturing children with love and noble values.',
    socraticHint: 'Which compound term refers to righteous duties (Dharma) centered on the family (Kula)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-002',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What traditional act of respect involves bowing down and touching the feet of parents, grandparents, and teachers?',
    text: 'What traditional act of respect involves bowing down and touching the feet of parents, grandparents, and teachers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Charan Sparsh (or Pada Sparsha)',
      'Aarti',
      'Pradakshina',
      'Havan'
    ],
    correctAnswer: 'Charan Sparsh (or Pada Sparsha)',
    explanation: '"Charan" means feet and "Sparsh" means touching. Touching the feet of elders demonstrates humility, removes ego, and invites their heartfelt blessings (Ashirwad).',
    socraticHint: 'Which Sanskrit phrase literally translates to "touching the feet (Charan)" of elders?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-003',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What is the literal meaning of the syllables "Gu" and "Ru" in the sacred word "Guru"?',
    text: 'What is the literal meaning of the syllables "Gu" and "Ru" in the sacred word "Guru"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Gu" means the darkness of ignorance, and "Ru" means the light of spiritual knowledge and wisdom',
      '"Gu" means gold, and "Ru" means silver',
      '"Gu" means talking, and "Ru" means listening',
      '"Gu" means morning, and "Ru" means evening'
    ],
    correctAnswer: '"Gu" means the darkness of ignorance, and "Ru" means the light of spiritual knowledge and wisdom',
    explanation: 'The Guru Gita explains: "Gu-karo hyandhakarashcha, ru-karas tanni-vartakah" ("Gu" represents darkness and "Ru" represents that which dispels it). A Guru leads us from ignorance to light.',
    socraticHint: 'Which word breakdown identifies the Guru as the dispeller of darkness and bringer of light?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-004',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'In the classic Guru Stotram, how is the Guru revered in relation to the cosmic deities?',
    text: 'In the classic Guru Stotram, how is the Guru revered in relation to the cosmic deities?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Gurur Brahma, Gurur Vishnu, Gurur Devo Maheshwara" (The Guru personifies the creative, sustaining, and transformative wisdom of the Divine)',
      'The Guru is described as a warrior king of ancient times',
      'The Guru is described as a merchant trading spices',
      'The Guru is seen only as an ordinary friend'
    ],
    correctAnswer: '"Gurur Brahma, Gurur Vishnu, Gurur Devo Maheshwara" (The Guru personifies the creative, sustaining, and transformative wisdom of the Divine)',
    explanation: 'The prayer honors the Guru as the embodiment of Brahma (creator of wisdom), Vishnu (sustainer of intellect), and Shiva (transformer who eliminates ignorance).',
    socraticHint: 'Which prayer begins with "Gurur Brahma, Gurur Vishnur, Gurur Devo Maheshwarah"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-005',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'How does a Grade 5 pupil demonstrate authentic Guru Vandana (reverence for teachers) in their school classroom?',
    text: 'How does a Grade 5 pupil demonstrate authentic Guru Vandana (reverence for teachers) in their school classroom?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By arriving on time, listening attentively without disruption, completing assignments diligently, and speaking to teachers with courteous respect',
      'By arguing with the teacher whenever they are corrected',
      'By hiding their notebooks and refusing to take notes',
      'By leaving the classroom without permission'
    ],
    correctAnswer: 'By arriving on time, listening attentively without disruption, completing assignments diligently, and speaking to teachers with courteous respect',
    explanation: 'True reverence for a teacher is demonstrated through conduct: punctuality, diligent study, active listening, and respectful interaction in and out of class.',
    socraticHint: 'Which respectful learning behaviors in the classroom demonstrate genuine reverence for a teacher?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-006',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'Who was Aruni of Panchala in the Mahabharata, and what legendary devotion to his Guru Sage Dhaumya did he display?',
    text: 'Who was Aruni of Panchala in the Mahabharata, and what legendary devotion to his Guru Sage Dhaumya did he display?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He lay down his own body in a broken water dike during a storm to prevent floodwaters from destroying his Guru\'s agricultural fields',
      'He brought a chest of gold coins to his teacher',
      'He composed a long epic poem overnight',
      'He built a large wooden chariot for the ashram'
    ],
    correctAnswer: 'He lay down his own body in a broken water dike during a storm to prevent floodwaters from destroying his Guru\'s agricultural fields',
    explanation: 'When a dike broke threatening the crops, young Aruni could not stop the gushing water with mud, so he lay down in the breach for hours until the Guru found and blessed him.',
    socraticHint: 'Which student lay down across the breached canal in the rain to protect his Guru\'s farm fields?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-007',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'How does caring for elderly grandparents at home demonstrate the living practice of Kula Dharma?',
    text: 'How does caring for elderly grandparents at home demonstrate the living practice of Kula Dharma?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It honors their lifelong sacrifices, provides comfort, medicine, and companionship in their frail years, and preserves family continuity and blessings',
      'It allows children to avoid studying for exams',
      'It is done only to ask for pocket money',
      'It replaces the need to attend school'
    ],
    correctAnswer: 'It honors their lifelong sacrifices, provides comfort, medicine, and companionship in their frail years, and preserves family continuity and blessings',
    explanation: 'Grandparents are living anchors of wisdom and cultural heritage; serving them with patience, fetching water or food, and listening to their stories upholds family duty.',
    socraticHint: 'How does spending time with and helping frail grandparents honor our family roots and heritage?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-008',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What role does the sacred festival of Raksha Bandhan play in upholding Kula Dharma (family devotion)?',
    text: 'What role does the sacred festival of Raksha Bandhan play in upholding Kula Dharma (family devotion)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sisters tie a sacred thread (Rakhi) on their brothers\' wrists wishing them protection and success, while brothers pledge lifelong support and care for their sisters',
      'Family members engage in physical wrestling matches',
      'Brothers move away to live in different towns',
      'Sisters sell their toys to buy expensive jewelry'
    ],
    correctAnswer: 'Sisters tie a sacred thread (Rakhi) on their brothers\' wrists wishing them protection and success, while brothers pledge lifelong support and care for their sisters',
    explanation: 'Raksha Bandhan ("the bond of protection") celebrates pure sibling love and mutual protection, renewing family bonds across generations.',
    socraticHint: 'Which festival features the tying of a sacred decorative thread (Rakhi) between sisters and brothers?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-009',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'Why is an open, honest relationship between parents and children vital for emotional well-being according to Hindu family values?',
    text: 'Why is an open, honest relationship between parents and children vital for emotional well-being according to Hindu family values?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It builds trust and emotional security, allowing children to discuss school challenges and feelings without fear, guiding them on the righteous path',
      'It ensures children never have to do any household chores',
      'It means parents should never guide or correct their children',
      'It allows children to keep secrets about everything they do'
    ],
    correctAnswer: 'It builds trust and emotional security, allowing children to discuss school challenges and feelings without fear, guiding them on the righteous path',
    explanation: 'A harmonious family environment built on truth, mutual respect, and warmth shields children from negative peer pressures and nurtures emotional resilience.',
    socraticHint: 'How does honest, loving communication between parents and children create a safe and happy home?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-010',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'In Nairobi, how do Grade 5 learners celebrate Guru Vandana Day at temples and schools?',
    text: 'In Nairobi, how do Grade 5 learners celebrate Guru Vandana Day at temples and schools?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By inviting their academic school teachers, presenting flowers and handmade cards, reciting prayers of thanksgiving, and serving them refreshments',
      'By challenging teachers to an exam competition',
      'By refusing to do homework for a week',
      'By leaving school early to watch movies'
    ],
    correctAnswer: 'By inviting their academic school teachers, presenting flowers and handmade cards, reciting prayers of thanksgiving, and serving them refreshments',
    explanation: 'Pupils actively honor educators by preparing cultural programs, presenting garlands or flowers, and expressing gratitude for their selfless dedication.',
    socraticHint: 'What special gestures of appreciation—cards, flowers, and thanksgiving songs—do students offer their teachers on Guru Vandana Day?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-011',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What did the great sage Adi Shankaracharya teach regarding the importance of a true Guru in human life?',
    text: 'What did the great sage Adi Shankaracharya teach regarding the importance of a true Guru in human life?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Even if a person possesses great wealth, fame, health, and family, if their mind is not anchored at the lotus feet of the Guru, all worldly success is in vain',
      'A person can achieve all knowledge without any guidance',
      'Only books matter and human teachers are not needed',
      'One should change teachers every week'
    ],
    correctAnswer: 'Even if a person possesses great wealth, fame, health, and family, if their mind is not anchored at the lotus feet of the Guru, all worldly success is in vain',
    explanation: 'In the Guru Ashtakam, Adi Shankaracharya repeats: "Tatah kim, tatah kim, tatah kim, tatah kim" (What then? What then?), showing worldly achievements lack true fulfillment without spiritual wisdom.',
    socraticHint: 'Can worldly wealth and fame bring true spiritual peace without the guiding light of a wise teacher?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-012',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'How does practicing Kula Dharma and Guru Vandana mold young pupils into disciplined, ethical citizens of Kenya?',
    text: 'How does practicing Kula Dharma and Guru Vandana mold young pupils into disciplined, ethical citizens of Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It instills deep humility, reverence for wisdom, gratitude for guidance, and lifelong respect for authority and civic community',
      'It makes learners arrogant and boastful',
      'It discourages pupils from pursuing modern careers',
      'It limits friendships to one\'s immediate relatives only'
    ],
    correctAnswer: 'It instills deep humility, reverence for wisdom, gratitude for guidance, and lifelong respect for authority and civic community',
    explanation: 'Respect for family and teachers builds the foundation of civil society: creating law-abiding, humble, and hardworking leaders who value mentorship and social cohesion.',
    socraticHint: 'How does learning respect and gratitude at home and in school build responsible, law-abiding citizens?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },

  // --- Unit 9 Lesson 2: Champions of Kenyan Community Sewa Quest (q-g5-hre-u9-013 to 024) ---
  {
    id: 'q-g5-hre-u9-013',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What does the concept of "Sewa" mean in Hindu spiritual and moral philosophy?',
    text: 'What does the concept of "Sewa" mean in Hindu spiritual and moral philosophy?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Selfless service performed with love and humility without expecting praise, reward, or personal gain',
      'Paid commercial employment in an office',
      'Borrowing money from a bank with interest',
      'Winning a sports championship trophy'
    ],
    correctAnswer: 'Selfless service performed with love and humility without expecting praise, reward, or personal gain',
    explanation: 'Sewa is pure, voluntary, compassionate service done to help others and please the Divine, without calculating personal profit or seeking social recognition.',
    socraticHint: 'Which term means selfless voluntary service (Sewa) done without seeking personal reward?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-014',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What are the three practical categories of Sewa through which a person can serve society?',
    text: 'What are the three practical categories of Sewa through which a person can serve society?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Tan (Physical bodily service), Man (Mental/Emotional comfort and prayer), and Dhan (Material/Financial charity)',
      'Morning, Afternoon, and Night',
      'Gold, Silver, and Bronze',
      'Speaking, Running, and Sleeping'
    ],
    correctAnswer: 'Tan (Physical bodily service), Man (Mental/Emotional comfort and prayer), and Dhan (Material/Financial charity)',
    explanation: 'Sewa encompasses Tan (using our physical body to clean, carry, and build), Man (using our mind for kind words, prayer, and comfort), and Dhan (donating wealth and resources).',
    socraticHint: 'Which three forms of service represent the body (Tan), mind/heart (Man), and wealth (Dhan)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-015',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'Which of the following is an example of "Tan ki Sewa" (physical service) that a Grade 5 pupil can perform at school?',
    text: 'Which of the following is an example of "Tan ki Sewa" (physical service) that a Grade 5 pupil can perform at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sweeping the classroom, picking up plastic litter from the school playing field, or helping carry books for an injured classmate',
      'Giving a large sum of money to the headteacher',
      'Writing an essay about oneself in the school magazine',
      'Sitting in the shade watching others work'
    ],
    correctAnswer: 'Sweeping the classroom, picking up plastic litter from the school playing field, or helping carry books for an injured classmate',
    explanation: 'Tan ki Sewa uses our hands and physical energy to clean, help, organize, and perform practical manual labor for the welfare of others.',
    socraticHint: 'Which action involves using your physical hands and body to clean or help someone in school?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-016',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What is an example of "Man ki Sewa" (mental/emotional service)?',
    text: 'What is an example of "Man ki Sewa" (mental/emotional service)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Comforting a classmate who is grieving, listening patiently to someone in distress, and silently praying for the healing of the sick',
      'Sweeping the dirt off the pavement with a broom',
      'Writing a check to purchase sports uniforms',
      'Winning a computer game against a friend'
    ],
    correctAnswer: 'Comforting a classmate who is grieving, listening patiently to someone in distress, and silently praying for the healing of the sick',
    explanation: 'Man ki Sewa utilizes the mind and empathy: offering emotional comfort, giving uplifting counsel, and sending sincere prayers for the peace and healing of all beings.',
    socraticHint: 'How does offering heartfelt comfort, listening with empathy, and praying for someone demonstrate mental service?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-017',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What famous teaching of the Bhagavad Gita (2:47) forms the philosophical foundation of "Nishkama Karma" (selfless action)?',
    text: 'What famous teaching of the Bhagavad Gita (2:47) forms the philosophical foundation of "Nishkama Karma" (selfless action)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"You have a right to perform your duty, but never to the fruits of your actions"',
      '"Work only when you are promised a high salary"',
      '"Do only what makes you famous in the eyes of people"',
      '"Avoid all action and remain inactive forever"'
    ],
    correctAnswer: '"You have a right to perform your duty, but never to the fruits of your actions"',
    explanation: '"Karmanye vadhikaraste ma phaleshu kadachana"—Lord Krishna teaches that we should perform righteous service selflessly without anxiety over results or craving personal reward.',
    socraticHint: 'Which verse teaches that our duty is to do good work without being attached to rewards or praise?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-018',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What well-known hospital in Parklands, Nairobi was founded by the Kenyan Hindu community as an enduring institution of medical Sewa?',
    text: 'What well-known hospital in Parklands, Nairobi was founded by the Kenyan Hindu community as an enduring institution of medical Sewa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'M.P. Shah Hospital',
      'Nairobi West Hospital',
      'Kenyatta National Hospital',
      'Coast General Hospital'
    ],
    correctAnswer: 'M.P. Shah Hospital',
    explanation: 'M.P. Shah Hospital (formerly Parklands Nursing Home) was established through philanthropic donations by the Hindu community to provide quality healthcare to all Kenyans.',
    socraticHint: 'Which major charitable hospital located in Parklands, Nairobi bears the initials M.P. Shah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-019',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What nationwide medical charity initiative is regularly organized by the Lions Clubs and Hindu communities across Kenyan counties?',
    text: 'What nationwide medical charity initiative is regularly organized by the Lions Clubs and Hindu communities across Kenyan counties?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Free Eye Cataract Surgical Camps and Vision Screening Camps for elderly and rural Kenyans',
      'Commercial cosmetics exhibitions',
      'Fast-food competitions',
      'Car racing tournaments'
    ],
    correctAnswer: 'Free Eye Cataract Surgical Camps and Vision Screening Camps for elderly and rural Kenyans',
    explanation: 'Free cataract eye camps restore sight to thousands of elderly Kenyans across rural counties every year, providing free surgical operations, lenses, and medications as Sewa.',
    socraticHint: 'Which free medical camps restore eyesight by performing cataract surgeries for needy Kenyans?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-020',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'During severe droughts in Northern Kenya (such as Mandera, Wajir, and Turkana), how does the Hindu Council of Kenya practice Sewa?',
    text: 'During severe droughts in Northern Kenya (such as Mandera, Wajir, and Turkana), how does the Hindu Council of Kenya practice Sewa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By organizing emergency relief convoys delivering thousands of bags of maize meal, beans, water tanks, and animal feed to affected pastoral families',
      'By closing offices and refusing to participate in relief efforts',
      'By selling food to drought victims at high prices',
      'By advising pastoralists to move out of Kenya'
    ],
    correctAnswer: 'By organizing emergency relief convoys delivering thousands of bags of maize meal, beans, water tanks, and animal feed to affected pastoral families',
    explanation: 'The Hindu Council of Kenya mobilizes food relief caravans and clean water tankers to remote drought zones, demonstrating solidarity with vulnerable Kenyan brothers and sisters.',
    socraticHint: 'How do relief convoys distributing maize, beans, and clean water help drought-affected pastoralists?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-021',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'What communal dining hall (Langar) tradition practiced in Sikh and Hindu gurdwaras/temples provides free vegetarian meals to anyone who enters?',
    text: 'What communal dining hall (Langar) tradition practiced in Sikh and Hindu gurdwaras/temples provides free vegetarian meals to anyone who enters?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Langar (or Mahaprasad)—where all people sit together on the floor as equals to share food regardless of caste, creed, or wealth',
      'A private restaurant that charges money for each plate',
      'A kitchen open only to members of the royal family',
      'A VIP banquet where leaders sit on elevated chairs'
    ],
    correctAnswer: 'Langar (or Mahaprasad)—where all people sit together on the floor as equals to share food regardless of caste, creed, or wealth',
    explanation: 'Langar serves thousands of hot meals daily: all people sit on the same level, breaking social hierarchies and embodying universal hospitality and human equality.',
    socraticHint: 'Which sacred community kitchen serves free food to all visitors sitting side-by-side on the floor?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-022',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'How does Swami Vivekananda’s motto "Daridra Narayana" view service to the poor and vulnerable?',
    text: 'How does Swami Vivekananda’s motto "Daridra Narayana" view service to the poor and vulnerable?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Serving the poor, the sick, and the suffering is the highest form of worship, for God (Narayana) dwells within the hearts of the humble',
      'The poor should be blamed for their poverty',
      'Only rich people can experience the Divine',
      'Spiritual seekers should avoid helping society'
    ],
    correctAnswer: 'Serving the poor, the sick, and the suffering is the highest form of worship, for God (Narayana) dwells within the hearts of the humble',
    explanation: 'Swami Vivekananda declared: "Where can you search for God if you cannot see Him in the poor, the sick, and the needy? Serve them as you would serve God Himself!"',
    socraticHint: 'How does serving the poor equate to serving God according to Swami Vivekananda?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-023',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'How does volunteering in school cleanup drives or tree planting clubs teach a Grade 5 pupil the spirit of Sewa?',
    text: 'How does volunteering in school cleanup drives or tree planting clubs teach a Grade 5 pupil the spirit of Sewa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It instills pride in community service, breaks laziness and snobbery, and shows that working selflessly for others brings deep inner satisfaction',
      'It guarantees that the pupil will never have to wash dishes at home',
      'It is done only to get an award badge from the teacher',
      'It teaches that manual work is only for paid cleaners'
    ],
    correctAnswer: 'It instills pride in community service, breaks laziness and snobbery, and shows that working selflessly for others brings deep inner satisfaction',
    explanation: 'Volunteering in communal work (Sewa) nurtures dignity of labor, fosters civic responsibility, and teaches that true happiness comes from uplifting the community.',
    socraticHint: 'How does hands-on community service build humility, dignity of labor, and genuine joy in children?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },
  {
    id: 'q-g5-hre-u9-024',
    subStrandId: 'substrand-g5-hre-u9',
    prompt: 'Why is Nishkama Sewa (selfless service without ego) described as the greatest purifier of the human heart (Chitta Shuddhi)?',
    text: 'Why is Nishkama Sewa (selfless service without ego) described as the greatest purifier of the human heart (Chitta Shuddhi)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It burns away pride, greed, and selfishness, expanding the heart with unconditional love and preparing the mind for spiritual realization',
      'It makes a person physically exhausted so they cannot think',
      'It forces everyone to agree with our opinions',
      'It guarantees immediate financial wealth in business'
    ],
    correctAnswer: 'It burns away pride, greed, and selfishness, expanding the heart with unconditional love and preparing the mind for spiritual realization',
    explanation: 'Selfless service dissolves the narrow illusion of "I" and "Mine", purifying the subconscious mind (Chitta) of selfishness and opening the heart to divine grace.',
    socraticHint: 'How does serving others without seeking credit wash away selfishness and pride from our character?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U9'
  },

  // --- Unit 10 Lesson 1: Festivals of Divine Radiance Quest (q-g5-hre-u10-001 to 012) ---
  {
    id: 'q-g5-hre-u10-001',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What does the sacred festival of "Navratri" celebrate in Hindu tradition?',
    text: 'What does the sacred festival of "Navratri" celebrate in Hindu tradition?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Nine nights celebrating the divine feminine power (Shakti / Durga) and the triumph of righteousness over the demon Mahishasura',
      'Nine days of fasting from all fruit juices',
      'A celebration of ancient sailing ships',
      'The coronation of ancient Greek emperors'
    ],
    correctAnswer: 'Nine nights celebrating the divine feminine power (Shakti / Durga) and the triumph of righteousness over the demon Mahishasura',
    explanation: '"Nava" means nine and "Ratri" means nights. Navratri celebrates Mother Durga\'s divine power conquering negativity, ignorance, and the demon of ego Mahishasura.',
    socraticHint: 'Which festival lasting nine nights celebrates Mother Durga conquering evil?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-002',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What traditional folk dances are performed during Navratri, where dancers move in concentric circles around a sacred lamp?',
    text: 'What traditional folk dances are performed during Navratri, where dancers move in concentric circles around a sacred lamp?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Garba and Dandiya Raas',
      'Kathakali and Bharatanatyam',
      'Bhangra and Giddha',
      'Salsa and Flamenco'
    ],
    correctAnswer: 'Garba and Dandiya Raas',
    explanation: 'Garba (clapping in rhythmic circles around the Garbha deep lamp) and Dandiya Raas (using polished wooden sticks) celebrate cosmic joy, rhythm, and devotion.',
    socraticHint: 'Which famous circular clapping dance and stick dance are performed during Navratri nights?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-003',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What does the circular movement of the Garba dance around a central lit lamp symbolize spiritually?',
    text: 'What does the circular movement of the Garba dance around a central lit lamp symbolize spiritually?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The cyclical nature of time and cosmic life revolving around the eternal, unchanging Divine Light at the center',
      'A race to see which dancer finishes first',
      'An imitation of planets escaping from their orbits',
      'A military marching exercise'
    ],
    correctAnswer: 'The cyclical nature of time and cosmic life revolving around the eternal, unchanging Divine Light at the center',
    explanation: 'The circle symbolizes the wheel of life and time moving endlessly, while the central glowing lamp (Garbha Deep) represents the unchanging, eternal Divine within.',
    socraticHint: 'How does moving in a circle around a central lamp represent our lives revolving around God?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-004',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What is the tenth day following Navratri called, celebrating the final victory of Lord Rama over Ravana and Durga over Mahishasura?',
    text: 'What is the tenth day following Navratri called, celebrating the final victory of Lord Rama over Ravana and Durga over Mahishasura?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Vijayadashami (or Dussehra)',
      'Holi',
      'Janmashtami',
      'Makar Sankranti'
    ],
    correctAnswer: 'Vijayadashami (or Dussehra)',
    explanation: 'Vijayadashami ("the victorious tenth day") or Dussehra commemorates the ultimate victory of good over evil, celebrated by burning effigies of Ravana and starting new education.',
    socraticHint: 'Which festival named after "Vijaya" (victory) and "Dashami" (tenth day) celebrates the triumph of good?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-005',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What is the spiritual significance of observing Maha Shivratri ("The Great Night of Shiva")?',
    text: 'What is the spiritual significance of observing Maha Shivratri ("The Great Night of Shiva")?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A night of fasting, meditation, self-discipline, and prayer to quiet mental agitation and conquer inner negative tendencies like anger and ego',
      'A night for loud fireworks and eating sugary snacks',
      'A public parade of royal horses and chariots',
      'A day for shopping in commercial malls'
    ],
    correctAnswer: 'A night of fasting, meditation, self-discipline, and prayer to quiet mental agitation and conquer inner negative tendencies like anger and ego',
    explanation: 'Maha Shivratri is an introspective vigil: meditating in stillness through the night, chanting "Om Namah Shivaya", and seeking inner peace and mastery over base desires.',
    socraticHint: 'How does staying awake in prayer and meditation on Shivratri help calm the mind and overcome anger?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-006',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What three-pronged sacred leaf is traditionally offered to Lord Shiva on Maha Shivratri?',
    text: 'What three-pronged sacred leaf is traditionally offered to Lord Shiva on Maha Shivratri?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Bilva leaf (Bel Patra)',
      'Banana leaf',
      'Mango leaf',
      'Neem leaf'
    ],
    correctAnswer: 'Bilva leaf (Bel Patra)',
    explanation: 'The trifoliate Bilva leaf symbolizes the three Gunas (Sattva, Rajas, Tamas) surrendered to Shiva, as well as Shiva\'s three eyes and the Trishula (trident).',
    socraticHint: 'Which three-lobed sacred leaf is uniquely offered on the Shiva Lingam?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-007',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What powerful five-syllable mantra (Panchakshari Mantra) is chanted during Maha Shivratri?',
    text: 'What powerful five-syllable mantra (Panchakshari Mantra) is chanted during Maha Shivratri?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Om Namah Shivaya"',
      '"Hare Rama Hare Krishna"',
      '"Om Namo Bhagavate Vasudevaya"',
      '"Om Gam Ganapataye Namah"'
    ],
    correctAnswer: '"Om Namah Shivaya"',
    explanation: '"Om Namah Shivaya" (Na-Ma-Shi-Va-Ya) is the five-syllable mantra honoring Lord Shiva, meaning "I bow to the Auspicious One who resides in the core of existence."',
    socraticHint: 'Which five-syllable chant meaning "I bow to Shiva" is repeated on Shivratri?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-008',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What does the festival of "Guru Purnima" celebrate on the full moon of Ashadha?',
    text: 'What does the festival of "Guru Purnima" celebrate on the full moon of Ashadha?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Expressing deep gratitude to spiritual teachers, school educators, and Sage Veda Vyasa who compiled sacred knowledge',
      'Buying new electronic gadgets for school',
      'Celebrating the planting of rice crops in rivers',
      'The end of winter weather in high mountains'
    ],
    correctAnswer: 'Expressing deep gratitude to spiritual teachers, school educators, and Sage Veda Vyasa who compiled sacred knowledge',
    explanation: 'Guru Purnima honors the birth of Sage Vyasa (the original compiler of the Vedas) and pays profound tribute to all teachers who guide our intellect away from ignorance.',
    socraticHint: 'Which full-moon festival honors Sage Vyasa and all our teachers who guide our minds to truth?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-009',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What spring festival celebrates joy, forgiveness, the triumph of devotee Prahlada, and the colorful diversity of nature?',
    text: 'What spring festival celebrates joy, forgiveness, the triumph of devotee Prahlada, and the colorful diversity of nature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Holi (The Festival of Colors)',
      'Diwali',
      'Navratri',
      'Maha Shivratri'
    ],
    correctAnswer: 'Holi (The Festival of Colors)',
    explanation: 'Holi celebrates the bonfire of Holika Dahan, the salvation of Prahlada, the arrival of spring blossoms, and the joy of smearing vibrant colored powders (Gulal) in brotherhood.',
    socraticHint: 'Which festival celebrated with vibrant colored powders (Gulal) marks the triumph of Prahlada over Holika?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-010',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What social lesson of equality and reconciliation does the smearing of colors during Holi teach?',
    text: 'What social lesson of equality and reconciliation does the smearing of colors during Holi teach?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'When everyone is covered in joyful colors, social differences of wealth, status, and appearance vanish; past grudges are forgiven and mutual love is renewed',
      'People should ruin clean school uniforms intentionally',
      'Colors should only be shared with wealthy family friends',
      'It shows that people should stay indoors and not speak to neighbors'
    ],
    correctAnswer: 'When everyone is covered in joyful colors, social differences of wealth, status, and appearance vanish; past grudges are forgiven and mutual love is renewed',
    explanation: 'Holi is the great leveler: under the colors, all human beings look identical, dissolving barriers of rank and wealth, fostering reconciliation, warm hugs, and forgiveness.',
    socraticHint: 'How does sharing colors break down social rank and allow people to forgive past misunderstandings?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-011',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'In Kenyan towns like Mombasa, Nakuru, and Nairobi, how does the public celebration of Navratri and Diwali enrich Kenyan cultural diversity?',
    text: 'In Kenyan towns like Mombasa, Nakuru, and Nairobi, how does the public celebration of Navratri and Diwali enrich Kenyan cultural diversity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It creates vibrant cultural exchange, welcomes non-Hindu fellow citizens to share traditional foods and music, and highlights Kenya as a harmonious multi-cultural tapestry',
      'It forces everyone in Kenya to dance the same steps',
      'It causes disruption and disputes between neighborhoods',
      'It requires that all businesses in Kenya shut down for a month'
    ],
    correctAnswer: 'It creates vibrant cultural exchange, welcomes non-Hindu fellow citizens to share traditional foods and music, and highlights Kenya as a harmonious multi-cultural tapestry',
    explanation: 'Public cultural celebrations showcase the rich diversity of our nation, fostering mutual cultural appreciation, interfaith friendship, and tourism in Kenya.',
    socraticHint: 'How does sharing cultural celebrations openly with fellow Kenyans foster unity and national pride?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-012',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'Why are traditional sweets and treats (Prasadam) shared generously with neighbors and visitors during all Hindu festivals?',
    text: 'Why are traditional sweets and treats (Prasadam) shared generously with neighbors and visitors during all Hindu festivals?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To spread sweetness, hospitality, and joy, ensuring that no neighbor or visitor feels excluded from the blessing of celebration',
      'Because sweets spoil if kept for more than two hours',
      'To sell sweets at high prices to earn personal profit',
      'Because temple rules forbid eating sweets at home'
    ],
    correctAnswer: 'To spread sweetness, hospitality, and joy, ensuring that no neighbor or visitor feels excluded from the blessing of celebration',
    explanation: 'Sharing Prasadam (blessed food) is an expression of generous love: spreading divine blessing, sweetness of speech, and neighborly warmth across the community.',
    socraticHint: 'Why is sharing sweets with neighbors a warm symbol of hospitality and shared happiness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },

  // --- Unit 10 Lesson 2: National Coexistence and Kenyan Harmony Quest (q-g5-hre-u10-013 to 024) ---
  {
    id: 'q-g5-hre-u10-013',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What historic milestone occurred in July 2017 regarding the recognition of the Hindu community in Kenya?',
    text: 'What historic milestone occurred in July 2017 regarding the recognition of the Hindu community in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Hindu community was formally recognized as the 44th official community/tribe of Kenya by presidential proclamation',
      'The first Hindu temple was built in Nairobi',
      'Hindi became an official language of the Kenyan Parliament',
      'All holidays in Kenya were renamed'
    ],
    correctAnswer: 'The Hindu community was formally recognized as the 44th official community/tribe of Kenya by presidential proclamation',
    explanation: 'In July 2017, the Kenyan government formally gazetted the Hindu community as the 44th tribe of Kenya, celebrating over a century of peaceful, patriotic contribution to the nation.',
    socraticHint: 'Which official numbered status—as the 44th community of Kenya—was gazetted in July 2017?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-014',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What interfaith umbrella body in Kenya brings Hindu, Christian, and Muslim leaders together to promote national peace, civic education, and reconciliation?',
    text: 'What interfaith umbrella body in Kenya brings Hindu, Christian, and Muslim leaders together to promote national peace, civic education, and reconciliation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Inter-Religious Council of Kenya (IRCK)',
      'The East African Wildlife Society',
      'The Kenya National Chamber of Commerce',
      'The Law Society of Kenya'
    ],
    correctAnswer: 'The Inter-Religious Council of Kenya (IRCK)',
    explanation: 'The Inter-Religious Council of Kenya (IRCK) unites leaders from the Hindu Council of Kenya, Christian churches, and Muslim bodies to address national challenges collectively.',
    socraticHint: 'Which council with the initials IRCK represents all major religious communities in Kenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-015',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How does the ancient Vedic value of "Vasudhaiva Kutumbakam" (the world is one family) guide a Kenyan Hindu pupil\'s relationship with Christian and Muslim classmates?',
    text: 'How does the ancient Vedic value of "Vasudhaiva Kutumbakam" (the world is one family) guide a Kenyan Hindu pupil\'s relationship with Christian and Muslim classmates?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It inspires the pupil to treat all classmates with deep brotherly love, mutual respect, and warmth, celebrating shared citizenship and common humanity',
      'It tells the pupil to avoid sitting next to students of other faiths',
      'It suggests that people of different religions should not play sports together',
      'It forbids talking to students who speak different languages'
    ],
    correctAnswer: 'It inspires the pupil to treat all classmates with deep brotherly love, mutual respect, and warmth, celebrating shared citizenship and common humanity',
    explanation: 'Vasudhaiva Kutumbakam teaches that all human beings are children of the one Supreme Reality; treating classmates as brothers and sisters builds lasting national unity.',
    socraticHint: 'How does viewing all Kenyans as members of one family promote friendship and mutual respect across religions?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-016',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'In what ways do Kenyan Hindu business owners and industrialists contribute to national economic growth and nation building in Kenya?',
    text: 'In what ways do Kenyan Hindu business owners and industrialists contribute to national economic growth and nation building in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By manufacturing goods locally, creating thousands of jobs for Kenyan citizens, paying taxes to fund public services, and investing in community projects',
      'By refusing to hire local Kenyan workers',
      'By transferring all wealth to foreign countries without investing in Kenya',
      'By closing factories whenever there is an election'
    ],
    correctAnswer: 'By manufacturing goods locally, creating thousands of jobs for Kenyan citizens, paying taxes to fund public services, and investing in community projects',
    explanation: 'Ethical enterprise creates employment, builds infrastructure, pays taxes to support national development, and supports local community welfare.',
    socraticHint: 'How does creating factories, jobs, and paying taxes help build a prosperous Kenyan nation?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-017',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How does the Hindu religious value of "Asteya" (non-stealing) contribute to fighting the national problem of corruption and bribery in Kenya?',
    text: 'How does the Hindu religious value of "Asteya" (non-stealing) contribute to fighting the national problem of corruption and bribery in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It instills absolute honesty in handling public funds, teaching that stealing public wealth or offering bribes is a grave moral sin that damages society',
      'It encourages taking bribes as long as nobody is looking',
      'It implies that corruption is normal in business',
      'It suggests that public money belongs to whoever takes it first'
    ],
    correctAnswer: 'It instills absolute honesty in handling public funds, teaching that stealing public wealth or offering bribes is a grave moral sin that damages society',
    explanation: 'Asteya demands that public assets and funds be treated as sacred trusts; stealing or accepting bribes violates Dharma and robs the nation of progress.',
    socraticHint: 'How does the moral commitment not to steal (Asteya) inspire citizens to reject bribery and corruption?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-018',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How does participating in national tree growing campaigns support the Hindu spiritual duty of environmental stewardship in Kenya?',
    text: 'How does participating in national tree growing campaigns support the Hindu spiritual duty of environmental stewardship in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It puts into practice reverence for Mother Earth (Bhumi Devi), protects water catchment towers, and restores biodiversity for future generations of Kenyans',
      'It prevents farmers from using fertile soil',
      'It is done only for publicity photographs in newspapers',
      'It replaces the need for schools and education'
    ],
    correctAnswer: 'It puts into practice reverence for Mother Earth (Bhumi Devi), protects water catchment towers, and restores biodiversity for future generations of Kenyans',
    explanation: 'Planting trees aligns with Vedic environmental ethics: honoring Mother Earth, restoring ecological balance (Rta), and protecting water towers like Mount Kenya.',
    socraticHint: 'How does planting trees protect soil and water while showing sacred reverence to Mother Earth (Bhumi Devi)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-019',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What does the Kenyan national motto "Harambee" (Let us pull together) share in common with the Vedic principle of collective Yajna?',
    text: 'What does the Kenyan national motto "Harambee" (Let us pull together) share in common with the Vedic principle of collective Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Both emphasize that communities achieve lasting prosperity and overcome hardship through selfless cooperation, shared sacrifice, and pulling together for the common good',
      'Both suggest that individuals should work strictly alone without helping others',
      'Both encourage people to depend only on foreign aid',
      'Both promote tribal divisions over national unity'
    ],
    correctAnswer: 'Both emphasize that communities achieve lasting prosperity and overcome hardship through selfless cooperation, shared sacrifice, and pulling together for the common good',
    explanation: 'Harambee and Yajna both embody the spirit of mutual cooperation: pooling efforts, resources, and prayers together to build schools, boreholes, and a flourishing nation.',
    socraticHint: 'How do both Harambee and Yajna celebrate uniting all community efforts for the common welfare?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-020',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How can a Grade 5 pupil practice active patriotism and peaceful citizenship in their local school in Kenya?',
    text: 'How can a Grade 5 pupil practice active patriotism and peaceful citizenship in their local school in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By singing the Kenya National Anthem with pride, obeying school rules, respecting classmates from all 47 counties, and studying diligently to serve the nation',
      'By scribbling on national flags and school walls',
      'By refusing to participate in national holiday assemblies',
      'By insulting classmates who speak other indigenous languages'
    ],
    correctAnswer: 'By singing the Kenya National Anthem with pride, obeying school rules, respecting classmates from all 47 counties, and studying diligently to serve the nation',
    explanation: 'Patriotism begins at school: revering national symbols, respecting fellow citizens of all ethnicities, obeying regulations, and working hard to contribute to Kenya’s future.',
    socraticHint: 'Which respectful and hardworking actions show true patriotism in school every day?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-021',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What did the famous verse in the Ramayana declare about the supreme value of one’s mother and motherland?',
    text: 'What did the famous verse in the Ramayana declare about the supreme value of one’s mother and motherland?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Janani Janmabhumishcha Swargadapi Gariyasi" (Mother and motherland are superior even to the comforts of heaven)',
      '"Only foreign kingdoms are worth living in"',
      '"A person should leave their homeland as soon as possible"',
      '"Palaces made of gold are superior to one\'s birth country"'
    ],
    correctAnswer: '"Janani Janmabhumishcha Swargadapi Gariyasi" (Mother and motherland are superior even to the comforts of heaven)',
    explanation: 'Lord Rama uttered these words when declining to stay in golden Lanka, declaring that one\'s biological mother and one\'s native motherland are more precious than heaven itself.',
    socraticHint: 'Which famous verse proclaims that our mother and motherland are superior even to heaven (Swarga)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-022',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How does the ancient prayer for peace and rain in the Vedas parallel the prayer in the first stanza of the Kenya National Anthem ("Bless our land and nation...")?',
    text: 'How does the ancient prayer for peace and rain in the Vedas parallel the prayer in the first stanza of the Kenya National Anthem ("Bless our land and nation...")?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Both invoke divine blessing for justice, peace, plentiful harvests, and unity, asking the Creator to protect the land and its people',
      'Both prayers ask for continuous thunderstorms that stop farming',
      'Both prayers are written only for military commanders',
      'There is no shared sentiment of prayer for national welfare'
    ],
    correctAnswer: 'Both invoke divine blessing for justice, peace, plentiful harvests, and unity, asking the Creator to protect the land and its people',
    explanation: 'Both prayers embody identical aspirations: invoking the Supreme God of all creation to bestow peace, abundance, justice, and brotherly unity upon the nation.',
    socraticHint: 'How do both the Kenya National Anthem and Vedic peace prayers seek God\'s blessings for peace, justice, and plenty for the nation?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-023',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'How can Kenyan primary learners from diverse faith traditions (CRE, IRE, and HRE) celebrate their shared values together?',
    text: 'How can Kenyan primary learners from diverse faith traditions (CRE, IRE, and HRE) celebrate their shared values together?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By recognizing shared ethical commitments to honesty, compassion for the poor, reverence for family, protection of nature, and mutual love as proud citizens of Kenya',
      'By arguing over which religion has the longest prayers',
      'By refusing to sit in the same dining hall during lunchtime',
      'By holding debates where students criticize each other\'s scriptures'
    ],
    correctAnswer: 'By recognizing shared ethical commitments to honesty, compassion for the poor, reverence for family, protection of nature, and mutual love as proud citizens of Kenya',
    explanation: 'All three religious curricula in Kenya (CRE, IRE, HRE) share fundamental pillars: love of God, moral truthfulness, care for the vulnerable, peace, and national stewardship.',
    socraticHint: 'What shared moral foundations of honesty, compassion, kindness, and love for Kenya unite CRE, IRE, and HRE learners?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  },
  {
    id: 'q-g5-hre-u10-024',
    subStrandId: 'substrand-g5-hre-u10',
    prompt: 'What ultimate vision for Kenyan society is achieved when young learners grow up practicing moral virtues (Sadachar), selfless service (Sewa), and interfaith respect?',
    text: 'What ultimate vision for Kenyan society is achieved when young learners grow up practicing moral virtues (Sadachar), selfless service (Sewa), and interfaith respect?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A peaceful, prosperous, united, and corruption-free Kenya where all citizens enjoy equal dignity, justice, and prosperity under the guidance of Almighty God',
      'A divided society where tribes compete aggressively for resources',
      'A nation where people only care about personal wealth',
      'A country where natural forests and wildlife are completely wiped out'
    ],
    correctAnswer: 'A peaceful, prosperous, united, and corruption-free Kenya where all citizens enjoy equal dignity, justice, and prosperity under the guidance of Almighty God',
    explanation: 'When moral character (Sadachar), selfless action (Sewa), and interfaith brotherhood guide our youth, Kenya fulfills its true potential as a shining beacon of peace, justice, and prosperity in Africa.',
    socraticHint: 'What peaceful, prosperous, and united future unfolds for Kenya when our youth lead with moral virtue and selfless service?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U10'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 5 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
