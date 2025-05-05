import { dbHttp } from "@/database"
import { invitations } from "@/database/schema"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import messageJson from "@/lib/constants/message.json"
import { inviteBulkMembersSchema } from "@/lib/schema/pages/invitation"
import { invitationLinkService } from "@/lib/strategies/email-strategy"
import { createRoute } from "@/lib/utils"
import { protectedProcedure } from "@/trpc/procedures/root"
import { InvitationService } from "@/trpc/services/invitation-service"
import { after } from "next/server"

export const createBulkInvitation = protectedProcedure
  .input(inviteBulkMembersSchema)
  .mutation(async ({ input, ctx }) => {
    const { emails } = input
    const { user } = ctx

    const workspace = await InvitationService.getWorkspace(user.id)
    if (emails.length === 0) {
      await InvitationService.handleEmptyInput(user.id, workspace.id)
    }

    await InvitationService.validateInput(input, user.email)
    await InvitationService.checkExistingInvitations(workspace.id, emails)
    const invitationValues = InvitationService.createInvitationValues(
      emails,
      workspace.id,
      user.id,
    )

    after(async () => {
      if (emails.length === 0) return
      const response = await dbHttp
        .insert(invitations)
        .values(invitationValues)
        .returning()
      const formattedResponse =
        InvitationService.formatInvitationResponse(response)

      await Promise.all([
        invitationLinkService.send({ data: formattedResponse }),
        OnboardingDatabaseService.updateOnboardingData(
          "completed",
          "collaborate",
          user.id,
        ),
      ])
    })

    return {
      success: true,
      message: messageJson.invitationCreate,
      redirect: createRoute(`${workspace.id}/dashboard`),
    }
  })
