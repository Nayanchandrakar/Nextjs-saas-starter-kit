"use client"

import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { WorkspaceActionsCard } from "@/components/pages/slug/workspaces/workspace-actions-card"
import { ListComponent } from "@/components/shared/list-component"
import { WorkspaceType } from "@/types/database"

type MyWorkspacesCardProps = {
  workspaces: WorkspaceType[]
  slug: string
}

export function MyWorkspacesCard({ workspaces, slug }: MyWorkspacesCardProps) {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <SettingsHeading
        title="Workspaces"
        description="Manage your workspaces"
      />

      <div className="border-border/80 rounded-xl border shadow-xs">
        <ListComponent
          data={workspaces}
          className="flex flex-col divide-y"
          renderItem={(data) => (
            <WorkspaceActionsCard key={data.id} workspace={data} slug={slug} />
          )}
        />
      </div>
    </div>
  )
}
