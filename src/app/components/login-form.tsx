'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"
import { useEffect } from "react"

interface LoginFormProps extends React.ComponentProps<"div"> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  useEffect(() => {
  if (typeof window !== "undefined" && window.location.hash) {
    const cleanUrl = new URL(window.location.href)
    cleanUrl.hash = ""
    window.history.replaceState(null, "", cleanUrl.toString())
  }
}, [])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Choose a provider to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full cursor-pointer"
              onClick={() => signInWithProvider("google")}
            >
              Continue with Google
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => signInWithProvider("github")}
            >
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function signInWithProvider(provider: "google" | "github") {
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}`, // Or any route like `${location.origin}/dashboard`
      queryParams: {
        response_type: "code", // Enable PKCE flow to avoid token in URL
      },
    },
  }).catch((err) => {
    console.error(`Error signing in with ${provider}:`, err.message)
  })
}

