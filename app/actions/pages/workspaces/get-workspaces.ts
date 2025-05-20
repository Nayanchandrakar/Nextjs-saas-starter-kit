import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { StringService } from "@/lib/services/string-service"
import { WorkspaceType } from "@/types/database"

interface CategorizedWorkspaces {
  ownedWorkspaces: WorkspaceType[]
  sharedWorkspaces: WorkspaceType[]
  ownedWorkspaceCount: number
}

/**
 * Retrieves and categorizes workspaces for a given user into owned and shared workspaces.
 * @param userId The ID of the user whose workspaces are to be retrieved.
 * @returns An object containing arrays of owned and shared workspaces.
 */
export async function getCategorizedUserWorkspaces(
  userId: string,
): Promise<CategorizedWorkspaces> {
  const workspaces = await WorkSpaceDatabaseService.getAllUserWorkspaces(userId)

  const ownedWorkspaces: WorkspaceType[] = []
  const sharedWorkspaces: WorkspaceType[] = []

  workspaces?.forEach((workspace) => {
    if (StringService.isUserWorkspaceOwner(workspace.ownerId, userId)) {
      ownedWorkspaces.push(workspace)
    } else {
      sharedWorkspaces.push(workspace)
    }
  })

  return {
    ownedWorkspaces,
    sharedWorkspaces,
    ownedWorkspaceCount: ownedWorkspaces?.length ?? 0,
  }
}
