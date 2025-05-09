import { loadDashboardParams } from "@/lib/nuqs/search-params"
import type { SearchParams } from "nuqs/server"

import { TopNavigation } from "@/components/sidebars/dashboard/components/top-navigation"
import { DashboardSidebar } from "@/components/sidebars/dashboard/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SettingLayoutProps = {
  children: React.ReactNode
  params: Promise<SearchParams>
}

export default async function SettingsLayout({
  children,
  params,
}: SettingLayoutProps) {
  const { slug } = await loadDashboardParams(params)

  return (
    <SidebarProvider>
      <DashboardSidebar slug={slug} />
      <SidebarInset>
        <TopNavigation slug={slug} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
