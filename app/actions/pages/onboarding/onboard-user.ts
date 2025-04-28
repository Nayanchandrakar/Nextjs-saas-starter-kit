import { handleAuthRequest } from "@/app/actions/utils"
import { getOnboardingData } from "@/database/helpers/onboarding"
import { redirectToRoute } from "@/lib/utils"

export async function onboardUser() {
  const session = await handleAuthRequest()
  const onboarding = await getOnboardingData(session.user.id)

  if (onboarding.onboardingStatus === "completed") {
    redirectToRoute("dashboard")
  } else if (onboarding.onboardingStatus === "pending") {
    redirectToRoute(`onboarding/${onboarding.onboardingStep}`)
  }
}
