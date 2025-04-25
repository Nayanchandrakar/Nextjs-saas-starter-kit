import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"

export default async function WorkSpaceOnboardingPage() {
  await restrictOnboardingStep("workspace")
  return <div>Workspace Onboarding page</div>
}
