import React from 'react';
import { themeBackgrounds, themeText, themeCards, themeButtons, combineThemeClasses } from '../utils/themeUtils';

/**
 * Example component showing how to use the new dark theme system
 * This demonstrates the semantic color tokens and utility patterns
 */
export const ExampleThemeUsage: React.FC = () => {
  return (
    <div className={themeBackgrounds.primary}>
      {/* Main content area */}
      <div className="container mx-auto p-6 space-y-6">
        
        {/* Card with semantic theme classes */}
        <div className={themeCards.default}>
          <h2 className={`${themeText.primary} text-xl font-semibold mb-4`}>
            Dark Theme Example
          </h2>
          <p className={themeText.muted}>
            This card uses semantic theme classes for consistent dark theming.
          </p>
        </div>

        {/* Interactive card */}
        <div className={themeCards.interactive}>
          <h3 className={`${themeText.primary} text-lg font-medium mb-2`}>
            Interactive Card
          </h3>
          <p className={themeText.muted}>
            Hover over this card to see the theme transition.
          </p>
        </div>

        {/* Button examples */}
        <div className="flex gap-4">
          <button className={combineThemeClasses(themeButtons.primary, 'px-4 py-2 rounded-md')}>
            Primary Button
          </button>
          <button className={combineThemeClasses(themeButtons.secondary, 'px-4 py-2 rounded-md')}>
            Secondary Button
          </button>
          <button className={combineThemeClasses(themeButtons.ghost, 'px-4 py-2 rounded-md')}>
            Ghost Button
          </button>
        </div>

        {/* Background variants */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`${themeBackgrounds.secondary} p-4 rounded-lg`}>
            <p className={themeText.primary}>Secondary Background</p>
          </div>
          <div className={`${themeBackgrounds.muted} p-4 rounded-lg`}>
            <p className={themeText.primary}>Muted Background</p>
          </div>
        </div>

        {/* Form input example */}
        <div className="space-y-2">
          <label className={themeText.primary}>Input Field</label>
          <input 
            type="text" 
            placeholder="Enter text..."
            className="w-full bg-input border border-border text-foreground rounded-md px-3 py-2 focus:border-accent focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * FUTURE: Example component with light/dark theme support
 * This shows how the component would look when light theme is added
 */
/*
export const ExampleThemeUsageWithLightSupport: React.FC = () => {
  return (
    <div className="bg-background dark:bg-background">
      <div className="container mx-auto p-6 space-y-6">
        
        Card with light/dark theme support
        <div className="bg-card text-card-foreground border border-border dark:bg-card dark:text-card-foreground dark:border-border">
          <h2 className="text-xl font-semibold mb-4">
            Light/Dark Theme Example
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground">
            This card automatically adapts to light and dark themes.
          </p>
        </div>

        Interactive card with theme support
        <div className="bg-card text-card-foreground border border-border hover:bg-background-muted transition-colors dark:bg-card dark:text-card-foreground dark:border-border dark:hover:bg-background-muted">
          <h3 className="text-lg font-medium mb-2">
            Interactive Card
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground">
            Hover over this card to see the theme transition.
          </p>
        </div>

        Button examples with theme support
        <div className="flex gap-4">
          <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 rounded-md">
            Primary Button
          </button>
          <button className="bg-background-secondary text-foreground border border-border hover:bg-background-muted dark:bg-background-secondary dark:text-foreground dark:border-border dark:hover:bg-background-muted px-4 py-2 rounded-md">
            Secondary Button
          </button>
          <button className="text-foreground hover:bg-background-muted dark:text-foreground dark:hover:bg-background-muted px-4 py-2 rounded-md">
            Ghost Button
          </button>
        </div>

        Background variants with theme support
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background-secondary dark:bg-background-secondary p-4 rounded-lg">
            <p className="text-foreground dark:text-foreground">Secondary Background</p>
          </div>
          <div className="bg-background-muted dark:bg-background-muted p-4 rounded-lg">
            <p className="text-foreground dark:text-foreground">Muted Background</p>
          </div>
        </div>

        Form input with theme support
        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground">Input Field</label>
          <input 
            type="text" 
            placeholder="Enter text..."
            className="w-full bg-input border border-border text-foreground rounded-md px-3 py-2 focus:border-accent focus:ring-accent dark:bg-input dark:border-border dark:text-foreground"
          />
        </div>
      </div>
    </div>
  );
};
*/ 