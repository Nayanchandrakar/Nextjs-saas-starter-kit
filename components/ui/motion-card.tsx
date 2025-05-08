"use client"

import { cn } from "@/lib/utils"
import { type HTMLMotionProps, motion } from "motion/react"

type MotionCardProps = HTMLMotionProps<"div"> & {
  className?: string
  children?: React.ReactNode
}

export function MotionCard({ className, ...props }: MotionCardProps) {
  return (
    <motion.div
      data-slot="card"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  )
}
