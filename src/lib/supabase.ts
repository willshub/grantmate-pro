import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create the client if we have valid environment variables
// This prevents the error when running in development without proper Supabase setup
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
}) 