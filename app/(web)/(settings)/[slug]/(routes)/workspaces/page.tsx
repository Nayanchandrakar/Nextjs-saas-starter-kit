import { getCategorizedUserWorkspaces } from "@/app/actions/pages/workspaces/get-workspaces"
import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { MyWorkspacesCard } from "@/components/pages/slug/workspaces/my-worskapaces-card"
import { SharedWorkspacesCard } from "@/components/pages/slug/workspaces/shared-workspaces-card"
import { WorkspaceSubscriptionUsage } from "@/components/pages/slug/workspaces/workspace-subscription-usage"
import { MemberProvider } from "@/components/providers/member-provider"
import { SidebarContainer } from "@/components/shared/container"
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
        const { ownedWorkspaces, sharedWorkspaces, ownedWorkspaceCount } =
          await getCategorizedUserWorkspaces(user.id)
        return (
          <SidebarContainer>
            <SettingsHeading
              title="Workspaces"
              description="Manage your workspaces"
            />
            <WorkspaceSubscriptionUsage
              subscription={subscription}
              noOfCreatedWorkspaces={ownedWorkspaceCount}
            />
            <MyWorkspacesCard workspaces={ownedWorkspaces} slug={slug} />
            <SharedWorkspacesCard
              sharedWorkspaces={sharedWorkspaces}
              slug={slug}
            />
          </SidebarContainer>
        )
      }}
    </MemberProvider>
  )
}
