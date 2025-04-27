import { dbHttp } from "@/database"
import { userOnboarding, users } from "@/database/schema"
import { profileOnboardingSchema } from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { protectedProcedure } from "@/trpc/procedures/root"
import { and, eq } from "drizzle-orm"

export const update = protectedProcedure
  .input(profileOnboardingSchema)
  .mutation(async ({ ctx, input }) => {
    const name = [input.firstName, input.lastName].filter(Boolean).join(" ")

    // TODO: remove old image if exists from aws s3
    await Promise.all([
      dbHttp
        .update(users)
        .set({ name, image: input.image })
        .where(and(eq(users.id, ctx.user.id), eq(users.email, ctx.user.email))),

      dbHttp.update(userOnboarding).set({
        onboardingStep: "workspace",
        onboardingStatus: "pending",
      }),
    ])

    return { success: true, message: "Profile updated succefully" }
  })
