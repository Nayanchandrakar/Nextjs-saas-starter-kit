"use client"

import { ProfilePicComponent } from "@/components/shared/file/profile-pic-component"
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
import { useCreateWorkspaceHook } from "@/hooks/trpc/workspaces"
import { formSetting } from "@/lib/constants/form-settings"
import {
  workSpaceOnboardingSchema,
  workSpaceOnboardingSchemaType,
} from "@/lib/schema/pages/onboarding/workspace/workspace-onboarding-schema"
import { clientEnv } from "@/lib/utilities/client-env"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface WorkSpaceOnboardingFormProps {}

export const WorkSpaceOnboardingForm = ({}: WorkSpaceOnboardingFormProps) => {
  const { mutateAsync, isPending } = useCreateWorkspaceHook()

  const form = useForm<workSpaceOnboardingSchemaType>({
    resolver: zodResolver(workSpaceOnboardingSchema),
    defaultValues: {
      logo: "",
      name: "",
      slug: "",
    },
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  })

  return (
    <MotionCard className="w-full max-w-lg">
      <CardHeader>
        <ProfilePicComponent
          maxSize={2 * 1024 * 1024}
          title="Image"
          fileSrc={form.getValues("logo")!}
          accept="image/png,image/jpeg,image/jpg"
          disabled={isPending}
          onRemove={() => form.setValue("logo", "", formSetting)}
          onSuccess={(imageSrc: string) => {
            form.setValue("logo", imageSrc, formSetting)
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="example: Apple"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="peer ps-30"
                        disabled={isPending}
                        placeholder="example: apple"
                        {...field}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        {new URL(clientEnv.NEXT_PUBLIC_APP_URL).host}/
                      </span>
                    </div>
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
              Create Workspace
            </Button>
          </form>
        </Form>
      </CardContent>
    </MotionCard>
  )
}
