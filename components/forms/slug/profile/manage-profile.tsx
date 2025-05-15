"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormAlert } from "@/components/ui/form-alert"
import { Input } from "@/components/ui/input"
import { useSingleFileUpload } from "@/hooks/client/use-single-file-upload"
import { useEditProfileImage, useManageProfileHook } from "@/hooks/trpc/users"
import {
  manageProfileSchema,
  manageProfileSchemaType,
} from "@/lib/schema/pages/profile/manage-profile-schemea"

import { User } from "@/types/authentication/client-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface ManageProfileProps {
  user: User
}

export function ManageProfile({ user }: ManageProfileProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { isPending: isProfilePending, mutateAsync } = useManageProfileHook({
    onSuccess: () => setIsDialogOpen(false),
  })

  const { isPending: isImageUpdating, mutateAsync: updateProfileImage } =
    useEditProfileImage({
      onSuccess: () => {},
    })

  const form = useForm<manageProfileSchemaType>({
    resolver: zodResolver(manageProfileSchema),
    defaultValues: user,
  })

  const { isUploading, getInputProps, openFileDialog } = useSingleFileUpload({
    maxSizeMB: 2,
    defaultUploadedUrl: user.image,
    acceptedTypes: "image/png,image/jpeg,image/jpg",
    onUploadSuccess: (imageSrc: string) => {
      updateProfileImage({ image: imageSrc })
    },
  })

  const isLoading = isUploading || isProfilePending || isImageUpdating

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 w-full">
        <Avatar className="ring-2 ring-green-500 ring-offset-3 ring-offset-background relative size-9">
          <AvatarImage src={user.image} alt={`${user.fullName}'s profile`} />
          <AvatarFallback className="uppercase">
            {user.fullName.slice(0, 2)}
          </AvatarFallback>
          <span
            onClick={openFileDialog}
            className="absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-80 opacity-0 bg-primary-foreground/10 backdrop-blur-sm cursor-pointer"
          >
            <SquarePen className="size-4" aria-hidden="true" />
            <input {...getInputProps()} hidden disabled={isLoading} />
          </span>
        </Avatar>

        <div className="flex flex-col text-sm">
          <h3 className="font-semibold capitalize">{user.fullName}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button disabled={isUploading} variant="outline">
            <SquarePen className="size-4 mr-2" aria-hidden="true" />
            Edit Profile
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below. Save when complete.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id="manage-profile"
              onSubmit={form.handleSubmit((values) => mutateAsync(values))}
              className="space-y-6 mt-3"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled placeholder="Enter email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter className="flex flex-col gap-4 sm:flex-col">
            <FormAlert
              message="Email cannot be changed when using third-party authentication."
              variant="info"
            />
            <Button
              type="submit"
              form="manage-profile"
              loading={isProfilePending}
              disabled={isLoading || !form.formState.isDirty}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
