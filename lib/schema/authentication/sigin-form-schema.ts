import z from "zod"

export const sigInFormSchema = z.object({
  email: z.string().email(),
})

export type sigInFormScheamaType = z.infer<typeof sigInFormSchema>
