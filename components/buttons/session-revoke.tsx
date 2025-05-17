import { useRevokeSession } from "@/hooks/client/use-session-revoke"
import { Laptop, Loader } from "lucide-react"

type SessionCardProps = {
  osName: string
  browserName: string
  token: string
  isCurrentUser: boolean
}

type RevokeButtonContentProps = {
  isRevoking: boolean
  isCurrentUser: boolean
}

function RevokeButtonContent({
  isCurrentUser,
  isRevoking,
}: RevokeButtonContentProps) {
  if (isRevoking) {
    return <Loader className="animate-spin size-4" />
  }
  return isCurrentUser ? "Sign Out" : "Terminate"
}

export function SessionCard({
  browserName,
  isCurrentUser,
  osName,
  token,
}: SessionCardProps) {
  const { isRevoking, onRevoke } = useRevokeSession()

  return (
    <div
      key={token}
      className="flex items-center gap-2 text-sm font-medium capitalize"
    >
      <Laptop className="size-4" />
      <span>
        <span>{osName}</span>
        {", "}
        <span>{browserName}</span>
      </span>
      <button
        disabled={isRevoking}
        onClick={() => onRevoke(isCurrentUser, token)}
        className="text-xs text-red-600 underline underline-offset-3 cursor-pointer flex items-center justify-center"
      >
        <RevokeButtonContent
          isCurrentUser={isCurrentUser}
          isRevoking={isRevoking}
        />
      </button>
    </div>
  )
}
