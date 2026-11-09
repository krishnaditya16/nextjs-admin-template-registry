"use client"

import { useState, type ComponentPropsWithoutRef, type FormEvent } from "react"
import Link from "next/link"

import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface RegisterFormProps extends Omit<ComponentPropsWithoutRef<"div">, "onSubmit"> {
  onSubmit?: (data: { name: string; email: string; password: string }) => Promise<void> | void
  error?: string
  title?: string
  description?: string
  isLoading?: boolean
  loginHref?: string
}

export function RegisterForm({
  className,
  onSubmit,
  error: controlledError,
  title = "Create an account",
  description = "Enter your information below to create your account",
  isLoading: controlledLoading = false,
  loginHref = "/login",
  ...props
}: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [internalLoading, setInternalLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const loading = controlledLoading || internalLoading
  const activeError = controlledError ?? localError

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!name.trim()) {
      setLocalError("Please enter your full name.")
      return
    }

    if (!email || !email.includes("@")) {
      setLocalError("Please enter a valid email address.")
      return
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.")
      return
    }

    if (onSubmit) {
      try {
        setInternalLoading(true)
        await onSubmit({ name, email, password })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setLocalError(err.message)
        } else {
          setLocalError("Registration failed. Please try again.")
        }
      } finally {
        setInternalLoading(false)
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {activeError && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                  {activeError}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                disabled={loading}
              >
                <svg className="mr-2 size-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>
            </div>
            {loginHref && (
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href={loginHref} className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
