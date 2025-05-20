import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { s3Service } from "@/lib/aws/s3-service"
import {
  workSpaceOnboardingSchema,
  workspaceDeleteSchema,
} from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { getCloudfrontKey } from "@/lib/utilities/s3-utils"
import { createRoute } from "@/lib/utils"
import { WorkspaceController } from "@/trpc/controller/workspace-controller"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { protectedProcedure } from "@/trpc/procedures/root"
import { revalidatePath } from "next/cache"

export const create = protectedProcedure
  .input(workSpaceOnboardingSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id
    const onboarding = await OnboardingDatabaseService.getOnboardingData(userId)
    await WorkspaceController.handleOnboarding(onboarding)
    const slug = input.slug.toLowerCase()
    await WorkspaceController.isSlugExist(userId, slug)
    await WorkspaceController.checkWorkspaceSubscription(userId)
    await WorkspaceController.createWorkspace(
      userId,
      input.name,
      slug,
      getCloudfrontKey(input.logo),
    )
    return TrpcResponseHandler({ message: "workspaceCreateMessage" })
  })

export const deleteWorkspace = protectedProcedure
  .input(workspaceDeleteSchema)
  .mutation(async (props) => {
    const userId = props.ctx.user.id
    const workspaceId = props.input.id
    await WorkspaceController.handleWorkspaceDelete(userId, workspaceId)
    const workspace = await WorkSpaceDatabaseService.deleteWorkspace(
      userId,
      workspaceId,
    )
    if (workspace && workspace.logo) {
      await s3Service.deleteObjectFromBucket(workspace.logo)
    }
    revalidatePath(createRoute(`${workspace.slug}/workspaces`))
    return TrpcResponseHandler({ message: "workspaceDeleteMessage" })
  })
