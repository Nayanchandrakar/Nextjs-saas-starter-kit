import { NoActiveSubscription } from "@/components/pages/invitation/no-active-subscription"
import { SubscriptionDBService } from "@/database/services/subscription-service"
import type { WorkspaceSubscription } from "@/types"

type DataType = {
  subscription: WorkspaceSubscription
}

interface SubscriptionProviderProps {
  workspaceId: string
  children: ((data: DataType) => React.ReactNode) | React.ReactNode
}

/**
 * A provider component that fetches the subscription status for a given workspace
 * and conditionally renders its children based on the subscription status.
 * If no active subscription is found, it renders the NoActiveSubscription component.
 * Otherwise, it renders the provided children, either directly or by passing
 * the subscription data to a render prop function.
 *
 * @param props - The props for the SubscriptionProvider component.
 * @param props.workspaceId - The ID of the workspace to check the subscription for.
 * @param props.children - Either a React node or a function that receives subscription data and returns a React node.
 * @returns A React node based on the subscription status or the provided children.
 */
export async function SubscriptionProvider({
  workspaceId,
  children,
}: SubscriptionProviderProps) {
  const subscription =
    await SubscriptionDBService.getWorkspaceSubscriptionStatus(workspaceId)

  if (!subscription.isSubscribed) {
    return NoActiveSubscription()
  }

  if (typeof children === "function") {
    return children({ subscription })
  }

  return children
}
