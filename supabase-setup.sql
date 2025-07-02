-- Supabase Authentication Setup for Onboarder
-- Run these commands in your Supabase SQL editor

-- 1. Enable Row Level Security on user_flows table
ALTER TABLE user_flows ENABLE ROW LEVEL SECURITY;

-- 2. Create RLS policies for user_flows table
CREATE POLICY "Users can view own flows" ON user_flows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flows" ON user_flows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flows" ON user_flows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flows" ON user_flows
  FOR DELETE USING (auth.uid() = user_id);

-- 3. Add foreign key constraint (if not already exists)
-- Uncomment if you need to add this constraint
-- ALTER TABLE user_flows 
-- ADD CONSTRAINT fk_user_flows_user_id 
-- FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Configure auth settings (optional but recommended)
-- Set password policy
UPDATE auth.config SET 
  password_min_length = 8,
  password_require_uppercase = true,
  password_require_lowercase = true,
  password_require_numbers = true;

-- Enable email confirmations
UPDATE auth.config SET confirm_email_change = true;

-- Configure rate limiting (adjust as needed)
UPDATE auth.config SET 
  rate_limit_email_sent = 10,
  rate_limit_email_sent_period = 3600;

-- 5. Verify the setup
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'user_flows';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user_flows'; 