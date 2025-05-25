import { createCustomerPortalSchema } from "@/lib/schema/subscription"
import { StringService } from "@/lib/services/string-service"
import { stripe } from "@/lib/stripe"
import { protectedProcedure } from "@/trpc/procedures/root"

export const createCustomerPortal = protectedProcedure
  .input(createCustomerPortalSchema)
  .mutation(async ({ input }) => {
    const billingSession = await stripe.billingPortal.sessions.create({
      customer: input.customerId,
      return_url: StringService.createAbsoluteUrl(input.redirectEndpoint),
    })

    return { redirectUrl: billingSession.url }
  })
