import { ToogleTheme } from "@/components/buttons/theme-toogle"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { configuration } from "@/lib/config"
import Link from "next/link"

export const ActionMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <ToogleTheme />

      {/* X.com profile  */}
      <Link
        href={configuration.social.x}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Icons.X className="size-4 fill-current" aria-hidden="true" />
      </Link>

      {/* Github profile */}
      <Link
        className={buttonVariants({ variant: "outline", size: "icon" })}
        href={configuration.social.github}
      >
        <Icons.Github className="size-4" aria-hidden="true" />
      </Link>

      {/* Dashboard  */}
      <Link href="/callback" className={buttonVariants({ size: "sm" })}>
        Dashboard
      </Link>
    </div>
  )
}
