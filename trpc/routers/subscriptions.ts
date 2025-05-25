import { createTRPCRouter } from "@/trpc/init"
import { createSubscription } from "@/trpc/procedures/subscriptions/create-subscription"
import { createCustomerPortal } from "@/trpc/procedures/subscriptions/customer-portal"

export const subscriptionsRouter = createTRPCRouter({
  createSubscription,
  createCustomerPortal,
})
