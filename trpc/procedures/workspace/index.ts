import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { workSpaceOnboardingSchema } from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { protectedProcedure } from "@/trpc/procedures/root"
import { WorkspaceService } from "@/trpc/services/workspace-service"
import { after } from "next/server"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id
    const onboarding = await OnboardingDatabaseService.getOnboardingData(userId)
    await WorkspaceService.handleOnboarding(onboarding)

    const slug = input.slug.toLowerCase()
    await WorkspaceService.isSlugExist(userId, slug)

    after(async () => {
      await WorkspaceService.createWorkspace(
        userId,
        input.name,
        slug,
        input.logo,
      )
    })

    return { success: true, message: "Workspace created successfully" }
  })
