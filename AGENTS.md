# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Structure

Two separate apps — **always `cd` into the right directory before running commands**:
- `backend/` — Express + TypeScript (Node/CommonJS, ts-node for dev)
- `frontend/` — Next.js 16 + React 19 + Tailwind v4

No monorepo tooling. Each app has its own `node_modules` and `package.json`.

## Commands

```bash
# Backend
cd backend && npm run dev      # nodemon + ts-node (no compile step)
cd backend && npm run build    # tsc → dist/  (for production)
cd backend && npx tsc --noEmit # type-check only (no test runner exists)

# Frontend
cd frontend && npm run dev     # Next.js dev server on :3000
cd frontend && npm run build   # type-checks + production build
cd frontend && npm run lint    # eslint (flat config, eslint v9)
```

No test suite exists yet.

## Critical: dotenv load order in backend

`backend/src/index.ts` uses `import 'dotenv/config'` as the **first line** — before all other imports. This is intentional: `aiService.ts` reads `process.env.AI_API_KEY` at module initialisation time (Groq client constructor). Moving `dotenv` any later breaks env loading silently.

## AI provider

- SDK: `groq-sdk` (not `openai`)
- Model: `qwen/qwen3.8-27b` — the only chat model available on this Groq key
- All AI logic is isolated to `backend/src/services/aiService.ts` — swap model or provider there only
- Backend env var is `AI_API_KEY` (not `GROQ_API_KEY` — the SDK default); it is passed explicitly via `new Groq({ apiKey: process.env.AI_API_KEY ?? '' })`

## API contract

`POST /api/generate-plan` — body `{ idea: string }`, response `{ plan: string }`.
The `plan` string uses `\n` as a step separator. `PlanDisplay.tsx` splits on `\n` and strips `Step N:` prefixes before rendering.

## Tailwind v4

Tailwind is imported via `@import "tailwindcss"` in `app/globals.css` — **not** via `@tailwind base/components/utilities` directives (those are v3 syntax and will not work here).

## Frontend path alias

`@/*` resolves to `frontend/` root (e.g. `@/components/IdeaForm` → `frontend/components/IdeaForm.tsx`).

## Supabase

`frontend/lib/supabaseClient.ts` is set up but unused. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are empty placeholders in `.env.local`. The client initialises with empty strings without throwing.

## Environment files

| File | Purpose |
|---|---|
| `backend/.env` | `PORT`, `AI_API_KEY` — loaded by `dotenv/config` |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

Both are git-ignored. Safe-to-commit reference copies exist as `.env.example`.
