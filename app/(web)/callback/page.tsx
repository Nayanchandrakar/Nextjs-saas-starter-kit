import { handleCallbackRequest } from "@/app/actions/pages/callback/handle-callback-request"
import { Loader } from "lucide-react"

export default async function CallBackPage() {
  await handleCallbackRequest()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin size-4 text-muted-foreground" />
    </div>
  )
}
