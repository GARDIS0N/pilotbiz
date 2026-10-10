import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 CRE Batch 2 (Units 3 & 4) ---');

// 1. Batch 2 Sub-strands (Units 3 & 4)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-cre-u3',
    strandId: 'strand-g5-cre-bible',
    learningAreaId: 'la-cre-g5',
    title: 'Faith and Obedience: Old Testament Heroes and Leaders',
    description: 'Examining inspiring faith and obedience through Old Testament heroes and leaders: Abraham’s faith journey and covenant obedience (Genesis 12 & 17); Moses’ courage and servant leadership in leading the Israelites across the Red Sea (Exodus 14); the boy Samuel hearing and responding to God’s call in Shiloh (1 Samuel 3); and Prophet Elijah standing boldly for truth against false prophets on Mount Carmel (1 Kings 18).',
    cbeCompetency: 'Moral courage, faithful leadership, obedience to divine principles, discerning God’s calling, and standing firm for truth',
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'substrand-g5-cre-u4',
    strandId: 'strand-g5-cre-jesus',
    learningAreaId: 'la-cre-g5',
    title: 'The Early Life, Baptism, and Temptation of Jesus Christ',
    description: 'Investigating the early life and milestones of Jesus Christ: the Annunciation to Mary by Angel Gabriel (Luke 1); the humble birth in Bethlehem and visitation of the shepherds and wise men (Luke 2, Matthew 2); boyhood of Jesus in Nazareth and discussions in the Jerusalem Temple at age twelve; the baptism of Jesus by John the Baptist in the River Jordan and the descent of the Holy Spirit; and overcoming the threefold temptations in the wilderness by quoting Scripture (Matthew 4:1-11).',
    cbeCompetency: 'Spiritual discernment, moral resilience against temptation, scriptural defense, humility, and filial obedience',
    estimatedMinutes: 30,
    order: 4
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 2 Lessons (Units 3 & 4: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-cre-u3-l1',
    subStrandId: 'substrand-g5-cre-u3',
    title: 'Abraham and Moses: Pioneers of Covenant Faith and Deliverance',
    content: 'The Old Testament introduces foundational leaders whose unwavering faith shaped God’s people. Abraham demonstrated exemplary obedience when God commanded him to leave his home country of Ur and Haran for an unknown land that God would show him (Genesis 12:1-4). Despite his advanced age, Abraham believed God’s promise that he would become the father of a great nation, earning him the title "Father of Faith." Centuries later, when the Israelites were enslaved in Egypt, God called Moses from a burning bush on Mount Horeb. Moses overcame his initial fear and stuttering speech to confront Pharaoh, saying, "Let my people go." At the Red Sea, when trapped between Pharaoh’s pursuing chariots and the deep water, Moses demonstrated immense courage, telling the terrified people, "Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today" (Exodus 14:13). God parted the waters, demonstrating that true leaders trust in God’s sovereignty rather than military might.',
    didYouKnow: 'Abraham was 75 years old when he left Haran, showing that you are never too young or too old to obey God’s call!',
    kenyanContext: 'During the struggle for Kenyan independence, moral leaders like Bildad Kaggia and Harry Thuku drew courage from the biblical narrative of Moses confronting Pharaoh to advocate for justice and self-determination.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u3-l2',
    subStrandId: 'substrand-g5-cre-u3',
    title: 'Samuel and Elijah: Discerning God’s Voice and Defending Truth',
    content: 'God calls individuals of all ages to serve Him. The boy Samuel grew up serving in the sanctuary at Shiloh under Priest Eli. One night, while lying down in the temple, the Lord called, "Samuel! Samuel!" Thinking Eli had spoken, Samuel ran to Eli three times. Recognizing the divine voice, Eli instructed the boy, "Go and lie down, and if he calls you, say, ‘Speak, Lord, for your servant is listening’" (1 Samuel 3:9). Samuel listened obediently and grew up to become a faithful prophet and judge in Israel. Centuries later, during the reign of wicked King Ahab and Queen Jezebel, the people of Israel abandoned God to worship Baal. Prophet Elijah challenged 450 prophets of Baal to a contest on Mount Carmel to prove who was the true God. The prophets of Baal shouted and slashed themselves until evening, but no fire answered. When Elijah repaired the altar of the Lord, poured water over the sacrifice, and prayed a humble prayer of faith, fire fell from heaven and consumed the sacrifice! The people fell on their faces shouting, "The Lord—He is God!" (1 Kings 18:39).',
    didYouKnow: 'Mount Carmel overlooks the Mediterranean Sea and is celebrated for its lush greenery, serving as a historic symbol of divine triumph over idolatry!',
    kenyanContext: 'Kenyan Christian teachers often encourage Sunday School learners to emulate young Samuel by cultivating attentive listening during family devotions and school assemblies.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u4-l1',
    subStrandId: 'substrand-g5-cre-u4',
    title: 'The Annunciation, Humble Birth, and Boyhood of Jesus',
    content: 'The New Testament reveals the fulfilled promise of the Messiah through Jesus Christ. The angel Gabriel was sent by God to a humble young woman named Mary in Nazareth with the miraculous announcement (Annunciation) that she would give birth to the Son of the Most High through the power of the Holy Spirit (Luke 1:26-38). Mary responded in humble faith: "I am the Lord’s servant; may your word to me be fulfilled." Jesus was born in Bethlehem of Judea in a humble manger because there was no guest room available in the inn (Luke 2:7). God announced the Saviour’s birth not to earthly kings, but to poor shepherds tending flocks at night in the fields. Wise men from the East followed a miraculous star to bring gifts of gold, frankincense, and myrrh. As a boy growing up in Nazareth, Jesus was obedient to Mary and Joseph. At age twelve, during the Passover festival in Jerusalem, His parents found Him in the Temple courts sitting among the teachers, listening and asking questions. Luke 2:52 records that "Jesus grew in wisdom and stature, and in favor with God and man."',
    didYouKnow: 'The three gifts of the Magi carried prophetic symbolism: Gold representing royalty/kingship, Frankincense representing divinity/priesthood, and Myrrh foreshadowing His sacrificial death and burial!',
    kenyanContext: 'In Kenya, children celebrate Christmas by reenacting the Nativity play in parish churches, dressing up as shepherds in traditional shukas and angels carrying paper stars.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-cre-u4-l2',
    subStrandId: 'substrand-g5-cre-u4',
    title: 'The Baptism of Jesus and Overcoming Temptation in the Wilderness',
    content: 'Before launching His public ministry at about age thirty, Jesus traveled from Galilee to the River Jordan to be baptized by John the Baptist. Although John protested that he needed to be baptized by Jesus, Jesus insisted, "Let it be so now; it is proper for us to do this to fulfill all righteousness" (Matthew 3:15). As Jesus emerged from the water, heaven opened, the Holy Spirit descended on Him in the bodily form of a dove, and a voice from heaven declared: "This is my Son, whom I love; with him I am well pleased." Immediately after baptism, Jesus was led by the Spirit into the Judean wilderness, where He fasted for forty days and forty nights. When the tempter (the devil) came, he tempted Jesus three times: 1) Physical appetite: turning stones into bread; 2) Presumption/testing God: jumping from the temple pinnacle; and 3) Power and worldly glory: worshiping Satan in exchange for earthly kingdoms. In every instance, Jesus defeated temptation by quoting the Scriptures: "Man shall not live on bread alone," "Do not put the Lord your God to the test," and "Worship the Lord your God, and serve Him only" (Matthew 4:1-10).',
    didYouKnow: 'All three scriptural answers Jesus used to silence Satan in the wilderness were quotations from the Old Testament Book of Deuteronomy!',
    kenyanContext: 'Just as Jesus used scripture to resist temptation, Kenyan school Christian Union (CU) members memorize Bible memory verses to resist peer pressure regarding cheating, stealing, or drug abuse.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 2 Missions (Missions 53, 54, 55, 56 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-cre-u3-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u3',
    lessonId: 'lesson-g5-cre-u3-l1',
    title: 'Pioneers of Covenant Faith Quest',
    description: 'Walk in the footsteps of Abraham leaving his homeland in trusting obedience, and stand beside Moses parting the Red Sea to deliver God’s people from bondage!',
    order: 53,
    orderIndex: 53,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-covenant-pioneer',
    badge: { name: 'Covenant Trailblazer', icon: 'compass' },
    questionIds: [
      'q-g5-cre-u3-001', 'q-g5-cre-u3-002', 'q-g5-cre-u3-003', 'q-g5-cre-u3-004',
      'q-g5-cre-u3-005', 'q-g5-cre-u3-006', 'q-g5-cre-u3-007', 'q-g5-cre-u3-008',
      'q-g5-cre-u3-009', 'q-g5-cre-u3-010', 'q-g5-cre-u3-011', 'q-g5-cre-u3-012'
    ]
  },
  {
    id: 'mission-g5-cre-u3-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u3',
    lessonId: 'lesson-g5-cre-u3-l2',
    title: 'Voices of Courage & Truth Challenge',
    description: 'Answer God’s call like the boy Samuel in the temple of Shiloh, and witness Prophet Elijah’s bold triumph over 450 prophets of Baal on Mount Carmel!',
    order: 54,
    orderIndex: 54,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-courageous-voice',
    badge: { name: 'Carmel Champion', icon: 'flame' },
    questionIds: [
      'q-g5-cre-u3-013', 'q-g5-cre-u3-014', 'q-g5-cre-u3-015', 'q-g5-cre-u3-016',
      'q-g5-cre-u3-017', 'q-g5-cre-u3-018', 'q-g5-cre-u3-019', 'q-g5-cre-u3-020',
      'q-g5-cre-u3-021', 'q-g5-cre-u3-022', 'q-g5-cre-u3-023', 'q-g5-cre-u3-024'
    ]
  },
  {
    id: 'mission-g5-cre-u4-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u4',
    lessonId: 'lesson-g5-cre-u4-l1',
    title: 'Bethlehem to the Temple Quest',
    description: 'Relive the miraculous Annunciation to Mary, the humble birth in Bethlehem’s manger, and young Jesus astounding temple teachers with His divine wisdom!',
    order: 55,
    orderIndex: 55,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-bethlehem-star',
    badge: { name: 'Bethlehem Star', icon: 'star' },
    questionIds: [
      'q-g5-cre-u4-001', 'q-g5-cre-u4-002', 'q-g5-cre-u4-003', 'q-g5-cre-u4-004',
      'q-g5-cre-u4-005', 'q-g5-cre-u4-006', 'q-g5-cre-u4-007', 'q-g5-cre-u4-008',
      'q-g5-cre-u4-009', 'q-g5-cre-u4-010', 'q-g5-cre-u4-011', 'q-g5-cre-u4-012'
    ]
  },
  {
    id: 'mission-g5-cre-u4-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-cre-u4',
    lessonId: 'lesson-g5-cre-u4-l2',
    title: 'Jordan Waters & Wilderness Victory Challenge',
    description: 'Stand by River Jordan as Jesus is baptized and anointed by the Holy Spirit, then learn how Jesus wielded God’s Word to crush the devil’s wilderness temptations!',
    order: 56,
    orderIndex: 56,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-cre-wilderness-victor',
    badge: { name: 'Wilderness Conqueror', icon: 'shield-check' },
    questionIds: [
      'q-g5-cre-u4-013', 'q-g5-cre-u4-014', 'q-g5-cre-u4-015', 'q-g5-cre-u4-016',
      'q-g5-cre-u4-017', 'q-g5-cre-u4-018', 'q-g5-cre-u4-019', 'q-g5-cre-u4-020',
      'q-g5-cre-u4-021', 'q-g5-cre-u4-022', 'q-g5-cre-u4-023', 'q-g5-cre-u4-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 2 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 3 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u3-001',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What did God command Abraham (Abram) to do in Genesis 12:1 to demonstrate his faith and obedience?',
    text: 'What did God command Abraham (Abram) to do in Genesis 12:1 to demonstrate his faith and obedience?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Leave his country, his people, and his father’s household for a land God would show him',
      'Construct a high stone wall around the city of Haran to prevent foreigners from entering',
      'Conquer neighboring tribes by leading a huge cavalry of war horses',
      'Abandon his livestock in the desert and become a merchant in Egypt'
    ],
    correctAnswer: 'Leave his country, his people, and his father’s household for a land God would show him',
    explanation: 'In Genesis 12:1, the Lord told Abram: "Go from your country, your people and your father’s household to the land I will show you." Abraham obeyed without knowing the exact destination, proving his deep faith.',
    socraticHint: 'Which great departure did God require of Abraham to test his trust in divine guidance?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-002',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What major covenant promise did God make to Abraham in Genesis 12:2-3?',
    text: 'What major covenant promise did God make to Abraham in Genesis 12:2-3?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'I will make you into a great nation, bless you, and all peoples on earth will be blessed through you',
      'I will give you all the silver coins currently minted in the Roman Empire',
      'I will ensure that none of your descendants ever have to till agricultural land',
      'I will make you the earthly king of all nations in Asia and Africa immediately'
    ],
    correctAnswer: 'I will make you into a great nation, bless you, and all peoples on earth will be blessed through you',
    explanation: 'God promised Abraham that He would make him a great nation, bless him, make his name great, and through him all families and peoples of the earth would be blessed.',
    socraticHint: 'What threefold covenant promise of land, descendants, and worldwide blessing did God give to Abraham?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-003',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'Why is Abraham widely revered across Christian history as the "Father of Faith"?',
    text: 'Why is Abraham widely revered across Christian history as the "Father of Faith"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He trusted God’s promises completely and obeyed even when situations seemed impossible',
      'He wrote down the entire Old Testament on papyrus scrolls by himself',
      'He possessed more physical gold and camels than any king in the ancient world',
      'He was the first high priest to build the stone temple in Jerusalem'
    ],
    correctAnswer: 'He trusted God’s promises completely and obeyed even when situations seemed impossible',
    explanation: 'Hebrews 11:8 notes that "By faith Abraham, when called to go to a place he would later receive as his inheritance, obeyed and went, even though he did not know where he was going." His unwavering trust makes him the father of all believers.',
    socraticHint: 'What outstanding character trait made Abraham obey God even when he could not see the final outcome?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-004',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'Where and how did God first reveal Himself to Moses to call him as the deliverer of Israel?',
    text: 'Where and how did God first reveal Himself to Moses to call him as the deliverer of Israel?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'At Mount Horeb in a bush that burned with fire but was not consumed',
      'Inside the royal throne room of Pharaoh while Moses was wearing gold robes',
      'On a fishing boat floating on the Mediterranean Sea during a violent storm',
      'In a crowded marketplace in Babylon while purchasing linen cloth'
    ],
    correctAnswer: 'At Mount Horeb in a bush that burned with fire but was not consumed',
    explanation: 'In Exodus 3:1-4, God appeared to Moses on Mount Horeb in flames of fire from within a bush that burned without being consumed, instructing him to take off his sandals because he stood on holy ground.',
    socraticHint: 'What miraculous sight caught Moses’ attention while tending Jethro’s sheep in the wilderness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-005',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'When Moses felt inadequate and complained that he was slow of speech, whom did God appoint to assist him as his spokesman?',
    text: 'When Moses felt inadequate and complained that he was slow of speech, whom did God appoint to assist him as his spokesman?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'His brother Aaron',
      'His nephew Lot',
      'His son Gershom',
      'General Joshua'
    ],
    correctAnswer: 'His brother Aaron',
    explanation: 'In Exodus 4:14-16, God appointed Moses’ brother Aaron the Levite, who could speak well, to act as his spokesman before the elders of Israel and Pharaoh.',
    socraticHint: 'Which eloquent biological brother was assigned to speak alongside Moses before Pharaoh?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-006',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'When the Israelites were trapped between the Red Sea and Pharaoh’s advancing army, what inspiring words did Moses speak in Exodus 14:13?',
    text: 'When the Israelites were trapped between the Red Sea and Pharaoh’s advancing army, what inspiring words did Moses speak in Exodus 14:13?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today',
      'Surrender immediately to the Egyptian soldiers and beg for mercy as slaves',
      'Jump into the deep waters and try to swim to the opposite shore before nightfall',
      'Scatter into the wilderness hills and let everyone fight for their own life'
    ],
    correctAnswer: 'Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today',
    explanation: 'Moses showed extraordinary faith and godly composure in crisis, telling the terrified Israelites: "Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today. The Lord will fight for you; you need only to be still."',
    socraticHint: 'Which famous statement commanded the people to reject fear and trust God’s miraculous salvation?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-007',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'How did God miraculously deliver the Israelites across the Red Sea in Exodus 14:21-22?',
    text: 'How did God miraculously deliver the Israelites across the Red Sea in Exodus 14:21-22?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Moses stretched out his hand over the sea, and God drove the sea back with a strong east wind, dividing the waters so they walked on dry ground',
      'God sent hundreds of wooden canoes from Phoenicia to ferry the people across',
      'The sea froze into solid ice and the Israelites skated across without wet shoes',
      'An earthquake formed an underground tunnel beneath the sea floor'
    ],
    correctAnswer: 'Moses stretched out his hand over the sea, and God drove the sea back with a strong east wind, dividing the waters so they walked on dry ground',
    explanation: 'Exodus 14:21-22 explains that Moses stretched out his hand over the sea, and the Lord drove the sea back with a powerful east wind, turning the seabed into dry land with a wall of water on their right and left.',
    socraticHint: 'How did God’s power divide the waters of the sea to create a safe dry pathway for His people?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-008',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What leadership quality demonstrated by Moses is essential for a school class prefect in Kenya today?',
    text: 'What leadership quality demonstrated by Moses is essential for a school class prefect in Kenya today?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Servant leadership: putting the welfare of others first and praying for their guidance in difficult moments',
      'Dictatorial rule: punishing smaller pupils unfairly to prove how powerful and feared they are',
      'Favoritism: excusing friends from class duties while overloading pupils they dislike',
      'Dishonesty: taking snacks from classmates in exchange for hiding bad behavior from the teacher'
    ],
    correctAnswer: 'Servant leadership: putting the welfare of others first and praying for their guidance in difficult moments',
    explanation: 'Moses was a humble servant leader (Numbers 12:3). Christian leadership involves selflessly serving others, seeking God’s guidance in difficulties, and defending justice rather than abusing authority.',
    socraticHint: 'Which leadership style focuses on humble service, fair defense of others, and seeking divine guidance?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-009',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'When God asked Abraham to sacrifice his only promised son Isaac on Mount Moriah (Genesis 22), what divine truth was revealed when God provided a ram caught in a thicket?',
    text: 'When God asked Abraham to sacrifice his only promised son Isaac on Mount Moriah (Genesis 22), what divine truth was revealed when God provided a ram caught in a thicket?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'God provides for our needs (Yahweh Yireh / The Lord Will Provide) and honors faithful obedience',
      'God delights in taking away human life without reason',
      'Abraham made a serious mistake by climbing Mount Moriah without food',
      'Sacrificing sheep is forbidden under all circumstances in scripture'
    ],
    correctAnswer: 'God provides for our needs (Yahweh Yireh / The Lord Will Provide) and honors faithful obedience',
    explanation: 'Genesis 22:14 states that Abraham called the place "The Lord Will Provide" (Yahweh Yireh). God did not want Isaac harmed; He tested Abraham’s devotion and provided a substitute sacrifice, foreshadowing Christ.',
    socraticHint: 'What special name meaning "The Lord Will Provide" did Abraham give to the place where God provided a ram?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-010',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'How did Moses demonstrate humility when his father-in-law Jethro visited him in Exodus 18?',
    text: 'How did Moses demonstrate humility when his father-in-law Jethro visited him in Exodus 18?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He humbly accepted Jethro’s wise advice to delegate judicial responsibilities to capable, God-fearing leaders',
      'He angrily banished Jethro for interfering in the political affairs of the nation of Israel',
      'He claimed that because he spoke to God directly, he had no need for human counsel',
      'He resigned from leadership immediately and hid in a tent until Jethro left camp'
    ],
    correctAnswer: 'He humbly accepted Jethro’s wise advice to delegate judicial responsibilities to capable, God-fearing leaders',
    explanation: 'Moses listened to Jethro’s wise counsel and appointed trustworthy, God-fearing men as leaders of thousands, hundreds, fifties, and tens, avoiding burnout and serving the community more effectively.',
    socraticHint: 'How did Moses respond when Jethro advised him to share the burden of judging disputes with other leaders?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-011',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'A learner named Wanjiku is transferred to a new boarding school in a distant county where she knows nobody. How does Abraham’s faith journey encourage her?',
    text: 'A learner named Wanjiku is transferred to a new boarding school in a distant county where she knows nobody. How does Abraham’s faith journey encourage her?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She knows that just as God guided and protected Abraham in an unfamiliar land, God will be with her wherever she goes',
      'She realizes that she must refuse to eat any school food until her parents take her back home',
      'She decides that traveling to new places always brings bad luck and curses',
      'She assumes she must change her religious beliefs whenever she enters a new town'
    ],
    correctAnswer: 'She knows that just as God guided and protected Abraham in an unfamiliar land, God will be with her wherever she goes',
    explanation: 'Abraham’s journey reminds believers that God’s presence, guidance, and protection are not limited by geography. Trusting God brings peace and confidence in new, unfamiliar environments.',
    socraticHint: 'How does trusting in God’s omnipresent care help someone facing a new and unfamiliar environment?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-012',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What common theological theme unites both Abraham’s call and Moses’ mission at the Red Sea?',
    text: 'What common theological theme unites both Abraham’s call and Moses’ mission at the Red Sea?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Total trust in God’s sovereign promises and obedient action despite human impossibility',
      'Relying entirely on human military weapons and chariot cavalry to solve problems',
      'Accumulating commercial silver wealth before obeying any divine instruction',
      'Refusing to move forward unless angels are visibly walking in front of the camp'
    ],
    correctAnswer: 'Total trust in God’s sovereign promises and obedient action despite human impossibility',
    explanation: 'Both Abraham and Moses faced situations that seemed impossible by human logic, yet their active faith and obedience allowed God’s miraculous power and covenant purposes to prevail.',
    socraticHint: 'What core spiritual principle requires stepping forward in trust even when human eyes see obstacles?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },

  // ==========================================
  // Unit 3 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u3-013',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'Under whose care and priestly mentorship was the boy Samuel serving in the sanctuary at Shiloh?',
    text: 'Under whose care and priestly mentorship was the boy Samuel serving in the sanctuary at Shiloh?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Priest Eli',
      'King Saul',
      'Prophet Nathan',
      'Priest Melchizedek'
    ],
    correctAnswer: 'Priest Eli',
    explanation: '1 Samuel 3:1 records that the boy Samuel ministered before the Lord under Eli the priest at Shiloh, where the Ark of God was kept.',
    socraticHint: 'Which elderly priest at Shiloh mentored young Samuel in the sanctuary?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-014',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What exact words did Eli instruct Samuel to say if he heard the divine voice calling him again in the night (1 Samuel 3:9)?',
    text: 'What exact words did Eli instruct Samuel to say if he heard the divine voice calling him again in the night (1 Samuel 3:9)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Speak, Lord, for your servant is listening',
      'Go away, Lord, for I am trying to sleep',
      'Wait until morning, Lord, when the sun rises',
      'Speak to Eli, Lord, because he is older than me'
    ],
    correctAnswer: 'Speak, Lord, for your servant is listening',
    explanation: 'In 1 Samuel 3:9, Eli told Samuel: "Go and lie down, and if he calls you, say, ‘Speak, Lord, for your servant is listening.’" This reflects humble, attentive readiness to hear God’s will.',
    socraticHint: 'Which respectful phrase expressing readiness to listen did Eli teach Samuel to say?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-015',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What does young Samuel’s response teach Grade 5 learners about their own spiritual lives?',
    text: 'What does young Samuel’s response teach Grade 5 learners about their own spiritual lives?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Children can hear God’s calling, develop spiritual sensitivity, and serve God with humble hearts',
      'God only speaks to people who have gray hair and walk with wooden walking sticks',
      'Children should ignore church teachings until they finish university education',
      'Listening to parents and teachers is unnecessary if you have a Bible'
    ],
    correctAnswer: 'Children can hear God’s calling, develop spiritual sensitivity, and serve God with humble hearts',
    explanation: 'Samuel was called while still a boy. This teaches that age is not a barrier to hearing and obeying God; young people can cultivate attentive, obedient hearts to serve God in their families and schools.',
    socraticHint: 'Can God speak to and use young boys and girls, or does He only speak to elderly individuals?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-016',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'Which wicked king and queen led the nation of Israel into widespread idolatry and Baal worship during the time of Elijah?',
    text: 'Which wicked king and queen led the nation of Israel into widespread idolatry and Baal worship during the time of Elijah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'King Ahab and Queen Jezebel',
      'King David and Queen Bathsheba',
      'King Solomon and Queen of Sheba',
      'King Herod and Queen Herodias'
    ],
    correctAnswer: 'King Ahab and Queen Jezebel',
    explanation: 'King Ahab and his Phoenician wife Jezebel promoted the worship of Baal and Asherah, leading Israel away from the God of Abraham and persecuting God’s true prophets (1 Kings 16:30-33).',
    socraticHint: 'Which notorious royal couple reigned in Samaria and introduced state-sponsored Baal worship?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-017',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'On which famous mountain did Prophet Elijah challenge 450 prophets of Baal to a contest of fire?',
    text: 'On which famous mountain did Prophet Elijah challenge 450 prophets of Baal to a contest of fire?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mount Carmel',
      'Mount Sinai',
      'Mount Nebo',
      'Mount Ararat'
    ],
    correctAnswer: 'Mount Carmel',
    explanation: '1 Kings 18:19 records Elijah challenging Ahab to assemble all Israel and the 450 prophets of Baal on Mount Carmel to determine who was the true God.',
    socraticHint: 'Which coastal mountain ridge in northern Israel was the setting for the dramatic contest between Elijah and Baal’s prophets?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-018',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What was the condition agreed upon between Elijah and the prophets of Baal to prove who was the true God?',
    text: 'What was the condition agreed upon between Elijah and the prophets of Baal to prove who was the true God?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The god who answers by sending fire to consume the sacrifice is the true God',
      'The group that can run up the mountain fastest will be declared winners',
      'Whoever collects the largest pile of gold jewelry from the spectators wins',
      'The side that can shout the loudest without drinking water for three days wins'
    ],
    correctAnswer: 'The god who answers by sending fire to consume the sacrifice is the true God',
    explanation: 'In 1 Kings 18:24, Elijah declared: "The god who answers by fire—he is God." Baal, who was worshiped as the god of storms and fire, proved completely powerless, while the Lord God answered with divine fire.',
    socraticHint: 'How did Elijah propose that the true God should reveal His supremacy over the wooden and stone idols?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-019',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'How did the 450 prophets of Baal behave during the morning and afternoon contest on Mount Carmel?',
    text: 'How did the 450 prophets of Baal behave during the morning and afternoon contest on Mount Carmel?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They shouted, danced frantically, and cut themselves with knives, but there was no response or fire',
      'They quietly prayed a psalm of repentance and received immediate answers',
      'They admitted immediately that Baal was fake and walked away quietly',
      'They poured freshwater on their altar to cool down the hot stones'
    ],
    correctAnswer: 'They shouted, danced frantically, and cut themselves with knives, but there was no response or fire',
    explanation: '1 Kings 18:26-29 describes Baal’s prophets shouting from morning till evening, leaping on the altar, and cutting themselves until blood flowed, yet "there was no response, no one answered, no one paid attention."',
    socraticHint: 'Did the false prophets of Baal receive any answer despite shouting and slashing themselves all day?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-020',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'Before offering his prayer, what bold action did Elijah take that made lighting the altar humanly impossible?',
    text: 'Before offering his prayer, what bold action did Elijah take that made lighting the altar humanly impossible?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He had large jars of water poured over the offering and wood three times until the trench was filled',
      'He placed the wood inside an underground cave where air could not reach it',
      'He covered the wood with heavy wet cow dung to smother any sparks',
      'He waited until a heavy thunderstorm blew away all the dry branches'
    ],
    correctAnswer: 'He had large jars of water poured over the offering and wood three times until the trench was filled',
    explanation: 'Elijah commanded four large jars of water to be poured over the sacrifice three times (12 jars in total), drenching the wood and filling the trench, ensuring everyone knew only miraculous divine power could ignite the fire.',
    socraticHint: 'What liquid did Elijah order to be poured repeatedly over the wood and sacrifice to eliminate any trickery?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-021',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'When the fire of the Lord fell and consumed the burnt offering, wood, stones, and water, how did the people of Israel respond (1 Kings 18:39)?',
    text: 'When the fire of the Lord fell and consumed the burnt offering, wood, stones, and water, how did the people of Israel respond (1 Kings 18:39)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They fell prostrate and cried, "The Lord—He is God! The Lord—He is God!"',
      'They laughed loudly and claimed Elijah had used magic gunpowder from Egypt',
      'They demanded that Elijah apologize to King Ahab and Queen Jezebel',
      'They ran away in terror into the Mediterranean Sea to escape the heat'
    ],
    correctAnswer: 'They fell prostrate and cried, "The Lord—He is God! The Lord—He is God!"',
    explanation: 'Upon witnessing the supernatural fire consuming the entire soaked altar, all the people fell prostrate on the ground and proclaimed: "The Lord—He is God! The Lord—He is God!" (1 Kings 18:39).',
    socraticHint: 'What unanimous declaration of praise and faith in Yahweh broke out among the crowd?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-022',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'During a class election, all classmates are voting for a student who bullies smaller children. Brian bravely votes for an honest, kind candidate. Who in scripture does Brian resemble?',
    text: 'During a class election, all classmates are voting for a student who bullies smaller children. Brian bravely votes for an honest, kind candidate. Who in scripture does Brian resemble?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Elijah, who stood alone boldly for God’s truth against 450 false prophets',
      'King Ahab, who followed Queen Jezebel into wickedness to stay popular',
      'Priest Eli’s wicked sons, who abused their religious positions for personal gain',
      'The merchants of Babylon, who cared only about monetary profits'
    ],
    correctAnswer: 'Prophet Elijah, who stood alone boldly for God’s truth against 450 false prophets',
    explanation: 'Elijah stood courageously for God even when he was outnumbered 450 to 1. Standing for righteousness against peer pressure reflects Elijah’s moral courage.',
    socraticHint: 'Which Old Testament prophet had the courage to stand alone for truth when the majority followed falsehood?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-023',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'How did God speak to a discouraged Elijah when he hid in a cave at Mount Horeb in 1 Kings 19:11-13?',
    text: 'How did God speak to a discouraged Elijah when he hid in a cave at Mount Horeb in 1 Kings 19:11-13?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Not in the great wind, earthquake, or fire, but in a gentle whisper (still small voice)',
      'Through a terrifying earthquake that destroyed the entire mountain range',
      'Through blinding lightning bolts that struck down every tree around the cave',
      'Through a violent hurricane wind that shattered giant rocks into dust'
    ],
    correctAnswer: 'Not in the great wind, earthquake, or fire, but in a gentle whisper (still small voice)',
    explanation: '1 Kings 19:11-12 tells how the Lord was not in the wind, the earthquake, or the fire, but after the fire came a gentle whisper (a still small voice), teaching that God often speaks in quiet stillness.',
    socraticHint: 'Did God reveal His message in the loud spectacular forces or in a gentle, quiet whisper?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },
  {
    id: 'q-g5-cre-u3-024',
    subStrandId: 'substrand-g5-cre-u3',
    prompt: 'What vital moral lesson do both young Samuel and Prophet Elijah teach Christians in 21st-century Kenya?',
    text: 'What vital moral lesson do both young Samuel and Prophet Elijah teach Christians in 21st-century Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Listen attentively to God’s calling and boldly stand for righteousness regardless of public opinion',
      'Only speak up for justice when everyone else in the community agrees with you',
      'Use supernatural fire to punish anyone who disagrees with your personal opinions',
      'Never accept leadership roles because leaders always face criticism'
    ],
    correctAnswer: 'Listen attentively to God’s calling and boldly stand for righteousness regardless of public opinion',
    explanation: 'Samuel exemplifies attentive obedience to God’s call, and Elijah demonstrates fearless dedication to divine truth. Together, they model living with integrity, faith, and moral courage in modern society.',
    socraticHint: 'What shared qualities of attentive listening and uncompromising courage define their lives?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U3'
  },

  // ==========================================
  // Unit 4 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-cre-u4-001',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'Which archangel was sent by God to Mary in the town of Nazareth to announce the birth of Jesus (Luke 1:26)?',
    text: 'Which archangel was sent by God to Mary in the town of Nazareth to announce the birth of Jesus (Luke 1:26)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Angel Gabriel',
      'Angel Michael',
      'Angel Raphael',
      'Angel Uriel'
    ],
    correctAnswer: 'Angel Gabriel',
    explanation: 'Luke 1:26-28 states that God sent the angel Gabriel to Nazareth, a town in Galilee, to a virgin pledged to be married to a man named Joseph, whose name was Mary.',
    socraticHint: 'Which angel delivered the news of the Messiah’s conception to Mary in Nazareth?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-002',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What humble and faithful response did Mary give to the angel in Luke 1:38?',
    text: 'What humble and faithful response did Mary give to the angel in Luke 1:38?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'I am the Lord’s servant. May your word to me be fulfilled',
      'No, choose another woman in Jerusalem who has more silver and gold',
      'I will only accept if you make me the earthly queen of the Roman Empire',
      'I do not believe in angels and want you to leave my house immediately'
    ],
    correctAnswer: 'I am the Lord’s servant. May your word to me be fulfilled',
    explanation: 'In Luke 1:38, Mary answered with supreme faith and humility: "I am the Lord’s servant. May your word to me be fulfilled." She willingly submitted to God’s divine plan.',
    socraticHint: 'Which submissive, trusting phrase expressed Mary’s willingness to be used by God?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-003',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'In which town was Jesus born, fulfilling the Old Testament prophecy of Micah 5:2?',
    text: 'In which town was Jesus born, fulfilling the Old Testament prophecy of Micah 5:2?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Bethlehem of Judea',
      'Jerusalem',
      'Nazareth',
      'Capernaum'
    ],
    correctAnswer: 'Bethlehem of Judea',
    explanation: 'Jesus was born in Bethlehem of Judea, the city of David, where Joseph and Mary had traveled for the Roman census decreed by Caesar Augustus (Luke 2:4-7).',
    socraticHint: 'In which small Judean town, also called the City of David, was Jesus born?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-004',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'Why was baby Jesus placed in a humble manger (animal feeding trough) after His birth?',
    text: 'Why was baby Jesus placed in a humble manger (animal feeding trough) after His birth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because there was no guest room available for them in the inn',
      'Because Joseph preferred sleeping in barns rather than comfortable rooms',
      'Because King Herod had locked all hotel doors across Judea',
      'Because Roman law forbade babies from sleeping inside houses'
    ],
    correctAnswer: 'Because there was no guest room available for them in the inn',
    explanation: 'Luke 2:7 records: "She gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them in the inn."',
    socraticHint: 'Why was there no normal bed available for Joseph and Mary in Bethlehem?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-005',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'To whom did the angels first announce the joyous news of the Saviour’s birth in Luke 2:8-14?',
    text: 'To whom did the angels first announce the joyous news of the Saviour’s birth in Luke 2:8-14?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Humble shepherds keeping watch over their flocks in the fields at night',
      'The Roman governor Pontius Pilate in his grand palace in Caesarea',
      'The wealthy merchants trading purple cloth in Athens',
      'The high priests and scribes presiding over the Sanhedrin in Jerusalem'
    ],
    correctAnswer: 'Humble shepherds keeping watch over their flocks in the fields at night',
    explanation: 'God chose humble, ordinary shepherds working night shifts in the fields to be the very first recipients of the angelic announcement of the Messiah’s birth, demonstrating that the Good News is for everyone.',
    socraticHint: 'Which ordinary working-class group tending sheep received the midnight angelic visitation?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-006',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What three symbolic gifts did the Magi (wise men from the East) present to the young child Jesus (Matthew 2:11)?',
    text: 'What three symbolic gifts did the Magi (wise men from the East) present to the young child Jesus (Matthew 2:11)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Gold, Frankincense, and Myrrh',
      'Silver coins, Copper plates, and Iron shields',
      'Silk robes, Woolen blankets, and Leather sandals',
      'Wheat flour, Olive oil, and Fresh goat milk'
    ],
    correctAnswer: 'Gold, Frankincense, and Myrrh',
    explanation: 'Matthew 2:11 records that the Magi opened their treasures and presented Jesus with gifts of gold (for a King), frankincense (incense for God/Priest), and myrrh (anointing spice for burial).',
    socraticHint: 'Which precious metal and two fragrant spices were gifted by the Magi from the East?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-007',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'When Jesus was twelve years old, where did his parents find Him after searching for three days in Jerusalem (Luke 2:46)?',
    text: 'When Jesus was twelve years old, where did his parents find Him after searching for three days in Jerusalem (Luke 2:46)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In the Temple courts, sitting among the teachers, listening to them and asking questions',
      'At the Roman military barracks watching soldier drills',
      'At the city gates buying sweets and figs from street vendors',
      'Swimming with neighborhood children in the Pool of Siloam'
    ],
    correctAnswer: 'In the Temple courts, sitting among the teachers, listening to them and asking questions',
    explanation: 'Luke 2:46 states that after three days they found Him in the temple courts, sitting among the religious teachers, listening to them and asking thoughtful questions, and everyone was amazed at His understanding.',
    socraticHint: 'Where in Jerusalem was the boy Jesus found conversing with Jewish teachers of the Law?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-008',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What did young Jesus answer Mary when she asked why He had stayed behind in Jerusalem (Luke 2:49)?',
    text: 'What did young Jesus answer Mary when she asked why He had stayed behind in Jerusalem (Luke 2:49)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Why were you searching for me? Didn’t you know I had to be in my Father’s house (about my Father’s business)?',
      'I was tired of traveling on donkey trails and wanted to rest in a city hotel',
      'I got lost in the crowded bazaar and forgot where you parked the carriage',
      'I decided that I never wanted to return to Nazareth again'
    ],
    correctAnswer: 'Why were you searching for me? Didn’t you know I had to be in my Father’s house (about my Father’s business)?',
    explanation: 'Jesus replied: "Why were you searching for me? Didn’t you know I had to be in my Father’s house?" Even at age 12, Jesus demonstrated deep consciousness of His unique divine mission and filial relationship with God the Father.',
    socraticHint: 'Which response showed young Jesus’ awareness of His heavenly Father’s priority?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-009',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'According to Luke 2:52, in what four dimensions did Jesus grow during His boyhood in Nazareth?',
    text: 'According to Luke 2:52, in what four dimensions did Jesus grow during His boyhood in Nazareth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In wisdom, stature, and in favor with God and man',
      'In military power, wealth, land ownership, and political dominance',
      'In stubbornness, pride, anger, and avoidance of physical work',
      'In isolation, silence, physical weakness, and fear of crowds'
    ],
    correctAnswer: 'In wisdom, stature, and in favor with God and man',
    explanation: 'Luke 2:52 summarizes Jesus’ holistic development: "And Jesus grew in wisdom (intellectually) and stature (physically), and in favor with God (spiritually) and man (socially).',
    socraticHint: 'Which verse outlines the intellectual, physical, spiritual, and social growth of young Jesus?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-010',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'How does Jesus’ obedience to Mary and Joseph in Nazareth (Luke 2:51) guide Kenyan school learners at home?',
    text: 'How does Jesus’ obedience to Mary and Joseph in Nazareth (Luke 2:51) guide Kenyan school learners at home?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Learners should honor, respect, and obey their parents and guardians in all daily family duties',
      'Learners should argue with their parents because children know more about smartphones',
      'Learners should demand payment before doing any domestic chores like washing dishes',
      'Learners should ignore parental advice once they enter Grade 5'
    ],
    correctAnswer: 'Learners should honor, respect, and obey their parents and guardians in all daily family duties',
    explanation: 'Although Jesus was the Son of God, Luke 2:51 states He went down to Nazareth with them and was obedient to them. Christian children are called to show filial respect, honor, and obedience to parents.',
    socraticHint: 'How does Jesus’ submission to his earthly parents model behavior for children in their families?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-011',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'Why did Joseph and Mary flee with baby Jesus to Egypt according to Matthew 2:13-14?',
    text: 'Why did Joseph and Mary flee with baby Jesus to Egypt according to Matthew 2:13-14?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'An angel warned Joseph in a dream that King Herod was searching for the child to kill Him',
      'They wanted to take a luxury holiday along the River Nile',
      'Joseph had found a high-paying carpentry job in the city of Alexandria',
      'Bethlehem had run completely out of clean drinking water'
    ],
    correctAnswer: 'An angel warned Joseph in a dream that King Herod was searching for the child to kill Him',
    explanation: 'An angel appeared to Joseph in a dream, saying: "Get up, take the child and his mother and escape to Egypt... for Herod is going to search for the child to kill him." They fled by night to protect Jesus.',
    socraticHint: 'Which jealous ruler sought to kill the newborn Messiah, causing the holy family to seek refuge in Egypt?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-012',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What profound lesson does Jesus’ birth in a humble Bethlehem manger teach about God’s values compared to worldly values?',
    text: 'What profound lesson does Jesus’ birth in a humble Bethlehem manger teach about God’s values compared to worldly values?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'True greatness is rooted in humility, servant hood, and simplicity, rather than worldly status and luxury',
      'God prefers to work only in magnificent palace bedrooms with gold chandeliers',
      'Poor people are not allowed to be part of God’s covenant family',
      'Worldly wealth and expensive designer clothing are the true signs of spiritual perfection'
    ],
    correctAnswer: 'True greatness is rooted in humility, servant hood, and simplicity, rather than worldly status and luxury',
    explanation: 'God chose a humble stable, poor parents, and ordinary shepherds for the incarnation of the King of Kings. This demonstrates that God values humility, meekness, and spiritual purity over earthly prestige.',
    socraticHint: 'Does the Lord define true greatness through worldly prestige and luxury, or through humble love and simplicity?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },

  // ==========================================
  // Unit 4 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-cre-u4-013',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'In which river was Jesus baptized by John the Baptist (Matthew 3:13)?',
    text: 'In which river was Jesus baptized by John the Baptist (Matthew 3:13)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'River Jordan',
      'River Nile',
      'River Euphrates',
      'River Tigris'
    ],
    correctAnswer: 'River Jordan',
    explanation: 'Matthew 3:13 states: "Then Jesus came from Galilee to the Jordan to be baptized by John." The River Jordan is the historic river where John conducted his baptism of repentance.',
    socraticHint: 'Which famous biblical river in Israel did John the Baptist use to baptize people and Jesus?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-014',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'Why did Jesus insist on being baptized even though John felt unworthy and knew Jesus had committed no sin (Matthew 3:15)?',
    text: 'Why did Jesus insist on being baptized even though John felt unworthy and knew Jesus had committed no sin (Matthew 3:15)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To fulfill all righteousness and identify fully with humanity in obedience to God’s plan',
      'Because the weather was too hot in Galilee and He wanted a refreshing swim',
      'To demonstrate that John’s preaching was completely mistaken',
      'To compete with Pharisees who held outdoor ceremonial hand-washing rituals'
    ],
    correctAnswer: 'To fulfill all righteousness and identify fully with humanity in obedience to God’s plan',
    explanation: 'Jesus told John: "Let it be so now; it is proper for us to do this to fulfill all righteousness." Jesus was baptized to inaugurate His messianic ministry, identify with sinful humanity, and fulfill God’s divine requirements.',
    socraticHint: 'Why did Jesus say it was necessary for them to complete this act of obedience to God’s righteousness?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-015',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What miraculous signs occurred immediately as Jesus came up out of the water after His baptism (Matthew 3:16-17)?',
    text: 'What miraculous signs occurred immediately as Jesus came up out of the water after His baptism (Matthew 3:16-17)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Heaven opened, the Spirit of God descended like a dove, and a voice from heaven said: "This is my Son, whom I love; with him I am well pleased"',
      'A violent earthquake split Mount Hermon into two equal halves',
      'A total solar eclipse darkened Judea for twelve hours straight',
      'John the Baptist was carried up to heaven in a fiery chariot like Elijah'
    ],
    correctAnswer: 'Heaven opened, the Spirit of God descended like a dove, and a voice from heaven said: "This is my Son, whom I love; with him I am well pleased"',
    explanation: 'At Jesus’ baptism, the Trinity was revealed: the Son was baptized, the Holy Spirit descended in the bodily shape of a dove, and the Father spoke from heaven affirming His beloved Son.',
    socraticHint: 'What heavenly voice spoke, and in what form did the Holy Spirit descend upon Jesus?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-016',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'How long did Jesus fast in the wilderness before being tempted by the devil (Matthew 4:2)?',
    text: 'How long did Jesus fast in the wilderness before being tempted by the devil (Matthew 4:2)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Forty days and forty nights',
      'Seven days and seven nights',
      'Three days and three nights',
      'One hundred days and one hundred nights'
    ],
    correctAnswer: 'Forty days and forty nights',
    explanation: 'Matthew 4:2 states that after fasting forty days and forty nights, Jesus was hungry, at which point the tempter approached Him.',
    socraticHint: 'Which significant biblical duration of fasting did Jesus observe in the Judean desert?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-017',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What was the devil’s first temptation to Jesus in Matthew 4:3, targeting His physical hunger?',
    text: 'What was the devil’s first temptation to Jesus in Matthew 4:3, targeting His physical hunger?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'If you are the Son of God, tell these stones to become bread',
      'Jump off the highest pinnacle of the temple into the valley',
      'Bow down and worship me to receive all the kingdoms of the world',
      'Curse John the Baptist for making you wet in River Jordan'
    ],
    correctAnswer: 'If you are the Son of God, tell these stones to become bread',
    explanation: 'The tempter said: "If you are the Son of God, tell these stones to become bread." Satan tempted Jesus to use His divine power selfishly to satisfy His bodily appetite apart from God’s will.',
    socraticHint: 'What food did the devil tempt hungry Jesus to miraculously create from desert rocks?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-018',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'How did Jesus overcome the devil’s first temptation in Matthew 4:4?',
    text: 'How did Jesus overcome the devil’s first temptation in Matthew 4:4?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He quoted Scripture: "It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God"',
      'He threw desert stones at Satan until the devil ran away',
      'He argued that barley bread tasted better than stone bread',
      'He asked angels to deliver a basket of hot fish and unleavened bread'
    ],
    correctAnswer: 'He quoted Scripture: "It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God"',
    explanation: 'Jesus answered by quoting Deuteronomy 8:3: "It is written: ‘Man shall not live on bread alone, but on every word that comes from the mouth of God.’" Spiritual life and obedience to God take precedence over physical cravings.',
    socraticHint: 'Which scripture from Deuteronomy taught that spiritual nourishment from God’s Word is greater than physical bread?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-019',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'In the second temptation, Satan placed Jesus on the highest point of the temple and urged Him to jump. How did Jesus respond (Matthew 4:7)?',
    text: 'In the second temptation, Satan placed Jesus on the highest point of the temple and urged Him to jump. How did Jesus respond (Matthew 4:7)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is also written: Do not put the Lord your God to the test',
      'Let me put on wings first before jumping into the courtyard',
      'I will jump if the Roman centurions catch me on their shields',
      'I will only jump if you promise to worship God in heaven'
    ],
    correctAnswer: 'It is also written: Do not put the Lord your God to the test',
    explanation: 'Jesus quoted Deuteronomy 6:16: "It is also written: ‘Do not put the Lord your God to the test.’" Believers must not recklessly endanger themselves or manipulate God’s protection through presumption.',
    socraticHint: 'What scriptural command forbids testing or daring God through foolish, presumptuous actions?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-020',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'In the third temptation, Satan showed Jesus all kingdoms of the world and offered them in exchange for worship. What was Jesus’ definitive response (Matthew 4:10)?',
    text: 'In the third temptation, Satan showed Jesus all kingdoms of the world and offered them in exchange for worship. What was Jesus’ definitive response (Matthew 4:10)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Away from me, Satan! For it is written: Worship the Lord your God, and serve Him only',
      'Give me half the kingdoms first and I will think about your proposal tomorrow',
      'I will worship you only if you make me the Emperor in Rome',
      'Let us sign a treaty to divide power over the nations equally'
    ],
    correctAnswer: 'Away from me, Satan! For it is written: Worship the Lord your God, and serve Him only',
    explanation: 'Jesus commanded: "Away from me, Satan! For it is written: ‘Worship the Lord your God, and serve him only’" (Deuteronomy 6:13). Worship belongs to God alone; worldly glory cannot buy a Christian’s allegiance.',
    socraticHint: 'Which decisive rebuke commanded Satan to leave, reaffirming that God alone is worthy of worship?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-021',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What spiritual weapon did Jesus consistently rely on to defeat every single temptation of the devil in the wilderness?',
    text: 'What spiritual weapon did Jesus consistently rely on to defeat every single temptation of the devil in the wilderness?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The written Word of God ("It is written...")',
      'Physical wooden clubs and sharp bronze daggers',
      'Calling Roman legionnaires to arrest the tempter',
      'Bribing the devil with bags of silver and gold'
    ],
    correctAnswer: 'The written Word of God ("It is written...")',
    explanation: 'In all three temptations, Jesus replied with "It is written," quoting God’s inspired Word. Ephesians 6:17 calls the Word of God "the sword of the Spirit," the ultimate weapon against evil.',
    socraticHint: 'With what phrase did Jesus begin each of His three victorious answers to the tempter?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-022',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'A friend dares Kevin to climb onto a slippery water tank roof to prove he is not a coward. How can Kevin apply Jesus’ wilderness response to this dangerous dare?',
    text: 'A friend dares Kevin to climb onto a slippery water tank roof to prove he is not a coward. How can Kevin apply Jesus’ wilderness response to this dangerous dare?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Refuse firmly, remembering that scripture says "Do not put the Lord your God to the test" by taking foolish, dangerous risks',
      'Climb the slippery roof quickly with eyes closed to show how much faith he has in guardian angels',
      'Tell his friend that he will only climb if they take photos to post on the internet',
      'Push his friend up the tank first to see if the metal sheet breaks'
    ],
    correctAnswer: 'Refuse firmly, remembering that scripture says "Do not put the Lord your God to the test" by taking foolish, dangerous risks',
    explanation: 'Just as Jesus refused to jump from the temple roof to show off divine protection, Christian children should reject dangerous dares that put their lives and bodies at risk, knowing that testing God is wrong.',
    socraticHint: 'Which scripture teaching about not putting God to the test helps someone reject reckless peer pressure?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-023',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'According to Hebrews 4:15, why is Jesus able to empathize completely with our human struggles when we face temptation?',
    text: 'According to Hebrews 4:15, why is Jesus able to empathize completely with our human struggles when we face temptation?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because He was tempted in every way, just as we are, yet He did not sin',
      'Because He never lived as a real human and only watched humanity from afar',
      'Because He gave in to temptation several times before becoming holy',
      'Because temptation is an imaginary feeling that does not actually affect humans'
    ],
    correctAnswer: 'Because He was tempted in every way, just as we are, yet He did not sin',
    explanation: 'Hebrews 4:15 comforts believers: "For we do not have a high priest who is unable to empathize with our weaknesses, but we have one who has been tempted in every way, just as we are—yet he did not sin."',
    socraticHint: 'Why can Jesus understand what it feels like to be tempted while remaining completely without sin?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  },
  {
    id: 'q-g5-cre-u4-024',
    subStrandId: 'substrand-g5-cre-u4',
    prompt: 'What happens immediately after the devil leaves Jesus at the conclusion of the wilderness temptation in Matthew 4:11?',
    text: 'What happens immediately after the devil leaves Jesus at the conclusion of the wilderness temptation in Matthew 4:11?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Angels came and attended to (ministered to) Him',
      'Jesus became angry and called down fire on the desert rocks',
      'The Roman emperor Tiberius arrived on a golden chariot to congratulate Him',
      'Jesus decided to cancel His public ministry and live in a cave'
    ],
    correctAnswer: 'Angels came and attended to (ministered to) Him',
    explanation: 'Matthew 4:11 states: "Then the devil left him, and angels came and attended to him." When we resist the devil with God’s Word, he flees (James 4:7), and God provides divine comfort and renewal.',
    socraticHint: 'Who came to comfort, strengthen, and minister to Jesus once the devil departed from the wilderness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-CRE-U4'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 2 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
