import { handleCallbackRequest } from "@/app/actions/pages/callback/handle-callback-request"
import { loadCallbackSearchParams } from "@/lib/nuqs/search-params"
import { Loader } from "lucide-react"
import { SearchParams } from "nuqs/server"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function CallBackPage({ searchParams }: PageProps) {
  const { fromInvite } = await loadCallbackSearchParams(searchParams)
  await handleCallbackRequest(fromInvite)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin size-4 text-muted-foreground" />
    </div>
  )
}
