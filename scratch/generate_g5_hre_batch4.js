import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 HRE Batch 4 (Units 7 & 8) ---');

// 1. Batch 4 Sub-strands (Units 7 & 8)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-hre-u7',
    strandId: 'strand-g5-hre-virtues',
    learningAreaId: 'la-hre-g5',
    title: 'Sadachar: The Five Yamas (Moral Restraints for Character Building)',
    description: 'Cultivating noble moral character (Sadachar) through the Five Yamas from Patanjali\'s Yoga Sutras: 1) Satya (truthfulness in speech, action, and digital life; avoiding gossip and lies); 2) Ahimsa (non-violence in thought, word, and deed; gentle speech, opposing bullying, and compassion for all living beings); 3) Asteya (non-stealing; respecting others\' property, ideas, and academic honesty); 4) Brahmacharya (purity of thought, focus, self-control, and channeling energy into studies); and 5) Aparigraha (non-possessiveness, freedom from greed, sharing resources, and simple living).',
    cbeCompetency: 'Moral self-regulation, empathy, non-violence, ethical integrity, and academic honesty',
    estimatedMinutes: 30,
    order: 7
  },
  {
    id: 'substrand-g5-hre-u8',
    strandId: 'strand-g5-hre-virtues',
    learningAreaId: 'la-hre-g5',
    title: 'Pancha Mahayajna: The Five Daily Sacred Duties of Gratitude and Interconnection',
    description: 'Exploring the five foundational daily duties (Pancha Mahayajna) through which a Hindu expresses gratitude to the cosmos and lives selflessly: 1) Deva Yajna (gratitude to the Divine and cosmic forces through prayer, offering, and reverence for nature); 2) Rishi / Brahma Yajna (gratitude to ancient sages, teachers, and knowledge through daily study and learning); 3) Pitru Yajna (gratitude and respectful service to parents, elders, and ancestors); 4) Manushya / Nri Yajna (gratitude and service to fellow human beings through hospitality, feeding guests, and helping the poor); and 5) Bhuta Yajna (gratitude and compassion toward animals, birds, insects, and plant life by feeding them and protecting habitats).',
    cbeCompetency: 'Gratitude, civic responsibility, filial devotion, animal welfare, and ecological stewardship',
    estimatedMinutes: 30,
    order: 8
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 4 Lessons (Units 7 & 8: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-hre-u7-l1',
    subStrandId: 'substrand-g5-hre-u7',
    title: 'Satya and Ahimsa: The Pillars of Truth and Universal Non-Violence',
    content: 'In the Yoga Sutras of Sage Patanjali, the five Yamas represent foundational moral disciplines essential for personal spiritual growth and peaceful community living. The first two Yamas are: 1) Ahimsa (Non-violence): Ahimsa is described as "Paramo Dharmah"—the supreme virtue. It means avoiding causing physical, verbal, or mental harm to any living being. In school, Ahimsa means rejecting physical fighting, refusing to use harsh nicknames or cyberbullying, and showing kindness to domestic animals and wildlife. Mahatma Gandhi used Ahimsa as a powerful moral force for justice, proving that true courage lies in gentle, resolute non-violence; 2) Satya (Truthfulness): Satya means speaking what is true, gentle, and beneficial. In the Mahabharata, Sage Vyasa teaches: "Speak the truth, speak what is pleasant, do not speak unpleasant truth, and do not speak pleasing falsehoods." Truthfulness requires honesty during examinations, admitting personal mistakes without making false excuses, and refusing to spread rumors or slander.',
    didYouKnow: 'Mahatma Gandhi famously said: "Truth (Satya) is God, and Non-violence (Ahimsa) is the means to realize Him," making these two virtues the guiding lights of his life!',
    kenyanContext: 'At Visa Oshwal Primary School in Nairobi, pupils take an annual pledge of Ahimsa, agreeing to resolve playground misunderstandings through peaceful dialogue rather than fighting.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u7-l2',
    subStrandId: 'substrand-g5-hre-u7',
    title: 'Asteya, Brahmacharya, and Aparigraha: Integrity, Purity, and Contentment',
    content: 'The remaining three Yamas cultivate personal self-discipline and freedom from greed: 1) Asteya (Non-stealing): Asteya means refraining from taking anything that does not belong to you, whether by force, stealth, or deceit. It extends beyond physical objects to intellectual property: acknowledging sources in school projects, refusing to copy homework from a classmate, and respecting public property; 2) Brahmacharya (Purity of conduct and self-control): For young students, Brahmacharya means disciplined focus, emotional purity, self-restraint, and channeling physical and mental energy into academic studies, sports, and spiritual learning rather than idle distractions or addictive media; 3) Aparigraha (Non-possessiveness and non-greed): Aparigraha teaches living with contentment (Santosha), consuming only what is necessary, and avoiding hoarding. When people take only what they need, there is enough food, clean water, and shelter for everyone on Earth. Practicing Aparigraha inspires pupils to share stationery, donate outgrown clothing, and live simply without excessive desire for expensive luxury gadgets.',
    didYouKnow: 'The Sanskrit word "Asteya" means "not stealing", while "Steya" means theft; practicing Asteya even includes not stealing someone else’s time by being punctual!',
    kenyanContext: 'Grade 5 learners in Kisumu practice Aparigraha during end-of-term charity drives by collecting unused notebooks, pens, and school bags to distribute to needy rural schools in the surrounding sub-counties.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u8-l1',
    subStrandId: 'substrand-g5-hre-u8',
    title: 'Deva Yajna and Rishi Yajna: Gratitude to God and Sacred Knowledge',
    content: 'The Vedic tradition teaches that human beings are born with sacred debts (Rinas) of gratitude to the cosmos, ancestors, and society. To repay these debts, every householder and student is commanded to perform the Pancha Mahayajna—the Five Great Daily Sacrifices of gratitude: 1) Deva Yajna (Gratitude to the Divine and cosmic powers): expressing daily thanksgiving to Paramatma and the cosmic forces (Surya the sun, Vayu the air, Agni the heat, Varuna the waters) through morning prayers, lighting a lamp (Deepak), or offering incense and pure water. It reminds humans that life is a divine gift; 2) Rishi / Brahma Yajna (Gratitude to Sages and Knowledge): honoring the ancient sages, teachers, and inventors who discovered science, philosophy, language, and spiritual wisdom. This duty is performed by dedicating time every day to reading sacred scriptures, studying academic books with diligence, respecting teachers (Gurus), and sharing knowledge freely with others.',
    didYouKnow: 'Deva Yajna does not require wealth; offering a simple fresh flower, a clean leaf, or a cup of pure water with sincere love is celebrated in the Bhagavad Gita (9:26) as fully accepted by God!',
    kenyanContext: 'Every morning at Cutchi Gujarati Hindu Union Primary School in Nairobi, learners offer a quiet prayer of Deva Yajna before classes, dedicating their academic day to the pursuit of truth.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-hre-u8-l2',
    subStrandId: 'substrand-g5-hre-u8',
    title: 'Pitru Yajna, Manushya Yajna, and Bhuta Yajna: Gratitude to Parents, Society, and Animals',
    content: 'The remaining three daily duties of the Pancha Mahayajna extend compassion to family, humanity, and all living creatures: 3) Pitru Yajna (Gratitude to Parents and Ancestors): honoring father, mother, grandparents, and ancestors for giving us life, nurturing our childhood, and providing love. This duty is fulfilled by obeying parents, caring for elderly family members, speaking respectfully, and offering prayers for deceased forebears; 4) Manushya / Nri Yajna (Gratitude and Service to Humanity): practicing hospitality (Atithi Devo Bhava - treating the guest as divine), feeding hungry people, donating to charitable clinics, welcoming visitors warmly, and supporting marginalized citizens; 5) Bhuta Yajna (Compassion to Animals and Nature): recognizing the sacredness of non-human life by offering food to birds, street animals, and cows, planting trees, leaving water out for birds during hot dry seasons, and protecting wildlife. Through these five daily duties, a person lives selflessly as an interconnected protector of creation.',
    didYouKnow: 'In traditional Hindu homes, before the family eats lunch, small portions of food (called Bali) are placed outdoors for birds, squirrels, and ants, fulfilling Bhuta Yajna every single day!',
    kenyanContext: 'In Mombasa, Hindu families place shallow clay bowls of fresh water on balconies and compound walls for coastal birds during dry months, illustrating daily Bhuta Yajna in the hot Kenyan climate.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 4 Missions (Units 7 & 8: 4 Missions, orders 101–104)
const missionsToAdd = [
  {
    id: 'mission-g5-hre-u7-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u7',
    lessonId: 'lesson-g5-hre-u7-l1',
    title: 'Pillars of Satya and Ahimsa Quest',
    description: 'Master the supreme virtues of universal non-violence (Ahimsa Paramo Dharmah) and truthfulness (Satya), walking the path of moral courage charted by Mahatma Gandhi!',
    order: 101,
    orderIndex: 101,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-ahimsa-satya',
    badge: {
      name: 'Pillar of Ahimsa',
      icon: 'heart'
    },
    questionIds: [
      'q-g5-hre-u7-001',
      'q-g5-hre-u7-002',
      'q-g5-hre-u7-003',
      'q-g5-hre-u7-004',
      'q-g5-hre-u7-005',
      'q-g5-hre-u7-006',
      'q-g5-hre-u7-007',
      'q-g5-hre-u7-008',
      'q-g5-hre-u7-009',
      'q-g5-hre-u7-010',
      'q-g5-hre-u7-011',
      'q-g5-hre-u7-012'
    ]
  },
  {
    id: 'mission-g5-hre-u7-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u7',
    lessonId: 'lesson-g5-hre-u7-l2',
    title: 'Integrity of Asteya and Aparigraha Quest',
    description: 'Practice academic honesty through Asteya (non-stealing), channel mental focus with Brahmacharya, and embrace contentment and simple living through Aparigraha!',
    order: 102,
    orderIndex: 102,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-asteya-integrity',
    badge: {
      name: 'Champion of Integrity',
      icon: 'shield'
    },
    questionIds: [
      'q-g5-hre-u7-013',
      'q-g5-hre-u7-014',
      'q-g5-hre-u7-015',
      'q-g5-hre-u7-016',
      'q-g5-hre-u7-017',
      'q-g5-hre-u7-018',
      'q-g5-hre-u7-019',
      'q-g5-hre-u7-020',
      'q-g5-hre-u7-021',
      'q-g5-hre-u7-022',
      'q-g5-hre-u7-023',
      'q-g5-hre-u7-024'
    ]
  },
  {
    id: 'mission-g5-hre-u8-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u8',
    lessonId: 'lesson-g5-hre-u8-l1',
    title: 'Deva and Rishi Sacred Gratitude Quest',
    description: 'Repay the cosmic debt of gratitude through Deva Yajna to the Divine, and honor ancient sages and teachers through daily study in Rishi Yajna!',
    order: 103,
    orderIndex: 103,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-deva-rishi',
    badge: {
      name: 'Sacred Gratitude',
      icon: 'book-open'
    },
    questionIds: [
      'q-g5-hre-u8-001',
      'q-g5-hre-u8-002',
      'q-g5-hre-u8-003',
      'q-g5-hre-u8-004',
      'q-g5-hre-u8-005',
      'q-g5-hre-u8-006',
      'q-g5-hre-u8-007',
      'q-g5-hre-u8-008',
      'q-g5-hre-u8-009',
      'q-g5-hre-u8-010',
      'q-g5-hre-u8-011',
      'q-g5-hre-u8-012'
    ]
  },
  {
    id: 'mission-g5-hre-u8-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-hre-u8',
    lessonId: 'lesson-g5-hre-u8-l2',
    title: 'Pitru, Manushya and Bhuta Compassion Quest',
    description: 'Honor parents with Pitru Yajna, serve humanity with warm hospitality in Manushya Yajna, and care for animals and plants in daily Bhuta Yajna!',
    order: 104,
    orderIndex: 104,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-hre-universal-compassion',
    badge: {
      name: 'Universal Custodian',
      icon: 'feather'
    },
    questionIds: [
      'q-g5-hre-u8-013',
      'q-g5-hre-u8-014',
      'q-g5-hre-u8-015',
      'q-g5-hre-u8-016',
      'q-g5-hre-u8-017',
      'q-g5-hre-u8-018',
      'q-g5-hre-u8-019',
      'q-g5-hre-u8-020',
      'q-g5-hre-u8-021',
      'q-g5-hre-u8-022',
      'q-g5-hre-u8-023',
      'q-g5-hre-u8-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 4 Questions (Units 7 & 8: 48 Questions total)
const questionsToAdd = [
  // --- Unit 7 Lesson 1: Pillars of Satya and Ahimsa Quest (q-g5-hre-u7-001 to 012) ---
  {
    id: 'q-g5-hre-u7-001',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What are the five moral restraints (Yamas) formulated by Sage Patanjali in the Yoga Sutras?',
    text: 'What are the five moral restraints (Yamas) formulated by Sage Patanjali in the Yoga Sutras?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha',
      'Asana, Pranayama, Pratyahara, Dharana, and Dhyana',
      'Shaucha, Santosha, Tapas, Svadhyaya, and Ishvara Pranidhana',
      'Dharma, Artha, Kama, Moksha, and Bhakti'
    ],
    correctAnswer: 'Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha',
    explanation: 'The five Yamas are universal moral codes: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (self-control/chastity), and Aparigraha (non-greed).',
    socraticHint: 'Which five ethical disciplines include non-harming, truthfulness, non-stealing, purity, and non-greed?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-002',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What is the full meaning of the foundational principle "Ahimsa Paramo Dharmah"?',
    text: 'What is the full meaning of the foundational principle "Ahimsa Paramo Dharmah"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Non-violence is the supreme virtue and highest moral duty',
      'Physical strength is the only measure of leadership',
      'Speaking loudly convinces people of truth',
      'Wealth is the greatest spiritual achievement'
    ],
    correctAnswer: 'Non-violence is the supreme virtue and highest moral duty',
    explanation: '"Ahimsa Paramo Dharmah" from the Mahabharata establishes that refraining from harming any creature in thought, speech, or physical action is the supreme virtue.',
    socraticHint: 'Which translation identifies non-violence as the supreme (Paramo) duty (Dharma)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-003',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'In what three ways must Ahimsa (non-violence) be practiced according to Hindu ethics?',
    text: 'In what three ways must Ahimsa (non-violence) be practiced according to Hindu ethics?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'In thought (Manasa), in speech (Vacha), and in physical action (Karmana)',
      'Only in physical fighting and never in speech',
      'Only when someone is watching you',
      'Only during the weekend and public holidays'
    ],
    correctAnswer: 'In thought (Manasa), in speech (Vacha), and in physical action (Karmana)',
    explanation: 'True Ahimsa is threefold: avoiding malicious thoughts (Manasa), refraining from insulting speech or rumors (Vacha), and avoiding physical harm (Karmana).',
    socraticHint: 'Which three faculties of the mind, tongue, and body must all practice non-violence?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-004',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How does a Grade 5 pupil practice Ahimsa in their daily speech at school?',
    text: 'How does a Grade 5 pupil practice Ahimsa in their daily speech at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By speaking gently, encouraging classmates, and avoiding hurtful nicknames, mocking insults, or gossip',
      'By shouting loudly at other pupils during class',
      'By making fun of a classmate who gets a wrong answer',
      'By spreading false rumors about the teacher'
    ],
    correctAnswer: 'By speaking gently, encouraging classmates, and avoiding hurtful nicknames, mocking insults, or gossip',
    explanation: 'Verbal non-violence (Vacha Ahimsa) means using speech that is kind, encouraging, and constructive, never injuring someone else\'s feelings or self-esteem.',
    socraticHint: 'How does avoiding cruel insults and choosing gentle words protect the feelings of classmates?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-005',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'Who was the historic leader who applied Satya (Truth) and Ahimsa (Non-violence) as a global philosophy to achieve freedom and inspire civil rights?',
    text: 'Who was the historic leader who applied Satya (Truth) and Ahimsa (Non-violence) as a global philosophy to achieve freedom and inspire civil rights?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mahatma Gandhi',
      'Alexander the Great',
      'Julius Caesar',
      'Napoleon Bonaparte'
    ],
    correctAnswer: 'Mahatma Gandhi',
    explanation: 'Mahatma Gandhi mobilized millions using Satyagraha (holding onto truth through non-violent resistance), inspiring leaders worldwide including Martin Luther King Jr. and Nelson Mandela.',
    socraticHint: 'Which iconic advocate of peaceful resistance called his path Satyagraha (truth-force)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-006',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What balanced guideline for truthful speech is taught in the Manusmriti (4:138)?',
    text: 'What balanced guideline for truthful speech is taught in the Manusmriti (4:138)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Satyam bruyat, priyam bruyat, na bruyat satyam apriyam" (Speak truth that is agreeable and beneficial; do not utter truth harshly or cruelly)',
      'Speak whatever comes to your mind without thinking',
      'Lie whenever it makes your friends happy',
      'Remain completely silent for your entire life'
    ],
    correctAnswer: '"Satyam bruyat, priyam bruyat, na bruyat satyam apriyam" (Speak truth that is agreeable and beneficial; do not utter truth harshly or cruelly)',
    explanation: 'Truth must be seasoned with kindness; blunt cruelty disguised as honesty harms others. One must speak truth in a compassionate, constructive manner.',
    socraticHint: 'How should truth be delivered: with compassionate kindness or with blunt cruelty?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-007',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How does practicing Satya (truthfulness) manifest in a pupil\'s academic life at school?',
    text: 'How does practicing Satya (truthfulness) manifest in a pupil\'s academic life at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Refusing to cheat on exams, submitting genuine personal work, and admitting mistakes honestly to teachers and parents',
      'Copying arithmetic answers from a neighbor’s desk',
      'Inventing fake stories about why homework is missing',
      'Changing test marks with a pen before showing parents'
    ],
    correctAnswer: 'Refusing to cheat on exams, submitting genuine personal work, and admitting mistakes honestly to teachers and parents',
    explanation: 'Academic truthfulness requires submitting one\'s own honest effort, avoiding cheating or plagiarism, and taking personal responsibility for mistakes.',
    socraticHint: 'Which behaviors represent genuine honesty and academic integrity during quizzes and homework?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-008',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'Why does the practice of Ahimsa lead many Hindus to adopt a vegetarian lifestyle?',
    text: 'Why does the practice of Ahimsa lead many Hindus to adopt a vegetarian lifestyle?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Out of compassion for innocent animals and reverence for the divine Atman (soul) present in all sentient creatures',
      'Because plant food is always free of cost',
      'Because they are physically unable to digest cooked food',
      'Because the government bans eating meat'
    ],
    correctAnswer: 'Out of compassion for innocent animals and reverence for the divine Atman (soul) present in all sentient creatures',
    explanation: 'Vegetarianism is an expression of Ahimsa: refusing to cause suffering or take animal life when nutritious plant-based foods are abundantly available.',
    socraticHint: 'How does compassionate refusal to kill or cause pain to animals connect directly to Ahimsa?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-009',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How can Kenyan pupils oppose school bullying using the moral strength of Ahimsa?',
    text: 'How can Kenyan pupils oppose school bullying using the moral strength of Ahimsa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By refusing to participate in mocking, standing up peacefully to defend the victim, and alerting a teacher or counselor calmly and bravely',
      'By joining the bullies to avoid being picked on',
      'By organizing a violent gang fight after school hours',
      'By filming the bullying on phones and sharing it on social media'
    ],
    correctAnswer: 'By refusing to participate in mocking, standing up peacefully to defend the victim, and alerting a teacher or counselor calmly and bravely',
    explanation: 'Ahimsa is not passive cowardice; it is active moral courage that shields the vulnerable, rejects cruel peer pressure, and uses peaceful intervention.',
    socraticHint: 'How does standing up for a bullied classmate bravely and peacefully demonstrate real courage?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-010',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What happens to a person’s peace of mind when they tell a lie compared to when they speak the truth?',
    text: 'What happens to a person’s peace of mind when they tell a lie compared to when they speak the truth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Lies cause constant anxiety, fear of discovery, and guilt, whereas truth produces inner freedom, self-respect, and clear conscience',
      'Lies bring permanent relaxation to the mind',
      'Truth makes a person lose their memory',
      'There is no emotional difference between honesty and dishonesty'
    ],
    correctAnswer: 'Lies cause constant anxiety, fear of discovery, and guilt, whereas truth produces inner freedom, self-respect, and clear conscience',
    explanation: 'A lie forces a person to fabricate further falsehoods and live in persistent fear, while Satya cleanses the mind of guilt and preserves mental serenity.',
    socraticHint: 'How does speaking the truth set your mind free from fear of being caught in a lie?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-011',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'In digital communications (messaging and social media), what constitutes practicing Satya and Ahimsa for young learners?',
    text: 'In digital communications (messaging and social media), what constitutes practicing Satya and Ahimsa for young learners?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Verifying facts before sharing messages, refusing to forward cruel rumors or fake news, and using courteous, polite language online',
      'Creating anonymous accounts to post nasty insults about teachers',
      'Forwarding chain messages threatening bad luck',
      'Sharing private photos of classmates without permission'
    ],
    correctAnswer: 'Verifying facts before sharing messages, refusing to forward cruel rumors or fake news, and using courteous, polite language online',
    explanation: 'Digital Ahimsa and Satya mean refraining from cyberbullying, refusing to spread disinformation, and treating people with kindness behind screens.',
    socraticHint: 'How do truth and kindness apply to what you post, type, and forward on phones and computers?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-012',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'Why does Mahatma Gandhi\'s legacy of non-violence continue to hold immense relevance for peace building in Kenya today?',
    text: 'Why does Mahatma Gandhi\'s legacy of non-violence continue to hold immense relevance for peace building in Kenya today?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It shows that national problems, ethnic disputes, and political rivalries are solved through peaceful dialogue, reconciliation, and mutual respect rather than violent conflict',
      'It suggests that people should avoid voting in national elections',
      'It proves that peaceful nations never build schools',
      'It implies that disputes can only be settled in foreign courts'
    ],
    correctAnswer: 'It shows that national problems, ethnic disputes, and political rivalries are solved through peaceful dialogue, reconciliation, and mutual respect rather than violent conflict',
    explanation: 'Ahimsa provides the foundation for national cohesion: resolving disputes through negotiation, celebrating diversity, and choosing non-violent reconciliation.',
    socraticHint: 'How does peaceful dialogue rather than violence protect Kenya\'s national stability and development?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },

  // --- Unit 7 Lesson 2: Integrity of Asteya and Aparigraha Quest (q-g5-hre-u7-013 to 024) ---
  {
    id: 'q-g5-hre-u7-013',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What does the moral restraint "Asteya" mean in Hindu ethics?',
    text: 'What does the moral restraint "Asteya" mean in Hindu ethics?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Non-stealing (refraining from taking or desiring what belongs to another person)',
      'Speaking very quickly',
      'Wearing white clothes to temple',
      'Living alone in the mountains'
    ],
    correctAnswer: 'Non-stealing (refraining from taking or desiring what belongs to another person)',
    explanation: '"Steya" means theft; "Asteya" is the virtue of non-stealing in action, word, and desire—respecting others\' belongings and property.',
    socraticHint: 'Which English term meaning "non-stealing" directly defines the Sanskrit word Asteya?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-014',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How does a learner practice Asteya (non-stealing) in terms of "intellectual property" at school?',
    text: 'How does a learner practice Asteya (non-stealing) in terms of "intellectual property" at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By not copying another pupil\'s essay or answers and giving proper credit when referencing books or websites',
      'By borrowing a classmate\'s book and never returning it',
      'By claiming someone else\'s artwork as their own to win a prize',
      'By hiding pencils belonging to other students'
    ],
    correctAnswer: 'By not copying another pupil\'s essay or answers and giving proper credit when referencing books or websites',
    explanation: 'Plagiarism and cheating are forms of intellectual theft. Asteya demands honesty in academic work, acknowledging sources and relying on one\'s own efforts.',
    socraticHint: 'How does respecting other people\'s ideas, writing, and artwork fulfill the virtue of non-stealing?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-015',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What does the virtue of "Brahmacharya" mean for a school-going pupil?',
    text: 'What does the virtue of "Brahmacharya" mean for a school-going pupil?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Self-discipline, purity of mind, and focusing physical and mental energy on education, sports, and spiritual growth',
      'Refusing to play sports with friends',
      'Eating only cold rice every day',
      'Never speaking to family members'
    ],
    correctAnswer: 'Self-discipline, purity of mind, and focusing physical and mental energy on education, sports, and spiritual growth',
    explanation: 'In the student stage of life (Brahmacharya Ashrama), Brahmacharya represents dedication to learning, self-control, mental purity, and avoidance of wasteful habits.',
    socraticHint: 'How does channeling energy into focused study and moral self-control help students achieve their goals?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-016',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What is the literal meaning and practice of "Aparigraha"?',
    text: 'What is the literal meaning and practice of "Aparigraha"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Non-possessiveness and non-greed (contentment with taking only what is needed and avoiding hoarding)',
      'Spending all money on luxury jewelry',
      'Collecting more clothes than anyone else',
      'Refusing to share food with anyone'
    ],
    correctAnswer: 'Non-possessiveness and non-greed (contentment with taking only what is needed and avoiding hoarding)',
    explanation: 'Aparigraha means non-hoarding and non-attachment. It teaches that excessive material accumulation creates anxiety, while simple living fosters inner freedom.',
    socraticHint: 'Which term means non-possessiveness, freedom from greed, and simple contentment?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-017',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What famous quote from Mahatma Gandhi expresses the core philosophy of Aparigraha regarding planetary resources?',
    text: 'What famous quote from Mahatma Gandhi expresses the core philosophy of Aparigraha regarding planetary resources?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"The Earth provides enough to satisfy every person\'s need, but not every person\'s greed"',
      '"Whoever has the most gold makes the rules"',
      '"Machines should replace all natural forests"',
      '"Only wealthy nations deserve clean water"'
    ],
    correctAnswer: '"The Earth provides enough to satisfy every person\'s need, but not every person\'s greed"',
    explanation: 'Gandhi summarized Aparigraha eloquently: nature’s abundance satisfies legitimate human need, but cannot sustain selfish, boundless greed and overconsumption.',
    socraticHint: 'Which quote contrasts meeting human "need" versus satisfying human "greed"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-018',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How does practicing Aparigraha (non-greed) protect Kenya\'s forests and natural resources from destruction?',
    text: 'How does practicing Aparigraha (non-greed) protect Kenya\'s forests and natural resources from destruction?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It curbs illegal logging, excessive land-grabbing, and wildlife poaching driven by selfish greed, preserving ecosystems for future generations',
      'It prevents farmers from planting food crops',
      'It encourages buying thousands of paper notebooks',
      'It requires people to build wooden houses only'
    ],
    correctAnswer: 'It curbs illegal logging, excessive land-grabbing, and wildlife poaching driven by selfish greed, preserving ecosystems for future generations',
    explanation: 'Environmental destruction stems from greed (Lobha). Aparigraha teaches that nature belongs to all creation, directly countering selfish exploitation and illegal harvesting.',
    socraticHint: 'How does stopping selfish greed prevent illegal logging and deforestation in Kenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-019',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What inner virtue is cultivated when a pupil embraces "Santosha" (contentment), which is closely linked to Aparigraha?',
    text: 'What inner virtue is cultivated when a pupil embraces "Santosha" (contentment), which is closely linked to Aparigraha?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Inner peace and joy with what one has, free from jealousy, envy of classmates\' possessions, and constant complaints',
      'An intense desire to buy expensive imported shoes',
      'Anger whenever someone else gets a good mark',
      'Refusing to say thank you for meals'
    ],
    correctAnswer: 'Inner peace and joy with what one has, free from jealousy, envy of classmates\' possessions, and practical gratitude',
    explanation: 'Santosha (contentment) brings genuine happiness: appreciating blessings without being tormented by jealousy or constantly begging parents for unnecessary luxury items.',
    socraticHint: 'How does contentment (Santosha) free our minds from jealousy and complaining?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-020',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How can a pupil apply Asteya (non-stealing) regarding other people\'s time at school?',
    text: 'How can a pupil apply Asteya (non-stealing) regarding other people\'s time at school?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By being punctual to classes, meetings, and games, rather than keeping teachers and group members waiting wastefully',
      'By arriving thirty minutes late to every assembly',
      'By hiding the school bell from the security guard',
      'By refusing to look at clocks'
    ],
    correctAnswer: 'By being punctual to classes, meetings, and games, rather than keeping teachers and group members waiting wastefully',
    explanation: 'Time is irreplaceable. Stealing other people\'s valuable time through chronic lateness or disruption is a subtle violation of Asteya; punctuality demonstrates respect.',
    socraticHint: 'Why is being on time an act of respecting and not stealing other people\'s valuable time?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-021',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What happens to a community when public officials violate Asteya and engage in bribery and embezzlement of public funds?',
    text: 'What happens to a community when public officials violate Asteya and engage in bribery and embezzlement of public funds?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Schools and hospitals lack medicines and books, roads remain broken, poverty increases, and trust in society collapses',
      'The country automatically becomes peaceful and wealthy',
      'All citizens receive bonus money from banks',
      'Food prices decrease across all counties'
    ],
    correctAnswer: 'Schools and hospitals lack medicines and books, roads remain broken, poverty increases, and trust in society collapses',
    explanation: 'Corruption and embezzlement are grave violations of Asteya that rob the public treasury, depriving schools, clinics, and citizens of essential infrastructure.',
    socraticHint: 'How does corruption and theft of public funds deprive citizens of good schools, clinics, and roads?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-022',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'How does practicing Brahmacharya (self-control) protect a pupil from modern digital addictions (such as excessive video games or social media)?',
    text: 'How does practicing Brahmacharya (self-control) protect a pupil from modern digital addictions (such as excessive video games or social media)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It develops personal willpower to set healthy boundaries, limiting screen time to prioritize homework, family time, physical exercise, and sleep',
      'It means pupils should destroy all electronic devices',
      'It allows pupils to play video games all night before exams',
      'It replaces all school books with television shows'
    ],
    correctAnswer: 'It develops personal willpower to set healthy boundaries, limiting screen time to prioritize homework, family time, physical exercise, and sleep',
    explanation: 'Brahmacharya empowers the mind with mastery over impulses, ensuring that digital tools are used purposefully for education rather than mindlessly wasting life.',
    socraticHint: 'How does self-control help you switch off games and phones to finish studies and get good rest?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-023',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'In a school environment, what is the direct benefit of practicing the Five Yamas collectively as a class?',
    text: 'In a school environment, what is the direct benefit of practicing the Five Yamas collectively as a class?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The classroom becomes a safe, joyful sanctuary of mutual trust, academic excellence, zero bullying, and warm friendship',
      'Students never need to study for examinations',
      'School fees are completely canceled by the government',
      'Classrooms never need to be cleaned by pupils'
    ],
    correctAnswer: 'The classroom becomes a safe, joyful sanctuary of mutual trust, academic excellence, zero bullying, and warm friendship',
    explanation: 'When students practice non-violence, truth, honesty, self-control, and sharing, fear and jealousy vanish, allowing all learners to thrive in safety and happiness.',
    socraticHint: 'What peaceful, trusting atmosphere emerges when all classmates practice truth, kindness, and honesty together?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },
  {
    id: 'q-g5-hre-u7-024',
    subStrandId: 'substrand-g5-hre-u7',
    prompt: 'What ultimate character outcome is developed in a young Kenyan citizen who internalizes all Five Yamas from Grade 5?',
    text: 'What ultimate character outcome is developed in a young Kenyan citizen who internalizes all Five Yamas from Grade 5?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'An incorruptible, compassionate, disciplined, and courageous leader who serves society with integrity and respects all creation',
      'A wealthy person who only cares about personal luxuries',
      'Someone who fears meeting people from other ethnic backgrounds',
      'A person who avoids hard work and responsibilities'
    ],
    correctAnswer: 'An incorruptible, compassionate, disciplined, and courageous leader who serves society with integrity and respects all creation',
    explanation: 'Internalizing Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha builds the gold standard of ethical character: honest, kind, and just leaders who elevate Kenya.',
    socraticHint: 'How do these five moral disciplines form honest, brave, and compassionate leaders for our nation?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U7'
  },

  // --- Unit 8 Lesson 1: Deva and Rishi Sacred Gratitude Quest (q-g5-hre-u8-001 to 012) ---
  {
    id: 'q-g5-hre-u8-001',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What does the term "Pancha Mahayajna" signify in Hindu scriptures?',
    text: 'What does the term "Pancha Mahayajna" signify in Hindu scriptures?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Five Great Daily Duties of sacred gratitude and selfless service',
      'Five ancient military battles fought in Kurukshetra',
      'Five kinds of sweet fruits harvested in autumn',
      'Five musical ragas played at midnight'
    ],
    correctAnswer: 'The Five Great Daily Duties of sacred gratitude and selfless service',
    explanation: '"Pancha" means five, "Maha" means great, and "Yajna" means sacred sacrifice/duty of gratitude owed by every person to the cosmos, society, and nature.',
    socraticHint: 'Which phrase translates to the "Five Great Sacrifices or Duties" of daily gratitude?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-002',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What are the names of the five daily duties comprising the Pancha Mahayajna?',
    text: 'What are the names of the five daily duties comprising the Pancha Mahayajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Deva Yajna, Rishi Yajna, Pitru Yajna, Manushya Yajna, and Bhuta Yajna',
      'Satya, Ahimsa, Asteya, Brahmacharya, and Aparigraha',
      'Rig, Sama, Yajur, Atharva, and Vedanta',
      'Matsya, Kurma, Varaha, Narasimha, and Vamana'
    ],
    correctAnswer: 'Deva Yajna, Rishi Yajna, Pitru Yajna, Manushya Yajna, and Bhuta Yajna',
    explanation: 'The five sacred duties are to the Divine (Deva), the Sages/Teachers (Rishi), Parents/Ancestors (Pitru), Fellow Humans (Manushya), and Animals/Nature (Bhuta).',
    socraticHint: 'Which list contains duties to gods, sages, parents, humans, and creatures?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-003',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What is the purpose of performing "Deva Yajna" each day?',
    text: 'What is the purpose of performing "Deva Yajna" each day?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To express heartfelt gratitude to Paramatma and cosmic natural forces (sun, air, rain, fire) that sustain our life',
      'To demand that God grant us a winning lottery ticket',
      'To show off our vocal singing skills to neighbors',
      'To replace the need to eat lunch'
    ],
    correctAnswer: 'To express heartfelt gratitude to Paramatma and cosmic natural forces (sun, air, rain, fire) that sustain our life',
    explanation: 'Deva Yajna acknowledges our total dependence on divine grace and cosmic powers (light, oxygen, heat, water), offering worship and prayers of thanksgiving.',
    socraticHint: 'How does daily prayer to God acknowledge our gratitude for life, sunlight, clean air, and water?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-004',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How can a Grade 5 pupil simply and sincerely perform Deva Yajna at home each morning?',
    text: 'How can a Grade 5 pupil simply and sincerely perform Deva Yajna at home each morning?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By lighting a small oil lamp (Deepak), offering a fresh flower or clean water, and reciting a morning prayer of gratitude with a pure heart',
      'By throwing stones at the morning sun',
      'By refusing to wash hands or face',
      'By arguing loudly with siblings before breakfast'
    ],
    correctAnswer: 'By lighting a small oil lamp (Deepak), offering a fresh flower or clean water, and reciting a morning prayer of gratitude with a pure heart',
    explanation: 'The Bhagavad Gita states that offering a simple leaf, flower, fruit, or water with sincere devotion is accepted by the Divine as true Deva Yajna.',
    socraticHint: 'What simple, pure offerings of a lamp, water, and heartfelt prayer fulfill morning Deva Yajna?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-005',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What is "Rishi Yajna" (also known as Brahma Yajna) and why is it performed?',
    text: 'What is "Rishi Yajna" (also known as Brahma Yajna) and why is it performed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is the duty of gratitude to ancient sages, scientists, and teachers who discovered knowledge, fulfilled through daily study and learning',
      'It is an offering made only by forest hermits who never speak',
      'It is a tax paid to the municipal city council',
      'It is a dance performed around a campfire'
    ],
    correctAnswer: 'It is the duty of gratitude to ancient sages, scientists, and teachers who discovered knowledge, fulfilled through daily study and learning',
    explanation: 'Rishi Yajna honors the Rishis who gifted us language, mathematics, medicine, and philosophy; we repay this debt by studying diligently and passing on wisdom.',
    socraticHint: 'How does reading books, studying diligently, and respecting teachers honor ancient sages (Rishis)?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-006',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How does a pupil actively fulfill Rishi Yajna in their everyday school life?',
    text: 'How does a pupil actively fulfill Rishi Yajna in their everyday school life?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By paying close attention in class, reading books with enthusiasm, respecting teachers, and helping classmates understand difficult subjects',
      'By tearing pages out of library books',
      'By skipping classes to play video games',
      'By disrespecting teachers when they give homework'
    ],
    correctAnswer: 'By paying close attention in class, reading books with enthusiasm, respecting teachers, and helping classmates understand difficult subjects',
    explanation: 'Every moment dedicated to studying, reading, mastering skills, and sharing knowledge is an act of Rishi Yajna that honors our intellectual heritage.',
    socraticHint: 'Which educational habits of attention, reading, and helping peers fulfill the duty of honoring knowledge?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-007',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What traditional practice of "Svadhyaya" forms an essential part of Rishi Yajna?',
    text: 'What traditional practice of "Svadhyaya" forms an essential part of Rishi Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Self-study and reflective reading of inspiring scriptures, ethical literature, and beneficial knowledge every day',
      'Watching commercial advertisements on television',
      'Sleeping through the morning hours',
      'Arguing with friends about sports scores'
    ],
    correctAnswer: 'Self-study and reflective reading of inspiring scriptures, ethical literature, and beneficial knowledge every day',
    explanation: 'Svadhyaya is the sacred habit of daily personal study and reflection on wisdom texts, nourishing the intellect and building moral character.',
    socraticHint: 'Which Sanskrit word meaning "self-study" refers to daily reflective reading of wisdom literature?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-008',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'Why does Hindu philosophy view knowledge (Vidya) as a sacred trust that must be shared freely rather than hoarded?',
    text: 'Why does Hindu philosophy view knowledge (Vidya) as a sacred trust that must be shared freely rather than hoarded?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because knowledge is the only wealth that increases when shared and decreases when hoarded, benefiting the entire community',
      'Because books take up too much physical space on shelves',
      'Because students forget everything after taking tests anyway',
      'Because knowledge has no real value in practical life'
    ],
    correctAnswer: 'Because knowledge is the only wealth that increases when shared and decreases when hoarded, benefiting the entire community',
    explanation: 'A classic Sanskrit Subhashita declares: "The wealth of knowledge (Vidya Dhanam) is supreme among all wealth; the more you give it away, the more it grows."',
    socraticHint: 'Does sharing knowledge with others diminish your own understanding or deepen and multiply it?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-009',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'In the sacred ritual of Havan (fire ceremony), what do the fragrant herbs (Samagri) offered into the fire symbolize during Deva Yajna?',
    text: 'In the sacred ritual of Havan (fire ceremony), what do the fragrant herbs (Samagri) offered into the fire symbolize during Deva Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Surrendering selfish desires, purifying the atmospheric air, and returning natural gifts back to cosmic forces with gratitude',
      'Disposing of garden trash quickly',
      'Creating thick black smoke to block sunlight',
      'Cooking food for sale in the market'
    ],
    correctAnswer: 'Surrendering selfish desires, purifying the atmospheric air, and returning natural gifts back to cosmic forces with gratitude',
    explanation: 'The fragrant herbal offerings purify the atmosphere and symbolize offering our personal ego and attachments into the flame of divine wisdom.',
    socraticHint: 'How does offering fragrant herbs into sacred fire symbolize returning natural blessings to the cosmos with gratitude?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-010',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How does honoring Rishi Yajna inspire Kenyan pupils to appreciate scientists and educators who developed modern vaccines and agriculture?',
    text: 'How does honoring Rishi Yajna inspire Kenyan pupils to appreciate scientists and educators who developed modern vaccines and agriculture?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It develops profound gratitude for all pioneers of knowledge—doctors, agronomists, and inventors—whose discoveries improve human health and food security',
      'It suggests that modern science has no connection to human welfare',
      'It implies that only ancient books matter and modern science should be ignored',
      'It teaches pupils to avoid studying natural sciences'
    ],
    correctAnswer: 'It develops profound gratitude for all pioneers of knowledge—doctors, agronomists, and inventors—whose discoveries improve human health and food security',
    explanation: 'Rishi Yajna encompasses gratitude to all seekers and pioneers of knowledge across human history whose discoveries protect life and advance civilization.',
    socraticHint: 'How does gratitude to all discoverers of medicine and science help us value health and education in Kenya?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-011',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What reverent attitude towards teachers (Gurus) is commanded in the Taittiriya Upanishad during Rishi Yajna?',
    text: 'What reverent attitude towards teachers (Gurus) is commanded in the Taittiriya Upanishad during Rishi Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Acharya Devo Bhava" (Revere your teacher as a representative of divine wisdom and guidance)',
      '"Treat the teacher as an ordinary hired worker"',
      '"Argue with the teacher at all times"',
      '"Ignore the advice of the teacher outside the classroom"'
    ],
    correctAnswer: '"Acharya Devo Bhava" (Revere your teacher as a representative of divine wisdom and guidance)',
    explanation: '"Acharya Devo Bhava" commands treating one\'s teacher with the utmost honor, recognizing that the Guru removes the darkness of ignorance and guides the student to light.',
    socraticHint: 'Which Sanskrit commandment states that one should revere the teacher (Acharya) as divine?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-012',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'Why does starting the day with Deva Yajna and Rishi Yajna transform a student\'s mindset toward their studies?',
    text: 'Why does starting the day with Deva Yajna and Rishi Yajna transform a student\'s mindset toward their studies?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It transforms schooling from a boring chore into a sacred, joyous journey of gratitude, purposeful learning, and character building',
      'It makes homework disappear automatically',
      'It ensures the pupil never has to answer questions in class',
      'It guarantees that school days are shortened to two hours'
    ],
    correctAnswer: 'It transforms schooling from a boring chore into a sacred, joyous journey of gratitude, purposeful learning, and character building',
    explanation: 'When education is viewed through the lens of Yajna, learning becomes an inspiring spiritual privilege and duty to discover truth and serve society.',
    socraticHint: 'How does viewing learning as a sacred privilege of gratitude make studying enjoyable and purposeful?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },

  // --- Unit 8 Lesson 2: Pitru, Manushya and Bhuta Compassion Quest (q-g5-hre-u8-013 to 024) ---
  {
    id: 'q-g5-hre-u8-013',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What is the purpose of performing "Pitru Yajna" in the daily life of a Hindu?',
    text: 'What is the purpose of performing "Pitru Yajna" in the daily life of a Hindu?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To express lifelong gratitude, loving service, and honor to parents, elders, and departed ancestors',
      'To build a large stone monument in the village square',
      'To demand that parents buy expensive gifts for children',
      'To avoid doing household chores'
    ],
    correctAnswer: 'To express lifelong gratitude, loving service, and honor to parents, elders, and departed ancestors',
    explanation: 'Pitru Yajna is the sacred duty of repaying the debt to parents and ancestors who gave us our physical bodies, heritage, and loving care throughout our vulnerable childhood.',
    socraticHint: 'Which sacred daily duty focuses on honoring and serving parents and ancestors?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-014',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What foundational commandments regarding reverence for parents are taught in the Taittiriya Upanishad?',
    text: 'What foundational commandments regarding reverence for parents are taught in the Taittiriya Upanishad?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Matru Devo Bhava" (Revere your mother as divine) and "Pitru Devo Bhava" (Revere your father as divine)',
      '"Revere your wealth as divine"',
      '"Revere your chariot as divine"',
      '"Revere only your own ego as divine"'
    ],
    correctAnswer: '"Matru Devo Bhava" (Revere your mother as divine) and "Pitru Devo Bhava" (Revere your father as divine)',
    explanation: 'The Taittiriya Upanishad commands the student upon graduation: "Matru Devo Bhava, Pitru Devo Bhava"—treating mother and father with supreme veneration.',
    socraticHint: 'Which famous Upanishadic phrases instruct us to treat mother and father as divine?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-015',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How does a Grade 5 pupil practically perform Pitru Yajna at home in Kenya?',
    text: 'How does a Grade 5 pupil practically perform Pitru Yajna at home in Kenya?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By obeying parents willingly, assisting with household tasks cheerfully, speaking with polite respect, and touching elders\' feet (Charan Sparsh) to seek blessings',
      'By demanding money and refusing to help clean the house',
      'By shouting at grandparents when asked to run an errand',
      'By slamming bedroom doors during disagreements'
    ],
    correctAnswer: 'By obeying parents willingly, assisting with household tasks cheerfully, speaking with polite respect, and touching elders\' feet (Charan Sparsh) to seek blessings',
    explanation: 'Practical Pitru Yajna involves daily acts of helpfulness, respectful communication, listening to guidance, and seeking elders\' blessings with humility.',
    socraticHint: 'What everyday respectful actions—helping with chores, polite speech, and seeking blessings—honor parents at home?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-016',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What is the sacred daily duty of "Manushya Yajna" (also known as Nri Yajna)?',
    text: 'What is the sacred daily duty of "Manushya Yajna" (also known as Nri Yajna)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Serving fellow human beings through hospitality, feeding guests, helping the poor, and performing community Sewa',
      'Collecting coins in a private bank account',
      'Traveling abroad on luxury holidays',
      'Writing long essays about oneself'
    ],
    correctAnswer: 'Serving fellow human beings through hospitality, feeding guests, helping the poor, and performing community Sewa',
    explanation: 'Manushya Yajna is the duty to humanity: welcoming guests (Atithi Devo Bhava), sharing food with hungry strangers, helping widows and orphans, and uplifting the underprivileged.',
    socraticHint: 'Which duty commands selfless service (Sewa), feeding the hungry, and hospitable care for fellow humans?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-017',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What famous Hindu ideal embodies the spirit of Manushya Yajna regarding hospitality to visitors and strangers?',
    text: 'What famous Hindu ideal embodies the spirit of Manushya Yajna regarding hospitality to visitors and strangers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Atithi Devo Bhava" (Treat the unexpected guest/visitor as a representative of the Divine)',
      '"Lock the gate whenever a visitor arrives"',
      '"Charge visitors a fee before opening the door"',
      '"Only welcome guests who bring expensive presents"'
    ],
    correctAnswer: '"Atithi Devo Bhava" (Treat the unexpected guest/visitor as a representative of the Divine)',
    explanation: '"Atithi Devo Bhava" establishes the ancient duty of hospitality: welcoming any guest with clean water, nourishing food, a seat, and warm words regardless of their background.',
    socraticHint: 'Which Upanishadic teaching commands that a guest (Atithi) be treated as divine?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-018',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What is the sacred daily duty of "Bhuta Yajna"?',
    text: 'What is the sacred daily duty of "Bhuta Yajna"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Demonstrating compassion, care, and food sharing with animals, birds, insects, and protecting the plant environment',
      'Fighting imaginary ghosts in the dark',
      'Hunting wild animals for trophy displays',
      'Cutting down old trees in public parks'
    ],
    correctAnswer: 'Demonstrating compassion, care, and food sharing with animals, birds, insects, and protecting the plant environment',
    explanation: 'Bhuta Yajna recognizes that all living beings share the earth; it involves feeding animals, birds, and insects, watering trees, and safeguarding natural habitats.',
    socraticHint: 'Which duty extends daily kindness, food, and water to birds, animals, and trees?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-019',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What traditional daily practice in Hindu homes fulfills Bhuta Yajna before the family eats their midday meal?',
    text: 'What traditional daily practice in Hindu homes fulfills Bhuta Yajna before the family eats their midday meal?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Setting aside the first portion of cooked food (Bali) outside for cows, stray dogs, birds, and ants before humans eat',
      'Sprinkling salt across the entire garden',
      'Locking pets inside a small cage without water',
      'Throwing leftover food into plastic trash bags'
    ],
    correctAnswer: 'Setting aside the first portion of cooked food (Bali) outside for cows, stray dogs, birds, and ants before humans eat',
    explanation: 'Before partaking of a meal, offering a portion of grain or bread to birds, cows, and creatures outside ensures that humans never eat selfishly without feeding fellow creatures.',
    socraticHint: 'How does setting aside the first portion of food for birds and animals ensure we share nature\'s bounty?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-020',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'During hot and dry seasons in Kenyan towns like Garissa, Isiolo, or Mombasa, how can children practice Bhuta Yajna?',
    text: 'During hot and dry seasons in Kenyan towns like Garissa, Isiolo, or Mombasa, how can children practice Bhuta Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By placing shallow bowls of clean water in shaded compound spots for thirsty birds and domestic animals and planting shade trees',
      'By chasing thirsty birds away with sticks',
      'By wasting clean water by pouring it onto hot tarmac roads',
      'By catching stray kittens and abandoning them in the forest'
    ],
    correctAnswer: 'By placing shallow bowls of clean water in shaded compound spots for thirsty birds and domestic animals and planting shade trees',
    explanation: 'Providing water dishes for birds and animals during arid weather saves vulnerable lives from dehydration, fulfilling practical Bhuta Yajna in the Kenyan climate.',
    socraticHint: 'How does putting out water dishes in the shade save birds and small animals during hot dry weather?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-021',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'In Nairobi and Mombasa, how do Hindu charitable organizations put Manushya Yajna into action for the wider Kenyan public?',
    text: 'In Nairobi and Mombasa, how do Hindu charitable organizations put Manushya Yajna into action for the wider Kenyan public?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By running free medical eye cataract camps, drilling community water boreholes, donating wheelchairs, and funding public school classrooms',
      'By providing services exclusively to their own relatives',
      'By selling expensive souvenirs at city roundabouts',
      'By organizing closed social clubs that exclude the public'
    ],
    correctAnswer: 'By running free medical eye cataract camps, drilling community water boreholes, donating wheelchairs, and funding public school classrooms',
    explanation: 'Kenyan Hindu institutions (like Hindu Council of Kenya, Lions, SSDN) live out Manushya Yajna through extensive public philanthropy: free eye surgeries, relief food, and school bursaries.',
    socraticHint: 'Which widespread humanitarian services—free eye camps, clean water boreholes, and school bursaries—benefit all Kenyans?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-022',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'What warning does the Bhagavad Gita (3:13) give to a person who cooks food and eats solely for their own selfish enjoyment without performing Yajna?',
    text: 'What warning does the Bhagavad Gita (3:13) give to a person who cooks food and eats solely for their own selfish enjoyment without performing Yajna?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They "eat only sin" (Bhoojate te tvagham papa ye pachanty-atma-karanat), because they fail to share with God, society, and creatures',
      'They will become world champions in sports',
      'They will be granted a golden palace',
      'Their food will taste twice as delicious'
    ],
    correctAnswer: 'They "eat only sin" (Bhoojate te tvagham papa ye pachanty-atma-karanat), because they fail to share with God, society, and creatures',
    explanation: 'The Gita warns that eating purely for selfish gratification while ignoring the hungry and nature amounts to eating sin, whereas eating food sanctified by sharing brings spiritual purity.',
    socraticHint: 'What severe spiritual warning does Lord Krishna give against preparing food purely for oneself without sharing?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-023',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How does performing all five duties of the Pancha Mahayajna overcome selfishness (Ahamkara) in a growing child?',
    text: 'How does performing all five duties of the Pancha Mahayajna overcome selfishness (Ahamkara) in a growing child?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It constantly reminds the child that their existence is sustained by God, parents, teachers, society, and nature, cultivating deep humility and selfless service',
      'It teaches the child that they are superior to everyone else',
      'It isolates the child from having fun with friends',
      'It makes the child dependent on others for everything'
    ],
    correctAnswer: 'It constantly reminds the child that their existence is sustained by God, parents, teachers, society, and nature, cultivating deep humility and selfless service',
    explanation: 'The five daily duties shatter egoism by anchoring life in gratitude: recognizing that we owe our very survival to the ongoing blessings of creation, parents, and community.',
    socraticHint: 'How does daily gratitude to God, teachers, parents, people, and animals dissolve selfish pride?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  },
  {
    id: 'q-g5-hre-u8-024',
    subStrandId: 'substrand-g5-hre-u8',
    prompt: 'How does the comprehensive philosophy of the Pancha Mahayajna contribute to the national values of the Kenyan Constitution (Article 10)?',
    text: 'How does the comprehensive philosophy of the Pancha Mahayajna contribute to the national values of the Kenyan Constitution (Article 10)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It directly reinforces national values of human dignity, social justice, sharing of resources, protection of the vulnerable, and environmental sustainability',
      'It encourages citizens to ignore national laws',
      'It suggests that public resources should be monopolized by a few individuals',
      'It rejects community cooperation in national development'
    ],
    correctAnswer: 'It directly reinforces national values of human dignity, social justice, sharing of resources, protection of the vulnerable, and environmental sustainability',
    explanation: 'The five sacred duties provide a moral foundation for civic citizenship: caring for elders, promoting social equity, protecting animals and environment, and fostering national harmony.',
    socraticHint: 'How does practicing duties of gratitude to society and nature align with Kenya\'s constitutional values of dignity and environmental protection?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-HRE-U8'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 4 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
