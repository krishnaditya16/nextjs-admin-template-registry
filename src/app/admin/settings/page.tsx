"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Bell, KeyRound, Loader2, Save, Shield, User } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Admin Shell
import { AppSidebar } from "@/components/admin/admin-shell/app-sidebar"
import { AdminHeader } from "@/components/admin/admin-shell/admin-header"
import { PageHeader } from "@/components/admin/admin-shell/page-header"
import { UserNav } from "@/components/admin/auth-guard/user-nav"

function SettingsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const validTab =
    tabParam && ["profile", "account", "notifications"].includes(tabParam)
      ? tabParam
      : undefined

  const [activeTab, setActiveTab] = React.useState("profile")
  const currentTab = validTab || activeTab

  // Profile Form State
  const [name, setName] = React.useState("Alex Morgan")
  const [email, setEmail] = React.useState("alex.morgan@example.com")
  const [role] = React.useState("ADMIN")
  const [bio, setBio] = React.useState(
    "Senior Fullstack Instructor & Design Systems Architect building custom shadcn/ui components."
  )
  const [isSavingProfile, setIsSavingProfile] = React.useState(false)

  // Security Form State
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false)

  // Notification Preferences
  const [emailAlerts, setEmailAlerts] = React.useState(true)
  const [stockAlerts, setStockAlerts] = React.useState(true)
  const [securityEmails, setSecurityEmails] = React.useState(true)
  const [isSavingNotifications, setIsSavingNotifications] = React.useState(false)

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSavingProfile(false)
    toast.success("Profile updated successfully!")
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.")
      return
    }

    setIsUpdatingPassword(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsUpdatingPassword(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    toast.success("Security credentials updated!")
  }

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setIsSavingNotifications(false)
    toast.success("Notification preferences saved!")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Settings" },
          ]}
          userNav={<UserNav onLogout={() => router.push("/login")} />}
        />

        <main className="flex-1 p-4 md:p-6 space-y-6 max-w-5xl">
          <PageHeader
            title="Settings"
            description="Manage your profile information, security credentials, and system preferences."
          />

          <Tabs
            value={currentTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md h-9 p-1">
              <TabsTrigger value="profile" className="gap-1.5 text-xs font-medium">
                <User className="size-3.5" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="gap-1.5 text-xs font-medium">
                <Shield className="size-3.5" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1.5 text-xs font-medium">
                <Bell className="size-3.5" />
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: Profile Information */}
            <TabsContent value="profile" className="space-y-6 outline-hidden">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    Public information visible to team administrators and students.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    {/* Avatar row */}
                    <div className="flex items-center gap-4">
                      <Avatar className="size-16">
                        <AvatarImage src="" alt={name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          AM
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{email}</span>
                          <Badge variant="outline" className="text-[10px] uppercase h-4 px-1.5 py-0">
                            {role}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="settings-name">Full Name</Label>
                        <Input
                          id="settings-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="settings-email">Email Address</Label>
                        <Input
                          id="settings-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="settings-bio">Biography</Label>
                      <textarea
                        id="settings-bio"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSavingProfile}
                      className="gap-1.5"
                    >
                      {isSavingProfile ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Save className="size-3.5" />
                      )}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: Security & Credentials */}
            <TabsContent value="account" className="space-y-6 outline-hidden">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Ensure your account is using a strong password with at least 8 characters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                      <Input
                        id="confirm-new-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isUpdatingPassword}
                      className="gap-1.5 mt-2"
                    >
                      {isUpdatingPassword ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <KeyRound className="size-3.5" />
                      )}
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your administrator account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-foreground">
                      Authenticator App (TOTP)
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Use apps like Google Authenticator or 1Password.
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-300">
                    Active
                  </Badge>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: Notifications */}
            <TabsContent value="notifications" className="space-y-6 outline-hidden">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure what email alerts you receive for store and security events.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="stock-alerts" className="text-sm font-medium text-foreground cursor-pointer">
                        Inventory Threshold Alerts
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        Receive instant warnings when products hit low stock or sell out.
                      </div>
                    </div>
                    <Checkbox
                      id="stock-alerts"
                      checked={stockAlerts}
                      onCheckedChange={(checked) => setStockAlerts(Boolean(checked))}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts" className="text-sm font-medium text-foreground cursor-pointer">
                        Order & Revenue Summaries
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        Daily digest of completed purchases and gross revenue.
                      </div>
                    </div>
                    <Checkbox
                      id="email-alerts"
                      checked={emailAlerts}
                      onCheckedChange={(checked) => setEmailAlerts(Boolean(checked))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-emails" className="text-sm font-medium text-foreground cursor-pointer">
                        Security Alerts
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        Notify upon logins from unrecognized IP addresses or devices.
                      </div>
                    </div>
                    <Checkbox
                      id="security-emails"
                      checked={securityEmails}
                      onCheckedChange={(checked) => setSecurityEmails(Boolean(checked))}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    onClick={handleSaveNotifications}
                    disabled={isSavingNotifications}
                    className="gap-1.5"
                  >
                    {isSavingNotifications ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Save className="size-3.5" />
                    )}
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function SettingsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SettingsContent />
    </React.Suspense>
  )
}
