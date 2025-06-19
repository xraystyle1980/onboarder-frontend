import { useState, useRef, useEffect } from 'react';
import { Button } from "@heroui/react";
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
      className="bg-white rounded shadow p-4 flex flex-col relative cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
      onClick={() => onSelect && onSelect(flow)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-lg">{flow.product_name || 'Untitled Flow'}</div>
          <div className="text-slate-500 text-sm mb-2">{flow.prompt ? flow.prompt.charAt(0).toUpperCase() + flow.prompt.slice(1) : ''}</div>
        </div>
        <div className="relative" ref={menuRef} onClick={e => e.stopPropagation()}>
          <Button
            isIconOnly
            variant="light"
            color="default"
            size="sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Icon icon="lucide:more-vertical" className="w-5 h-5" />
          </Button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => { setMenuOpen(false); onDelete(flow.id); }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-slate-400 mt-2">{new Date(flow.created_at).toLocaleString()}</div>
    </div>
  );
} 