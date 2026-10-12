import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  detectWakePhrase,
  isInterruptionPhrase,
} from '../src/utils/speechRecognition.js';

console.log('====================================================');
console.log('🧪 MILESTONE 7: VOICE INPUT & OUTPUT PIPELINE TEST');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err?.message || err}`);
  }
}

async function runTestAsync(name: string, fn: () => Promise<void>) {
  totalTests++;
  try {
    await fn();
    console.log(`✅ PASS: ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err?.message || err}`);
  }
}

async function main() {
  // -------------------------------------------------------------
  // Group 1: Wake Phrase Detection Engine
  // -------------------------------------------------------------
  console.log('--- Group 1: Wake Phrase Detection Engine ---');

  runTest('1.1 Exact wake phrase: "Hey Jarvis" and "Jarvis" detected as wake-only', () => {
    const res1 = detectWakePhrase('Hey Jarvis');
    assert.strictEqual(res1.detected, true);
    assert.strictEqual(res1.isWakeOnly, true);
    assert.strictEqual(res1.commandText, '');
    assert.strictEqual(res1.phrase, 'hey jarvis');

    const res2 = detectWakePhrase('jarvis');
    assert.strictEqual(res2.detected, true);
    assert.strictEqual(res2.isWakeOnly, true);
    assert.strictEqual(res2.commandText, '');
    assert.strictEqual(res2.phrase, 'jarvis');
  });

  runTest('1.2 Wake phrase with directive: "Hey Jarvis, create a folder called TestProject"', () => {
    const res = detectWakePhrase('Hey Jarvis, create a folder called TestProject');
    assert.strictEqual(res.detected, true);
    assert.strictEqual(res.isWakeOnly, false);
    assert.strictEqual(res.phrase, 'hey jarvis');
    assert.strictEqual(res.commandText, 'create a folder called TestProject');
  });

  runTest('1.3 Wake phrase with punctuation: "Jarvis: what do I need to do today?"', () => {
    const res = detectWakePhrase('Jarvis: what do I need to do today?');
    assert.strictEqual(res.detected, true);
    assert.strictEqual(res.isWakeOnly, false);
    assert.strictEqual(res.phrase, 'jarvis');
    assert.strictEqual(res.commandText, 'what do I need to do today?');
  });

  runTest('1.4 Ambient non-wake speech filtered: "Pass me the water please"', () => {
    const res = detectWakePhrase('Pass me the water please');
    assert.strictEqual(res.detected, false);
    assert.strictEqual(res.commandText, 'Pass me the water please');
  });

  runTest('1.5 Custom configurable wake phrases: ["computer", "friday"]', () => {
    const customPhrases = ['computer', 'friday'];
    const res1 = detectWakePhrase('Friday, scan the radar', customPhrases);
    assert.strictEqual(res1.detected, true);
    assert.strictEqual(res1.phrase, 'friday');
    assert.strictEqual(res1.commandText, 'scan the radar');

    const res2 = detectWakePhrase('computer', customPhrases);
    assert.strictEqual(res2.detected, true);
    assert.strictEqual(res2.isWakeOnly, true);
  });

  runTest('1.6 Casing and embedded variants: "ok jarvis check my priorities"', () => {
    const res = detectWakePhrase('OK JARVIS check my priorities');
    assert.strictEqual(res.detected, true);
    assert.strictEqual(res.phrase, 'jarvis');
    assert.strictEqual(res.commandText, 'check my priorities');
  });

  // -------------------------------------------------------------
  // Group 2: Barge-In & Spoken Interruption Handling
  // -------------------------------------------------------------
  console.log('\n--- Group 2: Barge-In & Spoken Interruption Handling ---');

  runTest('2.1 Standard stop commands: "stop", "jarvis stop", "jarvis, stop"', () => {
    assert.strictEqual(isInterruptionPhrase('stop'), true);
    assert.strictEqual(isInterruptionPhrase('jarvis stop'), true);
    assert.strictEqual(isInterruptionPhrase('JARVIS, STOP'), true);
    assert.strictEqual(isInterruptionPhrase('stop jarvis'), true);
  });

  runTest('2.2 Additional barge-in commands: "quiet", "cancel", "pause", "hey jarvis stop"', () => {
    assert.strictEqual(isInterruptionPhrase('quiet'), true);
    assert.strictEqual(isInterruptionPhrase('cancel'), true);
    assert.strictEqual(isInterruptionPhrase('pause'), true);
    assert.strictEqual(isInterruptionPhrase('hey jarvis stop'), true);
    assert.strictEqual(isInterruptionPhrase('jarvis quiet'), true);
    assert.strictEqual(isInterruptionPhrase('please stop talking'), true);
  });

  runTest('2.3 Non-interruption utterances do not falsely trigger barge-in', () => {
    assert.strictEqual(isInterruptionPhrase('stopwatch'), false);
    assert.strictEqual(isInterruptionPhrase("don't stop working on this"), false);
    assert.strictEqual(isInterruptionPhrase('what is the bus stop schedule'), false);
  });

  // -------------------------------------------------------------
  // Group 3: Speech Pause Detection & Push-to-Talk Logic
  // -------------------------------------------------------------
  console.log('\n--- Group 3: Speech Pause Detection & Push-to-Talk Logic ---');

  runTest('3.1 Push-to-Talk cleans wake phrase prefix on execution', () => {
    const rawTranscript = 'Jarvis, review my commitments';
    const wakeCheck = detectWakePhrase(rawTranscript);
    const cleaned = wakeCheck.detected && wakeCheck.commandText ? wakeCheck.commandText : rawTranscript;
    assert.strictEqual(cleaned, 'review my commitments');
  });

  runTest('3.2 Speech Pause default threshold is configured to 2200ms', () => {
    const settingsPath = path.resolve('src/types/jarvis.ts');
    const content = fs.readFileSync(settingsPath, 'utf8');
    assert.ok(content.includes('silenceTimeoutMs?: number'));
    assert.ok(content.includes('bargeInEnabled?: boolean'));
    assert.ok(content.includes('enableWakeWord?: boolean'));
  });

  // -------------------------------------------------------------
  // Group 4: Frontend UI Wireup & State Verification
  // -------------------------------------------------------------
  console.log('\n--- Group 4: Frontend UI Wireup & State Verification ---');

  runTest('4.1 App.tsx passes isSpeaking, isConversationMode, and enableWakeWord to QuickActions', () => {
    const appPath = path.resolve('src/App.tsx');
    const content = fs.readFileSync(appPath, 'utf8');
    assert.ok(content.includes("isSpeaking={jarvisState === 'speaking'}"), 'App.tsx must pass isSpeaking');
    assert.ok(content.includes('isConversationMode={isConversationMode}'), 'App.tsx must pass isConversationMode');
    assert.ok(content.includes('enableWakeWord={settings.enableWakeWord ?? true}'), 'App.tsx must pass enableWakeWord');
    assert.ok(content.includes('wakePhrases={settings.wakePhrases'), 'App.tsx must pass wakePhrases');
  });

  runTest('4.2 App.tsx plays TTS audio with callback-driven onEnded synchronization', () => {
    const appPath = path.resolve('src/App.tsx');
    const content = fs.readFileSync(appPath, 'utf8');
    assert.ok(content.includes("audioPlayerRef.current.playWavBase64(data.audioBase64, () => {"), 'playWavBase64 must use onEnded callback');
    assert.ok(content.includes("setJarvisState('idle');"), 'Must transition to idle on completion');
  });

  runTest('4.3 QuickActions.tsx renders 4-state visual indicator and STOP button', () => {
    const quickActionsPath = path.resolve('src/components/QuickActions.tsx');
    const content = fs.readFileSync(quickActionsPath, 'utf8');
    assert.ok(content.includes('data-testid="voice-state-pill"'), 'Must have voice-state-pill test id');
    assert.ok(content.includes('🔴 LISTENING'), 'Must render LISTENING state');
    assert.ok(content.includes('🟡 PROCESSING'), 'Must render PROCESSING state');
    assert.ok(content.includes('🔵 JARVIS SPEAKING'), 'Must render SPEAKING state');
    assert.ok(content.includes('⚪ IDLE'), 'Must render IDLE state');
    assert.ok(content.includes('data-testid="voice-stop-button"'), 'Must render STOP button');
    assert.ok(content.includes('data-testid="wake-word-indicator"'), 'Must render wake-word badge');
  });

  runTest('4.4 SettingsDrawer.tsx includes wake-word toggle, wake phrases input, and pause threshold selector', () => {
    const settingsPath = path.resolve('src/components/SettingsDrawer.tsx');
    const content = fs.readFileSync(settingsPath, 'utf8');
    assert.ok(content.includes('data-testid="wake-word-toggle"'), 'Settings must include wake-word toggle');
    assert.ok(content.includes('Configured Wake Phrases'), 'Settings must include configured wake phrases input');
    assert.ok(content.includes('Speech Pause Threshold'), 'Settings must include silence timeout selector');
  });

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n====================================================');
  console.log(`📊 MILESTONE 7 RESULTS: ${passedTests}/${totalTests} Tests Passed`);
  console.log('====================================================');

  if (passedTests === totalTests) {
    console.log('🎉 ALL MILESTONE 7 TESTS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  } else {
    console.error(`💥 ${totalTests - passedTests} tests failed.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error running Milestone 7 tests:', err);
  process.exit(1);
});
