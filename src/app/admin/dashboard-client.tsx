"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CreditCard,
  DollarSign,
  ImageIcon,
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
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Admin Shell
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { PageHeader } from "@/components/admin/admin-shell/page-header"
import { StatCard } from "@/components/admin/admin-shell/stat-card"
import { UserNav } from "@/components/admin/auth-guard/user-nav"
import { DataTable } from "@/components/admin/data-table/data-table"
import {
  getProductCoverImage,
  getProductTotalStock,
  initialProducts,
} from "@/data/products-data"
import { recentOrderColumns } from "./columns"
import { recentOrders } from "@/data/orders-data"

export function DashboardClient() {
  const router = useRouter()

  const lowStockProducts = initialProducts.filter((p) => {
    const total = getProductTotalStock(p)
    return total <= 10
  })

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
              href="/admin/products"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
            >
              <Package className="size-3.5" />
              Manage Catalog
            </Link>
            <Link
              href="/admin/products/new"
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
          <div className="grid gap-6 lg:grid-cols-3 items-start">
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
                  onClick={() => router.push("/admin/products")}
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  View all
                  <ArrowRight className="size-3" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <DataTable
                  columns={recentOrderColumns}
                  data={recentOrders}
                  hideToolbar
                  hidePagination
                />
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
                  {lowStockProducts.map((item) => {
                    const totalStock = getProductTotalStock(item)
                    const isOutOfStock = totalStock === 0
                    const cover = getProductCoverImage(item)

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0 gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="size-9 shrink-0 overflow-hidden rounded-md border bg-muted/40 relative">
                            {cover ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={cover.url}
                                alt={cover.altText || item.name}
                                className="size-full object-cover"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center text-muted-foreground">
                                <ImageIcon className="size-3.5 opacity-40" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <Link
                              href={`/admin/products/${item.id}/edit`}
                              className="text-sm font-medium hover:underline text-foreground leading-none truncate block"
                            >
                              {item.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              {item.variants.length} variant
                              {item.variants.length > 1 ? "s" : ""} · {totalStock} left
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={isOutOfStock ? "destructive" : "secondary"}
                          className="text-[10px] font-medium shrink-0"
                        >
                          {isOutOfStock ? "Out of Stock" : "Low Stock"}
                        </Badge>
                      </div>
                    )
                  })}

                  <div className="pt-2">
                    <Link
                      href="/admin/products"
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
                    href="/admin/products/new"
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
