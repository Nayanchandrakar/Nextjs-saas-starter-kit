import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { WorkspaceActionsCard } from "@/components/pages/slug/workspaces/workspace-actions-card"
import { ListComponent } from "@/components/shared/list-component"
import { WorkspaceType } from "@/types/database"

type SharedWorkspacesCardProps = {
  sharedWorkspaces: WorkspaceType[]
  slug: string
}

export function SharedWorkspacesCard({
  sharedWorkspaces,
  slug,
}: SharedWorkspacesCardProps) {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <SettingsHeading
        title="Member workspaces"
        description="Workspaces you are a member of"
      />

      {sharedWorkspaces.length > 0 && (
        <div className="border-border/80 rounded-xl border shadow-xs">
          <ListComponent
            data={sharedWorkspaces}
            className="flex flex-col divide-y"
            renderItem={(data) => (
              <WorkspaceActionsCard
                isMemberCard
                key={data.id}
                workspace={data}
                slug={slug}
              />
            )}
          />
        </div>
      )}
    </div>
  )
}
