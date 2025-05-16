import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { UserDatabaseService } from "@/database/services/user-service"
import { updateUser } from "@/lib/authentication/utils"
import { s3Service } from "@/lib/aws/s3-service"
import {
  accountDeleteDescription,
  accountDeleteMessage,
} from "@/lib/constants/message.json"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { StringService } from "@/lib/services/string-service"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { buildFullName } from "@/trpc/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"
import { after } from "next/server"

export const onboardUser = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, image, fromInvite } = input
    const { user } = ctx

    const fullName = buildFullName(firstName, lastName)

    const updateData = {
      name: fullName,
      image: getCloudfrontKey(image),
    }

    const { onboardingStep } =
      await OnboardingDatabaseService.getOnboardingData(user.id)

    const asyncOperations = [
      deleteOldProfileImage(user.image, image),
      updateUser({ body: updateData }),
    ]

    if (StringService.isProfileOnboardingStep(onboardingStep)) {
      asyncOperations.push(
        OnboardingDatabaseService.updateOnboardingData(
          fromInvite ? "completed" : "pending",
          fromInvite ? "collaborate" : "workspace",
          user.id,
        ),
      )
    }

    after(async () => {
      await Promise.all(asyncOperations)
    })

    return {
      success: true,
      message: "Profile onbaroding completed successfully",
    }
  })

export const deleteAccount = protectedProcedure.mutation(async ({ ctx }) => {
  after(async () => {
    await Promise.all([
      UserDatabaseService.deleteUser(ctx.user.id),
      s3Service.deleteObjectFromBucket(ctx.user.id),
    ])
  })

  return {
    success: true,
    message: accountDeleteMessage,
    description: accountDeleteDescription,
  }
})
