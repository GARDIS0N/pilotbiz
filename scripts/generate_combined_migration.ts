import fs from 'fs';
import path from 'path';

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
  '20261011_09_matching_pairs_and_content_integrity.sql',
  '20261011_10_language_cleanup.sql',
  '20261011_11_religious_stream_and_home_preferences.sql'
];

let combinedSQL = `-- =============================================================================
-- Jifuno Supabase Database Full Schema Migration (Steps 1 to 7)
-- Target Project: gvddvgscydjzpqffwxrn (https://gvddvgscydjzpqffwxrn.supabase.co)
-- Generated: ${new Date().toISOString()}
--
-- Features:
-- 1. Content integrity (constraints, trigger validation per question type)
-- 2. Answer attempts logging & problem reports
-- 3. Learning engine (skill_mastery, lesson_progress, spaced repetition review_queue, recommendation)
-- 4. Privacy & Roles (RLS on all tables, minimal child data, anonymous merge, data deletion)
-- 5. Admin analytics views & role-guarded RPCs
-- 6. Scheduled maintenance jobs & health reports (pg_cron / functions)
-- 7. High-performance composite B-Tree indexes
-- =============================================================================

`;

for (const file of migrationFiles) {
  const filePath = path.join(MIGRATIONS_DIR, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing migration file: ${file}`);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  combinedSQL += `\n-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`;
  combinedSQL += `-- START MIGRATION: ${file}\n`;
  combinedSQL += `-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n`;
  combinedSQL += content.trim();
  combinedSQL += `\n\n-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n`;
  combinedSQL += `-- END MIGRATION: ${file}\n`;
  combinedSQL += `-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n`;
}

const targetPath = path.join(MIGRATIONS_DIR, 'combined_all_migrations.sql');
fs.writeFileSync(targetPath, combinedSQL, 'utf8');
console.log(`Successfully generated: ${targetPath} (${combinedSQL.length} bytes)`);
