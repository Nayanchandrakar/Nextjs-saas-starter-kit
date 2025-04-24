import { getOnboardingData } from "@/database/helpers/onboarding"
import { auth } from "@/lib/authentication/utils"
import { createRoute } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function MainOnboardPage() {
  const session = await auth()
  if (!session) redirect(createRoute("sign-in"))

  const onboarding = await getOnboardingData(session.user.id)

  return <div>Main Onboarding page: {JSON.stringify(onboarding)}</div>
}
