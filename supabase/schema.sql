-- ============================================================
-- Calm Content Tools — Supabase Database Schema
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hymqlijolzaimwgfevtp/sql
-- ============================================================

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    full_name text,
    email text,
    plan text default 'free' check (plan in ('free', 'starter', 'pro', 'elite')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Migration: if profiles table already exists, run this in SQL editor to update the constraint:
-- ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
-- ALTER TABLE public.profiles ADD CONSTRAINT profiles_plan_check CHECK (plan IN ('free', 'starter', 'pro', 'elite'));

-- Auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, email)
    values (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.email
    );
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Tool usage / saved outputs table
create table if not exists public.tool_outputs (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    tool_slug text not null,          -- e.g. 'hook-analyzer', 'bio-builder'
    input_text text,                  -- what the user typed in
    output_text text,                 -- the AI result
    created_at timestamptz default now()
);

-- Index for fast lookup by user
create index if not exists tool_outputs_user_id_idx on public.tool_outputs(user_id);
create index if not exists tool_outputs_tool_slug_idx on public.tool_outputs(tool_slug);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.tool_outputs enable row level security;

-- Profiles: users can only read/update their own profile
create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Tool outputs: users can only see and create their own
create policy "Users can view own outputs"
    on public.tool_outputs for select
    using (auth.uid() = user_id);

create policy "Users can insert own outputs"
    on public.tool_outputs for insert
    with check (auth.uid() = user_id);

create policy "Users can delete own outputs"
    on public.tool_outputs for delete
    using (auth.uid() = user_id);
