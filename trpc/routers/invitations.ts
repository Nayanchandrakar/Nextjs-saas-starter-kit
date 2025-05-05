import { createTRPCRouter } from "@/trpc/init"
import { createBulkInvitation } from "@/trpc/procedures/invitations"

export const invitationsRouter = createTRPCRouter({
  createBulk: createBulkInvitation,
})
