import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { ProfileOnboardingForm } from "@/components/forms/onboarding/profile"
import { loadCallbackSearchParams } from "@/lib/nuqs/search-params"
import { getCloudfrontFile, isCloudfrontFile } from "@/lib/utilities/s3-utils"
import { SearchParams } from "nuqs/server"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function ProfileOnboardingPage({
  searchParams,
}: PageProps) {
  const { fromInvite } = await loadCallbackSearchParams(searchParams)
  const { session } = await restrictOnboardingStep("profile")
  const [firstName, lastName] = (session.user.name ?? "")
    .split(" ")
    .filter(Boolean)

  let imageSrc = session.user.image ?? ""

  if (imageSrc && isCloudfrontFile(imageSrc)) {
    imageSrc = getCloudfrontFile(imageSrc)
  }

  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full">
        <p className="text-xl font-semibold">Your main profile</p>
      </div>

      <ProfileOnboardingForm
        email={session.user.email}
        firstName={firstName}
        lastName={lastName}
        image={imageSrc}
        fromInvite={fromInvite}
      />
    </div>
  )
}
