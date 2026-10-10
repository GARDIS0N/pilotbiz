-- =============================================================================
-- Migration: 20261011_01_questions_schema_and_constraints.sql
-- Description: Creates the questions table with robust CHECK constraints
--              and a validation trigger per question type.
-- =============================================================================

-- 1. Create Question Type Enum or Table if not exists
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
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
