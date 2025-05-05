import { handleAuthRequest } from "@/app/actions/utils"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { StringService } from "@/lib/services/string-service"
import { redirectToRoute } from "@/lib/utils"

export async function onboardUser() {
  const session = await handleAuthRequest()
  const onboarding = await OnboardingDatabaseService.getOnboardingData(
    session.user.id,
  )

  if (!StringService.isOnboardingPending(onboarding.onboardingStatus)) {
    redirectToRoute("callback")
  } else if (StringService.isOnboardingPending(onboarding.onboardingStatus)) {
    redirectToRoute(`onboarding/${onboarding.onboardingStep}`)
  }
}
