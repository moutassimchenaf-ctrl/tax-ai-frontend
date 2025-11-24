# Titan Frontend Architecture

**Generated Date:** 2025-11-20
**Scope:** `core/frontend`

## High-Level Overview
The Titan frontend is a **Next.js 14** application using the **App Router** architecture. It is designed for high performance, real-time interaction, and a premium "Diamond-League" aesthetic.

## Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x + Headless UI
- **State Management:**
    - **Server State:** @tanstack/react-query v5 (Upgraded from v3)
    - **Client State:** Zustand
- **Real-time:** Socket.io Client
- **Animations:** GSAP, Framer Motion
- **3D Graphics:** Three.js, React Three Fiber

## Directory Structure (`src/`)
- **`app/`**: App Router pages and layouts.
- **`components/`**: Reusable UI components.
    - `ui/`: Atomic design elements (buttons, inputs).
    - `layout/`: Structural components (navbars, sidebars).
    - `landing/`: Marketing/Landing page specific components.
    - `animations/`: Animation wrappers and complex motion components.
    - `providers.tsx`: Centralized context providers (Query, Auth, Socket, Theme).
- **`lib/`**: Core utilities and configurations.
    - `auth.tsx`: Authentication logic (Supabase/NextAuth).
    - `socket.tsx`: WebSocket connection management.
    - `animations.ts`: GSAP/Framer animation definitions.
- **`hooks/`**: Custom React hooks.
- **`types/`**: TypeScript type definitions.

## Design System
Defined in `tailwind.config.js`.

### Colors
- **Primary:** Teal/Cyan variations (`#06708A` to `#044A5F`)
- **Secondary:** Grayscale (`#F9FAFB` to `#111827`)
- **Accent:** Standard semantic colors (Success, Warning, Error, Info)

### Typography
- **Sans:** Inter
- **Mono:** JetBrains Mono

### Animations
Custom Tailwind animations for `fade-in`, `slide-in`, `scale-in`, `bounce-in`.

## Key Architectural Patterns
1.  **Centralized Providers:** All global contexts are wrapped in `src/components/providers.tsx` to keep the root layout clean.
2.  **Real-time First:** Socket connection is established at the provider level (`SocketProvider`), making real-time events accessible throughout the app.
3.  **Hybrid State:** Clear separation between server state (React Query) and UI state (Zustand).
4.  **Modular UI:** Components are split by domain (`landing` vs `ui` vs `layout`) rather than just technical type.

## Performance & Optimization
- **React Query v5:** Optimized garbage collection (`gcTime`) and stale-while-revalidate strategies.
- **Dynamic Imports:** Used for heavy 3D/Animation components (implied by Next.js defaults).
- **Font Optimization:** `next/font` (Inter).

## Recommendations
- **Strict Mode:** Ensure `reactStrictMode` is enabled in `next.config.js`.
- **Bundle Analysis:** Run `@next/bundle-analyzer` periodically to monitor 3D library sizes.
- **Storybook:** Expand `ui/` component coverage in Storybook.
