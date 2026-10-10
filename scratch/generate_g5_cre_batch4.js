import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 CRE Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-cre-u7',
    strandId: 'strand-g5-cre-living',
    learningAreaId: 'la-cre-g5',
    title: 'The Holy Spirit, Spiritual Gifts & The Early Church Community',
    description: 'Understanding the role of the Holy Spirit in the believer’s life and the fellowship of the early Christian community: The Day of Pentecost (Acts 2:1-13 - sound of rushing wind, tongues of fire, speaking in other tongues, Peter’s bold sermon and 3,000 believers baptized); The Fruits of the Holy Spirit (Galatians 5:22-23 - love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control); The Gifts of the Holy Spirit for building the Church (1 Corinthians 12); Fellowship, unity, and communal sharing in the Early Church (Acts 2:42-47, Acts 4:32-35); resolving disagreements peacefully in Christian fellowship.',
    cbeCompetency: 'Spiritual discernment, moral self-control, peaceful fellowship, collaborative generosity, and communal harmony',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g5-cre-u8',
    strandId: 'strand-g5-cre-living',
    learningAreaId: 'la-cre-g5',
    title: 'Christian Living, Family Relationships, and Moral Values',
    description: 'Developing Christian character, strong family relationships, and moral values in daily life: Honoring parents and guardians (Ephesians 6:1-3, Exodus 20:12); respect for elders and teachers; healthy friendships and positive peer influence (Proverbs 13:20, 1 Corinthians 15:33); managing emotions like anger and jealousy constructively (Ephesians 4:26-27, Proverbs 15:1); honesty, truthfulness, and integrity in academic work and chores; resisting modern vices (cheating, lying, stealing, cyberbullying, drug abuse).',
    cbeCompetency: 'Moral integrity, filial respect, emotional intelligence, positive socialization, and assertive resistance to peer pressure',
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
    id: 'lesson-g5-cre-u7-l1',
    subStrandId: 'substrand-g5-cre-u7',
    title: 'The Day of Pentecost and the Outpouring of the Holy Spirit',
    content: 'Before His ascension, Jesus instructed His followers to wait in Jerusalem for the promised gift of the Holy Spirit (Acts 1:4-8). Fifty days after Passover, on the Jewish Feast of Pentecost, about 120 believers were gathered together praying in an upper room. Suddenly, a sound like the blowing of a violent wind came from heaven and filled the whole house. They saw what seemed to be tongues of fire that separated and came to rest on each of them. All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them (Acts 2:1-4). God-fearing Jews from every nation under heaven residing in Jerusalem heard them declaring the wonders of God in their own native languages! Peter, who had previously denied Jesus out of fear, stood up boldly with the eleven and preached with power. He proclaimed that Jesus whom they crucified was both Lord and Messiah. Pierced to the heart, the crowd asked, "Brothers, what shall we do?" Peter answered: "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit." About 3,000 people accepted his message and were baptized that day, marking the birth of the Christian Church.',
    didYouKnow: 'The word "Pentecost" comes from the Greek word "Pentekoste," meaning "fiftieth," celebrated fifty days after Passover!',
    kenyanContext: 'In Kenya, Pentecostal and mainline churches hold special Pentecost Sunday services featuring choral music, baptism of new believers, and prayers for spiritual renewal.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u7-l2',
    subStrandId: 'substrand-g5-cre-u7',
    title: 'Fruits of the Holy Spirit and Fellowship in the Early Church',
    content: 'The Holy Spirit actively produces godly character in every believer. In Galatians 5:22-23, the Apostle Paul lists the ninefold Fruit of the Holy Spirit: Love, Joy, Peace, Patience (forbearance), Kindness, Goodness, Faithfulness, Gentleness, and Self-control. Unlike momentary emotions, these virtues grow continually in a Christian’s heart through prayer and obedience. The Holy Spirit also bestows spiritual gifts—such as wisdom, knowledge, faith, healing, prophecy, and teaching (1 Corinthians 12)—to equip believers to build up the church and serve the needy. In the Early Church, believers demonstrated these fruits through extraordinary communal fellowship (Acts 2:42-47). They devoted themselves to the apostles’ teaching, to fellowship, to the breaking of bread, and to prayer. Believers shared all their possessions, selling property and goods to distribute to anyone in need. They met daily in the temple courts and broke bread in their homes with glad and sincere hearts, praising God and enjoying the favor of all the people. When disagreements arose, such as over food distribution in Acts 6, the apostles appointed seven wise, Spirit-filled deacons to ensure fairness, preserving love and unity.',
    didYouKnow: 'Paul described the nine virtues as the singular "Fruit" of the Spirit (not plural "fruits"), meaning they all grow together as an interconnected reflection of Christ’s character!',
    kenyanContext: 'Kenyan churches embody the Early Church spirit of mutual aid through parish "harambee" fundraisers and women’s guild welfare fellowships that support orphans, sick members, and elderly widows.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u8-l1',
    subStrandId: 'substrand-g5-cre-u8',
    title: 'Christian Family Living: Respect, Obedience, and Filial Love',
    content: 'The family is the foundational social institution established by God. The Fifth Commandment declares: "Honor your father and your mother, so that you may live long in the land the Lord your God is giving you" (Exodus 20:12). In Ephesians 6:1-3, Paul notes that this is the first commandment with a promise: "Children, obey your parents in the Lord, for this is right... that it may go well with you and that you may enjoy long life on the earth." Honoring parents means speaking to them with courtesy, obeying their lawful instructions willingly, assisting with household chores (such as cooking, cleaning, fetching water, caring for younger siblings), caring for aging parents, and praying for their well-being. Parents are also charged in Ephesians 6:4 not to exasperate their children, but to bring them up in the training and instruction of the Lord. A healthy Christian family is characterized by mutual respect, forgiveness, daily prayer, open communication, and unconditional love.',
    didYouKnow: 'The biblical command to honor parents is highlighted in both the Old Testament Law (Ten Commandments) and the New Testament Epistles, emphasizing its perpetual moral importance!',
    kenyanContext: 'In Kenyan culture, respecting parents and community elders is deeply valued; young people show respect by greeting elders with humility and offering seats in public matatus and community gatherings.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u8-l2',
    subStrandId: 'substrand-g5-cre-u8',
    title: 'Cultivating Moral Character, True Friendship, and Emotional Self-Control',
    content: 'Christian discipleship influences our daily behavior, emotional responses, and social relationships. Proverbs 13:20 advises: "Walk with the wise and become wise, for a companion of fools suffers harm." Choosing good friends who encourage honest study, kindness, and faith protects learners from harmful habits like lying, cheating in exams, stealing, cyberbullying, and drug abuse. Managing difficult emotions is a vital Christian discipline. In Ephesians 4:26-27, Scripture teaches: "In your anger do not sin: Do not let the sun go down while you are still angry, and do not give the devil a foothold." Rather than shouting or fighting when provoked, Proverbs 15:1 instructs, "A gentle answer turns away wrath, but a harsh word stirs up anger." Christians practice truthfulness in all circumstances (Ephesians 4:25), recognizing that integrity builds lasting trust and honors God.',
    didYouKnow: 'King Solomon, renowned for his divine wisdom, wrote that "Better a patient person than a warrior, one with self-control than one who takes a city" (Proverbs 16:32)!',
    kenyanContext: 'In Kenyan primary schools, Christian guidance and counseling clubs mentor learners on resolving peer conflicts peacefully through mediation rather than playground fighting.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 4 Missions (Missions 61, 62, 63, 64 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-cre-u7-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u7',
    lessonId: 'lesson-g5-cre-u7-l1',
    title: 'Pentecost Fire & Divine Power Quest',
    description: 'Experience the mighty rushing wind and tongues of fire on the Day of Pentecost, witness Peter’s bold preaching, and celebrate the birth of the Christian Church as 3,000 believers are baptized!',
    order: 61,
    orderIndex: 61,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-pentecost-fire',
    badge: { name: 'Pentecost Witness', icon: 'flame' },
    questionIds: [
      'q-g5-cre-u7-001', 'q-g5-cre-u7-002', 'q-g5-cre-u7-003', 'q-g5-cre-u7-004',
      'q-g5-cre-u7-005', 'q-g5-cre-u7-006', 'q-g5-cre-u7-007', 'q-g5-cre-u7-008',
      'q-g5-cre-u7-009', 'q-g5-cre-u7-010', 'q-g5-cre-u7-011', 'q-g5-cre-u7-012'
    ]
  },
  {
    id: 'mission-g5-cre-u7-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u7',
    lessonId: 'lesson-g5-cre-u7-l2',
    title: 'Fruits of the Spirit & Early Church Unity Challenge',
    description: 'Cultivate the nine virtues of the Fruit of the Holy Spirit, discover spiritual gifts, and step into the radical love and joyful sharing of the Early Church community!',
    order: 62,
    orderIndex: 62,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-spiritual-fruit',
    badge: { name: 'Spirit-Led Steward', icon: 'sparkles' },
    questionIds: [
      'q-g5-cre-u7-013', 'q-g5-cre-u7-014', 'q-g5-cre-u7-015', 'q-g5-cre-u7-016',
      'q-g5-cre-u7-017', 'q-g5-cre-u7-018', 'q-g5-cre-u7-019', 'q-g5-cre-u7-020',
      'q-g5-cre-u7-021', 'q-g5-cre-u7-022', 'q-g5-cre-u7-023', 'q-g5-cre-u7-024'
    ]
  },
  {
    id: 'mission-g5-cre-u8-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u8',
    lessonId: 'lesson-g5-cre-u8-l1',
    title: 'Faithful Home & Family Pillars Quest',
    description: 'Honor your father and mother with obedience and respect, discover God’s promise of blessing and long life, and build a peaceful, loving Christian home!',
    order: 63,
    orderIndex: 63,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-family-pillar',
    badge: { name: 'Family Champion', icon: 'home' },
    questionIds: [
      'q-g5-cre-u8-001', 'q-g5-cre-u8-002', 'q-g5-cre-u8-003', 'q-g5-cre-u8-004',
      'q-g5-cre-u8-005', 'q-g5-cre-u8-006', 'q-g5-cre-u8-007', 'q-g5-cre-u8-008',
      'q-g5-cre-u8-009', 'q-g5-cre-u8-010', 'q-g5-cre-u8-011', 'q-g5-cre-u8-012'
    ]
  },
  {
    id: 'mission-g5-cre-u8-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u8',
    lessonId: 'lesson-g5-cre-u8-l2',
    title: 'Moral Shield & Wise Friendship Challenge',
    description: 'Choose wise companions who build up your character, conquer anger with gentle words, stand firm in honesty against peer pressure, and live with spotless integrity!',
    order: 64,
    orderIndex: 64,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-moral-shield',
    badge: { name: 'Integrity Guardian', icon: 'shield' },
    questionIds: [
      'q-g5-cre-u8-013', 'q-g5-cre-u8-014', 'q-g5-cre-u8-015', 'q-g5-cre-u8-016',
      'q-g5-cre-u8-017', 'q-g5-cre-u8-018', 'q-g5-cre-u8-019', 'q-g5-cre-u8-020',
      'q-g5-cre-u8-021', 'q-g5-cre-u8-022', 'q-g5-cre-u8-023', 'q-g5-cre-u8-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 4 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 7 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u7-001',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What miraculous signs accompanied the outpouring of the Holy Spirit on the Day of Pentecost in Acts 2:2-3?',
    text: 'What miraculous signs accompanied the outpouring of the Holy Spirit on the Day of Pentecost in Acts 2:2-3?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A sound like the blowing of a violent wind and tongues that looked like fire resting on each of them',
      'A violent earthquake that flattened the walls of the temple',
      'A torrential rainstorm that flooded the lower streets of Jerusalem',
      'An angelic choir singing from the top of the Roman fortress'
    ],
    correctAnswer: 'A sound like the blowing of a violent wind and tongues that looked like fire resting on each of them',
    explanation: 'Acts 2:2-3 describes a sound like the rush of a violent wind filling the house, and tongues as of fire appearing, separating, and resting on each believer.',
    socraticHint: 'Which sensory signs of rushing wind and fiery tongues marked the arrival of the Holy Spirit?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-002',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How did the Holy Spirit empower the disciples immediately after filling them in Acts 2:4?',
    text: 'How did the Holy Spirit empower the disciples immediately after filling them in Acts 2:4?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They began to speak in other tongues (languages) as the Spirit enabled them',
      'They grew physical wings and flew over the Mount of Olives',
      'They were able to turn ordinary stones into silver denarii',
      'They became invisible to all Roman soldiers in Jerusalem'
    ],
    correctAnswer: 'They began to speak in other tongues (languages) as the Spirit enabled them',
    explanation: 'Acts 2:4 states: "All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them," proclaiming God’s wonders in foreign languages they had never learned.',
    socraticHint: 'What miraculous ability to proclaim God’s wonders in diverse languages did the disciples receive?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-003',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Why were the visiting Jews from various nations amazed and bewildered in Acts 2:7-11?',
    text: 'Why were the visiting Jews from various nations amazed and bewildered in Acts 2:7-11?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They heard Galilean disciples declaring the wonders of God in their own native mother tongues',
      'They saw the disciples wearing expensive royal purple robes from Greece',
      'The disciples offered them free gold coins from the Roman treasury',
      'The temple gates had been miraculously moved into the desert'
    ],
    correctAnswer: 'They heard Galilean disciples declaring the wonders of God in their own native mother tongues',
    explanation: 'Pilgrims from Parthia, Media, Mesopotamia, Egypt, Rome, and elsewhere were bewildered because each one heard Galileans speaking in their own dialect and native tongue about the wonderful works of God.',
    socraticHint: 'What amazed visitors from across the world when listening to Galilean speakers on Pentecost?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-004',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Which Old Testament prophet’s promise did Peter quote to explain the outpouring of the Holy Spirit in Acts 2:16-17?',
    text: 'Which Old Testament prophet’s promise did Peter quote to explain the outpouring of the Holy Spirit in Acts 2:16-17?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Joel ("In the last days, God says, I will pour out my Spirit on all people")',
      'Prophet Jonah ("In three days Nineveh shall be overturned")',
      'Prophet Elijah ("The god who answers by fire is God")',
      'Prophet Daniel ("The kingdom of God shall stand forever")'
    ],
    correctAnswer: 'Prophet Joel ("In the last days, God says, I will pour out my Spirit on all people")',
    explanation: 'Peter explained that this fulfilled Joel 2:28-32: "In the last days, God says, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your young men will see visions, your old men will dream dreams."',
    socraticHint: 'Which Old Testament prophet wrote that God would pour out His Spirit on all people in the last days?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-005',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'When the crowd was pierced to the heart by Peter’s sermon and asked what they should do, how did Peter instruct them in Acts 2:38?',
    text: 'When the crowd was pierced to the heart by Peter’s sermon and asked what they should do, how did Peter instruct them in Acts 2:38?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit',
      'Pay fifty silver coins to the temple priests to purchase a certificate of salvation',
      'Flee into the desert hills and never speak to anyone in Jerusalem again',
      'Join the Roman imperial guard to enforce order in Judea'
    ],
    correctAnswer: 'Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit',
    explanation: 'Peter commanded: "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit." Repentance and baptism are the doorway to new life in Christ.',
    socraticHint: 'What twofold call to repentance and baptism did Peter give for the forgiveness of sins and the gift of the Spirit?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-006',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How many people accepted Peter’s message and were baptized on that single Day of Pentecost (Acts 2:41)?',
    text: 'How many people accepted Peter’s message and were baptized on that single Day of Pentecost (Acts 2:41)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'About three thousand (3,000) people',
      'Exactly twelve (12) people',
      'One hundred and twenty (120) people',
      'Fifty thousand (50,000) people'
    ],
    correctAnswer: 'About three thousand (3,000) people',
    explanation: 'Acts 2:41 records: "Those who accepted his message were baptized, and about three thousand were added to their number that day."',
    socraticHint: 'What large number of converts—about three thousand—marked the dramatic birth of the Early Church?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-007',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How did the Holy Spirit transform Simon Peter from the fearful man who denied Jesus in the high priest’s courtyard?',
    text: 'How did the Holy Spirit transform Simon Peter from the fearful man who denied Jesus in the high priest’s courtyard?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He became a bold, courageous preacher of the Gospel who fearlessly proclaimed Jesus before thousands in Jerusalem',
      'He became a quiet monk who refused to speak with anyone for the rest of his life',
      'He joined the Roman army to acquire weapons and military protection',
      'He moved to Rome to build a trade business buying and selling fishing boats'
    ],
    correctAnswer: 'He became a bold, courageous preacher of the Gospel who fearlessly proclaimed Jesus before thousands in Jerusalem',
    explanation: 'The Holy Spirit replaced Peter’s fear and insecurity with boldness and power (Acts 1:8). The man who once cowered before a servant girl now stood before thousands proclaiming Christ without fear of arrest.',
    socraticHint: 'What dramatic change from timid fear to fearless preaching did the Holy Spirit work in Peter’s life?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-008',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'In Acts 1:8, what core purpose did Jesus promise the Holy Spirit would accomplish in believers?',
    text: 'In Acts 1:8, what core purpose did Jesus promise the Holy Spirit would accomplish in believers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'You will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, Judea, Samaria, and to the ends of the earth',
      'You will receive the ability to turn dry sand into golden jewelry',
      'You will never have to face physical illness or bodily tiredness',
      'You will be appointed political governors over the Roman empire'
    ],
    correctAnswer: 'You will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, Judea, Samaria, and to the ends of the earth',
    explanation: 'Jesus declared: "You will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." The Holy Spirit empowers believers to witness for Christ.',
    socraticHint: 'Which key verse promises divine power to be Christ’s witnesses across the entire earth?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-009',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How can a Grade 5 pupil at school rely on the Holy Spirit when feeling shy or fearful about standing up for truth?',
    text: 'How can a Grade 5 pupil at school rely on the Holy Spirit when feeling shy or fearful about standing up for truth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Pray quietly for the Holy Spirit’s courage and wisdom to speak truth gently and do what is right',
      'Pretend to agree with bullies so they do not mock you',
      'Stay away from school whenever there is a moral challenge in class',
      'Fight bullies physically with sticks on the playing field'
    ],
    correctAnswer: 'Pray quietly for the Holy Spirit’s courage and wisdom to speak truth gently and do what is right',
    explanation: 'Just as the Holy Spirit emboldened Peter, believers today can pray for the Spirit’s presence to grant moral courage, calmness, and wisdom to uphold truth and justice in school.',
    socraticHint: 'How does praying for the Holy Spirit’s inner strength help a learner overcome fear and speak up for what is right?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-010',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Why were the tongues of fire significant on the Day of Pentecost in Acts 2?',
    text: 'Why were the tongues of fire significant on the Day of Pentecost in Acts 2?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Fire symbolized God’s purifying holy presence and divine power resting upon each individual believer',
      'The room was cold and needed heating from supernatural sparks',
      'Fire showed that God was going to burn down all the buildings in Jerusalem',
      'It was a theatrical show designed to attract merchants from the marketplace'
    ],
    correctAnswer: 'Fire symbolized God’s purifying holy presence and divine power resting upon each individual believer',
    explanation: 'Throughout Scripture (like Moses’ burning bush and Mount Sinai), fire symbolizes God’s holiness, presence, and power. On Pentecost, tongues of fire resting on each person showed that God’s presence now indwells every believer.',
    socraticHint: 'In biblical imagery, what divine qualities of holiness, purification, and divine power does fire represent?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-011',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What was the immediate practical consequence of the baptism of the 3,000 believers in Jerusalem?',
    text: 'What was the immediate practical consequence of the baptism of the 3,000 believers in Jerusalem?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A loving, united community of faith (the Church) was born that learned, worshiped, and shared resources together',
      'The Roman emperor issued an immediate decree closing all Jewish synagogues',
      'All 3,000 people immediately left their homes to live in mountain caves',
      'The believers organized a political rebellion against the governor Pilate'
    ],
    correctAnswer: 'A loving, united community of faith (the Church) was born that learned, worshiped, and shared resources together',
    explanation: 'The baptism of 3,000 converts gave birth to the early Church, a vibrant community characterized by devotion to apostolic teaching, mutual fellowship, breaking of bread, and shared prayer (Acts 2:42).',
    socraticHint: 'What new spiritual and communal family came into being when thousands were baptized into Christ?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-012',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How does the universal language miracle at Pentecost reverse the ancient division caused at the Tower of Babel (Genesis 11)?',
    text: 'How does the universal language miracle at Pentecost reverse the ancient division caused at the Tower of Babel (Genesis 11)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'At Babel human pride scattered nations through confused languages; at Pentecost the Holy Spirit united diverse nations through one Gospel understood by all',
      'At Babel humans built stone altars while at Pentecost they tore down all brick buildings',
      'At Babel people spoke Hebrew while at Pentecost everyone spoke only Latin',
      'Pentecost proved that only one language should ever be spoken across the entire earth'
    ],
    correctAnswer: 'At Babel human pride scattered nations through confused languages; at Pentecost the Holy Spirit united diverse nations through one Gospel understood by all',
    explanation: 'At the Tower of Babel, human pride led to language confusion and dispersal. At Pentecost, the Holy Spirit brought unity, enabling people of every tongue to understand the wonderful works of God in Christ.',
    socraticHint: 'How does the Holy Spirit’s uniting of diverse tongues heal the scattering and division that occurred at Babel?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },

  // ==========================================
  // Unit 7 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u7-013',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Which nine Christian virtues comprise the Fruit of the Holy Spirit in Galatians 5:22-23?',
    text: 'Which nine Christian virtues comprise the Fruit of the Holy Spirit in Galatians 5:22-23?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, and Self-control',
      'Wealth, Honor, Fame, Strength, Speed, Pride, Anger, Ambition, and Courage',
      'Gold, Frankincense, Myrrh, Bronze, Silver, Iron, Silk, Wool, and Linen',
      'Faith, Hope, Charity, Justice, Prudence, Temperance, Fortitude, Zeal, and Honor'
    ],
    correctAnswer: 'Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, and Self-control',
    explanation: 'Galatians 5:22-23 lists the ninefold fruit of the Spirit: "love, joy, peace, forbearance (patience), kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law."',
    socraticHint: 'Which list contains love, joy, peace, and ends with self-control as recorded in Galatians 5?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-014',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What did the believers in the Early Church devote themselves to according to Acts 2:42?',
    text: 'What did the believers in the Early Church devote themselves to according to Acts 2:42?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The apostles’ teaching, fellowship, the breaking of bread, and prayer',
      'Military drills, political debates, and collecting taxes for Rome',
      'Building stone statues of the apostles across Judea',
      'Arguing over who among them was the greatest disciple'
    ],
    correctAnswer: 'The apostles’ teaching, fellowship, the breaking of bread, and prayer',
    explanation: 'Acts 2:42 outlines the four foundational pillars of early Christian communal life: "They devoted themselves to the apostles’ teaching and to fellowship, to the breaking of bread and to prayer."',
    socraticHint: 'Which four essential spiritual practices formed the core of daily life in the early church?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-015',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How did the early Christians demonstrate radical generosity toward those in need (Acts 2:44-45)?',
    text: 'How did the early Christians demonstrate radical generosity toward those in need (Acts 2:44-45)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'All the believers were together and had everything in common; they sold property and possessions to give to anyone in need',
      'They kept their wealth hidden in locked jars buried deep under their houses',
      'They charged high interest rates when lending money to fellow Christians',
      'They expelled poor members from the congregation so only wealthy believers remained'
    ],
    correctAnswer: 'All the believers were together and had everything in common; they sold property and possessions to give to anyone in need',
    explanation: 'Acts 2:44-45 records that early Christians had everything in common and sold possessions to meet the needs of all members, ensuring no one suffered from poverty in their community.',
    socraticHint: 'How did early believers share property and possessions so that no one was left in lack?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-016',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What was the generous act of Barnabas (Joseph, a Levite from Cyprus) recorded in Acts 4:36-37?',
    text: 'What was the generous act of Barnabas (Joseph, a Levite from Cyprus) recorded in Acts 4:36-37?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He sold a field he owned, brought the money, and laid it at the apostles’ feet to help the needy',
      'He built a large personal mansion in Antioch to host parties for governors',
      'He bought a fleet of merchant ships to trade goods across the Mediterranean',
      'He wrote a letter demanding that the apostles appoint him as their high priest'
    ],
    correctAnswer: 'He sold a field he owned, brought the money, and laid it at the apostles’ feet to help the needy',
    explanation: 'Barnabas (meaning "Son of Encouragement") sold a field he owned and brought the entire proceeds to the apostles to support vulnerable believers, modeling cheerful Christian philanthropy.',
    socraticHint: 'What property did Barnabas sell to support the fellowship of believers in Jerusalem?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-017',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'In Acts 6:1-6, how did the early church resolve the complaint regarding unfair food distribution to Grecian widows?',
    text: 'In Acts 6:1-6, how did the early church resolve the complaint regarding unfair food distribution to Grecian widows?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They selected seven reputable men full of the Spirit and wisdom (deacons, including Stephen) to manage the food distribution fairly',
      'The apostles stopped all food distribution and told the widows to fend for themselves',
      'They expelled the Grecian believers from the church community',
      'They asked the Roman police to supervise church lunch queues'
    ],
    correctAnswer: 'They selected seven reputable men full of the Spirit and wisdom (deacons, including Stephen) to manage the food distribution fairly',
    explanation: 'The community chose seven Spirit-filled men of good reputation (deacons) to oversee the daily food distribution, ensuring equity and allowing the apostles to focus on prayer and preaching.',
    socraticHint: 'How did appointing seven wise, Spirit-filled men solve the food distribution dispute peacefully and fairly?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-018',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What does 1 Corinthians 12 teach about how different spiritual gifts should function within the Body of Christ?',
    text: 'What does 1 Corinthians 12 teach about how different spiritual gifts should function within the Body of Christ?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Just as a human body has many parts with different functions that work together, all spiritual gifts are valuable and must cooperate in harmony',
      'Only believers with the gift of public preaching are important, while all other gifts are useless',
      'Gifts should be used to boast and compete with fellow church members to see who is superior',
      'Believers should hide their spiritual gifts so that others do not ask for help'
    ],
    correctAnswer: 'Just as a human body has many parts with different functions that work together, all spiritual gifts are valuable and must cooperate in harmony',
    explanation: 'Paul uses the human body metaphor to teach unity in diversity: the eye cannot say to the hand, "I don’t need you." Every member and gift is essential for the healthy functioning of the church community.',
    socraticHint: 'How does Paul’s metaphor of the human body teach mutual respect and cooperation among believers with different gifts?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-019',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Which Fruit of the Spirit is demonstrated when a learner remains calm, polite, and respectful even when teased by a classmate?',
    text: 'Which Fruit of the Spirit is demonstrated when a learner remains calm, polite, and respectful even when teased by a classmate?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Self-control and Gentleness',
      'Pride and Wrath',
      'Revenge and Malice',
      'Arrogance and Impatience'
    ],
    correctAnswer: 'Self-control and Gentleness',
    explanation: 'Self-control enables believers to master their reactions and impulses, while gentleness responds with calm grace rather than retaliation, embodying the Fruit of the Spirit.',
    socraticHint: 'Which virtues keep your temper in check and respond with peaceful softness instead of violence?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-020',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'In what practical way can Kenyan church youth groups follow the fellowship model of the Early Church today?',
    text: 'In what practical way can Kenyan church youth groups follow the fellowship model of the Early Church today?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Studying the Bible together, praying for one another, and organizing food and clothes drives for local children’s homes',
      'Excluding members who do not wear expensive brand shoes from youth activities',
      'Spending all youth fellowship funds on luxury trips to beach resorts',
      'Refusing to help elderly church members with their compound chores'
    ],
    correctAnswer: 'Studying the Bible together, praying for one another, and organizing food and clothes drives for local children’s homes',
    explanation: 'Devoting time to scripture, mutual intercession, and practical charity to help the vulnerable directly reflects Acts 2:42-45 in modern Kenyan community life.',
    socraticHint: 'Which activities combine scriptural learning, shared prayer, and selfless charity for the needy?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-021',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'Why does Paul state in 1 Corinthians 13:1-3 that all spiritual gifts are worthless without "love" (agape)?',
    text: 'Why does Paul state in 1 Corinthians 13:1-3 that all spiritual gifts are worthless without "love" (agape)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Love is the supreme motivating virtue; without genuine love, gifts become noisy, selfish, and spiritually useless',
      'Because love is an emotion that requires no action or commitment',
      'Because gifts of speaking and knowledge are forbidden for Christians',
      'Because only the apostles were permitted to possess both love and gifts'
    ],
    correctAnswer: 'Love is the supreme motivating virtue; without genuine love, gifts become noisy, selfish, and spiritually useless',
    explanation: 'Paul emphasizes that even if one has the gift of tongues, prophecy, or faith to move mountains, without love it profits nothing. Love is the essential foundation that gives meaning to all spiritual gifts.',
    socraticHint: 'Why is selfless agape love the essential foundation that makes all spiritual gifts truly beneficial?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-022',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'What did the Roman world and Jewish neighbors notice about the Early Church that caused their numbers to grow daily (Acts 2:47)?',
    text: 'What did the Roman world and Jewish neighbors notice about the Early Church that caused their numbers to grow daily (Acts 2:47)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Their genuine love, joyful unity, generosity, and sincere praise to God won the favor of all the people',
      'Their huge army of trained soldiers carrying sharp bronze swords',
      'Their enormous stockpile of gold captured from pagan temples',
      'Their strict refusal to speak to anyone who was not a baptized Christian'
    ],
    correctAnswer: 'Their genuine love, joyful unity, generosity, and sincere praise to God won the favor of all the people',
    explanation: 'Acts 2:47 notes that the believers enjoyed the favor of all the people, praising God with glad hearts, and "the Lord added to their number daily those who were being saved." Love and unity were their greatest testimony.',
    socraticHint: 'What attractive qualities of joyful worship, selfless charity, and authentic love attracted people to Christ?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-023',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'A disagreement breaks out between two learners in the school Christian Union about who should lead Sunday praise. How does biblical early church leadership guide them?',
    text: 'A disagreement breaks out between two learners in the school Christian Union about who should lead Sunday praise. How does biblical early church leadership guide them?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Pray together, resolve the matter with mutual humility and patience, and share the leading responsibilities in harmony',
      'Engage in a shouting match during chapel until the patron chooses the loudest person',
      'Split the Christian Union into two rival factions that refuse to speak to each other',
      'Refuse to sing or play musical instruments unless one is made the supreme leader'
    ],
    correctAnswer: 'Pray together, resolve the matter with mutual humility and patience, and share the leading responsibilities in harmony',
    explanation: 'The Early Church resolved conflicts through prayer, mutual deference, and peaceful cooperation (Philippians 2:3, Acts 6). Servant leadership shares responsibility and puts the fellowship’s unity above personal vanity.',
    socraticHint: 'How does peaceful cooperation, prayer, and mutual humility resolve leadership disputes in Christian fellowship?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },
  {
    id: 'q-g5-cre-u7-024',
    subStrandId: 'substrand-g5-cre-u7',
    prompt: 'How does the Fruit of the Spirit differ from physical or temporary human talents?',
    text: 'How does the Fruit of the Spirit differ from physical or temporary human talents?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Fruit of the Spirit reflects the eternal, holy character of Christ produced in a believer’s heart by the Holy Spirit',
      'The Fruit of the Spirit can be purchased with money at a church bookshop',
      'The Fruit of the Spirit is only given to professional athletes and singers',
      'The Fruit of the Spirit disappears permanently whenever a person becomes sick'
    ],
    correctAnswer: 'The Fruit of the Spirit reflects the eternal, holy character of Christ produced in a believer’s heart by the Holy Spirit',
    explanation: 'While natural talents are specific abilities for tasks, the Fruit of the Spirit is the moral and spiritual character of Jesus Christ produced by the Holy Spirit within every believer, lasting for eternity.',
    socraticHint: 'How does the Fruit of the Spirit transform the inner moral character of a person to reflect Jesus Christ?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U7'
  },

  // ==========================================
  // Unit 8 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u8-001',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What divine promise is attached to the Fifth Commandment ("Honor your father and your mother") in Exodus 20:12 and Ephesians 6:2-3?',
    text: 'What divine promise is attached to the Fifth Commandment ("Honor your father and your mother") in Exodus 20:12 and Ephesians 6:2-3?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'That it may go well with you and that you may enjoy long life on the earth',
      'That you will be appointed a government minister in your county',
      'That you will never have to wash dishes or clean your bedroom',
      'That you will receive fifty head of cattle from the community elders'
    ],
    correctAnswer: 'That it may go well with you and that you may enjoy long life on the earth',
    explanation: 'Ephesians 6:2-3 states: "Honor your father and mother—which is the first commandment with a promise—so that it may go well with you and that you may enjoy long life on the earth."',
    socraticHint: 'Which special blessing of well-being and long life is promised to children who honor their parents?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-002',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What does Ephesians 6:1 specifically command children regarding their parents?',
    text: 'What does Ephesians 6:1 specifically command children regarding their parents?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Children, obey your parents in the Lord, for this is right',
      'Children, argue with your parents whenever they give you chores',
      'Children, ignore your parents if you have a smartphone',
      'Children, only obey your parents when they give you pocket money'
    ],
    correctAnswer: 'Children, obey your parents in the Lord, for this is right',
    explanation: 'Ephesians 6:1 commands: "Children, obey your parents in the Lord, for this is right." Respectful obedience to parents is a fundamental moral duty pleasing to God.',
    socraticHint: 'Which clear, direct instruction opens Ephesians chapter 6 concerning children and parents?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-003',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'How can a Grade 5 pupil demonstrate honor and respect toward their parents in practical daily life at home?',
    text: 'How can a Grade 5 pupil demonstrate honor and respect toward their parents in practical daily life at home?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Speaking to them politely, obeying instructions promptly, and helping cheerfully with domestic chores',
      'Rolling eyes and grumbling loudly whenever asked to sweep the floor',
      'Demanding expensive gifts before greeting them after school',
      'Leaving their school uniform and dirty socks scattered across the living room'
    ],
    correctAnswer: 'Speaking to them politely, obeying instructions promptly, and helping cheerfully with domestic chores',
    explanation: 'Honoring parents involves respectful communication, willing cooperation, prompt obedience, and actively easing their burdens through domestic assistance and loving gratitude.',
    socraticHint: 'Which actions show polite speech, willing obedience, and cheerful helpfulness at home?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-004',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What responsibility does Ephesians 6:4 give to Christian parents regarding the upbringing of their children?',
    text: 'What responsibility does Ephesians 6:4 give to Christian parents regarding the upbringing of their children?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not exasperate your children; instead, bring them up in the training and instruction of the Lord',
      'Demand that children work on farms 24 hours a day without attending school',
      'Never discipline children even when they commit serious moral wrongs',
      'Give children everything they demand so they never feel disappointed'
    ],
    correctAnswer: 'Do not exasperate your children; instead, bring them up in the training and instruction of the Lord',
    explanation: 'Ephesians 6:4 guides parents to avoid harsh, unreasonable treatment that provokes children to anger, commanding them to raise children in godly instruction, discipline, and loving guidance.',
    socraticHint: 'How are parents instructed to nurture children without exasperating them?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-005',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'According to Leviticus 19:32, how should young people treat elderly persons in their community?',
    text: 'According to Leviticus 19:32, how should young people treat elderly persons in their community?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Stand up in the presence of the aged, show respect for the elderly and revere your God',
      'Ignore elderly persons because their ideas are outdated and irrelevant',
      'Mock elderly people when they walk slowly with walking sticks',
      'Avoid greeting elderly neighbors when walking along village paths'
    ],
    correctAnswer: 'Stand up in the presence of the aged, show respect for the elderly and revere your God',
    explanation: 'Leviticus 19:32 commands: "Stand up in the presence of the aged, show respect for the elderly and revere your God. I am the Lord." Respect for elders is linked directly with reverence for God.',
    socraticHint: 'What respectful physical gesture in the presence of elderly people is commanded in Leviticus?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-006',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'In Luke 2:51, what example did Jesus set as a twelve-year-old boy in Nazareth regarding family living?',
    text: 'In Luke 2:51, what example did Jesus set as a twelve-year-old boy in Nazareth regarding family living?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He went down to Nazareth with Mary and Joseph and was obedient to them',
      'He left His parents to establish an independent carpentry business in Jerusalem',
      'He told Joseph that divine children do not need to follow earthly house rules',
      'He spent His days playing games and avoided learning practical crafts'
    ],
    correctAnswer: 'He went down to Nazareth with Mary and Joseph and was obedient to them',
    explanation: 'Luke 2:51 states: "Then he went down to Nazareth with them and was obedient to them." Jesus’ perfect submission to His earthly parents models filial obedience for every child.',
    socraticHint: 'What exemplary attitude of obedience did Jesus show to Mary and Joseph in Nazareth?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-007',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'When parents correct or discipline a child for wrongdoing, how does Proverbs 3:11-12 explain this correction?',
    text: 'When parents correct or discipline a child for wrongdoing, how does Proverbs 3:11-12 explain this correction?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Correction is a proof of genuine love, just as a father disciplines the son he delights in',
      'Correction proves that parents hate their children and want to punish them unfairly',
      'Correction shows that parents have run out of patience and want to be mean',
      'Correction is a legal formality that has no spiritual meaning'
    ],
    correctAnswer: 'Correction is a proof of genuine love, just as a father disciplines the son he delights in',
    explanation: 'Proverbs 3:11-12 explains: "Do not despise the Lord’s discipline... because the Lord disciplines those he loves, as a father the son he delights in." Godly parental discipline stems from loving protection.',
    socraticHint: 'Does godly correction stem from hatred and cruelty or from loving concern and protection?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-008',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'A learner named Moses is asked by his mother to look after his younger brother while she finishes cooking supper. How can Moses honor God in this situation?',
    text: 'A learner named Moses is asked by his mother to look after his younger brother while she finishes cooking supper. How can Moses honor God in this situation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Care for his little brother attentively and kindly, helping his mother cheerfully',
      'Shout at his brother and run away to play football in the street',
      'Demand ten shillings from his mother before agreeing to watch the baby',
      'Pinch his brother so the baby cries loudly and makes the mother stop cooking'
    ],
    correctAnswer: 'Care for his little brother attentively and kindly, helping his mother cheerfully',
    explanation: 'Helping with siblings cheerfully and without complaint demonstrates loving service, filial honor, and responsible Christian family behavior.',
    socraticHint: 'Which option shows cheerful cooperation and loving care for a younger family member?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-009',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What did Jesus do while dying on the Cross to ensure His widowed mother Mary was cared for (John 19:26-27)?',
    text: 'What did Jesus do while dying on the Cross to ensure His widowed mother Mary was cared for (John 19:26-27)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He entrusted Mary to the care of the beloved disciple John, saying, "Dear woman, here is your son," and to John, "Here is your mother"',
      'He asked the Roman centurions to pay Mary a monthly widow’s pension',
      'He told Mary that His death ended all family obligations between them',
      'He asked the high priest to provide a room for Mary in the temple courtyard'
    ],
    correctAnswer: 'He entrusted Mary to the care of the beloved disciple John, saying, "Dear woman, here is your son," and to John, "Here is your mother"',
    explanation: 'Even in His deepest physical agony on the Cross, Jesus fulfilled the fifth commandment by providing loving lifelong shelter and care for His mother through John, who took her into his home from that hour.',
    socraticHint: 'To which beloved disciple did Jesus tenderly entrust the care of His mother Mary?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-010',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'How does holding regular family prayer and scripture reading contribute to peace in a Kenyan household?',
    text: 'How does holding regular family prayer and scripture reading contribute to peace in a Kenyan household?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It builds spiritual unity, fosters forgiveness, resolves misunderstandings, and invites God’s peace into the home',
      'It creates strict silence so family members never talk to each other about problems',
      'It replaces the need for family members to apologize when they offend each other',
      'It makes sure that parents never have to work to provide food and school fees'
    ],
    correctAnswer: 'It builds spiritual unity, fosters forgiveness, resolves misunderstandings, and invites God’s peace into the home',
    explanation: 'Gathering for prayer and scripture allows families to surrender anxieties to God, seek mutual forgiveness, reinforce shared moral values, and invite the peace of Christ into everyday life.',
    socraticHint: 'How does praying together as a family promote reconciliation, forgiveness, and moral harmony?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-011',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'Which of the following actions constitutes a serious failure to honor one’s parents under Christian moral teaching?',
    text: 'Which of the following actions constitutes a serious failure to honor one’s parents under Christian moral teaching?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Speaking to parents disrespectfully, lying about school performance, and stealing household money',
      'Asking parents for guidance on a difficult homework question in science',
      'Washing dishes and sweeping the floor before being asked',
      'Praying for parents when they leave early for farming or trading work'
    ],
    correctAnswer: 'Speaking to parents disrespectfully, lying about school performance, and stealing household money',
    explanation: 'Disrespect, deceit, and theft violate both the Fifth and Eighth Commandments, damaging parental trust, dishonoring family dignity, and sinning against God.',
    socraticHint: 'Which harmful behaviors violate parental honor, honesty, and biblical commandment?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-012',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'Why does God place human beings in families as the primary environment for spiritual and moral development?',
    text: 'Why does God place human beings in families as the primary environment for spiritual and moral development?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Families provide nurture, unconditional love, moral instruction, and a living sanctuary where children first learn to love God and neighbor',
      'Families exist solely as economic units to generate commercial profits through manual labor',
      'Families are temporary shelters until children learn how to hunt in the wild',
      'God prefers humans to live in isolation without any social obligations'
    ],
    correctAnswer: 'Families provide nurture, unconditional love, moral instruction, and a living sanctuary where children first learn to love God and neighbor',
    explanation: 'The family is God’s appointed sanctuary where children experience love, safety, moral values, and faith modeled in daily life, preparing them to be responsible, godly citizens in society.',
    socraticHint: 'What foundational role does the family play in nurturing faith, love, and moral character in a growing child?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },

  // ==========================================
  // Unit 8 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u8-013',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What profound warning regarding friendships is given in Proverbs 13:20?',
    text: 'What profound warning regarding friendships is given in Proverbs 13:20?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Walk with the wise and become wise, for a companion of fools suffers harm',
      'Avoid all friends because nobody can be trusted in this world',
      'Only befriend people who give you expensive toys and sweets',
      'The more friends you have, the less you need to study for exams'
    ],
    correctAnswer: 'Walk with the wise and become wise, for a companion of fools suffers harm',
    explanation: 'Proverbs 13:20 warns: "Walk with the wise and become wise, for a companion of fools suffers harm." Our choice of companions strongly shapes our character, wisdom, and future.',
    socraticHint: 'Which proverb connects walking with wise people to becoming wise, and warning of harm from foolish companions?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-014',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What does 1 Corinthians 15:33 teach about the danger of negative peer pressure?',
    text: 'What does 1 Corinthians 15:33 teach about the danger of negative peer pressure?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not be misled: Bad company corrupts good character',
      'Bad company makes you more popular and successful in school',
      'Good character automatically protects you from any peer influence',
      'You should copy everything your peers do to fit into the group'
    ],
    correctAnswer: 'Do not be misled: Bad company corrupts good character',
    explanation: '1 Corinthians 15:33 states: "Do not be misled: ‘Bad company corrupts good character.’" Associating with peers who engage in wrongdoing gradually erodes our moral values and integrity.',
    socraticHint: 'Which concise verse warns that "bad company corrupts good character"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-015',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'According to Proverbs 15:1, what is the best way to diffuse an angry confrontation at school?',
    text: 'According to Proverbs 15:1, what is the best way to diffuse an angry confrontation at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A gentle answer turns away wrath, but a harsh word stirs up anger',
      'Shouting insults louder than the other person to intimidate them',
      'Throwing school bags at the person to make them back away',
      'Challenging the classmate to a physical wrestling contest'
    ],
    correctAnswer: 'A gentle answer turns away wrath, but a harsh word stirs up anger',
    explanation: 'Proverbs 15:1 teaches: "A gentle answer turns away wrath, but a harsh word stirs up anger." Responding calmly and gently disarms anger and prevents conflict from escalating.',
    socraticHint: 'What kind of gentle verbal response turns away anger according to Proverbs 15?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-016',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What wise instruction does Ephesians 4:26 give about handling anger constructively?',
    text: 'What wise instruction does Ephesians 4:26 give about handling anger constructively?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In your anger do not sin: Do not let the sun go down while you are still angry',
      'Keep your anger inside for years until you find an opportunity to take revenge',
      'Destroy personal property whenever you feel frustrated or angry',
      'Refuse to speak to anyone in your family for an entire month'
    ],
    correctAnswer: 'In your anger do not sin: Do not let the sun go down while you are still angry',
    explanation: 'Ephesians 4:26-27 warns: "In your anger do not sin: Do not let the sun go down while you are still angry, and do not give the devil a foothold." Resolving anger quickly prevents bitterness and hatred.',
    socraticHint: 'Before what natural time marker (sunset) should anger be reconciled to avoid sin and bitterness?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-017',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'A classmate tries to persuade Mercy to steal a packet of colored pencils from another pupil’s desk. How should Mercy respond?',
    text: 'A classmate tries to persuade Mercy to steal a packet of colored pencils from another pupil’s desk. How should Mercy respond?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Firmly refuse, saying: "No, stealing is wrong and against God’s commandments," and encourage the classmate to return to their seat',
      'Steal the pencils quickly and split them half-and-half with the classmate',
      'Agree to keep watch while the classmate steals the pencils',
      'Take the pencils and bury them in the playground sand'
    ],
    correctAnswer: 'Firmly refuse, saying: "No, stealing is wrong and against God’s commandments," and encourage the classmate to return to their seat',
    explanation: 'The Eighth Commandment commands: "You shall not steal" (Exodus 20:15). Christian integrity requires assertive moral resistance: saying a firm "No" to wrongdoing and standing for righteousness.',
    socraticHint: 'Which response demonstrates assertive Christian integrity by refusing to participate in theft?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-018',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What does Proverbs 12:22 declare about God’s attitude toward lying and truthfulness?',
    text: 'What does Proverbs 12:22 declare about God’s attitude toward lying and truthfulness?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Lord detests lying lips, but He delights in people who are trustworthy',
      'Lying is acceptable as long as you do not get caught by the teacher',
      'God prefers clever deceit over honest truthfulness in business',
      'Telling lies is a normal skill that every person must master'
    ],
    correctAnswer: 'The Lord detests lying lips, but He delights in people who are trustworthy',
    explanation: 'Proverbs 12:22 teaches: "The Lord detests lying lips, but he delights in people who are trustworthy." God is a God of truth, and integrity in speech pleases Him.',
    socraticHint: 'What does God detest and in what kind of trustworthy behavior does He delight?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-019',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What is "cyberbullying," and why does it violate Christian moral principles?',
    text: 'What is "cyberbullying," and why does it violate Christian moral principles?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Using phones or the internet to send cruel, insulting messages or embarrass others, violating Christ’s command to love and protect our neighbor’s dignity',
      'Learning computer coding to develop educational math games for primary schools',
      'Sending online homework assignments to class teachers via email',
      'Searching for biblical maps of Jerusalem on school tablets'
    ],
    correctAnswer: 'Using phones or the internet to send cruel, insulting messages or embarrass others, violating Christ’s command to love and protect our neighbor’s dignity',
    explanation: 'Cyberbullying involves using digital platforms to harass, insult, or intimidate others. Ephesians 4:29 warns against unwholesome talk, commanding us to use words only to build up and encourage others.',
    socraticHint: 'How does using digital technology to mock or insult classmates violate Christian love and respect?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-020',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'Why should Kenyan school learners completely reject alcohol, smoking, and illicit drugs according to 1 Corinthians 6:19-20?',
    text: 'Why should Kenyan school learners completely reject alcohol, smoking, and illicit drugs according to 1 Corinthians 6:19-20?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Our bodies are temples of the Holy Spirit bought at a price, and we must honor God with our bodies',
      'Because drugs are expensive and children should save money to buy candy',
      'Because smoking only harms people when they become over eighty years old',
      'Because physical health has no connection to spiritual life'
    ],
    correctAnswer: 'Our bodies are temples of the Holy Spirit bought at a price, and we must honor God with our bodies',
    explanation: '1 Corinthians 6:19-20 reminds us: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies."',
    socraticHint: 'Why is viewing our physical body as a temple of the Holy Spirit a powerful reason to keep it pure and healthy?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-021',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'During sports day, Patrick loses the 100-meter sprint to his classmate. What is the Christian response to feelings of jealousy?',
    text: 'During sports day, Patrick loses the 100-meter sprint to his classmate. What is the Christian response to feelings of jealousy?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sincerely congratulate the winner, rejoice in their success, and thank God for his own running ability',
      'Trip the winner during the prize presentation to humiliate them',
      'Spread malicious rumors that the winner cheated or took unauthorized medicine',
      'Cry and refuse to eat food for three days to make everyone feel guilty'
    ],
    correctAnswer: 'Sincerely congratulate the winner, rejoice in their success, and thank God for his own running ability',
    explanation: 'Romans 12:15 commands us to "Rejoice with those who rejoice." Overcoming jealousy with genuine celebration of others’ success reflects true Christian humility and sportsmanship.',
    socraticHint: 'How does congratulating the winner and rejoicing in their success overcome bitter feelings of jealousy?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-022',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'What quality of true friendship is exemplified by Jonathan’s covenant friendship with David in 1 Samuel 18:1-4?',
    text: 'What quality of true friendship is exemplified by Jonathan’s covenant friendship with David in 1 Samuel 18:1-4?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Selfless loyalty, sacrificial love, and protecting one’s friend even at personal cost',
      'Compromising on moral principles to keep each other’s bad secrets',
      'Using a friend’s skills to make oneself look more important in the palace',
      'Abandoning a friend as soon as they encounter dangerous challenges'
    ],
    correctAnswer: 'Selfless loyalty, sacrificial love, and protecting one’s friend even at personal cost',
    explanation: 'Jonathan loved David as his own soul, giving him his robe, sword, and bow. He protected David from King Saul’s jealousy, demonstrating sacrificial, selfless, and godly friendship.',
    socraticHint: 'What noble qualities of sacrificial loyalty and protective love defined Jonathan’s friendship with David?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-023',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'In Matthew 5:9, what high honor and blessing does Jesus give to peacemakers in the Beatitudes?',
    text: 'In Matthew 5:9, what high honor and blessing does Jesus give to peacemakers in the Beatitudes?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Blessed are the peacemakers, for they will be called children of God',
      'Blessed are the peacemakers, for they will receive gold crowns from Rome',
      'Blessed are the peacemakers, for they will never have to work for a living',
      'Blessed are the peacemakers, for they will become kings of all earthly armies'
    ],
    correctAnswer: 'Blessed are the peacemakers, for they will be called children of God',
    explanation: 'In the Sermon on the Mount (Matthew 5:9), Jesus declared: "Blessed are the peacemakers, for they will be called children of God." Peacemaking reflects the very character of our Heavenly Father.',
    socraticHint: 'Which Beatitude states that those who actively foster peace will be recognized as children of God?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  },
  {
    id: 'q-g5-cre-u8-024',
    subStrandId: 'substrand-g5-cre-u8',
    prompt: 'Why is personal integrity—doing the right thing even when no one is watching—the true mark of Christian character?',
    text: 'Why is personal integrity—doing the right thing even when no one is watching—the true mark of Christian character?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because God sees everything (Proverbs 15:3), and living with integrity reflects genuine reverence for God rather than mere eye-service for humans',
      'Because being honest guarantees that school exams will always be simple and easy',
      'Because people who practice integrity never face any disagreements with peers',
      'Because human integrity is an invention of Greek philosophers with no connection to biblical faith'
    ],
    correctAnswer: 'Because God sees everything (Proverbs 15:3), and living with integrity reflects genuine reverence for God rather than mere eye-service for humans',
    explanation: 'Proverbs 15:3 says: "The eyes of the Lord are everywhere, keeping watch on the wicked and the good." Christian integrity springs from inner love and reverence for God, choosing righteousness for His glory.',
    socraticHint: 'Why does knowing that God sees all our actions motivate true integrity beyond human praise?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U8'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 4 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
