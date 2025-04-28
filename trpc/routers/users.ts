import { createTRPCRouter } from "@/trpc/init"
import { update } from "@/trpc/procedures/user"

export const usersRouter = createTRPCRouter({
  update,
})
