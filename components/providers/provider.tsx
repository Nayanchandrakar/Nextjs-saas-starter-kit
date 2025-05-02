import { TrpcNextProvider } from "@/trpc/client"
import { NuqsAdapter } from "nuqs/adapters/next/app"

type ProviderType = {
  children: React.ReactNode
}

export const Provider = ({ children }: ProviderType) => {
  return (
    <NuqsAdapter>
      <TrpcNextProvider>{children}</TrpcNextProvider>
    </NuqsAdapter>
  )
}
