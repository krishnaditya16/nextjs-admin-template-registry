"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { UserNav } from "@/components/admin/auth-guard/user-nav"
import { ProductForm, type ProductFormData } from "@/components/admin/products/product-form"

export function NewProductClient() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreate = async (data: ProductFormData) => {
    setIsSubmitting(true)
    // Simulate database write
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)

    toast.success(`Product "${data.name}" was created successfully!`)
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
            { label: "Add Product" },
          ]}
          userNav={<UserNav onLogout={() => router.push("/login")} />}
        />

        <main className="flex-1 p-4 md:p-6">
          <ProductForm
            mode="create"
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            backHref="/admin/products"
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
