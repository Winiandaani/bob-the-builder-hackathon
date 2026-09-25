# Mission Control Upgrade Plan

## Overview

Upgrade the Project Idea Planner into a "Mission Control / Code Radar" themed multi-feature app. The existing Idea Planner backend logic is preserved exactly. Three new capabilities are added: a Codebase Explorer (GitHub repo analysis), User Accounts + History (Supabase Auth + database), and a complete visual redesign across all pages.

**Scope:**
- Backend: one new route (`/api/explore-repo`) + one new AI service function. Existing route and `aiService.ts` are untouched.
- Frontend: full visual redesign of existing page, three new pages (`/explore`, `/history`, `/login`), auth context, Supabase history saving.
- No shared code between backend/frontend — API contract only.
- Supabase tables created manually in the dashboard (SQL provided in sub-task 3).

**Confirmed decisions from user:**
- Node version: v26.2.0 — native `fetch` is available. No `node-fetch` package needed.
- Supabase project already created and `frontend/.env.local` already populated with real URL and anon key.
- History page: plan steps are **collapsed by default** with a "Show steps" toggle to expand.
- Codebase Explorer: **no login required** to use. After results display, show a themed inline prompt "Sign in to save this to your history" if the user is not authenticated.

**Non-goals:** No backend auth, no server-side rendering for protected routes beyond a client-side redirect, no file-by-file recursive GitHub fetching.

---

## Sub-Task 1 — Backend: Codebase Explorer Route

**Status:** [ ] pending

### Intent
Add a new Express route `POST /api/explore-repo` that accepts a GitHub repo URL, fetches exactly 3 pieces of public data from the GitHub REST API (repo metadata, root file tree, README), constructs a compact AI prompt, and returns a structured analysis. The existing `aiService.ts` and `/api/generate-plan` route must not be modified.

### Expected Outcomes
- `POST /api/explore-repo` with body `{ repoUrl: string }` returns `{ repoName, explanation, techStack, suggestedTasks }`.
- `explanation` is a plain-English paragraph describing what the project does.
- `techStack` is a short paragraph or bullet list of the architecture/tech stack.
- `suggestedTasks` is an array of exactly 3 strings — "good first tasks."
- Invalid or non-existent repo URLs return a clear 400 or 502 error.
- README is truncated to 3000 characters before being sent to the AI.
- File tree is root-level only (not recursive).

### Todo List
1. Create `backend/src/services/repoService.ts` — exports `fetchRepoData(repoUrl)` which makes 3 GitHub API calls (`/repos/{owner}/{repo}`, `/repos/{owner}/{repo}/contents/`, `/repos/{owner}/{repo}/readme`) using Node's built-in `fetch`, truncates README to 3000 chars, and returns `{ repoName, primaryLanguage, rootFiles, readmeExcerpt }`.
2. Add `analyzeRepo(repoData)` function to a new `backend/src/services/repoAiService.ts` (do NOT modify `aiService.ts`) — constructs an AI prompt from the repo data and calls Groq, returns parsed `{ explanation, techStack, suggestedTasks }`.
3. Create `backend/src/routes/explore.ts` — `POST /api/explore-repo` route that validates `repoUrl`, calls `fetchRepoData`, then `analyzeRepo`, returns the structured JSON.
4. Register the new router in `backend/src/index.ts` with `app.use('/api', exploreRouter)` — add it after the existing planRouter line.
5. Native `fetch` is available (Node v26.2.0). No additional packages needed. The backend `package.json` targets ES2020 — `fetch` is globally available in this Node version.

### Relevant Context
- `backend/src/services/aiService.ts` — reference for Groq client pattern. Do not modify. Instantiate a second Groq client in `repoAiService.ts` the same way, OR import the same `groq` instance if it's exported (it is not currently — keep it isolated).
- `backend/src/routes/plan.ts` — reference for route structure and error handling pattern.
- `backend/src/index.ts` line that registers planRouter — add exploreRouter immediately after it.
- GitHub public REST API base: `https://api.github.com`. No auth header needed for public repos. Add `User-Agent: project-idea-planner` header (GitHub requires a User-Agent).
- The AI prompt for repo analysis should ask for output in a specific JSON format so it can be parsed. Use `JSON.parse` on the AI response, with a fallback to returning the raw text if parsing fails.
- Model to use: `qwen/qwen3.8-27b` (same as existing — it's the only model on this Groq key).

---

## Sub-Task 2 — Frontend: Auth Context + Login Page

**Status:** [ ] pending

### Intent
Add a lightweight React context that tracks the Supabase auth session across the app, and build the login/signup page matching the Mission Control theme. The Supabase client in `frontend/lib/supabaseClient.ts` already exists — just needs real env values.

### Expected Outcomes
- `AuthContext` provides `{ user, loading, signOut }` to any component in the tree.
- `layout.tsx` wraps children in `AuthProvider`.
- `/login` page has a single form that toggles between "Sign In" and "Sign Up" mode.
- Successful login redirects to `/` (home). Successful signup shows a confirmation message (Supabase sends a verification email by default — make this UX clear).
- The login page matches the Mission Control theme (dark background, cyan/purple accents).
- A `NavBar` component is created and added to `layout.tsx` — shows the app name, links to `/`, `/explore`, `/history`, and a Sign In or Sign Out button depending on auth state.

### Todo List
1. Create `frontend/lib/auth.tsx` — exports `AuthProvider` component and `useAuth` hook. Uses `supabase.auth.getSession()` on mount and `supabase.auth.onAuthStateChange(...)` to keep state in sync.
2. Update `frontend/app/layout.tsx` — import `AuthProvider`, wrap `{children}` in it. Also import and render `NavBar` above `{children}`. Update `<html>` and font setup to use `Space Grotesk` + `Inter` from `next/font/google`.
3. Create `frontend/components/NavBar.tsx` — responsive top nav bar using Mission Control theme. Uses `useAuth` to show "Sign In" link or username + "Sign Out" button.
4. Create `frontend/app/login/page.tsx` — client component with toggle between sign-in/sign-up forms. Uses `supabase.auth.signInWithPassword` and `supabase.auth.signUp`. Shows themed error messages. Redirects on success using `useRouter`.
5. Update `frontend/app/globals.css` — replace the existing light-theme CSS variables and body styles with the Mission Control dark theme tokens (background `#050d1a`, surface `#0d1f35`, accents etc.), global font family, and the subtle CSS grid background pattern.

### Relevant Context
- `frontend/lib/supabaseClient.ts` — already exports `supabase`. Import it directly in `auth.tsx`.
- `frontend/app/layout.tsx` — currently uses Geist fonts. Replace with Space Grotesk + Inter. The `LayoutProps` type reference is unusual — check if it needs fixing (it likely should be `{ children: React.ReactNode }`).
- Supabase Auth requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` — these are already present as empty strings. The plan file will note that the user must fill these in.
- `@supabase/supabase-js` is already in `frontend/package.json` dependencies.
- No `next/navigation` redirect on the server — use `useRouter().push('/')` on the client after successful auth.

---

## Sub-Task 3 — Supabase Database Schema

**Status:** [ ] pending

### Intent
Define the two database tables and their Row-Level Security policies. This sub-task produces SQL that the user runs in the Supabase dashboard SQL editor — no code changes. It also documents what env vars the user needs to set.

### Expected Outcomes
- `plans_history` table exists with correct columns and RLS.
- `repos_history` table exists with correct columns and RLS.
- RLS policies ensure users can only read and write their own rows.
- The user has a clear checklist of Supabase dashboard steps to follow.

### Todo List
1. Write a `supabase-setup.sql` file at the project root with the full SQL for both tables, primary keys, foreign keys to `auth.users`, `created_at` defaults, and RLS policies (`ENABLE ROW LEVEL SECURITY`, `CREATE POLICY` for SELECT and INSERT with `user_id = auth.uid()`).
2. Add a `SUPABASE_SETUP.md` file at the project root that explains in simple steps: (a) create a Supabase project, (b) enable Email auth in Authentication → Providers, (c) run the SQL file in the SQL editor, (d) copy the project URL and anon key into `frontend/.env.local`.

### Relevant Context
- Supabase is frontend-only per AGENTS.md — no backend database access.
- `auth.users` is Supabase's built-in user table. Foreign keys reference it as `REFERENCES auth.users(id)`.
- The `user_id` column must match the type of `auth.users.id` which is `uuid`.
- RLS policy for INSERT: `WITH CHECK (auth.uid() = user_id)`. For SELECT: `USING (auth.uid() = user_id)`.

---

## Sub-Task 4 — Visual Redesign: Home Page + Shared Components

**Status:** [ ] pending

### Intent
Redesign the existing home page (`/`) and its components (`IdeaForm`, `PlanDisplay`) to match the Mission Control theme — without changing any of the functional logic. The `handleSubmit` function, API call, and state management in `page.tsx` stay exactly the same.

### Expected Outcomes
- Home page has the Mission Control dark theme.
- `IdeaForm` uses styled textarea with cyan focus ring, styled submit button with hover/press animation.
- `PlanDisplay` shows steps as themed cards (dark surface, numbered badge in cyan/purple) instead of a plain list.
- A "scanning" animation (pulsing concentric rings) shows while `isLoading` is true, replacing the plain "Generating…" button text with this animation above the button.
- Page load has a fade+slide-in animation on the main content.
- The page title and subtitle are updated to match the new brand.
- All functional props and logic in `IdeaForm.tsx` and `PlanDisplay.tsx` remain identical — only className and markup change.

### Todo List
1. Create `frontend/components/ScanningAnimation.tsx` — a purely CSS-animated component (no external library) with 3 concentric rings that pulse outward and fade. Shown when `isLoading` is true.
2. Redesign `frontend/components/IdeaForm.tsx` — update all Tailwind class names to Mission Control theme. Keep all props, state, and event handlers identical. Add `ScanningAnimation` above the button when `isLoading`.
3. Redesign `frontend/components/PlanDisplay.tsx` — update class names. Each step becomes a dark-surface card with a glowing numbered badge. Keep the same split/filter/map logic.
4. Redesign `frontend/app/page.tsx` — update wrapper `className`, heading text, subtitle text. Keep all state and handler logic identical.
5. Add keyframe animations to `frontend/app/globals.css` — `@keyframes fadeSlideIn` for page load, `@keyframes ping-ring` for the scanning animation rings.

### Relevant Context
- `IdeaForm.tsx` props interface `{ onSubmit, isLoading }` must not change — `page.tsx` calls it the same way.
- `PlanDisplay.tsx` prop `{ plan: string }` must not change.
- Tailwind v4 is used — class names work as normal utility classes. Custom animations go in `globals.css` as `@keyframes` and are referenced via `animation` utility or inline `style` prop.
- The scanning animation should only appear when `isLoading === true` — controlled by the parent `page.tsx` passing `isLoading` to `IdeaForm`.

---

## Sub-Task 5 — Frontend: Codebase Explorer Page

**Status:** [ ] pending

### Intent
Build the `/explore` page that lets users paste a GitHub repo URL, triggers the backend `/api/explore-repo` endpoint, shows a themed scanning animation during processing, and displays results as structured cards (explanation, tech stack, suggested tasks). If the user is logged in, the result is saved to `repos_history`.

### Expected Outcomes
- `/explore` page matches the Mission Control theme.
- URL input is validated (must start with `https://github.com/`).
- During loading, the scanning/radar animation plays.
- Results display as three distinct cards: "What it does", "Tech Stack", "Suggested First Tasks" (as a numbered list).
- If user is logged in, result is automatically saved to Supabase `repos_history` after display.
- If user is **not** logged in, results are still shown, but an inline themed prompt appears: "Sign in to save this to your history."
- Errors (invalid URL, repo not found, GitHub rate limit) show as themed error messages.

### Todo List
1. Create `frontend/lib/repoApi.ts` — `fetchRepoAnalysis(repoUrl: string)` function that POSTs to `${NEXT_PUBLIC_API_URL}/api/explore-repo` and returns the typed response `{ repoName, explanation, techStack, suggestedTasks }`.
2. Create `frontend/app/explore/page.tsx` — client component with URL input, submit handler, loading/error state, and result rendering. Uses `ScanningAnimation` during loading. Uses `useAuth` to conditionally save to Supabase after success.
3. Create `frontend/components/RepoResultCards.tsx` — presentational component that takes `{ repoName, explanation, techStack, suggestedTasks }` and renders three themed cards. `suggestedTasks` renders as a numbered list with themed badges.

### Relevant Context
- `frontend/lib/api.ts` — reference pattern for the fetch helper function.
- `frontend/components/ScanningAnimation.tsx` — reuse from sub-task 4.
- `supabase.from('repos_history').insert({ user_id: user.id, repo_url, repo_name, analysis })` — `analysis` can be `JSON.stringify({ explanation, techStack, suggestedTasks })`.
- The `useAuth` hook from `frontend/lib/auth.tsx` provides `user`.

---

## Sub-Task 6 — Frontend: History Page

**Status:** [ ] pending

### Intent
Build the `/history` page that shows a logged-in user's past plans and explored repos in reverse chronological order. If not logged in, redirect to `/login`.

### Expected Outcomes
- Unauthenticated users are redirected to `/login` immediately.
- Two sections: "Plan History" and "Repo Explorations", each in reverse chronological order.
- Each plan history item shows the idea text and the full plan (collapsible or truncated with "expand" toggle).
- Each repo history item shows the repo name, URL, and the explanation text.
- Empty states are shown with a helpful message if a section has no entries.
- Page matches Mission Control theme.

### Todo List
1. Create `frontend/app/history/page.tsx` — client component. On mount, check `useAuth` — if `!user && !loading`, call `router.push('/login')`. Fetch both tables from Supabase ordered by `created_at desc`. Render two sections.
2. Create `frontend/components/HistoryCard.tsx` — reusable themed card component used for both plan history items and repo history items. Accepts a `type` prop (`'plan' | 'repo'`) and renders accordingly. Plan cards have a collapsible steps list.

### Relevant Context
- Supabase queries: `supabase.from('plans_history').select('*').order('created_at', { ascending: false })`.
- The `useAuth` hook's `loading` flag prevents a flash of redirect before the session is known — wait until `!loading` before checking `!user`.
- `frontend/components/PlanDisplay.tsx` logic for splitting plan text by `\n` can be reused inside `HistoryCard` for plan items.

---

## Pre-Implementation Checklist for the User

Before running the agent on any sub-task, the user must:

1. **Create a Supabase project** at supabase.com (free tier is fine).
2. **Enable Email auth**: Supabase dashboard → Authentication → Providers → Email → Enable.
3. **Run `supabase-setup.sql`** in the Supabase SQL editor (created in sub-task 3).
4. **Fill in `frontend/.env.local`**:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. **Check Node version** (`node --version`) — if < 18, the backend needs `node-fetch` added.

## New npm Packages Required

**Backend:**
- No new packages needed. Node v26.2.0 has native `fetch` globally available.

**Frontend:**
- No new packages needed. `@supabase/supabase-js` already installed. Fonts loaded via `next/font/google` (no install needed).
