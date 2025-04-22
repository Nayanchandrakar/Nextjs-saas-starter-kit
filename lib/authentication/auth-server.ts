import { dbHttp } from "@/database"
import { account, sessions, users, verification } from "@/database/schema"
import { configuration } from "@/lib/config"
import { serverEnv } from "@/lib/utilities/server-env"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
  appName: configuration.site.name,
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
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
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

  plugins: [
    // magicLink({
    //   async sendMagicLink({ email, url }) {

    //   },
    // }),
    nextCookies(),
  ],
})
