export interface RecentOrder {
  id: string
  customer: string
  email: string
  product: string
  amount: string
  status: "Completed" | "Processing" | "Pending" | "Cancelled" | string
  date: string
}

export const recentOrders: RecentOrder[] = [
  {
    id: "ORD-9481",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    product: "Sony WH-1000XM5",
    amount: "$399.99",
    status: "Completed",
    date: "Just now",
  },
  {
    id: "ORD-9480",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    product: "MacBook Pro 16-inch",
    amount: "$3,499.00",
    status: "Processing",
    date: "12m ago",
  },
  {
    id: "ORD-9479",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    product: "Logitech MX Master 3S",
    amount: "$99.99",
    status: "Completed",
    date: "1h ago",
  },
  {
    id: "ORD-9478",
    customer: "William Kim",
    email: "will@email.com",
    product: "Keychron Q1 Pro Keyboard",
    amount: "$199.00",
    status: "Completed",
    date: "3h ago",
  },
  {
    id: "ORD-9477",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    product: "Anker Prime Power Bank",
    amount: "$129.99",
    status: "Completed",
    date: "5h ago",
  },
]
