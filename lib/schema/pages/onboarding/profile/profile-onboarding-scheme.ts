import { z } from "zod"

export const profileOnboardingSchema = z.object({
  image: z.string().min(3).optional().or(z.literal("")),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(30).optional().or(z.literal("")),
  email: z.string().email(),
  isFromInvitation: z.boolean(),
})

export type profileOnboardingSchemaType = z.infer<
  typeof profileOnboardingSchema
>
