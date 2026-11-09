import { Suspense } from "react"
import type { Metadata } from "next"

import { DashboardClient } from "./dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of business performance, catalog health, and recent store activity.",
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardClient />
    </Suspense>
  )
}
