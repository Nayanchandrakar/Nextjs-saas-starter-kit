import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const InputSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <Skeleton className={cn("w-full h-9", className)} {...props} />
}
