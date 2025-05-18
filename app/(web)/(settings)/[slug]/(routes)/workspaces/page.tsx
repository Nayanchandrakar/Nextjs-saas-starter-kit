import { SettingsHeading } from "@/components/pages/settings/settings-heading"
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
      <SidebarContainer>
        <SettingsHeading
          title="Workspaces"
          description="Manage your workspaces"
        />
        Testing
      </SidebarContainer>
    </MemberProvider>
  )
}
