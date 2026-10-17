# Jifuno Environments & Operations Guide

This document describes the environment separation, deployment lifecycle, configuration management, and monitoring for Jifuno.

---

## 1. Environment Topology

| Environment | Purpose | URL / Host | Branch | Database |
| :--- | :--- | :--- | :--- | :--- |
| **Development** | Local testing & coding | `http://localhost:3000` | Any local branch | Local fallback / Supabase Dev |
| **Preview** | Automated PR verification | `https://jifuno-git-<branch>.vercel.app` | Feature PRs (`feature/*`) | Supabase Staging |
| **Production** | Live learner application | `https://jifuno.vercel.app` (or custom domain) | `main` | Supabase Production |

---

## 2. CI/CD Lifecycle (GitHub Actions + Vercel)

1. **Pull Request Workflow**:
   - Every push to a feature branch with an open PR triggers the `.github/workflows/ci.yml` pipeline.
   - Pipeline steps:
     1. `npm run audit:questions` (verifies 8,700+ CBE question keys and positional balance).
     2. `npm run lint` (`tsc --noEmit` strict type check).
     3. `npm test` (all unit, integration, and e2e suites).
     4. `npm run build` (production Vite bundle build).
   - If any step fails, merge is blocked.
   - Concurrently, Vercel creates an isolated **Preview Deployment** linked in the PR comments for manual QA.

2. **Production Deployment**:
   - Merging an approved PR into `main` automatically triggers Vercel Production Deployment.
   - Build command: `npm run build`
   - Output directory: `dist/`
   - Serverless functions: `api/index.ts` handles all `/api/*` requests.

---

## 3. Environment Variables Reference

| Variable | Scope | Required | Purpose |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Browser (`VITE_`) | Yes | Supabase API endpoint for browser client |
| `VITE_SUPABASE_ANON_KEY` | Browser (`VITE_`) | Yes | Supabase anonymous public key |
| `SUPABASE_URL` | Serverless (`/api/*`) | Yes | Supabase endpoint for server operations |
| `SUPABASE_ANON_KEY` | Serverless (`/api/*`) | Yes | Supabase anonymous key for server operations |
| `SUPABASE_SERVICE_ROLE_KEY` | Serverless (`/api/*`) | Optional | Admin key for privileged cron/backup operations (NEVER expose to client) |
| `GEMINI_API_KEY` | Serverless (`/api/*`) | Yes | Google Gemini key for Socratic AI Tutor |
| `ALERT_WEBHOOK_URL` | Serverless (`/api/*`) | Recommended | Webhook for error rate spikes and uptime alerts (WhatsApp/Slack/Discord) |
| `CRON_SECRET` | Serverless (`/api/*`) | Recommended | Secret token in `Authorization: Bearer <token>` to trigger `/api/cron/*` |
| `ALLOWED_ORIGINS` | Serverless (`/api/*`) | No | Comma-separated list of CORS origins |
| `APP_URL` | Server & Browser | No | Canonical production URL (default: `https://jifuno.vercel.app`) |

---

## 4. Setting Environment Variables in Vercel

1. Open **Vercel Dashboard** > Select Project `jifuno`.
2. Go to **Settings** > **Environment Variables**.
3. Add variables and specify environments:
   - Check **Production** for production values.
   - Check **Preview** for preview PR test keys.
   - Check **Development** for pulling via `vercel env pull`.
