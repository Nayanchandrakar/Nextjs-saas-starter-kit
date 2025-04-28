import { dbHttp } from "@/database"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

export async function getUser(userId: string) {
  const [data] = await dbHttp
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
  return data
}
