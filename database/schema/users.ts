import {
  dateCreation,
  onboardingStatusEnum,
  onboardingStepEnum,
} from "@/database/utils"
import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  ...dateCreation,
})

export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  ...dateCreation,
})

export const verification = pgTable("verification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ...dateCreation,
})

export const userOnboarding = pgTable("user_onboarding", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  onboardingStatus: onboardingStatusEnum("onboarding_status")
    .default("pending")
    .notNull(),
  onboardingStep: onboardingStepEnum("onboarding_step")
    .default("profile")
    .notNull(),
  ...dateCreation,
})

export { onboardingStatusEnum, onboardingStepEnum }
