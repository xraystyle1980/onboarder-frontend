import { useState } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Icon } from '@iconify/react';

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useSupabaseAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 transition-colors"
        disabled={loading}
      >
        <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {getUserInitials(user.email || '')}
        </div>
        <span className="text-sm text-foreground hidden sm:block">
          {user.email}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {getUserInitials(user.email || '')}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-2 space-y-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <Icon icon="lucide:log-out" width={16} height={16} />
              {loading ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 