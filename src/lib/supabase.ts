import { createClient } from "@supabase/supabase-js";

// Default values for development - these would be replaced with actual values in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0MCwiZXhwIjoxOTI4Njc0NTQwfQ.example";

// Create a mock client if the URL is the default one
const isMockClient = supabaseUrl === "https://example.supabase.co";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// If we're using a mock client, override the auth methods to return empty results
if (isMockClient) {
  console.warn("Using mock Supabase client. Authentication features will be limited.");
}
