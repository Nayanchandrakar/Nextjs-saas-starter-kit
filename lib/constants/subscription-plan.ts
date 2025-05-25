import { clientEnv } from "@/lib/utilities/client-env"

export const COMMON_BENEFITS = ["Better capacity", "More functionality"]

export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Free",
    type: "free",
    description: "Basic access with limited features",
    features: ["Basic analytics", "1 user", "100 API calls/month"],
    billing: {
      month: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID,
        price: 0.0,
      },
      year: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID,
        price: 0.0,
      },
    },
  },

  starter: {
    name: "Starter",
    type: "starter",
    description: "For small teams with growing needs",
    features: ["Advanced analytics", "5 users", "1000 API calls/month"],
    billing: {
      month: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
        price: 9.99,
      },
      year: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
        price: 99.99,
      },
    },
  },

  pro: {
    name: "Pro",
    type: "pro",
    description: "For businesses with advanced requirements",
    features: ["Full analytics", "Unlimited users", "10000 API calls/month"],
    billing: {
      month: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
        price: 19.99,
      },
      year: {
        priceId: clientEnv.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
        price: 199.99,
      },
    },
  },
}

export const PRICE_ID_TO_PLAN = {
  [clientEnv.NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID]: {
    plan: "free",
    interval: "month",
  },
  [clientEnv.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID]: {
    plan: "starter",
    interval: "month",
  },
  [clientEnv.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID]: {
    plan: "starter",
    interval: "year",
  },
  [clientEnv.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID]: {
    plan: "pro",
    interval: "year",
  },
  [clientEnv.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID]: {
    plan: "pro",
    interval: "year",
  },
} as const
