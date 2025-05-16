"use client"

import { generalError } from "@/lib/constants/message.json"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useOnboardUserHook = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.users.onboardUser.mutationOptions({
      onSuccess: (data, input) => {
        toast.success(data.message, {
          description: "Hang tight redirecting you shortly...",
        })

        router.push(input.fromInvite ? "/callback" : "/onboarding/workspace")
      },
      onError: (error) => toast.error(error.message ?? generalError),
    }),
  )
}

export const useManageProfileHook = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const trpc = useTRPC()

  return useMutation(
    trpc.users.manageProfile.mutationOptions({
      onSuccess: (data) => {
        onSuccess?.()
        toast.success(data.message)
      },
      onError: (error) => toast.error(error.message ?? generalError),
    }),
  )
}

export const useEditProfileImage = () => {
  const trpc = useTRPC()

  return useMutation(
    trpc.users.editProfileImage.mutationOptions({
      onSuccess: (data) => {
        toast.success(data.message)
      },
      onError: (error) => toast.error(error.message ?? generalError),
    }),
  )
}
