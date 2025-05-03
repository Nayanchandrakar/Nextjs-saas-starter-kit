import { dbHttp } from "@/database"
import { workspaces } from "@/database/schema"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { workSpaceOnboardingSchema } from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { protectedProcedure } from "@/trpc/procedures/root"
import { TRPCError } from "@trpc/server"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const { onboardingStatus, onboardingStep } =
      await OnboardingDatabaseService.getOnboardingData(ctx.user.id)

    if (onboardingStatus === "pending" && onboardingStep === "profile") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Complete profile onboarding first",
      })
    }

    const slug = input.slug.toLowerCase()
    const isExist = await WorkSpaceDatabaseService.getWorkSpacesByUserIdAndSlug(
      ctx.user.id,
      slug,
    )

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
        slug,
        logo: input.logo ?? null,
      }),

      OnboardingDatabaseService.updateOnboardingData(
        "pending",
        "collaborate",
        ctx.user.id,
      ),
    ])

    return { success: true, message: "Workspace created successfully" }
  })
