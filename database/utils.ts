import { pgEnum, timestamp } from "drizzle-orm/pg-core"

export const dateCreation = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
}

export const onboardingStatusEnum = pgEnum("onboarding_status", [
  "pending",
  "completed",
])
export const onboardingStepEnum = pgEnum("onboarding_step", [
  "profile",
  "workspace",
  "collaborate",
])
