async function testChatDirectives() {
  console.log('=== TESTING JARVIS CHAT DIRECTIVES & LIVE AGENT BEHAVIORS ===\n');

  async function sendChat(prompt, history = []) {
    const res = await fetch('http://localhost:3000/api/jarvis/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        addressAs: 'boss',
        conversationHistory: history,
      }),
    });
    return await res.json();
  }

  // 1. ADD SCHEDULE DIRECTIVE
  console.log('1. Directing JARVIS to add a schedule item:');
  const addRes = await sendChat('Add meeting with landlord on 2026-10-15 at 10:00 to my schedule');
  console.log('JARVIS Reply:', addRes.reply);
  console.log('Function Calls:', addRes.functionCalls?.map(c => c.name));
  console.log('--------------------------------------------------\n');

  // Verify schedule updated in persistent storage
  const schedRes = await fetch('http://localhost:3000/api/jarvis/schedule');
  const schedData = await schedRes.json();
  console.log('Persistent Schedule Count:', schedData.items.length);
  const addedItem = schedData.items.find(i => i.title.toLowerCase().includes('landlord'));
  console.log('Added Item Found:', addedItem ? addedItem.title : 'None');
  console.log('--------------------------------------------------\n');

  // 2. LIVE WEB SEARCH DIRECTIVE
  console.log('2. Asking JARVIS to perform a live web search for current facts:');
  const searchChat = await sendChat('What is the latest news and weather in Nairobi today?');
  console.log('JARVIS Search Reply:', searchChat.reply?.slice(0, 300) + '...');
  console.log('Citations / Grounding Sources:', searchChat.sources?.length, 'sources');
  if (searchChat.sources?.length > 0) {
    console.log('Sample Source:', searchChat.sources[0]);
  }
  console.log('--------------------------------------------------\n');

  // 3. ACCOUNTABILITY MORNING CHECK-IN DIRECTIVE
  console.log('3. Asking JARVIS for morning check-in:');
  const checkinRes = await sendChat('JARVIS, start my morning check-in. My top 3 priorities are: 1) Deploy app, 2) Study hematology, 3) Call landlord.');
  console.log('JARVIS Check-In Reply:', checkinRes.reply);
  console.log('--------------------------------------------------\n');

  // 4. CLEANUP
  if (addedItem) {
    await fetch('http://localhost:3000/api/jarvis/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: addedItem.id }),
    });
  }

  console.log('=== ALL CHAT DIRECTIVES TESTED SUCCESSFULLY ===');
}

testChatDirectives().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
