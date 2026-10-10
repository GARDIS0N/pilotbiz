/**
 * Grade 6 Islamic Religious Education (IRE) - Batch 2 Generator
 * Content: Units 3 & 4 (Prophetic Hadith on Moral Living, The Year of Sorrow & Isra wal-Mi'raj)
 * Missions: Orders 133, 134, 135, 136 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-ire-u3-001 to q-g6-ire-u4-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 IRE Batch 2 (Units 3 & 4) ---');

// 1. Units 3 & 4 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ire-u3',
    strandId: 'strand-g6-ire-quran',
    learningAreaId: 'la-ire-g6',
    title: 'Prophetic Hadith on Truthfulness, Guarding the Tongue & Sincere Advice',
    name: 'Prophetic Hadith on Truthfulness, Guarding the Tongue & Sincere Advice',
    description: 'Analysis and memorization of selected Hadith texts in Arabic and English: 1) Hadith on Truthfulness (Sidq): "Truthfulness leads to righteousness, and righteousness leads to Paradise... falsehood leads to wickedness, and wickedness leads to the Fire"; 2) Hadith on Guarding the Tongue (Hifth al-Lisan): "Whoever believes in Allah and the Last Day should speak good or remain silent"; 3) Hadith on Sincere Advice: "Religion is sincere advice (Al-Deen Al-Naseehah) to Allah, His Book, His Messenger, leaders of the Muslims, and their common folk"; applying prophetic ethics to speech, resisting gossip, rumor-mongering, and backbiting (Gheebah) in school and digital communications.',
    cbeCompetency: 'Hadith literacy, moral discernment, truthful communication, and conflict resolution',
    estimatedMinutes: 30,
    order: 3,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ire-u4',
    strandId: 'strand-g6-ire-sirah',
    learningAreaId: 'la-ire-g6',
    title: 'The Year of Sorrow, Ta’if Trials & The Miraculous Isra wal-Mi’raj',
    name: 'The Year of Sorrow, Ta’if Trials & The Miraculous Isra wal-Mi’raj',
    description: 'Sirah milestones in the late Makkan phase: The Year of Sorrow (‘Am al-Huzn) marked by the deaths of Abu Talib and Sayyidah Khadijah (RA); the painful journey to Ta’if seeking support from Banu Thaqif, facing rejection and stoning, and the Prophet’s forgiving du’a; the miraculous Night Journey from Makkah to Al-Aqsa Mosque in Jerusalem (Al-Isra) and Heavenly Ascension through the seven heavens (Al-Mi’raj); the gift of the five daily prayers (Salah); meeting previous prophets (Adam, Yahya, Isa, Yusuf, Idris, Harun, Musa, Ibrahim); Sidrat al-Muntaha; lessons of steadfast resilience, divine comfort, and the supreme status of daily prayer.',
    cbeCompetency: 'Sirah reflection, perseverance in adversity, forgiveness of opponents, and prayer devotion',
    estimatedMinutes: 30,
    order: 4,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ire-u3-l1',
    subStrandId: 'substrand-g6-ire-u3',
    title: 'Hadith on Truthfulness (Sidq) vs. Falsehood & Guarding the Tongue',
    content: 'Truthfulness in speech and action is a foundational cornerstone of Islamic character (Akhlaq).\n\n1. The Hadith on Truthfulness (Reported in Sahih al-Bukhari & Muslim):\n- The Prophet Muhammad (SAW) said: "You must adhere to truthfulness (Sidq), for truthfulness leads to righteousness (Birr), and righteousness leads to Paradise. A person continues to tell the truth and strives to be truthful until he is recorded with Allah as a truthful person (Siddiq). Beware of lying (Kithb), for lying leads to wickedness (Fujur), and wickedness leads to the Fire. A person continues to lie until he is recorded with Allah as a chronic liar (Kath-thab)."\n- Truthfulness creates inner peace, builds trustworthy friendships, and attracts Allah’s blessing (Barakah) in studies and business.\n\n2. The Hadith on Guarding the Tongue (Hifth al-Lisan):\n- The Prophet (SAW) said: "Whoever believes in Allah and the Last Day should speak good or remain silent."\n- The tongue is a small organ that can cause immense damage (insults, slander, profanity) or spread profound blessing (remembrance of Allah, kind words, teaching).\n- Controlling our words, comments on social media, and avoiding foul speech preserves our faith and guards our good deeds from being wiped away.',
    didYouKnow: 'The Prophet Muhammad (SAW) was famously known across Arabia as "Al-Sadiq Al-Amin" (The Truthful, The Trustworthy) long before receiving prophetic revelation at age 40!',
    kenyanContext: 'In Kenyan schools, Muslim student associations emphasize truthfulness during examination periods, reminding candidates that cheating violates the core prophetic mandate of Sidq.',
    order: 5,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u3-l2',
    subStrandId: 'substrand-g6-ire-u3',
    title: 'Hadith on Sincere Advice (Al-Naseehah) & Shunning Gossip (Gheebah)',
    content: 'Islam builds strong, healthy communities through compassionate mutual correction and the absolute prohibition of backbiting.\n\n1. The Hadith on Sincere Advice (Reported in Sahih Muslim):\n- The Prophet (SAW) said: "Al-Deen Al-Naseehah" (The religion is sincere advice).\n- The companions asked: "To whom, O Messenger of Allah?"\n- He replied: "To Allah (by worshiping Him sincerely), to His Book (by believing, reciting, and obeying it), to His Messenger (by following his Sunnah), to the leaders of the Muslims (by counseling them respectfully and supporting good governance), and to their common folk (by showing mercy, guiding them, and wishing good for them)."\n- Naseehah must be given privately, gently, and with genuine love, not in a humiliating public manner.\n\n2. Shunning Backbiting (Gheebah) and Tale-bearing (Nameemah):\n- The Prophet (SAW) defined Gheebah: "Mentioning about your brother that which he dislikes in his absence."\n- The Qur’an compares backbiting to eating the flesh of one’s dead brother (Surah Al-Hujurat 49:12).\n- Nameemah (carrying stories between people to spark quarrels) destroys friendships and is strictly forbidden in Islam.',
    didYouKnow: 'Imam Al-Shafi’i noted that counseling a brother in private is true advice (Naseehah), while rebuking him in public is humiliation (Fadihah)!',
    kenyanContext: 'Kenyan Muslim youth use peer mentorship groups to practice giving sincere, gentle advice to classmates who struggle with bad habits or peer pressure.',
    order: 6,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u4-l1',
    subStrandId: 'substrand-g6-ire-u4',
    title: 'The Year of Sorrow & The Ta’if Trial: Forgiveness in Adversity',
    content: 'The 10th year of Prophethood was marked by profound personal grief and severe trials in the life of Prophet Muhammad (SAW).\n\n1. The Year of Sorrow (‘Am al-Huzn):\n- Two great pillars of support passed away in rapid succession: Abu Talib (his uncle and tribal protector against the Quraysh) and Sayyidah Khadijah (his loving wife of 25 years and first believer).\n- With Abu Talib’s demise, the Quraysh intensified physical and verbal persecution against the Prophet.\n\n2. The Mission to Ta’if:\n- In search of sanctuary and a new base for Islam, the Prophet walked roughly 80 kilometers to the mountainous city of Ta’if with his adopted son Zayd ibn Harithah.\n- The leaders of Banu Thaqif mocked him, rejected the message of Tawhid, and set street urchins and rough youths to throw stones at him, cutting his legs and feet until his shoes were filled with blood.\n\n3. The Prophet’s Forgiving Response:\n- Seeking shelter in an orchard, the Prophet poured out his heart to Allah in a famous du’a: "O Allah, to You I complain of my weakness, my lack of resources, and my lowliness before mankind..."\n- Angel Jibril appeared with the Angel of the Mountains, offering to crush the people of Ta’if between the two mountains of Makkah.\n- The Prophet mercifully replied: "No, rather I hope that Allah will raise from their loins descendants who will worship Allah alone without associating partners with Him!"',
    didYouKnow: 'Years later, the people of Ta’if embraced Islam voluntarily, and their descendants produced great leaders of the Ummah, fulfilling the Prophet’s merciful prayer!',
    kenyanContext: 'The Prophet’s response to Ta’if teaches Kenyan learners that revenge is not the answer to cruelty; responding with forgiveness and patience changes hearts.',
    order: 7,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u4-l2',
    subStrandId: 'substrand-g6-ire-u4',
    title: 'Al-Isra wal-Mi’raj: Night Journey to Al-Aqsa & The Gift of Five Daily Prayers',
    content: 'Following the trials of the Year of Sorrow and Ta’if, Allah consoled and honored His Messenger through the miraculous journey of Al-Isra wal-Mi’raj.\n\n1. Al-Isra (The Night Journey):\n- Travel on the heavenly steed Al-Buraq from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem in a single night (Surah Al-Isra 17:1).\n- The Prophet (SAW) led all previous prophets in communal prayer at Al-Aqsa Mosque, demonstrating the unified chain of divine monotheism.\n\n2. Al-Mi’raj (The Heavenly Ascension):\n- Ascending through the seven heavens with Archangel Jibril, meeting Adam, Yahya, Isa, Yusuf, Idris, Harun, Musa, and Ibrahim.\n- Reaching Sidrat al-Muntaha (the Lote Tree of the Utmost Boundary) beyond which no creation may pass.\n\n3. The Gift of the Five Daily Prayers (Salah):\n- Allah directly prescribed 50 daily prayers. On the advice of Prophet Musa (AS), who reminded him of human weakness, the Prophet returned multiple times to plead for reduction until Allah reduced them to 5 daily prayers with the reward of 50!\n\n4. Lessons of Isra wal-Mi’raj:\n- Salah is the direct lifeline between Allah and the believer, instituted in heaven rather than on earth.\n- Standing firm in faith: When the Quraysh mocked the story, Abu Bakr immediately affirmed its truth, earning the noble title "Al-Siddiq" (The Truthful Believer).',
    didYouKnow: 'Al-Masjid al-Aqsa in Jerusalem was the first Qiblah (direction of prayer) for Muslims before the direction was turned toward the Ka’bah in Makkah!',
    kenyanContext: 'Kenyan Muslims commemorate the 27th night of Rajab with special lectures on Isra wal-Mi’raj, emphasizing the importance of performing all five daily prayers on time.',
    order: 8,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 133, 134, 135, 136 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-ire-u3-m1',
    worldId: 'world-faith-values',
    title: 'Mission 133: Pillars of Truth – Hadith on Sidq & Guarding the Tongue',
    description: 'Master the prophetic Hadith on truthfulness leading to righteousness and Paradise, and learn the power of speaking good or keeping silent.',
    order: 133,
    orderIndex: 133,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-truth-seeker',
    badge: 'badge-g6-ire-truth-seeker',
    lessonId: 'lesson-g6-ire-u3-l1',
    questionIds: [
      'q-g6-ire-u3-001', 'q-g6-ire-u3-002', 'q-g6-ire-u3-003', 'q-g6-ire-u3-004',
      'q-g6-ire-u3-005', 'q-g6-ire-u3-006', 'q-g6-ire-u3-007', 'q-g6-ire-u3-008',
      'q-g6-ire-u3-009', 'q-g6-ire-u3-010', 'q-g6-ire-u3-011', 'q-g6-ire-u3-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u3-m2',
    worldId: 'world-faith-values',
    title: 'Mission 134: Sincere Counsel – Al-Deen Al-Naseehah & Shield from Gossip',
    description: 'Explore the five dimensions of prophetic sincere advice, protect friendships from backbiting (Gheebah), and counsel peers with gentleness.',
    order: 134,
    orderIndex: 134,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-naseehah-counselor',
    badge: 'badge-g6-ire-naseehah-counselor',
    lessonId: 'lesson-g6-ire-u3-l2',
    questionIds: [
      'q-g6-ire-u3-013', 'q-g6-ire-u3-014', 'q-g6-ire-u3-015', 'q-g6-ire-u3-016',
      'q-g6-ire-u3-017', 'q-g6-ire-u3-018', 'q-g6-ire-u3-019', 'q-g6-ire-u3-020',
      'q-g6-ire-u3-021', 'q-g6-ire-u3-022', 'q-g6-ire-u3-023', 'q-g6-ire-u3-024'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u4-m1',
    worldId: 'world-faith-values',
    title: 'Mission 135: The Valley of Orchard – Year of Sorrow & Ta’if Mercy',
    description: 'Stand with the Prophet during the Year of Sorrow, witness his heroic forbearance at Ta’if, and learn why he refused to destroy his persecutors.',
    order: 135,
    orderIndex: 135,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-ire-taif-mercy',
    badge: 'badge-g6-ire-taif-mercy',
    lessonId: 'lesson-g6-ire-u4-l1',
    questionIds: [
      'q-g6-ire-u4-001', 'q-g6-ire-u4-002', 'q-g6-ire-u4-003', 'q-g6-ire-u4-004',
      'q-g6-ire-u4-005', 'q-g6-ire-u4-006', 'q-g6-ire-u4-007', 'q-g6-ire-u4-008',
      'q-g6-ire-u4-009', 'q-g6-ire-u4-010', 'q-g6-ire-u4-011', 'q-g6-ire-u4-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u4-m2',
    worldId: 'world-faith-values',
    title: 'Mission 136: Heavenly Ascension – Al-Isra wal-Mi’raj & Five Daily Prayers',
    description: 'Ride Al-Buraq to Al-Aqsa, ascend through the seven heavens to Sidrat al-Muntaha, and receive the heavenly gift of the five daily prayers.',
    order: 136,
    orderIndex: 136,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-ire-isra-miraj',
    badge: 'badge-g6-ire-isra-miraj',
    lessonId: 'lesson-g6-ire-u4-l2',
    questionIds: [
      'q-g6-ire-u4-013', 'q-g6-ire-u4-014', 'q-g6-ire-u4-015', 'q-g6-ire-u4-016',
      'q-g6-ire-u4-017', 'q-g6-ire-u4-018', 'q-g6-ire-u4-019', 'q-g6-ire-u4-020',
      'q-g6-ire-u4-021', 'q-g6-ire-u4-022', 'q-g6-ire-u4-023', 'q-g6-ire-u4-024'
    ],
    learningAreaId: 'la-ire-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 3: Prophetic Hadith on Moral Living (q-g6-ire-u3-001 to 024) ---
  {
    id: 'q-g6-ire-u3-001',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'According to the Hadith on truthfulness, what does Sidq (truthfulness) lead to, and where does that ultimate path lead?',
    options: [
      'Truthfulness leads to righteousness (Birr), and righteousness leads to Paradise (Jannah)',
      'Truthfulness leads to poverty and defeat',
      'Truthfulness leads to pride and arrogance',
      'Truthfulness leads only to worldly fame'
    ],
    correctAnswer: 'Truthfulness leads to righteousness (Birr), and righteousness leads to Paradise (Jannah)',
    explanation: 'The Prophet (SAW) stated: "Adhere to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise."',
    socraticHint: 'Which golden progression connects truthfulness to righteousness, and righteousness to Paradise?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-002',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What warning did the Prophet (SAW) give regarding Kithb (falsehood/lying)?',
    options: [
      'Lying leads to wickedness (Fujur), and wickedness leads to the Fire (Jahannam)',
      'Lying is acceptable if you are talking to friends',
      'Lying leads to righteousness if done for money',
      'Lying does not affect a Muslim’s spiritual record'
    ],
    correctAnswer: 'Lying leads to wickedness (Fujur), and wickedness leads to the Fire (Jahannam)',
    explanation: 'The Hadith sternly warns: "Beware of lying, for lying leads to wickedness, and wickedness leads to the Fire."',
    socraticHint: 'What destructive spiritual destination does chronic lying lead to according to the Hadith?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-003',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What noble title is recorded with Allah for a person who continually speaks the truth and strives to be truthful?',
    options: [
      'Siddiq (A champion of truth / deeply truthful)',
      'Ameer (A political commander)',
      'Tajir (A wealthy merchant)',
      'Hakim (A courthouse judge)'
    ],
    correctAnswer: 'Siddiq (A champion of truth / deeply truthful)',
    explanation: 'The Prophet (SAW) explained that a person continues to tell the truth until he is recorded in the heavens as a "Siddiq."',
    socraticHint: 'What title of honor—also carried by Abu Bakr—is recorded for a consistently truthful person?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-004',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What rule of speech did the Prophet (SAW) establish in the Hadith: "Man kana yu’minu billahi wal-yawmil-akhiri..."?',
    options: [
      '"Whoever believes in Allah and the Last Day should speak good or remain silent"',
      '"Whoever believes in Allah should shout loudly in arguments"',
      '"Whoever believes in Allah should speak continuously without stopping"',
      '"Whoever believes in Allah should speak only in poetry"'
    ],
    correctAnswer: '"Whoever believes in Allah and the Last Day should speak good or remain silent"',
    explanation: 'The Prophet (SAW) linked faith in Allah and the Judgment Day to speech: if a word is not wholesome, beneficial, or kind, silence is superior.',
    socraticHint: 'What two choices did the Prophet give: either speak what is good or do what?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-005',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'When Mu’adh ibn Jabal asked the Prophet (SAW) what would most ensure his entry into Paradise, what did the Prophet point to (holding his own tongue)?',
    options: [
      '"Restrain this (guarding the tongue)"',
      '"Grow a long beard"',
      '"Travel across seven oceans"',
      '"Build ten masjids"'
    ],
    correctAnswer: '"Restrain this (guarding the tongue)"',
    explanation: 'The Prophet held his tongue and told Mu’adh: "Restrain this." Mu’adh asked if we are held accountable for what we say, and the Prophet replied that people are cast into Hell primarily due to the harvest of their tongues.',
    socraticHint: 'Which organ of the body did the Prophet hold while telling Mu’adh to restrain it?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-006',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'How does truthfulness in school examinations reflect the prophetic teaching of Sidq?',
    options: [
      'It means writing only what you have honestly learned, refusing to smuggle notes or peek at another student’s paper',
      'It means helping friends cheat so they pass',
      'It means copying only from the smartest student',
      'It means bribing the teacher to get higher marks'
    ],
    correctAnswer: 'It means writing only what you have honestly learned, refusing to smuggle notes or peek at another student’s paper',
    explanation: 'Academic honesty is a direct application of Sidq; cheating is deceit (Khiyanah), which the Prophet strictly condemned: "Whoever deceives us is not of us."',
    socraticHint: 'How does refusing to cheat or copy during an examination demonstrate prophetic truthfulness?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-007',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What did the Prophet (SAW) guarantee in the Hadith: "I guarantee a house in the middle of Paradise for one who..."?',
    options: [
      '"...abandons lying even when joking"',
      '"...wins every sporting competition"',
      '"...eats meat every day"',
      '"...memorizes the names of all kings"'
    ],
    correctAnswer: '"...abandons lying even when joking"',
    explanation: 'The Prophet (SAW) guaranteed a home in the middle of Paradise for the person who abandons falsehood even in jest, teaching that truthfulness must be maintained in humor.',
    socraticHint: 'What reward did the Prophet promise for giving up lying even when telling jokes?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-008',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'Why does lying in trade or business transactions destroy Allah’s blessing (Barakah)?',
    options: [
      'Because concealing product defects and swearing false oaths to sell goods invites divine displeasure and removes true profit',
      'Because merchants should only sell goods for free',
      'Because customers prefer being told lies',
      'Because barter trade was forbidden in Arabia'
    ],
    correctAnswer: 'Because concealing product defects and swearing false oaths to sell goods invites divine displeasure and removes true profit',
    explanation: 'The Prophet (SAW) stated that if buyers and sellers are truthful, their trade is blessed; but if they lie and conceal defects, the blessing of their transaction is obliterated.',
    socraticHint: 'What happens to the blessing (Barakah) of trade when sellers conceal defects and tell lies?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-009',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'How should a Muslim pupil apply the Hadith "speak good or remain silent" when interacting on social media WhatsApp groups?',
    options: [
      'Post uplifting, helpful messages and study notes, and refuse to participate in online insults, trolling, or spreading gossip',
      'Forward every rumor received without checking if it is true',
      'Use abusive nicknames for classmates in group chats',
      'Post private pictures of other pupils to mock them'
    ],
    correctAnswer: 'Post uplifting, helpful messages and study notes, and refuse to participate in online insults, trolling, or spreading gossip',
    explanation: 'Guarding the tongue applies equally to the keyboard: digital words carry the exact same moral weight and accountability before Allah.',
    socraticHint: 'How does typing only kind words and refusing to forward gossip apply guarding the tongue online?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-010',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What sign of a hypocrite (Munafiq) relates directly to speech according to the famous Hadith?',
    options: [
      '"When he speaks, he lies"',
      '"When he eats, he uses his right hand"',
      '"When he travels, he shortens prayers"',
      '"When he sleeps, he wakes up for Fajr"'
    ],
    correctAnswer: '"When he speaks, he lies"',
    explanation: 'The Prophet (SAW) identified three signs of a hypocrite: "When he speaks, he lies; when he makes a promise, he breaks it; and when he is trusted, he betrays it."',
    socraticHint: 'What does a hypocrite do whenever he speaks according to the Prophet’s warning?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-011',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What internal peace does truthfulness bring according to the Hadith: "Truthfulness brings tranquility (Tum’anina), while falsehood brings doubt (Rayb)"?',
    options: [
      'A clear conscience free of fear of being exposed, while a liar lives in continuous stress and anxiety',
      'The ability to sleep without dreaming',
      'Immediate physical strength to lift heavy rocks',
      'Freedom from having to take school tests'
    ],
    correctAnswer: 'A clear conscience free of fear of being exposed, while a liar lives in continuous stress and anxiety',
    explanation: 'Truthfulness produces inner serenity and security; lying forces a person to fabricate more lies, living in perpetual paranoia and guilt.',
    socraticHint: 'Why does speaking the truth give your heart calm peace while lying brings restless anxiety?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-012',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l1',
    text: 'What happens to a person who is labeled with Allah as a "Kath-thab" (chronic liar)?',
    options: [
      'They lose divine trust, their word is despised by people, and they are recorded for divine punishment',
      'They receive special leadership positions in the mosque',
      'Their memory becomes twice as sharp',
      'They are granted immunity from sins'
    ],
    correctAnswer: 'They lose divine trust, their word is despised by people, and they are recorded for divine punishment',
    explanation: 'Persistent lying hardens the heart until a person is registered in the heavens as a chronic liar, losing moral credibility on earth and in the hereafter.',
    socraticHint: 'What spiritual ruin and loss of human trust falls on someone branded as a habitual liar?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-013',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'In the Hadith "Al-Deen Al-Naseehah", what does the Arabic word "Naseehah" mean?',
    options: [
      'Sincere advice, goodwill, and genuine loyalty with pure intentions',
      'Giving physical money to beggars',
      'Taking long journeys to commercial cities',
      'Winning political elections'
    ],
    correctAnswer: 'Sincere advice, goodwill, and genuine loyalty with pure intentions',
    explanation: 'Naseehah comes from the root meaning purity and sincerity (like filtering honey from impurities); it denotes sincere counsel and genuine goodwill toward others.',
    socraticHint: 'Does Naseehah mean sincere, pure-hearted advice and goodwill?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-014',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What does showing sincere advice (Naseehah) to the Book of Allah (His Book) involve?',
    options: [
      'Believing in it, reciting it with Tajweed, contemplating its meanings, and putting its moral teachings into practice',
      'Keeping it locked on a high shelf without ever opening it',
      'Translating it only into European languages',
      'Using it as a decorative paper ornament'
    ],
    correctAnswer: 'Believing in it, reciting it with Tajweed, contemplating its meanings, and putting its moral teachings into practice',
    explanation: 'Sincerity toward the Qur’an means honoring it as the Word of Allah, learning its recitation, understanding its guidance, and living by its principles.',
    socraticHint: 'How do reciting, studying, and obeying the Holy Qur’an show sincerity toward God’s Book?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-015',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What does Naseehah toward the common folk of the Muslims ("wa li-’ammatihim") require from believers?',
    options: [
      'Loving for them what we love for ourselves, guiding them kindly, assisting the needy, and protecting their dignity',
      'Cheating them in market trade to make quick profit',
      'Ignoring them when they face disease or poverty',
      'Boasting about our superior family lineages'
    ],
    correctAnswer: 'Loving for them what we love for ourselves, guiding them kindly, assisting the needy, and protecting their dignity',
    explanation: 'Sincerity to everyday citizens entails wishing them well, defending their rights, aiding them in distress, and counseling them with love.',
    socraticHint: 'How does wishing for your fellow citizens the same good you wish for yourself fulfill Naseehah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-016',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What proper etiquette should a Muslim observe when giving advice to a friend who is making a mistake?',
    options: [
      'Advise them privately, gently, with loving words, avoiding public shaming or self-righteous anger',
      'Shout their mistake across the whole school playground',
      'Post about their mistake on a public WhatsApp group',
      'Tell all their enemies so they can mock them'
    ],
    correctAnswer: 'Advise them privately, gently, with loving words, avoiding public shaming or self-righteous anger',
    explanation: 'Islamic manners demand that advice be delivered in private with gentle compassion; public correction is humiliation (Fadihah) that hardens hearts.',
    socraticHint: 'Should you correct a friend privately with kindness or embarrass them publicly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-017',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'How did the Prophet Muhammad (SAW) define Gheebah (backbiting)?',
    options: [
      '"Mentioning about your brother that which he dislikes in his absence"',
      '"Saying hello to someone who is far away"',
      '"Advising a student in the presence of a teacher"',
      '"Praising a person’s good qualities behind their back"'
    ],
    correctAnswer: '"Mentioning about your brother that which he dislikes in his absence"',
    explanation: 'The Prophet (SAW) said: "Gheebah is mentioning about your brother that which he dislikes." A companion asked: "What if it is true?" The Prophet said: "If it is true, you have backbitten him; if it is false, you have slandered him (Buhtan)."',
    socraticHint: 'What did the Prophet say backbiting is even if what you say is actually true?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-018',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'To what abhorrent act does the Holy Qur’an compare backbiting in Surah Al-Hujurat (49:12)?',
    options: [
      'Eating the flesh of one’s dead brother',
      'Drinking sea water in a desert',
      'Burning a wooden house',
      'Throwing stones into an empty well'
    ],
    correctAnswer: 'Eating the flesh of one’s dead brother',
    explanation: 'Surah Al-Hujurat 49:12 asks: "Would any of you like to eat the flesh of his dead brother? You would abhor it!" to illustrate how repulsive backbiting is.',
    socraticHint: 'What horrifying image in Surah Al-Hujurat illustrates how detestable backbiting is?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-019',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What is Nameemah (tale-bearing), and why did the Prophet (SAW) warn that a tale-bearer will not enter Paradise?',
    options: [
      'Carrying gossip and hearsay between people with the evil motive of causing conflict and ruining relationships',
      'Carrying heavy bags for elderly neighbors',
      'Teaching young children how to read the alphabet',
      'Telling true historical stories to students'
    ],
    correctAnswer: 'Carrying gossip and hearsay between people with the evil motive of causing conflict and ruining relationships',
    explanation: 'Nameemah is maliciously transferring words ("so-and-so said this about you") to sow discord, break friendships, and spark hatred among people.',
    socraticHint: 'What destructive habit carries private words between friends specifically to create fights?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-020',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What should a Muslim student do if they sit with a group of friends who start backbiting and mocking an absent classmate?',
    options: [
      'Defend the absent classmate’s honor, remind the group to fear Allah, and leave the gathering if they persist',
      'Join in the laughter and add more insulting rumors',
      'Secretly record the conversation and sell it online',
      'Pretend to agree while smiling'
    ],
    correctAnswer: 'Defend the absent classmate’s honor, remind the group to fear Allah, and leave the gathering if they persist',
    explanation: 'The Prophet (SAW) taught: "Whoever defends the honor of his brother in his absence, Allah will protect his face from the Fire on the Day of Resurrection."',
    socraticHint: 'How does defending an absent brother or sister protect your own face from the Fire?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-021',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What is Buhtan (slander), and how does it differ from Gheebah (backbiting)?',
    options: [
      'Buhtan is fabricating completely false lies and spreading them about someone, which is even more severe than Gheebah',
      'Buhtan is giving advice to a teacher',
      'Buhtan is another name for performing wudhu',
      'There is no difference between the two terms'
    ],
    correctAnswer: 'Buhtan is fabricating completely false lies and spreading them about someone, which is even more severe than Gheebah',
    explanation: 'While Gheebah mentions a true fault behind someone’s back, Buhtan is inventing blatant, malicious lies that the person never did or said.',
    socraticHint: 'Is Buhtan inventing completely false lies about someone behind their back?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-022',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'How does practicing Naseehah (sincere advice) strengthen unity in Kenya’s multi-ethnic schools?',
    options: [
      'It creates an atmosphere of mutual trust, constructive correction, and care, preventing misunderstandings from turning into hatred',
      'It makes all pupils speak only one language',
      'It eliminates all homework and tests',
      'It forces everyone to agree on everything without discussion'
    ],
    correctAnswer: 'It creates an atmosphere of mutual trust, constructive correction, and care, preventing misunderstandings from turning into hatred',
    explanation: 'When students advise each other with love and respect, conflicts are defused early, fostering a supportive, cohesive, and harmonious school community.',
    socraticHint: 'How does loving mutual correction build trust and unity among diverse learners?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-023',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What did the Prophet (SAW) say about two people having a private whispered conversation in the presence of a third person?',
    options: [
      'Two people should not whisper privately excluding the third, as it causes him grief and makes him feel suspicious',
      'They should whisper in foreign languages so he cannot understand',
      'Whispering is recommended in all gatherings',
      'The third person should be ordered to leave the room'
    ],
    correctAnswer: 'Two people should not whisper privately excluding the third, as it causes him grief and makes him feel suspicious',
    explanation: 'The Prophet (SAW) taught exquisite social sensitivity: whispering that excludes a third companion hurts their feelings and breeds suspicion, violating Islamic manners.',
    socraticHint: 'Why is whispering in front of a third person forbidden in Islamic etiquette?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u3-024',
    subStrandId: 'substrand-g6-ire-u3',
    lessonId: 'lesson-g6-ire-u3-l2',
    text: 'What should someone do if they realize they have previously backbitten a brother or sister in school?',
    options: [
      'Make sincere Tawbah to Allah, seek the person’s forgiveness if it will not cause greater harm, and speak well of them in the same gatherings where they were defamed',
      'Pretend nothing happened and do it again',
      'Blame the people who listened to the gossip',
      'Stop praying five daily prayers'
    ],
    correctAnswer: 'Make sincere Tawbah to Allah, seek the person’s forgiveness if it will not cause greater harm, and speak well of them in the same gatherings where they were defamed',
    explanation: 'Expiation for backbiting requires repenting to Allah, praying for the victim, seeking their pardon, and praising their good qualities to restore their reputation.',
    socraticHint: 'How do sincere repentance and praising the victim help repair the sin of backbiting?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // --- Unit 4: The Year of Sorrow, Ta'if Trials & Isra wal-Mi'raj (q-g6-ire-u4-001 to 024) ---
  {
    id: 'q-g6-ire-u4-001',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Which two close pillars of support passed away in the 10th year of Prophethood, leading it to be called the "Year of Sorrow" (‘Am al-Huzn)?',
    options: [
      'His uncle Abu Talib and his beloved wife Sayyidah Khadijah (RA)',
      'His father Abdullah and his mother Aminah',
      'His grandfather Abdul Muttalib and his uncle Hamza',
      'His companion Abu Bakr and his cousin Ali'
    ],
    correctAnswer: 'His uncle Abu Talib and his beloved wife Sayyidah Khadijah (RA)',
    explanation: 'The Prophet suffered double bereavement in the 10th year of Bi’thah: his protective uncle Abu Talib and his comforting, loyal wife Khadijah (RA) passed away.',
    socraticHint: 'Which protective uncle and devoted first wife died during the Year of Sorrow?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-002',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Why was the death of Abu Talib particularly dangerous for the Prophet’s physical safety in Makkah?',
    options: [
      'Abu Talib had provided tribal clan protection (Jiwar) from Banu Hashim that prevented the Quraysh from physically assassinating the Prophet',
      'Abu Talib was the governor of Makkah',
      'Abu Talib commanded the Roman army',
      'Abu Talib owned all the water wells in Makkah'
    ],
    correctAnswer: 'Abu Talib had provided tribal clan protection (Jiwar) from Banu Hashim that prevented the Quraysh from physically assassinating the Prophet',
    explanation: 'Under Arab customary tribal law, Abu Talib’s clan protection shielded the Prophet from lethal assault. His death left the Prophet vulnerable to open violence.',
    socraticHint: 'How did Abu Talib’s clan protection prevent the Quraysh leaders from physically attacking the Prophet?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-003',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Which adopted companion accompanied Prophet Muhammad (SAW) on the difficult 80-kilometer journey to the city of Ta’if?',
    options: [
      'Zayd ibn Harithah (RA)',
      'Bilal ibn Rabah (RA)',
      'Umar ibn al-Khattab (RA)',
      'Khalid ibn al-Walid (RA)'
    ],
    correctAnswer: 'Zayd ibn Harithah (RA)',
    explanation: 'Zayd ibn Harithah accompanied the Prophet on foot to Ta’if, bravely using his own body as a shield to protect the Prophet from flying stones.',
    socraticHint: 'Which loyal companion traveled with the Prophet to Ta’if and shielded him from stones?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-004',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Which tribe inhabited the city of Ta’if and rejected the Prophet’s invitation to Islam?',
    options: [
      'Banu Thaqif',
      'Banu Umayyah',
      'Banu Aws',
      'Banu Khazraj'
    ],
    correctAnswer: 'Banu Thaqif',
    explanation: 'The leaders of Banu Thaqif (the ruling tribe of Ta’if) arrogantly ridiculed the Prophet (SAW) and refused his request for sanctuary.',
    socraticHint: 'Which tribe ruled the fertile city of Ta’if?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-005',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'How did the hostile leaders of Ta’if treat Prophet Muhammad (SAW) when he left their city?',
    options: [
      'They incited street mobs and youths who lined the path, hurling stones and insults until his feet bled',
      'They escorted him safely with a cavalry honor guard',
      'They gave him bags of silver and invited him to return',
      'They built a house for him inside the city walls'
    ],
    correctAnswer: 'They incited street mobs and youths who lined the path, hurling stones and insults until his feet bled',
    explanation: 'The chieftains unleashed ruffians who formed two rows, pelting the Prophet with stones, wounding his shins and feet until his sandals were stained with blood.',
    socraticHint: 'What cruel, violent reception did the mobs of Ta’if unleash upon the Prophet?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-006',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'In whose grape orchard did the bleeding Prophet (SAW) take refuge to rest and pray to Allah outside Ta’if?',
    options: [
      'The orchard belonging to ‘Utbah and Shaybah ibn Rabi’ah',
      'The orchard belonging to Abu Jahl',
      'The orchard belonging to Abu Lahab',
      'The orchard belonging to King Negus'
    ],
    correctAnswer: 'The orchard belonging to ‘Utbah and Shaybah ibn Rabi’ah',
    explanation: 'The Prophet found refuge in the private vineyard of the sons of Rabi’ah (‘Utbah and Shaybah), where he poured out his heart in humble prayer to Allah.',
    socraticHint: 'Whose private vineyard offered shade and rest to the wounded Prophet outside Ta’if?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-007',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Who was ‘Addas, and how did he interact with the Prophet (SAW) in the vineyard at Ta’if?',
    options: [
      'A Christian slave boy from Nineveh who brought grapes to the Prophet, recognized him as a true prophet, and embraced Islam',
      'A Roman soldier who tried to arrest the Prophet',
      'A merchant who sold bread to Zayd',
      'A desert guide who showed them the way back'
    ],
    correctAnswer: 'A Christian slave boy from Nineveh who brought grapes to the Prophet, recognized him as a true prophet, and embraced Islam',
    explanation: 'When the Prophet said "Bismillah" before eating the grapes, ‘Addas was astonished. Hearing that the Prophet knew of Prophet Yunus (Jonah) of Nineveh, ‘Addas kissed the Prophet’s hands and head.',
    socraticHint: 'Which young Christian servant brought grapes to the Prophet and recognized the prophetic name of Yunus?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-008',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'What did the Angel of the Mountains offer to do to the people of Ta’if when he appeared alongside Jibril?',
    options: [
      'To crush them between the two steep mountains surrounding Makkah (Al-Akhshabayn)',
      'To send a flood of boiling water across their city',
      'To turn their grape orchards into dry salt deserts',
      'To strike them with blindness'
    ],
    correctAnswer: 'To crush them between the two steep mountains surrounding Makkah (Al-Akhshabayn)',
    explanation: 'The Angel of the Mountains greeted the Prophet and offered: "If you wish, I will bring together the two mountains upon them." Divine power was at the Prophet’s command.',
    socraticHint: 'What destructive punishment using the two mountains did the Angel offer to execute on Ta’if?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-009',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'What was Prophet Muhammad’s (SAW) astonishingly merciful reply to the Angel of the Mountains?',
    options: [
      '"No, rather I hope that Allah will raise from their descendants people who will worship Allah alone without associating partners with Him!"',
      '"Yes, destroy them all immediately because they injured my feet"',
      '"Wait until tomorrow, then crush half of their houses"',
      '"Take all their cattle and bring them to Makkah"'
    ],
    correctAnswer: '"No, rather I hope that Allah will raise from their descendants people who will worship Allah alone without associating partners with Him!"',
    explanation: 'The Prophet’s response is the ultimate proof of his title "Rahmatan lil-’Alameen" (A Mercy to the Worlds): refusing revenge and praying for the salvation of their future generations.',
    socraticHint: 'How did the Prophet choose mercy and hope for their future children rather than seeking revenge?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-010',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'What timeless lesson does the Prophet’s supplication in the vineyard of Ta’if teach believers facing severe rejection or hardship?',
    options: [
      'To turn entirely to Allah with humble surrender, seeking His pleasure above all human acceptance or earthly power',
      'To give up on life and stop praying',
      'To blame friends for not fighting on your behalf',
      'To curse your enemies continuously'
    ],
    correctAnswer: 'To turn entirely to Allah with humble surrender, seeking His pleasure above all human acceptance or earthly power',
    explanation: 'The Prophet prayed: "So long as You are not angry with me, I do not care [about human rejection]." True faith finds peace solely in Allah’s divine pleasure.',
    socraticHint: 'What did the Prophet care about most in his du’a: human praise or Allah’s divine pleasure?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-011',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'Under whose clan protection (Jiwar) was Prophet Muhammad (SAW) able to safely re-enter Makkah after the journey to Ta’if?',
    options: [
      'Al-Mut’im ibn ‘Adi',
      'Abu Jahl',
      'Abu Sufyan',
      'Walid ibn al-Mughirah'
    ],
    correctAnswer: 'Al-Mut’im ibn ‘Adi',
    explanation: 'Al-Mut’im ibn ‘Adi, a non-Muslim chieftain of Banu Nawfal who possessed noble Arab chivalry, granted the Prophet armed protection to enter Makkah safely.',
    socraticHint: 'Which noble Makkan chieftain escorted the Prophet safely back into Makkah with his armed sons?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-012',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l1',
    text: 'How can primary school pupils emulate the Prophet’s reaction to the Ta’if trial when mistreated or bullied by peers?',
    options: [
      'By controlling anger, refusing to take violent revenge, reporting bullying calmly, and praying for the offender’s guidance',
      'By bringing stones to school to throw at the bullies after class',
      'By threatening to burn the bullies’ school bags',
      'By insulting the bullies’ families'
    ],
    correctAnswer: 'By controlling anger, refusing to take violent revenge, reporting bullying calmly, and praying for the offender’s guidance',
    explanation: 'The prophetic model breaks cycles of retaliation: exercising self-restraint, seeking justice through proper authorities, and praying for the moral reformation of bullies.',
    socraticHint: 'How does choosing patience and praying for bullies reflect the Prophet’s conduct at Ta’if?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-013',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What was Al-Isra in the miraculous journey of Prophet Muhammad (SAW)?',
    options: [
      'The night journey from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem',
      'The migration from Makkah to Madinah',
      'The voyage by boat across the Red Sea to Abyssinia',
      'The march from Makkah to the Valley of Badr'
    ],
    correctAnswer: 'The night journey from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem',
    explanation: 'Surah Al-Isra (17:1) declares: "Glory be to Him who took His servant by night from the Sacred Mosque to the Farthest Mosque whose precincts We have blessed."',
    socraticHint: 'Which part of the miraculous night journey traveled horizontally from Makkah to Jerusalem?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-014',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What was the name of the heavenly white steed that carried Prophet Muhammad (SAW) during Al-Isra?',
    options: [
      'Al-Buraq',
      'Al-Qaswa',
      'Duldul',
      'Al-Adba'
    ],
    correctAnswer: 'Al-Buraq',
    explanation: 'Al-Buraq (from the Arabic "Barq", lightning) was a swift heavenly creature whose single stride reached the furthest point of sight.',
    socraticHint: 'Which heavenly winged riding mount carried the Prophet to Jerusalem in the blink of an eye?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-015',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What historic prayer took place at Al-Masjid al-Aqsa in Jerusalem before the heavenly ascension?',
    options: [
      'Prophet Muhammad (SAW) led all previous prophets of God in communal congregational prayer',
      'The angels prayed behind Roman soldiers',
      'Prophet Musa led the prayer alone',
      'The Prophet prayed without any companions'
    ],
    correctAnswer: 'Prophet Muhammad (SAW) led all previous prophets of God in communal congregational prayer',
    explanation: 'Leading all prophets in prayer signified that Muhammad (SAW) is the seal and leader of the prophets, and that all divine messages share one unified truth of Tawhid.',
    socraticHint: 'Who did Prophet Muhammad (SAW) lead in prayer inside Al-Masjid al-Aqsa?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-016',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What was Al-Mi’raj in the miraculous event?',
    options: [
      'The vertical ascension through the seven heavens up to Sidrat al-Muntaha in the divine presence',
      'The return journey from Jerusalem back to Makkah on foot',
      'The battle fought against the Quraysh at Uhud',
      'The signing of the Treaty of Hudaybiyyah'
    ],
    correctAnswer: 'The vertical ascension through the seven heavens up to Sidrat al-Muntaha in the divine presence',
    explanation: 'Al-Mi’raj (The Ascension) was the elevation from Jerusalem up through the seven heavenly realms accompanied by Archangel Jibril.',
    socraticHint: 'Which part of the miracle involved traveling upwards through the seven heavens?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-017',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'Which prophet did Prophet Muhammad (SAW) meet in the seventh heaven leaning against the heavenly temple Al-Bayt al-Ma’mur?',
    options: [
      'Prophet Ibrahim (Abraham)',
      'Prophet Musa (Moses)',
      'Prophet Adam',
      'Prophet Nuh (Noah)'
    ],
    correctAnswer: 'Prophet Ibrahim (Abraham)',
    explanation: 'In the seventh heaven, the Prophet met Prophet Ibrahim (AS), the father of prophets, resting against Al-Bayt al-Ma’mur, where 70,000 angels enter daily to worship.',
    socraticHint: 'Which great patriarch of monotheism was met in the seventh heaven?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-018',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What boundary was reached during Mi’raj beyond which even Archangel Jibril was not permitted to pass?',
    options: [
      'Sidrat al-Muntaha (The Lote Tree of the Utmost Boundary)',
      'Mount Sinai',
      'The Ka’bah in Makkah',
      'The Cave of Hira'
    ],
    correctAnswer: 'Sidrat al-Muntaha (The Lote Tree of the Utmost Boundary)',
    explanation: 'Sidrat al-Muntaha marks the ultimate threshold of creation where Jibril stopped, leaving Prophet Muhammad (SAW) to advance into the direct divine presence.',
    socraticHint: 'What sacred lote tree marks the boundary of the highest heaven?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-019',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'How many daily prayers were originally enjoined upon the Muslim Ummah during the Mi’raj before being reduced?',
    options: [
      'Fifty (50) daily prayers',
      'Ten (10) daily prayers',
      'One hundred (100) daily prayers',
      'Five (5) daily prayers'
    ],
    correctAnswer: 'Fifty (50) daily prayers',
    explanation: 'Allah initially commanded 50 daily prayers as a demonstration of immense devotion before mercifully reducing them upon the Prophet’s repeated requests.',
    socraticHint: 'How many prayers were initially commanded before the Prophet asked for reduction?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-020',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'Which prophet advised Prophet Muhammad (SAW) to return to Allah and plead for the prayers to be reduced because humans would find fifty too burdensome?',
    options: [
      'Prophet Musa (Moses)',
      'Prophet Isa (Jesus)',
      'Prophet Yusuf (Joseph)',
      'Prophet Dawood (David)'
    ],
    correctAnswer: 'Prophet Musa (Moses)',
    explanation: 'Prophet Musa (AS) shared his practical experience leading the Children of Israel, advising Muhammad (SAW) to ask Allah for reductions until the number became five.',
    socraticHint: 'Which prophet from the Children of Israel advised that 50 prayers were too heavy for the Ummah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-021',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'What divine promise did Allah give when the prayers were finally fixed at five daily prayers?',
    options: [
      'They are five in practice, but equal to fifty in divine reward (each prayer multiplied tenfold in merit)',
      'They are only compulsory during the month of Ramadan',
      'Only adults need to pray them',
      'They can be replaced by paying money'
    ],
    correctAnswer: 'They are five in practice, but equal to fifty in divine reward (each prayer multiplied tenfold in merit)',
    explanation: 'Allah proclaimed: "My word does not change: they are five prayers, and they carry the reward of fifty!" showcasing infinite divine grace.',
    socraticHint: 'How does performing five daily prayers grant the reward of fifty prayers?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-022',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'Why was Abu Bakr (RA) given the honorable title "Al-Siddiq" (The Champion of Truth) after Al-Isra wal-Mi’raj?',
    options: [
      'When the Quraysh mocked the story, Abu Bakr declared without hesitation: "If he said it, then it is true, for I believe him in news from the heavens even greater than this!"',
      'Because he traveled with the Prophet on Al-Buraq',
      'Because he built Al-Masjid al-Aqsa with his own hands',
      'Because he was the oldest man in Makkah'
    ],
    correctAnswer: 'When the Quraysh mocked the story, Abu Bakr declared without hesitation: "If he said it, then it is true, for I believe him in news from the heavens even greater than this!"',
    explanation: 'Abu Bakr’s absolute, unwavering conviction in the Prophet’s truthfulness earned him the permanent title "Al-Siddiq" from the Prophet himself.',
    socraticHint: 'How did Abu Bakr’s total faith in the Prophet’s report earn him the title Al-Siddiq?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-023',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'How did the Prophet (SAW) prove the truth of his night journey when challenged by the skeptical Quraysh to describe Jerusalem?',
    options: [
      'Allah presented a vision of Al-Masjid al-Aqsa before his eyes, allowing him to describe every gate, column, and detail precisely, along with arriving caravans',
      'He showed them photographs on paper',
      'He brought back stones from the walls of Jerusalem',
      'The Roman emperor sent a letter confirming the visit'
    ],
    correctAnswer: 'Allah presented a vision of Al-Masjid al-Aqsa before his eyes, allowing him to describe every gate, column, and detail precisely, along with arriving caravans',
    explanation: 'Allah illuminated a clear vision of the mosque before the Prophet in Makkah, enabling him to describe every architectural detail to astounded Makkans.',
    socraticHint: 'How did Allah show the Prophet a vision of Jerusalem so he could answer every skeptical question?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u4-024',
    subStrandId: 'substrand-g6-ire-u4',
    lessonId: 'lesson-g6-ire-u4-l2',
    text: 'Why is Salah (prayer) considered the personal "Mi’raj of the believer" in Islamic spiritual teaching?',
    options: [
      'Because during prayer, the believer spiritually ascends above worldly distractions to stand directly in conversation with Allah',
      'Because prayer allows the body to fly through the air',
      'Because prayer is only performed on mountaintops',
      'Because prayer was invented in Jerusalem'
    ],
    correctAnswer: 'Because during prayer, the believer spiritually ascends above worldly distractions to stand directly in conversation with Allah',
    explanation: 'The five daily prayers allow every Muslim to experience an intimate spiritual ascension (Mi’raj), communicating directly with the Creator five times daily.',
    socraticHint: 'How does daily prayer lift our hearts into intimate, direct communion with Allah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
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
console.log('Successfully saved Batch 2 of Grade 6 IRE to cbe_database.json!');
