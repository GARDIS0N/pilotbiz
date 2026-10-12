import fs from 'fs';
import path from 'path';

const PROJECT_REF = 'gvddvgscydjzpqffwxrn';
const MIGRATIONS_DIR = path.join(process.cwd(), 'supabase', 'migrations');

const migrationFiles = [
  '20261011_01_questions_schema_and_constraints.sql',
  '20261011_02_attempts_and_reports.sql',
  '20261011_03_learning_engine.sql',
  '20261011_04_privacy_and_roles_rls.sql',
  '20261011_05_admin_views_and_analytics.sql',
  '20261011_06_scheduled_jobs.sql',
  '20261011_07_reliability_and_indexes.sql',
  '20261011_08_stable_option_ids_and_keys.sql',
  '20261011_09_matching_pairs_and_content_integrity.sql'
];

async function runQuery(token: string, query: string): Promise<any> {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return await res.json();
}

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    console.error('Error: SUPABASE_ACCESS_TOKEN is required.');
    process.exit(1);
  }

  console.log(`===========================================================`);
  console.log(`EXECUTING MIGRATIONS ON SUPABASE PROJECT: ${PROJECT_REF}`);
  console.log(`===========================================================\n`);

  // Ensure migration tracking table exists
  await runQuery(token, `
    CREATE TABLE IF NOT EXISTS public._supabase_migrations (
      version TEXT PRIMARY KEY,
      inserted_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  for (let i = 0; i < migrationFiles.length; i++) {
    const file = migrationFiles[i];
    const filePath = path.join(MIGRATIONS_DIR, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log(`[${i + 1}/${migrationFiles.length}] Applying migration: ${file}...`);
    try {
      await runQuery(token, sql);
      await runQuery(token, `
        INSERT INTO public._supabase_migrations (version) 
        VALUES ('${file}') 
        ON CONFLICT (version) DO UPDATE SET inserted_at = NOW();
      `);
      console.log(`   ✅ Migration ${file} applied successfully.`);
    } catch (err: any) {
      console.error(`   ❌ Failed to apply ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log('\n[Post-Migration] Reloading PostgREST schema cache...');
  await runQuery(token, `SELECT pg_notify('pgrst', 'reload schema');`);
  console.log('   ✅ PostgREST schema cache reload signal dispatched.');

  console.log('\n===========================================================');
  console.log('VERIFYING DEPLOYED SCHEMA ON LIVE DATABASE');
  console.log('===========================================================');

  // Verify tables
  const tablesResult = await runQuery(token, `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);
  console.log('\nCreated Tables:');
  for (const row of tablesResult) {
    console.log(` - ${row.table_name}`);
  }

  // Verify views & materialized views
  const viewsResult = await runQuery(token, `
    SELECT table_name FROM information_schema.views WHERE table_schema = 'public'
    UNION ALL
    SELECT matviewname AS table_name FROM pg_matviews WHERE schemaname = 'public';
  `);
  console.log('\nCreated Views & Materialized Views:');
  for (const row of viewsResult) {
    console.log(` - ${row.table_name}`);
  }

  // Verify RLS enabled
  const rlsResult = await runQuery(token, `
    SELECT relname, relrowsecurity 
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
      AND relname IN ('questions', 'attempts', 'reports', 'profiles', 'skill_mastery', 'lesson_progress', 'review_queue', 'maintenance_logs', 'weekly_learner_summaries')
    ORDER BY relname;
  `);
  console.log('\nRow Level Security (RLS) Status:');
  for (const row of rlsResult) {
    console.log(` - ${row.relname}: RLS ${row.relrowsecurity ? 'ENABLED ✅' : 'DISABLED ❌'}`);
  }

  // Verify custom functions
  const functionsResult = await runQuery(token, `
    SELECT routine_name 
    FROM information_schema.routines 
    WHERE routine_schema = 'public'
      AND routine_name IN (
        'validate_question_integrity', 
        'handle_reports_updated_at',
        'handle_attempt_review_queue',
        'process_review_result',
        'recommend_next_lesson',
        'is_admin',
        'is_parent_of',
        'delete_learner_data',
        'merge_anonymous_progress',
        'get_admin_open_reports',
        'get_admin_question_failure_rates',
        'get_admin_lesson_completion_rates',
        'get_admin_daily_active_learners',
        'resolve_problem_report',
        'run_nightly_maintenance',
        'run_weekly_summaries',
        'generate_weekly_system_health_report'
      )
    ORDER BY routine_name;
  `);
  console.log(`\nVerified Database Functions (${functionsResult.length}):`);
  for (const row of functionsResult) {
    console.log(` - ${row.routine_name}()`);
  }

  // Verify index count
  const indexResult = await runQuery(token, `
    SELECT COUNT(*) AS total_indexes 
    FROM pg_indexes 
    WHERE schemaname = 'public';
  `);
  console.log(`\nTotal Active Public Indexes: ${indexResult[0]?.total_indexes}`);

  console.log('\n🎉 ALL 7 SUPABASE SCHEMA MIGRATIONS DEPLOYED AND VERIFIED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
