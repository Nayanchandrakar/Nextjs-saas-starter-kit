import { authClient } from "@/lib/authentication/auth-client"
import { createRoute } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export const useRevokeSession = () => {
  const router = useRouter()
  const [isRevoking, startTransition] = useTransition()

  const onRevoke = (isCurrentUser: boolean, token: string) => {
    startTransition(async () => {
      if (isCurrentUser) {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push(createRoute("sign-in"))
            },
          },
        })
      } else {
        await authClient.revokeSession({ token })
      }
    })
  }

  return {
    isRevoking,
    onRevoke,
  }
}
