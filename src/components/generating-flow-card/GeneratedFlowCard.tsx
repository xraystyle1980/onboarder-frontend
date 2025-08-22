import React from 'react';
import { Icon } from "@iconify/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody } from "@heroui/react";
import { OnboardingFlow } from '../../types';

// Constants for dropdown configuration
const DOWNLOAD_OPTIONS = {
  MARKDOWN: {
    key: 'markdown',
    title: 'Markdown',
    description: 'Use this in your workflow to keep building',
    icon: 'mdi:language-markdown',
    textValue: 'Download as Markdown'
  }
} as const;

const FIGMA_OPTIONS = {
  JSON: {
    key: 'json', 
    title: 'Download JSON',
    description: 'Use this with the Figma plugin',
    icon: 'mdi:code-json',
    textValue: 'Download JSON'
  },
  PLUGIN: {
    key: 'plugin',
    title: 'Get Plugin',
    description: 'Open Figma plugin page',
    icon: 'lucide:figma',
    textValue: 'Get Plugin'
  }
} as const;

// CSS class constants
const BUTTON_CLASSES = "rounded-xl border-border hover:bg-background-muted transition-colors";
const DROPDOWN_CLASSES = "min-w-[240px]";

interface GeneratedFlowCardProps {
  prompt?: string;
  flow: OnboardingFlow;
  isNewlyGenerated?: boolean;
  isFlowSaved?: boolean;
  onSaveFlow: (prompt: string, flow: OnboardingFlow) => void;
  onDownload: (format: 'markdown' | 'html' | 'json') => void;
  onClose: () => void;
}

export const GeneratedFlowCard: React.FC<GeneratedFlowCardProps> = ({ 
  prompt, 
  flow,
  isNewlyGenerated,
  isFlowSaved = false,
  onSaveFlow,
  onDownload,
  onClose
}) => {
  const safePrompt = typeof prompt === 'string' ? prompt : '';
  
  const handleFigmaAction = (key: string | number) => {
    if (key === 'json') {
      onDownload('json');
    } else if (key === 'plugin') {
      window.open('https://www.figma.com/community/plugin/1524960567886107631', '_blank');
    }
  };

  const handleDownloadAction = (key: string | number) => {
    if (key === 'markdown') {
      onDownload('markdown');
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
                  aria-label="Download options"
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Download options" 
                onAction={handleDownloadAction}
                variant="flat"
                color="default"
                className={DROPDOWN_CLASSES}
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
                  className="text-foreground"
                >
                  {DOWNLOAD_OPTIONS.MARKDOWN.title}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
                  startContent={<Icon icon="lucide:figma" width={22} height={22} className="text-muted-foreground" />}
                  aria-label="Figma options"
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Figma options" 
                onAction={handleFigmaAction}
                variant="flat"
                color="default"
                className={DROPDOWN_CLASSES}
              >
                <DropdownItem 
                  key={FIGMA_OPTIONS.JSON.key}
                  textValue={FIGMA_OPTIONS.JSON.textValue}
                  description={FIGMA_OPTIONS.JSON.description}
                  startContent={
                    <Icon 
                      icon={FIGMA_OPTIONS.JSON.icon} 
                      width={20} 
                      height={20} 
                      className="text-muted-foreground" 
                    />
                  }
                  className="text-foreground"
                >
                  {FIGMA_OPTIONS.JSON.title}
                </DropdownItem>
                <DropdownItem 
                  key={FIGMA_OPTIONS.PLUGIN.key}
                  textValue={FIGMA_OPTIONS.PLUGIN.textValue}
                  description={FIGMA_OPTIONS.PLUGIN.description}
                  startContent={
                    <Icon 
                      icon={FIGMA_OPTIONS.PLUGIN.icon} 
                      width={20} 
                      height={20} 
                      className="text-muted-foreground" 
                    />
                  }
                  className="text-foreground"
                >
                  {FIGMA_OPTIONS.PLUGIN.title}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            {isNewlyGenerated && (
              <Button 
                color={isFlowSaved ? "success" : "primary"}
                variant={isFlowSaved ? "flat" : "solid"}
                size="lg"
                className={`rounded-xl px-6 font-semibold ${isFlowSaved 
                  ? "bg-success/20 text-success border-success/30" 
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
                }`}
                startContent={
                  <Icon 
                    icon={isFlowSaved ? "lucide:check" : "lucide:save"} 
                    width={20} 
                    height={20} 
                    className={isFlowSaved ? "text-success" : "text-accent-foreground"} 
                  />
                }
                onPress={() => onSaveFlow(safePrompt, flow)}
                isDisabled={isFlowSaved}
              >
                {isFlowSaved ? "Flow Saved" : "Save Flow"}
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
    </section>
  );
}; 