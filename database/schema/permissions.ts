import { dateCreation } from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import {
  index,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const roles = pgTable(
  "roles",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull().unique(),
    description: text("description"),
    ...dateCreation,
  },
  (t) => ({
    nameUniqueIndex: uniqueIndex("roles_name_unique_index").on(t.name),
  }),
)

export const permissions = pgTable(
  "permissions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull().unique(),
    description: text("description"),
    ...dateCreation,
  },
  (t) => ({
    nameUniqueIndex: uniqueIndex("permissions_name_unique_index").on(t.name),
  }),
)

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    ...dateCreation,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
    roleIdIndex: index("role_permission_role_id_index").on(t.roleId),
    permissionIdIndex: index("role_permission_permission_id_index").on(
      t.permissionId,
    ),
  }),
)
