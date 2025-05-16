"use client"

import messageJson, {
  onboardingSkipDescription,
  onboardingSkipMessage,
} from "@/lib/constants/message.json"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useInviteMembers = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.invitations.createBulk.mutationOptions({
      onSuccess: (data) => {
        toast.success(data.message)
        router.push(data.redirect)
      },
      onError: (error) =>
        toast.error(error.message ?? messageJson.generalError),
    }),
  )
}

export const useSkipInvitation = () => {
  const trpc = useTRPC()
  const router = useRouter()

  const {
    isPending: isSkipping,
    mutateAsync: mutateSkipping,
    ...props
  } = useMutation(
    trpc.invitations.createBulk.mutationOptions({
      onSuccess: (data) => {
        toast.success(onboardingSkipMessage, {
          description: onboardingSkipDescription,
        })
        router.push(data.redirect)
      },
      onError: (error) =>
        toast.error(error.message ?? messageJson.generalError),
    }),
  )
  return { isSkipping, mutateSkipping, ...props }
}
