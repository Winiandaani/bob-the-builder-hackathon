-- Table: plans_history
-- Stores Idea Planner results linked to a user
create table if not exists plans_history (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  idea       text not null,
  plan       text not null,
  created_at timestamptz not null default now()
);

-- Enable Row-Level Security
alter table plans_history enable row level security;

-- Policy: users can only see their own rows
create policy "Users can read their own plans"
  on plans_history for select
  using (auth.uid() = user_id);

-- Policy: users can only insert their own rows
create policy "Users can insert their own plans"
  on plans_history for insert
  with check (auth.uid() = user_id);

-- Table: repos_history
-- Stores Codebase Explorer results linked to a user
create table if not exists repos_history (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  repo_url    text not null,
  repo_name   text not null,
  analysis    text not null,  -- JSON string of { explanation, techStack, suggestedTasks }
  created_at  timestamptz not null default now()
);

-- Enable Row-Level Security
alter table repos_history enable row level security;

-- Policy: users can only see their own rows
create policy "Users can read their own repos"
  on repos_history for select
  using (auth.uid() = user_id);

-- Policy: users can only insert their own rows
create policy "Users can insert their own repos"
  on repos_history for insert
  with check (auth.uid() = user_id);
