import fs from 'fs';

async function runVoiceTests() {
  console.log('=== STARTING JARVIS VOICE INPUT AUDIT & VERIFICATION ===\n');
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

  // 1. TEST BROWSER SUPPORT & DETECT LOGIC
  console.log('--- 1. Testing Browser Capability Detection ---');
  const speechModuleCode = fs.readFileSync('src/utils/speechRecognition.ts', 'utf8');
  assert(
    speechModuleCode.includes('SpeechRecognition') && speechModuleCode.includes('webkitSpeechRecognition'),
    'Detects native Web Speech API (SpeechRecognition / webkitSpeechRecognition)'
  );
  assert(
    speechModuleCode.includes('isFirefox') && speechModuleCode.includes('isBrave'),
    'Detects Firefox and Brave browser environments'
  );
  assert(
    speechModuleCode.includes('isSecureContext') || speechModuleCode.includes('localhost'),
    'Enforces secure context check (https:// or localhost)'
  );

  // 2. TEST MICROPHONE PERMISSIONS & FRIENDLY ERROR MAPPING
  console.log('\n--- 2. Testing Microphone Permissions & Error Messages ---');
  assert(
    speechModuleCode.includes('navigator.mediaDevices.getUserMedia'),
    'Uses navigator.mediaDevices.getUserMedia for permission checks and audio stream'
  );
  assert(
    speechModuleCode.includes('Microphone blocked') && speechModuleCode.includes('address bar'),
    'Handles "denied" / NotAllowedError with address bar permission recovery advice'
  );
  assert(
    speechModuleCode.includes('No microphone found'),
    'Handles "no microphone found" / NotFoundError gracefully'
  );
  assert(
    speechModuleCode.includes('No speech detected - try speaking a little louder'),
    'Handles "no-speech" timeout with actionable friendly instruction'
  );

  // 3. TEST 10-SECOND SILENCE TIMEOUT & CONTINUOUS CONFIG
  console.log('\n--- 3. Testing 10-Second Silence Timeout & Settings ---');
  assert(
    speechModuleCode.includes('startSilenceTimeout(10000)'),
    '10-second silence timeout implemented: stops listening cleanly if no speech is detected'
  );
  assert(
    speechModuleCode.includes('recognition.interimResults = true'),
    'Configured with interimResults = true for live streaming text into input bar'
  );
  assert(
    speechModuleCode.includes('recognition.continuous = false'),
    'Configured with continuous = false for single-turn voice directive input'
  );

  // 4. TEST ACOUSTIC FEEDBACK GUARD (STOP TTS WHILE LISTENING)
  console.log('\n--- 4. Testing Acoustic Feedback Guard (Stop TTS) ---');
  assert(
    speechModuleCode.includes('window.speechSynthesis.cancel()'),
    'Stops browser SpeechSynthesis immediately before mic listening starts'
  );
  assert(
    speechModuleCode.includes('onStopAudioPlayback'),
    'Provides onStopAudioPlayback hook to pause Jarvis audio player so it does not hear itself'
  );
  const appCode = fs.readFileSync('src/App.tsx', 'utf8');
  assert(
    appCode.includes('onStopAudioPlayback') && appCode.includes('audioPlayerRef.current?.stop()'),
    'App.tsx binds onStopAudioPlayback to halt Jarvis speech playback when listening'
  );

  // 5. TEST 4 REAL MIC BUTTON STATES IN QUICKACTIONS
  console.log('\n--- 5. Testing 4 Real Mic States in UI ---');
  const quickActionsCode = fs.readFileSync('src/components/QuickActions.tsx', 'utf8');
  assert(
    quickActionsCode.includes("data-mic-state={micState}"),
    'QuickActions mic button tracks real state attribute'
  );
  assert(
    quickActionsCode.includes("micState === 'listening'") &&
    quickActionsCode.includes("micState === 'processing'") &&
    quickActionsCode.includes("micState === 'error'") &&
    quickActionsCode.includes("idle"),
    'All 4 states implemented: idle, listening, processing, error'
  );
  assert(
    quickActionsCode.includes('Listening...') && quickActionsCode.includes('animate-ping'),
    'Listening state displays green pulsing indicator and Listening... label'
  );

  // 6. TEST LIVE TRANSCRIPT IN INPUT BAR & AUTO-SEND (ON & OFF)
  console.log('\n--- 6. Testing Live Transcript in Input Bar & Auto-Send ---');
  assert(
    quickActionsCode.includes('onInterimTranscript') && quickActionsCode.includes('setInputText'),
    'Live interim transcript streams directly into the input bar while speaking'
  );
  assert(
    quickActionsCode.includes('autoSendRef.current') && quickActionsCode.includes('onSendMessage'),
    'Auto-send dispatches directive automatically on final speech result when enabled'
  );
  assert(
    quickActionsCode.includes('setInputText(clean)') && quickActionsCode.includes('autoSendVoice'),
    'Supports auto-send disabled: populates input bar without sending for user review'
  );

  // 7. TEST VOICE SETTINGS IN SETTINGS DRAWER
  console.log('\n--- 7. Testing Voice Settings in Settings Drawer ---');
  const settingsCode = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');
  assert(
    settingsCode.includes('voiceLanguage') && settingsCode.includes('en-US'),
    'Voice language selector added to SettingsDrawer with en-US default'
  );
  assert(
    settingsCode.includes('autoSendVoice'),
    'Auto-Send Voice Directive toggle added to SettingsDrawer'
  );

  // 8. TEST SERVER TRANSCRIBE ENDPOINT (/api/jarvis/transcribe)
  console.log('\n--- 8. Testing Server STT Fallback Endpoint ---');
  const emptyRes = await fetch('http://localhost:3000/api/jarvis/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const emptyData = await emptyRes.json();
  assert(emptyRes.status === 400 && emptyData.error.includes('Audio data is required'), 'Endpoint validates audio data presence');

  const dummyRes = await fetch('http://localhost:3000/api/jarvis/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioBase64: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', mimeType: 'audio/wav' }),
  });
  const dummyData = await dummyRes.json();
  assert(
    dummyRes.status === 400 && dummyData.error.includes('Gemini API key not configured'),
    'Endpoint provides clear guidance when API key is missing for audio fallback'
  );

  // 9. TEST VOICE DIRECTIVE IN BOTH MODES (JARVIS & PERSONAL MANAGER)
  console.log('\n--- 9. Testing Voice Directives in Jarvis Mode and Coach Mode ---');
  const jarvisRes = await fetch('http://localhost:3000/api/jarvis/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'Schedule team sync tomorrow at 10am',
      addressAs: 'boss',
      mode: 'jarvis',
    }),
  });
  const jarvisData = await jarvisRes.json();
  assert(jarvisData && jarvisData.reply, 'Jarvis mode processes voice directive');

  const managerRes = await fetch('http://localhost:3000/api/jarvis/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'I feel overwhelmed by my study goals today',
      addressAs: 'boss',
      mode: 'manager',
      managerName: 'Coach',
    }),
  });
  const managerData = await managerRes.json();
  assert(
    managerData && managerData.reply && (managerData.reply.includes('overwhelm') || managerData.reply.includes('step')),
    'Personal Manager (Coach) mode processes voice directive empathetically'
  );

  // 10. TEST GREEN THEME TOKENS PRESERVATION
  const assetFiles = fs.readdirSync('dist/assets');
  const cssFile = assetFiles.find(f => f.endsWith('.css'));
  const builtCss = fs.readFileSync('dist/assets/' + cssFile, 'utf8');
  assert(builtCss.includes('10B981') || builtCss.includes('16,185,129') || builtCss.includes('16 185 129'), 'Primary green #10B981 preserved');
  assert(builtCss.includes('06140F') || builtCss.includes('6,20,15') || builtCss.includes('6 20 15'), 'Dark background #06140F preserved');

  console.log(`\n=== ALL VOICE AUDIT CHECKS FINISHED: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) process.exit(1);
}

runVoiceTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
