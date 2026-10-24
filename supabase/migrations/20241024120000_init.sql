-- SkillBridge backend: catalog + per-user profiles (Supabase Auth + Postgres)

create table if not exists public.skills (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.recommendations (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.skills enable row level security;
alter table public.roles enable row level security;
alter table public.recommendations enable row level security;
alter table public.quizzes enable row level security;
alter table public.profiles enable row level security;

create policy "skills_read" on public.skills for select using (true);
create policy "roles_read" on public.roles for select using (true);
create policy "recommendations_read" on public.recommendations for select using (true);
create policy "quizzes_read" on public.quizzes for select using (true);

create policy "skills_write" on public.skills
  for all to authenticated using (true) with check (true);
create policy "roles_write" on public.roles
  for all to authenticated using (true) with check (true);
create policy "recommendations_write" on public.recommendations
  for all to authenticated using (true) with check (true);
create policy "quizzes_write" on public.quizzes
  for all to authenticated using (true) with check (true);

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles
  for delete to authenticated using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, payload)
  values (
    new.id,
    jsonb_build_object(
      'id', new.id::text,
      'name', coalesce(new.raw_user_meta_data->>'name', split_part(coalesce(new.email, 'student'), '@', 1)),
      'email', coalesce(new.email, ''),
      'avatarUrl', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      'headline', 'Aspiring Specialist | Continuous Learner',
      'university', '',
      'major', '',
      'expectedGraduation', '',
      'targetRoleId', 'role-data-analyst',
      'secondaryTargetRoleIds', '[]'::jsonb,
      'weeklyStudyHours', 15,
      'grantedMentors', '[]'::jsonb,
      'skills', '[]'::jsonb,
      'goals', '[]'::jsonb,
      'historicalReadiness', '[]'::jsonb,
      'unlockedBadges', jsonb_build_array(
        jsonb_build_object(
          'id', 'b-new',
          'title', 'New Member',
          'description', 'Joined SkillBridge',
          'dateUnlocked', to_char(timezone('utc', now()), 'DD/MM/YYYY'),
          'icon', 'Sparkles'
        )
      )
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
