import { createTRPCRouter } from "@/trpc/init"
import { create } from "@/trpc/procedures/workspace"

export const workSpacesRouter = createTRPCRouter({
  create,
})
