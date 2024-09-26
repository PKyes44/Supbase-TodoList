import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cvurvgzmiuesvwtbwmck.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey) throw new Error("Supabase Key is Not exist");

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
