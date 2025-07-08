import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const { updatePassword, loading, error: authError } = useSupabaseAuth();

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!password) {
      setMessage('Please enter a new password');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters with uppercase, lowercase, and number');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const result = await updatePassword(password);
      
      if (result.error) {
        setMessage(result.error);
      } else {
        setIsSuccess(true);
        setMessage('Password updated successfully! Redirecting...');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-medium text-foreground">Reset Your Password</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-background border border-border text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-background border border-border text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full py-3 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={loading}
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn-utility rounded-lg px-4 py-2.5 transition-all duration-200"
            disabled={loading}
          >
            Cancel
          </button>

          {/* Messages */}
          {(message || authError) && (
            <div className={`text-center text-sm mt-4 p-3 rounded-md ${
              isSuccess || message.includes('successfully')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message || authError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 