import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://umujdgpiyiakxcppqzop.supabase.co';

export const getSupabaseAnonKey = (): string => {
  if (typeof window !== 'undefined') {
    const manualKey = localStorage.getItem('medrise_supabase_anon_key');
    if (manualKey && manualKey.trim().length > 10) {
      return manualKey.trim();
    }
  }
  return (
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
};

const currentAnonKey = getSupabaseAnonKey();

export const isSupabaseConfigured = Boolean(
  SUPABASE_PROJECT_URL && currentAnonKey && currentAnonKey.length > 20 && !currentAnonKey.includes('placeholder')
);

// Fallback dummy key to allow client instantiation without crash when keys are pending
const effectiveKey = isSupabaseConfigured ? currentAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase: SupabaseClient = createClient(
  SUPABASE_PROJECT_URL,
  effectiveKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const saveManualAnonKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('medrise_supabase_anon_key', key.trim());
    window.location.reload();
  }
};

export const clearManualAnonKey = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('medrise_supabase_anon_key');
    window.location.reload();
  }
};

export type { User, Session };
