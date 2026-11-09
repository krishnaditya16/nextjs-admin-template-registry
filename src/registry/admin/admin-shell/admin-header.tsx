"use client"

import { Fragment, type HTMLAttributes, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface AdminBreadcrumbItem {
  label: string
  href?: string
}

export interface AdminHeaderProps extends HTMLAttributes<HTMLElement> {
  breadcrumbs?: AdminBreadcrumbItem[]
  actions?: ReactNode
  userNav?: ReactNode
  notificationsCount?: number
  onNotificationsClick?: () => void
  showThemeToggle?: boolean
}

function generateDefaultBreadcrumbs(pathname: string): AdminBreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0 || (segments.length === 1 && segments[0] === "admin")) {
    return [{ label: "Dashboard", href: "/admin" }]
  }

  const items: AdminBreadcrumbItem[] = [{ label: "Dashboard", href: "/admin" }]
  let accumulatedPath = ""

  segments.forEach((seg, idx) => {
    accumulatedPath += `/${seg}`
    if (seg === "admin") return // Skip 'admin' prefix as root dashboard already represents /admin
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ")
    const isLast = idx === segments.length - 1
    items.push({
      label,
      href: isLast ? undefined : accumulatedPath,
    })
  })

  return items
}

export function AdminHeader({
  breadcrumbs,
  actions,
  userNav,
  notificationsCount = 2,
  onNotificationsClick,
  showThemeToggle = true,
  className,
  children,
  ...props
}: AdminHeaderProps) {
  const pathname = usePathname()
  const activeBreadcrumbs = breadcrumbs ?? generateDefaultBreadcrumbs(pathname || "/")

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6 transition-all",
        className
      )}
      {...props}
    >
      {/* Left: Sidebar trigger & clean breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            {activeBreadcrumbs.map((crumb, idx) => {
              const isLast = idx === activeBreadcrumbs.length - 1
              return (
                <Fragment key={`${crumb.label}-${idx}`}>
                  <BreadcrumbItem>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage>
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink render={<Link href={crumb.href}>{crumb.label}</Link>} />
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Actions, theme toggle, notifications, and userNav */}
      <div className="flex items-center gap-2">
        {actions}
        {children}

        {showThemeToggle && <ThemeToggle />}

        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 text-muted-foreground hover:text-foreground"
          onClick={onNotificationsClick}
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {notificationsCount > 0 && (
            <span className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-background" />
          )}
        </Button>

        {userNav}
      </div>
    </header>
  )
}
