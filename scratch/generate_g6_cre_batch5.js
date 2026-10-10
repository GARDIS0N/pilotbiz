/**
 * Grade 6 Christian Religious Education (CRE) - Batch 5 Generator
 * Content: Units 9 & 10 (Justice & Integrity, Peace & National Cohesion)
 * Missions: Orders 125, 126, 127, 128 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-cre-u9-001 to q-g6-cre-u10-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 CRE Batch 5 (Units 9 & 10) ---');

// 1. Units 9 & 10 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-cre-u9',
    strandId: 'strand-g6-cre-living',
    learningAreaId: 'la-cre-g6',
    title: 'Justice, Integrity & Fighting Corruption in Society',
    name: 'Justice, Integrity & Fighting Corruption in Society',
    description: 'Biblical call to social justice and righteousness: Prophet Amos condemning dishonest scales, greed, and oppression of the poor (Amos 5:24: "Let justice roll on like a river, righteousness like a never-failing stream"); Micah 6:8 ("To act justly and to love mercy and to walk humbly with your God"); John the Baptist rebuking tax collectors and soldiers against extortion and false accusations (Luke 3:12-14); consequences of corruption and bribery in Kenya (poverty, collapsed infrastructure, poor healthcare, injustice in courts); practical integrity: honesty in exams, reporting theft, refusing bribes, defending the defenseless.',
    cbeCompetency: 'Civic responsibility, anti-corruption advocacy, moral integrity, and social justice',
    estimatedMinutes: 30,
    order: 9,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-cre-u10',
    strandId: 'strand-g6-cre-living',
    learningAreaId: 'la-cre-g6',
    title: 'Peace, National Cohesion & Inter-religious Harmony in Kenya',
    name: 'Peace, National Cohesion & Inter-religious Harmony in Kenya',
    description: 'Biblical foundations of peace and reconciliation (Romans 12:18: "If it is possible, as far as it depends on you, live at peace with everyone"); overcoming tribal prejudice, negative ethnicity, and historical grievances; living harmoniously with neighbors of other religious faiths (Christians, Muslims, Hindus, traditionalists); constructive Christian contribution to Kenya’s national development (founding schools, mission hospitals, emergency relief, advocating for democratic good governance); being active ambassadors of peace and national unity in school, family, and country.',
    cbeCompetency: 'Peacebuilding, national cohesion, cross-cultural empathy, and patriotism',
    estimatedMinutes: 30,
    order: 10,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-cre-u9-l1',
    subStrandId: 'substrand-g6-cre-u9',
    title: 'Prophetic Voices for Justice: Amos, Micah & John the Baptist',
    content: 'God is a God of justice who passionately defends the poor, the fatherless, the widow, and the oppressed against institutional corruption.\n\n1. Prophet Amos: Champion of the Oppressed (Amos 5, 8):\n- Amos thundered against Northern Israel’s wealthy elite who lived in luxurious ivory houses while using false weights, taking bribes in the city gates, and trampling the needy for a pair of sandals.\n- Amos 5:24: "Let justice roll on like a river, righteousness like a never-failing stream!"\n- Religious rituals and loud singing without practical social justice are an offense to God.\n\n2. Prophet Micah: The Requirement of God (Micah 6:6-8):\n- People asked what sacrifices God required: thousands of rams or rivers of olive oil?\n- Micah answered: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."\n\n3. John the Baptist: Practical Repentance (Luke 3:10-14):\n- When the crowds asked what to do, John said: "Anyone who has two shirts should share with the one who has none."\n- To corrupt tax collectors: "Don’t collect any more than you are required to."\n- To soldiers: "Don’t extort money and don’t accuse people falsely—be content with your pay."',
    didYouKnow: 'Prophet Amos was not a professional court priest or politician; he was a humble shepherd and grower of sycamore figs from Tekoa, proving that ordinary citizens can champion justice!',
    kenyanContext: 'Kenyan churches regularly issue pastoral letters and peace sermons calling on state institutions and leaders to uphold the rule of law and protect public resources for all citizens.',
    order: 17,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u9-l2',
    subStrandId: 'substrand-g6-cre-u9',
    title: 'Combating Corruption & Bribery: Living with Uncompromising Integrity in Kenya',
    content: 'Corruption is a grave moral sin that robs the nation of prosperity, dignity, and justice.\n\n1. What is Corruption and Bribery?:\n- Bribery is giving or receiving money, favors, or gifts to bend the truth, give an unfair advantage, or subvert justice.\n- Exodus 23:8: "Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent."\n\n2. Destructive Effects of Corruption in Kenya:\n- Collapse of Public Services: Funds meant for medicines in public hospitals, clean water, or school books are stolen, leading to unnecessary deaths and poor learning.\n- Shoddy Infrastructure: Substandard roads and collapsing buildings caused by bribes to bypass safety regulations.\n- Injustice in Courts: When judicial officers take bribes, the innocent are punished while guilty criminals walk free.\n\n3. Practical Christian Integrity for Learners:\n- Academic Integrity: Never cheating in exams, never copying assignments, and refusing to pay for leakages.\n- Financial Transparency: Accurately reporting school fees, club money, and returning lost property to the owner.\n- Whistleblowing and Courage: Reporting bullying, exam malpractice, and theft to trusted authorities.',
    didYouKnow: 'Kenya’s Ethics and Anti-Corruption Commission (EACC) partners with primary schools through "Integrity Clubs" to instill honesty and ethical values in young Kenyans from a tender age!',
    kenyanContext: 'Bishop Alexander Muge and Archbishop Manasses Kuria were prominent Kenyan Christian leaders who fearlessly preached against public corruption and defended human rights.',
    order: 18,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u10-l1',
    subStrandId: 'substrand-g6-cre-u10',
    title: 'Living at Peace with Everyone: Overcoming Tribalism & Building Cohesion',
    content: 'God created the human race of one blood, fashioning diverse tongues, cultures, and nations to live together in mutual respect and unity.\n\n1. Biblical Foundations of Peace and Unity:\n- Romans 12:18: "If it is possible, as far as it depends on you, live at peace with everyone."\n- Galatians 3:28: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus."\n\n2. Overcoming Tribalism (Negative Ethnicity) in Kenya:\n- Tribalism is the evil belief that people of one’s own ethnic group are superior, more deserving of jobs and land, or entitled to look down on other communities.\n- Negative ethnicity fuels election violence, cattle rustling, hatred, and social division.\n- Christians must reject ethnic stereotypes and celebrate Kenya’s 40+ cultural communities as a vibrant mosaic of God’s creativity.\n\n3. Being Active Peacemakers:\n- Using words of reconciliation during disagreements.\n- Welcoming classmates of different ethnic backgrounds into our playgroups and study circles.\n- Refusing to forward tribal hate speech or inflammatory social media rumors.',
    didYouKnow: 'The Kenyan National Anthem is a prayer to God ("Ee Mungu Nguvu Yetu") that explicitly petitions for peace, liberty, unity, and plenty within our borders!',
    kenyanContext: 'Following the 2007/2008 post-election violence, Kenyan schools established Amani (Peace) Clubs to train children in conflict resolution and national integration.',
    order: 19,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u10-l2',
    subStrandId: 'substrand-g6-cre-u10',
    title: 'Inter-religious Harmony & Christian Contributions to Nation Building',
    content: 'Kenya is a multi-religious nation where Christians, Muslims, Hindus, and traditional believers live side by side as fellow citizens.\n\n1. Inter-religious Respect and Peaceful Coexistence:\n- Jesus commanded: "Do to others what you would have them do to you" (Matthew 7:12).\n- Loving our neighbors means respecting their religious freedom, living peacefully together in neighborhoods, and collaborating on community development projects (clean water, sports, environmental clean-ups).\n- Respecting religious holidays: wishing Muslim neighbors a blessed Eid, Hindu neighbors a joyful Diwali, and sharing Christmas cheer with all.\n\n2. Historical Christian Contribution to Nation Building in Kenya:\n- Education: Missionaries and churches founded Kenya’s premier primary and secondary schools (Alliance High, Maseno, St. Mary’s Yala, Loreto Limuru, Mang’u).\n- Healthcare: Mission hospitals (PCEA Chogoria, Tenwek, Kijabe, St. Luke’s Kaloleni) provide specialized, compassionate healthcare to millions in remote rural regions.\n- Social Welfare: Church organizations operate homes for orphans, rehabilitation centers, and emergency relief distribution during droughts in Northern Kenya.\n- Good Governance: Championing democracy, constitution-making, and peace mediation during political crises.',
    didYouKnow: 'Over 40% of healthcare facilities in rural and marginalized areas of Kenya are operated by Christian faith-based organizations!',
    kenyanContext: 'The Inter-Religious Council of Kenya (IRCK) brings together Christian, Muslim, and Hindu leaders to jointly tackle public health challenges, climate crises, and electoral peace.',
    order: 20,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 125, 126, 127, 128 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-cre-u9-m1',
    worldId: 'world-faith-values',
    title: 'Mission 125: River of Righteousness – Amos, Micah & Prophetic Justice',
    description: 'Hear the thunderous call of Prophet Amos, walk humbly in Micah’s mandate, and embrace John the Baptist’s radical honesty in everyday life.',
    order: 125,
    orderIndex: 125,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-justice-stream',
    badge: 'badge-g6-cre-justice-stream',
    lessonId: 'lesson-g6-cre-u9-l1',
    questionIds: [
      'q-g6-cre-u9-001', 'q-g6-cre-u9-002', 'q-g6-cre-u9-003', 'q-g6-cre-u9-004',
      'q-g6-cre-u9-005', 'q-g6-cre-u9-006', 'q-g6-cre-u9-007', 'q-g6-cre-u9-008',
      'q-g6-cre-u9-009', 'q-g6-cre-u9-010', 'q-g6-cre-u9-011', 'q-g6-cre-u9-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u9-m2',
    worldId: 'world-faith-values',
    title: 'Mission 126: Shield of Integrity – Refusing Bribes & Anti-Corruption Shield',
    description: 'Reject dishonest scales and bribery, champion academic honesty in examinations, and stand as an unshakeable pillar of integrity in Kenya.',
    order: 126,
    orderIndex: 126,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-anti-corruption',
    badge: 'badge-g6-cre-anti-corruption',
    lessonId: 'lesson-g6-cre-u9-l2',
    questionIds: [
      'q-g6-cre-u9-013', 'q-g6-cre-u9-014', 'q-g6-cre-u9-015', 'q-g6-cre-u9-016',
      'q-g6-cre-u9-017', 'q-g6-cre-u9-018', 'q-g6-cre-u9-019', 'q-g6-cre-u9-020',
      'q-g6-cre-u9-021', 'q-g6-cre-u9-022', 'q-g6-cre-u9-023', 'q-g6-cre-u9-024'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u10-m1',
    worldId: 'world-faith-values',
    title: 'Mission 127: One Nation Under God – Overcoming Tribalism & Building Cohesion',
    description: 'Dismantle ethnic prejudice, promote peace across all 47 Kenyan counties, and champion unity as brothers and sisters in Christ.',
    order: 127,
    orderIndex: 127,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-peace-builder',
    badge: 'badge-g6-cre-peace-builder',
    lessonId: 'lesson-g6-cre-u10-l1',
    questionIds: [
      'q-g6-cre-u10-001', 'q-g6-cre-u10-002', 'q-g6-cre-u10-003', 'q-g6-cre-u10-004',
      'q-g6-cre-u10-005', 'q-g6-cre-u10-006', 'q-g6-cre-u10-007', 'q-g6-cre-u10-008',
      'q-g6-cre-u10-009', 'q-g6-cre-u10-010', 'q-g6-cre-u10-011', 'q-g6-cre-u10-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u10-m2',
    worldId: 'world-faith-values',
    title: 'Mission 128: Nation Builders – Inter-Faith Respect & Christian Service',
    description: 'Celebrate inter-religious harmony, honor the historic legacy of mission schools and hospitals, and serve Kenya with patriotic devotion.',
    order: 128,
    orderIndex: 128,
    xpReward: 150,
    rewardXp: 150,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-nation-builder',
    badge: 'badge-g6-cre-nation-builder',
    lessonId: 'lesson-g6-cre-u10-l2',
    questionIds: [
      'q-g6-cre-u10-013', 'q-g6-cre-u10-014', 'q-g6-cre-u10-015', 'q-g6-cre-u10-016',
      'q-g6-cre-u10-017', 'q-g6-cre-u10-018', 'q-g6-cre-u10-019', 'q-g6-cre-u10-020',
      'q-g6-cre-u10-021', 'q-g6-cre-u10-022', 'q-g6-cre-u10-023', 'q-g6-cre-u10-024'
    ],
    learningAreaId: 'la-cre-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 9: Justice, Integrity & Fighting Corruption (q-g6-cre-u9-001 to 024) ---
  {
    id: 'q-g6-cre-u9-001',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What powerful imagery did Prophet Amos use in Amos 5:24 to describe God’s standard of social justice?',
    options: [
      '"Let justice roll on like a river, righteousness like a never-failing stream!"',
      '"Let justice be locked inside the king’s treasure chest"',
      '"Let righteousness blow away like dry dust in the wind"',
      '"Let justice be bought and sold in the marketplace"'
    ],
    correctAnswer: '"Let justice roll on like a river, righteousness like a never-failing stream!"',
    explanation: 'Amos 5:24 is one of the most famous biblical calls for social justice, comparing justice to an unstoppable, life-giving river and righteousness to a perennial flowing stream.',
    socraticHint: 'Which verse compares justice to an unstoppable rushing river that never runs dry?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-002',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'Why did God reject the religious festivals, sacrifices, and musical worship of the Israelites in Amos 5:21-23?',
    options: [
      'Because they practiced external religious ceremonies while practicing injustice and oppressing the poor in daily life',
      'Because their sheep were too small to be sacrificed',
      'Because they sang without playing harps',
      'Because they held worship services on the wrong day of the week'
    ],
    correctAnswer: 'Because they practiced external religious ceremonies while practicing injustice and oppressing the poor in daily life',
    explanation: 'God hates empty religious hypocrisy: religious songs and sacrifices are meaningless when worshipers exploit the poor, take bribes, and ignore justice.',
    socraticHint: 'Why is external religious performance detestable to God when people treat the poor with cruelty?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-003',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What three supreme moral requirements does God demand of humanity according to Micah 6:8?',
    options: [
      'To act justly, to love mercy, and to walk humbly with your God',
      'To build large stone temples, fast three days a week, and memorize genealogies',
      'To defeat enemy nations, accumulate silver, and rule over tribes',
      'To offer thousands of rams and ten thousand rivers of olive oil'
    ],
    correctAnswer: 'To act justly, to love mercy, and to walk humbly with your God',
    explanation: 'Micah 6:8 sums up the heart of biblical morality: practicing practical justice, displaying loving-kindness (mercy), and living in humble relationship with God.',
    socraticHint: 'Which three virtues—acting justly, loving mercy, and walking humbly—does Micah state God requires?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-004',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What specific fraudulent economic practice did Prophet Amos condemn merchants for in Amos 8:5?',
    options: [
      'Using dishonest scales and skimped measures to cheat buyers and selling sweepings mixed with wheat',
      'Selling fresh milk at low prices',
      'Giving free grain to hungry travelers',
      'Allowing farmers to trade without licenses'
    ],
    correctAnswer: 'Using dishonest scales and skimped measures to cheat buyers and selling sweepings mixed with wheat',
    explanation: 'Amos exposed merchants who manipulated scales, made the bushel small and the shekel large, and exploited vulnerable customers for profit.',
    socraticHint: 'How did corrupt merchants in Amos’s day tamper with scales to cheat poor customers?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-005',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What practical instruction on economic fairness did John the Baptist give to tax collectors in Luke 3:13?',
    options: [
      '"Don’t collect any more than you are required to"',
      '"Charge double the tax and keep half for yourself"',
      '"Refuse to pay any taxes to the government"',
      '"Resign from your job and become a hermit in the desert"'
    ],
    correctAnswer: '"Don’t collect any more than you are required to"',
    explanation: 'Tax collectors routinely inflated tax bills to extort money for personal gain; John demanded immediate financial honesty and ethical restraint.',
    socraticHint: 'What command against extortion did John give to tax collectors who came to be baptized?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-006',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What ethical command did John the Baptist give to soldiers who asked how they should live righteously (Luke 3:14)?',
    options: [
      '"Don’t extort money and don’t accuse people falsely—be content with your pay"',
      '"Use your weapons to take whatever food you need from villagers"',
      '"Refuse to obey your commanding officers"',
      '"Demand bribes from travelers at every checkpoint"'
    ],
    correctAnswer: '"Don’t extort money and don’t accuse people falsely—be content with your pay"',
    explanation: 'John the Baptist ordered security officers not to misuse their military power to intimidate citizens, extort bribes, or bear false witness.',
    socraticHint: 'What did John tell soldiers regarding using their power to extort money or make false accusations?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-007',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What did Prophet Isaiah proclaim in Isaiah 1:17 as the true expression of pure religion?',
    options: [
      '"Learn to do right; seek justice. Defend the oppressed. Take up the cause of the fatherless; plead the case of the widow"',
      '"Burn the most expensive incense three times every day"',
      '"Build high walls around your private estate"',
      '"Ignore the poor so they learn to work harder"'
    ],
    correctAnswer: '"Learn to do right; seek justice. Defend the oppressed. Take up the cause of the fatherless; plead the case of the widow"',
    explanation: 'Isaiah 1:17 calls believers to take active responsibility for the defenseless in society: seeking justice, defending the oppressed, and caring for widows and orphans.',
    socraticHint: 'Which vulnerable groups—the oppressed, fatherless, and widows—did Isaiah command believers to defend?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-008',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What was Amos’s original profession before God called him to proclaim justice to the royal court of Israel (Amos 7:14)?',
    options: [
      'He was a shepherd and a tender of sycamore-fig trees from Tekoa',
      'He was a wealthy nobleman in King Jeroboam’s palace',
      'He was the chief high priest in the temple at Bethel',
      'He was a captain in the Judean royal army'
    ],
    correctAnswer: 'He was a shepherd and a tender of sycamore-fig trees from Tekoa',
    explanation: 'Amos stated: "I was neither a prophet nor the son of a prophet, but I was a shepherd, and I also took care of sycamore-fig trees," highlighting how God uses everyday working people.',
    socraticHint: 'What humble agricultural work did Amos do before God called him to preach?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-009',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'How did King Ahab and Queen Jezebel violate biblical justice in the story of Naboth’s vineyard (1 Kings 21)?',
    options: [
      'They framed innocent Naboth with false witnesses, had him stoned to death, and seized his ancestral vineyard',
      'They paid Naboth three times the value of his vineyard',
      'They invited Naboth to become a judge in Samaria',
      'They protected Naboth from foreign bandits'
    ],
    correctAnswer: 'They framed innocent Naboth with false witnesses, had him stoned to death, and seized his ancestral vineyard',
    explanation: 'Jezebel orchestrated judicial murder and land-grabbing through perjury; Prophet Elijah confronted Ahab, pronouncing God’s stern judgment upon the corrupt royal house.',
    socraticHint: 'How did Ahab and Jezebel use corrupt courts and false witnesses to steal Naboth’s ancestral land?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-010',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What warning does Proverbs 14:31 give concerning the mistreatment and oppression of the poor?',
    options: [
      '"Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God"',
      '"Poor people should never be helped because poverty is their own fault"',
      '"God only listens to the prayers of rich merchants"',
      '"Oppressing the poor makes a nation economically powerful"'
    ],
    correctAnswer: '"Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God"',
    explanation: 'Proverbs 14:31 connects human dignity directly to the Creator: insulting or exploiting the poor is an insult to God who created them in His image.',
    socraticHint: 'Why is oppressing poor people treated by scripture as an insult to God Himself?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-011',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'How did tax collector Zacchaeus demonstrate true biblical repentance when Jesus entered his home in Jericho (Luke 19:8)?',
    options: [
      'He gave half of his possessions to the poor and promised to repay anyone he had cheated four times the amount',
      'He built a golden statue of Jesus in the town square',
      'He promised to never collect taxes again',
      'He gave Jesus a bag of silver coins'
    ],
    correctAnswer: 'He gave half of his possessions to the poor and promised to repay anyone he had cheated four times the amount',
    explanation: 'Zacchaeus proved his conversion through practical economic restitution: voluntarily restoring stolen money fourfold and dedicating half his wealth to the poor.',
    socraticHint: 'What fourfold restitution did Zacchaeus pledge to anyone he had cheated?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-012',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l1',
    text: 'What is the role of the Church when leaders in society practice injustice and corruption?',
    options: [
      'To be the prophetic conscience of the nation, speaking truth to power, defending the vulnerable, and advocating for fairness',
      'To remain completely silent and support corruption in exchange for money',
      'To organize violent armed uprisings to overthrow the state',
      'To tell citizens that justice on earth does not matter'
    ],
    correctAnswer: 'To be the prophetic conscience of the nation, speaking truth to power, defending the vulnerable, and advocating for fairness',
    explanation: 'The Church must emulate biblical prophets, courageously holding leaders accountable to God’s standards of justice, integrity, and servant leadership.',
    socraticHint: 'Why must the Church act as the prophetic conscience of the nation when leaders abuse power?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-013',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What does Exodus 23:8 say about accepting bribes?',
    options: [
      '"Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent"',
      '"Accepting bribes is a smart way to get rich quickly"',
      '"Bribes are acceptable as long as nobody finds out"',
      '"Only large bribes are forbidden; small bribes are fine"'
    ],
    correctAnswer: '"Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent"',
    explanation: 'Exodus 23:8 explains that bribery corrupts moral discernment, blinds judges and leaders, and subverts the cause of innocent people.',
    socraticHint: 'Why does God say a bribe blinds those who see and twists the words of the innocent?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-014',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'How does corruption directly harm poor and vulnerable citizens in Kenya?',
    options: [
      'Public funds meant for medicine in clinics, clean water, and free schooling are stolen, leaving the poor to suffer and die needlessly',
      'It makes poor people become wealthy quickly',
      'It has no effect on ordinary people',
      'It only affects foreign tourists visiting Kenya'
    ],
    correctAnswer: 'Public funds meant for medicine in clinics, clean water, and free schooling are stolen, leaving the poor to suffer and die needlessly',
    explanation: 'Corruption deprives citizens of vital life-saving services: stolen health funds cause shortages of essential drugs, while stolen road funds cause lethal accidents.',
    socraticHint: 'What happens to public health and schools when national resources are stolen by corrupt officials?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-015',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What constitutes academic dishonesty (corruption) in a primary school?',
    options: [
      'Cheating during exams, copying homework from a classmate, or paying someone to do your school projects',
      'Borrowing a pencil from a friend and returning it',
      'Studying past examination papers with a revision group',
      'Asking the teacher to explain a difficult mathematics question'
    ],
    correctAnswer: 'Cheating during exams, copying homework from a classmate, or paying someone to do your school projects',
    explanation: 'Cheating, plagiarism, and exam fraud are forms of corruption that erode personal character, deceive teachers, and promote a culture of dishonesty.',
    socraticHint: 'Which dishonest practices in school violate academic integrity and personal honesty?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-016',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'Why does Proverbs 11:1 state that "The Lord detests dishonest scales, but accurate weights find favor with him"?',
    options: [
      'Because commercial cheating robs customers and violates God’s standard of truth and justice in everyday business',
      'Because God only likes digital scales',
      'Because weighing things in kilograms is unbiblical',
      'Because merchants should give away goods for free'
    ],
    correctAnswer: 'Because commercial cheating robs customers and violates God’s standard of truth and justice in everyday business',
    explanation: 'God demands absolute integrity in commerce and trade; cheating buyers with tampered balances or short measures is detestable in His sight.',
    socraticHint: 'Why does God demand honesty and fair weights in daily market transactions?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-017',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What should a student do if they discover that a school prefect is demanding bread or money from younger pupils to avoid reporting them?',
    options: [
      'Report the extortion courageously to a class teacher, deputy headteacher, or school counselor',
      'Join the prefect and demand money too',
      'Pay the bribe quietly every week',
      'Encourage the younger pupils to fight the prefect'
    ],
    correctAnswer: 'Report the extortion courageously to a class teacher, deputy headteacher, or school counselor',
    explanation: 'Whistleblowing against extortion protects innocent peers and upholds school discipline, embodying active Christian courage against corruption.',
    socraticHint: 'Who should you report extortion to when someone misuses their prefect power for personal bribes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-018',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'How does personal integrity benefit a student in their future career and adult life?',
    options: [
      'It builds a sterling reputation, earns the trust of employers and communities, and brings God’s peace and favor',
      'It guarantees that you will never have to work hard',
      'It makes people avoid you because you are too honest',
      'It ensures you can cheat on job applications without getting caught'
    ],
    correctAnswer: 'It builds a sterling reputation, earns the trust of employers and communities, and brings God’s peace and favor',
    explanation: 'Proverbs 10:9 states: "Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out." Integrity is the foundation of enduring trust.',
    socraticHint: 'Why is a trustworthy reputation for honesty the greatest asset for your future career?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-019',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What is the role of Kenya’s Ethics and Anti-Corruption Commission (EACC) in promoting integrity across our country?',
    options: [
      'Investigating public corruption, recovering stolen public assets, and educating citizens through school Integrity Clubs',
      'Collecting taxes from commercial banks',
      'Building international airports and harbors',
      'Organizing musical concerts in stadiums'
    ],
    correctAnswer: 'Investigating public corruption, recovering stolen public assets, and educating citizens through school Integrity Clubs',
    explanation: 'The EACC is mandated by Kenya’s Constitution to combat corruption, investigate economic crimes, recover grabbed public property, and educate the public on ethics.',
    socraticHint: 'What constitutional role does EACC play in investigating graft and recovering grabbed public assets?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-020',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'Why does Proverbs 28:6 declare that "Better the poor whose walk is blameless than the rich whose ways are perverse"?',
    options: [
      'Because moral integrity and a clear conscience before God are far more valuable than riches acquired through corruption',
      'Because being poor is an automatic ticket to heaven',
      'Because rich people are never able to read the Bible',
      'Because wealth is inherently evil under all circumstances'
    ],
    correctAnswer: 'Because moral integrity and a clear conscience before God are far more valuable than riches acquired through corruption',
    explanation: 'True human worth is measured by character, honesty, and righteous conduct before God, not by ill-gotten wealth that leads to spiritual ruin.',
    socraticHint: 'Why is a clean conscience and honest poverty better than dirty wealth gained by corruption?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-021',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What should a cashier or treasurer of a school Christian Union do when handling club contribution funds?',
    options: [
      'Maintain accurate written receipt records, deposit funds safely, and present transparent financial reports to members',
      'Use the money to buy personal snacks and replace it later',
      'Keep the money in their pocket without keeping any records',
      'Lend the funds to close friends at school'
    ],
    correctAnswer: 'Maintain accurate written receipt records, deposit funds safely, and present transparent financial reports to members',
    explanation: 'Financial transparency and meticulous bookkeeping safeguard integrity, prevent temptation, and honor the trust of members and God.',
    socraticHint: 'How does keeping accurate receipts and clear accounts maintain financial transparency?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-022',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'What punishment did Gehazi, the servant of Prophet Elisha, receive for greedily taking bribes of silver and garments from Naaman (2 Kings 5:20-27)?',
    options: [
      'Naaman’s leprosy clung to Gehazi and to his descendants forever',
      'He was made king over Syria',
      'He was promoted to chief prophet in Israel',
      'He was banished to the desert for three days'
    ],
    correctAnswer: 'Naaman’s leprosy clung to Gehazi and to his descendants forever',
    explanation: 'Gehazi lied and took gifts that Elisha had refused. Because of his deceitful greed, Naaman’s incurable leprosy fell upon him and his household.',
    socraticHint: 'What terrible disease struck Gehazi when he secretly pursued Naaman to demand silver and clothing?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-023',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'In Psalm 15:1-5, who is described as worthy to dwell in the sacred tent of the Lord on His holy hill?',
    options: [
      '"The one whose walk is blameless, who does what is righteous, who speaks the truth from their heart, and who does not accept a bribe against the innocent"',
      '"The one who owns the largest herd of cattle in the land"',
      '"The one who builds the highest stone tower"',
      '"The one who has the most friends in the city"'
    ],
    correctAnswer: '"The one whose walk is blameless, who does what is righteous, who speaks the truth from their heart, and who does not accept a bribe against the innocent"',
    explanation: 'Psalm 15 defines holiness in practical moral terms: truth-telling, keeping promises even when it hurts, slandering no one, and refusing bribes.',
    socraticHint: 'What moral character traits does Psalm 15 list for someone who walks blamelessly before God?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u9-024',
    subStrandId: 'substrand-g6-cre-u9',
    lessonId: 'lesson-g6-cre-u9-l2',
    text: 'How can young Christians cultivate a culture of zero-tolerance for corruption in Kenya?',
    options: [
      'By committing to personal honesty, refusing to give or take bribes, electing student leaders based on integrity, and speaking out against injustice',
      'By waiting until they are adults before caring about honesty',
      'By joining dishonest schemes to get ahead in life',
      'By keeping quiet whenever public funds are looted'
    ],
    correctAnswer: 'By committing to personal honesty, refusing to give or take bribes, electing student leaders based on integrity, and speaking out against injustice',
    explanation: 'Transforming a nation starts with young citizens choosing uncompromised personal integrity, standing for truth, and rejecting corruption at all levels.',
    socraticHint: 'How does personal commitment to honesty from youth build a corrupt-free future for Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },

  // --- Unit 10: Peace, National Cohesion & Inter-religious Harmony (q-g6-cre-u10-001 to 024) ---
  {
    id: 'q-g6-cre-u10-001',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What command regarding peaceful coexistence is given in Romans 12:18?',
    options: [
      '"If it is possible, as far as it depends on you, live at peace with everyone"',
      '"Only live at peace with members of your own family"',
      '"Start fights with anyone who speaks a different language"',
      '"Avoid speaking to anyone outside your church"'
    ],
    correctAnswer: '"If it is possible, as far as it depends on you, live at peace with everyone"',
    explanation: 'Romans 12:18 places personal moral responsibility on every Christian to pursue peace, bridge divisions, and maintain harmony with all neighbors.',
    socraticHint: 'What does Paul urge believers to do "as far as it depends on you"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-002',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'How does Galatians 3:28 describe spiritual unity in Jesus Christ?',
    options: [
      '"There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus"',
      '"Only one ethnic community has the right to lead the church"',
      '"Wealthy people have a higher position in heaven"',
      '"Men are more important to God than women"'
    ],
    correctAnswer: '"There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus"',
    explanation: 'Galatians 3:28 abolishes ethnic, social, and gender hierarchies, establishing equal dignity and unity in the family of God.',
    socraticHint: 'Which verse teaches that all ethnic and social divisions are overcome in Christ?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-003',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What is negative ethnicity (tribalism), and why does Christian teaching strictly reject it?',
    options: [
      'Discriminating against or hating people from other ethnic groups, which violates God’s command to love all neighbors equally',
      'Appreciating traditional cultural music and attire',
      'Speaking your native mother tongue at home',
      'Studying the history of different communities in Kenya'
    ],
    correctAnswer: 'Discriminating against or hating people from other ethnic groups, which violates God’s command to love all neighbors equally',
    explanation: 'Tribalism breeds prejudice, favoritism, and violence, violating the truth that every human being is made in the image of God and deserving of equal respect.',
    socraticHint: 'Why is hating or favoring people based on their ethnic community contrary to Christian love?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-004',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What petition for national unity is prayed in the first stanza of the Kenya National Anthem?',
    options: [
      '"Justice be our shield and defender, may we dwell in unity, peace and liberty, plenty be found within our borders"',
      '"May our tribe rule over all other tribes forever"',
      '"May we defeat all neighboring nations in war"',
      '"May only our town have good roads and hospitals"'
    ],
    correctAnswer: '"Justice be our shield and defender, may we dwell in unity, peace and liberty, plenty be found within our borders"',
    explanation: 'The Kenya National Anthem is an earnest prayer to God asking for national cohesion, divine justice, peace, and abundance for all citizens.',
    socraticHint: 'Recall the inspiring prayer for unity and peace in our national anthem.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-005',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'How can primary school pupils help eradicate tribal prejudice among themselves?',
    options: [
      'By playing, eating, and studying together with classmates from all ethnic communities without using tribal stereotypes',
      'By refusing to sit next to pupils who speak different languages',
      'By making fun of the accents of classmates from other counties',
      'By forming separate ethnic clubs in school'
    ],
    correctAnswer: 'By playing, eating, and studying together with classmates from all ethnic communities without using tribal stereotypes',
    explanation: 'Embracing diversity through cross-ethnic friendships, shared games, and mutual support dismantles stereotypes and builds a united generation.',
    socraticHint: 'How does including classmates of all ethnic backgrounds in your games foster national unity?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-006',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What role did the Amani (Peace) Clubs established in Kenyan schools play following the 2007/2008 post-election crisis?',
    options: [
      'They trained children in mediation, non-violent communication, tolerance, and peer reconciliation across ethnic divides',
      'They taught pupils how to use weapons in self-defense',
      'They organized political protests in town centers',
      'They separated children into ethnic study dormitories'
    ],
    correctAnswer: 'They trained children in mediation, non-violent communication, tolerance, and peer reconciliation across ethnic divides',
    explanation: 'Amani Clubs empower learners to be frontline ambassadors of national cohesion, teaching restorative conflict resolution and cross-cultural empathy.',
    socraticHint: 'What peaceful skills in dialogue and reconciliation do school Amani Clubs teach?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-007',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'In 2 Corinthians 5:18-20, what sacred ministry does Paul say God has committed to all believers in Christ?',
    options: [
      'The ministry of reconciliation, as Christ’s ambassadors making peace between God and humanity',
      'The ministry of judging and condemning others',
      'The ministry of building military weapons',
      'The ministry of collecting taxes'
    ],
    correctAnswer: 'The ministry of reconciliation, as Christ’s ambassadors making peace between God and humanity',
    explanation: '2 Corinthians 5:18-20 commissions Christians as ambassadors of reconciliation, called to reconcile people to God and heal broken human relationships.',
    socraticHint: 'What ministry of restoring broken relationships does Paul say God gave to every believer?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-008',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What should a Christian learner do if they see inflammatory, tribal hate speech posted in an online group or chat forum?',
    options: [
      'Do not forward or repeat it; report the hate speech to a moderator, teacher, or parent, and speak words of peace and unity',
      'Forward it to all contacts to start an online tribal argument',
      'Reply with more insulting ethnic slurs',
      'Cheer on the hate speech with laughing emojis'
    ],
    correctAnswer: 'Do not forward or repeat it; report the hate speech to a moderator, teacher, or parent, and speak words of peace and unity',
    explanation: 'Christians extinguish the fire of malice by refusing to circulate hateful rhetoric, defusing tensions with words of peace, and notifying adults.',
    socraticHint: 'What responsible action prevents online tribal hate speech from spreading and causing violence?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-009',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'How does Psalm 133:1 describe the blessing of believers living together in unity?',
    options: [
      '"How good and pleasant it is when God’s people live together in unity!"',
      '"Unity is weak and leads to poverty"',
      '"It is better for people to live in separate isolated villages"',
      '"God prefers when people argue and compete against each other"'
    ],
    correctAnswer: '"How good and pleasant it is when God’s people live together in unity!"',
    explanation: 'Psalm 133 celebrates communal harmony as good, pleasant, and fragrant like precious anointing oil, bringing God’s commanded blessing of life forevermore.',
    socraticHint: 'How does Psalm 133 describe the goodness and pleasantness of people dwelling together in unity?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-010',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What tragic consequence occurred in Kenya during the 2007/2008 post-election violence due to ethnic incitement and tribal hatred?',
    options: [
      'Over 1,000 lives were lost, hundreds of thousands were displaced from homes, and property worth billions was destroyed',
      'The country doubled its agricultural exports',
      'All schools received free computers',
      'The national sports teams won the World Cup'
    ],
    correctAnswer: 'Over 1,000 lives were lost, hundreds of thousands were displaced from homes, and property worth billions was destroyed',
    explanation: 'The 2007/2008 tragedy stands as a sobering historical reminder of the catastrophic devastation wrought by ethnic hatred, underscoring the absolute necessity of peace.',
    socraticHint: 'What devastating loss of lives, homes, and peace occurred in Kenya in 2007/2008 due to tribal politics?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-011',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'What is the Golden Rule taught by Jesus in Matthew 7:12 that serves as a universal foundation for peaceful living with all neighbors?',
    options: [
      '"So in everything, do to others what you would have them do to you"',
      '"Do to others before they do it to you"',
      '"Only be kind to people who give you money"',
      '"Do good only when someone is watching"'
    ],
    correctAnswer: '"So in everything, do to others what you would have them do to you"',
    explanation: 'The Golden Rule (Matthew 7:12) commands proactive, empathetic kindness: treating every person with the exact dignity, justice, and respect we desire for ourselves.',
    socraticHint: 'What famous rule says we should treat others the way we would want them to treat us?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-012',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l1',
    text: 'How does celebrating our cultural diversity (folk songs, traditional attire, foods) reflect God’s wisdom rather than division?',
    options: [
      'It showcases the boundless creativity of God who made humanity diverse, allowing different cultures to enrich one another in mutual respect',
      'It proves that some cultures are superior to others',
      'It helps tribes prepare for wars against each other',
      'Cultural diversity is condemned in the Bible'
    ],
    correctAnswer: 'It showcases the boundless creativity of God who made humanity diverse, allowing different cultures to enrich one another in mutual respect',
    explanation: 'Revelation 7:9 pictures the redeemed in heaven from "every nation, tribe, people and language," showing that diversity is divinely designed to enrich the tapestry of humanity.',
    socraticHint: 'How does Revelation 7:9 depict people of every nation and language worshiping God together?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-013',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What does Kenya’s Constitution (Article 32) guarantee to every citizen regarding religious faith?',
    options: [
      'Freedom of conscience, religion, thought, belief, and the right to manifest and practice any religion',
      'That all citizens must belong to one government-approved religion',
      'That children are forbidden from learning about religious values in school',
      'That citizens may only pray inside their own homes'
    ],
    correctAnswer: 'Freedom of conscience, religion, thought, belief, and the right to manifest and practice any religion',
    explanation: 'The Kenyan Constitution upholds freedom of worship, guaranteeing every citizen the legal right to practice and profess their faith peacefully without state coercion.',
    socraticHint: 'What constitutional freedom protects every Kenyan’s right to worship and practice their religion?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-014',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'How should a Christian learner treat a neighbor or classmate who is a Muslim or a Hindu?',
    options: [
      'With sincere love, courtesy, neighborly kindness, and respect for their human dignity',
      'By throwing stones at their houses of worship',
      'By refusing to greet them or walk on the same road',
      'By mocking their religious traditions during school break'
    ],
    correctAnswer: 'With sincere love, courtesy, neighborly kindness, and respect for their human dignity',
    explanation: 'Jesus commands unconditional love for all neighbors. Living with grace, civility, and neighborliness honors Christ and builds a peaceful country.',
    socraticHint: 'How does showing love and respect to people of different faiths reflect Christ’s teachings?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-015',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What is the Inter-Religious Council of Kenya (IRCK)?',
    options: [
      'A coalition uniting leaders of Christian, Muslim, and Hindu religious bodies to work together on peace, health, and national welfare',
      'A sports league for religious organizations',
      'A company that sells religious books for profit',
      'A political party that contests in presidential elections'
    ],
    correctAnswer: 'A coalition uniting leaders of Christian, Muslim, and Hindu religious bodies to work together on peace, health, and national welfare',
    explanation: 'The IRCK models inter-faith cooperation, bringing together diverse religious traditions to champion national reconciliation, health campaigns, and social justice.',
    socraticHint: 'What inter-faith council unites Kenyan Christian, Muslim, and Hindu leaders to promote peace and national harmony?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-016',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What monumental contribution did Christian missionaries and churches make to education in Kenya?',
    options: [
      'Founding foundational primary, secondary, and tertiary educational institutions across Kenya, educating generations of leaders',
      'Making it illegal for children to attend school',
      'Only teaching European children in urban centers',
      'Replacing all academic schools with military camps'
    ],
    correctAnswer: 'Founding foundational primary, secondary, and tertiary educational institutions across Kenya, educating generations of leaders',
    explanation: 'Churches established pioneer academic centers like Alliance High School, Maseno, Loreto Limuru, and St. Mary’s Yala, laying the bedrock of Kenya’s literacy and leadership.',
    socraticHint: 'What major role did churches play in founding Kenya’s premier schools and educating our national leaders?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-017',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'Which famous Kenyan mission hospitals were established by Christian churches to provide healthcare in underserved communities?',
    options: [
      'Tenwek Hospital, PCEA Chogoria Hospital, and Kijabe Hospital',
      'Hospitals located only in London and Washington',
      'Private luxury clinics exclusively for foreign diplomats',
      'Hospitals that only treated missionary doctors'
    ],
    correctAnswer: 'Tenwek Hospital, PCEA Chogoria Hospital, and Kijabe Hospital',
    explanation: 'Institutions like Kijabe, Tenwek, Chogoria, and Maua Methodist were founded to embody Christ’s healing compassion, providing accessible healthcare to millions.',
    socraticHint: 'Which mission hospitals in Bomet, Kiambu, and Tharaka Nithi were founded by Christian churches?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-018',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'How do Christian humanitarian agencies (like Catholic Relief Services, World Vision, and ADRA) serve drought-stricken communities in Northern Kenya?',
    options: [
      'By drilling boreholes, distributing food rations, and supporting children’s nutrition regardless of religious affiliation',
      'By only helping people who convert to Christianity',
      'By selling food rations at high prices to starving families',
      'By demanding land titles before giving water'
    ],
    correctAnswer: 'By drilling boreholes, distributing food rations, and supporting children’s nutrition regardless of religious affiliation',
    explanation: 'Christian relief organizations serve all human beings in need without religious discrimination, reflecting God’s unconditional love in arid and pastoral regions.',
    socraticHint: 'How do Christian charities provide relief food and clean water to drought victims without discrimination?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-019',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'How did Kenyan church leaders contribute to the struggle for multi-party democracy and the 2010 Constitution?',
    options: [
      'By bravely speaking out against political oppression, advocating for constitutional reforms, and protecting human rights advocates',
      'By advising the government to arrest all opposition leaders',
      'By urging citizens to boycott all elections permanently',
      'By preaching that human rights are an evil foreign idea'
    ],
    correctAnswer: 'By bravely speaking out against political oppression, advocating for constitutional reforms, and protecting human rights advocates',
    explanation: 'Pastoral leaders like Bishop Henry Okullu, Rev. Timothy Njoya, and Archbishop David Gitari used the pulpit to champion constitutional freedoms, justice, and democracy.',
    socraticHint: 'Which courageous church leaders used the pulpit to advocate for democracy and human rights in Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-020',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What shared civic value unites Christians, Muslims, and Hindus in building a prosperous Kenya?',
    options: [
      'Integrity, love for nation, peace, diligence in work, and compassion for the vulnerable',
      'Competing to see which religion can build the tallest skyscraper',
      'Refusing to pay taxes to the government',
      'Only buying goods produced by members of your own faith'
    ],
    correctAnswer: 'Integrity, love for nation, peace, diligence in work, and compassion for the vulnerable',
    explanation: 'All major religious traditions in Kenya share fundamental moral values: honesty, peaceful coexistence, hard work, and caring for the needy, uniting citizens in nation building.',
    socraticHint: 'What shared moral virtues of peace, diligence, and integrity unite Kenyans of different faiths?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-021',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'How should a Grade 6 Christian learner react when invited to an inter-faith sports tournament or community clean-up exercise?',
    options: [
      'Participate enthusiastically with joy, building friendly relationships and demonstrating Christ-like love and teamwork',
      'Refuse to attend and insult the organizers',
      'Attend only to start arguments about religious doctrines',
      'Demand payment before picking up any litter'
    ],
    correctAnswer: 'Participate enthusiastically with joy, building friendly relationships and demonstrating Christ-like love and teamwork',
    explanation: 'Participating in civic community efforts fosters inter-faith solidarity, demonstrates servant leadership, and builds an inclusive, harmonious society.',
    socraticHint: 'How does joining inter-faith community clean-ups and sports promote friendship and good citizenship?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-022',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What does 1 Peter 2:17 command Christians regarding their attitude toward people in society and civil authorities?',
    options: [
      '"Show proper respect to everyone, love the family of believers, fear God, honor the emperor (governing authorities)"',
      '"Show respect only to people who belong to your church"',
      '"Disobey all traffic laws and civil ordinances"',
      '"Do not honor any government leaders"'
    ],
    correctAnswer: '"Show proper respect to everyone, love the family of believers, fear God, honor the emperor (governing authorities)"',
    explanation: '1 Peter 2:17 provides a balanced mandate of Christian civic duty: showing universal human respect, loving fellow believers, revering God, and honoring legitimate governance.',
    socraticHint: 'What four civic and spiritual duties are summarized in 1 Peter 2:17?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-023',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'How does praying for national leaders (1 Timothy 2:1-2) contribute to peace and stability in Kenya?',
    options: [
      'It asks God to grant leaders wisdom, justice, and integrity so that citizens may live peaceful, quiet, and godly lives',
      'It guarantees that leaders will never make mistakes',
      'It replaces the need for citizens to vote in elections',
      'It makes all taxes disappear'
    ],
    correctAnswer: 'It asks God to grant leaders wisdom, justice, and integrity so that citizens may live peaceful, quiet, and godly lives',
    explanation: '1 Timothy 2:1-2 instructs prayers for rulers and all in authority, seeking divine guidance for justice and peace so that the nation may flourish.',
    socraticHint: 'Why does scripture urge us to pray for leaders so our nation can live in peace and godliness?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u10-024',
    subStrandId: 'substrand-g6-cre-u10',
    lessonId: 'lesson-g6-cre-u10-l2',
    text: 'What lasting legacy should a Grade 6 pupil strive to leave behind as they complete Upper Primary and prepare for Junior Secondary school?',
    options: [
      'A legacy of moral integrity, academic diligence, kindness to all, active peacemaking, and faithful devotion to God',
      'A reputation for being the most troublesome troublemaker in school',
      'Leaving their school desk vandalized with graffiti',
      'A record of having bullied the youngest pupils'
    ],
    correctAnswer: 'A legacy of moral integrity, academic diligence, kindness to all, active peacemaking, and faithful devotion to God',
    explanation: 'Completing Upper Primary marks a milestone; leaving behind an example of godliness, servant leadership, and kindness inspires younger peers and prepares learners for lifelong success.',
    socraticHint: 'What inspiring character qualities of honesty, peacemaking, and faith make the best school legacy?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
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
console.log(`Added ${qCount} questions for Units 9 & 10.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 5 of Grade 6 CRE to cbe_database.json!');
