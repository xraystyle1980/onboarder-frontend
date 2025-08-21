import { useState, useEffect, useRef } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { Link, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import Notification from './shared/Notification';

interface LoginFormProps {
  submitButtonClass?: string;
  onSuccess?: (email: string) => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot-password';

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
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const {
    signIn,
    signUp,
    resetPassword,
    signOut,
    user,
    loading,
    error: authError
  } = useFirebaseAuth();

  // Detect mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isTouchDevice && (isSmallScreen || isMobileUA));
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Optional delayed focus for better mobile UX
  useEffect(() => {
    if (!isMobile && emailInputRef.current) {
      // Only auto-focus on non-mobile devices
      const timer = setTimeout(() => {
        emailInputRef.current?.focus({ preventScroll: true });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isMobile, mode]);


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
          await signIn(email, password);
          setIsSuccess(true);
          setMessage('Successfully signed in!');
          if (onSuccess) onSuccess(email);
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
          await signUp(email, password);
          setIsSuccess(true);
          setMessage('Account created successfully!');
          if (onSuccess) onSuccess(email);
          break;
        case 'forgot-password':
          await resetPassword(email);
          setIsSuccess(true);
          setMessage('Password reset email sent! Check your inbox.');
          break;
        default:
          setMessage('Invalid authentication mode');
          return;
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };


  const getSubmitButtonText = () => {
    switch (mode) {
      case 'signin': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'forgot-password': return 'Send Reset Link';
      default: return 'Submit';
    }
  };

  const showPasswordFields = mode === 'signin' || mode === 'signup';
  const showConfirmPasswordField = mode === 'signup';

  return (
    <div className="w-full max-w-md mx-auto" style={{ pointerEvents: 'auto' }}>
      <div className="mb-8 text-center">
        <h2 className="text-xl font-medium text-foreground mb-2">
          {mode === 'signin' && "Sign In to save your flows"}
          {mode === 'signup' && "Create your account"}
          {mode === 'forgot-password' && "Reset your password"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ pointerEvents: 'auto' }}>     

        <div>
          <Input
            ref={emailInputRef}
            type="email"
            label="Email"
            labelPlacement="inside"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            isDisabled={loading}
            variant="bordered"
            autoComplete="email"
            inputMode="email"
            classNames={{
              input: "text-foreground",
              inputWrapper: "bg-background border-border"
            }}
          />
        </div>

        {showPasswordFields && (
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              labelPlacement="inside"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              isDisabled={loading}
              variant="bordered"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  <Icon 
                    icon={showPassword ? "lucide:eye-off" : "lucide:eye"} 
                    width={20} 
                    height={20} 
                  />
                </button>
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

        {showConfirmPasswordField && (
          <div className="mb-5">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              labelPlacement="inside"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              isDisabled={loading}
              variant="bordered"
              autoComplete="new-password"
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  <Icon 
                    icon={showConfirmPassword ? "lucide:eye-off" : "lucide:eye"} 
                    width={20} 
                    height={20} 
                  />
                </button>
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