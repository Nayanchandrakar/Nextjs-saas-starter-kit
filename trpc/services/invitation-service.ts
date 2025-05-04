import { InvitationDatabaseService } from "@/database/services/invitation-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import messageJson from "@/lib/constants/message.json"
import { DateService } from "@/lib/services/date-service"
import { clientEnv } from "@/lib/utilities/client-env"
import { createRoute } from "@/lib/utils"
import { TRPCError } from "@trpc/server"

export class InvitationService {
  static async handleEmptyInput(userId: string) {
    await OnboardingDatabaseService.updateOnboardingData(
      "completed",
      "collaborate",
      userId,
    )
    return {
      success: true,
      message: messageJson.invitationCreate,
      redirect: createRoute("dashboard"),
    }
  }

  static async validateInput(
    input: { emails: string[] },
    userEmail: string,
  ): Promise<void> {
    if (input.emails.includes(userEmail)) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `${userEmail} is already a member`,
      })
    }
  }

  static async getWorkspace(userId: string) {
    const workspace =
      await WorkSpaceDatabaseService.getLastWorkspaceCreated(userId)
    if (!workspace) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: messageJson.workspaceNotFound,
      })
    }
    return workspace
  }

  static async checkExistingInvitations(
    workspaceId: string,
    emails: string[],
  ): Promise<void> {
    const existingInvites =
      await InvitationDatabaseService.getExistingInvitations(
        workspaceId,
        emails,
      )
    if (existingInvites.length > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: messageJson.pendingInvitations,
      })
    }
  }

  static createInvitationValues(
    emails: string[],
    workspaceId: string,
    userId: string,
  ) {
    return emails.map((email) => ({
      email,
      expiresAt: DateService.getInvitationExpiry(),
      invitedBy: userId,
      workspaceId,
    }))
  }

  static formatInvitationResponse(
    invitations: { email: string; id: string }[],
  ) {
    return invitations.map(({ email, id }) => ({
      email,
      link: `${clientEnv.NEXT_PUBLIC_APP_URL}${createRoute(`invite/${id}`, { from: "invitation" })}`,
    }))
  }
}
