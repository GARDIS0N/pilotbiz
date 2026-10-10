import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 IRE Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-ire-u3',
    strandId: 'strand-g5-ire-quran',
    learningAreaId: 'la-ire-g5',
    title: 'Selected Hadith: Acts of Charity, Emotional Self-Control & Social Kindness',
    description: 'Examining authentic prophetic traditions (Hadith): Hadith on every good deed being charity (Sadaqah - e.g. smiling at a brother, speaking a good word, removing harmful objects from the road); Hadith on anger management ("The strong person is not the good wrestler, but the one who controls himself when angry"); Hadith on honoring neighbors and guests ("Whoever believes in Allah and the Last Day should honor his neighbor/guest"); understanding the structure of a Hadith (Isnad - chain of narrators, and Matn - text); applying prophetic character in school, home, and community.',
    cbeCompetency: 'Prophetic literacy, emotional self-regulation, empathy, peaceful neighborliness, and proactive charitable service',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g5-ire-u4',
    strandId: 'strand-g5-ire-sirah',
    learningAreaId: 'la-ire-g5',
    title: 'The Call to Prophethood (Bi’thah) and Early Secret Da’wah in Makkah',
    description: 'Investigating the inception of Islam: The Prophet’s retreats for contemplation in Cave Hira on Mount Nur (Jabal an-Nur); the descent of Archangel Jibril with the first revelation (Surah Al-Alaq 96:1-5 - "Iqra / Read in the name of your Lord"); the comforting role of Sayyidatna Khadijah (RA) and consultation with Waraqah ibn Nawfal; the first converts to Islam (Khadijah - first woman, Abu Bakr - first free adult male, Ali ibn Abi Talib - first youth/child, Zayd ibn Harithah - first freed slave); the three years of secret Da’wah (Da’wah Sirriyyah) and the sanctuary of Dar al-Arqam.',
    cbeCompetency: 'Historical reflection, spiritual seeking, marital comfort, loyal friendship, and wisdom in early community formation',
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
    id: 'lesson-g5-ire-u3-l1',
    subStrandId: 'substrand-g5-ire-u3',
    title: 'Hadith on Good Deeds, Smiles, and Daily Charity (Sadaqah)',
    content: 'A Hadith is a recorded saying, action, or tacit approval of Prophet Muhammad (SAW). Every authentic Hadith consists of two components: the Isnad (the authenticated chain of trustworthy narrators who transmitted the report) and the Matn (the actual text or teaching of the Prophet). In Sahih Muslim, the Prophet (SAW) taught: "Kullu ma’roofin sadaqah"—"Every good deed is charity." Islam teaches that charity is not restricted to wealthy people donating money; every person can practice Sadaqah every single day regardless of their financial status. The Prophet (SAW) elaborated: "Smiling in the face of your brother is charity; enjoining good and forbidding evil is charity; guiding a man who is lost is charity; helping a person with poor vision is charity; removing stones, thorns, and bones from the pathway is charity; and pouring water from your bucket into your brother’s bucket is charity." For Grade 5 learners in Kenya, this Hadith encourages daily acts of proactive kindness: welcoming schoolmates with cheerful smiles, picking up banana peels or litter from the school compound path, helping classmates solve arithmetic problems, and speaking gentle, truthful words.',
    didYouKnow: 'The Prophet (SAW) taught that planting a fruit tree or crops that birds, humans, or animals eat from counts as an ongoing charity (Sadaqah Jariyah) for the planter even after they pass away!',
    kenyanContext: 'Learners at Muslim Primary School in Kakamega conduct weekly "Pathway Cleanups" to clear sharp stones and broken twigs from village footpaths leading to the community borehole, embodying the Hadith of removing obstacles.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u3-l2',
    subStrandId: 'substrand-g5-ire-u3',
    title: 'Hadith on Controlling Anger and Honoring Neighbors and Guests',
    content: 'Prophet Muhammad (SAW) taught that emotional discipline and gentle manners are true indicators of strong moral character. In Sahih al-Bukhari, Abu Hurairah (RA) narrated that the Prophet (SAW) said: "The strong person is not the good wrestler; rather, the strong person is the one who controls himself when he is angry." When an angry person loses control, they say hurtful words, break things, or fight physically. The Sunnah teaches practical steps to extinguish anger: 1) Seeking refuge in Allah from Satan by saying "A’udhu billahi minash-shaytanir-rajeem"; 2) Remaining silent instead of speaking harsh insults; 3) Changing one’s physical posture: sitting down if standing, or lying down if sitting; and 4) Performing Wudhu (ablution), because anger is from the heat of Satan and water extinguishes fire. Furthermore, the Prophet (SAW) stressed social harmony in the Hadith: "Whoever believes in Allah and the Last Day, let him honor his neighbor; and whoever believes in Allah and the Last Day, let him honor his guest; and whoever believes in Allah and the Last Day, let him speak good or remain silent." In Kenya, Muslim learners practice this by treating neighbors of all ethnic backgrounds and religious faiths with warmth, sharing cooked food, and keeping noise levels low.',
    didYouKnow: 'The Prophet (SAW) repeated the advice "La taghdab" (Do not become angry) three times when a man repeatedly approached him asking for concise moral counsel!',
    kenyanContext: 'In Mombasa’s Old Town, during Iftar in Ramadan, Muslim families send dishes of biryani, mahamri, and fresh dates to both Muslim and non-Muslim Christian neighbors along their street, living out the prophetic command to honor neighbors.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u4-l1',
    subStrandId: 'substrand-g5-ire-u4',
    title: 'The Dawn of Revelation at Cave Hira and Comfort of Khadijah (RA)',
    content: 'Before receiving revelation, Prophet Muhammad (SAW) used to retreat to Cave Hira atop Jabal an-Nur (Mount of Light) near Makkah for contemplation and worship, troubled by the idolatry, injustice, and burying of female infants in Jahiliyyah (pre-Islamic ignorance). In the year 610 CE, at the age of forty during the month of Ramadan, the Archangel Jibril (Gabriel) appeared to him in the cave and commanded: "Iqra!" (Read / Recite!). Muhammad (SAW) replied humbly: "Ma ana bi-qari" (I am not a reader). Jibril embraced him firmly three times, until he reached the limit of his endurance, and then revealed the first five verses of Surah Al-Alaq (96:1-5): "Read in the name of your Lord who created; created man from a clinging clot. Read! And your Lord is the Most Generous, who taught by the pen, taught man that which he knew not." Overwhelmed and trembling with holy awe, the Prophet returned to his devoted wife Sayyidatna Khadijah (RA) in Makkah, crying: "Zammilooni! Zammilooni!" (Cover me! Cover me!). Khadijah wrapped him in a cloak and comforted him with historic words of faith: "Never! By Allah, Allah will never disgrace you. You uphold family ties, help the poor and needy, serve guests generously, and assist those afflicted by disasters." She then took him to her learned Christian cousin Waraqah ibn Nawfal, who recognized Jibril as the same angel of revelation sent to Prophet Musa (Moses) and confirmed Muhammad’s appointment as the final prophet of Allah.',
    didYouKnow: 'The very first word of the Holy Qur’an ever revealed was "Iqra" (Read/Recite), demonstrating that seeking knowledge, literacy, and study are fundamental pillars of Islam!',
    kenyanContext: 'Kenyan Muslim education societies establish libraries named "Dar al-Iqra" across schools in Nairobi and Garissa, commemorating the first divine command to read and acquire beneficial knowledge.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u4-l2',
    subStrandId: 'substrand-g5-ire-u4',
    title: 'The First Believers and the Secret Sanctuary of Dar al-Arqam',
    content: 'Following the divine appointment (Bi’thah), the mission of Islam commenced with wisdom and discretion through three years of private, secret preaching (Da’wah Sirriyyah). The Prophet (SAW) shared the message with those closest to him who knew his spotless character. The very first person to accept Islam was his beloved wife, Sayyidatna Khadijah bint Khuwaylid (RA)—the first woman and first believer. The first free adult male was his loyal, noble friend Abu Bakr as-Siddiq (RA). The first youth was his young cousin Ali ibn Abi Talib (RA), who was around ten years old and living under the Prophet’s care. The first freed slave was Zayd ibn Harithah (RA), the Prophet’s adopted son. Abu Bakr immediately used his respected status to invite prominent, upright individuals who became leading Sahabah, including Uthman ibn Affan, Abdur-Rahman ibn Awf, Sa’d ibn Abi Waqqas, Talhah ibn Ubaydullah, and Az-Zubayr ibn al-Awwam. As the small group of believers faced mockery and danger from Quraysh idolaters, the Prophet chose the house of a young companion named Al-Arqam ibn Abi al-Arqam near Mount Safa as a secret headquarters (Dar al-Arqam). In this sanctuary, early Muslims gathered to pray, recite newly revealed verses, learn Islamic morals, and support each other in unwavering brotherhood.',
    didYouKnow: 'Al-Arqam was only around sixteen years old when he bravely opened his family home as the secret training ground and spiritual sanctuary for the early Muslim community!',
    kenyanContext: 'Muslim youth mentorship clubs in Kenya often adopt the name "Al-Arqam Study Circles" to emulate the early believers who gathered in small groups to memorize scripture, learn ethics, and build mutual support.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 2 Missions (Missions 73, 74, 75, 76 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-ire-u3-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u3',
    lessonId: 'lesson-g5-ire-u3-l1',
    title: 'Every Smile is Charity Quest',
    description: 'Learn the two essential parts of Hadith (Isnad and Matn), embrace prophetic teachings that every good deed is Sadaqah, and practice removing obstacles and sharing smiles in your community!',
    order: 73,
    orderIndex: 73,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-daily-sadaqah',
    badge: { name: 'Smiling Giver', icon: 'heart' },
    questionIds: [
      'q-g5-ire-u3-001', 'q-g5-ire-u3-002', 'q-g5-ire-u3-003', 'q-g5-ire-u3-004',
      'q-g5-ire-u3-005', 'q-g5-ire-u3-006', 'q-g5-ire-u3-007', 'q-g5-ire-u3-008',
      'q-g5-ire-u3-009', 'q-g5-ire-u3-010', 'q-g5-ire-u3-011', 'q-g5-ire-u3-012'
    ]
  },
  {
    id: 'mission-g5-ire-u3-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u3',
    lessonId: 'lesson-g5-ire-u3-l2',
    title: 'Master of Calm & Gracious Neighbor Challenge',
    description: 'Master the Sunnah art of anger self-control, discover that true strength lies in patience, and live the golden rule of honoring neighbors and welcoming guests in Kenya!',
    order: 74,
    orderIndex: 74,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-peaceful-neighbor',
    badge: { name: 'Calm Peacemaker', icon: 'shield' },
    questionIds: [
      'q-g5-ire-u3-013', 'q-g5-ire-u3-014', 'q-g5-ire-u3-015', 'q-g5-ire-u3-016',
      'q-g5-ire-u3-017', 'q-g5-ire-u3-018', 'q-g5-ire-u3-019', 'q-g5-ire-u3-020',
      'q-g5-ire-u3-021', 'q-g5-ire-u3-022', 'q-g5-ire-u3-023', 'q-g5-ire-u3-024'
    ]
  },
  {
    id: 'mission-g5-ire-u4-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u4',
    lessonId: 'lesson-g5-ire-u4-l1',
    title: 'The Light of Cave Hira Quest',
    description: 'Climb Mount Nur to the tranquil Cave of Hira, witness the historic command "Iqra" from Archangel Jibril, and hear Sayyidatna Khadijah’s profound comfort to the Messenger of Allah!',
    order: 75,
    orderIndex: 75,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-cave-hira',
    badge: { name: 'Hira Seeker', icon: 'compass' },
    questionIds: [
      'q-g5-ire-u4-001', 'q-g5-ire-u4-002', 'q-g5-ire-u4-003', 'q-g5-ire-u4-004',
      'q-g5-ire-u4-005', 'q-g5-ire-u4-006', 'q-g5-ire-u4-007', 'q-g5-ire-u4-008',
      'q-g5-ire-u4-009', 'q-g5-ire-u4-010', 'q-g5-ire-u4-011', 'q-g5-ire-u4-012'
    ]
  },
  {
    id: 'mission-g5-ire-u4-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u4',
    lessonId: 'lesson-g5-ire-u4-l2',
    title: 'Pioneers of Dar al-Arqam Challenge',
    description: 'Meet the four pioneer believers of Islam—Khadijah, Abu Bakr, young Ali, and Zayd—and enter the secret sanctuary of Dar al-Arqam where brotherhood and faith were forged!',
    order: 76,
    orderIndex: 76,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-dar-al-arqam',
    badge: { name: 'Sanctuary Pioneer', icon: 'home' },
    questionIds: [
      'q-g5-ire-u4-013', 'q-g5-ire-u4-014', 'q-g5-ire-u4-015', 'q-g5-ire-u4-016',
      'q-g5-ire-u4-017', 'q-g5-ire-u4-018', 'q-g5-ire-u4-019', 'q-g5-ire-u4-020',
      'q-g5-ire-u4-021', 'q-g5-ire-u4-022', 'q-g5-ire-u4-023', 'q-g5-ire-u4-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 2 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 3 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-ire-u3-001',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What are the two foundational components that make up any authentic Hadith of Prophet Muhammad (SAW)?',
    text: 'What are the two foundational components that make up any authentic Hadith of Prophet Muhammad (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Isnad (chain of trustworthy narrators) and the Matn (the actual text or statement)',
      'The Title of the chapter and the Page number of the book',
      'The Arabic alphabet and the Swahili translation notes',
      'The City of Makkah and the Valley of Madinah'
    ],
    correctAnswer: 'The Isnad (chain of trustworthy narrators) and the Matn (the actual text or statement)',
    explanation: 'In Hadith science (Mustalah al-Hadith), an authentic report consists of the Isnad (the unbroken chain of reliable transmitters reaching the Prophet) and the Matn (the text and message spoken or demonstrated).',
    socraticHint: 'Which pair of Arabic terms identifies the transmission chain of narrators and the actual spoken text?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-002',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What comprehensive principle of charity did the Prophet (SAW) teach in the Hadith: "Kullu ma’roofin sadaqah"?',
    text: 'What comprehensive principle of charity did the Prophet (SAW) teach in the Hadith: "Kullu ma’roofin sadaqah"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Every good deed is an act of charity (Sadaqah)',
      'Only gold coins given to kings count as charity',
      'Charity is strictly reserved for wealthy merchants with large herds',
      'Good deeds are only accepted during the holy month of Ramadan'
    ],
    correctAnswer: 'Every good deed is an act of charity (Sadaqah)',
    explanation: 'The Prophet (SAW) stated: "Kullu ma’roofin sadaqah"—"Every good deed is charity." This broadens the definition of charity beyond monetary wealth to include any righteous, kind, or helpful action.',
    socraticHint: 'How did the Prophet summarize that every single kind, moral, and helpful action is counted as charity?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-003',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'In Jami’ at-Tirmidhi, what simple, cost-free facial expression did the Prophet (SAW) say is rewarded as charity?',
    text: 'In Jami’ at-Tirmidhi, what simple, cost-free facial expression did the Prophet (SAW) say is rewarded as charity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Smiling in the face of your brother or sister',
      'Frowning seriously to look important to others',
      'Winking with one eye while speaking to elders',
      'Staring coldly without greeting anyone on the road'
    ],
    correctAnswer: 'Smiling in the face of your brother or sister',
    explanation: 'The Prophet (SAW) said: "Tabassumuka fee wajhi akheeka laka sadaqah"—"Smiling in the face of your brother is charity for you." A cheerful, warm smile spreads joy and brotherhood.',
    socraticHint: 'Which cheerful expression costs no money yet brings joy and is rewarded as an act of Sadaqah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-004',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What environmental action did the Prophet (SAW) specifically identify as an act of charity in Sahih al-Bukhari and Muslim?',
    text: 'What environmental action did the Prophet (SAW) specifically identify as an act of charity in Sahih al-Bukhari and Muslim?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Removing harmful objects (stones, thorns, litter) from the pathway',
      'Digging deep pits in the middle of school playing fields',
      'Throwing plastic bags into flowing river waters',
      'Chopping down indigenous trees in town parks for fun'
    ],
    correctAnswer: 'Removing harmful objects (stones, thorns, litter) from the pathway',
    explanation: 'The Prophet (SAW) taught: "And removing harmful things from the road is an act of charity." Keeping roads and paths clear of thorns, nails, stones, and litter protects people from injury.',
    socraticHint: 'Which civic and environmental action prevents injury to travelers and is counted as Sadaqah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-005',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'A learner in Garissa sees broken glass on the path where barefoot children walk to school. Applying the Hadith on Sadaqah, what should the learner do?',
    text: 'A learner in Garissa sees broken glass on the path where barefoot children walk to school. Applying the Hadith on Sadaqah, what should the learner do?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Carefully pick up the broken glass using a stick or safe tool and dispose of it properly in a rubbish bin',
      'Kick the broken glass deeper into the pathway so people step on it',
      'Run past quickly without caring because someone else will clean it',
      'Laugh and wait to see which classmate steps on the glass'
    ],
    correctAnswer: 'Carefully pick up the broken glass using a stick or safe tool and dispose of it properly in a rubbish bin',
    explanation: 'Removing harmful debris protects the community and directly fulfills the prophetic teaching on charity, earning reward from Allah and demonstrating responsible citizenship.',
    socraticHint: 'Which protective action safely removes the hazardous obstacle to protect fellow schoolmates from injury?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-006',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'According to prophetic Hadith, what kind of words are rewarded as an act of charity (Sadaqah)?',
    text: 'According to prophetic Hadith, what kind of words are rewarded as an act of charity (Sadaqah)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A good, kind, and peaceful word (Al-Kalimatu at-tayyibah sadaqah)',
      'Sharp, sarcastic insults that make everyone in class laugh',
      'Boastful words about how rich one’s parents are',
      'Lies told to save a friend from being punished by a teacher'
    ],
    correctAnswer: 'A good, kind, and peaceful word (Al-Kalimatu at-tayyibah sadaqah)',
    explanation: 'The Prophet (SAW) said: "Al-kalimatu at-tayyibah sadaqah"—"A good word is charity." Speaking politely, comforting the sad, encouraging a struggling classmate, and giving good advice are all rewarded.',
    socraticHint: 'What kind of words ("Al-Kalimah at-Tayyibah") that bring comfort and truth are rewarded as Sadaqah?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-007',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'How does planting trees and crops qualify as ongoing charity (Sadaqah Jariyah) in prophetic teachings?',
    text: 'How does planting trees and crops qualify as ongoing charity (Sadaqah Jariyah) in prophetic teachings?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Whenever a bird, wild animal, or human eats fruit or finds shade from that tree, it is recorded as a continuous charity for the planter',
      'Because trees turn into solid blocks of silver in Paradise',
      'Because only people who own orchards are allowed to enter the mosque',
      'Because chopping down trees is mandatory during festival days'
    ],
    correctAnswer: 'Whenever a bird, wild animal, or human eats fruit or finds shade from that tree, it is recorded as a continuous charity for the planter',
    explanation: 'The Prophet (SAW) said: "There is no Muslim who plants a tree or sows seeds and then a bird, or a person, or an animal eats from it, but it is regarded as a charity for him" (Bukhari and Muslim).',
    socraticHint: 'How does providing nourishment and shade for birds, animals, and humans yield continuous charity?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-008',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'Bilal does not have pocket money to donate to the school charity box. How can he practice Sadaqah based on the Hadith of good deeds?',
    text: 'Bilal does not have pocket money to donate to the school charity box. How can he practice Sadaqah based on the Hadith of good deeds?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By helping sweep the classroom, smiling warmly at peers, speaking kindly, and assisting a classmate with physical challenges',
      'By borrowing money from a shopkeeper with interest to put in the charity box',
      'By feeling sad and believing that poor children have no way to earn rewards from Allah',
      'By taking money from his mother’s purse without permission to give to charity'
    ],
    correctAnswer: 'By helping sweep the classroom, smiling warmly at peers, speaking kindly, and assisting a classmate with physical challenges',
    explanation: 'Islam opens the door of charity to all people. Physical help, cheerful smiles, kind speech, and caring for others are authentic forms of non-monetary Sadaqah fully rewarded by Allah.',
    socraticHint: 'Which practical everyday actions of helpfulness, warm smiles, and kind words provide non-financial Sadaqah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-009',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What did the Prophet (SAW) say about directing someone to a good action (Hadith in Sahih Muslim)?',
    text: 'What did the Prophet (SAW) say about directing someone to a good action (Hadith in Sahih Muslim)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The one who guides someone to a good deed will have a reward equal to the one who performs it',
      'Guiding others takes away all the reward from your own good deeds',
      'You should keep good deeds a secret so no one else learns how to do them',
      'Only religious scholars are permitted to direct people toward good deeds'
    ],
    correctAnswer: 'The one who guides someone to a good deed will have a reward equal to the one who performs it',
    explanation: 'The Prophet (SAW) said: "Man dalla ‘ala khayrin falahu mithlu ajri fa’ilihi"—"Whoever guides someone to a good deed will have a reward like that of its doer." Encouraging others multiplies our own rewards.',
    socraticHint: 'What equal reward is granted to someone who guides and encourages another person to do a good deed?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-010',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'How does greeting a fellow Muslim with "As-salamu alaykum" (Peace be upon you) fulfill the Hadith of good deeds?',
    text: 'How does greeting a fellow Muslim with "As-salamu alaykum" (Peace be upon you) fulfill the Hadith of good deeds?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is a prayer of peace, mercy, and divine blessing that fosters love, breaks arrogance, and is rewarded as a good deed',
      'It is a military greeting only used when greeting army commanders',
      'It is a secret password that allows people into trading markets',
      'It replaces the need to perform the five daily prayers'
    ],
    correctAnswer: 'It is a prayer of peace, mercy, and divine blessing that fosters love, breaks arrogance, and is rewarded as a good deed',
    explanation: 'The Salam greeting is an act of worship and charity. The Prophet (SAW) taught: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I guide you to something that will spread love? Spread peace (Salam) among yourselves."',
    socraticHint: 'How does spreading the greeting of peace foster communal love and earn divine rewards as a good deed?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-011',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'Why did the Prophet (SAW) emphasize non-monetary acts of charity alongside financial Sadaqah?',
    text: 'Why did the Prophet (SAW) emphasize non-monetary acts of charity alongside financial Sadaqah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To ensure that every believer, rich or poor, can earn immense spiritual rewards and cultivate a compassionate, active character in society',
      'Because physical money has no real value in the sight of Allah',
      'To prevent wealthy people from giving their wealth to the poor',
      'Because the early Muslim community had completely banned the use of gold coins'
    ],
    correctAnswer: 'To ensure that every believer, rich or poor, can earn immense spiritual rewards and cultivate a compassionate, active character in society',
    explanation: 'By including smiles, good speech, guiding travelers, and removing obstacles, Islam democratizes charity, empowering every individual to actively contribute to community welfare and spiritual elevation regardless of wealth.',
    socraticHint: 'How does defining good deeds as charity allow every person regardless of income to participate in Sadaqah?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-012',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'Which of the following actions best illustrates the spirit of "Kullu ma’roofin sadaqah" in a Kenyan primary school?',
    text: 'Which of the following actions best illustrates the spirit of "Kullu ma’roofin sadaqah" in a Kenyan primary school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sharing a textbook with a classmate who forgot theirs, listening patiently to a troubled friend, and picking up dropped pens',
      'Demanding rent before allowing a classmate to sit at the same wooden desk',
      'Hiding revision questions from other students so only you get the top grade',
      'Mocking pupils who make pronunciation mistakes during English reading'
    ],
    correctAnswer: 'Sharing a textbook with a classmate who forgot theirs, listening patiently to a troubled friend, and picking up dropped pens',
    explanation: 'Every act of selfless kindness, sharing learning materials, offering comfort, and helping peers embodies the prophetic standard of "Every good deed is charity."',
    socraticHint: 'Which collection of everyday helpful actions demonstrates true non-monetary charity at school?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },

  // ==========================================
  // Unit 3 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-ire-u3-013',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'How did the Prophet Muhammad (SAW) define true strength in the famous Hadith narrated by Abu Hurairah (RA)?',
    text: 'How did the Prophet Muhammad (SAW) define true strength in the famous Hadith narrated by Abu Hurairah (RA)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The strong person is not the one who overpowers others in wrestling; the strong person is the one who controls himself when angry',
      'The strong person is the one who can lift fifty heavy sacks of grain at the market',
      'The strong person is the one who carries the heaviest iron shield in battle',
      'The strong person is the one who shouts insults louder than anyone else'
    ],
    correctAnswer: 'The strong person is not the one who overpowers others in wrestling; the strong person is the one who controls himself when angry',
    explanation: 'The Prophet (SAW) said: "Laysa ash-shadeedu bis-sura’ah, innama ash-shadeedu alladhee yamliku nafsahu ‘inda al-ghadab"—"The strong person is not the one who can wrestle others down; rather, the strong person is the one who controls himself in anger."',
    socraticHint: 'Does the Prophet define true strength as physical muscle power or as self-control over anger?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-014',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What spiritual phrase did the Prophet (SAW) instruct a person to recite when they feel the heat of anger rising within them?',
    text: 'What spiritual phrase did the Prophet (SAW) instruct a person to recite when they feel the heat of anger rising within them?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A’udhu billahi minash-shaytanir-rajeem (I seek refuge in Allah from the accursed Satan)',
      'Subhanaka la ‘ilma lana illa ma ‘allamtana',
      'Hasbunallahu wa ni’mal-wakeel',
      'Alhamdulillah ‘ala kulli haal'
    ],
    correctAnswer: 'A’udhu billahi minash-shaytanir-rajeem (I seek refuge in Allah from the accursed Satan)',
    explanation: 'When two men argued in front of the Prophet (SAW) and one became red with anger, the Prophet said: "I know a word which, if he were to say it, what he feels would leave him: ‘A’udhu billahi minash-shaytanir-rajeem’" (Bukhari).',
    socraticHint: 'Which phrase of seeking refuge in Allah from Satan cools down the fire of rage?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-015',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What physical action did the Prophet (SAW) advise a person to take if they become angry while standing up (Sunan Abi Dawud)?',
    text: 'What physical action did the Prophet (SAW) advise a person to take if they become angry while standing up (Sunan Abi Dawud)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He should sit down; if the anger leaves him, well and good, otherwise he should lie down',
      'He should run around the house three times shouting loudly',
      'He should punch the nearest wooden door to release energy',
      'He should climb onto the roof of the house and stay there'
    ],
    correctAnswer: 'He should sit down; if the anger leaves him, well and good, otherwise he should lie down',
    explanation: 'The Prophet (SAW) said: "When one of you becomes angry while standing, he should sit down. If the anger leaves him, fine; otherwise, he should lie down." Lowering posture reduces physical arousal and prevents aggressive actions.',
    socraticHint: 'What change of physical posture from standing to sitting down calms rising anger?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-016',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'Why does performing Wudhu (ablution) with cool water help extinguish anger according to prophetic wisdom?',
    text: 'Why does performing Wudhu (ablution) with cool water help extinguish anger according to prophetic wisdom?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Anger is from Satan, who was created from fire, and fire is extinguished by water',
      'Wudhu is only meant to wash off physical dirt from the hands',
      'Cold water makes a person sleepy so they forget why they were angry',
      'Water washes away all memory of who offended you'
    ],
    correctAnswer: 'Anger is from Satan, who was created from fire, and fire is extinguished by water',
    explanation: 'The Prophet (SAW) explained: "Anger comes from the devil, and the devil was created from fire; fire is extinguished only with water. So when one of you gets angry, let him perform ablution (Wudhu)" (Abu Dawud).',
    socraticHint: 'How does washing with cool water physically and spiritually extinguish the fiery temper sparked by Satan?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-017',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What threefold social guideline did the Prophet (SAW) link directly to faith in Allah and the Last Day (Sahih al-Bukhari)?',
    text: 'What threefold social guideline did the Prophet (SAW) link directly to faith in Allah and the Last Day (Sahih al-Bukhari)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Whoever believes in Allah and the Last Day should honor his neighbor, honor his guest, and speak good or remain silent',
      'Whoever believes in Allah should conquer foreign cities, collect gold, and build fortresses',
      'Whoever believes in Allah should never speak to strangers, never share food, and live in isolation',
      'Whoever believes in Allah should travel across the sea every three months'
    ],
    correctAnswer: 'Whoever believes in Allah and the Last Day should honor his neighbor, honor his guest, and speak good or remain silent',
    explanation: 'The Prophet (SAW) declared: "Whoever believes in Allah and the Last Day, let him honor his neighbor; whoever believes in Allah and the Last Day, let him honor his guest; and whoever believes in Allah and the Last Day, let him speak good or remain silent."',
    socraticHint: 'Which three duties—honoring neighbors, welcoming guests, and guarding speech—are signs of true faith in the Last Day?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-018',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'How did the Prophet (SAW) emphasize the rights of the neighbor regarding Archangel Jibril’s repeated reminders?',
    text: 'How did the Prophet (SAW) emphasize the rights of the neighbor regarding Archangel Jibril’s repeated reminders?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Jibril kept enjoining good treatment of the neighbor so persistently that the Prophet thought he would make the neighbor an heir to his estate',
      'Jibril instructed that neighbors should build stone walls between their compounds',
      'Jibril advised that neighbors should never share food during festivals',
      'Jibril warned that neighbors should only be greeted once a year'
    ],
    correctAnswer: 'Jibril kept enjoining good treatment of the neighbor so persistently that the Prophet thought he would make the neighbor an heir to his estate',
    explanation: 'The Prophet (SAW) said: "Jibril continued to advise me to treat neighbors well until I thought he would make them heirs" (Bukhari & Muslim). This shows the sacred, profound importance of neighborly kindness in Islam.',
    socraticHint: 'What extreme level of neighborly care did Jibril advise, to the point of almost making the neighbor an heir?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-019',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'In a housing estate in Nakuru, a neighbor plays loud music late at night, disturbing babies and elderly residents. How does this behavior violate prophetic teachings?',
    text: 'In a housing estate in Nakuru, a neighbor plays loud music late at night, disturbing babies and elderly residents. How does this behavior violate prophetic teachings?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Prophet (SAW) stated: "By Allah, he does not believe... the one whose neighbor is not safe from his harm and annoyance"',
      'Playing loud music is recommended because it keeps neighborhood watchmen awake',
      'It is permissible as long as the music has lyrics praising ancient kingdoms',
      'The Prophet encouraged disturbing neighbors to test their level of patience'
    ],
    correctAnswer: 'The Prophet (SAW) stated: "By Allah, he does not believe... the one whose neighbor is not safe from his harm and annoyance"',
    explanation: 'The Prophet (SAW) solemnly swore: "By Allah, he does not believe! ... He whose neighbor is not safe from his mischief/harm (Bawa’iqahu)" (Bukhari). Causing noise pollution and disturbance harms neighbors and violates Islamic ethics.',
    socraticHint: 'Which severe Hadith warns that one whose neighbor is not safe from their harm lacks true faith?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-020',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'During a football match at school, an opponent accidentally trips Hamza. Hamza feels an urge to punch the opponent. What is the prophetic response?',
    text: 'During a football match at school, an opponent accidentally trips Hamza. Hamza feels an urge to punch the opponent. What is the prophetic response?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Control his anger, say "A’udhu billah," accept the opponent’s apology, and shake hands with sportsmanship',
      'Punch the opponent immediately to prove that he is a strong fighter',
      'Throw mud at the referee and storm off the football pitch shouting insults',
      'Call older siblings to beat up the opponent after school dismisses'
    ],
    correctAnswer: 'Control his anger, say "A’udhu billah," accept the opponent’s apology, and shake hands with sportsmanship',
    explanation: 'The Prophet (SAW) praised the one who controls their temper in provocation. Controlling his reaction proves Hamza’s true moral strength, diffusing violence and showing Islamic sportsmanship.',
    socraticHint: 'Which reaction demonstrates true strength through self-restraint and peaceful forgiveness over retaliation?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-021',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'How should a Muslim family treat a non-Muslim neighbor who lives next door in a Kenyan estate?',
    text: 'How should a Muslim family treat a non-Muslim neighbor who lives next door in a Kenyan estate?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'With full neighborly respect, kindness, sharing food, checking on them in illness, and living in peaceful coexistence',
      'By ignoring them completely and refusing to greet them because of different religious beliefs',
      'By throwing garbage over their fence into their compound',
      'By demanding that they convert to Islam before receiving any neighborly assistance'
    ],
    correctAnswer: 'With full neighborly respect, kindness, sharing food, checking on them in illness, and living in peaceful coexistence',
    explanation: 'Scholars of Islam explain that neighbors have rights: a non-Muslim neighbor who is not a relative has the sacred right of neighborliness (Haqq al-Jiwar). Kindness, fairness, and generosity are owed to all neighbors regardless of religion.',
    socraticHint: 'Does Islamic neighborly duty require kindness, respect, and peaceful coexistence toward all neighbors regardless of their faith?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-022',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What did the Prophet (SAW) advise his companion Abu Dharr (RA) regarding cooking broth at home (Sahih Muslim)?',
    text: 'What did the Prophet (SAW) advise his companion Abu Dharr (RA) regarding cooking broth at home (Sahih Muslim)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'When you cook broth (soup/stew), add more water to it and send some of it to your neighbors with kindness',
      'Cook only inside closed rooms so your neighbors do not smell your food',
      'Sell leftover soup to your neighbors for a few copper coins',
      'Never cook hot meals when guests are visiting your house'
    ],
    correctAnswer: 'When you cook broth (soup/stew), add more water to it and send some of it to your neighbors with kindness',
    explanation: 'The Prophet (SAW) advised Abu Dharr: "When you cook broth, increase its water and take care of your neighbors." This beautiful tradition encourages sharing food and looking after neighbors’ well-being.',
    socraticHint: 'What advice about adding more water to cooked broth to share with neighbors did the Prophet give Abu Dharr?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-023',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'Why does the Prophet (SAW) command: "Whoever believes in Allah and the Last Day, let him speak good or remain silent"?',
    text: 'Why does the Prophet (SAW) command: "Whoever believes in Allah and the Last Day, let him speak good or remain silent"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because words carry moral weight; speaking good builds love and earns rewards, while speaking careless evil causes harm and divine accountability',
      'Because humans have a limited quota of words they can speak before losing their voices',
      'Because speaking in public was forbidden by ancient Arabian customary laws',
      'Because silence is the only method to prevent human beings from catching illnesses'
    ],
    correctAnswer: 'Because words carry moral weight; speaking good builds love and earns rewards, while speaking careless evil causes harm and divine accountability',
    explanation: 'Speech is a reflection of the soul. Controlling one’s speech prevents slander, lies, insults, and gossip. If one cannot say something truthful, kind, or beneficial, silence is the safest and most righteous path.',
    socraticHint: 'Why is keeping silent better than uttering words that cause hurt, falsehood, or sin?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },
  {
    id: 'q-g5-ire-u3-024',
    subStrandId: 'substrand-g5-ire-u3',
    prompt: 'What profound connection exists between emotional self-control, neighborly kindness, and genuine faith (Iman)?',
    text: 'What profound connection exists between emotional self-control, neighborly kindness, and genuine faith (Iman)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Faith is not just theoretical ritual; it must be manifested through gentle emotional restraint, gracious neighborly relations, and protective social harmony',
      'Faith requires physical isolation from all neighbors and community members',
      'Faith allows believers to be angry and aggressive whenever they want',
      'Emotional restraint and neighborly rights were invented by modern civil laws without spiritual basis'
    ],
    correctAnswer: 'Faith is not just theoretical ritual; it must be manifested through gentle emotional restraint, gracious neighborly relations, and protective social harmony',
    explanation: 'The Prophet (SAW) repeatedly linked belief in Allah and the Last Day with social ethics: controlling anger, treating neighbors with honor, and guarding speech prove that faith has transformed one’s character.',
    socraticHint: 'How do self-control, peaceful speech, and honoring neighbors prove that true faith resides in a believer’s heart?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U3'
  },

  // ==========================================
  // Unit 4 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-ire-u4-001',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'In which mountain and cave outside Makkah did Prophet Muhammad (SAW) retreat for worship and contemplation before receiving revelation?',
    text: 'In which mountain and cave outside Makkah did Prophet Muhammad (SAW) retreat for worship and contemplation before receiving revelation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Cave Hira atop Jabal an-Nur (Mount of Light)',
      'Cave Thawr atop Jabal Thawr',
      'Mount Sinai in the Sinai desert',
      'Mount Uhud outside Madinah'
    ],
    correctAnswer: 'Cave Hira atop Jabal an-Nur (Mount of Light)',
    explanation: 'Prophet Muhammad (SAW) retreated to Cave Hira located on Jabal an-Nur (Mount of Light) near Makkah to pray and reflect away from the polytheism and corruption of Makkah society.',
    socraticHint: 'Which mountain called the "Mount of Light" houses the famous Cave of Hira?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-002',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'In which holy month and at what age did Prophet Muhammad (SAW) receive the first divine revelation (Bi’thah)?',
    text: 'In which holy month and at what age did Prophet Muhammad (SAW) receive the first divine revelation (Bi’thah)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'During the month of Ramadan at the age of forty (40) years',
      'During the month of Muharram at the age of twenty-five (25) years',
      'During the month of Shawwal at the age of sixty-three (63) years',
      'During the month of Rajab at the age of twelve (12) years'
    ],
    correctAnswer: 'During the month of Ramadan at the age of forty (40) years',
    explanation: 'The Prophet (SAW) received the first revelation in the month of Ramadan (Laylat al-Qadr) in 610 CE when he was forty years old, marking the beginning of his prophetic mission.',
    socraticHint: 'In which fasting month of the Islamic calendar and at what mature age of 40 was the first revelation sent?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-003',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Which archangel appeared to Prophet Muhammad (SAW) in Cave Hira with the first command of revelation?',
    text: 'Which archangel appeared to Prophet Muhammad (SAW) in Cave Hira with the first command of revelation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Archangel Jibril (Gabriel)',
      'Archangel Mika’il (Michael)',
      'Archangel Israfil (Raphael)',
      'Archangel Izra’il (Angel of Death)'
    ],
    correctAnswer: 'Archangel Jibril (Gabriel)',
    explanation: 'Archangel Jibril (AS), the angel entrusted with delivering divine revelation to all prophets, appeared to Prophet Muhammad (SAW) in Cave Hira with the words of Allah.',
    socraticHint: 'Which archangel is specifically tasked by Allah to deliver revelation to the Prophets?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-004',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What was the very first word spoken by Angel Jibril to Prophet Muhammad (SAW) in Cave Hira?',
    text: 'What was the very first word spoken by Angel Jibril to Prophet Muhammad (SAW) in Cave Hira?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Iqra! (Read / Recite!)',
      'Qum! (Stand up!)',
      'Inzar! (Warn!)',
      'Sallim! (Greet with peace!)'
    ],
    correctAnswer: 'Iqra! (Read / Recite!)',
    explanation: 'The very first word revealed was "Iqra!" (Read or Recite!), emphasizing the fundamental importance of literacy, divine knowledge, and recitation in Islam.',
    socraticHint: 'Which one-word divine command meaning "Read" or "Recite" opened the revelation of the Qur’an?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-005',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What was the humble reply of Prophet Muhammad (SAW) when Angel Jibril commanded him to read?',
    text: 'What was the humble reply of Prophet Muhammad (SAW) when Angel Jibril commanded him to read?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ma ana bi-qari (I am not a reader / I do not know how to read)',
      'I can read all the books in the libraries of Persia',
      'I will only read if you give me a written scroll of papyrus',
      'I do not wish to read anything until tomorrow morning'
    ],
    correctAnswer: 'Ma ana bi-qari (I am not a reader / I do not know how to read)',
    explanation: 'The Prophet (SAW) was unlettered (Ummi), having never been taught to read or write by human teachers. He replied honestly: "Ma ana bi-qari" ("I do not know how to read").',
    socraticHint: 'What honest answer acknowledging that he was unlettered did the Prophet give to Jibril?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-006',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Which five verses of the Holy Qur’an were the very first to be revealed in Cave Hira (Surah Al-Alaq 96:1-5)?',
    text: 'Which five verses of the Holy Qur’an were the very first to be revealed in Cave Hira (Surah Al-Alaq 96:1-5)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Read in the name of your Lord who created; created man from a clinging clot. Read! And your Lord is the Most Generous, who taught by the pen, taught man that which he knew not',
      'All praise is due to Allah, Lord of the worlds, the Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense',
      'Say, "He is Allah, who is One; Allah, the Eternal Refuge; He neither begets nor is born, nor is there to Him any equivalent"',
      'When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes'
    ],
    correctAnswer: 'Read in the name of your Lord who created; created man from a clinging clot. Read! And your Lord is the Most Generous, who taught by the pen, taught man that which he knew not',
    explanation: 'Surah Al-Alaq (96:1-5) was the first revelation, teaching that Allah is the Creator who fashioned humanity from a clinging embryo, the Most Generous who bestowed knowledge through the pen.',
    socraticHint: 'Which verses proclaim that Allah created humanity from a clinging clot and taught man by the pen?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-007',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'When the Prophet (SAW) returned home trembling with awe, what did he say to his wife Sayyidatna Khadijah (RA)?',
    text: 'When the Prophet (SAW) returned home trembling with awe, what did he say to his wife Sayyidatna Khadijah (RA)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Zammilooni! Zammilooni! (Cover me! Cover me / Wrap me up!)',
      'Prepare a celebratory feast with fifty roast sheep immediately!',
      'Pack our luggage so we can move to the city of Yathrib right now!',
      'Call the tribal elders of Quraysh to come to our home!'
    ],
    correctAnswer: 'Zammilooni! Zammilooni! (Cover me! Cover me / Wrap me up!)',
    explanation: 'Overwhelmed by the magnitude of the encounter with Jibril and the divine words, the Prophet (SAW) returned with his heart trembling, saying to Khadijah: "Zammilooni, zammilooni" (Cover me, wrap me up).',
    socraticHint: 'Which emotional words pleading to be wrapped in a cloak did the trembling Prophet speak to Khadijah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-008',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What profound qualities of the Prophet’s character did Sayyidatna Khadijah (RA) highlight to comfort him that Allah would never disgrace him?',
    text: 'What profound qualities of the Prophet’s character did Sayyidatna Khadijah (RA) highlight to comfort him that Allah would never disgrace him?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'You uphold ties of kinship, speak the truth, help the poor and needy, serve guests generously, and assist victims of disaster',
      'You have accumulated more gold and silver than any merchant in the Arabian peninsula',
      'You have defeated fifty warriors in wrestling contests outside Makkah',
      'You possess the fastest war camels and finest silk robes in Hijaz'
    ],
    correctAnswer: 'You uphold ties of kinship, speak the truth, help the poor and needy, serve guests generously, and assist victims of disaster',
    explanation: 'Khadijah comforted him with unwavering faith: "Never! By Allah, Allah will never disgrace you. You keep good relations with kith and kin, tell the truth, help the poor and destitute, serve your guests generously, and assist the deserving calamity-afflicted ones."',
    socraticHint: 'Which moral virtues of helping the destitute, honoring guests, and upholding kinship did Khadijah recount?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-009',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'To whom did Sayyidatna Khadijah (RA) take Prophet Muhammad (SAW) to seek understanding about the supernatural encounter in Cave Hira?',
    text: 'To whom did Sayyidatna Khadijah (RA) take Prophet Muhammad (SAW) to seek understanding about the supernatural encounter in Cave Hira?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Waraqah ibn Nawfal, her elderly cousin who was a scholar of the ancient scriptures',
      'Abu Jahl, the chief elder of the Banu Makhzum clan',
      'Herod Antipas, the governor residing in Jerusalem',
      'A Roman fortune teller traveling with a trade caravan'
    ],
    correctAnswer: 'Waraqah ibn Nawfal, her elderly cousin who was a scholar of the ancient scriptures',
    explanation: 'Khadijah took him to her paternal cousin Waraqah ibn Nawfal, an elderly, blind scholar who had studied the Hebrew scriptures (the Torah and Gospel) and followed monotheism.',
    socraticHint: 'Which learned monotheistic scholar of ancient scriptures was Khadijah’s elderly cousin?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-010',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What did Waraqah ibn Nawfal confirm after listening attentively to what the Prophet (SAW) experienced in Cave Hira?',
    text: 'What did Waraqah ibn Nawfal confirm after listening attentively to what the Prophet (SAW) experienced in Cave Hira?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'This is the Namus (Archangel Jibril) whom Allah sent to Prophet Musa (Moses), and you are the promised Prophet of this nation',
      'This was a bad desert dream caused by fasting too long in the heat',
      'You should immediately pay thirty silver coins to the keepers of the Ka’bah idols',
      'You should stop meditating and become a caravan guard in Syria'
    ],
    correctAnswer: 'This is the Namus (Archangel Jibril) whom Allah sent to Prophet Musa (Moses), and you are the promised Prophet of this nation',
    explanation: 'Waraqah exclaimed: "This is the Namus (the heavenly angel of divine secrets, Jibril) whom Allah sent down to Musa (Moses). I wish I were young and alive when your people will expel you!" He confirmed Muhammad’s prophethood.',
    socraticHint: 'Which heavenly angel of revelation ("Namus") sent previously to Prophet Musa did Waraqah identify?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-011',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What lesson on marriage and family support can modern Kenyan Muslim families learn from Sayyidatna Khadijah (RA)?',
    text: 'What lesson on marriage and family support can modern Kenyan Muslim families learn from Sayyidatna Khadijah (RA)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A spouse should be a source of comfort, emotional security, unwavering faith, and practical encouragement in moments of anxiety and crisis',
      'Spouses should compete against each other to see who earns more money in business',
      'When a family member faces a challenge, others should laugh and tell them to handle it alone',
      'Family members should keep their religious beliefs completely secret from each other'
    ],
    correctAnswer: 'A spouse should be a source of comfort, emotional security, unwavering faith, and practical encouragement in moments of anxiety and crisis',
    explanation: 'Khadijah’s profound wisdom, emotional support, and absolute belief in her husband model ideal marital partnership. Her reassuring response provided vital stability during the momentous birth of Islam.',
    socraticHint: 'How does Khadijah’s loving comfort and emotional strength model the ideal supportive spouse?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-012',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Why was the revelation of "Iqra" (Read) and the mention of "The Pen" in Surah Al-Alaq revolutionary in 7th-century Arabia?',
    text: 'Why was the revelation of "Iqra" (Read) and the mention of "The Pen" in Surah Al-Alaq revolutionary in 7th-century Arabia?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In a largely illiterate society driven by tribal warfare and superstition, it elevated reading, literacy, education, and moral truth as the supreme path of human honor',
      'It made pens the most expensive trade commodity in the markets of Yemen',
      'It required everyone in Arabia to abandon agriculture and become professional scribes',
      'It proved that books were only intended for foreign kings and rulers'
    ],
    correctAnswer: 'In a largely illiterate society driven by tribal warfare and superstition, it elevated reading, literacy, education, and moral truth as the supreme path of human honor',
    explanation: 'Pre-Islamic Arabia was an oral, largely unlettered society (Jahiliyyah). Divine revelation began by honoring reading and the pen, establishing literacy and pursuit of knowledge as sacred duties for all believers.',
    socraticHint: 'How did beginning revelation with reading and the pen transform an illiterate tribal society into a civilization of learning?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },

  // ==========================================
  // Unit 4 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-ire-u4-013',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Who was the very first person in the world to accept Islam and believe in Prophet Muhammad’s message?',
    text: 'Who was the very first person in the world to accept Islam and believe in Prophet Muhammad’s message?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sayyidatna Khadijah bint Khuwaylid (RA)',
      'Abu Bakr as-Siddiq (RA)',
      'Ali ibn Abi Talib (RA)',
      'Zayd ibn Harithah (RA)'
    ],
    correctAnswer: 'Sayyidatna Khadijah bint Khuwaylid (RA)',
    explanation: 'Sayyidatna Khadijah (RA) was the first human being to embrace Islam. She believed in him without hesitation, supported him with her wealth, and comforted him through every early trial.',
    socraticHint: 'Which noble wife of the Prophet was the first human being to believe and embrace Islam?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-014',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Who was the first free adult male to accept Islam when invited by the Prophet (SAW)?',
    text: 'Who was the first free adult male to accept Islam when invited by the Prophet (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Abu Bakr as-Siddiq (RA)',
      'Umar ibn al-Khattab (RA)',
      'Uthman ibn Affan (RA)',
      'Hamzah ibn Abd al-Muttalib (RA)'
    ],
    correctAnswer: 'Abu Bakr as-Siddiq (RA)',
    explanation: 'Abu Bakr as-Siddiq (RA) was the first adult male outside the household to accept Islam. The Prophet said: "Whenever I invited anyone to Islam, they had some hesitation, except Abu Bakr; he accepted immediately without hesitation."',
    socraticHint: 'Which loyal friend, known as "As-Siddiq" (The Truthful), was the first adult male to accept Islam?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-015',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Who was the first youth/child to accept Islam, being approximately ten years old at the time?',
    text: 'Who was the first youth/child to accept Islam, being approximately ten years old at the time?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ali ibn Abi Talib (RA)',
      'Abdullah ibn Abbas (RA)',
      'Usamah ibn Zayd (RA)',
      'Al-Hasan ibn Ali (RA)'
    ],
    correctAnswer: 'Ali ibn Abi Talib (RA)',
    explanation: 'Ali ibn Abi Talib (RA), the Prophet’s young cousin living in his household, was the first child/youth to accept Islam at approximately ten years of age, demonstrating great spiritual maturity.',
    socraticHint: 'Which young cousin of the Prophet living in his home was the very first child to accept Islam?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-016',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Who was the first freed slave to accept Islam and join the early believers in Makkah?',
    text: 'Who was the first freed slave to accept Islam and join the early believers in Makkah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Zayd ibn Harithah (RA)',
      'Bilal ibn Rabah (RA)',
      'Salman al-Farsi (RA)',
      'Ammar ibn Yasir (RA)'
    ],
    correctAnswer: 'Zayd ibn Harithah (RA)',
    explanation: 'Zayd ibn Harithah (RA), who had been freed and adopted by the Prophet (SAW), was the first freed slave to accept Islam, proving that Islam honors individuals across all social backgrounds.',
    socraticHint: 'Which beloved companion, freed and raised by the Prophet, was the first freed slave to become Muslim?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-017',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'How long did the initial period of secret preaching (Da’wah Sirriyyah) last in Makkah before public proclamation began?',
    text: 'How long did the initial period of secret preaching (Da’wah Sirriyyah) last in Makkah before public proclamation began?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Three (3) years',
      'Ten (10) years',
      'One (1) month',
      'Seven (7) years'
    ],
    correctAnswer: 'Three (3) years',
    explanation: 'The secret phase of Da’wah lasted for three years, during which the Prophet (SAW) privately invited trustworthy individuals, building a firm spiritual and moral core without prematurely provoking violent opposition.',
    socraticHint: 'How many years—three years—did the Prophet spend quietly sharing the message with close trusted individuals?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-018',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Whose home near Mount Safa was chosen by Prophet Muhammad (SAW) as the secret meeting place and sanctuary for the early Muslims?',
    text: 'Whose home near Mount Safa was chosen by Prophet Muhammad (SAW) as the secret meeting place and sanctuary for the early Muslims?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The house of Al-Arqam ibn Abi al-Arqam (Dar al-Arqam)',
      'The house of Abu Sufyan ibn Harb',
      'The palace of the Roman ambassador in Makkah',
      'The house of Abu Jahl at the town square'
    ],
    correctAnswer: 'The house of Al-Arqam ibn Abi al-Arqam (Dar al-Arqam)',
    explanation: 'The house of Al-Arqam (Dar al-Arqam), located near Mount Safa, served as the first educational center and sanctuary where early Muslims gathered to pray, learn the Qur’an, and receive prophetic guidance.',
    socraticHint: 'Which young companion’s home ("Dar al-Arqam") became the secret center of early Islamic teaching?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-019',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'Why did Prophet Muhammad (SAW) strategically choose the house of Al-Arqam as the secret center for the early Muslim community?',
    text: 'Why did Prophet Muhammad (SAW) strategically choose the house of Al-Arqam as the secret center for the early Muslim community?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Al-Arqam was a young, quiet teenager whose home would not arouse suspicion from the hostile Quraysh leaders',
      'The house had high stone towers equipped with archer weapons',
      'It was the largest commercial warehouse in Makkah',
      'It was located outside the Arabian desert near the Red Sea'
    ],
    correctAnswer: 'Al-Arqam was a young, quiet teenager whose home would not arouse suspicion from the hostile Quraysh leaders',
    explanation: 'Al-Arqam was only around 16 years old and not from the Prophet’s clan (Banu Hashim), so Quraysh never suspected that the new movement would hold meetings in a youth’s home, ensuring privacy and safety.',
    socraticHint: 'Why would the home of a young, unobtrusive teenager near Safa avoid raising suspicion from Quraysh chiefs?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-020',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'How did Abu Bakr as-Siddiq (RA) contribute decisively to the growth of Islam during the secret Da’wah period?',
    text: 'How did Abu Bakr as-Siddiq (RA) contribute decisively to the growth of Islam during the secret Da’wah period?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He actively reached out to influential, upright friends like Uthman ibn Affan, Abdur-Rahman ibn Awf, and Talhah, who all accepted Islam',
      'He purchased swords from Syria to organize an armed uprising in Makkah',
      'He advised the Prophet to keep Islam secret for fifty years',
      'He moved his business permanently to Persia to avoid meeting Quraysh leaders'
    ],
    correctAnswer: 'He actively reached out to influential, upright friends like Uthman ibn Affan, Abdur-Rahman ibn Awf, and Talhah, who all accepted Islam',
    explanation: 'Abu Bakr used his high social standing, honesty, and broad network to invite noble friends. Through his personal Da’wah, major leaders like Uthman, Abdur-Rahman ibn Awf, Sa’d ibn Abi Waqqas, and Az-Zubayr joined Islam.',
    socraticHint: 'Which key early leaders did Abu Bakr personally invite into Islam using his trusted reputation?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-021',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What did young Ali ibn Abi Talib’s decision to accept Islam at age ten teach Kenyan primary school learners today?',
    text: 'What did young Ali ibn Abi Talib’s decision to accept Islam at age ten teach Kenyan primary school learners today?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Young people possess moral discernment and spiritual capacity, and can choose truth and righteousness regardless of their young age',
      'Children should wait until they are forty years old before learning about religion',
      'Young people should follow whatever bad habits their peers practice without thinking',
      'Children have no responsibility to pray or practice good morals'
    ],
    correctAnswer: 'Young people possess moral discernment and spiritual capacity, and can choose truth and righteousness regardless of their young age',
    explanation: 'Ali (RA) embraced Islam while still a boy, standing bravely for truth in a polytheistic culture. This proves that children and youth can have strong moral discernment, sincere faith, and leadership in good deeds.',
    socraticHint: 'Can young learners embrace faith, truth, and moral character like ten-year-old Ali did?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-022',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What activities took place inside Dar al-Arqam during the secret phase of Islam?',
    text: 'What activities took place inside Dar al-Arqam during the secret phase of Islam?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Prophet (SAW) taught the newly revealed Qur’anic verses, led communal prayers, instilled Islamic Akhlaq, and fostered deep brotherhood',
      'The Muslims manufactured weapons of war to attack Makkah caravans',
      'The believers engaged in commercial grain trading with Persian merchants',
      'They drafted treaties to divide political control of Makkah with the Quraysh'
    ],
    correctAnswer: 'The Prophet (SAW) taught the newly revealed Qur’anic verses, led communal prayers, instilled Islamic Akhlaq, and fostered deep brotherhood',
    explanation: 'Dar al-Arqam served as a spiritual sanctuary and academy where the early Muslims learned the Qur’an, performed Salah, cultivated spiritual purity (Tazkiyah), and built strong bonds of mutual solidarity.',
    socraticHint: 'Which spiritual, educational, and communal activities formed the core of life inside Dar al-Arqam?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-023',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'How did the diversity among the first four converts (a mature woman, an adult merchant, a young boy, and a freed slave) reflect Islam’s universal appeal?',
    text: 'How did the diversity among the first four converts (a mature woman, an adult merchant, a young boy, and a freed slave) reflect Islam’s universal appeal?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It showed that Islam breaks all social, gender, economic, and age barriers, offering dignity and equality before Allah to all humanity',
      'It showed that only four types of people were ever permitted to accept the Islamic faith',
      'It was a coincidence that had no deeper significance for the early community',
      'It proved that religious belief depends on a person’s tribal wealth and status'
    ],
    correctAnswer: 'It showed that Islam breaks all social, gender, economic, and age barriers, offering dignity and equality before Allah to all humanity',
    explanation: 'The pioneer converts encompassed women (Khadijah), men (Abu Bakr), children (Ali), and former slaves (Zayd), proving from the very beginning that Islam is a universal message of human dignity, justice, and spiritual equality.',
    socraticHint: 'How does the inclusion of a woman, an adult man, a child, and a freed slave demonstrate universal equality in Islam?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  },
  {
    id: 'q-g5-ire-u4-024',
    subStrandId: 'substrand-g5-ire-u4',
    prompt: 'What strategic lesson on wisdom and planning (Hikmah) does the three-year secret phase of Da’wah teach believers?',
    text: 'What strategic lesson on wisdom and planning (Hikmah) does the three-year secret phase of Da’wah teach believers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Noble goals require prudent preparation, establishing a firm foundation, and choosing the right timing before facing public challenges',
      'Believers should be afraid and permanently hide their good deeds from the world',
      'Planning and strategy are forbidden in religious matters because miracles happen automatically',
      'It is wise to abandon one’s principles whenever people disagree with them'
    ],
    correctAnswer: 'Noble goals require prudent preparation, establishing a firm foundation, and choosing the right timing before facing public challenges',
    explanation: 'The Prophet (SAW) balanced divine trust (Tawakkul) with practical wisdom (Hikmah). Building a solid, spiritually grounded core in secret prevented the movement from being crushed prematurely by Quraysh.',
    socraticHint: 'How does wise planning, preparation, and careful timing demonstrate practical wisdom alongside divine trust?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U4'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 2 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
