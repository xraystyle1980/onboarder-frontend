import React from "react";

/**
 * NOTE: The <linearGradient> id is the same for both icons. If you use both icons in the same button, the gradient may not render correctly due to duplicate ids in the DOM.
 * For best results, use only one of these icons per button, or change the id for each icon if needed.
 */

export const FigmaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#orangePinkGradient)"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className={className}
  >
    <defs>
      <linearGradient id="orangePinkGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5M12 2h3.5a3.5 3.5 0 1 1 0 7H12z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1-7 0m-7 7A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0m0-7A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5" />
  </svg>
);

export const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#orangePinkGradient)"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className={className}
  >
    <defs>
      <linearGradient id="orangePinkGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
); 