import fs from 'fs';
import path from 'path';

const CURRICULUM_DIR = path.join(process.cwd(), 'src', 'data', 'curriculum');

function scanDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.json')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = scanDir(CURRICULUM_DIR);
console.log(`Found ${files.length} curriculum files.`);

let totalCurriculumQuestions = 0;
let positionDist: Record<string, number> = {
  'Position 0 (Option A)': 0,
  'Position 1 (Option B)': 0,
  'Position 2 (Option C)': 0,
  'Position 3 (Option D)': 0,
  'Other/Unmatched': 0
};

// Also check cbeFallback.ts
const fallbackPath = path.join(process.cwd(), 'src', 'data', 'cbeFallback.ts');
if (fs.existsSync(fallbackPath)) {
  files.push(fallbackPath);
}

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Check how many questions or correctOptionId occurrences
  const matches = content.match(/correctOptionId\s*:\s*['"]([^'"]+)['"]/g);
  if (matches) {
    for (const m of matches) {
      totalCurriculumQuestions++;
      if (m.includes("'opt-1'") || m.includes('"opt-1"')) positionDist['Position 0 (Option A)']++;
      else if (m.includes("'opt-2'") || m.includes('"opt-2"')) positionDist['Position 1 (Option B)']++;
      else if (m.includes("'opt-3'") || m.includes('"opt-3"')) positionDist['Position 2 (Option C)']++;
      else if (m.includes("'opt-4'") || m.includes('"opt-4"')) positionDist['Position 3 (Option D)']++;
      else positionDist['Other/Unmatched']++;
    }
  }
}

console.log(`Curriculum files correctOptionId occurrences: ${totalCurriculumQuestions}`);
console.log(positionDist);
