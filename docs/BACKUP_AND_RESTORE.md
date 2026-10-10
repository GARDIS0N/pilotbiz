# Jifuno Production Database Backup & Restore Guide

This operational manual documents how to safely back up, archive, and restore the Jifuno production database on Supabase to ensure maximum reliability and zero data loss.

---

## 1. Automated Supabase Backups

Supabase automatically manages infrastructure-level backups:
- **Free Tier Projects**: Daily snapshots retained for 7 days.
- **Pro / Enterprise Projects**: Point-In-Time-Recovery (PITR) with continuous Write-Ahead Log (WAL) archiving allowing restoration to any specific second within the last 7 to 30 days.

### Accessing Automated Backups:
1. Navigate to the **Supabase Dashboard** $\to$ **Project Settings** $\to$ **Database** $\to$ **Backups**.
2. Under **Scheduled Backups**, locate the desired snapshot date/timestamp.
3. Click **Restore** to automatically provision a point-in-time clone or overwrite the database.

---

## 2. Taking Manual Backups (Supabase CLI)

Before performing major releases, curriculum data migrations, or schema changes, take a manual snapshot using the Supabase CLI.

### Prerequisites:
- Ensure Supabase CLI is installed:
  ```bash
  npm install -g supabase
  ```
- Retrieve your database connection string or login to Supabase CLI:
  ```bash
  supabase login
  supabase link --project-ref <your-project-id>
  ```

### A. Full Database Backup (Schema + Data)
```bash
supabase db dump -f supabase_backup_full_$(date +%Y%m%d_%H%M%S).sql
```
*Alternatively, using standard `pg_dump`:*
```bash
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-DB-HOST]:5432/postgres" \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  -f jifuno_full_backup.sql
```

### B. Schema-Only Backup
Dumps all tables, indexes, triggers, and RLS policies without user data:
```bash
supabase db dump --schema-only -f jifuno_schema_backup.sql
```

### C. Data-Only Backup (User Attempts, Progress & Reports)
Dumps student records, logs, and progress while leaving schema definitions intact:
```bash
supabase db dump --data-only -f jifuno_data_backup.sql
```

---

## 3. How to Restore from a Backup File

### Option 1: Restore via `psql` (Recommended)
To restore a `.sql` backup file directly to your Supabase PostgreSQL instance:

```bash
# 1. Set environment variables
export DB_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-DB-HOST]:5432/postgres"

# 2. Execute restoration script
psql "$DB_URL" < jifuno_full_backup.sql
```

### Option 2: Restore via Supabase CLI
```bash
# Push fresh migration sequence and restore data
supabase db reset
psql "$DB_URL" < jifuno_data_backup.sql
```

---

## 4. Curriculum Content Integrity Preservation

All official CBC/KICD curriculum questions and structure are version-controlled in code and file assets:
- **Curriculum Database**: [`data/cbe_database.json`](file:///c:/Users/Admin/Downloads/jarvis-ai-assistant/data/cbe_database.json) (8,715 audited questions).
- **Schema Migrations**: [`supabase/migrations/`](file:///c:/Users/Admin/Downloads/jarvis-ai-assistant/supabase/migrations/)
  - `20261011_01_questions_schema_and_constraints.sql` (Content constraints & triggers)
  - `20261011_02_attempts_and_reports.sql` (Attempt logging & problem reports)
  - `20261011_03_learning_engine.sql` (Mastery, progress, and review queue)
  - `20261011_04_privacy_and_roles_rls.sql` (Row Level Security & COPPA compliance)
  - `20261011_05_admin_views_and_analytics.sql` (Admin views & telemetry)
  - `20261011_06_scheduled_jobs.sql` (Nightly maintenance & weekly parent summaries)
  - `20261011_07_reliability_and_indexes.sql` (High-performance query indexes)

If the database is ever lost or wiped, you can recreate the entire database structure from scratch simply by running:
```bash
supabase db push
```

---

## 5. Disaster Recovery Checklist

In the unlikely event of data corruption or accidental table deletion:

1. **Assess Extent of Incident**:
   - Check the health check endpoint: `GET https://your-domain/api/health`
   - Determine whether the issue is isolated to a specific table or the whole database.
2. **Halt Mutating Operations**:
   - Temporarily enable maintenance mode or pause live deployments.
3. **Verify Last Known Good Backup**:
   - Verify backup file integrity: `head -n 20 backup.sql`
4. **Execute Restoration**:
   - Run `psql "$DB_URL" < backup.sql`
5. **Run Automated Integrity Validation**:
   ```bash
   npm test
   ```
   Ensures all 8,715 questions, RLS policies, indexes, and review queues are intact.
6. **Re-enable Service & Verify Health**:
   - Ping `/health` and verify HTTP 200 `status: "healthy"`.
