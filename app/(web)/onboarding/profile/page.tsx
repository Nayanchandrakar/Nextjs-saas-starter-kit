import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { LazyProfileOnboadingForm } from "@/components/dynamic"
import { ProfilePicUpload } from "@/components/shared/file/profile-pic-upload"

export default async function ProfileOnboardingPage() {
  // await restrictOnboardingStep("profile")

  return (
    <div className="flex gap-2 flex-col">
      {/* <p className="text-xl font-semibold">Create Your profile</p> */}
      {/* <LazyProfileOnboadingForm /> */}
      <ProfilePicUpload />
    </div>
  )
}
