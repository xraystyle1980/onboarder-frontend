import { useState, useRef, useEffect } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function FlowCard({ flow, onDelete, onSelect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col relative cursor-pointer hover:bg-background-muted transition-colors group"
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
        <div className="relative ml-4" ref={menuRef} onClick={e => e.stopPropagation()}>
          <Dropdown isOpen={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="bordered"
                color="default"
                size="sm"
                aria-label="Open menu"
                className="text-muted-foreground hover:bg-background-muted opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon icon="lucide:more-vertical" width={16} height={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Flow actions"
              variant="flat"
              color="default"
              className="min-w-[120px]"
              itemClasses={{
                base: "data-[hover=true]:bg-background-muted data-[hover=true]:text-foreground",
                title: "text-foreground font-medium"
              }}
              classNames={{
                base: "bg-popover border border-border shadow-lg",
                list: "py-1"
              }}
            >
              <DropdownItem
                key="delete"
                textValue="Delete flow"
                description="Permanently delete this flow"
                startContent={<Icon icon="lucide:trash-2" width={16} height={16} className="text-red-500" />}
                className="text-red-500"
                onClick={() => { setMenuOpen(false); onDelete(flow.id); }}
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