import { handleAuthRequest } from "@/app/actions/utils"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { redirectToRoute } from "@/lib/utils"

export async function onboardUser() {
  const session = await handleAuthRequest()
  const onboarding = await OnboardingDatabaseService.getOnboardingData(
    session.user.id,
  )

  if (onboarding.onboardingStatus === "completed") {
    redirectToRoute("dashboard")
  } else if (onboarding.onboardingStatus === "pending") {
    redirectToRoute(`onboarding/${onboarding.onboardingStep}`)
  }
}
