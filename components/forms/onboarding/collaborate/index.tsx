"use client"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MotionCard } from "@/components/ui/motion-card"
import { Separator } from "@/components/ui/separator"
import { useInviteMembersHook } from "@/hooks/trpc/invitations"
import {
  collaborationOnboardingSchema,
  collaborationOnboardingSchemaType,
} from "@/lib/schema/pages/onboarding/collaboration/collaboration-onboarding-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

interface CollabrationOnboardingFormProps {}

export const CollabrationOnboardingForm =
  ({}: CollabrationOnboardingFormProps) => {
    const { isPending, mutateAsync } = useInviteMembersHook()

    const form = useForm<collaborationOnboardingSchemaType>({
      resolver: zodResolver(collaborationOnboardingSchema),
      defaultValues: {
        emails: ["example@gmail.com"],
      },
      mode: "onChange",
      shouldFocusError: true,
    })

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "emails" as never,
    })

    const isMaxLimitReached = fields.length < 4
    const isMinLimit = fields.length > 1

    const handleFieldAdd = () => {
      if (isMaxLimitReached) {
        append("")
      }
    }

    const handleFieldRemove = (index: number) => {
      if (isMinLimit) {
        remove(index)
      }
    }

    return (
      <MotionCard className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Invite Collaborators</CardTitle>
          <CardDescription>
            Invite team members to collaborate in your workspace.
          </CardDescription>
          <Separator className="mt-2" />
        </CardHeader>

        <CardContent className="mt-3">
          <Form {...form}>
            <form
              id="collaboration-form"
              onSubmit={form.handleSubmit((values) => mutateAsync(values))}
              className="space-y-6"
            >
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`emails.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex rounded-md shadow-xs">
                          <Input
                            disabled={isPending}
                            className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                          {isMinLimit && (
                            <button
                              className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                              type="button"
                              onClick={() => handleFieldRemove(index)}
                              disabled={isPending}
                            >
                              <Minus className="size-4" />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-y-3">
          <Button
            variant="ghost"
            disabled={isPending || !isMaxLimitReached}
            type="button"
            onClick={handleFieldAdd}
            className="w-full text-muted-foreground"
          >
            <Plus className="size-4 mr-2" />
            Add another email
          </Button>

          <Button
            disabled={isPending || !form.formState.isValid}
            type="submit"
            className="w-full"
            form="collaboration-form"
            loading={isPending}
          >
            Next
          </Button>

          <Button
            variant="ghost"
            disabled={isPending}
            onClick={() => mutateAsync({ emails: [] })}
            type="button"
            className="w-full text-muted-foreground"
          >
            Skip
          </Button>
        </CardFooter>
      </MotionCard>
    )
  }
