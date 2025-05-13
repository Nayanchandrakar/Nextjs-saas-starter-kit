"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { createRoute, isRouteActive } from "@/lib/utils"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type DashboardNavProps = {
  data: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  slug: string
}

export function DashboardNav({ data, slug }: DashboardNavProps) {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {data?.map((item) => {
          const href = createRoute(`${slug}/${item.url}`)
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                variant={
                  isRouteActive({
                    currentPath: currentPath,
                    targetPath: href,
                    depth: 2,
                  })
                    ? "outline"
                    : "default"
                }
              >
                <Link href={href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
