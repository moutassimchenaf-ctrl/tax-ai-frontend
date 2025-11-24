# Frontend Portals Overview

**Generated Date:** 2025-11-20
**Scope:** `core/frontend`

## Status
**Current State:** Only Landing Page (`/`) exists.
**Target State:** Three distinct zones: Public, Tenant Portal, Admin Console.

## 1. Public Zone
- **Route:** `/`
- **Components:** `src/components/landing/*`
- **Purpose:** Marketing, Pricing, Login/Signup.

## 2. Tenant Portal (User Dashboard)
**Base Route:** `/dashboard`
**Layout:** Sidebar navigation, Header with User Profile.

### Proposed Routes
| Route | Purpose | Components Needed |
| :--- | :--- | :--- |
| `/dashboard` | Overview of activity, recent reports, usage stats. | `DashboardOverview`, `UsageChart` |
| `/dashboard/tools` | Access to AI tools (Chat, Calculators). | `ToolGrid`, `ChatInterface` |
| `/dashboard/reports` | View and generate tax reports. | `ReportList`, `ReportViewer` |
| `/dashboard/billing` | Manage subscription and payment methods. | `BillingSettings`, `InvoiceList` |
| `/dashboard/settings` | User profile and preferences. | `UserProfile`, `SecuritySettings` |

## 3. Admin Console (System Management)
**Base Route:** `/admin`
**Guard:** Requires `role: 'admin'`.

### Proposed Routes
| Route | Purpose | Components Needed |
| :--- | :--- | :--- |
| `/admin` | System health, active users, critical alerts. | `SystemHealth`, `UserMetrics` |
| `/admin/users` | User management (ban, promote, view details). | `UserTable`, `UserDetail` |
| `/admin/tenants` | Organization management. | `TenantTable` |
| `/admin/mcp` | Monitor MCP servers and tool execution. | `MCPServerStatus`, `ToolLogs` |

## 4. Implementation Strategy
1.  **Layouts:** Create `src/app/dashboard/layout.tsx` and `src/app/admin/layout.tsx`.
2.  **Guards:** Implement `src/middleware.ts` to protect `/dashboard` (auth) and `/admin` (role).
3.  **Components:** Build shared UI for tables, cards, and charts in `src/components/ui`.
