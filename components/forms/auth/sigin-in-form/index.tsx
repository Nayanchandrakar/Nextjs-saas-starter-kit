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
import { messages } from "@/lib/constants/message"
import {
  sigInFormScheamaType,
  sigInFormSchema,
} from "@/lib/schema/authentication/sigin-form-schema"
import { createRoute } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorContext } from "better-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const SignInForm = () => {
  const [alertState, setAlertState] = useState<FormAlertProps | null>(null)

  const form = useForm<sigInFormScheamaType>({
    resolver: zodResolver(sigInFormSchema),
    shouldFocusError: true,
    shouldUseNativeValidation: true,
    mode: "onSubmit",
    defaultValues: { email: "" },
  })

  async function onSubmit(values: sigInFormScheamaType) {
    await authClient.signIn.magicLink({
      email: values.email,
      callbackURL: createRoute("callback"),
      fetchOptions: {
        onError,
        onSuccess,
      },
    })
  }

  const onError = (error: ErrorContext) => {
    setAlertState({ variant: "error", message: error?.error?.message })
  }

  const onSuccess = () => {
    setAlertState({ message: messages.success.sigin, variant: "success" })
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <NavbarLogo />
        <CardTitle className="font-bold text-lg">Sign in or sign up</CardTitle>
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
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>

        {alertState && <FormAlert {...alertState} />}

        <div className="flex items-center gap-3 my-5 before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
          <span className="text-xs text-muted-foreground">
            or continue with
          </span>
        </div>

        <Button disabled={isSubmitting} variant="outline" className="w-full">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </CardContent>
    </Card>
  )
}
