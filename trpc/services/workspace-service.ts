import { dbHttp } from "@/database"
import { workspaces } from "@/database/schema"
import { MemeberDatabaseService } from "@/database/services/member-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { RBACService } from "@/database/services/rbac-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { StringService } from "@/lib/services/string-service"
import { OnboardingType } from "@/types/database"
import { TRPCError } from "@trpc/server"

export class WorkspaceService {
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

  static async createWorkspace(
    ownerId: string,
    name: string,
    slug: string,
    logo: string | null | undefined,
  ) {
    const [[workspace]] = await Promise.all([
      dbHttp
        .insert(workspaces)
        .values({
          name,
          ownerId,
          slug,
          logo: logo ?? null,
        })
        .returning({ id: workspaces.id }),

      OnboardingDatabaseService.updateOnboardingData(
        "pending",
        "collaborate",
        ownerId,
      ),
    ])

    await MemeberDatabaseService.createMember(
      (await RBACService.getRoleByName("owner")).id,
      ownerId,
      workspace.id,
    )

    return workspace
  }
}
