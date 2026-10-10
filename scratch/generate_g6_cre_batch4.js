/**
 * Grade 6 Christian Religious Education (CRE) - Batch 4 Generator
 * Content: Units 7 & 8 (Holy Spirit & Early Church, Christian Family Values & Friendship)
 * Missions: Orders 121, 122, 123, 124 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-cre-u7-001 to q-g6-cre-u8-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 CRE Batch 4 (Units 7 & 8) ---');

// 1. Units 7 & 8 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-cre-u7',
    strandId: 'strand-g6-cre-jesus',
    learningAreaId: 'la-cre-g6',
    title: 'The Holy Spirit & the Early Church’s Mission of Unity & Service',
    name: 'The Holy Spirit & the Early Church’s Mission of Unity & Service',
    description: 'The Day of Pentecost (Acts 2:1-4); biblical symbols of the Holy Spirit (wind, fire, dove, living water, oil); the nine fruits of the Holy Spirit (Galatians 5:22-23); gifts of the Spirit for building the Church (1 Corinthians 12); devotion, prayer, and voluntary communal sharing in the early church (Acts 2:42-47, Acts 4:32-35); Stephen’s faithful martyrdom and prayer of forgiveness (Acts 7); early missionary outreach (Philip and the Ethiopian official - Acts 8); fostering spiritual unity across cultural diversity.',
    cbeCompetency: 'Spiritual discernment, communal solidarity, empathy, and missionary service',
    estimatedMinutes: 30,
    order: 7,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-cre-u8',
    strandId: 'strand-g6-cre-living',
    learningAreaId: 'la-cre-g6',
    title: 'Christian Family Values, Friendship, Self-Control & Mental Well-being',
    name: 'Christian Family Values, Friendship, Self-Control & Mental Well-being',
    description: 'Biblical family foundations: mutual love, honoring parents with promise (Ephesians 6:1-3, Exodus 20:12); resolving family misunderstandings through humble dialogue and prayer; choosing wise, uplifting friends (Proverbs 27:17: "Iron sharpens iron"); resisting negative peer pressure, substance abuse (alcohol, miraa, drugs, tobacco), and reckless behavior; cultivating emotional self-control, spiritual resilience during adolescent growth, and maintaining mental health in school.',
    cbeCompetency: 'Family cohesion, positive peer influence, emotional self-regulation, and moral resilience',
    estimatedMinutes: 30,
    order: 8,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-cre-u7-l1',
    subStrandId: 'substrand-g6-cre-u7',
    title: 'The Day of Pentecost, Fruits & Gifts of the Holy Spirit',
    content: 'Before ascending into heaven, Jesus promised His disciples: "You will receive power when the Holy Spirit comes on you; and you will be my witnesses... to the ends of the earth" (Acts 1:8).\n\n1. The Outpouring at Pentecost (Acts 2:1-4):\n- The disciples were gathered in one place in Jerusalem when suddenly a sound like the blowing of a violent wind filled the room, and tongues of fire rested on each of them.\n- They were filled with the Holy Spirit and began speaking in other languages as the Spirit enabled them, proclaiming God’s wonders to pilgrims from every nation.\n\n2. Biblical Symbols of the Holy Spirit:\n- Wind: Invisible divine power and sovereignty (John 3:8).\n- Fire: Purification, zeal, and divine presence.\n- Dove: Peace, gentleness, and purity (seen at Jesus’ baptism).\n- Living Water: Spiritual refreshment and eternal life (John 7:38-39).\n\n3. The Fruit of the Spirit (Galatians 5:22-23):\n- The nine-fold fruit: Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, and Self-Control.\n- Spiritual fruit is produced naturally as a believer stays rooted in Christ (John 15:5).\n\n4. Spiritual Gifts for Edification (1 Corinthians 12):\n- Gifts such as wisdom, teaching, faith, healing, discernment, and administration are distributed by the Spirit to serve the common good.',
    didYouKnow: 'Pentecost was originally the Jewish Feast of Weeks (Shavuot), celebrating the grain harvest and the giving of the Law at Sinai 50 days after Passover!',
    kenyanContext: 'Churches in Kenya commemorate Pentecost Sunday with vibrant choral praise, baptism of new believers, and community service projects.',
    order: 13,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u7-l2',
    subStrandId: 'substrand-g6-cre-u7',
    title: 'Early Church Fellowship, Selfless Sharing & Stephen’s Faithfulness',
    content: 'The early Church in Jerusalem modeled radical communal love, selfless generosity, and courageous faithfulness under severe trials.\n\n1. Marks of Early Church Fellowship (Acts 2:42-47, Acts 4:32-35):\n- Devotion to the apostles’ teaching, fellowship, breaking of bread, and prayer.\n- Radical Generosity: Believers sold property and shared proceeds so that "there were no needy persons among them."\n- Joyful and Sincere Hearts: Meeting daily in homes with praise, earning the goodwill of all people as the Lord added daily to their numbers.\n\n2. The Selection of Seven Deacons (Acts 6:1-7):\n- Appointed to ensure Greek-speaking widows were treated equitably in daily food distribution, emphasizing justice and care for the vulnerable.\n\n3. Stephen’s Courage and Christ-like Forgiveness (Acts 6:8–7:60):\n- Stephen, a man full of God’s grace and power, boldly proclaimed Christ before the Sanhedrin.\n- When stoned to death, he prayed for his persecutors: "Lord, do not hold this sin against them," echoing Jesus on the cross and becoming the Church’s first martyr.\n\n4. Philip’s Cross-Cultural Mission (Acts 8):\n- Led by the Spirit to the desert road, Philip explained Isaiah 53 to the Ethiopian treasury official and baptized him, carrying the Gospel to the continent of Africa!',
    didYouKnow: 'The baptism of the Ethiopian official in Acts 8 marks one of the earliest recorded entries of the Christian Gospel into the African continent!',
    kenyanContext: 'Kenyan Christian communities emulate the early church through harambees (communal fundraising) to build schools, pay medical bills, and support orphanages.',
    order: 14,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u8-l1',
    subStrandId: 'substrand-g6-cre-u8',
    title: 'Honoring Parents, Family Pillars & Resolving Household Conflicts',
    content: 'The family is God’s foundational institution for nurture, moral instruction, emotional security, and spiritual transmission.\n\n1. Biblical Pillars of Christian Family Life:\n- The Fifth Commandment (Exodus 20:12, Ephesians 6:1-3): "Honor your father and your mother, so that you may live long and that it may go well with you"—the first commandment with a promise.\n- Mutual Respect: Children obey their parents in the Lord; parents guide children with patience and loving discipline without provoking them to anger (Ephesians 6:4).\n\n2. Contributing Positively to Home Life:\n- Assisting willingly with daily household chores (washing utensils, fetching water, caring for younger siblings, farming).\n- Expressing gratitude to parents and guardians for food, education, and shelter.\n- Daily family devotions, singing hymns, and praying together.\n\n3. Peaceful Resolution of Family Conflicts:\n- Sibling rivalry and misunderstandings occur in every household; resolving them requires active listening, humility, admitting mistakes, and mutual forgiveness.\n- Colossians 3:13: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."',
    didYouKnow: 'The biblical Hebrew word for "honor" is "kabad", which literally means to consider someone "heavy" or of great weight, dignity, and value!',
    kenyanContext: 'In Kenyan culture, respecting elders and parents is a sacred communal value echoed both in indigenous traditions and in Christian teachings.',
    order: 15,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u8-l2',
    subStrandId: 'substrand-g6-cre-u8',
    title: 'Uplifting Friendships, Resisting Negative Peer Pressure & Self-Control',
    content: 'Friendships deeply shape a young person’s moral decisions, character trajectory, and emotional well-being.\n\n1. Characteristics of Godly Friendship:\n- Proverbs 27:17: "As iron sharpens iron, so one person sharpens another." Good friends encourage us in academic excellence, moral purity, and faith.\n- Loyalty and Support: Proverbs 17:17 states: "A friend loves at all times, and a brother is born for a time of adversity." Exemplified by David and Jonathan’s selfless covenant friendship (1 Samuel 18).\n\n2. Danger of Negative Peer Pressure:\n- Warning from 1 Corinthians 15:33: "Do not be misled: Bad company corrupts good character."\n- Harmful Peer Influences: Bullying, cheating, stealing, truancy (sneaking out of school), viewing pornography, and experimenting with harmful substances (alcohol, miraa/khat, bhang, shisha, tobacco).\n\n3. Strategies for Standing Firm:\n- Assertiveness: Confidently saying a firm "No!" to evil without compromise.\n- Seeking Godly Companions: Associating with peers who share high moral values.\n- Practicing Self-Control (Galatians 5:23): Governing our thoughts, emotions, and physical impulses with spiritual discipline.\n- Seeking Guidance: Talking openly with parents, teachers, and school chaplains when stressed or troubled.',
    didYouKnow: 'Jonathan gave his royal robe, tunic, sword, bow, and belt to David as a token of selfless covenant friendship, surrendering his own claim to the throne!',
    kenyanContext: 'School guidance and counseling departments and Christian Union mentorship programs across Kenya empower pupils with life skills to resist drug abuse and negative peer pressure.',
    order: 16,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 121, 122, 123, 124 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-cre-u7-m1',
    worldId: 'world-faith-values',
    title: 'Mission 121: Pentecost Flames – The Holy Spirit & The Ninefold Fruit',
    description: 'Experience the mighty wind and tongues of fire at Pentecost, uncover the divine symbols of the Spirit, and cultivate the ninefold Fruit of the Spirit.',
    order: 121,
    orderIndex: 121,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-pentecost-flame',
    badge: 'badge-g6-cre-pentecost-flame',
    lessonId: 'lesson-g6-cre-u7-l1',
    questionIds: [
      'q-g6-cre-u7-001', 'q-g6-cre-u7-002', 'q-g6-cre-u7-003', 'q-g6-cre-u7-004',
      'q-g6-cre-u7-005', 'q-g6-cre-u7-006', 'q-g6-cre-u7-007', 'q-g6-cre-u7-008',
      'q-g6-cre-u7-009', 'q-g6-cre-u7-010', 'q-g6-cre-u7-011', 'q-g6-cre-u7-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u7-m2',
    worldId: 'world-faith-values',
    title: 'Mission 122: Acts of the Apostles – Early Church Fellowship & Stephen’s Faith',
    description: 'Witness the selfless sharing of early believers in Jerusalem, emulate Stephen’s forgiving courage, and follow Philip’s mission to the Ethiopian seeker.',
    order: 122,
    orderIndex: 122,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-early-apostle',
    badge: 'badge-g6-cre-early-apostle',
    lessonId: 'lesson-g6-cre-u7-l2',
    questionIds: [
      'q-g6-cre-u7-013', 'q-g6-cre-u7-014', 'q-g6-cre-u7-015', 'q-g6-cre-u7-016',
      'q-g6-cre-u7-017', 'q-g6-cre-u7-018', 'q-g6-cre-u7-019', 'q-g6-cre-u7-020',
      'q-g6-cre-u7-021', 'q-g6-cre-u7-022', 'q-g6-cre-u7-023', 'q-g6-cre-u7-024'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u8-m1',
    worldId: 'world-faith-values',
    title: 'Mission 123: Pillars of the Hearth – Honoring Parents & Household Peace',
    description: 'Honor your father and mother with the commandment of promise, build loving family harmony, and resolve sibling disputes through Christ-like forgiveness.',
    order: 123,
    orderIndex: 123,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-family-pillar',
    badge: 'badge-g6-cre-family-pillar',
    lessonId: 'lesson-g6-cre-u8-l1',
    questionIds: [
      'q-g6-cre-u8-001', 'q-g6-cre-u8-002', 'q-g6-cre-u8-003', 'q-g6-cre-u8-004',
      'q-g6-cre-u8-005', 'q-g6-cre-u8-006', 'q-g6-cre-u8-007', 'q-g6-cre-u8-008',
      'q-g6-cre-u8-009', 'q-g6-cre-u8-010', 'q-g6-cre-u8-011', 'q-g6-cre-u8-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u8-m2',
    worldId: 'world-faith-values',
    title: 'Mission 124: Iron Sharpens Iron – True Friendship & Self-Control Fortress',
    description: 'Forge uplifting friendships like David and Jonathan, say a courageous "No!" to substance abuse and negative pressure, and master emotional self-control.',
    order: 124,
    orderIndex: 124,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-moral-fortress',
    badge: 'badge-g6-cre-moral-fortress',
    lessonId: 'lesson-g6-cre-u8-l2',
    questionIds: [
      'q-g6-cre-u8-013', 'q-g6-cre-u8-014', 'q-g6-cre-u8-015', 'q-g6-cre-u8-016',
      'q-g6-cre-u8-017', 'q-g6-cre-u8-018', 'q-g6-cre-u8-019', 'q-g6-cre-u8-020',
      'q-g6-cre-u8-021', 'q-g6-cre-u8-022', 'q-g6-cre-u8-023', 'q-g6-cre-u8-024'
    ],
    learningAreaId: 'la-cre-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 7: The Holy Spirit & Early Church's Mission (q-g6-cre-u7-001 to 024) ---
  {
    id: 'q-g6-cre-u7-001',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'What promise did Jesus give His disciples in Acts 1:8 concerning the Holy Spirit before His ascension?',
    options: [
      '"You will receive power when the Holy Spirit comes on you; and you will be my witnesses... to the ends of the earth"',
      '"You will become wealthy Roman officials"',
      '"You will build a magnificent temple made of marble"',
      '"You will never face any trials or difficulties"'
    ],
    correctAnswer: '"You will receive power when the Holy Spirit comes on you; and you will be my witnesses... to the ends of the earth"',
    explanation: 'Acts 1:8 promises divine power through the Holy Spirit, enabling disciples to be bold witnesses for Christ locally and globally.',
    socraticHint: 'What divine empowerment did Jesus promise would enable His disciples to be witnesses everywhere?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-002',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'What two dramatic physical manifestations occurred when the Holy Spirit descended on the Day of Pentecost (Acts 2:2-3)?',
    options: [
      'A sound like the blowing of a violent wind and tongues of fire resting on each disciple',
      'An earthquake and a flash of lightning that burned the house down',
      'Heavy snowfall and hail falling inside the room',
      'A loud trumpet blast from an angel in the sky'
    ],
    correctAnswer: 'A sound like the blowing of a violent wind and tongues of fire resting on each disciple',
    explanation: 'Acts 2:2-3 describes a sound like a rushing violent wind from heaven, followed by divided tongues like fire resting upon each of the disciples.',
    socraticHint: 'Which two signs—one sounding like wind and the other looking like fire—marked Pentecost?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-003',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'What miraculous ability did the disciples demonstrate immediately after being filled with the Holy Spirit at Pentecost (Acts 2:4)?',
    options: [
      'They began speaking in other languages, proclaiming the wonders of God to pilgrims from many nations',
      'They became invisible and walked through stone walls',
      'They floated in the air above Jerusalem',
      'They predicted the weather for the next fifty years'
    ],
    correctAnswer: 'They began speaking in other languages, proclaiming the wonders of God to pilgrims from many nations',
    explanation: 'The Spirit enabled the Galilean disciples to speak in the native languages of visiting Jewish pilgrims from Parthia, Media, Egypt, Rome, and Arabia.',
    socraticHint: 'In what supernatural way did the disciples praise God so that visitors from other countries understood them?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-004',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'Which biblical symbol of the Holy Spirit was visible at the baptism of Jesus in the Jordan River (Luke 3:22)?',
    options: [
      'A dove descending in bodily form',
      'A roaring lion',
      'A golden chariot',
      'A bronze serpent'
    ],
    correctAnswer: 'A dove descending in bodily form',
    explanation: 'Luke 3:22 records: "and the Holy Spirit descended on him in bodily form like a dove," symbolizing peace, purity, and gentle divine presence.',
    socraticHint: 'Which gentle bird descended upon Jesus when John the Baptist baptized Him in the Jordan River?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-005',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'How many fruits of the Holy Spirit are listed by Apostle Paul in Galatians 5:22-23?',
    options: [
      'Nine: Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, and Self-Control',
      'Twelve fruits corresponding to the twelve apostles',
      'Seven fruits corresponding to the seven days of creation',
      'Three fruits: Faith, Hope, and Charity'
    ],
    correctAnswer: 'Nine: Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, and Self-Control',
    explanation: 'Galatians 5:22-23 lists nine character dimensions that comprise the single "fruit" of the Spirit, reflecting Christ-like moral character.',
    socraticHint: 'How many virtues make up the Fruit of the Spirit listed in Galatians chapter 5?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-006',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'What is the vital difference between the "Fruit of the Spirit" and the "Gifts of the Spirit"?',
    options: [
      'The Fruit represents Christ-like character developed in all believers; the Gifts are diverse abilities distributed to different believers for service',
      'The Fruit is only for church leaders, while Gifts are for children',
      'There is no difference between the two concepts',
      'The Fruit is temporary on earth, while Gifts last into heaven'
    ],
    correctAnswer: 'The Fruit represents Christ-like character developed in all believers; the Gifts are diverse abilities distributed to different believers for service',
    explanation: 'Every Christian is called to manifest all nine aspects of the Fruit of the Spirit (character); the Gifts (service abilities) are distributed variously by the Spirit.',
    socraticHint: 'Does the Fruit describe Christian character while Gifts describe functional abilities to serve?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-007',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'In 1 Corinthians 12:7, why does God distribute spiritual gifts to individual members of the Church?',
    options: [
      '"For the common good (to build up and serve the community)"',
      'So that gifted members can charge others for their prayers',
      'To make some Christians feel superior to everyone else',
      'To see who can win the most popularity contests'
    ],
    correctAnswer: '"For the common good (to build up and serve the community)"',
    explanation: '1 Corinthians 12:7 affirms: "Now to each one the manifestation of the Spirit is given for the common good," emphasizing selfless mutual upbuilding.',
    socraticHint: 'For whose benefit does the Holy Spirit give spiritual gifts according to 1 Corinthians 12?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-008',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'Which symbol of the Holy Spirit represents spiritual cleansing, purification of heart, and fervent zeal for God?',
    options: [
      'Fire',
      'Stone',
      'Bronze',
      'Iron'
    ],
    correctAnswer: 'Fire',
    explanation: 'Fire purifies precious metals from dross; as a symbol of the Spirit, fire represents divine holiness, moral purification, and passionate spiritual fervor.',
    socraticHint: 'Which burning element purifies gold and silver and symbolizes the refining power of the Spirit?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-009',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'What did Jesus mean when He referred to the Holy Spirit as "Living Water" in John 7:37-39?',
    options: [
      'The Holy Spirit satisfies the deepest spiritual thirst of the soul and brings continuous spiritual life and renewal',
      'The Holy Spirit is physical bottled water sold in stores',
      'The Holy Spirit only visits people when it rains',
      'Water has no spiritual meaning in the Bible'
    ],
    correctAnswer: 'The Holy Spirit satisfies the deepest spiritual thirst of the soul and brings continuous spiritual life and renewal',
    explanation: 'Jesus declared: "Whoever believes in me, rivers of living water will flow from within them," pointing to the indwelling Holy Spirit satisfying spiritual thirst.',
    socraticHint: 'How does the Holy Spirit quench spiritual longing like cool water quenches physical thirst?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-010',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'In John 14:16, what title did Jesus give to the Holy Spirit when promising that He would dwell with believers forever?',
    options: [
      'The Advocate (Helper, Counselor, or Comforter)',
      'The Military General',
      'The Political Governor',
      'The Master of Ceremonies'
    ],
    correctAnswer: 'The Advocate (Helper, Counselor, or Comforter)',
    explanation: 'Jesus promised the "Paraclete" (Advocate, Helper, Counselor, Comforter) who stands alongside believers to guide, strengthen, and comfort them.',
    socraticHint: 'Which title translates "Paraclete", meaning one called alongside to help, advise, and comfort?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-011',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'How does cultivating the fruit of "patience" help a Grade 6 student in school life?',
    options: [
      'It enables them to stay calm when provoked, wait gracefully in lines, and persevere through difficult study assignments',
      'It allows them to avoid studying until the last minute',
      'It makes them sleep during examinations',
      'It teaches them never to speak in class'
    ],
    correctAnswer: 'It enables them to stay calm when provoked, wait gracefully in lines, and persevere through difficult study assignments',
    explanation: 'Patience (long-suffering) fosters self-control, resilience under pressure, and peaceful responses when dealing with frustrating situations or slow progress.',
    socraticHint: 'How does the fruit of patience help when waiting your turn or dealing with annoying situations?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-012',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l1',
    text: 'According to Galatians 5:19-21, what "works of the flesh" directly oppose the Fruit of the Holy Spirit?',
    options: [
      'Hatred, discord, jealousy, fits of rage, selfish ambition, dissensions, and envy',
      'Hard work, study, and reading good books',
      'Planting trees and helping elderly neighbors',
      'Singing hymns and praying with family'
    ],
    correctAnswer: 'Hatred, discord, jealousy, fits of rage, selfish ambition, dissensions, and envy',
    explanation: 'Paul contrasts the godly Fruit of the Spirit with destructive sinful behaviors: hostility, wrath, envy, and divisions that tear communities apart.',
    socraticHint: 'Which negative destructive attitudes tear people apart contrary to the Fruit of the Spirit?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-013',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'According to Acts 2:42, what four core spiritual practices did the early Christian community devote themselves to continually?',
    options: [
      'The apostles’ teaching, fellowship, breaking of bread, and prayer',
      'Trading in gold, military drills, chariot races, and politics',
      'Hunting wildlife, sailing ships, building walls, and wrestling',
      'Collecting taxes, memorizing Roman laws, dancing, and feasting'
    ],
    correctAnswer: 'The apostles’ teaching, fellowship, breaking of bread, and prayer',
    explanation: 'Acts 2:42 identifies the four pillars of apostolic church life: sound biblical doctrine, loving communal fellowship, the Lord’s Supper, and united prayer.',
    socraticHint: 'What four foundational practices did the early church devote themselves to in Acts 2:42?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-014',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'How did the early believers in Jerusalem demonstrate radical communal love regarding their possessions (Acts 4:32-35)?',
    options: [
      'They shared everything in common, and those who owned land or houses sold them to provide for anyone in need',
      'They hoarded all their wealth in secret mountain caves',
      'They charged high interest rates when lending to poor church members',
      'They refused to help anyone who was not wealthy'
    ],
    correctAnswer: 'They shared everything in common, and those who owned land or houses sold them to provide for anyone in need',
    explanation: 'Acts 4:34 records: "There were no needy persons among them. For from time to time those who owned land or houses sold them... and it was distributed to anyone who had need."',
    socraticHint: 'How did early Christians ensure that no brother or sister in the church went hungry or lacked shelter?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-015',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'Why were seven deacons (including Stephen and Philip) appointed by the apostles in Acts 6:1-6?',
    options: [
      'To oversee the daily distribution of food to widows fairly, allowing the apostles to focus on prayer and the ministry of the Word',
      'To lead a military rebellion against the Roman governor',
      'To build a new palace for Peter in Jerusalem',
      'To collect entrance fees from visitors at the temple gate'
    ],
    correctAnswer: 'To oversee the daily distribution of food to widows fairly, allowing the apostles to focus on prayer and the ministry of the Word',
    explanation: 'When Greek-speaking widows were being overlooked, the church selected seven men full of the Spirit and wisdom to manage equitable welfare distribution.',
    socraticHint: 'Why did the early church choose seven wise deacons to handle food distribution to widows?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-016',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'What was Stephen’s dying prayer as he was being stoned to death outside Jerusalem (Acts 7:60)?',
    options: [
      '"Lord, do not hold this sin against them"',
      '"Lord, destroy all my enemies with fire"',
      '"Cursed be everyone who throws a stone"',
      '"Why have you abandoned me to die?"'
    ],
    correctAnswer: '"Lord, do not hold this sin against them"',
    explanation: 'Stephen fell on his knees and cried out: "Lord, do not hold this sin against them," mirroring Christ’s cross prayer ("Father, forgive them") and manifesting ultimate grace.',
    socraticHint: 'What forgiving prayer did Stephen pray for the people who were throwing stones at him?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-017',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'Which young man stood by giving approval to Stephen’s martyrdom, guarding the coats of those who stoned him (Acts 7:58, 8:1)?',
    options: [
      'Saul of Tarsus (who later became Apostle Paul)',
      'Barnabas of Cyprus',
      'Nicodemus the Pharisee',
      'Cornelius the Centurion'
    ],
    correctAnswer: 'Saul of Tarsus (who later became Apostle Paul)',
    explanation: 'Acts 7:58 records that witnesses laid their coats at the feet of a young man named Saul, who later encountered the risen Christ on the road to Damascus.',
    socraticHint: 'Which zealous young Pharisee, later converted to become the great Apostle to the Gentiles, witnessed Stephen’s death?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-018',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'In Acts 8:26-39, what was the Ethiopian royal official reading in his chariot when Philip approached him on the desert road?',
    options: [
      'The Book of Prophet Isaiah (specifically Isaiah 53 about the Suffering Servant)',
      'The Code of Hammurabi',
      'The Book of Proverbs',
      'Roman military navigation charts'
    ],
    correctAnswer: 'The Book of Prophet Isaiah (specifically Isaiah 53 about the Suffering Servant)',
    explanation: 'The Ethiopian was reading Isaiah 53:7-8: "He was led like a sheep to the slaughter..." Philip explained the good news about Jesus, and the official believed and was baptized.',
    socraticHint: 'Which Old Testament prophetic book was the Ethiopian official reading in his chariot?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-019',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'What major lesson about racial and cultural inclusion is taught by the baptism of the Ethiopian official (Acts 8)?',
    options: [
      'The Gospel of Jesus Christ transcends all racial, national, and geographic barriers, welcoming African believers as equal partners',
      'Christianity was only meant for European and Roman citizens',
      'People from Africa were forbidden from being baptized',
      'Only kings and emperors are allowed to read the scriptures'
    ],
    correctAnswer: 'The Gospel of Jesus Christ transcends all racial, national, and geographic barriers, welcoming African believers as equal partners',
    explanation: 'The conversion of the Ethiopian official highlights that the Gospel is universal, breaking racial and geographical frontiers to include Africa from the apostolic dawn.',
    socraticHint: 'How does Philip baptizing the Ethiopian show that God welcomes all people of every race and nation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-020',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'Who was Barnabas in the early church, and what meaningful name did the apostles give him (Acts 4:36)?',
    options: [
      'Joseph, a Levite from Cyprus, called Barnabas which means "Son of Encouragement"',
      'A Roman soldier called "Son of Thunder"',
      'A tax collector called "Son of Wealth"',
      'A fisherman called "Son of Galilee"'
    ],
    correctAnswer: 'Joseph, a Levite from Cyprus, called Barnabas which means "Son of Encouragement"',
    explanation: 'Barnabas earned the title "Son of Encouragement" because he generously sold a field to aid the poor and consistently affirmed, welcomed, and mentored others (like Saul and Mark).',
    socraticHint: 'What nickname meaning "Son of Encouragement" was given to generous Barnabas?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-021',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'What grave sin did Ananias and Sapphira commit in Acts 5:1-11 that brought divine judgment upon them?',
    options: [
      'They lied to the Holy Spirit and the church by pretending they had donated the entire sale price of their land while secretly keeping back part',
      'They refused to sing during worship services',
      'They broke the temple stone gates',
      'They traveled outside Jerusalem on a Sabbath day'
    ],
    correctAnswer: 'They lied to the Holy Spirit and the church by pretending they had donated the entire sale price of their land while secretly keeping back part',
    explanation: 'Peter said: "You have not lied just to human beings but to God." Their sin was deceit and hypocritical posturing for spiritual praise.',
    socraticHint: 'What dishonest lie about their financial donation did Ananias and Sapphira tell the apostles?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-022',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'How did persecution against the early church in Jerusalem actually advance God’s mission (Acts 8:4)?',
    options: [
      'Those who were scattered by persecution preached the Word everywhere they traveled, spreading the Gospel beyond Jerusalem',
      'It forced all the apostles to quit preaching permanently',
      'It caused the disciples to abandon their faith in Christ',
      'It made the church completely disappear from history'
    ],
    correctAnswer: 'Those who were scattered by persecution preached the Word everywhere they traveled, spreading the Gospel beyond Jerusalem',
    explanation: 'Acts 8:4 records: "Those who had been scattered preached the word wherever they went," fulfilling Acts 1:8 by carrying the Gospel into Judea, Samaria, and Phoenicia.',
    socraticHint: 'How did being scattered by persecution help spread the good news to new cities and regions?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-023',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'What value does the early church’s sharing practice hold for the Kenyan spirit of "Harambee" (pulling together)?',
    options: [
      'It reinforces that true community involves sharing resources, supporting the vulnerable, and pooling funds for communal welfare',
      'It teaches that only rich people should contribute money to projects',
      'It proves that communal work is ungodly',
      'It suggests that people should only help their direct relatives'
    ],
    correctAnswer: 'It reinforces that true community involves sharing resources, supporting the vulnerable, and pooling funds for communal welfare',
    explanation: 'Kenya’s national motto of Harambee aligns deeply with apostolic sharing, where collective pooling of resources uplifts the sick, orphans, and community development.',
    socraticHint: 'How does the apostolic example of pooling resources reflect Kenya’s Harambee tradition?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u7-024',
    subStrandId: 'substrand-g6-cre-u7',
    lessonId: 'lesson-g6-cre-u7-l2',
    text: 'What role did the Holy Spirit play in directing Philip to the desert road to meet the Ethiopian official (Acts 8:29)?',
    options: [
      'The Spirit explicitly told Philip: "Go to that chariot and stay near it," guiding him with precise divine timing',
      'Philip saw an announcement on a noticeboard',
      'Philip was arrested and taken to the chariot by soldiers',
      'Philip was looking for a lost donkey in the desert'
    ],
    correctAnswer: 'The Spirit explicitly told Philip: "Go to that chariot and stay near it," guiding him with precise divine timing',
    explanation: 'The Holy Spirit orchestrated the divine appointment, directing Philip’s steps to connect with a hungry spiritual seeker at the exact moment he was reading scripture.',
    socraticHint: 'How did the Holy Spirit prompt Philip to approach the chariot on the desert road?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },

  // --- Unit 8: Christian Family Values, Friendship & Self-Control (q-g6-cre-u8-001 to 024) ---
  {
    id: 'q-g6-cre-u8-001',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'In Ephesians 6:1-3, what special promise is attached to the commandment to honor your parents?',
    options: [
      '"That it may go well with you and that you may enjoy long life on the earth"',
      '"That you will become a millionaire before age twenty"',
      '"That you will never have to wash dishes at home"',
      '"That you will never take any examinations in school"'
    ],
    correctAnswer: '"That it may go well with you and that you may enjoy long life on the earth"',
    explanation: 'Paul notes that the Fifth Commandment is "the first commandment with a promise: that it may go well with you and that you may enjoy long life on the earth."',
    socraticHint: 'What double blessing of life and well-being did God promise to children who honor their parents?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-002',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'What does Ephesians 6:4 instruct Christian parents regarding how they should raise their children?',
    options: [
      '"Fathers, do not exasperate (provoke) your children; instead, bring them up in the training and instruction of the Lord"',
      '"Fathers, leave your children to raise themselves on the streets"',
      '"Never speak to your children about spiritual matters"',
      '"Give children everything they demand without discipline"'
    ],
    correctAnswer: '"Fathers, do not exasperate (provoke) your children; instead, bring them up in the training and instruction of the Lord"',
    explanation: 'Ephesians 6:4 instructs parents to avoid harshness and unreasonable provocation, nurturing children patiently in godly instruction and discipline.',
    socraticHint: 'How does scripture instruct parents to nurture children with patience rather than provoke them to anger?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-003',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'How can a Grade 6 child show genuine honor and respect to their parents on a daily basis?',
    options: [
      'By obeying instructions cheerfully, helping with home chores, speaking respectfully, and praying for them',
      'By arguing loudly whenever asked to do chores',
      'By ignoring parents’ advice and running away with rebellious friends',
      'By only talking to parents when demanding pocket money'
    ],
    correctAnswer: 'By obeying instructions cheerfully, helping with home chores, speaking respectfully, and praying for them',
    explanation: 'Honoring parents involves practical helpfulness, courteous words, loving obedience, and gratitude for their tireless sacrifices.',
    socraticHint: 'What helpful, obedient actions demonstrate true respect for parents at home?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-004',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'What Christian principle from Colossians 3:13 should be applied when siblings argue over television channels or household chores?',
    options: [
      '"Bear with each other and forgive one another... Forgive as the Lord forgave you"',
      '"Whoever shouts loudest wins the dispute"',
      '"Use physical force to settle who gets the item"',
      '"Stop talking to your sibling for the rest of the year"'
    ],
    correctAnswer: '"Bear with each other and forgive one another... Forgive as the Lord forgave you"',
    explanation: 'Colossians 3:13 commands mutual forbearance and quick forgiveness, resolving home disputes through love and Christ-like grace.',
    socraticHint: 'How should brothers and sisters resolve minor fights based on Colossians 3:13?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-005',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'Why are daily family devotions (reading scripture and praying together) essential for a Christian home?',
    options: [
      'They build spiritual unity, instill moral values in children, invite God’s blessing, and strengthen family bonds',
      'They take the place of attending school during weekdays',
      'They make family members too tired to have conversations',
      'They are an ancient legal punishment'
    ],
    correctAnswer: 'They build spiritual unity, instill moral values in children, invite God’s blessing, and strengthen family bonds',
    explanation: 'Family prayer and Bible reading foster spiritual resilience, open channels of honest communication, and root children in God’s peace.',
    socraticHint: 'How does praying together as a family each evening draw family members closer to God and each other?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-006',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'In 1 Timothy 5:8, what strong warning is given to someone who fails to provide for and care for their own family members?',
    options: [
      '"Anyone who does not provide for their relatives, and especially for their own household, has denied the faith and is worse than an unbeliever"',
      '"They should be rewarded with a medal of independence"',
      '"They have fulfilled all requirements of the church"',
      '"They will automatically become rich"'
    ],
    correctAnswer: '"Anyone who does not provide for their relatives, and especially for their own household, has denied the faith and is worse than an unbeliever"',
    explanation: '1 Timothy 5:8 underscores that neglecting the care and support of one’s family is a grave moral failure that denies Christian faith.',
    socraticHint: 'What does scripture say about a person who refuses to care for the needs of their own family?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-007',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'What should children do when their parents or guardians face difficult financial hardships and cannot afford luxury items?',
    options: [
      'Express empathy, show contentment with what is available, assist at home, and pray for God’s provision',
      'Throw temper tantrums and refuse to eat food',
      'Steal money from neighbors’ houses',
      'Mock and belittle their parents'
    ],
    correctAnswer: 'Express empathy, show contentment with what is available, assist at home, and pray for God’s provision',
    explanation: 'Christian maturity is demonstrated when children appreciate their parents’ sacrifices, exercise contentment, and stand with their family in hard times.',
    socraticHint: 'How does showing contentment and gratitude support parents when money is tight?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-008',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'How did Jesus care for His earthly mother Mary even as He hung dying on the cross (John 19:26-27)?',
    options: [
      'He entrusted Mary to the care of His beloved disciple John, saying: "Dear woman, here is your son," and to John: "Here is your mother"',
      'He asked the Roman soldiers to arrest her',
      'He told her to return alone to Nazareth',
      'He ignored her completely'
    ],
    correctAnswer: 'He entrusted Mary to the care of His beloved disciple John, saying: "Dear woman, here is your son," and to John: "Here is your mother"',
    explanation: 'Even in His deepest physical agony, Jesus fulfilled the duty of filial love, ensuring His mother was provided for and protected by John.',
    socraticHint: 'To which beloved disciple did Jesus entrust His mother Mary from the cross?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-009',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'How does Proverbs 22:6 describe the enduring impact of godly parenting on a child’s lifelong moral journey?',
    options: [
      '"Start children off on the way they should go, and even when they are old they will not turn from it"',
      '"Children will always do the exact opposite of what parents teach"',
      '"Only teachers in school can teach children what is right"',
      '"Children should be left to learn from social media alone"'
    ],
    correctAnswer: '"Start children off on the way they should go, and even when they are old they will not turn from it"',
    explanation: 'Proverbs 22:6 highlights the foundational power of early parental training in shaping lasting character, integrity, and faith.',
    socraticHint: 'What proverb promises that children trained in the right way will remember it even in old age?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-010',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'What destructive habit breaks trust and creates deep hostility between siblings in a home?',
    options: [
      'Tattletale lying, backbiting, stealing each other’s belongings, and jealousy',
      'Helping each other with mathematics revision',
      'Singing together during dishwashing',
      'Praying for each other before bed'
    ],
    correctAnswer: 'Tattletale lying, backbiting, stealing each other’s belongings, and jealousy',
    explanation: 'Dishonesty, theft, and jealousy breed bitterness and division among siblings, eroding the sacred bond of family trust.',
    socraticHint: 'Which dishonest behaviors poison sibling relationships and destroy household harmony?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-011',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'How did Ruth demonstrate extraordinary family loyalty and love toward her widowed mother-in-law Naomi (Ruth 1:16-17)?',
    options: [
      'She refused to leave her, declaring: "Where you go I will go... Your people will be my people and your God my God"',
      'She abandoned Naomi to marry a rich foreign merchant',
      'She demanded Naomi’s remaining inheritance money',
      'She complained that Naomi was a burden to her'
    ],
    correctAnswer: 'She refused to leave her, declaring: "Where you go I will go... Your people will be my people and your God my God"',
    explanation: 'Ruth showed selfless covenant loyalty (hesed), clinging to Naomi in her grief and adopting Naomi’s people and God as her own.',
    socraticHint: 'What famous words of devotion did Ruth speak to Naomi when Naomi urged her to return home?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-012',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l1',
    text: 'What should a student do if they feel overwhelmed by family stress or emotional anxiety at home?',
    options: [
      'Confide in a trusted school guidance counselor, chaplain, or mature Christian teacher who can offer prayer and counsel',
      'Keep it bottled up inside and start taking illicit drugs',
      'Run away from home and live on the streets',
      'Post angry threats against their family on social media'
    ],
    correctAnswer: 'Confide in a trusted school guidance counselor, chaplain, or mature Christian teacher who can offer prayer and counsel',
    explanation: 'Seeking godly, professional guidance from trusted counselors or chaplains provides emotional support, pastoral wisdom, and healthy solutions.',
    socraticHint: 'Who at school can you turn to safely for spiritual advice and counseling during hard family times?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-013',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What wisdom about friendship is expressed in Proverbs 27:17?',
    options: [
      '"As iron sharpens iron, so one person sharpens another"',
      '"A friend should always lend you money without asking for it back"',
      '"True friends never correct your mistakes"',
      '"Having many friends is better than having wise friends"'
    ],
    correctAnswer: '"As iron sharpens iron, so one person sharpens another"',
    explanation: 'Proverbs 27:17 shows that true friends positively challenge, sharpen, and refine each other’s intellect, character, and spiritual walk.',
    socraticHint: 'Which proverb compares the positive mutual influence of true friends to two iron blades sharpening each other?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-014',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'How did Jonathan demonstrate selfless covenant friendship toward David in 1 Samuel 18:3-4?',
    options: [
      'He made a covenant with David and gave him his own royal robe, tunic, sword, bow, and belt',
      'He tried to poison David out of jealousy for the crown',
      'He demanded that David bow down before him as prince',
      'He told King Saul where David was hiding so Saul could kill him'
    ],
    correctAnswer: 'He made a covenant with David and gave him his own royal robe, tunic, sword, bow, and belt',
    explanation: 'Jonathan gave David his royal robe and weapons, symbolically surrendering his royal rights to David in profound selfless love.',
    socraticHint: 'What royal items did Prince Jonathan give to David as a token of covenant loyalty?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-015',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What stern warning does 1 Corinthians 15:33 deliver about associating closely with corrupt companions?',
    options: [
      '"Do not be misled: Bad company corrupts good character"',
      '"Bad friends will help you become stronger in your faith"',
      '"You can do whatever your friends do without any consequences"',
      '"Company does not affect how you think or behave"'
    ],
    correctAnswer: '"Do not be misled: Bad company corrupts good character"',
    explanation: '1 Corinthians 15:33 emphasizes that spending continuous time with immoral, dishonest peers gradually erodes personal integrity and values.',
    socraticHint: 'What does Paul say bad company does to a person’s good character?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-016',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What is negative peer pressure in a primary school setting?',
    options: [
      'Being pressured by friends or classmates to engage in harmful, illegal, or sinful behaviors against your conscience',
      'Friends encouraging you to study hard for your examinations',
      'Classmates inviting you to join the school choir or athletics team',
      'Teachers giving homework assignments to the whole class'
    ],
    correctAnswer: 'Being pressured by friends or classmates to engage in harmful, illegal, or sinful behaviors against your conscience',
    explanation: 'Negative peer pressure coerces individuals into compromising their values (e.g. cheating, drug experimentation, vandalism) to gain social acceptance.',
    socraticHint: 'What do we call social pressure from peers urging you to do something wrong or dangerous?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-017',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What should a Christian pupil do when friends pressure them to taste alcohol, smoke, or chew miraa (khat)?',
    options: [
      'Firmly and boldly say: "No, I choose not to do that," and walk away to join positive companions',
      'Try it just once to avoid being laughed at or called cowardly',
      'Buy the drugs for the friends even if they don’t use them',
      'Hide in the corner and watch them without saying anything'
    ],
    correctAnswer: 'Firmly and boldly say: "No, I choose not to do that," and walk away to join positive companions',
    explanation: 'Moral courage requires clear, unambiguous refusal ("Just say No"), protecting one’s body as the temple of the Holy Spirit.',
    socraticHint: 'What clear and firm response protects your health and morals when peers urge you to take drugs?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-018',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'Why does 1 Corinthians 6:19-20 state that our physical bodies must be kept pure from substance abuse and sexual immorality?',
    options: [
      'Because our bodies are temples of the Holy Spirit, bought with a price, and must be used to honor God',
      'Because bodies do not belong to human beings at all',
      'Because hospitals in Kenya are too expensive',
      'Because sports competitions require good fitness'
    ],
    correctAnswer: 'Because our bodies are temples of the Holy Spirit, bought with a price, and must be used to honor God',
    explanation: '1 Corinthians 6:19-20 reveals that our bodies house the Holy Spirit; abusing them through drugs, drunkenness, or immorality defiles God’s dwelling place.',
    socraticHint: 'Whose sacred temple does scripture call the physical body of a believer?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-019',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What does Proverbs 25:28 compare a person who lacks self-control to?',
    options: [
      '"Like a city whose walls are broken through is a person who lacks self-control"',
      '"Like a ship sailing smoothly across calm seas"',
      '"Like a mighty warrior in heavy armor"',
      '"Like a diamond shining in a gold ring"'
    ],
    correctAnswer: '"Like a city whose walls are broken through is a person who lacks self-control"',
    explanation: 'An unwalled city is defenseless against enemy invaders; similarly, a person without self-control is vulnerable to every passing temptation, impulse, and ruin.',
    socraticHint: 'What architectural image of a broken-down city does Proverbs use for a person without self-control?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-020',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'How can young people maintain strong emotional health and mental well-being when facing examination anxiety in Grade 6?',
    options: [
      'Balancing study with rest, exercising regularly, praying and meditating on scripture, and talking with supportive mentors',
      'Staying awake all night drinking energy drinks without sleep',
      'Skipping meals and refusing to speak to friends',
      'Cheating on exams so they don’t have to study'
    ],
    correctAnswer: 'Balancing study with rest, exercising regularly, praying and meditating on scripture, and talking with supportive mentors',
    explanation: 'Healthy mental well-being blends spiritual peace, physical wellness (sleep, nutrition), disciplined study, and open communication with mentors.',
    socraticHint: 'What healthy balance of sleep, exercise, study, and prayer maintains mental well-being before exams?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-021',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What biblical promise in Philippians 4:6-7 brings peace to troubled minds and hearts?',
    options: [
      '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God... will guard your hearts"',
      '"Worry as much as you can about tomorrow"',
      '"Never ask God for help when you are anxious"',
      '"Only rich people can have peace of mind"'
    ],
    correctAnswer: '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God... will guard your hearts"',
    explanation: 'Philippians 4:6-7 provides the divine antidote to anxiety: replacing worry with prayer and thanksgiving, allowing God’s transcendent peace to guard mind and heart.',
    socraticHint: 'What does Philippians 4 tell us to do instead of being anxious about our troubles?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-022',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'What quality makes someone a "true friend in times of adversity" according to Proverbs 17:17?',
    options: [
      'Standing by you and supporting you when you face sickness, grief, or trouble, rather than abandoning you',
      'Only visiting you when you have sweets and snacks to share',
      'Running away as soon as you get into difficulty',
      'Telling everyone in school about your private embarrassments'
    ],
    correctAnswer: 'Standing by you and supporting you when you face sickness, grief, or trouble, rather than abandoning you',
    explanation: 'Proverbs 17:17 affirms: "A friend loves at all times, and a brother is born for a time of adversity." Loyalty in trials distinguishes true friendship from fair-weather friends.',
    socraticHint: 'Does a true friend abandon you when times are hard, or stand faithfully by your side?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-023',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'How can a Christian learner be a positive influence (positive peer pressure) on their classmates?',
    options: [
      'By inviting peers to study groups, encouraging those feeling down, demonstrating honesty, and standing up against bullying',
      'By forcing everyone to give them their lunch money',
      'By boasting about how holy and righteous they are',
      'By gossiping about teachers in secret'
    ],
    correctAnswer: 'By inviting peers to study groups, encouraging those feeling down, demonstrating honesty, and standing up against bullying',
    explanation: 'Positive peer influence leverages social relationships to inspire kindness, academic focus, moral bravery, and mutual support.',
    socraticHint: 'How can you use your influence to encourage friends toward kindness, study, and good morals?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u8-024',
    subStrandId: 'substrand-g6-cre-u8',
    lessonId: 'lesson-g6-cre-u8-l2',
    text: 'In 2 Timothy 1:7, what three gifts does God give believers instead of a spirit of fear?',
    options: [
      'A spirit of power, of love, and of self-discipline (a sound mind)',
      'A spirit of pride, wealth, and anger',
      'A spirit of doubt, worry, and sadness',
      'A spirit of silence, weakness, and retreat'
    ],
    correctAnswer: 'A spirit of power, of love, and of self-discipline (a sound mind)',
    explanation: '2 Timothy 1:7 assures us: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline," providing courage and emotional stability.',
    socraticHint: 'What three godly virtues does the Spirit grant to replace fear and timidity?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
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
console.log(`Added ${qCount} questions for Units 7 & 8.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 4 of Grade 6 CRE to cbe_database.json!');
