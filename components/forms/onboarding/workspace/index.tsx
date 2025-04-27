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
import {
  profileOnboardingSchema,
  profileOnboardingSchemaType,
} from "@/lib/schema/pages/onboarding/profile/profile-onboarding-scheme"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const WorkSpaceOnboardingForm = () => {
  const form = useForm<profileOnboardingSchemaType>({
    resolver: zodResolver(profileOnboardingSchema),
    defaultValues: {
      profileImage: "",
      firstName: "",
      lastName: "",
      email: "example@gmail.com",
    },
  })

  async function onSubmit(values: profileOnboardingSchemaType) {
    console.log(values)
  }

  const isSubmitting = !!form.formState.isSubmitting

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <ProfilePicComponent
          maxSize={2 * 1024 * 1024}
          title="Profile Image"
          accept="image/png,image/jpeg,image/jpg"
          imageUrl={form.getValues("profileImage")!}
          onRemove={() => form.reset({ profileImage: "" })}
          onSucess={(imageUrl: string) => {
            form.setValue("profileImage", imageUrl, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }}
        />
      </CardHeader>

      <CardContent className="mt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="John"
                      {...field}
                    />
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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Doe"
                      {...field}
                    />
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
              disabled={isSubmitting}
              type="submit"
              className="w-full"
              loading={isSubmitting}
            >
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
