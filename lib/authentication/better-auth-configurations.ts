import { createOnboardingData } from "@/database/helpers/onboarding"
import { redis } from "@/lib/redis"
import type { SecondaryStorage, User } from "better-auth"

export const RedisStorage: SecondaryStorage = {
  get: async (key) => {
    const value = await redis.get<string>(key)
    return value ? JSON.stringify(value) : null
  },
  set: async (key, value, ttl) => {
    if (ttl) await redis.set(key, value, { ex: ttl })
    else await redis.set(key, value)
  },
  delete: async (key) => {
    await redis.del(key)
  },
}

/**
 * allows you to define custom hooks that can be
 * executed during lifecycle of core database
 * operations.
 */
export const databaseHooks = {
  user: {
    create: {
      after: async (user: User) => {
        await createOnboardingData(user.id)
      },
    },
  },
}
