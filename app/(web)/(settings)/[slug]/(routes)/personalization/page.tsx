import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { PersonalizationCard } from "@/components/pages/slug/personalization/personalize-card"
import { MemberProvider } from "@/components/providers/member-provider"
import { SidebarContainer } from "@/components/shared/container"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

type PersonalizationPageProps = {
  params: Promise<SearchParams>
}

export default async function PersonalizationPage({
  params,
}: PersonalizationPageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <MemberProvider slug={slug}>
      <SidebarContainer>
        <SettingsHeading
          title="Personalization"
          description="Set your preferred look day and night themes adjust automatically."
        />
        <PersonalizationCard />
      </SidebarContainer>
    </MemberProvider>
  )
}
