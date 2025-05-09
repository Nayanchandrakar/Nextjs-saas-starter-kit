import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { createRoute } from "@/lib/utils"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"

type DashboardNavProps = {
  data: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  slug: string
}

export function DashboardNav({ data, slug }: DashboardNavProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={createRoute(`${slug}/${item.url}`)}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
