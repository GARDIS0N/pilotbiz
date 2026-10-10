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

/**
 * Sign in anonymously for learners taking first lessons without credentials.
 */
export async function signInAnonymously() {
  if (!isSupabaseConfigured()) {
    return { data: { user: { id: `anon-${Date.now()}`, is_anonymous: true } }, error: null };
  }
  try {
    return await supabase.auth.signInAnonymously();
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Upgrade an anonymous account to a real account with email/password.
 */
export async function linkAnonymousAccount(email: string, password: string, metadata?: Record<string, any>) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }
  try {
    return await supabase.auth.updateUser({
      email,
      password,
      data: metadata
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Merges progress (attempts, review queue, lessons, mastery) from an anonymous learner ID
 * to a target registered learner ID via database function.
 */
export async function mergeAnonymousProgress(anonLearnerId: string, targetLearnerId: string) {
  if (!isSupabaseConfigured()) {
    return { success: true, message: 'Local/mock progress merged' };
  }
  try {
    const { data, error } = await supabase.rpc('merge_anonymous_progress', {
      p_anon_learner_id: anonLearnerId,
      p_target_learner_id: targetLearnerId
    });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn('[mergeAnonymousProgress] RPC warning:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Simple data-deletion path (COPPA, Kenya Data Protection Act).
 * Permanently purges all attempts, review queue items, progress, reports and profile.
 */
export async function deleteLearnerData(learnerId?: string) {
  if (!isSupabaseConfigured()) {
    return { success: true, message: 'Local mock data deleted' };
  }
  try {
    const { data, error } = await supabase.rpc('delete_learner_data', {
      p_learner_id: learnerId || null
    });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn('[deleteLearnerData] RPC warning:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Fetches minimal child profile (grade, optional school name, avatar, role)
 */
export async function getLearnerProfile(userId?: string) {
  if (!isSupabaseConfigured()) return null;
  try {
    const session = await getSession();
    const targetId = userId || session?.user?.id;
    if (!targetId) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('id, role, display_name, grade_id, school_name, avatar, parent_user_id')
      .eq('id', targetId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('[getLearnerProfile] Warning:', err);
    return null;
  }
}

