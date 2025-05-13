import {
  BriefcaseBusiness,
  Brush,
  Building,
  CreditCard,
  User,
  Users,
} from "lucide-react"

export const ACCOUNT_SETTINGS = [
  {
    name: "Profile",
    url: "profile",
    icon: User,
  },
  {
    name: "Personalization",
    url: "personalization",
    icon: Brush,
  },
  {
    name: "Workspaces",
    url: "workspaces",
    icon: BriefcaseBusiness,
  },
  {
    name: "Billing",
    url: "billing",
    icon: CreditCard,
  },
]

export const WORKSPACE_SETTINGS = [
  {
    name: "Workspace",
    url: "workspace",
    icon: Building,
  },
  {
    name: "Members",
    url: "members",
    icon: Users,
  },
]
