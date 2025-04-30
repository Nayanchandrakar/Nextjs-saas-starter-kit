"use client"

import { messages } from "@/lib/constants/message"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useUpdateUserHook = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.users.update.mutationOptions({
      onSuccess: () => {
        toast.success("Your profile has been created!", {
          description: "Hang tight redirecting you shortly...",
        })
        router.push("/onboarding/workspace")
      },
      onError: (error) => toast.error(error.message ?? messages.global.error),
    }),
  )
}
