import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { LoadProfileOnboaringForm } from "@/components/dynamic"

export default async function ProfileOnboardingPage() {
  // await restrictOnboardingStep("profile")

  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full">
        <p className="text-xl font-semibold">Create Your profile</p>
      </div>
      <LoadProfileOnboaringForm />
    </div>
  )
}
