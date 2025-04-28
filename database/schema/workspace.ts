import { users } from "@/database/schema"
import { dateCreation } from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import { index, pgTable, text, unique } from "drizzle-orm/pg-core"

export const workspaces = pgTable(
  "workspace",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    logo: text("logo"),
    slug: text("slug").notNull().unique(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...dateCreation,
  },
  (t) => ({
    ownerIdIndex: index("ownerId_index").on(t.ownerId),
    slugUniqueIndex: unique("slug_unique_index").on(t.slug),
  }),
)
