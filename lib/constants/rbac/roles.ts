import { PERMISSIONS } from "@/lib/constants/rbac/permissions"

export type DefaultRole = {
  name: string
  description: string
  permissions: string[]
}

export const DEFAULT_ROLES: DefaultRole[] = [
  {
    name: "owner",
    description: "Workspace owner with full access",
    permissions: ["*"],
  },
  {
    name: "admin",
    description: "Workspace administrator",
    permissions: [
      PERMISSIONS.VIEW_MEMBERS,
      PERMISSIONS.CREATE_MEMBERS,
      PERMISSIONS.UPDATE_MEMBERS,
      PERMISSIONS.DELETE_MEMBERS,
    ],
  },
  {
    name: "member",
    description: "Regular workspace member",
    permissions: [PERMISSIONS.VIEW_MEMBERS],
  },
]
