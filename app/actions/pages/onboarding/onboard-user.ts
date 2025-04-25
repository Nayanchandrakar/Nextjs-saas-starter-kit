import { handleAuthRequest } from "@/app/actions/utils"
import {
  createOnboardingData,
  getOnboardingData,
} from "@/database/helpers/onboarding"
import { redirectToRoute } from "@/lib/utils"

export async function onboardUser() {
  const session = await handleAuthRequest()
  let onboarding = await getOnboardingData(session.user.id)

  if (!onboarding) {
    onboarding = await createOnboardingData(session.user.id)
  }

  if (onboarding.onboardingStatus === "completed") {
    redirectToRoute("dashboard")
  } else if (onboarding.onboardingStatus === "pending") {
    redirectToRoute(`onboarding/${onboarding.onboardingStep}`)
  }
}
