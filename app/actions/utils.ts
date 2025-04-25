import { auth } from "@/lib/authentication/utils"
import { redirectToRoute } from "@/lib/utils"

export async function handleAuthRequest() {
  const session = await auth()
  if (!session) redirectToRoute("sign-in")
  return session!
}
