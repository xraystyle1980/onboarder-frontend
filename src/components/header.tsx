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
import LoginForm from "./LoginForm";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { supabase } from "../supabaseClient";
import { FigmaIcon, UserIcon } from "./shared/CustomIcons";

function Header({ onShowMyFlows }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const { user } = useSupabaseAuth();

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
        startContent={<UserIcon />}
        onPress={() => setShowLogin(true)}
      >
        <span className="utility-btn-text">Sign in</span>
      </Button>
    </>
  );

  return (
    <header className="flex w-full flex-col bg-deep-night py-3">
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
          <div className="hidden md:flex items-center justify-center gap-8 border-solid border-gray-200" >
            {user ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    fullWidth
                    variant="bordered"
                    color="default"
                    size="md"
                    className="font-medium"
                  >
                    <span className="text-user-email">{user.email}</span>
                    <Icon icon="lucide:chevron-down" className="nav-icon" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="my-flows"
                    onClick={() => {
                      if (onShowMyFlows) onShowMyFlows();
                    }}
                  >
                    My Flows
                  </DropdownItem>
                  <DropdownItem
                    key="sign-out"
                    onClick={async () => {
                      try {
                        console.log('Attempting to sign out...');
                        const { error } = await supabase.auth.signOut();
                        if (error) {
                          console.error('Sign out error:', error);
                          alert('Sign out failed: ' + error.message);
                        } else {
                          console.log('Sign out successful');
                        }
                      } catch (err) {
                        console.error('Sign out exception:', err);
                        alert('Sign out failed: ' + err.message);
                      }
                    }}
                    className="text-sign-out"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex gap-4">
                {/* Example of different button variants with icons */}
                {navButtons}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <Icon icon="lucide:x" className="mobile-menu-icon" />
              ) : (
                <Icon icon="lucide:menu" className="mobile-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden transition-all duration-300 ease-in-out transform scale-y-100 origin-top"
          style={{ maxHeight: isMobileMenuOpen ? '500px' : '0', overflow: 'hidden' }}
        >
          <div className="mobile-menu-container flex flex-col gap-3">
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
                  className="mobile-menu-button"
                >
                  My Flows
                </Button>
                <Button
                  onPress={async () => {
                    closeMobileMenu();
                    try {
                      console.log('Attempting to sign out (mobile)...');
                      const { error } = await supabase.auth.signOut();
                      if (error) {
                        console.error('Sign out error:', error);
                        alert('Sign out failed: ' + error.message);
                      } else {
                        console.log('Sign out successful');
                      }
                    } catch (err) {
                      console.error('Sign out exception:', err);
                      alert('Sign out failed: ' + err.message);
                    }
                  }}
                  variant="light"
                  color="default"
                  size="sm"
                  fullWidth
                  className="mobile-menu-button"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {navButtons}
              </div>
            )}
          </div>
        </div>
      )}
      {showLogin && (
        <Modal isOpen={showLogin} onOpenChange={setShowLogin}>
          <ModalContent className="dark-card-body">
            <ModalHeader className="dark-card-body">Sign In</ModalHeader>
            <ModalBody className="dark-card-body">
              <LoginForm onClose={() => setShowLogin(false)} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
}

export default Header;
