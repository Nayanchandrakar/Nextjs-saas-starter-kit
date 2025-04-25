import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"

export default async function CollaborationOnboardingPage() {
  await restrictOnboardingStep("collaborate")
  return <div>Collaboration Onboarding page</div>
}
