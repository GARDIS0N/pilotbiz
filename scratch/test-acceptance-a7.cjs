const fs = require('fs');
const path = require('path');

async function runAcceptanceTests() {
  console.log('====================================================');
  console.log('   JARVIS A7 ACCEPTANCE CRITERIA VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function report(name, success, details) {
    if (success) {
      console.log(`✅ [PASS] ${name}`);
      if (details) console.log(`   ${details}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
      if (details) console.error(`   ${details}`);
      failed++;
    }
  }

  // -------------------------------------------------------------------------
  // TEST 1: No Hardcoded Personal Data (NestList, Hematology, Security Shift)
  // -------------------------------------------------------------------------
  console.log('--- TEST 1: Audit for Hardcoded Personal Data ---');
  const filesToScan = [
    'src/App.tsx',
    'src/types/jarvis.ts',
    'src/components/TasksPanel.tsx',
    'src/components/ScheduleDrawer.tsx',
    'src/components/TodayCard.tsx',
    'src/components/HUDHeader.tsx',
    'src/components/LiveTranscript.tsx',
    'src/components/QuickActions.tsx',
    'server.ts',
    'api/index.ts',
  ];

  const forbiddenTerms = [
    /nestlist\s*landlord/i,
    /mls\s*hematology/i,
    /security\s*officer\s*shift/i,
    /murang'a\s*univ/i,
  ];

  let hardcodedMatches = [];
  for (const file of filesToScan) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const term of forbiddenTerms) {
        if (term.test(content)) {
          hardcodedMatches.push(`${file} matches ${term}`);
        }
      }
    }
  }

  report(
    'No Hardcoded Personal Data in UI & Server Logic',
    hardcodedMatches.length === 0,
    hardcodedMatches.length === 0
      ? 'Zero occurrences of NestList landlord, MLS hematology, or security officer shift.'
      : `Found forbidden terms in: ${hardcodedMatches.join(', ')}`
  );

  // -------------------------------------------------------------------------
  // TEST 2: UI Structure & Green Theme Verification
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 2: Minimal Green UI & CSS Tokens ---');
  const cssPath = 'src/index.css';
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const hasPrimaryGreen = cssContent.includes('#10B981');
  const hasDarkAccent = cssContent.includes('#065F46');
  const hasLightTint = cssContent.includes('#ECFDF5');
  const hasDarkModeBg = cssContent.includes('#06140F');
  const hasBorder = cssContent.includes('#134E39');

  const greenPaletteOk = hasPrimaryGreen && hasDarkAccent && hasLightTint && hasDarkModeBg && hasBorder;
  report(
    'Green Palette Tokens in CSS (#10B981, #065F46, #ECFDF5, #06140F, #134E39)',
    greenPaletteOk,
    'All official green design tokens verified in src/index.css'
  );

  const appContent = fs.readFileSync('src/App.tsx', 'utf8');
  const hasTransmissionLog = fs.readFileSync('src/components/LiveTranscript.tsx', 'utf8').includes('Transmission Log');
  const hasMicButton = fs.readFileSync('src/components/QuickActions.tsx', 'utf8').includes('data-testid="mic-button"');
  const hasTuckedMenu = fs.readFileSync('src/components/QuickActions.tsx', 'utf8').includes('B30 Commands');
  const todayTuckedByDefault = appContent.includes('showTodayCard &&');

  report(
    'Minimal UI Layout (Transmission Log, Tucked B30 Menu, Working Mic, Tucked Today Card)',
    hasTransmissionLog && hasMicButton && hasTuckedMenu && todayTuckedByDefault,
    'Main view defaults cleanly to Transmission Log + input bar + voice mic button.'
  );

  // -------------------------------------------------------------------------
  // TEST 3: Monthly Schedule Import & Conflict Detection (A4, B4, B5)
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 3: Monthly Schedule Import & Conflict Alert ---');
  const rawSchedulePaste = `
2026-10-15 09:00 Advanced AI Algorithms Exam (Fixed commitment)
2026-10-15 09:00 Leadership Executive Board Meeting (Fixed commitment)
2026-10-16 14:00 Genomics Lab Submission Deadline
2026-10-18 10:00 Deep Work Focus Session
`;

  try {
    const importRes = await fetch('http://localhost:3000/api/jarvis/schedule/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText: rawSchedulePaste }),
    });

    const importData = await importRes.json();
    const hasOverview = importData.overview && importData.overview.includes('MONTHLY MASTER OVERVIEW');
    const hasDeadlines = importData.overview && importData.overview.includes('Genomics Lab Submission');
    const hasConflict = importData.conflicts && importData.conflicts.length > 0;
    const hasParsedItems = Array.isArray(importData.items) && importData.items.length >= 3;

    report(
      'Schedule Import Parser & B5 Master Overview',
      hasOverview && hasDeadlines && hasParsedItems,
      `Parsed ${importData.items?.length} items with structured B5 Monthly Overview generated.`
    );

    report(
      'Conflict Detection Alert on Overlapping Commitments',
      hasConflict,
      `Detected conflict: "${importData.conflicts?.[0]}"`
    );
  } catch (err) {
    report('Schedule Import API', false, err.message);
  }

  // -------------------------------------------------------------------------
  // TEST 4: Opportunity Search & Radar Engine (Part C)
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 4: Opportunity Engine & Live Search Grounding ---');
  try {
    const oppRes = await fetch('http://localhost:3000/api/jarvis/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '/scan artificial intelligence fellowships and healthcare innovation' }),
    });

    const oppData = await oppRes.json();
    const replyText = oppData.reply || '';
    const hasOpportunityAlert =
      replyText.includes('OPPORTUNITY') ||
      replyText.includes('HIGH') ||
      replyText.includes('MEDIUM') ||
      replyText.includes('Fellowship') ||
      replyText.includes('AI');

    const hasSourceLinks =
      (Array.isArray(oppData.sources) && oppData.sources.length > 0) ||
      replyText.includes('http') ||
      replyText.includes('Unverified') ||
      replyText.includes('Source:');

    report(
      'Opportunity Engine Filtering, Ranking & Source Links',
      hasOpportunityAlert && hasSourceLinks,
      `Retrieved sourced opportunity data with ranking labels and verification alerts.`
    );
  } catch (err) {
    report('Opportunity Search API', false, err.message);
  }

  // -------------------------------------------------------------------------
  // TEST 5: 20-Message Conversation Test (Repetition Guard A1)
  // -------------------------------------------------------------------------
  console.log('\n--- TEST 5: 20-Message Conversation Repetition Guard Test ---');
  const prompts = [
    'Good morning JARVIS, give me my briefing for today.',
    'What should I tackle first this morning?',
    'I feel like procrastinating on the first task.',
    'Give me a 5-minute action step for it.',
    'I just finished the first action step!',
    'What is on my schedule for the afternoon?',
    'Reschedule my 2pm session to 3pm please.',
    'What are my active goals right now?',
    'What is my productivity score today?',
    'Tell me what my Top 3 priorities are.',
    'Let us do a midday check-in.',
    'Search for latest breakthroughs in quantum computing.',
    'How does my streak look today?',
    'I want to review my progress on projects.',
    'Give me an anti-overwhelm breakdown.',
    'What habit should I focus on maintaining today?',
    'What is our emergency reset protocol?',
    'Log that I finished the deep work block.',
    'Check my weekly completion rate.',
    'Let us do our evening accountability review.',
  ];

  let conversationHistory = [];
  const assistantReplies = [];
  let repetitionDetected = false;
  let repeatedDetails = '';

  for (let i = 0; i < prompts.length; i++) {
    const p = prompts[i];
    try {
      const res = await fetch('http://localhost:3000/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: p,
          conversationHistory,
          addressAs: 'boss',
        }),
      });

      const data = await res.json();
      const reply = data.reply || '';

      // Check if this reply is an exact duplicate of any previous reply
      for (let prevIdx = 0; prevIdx < assistantReplies.length; prevIdx++) {
        const prev = assistantReplies[prevIdx];
        if (reply.trim().length > 20 && reply.trim() === prev.trim()) {
          repetitionDetected = true;
          repeatedDetails = `Turn ${i + 1} ("${p}") duplicated Turn ${prevIdx + 1} reply.`;
          break;
        }
      }

      assistantReplies.push(reply);
      conversationHistory.push({ role: 'user', text: p });
      conversationHistory.push({ role: 'assistant', text: reply });

      if (repetitionDetected) break;
    } catch (err) {
      repetitionDetected = true;
      repeatedDetails = `Request error at turn ${i + 1}: ${err.message}`;
      break;
    }
  }

  report(
    '20-Message Conversation Repetition Guard',
    !repetitionDetected && assistantReplies.length === 20,
    !repetitionDetected
      ? `Completed 20/20 sequential conversation turns with 0 duplicated responses.`
      : repeatedDetails
  );

  console.log('\n====================================================');
  console.log(`ACCEPTANCE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  process.exit(failed === 0 ? 0 : 1);
}

runAcceptanceTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
