export const PERMISSIONS = {
  VIEW_ITEMS: "view:items",
  CREATE_ITEMS: "create:items",
  UPDATE_ITEMS: "update:items",
  DELETE_ITEMS: "delete:items",
  VIEW_MEMBERS: "view:members",
  CREATE_MEMBERS: "create:members",
  UPDATE_MEMBERS: "update:members",
  DELETE_MEMBERS: "delete:members",
  MANAGE_MEMBERS: "manage:members",
  INVITE_MEMBERS: "invite:members",
  REMOVE_MEMBERS: "remove:members",
  MANAGE_ROLES: "manage:roles",
  MANAGE_WORKSPACE: "manage:workspace",
  DELETE_WORKSPACE: "delete:workspace",
  TRANSFER_OWNERSHIP: "transfer:ownership",
} as const

export type Permissions = keyof typeof PERMISSIONS
