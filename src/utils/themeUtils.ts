/**
 * Dark theme utility classes and patterns
 * Use these for consistent theming across the application
 * 
 * FUTURE: When adding light theme support, you can:
 * 1. Uncomment the light theme CSS custom properties in index.css
 * 2. Use Tailwind's dark: prefix for dark-specific overrides
 * 3. Add light theme variants to these utility patterns
 */

// Common background patterns
export const themeBackgrounds = {
  primary: 'bg-background',
  secondary: 'bg-background-secondary',
  muted: 'bg-background-muted',
  accent: 'bg-background-accent',
  card: 'bg-card',
  popover: 'bg-popover',
} as const;

// FUTURE: Light theme background patterns (when needed)
/*
export const lightThemeBackgrounds = {
  primary: 'bg-background dark:bg-background',
  secondary: 'bg-background-secondary dark:bg-background-secondary',
  muted: 'bg-background-muted dark:bg-background-muted',
  accent: 'bg-background-accent dark:bg-background-accent',
  card: 'bg-card dark:bg-card',
  popover: 'bg-popover dark:bg-popover',
} as const;
*/

// Common text patterns
export const themeText = {
  primary: 'text-foreground',
  muted: 'text-muted-foreground',
  card: 'text-card-foreground',
  popover: 'text-popover-foreground',
  accent: 'text-accent-foreground',
} as const;

// FUTURE: Light theme text patterns (when needed)
/*
export const lightThemeText = {
  primary: 'text-foreground dark:text-foreground',
  muted: 'text-muted-foreground dark:text-muted-foreground',
  card: 'text-card-foreground dark:text-card-foreground',
  popover: 'text-popover-foreground dark:text-popover-foreground',
  accent: 'text-accent-foreground dark:text-accent-foreground',
} as const;
*/

// Common border patterns
export const themeBorders = {
  default: 'border-border',
  muted: 'border-border/50',
  accent: 'border-accent',
} as const;

// Common input patterns
export const themeInputs = {
  default: 'bg-input border-border text-foreground',
  focus: 'focus:border-accent focus:ring-accent',
} as const;

// Card patterns
export const themeCards = {
  default: 'bg-card text-card-foreground border border-border',
  elevated: 'bg-card text-card-foreground border border-border shadow-lg',
  interactive: 'bg-card text-card-foreground border border-border hover:bg-background-muted transition-colors',
} as const;

// FUTURE: Light theme card patterns (when needed)
/*
export const lightThemeCards = {
  default: 'bg-card text-card-foreground border border-border dark:bg-card dark:text-card-foreground dark:border-border',
  elevated: 'bg-card text-card-foreground border border-border shadow-lg dark:bg-card dark:text-card-foreground dark:border-border dark:shadow-lg',
  interactive: 'bg-card text-card-foreground border border-border hover:bg-background-muted transition-colors dark:bg-card dark:text-card-foreground dark:border-border dark:hover:bg-background-muted',
} as const;
*/

// Button patterns
export const themeButtons = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
  secondary: 'bg-background-secondary text-foreground border border-border hover:bg-background-muted',
  ghost: 'text-foreground hover:bg-background-muted',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
} as const;

// Utility function to combine theme classes
export const combineThemeClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Common component patterns
export const themeComponents = {
  card: combineThemeClasses(themeCards.default, 'rounded-lg p-6'),
  cardInteractive: combineThemeClasses(themeCards.interactive, 'rounded-lg p-6 cursor-pointer'),
  input: combineThemeClasses(themeInputs.default, themeInputs.focus, 'rounded-md px-3 py-2'),
  button: combineThemeClasses('rounded-md px-4 py-2 font-medium transition-colors'),
} as const;

// FUTURE: Theme switching utilities (when implementing light/dark toggle)
/*
export const themeSwitcher = {
  // Add theme to HTML element
  setTheme: (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  },
  
  // Get current theme
  getTheme: (): 'light' | 'dark' => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
  },
  
  // Initialize theme on app load
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      themeSwitcher.setTheme(savedTheme as 'light' | 'dark');
    } else if (prefersDark) {
      themeSwitcher.setTheme('dark');
    } else {
      themeSwitcher.setTheme('light');
    }
  }
};
*/ 