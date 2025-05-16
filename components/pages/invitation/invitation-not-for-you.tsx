"use client"

import { ErrorComponent } from "@/components/shared/error-component"
import { Button } from "@/components/ui/button"
import { useSignOut } from "@/hooks/client/use-sign-out"
import { TriangleAlert } from "lucide-react"

export function InvitationNotForYou({ email }: { email: string }) {
  const { isPending, onSignOut } = useSignOut({})

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
      <Button size="lg" onClick={onSignOut} loading={isPending}>
        Sign out
      </Button>
    </ErrorComponent>
  )
}
