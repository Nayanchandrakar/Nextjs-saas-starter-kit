import { authClient } from "@/lib/authentication/auth-client"
import type { ErrorContext } from "better-auth/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface UseSignOutProps {
  onSuccess?: () => void
  onError?: (error: ErrorContext) => void
  redirectPath?: string
}

export const useSignOut = ({
  onError,
  onSuccess,
  redirectPath = "/sign-in",
}: UseSignOutProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(redirectPath)
            onSuccess?.()
          },
          onError: (context: ErrorContext) => {
            toast.error(context.error.message)
            onError?.(context)
          },
        },
      })
    })
  }

  return {
    isPending,
    onSignOut,
  }
}
