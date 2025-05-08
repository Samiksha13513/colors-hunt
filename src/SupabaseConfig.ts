// import { createClient } from '@supabase/supabase-js';
// const project = import.meta.env.VITE_SUPABASE_PROJECT_URL
// const key = import.meta.env.VITE_SUPABASE_API_KEY

// const supabaseUrl = `https://${project}.supabase.co", "${key}"`;
// const supabaseAnonKey = key;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export default supabase;

// src/SupabaseConfig.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL; // No quotes or extra strings
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;









