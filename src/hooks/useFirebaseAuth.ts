import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { app } from '../../firebase';

export function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    resetPassword,
    signOut: signOutUser,
  };
}
