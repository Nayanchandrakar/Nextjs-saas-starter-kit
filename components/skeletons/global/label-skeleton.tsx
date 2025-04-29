import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const LabelSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <Skeleton className={cn("w-[5rem] h-5", className)} {...props} />
}
