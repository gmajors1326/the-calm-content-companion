-- ============================================================
-- Calm Content Tools — Supabase Auth Callback Route
-- This file documents the auth flow for reference
-- ============================================================

-- After email confirmation, Supabase redirects to:
-- /auth/callback?code=xxx
-- The route handler exchanges the code for a session.
