"use client"

import { Button } from "@/components/ui/button"
import { useSignOut } from "@/hooks/client/use-sign-out"
import { LogOut } from "lucide-react"

export function ProfileSignOut() {
  const { isPending, onSignOut } = useSignOut({})

  return (
    <Button onClick={onSignOut} disabled={isPending} variant="outline">
      <LogOut className="size-4 " aria-hidden="true" />
      Sign Out
    </Button>
  )
}
