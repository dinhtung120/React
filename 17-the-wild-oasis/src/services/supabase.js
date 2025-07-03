import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://txwyotcffllbxntguvdv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4d3lvdGNmZmxsYnhudGd1dmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjA1MjEsImV4cCI6MjA2OTkzNjUyMX0.YkzS-6ULjzjKO2CfAOjB--xIHvxydxCLZcm8r8mw274";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
