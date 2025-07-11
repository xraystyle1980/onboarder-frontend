import React from 'react';
import { Icon } from "@iconify/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody } from "@heroui/react";
import { OnboardingFlow } from '../../types';

// Constants for dropdown configuration
const DOWNLOAD_OPTIONS = {
  MARKDOWN: {
    key: 'markdown',
    title: 'Markdown',
    description: 'Import this into your workflow to keep building',
    icon: 'mdi:language-markdown',
    textValue: 'Download as Markdown'
  },
  JSON: {
    key: 'json', 
    title: 'JSON',
    description: 'For Figma plugin integration',
    icon: 'mdi:code-json',
    textValue: 'Download as JSON'
  }
} as const;

// CSS class constants
const BUTTON_CLASSES = "rounded-xl border-border hover:bg-background-muted transition-colors";
const DROPDOWN_CLASSES = "min-w-[240px]";

interface GeneratedFlowCardProps {
  prompt?: string;
  flow: OnboardingFlow;
  isNewlyGenerated?: boolean;
  onSaveFlow: (prompt: string, flow: OnboardingFlow) => void;
  onDownload: (format: 'markdown' | 'html' | 'json') => void;
  onClose: () => void;
}

export const GeneratedFlowCard: React.FC<GeneratedFlowCardProps> = ({ 
  prompt, 
  flow,
  isNewlyGenerated,
  onSaveFlow,
  onDownload,
  onClose
}) => {
  const safePrompt = typeof prompt === 'string' ? prompt : '';
  
  const handleFigmaPlugin = () => {
    window.open('https://www.figma.com/community/plugin/1524960567886107631', '_blank');
  };

  const handleDownloadAction = (key: string | number) => {
    if (typeof key === 'string' && (key === 'markdown' || key === 'json')) {
      onDownload(key as 'markdown' | 'json');
    }
  };

  return (
    <section className="container mx-auto px-3 lg:px-0">
    <Card className="gradient-bg-card rounded-3xl px-0 max-w-5xl mx-auto mb-8 flex flex-col items-center relative border border-border">
      <CardBody className="p-0 w-full">
        {/* Close Button */}
        <Button
          isIconOnly
          variant="solid"
          size="sm"
          onPress={onClose}
          aria-label="Clear generated flow"
          className="btn-utility absolute right-2 top-2 z-10"
        >
          <Icon icon="lucide:x" width={20} height={20} className="text-muted-foreground" />
        </Button>
        {/* Prompt Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full p-8 pb-6 gap-4">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:format-quote-open" width={20} height={20} className="text-sky-400" />
              <span className="uppercase tracking-wide text-xs text-sky-400 font-semibold">Prompt</span>
            </div>
            <p className="mb-0 text-lg md:text-xl font-normal text-foreground leading-snug break-words">
              {safePrompt?.charAt(0).toUpperCase() + safePrompt?.slice(1)}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 ml-4 shrink-0">
            <Dropdown 
              shouldBlockScroll={false}
              backdrop="transparent"
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  size="lg"
                  className={BUTTON_CLASSES}
                  startContent={<Icon icon="lucide:download" width={22} height={22} className="text-muted-foreground" />}
                  aria-label="Download flow options"
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Download flow options" 
                onAction={handleDownloadAction}
                variant="flat"
                color="default"
                className={DROPDOWN_CLASSES}
                classNames={{
                  base: "bg-background border border-border",
                  list: "py-2"
                }}
              >
                <DropdownItem 
                  key={DOWNLOAD_OPTIONS.MARKDOWN.key}
                  textValue={DOWNLOAD_OPTIONS.MARKDOWN.textValue}
                  description={DOWNLOAD_OPTIONS.MARKDOWN.description}
                  startContent={
                    <Icon 
                      icon={DOWNLOAD_OPTIONS.MARKDOWN.icon} 
                      width={20} 
                      height={20} 
                      className="text-muted-foreground" 
                    />
                  }
                  className="text-foreground hover:bg-background-muted data-[hover=true]:bg-background-muted"
                >
                  {DOWNLOAD_OPTIONS.MARKDOWN.title}
                </DropdownItem>
                <DropdownItem 
                  key={DOWNLOAD_OPTIONS.JSON.key}
                  textValue={DOWNLOAD_OPTIONS.JSON.textValue}
                  description={DOWNLOAD_OPTIONS.JSON.description}
                  startContent={
                    <Icon 
                      icon={DOWNLOAD_OPTIONS.JSON.icon} 
                      width={20} 
                      height={20} 
                      className="text-muted-foreground" 
                    />
                  }
                  className="text-foreground hover:bg-background-muted data-[hover=true]:bg-background-muted"
                >
                  {DOWNLOAD_OPTIONS.JSON.title}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              isIconOnly
              variant="bordered"
              size="lg"
              className={BUTTON_CLASSES}
              startContent={<Icon icon="lucide:figma" width={22} height={22} className="text-muted-foreground" />}
              aria-label="Open Figma plugin page"
              onClick={handleFigmaPlugin}
            />
            
            {isNewlyGenerated && (
              <Button 
                color="primary"
                variant="solid"
                size="lg"
                className="rounded-xl px-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
                startContent={<Icon icon="lucide:save" width={20} height={20} className="text-accent-foreground" />}
                onPress={() => onSaveFlow(safePrompt, flow)}
              >
                Save Flow
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
    </section>
  );
}; 