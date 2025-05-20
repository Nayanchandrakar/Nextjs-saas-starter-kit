import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"
import * as React from "react"

const billingVariants = cva(
  "flex items-center gap-x-2 rounded-lg border px-4 py-2",
  {
    variants: {
      color: {
        green:
          "border-green-500/80 bg-green-600/10 text-green-600 dark:text-green-400",
        indigo:
          "border px-4 py-2 border-indigo-500/80 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400",
      },
    },
    defaultVariants: {
      color: "green",
    },
  },
)

type BillingInfoType = React.ComponentProps<"div"> &
  VariantProps<typeof billingVariants> & {
    leftText: string
    rightText: string
    Icon: LucideIcon
  }

export const BillingInfo = ({
  leftText,
  rightText,
  className,
  color,
  Icon,
  ...props
}: BillingInfoType) => {
  return (
    <div className={cn(billingVariants({ color }), className)} {...props}>
      <Icon className="size-4" />
      <span className="text-xs font-semibold">{leftText}</span>
      <span className="ml-auto text-xs font-semibold capitalize">
        {rightText}
      </span>
    </div>
  )
}
