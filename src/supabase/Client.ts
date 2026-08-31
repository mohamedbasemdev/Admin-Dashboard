import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gfuqcosdszslrjwcvtwo.supabase.co";
const supabaseKey = "sb_publishable_TdqvGHNeCgtbXjh1zDQUXw_KBIrmqum";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);