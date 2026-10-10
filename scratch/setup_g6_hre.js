/**
 * Setup script for Grade 6 Hindu Religious Education (HRE)
 * Registers la-hre-g6 in learningAreas, links to world-faith-values, and defines 4 strands.
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- Setting up Grade 6 Hindu Religious Education (HRE) ---');

// 1. Register la-hre-g6 in learningAreas
const laHreG6 = {
  id: 'la-hre-g6',
  gradeId: 'grade-6',
  name: 'Hindu Religious Education',
  swahiliName: 'Elimu ya Dini ya Kihindu',
  icon: 'sparkles',
  color: '#F59E0B',
  description: 'Exploring Trimurti and cosmic functions, the universal Law of Karma and Samsara, wisdom of the Bhagavad Gita and Ramayana, sacred Vedic prayers and Mantras, the Five Niyamas and Yogic disciplines, Vasudhaiva Kutumbakam environmental stewardship, festive traditions, and philanthropic Sewa for Kenyan nation building.',
  strandsCount: 4
};

const laIdx = db.learningAreas.findIndex(la => la.id === 'la-hre-g6');
if (laIdx >= 0) db.learningAreas[laIdx] = laHreG6;
else db.learningAreas.push(laHreG6);
console.log('Registered learning area: la-hre-g6');

// 2. Link to world-faith-values
const world = db.gameWorlds.find(w => w.id === 'world-faith-values');
if (world) {
  if (!world.learningAreaIds) world.learningAreaIds = [];
  if (!world.learningAreaIds.includes('la-hre-g6')) {
    world.learningAreaIds.push('la-hre-g6');
    console.log('Added la-hre-g6 to world-faith-values');
  }
}

// 3. Define 4 Strands
const strands = [
  {
    id: 'strand-g6-hre-paramatma',
    learningAreaId: 'la-hre-g6',
    code: 'HRE-G6-STR-01',
    title: 'Paramatma, Trimurti and the Universal Law of Karma',
    swahiliTitle: 'Paramatma, Trimurti na Sheria ya Kiulimwengu ya Karma',
    description: 'Understanding Paramatma’s supreme omnipresence, cosmic manifestations of the Trimurti (Brahma the Creator, Vishnu the Preserver, Shiva the Regenerator), the cosmic cycle of creation and dissolution, and the infallible Law of Karma (cause, effect, moral responsibility, Sanchita, Prarabdha, and Kriyamana) guiding the soul (Atman) toward spiritual liberation (Moksha).',
    icon: 'sparkles'
  },
  {
    id: 'strand-g6-hre-scriptures',
    learningAreaId: 'la-hre-g6',
    code: 'HRE-G6-STR-02',
    title: 'Sacred Scriptures, Epic Wisdom and Vedic Mantras',
    swahiliTitle: 'Maandiko Matakatifu, Hekima ya Kina na Mantras za Kiveda',
    description: 'Exploring profound teachings from the Bhagavad Gita (Lord Krishna’s counsel to Arjuna on Kurukshetra, Nishkama Karma / selfless action, and mental equanimity), moral lessons of duty and loyalty in the Ramayana, and chanting and reflecting on sacred Vedic mantras (Mahamrityunjaya, Pavamana / Asato Ma Sadgamaya, and Shanti Mantras) for peace and healing.',
    icon: 'book-open'
  },
  {
    id: 'strand-g6-hre-virtues',
    learningAreaId: 'la-hre-g6',
    code: 'HRE-G6-STR-03',
    title: 'Sadachar (Virtues), Niyamas, Yoga and Environmental Stewardship',
    swahiliTitle: 'Sadachar (Maadili), Niyamas, Yoga na Utunzaji wa Mazingira',
    description: 'Internalizing moral disciplines through the Five Niyamas (Shaucha, Santosha, Tapas, Svadhyaya, Ishvara Pranidhana), foundational practices of Ashtanga Yoga for mental focus and wellness (Asanas, Pranayama), and living the universal Vedic ethic of Vasudhaiva Kutumbakam (the world is one family) through reverent care of Mother Earth (Prakriti), sacred flora and fauna, and water bodies.',
    icon: 'heart'
  },
  {
    id: 'strand-g6-hre-festivals',
    learningAreaId: 'la-hre-g6',
    code: 'HRE-G6-STR-04',
    title: 'Sacred Festivals, Sewa and Kenyan National Coexistence',
    swahiliTitle: 'Sherehe Takatifu, Sewa na Uwepo wa Pamoja wa Kitaifa nchini Kenya',
    description: 'Spiritual significance of sacred celebrations (Diwali, Annakut, Holi, Navratri), cultural transmission, practicing selfless community service (Sewa) as divine worship (Nara Sewa Narayana Sewa), fostering inter-religious dialogue, and contributing actively to Kenyan national cohesion, charitable health camps, and educational development.',
    icon: 'sun'
  }
];

for (const s of strands) {
  const sIdx = db.strands.findIndex(x => x.id === s.id);
  if (sIdx >= 0) db.strands[sIdx] = s;
  else db.strands.push(s);
  console.log(`Added strand: ${s.id}`);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully configured Grade 6 HRE foundation in cbe_database.json!');
