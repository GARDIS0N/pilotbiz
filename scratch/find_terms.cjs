const fs = require('fs');
const content = fs.readFileSync('src/components/TasksPanel.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (/hematology|murang|nestlist|security/i.test(line)) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
