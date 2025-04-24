import { redis } from "@/lib/redis"
import type { SecondaryStorage } from "better-auth"

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
