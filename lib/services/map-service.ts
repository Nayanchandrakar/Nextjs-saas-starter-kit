import { PERMISSIONS } from "@/lib/constants/rbac/permissions"

export class MapService {
  static formattedPermissions() {
    const formattedValues = Object.values(PERMISSIONS).map((name) => ({
      name,
      description: `Permission for ${name.replace(":", " ")}`,
    }))

    return formattedValues
  }
}
