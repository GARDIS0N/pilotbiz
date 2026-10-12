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
