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

  return (
    <header className="font-poppins flex w-full flex-col bg-white py-3">
      <div className="flex items-center justify-center container mx-auto" >
        <div className="flex flex-grow items-center justify-between px-8" >
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-3" >
            <div className="flex h-8 w-8 flex-col items-center justify-center rounded-lg border-solid border-gray-200 px-[9px] py-[8.8px] [background-image:linear-gradient(90deg,_#9333ea,_#2563eb)]" >
              <Icon icon="lucide:sparkles" className="h-3.5 w-3.5" />
            </div>
            <div className="text-xl font-bold leading-7 text-gray-900">
              Onboarder
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 border-solid border-gray-200" >
            {user ? (
              <Dropdown>
                <DropdownTrigger>
                  <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition">
                    <span className="text-gray-700">{user.email}</span>
                    <Icon icon="lucide:chevron-down" className="w-4 h-4" />
                  </button>
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
                      await supabase.auth.signOut();
                    }}
                    className="text-red-600"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                variant="solid"
                color="primary"
                size="md"
                onPress={() => setShowLogin(true)}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <Icon icon="lucide:x" className="w-6 h-6" />
              ) : (
                <Icon icon="lucide:menu" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a
              href="#"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              Examples
            </a>
            <a
              href="#"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              Docs
            </a>
            {user ? (
              <Button
                onPress={async () => {
                  closeMobileMenu();
                  await supabase.auth.signOut();
                }}
                variant="light"
                color="default"
                size="sm"
                fullWidth
                className="text-left px-3 py-2 rounded-md text-base transition-colors"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onPress={() => { closeMobileMenu(); setShowLogin(true); }}
                variant="solid"
                color="primary"
                size="md"
                fullWidth
                className="text-left px-3 py-2 rounded-md text-base transition-colors"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
      {showLogin && (
        <Modal isOpen={showLogin} onOpenChange={setShowLogin}>
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
              <LoginForm onClose={() => setShowLogin(false)} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
}

export default Header;
