import { pgEnum, timestamp } from "drizzle-orm/pg-core"

// Global utils
export const dateCreation = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
}

// Onboarding utils
export const onboardingStatus = ["pending", "completed"] as const
export const onboardingSteps = ["profile", "workspace", "collaborate"] as const
export const onboardingStatusEnum = pgEnum(
  "onboarding_status",
  onboardingStatus,
)
export const onboardingStepEnum = pgEnum("onboarding_step", onboardingSteps)

// Invitation utils
export const role = ["admin", "member", "owner"] as const
export const invitationStatus = ["pending", "expired", "accepted"] as const
export const roleEnum = pgEnum("role", role)
export const invitationStatusEnum = pgEnum(
  "invitation_status",
  invitationStatus,
)
