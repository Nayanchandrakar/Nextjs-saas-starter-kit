import { MemeberDatabaseService } from "@/database/services/member-service"
import { redirectToRoute } from "@/lib/utils"

export async function handleDashboardRequest(userId: string, slug: string) {
  const member = await MemeberDatabaseService.hasUserWorkspaceAccess(
    userId,
    slug,
  )
  if (!member) redirectToRoute("callback")
  return member
}
