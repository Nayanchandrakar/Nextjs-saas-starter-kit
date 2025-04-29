import { dbHttp } from "@/database"
import { workspaces } from "@/database/schema"
import { and, eq } from "drizzle-orm"

export async function hasWorkSpaces(ownerId: string) {
  const [data] = await dbHttp
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.ownerId, ownerId))
    .limit(1)
  return data
}

export async function getWorkSpacesByUserIdAndSlug(
  ownerId: string,
  slug: string,
) {
  const [workspace] = await dbHttp
    .select({
      id: workspaces.id,
    })
    .from(workspaces)
    .where(and(eq(workspaces.ownerId, ownerId), eq(workspaces.slug, slug)))
    .limit(1)

  return workspace
}
