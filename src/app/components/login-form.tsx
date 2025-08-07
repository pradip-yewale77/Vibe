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

type LoginFormProps = React.ComponentProps<"div">;

export function LoginForm({ className, ...props }: LoginFormProps) {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  const signInWithProvider = (provider: "google" | "github") => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}`,
        queryParams: {
          response_type: "code",
        },
      },
    }).catch((err) => {
      console.error(`Error signing in with ${provider}:`, err.message)
    })
  }

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

