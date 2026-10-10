/**
 * Grade 6 Christian Religious Education (CRE) - Batch 1 Generator
 * Setup: Learning Area 'la-cre-g6', 4 Strands
 * Content: Units 1 & 2 (Creation & Stewardship, Digital Ethics)
 * Missions: Orders 109, 110, 111, 112 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-cre-u1-001 to q-g6-cre-u2-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Setting up Grade 6 CRE and Batch 1 (Units 1 & 2) ---');

// 1. Learning Area Registration
const laCreG6 = {
  id: 'la-cre-g6',
  gradeId: 'grade-6',
  name: 'Christian Religious Education',
  swahiliName: 'Elimu ya Dini ya Kikristo',
  icon: 'church',
  color: '#3B82F6',
  description: 'Nurturing Christian spiritual maturity, biblical literacy, moral discernment, servant leadership, ecological stewardship, ethical digital living, and peaceful national cohesion in Kenya as guided by the teachings and sacrificial love of Jesus Christ.',
  strandsCount: 4
};

const laIdx = db.learningAreas.findIndex(l => l.id === laCreG6.id);
if (laIdx >= 0) db.learningAreas[laIdx] = laCreG6;
else db.learningAreas.push(laCreG6);
console.log('Registered learning area: la-cre-g6');

// 2. Strands for Grade 6 CRE
const strands = [
  {
    id: 'strand-g6-cre-creation',
    learningAreaId: 'la-cre-g6',
    code: 'CRE-G6-STR-01',
    title: 'Creation and Environmental Stewardship',
    swahiliTitle: 'Uumbaji na Utunzaji wa Mazingira',
    description: 'Understanding human responsibility in God’s creation, conserving ecosystems and biodiversity, reducing environmental degradation, and stewarding personal God-given talents and digital technology with integrity.',
    icon: 'sun'
  },
  {
    id: 'strand-g6-cre-bible',
    learningAreaId: 'la-cre-g6',
    code: 'CRE-G6-STR-02',
    title: 'The Holy Bible and Moral Decisions',
    swahiliTitle: 'Biblia Takatifu na Maamuzi ya Maadili',
    description: 'Using the Bible as a moral compass in decision-making, history of Bible translation in Kenya, and emulating Old Testament heroes of faith, courage, and servant leadership.',
    icon: 'book-open'
  },
  {
    id: 'strand-g6-cre-jesus',
    learningAreaId: 'la-cre-g6',
    code: 'CRE-G6-STR-03',
    title: 'The Life, Ministry, and Teachings of Jesus Christ',
    swahiliTitle: 'Maisha, Huduma na Mafundisho ya Yesu Kristo',
    description: 'The Beatitudes and ethical standards of the Kingdom of God, parables of mercy, forgiveness, and stewardship, and the power of the Holy Spirit in the early church mission.',
    icon: 'heart'
  },
  {
    id: 'strand-g6-cre-living',
    learningAreaId: 'la-cre-g6',
    code: 'CRE-G6-STR-04',
    title: 'Christian Living, Contemporary Challenges, and Nation Building',
    swahiliTitle: 'Maisha ya Kikristo, Changamoto za Kisasa na Ujenzi wa Taifa',
    description: 'Practicing Christian family values, standing up for social justice, resisting corruption, and championing national cohesion, peace, and inter-religious tolerance in Kenya.',
    icon: 'users'
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
    id: 'substrand-g6-cre-u1',
    strandId: 'strand-g6-cre-creation',
    learningAreaId: 'la-cre-g6',
    title: 'Human Responsibility in God’s Creation & Ecosystem Care',
    name: 'Human Responsibility in God’s Creation & Ecosystem Care',
    description: 'Exploring biblical foundations of creation in Genesis 1 and 2; understanding humanity as God’s stewards and caretakers rather than exploiters; addressing contemporary ecological crises in Kenya including deforestation of water towers (Mau Forest, Mount Kenya, Aberdares), pollution of rivers and lakes (Nairobi River, Lake Victoria), soil erosion, and climate change; practical Christian environmental actions: tree planting, waste recycling, clean-up drives, and conservation advocacy.',
    cbeCompetency: 'Environmental stewardship, critical ecological thinking, biblical responsibility, and civic conservation leadership',
    estimatedMinutes: 30,
    order: 1,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-cre-u2',
    strandId: 'strand-g6-cre-creation',
    learningAreaId: 'la-cre-g6',
    title: 'Stewardship of Personal Talents & Ethical Digital Living',
    name: 'Stewardship of Personal Talents & Ethical Digital Living',
    description: 'Discovering and developing unique God-given abilities, intellectual talents, and creative gifts (1 Peter 4:10, Romans 12:6-8); understanding the Parable of the Talents (Matthew 25:14-30); applying Christian ethics to modern digital media, smartphones, and the internet; combating cyberbullying, misinformation, digital addiction, and inappropriate online content; using digital platforms to communicate truth, encourage others, and promote peace.',
    cbeCompetency: 'Digital literacy, moral discernment, ethical communication, and talent stewardship',
    estimatedMinutes: 30,
    order: 2,
    grade: 'G6'
  }
];

// 4. Lessons
const lessons = [
  {
    id: 'lesson-g6-cre-u1-l1',
    subStrandId: 'substrand-g6-cre-u1',
    title: 'Biblical Foundations of Creation: Humanity as God’s Faithful Stewards',
    content: 'The Bible reveals that God created the heavens, the earth, and all living things in supreme wisdom and declared everything "very good" (Genesis 1:31).\n\n1. Creation Accounts in Genesis:\n- Genesis 1: God speaks the universe into existence in divine order and entrusts human beings, made in His image and likeness, with dominion (Genesis 1:26-28).\n- Genesis 2: God forms man from the dust of the ground, breathes life into him, and places him in the Garden of Eden "to till it and keep it" (Genesis 2:15).\n\n2. True Meaning of Biblical Dominion:\n- Dominion is not exploitation, reckless destruction, or selfish greed.\n- Biblical dominion means loving stewardship, servanthood, and responsible preservation, reflecting God’s tender care for all creatures (Psalm 24:1: "The earth is the Lord’s, and the fullness thereof").\n\n3. Consequences of Disobedience and Selfishness:\n- Greed and sin lead to environmental degradation, depletion of natural resources, pollution, and suffering of both humans and wildlife.\n- Christians are called to be reconcilers and protectors of God’s creation.',
    didYouKnow: 'The Hebrew word used in Genesis 2:15 for caring for the garden is "shamar", which means to guard, protect, and cherish with watchful love!',
    kenyanContext: 'Kenyan churches actively lead the National Tree Growing Campaign, planting millions of trees in schools and worship centers to help achieve Kenya’s 30% national forest cover target.',
    order: 1,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u1-l2',
    subStrandId: 'substrand-g6-cre-u1',
    title: 'Christian Action for Kenya’s Ecosystems: Forests, Water Towers & Wildlife',
    content: 'Living out Christian faith requires tangible actions to protect our local environment and national ecosystems.\n\n1. Kenya’s Major Ecological Challenges:\n- Deforestation of Vital Water Towers: Destruction of Mau Forest, Aberdares, and Mount Kenya leads to severe droughts, flash floods, and drying of rivers.\n- Water Pollution: Dumping industrial and domestic waste into the Nairobi River, Athi River, and Lake Victoria harms aquatic life and spreads waterborne diseases.\n- Plastic Pollution and Soil Degradation: Uncollected non-biodegradable plastics choke fertile soils and poison livestock.\n\n2. Christian Principles of Conservation:\n- Intergenerational Justice: Preserving clean water, fertile soil, and biodiversity for future generations as a sacred trust.\n- Compassion for Creation: Treating animals and nature with kindness, avoiding cruelty and illegal poaching.\n\n3. Practical Actions for School and Community:\n- Establishing school tree nurseries and planting indigenous trees.\n- Practicing the 3 R’s: Reduce, Reuse, and Recycle.\n- Participating in community clean-up exercises and conserving water at home.',
    didYouKnow: 'Over 75% of Kenya’s electricity comes from clean renewable energy (hydro, geothermal, and wind), aligning with environmental stewardship!',
    kenyanContext: 'Nobel Laureate Prof. Wangari Maathai drew profound spiritual inspiration from the biblical call to heal the earth when founding the Green Belt Movement in Kenya.',
    order: 2,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u2-l1',
    subStrandId: 'substrand-g6-cre-u2',
    title: 'Stewardship of Personal Talents: The Parable of the Talents & Service',
    content: 'God has endowed every person with distinct gifts, skills, and talents to be used for His glory and the service of humanity.\n\n1. The Parable of the Talents (Matthew 25:14-30):\n- A master entrusts his servants with talents according to their ability (5 talents, 2 talents, and 1 talent) before journeying abroad.\n- The first two servants invest diligently and double their talents, receiving praise: "Well done, good and faithful servant!"\n- The third servant, paralyzed by fear and laziness, buries his talent in the ground. The master severely reprimands him for negligence and waste.\n\n2. Key Spiritual Lessons:\n- Accountability: We will all give an account to God for how we utilized our time, intellect, resources, and gifts.\n- Faithful Service: In God’s eyes, faithfulness and diligence matter, not competing with others.\n- 1 Peter 4:10: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace."\n\n3. Developing Talents in School:\n- Cultivating academic abilities, athletic skills, musical talents, artistic expression, and leadership for communal benefit.',
    didYouKnow: 'In biblical times, a single gold talent weighed around 34 kilograms and represented over 20 years of wages for an ordinary worker—illustrating how infinitely valuable God’s gifts are!',
    kenyanContext: 'Kenyan youth utilize their talents in music, poetry, coding, and sports to raise awareness on social issues and support charitable causes across the country.',
    order: 3,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u2-l2',
    subStrandId: 'substrand-g6-cre-u2',
    title: 'Christian Ethics in the Digital Age: Cyber-Integrity & Positive Media Use',
    content: 'In the 21st century, digital devices, the internet, and social media offer incredible opportunities for learning and connection, but also pose profound moral hazards.\n\n1. Digital Challenges for Christian Youth:\n- Cyberbullying and Online Cruelty: Sending malicious, hurtful, or derogatory messages that harm another person’s dignity and mental health.\n- Misinformation and Fake News: Spreading unverified rumors, gossip, or lies contrary to the commandment "You shall not bear false witness" (Exodus 20:16).\n- Inappropriate Content and Addiction: Excessive screen time, exposure to immoral material, and neglect of prayer, family, and studies.\n\n2. Christian Principles for Digital Living:\n- The Principle of Truth and Love: Ephesians 4:29 urges us: "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up."\n- Digital Footprint & God’s Omnipresence: Remembering that God sees all our secret online actions, searches, and interactions.\n- Respect for Privacy & Human Dignity: Never sharing non-consensual pictures or private conversations.\n\n3. Constructive Use of Technology:\n- Accessing digital Bibles and educational study materials.\n- Spreading hope, encouragement, and peace on digital community forums.',
    didYouKnow: 'The word "cyber" comes from the Greek "kybernetes", meaning a helmsman or pilot—reminding us that Christian youth must steer their digital lives with moral wisdom and self-control!',
    kenyanContext: 'Kenya’s Computer Misuse and Cybercrimes Act legally penalizes online harassment and cyberbullying, reinforcing biblical principles of respecting neighborly dignity.',
    order: 4,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  }
];

// 5. Missions (Orders 109, 110, 111, 112 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-cre-u1-m1',
    worldId: 'world-faith-values',
    title: 'Mission 109: Guardians of Eden – Divine Creation & Biblical Dominion',
    description: 'Explore the Genesis creation accounts, uncover the true meaning of loving biblical stewardship, and defend God’s glorious living world.',
    order: 109,
    orderIndex: 109,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-eden-guardian',
    badge: 'badge-g6-cre-eden-guardian',
    lessonId: 'lesson-g6-cre-u1-l1',
    questionIds: [
      'q-g6-cre-u1-001', 'q-g6-cre-u1-002', 'q-g6-cre-u1-003', 'q-g6-cre-u1-004',
      'q-g6-cre-u1-005', 'q-g6-cre-u1-006', 'q-g6-cre-u1-007', 'q-g6-cre-u1-008',
      'q-g6-cre-u1-009', 'q-g6-cre-u1-010', 'q-g6-cre-u1-011', 'q-g6-cre-u1-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u1-m2',
    worldId: 'world-faith-values',
    title: 'Mission 110: Kenya Water Tower Defenders – Ecological Faith in Action',
    description: 'Champion the restoration of Mau Forest and Mount Kenya, combat river pollution, plant indigenous trees, and protect wildlife habitats.',
    order: 110,
    orderIndex: 110,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-creation-care',
    badge: 'badge-g6-cre-creation-care',
    lessonId: 'lesson-g6-cre-u1-l2',
    questionIds: [
      'q-g6-cre-u1-013', 'q-g6-cre-u1-014', 'q-g6-cre-u1-015', 'q-g6-cre-u1-016',
      'q-g6-cre-u1-017', 'q-g6-cre-u1-018', 'q-g6-cre-u1-019', 'q-g6-cre-u1-020',
      'q-g6-cre-u1-021', 'q-g6-cre-u1-022', 'q-g6-cre-u1-023', 'q-g6-cre-u1-024'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u2-m1',
    worldId: 'world-faith-values',
    title: 'Mission 111: Multiplied Talents – Diligent Service & Kingdom Calling',
    description: 'Master the lessons of the Parable of the Talents, cultivate your unique God-given abilities, and dedicate skills to communal service.',
    order: 111,
    orderIndex: 111,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-faithful-servant',
    badge: 'badge-g6-cre-faithful-servant',
    lessonId: 'lesson-g6-cre-u2-l1',
    questionIds: [
      'q-g6-cre-u2-001', 'q-g6-cre-u2-002', 'q-g6-cre-u2-003', 'q-g6-cre-u2-004',
      'q-g6-cre-u2-005', 'q-g6-cre-u2-006', 'q-g6-cre-u2-007', 'q-g6-cre-u2-008',
      'q-g6-cre-u2-009', 'q-g6-cre-u2-010', 'q-g6-cre-u2-011', 'q-g6-cre-u2-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u2-m2',
    worldId: 'world-faith-values',
    title: 'Mission 112: Light in Cyberspace – Digital Integrity & Truthful Living',
    description: 'Navigate modern technology with Christian discernment, combat cyberbullying and misinformation, and illuminate online platforms with truth.',
    order: 112,
    orderIndex: 112,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-cyber-integrity',
    badge: 'badge-g6-cre-cyber-integrity',
    lessonId: 'lesson-g6-cre-u2-l2',
    questionIds: [
      'q-g6-cre-u2-013', 'q-g6-cre-u2-014', 'q-g6-cre-u2-015', 'q-g6-cre-u2-016',
      'q-g6-cre-u2-017', 'q-g6-cre-u2-018', 'q-g6-cre-u2-019', 'q-g6-cre-u2-020',
      'q-g6-cre-u2-021', 'q-g6-cre-u2-022', 'q-g6-cre-u2-023', 'q-g6-cre-u2-024'
    ],
    learningAreaId: 'la-cre-g6'
  }
];

// 6. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 1: Human Responsibility in God's Creation (q-g6-cre-u1-001 to 024) ---
  {
    id: 'q-g6-cre-u1-001',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'According to Genesis 1:31, how did God describe the entire universe after completing creation?',
    options: [
      'It was very good',
      'It was incomplete and flawed',
      'It was dangerous and evil',
      'It needed to be destroyed immediately'
    ],
    correctAnswer: 'It was very good',
    explanation: 'Genesis 1:31 states: "God saw all that he had made, and it was very good," declaring the inherent dignity, harmony, and perfection of creation.',
    socraticHint: 'What phrase in Genesis describes God’s assessment of His completed creation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-002',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'In Genesis 2:15, what specific mandate did God give to human beings in the Garden of Eden?',
    options: [
      'To till (cultivate) it and keep (preserve) it',
      'To cut down all trees and sell the timber',
      'To hunt every wild animal to extinction',
      'To build stone skyscrapers across the fertile soil'
    ],
    correctAnswer: 'To till (cultivate) it and keep (preserve) it',
    explanation: 'Genesis 2:15 records: "The Lord God took the man and put him in the Garden of Eden to till it and keep it," establishing humanity as responsible caretakers.',
    socraticHint: 'What two caring responsibilities did God assign humanity regarding the Garden of Eden?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-003',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'What does genuine biblical "dominion" over creation mean according to Christian teachings?',
    options: [
      'Caring for the earth as faithful stewards reflecting God’s loving care',
      'Exploiting and consuming natural resources without any concern for future generations',
      'Exercising tyrannical control to destroy nature whenever convenient',
      'Ignoring the environment because material things do not matter'
    ],
    correctAnswer: 'Caring for the earth as faithful stewards reflecting God’s loving care',
    explanation: 'Biblical dominion is modeled after God’s own compassionate kingship; it calls humans to protect, sustain, and nurture creation rather than abuse it.',
    socraticHint: 'Does God’s idea of leadership mean caring protection or selfish destruction?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-004',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'Which verse from the Psalms affirms that the entire earth and all its inhabitants belong exclusively to God?',
    options: [
      'Psalm 24:1: "The earth is the Lord’s, and the fullness thereof"',
      'Psalm 23:1: "The Lord is my shepherd"',
      'Psalm 119:105: "Your word is a lamp to my feet"',
      'Psalm 100:1: "Make a joyful noise unto the Lord"'
    ],
    correctAnswer: 'Psalm 24:1: "The earth is the Lord’s, and the fullness thereof"',
    explanation: 'Psalm 24:1 emphasizes divine ownership of the cosmos, reminding humans that they are merely temporary tenants and accountable custodians.',
    socraticHint: 'Which psalm states that the earth and everything within it belongs to the Creator?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-005',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'How does human sin and greed negatively impact the natural environment?',
    options: [
      'It causes deforestation, environmental pollution, habitat loss, and climate crises',
      'It makes trees grow taller and rivers flow clearer',
      'It has no effect because nature operates completely independent of humans',
      'It causes wild animals to live forever in harmony'
    ],
    correctAnswer: 'It causes deforestation, environmental pollution, habitat loss, and climate crises',
    explanation: 'Human greed leads to excessive exploitation, logging, pollution, and greenhouse emissions, causing ecological destruction and suffering.',
    socraticHint: 'What destructive consequences follow when people exploit nature purely for selfish financial gain?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-006',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'In Genesis 1, humans are created in the "image and likeness of God." What responsibility does this bestow regarding the rest of creation?',
    options: [
      'To represent God’s justice, love, and life-giving preservation toward all created things',
      'To destroy nature because only humans possess value',
      'To worship animals as deities in place of God',
      'To live separate from nature without touching plants or soil'
    ],
    correctAnswer: 'To represent God’s justice, love, and life-giving preservation toward all created things',
    explanation: 'Bearing God’s image entails acting as His earthly representatives, displaying His character of justice, compassion, and sustaining love toward all creation.',
    socraticHint: 'If we bear God’s image, how should our treatment of nature reflect God’s loving character?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-007',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'What does Proverbs 12:10 teach regarding the treatment of domestic and wild animals?',
    options: [
      '"A righteous man cares for the needs of his animal, but the kindest acts of the wicked are cruel"',
      '"Animals have no feelings and can be mistreated at will"',
      '"Only wild predators deserve protection"',
      '"A good master starves his beast to save food"'
    ],
    correctAnswer: '"A righteous man cares for the needs of his animal, but the kindest acts of the wicked are cruel"',
    explanation: 'Proverbs 12:10 explicitly correlates personal righteousness with compassion toward animals, condemning cruelty as an indicator of wickedness.',
    socraticHint: 'What does scripture say about how a righteous person treats their animals?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-008',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'Why did God command the Israelites to observe a Sabbath rest for the land every seventh year (Leviticus 25:4)?',
    options: [
      'To allow the soil to rejuvenate and ensure sustainability and rest for creation',
      'Because they were too lazy to farm during that year',
      'To let weeds choke the farmland so no food would grow',
      'To force farmers to move to foreign countries'
    ],
    correctAnswer: 'To allow the soil to rejuvenate and ensure sustainability and rest for creation',
    explanation: 'The Sabbath year for the land (Sabbatical Year) prevented nutrient depletion, demonstrating biblical concern for ecological balance and soil rejuvenation.',
    socraticHint: 'Why did the agricultural land need a rest year to recover its fertility?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-009',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'What covenant sign did God give to Noah and every living creature as an everlasting promise never to destroy the earth by flood again (Genesis 9)?',
    options: [
      'The rainbow set in the clouds',
      'A golden crown',
      'A pillar of fire',
      'An olive wreath'
    ],
    correctAnswer: 'The rainbow set in the clouds',
    explanation: 'In Genesis 9:12-17, God established an everlasting covenant with Noah and every living creature on earth, setting the rainbow in the clouds as its divine sign.',
    socraticHint: 'Which colorful sign in the sky sealed God’s promise to all living creatures after the flood?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-010',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'Which Old Testament prophet warned that when people break God’s moral covenant, "the land mourns, and all who dwell in it languish, with the beasts of the field and birds of the air" (Hosea 4:3)?',
    options: [
      'Prophet Hosea',
      'Prophet Jonah',
      'Prophet Daniel',
      'Prophet Elijah'
    ],
    correctAnswer: 'Prophet Hosea',
    explanation: 'Hosea 4:3 vividly illustrates the direct link between moral breakdown, human dishonesty, and widespread ecological suffering in the natural world.',
    socraticHint: 'Which prophet warned in chapter 4 that moral decay causes the land and wildlife to mourn?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-011',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'How did Jesus Christ illustrate God’s intimate care for creation in the Sermon on the Mount (Matthew 6:26)?',
    options: [
      'By pointing out that God feeds the birds of the air even though they do not sow or reap',
      'By ordering all birds to be locked in cages',
      'By commanding followers to stop caring about nature',
      'By turning all desert rocks into bread'
    ],
    correctAnswer: 'By pointing out that God feeds the birds of the air even though they do not sow or reap',
    explanation: 'Jesus taught that the heavenly Father faithfully sustains even the humble birds of the air and clothes the lilies of the field, highlighting God’s providential love.',
    socraticHint: 'Which wild creatures did Jesus use as an example of God’s daily sustaining care?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-012',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l1',
    text: 'What virtue is shown when a Christian pupil picks up litter and properly disposes of it even when nobody is watching?',
    options: [
      'Integrity and faithful stewardship of God’s environment',
      'Boasting and seeking public praise',
      'Fear of being punished by local police',
      'Wasting valuable free time'
    ],
    correctAnswer: 'Integrity and faithful stewardship of God’s environment',
    explanation: 'Caring for creation quietly without seeking public attention exemplifies genuine Christian integrity and reverence for God’s handiwork.',
    socraticHint: 'What moral virtue means doing what is right even when no one is watching?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-013',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'Why are Kenya’s five major water towers (Mau Forest, Mount Kenya, Aberdares, Mount Elgon, and Cherangani Hills) critical to our nation’s survival?',
    options: [
      'They catch rainwater, feed major rivers, provide clean drinking water, and generate hydroelectric power',
      'They are concrete water tanks constructed in towns',
      'They only serve as tourist picnic sites on weekends',
      'They are used exclusively for testing military vehicles'
    ],
    correctAnswer: 'They catch rainwater, feed major rivers, provide clean drinking water, and generate hydroelectric power',
    explanation: 'Kenya’s forested water towers are natural catchment areas that recharge aquifers, sustain major rivers (Tana, Mara, Nzoia), power hydro-turbines, and support agriculture.',
    socraticHint: 'Why do our forested mountains provide the lifeblood of water and electricity for Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-014',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'What major disaster occurs when the Mau Forest Complex is cleared and destroyed through illegal logging and human encroachment?',
    options: [
      'Rivers dry up, severe droughts intensify, rainfall decreases, and wildlife migrations collapse',
      'The country receives more rain and river water doubles',
      'Dangerous wild animals reproduce much faster',
      'Farming crops become completely immune to pests'
    ],
    correctAnswer: 'Rivers dry up, severe droughts intensify, rainfall decreases, and wildlife migrations collapse',
    explanation: 'Deforestation disrupts rainfall cycles, causes rivers to dwindle into dry sandbeds, triggers desertification, and destroys the delicate Mara-Serengeti ecosystem.',
    socraticHint: 'What happens to our rivers and weather patterns when massive water catchment forests are cut down?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-015',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'How does disposing of untreated sewage and industrial chemicals into the Nairobi River violate Christian stewardship?',
    options: [
      'It destroys aquatic life, spreads toxic diseases to vulnerable communities downstream, and defiles God’s gift of clean water',
      'It makes the river look modern and technologically advanced',
      'It has no moral dimension because water cannot feel pain',
      'It helps downstream farmers get free fertilizers'
    ],
    correctAnswer: 'It destroys aquatic life, spreads toxic diseases to vulnerable communities downstream, and defiles God’s gift of clean water',
    explanation: 'Polluting rivers infringes upon the health and dignity of poor downstream communities and degrades God’s pristine water resources, violating love for neighbor and creation.',
    socraticHint: 'How does poisoning a river hurt both downstream neighbors and God’s aquatic creatures?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-016',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'What is the Christian concept of "intergenerational justice" in the context of the environment?',
    options: [
      'Leaving behind a healthy, fertile, and biodiverse earth for our children and future generations',
      'Consuming every available resource today so nothing is left behind',
      'Making old people pay higher taxes for tree planting',
      'Only planting trees that mature after 1,000 years'
    ],
    correctAnswer: 'Leaving behind a healthy, fertile, and biodiverse earth for our children and future generations',
    explanation: 'Intergenerational justice is the moral duty to pass on a thriving, unpolluted, and fertile earth to upcoming generations as an uncorrupted sacred heritage.',
    socraticHint: 'Why must we care for the earth so that future children can also enjoy clean air, soil, and water?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-017',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'Which practical activity can Grade 6 Christian learners lead at school to combat global climate change?',
    options: [
      'Establishing a tree nursery and planting indigenous trees around the school compound',
      'Burning plastic bottles behind the classrooms',
      'Leaving water taps running continuously during break time',
      'Uprooting grass on the sports field to create bare dirt'
    ],
    correctAnswer: 'Establishing a tree nursery and planting indigenous trees around the school compound',
    explanation: 'Planting and nurturing indigenous trees sequesters atmospheric carbon dioxide, cools the local environment, prevents soil erosion, and provides shade and beauty.',
    socraticHint: 'Which action brings green shade, absorbs carbon, and protects topsoil from washing away?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-018',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'What are the "3 Rs" of environmental management that reflect Christian moderation and conservation?',
    options: [
      'Reduce, Reuse, and Recycle',
      'Run, Rest, and Repeat',
      'Read, Recite, and Remember',
      'Reject, Resent, and Resist'
    ],
    correctAnswer: 'Reduce, Reuse, and Recycle',
    explanation: 'Reduce (minimizing waste and excessive consumption), Reuse (extending product lifespan), and Recycle (processing materials into new products) embody wise resource stewardship.',
    socraticHint: 'Which three R-words describe minimizing waste and reusing materials sustainably?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-019',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'Why does Christian morality strictly condemn the illegal trade and poaching of endangered wildlife (like elephants and rhinos)?',
    options: [
      'It violates God’s command to cherish creation and destroys animals made by God for selfish greed',
      'Because ivory cannot be eaten as food',
      'Because wild animals belong only to foreign countries',
      'Because poachers do not pay entrance fees at national parks'
    ],
    correctAnswer: 'It violates God’s command to cherish creation and destroys animals made by God for selfish greed',
    explanation: 'Poaching decimates God’s living creatures for illicit monetary gain, violating God’s covenant with all living things and robbing Kenya of its natural heritage.',
    socraticHint: 'Why is slaughtering endangered wildlife for ivory tusks a grave sin against God’s creation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-020',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'How did Kenyan environmental icon Prof. Wangari Maathai demonstrate Christian servant leadership through the Green Belt Movement?',
    options: [
      'By courageously mobilizing women to plant over 50 million trees and defending public forests like Karura Forest',
      'By promoting commercial logging across national game reserves',
      'By encouraging people to build factories inside city parks',
      'By giving up public service to live in comfort overseas'
    ],
    correctAnswer: 'By courageously mobilizing women to plant over 50 million trees and defending public forests like Karura Forest',
    explanation: 'Prof. Wangari Maathai fearlessly defended Uhuru Park and Karura Forest, empowering rural women to restore degraded lands, embodying courageous Christian stewardship.',
    socraticHint: 'Which historic movement mobilized ordinary Kenyan women to plant tens of millions of trees?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-021',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'How does planting indigenous trees rather than exotic eucalyptus trees near natural water springs protect the local ecosystem?',
    options: [
      'Indigenous trees conserve moisture and recharge groundwater without excessively depleting natural springs',
      'Indigenous trees produce plastic fruits for livestock',
      'Exotic trees stop the sun from rising in the morning',
      'Springs do not require any trees around them'
    ],
    correctAnswer: 'Indigenous trees conserve moisture and recharge groundwater without excessively depleting natural springs',
    explanation: 'Eucalyptus consumes excessive volumes of groundwater; planting native indigenous trees protects hydrological cycles, preserves spring flow, and supports local birds and insects.',
    socraticHint: 'Why are native indigenous trees better than water-thirsty exotic trees for preserving natural springs?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-022',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'In Deuteronomy 20:19, what wartime conservation instruction did God give the Israelites concerning fruit trees around besieged cities?',
    options: [
      'They were forbidden from cutting down fruit trees because trees provide food and are not enemy soldiers',
      'They were commanded to burn every tree to the ground',
      'They were told to uproot all orchards and throw them in the river',
      'They were instructed to spray salt on the soil'
    ],
    correctAnswer: 'They were forbidden from cutting down fruit trees because trees provide food and are not enemy soldiers',
    explanation: 'Deuteronomy 20:19 provided an ancient ecological protection law: "Are the trees in the field people, that you should besiege them?" protecting fruit trees from war destruction.',
    socraticHint: 'What specific protection did God decree for fruit-bearing trees even during warfare?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-023',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'What is soil conservation, and why is it a moral obligation for agricultural communities in Kenya?',
    options: [
      'Preventing the washing away of fertile topsoil through terracing and mulching so that families can sustainably produce food',
      'Covering farmland with tarpaulins to prevent sunshine from touching the dirt',
      'Selling topsoil to construction companies for cash',
      'Removing all vegetation from hilltops to let rain wash freely'
    ],
    correctAnswer: 'Preventing the washing away of fertile topsoil through terracing and mulching so that families can sustainably produce food',
    explanation: 'Soil conservation preserves fertile earth, safeguards food security, prevents famine, and honors God’s gift of fertile land.',
    socraticHint: 'Why is preventing topsoil erosion through terraces and tree planting vital for food security?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u1-024',
    subStrandId: 'substrand-g6-cre-u1',
    lessonId: 'lesson-g6-cre-u1-l2',
    text: 'How can a church congregation in Kenya actively demonstrate creation stewardship within their community?',
    options: [
      'By organizing solar energy installation, community tree-planting days, and water-harvesting systems',
      'By dumping uncollected parish trash on public roadsides',
      'By preaching that environmental care is an ungodly distraction',
      'By cutting down church trees to make room for car parks'
    ],
    correctAnswer: 'By organizing solar energy installation, community tree-planting days, and water-harvesting systems',
    explanation: 'Churches serve as powerful models of moral stewardship by adopting renewable energy, harvesting rainwater, planting communal woodlots, and training youth in conservation.',
    socraticHint: 'What practical green initiatives can a church implement to show environmental leadership?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },

  // --- Unit 2: Stewardship of Talents & Ethical Digital Living (q-g6-cre-u2-001 to 024) ---
  {
    id: 'q-g6-cre-u2-001',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'In the Parable of the Talents (Matthew 25:14-30), how did the master distribute the talents to his three servants?',
    options: [
      'Each servant according to their own ability (five, two, and one)',
      'Equally giving each servant ten talents',
      'By rolling dice and giving everything to the youngest servant',
      'Giving all talents only to the third servant'
    ],
    correctAnswer: 'Each servant according to their own ability (five, two, and one)',
    explanation: 'Matthew 25:15 records that the master gave five talents to one, two to another, and one to another, "each according to his own ability," highlighting personalized trust.',
    socraticHint: 'How did the master decide how many talents to give each servant before traveling?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-002',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What did the first two servants do with the talents entrusted to them by their master?',
    options: [
      'They worked diligently, traded, and doubled what they had received',
      'They threw a lavish feast and spent all the money in one night',
      'They buried the money under a stone wall',
      'They gave all the money away to rival merchants'
    ],
    correctAnswer: 'They worked diligently, traded, and doubled what they had received',
    explanation: 'Both the five-talent and two-talent servants traded actively, doubling their master’s resources and earning high commendation upon his return.',
    socraticHint: 'Did the first two servants multiply their master’s investment or hide it away?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-003',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What commendation did the master give to the faithful servants upon his return?',
    options: [
      '"Well done, good and faithful servant! You were faithful with a few things; I will put you in charge of many things"',
      '"Why did you bother doing any work while I was away?"',
      '"Give all your profits back and leave my estate"',
      '"You should have buried the money safely like the third servant"'
    ],
    correctAnswer: '"Well done, good and faithful servant! You were faithful with a few things; I will put you in charge of many things"',
    explanation: 'The master rewarded their faithfulness with higher responsibility and invited them to share in the master’s joy (Matthew 25:21).',
    socraticHint: 'What praise did the master give to the servants who diligently grew their talents?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-004',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'Why did the third servant bury his single talent in the ground instead of putting it to productive use?',
    options: [
      'He was paralyzed by fear, laziness, and a false perception of his master as a harsh man',
      'The bank refused to accept his money',
      'He was robbed by bandits along the highway',
      'The master had ordered him to bury it in secret'
    ],
    correctAnswer: 'He was paralyzed by fear, laziness, and a false perception of his master as a harsh man',
    explanation: 'Fear, lethargy, and a bitter attitude led the third servant to hide his talent, wasting his opportunity and failing his master’s trust.',
    socraticHint: 'What negative emotions caused the third servant to dig a hole and bury his talent?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-005',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What core spiritual principle is taught by the Parable of the Talents regarding God-given gifts?',
    options: [
      'God expects every believer to develop, multiply, and use their gifts for His glory and service, and we will be held accountable',
      'It is safer to hide our abilities so we never make mistakes',
      'Only wealthy people receive gifts from God',
      'God doesn’t care whether we use our talents or waste them'
    ],
    correctAnswer: 'God expects every believer to develop, multiply, and use their gifts for His glory and service, and we will be held accountable',
    explanation: 'The parable teaches that God endows each person with gifts, expects fruitful stewardship, and will call every individual to account for their faithfulness.',
    socraticHint: 'What does Jesus teach about our duty to actively develop and use the gifts God gave us?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-006',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'According to 1 Peter 4:10, what is the ultimate purpose of whatever spiritual gift or talent a believer has received?',
    options: [
      'To serve others as faithful stewards of God’s varied grace',
      'To boast and make other people feel inferior',
      'To accumulate personal wealth without sharing with anyone',
      'To charge fellow church members for every good deed'
    ],
    correctAnswer: 'To serve others as faithful stewards of God’s varied grace',
    explanation: '1 Peter 4:10 clearly states: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms."',
    socraticHint: 'Who should benefit when you use your God-given musical, academic, or leadership talents?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-007',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'In Romans 12:6-8, the Apostle Paul lists diverse gifts given by the Holy Spirit. How should believers view differences in talents among peers?',
    options: [
      'As complementary parts of one body in Christ, where every unique role is valuable and needed',
      'As a competition where only academic talent matters',
      'As a reason to boast and mock those with quieter gifts',
      'As a sign that God loves some children more than others'
    ],
    correctAnswer: 'As complementary parts of one body in Christ, where every unique role is valuable and needed',
    explanation: 'Paul teaches that the Church is like a human body: diverse members have distinct functions (prophecy, serving, teaching, encouraging, giving), all essential for the whole.',
    socraticHint: 'How does the metaphor of the human body teach us that all different gifts are valuable?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-008',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What Old Testament craftsman was filled with the Spirit of God with wisdom, understanding, and skill in all manner of artistic crafts to build the Tabernacle (Exodus 31:1-5)?',
    options: [
      'Bezalel son of Uri',
      'King Nebuchadnezzar',
      'Goliath of Gath',
      'Pontius Pilate'
    ],
    correctAnswer: 'Bezalel son of Uri',
    explanation: 'Exodus 31:2-3 records that God specifically appointed Bezalel and filled him with the divine Spirit with artistic craftsmanship in gold, silver, stone, and wood.',
    socraticHint: 'Which skilled artisan was divinely inspired by the Holy Spirit to craft the Tabernacle furnishings?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-009',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'How can a pupil with musical or choral talent use it in a Christian way at school?',
    options: [
      'By singing uplifting songs that encourage classmates, leading worship, and comforting those who are sad',
      'By refusing to sing unless paid a large fee',
      'By singing derogatory songs to insult other students',
      'By using their voice only to disrupt classes'
    ],
    correctAnswer: 'By singing uplifting songs that encourage classmates, leading worship, and comforting those who are sad',
    explanation: 'Using musical ability to bring hope, praise God, and bring solace to struggling peers reflects faithful Christian talent stewardship.',
    socraticHint: 'How does sharing musical gifts bring peace and encouragement to the school community?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-010',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What danger exists when a young person becomes excessively proud and arrogant because of their sporting or academic talents?',
    options: [
      'They forget that all abilities are gifts from God, risking moral fall and alienating friends',
      'Their talent automatically doubles overnight',
      'They become immune to all mistakes in examinations',
      'They are immediately appointed head of school'
    ],
    correctAnswer: 'They forget that all abilities are gifts from God, risking moral fall and alienating friends',
    explanation: 'Proverbs 16:18 warns: "Pride goes before destruction, a haughty spirit before a fall." Christian talent stewardship requires humility and gratitude.',
    socraticHint: 'Why does arrogance about our natural talents violate the Christian value of humility?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-011',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'What advice does Colossians 3:23 give regarding how Christians should approach their studies and work tasks?',
    options: [
      '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"',
      '"Do the bare minimum just to avoid getting caught"',
      '"Only work hard when someone offers you money"',
      '"Let other students do your homework for you"'
    ],
    correctAnswer: '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"',
    explanation: 'Colossians 3:23 inspires wholehearted diligence, excellence, and integrity in all work and study, performing every task as unto God.',
    socraticHint: 'For whom should a Christian work wholeheartedly in every school task?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-012',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l1',
    text: 'How did young David demonstrate faithful stewardship of his shepherd boy abilities before he faced Goliath (1 Samuel 17:34-37)?',
    options: [
      'He diligently protected his father’s sheep from a lion and a bear, relying on God’s deliverance',
      'He ran away and let the wolves eat the entire flock',
      'He sold his father’s flock to buy weapons in town',
      'He refused to tend sheep because he wanted to be king immediately'
    ],
    correctAnswer: 'He diligently protected his father’s sheep from a lion and a bear, relying on God’s deliverance',
    explanation: 'David was faithful in the small, dangerous duties of shepherding, which prepared him in courage and faith to defeat Goliath in the public arena.',
    socraticHint: 'How did David’s courage in protecting his father’s sheep prepare him for bigger challenges?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-013',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What is cyberbullying, and why is it a severe violation of Christian love and moral values?',
    options: [
      'Using digital platforms, texts, or social media to harass, intimidate, humiliate, or spread lies about someone',
      'Sharing homework notes in a school study WhatsApp group',
      'Sending birthday greetings to a distant relative online',
      'Playing an educational mathematics quiz game on a computer'
    ],
    correctAnswer: 'Using digital platforms, texts, or social media to harass, intimidate, humiliate, or spread lies about someone',
    explanation: 'Cyberbullying causes deep emotional pain, depression, and psychological trauma, violating Christ’s command to love our neighbors as ourselves.',
    socraticHint: 'What destructive behavior uses internet devices to insult, threaten, or mock others online?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-014',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'Which biblical commandment is directly violated when a person forwards unverified gossip, defamatory rumors, or fake news online?',
    options: [
      'The Ninth Commandment: "You shall not bear false witness against your neighbor" (Exodus 20:16)',
      'The Fourth Commandment: "Remember the Sabbath day"',
      'The Fifth Commandment: "Honor your father and mother"',
      'The First Commandment: "You shall have no other gods before me"'
    ],
    correctAnswer: 'The Ninth Commandment: "You shall not bear false witness against your neighbor" (Exodus 20:16)',
    explanation: 'Spreading lies, gossip, or unverified rumors online is bearing false witness, destroying innocent reputations and promoting dishonesty.',
    socraticHint: 'Which of the Ten Commandments forbids telling lies or false stories about another person?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-015',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What guidance does Ephesians 4:29 give regarding how Christians should communicate in person and on digital social media?',
    options: [
      '"Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs"',
      '"Post whatever cruel insult you think of to get more likes"',
      '"Attack anyone who disagrees with you using foul language"',
      '"Only communicate using secret anonymous accounts"'
    ],
    correctAnswer: '"Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs"',
    explanation: 'Ephesians 4:29 calls Christians to speak and post words that edify, encourage, build up, and impart grace to those who read or hear them.',
    socraticHint: 'What kind of words should come out of a Christian’s mouth and social media posts according to Ephesians?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-016',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What should a Christian pupil do if they receive an inappropriate, harmful, or immoral image or message on a phone?',
    options: [
      'Do not forward it; delete it immediately, and report the incident to a trusted parent or teacher',
      'Forward it to all friends in the class WhatsApp group',
      'Save it secretly and blackmail the sender for money',
      'Post it on public social media for strangers to view'
    ],
    correctAnswer: 'Do not forward it; delete it immediately, and report the incident to a trusted parent or teacher',
    explanation: 'Stopping the chain of inappropriate material, refusing to circulate it, and seeking adult guidance protects purity, privacy, and personal safety.',
    socraticHint: 'What is the safest, most responsible response when immoral or inappropriate media appears on your phone?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-017',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What is a "digital footprint", and why should a Christian learner be mindful of what they post online?',
    options: [
      'The permanent record of all photos, comments, and posts left online, which can affect future relationships and reflects personal character',
      'The size of shoes worn while operating a laptop computer',
      'A software program that automatically cleans dust off a smartphone',
      'A digital map showing running paths in sports athletics'
    ],
    correctAnswer: 'The permanent record of all photos, comments, and posts left online, which can affect future relationships and reflects personal character',
    explanation: 'Online activity leaves a permanent digital footprint that can never be entirely erased; Christians should ensure their online record reflects integrity and honor.',
    socraticHint: 'What permanent trail of data and messages do we leave behind whenever we post on the internet?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-018',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'How does digital addiction (spending 8+ hours playing mobile games and scrolling social media) harm a student’s spiritual and physical well-being?',
    options: [
      'It leads to neglect of prayer, academic studies, physical exercise, real family relationships, and causes sleep deprivation',
      'It guarantees top marks in national KPSEA examinations',
      'It makes the body physically stronger and enhances eyesight',
      'It brings pupils closer to God automatically without effort'
    ],
    correctAnswer: 'It leads to neglect of prayer, academic studies, physical exercise, real family relationships, and causes sleep deprivation',
    explanation: 'Excessive screen addiction robs time from prayer, physical health, family conversation, and schoolwork, creating spiritual and relational dryness.',
    socraticHint: 'What important life priorities get neglected when a child is glued to a screen all day?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-019',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What biblical truth from Psalm 139:1-4 reminds Christians about God’s awareness of our online activities?',
    options: [
      'God knows all our thoughts, words, and actions, even in secret online spaces',
      'God cannot see what happens on electronic computer screens',
      'God only watches people when they are inside a church building',
      'God forgets everything that is deleted from a phone memory'
    ],
    correctAnswer: 'God knows all our thoughts, words, and actions, even in secret online spaces',
    explanation: 'Psalm 139 reminds us of God’s omniscience: "Before a word is on my tongue, you, Lord, know it completely." God observes all digital interactions.',
    socraticHint: 'Does God’s all-knowing presence see what we do in private on digital devices?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-020',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'Under Kenya’s Computer Misuse and Cybercrimes Act, what legal consequences exist for sharing non-consensual private photos or stalking someone online?',
    options: [
      'It is a serious criminal offense punishable by heavy financial fines and imprisonment',
      'It is rewarded with cash bonuses by internet service providers',
      'It is completely legal and encouraged by Kenyan laws',
      'It only results in a minor warning from the local chief'
    ],
    correctAnswer: 'It is a serious criminal offense punishable by heavy financial fines and imprisonment',
    explanation: 'Kenyan law strictly penalizes cyber-harassment, sharing intimate images without consent, and online stalking with severe fines and prison terms.',
    socraticHint: 'What does the law in Kenya do to individuals who harass, blackmail, or stalk others online?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-021',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'How can young Christians use digital media as a positive tool for the Kingdom of God?',
    options: [
      'Sharing inspirational Bible verses, promoting peace and charity, creating educational content, and encouraging peers',
      'Creating anonymous parody accounts to mock school teachers',
      'Spreading sectarian tribal hostility on social platforms',
      'Stealing classmates’ passwords to hack their accounts'
    ],
    correctAnswer: 'Sharing inspirational Bible verses, promoting peace and charity, creating educational content, and encouraging peers',
    explanation: 'Digital tools can be powerful instruments for evangelism, peacebuilding, charitable fundraisers, and sharing the hope of the Gospel.',
    socraticHint: 'How can smartphones and the internet be used to bless and uplift others constructively?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-022',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What is "phishing" or online identity theft, and why should pupils exercise discernment regarding strange links?',
    options: [
      'Fraudulent attempts by scammers to steal private personal details, passwords, and money through deceptive links or messages',
      'Catching freshwater fish using a smartphone app',
      'A software program that automatically translates the Bible into Kiswahili',
      'A wireless device that connects computers to solar panels'
    ],
    correctAnswer: 'Fraudulent attempts by scammers to steal private personal details, passwords, and money through deceptive links or messages',
    explanation: 'Phishing involves cybercriminals tricking users into clicking fraudulent links to steal credentials or money, requiring vigilance and digital discernment.',
    socraticHint: 'What danger occurs when unknown online tricksters try to steal your passwords and identity?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-023',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'What Christian fruit of the Spirit (Galatians 5:22-23) is most needed when deciding when to put away smartphones and stop playing video games?',
    options: [
      'Self-control',
      'Anger',
      'Impatience',
      'Jealousy'
    ],
    correctAnswer: 'Self-control',
    explanation: 'Self-control enables Christians to moderate screen time, prioritize real-world duties and spiritual life, and resist addictive digital impulses.',
    socraticHint: 'Which fruit of the Spirit gives us the discipline to govern our own desires and screen habits?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u2-024',
    subStrandId: 'substrand-g6-cre-u2',
    lessonId: 'lesson-g6-cre-u2-l2',
    text: 'In Philippians 4:8, Paul outlines a filter for Christian thinking: "Whatever is true, noble, right, pure, lovely, admirable... think about such things." How does this apply to online media consumption?',
    options: [
      'It guides us to choose online content that is pure, honest, and wholesome, while filtering out vulgarity, violence, and malice',
      'It means Christians must never use any computer or electronic device',
      'It encourages believers to consume dark and violent media as long as they pray afterwards',
      'It is only meant for reading printed books and has no relevance to screens'
    ],
    correctAnswer: 'It guides us to choose online content that is pure, honest, and wholesome, while filtering out vulgarity, violence, and malice',
    explanation: 'Philippians 4:8 provides the ultimate standard for digital consumption: guarding our minds by engaging only with content that is true, noble, and morally uplifting.',
    socraticHint: 'How does Paul’s list of pure and noble virtues serve as a filter for what we watch and read on our phones?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
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
  if (!world.learningAreaIds.includes('la-cre-g6')) {
    world.learningAreaIds.push('la-cre-g6');
  }
  if (world.totalMissions < 128) {
    world.totalMissions = 128;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 1 of Grade 6 CRE to cbe_database.json!');
