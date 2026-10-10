/**
 * Grade 6 Creative Arts & Sports - Batch 4 Generator
 * Content: Units 7 & 8
 * - Unit 7: East African Folk Songs, Creative Dance Choreography & Costumes (substrand-g6-ca-u7, strand-g6-ca-music)
 * - Unit 8: Track Athletics: Sprints, Relay Baton Exchange & Middle Distance Running (substrand-g6-ca-u8, strand-g6-ca-sports)
 * Missions: Orders 51, 52, 53, 54 (world-creative-studio)
 * Questions: 48 (24 per unit: q-g6-ca-u7-001 to q-g6-ca-u8-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Creative Arts & Sports Batch 4 (Units 7 & 8) ---');

// 1. Units (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ca-u7',
    strandId: 'strand-g6-ca-music',
    learningAreaId: 'la-creative-g6',
    title: 'East African Folk Songs, Creative Dance Choreography & Costumes',
    name: 'East African Folk Songs, Creative Dance Choreography & Costumes',
    description: 'Analysis and performance of Kenyan and East African folk songs from diverse cultural communities (Luhya, Luo, Kikuyu, Mijikenda, Maasai, Kamba, Kalenjin, Giriama); components of folk dance (locomotor and non-locomotor movements, facial expressions, gestures, floor formations, rhythmic accompaniment, tempo variations, storytelling); stage decor, authentic costumes, traditional ornaments, body paint, and props; ethical presentation, respect for cultural diversity, and preservation of intangible cultural heritage.',
    cbeCompetency: 'Cultural dance performance, vocal coordination, choreographic design, and cultural heritage appreciation',
    estimatedMinutes: 30,
    order: 7,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ca-u8',
    strandId: 'strand-g6-ca-sports',
    learningAreaId: 'la-creative-g6',
    title: 'Track Athletics: Sprints, Relay Baton Exchange & Middle Distance Running',
    name: 'Track Athletics: Sprints, Relay Baton Exchange & Middle Distance Running',
    description: 'Biomechanics and techniques of sprint races (100m, 200m) including starting blocks, commands ("On your marks", "Set", "Go"/starter gun), crouch starts (bunch, medium, elongated), drive phase, maximum velocity sprint mechanics, and torso finish (run-through, dip, shoulder shrug); 4x100m and 4x400m relay baton exchange (visual and non-visual/blind exchanges, changeover zone, acceleration mark, downward and upward pass); pacing, breathing rhythms, stride cadence, cardiovascular endurance, and tactical racing in middle-distance events (800m, 1500m); track rules, lane discipline, false start regulations, and sportsmanship.',
    cbeCompetency: 'Sprinting mechanics, baton exchange coordination, aerobic/anaerobic endurance, and athletic rule adherence',
    estimatedMinutes: 30,
    order: 8,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ca-u7-l1',
    subStrandId: 'substrand-g6-ca-u7',
    title: 'Folk Songs: Singing Styles, Melodic Call-and-Response & Cultural Messages',
    content: 'An East African folk song is an indigenous musical expression passed orally across generations, reflecting communal ceremonies, work, rites of passage, lullabies, warfare, and praise.\n\n1. Structural Characteristics:\n- Call-and-Response: A solo cantor leads with melodic improvisation and storytelling, while the chorus responds with a harmonious, rhythmic refrain.\n- Polyrhythm and Syncopation: Complex overlapping beats that match physical work rhythms or traditional dance footwork.\n- Vocal Embellishments: Expressive ornaments such as ululation (vigelegele), melodic grunts, yodeling, and pitch glides.\n\n2. Categories of Folk Songs:\n- Work Songs: Sung during communal labor (hoeing, harvesting, boat paddling, threshing grain) to synchronize effort and reduce fatigue.\n- Lullabies: Gentle, melodious songs sung at a soft dynamic level to calm and soothe infants to sleep.\n- Ceremonial & Ritual Songs: Performed during weddings, initiations, harvest festivals, and memorials (dirges).\n\n3. Authentic Performance Delivery:\n- Clear diction and pronunciation respecting the tonal nuances of the indigenous language.\n- Expressive facial engagement communicating the emotional mood (joy, triumph, reverence, sorrow).',
    didYouKnow: 'In many African languages, the pitch of a spoken word determines its literal meaning, which is why folk melodies naturally follow the tonal contours of the spoken language!',
    kenyanContext: 'At the Kenya National Music Festivals, schools present folk songs from all 47 counties, wearing genuine cultural ornaments to celebrate Kenya’s rich cultural diversity.',
    order: 13,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u7-l2',
    subStrandId: 'substrand-g6-ca-u7',
    title: 'Dance Formations, Dynamic Choreography, Costumes & Adornments',
    content: 'Traditional African dance fuses rhythmic movement, music, theatrical expression, and communal storytelling.\n\n1. Elements of Dance Choreography:\n- Body Movements: Locomotor movements (leaping, stamping, skipping, gliding across the floor) and non-locomotor movements (shoulder shivering, torso swaying, hip isolations, head nodding in place).\n- Floor Formations: Circular formations (symbolizing communal unity, wholeness, and equality), linear ranks and files (depicting warrior processions and disciplined unity), serpentine/zigzag pathways, and semi-circles.\n- Dynamics & Tempo: Alternating between slow graceful movements and rapid energetic climaxes.\n\n2. Costumes, Adornments & Props:\n- Authentic Costumes: Sisal or raffia skirts, animal skins, printed Lesos/Kangas, and beadwork.\n- Traditional Ornaments: Cowrie shell necklaces, beaded collars, feather headdresses, and ankle pellet rattles (gara/jingles) that accentuate every foot stamp.\n- Body Adornment: Natural mineral pigments like red ochre and white chalk used for ceremonial body patterns.\n- Dance Props: Handheld ceremonial objects such as flywhisks (ching’ang’a), decorated gourds, shields, and spears that heighten dramatic climax.',
    didYouKnow: 'The iconic Isukuti dance of the Luhya community has been formally inscribed on UNESCO’s List of Intangible Cultural Heritage in Need of Urgent Safeguarding!',
    kenyanContext: 'Traditional dances such as the Maasai Adumu (jumping dance), the Mijikenda Sengenya, and the Kamba Mukanda acrobatics are national cultural treasures performed during Madaraka and Mashujaa Day celebrations.',
    order: 14,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u8-l1',
    subStrandId: 'substrand-g6-ca-u8',
    title: 'Sprint Mechanics: Crouch Start, Acceleration, Stride Frequency & Dip Finish',
    content: 'Sprints are short-distance track races (100m, 200m, 400m) run at maximum anaerobic speed.\n\n1. Starting Blocks and the Crouch Start:\n- Starting blocks provide a solid rigid surface to launch into horizontal acceleration.\n- Bunch/Bullet Start: Blocks close together (rear toe aligns with front heel), rapid reaction time.\n- Medium Start: Most widely used; front block two foot-lengths behind starting line, rear knee opposite front foot.\n- Elongated Start: Blocks placed farther apart; favored by taller sprinters with longer limbs.\n\n2. Official Start Commands:\n- "On your marks": Hands placed shoulder-width apart behind the line forming a high arch with fingers; rear knee resting on the track.\n- "Set": Hips smoothly rise above shoulder height, body weight shifts forward over hands, front knee flexed at ~90 degrees, rear knee at ~120 degrees; complete stillness is held.\n- Gun Report (or "Go"): Explosive leg drive off both blocks, arms punching aggressively forward and back.\n\n3. Phases of Sprinting:\n- Drive & Acceleration: Low forward torso lean for the first 20-30m, gradually rising into tall upright sprinting posture.\n- Maximum Velocity: High knee drive, active dorsiflexed foot strike on the balls of the feet, elbows bent at 90 degrees pumping from shoulders.\n- Finish Techniques: Running through the line, forward torso dip (chest lean), or shoulder shrug to break the finish line plane first.',
    didYouKnow: 'In track athletics, the electronic photo-finish camera evaluates the exact moment the athlete’s torso (chest) crosses the line, not the head, hands, or feet!',
    kenyanContext: 'Ferdinand Omanyala set the African 100m record (9.77 seconds) at the Kip Keino Classic in Nairobi, proving Kenya’s rising dominance in short-distance sprinting.',
    order: 15,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u8-l2',
    subStrandId: 'substrand-g6-ca-u8',
    title: 'Relay Baton Exchanges, Middle-Distance Pacing & Track Regulations',
    content: 'Relay teamwork and middle-distance stamina require precise coordination and tactical pacing.\n\n1. Relay Races (4x100m and 4x400m):\n- Baton: A smooth, hollow aluminum or composite tube (28-30 cm in length).\n- 4x100m Non-Visual (Blind) Exchange: The outgoing runner does not look back. When the incoming runner reaches a check-mark on the track, the receiver sprints forward. Inside the 30m takeover zone, on an audible cue ("Hand!" or "Stick!"), the receiver extends their arm back.\n- Exchange Techniques: Downsweep (incoming runner presses baton down into upward-facing open palm) and Upsweep (baton thrust upward into downward V-shaped palm).\n- 4x400m Visual Exchange: Outgoing runner turns head to see and firmly grasp the baton due to heavy physical fatigue and track congestion.\n\n2. Middle-Distance Events (800m and 1,500m):\n- Standing start behind the curved line with command "On your marks" followed immediately by the gun.\n- Aerobic Pacing: Conserving energy, running steady splits, rhythmic breathing (2 strides in, 2 strides out).\n- Tactics: Drafting (sheltering closely behind the leader to avoid wind drag), smooth lane positioning, and timing the finishing "kick" over the last 200m.\n\n3. Track Rules & Ethics:\n- Running out of lane, false starting, passing baton outside the 30m zone, or causing obstruction results in disqualification.',
    didYouKnow: 'David Rudisha ran the 800m world record (1:40.91) at the London 2012 Olympics by leading from start to finish with unmatched aerobic pacing!',
    kenyanContext: 'Kenya is globally celebrated as the capital of middle and long-distance athletics, with champions like Faith Kipyegon, Pamela Jelimo, and David Rudisha winning Olympic and World titles.',
    order: 16,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 51, 52, 53, 54)
const missions = [
  {
    id: 'mission-g6-ca-u7-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 51: Folk Melodies of Eastern Africa – Vocals & Communal Call-and-Response',
    description: 'Explore the vocal storytelling, cantors, choruses, work songs, lullabies, and ululations of Kenya’s vibrant folk traditions.',
    order: 51,
    orderIndex: 51,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-folk-vocalist',
    badge: 'badge-g6-ca-folk-vocalist',
    lessonId: 'lesson-g6-ca-u7-l1',
    questionIds: [
      'q-g6-ca-u7-001', 'q-g6-ca-u7-002', 'q-g6-ca-u7-003', 'q-g6-ca-u7-004',
      'q-g6-ca-u7-005', 'q-g6-ca-u7-006', 'q-g6-ca-u7-007', 'q-g6-ca-u7-008',
      'q-g6-ca-u7-009', 'q-g6-ca-u7-010', 'q-g6-ca-u7-011', 'q-g6-ca-u7-012'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u7-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 52: African Dance Stage – Choreography, Costumes & Intangible Heritage',
    description: 'Choreograph dynamic floor formations, locomotor movements, authentic traditional costumes, body adornments, and dramatic props.',
    order: 52,
    orderIndex: 52,
    xpReward: 130,
    rewardXp: 130,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-choreographer',
    badge: 'badge-g6-ca-choreographer',
    lessonId: 'lesson-g6-ca-u7-l2',
    questionIds: [
      'q-g6-ca-u7-013', 'q-g6-ca-u7-014', 'q-g6-ca-u7-015', 'q-g6-ca-u7-016',
      'q-g6-ca-u7-017', 'q-g6-ca-u7-018', 'q-g6-ca-u7-019', 'q-g6-ca-u7-020',
      'q-g6-ca-u7-021', 'q-g6-ca-u7-022', 'q-g6-ca-u7-023', 'q-g6-ca-u7-024'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u8-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 53: Speed Lightning – Crouch Start, Acceleration & Torso Finish',
    description: 'Master sprint biomechanics from starting blocks, crouch start commands, explosive drive phase, and the photo-finish torso dip.',
    order: 53,
    orderIndex: 53,
    xpReward: 135,
    rewardXp: 135,
    coinReward: 45,
    badgeReward: 'badge-g6-ca-sprint-master',
    badge: 'badge-g6-ca-sprint-master',
    lessonId: 'lesson-g6-ca-u8-l1',
    questionIds: [
      'q-g6-ca-u8-001', 'q-g6-ca-u8-002', 'q-g6-ca-u8-003', 'q-g6-ca-u8-004',
      'q-g6-ca-u8-005', 'q-g6-ca-u8-006', 'q-g6-ca-u8-007', 'q-g6-ca-u8-008',
      'q-g6-ca-u8-009', 'q-g6-ca-u8-010', 'q-g6-ca-u8-011', 'q-g6-ca-u8-012'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u8-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 54: Relay Baton Velocity & Middle-Distance Tactical Pacing',
    description: 'Execute high-speed blind relay baton exchanges and apply tactical middle-distance pacing, drafting, and finishing kicks.',
    order: 54,
    orderIndex: 54,
    xpReward: 135,
    rewardXp: 135,
    coinReward: 45,
    badgeReward: 'badge-g6-ca-athletics-tactician',
    badge: 'badge-g6-ca-athletics-tactician',
    lessonId: 'lesson-g6-ca-u8-l2',
    questionIds: [
      'q-g6-ca-u8-013', 'q-g6-ca-u8-014', 'q-g6-ca-u8-015', 'q-g6-ca-u8-016',
      'q-g6-ca-u8-017', 'q-g6-ca-u8-018', 'q-g6-ca-u8-019', 'q-g6-ca-u8-020',
      'q-g6-ca-u8-021', 'q-g6-ca-u8-022', 'q-g6-ca-u8-023', 'q-g6-ca-u8-024'
    ],
    learningAreaId: 'la-creative-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 7: Folk Songs, Dance Choreography & Traditional Costumes (q-g6-ca-u7-001 to 024) ---
  {
    id: 'q-g6-ca-u7-001',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'What musical structure is most commonly featured in Kenyan traditional folk songs, where a soloist sings a phrase and the choir responds?',
    options: [
      'Call-and-response pattern',
      'Strict solo recitative without choir',
      'Electronic autotune modulation',
      'Unaccompanied canon without response'
    ],
    correctAnswer: 'Call-and-response pattern',
    explanation: 'Call-and-response is the foundational structural feature of African folk songs, where the soloist (cantor) leads with melodic improvisation and the chorus responds with a harmonious refrain.',
    socraticHint: 'Think about how a lead singer prompts the rest of the singing group to answer back.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-002',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Which role does a soloist (cantor) perform during a traditional African folk song performance?',
    options: [
      'Leading the melody, cueing tempo shifts, and improvising verses',
      'Standing quietly at the back without singing',
      'Conducting using a modern western silver baton only',
      'Tuning electronic amplifiers behind the stage'
    ],
    correctAnswer: 'Leading the melody, cueing tempo shifts, and improvising verses',
    explanation: 'The soloist guides the choir, sets the key and tempo, improvises narrative verses, and signals transitional cues for rhythmic changes or choreography.',
    socraticHint: 'What leadership responsibilities does the lead singer hold during an oral song presentation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-003',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Which high-pitched, vibrating vocal ornament is customarily produced by women in Kenyan folk music to express joy, victory, and celebration?',
    options: [
      'Ululation (vigelegele)',
      'Whistling with metal whistles',
      'Heavy baritone throat singing',
      'Silent humming'
    ],
    correctAnswer: 'Ululation (vigelegele)',
    explanation: 'Ululation (known as vigelegele in Kiswahili) is a high-pitched, oscillating trill made with the tongue and uvula, celebrating triumphs, weddings, births, and festive occasions.',
    socraticHint: 'What rapid, cheerful trilling sound do women make during celebrations across East Africa?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-004',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Why were work folk songs sung during traditional agricultural tasks such as threshing sorghum or digging farmland?',
    options: [
      'To synchronize physical labor rhythms, maintain stamina, and relieve fatigue',
      'To put workers to sleep in the fields',
      'To scare away domestic farm livestock',
      'To prevent farm workers from speaking to each other'
    ],
    correctAnswer: 'To synchronize physical labor rhythms, maintain stamina, and relieve fatigue',
    explanation: 'Work songs provide a steady communal tempo that synchronizes physical movements (hoeing, pounding, harvesting), reducing monotony and boosting collective endurance.',
    socraticHint: 'How does a steady rhythmic beat help people doing heavy repetitive physical labor together?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-005',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'What type of traditional folk song is specifically composed and gently sung to soothe an infant to sleep?',
    options: [
      'Lullaby',
      'Dirge (funeral lament)',
      'War anthem',
      'Circumcision triumph chant'
    ],
    correctAnswer: 'Lullaby',
    explanation: 'A lullaby is a gentle, soothing, melodious song sung to calm, pacify, and lull babies and toddlers to sleep.',
    socraticHint: 'Which quiet and comforting song does a mother sing to her sleepy baby?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-006',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'What is a dirge in African folk musical traditions?',
    options: [
      'A solemn, mournful song performed during funeral and memorial ceremonies',
      'A festive dance song for weddings',
      'A cheerful children singing game',
      'A quick marching tune for athletes'
    ],
    correctAnswer: 'A solemn, mournful song performed during funeral and memorial ceremonies',
    explanation: 'A dirge is a mournful, solemn song or lament performed during bereavement to honor the departed and express grief and spiritual solace.',
    socraticHint: 'Consider the specific song performed during times of grief and honoring those who have passed away.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-007',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Why do East African folk songs feature lyrics directly adapted to tonal language speech contours?',
    options: [
      'Because changing vocal pitch in tonal languages alters the literal meaning of words',
      'Because traditional singers were not allowed to use vowel sounds',
      'Because all folk songs must imitate bird chirping sounds exactly',
      'Because folk songs cannot have any melody at all'
    ],
    correctAnswer: 'Because changing vocal pitch in tonal languages alters the literal meaning of words',
    explanation: 'In tonal languages, pitch inflection distinguishes vocabulary meanings; therefore, indigenous folk melodies naturally mirror the spoken tonal contour.',
    socraticHint: 'What happens to the meaning of a word in a tonal language if you sing it with the wrong pitch contour?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-008',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'What is syncopation, frequently heard in the percussive rhythms of Kenyan folk songs?',
    options: [
      'Accenting unexpected, normally unaccented off-beats',
      'Singing completely without taking any breath',
      'Playing a single note continuously without rhythm',
      'Stopping all instruments at the same time'
    ],
    correctAnswer: 'Accenting unexpected, normally unaccented off-beats',
    explanation: 'Syncopation involves placing rhythmic stress or accents on the normally weak off-beats, creating exciting, danceable African rhythmic drive.',
    socraticHint: 'What musical term describes placing accents on the off-beat instead of the strong beat?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-009',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Which cultural community in Kenya performs the historical Ramogi dance and Nyatiti-accompanied praise songs?',
    options: [
      'Luo community',
      'Maasai community',
      'Mijikenda community',
      'Meru community'
    ],
    correctAnswer: 'Luo community',
    explanation: 'The Ramogi dance and Nyatiti harp songs are celebrated cultural expressions of the Luo people living around the Lake Victoria basin.',
    socraticHint: 'Which community is historically associated with the Nyatiti eight-stringed lyre and Ramogi dance?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-010',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'What vocal quality should a choir aim for when singing a celebratory Kenyan folk song?',
    options: [
      'Resonant, energetic projection with clear diction and harmonious blending',
      'Whispering softly so that no words can be heard',
      'Monotone flat delivery with zero emotional expression',
      'Shouting hoarsely without pitch control'
    ],
    correctAnswer: 'Resonant, energetic projection with clear diction and harmonious blending',
    explanation: 'Choral excellence requires open resonant projection, clear enunciation of lyrics, and harmonious dynamic blending among vocal parts.',
    socraticHint: 'How should singers project their voices to convey vibrant festive celebration?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-011',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'Which category of traditional songs is sung during wedding celebrations to congratulate the newlyweds and offer marital blessings?',
    options: [
      'Epithalamium (nuptial/wedding songs)',
      'Lullabies for newborn infants',
      'Dirges for deceased elders',
      'Hunting songs for tracking predators'
    ],
    correctAnswer: 'Epithalamium (nuptial/wedding songs)',
    explanation: 'Wedding songs (nuptial songs) celebrate matrimony, offering moral counsel, blessings for prosperity, and joy for both families.',
    socraticHint: 'Which songs celebrate the union of bride and groom in traditional ceremonies?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-012',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l1',
    text: 'How were historical events and genealogical lineages traditionally recorded in African societies without written scripts?',
    options: [
      'Through epic narrative folk songs, praise poetry, and oral storytelling',
      'By engraving binary code on plastic discs',
      'By printing daily newspapers on mechanical presses',
      'Historical events were never remembered or preserved'
    ],
    correctAnswer: 'Through epic narrative folk songs, praise poetry, and oral storytelling',
    explanation: 'Oral literature and narrative folk songs served as living communal archives, transmitting history, hero genealogies, and cultural values across generations.',
    socraticHint: 'How did elders pass down the names and heroic deeds of ancestors through music and speech?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-013',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which category of dance movement involves traveling across the stage space, such as leaping, gliding, or stepping forward?',
    options: [
      'Locomotor movements',
      'Non-locomotor movements',
      'Static stretching movements',
      'Passive meditation poses'
    ],
    correctAnswer: 'Locomotor movements',
    explanation: 'Locomotor movements are actions where the dancer travels through space from one location to another (e.g., walking, leaping, hopping, skipping, galloping).',
    socraticHint: 'Which term refers to physical body actions that transport you from one spot to another?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-014',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which of the following is an example of a non-locomotor movement in traditional dance?',
    options: [
      'Shoulder shrugging and torso swaying while standing in one spot',
      'Running across the field from corner to corner',
      'Galloping in a large circular ring',
      'Leaping high across the stage floor'
    ],
    correctAnswer: 'Shoulder shrugging and torso swaying while standing in one spot',
    explanation: 'Non-locomotor movements are bodily actions performed on a stationary base without traveling across space (twisting, bending, swaying, shaking shoulders).',
    socraticHint: 'Look for an action where the dancer’s feet remain anchored in the same physical spot.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-015',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'In traditional African dance choreography, what does a circular floor formation typically symbolize?',
    options: [
      'Community unity, equality, and unbroken communal life',
      'Hierarchical division where only one person is valued',
      'A race track for sprint athletics',
      'An arrow pointing toward an exit door'
    ],
    correctAnswer: 'Community unity, equality, and unbroken communal life',
    explanation: 'Circular formations in African performance symbolize wholeness, shared equality, unbroken continuity of life, and communal solidarity.',
    socraticHint: 'What does an unbroken round circle represent when an entire community stands together facing inward?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-016',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which cultural community in Kenya is widely renowned for the iconic Isukuti dance featuring vigorous shoulder-shivering and energetic drum rhythms?',
    options: [
      'Luhya (Isukha and Idakho sub-communities)',
      'Turkana pastoralists of Lake Turkana',
      'Swahili coastal sailors',
      'Somali pastoralists of Garissa'
    ],
    correctAnswer: 'Luhya (Isukha and Idakho sub-communities)',
    explanation: 'The Isukuti dance and drum tradition originated among the Isukha and Idakho sub-communities of the Luhya people of Kakamega County in Western Kenya.',
    socraticHint: 'Which Western Kenya community plays the famous Isukuti drums during cultural festivals?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-017',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'The energetic high vertical jumping dance (Adumu) accompanied by rhythmic throat singing is a world-famous cultural expression of which community?',
    options: [
      'Maasai community',
      'Mijikenda community',
      'Meru community',
      'Taita community'
    ],
    correctAnswer: 'Maasai community',
    explanation: 'The Adumu (jumping dance) is a celebrated cultural dance of the Maasai warriors (morans), showcasing strength, stamina, and agility in a circle formation.',
    socraticHint: 'Which pastoral community in Kenya and Tanzania is famous for high vertical leaping by morans?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-018',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which traditional coastal dance of the Mijikenda people is performed with joyful hip isolations, palm-raffia skirts, and vibrant drumming?',
    options: [
      'Sengenya dance',
      'Kilumi dance',
      'Gonda dance',
      'Adumu dance'
    ],
    correctAnswer: 'Sengenya dance',
    explanation: 'Sengenya is a premier traditional dance of the Mijikenda (specifically the Digo and Giriama communities), noted for swift hip movements and intricate percussive polyrhythms.',
    socraticHint: 'Which coastal dance tradition of the Digo and Giriama is famous for its intricate drumming and raffia skirts?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-019',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'What role do ankle rattles (chivoti/gara/jingles) fulfill when worn by traditional dancers?',
    options: [
      'They generate percussive accents that accentuate every footstep and rhythm',
      'They keep the dancer’s feet cool during hot weather',
      'They prevent the dancer from slipping on mud',
      'They are purely decorative and make zero sound'
    ],
    correctAnswer: 'They generate percussive accents that accentuate every footstep and rhythm',
    explanation: 'Ankle rattles (gara or pellet bells) sound with each foot stamp, audibly accentuating the dancer’s footwork and reinforcing the underlying percussive pulse.',
    socraticHint: 'What acoustic effect do metal or seed rattles create when a dancer stamps on the ground?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-020',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Why is it important to respect cultural integrity and avoid trivializing indigenous body adornments during school dance performances?',
    options: [
      'To honor the sacred heritage, authentic values, and dignity of the originating communities',
      'Because modern rules forbid wearing any traditional clothes',
      'To ensure every student wears only western synthetic tracksuits',
      'Because traditional songs have no historical meaning'
    ],
    correctAnswer: 'To honor the sacred heritage, authentic values, and dignity of the originating communities',
    explanation: 'Traditional dances carry profound spiritual and social meanings; treating cultural attire and rituals with dignity preserves intangible cultural heritage respectfully.',
    socraticHint: 'Why must we treat sacred cultural symbols and attire of diverse communities with genuine respect?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-021',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which natural pigment was traditionally blended with fat and applied to hair and skin in ceremonies across East Africa?',
    options: [
      'Red ochre',
      'Chemical synthetic acrylic paint',
      'Liquid shoe polish',
      'Coal tar asphalt'
    ],
    correctAnswer: 'Red ochre',
    explanation: 'Red ochre (a natural iron oxide earth pigment) was mixed with animal fat or butter and applied as ceremonial body adornment signifying vitality, beauty, and protection.',
    socraticHint: 'Which reddish earthen mineral clay is famously used by traditional pastoralists for body art?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-022',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'What is a choreographic "climax" in a staged cultural dance performance?',
    options: [
      'The highest point of dramatic intensity, energy, and musical excitement',
      'The moment when the stage curtains close and lights go dark',
      'The preliminary warm-up stretching session before dancers enter',
      'The period when the soloist forgets the song lyrics'
    ],
    correctAnswer: 'The highest point of dramatic intensity, energy, and musical excitement',
    explanation: 'The climax represents the pinnacle of artistic expression, dynamic speed, vocal intensity, and dramatic resolution in a choreographed presentation.',
    socraticHint: 'What do we call the peak moment of excitement and energy in a story or stage performance?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-023',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Which traditional Kamba dance is celebrated for its breathtaking acrobatics, backflips, and rapid drum rhythms played on the Muthingu drum?',
    options: [
      'Mukanda and Kilumi dances',
      'Isukuti and Sengenya dances',
      'Mwomboko and Mugithi dances',
      'Chivoti and Tung dances'
    ],
    correctAnswer: 'Mukanda and Kilumi dances',
    explanation: 'The Kamba community performs dances such as Kilumi (healing and thanksgiving) and Mukanda (energetic acrobatics, high leaps, and drumming virtuosity).',
    socraticHint: 'Which community from Eastern Kenya is famous for acrobatic leaps and the Mukanda dance?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u7-024',
    subStrandId: 'substrand-g6-ca-u7',
    lessonId: 'lesson-g6-ca-u7-l2',
    text: 'Why are traditional folk songs and dances classified as Intangible Cultural Heritage by UNESCO?',
    options: [
      'Because they are living cultural traditions, practices, and expressions transmitted across generations',
      'Because they can be sold on foreign stock markets',
      'Because they are made of solid concrete monuments that never decay',
      'Because they were only invented in the 21st century'
    ],
    correctAnswer: 'Because they are living cultural traditions, practices, and expressions transmitted across generations',
    explanation: 'Intangible cultural heritage comprises traditions, oral folklore, performing arts, and social practices that embody living cultural identity and memory.',
    socraticHint: 'Why is living communal culture, passed down through singing and dancing, protected as cultural heritage?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // --- Unit 8: Track Athletics: Sprints, Relays & Middle Distance (q-g6-ca-u8-001 to 024) ---
  {
    id: 'q-g6-ca-u8-001',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'Which starting position is officially required for all sprint events up to 400 meters in track athletics?',
    options: [
      'Crouch start using starting blocks',
      'Standing start with hands in pockets',
      'Sitting start with legs crossed',
      'Prone start lying flat on the stomach'
    ],
    correctAnswer: 'Crouch start using starting blocks',
    explanation: 'World Athletics rules mandate a crouch start using starting blocks for all sprint events (100m, 200m, 400m) to generate explosive forward drive.',
    socraticHint: 'Which starting technique uses blocks to launch runners forward like a coiled spring?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-002',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'What are the correct three commands given by the starter before a sprint race begins?',
    options: [
      '"On your marks", "Set", followed by the starter gun (or "Go")',
      '"Get ready", "Run fast", "Stop"',
      '"Ready", "Steady", "Jump"',
      '"Attention", "March", "Freeze"'
    ],
    correctAnswer: '"On your marks", "Set", followed by the starter gun (or "Go")',
    explanation: 'The official sequence for sprint events is "On your marks" (athletes assume position behind line), "Set" (hips rise and hold steady), followed by the firing of the starter gun.',
    socraticHint: 'Recall the exact words called out by the race starter at the track starting line.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-003',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'When the starter calls "Set" in a crouch start, how should the sprinter position their hips and body weight?',
    options: [
      'Hips rise smoothly above shoulder level with body weight shifting forward over the hands',
      'Hips drop down to touch the ground while relaxing backwards',
      'The athlete stands completely upright and looks around',
      'The sprinter leaps into the air before the gun sounds'
    ],
    correctAnswer: 'Hips rise smoothly above shoulder level with body weight shifting forward over the hands',
    explanation: 'On the command "Set", the hips rise above the shoulders, the front knee flexes to approximately 90 degrees, the rear knee to 120 degrees, and weight is balanced forward over arched fingertips.',
    socraticHint: 'How does raising the hips create the forward tension needed for an explosive forward push?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-004',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'Which crouch start variation features starting blocks placed closest together and is favored by sprinters with quick leg reaction times?',
    options: [
      'Bunched (bullet) start',
      'Medium start',
      'Elongated start',
      'Standing crouch start'
    ],
    correctAnswer: 'Bunched (bullet) start',
    explanation: 'The bunched (bullet) start places the blocks closely together (rear block close to the front block), allowing rapid initial clearance of the blocks.',
    socraticHint: 'Which start style has blocks bunched very close together for quick foot movement?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-005',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'During the acceleration (drive) phase of a sprint (the first 20 to 30 meters), what should the athlete’s body angle be?',
    options: [
      'A low forward torso lean gradually rising to an upright sprinting posture',
      'Completely vertical right from the very first stride',
      'Bent backwards leaning toward the track behind them',
      'Tilted sideways with one hand touching the grass'
    ],
    correctAnswer: 'A low forward torso lean gradually rising to an upright sprinting posture',
    explanation: 'Sprinters maintain a low forward body angle during the drive phase (low center of mass) to maximize horizontal propulsion before transitioning smoothly to upright running.',
    socraticHint: 'Should a sprinter stand straight up immediately upon leaving the blocks, or stay low to push forward?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-006',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'What is the optimal arm movement mechanics during top-speed sprinting?',
    options: [
      'Arms swinging powerfully from the shoulders with elbows bent at approximately 90 degrees',
      'Arms held straight down by the sides without moving',
      'Flapping hands loosely like bird wings above the head',
      'Crossing both arms tightly across the chest'
    ],
    correctAnswer: 'Arms swinging powerfully from the shoulders with elbows bent at approximately 90 degrees',
    explanation: 'Arms must drive vigorously backward and forward from the shoulder joints with elbows held flexed at roughly 90 degrees, counterbalancing explosive leg drive.',
    socraticHint: 'Think of how sprinters pump their arms from their shoulders in coordination with their legs.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-007',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'Which finish technique involves thrusting the chest forward across the finish line plane to beat close competitors?',
    options: [
      'Torso lean (dip finish)',
      'Sliding stop on knees',
      'Jumping backward over the line',
      'Stopping dead on the line to celebrate'
    ],
    correctAnswer: 'Torso lean (dip finish)',
    explanation: 'The dip finish involves leaning the chest (torso) sharply forward across the finish line plane on the final stride, since official timing clocks the torso.',
    socraticHint: 'What do sprinters do with their chests on the very last stride of a close 100m race?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-008',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'According to official athletics timing rules, which part of the athlete’s body must cross the vertical plane of the finish line for the race time to be recorded?',
    options: [
      'The torso (chest/trunk)',
      'The outstretched hand and fingers',
      'The cap or hair ribbon',
      'The leading foot’s shoe lace'
    ],
    correctAnswer: 'The torso (chest/trunk)',
    explanation: 'World Athletics Technical Rule 164 states that runners are ranked in the order that their torso (excluding head, neck, arms, and legs) crosses the finish line.',
    socraticHint: 'Does official photo finish look at the runner’s hand, foot, or torso?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-009',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'What foot contact mechanics should a sprinter utilize during the maximum velocity phase?',
    options: [
      'Striking actively on the ball of the foot with a dorsiflexed ankle',
      'Landing heavily on the rear heel with a flat foot',
      'Landing on the tiptoes with curled toes',
      'Landing sideways on the outer edge of the shoe'
    ],
    correctAnswer: 'Striking actively on the ball of the foot with a dorsiflexed ankle',
    explanation: 'Sprinters land powerfully on the balls of the feet with dorsiflexed ankles, utilizing elastic stretch reflex and minimizing ground contact time.',
    socraticHint: 'Which part of the foot strikes the track in elite sprinting to maximize rebound speed?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-010',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'What happens if a sprinter commits a false start by moving out of their blocks before the gun sounds?',
    options: [
      'The athlete is disqualified immediately from the race',
      'The athlete is awarded a 10-meter head start',
      'The race continues without any penalty',
      'The race distance is extended by 50 meters'
    ],
    correctAnswer: 'The athlete is disqualified immediately from the race',
    explanation: 'Under World Athletics rules, any athlete responsible for a false start is disqualified immediately from the event.',
    socraticHint: 'What strict penalty is applied if an athlete leaves the starting blocks before the gun?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-011',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'Why are starting blocks staggered on the curves in a 200m sprint race?',
    options: [
      'To ensure all athletes run the exact same total distance of 200 meters',
      'To give athletes in outer lanes an unfair speed advantage',
      'To help spectators see all runners at once',
      'Because tracks are built with uneven dirt mounds'
    ],
    correctAnswer: 'To ensure all athletes run the exact same total distance of 200 meters',
    explanation: 'Because outer lanes have larger perimeters around curves, starting blocks are staggered forward to equalize the race distance to exactly 200 meters for each lane.',
    socraticHint: 'Why must runners in outside curved lanes start ahead of runners in inside lanes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-012',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l1',
    text: 'Why is it critical for sprinters not to look sideways at competitors during a 100m sprint?',
    options: [
      'Looking sideways disrupts posture, neck alignment, and deceleration momentum',
      'Looking sideways is against the law in Kenya',
      'Looking sideways immediately turns off the timing gates',
      'Because sprinters must run with their eyes shut'
    ],
    correctAnswer: 'Looking sideways disrupts posture, neck alignment, and deceleration momentum',
    explanation: 'Turning the head disrupts biomechanical balance, twists torso alignment, increases aerodynamic drag, and causes costly loss of forward velocity.',
    socraticHint: 'How does turning your head to check other runners interfere with your forward sprinting form?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-013',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'In the 4x100m relay race, what is the length of the official baton exchange zone within which the baton must be handed over?',
    options: [
      '30 meters',
      '10 meters',
      '50 meters',
      '100 meters'
    ],
    correctAnswer: '30 meters',
    explanation: 'Under current World Athletics rules, the takeover zone for the 4x100m relay is 30 meters long (which unified the former 20m exchange zone and 10m acceleration zone).',
    socraticHint: 'How long is the complete official zone in which the outgoing runner accelerates and takes the baton?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-014',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'What type of baton exchange is utilized in the 4x100m relay to maintain maximum sprint velocity without the outgoing runner looking back?',
    options: [
      'Non-visual (blind) exchange',
      'Visual exchange',
      'Static seated exchange',
      'Two-handed gentle drop'
    ],
    correctAnswer: 'Non-visual (blind) exchange',
    explanation: 'In 4x100m sprints, outgoing runners use a non-visual (blind) exchange, trusting visual check-marks on the track and receiving the baton into an outstretched rear hand without turning their head.',
    socraticHint: 'Which pass allows the receiving sprinter to sprint forward at top speed without looking backwards?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-015',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'What happens if a relay team passes the baton outside the boundary lines of the 30-meter exchange zone?',
    options: [
      'The relay team is disqualified from the race',
      'The team receives a 5-second bonus',
      'The team is given a second baton to start over',
      'The team wins the gold medal automatically'
    ],
    correctAnswer: 'The relay team is disqualified from the race',
    explanation: 'Passing the baton outside the exchange zone is an infraction of track rules resulting in immediate disqualification of the relay team.',
    socraticHint: 'What penalty is given for violating the strict exchange zone rules in athletics?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-016',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'In a downsweep baton passing technique, how does the incoming runner deliver the baton into the receiver’s hand?',
    options: [
      'The baton is pushed downward into the receiver’s open upward-facing palm',
      'The baton is tossed upward through the air into a basket',
      'The baton is rolled along the rubber track surface',
      'The receiver grabs the incoming runner’s wrist with both hands'
    ],
    correctAnswer: 'The baton is pushed downward into the receiver’s open upward-facing palm',
    explanation: 'In the downsweep pass, the receiver extends their arm back with the palm facing upward, and the incoming runner places the baton downward between the receiver’s thumb and fingers.',
    socraticHint: 'Think of the incoming runner sweeping the baton downwards into an open palm.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-017',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'Why is the visual baton exchange technique preferred in the 4x400m relay rather than a blind exchange?',
    options: [
      'Fatigue and congestion require the outgoing runner to look back and ensure a safe, secure handoff',
      'Because looking back makes runners sprint twice as fast',
      'Because 400m runners are not allowed to run in lanes',
      'Because the baton in 4x400m is too small to feel by touch'
    ],
    correctAnswer: 'Fatigue and congestion require the outgoing runner to look back and ensure a safe, secure handoff',
    explanation: 'At the end of a grueling 400m sprint, runners suffer severe fatigue and track congestion occurs at the handoff line; looking back guarantees a secure grasp without dropping.',
    socraticHint: 'Why do exhausted runners finishing a 400m lap need to visually watch the baton into their hand?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-018',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'If a runner accidentally drops the baton during an exchange, what rule must be observed to avoid disqualification?',
    options: [
      'The athlete who dropped the baton must pick it up without interfering with other runners',
      'The coach must run onto the track with a spare baton',
      'Any spectator may pick it up and throw it to the runner',
      'The race is restarted from the beginning'
    ],
    correctAnswer: 'The athlete who dropped the baton must pick it up without interfering with other runners',
    explanation: 'If dropped, the baton must be recovered by the athlete who dropped it. They may leave their lane to retrieve it provided they do not lessen distance or obstruct other competitors.',
    socraticHint: 'Who is legally responsible for retrieving a dropped baton on the track?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-019',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'Which two standard distances are classified as middle-distance track events in schools and international athletics?',
    options: [
      '800 meters and 1,500 meters',
      '100 meters and 200 meters',
      '10,000 meters and marathon',
      '50 meters and 60 meters hurdles'
    ],
    correctAnswer: '800 meters and 1,500 meters',
    explanation: 'Middle-distance races in track athletics comprise the 800m and 1,500m events (as opposed to sprints under 400m and long-distance events of 3,000m and above).',
    socraticHint: 'Which two events are two laps (800m) and roughly three-and-three-quarter laps (1500m) of a 400m track?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-020',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'Which starting technique is used in middle-distance events (800m and 1500m)?',
    options: [
      'Standing start behind the curved start line',
      'Crouch start using metal starting blocks',
      'Prone start lying down on track lane 1',
      'Three-point football stance'
    ],
    correctAnswer: 'Standing start behind the curved start line',
    explanation: 'Middle-distance races utilize a standing start behind a curved start line, with the command "On your marks" followed directly by the firing of the starter gun.',
    socraticHint: 'Do middle-distance runners use starting blocks or do they start on their feet?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-021',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'What does "pacing" mean in middle-distance running, and why is it vital for success?',
    options: [
      'Distributing physical energy evenly throughout the race to avoid premature exhaustion',
      'Running as fast as possible in the first 100 meters and walking the rest',
      'Stopping every 200 meters to drink soda',
      'Chasing other runners off the track'
    ],
    correctAnswer: 'Distributing physical energy evenly throughout the race to avoid premature exhaustion',
    explanation: 'Pacing is the tactical distribution of aerobic and anaerobic effort across the full race distance to prevent early lactic acid accumulation and ensure a strong finish.',
    socraticHint: 'Why must a runner manage their speed sensibly rather than sprinting flat out on lap one?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-022',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'In middle-distance racing tactics, what is "drafting" (tucking in behind the leader)?',
    options: [
      'Running closely behind a leading runner to reduce wind resistance and save muscular energy',
      'Drawing pictures on a clipboard while running',
      'Pushing the leading runner off the track from behind',
      'Running backwards to observe the runners behind you'
    ],
    correctAnswer: 'Running closely behind a leading runner to reduce wind resistance and save muscular energy',
    explanation: 'Drafting involves positioning oneself directly behind a pacesetter to minimize aerodynamic drag, shelter from headwind, and mentally relax before launching a sprint kick.',
    socraticHint: 'How does running right behind the frontrunner protect an athlete from headwind?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-023',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'What is the "kick" in a middle-distance race strategy?',
    options: [
      'A sudden burst of maximum acceleration unleashed over the final stretch toward the finish line',
      'Kicking another runner’s ankles to make them trip',
      'Kicking the baton across the field',
      'Leaping over the track hurdles during a flat race'
    ],
    correctAnswer: 'A sudden burst of maximum acceleration unleashed over the final stretch toward the finish line',
    explanation: 'The "kick" refers to a runner’s final sprint acceleration over the last 150 to 300 meters, drawing on remaining anaerobic reserves to outpace competitors.',
    socraticHint: 'What do Kenyan middle-distance champions unleash in the final 200m home straight?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u8-024',
    subStrandId: 'substrand-g6-ca-u8',
    lessonId: 'lesson-g6-ca-u8-l2',
    text: 'In the 800m track event, runners start in their assigned lanes. At what designated point on the track are they permitted to break and merge into lane 1?',
    options: [
      'After crossing the breakline at the end of the first bend (after approximately 100 meters)',
      'Immediately upon leaving the starting line on stride one',
      'Only after finishing the entire first 400m lap',
      'Athletes in the 800m must never leave their own lane'
    ],
    correctAnswer: 'After crossing the breakline at the end of the first bend (after approximately 100 meters)',
    explanation: 'Under World Athletics rules, 800m runners run in lanes until the breakline marked at the end of the first bend, where they may transition smoothly into the inside lane (lane 1).',
    socraticHint: 'At what mark after the first curve do 800m runners merge into the inside lane?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
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

// Update gameWorld totalMissions if needed
const world = db.gameWorlds.find(w => w.id === 'world-creative-studio');
if (world) {
  if (world.totalMissions < 58) {
    world.totalMissions = 58;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 4 to cbe_database.json!');
