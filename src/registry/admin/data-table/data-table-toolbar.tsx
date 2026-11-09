"use client"

import type { ReactNode } from "react"
import type { Column, Table } from "@tanstack/react-table"
import { SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  toolbarActions?: ReactNode
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Filter items...",
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const filterColumn = searchKey ? table.getColumn(searchKey) : null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 items-center gap-2">
        {filterColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={(filterColumn.getFilterValue() as string) ?? ""}
            onChange={(event) => filterColumn.setFilterValue(event.target.value)}
            className="h-8 w-full sm:w-[250px] lg:w-[320px] text-xs"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2.5 lg:px-3 text-xs"
          >
            Reset
            <X className="ml-1.5 size-3.5" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {toolbarActions}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex gap-1.5 text-xs"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>View</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column: Column<TData, unknown>) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column: Column<TData, unknown>) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-xs"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
