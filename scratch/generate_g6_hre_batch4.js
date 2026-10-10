/**
 * Grade 6 Hindu Religious Education (HRE) - Batch 4 Generator
 * Content: Units 7 & 8 (Ashtanga Yoga Basics & Mental Focus; Vasudhaiva Kutumbakam & Prakriti Ecology)
 * Missions: Orders 161, 162, 163, 164 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-hre-u7-001 to q-g6-hre-u8-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 HRE Batch 4 (Units 7 & 8) ---');

// 1. Units 7 & 8 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-hre-u7',
    strandId: 'strand-g6-hre-virtues',
    learningAreaId: 'la-hre-g6',
    title: 'Ashtanga Yoga Basics: Asanas, Pranayama & Mental Concentration (Dharana)',
    name: 'Ashtanga Yoga Basics: Asanas, Pranayama & Mental Concentration (Dharana)',
    description: 'Foundations of classical Ashtanga Yoga codified by Sage Patanjali: Overview of the eight limbs (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi); foundational Asanas (physical postures) promoting spinal alignment, neuromuscular balance, balance, and flexibility (Tadasana / Mountain pose, Vrikshasana / Tree pose, Padmasana / Lotus pose, Bhujangasana / Cobra pose); Pranayama (regulation of vital life-force breath) through calming techniques like Nadi Shodhana / Anuloma Viloma (alternate nostril breathing) and Bhramari (humming bee breath); Pratyahara (sensory withdrawal from digital overstimulation) and Dharana (one-pointed mental concentration) to boost memory, focus, and emotional equilibrium during academic studies.',
    cbeCompetency: 'Holistic health, mindful breathing, physical balance, and cognitive concentration',
    estimatedMinutes: 30,
    order: 7,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-hre-u8',
    strandId: 'strand-g6-hre-virtues',
    learningAreaId: 'la-hre-g6',
    title: 'Vasudhaiva Kutumbakam & Environmental Stewardship: Prakriti, Sacred Flora & Fauna',
    name: 'Vasudhaiva Kutumbakam & Environmental Stewardship: Prakriti, Sacred Flora & Fauna',
    description: 'The Vedic ecological worldview uniting humanity with Mother Nature (Prakriti): The ancient philosophy of "Vasudhaiva Kutumbakam" (the entire earth is one single sacred family - Maha Upanishad 6.71-73); viewing Mother Earth (Bhu Mata / Prithvi) as a living, sacred entity nurtured by Paramatma; the Pancha Mahabhuta (Five Great Elements: Prithvi / Earth, Jala / Water, Agni / Fire, Vayu / Air, and Akasha / Space); reverence for sacred flora (Tulsi plant for oxygen and immunity, Peepal / Bodhi tree for 24-hour oxygen, Banyan / Vatavriksha for shelter, Neem for antibacterial purification); sacred fauna and animal protection through Ahimsa; Gau Sewa (reverence for the cow as a symbol of selfless giving and gentle motherhood); and active participation in Kenyan reforestation, clean water initiatives, and wildlife conservation.',
    cbeCompetency: 'Environmental consciousness, global citizenship, animal compassion, and ecological ethics',
    estimatedMinutes: 30,
    order: 8,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-hre-u7-l1',
    subStrandId: 'substrand-g6-hre-u7',
    title: 'Ashtanga Yoga: The Eight Limbs & Foundational Asanas for Wellness',
    content: 'Yoga is an ancient holistic science of physical, mental, and spiritual harmony codified by Sage Patanjali in the Yoga Sutras.\n\n1. The Eight Limbs of Ashtanga Yoga:\n- 1) Yama (Universal social ethics: Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha).\n- 2) Niyama (Personal observances: Shaucha, Santosha, Tapas, Svadhyaya, Ishvara Pranidhana).\n- 3) Asana (Steady, comfortable physical postures).\n- 4) Pranayama (Breath control and vital life-force regulation).\n- 5) Pratyahara (Withdrawal of senses from external distractions).\n- 6) Dharana (One-pointed concentration).\n- 7) Dhyana (Sustained meditation).\n- 8) Samadhi (Superconscious union with Paramatma).\n\n2. The Purpose of Asanas:\n- Patanjali defines Asana: "Sthira-sukham asanam" (A posture should be steady and comfortable).\n- Asanas strengthen the muscles, keep the spine supple, tone internal organs, and calm the nervous system.\n\n3. Core Asanas for Student Life:\n- Tadasana (Mountain Pose): Teaches erect posture, balance, and deep centered breathing.\n- Vrikshasana (Tree Pose): Cultivates single-point physical balance, patience, and mental concentration.\n- Padmasana (Lotus Pose): The classical cross-legged sitting posture for study and meditation that stabilizes the spine.\n- Bhujangasana (Cobra Pose): Opens the chest, improves lung capacity, and counters poor posture from hunching over desks.',
    didYouKnow: 'The word "Yoga" originates from the Sanskrit root "Yuj", meaning to yoke, unite, or join the individual soul (Jivatman) with the Supreme Soul (Paramatman)!',
    kenyanContext: 'In Kenya, International Day of Yoga (June 21st) is celebrated in schools and parks across Nairobi, Kisumu, and Mombasa, bringing together learners of all communities for physical fitness and mental well-being.',
    order: 13,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u7-l2',
    subStrandId: 'substrand-g6-hre-u7',
    title: 'Pranayama (Breath Regulation) & Dharana (Mental Concentration)',
    content: 'The mind and breath are intimately connected: when the mind is agitated, breathing becomes fast and shallow; when breath is slow and rhythmic, the mind becomes tranquil.\n\n1. Pranayama (Life-Force Regulation):\n- "Prana" (vital life energy) + "Ayama" (conscious extension or control).\n- Nadi Shodhana / Anuloma Viloma (Alternate Nostril Breathing): Inhaling through one nostril, pausing gently, and exhaling through the other nostril. It balances the right (solar/active) and left (lunar/calm) hemispheres of the brain, easing test anxiety.\n- Bhramari Pranayama (Humming Bee Breath): Inhaling deeply and exhaling while producing a gentle humming sound like a bee with closed eyes and ears. The gentle cranial vibration soothes anger, releases headaches, and induces deep mental tranquility.\n\n2. Pratyahara (Sensory Discipline in the Digital Age):\n- Withdrawing attention from smartphone notifications, social media pings, and noisy surroundings to rest the nervous system.\n\n3. Dharana (One-Pointed Concentration):\n- Fixing the mind steadily upon a single focal point (such as the breath, an image of the Aum symbol, or a math problem).\n- Regular Dharana practice strengthens working memory, increases attention span, and prevents mind-wandering during classroom learning.',
    didYouKnow: 'Neuroscientists confirm that practicing 5 minutes of slow Pranayama breathing activates the vagus nerve, immediately shifting the nervous system from stressful fight-or-flight into calm rest-and-digest mode!',
    kenyanContext: 'Kenyan teachers encourage learners to practice three rounds of calming deep breathing (Pranayama) before starting national exam papers to clear their minds and dissolve anxiety.',
    order: 14,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u8-l1',
    subStrandId: 'substrand-g6-hre-u8',
    title: 'Vasudhaiva Kutumbakam & Prakriti: Nature as Sacred Cosmic Mother',
    content: 'Hindu philosophy views creation not as an inert object for human exploitation, but as a living divine family.\n\n1. Vasudhaiva Kutumbakam (The World is One Family):\n- The Maha Upanishad (6.71-73) states:\n  "Ayam nijah paro veti ganana laghu-chetasam;\n   Udara-charitanam tu vasudhaiva kutumbakam."\n  Meaning: "To small minds belong thoughts of: ‘This person is mine, that one is a stranger.’ But to those of noble character, the entire earth is their single family."\n- Teaches universal empathy, welcoming strangers, and treating all people, cultures, and species with familial warmth.\n\n2. Prakriti as Bhu Mata (Mother Earth):\n- The Prithvi Sukta in the Atharva Veda declares: "Mata Bhumih Putro Aham Prithivyah" (The Earth is my Mother, and I am her child).\n- Because the earth provides air, water, grains, fruits, and medicine, humans must treat her with tender filial reverence, never polluting or plundering her resources.\n\n3. The Pancha Mahabhuta (Five Great Elements):\n- All creation is woven from five sacred building blocks: Prithvi (Earth), Jala (Water), Agni (Fire), Vayu (Air), and Akasha (Space/Ether).\n- Preserving the purity of rivers, air, and forests is an act of spiritual worship.',
    didYouKnow: 'The motto of India’s G20 Presidency, "One Earth, One Family, One Future", was drawn directly from the ancient Sanskrit principle of Vasudhaiva Kutumbakam!',
    kenyanContext: 'Kenya’s national philosophy of "Harambee" (pulling together in unity) deeply reflects the spirit of Vasudhaiva Kutumbakam, uniting over 40 ethnic communities in shared national brotherhood.',
    order: 15,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u8-l2',
    subStrandId: 'substrand-g6-hre-u8',
    title: 'Sacred Flora, Fauna & Gau Sewa: Environmental Compassion in Kenya',
    content: 'Reverence for nature expresses itself in practical conservation and compassionate treatment of plants and animals.\n\n1. Sacred Plants (Flora) and their Ecological Benefits:\n- Tulsi (Holy Basil): Kept in Hindu courtyards; emits oxygen, purifies ambient air, repels mosquitoes, and serves as an adaptogenic herbal remedy for coughs and colds.\n- Peepal (Ashvattha / Sacred Fig): Revered as the tree of wisdom under which meditation flourishes; releases vital oxygen continuously throughout day and night.\n- Banyan (Vatavriksha): Symbolizes immortality and divine shelter with its sprawling aerial roots, providing habitats for hundreds of bird species.\n- Neem: Famed as the "village pharmacy" for its natural antibacterial, antifungal, and pest-repelling properties.\n\n2. Sacred Animals (Fauna) & Ahimsa:\n- Hinduism teaches that Paramatma manifests in animal life: Lord Vishnu took incarnations as a fish (Matsya), tortoise (Kurma), boar (Varaha), and lion-man (Narasimha).\n- Deities travel on animal vahanas (Lord Shiva on Nandi the bull, Goddess Durga on the lion, Lord Ganesha on the mouse), teaching respect for all creatures.\n\n3. Gau Sewa (Reverence for the Cow):\n- The cow (Kamadhenu) is revered as Gomata (Mother Cow) because she feeds all humanity with life-giving milk, butter, and ghee while taking only grass and water.\n- Gau Sewa means caring tenderly for cows, symbolizing unconditional maternal kindness and vegetarian compassion.\n\n4. Environmental Action in Kenya:\n- Kenyan Hindu youth participate actively in planting indigenous trees with the Green Belt Movement, cleaning the Nairobi River, and supporting elephant and wildlife sanctuaries.',
    didYouKnow: 'Renowned Kenyan Nobel laureate Wangari Maathai often praised traditional cultural reverence for trees, noting that treating forests as sacred preserves biodiversity for future generations!',
    kenyanContext: 'Hindu temples in Kenya run animal welfare societies and gaushalas (cattle sanctuaries), partnering with the KSPCA to rescue and treat mistreated animals.',
    order: 16,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 161, 162, 163, 164 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-hre-u7-m1',
    worldId: 'world-faith-values',
    title: 'Mission 161: Posture of Harmony – Ashtanga Yoga & Foundational Asanas',
    description: 'Explore the eight limbs of Sage Patanjali, discover "Sthira-sukham asanam", and master postures like Tadasana, Vrikshasana, and Bhujangasana for health.',
    order: 161,
    orderIndex: 161,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-ashtanga-asanas',
    badge: 'badge-g6-hre-ashtanga-asanas',
    lessonId: 'lesson-g6-hre-u7-l1',
    questionIds: [
      'q-g6-hre-u7-001', 'q-g6-hre-u7-002', 'q-g6-hre-u7-003', 'q-g6-hre-u7-004',
      'q-g6-hre-u7-005', 'q-g6-hre-u7-006', 'q-g6-hre-u7-007', 'q-g6-hre-u7-008',
      'q-g6-hre-u7-009', 'q-g6-hre-u7-010', 'q-g6-hre-u7-011', 'q-g6-hre-u7-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u7-m2',
    worldId: 'world-faith-values',
    title: 'Mission 162: The Breath of Calm – Pranayama, Digital Discipline & Dharana',
    description: 'Practice Nadi Shodhana and Bhramari breathing to dissolve anxiety, disconnect from digital overload through Pratyahara, and sharpen focus with Dharana.',
    order: 162,
    orderIndex: 162,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-pranayama-focus',
    badge: 'badge-g6-hre-pranayama-focus',
    lessonId: 'lesson-g6-hre-u7-l2',
    questionIds: [
      'q-g6-hre-u7-013', 'q-g6-hre-u7-014', 'q-g6-hre-u7-015', 'q-g6-hre-u7-016',
      'q-g6-hre-u7-017', 'q-g6-hre-u7-018', 'q-g6-hre-u7-019', 'q-g6-hre-u7-020',
      'q-g6-hre-u7-021', 'q-g6-hre-u7-022', 'q-g6-hre-u7-023', 'q-g6-hre-u7-024'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u8-m1',
    worldId: 'world-faith-values',
    title: 'Mission 163: Earth as Family – Vasudhaiva Kutumbakam & The 5 Elements',
    description: 'Internalize the global family ideal of Vasudhaiva Kutumbakam, honor Mother Earth (Bhu Mata), and safeguard the Pancha Mahabhuta elements.',
    order: 163,
    orderIndex: 163,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-vasudhaiva-kutumbakam',
    badge: 'badge-g6-hre-vasudhaiva-kutumbakam',
    lessonId: 'lesson-g6-hre-u8-l1',
    questionIds: [
      'q-g6-hre-u8-001', 'q-g6-hre-u8-002', 'q-g6-hre-u8-003', 'q-g6-hre-u8-004',
      'q-g6-hre-u8-005', 'q-g6-hre-u8-006', 'q-g6-hre-u8-007', 'q-g6-hre-u8-008',
      'q-g6-hre-u8-009', 'q-g6-hre-u8-010', 'q-g6-hre-u8-011', 'q-g6-hre-u8-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u8-m2',
    worldId: 'world-faith-values',
    title: 'Mission 164: Guardians of the Green – Sacred Trees, Gau Sewa & Ecology',
    description: 'Protect sacred trees (Tulsi, Peepal, Banyan, Neem), practice Ahimsa and Gau Sewa toward animals, and take active part in Kenyan reforestation drives.',
    order: 164,
    orderIndex: 164,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-prakriti-steward',
    badge: 'badge-g6-hre-prakriti-steward',
    lessonId: 'lesson-g6-hre-u8-l2',
    questionIds: [
      'q-g6-hre-u8-013', 'q-g6-hre-u8-014', 'q-g6-hre-u8-015', 'q-g6-hre-u8-016',
      'q-g6-hre-u8-017', 'q-g6-hre-u8-018', 'q-g6-hre-u8-019', 'q-g6-hre-u8-020',
      'q-g6-hre-u8-021', 'q-g6-hre-u8-022', 'q-g6-hre-u8-023', 'q-g6-hre-u8-024'
    ],
    learningAreaId: 'la-hre-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 7 Questions (q-g6-hre-u7-001 to q-g6-hre-u7-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u7-001',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'What does the Sanskrit word "Ashtanga" literally mean in Ashtanga Yoga?',
    options: ['Eight Limbs (Ashta = eight, Anga = limbs)', 'Seven Chakras', 'Five Breaths', 'Twelve Postures'],
    correctAnswer: 'Eight Limbs (Ashta = eight, Anga = limbs)',
    explanation: 'Ashtanga means eight-limbed ("Ashta" = eight, "Anga" = limbs or steps), referring to the eight systematic stages of Yoga outlined by Sage Patanjali.',
    socraticHint: 'Translate "Ashta" (eight) and "Anga" (limbs/branches).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-002',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'Which ancient sage codified the classical philosophy and practices of Yoga in the Yoga Sutras?',
    options: ['Sage Patanjali', 'Sage Valmiki', 'Sage Vyasa', 'Sage Bharata'],
    correctAnswer: 'Sage Patanjali',
    explanation: 'Sage Patanjali compiled the 196 aphorisms known as the Yoga Sutras, establishing the authoritative framework for Raja / Ashtanga Yoga.',
    socraticHint: 'Identify the revered sage known as the father of classical Yoga philosophy.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-003',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'Which limb of Ashtanga Yoga constitutes the third step, focusing on physical postures?',
    options: ['Asana', 'Pranayama', 'Yama', 'Dharana'],
    correctAnswer: 'Asana',
    explanation: 'Asana is the third limb of Ashtanga Yoga, following Yama (social ethics) and Niyama (personal disciplines), preparing the physical vessel for meditation.',
    socraticHint: 'Which limb refers specifically to bodily postures and physical alignment?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-004',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'How does Sage Patanjali define Asana in Yoga Sutra 2.46: "Sthira-sukham asanam"?',
    options: [
      'A posture should be steady (stable) and comfortable (joyful)',
      'A posture must cause extreme pain and suffering',
      'A posture should only be done while standing on one foot',
      'A posture must be held for five days continuously'
    ],
    correctAnswer: 'A posture should be steady (stable) and comfortable (joyful)',
    explanation: '"Sthira" means steady and firm, and "Sukham" means comfortable, relaxed, and joyful; true Asana is never violent straining, but poised stability.',
    socraticHint: 'Translate "Sthira" (steady) and "Sukham" (comfortable/pleasant).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-005',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'Which foundational standing posture, known as Mountain Pose, teaches erect posture, grounded balance, and spinal alignment?',
    options: ['Tadasana', 'Padmasana', 'Shavasana', 'Matsyasana'],
    correctAnswer: 'Tadasana',
    explanation: 'Tadasana ("Tada" = mountain) is the foundational standing posture where one stands firm and tall like a mountain, aligning the feet, hips, spine, and head.',
    socraticHint: 'Which posture is named after a sturdy mountain?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-006',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'Which standing balance posture involves standing on one leg with the opposite foot placed against the inner thigh and hands in Namaste?',
    options: ['Vrikshasana (Tree Pose)', 'Bhujangasana', 'Dhanurasana', 'Halasana'],
    correctAnswer: 'Vrikshasana (Tree Pose)',
    explanation: 'Vrikshasana ("Vriksha" = tree) mimics the poise of a deep-rooted tree, strengthening leg muscles and training one-pointed concentration (Drishti).',
    socraticHint: 'Which pose is named after a tree balancing gracefully on roots?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-007',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'What is Padmasana, commonly used for meditation and quiet breathing practice?',
    options: ['The Lotus Pose', 'The Eagle Pose', 'The Bow Pose', 'The Wheel Pose'],
    correctAnswer: 'The Lotus Pose',
    explanation: 'Padmasana ("Padma" = lotus) is the cross-legged sitting posture where each foot rests on the opposite thigh, keeping the spine naturally erect and mind calm.',
    socraticHint: 'Which pose shares its name with the sacred lotus flower?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-008',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'Which prone backward-bending posture is known as the Cobra Pose (Bhujangasana)?',
    options: [
      'Lying on the stomach and lifting the chest up with palms flat, expanding the lungs and arching the upper spine',
      'Balancing on the head with legs in the air',
      'Sitting with legs stretched forward touching the toes',
      'Lying flat on the back completely motionless'
    ],
    correctAnswer: 'Lying on the stomach and lifting the chest up with palms flat, expanding the lungs and arching the upper spine',
    explanation: 'Bhujangasana ("Bhujanga" = cobra serpent) strengthens spinal extensor muscles, expands lung capacity, and relieves stiffness from long hours of sitting in school desks.',
    socraticHint: 'Which pose mimics a cobra raising its hood off the ground?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-009',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'On which date is the International Day of Yoga celebrated worldwide, recognized by the United Nations and observed in Kenya?',
    options: ['June 21st', 'December 12th', 'January 1st', 'October 20th'],
    correctAnswer: 'June 21st',
    explanation: 'The United Nations declared June 21st (the Summer Solstice) as International Yoga Day, recognized across more than 175 countries including Kenya.',
    socraticHint: 'Which solstice day in June marks World Yoga Day?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-010',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'How does regular practice of Asanas support a learner’s physical health in school?',
    options: [
      'It corrects poor hunching posture, prevents spinal stiffness, enhances lung capacity, and boosts blood circulation',
      'It eliminates the need to eat nutritious food',
      'It makes human bones made of iron',
      'It cures all illnesses in five seconds'
    ],
    correctAnswer: 'It corrects poor hunching posture, prevents spinal stiffness, enhances lung capacity, and boosts blood circulation',
    explanation: 'Asanas counteract the fatigue and slouching of desk-bound school hours, improving oxygenation to the brain and enhancing vitality.',
    socraticHint: 'What are the physiological benefits of stretching, posture correction, and breathing in Asanas?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-011',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'What is the concluding resting posture in Yoga, known as Corpse Pose, where the body relaxes completely to integrate benefits?',
    options: ['Shavasana', 'Virasana', 'Sirsasana', 'Chakrasana'],
    correctAnswer: 'Shavasana',
    explanation: 'Shavasana is the conscious relaxation pose practiced at the end of an Asana session, allowing the heartbeat, nervous system, and muscles to return to calm equilibrium.',
    socraticHint: 'Which pose involves lying still on the back in conscious deep relaxation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-012',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l1',
    text: 'What ancient sun salutation sequence combines twelve coordinated Asanas with mindful breathing to invigorate the whole body?',
    options: ['Surya Namaskar', 'Chandra Bhedana', 'Yoga Nidra', 'Kriyashakti'],
    correctAnswer: 'Surya Namaskar',
    explanation: 'Surya Namaskar (Sun Salutation) is a dynamic twelve-step sequence of flowing postures honoring the Sun as the giver of light and life, warming all muscle groups.',
    socraticHint: 'Which popular twelve-posture sequence salutes the sun in the morning?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u7-013',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is Pranayama in the Ashtanga Yoga system?',
    options: [
      'The conscious control and regulation of vital life-force breath',
      'The practice of loud public chanting',
      'A diet consisting only of raw grains',
      'Walking barefoot across hot coals'
    ],
    correctAnswer: 'The conscious control and regulation of vital life-force breath',
    explanation: '"Prana" is the subtle vital life energy and breath, and "Ayama" is conscious expansion and regulation; it harmonizes breathing rhythms to balance body and mind.',
    socraticHint: 'Break down Prana (breath/vital energy) and Ayama (regulation/extension).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-014',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is Nadi Shodhana (also known as Anuloma Viloma) Pranayama?',
    options: [
      'Alternate Nostril Breathing that balances the nervous system and brain hemispheres',
      'Hyperventilating rapidly until dizzy',
      'Holding the breath underwater for three minutes',
      'Breathing only through the mouth'
    ],
    correctAnswer: 'Alternate Nostril Breathing that balances the nervous system and brain hemispheres',
    explanation: 'Nadi Shodhana ("purification of energy channels") involves alternating breath smoothly between left and right nostrils, balancing active and calm nervous channels.',
    socraticHint: 'Which breathing practice alternates between the left and right nostrils?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-015',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is Bhramari Pranayama, and why is it especially useful for students suffering from tension or headaches?',
    options: [
      'The "Humming Bee" breath where exhaling with a humming sound soothes the brain and releases anxiety',
      'Running around the school field shouting like an animal',
      'Blowing air through a musical flute',
      'Breathing while eating honey'
    ],
    correctAnswer: 'The "Humming Bee" breath where exhaling with a humming sound soothes the brain and releases anxiety',
    explanation: 'Bhramari ("female bee") involves gently closing ears and eyes and making a soft humming drone during exhalation, creating calming vibrations throughout the skull.',
    socraticHint: 'Which breath mimics the soothing humming drone of a bee?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-016',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is the fifth limb of Ashtanga Yoga, known as Pratyahara?',
    options: [
      'Withdrawal of the senses from external attractions and distractions',
      'Physical fasting on full moon days',
      'Recitation of genealogical histories',
      'Painting sacred mandalas with colored sand'
    ],
    correctAnswer: 'Withdrawal of the senses from external attractions and distractions',
    explanation: 'Pratyahara is sensory withdrawal—turning attention inward away from outside sights, sounds, and screens so the mind is not tossed by sensory cravings.',
    socraticHint: 'Which limb bridges external physical practices with internal mental meditation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-017',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is the sixth limb of Ashtanga Yoga, known as Dharana?',
    options: [
      'One-pointed concentration of the mind on a single chosen object or thought',
      'Complete loss of consciousness',
      'Walking in a circle around a temple',
      'Memorizing an entire encyclopedia'
    ],
    correctAnswer: 'One-pointed concentration of the mind on a single chosen object or thought',
    explanation: 'Patanjali defines Dharana as "Deshabandhash chittasya dharana"—binding the mind firmly to a single point or focus without wandering.',
    socraticHint: 'Which term means focused, one-pointed concentration?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-018',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'How does practicing Pratyahara (sensory withdrawal) help modern learners cope with digital overload from smartphones?',
    options: [
      'It empowers them to consciously step away from screen pings and social media noise to give their nervous system peaceful rest',
      'It forces them to smash electronic devices with rocks',
      'It prevents students from ever learning computer skills',
      'It makes phones run out of battery faster'
    ],
    correctAnswer: 'It empowers them to consciously step away from screen pings and social media noise to give their nervous system peaceful rest',
    explanation: 'Pratyahara gives modern youth the discipline to turn off screens, unplug from digital noise, and preserve their mental serenity and focus.',
    socraticHint: 'How does stepping away from notifications protect mental calmness?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-019',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What simple concentration technique (Trataka) is often used to develop Dharana?',
    options: [
      'Gazing steadily at a single point (such as a steady flame or dot) without blinking to steady the optic nerve and mind',
      'Spinning around in circles rapidly',
      'Looking at fifty photographs in ten seconds',
      'Staring directly at the midday sun without sunglasses'
    ],
    correctAnswer: 'Gazing steadily at a single point (such as a steady flame or dot) without blinking to steady the optic nerve and mind',
    explanation: 'Trataka is the practice of steady, unblinking gazing at a gentle candle flame or black dot, training the wandering mind to settle into stillness.',
    socraticHint: 'Which visual practice focuses eye gaze on a single steady point to calm the brain?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-020',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What difference distinguishes Dharana (concentration) from Dhyana (meditation)?',
    options: [
      'Dharana is focusing the mind with conscious effort on one point, while Dhyana is the continuous effortless flow of awareness',
      'Dharana is physical exercise, while Dhyana is sleep',
      'Dharana is for children, while Dhyana is only for scholars',
      'There is no difference whatsoever'
    ],
    correctAnswer: 'Dharana is focusing the mind with conscious effort on one point, while Dhyana is the continuous effortless flow of awareness',
    explanation: 'Dharana is like drops of water falling onto a plate (intermittent effort), while Dhyana is like oil poured smoothly from one vessel to another (unbroken stream).',
    socraticHint: 'Compare bringing the mind back repeatedly (Dharana) with an unbroken stream of meditation (Dhyana).',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-021',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What physiological change occurs when a student slows their breathing down to 6 breaths per minute using Pranayama?',
    options: [
      'Heart rate slows, blood pressure normalizes, and stress hormones decrease, inducing relaxed alertness',
      'Body temperature rises to fever levels',
      'The brain loses all ability to remember facts',
      'Muscles become paralyzed'
    ],
    correctAnswer: 'Heart rate slows, blood pressure normalizes, and stress hormones decrease, inducing relaxed alertness',
    explanation: 'Deep rhythmic breathing stimulates parasympathetic nervous tone, reducing cortisol and adrenaline while optimizing cerebral oxygenation.',
    socraticHint: 'How does slow breathing trigger the body’s natural relaxation response?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-022',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What is the eighth and ultimate limb of Ashtanga Yoga, representing supreme spiritual realization and oneness with Paramatma?',
    options: ['Samadhi', 'Dhyana', 'Pranayama', 'Yama'],
    correctAnswer: 'Samadhi',
    explanation: 'Samadhi is the pinnacle of Ashtanga Yoga—the state of profound superconsciousness where the meditator, the process of meditation, and the Divine merge into unified bliss.',
    socraticHint: 'Which eighth limb represents supreme spiritual absorption and liberation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-023',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'How can a Grade 6 learner use Dharana to solve complex word problems in mathematics?',
    options: [
      'By training the mind to focus fully on the problem details, ignoring surrounding noises, and analyzing steps patiently',
      'By guessing numbers while talking to neighbors',
      'By rushing through the paper without reading questions',
      'By waiting for another student to whisper the answer'
    ],
    correctAnswer: 'By training the mind to focus fully on the problem details, ignoring surrounding noises, and analyzing steps patiently',
    explanation: 'Dharana provides cognitive focus, enabling students to filter out distractions, retain variables in working memory, and solve multi-step problems systematically.',
    socraticHint: 'How does disciplined mental focus improve step-by-step problem-solving?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u7-024',
    subStrandId: 'substrand-g6-hre-u7',
    lessonId: 'lesson-g6-hre-u7-l2',
    text: 'What does the famous opening aphorism of the Yoga Sutras (1.2) define as the purpose of Yoga: "Yogas chitta-vritti-nirodhah"?',
    options: [
      'Yoga is the stilling and calming of the turbulent fluctuations of the mind',
      'Yoga is the practice of athletic gymnastics',
      'Yoga is memorizing grammar rules',
      'Yoga is the accumulation of wealth'
    ],
    correctAnswer: 'Yoga is the stilling and calming of the turbulent fluctuations of the mind',
    explanation: '"Yogas chitta vritti nirodhah"—Patanjali’s master definition: Yoga is quieting the restless whirlpools, waves, and chatter of the mind to reveal the true inner Self.',
    socraticHint: 'How does Yoga calm the restless waves and chatter (Vrittis) of the mind?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // --- Unit 8 Questions (q-g6-hre-u8-001 to q-g6-hre-u8-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u8-001',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'From which ancient scripture does the universal Vedic proclamation "Vasudhaiva Kutumbakam" originate?',
    options: ['Maha Upanishad', 'Ramayana', 'Bhagavata Purana', 'Manusmriti'],
    correctAnswer: 'Maha Upanishad',
    explanation: 'The verse "Ayam nijah paro veti... vasudhaiva kutumbakam" is found in the Maha Upanishad (Chapter 6, Verses 71-73), engraved at the entrance of spiritual halls.',
    socraticHint: 'Which philosophical Upanishad contains the famous phrase proclaiming the earth as one family?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-002',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What does "Vasudhaiva Kutumbakam" literally translate to in English?',
    options: [
      '"The entire earth is one single family"',
      '"Only those of our clan are our family"',
      '"Wealth belongs to the strongest nation"',
      '"Mountains are the rulers of the world"'
    ],
    correctAnswer: '"The entire earth is one single family"',
    explanation: '"Vasudha" (the earth) + "Eva" (indeed) + "Kutumbakam" (family)—proclaiming that all humans, creatures, and nature form one interconnected divine family.',
    socraticHint: 'Translate "Vasudha" (earth) and "Kutumba" (family).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-003',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What profound declaration about Mother Earth is recorded in the Prithvi Sukta of the Atharva Veda (12.1.12)?',
    options: [
      '"Mata Bhumih Putro Aham Prithivyah" (The Earth is my Mother, and I am her child)',
      '"The earth belongs to kings to plunder"',
      '"Humans have the right to poison the rivers"',
      '"Earth is an empty stone without life"'
    ],
    correctAnswer: '"Mata Bhumih Putro Aham Prithivyah" (The Earth is my Mother, and I am her child)',
    explanation: 'The Prithvi Sukta establishes human ecological kinship with the planet: we are the grateful children of Mother Earth (Bhu Mata) and must honor and protect her.',
    socraticHint: 'Which quote affirms that Earth is our sacred Mother and humans are her children?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-004',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What are the Pancha Mahabhuta (The Five Great Cosmic Elements) in Vedic cosmology?',
    options: [
      'Prithvi (Earth), Jala (Water), Agni (Fire), Vayu (Air), and Akasha (Space/Ether)',
      'Gold, Silver, Copper, Bronze, and Iron',
      'Wheat, Rice, Barley, Maize, and Millet',
      'Sight, Sound, Smell, Taste, and Touch'
    ],
    correctAnswer: 'Prithvi (Earth), Jala (Water), Agni (Fire), Vayu (Air), and Akasha (Space/Ether)',
    explanation: 'All material manifestation in the cosmos and inside the human body is formed from the Pancha Mahabhuta: Earth, Water, Fire, Air, and Space/Ether.',
    socraticHint: 'Which five basic natural elements constitute creation according to classical philosophy?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-005',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'Why do devout Hindus say a morning prayer of apology ("Samudra vasane devi...") upon touching the floor with their feet each dawn?',
    options: [
      'To ask Mother Earth for loving forgiveness for stepping upon her sacred body throughout the day',
      'Because they are afraid of cold tiles',
      'To ask for gold coins from under the ground',
      'Because sleeping on beds is strictly forbidden'
    ],
    correctAnswer: 'To ask Mother Earth for loving forgiveness for stepping upon her sacred body throughout the day',
    explanation: '"Padaspam kshamasva me"—the morning prayer recognizes Mother Earth’s sacredness, asking forgiveness with deep humility before our feet step upon her ground.',
    socraticHint: 'Why does one ask forgiveness from Mother Earth before placing feet on the ground in the morning?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-006',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'How does the principle of Vasudhaiva Kutumbakam oppose xenophobia, tribalism, and racism?',
    options: [
      'It asserts that petty minds divide people into "ours" and "strangers", while noble souls embrace all humans as spiritual brothers and sisters',
      'It encourages treating foreign visitors with suspicion',
      'It demands that people only interact with members of their own clan',
      'It permits discrimination against people of different skin colors'
    ],
    correctAnswer: 'It asserts that petty minds divide people into "ours" and "strangers", while noble souls embrace all humans as spiritual brothers and sisters',
    explanation: 'The verse explicitly rebukes parochial small-mindedness ("Laghu-chetasam"), proclaiming that enlightened human beings recognize one shared global family.',
    socraticHint: 'How does the concept of a single global family dismantle ethnic and racial prejudice?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-007',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What term in Hindu philosophy describes nature as the dynamic, creative mother energy of Paramatma?',
    options: ['Prakriti', 'Purusha', 'Maya', 'Samsara'],
    correctAnswer: 'Prakriti',
    explanation: 'Prakriti is Mother Nature—the primal, dynamic creative matrix that brings forth physical worlds, life, ecosystems, and natural laws.',
    socraticHint: 'Which Sanskrit term refers to Nature as the divine feminine creative energy?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-008',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'Why are sacred rivers (like Ganga, Yamuna, Godavari, and Saraswati) revered as mothers (Mata) in Hindu culture?',
    options: [
      'Because like loving mothers, they sustain life, nourish agricultural crops, and provide drinking water for millions',
      'Because they are made of milk',
      'Because they only flow through temple courtyards',
      'Because they are owned by royal families'
    ],
    correctAnswer: 'Because like loving mothers, they sustain life, nourish agricultural crops, and provide drinking water for millions',
    explanation: 'Rivers are personified as divine mothers because they unconditionally nurture humanity, irrigation, and wildlife with fresh water.',
    socraticHint: 'How do flowing rivers nurture civilizations like a loving mother?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-009',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'How does Kenya’s national motto "Harambee" harmonize with the spirit of Vasudhaiva Kutumbakam?',
    options: [
      'Both call on diverse people to set aside narrow differences and cooperate together as one united family for the common good',
      'Both promote aggressive corporate monopolies',
      'Both demand that people live in isolated forest camps',
      'Both discourage charitable community contributions'
    ],
    correctAnswer: 'Both call on diverse people to set aside narrow differences and cooperate together as one united family for the common good',
    explanation: 'Harambee (pulling together) and Vasudhaiva Kutumbakam (one earth family) share the noble ethical conviction that solidarity and mutual care uplift society.',
    socraticHint: 'Connect the Kenyan spirit of communal cooperation with the concept of one global family.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-010',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What Vedic ritual practice (Yajna) directly purifies the ambient atmosphere and air through herbal oblations and sacred fire?',
    options: ['Homa / Agnihotra', 'Tapasya', 'Upavasa', 'Pradakshina'],
    correctAnswer: 'Homa / Agnihotra',
    explanation: 'Agnihotra and Homa involve offering cow ghee, dry grains, and medicinal herbs into a consecrated fire, releasing phytochemical vapors that purify air quality.',
    socraticHint: 'Which sacred fire ceremony offers herbs to cleanse the atmosphere?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-011',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What should be a student’s attitude toward public water bodies in Kenya (like Lake Victoria, Lake Naivasha, and the Indian Ocean)?',
    options: [
      'Protect them reverently from chemical dumping and plastic pollution as sacred sources of life (Jala)',
      'Dump used plastic bottles and wrappers into them',
      'Wash dirty motor vehicles directly in the lake shallows',
      'Ignore pollution because water bodies clean themselves instantly'
    ],
    correctAnswer: 'Protect them reverently from chemical dumping and plastic pollution as sacred sources of life (Jala)',
    explanation: 'Recognizing water (Jala) as one of the Pancha Mahabhuta compels learners to participate in beach clean-ups and avoid discarding plastic in lakes.',
    socraticHint: 'How does seeing water as a sacred element stop water pollution?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-012',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l1',
    text: 'What does the term "Bhu Mata" literally mean when referring to our planet?',
    options: ['Mother Earth', 'Father Sky', 'Ocean Goddess', 'Sun King'],
    correctAnswer: 'Mother Earth',
    explanation: '"Bhu" or "Bhumi" means the earth, and "Mata" means mother—personifying the planet as a nurturing, living mother to all creatures.',
    socraticHint: 'Translate "Bhumi" (earth) and "Mata" (mother).',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u8-013',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'Which sacred plant is reverently cultivated in Hindu home courtyards for its continuous oxygen emission and medicinal healing properties?',
    options: ['Tulsi (Holy Basil)', 'Cactus', 'Poison Ivy', 'Bamboo'],
    correctAnswer: 'Tulsi (Holy Basil)',
    explanation: 'Tulsi (Ocimum sanctum) is revered as Vrinda or divine botanical manifestation; it purifies the air, repels pests, and provides potent adaptogenic immune remedies.',
    socraticHint: 'Which fragrant green herb is honored in courtyards as Holy Basil?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-014',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'Why is the Peepal tree (Ashvattha / Ficus religiosa) revered in Hindu scriptures and forbidden to be cut down unnecessarily?',
    options: [
      'It releases oxygen 24 hours a day and was identified by Lord Krishna in the Gita as representing His divine presence among trees',
      'It produces edible gold fruit',
      'It only grows inside palaces',
      'It has no roots in the soil'
    ],
    correctAnswer: 'It releases oxygen 24 hours a day and was identified by Lord Krishna in the Gita as representing His divine presence among trees',
    explanation: 'In the Gita (10.26), Krishna says: "Ashvatthah sarva-vrikshanam" (Among all trees, I am the Peepal). Ecologically, it provides immense shade and oxygen.',
    socraticHint: 'Which sacred fig tree did Krishna name as the greatest of all trees?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-015',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What magnificent tree with aerial roots that grow into secondary trunks symbolizes immortality, divine shelter, and cosmic endurance?',
    options: ['The Banyan tree (Vatavriksha)', 'The Pine tree', 'The Eucalyptus tree', 'The Coconut palm'],
    correctAnswer: 'The Banyan tree (Vatavriksha)',
    explanation: 'The Banyan (Vatavriksha) spreads massive aerial roots that anchor into the soil, creating sprawling ecological canopies providing shelter for entire bird communities.',
    socraticHint: 'Which tree drops hanging aerial roots from its branches that grow into new trunks?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-016',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'Which tree is celebrated in traditional Indian medicine and rural life as the "village pharmacy" for its natural antibacterial properties?',
    options: ['Neem tree', 'Oak tree', 'Maple tree', 'Willow tree'],
    correctAnswer: 'Neem tree',
    explanation: 'Every part of the Neem tree (Azadirachta indica)—leaves, bark, seeds, and twigs—has powerful antimicrobial, insecticidal, and dental hygiene qualities.',
    socraticHint: 'Which bitter-leaved tree is renowned for its antibacterial and dental cleaning qualities?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-017',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What is "Gau Sewa" in Hindu tradition?',
    options: [
      'Selfless care, protection, and feeding of cows as symbols of gentle motherhood and unconditional giving',
      'Selling cattle for ivory',
      'Training bulls to fight in sporting arenas',
      'Using cows exclusively for military transport'
    ],
    correctAnswer: 'Selfless care, protection, and feeding of cows as symbols of gentle motherhood and unconditional giving',
    explanation: 'Gau Sewa is the service and respectful care of cows (Gomata), acknowledging that she converts simple dry grass into wholesome milk that feeds all humanity.',
    socraticHint: 'How does caring for cows express reverence for gentle, selfless motherhood?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-018',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What is the sacred wish-fulfilling cow in Hindu mythology known as?',
    options: ['Kamadhenu', 'Surabhi', 'Nandini', 'All of the above refer to the divine cow'],
    correctAnswer: 'All of the above refer to the divine cow',
    explanation: 'Kamadhenu (and her daughters Surabhi and Nandini) emerged from the churning of the cosmic ocean (Samudra Manthan) embodying divine abundance and sustenance.',
    socraticHint: 'Are Kamadhenu, Surabhi, and Nandini names associated with the sacred bovine mother?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-019',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'Why do Hindu deities ride on various animal mounts (Vahanas), such as Shiva on a bull and Durga on a lion?',
    options: [
      'To demonstrate that all animal creatures are sacred vessels of divine energy deserving human protection and respect',
      'Because ancient gods did not have wheeled chariots',
      'To show that animals are mere tools for warfare',
      'To display mastery in animal hunting'
    ],
    correctAnswer: 'To demonstrate that all animal creatures are sacred vessels of divine energy deserving human protection and respect',
    explanation: 'Associating deities with animal Vahanas sanctifies all biodiversity, teaching devotees that cruelty to any creature desecrates the Divine.',
    socraticHint: 'How does depicting deities riding upon animals teach humanity to respect all wildlife?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-020',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What environmental message is conveyed by the Bishnoi community’s historical sacrifice protecting Khejri trees in India?',
    options: [
      'Trees and wildlife are so sacred that preserving forests is worth peaceful personal sacrifice (Ahimsa in ecology)',
      'Trees should only be cut down during nighttime',
      'Forests are only useful for commercial timber',
      'Only kings are allowed to plant trees'
    ],
    correctAnswer: 'Trees and wildlife are so sacred that preserving forests is worth peaceful personal sacrifice (Ahimsa in ecology)',
    explanation: 'In 1730, Amrita Devi and 363 Bishnois hugged the trees to shield them from royal axes, inspiring modern non-violent environmental movements like Chipko.',
    socraticHint: 'How did the Bishnoi people protect sacred trees with non-violent courage?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-021',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'How can young Hindu learners in Kenya support national wildlife conservation efforts?',
    options: [
      'By supporting the Kenya Wildlife Service (KWS) to protect rhinos and elephants from poaching, and visiting national parks with respect',
      'By buying illegal ivory trinkets',
      'By throwing plastic bottles out of tour vans in national reserves',
      'By feeding junk food to wild baboons'
    ],
    correctAnswer: 'By supporting the Kenya Wildlife Service (KWS) to protect rhinos and elephants from poaching, and visiting national parks with respect',
    explanation: 'Practicing Ahimsa means defending endangered wildlife against poaching and keeping wildlife parks free of trash and harassment.',
    socraticHint: 'Which positive actions protect Kenya’s magnificent wildlife heritage?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-022',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What practice represents Bhoota Yajna (the fourth of the five daily sacred duties) in family life?',
    options: [
      'Putting out grains for birds, feeding stray dogs, and watering thirsty plants before eating one’s own meal',
      'Hunting birds with slingshots',
      'Felling mature shade trees for charcoal',
      'Caging wild birds in tiny wooden boxes'
    ],
    correctAnswer: 'Putting out grains for birds, feeding stray dogs, and watering thirsty plants before eating one’s own meal',
    explanation: 'Bhoota Yajna is the daily duty of sharing food with animals and birds and nurturing nature, showing gratitude to the non-human living kingdom.',
    socraticHint: 'How do daily acts of feeding birds and caring for animals fulfill Bhoota Yajna?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-023',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'What is a "Gaushala"?',
    options: [
      'A sanctuary or shelter dedicated to caring for old, rescued, or abandoned cows with compassion',
      'A warehouse where farming machines are stored',
      'A musical instrument used in temple dances',
      'A traditional crown worn by royal princes'
    ],
    correctAnswer: 'A sanctuary or shelter dedicated to caring for old, rescued, or abandoned cows with compassion',
    explanation: 'Gaushalas are non-profit cattle sanctuaries maintained by Hindu trusts to provide food, shelter, veterinary care, and affection to cows.',
    socraticHint: 'Which compound word combines "Gau" (cow) and "Shala" (shelter/abode)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u8-024',
    subStrandId: 'substrand-g6-hre-u8',
    lessonId: 'lesson-g6-hre-u8-l2',
    text: 'How can a primary school environmental club in Mombasa or Nairobi plant trees according to Vedic principles?',
    options: [
      'By selecting indigenous, shade-giving, and bird-friendly tree species, watering them faithfully, and protecting them until maturity',
      'By planting plastic flowers in the courtyard',
      'By planting saplings and abandoning them without water to dry up',
      'By using chemical weedkiller on all school lawns'
    ],
    correctAnswer: 'By selecting indigenous, shade-giving, and bird-friendly tree species, watering them faithfully, and protecting them until maturity',
    explanation: 'Vedic tree planting (Vriksharopana) is an act of sacred duty that requires not just planting saplings, but nurturing and watering them like family members until fully grown.',
    socraticHint: 'What responsible long-term care ensures planted saplings grow into flourishing shade trees?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
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

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 4 of Grade 6 HRE to cbe_database.json!');
