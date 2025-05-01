import { z } from "zod"

export const inviteBulkMembersSchema = z.object({
  emails: z.array(z.string().trim().email()).min(0).max(4),
})

export type inviteBulkMembersSchemaType = z.infer<
  typeof inviteBulkMembersSchema
>
