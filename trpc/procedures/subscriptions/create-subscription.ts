import { SubscriptionDBService } from "@/database/services/subscription-service"
import { createSubscriptionSchema } from "@/lib/schema/subscription"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import { SubscriptionController } from "@/trpc/controller/subscription-controller"
import { protectedProcedure } from "@/trpc/procedures/root"

export const createSubscription = protectedProcedure
  .input(createSubscriptionSchema)
  .mutation(async ({ ctx, input }) => {
    const user = ctx.user
    const workspaceId = await SubscriptionController.validateWorkspace(
      input.workspaceId,
    )
    const returnUrl = StringService.createAbsoluteUrl(
      input.redirectEndpoint ?? "/pricing",
    )
    const { customerId, priceId, currentPeriodEnd } =
      await SubscriptionDBService.getWorkspaceSubscription(workspaceId)

    let redirectUrl: string

    if (
      priceId &&
      DateService.isSubscriptionExpired(currentPeriodEnd) &&
      customerId &&
      !input.stripePriceId
    ) {
      redirectUrl = await SubscriptionController.createBillingSession(
        customerId,
        returnUrl,
      )
    } else {
      redirectUrl = await SubscriptionController.createCheckoutSession(
        input.stripePriceId,
        returnUrl,
        user.id,
        user.email,
        workspaceId,
      )
    }
    return { redirectUrl }
  })
