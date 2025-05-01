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
