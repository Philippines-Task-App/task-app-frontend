import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

// Ensure environment variables are loaded
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase URL and Anon Key are not defined in environment variables. Please check your .env file.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);