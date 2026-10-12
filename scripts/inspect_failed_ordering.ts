import fs from 'fs';

const db = JSON.parse(fs.readFileSync('data/cbe_database.json', 'utf8'));
const q = db.questions.find((x: any) => x.id === 'q-g3-env-u5-007');
console.log(JSON.stringify(q, null, 2));
