import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://gvddvgscydjzpqffwxrn.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_qlboOT30DqWqpsTZLPo9hw_yNj3OG2l';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL && 
    SUPABASE_URL.includes('supabase.co') && 
    SUPABASE_ANON_KEY && 
    !SUPABASE_ANON_KEY.includes('your-key')
  );
};

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// --- Supabase Authentication Utilities ---

export async function signUpWithEmail(email: string, password: string, userData?: Record<string, any>) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOut() {
  if (!isSupabaseConfigured()) return { error: null };
  return supabase.auth.signOut();
}

export async function getSession() {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
