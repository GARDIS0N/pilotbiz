/**
 * Grade 6 Christian Religious Education (CRE) - Batch 3 Generator
 * Content: Units 5 & 6 (The Beatitudes & Kingdom Righteousness, Parables of Mercy & Forgiveness)
 * Missions: Orders 117, 118, 119, 120 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-cre-u5-001 to q-g6-cre-u6-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 CRE Batch 3 (Units 5 & 6) ---');

// 1. Units 5 & 6 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-cre-u5',
    strandId: 'strand-g6-cre-jesus',
    learningAreaId: 'la-cre-g6',
    title: 'Teachings of Jesus: The Beatitudes & Kingdom Righteousness',
    name: 'Teachings of Jesus: The Beatitudes & Kingdom Righteousness',
    description: 'Analyzing the Sermon on the Mount (Matthew 5-7); exploring the eight Beatitudes: poor in spirit, those who mourn, the meek, hunger and thirst for righteousness, the merciful, pure in heart, peacemakers, and persecuted for righteousness; being the salt of the earth and the light of the world (Matthew 5:13-16); overcoming retaliation with love for enemies (Matthew 5:43-48); sincere prayer, fasting, and giving without hypocrisy (Matthew 6); storing treasures in heaven rather than worldly possessions.',
    cbeCompetency: 'Kingdom moral discernment, peacemaking, ethical integrity, and spiritual self-awareness',
    estimatedMinutes: 30,
    order: 5,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-cre-u6',
    strandId: 'strand-g6-cre-jesus',
    learningAreaId: 'la-cre-g6',
    title: 'Parables of Mercy, Forgiveness, Accountability & Kingdom Life',
    name: 'Parables of Mercy, Forgiveness, Accountability & Kingdom Life',
    description: 'Examining parables that unveil the radical mercy and accountability of God’s Kingdom: The Unforgiving Servant (Matthew 18:21-35 - the duty of limitless forgiveness); The Prodigal Son and the Loving Father (Luke 15:11-32 - unconditional divine grace, repentance, and overcoming brotherly bitterness); The Rich Fool (Luke 12:13-21 - the danger of greed and hoarding); The Good Samaritan (Luke 10:25-37 - universal compassion breaking ethnic and cultural barriers); applying Christ-like forgiveness and reconciliation in school and family life.',
    cbeCompetency: 'Empathy, conflict resolution, active forgiveness, and neighborly compassion',
    estimatedMinutes: 30,
    order: 6,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-cre-u5-l1',
    subStrandId: 'substrand-g6-cre-u5',
    title: 'The Beatitudes: Kingdom Values & Inner Spiritual Character',
    content: 'In the Sermon on the Mount (Matthew 5:1-12), Jesus went up on a mountainside and taught His disciples the Beatitudes—divine blessings describing the inner character of true Kingdom citizens.\n\n1. The Eight Beatitudes Explained:\n- "Blessed are the poor in spirit, for theirs is the kingdom of heaven": Recognizing our absolute spiritual dependence on God rather than self-reliance.\n- "Blessed are those who mourn, for they will be comforted": Expressing godly sorrow over sin and empathy for the suffering of others.\n- "Blessed are the meek, for they will inherit the earth": Exercising gentle strength under God’s control without arrogant aggression.\n- "Blessed are those who hunger and thirst for righteousness, for they will be filled": Passionately desiring God’s justice and moral purity.\n- "Blessed are the merciful, for they will be shown mercy": Extending unconditional compassion and forgiveness to others.\n- "Blessed are the pure in heart, for they will see God": Cultivating sincere, undivided inner devotion free of hypocrisy.\n- "Blessed are the peacemakers, for they will be called children of God": Actively reconciling broken relationships and fostering harmony.\n- "Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven": Standing firm for God’s truth despite opposition.\n\n2. The Contrast with Worldly Standards:\n- The world praises pride, revenge, accumulation of wealth, and dominance; Jesus crowns humility, mercy, purity, and peacemaking.',
    didYouKnow: 'The word "Beatitude" comes from the Latin "beatus", which translates the Greek "makarios", meaning deeply blessed, spiritually flourishing, and favored by God!',
    kenyanContext: 'In Kenya, peacemakers in schools and churches help bridge ethnic divides and organize peace rallies during national elections to preserve cohesion.',
    order: 9,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u5-l2',
    subStrandId: 'substrand-g6-cre-u5',
    title: 'Salt & Light: Loving Enemies, Sincere Devotion & Heavenly Treasures',
    content: 'Jesus calls His followers to be an active, transforming presence in society through distinctive moral behavior.\n\n1. Salt of the Earth & Light of the World (Matthew 5:13-16):\n- Salt preserves food from decaying and adds flavor; Christians prevent moral decay in society and make life joyful and flavorful.\n- Light dispels darkness and guides the lost; Christian good deeds should shine publicly to lead others to glorify God the Father.\n\n2. Radical Love for Enemies (Matthew 5:43-48):\n- Jesus commands: "Love your enemies and pray for those who persecute you."\n- Loving those who love us is ordinary; treating difficult people, rivals, and opponents with prayerful kindness reflects the divine nature of God, who sends rain on the just and unjust.\n\n3. Sincere Devotion & Heavenly Treasures (Matthew 6):\n- Giving, praying, and fasting should be done in secret to please God, not for public applause or social media praise.\n- Matthew 6:19-21: "Do not store up for yourselves treasures on earth, where moths and rust destroy... but store up for yourselves treasures in heaven. For where your treasure is, there your heart will be also."',
    didYouKnow: 'In ancient times, salt was so precious that Roman soldiers were sometimes paid in salt, which is the origin of the English word "salary"!',
    kenyanContext: 'Christian youth groups across Kenya practice being "salt and light" by visiting children’s homes, cleaning public markets, and planting trees in degraded areas.',
    order: 10,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u6-l1',
    subStrandId: 'substrand-g6-cre-u6',
    title: 'Radical Forgiveness & Restoring Grace: The Unforgiving Servant & Prodigal Son',
    content: 'Jesus used parables—earthly stories with heavenly meanings—to reveal the limitless depth of God’s forgiving love and our duty to forgive others.\n\n1. The Parable of the Unforgiving Servant (Matthew 18:21-35):\n- Peter asked: "Lord, how many times shall I forgive my brother when he sins against me? Up to seven times?" Jesus replied: "Seventy-seven times" (meaning limitless).\n- A king canceled an enormous, unpayable debt of 10,000 talents for his servant. Yet that same servant went out and strangled a fellow servant who owed him a tiny debt of 100 denarii, having him thrown into debtor’s prison.\n- The master revoked his mercy and punished the unforgiving servant.\n- Lesson: Since God has forgiven our massive debt of sin, we must willingly forgive those who wrong us.\n\n2. The Parable of the Prodigal Son (Luke 15:11-32):\n- A younger son demanded his inheritance early, traveled to a distant country, and squandered everything in wild living. Reduced to feeding pigs during a famine, he came to his senses and returned home expecting to be a hired hand.\n- The Father saw him from afar, ran to him with deep compassion, embraced him, and threw a celebratory feast with the fattened calf.\n- The older brother was bitter and resentful, refusing to join the celebration.\n- Lesson: God welcomes every repentant sinner with open arms; we must celebrate reconciliation rather than harboring jealousy or self-righteous judgment.',
    didYouKnow: 'In ancient Middle Eastern culture, it was considered deeply undignified for an elderly patriarch to run in public; yet the father ran to his returning son, demonstrating unconditional, reckless love!',
    kenyanContext: 'Kenyan family elders and pastors often use the Parable of the Prodigal Son during family dispute resolutions to encourage parents and youths to reconcile.',
    order: 11,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u6-l2',
    subStrandId: 'substrand-g6-cre-u6',
    title: 'Stewardship vs. Greed & Neighborly Compassion: The Rich Fool & Good Samaritan',
    content: 'True Kingdom life prioritizes genuine generosity and cross-cultural compassion over hoarding and tribal prejudice.\n\n1. The Parable of the Rich Fool (Luke 12:13-21):\n- A wealthy landowner produced bumper harvests and selfishly tore down his barns to build bigger ones, saying: "You have plenty of grain laid up for many years. Take life easy; eat, drink and be merry."\n- God said to him: "You fool! This very night your life will be demanded from you. Then who will get what you have prepared?"\n- Lesson: Life does not consist in the abundance of possessions; true wisdom is being "rich toward God" by sharing with the poor.\n\n2. The Parable of the Good Samaritan (Luke 10:25-37):\n- An expert in the law asked: "And who is my neighbor?"\n- Jesus told of a traveler beaten by robbers on the road to Jericho. A priest and a Levite walked past on the other side, ignoring the dying man.\n- A Samaritan—from an ethnic group deeply despised by Jews—stopped, bound his wounds with oil and wine, placed him on his donkey, and paid for his lodging at an inn.\n- Lesson: Our neighbor is anyone in need, regardless of tribe, nationality, religion, or social status. Jesus commands: "Go and do likewise."',
    didYouKnow: 'The road from Jerusalem down to Jericho descended over 1,000 meters through rugged desert terrain and was notoriously dangerous, known as the "Way of Blood" because of frequent bandit attacks!',
    kenyanContext: 'During ethnic tensions or road accidents on Kenyan highways, the Good Samaritan principle inspires citizens to rescue injured victims without asking about their tribe or background.',
    order: 12,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 117, 118, 119, 120 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-cre-u5-m1',
    worldId: 'world-faith-values',
    title: 'Mission 117: Mount of Blessings – The Eight Beatitudes & Kingdom Heart',
    description: 'Climb the Mount of Beatitudes with Jesus, discover the eight divine blessings of humility, purity, mercy, and peacemaking, and live as a true child of God.',
    order: 117,
    orderIndex: 117,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-beatitude-disciple',
    badge: 'badge-g6-cre-beatitude-disciple',
    lessonId: 'lesson-g6-cre-u5-l1',
    questionIds: [
      'q-g6-cre-u5-001', 'q-g6-cre-u5-002', 'q-g6-cre-u5-003', 'q-g6-cre-u5-004',
      'q-g6-cre-u5-005', 'q-g6-cre-u5-006', 'q-g6-cre-u5-007', 'q-g6-cre-u5-008',
      'q-g6-cre-u5-009', 'q-g6-cre-u5-010', 'q-g6-cre-u5-011', 'q-g6-cre-u5-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u5-m2',
    worldId: 'world-faith-values',
    title: 'Mission 118: Salt & Radiance – Loving Enemies & Heavenly Wealth',
    description: 'Shine as the light of the world, preserve moral integrity as the salt of the earth, pray for those who wrong you, and store eternal treasures in heaven.',
    order: 118,
    orderIndex: 118,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-salt-and-light',
    badge: 'badge-g6-cre-salt-and-light',
    lessonId: 'lesson-g6-cre-u5-l2',
    questionIds: [
      'q-g6-cre-u5-013', 'q-g6-cre-u5-014', 'q-g6-cre-u5-015', 'q-g6-cre-u5-016',
      'q-g6-cre-u5-017', 'q-g6-cre-u5-018', 'q-g6-cre-u5-019', 'q-g6-cre-u5-020',
      'q-g6-cre-u5-021', 'q-g6-cre-u5-022', 'q-g6-cre-u5-023', 'q-g6-cre-u5-024'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u6-m1',
    worldId: 'world-faith-values',
    title: 'Mission 119: Unfailing Grace – Seventy-Seven Times & The Prodigal’s Return',
    description: 'Practice boundless forgiveness like the King who canceled 10,000 talents, and rejoice with the Loving Father welcoming his lost son home.',
    order: 119,
    orderIndex: 119,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-grace-champion',
    badge: 'badge-g6-cre-grace-champion',
    lessonId: 'lesson-g6-cre-u6-l1',
    questionIds: [
      'q-g6-cre-u6-001', 'q-g6-cre-u6-002', 'q-g6-cre-u6-003', 'q-g6-cre-u6-004',
      'q-g6-cre-u6-005', 'q-g6-cre-u6-006', 'q-g6-cre-u6-007', 'q-g6-cre-u6-008',
      'q-g6-cre-u6-009', 'q-g6-cre-u6-010', 'q-g6-cre-u6-011', 'q-g6-cre-u6-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u6-m2',
    worldId: 'world-faith-values',
    title: 'Mission 120: The Road to Jericho – Generous Barns & The Good Samaritan',
    description: 'Overcome the folly of the Rich Fool by sharing with the needy, and cross tribal and cultural borders to bandage wounded neighbors on the Jericho Road.',
    order: 120,
    orderIndex: 120,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-good-samaritan',
    badge: 'badge-g6-cre-good-samaritan',
    lessonId: 'lesson-g6-cre-u6-l2',
    questionIds: [
      'q-g6-cre-u6-013', 'q-g6-cre-u6-014', 'q-g6-cre-u6-015', 'q-g6-cre-u6-016',
      'q-g6-cre-u6-017', 'q-g6-cre-u6-018', 'q-g6-cre-u6-019', 'q-g6-cre-u6-020',
      'q-g6-cre-u6-021', 'q-g6-cre-u6-022', 'q-g6-cre-u6-023', 'q-g6-cre-u6-024'
    ],
    learningAreaId: 'la-cre-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 5: Teachings of Jesus: Beatitudes & Kingdom Righteousness (q-g6-cre-u5-001 to 024) ---
  {
    id: 'q-g6-cre-u5-001',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What does Jesus promise to the "poor in spirit" in the first Beatitude (Matthew 5:3)?',
    options: [
      '"For theirs is the kingdom of heaven"',
      '"They will inherit great bags of silver"',
      '"They will be elected as kings on earth"',
      '"They will never feel physical hunger"'
    ],
    correctAnswer: '"For theirs is the kingdom of heaven"',
    explanation: 'Matthew 5:3 declares: "Blessed are the poor in spirit, for theirs is the kingdom of heaven," promising divine inheritance to those who recognize their total dependence on God.',
    socraticHint: 'Which heavenly reward is promised to those who acknowledge their spiritual need before God?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-002',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What divine comfort is promised to those who mourn in Matthew 5:4?',
    options: [
      '"For they will be comforted"',
      '"For they will rule the nations"',
      '"For they will live without sadness forever on earth"',
      '"For they will forget their families"'
    ],
    correctAnswer: '"For they will be comforted"',
    explanation: 'Jesus promises: "Blessed are those who mourn, for they will be comforted," assuring believers that God brings deep solace to those brokenhearted over sin or loss.',
    socraticHint: 'What assurance does God give to those who experience sorrow and grief?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-003',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What does biblical "meekness" mean according to the Beatitude "Blessed are the meek, for they will inherit the earth" (Matthew 5:5)?',
    options: [
      'Gentle strength and power placed under God’s humble control, without aggressive arrogance',
      'Cowardice and being too weak to stand up',
      'Refusing to speak to anyone in school',
      'Allowing others to steal your belongings without caring'
    ],
    correctAnswer: 'Gentle strength and power placed under God’s humble control, without aggressive arrogance',
    explanation: 'Biblical meekness is not weakness; it is disciplined strength, humility, and self-restraint channeled for God’s righteous purposes.',
    socraticHint: 'Is meekness weakness, or is it power and strength harnessed under divine self-control?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-004',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What divine promise is given to those who "hunger and thirst for righteousness" (Matthew 5:6)?',
    options: [
      '"For they will be filled (satisfied)"',
      '"For they will never need to drink water again"',
      '"For they will own vast banqueting halls"',
      '"For they will become famous preachers"'
    ],
    correctAnswer: '"For they will be filled (satisfied)"',
    explanation: 'Matthew 5:6 promises that those who long deeply for God’s righteousness and justice will be completely filled with spiritual satisfaction.',
    socraticHint: 'What does God promise will happen to those who earnestly desire His righteousness?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-005',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'Why does Jesus state: "Blessed are the merciful, for they will be shown mercy" (Matthew 5:7)?',
    options: [
      'Because those who forgive and show compassion reflect God’s character and will receive divine mercy themselves',
      'Because only weak people show mercy to others',
      'Because mercy makes wrongdoers pay double fines',
      'Because mercy is only necessary during wartime'
    ],
    correctAnswer: 'Because those who forgive and show compassion reflect God’s character and will receive divine mercy themselves',
    explanation: 'Showing mercy to others opens our hearts to experience the limitless mercy and grace of God; an unmerciful heart cannot receive mercy.',
    socraticHint: 'How does extending mercy to others connect with receiving God’s mercy?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-006',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What remarkable blessing is promised to the "pure in heart" in Matthew 5:8?',
    options: [
      '"For they will see God"',
      '"For they will never suffer illness"',
      '"For they will become angels immediately"',
      '"For they will understand all human languages"'
    ],
    correctAnswer: '"For they will see God"',
    explanation: 'Matthew 5:8 promises: "Blessed are the pure in heart, for they will see God." A heart cleansed of deceit, hypocrisy, and malice enters intimate communion with God.',
    socraticHint: 'Which supreme spiritual privilege is promised to those with pure, unhypocritical hearts?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-007',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What honorable family title is given to peacemakers in Matthew 5:9?',
    options: [
      '"For they will be called children of God"',
      '"For they will be called judges of the earth"',
      '"For they will be named generals of the army"',
      '"For they will be called masters of philosophy"'
    ],
    correctAnswer: '"For they will be called children of God"',
    explanation: 'Peacemakers reflect the nature of the God of peace (Romans 15:33); therefore, they are honored with the title of "children of God."',
    socraticHint: 'Whose children are peacemakers called because they reflect the Father’s reconciling love?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-008',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'How should Christian pupils respond when mocked or persecuted because of standing up for what is right (Matthew 5:11-12)?',
    options: [
      'Rejoice and be glad, because great is their reward in heaven, just as the prophets before them were persecuted',
      'Seek immediate physical revenge after school hours',
      'Deny their faith and join the persecutors in doing evil',
      'Complain bitterly that God has abandoned them'
    ],
    correctAnswer: 'Rejoice and be glad, because great is their reward in heaven, just as the prophets before them were persecuted',
    explanation: 'Jesus encourages persecuted believers to hold fast with joyful confidence, knowing that suffering for righteousness shares in the noble heritage of God’s prophets.',
    socraticHint: 'Why does Jesus tell us to rejoice and be glad even when mocked for doing what is right?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-009',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What is the crucial difference between a "peacekeeper" who avoids difficult conflicts and a biblical "peacemaker"?',
    options: [
      'A peacemaker actively confronts injustice and works to restore genuine reconciliation and truth, whereas a mere peacekeeper sweeps problems under the carpet',
      'A peacemaker uses military force to stop fights',
      'There is no difference between the two terms',
      'A peacemaker only cares about personal safety'
    ],
    correctAnswer: 'A peacemaker actively confronts injustice and works to restore genuine reconciliation and truth, whereas a mere peacekeeper sweeps problems under the carpet',
    explanation: 'True peacemaking requires actively resolving roots of conflict through truth, justice, and forgiveness, not just maintaining superficial calm.',
    socraticHint: 'Does real peacemaking involve actively restoring broken relationships through truth and justice?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-010',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'How does a Grade 6 learner practically practice being "merciful" in school when a classmate accidentally breaks their ruler?',
    options: [
      'Forgiving the classmate readily, refusing to harbor grudges or demand harsh punishment',
      'Breaking the classmate’s ruler in return to be even',
      'Insulting the classmate’s parents loudly',
      'Refusing to speak to the classmate for the rest of the term'
    ],
    correctAnswer: 'Forgiving the classmate readily, refusing to harbor grudges or demand harsh punishment',
    explanation: 'Practicing mercy means choosing gracious forgiveness over retaliation and petty anger when mistakes occur.',
    socraticHint: 'How does choosing forgiveness over revenge show mercy in the classroom?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-011',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'Why does Jesus describe the Beatitudes at the beginning of the Sermon on the Mount before giving specific moral instructions?',
    options: [
      'Because outward righteous actions must flow from a transformed inner heart and character',
      'Because the crowd was too tired to listen to long rules',
      'Because the Beatitudes are only meant for the twelve apostles',
      'Because rules do not matter in the Kingdom of God'
    ],
    correctAnswer: 'Because outward righteous actions must flow from a transformed inner heart and character',
    explanation: 'The Beatitudes describe the inner heart dispositions of Kingdom citizens; genuine Christian behavior naturally flows from who we are on the inside.',
    socraticHint: 'Why must our inner heart and motives be changed first before our outward actions can be truly good?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-012',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l1',
    text: 'What does "purity of heart" mean for young Christians in an era of constant social media bombardment?',
    options: [
      'Keeping our inner desires, thoughts, and intentions focused on God and untainted by lust, dishonesty, or malice',
      'Washing our hands with soap ten times every hour',
      'Only reading books that have white covers',
      'Never having any conversation with anyone outside school'
    ],
    correctAnswer: 'Keeping our inner desires, thoughts, and intentions focused on God and untainted by lust, dishonesty, or malice',
    explanation: 'Purity of heart is single-minded devotion to God, guarding our secret thoughts and desires against corrupt, vulgar, or malicious influences.',
    socraticHint: 'How does guarding our inner thoughts and intentions keep our hearts pure before God?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-013',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'In Matthew 5:13, what warning does Jesus give if salt loses its saltiness (savor)?',
    options: [
      '"It is no longer good for anything, except to be thrown out and trampled underfoot"',
      '"It can be boiled to regain its flavor"',
      '"It turns into pure white sugar"',
      '"It should be sold to merchants at double price"'
    ],
    correctAnswer: '"It is no longer good for anything, except to be thrown out and trampled underfoot"',
    explanation: 'Jesus warned that tasteless salt has lost its distinct preservative purpose; similarly, a Christian who compromises and conforms to worldly corruption loses moral influence.',
    socraticHint: 'What happens to salt that has lost its flavor and preservative power?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-014',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'In Matthew 5:14-16, where did Jesus say a person places a lighted lamp in a house?',
    options: [
      'On a stand, where it gives light to everyone in the house, not under a bowl (basket)',
      'Under a heavy wooden bowl where nobody can see it',
      'Outside in the dark rain',
      'Locked inside a deep cellar cupboard'
    ],
    correctAnswer: 'On a stand, where it gives light to everyone in the house, not under a bowl (basket)',
    explanation: 'Jesus taught: "Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house."',
    socraticHint: 'Where do people place a lamp so that its light illuminates the whole room?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-015',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'What is the ultimate purpose of letting our light shine before others through good deeds (Matthew 5:16)?',
    options: [
      'So that people may see our good deeds and glorify our Father in heaven',
      'So that everyone will praise and elect us as politicians',
      'So that we can boast about how righteous we are',
      'To earn money and gold prizes from spectators'
    ],
    correctAnswer: 'So that people may see our good deeds and glorify our Father in heaven',
    explanation: 'Matthew 5:16 says: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven." Good deeds point people to God, not our own egos.',
    socraticHint: 'Who should receive glory and praise when people see our Christian good deeds?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-016',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'What revolutionary standard of love did Jesus command regarding enemies in Matthew 5:44?',
    options: [
      '"Love your enemies and pray for those who persecute you"',
      '"Hate your enemies and plot revenge in secret"',
      '"Pretend to like your enemies while smiling falsely"',
      '"Attack your enemies before they have a chance to strike"'
    ],
    correctAnswer: '"Love your enemies and pray for those who persecute you"',
    explanation: 'Jesus replaced the ancient code of retaliation ("an eye for an eye") with divine radical love: actively loving, blessing, and praying for our enemies.',
    socraticHint: 'What surprising command did Jesus give regarding how we should treat our enemies and persecutors?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-017',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'Why does Jesus point to the sun and rain to explain why we should love our enemies (Matthew 5:45)?',
    options: [
      'Because God causes His sun to rise on the evil and the good, and sends rain on the righteous and the unrighteous',
      'Because the sun only shines when people are obedient',
      'Because rain is a punishment for wicked people',
      'Because crops cannot grow without heavy storms'
    ],
    correctAnswer: 'Because God causes His sun to rise on the evil and the good, and sends rain on the righteous and the unrighteous',
    explanation: 'God extends common grace and providential blessings to all human beings without partiality; Christians emulate this universal divine benevolence.',
    socraticHint: 'How does God’s gift of sunshine and rain to both good and bad people model universal love?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-018',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'In Matthew 6:1-4, what warning does Jesus give about giving to the needy (charity)?',
    options: [
      'Do not give to be seen by others and do not blow a trumpet, but give in secret so your Father who sees in secret will reward you',
      'Always invite photographers when helping poor people so everyone knows',
      'Only give money to people who promise to vote for you',
      'Never give anything to anyone under any circumstances'
    ],
    correctAnswer: 'Do not give to be seen by others and do not blow a trumpet, but give in secret so your Father who sees in secret will reward you',
    explanation: 'Jesus condemns hypocritical giving designed for human admiration: "Do not let your left hand know what your right hand is doing, so that your giving may be in secret."',
    socraticHint: 'Should acts of charitable giving be done secretly for God or loudly for public attention?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-019',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'What instructions did Jesus give regarding prayer in Matthew 6:5-6?',
    options: [
      'Go into your inner room, close the door and pray to your Father in secret, rather than standing on street corners to be seen by people',
      'Shout loudly with megaphones so everyone knows you are praying',
      'Repeat the same empty words for hours without thinking',
      'Only pray when standing on high hilltops'
    ],
    correctAnswer: 'Go into your inner room, close the door and pray to your Father in secret, rather than standing on street corners to be seen by people',
    explanation: 'Authentic prayer is personal, intimate communion with our heavenly Father, avoiding theatrical performances designed to impress onlookers.',
    socraticHint: 'Where did Jesus teach us to go for private, intimate prayer with our heavenly Father?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-020',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'Why does Jesus caution against hoarding treasures on earth in Matthew 6:19-20?',
    options: [
      'Because on earth moths and rust destroy and thieves break in and steal, while heavenly treasures are secure forever',
      'Because money weighs down school bags',
      'Because banks did not exist in biblical times',
      'Because gold is dangerous to touch'
    ],
    correctAnswer: 'Because on earth moths and rust destroy and thieves break in and steal, while heavenly treasures are secure forever',
    explanation: 'Earthly wealth is perishable, insecure, and temporary. Heavenly treasures (faith, love, generosity, service) have eternal, incorruptible value.',
    socraticHint: 'What happens to material worldly wealth compared to eternal treasures stored in heaven?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-021',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'What profound truth does Matthew 6:21 declare about where a person’s heart is focused?',
    options: [
      '"For where your treasure is, there your heart will be also"',
      '"Your heart is located on the left side of your chest"',
      '"Treasures do not affect human emotions"',
      '"A wise heart thinks only about silver and gold"'
    ],
    correctAnswer: '"For where your treasure is, there your heart will be also"',
    explanation: 'Matthew 6:21 reveals that our desires, passions, and loyalties inevitably follow whatever we value most in life.',
    socraticHint: 'Where does your heart inevitably stay according to Matthew 6:21?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-022',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'In Matthew 6:24, why did Jesus declare that "no one can serve two masters"?',
    options: [
      'Either you will hate the one and love the other, or you will be devoted to one and despise the other. You cannot serve both God and money',
      'Because employees are only allowed to have one job contract',
      'Because human brains cannot remember two names',
      'Because masters are always enemies with each other'
    ],
    correctAnswer: 'Either you will hate the one and love the other, or you will be devoted to one and despise the other. You cannot serve both God and money',
    explanation: 'Spiritual loyalty cannot be divided: worshiping wealth and possessions crowds out wholehearted devotion and obedience to God.',
    socraticHint: 'Which two competing masters did Jesus say cannot be served at the same time?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-023',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'What prescription against anxiety over food and clothing did Jesus give in Matthew 6:33?',
    options: [
      '"But seek first his kingdom and his righteousness, and all these things will be given to you as well"',
      '"Borrow money from everyone you meet"',
      '"Never eat breakfast or wear warm clothes"',
      '"Worry day and night about tomorrow"'
    ],
    correctAnswer: '"But seek first his kingdom and his righteousness, and all these things will be given to you as well"',
    explanation: 'Matthew 6:33 establishes the golden priority of Christian living: making God’s Kingdom and righteousness our first pursuit, trusting God for daily provision.',
    socraticHint: 'What should we seek first above all worries according to Matthew 6:33?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u5-024',
    subStrandId: 'substrand-g6-cre-u5',
    lessonId: 'lesson-g6-cre-u5-l2',
    text: 'How does Jesus illustrate judging others versus examining oneself in Matthew 7:3-5?',
    options: [
      'Why look at the speck of sawdust in your brother’s eye and pay no attention to the plank in your own eye?',
      'Why carry a stick when you have a spear?',
      'Why walk on a road when you can ride a chariot?',
      'Why look at a tree when you can see a forest?'
    ],
    correctAnswer: 'Why look at the speck of sawdust in your brother’s eye and pay no attention to the plank in your own eye?',
    explanation: 'Jesus humorously yet piercingly warns against hypocritical judgment, commanding believers to remove the giant log of sin from their own eyes before correcting others.',
    socraticHint: 'What vivid picture of a speck of sawdust versus a wooden plank did Jesus use to teach about hypocritical judgment?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },

  // --- Unit 6: Parables of Mercy, Forgiveness, Accountability & Kingdom Life (q-g6-cre-u6-001 to 024) ---
  {
    id: 'q-g6-cre-u6-001',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'When Peter asked Jesus how many times he should forgive a brother who sins against him (Matthew 18:21), what was Jesus’s answer?',
    options: [
      'Not seven times, but seventy-seven times (limitless forgiveness)',
      'Only once, then cut all ties',
      'Three times, then retaliate with force',
      'Ten times, then report him to the elders'
    ],
    correctAnswer: 'Not seven times, but seventy-seven times (limitless forgiveness)',
    explanation: 'Jesus answered: "I tell you, not seven times, but seventy-seven times," signifying that forgiveness in God’s Kingdom must be boundless and continuous without keeping score.',
    socraticHint: 'Did Jesus limit forgiveness to 7 times, or did He say seventy-seven times to show it must be limitless?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-002',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'In the Parable of the Unforgiving Servant (Matthew 18:23-35), how large was the debt that the king graciously canceled for his servant?',
    options: [
      'Ten thousand talents (an astronomical, unpayable debt)',
      'Ten silver coins',
      'One loaf of bread',
      'Fifty copper denarii'
    ],
    correctAnswer: 'Ten thousand talents (an astronomical, unpayable debt)',
    explanation: 'Ten thousand talents represented millions of dollars—billions in modern terms—symbolizing the overwhelming, unpayable debt of human sin that God wipes away.',
    socraticHint: 'How huge was the debt canceled by the merciful king in the parable?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-003',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What shocking action did the forgiven servant take when he encountered a fellow servant who owed him a mere 100 denarii?',
    options: [
      'He choked him, demanded immediate payment, and had him thrown into prison',
      'He canceled the debt with joy',
      'He gave him an extra 100 denarii to help him',
      'He invited him to a feast at his house'
    ],
    correctAnswer: 'He choked him, demanded immediate payment, and had him thrown into prison',
    explanation: 'Despite having been forgiven an impossible debt, the wicked servant showed zero mercy for a tiny debt of 100 denarii, having his fellow servant jailed.',
    socraticHint: 'Did the forgiven servant show mercy to his debtor, or did he violently demand payment and jail him?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-004',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What consequence befell the unforgiving servant when the king heard about his cruelty (Matthew 18:32-34)?',
    options: [
      'The king called him a wicked servant, revoked the pardon, and handed him over to the jailers to be tortured until all was paid',
      'The king promoted him to prime minister',
      'The king gave him a reward for strict financial discipline',
      'The king ignored the matter entirely'
    ],
    correctAnswer: 'The king called him a wicked servant, revoked the pardon, and handed him over to the jailers to be tortured until all was paid',
    explanation: 'The king rebuked him: "Shouldn’t you have had mercy on your fellow servant just as I had on you?" and handed him over to punishment.',
    socraticHint: 'What did the master do when he discovered that his servant had refused to show mercy to a fellow worker?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-005',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What primary moral lesson does Jesus convey through the Parable of the Unforgiving Servant?',
    options: [
      'Since God has graciously forgiven us our immense debt of sin, we must genuinely forgive others from our hearts',
      'Never borrow money from anyone under any circumstances',
      'Kings should never forgive debts of their servants',
      'People should only forgive those who give them gifts'
    ],
    correctAnswer: 'Since God has graciously forgiven us our immense debt of sin, we must genuinely forgive others from our hearts',
    explanation: 'Matthew 18:35 concludes: "This is how my heavenly Father will treat each of you unless you forgive your brother or sister from your heart."',
    socraticHint: 'Why must we forgive others from our hearts in light of how much God has forgiven us?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-006',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'In the Parable of the Prodigal Son (Luke 15:11-32), what did the younger son do with his share of the estate?',
    options: [
      'He traveled to a distant country and squandered his wealth in wild, wasteful living',
      'He invested it in fertile farmland and doubled his inheritance',
      'He built schools and hospitals for poor children',
      'He gave it all to his older brother'
    ],
    correctAnswer: 'He traveled to a distant country and squandered his wealth in wild, wasteful living',
    explanation: 'The younger son demanded his inheritance prematurely, left his family, and squandered all his resources in reckless self-indulgence.',
    socraticHint: 'How did the younger son waste his inheritance in a faraway country?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-007',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'To what humiliating task was the prodigal son reduced when a severe famine struck the distant country (Luke 15:15)?',
    options: [
      'Feeding pigs and longing to fill his stomach with the carob pods the pigs were eating',
      'Working as a royal charioteer',
      'Cleaning the emperor’s palace garden',
      'Serving as a priest in a temple'
    ],
    correctAnswer: 'Feeding pigs and longing to fill his stomach with the carob pods the pigs were eating',
    explanation: 'For a Jewish boy, feeding unclean swine and starving alongside them was the ultimate symbol of utter moral and physical rock bottom.',
    socraticHint: 'Which unclean animals was the starving prodigal son hired to feed?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-008',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What happened when the prodigal son "came to his senses" (Luke 15:17-19)?',
    options: [
      'He acknowledged his sin against heaven and his father, and decided to return home to ask to be a hired servant',
      'He decided to become a bandit to steal food',
      'He blamed his father for giving him money too early',
      'He gave up and chose to starve in the pigpen'
    ],
    correctAnswer: 'He acknowledged his sin against heaven and his father, and decided to return home to ask to be a hired servant',
    explanation: 'Repentance begins when a sinner recognizes their brokenness, admits their sin, and humbly turns back to the Father seeking mercy.',
    socraticHint: 'What humble confession did the prodigal son prepare to say to his father upon his return?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-009',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'How did the father react when he saw his prodigal son returning from a long distance away (Luke 15:20)?',
    options: [
      'He was filled with compassion, ran to his son, threw his arms around him, and kissed him',
      'He locked the gate and ordered the servants to chase him away',
      'He demanded the full repayment of all squandered money before speaking',
      'He made his son sleep outside in the dirt for a month'
    ],
    correctAnswer: 'He was filled with compassion, ran to his son, threw his arms around him, and kissed him',
    explanation: 'The father had been watching and waiting. He cast aside cultural reserve, ran to meet his son, and lavished him with affectionate forgiveness.',
    socraticHint: 'Did the father reject his son or run out with open arms and kiss him?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-010',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What gifts did the father order for the returning prodigal son, symbolizing complete restoration of sonship (Luke 15:22)?',
    options: [
      'The best robe, a signet ring on his finger, sandals on his feet, and the fattened calf',
      'A wooden club, an iron chain, and prison clothes',
      'A broom, a bucket, and servant’s overalls',
      'A bill listing all the money he had lost'
    ],
    correctAnswer: 'The best robe, a signet ring on his finger, sandals on his feet, and the fattened calf',
    explanation: 'The robe restored honor, the ring granted family authority, sandals signified free sonship (slaves walked barefoot), and the calf marked joyous celebration.',
    socraticHint: 'Which three items of clothing and authority did the father bestow upon his restored son?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-011',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'How did the older brother react to the feast thrown for his younger brother (Luke 15:28)?',
    options: [
      'He became angry and refused to go inside, complaining that he had served faithfully without ever receiving a feast',
      'He danced joyfully and hugged his brother',
      'He cooked the fattened calf with his own hands',
      'He gave his brother all his own cattle as gifts'
    ],
    correctAnswer: 'He became angry and refused to go inside, complaining that he had served faithfully without ever receiving a feast',
    explanation: 'The older brother represented the legalistic Pharisees, harboring bitterness, self-righteous entitlement, and an inability to celebrate grace.',
    socraticHint: 'Why was the older brother resentful and bitter about the celebration for his returned brother?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-012',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l1',
    text: 'What tender words did the father speak to the older son in Luke 15:31-32 to explain why celebration was necessary?',
    options: [
      '"My son, you are always with me, and everything I have is yours. But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found"',
      '"Get out of my house if you don’t like the celebration"',
      '"You are no longer my son because you complained"',
      '"I gave your brother all your inheritance while you were in the fields"'
    ],
    correctAnswer: '"My son, you are always with me, and everything I have is yours. But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found"',
    explanation: 'The father reassured the elder son of his secure love, while emphasizing that the salvation and return of a lost soul demands joyful communal celebration.',
    socraticHint: 'How did the father explain that celebrating a brother who was lost but is now found was necessary?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-013',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'In the Parable of the Rich Fool (Luke 12:16-21), what problem did the rich landowner face after a bumper harvest?',
    options: [
      'He had no place to store all his overflowing crops',
      'His barns were destroyed by locusts',
      'The government confiscated all his grain',
      'All his workers went on strike'
    ],
    correctAnswer: 'He had no place to store all his overflowing crops',
    explanation: 'The rich man’s ground produced abundantly, so much that his existing barns could not contain the harvest, leading to his selfish plan.',
    socraticHint: 'What dilemma did the rich man encounter with his massive surplus harvest?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-014',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What selfish plan did the rich landowner formulate instead of sharing his surplus with the hungry and poor?',
    options: [
      '"I will tear down my barns and build bigger ones, and there I will store my surplus grain. And I will say to myself: Take life easy; eat, drink and be merry"',
      'He decided to distribute food to widows and orphans across the town',
      'He donated his grain to the temple in Jerusalem',
      'He sold his food at half-price to help famine victims'
    ],
    correctAnswer: '"I will tear down my barns and build bigger ones, and there I will store my surplus grain. And I will say to myself: Take life easy; eat, drink and be merry"',
    explanation: 'The rich man spoke only to himself, thinking only of himself: "my crops, my barns, my grain, my goods," completely ignoring God and needy neighbors.',
    socraticHint: 'Did the rich landowner plan to share with others or tear down his barns to store more for himself?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-015',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What solemn verdict did God pronounce on the rich man that very night (Luke 12:20)?',
    options: [
      '"You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?"',
      '"Well done, you are the smartest businessman in the city"',
      '"I will give you fifty more years of life to enjoy your wealth"',
      '"You will become an angel of financial success"'
    ],
    correctAnswer: '"You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?"',
    explanation: 'God called him a "fool" because he hoarded temporary wealth but neglected his eternal soul; death took him unexpectedly, leaving all his wealth behind.',
    socraticHint: 'What shocking news did God deliver to the rich man on the very night he finished his selfish plans?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-016',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What warning does Jesus give in Luke 12:15 immediately before telling the Parable of the Rich Fool?',
    options: [
      '"Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions"',
      '"Always make sure you have more money than your neighbors"',
      '"Do not plant crops during rainy seasons"',
      '"Spend all your money on expensive clothes"'
    ],
    correctAnswer: '"Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions"',
    explanation: 'Jesus cautioned against greed, teaching that true life and lasting fulfillment cannot be measured by physical possessions or bank balances.',
    socraticHint: 'What did Jesus say about the true meaning of life versus the abundance of material possessions?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-017',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What does it mean to be "rich toward God" (Luke 12:21)?',
    options: [
      'Investing in eternal spiritual values, honoring God with our resources, and generously sharing with those in need',
      'Putting millions of shillings in church bank accounts solely for status',
      'Wearing robes stitched with real gold threads',
      'Owning the largest house in the neighborhood'
    ],
    correctAnswer: 'Investing in eternal spiritual values, honoring God with our resources, and generously sharing with those in need',
    explanation: 'Being rich toward God means pursuing godliness, faith, love, humility, and sacrificial generosity that bear fruit for eternity.',
    socraticHint: 'How do generosity, faith, and helping the poor make a person truly rich in God’s eyes?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-018',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What specific question prompted Jesus to tell the Parable of the Good Samaritan (Luke 10:29)?',
    options: [
      'An expert in the law asked: "And who is my neighbor?"',
      'A Roman soldier asked: "Who is the emperor?"',
      'Peter asked: "How many fish will we catch today?"',
      'A tax collector asked: "How much tax should I pay?"'
    ],
    correctAnswer: 'An expert in the law asked: "And who is my neighbor?"',
    explanation: 'The expert in the law sought to justify himself and restrict the definition of neighbor; Jesus told the parable to show that love knows no boundaries.',
    socraticHint: 'What question did the religious lawyer ask to test Jesus about loving others?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-019',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What did the Jewish priest and Levite do when they saw the beaten, half-dead traveler lying beside the road to Jericho (Luke 10:31-32)?',
    options: [
      'They saw him and passed by on the other side of the road without helping',
      'They stopped and bandaged his bleeding wounds',
      'They carried him on their shoulders to the nearest hospital',
      'They chased away the robbers with spears'
    ],
    correctAnswer: 'They saw him and passed by on the other side of the road without helping',
    explanation: 'Both religious officials prioritized ritual purity and personal convenience over human mercy, crossing to the far side of the road to avoid helping.',
    socraticHint: 'Did the priest and Levite stop to help or did they cross over to the other side and walk past?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-020',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'Why was it extraordinary and shocking to the Jewish audience that a Samaritan was the hero of the story?',
    options: [
      'Because Jews and Samaritans harbored centuries of bitter ethnic, cultural, and religious hostility against each other',
      'Because Samaritans were known to be doctors',
      'Because Samaritans had no money',
      'Because Jews and Samaritans spoke completely different languages'
    ],
    correctAnswer: 'Because Jews and Samaritans harbored centuries of bitter ethnic, cultural, and religious hostility against each other',
    explanation: 'Jews despised Samaritans and avoided contact with them; the Samaritan acting with sacrificial love shattered ethnic prejudice and demonstrated true neighborliness.',
    socraticHint: 'Why was the Samaritan the most unexpected person to stop and help a Jewish traveler?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-021',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What practical medical and financial help did the Samaritan provide to the wounded traveler (Luke 10:34-35)?',
    options: [
      'He bandaged wounds with oil and wine, put him on his donkey, took him to an inn, and gave the innkeeper two denarii promising to reimburse any extra cost',
      'He gave him a glass of water and walked away',
      'He called the Roman soldiers to arrest the innkeeper',
      'He took the man’s clothes and left him at the roadside'
    ],
    correctAnswer: 'He bandaged wounds with oil and wine, put him on his donkey, took him to an inn, and gave the innkeeper two denarii promising to reimburse any extra cost',
    explanation: 'The Samaritan showed thorough, sacrificial compassion: giving immediate first aid, personal transport, overnight care, and open-ended financial coverage.',
    socraticHint: 'What specific actions of first aid, transport, lodging, and money did the Samaritan provide?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-022',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'At the end of the parable, which command did Jesus give to the expert in the law (Luke 10:37)?',
    options: [
      '"Go and do likewise"',
      '"Go and build bigger barns"',
      '"Never speak to Samaritans again"',
      '"Become a priest in the temple"'
    ],
    correctAnswer: '"Go and do likewise"',
    explanation: 'Jesus commanded: "Go and do likewise," challenging every hearer to show active, boundary-crossing mercy to anyone in need.',
    socraticHint: 'What four-word command did Jesus give at the conclusion of the Good Samaritan parable?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-023',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'How can Kenyan primary school pupils apply the Good Samaritan principle to promote national harmony?',
    options: [
      'By helping any classmate or neighbor in need regardless of their tribe, religion, county of origin, or background',
      'By only sharing food with pupils from their own ethnic community',
      'By avoiding people who speak different local languages',
      'By refusing to participate in school group activities'
    ],
    correctAnswer: 'By helping any classmate or neighbor in need regardless of their tribe, religion, county of origin, or background',
    explanation: 'The Good Samaritan principle destroys ethnic and religious barriers; it inspires Kenyan children to see every fellow human as a neighbor deserving love.',
    socraticHint: 'How does helping anyone in distress, regardless of their ethnic community, build national unity?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u6-024',
    subStrandId: 'substrand-g6-cre-u6',
    lessonId: 'lesson-g6-cre-u6-l2',
    text: 'What common theme connects both the Parable of the Prodigal Son and the Parable of the Good Samaritan?',
    options: [
      'Active, sacrificial, unconditional compassion that breaks through self-righteous human barriers and prejudices',
      'The importance of owning many farm animals',
      'How to make financial profits from trading in wheat',
      'Traveling long journeys on horseback'
    ],
    correctAnswer: 'Active, sacrificial, unconditional compassion that breaks through self-righteous human barriers and prejudices',
    explanation: 'Both parables showcase God’s radical, life-giving compassion: the father embracing a wayward son, and the Samaritan rescuing an ethnic enemy, overcoming all prejudice.',
    socraticHint: 'What supreme virtue of radical love and compassion connects both parables?',
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
console.log(`Added ${qCount} questions for Units 5 & 6.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 3 of Grade 6 CRE to cbe_database.json!');
