import { dbHttp } from "@/database"
import { subscriptions } from "@/database/schema"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import type { UserSubscription } from "@/types"
import { eq } from "drizzle-orm"

export class SubscriptionDBService {
  private constructor() {}

  static async getUserSubscriptionStatus(userId: string) {
    const [subscription] = await dbHttp
      .select({
        id: subscriptions.id,
        priceId: subscriptions.priceId,
        status: subscriptions.status,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
      })
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1)

    const defaultSubscription: UserSubscription = {
      id: "",
      priceId: "",
      status: "",
      currentPeriodEnd: new Date(0),
      isSubscribed: false,
    }

    if (!subscription) {
      return defaultSubscription
    }

    const isSubscribed = (StringService.isSubscriptionActive(
      subscription.status,
    ) &&
      DateService.isSubscriptionExpired(
        subscription.currentPeriodEnd,
      )) as boolean

    return {
      ...subscription,
      isSubscribed,
    }
  }
}
