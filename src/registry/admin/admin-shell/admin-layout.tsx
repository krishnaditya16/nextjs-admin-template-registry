import type { ReactNode } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"

export interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider className="font-sans antialiased">
      <AppSidebar />
      <SidebarInset className="font-sans">
        <AdminHeader />
        <main className="flex-1 p-6 space-y-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AdminLayout }
