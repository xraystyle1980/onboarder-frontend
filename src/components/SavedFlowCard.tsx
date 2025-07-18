import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingFlow } from '../types';

interface SavedFlow {
  id: string;
  flow_json: OnboardingFlow;
  prompt: string;
  product_name?: string;
  created_at: string;
}

interface SavedFlowCardProps {
  flow: SavedFlow;
  onDelete: (flowId: string) => void;
  onSelect: (flow: SavedFlow) => void;
}

// CSS class constants
const CARD_CLASSES = "bg-card border border-border rounded-lg p-4 flex flex-col relative cursor-pointer hover:border-accent transition-colors group";
const MENU_BUTTON_CLASSES = "rounded-lg border-border hover:bg-background-muted";
const FOOTER_CLASSES = "text-xs text-muted-foreground mt-auto pt-2 border-t border-border";

// Utility function for date formatting
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `Created ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

export default function SavedFlowCard({ flow, onDelete, onSelect }: SavedFlowCardProps) {
  const handleCardClick = () => {
    onSelect?.(flow);
  };

  const handleMenuAction = (key: string | number) => {
    if (key === 'delete') {
      onDelete?.(flow.id);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={CARD_CLASSES}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-lg text-card-foreground mb-1 truncate">
            {flow.product_name || 'Untitled Flow'}
          </div>
          <div className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {flow.prompt ? flow.prompt.charAt(0).toUpperCase() + flow.prompt.slice(1) : 'No description available'}
          </div>
        </div>
        <div className="relative ml-4" onClick={handleMenuClick}>
            <Dropdown 
              shouldBlockScroll={false}
              backdrop="transparent"
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  aria-label="Open menu"
                  className={MENU_BUTTON_CLASSES}
                >
                  <Icon icon="lucide:more-vertical" width={16} height={16} className="text-muted-foreground" />
                </Button>
              </DropdownTrigger>
            <DropdownMenu 
              aria-label="Flow actions" 
              onAction={handleMenuAction}
              variant="flat"
              color="default"
              className="min-w-[200px]"
              itemClasses={{
               
                title: "text-foreground font-medium",
                description: "text-muted-foreground text-sm",
                shortcut: "text-muted-foreground text-xs"
              }}
              classNames={{
                base: "",
                list: "py-2"
              }}
            >
              <DropdownItem
                key="delete"
                textValue="Delete flow"
                description="Permanently delete this flow"
                startContent={<Icon icon="lucide:trash-2" width={20} height={20} className="text-red-500" />}
                className="dropdown-item-delete"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={FOOTER_CLASSES}>
        {formatDate(flow.created_at)}
      </div>
    </div>
  );
} 