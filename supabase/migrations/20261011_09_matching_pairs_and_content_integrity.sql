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
