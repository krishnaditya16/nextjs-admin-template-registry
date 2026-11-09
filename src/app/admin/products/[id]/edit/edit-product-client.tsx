"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { UserNav } from "@/components/admin/auth-guard/user-nav"
import { ProductForm, type ProductFormData } from "@/components/admin/products/product-form"
import { initialProducts, type Product } from "@/data/products-data"

export function EditProductClient({ productId }: { productId: string }) {
  const router = useRouter()

  const existingProduct: Product = useMemo(() => {
    return (
      initialProducts.find((p) => p.id === productId) ?? {
        id: productId,
        name: "Sony WH-1000XM5 Wireless Headphones",
        slug: "sony-wh-1000xm5",
        categoryId: "cat-electronics",
        category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
        isActive: true,
        createdAt: "2025-01-15T08:00:00Z",
        updatedAt: "2025-02-01T14:30:00Z",
        description: "Industry-leading noise cancellation with dual processors.",
        variants: [
          {
            id: `var-${productId}-1`,
            sku: "SNY-WH1000XM5-BLK",
            size: "Standard",
            color: "Black",
            price: 399.99,
            stock: 42,
            productId,
          },
        ],
        images: [
          {
            id: `img-${productId}-1`,
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            altText: "Sony WH-1000XM5 Black Front Profile",
            order: 0,
            productId,
          },
        ],
      }
    )
  }, [productId])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdate = async (data: ProductFormData) => {
    setIsSubmitting(true)
    // Simulate database update
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)

    toast.success(`Product "${data.name}" updated successfully!`)
    router.push("/admin/products")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Products", href: "/admin/products" },
            { label: `Edit ${productId}` },
          ]}
          userNav={<UserNav onLogout={() => router.push("/login")} />}
        />

        <main className="flex-1 p-4 md:p-6">
          <ProductForm
            mode="edit"
            initialData={existingProduct}
            onSubmit={handleUpdate}
            isSubmitting={isSubmitting}
            backHref="/admin/products"
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
