import { dbHttp } from "@/database"
import { invitations } from "@/database/schema"
import { and, eq, inArray } from "drizzle-orm"

export async function getExistingInvitations(
  workspaceId: string,
  emails: string[],
) {
  const existingInvites = await dbHttp
    .select({
      id: invitations.id,
    })
    .from(invitations)
    .where(
      and(
        eq(invitations.workspaceId, workspaceId),
        inArray(invitations.email, emails),
      ),
    )

  return existingInvites
}

export async function getInvitationById(invitationId: string) {
  const [invitation] = await dbHttp
    .select()
    .from(invitations)
    .where(eq(invitations.id, invitationId))
    .limit(1)
  return invitation
}
