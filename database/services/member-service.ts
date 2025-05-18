import { dbHttp } from "@/database"
import { workspaceMembers, workspaces } from "@/database/schema"
import { and, desc, eq, or } from "drizzle-orm"

export class MemeberDatabaseService {
  constructor() {}

  static async createMember(
    roleId: string,
    userId: string,
    workspaceId: string,
  ) {
    await dbHttp.insert(workspaceMembers).values({
      roleId,
      userId,
      workspaceId,
    })
  }

  static async getUserLatestWorkspace(userId: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
        slug: workspaces.slug,
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaces.id, workspaceMembers.workspaceId),
      )
      .where(
        or(eq(workspaces.ownerId, userId), eq(workspaceMembers.userId, userId)),
      )
      .orderBy(desc(workspaceMembers.createdAt))
      .limit(1)
    return workspace
  }

  static async isMemberOfWorskspace(userId: string, slug: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
        ownerId: workspaces.ownerId,
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaces.id, workspaceMembers.workspaceId),
      )
      .where(
        and(
          eq(workspaces.slug, slug),
          or(
            eq(workspaces.ownerId, userId),
            eq(workspaceMembers.userId, userId),
          ),
        ),
      )
      .limit(1)

    return workspace
  }
}
