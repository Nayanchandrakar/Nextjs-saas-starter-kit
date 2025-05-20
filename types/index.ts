import type { PlanType, StatusType } from "@/types/authentication/server-types"
import { WorkspaceType } from "@/types/database"
import { userAgentFromString } from "next/server"

export type RouteParams = Record<string, string | number | boolean>
export type OauthProviderType = "google" | "github"

export type FormattedWorkspace = {
  label: string
  workspaces: WorkspaceType[]
}

export type isRouteActiveProps = {
  currentPath: string
  targetPath: string
  depth?: number
}

export type formattedSessionsType = {
  userAgent: ReturnType<typeof userAgentFromString>
  token: string
  userId: string
}

export type WorkspaceSubscription = {
  id: string
  plan: PlanType
  priceId: string
  status: StatusType
  currentPeriodEnd: Date
  isSubscribed: boolean
}
