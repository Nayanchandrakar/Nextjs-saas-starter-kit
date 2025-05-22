import { loadDashboardParams } from "@/lib/nuqs/search-params"
import type { SearchParams } from "nuqs/server"
import { Fragment } from "react"

import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import { SettingsModalProvider } from "@/components/providers/settings-modal-provider"
import { TopNavigation } from "@/components/sidebars/dashboard/top-navigation"
import { SettingsDashboard } from "@/components/sidebars/settings/settings-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SettingLayoutProps = {
  children: React.ReactNode
  params: Promise<SearchParams>
}

export default async function SettingsLayout({
  children,
  params,
}: SettingLayoutProps) {
  const [{ user }, { slug }] = await Promise.all([
    handleAuthRequest(),
    loadDashboardParams(params),
  ])

  const workspace = await handleDashboardRequest(user.id, slug)

  return (
    <Fragment>
      <SettingsModalProvider workspace={workspace} />
      <SidebarProvider>
        <SettingsDashboard slug={slug} user={user} />
        <SidebarInset>
          <TopNavigation />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  )
}
