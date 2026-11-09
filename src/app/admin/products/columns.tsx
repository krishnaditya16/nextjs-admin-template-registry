"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { ImageIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/admin/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/admin/data-table/data-table-row-actions"
import {
  getProductCoverImage,
  getProductPriceRange,
  getProductTotalStock,
  type Product,
} from "@/data/products-data"

export interface ProductColumnsOptions {
  onEdit?: (p: Product) => void
  onDelete: (p: Product) => void
}

export function getProductColumns({
  onEdit,
  onDelete,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => {
        const product = row.original
        const coverImage = getProductCoverImage(product)
        return (
          <div className="flex items-center gap-3">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-md border bg-muted/40">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverImage.url}
                  alt={coverImage.altText || product.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="size-4 opacity-40" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="font-medium text-foreground hover:underline transition-all line-clamp-1"
              >
                {product.name}
              </Link>
              <span className="font-mono text-xs text-muted-foreground">
                /{product.slug}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      id: "category",
      accessorFn: (row) => row.category?.name ?? "Uncategorized",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const categoryName = row.original.category?.name ?? "Uncategorized"
        return <span className="text-sm text-muted-foreground">{categoryName}</span>
      },
    },
    {
      id: "stock",
      accessorFn: (row) => getProductTotalStock(row),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Inventory" />
      ),
      cell: ({ row }) => {
        const product = row.original
        const totalStock = getProductTotalStock(product)
        const isOutOfStock = totalStock === 0

        return (
          <div className="flex flex-col gap-0.5">
            <span
              className={`tabular-nums font-medium ${
                isOutOfStock ? "text-destructive font-semibold" : ""
              }`}
            >
              {isOutOfStock ? "Out of Stock" : `${totalStock} units`}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.variants.length} variant
              {product.variants.length > 1 ? "s" : ""}
            </span>
          </div>
        )
      },
    },
    {
      id: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        const priceRange = getProductPriceRange(row.original)
        return <div className="font-medium tabular-nums">{priceRange}</div>
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue<boolean>("isActive")
        return (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className="text-[11px] font-medium"
          >
            {isActive ? "Active" : "Draft"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          onEdit={onEdit ? () => onEdit(row.original) : undefined}
          onDelete={onDelete ? () => onDelete(row.original) : undefined}
        />
      ),
    },
  ]
}
