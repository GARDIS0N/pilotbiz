import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { classifyUserIntent } from '../server/intentRouter.js';
import {
  processLocalButlerDirective,
  analyzeDocumentLocal,
  analyzeDocumentText,
} from '../server.js';

console.log('====================================================');
console.log('🧪 MILESTONE 6: GOOGLE DRIVE & DOCUMENT ANALYSIS TEST');
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
  // Group 1: Google Drive & Document Analysis Intent Classification
  // -------------------------------------------------------------
  console.log('--- Group 1: Intent Classification (Drive & Analysis) ---');

  runTest('1.1 Intent: "search my Google Drive for [topic]" classified as ACTION_DRIVE', () => {
    const intent = classifyUserIntent('search my Google Drive for my latest transcript');
    assert.strictEqual(intent.category, 'ACTION_DRIVE');
    assert.strictEqual(intent.subType, 'search');
    assert.strictEqual(intent.args?.query, 'latest transcript');
  });

  runTest('1.2 Intent: "search google drive for quarterly roadmap" extracts query cleanly', () => {
    const intent = classifyUserIntent('search google drive for quarterly roadmap');
    assert.strictEqual(intent.category, 'ACTION_DRIVE');
    assert.strictEqual(intent.args?.query, 'quarterly roadmap');
  });

  runTest('1.3 Intent: "/drive search biology study guide" routes to ACTION_DRIVE', () => {
    const intent = classifyUserIntent('/drive search biology study guide');
    assert.strictEqual(intent.category, 'ACTION_DRIVE');
    assert.strictEqual(intent.args?.query, 'biology study guide');
  });

  runTest('1.4 Intent: "Jarvis, analyze this document" classified as ACTION_DOCUMENT_ANALYSIS', () => {
    const intent = classifyUserIntent('Jarvis, analyze this document');
    assert.strictEqual(intent.category, 'ACTION_DOCUMENT_ANALYSIS');
    assert.strictEqual(intent.subType, 'analyze');
  });

  runTest('1.5 Intent: "analyze this document: [text]" captures inline document text', () => {
    const docText = 'The quarterly revenue increased by 25%. Key objective is to launch the mobile app by November.';
    const intent = classifyUserIntent(`analyze this document: ${docText}`);
    assert.strictEqual(intent.category, 'ACTION_DOCUMENT_ANALYSIS');
    assert(intent.args?.targetDoc.includes('Key objective is to launch the mobile app by November'));
  });

  runTest('1.6 Drive queries do not collide with generic web search', () => {
    const driveIntent = classifyUserIntent('find my resume in google drive');
    assert.strictEqual(driveIntent.category, 'ACTION_DRIVE');

    const webIntent = classifyUserIntent('search the web for latest quantum computing breakthroughs');
    assert.strictEqual(webIntent.category, 'ACTION_SEARCH_WEB');
  });

  // -------------------------------------------------------------
  // Group 2: Document Analysis Engine (Local & Text Analyzer)
  // -------------------------------------------------------------
  console.log('\n--- Group 2: Document Analysis Engine ---');

  runTest('2.1 analyzeDocumentLocal produces structured summary, takeaways, and action items', () => {
    const testDoc = `
      Project Alpha Executive Briefing.
      The core objective of Project Alpha is to automate operational workflows across teams.
      Key result from Q2 was reducing invoice processing latency from 48 hours to 3 minutes.
      Critical obstacle identified: legacy CRM data synchronization requires rate limiting.
      We must complete the OAuth migration by Friday.
      Next step is scheduling a stakeholder review with the engineering leads.
    `;

    const analysis = analyzeDocumentLocal(testDoc, 'Project_Alpha_Brief.txt', 'boss');
    assert(analysis.summary && analysis.summary.length > 20, 'Summary missing or too short');
    assert(Array.isArray(analysis.takeaways) && analysis.takeaways.length > 0, 'Takeaways missing');
    assert(Array.isArray(analysis.actionItems) && analysis.actionItems.length > 0, 'Action items missing');
    assert(analysis.takeaways.some((t) => t.toLowerCase().includes('result') || t.toLowerCase().includes('objective')), 'Takeaways should detect key sentences');
    assert(analysis.actionItems.some((a) => a.toLowerCase().includes('must') || a.toLowerCase().includes('next step')), 'Action items should detect operational mandates');
  });

  await runTestAsync('2.2 analyzeDocumentText returns structured analysis with graceful fallback', async () => {
    const content = 'Meeting notes: The team decided to adopt Tailwind CSS. Deadline for frontend migration is October 30. Action item: update documentation.';
    const result = await analyzeDocumentText(content, 'meeting_notes.md', 'boss');
    assert(typeof result.summary === 'string' && result.summary.length > 10);
    assert(Array.isArray(result.takeaways) && result.takeaways.length > 0);
    assert(Array.isArray(result.actionItems) && result.actionItems.length > 0);
  });

  runTest('2.3 analyzeDocumentLocal handles empty document gracefully', () => {
    const emptyAnalysis = analyzeDocumentLocal('', 'Empty.txt', 'boss');
    assert(emptyAnalysis.summary.includes('contains no text content'));
  });

  // -------------------------------------------------------------
  // Group 3: Google Drive Context Injection into Butler Engine
  // -------------------------------------------------------------
  console.log('\n--- Group 3: Google Drive Context Injection ---');

  runTest('3.1 processLocalButlerDirective processes driveContext with source attribution', () => {
    const driveDoc = {
      fileName: 'latest_transcript.txt',
      content: 'Lecture on Molecular Genetics. Key concept: DNA replication involves DNA helicase and DNA polymerase. Students must submit laboratory reports by Wednesday at 5 PM.',
      mimeType: 'text/plain',
    };

    const directive = processLocalButlerDirective(
      'analyze this document',
      'boss',
      'jarvis',
      'Coach',
      false,
      [],
      driveDoc
    );

    assert(directive.reply.includes('[Google Drive: latest_transcript.txt] DOCUMENT ANALYSIS'), 'Reply missing Drive attribution banner');
    assert(directive.reply.includes('Key Takeaways'), 'Reply missing takeaways section');
    assert(directive.attributions?.some((a: any) => a.type === 'GOOGLE_DRIVE' && a.label.includes('latest_transcript.txt')), 'Missing GOOGLE_DRIVE attribution');
    assert.strictEqual(directive.functionCalls[0].name, 'analyze_document');
  });

  runTest('3.2 Unlinked Google Drive search prompts user for authorization', () => {
    const directive = processLocalButlerDirective('search my Google Drive for my latest transcript', 'boss');
    assert(directive.reply.includes('ensure your Google Drive is connected via the DRIVE button'), 'Reply should guide user to connect Drive');
    assert(directive.taskSteps?.some((t: any) => t.step === 'Authentication Check'), 'Task steps should record authentication check');
    assert(directive.attributions?.some((a: any) => a.type === 'GOOGLE_DRIVE'), 'Should attribute to GOOGLE_DRIVE knowledge layer');
  });

  // -------------------------------------------------------------
  // Group 4: UI & Frontend Drive Knowledge Layer Verification
  // -------------------------------------------------------------
  console.log('\n--- Group 4: Frontend UI Drive Integration ---');

  runTest('4.1 App.tsx intercepts Drive queries and checks googleToken', () => {
    const appFile = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
    assert(appFile.includes("lowerText.includes('drive')"), 'App.tsx should check for drive queries');
    assert(appFile.includes('!googleToken'), 'App.tsx should check if googleToken is available');
    assert(appFile.includes('Google Drive is currently not linked'), 'App.tsx should inform user when Drive is unlinked');
    assert(appFile.includes('searchMyFiles(googleToken,'), 'App.tsx should call searchMyFiles when token is present');
    assert(appFile.includes('driveContext = {'), 'App.tsx should build driveContext');
  });

  runTest('4.2 HUDHeader.tsx renders Google Drive connection and sync status', () => {
    const headerFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'HUDHeader.tsx'), 'utf8');
    assert(headerFile.includes('driveSyncStatus'), 'HUDHeader should track driveSyncStatus');
    assert(headerFile.includes('Google Drive'), 'HUDHeader should display Google Drive status tooltip');
    assert(headerFile.includes('Cloud'), 'HUDHeader should render Cloud icon');
  });

  runTest('4.3 LiveTranscript.tsx renders GOOGLE_DRIVE attribution with FileText icon', () => {
    const transcriptFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'LiveTranscript.tsx'), 'utf8');
    assert(transcriptFile.includes("attr.type === 'GOOGLE_DRIVE'"), 'LiveTranscript should support GOOGLE_DRIVE type');
    assert(transcriptFile.includes('<FileText'), 'LiveTranscript should display FileText icon for Drive files');
  });

  console.log('\n====================================================');
  console.log(`📊 MILESTONE 6 RESULTS: ${passedTests}/${totalTests} Tests Passed`);
  console.log('====================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  } else {
    console.log('🎉 ALL MILESTONE 6 TESTS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
