import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Icon } from '@iconify/react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

interface UserProfileProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

export default function UserProfile({ isMobile = false, onMobileMenuClose }: UserProfileProps) {
  const { user, signOut, loading } = useSupabaseAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  // Mobile version - renders as a section with profile info and sign out button
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {getUserInitials(user.email || '')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate mb-0">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate mb-0">
              {user.email}
            </p>
          </div>
        </div>
        <Button
          onPress={handleSignOut}
          isDisabled={loading}
          className="w-full btn-utility justify-start"
          variant="light"
          startContent={
            <Icon icon="lucide:log-out" width={16} height={16} className="text-muted-foreground" />
          }
        >
          <span className="text-sm">{loading ? 'Signing out...' : 'Sign out'}</span>
        </Button>
      </div>
    );
  }

  // Desktop version - renders as dropdown
  return (
    <Dropdown 
      shouldBlockScroll={false}
      backdrop="transparent"
      placement="bottom-end"
    >
      <DropdownTrigger>
        <button
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 transition-colors"
          disabled={loading}
        >
          <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {getUserInitials(user.email || '')}
          </div>
          <span className="text-sm text-foreground hidden sm:block">
            {user.email}
          </span>
          <Icon icon="lucide:chevron-down" width={16} height={16} className="text-muted-foreground" />
        </button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="User profile options"
        variant="flat"
        color="default"
        className="min-w-[240px]"
      >
        <DropdownItem 
          key="profile"
          textValue="User Profile"
          className="text-foreground cursor-default"
        >
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium">
              {getUserInitials(user.email || '')}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-0">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground mb-0">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem 
          key="signout"
          textValue="Sign out"
          onPress={handleSignOut}
          startContent={<Icon icon="lucide:log-out" width={16} height={16} className="text-muted-foreground" />}
          className="text-foreground hover:bg-background-muted data-[hover=true]:bg-background-muted"
        >
          {loading ? 'Signing out...' : 'Sign out'}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
} 