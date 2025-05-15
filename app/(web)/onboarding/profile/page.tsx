import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { ProfileOnboardingForm } from "@/components/forms/onboarding/profile"
import { loadCallbackSearchParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function ProfileOnboardingPage({
  searchParams,
}: PageProps) {
  const { fromInvite } = await loadCallbackSearchParams(searchParams)
  const { user } = await restrictOnboardingStep("profile")

  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full">
        <p className="text-xl font-semibold">Your main profile</p>
      </div>

      <ProfileOnboardingForm user={user} fromInvite={fromInvite} />
    </div>
  )
}
