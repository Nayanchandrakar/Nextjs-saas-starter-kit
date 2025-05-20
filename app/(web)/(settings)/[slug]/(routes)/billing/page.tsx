import { SettingsHeading } from "@/components/pages/settings/settings-heading"
import { BillingCard } from "@/components/pages/slug/billing/billing-card"
import { MemberProvider } from "@/components/providers/member-provider"
import { SubscriptionProvider } from "@/components/providers/subscription-provider"
import { SidebarContainer } from "@/components/shared/container"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

type BillingPageProps = {
  params: Promise<SearchParams>
}

export default async function BillingPage({ params }: BillingPageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <MemberProvider slug={slug}>
      {({ workspace }) => (
        <SubscriptionProvider workspaceId={workspace.id}>
          {async ({ subscription }) => {
            return (
              <SidebarContainer>
                <SettingsHeading
                  title="Billing"
                  description="Manage your billing information"
                />
                <BillingCard subscription={subscription} />
              </SidebarContainer>
            )
          }}
        </SubscriptionProvider>
      )}
    </MemberProvider>
  )
}
