-- Supabase schema + RLS policies for Vibella
-- Path: /supabase/schema_and_policies.sql
-- Run this in Supabase SQL editor (Project > SQL) or via psql using service_role key.

-- Ensure extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- Profiles
-- =========================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text DEFAULT '',
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- helper trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Automatically create a profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Try to create a friendly username from the email if present
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    CASE WHEN NEW.email IS NOT NULL THEN split_part(NEW.email, '@', 1) ELSE NEW.id::text END,
    NULL,
    ''
  )
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users (fires after a new user signs up)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_auth_user();

-- =========================
-- Posts
-- =========================
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text,
  image_url text,
  tags text[] DEFAULT ARRAY[]::text[],
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER posts_set_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- =========================
-- Likes
-- =========================
CREATE TABLE IF NOT EXISTS public.likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, post_id)
);

-- Optional trigger to maintain posts.like_count
CREATE OR REPLACE FUNCTION public.increment_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE public.posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS likes_after_insert ON public.likes;
CREATE TRIGGER likes_after_insert
AFTER INSERT OR DELETE ON public.likes
FOR EACH ROW EXECUTE PROCEDURE public.increment_post_like_count();

-- =========================
-- Comments
-- =========================
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Optional trigger to maintain posts.comment_count
CREATE OR REPLACE FUNCTION public.increment_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE public.posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS comments_after_insert ON public.comments;
CREATE TRIGGER comments_after_insert
AFTER INSERT OR DELETE ON public.comments
FOR EACH ROW EXECUTE PROCEDURE public.increment_post_comment_count();

-- =========================
-- Follows
-- =========================
CREATE TABLE IF NOT EXISTS public.follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (follower_id, following_id)
);

-- =========================
-- Habits
-- =========================
CREATE TABLE IF NOT EXISTS public.habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER habits_set_updated_at
BEFORE UPDATE ON public.habits
FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- =========================
-- Challenges
-- =========================
CREATE TABLE IF NOT EXISTS public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  creator_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now()
);

-- =========================
-- Row Level Security: enable + policies
-- =========================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles: allow select to everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Profiles: allow insert for authenticated users" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles: allow update for owner" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles: allow delete for owner" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Posts: allow select" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Posts: insert by owner" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Posts: update/delete by owner" ON public.posts
  FOR UPDATE, DELETE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes: allow select" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "Likes: insert by owner" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Likes: delete by owner" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments: allow select" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "Comments: insert by owner" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Comments: update/delete by owner" ON public.comments
  FOR UPDATE, DELETE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows: allow select" ON public.follows
  FOR SELECT USING (true);

CREATE POLICY "Follows: insert by owner" ON public.follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Follows: delete by owner" ON public.follows
  FOR DELETE USING (auth.uid() = follower_id);

-- Habits policies
CREATE POLICY "Habits: allow select" ON public.habits
  FOR SELECT USING (true);

CREATE POLICY "Habits: insert by owner" ON public.habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Habits: update/delete by owner" ON public.habits
  FOR UPDATE, DELETE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Challenges policies
CREATE POLICY "Challenges: allow select" ON public.challenges
  FOR SELECT USING (true);

CREATE POLICY "Challenges: insert by creator" ON public.challenges
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Challenges: update/delete by creator" ON public.challenges
  FOR UPDATE, DELETE USING (auth.uid() = creator_id) WITH CHECK (auth.uid() = creator_id);

-- =========================
-- Storage policies (recommended) - adjust bucket name if you create a different one
-- These policies allow authenticated users to insert/delete their own objects
-- Note: Supabase's storage schema is storage.objects and uses bucket_id and owner
-- =========================
-- Example for a bucket named 'public' (change as needed)
--
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Storage: allow read to everyone" ON storage.objects
--   FOR SELECT USING (bucket_id = 'public');
--
-- CREATE POLICY "Storage: allow upload for owner" ON storage.objects
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
--
-- CREATE POLICY "Storage: allow delete by owner" ON storage.objects
--   FOR DELETE USING (auth.role() = 'authenticated' AND owner = auth.uid());

-- =========================
-- Indexes
-- =========================
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts (user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments (post_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON public.likes (post_id);

-- End of schema

-- Notes / next steps:
-- 1) After applying this SQL, configure CORS and client keys in Vercel:
--    NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (client-safe).
-- 2) Add SUPABASE_SERVICE_ROLE_KEY as a server-only env var for server API routes.
-- 3) Create a storage bucket (e.g. 'public' or 'avatars') in Supabase Storage for images and adapt policies above.
-- 4) You can extend the profile trigger to copy metadata from NEW.raw_user_meta_data if you collect display name during signup.
