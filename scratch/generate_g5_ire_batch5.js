import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 IRE Batch 5 (Units 9 & 10) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-ire-u9',
    strandId: 'strand-g5-ire-akhlaq',
    learningAreaId: 'la-ire-g5',
    title: 'Islamic Etiquette (Akhlaq), Modesty, and Honoring Family Ties',
    description: 'Cultivating noble Islamic character: The comprehensive etiquette of Islamic greeting (As-Salamu \'Alaykum wa Rahmatullahi wa Barakatuh) and its spiritual virtues; prophetic table manners (saying Bismillah, eating with the right hand, eating from what is directly before you, sitting down to drink, not wasting food, saying Alhamdulillah); the virtue of modesty and moral dignity (Haya\'); the duty of honoring parents (Birr al-Walidayn) emphasized in Surah Al-Isra 17:23-24 (not even saying "Uff" to them, speaking gently, making supplication for them); and preserving ties of kinship (Silat ar-Rahim) as a source of expanded sustenance and longevity.',
    cbeCompetency: 'Moral dignity, respectful communication, filial devotion, family unity, emotional empathy',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g5-ire-u10',
    strandId: 'strand-g5-ire-akhlaq',
    learningAreaId: 'la-ire-g5',
    title: 'Peaceful Coexistence, Environmental Stewardship, and Nation Building in Kenya',
    description: 'Applying Islamic values in the multi-ethnic and multi-religious context of Kenya: Peaceful coexistence (Ta\'ayush) and tolerance with non-Muslim neighbors and citizens of diverse faiths, following the example of the Charter of Madinah (Sahifat al-Madinah) and the Quranic command to deal kindly and equitably with peaceful people (Surah Al-Mumtahanah 60:8); environmental stewardship as stewards (Khulafa) of the Earth: water conservation during ablution even at a flowing river, planting trees as ongoing charity (Sadaqah Jariyah), preventing animal cruelty; and contributing actively to Kenyan national development through anti-corruption integrity, academic diligence, and peaceful civic engagement.',
    cbeCompetency: 'Interfaith harmony, environmental responsibility, conservation ethics, national patriotism, anti-corruption integrity',
    estimatedMinutes: 30,
    order: 10
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 5 Lessons (Units 9 & 10: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-ire-u9-l1',
    subStrandId: 'substrand-g5-ire-u9',
    title: 'Islamic Manners: Greetings (Salam), Table Etiquette, and Modesty (Haya\')',
    content: 'Good character (Husn al-Khuluq) is the core of Islamic practice; Prophet Muhammad (SAW) stated: "The best among you are those who have the best character." The universal greeting of Islam is: "As-Salamu ‘Alaykum wa Rahmatullahi wa Barakatuh" (May the peace, mercy, and blessings of Allah be upon you). It initiates warmth, peace, and mutual safety. The Sunnah specifies that the younger person greets the elder first, the walking person greets the seated person, and the smaller group greets the larger group. At meal times, the Prophet taught young Umar ibn Abi Salamah: "Say Bismillah, eat with your right hand, and eat from what is directly in front of you." Eating with the left hand is prohibited as it resembles the behavior of Shaytan. Overeating is discouraged; one should divide the stomach into three equal portions: one third for food, one third for drink, and one third for breath. Water should be drunk while seated in two or three calm sips without breathing into the glass. Concluding the meal, one thanks Allah by saying "Alhamdulillah." Furthermore, modesty (Haya\') is celebrated as a fundamental branch of Iman: "Modesty brings nothing except good." Haya\' guides a Muslim child to dress modestly, speak politely, avoid coarse language, and feel inner shame before Allah when tempted to do wrong.',
    didYouKnow: 'Prophet Muhammad (SAW) never criticized any food served to him; if he liked it he ate it, and if he did not care for it, he left it without uttering a complaint or hurting the cook\'s feelings!',
    kenyanContext: 'In Mombasa and Lamu madrasahs, Grade 5 pupils greet every teacher, elder, and schoolmate with a warm handshake and the full Salam, demonstrating respect that extends into their neighborhoods.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u9-l2',
    subStrandId: 'substrand-g5-ire-u9',
    title: 'Honoring Parents (Birr al-Walidayn) and Upholding Kinship Ties (Silat ar-Rahim)',
    content: 'In the Holy Qur’an, kindness to parents is commanded immediately after the worship of Allah (Surah Al-Isra 17:23): "And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age with you, say not to them so much as \'Uff\' and do not repel them but speak to them a noble word." When a man asked the Prophet (SAW): "Who among people is most deserving of my good companionship?" the Prophet replied: "Your mother." The man asked: "Then who?" The Prophet replied: "Your mother." The man asked: "Then who?" The Prophet replied: "Your mother." The man asked: "Then who?" The Prophet replied: "Your father." Mothers undergo profound hardship during pregnancy, labor, and nursing, giving them three times special emphasis. Honoring parents (Birr al-Walidayn) includes obeying their good instructions, assisting with household tasks without grumbling, speaking respectfully, and reciting the Quranic prayer: "Rabbi irhamhuma kama rabbayani sagheera" ("My Lord, have mercy upon them as they brought me up when I was small"). Along with parents, Islam commands Silat ar-Rahim (maintaining family kinship): visiting grandparents, aunts, uncles, and cousins, helping relatives in need, and forgiving family disputes.',
    didYouKnow: 'Prophet Muhammad (SAW) taught that whoever wishes for their provision to be expanded and their lifespan to be prolonged should maintain close ties of kinship (Silat ar-Rahim)!',
    kenyanContext: 'During school holidays in Isiolo and Garissa, children travel to rural villages to assist their elderly grandparents with livestock herding and fetching firewood, embodying Birr al-Walidayn.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u10-l1',
    subStrandId: 'substrand-g5-ire-u10',
    title: 'Peaceful Coexistence and Inter-Religious Harmony in Kenya',
    content: 'Islam is a religion of peace, justice, and compassionate coexistence. In Surah Al-Mumtahanah (60:8), Allah commands: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes—from being righteous toward them and acting justly toward them. Indeed, Allah loves those who act justly." When Prophet Muhammad (SAW) migrated to Madinah, he drafted the Constitution of Madinah (Sahifat al-Madinah), establishing equal rights, freedom of worship, and joint community defense alongside Jewish tribes. Islam strictly prohibits insulting people of other religions or cursing their places of worship (Surah Al-An\'am 6:108). In Kenya, our country is blessed with citizens of various faiths: Christians, Muslims, Hindus, and traditional believers living side-by-side. Muslim learners are ambassadors of peace (Aman). They cooperate with fellow Kenyans in communal work (Harambee), inter-school games, environmental clubs, and peace committees. True Islamic faith is demonstrated by living peacefully, sharing neighborly food, and protecting every citizen regardless of tribe or creed.',
    didYouKnow: 'Prophet Muhammad (SAW) cautioned: "Whoever harms a non-Muslim citizen (Mu\'ahid), curtails their rights, or takes their property unjustly, I myself will plead against him on the Day of Judgment!"',
    kenyanContext: 'In interfaith coastal towns like Malindi and Kilifi, Muslim and Christian community elders organize joint peace barazas to settle local differences, ensuring neighborly brotherhood thrives across communities.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u10-l2',
    subStrandId: 'substrand-g5-ire-u10',
    title: 'Environmental Stewardship (Khilafah) and Integrity in Kenyan Nation Building',
    content: 'Human beings were created as stewards and trustees (Khulafa) of the Earth to preserve its natural beauty and balance. Islamic environmental stewardship includes: 1) Water conservation: the Prophet (SAW) observed his companion Sa\'d performing ablution and warned against wasting water, stating: "Do not waste water, even if you are at the bank of a flowing river!"; 2) Tree planting: the Prophet taught: "There is no Muslim who plants a tree or sows a seed, from which a bird, human, or animal eats, except that it counts as a charity (Sadaqah Jariyah) for him"; 3) Kindness to animals: Islam teaches that a righteous woman entered Paradise for giving water to a dying thirsty dog, whereas another was punished for starving a cat; 4) Nation building and anti-corruption: Allah commands absolute honesty (Amanah) and condemns bribery: "The curse of Allah is upon the one who gives a bribe and the one who takes a bribe." Kenyan Muslim pupils contribute to national development by studying diligently, respecting national laws, standing against corruption and tribalism, and participating in Kenya’s national tree-growing campaign.',
    didYouKnow: 'Prophet Muhammad (SAW) said: "If the Final Hour comes while one of you holds a date-palm sapling in his hand, if he can plant it before standing up, let him plant it!" highlighting the supreme value of environmental conservation!',
    kenyanContext: 'Supporting Kenya\'s national initiative to grow 15 billion trees by 2032, Madrasah pupils in Wajir and Garissa plant neem and acacia seedlings in their school compounds, considering every tree a living Sadaqah Jariyah.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 5 Missions (Units 9 & 10: 4 Missions)
const missionsToAdd = [
  {
    id: 'mission-g5-ire-u9-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u9',
    lessonId: 'lesson-g5-ire-u9-l1',
    title: 'Prophetic Etiquette and Table Manners Quest',
    description: 'Master the noble Islamic greetings of peace, practice the prophetic eating manners taught to young Umar, and embrace the shield of modesty (Haya\')!',
    order: 85,
    orderIndex: 85,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-prophetic-manners',
    badge: {
      name: 'Manners Champion',
      icon: 'smile'
    },
    questionIds: [
      'q-g5-ire-u9-001',
      'q-g5-ire-u9-002',
      'q-g5-ire-u9-003',
      'q-g5-ire-u9-004',
      'q-g5-ire-u9-005',
      'q-g5-ire-u9-006',
      'q-g5-ire-u9-007',
      'q-g5-ire-u9-008',
      'q-g5-ire-u9-009',
      'q-g5-ire-u9-010',
      'q-g5-ire-u9-011',
      'q-g5-ire-u9-012'
    ]
  },
  {
    id: 'mission-g5-ire-u9-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u9',
    lessonId: 'lesson-g5-ire-u9-l2',
    title: 'Honoring Parents and Kinship Ties Trial',
    description: 'Learn why the mother is honored three times, discover the Quranic prohibition of saying "Uff" to parents, and strengthen family bonds of Silat ar-Rahim!',
    order: 86,
    orderIndex: 86,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-filial-piety',
    badge: {
      name: 'Kinship Guardian',
      icon: 'users'
    },
    questionIds: [
      'q-g5-ire-u9-013',
      'q-g5-ire-u9-014',
      'q-g5-ire-u9-015',
      'q-g5-ire-u9-016',
      'q-g5-ire-u9-017',
      'q-g5-ire-u9-018',
      'q-g5-ire-u9-019',
      'q-g5-ire-u9-020',
      'q-g5-ire-u9-021',
      'q-g5-ire-u9-022',
      'q-g5-ire-u9-023',
      'q-g5-ire-u9-024'
    ]
  },
  {
    id: 'mission-g5-ire-u10-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u10',
    lessonId: 'lesson-g5-ire-u10-l1',
    title: 'Charter of Peace and Kenyan Coexistence Quest',
    description: 'Examine the historic Charter of Madinah, discover Quranic principles of interfaith justice in Surah Al-Mumtahanah, and build bridges of harmony across Kenya!',
    order: 87,
    orderIndex: 87,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-peace-ambassador',
    badge: {
      name: 'Peace Ambassador',
      icon: 'flag'
    },
    questionIds: [
      'q-g5-ire-u10-001',
      'q-g5-ire-u10-002',
      'q-g5-ire-u10-003',
      'q-g5-ire-u10-004',
      'q-g5-ire-u10-005',
      'q-g5-ire-u10-006',
      'q-g5-ire-u10-007',
      'q-g5-ire-u10-008',
      'q-g5-ire-u10-009',
      'q-g5-ire-u10-010',
      'q-g5-ire-u10-011',
      'q-g5-ire-u10-012'
    ]
  },
  {
    id: 'mission-g5-ire-u10-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u10',
    lessonId: 'lesson-g5-ire-u10-l2',
    title: 'Earth Stewards and Kenya Nation Builders Challenge',
    description: 'Conserve water like the Prophet at the river bank, plant trees as ongoing Sadaqah Jariyah, and defeat corruption to build an honest and prosperous Kenya!',
    order: 88,
    orderIndex: 88,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-nation-builder',
    badge: {
      name: 'Nation Builder',
      icon: 'award'
    },
    questionIds: [
      'q-g5-ire-u10-013',
      'q-g5-ire-u10-014',
      'q-g5-ire-u10-015',
      'q-g5-ire-u10-016',
      'q-g5-ire-u10-017',
      'q-g5-ire-u10-018',
      'q-g5-ire-u10-019',
      'q-g5-ire-u10-020',
      'q-g5-ire-u10-021',
      'q-g5-ire-u10-022',
      'q-g5-ire-u10-023',
      'q-g5-ire-u10-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 5 Questions (Units 9 & 10: 48 Questions total)
const questionsToAdd = [
  // --- Unit 9 Lesson 1: Prophetic Etiquette and Table Manners Quest (q-g5-ire-u9-001 to 012) ---
  {
    id: 'q-g5-ire-u9-001',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What is the full comprehensive wording of the Islamic greeting of peace and blessings?',
    text: 'What is the full comprehensive wording of the Islamic greeting of peace and blessings?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"As-Salamu ‘Alaykum wa Rahmatullahi wa Barakatuh"',
      '"Subhanallah wa Bihamdihi"',
      '"La Hawla wa La Quwwata illa Billah"',
      '"Astaghfirullah wa Atubu Ilayhi"'
    ],
    correctAnswer: '"As-Salamu ‘Alaykum wa Rahmatullahi wa Barakatuh"',
    explanation: 'The full greeting means: "May the peace, mercy, and blessings of Allah be upon you," which carries the highest reward of thirty good deeds.',
    socraticHint: 'Which Arabic phrase conveys Peace, Mercy (Rahmah), and Blessings (Barakah) to the person greeted?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-002',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'According to prophetic etiquette, who should initiate the greeting when two people meet?',
    text: 'According to prophetic etiquette, who should initiate the greeting when two people meet?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The younger person greets the elder, the walking person greets the seated person, and the smaller group greets the larger group',
      'The elder always speaks first and the younger remains silent',
      'The seated person must stand and shout first',
      'Only the wealthier person should initiate the greeting'
    ],
    correctAnswer: 'The younger person greets the elder, the walking person greets the seated person, and the smaller group greets the larger group',
    explanation: 'In Sahih al-Bukhari, the Prophet (SAW) taught: "The younger should greet the elder, the passerby should greet the seated, and the smaller group should greet the larger."',
    socraticHint: 'Think about how youth show respect to elders and moving pedestrians acknowledge seated people.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-003',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What three pieces of advice did Prophet Muhammad (SAW) give to the boy Umar ibn Abi Salamah when he sat down to eat?',
    text: 'What three pieces of advice did Prophet Muhammad (SAW) give to the boy Umar ibn Abi Salamah when he sat down to eat?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Say Bismillah, eat with your right hand, and eat from what is directly in front of you"',
      '"Eat as fast as you can, use both hands, and reach for the center of the dish"',
      '"Do not eat until adults finish, stand up while chewing, and leave leftovers"',
      '"Wash hands after eating only, chew with mouth open, and drink all the water first"'
    ],
    correctAnswer: '"Say Bismillah, eat with your right hand, and eat from what is directly in front of you"',
    explanation: 'The Prophet (SAW) instructed: "Ya ghulam, sammillah, wa kul bi yameenik, wa kul mimma yaleek" ("O boy, mention the name of Allah, eat with your right hand, and eat from what is nearest to you").',
    socraticHint: 'Remember the famous three rules: mention Allah\'s name, use the right hand, and take from the portion closest to you.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-004',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'Why did the Prophet (SAW) prohibit eating and drinking with the left hand?',
    text: 'Why did the Prophet (SAW) prohibit eating and drinking with the left hand?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because Satan (Shaytan) eats and drinks with his left hand',
      'Because the left hand cannot hold spoons',
      'Because left-handed people are forbidden from eating warm meals',
      'Because the left hand should always be kept inside pockets'
    ],
    correctAnswer: 'Because Satan (Shaytan) eats and drinks with his left hand',
    explanation: 'The Prophet (SAW) said in Sahih Muslim: "Let not any of you eat with his left hand or drink with it, for indeed Satan eats with his left hand and drinks with his left hand."',
    socraticHint: 'Whose negative behavior are we instructed to avoid when eating with the right hand?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-005',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What did the Prophet (SAW) teach regarding the ideal division of the stomach during a meal to avoid overeating?',
    text: 'What did the Prophet (SAW) teach regarding the ideal division of the stomach during a meal to avoid overeating?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'One third for food, one third for drink, and one third for breath/air',
      'Completely full of food with no room for water',
      'Half for food and half for sweets',
      'Three quarters for water and one quarter for fruit'
    ],
    correctAnswer: 'One third for food, one third for drink, and one third for breath/air',
    explanation: 'In Sunan at-Tirmidhi, the Prophet taught moderation: if a person must fill their stomach, let it be "one third for food, one third for his drink, and one third for his breath."',
    socraticHint: 'Which three-way division ensures healthy digestion and easy breathing after meals?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-006',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'How did Prophet Muhammad (SAW) advise Muslims to drink water properly?',
    text: 'How did Prophet Muhammad (SAW) advise Muslims to drink water properly?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'While seated, taking two or three paused sips, and without breathing into the cup',
      'Standing up and gulping the entire glass down in one single breath',
      'Blowing warm breath into the water before drinking',
      'Drinking while running across the field'
    ],
    correctAnswer: 'While seated, taking two or three paused sips, and without breathing into the cup',
    explanation: 'The Sunnah of drinking is to sit down, say Bismillah, drink in two or three calm breaths, remove the cup away from the mouth when breathing, and say Alhamdulillah.',
    socraticHint: 'Should water be gulped quickly while standing or sipped calmly while seated without exhaling into the cup?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-007',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What was the lifelong habit of Prophet Muhammad (SAW) regarding food that was offered to him if he did not find it appealing?',
    text: 'What was the lifelong habit of Prophet Muhammad (SAW) regarding food that was offered to him if he did not find it appealing?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He never found fault with any food; if he liked it he ate it, and if he disliked it he left it quietly without complaining',
      'He would criticize the cook loudly and demand a replacement meal',
      'He would throw the dish onto the floor',
      'He would force someone else to eat it immediately'
    ],
    correctAnswer: 'He never found fault with any food; if he liked it he ate it, and if he disliked it he left it quietly without complaining',
    explanation: 'Abu Hurairah (RA) narrated in Sahih al-Bukhari: "The Prophet (SAW) never criticized any food at all. If he liked it he ate it, and if he disliked it he left it," protecting the feelings of the host.',
    socraticHint: 'Did the Prophet complain about meals or leave food quietly without hurting the host?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-008',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What Islamic virtue is described by Prophet Muhammad (SAW) as "bringing nothing except good" and being an essential branch of Iman?',
    text: 'What Islamic virtue is described by Prophet Muhammad (SAW) as "bringing nothing except good" and being an essential branch of Iman?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Haya\' (Modesty / Sense of shame before Allah and people)',
      'Kibr (Arrogance)',
      'Ghadab (Anger)',
      'Bukhul (Greed / Stinginess)'
    ],
    correctAnswer: 'Haya\' (Modesty / Sense of shame before Allah and people)',
    explanation: 'The Prophet (SAW) taught: "Al-Haya\'u la ya\'tee illa bi khayr" ("Modesty brings nothing but good") and "Modesty is a branch of faith," guarding morality and chastity.',
    socraticHint: 'Which virtue represents modest dignity, self-respect, and moral decency in speech and appearance?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-009',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'How does practicing Haya\' (modesty) manifest in the daily speech and conduct of a Grade 5 pupil at school?',
    text: 'How does practicing Haya\' (modesty) manifest in the daily speech and conduct of a Grade 5 pupil at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The pupil speaks with respect, avoids vulgar words or insults, dresses decently, and refrains from vulgar jokes',
      'The pupil speaks loudly and interrupts the teacher repeatedly',
      'The pupil refuses to participate in classroom discussions',
      'The pupil writes rude graffiti on classroom desks'
    ],
    correctAnswer: 'The pupil speaks with respect, avoids vulgar words or insults, dresses decently, and refrains from vulgar jokes',
    explanation: 'Haya\' protects moral purity: a modest pupil uses courteous language, dresses appropriately, respects personal boundaries, and avoids foul or shameless talk.',
    socraticHint: 'How does a sense of moral modesty protect a student from using foul language or rude behavior?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-010',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What words of praise and thanks to Allah should a Muslim recite upon finishing eating a meal?',
    text: 'What words of praise and thanks to Allah should a Muslim recite upon finishing eating a meal?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Alhamdulillah" (Praise be to Allah)',
      '"Bismillah" (In the name of Allah)',
      '"Allahu Akbar" (Allah is the Greatest)',
      '"Astaghfirullah" (I ask forgiveness from Allah)'
    ],
    correctAnswer: '"Alhamdulillah" (Praise be to Allah)',
    explanation: 'Saying "Alhamdulillah" expresses heartfelt gratitude to Allah who provided the nourishment and quenched hunger and thirst.',
    socraticHint: 'Which phrase meaning "All praise belongs to Allah" is recited after eating?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-011',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'Why is wasting food (Israf) strictly condemned in Islam according to Surah Al-A\'raf (7:31)?',
    text: 'Why is wasting food (Israf) strictly condemned in Islam according to Surah Al-A\'raf (7:31)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because Allah states: "Eat and drink, but waste not by excess; indeed He loves not the wasteful"',
      'Because food left on a plate turns into plastic',
      'Because leftover food is legally forbidden to animals',
      'Because wasting food makes plates heavy'
    ],
    correctAnswer: 'Because Allah states: "Eat and drink, but waste not by excess; indeed He loves not the wasteful"',
    explanation: 'Surah Al-A\'raf 7:31 prohibits extravagance (Israf). Throwing away good edible food is ungratefulness to Allah while millions around the world suffer malnutrition.',
    socraticHint: 'What does the Qur\'an say about those who indulge in wasteful excess (Al-Musrifin)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-012',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'How does spreading the greeting of Salam contribute to peace and safety within a Kenyan school environment?',
    text: 'How does spreading the greeting of Salam contribute to peace and safety within a Kenyan school environment?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It breaks down social barriers, removes hatred and suspicion, and creates an atmosphere of warmth, brotherhood, and safety',
      'It causes students to waste study time talking in hallways',
      'It ensures only pupils of the same clan speak to each other',
      'It eliminates the need for school rules and discipline'
    ],
    correctAnswer: 'It breaks down social barriers, removes hatred and suspicion, and creates an atmosphere of warmth, brotherhood, and safety',
    explanation: 'The Prophet (SAW) taught: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I guide you to something which, if you do it, you will love one another? Spread the Salam among you!"',
    socraticHint: 'How does offering a sincere wish of peace melt animosity and bring hearts closer together?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },

  // --- Unit 9 Lesson 2: Honoring Parents and Kinship Ties Trial (q-g5-ire-u9-013 to 024) ---
  {
    id: 'q-g5-ire-u9-013',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'In Surah Al-Isra (17:23), what minor expression of irritation or disrespect towards parents is strictly forbidden by Allah?',
    text: 'In Surah Al-Isra (17:23), what minor expression of irritation or disrespect towards parents is strictly forbidden by Allah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Saying even the mildest word of contempt like "Uff" (sighing in annoyance)',
      'Offering to wash their clothes',
      'Asking them what they would like for breakfast',
      'Walking behind them along the pathway'
    ],
    correctAnswer: 'Saying even the mildest word of contempt like "Uff" (sighing in annoyance)',
    explanation: 'Surah Al-Isra 17:23 states: "Fala taqul lahuma uff" ("Say not to them so much as \'Uff\' and do not repel them, but speak to them a noble word"). Even a tiny sigh of exasperation is prohibited.',
    socraticHint: 'What short sound of grumbling or sighing in irritation is explicitly outlawed in Surah Al-Isra?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-014',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'When a man asked Prophet Muhammad (SAW) who was most deserving of his good companionship and care, how many times did the Prophet reply "Your mother" before saying "Your father"?',
    text: 'When a man asked Prophet Muhammad (SAW) who was most deserving of his good companionship and care, how many times did the Prophet reply "Your mother" before saying "Your father"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Three times',
      'Once',
      'Five times',
      'Ten times'
    ],
    correctAnswer: 'Three times',
    explanation: 'The Prophet (SAW) answered: "Your mother," then "Your mother," then "Your mother," and on the fourth time said: "Then your father," giving the mother threefold honor.',
    socraticHint: 'How many times did the Prophet repeat "your mother" in the famous Hadith in Sahih al-Bukhari?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-015',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'Why does Islamic teaching give the mother three times special honor and consideration compared to others?',
    text: 'Why does Islamic teaching give the mother three times special honor and consideration compared to others?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because of her unique hardships of pregnancy, the labor pains of childbirth, and years of devoted breastfeeding and nurturing',
      'Because mothers earn more money in business than fathers',
      'Because mothers do not have to perform prayers',
      'Because mothers always stay in Makkah'
    ],
    correctAnswer: 'Because of her unique hardships of pregnancy, the labor pains of childbirth, and years of devoted breastfeeding and nurturing',
    explanation: 'Scholars explain that the threefold mention corresponds to three hardships borne exclusively by mothers: bearing the child during pregnancy, the suffering of delivery, and nursing.',
    socraticHint: 'Think of the three unique physical and emotional sacrifices made by mothers that fathers do not experience.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-016',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What beautiful supplication for parents is taught by Allah in Surah Al-Isra (17:24)?',
    text: 'What beautiful supplication for parents is taught by Allah in Surah Al-Isra (17:24)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Rabbi irhamhuma kama rabbayani sagheera" ("My Lord, have mercy upon them as they brought me up when I was small")',
      '"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanah"',
      '"Rabbi zidni \'ilma"',
      '"Rabbana la tuzigh qulubana ba\'da idh hadaytana"'
    ],
    correctAnswer: '"Rabbi irhamhuma kama rabbayani sagheera" ("My Lord, have mercy upon them as they brought me up when I was small")',
    explanation: 'Surah Al-Isra 17:24 instructs children to lower the wing of humility out of mercy and pray: "My Lord, have mercy upon them as they raised me when I was a child."',
    socraticHint: 'Which prayer asks Allah to have mercy on parents just as they tenderly cared for us in our childhood?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-017',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What is the Islamic term for maintaining and strengthening family ties with relatives and kin?',
    text: 'What is the Islamic term for maintaining and strengthening family ties with relatives and kin?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Silat ar-Rahim',
      'Birr al-Walidayn',
      'Tawbah',
      'Ihsan'
    ],
    correctAnswer: 'Silat ar-Rahim',
    explanation: 'Silat ar-Rahim literally means "connecting the womb/kinship," referring to keeping loving ties, communication, and mutual assistance with blood relatives.',
    socraticHint: 'Which phrase contains the word "Rahim" (womb/kinship) and signifies upholding family connections?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-018',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What worldly and spiritual rewards did Prophet Muhammad (SAW) promise to a person who faithfully practices Silat ar-Rahim?',
    text: 'What worldly and spiritual rewards did Prophet Muhammad (SAW) promise to a person who faithfully practices Silat ar-Rahim?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Expansion and abundance in wealth/provision, and a prolonged life blessed with good deeds',
      'Exemption from paying taxes to the government',
      'Instant victory in athletic marathons',
      'Being given a golden crown in this worldly life'
    ],
    correctAnswer: 'Expansion and abundance in wealth/provision, and a prolonged life blessed with good deeds',
    explanation: 'The Prophet (SAW) said in Sahih al-Bukhari: "Whoever loves that his provision be expanded and his life prolonged, let him maintain the ties of kinship."',
    socraticHint: 'Which two blessings—plentiful sustenance and a long blessed lifespan—are linked to maintaining kinship?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-019',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What should a Muslim child do if their parents command them to do something that violates the commandments of Allah (such as lying or not praying)?',
    text: 'What should a Muslim child do if their parents command them to do something that violates the commandments of Allah (such as lying or not praying)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Politely and respectfully decline to commit the sin while continuing to treat their parents with kindness and noble companionship',
      'Shout at the parents and run away from home forever',
      'Obey the parents even if it displeases Allah',
      'Insult the parents in front of community elders'
    ],
    correctAnswer: 'Politely and respectfully decline to commit the sin while continuing to treat their parents with kindness and noble companionship',
    explanation: 'Surah Luqman (31:15) instructs that if parents urge disobedience to Allah, do not obey them in that sin, but accompany them in worldly life with kindness and respect.',
    socraticHint: 'Can obedience to humans supersede obedience to Allah, and how must one treat parents even when disagreeing?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-020',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'Who is the true maintainer of kinship (Al-Wasil) according to Prophet Muhammad (SAW)?',
    text: 'Who is the true maintainer of kinship (Al-Wasil) according to Prophet Muhammad (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The one who reaches out and mends ties when relatives cut them off, not merely the one who reciprocates visits',
      'The one who only visits relatives when they give him expensive presents',
      'The one who attends weddings but boycotts funerals',
      'The one who talks about family ancestry on social media'
    ],
    correctAnswer: 'The one who reaches out and mends ties when relatives cut them off, not merely the one who reciprocates visits',
    explanation: 'The Prophet (SAW) said in Sahih al-Bukhari: "The one who maintains ties is not the one who merely reciprocates; rather, the one who maintains ties is the one who, when kinship is severed, reconnects it."',
    socraticHint: 'Is true kinship just exchanging equal favors or reconnecting with relatives who have drifted away?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-021',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'How can a child continue to honor and benefit their parents after the parents have passed away?',
    text: 'How can a child continue to honor and benefit their parents after the parents have passed away?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By making constant Du’a (supplication) for their forgiveness, giving charity (Sadaqah) on their behalf, and honoring their friends and relatives',
      'By selling all the family land and keeping the money for vacations',
      'By forgetting about them and never mentioning their names',
      'By building an empty monument with statues'
    ],
    correctAnswer: 'By making constant Du’a (supplication) for their forgiveness, giving charity (Sadaqah) on their behalf, and honoring their friends and relatives',
    explanation: 'The Prophet taught that when a person dies, their deeds cease except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them.',
    socraticHint: 'Which three continuous acts keep sending divine reward to deceased parents in the grave?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-022',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'In Kenyan culture and Islamic teaching, how does helping elderly grandparents in rural areas demonstrate Birr al-Walidayn?',
    text: 'In Kenyan culture and Islamic teaching, how does helping elderly grandparents in rural areas demonstrate Birr al-Walidayn?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It fulfills the religious duty of honoring family elders with physical care, respect, and emotional warmth in their vulnerable old age',
      'It allows children to escape school homework',
      'It is done only to gain an inheritance',
      'It replaces the need to care for one\'s own parents'
    ],
    correctAnswer: 'It fulfills the religious duty of honoring family elders with physical care, respect, and emotional warmth in their vulnerable old age',
    explanation: 'Grandparents are an extension of one\'s parents; serving them with humility, fetching water, herding goats, or cooking meals reflects deep moral piety and family devotion.',
    socraticHint: 'How does caring for elderly grandparents honor our family roots and fulfill religious filial piety?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-023',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'What did the Prophet (SAW) say about Paradise and the mother’s service in the Hadith narrated by Mu’awiyah ibn Jahima?',
    text: 'What did the Prophet (SAW) say about Paradise and the mother’s service in the Hadith narrated by Mu’awiyah ibn Jahima?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Stay with her, for indeed Paradise lies at her feet"',
      '"Leave her and go on distant military expeditions"',
      '"Only wealthy sons will enter Paradise"',
      '"Fathers alone hold the keys to Paradise"'
    ],
    correctAnswer: '"Stay with her, for indeed Paradise lies at her feet"',
    explanation: 'When Jahima asked to go for voluntary struggle, the Prophet asked if his mother was alive. When he said yes, the Prophet replied: "Cling to her feet, for Paradise is there!"',
    socraticHint: 'Where did the Prophet say Paradise lies when advising a young man to care for his living mother?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },
  {
    id: 'q-g5-ire-u9-024',
    subStrandId: 'substrand-g5-ire-u9',
    prompt: 'Why is severing family ties (Qat\' ar-Rahim) warned against so sternly in the Holy Qur\'an (Surah Muhammad 47:22-23)?',
    text: 'Why is severing family ties (Qat\' ar-Rahim) warned against so sternly in the Holy Qur\'an (Surah Muhammad 47:22-23)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because destroying family bonds causes social breakdown, emotional trauma, community disintegration, and forfeits Allah\'s mercy',
      'Because relatives are legally required to sign business contracts daily',
      'Because it causes physical illness in livestock',
      'Because family members must always attend the same school'
    ],
    correctAnswer: 'Because destroying family bonds causes social breakdown, emotional trauma, community disintegration, and forfeits Allah\'s mercy',
    explanation: 'The Prophet warned: "The one who severs ties of kinship will not enter Paradise." Discarding family connections breeds isolation, bitter feuds, and communal decay.',
    socraticHint: 'How does breaking family ties destroy community harmony and bring severe spiritual consequences?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U9'
  },

  // --- Unit 10 Lesson 1: Charter of Peace and Kenyan Coexistence Quest (q-g5-ire-u10-001 to 012) ---
  {
    id: 'q-g5-ire-u10-001',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What did Allah command believers regarding non-Muslims who do not fight them or expel them from their homes in Surah Al-Mumtahanah (60:8)?',
    text: 'What did Allah command believers regarding non-Muslims who do not fight them or expel them from their homes in Surah Al-Mumtahanah (60:8)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To be righteous, kind, and just towards them, for indeed Allah loves those who act justly',
      'To refuse to speak to them or trade with them',
      'To drive them out of their neighborhoods',
      'To compel them to convert to Islam against their will'
    ],
    correctAnswer: 'To be righteous, kind, and just towards them, for indeed Allah loves those who act justly',
    explanation: 'Surah Al-Mumtahanah 60:8 explicitly enjoins Birr (benevolent kindness) and Qist (fair justice) towards non-Muslims who live peacefully alongside Muslims.',
    socraticHint: 'Does Allah command fairness and kindness or hostility towards peaceful non-Muslim neighbors?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-002',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What historic multi-faith constitutional treaty did Prophet Muhammad (SAW) draft upon arriving in Madinah to establish peaceful civic coexistence?',
    text: 'What historic multi-faith constitutional treaty did Prophet Muhammad (SAW) draft upon arriving in Madinah to establish peaceful civic coexistence?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Constitution/Charter of Madinah (Sahifat al-Madinah)',
      'The Treaty of Hudaybiyyah',
      'The Pledge of Aqabah',
      'The Farewell Sermon (Khutbat al-Wada\')'
    ],
    correctAnswer: 'The Constitution/Charter of Madinah (Sahifat al-Madinah)',
    explanation: 'The Sahifat al-Madinah was the pioneering written constitution that bound Muslims, Jewish tribes, and Arab clans into one civic commonwealth with equal rights and mutual security.',
    socraticHint: 'Which document established the civic rights and religious freedom of all groups living together in Madinah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-003',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What guarantee did the Constitution of Madinah give to Jewish and other non-Muslim citizens living in the city?',
    text: 'What guarantee did the Constitution of Madinah give to Jewish and other non-Muslim citizens living in the city?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Freedom of religious practice, security of their property, and equal protection under civic law',
      'They were forced to leave the Arabian peninsula immediately',
      'They were forbidden from participating in public markets',
      'They were required to change their ancestral names'
    ],
    correctAnswer: 'Freedom of religious practice, security of their property, and equal protection under civic law',
    explanation: 'The charter established: "To the Jews is their religion, and to the Muslims is their religion," guaranteeing life, property, dignity, and religious practice.',
    socraticHint: 'What essential democratic and civil rights of religion and property were protected in the charter?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-004',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What does the Holy Qur’an state in Surah Al-Baqarah (2:256) regarding religious belief and freedom of conscience?',
    text: 'What does the Holy Qur’an state in Surah Al-Baqarah (2:256) regarding religious belief and freedom of conscience?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"There is no compulsion in religion; truth stands out clearly from falsehood"',
      '"Everyone in the world must be forced to accept faith"',
      '"Faith can only be taught through physical punishment"',
      '"Religious beliefs should be decided by lottery"'
    ],
    correctAnswer: '"There is no compulsion in religion; truth stands out clearly from falsehood"',
    explanation: '"La ikraha fid-deen" (There is no compulsion in religion) guarantees that faith must come from voluntary personal conviction of the heart, never through coercion.',
    socraticHint: 'Which famous verse clearly states "La ikraha fid-deen"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-005',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'Why does Surah Al-An\'am (6:108) forbid Muslims from insulting or reviling the idols or deities worshiped by polytheists?',
    text: 'Why does Surah Al-An\'am (6:108) forbid Muslims from insulting or reviling the idols or deities worshiped by polytheists?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Lest they in their ignorance insult Allah out of retaliation and enmity, escalating conflict and hatred',
      'Because idols have magical powers to harm people',
      'Because Muslims are required to worship those idols alongside Allah',
      'Because insulting idols makes the weather cloudy'
    ],
    correctAnswer: 'Lest they in their ignorance insult Allah out of retaliation and enmity, escalating conflict and hatred',
    explanation: 'The Quran warns: "And do not insult those they invoke other than Allah, lest they insult Allah in enmity without knowledge," safeguarding civic harmony and mutual respect.',
    socraticHint: 'How does insulting someone else\'s beliefs provoke them to retaliate and insult Allah?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-006',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What stern warning did Prophet Muhammad (SAW) issue to anyone who harms a non-Muslim peaceful citizen (Mu\'ahid) living in the Muslim society?',
    text: 'What stern warning did Prophet Muhammad (SAW) issue to anyone who harms a non-Muslim peaceful citizen (Mu\'ahid) living in the Muslim society?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"I will be his opponent and accuser on the Day of Judgment!"',
      '"He will receive a bonus reward of ten camels"',
      '"He should merely pay a small market fee"',
      '"His deeds will be praised by the community"'
    ],
    correctAnswer: '"I will be his opponent and accuser on the Day of Judgment!"',
    explanation: 'The Prophet (SAW) stated: "Beware! Whoever oppresses a non-Muslim citizen with a covenant, curtails his rights, or burdens him beyond his capacity, I will be his adversary on the Day of Judgment!"',
    socraticHint: 'Who will directly stand as the prosecutor on the Day of Judgment against anyone oppressing non-Muslim minorities?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-007',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What did Prophet Muhammad (SAW) do when the funeral procession of a Jewish person passed before him in Madinah?',
    text: 'What did Prophet Muhammad (SAW) do when the funeral procession of a Jewish person passed before him in Madinah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He stood up out of respect; when his companions asked why he stood for a Jewish funeral, he replied: "Is it not a human soul?"',
      'He turned his back and walked away quickly',
      'He told the companions to stop the procession',
      'He closed his eyes and remained seated'
    ],
    correctAnswer: 'He stood up out of respect; when his companions asked why he stood for a Jewish funeral, he replied: "Is it not a human soul?"',
    explanation: 'In Sahih al-Bukhari, when a funeral bier passed by, the Prophet stood. When told it was a Jew, he declared: "A laysat nafsan?" ("Was it not a human soul?"), showing universal reverence for human dignity.',
    socraticHint: 'What rhetorical question did the Prophet ask to affirm the inherent sanctity and dignity of every human being?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-008',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'How do Muslim pupils in Kenya practice peaceful coexistence with classmates of different religious backgrounds during school break times?',
    text: 'How do Muslim pupils in Kenya practice peaceful coexistence with classmates of different religious backgrounds during school break times?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By sharing play equipment, respecting each other\'s dignity, collaborating in class assignments, and maintaining kind friendship',
      'By sitting in separate corners and refusing to play games together',
      'By mocking the religious traditions of other communities',
      'By demanding that non-Muslims leave the playground'
    ],
    correctAnswer: 'By sharing play equipment, respecting each other\'s dignity, collaborating in class assignments, and maintaining kind friendship',
    explanation: 'Kenyan national values and Islamic ethics foster inclusive friendship, cooperative games, and mutual support among children of all backgrounds in our diverse nation.',
    socraticHint: 'How does playing together and sharing equipment build inclusive friendship among classmates of all faiths?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-009',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'In Kenyan towns like Mombasa, Malindi, or Nairobi, how do Muslim and Christian leaders collaborate to prevent ethnic or religious conflict?',
    text: 'In Kenyan towns like Mombasa, Malindi, or Nairobi, how do Muslim and Christian leaders collaborate to prevent ethnic or religious conflict?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Through interfaith peace councils, joint community barazas, and shared humanitarian initiatives during national challenges',
      'By holding public arguments in the market square',
      'By building high walls between residential neighborhoods',
      'By banning people of other faiths from entering public transport'
    ],
    correctAnswer: 'Through interfaith peace councils, joint community barazas, and shared humanitarian initiatives during national challenges',
    explanation: 'Interfaith dialogue committees bring religious leaders together to resolve local misunderstandings, mediate disputes, and preach tolerance and unity across communities.',
    socraticHint: 'How do joint community barazas and peace committees bring diverse leaders together for national unity?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-010',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What does the Qur’anic principle in Surah Al-Hujurat (49:13) teach about the divine wisdom behind human ethnic and tribal diversity?',
    text: 'What does the Qur’anic principle in Surah Al-Hujurat (49:13) teach about the divine wisdom behind human ethnic and tribal diversity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mankind was created into nations and tribes so that they may know and appreciate one another (Li ta\'arafoo), not despise one another',
      'Certain tribes were created superior to rule over all others',
      'Tribal differences exist to cause perpetual competition and war',
      'People should only marry within their own clan'
    ],
    correctAnswer: 'Mankind was created into nations and tribes so that they may know and appreciate one another (Li ta\'arafoo), not despise one another',
    explanation: 'Surah Al-Hujurat 49:13 declares: "We made you into nations and tribes that you may know each other. Truly the most noble of you in the sight of Allah is the most righteous."',
    socraticHint: 'Did Allah create human diversity for mutual hatred and division or for mutual learning and knowing one another?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-011',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'How does participation in national Harambee (community self-help) projects reflect the Islamic duty of civic cooperation?',
    text: 'How does participation in national Harambee (community self-help) projects reflect the Islamic duty of civic cooperation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It puts into practice the Quranic command to "Cooperate in righteousness and piety, and do not cooperate in sin and aggression" (Surah Al-Ma\'idah 5:2)',
      'It proves that communities should rely only on foreign donations',
      'It is done solely for political recognition',
      'It violates the principle of individual worship'
    ],
    correctAnswer: 'It puts into practice the Quranic command to "Cooperate in righteousness and piety, and do not cooperate in sin and aggression" (Surah Al-Ma\'idah 5:2)',
    explanation: 'Surah Al-Ma\'idah 5:2 orders mutual cooperation in Birr (righteousness) and Taqwa (good deeds). Harambee embodies collective community service for the common good.',
    socraticHint: 'Which verse in Surah Al-Ma\'idah urges believers to collaborate for good and shun aggression?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-012',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'Why is tribalism (Asabiyyah / negative ethnic chauvinism) considered destructive and strictly prohibited in Islam?',
    text: 'Why is tribalism (Asabiyyah / negative ethnic chauvinism) considered destructive and strictly prohibited in Islam?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It blinds people to justice, promotes prejudice and nepotism, and divides society into warring factions instead of a unified nation of righteous citizens',
      'It helps build larger schools in rural areas',
      'It is permitted as long as people wear traditional clothes',
      'It guarantees economic success in business'
    ],
    correctAnswer: 'It blinds people to justice, promotes prejudice and nepotism, and divides society into warring factions instead of a unified nation of righteous citizens',
    explanation: 'Prophet Muhammad (SAW) condemned tribalism firmly: "He is not one of us who calls to tribal partisanship, nor who fights for tribalism, nor who dies for tribalism."',
    socraticHint: 'How does tribalism undermine justice and national unity by favoring clans over moral righteousness?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },

  // --- Unit 10 Lesson 2: Earth Stewards and Kenya Nation Builders Challenge (q-g5-ire-u10-013 to 024) ---
  {
    id: 'q-g5-ire-u10-013',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What title and responsibility did Allah bestow upon human beings on Earth according to Surah Al-Baqarah (2:30)?',
    text: 'What title and responsibility did Allah bestow upon human beings on Earth according to Surah Al-Baqarah (2:30)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Khalifah (Stewards / Trustees responsible for caring for and preserving creation)',
      'Tyrants allowed to exploit and pollute nature without restriction',
      'Spectators who have no responsibility toward the environment',
      'Angels of the physical Earth'
    ],
    correctAnswer: 'Khalifah (Stewards / Trustees responsible for caring for and preserving creation)',
    explanation: 'Allah declared to the angels: "Inni ja\'ilun fil-ardi khalifah" ("Indeed, I will make upon the earth a viceregent/steward"), charging humans with sacred stewardship of creation.',
    socraticHint: 'Which Arabic term describes our role as trustees and custodians of Allah\'s creation?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-014',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What did Prophet Muhammad (SAW) tell his companion Sa\'d when he saw him using excessive water for Wudhu?',
    text: 'What did Prophet Muhammad (SAW) tell his companion Sa\'d when he saw him using excessive water for Wudhu?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Do not waste water, even if you are on the banks of a flowing river!"',
      '"Use as much water as you like because it cleanses sins faster"',
      '"Water from rivers cannot be used for prayer"',
      '"Washing quickly is better than washing thoroughly"'
    ],
    correctAnswer: '"Do not waste water, even if you are on the banks of a flowing river!"',
    explanation: 'The Prophet (SAW) prohibited wastefulness (Israf) in water use even if standing beside a boundless flowing river, establishing conservation as an inviolable spiritual discipline.',
    socraticHint: 'Did the Prophet permit water wastage even when an abundant flowing river is right in front of you?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-015',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'According to authentic Hadith, what reward does a Muslim receive when birds, people, or animals eat fruit from a tree they planted?',
    text: 'According to authentic Hadith, what reward does a Muslim receive when birds, people, or animals eat fruit from a tree they planted?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It counts as ongoing charity (Sadaqah Jariyah) for the planter throughout its lifetime',
      'They receive financial compensation from the government',
      'They are granted ownership of wild birds',
      'The fruit becomes tasteless for animals'
    ],
    correctAnswer: 'It counts as ongoing charity (Sadaqah Jariyah) for the planter throughout its lifetime',
    explanation: 'In Sahih Muslim, the Prophet (SAW) taught: "No Muslim plants a tree or sows seeds, and then a bird, person, or animal eats from it, but that it is regarded as a charity (Sadaqah) for him."',
    socraticHint: 'How does planting a fruit-bearing tree continue generating spiritual rewards for the planter even when wild animals eat from it?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-016',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What did the Prophet (SAW) say should be done if the Day of Resurrection begins while a person holds a date-palm sapling in their hand?',
    text: 'What did the Prophet (SAW) say should be done if the Day of Resurrection begins while a person holds a date-palm sapling in their hand?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"If he is able to plant it before he stands up, let him plant it!"',
      '"Throw it away immediately and run away"',
      '"Burn the sapling to produce light"',
      '"Give the sapling to someone else to hold"'
    ],
    correctAnswer: '"If he is able to plant it before he stands up, let him plant it!"',
    explanation: 'In Musnad Ahmad, the Prophet said: "If the Final Hour comes while one of you has a palm shoot in his hand, if he can plant it before standing, let him do so!" underscoring hope and stewardship.',
    socraticHint: 'Does the Prophet urge us to plant the sapling even at the very last second of worldly existence?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-017',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What story did Prophet Muhammad (SAW) narrate regarding a sinful person who was forgiven all sins for showing mercy to an animal?',
    text: 'What story did Prophet Muhammad (SAW) narrate regarding a sinful person who was forgiven all sins for showing mercy to an animal?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'A person drew water in their leather shoe from a deep well to save a panting, dying thirsty dog in the desert heat',
      'A person who bought thousands of horses for a parade',
      'A hunter who captured a wild lion and locked it in a cage',
      'A farmer who trained pigeons to carry trade letters'
    ],
    correctAnswer: 'A person drew water in their leather shoe from a deep well to save a panting, dying thirsty dog in the desert heat',
    explanation: 'The Prophet (SAW) narrated that a traveler climbed down into a well, filled his leather sock with water, and quenched the thirst of a dying dog; Allah appreciated this deed and forgave him.',
    socraticHint: 'Which animal was dying of thirst licking damp sand until a traveler quenched its thirst with water in a leather sock?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-018',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'Conversely, what warning did the Prophet (SAW) give about the woman who was punished in Hellfire regarding a cat?',
    text: 'Conversely, what warning did the Prophet (SAW) give about the woman who was punished in Hellfire regarding a cat?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She imprisoned a cat without feeding it or letting it go free to eat insects and mice from the ground until it starved to death',
      'She allowed the cat to sleep on her clean prayer rug',
      'She gave the cat sweet milk instead of clean water',
      'She bought the cat from a market trader outside Makkah'
    ],
    correctAnswer: 'She imprisoned a cat without feeding it or letting it go free to eat insects and mice from the ground until it starved to death',
    explanation: 'In Sahih al-Bukhari, a woman entered Hellfire because she tied up a cat, refusing to feed it or let it forage for food until it died of starvation, showing cruelty to animals is a grave sin.',
    socraticHint: 'Why was the woman punished: for locking up the cat without food or freedom until it died?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-019',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What is the Islamic ruling regarding bribery (Rashwah) in public offices and judicial decisions?',
    text: 'What is the Islamic ruling regarding bribery (Rashwah) in public offices and judicial decisions?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is strictly Haram (forbidden); Prophet Muhammad (SAW) cursed both the one who gives a bribe and the one who accepts a bribe',
      'It is permissible as long as the amount is small',
      'It is encouraged to speed up government services',
      'It is considered a legitimate form of voluntary charity'
    ],
    correctAnswer: 'It is strictly Haram (forbidden); Prophet Muhammad (SAW) cursed both the one who gives a bribe and the one who accepts a bribe',
    explanation: 'The Prophet (SAW) declared: "La\'ana Allahu ar-rashi wal-murtashi" ("May the curse of Allah be upon the briber and the bribe-taker"). Bribery perverts justice and ruins society.',
    socraticHint: 'Did the Prophet pronounce a curse upon both the giver and the taker of bribes in judgment?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-020',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'How does Kenya’s national initiative to grow 15 billion trees by 2032 align with the prophetic concept of Sadaqah Jariyah?',
    text: 'How does Kenya’s national initiative to grow 15 billion trees by 2032 align with the prophetic concept of Sadaqah Jariyah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Trees fight deforestation and climate change, providing oxygen, shade, and food for future generations, serving as continuous ongoing charity',
      'Trees prevent people from traveling between counties',
      'Trees eliminate the need for agricultural farming',
      'Trees are planted only for timber exports'
    ],
    correctAnswer: 'Trees fight deforestation and climate change, providing oxygen, shade, and food for future generations, serving as continuous ongoing charity',
    explanation: 'Planting trees restores watersheds, combats desertification in arid counties, and brings ongoing blessings (Sadaqah Jariyah) for the planter long after they pass away.',
    socraticHint: 'How do planted trees provide environmental benefits and continuous spiritual rewards for generations to come?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-021',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'Why is public property and infrastructure (such as schools, taps, roads, and hospitals) considered a sacred trust (Amanah) in Islam?',
    text: 'Why is public property and infrastructure (such as schools, taps, roads, and hospitals) considered a sacred trust (Amanah) in Islam?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because public assets belong to the entire community and defacing or vandalizing them harms everyone and violates trust before Allah',
      'Because public property is owned by foreign organizations',
      'Because only police officers are permitted to use public facilities',
      'Because repairing buildings is not allowed in Islamic architecture'
    ],
    correctAnswer: 'Because public assets belong to the entire community and defacing or vandalizing them harms everyone and violates trust before Allah',
    explanation: 'Public resources serve the common welfare. Misusing, damaging, or embezzling public goods is a severe breach of trust (Ghuluwl) that impacts the rights of all citizens.',
    socraticHint: 'Why is vandalizing community property a grave sin that hurts all citizens and violates sacred trust?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-022',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'How can a Grade 5 pupil actively practice water conservation when making Wudhu at school in Kenya?',
    text: 'How can a Grade 5 pupil actively practice water conservation when making Wudhu at school in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By turning off the tap between washings or using a cup/small bowl rather than leaving the water tap running continuously',
      'By washing each limb twenty times',
      'By splashing water across the floor for fun',
      'By leaving the tap fully open while conversing with friends'
    ],
    correctAnswer: 'By turning off the tap between washings or using a cup/small bowl rather than leaving the water tap running continuously',
    explanation: 'Using a small container or gently turning the tap off between washing limbs emulates the Prophet\'s practice of making Wudhu with just one mudd (approx. 650 ml) of water.',
    socraticHint: 'How does using a cup or turning off the tap between limb washings prevent wasting clean tap water?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-023',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'What did the Prophet (SAW) teach about the removal of harmful objects (such as sharp glass or stones) from public roads and paths?',
    text: 'What did the Prophet (SAW) teach about the removal of harmful objects (such as sharp glass or stones) from public roads and paths?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is an authentic act of charity (Sadaqah) and a branch of true faith (Iman)',
      'It should only be done by paid municipal workers',
      'It is a waste of personal time',
      'It is only rewarded if done during the month of Ramadan'
    ],
    correctAnswer: 'It is an authentic act of charity (Sadaqah) and a branch of true faith (Iman)',
    explanation: 'The Prophet (SAW) declared: "Imatatul-adha \'anit-tareeqi sadaqah" ("Removing harmful things from the road is charity") and noted that a person was admitted to Jannah for removing a thorny branch from a pathway.',
    socraticHint: 'Which branch of faith directly involves clearing thorns and sharp debris from where people walk?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  },
  {
    id: 'q-g5-ire-u10-024',
    subStrandId: 'substrand-g5-ire-u10',
    prompt: 'How does combining Islamic moral character (Akhlaq) with diligent academic study help Kenyan pupils build a prosperous and corrupt-free nation?',
    text: 'How does combining Islamic moral character (Akhlaq) with diligent academic study help Kenyan pupils build a prosperous and corrupt-free nation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It equips learners with both technical competence and deep ethical integrity (Amanah), creating honest leaders who serve society with fairness and devotion',
      'It encourages learners to avoid public leadership roles',
      'It focuses solely on accumulating personal wealth at the expense of others',
      'It prevents students from learning modern digital skills'
    ],
    correctAnswer: 'It equips learners with both technical competence and deep ethical integrity (Amanah), creating honest leaders who serve society with fairness and devotion',
    explanation: 'Integrating competence with God-consciousness (Taqwa) and integrity (Amanah) produces incorruptible doctors, engineers, teachers, and leaders who steer Kenya toward justice and prosperity.',
    socraticHint: 'How does uniting academic skills with ethical integrity ensure that future leaders reject corruption and serve the Kenyan people faithfully?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U10'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 5 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
