import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const ParaSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <Skeleton className={cn("w-[5rem] h-3", className)} {...props} />
}
