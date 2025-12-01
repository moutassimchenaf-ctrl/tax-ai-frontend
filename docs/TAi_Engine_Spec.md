# PROJECT MANIFEST: TAi ENGINE (v1.0)

Reference Benchmark: Anime.js V4 Homepage
Core Mechanic: WebGL Particle Morphing synced 1:1 with Scrollbar
Visual Identity: Deep-Tech / Fintech / "Dark Mode"
Primary Color Palette: Teal Spectrum (#044859 → #0898bb)

## 1. GLOBAL DESIGN SYSTEM (CSS VARIABLES)

```css
:root {
  /* --- PALETTE: TEAL SPECTRUM --- */
  --c-bg-top: #044859;       /* Deepest Teal (Top of gradient) */
  --c-bg-bot: #164659;       /* Lighter Teal (Bottom of gradient) */
  --c-core: #06708a;         /* Base particle color */
  --c-accent: #0898bb;       /* Active/Highlight color (The "Glow") */
  --c-muted: #206682;        /* Structure/Grid lines */
  --c-white: #ffffff;        /* Primary Text */
  --c-dim: rgba(255, 255, 255, 0.7); /* Secondary Text */
  
  /* --- TYPOGRAPHY --- */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* Developer identity */
  
  /* --- SPACING & Z-INDEX --- */
  --z-canvas: -1;            /* WebGL sits behind everything */
  --z-ui: 10;                /* Text sits above WebGL */
  --z-nav: 100;              /* Header is always top */
  
  /* --- PHYSICS --- */
  --scroll-damping: 0.1;     /* Smooth scrub effect (Lerp) */
}
```

## 2. THE NAVIGATION (EXACT REPLICA)

Position: Fixed, Top, Full Width.
Behavior: Glassmorphism background (backdrop-filter: blur(10px)).

**Structure:**
*   **Left:** [Logo] TAi Engine (Glitch Reveal Component)
*   **Center (Links):** Pricing | Resources | Community | Download | [Star Icon] Star Us
*   **Right (Auth):** Sign in | [Button] Sign up

## 3. THE 3D ENGINE (WEBGL SPECIFICATION)

Library: Three.js + Anime.js (for timeline).
Object: Single THREE.Points mesh. No object creation/destruction, only vertex morphing.

**Particle System Config:**
*   Count: 1600 Particles (High Density for Logo, Low Density for background).
*   Material: THREE.ShaderMaterial (Custom shader required for glowing edges).
    *   Uniforms: uTime, uScroll, uColorA (#06708a), uColorB (#0898bb).
    *   Blending: THREE.AdditiveBlending (Creates light-simulation).
*   **Morph Targets (The Shapes):**
    1.  **Sphere:** IcosphereGeometry(radius: 10, detail: 3).
    2.  **Lens/Disc:** CylinderGeometry(radiusTop: 12, radiusBottom: 12, height: 0.5) (Flattened).
    3.  **Ring:** TorusGeometry(radius: 10, tube: 2).
    4.  **Columns:** 4 separate BoxGeometry stacks, merged into one buffer.
    5.  **Lattice:** BoxGeometry (Grid distribution).

**The "X-Logo" Logic:**
*   Technique: "Vertex Attribute Mapping."
*   Execution: Do not use a texture. When the shape is in Sphere Mode, force the vertices on the front face (Z > 0) to align into the X-shape coordinates.

## 4. SCROLL TIMELINE & CONTENT MAP

Logic: window.scrollY drives timeline.seek().
Total Scroll Height: 500vh (5 Sections).

### SECTION 1: HERO (0% - 15% Scroll)
*   **3D State:** Floating Sphere with X-Logo facing camera. Idle rotation.
*   **DOM Content:**
    *   H1: "All-in-one Tax Intelligence Engine."
    *   Sub: "A unified platform that maps your entities, ingests your ledgers, applies the law, and produces audit-ready answers."
    *   Command: `npm i @taxai/sdk`
    *   Social Proof: "Trusted by: Family Offices • Free Zone Groups • Multinational Structures"

### SECTION 2: THE TOOLBOX (15% - 35% Scroll)
*   **3D Transition:** Sphere vertices compress Z-axis. X-Logo particles detach and float forward (HUD effect).
*   **DOM Content:**
    *   H2: "The complete tax-function toolbox."
    *   Grid: 6 Cards (Entity Graph, Ledger Engine, Reg Sync, Scenario Builder, Disclosures, Risk Scanner).

### SECTION 3: ORCHESTRATOR (35% - 55% Scroll)
*   **3D Transition:** Flattened lens morphs into a Rotating Torus (Ring).
*   **DOM Content:**
    *   H2: "Runs like clockwork."
    *   Body: "Coordinate each step—entity mapping, ledger ingestion, rule evaluation—with the TAi Orchestrator."
    *   Code: `createOrchestrator().ingest().validate()`

### SECTION 4: DATA & COMPLIANCE (55% - 75% Scroll)
*   **3D Transition:** Ring breaks apart. Particles form 4 Vertical Columns feeding into a central point.
*   **DOM Content:**
    *   H2: "Adaptive Compliance."
    *   Body: "Make your outputs respond dynamically to jurisdictions, free-zone rules, and entity-level attributes."
    *   JSON: `{ "status": "QFZP", "reliefs": [...] }`

### SECTION 5: KNOWLEDGE GRAPH (75% - 95% Scroll)
*   **3D Transition:** Columns explode. Particles reform into a Dense 3D Lattice (Cube).
*   **DOM Content:**
    *   H2: "Modular Engine Architecture."
    *   Stats: Entity Graph (1.1MB), Rule Engine (3.2MB).

### SECTION 6: SYNTHESIS (95% - 100% Scroll)
*   **3D Transition:** Implosion. Lattice collapses. Sphere reforms with internal glow.
*   **DOM Content:**
    *   H2: "Start using TAi Engine."
    *   CTA: [Get Documentation]

## 5. THE BACKEND ARCHITECTURE (The 26 Services)

**Core Data & Computation Layer:**
1.  Entity Graph Engine
2.  Ledger Ingestion Engine
3.  Document Extraction Engine
4.  Regulation Sync
5.  Real-Time Rule Engine
6.  Scenario Builder
7.  Pillar Two Engine
8.  Free Zone Engine
9.  Intercompany/TP Engine
10. Risk Scanner

**Output & Integration Layer:**
11. Disclosure Compiler
12. Audit Trail Engine
13. Connector Layer
14. TAi Orchestrator
15. API Gateway
16. Identity Engine
17. Render Engine
18. Period Management
19. Notification System
20. Security Layer

**New Additions:**
21. Subscription & Billing (Stripe + Sheets)
22. UAE E-Invoicing Engine
23. Chat Orchestrator
24. Agent Factory
25. "Other Tools" Hub
26. Access Control Reminder (Strict Auth Gating)

## 6. GLITCH REVEAL COMPONENT

```html
<!-- ============================
     TAX.AI — CLEAN GLITCH REVEAL
     ============================ -->

<style>
/* -------------------------------
   BRAND VARIABLES
-------------------------------- */
:root {
  --brand-font-family: 'Inter', 'Inter Thin', Arial, sans-serif;
  --brand-text-accent: #0898BB; /* Tax.ai Blue/Teal */
  --brand-text-base: #FFFFFF;
  --glitch-speed: 650ms;
}

/* -------------------------------
   CONTAINER
-------------------------------- */
.NavBrand {
  font-family: var(--brand-font-family);
  text-transform: uppercase;
  font-size: 1.6rem;
  position: relative;
  display: inline-block;
  color: var(--brand-text-base);
  cursor: pointer;
}

/* -------------------------------
   GLITCH REVEAL EFFECT
-------------------------------- */
.NavBrand::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;                        /* starts hidden */
  overflow: hidden;
  white-space: nowrap;

  color: var(--brand-text-accent); /* Tax.ai Blue */
  mix-blend-mode: difference;

  border-right: 2px solid var(--brand-text-accent);
  animation: none;
  transition: width var(--glitch-speed) ease;
}

.NavBrand:hover::before {
  width: 100%;                     /* reveal animation */
}

/* -------------------------------
   OPTIONAL: CUSTOM CURSOR
-------------------------------- */
body,
.NavBrand,
a, button {
  cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAxNjYgMTIuMDIwNUwxNS42NTgyIDE1LjA2MDVMMTUuMjE5NyAxNS4yMTk3TDE1LjA2MDUgMTUuNjU4MkwxMi4wMjA1IDI0LjAxNjZMNS42MjIwNyA1LjYyMjA3TDI0LjAxNjYgMTIuMDIwNVoiIGZpbGw9IiNEOUQ5RDkiIGZpbGwtb3BhY2l0eT0iMC42MTU2ODYiIHN0cm9rZT0iIzAwMDBGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo="), auto;
}
</style>


<!-- ============================
     HTML — BRAND NAME
============================ -->
<div class="NavBrand" data-text="TAX.AI">
  TAX.AI
</div>
```
