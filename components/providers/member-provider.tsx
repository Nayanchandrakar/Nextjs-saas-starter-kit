import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import NotFound from "@/app/not-found"
import { NoActiveSubscription } from "@/components/pages/invitation/no-active-subscription"
import { SubscriptionDBService } from "@/database/services/subscription-service"
import { User } from "@/types/authentication/client-types"

type DataType = {
  user: User
  workspace: {
    id: string
  }
  isSubscribed: boolean
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

  const isSubscribed = await SubscriptionDBService.hasActiveSubscription(
    workspace.ownerId,
  )

  if (!isSubscribed) {
    return NoActiveSubscription()
  }

  if (typeof children === "function") {
    return children({ user: session.user, workspace, isSubscribed })
  }

  return children
}
