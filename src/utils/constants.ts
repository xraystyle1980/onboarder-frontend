// UI Constants
export const CARD_WIDTH = 340 + 8; // Card width + gap in pixels

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

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