import { useState } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Link, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import Notification from './shared/Notification';

interface LoginFormProps {
  submitButtonClass?: string;
  onSuccess?: () => void;
}

type AuthMode = 'signin' | 'signup' | 'magic-link' | 'forgot-password';

export default function LoginForm({ 
  submitButtonClass = "btn-primary",
  onSuccess
}: LoginFormProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    signInWithPassword,
    signUp,
    signInWithMagicLink,
    resetPassword,
    loading,
    error: authError
  } = useSupabaseAuth();


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
          // Check if user already exists (when email confirmation is enabled)
          if (result.data?.user?.identities?.length === 0) {
            setMessage('An account with this email already exists. Please sign in or reset your password if you\'ve forgotten it.');
            return;
          }
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
        // Handle "User already registered" error specifically
        if (result.error.includes('User already registered') || result.error.includes('already registered')) {
          setMessage('An account with this email already exists. Please sign in or reset your password if you\'ve forgotten it.');
        } else {
          setMessage(result.error);
        }
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
    <div className="w-full max-w-md mx-auto" style={{ pointerEvents: 'auto' }}>
      <div className="mb-8 text-center">
        <h2 className="text-xl font-medium text-foreground mb-2">
          {mode === 'signin' && "Sign In to save your flows"}
          {mode === 'signup' && "Create your account"}
          {mode === 'magic-link' && "Magic Link Sign In"}
          {mode === 'forgot-password' && "Reset your password"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ pointerEvents: 'auto' }}>     

        <div>
          <Input
            type="email"
            label="Email"
            labelPlacement="inside"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            isDisabled={loading}
            variant="bordered"
            classNames={{
              input: "text-foreground",
              inputWrapper: "bg-background border-border"
            }}
          />
        </div>

        {showPasswordFields && (
          <div>
            <Input
              type="password"
              label="Password"
              labelPlacement="inside"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              isDisabled={loading}
              variant="bordered"
              endContent={
                <Icon 
                  icon="lucide:lock" 
                  width={20} 
                  height={20} 
                  className="text-muted-foreground" 
                />
              }
              classNames={{
                input: "text-foreground",
                inputWrapper: "bg-background border-border"
              }}
            />
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground mt-4 mb-0 mx-2 text-center">
                Password must be at least 8 characters with uppercase, lowercase, and number
              </p>
            )}
          </div>
        )}

        {showConfirmPassword && (
          <div className="mb-5">
            <Input
              type="password"
              label="Confirm Password"
              labelPlacement="inside"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              isDisabled={loading}
              variant="bordered"
              endContent={
                <Icon 
                  icon="lucide:lock-keyhole" 
                  width={20} 
                  height={20} 
                  className="text-muted-foreground" 
                />
              }
              classNames={{
                input: "text-foreground",
                inputWrapper: "bg-background border-border"
              }}
            />
          </div>
        )}

        {/* Forgot Password Link - positioned above sign in button for signin mode */}
        {mode === 'signin' && (
          <div className="text-left mx-2 mb-4">
            <Link
              as="button"
              type="button"
              onPress={() => setMode('forgot-password')}
              isDisabled={loading}
              underline="hover"
              className="text-sm text-muted-foreground hover:text-sky-500"
            >
              Forgot your password?
            </Link>
          </div>
        )}

        <Button
          type="submit" 
          className={`${submitButtonClass} w-full`}
          isDisabled={loading}
        >
          {loading ? 'Loading...' : getSubmitButtonText()}
        </Button>

        {/* Sign up link for signin mode */}
        {mode === 'signin' && (
          <div className="text-center mt-4">
            <span className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link
                as="button"
                type="button"
                onPress={() => setMode('signup')}
                isDisabled={loading}
                color="primary"
                underline="hover"
                className="text-sm font-medium text-sky-500 hover:text-sky-400"
              >
                Sign up
              </Link>
            </span>
          </div>
        )}

        {/* Or divider for signin mode */}
        {mode === 'signin' && (
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground">Or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>
        )}

        {/* Magic link button for signin mode */}
        {mode === 'signin' && (
          <Button
            type="button"
            onPress={() => setMode('magic-link')}
            isDisabled={loading}
            variant="bordered"
            className="w-full py-3 border-border hover:bg-background-muted"
          >
            Sign in with magic link
          </Button>
        )}

        {/* Mode switching options for other modes */}
        {mode !== 'signin' && (
          <div className="mt-6 pt-4 border-t border-border">
            {mode === 'signup' && (
              <div className="text-center text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link
                  as="button"
                  type="button"
                  onPress={() => setMode('signin')}
                  isDisabled={loading}
                  color="primary"
                  underline="hover"
                  className="text-sm font-medium text-sky-500 hover:text-sky-400"
                >
                  Sign in
                </Link>
              </div>
            )}

            {/* <span className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link
                as="button"
                type="button"
                onPress={() => setMode('signup')}
                isDisabled={loading}
                color="primary"
                underline="hover"
                className="text-sm font-medium text-sky-500 hover:text-sky-400"
              >
                Sign up
              </Link>
            </span> */}

            {mode === 'magic-link' && (
              <div className="text-center text-muted-foreground text-sm">
                Prefer password?{' '}
                <Link
                  as="button"
                  type="button"
                  onPress={() => setMode('signin')}
                  isDisabled={loading}
                  color="primary"
                  underline="hover"
                  className="text-sm font-medium text-sky-500 hover:text-sky-400"
                >
                  Sign in with password
                </Link>
              </div>
            )}

            {mode === 'forgot-password' && (
              <div className="text-center text-muted-foreground text-sm">
                Remember your password?{' '}
                <Link
                  as="button"
                  type="button"
                  onPress={() => setMode('signin')}
                  isDisabled={loading}
                  color="primary"
                  underline="hover"
                  className="text-sm font-medium text-sky-500 hover:text-sky-400"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {(message || authError) && (
          <Notification 
            type={isSuccess || message.includes('Check your email') || message.includes('Successfully') ? 'success' : 'error'}
            className="z-[10000]"
          >
            {message?.includes('An account with this email already exists') ? (
              <div style={{ pointerEvents: 'all' }}>
                An account with this email already exists. Please{' '}
                <Link
                  as="button"
                  type="button"
                  onPress={() => {
                    console.log('Sign in clicked');
                    setMode('signin');
                    setMessage('');
                  }}
                  isDisabled={loading}
                  underline="hover"
                  className="text-sm font-medium cursor-pointer relative z-[10001]"
                  style={{ pointerEvents: 'all' }}
                >
                  sign in
                </Link>
                {' '}or{' '}
                <Link
                  as="button"
                  type="button"
                  onPress={() => {
                    console.log('Reset password clicked');
                    setMode('forgot-password');
                    setMessage('');
                  }}
                  isDisabled={loading}
                  underline="hover"
                  className="text-sm font-medium cursor-pointer relative z-[10001]"
                  style={{ pointerEvents: 'all' }}
                >
                  reset your password
                </Link>
                {' '}if you've forgotten it.
              </div>
            ) : (
              message || authError
            )}
          </Notification>
        )}
      </form>
    </div>
  );
} 