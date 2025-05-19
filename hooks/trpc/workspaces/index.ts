"use client"

import messageJson from "@/lib/constants/message.json"
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
          description: "Hang tight redirecting you shortly...",
        })
        router.push("/onboarding/collaborate")
      },
      onError: (error) =>
        toast.error(error.message ?? messageJson.generalError),
    }),
  )
}

export const useDeleteWorkspace = () => {
  const trpc = useTRPC()
  return useMutation(
    trpc.workSpaces.deleteWorkspace.mutationOptions({
      onSuccess: (data) => {
        toast.success(data.message)
      },
      onError: (error) =>
        toast.error(error.message ?? messageJson.generalError),
    }),
  )
}
