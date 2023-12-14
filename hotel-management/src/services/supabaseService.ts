import { createClient } from '@supabase/supabase-js';

// Types
import { Database } from '@src/types/supabase';

// Constants
import { supabaseKey, supabaseUrl } from '@src/constants/config';

const supabase = createClient<Database>(supabaseUrl, supabaseKey!);

export default supabase;
