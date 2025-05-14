import { cn } from "@/lib/utils"

type SettingsHeadingProps = React.ComponentProps<"div"> & {
  titleClassName?: string
  descriptionClassName?: string
  title: string
  description: string
}

export function SettingsHeading({
  className,
  titleClassName,
  descriptionClassName,
  description,
  title,
  ...props
}: SettingsHeadingProps) {
  return (
    <div className={cn("grid gap-y-2 px-8 pt-8", className)} {...props}>
      <h1 className={cn("text-sm font-semibold", titleClassName)}>{title}</h1>
      <p className={cn("text-muted-foreground text-sm", descriptionClassName)}>
        {description}
      </p>
    </div>
  )
}
