import { redis } from "@/lib/redis"
import { Ratelimit } from "@upstash/ratelimit"

class RatelimitService {
  private static instance: RatelimitService
  private globalRateLimiter: Ratelimit | null = null

  constructor() {}

  static getInstance() {
    if (!RatelimitService.instance) {
      RatelimitService.instance = new RatelimitService()
    }
    return RatelimitService.instance
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

export const ratelimitService = RatelimitService.getInstance()
