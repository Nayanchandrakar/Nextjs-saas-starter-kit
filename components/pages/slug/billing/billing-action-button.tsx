"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useOpenCustomerPortal } from "@/hooks/trpc/subscriptions"
import { createRoute } from "@/lib/utils"
import Link from "next/link"

interface BillingActionButtonProps {
  isPaid: boolean
  customerId: string
  slug: string
}

export function BillingActionButton({
  customerId,
  isPaid,
  slug,
}: BillingActionButtonProps) {
  const { isPending, mutateAsync } = useOpenCustomerPortal()

  const handleCustomerPortal = () => {
    mutateAsync({
      customerId,
      redirectEndpoint: createRoute(`${slug}/billing`),
    })
  }

  if (isPaid) {
    return (
      <Button loading={isPending} onClick={handleCustomerPortal}>
        Manage Subscription
      </Button>
    )
  }

  return (
    <Link href="?upgrade=true" className={buttonVariants()}>
      Upgrade plan
    </Link>
  )
}
