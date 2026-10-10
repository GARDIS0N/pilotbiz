/**
 * Grade 6 Hindu Religious Education (HRE) - Batch 2 Generator
 * Content: Units 3 & 4 (The Bhagavad Gita & Kurukshetra; The Ramayana & Triumph of Dharma)
 * Missions: Orders 153, 154, 155, 156 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-hre-u3-001 to q-g6-hre-u4-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 HRE Batch 2 (Units 3 & 4) ---');

// 1. Units 3 & 4 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-hre-u3',
    strandId: 'strand-g6-hre-scriptures',
    learningAreaId: 'la-hre-g6',
    title: 'The Bhagavad Gita: Kurukshetra, Nishkama Karma & Equanimity (Samatvam)',
    name: 'The Bhagavad Gita: Kurukshetra, Nishkama Karma & Equanimity (Samatvam)',
    description: 'Profound philosophical guidance from the Bhagavad Gita (the Song of God): The battlefield setting of Kurukshetra between the Pandavas and Kauravas; Arjuna’s deep sorrow, inner moral conflict, and dejection (Vishada); Lord Krishna assuming the role of the Divine Charioteer (Parthasarathi) delivering divine wisdom; core concepts of Swadharma (one’s righteous duty according to station); Nishkama Karma (performing duty selflessly without selfish fixation on fruits/rewards - Chapter 2, Verse 47: "Karmanye vadikaraste ma phaleshu kadachana"); Samatvam (equanimity of mind across success and failure, pleasure and pain); and the ideals of a Sthitaprajna (a person of steady, undisturbed spiritual wisdom).',
    cbeCompetency: 'Textual analysis, philosophical reasoning, emotional self-regulation, and selfless duty',
    estimatedMinutes: 30,
    order: 3,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-hre-u4',
    strandId: 'strand-g6-hre-scriptures',
    learningAreaId: 'la-hre-g6',
    title: 'The Ramayana: Dharma, Loyalty, Servant Leadership & Triumph over Ego',
    name: 'The Ramayana: Dharma, Loyalty, Servant Leadership & Triumph over Ego',
    description: 'The timeless epic composed by Sage Valmiki: Lord Rama as Maryada Purushottama (the ideal human being personifying Dharma); filial duty and honouring parents (accepting 14 years in exile to honor King Dasharatha’s word); Sita’s steadfast virtue and spiritual fortitude; Lakshmana’s selfless service and Bharata’s righteous stewardship (placing Rama’s wooden sandals/Padukas on the throne of Ayodhya); Lord Hanuman as the supreme embodiment of Bhakti (devotion), humility, intelligence, and selfless servant leadership; Jatayu’s noble sacrifice defending Sita against Ravana; Ravana’s downfall illustrating how intellectual brilliance turns destructive when corrupted by pride, greed, and ego (Ahankara); and the supreme triumph of Dharma over Adharma.',
    cbeCompetency: 'Ethical leadership, family solidarity, humility, and moral resilience',
    estimatedMinutes: 30,
    order: 4,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-hre-u3-l1',
    subStrandId: 'substrand-g6-hre-u3',
    title: 'The Setting of Kurukshetra & Arjuna’s Dilemma: The Call to Duty',
    content: 'The Bhagavad Gita (The Song of the Divine) consists of 700 verses in 18 chapters within the great epic Mahabharata.\n\n1. The Battlefield of Kurukshetra:\n- Two branches of the Kuru dynasty faced each other: the virtuous Pandavas led by Yudhishthira and the deceitful Kauravas led by Duryodhana.\n- As the conch shells sounded for war, the heroic Pandava archer Arjuna asked his chariot driver, Lord Krishna, to position their chariot between the two opposing armies.\n\n2. Arjuna’s Moral Crisis (Vishada Yoga):\n- Seeing beloved grandfathers (Bhishma), mentors (Drona), uncles, and cousins lined up to fight, Arjuna was overwhelmed by intense grief, confusion, and despair.\n- He dropped his Gandiva bow and refused to fight, unable to resolve the conflict between family attachment and the warrior’s duty to uphold justice.\n\n3. Lord Krishna as Parthasarathi (Divine Charioteer):\n- Krishna gently urged Arjuna to arise from paralyzing weakness: "Do not yield to unmanliness, O son of Pritha! Arise and stand firm for Dharma!"\n- The chariot represents the human body, the horses symbolize the five senses, the reins represent the mind, Arjuna represents the individual soul (Jiva), and Krishna represents the Divine Intellect and inner guide (Antaryamin).',
    didYouKnow: 'The Bhagavad Gita was spoken on the battlefield of Kurukshetra just before the war began, teaching that spiritual wisdom is meant to guide real-world challenges, not just quiet ashrams!',
    kenyanContext: 'Kenyan students often face difficult choices when friends engage in peer pressure or academic cheating; like Arjuna, they must seek wise counsel and stand courageously for what is right.',
    order: 5,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u3-l2',
    subStrandId: 'substrand-g6-hre-u3',
    title: 'Nishkama Karma, Samatvam Yoga & The Sthitaprajna Ideal',
    content: 'The core practical philosophy of the Bhagavad Gita teaches how to act in the world while preserving spiritual freedom and mental peace.\n\n1. Nishkama Karma (Action Without Selfish Attachment):\n- Chapter 2, Verse 47 is the most celebrated verse in the Gita:\n  "Karmanye vadikaraste ma phaleshu kadachana;\n   Ma karmaphalahetur bhur ma te sango stvakarmani."\n  Meaning: "You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results, nor be attached to inaction."\n- When we focus 100% on performing our task with excellence and offer the results to God, anxiety disappears and productivity increases dramatically.\n\n2. Samatvam (Equanimity of Mind):\n- Lord Krishna defines Yoga: "Samatvam Yoga Uchyate" (Yoga is equanimity of mind).\n- Maintaining calm balance in success and defeat, praise and blame, joy and sorrow.\n\n3. Characteristics of a Sthitaprajna (Person of Steady Wisdom):\n- Remains unshakeable in adversity and free from arrogant excitement in prosperity.\n- Master of their senses, like a tortoise retracting its limbs into its protective shell.\n- Radiates compassion, contentment, and unconditional goodwill to all living beings.',
    didYouKnow: 'Mahatma Gandhi described the Bhagavad Gita as his "spiritual dictionary", reading from it daily to maintain non-violent composure during the struggle for freedom!',
    kenyanContext: 'When sitting for national assessments, Kenyan learners practice Nishkama Karma by revising thoroughly and giving their best effort without paralyzing exam anxiety.',
    order: 6,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u4-l1',
    subStrandId: 'substrand-g6-hre-u4',
    title: 'Lord Rama: The Ideal Person (Maryada Purushottama) & Fraternal Devotion',
    content: 'The Ramayana, composed by Sage Valmiki, illustrates how Dharma is lived out in family life, governance, and adversity.\n\n1. Maryada Purushottama (The Embodiment of Righteousness):\n- Lord Rama exemplifies the ideal son, brother, husband, leader, and friend.\n- When Queen Kaikeyi asked King Dasharatha to exile Rama to the forest for 14 years, Rama willingly accepted without anger or resentment to preserve his father’s sacred promise (Satya).\n\n2. Sita’s Courage and Devotion:\n- Sita chose to accompany Rama into the rough wilderness, proving that true love and partnership mean standing together in trials, not merely enjoying palaces.\n\n3. Fraternal Love of Lakshmana and Bharata:\n- Lakshmana served Rama and Sita tirelessly in the forest for 14 years without sleeping properly.\n- Bharata refused the kingdom of Ayodhya when his mother sought it for him. He journeyed to the forest, placed Rama’s sacred wooden sandals (Padukas) upon the throne, and ruled selflessly as a humble trustee until Rama returned.\n\n4. Lessons for Family Harmony:\n- Sacrifice and mutual respect strengthen family bonds, while greed and jealousy destroy lineages.',
    didYouKnow: 'The epic Ramayana contains 24,000 verses organized into seven books (Kandas), originating as oral poetry sung by Rama’s twin sons, Lava and Kusha!',
    kenyanContext: 'The devotion among the four brothers in the Ramayana teaches Kenyan families that sibling solidarity and integrity are far more precious than fighting over land or wealth.',
    order: 7,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u4-l2',
    subStrandId: 'substrand-g6-hre-u4',
    title: 'Hanuman’s Humble Sewa, Jatayu’s Courage & The Fall of Ravana',
    content: 'The climax of the Ramayana showcases how devotion and moral courage triumph over unchecked ego.\n\n1. Lord Hanuman: The Ideal Devotee and Servant Leader:\n- Hanuman possessed immense physical strength, scholarship, and supernatural powers, yet he lived in absolute humility, identifying only as "Rama-dasa" (servant of Rama).\n- When searching for Mother Sita in Lanka, he leaped across the ocean through unwavering faith in Rama’s name.\n- He delivered hope to Sita in the Ashoka grove and brought the life-saving Sanjeevani herb from the Himalayas to revive Lakshmana.\n\n2. Jatayu’s Sacrifice for Justice:\n- The elderly vulture king Jatayu witnessed the evil demon king Ravana abducting Sita. Though outmatched in weapons, Jatayu courageously fought Ravana with his beak and talons to protect an innocent woman, sacrificing his life for righteousness.\n- Lord Rama lovingly performed Jatayu’s last funeral rites as if he were his own father.\n\n3. The Fall of Ravana & The Danger of Ego (Ahankara):\n- Ravana was a brilliant Vedic scholar and formidable king, but pride, lust, and arrogance corrupted his virtues, leading to total destruction.\n- The ultimate victory of Rama over Ravana signifies that no matter how mighty Adharma appears, Dharma always prevails in the end.',
    didYouKnow: 'Lord Rama remarked that Hanuman was an extraordinary master of grammar and diplomacy because every word he spoke was polite, accurate, concise, and uplifting!',
    kenyanContext: 'Jatayu’s defense of Sita inspires Kenyan learners to stand up bravely against bullying and protect vulnerable classmates from harm.',
    order: 8,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 153, 154, 155, 156 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-hre-u3-m1',
    worldId: 'world-faith-values',
    title: 'Mission 153: The Chariot of Wisdom – Kurukshetra & Arjuna’s Dilemma',
    description: 'Enter the battlefield of Kurukshetra, analyze Arjuna’s moral crisis, understand Krishna as the Divine Charioteer, and decode the chariot symbolism.',
    order: 153,
    orderIndex: 153,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-gita-charioteer',
    badge: 'badge-g6-hre-gita-charioteer',
    lessonId: 'lesson-g6-hre-u3-l1',
    questionIds: [
      'q-g6-hre-u3-001', 'q-g6-hre-u3-002', 'q-g6-hre-u3-003', 'q-g6-hre-u3-004',
      'q-g6-hre-u3-005', 'q-g6-hre-u3-006', 'q-g6-hre-u3-007', 'q-g6-hre-u3-008',
      'q-g6-hre-u3-009', 'q-g6-hre-u3-010', 'q-g6-hre-u3-011', 'q-g6-hre-u3-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u3-m2',
    worldId: 'world-faith-values',
    title: 'Mission 154: The Art of Action – Nishkama Karma & The Sthitaprajna Mind',
    description: 'Master the famous Verse 2:47 on duty without fruit attachment, practice Samatvam equanimity, and emulate the steady wisdom of a Sthitaprajna.',
    order: 154,
    orderIndex: 154,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-nishkama-karma',
    badge: 'badge-g6-hre-nishkama-karma',
    lessonId: 'lesson-g6-hre-u3-l2',
    questionIds: [
      'q-g6-hre-u3-013', 'q-g6-hre-u3-014', 'q-g6-hre-u3-015', 'q-g6-hre-u3-016',
      'q-g6-hre-u3-017', 'q-g6-hre-u3-018', 'q-g6-hre-u3-019', 'q-g6-hre-u3-020',
      'q-g6-hre-u3-021', 'q-g6-hre-u3-022', 'q-g6-hre-u3-023', 'q-g6-hre-u3-024'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u4-m1',
    worldId: 'world-faith-values',
    title: 'Mission 155: The Ideal Soul – Lord Rama, Sita & Fraternal Loyalty',
    description: 'Explore Maryada Purushottama, Rama’s exile for parental truth, Sita’s fortitude, and the selfless governance of Bharata through Rama’s Padukas.',
    order: 155,
    orderIndex: 155,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-ramayana-dharma',
    badge: 'badge-g6-hre-ramayana-dharma',
    lessonId: 'lesson-g6-hre-u4-l1',
    questionIds: [
      'q-g6-hre-u4-001', 'q-g6-hre-u4-002', 'q-g6-hre-u4-003', 'q-g6-hre-u4-004',
      'q-g6-hre-u4-005', 'q-g6-hre-u4-006', 'q-g6-hre-u4-007', 'q-g6-hre-u4-008',
      'q-g6-hre-u4-009', 'q-g6-hre-u4-010', 'q-g6-hre-u4-011', 'q-g6-hre-u4-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u4-m2',
    worldId: 'world-faith-values',
    title: 'Mission 156: Courage and Humility – Hanuman, Jatayu & Triumph of Dharma',
    description: 'Learn servant leadership from Hanuman, chivalrous courage from Jatayu, understand the fatal flaw of Ravana’s ego, and celebrate Dharma’s victory.',
    order: 156,
    orderIndex: 156,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-hanuman-sewa',
    badge: 'badge-g6-hre-hanuman-sewa',
    lessonId: 'lesson-g6-hre-u4-l2',
    questionIds: [
      'q-g6-hre-u4-013', 'q-g6-hre-u4-014', 'q-g6-hre-u4-015', 'q-g6-hre-u4-016',
      'q-g6-hre-u4-017', 'q-g6-hre-u4-018', 'q-g6-hre-u4-019', 'q-g6-hre-u4-020',
      'q-g6-hre-u4-021', 'q-g6-hre-u4-022', 'q-g6-hre-u4-023', 'q-g6-hre-u4-024'
    ],
    learningAreaId: 'la-hre-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 3 Questions (q-g6-hre-u3-001 to q-g6-hre-u3-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u3-001',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'How many verses and chapters make up the sacred text of the Bhagavad Gita?',
    options: ['700 verses in 18 chapters', '500 verses in 10 chapters', '1,000 verses in 24 chapters', '108 verses in 4 chapters'],
    correctAnswer: '700 verses in 18 chapters',
    explanation: 'The Bhagavad Gita is comprised of 700 Sanskrit verses organized across 18 philosophical chapters within the Bhishma Parva of the Mahabharata.',
    socraticHint: 'Recall the classic structure: seven hundred verses distributed across eighteen chapters.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-002',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'On which historical battlefield did the dialogue of the Bhagavad Gita take place?',
    options: ['Kurukshetra', 'Ayodhya', 'Lanka', 'Dwaraka'],
    correctAnswer: 'Kurukshetra',
    explanation: 'The great war between the Pandavas and Kauravas took place on the holy field of Kurukshetra (Dharmakshetre Kurukshetre).',
    socraticHint: 'What is the name of the sacred plains of northern India where the Mahabharata battle was fought?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-003',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'Why did Arjuna drop his Gandiva bow and refuse to fight at the opening of the Kurukshetra battle?',
    options: [
      'He was overwhelmed with grief and emotional confusion seeing his revered elders, teachers, and kinsmen on the enemy side',
      'His chariot horses were injured and tired',
      'He had lost his physical eyesight',
      'He was secretly bribed by Duryodhana'
    ],
    correctAnswer: 'He was overwhelmed with grief and emotional confusion seeing his revered elders, teachers, and kinsmen on the enemy side',
    explanation: 'Arjuna suffered profound sorrow (Vishada) upon seeing Grandfather Bhishma and Teacher Drona facing him, feeling that killing loved ones was unacceptable.',
    socraticHint: 'What deep sorrow overwhelmed Arjuna when looking across at beloved relatives and teachers?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-004',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'What special title is given to Lord Krishna when acting as the divine chariot driver for Arjuna?',
    options: ['Parthasarathi', 'Govinda', 'Madhusudana', 'Damodara'],
    correctAnswer: 'Parthasarathi',
    explanation: 'Parthasarathi literally means "the charioteer (Sarathi) of Partha (Arjuna, son of Pritha)", symbolizing the Lord guiding the sincere seeker.',
    socraticHint: 'Which Sanskrit compound means the charioteer of Partha (Arjuna)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-005',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'In the spiritual allegory of the chariot in the Katha Upanishad and Gita, what do the galloping horses represent?',
    options: [
      'The five human senses (hearing, touch, sight, taste, smell)',
      'The physical organs of action',
      'The five oceans of the world',
      'The seasons of the year'
    ],
    correctAnswer: 'The five human senses (hearing, touch, sight, taste, smell)',
    explanation: 'In the chariot allegory, the horses represent the senses, which must be gently reined in by the mind to follow the intellect’s guidance.',
    socraticHint: 'Which sensory faculties pull the human mind toward external material attractions?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-006',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'In the chariot allegory, what do the reins (held by the charioteer) represent?',
    options: ['The mind (Manas)', 'The physical skin', 'The weapons', 'The food eaten'],
    correctAnswer: 'The mind (Manas)',
    explanation: 'The reins represent the mind; when the mind is controlled by the discerning intellect (Buddhi), the senses are guided steadily on the righteous path.',
    socraticHint: 'What instrument connects the charioteer’s hands to the galloping horses?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-007',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'What did Lord Krishna urge Arjuna to do when he saw him weeping in despair on the chariot floor?',
    options: [
      '"Cast off this petty faint-heartedness, arise and stand firm for duty!"',
      '"Flee into the jungle and become an ascetic"',
      '"Surrender your weapons to Duryodhana"',
      '"Join the Kaurava army as a foot soldier"'
    ],
    correctAnswer: '"Cast off this petty faint-heartedness, arise and stand firm for duty!"',
    explanation: 'Krishna urged: "Klaibyam ma sma gamah Partha..." reminding Arjuna that retreating from righteous duty out of weakness is not virtue, but cowardice.',
    socraticHint: 'Did Krishna encourage running away from challenges or standing up courageously for justice?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-008',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'What does the concept of "Swadharma" mean in the Bhagavad Gita?',
    options: [
      'One’s own unique righteous duty and moral responsibilities in accordance with one’s nature',
      'The religious beliefs of foreign travelers',
      'Rules created exclusively for temple priests',
      'Doing whatever feels easy in the moment'
    ],
    correctAnswer: 'One’s own unique righteous duty and moral responsibilities in accordance with one’s nature',
    explanation: 'Swadharma is one’s personal sacred duty; Krishna taught that fulfilling one’s own duty, even imperfectly, is far better than undertaking another’s duty (3:35).',
    socraticHint: 'The prefix "Swa-" means own or personal.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-009',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'Who granted divine cosmic vision (Divya Drishti) to Arjuna to behold the universal form (Vishwaroopa) of God?',
    options: ['Lord Krishna', 'Sage Vyasa', 'King Dhritarashtra', 'Sanjaya'],
    correctAnswer: 'Lord Krishna',
    explanation: 'In Chapter 11, Lord Krishna bestowed divine spiritual sight (Divya Drishti) upon Arjuna so he could witness the magnificent, infinite Vishwaroopa.',
    socraticHint: 'Which divine friend gave Arjuna spiritual vision in Chapter 11?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-010',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'Who narrated the events of Kurukshetra live to the blind King Dhritarashtra in the royal palace of Hastinapura?',
    options: ['Sanjaya', 'Vidura', 'Karna', 'Shakuni'],
    correctAnswer: 'Sanjaya',
    explanation: 'Sage Vyasa blessed the royal charioteer Sanjaya with clairvoyant telepathic vision, allowing him to report all happenings on Kurukshetra to King Dhritarashtra.',
    socraticHint: 'Identify Dhritarashtra’s loyal advisor endowed with divine distant vision.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-011',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'What major life lesson does the setting of the Bhagavad Gita on a battlefield teach young people today?',
    options: [
      'Spiritual wisdom is meant for practical action in daily life challenges, not just for retreating into quiet solitude',
      'People should look for physical battles to settle family arguments',
      'Archery is the only acceptable career choice',
      'Religious scriptures only apply to ancient royalty'
    ],
    correctAnswer: 'Spiritual wisdom is meant for practical action in daily life challenges, not just for retreating into quiet solitude',
    explanation: 'By taking place in the midst of turmoil rather than an isolated cave, the Gita proves that inner peace and ethical clarity are essential tools for active living.',
    socraticHint: 'Why did the dialogue occur in the middle of noise and conflict instead of an isolated forest?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-012',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l1',
    text: 'What bow did Arjuna carry as his primary weapon during the Kurukshetra battle?',
    options: ['Gandiva', 'Pinaka', 'Sharanga', 'Vijaya'],
    correctAnswer: 'Gandiva',
    explanation: 'Gandiva was the invincible celestial bow gifted to Arjuna by Agni, the fire god, which Arjuna dropped during his moments of grief.',
    socraticHint: 'Which famous divine bow slipped from Arjuna’s trembling fingers?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u3-013',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What core teaching is summarized in Chapter 2, Verse 47 of the Bhagavad Gita: "Karmanye vadikaraste ma phaleshu kadachana"?',
    options: [
      'You have the right to perform your duty, but not to claim the fruits of your action',
      'You should only work if you are guaranteed a high financial reward first',
      'You should avoid doing any work at all',
      'Only kings have the right to make decisions'
    ],
    correctAnswer: 'You have the right to perform your duty, but not to claim the fruits of your action',
    explanation: 'This verse establishes Nishkama Karma: focus wholeheartedly on performing your action with skill and devotion, without anxious obsession over the results.',
    socraticHint: 'Focus on fulfilling your responsibility without worrying obsessively about the rewards.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-014',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What is the term for selfless action performed as an offering to God without attachment to personal praise or reward?',
    options: ['Nishkama Karma', 'Sakama Karma', 'Vikarma', 'Akarma'],
    correctAnswer: 'Nishkama Karma',
    explanation: 'Nishkama Karma means desireless action (Nish- = without, Kama = selfish desire); working purely out of duty and love for God and humanity.',
    socraticHint: 'The prefix "Nish-" means without, and "Kama" means selfish desire or attachment.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-015',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What does Lord Krishna define as Yoga in Chapter 2, Verse 48: "Samatvam Yoga Uchyate"?',
    options: [
      'Yoga is equanimity and balance of mind in all circumstances',
      'Yoga is bending the body into difficult physical contortions',
      'Yoga is holding one’s breath underwater',
      'Yoga is fasting for twenty days without food'
    ],
    correctAnswer: 'Yoga is equanimity and balance of mind in all circumstances',
    explanation: '"Samatvam Yoga Uchyate" means evenness of mind—maintaining serene mental balance in success and defeat, joy and sorrow.',
    socraticHint: 'What quality of inner balance and calmness does "Samatvam" designate?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-016',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What famous phrase in Chapter 2, Verse 50 defines Yoga as excellence and efficiency in action?',
    options: [
      '"Yogah Karmasu Kaushalam" (Yoga is skill and excellence in action)',
      '"Satyam Eva Jayate"',
      '"Ahimsa Paramo Dharmah"',
      '"Dharmo Rakshati Rakshitah"'
    ],
    correctAnswer: '"Yogah Karmasu Kaushalam" (Yoga is skill and excellence in action)',
    explanation: 'Krishna teaches that true yoga is not escaping work, but performing duties with supreme dedication, craftsmanship, and pure motivation.',
    socraticHint: 'Which quote affirms that performing work skillfully and mindfully is yoga?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-017',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What is a person of steady, unshakable spiritual wisdom called in the Bhagavad Gita?',
    options: ['Sthitaprajna', 'Brahmachari', 'Vanaprastha', 'Pandita'],
    correctAnswer: 'Sthitaprajna',
    explanation: 'A Sthitaprajna is one whose intellect (Prajna) is firmly established (Sthita) in the Divine, undisturbed by pleasure, pain, fear, or anger.',
    socraticHint: 'Which Sanskrit term combines "Sthita" (steady) and "Prajna" (wisdom)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-018',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'To which creature does Lord Krishna compare a wise person who withdraws their senses from harmful temptations?',
    options: ['A tortoise pulling its limbs into its shell', 'A lion hunting prey', 'An eagle flying in the sky', 'A fish swimming in a river'],
    correctAnswer: 'A tortoise pulling its limbs into its shell',
    explanation: 'Just as a tortoise draws its head and limbs safely inside its shell when danger threatens, the wise person effortlessly controls their senses.',
    socraticHint: 'Which shelled creature retracts all its limbs when protecting itself?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-019',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'How does practicing Nishkama Karma help a Grade 6 learner during sports competitions?',
    options: [
      'They play with maximum teamwork, joy, and skill without being paralyzed by fear of losing',
      'They refuse to run because results do not matter',
      'They blame their teammates when they do not win',
      'They celebrate arrogantly when opposing players fall'
    ],
    correctAnswer: 'They play with maximum teamwork, joy, and skill without being paralyzed by fear of losing',
    explanation: 'By focusing fully on playing with dedication and sportsmanship rather than obsessing over the trophy, the student stays calm, plays better, and enjoys the game.',
    socraticHint: 'How does letting go of outcome anxiety improve performance in games?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-020',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What danger does Lord Krishna warn about when a person constantly broods on material sensory objects (Chapter 2, Verses 62-63)?',
    options: [
      'Attachment arises, from attachment comes desire, from thwarted desire comes anger, anger leads to delusion, and delusion destroys intellect',
      'They immediately gain great wealth',
      'Their memory improves tenfold',
      'They become immune to all physical illness'
    ],
    correctAnswer: 'Attachment arises, from attachment comes desire, from thwarted desire comes anger, anger leads to delusion, and delusion destroys intellect',
    explanation: 'Krishna maps the psychological ladder of downfall: brooding breeds attachment, attachment breeds desire, unfulfilled desire causes rage, leading to loss of memory and ruin.',
    socraticHint: 'Trace the progressive psychological chain from brooding to anger and mental ruin.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-021',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'Why does the Bhagavad Gita strictly advise AGAINST inaction (Akarma / laziness)?',
    options: [
      'Because no living being can remain actionless even for a moment, and inaction leads to mental stagnation and decay',
      'Because physical labor is the only way to earn food',
      'Because angels punish people who rest',
      'Because books should never be closed'
    ],
    correctAnswer: 'Because no living being can remain actionless even for a moment, and inaction leads to mental stagnation and decay',
    explanation: 'Krishna reminds Arjuna that life inherently demands action: the body requires work to function, and sitting idly while the mind wanders is hypocritical.',
    socraticHint: 'Can any human being truly stop all action and thinking even for a single second?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-022',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What assurance does Lord Krishna give in Chapter 9, Verse 22 to those who constantly remember and worship the Divine with devotion?',
    options: [
      '"I personally carry what they lack and preserve what they have" (Yoga-kshemam vahamyaham)',
      '"I will make them rulers of foreign lands"',
      '"They will never experience physical hunger again"',
      '"They will never have to study or work"'
    ],
    correctAnswer: '"I personally carry what they lack and preserve what they have" (Yoga-kshemam vahamyaham)',
    explanation: '"Tesham nityabhiyuktanam yoga-kshemam vahamyaham"—the Lord promises that for devotees who look to Him with single-minded love, He provides and protects their welfare.',
    socraticHint: 'Recall Krishna’s famous promise: "Yoga-kshemam vahamyaham".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-023',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What simple offerings does Lord Krishna gladly accept when offered with pure, loving devotion (Chapter 9, Verse 26)?',
    options: [
      'A leaf, a flower, a fruit, or even water (Patram, Pushpam, Phalam, Toyam)',
      'Large chests filled with gold and jewels',
      'Elaborate sacrifices requiring hundreds of cattle',
      'Silver coins minted by imperial courts'
    ],
    correctAnswer: 'A leaf, a flower, a fruit, or even water (Patram, Pushpam, Phalam, Toyam)',
    explanation: '"Patram pushpam phalam toyam yo me bhaktya prayacchati..."—God does not look at wealth or expense, but at the sincerity and loving purity of the devotee’s heart.',
    socraticHint: 'What humble, natural items from nature are accepted by God when offered with sincere love?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u3-024',
    subStrandId: 'substrand-g6-hre-u3',
    lessonId: 'lesson-g6-hre-u3-l2',
    text: 'What did Arjuna declare at the conclusion of the Bhagavad Gita in Chapter 18, Verse 73 after receiving Krishna’s divine wisdom?',
    options: [
      '"My illusion is destroyed; by Your grace I have regained my memory and stand firm, ready to do Your will!"',
      '"I will run away to the Himalayan peaks alone"',
      '"I still refuse to fight"',
      '"I want to consult the elders of Hastinapura again"'
    ],
    correctAnswer: '"My illusion is destroyed; by Your grace I have regained my memory and stand firm, ready to do Your will!"',
    explanation: '"Nashto mohah smritir labdha... karishye vachanam tava"—Arjuna’s confusion vanished, his courage was restored, and he took up his Gandiva bow to fight for Dharma.',
    socraticHint: 'How did Arjuna express his complete clarity and readiness to fulfill his duty?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // --- Unit 4 Questions (q-g6-hre-u4-001 to q-g6-hre-u4-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u4-001',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'Who is the author of the original Sanskrit epic, the Ramayana?',
    options: ['Sage Valmiki', 'Sage Vyasa', 'Sage Tulsidas', 'Sage Vashistha'],
    correctAnswer: 'Sage Valmiki',
    explanation: 'Sage Valmiki is revered as the Adi Kavi (the first poet) who composed the original Sanskrit epic Ramayana in sweet poetic meter.',
    socraticHint: 'Identify the Adi Kavi who authored the foundational Sanskrit Ramayana.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-002',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'What does the noble epithet "Maryada Purushottama" given to Lord Rama mean?',
    options: [
      'The ideal supreme human being who embodies the boundaries of moral duty and righteous conduct',
      'The wealthiest king of all ancient lands',
      'The fierce warrior who defeated all rivals',
      'The forest hermit who never spoke to anyone'
    ],
    correctAnswer: 'The ideal supreme human being who embodies the boundaries of moral duty and righteous conduct',
    explanation: 'Maryada Purushottama means "the supreme among men who strictly adheres to the limits of righteousness", personifying perfect filial love, leadership, and integrity.',
    socraticHint: 'Break down Maryada (boundaries of honor/conduct) and Purushottama (foremost among humans).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-003',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'For how many years was Lord Rama sent into exile into the Dandaka forest?',
    options: ['14 years', '12 years', '7 years', '20 years'],
    correctAnswer: '14 years',
    explanation: 'Queen Kaikeyi requested two boons from King Dasharatha: crowning Bharata as king and exiling Rama to the forest for 14 years.',
    socraticHint: 'Recall the exact duration of Rama’s forest exile.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-004',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'Why did Lord Rama immediately accept the exile to the forest without protest or bitterness?',
    options: [
      'To preserve his father King Dasharatha’s honor and sacred promise of truth (Satya)',
      'Because he hated living in palaces',
      'Because he was afraid of Queen Kaikeyi',
      'Because he wanted to hunt wild animals'
    ],
    correctAnswer: 'To preserve his father King Dasharatha’s honor and sacred promise of truth (Satya)',
    explanation: 'Rama prioritized honoring his father’s sworn word (Pitr-vachana palana), proving that integrity and filial duty surpass worldly power or royal thrones.',
    socraticHint: 'Why is upholding a parent’s promise of truth considered a sacred duty?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-005',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'Who accompanied Lord Rama into the forest out of selfless love and devotion?',
    options: ['Mother Sita and his brother Lakshmana', 'Bharata and Shatrughna', 'King Dasharatha and Kaikeyi', 'Sage Vashistha and royal courtiers'],
    correctAnswer: 'Mother Sita and his brother Lakshmana',
    explanation: 'Sita insisted on standing beside her husband through every hardship, and Lakshmana chose to serve them selflessly in the wild for the full 14 years.',
    socraticHint: 'Which devoted wife and loyal younger brother shared Rama’s 14-year exile?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-006',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'How did Prince Bharata respond when he discovered that his mother Kaikeyi had secured the throne for him by exiling Rama?',
    options: [
      'He rejected the throne in sorrow, went to the forest to plead for Rama’s return, and ruled Ayodhya as Rama’s humble trustee',
      'He celebrated with a grand royal party in Ayodhya',
      'He immediately ordered the arrest of Lakshmana',
      'He built a huge palace for himself'
    ],
    correctAnswer: 'He rejected the throne in sorrow, went to the forest to plead for Rama’s return, and ruled Ayodhya as Rama’s humble trustee',
    explanation: 'Bharata demonstrated extraordinary selflessness; he refused to wear the crown, bringing Rama’s wooden sandals back to rule as a faithful servant from outside the city.',
    socraticHint: 'Did Bharata seize the kingdom greedily, or did he refuse the crown out of brotherly love?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-007',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'What did Bharata place upon the royal throne of Ayodhya to symbolize that Lord Rama remained the rightful sovereign ruler?',
    options: ['Lord Rama’s wooden sandals (Padukas)', 'A royal gold crown', 'Rama’s Gandiva bow', 'A diamond-studded royal robe'],
    correctAnswer: 'Lord Rama’s wooden sandals (Padukas)',
    explanation: 'Bharata reverently placed Rama’s wooden sandals (Charana Paduka) on the throne, conducting affairs of state outside the capital at Nandigram as Rama’s representative.',
    socraticHint: 'Which humble footwear of Rama was placed on the royal throne?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-008',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'What was the capital city of King Dasharatha and the Raghu dynasty kingdom?',
    options: ['Ayodhya', 'Mithila', 'Lanka', 'Kishkindha'],
    correctAnswer: 'Ayodhya',
    explanation: 'Ayodhya, situated along the sacred Sarayu River in northern India, was the magnificent capital of the Kosala kingdom ruled by Dasharatha.',
    socraticHint: 'Which ancient city on the banks of the Sarayu River was Rama’s birthplace?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-009',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'Who was the wise and noble father of Mother Sita, known as the philosopher-king of Mithila?',
    options: ['King Janaka', 'King Dasharatha', 'King Sugriva', 'King Harishchandra'],
    correctAnswer: 'King Janaka',
    explanation: 'King Janaka of Videha (Mithila) was famed as a Rajarshi (royal sage) who discovered Sita while plowing the earth for a sacred yajna.',
    socraticHint: 'Which king of Mithila is renowned in the Upanishads for his profound spiritual wisdom?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-010',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'What wicked maidservant poisoned Queen Kaikeyi’s mind with jealousy and suspicion against Rama?',
    options: ['Manthara', 'Surpanakha', 'Tataka', 'Simhika'],
    correctAnswer: 'Manthara',
    explanation: 'Manthara, the hunchbacked maid, poisoned Kaikeyi’s affection with poisonous gossip and fear, convincing her that Bharata would be exiled if Rama was crowned.',
    socraticHint: 'Which maid poisoned Queen Kaikeyi’s mind against Rama?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-011',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'What profound lesson does the relationship among Rama, Lakshmana, Bharata, and Shatrughna offer modern Kenyan youth?',
    options: [
      'Unselfish brotherly love, mutual sacrifice, and placing family harmony above greed for property',
      'Brothers should fight fiercely in court over every shilling',
      'The eldest son should ignore all other family members',
      'Family ties should be broken whenever wealth is involved'
    ],
    correctAnswer: 'Unselfish brotherly love, mutual sacrifice, and placing family harmony above greed for property',
    explanation: 'The four brothers showed that love and mutual honor are far greater than earthly crowns, providing an inspiring template for family unity in Kenya.',
    socraticHint: 'How does selflessness between siblings protect family peace and cohesion?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-012',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l1',
    text: 'How did Lord Rama demonstrate deep respect and equality toward Guha, the humble tribal boatman on the banks of the Ganga?',
    options: [
      'He embraced Guha warmly as a beloved brother, breaking social and caste hierarchies',
      'He demanded that Guha bow down in the mud',
      'He refused to step into Guha’s boat',
      'He paid Guha with a sack of gold and walked away silently'
    ],
    correctAnswer: 'He embraced Guha warmly as a beloved brother, breaking social and caste hierarchies',
    explanation: 'Rama embraced Nishada chief Guha with immense warmth, honoring his genuine devotion and showing that character and love transcend all social divisions.',
    socraticHint: 'How did Rama greet Guha the boatman to show true spiritual equality?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u4-013',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'What supreme virtue does Lord Hanuman embody in the Ramayana?',
    options: [
      'Bhakti (Selfless devotion) combined with supreme humility and servant leadership',
      'Pride in physical strength and boasting',
      'Desire to become an emperor',
      'Greed for gold and jewels'
    ],
    correctAnswer: 'Bhakti (Selfless devotion) combined with supreme humility and servant leadership',
    explanation: 'Hanuman possessed boundless strength and wisdom, yet he attributed all his heroic achievements entirely to the grace of Lord Rama, living as a humble servant.',
    socraticHint: 'Which blend of loving devotion, immense power, and total humility defines Hanuman?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-014',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'How did Hanuman identify himself when standing before the arrogant demon king Ravana in Lanka?',
    options: [
      '"I am Rama-dasa (a humble servant of Lord Rama)"',
      '"I am the king of the gods"',
      '"I am the master of all wealth"',
      '"I am an independent general seeking tribute"'
    ],
    correctAnswer: '"I am Rama-dasa (a humble servant of Lord Rama)"',
    explanation: 'Even when confronted by the terrifying court of Ravana, Hanuman proudly declared his only identity and title was being the humble servant of Lord Rama.',
    socraticHint: 'What humble title did Hanuman take pride in declaring before Ravana?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-015',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'Which life-saving medicinal herb did Hanuman carry from the Dronagiri mountain in the Himalayas to heal the wounded Lakshmana?',
    options: ['Sanjeevani', 'Tulsi', 'Neem', 'Ashwagandha'],
    correctAnswer: 'Sanjeevani',
    explanation: 'When Lakshmana was gravely injured on the battlefield, Hanuman flew to the Himalayas and carried the entire mountain peak holding the miraculous Sanjeevani herb.',
    socraticHint: 'Which herb possesses the divine power to restore life and vitality?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-016',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'Who was the noble elderly vulture king who sacrificed his life attempting to rescue Mother Sita from Ravana’s flying chariot?',
    options: ['Jatayu', 'Sampati', 'Sugriva', 'Angada'],
    correctAnswer: 'Jatayu',
    explanation: 'Jatayu witnessed Ravana abducting Sita and fearlessly attacked the ten-headed demon in mid-air to defend an innocent woman, fighting until his wings were severed.',
    socraticHint: 'Which courageous bird king fought Ravana in the sky and was honored by Rama?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-017',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'How did Lord Rama honor the dying Jatayu after hearing his report of Sita’s abduction?',
    options: [
      'He stroked his feathers with tears of gratitude and performed his funeral rites as a loving son would for a father',
      'He scolded him for not flying faster',
      'He left him in the forest and hurried away',
      'He asked him to fight Ravana again'
    ],
    correctAnswer: 'He stroked his feathers with tears of gratitude and performed his funeral rites as a loving son would for a father',
    explanation: 'Rama was deeply touched by Jatayu’s supreme sacrifice, performing his sacred cremation rites (Antyesti) and granting him Moksha in the divine realm.',
    socraticHint: 'How tenderly did Rama treat the noble bird who laid down his life for righteousness?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-018',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'What fatal flaw in Ravana’s character led to the destruction of his kingdom of Lanka despite his vast knowledge and power?',
    options: [
      'Ahankara (Arrogant ego), uncontrolled desires, and contempt for righteousness (Adharma)',
      'Lack of gold weapons',
      'Not knowing how to speak Sanskrit',
      'Being physically weak'
    ],
    correctAnswer: 'Ahankara (Arrogant ego), uncontrolled desires, and contempt for righteousness (Adharma)',
    explanation: 'Ravana was a master of the Vedas and a formidable king, but pride and unchecked lust blinded his intellect, proving that knowledge without virtue leads to ruin.',
    socraticHint: 'What destructive force of pride and ego blinded Ravana to good counsel?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-019',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'Who was Ravana’s righteous younger brother who courageously counseled him to return Sita and later joined Rama’s cause of Dharma?',
    options: ['Vibhishana', 'Kumbhakarna', 'Indrajit', 'Maricha'],
    correctAnswer: 'Vibhishana',
    explanation: 'Vibhishana stood fearlessly for Dharma against his own brother Ravana’s wickedness, showing that righteousness must always come before tribal or clan loyalty.',
    socraticHint: 'Which brother of Ravana embraced righteousness and was later crowned king of Lanka?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-020',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'What tiny creature worked diligently carrying tiny grains of sand to help the Vanara army build the bridge (Rama Setu) across the ocean?',
    options: ['A little squirrel', 'A tiny crab', 'A sparrow', 'A frog'],
    correctAnswer: 'A little squirrel',
    explanation: 'In the heartwarming story of the squirrel, Rama lovingly stroked the little creature’s back for doing its utmost, leaving the three sacred stripes on all squirrels!',
    socraticHint: 'Which small woodland animal contributed its best effort by rolling in sand for the ocean bridge?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-021',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'What moral truth is taught by Rama honoring the tiny squirrel alongside giant monkey warriors?',
    options: [
      'Every sincere effort, no matter how small, is deeply valued and cherished by God',
      'Only the strongest warriors deserve praise',
      'Small creatures should stay out of big projects',
      'Work done without noise is completely useless'
    ],
    correctAnswer: 'Every sincere effort, no matter how small, is deeply valued and cherished by God',
    explanation: 'The squirrel’s contribution proves that God measures devotion by the sincerity of the heart and one’s personal best, not by the sheer size of the gift.',
    socraticHint: 'Does God look at the size of the physical deed or the sincerity of the loving heart?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-022',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'How did the elderly ascetic woman Shabari demonstrate her pure, unconditional devotion when Lord Rama visited her hermitage?',
    options: [
      'She tasted wild berries first to ensure she offered only the sweetest fruits to Rama',
      'She gave Rama expensive golden jewelry',
      'She challenged Rama to a debate on scriptures',
      'She locked herself inside her hut out of fear'
    ],
    correctAnswer: 'She tasted wild berries first to ensure she offered only the sweetest fruits to Rama',
    explanation: 'Shabari’s love was so innocent and tender that she tasted each berry to prevent Rama from eating sour fruit; Rama gladly accepted them, moved by her pure love.',
    socraticHint: 'Which humble forest elder tasted wild berries to ensure Rama only received sweet fruit?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-023',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'What does the defeat of Ravana and the victory of Lord Rama fundamentally symbolize across human history?',
    options: [
      'Dharmo Rakshati Rakshitah (Righteousness protects those who protect it; Dharma triumphs over evil)',
      'Whoever has the biggest army always wins',
      'Physical weapons are the only route to victory',
      'Righteousness is always defeated by cunning deceit'
    ],
    correctAnswer: 'Dharmo Rakshati Rakshitah (Righteousness protects those who protect it; Dharma triumphs over evil)',
    explanation: 'The central victory of the Ramayana reassures humanity that though adharma may seem formidable, truth and righteousness (Dharma) inevitably prevail.',
    socraticHint: 'What eternal triumph does the victory of Rama over Ravana demonstrate?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u4-024',
    subStrandId: 'substrand-g6-hre-u4',
    lessonId: 'lesson-g6-hre-u4-l2',
    text: 'How can a Kenyan learner emulate Lord Hanuman’s servant leadership in their school or community?',
    options: [
      'By offering their skills, time, and energy humbly to help classmates succeed without seeking personal boastful praise',
      'By showing off in front of the whole school assembly',
      'By bullying younger students using physical size',
      'By refusing to participate in communal campus clean-ups'
    ],
    correctAnswer: 'By offering their skills, time, and energy humbly to help classmates succeed without seeking personal boastful praise',
    explanation: 'Emulating Hanuman means deploying one’s talents selflessly to lift others up, demonstrating quiet competence, humility, and steadfast integrity.',
    socraticHint: 'How does true strength express itself through humility and selfless helpfulness?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  }
];

// Append to db
for (const u of subStrands) {
  const idx = db.subStrands.findIndex(s => s.id === u.id);
  if (idx >= 0) db.subStrands[idx] = u;
  else db.subStrands.push(u);
  console.log(`Added subStrand: ${u.id}`);
}

for (const l of lessons) {
  const idx = db.lessons.findIndex(x => x.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
  console.log(`Added lesson: ${l.id}`);
}

for (const m of missions) {
  const idx = db.missions.findIndex(x => x.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
  console.log(`Added mission: ${m.id}`);
}

let qCount = 0;
for (const q of questions) {
  const idx = db.questions.findIndex(x => x.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
  qCount++;
}
console.log(`Added ${qCount} questions for Units 3 & 4.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 2 of Grade 6 HRE to cbe_database.json!');
