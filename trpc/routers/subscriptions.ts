import { createTRPCRouter } from "@/trpc/init"
import { createSubscription } from "@/trpc/procedures/subscriptions/create-subscription"

export const subscriptionsRouter = createTRPCRouter({
  createSubscription,
})
