import React from 'react';
import { Button } from '@heroui/react';
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
    <footer className="w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 items-center">
          {/* First Row: Logo, Version, and Navigation Links */}
          <div className="flex items-center justify-center gap-6">
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

          {/* Second Row: Copyright */}
          <div className="text-xs text-gray-500">
            &copy; {currentYear} Onboarder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}