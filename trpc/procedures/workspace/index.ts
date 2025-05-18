import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { workSpaceOnboardingSchema } from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { protectedProcedure } from "@/trpc/procedures/root"
import { WorkspaceService } from "@/trpc/services/workspace-service"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id
    const onboarding = await OnboardingDatabaseService.getOnboardingData(userId)
    await WorkspaceService.handleOnboarding(onboarding)

    const slug = input.slug.toLowerCase()

    await Promise.all([
      await WorkspaceService.isSlugExist(userId, slug),
      await WorkspaceService.createWorkspace(
        userId,
        input.name,
        slug,
        getCloudfrontKey(input.logo),
      ),
    ])

    return { success: true, message: "Workspace created successfully" }
  })
