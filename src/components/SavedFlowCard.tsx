import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SavedFlowCard({ flow, onDelete, onSelect }) {

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col relative cursor-pointer hover:border-accent transition-colors group"
      onClick={() => onSelect && onSelect(flow)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg text-card-foreground mb-1 truncate">
            {flow.product_name || 'Untitled Flow'}
          </div>
          <div className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {flow.prompt ? flow.prompt.charAt(0).toUpperCase() + flow.prompt.slice(1) : 'No description available'}
          </div>
        </div>
        <div className="relative ml-4" onClick={e => e.stopPropagation()}>
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
                  className="rounded-lg border-border hover:bg-background-muted"
                >
                  <Icon icon="lucide:more-vertical" width={16} height={16} className="text-muted-foreground" />
                </Button>
              </DropdownTrigger>
            <DropdownMenu 
              aria-label="Flow actions" 
              onAction={(key) => {
                if (key === 'delete') {
                  onDelete(flow.id);
                }
              }}
              variant="flat"
              color="default"
              className="min-w-[200px]"
              itemClasses={{
                base: "data-[hover=true]:bg-background-muted data-[hover=true]:text-foreground",
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
                className="text-red-500"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
        Created {new Date(flow.created_at).toLocaleDateString()} at {new Date(flow.created_at).toLocaleTimeString()}
      </div>
    </div>
  );
} 