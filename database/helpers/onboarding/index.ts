import {
  OnboardingStatus,
  OnboardingStep,
} from "@/app/actions/pages/onboarding/utils"
import { dbHttp } from "@/database"
import { userOnboarding } from "@/database/schema"
import { eq } from "drizzle-orm"

export async function getOnboardingData(userId: string) {
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

export async function createOnboardingData(userId: string) {
  const [data] = await dbHttp
    .insert(userOnboarding)
    .values({ userId })
    .returning({
      onboardingStatus: userOnboarding.onboardingStatus,
      onboardingStep: userOnboarding.onboardingStep,
    })

  return data
}

export async function updateOnboardingData(
  onboardingStatus: OnboardingStatus,
  onboardingStep: OnboardingStep,
  userId: string,
) {
  await dbHttp
    .update(userOnboarding)
    .set({ onboardingStep, onboardingStatus })
    .where(eq(userOnboarding.userId, userId))
}
