# AI Assistant Prompt for Next.js Admin Template Registry

Copy and paste this prompt directly into your AI coding assistant (Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf) in your target Next.js project.

It installs the complete enterprise admin portal deterministically via the custom registry block, ensuring **100% identical output across all students with zero AI prompt drift**:

```text
Please set up an enterprise admin portal in this Next.js project using the official all-in-one registry block from https://github.com/krishnaditya16/nextjs-admin-template-registry.

EXECUTION INSTRUCTIONS (STRICTLY PRESERVE DETERMINISM):
DO NOT manually author, generate, or rewrite component files, table columns, forms, or page logic from scratch. All components, pages, mock data, and routing are pre-built, tested, and distributed via the custom registry block to guarantee byte-for-byte identical output across all students.

Follow these 4 steps in order:

1. PREREQUISITES CHECK:
   - Ensure Next.js App Router and Tailwind CSS are configured.
   - If `components.json` is missing, initialize shadcn by running:
     npx shadcn@latest init -y

2. INSTALL COMPLETE ADMIN SUITE (SINGLE COMMAND):
   Run this single command to install all 41 components, utilities, mock data, and pages:
   npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-full.json

   This block automatically installs:
   - All npm dependencies (@tanstack/react-table, lucide-react, next-themes, sonner)
   - All shadcn base primitives (sidebar, breadcrumb, card, button, table, input, select, tabs, checkbox, etc.)
   - Shell, Table, Auth, and CRUD components into `components/admin/`
   - Reusable 2-column ProductForm into `components/admin/products/`
   - Client theme provider into `components/theme-provider.tsx`
   - Brand logo asset into `public/logo.svg`
   - Mock data into `data/products-data.ts` and `data/orders-data.ts`
   - Dedicated App Router pages for `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`, `/admin/settings`, `/login`, `/register`, and `/placeholder`

3. CONFIGURE ROOT LAYOUT & FONTS:
   - In root `app/layout.tsx`:
     - Ensure `font-sans` is added to `<body>` (e.g. `<body className={`${geistSans.variable} font-sans antialiased`}>`).
     - Wrap children with `ThemeProvider` from `@/components/theme-provider` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`). Preserve all existing providers.
     - Ensure `<Toaster />` from `sonner` is present.
   - In `app/globals.css`, ensure `--font-sans` maps to Next.js's Geist variable with fallbacks:
     --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
     --font-heading: var(--font-sans);
     so cards, tables, and headings don't fall back to Times New Roman serif.

4. SAFEGUARDS & VERIFICATION:
   - DO NOT overwrite, change, or delete any existing pages, storefronts, or public routes outside `/admin`, `/login`, and `/register` (specifically, keep existing root `app/page.tsx` intact).
   - DO NOT create duplicate top-level folders like `/products` outside `/admin`.
   - NEVER use `import * as React from "react"`. Always import specific symbols directly (e.g. `import { useState, useMemo, Suspense } from "react"`).
   - Run `npm run build` to confirm zero TypeScript and ESLint errors.
   - Verify that `/admin`, `/admin/products`, `/login`, and existing root `/` all function seamlessly.
```

---

## 🛠️ Verification Checklist for Students & Instructors

When finished, verify the following:
- [ ] Admin portal is accessible under the `/admin` prefix (`/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`, `/admin/settings`).
- [ ] Auth pages are accessible at `/login` and `/register`.
- [ ] No duplicate top-level `/products` folder outside `/admin`.
- [ ] "+ Add Product" button on `/admin/products` navigates to `/admin/products/new` (dedicated page, NOT a modal).
- [ ] Product creation and edit share the unified reusable `<ProductForm />` component.
- [ ] Existing non-admin routes and public storefronts (`app/page.tsx`) remain completely untouched.
- [ ] Clean direct React imports used everywhere (no `import * as React from "react"`).
- [ ] `npm run build` succeeds without type errors or broken imports.
