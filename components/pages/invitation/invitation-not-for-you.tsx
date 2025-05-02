"use client"

import { ErrorComponent } from "@/components/shared/error-component"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/authentication/auth-client"
import { createRoute } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export function InvitationNotForYou({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSignOut = () => {
    startTransition(async () => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(createRoute("sign-in"))
          },
          onError: (context) => {
            toast.error(context.error.message)
          },
        },
      })
    })
  }

  return (
    <ErrorComponent>
      <ErrorComponent.Icon
        Icon={TriangleAlert}
        className="size-12 text-yellow-400"
      />
      <ErrorComponent.Title>
        This invitation is not for you
      </ErrorComponent.Title>
      <ErrorComponent.Message>
        It seems like you are already logged in: <br />
        {email} Please sign out to continue.
      </ErrorComponent.Message>
      <Button size="lg" onClick={handleSignOut} loading={isPending}>
        Sign out
      </Button>
    </ErrorComponent>
  )
}
