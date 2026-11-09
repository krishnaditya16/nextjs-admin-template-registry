import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { RecentOrder } from "@/data/orders-data"

export const recentOrderColumns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div className="font-medium text-foreground leading-tight">
            {order.customer}
          </div>
          <div className="text-xs text-muted-foreground">{order.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "product",
    header: () => <span className="hidden md:inline">Product</span>,
    cell: ({ row }) => (
      <span className="hidden md:inline text-muted-foreground">
        {row.getValue("product")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "Completed" ? "default" : "secondary"}
          className="text-[10px] font-medium"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums text-foreground">
        {row.getValue("amount")}
      </div>
    ),
  },
]
