import { InvitationDatabaseService } from "@/database/services/invitation-service"
import { MemeberDatabaseService } from "@/database/services/member-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { SubscriptionDBService } from "@/database/services/subscription-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import messageJson from "@/lib/constants/message.json"
import { DateService } from "@/lib/services/date-service"
import { ServerFilters } from "@/lib/services/server-filters"
import { invitationLinkService } from "@/lib/strategies/email-strategy"
import { clientEnv } from "@/lib/utilities/client-env"
import { createRoute } from "@/lib/utils"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { InvitationInsertType } from "@/types/database"
import { TRPCError } from "@trpc/server"

export class InvitationController {
  static async handleInvitationSkip(
    userId: string,
    workspaceId: string,
    emails: string[],
  ) {
    if (emails.length <= 0) {
      await OnboardingDatabaseService.updateOnboardingData(
        "completed",
        "collaborate",
        userId,
      )

      return TrpcResponseHandler({
        message: "invitationCreate",
        redirect: `${workspaceId}/dashboard`,
      })
    }
  }

  static async validateInput(
    emails: string[],
    userEmail: string,
  ): Promise<void> {
    if (emails.includes(userEmail)) {
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

  static async checkWorkspaceMemberShip(
    workspaceId: string,
    lengthOfEmails: number,
  ) {
    const [subscription, memberCount] = await Promise.all([
      SubscriptionDBService.getWorkspaceSubscriptionStatus(workspaceId),
      MemeberDatabaseService.getMembersCount(workspaceId),
    ])

    if (!subscription.isSubscribed) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message:
          "Your subscription is inactive or has expired. Please update your plan to continue.",
      })
    }

    if (
      memberCount.count + lengthOfEmails >=
      ServerFilters.getPlanLimits(subscription.plan).maxMembers
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Member limit reached for the ${subscription.plan} plan.`,
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

  static formatInvitationResponse(invitations: InvitationInsertType[]) {
    return invitations.map(({ email, id }) => ({
      email,
      link: `${clientEnv.NEXT_PUBLIC_APP_URL}${createRoute(`invite/${id}`, { from: "invitation" })}`,
    }))
  }

  static async updateOnboardingAndSendEmails(
    invitations: InvitationInsertType[],
    userId: string,
  ) {
    await Promise.all([
      invitationLinkService.send({
        data: InvitationController.formatInvitationResponse(invitations),
      }),
      OnboardingDatabaseService.updateOnboardingData(
        "completed",
        "collaborate",
        userId,
      ),
    ])
  }
}
