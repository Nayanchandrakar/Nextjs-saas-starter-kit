import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { SidebarContainer } from "@/components/shared/container"
import { ListComponent } from "@/components/shared/list-component"
import { ButtonSkeleton } from "@/components/skeletons/global/button-skeleton"
import { LabelSkeleton } from "@/components/skeletons/global/label-skeleton"
import { ParaSkeleton } from "@/components/skeletons/global/para-skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Laptop } from "lucide-react"

export default function Loading() {
  return (
    <SidebarContainer>
      <SettingsHeading
        title="Profile"
        description="Manage your profile settings"
      />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-semibold">
            Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="rounded-full size-12" />

              <div className="flex flex-col text-sm gap-2">
                <ParaSkeleton className="w-24" />
                <ParaSkeleton className="w-32" />
              </div>
            </div>
            <ButtonSkeleton />
          </div>

          <div className="mt-8 border-l-2 pl-3">
            <p className="text-xs text-muted-foreground">Active Sessions</p>
            <ListComponent
              data={Array.from({ length: 2 })}
              className="py-2 gap-3 flex flex-col"
              renderItem={(_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-medium capitalize"
                >
                  <Laptop className="size-4" />
                  <ParaSkeleton className="w-14" />
                  <ParaSkeleton className="w-16" />
                  <LabelSkeleton className="w-14 h-4" />
                </div>
              )}
            />
          </div>
          <Separator className="mt-6" />
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonSkeleton />
        </CardFooter>
      </Card>

      <Card className="max-w-3xl border shadow-xs border-destructive/40 dark:border-destructive/50">
        <CardHeader>
          <CardTitle>Delete profile</CardTitle>
          <CardDescription>
            This account, along with all associated workspaces and data, will be
            permanently deleted. This action is irreversible and cannot be
            undone.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-y-2">
            <ParaSkeleton className="w-32" />
            <p className="text-muted-foreground text-xs flex items-center gap-2">
              Account created on
              <Skeleton className="w-24 h-3" />
            </p>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonSkeleton />
        </CardFooter>
      </Card>
    </SidebarContainer>
  )
}
