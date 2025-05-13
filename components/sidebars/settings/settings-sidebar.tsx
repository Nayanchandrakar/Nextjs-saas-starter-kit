"use client"

import * as React from "react"

import { SettingsHeader } from "@/components/sidebars/settings/settings-header"
import { SidebarNav } from "@/components/sidebars/settings/sidebar-nav"
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar"
import {
  ACCOUNT_SETTINGS,
  WORKSPACE_SETTINGS,
} from "@/lib/constants/navigation/settings-navigation"
import type { User } from "better-auth"

type SettingsDashboardProps = React.ComponentProps<typeof Sidebar> & {
  slug: string
  user: User
}

export function SettingsDashboard({
  slug,
  user,
  ...props
}: SettingsDashboardProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SettingsHeader slug={slug} />
      <SidebarContent>
        <SidebarNav data={ACCOUNT_SETTINGS} slug={slug} label={user.email} />
        <SidebarNav
          data={WORKSPACE_SETTINGS}
          slug={slug}
          label="Workspace settings"
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
