import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Not used in v1 — ready for saving plans in a future feature.
// To activate: fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// in frontend/.env.local (get both values from your Supabase project dashboard
// under Settings → API).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
