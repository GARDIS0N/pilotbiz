-- =============================================================================
-- Migration: 20261012_12_legal_consent_tracking.sql
-- Description: Adds legal consent audit tracking columns to public.profiles.
--              Stores the exact timestamp and policy version consented to by
--              the parent or guardian, complying with the Kenya Data Protection Act, 2019.
-- =============================================================================

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS consent_agreed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS consent_version TEXT DEFAULT '2026-10-12';

-- Index for consent audits & compliance reporting
CREATE INDEX IF NOT EXISTS idx_profiles_consent_version ON public.profiles(consent_version);

COMMENT ON COLUMN public.profiles.consent_agreed_at IS 'Audit timestamp when the parent, guardian, or authorized learner agreed to Terms of Service & Privacy Policy';
COMMENT ON COLUMN public.profiles.consent_version IS 'Legal policy version code consented to at registration (e.g. 2026-10-12)';
