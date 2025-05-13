import { LayoutDashboardIcon, Send, Settings2, Users } from "lucide-react"

export const DASHBOARD_NAV_MAIN = [
  {
    name: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboardIcon,
  },
]

export const DASHBOARD_NAV_FOOTER = [
  {
    name: "Settings",
    url: "workspace",
    icon: Settings2,
  },
  {
    name: "Feedback",
    url: "feedback",
    icon: Send,
  },
]

export const WORKSPACE_SWITCH_OPTIONS = [
  { label: "Workspace settings", Icon: Settings2, href: "workspace" },
  {
    label: "Invite and manage members",
    Icon: Users,
    href: "members",
  },
]
