import { PRICE_ID_TO_PLAN } from "@/lib/constants/subscription-plan"
import { z } from "zod"

export const createSubscriptionSchema = z.object({
  workspaceId: z.string().cuid2(),
  redirectEndpoint: z.string().max(10).optional(),
  stripePriceId: z.enum(Object.keys(PRICE_ID_TO_PLAN) as [string, ...string[]]),
})

export const createCustomerPortalSchema = z.object({
  customerId: z.string().min(1).max(20),
  redirectEndpoint: z.string().max(40),
})
