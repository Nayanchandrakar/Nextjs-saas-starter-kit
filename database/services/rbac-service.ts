import { dbHttp, dbServerless } from "@/database"
import {
  permissions as permissionTable,
  rolePermissions,
  roles as roleTable,
  roles,
  workspaceMembers,
} from "@/database/schema"
import { PermissionType } from "@/lib/constants/rbac/permissions"
import { DEFAULT_ROLES } from "@/lib/constants/rbac/roles"
import { MapService } from "@/lib/services/map-service"
import { and, eq, inArray } from "drizzle-orm"

export class RBACService {
  constructor() {}

  static async initializeRBAC() {
    await Promise.all([
      dbHttp.delete(permissionTable),
      dbHttp.delete(rolePermissions),
      dbHttp.delete(roleTable),
    ])

    await dbServerless.transaction(async (tx) => {
      const permissions = await tx
        .insert(permissionTable)
        .values(MapService.formattedPermissions())
        .returning()

      for (const role of DEFAULT_ROLES) {
        const [insertedRole] = await tx
          .insert(roleTable)
          .values(role)
          .returning()
        const permissionsToAssign = role.permissions.includes("*")
          ? permissions
          : permissions.filter((perm) => role.permissions.includes(perm.name))

        const rolePermissionValues = permissionsToAssign.map((perm) => ({
          roleId: insertedRole.id,
          permissionId: perm.id,
        }))
        await tx.insert(rolePermissions).values(rolePermissionValues)
      }
    })
  }

  static async hasPermission(
    userId: string,
    workspaceId: string,
    permission: PermissionType,
  ) {
    const result = await dbHttp
      .select({
        id: permissionTable.id,
      })
      .from(workspaceMembers)
      .innerJoin(roles, eq(workspaceMembers.roleId, roles.id))
      .innerJoin(permissionTable, eq(roles.id, rolePermissions.roleId))
      .innerJoin(
        permissionTable,
        eq(rolePermissions.permissionId, permissionTable.id),
      )
      .where(
        and(
          eq(workspaceMembers.userId, userId),
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(permissionTable.name, permission),
        ),
      )
      .limit(1)
      .$withCache({
        config: { ex: 12 * 60 * 60 * 1000 },
      })

    return result.length > 0
  }

  static async hasPermissions(
    userId: string,
    workspaceId: string,
    permissions: PermissionType[],
  ) {
    const results = await dbHttp
      .select({ name: permissionTable.name })
      .from(workspaceMembers)
      .innerJoin(roles, eq(workspaceMembers.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(
        permissionTable,
        eq(rolePermissions.permissionId, permissionTable.id),
      )
      .where(
        and(
          eq(workspaceMembers.userId, userId),
          eq(workspaceMembers.workspaceId, workspaceId),
          inArray(permissionTable.name, permissions),
        ),
      )
      .$withCache({
        config: { ex: 12 * 60 * 60 * 1000 },
      })

    const granted = new Set(results.map((r) => r.name))
    return permissions.every((perm) => granted.has(perm))
  }
}
