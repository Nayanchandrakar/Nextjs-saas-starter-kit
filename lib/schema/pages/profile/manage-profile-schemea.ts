import { z } from "zod"

export const manageProfileSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(30).optional().or(z.literal("")),
  image: z.string().min(3).optional().or(z.literal("")),
  email: z.string().email(),
})

export const updateProfileImageSchema = z.object({
  image: manageProfileSchema.shape.image,
})

export type manageProfileSchemaType = z.infer<typeof manageProfileSchema>
