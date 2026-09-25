# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Non-obvious coding rules

- **`import 'dotenv/config'` must stay as the first import in `backend/src/index.ts`** — the Groq client in `aiService.ts` reads `process.env.AI_API_KEY` at import time (constructor runs before any request). Any reordering silently breaks env loading.

- **Groq SDK requires explicit `apiKey`** — pass `process.env.AI_API_KEY ?? ''` to `new Groq({...})`. Omitting it makes the SDK throw at startup if the var name isn't `GROQ_API_KEY` (its built-in default).

- **Backend is CommonJS (`"module": "commonjs"`)** — use `require`-compatible patterns in backend. Do not add `"type": "module"` to `backend/package.json`.

- **Frontend uses `"module": "esnext"` + `"moduleResolution": "bundler"`** — no `require()` calls in frontend code; ESM only.

- **`'use client'` is required on any frontend file using React hooks** — `app/page.tsx`, `components/IdeaForm.tsx` are client components. `components/PlanDisplay.tsx` has no hooks and is a server component (no directive needed).

- **Tailwind v4 syntax only** — `@import "tailwindcss"` in `globals.css`, not `@tailwind` directives. Class names are standard utility classes; no `tailwind.config.ts` content customisation exists yet.

- **`@/*` alias resolves to `frontend/` root** — e.g. `import { fetchPlan } from '@/lib/api'`. Never use relative `../../` paths from inside `app/` or `components/`.

- **No test runner is configured** — use `npx tsc --noEmit` (backend) and `npm run build` (frontend) for validation.
