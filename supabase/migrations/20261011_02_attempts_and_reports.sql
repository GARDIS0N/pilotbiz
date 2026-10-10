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
