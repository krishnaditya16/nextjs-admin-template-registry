"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CreditCard,
  DollarSign,
  Package,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Admin Shell
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { PageHeader } from "@/components/admin/admin-shell/page-header"
import { StatCard } from "@/components/admin/admin-shell/stat-card"
import { UserNav } from "@/components/admin/auth-guard/user-nav"
import { initialProducts } from "@/lib/products-data"

const recentOrders = [
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

function DashboardContent() {
  const router = useRouter()

  const lowStockProducts = initialProducts.filter(
    (p) => p.status === "Low Stock" || p.status === "Out of Stock"
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[{ label: "Dashboard" }]}
          userNav={
            <UserNav
              user={{
                name: "Instructor Alex",
                email: "instructor@bootcamp.dev",
                role: "ADMIN",
              }}
              onLogout={() => router.push("/login")}
            />
          }
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Dashboard Page Header */}
          <PageHeader
            title="Dashboard"
            description="Overview of business performance, catalog health, and recent store activity."
          >
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
            >
              <Package className="size-3.5" />
              Manage Catalog
            </Link>
            <Link
              href="/products/new"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              <Plus className="size-3.5" />
              Add Product
            </Link>
          </PageHeader>

          {/* 4 KPI Summary StatCards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              description="from last month"
              icon={DollarSign}
              trend={{ value: "+20.1%", positive: true }}
            />
            <StatCard
              title="Orders Placed"
              value="3,240"
              description="this billing cycle"
              icon={ShoppingBag}
              trend={{ value: "+12.4%", positive: true }}
            />
            <StatCard
              title="Active Products"
              value={initialProducts.length.toString()}
              description="in inventory catalog"
              icon={Package}
              trend={{ value: "+8.2%", positive: true }}
            />
            <StatCard
              title="Active Customers"
              value="1,429"
              description="verified accounts"
              icon={Users}
              trend={{ value: "+4.2%", positive: true }}
            />
          </div>

          {/* Grid Layout: Recent Orders + Inventory Health Alerts */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Orders Table (span 2) */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>
                    Real-time purchases processed through your store checkout.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/products")}
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  View all
                  <ArrowRight className="size-3" />
                </Button>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px] text-xs font-medium text-muted-foreground">Order ID</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Customer</TableHead>
                      <TableHead className="hidden md:table-cell text-xs font-medium text-muted-foreground">Product</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right text-xs font-medium text-muted-foreground">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} className="text-sm">
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground leading-tight">
                            {order.customer}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {order.product}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={order.status === "Completed" ? "default" : "secondary"}
                            className="text-[10px] font-medium"
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums text-foreground">
                          {order.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Inventory Alerts & Fast Navigation */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    Inventory Alerts
                  </CardTitle>
                  <CardDescription>
                    Products requiring restocking or stock updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lowStockProducts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="space-y-0.5">
                        <Link
                          href={`/products/${item.id}/edit`}
                          className="text-sm font-medium hover:underline text-foreground leading-none"
                        >
                          {item.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          SKU: {item.id} · {item.stock} left
                        </div>
                      </div>
                      <Badge
                        variant={item.status === "Low Stock" ? "secondary" : "destructive"}
                        className="text-[10px] font-medium"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}

                  <div className="pt-2">
                    <Link
                      href="/products"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-1.5")}
                    >
                      <Package className="size-3.5" />
                      View All {initialProducts.length} Products
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Navigation Card */}
              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <CreditCard className="size-4 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <Link
                    href="/products/new"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                  >
                    <span>Create new product</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                  >
                    <span>View authentication demo</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/placeholder"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                  >
                    <span>Inspect placeholder menu</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </React.Suspense>
  )
}
