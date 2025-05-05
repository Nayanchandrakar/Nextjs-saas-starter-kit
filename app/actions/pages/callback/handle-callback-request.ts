import { handleAuthRequest } from "@/app/actions/utils"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { redirectToRoute } from "@/lib/utils"

export async function handleCallbackRequest(fromInvite: boolean) {
  const session = await handleAuthRequest()

  const [hasWorkSpace, onboarding] = await Promise.all([
    WorkSpaceDatabaseService.hasWorkSpaces(session.user.id),
    OnboardingDatabaseService.getOnboardingData(session.user.id),
  ])

  const { onboardingStatus, onboardingStep } = onboarding

  if (hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute(`${hasWorkSpace.id}/dashboard`)
  }

  if ((hasWorkSpace || !hasWorkSpace) && onboardingStatus === "pending") {
    redirectToRoute(`onboarding/${onboardingStep}`, {
      ...(fromInvite && { fromInvite }),
    })
  }

  if (!hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute("join")
  }
}
