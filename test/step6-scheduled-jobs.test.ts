import fs from 'fs';
import path from 'path';

console.log('===========================================================');
console.log('🧪 STEP 6: SCHEDULED JOBS & SUMMARIES TEST SUITE');
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
// 1. Migration File & Schema Integrity
// -----------------------------------------------------------------------------
console.log('\n--- 1. Migration File & Schema Integrity ---');

const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20261011_06_scheduled_jobs.sql');
assert(fs.existsSync(migrationPath), 'Migration file 20261011_06_scheduled_jobs.sql exists');

const migrationContent = fs.readFileSync(migrationPath, 'utf8');

assert(
  migrationContent.includes('CREATE TABLE IF NOT EXISTS public.maintenance_logs'),
  'maintenance_logs audit table defined'
);

assert(
  migrationContent.includes('CREATE MATERIALIZED VIEW IF NOT EXISTS public.mv_question_failure_rates'),
  'mv_question_failure_rates materialized view defined for fast cached queries'
);

assert(
  migrationContent.includes('CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_qfr_id ON public.mv_question_failure_rates(question_id)'),
  'Unique index created on mv_question_failure_rates for concurrent refresh support'
);

assert(
  migrationContent.includes('CREATE TABLE IF NOT EXISTS public.weekly_learner_summaries'),
  'weekly_learner_summaries table defined'
);

assert(
  migrationContent.includes('weak_topics JSONB') &&
  migrationContent.includes('strong_topics JSONB'),
  'weekly_learner_summaries stores weak_topics and strong_topics breakdown'
);

assert(
  migrationContent.includes('ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY') &&
  migrationContent.includes('ALTER TABLE public.weekly_learner_summaries ENABLE ROW LEVEL SECURITY'),
  'RLS enabled on maintenance_logs and weekly_learner_summaries'
);

// -----------------------------------------------------------------------------
// 2. Nightly Maintenance Function Logic
// -----------------------------------------------------------------------------
console.log('\n--- 2. Nightly Maintenance Function (Cache Refresh & Review Expiration) ---');

assert(
  migrationContent.includes('CREATE OR REPLACE FUNCTION public.run_nightly_maintenance()'),
  'Function run_nightly_maintenance() defined'
);

assert(
  migrationContent.includes('REFRESH MATERIALIZED VIEW') &&
  migrationContent.includes('public.mv_question_failure_rates'),
  'run_nightly_maintenance refreshes mv_question_failure_rates'
);

assert(
  migrationContent.includes("status = 'EXPIRED'") &&
  migrationContent.includes("status = 'PENDING'") &&
  migrationContent.includes("INTERVAL '30 days'"),
  'run_nightly_maintenance expires old review items pending for > 30 days'
);

assert(
  migrationContent.includes("INSERT INTO public.maintenance_logs(job_name, status, details)"),
  'run_nightly_maintenance logs execution to maintenance_logs'
);

// -----------------------------------------------------------------------------
// 3. Weekly Parent/Teacher Summaries & Health Report Logic
// -----------------------------------------------------------------------------
console.log('\n--- 3. Weekly Parent/Teacher Summaries & Health Report ---');

assert(
  migrationContent.includes('CREATE OR REPLACE FUNCTION public.run_weekly_summaries'),
  'Function run_weekly_summaries() defined'
);

assert(
  migrationContent.includes('lessons_completed') &&
  migrationContent.includes('total_time_minutes') &&
  migrationContent.includes('accuracy_percentage'),
  'run_weekly_summaries calculates lessons completed, time spent, and accuracy'
);

assert(
  migrationContent.includes('CREATE OR REPLACE FUNCTION public.generate_weekly_system_health_report()'),
  'Function generate_weekly_system_health_report() defined'
);

assert(
  migrationContent.includes('v_system_health') &&
  migrationContent.includes('HEALTHY') &&
  migrationContent.includes('ACTION_REQUIRED'),
  'generate_weekly_system_health_report evaluates platform health state'
);

assert(
  migrationContent.includes('high_failure_questions') &&
  migrationContent.includes('open_problem_reports'),
  'generate_weekly_system_health_report audits high failure questions and open problem reports'
);

// -----------------------------------------------------------------------------
// 4. pg_cron Scheduled Job Registrations
// -----------------------------------------------------------------------------
console.log('\n--- 4. pg_cron Scheduled Job Registrations ---');

assert(
  migrationContent.includes('jifuno-nightly-maintenance') &&
  migrationContent.includes('0 2 * * *') &&
  migrationContent.includes('SELECT public.run_nightly_maintenance()'),
  'pg_cron registers nightly maintenance at 02:00 UTC (0 2 * * *)'
);

assert(
  migrationContent.includes('jifuno-weekly-summaries') &&
  migrationContent.includes('0 6 * * 1') &&
  migrationContent.includes('SELECT public.run_weekly_summaries()'),
  'pg_cron registers weekly summaries at 06:00 UTC every Monday (0 6 * * 1)'
);

// -----------------------------------------------------------------------------
// 5. Supabase Edge Functions
// -----------------------------------------------------------------------------
console.log('\n--- 5. Supabase Edge Functions ---');

const nightlyFuncPath = path.resolve(process.cwd(), 'supabase/functions/nightly-maintenance/index.ts');
assert(fs.existsSync(nightlyFuncPath), 'Edge Function nightly-maintenance/index.ts exists');

const nightlyFuncContent = fs.readFileSync(nightlyFuncPath, 'utf8');
assert(
  nightlyFuncContent.includes("supabase.rpc('run_nightly_maintenance')"),
  'nightly-maintenance Edge Function invokes run_nightly_maintenance RPC'
);

const weeklyFuncPath = path.resolve(process.cwd(), 'supabase/functions/weekly-summary/index.ts');
assert(fs.existsSync(weeklyFuncPath), 'Edge Function weekly-summary/index.ts exists');

const weeklyFuncContent = fs.readFileSync(weeklyFuncPath, 'utf8');
assert(
  weeklyFuncContent.includes("supabase.rpc('run_weekly_summaries')"),
  'weekly-summary Edge Function invokes run_weekly_summaries RPC'
);
assert(
  weeklyFuncContent.includes("supabase.rpc('generate_weekly_system_health_report')"),
  'weekly-summary Edge Function invokes generate_weekly_system_health_report RPC'
);
assert(
  weeklyFuncContent.includes('healthEmail') &&
  weeklyFuncContent.includes('Jifuno Weekly Platform Health Report'),
  'weekly-summary Edge Function formats health email payload'
);

// -----------------------------------------------------------------------------
// 6. API Endpoints & Client Services
// -----------------------------------------------------------------------------
console.log('\n--- 6. API Endpoints & Client Services ---');

const apiRouterContent = fs.readFileSync(path.resolve(process.cwd(), 'server/apiRouter.ts'), 'utf8');
assert(apiRouterContent.includes("apiRouter.post('/jobs/nightly-maintenance'"), 'apiRouter includes POST /jobs/nightly-maintenance');
assert(apiRouterContent.includes("apiRouter.post('/jobs/weekly-summary'"), 'apiRouter includes POST /jobs/weekly-summary');
assert(apiRouterContent.includes("apiRouter.get('/admin/system-health'"), 'apiRouter includes GET /admin/system-health');
assert(apiRouterContent.includes("apiRouter.get('/parent/weekly-summary/:learnerId'"), 'apiRouter includes GET /parent/weekly-summary/:learnerId');

const cbeApiContent = fs.readFileSync(path.resolve(process.cwd(), 'src/services/cbeApi.ts'), 'utf8');
assert(cbeApiContent.includes('public async triggerNightlyMaintenance'), 'cbeApi exposes triggerNightlyMaintenance()');
assert(cbeApiContent.includes('public async triggerWeeklySummary'), 'cbeApi exposes triggerWeeklySummary()');
assert(cbeApiContent.includes('public async getAdminSystemHealth'), 'cbeApi exposes getAdminSystemHealth()');
assert(cbeApiContent.includes('public async getParentWeeklySummary'), 'cbeApi exposes getParentWeeklySummary()');

const parentDashboardContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/parent/ParentDashboard.tsx'), 'utf8');
assert(parentDashboardContent.includes('weeklySummary'), 'ParentDashboard manages weeklySummary state');
assert(parentDashboardContent.includes('getParentWeeklySummary'), 'ParentDashboard fetches weekly summary for active child');
assert(parentDashboardContent.includes('Weekly Learning Summary'), 'ParentDashboard renders Weekly Learning Summary UI card');
assert(parentDashboardContent.includes('accuracy_percentage'), 'ParentDashboard renders weekly accuracy percentage');
assert(parentDashboardContent.includes('Weekly Focus Topics'), 'ParentDashboard renders weak topics breakdown');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n===========================================================');
console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('===========================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 STEP 6 SCHEDULED JOBS & SUMMARIES VERIFICATION COMPLETE!\n');
  process.exit(0);
}
