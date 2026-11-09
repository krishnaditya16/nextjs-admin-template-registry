# Module Reference & Code Patterns

This reference provides canonical snippets based on the existing `products` implementation in this repository.

---

## 1. Types & Mock Data (`types.ts`)

```typescript
export interface CustomerItem {
  id: string
  name: string
  email: string
  status: "Active" | "Inactive" | "Pending"
  totalOrders: number
  totalSpent: number
  createdAt: string
}

export interface CustomerFormValues {
  name: string
  email: string
  phone?: string
  status: "Active" | "Inactive" | "Pending"
  notes?: string
  avatarUrl?: string
}

export const mockCustomers: CustomerItem[] = [
  {
    id: "CST-001",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Active",
    totalOrders: 14,
    totalSpent: 1250.0,
    createdAt: "2025-01-10T00:00:00Z",
  },
  // Ensure static timestamps to prevent Next.js 16 prerender errors
]
```

---

## 2. Reusable 2-Column Form Pattern (`<module>-form.tsx`)

```tsx
"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConfirmDiscardDialog } from "@/components/admin/crud-primitives/confirm-discard-dialog"

export function ModuleForm({ mode, initialData }: { mode: "create" | "edit"; initialData?: any }) {
  const router = useRouter()
  const [isDirty, setIsDirty] = useState(false)
  const [formData, setFormData] = useState(initialData || { name: "", status: "Active" })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    toast.success(mode === "create" ? "Item created successfully" : "Item updated successfully")
    router.push("/admin/<module>")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header bar with back button, title, and action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/<module>" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-bold">{mode === "create" ? "Create Item" : "Edit Item"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <ConfirmDiscardDialog isDirty={isDirty} onConfirmDiscard={() => router.push("/admin/<module>")}>
            <Button type="button" variant="outline" size="sm">Discard</Button>
          </ConfirmDiscardDialog>
          <Button type="submit" size="sm">{mode === "create" ? "Save Item" : "Update Item"}</Button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details (Col span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Form fields */}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Details (Col span 1) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status dropdown / image upload */}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
```

---

## 3. Data Table 3-File Architecture

### `columns.tsx` ("use client")
```tsx
"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/admin/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/admin/data-table/data-table-row-actions"
import { Badge } from "@/components/ui/badge"

export interface ModuleColumnsOptions {
  onEdit?: (item: any) => void
  onDelete: (item: any) => void
}

export function getModuleColumns({ onEdit, onDelete }: ModuleColumnsOptions): ColumnDef<any>[] {
  return [
    // Column definitions
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          onEdit={onEdit ? () => onEdit(row.original) : undefined}
          onDelete={() => onDelete(row.original)}
        />
      ),
    },
  ]
}
```

### `<module>-client.tsx` ("use client")
```tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/admin/data-table/data-table"
import { ConfirmDeleteDialog } from "@/components/admin/crud-primitives/confirm-delete-dialog"
import { getModuleColumns } from "./columns"

export function ModuleClient() {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<any | null>(null)

  const columns = useMemo(
    () =>
      getModuleColumns({
        onEdit: (item) => router.push(`/admin/<module>/${item.id}/edit`),
        onDelete: (item) => {
          setDeletingItem(item)
          setIsDeleteOpen(true)
        },
      }),
    [router]
  )

  return (
    <>
      <DataTable columns={columns} data={items} searchKey="name" />
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={deletingItem ? `Delete "${deletingItem.name}"?` : "Delete item?"}
        onConfirm={async () => {
          setItems((prev) => prev.filter((i) => i.id !== deletingItem.id))
          setIsDeleteOpen(false)
        }}
      />
    </>
  )
}
```

### `page.tsx` (Server Component)
```tsx
import { Suspense } from "react"
import type { Metadata } from "next"
import { ModuleClient } from "./<module>-client"

export const metadata: Metadata = {
  title: "<Plural Name>",
  description: "Manage your <module> catalog...",
}

export default function ModulePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ModuleClient />
    </Suspense>
  )
}
```
