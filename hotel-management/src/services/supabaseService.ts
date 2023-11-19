import { createClient } from "@supabase/supabase-js";
import { Database } from "@type/supabase";

// Constants
import { supabaseKey, supabaseUrl } from "@constant/config";

const supabase = createClient<Database>(supabaseUrl, supabaseKey!);

export default supabase;
