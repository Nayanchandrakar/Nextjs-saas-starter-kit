import { dbServerless } from "@/database"
import { subscriptions } from "@/database/schema"
import { PRICE_ID_TO_PLAN } from "@/lib/constants/subscription-plan"
import { DateService } from "@/lib/services/date-service"
import { stripe } from "@/lib/stripe"
import { serverEnv } from "@/lib/utilities/server-env"
import { eq } from "drizzle-orm"
import type { Stripe } from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("Stripe-Signature") ?? ""

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      serverEnv.STRIPE_WEBHOOK,
    )
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown webhook error"}`,
      { status: 400 },
    )
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object)
      break
    case "invoice.payment_succeeded":
      await handleInvoicePaymentSucceeded(event.data.object)
      break
  }

  return new Response(null, { status: 200 })
}

/**
 * Processes a completed checkout session event from Stripe.
 * Updates the subscription details in the database.
 * @param session - The Stripe Checkout Session object.
 * @returns A Promise that resolves when the database update is complete.
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  )

  const currentPeriodEnd = DateService.getStripeCurrentPeriodEnd(
    subscription.current_period_end,
  )
  const customerId = subscription.customer as string
  const subscriptionItem = subscription.items.data[0]
  const priceId = subscriptionItem.price.id

  await dbServerless.transaction(async (tx) => {
    await tx
      .update(subscriptions)
      .set({
        status: subscription.status,
        plan: PRICE_ID_TO_PLAN[priceId].plan,
        subscriptionId: subscription.id,
        currentPeriodEnd,
        customerId,
        priceId,
      })
      .where(
        eq(subscriptions.workspaceId, session.metadata?.workspaceId as string),
      )
  })
}

/**
 * Processes a successful invoice payment event from Stripe.
 * Skips processing for subscription creation invoices and updates subscription details in the database.
 * @param invoice - The Stripe Invoice object.
 * @returns A Promise that resolves when the database update is complete or if the invoice is skipped.
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (invoice.billing_reason === "subscription_create") return

  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string,
  )
  const currentPeriodEnd = DateService.getStripeCurrentPeriodEnd(
    subscription.current_period_end,
  )
  const subscriptionItem = subscription.items.data[0]
  const priceId = subscriptionItem.price.id

  await dbServerless.transaction(async (tx) => {
    await tx
      .update(subscriptions)
      .set({
        plan: PRICE_ID_TO_PLAN[priceId].plan,
        status: subscription.status,
        currentPeriodEnd,
        priceId,
      })
      .where(eq(subscriptions.subscriptionId, subscription.id))
  })
}
