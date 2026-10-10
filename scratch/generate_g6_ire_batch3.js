/**
 * Grade 6 Islamic Religious Education (IRE) - Batch 3 Generator
 * Content: Units 5 & 6 (Pledges of Aqabah & Hijrah to Madinah; Belief in the Last Day & Divine Decree)
 * Missions: Orders 137, 138, 139, 140 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-ire-u5-001 to q-g6-ire-u6-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 IRE Batch 3 (Units 5 & 6) ---');

// 1. Units 5 & 6 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ire-u5',
    strandId: 'strand-g6-ire-sirah',
    learningAreaId: 'la-ire-g6',
    title: 'Pledges of Aqabah, Hijrah to Madinah & Constitution of Madinah',
    name: 'Pledges of Aqabah, Hijrah to Madinah & Constitution of Madinah',
    description: 'The transformative transition from Makkah to Yathrib (Madinah): The First Pledge of Aqabah (Bay’at al-Aqabah al-Ula) by 12 men and the embassy of Mus’ab ibn Umayr; the Second Pledge of Aqabah with 73 men and 2 women pledging protection; the historic Hijrah migration in 622 CE with Abu Bakr, concealment in Cave Thawr, spider web and pigeon nest miracles, arrival in Quba and founding Masjid Quba; entrance into Yathrib and renaming to Al-Madinah Al-Munawwarah; the building of Al-Masjid an-Nabawi; institutionalizing Brotherhood (Mu’akhah) between Muhajirun and Ansar; drafting the Constitution of Madinah (Sahifat al-Madinah) establishing citizenship, religious freedom, mutual defense, and social harmony.',
    cbeCompetency: 'Historical inquiry, civic coexistence, community solidarity, and constitutional leadership',
    estimatedMinutes: 30,
    order: 5,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ire-u6',
    strandId: 'strand-g6-ire-ibadah',
    learningAreaId: 'la-ire-g6',
    title: 'Pillars of Iman: Yawm al-Qiyamah (The Last Day) & Divine Decree (Al-Qadar)',
    name: 'Pillars of Iman: Yawm al-Qiyamah (The Last Day) & Divine Decree (Al-Qadar)',
    description: 'The Fifth and Sixth Pillars of Iman: Belief in Yawm al-Qiyamah (Day of Resurrection and Judgment): signs of the hour, the blowing of the trumpet (Soor) by Angel Israfeel, resurrection (Ba’th), gathering (Hashr), the divine accounting (Hisab), the weighing of deeds (Mizan), passing the Sirat bridge, intercession (Shafa’ah), eternal destinations of Jannah (Paradise) and Jahannam (Hellfire), and impact of accountability on daily moral conduct; Belief in Al-Qadar (Divine Predestination): the four fundamental stages (Al-Ilm / Divine Knowledge, Al-Kitabah / Divine Decree recorded in Lawh al-Mahfuz, Al-Mashi’ah / Divine Will, and Al-Khalq / Divine Creation), reconciling divine decree with human moral responsibility, relying on Allah (Tawakkul) while tying the camel (taking practical action), overcoming fatalism, patience during trials (Sabr), and contentment with destiny (Rida).',
    cbeCompetency: 'Theological comprehension, moral accountability, resilience in hardships, and responsible decision-making',
    estimatedMinutes: 30,
    order: 6,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ire-u5-l1',
    subStrandId: 'substrand-g6-ire-u5',
    title: 'The Pledges of Aqabah & The Historic Hijrah to Madinah',
    content: 'The turning point in Islamic history began with encounters between Prophet Muhammad (SAW) and pilgrims from Yathrib (now Madinah).\n\n1. The First Pledge of Aqabah (621 CE):\n- Twelve men from Yathrib accepted Islam and pledged not to associate partners with Allah, not to steal, not to commit adultery, not to kill their children, and not to utter slander.\n- The Prophet sent Mus’ab ibn Umayr (RA) as the first ambassador and teacher to Yathrib, where Islam rapidly entered almost every household.\n\n2. The Second Pledge of Aqabah (622 CE):\n- Seventy-three men and two women pledged allegiance, offering sanctuary to the Prophet and his companions and vowing to protect him as they protect their own families.\n\n3. The Migration (Hijrah) to Madinah (622 CE):\n- After Muslims secretly migrated in small groups, Quraysh plotted to assassinate the Prophet by assembling a youth from every clan.\n- Guided by divine revelation, Ali ibn Abi Talib slept in the Prophet’s bed as a decoy and to return entrusted items to their Makkan owners.\n- The Prophet and Abu Bakr slipped away unnoticed, taking refuge in the Cave of Thawr (Ghar Thawr) for three days, where Allah protected them.\n- Upon reaching Quba, they built Masjid Quba (the first mosque in Islam), before proceeding joyfully into Madinah, greeted by singing: "Tala’a al-Badru ‘Alayna" (The full moon has risen upon us).',
    didYouKnow: 'The Islamic Hijri calendar, instituted by Caliph Umar ibn al-Khattab, begins not with the Prophet’s birth or first revelation, but with the Hijrah in 622 CE, because it marked the founding of the righteous community!',
    kenyanContext: 'Kenyan Muslims celebrate the Hijrah as a profound lesson in planning, sacrifice, and seeking peaceful coexistence when faced with persecution.',
    order: 9,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u5-l2',
    subStrandId: 'substrand-g6-ire-u5',
    title: 'Al-Masjid an-Nabawi, The Bond of Mu’akhah & The Constitution of Madinah',
    content: 'Upon settling in Madinah, the Prophet Muhammad (SAW) laid the foundations for a stable, unified, and pluralistic society.\n\n1. Building Al-Masjid an-Nabawi:\n- The Prophet allowed his camel, Qaswa, to roam until she knelt at a drying yard owned by two orphans (Sahl and Suhayl). He purchased the land at full price.\n- The Prophet actively hauled mud bricks alongside the companions to construct the mosque, which served as a place of worship, school (Suffah), council chamber, and hospital.\n\n2. The Brotherhood (Mu’akhah):\n- The Muhajirun (emigrants from Makkah) had arrived with no money, property, or trade connections.\n- The Prophet paired each Muhajir with an Ansari (resident of Madinah). The Ansar shared their homes, land, farms, and food with unmatched selflessness (Surah Al-Hashr 59:9).\n\n3. The Constitution of Madinah (Sahifat al-Madinah):\n- The world’s first written constitution for a multi-ethnic, multi-faith society.\n- Key principles:\n  a) Muslims (Muhajirun and Ansar) and Jewish tribes of Madinah formed one political community (Ummah wahidah).\n  b) Freedom of worship: "To the Jews their religion, and to the Muslims their religion."\n  c) Mutual defense: All signatories agreed to defend Madinah collectively against outside aggression.\n  d) Rule of law & justice: Criminals were held individually accountable; tribal favoritism was abolished.',
    didYouKnow: 'The Constitution of Madinah contained over 47 distinct articles governing civil defense, equal human rights, religious freedom, and peaceful dispute resolution over 1,400 years ago!',
    kenyanContext: 'Kenya’s 2010 Constitution guarantees freedom of religion and equality for all citizens, mirroring the pluralistic spirit of the Constitution of Madinah.',
    order: 10,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u6-l1',
    subStrandId: 'substrand-g6-ire-u6',
    title: 'Belief in Yawm al-Qiyamah: Resurrection, The Scale & The Final Abodes',
    content: 'Belief in the Last Day (Yawm al-Qiyamah) is the fifth pillar of Iman, instilling profound responsibility and accountability in human life.\n\n1. The Stages of the Last Day:\n- The Trumpet (Al-Soor): Angel Israfeel sounds the first blast causing all living things to perish, followed by the second blast signaling the resurrection (Al-Ba’th).\n- The Gathering (Al-Hashr): All humanity is gathered before Allah on a vast plain to answer for their worldly deeds.\n- The Books of Deeds: Every person receives their record of deeds; the righteous receive it in their right hand, while the wicked receive it in their left or behind their back (Surah Al-Haqqah).\n- The Accounting (Al-Hisab) & The Scale (Al-Mizan): Every good and bad deed, even of an atom’s weight (Mithqala dharrah), is accurately weighed.\n- The Bridge (Al-Sirat): A narrow bridge laid across Hellfire toward Paradise; believers cross according to the radiance of their good deeds.\n\n2. Jannah (Paradise) & Jahannam (Hellfire):\n- Jannah is the eternal home of bliss prepared for the righteous (Muttaqin), featuring rivers, gardens, peace, and the ultimate reward: seeing Allah’s noble countenance.\n- Jahannam is the place of punishment for unrepentant evildoers and deniers of truth.\n\n3. Impact on Daily Conduct:\n- A person who truly believes in the Day of Judgment resists corruption, treats people fairly, refrains from oppression (Zulm), and seeks forgiveness regularly.',
    didYouKnow: 'The Prophet Muhammad (SAW) taught that on the Day of Judgment, a person will not move their feet until asked about four things: life and how it was spent, youth and how it was utilized, wealth and how it was earned and spent, and knowledge and what was done with it!',
    kenyanContext: 'In Kenyan commerce and public service, awareness of divine accountability inspires Muslim integrity, honesty, and anti-corruption ethics.',
    order: 11,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u6-l2',
    subStrandId: 'substrand-g6-ire-u6',
    title: 'Belief in Al-Qadar (Divine Decree): Free Will, Tawakkul & Contentment',
    content: 'Belief in Divine Decree (Al-Qadar) is the sixth pillar of Iman, teaching that everything occurs according to Allah’s eternal knowledge and wisdom.\n\n1. The Four Pillars of Al-Qadar (Maratib al-Qadar):\n- 1) Al-’Ilm (Divine Knowledge): Allah knows all things before they happen, past, present, and future.\n- 2) Al-Kitabah (The Writing): Allah commanded the Pen (Al-Qalam) to record everything in the Preserved Tablet (Al-Lawh al-Mahfuz) fifty thousand years before creating the universe.\n- 3) Al-Mashi’ah (Divine Will): Whatever Allah wills happens, and whatever He does not will never happens.\n- 4) Al-Khalq (Creation): Allah is the Creator of all things, including human beings and their actions.\n\n2. Reconciling Qadar with Human Free Will & Responsibility:\n- Allah granted humans intellect (Aql) and free choice (Ikhtiyar) to choose between right and wrong. We are held accountable for our deliberate choices.\n- Blaming destiny for one’s intentional crimes or neglect of study is unacceptable in Islam.\n\n3. Practical Action (Tawakkul vs. Tawaakul):\n- A Bedouin asked the Prophet: "Should I tie my camel or rely on Allah?" The Prophet replied: "Tie it, and then rely on Allah!" Taking necessary precautions is part of faith.\n\n4. Fruits of Believing in Qadar:\n- Sabr (Patience) when struck by calamities, knowing tests are part of Allah’s plan.\n- Shukr (Gratitude) and humility when succeeding, avoiding arrogance.\n- Freedom from paralyzing anxiety and sorrow over what cannot be changed.',
    didYouKnow: 'When Umar ibn al-Khattab decided not to enter Syria during a plague, Abu Ubaydah asked: "Are you fleeing from the decree of Allah?" Umar replied: "Yes, we are fleeing from the decree of Allah to the decree of Allah!"',
    kenyanContext: 'Kenyan students preparing for national exams combine hard work, revisions, and prayer, recognizing that true Tawakkul means studying diligently before leaving the results to Allah.',
    order: 12,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 137, 138, 139, 140 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-ire-u5-m1',
    worldId: 'world-faith-values',
    title: 'Mission 137: The Turning Point – Pledges of Aqabah & The Historic Hijrah',
    description: 'Explore the courageous pledges of Aqabah, Mus’ab’s missionary work, the decoy of Ali, and the miraculous survival in Cave Thawr leading to Quba.',
    order: 137,
    orderIndex: 137,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-aqabah-hijrah',
    badge: 'badge-g6-ire-aqabah-hijrah',
    lessonId: 'lesson-g6-ire-u5-l1',
    questionIds: [
      'q-g6-ire-u5-001', 'q-g6-ire-u5-002', 'q-g6-ire-u5-003', 'q-g6-ire-u5-004',
      'q-g6-ire-u5-005', 'q-g6-ire-u5-006', 'q-g6-ire-u5-007', 'q-g6-ire-u5-008',
      'q-g6-ire-u5-009', 'q-g6-ire-u5-010', 'q-g6-ire-u5-011', 'q-g6-ire-u5-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u5-m2',
    worldId: 'world-faith-values',
    title: 'Mission 138: Foundations of Society – Masjid an-Nabawi & Constitution of Madinah',
    description: 'Discover the building of the Prophet’s Mosque, the fraternal bond of Mu’akhah, and the visionary pluralism of the Constitution of Madinah.',
    order: 138,
    orderIndex: 138,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-madinah-constitution',
    badge: 'badge-g6-ire-madinah-constitution',
    lessonId: 'lesson-g6-ire-u5-l2',
    questionIds: [
      'q-g6-ire-u5-013', 'q-g6-ire-u5-014', 'q-g6-ire-u5-015', 'q-g6-ire-u5-016',
      'q-g6-ire-u5-017', 'q-g6-ire-u5-018', 'q-g6-ire-u5-019', 'q-g6-ire-u5-020',
      'q-g6-ire-u5-021', 'q-g6-ire-u5-022', 'q-g6-ire-u5-023', 'q-g6-ire-u5-024'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u6-m1',
    worldId: 'world-faith-values',
    title: 'Mission 139: The Great Accounting – Yawm al-Qiyamah, Mizan & Eternal Abodes',
    description: 'Understand the resurrection, the divine weighing of deeds on the Mizan, crossing the Sirat bridge, and cultivating moral integrity.',
    order: 139,
    orderIndex: 139,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-yawm-al-qiyamah',
    badge: 'badge-g6-ire-yawm-al-qiyamah',
    lessonId: 'lesson-g6-ire-u6-l1',
    questionIds: [
      'q-g6-ire-u6-001', 'q-g6-ire-u6-002', 'q-g6-ire-u6-003', 'q-g6-ire-u6-004',
      'q-g6-ire-u6-005', 'q-g6-ire-u6-006', 'q-g6-ire-u6-007', 'q-g6-ire-u6-008',
      'q-g6-ire-u6-009', 'q-g6-ire-u6-010', 'q-g6-ire-u6-011', 'q-g6-ire-u6-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u6-m2',
    worldId: 'world-faith-values',
    title: 'Mission 140: Divine Destiny & Diligence – The Four Pillars of Al-Qadar',
    description: 'Master the stages of Al-Qadar, learn how human choice harmonizes with divine will, and embrace true Tawakkul by pairing prayer with hard work.',
    order: 140,
    orderIndex: 140,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-qadar-destiny',
    badge: 'badge-g6-ire-qadar-destiny',
    lessonId: 'lesson-g6-ire-u6-l2',
    questionIds: [
      'q-g6-ire-u6-013', 'q-g6-ire-u6-014', 'q-g6-ire-u6-015', 'q-g6-ire-u6-016',
      'q-g6-ire-u6-017', 'q-g6-ire-u6-018', 'q-g6-ire-u6-019', 'q-g6-ire-u6-020',
      'q-g6-ire-u6-021', 'q-g6-ire-u6-022', 'q-g6-ire-u6-023', 'q-g6-ire-u6-024'
    ],
    learningAreaId: 'la-ire-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 5 Questions (q-g6-ire-u5-001 to q-g6-ire-u5-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u5-001',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'How many men from Yathrib traveled to meet Prophet Muhammad (SAW) and took the First Pledge of Aqabah in 621 CE?',
    options: ['12 men', '70 men', '40 men', '313 men'],
    correctAnswer: '12 men',
    explanation: 'In 621 CE during the pilgrimage season, twelve men from the tribes of Aws and Khazraj of Yathrib met the Prophet at Al-Aqabah and made the first pledge.',
    socraticHint: 'Think of the small pioneer delegation from Yathrib that pledged non-violence and monotheism.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-002',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Which noble companion did the Prophet (SAW) appoint as the first teacher and ambassador to Yathrib after the First Pledge of Aqabah?',
    options: ['Mus’ab ibn Umayr', 'Bilal ibn Rabah', 'Abu Bakr al-Siddiq', 'Umar ibn al-Khattab'],
    correctAnswer: 'Mus’ab ibn Umayr',
    explanation: 'Mus’ab ibn Umayr (RA) was sent to Yathrib to teach the Qur’an and Islam, and his gentle, eloquent preaching brought almost every household into Islam.',
    socraticHint: 'Identify the young, noble companion known for his eloquence and deep knowledge of the Qur’an.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-003',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'What was the primary commitment made by the pilgrims in the Second Pledge of Aqabah in 622 CE?',
    options: [
      'To invite the Prophet to Yathrib and defend him and Muslims like their own families',
      'To pay taxes to the Quraysh leadership in Makkah',
      'To wage immediate offensive wars across the Arabian desert',
      'To build a trade monopoly between Syria and Yemen'
    ],
    correctAnswer: 'To invite the Prophet to Yathrib and defend him and Muslims like their own families',
    explanation: 'The Second Pledge of Aqabah was a defensive alliance where 73 men and 2 women promised sanctuary and protection to the Prophet and his followers.',
    socraticHint: 'Focus on providing safety, shelter, and mutual defense for the persecuted believers.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-004',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Why did Ali ibn Abi Talib (RA) courageously sleep in the Prophet’s bed on the night of the planned assassination by Quraysh?',
    options: [
      'To act as a decoy and return entrusted belongings (Amanat) to the people of Makkah',
      'Because he was feeling tired from the long journey',
      'To surrender himself as a hostage to the tribal chiefs',
      'To claim leadership of the Banu Hashim clan'
    ],
    correctAnswer: 'To act as a decoy and return entrusted belongings (Amanat) to the people of Makkah',
    explanation: 'Ali volunteered to sleep in the bed so assassins would think the Prophet was still asleep, and stayed behind to return all valuables entrusted to the Prophet.',
    socraticHint: 'Consider two reasons: fooling the watching guards outside the house and fulfilling trustworthy duties.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-005',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'In which cave did Prophet Muhammad (SAW) and Abu Bakr (RA) hide for three days during their Hijrah from Makkah?',
    options: ['Cave of Thawr (Ghar Thawr)', 'Cave of Hira', 'Cave of Uhud', 'Cave of Arafat'],
    correctAnswer: 'Cave of Thawr (Ghar Thawr)',
    explanation: 'The Prophet and Abu Bakr took refuge in the Cave of Thawr south of Makkah to throw off trackers, whereas Cave Hira was where revelation first began.',
    socraticHint: 'Distinguish between the cave of revelation (Hira) and the cave of migration sanctuary.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-006',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'What reassuring words did Prophet Muhammad (SAW) say to Abu Bakr when trackers stood right outside the entrance of Cave Thawr?',
    options: [
      '"Do not grieve; indeed Allah is with us" (La tahzan inna Allaha ma’ana)',
      '"Prepare your sword, for battle has arrived"',
      '"Surrender peacefully and ask for ransom"',
      '"Run through the back of the mountain immediately"'
    ],
    correctAnswer: '"Do not grieve; indeed Allah is with us" (La tahzan inna Allaha ma’ana)',
    explanation: 'As recorded in Surah At-Tawbah (9:40), the Prophet calmly reassured Abu Bakr: "What do you think of two people when Allah is their third?" "Do not grieve; indeed Allah is with us."',
    socraticHint: 'Recall the famous verse of divine solace recorded in Surah At-Tawbah 9:40.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-007',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Which mosque was the very first mosque established by Prophet Muhammad (SAW) upon reaching the outskirts of Madinah?',
    options: ['Masjid Quba', 'Al-Masjid an-Nabawi', 'Masjid al-Qiblatayn', 'Al-Masjid al-Haram'],
    correctAnswer: 'Masjid Quba',
    explanation: 'Before entering the center of Yathrib, the Prophet rested in Quba and laid the foundation of Masjid Quba, mentioned in the Qur’an as founded on piety from day one.',
    socraticHint: 'Which mosque is located in the southern village just before entering central Madinah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-008',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Which famous anthem of joy and gratitude did the welcoming residents of Madinah sing upon the Prophet’s arrival?',
    options: [
      'Tala’a al-Badru ‘Alayna (The full moon has risen upon us)',
      'Labbaik Allahumma Labbaik (Here I am at Your service)',
      'Subhan Allahi wa bihamdih (Glory be to Allah and His praise)',
      'Allahu Akbar wa Lillahi al-Hamd'
    ],
    correctAnswer: 'Tala’a al-Badru ‘Alayna (The full moon has risen upon us)',
    explanation: 'The women, children, and men of Madinah lined the paths singing "Tala’a al-badru ‘alayna, min thaniyyatil-wada’..." welcoming the Messenger with immense delight.',
    socraticHint: 'Identify the poetic greeting comparing the Prophet’s arrival to the shining of a full moon.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-009',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Why did Caliph Umar ibn al-Khattab choose the year of the Hijrah (622 CE) as the starting point of the Islamic calendar?',
    options: [
      'Because it marked the establishment of an independent, just Muslim society and state',
      'Because it was the year Prophet Muhammad was born',
      'Because it was the year the Qur’an was fully compiled into a single book',
      'Because it marked the conquest of Jerusalem'
    ],
    correctAnswer: 'Because it marked the establishment of an independent, just Muslim society and state',
    explanation: 'The Hijrah signified the transition from persecution to self-determination, community governance, and moral society building, marking a defining era in history.',
    socraticHint: 'Think about when Muslims transformed from an oppressed minority into a thriving autonomous society.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-010',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Who accompanied the Prophet Muhammad (SAW) on the entire hazardous desert journey of the Hijrah from Makkah to Madinah?',
    options: ['Abu Bakr al-Siddiq (RA)', 'Uthman ibn Affan (RA)', 'Bilal ibn Rabah (RA)', 'Khalid ibn al-Walid (RA)'],
    correctAnswer: 'Abu Bakr al-Siddiq (RA)',
    explanation: 'Abu Bakr was the faithful companion chosen by the Prophet to accompany him, financing their two camels and caring for him throughout the journey.',
    socraticHint: 'Who is described in the Qur’an as "the second of the two when they were in the cave"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-011',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'Which skilled non-Muslim desert guide did Abu Bakr and the Prophet hire to navigate little-known coastal paths toward Madinah?',
    options: ['Abdullah ibn Urayqit', 'Suraqah ibn Malik', 'Amr ibn al-Aas', 'Bahira the monk'],
    correctAnswer: 'Abdullah ibn Urayqit',
    explanation: 'Abdullah ibn Urayqit was hired as a trustworthy expert scout to lead them through unfamiliar coastal tracks to evade the Quraysh pursuit parties.',
    socraticHint: 'Consider the expert desert scout trusted despite not yet being a Muslim.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-012',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l1',
    text: 'What major ethical principle is demonstrated by Ali staying behind in Makkah to return items left in the Prophet’s care?',
    options: [
      'Integrity and honoring trusts (Amanah) even toward those who persecute you',
      'Physical self-defense by attacking enemy guards',
      'Tribal supremacy of Banu Hashim over Banu Umayyah',
      'Claiming financial interest on deposited goods'
    ],
    correctAnswer: 'Integrity and honoring trusts (Amanah) even toward those who persecute you',
    explanation: 'Even when the Quraysh chiefs were plotting to kill him, the Prophet insisted that all their deposited possessions must be safely and honestly returned to them.',
    socraticHint: 'How should a believer treat trusts and deposits, even when dealing with adversaries?',
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
    id: 'q-g6-ire-u5-013',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'How was the exact location for building Al-Masjid an-Nabawi in Madinah chosen?',
    options: [
      'The Prophet let his camel (Qaswa) roam freely and chose where she knelt',
      'The tribal elders held a voting council with stones',
      'The Prophet bought the most luxurious palace available',
      'It was built at the highest hilltop to spot enemies'
    ],
    correctAnswer: 'The Prophet let his camel (Qaswa) roam freely and chose where she knelt',
    explanation: 'To avoid favoring any particular clan, the Prophet instructed everyone to let his camel Qaswa walk unguided; she knelt at the drying yard of Sahl and Suhayl.',
    socraticHint: 'Recall how the she-camel Qaswa determined the site without any human favoritism.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-014',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'What did the Prophet Muhammad (SAW) do before constructing Al-Masjid an-Nabawi on the land owned by the orphans Sahl and Suhayl?',
    options: [
      'He purchased the land from them at a fair market price despite their offer to donate it',
      'He seized the land as public property under state authority',
      'He traded cattle from Makkah in exchange for the land',
      'He waited until they grew up into adulthood before starting construction'
    ],
    correctAnswer: 'He purchased the land from them at a fair market price despite their offer to donate it',
    explanation: 'Although the young orphan boys offered the land as a free gift, the Prophet refused to take advantage of orphans and insisted on paying them in full.',
    socraticHint: 'Reflect on prophetic justice and protection of the economic rights of orphans.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-015',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'What was the shaded platform at the rear of Al-Masjid an-Nabawi known as, where poor and devoted students of knowledge resided?',
    options: ['Al-Suffah (Ahl al-Suffah)', 'Al-Mihrab', 'Al-Minbar', 'Al-Rawdah'],
    correctAnswer: 'Al-Suffah (Ahl al-Suffah)',
    explanation: 'Al-Suffah was a shaded veranda in the mosque that housed unmarried, destitute, and scholarly companions like Abu Hurairah, who dedicated their time to learning.',
    socraticHint: 'Which term refers to the bench or porch school of early Hadith memorizers?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-016',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'What is the term for the system of institutional brotherhood established by the Prophet between the Muhajirun and the Ansar?',
    options: ['Mu’akhah', 'Tawheed', 'Shura', 'Bay’ah'],
    correctAnswer: 'Mu’akhah',
    explanation: 'Mu’akhah refers to the formal fraternization pact where the Prophet paired each Makkan migrant (Muhajir) with a Madinan helper (Ansari) to integrate society.',
    socraticHint: 'The Arabic word comes from "Akh" meaning brother.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-017',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'How did the Ansar (Helpers of Madinah) respond to the arrival of their impoverished brothers, the Muhajirun?',
    options: [
      'They shared their houses, date palm orchards, and livestock with profound generosity',
      'They asked them to live outside the city borders in separate refugee camps',
      'They demanded exorbitant interest-bearing loans before offering assistance',
      'They advised them to return immediately back to Makkah'
    ],
    correctAnswer: 'They shared their houses, date palm orchards, and livestock with profound generosity',
    explanation: 'The Ansar exhibited unmatched selflessness (Ithar), willingly offering half of their property, date palms, and homes to ensure their migrant brothers had livelihoods.',
    socraticHint: 'Think about the supreme generosity praised in Surah Al-Hashr verse 9.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-018',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'What was the historic document drafted by Prophet Muhammad (SAW) governing inter-community relations in Madinah called?',
    options: [
      'Sahifat al-Madinah (The Constitution of Madinah)',
      'Sulh al-Hudaybiyyah (The Treaty of Hudaybiyyah)',
      'Fath Makkah (The Conquest Charter)',
      'Khutbat al-Wada’ (The Farewell Sermon)'
    ],
    correctAnswer: 'Sahifat al-Madinah (The Constitution of Madinah)',
    explanation: 'Sahifat al-Madinah (also known as the Charter of Madinah) was the written constitutional treaty establishing civic cooperation among all religious and tribal groups.',
    socraticHint: 'Look for the title meaning the "Charter or Document of Madinah".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-019',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'Which clause in the Constitution of Madinah guaranteed religious freedom for non-Muslim residents?',
    options: [
      '"To the Jews their religion, and to the Muslims their religion"',
      '"All citizens must convert to Islam within one year"',
      '"Non-Muslims may only pray outside the city gates"',
      '"Tribal idols must be maintained inside public markets"'
    ],
    correctAnswer: '"To the Jews their religion, and to the Muslims their religion"',
    explanation: 'The Charter explicitly recognized the freedom of worship and practice: Jewish tribes had their religion and Muslims had theirs, living together peacefully.',
    socraticHint: 'Identify the statement guaranteeing independent freedom of faith.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-020',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'Under the Constitution of Madinah, how was external aggression against the city to be handled?',
    options: [
      'All signatory groups (Muslims and Jewish tribes) must jointly defend Madinah',
      'Only the Muhajirun were obligated to fight external invaders',
      'The city would surrender without resistance',
      'Each tribe was left to make separate peace deals with the attacker'
    ],
    correctAnswer: 'All signatory groups (Muslims and Jewish tribes) must jointly defend Madinah',
    explanation: 'The constitution created a joint defense alliance: if Madinah was attacked by an outside enemy, all signatories were bound to defend the city together.',
    socraticHint: 'Consider the concept of collective civic security and mutual defense.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-021',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'How did the Constitution of Madinah alter the traditional pre-Islamic concept of tribal loyalty regarding crime and justice?',
    options: [
      'It made individual criminals personally accountable regardless of their clan affiliation',
      'It required an entire clan to be executed for a single person’s petty theft',
      'It allowed wealthy clans complete immunity from judicial punishment',
      'It abolished courts and encouraged private vengeance'
    ],
    correctAnswer: 'It made individual criminals personally accountable regardless of their clan affiliation',
    explanation: 'Before Islam, tribes defended their members even when guilty. The Constitution established that justice is impartial and that wrongdoers bear personal responsibility.',
    socraticHint: 'Think about equal rule of law replacing blind tribal favoritism.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-022',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'When Abdul Rahman ibn Awf (RA) arrived in Madinah with nothing, how did he respond to his Ansari brother’s offer of half his fortune?',
    options: [
      'He thanked him warmly and said: "Show me the way to the marketplace" to earn his own living',
      'He accepted the entire gift and ceased working',
      'He asked to be given government charity without exertion',
      'He refused to speak to him because of pride'
    ],
    correctAnswer: 'He thanked him warmly and said: "Show me the way to the marketplace" to earn his own living',
    explanation: 'Abdul Rahman prayed for barakah upon his brother Saad ibn al-Rabi’s family and wealth, but respectfully asked to be shown the market so he could trade and support himself.',
    socraticHint: 'Which quote showcases self-reliance, entrepreneurship, and working with one’s own hands?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-023',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'What lesson can Kenya’s multi-ethnic and multi-religious society draw directly from the Constitution of Madinah?',
    options: [
      'National unity, mutual protection, and freedom of worship across diverse communities',
      'Dividing towns along rigid tribal and linguistic boundaries',
      'Refusing to cooperate with people of other faiths on civic matters',
      'Relying solely on external nations to solve internal disputes'
    ],
    correctAnswer: 'National unity, mutual protection, and freedom of worship across diverse communities',
    explanation: 'The Constitution of Madinah offers a timeless blueprint for national cohesion, interfaith harmony, and equal citizenship in pluralistic countries like Kenya.',
    socraticHint: 'Connect historical pluralism in Madinah with Kenya’s national values of cohesion and tolerance.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u5-024',
    subStrandId: 'substrand-g6-ire-u5',
    lessonId: 'lesson-g6-ire-u5-l2',
    text: 'Besides communal prayer, what other vital civic roles did Al-Masjid an-Nabawi fulfill in the early Madinan society?',
    options: [
      'A school for learning, a town hall for diplomacy, and a treatment shelter for the wounded',
      'A military weapons factory and fortress',
      'A commercial livestock slaughterhouse and auction house',
      'A private residence restricted only to tribal chiefs'
    ],
    correctAnswer: 'A school for learning, a town hall for diplomacy, and a treatment shelter for the wounded',
    explanation: 'Al-Masjid an-Nabawi was the vibrant community hub of society—serving as a university (Suffah), diplomatic reception hall, social welfare office, and clinic (Rufaydah’s tent).',
    socraticHint: 'Identify the holistic functions of the mosque as a spiritual, educational, and social center.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // --- Unit 6 Questions (q-g6-ire-u6-001 to q-g6-ire-u6-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u6-001',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'Which angel is appointed by Allah to blow the Trumpet (Al-Soor) on the Day of Judgment?',
    options: ['Angel Israfeel', 'Angel Jibril', 'Angel Mika’il', 'Angel Malik'],
    correctAnswer: 'Angel Israfeel',
    explanation: 'Angel Israfeel is tasked with blowing the Trumpet (Al-Soor): the first blast to end life on earth, and the second blast to resurrect all human beings.',
    socraticHint: 'Which angel holds the trumpet waiting for the divine command to sound the resurrection?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-002',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is the Arabic term for the physical resurrection of all mankind from their graves on the Last Day?',
    options: ['Al-Ba’th', 'Al-Hashr', 'Al-Mizan', 'Al-Sirat'],
    correctAnswer: 'Al-Ba’th',
    explanation: 'Al-Ba’th refers to the resurrection—bringing bodies back to life and reuniting them with their souls upon the second blowing of the trumpet.',
    socraticHint: 'Which Islamic term specifically signifies rising from the dead?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-003',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is the term for the grand gathering of all resurrected humanity before Allah on the vast plain of judgment?',
    options: ['Al-Hashr', 'Al-Tawaf', 'Al-Hijrah', 'Al-Wuquf'],
    correctAnswer: 'Al-Hashr',
    explanation: 'Al-Hashr is the gathering of all created beings on the plain of resurrection awaiting the divine judgment (Hisab).',
    socraticHint: 'Surah 59 in the Qur’an shares this name meaning "The Gathering" or "The Exile".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-004',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'In which hand will the righteous believers receive their book of deeds on the Day of Judgment?',
    options: ['Right hand', 'Left hand', 'Behind their back', 'Under their feet'],
    correctAnswer: 'Right hand',
    explanation: 'According to Surah Al-Haqqah (69:19), whoever is given their book of deeds in their right hand will joyfully announce: "Here, read my book! Indeed, I was certain I would meet my account."',
    socraticHint: 'Which hand represents honor, salvation, and righteousness in Islamic teachings?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-005',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is the divine balance upon which human deeds will be precisely weighed called?',
    options: ['Al-Mizan', 'Al-Kursi', 'Al-Arsh', 'Al-Buraq'],
    correctAnswer: 'Al-Mizan',
    explanation: 'Al-Mizan is the real and just Scale set up on the Day of Judgment to weigh good deeds against bad deeds with absolute divine accuracy.',
    socraticHint: 'The Arabic word for "scales" or "balance" of justice.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-006',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is Al-Sirat in Islamic eschatology regarding the Last Day?',
    options: [
      'A bridge stretched over Hellfire that every soul must cross to reach Paradise',
      'The book recording the names of all prophets',
      'The pool of cool water granted to Prophet Muhammad',
      'The trumpet blown by Angel Israfeel'
    ],
    correctAnswer: 'A bridge stretched over Hellfire that every soul must cross to reach Paradise',
    explanation: 'Al-Sirat is the bridge traversed over Hellfire; believers will cross it at speeds corresponding to their faith and righteous deeds.',
    socraticHint: 'Focus on the bridge crossing situated over Jahannam toward Jannah.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-007',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is the greatest and most delightful reward for the dwellers of Jannah (Paradise)?',
    options: [
      'Beholding the noble face and countenance of Allah (Radd al-Nazar)',
      'Eating delicious exotic fruits forever',
      'Living in mansions made of silver and gold',
      'Drinking from rivers of pure honey'
    ],
    correctAnswer: 'Beholding the noble face and countenance of Allah (Radd al-Nazar)',
    explanation: 'While gardens and rivers are physical blessings, the supreme, unmatched delight of Paradise is looking upon Allah’s divine countenance (Surah Al-Qiyamah 75:22-23).',
    socraticHint: 'What spiritual blessing surpasses all physical pleasures of Paradise?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-008',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'How does true belief in Yawm al-Qiyamah directly improve a learner’s day-to-day behavior?',
    options: [
      'It creates internal consciousness (Taqwa), stopping cheating, cruelty, and deceit',
      'It causes the student to withdraw completely from academic studies',
      'It encourages wasting time waiting for the end of the world',
      'It makes a person arrogant toward people of other communities'
    ],
    correctAnswer: 'It creates internal consciousness (Taqwa), stopping cheating, cruelty, and deceit',
    explanation: 'Knowing that every word and action is recorded and weighed instills profound accountability, inspiring honesty, kindness, and moral excellence.',
    socraticHint: 'How does personal accountability before God transform character and ethics?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-009',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'According to prophetic Hadith, which of the following will be the first matter a servant is held accountable for on the Day of Judgment regarding deeds?',
    options: ['Their Salah (Five daily prayers)', 'Their business profits', 'Their travel records', 'Their clan popularity'],
    correctAnswer: 'Their Salah (Five daily prayers)',
    explanation: 'The Prophet (SAW) stated: "The first matter that the slave will be brought to account for on the Day of Judgment is the prayer (Salah). If it is sound, then the rest of his deeds will be sound..."',
    socraticHint: 'Which foundational pillar of daily worship is assessed first before all other deeds?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-010',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What is the special lake or cistern granted to Prophet Muhammad (SAW) on the Day of Resurrection, from which whoever drinks will never thirst again?',
    options: ['Al-Hawd (Al-Kawthar)', 'Zamzam', 'Salsabil', 'Tasnim'],
    correctAnswer: 'Al-Hawd (Al-Kawthar)',
    explanation: 'Al-Hawd is the prophetic cistern whose water is whiter than milk and sweeter than honey; drinking from it ensures one never experiences thirst again.',
    socraticHint: 'Recall the special pool connected to Surah Al-Kawthar.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-011',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'Who is the guardian angel of Hellfire (Jahannam) mentioned in Surah Az-Zukhruf (43:77)?',
    options: ['Malik', 'Ridwan', 'Munkar', 'Nakir'],
    correctAnswer: 'Malik',
    explanation: 'Malik is the angel who oversees Hellfire; the transgressors will call out to him: "O Malik, let your Lord put an end to us!" but he will reply: "Indeed, you will remain."',
    socraticHint: 'Distinguish between Ridwan (gatekeeper of Paradise) and Malik (keeper of Hellfire).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-012',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l1',
    text: 'What does Islam teach about a person who has oppressed others in this world when standing before the Mizan?',
    options: [
      'Their good deeds will be taken and given to their victims to settle the score of injustice',
      'Their wealth in world bank accounts will buy their forgiveness',
      'Their powerful relatives will bribe the angels',
      'The oppression is completely forgotten and ignored'
    ],
    correctAnswer: 'Their good deeds will be taken and given to their victims to settle the score of injustice',
    explanation: 'In the Hadith of the bankrupt person (Al-Muflis), the Prophet explained that good deeds are transferred to victims of backbiting, theft, or slander until justice is satisfied.',
    socraticHint: 'How does divine balance compensate victims of human injustice on the Day of Judgment?',
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
    id: 'q-g6-ire-u6-013',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'Which pillar of Iman is belief in Al-Qadar (Divine Destiny)?',
    options: ['The Sixth Pillar', 'The First Pillar', 'The Third Pillar', 'The Fifth Pillar'],
    correctAnswer: 'The Sixth Pillar',
    explanation: 'In Hadith Jibril, when asked about Iman, the Prophet listed: belief in Allah, His angels, His books, His messengers, the Last Day, and belief in Al-Qadar (the sixth pillar).',
    socraticHint: 'Count the six articles of faith from Hadith Jibril.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-014',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'What is the first fundamental level (Martabah) of Al-Qadar?',
    options: [
      'Al-’Ilm (Allah’s comprehensive, eternal knowledge of all things)',
      'Al-Kitabah (Writing down the actions)',
      'Al-Mashi’ah (The divine will)',
      'Al-Khalq (The physical creation of deeds)'
    ],
    correctAnswer: 'Al-’Ilm (Allah’s comprehensive, eternal knowledge of all things)',
    explanation: 'Al-’Ilm is the first stage: Allah knows all things before they exist, what has happened, what will happen, and what did not happen how it would have happened.',
    socraticHint: 'Which stage refers to Allah’s infinite omniscience?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-015',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'Where were all decrees and destinies written fifty thousand years before the creation of the heavens and the earth?',
    options: ['Al-Lawh al-Mahfuz (The Preserved Tablet)', 'On the gates of Makkah', 'In the books of Moses', 'On the Mount of Uhud'],
    correctAnswer: 'Al-Lawh al-Mahfuz (The Preserved Tablet)',
    explanation: 'The Prophet (SAW) stated that Allah commanded the Pen to write everything that will happen until the Day of Resurrection in Al-Lawh al-Mahfuz.',
    socraticHint: 'Which Arabic phrase means "The Well-Preserved Tablet"?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-016',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'What are the four recognized levels (Maratib) of Al-Qadar in Islamic theology?',
    options: [
      'Knowledge (Al-’Ilm), Writing (Al-Kitabah), Will (Al-Mashi’ah), and Creation (Al-Khalq)',
      'Intention, Fasting, Pilgrimage, and Charity',
      'Birth, Youth, Adulthood, and Old age',
      'Earth, Water, Air, and Fire'
    ],
    correctAnswer: 'Knowledge (Al-’Ilm), Writing (Al-Kitabah), Will (Al-Mashi’ah), and Creation (Al-Khalq)',
    explanation: 'Scholars of Ahl al-Sunnah outline the four pillars of Qadar as: 1) Al-’Ilm, 2) Al-Kitabah, 3) Al-Mashi’ah, and 4) Al-Khalq.',
    socraticHint: 'Look for the theological sequence starting from divine knowledge to divine creation.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-017',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'When a Bedouin asked whether he should tie his camel or leave it loose and trust in Allah, what did the Prophet (SAW) reply?',
    options: [
      '"Tie her, and then rely on Allah" (I’qilha wa tawakkal)',
      '"Leave her untied, for tying shows a lack of faith"',
      '"Sell the camel and walk on foot"',
      '"Do not worry about the camel at all"'
    ],
    correctAnswer: '"Tie her, and then rely on Allah" (I’qilha wa tawakkal)',
    explanation: 'The Prophet clarified that true reliance on Allah (Tawakkul) requires taking practical responsibility and precautions first, not reckless passivity (Tawaakul).',
    socraticHint: 'Does true faith mean being reckless or taking proper precautions before trusting Allah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-018',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'What is the vital difference between Tawakkul (true reliance on Allah) and Tawaakul (false resignation)?',
    options: [
      'Tawakkul combines active effort with trust in Allah, while Tawaakul is laziness without effort',
      'Tawakkul is only for scholars, while Tawaakul is for general Muslims',
      'Tawakkul means ignoring medical treatment during illness',
      'There is no difference; they mean the exact same thing'
    ],
    correctAnswer: 'Tawakkul combines active effort with trust in Allah, while Tawaakul is laziness without effort',
    explanation: 'Tawakkul requires using legitimate means, studying, working, and praying, while Tawaakul is neglecting responsibility and making excuses.',
    socraticHint: 'How does making an effort distinguish genuine faith from mere laziness?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-019',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'Can a person who commits a crime or refuses to revise for exams blame Al-Qadar (Divine Decree) for their failure?',
    options: [
      'No, because humans possess free choice and intellect, making them accountable for their decisions',
      'Yes, because everything is pre-recorded, humans have no moral responsibility',
      'Yes, Qadar excuses all criminal acts and negligence',
      'Only if they committed the act during daytime hours'
    ],
    correctAnswer: 'No, because humans possess free choice and intellect, making them accountable for their decisions',
    explanation: 'Islam rejects fatalism; Allah gave humans guidance, reasoning, and choice. When someone chooses to sin or be lazy, they are responsible for that decision.',
    socraticHint: 'Why does God reward good deeds and punish evil if humans had no choice?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-020',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'What noble attitude should a believer display when struck by an unforeseen calamity or loss?',
    options: [
      'Patience (Sabr), saying "Inna lillahi wa inna ilayhi raji’un", and trust in Allah’s wisdom',
      'Anger, screaming curses at destiny, and despair',
      'Giving up daily prayers and abandoning work',
      'Blaming innocent neighbors and plotting retaliation'
    ],
    correctAnswer: 'Patience (Sabr), saying "Inna lillahi wa inna ilayhi raji’un", and trust in Allah’s wisdom',
    explanation: 'Belief in Qadar grants emotional tranquility. In hardship, the believer exercises Sabr and says "Indeed we belong to Allah and to Him we shall return," knowing trials contain hidden mercy.',
    socraticHint: 'What virtue enables a Muslim to endure hardship with dignity and calm faith?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-021',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'When experiencing grand success or wealth, how does belief in Al-Qadar protect a Muslim from arrogance?',
    options: [
      'It reminds them that success is a blessing and test from Allah, inspiring Shukr (Gratitude) and humility',
      'It makes them believe they are superior to all other humans',
      'It proves they are inherently holier than poorer people',
      'It allows them to boast endlessly about their personal brilliance'
    ],
    correctAnswer: 'It reminds them that success is a blessing and test from Allah, inspiring Shukr (Gratitude) and humility',
    explanation: 'Belief in Qadar keeps a person humble, realizing their talents and opportunities are gifts from Allah, inspiring gratitude (Shukr) rather than pride (Kibr).',
    socraticHint: 'Who is the true grantor of victory, intellect, and wealth?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-022',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'What famous phrase did Caliph Umar say when deciding to turn back from entering Syria during the devastating plague of Amwas?',
    options: [
      '"We flee from the decree of Allah to the decree of Allah"',
      '"A warrior never retreats even from disease"',
      '"Destiny cannot harm those with pure intentions"',
      '"Plague only affects those who do not pray"'
    ],
    correctAnswer: '"We flee from the decree of Allah to the decree of Allah"',
    explanation: 'Umar wisely noted that taking medical precaution by avoiding an infected town is itself acting in accordance with Allah’s decree.',
    socraticHint: 'Recognize Umar’s balance between taking precautions and honoring God’s decree.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-023',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'Why does the Prophet Muhammad (SAW) prohibit obsessing over "What if..." (Law) when an accident or loss occurs?',
    options: [
      'Because saying "If only..." opens the door to Satan’s despair and regret',
      'Because grammar rules forbid using conditionals in Arabic',
      'Because the past can be changed through magic',
      'Because feelings of grief are unlawful in all circumstances'
    ],
    correctAnswer: 'Because saying "If only..." opens the door to Satan’s despair and regret',
    explanation: 'The Prophet taught: "If something befalls you, do not say: If only I had done such-and-such... Rather say: Qaddar Allahu wa ma sha’a fa’ala (Allah has decreed, and what He willed has occurred), for ‘if only’ opens the work of Satan."',
    socraticHint: 'How does excessive regret and "if only" trap a person in sorrow and distrust of God?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u6-024',
    subStrandId: 'substrand-g6-ire-u6',
    lessonId: 'lesson-g6-ire-u6-l2',
    text: 'How should a Grade 6 learner apply belief in Al-Qadar when sitting for national school examinations?',
    options: [
      'Study hard, make du’a, follow exam rules, and peacefully accept the final outcome as Allah’s decree',
      'Do not read books or revise, expecting Allah to fill in the exam answers magically',
      'Cheat if questions are difficult, claiming it was destined to happen',
      'Become hopeless and skip the examination completely'
    ],
    correctAnswer: 'Study hard, make du’a, follow exam rules, and peacefully accept the final outcome as Allah’s decree',
    explanation: 'Pairing thorough academic revision with prayer (Tawakkul) and having peace of mind regarding the outcome reflects true belief in Al-Qadar.',
    socraticHint: 'What is the balanced prophetic recipe for academic success and peace of mind?',
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
console.log(`Added ${qCount} questions for Units 5 & 6.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 3 of Grade 6 IRE to cbe_database.json!');
