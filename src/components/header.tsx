"use client";
import * as React from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@heroui/react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { FigmaIcon, UserIcon, MyFlowsIcon } from "./shared/CustomIcons";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

function Header({ onShowMyFlows }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = React.useState(false);
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
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300);
  };

  // Extracted nav buttons for reuse
  const navButtons = (
    <>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility px-3 py-0.5 rounded-full"
        startContent={<FigmaIcon />}
      >
        <span className="utility-btn-text">Try the plugin</span>
      </Button>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility px-3 py-0.5 rounded-full"
        startContent={<MyFlowsIcon />}
        onPress={handleShowMyFlows}
      >
        <span className="utility-btn-text">My Flows</span>
      </Button>
      <Button
        variant="solid"
        color="default"
        size="md"
        className="btn-utility px-3 py-0.5 rounded-full"
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
        startContent={<MyFlowsIcon />}
        onPress={handleShowMyFlows}
      >
        <span className="utility-btn-text">My Flows</span>
      </Button>
      <UserProfile />
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex w-full flex-col bg-background border-b border-border py-2 lg:py-3">
      <div className="flex items-center justify-center container mx-auto" >
        <div className="flex flex-grow items-center justify-between px-4 lg:px-8" >
          {/* Logo Section */}
          <a href="/" className="flex items-center justify-center gap-3 no-underline">
            <img 
              src="/Onboader-Logo.svg" 
              alt="Onboarder Logo" 
              className="header-logo max-w-40 lg:max-w-full"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-4" >
            {user ? (
              <div className="flex gap-4 items-center">
                {signedInButtons}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
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

      {/* Mobile Navigation Menu - Right Side Slide In */}
      {(isMobileMenuOpen || isMobileMenuClosing) && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileMenuClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 md:hidden ${isMobileMenuClosing ? 'mobile-menu-slide-out' : 'mobile-menu-slide-in'}`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-border">
                <span className="text-foreground font-semibold text-lg">Menu</span>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="text-muted-foreground hover:bg-background-muted"
                >
                  <Icon icon="lucide:x" width={20} height={20} />
                </Button>
              </div>
              
              {/* Menu Content */}
              <div className="flex-1 p-4 space-y-4">
                {user ? (
                  <>
                    {/* User Profile Section */}
                    <div className="pb-4 border-b border-border">
                      <UserProfile />
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="space-y-3">
                      <Button
                        variant="solid"
                        color="default"
                        size="md"
                        className="btn-utility w-full justify-start"
                        startContent={<FigmaIcon />}
                      >
                        <span className="utility-btn-text">Try the plugin</span>
                      </Button>
                      <Button
                        variant="solid"
                        color="default"
                        size="md"
                        className="btn-utility w-full justify-start"
                        startContent={<MyFlowsIcon />}
                        onPress={() => {
                          closeMobileMenu();
                          if (onShowMyFlows) onShowMyFlows();
                        }}
                      >
                        <span className="utility-btn-text">My Flows</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<FigmaIcon />}
                    >
                      <span className="utility-btn-text">Try the plugin</span>
                    </Button>
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<MyFlowsIcon />}
                      onPress={() => {
                        closeMobileMenu();
                        handleShowMyFlows();
                      }}
                    >
                      <span className="utility-btn-text">My Flows</span>
                    </Button>
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<UserIcon />}
                      onPress={() => {
                        closeMobileMenu();
                        setShowLogin(true);
                      }}
                    >
                      <span className="utility-btn-text">Sign in</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Login Modal */}
      {showLogin && (
        <Modal 
          isOpen={showLogin} 
          onOpenChange={setShowLogin}
          backdrop="blur"
          hideCloseButton={false}
          classNames={{
            wrapper: "z-[120]",
            base: "bg-popover border border-border shadow-xl rounded-2xl",
            backdrop: "backdrop-blur-md",
            body: "px-8 py-8 text-foreground",
            closeButton: "absolute right-4 top-4 z-10 btn-utility rounded-lg transition-all duration-200"
          }}
        >
          <ModalContent className="modal-animate-in">
            <ModalBody>
              <LoginForm 
                onSuccess={() => {
                  setShowLogin(false);
                  // If there was a pending flow, it will be saved automatically
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
}

export default Header;
