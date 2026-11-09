"use client"

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Loader2,
  Plus,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ConfirmDiscardDialog } from "@/components/admin/crud-primitives/confirm-discard-dialog"
import {
  DEFAULT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/data/products-data"

export interface ProductVariantInput {
  id?: string
  sku: string
  size: string
  color: string
  price: string
  stock: string
}

export interface FormProductImage {
  id: string
  url: string
  altText: string
  order: number
  file?: File
}

export interface ProductFormData {
  name: string
  slug: string
  description?: string
  isActive: boolean
  categoryId?: string | null
  variants: {
    id?: string
    sku: string
    size?: string | null
    color?: string | null
    price: number
    stock: number
  }[]
  images: {
    id?: string
    url: string
    altText?: string | null
    order: number
  }[]
}

export interface ProductFormProps {
  initialData?: Partial<Product>
  categories?: ProductCategory[]
  mode?: "create" | "edit"
  onSubmit: (data: ProductFormData) => Promise<void> | void
  isSubmitting?: boolean
  backHref?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function ProductForm({
  initialData,
  categories = DEFAULT_CATEGORIES,
  mode = initialData?.id ? "edit" : "create",
  onSubmit,
  isSubmitting = false,
  backHref = "/admin/products",
}: ProductFormProps) {
  const router = useRouter()
  const isEdit = mode === "edit"
  const [isDiscardOpen, setIsDiscardOpen] = useState(false)

  // Product Basic Info State
  const [name, setName] = useState(initialData?.name ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [isSlugCustomized, setIsSlugCustomized] = useState(Boolean(initialData?.slug))
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [isActive, setIsActive] = useState<boolean>(initialData?.isActive ?? true)
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId ?? initialData?.category?.id ?? categories[0]?.id ?? ""
  )

  // Product Gallery State
  const [images, setImages] = useState<FormProductImage[]>(() => {
    if (initialData?.images && initialData.images.length > 0) {
      return [...initialData.images]
        .sort((a, b) => a.order - b.order)
        .map((img, idx) => ({
          id: img.id || `img-${idx}`,
          url: img.url,
          altText: img.altText || "",
          order: idx,
        }))
    }
    return []
  })
  const [urlInput, setUrlInput] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Product Variants State
  const [variants, setVariants] = useState<ProductVariantInput[]>(() => {
    if (initialData?.variants && initialData.variants.length > 0) {
      return initialData.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        size: v.size ?? "",
        color: v.color ?? "",
        price: v.price !== undefined ? String(v.price) : "0",
        stock: v.stock !== undefined ? String(v.stock) : "0",
      }))
    }
    return [
      {
        sku: "SKU-001",
        size: "",
        color: "",
        price: "99.00",
        stock: "10",
      },
    ]
  })

  // Auto-slugify when typing name if not manually modified
  const handleNameChange = (val: string) => {
    setName(val)
    if (!isSlugCustomized) {
      setSlug(slugify(val))
    }
  }

  const handleSlugChange = (val: string) => {
    setIsSlugCustomized(true)
    setSlug(slugify(val))
  }

  // Variant change handler
  const handleVariantChange = (
    index: number,
    field: keyof ProductVariantInput,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    )
  }

  const handleAddVariant = () => {
    const nextIndex = variants.length + 1
    const lastVariant = variants[variants.length - 1]
    setVariants((prev) => [
      ...prev,
      {
        sku: `SKU-${String(nextIndex).padStart(3, "0")}`,
        size: "",
        color: "",
        price: lastVariant ? lastVariant.price : "99.00",
        stock: "10",
      },
    ])
  }

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) {
      toast.error("A product must have at least one variant.")
      return
    }
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }

  // Image actions
  const handleFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    )
    if (validFiles.length === 0) {
      toast.error("Please upload valid image files.")
      return
    }
    const newImages: FormProductImage[] = validFiles.map((file, idx) => ({
      id: `temp-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      altText: file.name.replace(/\.[^/.]+$/, ""),
      order: images.length + idx,
      file,
    }))
    setImages((prev) => [...prev, ...newImages])
    toast.success(`Added ${newImages.length} image${newImages.length > 1 ? "s" : ""}.`)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
    e.target.value = ""
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleAddUrl = () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    if (
      !trimmed.startsWith("http://") &&
      !trimmed.startsWith("https://") &&
      !trimmed.startsWith("/")
    ) {
      toast.error("Please enter a valid URL starting with http://, https://, or /")
      return
    }
    setImages((prev) => [
      ...prev,
      {
        id: `url-${Date.now()}`,
        url: trimmed,
        altText: "",
        order: prev.length,
      },
    ])
    setUrlInput("")
    toast.success("Image URL added to gallery.")
  }

  const handleSetCover = (index: number) => {
    if (index === 0) return
    setImages((prev) => {
      const next = [...prev]
      const [selected] = next.splice(index, 1)
      next.unshift(selected)
      return next.map((img, idx) => ({ ...img, order: idx }))
    })
    toast.success("Set as primary thumbnail cover.")
  }

  const handleMove = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= images.length) return
    setImages((prev) => {
      const next = [...prev]
      const temp = next[index]
      next[index] = next[targetIndex]
      next[targetIndex] = temp
      return next.map((img, idx) => ({ ...img, order: idx }))
    })
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) =>
      prev
        .filter((_, idx) => idx !== index)
        .map((img, idx) => ({ ...img, order: idx }))
    )
  }

  const handleDiscard = () => {
    toast.info("Changes discarded")
    router.push(backHref)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Product name is required.")
      return
    }

    const finalSlug = slug.trim() || slugify(name)
    if (!finalSlug) {
      toast.error("Product slug is required.")
      return
    }

    if (variants.length === 0) {
      toast.error("Please add at least one product variant.")
      return
    }

    // Validate variant SKUs and prices
    for (const [idx, v] of variants.entries()) {
      if (!v.sku.trim()) {
        toast.error(`Variant #${idx + 1} must have a SKU.`)
        return
      }
      if (isNaN(Number(v.price)) || Number(v.price) < 0) {
        toast.error(`Variant "${v.sku}" has an invalid price.`)
        return
      }
      if (isNaN(Number(v.stock)) || Number(v.stock) < 0) {
        toast.error(`Variant "${v.sku}" has an invalid stock quantity.`)
        return
      }
    }

    await onSubmit({
      name: name.trim(),
      slug: finalSlug,
      description: description.trim() || undefined,
      isActive,
      categoryId: categoryId === "none" ? null : categoryId,
      variants: variants.map((v) => ({
        id: v.id,
        sku: v.sku.trim(),
        size: v.size.trim() || null,
        color: v.color.trim() || null,
        price: Number(v.price),
        stock: parseInt(v.stock, 10) || 0,
      })),
      images: images.map((img, idx) => ({
        id:
          img.id.startsWith("temp-") || img.id.startsWith("url-")
            ? undefined
            : img.id,
        url: img.url,
        altText: img.altText.trim() || null,
        order: idx,
      })),
    })
  }

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
        <Badge
          variant={isActive ? "default" : "secondary"}
          className="ml-auto sm:ml-0"
        >
          {isActive ? "Active" : "Draft"}
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
      <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8">
        {/* Left Column: Product Details & Product Variants */}
        <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">
          {/* Card 1: General Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Title, URL slug, and detailed marketing description.
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
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-slug">
                    URL Slug <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    /products/{slug || "..."}
                  </span>
                </div>
                <Input
                  id="product-slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="e.g. sony-wh-1000xm5"
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
                  placeholder="Comprehensive description of product specifications, materials, and benefits..."
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Product Variants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="space-y-1">
                <CardTitle>Product Variants</CardTitle>
                <CardDescription>
                  Manage individual SKUs, pricing, inventory stock, sizes, and colors.
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleAddVariant}
              >
                <Plus className="size-3.5" />
                Add Variant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">SKU *</TableHead>
                      <TableHead className="w-[110px]">Price ($) *</TableHead>
                      <TableHead className="w-[100px]">Stock *</TableHead>
                      <TableHead className="w-[120px]">Size</TableHead>
                      <TableHead className="w-[120px]">Color</TableHead>
                      <TableHead className="w-[48px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variants.map((variant, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="p-2">
                          <Input
                            value={variant.sku}
                            onChange={(e) =>
                              handleVariantChange(idx, "sku", e.target.value)
                            }
                            placeholder="e.g. SONY-XM5-BLK"
                            className="h-8 font-mono text-xs"
                            required
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(idx, "price", e.target.value)
                            }
                            className="h-8 text-xs tabular-nums"
                            required
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(e) =>
                              handleVariantChange(idx, "stock", e.target.value)
                            }
                            className="h-8 text-xs tabular-nums"
                            required
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            value={variant.size}
                            onChange={(e) =>
                              handleVariantChange(idx, "size", e.target.value)
                            }
                            placeholder="e.g. M / 16-inch"
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            value={variant.color}
                            onChange={(e) =>
                              handleVariantChange(idx, "color", e.target.value)
                            }
                            placeholder="e.g. Space Black"
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveVariant(idx)}
                            disabled={variants.length <= 1}
                            aria-label={`Remove variant ${variant.sku}`}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status, Category, and Media Gallery */}
        <div className="grid auto-rows-max items-start gap-6">
          {/* Card: Status & Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>
                Set visibility across your catalog and store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="status-select">Visibility</Label>
                <Select
                  value={isActive ? "active" : "draft"}
                  onValueChange={(val) => setIsActive(val === "active")}
                >
                  <SelectTrigger id="status-select" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active (Published)</SelectItem>
                    <SelectItem value="draft">Draft (Hidden)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Card: Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>Assign to a catalog section.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="category-select">Category</Label>
                <Select
                  value={categoryId || "none"}
                  onValueChange={(val) =>
                    setCategoryId(val === "none" || !val ? "" : val)
                  }
                >
                  <SelectTrigger id="category-select" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Uncategorized</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Card: Product Gallery */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Product Images</CardTitle>
                <span className="text-xs font-normal text-muted-foreground">
                  {images.length} {images.length === 1 ? "image" : "images"}
                </span>
              </div>
              <CardDescription>
                The first image serves as the catalog cover thumbnail.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {images.map((img, idx) => {
                  const isCover = idx === 0
                  return (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted/30 shadow-2xs"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.altText || `Product image ${idx + 1}`}
                        className="size-full object-cover transition-transform group-hover:scale-105"
                      />

                      {/* Cover Badge or Order Pill */}
                      {isCover ? (
                        <Badge className="absolute top-1.5 left-1.5 h-4.5 px-1.5 text-[9px] font-semibold bg-primary text-primary-foreground shadow-xs pointer-events-none">
                          Cover
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="absolute top-1.5 left-1.5 h-4.5 px-1.5 text-[9px] font-mono bg-background/85 backdrop-blur-xs shadow-xs pointer-events-none"
                        >
                          #{idx + 1}
                        </Badge>
                      )}

                      {/* Top Right: Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 size-6 rounded-md bg-background/85 hover:bg-destructive hover:text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-foreground shadow-xs cursor-pointer"
                        title="Remove image"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        <Trash2 className="size-3" />
                      </button>

                      {/* Bottom Controls Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(idx)}
                              className="size-5 rounded bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                              title="Set as Cover"
                              aria-label="Set as cover thumbnail"
                            >
                              <Star className="size-3" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, "left")}
                            disabled={idx === 0}
                            className="size-5 rounded bg-white/20 hover:bg-white text-white hover:text-black disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
                            title="Move earlier"
                            aria-label="Move earlier"
                          >
                            <ArrowLeft className="size-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, "right")}
                            disabled={idx === images.length - 1}
                            className="size-5 rounded bg-white/20 hover:bg-white text-white hover:text-black disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
                            title="Move later"
                            aria-label="Move later"
                          >
                            <ArrowRight className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Upload Trigger Box */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-square flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed text-xs text-muted-foreground transition-all cursor-pointer hover:border-primary hover:text-foreground hover:bg-muted/30 ${
                    isDragOver
                      ? "border-primary bg-primary/5 text-primary scale-98"
                      : "border-muted-foreground/25"
                  }`}
                >
                  <UploadCloud className="size-5" />
                  <span className="font-medium text-xs">Upload</span>
                  <span className="text-[10px] text-muted-foreground">Drop or browse</span>
                </div>
              </div>

              {/* Add by URL input */}
              <div className="flex items-center gap-1.5 pt-1">
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddUrl()
                    }
                  }}
                  placeholder="Paste image URL..."
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddUrl}
                  className="h-8 px-2.5 text-xs shrink-0"
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Mobile Actions */}
      <div className="flex items-center justify-end gap-2 md:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDiscardOpen(true)}
          disabled={isSubmitting}
        >
          Discard
        </Button>
        <Button type="submit" disabled={isSubmitting}>
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

      {/* Discard Confirmation Dialog */}
      <ConfirmDiscardDialog
        open={isDiscardOpen}
        onOpenChange={setIsDiscardOpen}
        onConfirm={handleDiscard}
      />
    </form>
  )
}
