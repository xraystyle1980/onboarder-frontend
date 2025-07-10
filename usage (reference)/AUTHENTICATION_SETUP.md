# Authentication Setup Guide

This guide covers the robust authentication system implemented with Supabase, featuring email + password as the primary method with magic link as a fallback option.

## Features

### 🔐 Primary Authentication Methods
- **Email + Password**: Secure password-based authentication
- **Magic Link**: Passwordless authentication via email
- **Password Reset**: Secure password recovery flow

### 🛡️ Security Features
- Strong password validation (8+ chars, uppercase, lowercase, number)
- Rate limiting (built into Supabase)
- Secure session management
- Email verification for new accounts
- Protected routes with authentication guards

### 🎯 User Experience
- Seamless mode switching between auth methods
- Loading states and error handling
- Responsive design for mobile and desktop
- User profile dropdown with account management

## File Structure

```
src/
├── components/
│   ├── LoginForm.tsx           # Main authentication form
│   ├── AuthCallback.tsx        # Handles auth callbacks
│   ├── ResetPasswordForm.tsx   # Password reset form
│   ├── ProtectedRoute.tsx      # Route protection component
│   ├── UserProfile.tsx         # User profile dropdown
│   └── header.tsx              # Updated header with auth
├── hooks/
│   └── useSupabaseAuth.ts      # Enhanced auth hook
└── App.tsx                     # Main app with routing
```

## Authentication Flow

### 1. Sign Up Flow
```
User enters email + password → Validation → Supabase signup → Email confirmation → Redirect to app
```

### 2. Sign In Flow
```
User enters email + password → Validation → Supabase signin → Redirect to app
```

### 3. Magic Link Flow
```
User enters email → Supabase OTP → Email sent → User clicks link → AuthCallback → Redirect to app
```

### 4. Password Reset Flow
```
User requests reset → Email sent → User clicks link → ResetPasswordForm → Password updated
```

## Security Best Practices

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Special characters allowed: `@$!%*?&`

### Email Validation
- Standard email format validation
- Real-time validation feedback

### Session Management
- Automatic session refresh
- Secure session storage
- Proper logout handling

### Rate Limiting
- Built into Supabase
- Prevents brute force attacks
- Configurable limits

## Supabase Configuration

### Required Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Auth Settings
1. **Email Templates**: Customize confirmation and reset emails
2. **Redirect URLs**: Configure allowed redirect URLs
3. **Password Policy**: Set minimum password requirements
4. **Rate Limiting**: Configure rate limits for auth endpoints

### Recommended Supabase Settings
```sql
-- Enable email confirmations
UPDATE auth.config SET confirm_email_change = true;

-- Set password policy
UPDATE auth.config SET 
  password_min_length = 8,
  password_require_uppercase = true,
  password_require_lowercase = true,
  password_require_numbers = true;

-- Configure rate limiting
UPDATE auth.config SET 
  rate_limit_email_sent = 10,
  rate_limit_email_sent_period = 3600;
```

## Usage Examples

### Protected Routes
```tsx
import ProtectedRoute from './components/ProtectedRoute';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Authentication Hook
```tsx
import { useSupabaseAuth } from './hooks/useSupabaseAuth';

function MyComponent() {
  const { user, signInWithPassword, signOut, loading } = useSupabaseAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return user ? <AuthenticatedView /> : <LoginForm />;
}
```

### User Profile
```tsx
import UserProfile from './components/UserProfile';

<UserProfile onShowMyFlows={() => setShowFlows(true)} />
```

## Error Handling

### Common Error Messages
- **Invalid email**: "Please enter a valid email address"
- **Weak password**: "Password must be at least 8 characters with uppercase, lowercase, and number"
- **Password mismatch**: "Passwords do not match"
- **Network errors**: "An unexpected error occurred"
- **Rate limiting**: "Too many requests. Please try again later"

### Error Display
- Success messages: Green background with checkmark
- Error messages: Red background with X icon
- Loading states: Disabled buttons with loading text

## Testing

### Manual Testing Checklist
- [ ] Sign up with valid email/password
- [ ] Sign up with invalid email
- [ ] Sign up with weak password
- [ ] Sign in with correct credentials
- [ ] Sign in with incorrect credentials
- [ ] Magic link authentication
- [ ] Password reset flow
- [ ] Session persistence
- [ ] Logout functionality
- [ ] Protected route access
- [ ] Mobile responsiveness

### Automated Testing
```bash
# Run authentication tests
npm test -- --testPathPattern=auth

# Run specific auth test
npm test LoginForm.test.tsx
```

## Deployment Considerations

### Environment Setup
1. Configure Supabase project
2. Set environment variables
3. Update redirect URLs for production
4. Test email templates

### Security Checklist
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Supabase RLS policies configured
- [ ] Rate limiting enabled
- [ ] Email templates customized
- [ ] Error logging configured

## Troubleshooting

### Common Issues

**Magic links not working**
- Check redirect URL configuration
- Verify email template settings
- Ensure proper domain setup

**Password reset not working**
- Verify reset URL configuration
- Check email delivery
- Confirm Supabase auth settings

**Session not persisting**
- Check browser storage settings
- Verify Supabase client configuration
- Ensure proper cookie settings

### Debug Mode
Enable debug logging in development:
```tsx
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    debug: process.env.NODE_ENV === 'development'
  }
});
```

## Future Enhancements

### Planned Features
- [ ] Social authentication (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Account deletion
- [ ] Email change functionality
- [ ] Session management dashboard
- [ ] Audit logging

### Security Improvements
- [ ] Advanced password strength meter
- [ ] Account lockout after failed attempts
- [ ] IP-based rate limiting
- [ ] Device fingerprinting
- [ ] Suspicious activity detection

## Support

For authentication-related issues:
1. Check Supabase documentation
2. Review error logs
3. Test with minimal reproduction
4. Contact development team

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [React Router Documentation](https://reactrouter.com/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)
- [Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) 