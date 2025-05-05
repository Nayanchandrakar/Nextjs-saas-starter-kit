import { dbHttp } from "@/database"
import { workspaceMembers } from "@/database/schema"

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
}
