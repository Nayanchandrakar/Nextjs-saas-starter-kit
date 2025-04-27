import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { LazyProfileOnboadingForm } from "@/components/dynamic"
import { ProfilePicComponent } from "@/components/shared/file/profile-pic-component"

export default async function ProfileOnboardingPage() {
  // await restrictOnboardingStep("profile")

  return (
    <div className="flex gap-2 flex-col">
      {/* <p className="text-xl font-semibold">Create Your profile</p> */}
      {/* <LazyProfileOnboadingForm /> */}

      <ProfilePicComponent
        maxSize={4 * 1024 * 1024}
        accept="image/jpeg,image/png,image/jpg"
      />
    </div>
  )
}
