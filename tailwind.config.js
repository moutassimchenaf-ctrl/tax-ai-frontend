/** @type {import('tailwindcss').Config} */
const tokens = require('./design/tokens/tokens.json');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Huly Replica Palette
        huly: {
          bg: '#1c1c1c',
          sidebar: '#151516',
          border: '#2e2e2e',
          text: {
            primary: '#e1e1e3',
            secondary: '#a1a1aa',
          },
          accent: '#2e63ea',
        },
        // Quantum Core Palette
        white: '#FFFFFF',
        navy: {
          900: '#0A1628', // Deep Navy Structure
        },
        teal: {
          500: '#0898BB', // Energy / Rim Light
        },
        // Legacy Token Colors (Keep for compatibility if needed)
        primary: {
          teal: tokens.brand.colors.primary.teal.value,
          'blue-teal': tokens.brand.colors.primary['blue-teal'].value,
          cyan: tokens.brand.colors.primary.cyan.value,
          'light-cyan': tokens.brand.colors.primary['light-cyan'].value,
          'dark-teal': tokens.brand.colors.primary['dark-teal'].value,
          'darker-teal': tokens.brand.colors.primary['darker-teal'].value,
          midnight: tokens.brand.colors.primary.midnight.value,
          slate: tokens.brand.colors.primary.slate.value,
        },
        secondary: {
          50: tokens.brand.colors.secondary['50'].value,
          100: tokens.brand.colors.secondary['100'].value,
          200: tokens.brand.colors.secondary['200'].value,
          300: tokens.brand.colors.secondary['300'].value,
          400: tokens.brand.colors.secondary['400'].value,
          500: tokens.brand.colors.secondary['500'].value,
          600: tokens.brand.colors.secondary['600'].value,
          700: tokens.brand.colors.secondary['700'].value,
          800: tokens.brand.colors.secondary['800'].value,
          900: tokens.brand.colors.secondary['900'].value,
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontWeight: {
        'thin': tokens.brand.typography.weights.thin.value,
        'light': tokens.brand.typography.weights.light.value,
        'normal': tokens.brand.typography.weights.regular.value,
        'medium': tokens.brand.typography.weights.medium.value,
        'bold': tokens.brand.typography.weights.bold.value,
      },
      // Keep existing spacing/borderRadius extensions or map them if needed
      borderRadius: {
        'none': '0',
        'sm': tokens.brand.borderRadius.sm.value,
        'DEFAULT': tokens.brand.borderRadius.md.value,
        'md': tokens.brand.borderRadius.md.value,
        'lg': tokens.brand.borderRadius.lg.value,
        'xl': tokens.brand.borderRadius.xl.value,
        '2xl': tokens.brand.borderRadius['2xl'].value,
        'full': tokens.brand.borderRadius.full.value,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'), // Added for Radix/shadcn animations
  ],
};