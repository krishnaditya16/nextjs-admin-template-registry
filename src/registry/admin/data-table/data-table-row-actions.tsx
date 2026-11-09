"use client"

import type { ReactNode } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface DataTableRowActionsProps {
  onEdit?: () => void
  onDelete?: () => void
  children?: ReactNode
}

export function DataTableRowActions({
  onEdit,
  onDelete,
  children,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-[160px]">
        {onEdit && (
          <DropdownMenuItem onClick={onEdit} className="text-xs cursor-pointer">
            <Pencil className="mr-2 size-3.5 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
        )}
        {children}
        {onDelete && (
          <>
            {onEdit && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={onDelete}
              className="text-xs cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Trash2 className="mr-2 size-3.5" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
