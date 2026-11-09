import { Suspense } from "react"
import type { Metadata } from "next"

import { PlaceholderClient } from "./placeholder-client"

export const metadata: Metadata = {
  title: "Placeholder Menu",
  description: "Use this page as a starting point to scaffold new administrative sections.",
}

export default function PlaceholderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PlaceholderClient />
    </Suspense>
  )
}
