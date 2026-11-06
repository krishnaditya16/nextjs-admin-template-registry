# Next.js Admin Template & Design System Registry

An enterprise-grade, accessible admin template and custom [shadcn/ui](https://ui.shadcn.com) registry built with **Next.js 16 (App Router & Turbopack)**, **Tailwind CSS v4**, **React 19**, and **Base UI primitives**.

Designed as a reference architecture and reusable design system for fullstack applications and bootcamp students.

🔗 **GitHub Repository**: [krishnaditya16/nextjs-admin-template-registry](https://github.com/krishnaditya16/nextjs-admin-template-registry)

---

## Features

- **Custom shadcn/ui Registry**: Distribute reusable blocks directly via `npx shadcn add <url>`.
- **Admin Shell**: Responsive sidebar with collapsible states, typed menu grouping (`defaultNavGroups`), image-first app logo, auto-generated breadcrumbs, and sticky header with dark mode toggle.
- **TanStack Table Engine**: Type-safe data table with multi-column sorting, text search filtering, column visibility toggles, and responsive pagination.
- **CRUD Primitives**: Safe delete & discard confirmation dialogs and drag-and-drop local file upload dropzones with real-time previews.
- **Authentication Pages**: Clean, minimal card-based login and register pages inspired by official shadcn `login-01` patterns.
- **Settings Hub**: Tabbed settings center for Profile info, Security (password change), and Notification preferences using official shadcn checkboxes.
- **Dark Mode Support**: Seamless light/dark/system theme switching powered by `next-themes` and Tailwind CSS v4 OKLCH color variables.
- **Zero Diagnostics Errors**: Strict TypeScript compliance with zero build or lint warnings.

---

## Quick Start (Running This Template)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/krishnaditya16/nextjs-admin-template-registry.git
cd nextjs-admin-template-registry
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the running admin portal.

---

## 📦 Adding to an Existing or New Project

You can add these components to **any Next.js project** directly from this public GitHub repository without cloning or configuring custom registry domains.

### Prerequisites in Your Project
1. **Next.js 14, 15, or 16** (App Router)
2. **Tailwind CSS** (v3 or v4)
3. **shadcn/ui initialized**:
   ```bash
   npx shadcn@latest init
   ```

---

### 🚀 Install All Blocks at Once (Single Command)

Run this single command in your project terminal to install the entire admin suite (`admin-shell`, `data-table`, `auth-guard`, and `crud-primitives`) with all npm dependencies and shadcn base components:

```bash
npx shadcn add \
  https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json \
  https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json \
  https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json \
  https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json
```

*(On Windows PowerShell, use backticks `` ` `` or run on a single line without linebreaks)*

---

### 🤖 AI Assistant Prompt (Copy & Paste to your AI)

If you are using Cursor, Claude, GitHub Copilot, or Antigravity on a new or existing project, simply paste this prompt:

> "Please set up an admin portal in this Next.js project using the registry from `https://github.com/krishnaditya16/nextjs-admin-template-registry`.
> 
> **Routing Structure & Architecture**:
> - Auth Routes: Place dedicated auth screens at `/login` and `/register` (using `LoginForm` and `RegisterForm`).
> - Admin Routes: Prefix all admin pages with `/admin` (layout at `app/admin/layout.tsx`, dashboard at `app/admin/page.tsx`, catalog at `app/admin/products/page.tsx`, new product at `app/admin/products/new/page.tsx`, edit product at `app/admin/products/[id]/edit/page.tsx`, settings at `app/admin/settings/page.tsx`).
> - Sidebar Links: Configure menu items in `AppSidebar` with the `/admin` prefix.
> - Safeguard: If this is an existing project, do NOT modify, overwrite, or redesign any existing pages, public routes, or global design styles outside `/admin`, `/login`, and `/register`. Do NOT create duplicate top-level `/products` folders.
> 
> **Page-Based CRUD & Reusable Form Pattern**:
> - NO MODAL FORMS: Product creation and editing must be full, dedicated pages (NOT modal dialogs).
> - Unified Form: Build a single reusable `<ProductForm />` (in `components/admin/products/product-form.tsx`) that accepts `{ mode: "create" | "edit", initialData?: Product }` used by both `new/page.tsx` and `[id]/edit/page.tsx`.
> 
> 1. Run `npx shadcn@latest init -y` if not already initialized.
> 2. Run the all-in-one command:
>    `npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json`
> 3. In root `layout.tsx`, ensure `font-sans` is on `<body>` (e.g. `<body className={`${geistSans.variable} font-sans antialiased`}>`) and wrap with `ThemeProvider` (`next-themes`, `attribute="class"`). In `globals.css`, map `--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;` and `--font-heading: var(--font-sans);`.
> 4. Create standalone auth pages `app/login/page.tsx` and `app/register/page.tsx`.
> 5. Create admin layout `app/admin/layout.tsx` using `SidebarProvider`, `AppSidebar`, and `AdminHeader`.
> 6. On `app/admin/products/page.tsx`, ensure '+ Add Product' is a link button to `/admin/products/new` (not a modal). Use static strings for mock data (never inline `Date.now()`) and wrap dynamic pages in `<React.Suspense>`."

💡 *For specialized prompts (Full Admin, Data Table only, or CRUD Primitives only), see [`PROMPT.md`](./PROMPT.md).*
💡 *To scaffold new CRUD modules interactively, use the dedicated workspace skill: `.agents/skills/admin-scaffold-crud/`.*

---

### Or Install Individual Blocks Separately

If you only need specific parts of the design system:

```bash
# 1. Admin Shell (Sidebar, Header, Breadcrumbs, Stat Cards, Theme Toggle)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json

# 2. Data Table Engine (TanStack Table v8, Sorting, Toolbar, Pagination)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json

# 3. Auth Guard (Login & Register forms, User Avatar dropdown)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json

# 4. CRUD Primitives (Delete Dialog, Discard Dialog, Image Upload)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json
```

---

## 📚 Registry Blocks Manifest

| Block Name | Target In Your App | Description | GitHub Source | Registry Manifest |
| :--- | :--- | :--- | :--- | :--- |
| **`admin-shell`** | `components/admin/admin-shell/` | Responsive collapsible sidebar, sticky header with breadcrumbs, KPI stat cards, and dark mode toggle. | [Source Code](https://github.com/krishnaditya16/nextjs-admin-template-registry/tree/main/src/registry/admin/admin-shell) | [`admin-shell.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/admin-shell.json) |
| **`data-table`** | `components/admin/data-table/` | Generic TanStack Table v8 engine with sorting, text search filtering, column visibility toggles, and pagination. | [Source Code](https://github.com/krishnaditya16/nextjs-admin-template-registry/tree/main/src/registry/admin/data-table) | [`data-table.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/data-table.json) |
| **`auth-guard`** | `components/admin/auth-guard/` | Minimal flat card login and registration forms (shadcn `login-01`), plus user avatar dropdown. | [Source Code](https://github.com/krishnaditya16/nextjs-admin-template-registry/tree/main/src/registry/admin/auth-guard) | [`auth-guard.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/auth-guard.json) |
| **`crud-primitives`** | `components/admin/crud-primitives/` | Delete confirmation dialog, discard changes confirmation dialog, and drag-and-drop image upload. | [Source Code](https://github.com/krishnaditya16/nextjs-admin-template-registry/tree/main/src/registry/admin/crud-primitives) | [`crud-primitives.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/crud-primitives.json) |

### How It Works Under the Hood
When you run `npx shadcn add`:
1. The CLI fetches the corresponding `.json` manifest from the registry.
2. It automatically installs any **npm packages** defined in `dependencies` (e.g. `@tanstack/react-table`, `lucide-react`, `next-themes`).
3. It automatically pulls any **base shadcn components** listed in `registryDependencies` (e.g. `button`, `card`, `dialog`, `sidebar`, `table`).
4. It copies the source components directly into your project's `components/admin/...` directory, so you own 100% of the code.

---

## Included Demo Pages

| Route | Description |
| :--- | :--- |
| **`/`** | Root redirect to `/admin`. |
| **`/admin`** | Executive Dashboard featuring KPI stat cards, latest sales table, and quick navigation. |
| **`/admin/products`** | Product Catalog Data Table with live filtering, status badges, pagination, and row actions. |
| **`/admin/products/new`** | Add Product form featuring a 2-column layout (matching shadcn `dashboard-07`), image dropzone, and discard confirmation via reusable `<ProductForm />`. |
| **`/admin/products/[id]/edit`** | Edit Product form with pre-populated records and discard guard via the same reusable `<ProductForm />`. |
| **`/admin/settings`** | Unified Settings Hub with Profile, Security (password reset), and Notifications tabs (shadcn Checkboxes). |
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
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", url: "/admin/products", icon: Package },
      { title: "Add Product", url: "/admin/products/new", icon: PlusCircle },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", url: "/admin/settings", icon: Settings },
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
│   ├── app/                       # Next.js App Router application
│   │   ├── admin/                 # Canonical admin portal routes
│   │   │   ├── layout.tsx         # SidebarProvider & AdminHeader shell
│   │   │   ├── page.tsx           # Executive Dashboard
│   │   │   ├── products/          # Products catalog table & CRUD pages
│   │   │   │   ├── page.tsx       # Products data table
│   │   │   │   ├── new/page.tsx   # Add product page (ProductForm mode="create")
│   │   │   │   └── [id]/edit/     # Edit product page (ProductForm mode="edit")
│   │   │   └── settings/page.tsx  # Admin settings hub
│   │   ├── login/ & register/     # Full-page auth screens
│   │   ├── globals.css            # Tailwind v4 theme definitions
│   │   ├── page.tsx               # Root redirect to /admin
│   │   └── layout.tsx             # Root layout with ThemeProvider & Sonner
│   ├── components/
│   │   ├── admin/products/        # App-specific admin components (e.g. reusable ProductForm)
│   │   ├── theme-provider.tsx     # next-themes integration wrapper
│   │   └── ui/                    # Base shadcn primitives (button, dialog, etc.)
│   ├── lib/
│   │   └── utils.ts               # cn helper utility
│   └── registry/                  # Source files for the distributed registry blocks
│       └── admin/
│           ├── admin-shell/       # Sidebar, header, breadcrumbs, stat cards
│           ├── data-table/        # TanStack Table engine components
│           ├── auth-guard/        # Login form, register form, user dropdown
│           └── crud-primitives/   # Delete & discard dialogs, file upload
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
