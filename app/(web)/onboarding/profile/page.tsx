import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { ProfileOnboardingForm } from "@/components/forms/onboarding/profile"
import { getS3FileSource, isProviderUrl } from "@/lib/utilities/url-utilities"

export default async function ProfileOnboardingPage() {
  const { session } = await restrictOnboardingStep("profile")
  const [firstName, lastName] = (session.user.name ?? "")
    .split(" ")
    .filter(Boolean)

  let imageSrc = session.user.image ?? ""

  // Extra handling because of lh3.google.com
  if (imageSrc && isProviderUrl(imageSrc, "s3")) {
    imageSrc = getS3FileSource(imageSrc)
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
      />
    </div>
  )
}
