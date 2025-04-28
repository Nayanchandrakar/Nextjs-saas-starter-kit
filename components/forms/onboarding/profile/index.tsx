"use client"

import { ProfilePicComponent } from "@/components/shared/file/profile-pic-component"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateUserHook } from "@/hooks/trpc/users"
import { formSetting } from "@/lib/constants/form-settings"
import {
  profileOnboardingSchema,
  profileOnboardingSchemaType,
} from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface ProfileOnboardingFormProps {
  email: string
  firstName: string
  lastName: string
  image: string
}

export const ProfileOnboardingForm = ({
  email,
  firstName,
  lastName,
  image,
}: ProfileOnboardingFormProps) => {
  const { mutateAsync, isPending } = useUpdateUserHook()

  const form = useForm<profileOnboardingSchemaType>({
    resolver: zodResolver(profileOnboardingSchema),
    defaultValues: {
      isFromInvitation: false,
      image: image,
      firstName,
      lastName,
      email,
    },
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  })

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <ProfilePicComponent
          maxSize={2 * 1024 * 1024}
          title="Profile Image"
          fileSrc={form.getValues("image")!}
          accept="image/png,image/jpeg,image/jpg"
          disabled={isPending}
          onRemove={() => form.setValue("image", "", formSetting)}
          onSuccess={(imageSrc: string) => {
            form.setValue("image", imageSrc, formSetting)
          }}
        />
      </CardHeader>

      <CardContent className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutateAsync(values))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="John" {...field} />
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
                  <FormLabel>Last Name (optional)</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Doe" {...field} />
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
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
              className="w-full"
              loading={isPending}
            >
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
