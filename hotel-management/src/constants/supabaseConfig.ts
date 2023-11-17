import { createClient } from '@supabase/supabase-js'
import { Database } from '@type/supabase';
const supabaseUrl = 'https://pjqujsjzzdrlrgqbxepe.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey!)

export default supabase;
