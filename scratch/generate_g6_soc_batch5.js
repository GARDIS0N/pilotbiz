/**
 * Grade 6 Social Studies - Batch 5 Generator
 * Content: Units 9 & 10
 * - Unit 9: Traditional Leadership, Early Contacts & Struggle for Independence
 * - Unit 10: Citizenship, Democracy, Arms of Government & National Cohesion
 * Missions: Orders 57, 58, 59, 60 (world-kenya-explorer)
 * Questions: 48 (24 per unit: q-g6-soc-u9-001 to q-g6-soc-u10-024)
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Generating Grade 6 Social Studies Batch 5 (Units 9 & 10) ---');

// 1. Units 9 & 10 (subStrands)
const units = [
  {
    id: 'substrand-g6-soc-u9',
    strandId: 'strand-g6-soc-citizenship',
    learningAreaId: 'la-social-g6',
    title: 'Traditional Leadership, Early Contacts & The Struggle for Independence',
    name: 'Traditional Leadership, Early Contacts & The Struggle for Independence',
    description: 'Analyzing early Indian Ocean contacts (Arab traders, Portuguese, Christian missionaries); examining heroic indigenous resistance against British colonial occupation led by Mekatilili wa Menza, Koitalel arap Samoei, Waiyaki wa Hinga, and Kabaka Mwanga; tracing the rise of early political associations (EAA, KAU), the Mau Mau liberation struggle, Kapenguria Six, and achievement of independence on 12 December 1963.',
    cbeCompetency: 'Historical inquiry, civic patriotism, anti-colonial liberation appreciation, and democratic leadership valuation',
    estimatedMinutes: 30,
    order: 9,
    grade: 'G6'
  },
  {
    id: 'substrand-g6-soc-u10',
    strandId: 'strand-g6-soc-citizenship',
    learningAreaId: 'la-social-g6',
    title: 'Citizenship, Democracy, Kenya Government & National Cohesion',
    name: 'Citizenship, Democracy, Kenya Government & National Cohesion',
    description: 'Exploring citizenship duties and fundamental human rights under Chapter Four (Bill of Rights) of the Constitution of Kenya 2010; understanding the democratic electoral system administered by the IEBC; examining the composition and functions of the Three Arms of Government (Executive, Legislature, Judiciary); analyzing the devolved system of 47 county governments; and promoting national cohesion and patriotism.',
    cbeCompetency: 'Constitutional literacy, democratic civic participation, human rights advocacy, and national integration commitment',
    estimatedMinutes: 30,
    order: 10,
    grade: 'G6'
  }
];

units.forEach(u => {
  if (!db.subStrands.some(existing => existing.id === u.id)) {
    db.subStrands.push(u);
    console.log('Added subStrand:', u.id);
  }
});

// 2. Lessons for Units 9 & 10
const lessons = [
  // Unit 9
  {
    id: 'lesson-g6-soc-u9-l1',
    subStrandId: 'substrand-g6-soc-u9',
    title: 'Early External Contacts & Heroic Resistance to Colonial Rule',
    content: 'Prior to British colonization, Eastern Africa maintained active international contacts and vibrant independent societies.\n\n1. Early External Contacts:\n- Arab Traders: Arrived via monsoon dhows from the 8th century, trading cloth, beads, and porcelain for ivory and gold; led to Islamization and Swahili culture along the coast.\n- The Portuguese: Vasco da Gama arrived at Malindi in 1498; built Fort Jesus in Mombasa (1593) to control Indian Ocean trade; expelled by Omani Arabs in 1698.\n- Christian Missionaries: Dr. Ludwig Krapf and Johannes Rebmann of the Church Missionary Society (CMS) arrived in 1844, establishing the first mission station at Rabai near Mombasa; translated the Bible into Swahili.\n\n2. Heroic African Resistance to British Colonialism:\n- Mekatilili wa Menza (Giriama Resistance):\n  * A courageous elder who organized the Giriama people against British forced labor, land alienation, and poll tax in 1913.\n  * Administered sacred traditional oaths (Mukushekushe and Fisi) and performed the historic kifudu funeral dance to mobilize warriors.\n  * Captured and exiled to Kisii, escaped on foot across 1,000 kilometres back to Giriama to continue resistance.\n- Koitalel arap Samoei (Nandi Resistance):\n  * Supreme Orkoiyot and military strategist who led the 11-year Nandi Resistance (1895–1905) against the Uganda Railway construction across Nandi territory.\n  * Defeated multiple British military expeditions before being treacherously assassinated during a truce meeting by British Colonel Richard Meinertzhagen in October 1905.\n- Waiyaki wa Hinga (Agikuyu Resistance):\n  * Leader of Dagoretti who resisted British imperialist aggression under Captain Frederick Lugard; captured and died in exile at Kibwezi in 1892.\n- Kabaka Mwanga of Buganda:\n  * Resisted British colonial and missionary interference in Buganda kingdom; exiled to Seychelles.',
    didYouKnow: 'Mekatilili wa Menza walked over 1,000 kilometres on foot through dense bush and hostile terrain after escaping from British colonial detention in Kisii, returning heroically to her coastal homeland to lead her people!',
    kenyanContext: 'At Nandi Hills, a national mausoleum and cultural center commemorates Orkoiyot Koitalel arap Samoei, where his traditional regalia, leadership staff, and historical artefacts are preserved with national honor.',
    order: 17,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u9-l2',
    subStrandId: 'substrand-g6-soc-u9',
    title: 'The Struggle for Independence, Mau Mau & The Birth of the Republic',
    content: 'Colonial rule imposed harsh hut taxes, forced labor, and racial segregation (the "White Highlands"), sparking sustained resistance.\n\n1. Early Political Associations:\n- Young Kikuyu Association (YKA) / East African Association (EAA) formed by Harry Thuku in 1921.\n- Young Kavirondo Association formed in western Kenya in 1921 by Jonathan Okwiri and Archdeacon Owen.\n- Taita Hills Association and Ukamba Members Association (led by Muindi Mbingu against colonial destocking of cattle).\n- Kenya African Union (KAU): Formed in 1944 to unite all ethnic groups nationally; led by Jomo Kenyatta from 1947.\n\n2. The Mau Mau Liberation War (1952–1956):\n- Armed guerrilla liberation movement operating from the deep forests of Mount Kenya and the Aberdares (Nyandarua).\n- Led by Field Marshal Dedan Kimathi Waciuri, General China (Waruhiu Itote), and Musa Mwariama.\n- The colonial government declared a State of Emergency in October 1952, detaining the "Kapenguria Six" leaders: Jomo Kenyatta, Bildad Kaggia, Kung’u Karumba, Fred Kubai, Paul Ngei, and Achieng’ Oneko.\n\n3. The Path to Independence (Uhuru):\n- Lancaster House Constitutional Conferences in London (1960–1962) negotiated multi-party elections and transition to majority rule.\n- Madaraka Day (1 June 1963): Kenya achieved internal self-government, with Jomo Kenyatta as first Prime Minister.\n- Jamhuri Day (12 December 1963): Kenya attained full national sovereignty and independence; on 12 December 1964, Kenya became a Republic.',
    didYouKnow: 'Field Marshal Dedan Kimathi was the supreme military commander of the Mau Mau liberation army in the Aberdares; a bronze statue honoring his courage stands proudly on Kimathi Street in downtown Nairobi!',
    kenyanContext: 'Every 20th of October, Kenyans celebrate Mashujaa Day (Heroes’ Day) to honor freedom fighters, founding fathers, athletes, and ordinary citizens who made extraordinary sacrifices for the nation.',
    order: 18,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },

  // Unit 10
  {
    id: 'lesson-g6-soc-u10-l1',
    subStrandId: 'substrand-g6-soc-u10',
    title: 'Citizenship, Fundamental Rights & The Democratic Electoral Process',
    content: 'A democratic nation thrives when informed citizens understand their civic rights and exercise their constitutional duties.\n\n1. How Kenyan Citizenship is Acquired (Chapter Three of the Constitution):\n- Citizenship by Birth: Anyone with at least one parent who is a Kenyan citizen at the time of their birth.\n- Citizenship by Registration: Non-citizens who lawfully reside in Kenya, marry a Kenyan citizen for at least 7 years, or are legally adopted.\n- Dual Citizenship is permitted under the 2010 Constitution.\n\n2. Duties and Responsibilities of a Patriotic Citizen:\n- Obeying laws and respecting the Constitution.\n- Paying lawful taxes to finance public services (schools, roads, hospitals).\n- Protecting the environment and public property.\n- Promoting national unity, peace, and reporting crime to law enforcement.\n- Participating in elections and democratic decision-making.\n\n3. The Bill of Rights (Chapter Four):\n- Fundamental Human Rights guaranteed to all Kenyans:\n  * Right to life and human dignity.\n  * Equality and freedom from discrimination.\n  * Freedom of expression, media, and peaceful assembly.\n  * Freedom of conscience, religion, and thought.\n  * Socio-economic rights: right to clean water, food, housing, healthcare, and basic education.\n  * Rights of children (protection from child labor, neglect, and abuse).\n\n4. Democratic Elections and the Electoral Body (IEBC):\n- The Independent Electoral and Boundaries Commission (IEBC) manages free, fair, and transparent general elections every 5 years.\n- Six elective seats in Kenya: President, County Governor, Senator, Member of the National Assembly (MP), County Woman Representative, and Member of County Assembly (MCA).\n- Secret Ballot: Every registered citizen aged 18 and above has the right to vote in privacy without intimidation.',
    didYouKnow: 'Article 53 of the Constitution of Kenya guarantees every child the fundamental right to free and compulsory basic education, nutritious food, shelter, healthcare, and protection from all forms of exploitation!',
    kenyanContext: 'During general elections, primary schools across all 47 counties serve as official polling centers where biometric voter verification kits (KIEMS) ensure one person, one vote.',
    order: 19,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  },
  {
    id: 'lesson-g6-soc-u10-l2',
    subStrandId: 'substrand-g6-soc-u10',
    title: 'The Three Arms of Government, Devolution & National Cohesion',
    content: 'The Constitution of Kenya establishes separation of powers to prevent tyranny, promote transparency, and protect democracy.\n\n1. The Three Arms of the National Government:\n- The Executive:\n  * Headed by the President, assisted by the Deputy President and Cabinet Secretaries.\n  * Function: Implements laws passed by parliament, manages state administration, and defends national security.\n- The Legislature (Parliament of Kenya - Bicameral):\n  * National Assembly: 290 constituency MPs, 47 County Woman Representatives, 12 nominated members, and the Speaker.\n  * Senate: 47 county senators, 16 nominated women, 2 youth representatives, 2 persons with disabilities, and the Speaker.\n  * Function: Makes laws, approves national budgets, and provides oversight over executive spending.\n- The Judiciary:\n  * Headed by the Chief Justice (President of the Supreme Court).\n  * Courts hierarchy: Supreme Court, Court of Appeal, High Court, Magistrate Courts, and Kadhis Courts.\n  * Function: Interprets the Constitution, resolves disputes, and administers justice independently without political interference.\n\n2. Devolution: Two Levels of Government:\n- National Government (headed by the President) and 47 County Governments (each headed by an elected Governor).\n- County functions: County health facilities, agriculture, local transport and feeder roads, early childhood development education (ECDE), trade markets, and refuse management.\n- Purpose of Devolution: Bringing resources and governance closer to the grassroots, eliminating regional marginalization, and promoting equitable development.\n\n3. National Symbols and National Cohesion:\n- The National Flag (Black, Red, Green, White with Maasai shield and spears).\n- The National Anthem (prayer for peace, unity, justice, and liberty).\n- The Coat of Arms and the Public Seal.\n- Values of National Cohesion: Overcoming negative ethnicity, embracing diversity, and upholding patriotism.',
    didYouKnow: 'The words of the Kenya National Anthem were derived from a traditional Pokomo lullaby song ("Bee ndoza mwana wangu") sung by mothers along the Tana River!',
    kenyanContext: 'Every Monday and Friday morning, Kenyan school assemblies raise the National Flag and sing the National Anthem in English and Kiswahili, uniting learners from every community as proud Kenyans.',
    order: 20,
    durationMinutes: 15,
    learningAreaId: 'la-social-g6',
    grade: 'G6'
  }
];

lessons.forEach(l => {
  if (!db.lessons.some(existing => existing.id === l.id)) {
    db.lessons.push(l);
    console.log('Added lesson:', l.id);
  }
});

// 3. Missions 57 to 60 (world-kenya-explorer)
const missions = [
  {
    id: 'mission-g6-soc-u9-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 57: Spearheads of Freedom – Heroic African Resistance',
    description: 'Relive the bravery of Mekatilili wa Menza, Orkoiyot Koitalel arap Samoei, and Waiyaki wa Hinga.',
    order: 57,
    orderIndex: 57,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-freedom-fighter',
    badge: 'badge-g6-soc-freedom-fighter',
    lessonId: 'lesson-g6-soc-u9-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u9-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u9-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 58: Road to Uhuru – Mau Mau, Kapenguria Six & Jamhuri',
    description: 'Follow Dedan Kimathi through the Aberdare forests to the Kapenguria trial and Jamhuri Day 1963.',
    order: 58,
    orderIndex: 58,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-uhuru-patriot',
    badge: 'badge-g6-soc-uhuru-patriot',
    lessonId: 'lesson-g6-soc-u9-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u9-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u10-m1',
    worldId: 'world-kenya-explorer',
    title: 'Mission 59: Bill of Rights & Ballot Box – Constitutional Democracy',
    description: 'Master your fundamental rights under Chapter 4, voter responsibilities, and secret ballot elections.',
    order: 59,
    orderIndex: 59,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-civic-leader',
    badge: 'badge-g6-soc-civic-leader',
    lessonId: 'lesson-g6-soc-u10-l1',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u10-${String(i + 1).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'mission-g6-soc-u10-m2',
    worldId: 'world-kenya-explorer',
    title: 'Mission 60: Three Arms & 47 Counties – Devolution & Unity',
    description: 'Explore the Executive, Parliament, the Judiciary, 47 County Governments, and the symbols of Kenyan unity.',
    order: 60,
    orderIndex: 60,
    xpReward: 125,
    rewardXp: 125,
    coinReward: 40,
    badgeReward: 'badge-g6-soc-grand-patriot',
    badge: 'badge-g6-soc-grand-patriot',
    lessonId: 'lesson-g6-soc-u10-l2',
    questionIds: Array.from({ length: 12 }, (_, i) => `q-g6-soc-u10-${String(i + 13).padStart(3, '0')}`),
    learningAreaId: 'la-social-g6'
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
  // Mission 57 (Unit 9 Lesson 1: q-g6-soc-u9-001 to 012)
  {
    id: 'q-g6-soc-u9-001',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which brave woman elder from the Giriama community rallied her people against British forced labor and colonial poll tax in 1913?',
    options: [
      'Mekatilili wa Menza',
      'Moraa wa Ng’iti',
      'Mary Muthoni Nyanjiru',
      'Grace Ogot'
    ],
    correctAnswer: 'Mekatilili wa Menza',
    explanation: 'Mekatilili wa Menza led the Giriama resistance in 1913, using sacred oaths and cultural dances to mobilize opposition to British colonial exploitation.',
    socraticHint: 'Which legendary coastal Giriama woman administered the Mukushekushe oath to resist British colonial rule?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-002',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'What was the primary reason the Nandi community, under Orkoiyot Koitalel arap Samoei, fiercely resisted the British for over a decade (1895–1905)?',
    options: [
      'To prevent the British from building the Uganda Railway through their ancestral grazing lands and sacred hills',
      'Because they wanted British tea seeds',
      'To force the British to build more schools in Nandi Hills',
      'Because they wanted to travel to London by ship'
    ],
    correctAnswer: 'To prevent the British from building the Uganda Railway through their ancestral grazing lands and sacred hills',
    explanation: 'The Nandi saw the railway ("the iron snake") as an invasive threat to their land sovereignty and cattle grazing grounds.',
    socraticHint: 'Why did the Nandi fight against the construction of the "iron snake" railway across their territory?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-003',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'How did British colonial officer Colonel Richard Meinertzhagen end the Nandi Resistance in October 1905?',
    options: [
      'By treacherously shooting Koitalel arap Samoei dead during an agreed peace truce meeting',
      'By challenging Koitalel to a game of football',
      'By offering Koitalel a gold watch as a present',
      'By buying all Nandi cattle with rupees'
    ],
    correctAnswer: 'By treacherously shooting Koitalel arap Samoei dead during an agreed peace truce meeting',
    explanation: 'Meinertzhagen invited Koitalel to a peace conference at Ketbarbar and dishonorably shot him when shaking his hand.',
    socraticHint: 'How did the British commander deceitfully kill Koitalel during a pretended peace negotiation?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-004',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which Agikuyu leader established Fort Smith with the Imperial British East Africa Company (IBEAC) but later fought against British mistreatment and died in exile?',
    options: [
      'Waiyaki wa Hinga',
      'Kinyanjui wa Gathirimu',
      'Harry Thuku',
      'Dedan Kimathi'
    ],
    correctAnswer: 'Waiyaki wa Hinga',
    explanation: 'Waiyaki wa Hinga was a prominent Dagoretti leader who defended his community against British arrogance and died while being deported to the coast.',
    socraticHint: 'Which Dagoretti leader fought Captain Purkiss and died under suspicious circumstances at Kibwezi while in British custody?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-005',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which Portuguese fortress, built in Mombasa in 1593 to defend their coastal trade monopoly, was captured and recaptured multiple times?',
    options: [
      'Fort Jesus',
      'Fort Smith',
      'Fort Hall',
      'Fort Ternan'
    ],
    correctAnswer: 'Fort Jesus',
    explanation: 'Fort Jesus dominated Mombasa harbour for over a century before Omani Arabs captured it after a famous 33-month siege in 1698.',
    socraticHint: 'Which famous fortress built by the Portuguese overlooking Kilindini harbor still stands in Old Town Mombasa?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-006',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which European missionaries of the Church Missionary Society (CMS) arrived at Rabai near Mombasa in 1844 and translated the Bible into Kiswahili?',
    options: [
      'Johann Ludwig Krapf and Johannes Rebmann',
      'David Livingstone and Henry Stanley',
      'Lord Delamere and Grogan',
      'Joseph Thomson and Count Teleki'
    ],
    correctAnswer: 'Johann Ludwig Krapf and Johannes Rebmann',
    explanation: 'Dr. Krapf and Rebmann founded the first inland mission at Rabai, compiled the first Swahili dictionary, and sighted Mount Kenya and Kilimanjaro.',
    socraticHint: 'Which German missionaries founded the mission station at Rabai and translated Genesis into Kiswahili?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-007',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'What traditional dance did Mekatilili wa Menza perform in village squares to attract crowds and inspire women and youth to resist colonial oppression?',
    options: [
      'Kifudu funeral dance',
      'Isukuti dance',
      'Mwomboko dance',
      'Chakacha dance'
    ],
    correctAnswer: 'Kifudu funeral dance',
    explanation: 'Mekatilili transformed the solemn Kifudu dance into a stirring call to collective resistance, evoking ancestral pride.',
    socraticHint: 'Which sacred coastal funeral dance did Mekatilili use to summon village assemblies to take anti-colonial oaths?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-008',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which king (Kabaka) of the Buganda kingdom in modern Uganda resisted British colonial and religious domination and was later exiled to Seychelles?',
    options: [
      'Kabaka Mwanga II',
      'Kabaka Mutesa I',
      'Omukama Kabalega',
      'Nabongo Mumia'
    ],
    correctAnswer: 'Kabaka Mwanga II',
    explanation: 'Kabaka Mwanga resisted British attempts to usurp royal Buganda power, leading an armed rebellion before being exiled alongside Kabalega of Bunyoro.',
    socraticHint: 'Which young Buganda king fought against British protectorate rule in the 1890s?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-009',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Why did the British colonial government introduce the "Kipande" (fingerprinted metal identification badge) in Kenya in 1915?',
    options: [
      'To strictly control and monitor African male labor movements and prevent workers from leaving European settler farms',
      'To give Africans free admission to cinemas',
      'To enable Africans to travel abroad on holidays',
      'To register citizens for university degrees'
    ],
    correctAnswer: 'To strictly control and monitor African male labor movements and prevent workers from leaving European settler farms',
    explanation: 'The humiliating Kipande system forced African men to wear a registration cylinder around their necks to track their employment contracts.',
    socraticHint: 'Why did colonial settlers force African men to wear the metal Kipande necklace?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-010',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which courageous prophetess from Kisii community inspired Gusii warriors to resist British colonial rule in 1908 after British officer Geoffrey Northcote arrived?',
    options: [
      'Moraa wa Ng’iti',
      'Mekatilili wa Menza',
      'Ciokaraine',
      'Wangu wa Makeri'
    ],
    correctAnswer: 'Moraa wa Ng’iti',
    explanation: 'Moraa wa Ng’iti was an influential Gusii medicine woman and prophetess who urged her nephew Otenyo to spear Northcote in defiance of colonial conquest.',
    socraticHint: 'Which Gusii prophetess and elder inspired resistance against British invaders in Kisii in 1908?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-011',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'What major lesson on leadership and courage do contemporary Kenyans learn from anti-colonial heroes like Mekatilili and Koitalel?',
    options: [
      'Selfless patriotism, standing up against injustice, defending community dignity, and protecting ancestral lands',
      'Surrendering immediately whenever challenged',
      'Leaving your homeland to live in foreign lands',
      'Valuing money more than national sovereignty'
    ],
    correctAnswer: 'Selfless patriotism, standing up against injustice, defending community dignity, and protecting ancestral lands',
    explanation: 'Our freedom heroes demonstrated that freedom requires courageous moral principle, sacrifice, and collective resolve against oppression.',
    socraticHint: 'What noble moral qualities of bravery, patriotism, and love for justice do our heroes inspire in young Kenyans?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-012',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l1',
    text: 'Which commercial chartered company governed Kenya on behalf of the British Empire from 1888 until official protectorate declaration in 1895?',
    options: [
      'Imperial British East Africa Company (IBEAC)',
      'British South Africa Company',
      'Dutch East India Company',
      'Royal Niger Company'
    ],
    correctAnswer: 'Imperial British East Africa Company (IBEAC)',
    explanation: 'Sir William Mackinnon’s IBEAC administered Kenya and Uganda under a royal charter until it went bankrupt and handed control to the British crown.',
    socraticHint: 'Which trading company with initials IBEAC initially administered Kenya for the British crown?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 58 (Unit 9 Lesson 2: q-g6-soc-u9-013 to 024)
  {
    id: 'q-g6-soc-u9-013',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Who was the supreme military commander and leader of the Mau Mau liberation army fighting in the Aberdare forests against British colonial rule?',
    options: [
      'Field Marshal Dedan Kimathi Waciuri',
      'Harry Thuku',
      'Jomo Kenyatta',
      'Tom Mboya'
    ],
    correctAnswer: 'Field Marshal Dedan Kimathi Waciuri',
    explanation: 'Field Marshal Dedan Kimathi organized the Kenya Parliament in the Nyandarua forests and commanded the guerrilla freedom fighters with extraordinary tactical skill.',
    socraticHint: 'Which brave Field Marshal led the forest guerrilla fighters in the Aberdares and has a major statue in Nairobi?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-014',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Which group of prominent nationalist leaders was arrested in October 1952 at the declaration of the State of Emergency and tried at Kapenguria?',
    options: [
      'The Kapenguria Six (Jomo Kenyatta, Bildad Kaggia, Kung’u Karumba, Fred Kubai, Paul Ngei, Achieng’ Oneko)',
      'The Big Six of West Africa',
      'The Lancaster delegates',
      'The Nairobi Town Council'
    ],
    correctAnswer: 'The Kapenguria Six (Jomo Kenyatta, Bildad Kaggia, Kung’u Karumba, Fred Kubai, Paul Ngei, Achieng’ Oneko)',
    explanation: 'Known collectively as the Kapenguria Six, these nationalist leaders were unjustly convicted by the colonial regime and imprisoned at Lokitaung.',
    socraticHint: 'What famous historical title is given to the six national leaders tried together at Kapenguria in 1952?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-015',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'On which historical date did Kenya celebrate its full independence (Uhuru) from British colonial rule?',
    options: [
      '12 December 1963',
      '1 June 1963',
      '20 October 1952',
      '1 January 1970'
    ],
    correctAnswer: '12 December 1963',
    explanation: 'On 12 December 1963, the British Union Jack flag was lowered and the black, red, green, and white Kenya National Flag was hoisted at Jamhuri Park.',
    socraticHint: 'On what historic day in December 1963 did Kenya hoist its national flag and achieve complete independence?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-016',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'What is celebrated annually in Kenya on Madaraka Day (1 June)?',
    options: [
      'The achievement of internal self-government in 1963, when Kenya chose its first Prime Minister',
      'The arrival of the first steam train in Kisumu',
      'The end of World War II',
      'The opening of the port of Mombasa'
    ],
    correctAnswer: 'The achievement of internal self-government in 1963, when Kenya chose its first Prime Minister',
    explanation: 'Madaraka Day celebrates 1 June 1963, when Kenyans assumed internal executive powers leading up to full independence in December.',
    socraticHint: 'What milestone did Kenya achieve on 1 June 1963: full republic status or internal self-government (Madaraka)?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-017',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Which trade union leader and brilliant young nationalist organized the famous "Airlift to America" scholarships that educated hundreds of East African scholars (including Wangari Maathai)?',
    options: [
      'Tom Mboya',
      'Ronald Ngala',
      'Masinde Muliro',
      'Daniel arap Moi'
    ],
    correctAnswer: 'Tom Mboya',
    explanation: 'Tom Mboya partnered with Senator John F. Kennedy to organize airlifts that flew bright African students to US universities to prepare for post-independence governance.',
    socraticHint: 'Which charismatic trade unionist and cabinet minister organized the famous educational student airlifts to the USA?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-018',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'What was the main grievance that united the Ukamba Members Association under Muindi Mbingu in their 1938 peaceful march to Nairobi?',
    options: [
      'Protesting against colonial forced destocking (compulsory confiscation of Kamba cattle herds)',
      'Demanding free bicycles from the governor',
      'Refusing to eat imported European wheat flour',
      'Asking to build a railway line to Machakos'
    ],
    correctAnswer: 'Protesting against colonial forced destocking (compulsory confiscation of Kamba cattle herds)',
    explanation: 'Muindi Mbingu led thousands of men and women who camped peacefully at Kariokor in Nairobi until the colonial governor stopped seizing their cattle.',
    socraticHint: 'Why did Muindi Mbingu lead Kamba farmers to camp outside State House in Nairobi in 1938?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-019',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'What was the name of the political party led by Ronald Ngala and Daniel arap Moi at independence that advocated for regional federalism (Majimbo)?',
    options: [
      'Kenya African Democratic Union (KADU)',
      'Kenya African National Union (KANU)',
      'East African Association (EAA)',
      'Liberal Democratic Party (LDP)'
    ],
    correctAnswer: 'Kenya African Democratic Union (KADU)',
    explanation: 'KADU championed regional devolution (Majimbo) to safeguard minority communities, while KANU favored a strong centralized national government.',
    socraticHint: 'Which political party formed by minority communities championed a federal Majimbo constitution in 1960?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-020',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Who was the first President of the Republic of Kenya when it attained republican status on 12 December 1964?',
    options: [
      'Mzee Jomo Kenyatta',
      'Daniel Toroitich arap Moi',
      'Mwai Kibaki',
      'Uhuru Kenyatta'
    ],
    correctAnswer: 'Mzee Jomo Kenyatta',
    explanation: 'Mzee Jomo Kenyatta became the founding President and Head of State of the Republic of Kenya in December 1964.',
    socraticHint: 'Who is recognized as the founding Father of the Nation and first President of Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-021',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'What was the role of the Lancaster House Conferences held in London between 1960 and 1962?',
    options: [
      'Negotiating the terms of Kenya’s independence constitution and the transition to majority democratic rule',
      'Selling Kenyan coffee to British supermarkets',
      'Selecting the players for the national football team',
      'Planning the construction of the Likoni ferry'
    ],
    correctAnswer: 'Negotiating the terms of Kenya’s independence constitution and the transition to majority democratic rule',
    explanation: 'Kenyan political delegations (KANU and KADU) negotiated the structure of government, land rights, and the Bill of Rights in London.',
    socraticHint: 'What historic constitutional negotiations in London drafted Kenya’s framework for self-government and independence?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-022',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Which brave woman leader stood outside the Central Police Station in Nairobi in March 1922 demanding the release of Harry Thuku before being killed by colonial police gunfire?',
    options: [
      'Mary Muthoni Nyanjiru',
      'Mekatilili wa Menza',
      'Chelagat Mutai',
      'Wangari Maathai'
    ],
    correctAnswer: 'Mary Muthoni Nyanjiru',
    explanation: 'Mary Muthoni Nyanjiru led hundreds of women in peaceful protest demanding the release of Harry Thuku, sacrificing her life for freedom.',
    socraticHint: 'Which heroic female nationalist challenged men to give women their trousers if they feared demanding Harry Thuku’s release in 1922?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-023',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'Who was appointed the first Vice President of independent Kenya in December 1964 alongside President Jomo Kenyatta?',
    options: [
      'Jaramogi Oginga Odinga',
      'Joseph Murumbi',
      'Daniel arap Moi',
      'Mwai Kibaki'
    ],
    correctAnswer: 'Jaramogi Oginga Odinga',
    explanation: 'Jaramogi Oginga Odinga served as the first Vice President of Kenya and played an instrumental role in advocating for Kenyatta’s unconditional release from detention.',
    socraticHint: 'Which prominent freedom champion from Bondo was independent Kenya’s first Vice President?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u9-024',
    subStrandId: 'substrand-g6-soc-u9',
    lessonId: 'lesson-g6-soc-u9-l2',
    text: 'What major national lesson does Mashujaa Day (celebrated every 20th October) instill in young Kenyan generations?',
    options: [
      'Honoring past and present citizens who demonstrated selflessness, courage, and dedication to national progress',
      'Buying foreign goods online',
      'Sleeping late and skipping school work',
      'Complaining about our country without helping build it'
    ],
    correctAnswer: 'Honoring past and present citizens who demonstrated selflessness, courage, and dedication to national progress',
    explanation: 'Mashujaa Day reminds all citizens that nations are built by everyday individuals making courageous personal contributions to community and country.',
    socraticHint: 'Why does Kenya celebrate Mashujaa Day every October to honor our heroes and heroines?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 59 (Unit 10 Lesson 1: q-g6-soc-u10-001 to 012)
  {
    id: 'q-g6-soc-u10-001',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'Under Chapter Three of the Constitution of Kenya 2010, how does a person become a Kenyan citizen by birth?',
    options: [
      'If on the day of the person’s birth, whether in or outside Kenya, either the mother or the father was a Kenyan citizen',
      'Only if born in a five-star hotel in Nairobi',
      'By paying five million shillings to the immigration office',
      'Only if both parents have won an Olympic marathon medal'
    ],
    correctAnswer: 'If on the day of the person’s birth, whether in or outside Kenya, either the mother or the father was a Kenyan citizen',
    explanation: 'Article 14 establishes that having at least one Kenyan parent at birth automatically confers citizenship by birth.',
    socraticHint: 'What constitutional requirement regarding your mother or father grants you citizenship by birth?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-002',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'What is the "Bill of Rights" contained in Chapter Four of the Constitution of Kenya?',
    options: [
      'The supreme framework of fundamental human rights and freedoms guaranteed to every person in Kenya',
      'A monthly electricity invoice sent to homes',
      'A list of prices of groceries in local supermarkets',
      'The rules of playing cricket'
    ],
    correctAnswer: 'The supreme framework of fundamental human rights and freedoms guaranteed to every person in Kenya',
    explanation: 'The Bill of Rights is an integral part of Kenya’s democratic state that preserves the dignity of individuals and promotes social justice.',
    socraticHint: 'Which chapter of our Constitution outlines our fundamental human rights and freedoms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-003',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'Which constitutional body is mandated to conduct and supervise free, fair, and transparent general elections and referenda in Kenya?',
    options: [
      'Independent Electoral and Boundaries Commission (IEBC)',
      'Kenya National Commission on Human Rights (KNCHR)',
      'Ethics and Anti-Corruption Commission (EACC)',
      'Public Service Commission (PSC)'
    ],
    correctAnswer: 'Independent Electoral and Boundaries Commission (IEBC)',
    explanation: 'The IEBC is the independent constitutional commission tasked under Article 88 with conducting elections and delimiting constituency boundaries.',
    socraticHint: 'Which commission conducts national elections, registers voters, and counts ballots in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-004',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'At what minimum age is an eligible Kenyan citizen legally entitled to register and vote in general elections?',
    options: [
      '18 years',
      '16 years',
      '21 years',
      '25 years'
    ],
    correctAnswer: '18 years',
    explanation: 'Article 83 of the Constitution provides that every adult citizen aged 18 and older who possesses a national ID card or passport has the right to register as a voter.',
    socraticHint: 'What age marks official adulthood for acquiring an ID card and voting in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-005',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'How many different ballot papers does an eligible voter mark in a single Kenyan general election day?',
    options: [
      '6 ballots (President, Governor, Senator, MP, Woman Representative, MCA)',
      '1 ballot only',
      '10 ballots',
      '3 ballots'
    ],
    correctAnswer: '6 ballots (President, Governor, Senator, MP, Woman Representative, MCA)',
    explanation: 'General elections elect representatives across 6 elective positions: President, County Governor, Senator, Constituency MP, County Woman Rep, and Ward MCA.',
    socraticHint: 'How many elective positions are voted for simultaneously on Kenya’s general election day?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-006',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'What does "voting by secret ballot" mean in a democratic election?',
    options: [
      'A voter marks their ballot in total privacy behind a booth, ensuring no one can see or force their choice',
      'Voters whisper their choice to a police officer',
      'Voters raise their hands in front of candidates',
      'Only secret agents are allowed to vote'
    ],
    correctAnswer: 'A voter marks their ballot in total privacy behind a booth, ensuring no one can see or force their choice',
    explanation: 'A secret ballot protects voters from intimidation, bribery, or retaliation, ensuring every citizen votes freely according to conscience.',
    socraticHint: 'Why do voters go inside an isolated private polling booth to mark their ballot paper alone?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-007',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'Which article of the Constitution of Kenya specifically protects the rights of children to free basic education, healthcare, and shelter?',
    options: [
      'Article 53',
      'Article 1',
      'Article 100',
      'Article 250'
    ],
    correctAnswer: 'Article 53',
    explanation: 'Article 53 guarantees children the right to name and nationality, free compulsory basic education, basic nutrition, healthcare, and protection from abuse.',
    socraticHint: 'Which specific article in Chapter 4 outlines the fundamental constitutional rights of every Kenyan child?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-008',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'What is a civic responsibility that all employed and business-owning citizens owe to their country to fund schools, roads, and security?',
    options: [
      'Paying lawful taxes faithfully and honestly',
      'Constructing private airports',
      'Traveling only on public buses',
      'Never using public health facilities'
    ],
    correctAnswer: 'Paying lawful taxes faithfully and honestly',
    explanation: 'Taxes collected by the Kenya Revenue Authority (KRA) fund public infrastructure, teacher salaries, military defense, and healthcare.',
    socraticHint: 'What financial contribution must citizens pay from their earnings to support national development?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-009',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'Which freedom in the Bill of Rights allows citizens to peacefully gather, hold parades, or present petitions to public authorities without being harassed?',
    options: [
      'Freedom of assembly, demonstration, picketing, and petition (Article 37)',
      'Freedom to drive at any speed',
      'Freedom to enter private homes without permission',
      'Freedom to avoid paying bus fares'
    ],
    correctAnswer: 'Freedom of assembly, demonstration, picketing, and petition (Article 37)',
    explanation: 'Article 37 protects the right of every citizen to peacefully and unarmed assemble, demonstrate, and petition public leaders.',
    socraticHint: 'Which constitutional right allows peaceful public gatherings and demonstrations without weapons?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-010',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'What can lead to the loss of Kenyan citizenship acquired by registration?',
    options: [
      'If the citizenship was acquired through fraud, false representation, or treason against the Republic',
      'If the person travels to another country on holiday',
      'If the person changes their hairstyle',
      'If the person opens a bank account abroad'
    ],
    correctAnswer: 'If the citizenship was acquired through fraud, false representation, or treason against the Republic',
    explanation: 'Under Article 17, citizenship by registration can be revoked by a court if obtained fraudulently or if the individual assists enemy nations in war.',
    socraticHint: 'Can citizenship acquired by registration be cancelled if someone lied or used forged fake documents?',
    difficulty: 'HARD',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-011',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'What is the role of an election observer during general elections in Kenya?',
    options: [
      'Impartially observing the polling, counting, and tallying processes to verify if elections meet legal standards of fairness and transparency',
      'Telling voters which candidate to choose',
      'Counting money inside polling stations',
      'Arresting voters who vote slowly'
    ],
    correctAnswer: 'Impartially observing the polling, counting, and tallying processes to verify if elections meet legal standards of fairness and transparency',
    explanation: 'Domestic and international observers objectively monitor election integrity without interfering in the voting operations.',
    socraticHint: 'Why do independent observers watch polling stations and tallying centers during election days?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-012',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l1',
    text: 'Why is hate speech and incitement to ethnic violence strictly prohibited under Kenyan election laws?',
    options: [
      'It endangers national peace, destroys democratic unity, and causes civil violence and loss of human life',
      'Because politicians run out of words',
      'To prevent people from speaking on radio',
      'To encourage people to whisper in public'
    ],
    correctAnswer: 'It endangers national peace, destroys democratic unity, and causes civil violence and loss of human life',
    explanation: 'The National Cohesion and Integration Act criminalizes ethnic hate speech to safeguard communal harmony and prevent election violence.',
    socraticHint: 'Why does the law punish leaders who preach ethnic hatred and incite communities against each other?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },

  // Mission 60 (Unit 10 Lesson 2: q-g6-soc-u10-013 to 024)
  {
    id: 'q-g6-soc-u10-013',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What are the Three Arms of the Government of Kenya established to ensure checks and balances?',
    options: [
      'The Executive, The Legislature (Parliament), and The Judiciary',
      'The Police, The Army, and The Airforce',
      'The County, The Sub-County, and The Ward',
      'The Primary, The Secondary, and The University'
    ],
    correctAnswer: 'The Executive, The Legislature (Parliament), and The Judiciary',
    explanation: 'The doctrine of separation of powers divides sovereign authority between Executive (implements law), Legislature (makes law), and Judiciary (interprets law).',
    socraticHint: 'Which three distinct branches make, execute, and interpret the laws of Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-014',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'Who is the head of the Judiciary in Kenya and the President of the Supreme Court?',
    options: [
      'The Chief Justice',
      'The Attorney General',
      'The Speaker of the National Assembly',
      'The Director of Public Prosecutions'
    ],
    correctAnswer: 'The Chief Justice',
    explanation: 'The Chief Justice heads the judicial branch, presides over the Supreme Court, and chairs the Judicial Service Commission (JSC).',
    socraticHint: 'What is the official title of Kenya’s top judicial leader who presides over the Supreme Court?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-015',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What are the two chambers (houses) that make up the bicameral Parliament of Kenya?',
    options: [
      'The National Assembly and The Senate',
      'The House of Commons and House of Lords',
      'The Supreme Court and High Court',
      'The Cabinet and the County Assembly'
    ],
    correctAnswer: 'The National Assembly and The Senate',
    explanation: 'Article 93 establishes the Parliament of Kenya consisting of two houses: the National Assembly and the Senate.',
    socraticHint: 'Which two chambers meet at Parliament Buildings to represent constituencies and counties?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-016',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What is the primary role of the Senate in the Parliament of Kenya?',
    options: [
      'Representing and protecting the interests of the 47 counties and their governments, and determining allocation of national revenue to counties',
      'Commanding the Kenya Navy in maritime operations',
      'Managing traffic flow on the Thika Superhighway',
      'Conducting examinations in primary schools'
    ],
    correctAnswer: 'Representing and protecting the interests of the 47 counties and their governments, and determining allocation of national revenue to counties',
    explanation: 'Article 96 assigns the Senate the critical role of protecting devolution, passing county laws, and allocating equitable revenue to county governments.',
    socraticHint: 'Which house of parliament was created specifically to safeguard and defend county governments?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-017',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'How many county governments were created by the Constitution of Kenya 2010 to implement devolution across the country?',
    options: [
      '47 County Governments',
      '8 Provincial Governments',
      '290 Constituency Governments',
      '100 County Governments'
    ],
    correctAnswer: '47 County Governments',
    explanation: 'The First Schedule of the Constitution defines the 47 counties of Kenya, each headed by an elected County Governor.',
    socraticHint: 'How many counties exist in Kenya today under our devolved constitutional structure?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-018',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'Which public service sector is primarily managed by County Governments under the Fourth Schedule of the Constitution?',
    options: [
      'County health services (dispensaries, level 4 hospitals) and local agriculture/livestock',
      'Foreign international embassies and diplomacy',
      'The Kenya Defence Forces and national military defense',
      'Currency printing and monetary policy'
    ],
    correctAnswer: 'County health services (dispensaries, level 4 hospitals) and local agriculture/livestock',
    explanation: 'Health facilities, county roads, agriculture, early childhood education, and markets are devolved to county administration.',
    socraticHint: 'Which essential everyday service—local clinics, hospitals, and farm extension—is run by county governments?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-019',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What do the four colors on the Kenya National Flag symbolize?',
    options: [
      'Black for the people of Kenya; Red for blood shed for freedom; Green for agricultural land; White for peace and unity',
      'Black for darkness; Red for fire; Green for money; White for snow',
      'Black for tea; Red for coffee; Green for forests; White for sugar',
      'Black for tarmac roads; Red for traffic lights; Green for traffic go; White for pedestrian crossings'
    ],
    correctAnswer: 'Black for the people of Kenya; Red for blood shed for freedom; Green for agricultural land; White for peace and unity',
    explanation: 'Black represents the African people, Red the sacrifice for liberation, Green our fertile environment, and White strips signify enduring peace.',
    socraticHint: 'What do Black (the people), Red (the freedom struggle), Green (the land), and White (peace) symbolize on our flag?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-020',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What two weapons support the traditional Maasai warrior shield on the Coat of Arms of Kenya?',
    options: [
      'Two crossed spears',
      'Two bows and arrows',
      'Two clubs (rungus)',
      'Two modern rifles'
    ],
    correctAnswer: 'Two crossed spears',
    explanation: 'The traditional shield and two crossed spears symbolize our readiness to defend our freedom and national sovereignty.',
    socraticHint: 'What crossed traditional weapons behind the Maasai shield symbolize the defense of Kenya on our Coat of Arms?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-021',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What word is inscribed at the base of the Coat of Arms of Kenya, serving as the national motto of mutual collective effort?',
    options: [
      'Harambee',
      'Nyayo',
      'Uhuru',
      'Amani'
    ],
    correctAnswer: 'Harambee',
    explanation: 'Harambee ("pulling together") is Kenya’s official motto emblazoned on the scroll beneath the two supporting lions on the Coat of Arms.',
    socraticHint: 'Which famous Kenyan word meaning "Let us pull together" is written on the Coat of Arms scroll?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-022',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'What is the highest court in the Republic of Kenya whose judicial decisions are final and binding on all other courts in the land?',
    options: [
      'The Supreme Court of Kenya',
      'The Court of Appeal',
      'The High Court',
      'The Employment and Labour Relations Court'
    ],
    correctAnswer: 'The Supreme Court of Kenya',
    explanation: 'Under Article 163, the Supreme Court is the apex court with exclusive original jurisdiction to hear presidential election petitions.',
    socraticHint: 'Which 7-judge apex court headed by the Chief Justice makes final constitutional determinations in Kenya?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-023',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'Which independent commission was created under Chapter Fifteen of the Constitution to foster ethnic harmony and eliminate discrimination among Kenyan communities?',
    options: [
      'National Cohesion and Integration Commission (NCIC)',
      'Kenya Police Service Commission',
      'Teachers Service Commission (TSC)',
      'Salaries and Remuneration Commission (SRC)'
    ],
    correctAnswer: 'National Cohesion and Integration Commission (NCIC)',
    explanation: 'NCIC promotes inter-ethnic dialogue, investigates hate speech, and facilitates harmonious relationships across all cultural communities.',
    socraticHint: 'Which commission abbreviated as NCIC promotes national cohesion and fights ethnic discrimination?',
    difficulty: 'MEDIUM',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  },
  {
    id: 'q-g6-soc-u10-024',
    subStrandId: 'substrand-g6-soc-u10',
    lessonId: 'lesson-g6-soc-u10-l2',
    text: 'How can Kenyan primary school pupils embody national values and patriotism in their daily lives at school?',
    options: [
      'Treating learners from all ethnic backgrounds with equal respect, singing the national anthem with reverence, and protecting school property',
      'Forming tribal cliques that exclude children of other communities',
      'Disobeying school rules and damaging desks',
      'Refusing to clean classroom environments'
    ],
    correctAnswer: 'Treating learners from all ethnic backgrounds with equal respect, singing the national anthem with reverence, and protecting school property',
    explanation: 'Patriotism is lived daily through empathy, celebrating our shared heritage, caring for school resources, and building inclusive friendships.',
    socraticHint: 'How does showing kindness, respecting classmates from all tribes, and caring for our school demonstrate true patriotism?',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    sourceType: 'KICD_ALIGNED',
    contentStatus: 'REVIEW',
    grade: 'G6',
    learningAreaId: 'la-social-g6'
  }
];

questions.forEach(q => {
  if (!db.questions.some(existing => existing.id === q.id)) {
    db.questions.push(q);
  }
});

console.log(`Added ${questions.length} questions for Units 9 & 10.`);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved Batch 5 to cbe_database.json!');
