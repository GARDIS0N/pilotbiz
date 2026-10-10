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
