import { updateOnboardingData } from "@/database/helpers/onboarding"
import { updateUser } from "@/lib/authentication/utils"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { deleteOldProfileImage } from "@/trpc/lib/helpers/user-helpers"
import { buildFullName } from "@/trpc/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"

export const update = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, image } = input
    const { user } = ctx

    const fullName = buildFullName(firstName, lastName)
    const imageSrc = image ?? null

    const updateData = {
      name: fullName,
      image: imageSrc,
    }

    await Promise.all([
      deleteOldProfileImage(user.image, image),
      updateUser({ body: updateData }),
      updateOnboardingData("pending", "workspace", ctx.user.id),
    ])

    return { success: true, message: "Profile updated succefully" }
  })
