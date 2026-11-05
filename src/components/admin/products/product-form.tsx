"use client"

import * as React from "react"
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
import { LocalImageUpload } from "@/components/admin/crud-primitives/local-image-upload"
import { ConfirmDiscardDialog } from "@/components/admin/crud-primitives/confirm-discard-dialog"
import type { Product } from "@/lib/products-data"

export interface ProductFormData {
  name: string
  category: string
  price: string
  stock: string
  status: string
  description: string
  sku: string
  imageFile: File | null
}

export interface ProductFormProps {
  initialData?: Partial<Product>
  mode?: "create" | "edit"
  onSubmit: (data: ProductFormData) => Promise<void> | void
  isSubmitting?: boolean
  backHref?: string
}

const CATEGORIES = [
  "Electronics",
  "Computers",
  "Accessories",
  "Displays",
  "Furniture",
  "Office Supplies",
]

const STATUSES = ["In Stock", "Low Stock", "Out of Stock"]

export function ProductForm({
  initialData,
  mode = initialData?.id ? "edit" : "create",
  onSubmit,
  isSubmitting = false,
  backHref = "/admin/products",
}: ProductFormProps) {
  const router = useRouter()
  const [isDiscardOpen, setIsDiscardOpen] = React.useState(false)

  // Form State
  const [name, setName] = React.useState(initialData?.name ?? "")
  const [sku, setSku] = React.useState(initialData?.id ?? "PRD-109")
  const [category, setCategory] = React.useState(initialData?.category ?? "Electronics")
  const [price, setPrice] = React.useState(
    initialData?.price !== undefined ? String(initialData.price) : "299.00"
  )
  const [stock, setStock] = React.useState(
    initialData?.stock !== undefined ? String(initialData.stock) : "50"
  )
  const [status, setStatus] = React.useState<string>(initialData?.status ?? "In Stock")
  const [description, setDescription] = React.useState(initialData?.description ?? "")
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const handleDiscard = () => {
    toast.info("Changes discarded")
    router.push(backHref)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Product name is required.")
      return
    }

    await onSubmit({
      name,
      category,
      price,
      stock,
      status,
      description,
      sku,
      imageFile,
    })
  }

  const isEdit = mode === "edit"
  const pageTitle = isEdit ? name || "Edit Product" : "Create Product"
  const submitButtonText = isEdit ? "Save Product" : "Create Product"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Action Bar matching shadcn dashboard-07 */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={() => setIsDiscardOpen(true)}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {pageTitle}
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          {status}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsDiscardOpen(true)}
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
              submitButtonText
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
                {isEdit
                  ? "Edit the product name, specifications, and description."
                  : "Enter the product name, specifications, and description."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <textarea
                  id="product-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a comprehensive description of the product features..."
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
              <CardDescription>
                Set standard retail price, SKU, and starting inventory quantity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="product-price">
                    Price ($) <span className="text-destructive">*</span>
                  </Label>
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
                <div className="space-y-2">
                  <Label htmlFor="product-stock">
                    Stock Units <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="product-stock"
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU Code</Label>
                  <Input
                    id="product-sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status, Category, and Media Upload */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="status-select">Status</Label>
                <Select value={status} onValueChange={(val) => val && setStatus(val)}>
                  <SelectTrigger id="status-select" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
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
              <div className="space-y-2">
                <Label htmlFor="category-select">Category</Label>
                <Select value={category} onValueChange={(val) => val && setCategory(val)}>
                  <SelectTrigger id="category-select" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
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
                defaultImageUrl={initialData?.imageUrl ?? null}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Actions Bar */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsDiscardOpen(true)}
          disabled={isSubmitting}
        >
          Discard
        </Button>
        <Button size="sm" type="submit" disabled={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>

      <ConfirmDiscardDialog
        open={isDiscardOpen}
        onOpenChange={setIsDiscardOpen}
        onConfirm={handleDiscard}
      />
    </form>
  )
}
