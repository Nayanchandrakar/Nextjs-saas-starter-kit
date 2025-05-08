import { InvitationDatabaseService } from "@/database/services/invitation-service"
import { MemeberDatabaseService } from "@/database/services/member-service"
import { RBACService } from "@/database/services/rbac-service"
import { role } from "@/database/utils"

export type RoleType = (typeof role)[number]

export const handleInvitationRequest = async (
  userId: string,
  workspaceId: string,
  role: RoleType | null,
  invitationId: string,
) => {
  const { id } = await RBACService.getRoleByName(role!)

  await Promise.all([
    MemeberDatabaseService.createMember(id, userId, workspaceId),
    InvitationDatabaseService.updateInvitation(invitationId),
  ])
}
