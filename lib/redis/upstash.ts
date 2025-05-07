import { redis } from "@/lib/redis"
import { Ratelimit } from "@upstash/ratelimit"

class UpstashRateLimit {
  private static instance: UpstashRateLimit
  private static globalRateLimiter: Ratelimit | null = null
  private static strictRatelimiter: Ratelimit | null = null
  private static standardRatelimiter: Ratelimit | null = null
  private static relaxedRatelimit: Ratelimit | null = null

  constructor() {}

  static getInstance() {
    if (!UpstashRateLimit.instance) {
      UpstashRateLimit.instance = new UpstashRateLimit()
    }
    return UpstashRateLimit.instance
  }

  globalRateLimit() {
    if (!UpstashRateLimit.globalRateLimiter) {
      UpstashRateLimit.globalRateLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
      })
    }
    return UpstashRateLimit.globalRateLimiter
  }

  strictRateLimit() {
    if (!UpstashRateLimit.strictRatelimiter) {
      UpstashRateLimit.strictRatelimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "5 m"), // 3 requests per 5 minutes
      })
    }
    return UpstashRateLimit.strictRatelimiter
  }

  standardRateLimit() {
    if (!UpstashRateLimit.standardRatelimiter) {
      UpstashRateLimit.standardRatelimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
      })
    }
    return UpstashRateLimit.standardRatelimiter
  }

  relaxedRateLimit() {
    if (!UpstashRateLimit.relaxedRatelimit) {
      UpstashRateLimit.relaxedRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 m"), // 30 requests per minute
      })
    }
    return UpstashRateLimit.relaxedRatelimit
  }
}

export const upstashRateLimit = UpstashRateLimit.getInstance()
