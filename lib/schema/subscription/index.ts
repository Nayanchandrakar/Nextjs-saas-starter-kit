import { PRICE_ID_TO_PLAN } from "@/lib/constants/subscription-plan"
import { z } from "zod"

export const createSubscriptionSchema = z.object({
  stripePriceId: z.enum(Object.keys(PRICE_ID_TO_PLAN) as [string, ...string[]]),
  workspaceId: z.string().cuid2(),
  redirectEndpoint: z.string().max(10).optional(),
})
