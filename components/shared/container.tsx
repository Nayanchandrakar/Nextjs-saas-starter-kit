import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import React from "react"

type ContainerProps = React.ComponentProps<"div"> & {
  asChild?: boolean
}

export const Container = ({
  className,
  children,
  asChild = false,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(
        "max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-8 w-full h-full",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

type SidebarContainerProps = React.ComponentProps<"section"> & {
  asChild?: boolean
}

export const SidebarContainer = ({
  className,
  children,
  asChild = false,
  ...props
}: SidebarContainerProps) => {
  const Comp = asChild ? Slot : "section"
  return (
    <Comp
      className={cn(
        "mx-auto flex size-full max-w-7xl flex-col gap-y-4 px-6 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
