import { dbHttp } from "@/database"
import { account, sessions, users, verification } from "@/database/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
  appName: "Nextjs Saas Starter kit",

  database: drizzleAdapter(dbHttp, {
    provider: "pg",
    schema: {
      user: users,
      account: account,
      session: sessions,
      verification: verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },

  rateLimit: {
    storage: "database",
    modelName: "ratelimit",
  },

  plugins: [nextCookies()],
})
