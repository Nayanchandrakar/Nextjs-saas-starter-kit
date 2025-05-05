import { dbHttp } from "@/database"
import { workspaceMembers } from "@/database/schema"
import { desc, eq } from "drizzle-orm"

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
    const [member] = await dbHttp
      .select({
        workspaceId: workspaceMembers.workspaceId,
      })
      .from(workspaceMembers)
      .where(eq(workspaceMembers.userId, userId))
      .orderBy(desc(workspaceMembers.createdAt))
      .limit(1)
    return member
  }
}
