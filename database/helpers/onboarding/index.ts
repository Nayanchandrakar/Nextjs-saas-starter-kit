import { dbHttp } from "@/database"
import { userOnboarding } from "@/database/schema"
import { eq } from "drizzle-orm"

export async function getOnboardingData(userId: string) {
  return dbHttp
    .select({
      onboardingStatus: userOnboarding.onboardingStatus,
      onboardingStep: userOnboarding.onboardingStep,
    })
    .from(userOnboarding)
    .where(eq(userOnboarding.userId, userId))
    .limit(1)
}
