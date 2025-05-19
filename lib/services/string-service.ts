import {
  OnboardingStatus,
  OnboardingStep,
} from "@/app/actions/pages/onboarding/utils"
import { getCloudfrontFile, isCloudfrontFile } from "@/lib/utilities/s3-utils"

export class StringService {
  static isFromInvite(from: string) {
    return from === "invitation"
  }

  static isOnboardingPending(status: OnboardingStatus) {
    return status === "pending"
  }

  static isSubscriptionActive(status: string) {
    return status === "active"
  }

  static isProfileOnboardingStep(step: OnboardingStep) {
    return step === "profile"
  }

  static capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  static isCurrentUser(userId: string, currentUserId: string) {
    return userId === currentUserId
  }

  static getPlaceholderImage(src: string | null, name: string) {
    if (src) return getCloudfrontFile(src)
    return `https://avatar.vercel.sh/${name}.svg`
  }

  static extractName(name: string) {
    const [firstName, lastName] = name.split(" ").filter(Boolean)
    return { firstName, lastName: lastName ?? "" }
  }

  static getUserImageSrc(src: string | null | undefined) {
    let imageSrc = src ?? ""

    if (src && isCloudfrontFile(src)) {
      imageSrc = getCloudfrontFile(src)
    }

    return imageSrc
  }

  static createFullName(firstName: string, lastName?: string) {
    return [firstName, lastName].filter(Boolean).join(" ").trim()
  }
}
