import { createClient } from '@supabase/supabase-js'
const project =import.meta.env.VITE_SUPABASE_PROJECT_NAME
const key = import.meta.env.VITE_SUPABASE_API_KEY
console.log('Project:', project);
console.log('Key:', key);

const supabaseUrl = `"https://${project}'.supabase.co" , "${key}"`
const supabaseKey = key
export const supabase = createClient(supabaseUrl, supabaseKey)
