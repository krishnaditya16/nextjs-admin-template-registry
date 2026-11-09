"use client"

import { useMemo, type ComponentProps, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  FolderTree,
  Layers,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/admin/admin-shell/app-logo"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string | number
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

// ============================================================================
// Navigation Menu Configuration
// Group your sidebar items here. Easily add new groups and routes!
// ============================================================================
export const defaultNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Categories",
        href: "#",
        icon: FolderTree,
        badge: "Soon",
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        title: "Orders",
        href: "#",
        icon: ShoppingBag,
        badge: "Soon",
      },
      {
        title: "Customers",
        href: "#",
        icon: Users,
        badge: "Soon",
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        title: "Articles",
        href: "#",
        icon: FileText,
        badge: "Soon",
      },
      {
        title: "Reviews",
        href: "#",
        icon: Star,
        badge: "Soon",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Placeholder Menu",
        href: "/placeholder",
        icon: Layers,
        badge: "Guide",
      },
    ],
  },
]

// Flattened fallback for backwards compatibility
export const defaultNavItems: NavItem[] = defaultNavGroups.flatMap((g) => g.items)

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  navGroups?: NavGroup[]
  navItems?: NavItem[]
  brand?: {
    name?: string
    imageSrc?: string
    description?: string
  }
  footerContent?: ReactNode
}

export function AppSidebar({
  navGroups,
  navItems,
  brand,
  footerContent,
  collapsible = "icon",
  className,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname()

  // Resolve groups: prioritize navGroups, fallback to navItems wrapped in a single group, or defaultNavGroups
  const resolvedGroups: NavGroup[] = useMemo(() => {
    if (navGroups && navGroups.length > 0) return navGroups
    if (navItems && navItems.length > 0) {
      return [{ label: "Navigation", items: navItems }]
    }
    return defaultNavGroups
  }, [navGroups, navItems])

  const isItemActive = (href: string) => {
    if (href === "#" || href.startsWith("#") || href.startsWith("/#")) {
      return false
    }
    if (href === "/" || href === "/admin") {
      return pathname === "/" || pathname === "/admin"
    }
    if (pathname === href) return true
    if (href === "/admin/products" || href === "/products") {
      return (
        pathname === "/admin/products" ||
        pathname.startsWith("/admin/products/") ||
        pathname === "/products" ||
        pathname.startsWith("/products/")
      )
    }
    if (href === "/admin/settings" || href === "/settings") {
      return (
        pathname === "/admin/settings" ||
        pathname.startsWith("/admin/settings/") ||
        pathname === "/settings" ||
        pathname === "/profile" ||
        pathname.startsWith("/settings/")
      )
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar
      collapsible={collapsible}
      className={cn("border-r", className)}
      {...props}
    >
      <SidebarHeader className="h-16 border-b px-4 flex flex-row items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
        <AppLogo
          name={brand?.name}
          description={brand?.description}
          imageSrc={brand?.imageSrc}
        />
      </SidebarHeader>

      <SidebarContent>
        {resolvedGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = isItemActive(item.href)

                  return (
                    <SidebarMenuItem key={`${item.title}-${item.href}`}>
                      <SidebarMenuButton
                        render={
                          <Link href={item.href} className="flex items-center gap-3">
                            <Icon className="size-4 shrink-0" />
                            <span className="truncate group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                            {item.badge !== undefined && (
                              <Badge
                                variant={active ? "default" : "secondary"}
                                className="ml-auto text-[10px] px-1.5 py-0 h-4 min-w-4 justify-center group-data-[collapsible=icon]:hidden font-medium"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        }
                        isActive={active}
                        tooltip={item.title}
                        className={cn(
                          "transition-colors",
                          active && "font-medium"
                        )}
                      />
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {footerContent && (
        <SidebarFooter className="border-t p-4 group-data-[collapsible=icon]:p-2">
          {footerContent}
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  )
}
