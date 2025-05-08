import { cn } from "@/lib/utils"
import { SquareChartGantt } from "lucide-react"
import Link from "next/link"

export const Logo = ({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) => {
  return (
    <Link aria-hidden="true" href="/" className={cn(linkClassName)}>
      <SquareChartGantt className={cn("size-7 rotate-90", className)} />
    </Link>
  )
}
