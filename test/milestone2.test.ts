import {
  getPersonaData,
  savePersonaData,
  buildManagerPersonaInstruction,
  DEFAULT_PERSONA,
} from '../server/personaManager.js';
import fs from 'fs';
import path from 'path';

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`[FAIL] ${msg}`);
  console.log(`  [PASS] ${msg}`);
}

async function runMilestone2Tests() {
  console.log('====================================================');
  console.log('RUNNING MILESTONE 2 (PERSONA INTEGRATION) TESTS');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // Test 1: Persona Configuration Loading & Defaults
  // ----------------------------------------------------
  console.log('Test 1: Persona Configuration Loading & Defaults');
  const persona = getPersonaData();
  assert(Boolean(persona.name), `Persona has configured name: "${persona.name}"`);
  assert(Boolean(persona.title), `Persona has configured title: "${persona.title}"`);
  assert(persona.directnessLevel >= 1 && persona.directnessLevel <= 5, `Directness level within range: ${persona.directnessLevel}/5`);
  assert(persona.noSycophancy === true, 'No-sycophancy rule is enabled by default');
  assert(persona.calloutPostponements === true, 'Callout postponements rule is enabled by default');
  console.log();

  // ----------------------------------------------------
  // Test 2: Live Persona Updates & Persistence
  // ----------------------------------------------------
  console.log('Test 2: Live Persona Updates & Persistence');
  const originalName = persona.name;
  const testUpdated = savePersonaData({
    name: 'Marcus',
    directnessLevel: 5,
    customDirectives: 'Keep responses under 25 words. Focus strictly on execution.',
  });

  assert(testUpdated.name === 'Marcus', 'Persona name updated to "Marcus"');
  assert(testUpdated.directnessLevel === 5, 'Directness level updated to 5');
  assert(testUpdated.customDirectives.includes('under 25 words'), 'Custom directives updated');

  // Verify re-reading from disk reflects changes
  const reloaded = getPersonaData();
  assert(reloaded.name === 'Marcus', 'Reloaded persona from disk matches updated name');

  // Restore original name
  savePersonaData({ name: originalName, directnessLevel: 4, customDirectives: '' });
  console.log();

  // ----------------------------------------------------
  // Test 3: System Prompt Construction & Directives
  // ----------------------------------------------------
  console.log('Test 3: System Prompt Construction & Directives');
  const goals = [{ title: 'Launch NestList MVP', progress: 40 }];
  const memory = { preferences: ['Morning deep work blocks'], struggles: ['Context switching'] };
  const recentlySaid = ['Tackle core priority milestone first.'];
  const prompt = buildManagerPersonaInstruction('boss', recentlySaid, 'Rolling session summary', goals, memory, {
    customDirectives: 'Always demand task estimates in minutes.',
  });

  assert(prompt.includes('my Personal AI Manager & Executive Chief of Staff'), 'Prompt assigns persona title');
  assert(prompt.includes('Address me as "boss"'), 'Prompt assigns address protocol');
  assert(prompt.includes('Never use sycophantic fillers'), 'Prompt enforces no-sycophancy directive');
  assert(prompt.includes('Never repeat advice'), 'Prompt contains Rule A1 repetition guard');
  assert(prompt.includes('Ask only ONE question at a time'), 'Prompt enforces single diagnostic question');
  assert(prompt.includes('Always demand task estimates in minutes'), 'Prompt includes custom user directives');
  assert(prompt.includes('Launch NestList MVP'), 'Prompt injects user goals context');
  console.log();

  // ----------------------------------------------------
  // Test 4: Frontend Settings Drawer Integration
  // ----------------------------------------------------
  console.log('Test 4: Frontend Settings Drawer Integration');
  const settingsDrawerContent = fs.readFileSync(
    path.join(process.cwd(), 'src', 'components', 'SettingsDrawer.tsx'),
    'utf8'
  );
  assert(settingsDrawerContent.includes('/api/jarvis/persona'), 'SettingsDrawer communicates with /api/jarvis/persona endpoint');
  assert(settingsDrawerContent.includes('PERSONAL MANAGER PERSONA'), 'SettingsDrawer renders Persona editor card');
  assert(settingsDrawerContent.includes('Directness & Accountability Level'), 'SettingsDrawer offers directness level selector');
  assert(settingsDrawerContent.includes('Custom Personal Directives'), 'SettingsDrawer offers custom directives editor');
  console.log();

  console.log('====================================================');
  console.log('ALL MILESTONE 2 VERIFICATION TESTS PASSED!');
  console.log('====================================================');
}

runMilestone2Tests().catch((err) => {
  console.error(err);
  process.exit(1);
});
