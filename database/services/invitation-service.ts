import { dbHttp } from "@/database"
import { invitations } from "@/database/schema"
import { InvitationInsertType } from "@/types/database"
import { and, eq, gt, inArray } from "drizzle-orm"

export class InvitationDatabaseService {
  static async getExistingInvitations(workspaceId: string, emails: string[]) {
    const existingInvites = await dbHttp
      .select({
        id: invitations.id,
      })
      .from(invitations)
      .where(
        and(
          eq(invitations.workspaceId, workspaceId),
          eq(invitations.invitationStatus, "pending"),
          inArray(invitations.email, emails),
          gt(invitations.expiresAt, new Date()),
        ),
      )

    return existingInvites
  }

  static async getInvitationById(invitationId: string) {
    const [invitation] = await dbHttp
      .select()
      .from(invitations)
      .where(eq(invitations.id, invitationId))
      .limit(1)
    return invitation
  }

  static async deleteInvitation(invitationId: string) {
    await dbHttp.delete(invitations).where(eq(invitations.id, invitationId))
  }

  static async updateInvitation(invitationId: string) {
    await dbHttp
      .update(invitations)
      .set({
        invitationStatus: "accepted",
      })
      .where(eq(invitations.id, invitationId))
  }

  static async createBulkInvitation(values: InvitationInsertType[]) {
    const response = await dbHttp.insert(invitations).values(values).returning()

    return response
  }
}
