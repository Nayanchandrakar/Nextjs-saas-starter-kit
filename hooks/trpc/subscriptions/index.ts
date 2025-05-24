"use client"

import MessageJson from "@/lib/constants/message.json"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateSubscription = () => {
  const trpc = useTRPC()

  return useMutation(
    trpc.subscriptions.createSubscription.mutationOptions({
      onError: (error) => {
        toast.error(error.message ?? MessageJson.generalError)
      },
    }),
  )
}
