import { InvitationDatabaseService } from "@/database/services/invitation-service"
import { inviteBulkMembersSchema } from "@/lib/schema/pages/invitation"
import { InvitationController } from "@/trpc/controller/invitation-controller"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { protectedProcedure } from "@/trpc/procedures/root"

export const createBulkInvitation = protectedProcedure
  .input(inviteBulkMembersSchema)
  .mutation(async (props) => {
    const { emails } = props.input
    const { id: userId, email: userEmail } = props.ctx.user

    const workspaceId = (await InvitationController.getWorkspace(userId)).id
    await InvitationController.handleInvitationSkip(userId, workspaceId, emails)
    await InvitationController.checkWorkspaceMemberShip(
      workspaceId,
      emails.length,
    )
    await InvitationController.validateInput(emails, userEmail)
    await InvitationController.checkExistingInvitations(workspaceId, emails)
    const invitationValues = InvitationController.createInvitationValues(
      emails,
      workspaceId,
      userId,
    )

    const invitations =
      await InvitationDatabaseService.createBulkInvitation(invitationValues)
    await InvitationController.updateOnboardingAndSendEmails(
      invitations,
      userId,
    )

    return TrpcResponseHandler({
      message: "invitationCreate",
      redirect: `${workspaceId}/dashboard`,
    })
  })
