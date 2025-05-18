import { serverEnv } from "@/lib/utilities/server-env"

export const SUBSCRIPTION_PLANS = [
  {
    type: "free",
    name: "Free",
    price: {
      monthly: {
        amount: 0,
        priceIds: {
          test: "",
          production: serverEnv.STRIPE_FREE_MONTHLY_PLAN_ID,
        },
      },
    },
  },
  {
    type: "starter",
    name: "Starter",
    price: {
      monthly: {
        amount: 20,
        priceIds: {
          test: "",
          production: serverEnv.STRIPE_STARTER_MONTHLY_PLAN_ID,
        },
      },
      yearly: {
        amount: 200,
        priceIds: {
          test: "",
          production: serverEnv.STRIPE_STARTER_YEARLY_PLAN_ID,
        },
      },
    },
  },
  {
    type: "pro",
    name: "Pro",
    price: {
      monthly: {
        amount: 40,
        priceIds: {
          test: "",
          production: serverEnv.STRIPE_PRO_MONTHLY_PLAN_ID,
        },
      },
      yearly: {
        amount: 400,
        priceIds: {
          test: "",
          production: serverEnv.STRIPE_PRO_YEARLY_PLAN_ID,
        },
      },
    },
  },
]
