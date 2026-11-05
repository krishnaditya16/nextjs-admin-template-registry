"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut, Settings, User as UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface UserNavProps {
  user?: {
    name: string
    email: string
    avatarUrl?: string
    role?: "ADMIN" | "USER" | string
  }
  onLogout?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ")
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function UserNav({
  user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "ADMIN",
  },
  onLogout,
  onProfileClick,
  onSettingsClick,
}: UserNavProps) {
  const router = useRouter()
  const initials = getInitials(user.name || "Admin")
  const isAdmin = user.role === "ADMIN"

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    } else {
      router.push("/settings?tab=profile")
    }
  }

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick()
    } else {
      router.push("/settings?tab=account")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="relative size-9 rounded-full ring-offset-background transition-colors hover:bg-accent"
          >
            <Avatar className="size-9">
              {user.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              )}
              <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1.5 p-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                {user.role && (
                  <Badge
                    variant={isAdmin ? "default" : "secondary"}
                    className="text-[10px] font-medium uppercase px-1.5 py-0 h-4"
                  >
                    {user.role}
                  </Badge>
                )}
              </div>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleProfileClick}
            className="text-xs cursor-pointer"
          >
            <UserIcon className="mr-2 size-3.5 text-muted-foreground" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSettingsClick}
            className="text-xs cursor-pointer"
          >
            <Settings className="mr-2 size-3.5 text-muted-foreground" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-xs cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 size-3.5" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
