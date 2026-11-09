"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  CheckCircle2,
  Package,
  Plus,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

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

// CRUD Primitives
import { ConfirmDeleteDialog } from "@/components/admin/crud-primitives/confirm-delete-dialog"
import {
  getProductTotalStock,
  initialProducts,
  type Product,
} from "@/data/products-data"
import { getProductColumns } from "./columns"

export function ProductsClient() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Delete Dialog state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const inStockCount = products.filter((p) => getProductTotalStock(p) > 10).length
  const lowStockCount = products.filter((p) => {
    const stock = getProductTotalStock(p)
    return stock > 0 && stock <= 10
  }).length
  const outOfStockCount = products.filter((p) => getProductTotalStock(p) === 0).length

  const columns = useMemo(
    () =>
      getProductColumns({
        onEdit: (product) => router.push(`/admin/products/${product.id}/edit`),
        onDelete: (product) => handleOpenDelete(product),
      }),
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
              trend={{
                value: `${Math.round(
                  (inStockCount / (products.length || 1)) * 100
                )}%`,
                positive: true,
              }}
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
