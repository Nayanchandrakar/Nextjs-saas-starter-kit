import { serverEnv } from "@/lib/utilities/server-env"

type PricePlan = { readonly monthly: string; readonly yearly?: string }
type PriceIds = { readonly [key: string]: PricePlan }

const {
  STRIPE_FREE_MONTHLY_PLAN_ID,
  STRIPE_PRO_MONTHLY_PLAN_ID,
  STRIPE_STARTER_MONTHLY_PLAN_ID,
  STRIPE_PRO_YEARLY_PLAN_ID,
  STRIPE_STARTER_YEARLY_PLAN_ID,
} = serverEnv

export const PRICE_IDS: PriceIds = {
  free: {
    monthly: STRIPE_FREE_MONTHLY_PLAN_ID,
  },

  starter: {
    monthly: STRIPE_STARTER_MONTHLY_PLAN_ID,
    yearly: STRIPE_STARTER_YEARLY_PLAN_ID,
  },

  pro: {
    monthly: STRIPE_PRO_MONTHLY_PLAN_ID,
    yearly: STRIPE_PRO_YEARLY_PLAN_ID,
  },
} as const

export const PLAN_LIMITS = {
  free: { maxWorkspaces: 6, maxMembers: 3 },
  starter: { maxWorkspaces: 8, maxMembers: 3 },
  pro: { maxWorkspaces: 10, maxMembers: 5 },
} as const
