import fs from 'fs';

async function runTests() {
  console.log('=== STARTING JARVIS FEATURE TESTS ===\n');
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
      failCount++;
    }
  }

  // 1. TEST SCHEDULE PERSISTENCE: ADD, LIST, RESCHEDULE, COMPLETE, DELETE
  console.log('\n--- 1. Testing Monthly Schedule Persistence ---');
  const todayStr = new Date().toISOString().split('T')[0];

  // 1a. Add Item
  const addRes = await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'add',
      item: {
        id: 'test-item-1',
        title: 'Master Advanced Biochemistry Chapter 5',
        date: todayStr,
        time: '10:00',
        category: 'study',
      },
    }),
  });
  const addData = await addRes.json();
  assert(addData.success && addData.item.title.includes('Biochemistry'), 'Add schedule item returns success');

  // Verify file write on disk
  const schedJson = JSON.parse(fs.readFileSync('data/schedule.json', 'utf8'));
  assert(schedJson.items.some(i => i.id === 'test-item-1'), 'Schedule item persisted to data/schedule.json');

  // 1b. Batch upload monthly schedule
  const batchRes = await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'batch_upload',
      items: [
        { id: 'batch-1', title: 'Monthly Strategy Review', date: todayStr, time: '14:00', category: 'work', slipCount: 0 },
        { id: 'batch-2', title: 'Gym Leg Day', date: todayStr, time: '18:00', category: 'health', slipCount: 0 },
      ],
    }),
  });
  const batchData = await batchRes.json();
  assert(batchData.success && batchData.count === 2, 'Batch upload monthly schedule items succeeded');

  // 1c. Reschedule item 3 times to test slip count alert
  for (let s = 1; s <= 3; s++) {
    await fetch('http://localhost:3000/api/jarvis/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reschedule',
        id: 'test-item-1',
        newDate: todayStr,
        newTime: `1${s}:00`,
      }),
    });
  }
  const schedAfterSlip = JSON.parse(fs.readFileSync('data/schedule.json', 'utf8'));
  const slippedItem = schedAfterSlip.items.find(i => i.id === 'test-item-1');
  assert(slippedItem && slippedItem.slipCount >= 3, `Slip count incremented to >= 3 (actual: ${slippedItem?.slipCount})`);

  // 1d. Complete item
  await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'complete', id: 'test-item-1' }),
  });
  const schedAfterComplete = JSON.parse(fs.readFileSync('data/schedule.json', 'utf8'));
  const completedItem = schedAfterComplete.items.find(i => i.id === 'test-item-1');
  assert(completedItem && completedItem.completed === true, 'Mark schedule item complete persisted to file');

  // 1e. Delete test items
  await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id: 'batch-1' }),
  });
  await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id: 'batch-2' }),
  });
  const schedAfterDelete = JSON.parse(fs.readFileSync('data/schedule.json', 'utf8'));
  assert(!schedAfterDelete.items.some(i => i.id === 'batch-1'), 'Deleted item removed from persistent storage');

  // 2. TEST ACCOUNTABILITY DATA & BRIEFING GUARD
  console.log('\n--- 2. Testing Accountability & Daily Briefing Guard ---');
  const accRes = await fetch('http://localhost:3000/api/jarvis/accountability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      streak: 7,
      lastStreakDate: todayStr,
      lastBriefedDate: todayStr,
      checkIns: { morning: '08:30', midday: '13:00', evening: '20:00' },
      weeklyStats: { completed: 8, total: 10, rate: 80 },
    }),
  });
  const accData = await accRes.json();
  assert(accData.success && accData.data.streak === 7, 'Accountability data updated and persisted');
  assert(accData.data.lastBriefedDate === todayStr, 'lastBriefedDate recorded properly for briefing guard');

  // 3. TEST LIVE INTERNET SEARCH
  console.log('\n--- 3. Testing Live Internet Search Grounding ---');
  const searchRes = await fetch('http://localhost:3000/api/jarvis/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'current weather in Nairobi' }),
  });
  const searchData = await searchRes.json();
  assert(searchData && (searchData.text || searchData.sources), 'Search endpoint executed and returned response');
  assert(Array.isArray(searchData.sources), 'Search sources returned as array of citations');

  // 4. TEST CHAT WITH REPETITION GUARD & TOOL CALLS
  console.log('\n--- 4. Testing Chat Endpoint & Repetition Guard ---');
  const chatRes = await fetch('http://localhost:3000/api/jarvis/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'What is on my schedule today?',
      addressAs: 'boss',
      conversationHistory: [
        { role: 'user', text: 'Hello JARVIS' },
        { role: 'assistant', text: 'Good day, boss.' },
      ],
    }),
  });
  const chatData = await chatRes.json();
  assert(chatData && chatData.reply, 'Chat endpoint returned assistant response');
  assert(!chatData.reply.includes('security officer shift'), 'Repetition guard: No unprompted security shift recited');

  // Clean up test item
  await fetch('http://localhost:3000/api/jarvis/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id: 'test-item-1' }),
  });

  console.log(`\n=== TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) process.exit(1);
}

runTests().catch(e => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
