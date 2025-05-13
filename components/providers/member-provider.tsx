import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import NotFound from "@/app/not-found"

type MemberProviderProps = {
  slug: string
  children: React.ReactNode
}

export async function MemberProvider({ children, slug }: MemberProviderProps) {
  const session = await handleAuthRequest()
  const workspace = await handleDashboardRequest(session.user.id, slug)

  if (!workspace) {
    return NotFound()
  }

  return children
}
