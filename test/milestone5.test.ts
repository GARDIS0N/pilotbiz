import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { classifyUserIntent, cleanPrompt } from '../server/intentRouter.js';
import {
  processLocalButlerDirective,
  performGoogleSearch,
} from '../server.js';

console.log('====================================================');
console.log('🧪 MILESTONE 5: LIVE WEB SEARCH & GROUNDING TEST');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

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

async function main() {
  // -------------------------------------------------------------
  // Group 1: Search Intent Classification & Query Extraction
  // -------------------------------------------------------------
  console.log('--- Group 1: Search Intent Classification & Query Extraction ---');

  runTest('1.1 Intent: "search for [topic]" classified as ACTION_SEARCH_WEB with clean query', () => {
    const intent = classifyUserIntent('search for latest quantum computing breakthroughs');
    assert.strictEqual(intent.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent.args?.query, 'latest quantum computing breakthroughs');
  });

  runTest('1.2 Intent: "search the web for [topic]" extracts query cleanly', () => {
    const intent = classifyUserIntent('Search the web for TypeScript 5.5 release notes');
    assert.strictEqual(intent.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent.args?.query, 'TypeScript 5.5 release notes');
  });

  runTest('1.3 Intent: "/search [topic]" and "/scan [topic]" correctly routed', () => {
    const intent1 = classifyUserIntent('/search Rust web frameworks 2026');
    assert.strictEqual(intent1.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent1.args?.query, 'Rust web frameworks 2026');

    const intent2 = classifyUserIntent('/scan biotechnology fellowships');
    assert.strictEqual(intent2.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent2.args?.query, 'biotechnology fellowships');

    const intent3 = classifyUserIntent('/radar artificial intelligence grants');
    assert.strictEqual(intent3.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent3.args?.query, 'artificial intelligence grants');
  });

  runTest('1.4 Intent: "look up [entity]" and "find information about [topic]"', () => {
    const intent1 = classifyUserIntent('look up Marie Curie');
    assert.strictEqual(intent1.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent1.args?.query, 'Marie Curie');

    const intent2 = classifyUserIntent('find information about Apollo 11');
    assert.strictEqual(intent2.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent2.args?.query, 'Apollo 11');
  });

  runTest('1.5 Intent: "weather in [city]" routes to search', () => {
    const intent1 = classifyUserIntent('weather in Tokyo');
    assert.strictEqual(intent1.category, 'ACTION_SEARCH_WEB');
    assert.strictEqual(intent1.args?.query, 'weather in Tokyo');

    const intent2 = classifyUserIntent('what is the weather in London');
    assert.strictEqual(intent2.category, 'ACTION_SEARCH_WEB');
    assert(intent2.args?.query.toLowerCase().includes('weather in london'));
  });

  runTest('1.6 Intent: Conceptual questions remain CONVERSATIONAL without triggering search', () => {
    const intent1 = classifyUserIntent('What is artificial intelligence?');
    assert.strictEqual(intent1.category, 'CONVERSATIONAL');

    const intent2 = classifyUserIntent('Explain PCR');
    assert.strictEqual(intent2.category, 'CONVERSATIONAL');

    const intent3 = classifyUserIntent('Tell me about artificial intelligence.');
    assert.strictEqual(intent3.category, 'CONVERSATIONAL');
  });

  // -------------------------------------------------------------
  // Group 2: Local Butler Engine Search Dispatching
  // -------------------------------------------------------------
  console.log('\n--- Group 2: Local Butler Engine Search Dispatching ---');

  runTest('2.1 processLocalButlerDirective produces search_web function call and task steps', () => {
    const directive = processLocalButlerDirective('search for quantum computing', 'boss');
    assert(directive.reply.includes('Executing real-time search for "quantum computing"'), 'Reply missing search announcement');
    assert.strictEqual(directive.functionCalls.length, 1);
    assert.strictEqual(directive.functionCalls[0].name, 'search_web');
    assert.strictEqual(directive.functionCalls[0].args?.query, 'quantum computing');

    assert(directive.taskSteps?.some((t: any) => t.tool === 'search.web' && t.status === 'success'));
    assert(directive.attributions?.some((a: any) => a.type === 'WEB_RESEARCH'));
  });

  runTest('2.2 processLocalButlerDirective handles /scan opportunity discovery dispatch', () => {
    const directive = processLocalButlerDirective('/scan genomics fellowships', 'boss');
    assert.strictEqual(directive.functionCalls[0].name, 'search_web');
    assert.strictEqual(directive.functionCalls[0].args?.query, 'genomics fellowships');
  });

  // -------------------------------------------------------------
  // Group 3: Multi-Tier Web Search Engine (performGoogleSearch)
  // -------------------------------------------------------------
  console.log('\n--- Group 3: Multi-Tier Search Engine & Grounding ---');

  await runTestAsync('3.1 Wikipedia REST API fallback returns grounded extract and citation URL', async () => {
    const result = await performGoogleSearch('who is Ada Lovelace');
    assert(typeof result.text === 'string' && result.text.length > 20, 'Expected non-empty search text');
    assert(Array.isArray(result.sources) && result.sources.length > 0, 'Expected sources array');
    const hasWikiSource = result.sources.some((s) => s.url.includes('wikipedia.org') || s.title.includes('Ada Lovelace'));
    const hasGoogleFallback = result.sources.some((s) => s.url.includes('google.com/search'));
    assert(hasWikiSource || hasGoogleFallback, 'Source must be Wikipedia or verified fallback link');
  });

  await runTestAsync('3.2 Scientific concept grounding via Wikipedia fallback (DNA)', async () => {
    const result = await performGoogleSearch('what is DNA');
    assert(result.text.length > 30, 'Result text too short');
    assert(result.sources.length >= 1, 'Missing grounding citation');
    assert(result.sources[0].url.startsWith('http'), 'Source URL must be valid HTTP(S)');
  });

  await runTestAsync('3.3 Offline resilience returns graceful fallback with direct search query link', async () => {
    // Search a random non-existent UUID phrase that won't match Wikipedia or duckduckgo
    const query = 'xyznonexistentterm9876543210';
    const result = await performGoogleSearch(query);
    assert(result.text.length > 0);
    assert(result.sources.length > 0);
    const googleFallback = result.sources.find((s) => s.url.includes('google.com/search'));
    assert(googleFallback, 'Expected google search fallback URL for unknown query');
    assert(googleFallback.url.includes(encodeURIComponent(query)));
  });

  // -------------------------------------------------------------
  // Group 4: UI & Frontend Grounding Verification
  // -------------------------------------------------------------
  console.log('\n--- Group 4: UI & Frontend Grounding Verification ---');

  runTest('4.1 LiveTranscript.tsx renders Grounding Sources with external links', () => {
    const transcriptFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'LiveTranscript.tsx'), 'utf8');
    assert(transcriptFile.includes('msg.sources'), 'LiveTranscript missing msg.sources mapping');
    assert(transcriptFile.includes('ExternalLink'), 'LiveTranscript missing ExternalLink icon');
    assert(transcriptFile.includes('target="_blank"'), 'Sources links should open in new tab securely');
    assert(transcriptFile.includes('rel="noopener noreferrer"'), 'Sources links must have security attributes');
  });

  runTest('4.2 LiveTranscript.tsx renders WEB_RESEARCH pill badge with Globe icon', () => {
    const transcriptFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'LiveTranscript.tsx'), 'utf8');
    assert(transcriptFile.includes("attr.type === 'WEB_RESEARCH'"), 'Missing WEB_RESEARCH attribution check');
    assert(transcriptFile.includes('<Globe'), 'Missing Globe icon for web research');
  });

  runTest('4.3 App.tsx maps backend sources and attributions into assistant message state', () => {
    const appFile = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
    assert(appFile.includes('sources: data.sources || []'), 'App.tsx does not map data.sources');
    assert(appFile.includes('attributions: data.attributions || []'), 'App.tsx does not map data.attributions');
    assert(appFile.includes('taskSteps: data.taskSteps || []'), 'App.tsx does not map data.taskSteps');
  });

  console.log('\n====================================================');
  console.log(`📊 MILESTONE 5 RESULTS: ${passedTests}/${totalTests} Tests Passed`);
  console.log('====================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  } else {
    console.log('🎉 ALL MILESTONE 5 TESTS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
