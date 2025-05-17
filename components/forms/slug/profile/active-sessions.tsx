"use client"

import { SessionCard } from "@/components/buttons/session-revoke"
import { ListComponent } from "@/components/shared/list-component"
import { StringService } from "@/lib/services/string-service"
import { formattedSessionsType } from "@/types"

type ActiveSessionsProps = {
  sessions: formattedSessionsType[]
  currentUserId: string
}

export function ActiveSessions({
  sessions,
  currentUserId,
}: ActiveSessionsProps) {
  return (
    <div className="mt-8 border-l-2 pl-3">
      <p className="text-xs text-muted-foreground">Active Sessions</p>
      <ListComponent
        data={sessions}
        className="py-2 gap-3 flex flex-col"
        renderItem={({ token, userAgent, userId }) => (
          <SessionCard
            key={token}
            browserName={userAgent?.browser.name!}
            osName={userAgent?.os.name!}
            token={token}
            isCurrentUser={StringService.isCurrentUser(userId, currentUserId)}
          />
        )}
      />
    </div>
  )
}
