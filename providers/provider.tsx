import { TrpcNextProvider } from "@/trpc/client"

type ProviderType = {
  children: React.ReactNode
}

export const Provider = ({ children }: ProviderType) => {
  return <TrpcNextProvider>{children}</TrpcNextProvider>
}
