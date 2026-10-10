/**
 * Grade 6 Creative Arts & Sports - Batch 3 Generator
 * Content: Units 5 & 6 (Music and Performing Arts)
 * - Unit 5: Elements of Music, Staff Notation, Sol-fa Pitch & Patriotic Songs
 * - Unit 6: Traditional Musical Instruments of Eastern Africa
 * Missions: Orders 47, 48, 49, 50 (world-creative-studio)
 * Questions: 48 (24 per unit: q-g6-ca-u5-001 to q-g6-ca-u6-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Creative Arts & Sports Batch 3 (Units 5 & 6) ---');

// 1. Units 5 & 6 (subStrands)
const units = [
  {
    id: 'substrand-g6-ca-u5',
    strandId: 'strand-g6-ca-music',
    learningAreaId: 'la-creative-g6',
    title: 'Elements of Music, Staff Notation, Sol-fa Pitch & Patriotic Songs',
    name: 'Elements of Music, Staff Notation, Sol-fa Pitch & Patriotic Songs',
    description: 'Exploring pitch and the treble (G) clef staff; note values (semibreve, minim, crotchet, quaver, semiquaver) and corresponding rests; simple time signatures (2/4, 3/4, 4/4); tonic sol-fa sight singing and hand signs; singing Kenyan patriotic songs and the National Anthem in three-part harmony with expressive dynamics and diction.',
    cbeCompetency: 'Musical literacy, sight-singing proficiency, rhythmic precision, and patriotic vocal performance',
    estimatedMinutes: 30,
    order: 5,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ca-u6',
    strandId: 'strand-g6-ca-music',
    learningAreaId: 'la-creative-g6',
    title: 'Traditional Musical Instruments of Eastern Africa: Classification & Performance',
    name: 'Traditional Musical Instruments of Eastern Africa: Classification & Performance',
    description: 'Classifying traditional African instruments into the 4 Hornbostel-Sachs families: Chordophones (stringed: Nyatiti, Orutu, Wandindi, Obokano, Ennanga), Aerophones (wind: Abu, Chivoti, Coro, Tung’), Membranophones (drums: Isukuti, Sukuti, Mabumbumbu, Eng’oma), and Idiophones (self-sounding: Kayamba, Marimba, Adeudeu, ankle rattles, metal chimes); tuning, maintenance, and playing in polyrhythmic indigenous ensembles.',
    cbeCompetency: 'Organological classification, cultural musicology, polyrhythmic ensemble performance, and instrument preservation',
    estimatedMinutes: 30,
    order: 6,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 5 & 6
const lessons = [
  // Unit 5
  {
    id: 'lesson-g6-ca-u5-l1',
    subStrandId: 'substrand-g6-ca-u5',
    title: 'Staff Notation: Pitch, Treble Clef, Note Values & Time Signatures',
    content: 'Music is written on a staff (stave) of five horizontal lines and four spaces, read from bottom to top.\n\n1. The Treble Clef (G Clef):\n- Circles around the second line of the staff, designating it as the note G.\n- Pitch names of the 5 lines: Every Good Boy Does Fine (E - G - B - D - F).\n- Pitch names of the 4 spaces: F - A - C - E (spelling FACE).\n\n2. Note Values and Rests:\n- Semibreve (Whole note): An open oval head without a stem; lasts for 4 beats. (Rest: hangs below 4th line).\n- Minim (Half note): An open oval head with a stem; lasts for 2 beats. (Rest: sits on top of 3rd line).\n- Crotchet (Quarter note): A solid black oval head with a stem; lasts for 1 beat.\n- Quaver (Eighth note): A solid black head with a stem and 1 flag; lasts for 1/2 beat. Two quavers can be beamed together (equals 1 beat).\n- Semiquaver (Sixteenth note): A solid black head with 2 flags; lasts for 1/4 beat.\n\n3. Time Signatures in Simple Time:\n- Time signature appears after the clef; the top number indicates beats per measure, and the bottom number indicates the note value that receives one beat (4 = quarter note / crotchet).\n- 2/4 Time (Duple): 2 crotchet beats per bar (ONE-two, ONE-two) - common for marches.\n- 3/4 Time (Triple): 3 crotchet beats per bar (ONE-two-three, ONE-two-three) - waltz rhythm.\n- 4/4 Time (Common Time, C): 4 crotchet beats per bar (ONE-two-Three-four).\n\n4. Tonic Sol-Fa Scale and Curwen Hand Signs:\n- The major diatonic scale: d (doh), r (ray), m (me), f (fah), s (soh), l (lah), t (te), d’ (doh octave).\n- Singing with Curwen/Kodály hand signs develops inner ear pitch accuracy and sight-singing.',
    didYouKnow: 'The Treble Clef is actually an elaborate stylized cursive letter "G" that loops around the second line to show singers where the note G4 is pitched!',
    kenyanContext: 'At the Kenya National Music Festivals, primary school choirs are evaluated on sight-reading staff notation test pieces and performing choral folksongs with precise pitch and time signature adherence.',
    order: 9,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u5-l2',
    subStrandId: 'substrand-g6-ca-u5',
    title: 'Kenyan Patriotic Songs, Anthems & Expressive Choral Singing',
    content: 'Music unites nations, instills patriotism, and conveys collective aspirations and moral resolve.\n\n1. The Kenya National Anthem:\n- History: Composed in 1963 by an Anthem Commission of Kenyan musicians led by Graham Hyslop, Thomas Kalume, Senoga Zake, Peter Kibukosya, and Washington Omondi.\n- Melody: Derived from a traditional lullaby of the Pokomo community along the Tana River ("Bee ndoza mwana wangu").\n- Structure: 3 stanzas sung in English or Kiswahili; serves as a national prayer for unity, liberty, peace, hard work, and justice.\n- Protocol: Citizens must stand at attention facing the flag with hands relaxed at sides when the anthem is played.\n\n2. The East African Community (EAC) Anthem:\n- Titled "Wimbo wa Jumuiya ya Afrika Mashariki" ("Jumuiya Yetu").\n- Sung in Kiswahili across all 8 member states to celebrate regional brotherhood, economic prosperity, and peaceful integration.\n\n3. Expressive Choral Performance Elements:\n- Diction (Articulation): Clear, crisp pronunciation of lyrics and vowels so the audience understands every word.\n- Dynamics: Degrees of loudness and softness (piano = soft, forte = loud, crescendo = gradually getting louder, decrescendo = gradually softer).\n- Tempo: Speed of the music (Andante = walking pace, Allegro = lively and fast).\n- Posture and Breath Control: Standing tall with relaxed shoulders and using diaphragmatic breathing to support long sustained phrases.',
    didYouKnow: 'The Kenya National Anthem was one of the first national anthems in all of Africa to be composed from an authentic traditional indigenous folk melody rather than copying a European colonial hymn tune!',
    kenyanContext: 'Popular Kenyan patriotic anthems like "Kenya, Kenya Taifa Letu", "Harambee Harambee Tuimbe Pamoja", and "Tushangilie Kenya" celebrate national heritage and inspire citizens during national holidays.',
    order: 10,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },

  // Unit 6
  {
    id: 'lesson-g6-ca-u6-l1',
    subStrandId: 'substrand-g6-ca-u6',
    title: 'Classification of Traditional Instruments of Eastern Africa',
    content: 'African traditional musical instruments are classified by how they produce sound into four primary organological categories.\n\n1. Chordophones (Stringed Instruments):\n- Sound is produced by the vibration of stretched strings (plucked, bowed, or struck).\n- Examples in Eastern Africa:\n  * Nyatiti (Luo): 8-stringed plucked bowl lyre played with both hands resting on the resonator.\n  * Orutu (Luo): Single-stringed bowed spike fiddle played with a sisal-hair bow.\n  * Wandindi (Agikuyu, Aembu): Single-stringed bowed fiddle with a small gourd resonator.\n  * Obokano (Abagusii): Giant double-bass lyre producing deep buzzing bass rhythms.\n  * Adeudeu (Iteso/Turkana): Plucked arched harp played during social celebrations.\n  * Ennanga (Baganda in Uganda): Aristocratic Royal arched harp.\n\n2. Aerophones (Wind Instruments):\n- Sound is produced by a vibrating column of air blown into or across an opening.\n- Examples:\n  * Abu (Luo): Giant ceremonial horn made of joined gourds and animal horn, blown by elders.\n  * Chivoti (Mijikenda): Transverse bamboo flute with 4 finger holes played during weddings.\n  * Coro (Agikuyu): Side-blown animal horn (kudu or ox horn) used for alarm signals and ceremonies.\n  * Tung’ (Kalenjin): Animal horn blown to rally warriors and signal assemblies.\n\n3. Membranophones (Drums):\n- Sound is produced by the vibration of a tightly stretched animal skin (membrane) when struck with hands or sticks.\n- Examples:\n  * Isukuti (Abaluhya): A set of three conical wooden drums (Mutambu, Sukuti, Tsitsingiri) played for joyful celebrations.\n  * Mabumbumbu (Mijikenda): Cylindrical wooden drums carved from hardwood logs.\n  * Eng’oma (Uganda and Western Kenya): Royal drums played in royal courts.\n\n4. Idiophones (Self-Sounding Instruments):\n- Sound is produced by the vibration of the instrument’s own body without strings or membranes.\n- Examples:\n  * Kayamba (Mijikenda, Swahili): Reed rattle box filled with hard wild seeds, shaken rhythmically.\n  * Marimba (Chopa): Wooden xylophone with tuned wooden keys over gourd resonators.\n  * Chivoti / Metal Jingle Gongs and Ankle Bell Rattles (Pekwe, Ndong): Worn by dancers to accentuate footsteps.',
    didYouKnow: 'The Obokano of the Abagusii is nicknamed the "African Double Bass" because its heavy, deep buzzing strings can be heard reverberating across fertile Kisii valleys from miles away!',
    kenyanContext: 'At cultural celebrations in Western Kenya, a master Nyatiti virtuoso wears an iron ring (Gara) on his right big toe to strike an iron bell attached to the lyre, providing his own percussion rhythm while singing and plucking strings simultaneously.',
    order: 11,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u6-l2',
    subStrandId: 'substrand-g6-ca-u6',
    title: 'Tuning, Care & Performance in Traditional Instrument Ensembles',
    content: 'Traditional instruments require careful tuning, moisture management, and skilled polyrhythmic ensemble playing.\n\n1. Tuning Traditional Instruments:\n- Stringed Instruments (Nyatiti, Wandindi): Tuned by adjusting wooden friction pegs or sliding string loops along the wooden arms to change string tension. Tighter strings produce higher pitch; looser strings produce lower pitch.\n- Drums (Membranophones):\n  * Tuned by adjusting leather lacing ropes along the wooden body.\n  * Warming the drum head near a gentle fire or in the morning sun tightens the animal hide, raising the drum pitch!\n  * Applying a dollop of special black tree resin (or beeswax) to the center of the skin lowers the pitch and enriches bass tones.\n\n2. Care and Preservation of Indigenous Instruments:\n- Keep wooden bodies away from damp moisture to prevent termite attack, wood rot, and fungal decay.\n- Protect animal skin membranes from extreme heat or rain; oil skins periodically with castor oil to prevent drying and tearing.\n- Loosen string tension slightly when storing chordophones for long periods to avoid warping wooden resonator necks.\n\n3. Performing in Traditional African Ensembles:\n- Polyrhythm: The simultaneous combination of two or more contrasting rhythmic meters (e.g. 3 against 2) played together harmoniously.\n- Call and Response: A soloist plays or sings a musical phrase (call), and the ensemble or chorus responds with an answering phrase.\n- Improvisation: Musicians vary their rhythms and embellish melodies creatively within traditional cultural guidelines.',
    didYouKnow: 'Traditional Kenyan drummers always warm their drum skins near a gentle campfire before performing because heat dries residual humidity from the animal hide, making it tight, crisp, and resonant!',
    kenyanContext: 'At public national day celebrations across all 47 counties, multi-ethnic brass bands and traditional instrument troupes perform polyrhythmic musical medleys celebrating Kenyan unity.',
    order: 12,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  }
];

lessons.forEach(l => {
  if (!db.lessons.some(existing => existing.id === l.id)) {
    db.lessons.push(l);
    console.log('Added lesson:', l.id);
  }
});

// 3. Missions 47 to 50 (world-creative-studio)
const missions = [
  {
    id: 'mission-g6-ca-u5-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 47: Keys of the Stave – Staff Notation & Sol-fa Pitch',
    description: 'Master the treble clef staff, note values from semibreves to semiquavers, and sight-sing with Curwen hand signs.',
    order: 47,
    orderIndex: 47,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-music-theorist',
    badge: 'badge-g6-ca-music-theorist',
    lessonId: 'lesson-g6-ca-u5-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u5-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u5-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 48: Anthem of the Tana – Patriotic Vocal Virtuosos',
    description: 'Sing the Kenya National Anthem with Pokomo lullaby roots, the EAC Anthem, and master choral dynamics.',
    order: 48,
    orderIndex: 48,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-vocal-virtuoso',
    badge: 'badge-g6-ca-vocal-virtuoso',
    lessonId: 'lesson-g6-ca-u5-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u5-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u6-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 49: Strings & Horns of the Savannah – Instrument Families',
    description: 'Classify Nyatiti lyres, Chivoti flutes, Isukuti drums, and Kayamba rattles across Eastern Africa.',
    order: 49,
    orderIndex: 49,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-instrument-curator',
    badge: 'badge-g6-ca-instrument-curator',
    lessonId: 'lesson-g6-ca-u6-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u6-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u6-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 50: Rhythms of the Drum – Tuning & Polyrhythmic Harmony',
    description: 'Master drum fire tuning, beeswax pitch damping, and perform polyrhythmic call-and-response ensembles.',
    order: 50,
    orderIndex: 50,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-ca-polyrhythm-master',
    badge: 'badge-g6-ca-polyrhythm-master',
    lessonId: 'lesson-g6-ca-u6-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-ca-u6-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-creative-g6'
  }
];

missions.forEach(m => {
  if (!db.missions.some(existing => existing.id === m.id)) {
    db.missions.push(m);
    console.log('Added mission:', m.id);
  }
});

// 4. Questions: 48 Questions
const questions = [
  // Mission 47 (Unit 5 Lesson 1: q-g6-ca-u5-001 to 012)
  {
    id: 'q-g6-ca-u5-001',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'How many horizontal lines and spaces make up a standard musical staff (stave)?',
    options: [
      '5 lines and 4 spaces',
      '4 lines and 5 spaces',
      '6 lines and 6 spaces',
      '3 lines and 2 spaces'
    ],
    correctAnswer: '5 lines and 4 spaces',
    explanation: 'A musical staff consists of 5 parallel horizontal lines and 4 spaces, numbered from bottom to top.',
    socraticHint: 'How many lines are on a musical stave: five lines or four lines?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-002',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What are the pitch names of the four spaces of the treble clef staff from bottom to top?',
    options: [
      'F - A - C - E (spelling FACE)',
      'E - G - B - D',
      'A - B - C - D',
      'D - O - H - M'
    ],
    correctAnswer: 'F - A - C - E (spelling FACE)',
    explanation: 'The four spaces of the treble stave spell the English word FACE (1st space F, 2nd space A, 3rd space C, 4th space E).',
    socraticHint: 'Which common body part word (F-A-C-E) names the spaces of the treble staff?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-003',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What is the duration value of a semibreve (whole note) in common 4/4 time?',
    options: [
      '4 counts (beats)',
      '2 counts (beats)',
      '1 count (beat)',
      '1/2 count (beat)'
    ],
    correctAnswer: '4 counts (beats)',
    explanation: 'A semibreve is an open oval without a stem that receives 4 full beats in common time.',
    socraticHint: 'How many beats does a whole note (semibreve) receive: one, two, or four beats?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-004',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What is the duration value of a crotchet (quarter note)?',
    options: [
      '1 beat',
      '2 beats',
      '3 beats',
      '4 beats'
    ],
    correctAnswer: '1 beat',
    explanation: 'A crotchet has a filled solid oval head with a stem and receives 1 beat in simple time signatures.',
    socraticHint: 'Which solid black note with a stem receives exactly one beat in a bar?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-005',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'In a 3/4 time signature, what does the top number 3 indicate?',
    options: [
      'There are 3 beats in every measure (bar)',
      'There are 3 lines on the staff',
      'Only 3 singers are allowed to sing',
      'The song lasts for 3 minutes'
    ],
    correctAnswer: 'There are 3 beats in every measure (bar)',
    explanation: 'The top number in any time signature states the total number of beats contained in each measure.',
    socraticHint: 'Does the top number tell you how many beats are in each bar or how fast the song is?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-006',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What note pitch sits on the second line of the treble staff where the clef loops around?',
    options: [
      'G',
      'E',
      'B',
      'D'
    ],
    correctAnswer: 'G',
    explanation: 'The treble clef is also known as the G clef because its circular loop anchors directly on the second line G.',
    socraticHint: 'What letter note name is the treble clef also called (the G clef)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-007',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'How many quavers (eighth notes) equal the duration value of one minim (half note)?',
    options: [
      '4 quavers',
      '2 quavers',
      '8 quavers',
      '1 quaver'
    ],
    correctAnswer: '4 quavers',
    explanation: 'A minim equals 2 beats. Each quaver is 1/2 beat. Therefore, 4 quavers (4 × 1/2 = 2) equal one minim.',
    socraticHint: 'A minim has 2 beats and each quaver has half a beat. How many half beats make two whole beats?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-008',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What are Curwen hand signs used for in music lessons?',
    options: [
      'Physical hand gestures representing the tonic sol-fa pitches (doh, ray, me, fah, soh, lah, te) to reinforce pitch visual memory',
      'Sign language for buying groceries',
      'Gestures for refereeing basketball matches',
      'Exercises for strengthening wrist muscles'
    ],
    correctAnswer: 'Physical hand gestures representing the tonic sol-fa pitches (doh, ray, me, fah, soh, lah, te) to reinforce pitch visual memory',
    explanation: 'Curwen hand signs provide spatial visual cues corresponding to vocal pitches, helping learners sing accurate intervals.',
    socraticHint: 'How do hand shapes for doh, ray, me, and soh help singers visualize and pitch notes accurately?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-009',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What note pitch sits on the first line (bottom line) of the treble staff?',
    options: [
      'E',
      'F',
      'G',
      'A'
    ],
    correctAnswer: 'E',
    explanation: 'The lines of the treble staff from bottom to top are E - G - B - D - F ("Every Good Boy Does Fine").',
    socraticHint: 'In the memory phrase "Every Good Boy Does Fine", what is the first letter representing line 1?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-010',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What is a "rest" in music notation?',
    options: [
      'A symbol indicating a measured period of silence for a specific number of beats',
      'A chair for the musician to sit on',
      'Sleeping during choir practice',
      'Singing as softly as possible'
    ],
    correctAnswer: 'A symbol indicating a measured period of silence for a specific number of beats',
    explanation: 'Rests are silent intervals in music with duration values that correspond directly to note values (crotchet rest, minim rest, etc.).',
    socraticHint: 'What symbol tells a musician to be silent for a certain number of beats?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-011',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What symbol is placed across the five lines of a staff to divide music into measures of equal beats?',
    options: [
      'Bar line',
      'Clef',
      'Tie',
      'Slur'
    ],
    correctAnswer: 'Bar line',
    explanation: 'A vertical bar line partitions the staff into measures according to the time signature.',
    socraticHint: 'What vertical line divides musical staves into measures (bars)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-012',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l1',
    text: 'What is a "dot" placed immediately after a note (such as a dotted minim) called, and what does it do to the note’s duration?',
    options: [
      'A dot increases the duration of the note by half of its original value (e.g. a dotted minim lasts 2 + 1 = 3 beats)',
      'A dot cuts the note value in half',
      'A dot makes the note sound twice as fast',
      'A dot means play the note with your eyes closed'
    ],
    correctAnswer: 'A dot increases the duration of the note by half of its original value (e.g. a dotted minim lasts 2 + 1 = 3 beats)',
    explanation: 'A dot adds 50% more value to the preceding note; a minim (2 beats) becomes 3 beats when dotted.',
    socraticHint: 'How does placing a dot beside a note add half of that note’s value to its total length?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 48 (Unit 5 Lesson 2: q-g6-ca-u5-013 to 024)
  {
    id: 'q-g6-ca-u5-013',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'From which indigenous community in Kenya was the melody of the Kenya National Anthem derived in 1963?',
    options: [
      'The Pokomo community along the Tana River',
      'The Maasai community of Narok',
      'The Giriama community of Kilifi',
      'The Samburu community of Maralal'
    ],
    correctAnswer: 'The Pokomo community along the Tana River',
    explanation: 'The anthem commission based Kenya’s national melody on a traditional Pokomo lullaby ("Bee ndoza mwana wangu").',
    socraticHint: 'Which riverine community along the Tana River sang the traditional lullaby that gave Kenya its national anthem tune?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-014',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What proper civic protocol should all citizens observe when the Kenya National Anthem is being sung or played?',
    options: [
      'Stand upright at attention with hands relaxed at the sides, facing the National Flag, in complete silence and reverence',
      'Continue walking and shouting on mobile phones',
      'Sit down and cross legs',
      'Start running toward the exit'
    ],
    correctAnswer: 'Stand upright at attention with hands relaxed at the sides, facing the National Flag, in complete silence and reverence',
    explanation: 'Standing at attention honors the sovereign dignity of the nation and the sacrifices of freedom fighters.',
    socraticHint: 'How should you stand respectfully when the national anthem is sung at school parade assembly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-015',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What musical term describes singing softly in choir performance?',
    options: [
      'Piano (p)',
      'Forte (f)',
      'Fortissimo (ff)',
      'Allegro'
    ],
    correctAnswer: 'Piano (p)',
    explanation: 'Piano (abbreviated p) is the Italian musical dynamic term for soft.',
    socraticHint: 'Which Italian dynamic term abbreviated as "p" instructs singers to sing softly?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-016',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What musical term describes singing with full power and loudness?',
    options: [
      'Forte (f)',
      'Pianissimo (pp)',
      'Adagio',
      'Lento'
    ],
    correctAnswer: 'Forte (f)',
    explanation: 'Forte (abbreviated f) directs singers to perform loudly and boldly.',
    socraticHint: 'Which musical dynamic term abbreviated as "f" means loud?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-017',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What does a "crescendo" symbol (<) indicate to singers in a choral piece?',
    options: [
      'Gradually increase the volume of singing from soft to loud',
      'Gradually decrease the volume to complete silence',
      'Stop singing immediately and leave the stage',
      'Sing out of tune on purpose'
    ],
    correctAnswer: 'Gradually increase the volume of singing from soft to loud',
    explanation: 'Crescendo indicates a gradual swelling or increase in sound volume.',
    socraticHint: 'Does a crescendo mean getting gradually louder or getting gradually softer?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-018',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What is "diction" in choral vocal music?',
    options: [
      'Clear, precise enunciation and pronunciation of words and vowel sounds so the audience understands the message',
      'The speed of dancing on stage',
      'The type of shoes the choir wears',
      'The volume of the piano accompaniment'
    ],
    correctAnswer: 'Clear, precise enunciation and pronunciation of words and vowel sounds so the audience understands the message',
    explanation: 'Good diction ensures every syllable and consonant is articulate and understandable to the listening audience.',
    socraticHint: 'What do we call speaking and singing words clearly so that every syllable is crisp?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-019',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What is the title of the official anthem of the East African Community sung across Kenya, Uganda, Tanzania, and neighboring states?',
    options: [
      'Wimbo wa Jumuiya ya Afrika Mashariki (Jumuiya Yetu)',
      'God Save the King',
      'Hodi Hodi Africa',
      'Dunia Ina Mambo'
    ],
    correctAnswer: 'Wimbo wa Jumuiya ya Afrika Mashariki (Jumuiya Yetu)',
    explanation: '"Jumuiya Yetu" is the regional anthem of the EAC celebrating peace, brotherhood, and economic partnership in Kiswahili.',
    socraticHint: 'What is the Swahili anthem of the East African Community beginning with the words "Ee Mungu twaomba uilinde Jumuiya Afrika Mashariki"?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-020',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What proper breathing technique should singers employ to sustain long vocal notes with rich tone and control?',
    options: [
      'Diaphragmatic breathing (expanding the lower abdomen and ribs while keeping shoulders relaxed)',
      'Shallow chest panting',
      'Holding breath until face turns red',
      'Breathing exclusively through one nostril'
    ],
    correctAnswer: 'Diaphragmatic breathing (expanding the lower abdomen and ribs while keeping shoulders relaxed)',
    explanation: 'Diaphragmatic breathing engages core muscles to supply steady, controlled air support without straining vocal cords.',
    socraticHint: 'Which deep breathing method expands your diaphragm and stomach rather than raising your shoulders?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-021',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What is "pitch accuracy" (intonation) in choir performance?',
    options: [
      'Singing the exact intended musical notes without going sharp (too high) or flat (too low)',
      'Singing at high speed',
      'Wearing colorful choir robes',
      'Singing with microphone amplification'
    ],
    correctAnswer: 'Singing the exact intended musical notes without going sharp (too high) or flat (too low)',
    explanation: 'Intonation is singing precisely on-key so harmonies blend in perfect acoustic accord.',
    socraticHint: 'What do we call singing on true pitch without drifting sharp or flat?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-022',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'How many stanzas make up the complete official Kenya National Anthem?',
    options: [
      '3 stanzas',
      '1 stanza',
      '5 stanzas',
      '10 stanzas'
    ],
    correctAnswer: '3 stanzas',
    explanation: 'The Kenya National Anthem has 3 verses praying for unity, national freedom, and industrious collective work.',
    socraticHint: 'How many verses (stanzas) are in the Kenya National Anthem?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-023',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What is "harmony" when a school choir sings the National Anthem in three-part arrangement (Soprano, Alto, Tenor)?',
    options: [
      'Singing different complimentary melodic pitches simultaneously that blend into pleasant, rich chords',
      'All singers shouting the exact same note at top volume',
      'Singing three completely different songs at the same time',
      'Singing while standing on one foot'
    ],
    correctAnswer: 'Singing different complimentary melodic pitches simultaneously that blend into pleasant, rich chords',
    explanation: 'Harmony combines simultaneous musical lines (parts) that accompany each other to create rich resonant acoustic textures.',
    socraticHint: 'What do we call the rich musical blending when sopranos and altos sing different harmonious parts together?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u5-024',
    subStrandId: 'substrand-g6-ca-u5',
    lessonId: 'lesson-g6-ca-u5-l2',
    text: 'What is the role of a choir conductor during a choral music performance at the Kenya National Music Festival?',
    options: [
      'Guiding tempo, cueing vocal entries, shaping dynamic expressions, and ensuring musical cohesion through hand gestures',
      'Singing louder than the entire choir into a microphone',
      'Selling music sheets to the judges',
      'Blocking the audience’s view of the singers'
    ],
    correctAnswer: 'Guiding tempo, cueing vocal entries, shaping dynamic expressions, and ensuring musical cohesion through hand gestures',
    explanation: 'The conductor leads the ensemble silently using baton or hand movements to synchronize time, blend, and emotional interpretation.',
    socraticHint: 'How does the teacher or choir director direct tempo and musical entries with their hands?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 49 (Unit 6 Lesson 1: q-g6-ca-u6-001 to 012)
  {
    id: 'q-g6-ca-u6-001',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which category of musical instruments produces sound through the vibration of stretched strings when plucked, bowed, or struck?',
    options: [
      'Chordophones',
      'Aerophones',
      'Membranophones',
      'Idiophones'
    ],
    correctAnswer: 'Chordophones',
    explanation: 'Chordophones (from Greek chorde = string) include all stringed instruments like lyres, harps, fiddles, and guitars.',
    socraticHint: 'Which instrument family includes stringed instruments like the Nyatiti, Orutu, and guitar?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-002',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What traditional eight-stringed bowl lyre of the Luo community is classified as a chordophone and plucked with both hands?',
    options: [
      'Nyatiti',
      'Abu',
      'Chivoti',
      'Isukuti'
    ],
    correctAnswer: 'Nyatiti',
    explanation: 'The Nyatiti is a celebrated 8-stringed plucked chordophone played during traditional festivals and philosophical poetry.',
    socraticHint: 'Which iconic 8-stringed bowl lyre from western Kenya is plucked with two hands?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-003',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which category of instruments produces sound through a vibrating column of air blown into or across an opening?',
    options: [
      'Aerophones',
      'Chordophones',
      'Idiophones',
      'Electrophone'
    ],
    correctAnswer: 'Aerophones',
    explanation: 'Aerophones (wind instruments) include flutes, animal horns, trumpets, and whistles that vibrate columns of air.',
    socraticHint: 'Which family of instruments includes wind flutes and horns blown with the breath?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-004',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which traditional transverse bamboo flute played by the Mijikenda community at the Kenyan coast is classified as an aerophone?',
    options: [
      'Chivoti',
      'Orutu',
      'Kayamba',
      'Wandindi'
    ],
    correctAnswer: 'Chivoti',
    explanation: 'The Chivoti is a side-blown bamboo flute that produces high-pitched, sweet melodious tunes during coastal dance celebrations.',
    socraticHint: 'Which bamboo flute of the coastal Mijikenda people is blown sideways like a western flute?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-005',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which category of musical instruments produces sound through the vibration of a tightly stretched animal skin membrane when struck?',
    options: [
      'Membranophones',
      'Aerophones',
      'Chordophones',
      'Idiophones'
    ],
    correctAnswer: 'Membranophones',
    explanation: 'Membranophones encompass all drums where sound is produced by striking a stretched skin membrane.',
    socraticHint: 'What instrument family includes drums covered with stretched cow or goat hide membranes?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-006',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What famous set of three traditional conical drums played by the Abaluhya community is classified as a membranophone ensemble?',
    options: [
      'Isukuti drums (Mutambu, Sukuti, Tsitsingiri)',
      'Nyatiti set',
      'Abu horns',
      'Chivoti flutes'
    ],
    correctAnswer: 'Isukuti drums (Mutambu, Sukuti, Tsitsingiri)',
    explanation: 'The Isukuti ensemble comprises three distinctive drums whose fast, syncopated rhythms drive celebratory Luhya dances.',
    socraticHint: 'Which famous triplet drum set from Kakamega drives high-energy Isukuti dances?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-007',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which category of instruments produces sound through the vibration of its own solid body without requiring strings or stretched membranes?',
    options: [
      'Idiophones',
      'Chordophones',
      'Aerophones',
      'Membranophones'
    ],
    correctAnswer: 'Idiophones',
    explanation: 'Idiophones (self-sounding instruments) produce sound by their own resonant material when shaken, struck, or scraped (e.g. rattles, bells, xylophones).',
    socraticHint: 'What family of instruments includes self-sounding rattles, shakers, and bells that vibrate their own bodies?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-008',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What traditional reed-box shaker filled with hard wild seeds, widely played along the Kenyan coast, is classified as an idiophone?',
    options: [
      'Kayamba',
      'Orutu',
      'Abu',
      'Wandindi'
    ],
    correctAnswer: 'Kayamba',
    explanation: 'The Kayamba is a flat reed rattle filled with seeds, shaken and tapped by thumbs to generate driving polyrhythms.',
    socraticHint: 'What flat rectangular reed rattle filled with seeds is shaken by both hands in Swahili and Mijikenda music?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-009',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'Which one-stringed bowed spike fiddle, played with a sisal-hair bow, is a popular chordophone in western Kenya?',
    options: [
      'Orutu',
      'Kayamba',
      'Chivoti',
      'Abu'
    ],
    correctAnswer: 'Orutu',
    explanation: 'The Orutu features a single string bowed with a horsehair or sisal bow, leading vocal praise songs in Ohangla music.',
    socraticHint: 'Which single-stringed fiddle is played with a curved bow in modern and traditional Luo Ohangla music?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-010',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What giant ceremonial wind instrument, made of joined gourds and animal horn, is blown by elders during solemn Luo ceremonies?',
    options: [
      'Abu',
      'Wandindi',
      'Nyatiti',
      'Kayamba'
    ],
    correctAnswer: 'Abu',
    explanation: 'The Abu is an impressive bass aerophone made of hollowed gourds fitted together, blown at royal funerals and major festivals.',
    socraticHint: 'Which long horn made of joined gourds produces a deep bass call during western Kenya ceremonies?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-011',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What single-stringed bowed fiddle with a small gourd resonator is played by the Agikuyu and Aembu communities?',
    options: [
      'Wandindi',
      'Orutu',
      'Obokano',
      'Chivoti'
    ],
    correctAnswer: 'Wandindi',
    explanation: 'The Wandindi is a traditional bowed chordophone with a calabash or tin resonator, played to accompany circumcision and social folk songs.',
    socraticHint: 'What is the name of the traditional bowed fiddle with a calabash resonator in central Kenya?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-012',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l1',
    text: 'What giant double-bass lyre of the Abagusii community produces deep buzzing bass notes and is played by male bards?',
    options: [
      'Obokano',
      'Nyatiti',
      'Adeudeu',
      'Ennanga'
    ],
    correctAnswer: 'Obokano',
    explanation: 'The Obokano is the largest lyre in Africa; its thick cow-tendon strings vibrate over an animal-skin covered wooden bowl to produce bass rhythms.',
    socraticHint: 'Which giant Gusii bowl lyre is known as the "African double bass"?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // Mission 50 (Unit 6 Lesson 2: q-g6-ca-u6-013 to 024)
  {
    id: 'q-g6-ca-u6-013',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'Why do traditional African drummers warm their drum heads near a gentle fire before playing?',
    options: [
      'Heat drives out moisture, tightening the animal skin membrane and raising the pitch to a crisp, resonant tone',
      'To cook dinner on the drum head',
      'To burn off the animal hair',
      'To change the drum from wood into metal'
    ],
    correctAnswer: 'Heat drives out moisture, tightening the animal skin membrane and raising the pitch to a crisp, resonant tone',
    explanation: 'Damp air causes leather skins to slacken and sound muddy; gentle heating contracts skin fibers, raising drum tension and clarity.',
    socraticHint: 'How does gentle heat tighten animal hide drumheads to make them sound bright and crisp?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-014',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What do some East African drummers apply to the center of a drumhead to lower its pitch and produce a deep, warm bass boom?',
    options: [
      'A patch of natural tree resin (or beeswax paste)',
      'A layer of white cement',
      'A piece of wet paper',
      'A slice of ripe banana'
    ],
    correctAnswer: 'A patch of natural tree resin (or beeswax paste)',
    explanation: 'Tuning paste (tree resin or wax) adds mass to the center of the vibrating membrane, dampening high overtones and deepening the fundamental pitch.',
    socraticHint: 'What sticky natural substance from bees or tree sap is placed on drumheads to deepen bass tones?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-015',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'How is a stringed instrument like the Nyatiti tuned to the desired musical scale?',
    options: [
      'By tightening or loosening the tuning rings and strings along the upper wooden crossbar to adjust tension',
      'By sawing off the wooden arms',
      'By painting the resonator red',
      'By washing the strings in hot water'
    ],
    correctAnswer: 'By tightening or loosening the tuning rings and strings along the upper wooden crossbar to adjust tension',
    explanation: 'Sliding and twisting the tuning loops alters string tension: tighter strings yield higher pitch; looser strings yield lower pitch.',
    socraticHint: 'How does adjusting the tightness of strings change their pitch on a musical lyre?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-016',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What musical technique, central to traditional African music, involves combining two or more contrasting rhythmic patterns simultaneously?',
    options: [
      'Polyrhythm (cross-rhythm)',
      'Monotone',
      'Silence',
      'Unison clapping'
    ],
    correctAnswer: 'Polyrhythm (cross-rhythm)',
    explanation: 'Polyrhythm layers distinct, interlocking meters (such as 3-beat and 2-beat patterns) to create dynamic, complex rhythmic textures.',
    socraticHint: 'What do we call the layering of multiple contrasting rhythms played together in African drumming?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-017',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What is "call and response" in an African musical performance?',
    options: [
      'A musical dialogue where a lead soloist sings or plays a phrase (call) and the chorus or ensemble answers with a chorus phrase (response)',
      'Making a phone call during a concert',
      'A teacher calling attendance names',
      'Singing with your back to the audience'
    ],
    correctAnswer: 'A musical dialogue where a lead soloist sings or plays a phrase (call) and the chorus or ensemble answers with a chorus phrase (response)',
    explanation: 'Call and response is a universal African musical structure facilitating interactive community participation between leader and chorus.',
    socraticHint: 'What musical conversation takes place when a soloist sings a lead line and the chorus sings back an answer?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-018',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'How should traditional wooden drums and chordophones be stored to protect them from environmental damage?',
    options: [
      'Stored in a dry, well-ventilated room away from termites and dampness, and protected from extreme direct sunlight',
      'Left outside in the rain and mud',
      'Buried underground in wet soil',
      'Kept next to a burning charcoal stove'
    ],
    correctAnswer: 'Stored in a dry, well-ventilated room away from termites and dampness, and protected from extreme direct sunlight',
    explanation: 'Dry storage prevents wood-boring insects, warping, and fungal mold, while keeping animal skin membranes resilient.',
    socraticHint: 'Why should valuable traditional musical instruments be stored in dry, well-ventilated rooms away from rain and termites?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-019',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What is the function of the hollow gourd or wooden bowl resonator in traditional stringed instruments like the Nyatiti and Wandindi?',
    options: [
      'It amplifies the sound vibrations of the thin strings so the music can be heard clearly by listeners',
      'It stores water for the musician to drink',
      'It makes the instrument too heavy to carry',
      'It prevents the strings from ever vibrating'
    ],
    correctAnswer: 'It amplifies the sound vibrations of the thin strings so the music can be heard clearly by listeners',
    explanation: 'Vibrating strings produce tiny sound waves; the hollow resonator captures and acoustically amplifies the sound into rich volume.',
    socraticHint: 'Why does an acoustic guitar or Nyatiti need a hollow wooden body or calabash under its strings?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-020',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What ankle percussion instrument, made of iron pellets inside dried seed pods or metal cases, is worn by dancers to accentuate their steps?',
    options: [
      'Ankle rattles (Pekwe, Ndong, Gara)',
      'Rubber boots',
      'Wooden clogs',
      'Roller skates'
    ],
    correctAnswer: 'Ankle rattles (Pekwe, Ndong, Gara)',
    explanation: 'Ankle rattles ring with every stomp and jump, tightly synchronizing bodily dance choreography with percussion music.',
    socraticHint: 'What rattling ornaments worn on dancers’ ankles create sharp metallic rhythms with every foot stomp?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-021',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'Why do musicians rub rosin (hard tree resin) onto the horsehair or sisal bow used to play the Orutu and Wandindi?',
    options: [
      'It creates friction, allowing the bow hairs to grip and vibrate the string rather than sliding silently across it',
      'To make the bow smell sweet',
      'To turn the bow hairs yellow',
      'To glue the bow permanently to the instrument'
    ],
    correctAnswer: 'It creates friction, allowing the bow hairs to grip and vibrate the string rather than sliding silently across it',
    explanation: 'Rosin creates the microscopic stick-slip friction required for bow hairs to grab the string and sustain continuous musical tones.',
    socraticHint: 'Why must violin and fiddle bows have sticky resin rubbed on them to grip strings and make sound?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-022',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'What is musical "improvisation" in traditional African instrumental playing?',
    options: [
      'Creatively inventing new melodic embellishments and rhythmic variations spontaneously during a live performance within traditional guidelines',
      'Playing completely wrong notes by accident',
      'Stopping the performance to read a book',
      'Copying a foreign recording without permission'
    ],
    correctAnswer: 'Creatively inventing new melodic embellishments and rhythmic variations spontaneously during a live performance within traditional guidelines',
    explanation: 'Improvisation allows skilled master musicians to showcase individual virtuosity and respond dynamically to dancers and audience moods.',
    socraticHint: 'What do we call spontaneous creative variations played by a master drummer or soloist during a live performance?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-023',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'Why should leather drum lacing ropes be checked and adjusted before performing in a music festival?',
    options: [
      'To ensure all drums in the ensemble are tuned to their proper harmonic relative pitches and sound crisp together',
      'To see if the ropes can be used for jumping',
      'To weigh how heavy the drum is',
      'To tie the drum to the ceiling'
    ],
    correctAnswer: 'To ensure all drums in the ensemble are tuned to their proper harmonic relative pitches and sound crisp together',
    explanation: 'Adjusting side laces tunes the membrane, ensuring the lead drum, tenor drum, and bass drum complement each other harmoniously.',
    socraticHint: 'How does adjusting side ropes tune different drums in an ensemble so their pitches blend harmoniously?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u6-024',
    subStrandId: 'substrand-g6-ca-u6',
    lessonId: 'lesson-g6-ca-u6-l2',
    text: 'How does learning and playing traditional Kenyan musical instruments preserve indigenous cultural knowledge for future generations?',
    options: [
      'It safeguards ancestral artistic heritage, fosters inter-ethnic pride, and connects youth with the rich history and oral literature of our nation',
      'It replaces all academic subjects in school',
      'It forces everyone to live without electricity',
      'It stops young people from learning international languages'
    ],
    correctAnswer: 'It safeguards ancestral artistic heritage, fosters inter-ethnic pride, and connects youth with the rich history and oral literature of our nation',
    explanation: 'Mastering indigenous instruments preserves oral histories, folklore, and cultural identity against cultural erosion.',
    socraticHint: 'Why is mastering traditional music and instruments so essential for celebrating our national cultural heritage?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  }
];

questions.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
  }
});

console.log(`Added ${questions.length} questions for Units 5 & 6.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 3 to cbe_database.json!');
