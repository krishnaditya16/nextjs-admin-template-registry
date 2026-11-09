import { Suspense } from "react"
import type { Metadata } from "next"

import { SettingsClient } from "./settings-client"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile information, security credentials, and system preferences.",
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SettingsClient />
    </Suspense>
  )
}
