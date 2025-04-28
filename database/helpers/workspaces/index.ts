import { dbHttp } from "@/database"
import { workspaces } from "@/database/schema"
import { eq } from "drizzle-orm"

export async function hasWorkSpaces(ownerId: string) {
  const [data] = await dbHttp
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.ownerId, ownerId))
    .limit(1)
  return data
}
