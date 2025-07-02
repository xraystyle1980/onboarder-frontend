import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { Session, User, AuthError } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get current session on mount
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setAuthState({
          session,
          user: session?.user ?? null,
          loading: false,
          error: null,
        });
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication error',
        }));
      }
    };

    getInitialSession();

    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState({
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
      });
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: null, error: errorMessage };
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: null, error: errorMessage };
    }
  };

  const signInWithMagicLink = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Magic link failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: null, error: errorMessage };
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthState({
        session: null,
        user: null,
        loading: false,
        error: null,
      });
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { error: errorMessage };
    }
  };

  const resetPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: null, error: errorMessage };
    }
  };

  const updatePassword = async (password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password update failed';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { data: null, error: errorMessage };
    }
  };

  return {
    ...authState,
    signUp,
    signInWithPassword,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
  };
} 