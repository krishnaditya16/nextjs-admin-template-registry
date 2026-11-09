import type { HTMLAttributes } from "react"
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("@container/card relative", className)} {...props}>
      <CardHeader className="relative space-y-1 pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            {title}
          </CardDescription>
          {Icon && (
            <div className="flex size-7 items-center justify-center rounded-md text-muted-foreground">
              <Icon className="size-4" />
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>
      {(description || trend) && (
        <CardContent className="pt-0 text-xs">
          <div className="flex items-center gap-1.5">
            {trend && (
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-normal border-transparent bg-muted/60",
                  trend.positive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {trend.positive ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {trend.value}
              </Badge>
            )}
            {description && (
              <span className="text-muted-foreground truncate">{description}</span>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
