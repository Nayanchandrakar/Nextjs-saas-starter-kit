import { z } from "zod"

export const inviteBulkMembersSchema = z.object({
  emails: z
    .array(z.string().trim().email())
    .min(0)
    .max(4)
    .refine((emails) => new Set(emails).size === emails.length, {
      message: "Each email must be unique",
    }),
})

export type inviteBulkMembersSchemaType = z.infer<
  typeof inviteBulkMembersSchema
>
