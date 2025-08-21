// UI Constants
export const CARD_WIDTH = 340 + 8; // Card width + gap in pixels

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds


// Tab Constants
export const TABS = {
  SUMMARY: 'summary',
  UX_CONTEXT: 'uxContext',
  NARRATIVE: 'narrative',
} as const;

// File Export Constants
export const EXPORT_FORMATS = {
  MARKDOWN: 'markdown',
  HTML: 'html',
  JSON: 'json',
} as const;

// Animation Constants
export const TRANSITION_DURATION = 300; // milliseconds 