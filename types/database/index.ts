import { userOnboarding, workspaces } from "@/database/schema"

export type OnboardingType = typeof userOnboarding.$inferSelect
export type WorkspaceType = typeof workspaces.$inferSelect
