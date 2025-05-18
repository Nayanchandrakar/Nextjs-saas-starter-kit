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
    customerId: text("customer_id").unique(),
    subscriptionId: text("subscription_id").unique(),
    currentPeriodEnd: timestamp("current_period_end", {
      mode: "date",
    }).notNull(),
    ...dateCreation,
  },
  (t) => ({
    userIdIndex: index("sub_user_id_index").on(t.userId),
  }),
)
