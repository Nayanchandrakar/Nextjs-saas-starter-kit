"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { useDeleteAccount } from "@/hooks/trpc/users"
import { Trash } from "lucide-react"
import { useState } from "react"

export function DeleteAccountButton() {
  const [isAlertOpen, setAlertOpen] = useState(false)
  const { isPending, mutateAsync } = useDeleteAccount({
    onSuccess: () => {
      setAlertOpen(false)
    },
  })

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="destructive">
          <Trash className="size-4 -me-1" />
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white"
              disabled={isPending}
              onClick={() => mutateAsync()}
            >
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
