/**
 * Grade 6 Hindu Religious Education (HRE) - Batch 1 Generator
 * Content: Units 1 & 2 (Paramatma & The Trimurti; Law of Karma, Rebirth & Moksha)
 * Missions: Orders 149, 150, 151, 152 (world-faith-values)
 * Questions: 48 (24 per unit: q-g6-hre-u1-001 to q-g6-hre-u2-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 HRE Batch 1 (Units 1 & 2) ---');

// 1. Units 1 & 2 (subStrands)
const subStrands = [
  {
    id: 'substrand-g6-hre-u1',
    strandId: 'strand-g6-hre-paramatma',
    learningAreaId: 'la-hre-g6',
    title: 'Paramatma: Attributes, Omnipresence & The Trimurti (Brahma, Vishnu, Shiva)',
    name: 'Paramatma: Attributes, Omnipresence & The Trimurti (Brahma, Vishnu, Shiva)',
    description: 'The supreme nature and cosmic manifestations of the Divine: Paramatma as the one eternal, formless, infinite reality (Nirguna Brahman) and manifesting with loving divine attributes and forms (Saguna Brahman / Ishvara); core attributes of Sat-Chit-Ananda (Truth, Consciousness, Bliss), Sarvavyapi (omnipresent), Sarvajna (omniscient), and Sarvashaktiman (omnipotent); the Trimurti and their divine cosmic functions: Lord Brahma (Srishti - Creation) with Consort Saraswati (knowledge and wisdom), Lord Vishnu (Sthiti - Preservation, sustenance, protection of Dharma) with Consort Lakshmi (prosperity and auspiciousness), and Lord Shiva (Laya/Samhara - Regeneration, dissolution, transformation) with Consort Parvati/Durga (strength and divine energy); understanding cosmic balance and unity in divine diversity.',
    cbeCompetency: 'Theological inquiry, philosophical reasoning, reverence for divine diversity, and cosmic appreciation',
    estimatedMinutes: 30,
    order: 1,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-hre-u2',
    strandId: 'strand-g6-hre-paramatma',
    learningAreaId: 'la-hre-g6',
    title: 'The Law of Karma, Rebirth (Samsara) & Spiritual Liberation (Moksha)',
    name: 'The Law of Karma, Rebirth (Samsara) & Spiritual Liberation (Moksha)',
    description: 'The infallible spiritual laws governing the universe and individual souls: The Law of Karma (moral cause and effect, "as you sow, so shall you reap"); moral autonomy and individual responsibility; the three classifications of Karma: Sanchita Karma (accumulated warehouse of past deeds), Prarabdha Karma (portion bearing fruit in the current lifetime), and Kriyamana / Agami Karma (actions chosen and performed in the present moment shaping future destiny); the eternal nature of the soul (Atman) as distinct from the perishable physical body; the cycle of birth, death, and transmigration (Samsara); and the supreme spiritual goal of Moksha (liberation from the cycle of rebirth, self-realization, and eternal union with Paramatma).',
    cbeCompetency: 'Moral discernment, ethical accountability, philosophical introspection, and long-term purpose',
    estimatedMinutes: 30,
    order: 2,
    grade: 'G6'
  }
];

// 2. Lessons
const lessons = [
  {
    id: 'lesson-g6-hre-u1-l1',
    subStrandId: 'substrand-g6-hre-u1',
    title: 'Attributes of Paramatma: Nirguna, Saguna and Sat-Chit-Ananda',
    content: 'In Hindu philosophy, the Supreme Ultimate Reality is known as Paramatma or Brahman.\n\n1. One God, Many Names (Ekam Sat Vipra Bahudha Vadanti):\n- The Rig Veda declares: "Truth is One, the wise describe It in many ways."\n- Hinduism recognizes One Supreme God manifested in various divine forms to connect with human hearts.\n\n2. Nirguna and Saguna Aspects:\n- Nirguna Brahman: The formless, infinite, unmanifest reality without physical attributes, beyond human imagination.\n- Saguna Brahman (Ishvara): The manifest Divine possessing loving forms, compassionate qualities, and virtues that devotees can love, worship, and contemplate.\n\n3. Core Divine Attributes:\n- Sat-Chit-Ananda: The nature of God as pure Truth (Sat), infinite Consciousness (Chit), and supreme Bliss (Ananda).\n- Sarvavyapi: Omnipresent—present everywhere and residing in the heart of all living beings as the Antaryamin (inner guide).\n- Sarvajna: Omniscient—all-knowing of past, present, and future.\n- Sarvashaktiman: Omnipotent—all-powerful creator and sustainer of the cosmic order.',
    didYouKnow: 'The sacred sound "AUM" (OM) is considered the primordial cosmic vibration embodying both Nirguna and Saguna aspects of the Supreme Reality!',
    kenyanContext: 'Kenyan Hindu temples in Nairobi, Mombasa, and Kisumu teach learners that appreciating multiple divine expressions fosters respect for all diverse cultures and faiths across Kenya.',
    order: 1,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u1-l2',
    subStrandId: 'substrand-g6-hre-u1',
    title: 'The Trimurti and Cosmic Balance: Brahma, Vishnu, and Shiva',
    content: 'Paramatma’s cosmic governance of the universe operates through the Trimurti (the Divine Trinity) and their associated Devis (Goddesses of divine energy / Shakti).\n\n1. Lord Brahma (The Creator - Srishti):\n- Brings forth the universe and all living forms at the dawn of cosmic time.\n- Accompanied by Consort Goddess Saraswati, representing creative intellect, learning, arts, and speech (Vidya).\n\n2. Lord Vishnu (The Preserver - Sthiti):\n- Sustains, nurtures, and preserves the moral order (Dharma) of the cosmic world.\n- Incarnates as divine Avatars (such as Rama and Krishna) whenever righteousness declines.\n- Accompanied by Consort Goddess Lakshmi, representing wealth, generosity, and spiritual abundance.\n\n3. Lord Shiva (The Regenerator / Dissolver - Laya/Samhara):\n- Dissolves worn-out forms and transforms creation to make way for new birth, destroying ignorance and negative passions.\n- Accompanied by Consort Goddess Parvati (Durga/Shakti), representing courage, devotion, and protective power.\n\n4. Cosmic Harmony:\n- Creation, preservation, and regeneration are continuous cycles in nature (like seasons, plant cycles, and human life), demonstrating divine interdependence.',
    didYouKnow: 'The three sounds of AUM correspond directly to the Trimurti: "A" represents creation (Brahma), "U" represents preservation (Vishnu), and "M" represents transformation (Shiva)!',
    kenyanContext: 'The concept of Trimurti helps Kenyan youth understand the natural cycles of nature, such as rains cultivating crops, harvests sustaining life, and decaying organic matter enriching future soil.',
    order: 2,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u2-l1',
    subStrandId: 'substrand-g6-hre-u2',
    title: 'The Law of Karma: Cause, Effect and Moral Accountability',
    content: 'The Law of Karma is the infallible universal law of moral cause and effect governing thoughts, words, and actions.\n\n1. Principle of Karma:\n- The word "Karma" comes from the Sanskrit root "Kri", meaning action or deed.\n- Every action produces a corresponding reaction: good, kind, and truthful deeds yield positive results (Punya), while cruel, dishonest deeds yield negative consequences (Papa).\n- Karma operates like physical gravity: it is completely impartial, just, and universal.\n\n2. Three Classifications of Karma:\n- 1) Sanchita Karma (Accumulated Karma): The vast warehouse of all past actions accumulated across many lifetimes that has not yet borne fruit.\n- 2) Prarabdha Karma (Fructifying Karma): The portion of past karma that is ripe and active in this present lifetime, shaping one’s birth circumstances, body, and major life conditions.\n- 3) Kriyamana Karma (Current Action): The actions we consciously choose and perform in the present moment using our free will. This is the only karma we have immediate power to shape!\n\n3. Overcoming Fatalism:\n- Hinduism rejects fatalism: we are not helpless victims of fate. Our present choices (Kriyamana) have the power to create a noble, uplifting future destiny.',
    didYouKnow: 'The metaphor of Karma compares Sanchita to arrows stored in a quiver, Prarabdha to an arrow already released from the bow, and Kriyamana to the arrow currently being aimed in your hand!',
    kenyanContext: 'In Kenyan schools, learners apply the Law of Karma by recognizing that diligent daily study and respectful behavior directly generate academic success and honorable character.',
    order: 3,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-hre-u2-l2',
    subStrandId: 'substrand-g6-hre-u2',
    title: 'The Eternal Atman, Samsara (Rebirth) & Moksha (Spiritual Freedom)',
    content: 'Hindu philosophy explains the journey of the individual self and its ultimate spiritual destiny.\n\n1. The Nature of the Soul (Atman):\n- The Bhagavad Gita (2:20) teaches: "The soul is neither born, nor does it die... It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain."\n- The physical body is temporary like worn-out clothing, but the Atman is immortal, pure, and divine.\n\n2. Samsara (The Cycle of Rebirth):\n- Driven by desires and unfinished karma, the Atman transmigrates from one physical body to another upon death (Punarjanma).\n- Rebirth provides continuous opportunities for learning, moral growth, and spiritual refinement across lifetimes.\n\n3. Moksha: The Supreme Goal:\n- Moksha is the ultimate liberation from the cycle of birth and death (Samsara).\n- It is achieved when an individual transcends ego, sheds all accumulated karma through selfless action, devotion (Bhakti), wisdom (Jnana), and realizes their oneness with Paramatma.\n- In Moksha, the soul experiences infinite peace, absolute truth, and eternal bliss without suffering.',
    didYouKnow: 'The four classical goals of human life in Hindu philosophy (Purusharthas) are Dharma (righteous duty), Artha (honest wealth), Kama (wholesome happiness), and Moksha (spiritual liberation)!',
    kenyanContext: 'Understanding the divine Atman inside every living creature motivates Kenyan learners to practice Ahimsa (non-injury) and treat classmates of all backgrounds with inherent reverence.',
    order: 4,
    durationMinutes: 15,
    learningAreaId: 'la-hre-g6',
    grade: 'G6'
  }
];

// 3. Missions (Orders 149, 150, 151, 152 in world-faith-values)
const missions = [
  {
    id: 'mission-g6-hre-u1-m1',
    worldId: 'world-faith-values',
    title: 'Mission 149: The Infinite Divine – Attributes of Paramatma & Sat-Chit-Ananda',
    description: 'Explore the profound aspects of Nirguna and Saguna Brahman, the holy vibration of AUM, and the divine attributes of truth, consciousness, and bliss.',
    order: 149,
    orderIndex: 149,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-paramatma-attributes',
    badge: 'badge-g6-hre-paramatma-attributes',
    lessonId: 'lesson-g6-hre-u1-l1',
    questionIds: [
      'q-g6-hre-u1-001', 'q-g6-hre-u1-002', 'q-g6-hre-u1-003', 'q-g6-hre-u1-004',
      'q-g6-hre-u1-005', 'q-g6-hre-u1-006', 'q-g6-hre-u1-007', 'q-g6-hre-u1-008',
      'q-g6-hre-u1-009', 'q-g6-hre-u1-010', 'q-g6-hre-u1-011', 'q-g6-hre-u1-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u1-m2',
    worldId: 'world-faith-values',
    title: 'Mission 150: The Cosmic Trinity – Brahma, Vishnu & Shiva in Harmony',
    description: 'Understand the cosmic functions of creation, preservation, and transformation through the Trimurti and their divine consorts Saraswati, Lakshmi, and Parvati.',
    order: 150,
    orderIndex: 150,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-trimurti-cosmic',
    badge: 'badge-g6-hre-trimurti-cosmic',
    lessonId: 'lesson-g6-hre-u1-l2',
    questionIds: [
      'q-g6-hre-u1-013', 'q-g6-hre-u1-014', 'q-g6-hre-u1-015', 'q-g6-hre-u1-016',
      'q-g6-hre-u1-017', 'q-g6-hre-u1-018', 'q-g6-hre-u1-019', 'q-g6-hre-u1-020',
      'q-g6-hre-u1-021', 'q-g6-hre-u1-022', 'q-g6-hre-u1-023', 'q-g6-hre-u1-024'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u2-m1',
    worldId: 'world-faith-values',
    title: 'Mission 151: The Scales of Action – Sanchita, Prarabdha & Kriyamana Karma',
    description: 'Master the three dimensions of Karma, dispel fatalism, and learn how conscious present choices shape personal character and future destiny.',
    order: 151,
    orderIndex: 151,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-law-of-karma',
    badge: 'badge-g6-hre-law-of-karma',
    lessonId: 'lesson-g6-hre-u2-l1',
    questionIds: [
      'q-g6-hre-u2-001', 'q-g6-hre-u2-002', 'q-g6-hre-u2-003', 'q-g6-hre-u2-004',
      'q-g6-hre-u2-005', 'q-g6-hre-u2-006', 'q-g6-hre-u2-007', 'q-g6-hre-u2-008',
      'q-g6-hre-u2-009', 'q-g6-hre-u2-010', 'q-g6-hre-u2-011', 'q-g6-hre-u2-012'
    ],
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'mission-g6-hre-u2-m2',
    worldId: 'world-faith-values',
    title: 'Mission 152: Soul’s Awakening – The Immortal Atman, Samsara & Moksha',
    description: 'Discover the indestructible nature of the soul, the wheel of transmigration, and the supreme spiritual liberation of Moksha.',
    order: 152,
    orderIndex: 152,
    xpReward: 140,
    rewardXp: 140,
    coinReward: 45,
    badgeReward: 'badge-g6-hre-moksha-atman',
    badge: 'badge-g6-hre-moksha-atman',
    lessonId: 'lesson-g6-hre-u2-l2',
    questionIds: [
      'q-g6-hre-u2-013', 'q-g6-hre-u2-014', 'q-g6-hre-u2-015', 'q-g6-hre-u2-016',
      'q-g6-hre-u2-017', 'q-g6-hre-u2-018', 'q-g6-hre-u2-019', 'q-g6-hre-u2-020',
      'q-g6-hre-u2-021', 'q-g6-hre-u2-022', 'q-g6-hre-u2-023', 'q-g6-hre-u2-024'
    ],
    learningAreaId: 'la-hre-g6'
  }
];

// 4. Questions (48 total: 24 per unit)
const questions = [
  // --- Unit 1 Questions (q-g6-hre-u1-001 to q-g6-hre-u1-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u1-001',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What does the famous Rig Vedic dictum "Ekam Sat Vipra Bahudha Vadanti" proclaim about God?',
    options: [
      'Truth (God) is One, the wise describe It in many ways',
      'There are many different gods in conflict with one another',
      'God exists only in physical mountain caves',
      'Only one language is permitted for divine prayer'
    ],
    correctAnswer: 'Truth (God) is One, the wise describe It in many ways',
    explanation: 'This celebrated Vedic verse declares the fundamental unity of the Divine, explaining that the one eternal Reality is addressed by different names and manifestations.',
    socraticHint: 'Which translation emphasizes that one ultimate truth is expressed by sages in diverse ways?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-002',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What is the Sanskrit term for the formless, infinite, unmanifest aspect of God in Hindu philosophy?',
    options: ['Nirguna Brahman', 'Saguna Brahman', 'Avatar', 'Murti'],
    correctAnswer: 'Nirguna Brahman',
    explanation: 'Nirguna Brahman refers to the Supreme Reality without physical form, attributes, or gender—infinite, formless, and beyond sensory perception.',
    socraticHint: 'The prefix "Nir-" means without, and "Guna" means material attributes or qualities.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-003',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What is the manifest aspect of God possessing loving personal attributes and divine qualities called?',
    options: ['Saguna Brahman (Ishvara)', 'Nirguna Brahman', 'Prakriti', 'Maya'],
    correctAnswer: 'Saguna Brahman (Ishvara)',
    explanation: 'Saguna Brahman refers to God with divine attributes (compassion, grace, majesty) and forms that devotees can worship and connect with intimately.',
    socraticHint: 'The prefix "Sa-" means with, referring to God with attributes and loving qualities.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-004',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What do the three Sanskrit terms "Sat-Chit-Ananda" describe regarding the nature of Paramatma?',
    options: [
      'Pure Existence/Truth (Sat), Consciousness (Chit), and Bliss (Ananda)',
      'Creation, Destruction, and Preservation',
      'Body, Mind, and Senses',
      'Past, Present, and Future'
    ],
    correctAnswer: 'Pure Existence/Truth (Sat), Consciousness (Chit), and Bliss (Ananda)',
    explanation: 'Sat-Chit-Ananda is the classical Upanishadic description of Brahman: absolute Truth/Reality (Sat), pure Consciousness (Chit), and infinite Bliss (Ananda).',
    socraticHint: 'Break down Sat (Truth/Being), Chit (Awareness/Consciousness), and Ananda (Bliss).',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-005',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'Which attribute means that Paramatma is present everywhere in the entire creation?',
    options: ['Sarvavyapi (Omnipresent)', 'Sarvajna (Omniscient)', 'Sarvashaktiman (Omnipotent)', 'Nirakara (Formless)'],
    correctAnswer: 'Sarvavyapi (Omnipresent)',
    explanation: 'Sarvavyapi comes from "Sarva" (all) and "Vyapi" (pervading), meaning God is present everywhere and in every particle of the universe.',
    socraticHint: 'Which Sanskrit word means all-pervading or present in all places?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-006',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'Which attribute describes Paramatma as all-knowing, possessing complete knowledge of past, present, and future?',
    options: ['Sarvajna (Omniscient)', 'Sarvavyapi (Omnipresent)', 'Sarvashaktiman (Omnipotent)', 'Anadi (Beginningless)'],
    correctAnswer: 'Sarvajna (Omniscient)',
    explanation: 'Sarvajna means all-knowing ("Jna" meaning knowledge), referring to God’s complete omniscience over all thoughts, events, and times.',
    socraticHint: 'The root "Jna" means knowing or wisdom.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-007',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What is the sacred primordial cosmic sound that represents the totality of the Divine in Hinduism?',
    options: ['AUM (OM)', 'Shanti', 'Namaste', 'Swaha'],
    correctAnswer: 'AUM (OM)',
    explanation: 'AUM is the sacred syllable (Pranava) embodying the primordial cosmic vibration, encompassing all states of consciousness and divine reality.',
    socraticHint: 'Identify the universal three-letter holy sound that opens Vedic chants.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-008',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What does the concept of "Antaryamin" teach regarding God’s presence in human life?',
    options: [
      'God dwells within the heart of every living being as the inner witness and guide',
      'God is distant and inaccessible to ordinary humans',
      'God only visits earth during major festival holidays',
      'God resides exclusively inside temple buildings'
    ],
    correctAnswer: 'God dwells within the heart of every living being as the inner witness and guide',
    explanation: 'Antaryamin means the "inner ruler" or "inner indweller"—the divine presence within the conscience and soul of every living being.',
    socraticHint: 'Consider the indwelling divine spark residing inside one’s heart.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-009',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'Why do Hindu devotees greet each other with the folded hands gesture of "Namaste"?',
    options: [
      'To recognize and bow to the divine spark (Paramatma) dwelling within the other person',
      'To demonstrate physical strength in public',
      'To signal that they are ready to leave the room',
      'To copy ancient royal courtiers'
    ],
    correctAnswer: 'To recognize and bow to the divine spark (Paramatma) dwelling within the other person',
    explanation: '"Namaste" means "the Divine within me bows to the Divine within you," affirming universal spiritual equality and respect.',
    socraticHint: 'What spiritual reality is acknowledged when greeting another soul with folded hands?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-010',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'Which attribute denotes that Paramatma is all-powerful and the supreme source of all cosmic strength?',
    options: ['Sarvashaktiman (Omnipotent)', 'Nirguna', 'Avyakta', 'Sarvajna'],
    correctAnswer: 'Sarvashaktiman (Omnipotent)',
    explanation: 'Sarvashaktiman means possessing all power ("Shakti"), signifying God’s limitless ability to create, maintain, and transform the cosmos.',
    socraticHint: 'Which term combines "Sarva" (all) and "Shakti" (divine power)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-011',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'How does knowing that Paramatma is Sarvavyapi (present everywhere) impact a learner’s moral actions when alone?',
    options: [
      'It inspires honesty and ethical conduct even in private, knowing God witnesses all thoughts and actions',
      'It causes fear of looking at nature',
      'It makes the learner believe rules do not apply to them',
      'It encourages wasting water when no one is watching'
    ],
    correctAnswer: 'It inspires honesty and ethical conduct even in private, knowing God witnesses all thoughts and actions',
    explanation: 'Awareness of the omnipresent Divine cultivates integrity (doing the right thing even when no one is watching) and reverence for all living things.',
    socraticHint: 'How does God’s presence everywhere guide personal conscience and integrity?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-012',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l1',
    text: 'What term describes God as being beginningless (without start) and endless (immortal)?',
    options: ['Anadi and Ananta', 'Sthula and Sukshma', 'Rupa and Arupa', 'Karta and Bhokta'],
    correctAnswer: 'Anadi and Ananta',
    explanation: 'Anadi means having no beginning, and Ananta means having no end—affirming the eternal, uncreated nature of Paramatma.',
    socraticHint: 'Which Sanskrit pair translates to "without beginning and without end"?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // Lesson 2 (013 - 024)
  {
    id: 'q-g6-hre-u1-013',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'Who are the three divine deities constituting the Trimurti in Hinduism?',
    options: [
      'Lord Brahma, Lord Vishnu, and Lord Shiva',
      'Lord Indra, Lord Agni, and Lord Vayu',
      'Lord Rama, Lord Lakshmana, and Lord Bharata',
      'Surya, Chandra, and Varuna'
    ],
    correctAnswer: 'Lord Brahma, Lord Vishnu, and Lord Shiva',
    explanation: 'The Trimurti consists of Brahma (the Creator), Vishnu (the Preserver), and Shiva (the Regenerator/Transformer).',
    socraticHint: 'Identify the three deities representing creation, preservation, and dissolution.',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-014',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What is the primary cosmic role of Lord Brahma within the Trimurti?',
    options: ['Srishti (Creation of the cosmos and living beings)', 'Sthiti (Preservation of life)', 'Laya (Dissolution)', 'Moksha (Liberation)'],
    correctAnswer: 'Srishti (Creation of the cosmos and living beings)',
    explanation: 'Lord Brahma is entrusted with Srishti—bringing forth the manifold forms of the universe under the supreme guidance of Paramatma.',
    socraticHint: 'Which Sanskrit word signifies bringing into being or creation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-015',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'Which Goddess is associated with Lord Brahma as the divine embodiment of learning, wisdom, arts, and speech?',
    options: ['Goddess Saraswati', 'Goddess Lakshmi', 'Goddess Parvati', 'Goddess Kali'],
    correctAnswer: 'Goddess Saraswati',
    explanation: 'Goddess Saraswati represents Vidya (divine knowledge), music, arts, and speech, seated on a white lotus holding the Veena and sacred scriptures.',
    socraticHint: 'Which deity holding a musical instrument (Veena) is prayed to by students for academic wisdom?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-016',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What is the primary cosmic responsibility of Lord Vishnu within the Trimurti?',
    options: [
      'Sthiti (Preservation, sustenance, and protection of Dharma)',
      'Srishti (Initial creation of atoms)',
      'Samhara (Physical destruction)',
      'Tapas (Ascetic fasting)'
    ],
    correctAnswer: 'Sthiti (Preservation, sustenance, and protection of Dharma)',
    explanation: 'Lord Vishnu sustains cosmic balance, protects righteous order (Dharma), and incarnates in earthly forms to restore peace whenever evil surges.',
    socraticHint: 'Which cosmic role preserves and nurtures ongoing life?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-017',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'Which Goddess accompanies Lord Vishnu as the embodiment of auspiciousness, spiritual wealth, and generosity?',
    options: ['Goddess Lakshmi', 'Goddess Saraswati', 'Goddess Ganga', 'Goddess Radha'],
    correctAnswer: 'Goddess Lakshmi',
    explanation: 'Goddess Lakshmi represents auspiciousness, purity, prosperity, and generosity, blessing devotees with both spiritual fulfillment and material sustenance.',
    socraticHint: 'Which Goddess is celebrated during Diwali for bringing light, blessing, and auspicious prosperity?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-018',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'Why is Lord Shiva referred to as the Regenerator or Transformer rather than merely a destroyer?',
    options: [
      'Because his dissolution dissolves ignorance and worn-out forms to enable new growth and fresh creation',
      'Because he builds physical roads and bridges',
      'Because he only acts during lunar eclipses',
      'Because he opposes all forms of nature'
    ],
    correctAnswer: 'Because his dissolution dissolves ignorance and worn-out forms to enable new growth and fresh creation',
    explanation: 'Shiva’s role of Laya is transformative: just as an old seed dissolves to sprout a green tree, Shiva dissolves worn forms and inner ego to foster spiritual rebirth.',
    socraticHint: 'How does clearing away the old make space for new, vibrant life to emerge?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-019',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'Which Goddess accompanies Lord Shiva representing divine feminine strength, courage, and unconditional devotion?',
    options: ['Goddess Parvati (Durga / Shakti)', 'Goddess Saraswati', 'Goddess Lakshmi', 'Goddess Yamuna'],
    correctAnswer: 'Goddess Parvati (Durga / Shakti)',
    explanation: 'Goddess Parvati (manifested as Durga and Shakti) represents the dynamic cosmic power of courage, motherhood, spiritual tapas, and righteousness.',
    socraticHint: 'Which Goddess is revered as the mother of Ganesha and embodiment of divine Shakti?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-020',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'How do the three phonetic sounds of A-U-M correspond to the Trimurti?',
    options: [
      '"A" represents Brahma (Creation), "U" represents Vishnu (Preservation), and "M" represents Shiva (Transformation)',
      '"A" represents Shiva, "U" represents Brahma, and "M" represents Vishnu',
      '"A" represents earth, "U" represents fire, and "M" represents water',
      'They do not correspond to the Trimurti at all'
    ],
    correctAnswer: '"A" represents Brahma (Creation), "U" represents Vishnu (Preservation), and "M" represents Shiva (Transformation)',
    explanation: 'In Vedic symbology, the sound "A" emerges from the throat (beginning/creation), "U" rolls through the mouth (sustaining), and "M" closes the lips (dissolution).',
    socraticHint: 'Match the beginning, middle, and closing sound of A-U-M to creation, preservation, and dissolution.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-021',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What cosmic cycle illustrates the interdependence of Brahma, Vishnu, and Shiva in nature?',
    options: [
      'A plant sprouting from seed (creation), bearing fruit (preservation), and decomposing into compost (regeneration)',
      'Building a stone statue that never changes',
      'The freezing of water into permafrost',
      'A clock ticking without moving'
    ],
    correctAnswer: 'A plant sprouting from seed (creation), bearing fruit (preservation), and decomposing into compost (regeneration)',
    explanation: 'All nature mirrors the Trimurti: sprouting (Brahma), maturing and feeding living beings (Vishnu), and shedding leaves to nourish future soil (Shiva).',
    socraticHint: 'Which biological cycle shows birth, sustenance, and transformative decomposition?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-022',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What do the four heads of Lord Brahma facing the cardinal directions traditionally symbolize?',
    options: [
      'The four Vedas and all-encompassing knowledge of all directions of the cosmos',
      'Four physical mountains of India',
      'The four seasons of the year',
      'Four different animal species'
    ],
    correctAnswer: 'The four Vedas and all-encompassing knowledge of all directions of the cosmos',
    explanation: 'Brahma’s four faces represent the wisdom of the Four Vedas (Rig, Sama, Yajur, Atharva) emanating into the four quarters of creation.',
    socraticHint: 'Connect the four faces to the four foundational Vedic scriptures.',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-023',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What sacred object held by Lord Vishnu symbolizes cosmic time and the destruction of adharma (unrighteousness)?',
    options: ['The Sudarshana Chakra (Discus)', 'The Lotus flower', 'The Conch shell (Shankha)', 'The Bow of Rama'],
    correctAnswer: 'The Sudarshana Chakra (Discus)',
    explanation: 'The spinning Sudarshana Chakra represents the wheel of cosmic time and the divine weapon that vanquishes demonic ignorance to restore Dharma.',
    socraticHint: 'Which circular spinning discus is held on Vishnu’s finger?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u1-024',
    subStrandId: 'substrand-g6-hre-u1',
    lessonId: 'lesson-g6-hre-u1-l2',
    text: 'What does the third eye on Lord Shiva’s forehead represent?',
    options: [
      'Spiritual wisdom, intuition, and the destruction of ego and illusion (Maya)',
      'Physical eyesight in the dark',
      'A decorative jewel worn for style',
      'An injury from ancient battles'
    ],
    correctAnswer: 'Spiritual wisdom, intuition, and the destruction of ego and illusion (Maya)',
    explanation: 'Shiva’s third eye (Trinetra) is the eye of higher wisdom, intuitive vision, and burning away lust, hatred, and ignorance.',
    socraticHint: 'What spiritual vision sees beyond physical surface illusions?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },

  // --- Unit 2 Questions (q-g6-hre-u2-001 to q-g6-hre-u2-024) ---
  // Lesson 1 (001 - 012)
  {
    id: 'q-g6-hre-u2-001',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What does the Sanskrit word "Karma" fundamentally mean?',
    options: ['Action, work, or deed', 'Fate or predetermined luck', 'Spiritual chant', 'Temple sacrifice'],
    correctAnswer: 'Action, work, or deed',
    explanation: 'Derived from the root "Kri" (to do or act), Karma signifies any action, deed, or thought, along with its inevitable consequences.',
    socraticHint: 'Identify the literal meaning of the verbal root "Kri".',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-002',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What common proverb best summarizes the universal Law of Karma?',
    options: [
      '"As you sow, so shall you reap"',
      '"Might makes right"',
      '"Out of sight, out of mind"',
      '"A bird in hand is worth two in the bush"'
    ],
    correctAnswer: '"As you sow, so shall you reap"',
    explanation: 'The Law of Karma is the spiritual law of cause and effect: planting seeds of kindness yields happiness, while planting seeds of wickedness yields sorrow.',
    socraticHint: 'Which universal proverb compares our actions to planting agricultural seeds?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-003',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What are virtuous, selfless deeds that generate positive spiritual merit called in Hinduism?',
    options: ['Punya', 'Papa', 'Krodha', 'Lobha'],
    correctAnswer: 'Punya',
    explanation: 'Punya refers to virtuous spiritual merit earned through righteous actions, charity, honesty, and worship that brings peace and auspicious results.',
    socraticHint: 'Which term represents holy merit or good karma as opposed to sin (Papa)?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-004',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What are harmful, selfish, or unrighteous actions that produce negative spiritual demerit called?',
    options: ['Papa', 'Punya', 'Sadhana', 'Bhakti'],
    correctAnswer: 'Papa',
    explanation: 'Papa refers to demerit or sin accumulated through deceit, cruelty, violence, and unrighteous conduct leading to distress.',
    socraticHint: 'Which Sanskrit word means sin or negative karma?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-005',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What is Sanchita Karma in the classification of karmic accumulation?',
    options: [
      'The vast accumulated warehouse of all past karmas across many lifetimes that has not yet borne fruit',
      'The actions being performed at this present second',
      'The karma that is already completely finished',
      'Good deeds done only during childhood'
    ],
    correctAnswer: 'The vast accumulated warehouse of all past karmas across many lifetimes that has not yet borne fruit',
    explanation: 'Sanchita Karma (accumulated karma) is the total reservoir of all unresolved actions from past existences waiting to mature in future lives.',
    socraticHint: 'Which word means accumulated or stored karma in reserve?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-006',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What is Prarabdha Karma?',
    options: [
      'The portion of past karma that is ripe and actively fructifying in the present lifetime',
      'The karma we will do in our next life',
      'Actions that have zero consequence',
      'Thoughts that are immediately forgotten'
    ],
    correctAnswer: 'The portion of past karma that is ripe and actively fructifying in the present lifetime',
    explanation: 'Prarabdha Karma is that portion of the total store that has begun to bear fruit, determining our present birth, parents, physical constitution, and major life challenges.',
    socraticHint: 'Which karma is currently active and unfolding in your present life?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-007',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'What is Kriyamana Karma (also known as Agami Karma)?',
    options: [
      'The actions we freely choose and perform right now in the present moment',
      'Actions performed during ancient prehistoric times',
      'Involuntary actions like breathing and digestion',
      'Actions performed while asleep'
    ],
    correctAnswer: 'The actions we freely choose and perform right now in the present moment',
    explanation: 'Kriyamana Karma is current action created right now through free will and conscious choice, giving us the power to direct our future destiny.',
    socraticHint: 'Which karma represents the action taking place right now under your control?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-008',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'In the classic archery metaphor of Karma, what does the arrow currently being aimed in the archer’s hands represent?',
    options: [
      'Kriyamana Karma (Current present action)',
      'Sanchita Karma (Stored in quiver)',
      'Prarabdha Karma (Arrow already released)',
      'Moksha (The target hit)'
    ],
    correctAnswer: 'Kriyamana Karma (Current present action)',
    explanation: 'The arrow aimed in the hand represents Kriyamana—it is within your control right now to choose where and how carefully you shoot it.',
    socraticHint: 'Which arrow is still in your fingers ready to be directed?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-009',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'Does Hindu philosophy accept fatalism (the belief that we are powerless victims of destiny who should not try to improve)?',
    options: [
      'No, Hinduism teaches that through right effort (Purushartha) and noble choices, humans shape their future',
      'Yes, Hinduism teaches that all effort is completely useless',
      'Yes, everything is fixed and cannot be changed',
      'Only for people born in cities'
    ],
    correctAnswer: 'No, Hinduism teaches that through right effort (Purushartha) and noble choices, humans shape their future',
    explanation: 'Hinduism vigorously rejects lazy fatalism. Our present conscious choices (Kriyamana) have the potency to neutralize negative past karma and craft an uplifting future.',
    socraticHint: 'Does karma encourage taking active responsibility or giving up in helplessness?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-010',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'How does the Law of Karma explain why two children born on the same day can encounter different natural talents and health conditions?',
    options: [
      'Each individual soul carries their own distinct karmic imprint (Prarabdha Karma) from previous lives',
      'It is pure accidental luck with no spiritual reason',
      'Doctors randomly choose who receives good health',
      'Planets act out of anger against babies'
    ],
    correctAnswer: 'Each individual soul carries their own distinct karmic imprint (Prarabdha Karma) from previous lives',
    explanation: 'Karma provides a coherent framework of justice: individual dispositions, family environment, and talents reflect the ripening of the soul’s unique past karmic journey.',
    socraticHint: 'How does the soul’s continuous spiritual journey account for different starting points in life?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-011',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'If Anish chooses to study hard and help his struggling classmate with mathematics every afternoon, what karma is he creating?',
    options: [
      'Punya (virtuous merit) through Kriyamana Karma that builds knowledge and goodwill',
      'Papa (sin) through waste of time',
      'Sanchita demerit that harms his memory',
      'Negative karma that causes failure'
    ],
    correctAnswer: 'Punya (virtuous merit) through Kriyamana Karma that builds knowledge and goodwill',
    explanation: 'Consciously choosing diligence and compassion in the present moment is righteous Kriyamana Karma, producing intellectual clarity, friendship, and positive spiritual fruit.',
    socraticHint: 'What kind of karma does sharing knowledge and working hard generate?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-012',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l1',
    text: 'Can a person escape the consequences of their dishonest actions simply by moving to a different country?',
    options: [
      'No, because the Law of Karma follows the individual soul everywhere across space and lifetimes',
      'Yes, karma only exists within specific national borders',
      'Yes, flying across the ocean erases all past actions',
      'Only if they change their legal passport name'
    ],
    correctAnswer: 'No, because the Law of Karma follows the individual soul everywhere across space and lifetimes',
    explanation: 'Just like shadows accompany a body in sunlight, karmic impressions reside in the subtle mind and accompany the soul wherever it goes until resolved.',
    socraticHint: 'Is the Law of Karma limited by geographic boundaries?',
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
    id: 'q-g6-hre-u2-013',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What is the individual, immortal soul called in Hindu philosophy?',
    options: ['Atman', 'Sharira', 'Manas', 'Indriya'],
    correctAnswer: 'Atman',
    explanation: 'The Atman is the immortal, eternal soul dwelling within all living beings, distinct from the perishable physical body (Sharira).',
    socraticHint: 'Which Sanskrit term identifies the true spiritual self or soul?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-014',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'How does the Bhagavad Gita (2:22) metaphorically describe the soul changing physical bodies at death?',
    options: [
      'Like a person discarding old, worn-out garments and putting on new clothes',
      'Like a bird caught inside an iron cage forever',
      'Like a drop of oil dissolving in cold water',
      'Like a dry leaf burning into smoke without trace'
    ],
    correctAnswer: 'Like a person discarding old, worn-out garments and putting on new clothes',
    explanation: 'Lord Krishna compares the soul casting aside worn-out bodies to a person discarding old clothes and dressing in new ones (Vasamsi jirnani yatha vihaya...).',
    socraticHint: 'Which metaphor compares the body to temporary clothing worn by the soul?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-015',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What does the Bhagavad Gita (2:23) declare regarding weapons, fire, water, and wind affecting the Atman?',
    options: [
      'Weapons cannot pierce it, fire cannot burn it, water cannot wet it, and wind cannot dry it',
      'Weapons can destroy the soul easily',
      'Water washes away the soul forever',
      'Fire turns the soul into ash'
    ],
    correctAnswer: 'Weapons cannot pierce it, fire cannot burn it, water cannot wet it, and wind cannot dry it',
    explanation: '"Nainam chindanti shastrani, nainam dahati pavakah..." affirms that physical elements cannot harm the indestructible, divine nature of the Atman.',
    socraticHint: 'Can any earthly weapon or natural element destroy the eternal soul?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-016',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What is the term for the continuous cycle of birth, death, and rebirth in the material world?',
    options: ['Samsara', 'Samadhi', 'Satsang', 'Seva'],
    correctAnswer: 'Samsara',
    explanation: 'Samsara is the cyclical wheel of worldly existence wherein the soul undergoes repeated transmigration until attaining spiritual enlightenment.',
    socraticHint: 'Which word refers to the revolving cycle of reincarnation in worldly life?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-017',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What is the ultimate spiritual goal of human existence in Hindu philosophy?',
    options: [
      'Moksha (Liberation from Samsara and eternal union with Paramatma)',
      'Accumulating mountains of gold and diamond jewels',
      'Living on a deserted island forever',
      'Ruling a powerful earthly empire'
    ],
    correctAnswer: 'Moksha (Liberation from Samsara and eternal union with Paramatma)',
    explanation: 'Moksha is the ultimate Purushartha (aim of life), representing release from suffering, shedding all karmic bonds, and resting in supreme divine bliss.',
    socraticHint: 'Which fourth and highest goal of life signifies spiritual liberation?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-018',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What are the four classical goals of human life (Purusharthas) in Hindu tradition?',
    options: [
      'Dharma (Righteous duty), Artha (Honest wealth), Kama (Noble pleasure), and Moksha (Spiritual freedom)',
      'Childhood, Youth, Adulthood, and Old age',
      'Brahma, Vishnu, Shiva, and Indra',
      'Truth, Non-violence, Celibacy, and Fasting'
    ],
    correctAnswer: 'Dharma (Righteous duty), Artha (Honest wealth), Kama (Noble pleasure), and Moksha (Spiritual freedom)',
    explanation: 'The four Purusharthas structure a balanced human life: pursuing honest wealth and wholesome joys anchored in Dharma, with Moksha as the supreme objective.',
    socraticHint: 'Identify the four pillars governing righteous conduct, wealth, desires, and liberation.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-019',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What happens to the soul when it finally attains Moksha?',
    options: [
      'It breaks free from the cycle of rebirth and abides in eternal peace, truth, and bliss with God',
      'It is reborn as a wild forest animal',
      'It loses its existence and turns into empty stone',
      'It falls down to the bottom of the ocean'
    ],
    correctAnswer: 'It breaks free from the cycle of rebirth and abides in eternal peace, truth, and bliss with God',
    explanation: 'Upon achieving Moksha, the soul is permanently liberated from sorrow, ignorance, and rebirth, realizing its eternal identity with the Divine.',
    socraticHint: 'What state of supreme peace and freedom from reincarnation does a liberated soul achieve?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-020',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'Which spiritual path (Yoga) leads to liberation through loving devotion, prayer, and surrender to Paramatma?',
    options: ['Bhakti Yoga', 'Karma Yoga', 'Jnana Yoga', 'Raja Yoga'],
    correctAnswer: 'Bhakti Yoga',
    explanation: 'Bhakti Yoga is the path of divine love, loving surrender, heartfelt prayer, and personal devotion to the Supreme Lord.',
    socraticHint: 'Which path of yoga is centered on sincere love and devotion?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-021',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'Which spiritual path (Yoga) leads toward liberation through selfless action performed without craving personal reward?',
    options: ['Karma Yoga', 'Bhakti Yoga', 'Hatha Yoga', 'Kriya Yoga'],
    correctAnswer: 'Karma Yoga',
    explanation: 'Karma Yoga is the path of selfless duty (Nishkama Karma) where actions are offered to God without selfish attachment to praise or personal fruits.',
    socraticHint: 'Which yoga purifies the mind through selfless service and dedicated work?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-022',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'Which spiritual path (Yoga) seeks liberation through deep philosophical study, discrimination (Viveka), and self-inquiry?',
    options: ['Jnana Yoga', 'Karma Yoga', 'Bhakti Yoga', 'Mantra Yoga'],
    correctAnswer: 'Jnana Yoga',
    explanation: 'Jnana Yoga is the path of wisdom and intellectual discernment, differentiating between the eternal Atman and the changing material world.',
    socraticHint: 'The Sanskrit word "Jnana" translates directly to knowledge or wisdom.',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 15,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-023',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'How does realizing that the same divine Atman resides in all living beings inspire compassion in everyday life?',
    options: [
      'It makes us see all human beings and animals as our spiritual family, preventing cruelty and hatred',
      'It encourages ignoring people who need help',
      'It causes us to compete aggressively with friends',
      'It makes us proud and arrogant'
    ],
    correctAnswer: 'It makes us see all human beings and animals as our spiritual family, preventing cruelty and hatred',
    explanation: 'Seeing the identical divine Atman inside every living soul removes prejudice and cruelty, laying the moral foundation for universal empathy and Ahimsa.',
    socraticHint: 'When you perceive God’s spark in everyone, how does that transform your treatment of others?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-hre-g6'
  },
  {
    id: 'q-g6-hre-u2-024',
    subStrandId: 'substrand-g6-hre-u2',
    lessonId: 'lesson-g6-hre-u2-l2',
    text: 'What famous Upanishadic Mahavakya (great saying) proclaims the identity between the individual self and the Supreme Reality?',
    options: ['Tat Tvam Asi (That Thou Art / You are That Divine)', 'Aham Brahma Asmi', 'Prajnanam Brahma', 'All of the above are Vedic Mahavakyas'],
    correctAnswer: 'All of the above are Vedic Mahavakyas',
    explanation: 'The four great Upanishadic Mahavakyas include "Tat Tvam Asi" (Chandogya), "Aham Brahma Asmi" (Brihadaranyaka), and "Prajnanam Brahma" (Aitareya), declaring the divine nature of the Atman.',
    socraticHint: 'Are statements like "Tat Tvam Asi" and "Aham Brahma Asmi" all sacred Vedic Mahavakyas?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 20,
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
console.log(`Added ${qCount} questions for Units 1 & 2.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 1 of Grade 6 HRE to cbe_database.json!');
