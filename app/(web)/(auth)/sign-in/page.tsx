import { SignInForm } from "@/components/forms/auth/sigin-in-form"
import { auth } from "@/lib/authentication/utils"
import { loadInvitationSearchParams } from "@/lib/nuqs/search-params"
import { redirectToRoute } from "@/lib/utils"
import { SearchParams } from "nuqs/server"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function SignInPage({ searchParams }: PageProps) {
  const [session, invitationSearchParams] = await Promise.all([
    auth(),
    loadInvitationSearchParams(searchParams),
  ])

  if (session) redirectToRoute("callback")
  return (
    <SignInForm fromInvite={invitationSearchParams.from === "invitation"} />
  )
}
