# Color Usage Guide

This guide explains how to use the different color systems in the Onboarder application.

## Color System Overview

We have **two complementary color systems**:

1. **Semantic Theme Colors** - For overall theme appearance (automatically adapt to light/dark)
2. **Theme-Aware Brand Color Palettes** - For brand elements (optimized for each theme)

## 1. Semantic Theme Colors

These colors define the overall theme appearance and automatically adapt to light/dark modes.

### When to Use Semantic Colors

- **Layout elements**: Main backgrounds, cards, containers
- **Text**: Headings, body text, labels
- **Borders**: Container borders, dividers
- **Interactive elements**: Buttons, inputs, focus states

### Available Semantic Colors

```typescript
// Backgrounds
bg-background          // Main page background
bg-background-secondary // Secondary background (sidebars, etc.)
bg-background-muted    // Muted background (subtle areas)
bg-background-accent   // Accent background (highlights)

// Text
text-foreground        // Primary text color
text-muted-foreground  // Secondary/muted text
text-card-foreground   // Text on cards
text-popover-foreground // Text in popovers

// Interactive elements
bg-card                // Card backgrounds
bg-popover             // Popover backgrounds
bg-input               // Input field backgrounds
border-border          // Standard borders
border-accent          // Accent borders (focus states)
```

### Examples

```tsx
// Main layout
<div className="bg-background text-foreground">
  <header className="bg-background-secondary border-b border-border">
    <h1 className="text-foreground">Title</h1>
  </header>
  
  <main className="bg-background">
    <div className="bg-card text-card-foreground border border-border">
      <p className="text-muted-foreground">Content</p>
    </div>
  </main>
</div>
```

## 2. Theme-Aware Brand Color Palettes

These are your brand colors that automatically adapt to light/dark themes for optimal contrast and readability.

### When to Use Brand Colors

- **Primary actions**: Main CTAs, important buttons
- **Status indicators**: Success, warning, error states
- **Brand elements**: Logos, highlights, special features
- **Gradients**: Brand-specific visual effects

### Available Brand Colors

```typescript
// Primary (Blue-based) - Automatically optimized for current theme
bg-primary-500         // Primary buttons, main CTAs
text-primary-600       // Primary text
border-primary-300     // Primary borders

// Secondary (Slate-based) - Automatically optimized for current theme
bg-secondary-100       // Subtle backgrounds
text-secondary-600     // Secondary text
border-secondary-200   // Secondary borders

// Utility (Zinc-based) - Automatically optimized for current theme
bg-utility-50          // Very subtle backgrounds
text-utility-500       // Utility text
border-utility-200     // Utility borders
```

### Key Differences Between Light and Dark Themes

#### Primary Colors
- **Light Theme**: `primary-500` = `#3b82f6` (brighter blue for dark text)
- **Dark Theme**: `primary-500` = `#0ea5e9` (lighter blue for light text)

#### Secondary Colors
- **Light Theme**: Optimized for light backgrounds
- **Dark Theme**: Optimized for dark backgrounds

#### Utility Colors
- **Light Theme**: Optimized for light backgrounds
- **Dark Theme**: Optimized for dark backgrounds

### Examples

```tsx
// Primary action button - automatically optimized for current theme
<button className="bg-primary-500 text-white hover:bg-primary-600">
  Get Started
</button>

// Secondary action button - automatically optimized for current theme
<button className="bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
  Learn More
</button>

// Status badge - automatically optimized for current theme
<span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
  Active
</span>

// Gradient using brand colors - automatically optimized for current theme
<div className="bg-gradient-to-r from-primary-500 to-primary-600">
  Hero Section
</div>
```

## 3. Combined Usage Examples

Here's how to combine both systems effectively:

### Card Component

```tsx
// Card with semantic theme + brand accent
<div className="bg-card text-card-foreground border border-border">
  <h3 className="text-foreground">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
  
  {/* Brand-colored action button - automatically theme-optimized */}
  <button className="bg-primary-500 text-white hover:bg-primary-600">
    Action
  </button>
</div>
```

### Form Component

```tsx
// Form with semantic theme + brand focus
<form className="bg-card text-card-foreground border border-border p-6">
  <label className="text-foreground">Email</label>
  <input 
    className="bg-input border border-border text-foreground focus:border-primary-500 focus:ring-primary-500"
    type="email"
  />
  
  <button className="bg-primary-500 text-white hover:bg-primary-600">
    Submit
  </button>
</form>
```

### Navigation Component

```tsx
// Navigation with semantic theme + brand highlights
<nav className="bg-background-secondary border-b border-border">
  <div className="text-foreground">
    <a href="/" className="text-primary-600 hover:text-primary-700">
      Logo
    </a>
    
    <div className="text-muted-foreground">
      <a href="/about" className="hover:text-foreground">About</a>
      <a href="/contact" className="hover:text-foreground">Contact</a>
    </div>
  </div>
</nav>
```

## 4. Best Practices

### ✅ Do's

- **Use semantic colors for layout**: `bg-background`, `text-foreground`
- **Use brand colors for actions**: `bg-primary-500`, `text-primary-600`
- **Combine both appropriately**: Semantic for structure, brand for emphasis
- **Trust the theme optimization**: Brand colors automatically adapt

### ❌ Don'ts

- **Don't use brand colors for layout**: Avoid `bg-primary-100` for main backgrounds
- **Don't use semantic colors for brand elements**: Avoid `bg-accent` for primary buttons
- **Don't hardcode theme-specific colors**: Let the system handle theme adaptation
- **Don't mix color systems randomly**: Be intentional about which system to use

### 🎯 Decision Framework

Ask yourself:

1. **Is this a layout/structural element?** → Use semantic colors
2. **Is this a brand-specific action or highlight?** → Use brand colors
3. **Is this a status or state indicator?** → Use brand colors
4. **Is this general content or navigation?** → Use semantic colors

## 5. Theme Optimization Benefits

### Automatic Contrast Optimization
- **Light Theme**: Brand colors are optimized for light backgrounds
- **Dark Theme**: Brand colors are optimized for dark backgrounds
- **No manual work**: Colors automatically adjust for readability

### Consistent Brand Identity
- **Same color family**: Primary stays blue, secondary stays slate
- **Optimized shades**: Each theme gets the best contrast variants
- **Smooth transitions**: Colors change seamlessly when switching themes

### Example: Primary Button in Both Themes

```tsx
// This button automatically looks great in both themes
<button className="bg-primary-500 text-white hover:bg-primary-600">
  Get Started
</button>

// Light theme: bg-primary-500 = #3b82f6 (bright blue)
// Dark theme:  bg-primary-500 = #0ea5e9 (lighter blue)
```

## 6. Migration Strategy

If you have existing components using hardcoded colors:

1. **Layout elements** → Replace with semantic colors
2. **Brand elements** → Replace with theme-aware brand colors
3. **Mixed usage** → Separate concerns appropriately

### Example Migration

```tsx
// Before (hardcoded colors)
<div className="bg-gray-900 text-white border border-gray-700">
  <button className="bg-blue-500 text-white">Action</button>
</div>

// After (theme-aware)
<div className="bg-card text-card-foreground border border-border">
  <button className="bg-primary-500 text-white">Action</button>
</div>
```

## 7. Future Light Theme Support

When you add light theme support:

- **Semantic colors** will automatically adapt via CSS custom properties
- **Brand colors** will automatically optimize for light backgrounds
- **No code changes needed** - everything works seamlessly in both themes

This dual-system approach gives you the best of both worlds: consistent theming with automatic optimization for each theme mode. 