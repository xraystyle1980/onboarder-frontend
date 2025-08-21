import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { user, loading } = useFirebaseAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !user) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is not required and user is authenticated
  if (!requireAuth && user) {
    // Redirect to the specified redirect path or home
    return <Navigate to={redirectTo} replace />;
  }

  // Render children if authentication requirements are met
  return <>{children}</>;
} 