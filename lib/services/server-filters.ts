import { PLAN_LIMITS } from "@/lib/constants/subscription-limits"
import type { PlanType } from "@/types/authentication/server-types"

export class ServerFilters {
  constructor() {}

  static getPlanLimits(plan: PlanType) {
    return PLAN_LIMITS[plan] ?? PLAN_LIMITS["free"]
  }
}
