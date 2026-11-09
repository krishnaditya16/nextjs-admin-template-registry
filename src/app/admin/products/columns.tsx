"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/admin/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/admin/data-table/data-table-row-actions"
import type { Product } from "@/data/products-data"

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
            onEdit={onEdit ? () => onEdit(product) : undefined}
            onDelete={() => onDelete(product)}
          />
        )
      },
    },
  ]
}
