import type { manageProfileSchemaType } from "@/lib/schema/pages/profile/manage-profile-schemea"
import { StringService } from "@/lib/services/string-service"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"

export class ProfileController {
  constructor() {}

  static processProfileUpgradeInput({
    firstName,
    image: inputImage,
    lastName,
    ...props
  }: manageProfileSchemaType) {
    const name = StringService.createFullName(firstName, lastName)
    const imageSrc = getCloudfrontKey(inputImage)

    return {
      name,
      inputImage,
      imageSrc,
      ...props,
    }
  }
}
