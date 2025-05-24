import { dbServerless } from "@/database"
import { subscriptions } from "@/database/schema"
import { stripe } from "@/lib/stripe"
import { serverEnv } from "@/lib/utilities/server-env"
import type { PlanType, StatusType } from "@/types/authentication/server-types"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("Stripe-Signature") as string

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    serverEnv.STRIPE_WEBHOOK,
  )

  switch (event.type) {
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription
      const metadata = subscription.metadata

      await dbServerless.transaction(async (tx) => {
        await tx.update(subscriptions).set({
          workspaceId: metadata.workspaceId,
          plan: metadata.plan as PlanType,
          status: subscription.status as StatusType,
          subscriptionId: subscription.id,
          priceId: subscription.items.data[0].price.id,
        })
      })
      break
    }

    case "invoice.payment_succeeded": {
      break
    }
  }

  return new Response(null, { status: 200 })
}
