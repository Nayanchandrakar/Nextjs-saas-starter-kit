import { Badge } from "@/components/ui/badge"
import { ServerFilters } from "@/lib/services/server-filters"
import type { WorkspaceSubscription } from "@/types"
import { Plus } from "lucide-react"
import Link from "next/link"

type WorkspaceSubscriptionUsageProps = {
  subscription: WorkspaceSubscription
  noOfCreatedWorkspaces: number
}

export async function WorkspaceSubscriptionUsage({
  subscription,
  noOfCreatedWorkspaces,
}: WorkspaceSubscriptionUsageProps) {
  const plan = ServerFilters.getPlanLimits(subscription.plan)

  return (
    <div className="flex items-center justify-between gap-2 border rounded-lg border-dashed px-4 py-2 max-w-3xl">
      <p className="font-semibold text-xs">
        You have {noOfCreatedWorkspaces} of {plan.maxWorkspaces} workspaces
        available in your plan
      </p>

      <Badge asChild className="cursor-pointer">
        <Link href="/join">
          <Plus className="size-5" />
          New Workspace
        </Link>
      </Badge>
    </div>
  )
}
