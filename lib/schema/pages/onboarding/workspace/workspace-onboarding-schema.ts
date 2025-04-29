import { z } from "zod"

export const workSpaceOnboardingSchema = z.object({
  logo: z.string().min(3).optional().or(z.literal("")),
  name: z.string().min(3).max(20),
  slug: z.string().min(3).max(20),
})

export type workSpaceOnboardingSchemaType = z.infer<
  typeof workSpaceOnboardingSchema
>
