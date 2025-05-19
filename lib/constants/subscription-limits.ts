import { serverEnv } from "@/lib/utilities/server-env"

const {
  STRIPE_FREE_MONTHLY_PLAN_ID,
  STRIPE_PRO_MONTHLY_PLAN_ID,
  STRIPE_STARTER_MONTHLY_PLAN_ID,
  STRIPE_PRO_YEARLY_PLAN_ID,
  STRIPE_STARTER_YEARLY_PLAN_ID,
} = serverEnv

export const PLAN_LIMITS = {
  FREE: {
    members: 2,
    workspace: 6,
    priceIds: {
      monthly: STRIPE_FREE_MONTHLY_PLAN_ID,
      yearly: STRIPE_FREE_MONTHLY_PLAN_ID,
    },
  },

  PRO: {
    members: 2,
    workspace: 8,
    priceIds: {
      monthly: STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },

  STARTER: {
    members: 4,
    workspace: 10,
    priceIds: {
      monthly: STRIPE_STARTER_MONTHLY_PLAN_ID,
      yearly: STRIPE_STARTER_YEARLY_PLAN_ID,
    },
  },
} as const
