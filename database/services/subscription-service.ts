import { dbHttp, dbTransaction } from "@/database"
import { subscriptions } from "@/database/schema"
import { SUBSCRIPTION_PLANS } from "@/lib/constants/subscription-plan"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import type { WorkspaceSubscription } from "@/types"
import { Transaction } from "@/types/database"
import { eq } from "drizzle-orm"

export class SubscriptionDBService {
  private constructor() {}

  static async getWorkspaceSubscriptionStatus(workspaceId: string) {
    const [subscription] = await dbHttp
      .select({
        id: subscriptions.id,
        plan: subscriptions.plan,
        status: subscriptions.status,
        priceId: subscriptions.priceId,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
      })
      .from(subscriptions)
      .where(eq(subscriptions.workspaceId, workspaceId))
      .limit(1)

    const defaultSubscription: WorkspaceSubscription = {
      id: "subscription_id",
      plan: "free",
      priceId: "price_id",
      status: "inactive",
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

  static async createFreeWorkspaceSubscription(
    workspaceId: string,
    tx?: Transaction,
  ) {
    await dbTransaction(tx).insert(subscriptions).values({
      workspaceId,
      currentPeriodEnd: DateService.getSubscriptionExpiry(),
      priceId: SUBSCRIPTION_PLANS.free.billing.month.priceId,
    })
  }
}
