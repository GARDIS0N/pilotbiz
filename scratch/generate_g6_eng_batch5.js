import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 6 English Language Batch 5 (Units 9 & 10 - Capstone Finale) ---');

// 1. Batch 5 Sub-strands (Units 9 & 10)
const subStrandsToAdd = [
  {
    id: 'substrand-g6-eng-u9',
    strandId: 'strand-g6-eng-listening',
    learningAreaId: 'la-english-g6',
    title: 'Sports, Talent Development, National Heroes & Adverbs',
    description: 'Celebrating Kenyan athletic legends (Eliud Kipchoge, Faith Kipyegon), motor sports, and grassroots academies; analyzing live sports commentary and athletic idioms; and mastering the syntactic classification and comparative forms of adverbs of manner, degree, frequency, time, and place.',
    cbeCompetency: 'Sports commentary listening comprehension, athletic values reflection, and versatile adverbial syntactic usage',
    estimatedMinutes: 30,
    order: 9
  },
  {
    id: 'substrand-g6-eng-u10',
    strandId: 'strand-g6-eng-writing',
    learningAreaId: 'la-english-g6',
    title: 'Cultural Heritage, Poetry, Figurative Language & KPSEA Composition',
    description: 'Appreciating Kenyan oral traditions, indigenous folktales, proverbs, and poetry stanzas; analyzing figurative devices including similes, metaphors, personification, and alliteration; and applying master narrative composition architecture, "show don\'t tell" sensory descriptions, and proofreading for KPSEA national examination excellence.',
    cbeCompetency: 'Figurative and poetic analysis, narrative plot staging, vivid sensory composition writing, and KPSEA capstone mastery',
    estimatedMinutes: 30,
    order: 10
  }
];

subStrandsToAdd.forEach(sub => {
  if (!db.subStrands.some(s => s.id === sub.id)) {
    db.subStrands.push(sub);
    console.log(`Added subStrand ${sub.id}`);
  }
});

// 2. Batch 5 Lessons (4 lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g6-eng-u9-l1',
    subStrandId: 'substrand-g6-eng-u9',
    title: 'Athletic Greatness, Sports Commentary & Sportsmanship',
    content: 'Kenya is globally celebrated as the ultimate powerhouse of middle- and long-distance athletics.\n\n1. Kenya\'s Sporting Heritage:\n- Athletics legends: Eliud Kipchoge (marathon world record holder and sub-two-hour pioneer), Faith Kipyegon (multi-world record holder and triple Olympic champion), Kipchoge Keino (pioneering Olympic icon).\n- Eldoret & Iten: Known internationally as the "Home of Champions" due to their ideal high-altitude training environments.\n- Diverse sports: Rugby Sevens (Shujaa), Women\'s Volleyball (Malkia Strikers), and the Safari Rally in Naivasha.\n\n2. Sportsmanship & Values:\n- Discipline: Rigorous commitment to daily training, nutrition, and rest.\n- Resilience: Bouncing back from injuries, defeats, or unexpected race obstacles.\n- Integrity & Fair Play: Competing cleanly without banned performance-enhancing substances.\n- Graciousness: Commending competitors in both victory and defeat.\n\n3. Sports Commentary Registers & Collocations:\n- Dynamic verbs: "surges ahead", "anchors the relay", "accelerates into the final bend", "breaks the tape".\n- Sports Idioms in Everyday Speech:\n  * "To pass the baton": Hand over responsibility or leadership to a successor.\n  * "To be on the home stretch": In the final phase of completing an undertaking.\n  * "To jump the gun": Act prematurely or before the appointed time.\n  * "To level the playing field": Provide equal, unbiased conditions for all competitors.',
    didYouKnow: 'Eliud Kipchoge made history in Vienna in 2019 by completing a marathon in 1 hour, 59 minutes, and 40 seconds under the inspiring motto: "No Human Is Limited"!',
    kenyanContext: 'At Kipchoge Keino Stadium in Eldoret, young athletes from Nandi, Elgeyo Marakwet, and Uasin Gishu train relentlessly each morning at sunrise.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u9-l2',
    subStrandId: 'substrand-g6-eng-u9',
    title: 'Adverbs: Manner, Degree, Frequency, Time, Place & Comparison',
    content: 'An adverb modifies a verb, an adjective, or another adverb, providing crucial details about action and circumstance.\n\n1. Major Categories of Adverbs:\n- Adverbs of Manner (How): swiftly, gracefully, flawlessly, tirelessly.\n  * Example: "Faith Kipyegon accelerated smoothly across the track."\n- Adverbs of Degree (To what extent / How much): exceptionally, extremely, utterly, barely, completely.\n  * Example: "The marathon course was exceptionally grueling."\n- Adverbs of Frequency (How often): regularly, seldom, always, occasionally, rarely.\n  * Example: "Kenyan runners regularly train at high altitudes."\n- Adverbs of Time (When): promptly, subsequently, previously, currently.\n  * Example: "The starter\'s pistol fired promptly at 7:00 AM."\n- Adverbs of Place (Where): everywhere, abroad, downhill, outdoors.\n  * Example: "Cheering spectators gathered everywhere along the course."\n\n2. Regular & Irregular Comparative Adverbs:\n- Most adverbs ending in -ly use "more" and "most":\n  * gracefully -> more gracefully -> most gracefully\n- Irregular and short adverbs:\n  * fast -> faster -> fastest (never "fastly")\n  * hard -> harder -> hardest\n  * well -> better -> best\n  * badly -> worse -> worst\n\n3. Pitfall Alert:\n- Words ending in -ly that are ADJECTIVES, not adverbs: "friendly", "lovely", "cowardly", "brotherly". (To use as adverb: "in a friendly manner").',
    didYouKnow: 'The words "fast" and "hard" can function both as adjectives ("a fast runner", "a hard track") and as adverbs ("she ran fast", "she trained hard") without changing spelling!',
    kenyanContext: 'Commentators at the Kip Keino Classic in Kasarani cheered: "Kipyegon surged ahead effortlessly, widening the gap with every powerful stride!"',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u10-l1',
    subStrandId: 'substrand-g6-eng-u10',
    title: 'Kenyan Oral Traditions, Poetry & Figurative Devices',
    content: 'Oral literature is the living treasure of African culture, preserving wisdom, ethics, and artistic imagination across generations.\n\n1. Kenyan Oral Literature Genres:\n- Folktales & Legends: Stories featuring animal tricksters (Hare, Chameleon) or legendary heroes (Luanda Magere, Mekatilili wa Menza) teaching community morality.\n- Proverbs (Methali): Compact sayings embodying collective philosophical wisdom (e.g., "A single finger cannot kill a louse" — emphasizing solidarity).\n- Riddles: Witty metaphorical puzzles that test mental acuity and sharpen observation.\n\n2. Figurative Language Devices:\n- Simile: Comparison using "like" or "as".\n  * Example: "The sprinter broke out like a cheetah chasing its prey."\n- Metaphor: Direct equation stating one thing is another without using "like" or "as".\n  * Example: "The champion is an untamed lion on the track."\n- Personification: Imbuing non-human entities with human attributes.\n  * Example: "The evening breeze whispered lullabies to the sleeping savannah."\n- Onomatopoeia: Words imitating physical sounds.\n  * Example: "The dry branches snapped under the elephant\'s heavy tread."\n- Alliteration: The repetition of initial consonant sounds.\n  * Example: "Swift runners soared serenely through the sunlit savannah."\n\n3. Poetic Form:\n- Stanza: A structured grouping of verse lines in a poem.\n- Rhythm & Sensory Imagery: Appeals to sight (visual), sound (auditory), touch (tactile), and scent (olfactory).',
    didYouKnow: 'Traditional Kenyan storytelling around the evening fireside was known as the hearth tradition, where elders passed down historical genealogies, moral codes, and heroic poetry!',
    kenyanContext: 'During the Kenya Music and Cultural Festival, primary school pupils recite evocative verse accompanied by traditional drum rhythms, the nyatiti, and kayamba rattles.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g6-eng-u10-l2',
    subStrandId: 'substrand-g6-eng-u10',
    title: 'KPSEA Narrative Composition: Plot, Sensory Imagery & Mechanics',
    content: 'The KPSEA English composition assesses a learner\'s narrative storytelling flair, grammatical precision, and thematic creativity.\n\n1. Narrative Plot Structure (The Story Arc):\n- Exposition / Hook: Captivating opening that introduces the main protagonist, temporal setting, and mood without stale clichés like "One fine Saturday morning".\n- Rising Action: A series of events and escalating challenges that create tension or conflict.\n- Climax: The peak moment of intense dramatic confrontation, danger, or decisive choice.\n- Falling Action: The immediate aftermath and unraveling of the climax.\n- Resolution & Moral Reflection: Thoughtful closure resolving the dilemma and sharing personal growth.\n\n2. Master Technique: "Show, Don\'t Tell":\n- Telling (Boring): "Kamau was very frightened when the storm began."\n- Showing (Vivid & Evocative): "A violent shiver ran down Kamau\'s spine as jagged lightning tore across the inky sky, and thunder shook the mud walls of the hut."\n\n3. Varied Sentence Openings:\n- Participial phrase: "Clutching the worn leather bag, Amani hurried toward the bus terminus."\n- Prepositional phrase: "Deep within the shadows of the forest canopy, an owl hooted."\n- Adverbial opener: "Frantically, the search team combed the riverbank for footprints."\n\n4. Mechanical Accuracy Checklist:\n- Punctuation of dialogue: Capital letters inside quotes, commas separating speech tags.\n- Consistent tense: Maintaining past tense narrative without abrupt slips into present tense.\n- Paragraph transitions: Clear indentation and thematic coherence across paragraphs.',
    didYouKnow: 'National examination markers give top marks to candidates who craft authentic personal voices and rich sensory descriptions rather than packing stories with overused idioms that do not fit the plot!',
    kenyanContext: 'Kenya\'s top scoring KPSEA compositions often highlight authentic community experiences, such as organizing a tree nursery in Murang\'a, surviving flash floods near Nyando, or aiding a lost tourist in Tsavo.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(les => {
  if (!db.lessons.some(l => l.id === les.id)) {
    db.lessons.push(les);
    console.log(`Added lesson ${les.id}`);
  }
});

// 3. Batch 5 Missions (4 missions: Orders 138 to 141)
const missionsToAdd = [
  {
    id: 'mission-g6-eng-u9-m1',
    worldId: 'world-word-quest',
    title: 'Mission 138: Champions of Iten – Sports Registers & Legends',
    description: 'Explore sports commentary terminology, athletic idioms, and ethical sportsmanship celebrating Kenya\'s champion runners.',
    order: 138,
    orderIndex: 138,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-athletics',
    badge: 'badge-g6-eng-athletics',
    lessonId: 'lesson-g6-eng-u9-l1',
    questionIds: [
      'q-g6-eng-u9-001', 'q-g6-eng-u9-002', 'q-g6-eng-u9-003', 'q-g6-eng-u9-004',
      'q-g6-eng-u9-005', 'q-g6-eng-u9-006', 'q-g6-eng-u9-007', 'q-g6-eng-u9-008',
      'q-g6-eng-u9-009', 'q-g6-eng-u9-010', 'q-g6-eng-u9-011', 'q-g6-eng-u9-012'
    ]
  },
  {
    id: 'mission-g6-eng-u9-m2',
    worldId: 'world-word-quest',
    title: 'Mission 139: The Speed of Champions – Mastery of Adverbs',
    description: 'Master adverbs of manner, degree, frequency, time, and comparative adverb forms in sports and descriptive registers.',
    order: 139,
    orderIndex: 139,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-eng-adverbs',
    badge: 'badge-g6-eng-adverbs',
    lessonId: 'lesson-g6-eng-u9-l2',
    questionIds: [
      'q-g6-eng-u9-013', 'q-g6-eng-u9-014', 'q-g6-eng-u9-015', 'q-g6-eng-u9-016',
      'q-g6-eng-u9-017', 'q-g6-eng-u9-018', 'q-g6-eng-u9-019', 'q-g6-eng-u9-020',
      'q-g6-eng-u9-021', 'q-g6-eng-u9-022', 'q-g6-eng-u9-023', 'q-g6-eng-u9-024'
    ]
  },
  {
    id: 'mission-g6-eng-u10-m1',
    worldId: 'world-word-quest',
    title: 'Mission 140: Echoes of the Hearth – Poetry & Figurative Craft',
    description: 'Explore Kenyan oral literature, poetry stanzas, and figurative devices: similes, metaphors, personification, and alliteration.',
    order: 140,
    orderIndex: 140,
    xpReward: 135,
    rewardXp: 135,
    coinReward: 45,
    badgeReward: 'badge-g6-eng-poetry',
    badge: 'badge-g6-eng-poetry',
    lessonId: 'lesson-g6-eng-u10-l1',
    questionIds: [
      'q-g6-eng-u10-001', 'q-g6-eng-u10-002', 'q-g6-eng-u10-003', 'q-g6-eng-u10-004',
      'q-g6-eng-u10-005', 'q-g6-eng-u10-006', 'q-g6-eng-u10-007', 'q-g6-eng-u10-008',
      'q-g6-eng-u10-009', 'q-g6-eng-u10-010', 'q-g6-eng-u10-011', 'q-g6-eng-u10-012'
    ]
  },
  {
    id: 'mission-g6-eng-u10-m2',
    worldId: 'world-word-quest',
    title: 'Mission 141: The Grand Storyteller – KPSEA Composition Mastery',
    description: 'Achieve capstone mastery in narrative structure, "show don\'t tell" imagery, diverse sentence openers, and flawless composition editing.',
    order: 141,
    orderIndex: 141,
    xpReward: 150,
    rewardXp: 150,
    coinReward: 50,
    badgeReward: 'badge-g6-eng-master-storyteller',
    badge: 'badge-g6-eng-master-storyteller',
    lessonId: 'lesson-g6-eng-u10-l2',
    questionIds: [
      'q-g6-eng-u10-013', 'q-g6-eng-u10-014', 'q-g6-eng-u10-015', 'q-g6-eng-u10-016',
      'q-g6-eng-u10-017', 'q-g6-eng-u10-018', 'q-g6-eng-u10-019', 'q-g6-eng-u10-020',
      'q-g6-eng-u10-021', 'q-g6-eng-u10-022', 'q-g6-eng-u10-023', 'q-g6-eng-u10-024'
    ]
  }
];

missionsToAdd.forEach(mis => {
  if (!db.missions.some(m => m.id === mis.id)) {
    db.missions.push(mis);
    console.log(`Added mission ${mis.id}`);
  }
});

// 4. Batch 5 Questions (48 questions: 24 for Unit 9, 24 for Unit 10)
const questionsToAdd = [
  // ==========================================
  // Unit 9 Lesson 1: Athletic Greatness & Sports Commentary (q-g6-eng-u9-001 to 012)
  // ==========================================
  {
    id: 'q-g6-eng-u9-001',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'What inspiring personal philosophy and motto did marathon legend Eliud Kipchoge introduce to the world in his historic sub-two-hour run?',
    options: [
      '"No Human Is Limited"',
      '"Win At Any Cost"',
      '"Run Until You Collapse"',
      '"Speed Over Character"'
    ],
    correctAnswer: '"No Human Is Limited"',
    explanation: 'Eliud Kipchoge famously achieved the first sub-two-hour marathon under the empowering mantra "No Human Is Limited".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which uplifting four-word quote reminds every person that human potential has no boundaries?'
  },
  {
    id: 'q-g6-eng-u9-002',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'What does the sports idiom "to be on the home stretch" mean in general life or school projects?',
    options: [
      'To be in the final, finishing stages of completing a task',
      'To stretch your muscles at home before sleeping',
      'To build an extra bedroom onto a house',
      'To get lost on your way walking back from school'
    ],
    correctAnswer: 'To be in the final, finishing stages of completing a task',
    explanation: 'In athletics, the "home stretch" is the final straight section of the track leading directly to the finish line, idiomatically meaning near completion.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Think about a runner entering the last straight track heading straight toward the finish line.'
  },
  {
    id: 'q-g6-eng-u9-003',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'Which town in Elgeyo Marakwet County is celebrated worldwide as the high-altitude "Home of Champions" for long-distance runners?',
    options: [
      'Iten',
      'Lodwar',
      'Malindi',
      'Garissa'
    ],
    correctAnswer: 'Iten',
    explanation: 'Iten, situated on the edge of the Kerio Escarpment at an altitude of approximately 2,400 metres, is famous as the "Home of Champions".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which high-altitude town in the Rift Valley has a famous arch welcoming visitors to the "Home of Champions"?'
  },
  {
    id: 'q-g6-eng-u9-004',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'If a student starts an exam before the supervisor says "Begin," which sports idiom best describes their action?',
    options: [
      'They jumped the gun',
      'They passed the baton',
      'They dropped the ball',
      'They cleared the hurdle'
    ],
    correctAnswer: 'They jumped the gun',
    explanation: 'To "jump the gun" originated from sprinters who start running before the starter\'s starting pistol has fired, meaning to act prematurely.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What happens in a sprint when an athlete starts running before the starter pistol fires?'
  },
  {
    id: 'q-g6-eng-u9-005',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'In the live sports commentary: "Faith Kipyegon surges ahead into the final 200 metres!" what does the verb "surges" describe?',
    options: [
      'A powerful, sudden burst of forward speed and momentum',
      'Slowing down to a gentle jog to rest her legs',
      'Stopping to wave cheerfully at the spectators',
      'Falling backward onto the grass verge'
    ],
    correctAnswer: 'A powerful, sudden burst of forward speed and momentum',
    explanation: 'To "surge" means to move suddenly and powerfully forward or upward with tremendous energy and force.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'When ocean waves or runners "surge", do they slow down or accelerate with great power?'
  },
  {
    id: 'q-g6-eng-u9-006',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'What is the meaning of the sports idiom "to pass the baton" when an elder headteacher retires and welcomes the newly appointed deputy?',
    options: [
      'To transfer leadership duties and responsibility to a successor',
      'To drop a piece of wooden stick during assembly',
      'To run a relay race around the school compound',
      'To refuse to cooperate with staff members'
    ],
    correctAnswer: 'To transfer leadership duties and responsibility to a successor',
    explanation: 'Just like relay runners hand over the baton to the next team member, "passing the baton" idiomatically means entrusting continuity and leadership to someone else.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What happens in a 4x400m relay when one runner reaches the changeover zone?'
  },
  {
    id: 'q-g6-eng-u9-007',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'Which value of true sportsmanship is demonstrated when an athlete congratulates an opponent who has just defeated them fairly?',
    options: [
      'Graciousness and integrity in defeat',
      'Indifference and lack of ambition',
      'Mockery and hostility towards the winner',
      'Admitting that they did not try hard'
    ],
    correctAnswer: 'Graciousness and integrity in defeat',
    explanation: 'Sportsmanship involves humility in triumph and graciousness in defeat, respecting the opponent\'s achievement and fair competition.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What virtue enables an athlete to honour their competitor with dignity even when they lose?'
  },
  {
    id: 'q-g6-eng-u9-008',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'Which sentence features authentic sports commentary register with dynamic verbs and descriptive adjectives?',
    options: [
      'The Kenyan striker unleashed a blistering volley that ricocheted off the crossbar into the net.',
      'A person kicked a ball and it went somewhere near some poles and went in.',
      'Football is a nice game played by people wearing shorts on grass.',
      'The ball was quite round and someone kicked it in an ordinary manner.'
    ],
    correctAnswer: 'The Kenyan striker unleashed a blistering volley that ricocheted off the crossbar into the net.',
    explanation: 'Commentary uses evocative action words ("unleashed", "blistering", "ricocheted") that bring fast-paced athletic action to life.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which sentence sounds like an exciting radio or television football commentator?'
  },
  {
    id: 'q-g6-eng-u9-009',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'What does the idiom "to level the playing field" signify in a social or sports governance context?',
    options: [
      'To ensure fair, equitable conditions where everyone has an equal opportunity',
      'To use a tractor to flatten uneven soil on a rugby pitch',
      'To ban all competitors from wearing running shoes',
      'To shorten the race distance so that everyone finishes together'
    ],
    correctAnswer: 'To ensure fair, equitable conditions where everyone has an equal opportunity',
    explanation: '"Leveling the playing field" means removing unjust obstacles or unfair advantages so that all participants compete under identical rules and fair conditions.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Think about fairness in competition: if a pitch is level, neither team has an unfair slope advantage.'
  },
  {
    id: 'q-g6-eng-u9-010',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'In relay events, what is the official term for the final runner who runs the last leg of the race and secures the team\'s victory?',
    options: [
      'The anchor leg',
      'The pace maker',
      'The track marshal',
      'The false starter'
    ],
    correctAnswer: 'The anchor leg',
    explanation: 'The "anchor" is the final runner in a relay team, typically chosen for their speed, composure, and sprint finishing power.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What maritime term is used for the reliable athlete who holds the team steady on the final lap?'
  },
  {
    id: 'q-g6-eng-u9-011',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'Which sentence correctly pairs a sports term with its precise definition in athletics?',
    options: [
      'A pacemaker is a designated runner who leads the race at a preset speed to help competitors attain record times.',
      'A sprint is a marathon race lasting over forty-two kilometres.',
      'A hurdle is a round heavy ball thrown across an open field.',
      'A baton is a spiked shoe worn by long-jump athletes.'
    ],
    correctAnswer: 'A pacemaker is a designated runner who leads the race at a preset speed to help competitors attain record times.',
    explanation: 'A pacemaker (or "rabbit") sets a fast, controlled rhythm during the initial stages of distance races before stepping aside.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What role does a runner perform when their sole job is to establish the target pace for the first half of a race?'
  },
  {
    id: 'q-g6-eng-u9-012',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l1',
    text: 'Read the sports editorial excerpt: "True champions are not defined solely by their glittering medals, but by their humility, unyielding perseverance, and refusal to compromise on ethical sportsmanship." Which word in the sentence is a synonym for "dogged determination" or "tenacity"?',
    options: [
      'Perseverance',
      'Glittering',
      'Compromise',
      'Solely'
    ],
    correctAnswer: 'Perseverance',
    explanation: '"Perseverance" means persistence and steadfast dedication to doing something despite difficulty or delay in achieving success.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which word describes continuing persistently through hardships without giving up?'
  },

  // ==========================================
  // Unit 9 Lesson 2: Adverbs: Types, Position & Comparison (q-g6-eng-u9-013 to 024)
  // ==========================================
  {
    id: 'q-g6-eng-u9-013',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'In the sentence: "Faith Kipyegon ran swiftly across the finish line," what type of adverb is "swiftly"?',
    options: [
      'Adverb of manner',
      'Adverb of time',
      'Adverb of place',
      'Adverb of frequency'
    ],
    correctAnswer: 'Adverb of manner',
    explanation: '"Swiftly" explains HOW she ran, answering the question "How?", making it an adverb of manner.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does "swiftly" tell us when she ran, where she ran, or the manner in which she ran?'
  },
  {
    id: 'q-g6-eng-u9-014',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Identify the adverb of frequency in the following sentence: "The cross-country team always begins morning jogs at sunrise."',
    options: [
      'always',
      'morning',
      'sunrise',
      'team'
    ],
    correctAnswer: 'always',
    explanation: '"Always" answers "How often?" the action happens, making it an adverb of frequency.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which word answers the question: "How often does the team begin morning jogs?"'
  },
  {
    id: 'q-g6-eng-u9-015',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Which word is the comparative form of the adverb "fast"?',
    options: [
      'faster',
      'more fastly',
      'fastlier',
      'most fast'
    ],
    correctAnswer: 'faster',
    explanation: '"Fast" is an irregular adverb that takes the suffix -er ("faster") for comparison. "Fastly" is grammatically incorrect.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does the adverb "fast" take "-er" or does it use "more fastly"?'
  },
  {
    id: 'q-g6-eng-u9-016',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'In the sentence: "The rally cars drove downhill towards Lake Naivasha," what kind of adverb is "downhill"?',
    options: [
      'Adverb of place',
      'Adverb of manner',
      'Adverb of degree',
      'Adverb of time'
    ],
    correctAnswer: 'Adverb of place',
    explanation: '"Downhill" tells us WHERE the cars drove, making it an adverb of place.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does "downhill" answer the question where, when, or why?'
  },
  {
    id: 'q-g6-eng-u9-017',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Which sentence correctly uses an adverb of degree to modify an adjective?',
    options: [
      'The marathon route was exceptionally steep.',
      'The marathon runner jogged yesterday.',
      'The marathon runner trains twice weekly.',
      'The marathon runner was in Eldoret.'
    ],
    correctAnswer: 'The marathon route was exceptionally steep.',
    explanation: '"Exceptionally" is an adverb of degree modifying the adjective "steep", answering "To what extent was it steep?".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which word shows the intensity or degree of the steepness?'
  },
  {
    id: 'q-g6-eng-u9-018',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'What is the correct comparative form of the adverb "gracefully"?',
    options: [
      'more gracefully',
      'gracefuller',
      'most gracefully',
      'gracefully-er'
    ],
    correctAnswer: 'more gracefully',
    explanation: 'Adverbs ending in -ly form their comparative degree by adding "more" in front ("more gracefully").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'How do multisyllable adverbs ending in "-ly" form their comparative degree?'
  },
  {
    id: 'q-g6-eng-u9-019',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Identify the sentence in which the word ending in "-ly" is an ADJECTIVE rather than an adverb:',
    options: [
      'The team captain had a friendly conversation with the referee.',
      'The athlete leaped gracefully over the steeplechase barrier.',
      'Eliud Kipchoge answered the questions calmly.',
      'The spectators cheered loudly throughout the stadium.'
    ],
    correctAnswer: 'The team captain had a friendly conversation with the referee.',
    explanation: '"Friendly" modifies the noun "conversation", functioning as an adjective. The others ("gracefully", "calmly", "loudly") are adverbs modifying verbs.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Look for a word that describes a noun ("conversation") instead of an action verb.'
  },
  {
    id: 'q-g6-eng-u9-020',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Where should the adverb of frequency "seldom" be placed in the sentence: "Athletes [1] eat [2] junk food [3] before races [4]?"',
    options: [
      'Position [1]: Athletes seldom eat junk food before races.',
      'Position [2]: Athletes eat seldom junk food before races.',
      'Position [3]: Athletes eat junk food seldom before races.',
      'Position [4]: Athletes eat junk food before races seldom.'
    ],
    correctAnswer: 'Position [1]: Athletes seldom eat junk food before races.',
    explanation: 'Adverbs of frequency typically precede the main verb ("seldom eat").',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Where do frequency adverbs like "always", "never", and "seldom" normally sit relative to the main verb?'
  },
  {
    id: 'q-g6-eng-u9-021',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Choose the sentence that correctly uses the superlative form of the irregular adverb "well":',
    options: [
      'Of all the runners in the squad, Wanjiru performed best under pressure.',
      'Of all the runners in the squad, Wanjiru performed most well under pressure.',
      'Of all the runners in the squad, Wanjiru performed goodest under pressure.',
      'Of all the runners in the squad, Wanjiru performed better under pressure.'
    ],
    correctAnswer: 'Of all the runners in the squad, Wanjiru performed best under pressure.',
    explanation: 'The degrees of the adverb "well" are: positive = well, comparative = better, superlative = best.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What is the highest (superlative) form of "well"? (well -> better -> ?)'
  },
  {
    id: 'q-g6-eng-u9-022',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Identify the sentence containing an adverb of degree modifying another adverb:',
    options: [
      'The Kenyan sprinter reacted remarkably quickly to the starter\'s horn.',
      'The Kenyan sprinter won the gold medal in Nairobi.',
      'The Kenyan sprinter jogged around the stadium slowly.',
      'The Kenyan sprinter has three gold medals.'
    ],
    correctAnswer: 'The Kenyan sprinter reacted remarkably quickly to the starter\'s horn.',
    explanation: 'Here, "quickly" is an adverb of manner modifying "reacted", and "remarkably" is an adverb of degree modifying the adverb "quickly".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which sentence has two adverbs side-by-side, where the first tells the degree of the second?'
  },
  {
    id: 'q-g6-eng-u9-023',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Which sentence uses the adverb "hard" correctly according to standard English grammar?',
    options: [
      'The athletes trained hard throughout the dry season.',
      'The athletes trained hardly throughout the dry season.',
      'The athletes trained hardlier throughout the dry season.',
      'The athletes trained more hardly throughout the dry season.'
    ],
    correctAnswer: 'The athletes trained hard throughout the dry season.',
    explanation: '"Hard" is the correct adverb meaning with great effort. "Hardly" is a completely different adverb meaning "scarcely" or "almost not at all".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Be careful: what does "hardly" mean versus "hard"? If they worked with great effort, which word is used?'
  },
  {
    id: 'q-g6-eng-u9-024',
    subStrandId: 'substrand-g6-eng-u9',
    lessonId: 'lesson-g6-eng-u9-l2',
    text: 'Identify the sentence where adverbial placement creates an ambiguous or confusing meaning (misplaced adverb):',
    options: [
      'The coach only told Kiprono to run five laps, not ten.',
      'The coach told only Kiprono to run five laps.',
      'The coach told Kiprono to run only five laps.',
      'The coach told Kiprono only to run five laps.'
    ],
    correctAnswer: 'The coach told Kiprono only to run five laps.',
    explanation: 'Placing "only" immediately before "to run" can ambiguously mean that running is the sole activity he was told to do, rather than limiting the number of laps ("only five laps").',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Where should "only" be placed if it is intended to restrict the exact number of laps?'
  },

  // ==========================================
  // Unit 10 Lesson 1: Oral Traditions, Poetry & Figurative Devices (q-g6-eng-u10-001 to 012)
  // ==========================================
  {
    id: 'q-g6-eng-u10-001',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Which figure of speech is used in the sentence: "The defender stood as firm as a rock against the opposing attackers"?',
    options: [
      'Simile',
      'Metaphor',
      'Personification',
      'Alliteration'
    ],
    correctAnswer: 'Simile',
    explanation: 'A simile directly compares two different things using the words "as" or "like" ("as firm as a rock").',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which device makes a direct comparison using the connecting word "as" or "like"?'
  },
  {
    id: 'q-g6-eng-u10-002',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'What figure of speech gives human qualities to non-human things in the sentence: "The angry clouds wept tears of rain over the Rift Valley"?',
    options: [
      'Personification',
      'Hyperbole',
      'Onomatopoeia',
      'Oxymoron'
    ],
    correctAnswer: 'Personification',
    explanation: 'Personification attributes human emotions and actions ("angry", "wept tears") to clouds.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Can clouds literally become angry and weep like a human person?'
  },
  {
    id: 'q-g6-eng-u10-003',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'In poetry, what is the term for a group of lines forming a distinct recurring unit, similar to a paragraph in prose?',
    options: [
      'Stanza',
      'Sentence',
      'Dialogue',
      'Proverb'
    ],
    correctAnswer: 'Stanza',
    explanation: 'A stanza is a grouped set of lines within a poem, usually separated from others by a blank line.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What poetic building block corresponds to a paragraph in a narrative essay?'
  },
  {
    id: 'q-g6-eng-u10-004',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'What does the famous Kenyan proverb "Haba na haba hujaza kibaba" (Little by little fills the measure) teach learners about life and study habits?',
    options: [
      'Small, consistent daily efforts lead to great accomplishments over time',
      'One should only study five minutes before the final examination',
      'A container must never be filled completely with grain',
      'Big accomplishments can only happen overnight with sudden luck'
    ],
    correctAnswer: 'Small, consistent daily efforts lead to great accomplishments over time',
    explanation: 'This timeless proverb teaches patience, diligence, and incremental progress: persistent small actions accumulate into substantial success.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'If each small grain slowly fills a bowl, what does that teach about daily revision?'
  },
  {
    id: 'q-g6-eng-u10-005',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Which sentence contains a metaphor?',
    options: [
      'Wangari Maathai was a beacon of hope for environmental conservation.',
      'Wangari Maathai worked like a busy bee in the nursery.',
      'Wangari Maathai was as brave as a lion facing the loggers.',
      'Wangari Maathai planted many green trees in Karura Forest.'
    ],
    correctAnswer: 'Wangari Maathai was a beacon of hope for environmental conservation.',
    explanation: 'A metaphor asserts that one thing IS another ("was a beacon of hope") without using comparative words such as "like" or "as".',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which sentence states directly that she was something else without using "like" or "as"?'
  },
  {
    id: 'q-g6-eng-u10-006',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Identify the poetic device featured in the line: "Silver streams swept softly through the Samburu shrubland."',
    options: [
      'Alliteration',
      'Hyperbole',
      'Riddle',
      'Pun'
    ],
    correctAnswer: 'Alliteration',
    explanation: 'Alliteration is the repetition of the identical initial consonant sound ("s" in Silver, streams, swept, softly, Samburu, shrubland).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Notice the repetition of the letter "s" sound at the start of multiple words in the line.'
  },
  {
    id: 'q-g6-eng-u10-007',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Which sentence features onomatopoeia, where words imitate the actual acoustic sounds they describe?',
    options: [
      'The dry twigs snapped and crackled under the weight of the charging buffalo.',
      'The buffalo charged very quickly across the open grass.',
      'The buffalo had huge horns curving high above its head.',
      'The herd was grazing quietly under the shade of acacia trees.'
    ],
    correctAnswer: 'The dry twigs snapped and crackled under the weight of the charging buffalo.',
    explanation: '"Snapped" and "crackled" are onomatopoeic words that phonetically imitate the sharp sounds made by breaking dry wood.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which words sound like the actual physical noise they make when dry branches break?'
  },
  {
    id: 'q-g6-eng-u10-008',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'In traditional Kenyan trickster folktales, which character often uses quick wits and cunning to outsmart larger and stronger predators?',
    options: [
      'The Hare (Sungura)',
      'The Elephant',
      'The Lion',
      'The Rhinoceros'
    ],
    correctAnswer: 'The Hare (Sungura)',
    explanation: 'In East African oral folklore, Sungura (the Hare) is the archetypal trickster whose intellect, wit, and adaptability triumph over brute physical strength.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which small, swift animal in Swahili tales is famous for outsmarting lions and hyenas through sheer wit?'
  },
  {
    id: 'q-g6-eng-u10-009',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Analyze the poem excerpt:\n"The baobab stands with weathered hands,\nReaching upward to star-strewn lands.\nIt remembers the songs the ancestors sung,\nWhen the Earth was green and time was young."\nWhat figure of speech is primarily developed in the first and third lines?',
    options: [
      'Personification',
      'Onomatopoeia',
      'Metonymy',
      'Simile'
    ],
    correctAnswer: 'Personification',
    explanation: 'Attributing "weathered hands" and the ability to "remember songs" to a baobab tree is personification, treating the tree as an ancient human elder.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Does a tree have literal human hands and human memories?'
  },
  {
    id: 'q-g6-eng-u10-010',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'What type of sensory imagery is most prominent in the line: "The sweet scent of crushed cloves and roasting cardamom drifted from the Old Town alleyways"?',
    options: [
      'Olfactory imagery (sense of smell)',
      'Tactile imagery (sense of touch)',
      'Kinesthetic imagery (sense of muscle motion)',
      'Visual imagery only (sense of sight)'
    ],
    correctAnswer: 'Olfactory imagery (sense of smell)',
    explanation: '"Scent", "cloves", and "roasting cardamom" stimulate the olfactory sense (smell), evoking rich aromatic culinary impressions.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which human sense perceives the sweet scent of aromatic spices like cloves and cardamom?'
  },
  {
    id: 'q-g6-eng-u10-011',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'What is the rhyme scheme of this four-line stanza?\n"The morning mist begins to clear, (A)\nThe chirping birds are singing near, (A)\nThe cattle graze upon the hill, (B)\nWhile morning breezes whistle still." (B)',
    options: [
      'AABB',
      'ABAB',
      'ABBA',
      'ABCD'
    ],
    correctAnswer: 'AABB',
    explanation: 'Lines 1 and 2 end with "clear" and "near" (rhyme A); lines 3 and 4 end with "hill" and "still" (rhyme B). Therefore, the rhyme scheme is AABB.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Examine the end rhyming sounds: clear/near (pair 1) and hill/still (pair 2).'
  },
  {
    id: 'q-g6-eng-u10-012',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l1',
    text: 'Why do oral literature folktales across Kenyan communities traditionally conclude with an explicit moral lesson (the coda)?',
    options: [
      'To educate young listeners on cultural ethics, virtues, and consequences of actions',
      'To demonstrate that the storyteller knows harder words than the listeners',
      'Because the government requires all stories to have exactly three paragraphs',
      'To prevent the audience from asking any questions'
    ],
    correctAnswer: 'To educate young listeners on cultural ethics, virtues, and consequences of actions',
    explanation: 'Oral narratives in indigenous societies served primarily as didactic tools to transmit moral values, communal responsibilities, and social harmony.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What was the pedagogical and cultural purpose of storytelling around evening fires?'
  },

  // ==========================================
  // Unit 10 Lesson 2: KPSEA Narrative Composition (q-g6-eng-u10-013 to 024)
  // ==========================================
  {
    id: 'q-g6-eng-u10-013',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'What is the highest point of dramatic action, emotional suspense, or turning point in a narrative composition called?',
    options: [
      'Climax',
      'Exposition',
      'Resolution',
      'Introduction'
    ],
    correctAnswer: 'Climax',
    explanation: 'The climax is the peak turning point of maximum tension, danger, or emotional confrontation in a narrative arc.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What literary term refers to the mountain-peak moment of greatest excitement or conflict in a story?'
  },
  {
    id: 'q-g6-eng-u10-014',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which opening sentence is best suited for an engaging KPSEA narrative composition?',
    options: [
      'A deafening crack of thunder shook our classroom windowpanes, plunging us into sudden darkness.',
      'One day, I woke up and it was morning and the sun was shining.',
      'This is a composition about a day that I will never forget.',
      'My name is Juma and I am going to write about an adventure.'
    ],
    correctAnswer: 'A deafening crack of thunder shook our classroom windowpanes, plunging us into sudden darkness.',
    explanation: 'An effective narrative hook immediately immerses the reader into sensory action and dramatic atmosphere without tired, clichéd announcements.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which opener grabs the examiner\'s attention immediately with vivid sensory action?'
  },
  {
    id: 'q-g6-eng-u10-015',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'What is the key principle behind the creative writing technique "Show, Don\'t Tell"?',
    options: [
      'Describe physical actions, sensations, and emotions instead of merely stating facts',
      'Draw pictures and diagrams on your composition paper instead of writing words',
      'Tell the examiner exactly what grade you want to receive',
      'Keep sentences as brief and plain as possible'
    ],
    correctAnswer: 'Describe physical actions, sensations, and emotions instead of merely stating facts',
    explanation: '"Show, don\'t tell" enables readers to experience the narrative through sensory details, body language, and visceral reactions rather than simple author summaries.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Rather than simply saying "She was nervous", what does a skilled writer describe?'
  },
  {
    id: 'q-g6-eng-u10-016',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which sentence correctly demonstrates the "Show, Don\'t Tell" technique for showing extreme exhaustion after running a race?',
    options: [
      'He collapsed onto the grass, chest heaving and sweat stinging his burning eyes as his legs trembled violently.',
      'He was very tired because the race was long.',
      'He felt tired and wanted to sleep right there.',
      'Tiredness was felt by him after the athletics event.'
    ],
    correctAnswer: 'He collapsed onto the grass, chest heaving and sweat stinging his burning eyes as his legs trembled violently.',
    explanation: 'The sentence reveals exhaustion through physiological sensory evidence (heaving chest, stinging sweat, trembling legs) rather than a flat statement.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Look for vivid physiological descriptions of what a fatigued body actually looks and feels like.'
  },
  {
    id: 'q-g6-eng-u10-017',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which sentence features a participial phrase opener that adds syntactic variety to a narrative paragraph?',
    options: [
      'Gasping for breath, Chebet bolted across the wooden suspension bridge.',
      'Chebet was gasping for breath and she bolted across the wooden bridge.',
      'The bridge was wooden and Chebet bolted across it while gasping.',
      'Bolting across the wooden bridge was done by Chebet who gasped.'
    ],
    correctAnswer: 'Gasping for breath, Chebet bolted across the wooden suspension bridge.',
    explanation: '"Gasping for breath" is a present participial phrase opening the sentence dynamically, followed by a comma and the main clause.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which sentence begins with a present participle (-ing phrase) modifying the subject?'
  },
  {
    id: 'q-g6-eng-u10-018',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which sentence demonstrates correct punctuation when formatting direct speech in a dialogue exchange?',
    options: [
      '"Hurry, the river is rising!" shouted Otieno as he tossed the nylon rope.',
      '"Hurry, the river is rising"! shouted Otieno as he tossed the nylon rope.',
      '"Hurry, the river is rising" shouted Otieno! as he tossed the nylon rope.',
      '"Hurry, the river is rising!" Shouted Otieno as he tossed the nylon rope.'
    ],
    correctAnswer: '"Hurry, the river is rising!" shouted Otieno as he tossed the nylon rope.',
    explanation: 'The exclamation mark goes inside the closing quotation mark, and the speech tag verb "shouted" begins with a lowercase letter because it continues the sentence.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Ensure the terminal punctuation sits inside the quotes and the reporting verb is not capitalized unless it is a proper noun.'
  },
  {
    id: 'q-g6-eng-u10-019',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'What is the primary role of the "rising action" in the architectural plot of a story?',
    options: [
      'To introduce progressive complications and obstacles that heighten suspense',
      'To provide a dictionary definition of every technical word used',
      'To reveal the moral ending of the story right at the beginning',
      'To list the names of all the author\'s classmates'
    ],
    correctAnswer: 'To introduce progressive complications and obstacles that heighten suspense',
    explanation: 'The rising action consists of complications that intensify the conflict and build dramatic curiosity leading up to the climax.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What happens between the opening introduction and the big dramatic climax?'
  },
  {
    id: 'q-g6-eng-u10-020',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which sentence uses a prepositional phrase opener to set an evocative narrative scene?',
    options: [
      'Under the silver glow of the full moon, the hyenas prowled around the boma.',
      'The hyenas prowled around the boma under the silver glow of the full moon.',
      'Hyenas are nocturnal predators and they like to prowl near bomas.',
      'It was a full moon and the hyenas were prowling under its silver glow.'
    ],
    correctAnswer: 'Under the silver glow of the full moon, the hyenas prowled around the boma.',
    explanation: '"Under the silver glow of the full moon" is a fronted prepositional phrase creating an atmospheric setting before introducing the main subject and action.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Which option begins with a preposition like "Under...", creating an atmospheric setting?'
  },
  {
    id: 'q-g6-eng-u10-021',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Identify the narrative excerpt that exhibits an unwarranted tense inconsistency (tense shift error):',
    options: [
      'We walked quietly into the cave and suddenly we hear a strange noise.',
      'We walked quietly into the cave and suddenly we heard a strange noise.',
      'We had been walking quietly into the cave when we heard a strange noise.',
      'As we walked quietly into the cave, a strange noise startled us.'
    ],
    correctAnswer: 'We walked quietly into the cave and suddenly we hear a strange noise.',
    explanation: 'The sentence shifts erroneously from the past tense ("walked") into the present tense ("hear"). Both actions occurred in the past, so "heard" is required.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Look for an abrupt and incorrect switch between past tense ("walked") and present tense in the same sentence.'
  },
  {
    id: 'q-g6-eng-u10-022',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Which of the following concluding paragraphs provides the most mature and reflective resolution for a KPSEA narrative?',
    options: [
      'As the embers of the rescue fire flickered into ash, I realized that true bravery is not the absence of fear, but the resolve to act for others despite it. That stormy night taught us the priceless value of unity.',
      'Then I woke up and discovered that everything had just been a bad dream and my mother was calling me to eat porridge.',
      'And they all lived happily ever after, the end. If you enjoyed my story please give me thirty marks out of forty.',
      'Suddenly a helicopter landed and took us home and we never talked about that day again because we were tired.'
    ],
    correctAnswer: 'As the embers of the rescue fire flickered into ash, I realized that true bravery is not the absence of fear, but the resolve to act for others despite it. That stormy night taught us the priceless value of unity.',
    explanation: 'A mature narrative resolution ties together atmospheric imagery, character growth, and a profound philosophical reflection, avoiding cliché cop-outs like "it was all a dream".',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'Examiners penalize "it was all a dream" endings. Which choice provides a thoughtful moral reflection and thematic closure?'
  },
  {
    id: 'q-g6-eng-u10-023',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'Read the draft sentence: "The elderly fisherman whom had spent forty years on Lake Victoria skillfully navigated the swelling waves." Which grammatical correction should be made?',
    options: [
      'Replace "whom" with "who"',
      'Replace "skillfully" with "skillful"',
      'Replace "navigated" with "navigating"',
      'Replace "had spent" with "has spent"'
    ],
    correctAnswer: 'Replace "whom" with "who"',
    explanation: '"Who" is the subject pronoun governing the verb "had spent" in the relative clause. "Whom" is an objective pronoun and cannot serve as the subject.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'In the relative clause, is the pronoun performing the action of spending forty years (subject) or receiving it (object)?'
  },
  {
    id: 'q-g6-eng-u10-024',
    subStrandId: 'substrand-g6-eng-u10',
    lessonId: 'lesson-g6-eng-u10-l2',
    text: 'During the final proofreading stage of a KPSEA examination composition, which strategy is most effective for catching overlooked errors in punctuation, agreement, and word omission?',
    options: [
      'Reading through the composition silently and methodically sentence by sentence, checking subject-verb agreement, dialogue punctuation, and paragraph unity',
      'Erasing all quotation marks to avoid making any dialogue mistakes',
      'Replacing every common word with the longest word found in a thesaurus',
      'Rewriting the entire story from scratch in the last two minutes'
    ],
    correctAnswer: 'Reading through the composition silently and methodically sentence by sentence, checking subject-verb agreement, dialogue punctuation, and paragraph unity',
    explanation: 'Systematic proofreading focuses on verifying technical accuracy (concord, punctuation, spelling) and paragraph coherence, cementing top marks.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    socraticHint: 'What disciplined, systematic review method ensures grammatical concord and mechanical accuracy without panic?'
  }
];

questionsToAdd.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
    console.log(`Added question ${q.id}`);
  }
});

// Write updated db to file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Batch 5 (Capstone Finale) of Grade 6 English Language successfully generated and written to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
