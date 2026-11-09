"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Code2, Layers, Package, PlusCircle } from "lucide-react"

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
import { UserNav } from "@/components/admin/auth-guard/user-nav"

export function PlaceholderClient() {
  const router = useRouter()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Placeholder Menu" },
          ]}
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
          <PageHeader
            title="Placeholder Menu"
            description="Use this page as a starting point to scaffold new administrative sections."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Layers className="size-5" />
                </div>
                <CardTitle>Extending the Admin Shell</CardTitle>
                <CardDescription>
                  You can register custom sidebar links, nested menus, and new routes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  To add new routes, configure new navigation items inside{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                    app-sidebar.tsx
                  </code>{" "}
                  and create corresponding folders in{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                    src/app/admin/
                  </code>
                  .
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/admin/products"
                    className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                  >
                    <Package className="size-3.5" />
                    View Products
                  </Link>
                  <Link
                    href="/admin/products/new"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                  >
                    <PlusCircle className="size-3.5" />
                    Add Product
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Code2 className="size-5" />
                </div>
                <CardTitle>Custom Logo Replacement</CardTitle>
                <CardDescription>
                  Easily brand your administration panel with the new AppLogo component.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  The reusable{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                    &lt;AppLogo /&gt;
                  </code>{" "}
                  component lets you change your company name, description, and icon from a single location without editing sidebar layout boilerplate.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/admin")}
                  className="gap-1.5"
                >
                  Return to Dashboard
                  <ArrowRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
