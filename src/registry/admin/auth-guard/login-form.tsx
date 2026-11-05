"use client"

import * as React from "react"
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

export interface LoginFormProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit"> {
  onSubmit?: (data: { email: string; password: string }) => Promise<void> | void
  error?: string
  title?: string
  description?: string
  isLoading?: boolean
  registerHref?: string
  forgotPasswordHref?: string
}

export function LoginForm({
  className,
  onSubmit,
  error: controlledError,
  title = "Login",
  description = "Enter your email below to login to your account",
  isLoading: controlledLoading = false,
  registerHref = "/register",
  forgotPasswordHref,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [internalLoading, setInternalLoading] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)

  const loading = controlledLoading || internalLoading
  const activeError = controlledError ?? localError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError("Please enter both email and password.")
      return
    }

    if (onSubmit) {
      try {
        setInternalLoading(true)
        await onSubmit({ email, password })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setLocalError(err.message)
        } else {
          setLocalError("Failed to sign in. Please check your credentials.")
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {forgotPasswordHref ? (
                    <Link
                      href={forgotPasswordHref}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
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
                Login with Google
              </Button>
            </div>
            {registerHref && (
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={registerHref} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
