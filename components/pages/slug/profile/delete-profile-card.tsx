import { DeleteAccountButton } from "@/components/forms/slug/profile/delete-account-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User } from "@/types/authentication/client-types"
import { format } from "date-fns"

type DeleteAccountCardProps = {
  user: User
}

export function DeleteAccountCard({ user }: DeleteAccountCardProps) {
  const accountCreatedAt = format(user.createdAt, "LLL Qo, yyyy")
  return (
    <Card className="max-w-3xl border shadow-xs border-destructive/40 dark:border-destructive/50">
      <CardHeader>
        <CardTitle>Delete profile</CardTitle>
        <CardDescription>
          This account, along with all associated workspaces and data, will be
          permanently deleted. This action is irreversible and cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-semibold">{user.email}</span>
          <p className="text-muted-foreground text-xs">
            Account created on {accountCreatedAt}
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <DeleteAccountButton />
      </CardFooter>
    </Card>
  )
}
