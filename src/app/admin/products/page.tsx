"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import {
  AlertTriangle,
  CheckCircle2,
  Package,
  Plus,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Admin Shell
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { PageHeader } from "@/components/admin/admin-shell/page-header"
import { StatCard } from "@/components/admin/admin-shell/stat-card"

// Auth Guard
import { UserNav } from "@/components/admin/auth-guard/user-nav"

// Data Table
import { DataTable } from "@/components/admin/data-table/data-table"
import { DataTableColumnHeader } from "@/components/admin/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/admin/data-table/data-table-row-actions"

// CRUD Primitives
import { ConfirmDeleteDialog } from "@/components/admin/crud-primitives/confirm-delete-dialog"
import { initialProducts, type Product } from "@/lib/products-data"

function ProductsContent() {
  const router = useRouter()
  const [products, setProducts] = React.useState<Product[]>(initialProducts)

  // Delete Dialog state
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product)
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return

    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id))
    toast.success(`Deleted "${deletingProduct.name}" from inventory.`)
    setIsDeleting(false)
    setIsDeleteOpen(false)
  }

  const inStockCount = products.filter((p) => p.status === "In Stock").length
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length
  const outOfStockCount = products.filter((p) => p.status === "Out of Stock").length

  const columns: ColumnDef<Product>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SKU / ID" />
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {row.getValue("id")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product Name" />
        ),
        cell: ({ row }) => {
          const product = row.original
          return (
            <div className="flex flex-col">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="font-medium text-foreground hover:underline transition-all"
              >
                {product.name}
              </Link>
              <span className="text-xs text-muted-foreground sm:hidden">
                {product.category}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
          return <div className="font-medium tabular-nums">{formatted}</div>
        },
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Stock" />
        ),
        cell: ({ row }) => {
          const stock = row.getValue<number>("stock")
          return <span className="tabular-nums">{stock} units</span>
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue<Product["status"]>("status")
          const variant =
            status === "In Stock"
              ? "default"
              : status === "Low Stock"
              ? "secondary"
              : "destructive"

          return (
            <Badge variant={variant} className="text-[11px] font-medium">
              {status}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const product = row.original
          return (
            <DataTableRowActions
              onEdit={() => router.push(`/admin/products/${product.id}/edit`)}
              onDelete={() => handleOpenDelete(product)}
            />
          )
        },
      },
    ],
    [router]
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Products" },
          ]}
          userNav={<UserNav onLogout={() => router.push("/login")} />}
        />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          <PageHeader
            title="Products"
            description="Manage your product catalog, inventory levels, and pricing."
          >
            <Link
              href="/admin/products/new"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              <Plus className="size-3.5" />
              Add Product
            </Link>
          </PageHeader>

          {/* 4 Inventory Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Products"
              value={products.length.toString()}
              description="items in active catalog"
              icon={Package}
            />
            <StatCard
              title="In Stock"
              value={inStockCount.toString()}
              description="ready for immediate shipment"
              icon={CheckCircle2}
              trend={{ value: `${Math.round((inStockCount / (products.length || 1)) * 100)}%`, positive: true }}
            />
            <StatCard
              title="Low Stock"
              value={lowStockCount.toString()}
              description="re-order threshold reached"
              icon={AlertTriangle}
            />
            <StatCard
              title="Out of Stock"
              value={outOfStockCount.toString()}
              description="currently unavailable"
              icon={XCircle}
            />
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={products}
            searchKey="name"
            searchPlaceholder="Filter products by name..."
          />
        </main>
      </SidebarInset>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={deletingProduct ? `Delete "${deletingProduct.name}"?` : "Delete item?"}
        description="Are you sure you want to permanently delete this product? This will remove all associated stock and pricing records."
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </SidebarProvider>
  )
}

export default function ProductsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </React.Suspense>
  )
}
