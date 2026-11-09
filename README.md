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

### 🚀 Recommended: Install Complete Deterministic Admin Suite (`admin-full`)

To guarantee **byte-for-byte identical output across all bootcamp students and prevent AI prompt drift**, run this single command to install all 41 components, utilities, and page routes at once:

```bash
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-full.json
```

**What this installs automatically:**
- All npm dependencies (`@tanstack/react-table`, `lucide-react`, `next-themes`, `sonner`)
- All shadcn base primitives (`sidebar`, `breadcrumb`, `card`, `button`, `table`, `input`, `select`, `tabs`, `checkbox`, `dialog`, `avatar`, `alert-dialog`)
- All core components in `components/admin/` (`admin-shell`, `data-table`, `auth-guard`, `crud-primitives`)
- Reusable 2-column form in `components/admin/products/product-form.tsx`
- Complete mock catalog data in `data/products-data.ts` and `data/orders-data.ts`
- Dedicated App Router pages in `app/admin/`, `app/login/`, and `app/register/`
- **Safeguard**: Does **NOT** overwrite or touch existing homepages or storefronts at `app/page.tsx`!

---

### 📦 Or Install the Products CRUD Module Only (`products-crud`)

If your project already has an admin shell and you just want the complete, page-based product catalog CRUD:

```bash
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/products-crud.json
```

---

### 🧩 Or Install Core Modular Blocks (Custom Layouts)

Run this command if you only want the reusable UI components without the pre-built page routes:

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

> "Please set up an enterprise admin portal in this Next.js project using the official all-in-one registry block from `https://github.com/krishnaditya16/nextjs-admin-template-registry`.
> 
> DO NOT manually author or rewrite component files or pages from scratch. Everything is installed deterministically via the custom registry block:
> 
> 1. Run `npx shadcn@latest init -y` if not already initialized.
> 2. Run the deterministic all-in-one command:
>    `npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-full.json`
> 3. In root `app/layout.tsx`:
>    - Ensure `font-sans` is on `<body>` (e.g. `<body className={`${geistSans.variable} font-sans antialiased`}>`).
>    - Wrap children with `ThemeProvider` from `@/components/theme-provider` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`).
>    - Ensure `<Toaster />` from `sonner` is present.
> 4. In `app/globals.css`, map `--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;` and `--font-heading: var(--font-sans);`.
> 5. Safeguards: DO NOT overwrite or change any existing pages outside `/admin`, `/login`, and `/register` (keep root `app/page.tsx` intact). Do NOT create duplicate `/products` folders. Never use `import * as React from 'react'`."

💡 *For the complete, copy-paste AI assistant prompt, see [`PROMPT.md`](./PROMPT.md).*
💡 *To scaffold new CRUD modules interactively, use the dedicated workspace skill: `.agents/skills/admin-scaffold-crud/`.*

---

### Or Install Individual Blocks Separately

If you only need specific parts of the design system:

```bash
# 1. Complete Suite (All pages + components)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-full.json

# 2. Products CRUD (Catalog table, 2-column form, new & edit pages)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/products-crud.json

# 3. Admin Shell (Sidebar, Header, Breadcrumbs, Stat Cards, Theme Toggle)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json

# 4. Data Table Engine (TanStack Table v8, Sorting, Toolbar, Pagination)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json

# 5. Auth Guard (Login & Register forms, User Avatar dropdown)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json

# 6. CRUD Primitives (Delete Dialog, Discard Dialog, Image Upload)
npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json
```

---

## 📚 Registry Blocks Manifest

| Block Name | Target In Your App | Description | Registry Manifest |
| :--- | :--- | :--- | :--- |
| **`admin-full`** | `components/admin/`, `data/`, `app/admin/`, `app/login/`, `app/register/` | **All-in-one deterministic suite**: Complete enterprise admin portal with dashboard, product CRUD catalog, settings center, credentials authentication, data table engine, and admin shell. | [`admin-full.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/admin-full.json) |
| **`products-crud`** | `components/admin/products/`, `data/`, `app/admin/products/` | Complete product catalog CRUD with data table, multi-column sorting, search filters, dedicated create/edit pages, and reusable 2-column form. | [`products-crud.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/products-crud.json) |
| **`admin-shell`** | `components/admin/admin-shell/` | Responsive collapsible sidebar, sticky header with breadcrumbs, KPI stat cards, and dark mode toggle. | [`admin-shell.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/admin-shell.json) |
| **`data-table`** | `components/admin/data-table/` | Generic TanStack Table v8 engine with sorting, text search filtering, column visibility toggles, and pagination. | [`data-table.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/data-table.json) |
| **`auth-guard`** | `components/admin/auth-guard/` | Minimal flat card login and registration forms (shadcn `login-01`), plus user avatar dropdown. | [`auth-guard.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/auth-guard.json) |
| **`crud-primitives`** | `components/admin/crud-primitives/` | Delete confirmation dialog, discard changes confirmation dialog, and drag-and-drop image upload. | [`crud-primitives.json`](https://github.com/krishnaditya16/nextjs-admin-template-registry/blob/main/public/r/crud-primitives.json) |

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
| **`/`** | Showcase Landing Page introducing the registry with direct links to the admin portal, catalog, and auth demo. |
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
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", href: "/admin/products", icon: Package },
      { title: "Categories", href: "#", icon: FolderTree, badge: "Soon" },
    ],
  },
  {
    label: "Sales",
    items: [
      { title: "Orders", href: "#", icon: ShoppingBag, badge: "Soon" },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Articles", href: "#", icon: FileText, badge: "Soon" },
      { title: "Reviews", href: "#", icon: Star, badge: "Soon" },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Users", href: "#", icon: Users, badge: "Soon" },
      { title: "Settings", href: "/admin/settings", icon: Settings },
      { title: "Placeholder Menu", href: "/placeholder", icon: Layers, badge: "Guide" },
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
│       ├── admin-full.json        # All-in-one deterministic suite (all pages + components)
│       ├── products-crud.json     # Complete product catalog CRUD module
│       ├── admin-shell.json
│       ├── data-table.json
│       ├── auth-guard.json
│       └── crud-primitives.json
├── src/
│   ├── app/                       # Next.js App Router application
│   │   ├── admin/                 # Canonical admin portal routes
│   │   │   ├── page.tsx & dashboard-client.tsx
│   │   │   ├── products/          # Products catalog table & CRUD pages
│   │   │   │   ├── page.tsx, products-client.tsx, columns.tsx
│   │   │   │   ├── new/ (page.tsx & new-product-client.tsx)
│   │   │   │   └── [id]/edit/ (page.tsx & edit-product-client.tsx)
│   │   │   └── settings/ (page.tsx & settings-client.tsx)
│   │   ├── login/ & register/     # Full-page auth screens (page.tsx & client pairs)
│   │   ├── placeholder/           # Scaffolding guide (page.tsx & client)
│   │   ├── globals.css            # Tailwind v4 theme definitions
│   │   ├── page.tsx               # Showcase landing page (admin portal isolated at /admin)
│   │   └── layout.tsx             # Root layout with ThemeProvider & Sonner
│   ├── components/
│   │   ├── admin/products/        # App-specific admin components (e.g. reusable ProductForm)
│   │   ├── theme-provider.tsx     # next-themes integration wrapper
│   │   └── ui/                    # Base shadcn primitives (button, dialog, etc.)
│   ├── data/                      # Mock fixtures, seed datasets, and domain types
│   │   ├── products-data.ts       # Mock products inventory
│   │   └── orders-data.ts         # Mock dashboard sales transactions
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
