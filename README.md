# Next.js Admin Template & Design System Registry

An enterprise-grade, accessible admin template and custom [shadcn/ui](https://ui.shadcn.com) registry built with **Next.js 16 (App Router & Turbopack)**, **Tailwind CSS v4**, **React 19**, and **Base UI primitives**.

Designed as a reference architecture and reusable design system for fullstack applications and bootcamp students.

---

## Features

- **Custom shadcn/ui Registry**: Distribute reusable blocks directly via `npx shadcn add <url>`.
- **Admin Shell**: Responsive sidebar with collapsible states, typed menu grouping (`defaultNavGroups`), image-first app logo, auto-generated breadcrumbs, and sticky header.
- **TanStack Table Engine**: Type-safe data table with multi-column sorting, text search filtering, column visibility toggles, and responsive pagination.
- **CRUD Primitives**: Safe delete confirmation dialogs, modal sheets, and drag-and-drop local file upload dropzones with real-time previews.
- **Authentication Pages**: Clean, minimal card-based login and register pages inspired by official shadcn `login-01` patterns.
- **Settings Hub**: Tabbed settings center for Profile info, Security (password change), and Notification preferences using official shadcn checkboxes.
- **Dark Mode Support**: Seamless light/dark/system theme switching powered by `next-themes` and Tailwind CSS v4 OKLCH color variables.
- **Zero Diagnostics Errors**: Strict TypeScript compliance with zero build or lint warnings.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the running admin dashboard.

---

## Consuming the Registry Blocks

Any developer or student can install these blocks directly into their own Next.js projects using the `shadcn` CLI:

### 1. Admin Shell
Installs the full layout engine: collapsible sidebar, sticky header, breadcrumbs, stat cards, and theme toggle.
```bash
npx shadcn add http://localhost:3000/r/admin-shell.json
```

### 2. Data Table Engine
Installs the complete TanStack Table v8 suite: sorting headers, toolbar search, column toggles, and pagination controls.
```bash
npx shadcn add http://localhost:3000/r/data-table.json
```

### 3. Auth Guard UI
Installs minimal credentials login form, registration form, and user avatar navigation menu.
```bash
npx shadcn add http://localhost:3000/r/auth-guard.json
```

### 4. CRUD Primitives
Installs standardized delete & discard confirmation dialogs, form modal wrappers, and drag-and-drop image uploaders.
```bash
npx shadcn add http://localhost:3000/r/crud-primitives.json
```

> **Note**: In production, replace `http://localhost:3000` with your deployed domain (e.g. `https://my-registry.vercel.app/r/admin-shell.json`).

---

## Included Demo Pages

| Route | Description |
| :--- | :--- |
| **`/`** | Executive Dashboard featuring KPI stat cards, latest sales table, and quick navigation. |
| **`/products`** | Product Catalog Data Table with live filtering, status badges, pagination, and row actions. |
| **`/products/new`** | Add Product form featuring a 2-column layout (matching shadcn `dashboard-07`) and image dropzone. |
| **`/products/[id]/edit`** | Edit Product form with pre-populated records. |
| **`/settings`** | Unified Settings Hub with Profile, Security (password reset), and Notifications tabs. |
| **`/login`** | Minimal credentials login screen. |
| **`/register`** | Account creation screen with full validation states. |
| **`/placeholder`** | Reusable empty-state screen for modules currently under development. |

---

## Key Customization Guides

### 1. Changing the App Logo
The application uses an image-first, reusable `AppLogo` component:
- **Default Image**: Place your logo SVG or PNG at `/public/logo.svg`.
- **Component File**: Located at `src/registry/admin/admin-shell/app-logo.tsx`. You can adjust sizing or fallback text without needing to thread props through every page.

### 2. Customizing Sidebar Navigation
Sidebar menu items and groupings are declared in a typed configuration array:
- Open `src/registry/admin/admin-shell/app-sidebar.tsx`.
- Edit `defaultNavGroups` to add, remove, or reorganize menu items:
```tsx
export const defaultNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", url: "/products", icon: Package },
      { title: "Add Product", url: "/products/new", icon: PlusCircle },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Auth", url: "/login", icon: Lock },
      { title: "Placeholder Menu", url: "/placeholder", icon: Layers, badge: "Soon" },
    ],
  },
]
```

### 3. Dark Mode & Theming
- The theme toggle (`ThemeToggle`) is built directly into `AdminHeader`.
- Configured with `next-themes` and defined using Tailwind CSS v4 variables in `src/app/globals.css`.
- Fully supports `light`, `dark`, and `system` preferences.

---

## Project Structure

```text
├── public/
│   ├── logo.svg                   # Brand mark image
│   └── r/                         # Compiled registry JSON distribution files
│       ├── admin-shell.json
│       ├── data-table.json
│       ├── auth-guard.json
│       └── crud-primitives.json
├── src/
│   ├── app/                       # Next.js App Router demo application
│   │   ├── (admin)/               # Admin layout & sub-pages
│   │   ├── products/              # Catalog CRUD pages
│   │   ├── settings/              # Settings hub
│   │   ├── login/ & register/     # Auth pages
│   │   ├── globals.css            # Tailwind v4 theme definitions
│   │   └── layout.tsx             # Root layout with ThemeProvider & Sonner
│   ├── components/
│   │   ├── theme-provider.tsx     # next-themes integration wrapper
│   │   └── ui/                    # Base shadcn primitives (button, dialog, etc.)
│   ├── lib/
│   │   └── utils.ts               # cn helper utility
│   └── registry/                  # Source files for the distributed registry blocks
│       └── admin/
│           ├── admin-shell/       # Sidebar, header, breadcrumbs, stat cards
│           ├── data-table/        # TanStack Table engine components
│           ├── auth-guard/        # Login form, register form, user dropdown
│           └── crud-primitives/   # Delete & discard dialogs, form modal, file upload
├── registry.json                  # Manifest defining registry blocks and dependencies
└── components.json                # shadcn configuration (base-nova style)
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack. |
| `npm run build` | Builds the optimized production application. |
| `npm run lint` | Runs ESLint over the entire project. |
| `npx shadcn build` | Recompiles registry blocks from `src/registry/` into `public/r/*.json`. |
| `npx tsc --noEmit` | Validates strict TypeScript types across all files. |

---

## License

MIT
