import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 CRE Batch 5 (Units 9 & 10) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-cre-u9',
    strandId: 'strand-g5-cre-living',
    learningAreaId: 'la-cre-g5',
    title: 'Compassion, Inclusion & Serving the Vulnerable in the Community',
    description: 'Practicing Christ-like compassion, inclusion, and service toward vulnerable populations in Kenya: Caring for orphans and vulnerable children (James 1:27, Psalm 82:3-4); supporting widows and elderly persons (1 Timothy 5:3-4); welcoming and including persons living with disabilities (Luke 14:12-14 - the great banquet feast); showing love and hospitality to refugees, displaced persons, and immigrants (Leviticus 19:33-34, Matthew 25:35); Christian response to poverty, hunger, and disease; community service initiatives (visiting hospitals, community cleanups, charity donations).',
    cbeCompetency: 'Compassion, empathy, inclusive community engagement, social responsibility, and selfless service',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g5-cre-u10',
    strandId: 'strand-g5-cre-living',
    learningAreaId: 'la-cre-g5',
    title: 'Justice, Peace, Integrity & Nation Building in Kenya',
    description: 'Living as faithful Christian citizens in Kenya: Upholding justice, fairness, and the rule of law (Micah 6:8, Amos 5:24); rejecting corruption, bribery, tribalism, and favoritism (Proverbs 17:23, Exodus 23:8); promoting national cohesion and ethnic harmony (Galatians 3:28 - all are one in Christ); obeying lawful authority and paying taxes conscientiously (Romans 13:1-7, Matthew 22:21); peacebuilding, conflict resolution, and patriotism in our schools, villages, and nation; the role of the Church in promoting integrity and social transformation in Kenya.',
    cbeCompetency: 'Civic responsibility, moral courage against corruption, intercultural harmony, peacebuilding, and national patriotism',
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
    id: 'lesson-g5-cre-u9-l1',
    subStrandId: 'substrand-g5-cre-u9',
    title: 'Pure Religion: Caring for Orphans, Widows, and the Elderly',
    content: 'True Christian faith is demonstrated not merely by religious words, but by concrete acts of mercy toward vulnerable members of society. In James 1:27, Scripture defines genuine spirituality: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world." In Old Testament Israel and in modern Kenya, orphans and widows frequently face economic vulnerability, social isolation, and loss of property rights. In Psalm 82:3-4, God commands: "Defend the weak and the fatherless; uphold the cause of the poor and the oppressed. Rescue the weak and the needy." The Apostle Paul in 1 Timothy 5:3-4 instructs families to honor widows and practice their religion first by caring for their own parents and grandparents, "for this is pleasing to God." Kenyan Christians put this into practice through church orphanages, food donation drives, home visits to elderly neighbors, and defending widows from unlawful land grabbing.',
    didYouKnow: 'In biblical times, the gleaning laws (Leviticus 19:9-10) required farmers to leave the edges of their harvested fields unpicked so poor travelers, widows, and orphans could gather food with dignity!',
    kenyanContext: 'In Machakos and Kisumu counties, Christian youth fellowships organize "Mercy Saturdays," chopping firewood, fetching water, and weeding vegetable gardens for elderly grandmothers caring for orphaned grandchildren.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u9-l2',
    subStrandId: 'substrand-g5-cre-u9',
    title: 'Inclusion, Hospitality, and Serving Persons with Disabilities',
    content: 'Jesus modeled radical social inclusion, deliberately associating with individuals marginalized by society. In Luke 14:12-14, Jesus taught about true hospitality at the Great Banquet: "When you give a banquet, invite the poor, the crippled, the lame, the blind, and you will be blessed. Although they cannot repay you, you will be repaid at the resurrection of the righteous." Society often discriminates against persons living with physical, visual, hearing, or intellectual disabilities. In contrast, the Church affirms that every person is created in God’s image with inherent dignity and spiritual worth. Jesus also commanded hospitality toward strangers, refugees, and immigrants. In Leviticus 19:33-34, God commanded Israel: "When a foreigner resides among you in your land, do not mistreat them. The foreigner residing among you must be treated as your native-born. Love them as yourself, for you were foreigners in Egypt." In Matthew 25:35, Jesus identified with the vulnerable, saying: "I was a stranger and you invited me in... Whatever you did for one of the least of these brothers and sisters of mine, you did for me."',
    didYouKnow: 'Kenya hosts one of the largest refugee complexes in the world at Dadaab and Kakuma, where Christian aid agencies provide schooling, healthcare, and clean water to families fleeing drought and conflict!',
    kenyanContext: 'At Joytown School in Thika, a Christian institution for learners with physical disabilities, students excel in academics and sports, demonstrating that God-given potential flourishes when inclusion is practiced.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u10-l1',
    subStrandId: 'substrand-g5-cre-u10',
    title: 'Biblical Justice, Rejecting Corruption, and Respecting Authority',
    content: 'God is a God of justice, righteousness, and truth. The prophet Micah summarized God’s moral requirement for all humanity in Micah 6:8: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God." The prophet Amos thundered against social injustice, dishonest business weights, and oppression of the poor, declaring in Amos 5:24: "Let justice roll on like a river, righteousness like a never-failing stream!" Corruption and bribery destroy societies, rob schools of resources, and undermine trust. Exodus 23:8 commands: "Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent." Proverbs 17:23 notes that the wicked accept bribes in secret to pervert the course of justice. Christians in Kenya are called to be models of integrity: refusing bribes, reporting corrupt acts, obeying traffic laws, respecting elected and civil authorities (Romans 13:1-7), paying taxes honestly, and honoring God in public service.',
    didYouKnow: 'The prophet Amos was not a professional priest or royal courtier, but an ordinary shepherd and tender of sycamore-fig trees from Tekoa whom God called to speak truth to powerful kings!',
    kenyanContext: 'Kenyan Christian leaders and the National Council of Churches of Kenya (NCCK) actively champion anti-corruption campaigns, educating citizens that accepting bribes during elections compromises the future of the nation.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u10-l2',
    subStrandId: 'substrand-g5-cre-u10',
    title: 'National Cohesion, Peacebuilding, and Building a United Kenya',
    content: 'Kenya is a blessed and diverse nation made up of over forty ethnic communities, diverse traditions, and cultural heritage. The Bible teaches that our shared identity in Christ transcends all ethnic, social, and racial divisions. In Galatians 3:28, the Apostle Paul declares: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus." Negative ethnicity (tribalism) causes division, suspicion, and hatred, directly contradicting Christ’s commandment of love. Christians are called to be proactive ambassadors of peace and national cohesion. In Romans 12:18, Scripture urges: "If it is possible, as far as it depends on you, live at peace with everyone." Jesus proclaimed in Matthew 5:9: "Blessed are the peacemakers, for they will be called children of God." Learners build a cohesive Kenya by celebrating cultural diversity, making friends across ethnic boundaries at school, speaking kindly of all communities, rejecting tribal stereotypes, and working together to build a prosperous, peaceful, and godly nation.',
    didYouKnow: 'The first stanza of the Kenya National Anthem is actually a prayer to God: "O God of all creation, bless this our land and nation; justice be our shield and defender; may we dwell in unity, peace and liberty; plenty be found within our borders!"',
    kenyanContext: 'During the Kenya National Drama and Music Festivals, primary school learners from diverse counties perform cultural folk songs from other communities, celebrating our rich national mosaic of unity in diversity.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 5 Missions (Missions 65, 66, 67, 68 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-cre-u9-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u9',
    lessonId: 'lesson-g5-cre-u9-l1',
    title: 'Hands of Mercy & Orphan Care Quest',
    description: 'Put pure religion into practice by defending orphans, honoring widows, and bringing God’s compassionate warmth to the elderly in our Kenyan villages and towns!',
    order: 65,
    orderIndex: 65,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-pure-religion',
    badge: { name: 'Mercy Champion', icon: 'heart' },
    questionIds: [
      'q-g5-cre-u9-001', 'q-g5-cre-u9-002', 'q-g5-cre-u9-003', 'q-g5-cre-u9-004',
      'q-g5-cre-u9-005', 'q-g5-cre-u9-006', 'q-g5-cre-u9-007', 'q-g5-cre-u9-008',
      'q-g5-cre-u9-009', 'q-g5-cre-u9-010', 'q-g5-cre-u9-011', 'q-g5-cre-u9-012'
    ]
  },
  {
    id: 'mission-g5-cre-u9-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u9',
    lessonId: 'lesson-g5-cre-u9-l2',
    title: 'Radical Inclusion & Hospitality Challenge',
    description: 'Throw open the banquet doors for persons with disabilities, welcome displaced refugees with open arms, and serve Christ by uplifting the least of our brothers and sisters!',
    order: 66,
    orderIndex: 66,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-radical-inclusion',
    badge: { name: 'Hospitality Hero', icon: 'users' },
    questionIds: [
      'q-g5-cre-u9-013', 'q-g5-cre-u9-014', 'q-g5-cre-u9-015', 'q-g5-cre-u9-016',
      'q-g5-cre-u9-017', 'q-g5-cre-u9-018', 'q-g5-cre-u9-019', 'q-g5-cre-u9-020',
      'q-g5-cre-u9-021', 'q-g5-cre-u9-022', 'q-g5-cre-u9-023', 'q-g5-cre-u9-024'
    ]
  },
  {
    id: 'mission-g5-cre-u10-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u10',
    lessonId: 'lesson-g5-cre-u10-l1',
    title: 'Champions of Justice & Anti-Corruption Quest',
    description: 'Answer the call of Micah and Amos: act justly, love mercy, reject every form of bribery, and stand as an unshakeable pillar of integrity in Kenya!',
    order: 67,
    orderIndex: 67,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-justice-champion',
    badge: { name: 'Justice Defender', icon: 'shield' },
    questionIds: [
      'q-g5-cre-u10-001', 'q-g5-cre-u10-002', 'q-g5-cre-u10-003', 'q-g5-cre-u10-004',
      'q-g5-cre-u10-005', 'q-g5-cre-u10-006', 'q-g5-cre-u10-007', 'q-g5-cre-u10-008',
      'q-g5-cre-u10-009', 'q-g5-cre-u10-010', 'q-g5-cre-u10-011', 'q-g5-cre-u10-012'
    ]
  },
  {
    id: 'mission-g5-cre-u10-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u10',
    lessonId: 'lesson-g5-cre-u10-l2',
    title: 'Kenya Cohesion & Peacebuilders Challenge',
    description: 'Celebrate our oneness in Christ across all forty-plus ethnic communities, break down tribal walls, and unite as peacemakers to build a peaceful, prosperous Kenya!',
    order: 68,
    orderIndex: 68,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-kenya-peacebuilder',
    badge: { name: 'National Peacemaker', icon: 'award' },
    questionIds: [
      'q-g5-cre-u10-013', 'q-g5-cre-u10-014', 'q-g5-cre-u10-015', 'q-g5-cre-u10-016',
      'q-g5-cre-u10-017', 'q-g5-cre-u10-018', 'q-g5-cre-u10-019', 'q-g5-cre-u10-020',
      'q-g5-cre-u10-021', 'q-g5-cre-u10-022', 'q-g5-cre-u10-023', 'q-g5-cre-u10-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 5 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 9 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u9-001',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How does James 1:27 define pure and faultless religion before God the Father?',
    text: 'How does James 1:27 define pure and faultless religion before God the Father?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To look after orphans and widows in their distress and keep oneself from being polluted by the world',
      'To build the tallest church tower in the county with golden bells',
      'To fast for three days every week while ignoring poor neighbors',
      'To memorize religious texts without ever helping anyone in need'
    ],
    correctAnswer: 'To look after orphans and widows in their distress and keep oneself from being polluted by the world',
    explanation: 'James 1:27 defines pure religion: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world."',
    socraticHint: 'Which two vulnerable groups are specifically highlighted as receiving care in pure religion?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-002',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'What command regarding vulnerable people is given in Psalm 82:3-4?',
    text: 'What command regarding vulnerable people is given in Psalm 82:3-4?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Defend the weak and the fatherless; uphold the cause of the poor and the oppressed',
      'Ignore the cries of the poor so they learn to work harder',
      'Collect taxes only from widows and fatherless children',
      'Expel foreigners and poor people from the city gates'
    ],
    correctAnswer: 'Defend the weak and the fatherless; uphold the cause of the poor and the oppressed',
    explanation: 'Psalm 82:3-4 commands believers: "Defend the weak and the fatherless; uphold the cause of the poor and the oppressed. Rescue the weak and the needy; deliver them from the hand of the wicked."',
    socraticHint: 'What divine command requires believers to stand up for the weak and fatherless against injustice?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-003',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In 1 Timothy 5:4, who does the Apostle Paul say has the primary responsibility to support elderly widows?',
    text: 'In 1 Timothy 5:4, who does the Apostle Paul say has the primary responsibility to support elderly widows?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Their own children and grandchildren, putting their religion into practice by repaying their parents',
      'Foreign tourists visiting the country on holidays',
      'The Roman emperor through military distributions',
      'Only international charity non-governmental organizations'
    ],
    correctAnswer: 'Their own children and grandchildren, putting their religion into practice by repaying their parents',
    explanation: 'Paul teaches that if a widow has children or grandchildren, they should learn first of all to put their religion into practice by caring for their own family and repaying their parents, for this pleases God.',
    socraticHint: 'Which family members are biblically responsible for caring for their own elderly mothers and grandmothers?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-004',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How did ancient Israelite harvesting laws (gleaning laws in Leviticus 19:9-10) protect widows and orphans?',
    text: 'How did ancient Israelite harvesting laws (gleaning laws in Leviticus 19:9-10) protect widows and orphans?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Farmers were forbidden from harvesting the field edges or picking dropped grapes, leaving them for the poor and foreigners to gather',
      'Widows were forced to buy all grain directly from royal government stores at double price',
      'Poor travelers were prohibited from setting foot on agricultural fields',
      'All leftover crops had to be burned with fire to keep the fields clean'
    ],
    correctAnswer: 'Farmers were forbidden from harvesting the field edges or picking dropped grapes, leaving them for the poor and foreigners to gather',
    explanation: 'Leviticus 19:9-10 instructed landowners not to reap to the very edges of their field or gather fallen grapes, deliberately leaving grain for the poor, fatherless, and foreigners to gather with dignity.',
    socraticHint: 'How did leaving the edges of fields unharvested provide food for the fatherless and widows?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-005',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In our Kenyan community, unscrupulous relatives attempt to chase a widowed mother and her children off her deceased husband’s land. What is the Christian response?',
    text: 'In our Kenyan community, unscrupulous relatives attempt to chase a widowed mother and her children off her deceased husband’s land. What is the Christian response?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Stand with the widow, defend her lawful rights, and seek support from church elders and local authorities to protect her family',
      'Help the relatives grab the land because the widow has no male guardian',
      'Laugh at the children and tell them to find another piece of land in the forest',
      'Remain completely neutral because land disputes are none of our business'
    ],
    correctAnswer: 'Stand with the widow, defend her lawful rights, and seek support from church elders and local authorities to protect her family',
    explanation: 'God is the "defender of widows" (Psalm 68:5). Defending vulnerable widows and orphans from illegal land dispossession is an essential expression of Christian justice and biblical obedience.',
    socraticHint: 'How does defending a vulnerable widow against land grabbing reflect God’s command to protect the fatherless?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-006',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How can Grade 5 learners in Kenya participate in caring for orphaned children in their locality?',
    text: 'How can Grade 5 learners in Kenya participate in caring for orphaned children in their locality?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Contributing clothes, books, and food to children’s homes, visiting them to play together, and showing genuine friendship',
      'Teasing orphaned classmates at school because they do not have parents at visiting day',
      'Refusing to sit next to orphaned pupils in the classroom or share pencils with them',
      'Demanding payment before allowing orphaned children to join playground games'
    ],
    correctAnswer: 'Contributing clothes, books, and food to children’s homes, visiting them to play together, and showing genuine friendship',
    explanation: 'Children can show Christ-like compassion by contributing gently used clothes, stationery, and food, visiting children’s homes, and treating orphaned peers with warmth, dignity, and inclusive love.',
    socraticHint: 'Which actions show practical kindness, sharing, and authentic friendship toward children without parents?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-007',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In Luke 7:11-15, what deep emotion moved Jesus when He saw a widow in the town of Nain mourning her only son?',
    text: 'In Luke 7:11-15, what deep emotion moved Jesus when He saw a widow in the town of Nain mourning her only son?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'His heart went out to her with deep compassion, and He said, "Don’t cry," before raising the young man to life',
      'He was annoyed by the noise of the funeral procession and walked around the town',
      'He asked the crowd how much money they had collected for the burial',
      'He told the mother that losing an only son was a punishment for her past deeds'
    ],
    correctAnswer: 'His heart went out to her with deep compassion, and He said, "Don’t cry," before raising the young man to life',
    explanation: 'Luke 7:13 records that when the Lord saw the grieving widow, "his heart went out to her and he said, ‘Don’t cry.’" He touched the coffin and raised the young man back to life, restoring him to his mother.',
    socraticHint: 'What tender divine compassion moved Jesus when He saw the grieving widow of Nain?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-008',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'What does Proverbs 19:17 teach about showing generosity to the poor and needy?',
    text: 'What does Proverbs 19:17 teach about showing generosity to the poor and needy?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Whoever is kind to the poor lends to the Lord, and He will reward them for what they have done',
      'Giving to the poor causes a person to run out of money quickly',
      'The poor should only be given help if they agree to work as domestic servants',
      'God pays no attention to whether we help the needy or ignore them'
    ],
    correctAnswer: 'Whoever is kind to the poor lends to the Lord, and He will reward them for what they have done',
    explanation: 'Proverbs 19:17 says: "Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done." Kindness to the underprivileged is counted as service to God Himself.',
    socraticHint: 'According to Proverbs 19, who are we lending to when we show kindness to the poor?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-009',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How can a church fellowship in Kenya help elderly grandmothers (shoshos) in rural villages who struggle with arthritis?',
    text: 'How can a church fellowship in Kenya help elderly grandmothers (shoshos) in rural villages who struggle with arthritis?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Organizing youth teams to fetch firewood and water, weed kitchen gardens, and provide warm blankets and food hampers',
      'Leaving them to manage on their own because old age is a natural process',
      'Demanding that they attend church meetings three times a day despite physical pain',
      'Telling them to walk five kilometers to the nearest borehole every morning'
    ],
    correctAnswer: 'Organizing youth teams to fetch firewood and water, weed kitchen gardens, and provide warm blankets and food hampers',
    explanation: 'Practical Christian service eases physical burdens for the elderly through home visits, domestic assistance, provision of warm essentials, and medical support.',
    socraticHint: 'Which practical assistance with household tasks and warm essentials helps elderly people in villages?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-010',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In Acts 9:36-39, what generous deeds was the disciple Tabitha (Dorcas) celebrated for in Joppa before Peter raised her from the dead?',
    text: 'In Acts 9:36-39, what generous deeds was the disciple Tabitha (Dorcas) celebrated for in Joppa before Peter raised her from the dead?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She was always doing good and helping the poor, making robes and other clothing for poor widows',
      'She traded expensive purple dyed wool to Roman senators in Caesarea',
      'She built huge stone monuments to honour the apostles across Judea',
      'She composed battle hymns for the Jewish freedom fighters'
    ],
    correctAnswer: 'She was always doing good and helping the poor, making robes and other clothing for poor widows',
    explanation: 'Acts 9:36-39 describes Dorcas as a woman full of good works and acts of charity. Widows stood around weeping, showing the tunics and garments she had sewn for them while she was with them.',
    socraticHint: 'What practical clothing did Dorcas lovingly sew with her own hands to clothe poor widows?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-011',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'Why does God repeatedly identify Himself in Scripture as the "Father to the fatherless, a defender of widows" (Psalm 68:5)?',
    text: 'Why does God repeatedly identify Himself in Scripture as the "Father to the fatherless, a defender of widows" (Psalm 68:5)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To reveal His special tender care for the most powerless and ensure His people prioritize justice for the defenseless',
      'Because earthly fathers are completely unnecessary in God’s design',
      'Because widows and orphans have no need for food, shelter, or community support',
      'To show that God is only interested in people who live in rural villages'
    ],
    correctAnswer: 'To reveal His special tender care for the most powerless and ensure His people prioritize justice for the defenseless',
    explanation: 'God’s character is defined by righteousness and tender mercy toward those without earthly protectors. By revealing Himself as their defender, He commands His people to reflect that same protective love.',
    socraticHint: 'Why does God declare Himself the protector of those who lack earthly defenders in society?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-012',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'Which of the following attitudes violates Christian teaching when interacting with street children in Kenyan towns?',
    text: 'Which of the following attitudes violates Christian teaching when interacting with street children in Kenyan towns?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Viewing them with disgust, calling them criminals, and ignoring their human dignity and trauma',
      'Supporting feeding programs and rehabilitation shelters that rescue and educate them',
      'Recognizing that they are children created in the image of God who need love and care',
      'Praying for their safety and supporting community initiatives to reunite them with families'
    ],
    correctAnswer: 'Viewing them with disgust, calling them criminals, and ignoring their human dignity and trauma',
    explanation: 'Christ calls us to love the vulnerable with empathy. Contempt and dehumanization violate Christ’s teaching that "whatever you did for one of the least of these, you did for me" (Matthew 25:40).',
    socraticHint: 'Which contemptuous attitude denies the divine image and sacred dignity of vulnerable street children?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },

  // ==========================================
  // Unit 9 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u9-013',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In Luke 14:12-14, whom did Jesus instruct a banquet host to invite if they desire true heavenly blessing?',
    text: 'In Luke 14:12-14, whom did Jesus instruct a banquet host to invite if they desire true heavenly blessing?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The poor, the crippled, the lame, and the blind who cannot repay you',
      'Wealthy business executives who can give you big contracts',
      'The Roman governor and palace dignitaries to gain political favor',
      'Only close family relatives who will invite you to their luxury banquets'
    ],
    correctAnswer: 'The poor, the crippled, the lame, and the blind who cannot repay you',
    explanation: 'Jesus said: "When you give a banquet, invite the poor, the crippled, the lame, the blind, and you will be blessed. Although they cannot repay you, you will be repaid at the resurrection of the righteous."',
    socraticHint: 'Which marginalized group that cannot repay you did Jesus command us to invite to feasts?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-014',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How did King David demonstrate extraordinary covenant kindness (hesed) to Mephibosheth, Jonathan’s crippled son (2 Samuel 9)?',
    text: 'How did King David demonstrate extraordinary covenant kindness (hesed) to Mephibosheth, Jonathan’s crippled son (2 Samuel 9)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He restored all his grandfather Saul’s land to him and welcomed him to eat permanently at the king’s royal table',
      'He had him banished to a distant fortress in the desert so no one saw his disability',
      'He ordered him to serve as a foot soldier in the army against the Philistines',
      'He confiscated all his livestock and gave them to palace servants'
    ],
    correctAnswer: 'He restored all his grandfather Saul’s land to him and welcomed him to eat permanently at the king’s royal table',
    explanation: 'David sought out Mephibosheth, who was crippled in both feet, restored all of Saul’s inheritance to him, and said: "You will always eat at my table," modeling unconditional covenant mercy and inclusion.',
    socraticHint: 'How did King David honor and include Jonathan’s crippled son at the royal banquet table?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-015',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How should a Kenyan primary school class include a new pupil who uses a wheelchair?',
    text: 'How should a Kenyan primary school class include a new pupil who uses a wheelchair?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ensure paths and classroom entrances have smooth ramps, assist with moving between desks, and include them in games and group discussions',
      'Leave the pupil outside the classroom door during assembly and lunch breaks',
      'Stare at the wheelchair and laugh when they try to move up steps',
      'Tell the pupil that sports day and clubs are strictly reserved for walking students'
    ],
    correctAnswer: 'Ensure paths and classroom entrances have smooth ramps, assist with moving between desks, and include them in games and group discussions',
    explanation: 'Inclusion means removing physical and social barriers, ensuring accessibility, showing respectful assistance, and treating classmates with disabilities as equal, valued members of the school family.',
    socraticHint: 'Which actions show thoughtful accessibility, helpfulness, and equal participation for a wheelchair user?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-016',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'What command regarding foreign immigrants and refugees does God give in Leviticus 19:33-34?',
    text: 'What command regarding foreign immigrants and refugees does God give in Leviticus 19:33-34?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Treat the foreigner residing among you as your native-born. Love them as yourself, for you were foreigners in Egypt',
      'Expel all foreigners from the borders immediately without food or water',
      'Charge foreigners five times higher prices for food in the marketplace',
      'Forbid foreigners from worshiping the Lord God of Israel'
    ],
    correctAnswer: 'Treat the foreigner residing among you as your native-born. Love them as yourself, for you were foreigners in Egypt',
    explanation: 'Leviticus 19:33-34 commands: "When a foreigner resides among you in your land, do not mistreat them. The foreigner residing among you must be treated as your native-born. Love them as yourself, for you were foreigners in Egypt. I am the Lord your God."',
    socraticHint: 'How does God command His people to treat foreign residents as native-born and love them as themselves?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-017',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In Matthew 25:35-40, with which group of people does Jesus deeply identify Himself when describing the final judgment?',
    text: 'In Matthew 25:35-40, with which group of people does Jesus deeply identify Himself when describing the final judgment?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The hungry, the thirsty, the stranger, the naked, the sick, and the imprisoned ("the least of these")',
      'The victorious Roman generals marching into cities with trophies',
      'The wealthy merchants who owned fleets of trade ships',
      'The high priests presiding over the temple treasury'
    ],
    correctAnswer: 'The hungry, the thirsty, the stranger, the naked, the sick, and the imprisoned ("the least of these")',
    explanation: 'Jesus declared: "I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you invited me in... Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."',
    socraticHint: 'With which hungry, thirsty, sick, and vulnerable individuals did the King identify as "the least of these"?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-018',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'Kenya hosts thousands of refugees fleeing war from neighboring countries in camps like Kakuma and Dadaab. What is the Christian duty toward these displaced families?',
    text: 'Kenya hosts thousands of refugees fleeing war from neighboring countries in camps like Kakuma and Dadaab. What is the Christian duty toward these displaced families?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Show hospitality, provide food, clean water, and education, and treat them with dignity and Christ-like love',
      'Blame them for all economic problems in Kenya and demand their immediate expulsion into conflict zones',
      'Refuse to share any international relief supplies with their children',
      'Bar them from attending Christian worship services in Kenya'
    ],
    correctAnswer: 'Show hospitality, provide food, clean water, and education, and treat them with dignity and Christ-like love',
    explanation: 'Christians follow Christ’s command of hospitality (Matthew 25:35, Hebrews 13:2) by welcoming refugees, defending their human rights, providing humanitarian aid, and showing compassion to displaced families.',
    socraticHint: 'How does offering humanitarian aid, shelter, and love to displaced refugees fulfill Christ’s command of hospitality?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-019',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In John 9:1-3, when the disciples asked whether a blind man was born blind because of his own sin or his parents’ sin, how did Jesus correct them?',
    text: 'In John 9:1-3, when the disciples asked whether a blind man was born blind because of his own sin or his parents’ sin, how did Jesus correct them?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Neither this man nor his parents sinned; this happened so that the works of God might be displayed in him',
      'His parents committed a secret crime in Jerusalem',
      'The man sinned while he was an infant in his mother’s arms',
      'God curses children with physical blindness whenever communities break laws'
    ],
    correctAnswer: 'Neither this man nor his parents sinned; this happened so that the works of God might be displayed in him',
    explanation: 'Jesus completely rejected the superstitious belief that disability is a punishment for personal or parental sin, stating that it occurred so that God’s glory and healing grace could be revealed in his life.',
    socraticHint: 'How did Jesus refute the superstitious idea that disabilities are caused by parental or personal curses?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-020',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'A student who is deaf joins Grade 5. Some classmates giggle when the student uses Kenyan Sign Language (KSL). What should a Christian classmate do?',
    text: 'A student who is deaf joins Grade 5. Some classmates giggle when the student uses Kenyan Sign Language (KSL). What should a Christian classmate do?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Stop the giggling classmates, learn basic sign language greetings to communicate, and welcome the student warmly into class activities',
      'Join in giggling to avoid feeling left out by the popular group in class',
      'Ignore the deaf student completely and pretend they are invisible',
      'Tell the teacher that deaf children should not be allowed in ordinary primary schools'
    ],
    correctAnswer: 'Stop the giggling classmates, learn basic sign language greetings to communicate, and welcome the student warmly into class activities',
    explanation: 'Christian love defends the vulnerable and practices inclusion. Defending the student from mockery and making the effort to learn Kenyan Sign Language (KSL) honors God and builds a loving community.',
    socraticHint: 'Which proactive response defends the student against mockery and builds communication through sign language?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-021',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'What did the Apostle Paul teach in Galatians 6:2 about sharing communal burdens in the Christian fellowship?',
    text: 'What did the Apostle Paul teach in Galatians 6:2 about sharing communal burdens in the Christian fellowship?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Carry each other’s burdens, and in this way you will fulfill the law of Christ',
      'Let everyone carry only their own load and never assist another person',
      'Charge a fee whenever you help a neighbor carry heavy luggage',
      'Only carry the burdens of people who belong to your clan'
    ],
    correctAnswer: 'Carry each other’s burdens, and in this way you will fulfill the law of Christ',
    explanation: 'Galatians 6:2 commands: "Carry each other’s burdens, and in this way you will fulfill the law of Christ." Helping others through sickness, grief, poverty, and challenges fulfills Christ’s law of love.',
    socraticHint: 'What command to bear one another’s burdens fulfills the royal law of Christ?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-022',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'In Luke 10:33, what made the Samaritan’s response to the beaten traveler on the road so exceptional compared to the religious leaders?',
    text: 'In Luke 10:33, what made the Samaritan’s response to the beaten traveler on the road so exceptional compared to the religious leaders?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He had compassion that translated into immediate, costly, and practical action',
      'He delivered a long theological speech about why bad things happen to good people',
      'He took the traveler’s wallet and brought it to the temple in Jerusalem',
      'He walked past even faster because he had an urgent business appointment in Jericho'
    ],
    correctAnswer: 'He had compassion that translated into immediate, costly, and practical action',
    explanation: 'Unlike the priest and Levite who saw the man and passed by, the Samaritan felt compassion and took immediate, costly action—bandaging wounds, providing transportation, and paying an innkeeper.',
    socraticHint: 'Did the Samaritan merely feel sorry, or did his compassion lead to immediate, practical, and costly aid?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-023',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'How does practicing hospitality toward strangers reflect Hebrews 13:2?',
    text: 'How does practicing hospitality toward strangers reflect Hebrews 13:2?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it',
      'Never open your door to anyone who does not possess a government identification card',
      'Hospitality should only be practiced when strangers bring expensive gold gifts',
      'Strangers should always be reported to the village chief before being given water'
    ],
    correctAnswer: 'Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it',
    explanation: 'Hebrews 13:2 reminds believers: "Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it," recalling Abraham hosting divine messengers in Genesis 18.',
    socraticHint: 'What surprising heavenly beings might believers entertain unknowingly when showing hospitality to strangers?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },
  {
    id: 'q-g5-cre-u9-024',
    subStrandId: 'substrand-g5-cre-u9',
    prompt: 'What profound theological truth explains why Christians are compelled to serve persons with disabilities, orphans, and refugees?',
    text: 'What profound theological truth explains why Christians are compelled to serve persons with disabilities, orphans, and refugees?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Every human being is created in the image of God (Imago Dei) and loved by Christ; serving them is directly serving Jesus Himself',
      'Because the United Nations requires all religious groups to perform charitable tasks',
      'Because wealthy people have an excess of money that must be thrown away',
      'Because good deeds guarantee that a person will become a political leader in Kenya'
    ],
    correctAnswer: 'Every human being is created in the image of God (Imago Dei) and loved by Christ; serving them is directly serving Jesus Himself',
    explanation: 'The Christian motivation for service is rooted in the sacred dignity of every person created in God’s image and Christ’s declaration that serving the vulnerable is serving Him (Matthew 25:40).',
    socraticHint: 'How does recognizing God’s image in every person and serving Christ in them motivate Christian charity?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U9'
  },

  // ==========================================
  // Unit 10 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u10-001',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What threefold summary of God’s moral requirement for human beings is proclaimed in Micah 6:8?',
    text: 'What threefold summary of God’s moral requirement for human beings is proclaimed in Micah 6:8?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To act justly, to love mercy, and to walk humbly with your God',
      'To build large stone palaces, accumulate silver coins, and conquer foreign lands',
      'To offer thousands of burnt sacrifices and rivers of olive oil without changing one’s heart',
      'To attend religious festivals while taking bribes from merchants'
    ],
    correctAnswer: 'To act justly, to love mercy, and to walk humbly with your God',
    explanation: 'Micah 6:8 states: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."',
    socraticHint: 'Which famous verse calls humanity to act justly, love mercy, and walk humbly with God?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-002',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Amos 5:24, what powerful imagery does the prophet Amos use to describe the unstoppable flow of justice and righteousness?',
    text: 'In Amos 5:24, what powerful imagery does the prophet Amos use to describe the unstoppable flow of justice and righteousness?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Let justice roll on like a river, righteousness like a never-failing stream',
      'Let justice stand still like a stagnant muddy puddle in the road',
      'Let righteousness evaporate like dew in the morning sunshine',
      'Let justice be sold in the market like wheat and olive oil'
    ],
    correctAnswer: 'Let justice roll on like a river, righteousness like a never-failing stream',
    explanation: 'Amos 5:24 declares: "But let justice roll on like a river, righteousness like a never-failing stream!" True worship must result in active societal justice and defense of the oppressed.',
    socraticHint: 'Which water imagery compares justice to a rolling river and righteousness to a never-failing stream?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-003',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What clear command against accepting bribes is given in Exodus 23:8?',
    text: 'What clear command against accepting bribes is given in Exodus 23:8?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent',
      'Accept bribes as long as you use half of the money to support your local church',
      'Bribes are acceptable if the government salaries are too low to pay school fees',
      'Only judges are forbidden from accepting bribes while police officers may take them'
    ],
    correctAnswer: 'Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent',
    explanation: 'Exodus 23:8 strictly commands: "Do not accept a bribe, for a bribe blinds those who see and twists the words of the innocent." Bribery corrupts justice and oppresses the innocent.',
    socraticHint: 'Why does God forbid bribes, noting that they blind clear vision and subvert justice?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-004',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What warning does Proverbs 17:23 give concerning corrupt practices in judicial and leadership matters?',
    text: 'What warning does Proverbs 17:23 give concerning corrupt practices in judicial and leadership matters?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The wicked accept secret bribes to pervert the course of justice',
      'Accepting gifts from travelers brings honor to the royal palace',
      'Bribery is a wise method to settle difficult court cases quickly',
      'God blesses whoever collects the most bribes in public office'
    ],
    correctAnswer: 'The wicked accept secret bribes to pervert the course of justice',
    explanation: 'Proverbs 17:23 states: "The wicked accept bribes in secret to pervert the course of justice." Secret bribes subvert fairness, denying justice to the innocent and honest.',
    socraticHint: 'What does Proverbs say wicked people accept in secret to pervert justice?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-005',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What does Romans 13:1-7 teach regarding a Christian’s civic duty toward lawful governing authorities and the paying of taxes?',
    text: 'What does Romans 13:1-7 teach regarding a Christian’s civic duty toward lawful governing authorities and the paying of taxes?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Submit to governing authorities, obey just laws, and pay taxes and revenue honestly as responsible citizens',
      'Refuse to obey all civil laws because Christians have their own heavenly kingdom',
      'Evade paying taxes by hiding money in secret foreign bank accounts',
      'Overthrow the government by force whenever a traffic police officer stops your car'
    ],
    correctAnswer: 'Submit to governing authorities, obey just laws, and pay taxes and revenue honestly as responsible citizens',
    explanation: 'Romans 13:1-7 instructs believers to respect governing authorities, live law-abiding lives, and pay taxes conscientiously: "Give to everyone what you owe them: If you owe taxes, pay taxes; if revenue, then revenue; if respect, then respect; if honor, then honor."',
    socraticHint: 'How are Christians commanded to relate to governing authorities and fulfill civic duties like paying taxes?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-006',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Matthew 22:21, what famous principle of dual citizenship and civic duty did Jesus establish when questioned about paying taxes to Caesar?',
    text: 'In Matthew 22:21, what famous principle of dual citizenship and civic duty did Jesus establish when questioned about paying taxes to Caesar?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Give to Caesar what belongs to Caesar, and to God what belongs to God',
      'Refuse to touch Roman coins because they are unclean pagan metal',
      'Take Caesar’s money and use it to buy weapons for the temple guards',
      'Christians are exempt from paying any earthly taxes to governments'
    ],
    correctAnswer: 'Give to Caesar what belongs to Caesar, and to God what belongs to God',
    explanation: 'Jesus said: "Give back to Caesar what is Caesar’s, and to God what is God’s." Christians have a dual duty: fulfilling civic obligations to legitimate earthly government while giving their ultimate devotion and worship to God.',
    socraticHint: 'Which famous statement divided civic obligation to the state from ultimate devotion to God?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-007',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'A voter is offered 500 shillings by a politician’s agent to vote for a corrupt candidate in a general election. How should a Christian voter respond?',
    text: 'A voter is offered 500 shillings by a politician’s agent to vote for a corrupt candidate in a general election. How should a Christian voter respond?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Firmly reject the bribe, report the election offense, and vote conscientiously for a person of integrity and servant leadership',
      'Take the money, buy meat for dinner, and vote for the candidate who gave the cash',
      'Take money from all candidates and vote for whoever paid the highest amount',
      'Stay at home on election day because all politicians are dishonest'
    ],
    correctAnswer: 'Firmly reject the bribe, report the election offense, and vote conscientiously for a person of integrity and servant leadership',
    explanation: 'Voter bribery corrupts democracy and violates Exodus 23:8. Christian citizenship requires standing against corruption, refusing voter bribery, and voting with a clear conscience for candidates with moral integrity.',
    socraticHint: 'Why is rejecting voter bribery essential for protecting democracy and honoring Christian integrity?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-008',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'How did John the Baptist instruct tax collectors who came to be baptized in Luke 3:12-13?',
    text: 'How did John the Baptist instruct tax collectors who came to be baptized in Luke 3:12-13?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Don’t collect any more than you are required to',
      'Resign from your jobs immediately and become fishermen in Galilee',
      'Charge double tax on Roman soldiers and keep the profits for yourselves',
      'Keep collecting secret bribes from merchants passing through the gates'
    ],
    correctAnswer: 'Don’t collect any more than you are required to',
    explanation: 'John the Baptist told tax collectors: "Don’t collect any more than you are required to." He demanded honesty, fair weights, and complete integrity in public revenue collection.',
    socraticHint: 'What simple standard of financial honesty did John the Baptist demand of tax collectors?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-009',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Luke 19:8, how did the corrupt chief tax collector Zacchaeus demonstrate genuine repentance and restitution after encountering Jesus?',
    text: 'In Luke 19:8, how did the corrupt chief tax collector Zacchaeus demonstrate genuine repentance and restitution after encountering Jesus?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He gave half of his possessions to the poor and promised to repay fourfold anyone he had cheated',
      'He promised to build a tall stone watchtower outside the city of Jericho',
      'He gave Jesus a bag of Roman silver coins to secure a seat in heaven',
      'He locked his treasury books in a vault so nobody could audit his past taxes'
    ],
    correctAnswer: 'He gave half of his possessions to the poor and promised to repay fourfold anyone he had cheated',
    explanation: 'Zacchaeus declared: "Look, Lord! Here and now I give half of my possessions to the poor, and if I have cheated anybody out of anything, I will pay back four times the amount." True repentance involves restorative justice.',
    socraticHint: 'What fourfold financial repayment and donation to the poor did Zacchaeus pledge to prove his changed heart?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-010',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'A school prefect in Grade 5 is offered sweets by a classmate to remove their name from the list of noisemakers. What should the prefect do?',
    text: 'A school prefect in Grade 5 is offered sweets by a classmate to remove their name from the list of noisemakers. What should the prefect do?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Politely refuse the sweets, maintain an accurate list, and explain that a leader must be fair and honest',
      'Eat the sweets quickly and erase the name from the list of noisemakers',
      'Demand five more sweets before agreeing to keep the secret',
      'Write down innocent pupils’ names instead to protect the friend'
    ],
    correctAnswer: 'Politely refuse the sweets, maintain an accurate list, and explain that a leader must be fair and honest',
    explanation: 'Refusing petty bribes and upholding fair rules trains young learners in anti-corruption integrity and trustworthy servant leadership, honoring God’s standard of justice.',
    socraticHint: 'How does refusing snacks in exchange for favoring a wrongdoer show anti-corruption integrity in school?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-011',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'Why is corruption referred to as a "cancer" to national development in Kenya from a Christian ethical perspective?',
    text: 'Why is corruption referred to as a "cancer" to national development in Kenya from a Christian ethical perspective?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It steals public funds intended for hospitals, schools, and roads, hurts the poor most, and destroys moral trust in society',
      'It makes currency notes dirty and tear easily in market stalls',
      'It causes too many international tourists to visit game parks in the dry season',
      'It prevents agricultural crops from receiving seasonal rains'
    ],
    correctAnswer: 'It steals public funds intended for hospitals, schools, and roads, hurts the poor most, and destroys moral trust in society',
    explanation: 'Corruption robs communities of vital public services, deprives children of school books, starves hospitals of medicine, and perverts justice, directly violating God’s commands to care for the poor and act justly.',
    socraticHint: 'How does diverting public resources away from hospitals, schools, and roads cause widespread suffering?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-012',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What role should the Church play in Kenya when public leaders engage in corruption and human rights abuses?',
    text: 'What role should the Church play in Kenya when public leaders engage in corruption and human rights abuses?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Act as the prophetic conscience of the nation, fearlessly speaking truth to power, defending the vulnerable, and advocating for justice',
      'Remain completely silent and praise leaders who give large donations regardless of how the money was acquired',
      'Instruct believers to stay away from civic issues and never vote in national elections',
      'Form an army of soldiers to wage civil war against government institutions'
    ],
    correctAnswer: 'Act as the prophetic conscience of the nation, fearlessly speaking truth to power, defending the vulnerable, and advocating for justice',
    explanation: 'Like prophets Nathan, Elijah, and Amos, the Church is called to serve as the prophetic conscience of society—speaking truth to power, exposing corruption, and demanding justice for the oppressed.',
    socraticHint: 'How do biblical prophets model the Church’s calling to act as the moral and prophetic conscience of a nation?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },

  // ==========================================
  // Unit 10 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u10-013',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What revolutionary statement of human unity and equality in Christ does the Apostle Paul proclaim in Galatians 3:28?',
    text: 'What revolutionary statement of human unity and equality in Christ does the Apostle Paul proclaim in Galatians 3:28?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus',
      'Only people born in Jerusalem are eligible to become true citizens of heaven',
      'Men are spiritually superior to women and should receive twice as many blessings',
      'Believers must never eat food with someone who speaks a different mother tongue'
    ],
    correctAnswer: 'There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus',
    explanation: 'Galatians 3:28 declares that our shared identity in Christ demolishes ethnic, social, and gender divisions: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus."',
    socraticHint: 'Which verse states that in Christ Jesus, ethnic, social, and gender barriers are overcome through oneness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-014',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'Why is negative ethnicity (tribalism) incompatible with Christian discipleship in Kenya?',
    text: 'Why is negative ethnicity (tribalism) incompatible with Christian discipleship in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It breeds prejudice, discrimination, and hatred against fellow human beings created in God’s image, violating Christ’s law of love',
      'Because the Bible requires all Christians to speak only the English language',
      'Because ethnic diversity was an accidental mistake that God never intended',
      'Because having diverse cultures prevents farmers from planting maize'
    ],
    correctAnswer: 'It breeds prejudice, discrimination, and hatred against fellow human beings created in God’s image, violating Christ’s law of love',
    explanation: 'Tribalism exalts ethnic identity above God’s command to love our neighbors as ourselves. In Christ, every person is our brother or sister, and discrimination against any tribe is a sin against God.',
    socraticHint: 'How does tribal discrimination contradict Christ’s fundamental commandment to love all neighbors equally?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-015',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Romans 12:18, what peacebuilding counsel does Scripture offer to all believers?',
    text: 'In Romans 12:18, what peacebuilding counsel does Scripture offer to all believers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'If it is possible, as far as it depends on you, live at peace with everyone',
      'Fight anyone who disagrees with your personal political opinion',
      'Retaliate twice as hard whenever someone insults your ethnic community',
      'Only seek peace with people who belong to your own family clan'
    ],
    correctAnswer: 'If it is possible, as far as it depends on you, live at peace with everyone',
    explanation: 'Romans 12:18 urges: "If it is possible, as far as it depends on you, live at peace with everyone." Christians must take active responsibility to pursue peace, forgive offenses, and resolve conflicts calmly.',
    socraticHint: 'What personal responsibility does Romans 12:18 place on us to live peacefully with all people?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-016',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What does the opening line of the Kenya National Anthem declare about our nation’s spiritual foundation?',
    text: 'What does the opening line of the Kenya National Anthem declare about our nation’s spiritual foundation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is a prayer addressing God: "O God of all creation, bless this our land and nation"',
      'It praises the military forces of Kenya for defending our borders',
      'It lists the mineral resources and cash crops found across the forty-seven counties',
      'It celebrates the geographical height of Mount Kenya above the clouds'
    ],
    correctAnswer: 'It is a prayer addressing God: "O God of all creation, bless this our land and nation"',
    explanation: 'The Kenya National Anthem was composed as an authentic prayer to the Almighty God, opening with "O God of all creation, bless this our land and nation," seeking divine blessing, justice, unity, and liberty.',
    socraticHint: 'Which prayerful words open the first stanza of the Kenya National Anthem?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-017',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'How can primary school pupils from diverse ethnic backgrounds across Kenya foster genuine national cohesion in school?',
    text: 'How can primary school pupils from diverse ethnic backgrounds across Kenya foster genuine national cohesion in school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Making friends across ethnic communities, learning about each other’s cultural traditions, and working together cooperatively in class projects',
      'Forming tribal cliques on the playing field and refusing to share balls with other groups',
      'Mocking classmates who speak with accents from different regions of Kenya',
      'Only voting for school prefect candidates who come from their home county'
    ],
    correctAnswer: 'Making friends across ethnic communities, learning about each other’s cultural traditions, and working together cooperatively in class projects',
    explanation: 'National cohesion begins with mutual respect, inter-ethnic friendships, active collaboration in class and sports, and appreciating cultural diversity as a God-given national strength.',
    socraticHint: 'Which actions foster inter-ethnic friendships, cultural appreciation, and collaborative teamwork?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-018',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'During national election periods in Kenya, political tensions sometimes rise. How can Christian learners act as ambassadors of peace in their neighborhoods?',
    text: 'During national election periods in Kenya, political tensions sometimes rise. How can Christian learners act as ambassadors of peace in their neighborhoods?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Refuse to repeat hateful political gossip, encourage friends to stay calm and loving, and pray for peaceful, fair elections',
      'Wear party hats and throw stones at houses belonging to rival political supporters',
      'Shout provocative slogans in the street to provoke fights between neighbors',
      'Spread alarming, unverified rumors on social media to frighten classmates'
    ],
    correctAnswer: 'Refuse to repeat hateful political gossip, encourage friends to stay calm and loving, and pray for peaceful, fair elections',
    explanation: 'Christians are called to be ambassadors of reconciliation (2 Corinthians 5:20) and peacemakers. Rejecting hate speech, promoting calm, and interceding for the nation during elections builds social peace.',
    socraticHint: 'How does rejecting divisive rumors, promoting calm, and praying for the nation foster electoral peace?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-019',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Ephesians 2:14, how does Scripture describe what Jesus Christ accomplished concerning historic human divisions and hostility?',
    text: 'In Ephesians 2:14, how does Scripture describe what Jesus Christ accomplished concerning historic human divisions and hostility?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'For He Himself is our peace, who has made the two groups one and has destroyed the barrier, the dividing wall of hostility',
      'He instructed each ethnic nation to build high stone barricades along their borders',
      'He taught that only one chosen culture is superior to all others in the world',
      'He encouraged groups to compete in warfare to see which one God favored'
    ],
    correctAnswer: 'For He Himself is our peace, who has made the two groups one and has destroyed the barrier, the dividing wall of hostility',
    explanation: 'Ephesians 2:14 proclaims: "For he himself is our peace, who has made the two groups one and has destroyed the barrier, the dividing wall of hostility." Christ tears down walls of ethnic suspicion and creates one new, united family.',
    socraticHint: 'Which verse celebrates Christ breaking down the dividing wall of hostility to bring peace?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-020',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'How does the Biblical story of Ruth, a Moabite foreigner who became the great-grandmother of King David, challenge ethnic prejudice?',
    text: 'How does the Biblical story of Ruth, a Moabite foreigner who became the great-grandmother of King David, challenge ethnic prejudice?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It proves that God welcomes and honors people from all nations who walk in faithful love, regardless of historical ethnic enmities',
      'It shows that foreigners should never be allowed to marry Israelites under any circumstances',
      'It demonstrates that only Moabites possessed true religious wisdom in the ancient world',
      'It proves that King David’s lineage was completely hidden from historical records'
    ],
    correctAnswer: 'It proves that God welcomes and honors people from all nations who walk in faithful love, regardless of historical ethnic enmities',
    explanation: 'Although Moab was an enemy of Israel, Ruth chose to follow the God of Israel and was embraced into God’s covenant family, becoming an ancestor of both King David and Jesus Christ. God looks at heart faith, not ethnic origin.',
    socraticHint: 'How does Ruth the Moabite being honored in Christ’s genealogy demonstrate God’s welcome of all nations?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-021',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'In Colossians 3:12-14, what Christian virtues are believers urged to clothe themselves with to maintain communal harmony?',
    text: 'In Colossians 3:12-14, what Christian virtues are believers urged to clothe themselves with to maintain communal harmony?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Compassion, kindness, humility, gentleness, patience, and above all, love, which binds them all together in perfect unity',
      'Suspicion, envy, pride, tribal arrogance, and bitterness',
      'Military armor, bronze spears, iron shields, and war banners',
      'Expensive linen robes, gold necklaces, and silver bracelets'
    ],
    correctAnswer: 'Compassion, kindness, humility, gentleness, patience, and above all, love, which binds them all together in perfect unity',
    explanation: 'Colossians 3:12-14 urges: "Clothe yourselves with compassion, kindness, humility, gentleness and patience. Bear with each other and forgive one another... And over all these virtues put on love, which binds them all together in perfect unity."',
    socraticHint: 'Which list of virtues ends with love as the perfect bond of unity among believers?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-022',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'Two rival schools in Nakuru get into a heated dispute over a controversial referee decision during a football final. What is the Christian peacemaking approach?',
    text: 'Two rival schools in Nakuru get into a heated dispute over a controversial referee decision during a football final. What is the Christian peacemaking approach?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Encourage team captains and teachers to shake hands, discuss grievances through official sporting mediation, and respect the decision with grace',
      'Start throwing stones and vandalizing the opposing school’s transport bus',
      'Encourage players to engage in physical fistfights on the pitch to determine who is stronger',
      'Refuse to leave the pitch until the tournament organizers award the trophy to both teams'
    ],
    correctAnswer: 'Encourage team captains and teachers to shake hands, discuss grievances through official sporting mediation, and respect the decision with grace',
    explanation: 'Christian sportsmanship and peacemaking pursue dialogue, self-control, official mediation, and respectful acceptance over violence, preventing playground disagreements from turning into destructive conflict.',
    socraticHint: 'Which approach uses respectful dialogue, sportsmanship, and mediation rather than violence?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-023',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'What does 1 Timothy 2:1-2 instruct Christians to pray for regarding our nation’s leaders and government?',
    text: 'What does 1 Timothy 2:1-2 instruct Christians to pray for regarding our nation’s leaders and government?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Pray for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness',
      'Pray that leaders experience failure so that new leaders take over every month',
      'Only pray for leaders who belong to our own church denomination',
      'Refuse to pray for government leaders because politics has no connection to faith'
    ],
    correctAnswer: 'Pray for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness',
    explanation: '1 Timothy 2:1-2 urges prayers, intercessions, and thanksgiving for rulers and all in authority so that society may enjoy peace, order, justice, and the freedom to live godly lives.',
    socraticHint: 'Why does Paul urge believers to intercede for leaders so that the nation may enjoy peaceful, godly lives?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  },
  {
    id: 'q-g5-cre-u10-024',
    subStrandId: 'substrand-g5-cre-u10',
    prompt: 'How does living out Christian values of integrity, justice, love, and reconciliation directly contribute to nation building in Kenya?',
    text: 'How does living out Christian values of integrity, justice, love, and reconciliation directly contribute to nation building in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It creates trustworthy citizens, eliminates corruption, fosters communal peace, protects the vulnerable, and fulfills our national destiny as a united, prosperous people',
      'It makes sure that all citizens stop working in agriculture and commerce',
      'It ensures that Kenya becomes completely isolated from all neighboring African countries',
      'It replaces the need for schools, hospitals, and national infrastructure'
    ],
    correctAnswer: 'It creates trustworthy citizens, eliminates corruption, fosters communal peace, protects the vulnerable, and fulfills our national destiny as a united, prosperous people',
    explanation: 'When citizens embody Christian values—acting justly, rejecting bribes, loving neighbors across ethnic lines, and serving with integrity—the nation flourishes with peace, trust, economic progress, and moral strength, fulfilling our National Anthem’s prayer for plenty within our borders.',
    socraticHint: 'How do personal integrity, social justice, and selfless love transform our schools, communities, and entire nation?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U10'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 5 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
