import type {
  OnboardingStatus,
  OnboardingStep,
} from "@/app/actions/pages/onboarding/utils"
import { profileOnboardingSchemaType } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { StringService } from "@/lib/services/string-service"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"

export class UserController {
  constructor() {}

  static processOnboardingInput({
    firstName,
    lastName,
    image,
    ...props
  }: profileOnboardingSchemaType) {
    const name = StringService.createFullName(firstName, lastName)
    const imageSrc = getCloudfrontKey(image)

    return { ...props, name, imageSrc, inputImageSrc: image }
  }

  static processProfileOnboardingStep(fromInvite: boolean) {
    const onboardingStatus = fromInvite
      ? "completed"
      : ("pending" as OnboardingStatus)
    const onboardingStep = fromInvite
      ? "collaborate"
      : ("workspace" as OnboardingStep)
    return { onboardingStatus, onboardingStep }
  }
}
