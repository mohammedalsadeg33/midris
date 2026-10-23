import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, User, Session } from '../lib/supabase';

interface AuthNotification {
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface UserProfileData {
  displayName?: string;
  medicalSchool?: string;
  academicStage?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  notification: AuthNotification | null;
  clearNotification: () => void;
  signUp: (email: string, password: string) => Promise<{ success: boolean; requiresVerification?: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; requiresVerification?: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (data: UserProfileData) => Promise<{ success: boolean; error?: string }>;
  updateUserPassword: (password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<AuthNotification | null>(null);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Handle URL hash fragments for email confirmation or verification errors
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    const search = window.location.search;

    // Check for error parameters in hash or search
    const hasError = hash.includes('error=') || search.includes('error=');
    if (hasError) {
      const params = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : search);
      const errorDesc = params.get('error_description') || params.get('error');
      let friendlyError = 'The verification link is invalid or has expired. Please sign in or request a new confirmation email.';
      
      if (errorDesc) {
        if (errorDesc.includes('expired')) {
          friendlyError = 'This verification link has expired. Please sign in or register again to receive a fresh link.';
        } else {
          friendlyError = decodeURIComponent(errorDesc.replace(/\+/g, ' '));
        }
      }

      setNotification({
        type: 'error',
        message: friendlyError
      });

      // Clean the URL hash safely
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // Ignore in restricted environments
      }
      return;
    }

    // Check for successful signup confirmation token
    if (hash.includes('type=signup') || hash.includes('type=email_change') || hash.includes('type=recovery')) {
      setNotification({
        type: 'success',
        message: 'Your email has been verified successfully! You are now logged in to MedRise.'
      });

      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // Ignore in restricted environments
      }
    }
  }, []);

  // Initialize session and set up auth state listener
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // Get current session on startup
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (!isMounted) return;
      if (error) {
        console.warn('MedRise Auth session fetch error:', error.message);
      }
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsLoading(false);
    }).catch((err) => {
      if (!isMounted) return;
      console.warn('MedRise Auth session error:', err);
      setIsLoading(false);
    });

    // Listen to Supabase auth events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_IN' && newSession?.user) {
        // If the user signed in, verify if email is confirmed
        const isConfirmed = Boolean(newSession.user.email_confirmed_at || (newSession.user as unknown as { confirmed_at?: string }).confirmed_at);
        if (isConfirmed && !notification) {
          // Can optionally notify
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [notification]);

  // Sign up with email & password
  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase is not configured yet. Please provide your Supabase publishable key.'
      };
    }

    try {
      // Determine proper confirmation redirect URL (matches current origin or production MedRise)
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://medrise-platform.vercel.app';

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        let message = error.message;
        if (error.message.toLowerCase().includes('already registered')) {
          message = 'An account with this email address already exists. Please log in instead.';
        } else if (error.message.toLowerCase().includes('password')) {
          message = 'Password must be at least 6 characters.';
        } else if (error.message.toLowerCase().includes('valid email')) {
          message = 'Please provide a valid email address.';
        }
        return { success: false, error: message };
      }

      // Check if user was created and whether email confirmation is required
      // Supabase returns user with email_confirmed_at null when verification is required
      const isConfirmed = Boolean(data.user?.email_confirmed_at || (data.user as unknown as { confirmed_at?: string })?.confirmed_at);
      
      // If user identities is empty, Supabase returns this for existing users when email enumeration protection is on
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return {
          success: false,
          error: 'An account with this email already exists. Please log in instead or reset your password.'
        };
      }

      if (!isConfirmed) {
        return {
          success: true,
          requiresVerification: true
        };
      }

      return {
        success: true,
        requiresVerification: false
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during registration. Please try again.';
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Sign in with email & password
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase is not configured yet. Please provide your Supabase publishable key.'
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        let message = error.message;
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          message = 'Invalid email or password. Please verify your credentials and try again.';
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          return {
            success: false,
            requiresVerification: true,
            error: 'Your email address has not been confirmed yet. Please check your inbox for the verification link.'
          };
        } else if (error.message.toLowerCase().includes('network')) {
          message = 'Network error. Please check your internet connection and try again.';
        }
        return { success: false, error: message };
      }

      // Check if email is verified
      const isConfirmed = Boolean(data.user?.email_confirmed_at || (data.user as unknown as { confirmed_at?: string })?.confirmed_at);
      if (!isConfirmed) {
        // If Supabase allows sign in without verification but verification is required by policy:
        return {
          success: false,
          requiresVerification: true,
          error: 'Your email address has not been verified yet. Please check your inbox or click resend.'
        };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to sign in. Please try again.';
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Sign out
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error during sign out:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  // Resend verification email
  const resendVerification = async (email: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase is not configured yet.'
      };
    }

    try {
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://medrise-platform.vercel.app';
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend confirmation email.';
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile metadata (Display Name, Medical School, Academic Stage)
  const updateUserProfile = async (data: UserProfileData) => {
    if (!isSupabaseConfigured) {
      if (user) {
        const updatedUser = {
          ...user,
          user_metadata: {
            ...user.user_metadata,
            display_name: data.displayName?.trim(),
            medical_school: data.medicalSchool?.trim(),
            academic_stage: data.academicStage?.trim()
          }
        };
        setUser(updatedUser as User);
        return { success: true };
      }
      return { success: false, error: 'User is not authenticated.' };
    }

    try {
      const { data: responseData, error } = await supabase.auth.updateUser({
        data: {
          display_name: data.displayName?.trim(),
          medical_school: data.medicalSchool?.trim(),
          academic_stage: data.academicStage?.trim()
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (responseData.user) {
        setUser(responseData.user);
      }
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile settings.';
      return { success: false, error: errorMessage };
    }
  };

  // Update account password
  const updateUserPassword = async (password: string) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured yet.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password.';
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: isSupabaseConfigured,
        notification,
        clearNotification,
        signUp,
        signIn,
        signOut,
        resendVerification,
        updateUserProfile,
        updateUserPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
