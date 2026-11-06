---
name: admin-scaffold-crud
description: >-
  Scaffold a new enterprise admin CRUD module (catalog data table, dedicated create and edit pages, reusable 2-column form, and sidebar navigation item) adhering to the template's gold-standard architecture. Use this skill when the user asks to add a new admin module, feature, menu item, or CRUD resource (e.g. Customers, Orders, Categories, Invoices, Coupons, Users).
---

# Admin CRUD Scaffolding Skill

This skill guides the agent through scaffolding a complete, production-ready CRUD module inside this Next.js admin registry template, following the established `products` gold standard.

---

## 🎯 Architecture Golden Rules (Must Follow)

1. **Strict `/admin` Isolation**: All module routes MUST live inside `src/app/admin/<module>/`. Never create top-level route directories (e.g. `/orders`).
2. **Dedicated Full Pages (No Modals)**:
   - Index catalog: `src/app/admin/<module>/page.tsx`
   - Dedicated create page: `src/app/admin/<module>/new/page.tsx`
   - Dedicated edit page: `src/app/admin/<module>/[id]/edit/page.tsx`
   - **NEVER** use modal popups/dialogs for entity creation or editing.
3. **Single Reusable Form Component**:
   - Create `src/components/admin/<module>/<module>-form.tsx`.
   - Accepts `{ mode: "create" | "edit", initialData?: <Module>FormValues }`.
   - Uses the 2-column `dashboard-07` layout (left column: main details; right column: status, category, image/media).
   - Includes dirty-state tracking guarded by `ConfirmDiscardDialog`.
   - Responsive actions (sticky top header on desktop, bottom bar on mobile).
4. **Data Table Integration**:
   - Uses TanStack `DataTable` from `@/components/admin/data-table/data-table`.
   - Search filter bar, column visibility dropdown, pagination.
   - Row actions dropdown with Edit (`/admin/<module>/[id]/edit`) and Delete (guarded by `ConfirmDeleteDialog`).
   - Wrap the index page export in `<React.Suspense>`.
5. **Prerender Safety (Next.js 16)**:
   - In mock data, use static dates and strings (e.g. `createdAt: "2025-01-15T00:00:00Z"`).
   - **NEVER** evaluate `Date.now()`, `new Date()`, or `Math.random()` in initial renders or mock arrays.
6. **Sidebar Navigation**:
   - Register the new module into `defaultNavGroups` in `src/registry/admin/admin-shell/app-sidebar.tsx`.

---

## 📋 Phase 1: Interactive Elicitation ("Grill-Me" Interview)

Before generating any code, ask the user targeted questions to elicit the exact specifications. If the user already provided some details in their prompt, only ask for what is missing.

### Questions to clarify:
1. **Module Identity**:
   - Singular name (e.g. "Customer")
   - Plural name (e.g. "Customers")
   - Route path slug (e.g. "customers" -> `/admin/customers`)

2. **Sidebar Group & Icon**:
   - Which navigation group? (`Overview`, `Catalog`, `System`, or a new group?)
   - Preferred Lucide icon? (e.g. `Users`, `ShoppingCart`, `Tag`, `FileText`, `Percent`)

3. **Field Schema & Types**:
   - What fields belong to this entity? (e.g., Name, Email, Status, Total Spend, Notes, Image/Avatar)
   - Field data types & controls:
     - `text` / `email` / `phone` -> `<Input />`
     - `number` / `currency` -> `<Input type="number" />`
     - `select` / `enum` -> `<Select>` (what are the options?)
     - `textarea` -> `<Textarea />`
     - `image` -> `<LocalImageUpload />` dropzone
     - `boolean` / `toggle` -> `<Switch />` or `<Checkbox />`

4. **Table Columns vs. Form Columns**:
   - Which 4–6 key fields should be displayed as columns in the summary `DataTable`?
   - Which field should be the primary search filter (e.g. "Filter by name..." or "Filter by email...")?

5. **Form Layout (2-Column Arrangement)**:
   - **Left Column (Main)**: Which fields go into primary cards (e.g. General Information, Pricing, Specs)?
   - **Right Column (Sidebar)**: Which fields go into auxiliary cards (e.g. Status, Category, Media upload)?

---

## 🛠️ Phase 2: Implementation Checklist

Once requirements are aligned, generate the code files in this sequence:

### Step 1: Types & Mock Data
Create `src/components/admin/<module>/types.ts`:
- Define `<Module>Item` interface.
- Define `<Module>FormValues` interface.
- Provide 5–8 realistic mock items with static IDs and static dates.

### Step 2: Reusable Form Component
Create `src/components/admin/<module>/<module>-form.tsx`:
- Accepts `{ mode: "create" | "edit", initialData?: <Module>FormValues }`.
- Follows `dashboard-07` 2-column layout.
- Sticky action buttons (desktop header + mobile bottom bar).
- Discard button triggers `ConfirmDiscardDialog` if dirty.
- Submit handler calls `toast.success` and routes to `/admin/<module>`.

### Step 3: Catalog Index Page
Create `src/app/admin/<module>/page.tsx`:
- `PageHeader` with title, subtitle, and `+ Add <Module>` link button:
  ```tsx
  <Link href="/admin/<module>/new" className={buttonVariants({ size: "sm" })}>
    <PlusCircle className="mr-2 h-4 w-4" />
    Add <Module>
  </Link>
  ```
- KPI `StatCard` row (Total items, Active/Completed, etc.).
- TanStack `columns` definition:
  - Formatted text/numbers/badges.
  - Row actions dropdown: "Edit" link to `/admin/<module>/${item.id}/edit` and "Delete" button opening `ConfirmDeleteDialog`.
- Render `<DataTable columns={columns} data={mockData} searchKey="..." />`.
- Wrap page in `<React.Suspense>`.

### Step 4: Dedicated Create Page
Create `src/app/admin/<module>/new/page.tsx`:
- Render `<ModuleForm mode="create" />`.

### Step 5: Dedicated Edit Page
Create `src/app/admin/<module>/[id]/edit/page.tsx`:
- Find mock item by `id` parameter.
- Render `<ModuleForm mode="edit" initialData={matchedItem} />`.

### Step 6: Sidebar Navigation Registration
Update `src/registry/admin/admin-shell/app-sidebar.tsx`:
- Import the chosen Lucide icon.
- Add entry into `defaultNavGroups` under the selected group:
  ```tsx
  { title: "<Plural Name>", url: "/admin/<module>", icon: IconComponent },
  { title: "Add <Singular Name>", url: "/admin/<module>/new", icon: PlusCircle },
  ```

---

## 🧪 Phase 3: Verification

Always verify the newly scaffolded module before concluding:
1. Run `npx tsc --noEmit` to confirm 0 TypeScript errors.
2. Run `npm run build` to verify partial prerendering, dynamic route safety, and build passes cleanly.
3. Test navigation between `/admin/<module>`, `/admin/<module>/new`, and `/admin/<module>/[id]/edit`.
