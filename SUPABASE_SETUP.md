# Supabase Setup Guide

This guide walks you through setting up Supabase for the Project Idea Planner. It covers creating a project, enabling authentication, running the database schema, and wiring up your credentials. No prior Supabase experience needed!

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New project"**.
3. Choose an organisation (or create one), give your project a name, and set a strong database password — save this somewhere safe.
4. Pick the region closest to you, then click **"Create new project"**.
5. Wait a minute or two while the project provisions. You'll land on the project dashboard when it's ready.

---

## 2. Enable Email Authentication

1. In the left sidebar, click **Authentication**.
2. Go to **Providers**.
3. Find **Email** in the list and make sure **"Enable Email provider"** is toggled **ON**.
4. Leave **"Confirm email"** ON — this sends new users a verification email before they can sign in.
5. Click **Save** if prompted.

---

## 3. Run the SQL Schema

1. In the left sidebar, click **SQL Editor**.
2. Click **"New query"** (or use the blank editor that appears).
3. Open the file `supabase-setup.sql` from the root of this project and copy its entire contents.
4. Paste it into the SQL editor.
5. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
6. You should see **"Success. No rows returned."** — that means the tables and security policies were created correctly.

> **What did this do?** It created two tables:
> - `plans_history` — stores every Idea Planner result, linked to the user who generated it.
> - `repos_history` — stores every Codebase Explorer result, linked to the user who ran it.
>
> Both tables have **Row-Level Security (RLS)** enabled, which means users can only ever read or write their own rows — not anyone else's.

---

## 4. Get Your Credentials

1. In the left sidebar, click **Project Settings** (the gear icon at the bottom).
2. Go to **API**.
3. Copy two values:
   - **Project URL** — looks like `https://xyzxyzxyz.supabase.co`
   - **anon public** key — a long string under "Project API keys"

---

## 5. Add Credentials to `.env.local`

Open `frontend/.env.local` in your editor and fill in the two Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholder values with the ones you copied in the previous step.

---

## 6. Verify Everything Works

1. Stop your frontend dev server if it's running, then restart it:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open [http://localhost:3000/login](http://localhost:3000/login) in your browser.
3. Create a new account with any email and password.
4. Back in the Supabase dashboard, go to **Authentication → Users** — you should see the new user listed there.

If the user shows up, you're all set! 🎉

---

## Troubleshooting

| Problem | What to check |
|---|---|
| "Invalid API key" error in the browser | Double-check that you copied the **anon public** key (not the service role key) and that there are no extra spaces in `.env.local`. |
| User signs up but isn't redirected | Check that "Confirm email" is ON and ask the user to check their inbox for the verification link. |
| SQL Editor shows an error | Make sure you pasted the full contents of `supabase-setup.sql` and didn't accidentally cut off the last line. |
| Tables don't appear in Table Editor | Refresh the page — new tables sometimes take a moment to show up. |
