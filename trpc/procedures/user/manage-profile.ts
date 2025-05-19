import { updateUser } from "@/lib/authentication/utils"
import {
  manageProfileSchema,
  updateProfileImageSchema,
} from "@/lib/schema/pages/profile/manage-profile-schemea"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { ProfileController } from "@/trpc/controller/profile-controller"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { protectedProcedure } from "@/trpc/procedures/root"

export const updateProfile = protectedProcedure
  .input(manageProfileSchema)
  .mutation(async (props) => {
    const { imageSrc, inputImage, name } =
      ProfileController.processProfileUpgradeInput(props.input)

    const asyncOperations = [
      deleteOldProfileImage(props.ctx.user.image, inputImage),
      updateUser({
        body: {
          name,
          image: imageSrc,
        },
      }),
    ]

    await Promise.all(asyncOperations)
    return TrpcResponseHandler({ message: "profileUpdateMessage" })
  })

export const updateProfileImage = protectedProcedure
  .input(updateProfileImageSchema)
  .mutation(async ({ input, ctx }) => {
    const asyncOperations = [
      deleteOldProfileImage(ctx.user.image, input.image),
      updateUser({ body: { image: getCloudfrontKey(input.image) } }),
    ]

    await Promise.all(asyncOperations)
    return TrpcResponseHandler({ message: "profileImageUpdteMessage" })
  })
