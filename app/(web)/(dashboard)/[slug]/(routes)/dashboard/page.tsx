import { MemberProvider } from "@/components/providers/member-provider"
import { SubscriptionProvider } from "@/components/providers/subscription-provider"
import { SidebarContainer } from "@/components/shared/container"
import { loadDashboardParams } from "@/lib/nuqs/search-params"
import { SearchParams } from "nuqs/server"

type PageProps = {
  params: Promise<SearchParams>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <SidebarContainer>
      <MemberProvider slug={slug}>
        {({ workspace }) => (
          <SubscriptionProvider workspaceId={workspace.id}>
            <div className="flex flex-1 flex-col gap-4 ">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SubscriptionProvider>
        )}
      </MemberProvider>
    </SidebarContainer>
  )
}
