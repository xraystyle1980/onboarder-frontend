import { useState, useRef } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Player } from '@lordicon/react';
import wandIcon from '../lottie/wired-outline-177-envelope-send-hover-flying.json';
import { Link } from '@heroui/react';

interface LoginFormProps {
  onClose: () => void;
  submitButtonClass?: string;
  cancelButtonClass?: string;
  onSuccess?: () => void;
}

type AuthMode = 'signin' | 'signup' | 'magic-link' | 'forgot-password';

export default function LoginForm({ 
  onClose, 
  submitButtonClass = "btn-primary font-medium p-0 transition-all duration-200 shadow-sm hover:shadow-md",
  cancelButtonClass = "btn-utility rounded-lg px-4 py-2.5 transition-all duration-200",
  onSuccess
}: LoginFormProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const playerRef = useRef<Player>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const {
    signInWithPassword,
    signUp,
    signInWithMagicLink,
    resetPassword,
    loading,
    error: authError
  } = useSupabaseAuth();

  const handleMouseEnter = () => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.playFromBeginning();
    }
  };

  const handlePlayerReady = () => {
    setIsPlayerReady(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    // Validate email
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      let result;

      switch (mode) {
        case 'signin':
          if (!password) {
            setMessage('Please enter your password');
            return;
          }
          result = await signInWithPassword(email, password);
          break;

        case 'signup':
          if (!password) {
            setMessage('Please enter a password');
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
          result = await signUp(email, password);
          break;

        case 'magic-link':
          result = await signInWithMagicLink(email);
          break;

        case 'forgot-password':
          result = await resetPassword(email);
          break;

        default:
          setMessage('Invalid authentication mode');
          return;
      }

      if (result.error) {
        setMessage(result.error);
      } else {
        setIsSuccess(true);
        if (mode === 'signup') {
          setMessage('Check your email to confirm your account!');
        } else if (mode === 'magic-link') {
          setMessage('Check your email for the magic link!');
        } else if (mode === 'forgot-password') {
          setMessage('Check your email for password reset instructions!');
        } else {
          setMessage('Successfully signed in!');
          onSuccess?.();
        }
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'signin': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'magic-link': return 'Magic Link';
      case 'forgot-password': return 'Reset Password';
      default: return 'Authentication';
    }
  };

  const getSubmitButtonText = () => {
    switch (mode) {
      case 'signin': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'magic-link': return 'Send Magic Link';
      case 'forgot-password': return 'Send Reset Link';
      default: return 'Submit';
    }
  };

  const showPasswordFields = mode === 'signin' || mode === 'signup';
  const showConfirmPassword = mode === 'signup';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-foreground">{getModeTitle()}</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {mode === 'signin' && "Welcome back! Sign in to your account"}
          {mode === 'signup' && "Create your account to get started"}
          {mode === 'magic-link' && "We'll send you a secure link to sign in"}
          {mode === 'forgot-password' && "We'll send you a link to reset your password"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-background border border-border text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
            disabled={loading}
          />
        </div>

        {showPasswordFields && (
          <div>
            <input
              type="password"
              placeholder={mode === 'signin' ? 'Your password' : 'Create password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-background border border-border text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
              disabled={loading}
            />
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters with uppercase, lowercase, and number
              </p>
            )}
          </div>
        )}

        {showConfirmPassword && (
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-background border border-border text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
              disabled={loading}
            />
          </div>
        )}

        <button 
          type="submit" 
          className={`${submitButtonClass} w-full py-3`}
          onMouseEnter={handleMouseEnter}
          disabled={loading}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="mr-2">
              <Player
                ref={playerRef}
                icon={wandIcon}
                size={20}
                onReady={handlePlayerReady}
              />
            </div>
            <span>{loading ? 'Loading...' : getSubmitButtonText()}</span>
          </div>
        </button>
        
        <Link
          as="button"
          type="button"
          onPress={onClose}
          isDisabled={loading}
          className={cancelButtonClass}
          color="foreground"
          underline="hover"
        >
          Cancel
        </Link>

        {/* Mode switching links */}
        <div className="text-center space-y-2">
          {mode === 'signin' && (
            <div className="space-y-2">
              <Link
                as="button"
                type="button"
                onPress={() => setMode('magic-link')}
                isDisabled={loading}
                color="primary"
                underline="hover"
                className="text-sm"
              >
                Sign in with magic link
              </Link>
              <div className="text-xs text-muted-foreground">or</div>
              <Link
                as="button"
                type="button"
                onPress={() => setMode('signup')}
                isDisabled={loading}
                color="primary"
                underline="hover"
                className="text-sm"
              >
                Create new account
              </Link>
              <div className="text-xs text-muted-foreground">or</div>
              <Link
                as="button"
                type="button"
                onPress={() => setMode('forgot-password')}
                isDisabled={loading}
                color="primary"
                underline="hover"
                className="text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          {mode === 'signup' && (
            <Link
              as="button"
              type="button"
              onPress={() => setMode('signin')}
              isDisabled={loading}
              color="primary"
              underline="hover"
              className="text-sm"
            >
              Already have an account? Sign in
            </Link>
          )}

          {mode === 'magic-link' && (
            <Link
              as="button"
              type="button"
              onPress={() => setMode('signin')}
              isDisabled={loading}
              color="primary"
              underline="hover"
              className="text-sm"
            >
              Prefer password? Sign in with password
            </Link>
          )}

          {mode === 'forgot-password' && (
            <Link
              as="button"
              type="button"
              onPress={() => setMode('signin')}
              isDisabled={loading}
              color="primary"
              underline="hover"
              className="text-sm"
            >
              Remember your password? Sign in
            </Link>
          )}
        </div>

        {/* Messages */}
        {(message || authError) && (
          <div className={`text-center text-sm mt-4 p-3 rounded-md ${
            isSuccess || message.includes('Check your email') || message.includes('Successfully')
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message || authError}
          </div>
        )}
      </form>
    </div>
  );
} 