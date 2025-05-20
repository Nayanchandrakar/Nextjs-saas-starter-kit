"use client"

import MessageJson from "@/lib/constants/message.json"
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
        router.push(data.redirect!)
      },
      onError: (error) =>
        toast.error(error.message ?? MessageJson.generalError),
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
        toast.success(MessageJson.onboardingSkipMessage, {
          description: MessageJson.onboardingSkipDescription,
        })
        router.push(data.redirect!)
      },
      onError: (error) =>
        toast.error(error.message ?? MessageJson.generalError),
    }),
  )
  return { isSkipping, mutateSkipping, ...props }
}
