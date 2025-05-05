import { handleAuthRequest } from "@/app/actions/utils"
import { MemeberDatabaseService } from "@/database/services/member-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { StringService } from "@/lib/services/string-service"
import { redirectToRoute } from "@/lib/utils"

export async function handleCallbackRequest(fromInvite: boolean) {
  const session = await handleAuthRequest()

  const [hasWorkSpace, onboarding] = await Promise.all([
    MemeberDatabaseService.isMemberOfWorkspace(session.user.id),
    OnboardingDatabaseService.getOnboardingData(session.user.id),
  ])

  const { onboardingStatus, onboardingStep } = onboarding

  if (hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute(`${hasWorkSpace.workspaceId}/dashboard`)
  }

  if (
    (hasWorkSpace || !hasWorkSpace) &&
    StringService.isOnboardingPending(onboardingStatus)
  ) {
    redirectToRoute(`onboarding/${onboardingStep}`, {
      ...(fromInvite && { fromInvite }),
    })
  }

  if (!hasWorkSpace && onboardingStatus === "completed") {
    redirectToRoute("join")
  }
}
