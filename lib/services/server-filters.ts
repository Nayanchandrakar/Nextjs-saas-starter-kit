import { PLAN_LIMITS } from "@/lib/constants/subscription-limits"

export class ServerFilters {
  constructor() {}

  static getSubscriptionPlan(priceId: string) {
    const plan = Object.values(PLAN_LIMITS).find(
      (plan) => plan.priceIds && Object.values(plan.priceIds).includes(priceId),
    )

    return plan ?? PLAN_LIMITS.FREE
  }
}
