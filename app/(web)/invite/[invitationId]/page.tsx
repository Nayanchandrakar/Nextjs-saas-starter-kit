import NotFound from "@/app/not-found"
import { InvitationLoginForm } from "@/components/forms/invitation/invitation-login-form"
import { InvitationNotForYou } from "@/components/pages/invitation/invitation-not-for-you"
import { NoInvitationFound } from "@/components/pages/invitation/no-invitation-found"
import { getInvitationById } from "@/database/helpers/invitations"
import { getOnboardingData } from "@/database/helpers/onboarding"
import { getWorkspaceById } from "@/database/helpers/workspaces"
import { auth } from "@/lib/authentication/utils"
import {
  loadInvitationParams,
  loadInvitationSearchParams,
} from "@/lib/nuqs/search-params"
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
  let onboarding = null

  const [invitationSearchParams, invitationParams] = await Promise.all([
    loadInvitationSearchParams(searchParams),
    loadInvitationParams(params),
  ])

  const [session, invitation] = await Promise.all([
    auth(),
    getInvitationById(invitationParams.invitationId),
  ])

  if (!invitation) {
    return <NoInvitationFound />
  }

  if (session?.user.id === invitation.invitedBy) {
    return <InvitationNotForYou email={session.user.email} />
  }

  // TODO: check for invitation expiry here

  if (session) {
    onboarding = await getOnboardingData(session.user.id)

    if (onboarding?.onboardingStatus === "pending") {
      redirectToRoute("callback")
    }
  }

  const workspace = await getWorkspaceById(invitation.workspaceId)

  if (!workspace) {
    return <NotFound />
  }

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
