"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function BillingActionButton() {
  const router = useRouter()

  const handleOnClick = () => {
    router.push("?upgrade=true")
  }

  return <Button onClick={handleOnClick}>Upgrade plan</Button>
}
