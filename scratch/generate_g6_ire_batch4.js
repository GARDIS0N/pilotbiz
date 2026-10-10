/**
 * Grade 6 Islamic Religious Education (IRE) - Batch 4 Generator
 * Content: Units 7 & 8 (Swalatul Musafir & Swalatul Janazah; Hajj & Umrah Rites & Spiritual Dimensions)
 * Missions: Orders 141, 142, 143, 144 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-ire-u7-001 to q-g6-ire-u8-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 IRE Batch 4 (Units 7 & 8) ---');

// 1. Units 7 & 8 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ire-u7',
    strandId: 'strand-g6-ire-ibadah',
    learningAreaId: 'la-ire-g6',
    title: 'Swalatul Musafir (Traveler’s Prayer) & Swalatul Janazah (Funeral Prayer)',
    name: 'Swalatul Musafir (Traveler’s Prayer) & Swalatul Janazah (Funeral Prayer)',
    description: 'Special congregational and individual prayers demonstrating Islamic mercy and community duty: Swalatul Musafir (prayer of the traveler) covering the divine concessions (Rukhsah) of shortening four-rak’ah prayers to two (Qasr) and combining prayers (Jam’a: Dhuhr with Asr, Maghrib with Isha) either in advance (Jam’a Taqdim) or delayed (Jam’a Ta’khir), distance and intention prerequisites; Swalatul Janazah (funeral prayer) as a collective obligation (Fardh Kifayah), detailed step-by-step performance of the four Takbirat (Takbir 1: Surah Al-Fatihah, Takbir 2: As-Salat al-Ibrahimiyyah, Takbir 3: heartfelt supplication for the deceased, Takbir 4: general prayer for all Muslims and Tasleem), rites of preparing the deceased (Ghusl, Kafan, Dafan), and the ethical etiquette of comforting grieving families (Ta’ziyah).',
    cbeCompetency: 'Ritual competence, civic empathy, community solidarity, and adherence to Islamic jurisprudence',
    estimatedMinutes: 30,
    order: 7,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ire-u8',
    strandId: 'strand-g6-ire-ibadah',
    learningAreaId: 'la-ire-g6',
    title: 'Hajj & Umrah: Pillars, Rites, Spiritual Dimensions & Global Brotherhood',
    name: 'Hajj & Umrah: Pillars, Rites, Spiritual Dimensions & Global Brotherhood',
    description: 'The fifth pillar of Islam (Hajj) and the lesser pilgrimage (Umrah): Conditions of obligation including capability (Istita’ah - physical, financial, and safety of route); distinctions between Hajj and Umrah; Essential Pillars (Arkan) of Hajj (Ihram from Miqat, Wuquf at Arafat, Tawaf al-Ifadah, Sa’i between Safa and Marwah); Essential Obligations (Wajibat) including spending the night at Muzdalifah and Mina, pelting the Jamarat, shaving or trimming hair (Halq/Taqseer), and the Farewell Circumambulation (Tawaf al-Wada’); the Talbiyah prayer ("Labbaik Allahumma Labbaik"); remembering Prophet Ibrahim (AS) and Sayyidah Hajar (AS); spiritual equality in the seamless white garments of Ihram, reflecting on the Prophet’s Farewell Sermon (Khutbat al-Wada’) denouncing racism and tribal pride, and fostering global solidarity among the worldwide Muslim Ummah.',
    cbeCompetency: 'Comparative ritual literacy, global citizenship, historical empathy, and universal brotherhood',
    estimatedMinutes: 30,
    order: 8,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ire-u7-l1',
    subStrandId: 'substrand-g6-ire-u7',
    title: 'Swalatul Musafir: Rules and Practice of Qasr (Shortening) and Jam’a (Combining)',
    content: 'Islam is a practical religion that accommodates human vulnerability during travel through divine concessions known as Rukhsah.\n\n1. Meaning of Swalatul Musafir:\n- Prayers performed by a traveler on a legitimate journey beyond their home locality (traditionally calculated as roughly 80 kilometers or more).\n\n2. Qasr (Shortening of Prayers):\n- Shortening 4-rak’ah obligatory prayers to 2 rak’ahs.\n- Prayers that CAN be shortened: Dhuhr (4 -> 2), Asr (4 -> 2), and Isha (4 -> 2).\n- Prayers that CANNOT be shortened: Fajr (remains 2 rak’ahs) and Maghrib (remains 3 rak’ahs).\n\n3. Jam’a (Combining Prayers):\n- Combining two prayers within the time period of one:\n  a) Dhuhr and Asr can be combined.\n  b) Maghrib and Isha can be combined.\n  c) Fajr CANNOT be combined with any prayer!\n- Two modes of Jam’a:\n  * Jam’a Taqdim (Early Combination): Praying Asr early in the time of Dhuhr, or praying Isha early in the time of Maghrib.\n  * Jam’a Ta’khir (Delayed Combination): Delaying Dhuhr to pray it during Asr time, or delaying Maghrib to pray it during Isha time.\n\n4. Etiquette and Wisdom:\n- The Prophet (SAW) taught that Allah loves that His concessions (Rukhsah) are accepted just as He loves His obligations (Aza’im) to be observed.\n- When a traveler joins a resident imam leading 4 rak’ahs, the traveler must complete 4 rak’ahs behind the imam.',
    didYouKnow: 'The Prophet Muhammad (SAW) never performed more than two rak’ahs for Dhuhr, Asr, and Isha while traveling throughout his prophetic mission!',
    kenyanContext: 'Kenyan Muslims traveling on the Standard Gauge Railway (SGR) or long-distance buses between Nairobi and Mombasa frequently utilize the concessions of Qasr and Jam’a.',
    order: 13,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u7-l2',
    subStrandId: 'substrand-g6-ire-u7',
    title: 'Swalatul Janazah: The Four Takbirat & Islamic Funeral Rites',
    content: 'Honoring the deceased through dignified burial and prayer is a sacred collective duty in the Muslim community.\n\n1. Concept of Fardh Kifayah:\n- Swalatul Janazah is Fardh Kifayah (a collective communal obligation). If a sufficient group of Muslims performs it, the entire community is relieved of sin; if no one performs it, the whole community bears the sin.\n\n2. Preparation of the Deceased:\n- Ghusl (ritual washing with water and camphor or scented herbs).\n- Kafan (shrouding in clean, simple white unstitched cloths—3 sheets for a man, 5 for a woman).\n- Dafan (burial in the grave facing the Qiblah, without coffins where permissible).\n\n3. How to Perform Swalatul Janazah:\n- Performed entirely standing up—there is NO Ruku (bowing), NO Sujud (prostration), and NO Adhan or Iqamah!\n- It consists of Four Takbirat (saying "Allahu Akbar"):\n  * Takbir 1: Recite Surah Al-Fatihah silently.\n  * Takbir 2: Recite As-Salat al-Ibrahimiyyah (Blessings on the Prophet as said in Tashahhud).\n  * Takbir 3: Make earnest personal du’a for the forgiveness and mercy of the deceased.\n  * Takbir 4: Make du’a for all deceased Muslims, followed by Tasleem (turning the head to the right saying "Assalamu alaykum wa Rahmatullah").\n\n4. Ta’ziyah (Condolence Etiquette):\n- Visiting the bereaved family, offering comforting words ("May Allah magnify your reward and grant patience"), and cooking food for them as the Prophet commanded: "Prepare food for the family of Ja’far, for there has come upon them what engages them."',
    didYouKnow: 'Attending a funeral prayer and accompanying the body to the grave earns two gigantic mountains of divine reward, called "Qiratayn" in the Hadith, each mountain like Mount Uhud!',
    kenyanContext: 'In Kenya, Muslim welfare associations (Kariakoo, Majengo, and Jamia committees) coordinate free Janazah services, demonstrating community unity in times of grief.',
    order: 14,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u8-l1',
    subStrandId: 'substrand-g6-ire-u8',
    title: 'Hajj & Umrah: Conditions, Distinctions and Essential Pillars (Arkan)',
    content: 'Hajj is the fifth pillar of Islam, mandatory once in a lifetime for every capable adult Muslim.\n\n1. Istita’ah (The Condition of Capability):\n- Physical health, mental sanity, safe travel routes, and sufficient halal financial means without neglecting one’s family dependencies.\n\n2. Differences Between Hajj and Umrah:\n- Timing: Hajj must be performed only during the designated months of Shawwal, Dhul-Qa’dah, and Dhul-Hijjah (culminating on 8th-13th Dhul-Hijjah); Umrah can be performed at any time of the year.\n- Status: Hajj is a pillar of Islam (Fardh); Umrah is Sunnah Mu’akkadah.\n- Key Rites: Umrah consists only of Ihram, Tawaf, Sa’i, and Halq/Taqseer. Hajj includes all these plus standing at Arafat, Muzdalifah, Mina, and pelting the Jamarat.\n\n3. The Four Pillars (Arkan) of Hajj:\n- If any pillar is omitted, the Hajj is INVALID and cannot be compensated by animal sacrifice:\n  1) Ihram: Entering the sacred state of intention and dress from the designated Miqat boundary.\n  2) Wuquf at Arafat: Standing in prayer on the plain of Arafat from noon on 9th Dhul-Hijjah until sunset. The Prophet said: "Hajj is Arafat!"\n  3) Tawaf al-Ifadah: Circumambulating the Ka’bah seven times after descending from Arafat and Mina.\n  4) Sa’i: Walking seven times between the hills of Safa and Marwah.\n\n4. Essential Obligations (Wajibat):\n- Staying overnight at Muzdalifah and Mina, throwing pebbles at the Jamarat, shaving or trimming hair, and performing Tawaf al-Wada’ (Farewell circumambulation).',
    didYouKnow: 'The plain of Arafat is where millions of pilgrims stand together in identical white cloths, previewing what the Day of Resurrection (Yawm al-Qiyamah) will feel like before Allah!',
    kenyanContext: 'Every year, the Kenya Hajj Mission coordinates with airlines and government authorities in Nairobi and Mombasa to assist thousands of Kenyan pilgrims departing for Makkah.',
    order: 15,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u8-l2',
    subStrandId: 'substrand-g6-ire-u8',
    title: 'Spiritual Dimensions of Hajj: Universal Equality & The Farewell Sermon',
    content: 'Beyond physical rituals, Hajj is a transformative spiritual journey that unites humanity under the banner of monotheism.\n\n1. The Talbiyah Prayer:\n- The anthem chanted continuously by pilgrims: "Labbaik Allahumma Labbaik, Labbaika la sharika laka Labbaik..." (Here I am at Your service, O Allah, here I am! You have no partner, here I am!).\n- Expresses absolute surrender and joyful response to the call of Prophet Ibrahim (AS).\n\n2. The Legacy of Ibrahim and Hajar:\n- Re-enacting the desperate search of Sayyidah Hajar for water for baby Ismail between Safa and Marwah (Sa’i), which Allah rewarded with the miraculous well of Zamzam.\n- Animal sacrifice (Udh-hiyah / Qurbani) commemorates Ibrahim’s willingness to sacrifice Ismail in supreme obedience to Allah.\n\n3. The Ihram Garment & Radical Equality:\n- For men, two unstitched white cloths (Izar and Rida) strip away all markers of worldly status, royalty, tribe, or wealth.\n- A head of state and a poor farmer stand shoulder to shoulder, indistinguishable before their Creator.\n\n4. The Prophet’s Farewell Sermon (Khutbat al-Wada’):\n- Delivered at Mount of Mercy (Jabal al-Rahmah) on 9th Dhul-Hijjah 10 AH:\n  * Universal brotherhood: "An Arab has no superiority over a non-Arab, nor has a non-Arab any superiority over an Arab; a white has no superiority over a black, nor a black over a white, except by piety (Taqwa)."\n  * Sanctity of human life and property: Prohibited bloodshed, theft, and exploitation.\n  * Rights of women: Urged men to treat women with kindness and protect their rights.',
    didYouKnow: 'Civil rights leader Malcolm X wrote from Makkah that seeing millions of pilgrims of all colors and races worshiping together with no racism cured him of prejudice and showed him the true spirit of Islam!',
    kenyanContext: 'The Prophet’s anti-tribalism message delivered at Arafat directly inspires Kenyans to eradicate negative ethnicity, nepotism, and clan rivalries.',
    order: 16,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 141, 142, 143, 144 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-ire-u7-m1',
    worldId: 'world-faith-values',
    title: 'Mission 141: The Traveler’s Concession – Qasr & Jam’a in Islamic Jurisprudence',
    description: 'Learn the divine mercy behind shortening and combining prayers during journeys, eligible prayer types, and distances required.',
    order: 141,
    orderIndex: 141,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-swalatul-musafir',
    badge: 'badge-g6-ire-swalatul-musafir',
    lessonId: 'lesson-g6-ire-u7-l1',
    questionIds: [
      'q-g6-ire-u7-001', 'q-g6-ire-u7-002', 'q-g6-ire-u7-003', 'q-g6-ire-u7-004',
      'q-g6-ire-u7-005', 'q-g6-ire-u7-006', 'q-g6-ire-u7-007', 'q-g6-ire-u7-008',
      'q-g6-ire-u7-009', 'q-g6-ire-u7-010', 'q-g6-ire-u7-011', 'q-g6-ire-u7-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u7-m2',
    worldId: 'world-faith-values',
    title: 'Mission 142: Sacred Final Respects – Swalatul Janazah & The Four Takbirat',
    description: 'Master the four Takbirat of funeral prayers, the rites of washing and shrouding, the status of Fardh Kifayah, and prophetic condolence.',
    order: 142,
    orderIndex: 142,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-swalatul-janazah',
    badge: 'badge-g6-ire-swalatul-janazah',
    lessonId: 'lesson-g6-ire-u7-l2',
    questionIds: [
      'q-g6-ire-u7-013', 'q-g6-ire-u7-014', 'q-g6-ire-u7-015', 'q-g6-ire-u7-016',
      'q-g6-ire-u7-017', 'q-g6-ire-u7-018', 'q-g6-ire-u7-019', 'q-g6-ire-u7-020',
      'q-g6-ire-u7-021', 'q-g6-ire-u7-022', 'q-g6-ire-u7-023', 'q-g6-ire-u7-024'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u8-m1',
    worldId: 'world-faith-values',
    title: 'Mission 143: The Pillars of Pilgrimage – Arkan and Wajibat of Hajj & Umrah',
    description: 'Understand the prerequisites of Istita’ah, the four non-negotiable pillars of Hajj, difference with Umrah, and the essential obligations.',
    order: 143,
    orderIndex: 143,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-hajj-pillars',
    badge: 'badge-g6-ire-hajj-pillars',
    lessonId: 'lesson-g6-ire-u8-l1',
    questionIds: [
      'q-g6-ire-u8-001', 'q-g6-ire-u8-002', 'q-g6-ire-u8-003', 'q-g6-ire-u8-004',
      'q-g6-ire-u8-005', 'q-g6-ire-u8-006', 'q-g6-ire-u8-007', 'q-g6-ire-u8-008',
      'q-g6-ire-u8-009', 'q-g6-ire-u8-010', 'q-g6-ire-u8-011', 'q-g6-ire-u8-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u8-m2',
    worldId: 'world-faith-values',
    title: 'Mission 144: Global Solidarity – The Spiritual Call & The Farewell Sermon',
    description: 'Chant the Talbiyah, honor Ibrahim and Hajar, experience the radical equality of Ihram, and absorb the anti-racism charter of the Farewell Sermon.',
    order: 144,
    orderIndex: 144,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-hajj-brotherhood',
    badge: 'badge-g6-ire-hajj-brotherhood',
    lessonId: 'lesson-g6-ire-u8-l2',
    questionIds: [
      'q-g6-ire-u8-013', 'q-g6-ire-u8-014', 'q-g6-ire-u8-015', 'q-g6-ire-u8-016',
      'q-g6-ire-u8-017', 'q-g6-ire-u8-018', 'q-g6-ire-u8-019', 'q-g6-ire-u8-020',
      'q-g6-ire-u8-021', 'q-g6-ire-u8-022', 'q-g6-ire-u8-023', 'q-g6-ire-u8-024'
    ],
    learningAreaId: 'la-ire-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 7 Questions (q-g6-ire-u7-001 to q-g6-ire-u7-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u7-001',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What does the term "Qasr" mean in the context of Swalatul Musafir?',
    options: [
      'Shortening four-rak’ah obligatory prayers to two rak’ahs',
      'Skipping the prayer completely without making it up',
      'Combining all five prayers into one single session',
      'Reciting prayers loudly during nighttime'
    ],
    correctAnswer: 'Shortening four-rak’ah obligatory prayers to two rak’ahs',
    explanation: 'Qasr literally means reduction or shortening, referring to reducing the 4-rak’ah prayers (Dhuhr, Asr, Isha) down to 2 rak’ahs for a traveler.',
    socraticHint: 'Which Islamic term refers to cutting 4-rak’ah prayers in half during travel?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-002',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'Which obligatory prayers can be shortened (Qasr) by a traveler?',
    options: [
      'Dhuhr, Asr, and Isha',
      'Fajr, Maghrib, and Isha',
      'Fajr and Dhuhr only',
      'All five daily prayers'
    ],
    correctAnswer: 'Dhuhr, Asr, and Isha',
    explanation: 'Only the 4-rak’ah prayers (Dhuhr, Asr, and Isha) can be shortened to 2 rak’ahs. Fajr (2 rak’ahs) and Maghrib (3 rak’ahs) cannot be shortened.',
    socraticHint: 'Which daily prayers normally consist of four units (rak’ahs)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-003',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'Why can Maghrib prayer NEVER be shortened under Qasr?',
    options: [
      'Because it consists of an odd number of rak’ahs (3 rak’ahs), known as Witr of the daytime',
      'Because it is performed after sunset',
      'Because it has no recitation of Surah Al-Fatihah',
      'Because travelers are not permitted to pray Maghrib'
    ],
    correctAnswer: 'Because it consists of an odd number of rak’ahs (3 rak’ahs), known as Witr of the daytime',
    explanation: 'Maghrib consists of three rak’ahs and is regarded as the Witr of daytime prayers; according to authentic Sunnah, it must always be prayed as three rak’ahs.',
    socraticHint: 'How many rak’ahs does Maghrib have, and can three rak’ahs be halved into an even prayer?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-004',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'Which two pairs of prayers are permissible to combine under Jam’a during travel?',
    options: [
      'Dhuhr with Asr, and Maghrib with Isha',
      'Fajr with Dhuhr, and Asr with Maghrib',
      'Fajr with Isha, and Dhuhr with Maghrib',
      'Isha with Fajr, and Asr with Dhuhr'
    ],
    correctAnswer: 'Dhuhr with Asr, and Maghrib with Isha',
    explanation: 'In Islamic law, combining prayers is strictly limited to Dhuhr joined with Asr, and Maghrib joined with Isha. Fajr cannot be combined with any other prayer.',
    socraticHint: 'Which prayers occur consecutively during daytime and evening?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-005',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What is it called when a traveler performs Asr early during the time of Dhuhr?',
    options: ['Jam’a Taqdim (Advance Combination)', 'Jam’a Ta’khir (Delayed Combination)', 'Qasr Mutlaq', 'Salat al-Khawf'],
    correctAnswer: 'Jam’a Taqdim (Advance Combination)',
    explanation: 'Jam’a Taqdim means advancing the second prayer to be performed in the time window of the first prayer (e.g., praying Asr during Dhuhr time).',
    socraticHint: 'The Arabic word "Taqdim" comes from bringing something forward or early.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-006',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What is it called when a traveler delays Maghrib prayer to perform it later alongside Isha during Isha time?',
    options: ['Jam’a Ta’khir (Delayed Combination)', 'Jam’a Taqdim (Advance Combination)', 'Salat al-Janazah', 'Salat al-Kusuf'],
    correctAnswer: 'Jam’a Ta’khir (Delayed Combination)',
    explanation: 'Jam’a Ta’khir means delaying the first prayer to be prayed alongside the second prayer in the second prayer’s designated time period.',
    socraticHint: 'The Arabic word "Ta’khir" signifies delaying or postponing.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-007',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'If a traveling Muslim joins a local resident congregation led by a resident Imam for Dhuhr prayer, how many rak’ahs must the traveler pray?',
    options: [
      'Four rak’ahs, following the Imam fully',
      'Two rak’ahs, making Salam while the Imam continues',
      'One rak’ah only',
      'Three rak’ahs'
    ],
    correctAnswer: 'Four rak’ahs, following the Imam fully',
    explanation: 'According to prophetic Sunnah, when a traveler prays behind a resident Imam who is praying 4 rak’ahs, the traveler is required to follow the Imam and complete all 4 rak’ahs.',
    socraticHint: 'What happens when a traveler joins a resident imam leading a complete prayer?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-008',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What is the Islamic legal term for divine concessions and allowances granted by Allah to ease hardship, such as Qasr during travel?',
    options: ['Rukhsah', 'Azeemah', 'Makruh', 'Haram'],
    correctAnswer: 'Rukhsah',
    explanation: 'Rukhsah is an Islamic legal allowance granted in response to difficult circumstances, such as shortening prayers, breaking fast during travel, or Tayammum.',
    socraticHint: 'Which term contrasts with Azeemah (the standard strict obligation)?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-009',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What minimum travel distance is generally recognized by the majority of jurists for applying the concessions of Swalatul Musafir?',
    options: [
      'Approximately 80 kilometers (48 miles) away from one’s hometown boundaries',
      '5 kilometers from one’s home',
      '500 kilometers across national borders',
      'Any distance outside the compound gate'
    ],
    correctAnswer: 'Approximately 80 kilometers (48 miles) away from one’s hometown boundaries',
    explanation: 'Classical scholars estimated the travel distance (Masafat al-Qasr) as four Burud (approximately 80 to 88 kilometers) leaving the boundary of one’s home city.',
    socraticHint: 'Think of the traditional distance equal to approximately two days of marching camel travel (~80 km).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-010',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'Can a person combine Fajr prayer with Dhuhr prayer if they woke up late while traveling?',
    options: [
      'No, Fajr cannot be combined with any other prayer under any circumstance',
      'Yes, as long as it is done before afternoon',
      'Yes, travelers can combine all five prayers whenever they like',
      'Only on Fridays'
    ],
    correctAnswer: 'No, Fajr cannot be combined with any other prayer under any circumstance',
    explanation: 'Fajr prayer stands completely independent and must be performed in its own designated dawn time period; it cannot be combined with any other prayer.',
    socraticHint: 'Remember the strict rule regarding the dawn prayer.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-011',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'What spiritual wisdom does the permission of Qasr and Jam’a reflect about the nature of Islamic Shari’ah?',
    options: [
      'It reflects divine mercy and the principle that religion brings ease, not hardship (Yusr wa laysa ‘Usr)',
      'It shows that prayers are unimportant during journeys',
      'It indicates that Allah changes His laws randomly',
      'It allows travelers to abandon faith practices'
    ],
    correctAnswer: 'It reflects divine mercy and the principle that religion brings ease, not hardship (Yusr wa laysa ‘Usr)',
    explanation: 'The Prophet said: "Indeed, the religion is easy." Allah grants concessions during exhausting travels to ensure worship remains sweet and accessible.',
    socraticHint: 'How does divine facilitation highlight Islam’s compassion for human weakness?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-012',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l1',
    text: 'Amina is traveling on a bus from Kisumu to Nairobi (over 340 km). When the bus stops for lunch at 1:30 PM, how should she pray Dhuhr and Asr?',
    options: [
      'Pray 2 rak’ahs for Dhuhr, make Salam, then pray 2 rak’ahs for Asr (Jam’a Taqdim with Qasr)',
      'Pray 8 rak’ahs continuously without any break',
      'Wait until reaching Nairobi late at night and skip Asr',
      'Pray 1 rak’ah for Dhuhr and skip Asr'
    ],
    correctAnswer: 'Pray 2 rak’ahs for Dhuhr, make Salam, then pray 2 rak’ahs for Asr (Jam’a Taqdim with Qasr)',
    explanation: 'As a traveler, Amina can perform Jam’a Taqdim: praying 2 shortened rak’ahs for Dhuhr, concluding with Salam, then immediately standing to pray 2 shortened rak’ahs for Asr.',
    socraticHint: 'Apply the rules of shortening and early combination for Dhuhr and Asr.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-ire-u7-013',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What category of Islamic obligation does Swalatul Janazah (Funeral Prayer) fall under?',
    options: ['Fardh Kifayah (Collective obligation)', 'Fardh Ayn (Individual obligation for all)', 'Sunnah Mu’akkadah', 'Nafl (Optional)'],
    correctAnswer: 'Fardh Kifayah (Collective obligation)',
    explanation: 'Swalatul Janazah is Fardh Kifayah: if some members of the community perform it, the obligation is lifted from the rest, but if nobody does, all share the sin.',
    socraticHint: 'Which legal category means communal responsibility rather than mandatory on every individual?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-014',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'How many Takbirat (saying "Allahu Akbar") are performed in Swalatul Janazah?',
    options: ['Four Takbirat', 'Two Takbirat', 'Seven Takbirat', 'Twelve Takbirat'],
    correctAnswer: 'Four Takbirat',
    explanation: 'The standard established Sunnah for Swalatul Janazah consists of four Takbirat, with specific recitations recited after each one.',
    socraticHint: 'Count the number of Takbirs from the first opening Takbir to the final fourth Takbir.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-015',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What unique physical characteristic distinguishes Swalatul Janazah from the regular five daily prayers?',
    options: [
      'It has NO Ruku (bowing) and NO Sujud (prostration); it is performed standing entirely',
      'It must be performed while sitting down on the floor',
      'It requires reciting the entire Qur’an aloud',
      'It includes three prostrations per unit'
    ],
    correctAnswer: 'It has NO Ruku (bowing) and NO Sujud (prostration); it is performed standing entirely',
    explanation: 'Swalatul Janazah consists strictly of standing (Qiyam), Takbirat, and supplications; there is no bowing (Ruku) or prostrating (Sujud) at any point.',
    socraticHint: 'Think about whether anyone bows or prostrates on the ground during a funeral prayer.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-016',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What is recited immediately after the FIRST Takbir in Swalatul Janazah?',
    options: [
      'Surah Al-Fatihah (The Opening Chapter)',
      'As-Salat al-Ibrahimiyyah',
      'Ayat al-Kursi',
      'Du’a al-Qunut'
    ],
    correctAnswer: 'Surah Al-Fatihah (The Opening Chapter)',
    explanation: 'After the first Takbir (Takbirat al-Ihram), the worshiper seeks refuge with Allah and recites Surah Al-Fatihah silently.',
    socraticHint: 'Which foundational Surah begins every Islamic prayer?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-017',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What is recited after the SECOND Takbir in Swalatul Janazah?',
    options: [
      'As-Salat al-Ibrahimiyyah (Sending blessings and prayers upon Prophet Muhammad)',
      'Supplication for the deceased person',
      'Surah Al-Ikhlas',
      'The 99 names of Allah'
    ],
    correctAnswer: 'As-Salat al-Ibrahimiyyah (Sending blessings and prayers upon Prophet Muhammad)',
    explanation: 'After the second Takbir, the worshiper recites As-Salat al-Ibrahimiyyah (Allahumma salli ‘ala Muhammad wa ‘ala aali Muhammad...).',
    socraticHint: 'Which prayer invokes blessings on the Prophet Muhammad and the family of Ibrahim?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-018',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What is the primary action performed after the THIRD Takbir in Swalatul Janazah?',
    options: [
      'Sincere du’a (supplication) asking Allah to forgive and have mercy upon the deceased',
      'Reciting Surah Yasin in full',
      'Reading from a history textbook',
      'Singing poetic eulogies about the person’s ancestors'
    ],
    correctAnswer: 'Sincere du’a (supplication) asking Allah to forgive and have mercy upon the deceased',
    explanation: 'The third Takbir is dedicated specifically to pleading for Allah’s mercy, forgiveness, and pardon for the deceased ("Allahumma ighfir lahu warhamhu...").',
    socraticHint: 'What is the main purpose of gathering to pray for someone who has passed away?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-019',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'How does Swalatul Janazah conclude after the fourth Takbir and short du’a for all Muslims?',
    options: [
      'Making Tasleem (turning the head to the right saying "Assalamu alaykum wa Rahmatullah")',
      'Making two prostrations of forgetfulness (Sujud al-Sahw)',
      'Reciting the Adhan loudly',
      'Shaking hands while walking around the body seven times'
    ],
    correctAnswer: 'Making Tasleem (turning the head to the right saying "Assalamu alaykum wa Rahmatullah")',
    explanation: 'The prayer finishes like other prayers with Tasleem to exit the sacred state of prayer, typically to the right side.',
    socraticHint: 'How does any Islamic prayer officially end?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-020',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What are the three essential stages of preparing a deceased Muslim’s body before the Janazah prayer and burial?',
    options: [
      'Ghusl (washing), Kafan (shrouding), and Dafan (burial)',
      'Embalming, display in public halls, and cremation',
      'Singing dirges, wearing black mourning robes, and fasting for forty days',
      'Taking photographs, reading wills, and scattering ashes'
    ],
    correctAnswer: 'Ghusl (washing), Kafan (shrouding), and Dafan (burial)',
    explanation: 'Islamic funeral rites require ritual washing (Ghusl), wrapping in clean unstitched white cloth (Kafan), and dignified burial facing Qiblah (Dafan).',
    socraticHint: 'Which three Arabic terms describe the washing, wrapping, and burying of the deceased?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-021',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'How many sheets of clean white cloth are customarily used to shroud (Kafan) a deceased male Muslim?',
    options: ['Three sheets', 'One sheet', 'Seven sheets', 'Ten sheets'],
    correctAnswer: 'Three sheets',
    explanation: 'According to authentic Sunnah reported by Sayyidah Aisha, the Prophet Muhammad (SAW) was shrouded in three clean white Sahuli cotton garments.',
    socraticHint: 'Recall how many simple white cloths wrapped the Prophet’s body.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-022',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What is Ta’ziyah in Islamic community ethics?',
    options: [
      'Visiting and consoling the bereaved family with comforting words and assistance',
      'Celebrating inheritance distribution with music',
      'Wailing loudly and tearing clothes at the grave',
      'Imposing heavy fees on the mourning family'
    ],
    correctAnswer: 'Visiting and consoling the bereaved family with comforting words and assistance',
    explanation: 'Ta’ziyah means offering condolences, cheering the hearts of those grieving, encouraging patience, and helping them through their bereavement.',
    socraticHint: 'Which term refers to comforting and sympathizing with grieving family members?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-023',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'What did Prophet Muhammad (SAW) instruct his companions to do when news of Ja’far ibn Abi Talib’s martyrdom arrived?',
    options: [
      '"Prepare food for the family of Ja’far, for there has come upon them that which engages them"',
      '"Expect Ja’far’s family to host a lavish feast for all visitors"',
      '"Ask the grieving family for monetary donations"',
      '"Stay away from their house for forty days"'
    ],
    correctAnswer: '"Prepare food for the family of Ja’far, for there has come upon them that which engages them"',
    explanation: 'The Prophet instituted the empathetic Sunnah of neighbors and relatives cooking meals for the mourning family, relieving them of daily chores in their sorrow.',
    socraticHint: 'Should grieving families cook for guests, or should friends and neighbors cook for them?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u7-024',
    subStrandId: 'substrand-g6-ire-u7',
    lessonId: 'lesson-g6-ire-u7-l2',
    text: 'Which practice is strictly FORBIDDEN in Islam during times of mourning and bereavement?',
    options: [
      'Wailing hysterically (Niyaha), tearing clothes, and slapping cheeks',
      'Shedding natural, quiet tears of grief',
      'Praying for the deceased’s forgiveness',
      'Paying off the debts left behind by the deceased'
    ],
    correctAnswer: 'Wailing hysterically (Niyaha), tearing clothes, and slapping cheeks',
    explanation: 'The Prophet condemned pre-Islamic customs of violent mourning (tearing clothes, beating cheeks, and screaming objections to God’s decree), while permitting quiet tears of compassion.',
    socraticHint: 'Which pagan pre-Islamic reaction expresses rejection of divine decree through violent behavior?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // --- Unit 8 Questions (q-g6-ire-u8-001 to q-g6-ire-u8-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u8-001',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What is the foundational prerequisite of capability required for Hajj to become an obligation called?',
    options: ['Istita’ah', 'Ijtihad', 'Ihsan', 'I’tikaf'],
    correctAnswer: 'Istita’ah',
    explanation: 'Istita’ah encompasses physical health, safe routes, and financial means to afford the journey and support one’s family while away (Surah Ali Imran 3:97).',
    socraticHint: 'Which Arabic term describes having the capacity or ability to perform pilgrimage?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-002',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What are the four non-negotiable Pillars (Arkan) of Hajj without which Hajj is completely invalid?',
    options: [
      'Ihram, Wuquf at Arafat, Tawaf al-Ifadah, and Sa’i',
      'Slaughtering a sheep, fasting three days, shaving hair, and sleeping in Mina',
      'Wearing shoes, climbing Mount Uhud, visiting Madinah, and drinking Zamzam',
      'Giving charity in Makkah, reading the Quran, fasting on Friday, and buying souvenirs'
    ],
    correctAnswer: 'Ihram, Wuquf at Arafat, Tawaf al-Ifadah, and Sa’i',
    explanation: 'The four essential pillars of Hajj are: 1) Ihram (intention & state), 2) Standing at Arafat, 3) Tawaf al-Ifadah, and 4) Sa’i between Safa and Marwah.',
    socraticHint: 'Which four central rites cannot be substituted even by animal sacrifice (Dam)?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-003',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'On which Islamic date does the pinnacle rite of Hajj—Wuquf (Standing at Arafat)—take place?',
    options: ['9th of Dhul-Hijjah', '1st of Shawwal', '10th of Muharram', '27th of Rajab'],
    correctAnswer: '9th of Dhul-Hijjah',
    explanation: 'The Day of Arafat is on the 9th of Dhul-Hijjah; standing at Arafat from after noon until sunset on this day is the cornerstone of Hajj.',
    socraticHint: 'Identify the day immediately preceding Eid ul-Adha (10th Dhul-Hijjah).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-004',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What did the Prophet Muhammad (SAW) say regarding the supreme importance of the Day of Arafat?',
    options: ['"Al-Hajju Arafah" (Hajj is Arafat)', '"Hajj is visiting Madinah"', '"Hajj is slaughtering animals"', '"Hajj is shopping in Makkah"'],
    correctAnswer: '"Al-Hajju Arafah" (Hajj is Arafat)',
    explanation: 'The Prophet emphasized the central pillar of pilgrimage by declaring: "Al-Hajju Arafah" (Hajj is Arafat). Missing Arafat invalidates the entire Hajj.',
    socraticHint: 'Recall the concise three-word prophetic Hadith summarizing the climax of pilgrimage.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-005',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What is the designated geographical boundary point beyond which a pilgrim may not pass without entering the state of Ihram called?',
    options: ['Al-Miqat', 'Al-Mina', 'Al-Batha', 'Al-Haram'],
    correctAnswer: 'Al-Miqat',
    explanation: 'Al-Miqat refers to the specific stations appointed by the Prophet (such as Dhul-Hulayfah or Yalamlam) where pilgrims enter the sacred state of Ihram.',
    socraticHint: 'Which term means the designated border station for putting on Ihram garments?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-006',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'How many circuits (Ashwat) are made around the Ka’bah during Tawaf?',
    options: ['Seven circuits', 'Three circuits', 'Ten circuits', 'Five circuits'],
    correctAnswer: 'Seven circuits',
    explanation: 'Every Tawaf consists of seven anti-clockwise circuits starting and ending at the corner of the Black Stone (Al-Hajar al-Aswad).',
    socraticHint: 'Recall the sacred number of times a pilgrim circumambulates the Ka’bah.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-007',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'Between which two historical hills does the pilgrim perform Sa’i (seven traverses)?',
    options: ['Al-Safa and Al-Marwah', 'Uhud and Thawr', 'Arafat and Muzdalifah', 'Jabal al-Noor and Jabal Thabir'],
    correctAnswer: 'Al-Safa and Al-Marwah',
    explanation: 'Sa’i consists of walking seven times back and forth between the two hillocks of Safa and Marwah, commemorating Sayyidah Hajar’s search for water.',
    socraticHint: 'Which two hillocks are mentioned in Surah Al-Baqarah 2:158 as symbols of Allah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-008',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What major difference exists between Hajj and Umrah regarding their timing?',
    options: [
      'Hajj has specific fixed calendar dates in Dhul-Hijjah, while Umrah can be performed at any time of year',
      'Hajj can only be performed at night, while Umrah is done at dawn',
      'Hajj is only performed in Madinah, while Umrah is in Makkah',
      'There is no difference in timing at all'
    ],
    correctAnswer: 'Hajj has specific fixed calendar dates in Dhul-Hijjah, while Umrah can be performed at any time of year',
    explanation: 'Hajj can only occur during the sacred pilgrimage days (8th to 13th of Dhul-Hijjah), whereas Umrah (the lesser pilgrimage) is open year-round.',
    socraticHint: 'Can a person perform Hajj in Ramadan, or is that only for Umrah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-009',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What is the night-stay location where pilgrims gather pebbles after sunset on the Day of Arafat?',
    options: ['Al-Muzdalifah', 'Ta’if', 'Badr', 'Yathrib'],
    correctAnswer: 'Al-Muzdalifah',
    explanation: 'Pilgrims depart Arafat after sunset to Muzdalifah, where they combine Maghrib and Isha prayers, spend the night under the open sky, and gather pebbles for Jamarat.',
    socraticHint: 'Where do pilgrims sleep under the open sky between Arafat and Mina?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-010',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What is the final rite performed by a pilgrim before departing from Makkah called?',
    options: ['Tawaf al-Wada’ (The Farewell Tawaf)', 'Tawaf al-Qudum', 'Tawaf al-Umrah', 'Tawaf al-Tatawwu'],
    correctAnswer: 'Tawaf al-Wada’ (The Farewell Tawaf)',
    explanation: 'Tawaf al-Wada’ is the farewell circumambulation around the Ka’bah; the Prophet commanded that the last thing a pilgrim should do in Makkah is circumambulate the House.',
    socraticHint: 'Which Arabic word means "farewell" or parting goodbye?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-011',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'What act symbolizes the exit from the primary state of Ihram (Tahallul) for male pilgrims after throwing pebbles at Jamrat al-Aqabah?',
    options: ['Halq (shaving the head) or Taqseer (trimming hair)', 'Spraying perfume on clothes', 'Taking off sandals', 'Eating a banquet'],
    correctAnswer: 'Halq (shaving the head) or Taqseer (trimming hair)',
    explanation: 'Shaving the head (Halq) or trimming hair equally (Taqseer) signals humility before Allah and marks the initial release (Tahallul al-Asghar) from Ihram restrictions.',
    socraticHint: 'What grooming action done to the hair marks the exit from Ihram?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-012',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l1',
    text: 'If a pilgrim intentionally skips standing at Arafat on 9th Dhul-Hijjah, can they fix their Hajj by offering an animal sacrifice (Dam)?',
    options: [
      'No, because Arafat is an indispensable pillar (Rukn); missing it invalidates the entire Hajj',
      'Yes, paying money or sacrificing a camel automatically fixes missed pillars',
      'Yes, by performing ten extra circuits of Tawaf',
      'Only if they get permission from the travel agent'
    ],
    correctAnswer: 'No, because Arafat is an indispensable pillar (Rukn); missing it invalidates the entire Hajj',
    explanation: 'An essential pillar (Rukn) cannot be replaced or compensated by any sacrifice; missing Arafat means the pilgrimage is void and must be repeated in a future year.',
    socraticHint: 'Can any fine or sacrifice replace a missing foundational pillar of Hajj?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-ire-u8-013',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What is the sacred Talbiyah chant recited continuously by pilgrims in Ihram?',
    options: [
      '"Labbaik Allahumma Labbaik, Labbaika la sharika laka Labbaik..."',
      '"Subhanallahi wa bihamdihi Subhanallahil Azeem"',
      '"Astaghfirullaha wa atoobu ilayh"',
      '"La hawla wa la quwwata illa billah"'
    ],
    correctAnswer: '"Labbaik Allahumma Labbaik, Labbaika la sharika laka Labbaik..."',
    explanation: 'The Talbiyah is the anthem of pilgrimage expressing complete readiness and submission: "Here I am at Your service, O Allah, here I am! You have no partner, here I am..."',
    socraticHint: 'Which Arabic chant starts with "Labbaik Allahumma Labbaik"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-014',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'Whose historical search for water in the barren desert valley of Makkah does the ritual of Sa’i between Safa and Marwah commemorate?',
    options: ['Sayyidah Hajar (mother of Ismail)', 'Sayyidah Maryam', 'Sayyidah Khadijah', 'Sayyidah Asiyah'],
    correctAnswer: 'Sayyidah Hajar (mother of Ismail)',
    explanation: 'Sa’i honors Sayyidah Hajar running desperately back and forth between Safa and Marwah looking for water for her infant son Ismail, until the miraculous Zamzam spring gushed forth.',
    socraticHint: 'Who ran between the two hills seeking water for baby Ismail?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-015',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What do the two simple, unstitched white sheets of Ihram worn by male pilgrims symbolize?',
    options: [
      'Radical equality, humility, and shedding all worldly status and wealth before Allah',
      'Tribal distinction between high and low castes',
      'The traditional military uniform of early Arabia',
      'A temporary fashion trend for pilgrims'
    ],
    correctAnswer: 'Radical equality, humility, and shedding all worldly status and wealth before Allah',
    explanation: 'Wearing identical unadorned white sheets strips away indicators of social class, nationality, and wealth, placing kings and laborers on identical footing before God.',
    socraticHint: 'How does wearing identical white cloth dissolve differences of wealth, status, and nationality?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-016',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What revolutionary statement on racial equality did Prophet Muhammad (SAW) make during his Farewell Sermon (Khutbat al-Wada’)?',
    options: [
      '"An Arab has no superiority over a non-Arab, nor a non-Arab over an Arab... except by piety (Taqwa)"',
      '"Arabs are inherently superior to all other nations on earth"',
      '"People of light skin deserve greater leadership privileges"',
      '"Only wealthy merchants may speak in public councils"'
    ],
    correctAnswer: '"An Arab has no superiority over a non-Arab, nor a non-Arab over an Arab... except by piety (Taqwa)"',
    explanation: 'The Prophet decisively dismantled racism and ethnic supremacy over 1,400 years ago, establishing that piety and moral character are the sole measures of human worth.',
    socraticHint: 'Which quote affirms that neither race nor nationality provides superior status before God?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-017',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What did the Prophet Muhammad (SAW) declare regarding the sanctity of human life and property in his Farewell Sermon?',
    options: [
      'They are sacred and inviolable, like the sanctity of this holy day, in this holy month, in this holy city',
      'They can be taken freely during inter-tribal disputes',
      'Only the property of clan elders is protected',
      'Sanctity only applies to people living in Makkah'
    ],
    correctAnswer: 'They are sacred and inviolable, like the sanctity of this holy day, in this holy month, in this holy city',
    explanation: 'The Prophet emphasized the absolute inviolability of every person’s life, honor, and property, comparing its sacredness to that of the sacred day of Arafat and city of Makkah.',
    socraticHint: 'To what sacred entities did the Prophet compare the inviolability of human life and property?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-018',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What instruction did the Prophet (SAW) give regarding the treatment of women during his Farewell Sermon?',
    options: [
      'Fear Allah regarding women, treat them with kindness, and honor their rights',
      'Women should not be allowed to own property or inherit',
      'Women have no role in religious education',
      'Men are permitted to treat their wives harshly'
    ],
    correctAnswer: 'Fear Allah regarding women, treat them with kindness, and honor their rights',
    explanation: 'The Prophet strongly championed women’s dignity, urging men: "Treat women well, for they are your partners... You have rights over them, and they have rights over you."',
    socraticHint: 'Recall how the Prophet commanded kindness and upholding the rights of wives and women.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-019',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What ancient economic practice did the Prophet Muhammad (SAW) completely abolish in his Farewell Sermon, starting with his own uncle Abbas’s claims?',
    options: [
      'Riba (Usury and interest exploitation)',
      'Agricultural farming of date palms',
      'International maritime navigation',
      'Barter trading of woven textiles'
    ],
    correctAnswer: 'Riba (Usury and interest exploitation)',
    explanation: 'The Prophet declared all pre-Islamic interest (Riba) canceled and abolished, setting an example by first waiving all interest owed to his uncle Abbas ibn Abdul-Muttalib.',
    socraticHint: 'Which predatory financial practice involving interest was completely abolished?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-020',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What historical impact did performing Hajj have on American civil rights leader Malcolm X (Al-Hajj Malik El-Shabazz)?',
    options: [
      'It eradicated his racial bitterness when he saw millions of pilgrims of all colors embracing as equals',
      'It caused him to abandon his religious faith',
      'It made him refuse to speak to people of other nationalities',
      'It convinced him that racism is permanently unsolvable'
    ],
    correctAnswer: 'It eradicated his racial bitterness when he saw millions of pilgrims of all colors embracing as equals',
    explanation: 'In his famous letter from Makkah, Malcolm X wrote that witnessing blonde-haired, blue-eyed Muslims praying and eating beside dark-skinned Africans proved that Islam creates true brotherhood without racism.',
    socraticHint: 'How did the global unity of Hajj change Malcolm X’s perspective on race?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-021',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What does the act of throwing pebbles at the Jamarat (Rami al-Jamarat) commemorate?',
    options: [
      'Prophet Ibrahim rejecting and stoning Satan when tempted to disobey Allah’s command',
      'The destruction of the army of the elephant',
      'The construction of the well of Zamzam',
      'A target shooting sport of ancient Bedouins'
    ],
    correctAnswer: 'Prophet Ibrahim rejecting and stoning Satan when tempted to disobey Allah’s command',
    explanation: 'When Satan appeared three times to dissuade Ibrahim from obeying Allah’s command to sacrifice Ismail, Ibrahim pelted him with stones at each spot, driving him away.',
    socraticHint: 'Who pelted Satan with pebbles when the devil tried to whisper doubt and disobedience?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-022',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'How does the spirit of the Farewell Sermon help Kenyans overcome negative ethnicity and tribal politics?',
    options: [
      'By emphasizing that all human beings share equal worth and that character and justice matter above tribe',
      'By demanding that only the largest ethnic group rules the country',
      'By encouraging citizens to vote strictly along clan and ethnic lines',
      'By creating separate laws for different cultural communities'
    ],
    correctAnswer: 'By emphasizing that all human beings share equal worth and that character and justice matter above tribe',
    explanation: 'The Farewell Sermon rejects tribal supremacy, teaching that no ethnic group is superior to another, providing Kenyans with moral inspiration to build inclusive national unity.',
    socraticHint: 'Connect the prophetic denunciation of tribal superiority with Kenya’s fight against tribalism.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-023',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'According to prophetic Hadith, what is the reward of an accepted Hajj (Al-Hajj al-Mabrur)?',
    options: [
      'Nothing less than Jannah (Paradise), and returning pure of sins like the day one was born',
      'Free trade tax exemptions for five years',
      'Honorary chieftainship in one’s hometown',
      'Automatic exemption from future daily prayers'
    ],
    correctAnswer: 'Nothing less than Jannah (Paradise), and returning pure of sins like the day one was born',
    explanation: 'The Prophet (SAW) said: "An accepted Hajj has no reward other than Paradise," and "Whoever performs Hajj without vulgarity or sin returns as free of sin as the day his mother bore him."',
    socraticHint: 'What spiritual rebirth and ultimate reward does the Prophet promise for a sincere Hajj?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u8-024',
    subStrandId: 'substrand-g6-ire-u8',
    lessonId: 'lesson-g6-ire-u8-l2',
    text: 'What two heavy sources of guidance did Prophet Muhammad (SAW) leave behind for the Ummah during his Farewell Sermon so they will never go astray?',
    options: [
      'The Book of Allah (The Qur’an) and his Sunnah (Prophetic example)',
      'Gold coins and military armories',
      'Philosophical treaties and Roman legal codes',
      'Astronomical charts and royal scepters'
    ],
    correctAnswer: 'The Book of Allah (The Qur’an) and his Sunnah (Prophetic example)',
    explanation: 'The Prophet stated: "I have left among you two things; you will never go astray as long as you hold fast to them: the Book of Allah and the Sunnah of His Prophet."',
    socraticHint: 'What are the two primary divine foundations of Islam that protect the community from straying?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
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
console.log(`Added ${qCount} questions for Units 7 & 8.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 4 of Grade 6 IRE to cbe_database.json!');
