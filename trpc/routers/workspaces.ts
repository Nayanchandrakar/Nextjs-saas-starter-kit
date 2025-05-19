import { createTRPCRouter } from "@/trpc/init"
import { create, deleteWorkspace } from "@/trpc/procedures/workspace"

export const workSpacesRouter = createTRPCRouter({
  create,
  deleteWorkspace,
})
