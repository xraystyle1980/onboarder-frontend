"use client";
import * as React from "react";
import { Icon } from "@iconify/react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { FigmaIcon, UserIcon } from "./shared/CustomIcons";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

function Header({ onShowMyFlows }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const { user, signOut } = useSupabaseAuth();

  const handleShowMyFlows = () => {
    if (user && onShowMyFlows) {
      onShowMyFlows();
    } else {
      // Show login modal if not authenticated
      setShowLogin(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Extracted nav buttons for reuse
  const navButtons = (
    <>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility"
        startContent={<FigmaIcon />}
      >
        <span className="utility-btn-text">Try the plugin</span>
      </Button>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility"
        startContent={<Icon icon="lucide:folder" width={18} height={18} />}
        onPress={handleShowMyFlows}
      >
        <span className="utility-btn-text">My Flows</span>
      </Button>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility"
        startContent={<UserIcon />}
        onPress={() => setShowLogin(true)}
      >
        <span className="utility-btn-text">Sign in</span>
      </Button>
    </>
  );

  // Signed in user buttons with same styling as signed out
  const signedInButtons = (
    <>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility"
        startContent={<FigmaIcon />}
      >
        <span className="utility-btn-text">Try the plugin</span>
      </Button>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility"
        startContent={<Icon icon="lucide:folder" width={18} height={18} />}
        onPress={handleShowMyFlows}
      >
        <span className="utility-btn-text">My Flows</span>
      </Button>
      <UserProfile />
    </>
  );

  return (
    <header className="flex w-full flex-col bg-background border-b border-border py-3">
      <div className="flex items-center justify-center container mx-auto" >
        <div className="flex flex-grow items-center justify-between px-8" >
          {/* Logo Section */}
          <a href="/" className="flex items-center justify-center gap-3 no-underline">
            <img 
              src="/Onboader-Logo.svg" 
              alt="Onboarder Logo" 
              className="header-logo"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-4" >
            {user ? (
              <div className="flex gap-4">
                {signedInButtons}
              </div>
            ) : (
              <div className="flex gap-4">
                {navButtons}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="text-foreground hover:bg-background-muted"
            >
              {isMobileMenuOpen ? (
                <Icon icon="lucide:x" width={20} height={20} />
              ) : (
                <Icon icon="lucide:menu" width={20} height={20} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden transition-all duration-300 ease-in-out transform scale-y-100 origin-top"
          style={{ maxHeight: isMobileMenuOpen ? '500px' : '0', overflow: 'hidden' }}
        >
          <div className="mobile-menu-container flex flex-col gap-3 p-4 border-t border-border bg-background">
            {user ? (
              <>
                <Button
                  onPress={() => {
                    closeMobileMenu();
                    if (onShowMyFlows) onShowMyFlows();
                  }}
                  variant="light"
                  color="default"
                  size="sm"
                  fullWidth
                  className="mobile-menu-button text-foreground hover:bg-background-muted"
                  startContent={<Icon icon="lucide:folder" width={18} height={18} className="text-muted-foreground" />}
                >
                  My Flows
                </Button>
                <Button
                  onPress={async () => {
                    closeMobileMenu();
                    await signOut();
                  }}
                  variant="light"
                  color="default"
                  size="sm"
                  fullWidth
                  className="mobile-menu-button text-foreground hover:bg-background-muted"
                  startContent={<Icon icon="lucide:log-out" width={18} height={18} className="text-muted-foreground" />}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  variant="solid"
                  color="default"
                  size="sm"
                  className="btn-utility"
                  startContent={<FigmaIcon />}
                  fullWidth
                >
                  <span className="utility-btn-text">Try the plugin</span>
                </Button>
                <Button
                  variant="solid"
                  color="default"
                  size="sm"
                  className="btn-utility"
                  startContent={<Icon icon="lucide:folder" width={18} height={18} />}
                  onPress={() => {
                    closeMobileMenu();
                    handleShowMyFlows();
                  }}
                  fullWidth
                >
                  <span className="utility-btn-text">My Flows</span>
                </Button>
                <Button
                  variant="solid"
                  color="default"
                  size="sm"
                  className="btn-utility"
                  startContent={<UserIcon />}
                  onPress={() => {
                    closeMobileMenu();
                    setShowLogin(true);
                  }}
                  fullWidth
                >
                  <span className="utility-btn-text">Sign in</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      {showLogin && (
        <Modal 
          isOpen={showLogin} 
          onOpenChange={setShowLogin}
          backdrop="blur"
          classNames={{
            wrapper: "z-[120]",
            base: "bg-popover border border-border shadow-xl rounded-2xl",
            backdrop: "backdrop-blur-md",
            header: "text-foreground text-xl font-normal px-6 py-4",
            body: "px-6 py-6 text-foreground",
            closeButton: "absolute right-3 top-3 z-10 btn-utility rounded-lg transition-all duration-200"
          }}
        >
          <ModalContent className="modal-animate-in">
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
              <LoginForm 
                onClose={() => setShowLogin(false)}
                onSuccess={() => {
                  setShowLogin(false);
                  // If there was a pending flow, it will be saved automatically
                }}
                submitButtonClass="py-4 rounded-lg btn-primary w-full"
                cancelButtonClass="btn-utility rounded-lg px-6 py-3 transition-all duration-200 w-full"
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
}

export default Header;
