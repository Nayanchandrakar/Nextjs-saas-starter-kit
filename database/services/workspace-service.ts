import { dbHttp } from "@/database"
import { workspaceMembers, workspaces } from "@/database/schema"
import { and, count, desc, eq } from "drizzle-orm"

export class WorkSpaceDatabaseService {
  /**
   * Checks whether the given owner has any workspaces.
   *
   * @param ownerId - The ID of the workspace owner.
   * @returns The first workspace found, or `undefined` if none exist.
   */
  static async hasWorkSpaces(ownerId: string) {
    const [data] = await dbHttp
      .select({ id: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId))
      .limit(1)
    return data
  }

  static async getWorkspaceCount(ownerId: string) {
    const [workspaceCount] = await dbHttp
      .select({ count: count() })
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId))
      .limit(1)

    return workspaceCount
  }

  /**
   * Retrieves a workspace by its owner ID and slug.
   *
   * @param ownerId - The ID of the workspace owner.
   * @param slug - The unique slug identifier for the workspace.
   * @returns The workspace matching the owner and slug, or `undefined` if not found.
   */
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

  /**
   * Retrieves the most recently created workspace for a given owner.
   *
   * @param ownerId - The ID of the workspace owner.
   * @returns The latest workspace created by the owner, or `undefined` if none exist.
   */
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

  /**
   * Retrieves workspace details by its ID.
   *
   * @param workspaceId - The ID of the workspace.
   * @returns The workspace with the given ID, or `undefined` if not found.
   */
  static async getWorkspaceById(workspaceId: string) {
    const [data] = await dbHttp
      .select({
        id: workspaces.id,
        name: workspaces.name,
        slug: workspaces.slug,
      })
      .from(workspaces)
      .where(eq(workspaces.id, workspaceId))
      .limit(1)
    return data
  }

  /**
   * Retrieves all workspaces associated with the given user.
   * This includes workspaces where the user is a member.
   *
   * @param userId - The ID of the user whose workspaces are to be fetched.
   * @returns A list of workspaces the user is a member of, ordered by the join date (most recent first).
   */
  static async getAllUserWorkspaces(userId: string) {
    const workspace = await dbHttp
      .select({
        id: workspaces.id,
        ownerId: workspaces.ownerId,
        slug: workspaces.slug,
        name: workspaces.name,
        logo: workspaces.logo,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaces.id, workspaceMembers.workspaceId),
      )
      .where(eq(workspaceMembers.userId, userId))
      .orderBy(desc(workspaces.createdAt))

    return workspace
  }

  /**
   * Retrieves all workspaces created by a specific user, sorted by creation date in descending order.
   * @param userId - The unique identifier of the user whose workspaces are to be retrieved.
   * @returns A promise that resolves to an array of workspace objects owned by the specified user.
   * @async
   */
  static async getUserCreatedWorkspaces(userId: string) {
    const workspace = await dbHttp
      .select()
      .from(workspaces)
      .where(eq(workspaces.ownerId, userId))
      .orderBy(desc(workspaces.createdAt))

    return workspace
  }

  static async deleteWorkspace(userId: string, workspaceId: string) {
    const [workspace] = await dbHttp
      .delete(workspaces)
      .where(
        and(eq(workspaces.ownerId, userId), eq(workspaces.id, workspaceId)),
      )
      .returning({ logo: workspaces.logo, slug: workspaces.slug })

    return workspace
  }
}
