"use client"

import { messages } from "@/lib/constants/message"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useCreateWorkspaceHook = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.workSpaces.create.mutationOptions({
      onSuccess: () => {
        toast.success("Your workspace has been created!", {
          description: "Hang tight — redirecting you shortly...",
        })
        router.push("/onboarding/collaborate")
      },
      onError: (error) => toast.error(error.message ?? messages.global.error),
    }),
  )
}
