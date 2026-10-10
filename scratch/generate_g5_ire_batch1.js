import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Registering Grade 5 Islamic Religious Education (la-ire-g5) ---');

// 1. Learning Area Registration
const existingLA = db.learningAreas.find(la => la.id === 'la-ire-g5');
if (!existingLA) {
  db.learningAreas.push({
    id: 'la-ire-g5',
    gradeId: 'grade-5',
    name: 'Islamic Religious Education',
    swahiliName: 'Elimu ya Dini ya Kiislamu',
    icon: 'scroll',
    color: '#059669',
    description: 'Recitation and reflection on selected Surahs (Al-Humazah, Al-Asr, At-Takathur, Al-Qari’ah), prophetic Hadith, the Makkan phase of Sirah and persecution, belief in divine scriptures and angels, Taharah and Sunnah prayers, Sawm and Zakat, and Islamic moral living (Akhlaq) in Kenya.',
    strandsCount: 4
  });
  console.log('Added la-ire-g5');
} else {
  existingLA.strandsCount = 4;
  console.log('la-ire-g5 already exists, updated');
}

// 2. Add to gameWorlds (world-faith-values)
const faithWorld = db.gameWorlds.find(w => w.id === 'world-faith-values');
if (faithWorld && !faithWorld.learningAreaIds.includes('la-ire-g5')) {
  faithWorld.learningAreaIds.push('la-ire-g5');
  console.log('Added la-ire-g5 to world-faith-values.learningAreaIds');
}

// 3. Strands (All 4 Strands for Grade 5 IRE)
const strandsToAdd = [
  {
    id: 'strand-g5-ire-quran',
    learningAreaId: 'la-ire-g5',
    code: 'IRE-G5-STR-01',
    title: 'The Holy Qur’an and Hadith',
    swahiliTitle: 'Qur’ani Tukufu na Hadithi',
    description: 'Recitation, memorization, and moral reflection on selected Makkan Surahs (Al-Humazah, Al-Asr, At-Takathur, Al-Qari’ah), and studying prophetic Hadith on charity, anger management, and neighborliness.',
    icon: 'book'
  },
  {
    id: 'strand-g5-ire-sirah',
    learningAreaId: 'la-ire-g5',
    code: 'IRE-G5-STR-02',
    title: 'Sirah (Life of Prophet Muhammad SAW)',
    swahiliTitle: 'Sirah (Maisha ya Mtume Muhammad SAW)',
    description: 'First divine revelation at Cave Hira, early private and public Da’wah, perseverance under Quraysh boycott and persecution, and the migration to Abyssinia.',
    icon: 'moon'
  },
  {
    id: 'strand-g5-ire-ibadah',
    learningAreaId: 'la-ire-g5',
    code: 'IRE-G5-STR-03',
    title: 'Pillars of Iman and Acts of Worship (Ibadah)',
    swahiliTitle: 'Nguzo za Imani na Ibada',
    description: 'Belief in revealed divine scriptures and archangels; cleansing from impurities (Taharah) and Tayammum; performing Sunnah prayers; and virtues and rules of Sawm and Zakat.',
    icon: 'star'
  },
  {
    id: 'strand-g5-ire-akhlaq',
    learningAreaId: 'la-ire-g5',
    code: 'IRE-G5-STR-04',
    title: 'Islamic Morals (Akhlaq), Family, and Nation Building',
    swahiliTitle: 'Maadili ya Kiislamu, Familia na Ujenzi wa Taifa',
    description: 'Islamic manners (eating, greeting, modesty), honoring parents and kinship, peaceful coexistence with neighbors of all faiths, environmental stewardship, and anti-corruption integrity in Kenya.',
    icon: 'shield'
  }
];

strandsToAdd.forEach(strand => {
  const idx = db.strands.findIndex(s => s.id === strand.id);
  if (idx >= 0) db.strands[idx] = strand;
  else {
    db.strands.push(strand);
    console.log(`Added strand: ${strand.id}`);
  }
});

// 4. Batch 1 Sub-strands (Units 1 & 2)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-ire-u1',
    strandId: 'strand-g5-ire-quran',
    learningAreaId: 'la-ire-g5',
    title: 'Surah Al-Humazah and Surah Al-Asr: Speech Etiquette and Time Stewardship',
    description: 'Recitation and comprehension of Surah Al-Humazah (warning against slander, backbiting, and hoarding wealth) and Surah Al-Asr (swearing by time, the four conditions for salvation: faith, righteous deeds, advising truth, and advising patience); applying ethical speech and diligent time management in school and daily life.',
    cbeCompetency: 'Ethical verbal communication, emotional self-regulation, time stewardship, and mutual encouragement toward truth',
    estimatedMinutes: 30,
    order: 1
  },
  {
    id: 'substrand-g5-ire-u2',
    strandId: 'strand-g5-ire-quran',
    learningAreaId: 'la-ire-g5',
    title: 'Surah At-Takathur and Surah Al-Qari’ah: Material Rivalry and the Day of Judgment',
    description: 'Recitation and reflection on Surah At-Takathur (warning against obsessive worldly competition and reminder of gratitude) and Surah Al-Qari’ah (the striking hour of resurrection, mountains like wool, and the heavy scales of good deeds); cultivating contentment, accountability, and active good deeds.',
    cbeCompetency: 'Spiritual accountability, contentment over materialism, moral reflection on consequences, and performing acts of righteousness',
    estimatedMinutes: 30,
    order: 2
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else {
    db.subStrands.push(ss);
    console.log(`Added sub-strand: ${ss.id}`);
  }
});

// 5. Batch 1 Lessons (Units 1 & 2: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-ire-u1-l1',
    subStrandId: 'substrand-g5-ire-u1',
    title: 'Surah Al-Humazah: Warning Against Slander, Backbiting, and Wealth Hoarding',
    content: 'Surah Al-Humazah is the 104th chapter of the Holy Qur’an, revealed in Makkah. It consists of 9 verses and opens with a severe divine warning: "Woe to every slanderer and backbiter!" The word "Humazah" refers to a person who insults, slanders, or mocks people behind their backs, while "Lumazah" refers to one who defames, taunts, or faults others to their face. The Surah exposes individuals who obsessively amass and count wealth, arrogantly believing that material riches will grant them immortality on earth. Allah warns that such an unrepentant person will be thrown into "Al-Hutamah" (the Crushing Fire of Hell), an intense blaze ignited by Allah that penetrates right into the hearts, locked around them in towering columns. For Grade 5 learners in Kenya, Surah Al-Humazah provides a powerful moral compass: we must guard our tongues against gossip, cyberbullying, mocking classmates with nicknames, and boasting about wealth, and instead use our words to uplift and our resources to help the poor.',
    didYouKnow: 'The Prophet Muhammad (SAW) taught: "Whoever guarantees me what is between his jaws (tongue) and what is between his legs, I guarantee him Jannah!"',
    kenyanContext: 'In Madrasas across Mombasa, Malindi, and Garissa, teachers remind pupils to recite Surah Al-Humazah to remind themselves never to engage in school playground gossip or tease fellow learners.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u1-l2',
    subStrandId: 'substrand-g5-ire-u1',
    title: 'Surah Al-Asr: The Value of Time, Faith, and Mutual Perseverance',
    content: 'Surah Al-Asr is the 103rd chapter of the Holy Qur’an, consisting of just 3 short yet profoundly comprehensive verses. Renowned Islamic scholar Imam Ash-Shafi’i remarked that if humanity reflected only upon this Surah, it would suffice for their guidance. In the opening verse, Allah swears an oath by Time ("Wal-Asr"): "By the passing time, indeed mankind is in profound loss!" The passage then provides the divine formula for salvation through four essential pillars: 1) True Faith (Iman): sincere belief in Allah, His angels, books, messengers, and the Last Day; 2) Righteous Deeds (Amal Salih): translating faith into concrete actions like daily prayers, kindness, honesty, and charity; 3) Advising each other to the Truth (Tawasaw bil-Haqq): encouraging one another in justice, truthfulness, and obedience to Allah; and 4) Advising each other to Patience (Tawasaw bis-Sabr): persevering steadfastly through difficulties, avoiding sins, and showing resilience. Time is an irreplaceable blessing from Allah; once a minute passes, it can never be retrieved. Learners practice this Surah by planning daily timetables to balance schoolwork, prayers, helping parents, and recreation.',
    didYouKnow: 'Whenever the noble Companions (Sahabah) of Prophet Muhammad (SAW) met, they would not part company until one of them recited Surah Al-Asr to the other as a reminder of their shared purpose!',
    kenyanContext: 'At Wamy High School and Starehe Muslim clubs in Nairobi, learners recite Surah Al-Asr at the end of their study circles to remind each other to manage exam preparation time responsibly.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u2-l1',
    subStrandId: 'substrand-g5-ire-u2',
    title: 'Surah At-Takathur: Material Rivalry, Contentment, and Ultimate Accountability',
    content: 'Surah At-Takathur is the 102nd chapter of the Holy Qur’an, comprising 8 verses. The word "At-Takathur" means mutual rivalry in multiplying and boasting about worldly possessions, wealth, social status, and followers. The Surah begins with the warning: "Competition in worldly increase diverts you, until you visit the graveyards." Allah warns that this endless race for material accumulation blinds humans to their spiritual purpose until death abruptly ends their pursuits. The Surah emphasizes three stages of realization: "Kalla sawfa ta’lamun" (No! You are going to know), followed by "Ilm al-Yaqeen" (the true knowledge of certainty), and on the Day of Judgment, "Ayn al-Yaqeen" (the eye of certainty) when the reality of the Hereafter is seen with physical eyes. The chapter concludes with a sobering reminder: "Then you will surely be asked that Day about the pleasures/blessings (Na’eem)." Every blessing—good health, eyesight, intellect, clean drinking water, food, and family security in Kenya—is a divine trust (Amanah) for which we will account. Muslims respond with gratitude (Shukr) and sharing rather than boastful competition.',
    didYouKnow: 'The Prophet (SAW) recited Surah At-Takathur and said: "The son of Adam says, ‘My wealth! My wealth!’ Yet what do you own of your wealth except that which you ate and consumed, wore out, or gave in charity and preserved for eternity?"',
    kenyanContext: 'During Friday Khutbahs in Jamia Mosque Nairobi, Khateebs explain Surah At-Takathur to remind Kenyan professionals and youth that true wealth lies in a contented heart (Qana’ah) rather than showing off expensive gadgets.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u2-l2',
    subStrandId: 'substrand-g5-ire-u2',
    title: 'Surah Al-Qari’ah: The Striking Calamity and the Scales of Good Deeds',
    content: 'Surah Al-Qari’ah is the 101st chapter of the Holy Qur’an, containing 11 verses. "Al-Qari’ah" literally means "The Striking Calamity," one of the names of the Day of Resurrection that strikes hearts with immense awe. The Surah paints vivid cosmic scenes of that monumental Day: human beings will be scattered like confused moths ("ka-al-farashi al-mabthuth"), and mighty mountain ranges will be like carded, fluffy wool floating in the air ("ka-al-’ihni al-manfush"). The Surah then reveals the divine standard of eternal justice: The Scales (Al-Mizan). For the person whose scales of righteous deeds are heavy ("fa-amma man thaqulat mawazinuh"), their destination is a life of blissful contentment in Jannah (Paradise). But for the person whose scales are light ("wa-amma man khaffat mawazinuh"), their dwelling will be "Hawiyah"—which Allah describes as a raging, blazing fire ("Narun hamiyah"). This chapter inspires believers to constantly tip their balance of deeds with daily prayers, Dhikr (remembrance of Allah), honest study, kindness, and charity, because even a single smile or helping hand adds weight to the scale.',
    didYouKnow: 'The Prophet Muhammad (SAW) said: "Two words are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: ‘SubhanAllahi wa bihamdihi, SubhanAllahil-Adheem’" (Glory be to Allah and His praise, Glory be to Allah the Almighty)!',
    kenyanContext: 'In Lamu Old Town, Madrasa children memorize Surah Al-Qari’ah and participate in community clean-up exercises around the seafront, connecting the concept of weighing good deeds with serving their local community.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else {
    db.lessons.push(l);
    console.log(`Added lesson: ${l.id}`);
  }
});

// 6. Batch 1 Missions (Missions 69, 70, 71, 72 in world-faith-values)
const missionsToAdd = [
  {
    id: 'mission-g5-ire-u1-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u1',
    lessonId: 'lesson-g5-ire-u1-l1',
    title: 'Guardians of Noble Speech Quest',
    description: 'Explore the divine warnings of Surah Al-Humazah, learn to protect your tongue from slander and backbiting, and discover the true purpose of wealth in serving humanity!',
    order: 69,
    orderIndex: 69,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-noble-speech',
    badge: { name: 'Truthful Tongue', icon: 'shield' },
    questionIds: [
      'q-g5-ire-u1-001', 'q-g5-ire-u1-002', 'q-g5-ire-u1-003', 'q-g5-ire-u1-004',
      'q-g5-ire-u1-005', 'q-g5-ire-u1-006', 'q-g5-ire-u1-007', 'q-g5-ire-u1-008',
      'q-g5-ire-u1-009', 'q-g5-ire-u1-010', 'q-g5-ire-u1-011', 'q-g5-ire-u1-012'
    ]
  },
  {
    id: 'mission-g5-ire-u1-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u1',
    lessonId: 'lesson-g5-ire-u1-l2',
    title: 'Masters of Time & Perseverance Challenge',
    description: 'Unlock the four divine pillars of salvation in Surah Al-Asr: cultivate sincere faith, perform righteous deeds, stand for truth, and practice steadfast patience every day!',
    order: 70,
    orderIndex: 70,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-time-steward',
    badge: { name: 'Time Master', icon: 'clock' },
    questionIds: [
      'q-g5-ire-u1-013', 'q-g5-ire-u1-014', 'q-g5-ire-u1-015', 'q-g5-ire-u1-016',
      'q-g5-ire-u1-017', 'q-g5-ire-u1-018', 'q-g5-ire-u1-019', 'q-g5-ire-u1-020',
      'q-g5-ire-u1-021', 'q-g5-ire-u1-022', 'q-g5-ire-u1-023', 'q-g5-ire-u1-024'
    ]
  },
  {
    id: 'mission-g5-ire-u2-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u2',
    lessonId: 'lesson-g5-ire-u2-l1',
    title: 'Contentment Over Worldly Rivalry Quest',
    description: 'Reflect upon the warnings of Surah At-Takathur, overcome material jealousy, practice sincere gratitude (Shukr), and prepare for accountability for every divine blessing!',
    order: 71,
    orderIndex: 71,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-content-heart',
    badge: { name: 'Content Heart', icon: 'award' },
    questionIds: [
      'q-g5-ire-u2-001', 'q-g5-ire-u2-002', 'q-g5-ire-u2-003', 'q-g5-ire-u2-004',
      'q-g5-ire-u2-005', 'q-g5-ire-u2-006', 'q-g5-ire-u2-007', 'q-g5-ire-u2-008',
      'q-g5-ire-u2-009', 'q-g5-ire-u2-010', 'q-g5-ire-u2-011', 'q-g5-ire-u2-012'
    ]
  },
  {
    id: 'mission-g5-ire-u2-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u2',
    lessonId: 'lesson-g5-ire-u2-l2',
    title: 'The Great Scales of Good Deeds Challenge',
    description: 'Visualize the striking day in Surah Al-Qari’ah, weigh your daily deeds on the divine Mizan, and stack your scales with righteous acts, kindness, and honest living!',
    order: 72,
    orderIndex: 72,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-heavy-scales',
    badge: { name: 'Scale Balancer', icon: 'zap' },
    questionIds: [
      'q-g5-ire-u2-013', 'q-g5-ire-u2-014', 'q-g5-ire-u2-015', 'q-g5-ire-u2-016',
      'q-g5-ire-u2-017', 'q-g5-ire-u2-018', 'q-g5-ire-u2-019', 'q-g5-ire-u2-020',
      'q-g5-ire-u2-021', 'q-g5-ire-u2-022', 'q-g5-ire-u2-023', 'q-g5-ire-u2-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else {
    db.missions.push(m);
    console.log(`Added mission: ${m.id}`);
  }
});

// 7. Batch 1 Questions (48 Questions)
const questionsToAdd = [
  // ==========================================
  // Unit 1 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-ire-u1-001',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What severe divine warning opens Surah Al-Humazah in the first Ayah?',
    text: 'What severe divine warning opens Surah Al-Humazah in the first Ayah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Woe to every slanderer and backbiter (defamer)!',
      'All praise is due to Allah, Lord of the worlds',
      'By the passing time, indeed mankind is in loss',
      'Have you not seen how your Lord dealt with the army of elephants?'
    ],
    correctAnswer: 'Woe to every slanderer and backbiter (defamer)!',
    explanation: 'Surah Al-Humazah (104:1) opens with "Wailul-likulli humazatil-lumazah," meaning "Woe to every slanderer and backbiter," severely warning those who mock, insult, or defame others.',
    socraticHint: 'Which grave consequence ("Woe") is pronounced upon people who mock and backbite others behind their backs?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-002',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What does the term "Humazah" specifically mean in the context of Islamic ethics and Qur’anic commentary?',
    text: 'What does the term "Humazah" specifically mean in the context of Islamic ethics and Qur’anic commentary?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'One who slanders, backbites, or insults others behind their backs',
      'One who gives generous charity to orphans in secret',
      'One who leads prayers at the mosque with a beautiful voice',
      'One who travels long distances across the desert for trade'
    ],
    correctAnswer: 'One who slanders, backbites, or insults others behind their backs',
    explanation: 'In classical Tafsir, "Humazah" refers to a person who criticizes, insults, ridicules, or defames people in their absence through speech or gestures.',
    socraticHint: 'Does "Humazah" refer to someone who speaks maliciously about people behind their backs or someone who helps them?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-003',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'According to Surah Al-Humazah Ayah 2, what false belief does the hoarder of wealth possess?',
    text: 'According to Surah Al-Humazah Ayah 2, what false belief does the hoarder of wealth possess?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He thinks that his wealth will make him immortal (live forever)',
      'He believes that his wealth will automatically build a school for poor children',
      'He thinks that wealth is a temporary test that must be shared quickly',
      'He believes that true wealth only exists in heaven'
    ],
    correctAnswer: 'He thinks that his wealth will make him immortal (live forever)',
    explanation: 'Ayah 3 states: "Yahsebu anna malahu akhladah"—"He thinks that his wealth will make him last forever." The Qur’an condemns the arrogant delusion that material wealth can save someone from death or judgment.',
    socraticHint: 'What unrealistic illusion does the hoarder have about wealth protecting him from death forever?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-004',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What is "Al-Hutamah" as described in Surah Al-Humazah Ayah 4-7?',
    text: 'What is "Al-Hutamah" as described in Surah Al-Humazah Ayah 4-7?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Crushing Fire of Hell ignited by Allah that ascends over the hearts',
      'A vast mountain of silver in the desert of Arabia',
      'A deep well of fresh, sweet water outside the city of Makkah',
      'A palace of pearls reserved for truthful merchants'
    ],
    correctAnswer: 'The Crushing Fire of Hell ignited by Allah that ascends over the hearts',
    explanation: 'Surah Al-Humazah (104:4-7) describes Al-Hutamah as "The Fire of Allah, fueled and blazing, which mounts right up to the hearts," crushing and consuming the arrogant wrongdoers.',
    socraticHint: 'Which severe punishment of Hellfire is described as crushing and ascending over the inner hearts?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-005',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'Two learners in a school in Mombasa notice a classmate wearing old torn shoes and begin whispering insults and giggling behind his back. How does Surah Al-Humazah condemn this action?',
    text: 'Two learners in a school in Mombasa notice a classmate wearing old torn shoes and begin whispering insults and giggling behind his back. How does Surah Al-Humazah condemn this action?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It identifies them as "Humazah" (backbiters and mockers) who face severe divine punishment unless they repent and apologize',
      'It praises them for noticing fashion mistakes in school uniforms',
      'It advises them to take photos of the shoes and post them on social media',
      'It says that making fun of poor people is completely harmless fun'
    ],
    correctAnswer: 'It identifies them as "Humazah" (backbiters and mockers) who face severe divine punishment unless they repent and apologize',
    explanation: 'Mocking and slandering a person for poverty or appearance is strictly forbidden in Islam. Surah Al-Humazah warns against this very behavior, demanding empathy, kindness, and repentance.',
    socraticHint: 'Which severe warning in the Surah applies directly to laughing at and defaming someone behind their back?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-006',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'According to the Prophet Muhammad (SAW), what does the Islamic term "Gheebah" (backbiting) mean?',
    text: 'According to the Prophet Muhammad (SAW), what does the Islamic term "Gheebah" (backbiting) mean?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Saying something about your brother or sister in their absence that they would dislike hearing',
      'Sharing a packed lunch of dates and milk with a traveling stranger',
      'Reciting the Holy Qur’an aloud during early morning Fajr prayer',
      'Inviting neighbors to attend Eid celebrations at home'
    ],
    correctAnswer: 'Saying something about your brother or sister in their absence that they would dislike hearing',
    explanation: 'The Prophet (SAW) defined backbiting: "It is saying something about your brother that he dislikes." When asked, "What if it is true?" he replied, "If it is true, you have backbitten him; and if it is not true, you have slandered (defamed) him."',
    socraticHint: 'How did the Prophet (SAW) define mentioning things about another person in their absence that they dislike?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-007',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What did the Prophet (SAW) compare backbiting a fellow Muslim to in Surah Al-Hujurat (49:12)?',
    text: 'What did the Prophet (SAW) compare backbiting a fellow Muslim to in Surah Al-Hujurat (49:12)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Eating the dead flesh of one’s own brother',
      'Drinking saltwater from the Red Sea',
      'Walking barefoot across hot desert coals',
      'Breaking a clay water pot in the courtyard'
    ],
    correctAnswer: 'Eating the dead flesh of one’s own brother',
    explanation: 'Surah Al-Hujurat (49:12) asks: "Would one of you like to eat the flesh of his brother when dead? You would detest it!" This vivid, disgusting imagery portrays the grave spiritual ugliness of backbiting.',
    socraticHint: 'Which shocking metaphor compares backbiting to consuming the flesh of one’s deceased sibling?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-008',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'How can a Muslim businessperson in Kenya avoid the negative behavior condemned in Surah Al-Humazah Ayah 2?',
    text: 'How can a Muslim businessperson in Kenya avoid the negative behavior condemned in Surah Al-Humazah Ayah 2?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By paying honest Zakat, giving Sadaqah to the needy, and using wealth to support community development rather than hoarding it arrogantly',
      'By hiding all profits under the floorboards of their warehouse',
      'By refusing to hire workers and keeping all money locked in safe boxes',
      'By purchasing gold jewelry solely to show off at wedding parties'
    ],
    correctAnswer: 'By paying honest Zakat, giving Sadaqah to the needy, and using wealth to support community development rather than hoarding it arrogantly',
    explanation: 'Islam does not forbid earning wealth honestly, but it condemns hoarding, greed, and arrogance. Wealth should circulate through Zakat, charity, fair wages, and ethical investments that benefit society.',
    socraticHint: 'How does giving Zakat and sharing wealth purify wealth and prevent the sin of greedy hoarding?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-009',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What description is given to the gates and columns of Hell in the final verses of Surah Al-Humazah (Ayah 8-9)?',
    text: 'What description is given to the gates and columns of Hell in the final verses of Surah Al-Humazah (Ayah 8-9)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It will be closed in over them (vaulted shut) in extended, towering columns',
      'It will have open wooden windows overlooking green river valleys',
      'It will be guarded by angels offering cool cups of pomegranate juice',
      'It will have iron ladders allowing wrongdoers to climb out easily'
    ],
    correctAnswer: 'It will be closed in over them (vaulted shut) in extended, towering columns',
    explanation: 'Ayat 8-9 state: "Innaha ‘alayhim mu’sadah, fee ‘amadin mumaddadah"—"Indeed, it is vaulted shut over them, in extended columns," meaning there is no escape for unrepentant evil-doers.',
    socraticHint: 'Which phrase describes Hell being vaulted shut in tall towering columns around the wrongdoers?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-010',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'When Amina is invited into a school WhatsApp group where pupils are sharing embarrassing pictures of their teacher, what should she do based on Surah Al-Humazah?',
    text: 'When Amina is invited into a school WhatsApp group where pupils are sharing embarrassing pictures of their teacher, what should she do based on Surah Al-Humazah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Refuse to take part, advise her classmates that cyberbullying and defamation are sinful, and leave the group',
      'Forward the pictures to other school groups to get more likes and followers',
      'Add rude comments under the pictures to show that she is funny',
      'Save the pictures on her phone to show to her family members at dinner'
    ],
    correctAnswer: 'Refuse to take part, advise her classmates that cyberbullying and defamation are sinful, and leave the group',
    explanation: 'Participating in online slander (cyberbullying) is a modern form of "Humazah" and "Lumazah." A conscientious Muslim refuses to take part, stands against wrongdoing, and protects others’ honor.',
    socraticHint: 'How does refusing to participate in digital gossip and advising others against cyberbullying protect moral integrity?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-011',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'Why does the fire in Surah Al-Humazah Ayah 7 specifically "mount right up to the hearts" (Allati tattali’u ‘ala al-af’idah)?',
    text: 'Why does the fire in Surah Al-Humazah Ayah 7 specifically "mount right up to the hearts" (Allati tattali’u ‘ala al-af’idah)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because the heart is the origin of arrogance, malice, greed, and ill-will toward others',
      'Because the heart is the only organ inside the human chest',
      'Because the heart pumps blood to the hands that counted the money',
      'Because physical fire has no effect on any other part of the body'
    ],
    correctAnswer: 'Because the heart is the origin of arrogance, malice, greed, and ill-will toward others',
    explanation: 'In Islamic theology, the heart (Qalb) is the seat of intention, faith, and spiritual health. The sins of malice, pride, and greed originate in the corrupt heart, which is why the divine punishment penetrates to the very core.',
    socraticHint: 'Why is the spiritual heart—the center of pride, greed, and hateful thoughts—specifically targeted by the fire?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-012',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'Which historic Quraysh leader in Makkah was notorious for slandering the Prophet (SAW) and is cited by many commentators as an example of the character warned in Surah Al-Humazah?',
    text: 'Which historic Quraysh leader in Makkah was notorious for slandering the Prophet (SAW) and is cited by many commentators as an example of the character warned in Surah Al-Humazah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Al-Walid ibn al-Mughirah (and Umayyah ibn Khalaf)',
      'Abu Bakr as-Siddiq',
      'Hamzah ibn Abd al-Muttalib',
      'Najashi (King of Abyssinia)'
    ],
    correctAnswer: 'Al-Walid ibn al-Mughirah (and Umayyah ibn Khalaf)',
    explanation: 'Tafsir commentators note that while the moral warning is universal, figures like Al-Walid ibn al-Mughirah and Umayyah ibn Khalaf were notorious for backbiting the Prophet (SAW) and boasting of their immense wealth.',
    socraticHint: 'Which arrogant Makkah pagan leader who defamed the Prophet is cited in historical commentaries of this Surah?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },

  // ==========================================
  // Unit 1 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-ire-u1-013',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'By what magnificent creation does Allah swear an oath in the opening verse of Surah Al-Asr (103:1)?',
    text: 'By what magnificent creation does Allah swear an oath in the opening verse of Surah Al-Asr (103:1)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By Time (the declining day / the passing era)',
      'By the mighty cedar trees of Lebanon',
      'By the stars of the desert sky',
      'By the mountains of the Arabian peninsula'
    ],
    correctAnswer: 'By Time (the declining day / the passing era)',
    explanation: 'Surah Al-Asr begins: "Wal-‘Asr"—"By time!" Allah swears by time to emphasize its immense preciousness and the fleeting nature of human earthly existence.',
    socraticHint: 'Which precious, non-renewable dimension of life does Allah swear by at the beginning of Surah Al-Asr?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-014',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What profound reality about humanity does Allah declare in Ayah 2 of Surah Al-Asr?',
    text: 'What profound reality about humanity does Allah declare in Ayah 2 of Surah Al-Asr?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Indeed, mankind is in loss (ruin / deficit)',
      'Mankind will naturally become wealthy without any effort',
      'Mankind will live forever on earth without facing death',
      'Mankind has conquered all the mysteries of the universe'
    ],
    correctAnswer: 'Indeed, mankind is in loss (ruin / deficit)',
    explanation: 'Ayah 2 states: "Inna al-insana lafee khusr"—"Indeed, mankind is in loss." Every passing moment that is not spent in obedience to Allah represents an eternal deficit and loss for human beings.',
    socraticHint: 'What general condition of deficit and "loss" does the Qur’an state all humanity is naturally in?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-015',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'How many conditions for escaping loss and attaining salvation are outlined in Surah Al-Asr Ayah 3?',
    text: 'How many conditions for escaping loss and attaining salvation are outlined in Surah Al-Asr Ayah 3?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Four conditions (Faith, Righteous Deeds, Advising Truth, Advising Patience)',
      'Two conditions (Wealth and Military power)',
      'Ten conditions (Fasting throughout the whole year)',
      'One condition (Memorizing the names of all prophets)'
    ],
    correctAnswer: 'Four conditions (Faith, Righteous Deeds, Advising Truth, Advising Patience)',
    explanation: 'Ayah 3 lists four essential requirements: 1) Iman (Faith), 2) Amal Salih (Righteous deeds), 3) Tawasaw bil-Haqq (Mutual counsel to truth), and 4) Tawasaw bis-Sabr (Mutual counsel to patience).',
    socraticHint: 'Which fourfold path of faith, good works, upholding truth, and patience protects humanity from loss?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-016',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What did the great Islamic scholar Imam Ash-Shafi’i remark about the profound wisdom of Surah Al-Asr?',
    text: 'What did the great Islamic scholar Imam Ash-Shafi’i remark about the profound wisdom of Surah Al-Asr?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'If Allah had revealed only this Surah as a proof to His creation, it would have been sufficient for them',
      'This Surah was only meant for ancient desert nomads and not for modern learners',
      'This Surah should only be recited during the pilgrimage of Hajj in Makkah',
      'The Surah is too short to teach any important moral lessons'
    ],
    correctAnswer: 'If Allah had revealed only this Surah as a proof to His creation, it would have been sufficient for them',
    explanation: 'Imam Ash-Shafi’i famously said: "If people were to reflect upon Surah Al-Asr alone, it would suffice them," because it encapsulates the entire human purpose, belief, ethics, and mutual responsibility in three concise verses.',
    socraticHint: 'Which famous Imam stated that Surah Al-Asr would have been sufficient for all humanity if nothing else had been revealed?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-017',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What does the third condition, "Tawasaw bil-Haqq" (advising one another to the truth), require of believers in their community?',
    text: 'What does the third condition, "Tawasaw bil-Haqq" (advising one another to the truth), require of believers in their community?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Encouraging one another to stand for justice, obey Allah’s commands, speak truth, and reject falsehood',
      'Agreeing with friends even when they tell lies or cheat in school tests',
      'Demanding that only people from one’s own tribe should be defended in court',
      'Remaining completely silent when seeing someone being bullied or mistreated'
    ],
    correctAnswer: 'Encouraging one another to stand for justice, obey Allah’s commands, speak truth, and reject falsehood',
    explanation: '"Tawasaw bil-Haqq" means mutually recommending and enjoining truth, justice, sincerity, and divine commandments, ensuring the community remains anchored in righteousness.',
    socraticHint: 'What does mutual encouragement in truth and justice require when living among peers and community members?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-018',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What does "Tawasaw bis-Sabr" (advising one another to patience and perseverance) mean for a Grade 5 pupil facing school challenges?',
    text: 'What does "Tawasaw bis-Sabr" (advising one another to patience and perseverance) mean for a Grade 5 pupil facing school challenges?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Supporting friends to remain steadfast, endure hardships patiently, keep working hard, and resist sinful temptations',
      'Telling friends to drop out of school whenever mathematics problems become difficult',
      'Complaining loudly and blaming others whenever an exam result is disappointing',
      'Fighting physically with classmates who perform better in academic tests'
    ],
    correctAnswer: 'Supporting friends to remain steadfast, endure hardships patiently, keep working hard, and resist sinful temptations',
    explanation: 'Sabr encompasses patience in doing good deeds, patience in staying away from sins, and patience during trials. Encouraging friends to persevere through difficulties honors Surah Al-Asr.',
    socraticHint: 'How does mutual encouragement in patience and perseverance help learners overcome academic and life hurdles?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-019',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'Why is time considered one of the most critical and non-renewable blessings granted by Allah to humanity?',
    text: 'Why is time considered one of the most critical and non-renewable blessings granted by Allah to humanity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Once time passes, it can never be bought back, stored, or retrieved, and every second brings humans closer to the Day of Judgment',
      'Because time only moves forward during daytime and pauses during the night',
      'Because clocks and watches are expensive items manufactured in European cities',
      'Because humans can store extra minutes in bank accounts for future use'
    ],
    correctAnswer: 'Once time passes, it can never be bought back, stored, or retrieved, and every second brings humans closer to the Day of Judgment',
    explanation: 'Hasan al-Basri famously said: "O son of Adam, you are but a number of days; whenever a day passes, a part of you has gone." Time cannot be recovered, making its righteous use essential.',
    socraticHint: 'Can passed time ever be bought back or recovered, or is every fleeting second a non-renewable divine gift?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-020',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'Rashid spends six hours every evening playing computer video games, missing his Maghrib and Isha prayers and leaving his homework undone. How does Surah Al-Asr correct Rashid’s lifestyle?',
    text: 'Rashid spends six hours every evening playing computer video games, missing his Maghrib and Isha prayers and leaving his homework undone. How does Surah Al-Asr correct Rashid’s lifestyle?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It warns him that wasting precious time in vanity while neglecting faith, prayers, and duties leads directly to spiritual loss',
      'It encourages him to play for eight hours instead of six so he beats his high score',
      'It says that video games are more important than daily prayers and academic study',
      'It suggests that homework should be thrown away because life on earth is short'
    ],
    correctAnswer: 'It warns him that wasting precious time in vanity while neglecting faith, prayers, and duties leads directly to spiritual loss',
    explanation: 'Surah Al-Asr teaches that wasting life without faith and righteous productivity brings eternal loss. Muslims must steward time responsibly, prioritizing worship, study, and family duties.',
    socraticHint: 'How does neglecting prayers and studies for endless gaming lead directly to the spiritual loss warned in Surah Al-Asr?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-021',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'What did the Prophet Muhammad (SAW) say about the two blessings that many people are careless with (Hadith in Sahih al-Bukhari)?',
    text: 'What did the Prophet Muhammad (SAW) say about the two blessings that many people are careless with (Hadith in Sahih al-Bukhari)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'There are two blessings in which many people are deceived (take for granted): Health and Free Time',
      'There are two blessings: Gold jewelry and Silver coins',
      'There are two blessings: High mountains and Flowing rivers',
      'There are two blessings: Fast camels and Sharp swords'
    ],
    correctAnswer: 'There are two blessings in which many people are deceived (take for granted): Health and Free Time',
    explanation: 'The Prophet (SAW) taught: "There are two blessings which many people lose: health and free time" (Bukhari). Both blessings must be invested in good works before illness and busy old age arrive.',
    socraticHint: 'Which two precious blessings of physical wellness and available hours did the Prophet say people take for granted?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-022',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'How did the noble Companions (Sahabah) demonstrate their deep love for Surah Al-Asr when meeting each other?',
    text: 'How did the noble Companions (Sahabah) demonstrate their deep love for Surah Al-Asr when meeting each other?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They would not separate or depart until one of them recited Surah Al-Asr to the other as a mutual reminder of their sacred mission',
      'They would write the Surah on stone tablets and bury them in the desert sand',
      'They only recited it once a year during the battle of Badr',
      'They refused to recite any other chapter of the Qur’an in their daily prayers'
    ],
    correctAnswer: 'They would not separate or depart until one of them recited Surah Al-Asr to the other as a mutual reminder of their sacred mission',
    explanation: 'Imam At-Tabarani recorded that whenever two Companions of the Prophet (SAW) met, they would not part until one recited Surah Al-Asr to the other and they concluded with greetings of peace (Salam).',
    socraticHint: 'What parting tradition of reciting Surah Al-Asr to one another did the Companions practice upon meeting?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-023',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'A learner named Fatuma is studying for her end-of-term examinations in Garissa. How does applying the balance of Surah Al-Asr help her organize her day?',
    text: 'A learner named Fatuma is studying for her end-of-term examinations in Garissa. How does applying the balance of Surah Al-Asr help her organize her day?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She creates a balanced daily timetable allocating focused time for daily prayers, syllabus revision, assisting with household chores, and healthy sleep',
      'She decides that because time is passing, revision is unnecessary and she should sleep all day',
      'She stops praying Salah because studying takes all of her available time',
      'She studies continuously without eating or sleeping until she collapses'
    ],
    correctAnswer: 'She creates a balanced daily timetable allocating focused time for daily prayers, syllabus revision, assisting with household chores, and healthy sleep',
    explanation: 'Surah Al-Asr inspires disciplined time management. A balanced Muslim student harmonizes spiritual obligations (prayers), academic excellence, domestic duties, and proper rest.',
    socraticHint: 'How does creating a balanced daily schedule for prayer, study, chores, and rest exemplify proper time stewardship?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },
  {
    id: 'q-g5-ire-u1-024',
    subStrandId: 'substrand-g5-ire-u1',
    prompt: 'How do Surah Al-Humazah and Surah Al-Asr complement each other in shaping the moral character of a Muslim?',
    text: 'How do Surah Al-Humazah and Surah Al-Asr complement each other in shaping the moral character of a Muslim?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Surah Al-Humazah warns against the destructive vices of slander, backbiting, and greed, while Surah Al-Asr provides the positive blueprint of faith, good works, truth, and patience',
      'Surah Al-Humazah is strictly for adults while Surah Al-Asr is strictly for young children',
      'They contradict each other because one praises wealth while the other praises poverty',
      'Neither Surah has any practical relevance to daily social life in modern Kenya'
    ],
    correctAnswer: 'Surah Al-Humazah warns against the destructive vices of slander, backbiting, and greed, while Surah Al-Asr provides the positive blueprint of faith, good works, truth, and patience',
    explanation: 'Together, the two chapters provide both prevention (cleansing oneself of destructive sins like slander and greed in Al-Humazah) and construction (building a righteous life of faith, deeds, truth, and patience in Al-Asr).',
    socraticHint: 'How does one Surah warn against destructive speech and greed, while the other builds a positive formula for salvation?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U1'
  },

  // ==========================================
  // Unit 2 - Mission 1: Questions 001 - 012
  // ==========================================
  {
    id: 'q-g5-ire-u2-001',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What does the title "At-Takathur" in the 102nd chapter of the Holy Qur’an mean?',
    text: 'What does the title "At-Takathur" in the 102nd chapter of the Holy Qur’an mean?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mutual rivalry and competition in multiplying worldly increase (wealth and numbers)',
      'The morning sunrise over the desert plains',
      'The opening chapter of the Holy Mushaf',
      'The sacred migration from Makkah to Madinah'
    ],
    correctAnswer: 'Mutual rivalry and competition in multiplying worldly increase (wealth and numbers)',
    explanation: 'Surah At-Takathur (102:1) addresses "At-Takathur"—the mutual competition, rivalry, and boasting in accumulating material possessions, status, wealth, and children.',
    socraticHint: 'Which concept refers to competing with and boasting against others in accumulating possessions and numbers?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-002',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What does Ayah 1-2 of Surah At-Takathur state about what diverts humans from remembering Allah?',
    text: 'What does Ayah 1-2 of Surah At-Takathur state about what diverts humans from remembering Allah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Competition in worldly increase diverts you, until you visit the graves',
      'Reading books of science diverts you until you become teachers',
      'Farming maize in the highlands diverts you until harvest time',
      'Traveling across the ocean diverts you until you reach port'
    ],
    correctAnswer: 'Competition in worldly increase diverts you, until you visit the graves',
    explanation: 'Ayat 1-2 declare: "Alhakumu at-takathur, hatta zurtumu al-maqabir"—"Competition in worldly increase diverts you, until you visit the graveyards." Obsession with worldly gain distracts people until death.',
    socraticHint: 'What competition diverts people until they reach the final destination of the graveyards?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-003',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What profound question of divine accountability concludes Surah At-Takathur in Ayah 8?',
    text: 'What profound question of divine accountability concludes Surah At-Takathur in Ayah 8?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Then you will surely be asked on that Day about the pleasures (blessings of Allah)',
      'Then you will be asked how many gold coins you accumulated in your house',
      'Then you will be asked why you traveled across foreign countries',
      'Then you will be asked how many war camels were grazing in your paddock'
    ],
    correctAnswer: 'Then you will surely be asked on that Day about the pleasures (blessings of Allah)',
    explanation: 'Ayah 8 concludes: "Thumma latus’alunna yawma’idhin ‘ani an-na’eem"—"Then you will surely be asked that Day about the pleasure/delights (blessings)." We must account for how we used every gift from Allah.',
    socraticHint: 'What will humans surely be questioned about on the Day of Judgment according to the final Ayah?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-004',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What are examples of "An-Na’eem" (blessings of Allah) that Kenyan learners enjoy and must thank Allah for?',
    text: 'What are examples of "An-Na’eem" (blessings of Allah) that Kenyan learners enjoy and must thank Allah for?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Good health, eyesight, intellect, clean drinking water, food, loving parents, and national peace',
      'Possessing weapons, armored vehicles, and large iron shields',
      'Having the ability to shout louder than teachers during class',
      'Boasting about how many expensive smartphones one’s family owns'
    ],
    correctAnswer: 'Good health, eyesight, intellect, clean drinking water, food, loving parents, and national peace',
    explanation: '"An-Na’eem" encompasses all divine gifts—life, health, sanity, sight, hearing, safety, cold water on a hot day, and daily nourishment. True gratitude means using these blessings in obedience to Allah.',
    socraticHint: 'Which fundamental gifts of physical health, water, food, sight, and family are divine blessings?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-005',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What does "Ilm al-Yaqeen" mean as mentioned in Surah At-Takathur Ayah 5?',
    text: 'What does "Ilm al-Yaqeen" mean as mentioned in Surah At-Takathur Ayah 5?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The knowledge of certainty based on divine truth and firm belief',
      'The guesswork of fortune tellers in the marketplace',
      'The human opinion of foreign philosophy teachers',
      'The temporary rules of games played in the schoolyard'
    ],
    correctAnswer: 'The knowledge of certainty based on divine truth and firm belief',
    explanation: '"Ilm al-Yaqeen" is the knowledge of absolute certainty that comes from divine revelation, giving a believer unshakeable conviction about the reality of the Hereafter before seeing it physically.',
    socraticHint: 'Which level of deep certainty refers to knowledge based on revealed divine truth?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-006',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What does "Ayn al-Yaqeen" refer to in Surah At-Takathur Ayah 7?',
    text: 'What does "Ayn al-Yaqeen" refer to in Surah At-Takathur Ayah 7?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The vision or sight of certainty (seeing the reality with one’s own physical eyes on the Day of Judgment)',
      'Closing one’s eyes while taking an examination at school',
      'Using a magnifying glass to read Arabic calligraphy in books',
      'Looking at the reflection of the moon in a desert oasis'
    ],
    correctAnswer: 'The vision or sight of certainty (seeing the reality with one’s own physical eyes on the Day of Judgment)',
    explanation: '"Ayn al-Yaqeen" is the certainty that comes from direct physical observation and visual witness, when every soul will see Hellfire and the Day of Judgment clearly before their eyes.',
    socraticHint: 'Which certainty refers to witnessing the reality directly with your own physical eyes?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-007',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'Two wealthy families in a village in Isiolo constantly compete to see who builds the tallest mansion and buys the most luxury cars, ignoring poor neighbors. How does Surah At-Takathur evaluate their competition?',
    text: 'Two wealthy families in a village in Isiolo constantly compete to see who builds the tallest mansion and buys the most luxury cars, ignoring poor neighbors. How does Surah At-Takathur evaluate their competition?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It rebukes their rivalry as a foolish distraction that diverts them from preparing for the grave and eternal accountability',
      'It praises them as the most beloved servants of Allah in Kenya',
      'It encourages other families to borrow bank loans to join the building competition',
      'It guarantees that tall buildings will be turned into palaces in Paradise'
    ],
    correctAnswer: 'It rebukes their rivalry as a foolish distraction that diverts them from preparing for the grave and eternal accountability',
    explanation: 'Surah At-Takathur directly addresses this foolish vanity: competing in material displays diverts hearts from remembering death, judgment, and using wealth to uplift the needy.',
    socraticHint: 'How does the Surah condemn competing in material displays and wasting resources instead of preparing for the grave?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-008',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What did the Prophet Muhammad (SAW) say true richness consists of in Sahih al-Bukhari?',
    text: 'What did the Prophet Muhammad (SAW) say true richness consists of in Sahih al-Bukhari?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Richness does not lie in an abundance of worldly goods; true richness is the richness of the soul (contentment of the heart)',
      'Richness is having more camels than any tribe in Arabia',
      'Richness is possessing ten palaces made of carved soapstone',
      'Richness is wearing silk clothing embroidered with pure gold threads'
    ],
    correctAnswer: 'Richness does not lie in an abundance of worldly goods; true richness is the richness of the soul (contentment of the heart)',
    explanation: 'The Prophet (SAW) taught: "Richness is not having many possessions, but richness is the contentment of the soul (Ghina an-Nafs)." A contented heart is peaceful and free from greedy competition.',
    socraticHint: 'Did the Prophet say true wealth comes from an abundance of possessions or from inner contentment of the soul?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-009',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'How does the Islamic virtue of "Shukr" (gratitude) protect a believer from the traps of At-Takathur?',
    text: 'How does the Islamic virtue of "Shukr" (gratitude) protect a believer from the traps of At-Takathur?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It makes a person appreciate whatever Allah has provided, fostering inner peace, generosity, and contentment instead of greedy comparison',
      'It makes a person boast to their classmates that Allah favors them more than others',
      'It encourages believers to stop working because gratitude produces magic food',
      'It requires people to give away their clothes and walk without shoes'
    ],
    correctAnswer: 'It makes a person appreciate whatever Allah has provided, fostering inner peace, generosity, and contentment instead of greedy comparison',
    explanation: 'Shukr recognizes that all blessings come from Allah. A grateful believer is content with their provision, thanks Allah with worship, and shares with others rather than obsessing over having more than their neighbor.',
    socraticHint: 'How does thanking Allah for what you have cultivate contentment and eliminate envious competition?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-010',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'When pupils at school compare the brands of their school bags and mock those with plain bags, what advice from Surah At-Takathur should be shared?',
    text: 'When pupils at school compare the brands of their school bags and mock those with plain bags, what advice from Surah At-Takathur should be shared?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Remind them that material brands are fleeting and unimpressive to Allah; what matters is knowledge, good character, and thanking Allah for having a bag',
      'Advise them to ask their parents to buy even more expensive bags on credit',
      'Encourage them to hide the bags of poor pupils in the latrines',
      'Tell them that school bags determine a person’s eternal rank in Jannah'
    ],
    correctAnswer: 'Remind them that material brands are fleeting and unimpressive to Allah; what matters is knowledge, good character, and thanking Allah for having a bag',
    explanation: 'Surah At-Takathur teaches that competing in material brands is vanity. In Islam, nobility is determined by Taqwa (God-consciousness) and moral conduct, not designer logos or wealth.',
    socraticHint: 'Why are good character, knowledge, and gratitude far more valuable than competing over material brands?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-011',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'Why does Surah At-Takathur use the phrase "until you visit the graves" (Hatta zurtumu al-maqabir) to describe death?',
    text: 'Why does Surah At-Takathur use the phrase "until you visit the graves" (Hatta zurtumu al-maqabir) to describe death?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'To signify that the grave is merely a temporary resting place (Barzakh) and visit, because the final eternal home is in the Hereafter',
      'Because dead bodies stay in the grave for only twenty-four hours before disappearing',
      'Because humans can leave the cemetery whenever they wish to visit relatives',
      'To indicate that visiting cemeteries on weekends is the only duty of Muslims'
    ],
    correctAnswer: 'To signify that the grave is merely a temporary resting place (Barzakh) and visit, because the final eternal home is in the Hereafter',
    explanation: 'The word "zurtum" (you visited) subtly implies that a stay in the grave is not the permanent end; it is a temporary stage (Barzakh) before the resurrection to eternal accountability in the Hereafter.',
    socraticHint: 'Why is the grave called a "visit" rather than a permanent destination in the journey of the soul?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-012',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What core lesson does Surah At-Takathur convey about human purpose on earth?',
    text: 'What core lesson does Surah At-Takathur convey about human purpose on earth?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Human life is not an endless contest to amass worldly possessions, but a sacred trust to worship Allah, practice gratitude, and prepare for eternal reckoning',
      'Humans should focus on hoarding as much gold as possible before becoming old',
      'Humans should never own any clothes, food, or shelter in this worldly life',
      'The only purpose of human existence is to boast of numbers and clan ancestry'
    ],
    correctAnswer: 'Human life is not an endless contest to amass worldly possessions, but a sacred trust to worship Allah, practice gratitude, and prepare for eternal reckoning',
    explanation: 'The overarching message of Surah At-Takathur is that life is a purposeful preparation for eternity. Earthly blessings are tests of stewardship, not trophies for self-glorification or boastful rivalry.',
    socraticHint: 'What higher spiritual purpose of worship, gratitude, and moral accountability defines human life on earth?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },

  // ==========================================
  // Unit 2 - Mission 2: Questions 013 - 024
  // ==========================================
  {
    id: 'q-g5-ire-u2-013',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What is the literal meaning of the title "Al-Qari’ah" in Surah 101 of the Holy Qur’an?',
    text: 'What is the literal meaning of the title "Al-Qari’ah" in Surah 101 of the Holy Qur’an?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Striking Calamity (The Day of Resurrection that strikes hearts with awe)',
      'The Morning Star that shines in the dawn sky',
      'The Gentle Breeze that blows over the ocean waters',
      'The Holy City where the Prophet was born'
    ],
    correctAnswer: 'The Striking Calamity (The Day of Resurrection that strikes hearts with awe)',
    explanation: '"Al-Qari’ah" comes from the Arabic root meaning "to strike with sudden, loud impact." It refers to the Day of Resurrection, whose immense thunderous reality strikes fear and awe into all hearts.',
    socraticHint: 'Which title translates as "The Striking Calamity," referring to the awe-inspiring Day of Judgment?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-014',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'How will human beings appear on the Day of Al-Qari’ah according to Ayah 4?',
    text: 'How will human beings appear on the Day of Al-Qari’ah according to Ayah 4?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Like moths scattered about in confusion (Ka-al-farashi al-mabthuth)',
      'Like stone statues standing frozen in rows',
      'Like birds singing joyfully in tall green trees',
      'Like fish swimming peacefully in deep ocean waters'
    ],
    correctAnswer: 'Like moths scattered about in confusion (Ka-al-farashi al-mabthuth)',
    explanation: 'Ayah 4 states: "Yawma yakoonu an-nasu ka-al-farashi al-mabthuth"—"The Day mankind will be like moths scattered about," wandering in overwhelming shock, confusion, and awe.',
    socraticHint: 'Which small, fragile winged creatures scattered in confusion describe the state of humanity on that Day?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-015',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What will happen to the solid, massive mountains on that Day according to Ayah 5?',
    text: 'What will happen to the solid, massive mountains on that Day according to Ayah 5?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They will be like fluffed, carded wool floating in the air (Ka-al-’ihni al-manfush)',
      'They will grow twice as high and touch the clouds',
      'They will turn into solid bars of pure gold and silver',
      'They will remain completely undisturbed without any change'
    ],
    correctAnswer: 'They will be like fluffed, carded wool floating in the air (Ka-al-’ihni al-manfush)',
    explanation: 'Ayah 5 says: "Wa takoonu al-jibalu ka-al-’ihni al-manfush"—"And the mountains will be like carded wool." Even the mightiest mountains will crumble into lightweight, floating fibers of dust.',
    socraticHint: 'Which soft, fluffy textile material floating in the air describes the crumbled state of mountains?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-016',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What divine instrument of justice is used to evaluate human deeds in Surah Al-Qari’ah Ayah 6-8?',
    text: 'What divine instrument of justice is used to evaluate human deeds in Surah Al-Qari’ah Ayah 6-8?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Scales of justice (Al-Mawazin / Al-Mizan)',
      'A golden measuring tape used by angels',
      'An hourglass filled with colored sand',
      'A written examination paper with multiple-choice questions'
    ],
    correctAnswer: 'The Scales of justice (Al-Mawazin / Al-Mizan)',
    explanation: 'Surah Al-Qari’ah refers to "Mawazin" (the Scales of justice). On the Day of Judgment, every person’s righteous deeds and evil actions will be placed upon the Mizan to be weighed with absolute divine precision.',
    socraticHint: 'Which instrument of weighing (the Scales/Mizan) measures the heavy and light balance of deeds?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-017',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What joyful reward awaits the person whose scale of good deeds is heavy in Ayah 6-7?',
    text: 'What joyful reward awaits the person whose scale of good deeds is heavy in Ayah 6-7?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He will be in a life of pleasant, well-pleased contentment in Jannah (Paradise)',
      'He will be granted a crown of diamonds to reign as king of an earthly island',
      'He will never have to answer any questions about his past actions',
      'He will be sent back to earth to live for another hundred years'
    ],
    correctAnswer: 'He will be in a life of pleasant, well-pleased contentment in Jannah (Paradise)',
    explanation: 'Ayat 6-7 state: "Fa-amma man thaqulat mawazeenuhu, fahuwa fee ‘eeshatin radiyah"—"Then as for him whose scales are heavy [with good deeds], he will be in a pleasant, well-pleased life in Paradise."',
    socraticHint: 'What blissful and well-pleased life in Paradise awaits the one whose righteous deeds tip the scales?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-018',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What will be the dwelling of the person whose scale of good deeds is light in Ayah 8-9?',
    text: 'What will be the dwelling of the person whose scale of good deeds is light in Ayah 8-9?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'His refuge and dwelling will be the Abyss (Hawiyah)',
      'A quiet garden by the side of a cold mountain stream',
      'A comfortable room in the palace of the angels',
      'An ordinary village house on the outskirts of Makkah'
    ],
    correctAnswer: 'His refuge and dwelling will be the Abyss (Hawiyah)',
    explanation: 'Ayat 8-9 declare: "Wa-amma man khaffat mawazeenuhu, fa-ummuhu hawiyah"—"But as for him whose balance is light, his mother [dwelling/refuge] will be an abyss (Hawiyah)."',
    socraticHint: 'Which terrible abyss (Hawiyah) is named as the dwelling for those whose good deeds are light?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-019',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'How does Allah describe "Hawiyah" in the concluding Ayat 10-11 of Surah Al-Qari’ah?',
    text: 'How does Allah describe "Hawiyah" in the concluding Ayat 10-11 of Surah Al-Qari’ah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It is "Narun hamiyah"—an intensely blazing, scorching fire!',
      'It is a cold, icy cave beneath the ocean floor',
      'It is an endless desert with howling winds and dust',
      'It is a dark cloud that blocks out the sunlight'
    ],
    correctAnswer: 'It is "Narun hamiyah"—an intensely blazing, scorching fire!',
    explanation: 'Ayat 10-11 explain: "Wa ma adraka ma hiyah? Narun hamiyah!"—"And what can make you know what it is? It is a Fire, intensely blazing and hot!"',
    socraticHint: 'Which Arabic phrase meaning an intensely scorching and blazing fire describes Hawiyah?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-020',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What everyday good actions can a Grade 5 pupil in Kenya perform to make their scales heavy on the Day of Judgment?',
    text: 'What everyday good actions can a Grade 5 pupil in Kenya perform to make their scales heavy on the Day of Judgment?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Praying on time, speaking the truth, being respectful to parents and teachers, helping classmates, and giving charity',
      'Boasting about how many expensive clothes they own compared to others',
      'Cheating on exams and hiding other students’ books in the rubbish bin',
      'Refusing to help with home chores and arguing with elderly neighbors'
    ],
    correctAnswer: 'Praying on time, speaking the truth, being respectful to parents and teachers, helping classmates, and giving charity',
    explanation: 'Every righteous deed—performing Salah, truthfulness, kindness to parents, assisting peers, cleaning the environment, and saying Dhikr—carries real weight on the divine Scales (Mizan).',
    socraticHint: 'Which set of actions includes punctuality in prayer, honesty, filial respect, and kindness?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-021',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What easy phrase did Prophet Muhammad (SAW) describe as "light on the tongue, heavy on the Scale, and beloved to the Most Merciful"?',
    text: 'What easy phrase did Prophet Muhammad (SAW) describe as "light on the tongue, heavy on the Scale, and beloved to the Most Merciful"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'SubhanAllahi wa bihamdihi, SubhanAllahil-Adheem',
      'La hawla wala quwwata illa billahil-Kabir',
      'Allahu Akbar, Allahu Akbar, Walillahil-Hamd',
      'Astaghfirullahal-Adheem al-ladhi la ilaha illa Huwa'
    ],
    correctAnswer: 'SubhanAllahi wa bihamdihi, SubhanAllahil-Adheem',
    explanation: 'In Sahih al-Bukhari, the Prophet (SAW) said: "Two words are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: ‘SubhanAllahi wa bihamdihi, SubhanAllahil-Adheem’" (Glory and praise be to Allah, Glory be to Allah the Almighty).',
    socraticHint: 'Which pair of tasbeeh phrases praising Allah’s majesty and perfection is famously heavy on the Scales?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-022',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'Why does Surah Al-Qari’ah describe the refuge of the wicked as their "mother" (Fa-ummuhu hawiyah)?',
    text: 'Why does Surah Al-Qari’ah describe the refuge of the wicked as their "mother" (Fa-ummuhu hawiyah)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Just as a mother clings to and holds her child closely, the pit of Hellfire will cling to and envelop the wrongdoer without letting them go',
      'Because mothers in Makkah were responsible for taking care of desert fires',
      'Because the word for mother in Arabic has no other linguistic meaning',
      'Because the wrongdoer will be given a comfortable bed inside the abyss'
    ],
    correctAnswer: 'Just as a mother clings to and holds her child closely, the pit of Hellfire will cling to and envelop the wrongdoer without letting them go',
    explanation: 'Linguists and Tafsir scholars explain that "his mother will be Hawiyah" means the Abyss will embrace, cling to, and envelop the condemned like a mother tightly clasping her child, with no possibility of release.',
    socraticHint: 'How does the metaphor of a mother embracing her child convey how inescapably the abyss will envelop the wrongdoer?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-023',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'How does knowing that our deeds will be weighed on the Mizan encourage a learner to do small acts of kindness?',
    text: 'How does knowing that our deeds will be weighed on the Mizan encourage a learner to do small acts of kindness?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It teaches that no good deed is too small; even removing a thorn from a path or offering a friendly smile can tip the balance toward Paradise',
      'It shows that small deeds are completely ignored and only millionaires can enter Paradise',
      'It proves that deeds on earth have no connection to what happens after death',
      'It suggests that people should only do good deeds when other people are watching and applauding'
    ],
    correctAnswer: 'It teaches that no good deed is too small; even removing a thorn from a path or offering a friendly smile can tip the balance toward Paradise',
    explanation: 'The Prophet (SAW) taught: "Do not regard any good deed as insignificant, even meeting your brother with a cheerful face." On the Scales, every atom’s weight of good (Zarratin khayran) counts (Surah Az-Zalzalah 99:7).',
    socraticHint: 'Why is no good deed insignificant when every single righteous action adds real weight to the Scales?',
    points: 15,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  },
  {
    id: 'q-g5-ire-u2-024',
    subStrandId: 'substrand-g5-ire-u2',
    prompt: 'What common theme unites both Surah At-Takathur and Surah Al-Qari’ah in the Holy Qur’an?',
    text: 'What common theme unites both Surah At-Takathur and Surah Al-Qari’ah in the Holy Qur’an?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Both chapters emphasize the reality of the Hereafter, warning against being distracted by temporary worldly pursuits and urging believers to prepare righteous deeds for the Scales of Judgment',
      'Both chapters explain the military victories of Islamic armies in ancient Persia',
      'Both chapters describe how to build wooden trade sailing dhows on the Indian Ocean',
      'Both chapters give rules on how to conduct business partnerships in foreign marketplaces'
    ],
    correctAnswer: 'Both chapters emphasize the reality of the Hereafter, warning against being distracted by temporary worldly pursuits and urging believers to prepare righteous deeds for the Scales of Judgment',
    explanation: 'Both Makkan chapters call humanity to awaken from the stupor of worldly obsession: At-Takathur warns against material distraction until the grave, while Al-Qari’ah depicts the dramatic reckoning where only heavy scales of good deeds will matter.',
    socraticHint: 'How do both chapters call humans to look past temporary worldly vanity and focus on eternal accountability and good deeds?',
    points: 20,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U2'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else {
    db.questions.push(q);
    console.log(`Added question: ${q.id}`);
  }
});

// Save updated database
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 1 to cbe_database.json!');
console.log(`Total questions in db: ${db.questions.length}`);
console.log(`Total missions in db: ${db.missions.length}`);
