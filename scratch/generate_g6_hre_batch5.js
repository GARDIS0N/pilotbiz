/**
 * Grade 6 Hindu Religious Education (HRE) - Batch 5 Generator
 * Content: Units 9 & 10 (Sacred Festivals & Spiritual Symbolism; Sewa, Interfaith Harmony & Nation Building in Kenya)
 * Missions: Orders 165, 166, 167, 168 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-hre-u9-001 to q-g6-hre-u10-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 HRE Batch 5 (Units 9 & 10) ---');

// 1. Units 9 & 10 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-hre-u9',
    strandId: 'strand-g6-hre-festivals',
    learningAreaId: 'la-hre-g6',
    title: 'Sacred Festivals: Diwali, Annakut, Holi, Navratri & Spiritual Symbolism',
    name: 'Sacred Festivals: Diwali, Annakut, Holi, Navratri & Spiritual Symbolism',
    description: 'The profound spiritual symbolism, historical narratives, and communal celebrations of major Hindu festivals: Diwali (Deepavali - the festival of lights): lighting earthen clay lamps (Diyas) to symbolize the inner light of knowledge dispelling the darkness of ignorance, celebrating Lord Rama’s return to Ayodhya, and Lakshmi Puja for spiritual and ethical prosperity; Annakut (Govardhan Puja): offering a mountain of food in gratitude to nature and communal sharing without waste; Holi (Festival of Colors): the historical devotion of child devotee Prahlada, the burning of demoness Holika (Holika Dahan) signifying the triumph of sincere faith over demonic arrogance, welcoming spring renewal and social equality; Navratri and Vijayadashami (Dussehra): honoring the nine aspects of Divine Mother Durga (Shakti), the vanquishing of the buffalo demon Mahishasura representing conquest over inner vices (lust, anger, greed), and burning effigies of Ravana commemorating the eternal triumph of Dharma.',
    cbeCompetency: 'Cultural literacy, festive appreciation, symbolic interpretation, and moral triumph',
    estimatedMinutes: 30,
    order: 9,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-hre-u10',
    strandId: 'strand-g6-hre-festivals',
    learningAreaId: 'la-hre-g6',
    title: 'Sewa (Selfless Service), Inter-religious Harmony & Kenyan Nation Building',
    name: 'Sewa (Selfless Service), Inter-religious Harmony & Kenyan Nation Building',
    description: 'Living the sacred spiritual values of Hindu philosophy in modern civic and community life: The transformative ethic of Sewa (selfless community service) anchored in the dictum "Nara Sewa Narayana Sewa" (Service to humanity is worship of God); practical philanthropic institutions in Kenya (free eye cataracts surgeries, blood donation drives, dialysis centers, drought relief distributions, and school scholarship bursaries); promoting inter-religious dialogue and peaceful coexistence with Christian, Muslim, and indigenous Kenyan communities; civic responsibility, anti-corruption, environmental conservation, obeying the rule of law, and active patriotic contribution to Kenya’s national vision.',
    cbeCompetency: 'Civic responsibility, philanthropy, interfaith collaboration, and patriotic leadership',
    estimatedMinutes: 30,
    order: 10,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-hre-u9-l1',
    subStrandId: 'substrand-g6-hre-u9',
    title: 'Diwali & Annakut: Triumph of Light over Darkness and Gratitude',
    content: 'Diwali (Deepavali) is the festival of lights, celebrated across five joyful days in the Hindu month of Kartika.\n\n1. Deepavali (Row of Lamps):\n- Commemorates the return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile and defeating Ravana. The citizens of Ayodhya illuminated the entire kingdom with little clay lamps (Diyas) filled with oil.\n- Spiritual Meaning: The outer flame of the Diya reminds us to kindle the inner lamp of wisdom, love, and compassion to banish the darkness of jealousy, hatred, and ignorance.\n\n2. Lakshmi Puja & New Beginnings:\n- Families clean homes, decorate doorsteps with colorful Rangoli geometric patterns, and pray to Goddess Lakshmi and Lord Ganesha for auspicious beginnings and pure wealth (Dharma-based Artha).\n- Commercial ledgers (Chopda Pujan) are sanctified with the invocation of truth and honesty.\n\n3. Annakut (Govardhan Puja):\n- Celebrated on the day following Diwali, commemorating Lord Krishna lifting Govardhan Hill with his little finger to shield the villagers of Vrindavan from torrential storms.\n- Devotees prepare and display an "Annakut" (a mountain of vegetarian delicacies, fruits, grains, and sweets) in gratitude to Mother Earth and agricultural nature.\n- The food is subsequently shared as blessed Prasada with community members and given to charities, embodying food sharing and zero wastage.',
    didYouKnow: 'The clay Diya lamp has deep spiritual symbology: the clay represents the physical human body, the oil symbolizes our devotion and love, and the glowing flame represents the awakened divine soul!',
    kenyanContext: 'During Diwali in Nairobi, Kisumu, and Mombasa, Hindu charitable trusts share festive sweets and food hampers with children’s homes, hospitals, and informal settlements.',
    order: 17,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u9-l2',
    subStrandId: 'substrand-g6-hre-u9',
    title: 'Holi & Navratri: Triumph of Devotion & Divine Feminine Power',
    content: 'Holi and Navratri celebrate the eternal victory of pure devotion and cosmic righteousness over evil forces.\n\n1. Holi (The Festival of Colors & Spring Renewal):\n- Holika Dahan: Celebrated on the eve of Holi by lighting bonfires. The young prince Prahlada remained steadfast in his devotion to Lord Vishnu despite the tyranny of his cruel father, King Hiranyakashipu. When Prahlada’s wicked aunt Holika sat in a fire with him wearing a fire-proof shawl, the shawl miraculously flew over Prahlada, protecting him, while evil Holika was consumed.\n- Dhulandi (Playing with Colors): On the main day, people smear colorful powders (Gulal) on each other, embracing warmly, forgiving past grudges, and celebrating the arrival of spring. Social and economic distinctions dissolve in a sea of shared laughter.\n\n2. Navratri & Vijayadashami (Dussehra):\n- Navratri spans nine nights dedicated to the worship of Goddess Durga / Shakti in her nine divine forms (Navadurga).\n- The Goddess fought the shape-shifting demon Mahishasura for nine nights and vanquished him on the tenth day, symbolizing the eradication of stubborn vices (ego, anger, greed) through focused spiritual discipline.\n- Vijayadashami commemorates both Durga’s triumph and Lord Rama’s victory over Ravana. Massive effigies of Ravana are burned, reminding humanity that righteousness (Dharma) is permanently victorious.',
    didYouKnow: 'The nine forms of Goddess Durga (Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri) trace the progressive awakening of spiritual strength within a seeker!',
    kenyanContext: 'Kenyan families celebrate Navratri with joyful traditional folk dances (Garba and Dandiya Raas), inviting friends of all backgrounds to participate in cultural unity.',
    order: 18,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u10-l1',
    subStrandId: 'substrand-g6-hre-u10',
    title: 'Nara Sewa Narayana Sewa: Selfless Philanthropy & Healthcare in Kenya',
    content: 'In Hindu ethics, selfless service (Sewa) is not merely a social courtesy, but a direct pathway to God-realization.\n\n1. The Philosophy of Nara Sewa Narayana Sewa:\n- "Nara" means human being, "Narayana" means God, and "Sewa" means selfless service.\n- The principle teaches: "Service to humanity is worship of the Divine." Because Paramatma resides within all souls as the Antaryamin, relieving the pain of another person is direct service to God Himself.\n\n2. Characteristics of True Sewa:\n- Performed Nishkama—without seeking publicity, fame, applause, or monetary reward.\n- Done with deep humility, respecting the dignity of the recipient.\n\n3. Practical Sewa Institutions in Kenya:\n- Free Eye Camps: Performing thousands of free cataract surgeries restoring sight to elderly citizens across rural Kenya.\n- Blood Donation Drives: Mobilizing donors during national emergencies in partnership with the Kenya National Blood Transfusion Service.\n- Dialysis & Medical Clinics: Establishing non-profit medical facilities (like MP Shah Hospital and Lions Eye Hospital) offering accessible healthcare.\n- Education & School Feeding: Sponsoring bursaries and distributing learning materials and hot meals in drought-hit regions.',
    didYouKnow: 'Swami Vivekananda declared: "They alone live who live for others, the rest are more dead than alive!", inspiring modern global Sewa movements!',
    kenyanContext: 'Organizations like the Hindu Council of Kenya, Sewa International Kenya, and community trusts routinely partner with local county governments to deliver relief during floods and droughts.',
    order: 19,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u10-l2',
    subStrandId: 'substrand-g6-hre-u10',
    title: 'Interfaith Harmony, Civic Responsibility & Patriotic Nation Building',
    content: 'A true Hindu is called to be an active, ethical, and patriotic contributor to their homeland.\n\n1. Inter-Religious Harmony (Sarva Dharma Sambhava):\n- The Vedic teaching that all righteous spiritual paths lead to the same Divine Reality ("Sarva Dharma Sambhava" - equal respect for all religions).\n- Actively collaborating with Christian, Muslim, and indigenous Kenyan leaders within the Inter-Religious Council of Kenya (IRCK) to promote national peace, cohesion, and conflict resolution.\n\n2. Civic Duties and Rule of Law:\n- Obeying traffic laws, paying rightful taxes, safeguarding public property, and rejecting bribery and corruption are religious and ethical duties.\n- Respecting the diversity of Kenya’s 47 counties and rejecting all forms of tribalism and negative ethnicity.\n\n3. Environmental and Social Nation Building:\n- Planting trees to increase Kenya’s forest cover toward national climate goals.\n- Volunteering in community clean-ups and mentoring younger students.\n- Contributing to economic growth through honest entrepreneurship, industrial manufacturing, and job creation.',
    didYouKnow: 'The Kenyan Constitution of 2010 opens with gratitude to Almighty God of all creation and celebrates cultural, ethnic, and religious diversity as our greatest national strength!',
    kenyanContext: 'Kenyan Hindu youth proudly identify as patriotic Kenyans, singing the National Anthem with fervor and dedicating their education to building a just and prosperous Kenya.',
    order: 20,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 165, 166, 167, 168 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-hre-u9-m1',
    worldId: 'world-faith-values',
    title: 'Mission 165: Festival of Radiance – Diwali, Lakshmi Puja & Annakut',
    description: 'Kindle the inner lamp of wisdom during Diwali, understand Rama’s return, worship Lakshmi for ethical wealth, and explore the generous food sharing of Annakut.',
    order: 165,
    orderIndex: 165,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-diwali-annakut',
    badge: 'badge-g6-hre-diwali-annakut',
    lessonId: 'lesson-g6-hre-u9-l1',
    questionIds: [
      'q-g6-hre-u9-001', 'q-g6-hre-u9-002', 'q-g6-hre-u9-003', 'q-g6-hre-u9-004',
      'q-g6-hre-u9-005', 'q-g6-hre-u9-006', 'q-g6-hre-u9-007', 'q-g6-hre-u9-008',
      'q-g6-hre-u9-009', 'q-g6-hre-u9-010', 'q-g6-hre-u9-011', 'q-g6-hre-u9-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u9-m2',
    worldId: 'world-faith-values',
    title: 'Mission 166: Colors and Courage – Prahlada’s Faith, Holi & Navratri Shakti',
    description: 'Celebrate Prahlada’s unyielding faith at Holi, embrace spring colors of equality, and honor the nine nights of Divine Mother Durga conquering inner vices.',
    order: 166,
    orderIndex: 166,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-holi-navratri',
    badge: 'badge-g6-hre-holi-navratri',
    lessonId: 'lesson-g6-hre-u9-l2',
    questionIds: [
      'q-g6-hre-u9-013', 'q-g6-hre-u9-014', 'q-g6-hre-u9-015', 'q-g6-hre-u9-016',
      'q-g6-hre-u9-017', 'q-g6-hre-u9-018', 'q-g6-hre-u9-019', 'q-g6-hre-u9-020',
      'q-g6-hre-u9-021', 'q-g6-hre-u9-022', 'q-g6-hre-u9-023', 'q-g6-hre-u9-024'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u10-m1',
    worldId: 'world-faith-values',
    title: 'Mission 167: Hands of Compassion – Nara Sewa Narayana Sewa in Kenya',
    description: 'Internalize service to humanity as worship of God, explore free eye clinics, blood drives, and educational bursaries transforming lives across Kenya.',
    order: 167,
    orderIndex: 167,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-nara-sewa',
    badge: 'badge-g6-hre-nara-sewa',
    lessonId: 'lesson-g6-hre-u10-l1',
    questionIds: [
      'q-g6-hre-u10-001', 'q-g6-hre-u10-002', 'q-g6-hre-u10-003', 'q-g6-hre-u10-004',
      'q-g6-hre-u10-005', 'q-g6-hre-u10-006', 'q-g6-hre-u10-007', 'q-g6-hre-u10-008',
      'q-g6-hre-u10-009', 'q-g6-hre-u10-010', 'q-g6-hre-u10-011', 'q-g6-hre-u10-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u10-m2',
    worldId: 'world-faith-values',
    title: 'Mission 168: Patriots of Peace – Interfaith Unity & Building Kenya',
    description: 'Promote Sarva Dharma Sambhava, collaborate across diverse faiths for peace, uphold the rule of law, and dedicate your talents to a flourishing Kenya.',
    order: 168,
    orderIndex: 168,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-kenya-patriot',
    badge: 'badge-g6-hre-kenya-patriot',
    lessonId: 'lesson-g6-hre-u10-l2',
    questionIds: [
      'q-g6-hre-u10-013', 'q-g6-hre-u10-014', 'q-g6-hre-u10-015', 'q-g6-hre-u10-016',
      'q-g6-hre-u10-017', 'q-g6-hre-u10-018', 'q-g6-hre-u10-019', 'q-g6-hre-u10-020',
      'q-g6-hre-u10-021', 'q-g6-hre-u10-022', 'q-g6-hre-u10-023', 'q-g6-hre-u10-024'
    ],
    learningAreaId: 'la-hre-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 9 Questions (q-g6-hre-u9-001 to q-g6-hre-u9-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u9-001',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What does the word "Deepavali" (Diwali) literally mean in Sanskrit?',
    options: ['A row or array of clay lamps', 'A mountain of sweets', 'A festival of colored water', 'A royal war march'],
    correctAnswer: 'A row or array of clay lamps',
    explanation: '"Deepa" means oil lamp, and "Avali" means row or series; Deepavali translates directly as a continuous row of illuminated lamps.',
    socraticHint: 'Break down "Deepa" (lamp) and "Avali" (row or series).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-002',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What major historical event in the Ramayana is commemorated by the lighting of lamps during Diwali?',
    options: [
      'Lord Rama’s triumphant return to Ayodhya after 14 years of exile and defeating Ravana',
      'Lord Rama’s departure into the forest',
      'The coronation of Sugriva in Kishkindha',
      'The construction of the bridge across the sea'
    ],
    correctAnswer: 'Lord Rama’s triumphant return to Ayodhya after 14 years of exile and defeating Ravana',
    explanation: 'The citizens of Ayodhya placed rows of illuminated oil lamps throughout the city to celebrate Rama, Sita, and Lakshmana’s return on the dark new moon night.',
    socraticHint: 'Which joyful return to Ayodhya dispelled the darkness of the city?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-003',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What spiritual truth is symbolized by kindling the flame of the earthen Diya during Diwali?',
    options: [
      'The inner light of wisdom, truth, and love dispelling the darkness of ignorance, hatred, and ego',
      'Testing the quality of clay pottery',
      'Heating the house during winter',
      'Decorating the roof for aesthetic beauty only'
    ],
    correctAnswer: 'The inner light of wisdom, truth, and love dispelling the darkness of ignorance, hatred, and ego',
    explanation: 'The flame represents the divine Atman within, illuminating the mind with knowledge, peace, and love while driving away negative emotions.',
    socraticHint: 'What spiritual darkness inside human hearts is conquered by the light of wisdom?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-004',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'Which Goddess is primarily worshiped on the main evening of Diwali for auspicious prosperity and spiritual grace?',
    options: ['Goddess Lakshmi', 'Goddess Kali', 'Goddess Saraswati', 'Goddess Ganga'],
    correctAnswer: 'Goddess Lakshmi',
    explanation: 'Lakshmi Puja is performed on Diwali evening to invite auspiciousness, ethical prosperity, generosity, and peace into homes and businesses.',
    socraticHint: 'Which Goddess of wealth, grace, and light is honored during Diwali night?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-005',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What are the colorful geometric designs drawn on floors and entryways during Diwali called?',
    options: ['Rangoli (Kolam)', 'Mandala', 'Warli', 'Madhubani'],
    correctAnswer: 'Rangoli (Kolam)',
    explanation: 'Rangoli is decorative floor art created with colored powders, rice flour, and flower petals to welcome positive spiritual vibrations and guests warmly.',
    socraticHint: 'Identify the colorful welcoming floor designs made with powders and petals.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-006',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What does the festival of Annakut (Govardhan Puja), celebrated immediately after Diwali, commemorate?',
    options: [
      'Lord Krishna lifting Govardhan Hill to protect the people and animals of Vrindavan from torrential storms',
      'The creation of the Himalayas by Brahma',
      'The harvest of wheat in Ayodhya',
      'The building of Dwarka city'
    ],
    correctAnswer: 'Lord Krishna lifting Govardhan Hill to protect the people and animals of Vrindavan from torrential storms',
    explanation: 'Krishna lifted Govardhan Hill on his little finger for seven days, teaching people to honor nature, forests, and cows rather than appeasing thunder gods.',
    socraticHint: 'Which hill did young Krishna lift on his little finger to shelter the community from torrential rain?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-007',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What does the word "Annakut" literally mean?',
    options: ['A mountain of food offered in gratitude', 'A river of gold', 'A garden of flowers', 'A storm of fire'],
    correctAnswer: 'A mountain of food offered in gratitude',
    explanation: '"Anna" means grains/food and "Kuta" means mountain or heap; Annakut is a magnificent mountain of vegetarian dishes offered in thanksgiving to God.',
    socraticHint: 'Break down "Anna" (food/grain) and "Kut" (mountain/heap).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-008',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What happens to the vast array of food offered during Annakut in temples across Kenya?',
    options: [
      'It is shared as blessed Prasada with the entire congregation, visitors, and distributed to children’s homes and shelters',
      'It is thrown into the ocean',
      'It is locked in a vault for ten years',
      'It is sold at high auction prices to wealthy merchants only'
    ],
    correctAnswer: 'It is shared as blessed Prasada with the entire congregation, visitors, and distributed to children’s homes and shelters',
    explanation: 'Annakut exemplifies zero food waste and community philanthropy; the offered food is lovingly shared with all people, feeding hundreds of families.',
    socraticHint: 'How does sharing Annakut as blessed Prasada serve community feeding and eliminate food waste?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-009',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'Why do Hindu business owners sanctify their account books during Diwali (Chopda Pujan)?',
    options: [
      'To pledge integrity, honest dealings, accurate accounting, and fair business practices before God',
      'To celebrate avoiding paying taxes',
      'To erase all debts owed to poor workers',
      'To hide their profits from the public'
    ],
    correctAnswer: 'To pledge integrity, honest dealings, accurate accounting, and fair business practices before God',
    explanation: 'Chopda Pujan dedicates commerce to Dharma, reminding entrepreneurs that financial gain must be earned through transparency, fair trade, and honesty.',
    socraticHint: 'How does blessing financial books instill a moral commitment to business integrity?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-010',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What sweet practice of gift-giving during Diwali strengthens social harmony across Kenya?',
    options: [
      'Sharing festive sweets (Mithai) and visiting neighbors, friends, and coworkers of all diverse faiths',
      'Sending bills and debt demands to relatives',
      'Refusing to speak with people of different religions',
      'Closing gates and turning off house lights'
    ],
    correctAnswer: 'Sharing festive sweets (Mithai) and visiting neighbors, friends, and coworkers of all diverse faiths',
    explanation: 'Distributing sweets and festive greetings builds bridges of friendship, goodwill, and warmth across Kenya’s multicultural society.',
    socraticHint: 'How does sharing sweets with neighbors of different backgrounds cultivate community bonding?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-011',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'What day of the Diwali festival celebrates the sacred bond of mutual love, protection, and respect between brothers and sisters?',
    options: ['Bhai Dooj (Yama Dwitiya)', 'Dhanteras', 'Naraka Chaturdashi', 'Govardhan Puja'],
    correctAnswer: 'Bhai Dooj (Yama Dwitiya)',
    explanation: 'Bhai Dooj, celebrated on the fifth day of Diwali, honors sibling affection; sisters pray for their brothers’ long life and brothers pledge protection and gifts.',
    socraticHint: 'Which festival day honors the bond between brothers (Bhai) and sisters?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-012',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l1',
    text: 'How can Kenyan learners celebrate Diwali in an environmentally friendly and safe manner?',
    options: [
      'By lighting eco-friendly oil lamps, using organic Rangoli colors, and avoiding noisy smoke-polluting firecrackers',
      'By throwing loud firecrackers near frightened pets and hospitals',
      'By burning plastic bags in bonfires',
      'By cutting down neighborhood trees to make lamp stands'
    ],
    correctAnswer: 'By lighting eco-friendly oil lamps, using organic Rangoli colors, and avoiding noisy smoke-polluting firecrackers',
    explanation: 'A Green Diwali honors nature (Prakriti) by prioritizing the gentle radiance of clay lamps, organic flower rangolis, and protecting pets from loud firecracker distress.',
    socraticHint: 'How does celebrating without noisy fireworks protect air quality and domestic animals?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u9-013',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'Who was the devoted child prince whose unwavering faith in Lord Vishnu inspired the celebration of Holi?',
    options: ['Prahlada', 'Dhruva', 'Nachiketa', 'Bharata'],
    correctAnswer: 'Prahlada',
    explanation: 'Prince Prahlada remained completely steadfast in chanting Lord Narayana’s name, surviving his cruel father’s assassination attempts through divine protection.',
    socraticHint: 'Identify the young saintly son of King Hiranyakashipu.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-014',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What historical bonfire ritual on the eve of Holi commemorates the burning of the wicked demoness and the survival of young Prahlada?',
    options: ['Holika Dahan', 'Lohri', 'Agnihotra', 'Deepotsava'],
    correctAnswer: 'Holika Dahan',
    explanation: 'Holika Dahan involves lighting a bonfire on the full moon eve of Phalguna, celebrating the destruction of demoness Holika and the triumphant protection of Prahlada.',
    socraticHint: 'Which bonfire ritual bears the name of the demoness who was consumed by fire?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-015',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What social barrier is powerfully dismantled when people play with colors (Gulal) during the festival of Holi?',
    options: [
      'Social hierarchies, wealth divisions, and caste barriers are dissolved in shared joy and equality',
      'Language differences become impossible to understand',
      'Sports competitions are permanently canceled',
      'People stop going to work forever'
    ],
    correctAnswer: 'Social hierarchies, wealth divisions, and caste barriers are dissolved in shared joy and equality',
    explanation: 'When everyone is joyfully painted in colorful powders, distinctions of rich and poor, high and low vanish, reinforcing universal human brotherhood.',
    socraticHint: 'How does smearing colors on everyone create a level playing field of joyful equality?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-016',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'How many nights are dedicated to worshiping the Divine Mother (Durga / Shakti) during Navratri?',
    options: ['Nine nights', 'Seven nights', 'Twelve nights', 'Forty nights'],
    correctAnswer: 'Nine nights',
    explanation: '"Nava" means nine, and "Ratri" means nights; Navratri consists of nine sacred nights dedicated to honoring the Divine Feminine in her nine manifestations.',
    socraticHint: 'Translate the Sanskrit word "Nava" in Navratri.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-017',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'Which shape-shifting buffalo demon was vanquished by Goddess Durga after nine nights of battle, restoring peace to the cosmos?',
    options: ['Mahishasura', 'Ravana', 'Kumbhakarna', 'Bhasmasura'],
    correctAnswer: 'Mahishasura',
    explanation: 'Mahishasura ("Mahisha" = buffalo demon) represented stubborn ignorance, brutality, and arrogance; Durga vanquished him as Mahishasuramardini.',
    socraticHint: 'Which buffalo demon was defeated by Goddess Durga?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-018',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What do the ten days of Dussehra (Vijayadashami) and the burning of Ravana’s effigy represent?',
    options: [
      'The burning of the ten negative heads/vices of human ego (lust, anger, greed, delusion, pride, jealousy, etc.) and victory of Dharma',
      'The end of the agricultural harvest only',
      'A fireworks manufacturing demonstration',
      'A celebration of ancient weapon designs'
    ],
    correctAnswer: 'The burning of the ten negative heads/vices of human ego (lust, anger, greed, delusion, pride, jealousy, etc.) and victory of Dharma',
    explanation: 'Ravana’s ten heads symbolize ten internal vices of human ego; burning the effigy on Dussehra symbolizes our commitment to conquer inner weaknesses.',
    socraticHint: 'What do the ten heads of Ravana symbolize regarding internal human vices?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-019',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What vibrant community circular folk dance is danced with clapping or sticks (Dandiya) during the nine nights of Navratri?',
    options: ['Garba and Dandiya Raas', 'Kathak', 'Bharatanatyam', 'Bhangra'],
    correctAnswer: 'Garba and Dandiya Raas',
    explanation: 'Garba is performed in joyful concentric circles around an illuminated lamp (Garbha Deepa) representing the universe circling around the Divine Mother.',
    socraticHint: 'Which rhythmic circle dance with sticks or clapping is celebrated during Navratri nights?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-020',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What does the perforated clay pot holding a lamp at the center of the Garba circle symbolize?',
    options: [
      'The human body containing the immortal divine soul (Atman) shining inside',
      'A container for storing cooking oil',
      'An ancient water purification filter',
      'A musical drum'
    ],
    correctAnswer: 'The human body containing the immortal divine soul (Atman) shining inside',
    explanation: 'The "Garbha Deepa" (lamp inside a perforated earthen pot) represents the human body bearing the divine light of the soul within its womb/center.',
    socraticHint: 'How does a lamp shining through holes in a clay pot represent the soul inside the body?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-021',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What important moral value does the story of Prahlada and Holika teach about peer pressure and standing up for truth?',
    options: [
      'Never compromise your moral principles and faith even if everyone around you, including powerful authorities, demands otherwise',
      'Always follow the crowd even when they do wrong',
      'Never disagree with people who have more money',
      'Hide your beliefs and pretend to agree with wickedness'
    ],
    correctAnswer: 'Never compromise your moral principles and faith even if everyone around you, including powerful authorities, demands otherwise',
    explanation: 'Young Prahlada stood with immense courage for righteousness against the entire kingdom, showing that moral courage protects the soul.',
    socraticHint: 'How does Prahlada inspire youth to resist corrupt peer pressure?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-022',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'Why do Hindus observe Ayudha Puja (worship of tools and vehicles) on the ninth day of Navratri?',
    options: [
      'To express gratitude for tools, computers, pens, and books that help us earn an honest living and serve society',
      'To show off mechanical weapons for war',
      'To sell used tools at discount prices',
      'Because machines do not need cleaning'
    ],
    correctAnswer: 'To express gratitude for tools, computers, pens, and books that help us earn an honest living and serve society',
    explanation: 'Ayudha Puja sanctifies the instruments of daily labor—pens, laptops, sewing machines, surgical tools, and cars—reminding workers to use them for righteous purposes.',
    socraticHint: 'Why do students clean and bless their books and pens during Navratri?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-023',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'What is the tenth day concluding the Navratri festival, known as the Day of Victory, called?',
    options: ['Vijayadashami (Dussehra)', 'Maha Shivaratri', 'Janmashtami', 'Guru Purnima'],
    correctAnswer: 'Vijayadashami (Dussehra)',
    explanation: '"Vijaya" means victory, and "Dashami" means tenth day; Vijayadashami celebrates the supreme triumph of good over evil across the cosmos.',
    socraticHint: 'Translate "Vijaya" (victory) and "Dashami" (tenth day).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u9-024',
    subStrandId: 'substrand-g6-hre-u9',
    lessonId: 'lesson-g6-hre-u9-l2',
    text: 'How do festival celebrations like Holi and Diwali contribute to national cohesion in Kenya?',
    options: [
      'They invite Kenyans of all ethnic and religious backgrounds to share food, music, and joyful cultural exchange, fostering mutual respect',
      'They separate towns into barricaded linguistic zones',
      'They cause price inflation in supermarkets',
      'They prevent people from greeting each other'
    ],
    correctAnswer: 'They invite Kenyans of all ethnic and religious backgrounds to share food, music, and joyful cultural exchange, fostering mutual respect',
    explanation: 'Sharing festive meals, welcoming friends to cultural events, and engaging in charity strengthen social cohesion across Kenya’s diverse communities.',
    socraticHint: 'How does multicultural celebration build national friendship and tolerance?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // --- Unit 10 Questions (q-g6-hre-u10-001 to q-g6-hre-u10-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u10-001',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What is the core spiritual meaning of the ancient adage "Nara Sewa Narayana Sewa"?',
    options: [
      'Service to humanity is worship of God',
      'Only kings are worthy of receiving service',
      'Service should only be done for financial payment',
      'Humans should worship their own ego'
    ],
    correctAnswer: 'Service to humanity is worship of God',
    explanation: 'Because the Divine dwells within every human being (Nara), serving suffering, needy humanity with compassion is direct worship of the Supreme Lord (Narayana).',
    socraticHint: 'Translate "Nara" (human) and "Narayana" (the Lord God) in the context of Sewa.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-002',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What essential attitude must accompany true Sewa according to Hindu ethics?',
    options: [
      'Humility, selfless intention (Nishkama), and respect for the dignity of the recipient without boasting',
      'Demanding media cameras and applause before helping',
      'Making fun of the person receiving assistance',
      'Expecting a commercial business contract in return'
    ],
    correctAnswer: 'Humility, selfless intention (Nishkama), and respect for the dignity of the recipient without boasting',
    explanation: 'Sewa must be performed with pure humility and gratitude for the opportunity to serve, never out of arrogance or condescending pity.',
    socraticHint: 'Should service be done for personal boasting or with quiet, loving humility?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-003',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What major philanthropic medical service is frequently sponsored by Hindu charitable organizations across rural and urban Kenya?',
    options: [
      'Free cataract eye surgeries restoring sight to elderly citizens',
      'Selling expensive imported cosmetics',
      'Running cosmetic surgery pageants',
      'Importing luxury sports cars'
    ],
    correctAnswer: 'Free cataract eye surgeries restoring sight to elderly citizens',
    explanation: 'Eye camps (such as those organized by Lions Eye Hospital and community trusts) perform thousands of free cataract surgeries, restoring vision and livelihood to vulnerable Kenyans.',
    socraticHint: 'Which medical intervention gives back the gift of sight through free surgeries?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-004',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What great Hindu reformer proclaimed: "They alone live who live for others, the rest are more dead than alive!"?',
    options: ['Swami Vivekananda', 'Chanakya', 'Aryabhata', 'Kalidasa'],
    correctAnswer: 'Swami Vivekananda',
    explanation: 'Swami Vivekananda inspired millions to turn spiritual philosophy into active humanitarian service, founding the Ramakrishna Mission for medical, educational, and disaster relief.',
    socraticHint: 'Identify the dynamic monk who spoke at the 1893 Parliament of Religions and founded the Ramakrishna Mission.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-005',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'How do Hindu welfare trusts partner with the Kenya National Blood Transfusion Service during hospital crises?',
    options: [
      'By organizing massive community blood donation drives in temples and community halls to save lives',
      'By selling artificial plastic blood',
      'By refusing to donate blood to strangers',
      'By keeping blood supplies private'
    ],
    correctAnswer: 'By organizing massive community blood donation drives in temples and community halls to save lives',
    explanation: 'Blood donation is revered as "Rakta Daan" (the supreme gift of life); Hindu welfare groups regularly mobilize hundreds of voluntary blood donors across Kenya.',
    socraticHint: 'How does voluntary blood donation save accident victims and surgical patients?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-006',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What form of educational Sewa helps needy Kenyan children from underprivileged backgrounds complete their primary and secondary education?',
    options: [
      'Providing academic scholarships, school uniforms, textbooks, and hot daily lunch programs',
      'Increasing tuition fees for poor students',
      'Locking school libraries on weekends',
      'Confiscating revision books from struggling learners'
    ],
    correctAnswer: 'Providing academic scholarships, school uniforms, textbooks, and hot daily lunch programs',
    explanation: 'Educational charities (Vidya Daan) remove barriers to learning by financing bursaries, uniforms, and meals so vulnerable Kenyan children stay in school.',
    socraticHint: 'What charitable educational support empowers students from low-income homes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-007',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What major non-profit community hospital in Nairobi was established through Hindu philanthropic contributions to serve all Kenyans regardless of race or religion?',
    options: ['MP Shah Hospital', 'Kenyatta National Hospital', 'Nairobi West Hospital', 'Aga Khan Hospital'],
    correctAnswer: 'MP Shah Hospital',
    explanation: 'MP Shah Hospital (Megji Pethraj Shah Hospital) in Parklands was founded as a non-profit philanthropic medical institution to provide high-quality care to all Kenyans.',
    socraticHint: 'Which prominent charitable hospital in Parklands bears the name of philanthropist MP Shah?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-008',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What is "Anna Daan" in the tradition of Hindu philanthropy?',
    options: [
      'The sacred charity of providing wholesome, free food to the hungry and destitute',
      'The donation of physical land for farming',
      'The sharing of clothing during winter',
      'The teaching of musical instruments'
    ],
    correctAnswer: 'The sacred charity of providing wholesome, free food to the hungry and destitute',
    explanation: 'Anna Daan (food donation) is considered Mahadaan (the greatest gift), because satisfying hunger brings immediate relief and vitality to living beings.',
    socraticHint: 'Which Sanskrit term combines "Anna" (food) and "Daan" (charity)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-009',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'How did Kenyan Hindu humanitarian groups respond when severe droughts hit Turkana, Wajir, and Garissa counties?',
    options: [
      'By trucking thousands of tons of maize, beans, cooking oil, and drilling community clean water boreholes',
      'By closing their doors and ignoring the crisis',
      'By selling food at triple price to starving communities',
      'By telling residents to move away permanently'
    ],
    correctAnswer: 'By trucking thousands of tons of maize, beans, cooking oil, and drilling community clean water boreholes',
    explanation: 'Through emergency drought relief appeals, Hindu humanitarian trusts partnered with local authorities to deliver emergency food convoys and drill sustainable boreholes.',
    socraticHint: 'How does practical humanitarian action deliver food convoys and boreholes to drought regions?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-010',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What did Mahatma Gandhi identify as the supreme test of a society’s moral progress?',
    options: [
      '"The greatness of a nation and its moral progress can be judged by the way its animals and most vulnerable are treated"',
      '"The number of skyscrapers in its capital city"',
      '"The total size of its gold reserves"',
      '"The strength of its military battleships"'
    ],
    correctAnswer: '"The greatness of a nation and its moral progress can be judged by the way its animals and most vulnerable are treated"',
    explanation: 'Gandhi emphasized that true civilization is measured not by wealth or weapons, but by compassion toward the helpless, voiceless, and vulnerable.',
    socraticHint: 'How does Gandhi measure a society’s moral stature through its treatment of the vulnerable?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-011',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'How can a Grade 6 learner practice the spirit of Nara Sewa in their daily school life?',
    options: [
      'By tutoring a classmate who finds reading difficult, sharing lunch with someone who forgot theirs, and cleaning shared desks',
      'By hiding their notebooks so others cannot learn',
      'By demanding money before answering a friend’s question',
      'By laughing when another student trips on the playground'
    ],
    correctAnswer: 'By tutoring a classmate who finds reading difficult, sharing lunch with someone who forgot theirs, and cleaning shared desks',
    explanation: 'Sewa begins with small, tender acts of everyday helpfulness—sharing resources, encouraging struggling peers, and keeping classrooms tidy.',
    socraticHint: 'What everyday acts of kindness and peer mentorship embody student service?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-012',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l1',
    text: 'What does the Sanskrit term "Gupt Daan" (secret charity) mean, and why is it praised?',
    options: [
      'Giving charity in complete secrecy without cameras or personal publicity, preserving the dignity of the recipient and purity of intention',
      'Donating stolen property in secret',
      'Hiding money inside mattress cushions',
      'Refusing to tell one’s parents about school fees'
    ],
    correctAnswer: 'Giving charity in complete secrecy without cameras or personal publicity, preserving the dignity of the recipient and purity of intention',
    explanation: 'Gupt Daan ensures that charity is offered purely for God’s sake, protecting the beneficiary from feeling embarrassed or humiliated.',
    socraticHint: 'Why is anonymous giving without publicity considered spiritually superior?',
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
    id: 'q-g6-hre-u10-013',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What does the philosophical principle of "Sarva Dharma Sambhava" teach regarding diverse religions?',
    options: [
      'Equal respect and reverence for all righteous religious paths leading to the one Supreme Truth',
      'That only one specific religion is true and all others are false',
      'That all religious books should be discarded',
      'That people must change their religion every five years'
    ],
    correctAnswer: 'Equal respect and reverence for all righteous religious paths leading to the one Supreme Truth',
    explanation: '"Sarva Dharma Sambhava" recognizes that different faiths are distinct paths climbing the same mountain of Divine Truth, cultivating interfaith harmony.',
    socraticHint: 'Which principle affirms equal respect for all genuine spiritual traditions?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-014',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What prominent national body unites leaders of Hindu, Christian, and Muslim communities in Kenya for peace advocacy and dialogue?',
    options: [
      'The Inter-Religious Council of Kenya (IRCK)',
      'The Kenya Revenue Authority (KRA)',
      'The Law Society of Kenya (LSK)',
      'The Kenya Commercial Bank (KCB)'
    ],
    correctAnswer: 'The Inter-Religious Council of Kenya (IRCK)',
    explanation: 'The Inter-Religious Council of Kenya brings together religious leaders from all major faiths to resolve national conflicts, protect children, and foster national cohesion.',
    socraticHint: 'Identify the multi-faith council that coordinates religious harmony in Kenya.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-015',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What is the umbrella organization representing Hindu temples and community associations across Kenya?',
    options: ['The Hindu Council of Kenya (HCK)', 'The East African Parliament', 'The Asian Business Club', 'The Vedic Study Union'],
    correctAnswer: 'The Hindu Council of Kenya (HCK)',
    explanation: 'The Hindu Council of Kenya is the apex representative body coordinating religious, educational, charitable, and civic initiatives of the Hindu community in Kenya.',
    socraticHint: 'Which apex council represents Hindu welfare and educational interests in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-016',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'How does Hindu philosophy view a citizen’s obligation toward national civic laws and anti-corruption regulations in Kenya?',
    options: [
      'Obeying just laws, paying taxes honestly, and rejecting bribes are sacred duties of Dharma (Rajadharma and Nagarik Dharma)',
      'Civic laws only apply when police officers are watching',
      'Citizens are encouraged to practice tax evasion',
      'Bribery is considered acceptable if it speeds up paper approvals'
    ],
    correctAnswer: 'Obeying just laws, paying taxes honestly, and rejecting bribes are sacred duties of Dharma (Rajadharma and Nagarik Dharma)',
    explanation: 'Dharma encompasses civic righteousness (Nagarik Dharma): cheating on taxes, paying bribes, or breaking traffic laws violates the moral order and harms society.',
    socraticHint: 'How does civic duty (Nagarik Dharma) align with following national laws and honesty?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-017',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'How does a Kenyan Hindu youth demonstrate genuine patriotism and love for their motherland, Kenya?',
    options: [
      'By singing the National Anthem with pride, serving fellow citizens selflessly, and dedicating their skills to national progress',
      'By treating people of other ethnic groups with suspicion',
      'By vandalizing public railway stations and street lamps',
      'By refusing to participate in national holidays'
    ],
    correctAnswer: 'By singing the National Anthem with pride, serving fellow citizens selflessly, and dedicating their skills to national progress',
    explanation: 'Patriotism is expressed through civic contribution, academic excellence, mutual respect across all 47 counties, and safeguarding public infrastructure.',
    socraticHint: 'What positive civic behaviors show pride and dedicated contribution to Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-018',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What ancient Sanskrit motto, meaning "Mother and Motherland are superior even to heaven", was uttered by Lord Rama in the Ramayana?',
    options: [
      '"Janani Janmabhumishcha Swargadapi Gariyasi"',
      '"Satyam Eva Jayate Nanritam"',
      '"Ahimsa Paramo Dharmah"',
      '"Dharmo Rakshati Rakshitah"'
    ],
    correctAnswer: '"Janani Janmabhumishcha Swargadapi Gariyasi"',
    explanation: 'When Lakshmana marvelled at the golden palaces of conquered Lanka, Rama replied: "Even though Lanka is made of gold, it does not attract me; for Mother and Motherland are higher than heaven itself!"',
    socraticHint: 'Which quote proclaims that one’s mother and homeland are greater than celestial paradise?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-019',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'How does the Hindu value of Ahimsa (non-violence) contribute to peace during national general elections in Kenya?',
    options: [
      'It inspires citizens to vote peacefully, reject hate speech, resist incitement to violence, and respect differing political viewpoints',
      'It encourages stone-throwing during campaign rallies',
      'It tells youth to join violent street gangs',
      'It asks citizens to boycott voting completely'
    ],
    correctAnswer: 'It inspires citizens to vote peacefully, reject hate speech, resist incitement to violence, and respect differing political viewpoints',
    explanation: 'Ahimsa promotes peaceful dialogue, tolerance of political diversity, and absolute rejection of electoral violence and ethnic incitement.',
    socraticHint: 'How does non-violence protect national unity and prevent electoral clashes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-020',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What crucial economic role has the Kenyan Hindu diaspora historically played in nation building across Kenya?',
    options: [
      'Pioneering manufacturing industries, commercial distribution, retail trade, agricultural value addition, and creating thousands of jobs',
      'Operating exclusively in foreign banking overseas',
      'Avoiding all trade and investment in Kenya',
      'Refusing to build schools and hospitals in Kenya'
    ],
    correctAnswer: 'Pioneering manufacturing industries, commercial distribution, retail trade, agricultural value addition, and creating thousands of jobs',
    explanation: 'From early railway construction to modern manufacturing, agro-processing, pharmaceuticals, and retail, the community has partnered in building Kenya’s robust economy.',
    socraticHint: 'How does investing in factories, schools, and business create jobs and development for Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-021',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'How should a student respond when hearing hateful stereotypes or tribal slurs directed against a classmate of another community?',
    options: [
      'Firmly speak up for fairness, defend their classmate, and promote mutual understanding and respect',
      'Join in the teasing and laugh loudly',
      'Record a video and share it on social media to humiliate them further',
      'Pretend not to hear and ignore their pain'
    ],
    correctAnswer: 'Firmly speak up for fairness, defend their classmate, and promote mutual understanding and respect',
    explanation: 'Standing against prejudice embodies both Ahimsa and Satya, protecting school harmony and reflecting the national values of the Kenyan Constitution.',
    socraticHint: 'What courageous action stops bullying and negative ethnic stereotypes in school?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-022',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What national tree-planting initiative in Kenya connects directly with the Hindu Vedic ideal of Vriksharopana (sacred tree planting)?',
    options: [
      'The National Tree Growing Day and government campaigns to plant 15 billion trees by 2032',
      'The National Mining Conference',
      'The Mombasa Port Dredging Project',
      'The Highway Expansion Drive'
    ],
    correctAnswer: 'The National Tree Growing Day and government campaigns to plant 15 billion trees by 2032',
    explanation: 'Kenya’s 15 billion tree initiative resonates with the Vedic duty of nurturing trees, uniting spiritual eco-values with national conservation targets.',
    socraticHint: 'Which national environmental drive aims to green Kenya with billions of trees?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-023',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What does the Rig Vedic prayer "Ano bhadrah kratavo yantu vishwatah" (1.89.1) teach about intellectual openness and learning?',
    options: [
      '"Let noble thoughts come to us from every direction of the universe"',
      '"Only read books written in our native language"',
      '"Reject all ideas that come from other cultures"',
      '"Only listen to advice from wealthy relatives"'
    ],
    correctAnswer: '"Let noble thoughts come to us from every direction of the universe"',
    explanation: 'This famous Rig Vedic prayer champions open-mindedness, encouraging learners to embrace truth, science, and wisdom wherever they originate in the world.',
    socraticHint: 'Which verse welcomes noble and wise thoughts from all corners of creation?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u10-024',
    subStrandId: 'substrand-g6-hre-u10',
    lessonId: 'lesson-g6-hre-u10-l2',
    text: 'What is the highest vision of an exemplary Grade 6 CBE graduate in Hindu Religious Education?',
    options: [
      'A principled, compassionate learner grounded in moral virtues (Dharma), practicing selfless service (Sewa), and actively building a united, peaceful Kenya',
      'A student who only cares about scoring marks without caring about character or integrity',
      'An individual who isolates themselves from society',
      'A person who uses religion to look down upon others'
    ],
    correctAnswer: 'A principled, compassionate learner grounded in moral virtues (Dharma), practicing selfless service (Sewa), and actively building a united, peaceful Kenya',
    explanation: 'The KICD CBE curriculum nurtures holistic citizens who embody ethical discernment, emotional balance, environmental care, and patriotic leadership.',
    socraticHint: 'What holistic blend of virtue, service, character, and patriotism defines the ideal graduate?',
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
console.log(`Added ${qCount} questions for Units 9 & 10.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 5 of Grade 6 HRE to cbe_database.json!');
