# AI Assistant Prompts for Next.js Admin Template Registry

Use these prompts when working with AI coding assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf) to scaffold an enterprise admin portal in any new or existing Next.js project.

---

## 🚀 Prompt 1: Full Admin Setup (Recommended)

Copy and paste this prompt directly into your AI assistant in your target Next.js project:

```text
Please set up an admin portal in this Next.js project using the registry from https://github.com/krishnaditya16/nextjs-admin-template-registry.

ROUTING ARCHITECTURE:
- Auth Routes: Dedicated login and registration screens at `/login` and `/register` (standalone full-page layouts using `LoginForm` and `RegisterForm` from `@/components/admin/auth-guard/`).
- Admin Routes Prefix: All admin pages MUST be prefixed with `/admin` (e.g. layout at `app/admin/layout.tsx`, dashboard at `app/admin/page.tsx`, catalog at `app/admin/products/page.tsx`, settings at `app/admin/settings/page.tsx`).
- Navigation Links: In `AppSidebar`, configure menu item URLs with the `/admin` prefix (e.g. `{ title: "Dashboard", url: "/admin" }`, `{ title: "Products", url: "/admin/products" }`, `{ title: "Settings", url: "/admin/settings" }`).

SAFEGUARDS (FOR EXISTING PROJECTS):
- DO NOT overwrite, change, or redesign any existing pages, storefronts, or public routes outside `/admin`, `/login`, and `/register`.
- DO NOT alter existing global CSS, brand styling, or Tailwind theme colors.
- Keep the admin portal completely isolated within the `/admin` prefix.
- If modifying root `layout.tsx`, ONLY add `font-sans` to `<body>` and wrap with `ThemeProvider` / `Toaster` if not already present; preserve all existing providers, fonts, and metadata.

Follow these steps in order:

1. PREREQUISITES CHECK:
   - Ensure Next.js App Router and Tailwind CSS are configured.
   - If `components.json` is missing, initialize shadcn by running:
     npx shadcn@latest init -y

2. INSTALL ALL REGISTRY BLOCKS:
   Run this single command to install all 4 core blocks:
   npx shadcn add \
     https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json \
     https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json \
     https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json \
     https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json

3. CONFIGURE ROOT LAYOUT & FONTS:
   - In root `layout.tsx`, ensure `font-sans` is added to `<body>` (e.g. `<body className={`${geistSans.variable} font-sans antialiased`}>`).
   - In `globals.css`, ensure `--font-sans` maps to Next.js's Geist variable with a fallback (`--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;`) and `--font-heading: var(--font-sans);` so cards and headings don't fall back to Times New Roman serif.
   - Wrap children with `ThemeProvider` from `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`). Preserve all existing providers.
   - Ensure `<Toaster />` from `sonner` is present.

4. CREATE AUTH ROUTES (/login and /register):
   - Create `app/login/page.tsx` rendering `LoginForm` centered on the screen.
   - Create `app/register/page.tsx` rendering `RegisterForm` centered on the screen.

5. CREATE ADMIN LAYOUT (/admin prefix):
   - Create `app/admin/layout.tsx`.
   - Use `SidebarProvider`, `AppSidebar` (from `@/components/admin/admin-shell/app-sidebar`), and `AdminHeader` (from `@/components/admin/admin-shell/admin-header`) with `SidebarInset`.
   - Configure `defaultNavGroups` in `AppSidebar` with `/admin` prefixed URLs (e.g. `{ title: "Dashboard", url: "/admin" }`, `{ title: "Products", url: "/admin/products" }`, `{ title: "Settings", url: "/admin/settings" }`).
   - Wire `UserNav` in `AdminHeader` to navigate to `/admin/settings` on profile/settings click, and `/login` on logout.

6. CREATE ADMIN PAGES:
   - `app/admin/page.tsx` — Executive Dashboard at `/admin` using `PageHeader`, `StatCard` (from `@/components/admin/admin-shell/stat-card`), and a summary data table.
   - `app/admin/products/page.tsx` — Product catalog using `DataTable`.
     - In `PageHeader`, the "+ Add Product" button MUST be a `<Link href="/admin/products/new">` (NOT a modal dialog) styled with `buttonVariants({ size: "sm" })`.
     - Wire up row actions to `ConfirmDeleteDialog` for delete confirmations.
     - Wrap the page export in `<React.Suspense fallback={<div className="min-h-screen bg-background" />}>`.
   - `app/admin/products/new/page.tsx` — Dedicated 2-column product creation page with `LocalImageUpload` and `ConfirmDiscardDialog`.
   - `app/admin/settings/page.tsx` — Settings hub with Profile, Security, and Notifications tabs (using shadcn `Checkbox`).

7. PREVENT NEXT.JS 16 PRERENDER ERRORS:
   - In mock product data, use static strings and numbers (e.g. `id: "PRD-101"`, `createdAt: "2025-01-15T00:00:00Z"`).
   - NEVER call `Date.now()`, `new Date()`, or `Math.random()` inline inside mock data or table column render loops, as Next.js 16 flags this as "unstable value Date.now() in a Client Component" during prerendering.
   - Always wrap client table pages in `<React.Suspense>`.

Verify the setup by running `npm run build` to ensure zero TypeScript or lint errors.
```

---

## 📊 Prompt 2: Data Table Engine Only

Use this prompt if you only need the generic TanStack Table engine with sorting, filtering, and pagination in an existing admin project:

```text
Please add the TanStack Data Table engine from https://github.com/krishnaditya16/nextjs-admin-template-registry to this project:

NOTE: Do not alter any existing layouts, global CSS, or existing page designs.

1. Install the data-table block:
   npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json

2. Verify that `@tanstack/react-table` is installed and components are placed in `@/components/admin/data-table/`.
3. Create or update an admin table page under `/admin/` showing multi-column sorting, text search filtering, column visibility toggling, and pagination.
```

---

## 🛡️ Prompt 3: CRUD Primitives & Confirmation Dialogs Only

Use this prompt if you only need delete/discard confirmation dialogs, form sheets, and image dropzone uploads:

```text
Please add the CRUD primitives from https://github.com/krishnaditya16/nextjs-admin-template-registry to this project:

NOTE: Do not alter any existing layouts, global CSS, or existing page designs.

1. Install the crud-primitives block:
   npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json

2. Wire up `ConfirmDeleteDialog` and `ConfirmDiscardDialog` to our existing entity management pages to guard destructive actions.
3. Use `LocalImageUpload` for file dropzones with live previews.
```

---

## 🛠️ Verification Checklist for AI

When finishing any of the above setups, make sure:
- [ ] Auth pages are accessible at `/login` and `/register`.
- [ ] Admin portal is accessible under the `/admin` prefix (e.g. `/admin`, `/admin/products`, `/admin/settings`).
- [ ] "+ Add Product" button on `/admin/products` navigates to `/admin/products/new` page (NOT a modal dialog).
- [ ] No inline `Date.now()`, `new Date()`, or `Math.random()` in mock data; dynamic pages wrapped in `<React.Suspense>`.
- [ ] Existing non-admin routes, layouts, and public pages remain completely untouched.
- [ ] `components/admin/` folder contains the installed registry components.
- [ ] `font-sans` is active and headings/cards do NOT render in Times New Roman serif.
- [ ] `npm run build` succeeds without type errors or broken imports.
