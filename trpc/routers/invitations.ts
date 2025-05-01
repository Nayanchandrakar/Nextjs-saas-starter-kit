import { createTRPCRouter } from "@/trpc/init"
import { createBulkInvitation } from "@/trpc/procedures/invitaions"

export const invitationsRouter = createTRPCRouter({
  createBulk: createBulkInvitation,
})
