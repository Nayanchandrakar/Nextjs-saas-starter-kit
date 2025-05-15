import { ManageProfile } from "@/components/forms/slug/profile/manage-profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/types/authentication/client-types"

type ProfileCardProps = {
  user: User
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ManageProfile user={user} />
      </CardContent>
    </Card>
  )
}
