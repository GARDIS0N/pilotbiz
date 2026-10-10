-- =============================================================================
-- Migration: 20261011_05_admin_views_and_analytics.sql
-- Description: Admin-only analytical views and secure functions:
--              1. view_open_problem_reports (open reports with question details)
--              2. view_question_failure_rates (highest failure rate from attempts)
--              3. view_lesson_completion_rates (completion % and scores from lesson_progress)
--              4. view_daily_active_learners (active learners count and attempts per day)
--              Strictly protected: Accessible only by users with 'admin' role.
-- =============================================================================

-- -------------------------------------------------------------
-- 1. VIEW: Open Problem Reports
-- -------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_open_problem_reports AS
SELECT 
  r.id AS report_id,
  r.question_id,
  COALESCE(q.prompt, 'Question: ' || r.question_id) AS prompt,
  q.type AS question_type,
  q.sub_strand_id,
  r.learner_id,
  r.note,
  r.status,
  r.created_at
FROM public.reports r
LEFT JOIN public.questions q ON r.question_id = q.id
WHERE r.status = 'OPEN'
ORDER BY r.created_at DESC;

-- -------------------------------------------------------------
-- 2. VIEW: Questions with Highest Failure Rate (from attempts)
-- -------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_question_failure_rates AS
SELECT 
  a.question_id,
  COALESCE(q.prompt, 'Question: ' || a.question_id) AS prompt,
  q.type AS question_type,
  q.sub_strand_id,
  q.difficulty,
  COUNT(*)::INT AS total_attempts,
  SUM(CASE WHEN a.is_correct = false THEN 1 ELSE 0 END)::INT AS failed_attempts,
  ROUND(
    (SUM(CASE WHEN a.is_correct = false THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100.0), 
    1
  ) AS failure_rate_pct,
  ROUND(AVG(a.time_ms))::INT AS avg_time_ms
FROM public.attempts a
LEFT JOIN public.questions q ON a.question_id = q.id
GROUP BY a.question_id, q.prompt, q.type, q.sub_strand_id, q.difficulty
HAVING COUNT(*) >= 1
ORDER BY failure_rate_pct DESC, total_attempts DESC;

-- -------------------------------------------------------------
-- 3. VIEW: Lesson Completion Rates (from lesson_progress)
-- -------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_lesson_completion_rates AS
SELECT 
  lp.lesson_id,
  COUNT(DISTINCT lp.learner_id)::INT AS total_learners,
  SUM(CASE WHEN lp.completed = true THEN 1 ELSE 0 END)::INT AS completed_count,
  ROUND(
    (SUM(CASE WHEN lp.completed = true THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100.0), 
    1
  ) AS completion_rate_pct,
  ROUND(AVG(lp.score_percentage), 1) AS avg_score_pct,
  ROUND(AVG(lp.stars), 1) AS avg_stars
FROM public.lesson_progress lp
GROUP BY lp.lesson_id
ORDER BY completion_rate_pct ASC, total_learners DESC;

-- -------------------------------------------------------------
-- 4. VIEW: Daily Active Learners (from attempts)
-- -------------------------------------------------------------
CREATE OR REPLACE VIEW public.view_daily_active_learners AS
SELECT 
  DATE(a.created_at) AS activity_date,
  COUNT(DISTINCT a.learner_id)::INT AS active_learners_count,
  COUNT(*)::INT AS total_attempts,
  ROUND(
    (SUM(CASE WHEN a.is_correct = true THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100.0), 
    1
  ) AS success_rate_pct
FROM public.attempts a
GROUP BY DATE(a.created_at)
ORDER BY activity_date DESC;

-- -------------------------------------------------------------
-- 5. SECURE ADMIN-ONLY RPC FUNCTIONS (ENFORCING is_admin())
-- -------------------------------------------------------------

-- A. Get Open Problem Reports
CREATE OR REPLACE FUNCTION public.get_admin_open_reports()
RETURNS TABLE (
  report_id TEXT,
  question_id TEXT,
  prompt TEXT,
  question_type TEXT,
  sub_strand_id TEXT,
  learner_id TEXT,
  note TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    v.report_id::TEXT,
    v.question_id::TEXT,
    v.prompt::TEXT,
    v.question_type::TEXT,
    v.sub_strand_id::TEXT,
    v.learner_id::TEXT,
    v.note::TEXT,
    v.status::TEXT,
    v.created_at
  FROM public.view_open_problem_reports v;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- B. Get Question Failure Rates
CREATE OR REPLACE FUNCTION public.get_admin_question_failure_rates(p_limit INT DEFAULT 50)
RETURNS TABLE (
  question_id TEXT,
  prompt TEXT,
  question_type TEXT,
  sub_strand_id TEXT,
  difficulty TEXT,
  total_attempts INT,
  failed_attempts INT,
  failure_rate_pct NUMERIC,
  avg_time_ms INT
) AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    v.question_id::TEXT,
    v.prompt::TEXT,
    v.question_type::TEXT,
    v.sub_strand_id::TEXT,
    v.difficulty::TEXT,
    v.total_attempts,
    v.failed_attempts,
    v.failure_rate_pct,
    v.avg_time_ms
  FROM public.view_question_failure_rates v
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- C. Get Lesson Completion Rates
CREATE OR REPLACE FUNCTION public.get_admin_lesson_completion_rates()
RETURNS TABLE (
  lesson_id TEXT,
  total_learners INT,
  completed_count INT,
  completion_rate_pct NUMERIC,
  avg_score_pct NUMERIC,
  avg_stars NUMERIC
) AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    v.lesson_id::TEXT,
    v.total_learners,
    v.completed_count,
    v.completion_rate_pct,
    v.avg_score_pct,
    v.avg_stars
  FROM public.view_lesson_completion_rates v;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- D. Get Daily Active Learners
CREATE OR REPLACE FUNCTION public.get_admin_daily_active_learners(p_days INT DEFAULT 30)
RETURNS TABLE (
  activity_date DATE,
  active_learners_count INT,
  total_attempts INT,
  success_rate_pct NUMERIC
) AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    v.activity_date,
    v.active_learners_count,
    v.total_attempts,
    v.success_rate_pct
  FROM public.view_daily_active_learners v
  LIMIT p_days;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- E. Resolve Problem Report
CREATE OR REPLACE FUNCTION public.resolve_problem_report(
  p_report_id UUID,
  p_status TEXT DEFAULT 'RESOLVED'
)
RETURNS JSONB AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin role required.';
  END IF;

  UPDATE public.reports
  SET status = p_status,
      updated_at = TIMEZONE('utc'::text, NOW())
  WHERE id = p_report_id;

  RETURN jsonb_build_object(
    'success', true,
    'report_id', p_report_id,
    'status', p_status,
    'resolved_at', TIMEZONE('utc'::text, NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
