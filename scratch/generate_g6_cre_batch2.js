/**
 * Grade 6 Christian Religious Education (CRE) - Batch 2 Generator
 * Content: Units 3 & 4 (The Bible & Translations in Kenya, Old Testament Heroes of Faith & Servant Leadership)
 * Missions: Orders 113, 114, 115, 116 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-cre-u3-001 to q-g6-cre-u4-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 CRE Batch 2 (Units 3 & 4) ---');

// 1. Units 3 & 4 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-cre-u3',
    strandId: 'strand-g6-cre-bible',
    learningAreaId: 'la-cre-g6',
    title: 'The Bible as a Guide in Daily Life & Translations in Kenya',
    name: 'The Bible as a Guide in Daily Life & Translations in Kenya',
    description: 'Understanding the Holy Bible as God-breathed scripture and moral guide (2 Timothy 3:16-17, Psalm 119:105); historical journey of Bible translation from original Hebrew, Aramaic, and Greek into English and indigenous Kenyan languages (Kiswahili, Kikuyu, Dholuo, Luhya, Kalenjin, Kamba, Ekegusii, Maasai, Rendille, Borana); the vital mission of the Bible Society of Kenya (BSK); handling the sacred scripture with spiritual and physical reverence; applying biblical wisdom to moral decisions, peer pressure, and conflict resolution.',
    cbeCompetency: 'Biblical literacy, linguistic heritage appreciation, ethical decision-making, and moral integrity',
    estimatedMinutes: 30,
    order: 3,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-cre-u4',
    strandId: 'strand-g6-cre-bible',
    learningAreaId: 'la-cre-g6',
    title: 'Old Testament Heroes of Faith, Courage & Servant Leadership',
    name: 'Old Testament Heroes of Faith, Courage & Servant Leadership',
    description: 'Analyzing character traits, moral courage, and servant leadership of Old Testament figures: Moses demonstrating meekness, intercession, and reliance on God; Deborah judging Israel with wisdom, justice, and military valor (Judges 4-5); Gideon overcoming self-doubt and fear with obedience (Judges 6-7); David demonstrating unwavering faith against Goliath and forgiving his enemies; Solomon praying for an understanding heart rather than selfish riches (1 Kings 3); applying servant leadership principles in primary school prefectship, teamwork, and family life.',
    cbeCompetency: 'Servant leadership, moral courage, empathy, and collaborative problem-solving',
    estimatedMinutes: 30,
    order: 4,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-cre-u3-l1',
    subStrandId: 'substrand-g6-cre-u3',
    title: 'The Holy Scripture: Divine Inspiration, Structure & Daily Guidance',
    content: 'The Bible is the inspired Word of God, revealing God’s character, salvation plan, and righteous instructions for living.\n\n1. Divine Inspiration and Authority:\n- 2 Timothy 3:16-17: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."\n- Psalm 119:105: "Your word is a lamp for my feet, a light on my path."\n\n2. Structure and Major Divisions:\n- Old Testament (39 books written originally in Hebrew and Aramaic): Law (Torah/Pentateuch - 5 books), Historical Books (12 books), Poetic/Wisdom Books (5 books), Major Prophets (5 books), and Minor Prophets (12 books).\n- New Testament (27 books written in Greek): Gospels (Matthew, Mark, Luke, John), Church History (Acts), Pauline & General Epistles (21 letters), and Prophecy (Revelation).\n\n3. Living by Biblical Guidance:\n- Daily reading, meditation, memorization, and obedience to scripture transforms character and guards against temptation (Psalm 119:11: "I have hidden your word in my heart that I might not sin against you").',
    didYouKnow: 'The Bible was written over a span of approximately 1,500 years by more than 40 different human authors from kings to fishermen, yet it carries a single unified message of God’s redeeming love!',
    kenyanContext: 'Every school day across Kenya, students in Christian Union (C.U.) and pastoral instruction classes memorize weekly Bible verses to build strong moral foundations.',
    order: 5,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u3-l2',
    subStrandId: 'substrand-g6-cre-u3',
    title: 'Bible Translation in Kenya: The Bible Society, Mother Tongues & Reverence',
    content: 'God speaks to every human being in their own heart language. The translation of scripture into indigenous Kenyan languages is an extraordinary historical achievement.\n\n1. Early Translation History in Kenya:\n- Dr. Johann Ludwig Krapf of the Church Missionary Society (CMS) arrived in Mombasa in 1844 and translated the Gospel of Luke and Genesis into Kiswahili and Kikamba.\n- Early translation teams worked alongside local African elders to accurately translate spiritual concepts without losing cultural meaning.\n\n2. The Bible Society of Kenya (BSK):\n- Established to translate, produce, and distribute affordable Bibles in Kenyan indigenous languages.\n- Complete Bibles now exist in numerous Kenyan mother tongues, including Kiswahili, Kikuyu, Dholuo, Luhya, Kalenjin, Kamba, Ekegusii, Maasai, Meru, Turkana, Borana, and Pokomo.\n- BSK also produces Braille Bibles for the visually impaired and audio Bibles for oral communities.\n\n3. Handling the Word of God with Reverence:\n- Physical Care: Keeping Bibles clean, dry, covered, and in safe designated locations, never placing dirty objects on top.\n- Spiritual Reverence: Approaching the Bible with humility, prayerful hearts, and willingness to obey its moral teachings.',
    didYouKnow: 'The translation of the Bible into indigenous Kenyan languages played a foundational role in standardizing written orthography and grammar for many Kenyan communities!',
    kenyanContext: 'At the Kenya Music Festival and church Sunday services, youth proudly recite Bible verses and choral verses in both national languages and local mother tongues.',
    order: 6,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u4-l1',
    subStrandId: 'substrand-g6-cre-u4',
    title: 'Courageous Leaders: Moses, Deborah & Gideon Championing God’s People',
    content: 'Old Testament heroes demonstrate that true leadership is rooted in faith, obedience, moral courage, and humility rather than worldly arrogance.\n\n1. Moses: The Servant Intercessor (Exodus 3-14, Numbers 12:3):\n- Moses was described as the meekest man on earth. He led the Israelites out of Egyptian bondage, parted the Red Sea by God’s command, and repeatedly interceded for the rebellious people.\n- Lesson: Great leaders are humble, patient, and rely completely on God’s direction.\n\n2. Deborah: Prophetess, Judge & Liberator (Judges 4-5):\n- Deborah held court under the Palm of Deborah, administering wise justice. When Israel was oppressed by King Jabin of Canaan, she summoned Barak and fearlessly accompanied him into battle, inspiring victory.\n- Lesson: God calls women and men alike to lead with courage, wisdom, and moral conviction.\n\n3. Gideon: Overcoming Insecurity by Faith (Judges 6-8):\n- Gideon felt insignificant ("my clan is the weakest, and I am the least in my family"). Yet God called him a "mighty warrior." With just 300 men holding clay jars, torches, and trumpets, Gideon routed the massive Midianite host.\n- Lesson: God does not rely on human numbers or strength; He empowers those who obey Him in faith.',
    didYouKnow: 'Deborah is the only female judge recorded in the Book of Judges, and she was affectionately revered by the nation as a "Mother in Israel" (Judges 5:7)!',
    kenyanContext: 'Kenyan women leaders like Field Marshal Muthoni wa Kirima and Chief Justice Martha Koome reflect the courageous, pioneering legacy of biblical leaders like Deborah.',
    order: 7,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-cre-u4-l2',
    subStrandId: 'substrand-g6-cre-u4',
    title: 'Heart of Servant Leadership: David’s Humility & Solomon’s Wisdom',
    content: 'Leadership according to God’s heart is distinguished by a humble spirit, genuine repentance, and a desire to seek divine wisdom over personal riches.\n\n1. David: A Man After God’s Own Heart (1 Samuel 16-18, 2 Samuel 12):\n- As an overlooked shepherd boy, David trusted God to slay the giant Goliath with a simple sling and five smooth stones, proclaiming: "The battle is the Lord’s!"\n- When King Saul pursued him out of jealousy, David spared Saul’s life twice in the caves, refusing to take revenge.\n- When confronted by Prophet Nathan over his sin, David showed deep, genuine brokenness and repentance (Psalm 51).\n- Lesson: True leadership requires faith, mercy toward opponents, and quick repentance when wrong.\n\n2. Solomon: Seeking an Understanding Heart (1 Kings 3:5-14):\n- When God appeared to young King Solomon in a dream and offered him whatever he asked, Solomon did not request long life, wealth, or victory over enemies.\n- Solomon prayed: "Give your servant a discerning heart to govern your people and to distinguish between right and wrong."\n- God was pleased with Solomon’s unselfish request and granted him unparalleled wisdom, along with honor and wealth.\n\n3. Practicing Servant Leadership Today:\n- Serving schoolmates selflessly, listening attentively, avoiding bossy tyranny, and standing up for truth and fairness.',
    didYouKnow: 'The famous judgment of Solomon involved two mothers claiming the same baby; Solomon’s proposal to divide the child revealed the true mother by her selfless, protective love!',
    kenyanContext: 'In Kenyan schools, student councils and prefect bodies are trained in servant leadership principles: leading by example, helping weaker pupils, and building harmonious school communities.',
    order: 8,
    durationMinutes: 15,
    learningAreaId: 'la-cre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 113, 114, 115, 116 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-cre-u3-m1',
    worldId: 'world-faith-values',
    title: 'Mission 113: Lamp on My Path – Biblical Inspiration & Canon Structure',
    description: 'Explore the divine inspiration of sacred scripture, navigate the 66 books of the Old and New Testaments, and apply God’s word to daily decisions.',
    order: 113,
    orderIndex: 113,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-scripture-scholar',
    badge: 'badge-g6-cre-scripture-scholar',
    lessonId: 'lesson-g6-cre-u3-l1',
    questionIds: [
      'q-g6-cre-u3-001', 'q-g6-cre-u3-002', 'q-g6-cre-u3-003', 'q-g6-cre-u3-004',
      'q-g6-cre-u3-005', 'q-g6-cre-u3-006', 'q-g6-cre-u3-007', 'q-g6-cre-u3-008',
      'q-g6-cre-u3-009', 'q-g6-cre-u3-010', 'q-g6-cre-u3-011', 'q-g6-cre-u3-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u3-m2',
    worldId: 'world-faith-values',
    title: 'Mission 114: Mother Tongue Scriptures – Krapf, BSK & Sacred Reverence',
    description: 'Trace the heroic history of Bible translation in Kenya from Ludwig Krapf to the Bible Society of Kenya, honoring scriptures in our mother tongues.',
    order: 114,
    orderIndex: 114,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-cre-bible-custodian',
    badge: 'badge-g6-cre-bible-custodian',
    lessonId: 'lesson-g6-cre-u3-l2',
    questionIds: [
      'q-g6-cre-u3-013', 'q-g6-cre-u3-014', 'q-g6-cre-u3-015', 'q-g6-cre-u3-016',
      'q-g6-cre-u3-017', 'q-g6-cre-u3-018', 'q-g6-cre-u3-019', 'q-g6-cre-u3-020',
      'q-g6-cre-u3-021', 'q-g6-cre-u3-022', 'q-g6-cre-u3-023', 'q-g6-cre-u3-024'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u4-m1',
    worldId: 'world-faith-values',
    title: 'Mission 115: Pillars of Courage – Moses, Deborah & Gideon’s 300',
    description: 'Stand beside Moses parting the sea, Deborah leading beneath the palm, and Gideon triumphing with clay jars and trumpets of faith.',
    order: 115,
    orderIndex: 115,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-pillar-of-courage',
    badge: 'badge-g6-cre-pillar-of-courage',
    lessonId: 'lesson-g6-cre-u4-l1',
    questionIds: [
      'q-g6-cre-u4-001', 'q-g6-cre-u4-002', 'q-g6-cre-u4-003', 'q-g6-cre-u4-004',
      'q-g6-cre-u4-005', 'q-g6-cre-u4-006', 'q-g6-cre-u4-007', 'q-g6-cre-u4-008',
      'q-g6-cre-u4-009', 'q-g6-cre-u4-010', 'q-g6-cre-u4-011', 'q-g6-cre-u4-012'
    ],
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'mission-g6-cre-u4-m2',
    worldId: 'world-faith-values',
    title: 'Mission 116: The Servant’s Crown – David’s Mercy & Solomon’s Discernment',
    description: 'Emulate young David confronting Goliath and sparing King Saul, and unlock Solomon’s prayer for an understanding heart in servant leadership.',
    order: 116,
    orderIndex: 116,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-cre-servant-leader',
    badge: 'badge-g6-cre-servant-leader',
    lessonId: 'lesson-g6-cre-u4-l2',
    questionIds: [
      'q-g6-cre-u4-013', 'q-g6-cre-u4-014', 'q-g6-cre-u4-015', 'q-g6-cre-u4-016',
      'q-g6-cre-u4-017', 'q-g6-cre-u4-018', 'q-g6-cre-u4-019', 'q-g6-cre-u4-020',
      'q-g6-cre-u4-021', 'q-g6-cre-u4-022', 'q-g6-cre-u4-023', 'q-g6-cre-u4-024'
    ],
    learningAreaId: 'la-cre-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 3: The Bible as a Guide in Daily Life & Translations in Kenya (q-g6-cre-u3-001 to 024) ---
  {
    id: 'q-g6-cre-u3-001',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'According to 2 Timothy 3:16, what divine characteristic applies to all biblical scripture?',
    options: [
      'All scripture is God-breathed (divinely inspired)',
      'Scripture was invented by ancient Roman philosophers',
      'Only parts of the New Testament are true',
      'The Bible was written by an angel in modern English'
    ],
    correctAnswer: 'All scripture is God-breathed (divinely inspired)',
    explanation: '2 Timothy 3:16 states that all scripture is God-breathed (inspired by the Holy Spirit) and profitable for teaching, rebuking, correcting, and training in righteousness.',
    socraticHint: 'Which key phrase in 2 Timothy describes how God inspired the writers of scripture?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-002',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'In Psalm 119:105, what two vivid metaphors does the psalmist use to describe the guidance of God’s Word?',
    options: [
      'A lamp for my feet and a light on my path',
      'A sword in my hand and a shield on my chest',
      'A gold coin in my pocket and a loaf of bread',
      'A cloud in the sky and a wave on the sea'
    ],
    correctAnswer: 'A lamp for my feet and a light on my path',
    explanation: 'Psalm 119:105 proclaims: "Your word is a lamp for my feet, a light on my path," depicting scripture as an illuminated guide for everyday moral choices.',
    socraticHint: 'Which verse compares God’s word to an illuminating light that guides where we step?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-003',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'How many total books are contained in the standard Protestant Christian Bible?',
    options: [
      '66 books (39 Old Testament + 27 New Testament)',
      '100 books (50 Old Testament + 50 New Testament)',
      '52 books (one for each week of the year)',
      '40 books (written by 40 authors)'
    ],
    correctAnswer: '66 books (39 Old Testament + 27 New Testament)',
    explanation: 'The Protestant canon contains 66 books in total: 39 books in the Old Testament and 27 books in the New Testament.',
    socraticHint: 'How many books are in the Old Testament and New Testament combined?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-004',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'What are the first five books of the Bible collectively called in the Old Testament?',
    options: [
      'The Pentateuch (or Torah / Books of Law)',
      'The Major Prophets',
      'The Wisdom Books',
      'The Epistles of Paul'
    ],
    correctAnswer: 'The Pentateuch (or Torah / Books of Law)',
    explanation: 'The first five books (Genesis, Exodus, Leviticus, Numbers, Deuteronomy) are known as the Pentateuch (Greek for "five scrolls") or the Torah.',
    socraticHint: 'Which collective name refers to the five books of Moses?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-005',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'In which original language was the majority of the Old Testament written?',
    options: [
      'Hebrew (with small portions in Aramaic)',
      'Latin',
      'Modern English',
      'Classical Arabic'
    ],
    correctAnswer: 'Hebrew (with small portions in Aramaic)',
    explanation: 'The Old Testament was originally composed in ancient Hebrew, the language of the Israelites, with short sections in Daniel and Ezra written in Aramaic.',
    socraticHint: 'Which ancient Semitic language was spoken by the Israelites and used to write the Old Testament?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-006',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'In which language was the New Testament originally composed during the first century AD?',
    options: [
      'Koine Greek',
      'Classical Hebrew',
      'German',
      'French'
    ],
    correctAnswer: 'Koine Greek',
    explanation: 'The New Testament was written in Koine Greek (common Greek), the international lingua franca of the Mediterranean world during the Roman Empire.',
    socraticHint: 'Which common Greek dialect was widely spoken across the Roman Empire when the Apostles wrote?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-007',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'Which four New Testament books record the life, miracles, teachings, death, and resurrection of Jesus Christ?',
    options: [
      'The Gospels: Matthew, Mark, Luke, and John',
      'Acts, Romans, Corinthians, and Galatians',
      'Genesis, Exodus, Leviticus, and Numbers',
      'James, Peter, John, and Jude'
    ],
    correctAnswer: 'The Gospels: Matthew, Mark, Luke, and John',
    explanation: 'The four Gospels (Matthew, Mark, Luke, John) provide eyewitness and historical testimonies of Jesus Christ’s earthly ministry, teachings, and salvation work.',
    socraticHint: 'Which four books are known as the Gospels in the New Testament?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-008',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'Why does Psalm 119:11 emphasize memorizing and hiding God’s Word in our hearts?',
    options: [
      'So that we might not sin against God when confronted with temptation',
      'To show off our memory skills in school debates',
      'Because physical Bibles will completely disappear in the future',
      'To pass spelling tests without studying'
    ],
    correctAnswer: 'So that we might not sin against God when confronted with temptation',
    explanation: 'Psalm 119:11 says: "I have hidden your word in my heart that I might not sin against you." Internalized scripture empowers believers to resist moral compromise.',
    socraticHint: 'How does keeping scripture in our minds and hearts help us resist doing wrong?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-009',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'Which New Testament book is classified as the single historical book recording the birth and expansion of the early Church?',
    options: [
      'The Acts of the Apostles',
      'The Book of Revelation',
      'The Epistle to the Romans',
      'The Epistle to the Hebrews'
    ],
    correctAnswer: 'The Acts of the Apostles',
    explanation: 'Acts of the Apostles (written by Luke) documents the outpouring of the Holy Spirit on Pentecost, the preaching of Peter and Paul, and the rapid spread of the Church.',
    socraticHint: 'Which book records what the apostles did after Jesus ascended to heaven?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-010',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'What distinction separates the Major Prophets from the Minor Prophets in the Old Testament?',
    options: [
      'The length of the scrolls and book content, not their spiritual importance',
      'Major Prophets were kings, while Minor Prophets were slaves',
      'Major Prophets performed miracles, while Minor Prophets did not',
      'Minor Prophets are not considered part of inspired scripture'
    ],
    correctAnswer: 'The length of the scrolls and book content, not their spiritual importance',
    explanation: 'The designation "Major" (Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel) and "Minor" (Hosea through Malachi) refers strictly to the length of the writings.',
    socraticHint: 'Is the difference between Major and Minor Prophets based on book length or importance?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-011',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'How should a Christian learner resolve a difficult moral dilemma when pressured by friends to cheat in an exam?',
    options: [
      'By applying biblical truth about honesty, praying for moral courage, and refusing to participate in dishonesty',
      'By agreeing to cheat because everyone else is doing it',
      'By cheating as long as the teacher is not looking',
      'By blaming others if caught cheating'
    ],
    correctAnswer: 'By applying biblical truth about honesty, praying for moral courage, and refusing to participate in dishonesty',
    explanation: 'Scripture teaches that integrity and truthfulness honor God. Believers rely on biblical standards to resist peer pressure, even when it is unpopular.',
    socraticHint: 'How does biblical guidance help you stand firm when friends urge you to do something dishonest?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-012',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l1',
    text: 'In Joshua 1:8, what promise did God give to Joshua concerning meditating on the Book of the Law day and night?',
    options: [
      '"Then you will be prosperous and successful in whatever you do"',
      '"You will never face any battles or difficulties"',
      '"You will become the richest king on earth"',
      '"You will live without needing any sleep"'
    ],
    correctAnswer: '"Then you will be prosperous and successful in whatever you do"',
    explanation: 'Joshua 1:8 instructs Joshua to keep God’s Word on his lips and meditate on it continually, assuring him of divine presence and true spiritual success.',
    socraticHint: 'What blessing does God promise to those who faithfully meditate on and obey His Law?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-013',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'Who was the pioneer German missionary who arrived at Mombasa in 1844 and translated the first portions of scripture into Kiswahili and Kikamba?',
    options: [
      'Dr. Johann Ludwig Krapf',
      'David Livingstone',
      'Lord Delamere',
      'Alexander Mackay'
    ],
    correctAnswer: 'Dr. Johann Ludwig Krapf',
    explanation: 'Dr. Johann Ludwig Krapf of the Church Missionary Society (CMS) arrived in Rabai, Mombasa in 1844, pioneering Bible translation in East Africa into Kiswahili and Kikamba.',
    socraticHint: 'Which CMS missionary pioneer translated the Gospel of Luke at Rabai in the 1840s?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-014',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'What primary role is played by the Bible Society of Kenya (BSK) in our nation?',
    options: [
      'Translating, publishing, and distributing affordable Holy Scriptures in various Kenyan languages',
      'Operating national commercial television stations',
      'Collecting taxes on religious books',
      'Building public road highways across Kenya'
    ],
    correctAnswer: 'Translating, publishing, and distributing affordable Holy Scriptures in various Kenyan languages',
    explanation: 'The Bible Society of Kenya (BSK) is a non-denominational organization dedicated to translating, producing, and distributing scriptures in languages Kenyans understand best.',
    socraticHint: 'What organization in Kenya translates and publishes Bibles in our indigenous mother tongues?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-015',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'Why is it crucial for people to read the Bible in their native mother tongue (heart language)?',
    options: [
      'It communicates God’s message deeply to the heart, preserving cultural identity and ensuring full comprehension',
      'Because God only listens to prayers spoken in local dialects',
      'Because English Bibles have incorrect translations',
      'To prevent people from learning international languages'
    ],
    correctAnswer: 'It communicates God’s message deeply to the heart, preserving cultural identity and ensuring full comprehension',
    explanation: 'Hearing God’s Word in one’s mother tongue allows the Gospel to resonate profoundly with a person’s inner emotions, cultural understanding, and spiritual core.',
    socraticHint: 'Why does reading scriptures in your own mother tongue touch your heart so deeply?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-016',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'How does the Bible Society of Kenya ensure that persons with visual disabilities have access to the Word of God?',
    options: [
      'By publishing complete Bibles in Braille and producing audio Bibles',
      'By telling blind people they do not need scripture',
      'By charging double the price for special editions',
      'By printing Bibles in microscopic font sizes'
    ],
    correctAnswer: 'By publishing complete Bibles in Braille and producing audio Bibles',
    explanation: 'BSK champions inclusive accessibility by producing multi-volume Braille Bibles and audio scriptures for the visually impaired and oral learners.',
    socraticHint: 'What special formats of the Bible are produced for people who cannot see printed letters?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-017',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'Which of the following demonstrates proper physical reverence when handling a printed Bible?',
    options: [
      'Keeping it in a clean, safe place, carrying it carefully, and avoiding placing dirty cups or plates on it',
      'Using it as a doorstop or chair booster',
      'Tearing out empty pages to wrap fried food',
      'Writing rude jokes in the margins'
    ],
    correctAnswer: 'Keeping it in a clean, safe place, carrying it carefully, and avoiding placing dirty cups or plates on it',
    explanation: 'Treating the physical Bible with respect reflects internal reverence for the sacred divine truths contained within its pages.',
    socraticHint: 'How do we show respect for the Holy Book through the way we store and carry it?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-018',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'What major challenge did early Bible translators encounter when translating the scriptures into Kenyan local languages?',
    options: [
      'Finding local vocabulary terms that accurately conveyed abstract biblical concepts like "grace", "salvation", and "holy"',
      'Finding paper to write on in Kenya',
      'The languages of Kenya had no spoken words',
      'Local communities refused to speak with translators'
    ],
    correctAnswer: 'Finding local vocabulary terms that accurately conveyed abstract biblical concepts like "grace", "salvation", and "holy"',
    explanation: 'Translators had to collaborate closely with indigenous linguists to find culturally resonant terms that preserved precise theological meanings.',
    socraticHint: 'Why was it challenging to translate deep theological ideas like "sanctification" and "redemption" into local languages?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-019',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'In which coastal Kenyan town was the historic missionary station of Rabai established by Ludwig Krapf and Johannes Rebmann in 1846?',
    options: [
      'Rabai near Mombasa',
      'Malindi',
      'Lamu Island',
      'Shimoni'
    ],
    correctAnswer: 'Rabai near Mombasa',
    explanation: 'Rabai Mpya (near Mombasa) was established in 1846 as Kenya’s first Christian mission station, housing early schools and the first translation workshops.',
    socraticHint: 'Which historic mission station near Mombasa was founded by Krapf and Rebmann in 1846?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-020',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'What is spiritual reverence when studying the Bible, as opposed to mere physical handling?',
    options: [
      'Approaching scripture with prayer, humility, and an open heart ready to obey God’s commands in daily conduct',
      'Kissing the Bible cover while continuing to live dishonestly',
      'Keeping the Bible locked in a glass box without ever opening it',
      'Memorizing verses solely to argue with and demean others'
    ],
    correctAnswer: 'Approaching scripture with prayer, humility, and an open heart ready to obey God’s commands in daily conduct',
    explanation: 'Spiritual reverence means submitting one’s heart, thoughts, and actions to God’s guidance, being "doers of the word, and not hearers only" (James 1:22).',
    socraticHint: 'What attitude of the heart shows true spiritual reverence when we read God’s word?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-021',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'Which Kenyan language Bible is titled "Biblia ya Kikristo" or "Biblia Takatifu", widely used across East Africa in schools and churches?',
    options: [
      'Kiswahili Bible (Biblia Takatifu)',
      'English Standard Version',
      'Latin Vulgate',
      'King James Version'
    ],
    correctAnswer: 'Kiswahili Bible (Biblia Takatifu)',
    explanation: 'Biblia Takatifu is the widely cherished Kiswahili translation of the Holy Scriptures used by millions across Kenya, Tanzania, and the wider East African region.',
    socraticHint: 'Which national language Bible is titled "Biblia Takatifu"?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-022',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'How did the translation of the Bible into indigenous Kenyan languages help protect local cultural identities and languages from extinction?',
    options: [
      'It produced standardized written orthographies, dictionaries, and literature in native mother tongues',
      'It forced people to forget their native traditions',
      'It replaced all African musical instruments with European pianos',
      'It made it illegal to speak mother tongues at home'
    ],
    correctAnswer: 'It produced standardized written orthographies, dictionaries, and literature in native mother tongues',
    explanation: 'Bible translation preserved African languages by giving them written alphabets, grammars, and printed literature, enriching linguistic heritage.',
    socraticHint: 'How did printing books in native languages help keep those languages alive and strong?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-023',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'What should you do before opening and reading the Bible each day to receive spiritual understanding?',
    options: [
      'Pray for the Holy Spirit to illuminate your understanding and soften your heart to obey',
      'Make sure you have a glass of juice in your hand',
      'Check how many followers you have on social media',
      'Set an alarm to finish reading in less than 30 seconds'
    ],
    correctAnswer: 'Pray for the Holy Spirit to illuminate your understanding and soften your heart to obey',
    explanation: 'Psalm 119:18 models the ideal prayer: "Open my eyes that I may see wonderful things in your law." Spiritual understanding requires prayerful dependence on the Holy Spirit.',
    socraticHint: 'Why is it important to begin your Bible reading with prayer asking God for understanding?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u3-024',
    subStrandId: 'substrand-g6-cre-u3',
    lessonId: 'lesson-g6-cre-u3-l2',
    text: 'In James 1:22, believers are warned against what common mistake regarding the Word of God?',
    options: [
      '"Do not merely listen to the word, and so deceive yourselves. Do what it says"',
      '"Do not buy any books about history"',
      '"Do not pray more than once a day"',
      '"Do not sing songs of praise in public"'
    ],
    correctAnswer: '"Do not merely listen to the word, and so deceive yourselves. Do what it says"',
    explanation: 'James 1:22 insists that hearing or reading scripture without applying it into active moral conduct is self-deception; true faith is expressed through practical obedience.',
    socraticHint: 'What must we do with God’s word instead of just listening and forgetting?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },

  // --- Unit 4: Old Testament Heroes of Faith, Courage & Servant Leadership (q-g6-cre-u4-001 to 024) ---
  {
    id: 'q-g6-cre-u4-001',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'According to Numbers 12:3, what standout character quality distinguished Moses among all the people on earth?',
    options: [
      'Moses was a very humble (meek) man, more humble than anyone else on the face of the earth',
      'Moses was the wealthiest merchant in Egypt',
      'Moses was the fastest runner in the desert',
      'Moses was an angry warrior who loved conquering nations'
    ],
    correctAnswer: 'Moses was a very humble (meek) man, more humble than anyone else on the face of the earth',
    explanation: 'Numbers 12:3 notes that Moses was remarkably meek (humble), leading God’s people without pride and relying on divine power rather than personal ego.',
    socraticHint: 'Which virtue describing humility and gentleness did Moses possess in great measure?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-002',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'How did Moses demonstrate servant leadership when the Israelites sinned by worshiping the golden calf at Mount Sinai (Exodus 32)?',
    options: [
      'He interceded selflessly before God, pleading for the people’s forgiveness and offering his own life for their salvation',
      'He abandoned the Israelites and returned to live in comfort in Midian',
      'He joined them in worshiping the golden idol',
      'He sold the golden calf to buy weapons'
    ],
    correctAnswer: 'He interceded selflessly before God, pleading for the people’s forgiveness and offering his own life for their salvation',
    explanation: 'Moses stood in the gap as an intercessor, praying: "Forgive their sin—but if not, then blot me out of the book you have written" (Exodus 32:32), demonstrating sacrificial love.',
    socraticHint: 'How did Moses plead for his people before God instead of abandoning them to judgment?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-003',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'In the Book of Judges (Judges 4:4-5), where did Prophetess Deborah hold court to administer justice for the Israelites?',
    options: [
      'Under the Palm of Deborah between Ramah and Bethel',
      'Inside Pharaoh’s royal throne room',
      'On a golden ship in the Mediterranean Sea',
      'Behind the gates of Jericho'
    ],
    correctAnswer: 'Under the Palm of Deborah between Ramah and Bethel',
    explanation: 'Judges 4:5 records: "She held court under the Palm of Deborah between Ramah and Bethel in the hill country of Ephraim, and the Israelites went up to her to have their disputes decided."',
    socraticHint: 'Under what famous tree did Deborah sit to judge and guide the people of Israel?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-004',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'When Barak hesitated to lead the army against Sisera without Deborah, what was Deborah’s courageous response (Judges 4:9)?',
    options: [
      '"Certainly I will go with you, but because of the course you are taking, the honor will not be yours; for the Lord will deliver Sisera into the hands of a woman"',
      '"I am too frightened to leave my palm tree"',
      '"You must surrender to King Jabin immediately"',
      '"Let us pay Sisera tribute money so he does not attack"'
    ],
    correctAnswer: '"Certainly I will go with you, but because of the course you are taking, the honor will not be yours; for the Lord will deliver Sisera into the hands of a woman"',
    explanation: 'Deborah exhibited unshakable moral courage, marching to Mount Tabor alongside Barak and prophesying the deliverance accomplished through Jael.',
    socraticHint: 'Did Deborah refuse to go to battle, or did she boldly march alongside the army?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-005',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'What was Gideon doing when the Angel of the Lord first appeared to him and greeted him as a "mighty warrior" (Judges 6:11-12)?',
    options: [
      'Threshing wheat secretly in a winepress to hide it from the Midianites',
      'Leading a parade in the capital city',
      'Sleeping under a tree in the afternoon',
      'Training cavalry horses for chariot battles'
    ],
    correctAnswer: 'Threshing wheat secretly in a winepress to hide it from the Midianites',
    explanation: 'Gideon was hiding in fear inside a winepress to protect grain from Midianite raiders, yet God saw his latent potential and called him to deliver Israel.',
    socraticHint: 'Where was Gideon hiding to thresh wheat from the invading Midianites?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-006',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'Why did God reduce Gideon’s army from 32,000 men down to just 300 men (Judges 7:2)?',
    options: [
      'So that Israel could not boast that her own strength had saved her, but would know the victory belonged to God',
      'Because there were not enough swords and shields for everyone',
      'Because the other soldiers got tired and wanted to go home',
      'Because the Midianite army had only 10 soldiers'
    ],
    correctAnswer: 'So that Israel could not boast that her own strength had saved her, but would know the victory belonged to God',
    explanation: 'God told Gideon that with too many soldiers, Israel would claim credit for the victory. The tiny force of 300 proved that deliverance comes by divine grace.',
    socraticHint: 'Why did God want a small army so Israel wouldn’t boast in its own military might?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-007',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'What unusual "weapons" were Gideon’s 300 soldiers given to surprise and defeat the Midianite camp at night?',
    options: [
      'Trumpets, empty clay jars, and torches hidden inside the jars',
      'Iron swords, bronze bows, and spears',
      'Poisoned arrows and catapults',
      'Heavy wooden shields and battering rams'
    ],
    correctAnswer: 'Trumpets, empty clay jars, and torches hidden inside the jars',
    explanation: 'At Gideon’s signal, the 300 blew their trumpets, smashed their jars, held blazing torches aloft, and shouted: "A sword for the Lord and for Gideon!" throwing the Midianites into chaos.',
    socraticHint: 'What items did Gideon’s soldiers break and blow to create noise and light in the dark?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-008',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'What important leadership lesson can school prefects and monitors learn from the life of Gideon?',
    options: [
      'God can use anyone, regardless of humble background or self-doubt, when they trust and obey Him',
      'Only the tallest and strongest students can ever be leaders',
      'Leaders should bully and intimidate their classmates',
      'Leaders should never ask God for guidance or help'
    ],
    correctAnswer: 'God can use anyone, regardless of humble background or self-doubt, when they trust and obey Him',
    explanation: 'Gideon’s story proves that God’s power is made perfect in human weakness; humble obedience outweighs natural self-confidence.',
    socraticHint: 'How does Gideon’s story encourage pupils who feel shy or insignificant?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-009',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'What title was affectionately given to Deborah by the people of Israel in Judges 5:7 celebrating her protective, nurturing leadership?',
    options: [
      'A Mother in Israel',
      'Queen of the Desert',
      'Empress of Ephraim',
      'Daughter of Thunder'
    ],
    correctAnswer: 'A Mother in Israel',
    explanation: 'Judges 5:7 proclaims: "Villagers in Israel would not fight; they held back until I, Deborah, arose, until I arose, a mother in Israel," honoring her nurturing and courageous care.',
    socraticHint: 'What maternal title of honor was Deborah given in her victory song in Judges 5?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-010',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'When the Israelites urged Gideon to become their king and establish a hereditary dynasty, how did Gideon respond (Judges 8:23)?',
    options: [
      '"I will not rule over you, nor will my son rule over you. The Lord will rule over you"',
      '"Yes, crown me with gold immediately"',
      '"My son will be king, and I will be emperor"',
      '"I will only be king if you give me all your silver"'
    ],
    correctAnswer: '"I will not rule over you, nor will my son rule over you. The Lord will rule over you"',
    explanation: 'Gideon displayed true humility by refusing the monarchy, reminding the people that God alone is their ultimate King and Sovereign Lord.',
    socraticHint: 'Who did Gideon insist was the true ruler of Israel instead of himself?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-011',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'How did Moses react when Joshua complained that Eldad and Medad were prophesying in the camp (Numbers 11:29)?',
    options: [
      'Moses replied: "Are you jealous for my sake? I wish that all the Lord’s people were prophets and that the Lord would put his Spirit on them!"',
      'Moses had Eldad and Medad thrown into prison',
      'Moses stripped them of their leadership robes',
      'Moses demanded an apology in front of the congregation'
    ],
    correctAnswer: 'Moses replied: "Are you jealous for my sake? I wish that all the Lord’s people were prophets and that the Lord would put his Spirit on them!"',
    explanation: 'Moses showed zero jealousy or insecurity, wishing that every single Israelite could experience the fullness of God’s Holy Spirit.',
    socraticHint: 'Did Moses feel jealous about others having spiritual gifts, or did he rejoice and wish everyone had them?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-012',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l1',
    text: 'What lesson in gender equality and Christian leadership does the story of Deborah teach Kenyan learners?',
    options: [
      'Both women and men are called and empowered by God to lead with wisdom, justice, and courage',
      'Only men have the capability to make wise judicial decisions',
      'Women should never speak in public gatherings',
      'Leadership is based solely on physical brute force'
    ],
    correctAnswer: 'Both women and men are called and empowered by God to lead with wisdom, justice, and courage',
    explanation: 'Deborah’s calling demonstrates that God elevates women as spiritual, civic, and military leaders, affirming the equal dignity and leadership potential of girls and boys.',
    socraticHint: 'How does Deborah’s leadership prove that God equips both girls and boys to lead wisely?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-013',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'When David faced the giant Goliath in the Valley of Elah (1 Samuel 17:45), what words revealed the source of his confidence?',
    options: [
      '"You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty"',
      '"I come against you because my armor is made of stronger iron than yours"',
      '"I come because King Saul promised to give me gold and a palace"',
      '"I come because I am the fastest swordsman in Bethlehem"'
    ],
    correctAnswer: '"You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty"',
    explanation: 'David trusted not in human armaments but in the living God of Israel, declaring that the battle belongs to the Lord.',
    socraticHint: 'In whose name did young David confront the giant Goliath?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-014',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'Why did David refuse to strike and kill King Saul when Saul was vulnerable inside the cave at En Gedi (1 Samuel 24:6)?',
    options: [
      'David said: "The Lord forbid that I should lay a hand on my master, because he is the Lord’s anointed"',
      'David forgot his sword in the camp',
      'David was afraid of Saul’s guards who were awake',
      'Saul offered David half his kingdom if he spared him'
    ],
    correctAnswer: 'David said: "The Lord forbid that I should lay a hand on my master, because he is the Lord’s anointed"',
    explanation: 'David demonstrated deep reverence for God’s sovereignty and moral restraint, refusing to take revenge or seize the throne through violence.',
    socraticHint: 'Why did David refuse to harm King Saul even when Saul was hunting him down?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-015',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'What did David do when Prophet Nathan exposed his grave sin regarding Bathsheba and Uriah (2 Samuel 12:13)?',
    options: [
      'David confessed humbly: "I have sinned against the Lord," and penned Psalm 51 in deep repentance',
      'David ordered Nathan to be executed',
      'David denied the accusation and blamed Bathsheba',
      'David resigned from being king and fled the country'
    ],
    correctAnswer: 'David confessed humbly: "I have sinned against the Lord," and penned Psalm 51 in deep repentance',
    explanation: 'Unlike proud leaders who justify their wrongdoing, David accepted prophetic rebuke, owned his guilt, and sought God’s cleansing mercy in genuine brokenness.',
    socraticHint: 'Did David harden his heart or immediately confess and repent of his sin before God?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-016',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'In 1 Kings 3:5, God appeared to young King Solomon in a dream at Gibeon and said: "Ask for whatever you want me to give you." What was Solomon’s request?',
    options: [
      'A discerning heart (wisdom) to govern God’s great people and distinguish between right and wrong',
      'Long life and great personal wealth',
      'The death and destruction of all his political enemies',
      'A palace covered in diamonds and rubies'
    ],
    correctAnswer: 'A discerning heart (wisdom) to govern God’s great people and distinguish between right and wrong',
    explanation: 'Solomon recognized his youth and inexperience ("I am only a little child and do not know how to carry out my duties") and asked for wisdom to serve God’s people justly.',
    socraticHint: 'Did Solomon ask for money and power, or for wisdom to govern God’s people fairly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-017',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'Why was God pleased with Solomon’s prayer for wisdom at Gibeon (1 Kings 3:11-13)?',
    options: [
      'Because he asked for discernment to administer justice rather than selfish riches, long life, or vengeance',
      'Because Solomon asked for the shortest prayer possible',
      'Because Solomon promised to sacrifice 10,000 sheep every day',
      'Because Solomon offered to build God a palace in Egypt'
    ],
    correctAnswer: 'Because he asked for discernment to administer justice rather than selfish riches, long life, or vengeance',
    explanation: 'God was delighted by Solomon’s selfless priority for justice and the welfare of the people; God granted him wisdom, plus wealth and honor.',
    socraticHint: 'Why does God reward leaders who put the needs and justice of the people ahead of personal greed?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-018',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'How did King Solomon settle the dispute between two mothers claiming the same surviving baby (1 Kings 3:16-28)?',
    options: [
      'He ordered the baby to be cut in two with a sword, knowing the true mother would rather give her child away than see him killed',
      'He gave the baby to the oldest woman',
      'He flipped a coin to decide who kept the child',
      'He banished both women from Jerusalem'
    ],
    correctAnswer: 'He ordered the baby to be cut in two with a sword, knowing the true mother would rather give her child away than see him killed',
    explanation: 'Solomon’s wise test exposed genuine maternal love: the real mother pleaded for the child’s life to be spared, proving her true identity.',
    socraticHint: 'How did Solomon reveal the real mother by threatening to divide the infant in two?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-019',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'What tragic moral failure led to Solomon’s spiritual decline later in his reign (1 Kings 11:1-4)?',
    options: [
      'He married many foreign wives who turned his heart away after other idols and pagan gods',
      'He stopped eating kosher food',
      'He gave away the Ark of the Covenant to foreign traders',
      'He forgot how to read the Hebrew language'
    ],
    correctAnswer: 'He married many foreign wives who turned his heart away after other idols and pagan gods',
    explanation: '1 Kings 11 records that in his old age, Solomon compromised his devotion, building pagan altars for foreign deities and failing to remain wholehearted toward God.',
    socraticHint: 'What compromise caused King Solomon’s heart to turn away from God in his later years?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-020',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'What does Jesus Christ teach about leadership in the Kingdom of God in Mark 10:43-45?',
    options: [
      '"Whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all"',
      '"Leaders should boss around other people and make them work"',
      '"Leaders should take all the best food and clothes for themselves"',
      '"Leadership is only for the strongest fighters"'
    ],
    correctAnswer: '"Whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all"',
    explanation: 'Jesus completely overturned worldly concepts of autocratic power, defining true greatness as humble, sacrificial servanthood.',
    socraticHint: 'How does Jesus define greatness in leadership in the Gospel of Mark?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-021',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'How should a Grade 6 class prefect behave toward a student who has made a minor disciplinary mistake?',
    options: [
      'Gently and firmly correct them with kindness, explaining the rule and helping them improve',
      'Scream at them and beat them in front of the whole school',
      'Demand bribes or lunch snacks so as not to report them',
      'Mock them publicly during school assembly'
    ],
    correctAnswer: 'Gently and firmly correct them with kindness, explaining the rule and helping them improve',
    explanation: 'Christian servant leaders correct others with restorative kindness, patience, and fairness, emulating the shepherd heart of Christ.',
    socraticHint: 'Should a good student leader humiliate a classmate or guide them kindly and firmly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-022',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'Why is David described in Acts 13:22 as "a man after God’s own heart"?',
    options: [
      'Because he possessed a willing, humble heart that sought to do all of God’s will and repented when he fell',
      'Because he never made a single mistake in his life',
      'Because he was the tallest warrior in Israel',
      'Because he was the wealthiest king in human history'
    ],
    correctAnswer: 'Because he possessed a willing, humble heart that sought to do all of God’s will and repented when he fell',
    explanation: 'David was not sinless, but his heart was genuinely devoted to God, passionate for worship, quick to repent, and committed to obeying God’s purposes.',
    socraticHint: 'Why did God cherish David’s heart despite David’s human flaws?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-023',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'How did King David demonstrate covenant loyalty and kindness to Jonathan’s crippled son Mephibosheth (2 Samuel 9)?',
    options: [
      'He invited Mephibosheth to eat at the king’s royal table continually and restored all his family’s lands',
      'He banished Mephibosheth to a distant foreign land',
      'He forced Mephibosheth to become a servant in the stables',
      'He ignored Mephibosheth completely'
    ],
    correctAnswer: 'He invited Mephibosheth to eat at the king’s royal table continually and restored all his family’s lands',
    explanation: 'David honored his covenant with his beloved friend Jonathan by welcoming Mephibosheth into the royal palace with dignity, honoring persons with disabilities.',
    socraticHint: 'How did David honor Jonathan’s memory by caring for Mephibosheth at his table?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-cre-g6'
  },
  {
    id: 'q-g6-cre-u4-024',
    subStrandId: 'substrand-g6-cre-u4',
    lessonId: 'lesson-g6-cre-u4-l2',
    text: 'What is the core difference between worldly leadership and biblical servant leadership?',
    options: [
      'Worldly leadership seeks power, personal privilege, and dominance; servant leadership seeks humble service, justice, and uplifting others',
      'Worldly leadership is always honest, while servant leadership is secretive',
      'There is no difference between the two styles',
      'Servant leaders never make any decisions for their followers'
    ],
    correctAnswer: 'Worldly leadership seeks power, personal privilege, and dominance; servant leadership seeks humble service, justice, and uplifting others',
    explanation: 'Worldly power focuses on self-exaltation and controlling others; biblical servant leadership focuses on sacrificially serving the community and honoring God.',
    socraticHint: 'Does biblical servant leadership focus on serving others or lording power over them?',
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
console.log(`Added ${qCount} questions for Units 3 & 4.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 2 of Grade 6 CRE to cbe_database.json!');
