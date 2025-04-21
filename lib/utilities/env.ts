import { z } from "zod"

const envSchema = z.object({
  // App Configuration
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  ENCRYPTION_KEY: z.string(),

  // Database (Neon.tech PostgreSQL)
  DATABASE_URL: z.string({
    error: "DATABASE_URL is required in environment variables",
  }),

  // Email (Resend)
  RESEND_API_KEY: z.string({
    error: "RESEND_API_KEY is required in environment variables",
  }),
  RESEND_EMAIL: z.string().email({
    error: "RESEND_EMAIL is required and must be a valid email",
  }),

  // Authentication (Google OAuth)
  GOOGLE_CLIENT_ID: z.string({
    error: "GOOGLE_CLIENT_ID is required in environment variables",
  }),
  GOOGLE_CLIENT_SECRET: z.string({
    error: "GOOGLE_CLIENT_SECRET is required in environment variables",
  }),

  // BetterAuth
  BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
  BETTER_AUTH_SECRET: z.string({
    error: "BETTER_AUTH_SECRET is required in environment variables",
  }),

  // File Storage (AWS S3)
  AWS_ACCESS_KEY_ID: z.string({
    error: "AWS_ACCESS_KEY_ID is required in environment variables",
  }),
  AWS_SECRET_ACCESS_KEY: z.string({
    error: "AWS_SECRET_ACCESS_KEY is required in environment variables",
  }),
  AWS_REGION: z.string({
    error: "AWS_REGION is required in environment variables",
  }),
  S3_UPLOAD_BUCKET: z.string({
    error: "S3_UPLOAD_BUCKET is required in environment variables",
  }),

  // Rate Limiting (Upstash Redis)
  UPSTASH_REDIS_REST_URL: z.string({
    error: "UPSTASH_REDIS_REST_URL is required in environment variables",
  }),
  UPSTASH_REDIS_REST_TOKEN: z.string({
    error: "UPSTASH_REDIS_REST_TOKEN is required in environment variables",
  }),

  // Payments (Stripe)
  STRIPE_SECRET_KEY: z.string({
    error: "STRIPE_SECRET_KEY is required in environment variables",
  }),
  STRIPE_WEBHOOK: z.string({
    error: "STRIPE_WEBHOOK is required in environment variables",
  }),
  STRIPE_STARTER_PRICE_ID: z.string({
    error: "STRIPE_STARTER_PRICE_ID is required in environment variables",
  }),
  STRIPE_PRO_PRICE_ID: z.string({
    error: "STRIPE_PRO_PRICE_ID is required in environment variables",
  }),
})

export const env = {
  ...envSchema.parse(process.env),
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV !== "production",
}
