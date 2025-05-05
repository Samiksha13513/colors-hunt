import { createClient } from '@supabase/supabase-js';
const project = import.meta.env.VITE_SUPABASE_PROJECT_URL
const key = import.meta.env.VITE_SUPABASE_API_KEY
// console.log("project ", project)
// console.log("key" ,key)
const supabaseUrl = `https://${project}.supabase.co", "${key}"`;
const supabaseAnonKey = key;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;











