import { getExistingInvitations } from "@/database/helpers/invitations"
import { updateOnboardingData } from "@/database/helpers/onboarding"
import { getLastWorkspaceCreated } from "@/database/helpers/workspaces"
import { INVITATION_EXPIRY_DATE } from "@/lib/constants/app-config"
import messageJson from "@/lib/constants/message.json"
import { clientEnv } from "@/lib/utilities/client-env"
import { createRoute } from "@/lib/utils"
import { TRPCError } from "@trpc/server"

export class InvitationService {
  static async handleEmptyInput(userId: string) {
    await updateOnboardingData("completed", "collaborate", userId)

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
    const workspace = await getLastWorkspaceCreated(userId)
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
    const existingInvites = await getExistingInvitations(workspaceId, emails)
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
      expiresAt: INVITATION_EXPIRY_DATE,
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
