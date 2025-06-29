import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// ========================================
				// SEMANTIC THEME COLORS
				// These define the overall theme appearance
				// and are controlled by CSS custom properties
				// ========================================
				'foreground': 'var(--color-foreground)',
				'muted-foreground': 'var(--color-muted-foreground)',
				'background': 'var(--color-background)',
				'card': 'var(--color-card)',
				'card-foreground': 'var(--color-card-foreground)',
				'popover': 'var(--color-popover)',
				'popover-foreground': 'var(--color-popover-foreground)',
				'border': 'var(--color-border)',
				'input': 'var(--color-input)',
				'accent': 'var(--color-accent)',
				'accent-foreground': 'var(--color-accent-foreground)',
				'ring': 'var(--color-ring)',
				
				// Background variants for different UI layers
				background: {
					DEFAULT: 'var(--color-background)',
					secondary: 'var(--color-background-secondary)',
					muted: 'var(--color-background-muted)',
					accent: 'var(--color-background-accent)',
				},
				
				// ========================================
				// THEME-AWARE BRAND COLOR PALETTES
				// These adapt to light/dark modes via CSS custom properties
				// ========================================
				
				// Primary brand color (Blue-based) - Theme-aware
				// Use for: Primary buttons, links, main CTAs
				primary: {
					50: 'var(--color-primary-50)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
					800: 'var(--color-primary-800)',
					900: 'var(--color-primary-900)',
					950: 'var(--color-primary-950)',
				},
				
				// Secondary brand color (Slate-based) - Theme-aware
				// Use for: Secondary buttons, subtle backgrounds, muted text
				secondary: {
					50: 'var(--color-secondary-50)',
					100: 'var(--color-secondary-100)',
					200: 'var(--color-secondary-200)',
					300: 'var(--color-secondary-300)',
					400: 'var(--color-secondary-400)',
					500: 'var(--color-secondary-500)',
					600: 'var(--color-secondary-600)',
					700: 'var(--color-secondary-700)',
					800: 'var(--color-secondary-800)',
					900: 'var(--color-secondary-900)',
					950: 'var(--color-secondary-950)',
				},
				
				// Utility brand color (Zinc-based) - Theme-aware
				// Use for: Utility elements, neutral backgrounds, borders
				utility: {
					50: 'var(--color-utility-50)',
					100: 'var(--color-utility-100)',
					200: 'var(--color-utility-200)',
					300: 'var(--color-utility-300)',
					400: 'var(--color-utility-400)',
					500: 'var(--color-utility-500)',
					600: 'var(--color-utility-600)',
					700: 'var(--color-utility-700)',
					800: 'var(--color-utility-800)',
					900: 'var(--color-utility-900)',
					950: 'var(--color-utility-950)',
				},
				
				// ========================================
				// LEGACY/SPECIAL COLORS
				// Keep these for backward compatibility
				// ========================================
				'deep-night': '#0B0B14', // Your original dark background
			},
			// HeroUI Theme Customization
			layout: {
				// Customize border radius for all components
				borderRadius: {
					'xl': '0.75rem', // 12px
					'2xl': '1rem',   // 16px
				},
				// Customize border width
				borderWidth: {
					'1': '1px',
					'2': '2px',
				},
				// Customize disabled opacity
				opacity: {
					'disabled': '0.4',
				},
				// Customize spacing
				spacing: {
					'18': '4.5rem', // 72px
					'88': '22rem',  // 352px
				},
			},
			keyframes: {
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'slide-in-right': 'slide-in-right 0.3s ease-out'
			}
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};
