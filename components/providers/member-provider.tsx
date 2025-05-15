import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import NotFound from "@/app/not-found"
import { User } from "@/types/authentication/client-types"

type DataType = {
  user: User
  workspace: {
    id: string
  }
}

type MemberProviderProps = {
  slug: string
  children: ((data: DataType) => React.ReactNode) | React.ReactNode
}

/**
 * MemberProvider ensures authenticated access to a workspace and provides user/workspace data to children
 * @param props - Component props containing slug and children
 * @returns Rendered children with user/workspace data or NotFound component
 * @throws Error if authentication or workspace fetch fails
 */
export async function MemberProvider({ children, slug }: MemberProviderProps) {
  const session = await handleAuthRequest()
  const workspace = await handleDashboardRequest(session.user.id, slug)

  if (!workspace) {
    return NotFound()
  }

  if (typeof children === "function") {
    return children({ user: session.user, workspace })
  }

  return children
}
