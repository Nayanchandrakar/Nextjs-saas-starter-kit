import { z } from "zod"

export const collaborationOnboardingSchema = z.object({
  emails: z
    .array(z.string().trim().email())
    .refine((emails) => new Set(emails).size === emails.length, {
      message: "Each email must be unique",
    }),
})

export type collaborationOnboardingSchemaType = z.infer<
  typeof collaborationOnboardingSchema
>
