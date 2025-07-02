import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LoadingSpinner } from './LoadingSpinner';

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect to the main app after a short delay
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        } else {
          // Check if this is a password reset flow
          const urlParams = new URLSearchParams(window.location.search);
          const type = urlParams.get('type');
          
          if (type === 'recovery') {
            // This is a password reset link
            setStatus('success');
            setMessage('Password reset link is valid. You can now set a new password.');
            // You might want to redirect to a password reset form
            setTimeout(() => {
              navigate('/reset-password', { replace: true });
            }, 2000);
          } else {
            setStatus('error');
            setMessage('Invalid or expired authentication link.');
          }
        }
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {status === 'success' ? (
          <div className="text-green-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Success!</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
        ) : (
          <div className="text-red-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary px-6 py-2 rounded-lg"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 