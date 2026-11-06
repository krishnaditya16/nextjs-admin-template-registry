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

import * as React from "react"
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
  const [isDirty, setIsDirty] = React.useState(false)
  const [formData, setFormData] = React.useState(initialData || { name: "", status: "Active" })

  const handleSubmit = (e: React.FormEvent) => {
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

## 3. Data Table Page Pattern (`page.tsx`)

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/admin/admin-shell/page-header"
import { DataTable } from "@/components/admin/data-table/data-table"
import { ConfirmDeleteDialog } from "@/components/admin/crud-primitives/confirm-delete-dialog"
import { buttonVariants, Button } from "@/components/ui/button"

export default function ModulePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ModuleContent />
    </React.Suspense>
  )
}

function ModuleContent() {
  // Columns definition, delete dialog handling, and DataTable rendering
}
```
