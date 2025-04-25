import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { LazyProfileOnboadingForm } from "@/components/dynamic"

export default async function ProfileOnboardingPage() {
  await restrictOnboardingStep("profile")

  return (
    <div className="flex gap-2 flex-col">
      <p className="text-xl font-semibold">Create Your profile</p>
      <LazyProfileOnboadingForm />
    </div>
  )
}
