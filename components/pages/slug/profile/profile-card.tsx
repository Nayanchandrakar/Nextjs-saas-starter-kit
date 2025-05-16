import { ActiveSessions } from "@/components/forms/slug/profile/active-sessions"
import { ManageProfile } from "@/components/forms/slug/profile/manage-profile"
import { ProfileSignOut } from "@/components/forms/slug/profile/profile-sign-out"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formattedSessionsType } from "@/types"
import { User } from "@/types/authentication/client-types"

type ProfileCardProps = {
  user: User
  sessions: formattedSessionsType
}

export function ProfileCard({ user, sessions }: ProfileCardProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          Profile
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ManageProfile user={user} />
        <ActiveSessions sessions={sessions} currentUserId={user.id} />
        <Separator className="mt-6" />
      </CardContent>

      <CardFooter className="justify-end">
        <ProfileSignOut />
      </CardFooter>
    </Card>
  )
}
