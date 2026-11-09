import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  ExternalLink,
  Layers,
  LayoutDashboard,
  Lock,
  Package,
  ShieldCheck,
  Table,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Admin Portal — Design System & Registry",
  description:
    "An enterprise-grade admin template and custom shadcn/ui registry built with Next.js 16, Tailwind CSS v4, and React 19.",
}

const registryBlocks = [
  {
    name: "admin-shell",
    title: "Admin Shell",
    description:
      "Collapsible sidebar, dynamic breadcrumbs, responsive sticky header, theme toggle, and KPI stat cards.",
    icon: LayoutDashboard,
    installCmd:
      "npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/admin-shell.json",
  },
  {
    name: "data-table",
    title: "TanStack Data Table",
    description:
      "Type-safe data table engine with multi-column sorting, text filtering, column visibility toggling, and pagination.",
    icon: Table,
    installCmd:
      "npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/data-table.json",
  },
  {
    name: "auth-guard",
    title: "Auth Guard",
    description:
      "Card-based login and registration screens (shadcn login-01 style) plus responsive user avatar navigation.",
    icon: Lock,
    installCmd:
      "npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/auth-guard.json",
  },
  {
    name: "crud-primitives",
    title: "CRUD Primitives",
    description:
      "Safe delete and discard confirmation dialogs, drag-and-drop file upload dropzone with live preview.",
    icon: Layers,
    installCmd:
      "npx shadcn add https://raw.githubusercontent.com/krishnaditya16/nextjs-admin-template-registry/main/public/r/crud-primitives.json",
  },
]

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Navbar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold text-sm">
              A
            </div>
            <span className="font-semibold text-sm tracking-tight">Admin Template Registry</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/krishnaditya16/nextjs-admin-template-registry"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs gap-1.5")}
            >
              GitHub
              <ExternalLink className="size-3" />
            </a>
            <Link
              href="/admin"
              className={cn(buttonVariants({ size: "sm" }), "text-xs gap-1.5")}
            >
              Open Admin
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">Next.js 16 App Router</Badge>
            <Badge variant="outline" className="text-xs font-normal">Tailwind CSS v4</Badge>
            <Badge variant="outline" className="text-xs font-normal">React 19</Badge>
            <Badge variant="outline" className="text-xs font-normal">shadcn/ui Registry</Badge>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Enterprise Admin Portal & <br className="hidden sm:inline" />
            Design System Registry
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            A modular reference architecture and distributable shadcn/ui registry. 
            All admin pages are cleanly isolated under the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">/admin</code> route, 
            leaving your root storefront and landing pages untouched.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/admin"
              className={cn(buttonVariants({ size: "default" }), "gap-2 px-6")}
            >
              <LayoutDashboard className="size-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/admin/products"
              className={cn(buttonVariants({ variant: "outline", size: "default" }), "gap-2 px-6")}
            >
              <Package className="size-4" />
              Browse Products Table
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost", size: "default" }), "gap-2 px-6")}
            >
              <Lock className="size-4" />
              Sign In Demo
            </Link>
          </div>

          {/* Architectural Safeguard Callout */}
          <div className="mx-auto max-w-2xl rounded-lg border border-primary/20 bg-primary/5 p-4 text-left text-xs text-muted-foreground flex gap-3 items-start mt-8">
            <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground">Safe for existing projects: </span>
              In production setups, your public storefront or marketing site resides at <code className="font-mono text-foreground font-semibold">/</code> while the administrative portal lives strictly isolated under <code className="font-mono text-foreground font-semibold">/admin</code>.
            </div>
          </div>
        </section>

        {/* Distributed Registry Blocks */}
        <section className="border-t bg-muted/20 py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Distributed Registry Blocks</h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Install any or all blocks into any Next.js project directly via the shadcn CLI.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {registryBlocks.map((block) => {
                const Icon = block.icon
                return (
                  <Card key={block.name} className="flex flex-col justify-between">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{block.title}</CardTitle>
                          <Badge variant="secondary" className="font-mono text-[10px] mt-0.5">
                            {block.name}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="pt-2 text-xs leading-relaxed">
                        {block.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="rounded-md bg-muted p-2 font-mono text-[11px] text-muted-foreground overflow-x-auto whitespace-nowrap">
                        <code>{block.installCmd}</code>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-4">
          Next.js Admin Template Registry · MIT License · Clean App Router Architecture
        </div>
      </footer>
    </div>
  )
}
