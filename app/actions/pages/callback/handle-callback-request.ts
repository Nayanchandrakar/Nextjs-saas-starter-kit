import { handleAuthRequest } from "@/app/actions/utils"
import { getOnboardingData } from "@/database/helpers/onboarding"
import { hasWorkSpaces } from "@/database/helpers/workspaces"
import { redirectToRoute } from "@/lib/utils"

export async function handleCallbackRequest() {
  const session = await handleAuthRequest()

  const [hasWorkSpace, onboarding] = await Promise.all([
    hasWorkSpaces(session.user.id),
    getOnboardingData(session.user.id),
  ])

  const { onboardingStatus, onboardingStep } = onboarding

  if (hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute("dashboard")
  }

  if ((hasWorkSpace || !hasWorkSpace) && onboardingStatus === "pending") {
    redirectToRoute(`onboarding/${onboardingStep}`)
  }

  if (!hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute("join")
  }
}
