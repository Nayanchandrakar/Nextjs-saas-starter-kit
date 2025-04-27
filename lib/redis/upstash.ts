import { redis } from "@/lib/redis"
import { Ratelimit } from "@upstash/ratelimit"

class UpstashRateLimit {
  private static instance: UpstashRateLimit
  private globalRateLimiter: Ratelimit | null = null

  constructor() {}

  static getInstance() {
    if (!UpstashRateLimit.instance) {
      UpstashRateLimit.instance = new UpstashRateLimit()
    }
    return UpstashRateLimit.instance
  }

  /**
   * Applies a global rate limit of 5 requests per 1 minute using a sliding window algorithm.
   */
  globalRateLimit() {
    if (!this.globalRateLimiter) {
      this.globalRateLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
      })
    }
    return this.globalRateLimiter
  }
}

export const upstashRateLimit = UpstashRateLimit.getInstance()
