import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { updateUser } from "@/lib/authentication/utils"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { buildFullName } from "@/trpc/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"

export const update = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, image, fromInvite } = input
    const { user } = ctx

    const fullName = buildFullName(firstName, lastName)
    const imageSrc = image ? getCloudfrontKey(image) : null

    const updateData = {
      name: fullName,
      image: imageSrc,
    }

    const { onboardingStep } =
      await OnboardingDatabaseService.getOnboardingData(user.id)

    const asyncOperations = [
      deleteOldProfileImage(user.image, image),
      updateUser({ body: updateData }),
    ]

    if (onboardingStep === "profile") {
      asyncOperations.push(
        OnboardingDatabaseService.updateOnboardingData(
          fromInvite ? "completed" : "pending",
          fromInvite ? "collaborate" : "workspace",
          user.id,
        ),
      )
    }

    await Promise.all(asyncOperations)
    return { success: true, message: "Profile updated succefully" }
  })
