import { dbServerless } from "@/database"
import { workspaces } from "@/database/schema"
import { MemeberDatabaseService } from "@/database/services/member-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { RBACService } from "@/database/services/rbac-service"
import { SubscriptionDBService } from "@/database/services/subscription-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { ServerFilters } from "@/lib/services/server-filters"
import { StringService } from "@/lib/services/string-service"
import { OnboardingType } from "@/types/database"
import { TRPCError } from "@trpc/server"

export class WorkspaceController {
  constructor() {}

  static async handleOnboarding({
    onboardingStatus,
    onboardingStep,
  }: Pick<OnboardingType, "onboardingStatus" | "onboardingStep">) {
    if (
      StringService.isOnboardingPending(onboardingStatus) &&
      StringService.isProfileOnboardingStep(onboardingStep)
    ) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Complete profile onboarding first",
      })
    }
  }

  static async isSlugExist(userId: string, slug: string) {
    const isExist = await WorkSpaceDatabaseService.getWorkSpacesByUserIdAndSlug(
      userId,
      slug,
    )

    if (isExist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Workspace with this slug already exists",
      })
    }
  }

  static async checkWorkspaceSubscription(userId: string) {
    const workspaceCount =
      await WorkSpaceDatabaseService.getWorkspaceCount(userId)

    if (
      workspaceCount.count >= ServerFilters.getPlanLimits("free").maxWorkspaces
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Workspace limit reached for ${"subscription.plan"} plan`,
      })
    }
  }

  static async createWorkspace(
    ownerId: string,
    name: string,
    slug: string,
    logo: string | null | undefined,
  ) {
    await dbServerless.transaction(async (tx) => {
      const [workspace] = await tx
        .insert(workspaces)
        .values({
          name,
          ownerId,
          slug,
          logo: logo ?? null,
        })
        .returning({ id: workspaces.id })

      await OnboardingDatabaseService.updateOnboardingData(
        "pending",
        "collaborate",
        ownerId,
        tx,
      )

      const role = await RBACService.getRoleByName("owner", tx)
      await MemeberDatabaseService.createMember(
        role.id,
        ownerId,
        workspace.id,
        tx,
      )

      await SubscriptionDBService.createFreeWorkspaceSubscription(
        workspace.id,
        tx,
      )
    })
  }

  static async handleWorkspaceDelete(userId: string, workspaceId: string) {
    const hasPermission = await RBACService.hasPermission(
      userId,
      workspaceId,
      "delete:workspace",
    )

    if (!hasPermission) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to delete this workspace.",
      })
    }

    return hasPermission
  }
}
