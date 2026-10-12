import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  classifyUserIntent,
  cleanPrompt,
} from '../server/intentRouter.js';
import {
  processLocalButlerDirective,
  executeFilesystemTool,
  resolveTargetFilesystemPath,
} from '../server.js';

console.log('====================================================');
console.log('🧪 MILESTONE 3: COMMAND & TOOL EXECUTION TEST SUITE');
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

// -------------------------------------------------------------
// Group 1: Intent Classification (Categories A, B, C, D)
// -------------------------------------------------------------
console.log('--- Group 1: Intent Classification Tests ---');

runTest('1.1 CleanPrompt removes voice prefixes and punctuation', () => {
  assert.strictEqual(cleanPrompt('JARVIS, create a folder called TestProject.'), 'create a folder called TestProject');
  assert.strictEqual(cleanPrompt('Hey Jarvis: what is AI?'), 'what is AI');
  assert.strictEqual(cleanPrompt('Coach, brief me!'), 'brief me');
  assert.strictEqual(cleanPrompt('Please create a file called notes.txt'), 'create a file called notes.txt');
});

runTest('1.2 Category A: Conversational request classified directly without tool trigger', () => {
  const intent1 = classifyUserIntent('Tell me about artificial intelligence.');
  assert.strictEqual(intent1.category, 'CONVERSATIONAL');

  const intent2 = classifyUserIntent('What is artificial intelligence?');
  assert.strictEqual(intent2.category, 'CONVERSATIONAL');

  const intent3 = classifyUserIntent('Explain PCR');
  assert.strictEqual(intent3.category, 'CONVERSATIONAL');
});

runTest('1.3 Category B: Action Filesystem - create_directory', () => {
  const intent1 = classifyUserIntent('Create a folder called TestProject.');
  assert.strictEqual(intent1.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(intent1.subType, 'create_directory');
  assert.strictEqual(intent1.args?.folderName, 'TestProject');

  const intent2 = classifyUserIntent('Create a folder called TestProject on my Desktop.');
  assert.strictEqual(intent2.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(intent2.subType, 'create_directory');
  assert.strictEqual(intent2.args?.folderName, 'TestProject');

  const intent3 = classifyUserIntent('mkdir AnalyticsData');
  assert.strictEqual(intent3.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(intent3.subType, 'create_directory');
  assert.strictEqual(intent3.args?.folderName, 'AnalyticsData');
});

runTest('1.4 Category B: Action Filesystem - create_file', () => {
  const intent = classifyUserIntent("Create a file called note.txt containing 'Hello World'");
  assert.strictEqual(intent.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(intent.subType, 'create_file');
  assert.strictEqual(intent.args?.fileName, 'note.txt');
  assert.strictEqual(intent.args?.content, 'Hello World');
});

runTest('1.5 Category B: Action Filesystem - list_directory & read_file', () => {
  const listIntent1 = classifyUserIntent('List files');
  assert.strictEqual(listIntent1.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(listIntent1.subType, 'list_directory');

  const listIntent2 = classifyUserIntent('show directory');
  assert.strictEqual(listIntent2.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(listIntent2.subType, 'list_directory');

  const readIntent = classifyUserIntent('Read file README.md');
  assert.strictEqual(readIntent.category, 'ACTION_FILESYSTEM');
  assert.strictEqual(readIntent.subType, 'read_file');
  assert(readIntent.args?.path.includes('README.md'));
});

runTest('1.6 Category C: Multi-Step request detection and arguments extraction', () => {
  const intent1 = classifyUserIntent('Create a folder called TestProject, put a README inside it, and write a description of JARVIS.');
  assert.strictEqual(intent1.category, 'ACTION_MULTI_STEP');
  assert.strictEqual(intent1.args?.folderName, 'TestProject');
  assert.strictEqual(intent1.args?.fileName, 'README.md');
  assert(intent1.args?.content.includes('description of JARVIS'));

  const intent2 = classifyUserIntent("Create a folder called AgentTest, create a README inside it, write 'This is JARVIS' into the README, then verify it.");
  assert.strictEqual(intent2.category, 'ACTION_MULTI_STEP');
  assert.strictEqual(intent2.args?.folderName, 'AgentTest');
  assert.strictEqual(intent2.args?.content, 'This is JARVIS');
});

runTest('1.7 Category D: Ambiguous request detection', () => {
  const intent1 = classifyUserIntent('Do something with my files.');
  assert.strictEqual(intent1.category, 'AMBIGUOUS');
  assert(intent1.clarificationPrompt?.includes('specify the exact operation'));

  const intent2 = classifyUserIntent('Can you do something with the files?');
  assert.strictEqual(intent2.category, 'AMBIGUOUS');

  const intent3 = classifyUserIntent('Mess with files');
  assert.strictEqual(intent3.category, 'AMBIGUOUS');
});

runTest('1.8 Web Search action intent detection', () => {
  const intent = classifyUserIntent('Search the web for latest quantum computing news');
  assert.strictEqual(intent.category, 'ACTION_SEARCH_WEB');
  assert(intent.args?.query.includes('quantum computing'));
});

// -------------------------------------------------------------
// Group 2: Real Tool Execution & Verification Loop
// -------------------------------------------------------------
console.log('\n--- Group 2: Real Tool Execution & Verification Tests ---');

const testFolder = 'Milestone3_Test_Folder';
const testSubFile = 'milestone3_note.txt';
const resolvedTestFolder = resolveTargetFilesystemPath(`Desktop/${testFolder}`);
const resolvedTestFile = resolveTargetFilesystemPath(`Desktop/${testFolder}/${testSubFile}`);

runTest('2.1 Real filesystem tool creates directory and verifies existence', () => {
  if (fs.existsSync(resolvedTestFolder)) {
    fs.rmSync(resolvedTestFolder, { recursive: true, force: true });
  }

  const res = executeFilesystemTool('filesystem_create_directory', { path: `Desktop/${testFolder}` });
  assert.strictEqual(res.success, true);
  assert(fs.existsSync(resolvedTestFolder), 'Directory should exist on disk');

  const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: `Desktop/${testFolder}` });
  assert.strictEqual(verifyRes.success, true);
  assert.strictEqual(verifyRes.result?.exists, true);
  assert.strictEqual(verifyRes.result?.isDirectory, true);
});

runTest('2.2 Real filesystem tool creates file with verified byte content', () => {
  const content = 'Automated Milestone 3 Verification Content';
  const res = executeFilesystemTool('filesystem_create_file', {
    path: `Desktop/${testFolder}/${testSubFile}`,
    content,
  });
  assert.strictEqual(res.success, true);
  assert.strictEqual(res.result?.verified, true);
  assert(fs.existsSync(resolvedTestFile), 'File should exist on disk');

  const readBack = fs.readFileSync(resolvedTestFile, 'utf8');
  assert.strictEqual(readBack, content);
});

runTest('2.3 Real filesystem tool reads file content accurately', () => {
  const readRes = executeFilesystemTool('filesystem_read_file', { path: `Desktop/${testFolder}/${testSubFile}` });
  assert.strictEqual(readRes.success, true);
  assert.strictEqual(readRes.result?.content, 'Automated Milestone 3 Verification Content');
});

runTest('2.4 Real filesystem tool lists directory contents', () => {
  const listRes = executeFilesystemTool('filesystem_list_directory', { path: `Desktop/${testFolder}` });
  assert.strictEqual(listRes.success, true);
  assert(listRes.result?.count >= 1);
  const found = listRes.result?.entries.some((e: any) => e.name === testSubFile);
  assert.strictEqual(found, true);
});

// -------------------------------------------------------------
// Group 3: ProcessLocalButlerDirective End-to-End Handling
// -------------------------------------------------------------
console.log('\n--- Group 3: Engine Intent-to-Execution Tests ---');

runTest('3.1 Category B action executes tools and NEVER gives conversational excuses', () => {
  const prompt = 'JARVIS, create a folder called TestProjectAuto.';
  const expectedPath = resolveTargetFilesystemPath('Desktop/TestProjectAuto');
  if (fs.existsSync(expectedPath)) fs.rmSync(expectedPath, { recursive: true, force: true });

  const result = processLocalButlerDirective(prompt, 'boss', 'jarvis');

  // Verify response DOES NOT contain passive conversational excuse
  assert(!result.reply.includes("It sounds like you're thinking through"), 'Must NOT return conversational coaching on action command');
  assert(!result.reply.includes("What's the most important thing you want to achieve"), 'Must NOT ask what user wants to achieve on action command');
  assert(result.reply.includes('Done'), 'Should confirm action execution');
  assert(result.reply.includes('TestProjectAuto'), 'Should mention the created folder');

  // Verify tool was recorded in functionCalls
  assert(result.functionCalls.some((fc: any) => fc.name === 'filesystem_create_directory'));

  // Verify taskSteps reflect real execution and verification
  assert(result.taskSteps.some((ts: any) => ts.step === 'Executing' && ts.tool === 'filesystem.create_directory'));
  assert(result.taskSteps.some((ts: any) => ts.step === 'Verifying' && ts.status === 'success'));

  // Verify folder actually exists on physical disk
  assert(fs.existsSync(expectedPath), 'Directory TestProjectAuto must physically exist');

  // Clean up
  fs.rmSync(expectedPath, { recursive: true, force: true });
});

runTest('3.2 Category C multi-step request executes directory, file and verification in sequence', () => {
  const prompt = "Create a folder called MultiStepFolder, put a README inside it, and write 'Built by JARVIS' into the README, then verify it.";
  const folderPath = resolveTargetFilesystemPath('Desktop/MultiStepFolder');
  const filePath = resolveTargetFilesystemPath('Desktop/MultiStepFolder/README.md');
  if (fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true });

  const result = processLocalButlerDirective(prompt, 'boss', 'jarvis');

  assert(result.reply.includes('MultiStepFolder'));
  assert(result.reply.includes('README.md'));
  assert(result.functionCalls.length >= 3);
  assert(result.taskSteps.length >= 4);

  // Verify files physically exist
  assert(fs.existsSync(folderPath), 'MultiStepFolder must exist');
  assert(fs.existsSync(filePath), 'README.md must exist');
  assert.strictEqual(fs.readFileSync(filePath, 'utf8'), 'Built by JARVIS');

  // Clean up
  fs.rmSync(folderPath, { recursive: true, force: true });
});

runTest('3.3 Category D ambiguous request asks for clarification and executes zero tools', () => {
  const result = processLocalButlerDirective('Do something with my files.', 'boss', 'jarvis');

  assert.strictEqual(result.functionCalls.length, 0, 'No tool calls should be made on ambiguous requests');
  assert(result.reply.includes('Please specify the exact operation'), 'Must ask for specific clarification');
  assert(!result.reply.includes("It sounds like you're thinking through"), 'Must NOT use passive coaching formula');
  assert(result.taskSteps.some((ts: any) => ts.status === 'error'), 'Task steps should record clarification requirement');
});

runTest('3.4 Category A conceptual question answered cleanly without tool invocation', () => {
  const result = processLocalButlerDirective('Tell me about artificial intelligence.', 'boss', 'jarvis');

  assert.strictEqual(result.functionCalls.length, 0);
  assert(result.reply.includes('computational systems engineered to perform cognitive tasks'));
  assert(result.taskSteps.some((ts: any) => ts.step === 'Conversational response delivered'));
});

runTest('3.5 Manager Mode does NOT swallow action commands with passive coaching', () => {
  const prompt = 'Create a folder called ManagerActionTest.';
  const folderPath = resolveTargetFilesystemPath('Desktop/ManagerActionTest');
  if (fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true });

  // Call specifically with mode === 'manager'
  const result = processLocalButlerDirective(prompt, 'boss', 'manager');

  assert(!result.reply.includes("It sounds like you're thinking through"), 'Manager mode must NOT swallow action commands');
  assert(result.reply.includes('Done'), 'Manager mode must execute action');
  assert(fs.existsSync(folderPath), 'Folder must be created even when mode is manager');

  // Clean up
  fs.rmSync(folderPath, { recursive: true, force: true });
});

runTest('3.6 B30 commands (/today, /score) execute properly in Manager Mode', () => {
  const todayRes = processLocalButlerDirective('/today', 'boss', 'manager');
  assert(todayRes.reply.includes('ONE MAIN THING') || todayRes.reply.includes('IMMEDIATE ACTION'));

  const scoreRes = processLocalButlerDirective('/score', 'boss', 'manager');
  assert(scoreRes.reply.includes('DAILY PRODUCTIVITY SCORE'));
});

// Final cleanup of test directory
if (fs.existsSync(resolvedTestFolder)) {
  fs.rmSync(resolvedTestFolder, { recursive: true, force: true });
}

console.log('\n====================================================');
console.log(`📊 MILESTONE 3 RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('====================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
