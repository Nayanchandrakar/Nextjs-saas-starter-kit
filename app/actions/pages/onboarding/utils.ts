import { handleAuthRequest } from "@/app/actions/utils"
import { getOnboardingData } from "@/database/helpers/onboarding"
import {
  onboardingStatus,
  onboardingSteps as stepOrder,
} from "@/database/utils"
import { redirectToRoute } from "@/lib/utils"

export type OnboardingStep = (typeof stepOrder)[number]
export type OnboardingStatus = (typeof onboardingStatus)[number]

export async function restrictOnboardingStep(requiredStep: OnboardingStep) {
  const session = await handleAuthRequest()

  const onboarding = await getOnboardingData(session.user.id)

  const { onboardingStatus, onboardingStep } = onboarding
  if (onboardingStatus === "completed") {
    redirectToRoute("dashboard")
  }

  const currentStepIndex = stepOrder.indexOf(onboardingStep)
  const requiredStepIndex = stepOrder.indexOf(requiredStep)

  // Allow access to current step or previous steps
  if (requiredStepIndex > currentStepIndex) {
    // Redirect to the current step if user tries to access a future step
    redirectToRoute(`onboarding/${onboardingStep}`)
  }

  return { onboarding, session }
}
