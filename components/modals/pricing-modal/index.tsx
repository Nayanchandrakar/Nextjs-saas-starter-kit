import { Modal } from "@/components/modals/pricing-modal/modal"
import { SubscriptionDBService } from "@/database/services/subscription-service"
import { MapService } from "@/lib/services/map-service"

export async function PricingModal({
  workspaceId,
}: {
  workspaceId: string
}) {
  const subscription =
    await SubscriptionDBService.getWorkspaceSubscriptionStatus(workspaceId)

  const initialPlan = MapService.getSubscriptionDetails(
    subscription.priceId,
    subscription.plan,
  )

  if (initialPlan) {
    return <Modal initialPlan={initialPlan!} workspaceId={workspaceId} />
  }

  return null
}
