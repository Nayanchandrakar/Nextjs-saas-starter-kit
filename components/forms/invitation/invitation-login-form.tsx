"use client"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormAlert, FormAlertProps } from "@/components/ui/form-alert"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { OauthProvider } from "@/components/providers/oauth-providers"
import { Input } from "@/components/ui/input"
import { MotionCard } from "@/components/ui/motion-card"
import { authClient } from "@/lib/authentication/auth-client"
import messageJson from "@/lib/constants/message.json"
import {
  signInFormSchema,
  signInFormSchemaType,
} from "@/lib/schema/authentication/sigin-form-schema"
import { StringService } from "@/lib/services/string-service"
import { OauthProviderType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorContext } from "better-auth/react"
import { useCallback, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface InvitationLoginFormProps {
  email: string
  callbackString: string
  workspace: {
    id: string
    slug: string
    name: string
  }
}

export const InvitationLoginForm = ({
  email,
  workspace,
  callbackString,
}: InvitationLoginFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [alertState, setAlertState] = useState<FormAlertProps | null>(null)

  const form = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    shouldFocusError: true,
    defaultValues: { email },
  })

  async function onSubmit() {
    await authClient.signIn.magicLink({
      email,
      callbackURL: callbackString,
      fetchOptions: {
        onError,
        onSuccess,
      },
    })
  }

  const oauthSignIn = (provider: OauthProviderType) => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: callbackString,
      })
    })
  }

  const onError = useCallback((error: ErrorContext) => {
    const message = error.error.message ?? messageJson.generalError
    toast.error(message)
    setAlertState({ variant: "error", message })
  }, [])

  const onSuccess = useCallback(() => {
    toast.success(messageJson.signInSuccess)
    setAlertState({ message: messageJson.signInSuccess, variant: "success" })
  }, [])

  const isSubmitting = !!(form.formState.isSubmitting || isPending)

  return (
    <div className="size-full flex items-center min-h-screen">
      <MotionCard className="mx-auto max-w-lg w-full md:w-[400px]">
        <CardHeader>
          <CardTitle className="font-bold text-xl">
            Join <span className="capitalize">{workspace.name}</span>
          </CardTitle>
          <CardDescription>
            Collaborate with your team and start building faster.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={true} autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full"
                loading={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </form>
          </Form>

          {alertState && <FormAlert {...alertState} className="mt-5" />}

          <div className="flex items-center gap-3 my-5 before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
            <span className="text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <OauthProvider isSubmitting={isSubmitting} onClick={oauthSignIn} />
        </CardContent>
      </MotionCard>
    </div>
  )
}
