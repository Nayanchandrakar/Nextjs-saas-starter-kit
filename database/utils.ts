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

// Subscription utils
export const subscriptionPlans = ["free", "starter", "pro"] as const
export const subscriptionStatus = [
  "active",
  "incomplete",
  "incomplete_expired",
  "trialing",
  "past_due",
  "canceled",
  "unpaid",
  "paused",
] as const
export const subscriptionPlanEnum = pgEnum("plan", subscriptionPlans)
export const subscriptionStatusEnum = pgEnum("status", subscriptionStatus)
