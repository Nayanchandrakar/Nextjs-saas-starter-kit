"use client"

import { ImageUpload } from "@/components/shared/file/image-upload"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MotionCard } from "@/components/ui/motion-card"
import { useOnboardUserHook } from "@/hooks/trpc/users"
import { formSetting } from "@/lib/constants/form-settings"
import {
  profileOnboardingSchema,
  profileOnboardingSchemaType,
} from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { User } from "@/types/authentication/client-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface ProfileOnboardingFormProps {
  user: User
  fromInvite: boolean
}

export const ProfileOnboardingForm = ({
  user,
  fromInvite,
}: ProfileOnboardingFormProps) => {
  const { mutateAsync, isPending } = useOnboardUserHook()

  const form = useForm<profileOnboardingSchemaType>({
    resolver: zodResolver(profileOnboardingSchema),
    defaultValues: {
      ...user,
      fromInvite,
    },
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  })

  return (
    <MotionCard className="w-full max-w-lg">
      <CardHeader>
        <ImageUpload
          maxSizeMB={2}
          title="Profile Image"
          fileSrc={form.getValues("image")!}
          accept="image/png,image/jpeg,image/jpg"
          disabled={isPending}
          onRemove={() => form.setValue("image", "", formSetting)}
          onUploadSuccess={(imageSrc: string) => {
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
    </MotionCard>
  )
}
