import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { UserDatabaseService } from "@/database/services/user-service"
import { updateUser } from "@/lib/authentication/utils"
import { s3Service } from "@/lib/aws/s3-service"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { StringService } from "@/lib/services/string-service"
import { UserController } from "@/trpc/controller/user-controller"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { protectedProcedure } from "@/trpc/procedures/root"
import { after } from "next/server"

export const createOnboardingProfile = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async (props) => {
    const { id: userId, image: userImage } = props.ctx.user
    const { name, imageSrc, inputImageSrc, fromInvite } =
      UserController.processOnboardingInput(props.input)
    const { onboardingStep } =
      await OnboardingDatabaseService.getOnboardingData(userId)

    const asyncOperations = [
      deleteOldProfileImage(userImage, inputImageSrc),
      updateUser({ body: { name, image: imageSrc } }),
    ]

    if (StringService.isProfileOnboardingStep(onboardingStep)) {
      const { onboardingStatus, onboardingStep } =
        UserController.processProfileOnboardingStep(fromInvite)
      asyncOperations.push(
        OnboardingDatabaseService.updateOnboardingData(
          onboardingStatus,
          onboardingStep,
          userId,
        ),
      )
    }

    await Promise.all(asyncOperations)
    return TrpcResponseHandler({ message: "profileOnboardingSuccess" })
  })

export const deleteAccount = protectedProcedure.mutation(async ({ ctx }) => {
  after(async () => {
    await Promise.all([
      UserDatabaseService.deleteUser(ctx.user.id),
      s3Service.deleteObjectFromBucket(ctx.user.id),
    ])
  })

  return TrpcResponseHandler({
    message: "accountDeleteMessage",
    description: "accountDeleteDescription",
  })
})
