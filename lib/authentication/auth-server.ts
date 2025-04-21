import { dbHttp } from "@/database"
import { account, sessions, users, verification } from "@/database/schema"
import { envServer } from "@/lib/utilities/env-server"
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

  socialProviders: {
    google: {
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
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
