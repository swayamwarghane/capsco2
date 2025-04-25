import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ixnbvnvxvnxnvxnvxnvxnv.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmJ2bnZ4dm54bnZ4bnZ4bnZ4bnYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4MjQzMjU2MCwiZXhwIjoxOTk4MDA4NTYwfQ.7DJnkvjfJrGBgY5kgHJxYcFPHJy-fQugGF8mJ5CJpLI";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For development purposes, log authentication status
console.log("Supabase client initialized with URL:", supabaseUrl.substring(0, 15) + "...");
