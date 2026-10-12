/**
 * Production environment verification helper.
 * Validates presence of required server environment variables without ever logging secret values.
 */
export function checkRequiredServerEnv(): { missingRequired: string[]; missingOptional: string[] } {
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  const hasSupabaseUrl = Boolean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  if (!hasSupabaseUrl) {
    missingRequired.push('SUPABASE_URL (or VITE_SUPABASE_URL)');
  }

  const hasSupabaseKey = Boolean(process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY);
  if (!hasSupabaseKey) {
    missingRequired.push('SUPABASE_ANON_KEY (or VITE_SUPABASE_ANON_KEY)');
  }

  if (!process.env.GEMINI_API_KEY) {
    missingRequired.push('GEMINI_API_KEY');
  }

  if (!process.env.APP_URL) {
    missingOptional.push('APP_URL');
  }

  if (!process.env.ALLOWED_ORIGINS) {
    missingOptional.push('ALLOWED_ORIGINS');
  }

  if (missingRequired.length > 0) {
    console.warn(
      `[Jifuno Server Env Warning]: Missing required environment variables: ${missingRequired.join(', ')}. ` +
      `Ensure these are configured in Vercel Project Settings > Environment Variables or .env.`
    );
  } else {
    console.log('[Jifuno Server Env]: All required server environment variables are configured.');
  }

  if (missingOptional.length > 0) {
    console.info(`[Jifuno Server Env Info]: Optional environment variables not set: ${missingOptional.join(', ')}.`);
  }

  return { missingRequired, missingOptional };
}
