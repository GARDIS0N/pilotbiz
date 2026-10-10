/**
 * Grade 6 Creative Arts & Sports - Batch 5 Generator
 * Content: Units 9 & 10
 * - Unit 9: Field Events & Ball Games: Long Jump, Football, Netball & Volleyball (substrand-g6-ca-u9, strand-g6-ca-sports)
 * - Unit 10: Gymnastics, Rope Skipping, Water Safety & Sports First Aid (substrand-g6-ca-u10, strand-g6-ca-sports)
 * Missions: Orders 55, 56, 57, 58 (world-creative-studio)
 * Questions: 48 (24 per unit: q-g6-ca-u9-001 to q-g6-ca-u10-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Creative Arts & Sports Batch 5 (Units 9 & 10) ---');

// 1. Units (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-ca-u9',
    strandId: 'strand-g6-ca-sports',
    learningAreaId: 'la-creative-g6',
    title: 'Field Events & Ball Games: Long Jump, Football, Netball & Volleyball',
    name: 'Field Events & Ball Games: Long Jump, Football, Netball & Volleyball',
    description: 'Field events mechanics including the Long Jump (approach run, take-off from board, flight techniques such as sail, hang, and hitch-kick, and landing in the sand pit); ball game fundamentals: Football (passing with inside/outside of foot, instep shooting, dribbling with control, throw-in mechanics, goalkeeping, and offside rule); Netball (chest pass, bounce pass, overhead pass, pivoting on landing foot, shooting, obstruction, contact rules); Volleyball (overhead set/pass, underhand bump/dig, underhand service, 3-touch regulation, and rotation); fair play, communication, and teamwork.',
    cbeCompetency: 'Field event execution, multi-sport ball handling agility, tactical game sense, and teamwork',
    estimatedMinutes: 30,
    order: 9,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-ca-u10',
    strandId: 'strand-g6-ca-sports',
    learningAreaId: 'la-creative-g6',
    title: 'Gymnastics, Rope Skipping, Water Safety & Sports First Aid',
    name: 'Gymnastics, Rope Skipping, Water Safety & Sports First Aid',
    description: 'Educational gymnastics: floor sequences, balances (headstand, handstand against wall, arabesque, v-sit), rolls (forward roll, backward roll, log roll), weight transfer, and vaulting box safety; Rope skipping skills (basic bounce, alternate foot jump, criss-cross, double under) for cardiovascular conditioning; Water safety and basic swimming strokes (freestyle flutter kick, breaststroke pull, backstroke glide, pool hygiene, and drowning prevention); First Aid and sports injury management: R.I.C.E. procedure (Rest, Ice, Compression, Elevation) for sprains and strains, heat exhaustion hydration, wound dressing, recovery position, and sports ethics.',
    cbeCompetency: 'Gymnastic poise, aquatic self-rescue competence, rope skipping agility, and emergency sports first aid',
    estimatedMinutes: 30,
    order: 10,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-ca-u9-l1',
    subStrandId: 'substrand-g6-ca-u9',
    title: 'Field Events: Long Jump Biomechanics (Approach, Take-off, Flight & Landing)',
    content: 'The Long Jump is an explosive track and field event combining horizontal speed with vertical lift.\n\n1. The Four Phases of Long Jump:\n- Approach Run (Run-up): A controlled acceleration of 16 to 24 strides reaching top controllable speed while hitting check-marks with rhythmic precision.\n- Take-off: The jumper places their dominant take-off foot flat onto the take-off board (without crossing the foul line/plasticine indicator), driving the free knee and opposite arm explosively upward.\n- Flight in the Air: Three primary techniques: 1) The Sail (legs and arms brought forward into a pike position; ideal for beginners); 2) The Hang (body arches backwards in mid-air before snapping legs forward); 3) The Hitch-Kick (athlete continues a running motion in mid-air to prevent forward rotation).\n- Landing: Both feet extend forward into the sand pit, knees flex upon impact to absorb shock, and the jumper falls forward or sideways so that no body part touches the sand behind the heel mark.\n\n2. Rules and Measurement:\n- Stepping over the front edge of the take-off board is a foul (no jump recorded).\n- The jump is measured from the nearest break in the sand made by any part of the athlete’s body to the front edge of the take-off board.',
    didYouKnow: 'The current men’s world long jump record of 8.95 meters, set by Mike Powell in 1991, has stood for over 30 years!',
    kenyanContext: 'At the Kenya Primary Schools Sports Association (KPSSA) national championships, young jumpers compete on standardized sand pits across all 8 regions.',
    order: 17,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u9-l2',
    subStrandId: 'substrand-g6-ca-u9',
    title: 'Ball Games: Football Passing & Control, Netball Pivoting & Volleyball Digging',
    content: 'Ball games develop hand-eye coordination, spatial awareness, tactical decisions, and cooperative team play.\n\n1. Football (Soccer):\n- Passing: Push pass using the inside of the foot for accuracy; instep drive with laces for long passes and shooting; chipping for lofted balls.\n- Trapping & Control: Cushioning incoming balls using the sole, inside of the foot, thigh, or chest.\n- Throw-in Rules: Both feet must remain on or behind the touchline on the ground; ball delivered from behind and over the head with both hands.\n\n2. Netball Fundamentals:\n- Passing: Chest pass (fast, direct, pushed from sternum), bounce pass (low, bouncing two-thirds towards teammate), overhead pass (over defenders).\n- Footwork & Pivoting: Once a player catches the ball, the landing foot must remain anchored as a pivot; no running or dribbling is allowed (strict footwork rule).\n- Obstruction & Contact: Defending players must stand at least 0.9m (3 feet) away from the player with the ball.\n\n3. Volleyball Skills:\n- The Underhand Bump (Dig): Knees flexed, flat platform formed by forearms locked together with thumbs aligned; used to receive serves.\n- The Overhead Volley (Set): Soft triangle shape formed by thumbs and index fingers above forehead to deliver a high, gentle pass to an attacker.\n- Service: Underhand serve contacting the bottom of the ball with the heel of the hand over the net.\n- 3-Touch Rule: A team has a maximum of three contacts to return the ball across the net.',
    didYouKnow: 'Netball evolved from early basketball in England in the 1890s and is played on a court divided into three distinct thirds!',
    kenyanContext: 'The Malkia Strikers (Kenya Women’s National Volleyball Team) are multiple-time African champions and regular Olympic contenders, inspiring school sports nationwide.',
    order: 18,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u10-l1',
    subStrandId: 'substrand-g6-ca-u10',
    title: 'Educational Gymnastics: Balances, Weight Transfer, Rolling & Vaulting Safety',
    content: 'Educational gymnastics focuses on body control, poise, flexibility, core strength, and safe spatial navigation.\n\n1. Static and Dynamic Balances:\n- Arabesque: Standing on one straight leg with torso tilted forward and the opposite leg extended high behind in a graceful horizontal line.\n- V-Sit: Balancing on the buttocks with legs raised straight at 45 degrees and arms reaching forward parallel to the floor.\n- Headstand (Tripod): Placing the crown of the head and both palms on the mat forming an equilateral triangle base before lifting hips and legs vertically.\n\n2. Weight Transfer and Rolling:\n- Forward Roll: Tucking chin tightly to chest, placing hands shoulder-width on mat, pushing off feet, and rolling along the curved spine without allowing the top of head to slam into the mat.\n- Backward Roll: Dropping into a crouch, hands beside ears palms up, rolling back onto shoulders while pushing the floor with hands to complete the rotation onto feet.\n- Cartwheel: Lateral weight transfer from hand-to-hand and foot-to-foot along a straight line with extended limbs.\n\n3. Vaulting and Apparatus Safety:\n- Vaulting box or bench: Run-up, two-foot spring from springboard, squat or straddle over apparatus, and stable landing with knees flexed ("stick the landing").\n- Mat placement, attentive spotters, and adherence to safety protocols prevent falls and concussions.',
    didYouKnow: 'The tripod base in gymnastics headstands is derived from ancient engineering principles: a triangle is the most rigid, stable geometric structure!',
    kenyanContext: 'Gymnastic floor routines and pyramid displays are popular highlights during school open days and national music and drama festival exhibitions.',
    order: 19,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-ca-u10-l2',
    subStrandId: 'substrand-g6-ca-u10',
    title: 'Rope Skipping, Swimming & Water Safety, Sports First Aid (R.I.C.E.)',
    content: 'Cardiovascular conditioning, water survival competence, and prompt injury care form the foundation of lifelong physical wellness.\n\n1. Rope Skipping Techniques:\n- Basic Bounce: Jumping with feet together, clearing the rope by 2-3 cm on the balls of the feet with elbows kept close to ribs.\n- Alternate Foot Jump: Skipping rhythmically from one foot to the other like jogging in place.\n- Criss-Cross & Double Under: Crossing forearms on alternate turns or spinning the rope twice in one leap to develop elite coordination.\n\n2. Water Safety & Swimming Strokes:\n- Freestyle (Front Crawl): Streamlined body position, continuous alternate flutter kick, high elbow arm recovery, and rhythmic side breathing.\n- Backstroke: Floating supine (on back), head in line with spine, flutter kicking, and alternate windmill arm rotation.\n- Water Safety Rules: Never swim alone (buddy system), no diving into shallow water, and reach-or-throw rescue methods (extending a pole or floating aid rather than jumping in unprepared).\n\n3. First Aid for Sports Injuries:\n- The R.I.C.E. Principle for Soft Tissue Injuries (sprains, strains, bruises):\n  * R - Rest: Stop play immediately to prevent worsening the injury.\n  * I - Ice: Apply cold compress wrapped in cloth for 15-20 minutes to reduce internal swelling.\n  * C - Compression: Wrap an elastic crepe bandage firmly (not too tight to cut off circulation).\n  * E - Elevation: Elevate the injured limb above heart level to drain excess fluid.\n- Dehydration & Heat Cramps: Resting in the shade and drinking oral rehydration fluids with electrolytes.',
    didYouKnow: 'Skipping rope for just 10 minutes provides a cardiovascular workout equivalent to jogging an 8-minute mile!',
    kenyanContext: 'With Kenya’s coastline, Lake Victoria, and numerous rivers, teaching school children water safety and Reach-or-Throw rescue saves lives every year.',
    order: 20,
    durationMinutes: 15,
    learningAreaId: 'la-creative-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 55, 56, 57, 58)
const missions = [
  {
    id: 'mission-g6-ca-u9-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 55: Flight in Sand – Long Jump Biomechanics & Runway Velocity',
    description: 'Master the four stages of the long jump: accelerated approach run, explosive board take-off, flight styles (sail, hang, hitch-kick), and soft landing.',
    order: 55,
    orderIndex: 55,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ca-long-jumper',
    badge: 'badge-g6-ca-long-jumper',
    lessonId: 'lesson-g6-ca-u9-l1',
    questionIds: [
      'q-g6-ca-u9-001', 'q-g6-ca-u9-002', 'q-g6-ca-u9-003', 'q-g6-ca-u9-004',
      'q-g6-ca-u9-005', 'q-g6-ca-u9-006', 'q-g6-ca-u9-007', 'q-g6-ca-u9-008',
      'q-g6-ca-u9-009', 'q-g6-ca-u9-010', 'q-g6-ca-u9-011', 'q-g6-ca-u9-012'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u9-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 56: Multi-Sport Arena – Football Control, Netball Pivots & Volleyball Digs',
    description: 'Execute precise push passes and throw-ins in football, footwork pivoting in netball, and underhand bump digs and sets in volleyball.',
    order: 56,
    orderIndex: 56,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-ca-ballgame-champion',
    badge: 'badge-g6-ca-ballgame-champion',
    lessonId: 'lesson-g6-ca-u9-l2',
    questionIds: [
      'q-g6-ca-u9-013', 'q-g6-ca-u9-014', 'q-g6-ca-u9-015', 'q-g6-ca-u9-016',
      'q-g6-ca-u9-017', 'q-g6-ca-u9-018', 'q-g6-ca-u9-019', 'q-g6-ca-u9-020',
      'q-g6-ca-u9-021', 'q-g6-ca-u9-022', 'q-g6-ca-u9-023', 'q-g6-ca-u9-024'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u10-m1',
    worldId: 'world-creative-studio',
    title: 'Mission 57: Gymnastic Poise – Balances, Rolling Sequences & Vaulting Safety',
    description: 'Perform controlled arabesques, v-sits, tripod headstands, smooth forward rolls, cartwheels, and safe vault landings.',
    order: 57,
    orderIndex: 57,
    xpReward: 145,
    rewardXp: 145,
    coinReward: 50,
    badgeReward: 'badge-g6-ca-gymnast',
    badge: 'badge-g6-ca-gymnast',
    lessonId: 'lesson-g6-ca-u10-l1',
    questionIds: [
      'q-g6-ca-u10-001', 'q-g6-ca-u10-002', 'q-g6-ca-u10-003', 'q-g6-ca-u10-004',
      'q-g6-ca-u10-005', 'q-g6-ca-u10-006', 'q-g6-ca-u10-007', 'q-g6-ca-u10-008',
      'q-g6-ca-u10-009', 'q-g6-ca-u10-010', 'q-g6-ca-u10-011', 'q-g6-ca-u10-012'
    ],
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'mission-g6-ca-u10-m2',
    worldId: 'world-creative-studio',
    title: 'Mission 58: Aquatic Safety & Life Guardian – Skipping, Swimming & R.I.C.E. First Aid',
    description: 'Master skipping footwork, freestyle swimming flutter kicks, pool survival rules, and immediate R.I.C.E. treatment for athletic sprains.',
    order: 58,
    orderIndex: 58,
    xpReward: 150,
    rewardXp: 150,
    coinReward: 50,
    badgeReward: 'badge-g6-ca-first-responder',
    badge: 'badge-g6-ca-first-responder',
    lessonId: 'lesson-g6-ca-u10-l2',
    questionIds: [
      'q-g6-ca-u10-013', 'q-g6-ca-u10-014', 'q-g6-ca-u10-015', 'q-g6-ca-u10-016',
      'q-g6-ca-u10-017', 'q-g6-ca-u10-018', 'q-g6-ca-u10-019', 'q-g6-ca-u10-020',
      'q-g6-ca-u10-021', 'q-g6-ca-u10-022', 'q-g6-ca-u10-023', 'q-g6-ca-u10-024'
    ],
    learningAreaId: 'la-creative-g6'
  }
];

// 4. Questions (48 questions: 24 per unit)
const questions = [
  // --- Unit 9: Field Events & Ball Games (q-g6-ca-u9-001 to 024) ---
  {
    id: 'q-g6-ca-u9-001',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'What are the four sequential phases of the Long Jump in track and field athletics?',
    options: [
      'Approach run, Take-off, Flight, and Landing',
      'Start sprint, High jump, Roll, and Stand',
      'Warm-up, Throw, Run, and Sit',
      'Hurdle, Vault, Spin, and Drop'
    ],
    correctAnswer: 'Approach run, Take-off, Flight, and Landing',
    explanation: 'The Long Jump comprises four continuous, interrelated phases: the approach run (run-up), take-off from the board, flight through the air, and landing in the sand pit.',
    socraticHint: 'Recall the four main stages an athlete performs from running down the runway to hitting the sand.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-002',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'What is the primary objective of the approach run in the Long Jump?',
    options: [
      'To build maximum controllable horizontal speed and hit the take-off board accurately',
      'To tire out the athlete before jumping',
      'To jog slowly while checking the spectators in the stands',
      'To jump over hurdles placed along the runway'
    ],
    correctAnswer: 'To build maximum controllable horizontal speed and hit the take-off board accurately',
    explanation: 'The approach run allows the jumper to accelerate smoothly to their highest controllable velocity while arriving precisely on the take-off board without decelerating or stuttering.',
    socraticHint: 'Why does a long jumper run vigorously down the runway before jumping into the air?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-003',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'What constitutes a foul jump at the take-off board in a Long Jump competition?',
    options: [
      'When any part of the athlete’s foot touches beyond the take-off line (foul line/plasticine indicator)',
      'When the athlete lands on both feet in the sand pit',
      'When the athlete runs very fast down the runway',
      'When the athlete jumps off their dominant foot'
    ],
    correctAnswer: 'When any part of the athlete’s foot touches beyond the take-off line (foul line/plasticine indicator)',
    explanation: 'Touching beyond the front edge of the take-off board (leaving an indentation in the plasticine indicator) constitutes a foul jump and is not measured.',
    socraticHint: 'What happens if a jumper’s shoe crosses past the front edge of the take-off board?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-004',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'Which flight technique in the Long Jump is most recommended for beginner and intermediate school athletes?',
    options: [
      'The Sail technique',
      'The triple somersault technique',
      'The continuous corkscrew spin',
      'The backwards dive technique'
    ],
    correctAnswer: 'The Sail technique',
    explanation: 'The Sail technique is the simplest and most accessible flight method for beginners: after take-off, the free leg swings forward to join the take-off leg in an outstretched position before landing.',
    socraticHint: 'Which basic flight technique brings both legs forward together like a sail before landing?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-005',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'In the Hitch-Kick flight technique used by advanced long jumpers, what action do the legs perform in mid-air?',
    options: [
      'They continue a running action (cycling strides) through the air',
      'They stay completely locked in a lotus sitting position',
      'They kick sideways in swimming breaststroke style',
      'They drag behind on the sand runway'
    ],
    correctAnswer: 'They continue a running action (cycling strides) through the air',
    explanation: 'In the hitch-kick, the athlete simulates 1.5 to 2.5 running strides in the air, which counteracts forward rotational momentum and prepares the body for an optimal forward landing.',
    socraticHint: 'What running-like cycling motion do jumpers do in mid-air during the hitch-kick?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-006',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'How is the distance of a Long Jump measured by athletics field judges?',
    options: [
      'From the front edge of the take-off board to the nearest mark in the sand made by any part of the body',
      'From the start of the runway to the middle of the sand pit',
      'From the athlete’s head down to their knees in mid-air',
      'From the furthest point where the athlete’s shoe landed'
    ],
    correctAnswer: 'From the front edge of the take-off board to the nearest mark in the sand made by any part of the body',
    explanation: 'Measurement is taken perpendicularly from the front edge of the board to the closest impression left in the sand by any part of the jumper’s body or limbs.',
    socraticHint: 'Which mark in the sand pit determines the official measurement back to the board?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-007',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'Why should a long jumper avoid falling backwards onto their hands after landing in the sand pit?',
    options: [
      'Because the jump will be measured from the hand impression nearest to the board, losing distance',
      'Because touching sand with hands results in immediate disqualification',
      'Because falling backward breaks the take-off board',
      'Because hands must always remain in the jumper’s pockets'
    ],
    correctAnswer: 'Because the jump will be measured from the hand impression nearest to the board, losing distance',
    explanation: 'Since distance is measured from the nearest break in the sand to the board, a hand touching behind the feet severely reduces the recorded mark.',
    socraticHint: 'If you place your hands in the sand behind your heels, where does the judge measure from?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-008',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'What safety measure must always be observed in the Long Jump sand pit before any athlete jumps?',
    options: [
      'The sand pit must be thoroughly raked, dug loose, and checked for sharp foreign debris',
      'The sand must be soaked in slippery cooking oil',
      'Heavy concrete slabs must be placed across the landing area',
      'The pit must be left dry, hard, and unraked'
    ],
    correctAnswer: 'The sand pit must be thoroughly raked, dug loose, and checked for sharp foreign debris',
    explanation: 'Raking and turning over the sand ensures a soft, yielding landing surface that cushions joint impact and eliminates sharp stones or hazards.',
    socraticHint: 'Why is it essential to rake and soften the sand pit before someone leaps into it?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-009',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'During the Long Jump take-off, what angle of projection provides the ideal balance between forward speed and vertical lift?',
    options: [
      'Approximately 18 to 22 degrees',
      'A completely flat 0 degrees angle',
      'A straight vertical 90 degrees angle',
      'A steep 75 degrees angle'
    ],
    correctAnswer: 'Approximately 18 to 22 degrees',
    explanation: 'Biomechanically, elite long jumpers take off at an angle between 18° and 22°, preserving optimal horizontal approach velocity while gaining sufficient vertical airtime.',
    socraticHint: 'Does a long jumper launch at a low trajectory (around 20 degrees) or straight up like a high jumper?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-010',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'Why do athletes place check-marks along the runway during Long Jump practice?',
    options: [
      'To ensure consistent stride cadence so their take-off foot hits the board accurately every time',
      'To decorate the runway with colorful chalk drawings',
      'To mark places where they must stop and drink water',
      'To indicate where other competitors are forbidden to run'
    ],
    correctAnswer: 'To ensure consistent stride cadence so their take-off foot hits the board accurately every time',
    explanation: 'Check-marks allow jumpers to verify their acceleration cadence midway down the runway, ensuring they arrive on the board without adjusting stride length.',
    socraticHint: 'How do visual tape marks help a jumper hit the take-off board consistently without fouling?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-011',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'What arm movement helps generate vertical lift at the instant of take-off in Long Jump?',
    options: [
      'Driving the opposite arm aggressively upward in coordination with the lead knee drive',
      'Keeping both arms pinned tightly against the thighs',
      'Spinning both arms backwards like windmill sails',
      'Holding hands together behind the back'
    ],
    correctAnswer: 'Driving the opposite arm aggressively upward in coordination with the lead knee drive',
    explanation: 'An explosive upward arm punch elevates the body’s center of mass and coordinates with the free knee drive for maximum vertical thrust.',
    socraticHint: 'How does punching your arm upwards help lift your body into the air?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-012',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l1',
    text: 'After completing a jump and standing up in the sand pit, which direction should the jumper walk out?',
    options: [
      'Forward past the landing mark away from the take-off board',
      'Backwards towards the take-off board through their landing footprints',
      'Sideways rolling across other jumpers’ sand marks',
      'Jumping backward into the runway'
    ],
    correctAnswer: 'Forward past the landing mark away from the take-off board',
    explanation: 'Walk out forward of the landing mark. Walking backward toward the board can leave a mark in the sand behind the landing point, which officials would count against your distance!',
    socraticHint: 'Should you walk forward out of the pit or step backward into the sand near the board?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-013',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'In football, which part of the foot is most appropriate for delivering a short, accurate push pass to a nearby teammate?',
    options: [
      'The inside of the foot (instep arch)',
      'The tip of the toe',
      'The back of the heel',
      'The sole of the boot'
    ],
    correctAnswer: 'The inside of the foot (instep arch)',
    explanation: 'The inside of the foot provides the largest, flattest surface area on the boot, guaranteeing high precision and control for short-distance passing.',
    socraticHint: 'Which broad inner surface of the foot is used for accurate push passing in soccer?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-014',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'What rule must be followed by a football player executing a throw-in from the touchline?',
    options: [
      'Both feet must touch the ground on or behind the line, and the ball must be thrown with both hands from behind the head',
      'The player must kick the ball with their boots from behind the line',
      'The player must throw the ball using only one hand like a baseball',
      'The player must leap into the air off both feet while throwing'
    ],
    correctAnswer: 'Both feet must touch the ground on or behind the line, and the ball must be thrown with both hands from behind the head',
    explanation: 'Law 15 of Football dictates that at the moment of delivery, both feet must be on or behind the touchline on the ground, and the ball must be delivered from behind and over the head with both hands.',
    socraticHint: 'What are the two key rules regarding your feet and hands during a football throw-in?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-015',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'What is "trapping" or ball cushioning in football?',
    options: [
      'Absorbing the momentum of an incoming ball with the foot, thigh, or chest to bring it under immediate control',
      'Stealing the ball and hiding it in the goal net',
      'Tackling a player violently from behind',
      'Puncturing the ball with sharp studs'
    ],
    correctAnswer: 'Absorbing the momentum of an incoming ball with the foot, thigh, or chest to bring it under immediate control',
    explanation: 'Trapping (cushioning) involves giving with the ball on contact (using foot, thigh, or chest) to kill its speed and settle it into play smoothly.',
    socraticHint: 'How does an athlete gently bring a high or fast-moving ball under control?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-016',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'In Netball, what is the footwork rule regarding the landing foot after catching the ball?',
    options: [
      'The player cannot move the landing foot except to pivot on the spot; running or dragging it is a violation',
      'The player may run up to 10 meters with the ball before stopping',
      'The player must bounce the ball three times while running forward',
      'The player must slide across the court on their knees'
    ],
    correctAnswer: 'The player cannot move the landing foot except to pivot on the spot; running or dragging it is a violation',
    explanation: 'In Netball, players must establish a landing foot upon catching the ball. They may only swivel (pivot) on this foot without lifting or regrounding it before releasing the ball.',
    socraticHint: 'Can a netball player run with the ball, or must they anchor their landing foot and pivot?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-017',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'According to Netball rules, what is the minimum distance a defending player must maintain from a player holding the ball?',
    options: [
      '0.9 meters (3 feet)',
      '5 meters (16 feet)',
      '0.1 meters (touching distance)',
      '10 meters across the center circle'
    ],
    correctAnswer: '0.9 meters (3 feet)',
    explanation: 'Netball obstruction rules mandate that a defender must stand at least 0.9m (3 feet) away from the player with the ball before raising their arms to defend.',
    socraticHint: 'How far back must a defender stand from a netball opponent before defending a pass?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-018',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'Which Netball pass is pushed straight from the chest with two hands and is the most common, rapid pass in match play?',
    options: [
      'Chest pass',
      'Underarm roll pass',
      'Two-handed overhead kick',
      'Volleyball spike'
    ],
    correctAnswer: 'Chest pass',
    explanation: 'The chest pass is direct, powerful, and rapid, pushed directly from chest level with thumbs pointing downward upon release.',
    socraticHint: 'Which pass originates at chest level and travels swiftly in a straight line to a teammate?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-019',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'In Volleyball, how is the underhand pass (bump or dig) executed correctly?',
    options: [
      'Knees bent, forearms joined together creating a flat platform, contacting the ball on the lower forearms',
      'Swatting the ball downward with open palms over the face',
      'Kicking the ball over the net with bare feet',
      'Catching the ball with both hands and throwing it over'
    ],
    correctAnswer: 'Knees bent, forearms joined together creating a flat platform, contacting the ball on the lower forearms',
    explanation: 'The forearm pass (bump/dig) uses locked forearms to form a rebound platform, absorbing and redirecting fast serves or spikes toward the setter.',
    socraticHint: 'How do volleyball players lock their wrists and forearms to create a flat passing platform?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-020',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'What hand shape is formed above the forehead when performing an overhead volley (set) in Volleyball?',
    options: [
      'A soft triangle window formed by thumbs and index fingers above the forehead',
      'Two clenched fists banging together',
      'Hands flat with palms pointing down at the floor',
      'Crossing fingers tightly in a prayer pose'
    ],
    correctAnswer: 'A soft triangle window formed by thumbs and index fingers above the forehead',
    explanation: 'The setter positions hands above the forehead forming a triangular shape with thumbs and index fingers, contacting the ball softly with finger pads to loft it for a spike.',
    socraticHint: 'What shape do your thumbs and index fingers make above your forehead when setting a volleyball?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-021',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'In standard Volleyball rules, what is the maximum number of consecutive touches a team may take before returning the ball over the net?',
    options: [
      'Three touches',
      'Five touches',
      'One touch only',
      'Unlimited touches'
    ],
    correctAnswer: 'Three touches',
    explanation: 'A team has a maximum of three contacts (typically pass, set, attack/hit) to return the ball over the net to the opponent’s court (excluding a block touch).',
    socraticHint: 'How many touches (bump, set, spike) is a volleyball team allowed before sending the ball over?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-022',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'Which Netball playing positions are permitted into the goal circle to shoot for goal?',
    options: [
      'Goal Shooter (GS) and Goal Attack (GA)',
      'Wing Attack (WA) and Centre (C)',
      'Goal Keeper (GK) and Goal Defence (GD)',
      'Wing Defence (WD) and Centre (C)'
    ],
    correctAnswer: 'Goal Shooter (GS) and Goal Attack (GA)',
    explanation: 'Under Netball regulations, only the Goal Shooter (GS) and Goal Attack (GA) are authorized to enter the attacking goal circle and shoot for goals.',
    socraticHint: 'Which two attacking positions are allowed inside the shooting semi-circle in netball?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-023',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'In Volleyball, in which direction do players rotate when winning the serve back from the opposing team?',
    options: [
      'Clockwise rotation',
      'Counter-clockwise rotation',
      'Random diagonal switching',
      'Players never rotate positions in volleyball'
    ],
    correctAnswer: 'Clockwise rotation',
    explanation: 'When the receiving team wins a rally and gains the right to serve, all six players rotate one position in a clockwise direction.',
    socraticHint: 'Do volleyball players shift spots clockwise or counter-clockwise when gaining serve?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u9-024',
    subStrandId: 'substrand-g6-ca-u9',
    lessonId: 'lesson-g6-ca-u9-l2',
    text: 'Why is verbal communication and calling "Mine!" or "I got it!" essential in team sports like Volleyball and Football?',
    options: [
      'It prevents accidental collisions between teammates and ensures unambiguous responsibility for the ball',
      'It is done to distract the referee from making calls',
      'It allows players to shout insults at opponents legally',
      'It is a mandatory rule that scores two extra points'
    ],
    correctAnswer: 'It prevents accidental collisions between teammates and ensures unambiguous responsibility for the ball',
    explanation: 'Calling for the ball coordinates teammates, eliminates confusion over who plays the ball, and avoids dangerous head or limb collisions.',
    socraticHint: 'Why do teammates shout clearly when going for a ball that two people could hit?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },

  // --- Unit 10: Gymnastics, Rope Skipping, Water Safety & Sports First Aid (q-g6-ca-u10-001 to 024) ---
  {
    id: 'q-g6-ca-u10-001',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'In educational gymnastics, what is the key body alignment for performing an Arabesque balance?',
    options: [
      'Standing firmly on one leg with torso tilted slightly forward and the opposite leg extended high and straight behind',
      'Lying flat on the stomach with arms tucked under the chest',
      'Kneeling on both knees while bending sideways',
      'Balancing on both elbows with knees bent'
    ],
    correctAnswer: 'Standing firmly on one leg with torso tilted slightly forward and the opposite leg extended high and straight behind',
    explanation: 'An arabesque is a graceful single-leg balance where the supporting leg is straight, torso tilts slightly forward, and the rear leg is lifted straight behind parallel to the floor.',
    socraticHint: 'Which gymnastics balance features standing on one leg with the other leg lifted straight behind?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-002',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What geometry should be formed on the mat by the head and hands when preparing to perform a Tripod Headstand?',
    options: [
      'An equilateral triangle, with hands shoulder-width apart and the crown of the head placed forward',
      'A straight flat line where hands and head touch the same spot',
      'A tiny square with fingers touching the ears',
      'A circle drawn with chalk without hands touching the mat'
    ],
    correctAnswer: 'An equilateral triangle, with hands shoulder-width apart and the crown of the head placed forward',
    explanation: 'The head and two palms must form a wide equilateral triangle base; placing hands in line with the head creates an unstable tipping hazard.',
    socraticHint: 'What stable geometric shape must your head and two palms form on the gymnastics mat?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-003',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What critical safety action must a gymnast take with their head when executing a forward roll?',
    options: [
      'Tuck the chin firmly against the chest so the roll lands smoothly on the upper back and shoulders',
      'Tilt the head backward so the forehead hits the mat first',
      'Keep the neck rigid and land directly on the crown of the head',
      'Turn the head sideways and land on the ear'
    ],
    correctAnswer: 'Tuck the chin firmly against the chest so the roll lands smoothly on the upper back and shoulders',
    explanation: 'Tucking the chin to the chest curves the cervical spine, preventing dangerous axial impact onto the neck or crown of the head and ensuring a smooth shoulder roll.',
    socraticHint: 'Where must you tuck your chin during a forward roll to protect your neck?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-004',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What is a "V-Sit" balance in floor gymnastics?',
    options: [
      'Balancing on the buttocks with straight legs raised and torso reclined, forming a "V" shape',
      'Sitting with legs crossed in a meditation position',
      'Standing on the tiptoes with arms shaped like the letter V',
      'Lying on the stomach with arms spread wide'
    ],
    correctAnswer: 'Balancing on the buttocks with straight legs raised and torso reclined, forming a "V" shape',
    explanation: 'In a V-sit, the gymnast balances on the buttocks with thighs and torso elevated off the floor, engaging core abdominal muscles to form a crisp V shape.',
    socraticHint: 'How do your legs and upper body form the letter V while balancing on your seat?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-005',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What is the role of a "spotter" during gymnastics vaulting and balance routines?',
    options: [
      'To provide physical safety assistance, guidance, and catch or cushion the gymnast if they lose balance',
      'To shine spotlights on the performer from the audience',
      'To record videos for social media without touching the gymnast',
      'To clean the chalk off the floor between jumps'
    ],
    correctAnswer: 'To provide physical safety assistance, guidance, and catch or cushion the gymnast if they lose balance',
    explanation: 'Spotters are trained partners or teachers who stand close to support, guide body alignment, and physically prevent hazardous falls during apparatus routines.',
    socraticHint: 'How does a trained partner standing by a gymnast protect them from falling?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-006',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What is a cartwheel in educational gymnastics?',
    options: [
      'A sideways rotational weight transfer where hands and feet contact the floor sequentially in a straight line: hand-hand-foot-foot',
      'Rolling inside a large bicycle tire across the hall',
      'A high vertical jump with feet touching the hands in front',
      'Sliding along a gymnastics bench on the stomach'
    ],
    correctAnswer: 'A sideways rotational weight transfer where hands and feet contact the floor sequentially in a straight line: hand-hand-foot-foot',
    explanation: 'A cartwheel is a sideways dynamic movement with limbs fully extended, traveling smoothly along a line in the sequence: hand, hand, foot, foot.',
    socraticHint: 'Which rotational floor skill moves sideways like spokes on a turning wheel?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-007',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'How should a gymnast land when dismounting from a vaulting box or bench ("sticking the landing")?',
    options: [
      'Landing on the balls of both feet, bending knees to absorb shock, with arms outstretched for balance without taking extra steps',
      'Landing on stiff, locked knees and falling straight over',
      'Landing on one foot and hopping continuously across the mat',
      'Landing on the knees directly onto hard floor'
    ],
    correctAnswer: 'Landing on the balls of both feet, bending knees to absorb shock, with arms outstretched for balance without taking extra steps',
    explanation: 'Sticking a landing requires absorbing downward kinetic force through flexed knees and ankles, keeping chest upright and arms extended, with zero rebound steps.',
    socraticHint: 'How does bending your knees and stabilizing your arms help you stick a clean, safe landing?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-008',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'Why are crash mats placed around vaulting boxes and balance beams in school gymnastics?',
    options: [
      'To provide shock absorption and protect students from joint fractures and head injuries in case of falls',
      'To give students a comfortable bed to take afternoon naps',
      'To prevent the wooden vaulting box from sliding',
      'Because wooden gym floors must never touch bare shoes'
    ],
    correctAnswer: 'To provide shock absorption and protect students from joint fractures and head injuries in case of falls',
    explanation: 'Safety mats dissipate impact energy, offering crucial shock absorption to protect young joints, spine, and head from severe injury during dismounts or unexpected falls.',
    socraticHint: 'Why must soft cushioned mats surround all gymnastics climbing and jumping equipment?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-009',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What is a "log roll" in introductory gymnastics floor work?',
    options: [
      'Lying flat with arms extended straight overhead and legs together, rolling sideways along the floor like a wooden log',
      'Carrying heavy wooden tree logs across the playground',
      'Rolling while curled into a tight round ball like a hedgehog',
      'Jumping up and down on a timber beam'
    ],
    correctAnswer: 'Lying flat with arms extended straight overhead and legs together, rolling sideways along the floor like a wooden log',
    explanation: 'A log roll (pencil roll) involves maintaining a fully extended, tight body alignment with toes pointed and arms stretched overhead while rolling laterally across mats.',
    socraticHint: 'Which roll keeps the entire body stretched long and stiff like a rolling log?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-010',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'What physical fitness component is primarily enhanced by holding static balances like scales and headstands?',
    options: [
      'Core stability, isometric muscular strength, and body balance',
      'Auditory hearing frequency range',
      'Digestive metabolism rate',
      'Speed of blinking eyelashes'
    ],
    correctAnswer: 'Core stability, isometric muscular strength, and body balance',
    explanation: 'Holding static gymnastic balances engages deep stabilizing postural muscles (core, glutes, shoulders), developing exceptional isometric strength and neuromuscular control.',
    socraticHint: 'What happens to your core stomach muscles and balance when you hold a still gymnastic pose?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-011',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'During a backward roll, how should the hands be positioned as the body rolls onto the shoulders?',
    options: [
      'Placed beside the ears with palms facing up toward the ceiling, pushing firmly against the mat to relieve neck pressure',
      'Tucked under the knees holding the shins tightly',
      'Stretched straight out to the sides like airplane wings',
      'Interlocked behind the head pulling on the hair'
    ],
    correctAnswer: 'Placed beside the ears with palms facing up toward the ceiling, pushing firmly against the mat to relieve neck pressure',
    explanation: 'Placing hands next to the ears with palms facing upward allows the gymnast to push forcefully against the mat, lifting the head and neck safely over.',
    socraticHint: 'How do placing palms by your ears help you push your weight over in a backward roll?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-012',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l1',
    text: 'Why is a warm-up with joint mobility and dynamic stretching essential before gymnastics practice?',
    options: [
      'It increases range of motion in wrists, spine, and ankles, preventing muscle tears and joint sprains',
      'It cools the muscles down so they don’t get too warm',
      'It ensures gymnasts fall asleep quickly after class',
      'Gymnastics regulations do not require warm-up'
    ],
    correctAnswer: 'It increases range of motion in wrists, spine, and ankles, preventing muscle tears and joint sprains',
    explanation: 'Gymnastics places significant stress on wrists, spine, shoulders, and ankles; thorough mobility drills warm synovial fluid and prepare tissues for intense bending and impact.',
    socraticHint: 'Why must wrists, ankles, and backs be stretched and warmed up before tumbling?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-013',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What is the correct jumping mechanics during a basic rope skipping bounce?',
    options: [
      'Jumping lightly on the balls of the feet with knees slightly bent, clearing the rope by only 2 to 3 cm',
      'Stomping heavily on the heels, jumping half a meter high on every turn',
      'Kicking both feet high toward the chest while landing flat-footed',
      'Jumping on one knee while dragging the other leg'
    ],
    correctAnswer: 'Jumping lightly on the balls of the feet with knees slightly bent, clearing the rope by only 2 to 3 cm',
    explanation: 'Efficient skipping requires minimal vertical elevation (just enough to clear the rope, ~2-3 cm) landing softly on the balls of the feet with spring-like ankle elasticity.',
    socraticHint: 'How high should you jump off the ground when skipping rope for speed and stamina?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-014',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What arm and wrist technique should be used to turn the jump rope efficiently?',
    options: [
      'Turning the rope using circular wrist motions while keeping elbows tucked close to the ribs',
      'Swinging the entire arms from the shoulders in massive circles',
      'Holding hands above the head and turning the rope like a helicopter blade',
      'Tying the rope to the ankles so hands do not have to move'
    ],
    correctAnswer: 'Turning the rope using circular wrist motions while keeping elbows tucked close to the ribs',
    explanation: 'Rope turning speed comes from quick wrist revolutions with elbows close to the body, conserving upper-body energy and maintaining steady rope arc.',
    socraticHint: 'Should you turn a skipping rope with big shoulder swings or small, quick wrist circles?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-015',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'In swimming, what leg kick technique is used in the Freestyle (Front Crawl) stroke?',
    options: [
      'The Flutter kick (continuous, alternating up-and-down leg kicks originating from the hips)',
      'The Frog kick with knees spread wide',
      'The Dolphin kick with both legs strapped together',
      'The Bicycle kick paddling in circles'
    ],
    correctAnswer: 'The Flutter kick (continuous, alternating up-and-down leg kicks originating from the hips)',
    explanation: 'The flutter kick is the rhythmic, alternating upward and downward whip of straight legs powered from the hips with relaxed, floppy ankles.',
    socraticHint: 'Which alternating up-and-down kick powers front crawl swimming?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-016',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'How should a swimmer breathe while performing the Freestyle stroke?',
    options: [
      'Turning the head smoothly to the side into the bow wave created by the head, with one goggle in the water',
      'Lifting the entire head straight up out of the water facing forward',
      'Swallowing water and breathing through the nose underwater',
      'Holding breath for the entire duration of the swim without breathing'
    ],
    correctAnswer: 'Turning the head smoothly to the side into the bow wave created by the head, with one goggle in the water',
    explanation: 'Bilateral side breathing involves rolling the head to the side as the arm recovers, keeping one eye submerged to preserve streamlined body horizontal alignment.',
    socraticHint: 'Should a freestyle swimmer lift their head straight forward or rotate it to the side to breathe?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-017',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What is the most fundamental water safety rule when swimming in pools, rivers, or the ocean?',
    options: [
      'Never swim alone; always swim with a buddy under adult or lifeguard supervision',
      'Always swim in deep water during heavy storms',
      'Dive headfirst into cloudy, unknown shallow water',
      'Eat a five-course meal immediately before diving in'
    ],
    correctAnswer: 'Never swim alone; always swim with a buddy under adult or lifeguard supervision',
    explanation: 'The "buddy system" and adult supervision are paramount; even strong swimmers can experience unexpected cramps or distress requiring immediate rescue.',
    socraticHint: 'Why is swimming completely alone without any supervision so dangerous?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-018',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'If you see someone struggling and drowning in deep water, what should you do first instead of jumping in yourself?',
    options: [
      'Use the "Reach or Throw, Don’t Go" principle: extend a long pole, branch, or throw a buoyant floating aid while shouting for adult help',
      'Jump in directly without any flotation equipment',
      'Walk away quietly and pretend you did not notice',
      'Throw heavy stones into the water to make splashes'
    ],
    correctAnswer: 'Use the "Reach or Throw, Don’t Go" principle: extend a long pole, branch, or throw a buoyant floating aid while shouting for adult help',
    explanation: 'A panicking drowning victim can easily pull an untrained rescuer under. The safest rescue is from the bank using reaching aids (pole/towel) or throwing a buoy/rope.',
    socraticHint: 'Why is reaching with a pole or throwing a float safer than jumping in yourself?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-019',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What does the acronym R.I.C.E. stand for in first aid management of acute sports sprains and strains?',
    options: [
      'Rest, Ice, Compression, Elevation',
      'Run, Ingest food, Continue playing, Exercise',
      'Rub, Inject medicine, Cold water, Exit',
      'Rotate, Immobilize, Check, Energize'
    ],
    correctAnswer: 'Rest, Ice, Compression, Elevation',
    explanation: 'R.I.C.E. is the gold-standard protocol for soft tissue sports injuries: Rest (prevent further damage), Ice (reduce swelling), Compression (support and limit effusion), and Elevation (drain interstitial fluids).',
    socraticHint: 'Recall what the four letters R-I-C-E represent in injury care.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-020',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'Why should ice never be applied directly onto bare skin when treating a sports sprain?',
    options: [
      'Direct ice application can cause ice burns and frostbite tissue damage; it must always be wrapped in a cloth or towel',
      'Because ice will melt too quickly if it touches skin',
      'Because ice makes sprains swell larger',
      'Because skin will turn permanently blue'
    ],
    correctAnswer: 'Direct ice application can cause ice burns and frostbite tissue damage; it must always be wrapped in a cloth or towel',
    explanation: 'Placing raw ice directly against skin constricts capillaries excessively and can burn epidermal tissues; a towel or barrier cloth ensures safe cold therapy.',
    socraticHint: 'Why must you wrap an ice pack in a towel before placing it on injured skin?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-021',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'When applying an elastic compression bandage to a sprained ankle, how can you tell if the bandage is wrapped too tightly?',
    options: [
      'The toes become numb, cold, turn pale or bluish, or the athlete feels intense throbbing pain',
      'The bandage falls off when the student walks',
      'The bandage turns yellow in color',
      'The athlete feels cool and comfortable'
    ],
    correctAnswer: 'The toes become numb, cold, turn pale or bluish, or the athlete feels intense throbbing pain',
    explanation: 'Numbness, tingling, coldness, and loss of color in extremities indicate that circulation has been compromised, requiring immediate loosening of the bandage.',
    socraticHint: 'What happens to toes if blood circulation is cut off by a bandage wrapped too tightly?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-022',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'Why is an injured limb elevated above heart level during first aid treatment?',
    options: [
      'To allow gravity to assist venous blood and lymphatic fluid drainage away from the injury, reducing swelling',
      'To make it easier for people to take photographs of the injury',
      'To stop the heart from beating too quickly',
      'To stretch the torn ligaments back into place'
    ],
    correctAnswer: 'To allow gravity to assist venous blood and lymphatic fluid drainage away from the injury, reducing swelling',
    explanation: 'Elevating the injured limb above heart level uses gravity to facilitate fluid drainage, markedly decreasing localized edema, throbbing, and inflammation.',
    socraticHint: 'How does raising an injured foot above the heart help drain fluid away from a swollen joint?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-023',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What is the correct first aid response if an athlete collapses from heat exhaustion on a hot sports field?',
    options: [
      'Move them to a cool shaded area, loosen tight clothing, fan them, elevate legs slightly, and give cool water with electrolytes in sips',
      'Force them to run another lap to sweat out the heat',
      'Wrap them in thick woolen blankets in direct sunlight',
      'Give them hot tea and spicy food to eat immediately'
    ],
    correctAnswer: 'Move them to a cool shaded area, loosen tight clothing, fan them, elevate legs slightly, and give cool water with electrolytes in sips',
    explanation: 'Heat exhaustion requires rapid cooling: moving to shade, active fanning, loosening clothing, and rehydrating with small sips of cool electrolyte water.',
    socraticHint: 'How do you cool down and rehydrate a student who collapses from overheating on the field?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-creative-g6'
  },
  {
    id: 'q-g6-ca-u10-024',
    subStrandId: 'substrand-g6-ca-u10',
    lessonId: 'lesson-g6-ca-u10-l2',
    text: 'What is the Recovery Position in first aid, and why is it used for an unconscious breathing athlete?',
    options: [
      'Placing the person on their side with airway tilted open to prevent the tongue or vomit from obstructing the throat',
      'Laying the person flat on their face with hands tied behind back',
      'Sitting the person upright in a chair with head tilted down',
      'Standing the person against a wall to test their balance'
    ],
    correctAnswer: 'Placing the person on their side with airway tilted open to prevent the tongue or vomit from obstructing the throat',
    explanation: 'The recovery position keeps an unconscious, breathing person safely on their side with head tilted back, ensuring saliva, tongue, or vomit cannot choke or block the airway.',
    socraticHint: 'Why is an unconscious breathing person placed on their side with their head tilted slightly back?',
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
console.log(`Added ${qCount} questions for Units 9 & 10.`);

// Update gameWorld totalMissions
const world = db.gameWorlds.find(w => w.id === 'world-creative-studio');
if (world) {
  world.totalMissions = 58;
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 5 to cbe_database.json!');
