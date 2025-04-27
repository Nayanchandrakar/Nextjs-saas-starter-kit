import { z } from "zod"

export const profileOnboardingSchema = z.object({
  profileImage: z.string().min(3).max(90).optional().or(z.literal("")),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(30).optional().or(z.literal("")),
  email: z.string().email(),
})

export type profileOnboardingSchemaType = z.infer<
  typeof profileOnboardingSchema
>
