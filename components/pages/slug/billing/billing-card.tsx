import { BillingActionButton } from "@/components/pages/slug/billing/billing-action-button"
import { BillingInfo } from "@/components/ui/billing-info"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DateService } from "@/lib/services/date-service"
import type { WorkspaceSubscription } from "@/types"
import { LayoutGrid } from "lucide-react"

interface BillingCardProps {
  subscription: WorkspaceSubscription
}

export function BillingCard({ subscription }: BillingCardProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          Your Plan
        </CardTitle>
        <CardDescription>
          Below are the details of your current plan.
        </CardDescription>
      </CardHeader>
      <Separator />

      <CardContent>
        <div className="flex gap-2 flex-col">
          <BillingInfo
            color="green"
            leftText="You are currently on the"
            rightText={`${subscription.plan} plan`}
            Icon={LayoutGrid}
          />
          <p className="text-muted-foreground text-xs">
            Subscription ends on{" "}
            <span className="font-semibold">
              {DateService.formatDate(subscription.currentPeriodEnd)}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <BillingActionButton />
      </CardFooter>
    </Card>
  )
}
