"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// Admin Shell & Components
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { UserNav } from "@/components/admin/auth-guard/user-nav"
import { LocalImageUpload } from "@/components/admin/crud-primitives/local-image-upload"

function NewProductContent() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Form State
  const [name, setName] = React.useState("")
  const [sku, setSku] = React.useState("PRD-109")
  const [category, setCategory] = React.useState("Electronics")
  const [price, setPrice] = React.useState("299.00")
  const [stock, setStock] = React.useState("50")
  const [status, setStatus] = React.useState("In Stock")
  const [description, setDescription] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Product name is required.")
      return
    }

    setIsSubmitting(true)

    // Simulate database write
    await new Promise((resolve) => setTimeout(resolve, 600))

    setIsSubmitting(false)
    toast.success(`Product "${name}" was created successfully!`)
    router.push("/")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Products", href: "/" },
            { label: "Add Product" },
          ]}
          userNav={<UserNav onLogout={() => router.push("/login")} />}
        />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Action Bar matching shadcn dashboard-07 */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="size-7"
                render={<Link href="/" />}
                nativeButton={false}
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Create Product
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {status}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href="/" />}
                  nativeButton={false}
                  disabled={isSubmitting}
                >
                  Discard
                </Button>
                <Button size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </Button>
              </div>
            </div>

            {/* Two-column layout matching shadcn dashboard-07 */}
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              {/* Left Column: Product Details & Stock/Pricing */}
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Enter the product name, description, and specifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="product-name">Name *</Label>
                        <Input
                          id="product-name"
                          type="text"
                          className="w-full"
                          placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="product-desc">Description</Label>
                        <textarea
                          id="product-desc"
                          rows={4}
                          placeholder="Detailed technical specifications, materials, warranty, and features..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stock & Pricing</CardTitle>
                    <CardDescription>
                      Configure base retail price, stock units, and internal SKU identifier.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="product-price">Price ($ USD) *</Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="product-stock">Stock Units *</Label>
                        <Input
                          id="product-stock"
                          type="number"
                          min="0"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="product-sku">SKU Code</Label>
                        <Input
                          id="product-sku"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Status, Category & Media */}
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <Label htmlFor="product-status">Status</Label>
                      <Select
                        value={status}
                        onValueChange={(val) => {
                          if (val) setStatus(val)
                        }}
                      >
                        <SelectTrigger id="product-status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Stock">In Stock</SelectItem>
                          <SelectItem value="Low Stock">Low Stock</SelectItem>
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <Label htmlFor="product-category">Category</Label>
                      <Select
                        value={category}
                        onValueChange={(val) => {
                          if (val) setCategory(val)
                        }}
                      >
                        <SelectTrigger id="product-category" aria-label="Select category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Computers">Computers</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Displays">Displays</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Product Media</CardTitle>
                    <CardDescription>
                      Upload product imagery for catalog display.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocalImageUpload
                      value={imageFile}
                      onChange={setImageFile}
                      maxSizeMB={2}
                      accept="image/jpeg,image/png,image/webp"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mobile Actions Bar */}
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/" />}
                nativeButton={false}
              >
                Discard
              </Button>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                Save Product
              </Button>
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function NewProductPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NewProductContent />
    </React.Suspense>
  )
}
