-- =============================================================================
-- Migration: 20261011_04_privacy_and_roles_rls.sql
-- Description: Enables Row Level Security (RLS) on EVERY table.
--              Learners read and write only their own rows.
--              Reports are INSERT-ONLY for learners.
--              Defines roles (learner, parent, teacher, admin).
--              Creates minimal child profile schema and simple data deletion path.
--              Includes anonymous-to-authenticated progress merging function.
-- =============================================================================

-- 1. Profiles Table (Minimal Child Data: grade, optional school name, parent link)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'learner' CHECK (role IN ('learner', 'parent', 'teacher', 'admin')),
  display_name TEXT NOT NULL DEFAULT 'Learner',
  grade_id TEXT NOT NULL DEFAULT 'grade-4',
  school_name TEXT, -- Optional school name (minimal child data)
  avatar TEXT NOT NULL DEFAULT 'cheetah',
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Under-13 guardian link
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_parent ON public.profiles(parent_user_id);

-- 2. Security Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    COALESCE(auth.jwt() ->> 'role', '') = 'service_role' OR
    COALESCE(auth.jwt() ->> 'role', '') = 'admin' OR
    COALESCE(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_parent_of(child_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = child_uuid AND parent_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- 4. RLS POLICIES PER TABLE
-- -------------------------------------------------------------

-- A. QUESTIONS
DROP POLICY IF EXISTS questions_select_all ON public.questions;
CREATE POLICY questions_select_all ON public.questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS questions_admin_insert ON public.questions;
CREATE POLICY questions_admin_insert ON public.questions
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS questions_admin_update ON public.questions;
CREATE POLICY questions_admin_update ON public.questions
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS questions_admin_delete ON public.questions;
CREATE POLICY questions_admin_delete ON public.questions
  FOR DELETE USING (public.is_admin());

-- B. ATTEMPTS
-- Learners can log their attempts; Learners only select their own attempts
DROP POLICY IF EXISTS attempts_insert ON public.attempts;
CREATE POLICY attempts_insert ON public.attempts
  FOR INSERT WITH CHECK (
    learner_id = auth.uid()::text OR 
    auth.uid() IS NULL OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS attempts_select ON public.attempts;
CREATE POLICY attempts_select ON public.attempts
  FOR SELECT USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

-- C. REPORTS (Insert-Only for Learners; Admin reads and updates)
DROP POLICY IF EXISTS reports_insert_learner ON public.reports;
CREATE POLICY reports_insert_learner ON public.reports
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS reports_select_admin ON public.reports;
CREATE POLICY reports_select_admin ON public.reports
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS reports_update_admin ON public.reports;
CREATE POLICY reports_update_admin ON public.reports
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS reports_delete_admin ON public.reports;
CREATE POLICY reports_delete_admin ON public.reports
  FOR DELETE USING (public.is_admin());

-- D. SKILL MASTERY
DROP POLICY IF EXISTS skill_mastery_select ON public.skill_mastery;
CREATE POLICY skill_mastery_select ON public.skill_mastery
  FOR SELECT USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS skill_mastery_insert ON public.skill_mastery;
CREATE POLICY skill_mastery_insert ON public.skill_mastery
  FOR INSERT WITH CHECK (
    learner_id = auth.uid()::text OR 
    auth.uid() IS NULL OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS skill_mastery_update ON public.skill_mastery;
CREATE POLICY skill_mastery_update ON public.skill_mastery
  FOR UPDATE USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

-- E. LESSON PROGRESS
DROP POLICY IF EXISTS lesson_progress_select ON public.lesson_progress;
CREATE POLICY lesson_progress_select ON public.lesson_progress
  FOR SELECT USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS lesson_progress_insert ON public.lesson_progress;
CREATE POLICY lesson_progress_insert ON public.lesson_progress
  FOR INSERT WITH CHECK (
    learner_id = auth.uid()::text OR 
    auth.uid() IS NULL OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS lesson_progress_update ON public.lesson_progress;
CREATE POLICY lesson_progress_update ON public.lesson_progress
  FOR UPDATE USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

-- F. REVIEW QUEUE
DROP POLICY IF EXISTS review_queue_select ON public.review_queue;
CREATE POLICY review_queue_select ON public.review_queue
  FOR SELECT USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS review_queue_insert ON public.review_queue;
CREATE POLICY review_queue_insert ON public.review_queue
  FOR INSERT WITH CHECK (
    learner_id = auth.uid()::text OR 
    auth.uid() IS NULL OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS review_queue_update ON public.review_queue;
CREATE POLICY review_queue_update ON public.review_queue
  FOR UPDATE USING (
    learner_id = auth.uid()::text OR 
    public.is_admin()
  );

-- G. PROFILES
DROP POLICY IF EXISTS profiles_select ON public.profiles;
CREATE POLICY profiles_select ON public.profiles
  FOR SELECT USING (
    id = auth.uid() OR 
    public.is_parent_of(id) OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS profiles_insert ON public.profiles;
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT WITH CHECK (
    id = auth.uid() OR 
    public.is_admin()
  );

DROP POLICY IF EXISTS profiles_update ON public.profiles;
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE USING (
    id = auth.uid() OR 
    public.is_admin()
  );

-- -------------------------------------------------------------
-- 5. SIMPLE DATA DELETION PATH (COPPA / GDPR / Kenya DPA)
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.delete_learner_data(p_learner_id TEXT DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  v_target_id TEXT;
BEGIN
  -- If admin provided target, allow; otherwise delete caller's own data
  IF public.is_admin() AND p_learner_id IS NOT NULL THEN
    v_target_id := p_learner_id;
  ELSE
    v_target_id := auth.uid()::text;
  END IF;

  IF v_target_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated or missing target learner ID for data deletion.';
  END IF;

  -- Purge all learner data across tables
  DELETE FROM public.attempts WHERE learner_id = v_target_id;
  DELETE FROM public.review_queue WHERE learner_id = v_target_id;
  DELETE FROM public.skill_mastery WHERE learner_id = v_target_id;
  DELETE FROM public.lesson_progress WHERE learner_id = v_target_id;
  DELETE FROM public.reports WHERE learner_id = v_target_id;
  DELETE FROM public.profiles WHERE id::text = v_target_id;

  RETURN jsonb_build_object(
    'success', true,
    'deleted_learner_id', v_target_id,
    'message', 'All learner data permanently deleted.',
    'deleted_at', TIMEZONE('utc'::text, NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------
-- 6. ANONYMOUS SIGN-IN MERGE FUNCTION
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.merge_anonymous_progress(
  p_anon_learner_id TEXT,
  p_target_learner_id TEXT
)
RETURNS JSONB AS $$
BEGIN
  IF p_anon_learner_id IS NULL OR p_target_learner_id IS NULL THEN
    RAISE EXCEPTION 'Both p_anon_learner_id and p_target_learner_id are required.';
  END IF;

  -- 1. Merge Attempts
  UPDATE public.attempts 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id;

  -- 2. Merge Review Queue
  UPDATE public.review_queue 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id
  ON CONFLICT (learner_id, question_id) DO NOTHING;

  -- 3. Merge Lesson Progress
  UPDATE public.lesson_progress 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id
  ON CONFLICT (learner_id, lesson_id) DO UPDATE SET
    completed = EXCLUDED.completed,
    stars = GREATEST(public.lesson_progress.stars, EXCLUDED.stars),
    score_percentage = GREATEST(public.lesson_progress.score_percentage, EXCLUDED.score_percentage);

  -- 4. Merge Skill Mastery
  UPDATE public.skill_mastery 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id
  ON CONFLICT (learner_id, skill_id) DO UPDATE SET
    mastery_percentage = GREATEST(public.skill_mastery.mastery_percentage, EXCLUDED.mastery_percentage),
    total_attempts = public.skill_mastery.total_attempts + EXCLUDED.total_attempts,
    correct_attempts = public.skill_mastery.correct_attempts + EXCLUDED.correct_attempts;

  RETURN jsonb_build_object(
    'success', true,
    'merged_from', p_anon_learner_id,
    'merged_to', p_target_learner_id,
    'merged_at', TIMEZONE('utc'::text, NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
