import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Registering Grade 5 Christian Religious Education (la-cre-g5) ---');

// 1. Learning Area
const existingLA = db.learningAreas.find(la => la.id === 'la-cre-g5');
if (!existingLA) {
  db.learningAreas.push({
    id: 'la-cre-g5',
    gradeId: 'grade-5',
    name: 'Christian Religious Education',
    swahiliName: 'Elimu ya Dini ya Kikristo',
    icon: 'church',
    color: '#3B82F6',
    description: 'Deepening biblical literacy, spiritual maturity, moral discernment, environmental stewardship, the life, miracles, parables and sacrificial love of Jesus Christ, and living Christian values of peace, unity, integrity, and servant leadership in Kenya.',
    strandsCount: 4
  });
  console.log('Added la-cre-g5');
} else {
  existingLA.strandsCount = 4;
  console.log('la-cre-g5 already exists, updated');
}

// 2. Add to gameWorlds (world-faith-values)
const faithWorld = db.gameWorlds.find(w => w.id === 'world-faith-values');
if (faithWorld && !faithWorld.learningAreaIds.includes('la-cre-g5')) {
  faithWorld.learningAreaIds.push('la-cre-g5');
  console.log('Added la-cre-g5 to world-faith-values.learningAreaIds');
}

// 3. Strands (all 4 strands for Grade 5 CRE)
const strandsToAdd = [
  {
    id: 'strand-g5-cre-creation',
    learningAreaId: 'la-cre-g5',
    code: 'CRE-G5-STR-01',
    title: 'Creation and the Environment',
    swahiliTitle: 'Uumbaji na Mazingira',
    description: 'Human responsibility in God’s creation, caring for domestic and wild animals, planting indigenous trees, combating pollution, and conserving Kenya’s water towers.',
    icon: 'sun'
  },
  {
    id: 'strand-g5-cre-bible',
    learningAreaId: 'la-cre-g5',
    code: 'CRE-G5-STR-02',
    title: 'The Holy Bible and Biblical Leadership',
    swahiliTitle: 'Biblia Takatifu na Uongozi wa Kibiblia',
    description: 'Structure, divisions, and books of the Old and New Testaments, handling scripture with reverence, and the faith and obedience of Old Testament leaders.',
    icon: 'book-open'
  },
  {
    id: 'strand-g5-cre-jesus',
    learningAreaId: 'la-cre-g5',
    code: 'CRE-G5-STR-03',
    title: 'The Life, Ministry, and Teachings of Jesus Christ',
    swahiliTitle: 'Maisha, Huduma na Mafundisho ya Yesu Kristo',
    description: 'The early life, baptism, and temptations of Jesus; compassionate miracles; kingdom parables; and the passion, crucifixion, resurrection, and Great Commission.',
    icon: 'heart'
  },
  {
    id: 'strand-g5-cre-living',
    learningAreaId: 'la-cre-g5',
    code: 'CRE-G5-STR-04',
    title: 'Christian Living, Moral Values, and Community Stewardship',
    swahiliTitle: 'Maisha ya Kikristo, Maadili na Utumishi wa Jamii',
    description: 'The Holy Spirit and early church fellowship, Christian family values, respecting elders, resisting negative peer influence, caring for the needy and persons with disabilities, and upholding justice, peace, and national unity in Kenya.',
    icon: 'users'
  }
];

strandsToAdd.forEach(strand => {
  const idx = db.strands.findIndex(s => s.id === strand.id);
  if (idx >= 0) {
    db.strands[idx] = strand;
  } else {
    db.strands.push(strand);
    console.log(`Added strand: ${strand.id}`);
  }
});

// 4. Batch 1 Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-cre-u1',
    strandId: 'strand-g5-cre-creation',
    learningAreaId: 'la-cre-g5',
    title: 'Creation, Human Stewardship and Environmental Conservation',
    description: 'Understanding God’s purpose in creating humanity in His image and likeness; human duty as stewards to cultivate, tend, and protect the earth (Genesis 1 & 2); conserving Kenyan flora, fauna, and water catchment towers (Mau Forest, Mount Kenya); combating environmental degradation, plastic pollution, and soil erosion; and demonstrating compassion for domestic livestock and wildlife.',
    cbeCompetency: 'Environmental stewardship, moral accountability, ecological mindfulness, empathy toward living creatures, and community conservation initiative',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g5-cre-u2',
    strandId: 'strand-g5-cre-bible',
    learningAreaId: 'la-cre-g5',
    title: 'The Holy Bible: Structure, Divisions, Translations & Sacred Guidance',
    description: 'Exploring the 66 books of the Holy Bible; differentiating the Old Testament (39 books: Law, History, Poetry, Major Prophets, Minor Prophets) and the New Testament (27 books: Gospels, Acts, Epistles, Revelation); appreciating the role of the Bible Society of Kenya in translating scripture into indigenous Kenyan languages; handling the Bible with reverence; and memorizing key scriptures to guide daily moral decision-making.',
    cbeCompetency: 'Biblical literacy, analytical classification, scriptural reflection, respectful handling of sacred texts, and ethical decision-making',
    estimatedMinutes: 30,
    order: 2
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) {
    db.subStrands[idx] = ss;
  } else {
    db.subStrands.push(ss);
    console.log(`Added sub-strand: ${ss.id}`);
  }
});

// 5. Batch 1 Lessons (Units 1 & 2: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-cre-u1-l1',
    subStrandId: 'substrand-g5-cre-u1',
    title: 'God’s Purpose in Creation and Humanity as Stewards',
    content: 'The Book of Genesis reveals that God is the supreme Creator of the universe. In Genesis chapters 1 and 2, God systematically created light, the sky, dry land, seas, vegetation, the sun, moon, stars, aquatic life, birds, and land animals, declaring everything "good." Finally, God created human beings in His own image and likeness (Genesis 1:26-27), giving them unique dignity, moral consciousness, and spiritual connection with their Creator. Unlike the rest of creation, humans were endowed with intelligence, free will, and the responsibility of stewardship. In Genesis 2:15, God placed man in the Garden of Eden to "cultivate and keep it" (tend and protect it). Christian stewardship means being responsible caretakers, not selfish exploiters. We honor God by preserving life, using resources wisely, and ensuring future generations inherit a fruitful, healthy earth.',
    didYouKnow: 'The theological term "Imago Dei" is Latin for "Image of God," signifying that every human person has inherent worth, sacred dignity, and moral purpose!',
    kenyanContext: 'Grade 5 pupils in Nyeri County established an indigenous tree nursery named "Eden Stewards," raising over 500 cedar and olive seedlings to reforest degraded sections of the Aberdare catchment.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u1-l2',
    subStrandId: 'substrand-g5-cre-u1',
    title: 'Conserving God’s Creation: Protecting Kenya’s Wildlife and Water Towers',
    content: 'God’s creation includes all living things and their natural habitats. In Kenya, God has blessed our country with magnificent biodiversity, fertile highlands, rift valley lakes, savannah wildlife, and five major "water towers"—Mount Kenya, the Aberdare Range, the Mau Forest Complex, Mount Elgon, and the Cherangani Hills. These water towers supply freshwater to our rivers (such as Tana, Athi, Nyando, and Mara), watering our crops, animals, and cities. When people cut down trees carelessly (deforestation), dump plastics into rivers, or poach wildlife, they violate God’s command of stewardship. Proverbs 12:10 teaches, "The righteous care for the needs of their animals." Christians in Kenya actively protect creation by: 1) planting indigenous trees during the rainy seasons; 2) collecting and separating recyclable waste; 3) terracing sloping farms to stop soil erosion; 4) treating domestic animals with compassion; and 5) protecting wetlands and natural water springs.',
    didYouKnow: 'The Mau Forest Complex is East Africa’s largest indigenous montane forest, providing clean water that supports millions of livelihoods and feeds Lake Victoria, Lake Nakuru, and Lake Natron!',
    kenyanContext: 'Nobel Peace Prize laureate Professor Wangari Maathai inspired the Green Belt Movement in Kenya, embodying biblical stewardship by leading communities to plant over 50 million trees to heal degraded land.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u2-l1',
    subStrandId: 'substrand-g5-cre-u2',
    title: 'Structure and Major Divisions of the Holy Bible',
    content: 'The Holy Bible is the sacred, inspired Word of God written by diverse human authors under the divine inspiration of the Holy Spirit over many centuries. The word "Bible" comes from the Greek word "biblia," meaning "books" or "scrolls." The Christian Bible contains 66 books organized into two major testaments (covenants): the Old Testament (39 books) and the New Testament (27 books). The Old Testament was originally written mostly in ancient Hebrew (with some Aramaic) and covers God’s covenant with humanity from Creation through the history of Israel. It is divided into: 1) Law / Pentateuch (5 books: Genesis to Deuteronomy); 2) Historical books (12 books: Joshua to Esther); 3) Poetic and Wisdom books (5 books: Job to Song of Songs); 4) Major Prophets (5 books: Isaiah to Daniel); and 5) Minor Prophets (12 books: Hosea to Malachi). The New Testament was written in Greek and reveals the new covenant through Jesus Christ. It contains: 1) Gospels (4 books: Matthew, Mark, Luke, John); 2) Church History (Acts of the Apostles); 3) Epistles / Letters (21 books: Romans to Jude); and 4) Prophecy (Revelation).',
    didYouKnow: 'The shortest verse in the Holy Bible is John 11:35 ("Jesus wept"), while the longest chapter is Psalm 119 with 176 verses celebrating the wisdom of God’s Word!',
    kenyanContext: 'At the All Saints Cathedral in Nairobi, an antique 1904 leather-bound lectern Bible is preserved in a glass case, representing the heritage of Christian faith across Kenyan history.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u2-l2',
    subStrandId: 'substrand-g5-cre-u2',
    title: 'Reverence for Scripture and Indigenous Kenyan Translations',
    content: 'Because the Bible is the Word of God, Christians treat the physical book and its sacred message with profound respect and reverence. Reverence is shown by storing the Bible in a clean, elevated, and dry place, turning its pages gently with clean hands, reading it prayerfully every day, and most importantly, obeying its moral teachings in daily life (James 1:22). Psalm 119:105 declares, "Your word is a lamp for my feet, a light on my path." For many centuries, the Bible was only available in Hebrew, Greek, and Latin. Today, the Bible Society of Kenya (BSK) works tirelessly to translate the Holy Scriptures into indigenous Kenyan languages—such as Kiswahili, Kikuyu, Dholuo, Luhya, Kalenjin, Kamba, Ekegusii, Maa, Meru, Borana, Turkana, and Rendille. Reading the Bible in one’s mother tongue helps believers understand God’s message intimately in their own cultural context, strengthening faith, family unity, and moral character in our communities.',
    didYouKnow: 'Johann Ludwig Krapf, a missionary in Rabai near Mombasa, was the pioneer translator of parts of the New Testament into Kiswahili in the 1840s!',
    kenyanContext: 'The Bible Society of Kenya, headquartered in Nairobi, launched the complete Rendille Bible in Marsabit County, allowing pastoralist communities to read and sing God’s Word in their native tongue.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) {
    db.lessons[idx] = l;
  } else {
    db.lessons.push(l);
    console.log(`Added lesson: ${l.id}`);
  }
});

// 6. Batch 1 Missions (Missions 49, 50, 51, 52 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-cre-u1-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u1',
    lessonId: 'lesson-g5-cre-u1-l1',
    title: 'Keepers of the Garden Quest',
    description: 'Explore Genesis accounts of creation, discover humanity’s sacred mandate as stewards of the earth, and embrace your calling to care for God’s beautiful world!',
    order: 49,
    orderIndex: 49,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-creation-steward',
    badge: { name: 'Garden Keeper', icon: 'sun' },
    questionIds: [
      'q-g5-cre-u1-001', 'q-g5-cre-u1-002', 'q-g5-cre-u1-003', 'q-g5-cre-u1-004',
      'q-g5-cre-u1-005', 'q-g5-cre-u1-006', 'q-g5-cre-u1-007', 'q-g5-cre-u1-008',
      'q-g5-cre-u1-009', 'q-g5-cre-u1-010', 'q-g5-cre-u1-011', 'q-g5-cre-u1-012'
    ]
  },
  {
    id: 'mission-g5-cre-u1-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u1',
    lessonId: 'lesson-g5-cre-u1-l2',
    title: 'Kenya Water Towers & Wildlife Champions Challenge',
    description: 'Put your Christian faith into environmental action by conserving Kenya’s rivers, protecting indigenous forests, and defending vulnerable wildlife from harm!',
    order: 50,
    orderIndex: 50,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-water-tower-defender',
    badge: { name: 'Water Tower Guardian', icon: 'shield' },
    questionIds: [
      'q-g5-cre-u1-013', 'q-g5-cre-u1-014', 'q-g5-cre-u1-015', 'q-g5-cre-u1-016',
      'q-g5-cre-u1-017', 'q-g5-cre-u1-018', 'q-g5-cre-u1-019', 'q-g5-cre-u1-020',
      'q-g5-cre-u1-021', 'q-g5-cre-u1-022', 'q-g5-cre-u1-023', 'q-g5-cre-u1-024'
    ]
  },
  {
    id: 'mission-g5-cre-u2-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u2',
    lessonId: 'lesson-g5-cre-u2-l1',
    title: 'Sacred Canon & Testament Navigator Quest',
    description: 'Navigate the 66 inspired books of the Holy Bible, master Old and New Testament divisions, and unlock the timeless wisdom of God’s sacred Word!',
    order: 51,
    orderIndex: 51,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-bible-navigator',
    badge: { name: 'Testament Scholar', icon: 'book-open' },
    questionIds: [
      'q-g5-cre-u2-001', 'q-g5-cre-u2-002', 'q-g5-cre-u2-003', 'q-g5-cre-u2-004',
      'q-g5-cre-u2-005', 'q-g5-cre-u2-006', 'q-g5-cre-u2-007', 'q-g5-cre-u2-008',
      'q-g5-cre-u2-009', 'q-g5-cre-u2-010', 'q-g5-cre-u2-011', 'q-g5-cre-u2-012'
    ]
  },
  {
    id: 'mission-g5-cre-u2-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u2',
    lessonId: 'lesson-g5-cre-u2-l2',
    title: 'Lamp Unto My Feet Scripture & Translation Challenge',
    description: 'Discover how the Bible was translated into Kenyan indigenous tongues, practice respectful scripture handling, and apply God’s word in daily ethical choices!',
    order: 52,
    orderIndex: 52,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-lamp-unto-my-feet',
    badge: { name: 'Light Bearer', icon: 'zap' },
    questionIds: [
      'q-g5-cre-u2-013', 'q-g5-cre-u2-014', 'q-g5-cre-u2-015', 'q-g5-cre-u2-016',
      'q-g5-cre-u2-017', 'q-g5-cre-u2-018', 'q-g5-cre-u2-019', 'q-g5-cre-u2-020',
      'q-g5-cre-u2-021', 'q-g5-cre-u2-022', 'q-g5-cre-u2-023', 'q-g5-cre-u2-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) {
    db.missions[idx] = m;
  } else {
    db.missions.push(m);
    console.log(`Added mission: ${m.id}`);
  }
});

// 7. Batch 1 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 1 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u1-001',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'According to Genesis 1:26-27, in whose image and likeness were human beings created by God?',
    text: 'According to Genesis 1:26-27, in whose image and likeness were human beings created by God?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In the image and likeness of God',
      'In the likeness of powerful sea creatures',
      'In the image of towering cedar trees',
      'In the likeness of celestial stars and planets'
    ],
    correctAnswer: 'In the image and likeness of God',
    explanation: 'The biblical creation account in Genesis 1:26-27 explicitly states that God made humanity in His own image and likeness, bestowing upon human beings unique spiritual dignity, reason, and moral responsibility.',
    socraticHint: 'Which divine being said, "Let us make mankind in our image, in our likeness"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-002',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'What special responsibility did God give to human beings in the Garden of Eden according to Genesis 2:15?',
    text: 'What special responsibility did God give to human beings in the Garden of Eden according to Genesis 2:15?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To cultivate and keep (tend and protect) the garden',
      'To exhaust all natural resources as quickly as possible',
      'To abandon the garden and live in desert caves',
      'To burn down the trees to build stone towers'
    ],
    correctAnswer: 'To cultivate and keep (tend and protect) the garden',
    explanation: 'Genesis 2:15 records that the Lord God placed humanity in the Garden of Eden to work it and take care of it, establishing the foundational principle of environmental stewardship.',
    socraticHint: 'Did God command humans to destroy the garden or to nurture and protect it carefully?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-003',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'What does the term "Christian stewardship" mean regarding our relationship with the natural environment?',
    text: 'What does the term "Christian stewardship" mean regarding our relationship with the natural environment?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Being responsible, caring managers of God’s creation',
      'Claiming total ownership of the earth to exploit it for money',
      'Ignoring pollution because nature cleans itself automatically',
      'Prioritizing factory profits over clean air and clean drinking water'
    ],
    correctAnswer: 'Being responsible, caring managers of God’s creation',
    explanation: 'A steward is a trusted manager who looks after another person’s property. Christian stewardship acknowledges that the earth belongs to God (Psalm 24:1) and humans are entrusted to manage it responsibly.',
    socraticHint: 'When someone manages property on behalf of the real owner, what kind of care and accountability do they owe?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-004',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'How does being created in the "image of God" influence how Grade 5 learners should treat other people?',
    text: 'How does being created in the "image of God" influence how Grade 5 learners should treat other people?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By treating every person with respect, love, and equal dignity',
      'By looking down on children from poorer backgrounds',
      'By only showing kindness to people from one’s own ethnic group',
      'By mocking classmates who have physical or learning disabilities'
    ],
    correctAnswer: 'By treating every person with respect, love, and equal dignity',
    explanation: 'Because every human person is created in God’s image, all human life possesses sacred dignity. Christians are called to love, respect, and value every individual regardless of wealth, background, or physical ability.',
    socraticHint: 'If every human being reflects God’s divine image, how should we value their worth and treat them in school?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-005',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'In Genesis 1, what repetitive phrase did God declare after observing each stage of His creation?',
    text: 'In Genesis 1, what repetitive phrase did God declare after observing each stage of His creation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'God saw that it was good',
      'God saw that it was incomplete and faulty',
      'God noticed that humans would soon ruin it',
      'God saw that nature was completely worthless'
    ],
    correctAnswer: 'God saw that it was good',
    explanation: 'Throughout the six days of creation in Genesis 1, God evaluated His work and saw that it was "good," and upon creating humanity on the sixth day, He saw that it was "very good" (Genesis 1:31).',
    socraticHint: 'What positive word does Genesis 1 repeat when God examines the light, seas, plants, and animals?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-006',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Which of the following actions at school best demonstrates the Christian principle of stewardship over physical resources?',
    text: 'Which of the following actions at school best demonstrates the Christian principle of stewardship over physical resources?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Turning off running water taps and caring for textbooks so others can use them',
      'Writing graffiti on newly painted classroom walls and school desks',
      'Throwing plastic juice bottles across the playing field after break time',
      'Leaving school lights on in empty classrooms throughout the weekend'
    ],
    correctAnswer: 'Turning off running water taps and caring for textbooks so others can use them',
    explanation: 'Stewardship involves preserving and managing resources responsibly. Conserving water and taking good care of shared school learning materials demonstrates respect for God-given resources and community welfare.',
    socraticHint: 'Which option shows careful preservation and thoughtful conservation of school facilities and resources?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-007',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'What fundamental truth about God’s ownership of the earth is taught in Psalm 24:1?',
    text: 'What fundamental truth about God’s ownership of the earth is taught in Psalm 24:1?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The earth is the Lord’s, and everything in it, the world and all who live in it',
      'The earth belongs completely to whoever buys title deeds at the market',
      'The earth belongs only to wild animals and has no spiritual purpose',
      'The earth is an accidental creation without any supreme ruler'
    ],
    correctAnswer: 'The earth is the Lord’s, and everything in it, the world and all who live in it',
    explanation: 'Psalm 24:1 states: "The earth is the Lord’s, and everything in it, the world, and all who live in it." This reminds believers that God is the true sovereign owner of all creation.',
    socraticHint: 'According to King David in Psalm 24, whose possession is the entire planet and its inhabitants?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-008',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'A farmer in Murang’a decides to cut down all riverbank trees and cultivate up to the water’s edge. How does this conflict with Christian stewardship?',
    text: 'A farmer in Murang’a decides to cut down all riverbank trees and cultivate up to the water’s edge. How does this conflict with Christian stewardship?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It causes riverbank soil erosion and pollutes drinking water downstream for other families',
      'It shows extreme wisdom because trees consume too much river water',
      'It obeys Genesis commands by eliminating useless indigenous wild plants',
      'It guarantees that fish in the river will grow twice as fast without shade'
    ],
    correctAnswer: 'It causes riverbank soil erosion and pollutes drinking water downstream for other families',
    explanation: 'Christian stewardship requires protecting riparian land to prevent soil erosion and keep downstream water clean. Destroying riparian vegetation harms the ecosystem and deprives neighbors of clean water.',
    socraticHint: 'What happens to the soil and downstream communities when protective vegetation along riverbanks is removed?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-009',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'How did God provide for the nourishment of human beings and land animals in Genesis 1:29-30?',
    text: 'How did God provide for the nourishment of human beings and land animals in Genesis 1:29-30?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By providing every seed-bearing plant and fruit-bearing tree as food',
      'By instructing them to manufacture chemical food pills in factories',
      'By allowing humans to consume soil and rocks from river beds',
      'By withholding all plants until humans learned to irrigate fields'
    ],
    correctAnswer: 'By providing every seed-bearing plant and fruit-bearing tree as food',
    explanation: 'Genesis 1:29-30 states that God gave every seed-bearing plant on the face of the whole earth and every tree with fruit with seed in it for food, showing God’s loving provision for living creatures.',
    socraticHint: 'What natural living provision did God establish on earth for food during the creation week?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-010',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Why did God rest on the seventh day after finishing creation in Genesis 2:1-3?',
    text: 'Why did God rest on the seventh day after finishing creation in Genesis 2:1-3?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To bless and sanctify the seventh day as a day of rest and worship (Sabbath)',
      'Because God ran out of energy and could not create anything more',
      'Because God was discouraged by how the animals were behaving',
      'To show that work is an evil activity that should be avoided forever'
    ],
    correctAnswer: 'To bless and sanctify the seventh day as a day of rest and worship (Sabbath)',
    explanation: 'God did not rest because of exhaustion; God is almighty and never grows weary (Isaiah 40:28). He rested to set a divine pattern of rest, blessing the seventh day and making it holy for worship and renewal.',
    socraticHint: 'Did God run out of power, or did He set a holy rhythm of rest and dedication for humanity to follow?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-011',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'When pupils notice that tap water at school is running continuously into the mud, what is their Christian moral duty?',
    text: 'When pupils notice that tap water at school is running continuously into the mud, what is their Christian moral duty?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Immediately close the tap tightly and report any leak to the school caretaker',
      'Walk past quickly pretending not to see it because it is not their home tap',
      'Splash the wasting water on fellow classmates to make mud games',
      'Open the tap fully so the water runs out faster and stops making noise'
    ],
    correctAnswer: 'Immediately close the tap tightly and report any leak to the school caretaker',
    explanation: 'Water is a precious, life-giving gift from God. Preventing wastage through prompt action shows practical Christian stewardship and love for the community.',
    socraticHint: 'What immediate responsible action stops the loss of precious drinking water?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-012',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Which statement best contrasts human beings with all other earthly creatures in God’s creation design?',
    text: 'Which statement best contrasts human beings with all other earthly creatures in God’s creation design?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Humans possess a moral conscience, free will, and spiritual fellowship with God',
      'Humans are physically stronger and faster than all wild animals on earth',
      'Humans do not require water, air, or sunlight to survive on the planet',
      'Humans were created without any responsibility to care for living organisms'
    ],
    correctAnswer: 'Humans possess a moral conscience, free will, and spiritual fellowship with God',
    explanation: 'Human beings are uniquely made in God’s image, giving them a spiritual soul, moral conscience, ability to reason, and the capacity to worship and enter into a personal relationship with God.',
    socraticHint: 'What spiritual and moral qualities make humans accountable to God in a way animals are not?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },

  // ==========================================
  // Unit 1 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u1-013',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Which of the following is one of Kenya’s five major "water towers" that Christians are called to conserve?',
    text: 'Which of the following is one of Kenya’s five major "water towers" that Christians are called to conserve?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Mau Forest Complex',
      'The Chalbi Desert',
      'The Nyika Plateau',
      'The Kano Plains'
    ],
    correctAnswer: 'The Mau Forest Complex',
    explanation: 'Kenya’s five major water towers are the Mau Forest Complex, Mount Kenya, the Aberdare Range, Mount Elgon, and the Cherangani Hills. They supply vital water catchments across the nation.',
    socraticHint: 'Which vast highland indigenous forest in the Rift Valley serves as a primary catchment area for several Kenyan rivers?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-014',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'According to Proverbs 12:10, how does a righteous person treat their domestic animals?',
    text: 'According to Proverbs 12:10, how does a righteous person treat their domestic animals?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A righteous person cares for the needs and well-being of their animals',
      'A righteous person overburdens their donkey without water until it collapses',
      'A righteous person abandons sick cattle in the road to fend for themselves',
      'A righteous person starves poultry to maximize egg production profits'
    ],
    correctAnswer: 'A righteous person cares for the needs and well-being of their animals',
    explanation: 'Proverbs 12:10 says: "The righteous care for the needs of their animals, but the kindest acts of the wicked are cruel." God expects believers to be compassionate caretakers of domestic animals.',
    socraticHint: 'Does God’s Word praise compassion or cruelty when caring for donkeys, cows, and pets?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-015',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'A Christian youth fellowship in Nakuru organizes a tree-planting day. Why is planting indigenous trees considered an act of faith and love?',
    text: 'A Christian youth fellowship in Nakuru organizes a tree-planting day. Why is planting indigenous trees considered an act of faith and love?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It restores God’s creation, purifies air, and ensures rainfall and water for future generations',
      'It allows church members to show off their new gardening boots on social media',
      'It makes sure that wild animals will have fewer places to hide and be captured',
      'It generates immediate cash prizes from international commercial timber companies'
    ],
    correctAnswer: 'It restores God’s creation, purifies air, and ensures rainfall and water for future generations',
    explanation: 'Planting trees restores damaged habitats, prevents desertification, attracts rainfall, and purifies the air. It is a selfless act of love for our neighbors and future generations, honoring God’s creation.',
    socraticHint: 'How does reforesting degraded ground demonstrate selfless service to God’s environment and fellow citizens?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-016',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'How can Grade 5 learners in Kisumu actively practice environmental stewardship around Lake Victoria?',
    text: 'How can Grade 5 learners in Kisumu actively practice environmental stewardship around Lake Victoria?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Participating in beach clean-ups to remove plastic waste and avoid dumping trash into the lake',
      'Throwing broken glass and plastic polythene bags into the lake waters during boat rides',
      'Catching juvenile fingerling fish in prohibited breeding bays for personal fun',
      'Washing fuel trucks directly along the lake shoreline to save domestic tap water'
    ],
    correctAnswer: 'Participating in beach clean-ups to remove plastic waste and avoid dumping trash into the lake',
    explanation: 'Keeping lake shorelines clean from plastics protects aquatic life like tilapia and Nile perch from ingesting microplastics and preserves freshwater quality for the community.',
    socraticHint: 'Which activity protects lake water purity and fish breeding habitats from pollution?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-017',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'What negative spiritual attitude is demonstrated when a person engages in illegal poaching or destructive logging in Kenyan forests?',
    text: 'What negative spiritual attitude is demonstrated when a person engages in illegal poaching or destructive logging in Kenyan forests?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Greed and selfish disregard for God’s created order and community welfare',
      'Sacrificial humility and deep dedication to church principles',
      'Obedience to biblical principles of sharing communal property',
      'Courageous leadership in developing rural industrial infrastructure'
    ],
    correctAnswer: 'Greed and selfish disregard for God’s created order and community welfare',
    explanation: 'Illegal logging and poaching stem from greed, putting personal enrichment above respect for God’s handiwork, Kenyan wildlife laws, and the well-being of future generations.',
    socraticHint: 'Does destroying protected forests for quick illegal gain stem from godly humility or selfish greed?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-018',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Which biblical passage reminds believers that all creatures wait upon God for their food and preservation?',
    text: 'Which biblical passage reminds believers that all creatures wait upon God for their food and preservation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Psalm 104:27-28',
      'Leviticus 1:1-2',
      'Esther 3:5-6',
      '1 Chronicles 1:1'
    ],
    correctAnswer: 'Psalm 104:27-28',
    explanation: 'Psalm 104:27-28 declares of all living creatures: "All creatures look to you to give them their food at the proper time. When you give it to them, they gather it up; when you open your hand, they are satisfied with good things."',
    socraticHint: 'Which beautiful psalm celebrating creation describes animals depending on God’s open hand for food?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-019',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'When Peter sees a neighbor beating an injured donkey overloaded with heavy sacks of maize, what is the most Christ-like response?',
    text: 'When Peter sees a neighbor beating an injured donkey overloaded with heavy sacks of maize, what is the most Christ-like response?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Calmly speak to the neighbor, offer to help lighten the load, and provide water for the donkey',
      'Join the neighbor in beating the animal so it walks faster to the market',
      'Laugh loudly at the donkey and take entertaining videos for classmates',
      'Throw sharp stones at both the donkey and the neighbor to chase them away'
    ],
    correctAnswer: 'Calmly speak to the neighbor, offer to help lighten the load, and provide water for the donkey',
    explanation: 'Christians are called to be peacemakers and advocates of mercy. Helping reduce an overburdened animal’s suffering reflects Proverbs 12:10 and God’s compassion toward all living creatures.',
    socraticHint: 'How does offering practical help and showing mercy to an exhausted working animal reflect Christ’s heart?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-020',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Why should Kenyan Christians avoid burning dry plastic waste in open fires at home or school?',
    text: 'Why should Kenyan Christians avoid burning dry plastic waste in open fires at home or school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Burning plastics releases toxic smoke that damages respiratory health and pollutes God’s atmosphere',
      'Plastic smoke attracts harmful locust swarms from neighboring deserts',
      'Open fires of plastic cause rainstorms that flood dry savannah regions',
      'Burnt plastics cause wild birds to sing in completely different musical pitches'
    ],
    correctAnswer: 'Burning plastics releases toxic smoke that damages respiratory health and pollutes God’s atmosphere',
    explanation: 'Burning plastics emits hazardous chemicals like dioxins and furans that harm human lungs and pollute the environment. Proper disposal and recycling uphold Christian duty to protect community health.',
    socraticHint: 'What poisonous impact does burning plastic produce on the air breathed by children, elders, and neighbors?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-021',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'How did Kenyan environmentalist Professor Wangari Maathai exemplify biblical stewardship in our nation?',
    text: 'How did Kenyan environmentalist Professor Wangari Maathai exemplify biblical stewardship in our nation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By mobilizing rural women to plant over 50 million trees and defending Karura Forest from destruction',
      'By advocating for all Kenyan forests to be cleared to construct tall apartment buildings',
      'By encouraging imported plastic bags to replace traditional woven sisal baskets',
      'By advising farmers never to dig contours or trenches on hilly agricultural land'
    ],
    correctAnswer: 'By mobilizing rural women to plant over 50 million trees and defending Karura Forest from destruction',
    explanation: 'Professor Wangari Maathai founded the Green Belt Movement, courageously defending public green spaces like Karura Forest and Uhuru Park in Nairobi, inspiring millions to care for God’s creation.',
    socraticHint: 'Which legendary Kenyan Nobel laureate led nationwide grassroots tree-planting to restore degraded soils?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-022',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'In Luke 12:6, how did Jesus illustrate God’s intimate care for even the smallest and humblest creatures?',
    text: 'In Luke 12:6, how did Jesus illustrate God’s intimate care for even the smallest and humblest creatures?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By pointing out that not one common sparrow is forgotten in God’s sight',
      'By explaining that lions are the only animals God pays attention to',
      'By declaring that birds have no value in the Kingdom of Heaven',
      'By instructing disciples to trap and cage wild birds for sport'
    ],
    correctAnswer: 'By pointing out that not one common sparrow is forgotten in God’s sight',
    explanation: 'In Luke 12:6, Jesus asked: "Are not five sparrows sold for two pennies? Yet not one of them is forgotten by God." Jesus showed that God cares for every single humble creature in His world.',
    socraticHint: 'Which small, inexpensive bird did Jesus mention to show that God forgets none of His creations?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-023',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'A school in Machakos experiences acute water shortages during dry months. How can the school community apply Christian stewardship to harvest water?',
    text: 'A school in Machakos experiences acute water shortages during dry months. How can the school community apply Christian stewardship to harvest water?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Installing roof gutters and water tanks to harvest rainwater during the rains for dry seasons',
      'Waiting until all boreholes dry up and closing the school indefinitely',
      'Selling school desks to purchase expensive bottled water from distant towns',
      'Diverting dirty runoff water directly into the school kitchen cooking pots'
    ],
    correctAnswer: 'Installing roof gutters and water tanks to harvest rainwater during the rains for dry seasons',
    explanation: 'Rainwater harvesting using gutters and storage tanks utilizes God’s gift of rain wisely, preventing water scarcity during dry seasons and protecting the health and dignity of learners.',
    socraticHint: 'How can a school capture and store free rain poured from heaven for future use in dry seasons?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },
  {
    id: 'q-g5-cre-u1-024',
    subStrandId: 'substrand-g5-cre-u1',
    prompt: 'Which of the following environmental crises represents a failure of human stewardship, and what is the Christian solution?',
    text: 'Which of the following environmental crises represents a failure of human stewardship, and what is the Christian solution?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Deforestation causing drought; solved by collective tree planting, protection of water towers, and renewable energy',
      'Natural solar eclipses; solved by cutting down ancient cedar trees across Kenya',
      'Ocean tides rising and falling; solved by draining freshwater rivers into valleys',
      'Seasonal bird migrations; solved by shooting migratory birds near lake wetlands'
    ],
    correctAnswer: 'Deforestation causing drought; solved by collective tree planting, protection of water towers, and renewable energy',
    explanation: 'Deforestation is a direct result of human greed and mismanagement that disrupts rainfall patterns and causes desertification. Christian stewardship responds by reforesting, conserving water towers, and using sustainable energy.',
    socraticHint: 'Which widespread environmental problem results from excessive tree felling, and what restorative action reverses it?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U1'
  },

  // ==========================================
  // Unit 2 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u2-001',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'How many total books are contained in the standard Protestant Holy Bible used in Kenyan primary schools?',
    text: 'How many total books are contained in the standard Protestant Holy Bible used in Kenyan primary schools?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '66 books',
      '39 books',
      '27 books',
      '100 books'
    ],
    correctAnswer: '66 books',
    explanation: 'The standard Holy Bible contains 66 books in total, composed of 39 books in the Old Testament and 27 books in the New Testament.',
    socraticHint: 'What is the sum of the 39 books of the Old Testament and the 27 books of the New Testament?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-002',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'How many books are in the Old Testament, and what is its first book?',
    text: 'How many books are in the Old Testament, and what is its first book?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '39 books, beginning with Genesis',
      '27 books, beginning with Matthew',
      '66 books, beginning with Exodus',
      '12 books, beginning with Joshua'
    ],
    correctAnswer: '39 books, beginning with Genesis',
    explanation: 'The Old Testament consists of 39 books, and Genesis is the first book, recording the creation of the heavens and the earth and God’s covenant with humanity.',
    socraticHint: 'Which foundational book comes right at the beginning of the 39 Old Testament books?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-003',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'What are the first five books of the Old Testament collectively known as?',
    text: 'What are the first five books of the Old Testament collectively known as?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Books of Law or Pentateuch (Torah)',
      'The Major Prophets',
      'The Epistles or Letters',
      'The Poetic and Wisdom Books'
    ],
    correctAnswer: 'The Books of Law or Pentateuch (Torah)',
    explanation: 'Genesis, Exodus, Leviticus, Numbers, and Deuteronomy are known as the Books of Law, the Pentateuch (Greek for "five scrolls"), or the Torah in Hebrew, associated with Moses.',
    socraticHint: 'Which group name refers to the five books containing the moral and ceremonial laws given to Moses?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-004',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which of the following is an example of an Old Testament Historical Book?',
    text: 'Which of the following is an example of an Old Testament Historical Book?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Joshua',
      'Proverbs',
      'Isaiah',
      'Galatians'
    ],
    correctAnswer: 'Joshua',
    explanation: 'The Old Testament Historical Books (12 books from Joshua to Esther) chronicle the historical journey of the Israelites, including the conquest of Canaan led by Joshua.',
    socraticHint: 'Which leader succeeded Moses and has an Old Testament historical book bearing his name?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-005',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which group of books includes Job, Psalms, Proverbs, Ecclesiastes, and the Song of Songs?',
    text: 'Which group of books includes Job, Psalms, Proverbs, Ecclesiastes, and the Song of Songs?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Poetic and Wisdom Books',
      'The Four Gospels',
      'The Minor Prophets',
      'The Pastoral Epistles'
    ],
    correctAnswer: 'Poetic and Wisdom Books',
    explanation: 'These 5 books use Hebrew poetic structure and practical wisdom literature to explore faith, praise, suffering, moral decisions, and deep reverence for God.',
    socraticHint: 'Which category title describes books filled with sacred songs, wise sayings, and philosophical reflections on life?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-006',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Why are prophets like Isaiah, Jeremiah, and Ezekiel categorized as "Major Prophets"?',
    text: 'Why are prophets like Isaiah, Jeremiah, and Ezekiel categorized as "Major Prophets"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Their prophetic books are longer in length and volume than those of the Minor Prophets',
      'They were physically older and taller than all the other prophets in Israel',
      'Their prophecies were considered much more important by God than other messages',
      'They were the only prophets who served as military generals in the army'
    ],
    correctAnswer: 'Their prophetic books are longer in length and volume than those of the Minor Prophets',
    explanation: 'The distinction between "Major" and "Minor" prophets refers strictly to the length of their preserved writings, not their spiritual importance or status before God.',
    socraticHint: 'Does the label "major" describe the physical length and volume of their scrolls or their spiritual rank?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-007',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'How many books are in the New Testament, and what is its concluding prophetic book?',
    text: 'How many books are in the New Testament, and what is its concluding prophetic book?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '27 books, ending with Revelation',
      '39 books, ending with Malachi',
      '50 books, ending with Jude',
      '14 books, ending with Hebrews'
    ],
    correctAnswer: '27 books, ending with Revelation',
    explanation: 'The New Testament contains 27 books, and Revelation (Apocalypse) is the final book of prophecy, written by the Apostle John on the island of Patmos.',
    socraticHint: 'What is the very last book of the 27 books in the New Testament called?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-008',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which four New Testament books record the life, miracles, ministry, death, and resurrection of Jesus Christ?',
    text: 'Which four New Testament books record the life, miracles, ministry, death, and resurrection of Jesus Christ?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Matthew, Mark, Luke, and John (The Gospels)',
      'Acts, Romans, Corinthians, and Galatians',
      'Genesis, Exodus, Leviticus, and Numbers',
      'Timothy, Titus, Philemon, and Hebrews'
    ],
    correctAnswer: 'Matthew, Mark, Luke, and John (The Gospels)',
    explanation: 'The four Gospels—Matthew, Mark, Luke, and John—form the heart of the New Testament, providing four complementary accounts of the life, teachings, death, and resurrection of Jesus Christ.',
    socraticHint: 'Which four biographical books at the beginning of the New Testament are known as the Gospels?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-009',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which New Testament book is unique because it serves as the single historical record of the Early Church after Jesus ascended?',
    text: 'Which New Testament book is unique because it serves as the single historical record of the Early Church after Jesus ascended?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Acts of the Apostles',
      'The Epistle to the Romans',
      'The Gospel of Mark',
      'The Book of Revelation'
    ],
    correctAnswer: 'Acts of the Apostles',
    explanation: 'The Acts of the Apostles, written by Luke, is the sole historical book of the New Testament. It records the coming of the Holy Spirit on Pentecost and the growth of the early Christian Church.',
    socraticHint: 'Which book chronicles the actions and missionary journeys of the apostles like Peter and Paul?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-0010',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'What was the primary purpose of the Epistles (letters) written by Paul, Peter, and other apostles in the New Testament?',
    text: 'What was the primary purpose of the Epistles (letters) written by Paul, Peter, and other apostles in the New Testament?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To encourage, instruct, and guide early churches in Christian living and sound doctrine',
      'To demand taxes and financial tributes on behalf of the Roman emperor',
      'To share secret recipes for unleavened bread and Mediterranean olive dishes',
      'To record mathematical formulas for measuring stone pillars in synagogues'
    ],
    correctAnswer: 'To encourage, instruct, and guide early churches in Christian living and sound doctrine',
    explanation: 'The Epistles were written to guide, correct, and encourage new Christian congregations in various cities, addressing practical moral challenges and explaining faith in Jesus Christ.',
    socraticHint: 'Why did apostolic leaders send pastoral letters to early Christian communities in Rome, Corinth, and Ephesus?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-011',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Grace wants to find a book in the Bible that offers practical short sayings on honesty, hard work, and wisdom. Which book should she turn to?',
    text: 'Grace wants to find a book in the Bible that offers practical short sayings on honesty, hard work, and wisdom. Which book should she turn to?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Book of Proverbs',
      'The Book of Leviticus',
      'The Book of Lamentations',
      'The Book of Numbers'
    ],
    correctAnswer: 'The Book of Proverbs',
    explanation: 'The Book of Proverbs is a collection of inspired wisdom sayings primarily written by King Solomon, giving practical moral guidance on honesty, diligence, speech, and the fear of the Lord.',
    socraticHint: 'Which Old Testament wisdom book is famous for short, memorable guidelines on righteous daily living?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-012',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'How do the Old Testament and New Testament complement each other in God’s plan of salvation?',
    text: 'How do the Old Testament and New Testament complement each other in God’s plan of salvation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Old Testament points forward with covenants and prophecies that are fulfilled by Jesus Christ in the New Testament',
      'The New Testament completely cancels out and proves that the Old Testament was totally false',
      'They were written for two completely different gods who had opposing beliefs about humanity',
      'The Old Testament is for children while the New Testament is strictly reserved for ordained clergy'
    ],
    correctAnswer: 'The Old Testament points forward with covenants and prophecies that are fulfilled by Jesus Christ in the New Testament',
    explanation: 'Saint Augustine famously observed: "The New Testament lies hidden in the Old, and the Old is unveiled in the New." The Old Testament prepares the way and points toward Christ, who fulfills God’s promises in the New Testament.',
    socraticHint: 'How does the arrival of Jesus in the New Testament connect with the promises and prophecies of the Old Testament?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },

  // ==========================================
  // Unit 2 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u2-013',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'What does 2 Timothy 3:16 state about the origin and authority of the Holy Scriptures?',
    text: 'What does 2 Timothy 3:16 state about the origin and authority of the Holy Scriptures?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness',
      'Scripture was written by kings solely to collect taxes from poor citizens',
      'The Bible contains human opinions that have no relevance to moral decisions',
      'Only the Ten Commandments were inspired while the rest is mere human folklore'
    ],
    correctAnswer: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness',
    explanation: '2 Timothy 3:16 declares: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness." This affirms the divine inspiration and moral authority of the Bible.',
    socraticHint: 'What special biblical term in 2 Timothy indicates that God inspired the human authors of the Bible?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-014',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'In Psalm 119:105, what powerful metaphor is used to describe God’s Word in our everyday journey?',
    text: 'In Psalm 119:105, what powerful metaphor is used to describe God’s Word in our everyday journey?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Your word is a lamp for my feet, a light on my path',
      'Your word is an iron chain that ties our feet',
      'Your word is a thick dark fog over the hills',
      'Your word is a noisy trumpet in the desert'
    ],
    correctAnswer: 'Your word is a lamp for my feet, a light on my path',
    explanation: 'Psalm 119:105 says: "Your word is a lamp for my feet, a light on my path." Scripture guides believers, illuminating the right, ethical path in life and dispelling moral darkness.',
    socraticHint: 'Which familiar verse compares scripture to a light showing where to step on a dark road?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-015',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which organization in Kenya is officially dedicated to translating, publishing, and distributing the Holy Bible in indigenous languages?',
    text: 'Which organization in Kenya is officially dedicated to translating, publishing, and distributing the Holy Bible in indigenous languages?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Bible Society of Kenya (BSK)',
      'The Kenya Wildlife Service (KWS)',
      'The National Environmental Management Authority (NEMA)',
      'The Kenya National Highways Authority (KeNHA)'
    ],
    correctAnswer: 'The Bible Society of Kenya (BSK)',
    explanation: 'The Bible Society of Kenya (BSK) is a Christian non-governmental organization serving churches by translating, publishing, and distributing the Holy Scriptures in languages Kenyans understand best.',
    socraticHint: 'Which national faith organization bears the words "Bible Society" in its title?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-016',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Why is it important to translate the Bible into indigenous Kenyan languages like Kikuyu, Dholuo, Kalenjin, Kamba, and Rendille?',
    text: 'Why is it important to translate the Bible into indigenous Kenyan languages like Kikuyu, Dholuo, Kalenjin, Kamba, and Rendille?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'So that people can hear, understand, and experience God’s Word deeply in their heart language',
      'To prevent people from learning national and international languages like English and Kiswahili',
      'Because the original English version of the Bible had too many spelling mistakes',
      'So that books can only be read by village elders and hidden from school children'
    ],
    correctAnswer: 'So that people can hear, understand, and experience God’s Word deeply in their heart language',
    explanation: 'Reading the Bible in one’s mother tongue allows individuals to connect intimately with God’s truth, understanding theological concepts clearly in words and idioms that resonate with their culture.',
    socraticHint: 'How does reading sacred scripture in your native mother tongue help you understand God’s message more deeply?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-017',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which early missionary in Rabai, Mombasa pioneered translating portions of the Christian scriptures into Kiswahili in the 1840s?',
    text: 'Which early missionary in Rabai, Mombasa pioneered translating portions of the Christian scriptures into Kiswahili in the 1840s?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Johann Ludwig Krapf',
      'David Livingstone',
      'Lord Delamere',
      'Vasco da Gama'
    ],
    correctAnswer: 'Johann Ludwig Krapf',
    explanation: 'Dr. Johann Ludwig Krapf, working with the Church Missionary Society (CMS) in Rabai near Mombasa, was the pioneer translator who produced the earliest Kiswahili translation of parts of the New Testament.',
    socraticHint: 'Which German CMS missionary who lived at Rabai worked on the very first Swahili scripture translation?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-018',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Which of the following practices demonstrates respectful physical handling of the Holy Bible?',
    text: 'Which of the following practices demonstrates respectful physical handling of the Holy Bible?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Storing the Bible in a clean, elevated place and handling its pages with clean, dry hands',
      'Using the Bible as an outdoor footrest while eating lunch in the school compound',
      'Tearing out Bible pages to roll toy balls or wrap roasted maize',
      'Leaving the Bible opened on the damp ground under direct rain'
    ],
    correctAnswer: 'Storing the Bible in a clean, elevated place and handling its pages with clean, dry hands',
    explanation: 'Christians revere the Bible as God’s inspired Word by handling the physical book with care, keeping it clean, storing it in an elevated place, and turning pages respectfully.',
    socraticHint: 'Which action treats the holy printed text with cleanliness, carefulness, and honor?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-019',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'In James 1:22, what vital admonition is given to everyone who reads or listens to God’s Word?',
    text: 'In James 1:22, what vital admonition is given to everyone who reads or listens to God’s Word?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not merely listen to the word, and so deceive yourselves. Do what it says',
      'Memorize all verses so you can win debates and make others feel inferior',
      'Only listen to the word on Sundays and forget about it throughout the school week',
      'Keep the word secret so other communities never hear the good news'
    ],
    correctAnswer: 'Do not merely listen to the word, and so deceive yourselves. Do what it says',
    explanation: 'James 1:22 urges: "Do not merely listen to the word, and so deceive yourselves. Do what it says." Real Christian reverence for scripture is shown through active obedience and ethical living.',
    socraticHint: 'Does the Apostle James emphasize merely hearing the word or actively putting it into practice?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-020',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'During an end-of-term examination, David sees that a classmate has dropped their answer sheet where it is clearly visible. How can David apply Biblical teaching?',
    text: 'During an end-of-term examination, David sees that a classmate has dropped their answer sheet where it is clearly visible. How can David apply Biblical teaching?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Refuse to cheat, focus on his own work with integrity, and notify the invigilator about the dropped paper',
      'Quickly copy all the answers and thank God for providing a miraculous shortcut',
      'Pass the dropped paper secretly to his best friend so they both get higher marks',
      'Step on the paper to hide it until after the exam and then claim it as his own'
    ],
    correctAnswer: 'Refuse to cheat, focus on his own work with integrity, and notify the invigilator about the dropped paper',
    explanation: 'Proverbs 11:1 states that "The Lord detests dishonest scales, but accurate weights find favor with him." Living out God’s Word means maintaining honest integrity even when tempted to cheat.',
    socraticHint: 'Which response reflects Christian honesty and refusal to take dishonest shortcuts?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-021',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'What was the original language in which the majority of the Old Testament was composed?',
    text: 'What was the original language in which the majority of the Old Testament was composed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Hebrew',
      'Latin',
      'English',
      'Swahili'
    ],
    correctAnswer: 'Hebrew',
    explanation: 'The Old Testament was originally written primarily in biblical Hebrew, with a few small portions composed in Aramaic (such as sections in Daniel and Ezra).',
    socraticHint: 'In which ancient Semitic language spoken by the Israelites was the Old Testament originally penned?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-022',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'What was the common language in which the New Testament was originally written across the Mediterranean world?',
    text: 'What was the common language in which the New Testament was originally written across the Mediterranean world?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Greek (Koine Greek)',
      'Arabic',
      'German',
      'French'
    ],
    correctAnswer: 'Greek (Koine Greek)',
    explanation: 'The New Testament was written in Koine Greek (common Greek), which was the widely spoken international language across the Roman Empire during the first century AD.',
    socraticHint: 'Which common Mediterranean language was spoken widely in the Roman world when the Apostles wrote the Gospels and Epistles?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-023',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'A family in Kakamega begins holding daily evening scripture devotion. What positive spiritual benefit does this bring to the home?',
    text: 'A family in Kakamega begins holding daily evening scripture devotion. What positive spiritual benefit does this bring to the home?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It nurtures love, peaceful resolution of disagreements, moral accountability, and spiritual growth',
      'It ensures that no family member ever has to do school homework or house chores',
      'It causes neighbors to become jealous and file formal complaints at the chief’s camp',
      'It guarantees that the family will instantly become millionaires without farming'
    ],
    correctAnswer: 'It nurtures love, peaceful resolution of disagreements, moral accountability, and spiritual growth',
    explanation: 'Gathering to read and apply scripture fosters mutual love, forgiveness, spiritual grounding, and moral character among family members, creating a peaceful, godly home environment.',
    socraticHint: 'How does reading God’s Word together strengthen relationships, forgiveness, and moral discipline in a home?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  },
  {
    id: 'q-g5-cre-u2-024',
    subStrandId: 'substrand-g5-cre-u2',
    prompt: 'Why does Christian tradition describe the Holy Bible as "inspired by the Holy Spirit" rather than just ordinary human literature?',
    text: 'Why does Christian tradition describe the Holy Bible as "inspired by the Holy Spirit" rather than just ordinary human literature?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because God guided the thoughts of human authors so that they faithfully conveyed God’s divine truth without error in matters of faith',
      'Because the physical pages were printed in heaven and dropped onto a mountain by angels',
      'Because the authors were under a trance and had no idea what words their hands were writing',
      'Because human beings played no role at all, and it appeared in modern English out of thin air'
    ],
    correctAnswer: 'Because God guided the thoughts of human authors so that they faithfully conveyed God’s divine truth without error in matters of faith',
    explanation: 'Biblical inspiration means God’s Holy Spirit worked within the human authors, using their personalities, historical backgrounds, and writing styles, while guiding them to record God’s infallible truth for humanity.',
    socraticHint: 'How did God work through the minds and lives of human writers while guiding the truth of their message?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U2'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) {
    db.questions[idx] = q;
  } else {
    db.questions.push(q);
    console.log(`Added question: ${q.id}`);
  }
});

// Write updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 1 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
