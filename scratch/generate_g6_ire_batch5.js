/**
 * Grade 6 Islamic Religious Education (IRE) - Batch 5 Generator
 * Content: Units 9 & 10 (Islamic Financial Ethics & Muamalat; Environmental Stewardship & Peaceful Coexistence)
 * Missions: Orders 145, 146, 147, 148 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-ire-u9-001 to q-g6-ire-u10-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 IRE Batch 5 (Units 9 & 10) ---');

// 1. Units 9 & 10 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ire-u9',
    strandId: 'strand-g6-ire-akhlaq',
    learningAreaId: 'la-ire-g6',
    title: 'Islamic Financial Ethics & Muamalat: Halal Earnings vs. Riba, Anti-Bribery & Fair Trade',
    name: 'Islamic Financial Ethics & Muamalat: Halal Earnings vs. Riba, Anti-Bribery & Fair Trade',
    description: 'Islamic principles governing economic transactions and commercial ethics (Muamalat): Seeking halal sustenance (Kasb al-Halal) as an act of worship; dignity of manual labor exemplified by the prophets (Prophet Dawud crafting chainmail, Prophet Muhammad trading and shepherding); absolute prohibition of Riba (usury, interest exploitation) and its destructive socioeconomic harms; warning against defrauding weights and measures (Tatfeef - Surah Al-Mutaffifeen); total condemnation of bribery (Rashwah) by the Prophet ("The curse of Allah is upon the one who gives a bribe and the one who accepts it"); honoring contractual obligations and debt management; honest advertising and integrity in mobile money and digital commerce in Kenya.',
    cbeCompetency: 'Financial integrity, economic justice, ethical consumerism, and anti-corruption advocacy',
    estimatedMinutes: 30,
    order: 9,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ire-u10',
    strandId: 'strand-g6-ire-akhlaq',
    learningAreaId: 'la-ire-g6',
    title: 'Environmental Ethics, Peaceful Coexistence & Nation Building in Kenya',
    name: 'Environmental Ethics, Peaceful Coexistence & Nation Building in Kenya',
    description: 'The holistic moral framework of Islam regarding nature, society, and citizenship: Environmental stewardship (Khilafah) as trustees of the earth; water conservation and anti-wastage even by running rivers; tree planting as ongoing continuous charity (Sadaqah Jariyah); animal welfare and compassion toward all living creatures; preserving public hygiene and cleaning roads (removal of harmful objects as a branch of Iman); interfaith tolerance and peaceful neighborliness with diverse communities; civic participation, combating substance abuse (narcotics, miraa/khat, alcohol) to protect human intellect (Hifdh al-Aql); promoting peace, equity, and national development across Kenya.',
    cbeCompetency: 'Environmental conservation, civic responsibility, peacebuilding, and moral health advocacy',
    estimatedMinutes: 30,
    order: 10,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ire-u9-l1',
    subStrandId: 'substrand-g6-ire-u9',
    title: 'Kasb al-Halal: The Dignity of Honest Labor & The Prohibition of Riba',
    content: 'Islam places great emphasis on financial purity, teaching that worship and character cannot be divorced from how money is earned.\n\n1. Kasb al-Halal (Seeking Pure, Permissible Livelihood):\n- The Prophet Muhammad (SAW) said: "Seeking halal livelihood is an obligation after the religious obligations."\n- Consuming halal food and income is a prerequisite for accepted prayers and du’as. The Prophet described a man traveling in dusty clothes lifting hands in du’a, but his food was haram, drink haram, and clothes haram: "How then could he be answered?"\n- Every prophet worked with their hands: Prophet Adam was a farmer, Prophet Nuh was a carpenter, Prophet Dawud made iron chainmail armor, and Prophet Muhammad was a shepherd and honest merchant.\n\n2. Prohibition of Riba (Usury and Exploitative Interest):\n- Riba means an unjustified increase on a loan without equal counter-value.\n- Harm of Riba: It concentrates wealth in the hands of a few, drives impoverished borrowers into cycles of debt slavery, and removes mutual compassion from society.\n- Surah Al-Baqarah (2:275) states: "Allah has permitted trade and forbidden interest."\n\n3. Tatfeef (Defrauding Weights & Measures):\n- Surah Al-Mutaffifeen warns of severe punishment for those who demand full measure when buying from others, but give less when selling to others.\n- Fair trade requires accurate weighing scales and complete transparency.',
    didYouKnow: 'Prophet Dawud (AS), despite being a powerful king, never ate food from the royal treasury; he made and sold chainmail coats with his own hands to feed his family!',
    kenyanContext: 'In Kenyan marketplaces like Gikomba and Kongowea, Muslim merchants build lasting trust by calibrating digital scales accurately and refusing to sell expired or tampered goods.',
    order: 17,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u9-l2',
    subStrandId: 'substrand-g6-ire-u9',
    title: 'Anti-Bribery (Rashwah), Debt Ethics & Digital Commerce Integrity',
    content: 'Justice and trustworthiness (Amanah) form the bedrock of social stability and honest economic life.\n\n1. Condemnation of Bribery (Rashwah):\n- The Prophet (SAW) firmly declared: "The curse of Allah is upon the one who gives a bribe (Al-Rashi) and the one who accepts it (Al-Murtashi)" (Reported in Abu Dawud & Tirmidhi).\n- Bribery perverts justice, deprives qualified people of jobs, compromises public safety (e.g., poor building construction), and rots society from within.\n- A gift given to a public official or teacher to influence their official duty is a disguised form of bribery (Ghulul).\n\n2. Honoring Debts and Contracts:\n- Muslims must fulfill all contracts and promises: "O you who believe! Fulfill your obligations" (Surah Al-Ma’idah 5:1).\n- When taking a debt, it should be recorded in writing with witnesses (Surah Al-Baqarah 2:282).\n- Delaying payment when one has the means is oppression (Zulm).\n\n3. Ethical Conduct in Modern Digital Commerce:\n- In modern mobile transactions (e.g., M-Pesa, online shops), honesty in describing items, prompt refunding of mistaken deposits, and avoiding misleading online advertisements are direct applications of Islamic commercial ethics.',
    didYouKnow: 'The Prophet Muhammad (SAW) said: "The truthful, trustworthy merchant will be on the Day of Judgment with the prophets, the truthful ones, and the martyrs!"',
    kenyanContext: 'Kenyan anti-corruption campaigns (EACC) resonate directly with the prophetic prohibition of Rashwah, teaching youth that national prosperity demands zero tolerance for bribes.',
    order: 18,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u10-l1',
    subStrandId: 'substrand-g6-ire-u10',
    title: 'Khilafah al-Ard: Islamic Environmental Stewardship & Compassion to Animals',
    content: 'Human beings are appointed as trustees (Khulafa’) over the earth, entrusted with conserving its natural ecosystems.\n\n1. The Earth as a Sacred Trust (Amanah):\n- Allah created nature in delicate balance (Mizan) and commanded: "Do not cause corruption on the earth after its reformation" (Surah Al-A’raf 7:56).\n\n2. Water Conservation:\n- The Prophet (SAW) strictly forbade wasting water, even when performing ablution (Wudu) at the bank of a flowing river!\n- Water is a shared gift for all creatures, and denying water to thirsty animals or humans is a grave sin.\n\n3. Planting Trees as Continuous Charity (Sadaqah Jariyah):\n- The Prophet (SAW) said: "Never does a Muslim plant a tree or sow seeds, from which a bird, human, or animal eats, but that it is regarded as a charity (Sadaqah) for him."\n- He even instructed: "If the Final Hour arrives while one of you has a palm shoot in his hand, if he can plant it before standing, let him plant it!"\n\n4. Kindness to Animals & Cleanliness:\n- A woman was granted forgiveness from Allah simply for drawing water from a deep well using her shoe to quench the thirst of a dying dog.\n- Another woman was punished in Hellfire for imprisoning a cat without food or water until it died.\n- Cleanliness (Taharah) extends to public environments: The Prophet said removing harmful thorns or litter from public roads is an act of charity and a branch of faith.',
    didYouKnow: 'Islam established protected green zones (Hima) around Makkah and Madinah where trees could not be cut down and animals could not be hunted, creating the world’s first nature conservation reserves!',
    kenyanContext: 'In Kenya, Muslim organizations partner with the Kenya Forest Service on national tree-planting days, embodying the prophetic mandate to green the earth as Sadaqah Jariyah.',
    order: 19,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ire-u10-l2',
    subStrandId: 'substrand-g6-ire-u10',
    title: 'Peaceful Coexistence, Protecting the Mind (Hifdh al-Aql) & Nation Building',
    content: 'A true Muslim is an active ambassador of peace, safety, and constructive contribution to their homeland.\n\n1. Definition of a True Muslim:\n- The Prophet (SAW) said: "The Muslim is the one from whose tongue and hand other Muslims (and humanity) are safe, and the believer is the one whom people trust with their lives and wealth."\n\n2. Neighborly Rights & Interfaith Coexistence:\n- Archangel Jibril repeatedly advised the Prophet to treat neighbors well until the Prophet thought the neighbor would be granted inheritance rights!\n- Islam commands kindness, fair dealings, and mutual respect toward non-Muslim neighbors (Surah Al-Mumtahanah 60:8).\n\n3. Protecting the Human Mind (Hifdh al-Aql):\n- One of the five primary higher objectives of Islamic Law (Maqasid al-Shari’ah) is safeguarding human intellect.\n- All intoxicants (Khamr), illegal narcotics, and harmful substance abuse (like miraa/khat) are prohibited because they destroy mental faculties, ruin physical health, drain family finances, and cause social dysfunction.\n\n4. Nation Building & Patriotism in Kenya:\n- Actively obeying lawful traffic regulations, protecting public schools and infrastructure, paying fair taxes, defending national security, and voting conscientiously are civic obligations grounded in Islamic values.',
    didYouKnow: 'The five fundamental objectives (Maqasid) protected by Islamic Shari’ah are: Preservation of Faith (Deen), Life (Nafs), Intellect (Aql), Family/Lineage (Nasl), and Wealth (Mal)!',
    kenyanContext: 'Muslim youth across Kenya take an active stand against substance abuse and join interfaith peace committees (such as the Inter-Religious Council of Kenya) to build a peaceful, united nation.',
    order: 20,
    durationMinutes: 15,
    learningAreaId: 'la-ire-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 145, 146, 147, 148 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-ire-u9-m1',
    worldId: 'world-faith-values',
    title: 'Mission 145: Pure Livelihood – Kasb al-Halal, Labor Dignity & Ban on Riba',
    description: 'Learn why seeking halal earnings is a high form of worship, emulate prophetic craftsmanship, and understand the destructive harm of usury and fraud.',
    order: 145,
    orderIndex: 145,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-halal-earnings',
    badge: 'badge-g6-ire-halal-earnings',
    lessonId: 'lesson-g6-ire-u9-l1',
    questionIds: [
      'q-g6-ire-u9-001', 'q-g6-ire-u9-002', 'q-g6-ire-u9-003', 'q-g6-ire-u9-004',
      'q-g6-ire-u9-005', 'q-g6-ire-u9-006', 'q-g6-ire-u9-007', 'q-g6-ire-u9-008',
      'q-g6-ire-u9-009', 'q-g6-ire-u9-010', 'q-g6-ire-u9-011', 'q-g6-ire-u9-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u9-m2',
    worldId: 'world-faith-values',
    title: 'Mission 146: Shield of Integrity – The Anti-Bribery Curse & Digital Ethics',
    description: 'Examine the prophetic condemnation of bribery (Rashwah), the obligation to fulfill debts, and maintaining truthfulness in modern mobile commerce.',
    order: 146,
    orderIndex: 146,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-anti-corruption',
    badge: 'badge-g6-ire-anti-corruption',
    lessonId: 'lesson-g6-ire-u9-l2',
    questionIds: [
      'q-g6-ire-u9-013', 'q-g6-ire-u9-014', 'q-g6-ire-u9-015', 'q-g6-ire-u9-016',
      'q-g6-ire-u9-017', 'q-g6-ire-u9-018', 'q-g6-ire-u9-019', 'q-g6-ire-u9-020',
      'q-g6-ire-u9-021', 'q-g6-ire-u9-022', 'q-g6-ire-u9-023', 'q-g6-ire-u9-024'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u10-m1',
    worldId: 'world-faith-values',
    title: 'Mission 147: Earth’s Trustees – Islamic Ecology, Tree Charity & Animal Mercy',
    description: 'Embrace the role of Khilafah, practice water conservation, plant trees as ongoing charity (Sadaqah Jariyah), and treat all animals with kindness.',
    order: 147,
    orderIndex: 147,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-eco-khilafah',
    badge: 'badge-g6-ire-eco-khilafah',
    lessonId: 'lesson-g6-ire-u10-l1',
    questionIds: [
      'q-g6-ire-u10-001', 'q-g6-ire-u10-002', 'q-g6-ire-u10-003', 'q-g6-ire-u10-004',
      'q-g6-ire-u10-005', 'q-g6-ire-u10-006', 'q-g6-ire-u10-007', 'q-g6-ire-u10-008',
      'q-g6-ire-u10-009', 'q-g6-ire-u10-010', 'q-g6-ire-u10-011', 'q-g6-ire-u10-012'
    ],
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'mission-g6-ire-u10-m2',
    worldId: 'world-faith-values',
    title: 'Mission 148: Guardians of Society – Coexistence, Mind Protection & Patriotism',
    description: 'Promote neighborly harmony, protect mental faculties from substance abuse, and actively contribute to peaceful nation building across Kenya.',
    order: 148,
    orderIndex: 148,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ire-peace-patriot',
    badge: 'badge-g6-ire-peace-patriot',
    lessonId: 'lesson-g6-ire-u10-l2',
    questionIds: [
      'q-g6-ire-u10-013', 'q-g6-ire-u10-014', 'q-g6-ire-u10-015', 'q-g6-ire-u10-016',
      'q-g6-ire-u10-017', 'q-g6-ire-u10-018', 'q-g6-ire-u10-019', 'q-g6-ire-u10-020',
      'q-g6-ire-u10-021', 'q-g6-ire-u10-022', 'q-g6-ire-u10-023', 'q-g6-ire-u10-024'
    ],
    learningAreaId: 'la-ire-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 9 Questions (q-g6-ire-u9-001 to q-g6-ire-u9-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u9-001',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'What does the term "Kasb al-Halal" mean in Islamic ethics?',
    options: [
      'Earning a livelihood through honest, lawful, and ethical means',
      'Borrowing money from banks with compound interest',
      'Acquiring wealth through lotteries and gambling',
      'Relying entirely on street begging without working'
    ],
    correctAnswer: 'Earning a livelihood through honest, lawful, and ethical means',
    explanation: 'Kasb al-Halal refers to working and trading through pure, permissible methods, which Islam considers a compulsory duty following obligatory worship.',
    socraticHint: 'Which concept refers to seeking pure, lawful income through honest labor?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-002',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'Which craft or trade did Prophet Dawud (AS) perform with his hands to earn his daily bread?',
    options: ['Making chainmail coats of armor', 'Carpentry and shipbuilding', 'Tailoring fine silks', 'Baking bread'],
    correctAnswer: 'Making chainmail coats of armor',
    explanation: 'Allah blessed Prophet Dawud with the ability to soften iron, and he manufactured protective chainmail armor to earn his sustenance rather than taking from the state treasury.',
    socraticHint: 'Which prophet worked with softened iron to craft defensive body armor?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-003',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'How does consuming haram (unlawful) earnings negatively impact a Muslim’s spiritual life according to Hadith?',
    options: [
      'It causes their supplications (du’as) and good deeds to be rejected by Allah',
      'It automatically makes their physical eyesight weak',
      'It shortens their biological height',
      'It has no spiritual effect as long as they pray five times daily'
    ],
    correctAnswer: 'It causes their supplications (du’as) and good deeds to be rejected by Allah',
    explanation: 'The Prophet described a desperate traveler praying for help, but because his food, drink, and clothes were from haram earnings, his prayers went unanswered.',
    socraticHint: 'What happens to a person’s prayers when their food, drink, and income are tainted with haram?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-004',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'What is the definition of "Riba" in Islamic jurisprudence?',
    options: [
      'Usury or unjustified interest charged on a debt or loan without equal counter-value',
      'Fair profit earned from selling legitimate merchandise',
      'Voluntary gifts given during weddings',
      'Donations made to build a public school'
    ],
    correctAnswer: 'Usury or unjustified interest charged on a debt or loan without equal counter-value',
    explanation: 'Riba is an unlawful increase or surplus charged on loans or specific exchanges, exploiting borrowers without risk sharing or productive trade.',
    socraticHint: 'Which Arabic term designates unfair financial interest charged on money loaned?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-005',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'What clear distinction does Surah Al-Baqarah (2:275) establish between trade and interest?',
    options: [
      '"Allah has permitted trade and forbidden interest (Riba)"',
      '"Trade and interest are identical in all circumstances"',
      '"Both trade and interest are strictly forbidden in Islam"',
      '"Interest is permitted only for wealthy traders"'
    ],
    correctAnswer: '"Allah has permitted trade and forbidden interest (Riba)"',
    explanation: 'The Qur’an decisively rejects the claim that trade is like interest, establishing that productive risk-sharing commerce is lawful while exploitative lending (Riba) is unlawful.',
    socraticHint: 'Recall the definitive statement from Surah Al-Baqarah verse 275.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-006',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'Which chapter of the Holy Qur’an begins with a stern warning against those who defraud people in weights and measures?',
    options: ['Surah Al-Mutaffifeen (The Defrauders)', 'Surah Al-Qari’ah', 'Surah Al-Humazah', 'Surah Al-Masad'],
    correctAnswer: 'Surah Al-Mutaffifeen (The Defrauders)',
    explanation: 'Surah Al-Mutaffifeen opens: "Woe to those who give less than due! Who, when they take measure from people, take in full; but if they give by measure or weight to them, they cause loss."',
    socraticHint: 'Which Surah’s name literally translates to "Those Who Give Short Measure"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-007',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'How does cheating on weighing scales (Tatfeef) harm the wider economic society?',
    options: [
      'It destroys consumer trust, creates inflation, and cheats ordinary citizens of their hard-earned money',
      'It stimulates rapid industrial manufacturing',
      'It guarantees prosperity and abundance for all traders',
      'It lowers agricultural transport costs'
    ],
    correctAnswer: 'It destroys consumer trust, creates inflation, and cheats ordinary citizens of their hard-earned money',
    explanation: 'Short-changing customers erodes trust in marketplaces, cheats vulnerable families, and brings divine wrath and loss of barakah on the commercial sector.',
    socraticHint: 'What happens to public trust in markets when shopkeepers tamper with scales?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-008',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'What profession was practiced by Prophet Nuh (AS) demonstrating that manual crafts carry great dignity?',
    options: ['Carpentry and shipbuilding', 'Mining copper', 'Pottery', 'Weaving wool'],
    correctAnswer: 'Carpentry and shipbuilding',
    explanation: 'Prophet Nuh built the massive Ark with his own hands under divine instruction, demonstrating the honorable status of carpentry and physical craftsmanship.',
    socraticHint: 'Which trade involves woodcraft and ship construction?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-009',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'Why does Islam strictly prohibit predatory loan sharking that traps low-income families in perpetual compounding interest?',
    options: [
      'Because it extracts unfair wealth through exploitation and drives families into poverty and despair',
      'Because banks are forbidden from keeping written records',
      'Because money can only be stored in gold vaults',
      'Because borrowers should not be required to pay back the principal loan'
    ],
    correctAnswer: 'Because it extracts unfair wealth through exploitation and drives families into poverty and despair',
    explanation: 'Predatory lending takes unfair advantage of people’s desperation, causing economic injustice, emotional torment, and social breakdown.',
    socraticHint: 'How does usury exploit the vulnerable rather than helping them?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-010',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'When a merchant in a grain market concealed damp, spoiled grain beneath dry grain, what did Prophet Muhammad (SAW) tell him?',
    options: [
      '"Whoever cheats us is not one of us" (Man ghash-shana fa laysa minna)',
      '"Mix it well so customers cannot detect it"',
      '"Charge double price because water makes it heavier"',
      '"Sell it quickly before the sun dries it"'
    ],
    correctAnswer: '"Whoever cheats us is not one of us" (Man ghash-shana fa laysa minna)',
    explanation: 'The Prophet plunged his hand into the grain heap and felt moisture; he rebuked the seller: "Why didn’t you put it on top so people could see it? Whoever cheats is not from us!"',
    socraticHint: 'Recall the famous prophetic warning against deceiving customers by hiding defects.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-011',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'What noble station is promised to the truthful and trustworthy Muslim trader on the Day of Judgment?',
    options: [
      'Standing in the company of the Prophets, the Truthful ones (Siddiqin), and Martyrs (Shuhada)',
      'Free passage through customs borders in the world',
      'Exemption from being buried in a cemetery',
      'Being given a palace made of silver coins'
    ],
    correctAnswer: 'Standing in the company of the Prophets, the Truthful ones (Siddiqin), and Martyrs (Shuhada)',
    explanation: 'Because conducting business with integrity requires great moral discipline against greed, the Prophet stated honest traders will stand with the highest ranks in Paradise.',
    socraticHint: 'With which three highest categories of righteous souls will honest merchants be raised?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-012',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l1',
    text: 'Rashid sells fruit in Mombasa. To maximize profits, he considers putting bruised mangoes at the bottom of the basket and ripe ones on top. What should he do according to Islamic ethics?',
    options: [
      'Separate the bruised mangoes, display them openly, and adjust the price transparently',
      'Hide the bruised ones under leaves so the customer buys without noticing',
      'Spray perfume on them to hide the sour odor',
      'Blame the delivery truck driver if the customer complains later'
    ],
    correctAnswer: 'Separate the bruised mangoes, display them openly, and adjust the price transparently',
    explanation: 'Islamic business ethics require total disclosure (Bayan) of defects; concealing spoiled goods is deception (Ghash), which invalidates the blessing of the sale.',
    socraticHint: 'How does an honest trader handle defective or damaged goods?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-ire-u9-013',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What did the Prophet Muhammad (SAW) say regarding bribery (Rashwah) in public service and governance?',
    options: [
      '"The curse of Allah is upon the one who gives a bribe and the one who accepts it"',
      '"Bribery is permissible if it speeds up paper processing"',
      '"Bribery is only forbidden if the amount exceeds 1,000 shillings"',
      '"Only the recipient of a bribe is blameworthy"'
    ],
    correctAnswer: '"The curse of Allah is upon the one who gives a bribe and the one who accepts it"',
    explanation: 'The Prophet placed divine curse upon both parties in bribery—the bribe-giver (Al-Rashi) and the bribe-taker (Al-Murtashi)—because it corrupts justice and institutional integrity.',
    socraticHint: 'Does the prophetic curse fall upon the giver, the taker, or both?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-014',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What is the Arabic term for gifts given to public officials or tax collectors to influence their official decisions?',
    options: ['Ghulul (Illicit misappropriation / Disguised bribery)', 'Zakat', 'Sadaqah', 'Waqf'],
    correctAnswer: 'Ghulul (Illicit misappropriation / Disguised bribery)',
    explanation: 'When a tax collector claimed gifts were given to him personally, the Prophet rebuked him: "Why didn’t he sit in his father’s house and see if gifts would be given to him?" Calling it Ghulul.',
    socraticHint: 'What did the Prophet call "gifts" given to people solely because of their public office?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-015',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What is the longest single verse in the Holy Qur’an (Surah Al-Baqarah 2:282), and what crucial financial topic does it address?',
    options: [
      'Ayat al-Dain (The Verse of Debt), commanding that debt contracts be recorded in writing with witnesses',
      'The verse of inheritance distribution',
      'The verse of Hajj rites in Mina',
      'The verse of fasting exemptions in travel'
    ],
    correctAnswer: 'Ayat al-Dain (The Verse of Debt), commanding that debt contracts be recorded in writing with witnesses',
    explanation: 'Ayat al-Dain is the longest verse in the Qur’an, providing meticulous instructions on recording financial debts in writing, securing fair witnesses, and protecting lenders and borrowers.',
    socraticHint: 'Which famous verse mandates writing down financial loans and having witnesses?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-016',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What did the Prophet Muhammad (SAW) say regarding a wealthy person who intentionally delays repaying debts to their creditor?',
    options: [
      '"Delay in repayment by a capable debtor is oppression (Zulm)"',
      '"They are entitled to a 50% discount on the debt"',
      '"It shows clever business negotiations"',
      '"They should be rewarded for preserving their capital"'
    ],
    correctAnswer: '"Delay in repayment by a capable debtor is oppression (Zulm)"',
    explanation: 'The Prophet stated: "Matlul ghaniyyi zulm" (Delaying repayment by a person who possesses the means to pay is injustice and oppression against the creditor).',
    socraticHint: 'How does Islam describe delaying debt payment when one has the money to pay?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-017',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'If a Kenyan citizen receives mobile money (like M-Pesa) mistakenly sent to their phone number by a stranger, what is their Islamic moral duty?',
    options: [
      'Immediately return the funds or cooperate with customer service to reverse the transaction to the rightful owner',
      'Withdraw the cash immediately and switch off the mobile phone',
      'Keep the money and claim it was a divine gift from heaven',
      'Share half of the mistaken money with friends'
    ],
    correctAnswer: 'Immediately return the funds or cooperate with customer service to reverse the transaction to the rightful owner',
    explanation: 'Mistaken deposits belong to someone else; keeping another person’s property without legal right is unlawful misappropriation (Batil), strictly prohibited in Islam.',
    socraticHint: 'How does honoring Amanah (trust) apply to mistakenly received mobile money?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-018',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What does the Qur’anic command in Surah Al-Ma’idah (5:1) "Awfoo bil-Uqood" demand from believers?',
    options: [
      '"Fulfill your contracts, covenants, and promises"',
      '"Break treaties whenever you gain military power"',
      '"Never trade with international foreigners"',
      '"Demand advance payment before doing any work"'
    ],
    correctAnswer: '"Fulfill your contracts, covenants, and promises"',
    explanation: '"Awfoo bil-Uqood" mandates keeping all commercial contracts, employment agreements, social treaties, and solemn promises with unwavering trustworthiness.',
    socraticHint: 'Translate the divine command "Awfoo bil-Uqood" regarding covenants and deals.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-019',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'Why does Islam forbid online sellers from posting heavily edited, fake, or misleading photographs of products they sell?',
    options: [
      'Because it constitutes Gharar (deception and misleading uncertainty), duping customers into buying under false pretenses',
      'Because digital photography is completely banned in all schools',
      'Because all items sold online must be given away for free',
      'Because customers prefer buying without seeing pictures'
    ],
    correctAnswer: 'Because it constitutes Gharar (deception and misleading uncertainty), duping customers into buying under false pretenses',
    explanation: 'Islamic law prohibits fraud (Tadlees) and excessive ambiguity (Gharar) in commerce; products must be accurately and honestly described to buyers.',
    socraticHint: 'Why is misleading buyers about the condition or appearance of products unlawful?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-020',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'How does paying bribes to bypass safety inspections during building construction in Kenyan cities lead to disastrous consequences?',
    options: [
      'Substandard materials pass inspection, causing building collapses that injure and kill innocent residents',
      'It creates faster architectural development without flaws',
      'It ensures lower rent prices for poor tenants',
      'It increases government tax revenue'
    ],
    correctAnswer: 'Substandard materials pass inspection, causing building collapses that injure and kill innocent residents',
    explanation: 'Bribery compromises safety regulations and code enforcement, resulting in weak structures that collapse and destroy human lives.',
    socraticHint: 'What happens when corrupt inspectors overlook building defects in exchange for bribes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-021',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What should a creditor do if a debtor is genuinely destitute and experiencing severe financial hardship, according to Surah Al-Baqarah (2:280)?',
    options: [
      'Grant them an extension until a time of ease, and forgiving the debt as charity is even better',
      'Lock them in prison and confiscate their children’s clothing',
      'Charge double compounding interest for every week delayed',
      'Demand public humiliation in the town square'
    ],
    correctAnswer: 'Grant them an extension until a time of ease, and forgiving the debt as charity is even better',
    explanation: 'The Qur’an states: "And if someone is in hardship, then let there be postponement until a time of ease. And if you give it as charity, that is better for you if you only knew."',
    socraticHint: 'What compassionate advice does Surah Al-Baqarah give when a debtor genuinely cannot pay?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-022',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'How can a student practice anti-bribery ethics within the school environment?',
    options: [
      'Never offer sweets, money, or favors to class prefects or monitors to escape punishment for misbehavior',
      'Refuse to share class revision books with friends',
      'Pay class monitors fifty shillings to skip morning cleaning duties',
      'Ask parents to buy luxury gifts for exam markers'
    ],
    correctAnswer: 'Never offer sweets, money, or favors to class prefects or monitors to escape punishment for misbehavior',
    explanation: 'Integrity begins in childhood: trying to influence prefects or monitors with bribes to conceal bad behavior corrupts school discipline and mimics adult bribery.',
    socraticHint: 'How do students improperly try to influence school leaders or avoid rules?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-023',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'Why did Prophet Muhammad (SAW) refuse to lead funeral prayers over deceased individuals who left behind unpaid debts without collateral or settlement?',
    options: [
      'To highlight the extreme seriousness of settling financial debts before facing Allah',
      'Because debtors were forbidden from having a Muslim burial',
      'Because the Prophet did not like attending funerals',
      'Because debts are automatically erased upon death'
    ],
    correctAnswer: 'To highlight the extreme seriousness of settling financial debts before facing Allah',
    explanation: 'Until companions volunteered to pay off the deceased’s debts, the Prophet asked others to pray over them to demonstrate to the living that debt must never be taken lightly.',
    socraticHint: 'Why did the Prophet stress that human debts must be repaid before meeting God?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u9-024',
    subStrandId: 'substrand-g6-ire-u9',
    lessonId: 'lesson-g6-ire-u9-l2',
    text: 'What virtue allows an entrepreneur to succeed sustainably in Kenya while honoring both KICD ethics and Islamic Muamalat values?',
    options: [
      'Amanah (Trustworthiness) and transparency in every transaction',
      'Aggressive monopoly tactics that ruin competitors',
      'Tax evasion and keeping double account books',
      'Relying on counterfeit products'
    ],
    correctAnswer: 'Amanah (Trustworthiness) and transparency in every transaction',
    explanation: 'Amanah builds lasting customer loyalty, invites divine barakah, and fulfills civic responsibilities to Kenya’s national economic vision.',
    socraticHint: 'Which supreme ethical quality creates trust between buyers and sellers?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },

  // --- Unit 10 Questions (q-g6-ire-u10-001 to q-g6-ire-u10-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-ire-u10-001',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What Islamic concept describes humanity’s role as trustees and custodians over the earth and its environment?',
    options: ['Khilafah (Stewardship/Trusteeship)', 'Istisqa', 'Hijrah', 'Shura'],
    correctAnswer: 'Khilafah (Stewardship/Trusteeship)',
    explanation: 'In Surah Al-Baqarah (2:30), Allah declares humans as "Khalifah" (trustees) on earth, meaning we are responsible for protecting nature, not destroying or polluting it.',
    socraticHint: 'Which term means being appointed as a responsible vicegerent or trustee of the earth?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-002',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What did the Prophet Muhammad (SAW) tell Sa’d ibn Abi Waqqas when he saw him using excessive water for Wudu (ablution)?',
    options: [
      '"Do not be wasteful, even if you are by the bank of a flowing river"',
      '"Water from rivers is unlimited so use as much as you like"',
      '"Wudu with river water is invalid"',
      '"Only wash the face once when traveling"'
    ],
    correctAnswer: '"Do not be wasteful, even if you are by the bank of a flowing river"',
    explanation: 'The Prophet taught that extravagance (Israf) in natural resources is forbidden even when resources appear abundant, establishing conservation as a spiritual habit.',
    socraticHint: 'What rule did the Prophet set about wasting water even next to a running river?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-003',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'According to prophetic Hadith, what reward does a person receive when birds, animals, or humans eat fruit from a tree they planted?',
    options: [
      'It is counted as ongoing charity (Sadaqah) for them even after they pass away',
      'They receive financial compensation from the municipal council',
      'The birds become their domestic servants',
      'They are excused from attending school'
    ],
    correctAnswer: 'It is counted as ongoing charity (Sadaqah) for them even after they pass away',
    explanation: 'The Prophet stated: "There is no Muslim who plants a tree or sows a seed, from which a bird, human, or beast eats, except that it is recorded as Sadaqah for him."',
    socraticHint: 'How does planting trees serve as an ongoing act of spiritual charity (Sadaqah Jariyah)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-004',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What famous instruction did Prophet Muhammad (SAW) give regarding planting a sapling even if the Day of Resurrection begins?',
    options: [
      '"If the Final Hour arrives while one of you holds a palm shoot, if he can plant it before standing, let him plant it!"',
      '"Drop everything and run away into the mountains"',
      '"Burn all agricultural plants immediately"',
      '"Do not bother planting because the world is ending"'
    ],
    correctAnswer: '"If the Final Hour arrives while one of you holds a palm shoot, if he can plant it before standing, let him plant it!"',
    explanation: 'This remarkable Hadith teaches that working productively and nurturing the earth must continue until the very last breath, rejecting despair and passivity.',
    socraticHint: 'What should a believer do with a palm shoot even if the Day of Judgment strikes?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-005',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'Why was a sinful man forgiven by Allah and granted Paradise according to a well-known Hadith?',
    options: [
      'He climbed down into a deep well to draw water in his shoe and quench the thirst of a dying dog',
      'He won a physical wrestling match in the market',
      'He donated fifty camels to the army',
      'He built a tall marble tower'
    ],
    correctAnswer: 'He climbed down into a deep well to draw water in his shoe and quench the thirst of a dying dog',
    explanation: 'The Prophet explained that Allah appreciated the man’s compassion toward a suffering, thirsty dog, forgave his sins, and admitted him to Jannah.',
    socraticHint: 'Which small animal did the traveler save from dying of thirst at the well?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-006',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'Why was a woman punished in Hellfire as recounted by the Prophet Muhammad (SAW)?',
    options: [
      'She imprisoned a cat without feeding it or letting it hunt for its own food until it starved to death',
      'She lost a library book',
      'She arrived late to school',
      'She refused to trade with neighboring villages'
    ],
    correctAnswer: 'She imprisoned a cat without feeding it or letting it hunt for its own food until it starved to death',
    explanation: 'Cruelty to animals is a severe sin in Islam; the woman locked up the cat until it died of hunger and thirst, earning divine punishment.',
    socraticHint: 'Which animal did the cruel woman neglect and lock away without food?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-007',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What did the Prophet (SAW) classify the removal of harmful objects (thorns, glass, garbage) from the road as?',
    options: [
      'An act of charity (Sadaqah) and a branch of faith (Iman)',
      'A punishment for students who misbehave',
      'An unnecessary waste of time',
      'A task only for paid municipal street sweepers'
    ],
    correctAnswer: 'An act of charity (Sadaqah) and a branch of faith (Iman)',
    explanation: 'The Prophet taught: "Removing harm from the road is a charity" and designated it as one of the seventy-plus branches of faith (Iman).',
    socraticHint: 'How does cleaning roads and removing litter connect directly with faith (Iman)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-008',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What was the environmental conservation zone established by the Prophet around Madinah called, where cutting trees and hunting animals was banned?',
    options: ['Al-Hima (Sanctuary / Conservation Zone)', 'Al-Bazar', 'Al-Muqata’ah', 'Al-Dar'],
    correctAnswer: 'Al-Hima (Sanctuary / Conservation Zone)',
    explanation: 'Al-Hima was a protected ecosystem where green trees could not be felled and wild game could not be killed, establishing early protected wilderness areas.',
    socraticHint: 'Which Arabic term refers to a protected natural sanctuary or reserve?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-009',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'Why does Islam strictly forbid polluting stagnant water sources (wells, ponds, pools)?',
    options: [
      'It spreads diseases (like cholera and typhoid) and deprives other humans and animals of clean drinking water',
      'It turns the water salty',
      'It makes fish grow too large',
      'Because stagnant water is always boiling hot'
    ],
    correctAnswer: 'It spreads diseases (like cholera and typhoid) and deprives other humans and animals of clean drinking water',
    explanation: 'The Prophet specifically forbade urinating in stagnant water or shaded pathways, protecting public health and sanitation from harmful pathogens.',
    socraticHint: 'How does polluting water sources spread deadly waterborne epidemics?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-010',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'What does the Qur’anic phrase "Inna kulla shay’in khalaqnahu bi-qadar" (Surah Al-Qamar 54:49) teach about the natural world?',
    options: [
      'Allah has created everything in perfect measure and delicate balance (ecological harmony)',
      'Nature was created at random without purpose',
      'Humans are allowed to destroy forests without limit',
      'Wild animals have no rights in creation'
    ],
    correctAnswer: 'Allah has created everything in perfect measure and delicate balance (ecological harmony)',
    explanation: 'The verse reminds humanity that creation is designed with divine precision and balance (Mizan); disrupting ecosystems brings climate crises and suffering.',
    socraticHint: 'What does creation in "Qadar" mean regarding ecological balance and design?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-011',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'How can a Kenyan primary school environmental club implement prophetic eco-ethics on school grounds?',
    options: [
      'By planting indigenous shade trees, setting up water-saving taps, and running litter clean-up days',
      'By burning plastic bags behind the classrooms to produce smoke',
      'By cutting down existing school trees to make firewood',
      'By throwing sweet wrappers on flowerbeds'
    ],
    correctAnswer: 'By planting indigenous shade trees, setting up water-saving taps, and running litter clean-up days',
    explanation: 'Active eco-stewardship (Khilafah) involves practical actions like reforestation, preventing water wastage, and keeping school compounds clean.',
    socraticHint: 'Which practical school activities protect nature and conserve water?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-012',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l1',
    text: 'When slaughtering an animal for food, what humane rule did Prophet Muhammad (SAW) institute to prevent animal suffering?',
    options: [
      'Sharpen the blade thoroughly and give the animal comfort, never sharpening the blade in front of it',
      'Use a dull knife to prolong the cut',
      'Slaughter the animal in view of other animals to terrify them',
      'Starve the animal for three days before slaughter'
    ],
    correctAnswer: 'Sharpen the blade thoroughly and give the animal comfort, never sharpening the blade in front of it',
    explanation: 'The Prophet commanded Ihsan (perfection and kindness) in everything: "When you slaughter, slaughter well; let one of you sharpen his blade and spare suffering to the animal."',
    socraticHint: 'What prophetic guidelines ensure animal slaughter is swift and humane?',
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
    id: 'q-g6-ire-u10-013',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'How did Prophet Muhammad (SAW) describe the true Muslim in terms of social peace?',
    options: [
      '"The Muslim is the one from whose tongue and hand others are safe"',
      '"The Muslim is the one who dominates all arguments"',
      '"The Muslim is the one who only greets people of his own clan"',
      '"The Muslim is the one who isolates himself from society"'
    ],
    correctAnswer: '"The Muslim is the one from whose tongue and hand others are safe"',
    explanation: 'Islam defines a true Muslim by their non-violent conduct, peaceable speech, and ensuring that no fellow human is harmed by their actions or words.',
    socraticHint: 'Recall the prophetic Hadith defining who is a true Muslim regarding speech and deeds.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-014',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'How far did Archangel Jibril’s repeated reminders about caring for neighbors go, according to the Prophet (SAW)?',
    options: [
      'The Prophet thought Jibril was going to grant the neighbor a share of legal inheritance',
      'The Prophet thought neighbors would have to live in the same room',
      'The Prophet thought neighbors would cook all family meals',
      'The Prophet thought neighbors would choose each other’s careers'
    ],
    correctAnswer: 'The Prophet thought Jibril was going to grant the neighbor a share of legal inheritance',
    explanation: 'The Prophet said: "Jibril kept advising me to be kind to the neighbor until I thought he would make him an heir!" emphasizing extraordinary neighborly obligations.',
    socraticHint: 'What legal right of close family members did the Prophet think neighbors would receive?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-015',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'What guidance does Surah Al-Mumtahanah (60:8) give regarding relations with peaceful non-Muslim neighbors?',
    options: [
      'Deal with them kindly (Birr) and act justly (Qist) toward them',
      'Refuse to speak with them or greet them',
      'Boycott their shops and services completely',
      'Force them to move away to another town'
    ],
    correctAnswer: 'Deal with them kindly (Birr) and act justly (Qist) toward them',
    explanation: 'The Qur’an states that Allah does not forbid showing kindness, mercy, and justice toward those of other faiths who do not fight you or expel you from your homes.',
    socraticHint: 'Which two virtues (Birr and Qist) does the Quran prescribe for treating peaceful citizens of other faiths?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-016',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'Which foundational objective of Islamic Shari’ah (Maqasid al-Shari’ah) mandates the total prohibition of intoxicants, narcotics, and miraa/khat?',
    options: ['Hifdh al-Aql (Preservation of Intellect/Reason)', 'Hifdh al-Mal (Preservation of Wealth)', 'Hifdh al-Nasl (Preservation of Lineage)', 'Hifdh al-Ard (Preservation of Land)'],
    correctAnswer: 'Hifdh al-Aql (Preservation of Intellect/Reason)',
    explanation: 'The human intellect (Aql) is the crown of human dignity and accountability; anything that clouds, impairs, or destroys the mind is strictly prohibited.',
    socraticHint: 'Which Maqasid objective specifically protects the human mind and sanity?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-017',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'What are the five essential higher objectives (Maqasid al-Shari’ah) protected by Islamic law?',
    options: [
      'Preservation of Religion (Deen), Life (Nafs), Intellect (Aql), Lineage (Nasl), and Wealth (Mal)',
      'Power, Prestige, Conquest, Tribute, and Royalty',
      'Food, Clothing, Shelter, Transportation, and Luxury',
      'Gold, Silver, Livestock, Camels, and Date palms'
    ],
    correctAnswer: 'Preservation of Religion (Deen), Life (Nafs), Intellect (Aql), Lineage (Nasl), and Wealth (Mal)',
    explanation: 'Classical jurists (like Imam Al-Ghazali) formulated the five essential universals (Al-Daruriyyat al-Khamsah): Religion, Life, Intellect, Lineage/Family, and Wealth.',
    socraticHint: 'Identify the five sacred necessities of human dignity protected by Islamic legislation.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-018',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'How does chewing miraa (khat) and abusing drugs harm young people in Kenyan communities?',
    options: [
      'It causes dental disease, mental anxiety, academic dropouts, and drains valuable family finances',
      'It improves memory and exam performance',
      'It enhances physical stamina and athletic strength',
      'It creates strong business partnerships'
    ],
    correctAnswer: 'It causes dental disease, mental anxiety, academic dropouts, and drains valuable family finances',
    explanation: 'Substance abuse damages cognitive functioning, impairs sleep and oral hygiene, causes school dropouts, and wastes resources needed for family welfare.',
    socraticHint: 'What are the devastating physical, psychological, and financial impacts of drug addiction?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-019',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'What did the Prophet (SAW) say about a person who sleeps with a full belly while their immediate neighbor is hungry?',
    options: [
      '"He does not truly believe in me who spends the night full while his neighbor is hungry beside him and he knows it"',
      '"He is a clever household manager"',
      '"He should sell food to the neighbor at high interest"',
      '"Neighbors must never share meals"'
    ],
    correctAnswer: '"He does not truly believe in me who spends the night full while his neighbor is hungry beside him and he knows it"',
    explanation: 'Islam ties faith directly to social compassion; ignoring a starving neighbor while indulging in luxury indicates a grave defect in faith.',
    socraticHint: 'How does the Prophet challenge those who feast while their neighbors go to bed hungry?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-020',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'What does Islam teach about a citizen’s duty toward national laws, such as traffic rules and building standards, that promote public safety?',
    options: [
      'Obeying lawful regulations that maintain public safety and common good is a religious and civic duty',
      'Muslims should ignore all civil laws and do whatever they wish',
      'Traffic lights only apply to emergency vehicles',
      'Building codes should only be followed if an inspector is present'
    ],
    correctAnswer: 'Obeying lawful regulations that maintain public safety and common good is a religious and civic duty',
    explanation: 'The Qur’an instructs: "Obey Allah and obey the Messenger and those in authority among you" (Surah An-Nisa 4:59). Laws that preserve life and order must be followed.',
    socraticHint: 'Why is following safety regulations and civic laws an expression of Islamic responsibility?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-021',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'In Kenya, what interfaith organization brings together Muslims, Christians, and Hindus to resolve national crises and promote peace?',
    options: [
      'The Inter-Religious Council of Kenya (IRCK)',
      'The East African Trade Union',
      'The Central Bank of Kenya Board',
      'The Kenya Wildlife Service Ranger Corps'
    ],
    correctAnswer: 'The Inter-Religious Council of Kenya (IRCK)',
    explanation: 'The Inter-Religious Council of Kenya (IRCK) unites religious leaders to advocate for peace, human rights, child protection, and national cohesion across Kenya.',
    socraticHint: 'Which prominent national body coordinates multi-faith dialogue and peace initiatives in Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-022',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'How can young Muslim learners prevent radicalization and violent extremism among their peers?',
    options: [
      'By seeking authentic Islamic knowledge from qualified scholars, promoting dialogue, and rejecting hate speech',
      'By reading unverified extremist websites in secret',
      'By isolating themselves from classmates of different backgrounds',
      'By reacting with violence whenever disagreed with'
    ],
    correctAnswer: 'By seeking authentic Islamic knowledge from qualified scholars, promoting dialogue, and rejecting hate speech',
    explanation: 'Sound Islamic knowledge grounds learners in mercy, balance (Wasatiyyah), and peace, inoculating them against distorted violent extremist interpretations.',
    socraticHint: 'How does true mainstream religious understanding counteract extremist propaganda?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-023',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'What does the Qur’anic principle of Wasatiyyah (The Middle Path / Moderation) in Surah Al-Baqarah (2:143) mean for everyday living?',
    options: [
      'Avoiding destructive extremes of fanaticism and carelessness, practicing balanced and fair living',
      'Remaining neutral when witnessing injustice',
      'Only praying half of the required prayers',
      'Refusing to make any decisions in life'
    ],
    correctAnswer: 'Avoiding destructive extremes of fanaticism and carelessness, practicing balanced and fair living',
    explanation: 'Wasatiyyah signifies the balanced, just middle path between excessive rigidity and careless neglect, reflecting the harmonious beauty of Islamic character.',
    socraticHint: 'What does the concept of the balanced "Ummatan Wasata" represent in Islamic conduct?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-ire-g6'
  },
  {
    id: 'q-g6-ire-u10-024',
    subStrandId: 'substrand-g6-ire-u10',
    lessonId: 'lesson-g6-ire-u10-l2',
    text: 'How does a Grade 6 learner best demonstrate true patriotism and nation-building spirit in Kenya today?',
    options: [
      'By studying diligently, respecting diversity, protecting public facilities, and serving the community with integrity',
      'By vandalizing public parks and bus stops',
      'By spreading tribal rumors on social media apps',
      'By cheating during school games and sports'
    ],
    correctAnswer: 'By studying diligently, respecting diversity, protecting public facilities, and serving the community with integrity',
    explanation: 'Excellence in education, honest citizenship, empathy toward neighbors, and safeguarding public goods embody the highest form of patriotism in Kenya.',
    socraticHint: 'What actions reflect positive civic contribution, community leadership, and moral character?',
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
console.log(`Added ${qCount} questions for Units 9 & 10.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 5 of Grade 6 IRE to cbe_database.json!');
