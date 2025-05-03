import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

type ErrorIconProps = {
  Icon: LucideIcon
  className?: string
}

type ErrorLinkProps = React.ComponentProps<"a"> & {
  variant?: VariantProps<typeof buttonVariants>["variant"]
}

export const ErrorComponent = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-full min-h-screen flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const ErrorIcon = ({ Icon, className }: ErrorIconProps) => {
  return Icon ? <Icon className={cn("size-5", className)} /> : null
}

const ErrorTitle = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("text-xl font-semibold mt-6", className)} {...props}>
      {children}
    </h2>
  )
}

const ErrorMessage = ({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "mb-6 mt-2 text-center text-sm font-normal leading-6 text-primary/70",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

const ErrorLink = ({
  children,
  variant = "ghost",
  className,
  href,
  ...props
}: ErrorLinkProps) => {
  return (
    <Link
      href={href as string}
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {children}
    </Link>
  )
}

ErrorComponent.Icon = ErrorIcon
ErrorComponent.Title = ErrorTitle
ErrorComponent.Message = ErrorMessage
ErrorComponent.Link = ErrorLink
