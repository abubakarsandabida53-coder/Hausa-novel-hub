-- Hausa Novels Hub: initial multilingual schema foundation.
-- Run this in Supabase SQL Editor only after reviewing it.
create extension if not exists pgcrypto;

create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  native_name text not null,
  text_direction text not null default 'ltr' check (text_direction in ('ltr','rtl')),
  is_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  preferred_interface_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  display_name text not null,
  biography text,
  avatar_url text,
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  language_id uuid references public.languages(id),
  created_at timestamptz not null default now()
);

create table if not exists public.novels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  author_id uuid references public.authors(id) on delete set null,
  language_id uuid not null references public.languages(id),
  category_id uuid references public.categories(id) on delete set null,
  cover_url text,
  access_level text not null default 'free' check (access_level in ('free','premium')),
  publication_status text not null default 'draft' check (publication_status in ('draft','pending','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.novel_translations (
  id uuid primary key default gen_random_uuid(),
  original_novel_id uuid not null references public.novels(id) on delete cascade,
  translated_novel_id uuid not null unique references public.novels(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  review_status text not null default 'pending' check (review_status in ('pending','approved','rejected')),
  unique (original_novel_id, translated_novel_id),
  check (original_novel_id <> translated_novel_id)
);

create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels(id) on delete cascade,
  chapter_number integer not null check (chapter_number > 0),
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  unique (novel_id, chapter_number)
);

create table if not exists public.audiobooks (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid references public.novels(id) on delete set null,
  title text not null,
  language_id uuid not null references public.languages(id),
  narrator text,
  cover_url text,
  access_level text not null default 'free' check (access_level in ('free','premium')),
  publication_status text not null default 'draft' check (publication_status in ('draft','pending','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.audio_chapters (
  id uuid primary key default gen_random_uuid(),
  audiobook_id uuid not null references public.audiobooks(id) on delete cascade,
  chapter_number integer not null check (chapter_number > 0),
  title text not null,
  storage_path text not null,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  unique (audiobook_id, chapter_number)
);

create index if not exists novels_language_status_idx on public.novels(language_id, publication_status);
create index if not exists audiobooks_language_status_idx on public.audiobooks(language_id, publication_status);
create index if not exists chapters_novel_number_idx on public.chapters(novel_id, chapter_number);

alter table public.languages enable row level security;
alter table public.profiles enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.novels enable row level security;
alter table public.novel_translations enable row level security;
alter table public.chapters enable row level security;
alter table public.audiobooks enable row level security;
alter table public.audio_chapters enable row level security;

-- Public users can read enabled languages and published catalogue content.
create policy "Anyone can read enabled languages" on public.languages
for select using (is_enabled = true);
create policy "Anyone can read published novels" on public.novels
for select using (publication_status = 'published');
create policy "Anyone can read chapters of published novels" on public.chapters
for select using (exists (select 1 from public.novels n where n.id = novel_id and n.publication_status = 'published'));
create policy "Anyone can read published audiobooks" on public.audiobooks
for select using (publication_status = 'published');
create policy "Anyone can read chapters of published audiobooks" on public.audio_chapters
for select using (exists (select 1 from public.audiobooks a where a.id = audiobook_id and a.publication_status = 'published'));
create policy "Anyone can read categories" on public.categories
for select using (true);
create policy "Anyone can read approved authors" on public.authors
for select using (approval_status = 'approved');

-- Users can view and update only their own profile.
create policy "Users can read own profile" on public.profiles
for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

-- Admin write policies and server-side role checks will be added with the admin_roles
-- migration. Do not expose service-role keys in the browser.
