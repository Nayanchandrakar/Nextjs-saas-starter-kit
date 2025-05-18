import { dbHttp } from "@/database"
import { subscriptions } from "@/database/schema"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import { eq } from "drizzle-orm"

export class SubscriptionDBService {
  private constructor() {}

  static async hasActiveSubscription(userId: string) {
    const [subscription] = await dbHttp
      .select({
        status: subscriptions.status,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
      })
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1)

    if (!subscription) return false

    return (
      StringService.isSubscriptionActive(subscription.status) &&
      DateService.isSubscriptionExpired(subscription.currentPeriodEnd)
    )
  }
}
