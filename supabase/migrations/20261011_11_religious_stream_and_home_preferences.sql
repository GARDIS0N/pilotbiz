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
