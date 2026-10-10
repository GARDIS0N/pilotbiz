-- =============================================================================
-- Migration: 20261011_06_scheduled_jobs.sql
-- Description: Scheduled Jobs (pg_cron or Edge Functions):
--              1. Nightly: Refresh failure-rate cache & expire old review items.
--              2. Weekly: Parent/teacher learning summary (progress, time, weak topics)
--                 and system health report.
-- =============================================================================

-- -------------------------------------------------------------
-- 1. Maintenance & Audit Logs Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'SUCCESS',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_maintenance_logs_job ON public.maintenance_logs(job_name, executed_at DESC);

-- -------------------------------------------------------------
-- 2. Materialized View for High-Performance Question Failure Rates
-- -------------------------------------------------------------
CREATE MATERIALIZED VIEW IF NOT EXISTS public.mv_question_failure_rates AS
SELECT 
  a.question_id,
  COALESCE(q.prompt, 'Question ' || a.question_id) AS prompt,
  q.type AS question_type,
  q.sub_strand_id,
  q.difficulty,
  COUNT(*)::INT AS total_attempts,
  SUM(CASE WHEN a.is_correct = false THEN 1 ELSE 0 END)::INT AS failed_attempts,
  ROUND(
    (SUM(CASE WHEN a.is_correct = false THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100.0), 
    1
  ) AS failure_rate_pct,
  ROUND(AVG(a.time_ms))::INT AS avg_time_ms,
  TIMEZONE('utc'::text, NOW()) AS refreshed_at
FROM public.attempts a
LEFT JOIN public.questions q ON a.question_id = q.id
GROUP BY a.question_id, q.prompt, q.type, q.sub_strand_id, q.difficulty
HAVING COUNT(*) >= 1;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_qfr_id ON public.mv_question_failure_rates(question_id);

-- -------------------------------------------------------------
-- 3. Weekly Parent & Teacher Learner Summaries Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.weekly_learner_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id TEXT NOT NULL,
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  lessons_completed INT NOT NULL DEFAULT 0,
  total_time_minutes INT NOT NULL DEFAULT 0,
  total_attempts INT NOT NULL DEFAULT 0,
  accuracy_percentage NUMERIC(5, 1) NOT NULL DEFAULT 0.0,
  weak_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  strong_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT uq_learner_week UNIQUE (learner_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_weekly_summaries_learner ON public.weekly_learner_summaries(learner_id);
CREATE INDEX IF NOT EXISTS idx_weekly_summaries_parent ON public.weekly_learner_summaries(parent_user_id);

-- -------------------------------------------------------------
-- 4. Nightly Maintenance Function
--    - Refreshes question failure-rate view
--    - Expires stale review queue items (> 30 days pending)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.run_nightly_maintenance()
RETURNS JSONB AS $$
DECLARE
  v_expired_count INT := 0;
  v_result JSONB;
BEGIN
  -- 1. Refresh Materialized View
  BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_question_failure_rates;
  EXCEPTION WHEN OTHERS THEN
    -- Fallback to non-concurrent refresh if index is empty
    REFRESH MATERIALIZED VIEW public.mv_question_failure_rates;
  END;

  -- 2. Expire old review items pending for > 30 days
  WITH expired_rows AS (
    UPDATE public.review_queue
    SET status = 'EXPIRED',
        updated_at = TIMEZONE('utc'::text, NOW())
    WHERE status = 'PENDING'
      AND next_review_at < (TIMEZONE('utc'::text, NOW()) - INTERVAL '30 days')
    RETURNING id
  )
  SELECT COUNT(*) INTO v_expired_count FROM expired_rows;

  v_result := jsonb_build_object(
    'job', 'nightly_maintenance',
    'status', 'SUCCESS',
    'failure_rates_refreshed', true,
    'expired_review_items', v_expired_count,
    'executed_at', TIMEZONE('utc'::text, NOW())
  );

  -- 3. Audit log
  INSERT INTO public.maintenance_logs(job_name, status, details)
  VALUES ('nightly_maintenance', 'SUCCESS', v_result);

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------
-- 5. Weekly Parent / Teacher Summary Generator Function
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.run_weekly_summaries(p_target_week_start DATE DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  v_week_start DATE := COALESCE(p_target_week_start, (CURRENT_DATE - INTERVAL '7 days')::DATE);
  v_week_end DATE := (v_week_start + INTERVAL '6 days')::DATE;
  v_processed_count INT := 0;
  r_learner RECORD;
  v_lessons_completed INT;
  v_time_mins INT;
  v_attempts_count INT;
  v_correct_count INT;
  v_accuracy NUMERIC;
  v_weak_topics JSONB;
  v_strong_topics JSONB;
  v_parent_id UUID;
BEGIN
  -- Iterate through learners who were active in the window
  FOR r_learner IN
    SELECT DISTINCT learner_id 
    FROM public.attempts
    WHERE created_at >= v_week_start AND created_at < (v_week_end + INTERVAL '1 day')
  LOOP
    -- 1. Lessons completed
    SELECT COUNT(*) INTO v_lessons_completed
    FROM public.lesson_progress
    WHERE learner_id = r_learner.learner_id
      AND completed = true
      AND updated_at >= v_week_start AND updated_at < (v_week_end + INTERVAL '1 day');

    -- 2. Total time and attempts
    SELECT 
      COALESCE(ROUND(SUM(time_ms) / 60000.0)::INT, 0),
      COUNT(*)::INT,
      SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::INT
    INTO v_time_mins, v_attempts_count, v_correct_count
    FROM public.attempts
    WHERE learner_id = r_learner.learner_id
      AND created_at >= v_week_start AND created_at < (v_week_end + INTERVAL '1 day');

    IF v_attempts_count > 0 THEN
      v_accuracy := ROUND((v_correct_count::NUMERIC / v_attempts_count) * 100.0, 1);
    ELSE
      v_accuracy := 0.0;
    END IF;

    -- 3. Weak topics (sub-strands with accuracy < 60% or highest error rate)
    SELECT COALESCE(jsonb_agg(sub_query), '[]'::jsonb)
    INTO v_weak_topics
    FROM (
      SELECT 
        COALESCE(q.sub_strand_id, 'General') AS topic,
        COUNT(*)::INT AS attempts,
        ROUND((SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100.0, 1) AS accuracy_pct
      FROM public.attempts a
      LEFT JOIN public.questions q ON a.question_id = q.id
      WHERE a.learner_id = r_learner.learner_id
        AND a.created_at >= v_week_start AND a.created_at < (v_week_end + INTERVAL '1 day')
      GROUP BY q.sub_strand_id
      HAVING (SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) < 0.65
      ORDER BY accuracy_pct ASC
      LIMIT 3
    ) sub_query;

    -- 4. Strong topics (sub-strands with accuracy >= 80%)
    SELECT COALESCE(jsonb_agg(sub_query), '[]'::jsonb)
    INTO v_strong_topics
    FROM (
      SELECT 
        COALESCE(q.sub_strand_id, 'General') AS topic,
        COUNT(*)::INT AS attempts,
        ROUND((SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100.0, 1) AS accuracy_pct
      FROM public.attempts a
      LEFT JOIN public.questions q ON a.question_id = q.id
      WHERE a.learner_id = r_learner.learner_id
        AND a.created_at >= v_week_start AND a.created_at < (v_week_end + INTERVAL '1 day')
      GROUP BY q.sub_strand_id
      HAVING (SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) >= 0.75
      ORDER BY accuracy_pct DESC
      LIMIT 3
    ) sub_query;

    -- 5. Find guardian link if exists
    SELECT parent_user_id INTO v_parent_id
    FROM public.profiles
    WHERE id::TEXT = r_learner.learner_id OR id::TEXT = (
      SELECT user_id::TEXT FROM auth.users WHERE id::TEXT = r_learner.learner_id LIMIT 1
    )
    LIMIT 1;

    -- 6. Upsert weekly summary record
    INSERT INTO public.weekly_learner_summaries (
      learner_id,
      parent_user_id,
      week_start_date,
      week_end_date,
      lessons_completed,
      total_time_minutes,
      total_attempts,
      accuracy_percentage,
      weak_topics,
      strong_topics
    ) VALUES (
      r_learner.learner_id,
      v_parent_id,
      v_week_start,
      v_week_end,
      v_lessons_completed,
      v_time_mins,
      v_attempts_count,
      v_accuracy,
      v_weak_topics,
      v_strong_topics
    )
    ON CONFLICT (learner_id, week_start_date) DO UPDATE SET
      lessons_completed = EXCLUDED.lessons_completed,
      total_time_minutes = EXCLUDED.total_time_minutes,
      total_attempts = EXCLUDED.total_attempts,
      accuracy_percentage = EXCLUDED.accuracy_percentage,
      weak_topics = EXCLUDED.weak_topics,
      strong_topics = EXCLUDED.strong_topics;

    v_processed_count := v_processed_count + 1;
  END LOOP;

  -- Audit log
  INSERT INTO public.maintenance_logs(job_name, status, details)
  VALUES ('weekly_summaries', 'SUCCESS', jsonb_build_object(
    'week_start', v_week_start,
    'week_end', v_week_end,
    'learners_processed', v_processed_count
  ));

  RETURN jsonb_build_object(
    'job', 'weekly_summaries',
    'status', 'SUCCESS',
    'week_start', v_week_start,
    'week_end', v_week_end,
    'summaries_generated', v_processed_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------
-- 6. Weekly System Health Report Generator Function (for Admin Email)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.generate_weekly_system_health_report()
RETURNS JSONB AS $$
DECLARE
  v_week_start TIMESTAMPTZ := NOW() - INTERVAL '7 days';
  v_total_attempts INT := 0;
  v_success_rate NUMERIC := 0.0;
  v_active_learners INT := 0;
  v_open_reports INT := 0;
  v_high_failure_questions JSONB;
  v_system_health TEXT := 'HEALTHY';
  v_result JSONB;
BEGIN
  -- 1. Total attempts and success rate
  SELECT 
    COUNT(*)::INT,
    ROUND((SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100.0), 1)
  INTO v_total_attempts, v_success_rate
  FROM public.attempts
  WHERE created_at >= v_week_start;

  -- 2. Active learners count
  SELECT COUNT(DISTINCT learner_id)::INT INTO v_active_learners
  FROM public.attempts
  WHERE created_at >= v_week_start;

  -- 3. Open problem reports
  SELECT COUNT(*)::INT INTO v_open_reports
  FROM public.reports
  WHERE status = 'OPEN';

  -- 4. Top 3 highest failure questions
  SELECT COALESCE(jsonb_agg(sub), '[]'::jsonb)
  INTO v_high_failure_questions
  FROM (
    SELECT 
      a.question_id,
      COALESCE(q.prompt, a.question_id) AS prompt,
      ROUND((SUM(CASE WHEN NOT a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100.0), 1) AS failure_rate_pct,
      COUNT(*)::INT AS attempts
    FROM public.attempts a
    LEFT JOIN public.questions q ON a.question_id = q.id
    WHERE a.created_at >= v_week_start
    GROUP BY a.question_id, q.prompt
    HAVING COUNT(*) >= 5 AND (SUM(CASE WHEN NOT a.is_correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) >= 0.50
    ORDER BY failure_rate_pct DESC
    LIMIT 3
  ) sub;

  -- Determine health status
  IF v_open_reports > 10 OR (jsonb_array_length(v_high_failure_questions) > 5) THEN
    v_system_health := 'ACTION_REQUIRED';
  ELSE
    v_system_health := 'HEALTHY';
  END IF;

  v_result := jsonb_build_object(
    'generated_at', TIMEZONE('utc'::text, NOW()),
    'system_health', v_system_health,
    'window_days', 7,
    'total_attempts', v_total_attempts,
    'average_accuracy_pct', COALESCE(v_success_rate, 100.0),
    'active_learners_count', v_active_learners,
    'open_problem_reports', v_open_reports,
    'high_failure_questions', v_high_failure_questions,
    'subject_line', 'Jifuno Weekly Platform Health: ' || v_system_health || ' (' || v_active_learners || ' active learners)'
  );

  -- Audit log
  INSERT INTO public.maintenance_logs(job_name, status, details)
  VALUES ('system_health_report', 'SUCCESS', v_result);

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------
-- 7. Row Level Security for Summaries & Maintenance Tables
-- -------------------------------------------------------------
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_learner_summaries ENABLE ROW LEVEL SECURITY;

-- maintenance_logs: admin only
DROP POLICY IF EXISTS maintenance_logs_admin ON public.maintenance_logs;
CREATE POLICY maintenance_logs_admin ON public.maintenance_logs
  FOR ALL USING (public.is_admin());

-- weekly_learner_summaries: learner sees own; parent sees children; admin sees all
DROP POLICY IF EXISTS weekly_summaries_select ON public.weekly_learner_summaries;
CREATE POLICY weekly_summaries_select ON public.weekly_learner_summaries
  FOR SELECT USING (
    learner_id = auth.uid()::TEXT OR
    parent_user_id = auth.uid() OR
    public.is_admin()
  );

-- -------------------------------------------------------------
-- 8. pg_cron Scheduled Job Registrations (Automatic Execution)
-- -------------------------------------------------------------
DO $$
BEGIN
  -- Safe check for pg_cron extension
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    -- A. Nightly maintenance at 02:00 AM UTC
    PERFORM cron.unschedule('jifuno-nightly-maintenance');
    PERFORM cron.schedule(
      'jifuno-nightly-maintenance',
      '0 2 * * *',
      'SELECT public.run_nightly_maintenance();'
    );

    -- B. Weekly summaries at 06:00 AM UTC every Monday
    PERFORM cron.unschedule('jifuno-weekly-summaries');
    PERFORM cron.schedule(
      'jifuno-weekly-summaries',
      '0 6 * * 1',
      'SELECT public.run_weekly_summaries();'
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Non-fatal if pg_cron is not enabled in this database tier
  RAISE NOTICE 'pg_cron registration skipped or unsupported: %', SQLERRM;
END;
$$;
