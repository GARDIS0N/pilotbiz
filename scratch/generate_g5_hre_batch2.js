import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 HRE Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-hre-u3',
    strandId: 'strand-g5-hre-paramatma',
    learningAreaId: 'la-hre-g5',
    title: 'Lord Rama: The Embodiment of Dharma and Righteous Leadership',
    description: 'Exploring the seventh Avatar of Lord Vishnu: Lord Rama as Maryada Purushottama (the ideal human maintaining moral boundaries); filial obedience to King Dasharatha; 14 years of forest exile; loyalty of brother Lakshmana and selfless detachment of Bharata; pure devotion (Bhakti) and selfless service of Shri Hanuman; vanquishing the tyrant Ravana; the reign of justice (Ramrajya); and moral lessons of truth, promise-keeping, and family harmony.',
    cbeCompetency: 'Moral leadership, filial devotion, loyalty, promise-keeping, and selfless friendship',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g5-hre-u4',
    strandId: 'strand-g5-hre-paramatma',
    learningAreaId: 'la-hre-g5',
    title: 'Lord Krishna: Joyful Leelas, Govardhan Hill, and Nature Stewardship',
    description: 'Exploring the eighth Avatar of Lord Vishnu: The birth of Lord Krishna in Mathura and upbringing in Gokul and Vrindavan; loving childhood Leelas (Makkhan Chor - teaching non-attachment to hoarding); lifting Mount Govardhan upon His little finger to protect villagers, cows, and nature from torrential storms, emphasizing the worship and care of local ecology over fear; compassion for cows (Gopala) and wildlife; and defeating the tyrant King Kamsa.',
    cbeCompetency: 'Environmental stewardship, compassion for animals, joyful simplicity, and standing against bullying',
    estimatedMinutes: 30,
    order: 4
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 2 Lessons (Units 3 & 4: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-hre-u3-l1',
    subStrandId: 'substrand-g5-hre-u3',
    title: 'Lord Rama\'s Exemplary Character: Obedience, Exile, and Sibling Love',
    content: 'In Hindu tradition, Lord Rama is celebrated as "Maryada Purushottama"—the supreme upholder of righteousness who never stepped outside moral boundaries. Born as the eldest prince of Ayodhya to King Dasharatha and Queen Kaushalya, Rama excelled in wisdom, humility, and valor. When Queen Kaikeyi demanded that her son Bharata be crowned king and Rama be exiled to the forest for fourteen years, Rama accepted without anger, sorrow, or resentment to uphold his father\'s solemn promise (Vachan). He placed duty above royal comfort. His devoted wife Sita and younger brother Lakshmana insisted on accompanying him to share his hardships. Meanwhile, when Bharata learned of the unjust scheme, he refused to sit on the throne; instead, he placed Rama’s wooden sandals (Padukas) upon the throne and ruled Ayodhya as a humble caretaker on Rama’s behalf. This illustrates the supreme ideal of selfless sibling love, free from greed or rivalry for power.',
    didYouKnow: 'The ancient epic Ramayana composed by Sage Valmiki contains 24,000 Sanskrit verses (Slokas), teaching timeless principles of truth, honor, and duty!',
    kenyanContext: 'At Ram Mandir in Ngara, Nairobi, children stage youth dramas of the Ramayana during Diwali, highlighting how Rama’s promise-keeping models integrity for future Kenyan leaders.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u3-l2',
    subStrandId: 'substrand-g5-hre-u3',
    title: 'Hanuman\'s Devotion and the Triumph of Dharma over Ravana',
    content: 'During their forest exile in Dandakaranya, the demon king Ravana of Lanka deceitfully abducted Mother Sita. In his search, Lord Rama met Shri Hanuman, the monkey hero endowed with immense physical strength, profound intellect, and complete selflessness. Hanuman did not seek personal glory; his entire strength was dedicated to serving Lord Rama (Rama-Seva). He leaped across the turbulent ocean to locate Mother Sita in Ashoka Vatika, comforting her and proving that righteousness always finds a way. With the alliance of Sugriva and the Vanara army, a bridge of floating stones (Rama Setu) was built across the sea to Lanka. After offering Ravana multiple opportunities to return Sita peacefully, a decisive battle ensued. Lord Rama defeated Ravana, liberating Lanka from tyranny and crowning Ravana’s righteous brother Vibhishana as king. Upon returning to Ayodhya, Rama’s benevolent rule became known as "Ramrajya"—an era of peace, prosperity, environmental fertility, and equal justice where no citizen suffered poverty or oppression.',
    didYouKnow: 'Whenever Hanuman is praised, he immediately folds his palms and chants the name of Rama, exemplifying supreme humility despite possessing matchless power!',
    kenyanContext: 'In Eldoret and Kisumu, Hindu community centers run youth clubs where learners practice Hanuman-style selfless community service (Sewa), helping clear roads and distributing food to drought-hit families.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u4-l1',
    subStrandId: 'substrand-g5-hre-u4',
    title: 'Lord Krishna\'s Early Childhood: Innocence, Motherly Love, and Divine Leelas',
    content: 'Lord Krishna, the eighth Avatar of Lord Vishnu, was born in a prison in Mathura where his parents Devaki and Vasudeva were captive under the cruel tyrant King Kamsa. Miraculously, Vasudeva carried newborn Krishna through the flooded Yamuna River to the pastoral village of Gokul, placing him under the loving care of foster parents Yashoda and Nanda Baba. In Gokul and Vrindavan, Krishna lived as a joyful cowherd boy. His childhood activities (Leelas) charmed the entire village: He was affectionately nicknamed "Makkhan Chor" (the butter thief), because he would secretly take freshly churned butter from earthen pots and share it joyfully with village children and playful monkeys, teaching that wealth and food should be shared freely rather than hoarded selfishly. Mother Yashoda’s tender love for young Krishna illustrates Vatsalya Bhava (divine motherly affection). When Yashoda once looked inside Krishna’s mouth to check if he had eaten dirt, she was awestruck to witness the entire cosmic universe—stars, planets, oceans, and living beings—radiating within Him, showing that the infinite Supreme Divine resides within humble simplicity.',
    didYouKnow: 'Lord Krishna’s sacred flute (Murli / Bansuri) symbolizes an empty bamboo reed: when a human heart empties itself of ego and jealousy, divine music flows through them!',
    kenyanContext: 'During the vibrant festival of Janmashtami at Hare Krishna Temple in Nairobi, Grade 5 pupils dress up in colorful silk dhotis and peacock feathers, celebrating Krishna\'s childhood and sharing traditional sweets with visitors.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u4-l2',
    subStrandId: 'substrand-g5-hre-u4',
    title: 'Lifting Mount Govardhan: Ecology, Humility, and Divine Protection',
    content: 'Every year, the pastoral residents of Braj prepared an extravagant, fearful sacrifice for Lord Indra, the rain deity. Young Krishna questioned this ritual superstition, advising his father Nanda and the villagers: "Why worship a distant rain god out of fear? Our true protectors are Mount Govardhan, the lush green forests that provide pasture, the clean streams that quench our thirst, and our gentle cows that give us milk. Let us revere nature and express gratitude to the mountain!" Convinced by Krishna\'s wisdom, the villagers offered food and prayers to Govardhan hill. Enraged by their refusal to worship him, Indra unleashed catastrophic torrential downpours, lightning, and floods to drown the village. Undaunted, seven-year-old Krishna lifted the colossal Mount Govardhan upon the tip of his little finger, holding it aloft like a giant umbrella for seven continuous days and nights. Villagers, cowherds, and animals found safe shelter underneath the hill. Realizing his foolish pride, Indra apologized and bowed. This event earned Krishna the name "Govardhanadhari" and established the vital spiritual duty of cherishing and protecting local ecosystems.',
    didYouKnow: 'The day following Diwali is celebrated across Hindu communities as Govardhan Puja (or Annakut), where mountains of vegetarian food are prepared to thank Mother Nature for her bounty!',
    kenyanContext: 'In Machakos and Kitui, where watershed preservation and hill reforestation protect communities from flash floods, students draw parallels to Govardhan Puja, planting trees along hilltops to protect fertile valleys below.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 2 Missions (Units 3 & 4: 4 Missions, orders 93–96)
const missionsToAdd = [
  {
    id: 'mission-g5-hre-u3-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u3',
    lessonId: 'lesson-g5-hre-u3-l1',
    title: 'Maryada Purushottama Quest',
    description: 'Walk in the footsteps of Lord Rama as he honors his father\'s promise, embraces 14 years of forest exile, and models the ultimate ideal of selfless sibling love!',
    order: 93,
    orderIndex: 93,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-rama-dharma',
    badge: {
      name: 'Pillar of Dharma',
      icon: 'award'
    },
    questionIds: [
      'q-g5-hre-u3-001',
      'q-g5-hre-u3-002',
      'q-g5-hre-u3-003',
      'q-g5-hre-u3-004',
      'q-g5-hre-u3-005',
      'q-g5-hre-u3-006',
      'q-g5-hre-u3-007',
      'q-g5-hre-u3-008',
      'q-g5-hre-u3-009',
      'q-g5-hre-u3-010',
      'q-g5-hre-u3-011',
      'q-g5-hre-u3-012'
    ]
  },
  {
    id: 'mission-g5-hre-u3-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u3',
    lessonId: 'lesson-g5-hre-u3-l2',
    title: 'Devotion of Hanuman and Victory of Dharma Quest',
    description: 'Experience the limitless devotion of Shri Hanuman, cross the ocean to Lanka, witness the fall of Ravana, and welcome the golden era of Ramrajya!',
    order: 94,
    orderIndex: 94,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-hanuman-bhakti',
    badge: {
      name: 'Heroic Sevak',
      icon: 'shield'
    },
    questionIds: [
      'q-g5-hre-u3-013',
      'q-g5-hre-u3-014',
      'q-g5-hre-u3-015',
      'q-g5-hre-u3-016',
      'q-g5-hre-u3-017',
      'q-g5-hre-u3-018',
      'q-g5-hre-u3-019',
      'q-g5-hre-u3-020',
      'q-g5-hre-u3-021',
      'q-g5-hre-u3-022',
      'q-g5-hre-u3-023',
      'q-g5-hre-u3-024'
    ]
  },
  {
    id: 'mission-g5-hre-u4-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u4',
    lessonId: 'lesson-g5-hre-u4-l1',
    title: 'Gokul Leelas and Childlike Purity Quest',
    description: 'Join young Krishna in pastoral Gokul, discover the deeper lesson behind the butter thief, and look into the cosmic universe within Yashoda\'s child!',
    order: 95,
    orderIndex: 95,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-krishna-leela',
    badge: {
      name: 'Joyful Gopala',
      icon: 'feather'
    },
    questionIds: [
      'q-g5-hre-u4-001',
      'q-g5-hre-u4-002',
      'q-g5-hre-u4-003',
      'q-g5-hre-u4-004',
      'q-g5-hre-u4-005',
      'q-g5-hre-u4-006',
      'q-g5-hre-u4-007',
      'q-g5-hre-u4-008',
      'q-g5-hre-u4-009',
      'q-g5-hre-u4-010',
      'q-g5-hre-u4-011',
      'q-g5-hre-u4-012'
    ]
  },
  {
    id: 'mission-g5-hre-u4-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u4',
    lessonId: 'lesson-g5-hre-u4-l2',
    title: 'Govardhan Ecology and Gopala Guardian Quest',
    description: 'Lift Mount Govardhan with young Krishna, humble the stormy pride of Indra, and champion the ecological reverence of forests, waters, and cattle!',
    order: 96,
    orderIndex: 96,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-govardhan-protector',
    badge: {
      name: 'Govardhan Custodian',
      icon: 'sun'
    },
    questionIds: [
      'q-g5-hre-u4-013',
      'q-g5-hre-u4-014',
      'q-g5-hre-u4-015',
      'q-g5-hre-u4-016',
      'q-g5-hre-u4-017',
      'q-g5-hre-u4-018',
      'q-g5-hre-u4-019',
      'q-g5-hre-u4-020',
      'q-g5-hre-u4-021',
      'q-g5-hre-u4-022',
      'q-g5-hre-u4-023',
      'q-g5-hre-u4-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 2 Questions (Units 3 & 4: 48 Questions total)
const questionsToAdd = [
  // --- Unit 3 Lesson 1: Maryada Purushottama Quest (q-g5-hre-u3-001 to 012) ---
  {
    id: 'q-g5-hre-u3-001',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What revered title is given to Lord Rama meaning "the supreme ideal human who strictly adheres to moral boundaries and righteousness"?',
    text: 'What revered title is given to Lord Rama meaning "the supreme ideal human who strictly adheres to moral boundaries and righteousness"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Maryada Purushottama',
      'Chakravarti Samrat',
      'Makkhan Chor',
      'Parashurama'
    ],
    correctAnswer: 'Maryada Purushottama',
    explanation: '"Maryada" means ethical boundaries/decorum, "Purusha" means human/man, and "Uttama" means supreme. Lord Rama perfectly personified the highest moral character in all situations.',
    socraticHint: 'Which title translates as "the supreme person who honors righteous limits (Maryada)"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-002',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Who was the ancient sage who composed the original Sanskrit epic poem of the Ramayana?',
    text: 'Who was the ancient sage who composed the original Sanskrit epic poem of the Ramayana?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sage Valmiki',
      'Sage Vyasa',
      'Sage Vishvamitra',
      'Sage Vashistha'
    ],
    correctAnswer: 'Sage Valmiki',
    explanation: 'Sage Valmiki is revered as the Adi Kavi (the first poet) who authored the immortal Sanskrit epic Ramayana detailing the life and teachings of Lord Rama.',
    socraticHint: 'Which venerable sage is known as the Adi Kavi (first poet) and author of the Ramayana?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-003',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Why did Lord Rama calmly accept fourteen years of forest exile on the very eve of his royal coronation?',
    text: 'Why did Lord Rama calmly accept fourteen years of forest exile on the very eve of his royal coronation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To honor his father King Dasharatha\'s solemn promise (Vachan) made to Queen Kaikeyi without hesitation or complaint',
      'Because he preferred living alone in a dark cave',
      'Because the people of Ayodhya voted against his coronation',
      'Because his bow and arrows had gone missing'
    ],
    correctAnswer: 'To honor his father King Dasharatha\'s solemn promise (Vachan) made to Queen Kaikeyi without hesitation or complaint',
    explanation: 'Rama placed the sanctity of truth and his father’s sacred word above all worldly kingdom and comfort, demonstrating supreme filial obedience and honor.',
    socraticHint: 'Did Rama rebel against his father\'s promise or cheerfully uphold his father\'s truthfulness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-004',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Which devoted brother chose to accompany Lord Rama into the dangerous Dandakaranya forest to protect and serve him throughout the 14-year exile?',
    text: 'Which devoted brother chose to accompany Lord Rama into the dangerous Dandakaranya forest to protect and serve him throughout the 14-year exile?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Lakshmana',
      'Bharata',
      'Shatrughna',
      'Vibhishana'
    ],
    correctAnswer: 'Lakshmana',
    explanation: 'Lakshmana loved Lord Rama dearly and refused to remain in palace luxury, choosing instead to serve as Rama\'s loyal guardian and companion during exile.',
    socraticHint: 'Which devoted younger brother accompanied Rama and Sita into the forest?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-005',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What did brother Bharata do when he learned that his mother Kaikeyi had unjustly secured the royal throne of Ayodhya for him?',
    text: 'What did brother Bharata do when he learned that his mother Kaikeyi had unjustly secured the royal throne of Ayodhya for him?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He rejected the throne, traveled to the forest to plead for Rama\'s return, and placed Rama\'s sandals (Padukas) on the throne to rule only as his humble servant',
      'He immediately celebrated with a week-long royal banquet',
      'He banished his father Dasharatha from the city',
      'He ordered an army to hunt down Lakshmana'
    ],
    correctAnswer: 'He rejected the throne, traveled to the forest to plead for Rama\'s return, and placed Rama\'s sandals (Padukas) on the throne to rule only as his humble servant',
    explanation: 'Bharata showed selfless detachment (Tyaga): he placed Rama\'s sacred wooden sandals on the throne and administered the kingdom from a simple hermitage in Nandigram.',
    socraticHint: 'Did Bharata seize the royal crown or place Rama\'s wooden sandals on the throne in reverence?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-006',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What profound lesson in family relationships and sibling love does the story of Rama, Lakshmana, and Bharata provide for Kenyan families?',
    text: 'What profound lesson in family relationships and sibling love does the story of Rama, Lakshmana, and Bharata provide for Kenyan families?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Siblings should support one another with selfless loyalty, sharing responsibilities and rejecting greedy squabbles over property or status',
      'Brothers should compete aggressively for parental favoritism',
      'The eldest child should take all family wealth without sharing',
      'Family promises do not matter once parents become old'
    ],
    correctAnswer: 'Siblings should support one another with selfless loyalty, sharing responsibilities and rejecting greedy squabbles over property or status',
    explanation: 'The Ramayana models ideal sibling harmony: neither Bharata nor Lakshmana sought selfish gain, exemplifying mutual sacrifice and unshakeable family solidarity.',
    socraticHint: 'How does prioritizing love and justice over selfish inheritance create peace in families?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-007',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Who was the elderly ascetic woman in the forest who lovingly tasted berries first to ensure they were sweet before offering them to Lord Rama?',
    text: 'Who was the elderly ascetic woman in the forest who lovingly tasted berries first to ensure they were sweet before offering them to Lord Rama?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Shabari',
      'Ahalya',
      'Anasuya',
      'Mandodari'
    ],
    correctAnswer: 'Shabari',
    explanation: 'Shabari was a simple tribal devotee whose pure, unpretentious love was so profound that Lord Rama happily ate the half-eaten sweet berries (Ber), showing that God values heartfelt devotion over social ritual.',
    socraticHint: 'Which humble forest devotee offered sweet wild berries to Lord Rama with pure devotion?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-008',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What did Lord Rama’s gracious acceptance of Shabari’s wild berries teach regarding social equality and human dignity?',
    text: 'What did Lord Rama’s gracious acceptance of Shabari’s wild berries teach regarding social equality and human dignity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Divine love transcends social caste, tribal rank, and worldly status; pure devotion and love of the heart are what truly matter to God',
      'Royalty should only interact with wealthy palace guests',
      'Food should always be tested by palace officials before eating',
      'Forest dwellers are not allowed to practice prayer'
    ],
    correctAnswer: 'Divine love transcends social caste, tribal rank, and worldly status; pure devotion and love of the heart are what truly matter to God',
    explanation: 'Lord Rama embraced Shabari with supreme respect, demolishing prejudices of social class and lineage and proving that spiritual nobility lies in sincerity of heart.',
    socraticHint: 'Does God judge people by their wealth and social clan or by the purity and love in their heart?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-009',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What tragic mistake did King Dasharatha make in his youth when he mistakenly shot an arrow at Shravan Kumar in the forest?',
    text: 'What tragic mistake did King Dasharatha make in his youth when he mistakenly shot an arrow at Shravan Kumar in the forest?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He shot at the sound of water (Shabda-bhedi arrow) thinking it was a drinking deer, accidentally killing Shravan Kumar who was fetching water for his blind parents',
      'He chopped down a sacred banyan tree in anger',
      'He forgot the password to the Ayodhya royal gates',
      'He refused to pay wages to his palace builders'
    ],
    correctAnswer: 'He shot at the sound of water (Shabda-bhedi arrow) thinking it was a drinking deer, accidentally killing Shravan Kumar who was fetching water for his blind parents',
    explanation: 'King Dasharatha mistakenly killed young Shravan Kumar, whose dying words were a plea to take the water to his thirsty, blind elderly parents whom he carried in baskets.',
    socraticHint: 'Which dutiful son was carrying his blind parents in slings when he was accidentally struck by Dasharatha\'s arrow?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-010',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What classic virtue did Shravan Kumar demonstrate towards his elderly blind parents?',
    text: 'What classic virtue did Shravan Kumar demonstrate towards his elderly blind parents?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Matru-Pitru Bhakti (Absolute filial devotion and selfless service to parents)',
      'Aparigraha (Non-possessiveness)',
      'Vairagya (Renunciation of the world)',
      'Kshama (Forgiveness to enemies)'
    ],
    correctAnswer: 'Matru-Pitru Bhakti (Absolute filial devotion and selfless service to parents)',
    explanation: 'Shravan Kumar is the timeless model of filial devotion, carrying his blind parents on a pilgrimage in a balance-carrier (Kawad) across the length of the country.',
    socraticHint: 'Which virtue represents dedicated, loving service to one\'s mother and father?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-011',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What famous Sanskrit motto regarding the sacred value of keeping one\'s word is associated with the solar dynasty of Lord Rama?',
    text: 'What famous Sanskrit motto regarding the sacred value of keeping one\'s word is associated with the solar dynasty of Lord Rama?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Raghukul reeti sada chali aayi, pran jaaye par vachan na jaayi" (Life may be sacrificed, but a promise must never be broken)',
      '"Satyameva Jayate Nanritam" (Truth alone triumphs, not falsehood)',
      '"Ahimsa Paramo Dharmah" (Non-violence is the supreme law)',
      '"Janani Janmabhumishcha Swargadapi Gariyasi" (Mother and motherland are superior even to heaven)'
    ],
    correctAnswer: '"Raghukul reeti sada chali aayi, pran jaaye par vachan na jaayi" (Life may be sacrificed, but a promise must never be broken)',
    explanation: 'This famous line from the Ramcharitmanas embodies the high ethical standard of Lord Rama’s lineage: a moral promise once given is sacred and must be kept at all costs.',
    socraticHint: 'Which verse states that one may forfeit one\'s own life rather than break a solemn promise?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-012',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'How does Lord Rama’s respect for truth and moral duty guide Kenyan school pupils in leadership roles?',
    text: 'How does Lord Rama’s respect for truth and moral duty guide Kenyan school pupils in leadership roles?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Leaders must keep their campaign promises, treat all students fairly without favoritism, and place community welfare before personal privileges',
      'Leaders should use their authority to punish their classmates',
      'Leaders should take the best snacks from the school dining hall',
      'Leaders are not expected to follow school rules'
    ],
    correctAnswer: 'Leaders must keep their campaign promises, treat all students fairly without favoritism, and place community welfare before personal privileges',
    explanation: 'Rama’s life teaches that authentic leadership is servant leadership: keeping one\'s word, practicing justice, demonstrating humility, and serving the welfare of all people.',
    socraticHint: 'How does servant leadership inspire school prefects to be fair, honest, and humble?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },

  // --- Unit 3 Lesson 2: Devotion of Hanuman and Victory of Dharma Quest (q-g5-hre-u3-013 to 024) ---
  {
    id: 'q-g5-hre-u3-013',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Who was the mighty demon king of Lanka who deceitfully abducted Mother Sita from the forest hermitage of Panchavati?',
    text: 'Who was the mighty demon king of Lanka who deceitfully abducted Mother Sita from the forest hermitage of Panchavati?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ravana',
      'Kumbhakarna',
      'Maricha',
      'Meghanada (Indrajit)'
    ],
    correctAnswer: 'Ravana',
    explanation: 'Ravana, the ten-headed ruler of Lanka, used the deceit of the golden deer (Maricha) to kidnap Sita, defying Dharma and triggering his eventual downfall.',
    socraticHint: 'Which ten-headed king of Lanka used trickery to kidnap Sita?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-014',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Which heroic bird sacrificed his life battling Ravana in mid-air to protect Mother Sita as she was being carried away?',
    text: 'Which heroic bird sacrificed his life battling Ravana in mid-air to protect Mother Sita as she was being carried away?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Jatayu',
      'Sampati',
      'Garuda',
      'Kakabhushundi'
    ],
    correctAnswer: 'Jatayu',
    explanation: 'The noble vulture Jatayu courageously attacked Ravana\'s flying chariot; though mortally wounded, he survived long enough to inform Lord Rama which direction Sita was taken.',
    socraticHint: 'Which brave vulture fought Ravana in the sky and was blessed by Rama before passing away?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-015',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What supreme spiritual virtue is personified by Shri Hanuman in his relationship with Lord Rama?',
    text: 'What supreme spiritual virtue is personified by Shri Hanuman in his relationship with Lord Rama?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Dasa Bhakti (Pure, selfless devotion and humble service to the Divine)',
      'Ahankara (Self-pride)',
      'Krodha (Destructive anger)',
      'Moha (Delusion)'
    ],
    correctAnswer: 'Dasa Bhakti (Pure, selfless devotion and humble service to the Divine)',
    explanation: 'Hanuman is the pinnacle of Dasa Bhakti—the servant-devotee who dedicates every breath, power, and thought to the loving service of the Divine without personal ego.',
    socraticHint: 'Which form of devotion combines complete humility, strength, and selfless service?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-016',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Where in Lanka was Mother Sita held captive under guard, and where Hanuman located her?',
    text: 'Where in Lanka was Mother Sita held captive under guard, and where Hanuman located her?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ashoka Vatika (The garden of Ashoka trees)',
      'The royal gold treasury',
      'Inside the fortress watchtower',
      'On Mount Trikuta'
    ],
    correctAnswer: 'Ashoka Vatika (The garden of Ashoka trees)',
    explanation: 'Mother Sita refused to stay in Ravana’s golden palace and was imprisoned under an Ashoka tree in Ashoka Vatika, meditating constantly on Lord Rama.',
    socraticHint: 'Which sacred grove of Ashoka trees was the setting where Hanuman found Mother Sita?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-017',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What token of recognition did Hanuman deliver to Mother Sita to prove he was truly Lord Rama\'s messenger?',
    text: 'What token of recognition did Hanuman deliver to Mother Sita to prove he was truly Lord Rama\'s messenger?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Lord Rama\'s engraved signet ring (Mudrika)',
      'A golden bowstring from Ayodhya',
      'A peacock feather from the forest',
      'A royal crown of jewels'
    ],
    correctAnswer: 'Lord Rama\'s engraved signet ring (Mudrika)',
    explanation: 'Lord Rama had entrusted Hanuman with his royal signet ring engraved with his name; when Sita saw the ring, her tears of sorrow turned to joy.',
    socraticHint: 'What piece of jewelry engraved with Rama\'s name convinced Sita of Hanuman\'s identity?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-018',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What miracle allowed the Vanara army to construct the causeway (Rama Setu) across the ocean to Lanka?',
    text: 'What miracle allowed the Vanara army to construct the causeway (Rama Setu) across the ocean to Lanka?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Engineers Nala and Nila inscribed the sacred name "RAMA" on stones and boulders, causing them to float upon the ocean waters',
      'A giant metal chain was stretched across the sea',
      'The ocean water drained away completely for three weeks',
      'A bridge made of woven reeds was built overnight'
    ],
    correctAnswer: 'Engineers Nala and Nila inscribed the sacred name "RAMA" on stones and boulders, causing them to float upon the ocean waters',
    explanation: 'By writing the sacred name of Rama on rocks, heavy boulders floated effortlessly upon the waves, forming the bridge known as Rama Setu across the Palk Strait.',
    socraticHint: 'What sacred name written on the stones caused heavy rocks to float on the water?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-019',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What memorable creature brought tiny grains of sand to help build Rama Setu, teaching that every contribution matters no matter how small?',
    text: 'What memorable creature brought tiny grains of sand to help build Rama Setu, teaching that every contribution matters no matter how small?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A tiny Squirrel',
      'A small Crab',
      'A little Sea Turtle',
      'A Dragonfly'
    ],
    correctAnswer: 'A tiny Squirrel',
    explanation: 'A humble squirrel rolled in sand and shook the dust into the sea to help build the bridge. Lord Rama stroked the squirrel tenderly with his three fingers, leaving the striped markings on its back.',
    socraticHint: 'Which small furry woodland animal rolled in sand to contribute its humble effort to the bridge?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-020',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What life-saving medicinal herb did Hanuman fetch from Mount Dronagiri in the Himalayas to revive Lakshmana when he was struck by Meghanada\'s weapon?',
    text: 'What life-saving medicinal herb did Hanuman fetch from Mount Dronagiri in the Himalayas to revive Lakshmana when he was struck by Meghanada\'s weapon?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sanjeevani Booti',
      'Tulsi',
      'Neem',
      'Ashwagandha'
    ],
    correctAnswer: 'Sanjeevani Booti',
    explanation: 'Unable to identify the exact glowing plant, Hanuman lifted the entire mountain peak of Dronagiri and flew back with it, allowing the physician Sushena to administer Sanjeevani Booti.',
    socraticHint: 'Which miracle rejuvenating herb brought back Lakshmana to life on the battlefield?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-021',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'Who was Ravana\'s righteous younger brother who advised Ravana to return Sita, and who was subsequently crowned king of Lanka by Rama?',
    text: 'Who was Ravana\'s righteous younger brother who advised Ravana to return Sita, and who was subsequently crowned king of Lanka by Rama?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Vibhishana',
      'Kumbhakarna',
      'Maricha',
      'Prahasta'
    ],
    correctAnswer: 'Vibhishana',
    explanation: 'Vibhishana stood firmly for Dharma, urging Ravana to return Sita. When exiled by Ravana, he took refuge with Rama, who welcomed him and made him king of Lanka.',
    socraticHint: 'Which brother of Ravana chose righteousness (Dharma) over unrighteous family loyalty?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-022',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What were the defining features of the golden era known as "Ramrajya" (the rule of Rama in Ayodhya)?',
    text: 'What were the defining features of the golden era known as "Ramrajya" (the rule of Rama in Ayodhya)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'An ideal society of justice, peace, truth, economic prosperity, and environmental balance where no citizen suffered poverty, crime, or oppression',
      'A kingdom where only royal courtiers had access to food and wealth',
      'A period of continuous military wars against neighboring lands',
      'An era where citizens were prohibited from practicing arts and education'
    ],
    correctAnswer: 'An ideal society of justice, peace, truth, economic prosperity, and environmental balance where no citizen suffered poverty, crime, or oppression',
    explanation: 'Ramrajya is the universal Hindu vision of ideal ethical governance: where truth reigns, leaders serve with humility, nature is abundant, and all citizens live in harmony and safety.',
    socraticHint: 'What does Ramrajya symbolize in terms of fair governance, justice, and social prosperity?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-023',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'What joyful festival celebrates Lord Rama’s victorious return to Ayodhya after 14 years of exile and the defeat of Ravana?',
    text: 'What joyful festival celebrates Lord Rama’s victorious return to Ayodhya after 14 years of exile and the defeat of Ravana?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Diwali (Deepavali / The Festival of Lights)',
      'Holi',
      'Makar Sankranti',
      'Raksha Bandhan'
    ],
    correctAnswer: 'Diwali (Deepavali / The Festival of Lights)',
    explanation: 'The citizens of Ayodhya illuminated the entire city with clay lamps (Deepak / Diyas) to welcome Rama, Sita, and Lakshmana, giving birth to Diwali.',
    socraticHint: 'Which festival of clay lamps (Diyas) celebrates the return of Lord Rama to Ayodhya?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },
  {
    id: 'q-g5-hre-u3-024',
    subStrandId: 'substrand-g5-hre-u3',
    prompt: 'How does the story of the tiny squirrel contributing to Rama Setu inspire civic action among Kenyan primary learners?',
    text: 'How does the story of the tiny squirrel contributing to Rama Setu inspire civic action among Kenyan primary learners?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'No act of community service or environmental protection is too small; every student\'s honest contribution makes a valuable difference to the nation',
      'Small students should never try to help in school cleanup activities',
      'Only adults and wealthy sponsors can make meaningful contributions',
      'Students should wait until they graduate before caring for their community'
    ],
    correctAnswer: 'No act of community service or environmental protection is too small; every student\'s honest contribution makes a valuable difference to the nation',
    explanation: 'The squirrel story proves that sincere effort, regardless of size or strength, is honored and essential for collective community achievement (Harambee in Kenya).',
    socraticHint: 'How does the squirrel\'s sand contribution prove that even small acts of service by children truly matter?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U3'
  },

  // --- Unit 4 Lesson 1: Gokul Leelas and Childlike Purity Quest (q-g5-hre-u4-001 to 012) ---
  {
    id: 'q-g5-hre-u4-001',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'In which prison city was Lord Krishna born to Devaki and Vasudeva during the tyrannical rule of King Kamsa?',
    text: 'In which prison city was Lord Krishna born to Devaki and Vasudeva during the tyrannical rule of King Kamsa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mathura',
      'Ayodhya',
      'Hastinapura',
      'Ujjain'
    ],
    correctAnswer: 'Mathura',
    explanation: 'Lord Krishna appeared in the prison fortress of Mathura where King Kamsa had incarcerated Devaki and Vasudeva to thwart the prophecy of his own destruction.',
    socraticHint: 'Which ancient city on the banks of the Yamuna was ruled by the tyrant King Kamsa?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-002',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'To which pastoral village did Vasudeva carry infant Krishna across the flooded Yamuna River for safety?',
    text: 'To which pastoral village did Vasudeva carry infant Krishna across the flooded Yamuna River for safety?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Gokul (in the region of Braj)',
      'Lanka',
      'Kishkindha',
      'Kurukshetra'
    ],
    correctAnswer: 'Gokul (in the region of Braj)',
    explanation: 'Vasudeva transported the divine baby across the raging Yamuna to Gokul, entrusting him to the loving care of Nanda Baba and Mother Yashoda.',
    socraticHint: 'Which pastoral cowherd village was the home of Nanda Baba and Mother Yashoda?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-003',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What affectionate childhood nickname was given to young Krishna for playfully sharing freshly churned butter with village children and monkeys?',
    text: 'What affectionate childhood nickname was given to young Krishna for playfully sharing freshly churned butter with village children and monkeys?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Makkhan Chor',
      'Dhanurdhari',
      'Partha',
      'Raghupati'
    ],
    correctAnswer: 'Makkhan Chor',
    explanation: '"Makkhan Chor" translates to "butter thief," recalling his joyful Leelas of stealing butter from high clay pots to share with friends, teaching the spirit of communal sharing.',
    socraticHint: 'Which Hindi phrase translates to "butter thief"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-004',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What deeper moral and spiritual lesson does Lord Krishna’s butter-stealing Leela convey?',
    text: 'What deeper moral and spiritual lesson does Lord Krishna’s butter-stealing Leela convey?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Wealth and food should be shared joyfully with the community and creatures rather than hoarded selfishly in secret storage',
      'People should steal things whenever they are hungry',
      'Butter is the only food that human beings should consume',
      'Children should disobey their parents at all times'
    ],
    correctAnswer: 'Wealth and food should be shared joyfully with the community and creatures rather than hoarded selfishly in secret storage',
    explanation: 'In Gokul, wealthy households hoarded butter for commercial sale to King Kamsa; Krishna took it to feed poor children and animals, condemning selfish accumulation.',
    socraticHint: 'How does sharing freshly churned food with hungry children challenge selfish hoarding?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-005',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What awe-inspiring vision did Mother Yashoda witness when she looked inside young Krishna\'s mouth after he was accused of eating mud?',
    text: 'What awe-inspiring vision did Mother Yashoda witness when she looked inside young Krishna\'s mouth after he was accused of eating mud?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The entire cosmic universe—all galaxies, stars, oceans, continents, and living beings—radiating within His mouth',
      'A handful of ordinary river clay and pebbles',
      'A golden coin from the Mathura palace',
      'A tiny frog jumping out into the courtyard'
    ],
    correctAnswer: 'The entire cosmic universe—all galaxies, stars, oceans, continents, and living beings—radiating within His mouth',
    explanation: 'Yashoda opened Krishna’s mouth and beheld the Vishwaroopa—the entire cosmos, planets, winds, time, and herself—revealing that the infinite God was in her playful child.',
    socraticHint: 'What cosmic revelation showing the entire universe was visible inside young Krishna\'s mouth?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-006',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What sacred musical instrument did Lord Krishna play, whose enchanting melody brought peace to cowherds, deer, and river waters in Vrindavan?',
    text: 'What sacred musical instrument did Lord Krishna play, whose enchanting melody brought peace to cowherds, deer, and river waters in Vrindavan?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Bamboo Flute (Bansuri / Murli)',
      'The Veena',
      'The Conch Shell (Shankha)',
      'The Dholak drum'
    ],
    correctAnswer: 'The Bamboo Flute (Bansuri / Murli)',
    explanation: 'Lord Krishna played the Bansuri (flute). Its divine melodies symbolized the call of the Divine to all individual souls to return to harmony and spiritual bliss.',
    socraticHint: 'Which hollow bamboo wind instrument is famously associated with Lord Krishna?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-007',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What spiritual symbolism does an empty bamboo flute hold for a Hindu devotee?',
    text: 'What spiritual symbolism does an empty bamboo flute hold for a Hindu devotee?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'When the human heart empties itself of ego, pride, and jealousy, divine music, peace, and wisdom can flow through it effortlessly',
      'Only musicians can achieve spiritual liberation',
      'Bamboo is the only wood that should be used to build houses',
      'Music is only meant for entertainment at weddings'
    ],
    correctAnswer: 'When the human heart empties itself of ego, pride, and jealousy, divine music, peace, and wisdom can flow through it effortlessly',
    explanation: 'Just as a flute must be hollow inside to produce sweet melody, a person who empties the mind of selfish ego becomes an instrument of divine peace in society.',
    socraticHint: 'How does emptying our heart of pride and selfishness allow divine goodness to play through our lives?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-008',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What title is given to Lord Krishna signifying His compassionate role as the loving protector and tender of cows and nature?',
    text: 'What title is given to Lord Krishna signifying His compassionate role as the loving protector and tender of cows and nature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Gopala (or Govinda)',
      'Partha-sarathi',
      'Madhava',
      'Yogeshwara'
    ],
    correctAnswer: 'Gopala (or Govinda)',
    explanation: '"Go" means cow or senses, and "Pala" means protector/guardian. Lord Krishna as Gopala lovingly cared for cattle, leading them to green pastures and clean water.',
    socraticHint: 'Which title containing "Go" (cow) means the caretaker and protector of cattle?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-009',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'Which multi-hooded venomous serpent had poisoned the waters of the Yamuna River, and how did young Krishna restore the river\'s purity?',
    text: 'Which multi-hooded venomous serpent had poisoned the waters of the Yamuna River, and how did young Krishna restore the river\'s purity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Kaliya; Krishna danced gracefully atop Kaliya\'s hoods, subduing his venom and sending him peacefully to the ocean without slaying him',
      'Vasuki; Krishna trapped him inside a golden cage',
      'Takshaka; Krishna banished him to the mountain peaks',
      'Shesha; Krishna invited him to live in Gokul'
    ],
    correctAnswer: 'Kaliya; Krishna danced gracefully atop Kaliya\'s hoods, subduing his venom and sending him peacefully to the ocean without slaying him',
    explanation: 'The serpent Kaliya\'s toxic fumes poisoned the Yamuna; Krishna leaped into the river and danced on his hoods, pardoning him upon his repentance and restoring pure water.',
    socraticHint: 'Which poisonous serpent danced upon by Krishna vacated the Yamuna River to make water safe again?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-010',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'How does Lord Krishna subduing the serpent Kaliya teach Kenyan communities about environmental pollution?',
    text: 'How does Lord Krishna subduing the serpent Kaliya teach Kenyan communities about environmental pollution?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Toxic industrial effluents and waste must not be allowed to poison rivers like the Nairobi River or Athi River, as clean water is vital for all living beings',
      'People should catch wild river snakes for home entertainment',
      'Rivers naturally clean themselves even when toxic chemicals are dumped in them',
      'Water pollution only affects fish and not human health'
    ],
    correctAnswer: 'Toxic industrial effluents and waste must not be allowed to poison rivers like the Nairobi River or Athi River, as clean water is vital for all living beings',
    explanation: 'The Kaliya episode is an ancient ecological allegory: when rivers are poisoned, birds drop dead and vegetation withers; leaders must actively cleanse and safeguard water sources.',
    socraticHint: 'How does the cleansing of the poisoned Yamuna river parallel modern river cleanup efforts in Kenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-011',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What natural ornament did Lord Krishna always wear in his hair, showing His love for birds and beauty of nature?',
    text: 'What natural ornament did Lord Krishna always wear in his hair, showing His love for birds and beauty of nature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A colorful Peacock feather (Mayur Pankh)',
      'A heavy crown of diamonds',
      'A bronze helmet',
      'A silver laurel wreath'
    ],
    correctAnswer: 'A colorful Peacock feather (Mayur Pankh)',
    explanation: 'Krishna adorned his crown with a shed peacock feather presented to him by peacocks dancing in Vrindavan, celebrating natural beauty over manufactured gold.',
    socraticHint: 'Which colorful bird feather was tucked into Lord Krishna\'s crown?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-012',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'How does celebrating Janmashtami in Kenyan Hindu temples nurture joy, hospitality, and cultural diversity in Kenya?',
    text: 'How does celebrating Janmashtami in Kenyan Hindu temples nurture joy, hospitality, and cultural diversity in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Communities open temple doors to neighbors of all faiths, share prasadam (blessed food), celebrate children\'s talents, and foster inter-community harmony',
      'Temples lock their gates and refuse entry to non-members',
      'Only adults are permitted to attend festivities',
      'Celebrations focus entirely on commercial advertising'
    ],
    correctAnswer: 'Communities open temple doors to neighbors of all faiths, share prasadam (blessed food), celebrate children\'s talents, and foster inter-community harmony',
    explanation: 'Janmashtami brings together people of diverse Kenyan backgrounds to experience sacred music, dramatic performances, and communal meals, building bridges of national goodwill.',
    socraticHint: 'How do open festive celebrations and shared meals bring Kenyan communities closer together?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },

  // --- Unit 4 Lesson 2: Govardhan Ecology and Gopala Guardian Quest (q-g5-hre-u4-013 to 024) ---
  {
    id: 'q-g5-hre-u4-013',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'Why did young Krishna convince the residents of Braj to stop offering their traditional sacrifice to the rain god Indra?',
    text: 'Why did young Krishna convince the residents of Braj to stop offering their traditional sacrifice to the rain god Indra?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He taught them to express practical gratitude to Mount Govardhan, the green pastures, streams, and cows that directly nourish their daily lives',
      'He wanted them to offer the food directly to King Kamsa instead',
      'He claimed that rain is unnecessary for agriculture',
      'He instructed them to stop all forms of farming'
    ],
    correctAnswer: 'He taught them to express practical gratitude to Mount Govardhan, the green pastures, streams, and cows that directly nourish their daily lives',
    explanation: 'Krishna redirected their focus away from ritual fear toward ecological gratitude: honoring the mountain that feeds their cattle, catches rain clouds, and gives sweet water.',
    socraticHint: 'Why did Krishna advise worshipping the mountain and forests that directly sustain their community instead of ritual superstition?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-014',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'How did Lord Indra react when the villagers worshipped Mount Govardhan instead of him?',
    text: 'How did Lord Indra react when the villagers worshipped Mount Govardhan instead of him?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He was overcome with anger and pride, sending torrential storms, thunder, and relentless rain to flood and destroy the village',
      'He sent sweet mangoes and honey to congratulate the villagers',
      'He smiled and joined the villagers in singing songs',
      'He stepped down from his celestial throne immediately'
    ],
    correctAnswer: 'He was overcome with anger and pride, sending torrential storms, thunder, and relentless rain to flood and destroy the village',
    explanation: 'Blinded by wounded pride (Ahankara), Indra ordered the ferocious Samvartaka storm clouds to flood Braj with terrifying thunder and hail.',
    socraticHint: 'How did injured pride lead Indra to retaliate with destructive rainstorms?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-015',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What miraculous act did seven-year-old Krishna perform to protect the terrified villagers and animals from Indra\'s deluge?',
    text: 'What miraculous act did seven-year-old Krishna perform to protect the terrified villagers and animals from Indra\'s deluge?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He lifted the entire Mount Govardhan upon the little finger of his left hand and held it aloft like a giant umbrella',
      'He built a huge wooden ark in three minutes',
      'He commanded the villagers to dive into a deep well',
      'He blew the storm clouds away with a single breath'
    ],
    correctAnswer: 'He lifted the entire Mount Govardhan upon the little finger of his left hand and held it aloft like a giant umbrella',
    explanation: 'Krishna effortlessly lifted Mount Govardhan on his little finger, providing a dry, safe haven beneath it for all villagers and livestock for seven days and nights.',
    socraticHint: 'Which finger did young Krishna use to balance the entire mountain like a massive umbrella?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-016',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'For how many days and nights did Lord Krishna hold Mount Govardhan aloft until Indra\'s pride was subdued?',
    text: 'For how many days and nights did Lord Krishna hold Mount Govardhan aloft until Indra\'s pride was subdued?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Seven days and seven nights',
      'Forty days and forty nights',
      'One single afternoon',
      'One full year'
    ],
    correctAnswer: 'Seven days and seven nights',
    explanation: 'For seven continuous days and nights, young Krishna stood serene and unwavering, sheltering the entire community under the hill until Indra conceded defeat.',
    socraticHint: 'Count the days of the week: how many days did the divine shelter last?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-017',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What title was bestowed upon Lord Krishna after this event, meaning "the lifter and upholder of Mount Govardhan"?',
    text: 'What title was bestowed upon Lord Krishna after this event, meaning "the lifter and upholder of Mount Govardhan"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Govardhanadhari (or Giridhari)',
      'Gangadhara',
      'Chakradhari',
      'Trishuldhari'
    ],
    correctAnswer: 'Govardhanadhari (or Giridhari)',
    explanation: '"Govardhana-dhari" or "Giri-dhari" means "the bearer/upholder of the mountain," honoring Krishna’s role as the divine protector who shelters the humble.',
    socraticHint: 'Which title translates as "the lifter of the mountain (Giri)"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-018',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What did Lord Indra do when he realized that young Krishna was the Supreme Lord and that his own storm had failed?',
    text: 'What did Lord Indra do when he realized that young Krishna was the Supreme Lord and that his own storm had failed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He brought his celestial cow Kamadhenu, prostrated at Krishna\'s feet, confessed his arrogance, and pleaded for forgiveness',
      'He fled to another galaxy and refused to speak again',
      'He challenged Krishna to a duel with thunderbolts',
      'He commanded his storm clouds to double their rain'
    ],
    correctAnswer: 'He brought his celestial cow Kamadhenu, prostrated at Krishna\'s feet, confessed his arrogance, and pleaded for forgiveness',
    explanation: 'Humbled of his vanity, Indra bowed low before Krishna, offering prayers of repentance and anointing Krishna with milk as "Govinda" (the Lord of all beings and cows).',
    socraticHint: 'How did Indra acknowledge his mistake and seek forgiveness from Lord Krishna?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-019',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What annual festival is observed the day after Diwali to commemorate the lifting of Mount Govardhan and gratitude to nature?',
    text: 'What annual festival is observed the day after Diwali to commemorate the lifting of Mount Govardhan and gratitude to nature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Govardhan Puja (also celebrated as Annakut)',
      'Holi',
      'Raksha Bandhan',
      'Guru Purnima'
    ],
    correctAnswer: 'Govardhan Puja (also celebrated as Annakut)',
    explanation: 'Govardhan Puja (Annakut - "mountain of food") is celebrated the day after Diwali, where communities offer elaborate vegetarian dishes in gratitude to God and nature.',
    socraticHint: 'Which festival specifically named after Mount Govardhan follows immediately after Diwali?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-020',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What does the offering of "Annakut" (a mountain of prepared vegetarian dishes) during Govardhan Puja symbolize?',
    text: 'What does the offering of "Annakut" (a mountain of prepared vegetarian dishes) during Govardhan Puja symbolize?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Heartfelt thanksgiving to the Earth, crops, and Paramatma for providing abundant food that sustains all living beings',
      'A competition to see who can eat the most sweets in an hour',
      'An offering made only to impress foreign tourists',
      'A method of storing food for commercial resale'
    ],
    correctAnswer: 'Heartfelt thanksgiving to the Earth, crops, and Paramatma for providing abundant food that sustains all living beings',
    explanation: 'Annakut represents profound gratitude to Mother Earth and the Divine for the agricultural harvest and provisions that feed humankind and all creatures.',
    socraticHint: 'How does presenting an abundance of harvested grains symbolize gratitude to Mother Earth?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-021',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'How does the Govardhan narrative promote the conservation of hills and mountain water catchment towers in Kenya (such as Mount Kenya and Aberdares)?',
    text: 'How does the Govardhan narrative promote the conservation of hills and mountain water catchment towers in Kenya (such as Mount Kenya and Aberdares)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It teaches that mountains and upland forests are vital water towers that capture rain, feed rivers, and nurture agriculture, demanding our protection against deforestation',
      'It suggests that hills should be flattened to make building roads easier',
      'It implies that mountains have no effect on local climate or farming',
      'It encourages mining and blasting all mountain slopes'
    ],
    correctAnswer: 'It teaches that mountains and upland forests are vital water towers that capture rain, feed rivers, and nurture agriculture, demanding our protection against deforestation',
    explanation: 'Kenya’s "water towers" (Mount Kenya, Mau, Aberdares) feed rivers that sustain our nation; honoring Mount Govardhan reflects the same sacred duty to preserve mountain watersheds.',
    socraticHint: 'Why must mountain forests and catchment towers be protected from deforestation to sustain farming and rivers below?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-022',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What did the fellow cowherds (Gopas) do when they saw young Krishna holding up the mountain on his finger?',
    text: 'What did the fellow cowherds (Gopas) do when they saw young Krishna holding up the mountain on his finger?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They lovingly held up their wooden walking sticks against the mountain base to help support the weight, showing their solidarity and devotion',
      'They ran away in fear and left Krishna alone',
      'They laughed and threw pebbles at the mountain',
      'They demanded that Krishna put the mountain down immediately'
    ],
    correctAnswer: 'They lovingly held up their wooden walking sticks against the mountain base to help support the weight, showing their solidarity and devotion',
    explanation: 'The cowherds placed their walking sticks beneath the rock, wanting to share Krishna\'s effort. Krishna appreciated their sincere love and cooperation.',
    socraticHint: 'How did the simple cowherds use their wooden herding sticks to show their desire to help?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-023',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'How does the cowherds placing their walking sticks under Mount Govardhan reflect Kenya\'s national philosophy of "Harambee"?',
    text: 'How does the cowherds placing their walking sticks under Mount Govardhan reflect Kenya\'s national philosophy of "Harambee"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It demonstrates that when a community unites, pooling everyone’s humble effort together, they overcome overwhelming crises and achieve greatness',
      'It means that only strong people should do community work',
      'It suggests that people should only help when they are paid cash',
      'It shows that teamwork is unnecessary when one person is strong'
    ],
    correctAnswer: 'It demonstrates that when a community unites, pooling everyone’s humble effort together, they overcome overwhelming crises and achieve greatness',
    explanation: 'Harambee ("let us pull together") is mirrored in the Gopas\' sticks: even if the Divine upholds the mountain, collective human solidarity and mutual aid are deeply noble.',
    socraticHint: 'How does pooling all community efforts together (Harambee) help solve massive challenges?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  },
  {
    id: 'q-g5-hre-u4-024',
    subStrandId: 'substrand-g5-hre-u4',
    prompt: 'What ultimate life lesson does a Grade 5 pupil take from Lord Krishna’s defeat of King Kamsa and protection of the innocent?',
    text: 'What ultimate life lesson does a Grade 5 pupil take from Lord Krishna’s defeat of King Kamsa and protection of the innocent?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Arrogance, bullying, and oppression will inevitably fall, while humility, righteousness (Dharma), and innocent truth will always triumph',
      'Cruel bullies always stay in power permanently',
      'Physical weapons are more powerful than moral truth',
      'One should never defend innocent friends who are being bullied'
    ],
    correctAnswer: 'Arrogance, bullying, and oppression will inevitably fall, while humility, righteousness (Dharma), and innocent truth will always triumph',
    explanation: 'The triumph over Kamsa establishes that however powerful tyranny and arrogance appear, Dharma inevitably prevails, inspiring learners to stand up fearlessly for justice.',
    socraticHint: 'Does arrogance and bullying win in the end, or does truth and moral justice prevail?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U4'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 2 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
