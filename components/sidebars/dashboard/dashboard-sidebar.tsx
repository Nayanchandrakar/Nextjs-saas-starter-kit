"use client"

import * as React from "react"

import { DashboardNav } from "@/components/sidebars/dashboard/dashboard-nav"
import { DashboardUser } from "@/components/sidebars/dashboard/dashboard-user"
import { WorkspaceSwitcher } from "@/components/sidebars/dashboard/workspace-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DASHBOARD_NAV_FOOTER,
  DASHBOARD_NAV_MAIN,
} from "@/lib/constants/navigation/dashboard-navigation"
import { FormattedWorkspace } from "@/types"
import type { User } from "better-auth"

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  slug: string
  workspaces: FormattedWorkspace[]
  user: User
}

export function DashboardSidebar({
  slug,
  workspaces,
  user,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={workspaces} slug={slug} />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav data={DASHBOARD_NAV_MAIN} slug={slug} />
      </SidebarContent>
      <SidebarFooter className="p-0">
        <DashboardNav data={DASHBOARD_NAV_FOOTER} slug={slug} />
        <DashboardUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
