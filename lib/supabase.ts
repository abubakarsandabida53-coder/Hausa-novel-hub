import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The site can run as a design preview before Supabase is configured.
// Database-backed features must not be treated as live until credentials are added.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
