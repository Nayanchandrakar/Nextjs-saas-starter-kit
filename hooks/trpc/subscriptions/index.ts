"use client"

import MessageJson from "@/lib/constants/message.json"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useCreateSubscription = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.subscriptions.createSubscription.mutationOptions({
      onSuccess: (data) => router.push(data.redirectUrl),
      onError: (error) => {
        toast.error(error.message ?? MessageJson.generalError)
      },
    }),
  )
}

export const useOpenCustomerPortal = () => {
  const trpc = useTRPC()
  const router = useRouter()

  return useMutation(
    trpc.subscriptions.createCustomerPortal.mutationOptions({
      onSuccess: (data) => router.push(data.redirectUrl),
      onError: (error) => {
        toast.error(error.message ?? MessageJson.generalError)
      },
    }),
  )
}
