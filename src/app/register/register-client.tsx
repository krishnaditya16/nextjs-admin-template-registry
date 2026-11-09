"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { RegisterForm } from "@/components/admin/auth-guard/register-form"

export function RegisterClient() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true)
    setError(undefined)

    // Simulate account registration
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!data.name.trim()) {
      setError("Please provide your full name.")
      setIsLoading(false)
      return
    }

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

    toast.success(`Account created for ${data.name}! Welcome to Admin Portal.`)
    router.push("/admin")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleRegister}
          loginHref="/login"
        />
      </div>
    </div>
  )
}
