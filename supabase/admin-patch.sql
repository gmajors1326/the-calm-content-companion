-- Add admin flag to profiles table
-- Run this AFTER the main schema.sql in the Supabase SQL Editor

alter table public.profiles
    add column if not exists is_admin boolean default false;

-- Set your account as admin (run after signing up / after running the seed script)
update public.profiles
set is_admin = true
where email = 'gmajors1326@gmail.com';
