import { handleInvitationRequest } from "@/app/actions/pages/invitation/handle-invitation-request"
import NotFound from "@/app/not-found"
import { InvitationLoginForm } from "@/components/forms/invitation/invitation-login-form"
import { InvitationNotForYou } from "@/components/pages/invitation/invitation-not-for-you"
import { NoInvitationFound } from "@/components/pages/invitation/no-invitation-found"
import { InvitationDatabaseService } from "@/database/services/invitation-service"
import { OnboardingDatabaseService } from "@/database/services/onboarding-service"
import { WorkSpaceDatabaseService } from "@/database/services/workspace-service"
import { auth } from "@/lib/authentication/utils"
import {
  loadInvitationParams,
  loadInvitationSearchParams,
} from "@/lib/nuqs/search-params"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import { createRoute, redirectToRoute } from "@/lib/utils"
import type { SearchParams } from "nuqs/server"

interface InvitationPageProps {
  searchParams: Promise<SearchParams>
  params: Promise<SearchParams>
}

export default async function InvitationPage({
  searchParams,
  params,
}: InvitationPageProps) {
  const [invitationSearchParams, invitationParams] = await Promise.all([
    loadInvitationSearchParams(searchParams),
    loadInvitationParams(params),
  ])

  const [session, invitation] = await Promise.all([
    auth(),
    InvitationDatabaseService.getInvitationById(invitationParams.invitationId),
  ])

  if (!invitation || DateService.checkInvitationExpiry(invitation.expiresAt)) {
    return <NoInvitationFound />
  }

  if (session?.user.id === invitation.invitedBy) {
    return <InvitationNotForYou email={session.user.email} />
  }

  const workspace = await WorkSpaceDatabaseService.getWorkspaceById(
    invitation.workspaceId,
  )

  if (!workspace) {
    return <NotFound />
  }

  if (session) {
    const onboarding = await OnboardingDatabaseService.getOnboardingData(
      session.user.id,
    )

    await handleInvitationRequest(
      session.user.id,
      workspace.id,
      invitation.role,
      invitation.id,
    )

    if (StringService.isOnboardingPending(onboarding?.onboardingStatus)) {
      redirectToRoute("callback", {
        ...(invitationSearchParams && {
          fromInvite: StringService.isFromInvite(invitationSearchParams.from),
        }),
      })
    }

    redirectToRoute(`${workspace.slug}/dashboard`)
  } else {
    const callbackString = createRoute(`invite/${invitation.id}`, {
      ...(invitationSearchParams && invitationSearchParams),
    })

    return (
      <InvitationLoginForm
        email={invitation.email}
        workspace={workspace}
        callbackString={callbackString}
      />
    )
  }
}
