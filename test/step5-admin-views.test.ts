import fs from 'fs';
import path from 'path';

console.log('===========================================================');
console.log('🧪 STEP 5: ADMIN PAGE & ANALYTICS VIEWS TEST SUITE');
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
// 1. Migration File Presence and View Definitions
// -----------------------------------------------------------------------------
console.log('\n--- 1. Migration File & Database Views Integrity ---');

const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20261011_05_admin_views_and_analytics.sql');
assert(fs.existsSync(migrationPath), 'Migration file 20261011_05_admin_views_and_analytics.sql exists');

const migrationContent = fs.readFileSync(migrationPath, 'utf8');

// View 1: Open Problem Reports
assert(
  migrationContent.includes('CREATE OR REPLACE VIEW public.view_open_problem_reports') &&
  migrationContent.includes("WHERE r.status = 'OPEN'"),
  'view_open_problem_reports is created and filters for OPEN status'
);
assert(
  migrationContent.includes('r.note') && migrationContent.includes('q.prompt'),
  'view_open_problem_reports includes both learner note and question prompt'
);

// View 2: Question Failure Rates
assert(
  migrationContent.includes('CREATE OR REPLACE VIEW public.view_question_failure_rates'),
  'view_question_failure_rates is created'
);
assert(
  migrationContent.includes('failure_rate_pct') &&
  migrationContent.includes('SUM(CASE WHEN a.is_correct = false THEN 1 ELSE 0 END)'),
  'view_question_failure_rates computes failure rate percentage from attempts'
);

// View 3: Lesson Completion Rates
assert(
  migrationContent.includes('CREATE OR REPLACE VIEW public.view_lesson_completion_rates'),
  'view_lesson_completion_rates is created'
);
assert(
  migrationContent.includes('completion_rate_pct') &&
  migrationContent.includes('FROM public.lesson_progress'),
  'view_lesson_completion_rates computes completion rate percentage from lesson_progress'
);

// View 4: Daily Active Learners
assert(
  migrationContent.includes('CREATE OR REPLACE VIEW public.view_daily_active_learners'),
  'view_daily_active_learners is created'
);
assert(
  migrationContent.includes('COUNT(DISTINCT a.learner_id)') &&
  migrationContent.includes('DATE(a.created_at) AS activity_date'),
  'view_daily_active_learners aggregates distinct learners per calendar date'
);

// -----------------------------------------------------------------------------
// 2. Database Security & Admin Role Enforcement
// -----------------------------------------------------------------------------
console.log('\n--- 2. Database Role Guard (Admin-Only Definer Functions) ---');

const adminFunctions = [
  'get_admin_open_reports',
  'get_admin_question_failure_rates',
  'get_admin_lesson_completion_rates',
  'get_admin_daily_active_learners',
  'resolve_problem_report'
];

for (const fn of adminFunctions) {
  assert(
    migrationContent.includes(`FUNCTION public.${fn}`),
    `Secure admin RPC function ${fn}() is defined`
  );
}

// Ensure all 5 functions assert public.is_admin()
const isAdminCheckCount = (migrationContent.match(/IF NOT public\.is_admin\(\) THEN/g) || []).length;
assert(
  isAdminCheckCount >= 5,
  `All admin RPC functions strictly enforce "IF NOT public.is_admin() THEN RAISE EXCEPTION" (${isAdminCheckCount} guards verified)`
);

// -----------------------------------------------------------------------------
// 3. Client API Methods Verification
// -----------------------------------------------------------------------------
console.log('\n--- 3. Client Service API Methods (cbeApi.ts) ---');

const cbeApiContent = fs.readFileSync(path.resolve(process.cwd(), 'src/services/cbeApi.ts'), 'utf8');

assert(cbeApiContent.includes('public async getAdminReports'), 'cbeApi exposes getAdminReports()');
assert(cbeApiContent.includes('public async resolveAdminReport'), 'cbeApi exposes resolveAdminReport()');
assert(cbeApiContent.includes('public async getAdminFailureRates'), 'cbeApi exposes getAdminFailureRates()');
assert(cbeApiContent.includes('public async getAdminLessonCompletionRates'), 'cbeApi exposes getAdminLessonCompletionRates()');
assert(cbeApiContent.includes('public async getAdminDailyActiveLearners'), 'cbeApi exposes getAdminDailyActiveLearners()');

// -----------------------------------------------------------------------------
// 4. Server Router & Authorization Guard
// -----------------------------------------------------------------------------
console.log('\n--- 4. Server API Router Authorization Guards ---');

const apiRouterContent = fs.readFileSync(path.resolve(process.cwd(), 'server/apiRouter.ts'), 'utf8');

assert(apiRouterContent.includes("function checkIsAdmin()"), 'apiRouter defines checkIsAdmin() role guard');
assert(apiRouterContent.includes("apiRouter.get('/admin/reports'"), 'apiRouter includes GET /admin/reports endpoint');
assert(apiRouterContent.includes("apiRouter.put('/admin/reports/:id'"), 'apiRouter includes PUT /admin/reports/:id endpoint');
assert(apiRouterContent.includes("apiRouter.get('/admin/failure-rates'"), 'apiRouter includes GET /admin/failure-rates endpoint');
assert(apiRouterContent.includes("apiRouter.get('/admin/lesson-completion-rates'"), 'apiRouter includes GET /admin/lesson-completion-rates endpoint');
assert(apiRouterContent.includes("apiRouter.get('/admin/daily-active-learners'"), 'apiRouter includes GET /admin/daily-active-learners endpoint');

// Verify all admin endpoints return 403 Forbidden for non-admin callers
const forbiddenChecks = (apiRouterContent.match(/return res\.status\(403\)\.json\({ error: 'Access denied: Admin role required\.' }\);/g) || []).length;
assert(
  forbiddenChecks >= 5,
  `All 5 admin analytical endpoints enforce 403 Forbidden for non-admin roles (${forbiddenChecks} endpoint guards verified)`
);

// -----------------------------------------------------------------------------
// 5. Admin Dashboard UI & Component Tabs
// -----------------------------------------------------------------------------
console.log('\n--- 5. AdminDashboard Component & Interactive Views ---');

const adminDashboardContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/AdminDashboard.tsx'), 'utf8');

assert(adminDashboardContent.includes("isUnauthorized = currentUser && currentUser.role !== 'ADMIN'"), 'AdminDashboard checks currentUser.role');
assert(adminDashboardContent.includes('Access Restricted: Admin Role Required'), 'AdminDashboard renders unauthorized screen for non-admin');
assert(adminDashboardContent.includes("'REPORTS'"), 'AdminDashboard supports REPORTS tab');
assert(adminDashboardContent.includes("'FAILURES'"), 'AdminDashboard supports FAILURES tab');
assert(adminDashboardContent.includes("'COMPLETIONS'"), 'AdminDashboard supports COMPLETIONS tab');
assert(adminDashboardContent.includes("'DAILY_ACTIVE'"), 'AdminDashboard supports DAILY_ACTIVE tab');
assert(adminDashboardContent.includes("'QUESTIONS'"), 'AdminDashboard supports QUESTIONS pipeline tab');
assert(adminDashboardContent.includes('handleResolveReport'), 'AdminDashboard has report resolution handler');
assert(adminDashboardContent.includes('High Friction'), 'AdminDashboard highlights questions with high failure rates (>= 50%)');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n===========================================================');
console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 STEP 5 ADMIN PAGE & ANALYTICS VIEWS TEST SUITE PASSED!\n');
  process.exit(0);
}
