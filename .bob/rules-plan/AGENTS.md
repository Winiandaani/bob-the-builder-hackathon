# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Non-obvious architectural constraints

- **Two fully separate apps, no shared code** — `backend/` and `frontend/` share nothing: no shared types package, no shared utilities. The API contract (`{ idea: string }` → `{ plan: string }`) is the only interface between them. Any shared type must be duplicated.

- **CORS is hardcoded to `http://localhost:3000`** in `backend/src/index.ts` — adding a staging or production frontend URL requires updating this explicitly. There is no env-driven CORS config.

- **The Groq client is a module-level singleton** — `const groq = new Groq(...)` runs once at import time in `aiService.ts`. Swapping API keys at runtime (e.g. per-user keys) is not supported by the current architecture.

- **No middleware layer** — the Express app has no auth, rate-limiting, or request logging middleware. Adding these must go into `backend/src/index.ts` before the route registration line `app.use('/api', planRouter)`.

- **Supabase is frontend-only** — `supabaseClient.ts` is in `frontend/lib/`. Any future database work (e.g. saving plans) goes through the Supabase JS client directly from the frontend; there is no backend database layer.

- **`PlanDisplay` is stateless and has no loading state** — loading UX is owned entirely by `IdeaForm` (disabled textarea + "Generating…" button). `PlanDisplay` renders nothing when `plan` is empty string.
