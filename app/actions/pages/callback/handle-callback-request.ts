import { handleAuthRequest } from "@/app/actions/utils"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { redirectToRoute } from "@/lib/utils"

export async function handleCallbackRequest() {
  const session = await handleAuthRequest()

  const [hasWorkSpace, onboarding] = await Promise.all([
    WorkSpaceDatabaseService.hasWorkSpaces(session.user.id),
    OnboardingDatabaseService.getOnboardingData(session.user.id),
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
