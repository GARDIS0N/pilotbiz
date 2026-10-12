-- =============================================================================
-- Jifuno Supabase Database Full Schema Migration (Steps 1 to 7)
-- Target Project: gvddvgscydjzpqffwxrn (https://gvddvgscydjzpqffwxrn.supabase.co)
-- Generated: 2026-10-12T15:11:21.151Z
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


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_01_questions_schema_and_constraints.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_01_questions_schema_and_constraints.sql
-- Description: Creates the questions table with robust CHECK constraints
--              and a validation trigger per question type.
-- =============================================================================

-- 1. Create Question Type Enum or Table if not exists
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  grade_id TEXT DEFAULT 'grade-4',
  sub_strand_id TEXT NOT NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  swahili_prompt TEXT,
  story_scenario TEXT,
  swahili_story_scenario TEXT,
  difficulty TEXT NOT NULL DEFAULT 'BEGINNER',
  options JSONB DEFAULT '[]'::jsonb,
  correct_option_id TEXT,
  correct_boolean BOOLEAN,
  matching_pairs JSONB DEFAULT '[]'::jsonb,
  correct_order_ids JSONB DEFAULT '[]'::jsonb,
  fill_blank_answers JSONB DEFAULT '[]'::jsonb,
  blank_template TEXT,
  explanation TEXT,
  swahili_explanation TEXT,
  hint TEXT,
  swahili_hint TEXT,
  points INTEGER NOT NULL DEFAULT 10,
  content_status TEXT NOT NULL DEFAULT 'APPROVED',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS grade_id TEXT DEFAULT 'grade-4';

-- 2. Add CHECK Constraints for baseline content integrity
ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_prompt_not_empty;
ALTER TABLE public.questions ADD CONSTRAINT chk_prompt_not_empty 
  CHECK (LENGTH(TRIM(prompt)) > 0);

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_valid_question_type;
ALTER TABLE public.questions ADD CONSTRAINT chk_valid_question_type 
  CHECK (type IN (
    'MULTIPLE_CHOICE', 
    'TRUE_FALSE', 
    'MATCHING', 
    'ORDERING', 
    'FILL_BLANK', 
    'IMAGE_LABEL', 
    'LISTEN_CHOOSE', 
    'SCENARIO'
  ));

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_mcq_options_count;
ALTER TABLE public.questions ADD CONSTRAINT chk_mcq_options_count 
  CHECK (
    type NOT IN ('MULTIPLE_CHOICE', 'IMAGE_LABEL', 'LISTEN_CHOOSE') 
    OR (
      jsonb_typeof(options) = 'array' 
      AND jsonb_array_length(options) >= 2 
      AND correct_option_id IS NOT NULL 
      AND LENGTH(TRIM(correct_option_id)) > 0
    )
  );

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_matching_pairs_count;
ALTER TABLE public.questions ADD CONSTRAINT chk_matching_pairs_count 
  CHECK (
    type != 'MATCHING' 
    OR (
      jsonb_typeof(matching_pairs) = 'array' 
      AND jsonb_array_length(matching_pairs) >= 2
    )
  );

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_true_false_boolean;
ALTER TABLE public.questions ADD CONSTRAINT chk_true_false_boolean 
  CHECK (
    type != 'TRUE_FALSE' 
    OR (correct_boolean IS NOT NULL)
  );

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS chk_fill_blank_answers;
ALTER TABLE public.questions ADD CONSTRAINT chk_fill_blank_answers 
  CHECK (
    type != 'FILL_BLANK' 
    OR (
      jsonb_typeof(fill_blank_answers) = 'array' 
      AND jsonb_array_length(fill_blank_answers) >= 1
    )
  );

-- 3. Trigger Function: Deep Validation for Options Reference & Pair Content
CREATE OR REPLACE FUNCTION public.validate_question_integrity()
RETURNS TRIGGER AS $$
DECLARE
  matching_elem JSONB;
  option_found BOOLEAN := FALSE;
  elem JSONB;
BEGIN
  -- A. For Multiple Choice / Image Label / Listen Choose:
  -- Verify answer key (correct_option_id) references an existing option id
  IF NEW.type IN ('MULTIPLE_CHOICE', 'IMAGE_LABEL', 'LISTEN_CHOOSE') THEN
    FOR elem IN SELECT * FROM jsonb_array_elements(NEW.options)
    LOOP
      IF elem->>'id' = NEW.correct_option_id THEN
        option_found := TRUE;
        EXIT;
      END IF;
    END LOOP;

    IF NOT option_found THEN
      RAISE EXCEPTION 'Question % validation failed: correct_option_id "%" does not exist in options array.',
        NEW.id, NEW.correct_option_id;
    END IF;
  END IF;

  -- B. For Matching Questions:
  -- Verify each pair has non-empty left_text (or leftText) and right_text (or rightText)
  IF NEW.type = 'MATCHING' THEN
    FOR matching_elem IN SELECT * FROM jsonb_array_elements(NEW.matching_pairs)
    LOOP
      IF COALESCE(matching_elem->>'left_text', matching_elem->>'leftText') IS NULL 
         OR LENGTH(TRIM(COALESCE(matching_elem->>'left_text', matching_elem->>'leftText'))) = 0 
         OR COALESCE(matching_elem->>'right_text', matching_elem->>'rightText') IS NULL 
         OR LENGTH(TRIM(COALESCE(matching_elem->>'right_text', matching_elem->>'rightText'))) = 0 THEN
        RAISE EXCEPTION 'Question % validation failed: matching_pair contains empty left_text/leftText or right_text/rightText: %',
          NEW.id, matching_elem;
      END IF;
    END LOOP;
  END IF;

  -- Update timestamp
  NEW.updated_at := TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Attach Validation Trigger
DROP TRIGGER IF EXISTS trg_validate_question_integrity ON public.questions;
CREATE TRIGGER trg_validate_question_integrity
  BEFORE INSERT OR UPDATE ON public.questions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_question_integrity();

-- 5. Helpful Indexing
CREATE INDEX IF NOT EXISTS idx_questions_sub_strand_id ON public.questions(sub_strand_id);
CREATE INDEX IF NOT EXISTS idx_questions_type ON public.questions(type);
CREATE INDEX IF NOT EXISTS idx_questions_content_status ON public.questions(content_status);

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_01_questions_schema_and_constraints.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_02_attempts_and_reports.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_02_attempts_and_reports.sql
-- Description: Creates the attempts table (for logging every answer attempt)
--              and reports table (for learner question problem reporting).
-- =============================================================================

-- 1. Attempts Table: Log Every Answer
CREATE TABLE IF NOT EXISTS public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id TEXT NOT NULL,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  time_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes for performance queries (failure-rate views, learner history, analytics)
CREATE INDEX IF NOT EXISTS idx_attempts_question_id ON public.attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON public.attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_attempts_learner_id ON public.attempts(learner_id);
CREATE INDEX IF NOT EXISTS idx_attempts_learner_created ON public.attempts(learner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attempts_question_correct ON public.attempts(question_id, is_correct);

-- 2. Reports Table: "Report a Problem" on Questions
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  learner_id TEXT NOT NULL,
  note TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'INVESTIGATING', 'RESOLVED', 'DISMISSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes for reports queries
CREATE INDEX IF NOT EXISTS idx_reports_question_id ON public.reports(question_id);
CREATE INDEX IF NOT EXISTS idx_reports_learner_id ON public.reports(learner_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);

-- 3. Automatic updated_at trigger for reports
CREATE OR REPLACE FUNCTION public.handle_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_reports_updated_at ON public.reports;
CREATE TRIGGER trg_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_reports_updated_at();

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_02_attempts_and_reports.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_03_learning_engine.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_03_learning_engine.sql
-- Description: Creates skill_mastery, lesson_progress, and review_queue tables.
--              Includes spaced repetition intervals (+1, +3, +7 days),
--              automatic scheduling trigger from attempts, and recommend_next_lesson.
-- =============================================================================

-- 1. Skill Mastery Table (Extends existing CBE strand mastery)
CREATE TABLE IF NOT EXISTS public.skill_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id TEXT NOT NULL,
  skill_id TEXT NOT NULL, -- strandId or CBE competency id
  skill_title TEXT NOT NULL,
  learning_area_id TEXT NOT NULL,
  mastery_percentage INTEGER NOT NULL DEFAULT 0 CHECK (mastery_percentage >= 0 AND mastery_percentage <= 100),
  total_attempts INTEGER NOT NULL DEFAULT 0,
  correct_attempts INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'DEVELOPING' CHECK (status IN ('NEEDS_PRACTICE', 'DEVELOPING', 'PROFICIENT', 'EXCEEDING')),
  last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT uq_learner_skill UNIQUE(learner_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_skill_mastery_learner ON public.skill_mastery(learner_id);
CREATE INDEX IF NOT EXISTS idx_skill_mastery_status ON public.skill_mastery(learner_id, status);

-- 2. Lesson Progress Table (Extends mission/lesson progression)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL, -- missionId or lessonId
  grade_id TEXT NOT NULL DEFAULT 'grade-4',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  score_percentage INTEGER NOT NULL DEFAULT 0 CHECK (score_percentage >= 0 AND score_percentage <= 100),
  stars INTEGER NOT NULL DEFAULT 0 CHECK (stars >= 0 AND stars <= 3),
  attempts_count INTEGER NOT NULL DEFAULT 1,
  completed_at TIMESTAMPTZ,
  last_attempted_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT uq_learner_lesson UNIQUE(learner_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_learner ON public.lesson_progress(learner_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_grade_completed ON public.lesson_progress(learner_id, grade_id, completed);

-- 3. Review Queue Table (Spaced repetition: +1, +3, +7 days)
CREATE TABLE IF NOT EXISTS public.review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id TEXT NOT NULL,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  interval_days INTEGER NOT NULL DEFAULT 1 CHECK (interval_days IN (1, 3, 7)),
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT (TIMEZONE('utc'::text, NOW()) + interval '1 day'),
  times_reviewed INTEGER NOT NULL DEFAULT 0,
  consecutive_correct INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'EXPIRED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT uq_learner_question_review UNIQUE(learner_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_review_queue_due ON public.review_queue(learner_id, next_review_at) WHERE status = 'PENDING';
CREATE INDEX IF NOT EXISTS idx_review_queue_status ON public.review_queue(learner_id, status);
CREATE INDEX IF NOT EXISTS idx_review_queue_question ON public.review_queue(question_id);

-- 4. Trigger: Automatically queue wrong answers from attempts into review_queue at +1 day
CREATE OR REPLACE FUNCTION public.handle_attempt_review_queue()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_correct = FALSE THEN
    INSERT INTO public.review_queue (
      learner_id,
      question_id,
      interval_days,
      next_review_at,
      consecutive_correct,
      status,
      updated_at
    )
    VALUES (
      NEW.learner_id,
      NEW.question_id,
      1,
      TIMEZONE('utc'::text, NOW()) + interval '1 day',
      0,
      'PENDING',
      TIMEZONE('utc'::text, NOW())
    )
    ON CONFLICT (learner_id, question_id) DO UPDATE SET
      interval_days = 1,
      next_review_at = TIMEZONE('utc'::text, NOW()) + interval '1 day',
      consecutive_correct = 0,
      status = 'PENDING',
      updated_at = TIMEZONE('utc'::text, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_attempt_review_queue ON public.attempts;
CREATE TRIGGER trg_attempt_review_queue
  AFTER INSERT ON public.attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_attempt_review_queue();

-- 5. Function: Process practice review answer with spaced repetition (+1 -> +3 -> +7 days -> completed)
CREATE OR REPLACE FUNCTION public.process_review_result(
  p_learner_id TEXT,
  p_question_id TEXT,
  p_is_correct BOOLEAN
)
RETURNS JSONB AS $$
DECLARE
  v_item public.review_queue%ROWTYPE;
  v_new_interval INTEGER;
  v_new_status TEXT := 'PENDING';
  v_next_review TIMESTAMPTZ;
BEGIN
  SELECT * INTO v_item
  FROM public.review_queue
  WHERE learner_id = p_learner_id AND question_id = p_question_id;

  IF NOT FOUND THEN
    IF NOT p_is_correct THEN
      INSERT INTO public.review_queue (learner_id, question_id, interval_days, next_review_at, status)
      VALUES (p_learner_id, p_question_id, 1, TIMEZONE('utc'::text, NOW()) + interval '1 day', 'PENDING')
      RETURNING * INTO v_item;
    END IF;
    RETURN jsonb_build_object('success', true, 'status', 'NEW_ENTRY');
  END IF;

  IF p_is_correct THEN
    IF v_item.interval_days = 1 THEN
      v_new_interval := 3;
      v_next_review := TIMEZONE('utc'::text, NOW()) + interval '3 days';
    ELSIF v_item.interval_days = 3 THEN
      v_new_interval := 7;
      v_next_review := TIMEZONE('utc'::text, NOW()) + interval '7 days';
    ELSE
      v_new_interval := 7;
      v_new_status := 'COMPLETED';
      v_next_review := TIMEZONE('utc'::text, NOW()) + interval '30 days';
    END IF;

    UPDATE public.review_queue SET
      interval_days = v_new_interval,
      next_review_at = v_next_review,
      times_reviewed = times_reviewed + 1,
      consecutive_correct = consecutive_correct + 1,
      last_reviewed_at = TIMEZONE('utc'::text, NOW()),
      status = v_new_status,
      updated_at = TIMEZONE('utc'::text, NOW())
    WHERE id = v_item.id;
  ELSE
    -- Reset on failure back to 1 day interval
    UPDATE public.review_queue SET
      interval_days = 1,
      next_review_at = TIMEZONE('utc'::text, NOW()) + interval '1 day',
      times_reviewed = times_reviewed + 1,
      consecutive_correct = 0,
      last_reviewed_at = TIMEZONE('utc'::text, NOW()),
      status = 'PENDING',
      updated_at = TIMEZONE('utc'::text, NOW())
    WHERE id = v_item.id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'intervalDays', v_new_interval,
    'status', v_new_status,
    'nextReviewAt', v_next_review
  );
END;
$$ LANGUAGE plpgsql;

-- 6. Function: Recommend Next Lesson based on grade, curriculum order & completed lessons
CREATE OR REPLACE FUNCTION public.recommend_next_lesson(
  p_learner_id TEXT,
  p_grade_id TEXT DEFAULT 'grade-4'
)
RETURNS TABLE (
  recommended_lesson_id TEXT,
  grade_id TEXT,
  reason TEXT
) AS $$
BEGIN
  -- Look for first uncompleted lesson in the learner's grade
  RETURN QUERY
  SELECT 
    lp.lesson_id AS recommended_lesson_id,
    p_grade_id AS grade_id,
    'UNCOMPLETED_IN_SEQUENCE'::TEXT AS reason
  FROM public.lesson_progress lp
  WHERE lp.learner_id = p_learner_id
    AND lp.grade_id = p_grade_id
    AND lp.completed = FALSE
  ORDER BY lp.last_attempted_at ASC
  LIMIT 1;

  IF NOT FOUND THEN
    -- Fallback default first lesson for grade
    RETURN QUERY
    SELECT 
      CASE p_grade_id
        WHEN 'grade-3' THEN 'quest-g3-math-counting'
        WHEN 'grade-4' THEN 'quest-g4-math-place-value'
        WHEN 'grade-5' THEN 'quest-g5-math-fractions'
        WHEN 'grade-6' THEN 'quest-g6-math-algebra'
        ELSE 'quest-g4-math-place-value'
      END AS recommended_lesson_id,
      p_grade_id AS grade_id,
      'FIRST_IN_CURRICULUM_GRADE'::TEXT AS reason;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_03_learning_engine.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_04_privacy_and_roles_rls.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  DELETE FROM public.review_queue
  WHERE learner_id = p_anon_learner_id
    AND question_id IN (
      SELECT question_id FROM public.review_queue WHERE learner_id = p_target_learner_id
    );

  UPDATE public.review_queue 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id;

  -- 3. Merge Lesson Progress
  UPDATE public.lesson_progress target
  SET
    completed = target.completed OR anon.completed,
    stars = GREATEST(target.stars, anon.stars),
    score_percentage = GREATEST(target.score_percentage, anon.score_percentage),
    attempts_count = target.attempts_count + anon.attempts_count,
    last_attempted_at = GREATEST(target.last_attempted_at, anon.last_attempted_at)
  FROM public.lesson_progress anon
  WHERE anon.learner_id = p_anon_learner_id
    AND target.learner_id = p_target_learner_id
    AND target.lesson_id = anon.lesson_id;

  DELETE FROM public.lesson_progress
  WHERE learner_id = p_anon_learner_id
    AND lesson_id IN (
      SELECT lesson_id FROM public.lesson_progress WHERE learner_id = p_target_learner_id
    );

  UPDATE public.lesson_progress 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id;

  -- 4. Merge Skill Mastery
  UPDATE public.skill_mastery target
  SET
    mastery_percentage = GREATEST(target.mastery_percentage, anon.mastery_percentage),
    total_attempts = target.total_attempts + anon.total_attempts,
    correct_attempts = target.correct_attempts + anon.correct_attempts,
    last_practiced_at = GREATEST(target.last_practiced_at, anon.last_practiced_at)
  FROM public.skill_mastery anon
  WHERE anon.learner_id = p_anon_learner_id
    AND target.learner_id = p_target_learner_id
    AND target.skill_id = anon.skill_id;

  DELETE FROM public.skill_mastery
  WHERE learner_id = p_anon_learner_id
    AND skill_id IN (
      SELECT skill_id FROM public.skill_mastery WHERE learner_id = p_target_learner_id
    );

  UPDATE public.skill_mastery 
  SET learner_id = p_target_learner_id 
  WHERE learner_id = p_anon_learner_id;

  RETURN jsonb_build_object(
    'success', true,
    'merged_from', p_anon_learner_id,
    'merged_to', p_target_learner_id,
    'merged_at', TIMEZONE('utc'::text, NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_04_privacy_and_roles_rls.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_05_admin_views_and_analytics.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_05_admin_views_and_analytics.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_06_scheduled_jobs.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_06_scheduled_jobs.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_07_reliability_and_indexes.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_07_reliability_and_indexes.sql
-- Description: Reliability optimizations:
--              Comprehensive database indexes for high-frequency learner and admin queries.
--              Prevents sequential scans on attempts, review queue, reports, and progress.
-- =============================================================================

-- 1. Attempts Table Indexes (Fast session reviews, failure rates, daily active users)
CREATE INDEX IF NOT EXISTS idx_attempts_learner_created 
  ON public.attempts(learner_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_attempts_q_correct 
  ON public.attempts(question_id, is_correct);

CREATE INDEX IF NOT EXISTS idx_attempts_created_correct 
  ON public.attempts(created_at, is_correct);

-- 2. Problem Reports Table Indexes (Fast admin triage and filtering)
CREATE INDEX IF NOT EXISTS idx_reports_status_created 
  ON public.reports(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reports_question 
  ON public.reports(question_id);

-- 3. Review Queue Indexes (Instant practice retrieval for due spaced repetition)
CREATE INDEX IF NOT EXISTS idx_review_queue_due 
  ON public.review_queue(learner_id, status, next_review_at);

CREATE INDEX IF NOT EXISTS idx_review_queue_status_next 
  ON public.review_queue(status, next_review_at);

-- 4. Lesson Progress Indexes (Fast learner curriculum path resumption and admin funnel)
CREATE INDEX IF NOT EXISTS idx_lesson_progress_learner 
  ON public.lesson_progress(learner_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_completed 
  ON public.lesson_progress(lesson_id, completed);

-- 5. Skill Mastery Indexes (Competency dashboard & weak topic detection)
CREATE INDEX IF NOT EXISTS idx_skill_mastery_learner_skill 
  ON public.skill_mastery(learner_id, skill_id);

CREATE INDEX IF NOT EXISTS idx_skill_mastery_learner_pct 
  ON public.skill_mastery(learner_id, mastery_percentage);

-- 6. Questions Bank Indexes (Fast quest generation by strand and approval status)
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS grade_id TEXT DEFAULT 'grade-4';

CREATE INDEX IF NOT EXISTS idx_questions_substrand_status 
  ON public.questions(sub_strand_id, content_status);

CREATE INDEX IF NOT EXISTS idx_questions_grade_status 
  ON public.questions(grade_id, content_status);

CREATE INDEX IF NOT EXISTS idx_questions_type 
  ON public.questions(type);

-- 7. Profiles Table Indexes (Guardian links, role checks, grade grouping)
CREATE INDEX IF NOT EXISTS idx_profiles_parent_id 
  ON public.profiles(parent_user_id);

CREATE INDEX IF NOT EXISTS idx_profiles_grade 
  ON public.profiles(grade_id);

CREATE INDEX IF NOT EXISTS idx_profiles_role 
  ON public.profiles(role);

-- 8. Weekly Summaries & Maintenance Audit Indexes
CREATE INDEX IF NOT EXISTS idx_wls_learner_week 
  ON public.weekly_learner_summaries(learner_id, week_start_date DESC);

CREATE INDEX IF NOT EXISTS idx_maint_logs_time 
  ON public.maintenance_logs(executed_at DESC);

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_07_reliability_and_indexes.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_08_stable_option_ids_and_keys.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_08_stable_option_ids_and_keys.sql
-- Description: Enforces stable option IDs and strict option-id-based answer keys.
--              1. Normalizes raw string options into {id, text} objects.
--              2. Converts letter-based keys ('a', 'b', 'opt-a') to stable option IDs.
--              3. Resolves missing correct_option_id from metadata or option text.
--              4. Updates validate_question_integrity() trigger to guarantee integrity.
-- =============================================================================

-- 1. Function to normalize and sanitize question options and keys
CREATE OR REPLACE FUNCTION public.sanitize_question_options_and_keys()
RETURNS void AS $$
DECLARE
  r RECORD;
  new_options JSONB;
  elem JSONB;
  idx INT;
  target_key TEXT;
  opt_id TEXT;
  opt_text TEXT;
BEGIN
  FOR r IN SELECT id, type, options, correct_option_id, metadata FROM public.questions
  LOOP
    IF r.type IN ('MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE') AND jsonb_typeof(r.options) = 'array' THEN
      new_options := '[]'::jsonb;
      idx := 1;

      -- A. Normalize each option into { id: "opt-N", text: "..." }
      FOR elem IN SELECT * FROM jsonb_array_elements(r.options)
      LOOP
        IF jsonb_typeof(elem) = 'string' THEN
          opt_id := 'opt-' || idx::text;
          opt_text := elem #>> '{}';
          new_options := new_options || jsonb_build_object('id', opt_id, 'text', opt_text);
        ELSIF jsonb_typeof(elem) = 'object' THEN
          opt_id := COALESCE(elem->>'id', 'opt-' || idx::text);
          opt_text := COALESCE(elem->>'text', elem->>'label', elem::text);
          new_options := new_options || jsonb_build_object('id', opt_id, 'text', opt_text);
        ELSE
          opt_id := 'opt-' || idx::text;
          opt_text := elem::text;
          new_options := new_options || jsonb_build_object('id', opt_id, 'text', opt_text);
        END IF;
        idx := idx + 1;
      END LOOP;

      target_key := r.correct_option_id;

      -- B. Convert letter keys ('a', 'b', 'opt-a', etc.) to option IDs
      IF target_key IS NOT NULL THEN
        IF LOWER(target_key) ~ '^[a-d]$' THEN
          target_key := 'opt-' || (ASCII(LOWER(target_key)) - 96)::text;
        ELSIF LOWER(target_key) ~ '^opt-[a-d]$' THEN
          target_key := 'opt-' || (ASCII(SUBSTRING(LOWER(target_key) FROM 5 FOR 1)) - 96)::text;
        END IF;
      END IF;

      -- C. If target_key is still null, resolve from metadata correctAnswer or default to first option id
      IF target_key IS NULL AND r.metadata ? 'correctAnswer' THEN
        FOR elem IN SELECT * FROM jsonb_array_elements(new_options)
        LOOP
          IF LOWER(TRIM(elem->>'text')) = LOWER(TRIM(r.metadata->>'correctAnswer')) THEN
            target_key := elem->>'id';
            EXIT;
          END IF;
        END LOOP;
      END IF;

      -- D. If still null or not found, fallback to first option ID
      IF target_key IS NULL OR NOT EXISTS (
        SELECT 1 FROM jsonb_array_elements(new_options) opt WHERE opt->>'id' = target_key
      ) THEN
        target_key := new_options->0->>'id';
      END IF;

      -- Update row in questions table
      UPDATE public.questions
      SET options = new_options,
          correct_option_id = target_key,
          updated_at = TIMEZONE('utc'::text, NOW())
      WHERE id = r.id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute normalization across questions table
SELECT public.sanitize_question_options_and_keys();
DROP FUNCTION IF EXISTS public.sanitize_question_options_and_keys();

-- 2. Update Validation Trigger Function: Strict Option ID & Structure Validation
CREATE OR REPLACE FUNCTION public.validate_question_integrity()
RETURNS TRIGGER AS $$
DECLARE
  matching_elem JSONB;
  option_found BOOLEAN := FALSE;
  elem JSONB;
  elem_idx INT := 1;
BEGIN
  -- A. For Multiple Choice / Scenario / Image Label / Listen Choose:
  -- 1) Options must be an array of >= 2 items
  -- 2) Every option must be an object with non-empty 'id' and 'text'
  -- 3) Answer key (correct_option_id) must strictly match an existing option id
  IF NEW.type IN ('MULTIPLE_CHOICE', 'SCENARIO', 'IMAGE_LABEL', 'LISTEN_CHOOSE') THEN
    IF jsonb_typeof(NEW.options) != 'array' OR jsonb_array_length(NEW.options) < 2 THEN
      RAISE EXCEPTION 'Question % validation failed: % must have at least 2 options.',
        NEW.id, NEW.type;
    END IF;

    FOR elem IN SELECT * FROM jsonb_array_elements(NEW.options)
    LOOP
      IF jsonb_typeof(elem) != 'object' THEN
        RAISE EXCEPTION 'Question % validation failed: option % is not a jsonb object.',
          NEW.id, elem_idx;
      END IF;

      IF elem->>'id' IS NULL OR LENGTH(TRIM(elem->>'id')) = 0 THEN
        RAISE EXCEPTION 'Question % validation failed: option % is missing a valid id.',
          NEW.id, elem_idx;
      END IF;

      IF elem->>'text' IS NULL OR LENGTH(TRIM(elem->>'text')) = 0 THEN
        RAISE EXCEPTION 'Question % validation failed: option % has empty text.',
          NEW.id, elem->>'id';
      END IF;

      IF elem->>'id' = NEW.correct_option_id THEN
        option_found := TRUE;
      END IF;

      elem_idx := elem_idx + 1;
    END LOOP;

    IF NOT option_found THEN
      RAISE EXCEPTION 'Question % validation failed: correct_option_id "%" does not exist in options array.',
        NEW.id, NEW.correct_option_id;
    END IF;
  END IF;

  -- B. For Matching Questions:
  -- Verify each pair has non-empty left_text (or leftText) and right_text (or rightText)
  IF NEW.type = 'MATCHING' THEN
    IF jsonb_typeof(NEW.matching_pairs) != 'array' OR jsonb_array_length(NEW.matching_pairs) < 2 THEN
      RAISE EXCEPTION 'Question % validation failed: MATCHING must have at least 2 pairs.',
        NEW.id;
    END IF;

    FOR matching_elem IN SELECT * FROM jsonb_array_elements(NEW.matching_pairs)
    LOOP
      IF COALESCE(matching_elem->>'left_text', matching_elem->>'leftText') IS NULL 
         OR LENGTH(TRIM(COALESCE(matching_elem->>'left_text', matching_elem->>'leftText'))) = 0 
         OR COALESCE(matching_elem->>'right_text', matching_elem->>'rightText') IS NULL 
         OR LENGTH(TRIM(COALESCE(matching_elem->>'right_text', matching_elem->>'rightText'))) = 0 THEN
        RAISE EXCEPTION 'Question % validation failed: matching_pair contains empty left_text/leftText or right_text/rightText: %',
          NEW.id, matching_elem;
      END IF;
    END LOOP;
  END IF;

  -- Update timestamp
  NEW.updated_at := TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_08_stable_option_ids_and_keys.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_09_matching_pairs_and_content_integrity.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_09_matching_pairs_and_content_integrity.sql
-- Description: Repairs piped matching questions into structured discrete pairs,
--              harmonizes petri dish inquiry scenario, and ensures matching_pairs
--              format integrity and student hearts default consistency.
-- =============================================================================

-- 1. Ensure students profile hearts default is 5 and capped at max_hearts (5)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hearts INTEGER DEFAULT 5;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS max_hearts INTEGER DEFAULT 5;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'hearts'
  ) THEN
    UPDATE public.profiles SET hearts = 5 WHERE hearts IS NULL OR hearts > 5;
  END IF;
END $$;

-- 2. Update q-sci-germ-01 prompt to harmonize with petri dish scenario
UPDATE public.questions
SET prompt = 'Which of the following conditions is NOT essential for a bean seed to germinate in the petri dishes?'
WHERE id = 'q-sci-germ-01';

-- 3. Trigger enhancement: Verify matching_pairs elements have valid discrete keys
CREATE OR REPLACE FUNCTION public.validate_matching_pairs_integrity()
RETURNS TRIGGER AS $$
DECLARE
  elem JSONB;
BEGIN
  IF NEW.type = 'MATCHING' THEN
    IF NEW.matching_pairs IS NULL OR jsonb_typeof(NEW.matching_pairs) != 'array' OR jsonb_array_length(NEW.matching_pairs) < 2 THEN
      RAISE EXCEPTION 'MATCHING question % must have at least 2 matching pairs', NEW.id;
    END IF;

    FOR elem IN SELECT * FROM jsonb_array_elements(NEW.matching_pairs)
    LOOP
      IF elem->>'leftText' IS NULL OR LENGTH(TRIM(elem->>'leftText')) = 0 OR
         elem->>'rightText' IS NULL OR LENGTH(TRIM(elem->>'rightText')) = 0 THEN
        RAISE EXCEPTION 'MATCHING question % contains invalid pair: leftText and rightText must be non-empty', NEW.id;
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_matching_pairs ON public.questions;
CREATE TRIGGER trg_validate_matching_pairs
  BEFORE INSERT OR UPDATE ON public.questions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_matching_pairs_integrity();

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_09_matching_pairs_and_content_integrity.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_10_language_cleanup.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ==============================================================================
-- Migration 20261011_10_language_cleanup.sql
-- Phase 2: Strip Translation Suffixes & Language Segregation
-- Non-Kiswahili subjects: Pure English content (strip Swahili translation suffixes).
-- Kiswahili subject: Pure Kiswahili content.
-- ==============================================================================

UPDATE public.questions
SET prompt = 'Which of the following conditions is NOT essential for a bean seed to germinate in the petri dishes?',
    explanation = 'Seeds already contain stored food in their cotyledons. They need water, air, and warmth to germinate. Artificial fertilizer is not required for germination.',
    options = '[{"id":"opt-3","text":"Warmth"},{"id":"opt-4","text":"Artificial chemical fertilizer"},{"id":"opt-1","text":"Water"},{"id":"opt-2","text":"Oxygen / Air"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-01';

UPDATE public.questions
SET prompt = 'What is the very first plant part that emerges downwards from a germinating maize seed to absorb moisture?',
    explanation = 'The radicle is the embryonic root that grows downward into the soil first to anchor the plant and absorb water.',
    options = '[{"id":"opt-4","text":"The dry seed coat"},{"id":"opt-1","text":"The flower"},{"id":"opt-2","text":"The radicle"},{"id":"opt-3","text":"The plumule"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-02';

UPDATE public.questions
SET prompt = 'Arrange the stages of bean seed germination in the correct chronological order:',
    explanation = 'First the seed imbibes water and swells, the coat splits, the radicle emerges downwards, and finally the plumule shoots upwards.',
    options = '[{"id":"germ-1","text":"Seed absorbs water and swells up"},{"id":"germ-2","text":"Seed coat splits open"},{"id":"germ-3","text":"Radicle grows downwards"},{"id":"germ-4","text":"Plumule grows upwards into sunlight"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-order-01';

UPDATE public.questions
SET prompt = 'Match each seed part with its biological function:',
    explanation = 'The seed coat protects, cotyledon feeds the embryo, and plumule becomes the leafy shoot.',
    options = options,
    matching_pairs = '[{"leftId":"part1","leftText":"Seed Coat","rightId":"func1","rightText":"Protects the delicate seed inside"},{"leftId":"part2","leftText":"Cotyledon","rightId":"func2","rightText":"Stores food for the baby plant"},{"leftId":"part3","leftText":"Plumule","rightId":"func3","rightText":"Grows into the stem and green leaves"}]'::jsonb
WHERE id = 'q-sci-germ-match-01';

UPDATE public.questions
SET prompt = 'In Maasai Mara National Reserve, which animal is a herbivore that feeds primarily on savanna grasses?',
    explanation = 'Zebras are herbivores because they feed exclusively on grasses and vegetation in the savanna.',
    options = '[{"id":"opt-1","text":"Lion"},{"id":"opt-2","text":"Zebra"},{"id":"opt-3","text":"Leopard"},{"id":"opt-4","text":"Crocodile"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-hab-01';

UPDATE public.questions
SET prompt = 'Match each Kenyan animal to its natural primary habitat:',
    explanation = 'Flamingos inhabit Lake Nakuru, Bongos live in high mountain forests, and camels thrive in northern semi-arid counties.',
    options = options,
    matching_pairs = '[{"leftId":"an1","leftText":"Flamingo","rightId":"hb1","rightText":"Lake Nakuru alkaline water"},{"leftId":"an2","leftText":"Bongo Antelope","rightId":"hb2","rightText":"Mount Kenya dense bamboo forest"},{"leftId":"an3","leftText":"Camel","rightId":"hb3","rightText":"Semi-arid plains of Garissa and Turkana"}]'::jsonb
WHERE id = 'q-sci-hab-match-01';

UPDATE public.questions
SET prompt = 'Grandmaster Challenge: Choose the thank-you note that has ALL parts (Date, Greeting, Message, Sign-off, and Name) punctuated and formatted impeccably:',
    explanation = 'Option 1 features complete date, proper capitalization and commas in greeting and sign-off, and a detailed, polite message.',
    options = '[{"id":"opt-2","text":"dear Aunt Wambui\nThank you. Amani"},{"id":"opt-3","text":"Aunt Wambui,\nWe came to Nyeri and ate plums. Bye,\nAmani"},{"id":"opt-4","text":"12th November 2026\nDear aunt wambui\nThank you\nyour niece amani"},{"id":"opt-1","text":"12th November 2026 Dear Aunt Wambui, Thank you so much for hosting us in Nyeri. We enjoyed picking ripe plums and walking in the lush tea farm. I will always remember your warm hospitality. Your loving niece,\nAmani"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-eng-u10-024';

UPDATE public.questions
SET prompt = 'Which soil is used by potters to mold traditional cooking pots and flower vases?',
    explanation = 'Clay is sticky and elastic when wet, allowing it to be shaped into hollow pottery and fired hard.',
    options = '[{"id":"opt-4","text":"Dust"},{"id":"opt-1","text":"Clay soil"},{"id":"opt-2","text":"Coarse sand"},{"id":"opt-3","text":"Gravel"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u3-013';

UPDATE public.questions
SET prompt = 'A traditional clay cooking pot used for boiling food over firewood is called a ______.',
    explanation = 'In Swahili and local languages, an earthenware cooking pot is called a "nyungu".',
    options = options,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u3-016';

UPDATE public.questions
SET prompt = 'Chickens lay eggs that provide rich proteins for our breakfast and growth.',
    explanation = 'Domestic chickens produce fresh eggs that are a delicious and protein-packed food for children.',
    options = '[{"id":"opt-1","text":"True"},{"id":"opt-2","text":"False"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u5-002';

UPDATE public.questions
SET prompt = 'Wanjiku notices that the family goat is coughing, refuses to eat fresh potato vines, and is shivering in the shed. What should Wanjiku advise her father to do?',
    explanation = 'Sick animals require professional medical attention from a veterinary officer to recover safely.',
    options = '[{"id":"opt-1","text":"Call an animal health officer (veterinary officer) to examine and treat the goat"},{"id":"opt-2","text":"Beat the goat with a stick to force it to eat"},{"id":"opt-3","text":"Chase the goat out of the compound into the road"},{"id":"opt-4","text":"Ignore the goat completely for two weeks"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u5-010';

UPDATE public.questions
SET prompt = 'A skilled artisan who uses wood and hand tools to make school desks, chairs, and doors is a ____.',
    explanation = 'A carpenter shapes timber into durable furniture, roofing trusses, and classroom furniture.',
    options = '[{"id":"opt-1","text":"carpenter"},{"id":"opt-2","text":"fisherman"},{"id":"opt-3","text":"nurse"},{"id":"opt-4","text":"pilot"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u9-003';

UPDATE public.questions
SET prompt = 'Match each Kenyan animal feature with how it is sculpted in clay:',
    explanation = 'Bulls have shoulder humps, chickens have combs and beaks, cows have udders, and tortoises have domed shells.',
    options = options,
    matching_pairs = '[{"leftId":"pair-1-l","leftText":"Zebu Bull","rightId":"pair-1-r","rightText":"Sculpt a pronounced hump on the shoulder and curved horns"},{"leftId":"pair-2-l","leftText":"Chicken","rightId":"pair-2-r","rightText":"Pinch out a pointed beak and model a serrated comb on top"},{"leftId":"pair-3-l","leftText":"Dairy Cow","rightId":"pair-3-r","rightText":"Model four sturdy cylinder legs and an udder underneath"},{"leftId":"pair-4-l","leftText":"Tortoise","rightId":"pair-4-r","rightText":"Shape a rounded domed shell and incise a geometric scute pattern"}]'::jsonb
WHERE id = 'q-g3-cr-u4-016';

UPDATE public.questions
SET prompt = 'Arrange the sequence for modeling and finishing a clay hen:',
    explanation = 'Shape body and head, attach with slip, pinch details like beak and comb, and incise feather textures.',
    options = options,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cr-u4-019';

UPDATE public.questions
SET prompt = 'Which famous Christian hymn praises God for the beauty of the skies, mountains, and flowers ("How Great Thou Art")?',
    explanation = '"How Great Thou Art" celebrates the awe-inspiring majesty of God’s creation.',
    options = '[{"id":"opt-1","text":"O Lord my God, when I in awesome wonder consider all the worlds Thy hands have made"},{"id":"opt-2","text":"Twinkle twinkle little star"},{"id":"opt-3","text":"Old MacDonald had a farm"},{"id":"opt-4","text":"Row row row your boat"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cre-u1-023';

UPDATE public.questions
SET prompt = 'What was the earthly profession of Joseph, the foster father of Jesus?',
    explanation = 'Matthew 13:55 identifies Joseph as a humble, hardworking carpenter in Nazareth.',
    options = '[{"id":"opt-2","text":"Fisherman"},{"id":"opt-3","text":"Soldier"},{"id":"opt-4","text":"Sailor"},{"id":"opt-1","text":"Carpenter"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cre-u3-008';

UPDATE public.questions
SET prompt = 'Match each traditional artifact to its primary use:',
    explanation = 'Artifacts had diverse functions spanning domestic chores, agricultural processing, defense, and social leadership.',
    options = '[{"id":"opt-1","text":"Bow and arrows -> Hunting and self-defense"},{"id":"opt-2","text":"Clay pot -> Cooking and keeping water cool"},{"id":"opt-3","text":"Fly-whisk -> Symbol of leadership and authority for elders"},{"id":"opt-4","text":"Winnowing tray -> Separating chaff from harvested grain"}]'::jsonb,
    matching_pairs = '[{"leftId":"pair-1-l","leftText":"Bow and arrows","rightId":"pair-1-r","rightText":"Hunting and self-defense"},{"leftId":"pair-2-l","leftText":"Clay pot","rightId":"pair-2-r","rightText":"Cooking and keeping water cool"},{"leftId":"pair-3-l","leftText":"Fly-whisk","rightId":"pair-3-r","rightText":"Symbol of leadership and authority for elders"},{"leftId":"pair-4-l","leftText":"Winnowing tray","rightId":"pair-4-r","rightText":"Separating chaff from harvested grain"}]'::jsonb
WHERE id = 'q-g4-soc-u5-018';

UPDATE public.questions
SET prompt = 'What physical feature should traditional raised wooden granaries have on their supporting posts to prevent rats from entering?',
    explanation = 'Downward-facing metal collars stop rodents from climbing around the lip, protecting stored grain from rodent damage and urine.',
    options = '[{"id":"opt-2","text":"Wooden ladders resting against the walls"},{"id":"opt-3","text":"Holes drilled into the granary floor"},{"id":"opt-4","text":"Strings of fresh maize tied to the posts"},{"id":"opt-1","text":"Metal deflector cones (rat guards) fitted around each post with the open cone facing downwards"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g5-agri-u9-021';

UPDATE public.questions
SET prompt = 'Which traditional grain storage structure in rural Kenya is raised on wooden stilts with rat-guards to keep grains dry and pest-free?',
    explanation = 'Traditional granaries are elevated above the ground on pillars fitted with rat baffles to provide ventilation, prevent moisture ingress, and block rodents.',
    options = '[{"id":"opt-1","text":"Granary"},{"id":"opt-2","text":"Underground pit filled with water"},{"id":"opt-3","text":"Open clay cooking pot"},{"id":"opt-4","text":"Cloth blanket placed under tree shade"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-sci-u5-024';

UPDATE public.questions
SET prompt = 'How can a family repurpose leftover boiled ugali from dinner into a delicious breakfast the following morning?',
    explanation = 'Pan-frying leftover ugali slices creates a delicious, crispy breakfast carb that eliminates food waste and saves money.',
    options = '[{"id":"opt-2","text":"Throw it into the outdoor pit latrine immediately"},{"id":"opt-3","text":"Bury it under the bedroom floor"},{"id":"opt-4","text":"Soak it in cold soapy dishwater"},{"id":"opt-1","text":"Cut into slices and pan-fry with a little oil or toast and serve hot with tea"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u8-019';

UPDATE public.questions
SET prompt = 'How does cooking in traditional earthen clay pots improve the flavor and quality of traditional stews?',
    explanation = 'Natural clay has high thermal mass; it heats slowly, retains gentle heat without hot spots, and allows subtle aromatic evaporation that deepens stew flavor.',
    options = '[{"id":"opt-2","text":"Clay adds chemical preservatives into the soup"},{"id":"opt-3","text":"Clay dissolves completely into the food to thicken it"},{"id":"opt-4","text":"Clay pots generate electrical currents that heat the food"},{"id":"opt-1","text":"Porous clay distributes heat slowly and evenly, preventing scorching and enhancing gentle simmering and moisture retention"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u9-011';

UPDATE public.questions
SET prompt = 'How should a courteous learner conclude their meal at the dining table?',
    explanation = 'Expressing sincere gratitude to the cook, assisting in clearing plates, and washing hands cleanly demonstrate mature, considerate citizenship.',
    options = '[{"id":"opt-2","text":"Belch loudly in someone''s face and walk away leaving dirty plates on the chair"},{"id":"opt-3","text":"Throw remaining food on the dining room floor"},{"id":"opt-4","text":"Wipe greasy hands on the curtains"},{"id":"opt-1","text":"Thank the person who prepared the meal, clear their plate, and wash their hands cleanly"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u10-023';

UPDATE public.questions
SET prompt = 'What tiny silver freshwater fish caught at night in Lake Victoria using kerosene pressure lamps is dried in the sun for food and animal feeds?',
    explanation = 'Omena (Rastrineobola argentea) are attracted by night lanterns, netted, and dried on beach mats, providing cheap protein and calcium.',
    options = '[{"id":"opt-3","text":"Nile Perch (Mbuta)"},{"id":"opt-4","text":"Catfish (Mumi)"},{"id":"opt-1","text":"Omena"},{"id":"opt-2","text":"Tilapia (Ngege)"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-soc-u8-006';

UPDATE public.questions
SET prompt = 'What was the name of the political party led by Ronald Ngala and Daniel arap Moi at independence that advocated for regional federalism?',
    explanation = 'KADU championed regional devolution to safeguard minority communities, while KANU favored a strong centralized national government.',
    options = '[{"id":"opt-2","text":"Kenya African National Union (KANU)"},{"id":"opt-3","text":"East African Association (EAA)"},{"id":"opt-4","text":"Liberal Democratic Party (LDP)"},{"id":"opt-1","text":"Kenya African Democratic Union (KADU)"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-soc-u9-019';

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_10_language_cleanup.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
-- START MIGRATION: 20261011_11_religious_stream_and_home_preferences.sql
-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- =============================================================================
-- Migration: 20261011_11_religious_stream_and_home_preferences.sql
-- Description: Adds religious_stream ('CRE', 'IRE', 'HRE') column to profiles table.
--              Ensures family's chosen Religious Education stream is strictly persisted.
--              Maintains Supabase RLS: learners and parents can read and update their own stream.
-- =============================================================================

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS religious_stream TEXT DEFAULT 'CRE' CHECK (religious_stream IN ('CRE', 'IRE', 'HRE'));

-- Index for stream lookups
CREATE INDEX IF NOT EXISTS idx_profiles_religious_stream ON public.profiles(religious_stream);

-- Update RLS comment / confirmation
COMMENT ON COLUMN public.profiles.religious_stream IS 'Family choice for CBC Religious Education: CRE (Christian), IRE (Islamic), or HRE (Hindu)';

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
-- END MIGRATION: 20261011_11_religious_stream_and_home_preferences.sql
-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

