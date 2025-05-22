import { PricingModal } from "@/components/modals/pricing-modal"
import dynamic from "next/dynamic"

interface ProviderProps {
  workspace: {
    id: string
  }
}

export async function Provider({ workspace }: ProviderProps) {
  return <PricingModal workspaceId={workspace.id} />
}

export const SettingsModalProvider = dynamic(async () => {
  return import("@/components/providers/dashboard-modal-provider").then(
    (module) => module.Provider,
  )
})
