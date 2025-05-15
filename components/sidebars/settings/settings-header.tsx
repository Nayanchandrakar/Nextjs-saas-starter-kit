import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type SettingsHeaderProps = {
  slug: string
}

export function SettingsHeader({ slug }: SettingsHeaderProps) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="truncate"
            asChild
            tooltip="Back to dashboard"
          >
            <Link href={`/${slug}/dashboard`}>
              <ArrowLeft className="size-4" />
              Back to dashboard
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
