import { Suspense } from "react"
import type { Metadata } from "next"

import { RegisterClient } from "./register-client"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Sign up for a new administrative account.",
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <RegisterClient />
    </Suspense>
  )
}
