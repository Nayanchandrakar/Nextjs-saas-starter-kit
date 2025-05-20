import { workspaces } from "@/database/schema"
import {
  dateCreation,
  subscriptionPlanEnum,
  subscriptionStatusEnum,
} from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const subscriptions = pgTable(
  "subscription",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    plan: subscriptionPlanEnum("plan").default("free").notNull(),
    status: subscriptionStatusEnum("status").default("active").notNull(),
    priceId: text("price_id").notNull(),
    customerId: text("customer_id").unique(),
    subscriptionId: text("subscription_id").unique(),
    currentPeriodEnd: timestamp("current_period_end", {
      mode: "date",
    }).notNull(),
    ...dateCreation,
  },
  (t) => ({
    workspaceIdIndex: index("sub_workspace_id_index").on(t.workspaceId),
  }),
)

export { subscriptionPlanEnum, subscriptionStatusEnum }
