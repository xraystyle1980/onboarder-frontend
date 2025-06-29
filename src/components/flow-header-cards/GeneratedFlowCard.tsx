import React from 'react';
import { Icon } from "@iconify/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody } from "@heroui/react";
import { OnboardingFlow } from '../../types';

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
  
  const handleCreateWireframe = async () => {
    try {
      // Convert flow steps to Figma-compatible JSON
      const figmaJson = JSON.stringify(flow.steps, null, 2);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(figmaJson);
      
      // Open Figma - you may want to adjust this URL based on your Figma file
      window.open('figma://www.figma.com/file/YOUR_FILE_ID', '_blank');
      
      // Show success message
      alert('Flow copied to clipboard! Opening Figma...');
    } catch (error) {
      console.error('Error creating wireframe:', error);
      alert('Error copying flow to clipboard. Please try again.');
    }
  };

  return (
    <Card className="gradient-bg-card rounded-3xl px-0 max-w-5xl mx-auto mb-8 flex flex-col items-center relative border border-border">
      <CardBody className="p-0 w-full">
        {/* Close Button */}
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onClose}
          aria-label="Clear generated flow"
          className="absolute right-4 top-4 z-10"
        >
          <Icon icon="lucide:x" width={20} height={20} className="text-muted-foreground" />
        </Button>
        {/* Prompt Section */}
        <div className="flex flex-row items-center justify-between w-full p-8 pb-6 gap-4">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:format-quote-open" width={20} height={20} className="text-sky-400" />
              <span className="uppercase tracking-wide text-xs text-sky-400 font-semibold">Prompt</span>
            </div>
            <p className="mb-0 text-lg md:text-xl font-normal text-foreground leading-snug break-words">
              {safePrompt}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 ml-4 shrink-0">
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  size="lg"
                  className="rounded-xl"
                  startContent={<Icon icon="lucide:download" width={22} height={22} className="text-muted-foreground" />}
                  aria-label="Download Flow"
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Download options" 
                onAction={onDownload}
                variant="light"
                itemClasses={{
                  base: "data-[hover=true]:bg-gray-100 data-[hover=true]:text-foreground",
                  title: "text-foreground",
                  description: "text-muted-foreground"
                }}
              >
                <DropdownItem 
                  key="markdown" 
                  textValue="Markdown"
                  startContent={<Icon icon="logos:markdown" width={20} height={20} className="text-muted-foreground" />}
                >
                  Markdown
                </DropdownItem>
                <DropdownItem 
                  key="json" 
                  textValue="JSON"
                  startContent={<Icon icon="vscode-icons:file-type-json" width={20} height={20} className="text-muted-foreground" />}
                >
                  JSON
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              isIconOnly
              variant="bordered"
              size="lg"
              className="rounded-xl"
              startContent={<Icon icon="lucide:figma" width={22} height={22} className="text-muted-foreground" />}
              aria-label="Create Wireframes"
              onClick={handleCreateWireframe}
            />
            
            {isNewlyGenerated && (
              <Button 
                color="primary"
                variant="solid"
                size="lg"
                className="rounded-xl px-6 font-semibold btn-secondary"
                startContent={<Icon icon="lucide:save" width={20} height={20} className="text-black" />}
                onPress={() => onSaveFlow(safePrompt, flow)}
              >
                Save Flow
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}; 