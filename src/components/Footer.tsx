import React from 'react';
import { Button, addToast } from '@heroui/react';
import { FigmaIconMuted, MyFlowsIconMuted, LogomarkIcon } from './shared/CustomIcons';

interface FooterProps {
  onShowMyFlows?: () => void;
  onShowLogin?: () => void;
}

export default function Footer({ onShowMyFlows, onShowLogin }: FooterProps) {
  const handleFigmaPlugin = () => {
    window.open('https://www.figma.com/community/plugin/1524960567886107631', '_blank');
  };

  const currentYear = new Date().getFullYear();


  return (
    <footer className="w-full mt-8 lg:mt-16">
      
      <div className="container mx-auto px-4 py-8 border-t border-border max-w-5xl">
        <div className="flex flex-col gap-4 items-center">
          {/* First Row: Logo, Version, and Navigation Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <LogomarkIcon className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">v0.5.0 beta</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="light"
                size="sm"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-normal"
                startContent={<FigmaIconMuted className="w-4 h-4" />}
                onPress={handleFigmaPlugin}
              >
                Try the plugin
              </Button>
              
              {onShowMyFlows && (
                <Button
                  variant="light"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-normal"
                  startContent={<MyFlowsIconMuted className="w-4 h-4" />}
                  onPress={onShowMyFlows}
                >
                  My Flows
                </Button>
              )}
              
              {onShowLogin && (
                <Button
                  variant="light"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-normal"
                  onPress={onShowLogin}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>

          {/* Second Row: Copyright and Legal Links */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-gray-500">
            <span>&copy; {currentYear} Onboarder. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a 
                href="/terms-of-service.md" 
                download
                className="text-gray-400 active:text-foreground focus:text-foreground hover:text-foreground transition-colors underline"
              >
                Terms of Service
              </a>
              <a 
                href="/privacy-policy.md" 
                download
                className="text-gray-400 active:text-foreground focus:text-foreground hover:text-foreground transition-colors underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}