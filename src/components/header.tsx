"use client";
import * as React from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, addToast } from "@heroui/react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { FigmaIcon, UserIcon, MyFlowsIcon } from "./shared/CustomIcons";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

interface HeaderProps {
  onShowMyFlows?: () => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

function Header({ onShowMyFlows, showLogin, setShowLogin }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = React.useState(false);
  const { user } = useSupabaseAuth();

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

  const handleFigmaPlugin = () => {
    window.open('https://www.figma.com/community/plugin/1524960567886107631', '_blank');
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
        onPress={handleFigmaPlugin}
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
        <span className="text-sm">Sign in</span>
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
        onPress={handleFigmaPlugin}
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
              <div className="flex justify-between items-center pl-7 pr-4 py-4 border-b border-border">
                <img 
                  src="/Onboader-Logo.svg" 
                  alt="Onboarder Logo" 
                  className="header-logo max-w-[150px]"
                />
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
              <div className="flex flex-col flex-1 overflow-hidden">
                {user ? (
                  <>
                    {/* Navigation Buttons - Top Section */}
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                      <Button
                        variant="solid"
                        color="default"
                        size="md"
                        className="btn-utility w-full justify-start"
                        startContent={<FigmaIcon className="w-5 h-5 flex-shrink-0" />}
                        onPress={() => {
                          closeMobileMenu();
                          handleFigmaPlugin();
                        }}
                      >
                        <span className="text-sm">Try the plugin</span>
                      </Button>
                      <Button
                        variant="solid"
                        color="default"
                        size="md"
                        className="btn-utility w-full justify-start"
                        startContent={<MyFlowsIcon className="w-5 h-5 flex-shrink-0" />}
                        onPress={() => {
                          closeMobileMenu();
                          if (onShowMyFlows) onShowMyFlows();
                        }}
                      >
                        <span className="text-sm">My Flows</span>
                      </Button>
                    </div>
                    
                    {/* User Profile Section - Bottom */}
                    <hr className="border-t border-border m-4" />
                    <div className="p-4">
                      <UserProfile isMobile={true} onMobileMenuClose={closeMobileMenu} />
                    </div>
                  </>
                ) : (
                  <div className="p-4 space-y-3">
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<FigmaIcon className="w-5 h-5 flex-shrink-0" />}
                      onPress={() => {
                        closeMobileMenu();
                        handleFigmaPlugin();
                      }}
                    >
                      <span className="text-sm">Try the plugin</span>
                    </Button>
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<MyFlowsIcon className="w-5 h-5 flex-shrink-0" />}
                      onPress={() => {
                        closeMobileMenu();
                        handleShowMyFlows();
                      }}
                    >
                      <span className="text-sm">My Flows</span>
                    </Button>
                    <Button
                      variant="solid"
                      color="default"
                      size="md"
                      className="btn-utility w-full justify-start"
                      startContent={<UserIcon className="w-5 h-5 flex-shrink-0" />}
                      onPress={() => {
                        closeMobileMenu();
                        setShowLogin(true);
                      }}
                    >
                      <span className="text-sm">Sign in</span>
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
          scrollBehavior="inside"
          classNames={{
            wrapper: "z-[120] !h-[100dvh] overflow-y-auto p-4 md:p-6",
            base: "bg-popover border border-border shadow-xl rounded-2xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-3rem)]",
            backdrop: "backdrop-blur-md !h-[100dvh]",
            body: "px-8 py-8 text-foreground overflow-y-auto",
            closeButton: "absolute right-4 top-4 z-10 btn-utility rounded-lg transition-all duration-200"
          }}
          style={{
            '--modal-backdrop-opacity': '0.5'
          } as any}
        >
          <ModalContent className="modal-animate-in">
            <ModalHeader className="sr-only" id="signin-modal-title">
              Sign In
            </ModalHeader>
            <ModalBody>
              <div 
                role="dialog" 
                aria-labelledby="signin-modal-title"
                aria-modal="true"
                tabIndex={-1}
                ref={(el) => {
                  if (el && showLogin) {
                    setTimeout(() => {
                      el.focus({ preventScroll: true });
                    }, 100);
                  }
                }}
                className="outline-none"
              >
                <LoginForm 
                  onSuccess={(email) => {
                    setShowLogin(false);
                    addToast({
                      title: `Signed in as ${email}`,
                      color: 'success'
                    });
                  }}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
}

export default Header;
