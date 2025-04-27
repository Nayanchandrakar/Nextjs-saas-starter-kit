import { onboardUser } from "@/app/actions/pages/onboarding/onboard-user"
import { Loader } from "lucide-react"

export default async function MainOnboardPage() {
  // await onboardUser()
  return <Loader className="animate-spin size-4 text-muted-foreground" />
}
