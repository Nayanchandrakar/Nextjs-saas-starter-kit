import { dbHttp, dbServerless } from "@/database"
import {
  permissions as permissionTable,
  rolePermissions,
  roles as roleTable,
} from "@/database/schema"
import { DEFAULT_ROLES } from "@/lib/constants/rbac/roles"
import { MapService } from "@/lib/services/map-service"

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
}
