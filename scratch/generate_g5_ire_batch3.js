import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Generating Grade 5 IRE Batch 3 (Units 5 & 6) ---');

// 1. Batch 3 Sub-strands (Units 5 & 6)
const subStrandsToAdd = [
  {
    id: 'substrand-g5-ire-u5',
    strandId: 'strand-g5-ire-sirah',
    learningAreaId: 'la-ire-g5',
    title: 'The Open Proclamation of Islam (Da’wah Jahriyyah) and Early Persecutions',
    description: 'Tracing the prophetic mission from the secret phase to the public proclamation: The divine command to openly invite people to Islam (Surah Al-Hijr 15:94 and Surah Ash-Shu\'ara 26:214); the public address from Mount Safa and the reaction of the Quraysh clans; opposition from Abu Lahab and revelation of Surah Al-Masad; persecution of early vulnerable Muslims (Bilal ibn Rabah, Sumayyah bint Khayyat, Yasir ibn Amir, Ammar ibn Yasir, Khabbab ibn al-Aratt); steadfastness (Sabr) in faith; the first and second migrations to Abyssinia (Habashah); the justice of King Negus (Ashamah an-Najashi); and Ja’far ibn Abi Talib’s recitation of Surah Maryam.',
    cbeCompetency: 'Moral resilience, courage in upholding truth, empathy for the oppressed, peaceful dialogue, and refuge protection',
    estimatedMinutes: 30,
    order: 5
  },
  {
    id: 'substrand-g5-ire-u6',
    strandId: 'strand-g5-ire-ibadah',
    learningAreaId: 'la-ire-g5',
    title: 'Belief in Revealed Divine Scriptures (Kutub) and the Archangels (Mala’ikah)',
    description: 'Exploring two essential Pillars of Iman: Belief in the revealed Divine Books (Tawrat to Musa AS, Zabur to Dawud AS, Injil to Isa AS, and the Holy Qur’an to Muhammad SAW; the Scrolls/Suhuf of Ibrahim and Musa AS; the Holy Qur’an as the final, unchanged, preserved guidance for all humanity); and Belief in the Angels (Mala’ikah) created from light, their obedience without sin or fatigue, and specific roles of major Archangels (Jibril, Mika’il, Israfil, Malak al-Mawt, Kiraman Katibin - Raqib and Atid, Malik, Ridwan, Munkar and Nakir).',
    cbeCompetency: 'Theological literacy, accountability for daily actions, reverence for divine revelation, and moral self-monitoring',
    estimatedMinutes: 30,
    order: 6
  }
];

subStrandsToAdd.forEach(ss => {
  const idx = db.subStrands.findIndex(item => item.id === ss.id);
  if (idx >= 0) db.subStrands[idx] = ss;
  else db.subStrands.push(ss);
});

// 2. Batch 3 Lessons (Units 5 & 6: 4 Lessons)
const lessonsToAdd = [
  {
    id: 'lesson-g5-ire-u5-l1',
    subStrandId: 'substrand-g5-ire-u5',
    title: 'The Public Call at Mount Safa and the Opposition of Quraysh',
    content: 'After three years of secret invitation (Da’wah Sirriyyah), Allah commanded Prophet Muhammad (SAW) to openly declare the message of Tawhid (monotheism). Allah revealed Surah Ash-Shu\'ara (26:214): "And warn your closest kinsfolk," followed by Surah Al-Hijr (15:94): "Proclaim openly what you are commanded and turn away from the polytheists." Following these divine instructions, the Prophet (SAW) climbed Mount Safa in Makkah and called out the traditional alarm: "Ya Sabahah!" When the various clans of Quraysh gathered, he asked them: "If I were to tell you that an armed horse cavalry was in the valley behind this mountain preparing to attack you, would you believe me?" All the chieftains unanimously replied: "Yes! We have never experienced anything from you except honesty and truth (As-Sadiq Al-Amin)." The Prophet (SAW) then declared: "I am a warner sent to you before the arrival of a severe punishment." Hearing this call to abandon idol worship and worship Allah alone, his uncle Abu Lahab angrily shouted: "May you perish for the rest of this day! Is this why you gathered us?" In response to this arrogance and hostility, Allah revealed Surah Al-Masad (Surah 111), exposing the fate of Abu Lahab and his wife Umm Jamil. Despite insults, public boycotts, and malicious plots by the Quraysh aristocracy, the Prophet remained peaceful, patient, and uncompromising in his divine duty.',
    didYouKnow: 'The Prophet (SAW) was known across Makkah for forty years as "Al-Amin" (The Trustworthy) and "As-Sadiq" (The Truthful) before he was commanded to preach publicly, showing that personal integrity precedes public leadership.',
    kenyanContext: 'In Kenya, student leaders at Pumwani High School in Nairobi practice moral courage by speaking up against exam cheating and school bullying, mirroring the prophetic courage to uphold righteousness regardless of popular peer pressure.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u5-l2',
    subStrandId: 'substrand-g5-ire-u5',
    title: 'Persecution of Early Believers and the Sanctuary in Abyssinia',
    content: 'As the message of Islam spread openly, the chieftains of Quraysh initiated systematic torture against vulnerable believers, especially slaves and orphans who had no tribal protection. Bilal ibn Rabah, an enslaved Ethiopian owned by Umayyah ibn Khalaf, was placed on scorching desert rocks with a massive boulder crushing his chest while ordered to worship idols; Bilal responded only with: "Ahad, Ahad!" (Allah is One, Allah is One!) until Abu Bakr purchased and emancipated him. The family of Yasir suffered severe torture: Yasir and his courageous wife Sumayyah bint Khayyat were martyred by Abu Jahl, making Sumayyah the first martyr (Shahidah) in Islam, while their son Ammar persevered through immense trial. To shield his followers from unbearable torment, Prophet Muhammad (SAW) instructed a group of believers to migrate across the Red Sea to the Christian kingdom of Abyssinia (Al-Habashah, modern-day Ethiopia), telling them: "Go to Abyssinia, for therein is a righteous Christian king (Ashamah an-Najashi / Negus) under whom no one is wronged; it is a land of justice." Led by Ja’far ibn Abi Talib, approximately 80 Muslims found safe haven. When the Quraysh sent ambassadors with rich gifts demanding their deportation, King Negus called the Muslims to explain their faith. Ja’far eloquently described how Islam rescued them from ignorance, polytheism, and cruelty to kindness, truth, and chastity, and recited from Surah Maryam regarding the virgin birth of Prophet Isa (Jesus AS). King Negus wept until his beard was soaked, declaring that the words of the Qur\'an and the Gospel come from the same divine light, and granted the Muslims permanent royal protection.',
    didYouKnow: 'King Negus of Abyssinia later embraced Islam; when he passed away, Prophet Muhammad (SAW) led the absentee funeral prayer (Salat al-Gha\'ib) for him in Madinah!',
    kenyanContext: 'Kenya hosts thousands of refugees fleeing war and oppression in regions like Somalia, South Sudan, and the Great Lakes at Kakuma and Daadab, demonstrating the same humanitarian sanctuary that King Negus gave the early Muslims.',
    order: 2,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u6-l1',
    subStrandId: 'substrand-g5-ire-u6',
    title: 'Belief in the Revealed Divine Scriptures (Kutubullah)',
    content: 'Belief in the Divine Scriptures (Kutubullah) is the third Pillar of Iman. Muslims believe that Allah revealed books to His chosen messengers to teach humanity monotheism, righteous conduct, and divine law. The major divine scriptures named in the Holy Qur’an are: 1) The Tawrat (Torah), revealed to Prophet Musa (Moses AS) to guide the Children of Israel; 2) The Zabur (Psalms), revealed to Prophet Dawud (David AS), containing praises, hymns, and wisdom; 3) The Injil (Gospel), revealed to Prophet Isa (Jesus AS), preaching compassion, spiritual purity, and monotheism; and 4) The Holy Qur’an, revealed to the final Prophet, Muhammad (SAW), through Archangel Jibril over 23 years. In addition, Allah revealed Suhuf (Scrolls) to Prophet Ibrahim (Abraham AS) and Musa (AS). While previous scriptures were directed to specific historical communities and suffered human alteration, loss, or translation distortion over centuries, Allah has promised to protect the Holy Qur’an from any corruption or alteration: "Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian" (Surah Al-Hijr 15:9). The Qur’an is the final, universal divine revelation for all humankind, superseding earlier laws while confirming the divine truths previously revealed.',
    didYouKnow: 'The Holy Qur’an is the only religious scripture in human history that has been memorized word-for-word in its original Arabic language from cover to cover by millions of children and adults (known as Huffaz) across centuries!',
    kenyanContext: 'In Lamu Old Town and Mombasa, Madrasah and Qur’an memorization centers train young Kenyan boys and girls who recite the entire Qur’an with accurate Tajweed, keeping the divine preservation alive in East Africa.',
    order: 1,
    durationMinutes: 15
  },
  {
    id: 'lesson-g5-ire-u6-l2',
    subStrandId: 'substrand-g5-ire-u6',
    title: 'Belief in the Angels of Allah (Mala’ikah) and Their Duties',
    content: 'Belief in the Angels (Mala’ikah) is the second Pillar of Iman. Angels are pure, honorable spiritual creations created by Allah from light (Nur). Unlike humans and jinn, angels do not possess free will to disobey Allah, nor do they eat, drink, sleep, marry, or experience gender or physical fatigue. They worship Allah continuously and execute His divine decrees with absolute perfection (Surah At-Tahrim 66:6). Every Muslim must know the key Archangels and their assigned roles: 1) Jibril (Gabriel) - the Angel of Divine Revelation (Wahy), who brought Allah’s words to all prophets; 2) Mika’il (Michael) - the Angel responsible for rainfall, winds, vegetation, and natural sustenance; 3) Israfil - the Angel entrusted with blowing the Trumpet (As-Soor) on the Day of Judgment to end the world and resurrect creation; 4) Malak al-Mawt (The Angel of Death) - tasked with taking the souls of living beings when their appointed lifespan ends; 5) Kiraman Katibin (The Noble Scribes) - Raqib on the right shoulder recording good deeds, and Atid on the left recording sins; 6) Malik - the guardian of Jahannam (Hellfire); 7) Ridwan - the guardian of Jannah (Paradise); and 8) Munkar and Nakir - the two angels who question every soul in the grave (Al-Qabr) regarding their Lord, religion, and Prophet. Awareness of the recording angels inspires a Muslim child to live with Ihsan (God-consciousness), acting honestly even when nobody is looking.',
    didYouKnow: 'Angels love gatherings where knowledge is sought; Prophet Muhammad (SAW) taught that when students gather to learn, angels lower their wings over them in deep respect and surround them with mercy!',
    kenyanContext: 'Learners in Wajir and Garissa practice digital and examination integrity by remembering that even when invigilators look away, the recording angels (Kiraman Katibin) write down every truthful or deceitful action.',
    order: 2,
    durationMinutes: 15
  }
];

lessonsToAdd.forEach(l => {
  const idx = db.lessons.findIndex(item => item.id === l.id);
  if (idx >= 0) db.lessons[idx] = l;
  else db.lessons.push(l);
});

// 3. Batch 3 Missions (Units 5 & 6: 4 Missions)
const missionsToAdd = [
  {
    id: 'mission-g5-ire-u5-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u5',
    lessonId: 'lesson-g5-ire-u5-l1',
    title: 'Mount Safa Public Proclamation Quest',
    description: 'Accompany Prophet Muhammad (SAW) as he ascends Mount Safa to declare the message of Tawhid to the Quraysh, confronting tribal arrogance with unwavering truth!',
    order: 77,
    orderIndex: 77,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-safa-herald',
    badge: {
      name: 'Herald of Mount Safa',
      icon: 'volume-2'
    },
    questionIds: [
      'q-g5-ire-u5-001',
      'q-g5-ire-u5-002',
      'q-g5-ire-u5-003',
      'q-g5-ire-u5-004',
      'q-g5-ire-u5-005',
      'q-g5-ire-u5-006',
      'q-g5-ire-u5-007',
      'q-g5-ire-u5-008',
      'q-g5-ire-u5-009',
      'q-g5-ire-u5-010',
      'q-g5-ire-u5-011',
      'q-g5-ire-u5-012'
    ]
  },
  {
    id: 'mission-g5-ire-u5-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u5',
    lessonId: 'lesson-g5-ire-u5-l2',
    title: 'Abyssinian Sanctuary and Steadfastness Trial',
    description: 'Witness the heroic steadfastness of Bilal and Sumayyah under Makkan torture, and follow Ja’far ibn Abi Talib to the court of King Negus in Abyssinia!',
    order: 78,
    orderIndex: 78,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-abyssinia-shield',
    badge: {
      name: 'Abyssinian Shield',
      icon: 'shield'
    },
    questionIds: [
      'q-g5-ire-u5-013',
      'q-g5-ire-u5-014',
      'q-g5-ire-u5-015',
      'q-g5-ire-u5-016',
      'q-g5-ire-u5-017',
      'q-g5-ire-u5-018',
      'q-g5-ire-u5-019',
      'q-g5-ire-u5-020',
      'q-g5-ire-u5-021',
      'q-g5-ire-u5-022',
      'q-g5-ire-u5-023',
      'q-g5-ire-u5-024'
    ]
  },
  {
    id: 'mission-g5-ire-u6-m1',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u6',
    lessonId: 'lesson-g5-ire-u6-l1',
    title: 'Guardians of the Holy Scriptures Quest',
    description: 'Discover the divine books revealed to Allah\'s messengers—Tawrat, Zabur, Injil, and the Holy Qur’an—and understand why the Qur’an remains eternally preserved!',
    order: 79,
    orderIndex: 79,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-divine-books',
    badge: {
      name: 'Scripture Guardian',
      icon: 'book-open'
    },
    questionIds: [
      'q-g5-ire-u6-001',
      'q-g5-ire-u6-002',
      'q-g5-ire-u6-003',
      'q-g5-ire-u6-004',
      'q-g5-ire-u6-005',
      'q-g5-ire-u6-006',
      'q-g5-ire-u6-007',
      'q-g5-ire-u6-008',
      'q-g5-ire-u6-009',
      'q-g5-ire-u6-010',
      'q-g5-ire-u6-011',
      'q-g5-ire-u6-012'
    ]
  },
  {
    id: 'mission-g5-ire-u6-m2',
    worldId: 'world-faith-values',
    subStrandId: 'substrand-g5-ire-u6',
    lessonId: 'lesson-g5-ire-u6-l2',
    title: 'Archangels of Light Challenge',
    description: 'Explore the celestial realm of Allah’s angels created from light, their divine missions, and how the recording angels shape our everyday integrity!',
    order: 80,
    orderIndex: 80,
    xpReward: 100,
    rewardXp: 100,
    coinReward: 25,
    requiredLevel: 1,
    badgeReward: 'badge-ire-archangels',
    badge: {
      name: 'Angelic Accountability',
      icon: 'feather'
    },
    questionIds: [
      'q-g5-ire-u6-013',
      'q-g5-ire-u6-014',
      'q-g5-ire-u6-015',
      'q-g5-ire-u6-016',
      'q-g5-ire-u6-017',
      'q-g5-ire-u6-018',
      'q-g5-ire-u6-019',
      'q-g5-ire-u6-020',
      'q-g5-ire-u6-021',
      'q-g5-ire-u6-022',
      'q-g5-ire-u6-023',
      'q-g5-ire-u6-024'
    ]
  }
];

missionsToAdd.forEach(m => {
  const idx = db.missions.findIndex(item => item.id === m.id);
  if (idx >= 0) db.missions[idx] = m;
  else db.missions.push(m);
});

// 4. Batch 3 Questions (Units 5 & 6: 48 Questions total)
const questionsToAdd = [
  // --- Unit 5 Lesson 1: Mount Safa Proclamation Quest (q-g5-ire-u5-001 to 012) ---
  {
    id: 'q-g5-ire-u5-001',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'How many years did Prophet Muhammad (SAW) preach Islam privately (Da’wah Sirriyyah) before Allah commanded him to proclaim it openly?',
    text: 'How many years did Prophet Muhammad (SAW) preach Islam privately (Da’wah Sirriyyah) before Allah commanded him to proclaim it openly?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Three years',
      'Seven years',
      'Ten years',
      'One year'
    ],
    correctAnswer: 'Three years',
    explanation: 'The Prophet (SAW) engaged in secret da\'wah (calling to Islam) for the first three years in Makkah, meeting covertly at Dar al-Arqam before receiving the divine command for open proclamation.',
    socraticHint: 'Think of the number of years spent gathering the pioneer believers secretly at Dar al-Arqam before going public on Mount Safa.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-002',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Which Quranic verse in Surah Ash-Shu\'ara (26:214) commanded Prophet Muhammad (SAW) to begin preaching openly to his relatives?',
    text: 'Which Quranic verse in Surah Ash-Shu\'ara (26:214) commanded Prophet Muhammad (SAW) to begin preaching openly to his relatives?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"And warn your closest kinsfolk"',
      '"Arise and warn"',
      '"Recite in the name of your Lord"',
      '"Read what has been revealed to you"'
    ],
    correctAnswer: '"And warn your closest kinsfolk"',
    explanation: 'Surah Ash-Shu\'ara verse 214 instructed: "Wa andhir \'ashiretaka al-aqrabin" ("And warn your closest kinsfolk"), commanding the Prophet to call his Banu Hashim family and close relatives first.',
    socraticHint: 'Which instruction specifically tells the messenger to direct warnings to his nearest family members and tribe?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-003',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'From which prominent hill near the Ka\'bah in Makkah did Prophet Muhammad (SAW) address all the gathered Quraysh clans to announce his prophethood openly?',
    text: 'From which prominent hill near the Ka\'bah in Makkah did Prophet Muhammad (SAW) address all the gathered Quraysh clans to announce his prophethood openly?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Mount Safa',
      'Mount Marwah',
      'Mount Arafat',
      'Mount Uhud'
    ],
    correctAnswer: 'Mount Safa',
    explanation: 'The Prophet (SAW) ascended Mount Safa, an elevated hill near the Ka\'bah, where he raised his voice to summon the leaders and people of the Quraysh clans.',
    socraticHint: 'Think of the hill that forms the starting point of Sa\'i between two small hills near the Ka\'bah.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-004',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What traditional Makkan warning cry of imminent danger did Prophet Muhammad (SAW) use from Mount Safa to assemble the people?',
    text: 'What traditional Makkan warning cry of imminent danger did Prophet Muhammad (SAW) use from Mount Safa to assemble the people?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Ya Sabahah!"',
      '"Allahu Akbar!"',
      '"Hayya \'alas-Salah!"',
      '"Labbaik Allahumma Labbaik!"'
    ],
    correctAnswer: '"Ya Sabahah!"',
    explanation: '"Ya Sabahah!" was the customary ancient Arab alert shouted when an enemy army was spotted advancing to attack at dawn, prompting immediate assembly of the entire community.',
    socraticHint: 'Which Arabic phrase was specifically shouted at dawn to alert people of sudden danger or enemy invasion?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-005',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Before delivering his message from Mount Safa, what question did Prophet Muhammad (SAW) ask the Quraysh to establish their trust in him?',
    text: 'Before delivering his message from Mount Safa, what question did Prophet Muhammad (SAW) ask the Quraysh to establish their trust in him?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Whether they would believe him if he warned that enemy horsemen were behind the valley ready to attack',
      'Whether they would agree to give him gold and silver treasures',
      'Whether they would elect him as the king of Makkah',
      'Whether they had ever seen the Cave of Hira at night'
    ],
    correctAnswer: 'Whether they would believe him if he warned that enemy horsemen were behind the valley ready to attack',
    explanation: 'The Prophet asked if they would believe him if he told them an enemy cavalry was behind the valley; they replied they had only ever known him to speak the absolute truth.',
    socraticHint: 'How did the Prophet use a hypothetical military threat to verify that they considered him completely honest and truthful?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-006',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What unanimous reply did the Quraysh clans give when the Prophet (SAW) asked about his truthfulness on Mount Safa?',
    text: 'What unanimous reply did the Quraysh clans give when the Prophet (SAW) asked about his truthfulness on Mount Safa?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Yes, we have never known you to speak anything but truth (As-Sadiq Al-Amin)"',
      '"No, we doubt everything you say"',
      '"We do not know your character or honesty"',
      '"You must provide written testimony from foreign traders first"'
    ],
    correctAnswer: '"Yes, we have never known you to speak anything but truth (As-Sadiq Al-Amin)"',
    explanation: 'The Quraysh testified to his lifelong integrity, acknowledging that for 40 years he had never told a lie, known universally as As-Sadiq (the Truthful) and Al-Amin (the Trustworthy).',
    socraticHint: 'What title had the people of Makkah given Muhammad (SAW) throughout his youth because of his unmatched honesty?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-007',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Which uncle of Prophet Muhammad (SAW) disrespectfully cursed him on Mount Safa by saying, "May you perish for the rest of this day! Is this why you gathered us?"',
    text: 'Which uncle of Prophet Muhammad (SAW) disrespectfully cursed him on Mount Safa by saying, "May you perish for the rest of this day! Is this why you gathered us?"',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Abu Lahab',
      'Abu Talib',
      'Hamzah ibn Abd al-Muttalib',
      'Al-Abbas ibn Abd al-Muttalib'
    ],
    correctAnswer: 'Abu Lahab',
    explanation: 'Abu Lahab (Abd al-Uzza) openly insulted the Prophet (SAW) with the derogatory remark "Tabban laka sa\'ir al-yawm" (May you perish for the rest of the day!), rejecting the divine call.',
    socraticHint: 'Which uncle became a fierce opponent whose condemnation is explicitly recorded in Surah Al-Masad?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-008',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Which Surah of the Holy Qur\'an was revealed by Allah to condemn Abu Lahab and his wife for their hostility towards the Prophet (SAW)?',
    text: 'Which Surah of the Holy Qur\'an was revealed by Allah to condemn Abu Lahab and his wife for their hostility towards the Prophet (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Surah Al-Masad (Surah 111)',
      'Surah Al-Kawthar (Surah 108)',
      'Surah Al-Falaq (Surah 113)',
      'Surah Al-Kafirun (Surah 109)'
    ],
    correctAnswer: 'Surah Al-Masad (Surah 111)',
    explanation: 'Surah Al-Masad (also known as Surah Tabbat) was revealed condemning Abu Lahab and his malicious wife Umm Jamil, declaring that his wealth and gains would never save him from punishment.',
    socraticHint: 'Which short Surah begins with "Tabbat yada abi lahabin wa tabb"?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-009',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'How did Abu Lahab\'s wife, Umm Jamil, participate in harassing Prophet Muhammad (SAW) in Makkah?',
    text: 'How did Abu Lahab\'s wife, Umm Jamil, participate in harassing Prophet Muhammad (SAW) in Makkah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'She scattered thorny branches along the pathway where the Prophet walked',
      'She burned down houses of believers in Makkah',
      'She wrote hostile poems on the walls of the Ka\'bah',
      'She refused to trade food in the market of Ukadh'
    ],
    correctAnswer: 'She scattered thorny branches along the pathway where the Prophet walked',
    explanation: 'Umm Jamil would bundle sharp desert thorns and spread them along the path the Prophet (SAW) used to injure his feet, earning her the description "carrier of firewood" in Surah Al-Masad.',
    socraticHint: 'What painful physical obstacles did she scatter on the road to injure the Prophet while he walked?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-010',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Which verse in Surah Al-Hijr (15:94) ordered the Prophet (SAW) to proclaim the message openly without fearing the idolaters?',
    text: 'Which verse in Surah Al-Hijr (15:94) ordered the Prophet (SAW) to proclaim the message openly without fearing the idolaters?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Proclaim openly what you are commanded and turn away from the polytheists"',
      '"Hold fast to the rope of Allah altogether"',
      '"Say: He is Allah, the One"',
      '"O you who wrap yourself up in garments, stand through the night"'
    ],
    correctAnswer: '"Proclaim openly what you are commanded and turn away from the polytheists"',
    explanation: 'Surah Al-Hijr verse 94 states: "Fasda\' bima tu\'mar wa a\'rid \'anil-mushrikin" ("Proclaim openly that which you are commanded, and withdraw from the polytheists").',
    socraticHint: 'Which verse directly commands the Prophet to publicly disclose what he was ordered and disregard the polytheists?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-011',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Why were the aristocratic leaders of Quraysh so strongly opposed to the open message of Islam preached by Prophet Muhammad (SAW)?',
    text: 'Why were the aristocratic leaders of Quraysh so strongly opposed to the open message of Islam preached by Prophet Muhammad (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Islam demanded the abolition of idol worship, social equality for slaves, and an end to corrupt exploitation',
      'They wanted the Prophet to worship idols only on Fridays',
      'They preferred reading foreign scriptures in Persian',
      'They wanted all trade in Makkah to cease completely'
    ],
    correctAnswer: 'Islam demanded the abolition of idol worship, social equality for slaves, and an end to corrupt exploitation',
    explanation: 'The Quraysh elite feared losing their religious prestige, lucrative idol-pilgrimage income, and hierarchical dominance over slaves, poor people, and women under Islam\'s egalitarian teachings.',
    socraticHint: 'Consider how Islam threatened their financial profits from idol worship and dismantled their unjust tribal caste system.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-012',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What vital moral lesson do Kenyan primary learners learn from the Prophet\'s 40-year reputation as "Al-Amin" before preaching publicly?',
    text: 'What vital moral lesson do Kenyan primary learners learn from the Prophet\'s 40-year reputation as "Al-Amin" before preaching publicly?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Personal trustworthiness and honest character must be proven in daily life before expecting others to trust our leadership',
      'Only wealthy people can be trusted in society',
      'One should only be honest when speaking to powerful leaders',
      'Honesty is only necessary after one reaches forty years of age'
    ],
    correctAnswer: 'Personal trustworthiness and honest character must be proven in daily life before expecting others to trust our leadership',
    explanation: 'The Prophet\'s lifelong honesty shows that authentic leadership and moral authority are built on consistent integrity, truthfulness, and reliability in daily personal conduct.',
    socraticHint: 'How does personal integrity in school and community lay the foundation for being believed and respected by others?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },

  // --- Unit 5 Lesson 2: Abyssinian Sanctuary and Steadfastness Trial (q-g5-ire-u5-013 to 024) ---
  {
    id: 'q-g5-ire-u5-013',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Who was the Ethiopian enslaved believer who was tortured under heavy stones by Umayyah ibn Khalaf yet continuously proclaimed "Ahad, Ahad"?',
    text: 'Who was the Ethiopian enslaved believer who was tortured under heavy stones by Umayyah ibn Khalaf yet continuously proclaimed "Ahad, Ahad"?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Bilal ibn Rabah (RA)',
      'Zayd ibn Harithah (RA)',
      'Ammar ibn Yasir (RA)',
      'Salman al-Farsi (RA)'
    ],
    correctAnswer: 'Bilal ibn Rabah (RA)',
    explanation: 'Bilal ibn Rabah (RA) endured brutal torture under the blazing sun with a heavy rock on his chest, refusing to renounce Islam and crying "Ahad, Ahad" (Allah is One, Allah is One).',
    socraticHint: 'Which noble companion later became the first Mu\'adhin (caller to prayer) of Islam?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-014',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Who purchased and emancipated Bilal ibn Rabah from slavery, ending his brutal torture in Makkah?',
    text: 'Who purchased and emancipated Bilal ibn Rabah from slavery, ending his brutal torture in Makkah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Abu Bakr as-Siddiq (RA)',
      'Umar ibn al-Khattab (RA)',
      'Uthman ibn Affan (RA)',
      'Ali ibn Abi Talib (RA)'
    ],
    correctAnswer: 'Abu Bakr as-Siddiq (RA)',
    explanation: 'Abu Bakr as-Siddiq (RA) paid Umayyah ibn Khalaf a high price to purchase Bilal and set him free immediately for the sake of Allah.',
    socraticHint: 'Which close companion and first adult male convert used his personal wealth to free many enslaved Muslims?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-015',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Who was the first martyr (Shahidah) in the history of Islam, killed by Abu Jahl for refusing to abandon her faith?',
    text: 'Who was the first martyr (Shahidah) in the history of Islam, killed by Abu Jahl for refusing to abandon her faith?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Sumayyah bint Khayyat (RA)',
      'Khadijah bint Khuwaylid (RA)',
      'Fatimah bint Muhammad (RA)',
      'Asma bint Abi Bakr (RA)'
    ],
    correctAnswer: 'Sumayyah bint Khayyat (RA)',
    explanation: 'Sumayyah bint Khayyat (RA), the mother of Ammar ibn Yasir, was ruthlessly murdered by Abu Jahl, earning her the eternal distinction of being the first martyr in Islam.',
    socraticHint: 'Which brave woman from the family of Yasir sacrificed her life rather than renounce monotheism?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-016',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What comforting promise did Prophet Muhammad (SAW) give to the family of Yasir while they were being tortured in Makkah?',
    text: 'What comforting promise did Prophet Muhammad (SAW) give to the family of Yasir while they were being tortured in Makkah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '"Be patient, O family of Yasir, for indeed your destination is Paradise (Jannah)!"',
      '"Fight back against the Quraysh with swords!"',
      '"Pretend to worship their idols openly and renounce Islam forever!"',
      '"Leave Makkah and go live alone in the desert caves!"'
    ],
    correctAnswer: '"Be patient, O family of Yasir, for indeed your destination is Paradise (Jannah)!"',
    explanation: 'The Prophet (SAW) passed by them as they were tortured and comforted them: "Sabran ya aala Yasir, fa\'inna maw\'idakumul-Jannah" ("Be patient, family of Yasir, your promised meeting place is Paradise").',
    socraticHint: 'What ultimate eternal reward did the Prophet guarantee to Yasir and Sumayyah for their patience under torture?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-017',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Why did Prophet Muhammad (SAW) advise the vulnerable Muslims to migrate across the sea to Abyssinia (Al-Habashah)?',
    text: 'Why did Prophet Muhammad (SAW) advise the vulnerable Muslims to migrate across the sea to Abyssinia (Al-Habashah)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Because its Christian King (Negus) was a just ruler under whom no one was wronged',
      'Because Abyssinia had great gold mines they could trade',
      'Because the people of Abyssinia spoke Arabic fluently',
      'Because the Quraysh commanded them to go there as traders'
    ],
    correctAnswer: 'Because its Christian King (Negus) was a just ruler under whom no one was wronged',
    explanation: 'The Prophet praised King Negus (an-Najashi) as a just Christian king who sheltered the oppressed and would not permit any injustice within his realm.',
    socraticHint: 'What moral virtue of justice did the King of Abyssinia possess that made his country a safe sanctuary for refugees?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-018',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Who was the eloquent cousin of the Prophet (SAW) who led and spoke on behalf of the Muslim migrants before King Negus of Abyssinia?',
    text: 'Who was the eloquent cousin of the Prophet (SAW) who led and spoke on behalf of the Muslim migrants before King Negus of Abyssinia?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ja’far ibn Abi Talib (RA)',
      'Ali ibn Abi Talib (RA)',
      'Abdullah ibn Mas\'ud (RA)',
      'Sa\'d ibn Abi Waqqas (RA)'
    ],
    correctAnswer: 'Ja’far ibn Abi Talib (RA)',
    explanation: 'Ja\'far ibn Abi Talib (RA), the older brother of Ali, was the chosen spokesperson whose articulate speech and recitation moved King Negus and his court to tears.',
    socraticHint: 'Which son of Abu Talib and elder brother of Ali addressed the royal court in Abyssinia?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-019',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Which Surah from the Holy Qur\'an did Ja’far ibn Abi Talib recite to King Negus to explain Islam\'s reverence for Prophet Isa (Jesus AS) and Maryam (Mary)?',
    text: 'Which Surah from the Holy Qur\'an did Ja’far ibn Abi Talib recite to King Negus to explain Islam\'s reverence for Prophet Isa (Jesus AS) and Maryam (Mary)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Surah Maryam (Surah 19)',
      'Surah Al-Baqarah (Surah 2)',
      'Surah Al-Ikhlas (Surah 112)',
      'Surah Ya-Sin (Surah 36)'
    ],
    correctAnswer: 'Surah Maryam (Surah 19)',
    explanation: 'Ja\'far recited verses from Surah Maryam describing the miraculous conception and birth of Prophet Isa (AS) and the righteousness of his mother Maryam.',
    socraticHint: 'Which Surah is named directly after the blessed mother of Prophet Isa (Jesus AS)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-020',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What was the reaction of King Negus of Abyssinia when he heard the verses of Surah Maryam recited by Ja’far?',
    text: 'What was the reaction of King Negus of Abyssinia when he heard the verses of Surah Maryam recited by Ja’far?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'He wept until his beard was wet and declared that the message comes from the same source of light as the Gospel',
      'He ordered the Muslims to be arrested immediately and handed to the Quraysh',
      'He demanded a heavy ransom in gold before giving them shelter',
      'He rejected the recitation and expelled both parties from his palace'
    ],
    correctAnswer: 'He wept until his beard was wet and declared that the message comes from the same source of light as the Gospel',
    explanation: 'King Negus was deeply moved to tears and recognized the divine truth, stating: "Verily, this and what Jesus brought come from the very same lamp of light," granting Muslims safety.',
    socraticHint: 'How did the righteous Christian king demonstrate deep emotional and spiritual connection to the message of Surah Maryam?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-021',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'Who was the primary delegate sent by the Quraysh chieftains to Abyssinia with expensive gifts to convince King Negus to extradite the Muslims?',
    text: 'Who was the primary delegate sent by the Quraysh chieftains to Abyssinia with expensive gifts to convince King Negus to extradite the Muslims?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Amr ibn al-Aas (before his conversion to Islam)',
      'Abu Jahl',
      'Abu Sufyan',
      'Walid ibn al-Mughirah'
    ],
    correctAnswer: 'Amr ibn al-Aas (before his conversion to Islam)',
    explanation: 'Amr ibn al-Aas was a clever diplomat sent by Quraysh bearing luxurious leather gifts to persuade King Negus, though Negus firmly refused to betray the Muslims.',
    socraticHint: 'Which brilliant Makkan statesman (who later embraced Islam and liberated Egypt) led the Quraysh delegation?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-022',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'What special prayer did Prophet Muhammad (SAW) lead in Madinah when news reached him that King Negus (an-Najashi) had passed away?',
    text: 'What special prayer did Prophet Muhammad (SAW) lead in Madinah when news reached him that King Negus (an-Najashi) had passed away?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Salat al-Gha\'ib (the absentee funeral prayer)',
      'Salat al-Istisqa (prayer for rain)',
      'Salat al-Khasoof (eclipse prayer)',
      'Salat al-Khawf (prayer of fear)'
    ],
    correctAnswer: 'Salat al-Gha\'ib (the absentee funeral prayer)',
    explanation: 'Because King Negus died far away in Abyssinia as a believer, the Prophet (SAW) performed Salat al-Gha\'ib (absentee funeral prayer) with the companions in Madinah.',
    socraticHint: 'What specific Islamic funeral prayer is offered when the deceased person has passed away in another distant country?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-023',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'How does King Negus’s reception of the Muslim refugees in Abyssinia model interfaith relations for Kenya today?',
    text: 'How does King Negus’s reception of the Muslim refugees in Abyssinia model interfaith relations for Kenya today?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It demonstrates mutual respect, protection of persecuted minorities, and peaceful coexistence between Christians and Muslims',
      'It shows that people of different faiths should never speak to one another',
      'It implies that refugees should be forced to abandon their native culture',
      'It proves that religious leaders should only help members of their own tribe'
    ],
    correctAnswer: 'It demonstrates mutual respect, protection of persecuted minorities, and peaceful coexistence between Christians and Muslims',
    explanation: 'The historical sanctuary granted by a Christian king to Muslim refugees highlights universal compassion, interfaith solidarity, and the duty to protect the oppressed regardless of religion.',
    socraticHint: 'How does a Christian king protecting Muslim refugees showcase harmony and shared moral values between faiths?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },
  {
    id: 'q-g5-ire-u5-024',
    subStrandId: 'substrand-g5-ire-u5',
    prompt: 'In what way does Kenya\'s hosting of refugees at Kakuma and Daadab camps reflect the prophetic legacy of seeking and providing sanctuary?',
    text: 'In what way does Kenya\'s hosting of refugees at Kakuma and Daadab camps reflect the prophetic legacy of seeking and providing sanctuary?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'By offering shelter, legal safety, and humanitarian protection to families fleeing violence, just as Abyssinia protected early Muslims',
      'By charging high taxes on vulnerable displaced persons',
      'By forcing refugees to engage in unpaid community labor',
      'By closing national borders to anyone experiencing injustice'
    ],
    correctAnswer: 'By offering shelter, legal safety, and humanitarian protection to families fleeing violence, just as Abyssinia protected early Muslims',
    explanation: 'Kenya’s long-standing humanitarian role sheltering hundreds of thousands of refugees reflects the timeless moral duty of providing refuge and defending vulnerable lives against oppression.',
    socraticHint: 'Think about how safe asylum protects vulnerable people fleeing war and persecution in East Africa.',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U5'
  },

  // --- Unit 6 Lesson 1: Guardians of the Holy Scriptures Quest (q-g5-ire-u6-001 to 012) ---
  {
    id: 'q-g5-ire-u6-001',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which number is Belief in the Divine Scriptures (Kutubullah) among the Six Pillars of Iman in Islam?',
    text: 'Which number is Belief in the Divine Scriptures (Kutubullah) among the Six Pillars of Iman in Islam?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Third Pillar',
      'The First Pillar',
      'The Fifth Pillar',
      'The Sixth Pillar'
    ],
    correctAnswer: 'The Third Pillar',
    explanation: 'The Six Pillars of Iman in order are: 1) Belief in Allah, 2) Belief in the Angels, 3) Belief in the Divine Books, 4) Belief in the Messengers, 5) Belief in the Day of Judgment, and 6) Belief in Qadar (Divine Decree).',
    socraticHint: 'Recall the classic order: Allah, Angels, Books, Messengers, Day of Judgment, and Divine Decree.',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-002',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'To which prophet of Allah was the divine book known as the Tawrat (Torah) revealed?',
    text: 'To which prophet of Allah was the divine book known as the Tawrat (Torah) revealed?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Musa (Moses AS)',
      'Prophet Dawud (David AS)',
      'Prophet Isa (Jesus AS)',
      'Prophet Ibrahim (Abraham AS)'
    ],
    correctAnswer: 'Prophet Musa (Moses AS)',
    explanation: 'The Tawrat was revealed to Prophet Musa (AS) to guide the Children of Israel (Bani Isra\'il) with divine commandments and moral laws.',
    socraticHint: 'Which prophet led the Children of Israel out of Egypt and received the revelation at Mount Sinai?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-003',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'To which prophet was the holy scripture known as the Zabur (Psalms) revealed by Allah?',
    text: 'To which prophet was the holy scripture known as the Zabur (Psalms) revealed by Allah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Dawud (David AS)',
      'Prophet Musa (Moses AS)',
      'Prophet Isa (Jesus AS)',
      'Prophet Nuh (Noah AS)'
    ],
    correctAnswer: 'Prophet Dawud (David AS)',
    explanation: 'The Zabur was revealed to Prophet Dawud (AS), filled with praises, prayers, hymns of devotion, and wisdom.',
    socraticHint: 'Which prophet was a righteous king known for his beautiful voice of praise and defeating Jalut (Goliath)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-004',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which divine scripture was revealed to Prophet Isa (Jesus AS) to confirm the Tawrat and preach spiritual purity?',
    text: 'Which divine scripture was revealed to Prophet Isa (Jesus AS) to confirm the Tawrat and preach spiritual purity?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The Injil (Gospel)',
      'The Zabur',
      'The Tawrat',
      'The Suhuf'
    ],
    correctAnswer: 'The Injil (Gospel)',
    explanation: 'Allah revealed the Injil (Gospel) to Prophet Isa ibn Maryam (AS) to guide people with mercy, love, and righteousness, confirming what was in the Torah.',
    socraticHint: 'What Arabic term refers to the Gospel revealed to Prophet Isa (AS)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-005',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'To whom was the Holy Qur\'an revealed as the final and universal divine scripture for all humankind?',
    text: 'To whom was the Holy Qur\'an revealed as the final and universal divine scripture for all humankind?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Muhammad (SAW)',
      'Prophet Ibrahim (AS)',
      'Prophet Adam (AS)',
      'Prophet Yusuf (AS)'
    ],
    correctAnswer: 'Prophet Muhammad (SAW)',
    explanation: 'The Holy Qur\'an was revealed to Prophet Muhammad (SAW) through Archangel Jibril over a duration of 23 years as the final revelation for all humanity.',
    socraticHint: 'Who is the Seal of the Prophets (Khatam an-Nabiyyin) to whom the Qur\'an was revealed?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-006',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which prophets were given the divine scrolls known as Suhuf according to the Holy Qur\'an (Surah Al-A\'la 87:18-19)?',
    text: 'Which prophets were given the divine scrolls known as Suhuf according to the Holy Qur\'an (Surah Al-A\'la 87:18-19)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Prophet Ibrahim (AS) and Prophet Musa (AS)',
      'Prophet Nuh (AS) and Prophet Hud (AS)',
      'Prophet Ismail (AS) and Prophet Ishaq (AS)',
      'Prophet Yunus (AS) and Prophet Lut (AS)'
    ],
    correctAnswer: 'Prophet Ibrahim (AS) and Prophet Musa (AS)',
    explanation: 'Surah Al-A\'la concludes with: "Suhufi Ibrahima wa Musa" ("The Scriptures/Scrolls of Abraham and Moses"), acknowledging the divine scrolls granted to them.',
    socraticHint: 'Look at the concluding verse of Surah Al-A\'la mentioning the Suhuf of two great messengers.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-007',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What divine promise regarding the preservation of the Holy Qur\'an is stated in Surah Al-Hijr (15:9)?',
    text: 'What divine promise regarding the preservation of the Holy Qur\'an is stated in Surah Al-Hijr (15:9)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Allah Himself guarantees that He sent it down and will guard it against any change or corruption',
      'The Qur\'an will only exist in written form in Arabia',
      'The Qur\'an will be replaced by a new book after five hundred years',
      'Humans alone are responsible for keeping copies safe without divine protection'
    ],
    correctAnswer: 'Allah Himself guarantees that He sent it down and will guard it against any change or corruption',
    explanation: 'Surah Al-Hijr 15:9 declares: "Inna nahnu nazzalna adh-dhikra wa inna lahu lahafizun" ("Indeed, it is We who sent down the message and indeed, We will be its guardian").',
    socraticHint: 'Who takes absolute personal responsibility for preserving the Holy Qur\'an from alteration or distortion?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-008',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'How is the scope and audience of the Holy Qur\'an different from the earlier revealed scriptures like the Tawrat and Injil?',
    text: 'How is the scope and audience of the Holy Qur\'an different from the earlier revealed scriptures like the Tawrat and Injil?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Earlier scriptures were sent to specific communities for a specific era, whereas the Qur\'an is universal for all humankind for all time',
      'The Qur\'an was only intended for the Arabs of Makkah',
      'Earlier scriptures were meant for everyone while the Qur\'an is for one continent',
      'There is no difference in their scope or intended audience'
    ],
    correctAnswer: 'Earlier scriptures were sent to specific communities for a specific era, whereas the Qur\'an is universal for all humankind for all time',
    explanation: 'Earlier prophets and books were sent specifically to their own nations (e.g., Bani Isra\'il), whereas Prophet Muhammad (SAW) and the Qur\'an were sent to all creation until the Day of Judgment.',
    socraticHint: 'Was the Qur\'an sent to a single ethnic group or to all of humanity until the end of time?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'ANALYZE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-009',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Over approximately how many years was the Holy Qur\'an revealed piecemeal (gradually) to Prophet Muhammad (SAW)?',
    text: 'Over approximately how many years was the Holy Qur\'an revealed piecemeal (gradually) to Prophet Muhammad (SAW)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      '23 years (13 years in Makkah and 10 years in Madinah)',
      '40 years',
      '10 years (all in Makkah)',
      '1 year during Ramadan'
    ],
    correctAnswer: '23 years (13 years in Makkah and 10 years in Madinah)',
    explanation: 'The revelation of the Qur\'an was gradual over 23 years—13 years during the Makkan period addressing faith and patience, and 10 years in Madinah detailing community laws and governance.',
    socraticHint: 'Add the 13 years of the Makkan period to the 10 years spent in Madinah after the Hijrah.',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-010',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What title is given to a person who memorizes the entire Holy Qur\'an by heart from beginning to end?',
    text: 'What title is given to a person who memorizes the entire Holy Qur\'an by heart from beginning to end?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Hafidh (or Hafiz / Hafizah)',
      'Mu\'adhin',
      'Faqih',
      'Qadi'
    ],
    correctAnswer: 'Hafidh (or Hafiz / Hafizah)',
    explanation: 'A person who preserves the entire text of the Qur\'an in their memory is honored with the title Hafidh (preserver/memorizer), a major vehicle for the Qur\'an\'s miraculous oral preservation.',
    socraticHint: 'What Arabic term derived from the root "to preserve or protect" describes someone who has committed the whole Qur\'an to memory?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-011',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What should be the attitude of a Muslim towards previous revealed books like the original Tawrat, Zabur, and Injil?',
    text: 'What should be the attitude of a Muslim towards previous revealed books like the original Tawrat, Zabur, and Injil?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Believe that in their original revealed forms they were authentic words of Allah, while following the Qur\'an as the final, complete guide',
      'Reject and insult them entirely as false',
      'Claim that Allah never sent any guidance before Prophet Muhammad (SAW)',
      'Follow the laws of earlier scriptures instead of the Qur\'an'
    ],
    correctAnswer: 'Believe that in their original revealed forms they were authentic words of Allah, while following the Qur\'an as the final, complete guide',
    explanation: 'A Muslim must believe in all original divine books as true revelations from Allah, while adhering to the Holy Qur\'an which confirms, completes, and supersedes previous laws.',
    socraticHint: 'Does Iman require Muslims to respect and believe in the divine origin of earlier holy books sent by Allah?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-012',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'How does daily recitation and application of the Holy Qur\'an positively impact a Grade 5 learner in Kenyan society?',
    text: 'How does daily recitation and application of the Holy Qur\'an positively impact a Grade 5 learner in Kenyan society?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'It nurtures moral conscience, encourages academic honesty, promotes peace, and inspires respectful service to family and nation',
      'It isolates the learner from having friendships with classmates',
      'It discourages learning mathematics and natural sciences',
      'It focuses exclusively on material wealth and prestige'
    ],
    correctAnswer: 'It nurtures moral conscience, encourages academic honesty, promotes peace, and inspires respectful service to family and nation',
    explanation: 'Living by the teachings of the Holy Qur\'an builds strong character (Ihsan), moral resilience, kindness towards neighbors, respect for parents, and diligent citizenship in Kenya.',
    socraticHint: 'How do Quranic values of justice, truthfulness, and kindness help children grow into responsible Kenyan citizens?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },

  // --- Unit 6 Lesson 2: Archangels of Light Challenge (q-g5-ire-u6-013 to 024) ---
  {
    id: 'q-g5-ire-u6-013',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'From what substance were the Angels (Mala’ikah) created by Allah according to authentic Hadith in Sahih Muslim?',
    text: 'From what substance were the Angels (Mala’ikah) created by Allah according to authentic Hadith in Sahih Muslim?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'From Light (Nur)',
      'From Smokeless fire (Nar)',
      'From Clay / Earth (Teen)',
      'From Water (Maa\')'
    ],
    correctAnswer: 'From Light (Nur)',
    explanation: 'The Prophet (SAW) taught: "The angels were created from light (Nur), the jinn were created from smokeless flame of fire, and Adam was created from that which has been described to you (clay)."',
    socraticHint: 'Humans were made of clay and jinn from fire; what luminous creation was used to form the angels?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-014',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Unlike human beings, what characteristic is unique to the Angels regarding obedience to Allah?',
    text: 'Unlike human beings, what characteristic is unique to the Angels regarding obedience to Allah?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'They do not disobey Allah in whatever He commands them, and they execute exactly what they are told without sin or fatigue',
      'They make mistakes and repent every evening',
      'They can choose whether to obey or disobey depending on the situation',
      'They need food, drink, and rest after performing worship'
    ],
    correctAnswer: 'They do not disobey Allah in whatever He commands them, and they execute exactly what they are told without sin or fatigue',
    explanation: 'Surah At-Tahrim (66:6) states that angels "do not disobey Allah in what He commands them but do what they are commanded." They possess no desires or rebellious free will.',
    socraticHint: 'Do angels possess physical desires to rebel against Allah or do they obey commands flawlessly?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-015',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which Archangel was entrusted with conveying divine revelation (Wahy) from Allah to all the prophets and messengers?',
    text: 'Which Archangel was entrusted with conveying divine revelation (Wahy) from Allah to all the prophets and messengers?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Archangel Jibril (Gabriel AS)',
      'Archangel Mika’il (Michael AS)',
      'Archangel Israfil (AS)',
      'Archangel Malik (AS)'
    ],
    correctAnswer: 'Archangel Jibril (Gabriel AS)',
    explanation: 'Archangel Jibril (Gabriel) is the leader of the angels and the messenger of revelation (Ar-Ruh al-Amin), bringing Allah’s divine messages to the prophets.',
    socraticHint: 'Which angel brought the first revelation "Iqra" to Prophet Muhammad (SAW) in Cave Hira?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-016',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What primary responsibility is assigned to Archangel Mika’il (Michael)?',
    text: 'What primary responsibility is assigned to Archangel Mika’il (Michael)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Directing rainfall, winds, and the growth of crops and provision by Allah’s command',
      'Blowing the trumpet on the Day of Judgment',
      'Taking the souls of living creatures',
      'Guarding the gates of Paradise'
    ],
    correctAnswer: 'Directing rainfall, winds, and the growth of crops and provision by Allah’s command',
    explanation: 'Archangel Mika’il is tasked with overseeing precipitation, clouds, vegetation, and the distribution of Allah’s physical sustenance across creation.',
    socraticHint: 'Which archangel is associated with rain, vegetation, and natural nourishment on Earth?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-017',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which Archangel will blow the Trumpet (As-Soor) to signal the end of the world and summon humanity for Resurrection?',
    text: 'Which Archangel will blow the Trumpet (As-Soor) to signal the end of the world and summon humanity for Resurrection?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Archangel Israfil (AS)',
      'Archangel Jibril (AS)',
      'Archangel Ridwan (AS)',
      'Archangel Mika’il (AS)'
    ],
    correctAnswer: 'Archangel Israfil (AS)',
    explanation: 'Archangel Israfil is designated to sound the Trumpet: the first blast terminates worldly life, and the second blast initiates the Resurrection and Gathering.',
    socraticHint: 'Which angel stands waiting with the Trumpet ready to blow at Allah\'s command on the Day of Judgment?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-018',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What is the divine role of Malak al-Mawt (The Angel of Death)?',
    text: 'What is the divine role of Malak al-Mawt (The Angel of Death)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Taking the souls of human beings and all living beings at their appointed time of death',
      'Recording good deeds on the right shoulder',
      'Questioning people in the grave',
      'Guarding the gates of Hellfire'
    ],
    correctAnswer: 'Taking the souls of human beings and all living beings at their appointed time of death',
    explanation: 'Surah As-Sajdah 32:11 states: "Say, \'The angel of death who has been entrusted with you will take you, then to your Lord you will be returned.\'"',
    socraticHint: 'Which angel retrieves the soul (Ruh) when a person\'s lifespan (Ajal) comes to an end?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-019',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What are the names and responsibilities of the two recording angels known collectively as Kiraman Katibin?',
    text: 'What are the names and responsibilities of the two recording angels known collectively as Kiraman Katibin?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Raqib on the right records good deeds, and Atid on the left records sins and bad deeds',
      'Munkar on the right asks questions, and Nakir on the left answers them',
      'Malik guards the right gate, and Ridwan guards the left gate',
      'Jibril records the Qur\'an, and Mika\'il records the rain'
    ],
    correctAnswer: 'Raqib on the right records good deeds, and Atid on the left records sins and bad deeds',
    explanation: 'Surah Qaf 50:17-18 describes the two recording angels (Raqib and Atid) positioned on the right and left shoulders recording every single spoken word and deed.',
    socraticHint: 'Which honorable scribes on our right and left shoulders record every good and bad deed we perform?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-020',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Which two angels question every deceased person in their grave (Al-Qabr) regarding their Lord, their religion, and their Prophet?',
    text: 'Which two angels question every deceased person in their grave (Al-Qabr) regarding their Lord, their religion, and their Prophet?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Munkar and Nakir',
      'Raqib and Atid',
      'Harut and Marut',
      'Malik and Ridwan'
    ],
    correctAnswer: 'Munkar and Nakir',
    explanation: 'Munkar and Nakir are the two terrifying angels who visit every soul in the grave to ask the three foundational questions of faith: "Who is your Lord? What is your religion? Who is your Prophet?"',
    socraticHint: 'Which pair of angels pose the three questions in the realm of Barzakh (the grave)?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-021',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Who is the guardian angel assigned to the gates of Jahannam (Hellfire)?',
    text: 'Who is the guardian angel assigned to the gates of Jahannam (Hellfire)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Malik',
      'Ridwan',
      'Israfil',
      'Mika’il'
    ],
    correctAnswer: 'Malik',
    explanation: 'Malik is the stern, unsmiling guardian of Hellfire named in Surah Az-Zukhruf (43:77): "And they will call: O Malik, let your Lord put an end to us!"',
    socraticHint: 'Which angel is specifically named in Surah Az-Zukhruf as the keeper of the Fire?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-022',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'Who is the joyful guardian angel assigned to welcome the righteous believers into Jannah (Paradise)?',
    text: 'Who is the joyful guardian angel assigned to welcome the righteous believers into Jannah (Paradise)?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'Ridwan',
      'Malik',
      'Munkar',
      'Atid'
    ],
    correctAnswer: 'Ridwan',
    explanation: 'Ridwan is the noble angel who serves as the keeper and gatekeeper of Paradise, welcoming the pious believers into eternal bliss.',
    socraticHint: 'Whose name means "pleasure or satisfaction" and guards the eternal gardens of Paradise?',
    points: 10,
    difficulty: 1,
    difficultyLevel: 'EASY',
    bloomLevel: 'REMEMBER',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-023',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'How does believing in the recording angels (Kiraman Katibin) cultivate personal integrity in a Kenyan pupil during examinations?',
    text: 'How does believing in the recording angels (Kiraman Katibin) cultivate personal integrity in a Kenyan pupil during examinations?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The pupil refrains from cheating because they know Allah and His angels record every secret deed even when the teacher is not looking',
      'The pupil writes very quickly to confuse the recording angels',
      'The pupil believes that angels will write the exam answers for them',
      'The pupil only studies when someone gives them a reward'
    ],
    correctAnswer: 'The pupil refrains from cheating because they know Allah and His angels record every secret deed even when the teacher is not looking',
    explanation: 'Belief in Kiraman Katibin nurtures Ihsan (God-consciousness), instilling the awareness that all private and public actions are recorded, inspiring steadfast honesty regardless of external supervision.',
    socraticHint: 'How does knowing that an angel records our private deeds prevent us from cheating in an exam?',
    points: 10,
    difficulty: 2,
    difficultyLevel: 'MEDIUM',
    bloomLevel: 'APPLY',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  },
  {
    id: 'q-g5-ire-u6-024',
    subStrandId: 'substrand-g5-ire-u6',
    prompt: 'What honor did Prophet Muhammad (SAW) teach that angels give to students and seekers of Islamic knowledge in schools?',
    text: 'What honor did Prophet Muhammad (SAW) teach that angels give to students and seekers of Islamic knowledge in schools?',
    type: 'MULTIPLE_CHOICE',
    options: [
      'The angels lower their wings out of pleasure for the seeker of knowledge and pray for their forgiveness',
      'The angels grant students physical money during lessons',
      'The angels exempt learners from doing household chores',
      'The angels prevent students from feeling hungry during tests'
    ],
    correctAnswer: 'The angels lower their wings out of pleasure for the seeker of knowledge and pray for their forgiveness',
    explanation: 'In Abu Dawud and At-Tirmidhi, the Prophet (SAW) stated: "Verily, the angels lower their wings for the seeker of knowledge out of pleasure with what he is seeking," showing immense respect for educational effort.',
    socraticHint: 'How do angels express deep satisfaction and reverence towards children and adults striving to learn?',
    points: 10,
    difficulty: 3,
    difficultyLevel: 'HARD',
    bloomLevel: 'EVALUATE',
    contentStatus: 'REVIEW',
    sourceType: 'KICD_ALIGNED',
    curriculumCode: 'CBC-G5-IRE-U6'
  }
];

questionsToAdd.forEach(q => {
  const idx = db.questions.findIndex(item => item.id === q.id);
  if (idx >= 0) db.questions[idx] = q;
  else db.questions.push(q);
});

// Write back to cbe_database.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully written Batch 3 to cbe_database.json!');
console.log('Total questions in db:', db.questions.length);
console.log('Total missions in db:', db.missions.length);
