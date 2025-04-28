import { users, workspaces } from "@/database/schema"
import { dateCreation, invitationStatusEnum, roleEnum } from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const invitations = pgTable(
  "invitation",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    email: text("email").notNull(),
    role: roleEnum("role").default("member"),
    expiresAt: timestamp("expires_at").notNull(),
    invitationStatus:
      invitationStatusEnum("invitation_status").default("pending"),
    invitedBy: text("invited_by")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    ...dateCreation,
  },
  (t) => ({
    emailIndex: index("invitation_email_index").on(t.email),
    invitedByIndex: index("invited_by_index").on(t.invitedBy),
    workspaceIdIndex: index("invitation_workspaceId_index").on(t.workspaceId),
  }),
)

export { invitationStatusEnum, roleEnum }
