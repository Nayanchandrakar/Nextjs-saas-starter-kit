import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import React from "react"

interface ContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(
          "max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-8 w-full h-full",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Container.displayName = "Container"

export default Container
