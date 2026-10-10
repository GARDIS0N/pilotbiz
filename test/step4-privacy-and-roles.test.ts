import fs from 'fs';
import path from 'path';

console.log('===========================================================');
console.log('🧪 STEP 4: PRIVACY AND ROLES (RLS) TEST SUITE');
console.log('===========================================================');

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${msg}`);
    passedCount++;
  } else {
    console.error(`  ❌ [FAIL] ${msg}`);
    failedCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. Migration File Presence and RLS Verification
// -----------------------------------------------------------------------------
console.log('\n--- 1. Migration File & RLS Policy Enforcement ---');

const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20261011_04_privacy_and_roles_rls.sql');
assert(fs.existsSync(migrationPath), 'Migration file 20261011_04_privacy_and_roles_rls.sql exists');

const migrationContent = fs.readFileSync(migrationPath, 'utf8');

const tablesWithRLS = [
  'questions',
  'attempts',
  'reports',
  'skill_mastery',
  'lesson_progress',
  'review_queue',
  'profiles'
];

for (const tbl of tablesWithRLS) {
  const rlsRegex = new RegExp(`ALTER\\s+TABLE\\s+public\\.${tbl}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
  assert(rlsRegex.test(migrationContent), `Table public.${tbl} has RLS explicitly enabled`);
}

// -----------------------------------------------------------------------------
// 2. Strict Role Isolation & Report Insert-Only Verification
// -----------------------------------------------------------------------------
console.log('\n--- 2. Role Isolation & Security Policies ---');

// Reports must be insert-only for learners
assert(
  migrationContent.includes('reports_insert_learner') &&
  migrationContent.includes('FOR INSERT WITH CHECK (true)'),
  'Reports table has INSERT policy allowing learner reporting'
);

assert(
  migrationContent.includes('reports_select_admin') &&
  migrationContent.includes('FOR SELECT USING (public.is_admin())'),
  'Reports table has SELECT policy strictly restricted to admins (insert-only for learners)'
);

// Attempts table only visible to owner learner or admin
assert(
  migrationContent.includes('attempts_select') &&
  migrationContent.includes("learner_id = auth.uid()::text OR") &&
  migrationContent.includes("public.is_admin()"),
  'Attempts SELECT policy restricts learners to their own attempts only'
);

// Profiles table isolation
assert(
  migrationContent.includes('profiles_select') &&
  migrationContent.includes('id = auth.uid() OR') &&
  migrationContent.includes('public.is_parent_of(id) OR') &&
  migrationContent.includes('public.is_admin()'),
  'Profiles SELECT policy restricts access to profile owner, linked parent, or admin'
);

// Helper functions present
assert(migrationContent.includes('CREATE OR REPLACE FUNCTION public.is_admin()'), 'Function is_admin() defined');
assert(migrationContent.includes('CREATE OR REPLACE FUNCTION public.is_parent_of(child_uuid UUID)'), 'Function is_parent_of() defined');

// -----------------------------------------------------------------------------
// 3. Child Data Minimization
// -----------------------------------------------------------------------------
console.log('\n--- 3. Child Data Minimization (COPPA / Kenya DPA) ---');

assert(migrationContent.includes('grade_id TEXT NOT NULL DEFAULT \'grade-4\''), 'Profiles stores grade_id');
assert(migrationContent.includes('school_name TEXT'), 'Profiles stores optional school_name only');
assert(migrationContent.includes('parent_user_id UUID REFERENCES auth.users(id)'), 'Profiles stores parent guardian reference link');
assert(!migrationContent.toLowerCase().includes('phone_number'), 'Profiles does not store child phone number');
assert(!migrationContent.toLowerCase().includes('national_id'), 'Profiles does not store child national ID');
assert(!migrationContent.toLowerCase().includes('home_address'), 'Profiles does not store child home address');

// -----------------------------------------------------------------------------
// 4. Data Deletion Path (Right to be Forgotten)
// -----------------------------------------------------------------------------
console.log('\n--- 4. Data Deletion Path ---');

assert(
  migrationContent.includes('CREATE OR REPLACE FUNCTION public.delete_learner_data'),
  'Function delete_learner_data() defined in migration'
);
assert(migrationContent.includes('DELETE FROM public.attempts WHERE learner_id = v_target_id'), 'delete_learner_data deletes attempts');
assert(migrationContent.includes('DELETE FROM public.review_queue WHERE learner_id = v_target_id'), 'delete_learner_data deletes review queue');
assert(migrationContent.includes('DELETE FROM public.skill_mastery WHERE learner_id = v_target_id'), 'delete_learner_data deletes skill mastery');
assert(migrationContent.includes('DELETE FROM public.lesson_progress WHERE learner_id = v_target_id'), 'delete_learner_data deletes lesson progress');
assert(migrationContent.includes('DELETE FROM public.reports WHERE learner_id = v_target_id'), 'delete_learner_data deletes reports');
assert(migrationContent.includes('DELETE FROM public.profiles WHERE id::text = v_target_id'), 'delete_learner_data deletes profile');

// -----------------------------------------------------------------------------
// 5. Anonymous Sign-In & Progress Merging Path
// -----------------------------------------------------------------------------
console.log('\n--- 5. Anonymous Sign-In & Progress Merging ---');

assert(
  migrationContent.includes('CREATE OR REPLACE FUNCTION public.merge_anonymous_progress'),
  'Function merge_anonymous_progress() defined in migration'
);
assert(migrationContent.includes('UPDATE public.attempts'), 'merge_anonymous_progress migrates attempts');
assert(migrationContent.includes('UPDATE public.review_queue'), 'merge_anonymous_progress migrates review queue');
assert(migrationContent.includes('UPDATE public.lesson_progress'), 'merge_anonymous_progress migrates lesson progress');
assert(migrationContent.includes('UPDATE public.skill_mastery'), 'merge_anonymous_progress migrates skill mastery');

// -----------------------------------------------------------------------------
// 6. Client Security Check: No Service Role Key Exposure
// -----------------------------------------------------------------------------
console.log('\n--- 6. Client Security Check (Zero Service Role Key Exposure) ---');

const srcDir = path.resolve(process.cwd(), 'src');
function scanDirForServiceRole(dir: string): string[] {
  const violations: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations.push(...scanDirForServiceRole(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('service_role') || content.includes('SUPABASE_SERVICE_ROLE_KEY')) {
        violations.push(fullPath);
      }
    }
  }
  return violations;
}

const serviceRoleViolations = scanDirForServiceRole(srcDir);
assert(serviceRoleViolations.length === 0, `No service role key references found in client source code (0 violations found)`);

// -----------------------------------------------------------------------------
// 7. Client & Server Integration Verification
// -----------------------------------------------------------------------------
console.log('\n--- 7. Client & Server Integration ---');

const clientContent = fs.readFileSync(path.resolve(process.cwd(), 'src/services/supabaseClient.ts'), 'utf8');
assert(clientContent.includes('export async function signInAnonymously'), 'supabaseClient exports signInAnonymously');
assert(clientContent.includes('export async function linkAnonymousAccount'), 'supabaseClient exports linkAnonymousAccount');
assert(clientContent.includes('export async function mergeAnonymousProgress'), 'supabaseClient exports mergeAnonymousProgress');
assert(clientContent.includes('export async function deleteLearnerData'), 'supabaseClient exports deleteLearnerData');
assert(clientContent.includes('export async function getLearnerProfile'), 'supabaseClient exports getLearnerProfile');

const cbeApiContent = fs.readFileSync(path.resolve(process.cwd(), 'src/services/cbeApi.ts'), 'utf8');
assert(cbeApiContent.includes('public async deleteLearnerData'), 'cbeApi exports deleteLearnerData');
assert(cbeApiContent.includes('public async mergeAnonymousProgress'), 'cbeApi exports mergeAnonymousProgress');

const apiRouterContent = fs.readFileSync(path.resolve(process.cwd(), 'server/apiRouter.ts'), 'utf8');
assert(apiRouterContent.includes("apiRouter.post('/privacy/delete-data'"), 'apiRouter includes /privacy/delete-data endpoint');
assert(apiRouterContent.includes("apiRouter.post('/auth/merge-anonymous'"), 'apiRouter includes /auth/merge-anonymous endpoint');

const meProfileContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/student/MeProfileView.tsx'), 'utf8');
assert(meProfileContent.includes('handleDeleteData'), 'MeProfileView includes handleDeleteData handler');
assert(meProfileContent.includes('Omba Kufuta Data Yangu') || meProfileContent.includes('Delete My Learning Data'), 'MeProfileView renders data deletion UI button');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n===========================================================');
console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 STEP 4 PRIVACY AND ROLES VERIFICATION COMPLETE!\n');
  process.exit(0);
}
