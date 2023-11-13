import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nalwpbdvpgqubwapcjze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbHdwYmR2cGdxdWJ3YXBjanplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NDExMjgsImV4cCI6MjAxNTQxNzEyOH0.RABKXbgQwfmfc8pYYVF6WpSevqZ2ISG0izh3Tkt_QHA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
