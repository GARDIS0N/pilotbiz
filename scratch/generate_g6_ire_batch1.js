/**
 * Grade 6 Islamic Religious Education (IRE) - Batch 1 Generator
 * Setup: Learning Area 'la-ire-g6', 4 Strands
 * Content: Units 1 & 2 (Surah Al-Zalzalah & Al-Adiyat, Surah Al-Qadr & Al-Tin)
 * Missions: Orders 129, 130, 131, 132 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-ire-u1-001 to q-g6-ire-u2-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Setting up Grade 6 IRE and Batch 1 (Units 1 & 2) ---');

// 1. Learning Area Registration
const laIreG6 = {
  id: 'la-ire-g6',
  gradeId: 'grade-6',
  name: 'Islamic Religious Education',
  swahiliName: 'Elimu ya Dini ya Kiislamu',
  icon: 'scroll',
  color: '#059669',
  description: 'Nurturing Islamic spiritual literacy, Quranic recitation and reflection (Surah Al-Zalzalah, Al-Adiyat, Al-Qadr, Al-Tin), prophetic Hadith, Sirah milestones (Isra wal-Mi’raj, Hijrah and Constitution of Madinah), pillars of Iman and Ibadah (Qadar, Swalatul Musafir, Janazah, Hajj), Halal economic ethics, and peaceful national cohesion in Kenya.',
  strandsCount: 4
};

const laIdx = db.learningAreas.findIndex(l => l.id === laIreG6.id);
if (laIdx >= 0) db.learningAreas[laIdx] = laIreG6;
else db.learningAreas.push(laIreG6);
console.log('Registered learning area: la-ire-g6');

// 2. Strands for Grade 6 IRE
const strands = [
  {
    id: 'strand-g6-ire-quran',
    learningAreaId: 'la-ire-g6',
    code: 'IRE-G6-STR-01',
    title: 'The Holy Qur’an and Hadith',
    swahiliTitle: 'Qur’ani Tukufu na Hadithi',
    description: 'Recitation, memorization, Tajweed rules, and moral reflection on selected Surahs (Al-Zalzalah, Al-Adiyat, Al-Qadr, Al-Tin) and prophetic Hadith on truthfulness, guarding the tongue, and sincere advice.',
    icon: 'book'
  },
  {
    id: 'strand-g6-ire-sirah',
    learningAreaId: 'la-ire-g6',
    code: 'IRE-G6-STR-02',
    title: 'Sirah (Life of Prophet Muhammad SAW)',
    swahiliTitle: 'Sirah (Maisha ya Mtume Muhammad SAW)',
    description: 'The Year of Sorrow, journey to Ta’if, the miraculous night journey (Al-Isra wal-Mi’raj), the Pledges of Aqabah, the Hijrah to Madinah, the building of the Prophet’s Mosque, and the historic Constitution of Madinah.',
    icon: 'moon'
  },
  {
    id: 'strand-g6-ire-ibadah',
    learningAreaId: 'la-ire-g6',
    code: 'IRE-G6-STR-03',
    title: 'Pillars of Iman and Acts of Worship (Ibadah)',
    swahiliTitle: 'Nguzo za Imani na Ibada',
    description: 'Belief in the Day of Resurrection (Yawm al-Qiyamah) and Divine Decree (Qadar); performing Swalatul Musafir (Qasr and Jam’a) and Swalatul Janazah; understanding the rites, spiritual lessons, and universal brotherhood of Hajj.',
    icon: 'star'
  },
  {
    id: 'strand-g6-ire-akhlaq',
    learningAreaId: 'la-ire-g6',
    code: 'IRE-G6-STR-04',
    title: 'Islamic Ethics (Akhlaq), Muamalat & Nation Building',
    swahiliTitle: 'Maadili ya Kiislamu, Muamalat na Ujenzi wa Taifa',
    description: 'Islamic financial ethics (Halal vs. Riba, honest trade, resisting corruption and bribery), Islamic environmental stewardship, peaceful coexistence with neighbors of other faiths, and Christian-Muslim harmony in Kenya.',
    icon: 'shield'
  }
];

for (const s of strands) {
  const idx = db.strands.findIndex(x => x.id === s.id);
  if (idx >= 0) db.strands[idx] = s;
  else db.strands.push(s);
  console.log(`Registered strand: ${s.id}`);
}

// 3. Units 1 & 2 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ire-u1',
    strandId: 'strand-g6-ire-quran',
    learningAreaId: 'la-ire-g6',
    title: 'Surah Al-Zalzalah & Surah Al-Adiyat: Accountability & Ingratitude',
    name: 'Surah Al-Zalzalah & Surah Al-Adiyat: Accountability & Ingratitude',
    description: 'Recitation with Tajweed, memorization, word-by-word meaning, and spiritual reflection on Surah Al-Zalzalah (Surah 99: The Violent Shaking of the Earth, earth revealing its secrets, absolute divine justice where an atom’s weight of good or evil is rewarded) and Surah Al-Adiyat (Surah 100: The Snorting Warhorses, oath by the galloping steeds, human ungratefulness to the Lord, intense love for worldly wealth, and the uncovering of the secrets of the hearts on the Day of Judgment).',
    cbeCompetency: 'Qur’anic recitation, Tajweed mastery, moral accountability, and spiritual reflection',
    estimatedMinutes: 30,
    order: 1,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ire-u2',
    strandId: 'strand-g6-ire-quran',
    learningAreaId: 'la-ire-g6',
    title: 'Surah Al-Qadr & Surah Al-Tin: Divine Honor & Human Dignity',
    name: 'Surah Al-Qadr & Surah Al-Tin: Divine Honor & Human Dignity',
    description: 'Recitation, memorization, and moral application of Surah Al-Qadr (Surah 97: The Night of Decree, descent of the Holy Qur’an, night better than 1,000 months, descent of Archangel Jibril and angels with peace until dawn) and Surah Al-Tin (Surah 95: The Fig and the Olive, sacred oaths by Mount Sinai and the secure city of Makkah, humanity fashioned in the best mold / Ahsani Taqwim, moral degradation of those who abandon faith, and Allah as the Most Just of Judges).',
    cbeCompetency: 'Qur’anic reflection, spiritual devotion, moral discernment, and human dignity appreciation',
    estimatedMinutes: 30,
    order: 2,
    grade: 'G6'
  }
];

// 4. Lessons
const lessons = [
  {
    id: 'lesson-g6-ire-u1-l1',
    subStrandId: 'substrand-g6-ire-u1',
    title: 'Surah Al-Zalzalah: The Great Earth Tremor & Absolute Justice',
    content: 'Surah Al-Zalzalah (The Earthquake) is the 99th chapter of the Holy Qur’an, consisting of 8 verses.\n\n1. Translation and Meaning:\n- "When the earth is shaken with its final convulsion, and the earth discharges its burdens, and man cries: What is the matter with it?"\n- On that Day, the earth will report all that took place on its surface, as inspired by its Lord.\n- Humanity will emerge in scattered groups to be shown the outcomes of their deeds.\n- Verses 7-8: "So whoever does an atom’s weight of good will see it, and whoever does an atom’s weight of evil will see it."\n\n2. Key Spiritual Lessons:\n- Absolute Divine Accountability: Not even the tiniest speck (Dharrah) of kindness or wickedness is forgotten by Allah.\n- The Earth as a Witness: The physical earth will testify to the good deeds (praying, planting trees, helping the needy) and bad deeds (dumping trash, stealing) done on it.\n- Sincerity in Small Actions: Never underestimate any good deed, such as picking a thorn off a school path or offering a cheerful smile.',
    didYouKnow: 'The Arabic word "Dharrah" (ذَرَّة) historically referred to the weight of a tiny ant or speck of dust, and in modern scientific Arabic, it is the exact word used for an "atom"!',
    kenyanContext: 'Madrasa and school Islamic studies classes across Mombasa, Garissa, Nairobi, and Kisumu teach children to memorize Surah Al-Zalzalah with precise Tajweed rules.',
    order: 1,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u1-l2',
    subStrandId: 'substrand-g6-ire-u1',
    title: 'Surah Al-Adiyat: Galloping Steeds, Ingratitude & Secrets of the Breast',
    content: 'Surah Al-Adiyat (The Chargers / Galloping Steeds) is the 100th chapter of the Qur’an, comprising 11 powerful verses.\n\n1. Vivid Imagery and Divine Oath:\n- Allah swears by the warhorses that pant and snort as they gallop into battle, striking sparks of fire with their hooves and stirring up clouds of dust at dawn.\n- The loyal horse obeys its human master even into dangerous combat without hesitation.\n\n2. Human Ingratitude (Kufr al-Ni’mah):\n- "Indeed, mankind is ungrateful to his Lord, and to that he is a witness." (Verses 6-7).\n- Unlike the faithful horse that obeys its master, human beings frequently forget Allah’s infinite blessings (health, food, shelter, intellect).\n- Verse 8: "And indeed, in his love for wealth, he is intense." Human greed often blinds people from spiritual and moral duties.\n\n3. The Final Judgment (Verses 9-11):\n- "Does he not know that when the graves are overturned, and all that is hidden in the chests is brought out? Indeed, their Lord that Day is fully acquainted with them."\n- Secret intentions, hidden jealousy, and private thoughts will be laid bare before Allah.',
    didYouKnow: 'Surah Al-Adiyat paints one of the most dynamic auditory and visual word-pictures in classical Arabic, mimicking the thundering rhythm of galloping hooves!',
    kenyanContext: 'Islamic youth in Kenya are taught through Surah Al-Adiyat to show Shukr (gratitude) to Allah and avoid greed and ostentatious consumerism.',
    order: 2,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u2-l1',
    subStrandId: 'substrand-g6-ire-u2',
    title: 'Surah Al-Qadr: The Night of Power, Quranic Revelation & Angels of Peace',
    content: 'Surah Al-Qadr (The Night of Decree/Power) is the 97th chapter of the Qur’an, consisting of 5 blessed verses.\n\n1. Revelation and Meaning:\n- "Indeed, We sent the Qur’an down during the Night of Decree (Laylatul Qadr)."\n- "And what can make you know what is the Night of Decree? The Night of Decree is better than a thousand months." (83 years and 4 months of continuous worship!)\n- "Therein descend the angels and the Spirit (Archangel Jibril) by permission of their Lord for every matter."\n- "Peace it is until the emergence of dawn."\n\n2. Spiritual Virtues of Laylatul Qadr:\n- Occurs during the odd nights of the last ten days of Ramadan (21st, 23rd, 25th, 27th, or 29th).\n- A night of intense prayer (Tahajjud), seeking forgiveness (Istighfar), reciting Qur’an, and performing good deeds.\n- The Prophet (SAW) taught the special Du’a: "Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa’fu ‘anni" (O Allah, You are Most Forgiving and love forgiveness, so forgive me).',
    didYouKnow: 'A single night of worship on Laylatul Qadr equals more than 83 years of devotion—longer than an average human lifespan!',
    kenyanContext: 'During the last ten nights of Ramadan, Kenyan mosques from Jamia Mosque in Nairobi to coastal masjids overflow with worshippers performing Qiyamul Layl and I’tikaf.',
    order: 3,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u2-l2',
    subStrandId: 'substrand-g6-ire-u2',
    title: 'Surah Al-Tin: Oaths of Sanctity, Human Dignity & The Supreme Judge',
    content: 'Surah Al-Tin (The Fig) is the 95th chapter of the Qur’an, containing 8 verses highlighting human creation and moral destiny.\n\n1. Sacred Oaths of Sanctity (Verses 1-3):\n- Allah swears by the Fig and the Olive (symbolizing the blessed land of Palestine where Prophet Isa/Jesus taught).\n- By Mount Sinai (Tur Sinin, where Prophet Musa/Moses received the Torah).\n- By this secure city (Balad al-Amin, Makkah, home of the Ka’bah and birthplace of Prophet Muhammad SAW).\n- These oaths honor the great prophetic traditions of monotheism.\n\n2. The Dignity of Human Creation (Verse 4):\n- "We have certainly created man in the best of forms (Ahsani Taqwim)." Perfect physical balance, intellect, moral conscience, and spiritual capacity.\n\n3. Degradation vs. Elevation (Verses 5-8):\n- "Then We return him to the lowest of the low (Asfala Safileen), except for those who believe and do righteous deeds; for them is a reward uninterrupted."\n- When human beings reject faith and indulge in evil, they sink lower than beasts; but faith and good works elevate them to noble heights.\n- Verse 8: "Is not Allah the most just of judges (Ahkam al-Hakimin)?"',
    didYouKnow: 'Olives and figs are rich nutritional fruits celebrated in prophetic medicine (Tibb Nabawi) and Mediterranean ecology for their health-giving antioxidants!',
    kenyanContext: 'Muslim scholars in Kenya emphasize Surah Al-Tin to inspire youth to guard their God-given human dignity (Ahsani Taqwim) against drug abuse and moral corruption.',
    order: 4,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  }
];

// 5. Missions (Orders 129, 130, 131, 132 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-ire-u1-m1',
    worldId: 'world-faith-values',
    title: 'Mission 129: Tremors of Truth – Surah Al-Zalzalah & The Weight of an Atom',
    description: 'Master the recitation and Tajweed of Surah Al-Zalzalah, reflect on the final shaking of the earth, and discover the power of an atom’s weight of good deeds.',
    order: 129,
    orderIndex: 129,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-zalzalah-scholar',
    badge: 'badge-g6-ire-zalzalah-scholar',
    lessonId: 'lesson-g6-ire-u1-l1',
    questionIds: [
      'q-g6-ire-u1-001', 'q-g6-ire-u1-002', 'q-g6-ire-u1-003', 'q-g6-ire-u1-004',
      'q-g6-ire-u1-005', 'q-g6-ire-u1-006', 'q-g6-ire-u1-007', 'q-g6-ire-u1-008',
      'q-g6-ire-u1-009', 'q-g6-ire-u1-010', 'q-g6-ire-u1-011', 'q-g6-ire-u1-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u1-m2',
    worldId: 'world-faith-values',
    title: 'Mission 130: Galloping Steeds – Surah Al-Adiyat & Secrets of the Heart',
    description: 'Uncover the thundering verses of Surah Al-Adiyat, learn why ungrateful greed ruins souls, and purify the deepest intentions of your chest.',
    order: 130,
    orderIndex: 130,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-adiyat-guardian',
    badge: 'badge-g6-ire-adiyat-guardian',
    lessonId: 'lesson-g6-ire-u1-l2',
    questionIds: [
      'q-g6-ire-u1-013', 'q-g6-ire-u1-014', 'q-g6-ire-u1-015', 'q-g6-ire-u1-016',
      'q-g6-ire-u1-017', 'q-g6-ire-u1-018', 'q-g6-ire-u1-019', 'q-g6-ire-u1-020',
      'q-g6-ire-u1-021', 'q-g6-ire-u1-022', 'q-g6-ire-u1-023', 'q-g6-ire-u1-024'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u2-m1',
    worldId: 'world-faith-values',
    title: 'Mission 131: The Night of Peace – Surah Al-Qadr & A Thousand Months',
    description: 'Seek the radiant blessings of Laylatul Qadr, welcome the descending angels of peace, and recite the beloved prophetic prayer of divine pardon.',
    order: 131,
    orderIndex: 131,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-ire-qadr-seeker',
    badge: 'badge-g6-ire-qadr-seeker',
    lessonId: 'lesson-g6-ire-u2-l1',
    questionIds: [
      'q-g6-ire-u2-001', 'q-g6-ire-u2-002', 'q-g6-ire-u2-003', 'q-g6-ire-u2-004',
      'q-g6-ire-u2-005', 'q-g6-ire-u2-006', 'q-g6-ire-u2-007', 'q-g6-ire-u2-008',
      'q-g6-ire-u2-009', 'q-g6-ire-u2-010', 'q-g6-ire-u2-011', 'q-g6-ire-u2-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u2-m2',
    worldId: 'world-faith-values',
    title: 'Mission 132: The Noble Mold – Surah Al-Tin & Ahsani Taqwim',
    description: 'Explore the sacred oaths of Mount Sinai and Makkah in Surah Al-Tin, uphold your noble human creation, and honor Allah as the Most Just of Judges.',
    order: 132,
    orderIndex: 132,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-ire-tin-disciple',
    badge: 'badge-g6-ire-tin-disciple',
    lessonId: 'lesson-g6-ire-u2-l2',
    questionIds: [
      'q-g6-ire-u2-013', 'q-g6-ire-u2-014', 'q-g6-ire-u2-015', 'q-g6-ire-u2-016',
      'q-g6-ire-u2-017', 'q-g6-ire-u2-018', 'q-g6-ire-u2-019', 'q-g6-ire-u2-020',
      'q-g6-ire-u2-021', 'q-g6-ire-u2-022', 'q-g6-ire-u2-023', 'q-g6-ire-u2-024'
    ],
    learningAreaId: 'la-ire-g6'
  }
];

// 6. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 1: Surah Al-Zalzalah & Surah Al-Adiyat (q-g6-ire-u1-001 to 024) ---
  {
    id: 'q-g6-ire-u1-001',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What major event is described in the opening verse of Surah Al-Zalzalah: "Itha zulzilatil-ardu zilzalaha"?',
    options: [
      'The final violent convulsion and earthquake of the earth on the Day of Resurrection',
      'The creation of the first mountain',
      'A normal rainstorm in Makkah',
      'The construction of the Ka’bah'
    ],
    correctAnswer: 'The final violent convulsion and earthquake of the earth on the Day of Resurrection',
    explanation: 'Surah Al-Zalzalah opens with the catastrophic, cosmic earthquake of the Last Day that shakes the earth to its foundations.',
    socraticHint: 'Which world-shaking cosmic event marks the start of the Day of Judgment in Surah Al-Zalzalah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-002',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'According to verse 2 of Surah Al-Zalzalah ("Wa akhrajatil-ardu athqalaha"), what will the earth discharge from within itself?',
    options: [
      'Its buried contents, treasures, and the bodies of the deceased from their graves',
      'Rivers of gold to make everyone wealthy',
      'Giant trees that grow into the sky',
      'Clean drinking water for all animals'
    ],
    correctAnswer: 'Its buried contents, treasures, and the bodies of the deceased from their graves',
    explanation: 'Verse 2 states that the earth will cast out its burdens (the dead and everything hidden beneath the crust) for divine resurrection.',
    socraticHint: 'What buried human bodies and secrets will the earth cast out on that Day?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-003',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What will the earth do on the Day of Judgment according to verse 4: "Yawma’ithin tuhaddithu akhbaraha"?',
    options: [
      'It will recount and testify to all deeds and events that were committed upon its surface',
      'It will sing joyful songs to the angels',
      'It will dissolve into water and disappear completely',
      'It will refuse to speak to anyone'
    ],
    correctAnswer: 'It will recount and testify to all deeds and events that were committed upon its surface',
    explanation: 'The earth itself will bear witness before Allah, reporting every single good or evil deed that took place upon its soil.',
    socraticHint: 'How will the physical earth serve as a witness to human actions before Allah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-004',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'Why will the earth be able to recount its news on that Day (verse 5)?',
    options: [
      'Because its Lord has commanded and inspired it to speak',
      'Because scientists will invent a machine to read the rocks',
      'Because the sun will melt the earth’s crust',
      'Because the wind will blow the words out'
    ],
    correctAnswer: 'Because its Lord has commanded and inspired it to speak',
    explanation: 'Verse 5 explains: "Bi-anna rabbaka awha laha" (Because your Lord has inspired/commanded it), by divine decree.',
    socraticHint: 'Whose divine inspiration and command empowers the earth to testify?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-005',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What does verse 7 of Surah Al-Zalzalah promise: "Faman ya’mal mithqala tharratin khayran yarah"?',
    options: [
      'Whoever does an atom’s weight of good will see its reward',
      'Only those who give millions of shillings in charity will be rewarded',
      'Good deeds are only rewarded if done in public',
      'Small acts of kindness do not matter in Islam'
    ],
    correctAnswer: 'Whoever does an atom’s weight of good will see its reward',
    explanation: 'Verse 7 guarantees that even the most microscopic good deed (mithqala tharratin khayran)—like a kind word or removing a thorn—will be rewarded by Allah.',
    socraticHint: 'What happens to even the tiniest speck or atom’s weight of good deed before Allah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-006',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What warning is given in verse 8 of Surah Al-Zalzalah: "Wa man ya’mal mithqala tharratin sharran yarah"?',
    options: [
      'Whoever does an atom’s weight of evil will see its consequence',
      'Evil deeds are automatically erased if nobody noticed them',
      'Only major crimes like murder are recorded',
      'Bad deeds committed as a child do not exist'
    ],
    correctAnswer: 'Whoever does an atom’s weight of evil will see its consequence',
    explanation: 'Verse 8 warns that not even the smallest malice, cruelty, or dishonest word will escape divine justice unless forgiven through sincere Tawbah.',
    socraticHint: 'Will any speck of evil escape being accounted for on the Day of Judgment?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-007',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What meaning did the Prophet Muhammad (SAW) teach when he advised: "Guard yourselves against the Fire, even with half a date of charity"?',
    options: [
      'Never despise or underestimate even the smallest charity or kind act, as it has immense weight with Allah',
      'Only dates may be given as charity',
      'Half a date is all that wealthy Muslims need to give',
      'Eating dates protects against physical fires'
    ],
    correctAnswer: 'Never despise or underestimate even the smallest charity or kind act, as it has immense weight with Allah',
    explanation: 'The Prophet (SAW) echoed Surah Al-Zalzalah: even the humblest gift (half a date) given with pure intention can protect a believer from hellfire.',
    socraticHint: 'How does this Hadith reflect the teaching that even an atom’s weight of good matters?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-008',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What Tajweed rule applies to the Nun Sakinah in the word "Faman ya’mal" (فَمَن يَعْمَلْ)?',
    options: [
      'Idgham bi-Ghunnah (merging with nasal sound into Ya)',
      'Ith-har Halqi (clear pronunciation)',
      'Iqlab (changing into Meem)',
      'Qalqalah (echoing sound)'
    ],
    correctAnswer: 'Idgham bi-Ghunnah (merging with nasal sound into Ya)',
    explanation: 'When a Nun Sakinah is followed by one of the letters of YANMU (Ya, Nun, Meem, Waw), it is merged with a two-count nasal ghunnah: "Famayy-ya’mal".',
    socraticHint: 'Which Tajweed rule merges the noon sound with a nasal buzz into the following letter Ya?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-009',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'How should awareness that the earth is a witness affect a Muslim pupil’s treatment of the environment?',
    options: [
      'They will avoid littering, plant trees, protect water sources, and treat animals kindly so the earth testifies favorably for them',
      'They will avoid walking on bare ground',
      'They will pour chemicals into rivers where nobody can see them',
      'They will cut down trees to prevent the earth from watching'
    ],
    correctAnswer: 'They will avoid littering, plant trees, protect water sources, and treat animals kindly so the earth testifies favorably for them',
    explanation: 'Knowing that the earth records our deeds inspires reverent environmental conservation, ensuring the earth bears witness to our righteous stewardship.',
    socraticHint: 'How does knowing the ground beneath your feet will testify before Allah inspire you to keep it clean?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-010',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What does "Yawma’ithin yasduru an-nasu ashtatan" mean in verse 6 of Surah Al-Zalzalah?',
    options: [
      'On that Day, people will proceed in scattered groups to be shown the outcomes of their deeds',
      'People will assemble to celebrate a harvest feast',
      'All people will run to hide in ocean caves',
      'Angels will count the number of stars in heaven'
    ],
    correctAnswer: 'On that Day, people will proceed in scattered groups to be shown the outcomes of their deeds',
    explanation: 'Verse 6 describes the resurrection where humanity rises in distinct, scattered groups, each heading toward the divine judgment of their deeds.',
    socraticHint: 'How will resurrected humanity proceed in scattered groups to face their records?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-011',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'Why is Surah Al-Zalzalah considered equivalent to half the Qur’an in some prophetic traditions?',
    options: [
      'Because it concisely encapsulates the central core of Islamic faith: resurrection, divine judgment, and moral accountability',
      'Because it has exactly half the verses of the longest Surah',
      'Because it was revealed halfway through the Prophet’s mission',
      'Because it is read only on Fridays'
    ],
    correctAnswer: 'Because it concisely encapsulates the central core of Islamic faith: resurrection, divine judgment, and moral accountability',
    explanation: 'A Hadith in Tirmidhi notes that Surah Al-Zalzalah equals half the Qur’an because Islamic revelation addresses two realities: worldly guidance and the Akhirah (Day of Judgment).',
    socraticHint: 'Why is this brief surah so weighty in its focus on the resurrection and ultimate accountability?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-012',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l1',
    text: 'What practical moral habit should a Grade 6 learner build based on Surah Al-Zalzalah?',
    options: [
      'Consistently performing small daily acts of kindness (helping parents, smiling, being honest) and shunning every small wrongdoing',
      'Waiting until old age before doing any good deeds',
      'Believing that only famous people receive rewards from Allah',
      'Only being kind when other students are looking'
    ],
    correctAnswer: 'Consistently performing small daily acts of kindness (helping parents, smiling, being honest) and shunning every small wrongdoing',
    explanation: 'The surah motivates continuous daily righteousness: no small good is ever wasted, and no small wrongdoing should ever be dismissed as harmless.',
    socraticHint: 'How does the surah motivate you to do small kind deeds every single day?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-013',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'By what creature does Allah swear in the opening verse of Surah Al-Adiyat: "Wal-’adiyati dabha"?',
    options: [
      'By the panting and snorting warhorses as they gallop into battle',
      'By the camels of the trade caravans',
      'By the soaring eagles of the mountains',
      'By the lions of the Arabian desert'
    ],
    correctAnswer: 'By the panting and snorting warhorses as they gallop into battle',
    explanation: 'Surah Al-Adiyat begins with a vivid oath by the courageous galloping warhorses (Al-’Adiyat) whose breath pants (Dabha) with explosive speed.',
    socraticHint: 'Which galloping animal’s panting breath does Allah swear by in verse 1?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-ire-u1-014',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What do the hooves of the galloping horses produce in verse 2: "Fal-moriyati qadha"?',
    options: [
      'They strike sparks of fire as their iron shoes strike flint and rocky stones',
      'They splash ocean water into the clouds',
      'They leave golden coins in the sand',
      'They make flowers bloom along the path'
    ],
    correctAnswer: 'They strike sparks of fire as their iron shoes strike flint and rocky stones',
    explanation: 'Verse 2 depicts the speed and force of the horses whose galloping hooves strike fire sparks (qadha) against hard stones.',
    socraticHint: 'What bright sparks do the galloping hooves strike when hitting desert rocks?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-015',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'At what time of day does the cavalry charge occur in verse 3: "Fal-mughirati subha"?',
    options: [
      'At dawn / daybreak (Subh)',
      'At midnight under a full moon',
      'At midday in the scorching heat',
      'At sunset after Maghrib'
    ],
    correctAnswer: 'At dawn / daybreak (Subh)',
    explanation: 'Verse 3 records the surprise charge launched at daybreak (Subha), stirring up thick dust as they penetrate the enemy’s midst.',
    socraticHint: 'Which time of early morning corresponds to "Subha" in the verse?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-016',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What contrast is drawn between the loyal horse and ungrateful mankind in verse 6: "Innal-insana li-rabbihi la-kanood"?',
    options: [
      'The horse loyally obeys its master into mortal danger, yet man is intensely ungrateful (Kanood) to his Lord who created him',
      'Horses can run faster than humans',
      'Man was created to ride horses across the desert',
      'Horses do not require food or water'
    ],
    correctAnswer: 'The horse loyally obeys its master into mortal danger, yet man is intensely ungrateful (Kanood) to his Lord who created him',
    explanation: '"Kanood" means an ungrateful denier of blessings. The loyal warhorse shames ungrateful humans who enjoy Allah’s gifts yet disobey Him.',
    socraticHint: 'Why is human ingratitude toward Allah so shameful compared to a horse’s loyalty to its rider?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-017',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What does verse 8 state about human desire for material riches: "Wa innahu li-hubbil-khayri la-shadeed"?',
    options: [
      'Indeed, in his passionate love for wealth, man is intense and greedy',
      'Man loves to give away all his wealth to the poor',
      'Man hates gold and silver',
      'Man only works to buy books and pens'
    ],
    correctAnswer: 'Indeed, in his passionate love for wealth, man is intense and greedy',
    explanation: 'Verse 8 reveals that humans have an intense, covetous craving for wealth ("al-khayr" here refers to worldly possessions), which often leads to spiritual neglect.',
    socraticHint: 'What intense love for worldly wealth and possessions does verse 8 warn against?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-018',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What will happen to the graves on the Last Day according to verse 9: "Itha bu’thira ma fil-quboor"?',
    options: [
      'The graves will be overturned and their contents scattered and resurrected',
      'The graves will be turned into stone palaces',
      'Flowers will be planted on all graves',
      'The graves will be hidden beneath the sea'
    ],
    correctAnswer: 'The graves will be overturned and their contents scattered and resurrected',
    explanation: 'Verse 9 asks: Does man not know what happens when the graves are turned inside out and the bodies of all generations are raised to life?',
    socraticHint: 'What will happen when graves are opened and their dead resurrected on that Day?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-019',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What will be brought to light and exposed according to verse 10: "Wa hussila ma fis-sudoor"?',
    options: [
      'All the hidden secrets, motives, and intentions contained in human chests (hearts)',
      'The books kept inside classroom cupboards',
      'The gold buried under the desert sand',
      'The food stored inside kitchen pots'
    ],
    correctAnswer: 'All the hidden secrets, motives, and intentions contained in human chests (hearts)',
    explanation: 'Verse 10 states that everything kept secret inside human hearts—hypocrisy, envy, faith, love, or hatred—will be laid bare before Allah.',
    socraticHint: 'What secret thoughts and intentions hidden in our chests will be uncovered?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-020',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What divine attribute of Allah concludes Surah Al-Adiyat in verse 11: "Inna rabbahum bihim yawma’ithin la-khabeer"?',
    options: [
      'Al-Khabeer (The All-Aware / Fully Acquainted with all their affairs)',
      'Al-Khaliq (The Creator)',
      'Al-Ghafoor (The Forgiver)',
      'Al-Malik (The Sovereign King)'
    ],
    correctAnswer: 'Al-Khabeer (The All-Aware / Fully Acquainted with all their affairs)',
    explanation: 'The surah ends with Al-Khabeer: Allah possesses intimate, exhaustive knowledge of every creature’s inner motives and outward actions.',
    socraticHint: 'Which divine name of Allah meaning "The All-Aware" ends Surah Al-Adiyat?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-021',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What Tajweed rule of Qalqalah (echoing bounce) is heard at the end of verses in Surah Al-Adiyat (Dabha, Qadha, Subha, Jam’a)?',
    options: [
      'Qalqalah on letters of Qutb Jad (ق, ط, ب, ج, د)',
      'Ghunnah on Nun and Meem',
      'Madd Lazim (compulsory 6-count elongation)',
      'Ikhfa Shafawi'
    ],
    correctAnswer: 'Qalqalah on letters of Qutb Jad (ق, ط, ب, ج, د)',
    explanation: 'Letters like Ba in Dabha (دَبْحًا) and Qaf/Dal in Qadha (قَدْحًا) produce a crisp Qalqalah bounce when carrying a Sukun.',
    socraticHint: 'Which Tajweed rule gives an echoing bounce to the five letters of Qutb Jad?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-022',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'How should a Muslim overcome "Kanood" (ungratefulness) in daily life?',
    options: [
      'By regularly saying Alhamdulillah, counting Allah’s daily blessings, and sharing food and wealth with the needy',
      'By constantly complaining about what they do not own',
      'By buying expensive designer clothes on credit',
      'By ignoring poor relatives'
    ],
    correctAnswer: 'By regularly saying Alhamdulillah, counting Allah’s daily blessings, and sharing food and wealth with the needy',
    explanation: 'Gratitude (Shukr) dispels ungratefulness: thanking Allah with the tongue (Alhamdulillah), in the heart, and through charitable deeds.',
    socraticHint: 'What grateful word and charitable actions protect your heart from being ungrateful?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-023',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'Why does excessive love for worldly wealth ("Hubb al-Khayr") pose a danger to a student’s character?',
    options: [
      'It can tempt a person to cheat, steal, become arrogant, and neglect prayer and charity',
      'It makes students study harder in school',
      'It automatically makes people generous',
      'It protects people from committing sins'
    ],
    correctAnswer: 'It can tempt a person to cheat, steal, become arrogant, and neglect prayer and charity',
    explanation: 'Obsession with material riches corrupts moral judgment, leading to greed, dishonesty, and disregard for spiritual obligations.',
    socraticHint: 'Why is an uncontrolled love for money dangerous for your honesty and character?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u1-024',
    subStrandId: 'substrand-g6-ire-u1',
    lessonId: 'lesson-g6-ire-u1-l2',
    text: 'What overarching lesson connects both Surah Al-Zalzalah and Surah Al-Adiyat?',
    options: [
      'Divine accountability: every action and hidden intention will be laid bare and judged with absolute justice by Allah',
      'The history of camel trading in Makkah',
      'How to build stone houses on mountains',
      'The weather patterns of the Arabian Peninsula'
    ],
    correctAnswer: 'Divine accountability: every action and hidden intention will be laid bare and judged with absolute justice by Allah',
    explanation: 'Both surahs summon humanity to wake up to ultimate reality: our deeds on earth and the secret motives of our chests will be judged with flawless justice.',
    socraticHint: 'What shared theme of the Day of Judgment and complete divine accountability links both surahs?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // --- Unit 2: Surah Al-Qadr & Surah Al-Tin (q-g6-ire-u2-001 to 024) ---
  {
    id: 'q-g6-ire-u2-001',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'In verse 1 of Surah Al-Qadr ("Inna anzalnahu fee laylatil-qadr"), what was sent down on the Night of Decree?',
    options: [
      'The Holy Qur’an (from the Preserved Tablet / Lawh al-Mahfuz to the lowest heaven)',
      'A golden temple for the city of Makkah',
      'The book of Psalms (Zabur)',
      'The Ark of the Covenant'
    ],
    correctAnswer: 'The Holy Qur’an (from the Preserved Tablet / Lawh al-Mahfuz to the lowest heaven)',
    explanation: 'Surah Al-Qadr opens by announcing the descent of the Holy Qur’an on the Night of Decree (Laylatul Qadr) during the month of Ramadan.',
    socraticHint: 'Which sacred scripture was sent down on Laylatul Qadr?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-002',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'According to verse 3 of Surah Al-Qadr, how does the virtue of Laylatul Qadr compare to ordinary time?',
    options: [
      'The Night of Decree is better than a thousand months (exceeding 83 years and 4 months of worship)',
      'It is equal to one month of fasting',
      'It is equal to forty days in the desert',
      'It has the same value as every other night of the year'
    ],
    correctAnswer: 'The Night of Decree is better than a thousand months (exceeding 83 years and 4 months of worship)',
    explanation: 'Verse 3 proclaims: "Laylatul-qadri khayrum min alfi shahr" (The Night of Decree is better than a thousand months), offering boundless rewards.',
    socraticHint: 'How many months of worship is Laylatul Qadr better than according to verse 3?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-003',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'Who descends to earth on Laylatul Qadr according to verse 4: "Tanazzalul-mala’ikatu war-roohu feeha"?',
    options: [
      'The angels and the Spirit (Archangel Jibril / Gabriel) with every divine decree',
      'Ancient kings and prophets from their graves',
      'A host of Roman soldiers',
      'Birds carrying seeds of olive trees'
    ],
    correctAnswer: 'The angels and the Spirit (Archangel Jibril / Gabriel) with every divine decree',
    explanation: 'Verse 4 reveals that countless angels and "Ar-Rooh" (Archangel Jibril) descend to earth carrying Allah’s decrees of mercy, peace, and blessing.',
    socraticHint: 'Who is "Ar-Rooh" that descends alongside the angels on Laylatul Qadr?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-004',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What atmosphere fills the earth during Laylatul Qadr according to verse 5: "Salamun hiya hatta matla’il-fajr"?',
    options: [
      'Peace and tranquility (Salam) until the rising of the dawn',
      'Thunder, lightning, and rainstorms',
      'Fear and mourning until sunrise',
      'Total darkness where nobody can see'
    ],
    correctAnswer: 'Peace and tranquility (Salam) until the rising of the dawn',
    explanation: 'Verse 5 describes Laylatul Qadr as complete peace and spiritual safety (Salam) from sunset until the break of dawn (fajr).',
    socraticHint: 'What divine peace (Salam) covers the earth until the emergence of dawn on Laylatul Qadr?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-005',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'During which part of the blessed month of Ramadan should Muslims search for Laylatul Qadr?',
    options: [
      'During the odd-numbered nights of the last ten days (21st, 23rd, 25th, 27th, or 29th)',
      'On the first night of Ramadan only',
      'During the middle ten days of Ramadan',
      'On the day of Eid ul-Fitr'
    ],
    correctAnswer: 'During the odd-numbered nights of the last ten days (21st, 23rd, 25th, 27th, or 29th)',
    explanation: 'The Prophet (SAW) taught: "Seek Laylatul Qadr among the odd nights of the last ten nights of Ramadan" through prayer, vigil, and Quranic recitation.',
    socraticHint: 'Which odd-numbered nights at the end of Ramadan host Laylatul Qadr?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-006',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What special supplication (du’a) did Prophet Muhammad (SAW) teach Sayyidah Aisha (RA) to make on Laylatul Qadr?',
    options: [
      '"Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa’fu ‘anni" (O Allah, You are Most Forgiving and love forgiveness, so forgive me)',
      '"Rabbana atina fid-dunya hasanah"',
      '"Subhanallahi wa bihamdihi"',
      '"La hawla wa la quwwata illa billah"'
    ],
    correctAnswer: '"Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa’fu ‘anni" (O Allah, You are Most Forgiving and love forgiveness, so forgive me)',
    explanation: 'When Aisha (RA) asked what to say on Laylatul Qadr, the Prophet (SAW) taught this beautiful supplication seeking Allah’s pardon and mercy.',
    socraticHint: 'Which prayer asks Allah, who loves to forgive, to forgive our sins on Laylatul Qadr?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-007',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What spiritual practice involves retreating inside a mosque during the last ten days of Ramadan to focus exclusively on worship and seek Laylatul Qadr?',
    options: [
      'I’tikaf',
      'Tawaf',
      'Sa’i',
      'Zakat'
    ],
    correctAnswer: 'I’tikaf',
    explanation: 'I’tikaf is the Sunnah practice of spiritual retreat in the mosque during the final ten days of Ramadan, dedicating oneself entirely to prayer, dhikr, and Quran.',
    socraticHint: 'Which spiritual retreat inside the masjid during the last ten nights of Ramadan was practiced by the Prophet (SAW)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-008',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What does the word "Al-Qadr" signify in the name of Surah Al-Qadr?',
    options: [
      'Decree, honor, power, and destiny',
      'War and victory',
      'Fasting and hunger',
      'Stars and moonlight'
    ],
    correctAnswer: 'Decree, honor, power, and destiny',
    explanation: 'Al-Qadr signifies both immense honor and majesty, as well as the divine determination (Taqdir) of decrees for the coming year.',
    socraticHint: 'Does Al-Qadr mean honor, power, and the divine decree of destiny?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-009',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What Tajweed rule applies to the word "Tanazzalu" (تَنَزَّلُ) in verse 4?',
    options: [
      'Shaddah on the Zay with clear elongation',
      'Qalqalah Kubra',
      'Iqlab with Meem',
      'Idgham Bila Ghunnah'
    ],
    correctAnswer: 'Shaddah on the Zay with clear elongation',
    explanation: 'The letter Zay carries a Shaddah (Tashdeed), requiring clear emphasis and doubling of the consonant without nasalization.',
    socraticHint: 'What mark of emphasis sits on top of the letter Zay in Tanazzalu?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-010',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'How should a Grade 6 Muslim student prepare to maximize the blessings of Laylatul Qadr?',
    options: [
      'By performing night prayers (Qiyam), reciting Qur’an, making sincere du’a for parents and nation, and seeking forgiveness',
      'By watching television movies throughout the night',
      'By playing computer video games until sunrise',
      'By sleeping through the entire night'
    ],
    correctAnswer: 'By performing night prayers (Qiyam), reciting Qur’an, making sincere du’a for parents and nation, and seeking forgiveness',
    explanation: 'Believers engage in dedicated worship—Qiyamul Layl, Tahajjud, charity, Istighfar, and du’a—to reap the rewards exceeding 83 years of devotion.',
    socraticHint: 'Which devotional acts of prayer, du’a, and Quran reading maximize the blessings of Laylatul Qadr?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-011',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'Why did Allah conceal the exact single night on which Laylatul Qadr falls among the last ten nights?',
    options: [
      'To motivate believers to worship fervently and seek Him across all the final nights of Ramadan rather than on just one single evening',
      'Because the angels forgot the date',
      'Because it changes month every year',
      'To make it impossible for anyone to find it'
    ],
    correctAnswer: 'To motivate believers to worship fervently and seek Him across all the final nights of Ramadan rather than on just one single evening',
    explanation: 'Divine wisdom concealed the precise night so that Muslims exert themselves consistently in prayer and worship across all ten nights.',
    socraticHint: 'Why does not knowing the exact date encourage us to worship eagerly throughout all ten nights?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-012',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l1',
    text: 'What does the descent of peace (Salam) until dawn in Surah Al-Qadr teach believers about spiritual peace in society?',
    options: [
      'God’s peace is the ultimate foundation of human happiness; believers should be ambassadors of peace, safety, and reconciliation',
      'Peace is only for people who live in deserts',
      'Only kings are allowed to experience peace',
      'Peace means avoiding all physical work'
    ],
    correctAnswer: 'God’s peace is the ultimate foundation of human happiness; believers should be ambassadors of peace, safety, and reconciliation',
    explanation: 'The descent of divine Salam on Laylatul Qadr inspires believers to cultivate inner tranquility and promote peace, safety, and harmony in their communities.',
    socraticHint: 'How does the peace of Laylatul Qadr inspire Muslims to live peacefully with their neighbors?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-013',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'In verses 1-3 of Surah Al-Tin, what four sacred landmarks and symbols does Allah swear by?',
    options: [
      'By the Fig, the Olive, Mount Sinai, and this secure city (Makkah)',
      'By the sun, the moon, the stars, and the clouds',
      'By the Nile, the Euphrates, the Tigris, and the Jordan',
      'By the horse, the camel, the eagle, and the sheep'
    ],
    correctAnswer: 'By the Fig, the Olive, Mount Sinai, and this secure city (Makkah)',
    explanation: 'Verses 1-3 open with oaths: "Wat-teeni waz-zaytoon, wa Toori Seeneen, wa hathal-baladil-ameen" honoring sacred sites associated with prophets Isa, Musa, and Muhammad (SAW).',
    socraticHint: 'Which four sacred items and places (two fruits, one holy mountain, and one secure city) are sworn by?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-014',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'Which prophetic revelation site is represented by "Toori Seeneen" (Mount Sinai) in verse 2 of Surah Al-Tin?',
    options: [
      'The sacred mountain where Prophet Musa (Moses) spoke with Allah and received the Torah',
      'The cave where Prophet Muhammad (SAW) received the first revelation',
      'The mountain where Prophet Nuh’s ark rested',
      'The hill where Prophet Ibrahim offered his sacrifice'
    ],
    correctAnswer: 'The sacred mountain where Prophet Musa (Moses) spoke with Allah and received the Torah',
    explanation: 'Mount Sinai (Tur Sinin) is the historic mountain where Allah addressed Prophet Musa (AS) directly and bestowed the Ten Commandments of the Torah.',
    socraticHint: 'Which prophet encountered Allah and received the tablets of the Law at Mount Sinai?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-015',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'Which holy city is referred to as "Al-Balad al-Ameen" (the secure city) in verse 3 of Surah Al-Tin?',
    options: [
      'Makkah Al-Mukarramah',
      'Madinah Al-Munawwarah',
      'Jerusalem (Al-Quds)',
      'Cairo'
    ],
    correctAnswer: 'Makkah Al-Mukarramah',
    explanation: 'Makkah is honored as the "Secure City" (Al-Balad al-Ameen), made a sanctuary of peace through the prayer of Prophet Ibrahim (AS).',
    socraticHint: 'Which holy city containing the Ka’bah is called "the secure city" in Surah Al-Tin?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-016',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What does verse 4 declare about the design and dignity of human creation: "Laqad khalaqnal-insana fee ahsani taqweem"?',
    options: [
      '"We have certainly created man in the best of forms (the finest mold and constitution)"',
      '"Man was created from stone and fire"',
      '"Man is naturally evil and flawed"',
      '"Man was created to live like wild animals"'
    ],
    correctAnswer: '"We have certainly created man in the best of forms (the finest mold and constitution)"',
    explanation: 'Verse 4 establishes human dignity: Allah fashioned humanity in "Ahsani Taqwim"—endowed with upright posture, intellect, reason, moral choice, and spiritual beauty.',
    socraticHint: 'What Arabic phrase in verse 4 describes humanity as created in the finest and best mold?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-017',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What causes human beings to sink into "Asfala Safileen" (the lowest of the low) according to verse 5?',
    options: [
      'Rejecting faith in Allah, corrupting their character with sins, and living like unthinking beasts',
      'Failing to earn money in commercial business',
      'Growing old and having white hair',
      'Losing physical athletic speed'
    ],
    correctAnswer: 'Rejecting faith in Allah, corrupting their character with sins, and living like unthinking beasts',
    explanation: 'When humans abandon faith and moral conscience, they degrade their God-given dignity, sinking lower than animals into spiritual and moral depravity.',
    socraticHint: 'What happens when someone blessed with intellect and conscience chooses evil and rejects faith?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-018',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'Who is exempted from being reduced to the lowest of the low in verse 6 of Surah Al-Tin?',
    options: [
      '"Except for those who believe and do righteous deeds; for them is a reward uninterrupted"',
      'Those who possess the most gold and silver',
      'Those who belong to royal ruling families',
      'Those who live in wealthy cities'
    ],
    correctAnswer: '"Except for those who believe and do righteous deeds; for them is a reward uninterrupted"',
    explanation: 'Verse 6 promises that true believers who match their faith with righteous deeds (Amilus-Salihat) retain their high status and receive uninterrupted reward.',
    socraticHint: 'Which two inseparable qualities—faith and righteous deeds—protect humans from moral fall?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-019',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What question does verse 7 pose to those who doubt the resurrection: "Fama yukath-thibuka ba’du bid-deen"?',
    options: [
      '"So what yet causes you to deny the Judgment?"',
      '"Why do you not build stone ships?"',
      '"Why do you not plant fig trees in Makkah?"',
      '"Who taught you how to read classical Arabic?"'
    ],
    correctAnswer: '"So what yet causes you to deny the Judgment?"',
    explanation: 'Verse 7 challenges the skeptic: after seeing God’s wisdom in human design and prophetic history, what logical reason remains to deny the Day of Recompense?',
    socraticHint: 'What question challenges the denier regarding the reality of the Final Judgment?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-020',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What resounding question concludes Surah Al-Tin in verse 8: "A-laysa Allahu bi-ahkamil-hakimeen"?',
    options: [
      '"Is not Allah the most just of judges?"',
      '"Is not Allah the Creator of the sun?"',
      '"Is not Allah the Giver of rain?"',
      '"Is not Allah the King of Makkah?"'
    ],
    correctAnswer: '"Is not Allah the most just of judges?"',
    explanation: 'Verse 8 concludes with the profound affirmation: "Is not Allah the Most Just of Judges (Ahkamil-Hakimin)?" ensuring flawless, absolute cosmic justice.',
    socraticHint: 'What supreme judicial title of Allah as "the Most Just of Judges" finishes the surah?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-021',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What response did the Prophet Muhammad (SAW) teach believers to utter when reciting or hearing the final verse of Surah Al-Tin?',
    options: [
      '"Bala wa ana ‘ala thalika minash-shahideen" (Yes, indeed! And I am among the witnesses to that)',
      '"Astaghfirullah al-’Adheem"',
      '"La ilaha illallah"',
      '"Subhanallah wa bihamdihi"'
    ],
    correctAnswer: '"Bala wa ana ‘ala thalika minash-shahideen" (Yes, indeed! And I am among the witnesses to that)',
    explanation: 'Sunnah teaches that upon hearing "A-laysallahu bi-ahkamil hakimeen", one responds: "Bala, wa ana ‘ala thalika minash-shahideen" in testimony to Allah’s supreme justice.',
    socraticHint: 'Which Sunnah phrase confirms "Yes, indeed, and I bear witness that Allah is the Most Just of Judges"?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-022',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'How does the concept of "Ahsani Taqwim" (best of forms) inspire self-worth and discourage youth from drug abuse?',
    options: [
      'It reminds us that our bodies, minds, and souls are masterfully fashioned by Allah, so poisoning them with drugs or alcohol defiles our sacred dignity',
      'It means human bodies cannot be harmed by poisonous substances',
      'It encourages youth to spend money on cosmetic surgery',
      'It teaches that physical appearance is all that matters'
    ],
    correctAnswer: 'It reminds us that our bodies, minds, and souls are masterfully fashioned by Allah, so poisoning them with drugs or alcohol defiles our sacred dignity',
    explanation: 'Recognizing that Allah fashioned us in the finest mold instills self-respect, motivating youth to guard their brains, bodies, and health against toxic substances.',
    socraticHint: 'How does knowing Allah made you in the best mold motivate you to protect your mind and body from drugs?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-023',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What nutritional and environmental value is highlighted by the swearing by "The Fig and the Olive" in the Qur’an?',
    options: [
      'They are wholesome, health-giving fruits of deep ecological, medicinal, and nutritional benefit celebrated in prophetic tradition',
      'They are the only two plants that Muslims are permitted to cultivate',
      'They are fruits that never rot or decay',
      'They can only grow inside the borders of Kenya'
    ],
    correctAnswer: 'They are wholesome, health-giving fruits of deep ecological, medicinal, and nutritional benefit celebrated in prophetic tradition',
    explanation: 'Qur’anic oaths draw attention to the extraordinary medicinal properties, nutritional richness, and ecological value of figs and olives in human wellness.',
    socraticHint: 'Why does the Qur’an draw attention to the medicinal and nutritional qualities of figs and olives?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u2-024',
    subStrandId: 'substrand-g6-ire-u2',
    lessonId: 'lesson-g6-ire-u2-l2',
    text: 'What enduring message about human responsibility connects Surah Al-Qadr and Surah Al-Tin?',
    options: [
      'Allah has honored humanity with the greatest revelation (the Qur’an) and the finest creation (Ahsani Taqwim), calling us to live with faith, righteousness, and justice',
      'Human beings should focus only on building worldly trade wealth',
      'Only people in ancient times received guidance from Allah',
      'Righteous deeds are not required if you belong to a particular tribe'
    ],
    correctAnswer: 'Allah has honored humanity with the greatest revelation (the Qur’an) and the finest creation (Ahsani Taqwim), calling us to live with faith, righteousness, and justice',
    explanation: 'Both chapters celebrate the divine dignity bestowed on humanity—honored with the Qur’an on Laylatul Qadr and created in the best mold—demanding sincere faith and righteous living.',
    socraticHint: 'How do both surahs emphasize the supreme honor Allah gave humanity through the Qur’an and noble creation?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
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
console.log(`Added ${qCount} questions for Units 1 & 2.`);

// Update world-faith-values
const world = db.gameWorlds.find(w => w.id === 'world-faith-values');
if (world) {
  if (!world.learningAreaIds.includes('la-ire-g6')) {
    world.learningAreaIds.push('la-ire-g6');
  }
  if (world.totalMissions < 148) {
    world.totalMissions = 148;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 1 of Grade 6 IRE to cbe_database.json!');
