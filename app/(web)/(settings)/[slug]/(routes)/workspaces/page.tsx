import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { MyWorkspacesCard } from "@/components/pages/slug/workspaces/my-worskapaces-card"
import { WorkspaceSubscriptionUsage } from "@/components/pages/slug/workspaces/workspace-subscription-usage"
import { MemberProvider } from "@/components/providers/member-provider"
import { SidebarContainer } from "@/components/shared/container"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

type WorkspacesSettingsPageProps = {
  params: Promise<SearchParams>
}

export default async function WorkspacesSettingsPage({
  params,
}: WorkspacesSettingsPageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <MemberProvider slug={slug}>
      {async ({ subscription, user }) => {
        const workspaces =
          await WorkSpaceDatabaseService.getUserCreatedWorkspaces(user.id)
        return (
          <SidebarContainer>
            <SettingsHeading
              title="Workspaces"
              description="Manage your workspaces"
            />
            <WorkspaceSubscriptionUsage
              subscription={subscription}
              noOfCreatedWorkspaces={workspaces.length ?? 0}
            />
            <MyWorkspacesCard workspaces={workspaces} slug={slug} />
          </SidebarContainer>
        )
      }}
    </MemberProvider>
  )
}
