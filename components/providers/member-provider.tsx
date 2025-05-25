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
 * Ensures authenticated access to a workspace, verifies active subscription, and provides user, workspace, and subscription data to children.
 * Renders NotFound if the workspace is invalid or NoActiveSubscription if the subscription is incomplete.
 * @param props - The component props.
 * @param props.slug - The slug identifying the workspace.
 * @param props.children - A render prop function or React node to render with user, workspace, and subscription data.
 * @returns The rendered children with data, NotFound if the workspace is not found, or NoActiveSubscription if the subscription is inactive.
 * @throws Error if authentication, workspace retrieval, or subscription status check fails.
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
