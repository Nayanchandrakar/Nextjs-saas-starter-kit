import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { ProfileCard } from "@/components/pages/slug/profile/profile-card"
import { MemberProvider } from "@/components/providers/member-provider"
import { SidebarContainer } from "@/components/shared/container"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

type ProfilePageProps = {
  params: Promise<SearchParams>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <MemberProvider slug={slug}>
      <SidebarContainer>
        <SettingsHeading
          title="Profile"
          description="Manage your profile settings"
        />
        <ProfileCard />
      </SidebarContainer>
    </MemberProvider>
  )
}
