import { users } from "@/database/schema"
import { dateCreation } from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const subscriptions = pgTable(
  "subscription",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: text("status").notNull(),
    priceId: text("price_id").notNull(),
    planId: text("plan_id").notNull(),
    currentPeriodStart: timestamp("current_period_start").notNull(),
    currentPeriodEnd: timestamp("current_period_end").notNull(),
    cancelAt: timestamp("cancel_at"),
    canceledAt: timestamp("canceled_at"),
    ...dateCreation,
  },
  (t) => ({
    userIdIndex: index("subscription_user_id_index").on(t.userId),
  }),
)
