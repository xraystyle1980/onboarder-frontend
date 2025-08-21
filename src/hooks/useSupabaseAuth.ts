import { useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  UserCredential
} from 'firebase/auth';
import { app } from '../../firebase';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { data: { user }, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return { data: { user }, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      return { data: {}, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await signOut(auth);
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithPassword: signIn, // alias for backward compatibility
    signUp,
    resetPassword,
    signOut: signOutUser,
  };
}