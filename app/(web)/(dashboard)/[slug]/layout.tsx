import { loadDashboardParams } from "@/lib/nuqs/search-params"
import type { SearchParams } from "nuqs/server"

import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import { TopNavigation } from "@/components/sidebars/dashboard/components/top-navigation"
import { DashboardSidebar } from "@/components/sidebars/dashboard/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { MapService } from "@/lib/services/map-service"

type DashboardLayoutProps = {
  children: React.ReactNode
  params: Promise<SearchParams>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const [{ user }, { slug }] = await Promise.all([
    handleAuthRequest(),
    loadDashboardParams(params),
  ])

  const [_, workspaces] = await Promise.all([
    handleDashboardRequest(user.id, slug),
    WorkSpaceDatabaseService.getAllUserWorkspaces(user.id),
  ])

  const formatWorkspaces = MapService.formatWorkspaces(workspaces, user.id)

  return (
    <SidebarProvider>
      <DashboardSidebar workspaces={formatWorkspaces} slug={slug} />
      <SidebarInset>
        <TopNavigation slug={slug} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
