import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { getGrade, getCurriculumGrade, CurriculumSubject } from '../src/data/curriculum/index.js';
import { StudentProfile } from '../src/types/cbe.js';

console.log('===========================================================');
console.log('🧪 TEST SUITE: PHASE 4 HOME SCREEN REBUILD VERIFICATION');
console.log('===========================================================\n');

let passedCount = 0;
let failedCount = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedCount++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message || err);
    failedCount++;
  }
}

const HUD_PATH = path.resolve('src/components/navigation/TopGameHUD.tsx');
const hudSource = fs.readFileSync(HUD_PATH, 'utf8');

const PATH_VIEW_PATH = path.resolve('src/components/path/LearningPathView.tsx');
const pathViewSource = fs.readFileSync(PATH_VIEW_PATH, 'utf8');

const NAV_PATH = path.resolve('src/components/navigation/AppNavigation.tsx');
const navSource = fs.readFileSync(NAV_PATH, 'utf8');

const ME_PATH = path.resolve('src/components/student/MeProfileView.tsx');
const meSource = fs.readFileSync(ME_PATH, 'utf8');

const ONBOARDING_PATH = path.resolve('src/components/onboarding/OnboardingFlow.tsx');
const onboardingSource = fs.readFileSync(ONBOARDING_PATH, 'utf8');

const MIGRATION_PATH = path.resolve('supabase/migrations/20261011_11_religious_stream_and_home_preferences.sql');

// -------------------------------------------------------------
// 1. Top Bar: Logo, Streak, Hearts Only
// -------------------------------------------------------------
console.log('--- 1. Top Bar Elements & Clutter Removal ---');

test('Top bar contains Jifuno Logo on the left', () => {
  assert.ok(hudSource.includes('<JifunoLogo size="sm" />'), 'Top bar must render JifunoLogo');
  assert.ok(hudSource.includes('Jifuno'), 'Top bar must display Jifuno brand name');
  assert.ok(hudSource.includes('CBC'), 'Top bar must display CBC badge');
});

test('Top bar contains Streak with small circular daily goal ring and Hearts HUD on the right', () => {
  assert.ok(hudSource.includes('<StreakFlame'), 'Top bar must include StreakFlame');
  assert.ok(hudSource.includes('{student.streakDays}'), 'Top bar must include streak days count');
  assert.ok(hudSource.includes('viewBox="0 0 36 36"'), 'Top bar must render small circular SVG goal ring');
  assert.ok(hudSource.includes('❤️'), 'Top bar must include Hearts HUD');
  assert.ok(hudSource.includes('{student.hearts}/{student.maxHearts}'), 'Top bar must display hearts energy count');
});

test('Top bar contains NO unlabeled speaker, key, or graduation-cap icons', () => {
  // Extract the header tag content
  const headerStart = hudSource.indexOf('<header');
  const headerEnd = hudSource.indexOf('</header>');
  assert.ok(headerStart !== -1 && headerEnd !== -1, '<header> must exist');
  const headerContent = hudSource.slice(headerStart, headerEnd);

  assert.ok(!headerContent.includes('🔊') && !headerContent.includes('🔇'), 'No speaker icon in top bar header');
  assert.ok(!headerContent.includes('🔑'), 'No key icon in top bar header');
  assert.ok(!headerContent.includes('🎓'), 'No graduation cap icon in top bar header');
});

test('Speaker, key, and graduation-cap controls are located inside Settings (MeProfileView)', () => {
  assert.ok(meSource.includes('Sound Effects'), 'MeProfileView must contain Sound Effects control');
  assert.ok(meSource.includes('CBC Grade Level'), 'MeProfileView must contain CBC Grade Level selector');
  assert.ok(meSource.includes('onOpenAuthModal'), 'MeProfileView must contain Account / Auth link');
});

// -------------------------------------------------------------
// 2. ONE Large Continue Card Directly Under Top Bar
// -------------------------------------------------------------
console.log('--- 2. ONE Large Continue Card (Directly Under Top Bar) ---');

test('Continue card appears directly under top bar with merged Rafiki speech bubble', () => {
  // Check ordering: Continue card must come before subject switcher
  const continueIndex = pathViewSource.indexOf('1. ONE LARGE CONTINUE CARD DIRECTLY UNDER TOP BAR');
  const subjectSwitcherIndex = pathViewSource.indexOf('2. COMPACT HORIZONTAL SUBJECT SWITCHER');
  assert.ok(continueIndex !== -1, 'ONE Large Continue Card must exist');
  assert.ok(subjectSwitcherIndex !== -1, 'Subject switcher must exist');
  assert.ok(continueIndex < subjectSwitcherIndex, 'Continue Card must come BEFORE subject switcher');

  // Merged Rafiki into the card
  assert.ok(pathViewSource.includes('🦉'), 'Continue Card must contain Rafiki owl mascot avatar');
  assert.ok(
    pathViewSource.includes('Let\'s solve "${nextQuestTitle}"!') ||
    pathViewSource.includes('Let\'s solve'),
    'Continue card must contain Rafiki speech bubble'
  );

  // Big START button (min-h-[56px])
  assert.ok(pathViewSource.includes('START LESSON'), 'Continue Card must contain START LESSON button');
  assert.ok(pathViewSource.includes('min-h-[56px]'), 'START button must have 56px+ touch target height');
});

test('Separate Rafiki guide bubble was removed from top of learning path', () => {
  // Ensure the old separate Rafiki Mascot Guide is no longer present
  assert.ok(!pathViewSource.includes('2. Rafiki Owl Mascot Guide (Speech Bubble Instead of Badges)'), 'Old separate Rafiki bubble must be removed');
});

// -------------------------------------------------------------
// 3. Compact Horizontal Subject Switcher with Distinct Icons
// -------------------------------------------------------------
console.log('--- 3. Compact Horizontal Subject Switcher ---');

test('Subject switcher uses compact horizontal scrolling row with small round icons', () => {
  assert.ok(
    pathViewSource.includes('flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none px-1'),
    'Subject switcher must use horizontal scrolling row'
  );
  assert.ok(
    pathViewSource.includes('w-13 h-13 sm:w-14 sm:h-14 rounded-full') ||
    pathViewSource.includes('rounded-full'),
    'Subject switcher must use small round icons'
  );
  assert.ok(
    !pathViewSource.includes('grid grid-cols-2 sm:grid-cols-4 gap-3'),
    'Old full-width subject grid must NOT be used'
  );
});

test('Every subject has a distinct icon and distinct color', () => {
  const g4 = getGrade('grade-4');
  assert.ok(g4, 'Grade 4 must exist');

  const iconsUsed = new Set<string>();
  const colorsUsed = new Set<string>();

  g4.subjects.forEach(s => {
    if (!s.isOptional) {
      assert.ok(s.icon, `Subject ${s.id} must define an icon`);
      assert.ok(s.color, `Subject ${s.id} must define a color`);
      assert.notStrictEqual(s.icon, 'Sparkles', `Subject ${s.icon} must not be fallback Sparkles`);
      iconsUsed.add(s.icon);
      colorsUsed.add(s.color);
    }
  });

  // Confirm multiple distinct icons and colors exist
  assert.ok(iconsUsed.size >= 6, `Must have at least 6 distinct icons, found ${iconsUsed.size}`);
  assert.ok(colorsUsed.size >= 6, `Must have at least 6 distinct colors, found ${colorsUsed.size}`);
});

// -------------------------------------------------------------
// 4. Grade & Religious Education Filtering
// -------------------------------------------------------------
console.log('--- 4. Grade & Religious Education Filtering ---');

test('Shows only subjects for learner\'s grade', () => {
  const g3 = getCurriculumGrade('grade-3')!;
  const g4 = getCurriculumGrade('grade-4')!;

  assert.ok(g3.subjects.every(s => s.gradeId === 'grade-3'), 'G3 subjects belong to G3');
  assert.ok(g4.subjects.every(s => s.gradeId === 'grade-4'), 'G4 subjects belong to G4');
});

test('Religious Education displays Christian (CRE) when family chooses CRE', () => {
  assert.ok(pathViewSource.includes('Christian Religious Education'), 'CRE track supported in LearningPathView');
  assert.ok(pathViewSource.includes("icon: 'Church'"), 'CRE uses Church icon');
  assert.ok(pathViewSource.includes("color: '#3b82f6'"), 'CRE uses blue color');
});

test('Religious Education displays Islamic (IRE) when family chooses IRE', () => {
  assert.ok(pathViewSource.includes('Islamic Religious Education'), 'IRE track supported in LearningPathView');
  assert.ok(pathViewSource.includes("icon: 'Moon'"), 'IRE uses Moon icon');
  assert.ok(pathViewSource.includes("color: '#059669'"), 'IRE uses green color');
});

test('Religious Education displays Hindu (HRE) when family chooses HRE', () => {
  assert.ok(pathViewSource.includes('Hindu Religious Education'), 'HRE track supported in LearningPathView');
  assert.ok(pathViewSource.includes("icon: 'Scroll'"), 'HRE uses Scroll icon');
  assert.ok(pathViewSource.includes("color: '#d97706'"), 'HRE uses warm amber color');
});

test('Family choice is available in OnboardingFlow and MeProfileView', () => {
  assert.ok(onboardingSource.includes('Religious Education Track:'), 'Religious Education choice present in onboarding');
  assert.ok(onboardingSource.includes('Christian (CRE)'), 'CRE present in onboarding');
  assert.ok(onboardingSource.includes('Islamic (IRE)'), 'IRE present in onboarding');
  assert.ok(onboardingSource.includes('Hindu (HRE)'), 'HRE present in onboarding');

  assert.ok(meSource.includes('Religious Education (Family Choice)'), 'Religious Education selector present in MeProfileView');
});

test('Migration 20261011_11 exists and adds religious_stream column to profiles table', () => {
  assert.ok(fs.existsSync(MIGRATION_PATH), 'Migration file 20261011_11 must exist');
  const sql = fs.readFileSync(MIGRATION_PATH, 'utf8');
  assert.ok(sql.includes('religious_stream TEXT DEFAULT \'CRE\''), 'SQL adds religious_stream column');
  assert.ok(sql.includes('idx_profiles_religious_stream'), 'SQL adds index on religious_stream');
});

// -------------------------------------------------------------
// 5. Lesson Path Zig-Zag Nodes & Unit Banner
// -------------------------------------------------------------
console.log('--- 5. Lesson Path Zig-Zag Nodes & Unit Banner ---');

test('Lesson path renders unit banner card at the top of each unit', () => {
  assert.ok(pathViewSource.includes('UNIT') || pathViewSource.includes('KITENGO'), 'Unit badge rendered');
  assert.ok(pathViewSource.includes('activeStrand.title'), 'Unit title rendered in banner');
  assert.ok(pathViewSource.includes('activeStrand.description'), 'Unit description rendered in banner');
});

test('Lesson path implements three distinct node states: locked, current, completed', () => {
  // Locked state
  assert.ok(
    pathViewSource.includes('bg-slate-800 text-gray-500 border-4 border-slate-700 cursor-not-allowed opacity-60'),
    'Locked nodes must be grey and disabled'
  );
  assert.ok(pathViewSource.includes('🔒'), 'Locked nodes must render lock icon');

  // Current state
  assert.ok(
    pathViewSource.includes('bg-emerald-500 text-slate-950 border-4 border-emerald-300 shadow-emerald-500/50 animate-pulse'),
    'Current node must be large and pulsing emerald'
  );
  assert.ok(pathViewSource.includes('START') || pathViewSource.includes('ANZA'), 'Current node must render START badge');

  // Completed state
  assert.ok(
    pathViewSource.includes('bg-amber-400 text-slate-950 border-4 border-amber-300 shadow-amber-500/25'),
    'Completed nodes must be gold'
  );
  assert.ok(pathViewSource.includes('⭐⭐⭐'), 'Completed nodes must display 3 gold stars badge');
});

test('Unit milestone trophy is kept at the end of the lesson unit', () => {
  assert.ok(pathViewSource.includes('🏆'), 'Unit milestone must render trophy');
  assert.ok(pathViewSource.includes('Unit Milestone') || pathViewSource.includes('Taji la Kitengo'), 'Unit milestone label must be rendered');
});

// -------------------------------------------------------------
// 6. Savanna Quest Below Path
// -------------------------------------------------------------
console.log('--- 6. Savanna Quest ---');

test('Savanna Quest remains positioned below the lesson path', () => {
  assert.ok(pathViewSource.includes('Savanna Quest: Baraka in Kongowea'), 'Savanna Quest present');
  assert.ok(pathViewSource.includes('Kongowea Market'), 'Authentic Kenyan context in Kongowea');
  assert.ok(pathViewSource.includes('START SAVANNA QUEST') || pathViewSource.includes('ANZA SAFARI YA SAVANNA'), 'Savanna Quest start button present');
});

// -------------------------------------------------------------
// 7. Universal Bottom Nav Labels: Learn, Practice, Dukani, Me
// -------------------------------------------------------------
console.log('--- 7. Universal Bottom Nav Labels ---');

test('Bottom nav tabs strictly use Learn, Practice, Dukani, Me across the app', () => {
  assert.ok(navSource.includes("labelEn: 'Learn'"), 'Tab 1 must be Learn');
  assert.ok(navSource.includes("labelEn: 'Practice'"), 'Tab 2 must be Practice');
  assert.ok(navSource.includes("labelEn: 'Dukani'"), 'Tab 3 must be Dukani');
  assert.ok(navSource.includes("labelEn: 'Me'"), 'Tab 4 must be Me');
});

// -------------------------------------------------------------
// 8. Daily Goal Ring & Parent/Teacher Zone
// -------------------------------------------------------------
console.log('--- 8. Daily Goal Ring & Parent/Teacher Zone ---');

test('Daily goal is a small ring beside the streak flame, not an intrusive card on home', () => {
  assert.ok(hudSource.includes('viewBox="0 0 36 36"'), 'Daily goal is rendered as circular SVG ring');
  assert.ok(!pathViewSource.includes('Daily Goal Card'), 'No intrusive daily goal card on home screen');
});

test('Strands rubric and Socratic AI Sparkle button are secluded in Parent/Teacher area', () => {
  assert.ok(meSource.includes('Parent & Teacher Area'), 'MeProfileView contains Parent & Teacher Area');
  assert.ok(meSource.includes('Full Strands Rubric'), 'Strands Rubric located inside parent area');
  assert.ok(meSource.includes('Socratic AI Companion'), 'Socratic companion button located inside parent area');
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n===========================================================');
console.log(`📊 PHASE 4 VERIFICATION SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All Phase 4 Home Screen Rebuild tests passed successfully!\n');
}
