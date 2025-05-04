import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { workSpaceOnboardingSchema } from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { protectedProcedure } from "@/trpc/procedures/root"
import { WorkspaceService } from "@/trpc/services/workspace-service"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const onboarding = await OnboardingDatabaseService.getOnboardingData(
      ctx.user.id,
    )
    await WorkspaceService.handleOnboarding(onboarding)

    const slug = input.slug.toLowerCase()
    await WorkspaceService.isSlugExist(ctx.user.id, slug)
    await WorkspaceService.createWorkspace(
      ctx.user.id,
      input.name,
      slug,
      input.logo,
    )

    return { success: true, message: "Workspace created successfully" }
  })
