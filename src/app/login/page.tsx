"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { LoginForm } from "@/components/admin/auth-guard/login-form"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError(undefined)

    // Simulate authentication check
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!data.email.includes("@")) {
      setError("Please provide a valid email address.")
      setIsLoading(false)
      return
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.")
      setIsLoading(false)
      return
    }

    toast.success("Welcome back!")
    router.push("/admin")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleLogin}
          registerHref="/register"
        />
      </div>
    </div>
  )
}
