import { dbServerless } from "@/database"
import { subscriptions, userOnboarding } from "@/database/schema"
import { DateService } from "@/lib/services/date-service"
import { serverEnv } from "@/lib/utilities/server-env"

export class AuthDBService {
  static async initializeAccount(userId: string) {
    await dbServerless.transaction(async (tx) => {
      await tx.insert(subscriptions).values({
        userId,
        status: "active",
        currentPeriodEnd: DateService.getSubscriptionExpiry(),
        priceId: serverEnv.STRIPE_FREE_MONTHLY_PLAN_ID,
      }),
        await tx.insert(userOnboarding).values({ userId })
    })
  }
}
