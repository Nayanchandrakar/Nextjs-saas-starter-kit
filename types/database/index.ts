import { invitations, userOnboarding, workspaces } from "@/database/schema"
import type { ExtractTablesWithRelations } from "drizzle-orm"
import type { NeonQueryResultHKT } from "drizzle-orm/neon-serverless"
import type { PgTransaction } from "drizzle-orm/pg-core"

export type InvitationInsertType = typeof invitations.$inferInsert
export type OnboardingType = typeof userOnboarding.$inferSelect
export type WorkspaceType = typeof workspaces.$inferSelect
export type Transaction = PgTransaction<
  NeonQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>
