import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 CRE Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-cre-u5',
    strandId: 'strand-g5-cre-jesus',
    learningAreaId: 'la-cre-g5',
    title: 'Miracles and Parables of Jesus Christ',
    description: 'Exploring the compassion and divine power of Jesus through His miracles and kingdom parables: Healing miracles (healing the centurion’s servant - Luke 7, raising Jairus’ daughter - Luke 8, healing the blind Bartimaeus - Mark 10); Nature miracles (calming the storm on Lake Galilee - Luke 8, feeding the five thousand - John 6); Parables of the Kingdom and love for neighbor (The Parable of the Good Samaritan - Luke 10, The Parable of the Lost Sheep - Luke 15, The Parable of the Talents - Matthew 25); applying compassion, inclusive love, and faithful stewardship of personal talents.',
    cbeCompetency: 'Compassion, empathy, neighborliness, faithful stewardship of God-given abilities, and active kindness',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g5-cre-u6',
    strandId: 'strand-g5-cre-jesus',
    learningAreaId: 'la-cre-g5',
    title: 'The Passion, Death, Resurrection & Ascension of Jesus Christ',
    description: 'Examining the ultimate sacrifice and victory of Jesus Christ: The Triumphal Entry into Jerusalem on Palm Sunday (Luke 19); the Last Supper and the New Covenant of communion (Luke 22); fervent prayer and submission in the Garden of Gethsemane; the trial, crucifixion, and forgiveness on the Cross at Golgotha ("Father, forgive them" - Luke 23); the glorious Resurrection on Easter Sunday (Luke 24); the Emmaus Road encounter; and the Great Commission and Ascension into heaven (Matthew 28, Acts 1).',
    cbeCompetency: 'Sacrificial love, forgiveness, reconciliation, perseverance under suffering, and witnessing for Christ',
    estimatedMinutes: 30,
    order: 6
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 3 Lessons (Units 5 & 6: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-cre-u5-l1',
    subStrandId: 'substrand-g5-cre-u5',
    title: 'Compassion in Action: Healing and Nature Miracles of Jesus',
    content: 'Jesus performed miracles not to show off, but out of deep compassion and to demonstrate the arrival of the Kingdom of God. In Luke 7, a Roman centurion sent elders to ask Jesus to heal his paralyzed servant. The centurion declared with astonishing humility: "Lord, I do not deserve to have you come under my roof. But say the word, and my servant will be healed." Jesus marveled at his faith, declaring He had not found such great faith even in Israel, and the servant was healed instantly. In Luke 8, while crossing Lake Galilee, a furious windstorm threatened to capsize the boat while Jesus was sleeping. Terrified disciples woke Him crying, "Master, we are going to drown!" Jesus stood, rebuked the wind and raging waters, and immediately there was complete calm. He asked them, "Where is your faith?" In John 6, when a vast crowd of 5,000 men besides women and children had no food, a young boy offered five small barley loaves and two fish. Jesus gave thanks, broke them, and the disciples distributed food until all were filled, gathering twelve baskets of leftovers. Jesus demonstrated authority over illness, nature, and lack, inviting us to trust Him with our needs.',
    didYouKnow: 'The Sea of Galilee is actually a freshwater lake located 214 meters below sea level, surrounded by steep hills that funnel sudden violent storms down onto the water!',
    kenyanContext: 'Fishermen on Lake Victoria around Mbita and Rusinga Island often pray before boarding their wooden motorized boats, recalling how Jesus brought peace to terrified disciples during a lake storm.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u5-l2',
    subStrandId: 'substrand-g5-cre-u5',
    title: 'Kingdom Wisdom: Parables of the Good Samaritan, Lost Sheep, and Talents',
    content: 'Jesus frequently used parables—earthly stories with heavenly meanings—to teach kingdom truths. When an expert in religious law asked, "And who is my neighbor?" Jesus told the Parable of the Good Samaritan (Luke 10:25-37). A traveler beaten by robbers was ignored by a priest and a Levite. However, a Samaritan—a member of an ethnic group despised by Jews—stopped, bandaged his wounds with oil and wine, placed him on his donkey, brought him to an inn, and paid for his care. Jesus commanded, "Go and do likewise," teaching that our neighbor is anyone in need, regardless of tribe, religion, or social class. In Luke 15, Jesus told the Parable of the Lost Sheep: a shepherd leaves ninety-nine sheep in the open country to search tirelessly for one lost sheep, rejoicing when he finds it. This illustrates God’s boundless love for every individual sinner. In Matthew 25, the Parable of the Talents shows a master entrusting servants with bags of gold (talents). The servants who diligently invested and doubled their master’s resources were rewarded, while the lazy servant who hid his talent in the ground was condemned. God expects us to actively develop and use our gifts to bless others.',
    didYouKnow: 'In ancient biblical times, one single talent was worth about 6,000 denarii—equivalent to nearly twenty years of wages for an ordinary working laborer!',
    kenyanContext: 'During the 2007 post-election reconciliations in Kenya, faith-based peace caravans shared the Parable of the Good Samaritan across Eldoret and Nakuru to heal ethnic divisions and rebuild communal trust.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u6-l1',
    subStrandId: 'substrand-g5-cre-u6',
    title: 'The Triumphal Entry, Last Supper, and Gethsemane Submission',
    content: 'Holy Week began with the Triumphal Entry into Jerusalem on Palm Sunday (Luke 19:28-40). Jesus rode on a humble donkey colt, fulfilling Zechariah 9:9. The joyous multitude spread their cloaks on the road and waved palm branches, shouting: "Blessed is the King who comes in the name of the Lord! Peace in heaven and glory in the highest!" On Thursday evening, Jesus celebrated Passover with His twelve disciples at the Last Supper (Luke 22). He washed their feet to teach servant leadership (John 13). During supper, Jesus took bread, gave thanks, broke it, and gave it to them, saying: "This is my body given for you; do this in remembrance of me." In the same way, He took the cup of wine, saying: "This cup is the new covenant in my blood, which is poured out for you." Later that night, Jesus entered the Garden of Gethsemane on the Mount of Olives to pray in deep agony. Knowing the suffering of the Cross ahead, His sweat was like drops of blood falling to the ground, yet He submitted completely to God’s will, praying: "Father, if you are willing, take this cup from me; yet not my will, but yours be done" (Luke 22:42).',
    didYouKnow: 'The name "Gethsemane" comes from Aramaic words meaning "oil press," signifying the intense crushing pressure and agony Jesus endured while praying in the olive grove!',
    kenyanContext: 'On Palm Sunday across Kenya, Catholic, Anglican, PCEA, and AIC congregations march through towns and rural trading centers singing hymns while holding fresh palm fronds cut from local coastal or river palms.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u6-l2',
    subStrandId: 'substrand-g5-cre-u6',
    title: 'The Crucifixion, Glorious Resurrection, and Great Commission',
    content: 'After being betrayed by Judas Iscariot and unjustly condemned by Pontius Pilate, Jesus was led to Golgotha (The Place of the Skull) and crucified between two thieves. Even while hanging in agony on the Cross, Jesus demonstrated supreme divine love and forgiveness, praying: "Father, forgive them, for they do not know what they are doing" (Luke 23:34). When Jesus breathed His last, declaring "It is finished," the temple curtain tore in two from top to bottom, signifying direct access to God for all people. He was buried in a rock-hewn tomb owned by Joseph of Arimathea. On the third day (Easter Sunday morning), godly women went to the tomb to anoint His body but found the massive stone rolled away! Two angels proclaimed: "Why do you look for the living among the dead? He is not here; He has risen!" (Luke 24:5-6). The risen Christ appeared to Mary Magdalene, the disciples on the road to Emmaus, and the eleven apostles. Before ascending bodily into heaven from the Mount of Olives, Jesus gave the Great Commission in Matthew 28:18-20: "All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you."',
    didYouKnow: 'The tearing of the thick temple curtain from top to bottom (Matthew 27:51) symbolized that through Christ’s sacrifice, the barrier separating sinful humans from God’s holy presence was permanently removed!',
    kenyanContext: 'Every Easter dawn in Kenya, Christian families gather for sunrise services, joyfully greeting one another with the historic proclamation: "Christ is risen! He is risen indeed!"',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 3 Missions (Missions 57, 58, 59, 60 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-cre-u5-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u5',
    lessonId: 'lesson-g5-cre-u5-l1',
    title: 'Signs of Divine Compassion Quest',
    description: 'Witness Jesus healing the Roman centurion’s paralyzed servant, calming the raging storm on Lake Galilee, and multiplying a boy’s five loaves and two fish to feed 5,000 hungry souls!',
    order: 57,
    orderIndex: 57,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-compassion-miracles',
    badge: { name: 'Miracle Witness', icon: 'heart' },
    questionIds: [
      'q-g5-cre-u5-001', 'q-g5-cre-u5-002', 'q-g5-cre-u5-003', 'q-g5-cre-u5-004',
      'q-g5-cre-u5-005', 'q-g5-cre-u5-006', 'q-g5-cre-u5-007', 'q-g5-cre-u5-008',
      'q-g5-cre-u5-009', 'q-g5-cre-u5-010', 'q-g5-cre-u5-011', 'q-g5-cre-u5-012'
    ]
  },
  {
    id: 'mission-g5-cre-u5-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u5',
    lessonId: 'lesson-g5-cre-u5-l2',
    title: 'Kingdom Parables & Stewardship Challenge',
    description: 'Discover true neighborliness with the Good Samaritan, celebrate God’s relentless search for the lost sheep, and multiply your God-given talents to serve your school and nation!',
    order: 58,
    orderIndex: 58,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-good-samaritan',
    badge: { name: 'Kingdom Steward', icon: 'award' },
    questionIds: [
      'q-g5-cre-u5-013', 'q-g5-cre-u5-014', 'q-g5-cre-u5-015', 'q-g5-cre-u5-016',
      'q-g5-cre-u5-017', 'q-g5-cre-u5-018', 'q-g5-cre-u5-019', 'q-g5-cre-u5-020',
      'q-g5-cre-u5-021', 'q-g5-cre-u5-022', 'q-g5-cre-u5-023', 'q-g5-cre-u5-024'
    ]
  },
  {
    id: 'mission-g5-cre-u6-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u6',
    lessonId: 'lesson-g5-cre-u6-l1',
    title: 'Gethsemane to Golgotha Sacrificial Love Quest',
    description: 'Follow Jesus riding into Jerusalem on Palm Sunday, remember the New Covenant instituted at the Last Supper, and kneel in Gethsemane as Jesus surrenders fully to the Father’s will!',
    order: 59,
    orderIndex: 59,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-last-supper',
    badge: { name: 'Gethsemane Faithful', icon: 'shield' },
    questionIds: [
      'q-g5-cre-u6-001', 'q-g5-cre-u6-002', 'q-g5-cre-u6-003', 'q-g5-cre-u6-004',
      'q-g5-cre-u6-005', 'q-g5-cre-u6-006', 'q-g5-cre-u6-007', 'q-g5-cre-u6-008',
      'q-g5-cre-u6-009', 'q-g5-cre-u6-010', 'q-g5-cre-u6-011', 'q-g5-cre-u6-012'
    ]
  },
  {
    id: 'mission-g5-cre-u6-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u6',
    lessonId: 'lesson-g5-cre-u6-l2',
    title: 'Easter Triumph & Great Commission Challenge',
    description: 'Celebrate the empty tomb on Easter Sunday, rejoice in the triumph over death, and step up to fulfill the Great Commission by sharing Christ’s message across Kenya and the nations!',
    order: 60,
    orderIndex: 60,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-easter-conqueror',
    badge: { name: 'Easter Champion', icon: 'sun' },
    questionIds: [
      'q-g5-cre-u6-013', 'q-g5-cre-u6-014', 'q-g5-cre-u6-015', 'q-g5-cre-u6-016',
      'q-g5-cre-u6-017', 'q-g5-cre-u6-018', 'q-g5-cre-u6-019', 'q-g5-cre-u6-020',
      'q-g5-cre-u6-021', 'q-g5-cre-u6-022', 'q-g5-cre-u6-023', 'q-g5-cre-u6-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 3 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 5 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u5-001',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In Luke 7:1-10, what remarkable statement did the Roman centurion make that caused Jesus to marvel at his faith?',
    text: 'In Luke 7:1-10, what remarkable statement did the Roman centurion make that caused Jesus to marvel at his faith?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Lord, I do not deserve to have you come under my roof. But say the word, and my servant will be healed',
      'I will pay you fifty Roman silver coins if my servant recovers by evening',
      'Build a Roman stone temple in Capernaum before performing this healing miracle',
      'My soldiers will arrest you if you do not walk to my palace immediately'
    ],
    correctAnswer: 'Lord, I do not deserve to have you come under my roof. But say the word, and my servant will be healed',
    explanation: 'The centurion demonstrated profound humility and absolute trust in Jesus’ divine authority, recognizing that Jesus only needed to speak the word from afar to heal his paralyzed servant.',
    socraticHint: 'Which humble words showed that the Roman officer believed Jesus could heal without physically entering his home?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-002',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What was Jesus doing in the boat when a sudden furious windstorm struck Lake Galilee in Luke 8:23?',
    text: 'What was Jesus doing in the boat when a sudden furious windstorm struck Lake Galilee in Luke 8:23?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He was peacefully asleep',
      'He was rowing the oars with Peter',
      'He was throwing fish back into the water',
      'He was preaching to crowds along the distant shore'
    ],
    correctAnswer: 'He was peacefully asleep',
    explanation: 'Luke 8:23 notes that as they sailed, Jesus fell asleep. Even amidst torrential waves and howling wind, Jesus rested in complete peace and trust in the Father.',
    socraticHint: 'What was Jesus doing in the stern of the boat that showed his perfect peace amidst the raging tempest?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-003',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'How did Jesus calm the wind and the turbulent waves on Lake Galilee in Luke 8:24?',
    text: 'How did Jesus calm the wind and the turbulent waves on Lake Galilee in Luke 8:24?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He got up and rebuked the wind and the raging waters, and the storm subsided into complete calm',
      'He ordered the disciples to throw all heavy luggage into the lake',
      'He jumped into the water and pushed the wooden boat ashore',
      'He called for an emergency rescue boat from the Roman port'
    ],
    correctAnswer: 'He got up and rebuked the wind and the raging waters, and the storm subsided into complete calm',
    explanation: 'Jesus got up, rebuked the wind and the raging waters; the storm ceased and all was calm. His divine authority over nature left the disciples asking, "Who is this? He commands even the winds and water, and they obey him!"',
    socraticHint: 'By what spoken command did Jesus silence the stormy elements of nature?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-004',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In John 6:9, what food did a generous young boy offer that Jesus used to feed the 5,000 men?',
    text: 'In John 6:9, what food did a generous young boy offer that Jesus used to feed the 5,000 men?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Five small barley loaves and two small fish',
      'Ten baskets of fresh wheat flour and roast lamb',
      'Three bowls of wild honey and dried locusts',
      'A sack of ripe pomegranates and dried figs'
    ],
    correctAnswer: 'Five small barley loaves and two small fish',
    explanation: 'Andrew brought forward a young boy who had five small barley loaves and two small fish. Jesus received this modest, selfless lunch, gave thanks to God, and multiplied it to satisfy thousands.',
    socraticHint: 'Which small humble packed lunch consisting of bread and fish did the boy willingly share?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-005',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'How many baskets of leftover pieces did the disciples gather after all the people had eaten and were satisfied in John 6:13?',
    text: 'How many baskets of leftover pieces did the disciples gather after all the people had eaten and were satisfied in John 6:13?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Twelve baskets',
      'Seven baskets',
      'Two baskets',
      'Zero baskets, everything was completely finished'
    ],
    correctAnswer: 'Twelve baskets',
    explanation: 'John 6:13 states that they gathered them and filled twelve baskets with the pieces of the five barley loaves left over by those who had eaten, demonstrating God’s abundant provision and anti-waste stewardship.',
    socraticHint: 'How many baskets—one for each of the twelve disciples—were filled with leftover food fragments?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-006',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What moral lesson on sharing can Grade 5 pupils in Kenya learn from the young boy with five loaves and two fish?',
    text: 'What moral lesson on sharing can Grade 5 pupils in Kenya learn from the young boy with five loaves and two fish?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Even our smallest resources or talents, when shared selflessly with Christ, can bring blessing to many people',
      'Children should hide their packed snacks in school bags so nobody asks for a bite',
      'Only rich business owners have enough wealth to do charity work in church',
      'It is foolish to share food with others unless they pay you money in advance'
    ],
    correctAnswer: 'Even our smallest resources or talents, when shared selflessly with Christ, can bring blessing to many people',
    explanation: 'The boy’s willingness to surrender his lunch shows that no contribution is too small for God. When we generously share what we have, God multiplies it to bless our community.',
    socraticHint: 'How does surrendering whatever small lunch or gift you have into God’s hands multiply its impact?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-007',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In Mark 10:46-52, how did blind Bartimaeus show persistent faith when people told him to be quiet outside Jericho?',
    text: 'In Mark 10:46-52, how did blind Bartimaeus show persistent faith when people told him to be quiet outside Jericho?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He shouted all the more: "Jesus, Son of David, have mercy on me!"',
      'He kept quiet, sat down in the dust, and cried softly to himself',
      'He threw stones at the crowd to make them run away',
      'He walked away to ask the Roman soldiers for gold coins'
    ],
    correctAnswer: 'He shouted all the more: "Jesus, Son of David, have mercy on me!"',
    explanation: 'Mark 10:48 records that many rebuked Bartimaeus and told him to be quiet, but he shouted all the more, "Son of David, have mercy on me!" Jesus stopped, called him, and restored his sight because of his persistent faith.',
    socraticHint: 'Did Bartimaeus give up when discouraged by the crowd, or did he cry out even louder to Jesus?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-008',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What did Jesus do before distributing the five loaves and two fish to the crowd, demonstrating gratitude to God (John 6:11)?',
    text: 'What did Jesus do before distributing the five loaves and two fish to the crowd, demonstrating gratitude to God (John 6:11)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He gave thanks to God (offered a prayer of thanksgiving)',
      'He counted the exact number of people to ensure there was enough',
      'He asked the Roman soldiers to verify the freshness of the fish',
      'He charged everyone one copper coin before handing out bread'
    ],
    correctAnswer: 'He gave thanks to God (offered a prayer of thanksgiving)',
    explanation: 'John 6:11 states: "Jesus then took the loaves, gave thanks, and distributed to those who were seated as much as they wanted." Giving thanks before meals acknowledges God as the provider of daily bread.',
    socraticHint: 'What holy prayer of gratitude did Jesus say before breaking the loaves?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-009',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'When Jairus was told his 12-year-old daughter had already died (Luke 8:49-50), what comforting words of faith did Jesus give him?',
    text: 'When Jairus was told his 12-year-old daughter had already died (Luke 8:49-50), what comforting words of faith did Jesus give him?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Don’t be afraid; just believe, and she will be healed',
      'It is too late, you should have come to me yesterday',
      'Go and hire professional mourners to weep at your house',
      'I cannot help you because you are a synagogue ruler'
    ],
    correctAnswer: 'Don’t be afraid; just believe, and she will be healed',
    explanation: 'Jesus said to Jairus: "Don’t be afraid; just believe, and she will be healed." Jesus went to the house, took the child by the hand, and called out, "My child, get up!" and her spirit returned.',
    socraticHint: 'Which encouraging words urged the grieving father to replace fear with trusting belief?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-010',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'A learner named Faith is anxious and terrified before sitting her national CBE assessments. How does Jesus calming the storm comfort her?',
    text: 'A learner named Faith is anxious and terrified before sitting her national CBE assessments. How does Jesus calming the storm comfort her?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She realizes that Jesus is present in life’s stormy anxieties and can bring His calm peace to her troubled heart',
      'She decides that praying is an alternative to studying her class revision notes',
      'She assumes the test papers will magically fill themselves with correct answers',
      'She decides to skip school on exam day because life is too stormy'
    ],
    correctAnswer: 'She realizes that Jesus is present in life’s stormy anxieties and can bring His calm peace to her troubled heart',
    explanation: 'Jesus’ power over storms reminds believers that when fear, anxiety, and pressure overwhelm us, bringing our fears to Christ in prayer brings divine peace and inner calm (Philippians 4:6-7).',
    socraticHint: 'How does trusting in Jesus’ presence help calm internal storms of fear and anxiety in difficult moments?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-011',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'Why did Jesus perform miracles during His earthly ministry, according to biblical revelation?',
    text: 'Why did Jesus perform miracles during His earthly ministry, according to biblical revelation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To reveal God’s compassionate love, alleviate human suffering, and prove His divine authority as Messiah',
      'To become wealthy by charging expensive entrance fees to watch supernatural signs',
      'To entertain curious spectators and show magicians that He was superior',
      'To establish an earthly political kingdom that would overthrow the Roman senate'
    ],
    correctAnswer: 'To reveal God’s compassionate love, alleviate human suffering, and prove His divine authority as Messiah',
    explanation: 'Jesus’ miracles were signs (semeia) of the Kingdom of God, demonstrating God’s boundless compassion, healing broken humanity, and authenticating His mission as the promised Son of God.',
    socraticHint: 'What deeper theological purposes of divine compassion and kingdom revelation motivated Jesus’ works?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-012',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In John 6:12, after feeding the 5,000, why did Jesus instruct disciples to gather the leftovers saying "Let nothing be wasted"?',
    text: 'In John 6:12, after feeding the 5,000, why did Jesus instruct disciples to gather the leftovers saying "Let nothing be wasted"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To model responsible stewardship of resources and show respect for God’s provision',
      'Because they wanted to sell the stale bread to travelers for a profit',
      'Because the Roman police would fine them for leaving breadcrumbs on grass',
      'Because the fish bones were needed to construct fishing hooks'
    ],
    correctAnswer: 'To model responsible stewardship of resources and show respect for God’s provision',
    explanation: 'Jesus’ command to gather leftovers so that "nothing is wasted" teaches prudent stewardship, avoiding food wastage, and honoring God’s provision even in times of miraculous abundance.',
    socraticHint: 'What Christian value of avoiding waste and stewarding food carefully is taught by gathering leftovers?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },

  // ==========================================
  // Unit 5 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u5-013',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In the Parable of the Good Samaritan (Luke 10:30-37), which two religious figures walked past the wounded traveler on the other side of the road?',
    text: 'In the Parable of the Good Samaritan (Luke 10:30-37), which two religious figures walked past the wounded traveler on the other side of the road?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A Priest and a Levite',
      'A Roman soldier and a Greek philosopher',
      'King Herod and Pontius Pilate',
      'Pharaoh and a Babylonian merchant'
    ],
    correctAnswer: 'A Priest and a Levite',
    explanation: 'Luke 10:31-32 describes a priest traveling down the road who saw the wounded man and passed by on the other side, followed by a Levite who did the same.',
    socraticHint: 'Which two temple officials from the religious hierarchy failed to help the wounded traveler?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-014',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'How did the Samaritan show practical mercy and love to the wounded victim on the dangerous road from Jerusalem to Jericho?',
    text: 'How did the Samaritan show practical mercy and love to the wounded victim on the dangerous road from Jerusalem to Jericho?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He bandaged his wounds with oil and wine, put him on his own donkey, took him to an inn, and paid for his ongoing care',
      'He searched the traveler’s pockets for money and left him in the sun',
      'He took pictures of the crime scene to report to the Roman garrison next week',
      'He blamed the victim for traveling without bodyguards and hurried past'
    ],
    correctAnswer: 'He bandaged his wounds with oil and wine, put him on his own donkey, took him to an inn, and paid for his ongoing care',
    explanation: 'The Samaritan went to him, bandaged his wounds pouring on oil and wine, put the man on his own donkey, brought him to an inn, took care of him, and gave two silver denarii to the innkeeper.',
    socraticHint: 'Which compassionate actions provided immediate medical first aid, transport, lodging, and full payment?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-015',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'Why was it particularly shocking to Jesus’ Jewish listeners that a Samaritan was the hero of the story?',
    text: 'Why was it particularly shocking to Jesus’ Jewish listeners that a Samaritan was the hero of the story?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Jews and Samaritans harbored deep historical hostility and ethnic prejudice toward each other',
      'Samaritans were forbidden by law from riding donkeys across Israel',
      'Samaritans were famous for being the wealthiest merchants in the Roman Empire',
      'The Samaritan had forgotten to pay taxes to the Roman governor'
    ],
    correctAnswer: 'Jews and Samaritans harbored deep historical hostility and ethnic prejudice toward each other',
    explanation: 'In first-century Palestine, Jews and Samaritans had intense ethnic and religious animosity (John 4:9). By making the despised Samaritan the hero of mercy, Jesus broke down ethnic barriers to show true neighborliness.',
    socraticHint: 'What deep-seated ethnic and religious rivalry existed between Jews and Samaritans at that time?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-016',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'According to Jesus’ conclusion in the Parable of the Good Samaritan, who is our "neighbor"?',
    text: 'According to Jesus’ conclusion in the Parable of the Good Samaritan, who is our "neighbor"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Anyone in need to whom we can show compassion and mercy, regardless of their ethnic group or background',
      'Only people who live in the house next door to our fence',
      'Only relatives who speak the exact same mother tongue as our parents',
      'Only wealthy people who are able to repay our favors with gifts'
    ],
    correctAnswer: 'Anyone in need to whom we can show compassion and mercy, regardless of their ethnic group or background',
    explanation: 'Jesus redefined "neighbor" from a narrow tribal or geographical boundary to a universal moral call: anyone who needs help, love, or mercy is our neighbor, and we must love them as ourselves.',
    socraticHint: 'Does Christian neighborliness stop at ethnic boundaries or extend to anyone who needs help and compassion?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-017',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In Luke 15:3-7, what does the shepherd do when one of his one hundred sheep wanders away and is lost?',
    text: 'In Luke 15:3-7, what does the shepherd do when one of his one hundred sheep wanders away and is lost?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He leaves the ninety-nine in the open country and goes after the lost sheep until he finds it',
      'He forgets about the lost sheep because losing one percent is normal in business',
      'He sells the remaining ninety-nine sheep to buy wild goats instead',
      'He punishes the flock by locking them in a dark cave without grass'
    ],
    correctAnswer: 'He leaves the ninety-nine in the open country and goes after the lost sheep until he finds it',
    explanation: 'Luke 15:4 records: "Doesn’t he leave the ninety-nine in the open country and go after the lost sheep until he finds it?" When he finds it, he joyfully puts it on his shoulders and calls friends to celebrate.',
    socraticHint: 'What persistent search does the loving shepherd conduct to rescue the single stray sheep?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-018',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What spiritual truth did Jesus explain regarding the rejoicing over the found sheep in Luke 15:7?',
    text: 'What spiritual truth did Jesus explain regarding the rejoicing over the found sheep in Luke 15:7?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'There is more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent',
      'Shepherds should always charge money before rescuing animals from cliffs',
      'God prefers large herds of animals over individual human beings',
      'Repentance is only necessary for people who commit major civil crimes'
    ],
    correctAnswer: 'There is more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent',
    explanation: 'In Luke 15:7, Jesus reveals the heart of God: "I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent."',
    socraticHint: 'How does heaven react when a single lost person repents and turns back to God?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-019',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'In the Parable of the Talents (Matthew 25:14-30), what did the servant who received five talents do with his master’s money?',
    text: 'In the Parable of the Talents (Matthew 25:14-30), what did the servant who received five talents do with his master’s money?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He went at once and put his money to work and gained five more talents',
      'He buried the five talents in a hole in the ground to keep them safe from thieves',
      'He spent all five talents on luxury robes and feast parties with friends',
      'He gave the money away to traveling magicians in Babylon'
    ],
    correctAnswer: 'He went at once and put his money to work and gained five more talents',
    explanation: 'The servant who received five talents went immediately, put his money to work, and gained five more (Matthew 25:16), displaying industrious stewardship and faithfulness.',
    socraticHint: 'Did the first servant invest his money diligently to double it, or hide it in the dirt?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-020',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'Why was the master angry with the servant who received one talent in Matthew 25:24-28?',
    text: 'Why was the master angry with the servant who received one talent in Matthew 25:24-28?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because out of fear and laziness, he dug a hole in the ground and hid his talent, producing zero return',
      'Because he lost all the money in an unsuccessful grain trading venture',
      'Because he donated all the master’s coins to poor widows in Jerusalem',
      'Because he demanded to be paid higher wages before starting work'
    ],
    correctAnswer: 'Because out of fear and laziness, he dug a hole in the ground and hid his talent, producing zero return',
    explanation: 'The third servant was condemned as "wicked and lazy" because he allowed fear and sloth to paralyze him, burying his talent rather than putting it to fruitful use for the master.',
    socraticHint: 'What did the third servant foolishly do with his talent instead of investing it productively?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-021',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What commendation did the master give to both the faithful servants in Matthew 25:21?',
    text: 'What commendation did the master give to both the faithful servants in Matthew 25:21?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!',
      'You should have worked even harder to triple the profits instead of doubling them',
      'Give all the profits back to me immediately and go back to being ordinary slaves',
      'You are now permitted to retire and never do any work for the rest of your life'
    ],
    correctAnswer: 'Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!',
    explanation: 'Matthew 25:21 records the joyous praise: "Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!"',
    socraticHint: 'Which famous blessing begins with "Well done, good and faithful servant"?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-022',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'At a primary school in Eldoret, learners see an elderly woman trip and drop her basket of vegetables across the road. How can they apply the Parable of the Good Samaritan?',
    text: 'At a primary school in Eldoret, learners see an elderly woman trip and drop her basket of vegetables across the road. How can they apply the Parable of the Good Samaritan?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Stop immediately, help her up gently, collect her scattered vegetables, and escort her safely across the road',
      'Laugh loudly with classmates and run to the canteen to buy mandazis',
      'Kick the spilled cabbages and carrots into the roadside drainage ditch',
      'Walk past pretending not to see because she is not a relative from their clan'
    ],
    correctAnswer: 'Stop immediately, help her up gently, collect her scattered vegetables, and escort her safely across the road',
    explanation: 'The Good Samaritan models active, compassionate empathy that stops what it is doing to help anyone in distress, regardless of who they are.',
    socraticHint: 'What immediate kind action provides respectful help to an elderly person in distress?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-023',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'How does the Parable of the Talents apply to a Kenyan student who has a natural gift for drawing, singing, or mathematics?',
    text: 'How does the Parable of the Talents apply to a Kenyan student who has a natural gift for drawing, singing, or mathematics?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They should practice diligently, develop their gift, and use it to glorify God and serve others, rather than hiding it',
      'They should boast about their superiority and refuse to participate in school events',
      'They should hide their ability so that classmates never ask them for assistance',
      'They should demand money before singing in the school choir or drawing posters'
    ],
    correctAnswer: 'They should practice diligently, develop their gift, and use it to glorify God and serve others, rather than hiding it',
    explanation: 'God endows each person with unique abilities and talents. Christian stewardship requires us to cultivate, polish, and deploy those gifts to serve our community and honor God.',
    socraticHint: 'What should a learner do with God-given talents according to the master’s expectations in the parable?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },
  {
    id: 'q-g5-cre-u5-024',
    subStrandId: 'substrand-g5-cre-u5',
    prompt: 'What common theological thread links the Good Samaritan, the Lost Sheep, and the Talents parables?',
    text: 'What common theological thread links the Good Samaritan, the Lost Sheep, and the Talents parables?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'God’s unconditional love demands active, compassionate response and accountable stewardship in our daily lives',
      'Believers should avoid interacting with anyone who does not belong to their specific denomination',
      'Material wealth is the ultimate sign of divine favor in the Kingdom of Heaven',
      'God expects humans to solve all problems through strict military discipline'
    ],
    correctAnswer: 'God’s unconditional love demands active, compassionate response and accountable stewardship in our daily lives',
    explanation: 'All three parables emphasize that receiving God’s grace and love carries a responsibility: we must love our neighbors unconditionally, value every lost soul, and faithfully use what God has entrusted to us.',
    socraticHint: 'How do all three parables call believers to active compassion, radical inclusion, and faithful responsibility?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U5'
  },

  // ==========================================
  // Unit 6 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u6-001',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'On which animal did Jesus ride into Jerusalem during His Triumphal Entry on Palm Sunday (Luke 19:35)?',
    text: 'On which animal did Jesus ride into Jerusalem during His Triumphal Entry on Palm Sunday (Luke 19:35)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A humble colt (young donkey)',
      'A golden-harnessed Roman war horse',
      'A desert camel with purple silk saddles',
      'A ceremonial white bull from Mount Zion'
    ],
    correctAnswer: 'A humble colt (young donkey)',
    explanation: 'Luke 19:35 and Matthew 21:5 record Jesus riding a donkey colt, fulfilling the messianic prophecy of Zechariah 9:9: "See, your king comes to you, righteous and victorious, lowly and riding on a donkey."',
    socraticHint: 'Which humble beast of burden did Jesus ride to symbolize peace rather than military conquest?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-002',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'How did the crowd welcome Jesus as He entered Jerusalem on Palm Sunday (Luke 19:36-38)?',
    text: 'How did the crowd welcome Jesus as He entered Jerusalem on Palm Sunday (Luke 19:36-38)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They spread their cloaks on the road, waved palm branches, and shouted: "Blessed is the King who comes in the name of the Lord!"',
      'They threw stones at the donkey and told Jesus to return to Galilee',
      'They locked the city gates and demanded a toll tax before letting Him pass',
      'They stood completely silent and covered their faces with black cloths'
    ],
    correctAnswer: 'They spread their cloaks on the road, waved palm branches, and shouted: "Blessed is the King who comes in the name of the Lord!"',
    explanation: 'The crowds celebrated Jesus enthusiastically, spreading cloaks and leafy branches along the road while singing: "Hosanna! Blessed is the king who comes in the name of the Lord! Peace in heaven and glory in the highest!"',
    socraticHint: 'What joyful gestures with garments, branches, and shouts of praise greeted Jesus?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-003',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'In John 13:4-15, what humble act of service did Jesus perform for His disciples before the Last Supper?',
    text: 'In John 13:4-15, what humble act of service did Jesus perform for His disciples before the Last Supper?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He washed the disciples’ feet with water and dried them with a towel',
      'He made them bow down and kiss His royal ring',
      'He hired servants to carry them on golden chairs into the upper room',
      'He commanded Peter to prepare a silver crown for Him'
    ],
    correctAnswer: 'He washed the disciples’ feet with water and dried them with a towel',
    explanation: 'Jesus took a towel, poured water into a basin, and washed His disciples’ feet, saying: "Now that I, your Lord and Teacher, have washed your feet, you also should wash one another’s feet. I have set you an example."',
    socraticHint: 'Which menial servant chore did the Master perform to model humility and servant leadership?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-004',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What did the bread and the cup of wine represent when Jesus instituted Holy Communion at the Last Supper (Luke 22:19-20)?',
    text: 'What did the bread and the cup of wine represent when Jesus instituted Holy Communion at the Last Supper (Luke 22:19-20)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The bread represented His body given for us; the cup represented the new covenant in His blood poured out for forgiveness',
      'The bread represented the physical soil of Judea; the wine represented water from the River Jordan',
      'The bread represented the gold coins of the temple; the wine represented grape juice for celebration feasts',
      'The bread represented Moses’ manna; the wine represented ancient Egyptian rivers'
    ],
    correctAnswer: 'The bread represented His body given for us; the cup represented the new covenant in His blood poured out for forgiveness',
    explanation: 'Jesus said of the bread: "This is my body given for you; do this in remembrance of me." And of the cup: "This cup is the new covenant in my blood, which is poured out for you."',
    socraticHint: 'What did Jesus say the broken bread and poured cup symbolized regarding His coming sacrifice?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-005',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'In which garden on the Mount of Olives did Jesus pray in deep agony before His arrest (Luke 22:39-44)?',
    text: 'In which garden on the Mount of Olives did Jesus pray in deep agony before His arrest (Luke 22:39-44)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Garden of Gethsemane',
      'The Garden of Eden',
      'The Royal Gardens of Solomon',
      'The Hanging Gardens of Babylon'
    ],
    correctAnswer: 'The Garden of Gethsemane',
    explanation: 'Jesus went out as usual to the Mount of Olives to the Garden of Gethsemane, an olive grove where He poured out His soul in prayer to the Father.',
    socraticHint: 'Which historic olive grove garden was the scene of Jesus’ midnight prayer and agony?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-006',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What profound prayer of complete surrender and obedience did Jesus pray in Gethsemane (Luke 22:42)?',
    text: 'What profound prayer of complete surrender and obedience did Jesus pray in Gethsemane (Luke 22:42)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Father, if you are willing, take this cup from me; yet not my will, but yours be done',
      'Father, strike down all Roman soldiers with fire from heaven immediately',
      'Father, make me the earthly king of Israel so I can punish the Sanhedrin elders',
      'Father, cancel the salvation of humanity because the suffering is too difficult'
    ],
    correctAnswer: 'Father, if you are willing, take this cup from me; yet not my will, but yours be done',
    explanation: 'Jesus’ prayer—"Yet not my will, but yours be done"—embodies supreme submission to the Father’s redemptive purpose, placing God’s will above personal comfort or human dread of pain.',
    socraticHint: 'Which famous sentence surrendered Jesus’ human desire to the Father’s divine will?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-007',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'Which disciple betrayed Jesus in the Garden of Gethsemane with a kiss (Luke 22:47-48)?',
    text: 'Which disciple betrayed Jesus in the Garden of Gethsemane with a kiss (Luke 22:47-48)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Judas Iscariot',
      'Simon Peter',
      'Thomas Didymus',
      'John the Beloved'
    ],
    correctAnswer: 'Judas Iscariot',
    explanation: 'Judas Iscariot guided the armed crowd from the chief priests and betrayed Jesus with a hypocritical greeting and kiss in exchange for thirty pieces of silver.',
    socraticHint: 'Which disciple turned against Jesus for thirty pieces of silver and identified Him with a kiss?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-008',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'When Peter drew a sword and cut off the right ear of the high priest’s servant Malchus, how did Jesus respond (Luke 22:50-51)?',
    text: 'When Peter drew a sword and cut off the right ear of the high priest’s servant Malchus, how did Jesus respond (Luke 22:50-51)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He commanded Peter to stop, touched the servant’s ear, and healed him',
      'He praised Peter and encouraged the other disciples to draw weapons as well',
      'He ordered the disciples to flee into the olive trees and leave the servant bleeding',
      'He took the sword and challenged the temple guards to a duel'
    ],
    correctAnswer: 'He commanded Peter to stop, touched the servant’s ear, and healed him',
    explanation: 'Jesus said: "No more of this!" He touched Malchus’ ear and healed him. Jesus rejected physical violence, living out His teaching to love our enemies even during His unjust arrest.',
    socraticHint: 'How did Jesus respond with peace and immediate healing rather than violence?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-009',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'How many times did Simon Peter deny knowing Jesus before the rooster crowed, just as Jesus had predicted (Luke 22:54-62)?',
    text: 'How many times did Simon Peter deny knowing Jesus before the rooster crowed, just as Jesus had predicted (Luke 22:54-62)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Three times',
      'Seven times',
      'Once',
      'Ten times'
    ],
    correctAnswer: 'Three times',
    explanation: 'Peter denied knowing Jesus three times in the courtyard of the high priest. When the rooster crowed, the Lord turned and looked at Peter, and Peter went outside and wept bitterly in deep repentance.',
    socraticHint: 'How many times did Peter claim, "I do not know Him," before hearing the morning bird crow?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-010',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'How can Kenyan primary school leaders emulate Jesus washing the disciples’ feet in their school duties?',
    text: 'How can Kenyan primary school leaders emulate Jesus washing the disciples’ feet in their school duties?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By serving fellow students with humility, assisting in class cleaning, and listening with patience and respect',
      'By commanding younger students to carry their school bags and polish their shoes',
      'By refusing to participate in any manual work during communal school cleanup days',
      'By taking the best sports equipment for themselves while denying others a turn'
    ],
    correctAnswer: 'By serving fellow students with humility, assisting in class cleaning, and listening with patience and respect',
    explanation: 'Servant leadership means using authority to uplift, support, and serve others. Emulating Christ means demonstrating humility through helpful practical deeds rather than seeking special privileges.',
    socraticHint: 'How does true Christian leadership show itself through humble service and shared labor?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-011',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'Why did Jesus wash His disciples’ feet, an act usually performed only by household slaves?',
    text: 'Why did Jesus wash His disciples’ feet, an act usually performed only by household slaves?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To provide an unforgettable living object lesson on humility, selflessness, and servant leadership',
      'Because the upper room in Jerusalem had no clean towels for eating supper',
      'Because the disciples had walked through the muddy River Jordan that afternoon',
      'To prove that religious leaders should never speak or teach in public synagogues'
    ],
    correctAnswer: 'To provide an unforgettable living object lesson on humility, selflessness, and servant leadership',
    explanation: 'Jesus deliberately took the role of the lowest household slave to overturn worldly concepts of status and power, teaching that in God’s kingdom, the greatest must become the servant of all.',
    socraticHint: 'What revolutionary kingdom lesson about true greatness through humble service did Jesus illustrate?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-012',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'When facing peer pressure or difficult trials, how can praying "Yet not my will, but yours be done" strengthen a Christian learner?',
    text: 'When facing peer pressure or difficult trials, how can praying "Yet not my will, but yours be done" strengthen a Christian learner?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It aligns our desires with God’s righteous purpose, giving us moral strength and courage to resist wrong choices',
      'It allows us to blame God whenever we fail an exam or make a bad decision',
      'It guarantees that we will never have to face any homework challenges at school',
      'It removes all need to make personal ethical decisions because everything happens automatically'
    ],
    correctAnswer: 'It aligns our desires with God’s righteous purpose, giving us moral strength and courage to resist wrong choices',
    explanation: 'Surrendering to God’s will replaces selfish anxiety with divine peace and moral clarity, empowering believers to stand firm for what is right even when pressured to compromise.',
    socraticHint: 'How does yielding our will to God give us spiritual courage and clarity during moral tests?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },

  // ==========================================
  // Unit 6 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u6-013',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What extraordinary prayer of divine forgiveness did Jesus speak from the Cross for His executioners (Luke 23:34)?',
    text: 'What extraordinary prayer of divine forgiveness did Jesus speak from the Cross for His executioners (Luke 23:34)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Father, forgive them, for they do not know what they are doing',
      'Father, send ten legions of angels to destroy this city of Jerusalem',
      'Father, punish their children for the agony they are causing me',
      'Father, remember my suffering and take away their land forever'
    ],
    correctAnswer: 'Father, forgive them, for they do not know what they are doing',
    explanation: 'From the Cross, Jesus prayed: "Father, forgive them, for they do not know what they are doing." In the ultimate display of divine agape love, Jesus forgave those who mocked, tortured, and crucified Him.',
    socraticHint: 'Which unforgettable prayer for His persecutors revealed Jesus’ unmatched mercy and forgiveness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-014',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What did Jesus promise the repentant criminal crucified beside Him who asked to be remembered in Jesus’ Kingdom (Luke 23:42-43)?',
    text: 'What did Jesus promise the repentant criminal crucified beside Him who asked to be remembered in Jesus’ Kingdom (Luke 23:42-43)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Truly I tell you, today you will be with me in paradise',
      'You are too wicked to receive any forgiveness from God',
      'Wait in the tomb for one thousand years before entering heaven',
      'If you pay thirty silver coins to the temple, you might be saved'
    ],
    correctAnswer: 'Truly I tell you, today you will be with me in paradise',
    explanation: 'Jesus answered the repentant thief: "Truly I tell you, today you will be with me in paradise." This shows that God’s mercy is available to anyone who repents in genuine faith, even at life’s final moment.',
    socraticHint: 'What glorious promise of immediate fellowship in paradise did Jesus give to the repentant thief?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-015',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What miraculous event occurred in the Jerusalem temple the moment Jesus breathed His last on the Cross (Matthew 27:51)?',
    text: 'What miraculous event occurred in the Jerusalem temple the moment Jesus breathed His last on the Cross (Matthew 27:51)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The temple curtain tore in two from top to bottom',
      'All the gold lampstands melted into liquid metal',
      'The stone pillars collapsed and crushed the altar',
      'A river of water gushed out from the temple foundation'
    ],
    correctAnswer: 'The temple curtain tore in two from top to bottom',
    explanation: 'Matthew 27:51 records that the temple curtain tore in two from top to bottom, symbolizing that Christ’s death opened the way into God’s holy presence for all people, without the need for animal sacrifices.',
    socraticHint: 'What sacred divider in the temple was supernaturally ripped in two from top to bottom?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-016',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'Who boldly requested the body of Jesus from Pontius Pilate and buried Him in his own new rock-cut tomb (Luke 23:50-53)?',
    text: 'Who boldly requested the body of Jesus from Pontius Pilate and buried Him in his own new rock-cut tomb (Luke 23:50-53)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Joseph of Arimathea',
      'Nicodemus the Pharisee',
      'Simon of Cyrene',
      'Barabbas the prisoner'
    ],
    correctAnswer: 'Joseph of Arimathea',
    explanation: 'Joseph of Arimathea, a respected member of the council who had not consented to their decision, went to Pilate, asked for Jesus’ body, wrapped it in linen cloth, and laid it in a new rock-cut tomb.',
    socraticHint: 'Which wealthy council member from Arimathea donated his own new tomb for Jesus’ burial?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-017',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'When godly women visited the tomb early on the third day (Easter Sunday), what joyful question did the angels ask them (Luke 24:5)?',
    text: 'When godly women visited the tomb early on the third day (Easter Sunday), what joyful question did the angels ask them (Luke 24:5)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Why do you look for the living among the dead? He is not here; He has risen!',
      'Why have you brought olive oil and myrrh when the Roman guards are sleeping?',
      'Did you not know that tombs are locked until Monday morning?',
      'Who gave you permission to roll away the Roman seal from the entrance?'
    ],
    correctAnswer: 'Why do you look for the living among the dead? He is not here; He has risen!',
    explanation: 'In Luke 24:5-6, the angels asked: "Why do you look for the living among the dead? He is not here; he has risen! Remember how he told you, while he was still with you in Galilee."',
    socraticHint: 'Which unforgettable angelic greeting announced that Jesus had conquered death and was alive?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-018',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'On the road to Emmaus, when were the eyes of the two disciples finally opened to recognize the risen Jesus (Luke 24:30-31)?',
    text: 'On the road to Emmaus, when were the eyes of the two disciples finally opened to recognize the risen Jesus (Luke 24:30-31)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'When He sat at the table, took bread, gave thanks, broke it, and began giving it to them',
      'When He showed them a Roman passport with His name inscribed on it',
      'When they reached the town gate of Emmaus and heard a rooster crowing',
      'When He pointed out the distant hills of Galilee across the valley'
    ],
    correctAnswer: 'When He sat at the table, took bread, gave thanks, broke it, and began giving it to them',
    explanation: 'Luke 24:30-31 records that when Jesus was at the table with them, He took bread, gave thanks, broke it, and began to give it to them. Then their eyes were opened and they recognized Him, and He disappeared from their sight.',
    socraticHint: 'In what familiar Eucharistic action of taking, blessing, and breaking bread was Jesus recognized?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-019',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What did the risen Jesus say to disciple Thomas, who doubted Jesus’ resurrection until he saw the nail marks (John 20:29)?',
    text: 'What did the risen Jesus say to disciple Thomas, who doubted Jesus’ resurrection until he saw the nail marks (John 20:29)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because you have seen me, you have believed; blessed are those who have not seen and yet have believed',
      'You are no longer an apostle because you asked too many difficult questions',
      'True believers must never require any evidence or witness before believing',
      'Go and live in isolation until you learn how to believe without seeing'
    ],
    correctAnswer: 'Because you have seen me, you have believed; blessed are those who have not seen and yet have believed',
    explanation: 'Jesus invited Thomas to touch His wounds and declared: "Because you have seen me, you have believed; blessed are those who have not seen and yet have believed." This blesses all subsequent believers who trust in Christ through faith.',
    socraticHint: 'Which blessing did Jesus speak upon all future generations who believe without physical sight?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-020',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What core mission did Jesus give to His followers in the Great Commission (Matthew 28:19-20)?',
    text: 'What core mission did Jesus give to His followers in the Great Commission (Matthew 28:19-20)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Go and make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit, and teaching them to obey everything He commanded',
      'Conquer foreign kingdoms by force and establish military rule in Rome',
      'Collect gold and silver from all temples to construct magnificent marble cathedrals',
      'Keep the teachings of Jesus completely secret within the borders of Israel'
    ],
    correctAnswer: 'Go and make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit, and teaching them to obey everything He commanded',
    explanation: 'The Great Commission directs Christians worldwide to make disciples of all nations, baptizing them in the name of the Triune God and teaching them to observe Christ’s commands, with the promise: "I am with you always, to the very end of the age."',
    socraticHint: 'What worldwide mandate to preach the gospel, make disciples, baptize, and teach did Jesus give?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-021',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'What comforting promise did Jesus give at the conclusion of the Great Commission in Matthew 28:20?',
    text: 'What comforting promise did Jesus give at the conclusion of the Great Commission in Matthew 28:20?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'And surely I am with you always, to the very end of the age',
      'You will never encounter any opposition or persecution anywhere in the world',
      'All believers will receive crowns of gold made by Roman goldsmiths',
      'The work of spreading the Gospel will be finished in three weeks'
    ],
    correctAnswer: 'And surely I am with you always, to the very end of the age',
    explanation: 'Jesus promised His perpetual presence: "And surely I am with you always, to the very end of the age." Believers never carry out God’s mission alone; Christ’s presence and power abide with them continually.',
    socraticHint: 'What enduring promise of His unfailing presence did Jesus give to His disciples?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-022',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'When someone falsely accuses John at school, how can John reflect Jesus’ response on the Cross at Golgotha?',
    text: 'When falsely accuses John at school, how can John reflect Jesus’ response on the Cross at Golgotha?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Choose forgiveness over revenge, speak truth with calm gentleness, and pray for those who hurt him',
      'Fight the accuser behind the school latrines after class dismissed',
      'Spread false, damaging rumors about the accuser’s family to retaliate',
      'Steal the accuser’s school textbooks and throw them in the river'
    ],
    correctAnswer: 'Choose forgiveness over revenge, speak truth with calm gentleness, and pray for those who hurt him',
    explanation: 'Jesus demonstrated supreme forgiveness on the Cross, praying for His executioners. Following Christ means renouncing retaliation, extending forgiveness, and speaking the truth in love.',
    socraticHint: 'How does forgiving and praying for someone who wronged you reflect Christ’s example at Golgotha?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-023',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'Why is the resurrection of Jesus Christ considered the foundation of Christian faith and hope (1 Corinthians 15:14-20)?',
    text: 'Why is the resurrection of Jesus Christ considered the foundation of Christian faith and hope (1 Corinthians 15:14-20)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It conquered sin and death, proved Jesus is the true Son of God, and guarantees eternal life for all who believe',
      'It showed that human bodies are completely unimportant in God’s design',
      'It proved that the Roman Empire was the most righteous government in history',
      'It meant that disciples no longer had to pray or read the Holy Scriptures'
    ],
    correctAnswer: 'It conquered sin and death, proved Jesus is the true Son of God, and guarantees eternal life for all who believe',
    explanation: 'As Paul wrote in 1 Corinthians 15, if Christ has not been raised, our faith is futile. The resurrection validates Christ’s victory over death and sin, giving believers hope for their own resurrection and eternal life.',
    socraticHint: 'How does Christ’s bodily triumph over death authenticate the entire Christian faith and promise of eternal life?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  },
  {
    id: 'q-g5-cre-u6-024',
    subStrandId: 'substrand-g5-cre-u6',
    prompt: 'From which mountain outside Jerusalem did Jesus ascend bodily into heaven forty days after His resurrection (Acts 1:9-12)?',
    text: 'From which mountain outside Jerusalem did Jesus ascend bodily into heaven forty days after His resurrection (Acts 1:9-12)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Mount of Olives',
      'Mount Sinai',
      'Mount Hermon',
      'Mount Carmel'
    ],
    correctAnswer: 'The Mount of Olives',
    explanation: 'Acts 1:9-12 records that after blessing His disciples, Jesus was taken up before their very eyes, and a cloud hid Him from their sight. They returned to Jerusalem from the hill called the Mount of Olives.',
    socraticHint: 'From which olive-covered hill east of Jerusalem was Jesus taken up into heaven in the presence of the disciples?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U6'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 3 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
