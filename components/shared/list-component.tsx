import { cn } from "@/lib/utils"
import { useId } from "react"

interface ListComponentProps<T> {
  data: T[]
  renderItem: (item: T, id: string, index: number) => React.ReactNode
  className?: string
}

const ListComponent = <T,>({
  data,
  renderItem,
  className,
}: ListComponentProps<T>) => {
  return (
    <div className={cn(className)}>
      {data?.map((item, index) => {
        // biome-ignore lint/correctness/useHookAtTopLevel:
        const id = useId()
        return renderItem(item, id, index)
      })}
    </div>
  )
}

export { ListComponent }
