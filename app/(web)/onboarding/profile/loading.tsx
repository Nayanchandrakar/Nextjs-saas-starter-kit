import { OnboardingPageSkeleton } from "@/components/skeletons/pages/onboarding/onboarding-page-skeleton"

export default function Loading() {
  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full">
        <p className="text-xl font-semibold">Your main profile</p>
      </div>

      <OnboardingPageSkeleton />
    </div>
  )
}
