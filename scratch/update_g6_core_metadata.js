/**
 * Standardize learningAreaId and grade for Grade 6 Mathematics, English, and Kiswahili.
 * This links existing Grade 6 lessons, missions, and questions to their learning area records.
 */

import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'cbe_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let lCount = 0, mCount = 0, qCount = 0;

for (const l of db.lessons) {
  if (l.subStrandId && l.subStrandId.startsWith('substrand-g6-math-') && !l.learningAreaId) {
    l.learningAreaId = 'la-math-g6'; l.grade = 'G6'; lCount++;
  }
  if (l.subStrandId && l.subStrandId.startsWith('substrand-g6-eng-') && !l.learningAreaId) {
    l.learningAreaId = 'la-english-g6'; l.grade = 'G6'; lCount++;
  }
  if (l.subStrandId && l.subStrandId.startsWith('substrand-g6-kisw-') && !l.learningAreaId) {
    l.learningAreaId = 'la-kiswahili-g6'; l.grade = 'G6'; lCount++;
  }
}

for (const m of db.missions) {
  if (m.id && m.id.startsWith('mission-g6-math-') && !m.learningAreaId) {
    m.learningAreaId = 'la-math-g6'; mCount++;
  }
  if (m.id && m.id.startsWith('mission-g6-eng-') && !m.learningAreaId) {
    m.learningAreaId = 'la-english-g6'; mCount++;
  }
  if (m.id && m.id.startsWith('mission-g6-kisw-') && !m.learningAreaId) {
    m.learningAreaId = 'la-kiswahili-g6'; mCount++;
  }
}

for (const q of db.questions) {
  if (q.subStrandId && q.subStrandId.startsWith('substrand-g6-math-') && !q.learningAreaId) {
    q.learningAreaId = 'la-math-g6'; q.grade = 'G6'; qCount++;
  }
  if (q.subStrandId && q.subStrandId.startsWith('substrand-g6-eng-') && !q.learningAreaId) {
    q.learningAreaId = 'la-english-g6'; q.grade = 'G6'; qCount++;
  }
  if (q.subStrandId && q.subStrandId.startsWith('substrand-g6-kisw-') && !q.learningAreaId) {
    q.learningAreaId = 'la-kiswahili-g6'; q.grade = 'G6'; qCount++;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Updated Grade 6 metadata: ${lCount} lessons, ${mCount} missions, ${qCount} questions.`);
