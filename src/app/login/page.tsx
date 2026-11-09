import { Suspense } from "react"
import type { Metadata } from "next"

import { LoginClient } from "./login-client"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Authenticate to access administrative features.",
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginClient />
    </Suspense>
  )
}
