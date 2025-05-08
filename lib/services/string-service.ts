import {
  OnboardingStatus,
  OnboardingStep,
} from "@/app/actions/pages/onboarding/utils"

export class StringService {
  static isFromInvite(from: string) {
    return from === "invitation"
  }

  static isOnboardingPending(status: OnboardingStatus) {
    return status === "pending"
  }

  static isProfileOnboardingStep(step: OnboardingStep) {
    return step === "profile"
  }

  static capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
