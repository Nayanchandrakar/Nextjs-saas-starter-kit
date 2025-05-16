"use client"

import { ListComponent } from "@/components/shared/list-component"
import { authClient } from "@/lib/authentication/auth-client"
import { StringService } from "@/lib/services/string-service"
import { formattedSessionsType } from "@/types"
import { Laptop } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

type ActiveSessionsProps = {
  sessions: formattedSessionsType
  currentUserId: string
}

function RenderText(isCurrentUser: boolean) {
  return isCurrentUser ? "Sign Out" : "Terminate"
}

export function ActiveSessions({
  sessions,
  currentUserId,
}: ActiveSessionsProps) {
  const router = useRouter()
  const [isRevoking, startTransition] = useTransition()

  const onRevoke = (isCurrentUser: boolean, token: string) => {
    startTransition(async () => {
      await authClient.revokeSession(
        { token },
        {
          onSuccess: () => {
            if (isCurrentUser) {
              router.refresh()
            }
          },
        },
      )
    })
  }

  return (
    <div className="mt-8 border-l-2 pl-3">
      <p className="text-xs text-muted-foreground">Active Sessions</p>
      <ListComponent
        data={sessions}
        className="py-2"
        renderItem={({ token, userAgent, userId }) => {
          const isCurrentUser = StringService.isCurrentUser(
            userId,
            currentUserId,
          )
          return (
            <div
              key={token}
              className="flex items-center gap-2 text-sm font-medium capitalize"
            >
              <Laptop className="size-4" />
              <span>
                <span>{userAgent?.os.name}</span>
                {", "}
                <span>{userAgent?.browser.name}</span>
              </span>
              <button
                disabled={isRevoking}
                onClick={() => onRevoke(isCurrentUser, token)}
                className="text-xs text-red-600 underline underline-offset-3 cursor-pointer"
              >
                {RenderText(isCurrentUser)}
              </button>
            </div>
          )
        }}
      />
    </div>
  )
}
