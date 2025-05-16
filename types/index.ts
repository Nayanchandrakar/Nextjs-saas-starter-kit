import { userAgentFromString } from "next/server"
import { WorkspaceType } from "./database"

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
}[]
