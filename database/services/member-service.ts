import { dbHttp } from "@/database"
import { workspaceMembers, workspaces } from "@/database/schema"
import { and, desc, eq } from "drizzle-orm"

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

  static async isMemberOfWorkspace(userId: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
        slug: workspaces.slug,
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        and(
          eq(workspaces.id, workspaceMembers.workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .orderBy(desc(workspaceMembers.createdAt))
      .limit(1)
    return workspace
  }

  static async hasUserWorkspaceAccess(userId: string, slug: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        and(
          eq(workspaces.id, workspaceMembers.workspaceId),
          eq(workspaces.slug, slug),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .orderBy(desc(workspaceMembers.createdAt))
      .limit(1)

    return workspace
  }
}
