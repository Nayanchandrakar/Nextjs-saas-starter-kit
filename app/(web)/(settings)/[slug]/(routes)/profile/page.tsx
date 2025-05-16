import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { DeleteAccountCard } from "@/components/pages/slug/profile/delete-profile-card"
import { ProfileCard } from "@/components/pages/slug/profile/profile-card"
import { MemberProvider } from "@/components/providers/member-provider"
import { SidebarContainer } from "@/components/shared/container"
import { activeSessions } from "@/lib/authentication/utils"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { MapService } from "@/lib/services/map-service"
import { SearchParams } from "nuqs/server"

type ProfilePageProps = {
  params: Promise<SearchParams>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <MemberProvider slug={slug}>
      {async ({ user }) => {
        const sessions = await activeSessions()
        const formattedSession = MapService.formattedActiveSessions(sessions)

        return (
          <SidebarContainer>
            <SettingsHeading
              title="Profile"
              description="Manage your profile settings"
            />
            <ProfileCard sessions={formattedSession} user={user} />
            <DeleteAccountCard user={user} />
          </SidebarContainer>
        )
      }}
    </MemberProvider>
  )
}
