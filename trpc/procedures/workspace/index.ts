import { dbHttp } from "@/database"
import { getOnboardingData } from "@/database/helpers/onboarding"
import { getWorkSpacesByUserIdAndSlug } from "@/database/helpers/workspaces"
import { userOnboarding, workspaces } from "@/database/schema"
import { workSpaceOnboardingSchema } from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { protectedProcedure } from "@/trpc/procedures/root"
import { TRPCError } from "@trpc/server"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { onboardingStatus, onboardingStep } = await getOnboardingData(
      ctx.user.id,
    )

    if (onboardingStatus === "pending" && onboardingStep === "profile") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Complete profile onboarding first",
      })
    }

    const slug = input.slug.toLowerCase()
    const isExist = await getWorkSpacesByUserIdAndSlug(ctx.user.id, slug)

    if (isExist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Workspace with this slug already exists",
      })
    }

    await Promise.all([
      dbHttp.insert(workspaces).values({
        name: input.name,
        ownerId: ctx.user.id,
        slug: slug,
        logo: input.logo ?? null,
      }),

      dbHttp.update(userOnboarding).set({
        onboardingStep: "collaborate",
        onboardingStatus: "pending",
      }),
    ])

    return { success: true, message: "Workspace created successfully" }
  })
