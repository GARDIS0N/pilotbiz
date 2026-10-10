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
