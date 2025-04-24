import { Loader } from "lucide-react"

export default async function CallBackPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin size-4 text-muted-foreground" />
    </div>
  )
}
