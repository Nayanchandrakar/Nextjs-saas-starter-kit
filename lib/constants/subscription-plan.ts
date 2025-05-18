import { serverEnv } from "@/lib/utilities/server-env"

export const SUBSCRIPTION_PLANS = [
  {
    type: "starter",
    name: "Starter",
    description: "Perfect for personal projects",
    price: {
      amount: 4.99,
      priceIds: {
        test: "price_1MKSNHLkdIwHu7ixo7ItY8QY",
        production: serverEnv.STRIPE_STARTER_PRICE_ID,
      },
    },
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "48-hour support",
      "2 team members",
    ],
  },
  {
    type: "pro",
    name: "Pro",
    description: "For teams and professional projects",
    price: {
      amount: 9.99,
      priceIds: {
        test: "price_1MKSNCLkdIwHu7ix9zVZWq1p",
        production: serverEnv.STRIPE_PRO_PRICE_ID,
      },
    },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support",
      "Unlimited team members",
      "Custom domain",
      "API access",
    ],
  },
]
