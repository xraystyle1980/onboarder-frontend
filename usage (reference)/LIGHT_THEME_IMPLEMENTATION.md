# Light Theme Implementation Guide

This document explains how to add light theme support to the Onboarder application when you're ready to implement it.

## Current State

The application currently uses a dark-only theme system with semantic color tokens defined as CSS custom properties. All theme colors are ready for light theme expansion.

## Implementation Steps

### 1. Enable Light Theme CSS Custom Properties

In `src/index.css`, uncomment the light theme section:

```css
/* Light theme color variables (commented out for future use) */
:root {
  /* Light theme colors */
  --color-background: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-background-muted: #f1f5f9;
  --color-background-accent: #e2e8f0;
  
  --color-foreground: #0f172a;
  --color-muted-foreground: #64748b;
  
  --color-card: #ffffff;
  --color-card-foreground: #0f172a;
  
  --color-popover: #ffffff;
  --color-popover-foreground: #0f172a;
  
  --color-border: #e2e8f0;
  --color-input: #ffffff;
  
  --color-accent: #3b82f6;
  --color-accent-foreground: #ffffff;
  
  --color-ring: #3b82f6;
}

.dark {
  /* Dark theme overrides */
  --color-background: #0B0B14;
  --color-background-secondary: #111827;
  --color-background-muted: #1f2937;
  --color-background-accent: #374151;
  
  --color-foreground: #f9fafb;
  --color-muted-foreground: #9ca3af;
  
  --color-card: #111827;
  --color-card-foreground: #f9fafb;
  
  --color-popover: #111827;
  --color-popover-foreground: #f9fafb;
  
  --color-border: #374151;
  --color-input: #374151;
  
  --color-accent: #3b82f6;
  --color-accent-foreground: #ffffff;
  
  --color-ring: #3b82f6;
}
```

### 2. Remove Hardcoded Dark Class

In `index.html`, remove the hardcoded `dark` class:

```html
<!-- Before -->
<html lang="en" class="dark">

<!-- After -->
<html lang="en">
```

### 3. Add Theme Switching Logic

Uncomment and use the theme switching utilities in `src/utils/themeUtils.ts`:

```typescript
export const themeSwitcher = {
  setTheme: (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  },
  
  getTheme: (): 'light' | 'dark' => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
  },
  
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
```

### 4. Initialize Theme on App Load

In `src/main.tsx`, add theme initialization:

```typescript
import { themeSwitcher } from './utils/themeUtils';

// Initialize theme before rendering
themeSwitcher.initTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // ... existing code
);
```

### 5. Add Theme Toggle Component

Create a theme toggle component in your header or settings:

```typescript
import React from 'react';
import { themeSwitcher } from '../utils/themeUtils';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(themeSwitcher.getTheme());

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    themeSwitcher.setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-background-secondary text-foreground hover:bg-background-muted"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
};
```

### 6. Update Components for Light Theme Support

For components that need light theme support, use Tailwind's `dark:` prefix:

```typescript
// Before (dark only)
<div className="bg-card text-card-foreground">

// After (light/dark support)
<div className="bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
```

### 7. Update Utility Patterns

Uncomment and use the light theme utility patterns in `src/utils/themeUtils.ts`:

```typescript
export const lightThemeBackgrounds = {
  primary: 'bg-background dark:bg-background',
  secondary: 'bg-background-secondary dark:bg-background-secondary',
  // ... etc
};
```

## Color Palette Reference

### Light Theme Colors
- **Background**: `#ffffff` (White)
- **Background Secondary**: `#f8fafc` (Slate 50)
- **Background Muted**: `#f1f5f9` (Slate 100)
- **Foreground**: `#0f172a` (Slate 900)
- **Muted Foreground**: `#64748b` (Slate 500)
- **Border**: `#e2e8f0` (Slate 200)

### Dark Theme Colors
- **Background**: `#0B0B14` (Deep Night)
- **Background Secondary**: `#111827` (Slate 900)
- **Background Muted**: `#1f2937` (Slate 800)
- **Foreground**: `#f9fafb` (Slate 50)
- **Muted Foreground**: `#9ca3af` (Slate 400)
- **Border**: `#374151` (Slate 700)

## Testing

1. Test both light and dark themes
2. Verify theme persistence across page reloads
3. Test system theme preference detection
4. Ensure all components look good in both themes
5. Test theme switching performance

## Migration Strategy

1. Start with the theme switching infrastructure
2. Update one component at a time
3. Test thoroughly in both themes
4. Gradually replace dark-only classes with theme-aware ones
5. Update utility patterns as needed

## Notes

- The current semantic color system makes this migration straightforward
- All existing components will continue to work during the transition
- You can implement this incrementally without breaking existing functionality
- The CSS custom properties approach ensures smooth theme transitions 