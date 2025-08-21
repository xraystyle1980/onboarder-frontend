import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // For Firebase, auth callbacks are handled by the SDK automatically
        // This component can be simplified or removed since Firebase handles
        // authentication state changes through onAuthStateChanged
        setStatus('success');
        setMessage('Authentication successful! Redirecting...');
        
        // Redirect to the main app after a short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
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
            <h2 className="text-2xl font-medium mb-2">Success!</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
        ) : (
          <div className="text-red-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2 className="text-2xl font-medium mb-2">Authentication Failed</h2>
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