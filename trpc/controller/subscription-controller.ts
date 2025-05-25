import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { PRICE_ID_TO_PLAN } from "@/lib/constants/subscription-plan"
import { stripe } from "@/lib/stripe"
import { TRPCError } from "@trpc/server"

export class SubscriptionController {
  static async validateWorkspace(workspaceId: string) {
    const workspace =
      await WorkSpaceDatabaseService.getWorkspaceById(workspaceId)
    if (!workspace?.id) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Workspace with ID ${workspaceId} not found`,
      })
    }
    return workspace.id
  }

  static async createBillingSession(customerId: string, returnUrl: string) {
    const billingSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    if (!billingSession.url) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create billing session",
      })
    }

    return billingSession.url
  }

  static async createCheckoutSession(
    priceId: string,
    returnUrl: string,
    userId: string,
    customerEmail: string,
    workspaceId: string,
  ) {
    const plan = PRICE_ID_TO_PLAN[priceId]?.plan
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: returnUrl,
      cancel_url: returnUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, workspaceId, plan },
    })

    if (!checkoutSession.url) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create checkout session",
      })
    }

    return checkoutSession.url
  }
}
