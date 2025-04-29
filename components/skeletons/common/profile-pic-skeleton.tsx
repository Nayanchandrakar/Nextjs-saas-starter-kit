import { Skeleton } from "@/components/ui/skeleton"

export const ProfilePicComponentSkeleton = () => {
  return (
    <div className="inline-flex items-center gap-4 align-top">
      <Skeleton className="size-[4.5rem] rounded-lg" />
      <div className="flex items-start gap-2.5 flex-col">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  )
}
