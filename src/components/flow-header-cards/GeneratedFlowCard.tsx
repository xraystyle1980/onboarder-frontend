import React from 'react';
import { Icon } from "@iconify/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
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
    <div className="bg-slate-100 rounded-3xl px-8 pb-8 pt-10 max-w-2xl mx-auto my-8 flex flex-col items-center relative">
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={onClose}
        aria-label="Clear generated flow"
        className="absolute right-4 top-4"
      >
        <Icon icon="lucide:x" width={20} height={20} />
      </Button>
      <h4 className="text-xl text-center mb-6 mt-1">{safePrompt.charAt(0).toUpperCase() + safePrompt.slice(1)}</h4>
      <div className="flex w-full justify-center">
        {isNewlyGenerated && (
          <Button 
            color="success"
            variant="solid"
            size="md"
            className="w-full md:w-[60%] my-2"
            startContent={<Icon icon="lucide:save" width={20} height={20} />}
            onPress={() => onSaveFlow(safePrompt, flow)}
          >
            Save Flow
          </Button>
        )}
      </div>
      <div className="flex gap-4 mt-4">
        <div>
          <Dropdown shouldBlockScroll={false}>
            <DropdownTrigger>
              <Button
                fullWidth
                variant="light"
                size="md"
                startContent={<Icon icon="lucide:download" width={20} />}
              >
                Download Flow
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Download options" 
              onAction={onDownload}
              variant="light"
              itemClasses={{
                base: "data-[hover=true]:bg-gray-100 data-[hover=true]:text-slate-900",
                title: "text-slate-900",
                description: "text-slate-500"
              }}
            >
              <DropdownItem 
                key="markdown" 
                textValue="Markdown"
                startContent={<Icon icon="logos:markdown" width={20} height={20} />}
              >
                Markdown
              </DropdownItem>
              <DropdownItem 
                key="json" 
                textValue="JSON"
                startContent={<Icon icon="vscode-icons:file-type-json" width={20} height={20} />}
              >
                JSON
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        
        {/* Temporarily commented out for initial launch - will be re-enabled after feedback
        <Button
          variant="solid"
          color="primary"
          size="md"
          startContent={<Icon icon="lucide:figma" width={20} />}
          onClick={handleCreateWireframe}
        >
          Create Wireframes
        </Button>
        */}

        
      </div>
    </div>
  );
}; 