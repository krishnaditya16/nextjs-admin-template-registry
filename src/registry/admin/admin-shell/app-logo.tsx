"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

// ============================================================================
// Brand Logo Configuration
// Update this path to change the logo across your entire admin application.
// Place your logo file in /public (e.g. /public/logo.svg, /public/brand.png).
// ============================================================================
export const DEFAULT_LOGO_IMAGE = "/logo.svg"
export const DEFAULT_BRAND_NAME = "Admin Portal"
export const DEFAULT_BRAND_DESCRIPTION = "Design System Registry"

export interface AppLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string
  name?: string
  description?: string
  href?: string | null
  collapsed?: boolean
  size?: "sm" | "default" | "lg"
}

export function AppLogo({
  imageSrc = DEFAULT_LOGO_IMAGE,
  name = DEFAULT_BRAND_NAME,
  description = DEFAULT_BRAND_DESCRIPTION,
  href = "/",
  collapsed = false,
  size = "default",
  className,
  ...props
}: AppLogoProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 select-none transition-all",
        collapsed && "justify-center",
        className
      )}
      {...props}
    >
      {/* Brand Logo Image (Maintained in this component) */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-lg overflow-hidden transition-transform",
          size === "sm" && "size-7 rounded-md",
          size === "default" && "size-9",
          size === "lg" && "size-10"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={name}
          className="size-full object-contain"
          loading="eager"
        />
      </div>

      {/* Brand Text Header */}
      {!collapsed && (
        <div className="flex flex-col overflow-hidden text-left leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate text-sm font-medium tracking-tight text-foreground">
            {name}
          </span>
          {description && (
            <span className="truncate text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      >
        {content}
      </Link>
    )
  }

  return content
}
