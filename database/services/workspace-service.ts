import { dbHttp } from "@/database"
import { workspaces } from "@/database/schema"
import { and, desc, eq } from "drizzle-orm"

export class WorkSpaceDatabaseService {
  static async hasWorkSpaces(ownerId: string) {
    const [data] = await dbHttp
      .select({ id: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId))
      .limit(1)
    return data
  }

  static async getWorkSpacesByUserIdAndSlug(ownerId: string, slug: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
      })
      .from(workspaces)
      .where(and(eq(workspaces.ownerId, ownerId), eq(workspaces.slug, slug)))
      .limit(1)

    return workspace
  }

  static async getLastWorkspaceCreated(ownerId: string) {
    const [workspace] = await dbHttp
      .select({
        id: workspaces.id,
      })
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId))
      .orderBy(desc(workspaces.createdAt))
      .limit(1)

    return workspace
  }

  static async getWorkspaceById(workspaceId: string) {
    const [data] = await dbHttp
      .select({ id: workspaces.id, name: workspaces.name })
      .from(workspaces)
      .where(eq(workspaces.id, workspaceId))
      .limit(1)
    return data
  }
}
