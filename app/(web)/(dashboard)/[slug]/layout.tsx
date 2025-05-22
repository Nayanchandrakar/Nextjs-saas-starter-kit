import { loadDashboardParams } from "@/lib/nuqs/search-params"
import type { SearchParams } from "nuqs/server"

import { handleDashboardRequest } from "@/app/actions/pages/(dashboard)/handle-dashboard-request"
import { handleAuthRequest } from "@/app/actions/utils"
import { DashboardModalProvider } from "@/components/providers/dashboard-modal-provider"
import { DashboardSidebar } from "@/components/sidebars/dashboard/dashboard-sidebar"
import { TopNavigation } from "@/components/sidebars/dashboard/top-navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { MapService } from "@/lib/services/map-service"
import { Fragment } from "react"

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

  const [workspace, workspaces] = await Promise.all([
    handleDashboardRequest(user.id, slug),
    WorkSpaceDatabaseService.getAllUserWorkspaces(user.id),
  ])

  const formatWorkspaces = MapService.formatWorkspaces(workspaces, user.id)

  return (
    <Fragment>
      <DashboardModalProvider workspace={workspace} />
      <SidebarProvider>
        <DashboardSidebar
          workspaces={formatWorkspaces}
          user={user}
          slug={slug}
        />
        <SidebarInset>
          <TopNavigation />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  )
}
