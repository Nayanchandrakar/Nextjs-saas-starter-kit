import { ProfilePicComponentSkeleton } from "@/components/skeletons/common/profile-pic-skeleton"
import { ButtonSkeleton } from "@/components/skeletons/global/button-skeleton"
import { InputSkeleton } from "@/components/skeletons/global/input-skeleton"
import { LabelSkeleton } from "@/components/skeletons/global/label-skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const OnboardingPageSkeleton = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <ProfilePicComponentSkeleton />
      </CardHeader>

      <CardContent className="mt-3">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <LabelSkeleton />
            <InputSkeleton />
          </div>

          <div className="flex flex-col gap-2">
            <LabelSkeleton />
            <InputSkeleton />
          </div>

          <div className="flex flex-col gap-2">
            <LabelSkeleton />
            <InputSkeleton />
          </div>

          <ButtonSkeleton className="w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
