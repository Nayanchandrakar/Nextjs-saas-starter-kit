import { ToogleTheme } from "@/components/buttons/theme-toogle"
import { buttonVariants } from "@/components/ui/button"
import { SparklesIcon } from "lucide-react"
import Link from "next/link"

export const NavigationMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <ToogleTheme />

      <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
        Sign In
      </Link>

      <Link
        href="/callback"
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Get Started
        <SparklesIcon
          className="-me-1 opacity-60"
          size={16}
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}
