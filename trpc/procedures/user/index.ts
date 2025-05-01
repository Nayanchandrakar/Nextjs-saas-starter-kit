import {
  getOnboardingData,
  updateOnboardingData,
} from "@/database/helpers/onboarding"
import { updateUser } from "@/lib/authentication/utils"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { buildFullName } from "@/trpc/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"

export const update = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, image } = input
    const { user } = ctx

    const fullName = buildFullName(firstName, lastName)
    const imageSrc = image ? getCloudfrontKey(image) : null

    const updateData = {
      name: fullName,
      image: imageSrc,
    }

    const { onboardingStep } = await getOnboardingData(user.id)

    const asyncOperations = [
      deleteOldProfileImage(user.image, image),
      updateUser({ body: updateData }),
    ]

    if (onboardingStep === "profile") {
      asyncOperations.push(
        updateOnboardingData("pending", "workspace", user.id),
      )
    }

    await Promise.all(asyncOperations)

    return { success: true, message: "Profile updated succefully" }
  })
