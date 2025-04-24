import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export const NavbarLogo = ({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) => {
  return (
    <Link aria-hidden="true" href="/" className={cn(linkClassName)}>
      <Image
        width={35}
        height={35}
        alt="logo"
        src="/logo.png"
        className={cn(className)}
      />
    </Link>
  )
}
