import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 IRE Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-ire-u7',
    strandId: 'strand-g5-ire-ibadah',
    learningAreaId: 'la-ire-g5',
    title: 'Purification (Taharah: Najasaat & Tayammum) and Selected Sunnah Prayers',
    description: 'Understanding physical and ritual cleanliness in Islam: Classification of impurities (Najasaat: Mukhaffafah - light; Mutawassitah - medium; Mughalladhah - heavy); methods of cleansing each type; conditions, pillars, and performance of dry ablution (Tayammum) using clean soil/dust; exploring the spiritual virtues and practical performance of Sunnah prayers: Tahiyyat al-Masjid, Salat ad-Dhuha, Sunan ar-Rawatib (12 daily rak\'ahs), and Salat al-Witr.',
    cbeCompetency: 'Personal and environmental hygiene, ritual purity, spiritual devotion, self-discipline in voluntary worship',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g5-ire-u8',
    strandId: 'strand-g5-ire-ibadah',
    learningAreaId: 'la-ire-g5',
    title: 'The Pillar of Sawm (Fasting in Ramadan) and Zakat (Charity & Economic Justice)',
    description: 'Deepening understanding of two foundational pillars of Islam: Sawm (fasting in Ramadan from dawn to sunset): definition, conditions, pillars, nullifiers, permissible exemptions (illness, journey, nursing, pregnancy), Qadha vs. Fidyah, and spiritual virtues of Taqwa; and Zakat: Zakat al-Fitr (due before Eid al-Fitr prayer) and Zakat al-Maal (annual 2.5% calculated on qualifying wealth reaching Nisab), and the eight rightful categories of recipients specified in Surah At-Tawbah 9:60.',
    cbeCompetency: 'Empathy for the vulnerable, socio-economic justice, self-restraint, charitable responsibility, community welfare',
    estimatedMinutes: 30,
    order: 8
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 4 Lessons (Units 7 & 8: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-ire-u7-l1',
    subStrandId: 'substrand-g5-ire-u7',
    title: 'Classification of Impurities (Najasaat) and Dry Ablution (Tayammum)',
    content: 'In Islam, Taharah (cleanliness and purification) is a prerequisite for prayer. Physical impurities (Najasaat) that invalidate prayer are categorized into three grades: 1) Najasah Mukhaffafah (Light impurity): the urine of a male infant under two years who has consumed only breast milk; it is purified simply by sprinkling water thoroughly over the contaminated surface without aggressive scrubbing; 2) Najasah Mutawassitah (Medium impurity): everyday impurities such as human urine, feces, vomit, flowing blood, pus, animal carcasses (Maytah), and intoxicants (Khamr); purified by washing with clean water until trace, color, and smell are completely removed; 3) Najasah Mughalladhah (Heavy impurity): contamination from dogs (saliva/urine) or pigs; purified by washing seven times, one of which must be with clean earth or soil. When water is unavailable (such as during severe drought) or when using water would aggravate illness or injury, Islam provides a merciful concession called Tayammum (dry ablution). Its pillars are: intention (Niyyah), striking clean soil or dust with both palms, blowing away excess dust, wiping the face, and wiping both arms up to the elbows. Tayammum allows a Muslim to perform prayer without delay.',
    didYouKnow: 'Prophet Muhammad (SAW) taught: "The earth has been made for me a mosque and a pure means of purification," meaning clean ground itself carries purifying blessing when water is scarce!',
    kenyanContext: 'In arid pastoral areas like Marsabit, Turkana, and Mandera where water is conserved strictly for drinking during prolonged dry seasons, Muslim herders and school pupils perform Tayammum correctly for daily prayers.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u7-l2',
    subStrandId: 'substrand-g5-ire-u7',
    title: 'Virtues and Performance of Selected Sunnah Prayers',
    content: 'While the five daily prayers (Salat al-Fard) are obligatory, Sunnah (voluntary) prayers elevate a believer’s spiritual status and compensate for any deficiencies in obligatory prayers. Essential Sunnah prayers include: 1) Tahiyyat al-Masjid: a two-rak’ah prayer performed upon entering a mosque before sitting down, showing respect to the House of Allah; 2) Salat ad-Dhuha: a forenoon prayer performed after the sun has fully risen until just before zenith (Dhuhr), consisting of 2 to 8 rak’ahs; the Prophet called it the prayer of the penitent and noted it serves as charity on behalf of every joint in the human body; 3) Sunan ar-Rawatib: 12 regular voluntary rak’ahs attached to daily prayers (2 before Fajr, 4 before Dhuhr, 2 after Dhuhr, 2 after Maghrib, and 2 after Isha). The Prophet (SAW) promised that whoever preserves these 12 rak’ahs daily, Allah will build for them a home in Paradise; 4) Salat al-Witr: the prayer performed after Salat al-Isha ending with an odd number of rak’ahs (usually 1 or 3) as the final prayer of the night, featuring the Du’a al-Qunut supplication.',
    didYouKnow: 'The Prophet (SAW) said regarding the two Sunnah rak’ahs before Fajr: "The two rak’ahs before dawn are dearer to me than the entire world and everything in it!"',
    kenyanContext: 'Learners at Jamia Mosque Primary School in Nairobi arrive early for Friday Juma’ah prayers and quietly perform two rak’ahs of Tahiyyat al-Masjid before sitting down to listen to the Imam’s sermon.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u8-l1',
    subStrandId: 'substrand-g5-ire-u8',
    title: 'The Pillar of Sawm: Rules, Nullifiers, and Spiritual Virtues of Ramadan',
    content: 'Sawm (fasting during the holy month of Ramadan) is the fourth Pillar of Islam, commanded in Surah Al-Baqarah 2:183: "O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain Taqwa (God-consciousness)." Sawm is the deliberate abstinence from food, drink, and sexual relations from true dawn (Adhan al-Fajr) until sunset (Adhan al-Maghrib). The two foundational pillars of Sawm are: 1) Niyyah (intention in the heart before Fajr begins), and 2) Imsak (abstaining from all fast-breaking substances during daylight). Actions that break the fast include: intentionally eating or drinking, intentional vomiting, and menstruation or post-natal bleeding. Eating or drinking accidentally out of forgetfulness does NOT invalidate the fast; the Prophet stated that Allah has fed and quenched that person\'s thirst. Allah grants compassionate exemptions to those who cannot fast: travelers on a arduous journey, the acutely ill, the frail elderly, and pregnant or nursing mothers fearing harm. Missed days are made up later day-for-day (Qadha), or compensated by feeding a needy person (Fidyah) for chronic illness. Fasting fosters self-discipline, cleanses bad habits, and awakens deep empathy for poor people who experience hunger daily.',
    didYouKnow: 'Prophet Muhammad (SAW) taught: "Fasting is a shield (Junnah) with which a servant protects himself from the Fire," guarding both morality and speech!',
    kenyanContext: 'During Ramadan in Mombasa, Malindi, and Kisumu, schools organize communal Iftar meals where students break their fast together with dates, water, and warm mahamri, building unity and mutual generosity.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u8-l2',
    subStrandId: 'substrand-g5-ire-u8',
    title: 'Zakat: Zakat al-Fitr, Zakat al-Maal, and the Eight Rightful Recipients',
    content: 'Zakat is the third Pillar of Islam, establishing economic justice and purifying wealth. There are two primary forms: 1) Zakat al-Fitr: an obligatory charity of staple food (approximately one Sa\' / 2.5–3 kg of wheat, rice, maize, or dates) levied upon every Muslim regardless of age or status, paid before the Eid al-Fitr prayer so that poor families can celebrate Eid joyfully; 2) Zakat al-Maal: an annual 2.5% (one-fortieth) payment on surplus wealth (money savings, gold, silver, commercial merchandise, livestock) that has remained in one’s possession for one full lunar year (Hawl) and reached the minimum threshold (Nisab). In Surah At-Tawbah (9:60), Allah specifies the eight rightful categories of recipients (Asnaf): 1) Al-Fuqara (the destitute poor); 2) Al-Masakin (the needy whose income cannot fulfill essential needs); 3) Al-Amilina \'Alayha (the appointed administrators/collectors of Zakat); 4) Al-Mu\'allafatu Qulubuhum (those whose hearts are being reconciled to Islam); 5) Fir-Riqab (freeing slaves and captives); 6) Al-Gharimin (debtors overwhelmed by unavoidable debts); 7) Fi Sabilillah (in the cause and service of Allah, including education and public good); and 8) Ibn as-Sabil (the stranded traveler cut off from resources). Zakat purifies wealth and eradicates poverty in the community.',
    didYouKnow: 'Linguistically, the Arabic word "Zakat" means both "purification" and "growth," showing that giving charity cleanses one\'s wealth and causes it to increase in divine blessing (Barakah)!',
    kenyanContext: 'In Garissa and Isiolo, local mosque welfare committees collect sacks of maize and cooking oil from business owners and distribute them to impoverished families before Eid al-Fitr prayer, fulfilling Zakat al-Fitr.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 4 Missions (Units 7 & 8: 4 Missions)
const missionsToAdd = [
  {
    id: 'mission-g5-ire-u7-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u7',
    lessonId: 'lesson-g5-ire-u7-l1',
    title: 'Purification and Dry Ablution (Tayammum) Quest',
    description: 'Master the three categories of physical impurities (Najasaat), their purification methods, and learn how to perform dry ablution (Tayammum) when water is scarce!',
    order: 81,
    orderIndex: 81,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-taharah-master',
    badge: {
      name: 'Taharah Scholar',
      icon: 'droplet'
    },
    questionIds: [
      'q-g5-ire-u7-001',
      'q-g5-ire-u7-002',
      'q-g5-ire-u7-003',
      'q-g5-ire-u7-004',
      'q-g5-ire-u7-005',
      'q-g5-ire-u7-006',
      'q-g5-ire-u7-007',
      'q-g5-ire-u7-008',
      'q-g5-ire-u7-009',
      'q-g5-ire-u7-010',
      'q-g5-ire-u7-011',
      'q-g5-ire-u7-012'
    ]
  },
  {
    id: 'mission-g5-ire-u7-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u7',
    lessonId: 'lesson-g5-ire-u7-l2',
    title: 'Sunnah Prayers and Heavenly Palaces Trial',
    description: 'Unlock the tremendous spiritual rewards of voluntary prayers: Tahiyyat al-Masjid, forenoon Dhuha, the 12 regular Rawatib, and concluding night Witr!',
    order: 82,
    orderIndex: 82,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-sunnah-prayers',
    badge: {
      name: 'Sunnah Devotee',
      icon: 'sun'
    },
    questionIds: [
      'q-g5-ire-u7-013',
      'q-g5-ire-u7-014',
      'q-g5-ire-u7-015',
      'q-g5-ire-u7-016',
      'q-g5-ire-u7-017',
      'q-g5-ire-u7-018',
      'q-g5-ire-u7-019',
      'q-g5-ire-u7-020',
      'q-g5-ire-u7-021',
      'q-g5-ire-u7-022',
      'q-g5-ire-u7-023',
      'q-g5-ire-u7-024'
    ]
  },
  {
    id: 'mission-g5-ire-u8-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u8',
    lessonId: 'lesson-g5-ire-u8-l1',
    title: 'Ramadan Shield and Sawm Mastery Quest',
    description: 'Explore the divine obligation of fasting in Ramadan, identify actions that nullify or protect the fast, and understand compassionate exemptions for travelers and the sick!',
    order: 83,
    orderIndex: 83,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-ramadan-shield',
    badge: {
      name: 'Fasting Champion',
      icon: 'moon'
    },
    questionIds: [
      'q-g5-ire-u8-001',
      'q-g5-ire-u8-002',
      'q-g5-ire-u8-003',
      'q-g5-ire-u8-004',
      'q-g5-ire-u8-005',
      'q-g5-ire-u8-006',
      'q-g5-ire-u8-007',
      'q-g5-ire-u8-008',
      'q-g5-ire-u8-009',
      'q-g5-ire-u8-010',
      'q-g5-ire-u8-011',
      'q-g5-ire-u8-012'
    ]
  },
  {
    id: 'mission-g5-ire-u8-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u8',
    lessonId: 'lesson-g5-ire-u8-l2',
    title: 'Economic Justice and Zakat Recipients Challenge',
    description: 'Calculate Zakat al-Fitr staple food portions, examine the 2.5% rate of Zakat al-Maal, and master the eight rightful recipients mentioned in Surah At-Tawbah 60!',
    order: 84,
    orderIndex: 84,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-zakat-justice',
    badge: {
      name: 'Zakat Benefactor',
      icon: 'heart'
    },
    questionIds: [
      'q-g5-ire-u8-013',
      'q-g5-ire-u8-014',
      'q-g5-ire-u8-015',
      'q-g5-ire-u8-016',
      'q-g5-ire-u8-017',
      'q-g5-ire-u8-018',
      'q-g5-ire-u8-019',
      'q-g5-ire-u8-020',
      'q-g5-ire-u8-021',
      'q-g5-ire-u8-022',
      'q-g5-ire-u8-023',
      'q-g5-ire-u8-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 4 Questions (Units 7 & 8: 48 Questions total)
const questionsToAdd = [
  // --- Unit 7 Lesson 1: Purification and Dry Ablution (Tayammum) Quest (q-g5-ire-u7-001 to 012) ---
  {
    id: 'q-g5-ire-u7-001',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What are the three main classifications of physical impurities (Najasaat) in Islamic jurisprudence?',
    text: 'What are the three main classifications of physical impurities (Najasaat) in Islamic jurisprudence?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mukhaffafah (Light), Mutawassitah (Medium), and Mughalladhah (Heavy)',
      'Fard (Obligatory), Sunnah (Voluntary), and Makruh (Disliked)',
      'Halal (Permitted), Haram (Forbidden), and Mubah (Neutral)',
      'Sughra (Minor), Kubra (Major), and Wusta (Intermediate)'
    ],
    correctAnswer: 'Mukhaffafah (Light), Mutawassitah (Medium), and Mughalladhah (Heavy)',
    explanation: 'Islamic law classifies impurities into Mukhaffafah (light, e.g. unweaned boy\'s urine), Mutawassitah (medium, e.g. blood, feces, urine), and Mughalladhah (heavy, e.g. dog saliva, swine).',
    socraticHint: 'Which terms translate to Light, Medium, and Heavy physical impurities in Arabic jurisprudence?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-002',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Which of the following is an example of Najasah Mukhaffafah (Light Impurity)?',
    text: 'Which of the following is an example of Najasah Mukhaffafah (Light Impurity)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The urine of a male infant under two years old who consumes only breast milk',
      'The saliva of a dog that licks a cooking bowl',
      'Flowing blood from a deep wound',
      'Stagnant muddy rainwater on a footpath'
    ],
    correctAnswer: 'The urine of a male infant under two years old who consumes only breast milk',
    explanation: 'The urine of a nursing baby boy who has not yet begun eating solid food is classified as Mukhaffafah (light impurity), which can be cleansed by sprinkling water over it.',
    socraticHint: 'Think of an unweaned infant boy who feeds solely on his mother\'s milk.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-003',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How is a fabric contaminated with Najasah Mukhaffafah (light impurity) properly purified?',
    text: 'How is a fabric contaminated with Najasah Mukhaffafah (light impurity) properly purified?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By sprinkling clean water thoroughly over the contaminated spot until it is soaked',
      'By washing seven times with soil and detergent',
      'By cutting away and burning the affected piece of fabric',
      'By leaving it in direct sunlight for three days without water'
    ],
    correctAnswer: 'By sprinkling clean water thoroughly over the contaminated spot until it is soaked',
    explanation: 'The Sunnah instructs that for the urine of a male nursing baby, it is sufficient to sprinkle (rashsh) pure water thoroughly over the area until completely wet.',
    socraticHint: 'Does light impurity require extensive scrubbing or merely thorough sprinkling of water?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-004',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Which group of substances belongs to Najasah Mutawassitah (Medium Impurity)?',
    text: 'Which group of substances belongs to Najasah Mutawassitah (Medium Impurity)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Human urine, feces, pus, flowing blood, vomit, and unslaughtered dead animals (Maytah)',
      'Dog saliva and pig meat only',
      'River mud, sea salt, and plant sap',
      'Clean dust and sand from the garden'
    ],
    correctAnswer: 'Human urine, feces, pus, flowing blood, vomit, and unslaughtered dead animals (Maytah)',
    explanation: 'Standard bodily wastes and dead carcasses belong to Najasah Mutawassitah, which must be washed with clean water until color, smell, and residue are eradicated.',
    socraticHint: 'Which common bodily wastes and fluids require washing with water until trace and smell vanish?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-005',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How must an eating utensil licked by a dog (Najasah Mughalladhah) be cleansed according to the Prophet (SAW)?',
    text: 'How must an eating utensil licked by a dog (Najasah Mughalladhah) be cleansed according to the Prophet (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Washed seven times, one of which must be with clean soil/earth',
      'Washed once with warm river water',
      'Rinsed twice with scented perfume',
      'Wiped dry with a clean paper towel'
    ],
    correctAnswer: 'Washed seven times, one of which must be with clean soil/earth',
    explanation: 'The Prophet (SAW) taught: "When a dog drinks from the vessel of any of you, let him wash it seven times, the first [or one] of them with earth (soil)."',
    socraticHint: 'How many times must it be washed, and what natural substance must be included in one of the washings?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-006',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Under what circumstances is a Muslim permitted to perform Tayammum (dry ablution) instead of Wudhu with water?',
    text: 'Under what circumstances is a Muslim permitted to perform Tayammum (dry ablution) instead of Wudhu with water?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'When pure water is unavailable or when using water would cause or worsen severe illness or injury',
      'Whenever one feels lazy or in a hurry to catch a bus',
      'When the weather is slightly cloudy or breezy',
      'Whenever one is wearing clean leather shoes'
    ],
    correctAnswer: 'When pure water is unavailable or when using water would cause or worsen severe illness or injury',
    explanation: 'Tayammum is a divine concession valid only when water cannot be found despite searching, or when medical necessity (wounds/sickness) forbids water contact.',
    socraticHint: 'Is Tayammum permitted for mere convenience or only when water is legitimately absent or medically harmful?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-007',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What natural substance must be used to perform Tayammum according to the Holy Qur\'an (Surah An-Nisa 4:43)?',
    text: 'What natural substance must be used to perform Tayammum according to the Holy Qur\'an (Surah An-Nisa 4:43)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Clean earth, dust, or soil (Sa\'eedan Tayyiba)',
      'Flour or maize meal from the kitchen',
      'Wood ash or coal from the fire',
      'Powdered soap or washing detergent'
    ],
    correctAnswer: 'Clean earth, dust, or soil (Sa\'eedan Tayyiba)',
    explanation: 'Surah An-Nisa 4:43 commands: "Fatayammamu sa\'eedan tayyiba" ("take clean earth/soil and wipe your faces and hands"). It must be pure and free from contamination.',
    socraticHint: 'What pure earth substance provided by nature on the ground is used for dry ablution?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-008',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Which two parts of the body are wiped during the performance of Tayammum?',
    text: 'Which two parts of the body are wiped during the performance of Tayammum?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The face and both hands/arms',
      'The head and both feet',
      'The ears and the chest',
      'The knees and the neck'
    ],
    correctAnswer: 'The face and both hands/arms',
    explanation: 'The Quran specifies wiping the face and the hands in Tayammum: "Wipe with it your faces and your hands" (Surah Al-Ma\'idah 5:6).',
    socraticHint: 'Unlike regular Wudhu which includes feet and hair, which two parts are wiped in Tayammum?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-009',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What happens to a person\'s Tayammum if clean water becomes available before they begin their prayer?',
    text: 'What happens to a person\'s Tayammum if clean water becomes available before they begin their prayer?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Tayammum becomes invalid immediately and they must perform regular Wudhu with water',
      'They can continue praying with Tayammum for the next three days',
      'They must pay a financial fine before using the water',
      'The Tayammum remains valid until sunset'
    ],
    correctAnswer: 'The Tayammum becomes invalid immediately and they must perform regular Wudhu with water',
    explanation: 'The fundamental legal rule states: "Idha wujida al-ma\'u batala at-tayammum" ("When water is found, Tayammum is invalidated"). The person must make Wudhu with water.',
    socraticHint: 'Can dry ablution remain valid if the original reason for its use (lack of water) no longer exists?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-010',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Why should a person blow gently on their hands after striking the clean dust before wiping their face in Tayammum?',
    text: 'Why should a person blow gently on their hands after striking the clean dust before wiping their face in Tayammum?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To remove excess heavy dust and prevent dirt from soiling the eyes or face, following the Sunnah of the Prophet',
      'To warm up the hands before touching the skin',
      'To test which direction the wind is blowing',
      'To make a whistling sound that alerts others'
    ],
    correctAnswer: 'To remove excess heavy dust and prevent dirt from soiling the eyes or face, following the Sunnah of the Prophet',
    explanation: 'Blowing off excess dust ensures that Tayammum remains a clean, symbolic spiritual purification rather than smearing thick dirt on one\'s face.',
    socraticHint: 'How does blowing away heavy dust keep the face clean while fulfilling the spiritual ritual?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-011',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'In arid counties of Northern Kenya like Marsabit or Wajir during drought, why is the practice of Tayammum an important act of resource conservation?',
    text: 'In arid counties of Northern Kenya like Marsabit or Wajir during drought, why is the practice of Tayammum an important act of resource conservation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It preserves scarce potable water strictly for drinking and sustaining human and livestock life without neglecting prayer',
      'It makes people stop praying until the rainy season begins',
      'It replaces all drinking water with herbal teas',
      'It encourages wasting water on watering wild shrubs'
    ],
    correctAnswer: 'It preserves scarce potable water strictly for drinking and sustaining human and livestock life without neglecting prayer',
    explanation: 'Islamic law prioritizes saving lives (Hifdh an-Nafs); during severe water scarcity, water must be preserved for hydration of humans and animals while using Tayammum for Salah.',
    socraticHint: 'How does Tayammum allow worship to continue while saving every drop of drinking water for survival?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-012',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How does maintaining daily Taharah (cleanliness of clothes, body, and surroundings) benefit a learner\'s health in a Kenyan school?',
    text: 'How does maintaining daily Taharah (cleanliness of clothes, body, and surroundings) benefit a learner\'s health in a Kenyan school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It prevents waterborne and infectious bacterial diseases, promoting physical hygiene, dignity, and focused learning',
      'It guarantees that the learner will never need to study for exams',
      'It allows pupils to avoid eating school lunch',
      'It exempts learners from physical education classes'
    ],
    correctAnswer: 'It prevents waterborne and infectious bacterial diseases, promoting physical hygiene, dignity, and focused learning',
    explanation: 'Taharah combines spiritual devotion with proven preventive health practices, shielding pupils from infectious pathogens, parasites, and illness while fostering self-respect.',
    socraticHint: 'How does washing away impurities protect children from germs and illnesses in school?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },

  // --- Unit 7 Lesson 2: Sunnah Prayers and Heavenly Palaces Trial (q-g5-ire-u7-013 to 024) ---
  {
    id: 'q-g5-ire-u7-013',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What is the voluntary two-rak’ah prayer performed upon entering a mosque before sitting down called?',
    text: 'What is the voluntary two-rak’ah prayer performed upon entering a mosque before sitting down called?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Tahiyyat al-Masjid',
      'Salat al-Istikharah',
      'Salat al-Janazah',
      'Salat al-Khusuf'
    ],
    correctAnswer: 'Tahiyyat al-Masjid',
    explanation: 'Tahiyyat al-Masjid (Greeting the Mosque) is a highly recommended 2-rak\'ah Sunnah prayer performed immediately upon entering a mosque before taking a seat.',
    socraticHint: 'Which prayer literally means "Greeting of the Mosque"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-014',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'At what time of the day is Salat ad-Dhuha (the forenoon prayer) performed?',
    text: 'At what time of the day is Salat ad-Dhuha (the forenoon prayer) performed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Between after sunrise (when the sun has risen a spear’s length) and just before the zenith of Dhuhr',
      'Immediately at midnight before Fajr begins',
      'Between Asr and Maghrib as the sun sets',
      'Immediately after the Maghrib prayer'
    ],
    correctAnswer: 'Between after sunrise (when the sun has risen a spear’s length) and just before the zenith of Dhuhr',
    explanation: 'Salat ad-Dhuha is prayed in the mid-morning/forenoon after sunrise has fully passed until approximately 15 minutes before the Dhuhr prayer begins.',
    socraticHint: 'Think of the mid-morning hours when the sun has risen well above the horizon before midday.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-015',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'According to authentic Hadith, praying two rak’ahs of Salat ad-Dhuha fulfills daily charity (Sadaqah) on behalf of how many joints in the human body?',
    text: 'According to authentic Hadith, praying two rak’ahs of Salat ad-Dhuha fulfills daily charity (Sadaqah) on behalf of how many joints in the human body?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '360 joints',
      '100 joints',
      '50 joints',
      '206 joints'
    ],
    correctAnswer: '360 joints',
    explanation: 'Prophet Muhammad (SAW) taught in Sahih Muslim that there are 360 joints in the human frame requiring daily charitable thanksgiving, and two rak\'ahs of Dhuha suffices for all of them.',
    socraticHint: 'Look for the number 360 mentioned in prophetic biology regarding human joints.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-016',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How many total regular Sunnah rak’ahs (Sunan ar-Rawatib) attached to daily obligatory prayers did the Prophet (SAW) describe for building a palace in Paradise?',
    text: 'How many total regular Sunnah rak’ahs (Sunan ar-Rawatib) attached to daily obligatory prayers did the Prophet (SAW) describe for building a palace in Paradise?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '12 rak’ahs',
      '20 rak’ahs',
      '5 rak’ahs',
      '8 rak’ahs'
    ],
    correctAnswer: '12 rak’ahs',
    explanation: 'The Prophet (SAW) said in Sahih Muslim: "Whoever prays twelve rak\'ahs during the day and night, a house will be built for him in Paradise" (2 before Fajr, 4 before Dhuhr, 2 after Dhuhr, 2 after Maghrib, 2 after Isha).',
    socraticHint: 'Count: 2 + 4 + 2 + 2 + 2 = ?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-017',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How many Sunnah Mu’akkadah rak’ahs are prayed immediately before the obligatory Fajr prayer?',
    text: 'How many Sunnah Mu’akkadah rak’ahs are prayed immediately before the obligatory Fajr prayer?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '2 rak’ahs',
      '4 rak’ahs',
      '1 rak’ah',
      '6 rak’ahs'
    ],
    correctAnswer: '2 rak’ahs',
    explanation: 'The two Sunnah rak\'ahs before Salat al-Fajr are the most emphasized of all Sunnah prayers, described by the Prophet as better than the world and all it contains.',
    socraticHint: 'How many light rak\'ahs are offered after the Fajr Adhan and before the Iqamah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-018',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What special characteristic distinguishes Salat al-Witr from other night prayers?',
    text: 'What special characteristic distinguishes Salat al-Witr from other night prayers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is concluded with an odd number of rak’ahs (such as 1, 3, or 5) and includes Du’a al-Qunut',
      'It can only be prayed outdoors in the rain',
      'It must be prayed in total silence without reciting Surah Al-Fatihah',
      'It is performed while seated facing away from the Qiblah'
    ],
    correctAnswer: 'It is concluded with an odd number of rak’ahs (such as 1, 3, or 5) and includes Du’a al-Qunut',
    explanation: 'The word "Witr" means odd number; it is prayed after Isha and night prayers with an odd number of rak\'ahs, concluding with the special supplication called Du\'a al-Qunut.',
    socraticHint: 'What does the word "Witr" mean in Arabic arithmetic?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-019',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What is the special supplication recited standing in the final rak’ah of Salat al-Witr called?',
    text: 'What is the special supplication recited standing in the final rak’ah of Salat al-Witr called?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Du’a al-Qunut',
      'Du’a al-Iftitah',
      'At-Tahiyyat',
      'Sayyid al-Istighfar'
    ],
    correctAnswer: 'Du’a al-Qunut',
    explanation: 'Du\'a al-Qunut is the supplication of obedience and seeking divine guidance recited while standing in the last rak\'ah of Salat al-Witr.',
    socraticHint: 'Which special prayer begins with "Allahumma ihdini fiman hadayt"?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-020',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What did Prophet Muhammad (SAW) say about Allah’s love for odd numbers in relation to Salat al-Witr?',
    text: 'What did Prophet Muhammad (SAW) say about Allah’s love for odd numbers in relation to Salat al-Witr?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Indeed, Allah is One (Witr) and He loves that which is odd-numbered"',
      '"Allah prefers even numbers above all things"',
      '"Prayers should only be performed in multiples of four"',
      '"Numbers have no significance in worship"'
    ],
    correctAnswer: '"Indeed, Allah is One (Witr) and He loves that which is odd-numbered"',
    explanation: 'The Prophet (SAW) stated: "Inna Allaha witrun yuhibbul-witr, fa awtiru ya ahlal-Qur\'an" ("Indeed, Allah is One/Odd and loves that which is odd, so observe Witr, O people of the Qur\'an!").',
    socraticHint: 'How does the uniqueness and oneness of Allah relate to odd numbers in Witr prayer?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-021',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'Why is it recommended for a Muslim to perform Sunan ar-Rawatib prayers in their home rather than always in the mosque?',
    text: 'Why is it recommended for a Muslim to perform Sunan ar-Rawatib prayers in their home rather than always in the mosque?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To bring divine blessings, light, and peace into the home and model prayer for children and family members',
      'Because praying in the mosque is forbidden for voluntary prayers',
      'To avoid walking to the mosque during daylight',
      'Because homes have softer carpets than mosques'
    ],
    correctAnswer: 'To bring divine blessings, light, and peace into the home and model prayer for children and family members',
    explanation: 'The Prophet (SAW) encouraged praying voluntary prayers at home, stating: "Make some of your prayers in your homes and do not turn your homes into graves," filling houses with Barakah and pious examples.',
    socraticHint: 'How does praying voluntary prayers at home fill the household with divine light and teach younger siblings?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-022',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What primary role do voluntary Sunnah prayers play on the Day of Judgment when a servant\'s deeds are audited?',
    text: 'What primary role do voluntary Sunnah prayers play on the Day of Judgment when a servant\'s deeds are audited?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They compensate for and complete any flaws or omissions in the obligatory (Fard) prayers',
      'They cancel out all other pillars of Islam',
      'They allow a person to skip questioning in the grave',
      'They replace the need to fast during Ramadan'
    ],
    correctAnswer: 'They compensate for and complete any flaws or omissions in the obligatory (Fard) prayers',
    explanation: 'In Hadith Qudsi, Allah tells the angels: "Look and see if My servant has any voluntary prayers," using them to patch up and complete deficiencies in obligatory prayers.',
    socraticHint: 'How do extra voluntary good deeds help fill in gaps where obligatory prayers lacked focus or perfection?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-023',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'How does the regular performance of Salat ad-Dhuha help a Grade 5 Kenyan learner during morning school hours?',
    text: 'How does the regular performance of Salat ad-Dhuha help a Grade 5 Kenyan learner during morning school hours?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It cultivates spiritual focus, mindfulness, emotional calm, and a grateful attitude towards teachers and classmates',
      'It excuses the pupil from taking notes in class',
      'It allows the pupil to skip break-time games',
      'It gives the pupil permission to arrive late to school'
    ],
    correctAnswer: 'It cultivates spiritual focus, mindfulness, emotional calm, and a grateful attitude towards teachers and classmates',
    explanation: 'Taking a few mindful minutes in the forenoon for prayer instills tranquility, mental clarity, and gratitude, helping learners approach academic tasks with focus and patience.',
    socraticHint: 'How does a quiet morning prayer of gratitude recharge a student\'s emotional calm and focus?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },
  {
    id: 'q-g5-ire-u7-024',
    subStrandId: 'substrand-g5-ire-u7',
    prompt: 'What attitude should a Muslim child maintain if they miss a voluntary Sunnah prayer?',
    text: 'What attitude should a Muslim child maintain if they miss a voluntary Sunnah prayer?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Feel encouraged to do better next time without despair, while ensuring that all obligatory (Fard) prayers remain strictly fulfilled',
      'Give up on praying altogether',
      'Believe they are permanently condemned to punishment',
      'Blame their family members angrily'
    ],
    correctAnswer: 'Feel encouraged to do better next time without despair, while ensuring that all obligatory (Fard) prayers remain strictly fulfilled',
    explanation: 'Voluntary prayers are opportunities for extra reward and closeness to Allah without incurring sin if missed; learners maintain enthusiasm and steadfastness in Fard duties.',
    socraticHint: 'Is missing a voluntary prayer a punishable sin or an encouraging opportunity to strive better?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U7'
  },

  // --- Unit 8 Lesson 1: Ramadan Shield and Sawm Mastery Quest (q-g5-ire-u8-001 to 012) ---
  {
    id: 'q-g5-ire-u8-001',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'In which Surah and verse of the Holy Qur’an did Allah prescribe fasting during Ramadan for all believers to attain Taqwa?',
    text: 'In which Surah and verse of the Holy Qur’an did Allah prescribe fasting during Ramadan for all believers to attain Taqwa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Surah Al-Baqarah (2:183)',
      'Surah Al-Imran (3:100)',
      'Surah An-Nisa (4:59)',
      'Surah Al-Ma\'idah (5:3)'
    ],
    correctAnswer: 'Surah Al-Baqarah (2:183)',
    explanation: 'Surah Al-Baqarah 2:183 states: "O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain Taqwa (piety)."',
    socraticHint: 'Which foundational verse in the longest Surah of the Qur\'an begins with "Kutiba \'alaykumu as-siyam"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-002',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What are the two essential pillars (Arkan) of Sawm (fasting) in Islam?',
    text: 'What are the two essential pillars (Arkan) of Sawm (fasting) in Islam?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Niyyah (intention in the heart) and Imsak (abstaining from food, drink, and fast-breakers from dawn to sunset)',
      'Eating dates and drinking cold water at noon',
      'Wearing white clothes and sleeping through the afternoon',
      'Reciting the entire Qur’an in a single day'
    ],
    correctAnswer: 'Niyyah (intention in the heart) and Imsak (abstaining from food, drink, and fast-breakers from dawn to sunset)',
    explanation: 'The validity of fasting rests on two pillars: making the intention (Niyyah) before true dawn, and abstaining (Imsak) from all invalidators from Fajr until Maghrib.',
    socraticHint: 'Think of the internal intention in the heart and the outward refraining from dawn to sunset.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-003',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'When does the fasting period begin and end each day during Ramadan?',
    text: 'When does the fasting period begin and end each day during Ramadan?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Begins at true dawn (Adhan al-Fajr) and ends at sunset (Adhan al-Maghrib)',
      'Begins at sunrise and ends at midnight',
      'Begins at 8:00 AM and ends at 5:00 PM',
      'Begins at sunset and ends at dawn'
    ],
    correctAnswer: 'Begins at true dawn (Adhan al-Fajr) and ends at sunset (Adhan al-Maghrib)',
    explanation: 'Quran 2:187 instructs Muslims to eat and drink until the white thread of dawn becomes distinct from the black thread, then complete the fast until nightfall (sunset).',
    socraticHint: 'Which prayer calls mark the exact start at dawn and the breaking of fast at sunset?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-004',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What happens to the fast of a person who accidentally eats or drinks out of genuine forgetfulness while fasting?',
    text: 'What happens to the fast of a person who accidentally eats or drinks out of genuine forgetfulness while fasting?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Their fast remains completely valid; they should stop immediately upon remembering and continue fasting',
      'Their fast is broken and they must fast sixty consecutive days as penalty',
      'They must restart the entire month of Ramadan',
      'They must give away all their clothes to charity'
    ],
    correctAnswer: 'Their fast remains completely valid; they should stop immediately upon remembering and continue fasting',
    explanation: 'The Prophet (SAW) said in Sahih al-Bukhari: "Whoever forgets while he is fasting and eats or drinks, let him complete his fast, for it was Allah who fed him and gave him drink."',
    socraticHint: 'Does an unintentional, accidental action done out of forgetfulness break an act of worship in Islam?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-005',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'Which of the following actions deliberately breaks and invalidates the fast (Mubtilat as-Siyam)?',
    text: 'Which of the following actions deliberately breaks and invalidates the fast (Mubtilat as-Siyam)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Intentionally swallowing food or drink during daylight hours',
      'Brushing teeth with a Miswak stick without swallowing',
      'Taking a shower or pouring cool water over one’s head to relieve heat',
      'Smelling pleasant food aromas while walking through a market'
    ],
    correctAnswer: 'Intentionally swallowing food or drink during daylight hours',
    explanation: 'Deliberately ingesting any food, beverage, or medicine into the stomach invalidates the fast. Merely showering, using Miswak, or smelling food does not break it.',
    socraticHint: 'Which deliberate action involves putting nutritional sustenance into the stomach?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-006',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'Who among the following is legitimately exempted by Allah from fasting during Ramadan?',
    text: 'Who among the following is legitimately exempted by Allah from fasting during Ramadan?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A person traveling on a strenuous journey or someone who is acutely sick',
      'A student taking a regular mathematics quiz',
      'A shopkeeper working on a sunny day',
      'Anyone who feels thirsty at 10:00 AM'
    ],
    correctAnswer: 'A person traveling on a strenuous journey or someone who is acutely sick',
    explanation: 'Surah Al-Baqarah 2:185 explicitly permits the sick and travelers to break the fast and make up the missed days later (Qadha).',
    socraticHint: 'Which two categories of people experiencing hardship are mentioned directly in Surah Al-Baqarah 185?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-007',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the Islamic term for making up missed fasting days later in the year on a day-for-day basis?',
    text: 'What is the Islamic term for making up missed fasting days later in the year on a day-for-day basis?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Qadha',
      'Fidyah',
      'Kaffarah',
      'Nadhr'
    ],
    correctAnswer: 'Qadha',
    explanation: 'Qadha refers to making up missed obligatory acts of worship (like missed fasting days) after the designated time has passed.',
    socraticHint: 'Which Arabic term means to "make up" or compensate for an obligatory duty missed on its time?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-008',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What compensation is required from a chronically ill or permanently frail elderly person who cannot fast at all and cannot make up days later?',
    text: 'What compensation is required from a chronically ill or permanently frail elderly person who cannot fast at all and cannot make up days later?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Paying Fidyah: feeding a needy person a wholesome meal for each missed day',
      'Slaughtering a camel in Makkah',
      'Fasting twice as many days in the cold season',
      'They are penalized with imprisonment'
    ],
    correctAnswer: 'Paying Fidyah: feeding a needy person a wholesome meal for each missed day',
    explanation: 'Surah Al-Baqarah 2:184 establishes Fidyah: those who are permanently unable to fast due to chronic age or incurable illness feed an impoverished person for every day missed.',
    socraticHint: 'What charitable payment involves feeding one poor person for each day missed?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-009',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What pre-dawn meal is highly recommended (Sunnah) to eat before the fast begins?',
    text: 'What pre-dawn meal is highly recommended (Sunnah) to eat before the fast begins?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Suhur',
      'Iftar',
      'Walimah',
      'Aqiqah'
    ],
    correctAnswer: 'Suhur',
    explanation: 'Suhur is the blessed meal eaten before true dawn. The Prophet (SAW) advised: "Take Suhur, for indeed in Suhur there is blessing (Barakah)."',
    socraticHint: 'Which meal is eaten in the early hours before dawn to provide strength for the day ahead?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-010',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'With what food item did Prophet Muhammad (SAW) preferably break his fast (Iftar) at sunset?',
    text: 'With what food item did Prophet Muhammad (SAW) preferably break his fast (Iftar) at sunset?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Fresh or dry ripe dates (Rutab / Tamr) and water',
      'Roasted beef and heavy spices',
      'Sweet honey candy and cakes',
      'A bowl of salty soup'
    ],
    correctAnswer: 'Fresh or dry ripe dates (Rutab / Tamr) and water',
    explanation: 'The Sunnah of breaking the fast is to begin with ripe or dry dates, or sips of water if dates are unavailable, providing gentle, rapid glucose to the body.',
    socraticHint: 'What sweet desert fruit is traditionally eaten first when hearing the sunset Adhan?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-011',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What did the Prophet (SAW) teach about a person who fasts from food but does not abstain from lying, insulting, and cheating?',
    text: 'What did Prophet Muhammad (SAW) teach about a person who fasts from food but does not abstain from lying, insulting, and cheating?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Allah has no need for him to leave his food and drink"',
      '"His fast is double rewarded because it was difficult"',
      '"He should continue lying as long as he does not drink water"',
      '"His sins are automatically forgiven anyway"'
    ],
    correctAnswer: '"Allah has no need for him to leave his food and drink"',
    explanation: 'The Prophet (SAW) emphasized in Sahih al-Bukhari: "Whoever does not leave false speech and evil action, Allah has no need that he should leave his food and drink," proving fasting requires moral discipline.',
    socraticHint: 'Does fasting merely mean starving the stomach or guarding the tongue and actions from sin?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-012',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'How does fasting in Ramadan nurture empathy and social brotherhood among pupils in a Kenyan school?',
    text: 'How does fasting in Ramadan nurture empathy and social brotherhood among pupils in a Kenyan school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Experiencing temporary hunger helps pupils deeply appreciate Allah’s provisions and feel sincere compassion for impoverished people who lack food daily',
      'It causes pupils to compete over who eats the most food at Iftar',
      'It isolates Muslim pupils from interacting with classmates',
      'It teaches pupils that poor people do not need food assistance'
    ],
    correctAnswer: 'Experiencing temporary hunger helps pupils deeply appreciate Allah’s provisions and feel sincere compassion for impoverished people who lack food daily',
    explanation: 'Fasting breaks pride and physical comfort, letting every person feel real hunger so their hearts soften with active charity, compassion, and solidarity for the hungry and vulnerable in society.',
    socraticHint: 'How does feeling hunger firsthand make a person more compassionate toward hungry people in our country?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },

  // --- Unit 8 Lesson 2: Economic Justice and Zakat Recipients Challenge (q-g5-ire-u8-013 to 024) ---
  {
    id: 'q-g5-ire-u8-013',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the obligatory charity of staple food distributed before the Eid al-Fitr prayer called?',
    text: 'What is the obligatory charity of staple food distributed before the Eid al-Fitr prayer called?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Zakat al-Fitr',
      'Zakat al-Maal',
      'Sadaqah Jariyah',
      'Kaffarah'
    ],
    correctAnswer: 'Zakat al-Fitr',
    explanation: 'Zakat al-Fitr is the food charity mandated upon every Muslim (young, old, male, female) at the conclusion of Ramadan before the Eid prayer.',
    socraticHint: 'Which Zakat is specifically tied to the breaking of the fast of Ramadan (Fitr)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-014',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What measure of staple food (such as maize, wheat, or rice) is required per person for Zakat al-Fitr?',
    text: 'What measure of staple food (such as maize, wheat, or rice) is required per person for Zakat al-Fitr?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'One Sa\' (approximately 2.5 to 3 kilograms)',
      'Ten sacks of grain',
      'One small handful of grain',
      'Fifty kilograms of sugar'
    ],
    correctAnswer: 'One Sa\' (approximately 2.5 to 3 kilograms)',
    explanation: 'Prophet Muhammad (SAW) mandated one Sa\' (equal to four double-handfuls or mudd, roughly 2.5–3 kg) of the local staple food per person.',
    socraticHint: 'Which ancient Islamic volume measure equals roughly 2.5 to 3 kilograms of grain?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-015',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the primary objective of paying Zakat al-Fitr before the Eid prayer commences?',
    text: 'What is the primary objective of paying Zakat al-Fitr before the Eid prayer commences?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To ensure that poor and needy families have ample food to celebrate Eid with dignity and joy alongside everyone else',
      'To build new roads between cities',
      'To pay the salaries of government officials',
      'To decorate the prayer ground with colorful banners'
    ],
    correctAnswer: 'To ensure that poor and needy families have ample food to celebrate Eid with dignity and joy alongside everyone else',
    explanation: 'The Prophet stated that Zakat al-Fitr purifies the faster from idle speech and provides food for the needy so that no one goes hungry on the day of celebration.',
    socraticHint: 'Why is it essential that every poor family has food on the morning of Eid?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-016',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the standard percentage rate calculated on eligible savings and commercial wealth for Zakat al-Maal?',
    text: 'What is the standard percentage rate calculated on eligible savings and commercial wealth for Zakat al-Maal?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '2.5% (one-fortieth / 1/40)',
      '10% (one-tenth)',
      '50% (one-half)',
      '1% (one-hundredth)'
    ],
    correctAnswer: '2.5% (one-fortieth / 1/40)',
    explanation: 'Zakat al-Maal on monetary wealth, gold, silver, and business merchandise is set at 2.5% (or 1/40th) of qualifying surplus wealth held for one lunar year.',
    socraticHint: 'What percentage corresponds to 1 out of every 40 shillings saved?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-017',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the minimum threshold of wealth that must be possessed before Zakat al-Maal becomes obligatory called?',
    text: 'What is the minimum threshold of wealth that must be possessed before Zakat al-Maal becomes obligatory called?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Nisab',
      'Hawl',
      'Riba',
      'Ghanimah'
    ],
    correctAnswer: 'Nisab',
    explanation: 'Nisab is the minimum qualifying amount of wealth (traditionally equivalent to 85 grams of gold or 595 grams of silver) that obligates the payment of Zakat.',
    socraticHint: 'Which Arabic term describes the qualifying financial threshold for Zakat?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-018',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the condition that savings must be held for a full lunar year before paying Zakat called in Arabic?',
    text: 'What is the condition that savings must be held for a full lunar year before paying Zakat called in Arabic?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Hawl',
      'Nisab',
      'Taqwa',
      'Ihsan'
    ],
    correctAnswer: 'Hawl',
    explanation: 'Hawl refers to the completion of one full Islamic lunar year (approx. 354 days) of wealth remaining at or above the Nisab threshold.',
    socraticHint: 'Which term signifies the passage of one complete lunar year of possessing surplus wealth?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-019',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'How many rightful categories of recipients (Asnaf) of Zakat are specified by Allah in Surah At-Tawbah (9:60)?',
    text: 'How many rightful categories of recipients (Asnaf) of Zakat are specified by Allah in Surah At-Tawbah (9:60)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Eight categories',
      'Four categories',
      'Twelve categories',
      'Three categories'
    ],
    correctAnswer: 'Eight categories',
    explanation: 'Surah At-Tawbah verse 60 explicitly defines the eight groups entitled to receive Zakat: the poor, the needy, administrators, reconciled hearts, freeing slaves, debtors, in God’s path, and wayfarers.',
    socraticHint: 'Count the groups listed in Surah At-Tawbah verse 60.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-020',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'What is the difference between "Al-Fuqara" (the destitute poor) and "Al-Masakin" (the needy) among the Zakat recipients?',
    text: 'What is the difference between "Al-Fuqara" (the destitute poor) and "Al-Masakin" (the needy) among the Zakat recipients?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Al-Fuqara have virtually no income or property at all, while Al-Masakin have some income but it is insufficient to cover basic life necessities',
      'Al-Fuqara are elderly people, while Al-Masakin are young children',
      'Al-Fuqara live in cities, while Al-Masakin live in forests',
      'There is no difference; they mean exactly the same thing in every way'
    ],
    correctAnswer: 'Al-Fuqara have virtually no income or property at all, while Al-Masakin have some income but it is insufficient to cover basic life necessities',
    explanation: 'Scholars define Al-Faqir as someone possessing less than half of their basic survival needs, whereas Al-Miskin possesses half or more but still cannot meet full household living costs.',
    socraticHint: 'Who is more severely impoverished: someone with zero assets or someone with some earnings that fall short?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-021',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'Who are "Al-Gharimin" listed as eligible recipients of Zakat in Surah At-Tawbah (9:60)?',
    text: 'Who are "Al-Gharimin" listed as eligible recipients of Zakat in Surah At-Tawbah (9:60)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'People burdened by heavy, legitimate debts incurred through necessity that they cannot repay',
      'Wealthy business owners buying luxury cars',
      'Foreign tourists visiting wildlife parks',
      'Professional athletes who lost a game'
    ],
    correctAnswer: 'People burdened by heavy, legitimate debts incurred through necessity that they cannot repay',
    explanation: 'Al-Gharimin are individuals overwhelmed by crushing debts taken for legitimate needs (e.g. emergency medical bills, basic survival, or community reconciliation) unable to settle them.',
    socraticHint: 'Which category refers to people trapped under overwhelming debts?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-022',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'Who is "Ibn as-Sabil" among the eight rightful recipients of Zakat?',
    text: 'Who is "Ibn as-Sabil" among the eight rightful recipients of Zakat?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A traveler stranded away from home without money or means to return, even if they have assets in their home country',
      'A child who refuses to attend school',
      'A person building a palace',
      'An owner of large herds of camels'
    ],
    correctAnswer: 'A traveler stranded away from home without money or means to return, even if they have assets in their home country',
    explanation: 'Ibn as-Sabil (the wayfarer / son of the road) is a traveler stranded without financial means, who is helped from Zakat funds to reach safety and home.',
    socraticHint: 'Which phrase literally means "son of the road" and describes a stranded traveler in need of help?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-023',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'If a Kenyan Muslim trader has 100,000 Kenyan Shillings in qualifying savings that have completed a full year above Nisab, how much Zakat al-Maal is due?',
    text: 'If a Kenyan Muslim trader has 100,000 Kenyan Shillings in qualifying savings that have completed a full year above Nisab, how much Zakat al-Maal is due?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '2,500 Kenyan Shillings (2.5% of 100,000 KES)',
      '10,000 Kenyan Shillings (10%)',
      '500 Kenyan Shillings (0.5%)',
      '25,000 Kenyan Shillings (25%)'
    ],
    correctAnswer: '2,500 Kenyan Shillings (2.5% of 100,000 KES)',
    explanation: 'To calculate 2.5% of 100,000 KES: 100,000 * 0.025 = 2,500 KES (or 100,000 divided by 40 = 2,500 KES).',
    socraticHint: 'Calculate 2.5% of 100,000 by dividing 100,000 by 40.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  },
  {
    id: 'q-g5-ire-u8-024',
    subStrandId: 'substrand-g5-ire-u8',
    prompt: 'How does systematic collection and distribution of Zakat foster social peace and cohesion across Kenyan counties?',
    text: 'How does systematic collection and distribution of Zakat foster social peace and cohesion across Kenyan counties?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It narrows the gap between rich and poor, reduces desperate poverty and theft, and builds compassionate community solidarity',
      'It causes inflation and discourages hard work in agriculture',
      'It creates disputes over money and divides families',
      'It forces wealthy people to leave the country'
    ],
    correctAnswer: 'It narrows the gap between rich and poor, reduces desperate poverty and theft, and builds compassionate community solidarity',
    explanation: 'Zakat prevents the dangerous concentration of wealth among the elite (Surah Al-Hashr 59:7), elevating the destitute, restoring dignity, and creating a harmonious and peaceful society in Kenya.',
    socraticHint: 'How does sharing wealth with the needy reduce crime, remove bitterness, and strengthen national brotherhood?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U8'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 4 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
