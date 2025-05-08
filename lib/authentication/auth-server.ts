import { dbHttp } from "@/database"
import { account, users, verification } from "@/database/schema"
import {
  RedisStorage,
  databaseHooks,
} from "@/lib/authentication/better-auth-configurations"
import { configuration } from "@/lib/config"
import { magicLinkService } from "@/lib/strategies/email-strategy"
import { serverEnv } from "@/lib/utilities/server-env"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { magicLink, multiSession } from "better-auth/plugins"

export const authServer = betterAuth({
  appName: configuration.site.name,
  database: drizzleAdapter(dbHttp, {
    provider: "pg",
    schema: {
      user: users,
      account,
      verification,
    },
  }),

  databaseHooks,

  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },

  rateLimit: { storage: "secondary-storage" },
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
    nextCookies(),
  ],
})
