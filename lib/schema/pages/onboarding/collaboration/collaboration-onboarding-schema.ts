import { z } from "zod"

export const collaborationOnboardingSchema = z.object({
  emails: z.array(z.string().trim().email()),
})

export type collaborationOnboardingSchemaType = z.infer<
  typeof collaborationOnboardingSchema
>
