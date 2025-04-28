import { SignInForm } from "@/components/forms/auth/sigin-in-form"
import { auth } from "@/lib/authentication/utils"
import { redirectToRoute } from "@/lib/utils"

export default async function SignInPage() {
  const session = await auth()

  if (session) redirectToRoute("callback")
  return <SignInForm />
}
