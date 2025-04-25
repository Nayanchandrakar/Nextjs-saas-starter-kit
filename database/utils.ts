import { pgEnum, timestamp } from "drizzle-orm/pg-core"

export const dateCreation = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
}

export const onboardingStatus = ["pending", "completed"] as const
export const onboardingSteps = ["profile", "workspace", "collaborate"] as const

export const onboardingStatusEnum = pgEnum(
  "onboarding_status",
  onboardingStatus,
)
export const onboardingStepEnum = pgEnum("onboarding_step", onboardingSteps)
