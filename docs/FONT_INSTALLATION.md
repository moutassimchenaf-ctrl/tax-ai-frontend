# Font Installation Guide

## Required Fonts

Download the following fonts and place them in `public/fonts/`:

### 1. Montserrat Thin (Latin - Primary)
- **Weight**: 100 (Thin)
- **Source**: [Google Fonts](https://fonts.google.com/specimen/Montserrat)
- **Files needed**:
  - `Montserrat-Thin.ttf` or `.woff2`

### 2. Lato Light (Latin - Body)
- **Weight**: 300 (Light)
- **Source**: [Google Fonts](https://fonts.google.com/specimen/Lato)
- **Files needed**:
  - `Lato-Light.ttf` or `.woff2`

### 3. Cairo Sans (Arabic)
- **Weight**: 200-400
- **Source**: [Google Fonts](https://fonts.google.com/specimen/Cairo)
- **Files needed**:
  - `Cairo-Light.ttf` or `.woff2`

### 4. JetBrains Mono (Monospace)
- **Weight**: 400 (Regular)
- **Source**: [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)
- **Files needed**:
  - `JetBrainsMono-Regular.ttf` or `.woff2`

## Installation Steps

1. Download fonts from Google Fonts
2. Convert to `.woff2` format (best compression)
3. Place in `public/fonts/` directory
4. Update `src/app/layout.tsx` with font definitions
5. Update `tailwind.config.js` to use CSS variables

## Font Loading Strategy

Using `next/font/local` for self-hosted fonts:

```typescript
import localFont from 'next/font/local'

const montserrat = localFont({
  src: '../public/fonts/Montserrat-Thin.woff2',
  variable: '--font-montserrat',
  weight: '100',
})
```

## Performance Notes

- `.woff2` format provides best compression (30-50% smaller than `.ttf`)
- Fonts are preloaded automatically by Next.js
- CSS variables allow easy theme switching
- Self-hosting avoids external requests and GDPR concerns
