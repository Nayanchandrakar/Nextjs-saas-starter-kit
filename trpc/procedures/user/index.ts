import { dbHttp } from "@/database"
import { userOnboarding } from "@/database/schema"
import { updateUser } from "@/lib/authentication/utils"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { protectedProcedure } from "@/trpc/procedures/root"

export const update = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ input }) => {
    const name = [input.firstName, input.lastName].filter(Boolean).join(" ")

    // TODO: remove old image if exists from aws s3
    await Promise.all([
      updateUser({ body: { name, image: input.image ?? null } }),

      dbHttp.update(userOnboarding).set({
        onboardingStep: "workspace",
        onboardingStatus: "pending",
      }),
    ])

    return { success: true, message: "Profile updated succefully" }
  })
