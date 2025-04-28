import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { LoadProfileOnboaringForm } from "@/components/dynamic"

export default async function ProfileOnboardingPage() {
  const { session } = await restrictOnboardingStep("profile")
  const [firstName, lastName] = (session.user.name ?? "")
    .split(" ")
    .filter(Boolean)

  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full">
        <p className="text-xl font-semibold">Your main profile</p>
      </div>

      <LoadProfileOnboaringForm
        email={session.user.email}
        firstName={firstName}
        lastName={lastName}
        image={session.user.image ?? ""}
      />
    </div>
  )
}
