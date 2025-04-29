import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

export const buttonSkeletonVariants = cva("", {
  variants: {
    size: {
      default: "h-8 w-24",
      sm: "h-8 w-20 rounded-md",
      lg: "h-10 w-32 rounded-md",
      icon: "size-9",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonSkeletonVariants> {}

export function ButtonSkeleton({ className, size, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn(buttonSkeletonVariants({ size, className }), "rounded-md")}
      {...props}
    />
  )
}
