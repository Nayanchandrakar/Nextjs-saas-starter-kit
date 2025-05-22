import { PERMISSIONS } from "@/lib/constants/rbac/permissions"
import { SUBSCRIPTION_PLANS } from "@/lib/constants/subscription-plan"
import { StringService } from "@/lib/services/string-service"
import { FormattedWorkspace } from "@/types"
import { ActiveSessionsType } from "@/types/authentication/client-types"
import type { PlanType } from "@/types/authentication/server-types"
import type { WorkspaceType } from "@/types/database"
import { userAgentFromString } from "next/server"

export class MapService {
  static formattedPermissions() {
    const formattedValues = Object.values(PERMISSIONS).map((name) => ({
      name,
      description: `Permission for ${name.replace(":", " ")}`,
    }))

    return formattedValues
  }

  static formatWorkspaces(data: WorkspaceType[], userId: string) {
    const group: FormattedWorkspace[] = [
      { label: "Personal workspaces", workspaces: [] },
      { label: "Workspaces", workspaces: [] },
    ]

    data?.forEach(({ logo, ...props }) => {
      group[props.ownerId === userId ? 0 : 1]?.workspaces.push({
        logo: StringService.getPlaceholderImage(logo, props.name),
        ...props,
      })
    })

    return group
  }

  static findWorkspaceBySlug(groups: FormattedWorkspace[], slug: string) {
    for (const group of groups) {
      const workspace = group.workspaces.find(
        (workspace) => workspace.slug === slug,
      )
      if (workspace) return workspace
    }
    return undefined
  }

  static getBreadcrumbs(pathname: string) {
    return pathname
      .split("/")
      .filter((path) => path !== "")
      .map((path, index, array) => ({
        label: path,
        href: `/${array.slice(0, index + 1).join("/")}`,
      }))
  }

  static formattedActiveSessions(sessions: ActiveSessionsType) {
    return sessions?.map(({ session }) => {
      return {
        userAgent: userAgentFromString(session.userAgent!),
        token: session.token,
        userId: session.userId,
      }
    })
  }

  static getSubscriptionDetails(priceId: string, plan: PlanType) {
    const selectedPlan = SUBSCRIPTION_PLANS[plan]
    for (const [duration, billing] of Object.entries(selectedPlan.billing)) {
      if (billing.priceId === priceId) {
        return {
          planType: plan,
          planName: selectedPlan.name,
          duration,
          price: billing.price,
          features: selectedPlan.features,
          priceId,
        }
      }
    }
  }
}
