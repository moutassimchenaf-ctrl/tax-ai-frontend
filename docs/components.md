# Component Documentation

## Overview
This document catalogs all custom components in the Tax.ai frontend application, organized by category.

## Component Categories

### 3D Components (`src/components/3d/`)
Components using React Three Fiber for 3D rendering and animations.

#### HeroCanvas
**Status**: 🚧 In Progress  
**Path**: `src/components/3d/HeroCanvas.tsx`  
**Purpose**: Main 3D scene for landing page with scroll-driven animations  
**Dependencies**: R3F, drei, GSAP ScrollTrigger  
**Props**:
- TBD

**Usage**:
```tsx
import { HeroCanvas } from '@/components/3d/HeroCanvas'

<HeroCanvas />
```

---

### Animation Components (`src/components/animations/`)
Components for vector and motion animations.

#### RiveAnimation
**Status**: 📋 Planned  
**Path**: `src/components/animations/RiveAnimation.tsx`  
**Purpose**: Stateful vector animations for complex interactive diagrams  
**Dependencies**: @rive-app/react-canvas  

#### LottieAnimation
**Status**: 📋 Planned  
**Path**: `src/components/animations/LottieAnimation.tsx`  
**Purpose**: Lightweight vector animations (loading icons, etc.)  
**Dependencies**: lottie-react  

---

### UI Primitives (`src/components/ui/`)
Reusable UI components built on Radix UI with Tailwind styling.

#### Button
**Status**: ✅ Complete  
**Path**: `src/components/ui/button.tsx`  
**Purpose**: Accessible button component with variants  
**Dependencies**: Radix UI Slot, cva  
**Variants**: default, destructive, outline, secondary, ghost, link  

**Usage**:
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg">Click Me</Button>
```

---

### Layout Components (`src/components/layout/`)
Page structure and navigation components.

---

### Feature Components (`src/components/features/`)
Domain-specific feature components.

---

## Component Development Guidelines

### 1. File Naming
- Use PascalCase: `HeroCanvas.tsx`
- One component per file
- Co-locate tests: `HeroCanvas.test.tsx`
- Co-locate stories: `HeroCanvas.stories.tsx`

### 2. Component Structure
```tsx
'use client' // Only if client-side interactivity needed

import { type ComponentProps } from 'react'

interface MyComponentProps {
  // Props with JSDoc
}

/**
 * Brief description of component purpose
 * @example
 * <MyComponent prop="value" />
 */
export function MyComponent({ prop }: MyComponentProps) {
  return <div>{prop}</div>
}
```

### 3. Styling
- Use Tailwind utility classes
- Use `cn()` from `@/lib/utils` for conditional classes
- Use `cva` for component variants
- Extract design tokens from `tailwind.config.js`

### 4. Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML
- Include ARIA labels where needed
- Test with screen readers
- Run axe-core tests

### 5. Performance
- Use `React.memo` for expensive components
- Use `useMemo` / `useCallback` judiciously
- Lazy load heavy components with `next/dynamic`
- Optimize images with `next/image`

### 6. Testing
- Write unit tests for all components
- Write integration tests for complex interactions
- Write E2E tests for critical user flows
- Target: 90%+ coverage

### 7. Documentation
- Add JSDoc comments to all components
- Include usage examples
- Document all props with descriptions
- Update this file when adding new components

---

## Status Legend
- ✅ Complete - Fully implemented and tested
- 🚧 In Progress - Currently being developed
- 📋 Planned - Scheduled for development
- ⚠️ Needs Review - Implemented but needs review
- 🔴 Blocked - Blocked by dependencies or issues

---

## Adding New Components

When adding a new component:

1. Create the component file in the appropriate directory
2. Write the component with TypeScript + JSDoc
3. Create a Storybook story (`.stories.tsx`)
4. Write tests (`.test.tsx`)
5. Add entry to this documentation
6. Update `src/components/index.ts` if creating a new export

---

## Component Inventory

### Total Components: TBD
- 3D Components: TBD
- Animation Components: TBD
- UI Primitives: TBD
- Layout Components: TBD
- Feature Components: TBD

---

*Last Updated: 2025-11-23*
