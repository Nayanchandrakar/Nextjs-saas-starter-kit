import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import * as React from "react"

const alertVariants = cva(
  "flex items-center gap-x-2 rounded-md p-3 text-sm font-medium",
  {
    variants: {
      variant: {
        success: "bg-green-500/10 text-green-600",
        error: "bg-red-500/10 text-red-600",
        warning: "bg-yellow-500/10 text-yellow-600",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  },
)

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  message: string
}

export const FormAlert = ({
  message,
  className,
  variant,
  ...props
}: AlertProps) => {
  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: Info,
  }[variant || "success"]

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}

export type FormAlertProps = Pick<AlertProps, "message" | "variant">
