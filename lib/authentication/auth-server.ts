import { dbHttp } from "@/database"
import { account, sessions, users, verification } from "@/database/schema"
import { RedisStorage } from "@/lib/authentication/better-auth-configurations"
import { configuration } from "@/lib/config"
import { magicLinkService } from "@/lib/strategies/email-strategy"
import { serverEnv } from "@/lib/utilities/server-env"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { multiSession } from "better-auth/plugins"
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
    storage: "secondary-storage",
  },

  secondaryStorage: RedisStorage,

  user: {
    deleteUser: {
      enabled: true,
    },
  },

  advanced: {
    cookiePrefix: configuration.site.cookiePrefix,
    database: {
      generateId: false,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
    },
  },

  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        await magicLinkService.send({ email, url })
      },
    }),
    multiSession(),
    // make sure this is the last plugin in the array
    nextCookies(),
  ],
})
