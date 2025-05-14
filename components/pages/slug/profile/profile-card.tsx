import { ProfileEditForm } from "@/components/forms/slug/profile/profile-edit-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileCard() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileEditForm />
      </CardContent>
    </Card>
  )
}
