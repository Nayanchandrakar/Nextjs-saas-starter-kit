import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"

export default async function ProfileOnboardingPage() {
  await restrictOnboardingStep("profile")

  return <div>Profile Onboarding page</div>
}
