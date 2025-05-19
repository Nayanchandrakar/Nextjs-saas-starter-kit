import { roles, users, workspaces } from "@/database/schema"
import { dateCreation } from "@/database/utils"
import { index, pgTable, primaryKey, text } from "drizzle-orm/pg-core"

// Workspace Members Table
export const workspaceMembers = pgTable(
  "workspace_members",
  {
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id),
    ...dateCreation,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.workspaceId] }),
    workspaceIdIndex: index("members_workspace_id_index").on(t.workspaceId),
    userIdIndex: index("members_user_id_index").on(t.userId),
    roleIdIndex: index("members_role_id_index").on(t.roleId),
  }),
)
