import { z } from "zod"

export const preSignedSchema = z.object({
  fileName: z.string().min(3),
  fileType: z.string().min(3),
})

export type preSignedSchemaType = z.infer<typeof preSignedSchema>
