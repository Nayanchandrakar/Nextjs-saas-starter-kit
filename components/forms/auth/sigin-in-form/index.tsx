"use client"

import { Icons } from "@/components/shared/icons"
import { NavbarLogo } from "@/components/shared/navbar/logo"
import { Button } from "@/components/ui/button"
import {
  Card,
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

import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/authentication/auth-client"
import messageJson from "@/lib/constants/message.json"
import {
  signInFormSchema,
  signInFormSchemaType,
} from "@/lib/schema/authentication/sigin-form-schema"
import { createRoute } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorContext } from "better-auth/react"
import { useCallback, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface SignInFormProps {
  fromInvite: boolean
}

export const SignInForm = ({ fromInvite }: SignInFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [alertState, setAlertState] = useState<FormAlertProps | null>(null)

  const callbackString = createRoute("callback", {
    ...(fromInvite && { fromInvite }),
  })

  const form = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    shouldFocusError: true,
    shouldUseNativeValidation: true,
    mode: "onSubmit",
    defaultValues: { email: "" },
  })

  async function onSubmit(values: signInFormSchemaType) {
    await authClient.signIn.magicLink({
      email: values.email,
      callbackURL: callbackString,
      fetchOptions: {
        onError,
        onSuccess,
      },
    })
  }

  const googleSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
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
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <NavbarLogo />
        <CardTitle className="font-bold text-xl">Sign in or sign up</CardTitle>
        <CardDescription>
          Build your SaaS in minutes, not months.
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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your email"
                      autoComplete="off"
                      {...field}
                    />
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

        <Button
          disabled={isSubmitting}
          type="button"
          variant="outline"
          className="w-full"
          onClick={googleSignIn}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </CardContent>
    </Card>
  )
}
