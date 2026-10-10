/**
 * Grade 6 Hindu Religious Education (HRE) - Batch 3 Generator
 * Content: Units 5 & 6 (Vedic Mantras & Universal Prayers; The Five Niyamas of Character Building)
 * Missions: Orders 157, 158, 159, 160 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-hre-u5-001 to q-g6-hre-u6-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 HRE Batch 3 (Units 5 & 6) ---');

// 1. Units 5 & 6 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-hre-u5',
    strandId: 'strand-g6-hre-scriptures',
    learningAreaId: 'la-hre-g6',
    title: 'Sacred Vedic Mantras & Prayers: Mahamrityunjaya, Pavamana & Shanti Mantras',
    name: 'Sacred Vedic Mantras & Prayers: Mahamrityunjaya, Pavamana & Shanti Mantras',
    description: 'The transformative power of sacred Sanskrit sound vibrations (Vedic Mantras) for mental clarity, spiritual upliftment, and universal peace: The Mahamrityunjaya Mantra from the Rig Veda (7.59.12) dedicated to Tryambaka (Lord Shiva) for healing, inner resilience, and release from spiritual bondage; the profound Pavamana Abhyaroha Mantra from the Brihadaranyaka Upanishad (1.3.28) petitioning guidance from untruth to Truth, darkness to Light, and mortality to Immortality; the cosmic Shanti Mantras invoking threefold peace (Adhyatmika, Adhibhautika, Adhidevika) for the sky, space, earth, waters, herbs, and all beings; chanting universal benedictions ("Sarve bhavantu sukhinah") promoting health, happiness, and freedom from grief across all creation.',
    cbeCompetency: 'Mantra literacy, phonetics, spiritual mindfulness, universal empathy, and peacemaking',
    estimatedMinutes: 30,
    order: 5,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-hre-u6',
    strandId: 'strand-g6-hre-virtues',
    learningAreaId: 'la-hre-g6',
    title: 'The Five Niyamas: Personal Observances for Character & Self-Purification',
    name: 'The Five Niyamas: Personal Observances for Character & Self-Purification',
    description: 'The second limb of Patanjali’s classical Ashtanga Yoga: The Five Niyamas (internal disciplines and positive habits for personal self-mastery): 1) Shaucha (purity of body, clean diet, mental hygiene, freedom from hateful thoughts); 2) Santosha (contentment with what one has, celebrating others’ blessings, resisting peer-driven materialism); 3) Tapas (perseverance, spiritual fortitude, enduring hardships joyfully to achieve worthy goals in studies and athletics); 4) Svadhyaya (daily self-reflection, regular reading of noble inspiring scriptures, self-audit of conscience); 5) Ishvara Pranidhana (surrendering egoistic pride and dedicating all fruits of labor to God); applying the Niyamas to build integrity, resilience, and emotional balance.',
    cbeCompetency: 'Self-discipline, emotional intelligence, moral introspection, and resilience',
    estimatedMinutes: 30,
    order: 6,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-hre-u5-l1',
    subStrandId: 'substrand-g6-hre-u5',
    title: 'Sacred Mantras: The Mahamrityunjaya Mantra & Pavamana Prayer',
    content: 'In Hindu tradition, Mantras are sacred sound formulas charged with spiritual energy that purify the mind and awaken the soul.\n\n1. The Mahamrityunjaya Mantra (Rig Veda 7.59.12):\n- Text:\n  "Aum Tryambakam yajamahe sugandhim pushtivardhanam;\n   Urvarukamiva bandhanan mrityor mukshiya maamritat."\n- Meaning: "We worship the Three-Eyed Lord (Shiva), fragrant and nourishing all beings. Just as a ripe melon naturally separates from its vine, may we be liberated from death and worldly bondage, and not from immortality."\n- Significance: Chanted for health, healing of diseases, mental tranquility, and conquering the fear of mortality.\n\n2. The Pavamana Mantra (Brihadaranyaka Upanishad 1.3.28):\n- Text:\n  "Aum Asato ma sadgamaya;\n   Tamaso ma jyotirgamaya;\n   Mrityor ma amritam gamaya.\n   Aum shanti shanti shantihi."\n- Three Divine Petitions:\n  a) "Lead me from the unreal / untruth (Asat) to the real / Truth (Sat)."\n  b) "Lead me from darkness / ignorance (Tamas) to light / wisdom (Jyoti)."\n  c) "Lead me from death / transience (Mrityu) to immortality / liberation (Amrita)."\n- It is the universal prayer of all humanity seeking illumination and truth.',
    didYouKnow: 'The metaphor in the Mahamrityunjaya compares spiritual liberation to a ripe cucumber or melon detaching gently and effortlessly from its creeper without pain or struggle!',
    kenyanContext: 'Kenyan learners recite the Pavamana Mantra during morning assembly interfaith prayers, seeking divine guidance from ignorance to wisdom in their academic studies.',
    order: 9,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u5-l2',
    subStrandId: 'substrand-g6-hre-u5',
    title: 'Shanti Mantras: Cosmic Peace Benedictions & Universal Well-Being',
    content: 'Hindu prayers conclude with the invocation of peace (Shanti), recognizing that spiritual progress requires harmony with nature and society.\n\n1. Why Three "Shantihi"?\n- Chanting "Shanti" three times addresses the three sources of human suffering (Tapatraya):\n  * Adhyatmika: Internal suffering arising from our own mind and body (illness, stress, grief).\n  * Adhibhautika: External suffering caused by other living beings (accidents, pests, unkind words).\n  * Adhidevika: Environmental suffering caused by natural forces (droughts, floods, lightning, earthquakes).\n\n2. The Vedic Peace Prayer (Shanti Patha - Shukla Yajur Veda 36.17):\n- "Dyauha shantihi, Antariksham shantihi, Prithivi shantihi, Apah shantihi, Oshadhayah shantihi, Vanaspatayah shantihi..."\n- Praying for peace in the heavens, in the sky, upon the earth, in the waters, within herbs, trees, divine beings, and everywhere in the cosmos.\n\n3. Universal Prayer for All Beings (Sarve Bhavantu):\n- "Sarve bhavantu sukhinah, Sarve santu niramayah;\n   Sarve bhadrani pashyantu, Ma kashchid duhkha-bhagbhavet."\n- Meaning: "May all beings be happy; May all beings be free from illness; May all perceive auspiciousness; May no one suffer anywhere."\n- Shows that Hinduism prays not just for oneself or one’s family, but for the welfare of all living creation.',
    didYouKnow: 'The Vedic Shanti Patha recognizes plants (Oshadhi) and forest trees (Vanaspatayah) as living members of the cosmic family deserving peace and protection!',
    kenyanContext: 'The universal wish for all beings to be free from suffering inspires Kenyan Hindu youth to engage in medical camps and food distribution for drought-affected regions.',
    order: 10,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u6-l1',
    subStrandId: 'substrand-g6-hre-u6',
    title: 'The Niyamas (Part 1): Shaucha (Purity), Santosha (Contentment) & Tapas',
    content: 'While Yamas teach social ethics, the Five Niyamas of Sage Patanjali outline personal habits for self-purification and inner strength.\n\n1. Shaucha (Cleanliness and Purity):\n- Bahya Shaucha (External purity): Bathing daily, wearing clean clothes, washing hands, keeping bedrooms and classrooms organized, and eating pure, wholesome food (Sattvic diet).\n- Abhyantara Shaucha (Internal purity): Cleansing the mind of jealousy, hatred, greed, and spite through noble thoughts, positive self-talk, and prayer.\n\n2. Santosha (Contentment):\n- Being joyful and thankful for what one has, rather than constantly complaining or coveting others’ possessions.\n- Contentment does NOT mean laziness; it means doing your best without being poisoned by bitter jealousy when classmates have newer shoes or gadgets.\n\n3. Tapas (Perseverance and Self-Discipline):\n- The burning determination to endure hardships and resist immediate temptations to accomplish noble goals.\n- Examples: Waking up early to revise difficult math concepts, staying focused when distracted by phones, or training persistently for school athletics.\n- Like gold refined by fire, Tapas strengthens character and builds iron willpower.',
    didYouKnow: 'Mahatma Gandhi practiced Tapas through simple living and strict truthfulness, demonstrating how personal self-discipline can move nations peacefully!',
    kenyanContext: 'Kenyan learners practice Shaucha by keeping school grounds clean and disposing of plastics properly, and Santosha by appreciating their families’ honest provisions.',
    order: 11,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u6-l2',
    subStrandId: 'substrand-g6-hre-u6',
    title: 'The Niyamas (Part 2): Svadhyaya (Self-Study) & Ishvara Pranidhana (Surrender)',
    content: 'The final two Niyamas complete the path of spiritual maturation and inner peace.\n\n1. Svadhyaya (Self-Study and Introspection):\n- "Sva" (self) + "Adhyaya" (study/inquiry).\n- First aspect: Daily reading and contemplating sacred scriptures (such as the Bhagavad Gita, Ramayana, Upanishads) and uplifting biographies of great role models.\n- Second aspect: Looking inward like a mirror (self-audit)—asking at the end of each day: "Did I speak truthfully today? Did I hurt anyone? How can I improve my character tomorrow?"\n- Svadhyaya keeps us honest with ourselves and sharpens our moral compass.\n\n2. Ishvara Pranidhana (Surrender and Devotion to God):\n- Acknowledging that our talents, intellect, and breaths are gifts from Paramatma, not causes for foolish arrogance.\n- Dedicating all our daily actions, studies, and service as offerings to God, and accepting whatever results come with peace of mind (Prasada Buddhi).\n- It eliminates arrogance (Ahankara) when we succeed, and removes despair when we face setbacks.\n\n3. Harmonizing the Five Niyamas:\n- A learner practicing Shaucha, Santosha, Tapas, Svadhyaya, and Ishvara Pranidhana develops radiant character, emotional resilience, and lifelong integrity.',
    didYouKnow: 'Sage Patanjali’s Yoga Sutras state that from practicing Santosha (contentment), supreme unexcelled happiness (Anuttamah Sukhalabhah) is attained!',
    kenyanContext: 'Practicing Svadhyaya helps Kenyan students review their study habits honestly, while Ishvara Pranidhana keeps them humble when receiving academic awards.',
    order: 12,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 157, 158, 159, 160 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-hre-u5-m1',
    worldId: 'world-faith-values',
    title: 'Mission 157: Chants of Light – Mahamrityunjaya & Pavamana Prayers',
    description: 'Chant and reflect on the healing vibrations of the Mahamrityunjaya Mantra and petition divine guidance from darkness to light with the Pavamana prayer.',
    order: 157,
    orderIndex: 157,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-sacred-mantras',
    badge: 'badge-g6-hre-sacred-mantras',
    lessonId: 'lesson-g6-hre-u5-l1',
    questionIds: [
      'q-g6-hre-u5-001', 'q-g6-hre-u5-002', 'q-g6-hre-u5-003', 'q-g6-hre-u5-004',
      'q-g6-hre-u5-005', 'q-g6-hre-u5-006', 'q-g6-hre-u5-007', 'q-g6-hre-u5-008',
      'q-g6-hre-u5-009', 'q-g6-hre-u5-010', 'q-g6-hre-u5-011', 'q-g6-hre-u5-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u5-m2',
    worldId: 'world-faith-values',
    title: 'Mission 158: Triple Peace – The Shanti Patha & Sarve Bhavantu',
    description: 'Understand the three dimensions of Shanti, pray for cosmic harmony across nature and water, and embrace the universal well-being of all creation.',
    order: 158,
    orderIndex: 158,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-shanti-peace',
    badge: 'badge-g6-hre-shanti-peace',
    lessonId: 'lesson-g6-hre-u5-l2',
    questionIds: [
      'q-g6-hre-u5-013', 'q-g6-hre-u5-014', 'q-g6-hre-u5-015', 'q-g6-hre-u5-016',
      'q-g6-hre-u5-017', 'q-g6-hre-u5-018', 'q-g6-hre-u5-019', 'q-g6-hre-u5-020',
      'q-g6-hre-u5-021', 'q-g6-hre-u5-022', 'q-g6-hre-u5-023', 'q-g6-hre-u5-024'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u6-m1',
    worldId: 'world-faith-values',
    title: 'Mission 159: Pillars of Self-Mastery – Shaucha, Santosha & Tapas',
    description: 'Master external and internal purity (Shaucha), celebrate contented joy (Santosha), and build unbreakable fortitude and study discipline through Tapas.',
    order: 159,
    orderIndex: 159,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-niyama-purity',
    badge: 'badge-g6-hre-niyama-purity',
    lessonId: 'lesson-g6-hre-u6-l1',
    questionIds: [
      'q-g6-hre-u6-001', 'q-g6-hre-u6-002', 'q-g6-hre-u6-003', 'q-g6-hre-u6-004',
      'q-g6-hre-u6-005', 'q-g6-hre-u6-006', 'q-g6-hre-u6-007', 'q-g6-hre-u6-008',
      'q-g6-hre-u6-009', 'q-g6-hre-u6-010', 'q-g6-hre-u6-011', 'q-g6-hre-u6-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u6-m2',
    worldId: 'world-faith-values',
    title: 'Mission 160: Mirror of the Soul – Svadhyaya & Ishvara Pranidhana',
    description: 'Cultivate honest daily introspection through Svadhyaya, dissolve egoism by dedicating work to God, and embody balanced Yogic living.',
    order: 160,
    orderIndex: 160,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-niyama-surrender',
    badge: 'badge-g6-hre-niyama-surrender',
    lessonId: 'lesson-g6-hre-u6-l2',
    questionIds: [
      'q-g6-hre-u6-013', 'q-g6-hre-u6-014', 'q-g6-hre-u6-015', 'q-g6-hre-u6-016',
      'q-g6-hre-u6-017', 'q-g6-hre-u6-018', 'q-g6-hre-u6-019', 'q-g6-hre-u6-020',
      'q-g6-hre-u6-021', 'q-g6-hre-u6-022', 'q-g6-hre-u6-023', 'q-g6-hre-u6-024'
    ],
    learningAreaId: 'la-hre-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 5 Questions (q-g6-hre-u5-001 to q-g6-hre-u5-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u5-001',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'From which of the four sacred Vedas does the celebrated Mahamrityunjaya Mantra originate?',
    options: ['Rig Veda', 'Sama Veda', 'Yajur Veda', 'Atharva Veda'],
    correctAnswer: 'Rig Veda',
    explanation: 'The Mahamrityunjaya Mantra is found in the Mandala 7 (7.59.12) of the Rig Veda, revealed by Sage Markandeya.',
    socraticHint: 'Which oldest of the four Vedas contains the hymn beginning "Tryambakam yajamahe"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-002',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'To which divine manifestation is the Mahamrityunjaya Mantra addressed under the name "Tryambaka"?',
    options: ['Lord Shiva (The Three-Eyed Lord)', 'Lord Brahma', 'Lord Indra', 'Lord Agni'],
    correctAnswer: 'Lord Shiva (The Three-Eyed Lord)',
    explanation: 'Tryambaka refers to Lord Shiva, "the Three-Eyed One", whose third eye of spiritual illumination destroys fear, sickness, and ignorance.',
    socraticHint: 'Which deity with the third eye of wisdom is invoked as Tryambaka?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-003',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What beautiful natural metaphor is used in the Mahamrityunjaya Mantra to illustrate spiritual liberation ("Urvarukamiva bandhanan")?',
    options: [
      'A ripe cucumber or melon detaching naturally from its vine without struggle',
      'A bird flying out of a hunter’s net',
      'A river merging into the roaring ocean',
      'A star shooting across the night sky'
    ],
    correctAnswer: 'A ripe cucumber or melon detaching naturally from its vine without struggle',
    explanation: 'The mantra prays that just as an "Urvaruka" (ripe melon) effortlessly releases from its stem when fully mature, the soul should be freed from worldly mortality.',
    socraticHint: 'Which climbing vine fruit detaches smoothly on its own when fully ripe?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-004',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What primary spiritual blessings are sought through sincere chanting of the Mahamrityunjaya Mantra?',
    options: [
      'Physical and mental healing, removal of fear, resilience, and liberation (Amrita)',
      'Accumulation of gold and expensive jewelry',
      'Victory in physical wrestling matches',
      'Power to curse personal rivals'
    ],
    correctAnswer: 'Physical and mental healing, removal of fear, resilience, and liberation (Amrita)',
    explanation: 'Also known as the healing mantra (Mrita-sanjeevani), it is chanted for radiant vitality, conquering the terror of death, and attaining spiritual immortality.',
    socraticHint: 'Which holistic blessings of healing, fearlessness, and immortality are invoked?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-005',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'From which major Upanishad does the sacred Pavamana prayer ("Asato ma sadgamaya...") originate?',
    options: ['Brihadaranyaka Upanishad', 'Katha Upanishad', 'Isha Upanishad', 'Kena Upanishad'],
    correctAnswer: 'Brihadaranyaka Upanishad',
    explanation: 'The Pavamana Abhyaroha mantra is recorded in the Brihadaranyaka Upanishad (1.3.28), one of the oldest and most revered philosophical texts.',
    socraticHint: 'Which "Great Forest" Upanishad contains this universal prayer?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-006',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What does the first petition of the Pavamana prayer "Asato ma sadgamaya" ask from the Divine?',
    options: [
      '"Lead me from untruth (unreal) to Truth (Real)"',
      '"Lead me to wealth and prosperity"',
      '"Lead me away from physical labor"',
      '"Lead me to defeat my enemies"'
    ],
    correctAnswer: '"Lead me from untruth (unreal) to Truth (Real)"',
    explanation: '"Asat" means untruth, falsehood, or illusory appearance, and "Sat" means absolute Truth and eternal Reality.',
    socraticHint: 'Translate "Asat" (untruth) and "Sat" (truth/reality).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-007',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What does the second petition "Tamaso ma jyotirgamaya" mean?',
    options: [
      '"Lead me from darkness (ignorance) to light (spiritual knowledge)"',
      '"Lead me from daytime to nighttime"',
      '"Lead me away from quiet meditation"',
      '"Lead me to light fires in the forest"'
    ],
    correctAnswer: '"Lead me from darkness (ignorance) to light (spiritual knowledge)"',
    explanation: '"Tamas" represents mental darkness, ignorance, and confusion, while "Jyoti" represents the radiant light of wisdom, discernment, and enlightenment.',
    socraticHint: 'What do darkness (Tamas) and light (Jyoti) symbolize spiritually?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-008',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What does the third petition "Mrityor ma amritam gamaya" mean?',
    options: [
      '"Lead me from death (transience/mortality) to immortality (spiritual liberation)"',
      '"Lead me away from old age"',
      '"Lead me to sleep without dreams"',
      '"Lead me to build strong houses"'
    ],
    correctAnswer: '"Lead me from death (transience/mortality) to immortality (spiritual liberation)"',
    explanation: '"Mrityu" refers to perishable physical mortality, and "Amrita" is the immortal state of self-realization where the soul attains Moksha.',
    socraticHint: 'What is the transition from "Mrityu" (death) to "Amrita" (immortality)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-009',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'Why is the Pavamana prayer considered universal, applicable to people of all backgrounds and nations?',
    options: [
      'Because every human being inherently yearns for Truth, Wisdom, and Immortal Peace beyond death',
      'Because it mentions specific political parties',
      'Because it can only be chanted in northern India',
      'Because it guarantees free airline travel'
    ],
    correctAnswer: 'Because every human being inherently yearns for Truth, Wisdom, and Immortal Peace beyond death',
    explanation: 'The prayer makes no sectarian or narrow demands; it expresses the universal human longing for truth, wisdom, and liberation.',
    socraticHint: 'Does the search for truth and knowledge belong to all humanity or only one group?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-010',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What legendary young devotee conquered untimely death through intense meditation on the Mahamrityunjaya Mantra?',
    options: ['Markandeya', 'Prahlada', 'Dhruva', 'Nachiketa'],
    correctAnswer: 'Markandeya',
    explanation: 'Sage Markandeya, fated to die at age sixteen, embraced the Shiva Linga and chanted the mantra; Lord Shiva protected him from Yama, granting him immortality.',
    socraticHint: 'Which young sage was protected from Yama at age 16 through Shiva’s grace?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-011',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'How does reciting "Tamaso ma jyotirgamaya" inspire a student during examination preparations in Kenya?',
    options: [
      'It motivates them to dispel the darkness of confusion through disciplined study and seek the illumination of understanding',
      'It encourages them to leave books closed and pray for magic answers',
      'It tells them to study only in the dark without lamps',
      'It makes them believe exams are unnecessary'
    ],
    correctAnswer: 'It motivates them to dispel the darkness of confusion through disciplined study and seek the illumination of understanding',
    explanation: 'The prayer reminds learners that education is the sacred journey from the darkness of ignorance (Tamas) to the light of knowledge (Jyoti).',
    socraticHint: 'How does seeking light from darkness reflect academic learning and revision?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-012',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l1',
    text: 'What word in the Mahamrityunjaya Mantra means "fragrant and nourishing the full flourishing of all beings"?',
    options: ['Sugandhim pushtivardhanam', 'Urvarukamiva', 'Mrityor mukshiya', 'Bandhanan'],
    correctAnswer: 'Sugandhim pushtivardhanam',
    explanation: '"Sugandhim" means fragrant with divine virtues, and "Pushtivardhanam" means the one who nourishes and sustains the physical and spiritual growth of life.',
    socraticHint: 'Identify the phrase describing divine fragrance and nourishment of life.',
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
    id: 'q-g6-hre-u5-013',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'Why is the sacred word "Shanti" (Peace) chanted exactly THREE times at the conclusion of Hindu prayers?',
    options: [
      'To address and pacify the three realms of human suffering (internal, external from others, and environmental)',
      'Because three is just a lucky number in superstition',
      'To make sure people sitting in the back can hear',
      'One for morning, one for afternoon, and one for night'
    ],
    correctAnswer: 'To address and pacify the three realms of human suffering (internal, external from others, and environmental)',
    explanation: 'The three chants pacify the Tapatraya: Adhyatmika (inner bodily/mental pain), Adhibhautika (harm from external beings), and Adhidevika (calamities from natural forces).',
    socraticHint: 'What three sources of suffering (Tapatraya) are pacified by saying Shanti three times?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-014',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What category of suffering arises from within our own physical body and psychological mind (such as illness, stress, or depression)?',
    options: ['Adhyatmika duhkha', 'Adhibhautika duhkha', 'Adhidevika duhkha', 'Pancha klesha'],
    correctAnswer: 'Adhyatmika duhkha',
    explanation: 'Adhyatmika refers to internal afflictions originating from one’s own physical constitution (fever, bodily pain) or mind (anxiety, grief, anger).',
    socraticHint: 'The term combines "Adhi" and "Atma" (pertaining to oneself/body/mind).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-015',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What category of suffering is caused by external living beings such as hurtful humans, venomous snakes, or mosquitoes?',
    options: ['Adhibhautika duhkha', 'Adhyatmika duhkha', 'Adhidevika duhkha', 'Moksha klesha'],
    correctAnswer: 'Adhibhautika duhkha',
    explanation: 'Adhibhautika ("Bhuta" = living beings/elements) refers to troubles inflicted by other entities—such as enemies, wild beasts, parasites, or thieves.',
    socraticHint: 'Which term stems from "Bhuta", referring to other living beings in the world?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-016',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What category of suffering is caused by natural and cosmic events such as earthquakes, tsunamis, floods, and droughts?',
    options: ['Adhidevika duhkha', 'Adhyatmika duhkha', 'Adhibhautika duhkha', 'Karma vipaka'],
    correctAnswer: 'Adhidevika duhkha',
    explanation: 'Adhidevika pertains to unseen or cosmic natural forces beyond human control—such as cyclones, droughts, earthquakes, and lightning strikes.',
    socraticHint: 'Which suffering relates to natural disasters and cosmic environmental powers (Devas)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-017',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'In the Vedic Shanti Patha, what natural elements are specifically invoked to experience peace?',
    options: [
      'The sky (Dyauha), atmosphere (Antariksham), earth (Prithivi), waters (Apah), herbs (Oshadhayah), and trees (Vanaspatayah)',
      'Only gold coins and silver plates',
      'Only military armories and stone walls',
      'Only royal courtyards and palaces'
    ],
    correctAnswer: 'The sky (Dyauha), atmosphere (Antariksham), earth (Prithivi), waters (Apah), herbs (Oshadhayah), and trees (Vanaspatayah)',
    explanation: 'The Vedic Shanti Patha from the Yajur Veda petitions peace for every aspect of nature—from cosmic space down to tiny medicinal herbs and forest trees.',
    socraticHint: 'Notice how the Vedic peace prayer embraces the entire ecosystem of earth, water, and trees.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-018',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What does the opening line of the universal prayer "Sarve bhavantu sukhinah" mean?',
    options: [
      '"May all living beings be happy and peaceful"',
      '"May only my family become wealthy"',
      '"May my sports team win every game"',
      '"May only believers of my religion receive rain"'
    ],
    correctAnswer: '"May all living beings be happy and peaceful"',
    explanation: '"Sarve bhavantu sukhinah" expresses boundless compassion: "May all beings everywhere be happy," without discrimination based on nationality, species, or faith.',
    socraticHint: 'The word "Sarve" means all, and "Sukhinah" means happy.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-019',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What does the line "Sarve santu niramayah" in the universal prayer ask for all creation?',
    options: [
      '"May all beings be free from illness and disease"',
      '"May all beings speak only Sanskrit"',
      '"May all beings move to cold mountain regions"',
      '"May all beings gather in royal palaces"'
    ],
    correctAnswer: '"May all beings be free from illness and disease"',
    explanation: '"Niramayah" means free from disease ("Amaya" = illness), praying for radiant physical, mental, and spiritual health for all living beings.',
    socraticHint: 'Which line wishes freedom from illness and sickness for everyone?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-020',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What does the concluding petition "Ma kashchid duhkha-bhagbhavet" plead for?',
    options: [
      '"May no one suffer sorrow or grief anywhere"',
      '"May evil people suffer double pain"',
      '"May sorrow only affect distant villages"',
      '"May people forget all their ancestors"'
    ],
    correctAnswer: '"May no one suffer sorrow or grief anywhere"',
    explanation: 'The prayer reaches its pinnacle of unconditional love by wishing that no living being anywhere in creation should ever partake in sorrow (Duhkha).',
    socraticHint: 'Which line wishes that not a single soul should suffer pain or grief?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-021',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'How does praying for peace in waters (Apah shantihi) and plants (Oshadhayah shantihi) inspire environmental conservation?',
    options: [
      'It teaches that rivers, oceans, and plants are sacred partners in life that humans must protect from pollution and deforestation',
      'It encourages dumping factory waste into rivers',
      'It tells people to cut down trees to clear the sky',
      'It suggests plants do not require water'
    ],
    correctAnswer: 'It teaches that rivers, oceans, and plants are sacred partners in life that humans must protect from pollution and deforestation',
    explanation: 'When learners pray for the peace and thriving of water and flora, they internalize a deep reverence that prevents littering, water wastage, and ecological harm.',
    socraticHint: 'How does praying for nature foster an attitude of protection and conservation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-022',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What ancient Vedic vision of environmental interconnectedness matches modern ecological science?',
    options: [
      'Human health is inseparable from the health of the earth, atmosphere, water bodies, and forests',
      'Humans can destroy all forests without affecting their own air quality',
      'Oceans and rain clouds have no connection to farming',
      'Animals do not need clean drinking water'
    ],
    correctAnswer: 'Human health is inseparable from the health of the earth, atmosphere, water bodies, and forests',
    explanation: 'Thousands of years before ecology, the Vedas recognized the cosmic web of life: when we pollute rivers or fell trees, we destroy our own peace and survival.',
    socraticHint: 'How does the Vedic view emphasize the interconnected web of all life systems?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-023',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'During times of drought in Kenya, how does chanting the Shanti Patha unite communities?',
    options: [
      'By turning hearts toward cosmic empathy, water conservation, and inspiring interfaith drought relief charities',
      'By creating arguments about who used more water',
      'By demanding that foreign nations solve all problems',
      'By refusing to share water with domestic animals'
    ],
    correctAnswer: 'By turning hearts toward cosmic empathy, water conservation, and inspiring interfaith drought relief charities',
    explanation: 'The prayer reminds communities of shared vulnerability, mobilizing humanitarian borehole digging, food drives, and water distribution for arid regions.',
    socraticHint: 'How does praying for universal peace motivate practical humanitarian relief in Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u5-024',
    subStrandId: 'substrand-g6-hre-u5',
    lessonId: 'lesson-g6-hre-u5-l2',
    text: 'What does the phrase "Sarve bhadrani pashyantu" petition for everyone?',
    options: [
      '"May all perceive what is auspicious, noble, and good in life"',
      '"May all become wealthy merchants"',
      '"May everyone receive gold ornaments"',
      '"May everyone travel across the seven seas"'
    ],
    correctAnswer: '"May all perceive what is auspicious, noble, and good in life"',
    explanation: '"Bhadram" means auspiciousness, moral beauty, and goodness; the prayer wishes that all people look upon life with positive, noble, and uplifting vision.',
    socraticHint: 'Translate "Bhadrani pashyantu" regarding seeing goodness and auspiciousness.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // --- Unit 6 Questions (q-g6-hre-u6-001 to q-g6-hre-u6-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u6-001',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What are the Niyamas in Sage Patanjali’s classical Ashtanga Yoga system?',
    options: [
      'Personal observances, inner disciplines, and positive habits for self-purification',
      'Social restraints and rules for dealing with enemies',
      'Physical martial arts techniques for warfare',
      'Dietary rules only for forest hermits'
    ],
    correctAnswer: 'Personal observances, inner disciplines, and positive habits for self-purification',
    explanation: 'While the Yamas govern interpersonal social ethics, the Five Niyamas are internal personal disciplines that purify character and cultivate inner strength.',
    socraticHint: 'Distinguish between social ethics (Yamas) and personal inner disciplines (Niyamas).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-002',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'How many Niyamas are formulated in the Yoga Sutras of Sage Patanjali?',
    options: ['Five Niyamas', 'Three Niyamas', 'Seven Niyamas', 'Ten Niyamas'],
    correctAnswer: 'Five Niyamas',
    explanation: 'The five classical Niyamas are: 1) Shaucha, 2) Santosha, 3) Tapas, 4) Svadhyaya, and 5) Ishvara Pranidhana.',
    socraticHint: 'Count the five personal observances of classical Ashtanga Yoga.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-003',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What is the first Niyama, which signifies both physical cleanliness and mental purity?',
    options: ['Shaucha', 'Santosha', 'Tapas', 'Ahimsa'],
    correctAnswer: 'Shaucha',
    explanation: 'Shaucha is purity: external cleanliness of the body, environment, and food (Bahya Shaucha), and internal purity of thoughts and emotions (Abhyantara Shaucha).',
    socraticHint: 'Which Sanskrit term signifies cleanliness, purity, and sanitation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-004',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What is "Abhyantara Shaucha" (Internal Purity) in daily character development?',
    options: [
      'Cleansing the mind of jealousy, anger, hatred, and deceit through noble thoughts and compassion',
      'Drinking ten liters of water every hour',
      'Washing clothes with special soaps',
      'Sweeping the classroom floor three times daily'
    ],
    correctAnswer: 'Cleansing the mind of jealousy, anger, hatred, and deceit through noble thoughts and compassion',
    explanation: 'Internal purity pertains to the mental and emotional sphere: harboring pure intentions, forgiving others, and cultivating goodwill instead of spite.',
    socraticHint: 'How does one cleanse the mind and heart internally?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-005',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What is the second Niyama, which signifies gratitude, contentment, and joy with what one has?',
    options: ['Santosha', 'Shaucha', 'Satya', 'Asteya'],
    correctAnswer: 'Santosha',
    explanation: 'Santosha means contentment—being cheerful, thankful for life’s blessings, and free from the restless craving to constantly acquire more material toys.',
    socraticHint: 'Which term means contentment and peaceful satisfaction?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-006',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'Does practicing Santosha (contentment) mean a student should become lazy and stop trying to improve their grades?',
    options: [
      'No, Santosha means working hard cheerfully without being poisoned by bitter jealousy or anxiety over what others possess',
      'Yes, it means sleeping all day without opening books',
      'Yes, students should refuse to take tests',
      'Only if they are already in Grade 6'
    ],
    correctAnswer: 'No, Santosha means working hard cheerfully without being poisoned by bitter jealousy or anxiety over what others possess',
    explanation: 'Contentment is an inner state of peaceful gratitude; it empowers a student to strive for academic excellence with joyful enthusiasm rather than toxic envy.',
    socraticHint: 'Does genuine gratitude encourage laziness or joyful, diligent effort?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-007',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What is the third Niyama, which represents perseverance, disciplined effort, and spiritual fortitude?',
    options: ['Tapas', 'Aparigraha', 'Santosha', 'Brahmacharya'],
    correctAnswer: 'Tapas',
    explanation: 'Tapas comes from the root "Tap" (to heat or burn), signifying the burning zeal of self-discipline and perseverance required to purify character and achieve great goals.',
    socraticHint: 'Which term means austerity, perseverance, and disciplined focus?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-008',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'How is Tapas compared to the process of purifying raw gold from rock ore?',
    options: [
      'Just as intense heat in a furnace burns away dross to reveal pure gold, disciplined effort purges weaknesses to reveal noble character',
      'Gold becomes softer when left in cold water',
      'Gold is produced by planting seeds in wet soil',
      'Gold cannot be changed by heat'
    ],
    correctAnswer: 'Just as intense heat in a furnace burns away dross to reveal pure gold, disciplined effort purges weaknesses to reveal noble character',
    explanation: 'In Vedic metaphors, Tapas is the spiritual fire of discipline that dissolves laziness, impatience, and selfishness, refining the individual into pure gold.',
    socraticHint: 'How does fire refine precious gold from impurities?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-009',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'Dev is tempted to play video games all evening instead of revising for his term science test. If he chooses to turn off the console and study diligently for two hours, which Niyama is he practicing?',
    options: ['Tapas (Self-discipline and perseverance)', 'Ahimsa', 'Shaucha', 'Kama'],
    correctAnswer: 'Tapas (Self-discipline and perseverance)',
    explanation: 'Resisting immediate trivial gratification in order to fulfill a higher duty is a prime example of practicing Tapas in student life.',
    socraticHint: 'Which Niyama involves resisting short-term temptation to achieve long-term excellence?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-010',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'How does practicing Shaucha (purity) protect a school community from infectious illnesses like cholera and flu?',
    options: [
      'Washing hands with soap, keeping toilets hygienic, and eating fresh clean food stop disease vectors',
      'It creates pleasant aromas that chase away germs magically',
      'It allows students to skip doctor visits permanently',
      'It turns dirty water into medicine'
    ],
    correctAnswer: 'Washing hands with soap, keeping toilets hygienic, and eating fresh clean food stop disease vectors',
    explanation: 'Bahya Shaucha translates directly to practical hygiene and public health measures, preventing the spread of communicable diseases in schools.',
    socraticHint: 'How do basic hygiene and clean water prevent disease outbreaks?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-011',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'What does Sage Patanjali declare is attained from mastering Santosha (Yoga Sutra 2.42)?',
    options: [
      'Anuttamah Sukhalabhah (Unsurpassed, supreme happiness is attained)',
      'Immense political power over foreign kingdoms',
      'Ability to fly through the clouds',
      'Exemption from doing physical chores'
    ],
    correctAnswer: 'Anuttamah Sukhalabhah (Unsurpassed, supreme happiness is attained)',
    explanation: 'Patanjali explains: "Santoshad anuttamah sukhalabhah"—from true contentment arises unmatched happiness, because an insatiable mind can never experience peace.',
    socraticHint: 'What supreme state of happiness flows from genuine contentment?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-012',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l1',
    text: 'How does social media peer pressure challenge Santosha (contentment) among modern Kenyan youth?',
    options: [
      'It tempts youth to compare themselves to curated online lifestyles, generating fake inadequacy and discontent',
      'It encourages youth to read more classical books',
      'It teaches students how to cultivate vegetable gardens',
      'It eliminates all advertising from the internet'
    ],
    correctAnswer: 'It tempts youth to compare themselves to curated online lifestyles, generating fake inadequacy and discontent',
    explanation: 'Comparing oneself to artificial online perfection breeds jealousy and unhappiness; practicing Santosha anchors young minds in gratitude for real-world blessings.',
    socraticHint: 'How does comparing oneself to filtered internet photos trigger unhealthy discontent?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u6-013',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What is the fourth Niyama, which means self-study, reading sacred texts, and honest self-reflection?',
    options: ['Svadhyaya', 'Santosha', 'Shaucha', 'Ishvara Pranidhana'],
    correctAnswer: 'Svadhyaya',
    explanation: 'Svadhyaya ("Sva" = self, "Adhyaya" = study) involves the study of wisdom literature as well as the introspective examination of one’s own thoughts and conduct.',
    socraticHint: 'Which term combines "Sva" (self) and "Adhyaya" (study or learning)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-014',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What are the two complementary dimensions of practicing Svadhyaya?',
    options: [
      'Reading sacred/uplifting scriptures and engaging in daily personal introspection (self-audit)',
      'Memorizing phone numbers and watching entertainment videos',
      'Painting wall murals and playing flutes',
      'Arguing with teachers and skipping homework'
    ],
    correctAnswer: 'Reading sacred/uplifting scriptures and engaging in daily personal introspection (self-audit)',
    explanation: 'Svadhyaya requires both studying spiritual knowledge (such as the Gita and Upanishads) and holding a mirror to one’s own conscience to self-correct.',
    socraticHint: 'Notice how Svadhyaya pairs study of external wisdom texts with internal self-examination.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-015',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What is the fifth Niyama, representing surrender to the Divine and dedicating all actions to God?',
    options: ['Ishvara Pranidhana', 'Tapas', 'Santosha', 'Shaucha'],
    correctAnswer: 'Ishvara Pranidhana',
    explanation: 'Ishvara Pranidhana means surrender (Pranidhana) to the Supreme Lord (Ishvara)—releasing egoistic pride and offering one’s work as a sacred dedication to God.',
    socraticHint: 'Which compound term includes "Ishvara" (God) and "Pranidhana" (devotional surrender)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-016',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'How does practicing Ishvara Pranidhana protect an achiever from destructive arrogance (Ahankara)?',
    options: [
      'It reminds them that talents, breath, and opportunities are gifts from God, inspiring humility and gratitude',
      'It makes them boast that God favors them above everyone else',
      'It encourages them to stop sharing credit with others',
      'It convinces them that they no longer need to work'
    ],
    correctAnswer: 'It reminds them that talents, breath, and opportunities are gifts from God, inspiring humility and gratitude',
    explanation: 'Dedication to the Divine dissolves ego; when success comes, the practitioner acknowledges: "This is God’s grace working through me, not my personal pride."',
    socraticHint: 'Who is the ultimate source of all talent, intelligence, and breath?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-017',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What healthy mental attitude does "Prasada Buddhi" cultivate when facing life’s outcomes under Ishvara Pranidhana?',
    options: [
      'Accepting results peacefully with gratitude as divine gifts/lessons, without bitter despair or arrogance',
      'Blaming God furiously whenever things go wrong',
      'Giving up on all ambitions forever',
      'Demanding that other people take the blame'
    ],
    correctAnswer: 'Accepting results peacefully with gratitude as divine gifts/lessons, without bitter despair or arrogance',
    explanation: 'Prasada Buddhi views outcomes like sacred temple offerings (Prasada)—received with grace, calm dignity, and contentment, knowing life is a learning journey.',
    socraticHint: 'How does receiving outcomes like a blessed gift (Prasada) transform disappointment into calm wisdom?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-018',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What question should a learner ask themselves every evening when conducting Svadhyaya (self-audit)?',
    options: [
      '"Did I speak the truth today, treat others with kindness, and how can I improve my character tomorrow?"',
      '"How many classmates did I make fun of today?"',
      '"How much money can I demand from my parents?"',
      '"Which homework assignment can I avoid doing?"'
    ],
    correctAnswer: '"Did I speak the truth today, treat others with kindness, and how can I improve my character tomorrow?"',
    explanation: 'Honest daily introspection evaluates thoughts, words, and actions against moral standards, fostering continuous personal growth and conscience refinement.',
    socraticHint: 'What reflective questions help a person review their daily moral conduct?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-019',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'Which sacred text studied during Svadhyaya provides dialogue between Lord Krishna and Arjuna on righteous living?',
    options: ['The Bhagavad Gita', 'The Natya Shastra', 'The Arthashastra', 'The Panchatantra'],
    correctAnswer: 'The Bhagavad Gita',
    explanation: 'The Bhagavad Gita is a premier text for daily Svadhyaya, offering timeless guidance on duty, equanimity, and devotion.',
    socraticHint: 'Which scripture contains Krishna’s 700 verses of advice on Kurukshetra?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-020',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What combined result is achieved when an individual practices all Five Niyamas consistently?',
    options: [
      'Radiant moral character, strong emotional resilience, intellectual clarity, and spiritual peace',
      'Automatic exemption from physical exercise',
      'The ability to read people’s secret thoughts',
      'Becoming completely wealthy overnight'
    ],
    correctAnswer: 'Radiant moral character, strong emotional resilience, intellectual clarity, and spiritual peace',
    explanation: 'The Niyamas purify body and mind, anchor the emotions in contentment, forge willpower through discipline, refine insight through self-study, and bring peace through devotion.',
    socraticHint: 'How do the five observances work together to build a strong, wholesome character?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-021',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'What spiritual attainment does Sage Patanjali associate with full realization of Ishvara Pranidhana (Yoga Sutra 2.45)?',
    options: [
      'Samadhi Siddhi (Perfection of superconscious spiritual absorption and divine connection)',
      'Mastery of physical archery',
      'Invisibility in public places',
      'Control of animal herds'
    ],
    correctAnswer: 'Samadhi Siddhi (Perfection of superconscious spiritual absorption and divine connection)',
    explanation: '"Samadhi-siddhir Ishvara-pranidhanat"—through total surrender to the Divine, the ultimate meditative realization of Samadhi is swiftly accomplished.',
    socraticHint: 'What highest state of meditative absorption (Samadhi) is attained through surrender to God?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-022',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'How can a Grade 6 learner apply Svadhyaya to improve their performance in languages and sciences?',
    options: [
      'By reading widely every day, reflecting critically on mistakes in previous assignments, and seeking deeper comprehension',
      'By copying assignments from classmates right before class begins',
      'By throwing away graded tests without looking at teacher corrections',
      'By blaming textbooks for difficult concepts'
    ],
    correctAnswer: 'By reading widely every day, reflecting critically on mistakes in previous assignments, and seeking deeper comprehension',
    explanation: 'Svadhyaya in academics means being a curious self-directed learner who analyzes feedback, reviews weak topics honestly, and reads uplifting educational literature.',
    socraticHint: 'How does self-directed study and learning from errors improve academic competence?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-023',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'Which famous Sanskrit phrase from the Taittiriya Upanishad commands regular practice of Svadhyaya alongside righteous conduct?',
    options: ['Svadhyayan ma pramadah (Do not neglect self-study and learning)', 'Satyam vada', 'Dharmam chara', 'Matru devo bhava'],
    correctAnswer: 'Svadhyayan ma pramadah (Do not neglect self-study and learning)',
    explanation: 'The convocation address of the Taittiriya Upanishad commands students: "Svadhyayan ma pramadah"—never be negligent or careless regarding daily learning and self-study.',
    socraticHint: 'Identify the Upanishadic command forbidding negligence in daily study.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u6-024',
    subStrandId: 'substrand-g6-hre-u6',
    lessonId: 'lesson-g6-hre-u6-l2',
    text: 'When Kenyan students combine the Five Yamas (social virtues) with the Five Niyamas (personal virtues), what kind of citizens do they become?',
    options: [
      'Principled, compassionate, self-disciplined leaders who build national unity and uphold Kenya’s moral fabric',
      'Selfish individuals who ignore community needs',
      'People who only care about accumulating personal luxury',
      'Citizens who break traffic and civic regulations'
    ],
    correctAnswer: 'Principled, compassionate, self-disciplined leaders who build national unity and uphold Kenya’s moral fabric',
    explanation: 'Integrating Yamas (non-violence, truth, honesty) and Niyamas (purity, contentment, discipline, introspection, humility) produces holistic citizens of high character for Kenya.',
    socraticHint: 'How does blending social ethics and personal discipline develop exemplary citizens?',
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
console.log(`Added ${qCount} questions for Units 5 & 6.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 3 of Grade 6 HRE to cbe_database.json!');
