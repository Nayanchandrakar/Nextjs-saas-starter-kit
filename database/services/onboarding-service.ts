import {
  OnboardingStatus,
  OnboardingStep,
} from "@/app/actions/pages/onboarding/utils"
import { dbHttp, dbTransaction } from "@/database"
import { userOnboarding } from "@/database/schema"
import { Transaction } from "@/types/database"
import { eq } from "drizzle-orm"

export class OnboardingDatabaseService {
  static async createOnboardingData(userId: string) {
    await dbHttp.insert(userOnboarding).values({ userId })
  }

  static async getOnboardingData(userId: string) {
    const [data] = await dbHttp
      .select({
        onboardingStatus: userOnboarding.onboardingStatus,
        onboardingStep: userOnboarding.onboardingStep,
      })
      .from(userOnboarding)
      .where(eq(userOnboarding.userId, userId))
      .limit(1)

    return data
  }

  static async updateOnboardingData(
    onboardingStatus: OnboardingStatus,
    onboardingStep: OnboardingStep,
    userId: string,
    tx?: Transaction,
  ) {
    await dbTransaction(tx)
      .update(userOnboarding)
      .set({ onboardingStep, onboardingStatus })
      .where(eq(userOnboarding.userId, userId))
  }
}
