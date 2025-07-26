import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
    NEXT_PUBLIC_CLOUDFRONT_URL: z
      .string()
      .default("d3rvavyycy1it6.cloudfront.net"),

    NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID: z.string({
      required_error:
        "NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID is required in environment variables",
    }),

    NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID: z.string({
      required_error:
        "NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID is required in environment variables",
    }),

    NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID: z.string({
      required_error:
        "NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID is required in environment variables",
    }),

    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: z.string({
      required_error:
        "NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID is required in environment variables",
    }),

    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: z.string({
      required_error:
        "NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID is required in environment variables",
    }),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
    NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_FREE_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
  },
})
