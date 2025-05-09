"use client"

import * as React from "react"

import { DashboardNav } from "@/components/sidebars/dashboard/components/dashboard-nav"
import { DashboardUser } from "@/components/sidebars/dashboard/components/dashboard-user"
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
import { WorkspaceSwitcher } from "./components/workspace-switcher"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  slug: string
  workspaces: FormattedWorkspace[]
}

export function DashboardSidebar({
  slug,
  workspaces,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav data={DASHBOARD_NAV_MAIN} slug={slug} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardNav data={DASHBOARD_NAV_FOOTER} slug={slug} />
        <DashboardUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
