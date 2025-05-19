import { dbHttp } from "@/database"
import { invitations } from "@/database/schema"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { inviteBulkMembersSchema } from "@/lib/schema/pages/invitation"
import { invitationLinkService } from "@/lib/strategies/email-strategy"
import { InvitationController } from "@/trpc/controller/invitation-service"
import { TrpcResponseHandler } from "@/trpc/lib/handlers/response-handler"
import { protectedProcedure } from "@/trpc/procedures/root"

export const createBulkInvitation = protectedProcedure
  .input(inviteBulkMembersSchema)
  .mutation(async (props) => {
    const { id: userId, email: userEmail } = props.ctx.user
    const { emails } = props.input

    const workspace = await InvitationController.getWorkspace(userId)
    if (emails.length === 0) {
      await InvitationController.handleEmptyInput(userId, workspace.id)
    }

    await InvitationController.validateInput(props.input, userEmail)
    await InvitationController.checkExistingInvitations(workspace.id, emails)
    const invitationValues = InvitationController.createInvitationValues(
      emails,
      workspace.id,
      userId,
    )

    if (emails.length > 0) {
      const response = await dbHttp
        .insert(invitations)
        .values(invitationValues)
        .returning()
      const formattedResponse =
        InvitationController.formatInvitationResponse(response)

      await Promise.all([
        invitationLinkService.send({ data: formattedResponse }),
        OnboardingDatabaseService.updateOnboardingData(
          "completed",
          "collaborate",
          userId,
        ),
      ])
    }

    return TrpcResponseHandler({
      message: "invitationCreate",
      redirect: `${workspace.id}/dashboard`,
    })
  })
