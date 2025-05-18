import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    DATABASE_URL: z.string({
      required_error: "DATABASE_URL is required in environment variables",
    }),

    NODEMAILER_PASS: z.string({
      required_error: "NODEMAILER_PASS is required in environment variables",
    }),

    NODEMAILER_USER: z.string().email({
      message: "NODEMAILER_USER is required and must be a valid email",
    }),

    GOOGLE_CLIENT_ID: z.string({
      required_error: "GOOGLE_CLIENT_ID is required in environment variables",
    }),

    GOOGLE_CLIENT_SECRET: z.string({
      required_error:
        "GOOGLE_CLIENT_SECRET is required in environment variables",
    }),

    GITHUB_CLIENT_ID: z.string({
      required_error: "GITHUB_CLIENT_ID is required in environment variables",
    }),

    GITHUB_CLIENT_SECRET: z.string({
      required_error:
        "GITHUB_CLIENT_SECRET is required in environment variables",
    }),

    BETTER_AUTH_URL: z.string().default("http://localhost:3000"),

    BETTER_AUTH_SECRET: z.string({
      required_error: "BETTER_AUTH_SECRET is required in environment variables",
    }),

    AWS_ACCESS_KEY_ID: z.string({
      required_error: "AWS_ACCESS_KEY_ID is required in environment variables",
    }),

    AWS_SECRET_ACCESS_KEY: z.string({
      required_error:
        "AWS_SECRET_ACCESS_KEY is required in environment variables",
    }),

    AWS_REGION: z.string({
      required_error: "AWS_REGION is required in environment variables",
    }),

    S3_UPLOAD_BUCKET: z.string({
      required_error: "S3_UPLOAD_BUCKET is required in environment variables",
    }),

    UPSTASH_REDIS_REST_URL: z.string({
      required_error:
        "UPSTASH_REDIS_REST_URL is required in environment variables",
    }),

    UPSTASH_REDIS_REST_TOKEN: z.string({
      required_error:
        "UPSTASH_REDIS_REST_TOKEN is required in environment variables",
    }),

    STRIPE_SECRET_KEY: z.string({
      required_error: "STRIPE_SECRET_KEY is required in environment variables",
    }),

    STRIPE_WEBHOOK: z.string({
      required_error: "STRIPE_WEBHOOK is required in environment variables",
    }),

    STRIPE_FREE_MONTHLY_PLAN_ID: z.string({
      required_error:
        "STRIPE_FREE_MONTHLY_PLAN_ID is required in environment variables",
    }),

    STRIPE_STARTER_MONTHLY_PLAN_ID: z.string({
      required_error:
        "STRIPE_STARTER_MONTHLY_PLAN_ID is required in environment variables",
    }),

    STRIPE_STARTER_YEARLY_PLAN_ID: z.string({
      required_error:
        "STRIPE_STARTER_YEARLY_PLAN_ID is required in environment variables",
    }),

    STRIPE_PRO_MONTHLY_PLAN_ID: z.string({
      required_error:
        "STRIPE_PRO_MONTHLY_PLAN_ID is required in environment variables",
    }),

    STRIPE_PRO_YEARLY_PLAN_ID: z.string({
      required_error:
        "STRIPE_PRO_YEARLY_PLAN_ID is required in environment variables",
    }),
  },

  experimental__runtimeEnv: process.env,
})
