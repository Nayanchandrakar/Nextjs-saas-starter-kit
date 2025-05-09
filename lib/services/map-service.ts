import { PERMISSIONS } from "@/lib/constants/rbac/permissions"
import { StringService } from "@/lib/services/string-service"
import { FormattedWorkspace } from "@/types"
import { WorkspaceType } from "@/types/database"

export class MapService {
  static formattedPermissions() {
    const formattedValues = Object.values(PERMISSIONS).map((name) => ({
      name,
      description: `Permission for ${name.replace(":", " ")}`,
    }))

    return formattedValues
  }

  static formatWorkspaces(data: WorkspaceType[], userId: string) {
    const group: FormattedWorkspace[] = [
      { label: "Personal workspaces", workspaces: [] },
      { label: "Workspaces", workspaces: [] },
    ]

    data?.forEach(({ logo, ...props }) => {
      group[props.ownerId === userId ? 0 : 1]?.workspaces.push({
        logo: StringService.getPlaceholderImage(logo, props.name),
        ...props,
      })
    })

    return group
  }

  static findWorkspaceBySlug(groups: FormattedWorkspace[], slug: string) {
    for (const group of groups) {
      const workspace = group.workspaces.find(
        (workspace) => workspace.slug === slug,
      )
      if (workspace) return workspace
    }
    return undefined
  }
}
