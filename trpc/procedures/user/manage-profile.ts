import { updateUser } from "@/lib/authentication/utils"
import {
  manageProfileSchema,
  updateProfileImageSchema,
} from "@/lib/schema/pages/profile/manage-profile-schemea"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { buildFullName } from "@/trpc/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"

export const manageProfile = protectedProcedure
  .input(manageProfileSchema)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, image } = input
    const { user } = ctx

    const fullName = buildFullName(firstName, lastName)

    const updateData = {
      name: fullName,
      image: getCloudfrontKey(image),
    }

    const asyncOperations = [
      deleteOldProfileImage(user.image, image),
      updateUser({ body: updateData }),
    ]

    await Promise.all(asyncOperations)
    return { success: true, message: "Profile changes saved successfully" }
  })

export const editProfileImage = protectedProcedure
  .input(updateProfileImageSchema)
  .mutation(async ({ input, ctx }) => {
    const updateData = {
      image: getCloudfrontKey(input.image),
    }

    const asyncOperations = [
      deleteOldProfileImage(ctx.user.image, input.image),
      updateUser({ body: updateData }),
    ]

    await Promise.all(asyncOperations)

    return { success: true, message: "Profile Image updated Successfully" }
  })
