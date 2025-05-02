import { Loader } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center size-full min-h-screen">
      <p className="flex items-center gap-2">
        <Loader className="animate-spin size-4" />
        Loading invitation page...
      </p>
    </div>
  )
}
