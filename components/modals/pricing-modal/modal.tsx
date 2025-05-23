"use client"

import { ListComponent } from "@/components/shared/list-component"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  COMMON_BENEFITS,
  SUBSCRIPTION_PLANS,
} from "@/lib/constants/subscription-plan"
import { StringService } from "@/lib/services/string-service"
import { cn } from "@/lib/utils"
import {
  PlanType,
  type initialPricingPlan,
} from "@/types/authentication/server-types"
import { Check } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useState } from "react"

interface CurrentPurchase {
  type: PlanType
  priceId: string
}

interface ModalProps {
  initialPlan: initialPricingPlan
}

export function Modal({ initialPlan }: ModalProps) {
  const [currentPurchase, setCurrentPurchase] = useState<CurrentPurchase>({
    type: initialPlan.planType,
    priceId: initialPlan.priceId,
  })

  const [isYearlyPlan, setIsYearlyPlan] = useState(
    StringService.isYearlySubscription(initialPlan.duration),
  )

  const [isOpen, setIsOpen] = useQueryState(
    "upgrade",
    parseAsBoolean.withDefault(false),
  )

  const isCurrentPlan = currentPurchase.priceId === initialPlan.priceId

  const handleBillingToggle = () => {
    setIsYearlyPlan((prev) => {
      setCurrentPurchase((prevPurchase) => ({
        ...prevPurchase,
        billing: StringService.getSubscripionDuration(prev),
      }))
      return !prev
    })
  }

  const handlePlanSelect = (type: PlanType, priceId: string) => {
    setCurrentPurchase({ type, priceId })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Upgrade to Starter or Pro</DialogTitle>
          <ListComponent
            data={COMMON_BENEFITS}
            className="flex flex-col gap-2 mt-3 mb-1"
            renderItem={(label: string) => (
              <span key={label} className="flex items-center gap-2">
                <Check className="size-4 text-rose-500" />
                <span className="text-muted-foreground text-sm">{label}</span>
              </span>
            )}
          />
        </DialogHeader>

        <Separator />

        <ListComponent
          data={Object.values(SUBSCRIPTION_PLANS)}
          className="my-1 space-y-3"
          renderItem={({ type, billing }) => {
            const { price, priceId } = billing[isYearlyPlan ? "year" : "month"]
            return (
              <div
                key={`${type}-${priceId}`}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg border-2 transition duration-300 cursor-pointer bg-card",
                  StringService.isSelectedPlan(currentPurchase.type, type)
                    ? "border-rose-500 bg-rose-500/10"
                    : "hover:bg-accent",
                )}
                role="button"
                onClick={() => handlePlanSelect(type as PlanType, priceId)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  {StringService.isSelectedPlan(initialPlan.planType, type) && (
                    <Badge className="dark:bg-rose-800/40 bg-rose-200/50 text-rose-500">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-semibold text-sm">
                    {StringService.formatCurrency(price)}
                    <span className="text-muted-foreground">
                      / {StringService.getSubscripionDuration(isYearlyPlan)}
                    </span>
                  </span>
                </div>
              </div>
            )
          }}
        />

        <div className="mt-3 p-4 bg-card rounded-lg border space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Enjoy 2 Free Months</span>
            <Switch
              checked={isYearlyPlan}
              onCheckedChange={handleBillingToggle}
              className="h-5 w-8 [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3 data-[state=checked]:bg-rose-500"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Opt for yearly billing and get two months free of your plan.
          </p>
        </div>

        <DialogFooter>
          <Button
            disabled={isCurrentPlan}
            onClick={() => {
              console.log("Selected plan:", currentPurchase)
            }}
            className="w-full"
          >
            {isCurrentPlan
              ? "Current Plan"
              : `Upgrade to ${StringService.capitalizeFirstLetter(currentPurchase.type)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
