import { restrictOnboardingStep } from "@/app/actions/pages/onboarding/utils"
import { WorkSpaceOnboardingForm } from "@/components/forms/onboarding/workspace"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function WorkSpaceOnboardingPage() {
  await restrictOnboardingStep("workspace")
  return (
    <div className="w-full mx-auto max-w-lg flex items-center justify-center flex-col gap-y-3">
      <div className="w-full flex gap-2 items-center">
        <Link
          href="/onboarding/profile"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "border-none",
          })}
        >
          <ChevronLeft className="size-4" />
        </Link>
        <p className="text-xl font-semibold">Create your workspace</p>
      </div>

      <WorkSpaceOnboardingForm />
    </div>
  )
}
